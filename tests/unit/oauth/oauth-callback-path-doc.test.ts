import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

// Regression guard for #3732. Browser OAuth (GitLab Duo, Gemini, Antigravity, Cursor, …)
// completes at the single App Router page `/callback` — there is NO per-provider
// `/api/oauth/<provider>/callback` route. `OAuthModal.startOAuthFlow` builds the
// redirect_uri as `<origin>/callback`, so a user who registers a different path in the
// provider console gets "The redirect URI included is not valid". Docs that told users
// to register `<BASE_URL>/api/oauth/<provider>/callback` were wrong and caused #3732.
// These assertions lock the documented path to the real handler.

const cwd = process.cwd();

test("the real browser OAuth callback handler lives at /callback", () => {
  assert.ok(
    existsSync(resolve(join(cwd, "src/app/callback/page.tsx"))),
    "src/app/callback/page.tsx (the /callback handler) must exist"
  );
  // There is no `callback` action in the [provider]/[action] OAuth route, so a
  // `/api/oauth/<provider>/callback` URL is NOT a real endpoint.
  const oauthRoute = readFileSync(
    resolve(join(cwd, "src/app/api/oauth/[provider]/[action]/route.ts")),
    "utf8"
  );
  assert.ok(
    !/action === ["']callback["']/.test(oauthRoute),
    "there must be no `callback` action in the OAuth [provider]/[action] route"
  );
});

test("the Fly.io deployment guide documents the correct /callback redirect URI (#3732)", () => {
  const guide = readFileSync(
    resolve(join(cwd, "docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md")),
    "utf8"
  );
  assert.ok(
    !/\/api\/oauth\/[^/\s]+\/callback/.test(guide),
    "the guide must not tell users to register a per-provider /api/oauth/<provider>/callback URI"
  );
  assert.match(
    guide,
    /<NEXT_PUBLIC_BASE_URL>\/callback/,
    "the guide must document the real `<NEXT_PUBLIC_BASE_URL>/callback` redirect URI"
  );
});
