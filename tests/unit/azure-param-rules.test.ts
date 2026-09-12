import { test } from "node:test";
import assert from "node:assert/strict";

import {
  applyAzureParamRules,
  AZURE_COMPLETION_TOKEN_DEPLOYMENT,
} from "../../open-sse/executors/azureParamRules.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { AzureAiExecutor } from "../../open-sse/executors/azure-ai.ts";

/**
 * Regression guards for two Azure 400s observed against a live Azure AI Foundry
 * resource:
 *
 *   azure-ai/gpt-chat-latest
 *     -> 400 "Unsupported parameter: 'max_tokens' is not supported with this
 *            model. Use 'max_completion_tokens' instead."
 *   azure-ai/<any gpt-5 deployment> with tools
 *     -> 400 "Function tools with reasoning_effort are not supported ...
 *            Please use /v1/responses instead."
 *
 * Both rules already existed inline in AzureOpenAIExecutor, so the identical
 * deployment succeeded on the `azure-openai` connection and failed on
 * `azure-ai`, which routed through the bare DefaultExecutor.
 */

test("gpt-chat-latest converts max_tokens to max_completion_tokens", () => {
  const out = applyAzureParamRules(
    "gpt-chat-latest",
    { max_tokens: 4096 },
    { max_tokens: 4096, messages: [] }
  ) as Record<string, unknown>;

  assert.equal(out.max_tokens, undefined);
  assert.equal(out.max_completion_tokens, 4096);
});

test("gpt-5 family converts max_tokens too", () => {
  for (const model of ["gpt-5.1", "gpt-5.4-nano", "my-gpt-5-prod", "o3", "o4-mini"]) {
    const out = applyAzureParamRules(model, { max_tokens: 100 }, { max_tokens: 100 }) as Record<
      string,
      unknown
    >;
    assert.equal(out.max_tokens, undefined, `${model} should drop max_tokens`);
    assert.equal(out.max_completion_tokens, 100, `${model} should set max_completion_tokens`);
  }
});

test("generations after GPT-5 convert max_tokens too (#12981)", () => {
  // The rule belongs to the generation, not to one release. gpt-6-astra is the
  // deployment from the report; the rest are the next names Azure will use.
  for (const model of ["gpt-6-astra", "gpt-6", "azure/gpt-7-mini", "gpt-9.1", "gpt-10-turbo"]) {
    const out = applyAzureParamRules(model, { max_tokens: 100 }, { max_tokens: 100 }) as Record<
      string,
      unknown
    >;
    assert.equal(out.max_tokens, undefined, `${model} should drop max_tokens`);
    assert.equal(out.max_completion_tokens, 100, `${model} should set max_completion_tokens`);
  }
});

test("gpt-35-turbo is not a GPT-3.5 deployment caught by the generation range", () => {
  // Azure's own name for GPT-3.5 has no dot, so a digit-run like `gpt-\d+`
  // would match it and strip the max_tokens it actually requires. This is why
  // the pattern is a range and stops at 19.
  for (const model of ["gpt-35-turbo", "gpt-35-turbo-16k", "azure/gpt-35"]) {
    assert.equal(
      AZURE_COMPLETION_TOKEN_DEPLOYMENT.test(model),
      false,
      `${model} must keep max_tokens`
    );
    const out = applyAzureParamRules(model, { max_tokens: 100 }, { max_tokens: 100 }) as Record<
      string,
      unknown
    >;
    assert.equal(out.max_tokens, 100, `${model} should pass through untouched`);
  }
});

test("reasoning_effort is dropped when tools are present", () => {
  const out = applyAzureParamRules(
    "gpt-5.1",
    {},
    { reasoning_effort: "high", tools: [{ name: "read_file" }] }
  ) as Record<string, unknown>;

  assert.equal(out.reasoning_effort, undefined);
  assert.equal((out.tools as unknown[]).length, 1);
});

test("reasoning_effort survives when there are no tools", () => {
  const out = applyAzureParamRules("gpt-5.1", {}, { reasoning_effort: "high" }) as Record<
    string,
    unknown
  >;
  assert.equal(out.reasoning_effort, "high");
});

test("non-default temperature is dropped, temperature=1 kept", () => {
  const dropped = applyAzureParamRules("gpt-5.1", {}, { temperature: 0.7 }) as Record<
    string,
    unknown
  >;
  assert.equal(dropped.temperature, undefined);

  const kept = applyAzureParamRules("gpt-5.1", {}, { temperature: 1 }) as Record<string, unknown>;
  assert.equal(kept.temperature, 1);
});

test("unaffected deployments pass through untouched", () => {
  const body = { max_tokens: 500, temperature: 0.2, reasoning_effort: "low" };
  const out = applyAzureParamRules("Phi-4", {}, body);
  assert.deepEqual(out, body);
});

test("the regex does not match unrelated names by accident", () => {
  assert.equal(AZURE_COMPLETION_TOKEN_DEPLOYMENT.test("gpt-4o-mini"), false);
  assert.equal(AZURE_COMPLETION_TOKEN_DEPLOYMENT.test("DeepSeek-V4-Flash"), false);
  assert.equal(AZURE_COMPLETION_TOKEN_DEPLOYMENT.test("Kimi-K2.7-Code"), false);
});

test("azure-ai resolves to AzureAiExecutor, not the bare DefaultExecutor", async () => {
  const executor = await getExecutor("azure-ai");
  assert.ok(
    executor instanceof AzureAiExecutor,
    "azure-ai must have its own executor so it inherits the Azure param rules"
  );
});
