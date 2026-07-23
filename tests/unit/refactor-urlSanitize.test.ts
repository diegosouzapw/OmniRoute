import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { stripTrailingSlashes, normalizeBaseUrl } from "../../open-sse/utils/urlSanitize.ts";

// ── stripTrailingSlashes ────────────────────────────────────────────────────

describe("stripTrailingSlashes", () => {
  it("returns unchanged string when there is no trailing slash", () => {
    assert.equal(stripTrailingSlashes("hello"), "hello");
  });

  it("strips a single trailing slash", () => {
    assert.equal(stripTrailingSlashes("hello/"), "hello");
  });

  it("strips multiple trailing slashes", () => {
    assert.equal(stripTrailingSlashes("hello///"), "hello");
  });

  it("returns empty string for empty input", () => {
    assert.equal(stripTrailingSlashes(""), "");
  });

  it("returns empty string when input is only a slash", () => {
    assert.equal(stripTrailingSlashes("/"), "");
  });

  it("strips one trailing slash from a full URL with path", () => {
    assert.equal(stripTrailingSlashes("https://api.example.com/v1/"), "https://api.example.com/v1");
  });

  it("leaves a URL without trailing slash unchanged", () => {
    assert.equal(stripTrailingSlashes("https://api.example.com"), "https://api.example.com");
  });

  it("strips multiple trailing slashes from a URL", () => {
    assert.equal(stripTrailingSlashes("https://api.example.com///"), "https://api.example.com");
  });
});

// ── normalizeBaseUrl ────────────────────────────────────────────────────────

describe("normalizeBaseUrl", () => {
  it("returns empty string for null", () => {
    assert.equal(normalizeBaseUrl(null), "");
  });

  it("returns empty string for undefined", () => {
    assert.equal(normalizeBaseUrl(undefined), "");
  });

  it("returns empty string for a number", () => {
    assert.equal(normalizeBaseUrl(123 as unknown as string), "");
  });

  it("trims whitespace and strips trailing slash", () => {
    assert.equal(normalizeBaseUrl("  https://api.example.com/v1/  "), "https://api.example.com/v1");
  });

  it("leaves a clean URL unchanged", () => {
    assert.equal(normalizeBaseUrl("https://api.example.com/v1"), "https://api.example.com/v1");
  });

  it("strips trailing slash from a URL", () => {
    assert.equal(normalizeBaseUrl("https://api.example.com/"), "https://api.example.com");
  });

  it("returns empty string for empty input", () => {
    assert.equal(normalizeBaseUrl(""), "");
  });
});
