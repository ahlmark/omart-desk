# omart-desk

Gall overlay for **%omart**, a gossip-discovered Omarchy plugin bazaar.

This is the agent you install on a fake `~zod`. It is not the browser preview.
After install you poke and scry from the dojo.

Repo: https://github.com/ahlmark/omart-desk

## Install onto `~/urbit/zod`

Your pier already has `omart/` and `base/` mounted. From **inside** `~/urbit/zod`:

```
git clone https://github.com/ahlmark/omart-desk.git ~/omart-desk
chmod +x ~/omart-desk/install-to-pier.sh
~/omart-desk/install-to-pier.sh .
```

Then in the dojo:

```
|commit %omart
|install our %omart
```

You want `gall: installing %omart`.

Do **not** copy `sys.kelvin`. Keep the one `|new-desk` wrote.

## Smoke

```
:omart +omart/publish %demo 'Demo plugin' 'https://github.com/you/demo.git' 'a test listing'
+omart/listings
```

Full notes are in `INSTALL.txt`.
