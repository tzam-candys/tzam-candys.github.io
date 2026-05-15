export const TELEGRAM_USERNAME = 'tzam_mx';

export type TipoSolic = 'INFO_GENERAL' | 'PEDIDO' | 'MAYOREO' | 'REPORTE_LOTE';

export function composeSysMsg(
  tipo: TipoSolic,
  usuario = 'ANON',
  idLote = 'NINGUNO',
  origen = 'PORTAL_TZAM_WEB'
) {
  return `MSG_SIS: INICIO_CONTACTO // ID: ${usuario} // TIPO_SOLIC: ${tipo} // ID_LOTE: ${idLote} // ORIGEN: ${origen}`;
}

export function telegramUrl() {
  return `https://t.me/${TELEGRAM_USERNAME}`;
}
