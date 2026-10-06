import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-10734-combo-ctx-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "combo-context-10734-secret";

const { getSourcedTokenLimit, resolveTokenLimit, getTokenLimit } =
  await import("../../open-sse/services/contextManager.ts");
const { computeComboContextLength } = await import("../../src/lib/combos/comboContext.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#10734: resolveTokenLimit marks the generic 128k catch-all as specific:false", () => {
  const resolved = resolveTokenLimit("not-a-real-provider", "no-such-model");
  assert.equal(resolved.limit, 128000);
  assert.equal(resolved.specific, false);
});

test("#10734: getSourcedTokenLimit omits the generic 128k catch-all", () => {
  assert.equal(getSourcedTokenLimit("not-a-real-provider", "no-such-model"), undefined);
  assert.equal(getTokenLimit("not-a-real-provider", "no-such-model"), 128000);
});

test("#10734: getSourcedTokenLimit keeps an explicit canonical window", () => {
  assert.equal(getSourcedTokenLimit("not-a-real-provider", "no-such-model", 500000), 500000);
});

test("#10734: getSourcedTokenLimit keeps provider-specific defaults (claude)", () => {
  const sourced = getSourcedTokenLimit("claude", "claude-sonnet-4");
  assert.equal(typeof sourced, "number");
  assert.ok(sourced && sourced > 128000);
  assert.equal(resolveTokenLimit("claude", "claude-sonnet-4").specific, true);
});

test("#10734: combo min() ignores unsourced members instead of advertising 128k", () => {
  const combo = {
    name: "large-plus-unknown",
    models: ["glm/glm-5.2", "not-a-real-provider/no-such-model"],
  };
  const result = computeComboContextLength(combo, []);
  assert.equal(
    result,
    1000000,
    "glm-5.2 is a sourced 1M window; the generic-default member must not pull min() to 128k"
  );
});

test("#10734: nested combo-ref inherits sourced min(), not 128k", () => {
  const inner = {
    name: "inner-large",
    models: ["glm/glm-5.2", "not-a-real-provider/no-such-model"],
  };
  const wrapper = {
    name: "wrapper-large",
    models: [{ kind: "combo-ref", comboName: "inner-large" }],
  };
  const result = computeComboContextLength(wrapper, [inner, wrapper]);
  assert.equal(result, 1000000);
});

test("#10734: GET /v1/models does not advertise 128k for a 500k combo plus an unsourced member", async () => {
  const modelId = "gpt-5.6-terra";
  assert.equal(contextOverrides.setModelContextOverride("codex", modelId, 500000), true);

  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-10734-large-window",
    accessToken: "codex-test-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await combosDb.createCombo({
    name: "large-context-combo-10734",
    strategy: "priority",
    models: [`codex/${modelId}`, "not-a-real-provider/no-such-model"],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const combo = body.data.find((item) => item.id === "large-context-combo-10734");

  assert.equal(response.status, 200);
  assert.ok(combo, "combo should be published in /v1/models");
  assert.notEqual(
    combo.context_length,
    128000,
    "generic 128k must not win min() over the 500k sourced member"
  );
  assert.equal(combo.context_length, 500000);
});
