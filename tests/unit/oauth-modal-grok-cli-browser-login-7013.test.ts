import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// #7013: grok-cli now ships its own browser PKCE login alongside the
// pre-existing paste-token import. Regression guard for the two
// set-membership flips in OAuthModal.tsx that gate the "Browser Login" tab.
// Source-level guard (like oauth-device-code-error-transparency.test.ts):
// OAuthModal is a "use client" component with heavy runtime deps (next-intl,
// popup/fetch orchestration); pinning the exact provider-set membership by
// source inspection is the lightweight, reliable check for this regression.
const here = dirname(fileURLToPath(import.meta.url));
const modal = readFileSync(
  resolve(here, "../../src/shared/components/OAuthModal.tsx"),
  "utf8"
);

function extractSet(constName: string): string[] {
  const match = modal.match(new RegExp(`const ${constName} = new Set\\(\\[([^\\]]*)\\]\\)`));
  assert.ok(match, `expected to find ${constName} in OAuthModal.tsx`);
  return match![1].split(",").map((s) => s.trim().replace(/^"|"$/g, "")).filter(Boolean);
}

test("grok-cli is NOT import-token-only — the Browser Login tab renders", () => {
  assert.ok(!extractSet("IMPORT_TOKEN_ONLY_PROVIDERS").includes("grok-cli"));
});

test("windsurf/devin-cli stay import-token-only (no regression to the Phase-1 hotfix)", () => {
  const set = extractSet("IMPORT_TOKEN_ONLY_PROVIDERS");
  assert.ok(set.includes("windsurf"));
  assert.ok(set.includes("devin-cli"));
});

test("grok-cli uses the local PKCE callback server, alongside codex/xai-oauth", () => {
  const set = extractSet("PKCE_CALLBACK_SERVER_PROVIDERS");
  assert.ok(set.includes("grok-cli"));
  assert.ok(set.includes("codex"));
  assert.ok(set.includes("xai-oauth"));
});
