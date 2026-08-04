/**
 * Security regression (#4694 sibling-path gate parity): the compression
 * run-telemetry route MUST authenticate before disclosing telemetry, mirroring
 * its sibling `settings/compression/route.ts`. A behavioral 401 test would need
 * full DB/settings bootstrap (isAuthenticated reads settings), so this is a
 * source guard that fails if the auth gate is removed or reordered after the
 * data call — the same wiring-guard pattern used elsewhere in the suite.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROUTE = join(
  __dirname,
  "../../src/app/api/settings/compression/run-telemetry/route.ts"
);

test("run-telemetry GET imports isAuthenticated from the shared auth util", () => {
  const src = readFileSync(ROUTE, "utf8");
  assert.match(src, /import\s*\{[^}]*\bisAuthenticated\b[^}]*\}\s*from\s*["']@\/shared\/utils\/apiAuth["']/);
});

test("run-telemetry GET gates on auth and returns 401 before reading telemetry", () => {
  const src = readFileSync(ROUTE, "utf8");

  const authIdx = src.indexOf("isAuthenticated(request)");
  const unauthorizedIdx = src.search(/status:\s*401/);
  const dataIdx = src.indexOf("getCompressionRunTelemetrySummary(");

  assert.ok(authIdx > 0, "must call isAuthenticated(request)");
  assert.ok(unauthorizedIdx > 0, "must return a 401 on failed auth");
  assert.ok(dataIdx > 0, "must call getCompressionRunTelemetrySummary");

  // The auth check and its 401 must come BEFORE the telemetry read.
  assert.ok(authIdx < dataIdx, "auth check must precede the telemetry read");
  assert.ok(unauthorizedIdx < dataIdx, "401 response must precede the telemetry read");
});

test("run-telemetry GET receives the request object (so auth can read it)", () => {
  const src = readFileSync(ROUTE, "utf8");
  assert.match(src, /export\s+async\s+function\s+GET\s*\(\s*request\s*:/);
});
