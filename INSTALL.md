# Install and publish %omart

Kelvin: `[%zuse 408]`. Change `desk/sys.kelvin` if your ship is on a newer `%zuse`.

Requires **%pals**. If needed:

```
|install ~paldev %pals
```

The built UI lives in `desk/web/`. `|install ~pilryg-tanmus-hopsec-mitwel--nodreb-sigtul-falhut-samzod %omart` copies the agent and that UI together. Friends do not run `npm`.

## On the publisher

The live publisher is the mined comet `~pilryg-tanmus-hopsec-mitwel--nodreb-sigtul-falhut-samzod`, pier `/home/ahlmark/urbit/comet`.

Create and mount the desk if it is new:

```
|new-desk %omart
|mount %omart
```

From a clone of this repo:

```
git clone https://github.com/ahlmark/omart-desk.git
cd omart-desk
sh scripts/install-to-pier.sh /home/ahlmark/urbit/comet
```

That copies **only** `desk/` into `$PIER/omart` (including `desk/web/`). Then in the dojo:

```
|commit %omart
|install our %omart
:treaty|publish %omart
```

Do not copy `sys.kelvin` over a live ship's kelvin; the install script leaves the pier's file in place.

## For friends

They need `%pals`, then:

```
|install ~pilryg-tanmus-hopsec-mitwel--nodreb-sigtul-falhut-samzod %omart
```

Landscape opens `/apps/omart`. The tile, left nav, Bazaar, Pals, and Publish screens are the same bundle you ship in `desk/web/`. Their pals list and gossiped listings are from their ship.

## Rebuild the UI (publisher only)

After changing `ui/`:

```
sh scripts/sync-ui-into-desk.sh
sh scripts/install-to-pier.sh /home/ahlmark/urbit/comet
```

Then `|commit %omart` again.

## Gossip defaults

hops 1, hear/tell `%targets`, pass off. Change them in the Pals page; that pokes Gall.
