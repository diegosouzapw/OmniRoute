import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-grok-15366-"));
process.env.DATA_DIR = dataDir;

const { normalizeCursorAvailableModelsPayload } =
  await import("../../src/lib/providerModels/cursorAvailableModels.ts");
const { normalizeDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { GET } = await import("../../src/app/api/synced-available-models/route.ts");
const { resolveRequestedModel } = await import("../../open-sse/utils/cursorAgentProtobuf.ts");
const { cursorProvider } = await import("../../open-sse/config/providers/registry/cursor/index.ts");

type Variant = { params: Array<{ id: string; value: string }>; displayName: string };
const fixture = JSON.parse(
  fs.readFileSync(new URL("../fixtures/cursor/grok-4.7-15366.json", import.meta.url), "utf8")
) as { items: Array<{ id: string; variants: Variant[] }> };

function expectedVariant(variant: Variant) {
  const values = Object.fromEntries(variant.params.map(({ id, value }) => [id, value]));
  return {
    id: `cursor-grok-4.7-${values.reasoning_effort}${values.fast === "true" ? "-fast" : ""}-${values.context}`,
    contextLength: values.context === "256k" ? 256_000 : 500_000,
    parameters: { context: values.context, effort: values.reasoning_effort, fast: values.fast },
  };
}

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("#15366 items payload survives sync and the dashboard exposes all supplied variants", async () => {
  const discovered = normalizeCursorAvailableModelsPayload(fixture);
  assert.ok(
    discovered.some(({ id }) => id === "grok-4.7"),
    "items must include Grok 4.7"
  );
  const stored = normalizeDiscoveredModels(discovered, "cursor");
  await updateSettings({ requireLogin: false });
  const connection = await createProviderConnection({
    provider: "cursor",
    authType: "apikey",
    name: "Grok fixture",
    apiKey: "test-only",
    isActive: true,
  });
  await replaceSyncedAvailableModelsForConnection("cursor", connection.id, stored);
  const response = await GET(
    new Request("http://localhost/api/synced-available-models?provider=cursor")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    models: Array<{ id: string; inputTokenLimit?: number }>;
  };
  for (const variant of fixture.items[0].variants) {
    const expected = expectedVariant(variant);
    assert.equal(
      body.models.find(({ id }) => id === expected.id)?.inputTokenLimit,
      expected.contextLength
    );
  }
  assert.equal(
    body.models.some(({ id }) => /grok-4\.7.*max/.test(id)),
    false
  );
});

test("#15366 context variants resolve to the canonical model and all three wire parameters", () => {
  const liveCatalogIds = new Set(
    normalizeCursorAvailableModelsPayload(fixture).map(({ id }) => id)
  );
  for (const variant of fixture.items[0].variants) {
    const expected = expectedVariant(variant);
    const resolved = resolveRequestedModel(expected.id, { liveCatalogIds });
    assert.equal(resolved.modelId, "grok-4.7");
    assert.deepEqual(
      Object.fromEntries(resolved.parameters.map(({ id, value }) => [id, value])),
      expected.parameters
    );
  }
});

test("#15366 static catalog exposes only the supplied Grok 4.7 tiers and retains Grok 4.6", () => {
  for (const variant of fixture.items[0].variants) {
    const expected = expectedVariant(variant);
    const row = cursorProvider.models.find(({ id }) => id === expected.id);
    assert.equal(row?.contextLength, expected.contextLength, expected.id);
    assert.deepEqual(row?.liveCatalogIds, ["grok-4.7"]);
  }
  assert.ok(cursorProvider.models.some(({ id }) => id === "cursor-grok-4.6-high-fast"));
  assert.equal(
    cursorProvider.models.some(({ id }) => /grok-4\.7.*max/.test(id)),
    false
  );
});

test("#15366 malformed, disabled and duplicate variants cannot expand the advertised catalog", () => {
  const allowed = fixture.items[0].variants[0];
  const payload = {
    items: [
      {
        ...fixture.items[0],
        variants: [
          allowed,
          allowed,
          { ...fixture.items[0].variants[1], blockedByAdminAllowlist: true },
          { ...fixture.items[0].variants[2], disabled: true },
          { params: [{ id: "context", value: "1m" }] },
        ],
      },
    ],
  };
  const models = normalizeCursorAvailableModelsPayload(payload);
  assert.deepEqual(
    models.filter(({ id }) => id.startsWith("cursor-grok-4.7-")).map(({ id }) => id),
    [expectedVariant(allowed).id]
  );
  assert.deepEqual(models.find(({ id }) => id === "grok-4.7")?.supportedThinkingEfforts, ["low"]);
  assert.equal(
    normalizeCursorAvailableModelsPayload({
      items: [{ ...fixture.items[0], disabled: true }],
    }).some(({ id }) => id.includes("grok")),
    false
  );
});
