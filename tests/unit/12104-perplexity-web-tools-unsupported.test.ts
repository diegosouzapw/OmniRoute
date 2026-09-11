import { test } from "node:test";
import assert from "node:assert/strict";
import { perplexity_webProvider } from "../../open-sse/config/providers/registry/perplexity/web/index.ts";
import { checkToolCallingRequiredButUnsupported } from "../../open-sse/handlers/chatCore/toolCallingRequiredCheck.ts";
import { filterTargetsByRequestCompatibility } from "../../open-sse/services/combo/comboStructure.ts";
import { getUnsupportedParams } from "../../open-sse/config/providerRegistry.ts";

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

test("PR #2: combo/auto routing excludes perplexity-web when tools are present", () => {
  // Mock combo targets
  const candidateTargets: any[] = [
    { provider: "openai", model: "gpt-4" },
    { provider: "perplexity-web", model: "pplx-sonar" }
  ];

  // Request WITH tools
  const bodyWithTools = {
    model: "auto",
    messages: [{ role: "user", content: "hello" }],
    tools: [{ type: "function", function: { name: "test" } }]
  };

  const filteredWithTools = filterTargetsByRequestCompatibility(
    candidateTargets,
    bodyWithTools,
    console, // Mock logger
    undefined,
    { bypassChecks: false }
  );

  // OpenAI should remain, Perplexity should be dropped because tools are unsupported
  assert.equal(filteredWithTools.length, 1);
  assert.equal(filteredWithTools[0].provider, "openai");

  // Request WITHOUT tools
  const bodyNoTools = {
    model: "auto",
    messages: [{ role: "user", content: "hello" }]
  };

  const filteredNoTools = filterTargetsByRequestCompatibility(
    candidateTargets,
    bodyNoTools,
    console, // Mock logger
    undefined,
    { bypassChecks: false }
  );

  // Both should remain
  assert.equal(filteredNoTools.length, 2);
  assert.equal(filteredNoTools[1].provider, "perplexity-web");
});
