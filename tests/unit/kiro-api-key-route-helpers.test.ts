import test from "node:test";
import assert from "node:assert/strict";

import {
  buildKiroApiKeyConnectionName,
  isKiroApiKeyImportClientError,
} from "../../src/app/api/oauth/kiro/api-key/helpers.ts";

test("Kiro API key connection names differ for different keys in the same region", () => {
  const first = buildKiroApiKeyConnectionName("kiro", "us-east-1", "ksk_first_key");
  const second = buildKiroApiKeyConnectionName("kiro", "us-east-1", "ksk_second_key");

  assert.match(first, /^Kiro API Key \(us-east-1, [a-f0-9]{8}\)$/);
  assert.match(second, /^Kiro API Key \(us-east-1, [a-f0-9]{8}\)$/);
  assert.notEqual(first, second);
});

test("Kiro API key connection names are stable for the same trimmed key", () => {
  const first = buildKiroApiKeyConnectionName("amazon-q", "eu-west-1", " ksk_same_key ");
  const second = buildKiroApiKeyConnectionName("amazon-q", "eu-west-1", "ksk_same_key");

  assert.equal(first, second);
  assert.match(first, /^Amazon Q API Key \(eu-west-1, [a-f0-9]{8}\)$/);
});

test("Kiro API key import classifies client validation failures as 400-class", () => {
  assert.equal(isKiroApiKeyImportClientError(new Error("API key is required")), true);
  assert.equal(isKiroApiKeyImportClientError(new Error("Invalid region")), true);
  assert.equal(
    isKiroApiKeyImportClientError(new Error("Failed to list profiles: Invalid API key")),
    true
  );
});

test("Kiro API key import leaves network/server failures as 500-class", () => {
  assert.equal(isKiroApiKeyImportClientError(new Error("fetch failed")), false);
  assert.equal(isKiroApiKeyImportClientError(new Error("ECONNRESET")), false);
});
