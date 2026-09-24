import test from "node:test";
import assert from "node:assert/strict";
import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import { command_codeProvider } from "../../open-sse/config/providers/registry/command-code/index.ts";
import { parseEffortLevel, OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base/reasoningEffort.ts";

test("muse-spark-1.3 models route to Responses API on opencode, opencode-go, and opencode-zen", () => {
  const opencodeGoModels = [
    "muse-spark-1.3-contributor",
    "muse-spark-1.3-contributor-minimal",
    "muse-spark-1.3-contributor-low",
    "muse-spark-1.3-contributor-medium",
    "muse-spark-1.3-contributor-high",
    "muse-spark-1.3-contributor-xhigh",
    "muse-spark-1.3-contributor-max",
  ];

  for (const id of opencodeGoModels) {
    assert.equal(
      getModelTargetFormat("opencode-go", id),
      "openai-responses",
      `getModelTargetFormat("opencode-go", "${id}") should be openai-responses`
    );
    assert.equal(
      getModelTargetFormat("ocg", id),
      "openai-responses",
      `getModelTargetFormat("ocg", "${id}") should be openai-responses`
    );
  }

  const opencodeModels = [
    "muse-spark-1.3",
    "muse-spark-1.3-contributor",
    "muse-spark-1.3-contributor-free",
  ];

  for (const id of opencodeModels) {
    assert.equal(
      getModelTargetFormat("opencode", id),
      "openai-responses",
      `getModelTargetFormat("opencode", "${id}") should be openai-responses`
    );
    assert.equal(
      getModelTargetFormat("opencode-zen", id),
      "openai-responses",
      `getModelTargetFormat("opencode-zen", "${id}") should be openai-responses`
    );
  }
});

test("muse-spark-1.3-contributor and future effort aliases parse correctly in opencode executor", () => {
  assert.deepEqual(parseEffortLevel("muse-spark-1.3-contributor-minimal"), {
    baseModel: "muse-spark-1.3-contributor",
    effort: "minimal",
  });
  assert.deepEqual(parseEffortLevel("muse-spark-1.3-contributor-xhigh"), {
    baseModel: "muse-spark-1.3-contributor",
    effort: "xhigh",
  });
  assert.deepEqual(parseEffortLevel("muse-spark-1.3-contributor-max"), {
    baseModel: "muse-spark-1.3-contributor",
    effort: "max",
  });

  // Future muse-spark versions support up to max
  assert.deepEqual(parseEffortLevel("muse-spark-1.4-contributor-max"), {
    baseModel: "muse-spark-1.4-contributor",
    effort: "max",
  });
  assert.deepEqual(parseEffortLevel("muse-spark-2.0-contributor-max"), {
    baseModel: "muse-spark-2.0-contributor",
    effort: "max",
  });

  // 1.2 ceiling is xhigh — max is null
  assert.equal(parseEffortLevel("muse-spark-1.2-contributor-max"), null);
  assert.deepEqual(parseEffortLevel("muse-spark-1.2-contributor-xhigh"), {
    baseModel: "muse-spark-1.2-contributor",
    effort: "xhigh",
  });
});

test("muse-spark reasoning effort sanitization: 1.2 clamps max to xhigh, 1.3+ allows max", () => {
  // 1.2 clamps max/ultra to xhigh, none to minimal
  const res12Max = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "max" },
    "opencode-go",
    "muse-spark-1.2-contributor"
  ) as Record<string, unknown>;
  assert.equal(res12Max.reasoning_effort, "xhigh");

  const res12Ultra = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "ultra" },
    "opencode-go",
    "muse-spark-1.2-contributor"
  ) as Record<string, unknown>;
  assert.equal(res12Ultra.reasoning_effort, "xhigh");

  const res12None = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "none" },
    "opencode-go",
    "muse-spark-1.2-contributor"
  ) as Record<string, unknown>;
  assert.equal(res12None.reasoning_effort, "minimal");

  // 1.3+ keeps max, keeps xhigh, maps ultra to max, none to minimal
  const res13Max = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "max" },
    "opencode-go",
    "muse-spark-1.3-contributor"
  ) as Record<string, unknown>;
  assert.equal(res13Max.reasoning_effort, "max");

  const res13XHigh = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "xhigh" },
    "opencode-go",
    "muse-spark-1.3-contributor"
  ) as Record<string, unknown>;
  assert.equal(res13XHigh.reasoning_effort, "xhigh");

  const res13Ultra = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "ultra" },
    "opencode-go",
    "muse-spark-1.3-contributor"
  ) as Record<string, unknown>;
  assert.equal(res13Ultra.reasoning_effort, "max");

  const res13None = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "none" },
    "opencode-go",
    "muse-spark-1.3-contributor"
  ) as Record<string, unknown>;
  assert.equal(res13None.reasoning_effort, "minimal");

  // Future muse-spark-1.4 allows max
  const res14Max = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "max" },
    "opencode-go",
    "muse-spark-1.4-contributor"
  ) as Record<string, unknown>;
  assert.equal(res14Max.reasoning_effort, "max");
});

test("command-code registers meta/muse-spark-1.3-contributor", () => {
  const model = command_codeProvider.models.find((m) => m.id === "meta/muse-spark-1.3-contributor");
  assert.ok(model, "meta/muse-spark-1.3-contributor must be in command-code registry");
  assert.equal(model?.supportsReasoning, true);
  assert.equal(model?.supportsVision, true);
});

test("OpencodeExecutor.transformRequest rewrites muse-spark effort aliases to baseModel + reasoning.effort", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const creds = { apiKey: "test", authType: "apikey" } as const;

  // muse-spark-1.3-contributor-max rewrites to baseModel + reasoning.effort: "max"
  // (max-first: execute() retries once with "xhigh" on the unsupported-effort 400 —
  // see opencode-muse-spark-max-fallback.test.ts)
  const maxReq = executor.transformRequest(
    "muse-spark-1.3-contributor-max",
    { model: "muse-spark-1.3-contributor-max", input: [] },
    true,
    creds
  );
  assert.equal(maxReq.model, "muse-spark-1.3-contributor");
  assert.deepEqual(maxReq.reasoning, { effort: "max" });

  // muse-spark-1.3-contributor-low rewrites to baseModel + reasoning.effort: "low"
  const lowReq = executor.transformRequest(
    "muse-spark-1.3-contributor-low",
    { model: "muse-spark-1.3-contributor-low", input: [] },
    true,
    creds
  );
  assert.equal(lowReq.model, "muse-spark-1.3-contributor");
  assert.deepEqual(lowReq.reasoning, { effort: "low" });

  // muse-spark-1.3-contributor-minimal rewrites to baseModel + reasoning.effort: "minimal"
  const minReq = executor.transformRequest(
    "muse-spark-1.3-contributor-minimal",
    { model: "muse-spark-1.3-contributor-minimal", input: [] },
    true,
    creds
  );
  assert.equal(minReq.model, "muse-spark-1.3-contributor");
  assert.deepEqual(minReq.reasoning, { effort: "minimal" });
});
