import assert from "node:assert/strict";
import { test } from "node:test";

import { fingerprintCatalogAuthKey } from "../../../src/app/api/v1/models/catalogCache.ts";

test("fingerprintCatalogAuthKey never returns the raw API key", () => {
  const raw = "sk-test-super-secret-catalog-key";
  const finger = fingerprintCatalogAuthKey(raw);
  assert.equal(finger.length, 16);
  assert.equal(finger.includes(raw), false);
  assert.equal(finger.includes("sk-test"), false);
  assert.equal(fingerprintCatalogAuthKey(raw), finger);
  assert.notEqual(fingerprintCatalogAuthKey("sk-other"), finger);
  assert.equal(fingerprintCatalogAuthKey(""), "");
});
