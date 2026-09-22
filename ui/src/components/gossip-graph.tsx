import { Sigil } from "@/components/sigil";
import { reachableShips } from "@/lib/omart/gossip";
import { useOmart } from "@/lib/omart/store";
import { cn } from "@/lib/utils";

export function GossipGraph({ className }: { className?: string }) {
  const our = useOmart((s) => s.our);
  const pals = useOmart((s) => s.pals);
  const config = useOmart((s) => s.config);
  const dist = reachableShips(our, pals, config);

  const rings: string[][] = [[], [], [], []];
  for (const [ship, hop] of dist) {
    if (ship === our) continue;
    if (hop >= 1 && hop <= 3) rings[hop]!.push(ship);
  }

  const w = 640;
  const h = 360;
  const cx = w / 2;
  const cy = h / 2;
  const radii = [0, 78, 132, 176];

  const positions = new Map<string, { x: number; y: number }>();
  positions.set(our, { x: cx, y: cy });
  rings.forEach((ships, hop) => {
    ships.forEach((ship, i) => {
      const r = radii[hop] ?? 176;
      const a = (i / Math.max(ships.length, 1)) * Math.PI * 2 - Math.PI / 2;
      positions.set(ship, { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
    });
  });

  const edges: [string, string][] = [];
  for (const pal of pals) {
    if (pal.target && dist.has(pal.ship)) edges.push([our, pal.ship]);
  }
  for (const [ship] of dist) {
    if (ship === our) continue;
    const d = dist.get(ship) ?? 0;
    if (d <= 1) continue;
    const parent = [...dist.entries()].find(([s, hop]) => hop === d - 1 && s !== ship);
    if (parent) edges.push([parent[0], ship]);
  }

  return (
    <div className={cn("overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]", className)}>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full text-fg" role="img" aria-label="Gossip graph">
        {radii.slice(1, config.hops + 1).map((r) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            className="stroke-border"
            strokeWidth="1"
          />
        ))}
        {edges.map(([a, b]) => {
          const pa = positions.get(a);
          const pb = positions.get(b);
          if (!pa || !pb) return null;
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              className="stroke-border"
              strokeWidth="1"
            />
          );
        })}
        {[...positions.entries()].map(([ship, p]) => (
          <foreignObject key={ship} x={p.x - 14} y={p.y - 14} width="28" height="28">
            <Sigil ship={ship} size={28} />
          </foreignObject>
        ))}
      </svg>
      <div className="flex flex-wrap gap-3 border-t border-border px-4 py-3 font-mono text-[11px] text-subtle">
        <span>you</span>
        <span>ring 1 pals</span>
        <span>ring 2 pals-of-pals</span>
      </div>
    </div>
  );
}
