#!/usr/bin/env bash
# macOS notarization helper. Requires Xcode 13+ and a valid
# Developer ID Application certificate in the keychain.
#
# Reads credentials from env (.env or CI secrets):
#   APPLE_ID, APPLE_PASSWORD, APPLE_TEAM_ID, APPLE_SIGNING_IDENTITY
# Reads DMG path from $1 (or .build/OmniRoute_x.y.z_aarch64.dmg).

set -euo pipefail

DMG="${1:-.build/OmniRoute_aarch64.dmg}"
TEAM_ID="${APPLE_TEAM_ID:?APPLE_TEAM_ID required}"
APPLE_ID="${APPLE_ID:?APPLE_ID required}"
APPLE_PASSWORD="${APPLE_PASSWORD:?APPLE_PASSWORD required (app-specific)}"
SIGN_ID="${APPLE_SIGNING_IDENTITY:?APPLE_SIGNING_IDENTITY required}"

echo "==> Submitting $DMG to Apple notary service"
xcrun notarytool submit "$DMG" \
  --apple-id "$APPLE_ID" \
  --password "$APPLE_PASSWORD" \
  --team-id "$TEAM_ID" \
  --wait \
  --output-format json

echo "==> Stapling notarization ticket"
xcrun stapler staple "$DMG"

echo "==> Validating"
xcrun stapler validate "$DMG"
echo "OK: $DMG is signed, notarized, and stapled."
