/**
 * TDD regression for #8601: the Task-Aware Smart Routing (T05) config is persisted
 * to `settings.taskRouting` by PUT /api/settings/task-routing but never read back,
 * so it silently reverts to `enabled: false` + the hardcoded default model map on
 * every restart.
 *
 * Two independent root causes, one test each:
 *
 *  A. No hydration entry point existed at all. `hydrateTaskRoutingConfig(settings)`
 *     must parse the persisted value (a JSON *string*, as the route writes it) and
 *     apply it, mirroring `hydrateThinkingBudgetConfig` (#5312) and
 *     `setSystemPromptConfig` (#2470).
 *
 *  B. The config lived in a plain module-level `let`, which is DUPLICATED per module
 *     graph — so a boot hydration on the instrumentation graph would never reach the
 *     copy that `src/sse/handlers/chat.ts` reads. This is the exact break #5312 fix-A
 *     hit on the VPS. The store must live on `globalThis`, like `thinkingBudget.ts`
 *     and `systemPrompt.ts`. Importing the module under two distinct specifiers gives
 *     two real module instances, which reproduces the duplication directly.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  hydrateTaskRoutingConfig,
  setTaskRoutingConfig,
  getTaskRoutingConfig,
  getDefaultTaskModelMap,
} from "../../open-sse/services/taskAwareRouter.ts";

const MODULE_PATH = "../../open-sse/services/taskAwareRouter.ts";

function resetConfig(): void {
  setTaskRoutingConfig({
    enabled: false,
    taskModelMap: getDefaultTaskModelMap(),
    detectionEnabled: true,
  });
}

// ── A. hydration from persisted settings ─────────────────────────────────────

test("#8601 hydrateTaskRoutingConfig restores a JSON-string persisted config", () => {
  resetConfig();

  // Shape written by src/app/api/settings/task-routing/route.ts:66
  const persisted = JSON.stringify({
    enabled: true,
    detectionEnabled: true,
    taskModelMap: { ...getDefaultTaskModelMap(), coding: "auto/coding" },
  });

  assert.equal(hydrateTaskRoutingConfig({ taskRouting: persisted }), true);

  const config = getTaskRoutingConfig();
  assert.equal(config.enabled, true);
  assert.equal(config.taskModelMap.coding, "auto/coding");

  resetConfig();
});

test("#8601 hydrateTaskRoutingConfig accepts an already-parsed object", () => {
  resetConfig();

  assert.equal(
    hydrateTaskRoutingConfig({ taskRouting: { enabled: true, detectionEnabled: false } }),
    true
  );
  assert.equal(getTaskRoutingConfig().enabled, true);
  assert.equal(getTaskRoutingConfig().detectionEnabled, false);

  resetConfig();
});

test("#8601 hydrateTaskRoutingConfig is a no-op for missing/invalid settings", () => {
  resetConfig();

  for (const settings of [
    undefined,
    null,
    {},
    { taskRouting: "" },
    { taskRouting: "not json" },
    { taskRouting: "[]" },
    { taskRouting: 42 },
  ]) {
    assert.equal(
      hydrateTaskRoutingConfig(settings),
      false,
      `should ignore ${JSON.stringify(settings)}`
    );
    assert.equal(getTaskRoutingConfig().enabled, false);
  }

  resetConfig();
});

test("#8601 hydration never resurrects stats from the persisted blob", () => {
  resetConfig();

  hydrateTaskRoutingConfig({
    taskRouting: JSON.stringify({ enabled: true, stats: { detected: 999, routed: 999 } }),
  });

  const { stats } = getTaskRoutingConfig();
  assert.equal(stats.detected, 0);
  assert.equal(stats.routed, 0);

  resetConfig();
});

// ── B. cross-module-graph sharing (the #5312 fix-A trap) ─────────────────────

test("#8601 config store is shared across duplicated module instances", async () => {
  resetConfig();

  // Distinct specifiers → two genuinely separate module records, the same way the
  // Next.js instrumentation graph and the app-route/open-sse graph each get their own.
  const graphA = await import(`${MODULE_PATH}?graph=a`);
  const graphB = await import(`${MODULE_PATH}?graph=b`);

  graphA.setTaskRoutingConfig({ enabled: true, detectionEnabled: true });

  assert.equal(
    graphB.getTaskRoutingConfig().enabled,
    true,
    "a config set on one module instance must be visible from another — otherwise boot " +
      "hydration lands on the instrumentation copy and the chat handler never sees it"
  );

  graphA.setTaskRoutingConfig({ enabled: false });
  resetConfig();
});
