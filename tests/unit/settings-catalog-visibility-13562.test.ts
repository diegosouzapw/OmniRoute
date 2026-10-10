import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "settings-catalog-13562-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "synthetic-settings-catalog-13562";
// This tests catalog contents, not the cold-build latency budget of the shared host.
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");
const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
const { applyNoThinkingAlias } = await import("../../open-sse/utils/noThinkingAlias.ts");
const { applyCatalogPostFilters } = await import("../../src/app/api/v1/models/catalogResponse.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function patch(body: Record<string, unknown>) {
  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", { method: "PATCH", body })
  );
  assert.equal(response.status, 200, await response.clone().text());
  return response.json();
}

async function ids() {
  const response = await modelsRoute.GET(new Request("http://localhost/v1/models"));
  assert.equal(response.status, 200, await response.clone().text());
  const body: { data: { id: string }[] } = await response.json();
  return body.data.map((model) => model.id);
}

test("PATCH settings changes a warmed catalog immediately, independently and after reload", async () => {
  const connection = await createProviderConnection({
    provider: "command-code",
    authType: "apikey",
    name: "catalog fixture",
    apiKey: "synthetic-command-code",
    isActive: true,
    testStatus: "active",
  });
  await replaceSyncedAvailableModelsForConnection("command-code", connection.id, [
    {
      id: "claude-opus-4-7",
      name: "Claude Opus fixture",
      source: "imported",
      supportedThinkingEfforts: ["low", "high", "xhigh"],
    },
  ]);
  await patch({ hideAutoCombos: false, hideNoThinkVariants: false });
  const visible = await ids();
  assert.ok(
    visible.some((id) => id.startsWith("auto/")),
    "auto baseline must exist"
  );
  const variant = visible.find(
    (id) => id.startsWith("no-think/") && id.includes("claude-opus-4-7")
  );
  assert.ok(variant, "no-thinking baseline must exist; do not skip this assertion");
  const base = variant.slice("no-think/".length);
  assert.ok(visible.includes(base));

  const first = await patch({ hideAutoCombos: true });
  assert.equal(first.hideAutoCombos, true);
  assert.equal(first.hideNoThinkVariants, false);
  const onlyNoThink = await ids();
  assert.equal(
    onlyNoThink.some((id) => id.startsWith("auto/")),
    false
  );
  assert.ok(onlyNoThink.includes(variant));

  await patch({ hideNoThinkVariants: true });
  const hidden = await ids();
  assert.equal(
    hidden.some((id) => /^(auto|no-think)\//.test(id)),
    false
  );
  assert.ok(hidden.includes(base), "base model remains visible");
  resetDbInstance();
  const settings = await settingsRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings")
  );
  assert.equal(settings.status, 200);
  const persisted = await settings.json();
  assert.equal(persisted.hideAutoCombos, true);
  assert.equal(persisted.hideNoThinkVariants, true);
  assert.equal(
    (await ids()).some((id) => /^(auto|no-think)\//.test(id)),
    false
  );

  const explicit = { model: variant, messages: [{ role: "user", content: "synthetic" }] };
  assert.equal(
    applyNoThinkingAlias(explicit).applied,
    true,
    "visibility does not disable alias resolution"
  );
  assert.equal(explicit.model, base);
  await patch({ hideAutoCombos: false, hideNoThinkVariants: false });
  const restored = await ids();
  assert.ok(restored.some((id) => id.startsWith("auto/")));
  assert.ok(restored.includes(variant));
});

test("the final synced-effort pass respects hiding no-thinking variants", async () => {
  const base = {
    id: "cmd/claude-opus-4-7",
    owned_by: "command-code",
    capabilities: { effort_tiers: ["low", "high"] },
  };
  const context = { connections: [], prefixMode: "dual", aliasToProviderId: {} };
  const visible = await applyCatalogPostFilters(
    new Request("http://localhost/v1/models"),
    [base],
    context
  );
  assert.ok(visible.some((model) => String(model.id).startsWith("no-think/")));
  const hidden = await applyCatalogPostFilters(new Request("http://localhost/v1/models"), [base], {
    ...context,
    hideNoThinkVariants: true,
  });
  assert.equal(
    hidden.some((model) => String(model.id).startsWith("no-think/")),
    false
  );
  assert.ok(hidden.some((model) => model.id === base.id));
});

test("synthetic variant authorization remains effective when visibility is enabled", async () => {
  const base = {
    id: "cmd/claude-opus-4-7",
    owned_by: "command-code",
    capabilities: { effort_tiers: ["low", "high"] },
  };
  const result = await applyCatalogPostFilters(new Request("http://localhost/v1/models"), [base], {
    connections: [],
    prefixMode: "dual",
    aliasToProviderId: {},
    hideNoThinkVariants: false,
    authorizeSyntheticModel: (model) => !String(model.id).startsWith("no-think/"),
  });
  assert.equal(
    result.some((model) => String(model.id).startsWith("no-think/")),
    false
  );
  assert.ok(result.some((model) => model.id === base.id));
});
