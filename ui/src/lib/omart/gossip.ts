import { CATALOG } from "./catalog";
import { NPC_TARGETS } from "./ships";
import type {
  GossipConfig,
  HeardPlugin,
  HearMode,
  PalRecord,
  PluginListing,
  Ship,
} from "./types";

export type Graph = Record<Ship, Set<Ship>>;

export function buildGraph(our: Ship, pals: PalRecord[], config: GossipConfig): Graph {
  const g: Graph = {};
  const add = (a: Ship, b: Ship) => {
    if (!g[a]) g[a] = new Set();
    g[a].add(b);
  };

  for (const [ship, targets] of Object.entries(NPC_TARGETS)) {
    for (const t of targets) add(ship, t);
  }

  for (const pal of pals) {
    if (pal.target) add(our, pal.ship);
    if (pal.leech) add(pal.ship, our);
  }

  if (config.hear === "mutuals") {
    for (const pal of pals) {
      if (!(pal.target && pal.leech) && pal.ship !== our) {
        g[our]?.delete(pal.ship);
      }
    }
  } else if (config.hear === "targets") {
    for (const pal of pals) {
      if (!pal.target) g[our]?.delete(pal.ship);
    }
  }

  return g;
}

export function shortestPath(graph: Graph, from: Ship, to: Ship, maxHops: number): Ship[] | null {
  if (from === to) return [from];
  const q: Ship[][] = [[from]];
  const seen = new Set<Ship>([from]);
  while (q.length) {
    const path = q.shift()!;
    const last = path[path.length - 1]!;
    if (path.length - 1 >= maxHops) continue;
    for (const nxt of graph[last] ?? []) {
      if (seen.has(nxt)) continue;
      const next = [...path, nxt];
      if (nxt === to) return next;
      seen.add(nxt);
      q.push(next);
    }
  }
  return null;
}

export function discover(
  our: Ship,
  pals: PalRecord[],
  config: GossipConfig,
  extra: PluginListing[] = [],
): HeardPlugin[] {
  if (config.hops <= 0) {
    return extra
      .filter((p) => p.origin === our)
      .map((p) => ({
        ...p,
        hop: 0,
        path: [our],
        heardAt: 0,
        local: true,
      }));
  }

  const graph = buildGraph(our, pals, config);
  const listings = [...CATALOG, ...extra];
  const heard: HeardPlugin[] = [];

  for (const listing of listings) {
    if (listing.origin === our) {
      heard.push({
        ...listing,
        hop: 0,
        path: [our],
        heardAt: 0,
        local: true,
      });
      continue;
    }

    const path = shortestPath(graph, our, listing.origin, config.hops);
    if (!path) continue;

    const hop = path.length - 1;
    if (hop < 1 || hop > config.hops) continue;

    if (!allowedOrigin(pals, config.hear, listing.origin, hop, path)) continue;

    heard.push({
      ...listing,
      hop,
      path,
      heardAt: 0,
      local: false,
    });
  }

  return heard.sort((a, b) => a.hop - b.hop || a.name.localeCompare(b.name));
}

function allowedOrigin(
  pals: PalRecord[],
  hear: HearMode,
  origin: Ship,
  hop: number,
  path: Ship[],
): boolean {
  if (hear === "anybody") return true;
  const firstHop = path[1];
  const pal = pals.find((p) => p.ship === firstHop);
  if (!pal) return false;
  if (hear === "targets") return pal.target;
  if (hear === "mutuals") return pal.target && pal.leech;
  return hop >= 1;
}

export function reachableShips(our: Ship, pals: PalRecord[], config: GossipConfig): Map<Ship, number> {
  const graph = buildGraph(our, pals, config);
  const dist = new Map<Ship, number>();
  dist.set(our, 0);
  const q: Ship[] = [our];
  while (q.length) {
    const cur = q.shift()!;
    const d = dist.get(cur) ?? 0;
    if (d >= config.hops) continue;
    for (const nxt of graph[cur] ?? []) {
      if (dist.has(nxt)) continue;
      dist.set(nxt, d + 1);
      q.push(nxt);
    }
  }
  return dist;
}
