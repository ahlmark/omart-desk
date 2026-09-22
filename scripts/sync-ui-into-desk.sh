#!/bin/sh
# Build ui/ and copy the bundle into desk/web so |install ships the SPA.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT/ui"
npm ci
npm run build
rm -rf "$ROOT/desk/web"
mkdir -p "$ROOT/desk/web/assets" "$ROOT/desk/web/js"
cp dist/index.html "$ROOT/desk/web/"
cp dist/assets/app.css "$ROOT/desk/web/assets/"
cp dist/icon.svg "$ROOT/desk/web/"
if [ -f dist/icon.png ]; then
  cp dist/icon.png "$ROOT/desk/web/"
fi
python3 - "$ROOT/desk/web/js" dist/assets/app.js << 'PY'
import os, sys
dest, src = sys.argv[1], sys.argv[2]
data = open(src, "rb").read()
size = 48_000
n = max(1, (len(data) + size - 1) // size)
os.makedirs(dest, exist_ok=True)
for i in range(n):
    open(os.path.join(dest, f"{i}.js"), "wb").write(data[i * size : (i + 1) * size])
print(f"split app.js into {n} chunks")
PY
echo "Wrote $ROOT/desk/web"
