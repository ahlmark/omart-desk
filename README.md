# omart

Gossip-discovered Omarchy plugin bazaar for Urbit.

This repository is one tree:

| Path | What it is |
|---|---|
| `desk/` | Gall desk (`%omart`). Copy this onto a pier. |
| `ui/` | Vite/React client. Build this, then glob it for Landscape. |
| `scripts/` | Install onto a local pier; prepare a glob. |

The agent **depends on `%pals`** (install `~paldev %pals` if you do not have it). This desk does not ship a pals agent.

Clone:

```
git clone https://github.com/ahlmark/omart-desk.git
cd omart-desk
```

## Layout

```
desk/                 # Clay desk
  app/omart.hoon
  lib/ gossip pals server
  sur/ omart pals
  mar/ omart-* gossip pals
  gen/omart/
  desk.bill           # ~[%omart]
  desk.docket-0       # Landscape tile
  sys.kelvin          # [%zuse 408]
ui/                   # SPA (base /apps/omart/)
scripts/
```

## API

Mutating routes need a logged-in session, header `x-omart: 1`, and a matching `Origin`.

| Method | Path | Auth |
|---|---|---|
| GET | `/omart/listings.json` | no |
| GET | `/omart/pals.json` | yes |
| GET | `/omart/config.json` | yes |
| POST | `/omart/publish` | yes |
| POST | `/omart/retract` | yes |
| POST | `/omart/meet` | yes |
| POST | `/omart/part` | yes |
| POST | `/omart/config` | yes |

Gossip defaults: hops 1, hear/tell `%targets`, pass off.

See `INSTALL.md` for live-ship install and glob publishing.
