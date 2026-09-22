#!/bin/sh
# Build ui/ and print globulator steps for a publisher ship.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT/ui"
npm ci
npm run build
echo
echo "SPA is in $ROOT/ui/dist"
echo "On the publisher ship, open /docket/upload"
echo "Desk: omart"
echo "Select the whole ui/dist directory, then glob."
echo "For Ames publish, desk/desk.docket-0 should contain:"
echo "  glob-ames+[~your-ship 0v0]"
echo "instead of site+/apps/omart"
