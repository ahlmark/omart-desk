#!/bin/sh
# Build ui/ and copy the bundle into desk/web so |install ships the SPA.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT/ui"
npm ci
npm run build
rm -rf "$ROOT/desk/web"
mkdir -p "$ROOT/desk/web/assets"
cp dist/index.html "$ROOT/desk/web/"
cp dist/assets/app.js "$ROOT/desk/web/assets/"
cp dist/assets/app.css "$ROOT/desk/web/assets/"
cp dist/icon.svg "$ROOT/desk/web/"
if [ -f dist/icon.png ]; then
  cp dist/icon.png "$ROOT/desk/web/"
fi
echo "Wrote $ROOT/desk/web"
