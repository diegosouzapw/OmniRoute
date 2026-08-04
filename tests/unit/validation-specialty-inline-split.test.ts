// Characterization of the validation.ts specialty-inline split (god-file decomposition): the
// inline SPECIALTY_VALIDATORS closures (v0-vercel, auggie, qoder, kiro wrapper, gitlab, vertex,
// vertex-partner, longcat, nvidia, zai, xiaomi-mimo, gitlawb factory) moved into
// validation/specialtyInline.ts as top-level functions taking `isLocal` where the original
// closure captured it. Behavior-preserving move — the locks here are module surface; the runtime
// behavior stays covered by provider-validation-specialty / provider-validation-azure-vertex /
// nvidia-validation-* / zai-validator / xiaomi-mimo-provider suites.
import { test } from "node:test";
import assert from "node:assert/strict";

const M = await import("../../src/lib/providers/validation/specialtyInline.ts");
const HOST = await import("../../src/lib/providers/validation.ts");

test("specialtyInline exposes the extracted leaf validators", () => {
  for (const name of [
    "validateV0VercelProvider",
    "validateAuggieProvider",
    "validateQoderProvider",
    "validateKiroProvider",
    "validateGitlabProvider",
    "validateVertexProvider",
    "validateVertexPartnerProvider",
    "validateLongcatProvider",
    "validateNvidiaProvider",
    "validateZaiProvider",
    "validateXiaomiMimoProvider",
    "buildOpengatewayValidator",
    "buildGitlawbValidators",
  ]) {
    assert.equal(typeof (M as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("host dispatcher surface stays intact after the move", () => {
  assert.equal(typeof (HOST as Record<string, unknown>).validateProviderApiKey, "function");
});

test("buildGitlawbValidators returns one entry per config id", () => {
  const map = M.buildGitlawbValidators(
    [
      ["gitlawb", "https://opengateway.gitlawb.com/v1/xiaomi-mimo", "mimo-v2.5-pro"],
      ["gitlawb-gmi", "https://opengateway.gitlawb.com/v1/gmi-cloud", "XiaomiMiMo/MiMo-V2.5-Pro"],
    ],
    false
  );
  assert.deepEqual(Object.keys(map).sort(), ["gitlawb", "gitlawb-gmi"]);
  assert.equal(typeof map.gitlawb, "function");
  assert.equal(typeof map["gitlawb-gmi"], "function");
});

test("validateVertexProvider: Express-mode key is accepted without JWT mint", async () => {
  const result = await M.validateVertexProvider({ apiKey: "opaque-express-key" });
  assert.equal(result.valid, true);
  assert.equal(result.error, null);
});

test("validateVertexPartnerProvider: Express-mode key is accepted without JWT mint", async () => {
  const result = await M.validateVertexPartnerProvider({ apiKey: "opaque-express-key" });
  assert.equal(result.valid, true);
  assert.equal(result.error, null);
});

test("validateVertexProvider: malformed Service Account JSON is rejected", async () => {
  const result = await M.validateVertexProvider({
    apiKey: '{"type":"service_account","project_id":"p"}',
  });
  assert.equal(result.valid, false);
  assert.match(result.error || "", /Invalid Service Account JSON/i);
});
