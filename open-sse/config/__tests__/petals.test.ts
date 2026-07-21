import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizePetalsBaseUrl, PETALS_DEFAULT_BASE_URL } from "../petals.ts";

describe("normalizePetalsBaseUrl", () => {
  it("appends the generate endpoint to a normal URL", () => {
    assert.equal(
      normalizePetalsBaseUrl("https://petals.example/api/v1"),
      "https://petals.example/api/v1/generate"
    );
  });

  it("removes trailing slashes before appending the endpoint", () => {
    assert.equal(
      normalizePetalsBaseUrl("https://petals.example/api/v1///"),
      "https://petals.example/api/v1/generate"
    );
  });

  it("uses the default URL for empty or missing input", () => {
    assert.equal(normalizePetalsBaseUrl(""), PETALS_DEFAULT_BASE_URL);
    assert.equal(normalizePetalsBaseUrl("   "), PETALS_DEFAULT_BASE_URL);
    assert.equal(normalizePetalsBaseUrl(undefined), PETALS_DEFAULT_BASE_URL);
    assert.equal(normalizePetalsBaseUrl(null), PETALS_DEFAULT_BASE_URL);
  });

  it("uses the default URL for non-string or invalid runtime input", () => {
    assert.equal(normalizePetalsBaseUrl(42), PETALS_DEFAULT_BASE_URL);
    assert.equal(normalizePetalsBaseUrl({}), PETALS_DEFAULT_BASE_URL);
    assert.equal(normalizePetalsBaseUrl([]), PETALS_DEFAULT_BASE_URL);
  });
});
