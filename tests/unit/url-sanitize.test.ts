/**
 * Unit tests for open-sse/utils/urlSanitize.ts — stripTrailingSlashes()
 *
 * Covers the shared utility that replaces regex /\/+$/ across provider
 * config modules to satisfy CodeQL js/polynomial-redos checks.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { stripTrailingSlashes } from "../../open-sse/utils/urlSanitize.ts";

describe("stripTrailingSlashes", () => {
  it("returns the same string when no trailing slashes", () => {
    assert.equal(stripTrailingSlashes("https://example.com"), "https://example.com");
  });

  it("strips a single trailing slash", () => {
    assert.equal(stripTrailingSlashes("https://example.com/"), "https://example.com");
  });

  it("strips multiple trailing slashes", () => {
    assert.equal(stripTrailingSlashes("https://example.com///"), "https://example.com");
  });

  it("handles empty string", () => {
    assert.equal(stripTrailingSlashes(""), "");
  });

  it("handles string that is only slashes", () => {
    assert.equal(stripTrailingSlashes("///"), "");
  });

  it("preserves internal slashes", () => {
    assert.equal(stripTrailingSlashes("https://example.com/api/v1/"), "https://example.com/api/v1");
  });

  it("handles strings with many trailing slashes efficiently", () => {
    const input = "https://example.com" + "/".repeat(10_000);
    const start = performance.now();
    const result = stripTrailingSlashes(input);
    const elapsed = performance.now() - start;
    assert.equal(result, "https://example.com");
    // Should complete in under 50ms even with 10k trailing slashes
    assert.ok(elapsed < 50, `took ${elapsed}ms — expected < 50ms`);
  });
});
