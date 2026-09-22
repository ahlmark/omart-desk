export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type ShipClass = "galaxy" | "star" | "planet";

export function shipClass(ship: string): ShipClass {
  const body = ship.replace(/^~/, "");
  if (!body.includes("-") && body.length <= 3) return "galaxy";
  if (!body.includes("-")) return "star";
  return "planet";
}

export function glyphIndex(ship: string, slot: number): number {
  return (hashString(`${ship}:${slot}`) >>> 0) % 16;
}

/** The ship this frontend already lives on — identity is not minted. */
export const OUR_SHIP = "~zod";

export const NPC_SHIPS = {
  paldev: "~paldev",
  palfun: "~palfun-foslup",
  blakely: "~binzod-marnyt",
  fross: "~litzod-tocryl",
  zolkos: "~ravmel-ropdyl",
  luccast: "~wicdev-wisryt",
  mtolhuys: "~nidsut-tomdun",
  rmcfarlin: "~sampel-palnet",
  stappmus: "~bitbet-budbud",
  kyle: "~talnup-dislev",
  caleb: "~fodwyt-rabtel",
  rejhaa: "~dapnep-ronled",
  mwikala: "~hidweg-linref",
  yuters: "~pagwyt-roldev",
  kristoffer: "~talsur-fodwyt",
  ahmed: "~nidbes-dacsyt",
  ivan: "~rilfun-todmes",
  godhiraj: "~sogryp-maltem",
  cause: "~doznyt-wicref",
  keith: "~marbud-litzod",
} as const;

/** Directed pals graph among NPC ships (targets they have %meet'd). */
export const NPC_TARGETS: Record<string, string[]> = {
  [NPC_SHIPS.palfun]: [NPC_SHIPS.paldev, NPC_SHIPS.mtolhuys, NPC_SHIPS.fross],
  [NPC_SHIPS.paldev]: [NPC_SHIPS.palfun, NPC_SHIPS.blakely],
  [NPC_SHIPS.blakely]: [
    NPC_SHIPS.rmcfarlin,
    NPC_SHIPS.stappmus,
    NPC_SHIPS.kyle,
    NPC_SHIPS.ahmed,
  ],
  [NPC_SHIPS.fross]: [NPC_SHIPS.zolkos, NPC_SHIPS.luccast, NPC_SHIPS.palfun],
  [NPC_SHIPS.zolkos]: [NPC_SHIPS.fross, NPC_SHIPS.godhiraj, NPC_SHIPS.ivan],
  [NPC_SHIPS.luccast]: [NPC_SHIPS.keith, NPC_SHIPS.fross],
  [NPC_SHIPS.mtolhuys]: [NPC_SHIPS.palfun, NPC_SHIPS.yuters],
  [NPC_SHIPS.rmcfarlin]: [NPC_SHIPS.blakely, NPC_SHIPS.caleb],
  [NPC_SHIPS.stappmus]: [NPC_SHIPS.blakely],
  [NPC_SHIPS.kyle]: [NPC_SHIPS.caleb, NPC_SHIPS.rejhaa],
  [NPC_SHIPS.caleb]: [NPC_SHIPS.kyle, NPC_SHIPS.rejhaa],
  [NPC_SHIPS.rejhaa]: [NPC_SHIPS.kyle],
  [NPC_SHIPS.mwikala]: [NPC_SHIPS.blakely, NPC_SHIPS.kristoffer],
  [NPC_SHIPS.yuters]: [NPC_SHIPS.mtolhuys, NPC_SHIPS.kristoffer],
  [NPC_SHIPS.kristoffer]: [NPC_SHIPS.mwikala, NPC_SHIPS.cause],
  [NPC_SHIPS.ahmed]: [NPC_SHIPS.blakely],
  [NPC_SHIPS.ivan]: [NPC_SHIPS.zolkos],
  [NPC_SHIPS.godhiraj]: [NPC_SHIPS.zolkos],
  [NPC_SHIPS.cause]: [NPC_SHIPS.kristoffer],
  [NPC_SHIPS.keith]: [NPC_SHIPS.luccast],
};

export const STARTER_PALS = [NPC_SHIPS.blakely, NPC_SHIPS.fross, NPC_SHIPS.palfun] as const;

export const DISPLAY_NAMES: Record<string, string> = {
  [NPC_SHIPS.paldev]: "paldev",
  [NPC_SHIPS.palfun]: "palfun-foslup",
  [NPC_SHIPS.blakely]: "Brian Blakely",
  [NPC_SHIPS.fross]: "Fross",
  [NPC_SHIPS.zolkos]: "Rob Zolkos",
  [NPC_SHIPS.luccast]: "luccast",
  [NPC_SHIPS.mtolhuys]: "mtolhuys",
  [NPC_SHIPS.rmcfarlin]: "rmcfarlin",
  [NPC_SHIPS.stappmus]: "stappmus",
  [NPC_SHIPS.kyle]: "howdyitskyle",
  [NPC_SHIPS.caleb]: "calebhat",
  [NPC_SHIPS.rejhaa]: "rejhaa",
  [NPC_SHIPS.mwikala]: "mwikala",
  [NPC_SHIPS.yuters]: "yuters",
  [NPC_SHIPS.kristoffer]: "kristofferR",
  [NPC_SHIPS.ahmed]: "Ahmed-Sinkeat",
  [NPC_SHIPS.ivan]: "Ivan Kuznetsov",
  [NPC_SHIPS.godhiraj]: "godhiraj",
  [NPC_SHIPS.cause]: "Cause-of-a-Kind",
  [NPC_SHIPS.keith]: "keithnyc",
};
