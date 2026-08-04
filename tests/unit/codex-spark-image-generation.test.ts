/**
 * #6651 — Codex Desktop injects the `image_generation` hosted tool into every
 * Responses API request. OmniRoute only dropped it for free-plan Codex
 * accounts (isCodexFreePlan). It did NOT drop it for gpt-5.3-codex-spark (and
 * other Spark-scope models), which reject `image_generation` upstream even on
 * paid-plan accounts, producing:
 * [400]: Tool 'image_generation' is not supported with gpt-5.3-codex-spark.
 *
 * Fix: CodexExecutor.transformRequest now also drops image_generation when
 * the target model resolves to the Spark quota scope
 * (getCodexModelScope(model) === "spark"), independent of plan.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");

function buildBody() {
  return {
    _nativeCodexPassthrough: true,
    tools: [
      { type: "image_generation", output_format: "png" },
      { type: "function", name: "foo", parameters: { type: "object" } },
    ],
  };
}

test("#6651: CodexExecutor.transformRequest drops image_generation for gpt-5.3-codex-spark even on a paid-plan account", () => {
  const executor = new CodexExecutor();

  // Paid-plan account (not free) — isCodexFreePlan() alone returns false, so
  // the fix must rely on the model-scope check to still drop the tool.
  const result = executor.transformRequest("gpt-5.3-codex-spark", buildBody(), false, {
    providerSpecificData: { workspacePlanType: "team" },
  }) as { tools: Array<{ type?: string }> };

  assert.equal(
    result.tools.some((t) => t.type === "image_generation"),
    false,
    "image_generation must be dropped for gpt-5.3-codex-spark regardless of account plan (#6651)"
  );
  assert.equal(
    result.tools.some((t) => t.type === "function"),
    true,
    "the function tool must survive"
  );
});

test("#6651: CodexExecutor.transformRequest still preserves image_generation for non-Spark models on paid plans", () => {
  const executor = new CodexExecutor();

  const result = executor.transformRequest("gpt-5", buildBody(), false, {
    providerSpecificData: { workspacePlanType: "team" },
  }) as { tools: Array<{ type?: string }> };

  assert.equal(
    result.tools.some((t) => t.type === "image_generation"),
    true,
    "image_generation must still be preserved for non-Spark models on paid plans"
  );
});
