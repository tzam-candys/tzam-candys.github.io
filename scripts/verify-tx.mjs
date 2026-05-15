#!/usr/bin/env node
/**
 * TZAM · verificador local de TX proof Monero.
 *
 * Requiere monero-wallet-rpc corriendo localmente:
 *   monero-wallet-rpc --rpc-bind-port 18083 --disable-rpc-login \
 *     --wallet-file <wallet-del-lote> --password <pwd> --daemon-address <node>
 *
 * Uso:
 *   node scripts/verify-tx.mjs \
 *     --txid <txid> \
 *     --proof <tx_proof_string> \
 *     [--address <address-destino>] \
 *     [--amount <xmr-esperado>] \
 *     [--rpc http://127.0.0.1:18083/json_rpc]
 *
 * Si --address se omite, usa NEXT_PUBLIC_XMR_ADDRESS del entorno.
 * Si --amount se omite, sólo reporta confirmaciones y monto recibido.
 */
import { argv, exit, env } from 'node:process';

function parseArgs(args) {
  const out = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    }
  }
  return out;
}

const args = parseArgs(argv.slice(2));
const txid = args.txid;
const proof = args.proof;
const address = args.address || env.NEXT_PUBLIC_XMR_ADDRESS || '';
const amount = args.amount || env.NEXT_PUBLIC_XMR_AMOUNT_PACK || '';
const rpc = args.rpc || 'http://127.0.0.1:18083/json_rpc';

if (!txid || !proof || !address) {
  console.error('Faltan args: --txid <id> --proof <p> --address <a>  (o NEXT_PUBLIC_XMR_ADDRESS en env)');
  exit(2);
}

async function rpcCall(method, params) {
  const body = JSON.stringify({ jsonrpc: '2.0', id: '0', method, params });
  const res = await fetch(rpc, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} desde wallet-rpc`);
  const json = await res.json();
  if (json.error) throw new Error(`RPC ${json.error.code}: ${json.error.message}`);
  return json.result;
}

try {
  const result = await rpcCall('check_tx_proof', {
    txid,
    address,
    message: '',
    signature: proof,
  });

  const goodSig = result.good === true;
  const received = result.received / 1e12; // piconero → XMR
  const inPool = result.in_pool === true;
  const confirmations = result.confirmations;

  console.log('—'.repeat(60));
  console.log(`TXID         : ${txid}`);
  console.log(`Dirección    : ${address.slice(0, 12)}…${address.slice(-6)}`);
  console.log(`Firma válida : ${goodSig ? '✓ SÍ' : '✗ NO'}`);
  console.log(`Recibido     : ${received} XMR`);
  console.log(`En mempool   : ${inPool ? 'SÍ' : 'NO'}`);
  console.log(`Confirmaciones: ${confirmations}`);

  if (!goodSig) {
    console.log('VEREDICTO    : ✗ PROOF INVÁLIDO');
    exit(1);
  }
  if (received === 0) {
    console.log('VEREDICTO    : ✗ MONTO 0 (no pagó a esta dirección)');
    exit(1);
  }
  if (amount) {
    const expected = Number(amount);
    const tolerance = 1e-9;
    if (received + tolerance < expected) {
      console.log(`VEREDICTO    : ✗ MONTO INSUFICIENTE (esperado ${expected}, recibido ${received})`);
      exit(1);
    }
  }
  if (confirmations < 10) {
    console.log(`VEREDICTO    : ⚠ PAGO VÁLIDO pero confirmaciones bajas (${confirmations}/10). Espera antes de despachar.`);
    exit(0);
  }
  console.log('VEREDICTO    : ✓ PAGO CONFIRMADO');
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  exit(1);
}
