import { useMemo } from "react";
import { motion } from "framer-motion";

interface DiagnosticoRadarChartProps {
  scores: number[];
  id?: string;
  top3Indices?: number[];
  bottom3Indices?: number[];
  centralIndex?: number;
}

/* ── Geometria ──────────────────────────────────────── */
const N        = 12;
const OUTER_R  = 128;
const SVG_SIZE = 340;
const CX       = SVG_SIZE / 2;
const CY       = SVG_SIZE / 2;
const LABEL_R  = OUTER_R + 20;
const MAX_VAL  = 9;
const RINGS    = 6;

/* ── Palette ────────────────────────────────────────── */
const GOLD     = "#C8B870";
const TOP_CLR  = "#C8A050";
const BOT_CLR  = "#6B8BA4";
const CTR_CLR  = "#7A9B6E";
const GRID_CLR = "rgba(237,230,219,0.06)";
const TEXT_DIM = "rgba(237,230,219,0.28)";

/* ── Helpers ────────────────────────────────────────── */
function axisAngle(i: number) {
  return (i * 2 * Math.PI) / N - Math.PI / 2;
}

function polarPt(i: number, r: number): [number, number] {
  const a = axisAngle(i);
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function buildPath(pts: [number, number][]) {
  return (
    pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ") +
    "Z"
  );
}

/* ── Component ──────────────────────────────────────── */
const DiagnosticoRadarChart = ({
  scores,
  id,
  top3Indices = [],
  bottom3Indices = [],
  centralIndex,
}: DiagnosticoRadarChartProps) => {
  const top3Set    = new Set(top3Indices);
  const bottom3Set = new Set(bottom3Indices);

  const rings = useMemo(
    () =>
      Array.from({ length: RINGS }, (_, lvl) => {
        const r   = (OUTER_R * (lvl + 1)) / RINGS;
        const pts = Array.from({ length: N }, (_, i) => polarPt(i, r)) as [number, number][];
        return { path: buildPath(pts), outermost: lvl === RINGS - 1 };
      }),
    []
  );

  const spokes = useMemo(
    () =>
      Array.from({ length: N }, (_, i) => {
        const [x2, y2] = polarPt(i, OUTER_R);
        return { x2, y2 };
      }),
    []
  );

  const dataPath = useMemo(() => {
    const pts = scores.map((s, i) => {
      const v = Math.max(0, Math.min(MAX_VAL, s ?? 0));
      return polarPt(i, (v / MAX_VAL) * OUTER_R);
    }) as [number, number][];
    return buildPath(pts);
  }, [scores]);

  const dots = useMemo(
    () =>
      scores.map((s, i) => {
        const v      = Math.max(0, Math.min(MAX_VAL, s ?? 0));
        const [x, y] = polarPt(i, (v / MAX_VAL) * OUTER_R);
        let color    = "rgba(200,184,112,0.45)";
        let r        = 2.8;
        let ring     = false;
        if (top3Set.has(i))     { color = TOP_CLR; r = 4.5; ring = true; }
        if (bottom3Set.has(i))  { color = BOT_CLR; r = 4.5; ring = true; }
        if (i === centralIndex) { color = CTR_CLR; r = 5.5; ring = true; }
        return { x, y, r, color, ring };
      }),
    [scores, top3Set, bottom3Set, centralIndex]
  );

  const labelItems = useMemo(
    () =>
      Array.from({ length: N }, (_, i) => {
        const [x, y] = polarPt(i, LABEL_R);
        let color    = TEXT_DIM;
        let bold     = false;
        if (top3Set.has(i))     { color = TOP_CLR; bold = true; }
        if (bottom3Set.has(i))  { color = BOT_CLR; bold = true; }
        if (i === centralIndex) { color = CTR_CLR; bold = true; }
        return { x, y, n: i + 1, color, bold };
      }),
    [top3Set, bottom3Set, centralIndex]
  );

  return (
    <div id={id} className="flex flex-col items-center gap-5">
      <svg
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        width="100%"
        style={{ maxWidth: 380, display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="rg-data" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(200,184,112,0.24)" />
            <stop offset="70%"  stopColor="rgba(200,184,112,0.08)" />
            <stop offset="100%" stopColor="rgba(200,184,112,0.00)" />
          </radialGradient>

          <linearGradient id="rg-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(200,184,112,0.25)" />
            <stop offset="50%"  stopColor="rgba(200,184,112,0.10)" />
            <stop offset="100%" stopColor="rgba(200,184,112,0.25)" />
          </linearGradient>

          <filter id="f-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid rings */}
        {rings.map(({ path, outermost }, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke={outermost ? "url(#rg-outer)" : GRID_CLR}
            strokeWidth={outermost ? 1.2 : 0.7}
            strokeDasharray={outermost ? undefined : "2,4"}
          />
        ))}

        {/* Axis spokes */}
        {spokes.map(({ x2, y2 }, i) => (
          <line key={i} x1={CX} y1={CY} x2={x2} y2={y2} stroke={GRID_CLR} strokeWidth={0.7} />
        ))}

        {/* Data fill */}
        <motion.path
          d={dataPath}
          fill="url(#rg-data)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Data stroke — glowing gold */}
        <motion.path
          d={dataPath}
          fill="none"
          stroke={GOLD}
          strokeWidth={1.4}
          strokeOpacity={0.7}
          filter="url(#f-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        />

        {/* Vertex dots */}
        {dots.map((d, i) => (
          <g key={i}>
            {d.ring && <circle cx={d.x} cy={d.y} r={d.r + 5} fill={d.color} opacity={0.12} />}
            <circle cx={d.x} cy={d.y} r={d.r} fill={d.color} />
          </g>
        ))}

        {/* Center */}
        <circle cx={CX} cy={CY} r={2} fill="rgba(200,184,112,0.3)" />

        {/* Axis labels */}
        {labelItems.map((l) => (
          <text
            key={l.n}
            x={l.x}
            y={l.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={l.color}
            fontSize={11}
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight={l.bold ? 700 : 400}
          >
            {l.n}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div
        className="flex items-center justify-center gap-5 font-inter"
        style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(237,230,219,0.4)" }}
      >
        {[
          { color: TOP_CLR, label: "BASE" },
          { color: BOT_CLR, label: "VAZAMENTO" },
          { color: CTR_CLR, label: "CONFLITO" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
              <circle cx="3" cy="3" r="3" fill={color} />
            </svg>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticoRadarChart;
