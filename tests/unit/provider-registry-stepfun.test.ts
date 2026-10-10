/**
 * StepFun registry refresh — adds step-5-preview (live-verified 2026-10-08
 * against the api.stepfun.ai catalog: 1,024,000 max input tokens, vision +
 * reasoning, efforts low/medium/high, chat/messages/responses) and a
 * `modelsUrl` so the dashboard's models discovery can project the live
 * catalog instead of only the static list.
 *
 * Verifies:
 *   - the stepfun entry keeps its OpenAI-compatible executor shape
 *   - step-5-preview is present with the live-verified capability flags
 *   - the entry resolves through getExecutor() as a DefaultExecutor
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getExecutor, DefaultExecutor } = await import("../../open-sse/executors/index.ts");

test("stepfun is registered in the executor registry with an OpenAI-compatible shape", () => {
  const entry = (REGISTRY as Record<string, Record<string, unknown>>).stepfun;
  assert.ok(entry, "stepfun should be present in the executor registry");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.baseUrl, "https://api.stepfun.com/v1/chat/completions");
  assert.equal(entry.modelsUrl, "https://api.stepfun.com/v1/models");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
});

test("step-5-preview is listed with live-verified metadata", () => {
  const entry = (REGISTRY as Record<string, Record<string, unknown>>).stepfun;
  const models = (entry?.models ?? []) as Array<Record<string, unknown>>;
  const step5 = models.find((m) => m.id === "step-5-preview");
  assert.ok(step5, "step-5-preview must be in the static model list");
  assert.equal(step5.contextLength, 1_024_000);
  assert.equal(step5.supportsVision, true);
  assert.equal(step5.supportsReasoning, true);
  assert.deepEqual(step5.supportedThinkingEfforts, ["low", "medium", "high"]);
  assert.equal(step5.toolCalling, true);
});

test("stepfun resolves through getExecutor() as a DefaultExecutor instance", async () => {
  const executor = await getExecutor("stepfun");
  assert.ok(
    executor instanceof DefaultExecutor,
    "stepfun has no custom executor — must fall through to DefaultExecutor"
  );
});
