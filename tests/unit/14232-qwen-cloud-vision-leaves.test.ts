/**
 * Regression test for #14232 — `qwen-cloud-token-plan/qwen3.8-flash` and
 * `deepseek-v4.1-flash` accept images but had no registry entry, so every tier
 * of the vision cascade came up empty and the fail-closed combo compatibility
 * filter (#8332) dropped them from image requests, leaving only a dead
 * vision-flagged leaf and no fallback. Both are vision-capable per Alibaba's
 * model pages.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");

test("#14232 qwen-cloud-token-plan image-accepting leaves resolve as vision-capable", () => {
  for (const id of [
    "qwen-cloud-token-plan/qwen3.8-flash",
    "qwen-cloud-token-plan/deepseek-v4.1-flash",
  ]) {
    const resolved = getResolvedModelCapabilities(id);
    assert.equal(resolved.supportsVision, true, `${id} should be vision-capable`);
    assert.equal(resolved.reasoning, true, `${id} should be a reasoning model`);
  }
});

const target = (modelStr: string) => ({
  kind: "model" as const,
  stepId: modelStr,
  executionKey: modelStr,
  modelStr,
  provider: modelStr.split("/")[0],
  providerId: null,
  connectionId: null,
  weight: 1,
  label: null,
});
const noopLog = { info() {}, warn() {}, error() {}, debug() {} };
const imageBody = {
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "ok" },
        { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgo=" } },
      ],
    },
  ],
};

test("#14232 an image request keeps the qwen-cloud-token-plan leaf in the combo pool", () => {
  const kept = filterTargetsByRequestCompatibility(
    [target("qwen-cloud-token-plan/qwen3.8-flash"), target("groq/llama-3.1-8b-instant")],
    imageBody,
    noopLog
  ).map((t) => t.modelStr);
  assert.deepEqual(kept, ["qwen-cloud-token-plan/qwen3.8-flash"]);
});
