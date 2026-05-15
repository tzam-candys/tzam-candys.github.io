type Series = 'frutal' | 'fresca' | 'kinetic';

export interface BottleProps {
  code: string;
  number: string;
  series: Series;
  candyColor: string;
  width?: number;
  className?: string;
}

export default function Bottle({
  code,
  number,
  series,
  candyColor,
  width = 220,
  className = '',
}: BottleProps) {
  const height = width * 2.4;
  const isOnyx = series === 'fresca' || series === 'kinetic';
  const labelBg = isOnyx ? '#0a0a0a' : '#f5f3ee';
  const labelFg = isOnyx ? '#f5f3ee' : '#0a0a0a';
  const logoFill = series === 'kinetic' ? '#b87333' : labelFg;

  const domes = Array.from({ length: 14 }).map((_, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const cx = 60 + col * 30 + (row % 2 ? 12 : 0);
    const cy = 200 + row * 24;
    return { cx, cy };
  });

  return (
    <svg
      viewBox="0 0 220 528"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={`Frasco TZAM Nº ${number} ${code}`}
    >
      <defs>
        <linearGradient id={`glass-${number}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id={`cap-${number}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#6b6b6b" />
          <stop offset="20%" stopColor="#d8d8d8" />
          <stop offset="50%" stopColor="#9a9a9a" />
          <stop offset="80%" stopColor="#dcdcdc" />
          <stop offset="100%" stopColor="#5a5a5a" />
        </linearGradient>
        <linearGradient id={`candy-${number}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={candyColor} stopOpacity="1" />
          <stop offset="100%" stopColor={candyColor} stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="110" cy="510" rx="80" ry="6" fill="#000" opacity="0.5" />

      {/* cap */}
      <rect x="60" y="20" width="100" height="44" rx="3" fill={`url(#cap-${number})`} />
      <rect x="60" y="20" width="100" height="3" fill="#3a3a3a" />
      <g stroke="#4a4a4a" strokeWidth="0.7" opacity="0.6">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={i} x1={62 + i * 5.5} y1="28" x2={62 + i * 5.5} y2="60" />
        ))}
      </g>

      {/* neck */}
      <rect x="78" y="64" width="64" height="18" fill="#1a1a1a" opacity="0.3" />
      <rect x="78" y="64" width="64" height="6" fill={`url(#glass-${number})`} />

      {/* glass body */}
      <rect
        x="42"
        y="82"
        width="136"
        height="400"
        rx="6"
        fill="#0d0d0d"
        opacity="0.35"
        stroke="#222"
        strokeWidth="0.5"
      />
      <rect x="42" y="82" width="136" height="400" rx="6" fill={`url(#glass-${number})`} />

      {/* candies inside */}
      <g clipPath={`url(#clip-${number})`}>
        <defs>
          <clipPath id={`clip-${number}`}>
            <rect x="46" y="180" width="128" height="298" rx="4" />
          </clipPath>
        </defs>
        {domes.map((d, i) => (
          <g key={i}>
            <path
              d={`M ${d.cx - 12} ${d.cy} A 12 12 0 0 1 ${d.cx + 12} ${d.cy} Z`}
              fill={`url(#candy-${number})`}
            />
            <ellipse
              cx={d.cx - 3}
              cy={d.cy - 5}
              rx="3"
              ry="1.5"
              fill="#fff"
              opacity="0.7"
            />
          </g>
        ))}
      </g>

      {/* label */}
      <rect x="42" y="160" width="136" height="200" fill={labelBg} />
      {series === 'kinetic' && (
        <line
          x1="42"
          y1="345"
          x2="178"
          y2="332"
          stroke="#e8ff00"
          strokeWidth="2"
          opacity="0.95"
        />
      )}

      {/* línea de ficha superior */}
      <text
        x="54"
        y="180"
        fill={labelFg}
        fontFamily="JetBrains Mono, monospace"
        fontSize="7"
        opacity="0.65"
      >
        Nº {number} // {code}
      </text>

      {/* brand */}
      <text
        x="110"
        y="240"
        fill={logoFill}
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="36"
        textAnchor="middle"
        letterSpacing="6"
      >
        TZAM
      </text>

      {/* bottom mono specs */}
      <g
        fill={labelFg}
        fontFamily="JetBrains Mono, monospace"
        fontSize="6"
        opacity="0.7"
      >
        <text x="54" y="295">50ml / 40g</text>
        <text x="54" y="307">LOTE_00</text>
        <text x="54" y="319">MX-SLP-2026</text>
        <text x="54" y="345" opacity="0.55">
          SACAROSA · GLUCOSA · AC. CÍTRICO
        </text>
      </g>

      {/* base */}
      <rect x="42" y="478" width="136" height="6" fill="#000" opacity="0.4" />
    </svg>
  );
}
