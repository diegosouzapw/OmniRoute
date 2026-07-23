import test from "node:test";
import assert from "node:assert/strict";

process.env.API_KEY_SECRET = "test-api-key-utils-secret";

const apiKeyUtils = await import("../../src/shared/utils/apiKey.ts");

test("api key utility public surface keeps generation and parsing only", () => {
  const machineId = "testmachine";
  const { key, keyId } = apiKeyUtils.generateApiKeyWithMachine(machineId);

  assert.equal(typeof key, "string");
  assert.equal(typeof keyId, "string");
  assert.match(key, new RegExp(`^sk-${machineId}-${keyId}-[a-f0-9]{8}$`));
  assert.deepEqual(apiKeyUtils.parseApiKey(key), {
    machineId,
    keyId,
    isNewFormat: true,
  });
  assert.deepEqual(apiKeyUtils.parseApiKey("sk-legacykey"), {
    machineId: null,
    keyId: "legacykey",
    isNewFormat: false,
  });
  assert.equal(apiKeyUtils.parseApiKey("not-a-key"), null);

  assert.equal("verifyApiKeyCrc" in apiKeyUtils, false);
  assert.equal("isNewFormatKey" in apiKeyUtils, false);
});
