import assert from "node:assert/strict";
import { test } from "node:test";
import { APIKEY_PROVIDERS_INFERENCE } from "../../src/shared/constants/providers/apikey/inference-hosts.ts";

test("Monster API provider is marked as deprecated (fixes #8676)", () => {
  const monsterEntry = APIKEY_PROVIDERS_INFERENCE.monsterapi;
  assert.ok(monsterEntry, "monsterapi entry must exist in APIKEY_PROVIDERS_INFERENCE");
  assert.equal(
    (monsterEntry as Record<string, unknown>).isDeprecated,
    true,
    "monsterapi must be marked isDeprecated"
  );
  assert.ok(
    typeof (monsterEntry as Record<string, unknown>).deprecationReason === "string",
    "monsterapi must specify deprecationReason"
  );
});
