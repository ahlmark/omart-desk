#!/bin/sh
set -eu

usage() {
  echo "Usage: $0 ."
  echo "Run this from inside your pier, or pass the pier path."
  echo "Example (you are in ~/urbit/zod): $0 ."
  exit 1
}

[ "${1:-}" ] || usage
PIER=$1

if [ ! -d "$PIER/omart" ]; then
  echo "No omart/ in $PIER — |new-desk %omart then |mount %omart, then retry."
  exit 1
fi

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

cp -R "$ROOT/app" "$ROOT/lib" "$ROOT/sur" "$ROOT/mar" "$ROOT/gen" "$PIER/omart/"
cp "$ROOT/desk.bill" "$PIER/omart/"

missing=
for f in default-agent.hoon dbug.hoon verb.hoon; do
  if [ -f "$PIER/base/lib/$f" ]; then
    cp "$PIER/base/lib/$f" "$PIER/omart/lib/"
  else
    missing="$missing $f"
  fi
done

if [ -n "$missing" ]; then
  echo "Copied omart files, but missing %base libs:$missing"
  echo "In the dojo run  |mount %base  then run this script again."
  exit 1
fi

echo "Copied into $PIER/omart"
echo "In the dojo:"
echo "  |commit %omart"
echo "  |install our %omart"
