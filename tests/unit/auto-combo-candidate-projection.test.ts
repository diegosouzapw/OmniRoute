import assert from "node:assert/strict";
import test from "node:test";

import {
  createVirtualAutoComboFromPrepared,
  type AutoComboSpec,
  type PreparedVirtualAutoComboInputs,
  type VirtualAutoComboCandidate,
} from "../../open-sse/services/autoCombo/virtualFactory.ts";
import { projectVirtualAutoCandidatesFromPrepared } from "../../open-sse/services/autoCombo/candidateProjection.ts";
import type { AutoVariant } from "../../open-sse/services/autoCombo/autoPrefix.ts";

function candidate(
  provider: string,
  model: string,
  connections: string[],
  capabilities: Partial<VirtualAutoComboCandidate> = {}
): VirtualAutoComboCandidate {
  return {
    provider,
    model,
    modelStr: `${provider}/${model}`,
    connectionId: null,
    allowedConnectionIds: connections,
    costPer1MTokens: 0,
    ...capabilities,
  };
}

const regularCandidates: VirtualAutoComboCandidate[] = [
  candidate("openai", "gpt-4o", ["openai-key"], {
    resolvedSupportsVision: true,
    resolvedReasoning: false,
    resolvedSupportsThinking: false,
    resolvedContextLength: 128_000,
    resolvedMaxOutputTokens: 16_384,
    quality: 0.8,
  }),
  candidate("codex", "gpt-5.6-codex", ["codex-plan"], {
    resolvedSupportsVision: false,
    resolvedReasoning: true,
    resolvedSupportsThinking: true,
    resolvedContextLength: 200_000,
    resolvedMaxOutputTokens: 64_000,
    quality: 0.9,
    freeAccessExclusion: "state-unknown",
  }),
  candidate("openrouter", "qwen3-coder", ["openrouter-key"], {
    resolvedSupportsVision: false,
    resolvedReasoning: true,
    resolvedSupportsThinking: false,
    resolvedContextLength: 64_000,
    resolvedMaxOutputTokens: 8_192,
    quality: 0.7,
  }),
  candidate("gemini", "gemini-2.5-pro", ["gemini-key"], {
    resolvedSupportsVision: true,
    resolvedReasoning: true,
    resolvedSupportsThinking: true,
    resolvedContextLength: 1_000_000,
    resolvedMaxOutputTokens: 64_000,
    quality: 0.85,
  }),
];

const prepared: PreparedVirtualAutoComboInputs = {
  regularCandidates,
  familyCandidates: regularCandidates,
  authTypeByConnectionId: new Map([
    ["openai-key", "apikey"],
    ["codex-plan", "oauth"],
    ["openrouter-key", "apikey"],
    ["gemini-key", "apikey"],
  ]),
  subscriptionLadder: { maxStateAgeMs: 180_000 },
};

function comboIdentity(models: Array<Record<string, unknown>>) {
  return models.map((model) => ({
    providerId: model.providerId,
    connectionId: model.connectionId,
    allowedConnectionIds: model.allowedConnectionIds,
    model: model.model,
    ...(model.freeAccessExclusion === undefined
      ? {}
      : { freeAccessExclusion: model.freeAccessExclusion }),
  }));
}

async function assertProjectionParity(variant: AutoVariant | undefined, spec?: AutoComboSpec) {
  const combo = await createVirtualAutoComboFromPrepared(prepared, variant, spec);
  const projection = await projectVirtualAutoCandidatesFromPrepared(prepared, variant, spec);
  assert.deepEqual(projection, comboIdentity(combo.models as Array<Record<string, unknown>>));
}

test("candidate-only projection preserves base/category/family/subscription identity and order", async () => {
  await assertProjectionParity(undefined);
  await assertProjectionParity(undefined, { category: "vision" });
  await assertProjectionParity(undefined, { category: "reasoning" });
  await assertProjectionParity(undefined, { family: "qwen" });
  await assertProjectionParity(undefined, { tier: "subscription" });
  await assertProjectionParity("cheap", { tier: "thrifty" });
});

test("candidate-only projection preserves the exact chaos visible set and order", async () => {
  const before = process.env.OMNIROUTE_CHAOS_MAX_PANEL;
  process.env.OMNIROUTE_CHAOS_MAX_PANEL = "3";
  try {
    await assertProjectionParity("chaos");
    const projection = await projectVirtualAutoCandidatesFromPrepared(prepared, "chaos");
    assert.equal(projection.length, 3);
    assert.equal(new Set(projection.map((model) => model.providerId)).size, 3);
  } finally {
    if (before === undefined) delete process.env.OMNIROUTE_CHAOS_MAX_PANEL;
    else process.env.OMNIROUTE_CHAOS_MAX_PANEL = before;
  }
});

test("candidate-only projection omits score and advertised-capability work products", async () => {
  const projection = await projectVirtualAutoCandidatesFromPrepared(prepared, undefined);
  const serialized = JSON.stringify(projection);
  for (const unused of [
    '"weight"',
    '"quality"',
    '"advertisedContextLength"',
    '"advertisedMaxOutputTokens"',
    '"resolvedContextLength"',
    '"resolvedMaxOutputTokens"',
  ]) {
    assert.equal(serialized.includes(unused), false, `${unused} must not be projected`);
  }
});
