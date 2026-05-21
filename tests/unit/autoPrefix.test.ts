import { parseAutoPrefix } from "../../open-sse/services/autoCombo/autoPrefix.ts";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("parseAutoPrefix", () => {
  it('should return valid for "auto" with no variant', () => {
    const result = parseAutoPrefix("auto");
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.variant, undefined);
  });

  it('should return valid for "auto/" with no variant', () => {
    const result = parseAutoPrefix("auto/");
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.variant, undefined);
  });

  it('should return valid for "auto/coding" with coding variant', () => {
    const result = parseAutoPrefix("auto/coding");
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.variant, "coding");
  });

  it('should return valid for "auto/fast" with fast variant', () => {
    const result = parseAutoPrefix("auto/fast");
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.variant, "fast");
  });

  it('should return valid for "auto/cheap" with cheap variant', () => {
    const result = parseAutoPrefix("auto/cheap");
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.variant, "cheap");
  });

  it('should return valid for "auto/offline" with offline variant', () => {
    const result = parseAutoPrefix("auto/offline");
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.variant, "offline");
  });

  it('should return valid for "auto/smart" with smart variant', () => {
    const result = parseAutoPrefix("auto/smart");
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.variant, "smart");
  });

  it('should return valid for "auto/lkgp" with lkgp variant', () => {
    const result = parseAutoPrefix("auto/lkgp");
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.variant, "lkgp");
  });

  it('should return invalid for "autocoding" (invalid format)', () => {
    const result = parseAutoPrefix("autocoding");
    assert.strictEqual(result.valid, false);
    assert.match(result.error || "", /Invalid auto prefix format/);
  });

  it('should return invalid for "auto/unknown" (invalid variant)', () => {
    const result = parseAutoPrefix("auto/unknown");
    assert.strictEqual(result.valid, false);
    assert.match(result.error || "", /Invalid auto variant: unknown/);
  });

  it("should return invalid for a non-auto prefixed model", () => {
    const result = parseAutoPrefix("otherModel");
    assert.strictEqual(result.valid, false);
    assert.match(result.error || "", /Not an auto-prefixed model/);
  });

  it("should return invalid for empty string", () => {
    const result = parseAutoPrefix("");
    assert.strictEqual(result.valid, false);
    assert.match(result.error || "", /Not an auto-prefixed model/);
  });

  it("should return invalid for null/undefined input (handled by TS but for robustness)", () => {
    // @ts-ignore testing invalid input that TS normally prevents
    const result = parseAutoPrefix(null);
    assert.strictEqual(result.valid, false);
    assert.match(result.error || "", /Not an auto-prefixed model/);

    // @ts-ignore
    const result2 = parseAutoPrefix(undefined);
    assert.strictEqual(result2.valid, false);
    assert.match(result2.error || "", /Not an auto-prefixed model/);
  });
});
