/**
 * TDD regression for #5312 (FIX A / RC-A wiring): hydrateThinkingBudgetConfig was
 * only called from `src/server-init.ts`, which is an UNUSED module that never runs
 * in production (the live boot path is the Next.js instrumentation hook →
 * `src/instrumentation-node.ts`). As a result the operator's dashboard
 * Thinking-Budget mode silently reverted to the passthrough default on every
 * restart, even though the unit test `thinking-budget-hydration-5312` (which calls
 * the function directly) passed. Surfaced by live VPS validation of #5312.
 *
 * This guard asserts the LIVE boot module actually calls the hydration, so the fix
 * can never again be wired into dead code without a failing test.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const BOOT_PATH = join(here, "../../src/instrumentation-node.ts");

function stripComments(src: string): string {
  // Drop block comments and line comments so a commented-out call cannot satisfy
  // the guard (the original bug shipped with the real call living in dead code).
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

test("#5312 RC-A: the production boot path (instrumentation-node) hydrates Thinking-Budget", () => {
  const code = stripComments(readFileSync(BOOT_PATH, "utf8"));
  assert.match(
    code,
    /hydrateThinkingBudgetConfig\s*\(\s*settings\s*\)/,
    "instrumentation-node.ts must call hydrateThinkingBudgetConfig(settings) at startup; " +
      "wiring it only into the unused server-init.ts reverts the operator's Thinking-Budget " +
      "mode to passthrough on every restart (#5312 fix A was non-functional in production)."
  );
});
