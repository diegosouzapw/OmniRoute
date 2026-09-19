import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveModelAlias } from "../../open-sse/services/modelDeprecation.ts";
import { MODEL_SPECS } from "../../src/shared/constants/modelSpecs.ts";
import { opencode_goProvider } from "../../open-sse/config/providers/registry/opencode/go/index.ts";
import { qoderProvider } from "../../open-sse/config/providers/registry/qoder/index.ts";
import { BAILIAN_CODING_PLAN_MODELS } from "../../open-sse/config/providers/registry/bailian-coding-plan/index.ts";

// #14181: OpenCode Go ships the GA `qwen3.8-max` upstream, but the global
// deprecation map still forwards it to `qwen3.8-max-preview`, so the upstream
// rejects every request with 401 "Model qwen3.8-max-preview is not supported".
describe("#14181 opencode-go qwen3.8-max GA id must dispatch unchanged", () => {
  it("no longer rewrites qwen3.8-max to the preview id", () => {
    assert.equal(resolveModelAlias("qwen3.8-max"), "qwen3.8-max");
    assert.equal(resolveModelAlias("qwen3.8-max", "opencode-go"), "qwen3.8-max");
  });

  it("still serves qwen3.8-max-preview where providers expose it for real", () => {
    assert.equal(resolveModelAlias("qwen3.8-max-preview", "qoder"), "qwen3.8-max-preview");
    assert.equal(
      resolveModelAlias("qwen3.8-max-preview", "bailian-coding-plan"),
      "qwen3.8-max-preview"
    );
    assert.ok(
      qoderProvider.models.some((m) => m?.id === "qwen3.8-max-preview"),
      "qoder registry must keep the preview id"
    );
    assert.ok(
      BAILIAN_CODING_PLAN_MODELS.some((m) => m?.id === "qwen3.8-max-preview"),
      "bailian-coding-plan registry must keep the preview id"
    );
  });

  it("registers qwen3.8-max as a static opencode-go model with the qwen routing flags", () => {
    const row = opencode_goProvider.models.find((m) => m?.id === "qwen3.8-max");
    assert.ok(row, "opencode-go registry must declare qwen3.8-max");
    assert.equal(row.targetFormat, "claude");
    assert.equal(row.supportsReasoning, true);
    assert.equal(row.supportsVision, false);
  });

  it("gives qwen3.8-max its own MODEL_SPECS entry and stops the preview spec aliasing the GA id", () => {
    const ga = MODEL_SPECS["qwen3.8-max"];
    assert.ok(ga, "qwen3.8-max must have its own MODEL_SPECS entry");
    assert.equal(ga.contextWindow, 1000000);
    assert.ok(
      !MODEL_SPECS["qwen3.8-max-preview"]?.aliases?.includes("qwen3.8-max"),
      "preview spec must no longer alias the GA id"
    );
  });
});
