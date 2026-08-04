/**
 * TDD regression for #5312 (fix A — module-graph fix): the Thinking-Budget config
 * singleton MUST be backed by globalThis, not a module-local `let _config`.
 *
 * Next.js compiles `instrumentation.ts` as a SEPARATE webpack module graph from the
 * app-route / open-sse executors. A module-local singleton hydrated at boot (in the
 * instrumentation graph, by hydrateThinkingBudgetConfig) is a DIFFERENT object than
 * the one `base.ts` reads per-request — so the operator's dashboard Thinking-Budget
 * mode silently never took effect in production (proven live on the VPS: register()
 * + registerNodejs() ran and hydrate returned true, yet base.ts still read the
 * default). Backing the config with globalThis (mirroring systemPrompt.ts #2470)
 * shares the one instance across graphs.
 *
 * These tests assert the storage is globalThis-backed. A module-local `let` fails
 * both: (1) setThinkingBudgetConfig would not populate the shared slot, and (2)
 * getThinkingBudgetConfig would not observe a value written to the shared slot by
 * "another module graph".
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  setThinkingBudgetConfig,
  getThinkingBudgetConfig,
  DEFAULT_THINKING_CONFIG,
} from "../../open-sse/services/thinkingBudget.ts";

const GLOBAL_KEY = "__omniroute_thinkingBudget_config__";
const store = globalThis as unknown as Record<string, { mode?: string; customBudget?: number }>;

test.afterEach(() => {
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("#5312: setThinkingBudgetConfig writes to the globalThis-shared slot", () => {
  setThinkingBudgetConfig({ mode: "auto" });
  assert.equal(
    store[GLOBAL_KEY]?.mode,
    "auto",
    "config must live on globalThis so it is shared across Next's separate module graphs (instrumentation vs routes)"
  );
});

test("#5312: getThinkingBudgetConfig reads the globalThis-shared slot (a cross-graph hydrate reaches readers)", () => {
  // Simulate a hydrate that happened in a DIFFERENT webpack module graph (the
  // instrumentation graph) by writing the shared globalThis slot directly.
  store[GLOBAL_KEY] = { mode: "custom", customBudget: 8192 };
  assert.equal(
    getThinkingBudgetConfig().mode,
    "custom",
    "getter must read globalThis; a module-local `let _config` would not see the cross-graph hydration (the #5312 fix-A break)"
  );
  assert.equal(getThinkingBudgetConfig().customBudget, 8192);
});
