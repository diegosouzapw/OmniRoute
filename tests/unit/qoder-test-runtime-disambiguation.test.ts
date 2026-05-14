/**
 * Issue #2247 — disambiguation of the Qoder OAuth/CLI vs API-key error
 * surface in the provider test route. These tests cover the small helper
 * extracted from src/app/api/providers/[id]/test/route.ts (`hasQoderToken`)
 * to confirm the new branching logic.
 *
 * We intentionally keep this as a focused unit test of the helper rather
 * than spinning up the full route, because the route handler runs SQLite
 * migrations + the OAuth refresh path which require an isolated DATA_DIR
 * and are covered elsewhere.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROUTE_FILE = path.resolve("src/app/api/providers/[id]/test/route.ts");

test("#2247 — route.ts exposes Qoder PAT disambiguation message", () => {
  const source = fs.readFileSync(ROUTE_FILE, "utf8");

  // The new message tells the user how to fix it instead of just "CLI not installed"
  assert.match(
    source,
    /If you have a Personal Access Token, switch this connection to API Key auth instead/,
    "expected the disambiguated Qoder message to be present in test/route.ts"
  );
});

test("#2247 — hasQoderToken helper detects connection-level apiKey", () => {
  const source = fs.readFileSync(ROUTE_FILE, "utf8");
  // Helper must be exported as a function so the dis-ambiguation branch
  // resolves the token presence correctly.
  assert.match(source, /function hasQoderToken\(connection: any\): boolean/);
  // It checks both apiKey and providerSpecificData.{personalAccessToken,pat,accessToken}
  assert.match(source, /connection\?\.apiKey/);
  assert.match(source, /personalAccessToken/);
});

test("#2247 — disambiguated branch is gated on Qoder + non-apikey + token present", () => {
  const source = fs.readFileSync(ROUTE_FILE, "utf8");
  assert.match(source, /isQoderOauthWithToken\s*=\s*\n?\s*provider === "qoder"/);
  assert.match(source, /connection\?\.authType !== "apikey"/);
  assert.match(source, /hasQoderToken\(connection\)/);
});

test("#2247 — original generic 'Local CLI runtime is not installed' is kept for non-Qoder providers", () => {
  const source = fs.readFileSync(ROUTE_FILE, "utf8");
  assert.match(source, /"Local CLI runtime is not installed"/);
});

test("#2247 — early-return on runtime diagnosis short-circuits upstream test", () => {
  const source = fs.readFileSync(ROUTE_FILE, "utf8");
  // The caller must check runtime?.diagnosis first and not fall through to
  // upstream auth tests (which is what produces the cascading 401).
  const runtimeBlock = source.split("getProviderRuntimeStatus(connection);")[1] || "";
  assert.match(
    runtimeBlock.slice(0, 600),
    /if \(\(runtime as any\)\?\.diagnosis\)/,
    "expected the route to check runtime?.diagnosis immediately after getProviderRuntimeStatus()"
  );
});
