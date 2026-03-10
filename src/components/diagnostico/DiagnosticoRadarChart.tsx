import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { dimensionLabels } from "@/data/quizMapaPadrao";

interface DiagnosticoRadarChartProps {
  scores: number[];
  id?: string;
  top3Indices?: number[];
  bottom3Indices?: number[];
  centralIndex?: number;
}

/* ── Color tokens ───────────────────────────────────── */
const COLOR_NEUTRAL = "hsl(60 4% 11% / 0.35)";
const COLOR_TOP3    = "hsl(30 55% 48%)";      // cobre/âmbar fosco
const COLOR_BOTTOM3 = "hsl(215 12% 32%)";     // carvão/ardósia
const COLOR_CENTRAL = "hsl(80 20% 28%)";      // oliva escura
const FILL_BASE     = "hsl(33 20% 70% / 0.18)"; // areia/taupe neutro
const STROKE_BASE   = "hsl(33 20% 60% / 0.6)";

/* ── Custom tick: numbers 1–12 colored by category ── */
const CustomTick = ({
  x,
  y,
  payload,
  textAnchor,
  top3Set,
  bottom3Set,
  centralIdx,
}: any) => {
  const idx = payload.index as number;
  let fill = COLOR_NEUTRAL;
  let fontWeight = 400;

  if (top3Set.has(idx)) { fill = COLOR_TOP3; fontWeight = 700; }
  if (bottom3Set.has(idx)) { fill = COLOR_BOTTOM3; fontWeight = 700; }
  if (idx === centralIdx) { fill = COLOR_CENTRAL; fontWeight = 700; }

  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill={fill}
      fontSize={12}
      fontFamily="'Cormorant Garamond', serif"
      fontWeight={fontWeight}
    >
      {idx + 1}
    </text>
  );
};

/* ── Custom dot: colored + sized by category ────────── */
const CustomDot = ({
  cx,
  cy,
  index,
  top3Set,
  bottom3Set,
  centralIdx,
}: any) => {
  let fill = "hsl(37 35% 52%)";
  let r = 3;
  let stroke = "none";
  let strokeWidth = 0;

  if (top3Set.has(index)) { fill = COLOR_TOP3; r = 4; }
  if (bottom3Set.has(index)) { fill = COLOR_BOTTOM3; r = 4; }
  if (index === centralIdx) {
    fill = COLOR_CENTRAL;
    r = 5;
    stroke = COLOR_CENTRAL;
    strokeWidth = 2;
  }

  return (
    <circle
      key={`dot-${index}`}
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};

const DiagnosticoRadarChart = ({
  scores,
  id,
  top3Indices = [],
  bottom3Indices = [],
  centralIndex,
}: DiagnosticoRadarChartProps) => {
  const top3Set = new Set(top3Indices);
  const bottom3Set = new Set(bottom3Indices);

  const data = dimensionLabels.map((label, i) => ({
    subject: String(i + 1),
    fullName: label,
    score: scores[i],
    fullMark: 9,
  }));

  return (
    <div id={id} className="w-full" style={{ height: 420 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid
            stroke="hsl(60 4% 11% / 0.08)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={(props: any) => (
              <CustomTick
                {...props}
                top3Set={top3Set}
                bottom3Set={bottom3Set}
                centralIdx={centralIndex}
              />
            )}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 9]}
            tick={{ fontSize: 9, fill: "hsl(60 4% 11% / 0.25)" }}
            axisLine={false}
          />
          <Radar
            name="Estabilidade"
            dataKey="score"
            stroke={STROKE_BASE}
            fill={FILL_BASE}
            strokeWidth={1.5}
            dot={(props: any) => (
              <CustomDot
                {...props}
                top3Set={top3Set}
                bottom3Set={bottom3Set}
                centralIdx={centralIndex}
              />
            )}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiagnosticoRadarChart;
