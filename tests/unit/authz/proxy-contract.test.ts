/**
 * Next.js 16 Proxy File Contract — Lockdown Test
 *
 * Next.js 16 deprecated `middleware.ts` in favour of `proxy.ts` (commit
 * 3fb72b973 renamed our copy to match the new convention). The framework
 * only invokes this file when ALL of the following hold:
 *
 *   1. The file lives at `src/proxy.ts` (since `src/app` is the app dir).
 *   2. It exports a function named exactly `proxy` (or default).
 *   3. The function delegates to `runAuthzPipeline` with `enforce: true`.
 *   4. The `config.matcher` covers every prefix routes are mounted under,
 *      so unauthenticated requests cannot slip past the centralized
 *      authorization tiers (PUBLIC / CLIENT_API / MANAGEMENT).
 *
 * Without ANY of these guarantees the pipeline silently becomes dead code
 * and every `/api/*` route falls back to per-route self-enforcement, which
 * is the failure mode that led to the v3.8.4 hardening pass. Lock the
 * contract down here so a future rename / refactor cannot regress it
 * unnoticed.
 *
 * @see docs/security/ROUTE_GUARD_TIERS.md
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("Next.js 16 proxy file exists at src/proxy.ts (not src/middleware.ts)", () => {
  assert.ok(fs.existsSync("src/proxy.ts"), "src/proxy.ts must exist (Next.js 16 file convention)");
  assert.ok(
    !fs.existsSync("src/middleware.ts"),
    "src/middleware.ts must NOT exist — Next.js 16 deprecated middleware.ts, the active file is src/proxy.ts"
  );
});

test("proxy.ts exports a function named 'proxy' (Next.js 16 requires this exact name)", () => {
  const content = fs.readFileSync("src/proxy.ts", "utf8");
  assert.match(
    content,
    /export\s+async\s+function\s+proxy\s*\(/,
    "must export `async function proxy(...)` — Next.js 16 only invokes this exact name"
  );
});

test("proxy.ts delegates to runAuthzPipeline with enforce: true", () => {
  const content = fs.readFileSync("src/proxy.ts", "utf8");
  assert.match(
    content,
    /runAuthzPipeline\([^)]*\{\s*enforce:\s*true\s*\}\s*\)/,
    "must call runAuthzPipeline with { enforce: true } — otherwise the pipeline runs in observe-only mode and never blocks"
  );
});

test("proxy.ts config.matcher covers every /api/* route plus dashboard and v1 aliases", () => {
  const content = fs.readFileSync("src/proxy.ts", "utf8");
  // Required prefixes — drop one and the corresponding routes go unguarded.
  const requiredMatchers = [
    '"/api/:path*"',
    '"/dashboard/:path*"',
    '"/v1/:path*"',
    '"/v1beta/:path*"',
    '"/chat/:path*"',
    '"/responses/:path*"',
    '"/codex/:path*"',
    '"/models"',
  ];
  for (const matcher of requiredMatchers) {
    assert.ok(
      content.includes(matcher),
      `proxy.ts config.matcher must include ${matcher} — otherwise routes under that prefix bypass the authz pipeline`
    );
  }
});

test("proxy.ts does not declare runtime: 'edge' (Next.js 16 proxy is Node-only)", () => {
  const content = fs.readFileSync("src/proxy.ts", "utf8");
  assert.ok(
    !/runtime:\s*['"]edge['"]/.test(content),
    "proxy.ts MUST NOT set runtime: 'edge' — Next.js 16 only supports nodejs in proxy.ts. The pipeline depends on Node-only modules (jose, better-sqlite3) and would crash at request time on the edge runtime."
  );
});
