import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import {
  buildWsPromptFrame,
  parseProtoFields,
  META_WS_HOME_TEMPLATE_B64,
  META_WS_CHAT_TEMPLATE_B64,
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
  const f1_1 = parseProtoFields(f1.value as Uint8Array).find(
    (f) => f.number === 1 && f.wireType === 2
  );
  assert.ok(f1_1, "field [1,1] present");
  const f1_1_5 = parseProtoFields(f1_1.value as Uint8Array).find(
    (f) => f.number === 5 && f.wireType === 2
  );
  assert.ok(f1_1_5, "field [1,1,5] envelope present");
  const inner = parseProtoFields(f1_1_5.value as Uint8Array);
  assert.equal(inner.length, 1, "[1,1,5] wraps exactly one field");
  assert.equal(inner[0].number, 5, "[1,1,5] wraps a field-5 envelope, not a bare string");
  const leaf = parseProtoFields(inner[0].value as Uint8Array).find(
    (f) => f.number === 1 && f.wireType === 2
  );
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
  const frame = buildWsPromptFrame("hello", convId, {
    templateB64: META_WS_HOME_TEMPLATE_B64,
    ...opts,
  });
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

// ─── Round-trip against the captured templates (independent oracle) ───────────
//
// The templates are the browser captures the PR documents. buildWsPromptFrame()
// must change ONLY the leaves it is meant to patch and leave every sibling, every
// envelope and every untouched varint exactly as captured. The oracle below is a
// separate, BigInt-exact protobuf walker (the production parser decodes varints
// through 32-bit shifts, so it cannot be its own reference).

type Leaf = string;

function readVarintBig(buf: Buffer, at: number): { value: bigint; next: number } | null {
  let value = 0n;
  let shift = 0n;
  let i = at;
  while (i < buf.length) {
    const b = buf[i++];
    value |= BigInt(b & 0x7f) << shift;
    if (!(b & 0x80)) return { value, next: i };
    shift += 7n;
    if (shift > 63n) return null;
  }
  return null;
}

/** Strict message walk; returns null when `buf` is not a well-formed message. */
function flattenMessage(buf: Buffer, prefix: string, out: Map<string, Leaf[]>): boolean {
  const staged = new Map<string, Leaf[]>();
  let at = 0;
  while (at < buf.length) {
    const tag = readVarintBig(buf, at);
    if (!tag) return false;
    at = tag.next;
    const num = Number(tag.value >> 3n);
    const wt = Number(tag.value & 7n);
    if (num === 0) return false;
    const path = prefix ? `${prefix}.${num}` : String(num);
    const push = (leaf: Leaf) => staged.set(path, [...(staged.get(path) ?? []), leaf]);
    if (wt === 0) {
      const v = readVarintBig(buf, at);
      if (!v) return false;
      at = v.next;
      push(`v:${v.value}`);
    } else if (wt === 5) {
      if (at + 4 > buf.length) return false;
      push(`f32:${buf.readUInt32LE(at)}`);
      at += 4;
    } else if (wt === 1) {
      if (at + 8 > buf.length) return false;
      push(`f64:${buf.readBigUInt64LE(at)}`);
      at += 8;
    } else if (wt === 2) {
      const len = readVarintBig(buf, at);
      if (!len) return false;
      at = len.next;
      const end = at + Number(len.value);
      if (end > buf.length) return false;
      const body = buf.subarray(at, end);
      at = end;
      const text = body.toString("utf-8");
      if (body.length > 0 && /^[\x20-\x7e]+$/.test(text)) {
        push(`s:${text}`);
      } else if (body.length === 0) {
        push("empty");
      } else {
        const nested = new Map<string, Leaf[]>();
        if (flattenMessage(body, path, nested)) {
          push("msg");
          for (const [k, v] of nested) staged.set(k, [...(staged.get(k) ?? []), ...v]);
        } else {
          push(`hex:${body.toString("hex")}`);
        }
      }
    } else {
      return false;
    }
  }
  for (const [k, v] of staged) out.set(k, [...(out.get(k) ?? []), ...v]);
  return at === buf.length;
}

function flatten(buf: Buffer): Map<string, Leaf[]> {
  const out = new Map<string, Leaf[]>();
  assert.ok(flattenMessage(buf, "", out), "oracle must parse the whole buffer");
  return out;
}

function diffPaths(a: Map<string, Leaf[]>, b: Map<string, Leaf[]>): string[] {
  const keys = new Set([...a.keys(), ...b.keys()]);
  return [...keys].filter((k) => JSON.stringify(a.get(k)) !== JSON.stringify(b.get(k))).sort();
}

const TIMESTAMP_PATHS = ["1.5.1", "1.5.3", "2.1.2.2", "2.1.2.3"];
const CONV_ID_PATHS = ["1.1.5.5.1", "1.10.4", "2.1.2.1"];

for (const [name, templateB64] of [
  ["HOME", META_WS_HOME_TEMPLATE_B64],
  ["CHAT", META_WS_CHAT_TEMPLATE_B64],
] as const) {
  test(`#10727: ${name} template — patching with the template's own values changes only the two derived timestamps`, () => {
    const template = Buffer.from(templateB64, "base64");
    const t = flatten(template);
    const str = (path: string) => String(t.get(path)?.[0]).replace(/^s:/, "");
    const big = (path: string) => BigInt(String(t.get(path)?.[0]).replace(/^v:/, ""));

    const frame = buildWsPromptFrame(str("2.2"), str("1.1.5.5.1"), {
      templateB64,
      requestId: str("1.6"),
      userMessageId: str("2.1.1"),
      submittedMs: Number(big("2.1.2.2")),
      // The captured 2.1.2.3 is > 2^53; a JS number cannot carry it, so it is
      // allowed to move below (the builder takes `uniqueMessageId: number`).
      uniqueMessageId: Number(big("2.1.2.3")),
    });
    const payload = payloadFromFrame(frame);

    assert.equal(payload.length, template.length, "round-trip keeps the byte length");
    // Every id, the prompt, both envelopes and every untouched varint come back
    // exactly as captured. The only values the builder rewrites that the capture
    // does not already hold are the two timestamps it derives from submittedMs
    // (1.5.1 = ts+1, 1.5.3 = ts; the capture has ts-1 / ts+61) and the >2^53
    // unique message id (2.1.2.3) that a JS number cannot round-trip.
    assert.deepEqual(diffPaths(flatten(payload), t), ["1.5.1", "1.5.3", "2.1.2.3"]);
  });

  test(`#10727: ${name} template — fresh ids land on exactly the intended paths`, () => {
    const t = flatten(Buffer.from(templateB64, "base64"));
    const convId = "11111111-2222-3333-4444-555555555555";
    const requestId = "12121212-3434-5656-7878-9a9a9a9a9a9a";
    const userMessageId = "bbbbbbbb-cccc-dddd-eeee-ffffffffffff";
    const submittedMs = 1790000000123;
    const uniqueMessageId = 7900000001230;

    const frame = buildWsPromptFrame("a brand new prompt", convId, {
      templateB64,
      requestId,
      userMessageId,
      submittedMs,
      uniqueMessageId,
    });
    const payload = flatten(payloadFromFrame(frame));

    const changed = diffPaths(payload, t);
    assert.deepEqual(
      changed,
      [...CONV_ID_PATHS, "1.6", "2.1.1", "2.2", ...TIMESTAMP_PATHS].sort(),
      "nothing outside the documented patch points may change"
    );
    for (const p of CONV_ID_PATHS) assert.deepEqual(payload.get(p), [`s:${convId}`], p);
    assert.deepEqual(payload.get("1.6"), [`s:${requestId}`]);
    assert.deepEqual(payload.get("2.1.1"), [`s:${userMessageId}`]);
    assert.deepEqual(payload.get("2.2"), ["s:a brand new prompt"]);
    assert.deepEqual(payload.get("2.1.2.2"), [`v:${submittedMs}`]);
    assert.deepEqual(payload.get("2.1.2.3"), [`v:${uniqueMessageId}`]);
    assert.deepEqual(payload.get("1.5.1"), [`v:${submittedMs + 1}`]);
    assert.deepEqual(payload.get("1.5.3"), [`v:${submittedMs}`]);
    // The #10727 envelope: [1,1,5] is a message wrapping a message wrapping the uuid.
    assert.deepEqual(payload.get("1.1.5"), ["msg"]);
    assert.deepEqual(payload.get("1.1.5.5"), ["msg"]);
  });
}

// ─── Token fetcher cache + fallback (browserPool seams mocked) ────────────────

const PAGE_WITH_TOKEN = 'x"accessToken\":\"ecto1:TESTTOKENabc123\""y';

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
      return {
        id: "mock",
        context: null,
        warmupPage: null,
        lastUsed: 0,
        isStealth: false,
      } as never;
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
    acquire: async () =>
      ({ id: "mock", context: null, warmupPage: null, lastUsed: 0, isStealth: false }) as never,
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
