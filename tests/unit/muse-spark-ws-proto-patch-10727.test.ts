import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import {
  buildWsPromptFrame,
  parseProtoFields,
  META_WS_HOME_TEMPLATE_B64,
  __setMuseSparkBrowserPoolForTesting,
  __resetMuseSparkTokenCacheForTesting,
  __fetchFreshAccessTokenForTesting,
} from "../../open-sse/executors/muse-spark-web.ts";

// #10727 regression guards for the two parts of the fix that have zero
// browser/network dependency: the nested-proto convId patch (pure byte
// transform) and the fresh-token fetcher's cache + fallback behavior
// (browserPool seams mocked).

function payloadFromFrame(frame: Uint8Array): Buffer {
  const buf = Buffer.from(frame);
  assert.equal(buf[0], 0x0d, "prompt frame type byte");
  const len = buf[3] | (buf[4] << 8) | (buf[5] << 16);
  const msgBody = buf.subarray(6, 6 + len);
  assert.equal(msgBody[1], 0x80, "prompt frame flag byte");
  const outer = JSON.parse(msgBody.subarray(2).toString("utf-8"));
  assert.ok(typeof outer.payload === "string", "payload is base64 string");
  return Buffer.from(outer.payload as string, "base64");
}

// Walk [1,1,5] → field 5 → field 1 and return the innermost UUID. Asserting
// each hop exists (and wraps exactly one field) is what catches the old bug:
// the pre-fix code overwrote [1,1,5]'s whole value with a bare UUID string,
// collapsing the double envelope the gateway validates.
function convIdEnvelopeFromProto(payload: Buffer): { uuid: string; envelopeLen: number } {
  const f1 = parseProtoFields(payload).find((f) => f.number === 1 && f.wireType === 2);
  assert.ok(f1, "field 1 present");
  const f1_1 = parseProtoFields(f1.value as Uint8Array).find((f) => f.number === 1 && f.wireType === 2);
  assert.ok(f1_1, "field [1,1] present");
  const f1_1_5 = parseProtoFields(f1_1.value as Uint8Array).find((f) => f.number === 5 && f.wireType === 2);
  assert.ok(f1_1_5, "field [1,1,5] envelope present");
  const inner = parseProtoFields(f1_1_5.value as Uint8Array);
  assert.equal(inner.length, 1, "[1,1,5] wraps exactly one field");
  assert.equal(inner[0].number, 5, "[1,1,5] wraps a field-5 envelope, not a bare string");
  const leaf = parseProtoFields(inner[0].value as Uint8Array).find((f) => f.number === 1 && f.wireType === 2);
  assert.ok(leaf, "nested field 1 (the UUID) present");
  return {
    uuid: Buffer.from(leaf.value as Uint8Array).toString("utf-8"),
    envelopeLen: (f1_1_5.value as Uint8Array).length,
  };
}

const opts = {
  requestId: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  userMessageId: "bbbbbbbb-cccc-dddd-eeee-ffffffffffff",
  submittedMs: 1788601482026,
  uniqueMessageId: 17886014820261234,
};

test("#10727: convId patch preserves the [1,1,5] double envelope", () => {
  const convId = "11111111-2222-3333-4444-555555555555";
  const frame = buildWsPromptFrame("hello", convId, { templateB64: META_WS_HOME_TEMPLATE_B64, ...opts });
  const payload = payloadFromFrame(frame);

  const { uuid, envelopeLen } = convIdEnvelopeFromProto(payload);
  assert.equal(uuid, convId);
  // The envelope [1,1,5] wraps {5:{1:uuid}} = 2 (outer tag+len) + 2 + 36 = 40
  // bytes. The pre-fix code replaced this with the bare 36-byte UUID,
  // collapsing the envelope (gateway then answered 0x0e).
  assert.equal(envelopeLen, 40, "[1,1,5] envelope must still wrap {5:{1:uuid}}");
});

test("#10727: patching a same-length convId leaves total size unchanged except for the other fields", () => {
  // Isolate the convId patch: feed the template's own UUID back through the
  // patch path. Every other patch uses the same template values (prompt text
  // differs from "Hi" is fine to measure — here we only vary convId).
  const sameUuid = "5b1398ba-d7fb-4f73-b916-cba31880c85f";
  const frame = buildWsPromptFrame("Hi", sameUuid, {
    templateB64: META_WS_HOME_TEMPLATE_B64,
    ...opts,
    uniqueMessageId: 7501938350245880000,
    submittedMs: 1788601482026,
  });
  const payload = payloadFromFrame(frame);
  const templateBytes = Buffer.from(META_WS_HOME_TEMPLATE_B64, "base64");
  const { uuid } = convIdEnvelopeFromProto(payload);
  assert.equal(uuid, sameUuid);
  assert.equal(
    payload.length,
    templateBytes.length,
    "round-tripping the template's own values must be byte-length-identical"
  );
});

test("#10727: prompt/requestId patches land without touching sibling structure", () => {
  const convId = "99999999-8888-7777-6666-555555555555";
  const requestId = "12121212-3434-5656-7878-9a9a9a9a9a9a";
  const frame = buildWsPromptFrame("prompt-text-here", convId, {
    templateB64: META_WS_HOME_TEMPLATE_B64,
    ...opts,
    requestId,
  });
  const payload = payloadFromFrame(frame);

  assert.equal(convIdEnvelopeFromProto(payload).uuid, convId);
  const asText = payload.toString("utf-8");
  assert.ok(asText.includes("KADABRA__HOME__UNIFIED_INPUT_BAR"), "template marker intact");
  assert.ok(asText.includes("mode_thinking"), "mode_thinking field intact");
  assert.ok(asText.includes("prompt-text-here"), "prompt text patched");
  assert.ok(asText.includes(requestId), "requestId patched into the proto");
});

// ─── Token fetcher cache + fallback (browserPool seams mocked) ────────────────

const PAGE_WITH_TOKEN =
  'x"accessToken\":\"ecto1:TESTTOKENabc123\""y';

function mockPage(html: string) {
  return {
    goto: async () => {},
    content: async () => html,
    close: async () => {},
  };
}

test("#10727: token fetcher extracts accessToken via browserPool and caches it per cookie", async () => {
  __resetMuseSparkTokenCacheForTesting();
  let acquireCalls = 0;
  __setMuseSparkBrowserPoolForTesting({
    acquire: async () => {
      acquireCalls++;
      return { id: "mock", context: null, warmupPage: null, lastUsed: 0, isStealth: false } as never;
    },
    openPage: async () => mockPage(PAGE_WITH_TOKEN) as never,
  });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });
  try {
    const cookie = "ecto_1_sess=abc; datr=xyz";
    const first = await __fetchFreshAccessTokenForTesting(cookie);
    assert.equal(first.ok, true, `first fetch must succeed, got: ${!first.ok && first.error}`);
    if (first.ok) assert.equal(first.token, "ecto1:TESTTOKENabc123");
    assert.equal(acquireCalls, 1, "first call launches the browser path once");

    const second = await __fetchFreshAccessTokenForTesting(cookie);
    assert.equal(second.ok, true);
    assert.equal(acquireCalls, 1, "second call must hit the cache, not the browser");
  } finally {
    globalThis.fetch = originalFetch;
    __setMuseSparkBrowserPoolForTesting(undefined);
    __resetMuseSparkTokenCacheForTesting();
  }
});

test("#10727: token fetcher reports failure when the page has no accessToken", async () => {
  __resetMuseSparkTokenCacheForTesting();
  __setMuseSparkBrowserPoolForTesting({
    acquire: async () => ({ id: "mock", context: null, warmupPage: null, lastUsed: 0, isStealth: false } as never),
    openPage: async () => mockPage("<html>js challenge, no token here</html>") as never,
  });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });
  try {
    const result = await __fetchFreshAccessTokenForTesting("ecto_1_sess=abc");
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.error, /accessToken not found/);
      // Hard Rule #12: no stack trace leaked into the error string.
      assert.ok(!result.error.includes("at "), "error must be sanitized");
    }
  } finally {
    globalThis.fetch = originalFetch;
    __setMuseSparkBrowserPoolForTesting(undefined);
    __resetMuseSparkTokenCacheForTesting();
  }
});
