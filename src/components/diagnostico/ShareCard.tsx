import { forwardRef } from "react";
import type { EspelhoData } from "@/data/espelhoEngine";
import { getArquetipo } from "@/data/espelhoEngine";

const BG = "#08090D";
const GOLD = "#C8B870";
const CREAM = "#EDE6DB";
const DIM = "rgba(207,197,184,0.38)";

const THEME: Record<string, string> = {
  Curiosa: "#7BB89A",
  Buscadora: "#C8A050",
  Estrategista: "#7B9EC8",
  Soberana: "#C8B870",
};

interface ShareCardProps {
  data: EspelhoData;
  userName?: string;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ data, userName }, ref) => {
  const arquetipo = getArquetipo(data);
  const accent = THEME[arquetipo.nome] ?? GOLD;
  const scores = data.axes.map((a) => a.mean);
  const labels = data.axes.map((a) => a.label);

  // Simple radial mandala with CSS
  const maxScore = 9;

  return (
    <div
      ref={ref}
      style={{
        width: 1080 / 3,
        height: 1920 / 3,
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "32px 24px",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top decorative line */}
      <div style={{ width: "100%", height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)` }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <p style={{ fontSize: 8, letterSpacing: "0.45em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: 6 }}>
          Espelho da Clareza
        </p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: CREAM, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Meu Mapa do Padrão
        </p>
        {userName && (
          <p style={{ fontSize: 10, color: DIM, fontStyle: "italic", marginTop: 4 }}>{userName}</p>
        )}
      </div>

      {/* Mini mandala — SVG radar */}
      <div style={{ position: "relative", width: 200, height: 200, margin: "8px 0" }}>
        <svg viewBox="0 0 200 200" width="200" height="200">
          {/* Background rings */}
          {[0.33, 0.66, 1].map((r) => (
            <circle
              key={r}
              cx="100" cy="100" r={r * 80}
              fill="none" stroke={`${GOLD}15`} strokeWidth="0.5"
            />
          ))}
          {/* Radar polygon */}
          <polygon
            points={scores.map((s, i) => {
              const angle = (Math.PI * 2 * i) / scores.length - Math.PI / 2;
              const radius = (s / maxScore) * 80;
              return `${100 + radius * Math.cos(angle)},${100 + radius * Math.sin(angle)}`;
            }).join(" ")}
            fill={`${accent}25`}
            stroke={accent}
            strokeWidth="1.5"
          />
          {/* Axis labels */}
          {labels.map((label, i) => {
            const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
            const x = 100 + 92 * Math.cos(angle);
            const y = 100 + 92 * Math.sin(angle);
            return (
              <text
                key={i}
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={DIM}
                fontSize="5.5"
                fontFamily="Inter, sans-serif"
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Arquétipo */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 7.5, letterSpacing: "0.4em", textTransform: "uppercase", color: `${accent}99`, marginBottom: 4 }}>
          Seu arquétipo
        </p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: accent, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {arquetipo.nome}
        </p>
        <p style={{ fontSize: 9, color: DIM, marginTop: 6, lineHeight: 1.5, maxWidth: 260, marginLeft: "auto", marginRight: "auto" }}>
          {arquetipo.abertura}
        </p>
      </div>

      {/* Top 3 / Bottom 3 */}
      <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
        <div style={{ padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.05)` }}>
          <p style={{ fontSize: 6.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8A050", marginBottom: 6 }}>Base</p>
          {data.top3.map((a) => (
            <p key={a.index} style={{ fontSize: 8, color: CREAM, marginBottom: 2 }}>
              {a.label} <span style={{ color: "#C8A050" }}>{a.mean.toFixed(1)}</span>
            </p>
          ))}
        </div>
        <div style={{ padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.05)` }}>
          <p style={{ fontSize: 6.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B8BA4", marginBottom: 6 }}>Vazamento</p>
          {data.bottom3.map((a) => (
            <p key={a.index} style={{ fontSize: 8, color: CREAM, marginBottom: 2 }}>
              {a.label} <span style={{ color: "#6B8BA4" }}>{a.mean.toFixed(1)}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <p style={{ fontSize: 8, color: `${GOLD}66`, letterSpacing: "0.15em" }}>
          oportalreset.com
        </p>
        <p style={{ fontSize: 6.5, color: DIM, marginTop: 3 }}>
          Descubra seu padrão em 3 minutos
        </p>
      </div>

      {/* Bottom decorative line */}
      <div style={{ width: "100%", height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)`, marginTop: 8 }} />
    </div>
  );
});

ShareCard.displayName = "ShareCard";

export default ShareCard;
