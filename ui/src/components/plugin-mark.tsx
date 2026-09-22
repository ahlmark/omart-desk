import { hashString } from "@/lib/omart/ships";
import { cn } from "@/lib/utils";

export function PluginMark({ id, className }: { id: string; className?: string }) {
  const h = hashString(id);
  const a = h % 6;
  const b = (h >>> 6) % 6;
  const c = (h >>> 12) % 4;
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("size-full text-fg", className)}
      aria-hidden="true"
    >
      <rect width="80" height="80" className="fill-raised" />
      <g className="fill-none stroke-fg" strokeWidth="1.4">
        {a === 0 && <rect x="14" y="14" width="52" height="52" />}
        {a === 1 && <circle cx="40" cy="40" r="24" />}
        {a === 2 && <path d="M40 12 L68 40 L40 68 L12 40 Z" />}
        {a === 3 && <rect x="18" y="18" width="44" height="44" rx="10" />}
        {a === 4 && <path d="M16 16 H64 V40 H40 V64 H16 Z" />}
        {a === 5 && (
          <>
            <line x1="16" y1="40" x2="64" y2="40" />
            <line x1="40" y1="16" x2="40" y2="64" />
          </>
        )}
        {b !== a && (
          <g className="stroke-accent" strokeWidth="1.2">
            {b === 0 && <circle cx="40" cy="40" r="10" />}
            {b === 1 && <rect x="30" y="30" width="20" height="20" />}
            {b === 2 && <path d="M40 24 L56 56 H24 Z" />}
            {b === 3 && <circle cx="40" cy="40" r="18" />}
            {b === 4 && <rect x="24" y="32" width="32" height="16" />}
            {b === 5 && <path d="M24 24 H56 V56 H24 Z" />}
          </g>
        )}
        {c === 0 && <circle cx="40" cy="40" r="3" className="fill-fg stroke-none" />}
        {c === 1 && <rect x="37" y="37" width="6" height="6" className="fill-accent stroke-none" />}
      </g>
    </svg>
  );
}
