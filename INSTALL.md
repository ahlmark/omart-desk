# Install and publish %omart

Kelvin: `[%zuse 408]`. Change `desk/sys.kelvin` if your ship is on a newer `%zuse`.

Requires **%pals**. If needed:

```
|install ~paldev %pals
```

## Copy the desk onto a pier

From this repo, with `%omart` already created and mounted (`|new-desk %omart`, `|mount %omart`):

```
./scripts/install-to-pier.sh /path/to/pier
```

That copies **only** `desk/` into `$PIER/omart` (never `ui/` or `node_modules`). Then:

```
|commit %omart
|install our %omart
```

On some piers unix `|commit` is unreliable; you can still `|commit` after a clean mount, or use Clay `%info`/`foal` as on the development fake zod.

## Build the UI and glob (Landscape)

```
cd ui
npm ci
npm run build
```

Then on the **publisher** ship, open `http://<ship>/docket/upload`, desk `%omart`, and glob the whole `ui/dist` directory.

For Ames distribution, change `desk/desk.docket-0` from `%site` to:

```
  base+'omart'
  glob-ames+[~your-ship 0v0]
```

(The hash is rewritten on upload.) Then:

```
:treaty|publish %omart
```

Others install with:

```
|install ~your-ship %omart
```

Until a glob is uploaded, this desk’s docket still uses `%site /apps/omart` so Gall can serve the SPA itself.

## Gossip defaults

hops 1, hear/tell `%targets`, pass off. Change them in the Pals page; that pokes Gall.
