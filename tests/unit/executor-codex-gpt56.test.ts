import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";

test("CodexExecutor.transformRequest preserves max effort for GPT-5.6", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.6-sol",
    {
      model: "gpt-5.6-sol",
      input: [],
      reasoning_effort: "max",
    },
    false,
    { requestEndpointPath: "/responses" }
  );

  assert.equal(result.model, "gpt-5.6-sol");
  assert.equal(result.reasoning.effort, "max");
  assert.equal(result.reasoning_effort, undefined);
});

test("CodexExecutor.transformRequest maps GPT-5.6 ultra aliases to max wire effort", () => {
  const executor = new CodexExecutor();

  for (const model of ["gpt-5.6-sol-ultra", "gpt-5.6-terra-ultra"]) {
    const result = executor.transformRequest(model, { model, input: [] }, false, {
      requestEndpointPath: "/responses",
    });

    assert.equal(result.model, model.replace(/-ultra$/, ""));
    assert.equal(result.reasoning.effort, "max");
  }
});

test("CodexExecutor.transformRequest clamps Luna ultra requests to its max effort", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.6-luna",
    {
      model: "gpt-5.6-luna",
      input: [],
      reasoning_effort: "ultra",
    },
    false,
    { requestEndpointPath: "/responses" }
  );

  assert.equal(result.model, "gpt-5.6-luna");
  assert.equal(result.reasoning.effort, "max");
});
