import type { ReactNode } from "react";
import { glyphIndex, shipClass } from "@/lib/omart/ships";
import { cn } from "@/lib/utils";

const GLYPHS: ((x: number, y: number, s: number) => ReactNode)[] = [
  (x, y, s) => <rect x={x + s * 0.18} y={y + s * 0.18} width={s * 0.64} height={s * 0.64} />,
  (x, y, s) => <circle cx={x + s / 2} cy={y + s / 2} r={s * 0.32} />,
  (x, y, s) => (
    <polygon
      points={`${x + s / 2},${y + s * 0.14} ${x + s * 0.86},${y + s * 0.86} ${x + s * 0.14},${y + s * 0.86}`}
    />
  ),
  (x, y, s) => (
    <polygon
      points={`${x + s / 2},${y + s * 0.12} ${x + s * 0.88},${y + s / 2} ${x + s / 2},${y + s * 0.88} ${x + s * 0.12},${y + s / 2}`}
    />
  ),
  (x, y, s) => <rect x={x + s * 0.42} y={y + s * 0.12} width={s * 0.16} height={s * 0.76} />,
  (x, y, s) => <rect x={x + s * 0.12} y={y + s * 0.42} width={s * 0.76} height={s * 0.16} />,
  (x, y, s) => (
    <>
      <rect x={x + s * 0.42} y={y + s * 0.12} width={s * 0.16} height={s * 0.76} />
      <rect x={x + s * 0.12} y={y + s * 0.42} width={s * 0.76} height={s * 0.16} />
    </>
  ),
  (x, y, s) => (
    <path
      d={`M ${x + s * 0.18} ${y + s * 0.18} H ${x + s * 0.82} V ${y + s * 0.42} H ${x + s * 0.42} V ${y + s * 0.82} H ${x + s * 0.18} Z`}
    />
  ),
  (x, y, s) => (
    <path
      d={`M ${x + s * 0.82} ${y + s * 0.18} H ${x + s * 0.18} V ${y + s * 0.42} H ${x + s * 0.58} V ${y + s * 0.82} H ${x + s * 0.82} Z`}
    />
  ),
  (x, y, s) => (
    <path
      d={`M ${x + s * 0.18} ${y + s * 0.82} H ${x + s * 0.82} V ${y + s * 0.58} H ${x + s * 0.42} V ${y + s * 0.18} H ${x + s * 0.18} Z`}
    />
  ),
  (x, y, s) => (
    <path
      d={`M ${x + s * 0.18} ${y + s * 0.18} V ${y + s * 0.82} H ${x + s * 0.42} V ${y + s * 0.42} H ${x + s * 0.82} V ${y + s * 0.18} Z`}
    />
  ),
  (x, y, s) => <circle cx={x + s / 2} cy={y + s / 2} r={s * 0.18} />,
  (x, y, s) => (
    <>
      <rect x={x + s * 0.18} y={y + s * 0.18} width={s * 0.28} height={s * 0.28} />
      <rect x={x + s * 0.54} y={y + s * 0.54} width={s * 0.28} height={s * 0.28} />
    </>
  ),
  (x, y, s) => (
    <path d={`M ${x + s * 0.2} ${y + s * 0.8} L ${x + s * 0.8} ${y + s * 0.2} L ${x + s * 0.8} ${y + s * 0.8} Z`} />
  ),
  (x, y, s) => (
    <>
      <rect x={x + s * 0.2} y={y + s * 0.2} width={s * 0.18} height={s * 0.6} />
      <rect x={x + s * 0.62} y={y + s * 0.2} width={s * 0.18} height={s * 0.6} />
    </>
  ),
  (x, y, s) => (
    <path
      d={`M ${x + s / 2} ${y + s * 0.16} L ${x + s * 0.84} ${y + s / 2} L ${x + s / 2} ${y + s * 0.84} L ${x + s * 0.16} ${y + s / 2} Z M ${x + s / 2} ${y + s * 0.34} L ${x + s * 0.66} ${y + s / 2} L ${x + s / 2} ${y + s * 0.66} L ${x + s * 0.34} ${y + s / 2} Z`}
      fillRule="evenodd"
    />
  ),
];

export function Sigil({
  ship,
  size = 40,
  className,
}: {
  ship: string;
  size?: number;
  className?: string;
}) {
  const cls = shipClass(ship);
  const cells = cls === "galaxy" ? 1 : cls === "star" ? 1 : 4;
  const dim = cells === 1 ? 1 : 2;
  const cell = 32;
  const pad = 3;
  const canvas = dim * cell;
  const glyphs = Array.from({ length: cells }, (_, i) => {
    const col = i % dim;
    const row = Math.floor(i / dim);
    const draw = GLYPHS[glyphIndex(ship, i)]!;
    return <g key={i}>{draw(col * cell + pad, row * cell + pad, cell - pad * 2)}</g>;
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${canvas} ${canvas}`}
      className={cn("shrink-0 text-fg", className)}
      aria-hidden="true"
    >
      <rect width={canvas} height={canvas} className="fill-raised" />
      <g className="fill-fg">{glyphs}</g>
    </svg>
  );
}
