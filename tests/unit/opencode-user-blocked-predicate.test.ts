import { describe, it } from "node:test";
import assert from "node:assert";
import { isOpencodeUserBlocked } from "../../open-sse/executors/opencodeGeoBlock.ts";

const BLOCKED_BODY = JSON.stringify({
  error: {
    type: "server_error",
    message:
      "Error from provider (Console): Upstream request failed: [user_blocked] egress refused.",
  },
});
const AUTH_BODY = JSON.stringify({ error: { message: "invalid api key", type: "auth_error" } });

describe("isOpencodeUserBlocked", () => {
  it("matches 403 + user_blocked signal", () => {
    assert.strictEqual(isOpencodeUserBlocked(403, BLOCKED_BODY), true);
  });
  it("matches regardless of case", () => {
    assert.strictEqual(isOpencodeUserBlocked(403, "[USER_BLOCKED] restricted"), true);
  });
  it("classifies 451 exactly like 403 (one predicate, no status special case)", () => {
    assert.strictEqual(isOpencodeUserBlocked(451, BLOCKED_BODY), true);
    assert.strictEqual(isOpencodeUserBlocked(451, AUTH_BODY), false);
  });
  it("leaves a geo-blocked body to the geo predicate even with the token present", () => {
    const geo = JSON.stringify({
      error: { type: "RegionError", message: "not available in your country [user_blocked]" },
    });
    assert.strictEqual(isOpencodeUserBlocked(403, geo), false);
    assert.strictEqual(isOpencodeUserBlocked(451, geo), false);
  });
  it("rejects fingerprint 1010 even with the signal present", () => {
    assert.strictEqual(
      isOpencodeUserBlocked(403, `{"error_code":1010,"message":"[user_blocked] restricted"}`),
      false,
      "keyed 1010 = fingerprint, never rotation"
    );
    assert.strictEqual(
      isOpencodeUserBlocked(403, "retry after 1010 seconds, [user_blocked] restricted"),
      true,
      "bare 1010 is not a fingerprint token; signal still matches"
    );
  });
  it("rejects fingerprint tokens even with the signal present", () => {
    assert.strictEqual(
      isOpencodeUserBlocked(403, "[user_blocked] browser_signature_banned"),
      false
    );
    assert.strictEqual(isOpencodeUserBlocked(403, "[user_blocked] fingerprint_rejection"), false);
  });
  it("rejects 403 without the signal", () => {
    assert.strictEqual(isOpencodeUserBlocked(403, AUTH_BODY), false);
  });
  it("rejects non-403 statuses at the rotation predicate", () => {
    for (const status of [200, 400, 401, 429, 500]) {
      assert.strictEqual(isOpencodeUserBlocked(status, BLOCKED_BODY), false);
    }
  });
  it("rejects separator variants without the exact token", () => {
    assert.strictEqual(isOpencodeUserBlocked(403, "user-blocked restricted"), false);
    assert.strictEqual(isOpencodeUserBlocked(403, "user blocked restricted"), false);
  });
  it("rejects empty and null bodies", () => {
    assert.strictEqual(isOpencodeUserBlocked(403, ""), false);
    assert.strictEqual(isOpencodeUserBlocked(403, null), false);
  });
});
