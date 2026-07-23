/**
 * Regression for #7096 — the RTK code stripper imported the `typescript`
 * package eagerly at module top level (`import ts from "typescript"`), but
 * `typescript` lives in devDependencies. After a production-lean deploy
 * (`npm run build && npm prune --omit=dev`, recommended in Discussion #6956)
 * the package is gone, so merely importing `codeStripper.ts` — which every
 * Compression Context page (Lite/Aggressive/Ultra/CCR) pulls in — threw a
 * module-not-found error and broke the whole feature.
 *
 * The fix resolves `typescript` lazily and only when AST-based comment
 * stripping is actually requested (opt-in, default off), degrading to a no-op
 * when the package is unavailable instead of crashing at import time.
 *
 * Run: node --import tsx/esm --test tests/unit/compression/codestripper-lazy-ts-7096.test.ts
 */
import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Namespace import so a missing named export does not crash the whole test
// module at load — it simply shows up as `undefined` (clean granular red).
import * as codeStripper from "../../../open-sse/services/compression/engines/rtk/codeStripper.ts";

const CODE_STRIPPER_SOURCE = fileURLToPath(
  new URL("../../../open-sse/services/compression/engines/rtk/codeStripper.ts", import.meta.url)
);

describe("RTK codeStripper — lazy TypeScript loading (#7096)", () => {
  afterEach(() => {
    // Always restore the default loader if the seam exists.
    codeStripper.__setTypeScriptModuleLoaderForTests?.(null);
  });

  it("does not import the `typescript` package eagerly at module top level", () => {
    const source = fs.readFileSync(CODE_STRIPPER_SOURCE, "utf8");
    // A top-level *value* import of typescript (`import ts from "typescript"`)
    // is what broke every compression page after `npm prune --omit=dev`.
    // Type-only imports (`import type ... from "typescript"`) are erased at
    // build time and are fine.
    const eagerValueImport =
      /^\s*import\s+(?!type\b)[^;\n]*\bfrom\s+["']typescript["']/m.test(source);
    assert.equal(
      eagerValueImport,
      false,
      "codeStripper.ts must not import `typescript` eagerly at module top level (use a lazy require instead)"
    );
  });

  it("still strips comments when `typescript` is available (opt-in)", () => {
    const code = [
      "const x = 1; // inline note",
      "// full line comment",
      "const y = 2;",
    ].join("\n");
    const out = codeStripper.stripCode(code, "typescript", { removeComments: true });
    assert.ok(!out.text.includes("inline note"), "line comment should be removed");
    assert.ok(!out.text.includes("full line comment"), "full-line comment should be removed");
    assert.ok(out.text.includes("const x = 1"), "code should survive");
    assert.ok(out.text.includes("const y = 2"), "code should survive");
  });

  it("degrades to a no-op (no throw) when `typescript` cannot be resolved", () => {
    assert.equal(
      typeof codeStripper.__setTypeScriptModuleLoaderForTests,
      "function",
      "codeStripper must expose a lazy TypeScript loader seam so it can degrade gracefully"
    );
    // Simulate `npm prune --omit=dev`: typescript is not resolvable.
    codeStripper.__setTypeScriptModuleLoaderForTests(() => null);

    const code = ["const x = 1; // keep me", "const y = 2;"].join("\n");
    let out: ReturnType<typeof codeStripper.stripCode>;
    assert.doesNotThrow(() => {
      out = codeStripper.stripCode(code, "typescript", { removeComments: true });
    }, "stripCode must not throw when typescript is unavailable");
    // Comment stripping is skipped, but the code passes through intact.
    assert.ok(out!.text.includes("const x = 1"), "code passes through");
    assert.ok(out!.text.includes("keep me"), "comment left intact under graceful degradation");
  });
});
