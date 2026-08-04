import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

/**
 * Hard Rule #12: catch-block error responses must route through
 * `sanitizeErrorMessage()` (or `buildErrorBody()`), never return raw
 * `err.message`. See docs/security/ERROR_SANITIZATION.md.
 *
 * These two routes wrap DB writes + registry `registerHook`, whose
 * SQLite failures can surface with internal path fragments (e.g.
 * "SQLITE_ERROR: near /var/lib/omniroute/..."). Guard against
 * regression by asserting the raw `error?.message ||` pattern is
 * absent and `sanitizeErrorMessage` is imported.
 */

const ROUTES = [
  "src/app/api/middleware/hooks/route.ts",
  "src/app/api/middleware/hooks/[name]/route.ts",
];

for (const path of ROUTES) {
  test(`${path} imports sanitizeErrorMessage from open-sse/utils/error`, () => {
    const source = readFileSync(path, "utf8");
    assert.ok(
      /import\s*\{[^}]*\bsanitizeErrorMessage\b[^}]*\}\s*from\s*["']@omniroute\/open-sse\/utils\/error["']/.test(
        source
      ),
      `expected ${path} to import sanitizeErrorMessage from "@omniroute/open-sse/utils/error"`
    );
  });

  test(`${path} does not return raw error?.message in NextResponse.json`, () => {
    const source = readFileSync(path, "utf8");
    assert.ok(
      !/error\?\.message\s*\|\|/.test(source),
      `expected ${path} to have no raw \`error?.message ||\` fallback (Hard Rule #12)`
    );
  });
}
