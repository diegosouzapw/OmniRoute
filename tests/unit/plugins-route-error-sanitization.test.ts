/**
 * Static guard tests for Hard Rule #12 — error sanitization in /api/plugins routes.
 *
 * Every `/api/plugins/**` route MUST:
 *   1. NOT return raw `err.message` / `err.stack` in any NextResponse.json body.
 *   2. Import and use `buildErrorBody` from `@omniroute/open-sse/utils/error`.
 *
 * See docs/security/ERROR_SANITIZATION.md and CLAUDE.md hard rule #12.
 * Pattern mirrors tests/unit/route-error-sanitization-v382.test.ts.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readRoute(rel: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, rel), "utf8");
}

// All /api/plugins route files (enumerate explicitly so new files trigger a test update)
const PLUGIN_ROUTES: Array<{ rel: string; label: string }> = [
  { rel: "src/app/api/plugins/route.ts", label: "GET+POST /api/plugins" },
  { rel: "src/app/api/plugins/scan/route.ts", label: "POST /api/plugins/scan" },
  { rel: "src/app/api/plugins/[name]/route.ts", label: "GET+DELETE /api/plugins/[name]" },
  {
    rel: "src/app/api/plugins/[name]/activate/route.ts",
    label: "POST /api/plugins/[name]/activate",
  },
  {
    rel: "src/app/api/plugins/[name]/deactivate/route.ts",
    label: "POST /api/plugins/[name]/deactivate",
  },
  {
    rel: "src/app/api/plugins/[name]/config/route.ts",
    label: "GET+PUT /api/plugins/[name]/config",
  },
];

for (const { rel, label } of PLUGIN_ROUTES) {
  test(`${label}: does NOT contain raw err.message in NextResponse.json body`, () => {
    const src = readRoute(rel);

    // Pattern: NextResponse.json({ error: err.message } — the raw anti-pattern
    assert.ok(
      !/NextResponse\.json\(\s*\{[^}]*error:\s*err\.message/.test(src),
      `${rel}: must not contain NextResponse.json({ error: err.message, ... })`
    );

    // Broader check: err.message must not appear anywhere in a response body context
    // (allow it inside console.error/logger calls)
    const lines = src.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip log/console lines — those are fine server-side
      if (/console\.(error|warn|log|debug|info)/.test(line)) continue;
      if (/logger\.(error|warn|log|debug|info)/.test(line)) continue;
      if (/log\.(error|warn|info|debug)/.test(line)) continue;

      // Flag err.message appearing on non-log lines inside response-building context
      if (/err\.message/.test(line) && /NextResponse\.json|return.*json\(/.test(line)) {
        assert.fail(
          `${rel} line ${i + 1}: raw err.message found in response body:\n  ${line.trim()}`
        );
      }
    }
  });

  test(`${label}: does NOT contain err.stack in any response body`, () => {
    const src = readRoute(rel);
    const lines = src.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/console\.(error|warn|log|debug|info)/.test(line)) continue;
      if (/logger\.(error|warn|log|debug|info)/.test(line)) continue;
      if (/log\.(error|warn|info|debug)/.test(line)) continue;
      if (/err\.stack/.test(line) && /NextResponse\.json|return.*json\(/.test(line)) {
        assert.fail(
          `${rel} line ${i + 1}: raw err.stack found in response body:\n  ${line.trim()}`
        );
      }
    }
  });

  test(`${label}: imports buildErrorBody from @omniroute/open-sse/utils/error`, () => {
    const src = readRoute(rel);
    assert.match(
      src,
      /import \{[^}]*buildErrorBody[^}]*\} from ["']@omniroute\/open-sse\/utils\/error["']/,
      `${rel}: must import buildErrorBody from @omniroute/open-sse/utils/error`
    );
  });

  test(`${label}: uses buildErrorBody(...) in catch blocks`, () => {
    const src = readRoute(rel);
    assert.match(
      src,
      /buildErrorBody\s*\(/,
      `${rel}: must call buildErrorBody() to build error response bodies`
    );
  });
}

// Exhaustiveness check: no extra /api/plugins route files were added without a test
test("all /api/plugins route files are covered by this test suite", () => {
  const pluginsApiDir = path.join(REPO_ROOT, "src/app/api/plugins");
  const found: string[] = [];

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name === "route.ts") {
        found.push(path.relative(REPO_ROOT, full));
      }
    }
  }

  walk(pluginsApiDir);
  found.sort();

  const covered = PLUGIN_ROUTES.map((r) => r.rel).sort();
  assert.deepEqual(
    found,
    covered,
    `Route files on disk differ from those listed in PLUGIN_ROUTES.\n` +
      `On disk: ${JSON.stringify(found)}\n` +
      `Covered: ${JSON.stringify(covered)}`
  );
});
