import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

// Regression guard for #10577: the crof seed catalog advertised 10 model ids that
// crof.ai has retired. Routing already 400s these via the live-synced catalog gate,
// but /v1/models listing kept advertising them. Confirmed live against
// GET https://crof.ai/v1/models (2026-08-19): these 10 ids are absent from the
// current live roster.
const STALE_MODEL_IDS = [
  "deepseek-v4-pro-precision",
  "deepseek-v4-pro-lightning",
  "kimi-k2.6-precision",
  "kimi-k2.5-lightning",
  "kimi-k2.5",
  "glm-5.1-precision",
  "glm-4.7",
  "glm-4.7-flash",
  "mimo-v2.5-pro-precision",
  "minimax-m2.5",
];

test("issue #10577: crof seed catalog must not list retired model ids", () => {
  const crof = providerRegistry.crof;
  assert.ok(crof, "crof provider must exist in the registry");
  const seedIds = crof.models.map((m) => m.id);
  for (const staleId of STALE_MODEL_IDS) {
    assert.ok(
      !seedIds.includes(staleId),
      `crof seed catalog must not list retired model id "${staleId}"`
    );
  }
});
