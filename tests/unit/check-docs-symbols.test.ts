import { test } from "node:test";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  resolveApiDocPathToRoute,
  extractDocApiPaths,
  findStaleDocApiRefs,
  collectRouteFiles,
  KNOWN_STALE_DOC_REFS,
} from "../../scripts/check/check-docs-symbols.mjs";
import { reportStaleEntries } from "../../scripts/check/lib/allowlist.mjs";

// Tipos explícitos (não `any`) para as exports do .mjs — mantém o test em 0 warnings de
// no-explicit-any (catraca 3482) usando `as <Type>`.
const resolve = resolveApiDocPathToRoute as (apiPath: string, routeFiles: Set<string>) => boolean;
const extract = extractDocApiPaths as (src: string) => string[];
const findStale = findStaleDocApiRefs as (
  docPathsByFile: { file: string; paths: string[] }[],
  routeFiles: Set<string>,
  allowlist: Set<string>
) => string[];
const collect = collectRouteFiles as () => Set<string>;
const allowlist = KNOWN_STALE_DOC_REFS as Set<string>;

const here = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.resolve(here, "../../scripts/check/check-docs-symbols.mjs");
const REPO = path.resolve(here, "../..");

// --- resolveApiDocPathToRoute --------------------------------------------------------

test("resolves a static doc path to a real route", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolve("/api/usage", files), true);
});

test("resolves a {param} doc segment against a real [param] dynamic segment", () => {
  const files = new Set(["src/app/api/providers/[id]/models/route.ts"]);
  assert.equal(resolve("/api/providers/{providerId}/models", files), true);
});

test("resolves a :param (Express-style) doc segment too", () => {
  const files = new Set(["src/app/api/shadow/[id]/route.ts"]);
  assert.equal(resolve("/api/shadow/:id", files), true);
});

test("resolves a doc path that is a prefix of a deeper route (family reference)", () => {
  const files = new Set(["src/app/api/auth/login/route.ts"]);
  assert.equal(resolve("/api/auth", files), true);
});

test("resolves into a catch-all route segment", () => {
  const files = new Set(["src/app/api/mcp/[...transport]/route.ts"]);
  assert.equal(resolve("/api/mcp/sse/extra", files), true);
});

test("flags a hallucinated route with no matching file", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolve("/api/shadow/metrics", files), false);
});

test("does NOT match when the doc path is deeper than the real route", () => {
  const files = new Set(["src/app/api/acp/agents/route.ts"]);
  assert.equal(resolve("/api/acp/agents/refresh", files), false);
});

test("static segment mismatch is not absorbed by an unrelated dynamic route", () => {
  const files = new Set(["src/app/api/plugins/[name]/activate/route.ts"]);
  // /api/plugins/{id}/enable: dynamic seg ok, but "enable" != "activate"
  assert.equal(resolve("/api/plugins/{id}/enable", files), false);
});

// --- extractDocApiPaths --------------------------------------------------------------

test("extracts an /api path from a code fence", () => {
  const md = "```\nGET /api/cache/stats\n```";
  assert.deepEqual(extract(md), ["/api/cache/stats"]);
});

test("extracts an /api path from inline code and strips trailing prose punctuation", () => {
  const md = "Call `/api/usage`, then check the result.";
  assert.deepEqual(extract(md), ["/api/usage"]);
});

test("keeps balanced [param] / {param} segments intact", () => {
  const md = "DELETE | `/api/shadow/[id]` | and `/api/tools/agent-bridge/agents/{id}/state`";
  assert.deepEqual(extract(md), ["/api/shadow/[id]", "/api/tools/agent-bridge/agents/{id}/state"]);
});

test("does NOT capture a source-file path tail (src/lib/api/..., @/app/api/...)", () => {
  const md = "see `src/lib/api/requireManagementAuth.ts` and `@/app/api/oauth/route.ts`";
  assert.deepEqual(extract(md), []);
});

test("ignores file references ending in .ts even when URL-shaped", () => {
  // file-ref filter lives in findStaleDocApiRefs; extract still returns it, but the
  // capture must not include the leading file-path context.
  const md = "endpoint is /api/cache/route.ts in the tree";
  assert.deepEqual(extract(md), ["/api/cache/route.ts"]);
});

test("drops a trailing markdown-emphasis underscore (table italics)", () => {
  const md = "| _500 no POST /api/cli-tools/config_ | _Zod faltando_ |";
  assert.deepEqual(extract(md), ["/api/cli-tools/config"]);
});

test("discards a segment with an unbalanced bracket (regex truncation in prose)", () => {
  // greedy regex captured "/api/mcp/{status" — drop the dangling segment, keep prefix.
  const md = "the `/api/mcp/{status` field (prose ran on)";
  assert.deepEqual(extract(md), ["/api/mcp"]);
});

// --- findStaleDocApiRefs -------------------------------------------------------------

const routes = new Set([
  "src/app/api/usage/route.ts",
  "src/app/api/providers/[id]/models/route.ts",
]);

test("passes a doc path that resolves to a real route", () => {
  const docs = [{ file: "docs/x.md", paths: ["/api/usage"] }];
  assert.deepEqual(findStale(docs, routes, new Set()), []);
});

test("flags a hallucinated doc path as 'file → path'", () => {
  const docs = [{ file: "docs/x.md", paths: ["/api/ghost"] }];
  assert.deepEqual(findStale(docs, routes, new Set()), ["docs/x.md → /api/ghost"]);
});

test("allowlisted stale path is frozen (not flagged)", () => {
  const docs = [{ file: "docs/x.md", paths: ["/api/ghost"] }];
  assert.deepEqual(findStale(docs, routes, new Set(["/api/ghost"])), []);
});

test("IGNORE swallows the OpenAI-compat /api/v1 proxy surface", () => {
  const docs = [{ file: "docs/x.md", paths: ["/api/v1/chat/completions"] }];
  assert.deepEqual(findStale(docs, routes, new Set()), []);
});

test("IGNORE swallows obvious example/placeholder paths", () => {
  const docs = [{ file: "docs/x.md", paths: ["/api/your-route/here", "/api/example/foo"] }];
  assert.deepEqual(findStale(docs, routes, new Set()), []);
});

test("file-ref paths (.ts / /route) are skipped, not flagged", () => {
  const docs = [{ file: "docs/x.md", paths: ["/api/cache/route.ts", "/api/oauth/route"] }];
  assert.deepEqual(findStale(docs, routes, new Set()), []);
});

// --- live gate smoke -----------------------------------------------------------------

test("collectRouteFiles finds the real route tree (non-empty, all route.ts)", () => {
  const files = collect();
  assert.ok(files.size > 100, "expected the full route tree");
  for (const f of files) assert.match(f, /route\.tsx?$/);
});

test("KNOWN_STALE_DOC_REFS is a frozen, documented allowlist (non-empty)", () => {
  assert.ok(allowlist.size > 0);
  for (const p of allowlist) assert.match(p, /^\/api\//);
});

// NOTE: the compression research docs that used to live in docs/research/compression/
// moved to the isolated, gitignored _tasks/research/compression/ repo, so the gate no
// longer scans them. The integration smoke stays skipped to keep this unit suite hermetic
// (it asserts the pure helpers, not the live filesystem walk).

// --- stale-allowlist enforcement (6A.3) ---

test("stale-enforcement: allowlist entry with no live miss is reported as stale", () => {
  // Simulate an allowlist path whose doc was corrected (route now exists or path removed).
  const liveMissPaths: string[] = ["/api/discovery/results"]; // one live miss remains
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    new Set(["/api/discovery/results", "/api/ghost-fixed"]),
    liveMissPaths,
    "check-docs-symbols"
  );
  assert.deepEqual(stale, ["/api/ghost-fixed"]);
});

test("stale-enforcement: all current KNOWN_STALE_DOC_REFS entries look like /api/ paths", () => {
  // Structural invariant: every allowlist entry must be an /api/ path, not a file path
  // or a prose snippet.  Live staleness is enforced at gate runtime by assertNoStale().
  const al = allowlist as Set<string>;
  assert.ok(al.size > 0, "KNOWN_STALE_DOC_REFS should be non-empty");
  for (const entry of al) {
    assert.match(entry, /^\/api\//, `every allowlist entry must start with /api/: ${entry}`);
  }
});
