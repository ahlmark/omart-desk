# Contributing to Omart

Issues and pull requests are welcome. Please read the [anti-code of conduct](CODE_OF_CONDUCT.md) first.

## Report a bug

Open an issue and include:

- what you expected
- what the ship did
- the dojo or browser steps
- your `%zuse` kelvin if the desk failed to install

Security problems (gossip, login, the `x-omart` check) go to a [private advisory](https://github.com/ahlmark/omart-desk/security/advisories/new), not a public issue. See [SECURITY.md](SECURITY.md).

## Change the UI

From a clone:

```
cd ui
npm ci
npm run dev
```

The dev server is for local preview. The ship serves the files in `desk/web/`, not `ui/dist/`.

After the UI change looks right:

```
sh scripts/sync-ui-into-desk.sh
```

That rebuilds `ui/` and writes `desk/web/` (HTML, CSS, icon, and numbered JS chunks). Commit those `desk/web/` files with the source change. Review the diff and add the files you mean to ship:

```
git add ui/src/routes/pals.tsx desk/web/index.html desk/web/assets/app.css desk/web/js
git commit
```

Do not use `git add .`. `ui/node_modules/` and `ui/dist/` are gitignored and must stay that way.

## Change the Gall agent

Agent, marks, and gossip live under `desk/`. The desk depends on `%pals` and does not include `app/pals.hoon`.

Copy onto a mounted pier and commit there:

```
sh scripts/install-to-pier.sh /path/to/pier
```

Then in the dojo:

```
|commit %omart
|install our %omart
```

`scripts/install-to-pier.sh` copies `desk/` only. It leaves the pier's `sys.kelvin` in place.

## Pull requests

- Keep the public name **Omart**. `%omart` is the desk. `omart-desk` is this repository.
- Describe what a ship owner would notice.
- If you touch `ui/`, include the rebuilt `desk/web/` files in the same PR.
