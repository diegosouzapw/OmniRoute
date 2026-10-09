// #15159 M-01 — "`createMcpServer` is a 784-line registration file".
//
// The catalog's prescription for M-01 was three parts:
//
//   1. cycles 193/194 — server.ts -> catalog.ts, server.ts -> radarCatalog.ts
//   2. the internal hop -> its own leaf module
//   3. "file = register + wrap. handle* -> tools/canonical/*.ts"
//
// Parts 1 and 2 already landed with M-06 (#15468): the hop is `internalFetch.ts`
// and both catalogs import it directly instead of reaching back through
// `import("./server.ts")`. This file pins part 3 — the one still outstanding —
// and the two invariants that make it safe to keep doing.
//
// Why this needs pinning at all: `server.ts` is the ONLY consumer of these twelve
// handlers (graft: every one has exactly one in-edge, `createMcpServer`), so
// nothing but this test notices when one drifts back inline. The file-size gate
// cannot see it either — A-09's `maxFunctionLines` ratchet does not exist yet.
//
// What is deliberately NOT asserted here:
//   - the handlers' runtime behaviour. That is covered by the vitest MCP suite
//     (essentialTools, createComboTool, dbHealthTool, radarCatalogTool, ...),
//     which drives the real registered tools. Duplicating it here would assert
//     implementation details at a seam that already has 493 green tests.
//   - line counts. A count-based guard makes every unrelated edit to server.ts a
//     reason to edit this test, and goes stale on the next legitimate addition.

import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const SERVER = "open-sse/mcp-server/server.ts";

/**
 * Source with comments stripped.
 *
 * The module being split documents at length the pattern it is being split
 * *into* — the fix's own comments quote the removed `import("./server.ts")`
 * line to explain why it went away. Matching raw text would let a code comment
 * turn this guard red, and the next reader would "fix" working code. Same
 * helper, same reason, as `mcp-internal-hop-single-source-15159.test.ts`.
 *
 * ORDER MATTERS: line comments are stripped FIRST. A block-comment regex
 * cannot tell a real block opener from the one inside a line comment's own
 * prose — and this file's comments legitimately contain paths like
 * `tools/canonical/<star>.ts`. Stripping block comments first made that
 * embedded opener start a "comment" that ran to the next closing marker and
 * silently deleted ~450 lines of real source, so the import assertions below
 * passed vacuously. The `[^:]` guard on the line pattern keeps a doubled slash
 * inside a URL intact.
 */
function code(path: string): string {
  return readFileSync(new URL(`../../${path}`, import.meta.url), "utf8")
    .replace(/(^|[^:])\/\/.*$/gm, "$1")
    .replace(/\/\*[\s\S]*?\*\//g, "");
}

/**
 * The twelve handlers M-01 moves out of `server.ts`, keyed by the module that
 * now owns each one.
 *
 * Grouping is by what the handler talks to, not by one-module-per-handler:
 * `health` reads three monitoring endpoints; the four combo handlers all speak
 * to `/api/combos*`; the three web handlers all speak to `/v1/*`. That yields
 * files of 40-100 lines instead of thirteen near-copies of the same
 * fetch/audit/return shape, and it matches how the thirteen modules already in
 * `tools/` are organised (`advancedTools.ts` holds sixteen handlers).
 */
const EXTRACTED: Record<string, readonly string[]> = {
  "open-sse/mcp-server/tools/opsTools.ts": [
    "handleGetHealth",
    "handleListCombos",
    "handleGetComboMetrics",
    "handleSwitchCombo",
    "handleCreateCombo",
    "handleCheckQuota",
  ],
  "open-sse/mcp-server/tools/inferenceTools.ts": [
    "handleRouteRequest",
    "handleCostReport",
    "handleListModelsCatalog",
  ],
  "open-sse/mcp-server/tools/webTools.ts": ["handleWebSearch", "handleXSearch", "handleWebFetch"],
};

/**
 * The coercion helpers the twelve handlers share.
 *
 * These are the reason this refactor is not a pure file move: `withScopeEnforcement`
 * (staying in server.ts, it wraps every registration) also calls `toRecord`, so
 * leaving the helpers behind would force `tools/*` to import from `server.ts` —
 * which is precisely the edge M-06 just removed to close cycles 193/194. They
 * have to land in a leaf both sides can import.
 *
 * `toFiniteNumber`, not `toNumber`: `no-restricted-syntax` (#7879) bars a local
 * `toNumber` because `src/shared/utils/numeric.ts` owns that name, and the old
 * `server.ts` carried a suppression for it. The rename removes that suppression
 * instead of relocating it into a new file. Semantics are deliberately
 * unchanged by the move — see the note on the function itself.
 */
const COERCION_LEAF = "open-sse/mcp-server/coercions.ts";
const COERCION_HELPERS = [
  "toRecord",
  "toArray",
  "toString",
  "toFiniteNumber",
  "isLaneFlagOn",
  "toUptimeString",
  "normalizeComboModels",
] as const;

const ALL_HANDLERS = Object.values(EXTRACTED).flat();

test("M-01: the twelve registration handlers live in tools/, not inline in server.ts", () => {
  const server = code(SERVER);
  for (const handler of ALL_HANDLERS) {
    assert.doesNotMatch(
      server,
      new RegExp(`function\\s+${handler}\\s*[(<]`),
      `${handler} is still defined in server.ts — M-01 requires it in tools/`
    );
  }
});

test("M-01: every extracted handler is exported by its owning module", () => {
  for (const [modulePath, handlers] of Object.entries(EXTRACTED)) {
    const moduleUrl = new URL(`../../${modulePath}`, import.meta.url);
    assert.ok(existsSync(moduleUrl), `expected ${modulePath} to exist — M-01's extraction target`);
    const moduleCode = code(modulePath);
    for (const handler of handlers) {
      assert.match(
        moduleCode,
        new RegExp(`export\\s+(async\\s+)?function\\s+${handler}\\s*[(<]`),
        `${handler} must be exported from ${modulePath} so server.ts can import it`
      );
    }
  }
});

test("M-01: server.ts imports the handlers instead of defining them", () => {
  const server = code(SERVER);
  for (const [modulePath, handlers] of Object.entries(EXTRACTED)) {
    const importPath = `./${modulePath.replace(/^open-sse\/mcp-server\//, "")}`;
    assert.match(
      server,
      new RegExp(`from\\s+"${importPath.replace(/[./]/g, "\\$&")}"`),
      `server.ts must import from ${importPath} — a handler defined inline still needs its own copy`
    );
    for (const handler of handlers) {
      assert.match(
        server,
        new RegExp(`\\b${handler}\\b`),
        `${handler} is no longer referenced by server.ts — is its registration still wired?`
      );
    }
  }
});

test("M-01: the coercion helpers moved to a leaf, so tools/ never imports server.ts", () => {
  // The invariant that keeps cycles 193/194 closed. If any tools/* module reached
  // back into server.ts for a helper, the edge would reopen — and `check-cycles`
  // would only report it as one more anonymous SCC, not as this regression.
  assert.ok(
    existsSync(new URL(`../../${COERCION_LEAF}`, import.meta.url)),
    `${COERCION_LEAF} must exist — without a shared leaf, tools/* would import server.ts`
  );
  const leafCode = code(COERCION_LEAF);
  for (const helper of COERCION_HELPERS) {
    assert.match(
      leafCode,
      new RegExp(`export\\s+function\\s+${helper}\\s*[(<]`),
      `${helper} must be exported from ${COERCION_LEAF}`
    );
  }
  // The leaf must not import server.ts itself, for the same reason.
  assert.doesNotMatch(
    leafCode,
    /from\s+"\.\/server\.ts"/,
    `${COERCION_LEAF} must stay a leaf — importing server.ts would close the cycle it exists to avoid`
  );
});

test("M-01: no tools/ module imports server.ts (cycle 193/194 stay closed)", () => {
  for (const modulePath of Object.keys(EXTRACTED)) {
    assert.doesNotMatch(
      code(modulePath),
      /from\s+"(?:\.\.\/)*server\.ts"/,
      `${modulePath} imports server.ts — M-06 removed exactly this edge to close cycles 193/194`
    );
  }
});

test("M-01: SHAPE-SANITY — this guard can actually fail", () => {
  // Without this, a broken matcher (a typo'd regex, a bad path) would make all
  // five assertions above pass vacuously — green tests, undone refactor. The
  // negative control proves the detector works: define a handler that IS still
  // inline in server.ts and confirm the same pattern fires.
  const server = code(SERVER);
  assert.match(
    server,
    /function\s+createMcpServer\s*\(/,
    "server.ts should still define createMcpServer — if this fails the fixture is stale"
  );
  const inlineHandler = /function\s+withScopeEnforcement\s*[(<]/.test(server);
  assert.ok(
    inlineHandler,
    "withScopeEnforcement is intentionally NOT extracted; if it disappears the negative control is void"
  );
  // And the positive control: a name that is extracted must NOT match inline.
  assert.doesNotMatch(
    server,
    /function\s+handleGetHealth\s*[(<]/,
    "handleGetHealth must be gone from server.ts for the guard above to mean anything"
  );
});
