import test from "node:test";
import assert from "node:assert/strict";

const { stableAccountSuffix, fmtCompact, fmtFull, truncateUrl } =
  await import("../../src/shared/utils/formatting.ts");

test("stableAccountSuffix returns deterministic account identifiers", () => {
  assert.equal(stableAccountSuffix(null), "0000");
  assert.equal(stableAccountSuffix("-"), "0000");
  assert.equal(stableAccountSuffix("alice@example.com"), stableAccountSuffix("alice@example.com"));
  assert.match(stableAccountSuffix("alice@example.com"), /^[0-9a-f]{4}$/);
  assert.notEqual(stableAccountSuffix("alice@example.com"), stableAccountSuffix("bob@example.com"));
});

test("fmtCompact formats large values and falls back to locale numbers", () => {
  assert.equal(fmtCompact(1_234), "1.2K");
  assert.equal(fmtCompact(1_234_567), "1.2M");
  assert.equal(fmtCompact(1_234_567_890), "1.2B");
  assert.equal(fmtCompact(0), fmtFull(0));
  assert.equal(fmtCompact(null), fmtFull(null));
});

test("fmtFull formats numbers and nullish values", () => {
  assert.equal(fmtFull(1_234_567), "1,234,567");
  assert.equal(fmtFull(undefined), "0");
  assert.equal(fmtFull(null), "0");
});

test("truncateUrl displays host and path within the requested limit", () => {
  assert.equal(truncateUrl(null), "-");
  assert.equal(truncateUrl("https://example.com/api/models"), "example.com/api/models");
  assert.equal(truncateUrl("https://example.com/very/long/path", 15), "example.com/ver…");
  assert.equal(truncateUrl("not a url", 5), "not a…");
});
