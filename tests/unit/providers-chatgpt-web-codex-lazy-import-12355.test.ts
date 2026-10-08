// #12355 fixed a static top-level import of chatgptWebCodexAdmin.ts in
// src/app/api/providers/route.ts: that module's transitive chain (the vendor
// ChatGPT-Web browser adapter -> token-estimate.ts -> tiktoken's WASM
// tokenizer) fails to bundle under Turbopack dev mode even with tiktoken
// listed in serverExternalPackages, so a static import evaluated that whole
// chain on EVERY request to the route regardless of provider, turning one
// unrelated provider's bundling bug into a route-wide 500 for everyone.
//
// #12355 only touched the collection route (POST /api/providers) and missed
// the identical pattern in the by-id route (PUT /api/providers/[id]) --
// observed live: renaming a plain openai-compatible connection failed with
// "Missing tiktoken_bg.wasm" after 17-50s, having never touched
// chatgpt-web-codex at all. #12355 also shipped with no regression test,
// which is exactly how the sibling instance went unnoticed.
//
// This pins BOTH general provider routes to stay lazy, and confirms the one
// legitimately-static import (the chatgpt-web-codex-only "doctor" diagnostic
// route, where every request already is for that provider) is left alone --
// this is a source-inspection test, matching
// tests/unit/instrumentation-import-graph-12074.test.ts's own pattern for
// import-graph invariants that can't be exercised by actually bundling under
// Turbopack from this harness.

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const STATIC_IMPORT_RE = /^import\s+[\s\S]*?from\s+["']@omniroute\/open-sse\/services\/chatgptWebCodexAdmin\.ts["'];?\s*$/m;
const DYNAMIC_IMPORT_RE = /await import\(["']@omniroute\/open-sse\/services\/chatgptWebCodexAdmin\.ts["']\)/;

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

for (const routePath of [
  "src/app/api/providers/route.ts",
  "src/app/api/providers/[id]/route.ts",
]) {
  test(`${routePath} does not statically import chatgptWebCodexAdmin.ts`, () => {
    const source = readSource(routePath);
    assert.doesNotMatch(
      source,
      STATIC_IMPORT_RE,
      `${routePath} handles every provider, not just chatgpt-web-codex -- a static import here ` +
        "evaluates tiktoken's bundling-fragile chain on every request regardless of provider"
    );
    assert.match(
      source,
      DYNAMIC_IMPORT_RE,
      `${routePath} must still load chatgptWebCodexAdmin.ts lazily where it's actually needed`
    );
  });
}

test("the chatgpt-web-codex-doctor route is intentionally exempt (every request there already is that provider)", () => {
  const source = readSource(
    "src/app/api/providers/[id]/chatgpt-web-codex-doctor/route.ts"
  );
  assert.match(
    source,
    STATIC_IMPORT_RE,
    "this route only ever serves chatgpt-web-codex connections -- a static import here is correct, " +
      "not the #12355 bug; if this assertion starts failing because the import was lazily moved, that's " +
      "fine too, just update this test to match"
  );
});
