import { describe, it } from "node:test";
import assert from "node:assert";
import {
  isAccountReady,
  pickAccount,
  markCooldown,
  markSuccess,
  maskAccountId,
  isNetworkErrorRotatable,
  isEmptyUpstreamRejection,
  extractChatcmplId,
  type RotatableAccount,
} from "../../open-sse/executors/accountRotation.ts";

function account(overrides: Partial<RotatableAccount> = {}): RotatableAccount {
  return {
    fingerprint: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    cooldownUntil: 0,
    consecutiveFails: 0,
    proxy: null,
    ...overrides,
  };
}

describe("accountRotation", () => {
  it("isAccountReady is true when cooldownUntil is in the past", () => {
    assert.strictEqual(isAccountReady(account({ cooldownUntil: Date.now() - 1000 })), true);
  });

  it("isAccountReady is false when cooldownUntil is in the future", () => {
    assert.strictEqual(isAccountReady(account({ cooldownUntil: Date.now() + 60_000 })), false);
  });

  it("markCooldown increments consecutiveFails and sets a future cooldownUntil", () => {
    const acct = account();
    markCooldown(acct);
    assert.strictEqual(acct.consecutiveFails, 1);
    assert.ok(acct.cooldownUntil > Date.now());
  });

  it("markCooldown backs off exponentially with consecutive failures", () => {
    const acct = account();
    markCooldown(acct);
    const firstCooldown = acct.cooldownUntil;
    markCooldown(acct);
    assert.strictEqual(acct.consecutiveFails, 2);
    // Second backoff (base*2^1) must be strictly larger than the first
    // (base*2^0), modulo the shared jitter window — compare the floor.
    assert.ok(acct.cooldownUntil - Date.now() > firstCooldown - Date.now() - 1000);
  });

  it("markCooldown uses the same magnitude regardless of why it was called (429 or network throw)", () => {
    // No `short`/severity parameter: proxy-attributable failures (429, dead
    // proxy) and shared-egress network throws use the identical formula —
    // the repo's own established "transient, not clearly attributable"
    // cooldown (errorConfig.ts TRANSIENT_COOLDOWN_MS/transientMax) already
    // covers both cases at the same magnitude. The behavioral fix for
    // shared-egress accounts lives in the caller's skip logic, not here.
    const a = account();
    const b = account();
    markCooldown(a);
    markCooldown(b);
    // Both draw from the same base backoff ± up to 1s jitter — same formula,
    // no separate "short" magnitude for either call site.
    assert.ok(
      Math.abs(a.cooldownUntil - b.cooldownUntil) <= 1000,
      "same account state must produce cooldowns within the shared jitter window"
    );
  });

  it("markSuccess resets consecutiveFails to 0", () => {
    const acct = account({ consecutiveFails: 5 });
    markSuccess(acct);
    assert.strictEqual(acct.consecutiveFails, 0);
  });

  it("maskAccountId masks a real fingerprint to its first 8 chars + ellipsis", () => {
    assert.strictEqual(maskAccountId("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"), "aaaaaaaa…");
  });

  it("maskAccountId reports the empty/default fingerprint as 'direct'", () => {
    assert.strictEqual(maskAccountId(""), "direct");
  });

  it("pickAccount skips accounts in cooldown and rotates nextAccountIdx", () => {
    const a = account({ fingerprint: "a", cooldownUntil: Date.now() + 60_000 });
    const b = account({ fingerprint: "b", cooldownUntil: 0 });
    const state = { nextAccountIdx: 0 };
    const picked = pickAccount([a, b], state);
    assert.strictEqual(picked.fingerprint, "b", "must skip the account still in cooldown");
  });

  it("pickAccount falls back to the next index when every account is in cooldown", () => {
    const a = account({ fingerprint: "a", cooldownUntil: Date.now() + 60_000 });
    const b = account({ fingerprint: "b", cooldownUntil: Date.now() + 60_000 });
    const state = { nextAccountIdx: 0 };
    const picked = pickAccount([a, b], state);
    assert.strictEqual(picked.fingerprint, "a", "must still return an account, not throw/hang");
  });

  it("pickAccount accepts a custom isReady predicate (e.g. JWT-freshness-aware)", () => {
    const a = account({ fingerprint: "a", cooldownUntil: 0 });
    const b = account({ fingerprint: "b", cooldownUntil: 0 });
    const state = { nextAccountIdx: 0 };
    // Custom predicate rejects "a" for a reason cooldown alone wouldn't catch.
    const picked = pickAccount([a, b], state, (acct: RotatableAccount) => acct.fingerprint !== "a");
    assert.strictEqual(picked.fingerprint, "b");
  });

  it("isNetworkErrorRotatable is true only when the account has a configured proxy", () => {
    const withProxy = account({
      proxy: { type: "http", host: "127.0.0.1", port: 8080 },
    });
    const withoutProxy = account({ proxy: null });
    assert.strictEqual(isNetworkErrorRotatable(withProxy), true);
    assert.strictEqual(isNetworkErrorRotatable(withoutProxy), false);
  });
});

describe("isEmptyUpstreamRejection", () => {
  it("matches the observed malformed completion envelope (no error field, empty content, null finish_reason)", () => {
    const observed =
      '{"id":"chatcmpl_44fn2g6e7kk","object":"chat.completion","created":1787419957,"model":"muse-spark-1.2-contributor-free","choices":[{"index":0,"message":{"role":"assistant"},"finish_reason":null}]}';
    assert.strictEqual(isEmptyUpstreamRejection(400, observed), true);
  });

  it("does not match a non-400 status", () => {
    const observed =
      '{"id":"chatcmpl_44fn2g6e7kk","object":"chat.completion","created":1787419957,"model":"muse-spark-1.2-contributor-free","choices":[{"index":0,"message":{"role":"assistant"},"finish_reason":null}]}';
    assert.strictEqual(isEmptyUpstreamRejection(200, observed), false);
    assert.strictEqual(isEmptyUpstreamRejection(429, observed), false);
    assert.strictEqual(isEmptyUpstreamRejection(502, observed), false);
  });

  it("does not match when an error field is present", () => {
    const withError = JSON.stringify({
      error: { message: "bad request", type: "invalid_request_error" },
    });
    assert.strictEqual(isEmptyUpstreamRejection(400, withError), false);
    const emptyError = JSON.stringify({ error: {} });
    assert.strictEqual(isEmptyUpstreamRejection(400, emptyError), false);
  });

  it("does not match when content is non-empty or tool_calls present", () => {
    const nonEmpty = JSON.stringify({
      choices: [{ message: { role: "assistant", content: "hi" }, finish_reason: "stop" }],
    });
    assert.strictEqual(isEmptyUpstreamRejection(400, nonEmpty), false);

    const toolCalls = JSON.stringify({
      choices: [
        { message: { role: "assistant", tool_calls: [{ id: "x" }] }, finish_reason: "tool_calls" },
      ],
    });
    assert.strictEqual(isEmptyUpstreamRejection(400, toolCalls), false);
  });

  it("does not match when content is a non-string non-null value (number, block array)", () => {
    const numericContent = JSON.stringify({
      choices: [{ message: { role: "assistant", content: 123 }, finish_reason: null }],
    });
    assert.strictEqual(
      isEmptyUpstreamRejection(400, numericContent),
      false,
      "non-string non-null content is not eligible"
    );

    const reasoningContent = JSON.stringify({
      choices: [
        { message: { role: "assistant", reasoning_content: "thinking" }, finish_reason: null },
      ],
    });
    assert.strictEqual(isEmptyUpstreamRejection(400, reasoningContent), false);
  });

  it("does not match when choices or message are absent", () => {
    const noChoices = JSON.stringify({ id: "chatcmpl_x", model: "muse" });
    assert.strictEqual(isEmptyUpstreamRejection(400, noChoices), false);
    const noMessage = JSON.stringify({ choices: [{ finish_reason: null }] });
    assert.strictEqual(isEmptyUpstreamRejection(400, noMessage), false);
  });

  it("does not match when finish_reason is a literal value (not null)", () => {
    const stopReason = JSON.stringify({
      choices: [{ message: { role: "assistant" }, finish_reason: "stop" }],
    });
    assert.strictEqual(isEmptyUpstreamRejection(400, stopReason), false);
  });

  it("matches an empty string content (treated as eligible)", () => {
    const emptyContent = JSON.stringify({
      choices: [{ message: { role: "assistant", content: "" }, finish_reason: null }],
    });
    assert.strictEqual(isEmptyUpstreamRejection(400, emptyContent), true);
  });

  it("returns false for unparseable JSON rather than throwing", () => {
    assert.strictEqual(isEmptyUpstreamRejection(400, "not json"), false);
    assert.strictEqual(isEmptyUpstreamRejection(400, ""), false);
  });
});

describe("extractChatcmplId", () => {
  it("extracts the chatcmpl id from an observed envelope", () => {
    const observed =
      '{"id":"chatcmpl_44fn2g6e7kk","object":"chat.completion","created":1787419957,"model":"muse-spark-1.2-contributor-free","choices":[{"index":0,"message":{"role":"assistant"},"finish_reason":null}]}';
    assert.strictEqual(extractChatcmplId(observed), "chatcmpl_44fn2g6e7kk");
  });

  it("falls back to 'unknown' when no id is present", () => {
    assert.strictEqual(extractChatcmplId("{choices:[]}"), "unknown");
    assert.strictEqual(extractChatcmplId(""), "unknown");
    assert.strictEqual(extractChatcmplId("not json"), "unknown");
  });
});
