import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveRequestedModel,
  encodeAgentRunRequest,
} from "../../../open-sse/utils/cursorAgentProtobuf";
import { CURSOR_REWRITE_FAILURE_IDS } from "../fixtures/cursor-rewrite-failure-ids";

test("resolveRequestedModel passes live-catalog Claude effort ids through verbatim", () => {
  const live = new Set(["claude-opus-5-low"]);
  assert.deepEqual(resolveRequestedModel("claude-opus-5-low", { liveCatalogIds: live }), {
    modelId: "claude-opus-5-low",
    parameters: [],
  });
});

test("resolveRequestedModel passes live-catalog GPT reasoning ids through verbatim", () => {
  const live = new Set(["gpt-5.6-sol-medium"]);
  assert.deepEqual(resolveRequestedModel("gpt-5.6-sol-medium", { liveCatalogIds: live }), {
    modelId: "gpt-5.6-sol-medium",
    parameters: [],
  });
});

test("resolveRequestedModel still strips effort when id is absent from live catalog", () => {
  const live = new Set(["composer-2"]);
  assert.deepEqual(resolveRequestedModel("claude-opus-5-low", { liveCatalogIds: live }), {
    modelId: "claude-opus-5",
    parameters: [{ id: "effort", value: "low" }],
  });
  assert.deepEqual(resolveRequestedModel("gpt-5.5-high", { liveCatalogIds: live }), {
    modelId: "gpt-5.5",
    parameters: [{ id: "reasoning", value: "high" }],
  });
});

test("resolveRequestedModel still strips effort when liveCatalogIds is omitted", () => {
  assert.deepEqual(resolveRequestedModel("claude-opus-4-8-high"), {
    modelId: "claude-opus-4-8",
    parameters: [{ id: "effort", value: "high" }],
  });
});

test("resolveRequestedModel maps auto to default even when auto is in the live catalog", () => {
  const live = new Set(["auto", "auto-cost", "claude-opus-5-low"]);
  assert.deepEqual(resolveRequestedModel("auto", { liveCatalogIds: live }), {
    modelId: "default",
    parameters: [],
  });
  assert.deepEqual(resolveRequestedModel("auto-cost", { liveCatalogIds: live }), {
    modelId: "default",
    parameters: [{ id: "optimization", value: "cost" }],
  });
});

test("resolveRequestedModel passes composer-*-fast through when present in live catalog", () => {
  const live = new Set(["composer-2.5-fast", "composer-2-fast"]);
  assert.deepEqual(resolveRequestedModel("composer-2.5-fast", { liveCatalogIds: live }), {
    modelId: "composer-2.5-fast",
    parameters: [],
  });
  assert.deepEqual(resolveRequestedModel("composer-2-fast", { liveCatalogIds: live }), {
    modelId: "composer-2-fast",
    parameters: [],
  });
});

test("resolveRequestedModel passes every rewrite-failure id through when all are live", () => {
  const live = new Set<string>(CURSOR_REWRITE_FAILURE_IDS);
  for (const id of CURSOR_REWRITE_FAILURE_IDS) {
    assert.deepEqual(
      resolveRequestedModel(id, { liveCatalogIds: live }),
      { modelId: id, parameters: [] },
      id
    );
  }
});

test("encodeAgentRunRequest embeds verbatim live catalog model id", () => {
  const live = new Set(["claude-opus-5-low"]);
  const buf = encodeAgentRunRequest({
    modelId: "claude-opus-5-low",
    userText: "hi",
    liveCatalogIds: live,
  });
  const text = buf.toString("latin1");
  const full = text.split("claude-opus-5-low").length - 1;
  assert.ok(full >= 4, `verbatim id must appear in RequestedModel + ModelDetails (got ${full})`);
  assert.ok(!text.includes("effort"), "must not emit effort parameter for live verbatim id");
});
