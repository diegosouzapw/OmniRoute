import test from "node:test";
import assert from "node:assert/strict";

const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const registeredKeysDb = await import("../../src/lib/db/registeredKeys.ts");

test("hashKey in apiKeys handles null/undefined safely", async () => {
  // @ts-ignore - testing runtime safety
  const resultNull = await apiKeysDb.validateApiKey(null);
  assert.equal(resultNull, false);

  // @ts-ignore - testing runtime safety
  const resultUndefined = await apiKeysDb.validateApiKey(undefined);
  assert.equal(resultUndefined, false);
});

test("hashKey in registeredKeys handles null/undefined safely", () => {
  // @ts-ignore - testing runtime safety
  const resultNull = registeredKeysDb.validateRegisteredKey(null);
  assert.equal(resultNull, null);

  // @ts-ignore - testing runtime safety
  const resultUndefined = registeredKeysDb.validateRegisteredKey(undefined);
  assert.equal(resultUndefined, null);
});
