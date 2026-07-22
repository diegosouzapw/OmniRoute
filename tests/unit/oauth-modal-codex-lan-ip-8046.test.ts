import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { buildPkceLoopbackMismatchWarning } from "../../src/lib/oauth/utils/pkceLoopbackWarning";

// #8046: Codex (and the other PKCE_CALLBACK_SERVER_PROVIDERS: xai-oauth, grok-cli)
// register a FIXED loopback redirect_uri with the upstream OAuth app. On a LAN-IP
// origin (isLocalhost true, isTrueLocalhost false — e.g. 192.168.*/10.*/172.16-31.*),
// OAuthModal used to fall straight through to the standard authorize flow and
// window.open() an authUrl whose embedded redirect_uri can never resolve back to the
// dashboard, with zero warning — surfacing as a silent Auth0 `invalid_state` failure.
//
// Source-level guard (like the sibling oauth-modal-grok-cli-browser-login-7013.test.ts):
// OAuthModal is a "use client" component with heavy runtime deps (next-intl,
// popup/fetch orchestration); pinning the fix by source inspection + a direct unit
// test of the extracted warning-message helper is the reliable check here.
const here = dirname(fileURLToPath(import.meta.url));
const modal = readFileSync(resolve(here, "../../src/shared/components/OAuthModal.tsx"), "utf8");

function extractSet(constName: string): string[] {
  const match = modal.match(new RegExp(`const ${constName} = new Set\\(\\[([^\\]]*)\\]\\)`));
  assert.ok(match, `expected to find ${constName} in OAuthModal.tsx`);
  return match![1]
    .split(",")
    .map((s) => s.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

test("PKCE_CALLBACK_SERVER_PROVIDERS still includes codex (anchor)", () => {
  assert.ok(extractSet("PKCE_CALLBACK_SERVER_PROVIDERS").includes("codex"));
});

test("codex/openai redirectUri is still hardcoded to localhost:1455 (anchor, unchanged)", () => {
  assert.match(modal, /redirectUri = "http:\/\/localhost:1455\/auth\/callback"/);
});

test("PKCE callback-server providers now warn (not window.open) on a LAN-IP origin (#8046 fix)", () => {
  // The callback-server branch must gain an isLocalhost-but-not-isTrueLocalhost arm
  // that surfaces the loopback-mismatch warning instead of falling through silently.
  assert.match(
    modal,
    /else if \(isLocalhost\) \{[\s\S]{0,200}buildPkceLoopbackMismatchWarning/,
    "OAuthModal.tsx should warn via buildPkceLoopbackMismatchWarning() for isLocalhost && !isTrueLocalhost " +
      "inside the PKCE_CALLBACK_SERVER_PROVIDERS branch, instead of silently falling through to " +
      "window.open() an authUrl with an unreachable hardcoded loopback redirect_uri."
  );
});

test("buildPkceLoopbackMismatchWarning mentions the fixed redirect and a way forward", () => {
  const msg = buildPkceLoopbackMismatchWarning("codex");
  assert.match(msg, /localhost:1455/);
  assert.match(msg, /LAN IP/i);
  assert.match(msg, /localhost/i);
});

test("buildPkceLoopbackMismatchWarning has a generic fallback for unknown providers", () => {
  const msg = buildPkceLoopbackMismatchWarning("some-future-pkce-provider");
  assert.match(msg, /fixed localhost callback URL/);
});
