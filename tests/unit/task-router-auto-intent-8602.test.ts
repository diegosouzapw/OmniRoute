/**
 * TDD regression for #8602: DEFAULT_TASK_MODEL_MAP hardcoded literal provider/model
 * ids (`openai/gpt-4o`, `gemini/gemini-2.5-flash-lite`, …) as routing destinations.
 *
 * Two problems, both guarded here:
 *
 *  1. The ids rot. They pointed at models one to two generations old, and refreshing
 *     the strings would only reset the rot clock — so the guard is structural: no
 *     concrete provider/model literal may appear in the default map at all.
 *
 *  2. The shape bypasses the router. `src/sse/handlers/chat.ts` applies the override by
 *     overwriting `body.model`, so a hardcoded target skips the 13-factor auto-combo
 *     scoring (quota / circuit-breaker health / cost / latency / stability), connection
 *     cooldown and model lockout. An operator with no OpenAI connection got a request
 *     rewritten to `openai/gpt-4o` and a failure, where pass-through would have worked.
 *
 * The defaults must therefore be `auto/*` INTENT ids, which resolve against whatever
 * backends the operator actually has connected.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getDefaultTaskModelMap,
  setTaskRoutingConfig,
  applyTaskAwareRouting,
  type TaskType,
} from "../../open-sse/services/taskAwareRouter.ts";
import { isRecognizedBuiltinAuto } from "../../open-sse/services/autoCombo/builtinCatalog.ts";

/** Task types that intentionally carry no override (pass the requested model through). */
const NO_OVERRIDE: TaskType[] = ["creative", "chat"];

test("#8602 default task→model map contains no concrete provider/model literals", () => {
  const map = getDefaultTaskModelMap();

  for (const [taskType, target] of Object.entries(map)) {
    if (NO_OVERRIDE.includes(taskType as TaskType)) {
      assert.equal(target, "", `${taskType} must stay pass-through`);
      continue;
    }
    assert.notEqual(target, "", `${taskType} should route somewhere`);
    assert.ok(
      target.startsWith("auto/"),
      `${taskType} must route by intent, not to a hardcoded model — got "${target}"`
    );
  }
});

test("#8602 every default target is a resolvable built-in auto id", () => {
  const map = getDefaultTaskModelMap();

  for (const [taskType, target] of Object.entries(map)) {
    if (target === "") continue;
    const suffix = target.slice("auto/".length);
    assert.ok(
      isRecognizedBuiltinAuto(target, suffix),
      `${taskType} → "${target}" is not a recognized auto id, so it would fail to resolve`
    );
  }
});

test("#8602 no default target names a known provider prefix", () => {
  // Belt-and-braces: catches a regression that reintroduces a literal while still
  // (incorrectly) prefixing it, e.g. "auto/openai/gpt-4o".
  const PROVIDER_LITERALS = ["openai/", "gemini/", "deepseek/", "anthropic/", "claude/", "glm/"];
  for (const [taskType, target] of Object.entries(getDefaultTaskModelMap())) {
    for (const literal of PROVIDER_LITERALS) {
      assert.ok(
        !target.includes(literal),
        `${taskType} → "${target}" still embeds the provider literal "${literal}"`
      );
    }
  }
});

test("#8602 routing a detected task yields the auto intent id", () => {
  setTaskRoutingConfig({
    enabled: true,
    detectionEnabled: true,
    taskModelMap: getDefaultTaskModelMap(),
  });

  try {
    const result = applyTaskAwareRouting("some-provider/some-model", {
      messages: [{ role: "user", content: "please implement a binary search function" }],
    });

    assert.equal(result.taskType, "coding");
    assert.equal(result.wasRouted, true);
    assert.ok(
      result.model.startsWith("auto/"),
      `expected an auto intent id, got "${result.model}"`
    );
  } finally {
    setTaskRoutingConfig({ enabled: false, taskModelMap: getDefaultTaskModelMap() });
  }
});
