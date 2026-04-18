import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * MiniMandala — preview visual sutil do que a leitora vai receber no resultado.
 * Hexágono pulsante com 6 pétalas que respiram ao redor de um núcleo de ouro.
 * Respeita prefers-reduced-motion: estático, sem pulsar.
 */
interface MiniMandalaProps {
  size?: number;
  color?: string;
}

const MiniMandala = ({ size = 88, color = "#C8B870" }: MiniMandalaProps) => {
  const reduced = useReducedMotion();
  const c = size / 2;
  const r = size * 0.32;

  // 6 pétalas — coordenadas hexagonais
  const petals = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return { x: c + r * Math.cos(angle), y: c + r * Math.sin(angle), delay: i * 0.18 };
  });

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      role="presentation"
      style={{ display: "block" }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      {/* Hex outer ring */}
      <polygon
        points={petals.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke={color}
        strokeOpacity="0.22"
        strokeWidth="0.7"
      />

      {/* Petals — pulsantes */}
      {petals.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={size * 0.055}
          fill={color}
          fillOpacity="0.45"
          animate={
            reduced
              ? undefined
              : { fillOpacity: [0.25, 0.55, 0.25], r: [size * 0.05, size * 0.07, size * 0.05] }
          }
          transition={{ duration: 3.6, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Núcleo de ouro */}
      <motion.circle
        cx={c}
        cy={c}
        r={size * 0.075}
        fill={color}
        animate={reduced ? undefined : { fillOpacity: [0.78, 1, 0.78] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Halo */}
      <circle cx={c} cy={c} r={size * 0.13} fill="none" stroke={color} strokeOpacity="0.18" strokeWidth="0.6" />
    </motion.svg>
  );
};

export default MiniMandala;
