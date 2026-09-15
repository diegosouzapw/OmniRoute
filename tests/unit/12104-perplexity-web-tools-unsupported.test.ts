import { test } from "node:test";
import assert from "node:assert/strict";
import { perplexity_webProvider } from "../../open-sse/config/providers/registry/perplexity/web/index.ts";
import { checkToolCallingRequiredButUnsupported } from "../../open-sse/handlers/chatCore/toolCallingRequiredCheck.ts";
import { filterTargetsByRequestCompatibility } from "../../open-sse/services/combo/comboStructure.ts";
import { stripUnsupportedParams } from "../../open-sse/handlers/chatCore/unsupportedParamsStrip.ts";
import { getUnsupportedParams } from "../../open-sse/config/providerRegistry.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

function buildResolvedTarget(provider: string, model: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: `${provider}-step`,
    executionKey: `${provider}-step:0`,
    modelStr: `${provider}/${model}`,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

test("PR #2: perplexity-web provider metadata declares tool-calling unsupported", () => {
  assert.ok(
    perplexity_webProvider.unsupportedParams?.includes("tools"),
    "Expected 'tools' to be unsupported"
  );
  assert.ok(
    perplexity_webProvider.unsupportedParams?.includes("tool_choice"),
    "Expected 'tool_choice' to be unsupported"
  );
  assert.ok(
    perplexity_webProvider.unsupportedParams?.includes("parallel_tool_calls"),
    "Expected 'parallel_tool_calls' to be unsupported"
  );
});

test("PR #2: direct chatCore request with tools returns 400 error guard", () => {
  const model = "pplx-sonar";
  const provider = "perplexity-web";
  const unsupported = getUnsupportedParams(provider, model);

  // 1. tools array
  const checkTools = checkToolCallingRequiredButUnsupported(
    { model, tools: [{ type: "function", function: { name: "test" } }] },
    unsupported,
    false,
    model
  );
  assert.equal(checkTools.blocked, true);
  assert.ok(checkTools.message?.includes("does not support tool calling"));
});

test("PR #2: combo/auto keeps perplexity-web eligible (emulated tool-calling), so unsupportedParams stripping is what protects the request", () => {
  // Real ResolvedComboTarget shape, as produced by the routing layer.
  const candidateTargets: ResolvedComboTarget[] = [
    buildResolvedTarget("openai", "gpt-4"),
    buildResolvedTarget("perplexity-web", "pplx-sonar"),
  ];

  const bodyWithTools = {
    model: "auto",
    messages: [{ role: "user", content: "hello" }],
    tools: [{ type: "function", function: { name: "test" } }],
  };

  // filterTargetsByRequestCompatibility deliberately keeps `toolCalling: "emulated"`
  // providers (web-cookie.ts, #5240) eligible even when the request carries `tools`,
  // so this pre-filter alone does NOT drop perplexity-web from the candidate list —
  // both targets stay.
  const filteredWithTools = filterTargetsByRequestCompatibility(
    candidateTargets,
    bodyWithTools,
    console
  );
  assert.equal(filteredWithTools.length, 2);
  assert.ok(filteredWithTools.some((target) => target.provider === "perplexity-web"));

  const bodyNoTools = {
    model: "auto",
    messages: [{ role: "user", content: "hello" }],
  };
  const filteredNoTools = filterTargetsByRequestCompatibility(
    candidateTargets,
    bodyNoTools,
    console
  );
  assert.equal(filteredNoTools.length, 2);

  // What actually protects a combo/auto request routed to perplexity-web is the
  // registry's `unsupportedParams` this PR adds: checkToolCallingRequiredButUnsupported
  // never blocks combo requests (isCombo: true always returns blocked: false — see
  // toolCallingRequiredCheck.ts), so chatCore relies on stripUnsupportedParams to
  // drop the live `tools` param before the translated body reaches the executor.
  const unsupported = getUnsupportedParams("perplexity-web", "pplx-sonar");
  const translatedBody: Record<string, unknown> = { ...bodyWithTools };
  const { strippedParams } = stripUnsupportedParams(translatedBody, unsupported);
  assert.ok(strippedParams.includes("tools"));
  assert.equal(translatedBody.tools, undefined);
});
