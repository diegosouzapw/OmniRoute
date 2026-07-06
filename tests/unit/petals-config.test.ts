import assert from "node:assert/strict";
import { test } from "node:test";

test("normalizePetalsBaseUrl defaults to the Petals generate endpoint", async () => {
  const { PETALS_DEFAULT_BASE_URL, normalizePetalsBaseUrl } = await import(
    "../../open-sse/config/petals.ts"
  );

  assert.equal(normalizePetalsBaseUrl(undefined), PETALS_DEFAULT_BASE_URL);
  assert.equal(normalizePetalsBaseUrl(""), PETALS_DEFAULT_BASE_URL);
});

test("normalizePetalsBaseUrl appends generate and strips trailing slashes", async () => {
  const { normalizePetalsBaseUrl } = await import("../../open-sse/config/petals.ts");

  assert.equal(
    normalizePetalsBaseUrl("https://chat.petals.dev/api/v1/"),
    "https://chat.petals.dev/api/v1/generate"
  );
  assert.equal(
    normalizePetalsBaseUrl("https://chat.petals.dev/api/v1/generate"),
    "https://chat.petals.dev/api/v1/generate"
  );
});
