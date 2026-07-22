import test from "node:test";
import assert from "node:assert/strict";

import {
  M365_MODEL_TONE_MAP,
  resolveToneForModel,
  resolveChatInvocationOverrides,
} from "../../open-sse/executors/copilot-m365-frames.ts";
import { copilot_m365_webProvider } from "../../open-sse/config/providers/registry/copilot-m365-web/index.ts";

// #7872 — tone-selected model variants for copilot-m365-web.
// The wiring (model id → tone → invocation payload) is unit-tested here; whether a tone
// actually selects that model upstream is a live enterprise-tenant check (release-drain).

test("resolveToneForModel maps each variant id to its confirmed tone", () => {
  assert.equal(resolveToneForModel("copilot-m365-claude-opus"), "Claude_Opus");
  assert.equal(resolveToneForModel("copilot-m365-gpt-5-6-reasoning"), "Gpt_5_6_Reasoning");
  assert.equal(resolveToneForModel("copilot-m365-gpt-5-5-chat"), "Gpt_5_5_Chat");
});

test("resolveToneForModel returns undefined for the bare id and unknown ids", () => {
  // bare id must fall back to the tier default, not a hard-coded tone
  assert.equal(resolveToneForModel("copilot-m365"), undefined);
  assert.equal(resolveToneForModel("totally-unknown"), undefined);
  assert.equal(resolveToneForModel(undefined), undefined);
  assert.equal(resolveToneForModel(""), undefined);
});

test("model-driven tone overrides the tier default; bare id keeps the tier tone", () => {
  const enterprise = resolveChatInvocationOverrides("enterprise");
  const individual = resolveChatInvocationOverrides(undefined);

  // enterprise tier default tone is Magic
  assert.equal(enterprise.tone, "Magic");
  assert.equal(individual.tone, "");

  // precedence: resolveToneForModel(model) ?? overrides.tone  (mirrors the executor wiring)
  const toneFor = (model: string | undefined, tierTone: string) =>
    resolveToneForModel(model) ?? tierTone;

  // a variant id wins over BOTH tier defaults
  assert.equal(toneFor("copilot-m365-claude-opus", enterprise.tone), "Claude_Opus");
  assert.equal(toneFor("copilot-m365-claude-opus", individual.tone), "Claude_Opus");

  // the bare id keeps whatever the tier resolved
  assert.equal(toneFor("copilot-m365", enterprise.tone), "Magic");
  assert.equal(toneFor("copilot-m365", individual.tone), "");
});

test("registry exposes the bare id (first) plus every tone variant", () => {
  const ids = copilot_m365_webProvider.models.map((m) => m.id);
  assert.equal(ids[0], "copilot-m365", "bare Auto/default id must be first");
  for (const variantId of Object.keys(M365_MODEL_TONE_MAP)) {
    assert.ok(ids.includes(variantId), `registry missing variant ${variantId}`);
  }
  // no duplicate ids
  assert.equal(ids.length, new Set(ids).size);
});
