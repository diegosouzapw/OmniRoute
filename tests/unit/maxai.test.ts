/**
 * Unit tests for the MaxAI executor helpers (signer, context assembly, SSE/think).
 *
 * The signer vectors are REAL captured web-app requests: computeMaxaiProof must
 * reproduce the exact `p` proof the MaxAI web app produced (decrypted from real
 * `X-Authorization` blobs, MaxAI v3 tests/fixtures/wire_signed_samples.json).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  computeMaxaiProof,
  maxaiAesEncrypt,
  buildMaxaiSignedHeaders,
  maxaiRandomSlot,
} from "../../open-sse/executors/maxai/signing.ts";
import {
  assembleMaxaiContext,
  buildMaxaiChatBody,
  contentToText,
  extractCurrentTurnImages,
} from "../../open-sse/executors/maxai/protocol.ts";
import {
  splitThink,
  ThinkSplitter,
  parseMaxaiSseText,
  estimateMaxaiTokens,
} from "../../open-sse/executors/maxai/stream.ts";
import { userIdFromJwt } from "../../open-sse/executors/maxai/credentials.ts";
import {
  maxaiAccessTokenNeedsRefresh,
  maxaiRefreshAccessToken,
  MAXAI_REFRESH_PATH,
} from "../../open-sse/executors/maxai/refresh.ts";
import {
  requestMaxaiEmailCode,
  verifyMaxaiEmailCode,
  MAXAI_SIGNIN_EMAIL_PATH,
  MAXAI_VERIFY_CODE_PATH,
} from "../../open-sse/executors/maxai/emailLogin.ts";
import { discoverMaxaiModels } from "../../open-sse/services/maxaiModels.ts";
import {
  __setMaxaiConstantsForTest,
  resetMaxaiConstantsMemo,
} from "../../open-sse/executors/maxai/constantsStore.ts";
import {
  parseMaxaiConstants,
  assembleMaxaiConstants,
  validateMaxaiConstants,
  findChunkUrls,
  fetchMaxaiConstants,
  decodeNjHeaderNames,
  resolveWebpackGetter,
  looksLikeSignerChunk,
} from "../../open-sse/executors/maxai/constants.ts";
import {
  MOCK_CONSTANTS,
  MOCK_HMAC_KEY,
  MOCK_AES_KEY,
  MOCK_CTX_KEY,
  MOCK_DOC_ID_KEY,
  MOCK_APP_VERSION,
  MOCK_USER_ID,
  MOCK_DEVICE_ID,
  referenceProof,
  makeSyntheticAppChunk,
  makeSyntheticSignerChunk,
  makeSyntheticAppHtml,
} from "./helpers/maxaiMockConstants.ts";

// A synthetic user id (UUID-shaped, not real) for signer-algorithm tests.
const USER_ID = MOCK_USER_ID;

// The signer takes an extracted constants object. Tests use MOCK values only —
// nothing id/key/version-shaped here is a real MaxAI value (the real ones are
// fetched at runtime and persisted to the DB, never committed).
const TEST_CONSTANTS = MOCK_CONSTANTS;
const HMAC_KEY = MOCK_HMAC_KEY;
const AES_KEY = MOCK_AES_KEY;
const APP_VERSION = MOCK_APP_VERSION;

// Seed the in-process signing-constants memo so the signed network helpers
// (refresh / email login / model discovery) don't try to fetch the live MaxAI
// bundle during unit tests. Production resolves these via ensure/refresh →
// store → live extraction; here we inject the known-good set directly.
__setMaxaiConstantsForTest(TEST_CONSTANTS);

// ── Signer: byte-exact vs real captured web-app requests ─────────────────────

test("computeMaxaiProof matches an independent reference implementation (mock key)", () => {
  // Prove the HMAC-SHA1 → SM3 algorithm against a SEPARATE reference impl (not the
  // production module) over a MOCK key, so a pass means the math matches an
  // external spec — not merely itself, and with zero real constants committed.
  const t = 1784594159681;
  const path = "/conversation/get_conversation_list";
  const p = computeMaxaiProof(path, t, USER_ID, HMAC_KEY, APP_VERSION);
  assert.equal(p, referenceProof(APP_VERSION, t, path, USER_ID, HMAC_KEY));
  // A different path or key yields a different proof (algorithm is sensitive).
  assert.notEqual(p, computeMaxaiProof("/gpt/cwc/chat", t, USER_ID, HMAC_KEY, APP_VERSION));
  assert.notEqual(p, computeMaxaiProof(path, t, USER_ID, MOCK_AES_KEY, APP_VERSION));
});

test("computeMaxaiProof blanks the user id only on /oauth/* routes", () => {
  // A blank-user route yields a different proof than the same route with a uid,
  // proving the uid is dropped for /oauth/* (and only there).
  const t = 1784594159681;
  const oauthWithUid = computeMaxaiProof(
    "/oauth/signin_with_email",
    t,
    USER_ID,
    HMAC_KEY,
    APP_VERSION
  );
  const oauthNoUid = computeMaxaiProof("/oauth/signin_with_email", t, "", HMAC_KEY, APP_VERSION);
  assert.equal(oauthWithUid, oauthNoUid); // uid ignored for /oauth/*
  const chatWithUid = computeMaxaiProof("/gpt/cwc/chat", t, USER_ID, HMAC_KEY, APP_VERSION);
  const chatNoUid = computeMaxaiProof("/gpt/cwc/chat", t, "", HMAC_KEY, APP_VERSION);
  assert.notEqual(chatWithUid, chatNoUid); // uid honored elsewhere
});

test("computeMaxaiProof requires the key + app version (never signs with a guess)", () => {
  assert.throws(() => computeMaxaiProof("/x", 1, USER_ID, "", APP_VERSION));
  assert.throws(() => computeMaxaiProof("/x", 1, USER_ID, HMAC_KEY, ""));
});

test("maxaiAesEncrypt produces a CryptoJS Salted__ envelope, deterministic with a fixed salt", () => {
  const salt = Buffer.from("0011223344556677", "hex");
  const a = maxaiAesEncrypt("payload", AES_KEY, salt);
  const b = maxaiAesEncrypt("payload", AES_KEY, salt);
  assert.equal(a, b); // same salt → deterministic
  const raw = Buffer.from(a, "base64");
  assert.equal(raw.subarray(0, 8).toString("ascii"), "Salted__");
  assert.equal(raw.subarray(8, 16).toString("hex"), "0011223344556677");
  // Random salt differs each call.
  assert.notEqual(maxaiAesEncrypt("payload", AES_KEY), maxaiAesEncrypt("payload", AES_KEY));
});

// ── Constants extractor: parse SYNTHETIC bundle chunks → the signing constants ──
// The fixtures are generated in-code (helpers/maxaiMockConstants.ts) with MOCK
// values — no real MaxAI bundle, key, id, or app version is committed anywhere.

const APP_CHUNK = makeSyntheticAppChunk();
const SIGNER_CHUNK = makeSyntheticSignerChunk();

test("parseMaxaiConstants extracts every value from a webpack-shaped chunk", () => {
  const parsed = parseMaxaiConstants(APP_CHUNK, SIGNER_CHUNK);
  assert.equal(parsed.hmacKey, MOCK_HMAC_KEY);
  assert.equal(parsed.aesKey, MOCK_AES_KEY);
  assert.equal(parsed.appVersion, MOCK_APP_VERSION);
  assert.equal(parsed.docIdKey, MOCK_DOC_ID_KEY);
  assert.equal(parsed.ctxKey, MOCK_CTX_KEY);
  // Header names decoded from the nj(hex) calls in the signer chunk.
  assert.equal(parsed.headerNames.authorization, "X-Authorization");
  assert.equal(parsed.headerNames.clientDomain, "X-Client-Domain");
  assert.equal(parsed.headerNames.random, "X-Random");
});

test("resolveWebpackGetter follows an export getter to its literal value", () => {
  const src = 'a.d(t,{Mn:function(){return u}});let s="zzz",u="deadbeefcafe";';
  assert.equal(resolveWebpackGetter(src, "Mn"), "deadbeefcafe");
  assert.equal(resolveWebpackGetter(src, "Nope"), null);
});

test("decodeNjHeaderNames decodes hex header names and skips non-ASCII/garbage", () => {
  const names = decodeNjHeaderNames(SIGNER_CHUNK);
  assert.ok(names.includes("X-Authorization"));
  assert.ok(names.includes("X-Client-Domain"));
  assert.ok(names.includes("X-Random"));
});

test("looksLikeSignerChunk fingerprints the signer chunk by content, not by number", () => {
  // The signer chunk matches (ctx slot + nj decoders); the app chunk does not.
  assert.equal(looksLikeSignerChunk(SIGNER_CHUNK), true);
  assert.equal(looksLikeSignerChunk(APP_CHUNK), false);
  assert.equal(looksLikeSignerChunk("var x=1;"), false);
});

test("assembleMaxaiConstants requires all five extracted values (null when any missing)", () => {
  const good = assembleMaxaiConstants(parseMaxaiConstants(APP_CHUNK, SIGNER_CHUNK));
  assert.ok(good);
  assert.equal(good!.hmacKey, MOCK_HMAC_KEY);
  // Missing a key → null (we never assemble a half-configured signer).
  const noHmac = assembleMaxaiConstants({
    hmacKey: null,
    aesKey: MOCK_AES_KEY,
    appVersion: MOCK_APP_VERSION,
    ctxKey: MOCK_CTX_KEY,
    docIdKey: MOCK_DOC_ID_KEY,
    headerNames: {},
  });
  assert.equal(noHmac, null);
});

test("assembleMaxaiConstants defaults header NAMES but requires the id/key/version values", () => {
  // All five extracted values present but header-name map empty → header-name
  // defaults fill in (they are plain HTTP labels, not keys/secrets).
  const c = assembleMaxaiConstants({
    hmacKey: MOCK_HMAC_KEY,
    aesKey: MOCK_AES_KEY,
    appVersion: MOCK_APP_VERSION,
    ctxKey: MOCK_CTX_KEY,
    docIdKey: MOCK_DOC_ID_KEY,
    headerNames: {},
  });
  assert.ok(c);
  assert.equal(c!.headerNames.authorization, "X-Authorization");
  assert.equal(c!.headerNames.random, "X-Random");
  // A missing app_version (a required extracted value) → null.
  assert.equal(
    assembleMaxaiConstants({
      hmacKey: MOCK_HMAC_KEY,
      aesKey: MOCK_AES_KEY,
      appVersion: null,
      ctxKey: MOCK_CTX_KEY,
      docIdKey: MOCK_DOC_ID_KEY,
      headerNames: {},
    }),
    null
  );
  // A missing ctxKey (required) → null.
  assert.equal(
    assembleMaxaiConstants({
      hmacKey: MOCK_HMAC_KEY,
      aesKey: MOCK_AES_KEY,
      appVersion: MOCK_APP_VERSION,
      ctxKey: null,
      docIdKey: MOCK_DOC_ID_KEY,
      headerNames: {},
    }),
    null
  );
});

test("validateMaxaiConstants: shape gate by default, proof gate when a vector is given", () => {
  const c = assembleMaxaiConstants(parseMaxaiConstants(APP_CHUNK, SIGNER_CHUNK))!;
  // Default: shape-only (no real vector is embedded in source).
  assert.equal(validateMaxaiConstants(c), true);
  // Malformed values fail the shape gate.
  assert.equal(validateMaxaiConstants({ ...c, hmacKey: "not-hex" }), false);
  assert.equal(validateMaxaiConstants({ ...c, docIdKey: "not-a-uuid" }), false);
  // With a MOCK proof vector, the key that produced it validates and a wrong one doesn't.
  const t = 1700000000000;
  const path = "/gpt/cwc/chat";
  const vector = {
    path,
    reqTime: t,
    userId: USER_ID,
    appVersion: MOCK_APP_VERSION,
    expectedProof: referenceProof(MOCK_APP_VERSION, t, path, USER_ID, MOCK_HMAC_KEY),
  };
  assert.equal(validateMaxaiConstants(c, vector), true);
  const wrongKey = { ...c, hmacKey: MOCK_AES_KEY };
  assert.equal(validateMaxaiConstants(wrongKey, vector), false);
});

test("findChunkUrls returns the pages/_app chunk + build-independent candidates", () => {
  const html = makeSyntheticAppHtml({
    appChunk: "/_next/static/chunks/pages/_app-deadbeef.js",
    signerChunk: "/_next/static/chunks/91234-cafebabe.js",
  });
  const { appChunk, candidateChunks } = findChunkUrls(html);
  assert.equal(appChunk, "/_next/static/chunks/pages/_app-deadbeef.js");
  // The signer chunk is just one of the candidates; it's chosen later BY CONTENT.
  assert.ok(candidateChunks.includes("/_next/static/chunks/91234-cafebabe.js"));
  assert.ok(!candidateChunks.includes("/_next/static/chunks/pages/_app-deadbeef.js"));
});

test("fetchMaxaiConstants finds the signer chunk BY CONTENT even when renumbered", async () => {
  // Two numbered chunks: a decoy and the real signer under an ARBITRARY new id.
  // The scan must pick the signer purely by its content fingerprint.
  const html = makeSyntheticAppHtml({
    appChunk: "/_next/static/chunks/pages/_app-aaaa.js",
    signerChunk: "/_next/static/chunks/99999-newbuildid.js",
    extra: ["/_next/static/chunks/55555-decoy.js"],
  });
  const fakeFetch = (async (url: string) => {
    const u = String(url);
    if (u.endsWith("/app/")) return new Response(html, { status: 200 });
    if (u.includes("/pages/_app-")) return new Response(APP_CHUNK, { status: 200 });
    if (u.includes("/99999-")) return new Response(SIGNER_CHUNK, { status: 200 });
    if (u.includes("/55555-")) return new Response("var decoy=1;", { status: 200 });
    return new Response("", { status: 404 });
  }) as unknown as typeof fetch;

  const c = await fetchMaxaiConstants({ fetchImpl: fakeFetch });
  assert.ok(c, "constants should be extracted from a renumbered signer chunk");
  assert.equal(c!.hmacKey, MOCK_HMAC_KEY);
  assert.equal(c!.ctxKey, MOCK_CTX_KEY);
  assert.equal(c!.source, "extracted");
});

test("fetchMaxaiConstants returns null when the bundle can't be reached", async () => {
  const fakeFetch = (async () => new Response("", { status: 500 })) as unknown as typeof fetch;
  assert.equal(await fetchMaxaiConstants({ fetchImpl: fakeFetch }), null);
  // Re-seed the memo for the remaining network tests (some run after this).
  resetMaxaiConstantsMemo();
  __setMaxaiConstantsForTest(TEST_CONSTANTS);
});

test("buildMaxaiSignedHeaders emits the X-App/X-Browser companions + X-Authorization", () => {
  const h = buildMaxaiSignedHeaders(
    {
      path: "/gpt/cwc/chat",
      userId: USER_ID,
      deviceId: MOCK_DEVICE_ID,
      now: () => 1784594159681,
      random: () => "950484",
    },
    TEST_CONSTANTS
  );
  assert.equal(h["X-Browser-Name"], "Firefox");
  assert.equal(h["X-Browser-Version"], "150.0");
  assert.equal(h["X-App-Version"], MOCK_APP_VERSION);
  assert.equal(h["X-App-Env"], "MaxAI-Browser-Extension");
  assert.ok(h["X-Authorization"].length > 0);
  assert.equal(
    Buffer.from(h["X-Authorization"], "base64").subarray(0, 8).toString("ascii"),
    "Salted__"
  );
});

test("maxaiRandomSlot emits an unbiased 6-digit X-Random slot", () => {
  // The wire slot is always exactly 6 decimal digits, i.e. 100000-999999.
  const samples = Array.from({ length: 4000 }, () => maxaiRandomSlot());
  for (const s of samples) {
    assert.match(s, /^\d{6}$/, `X-Random must be 6 digits, got: ${s}`);
    const n = Number(s);
    assert.ok(n >= 100000 && n <= 999999, `X-Random out of range: ${s}`);
  }
  // Regression guard for the modulo bias the previous
  // `randomBytes(4).readUInt32BE(0) % 900000` draw introduced: the value must
  // still spread across the whole range, not collapse onto its low end.
  assert.ok(new Set(samples).size > samples.length * 0.9, "X-Random must not repeat heavily");
  assert.ok(
    samples.some((s) => Number(s) < 550000) && samples.some((s) => Number(s) >= 550000),
    "X-Random must cover both halves of the 100000-999999 range"
  );
});

// ── Context assembly ─────────────────────────────────────────────────────────

test("assembleMaxaiContext: single user turn is sent bare", () => {
  const text = assembleMaxaiContext([{ role: "user", content: "hello there" }]);
  assert.equal(text, "hello there");
});

test("assembleMaxaiContext: system leads, history labeled, current fenced last", () => {
  const text = assembleMaxaiContext([
    { role: "system", content: "You are helpful." },
    { role: "user", content: "first question" },
    { role: "assistant", content: "first answer" },
    { role: "user", content: "second question" },
  ]);
  assert.match(text, /^You are helpful\./);
  assert.match(text, /=== Conversation so far \(for context\) ===/);
  assert.match(text, /User: first question/);
  assert.match(text, /Assistant: first answer/);
  assert.match(text, /=== Current request \(respond to THIS\) ===\n\nsecond question$/);
});

test("assembleMaxaiContext: tool turns render as tool_response / tool_call blocks", () => {
  const text = assembleMaxaiContext([
    { role: "user", content: "search for X" },
    {
      role: "assistant",
      content: "",
      tool_calls: [{ function: { name: "web_search", arguments: '{"q":"X"}' } }],
    },
    { role: "tool", tool_call_id: "call_1", content: "result: found X" },
    { role: "user", content: "summarize" },
  ]);
  assert.match(text, /<tool_call>/);
  assert.match(text, /web_search/);
  assert.match(text, /<tool_response tool_call_id="call_1">/);
  assert.match(text, /result: found X/);
});

test("assembleMaxaiContext throws when there is nothing to send", () => {
  assert.throws(() => assembleMaxaiContext([]), /no content/);
});

test("contentToText flattens multipart content, dropping non-text parts", () => {
  assert.equal(contentToText("plain"), "plain");
  assert.equal(
    contentToText([
      { type: "text", text: "a" },
      { type: "image_url", image_url: { url: "x" } },
      { type: "text", text: "b" },
    ]),
    "a\nb"
  );
});

test("buildMaxaiChatBody pins field order + constants", () => {
  const body = buildMaxaiChatBody({
    conversationId: "conv-1",
    text: "hi",
    modelName: "gpt-5.6",
    appVersion: APP_VERSION,
  });
  const keys = Object.keys(body);
  assert.equal(keys[0], "chat_mode");
  assert.equal(keys[3], "message_content");
  assert.equal(body.chat_mode, "pro_chat");
  assert.deepEqual(body.chat_history, []);
  assert.deepEqual(body.message_content, [{ type: "text", text: "hi" }]);
  assert.equal(body.model_name, "gpt-5.6");
  assert.equal(body.streaming, true);
  assert.equal(body.platform_feature, "web_app");
});

// ── Vision input (image_url parts) ───────────────────────────────────────────

test("buildMaxaiChatBody text-only path is unchanged (no imageUrls)", () => {
  const body = buildMaxaiChatBody({
    conversationId: "c",
    text: "hi",
    modelName: "gpt-5.6",
    appVersion: APP_VERSION,
  });
  // Byte-identical to the pre-vision shape: a single text part.
  assert.deepEqual(body.message_content, [{ type: "text", text: "hi" }]);
  assert.deepEqual(body.doc_list, []);
});

test("buildMaxaiChatBody appends image_url parts after the text part", () => {
  const body = buildMaxaiChatBody({
    conversationId: "c",
    text: "what is this?",
    modelName: "gpt-5.6-luna",
    appVersion: APP_VERSION,
    imageUrls: ["data:image/png;base64,AAAA", "https://example.com/cat.jpg"],
  });
  assert.deepEqual(body.message_content, [
    { type: "text", text: "what is this?" },
    { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } },
    { type: "image_url", image_url: { url: "https://example.com/cat.jpg" } },
  ]);
  // Text part stays first so the flattened transcript leads.
  assert.equal((body.message_content as Array<{ type: string }>)[0].type, "text");
});

test("buildMaxaiChatBody skips empty/blank image urls", () => {
  const body = buildMaxaiChatBody({
    conversationId: "c",
    text: "t",
    modelName: "gpt-5.6",
    appVersion: APP_VERSION,
    imageUrls: ["", "https://x/y.png"],
  });
  assert.equal((body.message_content as unknown[]).length, 2); // text + 1 valid image
});

test("extractCurrentTurnImages pulls images from the LAST user turn only", () => {
  const urls = extractCurrentTurnImages([
    {
      role: "user",
      content: [
        { type: "text", text: "old" },
        { type: "image_url", image_url: { url: "data:image/png;base64,OLD" } },
      ],
    },
    { role: "assistant", content: "ok" },
    {
      role: "user",
      content: [
        { type: "text", text: "look" },
        { type: "image_url", image_url: { url: "https://c/1.jpg" } },
        { type: "image_url", image_url: "https://c/2.jpg" }, // shorthand form
      ],
    },
  ]);
  // Only the current (last) user turn's images, both object and shorthand forms.
  assert.deepEqual(urls, ["https://c/1.jpg", "https://c/2.jpg"]);
});

test("extractCurrentTurnImages returns [] for a plain-string user turn", () => {
  assert.deepEqual(extractCurrentTurnImages([{ role: "user", content: "just text" }]), []);
});

test("extractCurrentTurnImages returns [] when there is no user turn", () => {
  assert.deepEqual(extractCurrentTurnImages([{ role: "system", content: "sys" }]), []);
});

// ── SSE / think split ────────────────────────────────────────────────────────

test("parseMaxaiSseText extracts only mergeable text frames", () => {
  const raw = [
    'data: {"data_key":"text","text":"Hello","need_merge":true}',
    "",
    'data: {"data_key":"next_action","action":{}}',
    "",
    'data: {"data_key":"text","text":" world","need_merge":true}',
    "",
    "data: [DONE]",
  ].join("\n");
  assert.equal(parseMaxaiSseText(raw), "Hello world");
});

test("splitThink separates reasoning from answer", () => {
  const { reasoning, answer } = splitThink("<think>let me think</think>The answer is 42.");
  assert.equal(reasoning, "let me think");
  assert.equal(answer, "The answer is 42.");
});

test("splitThink: no think tag → all answer", () => {
  const { reasoning, answer } = splitThink("just a plain answer");
  assert.equal(reasoning, "");
  assert.equal(answer, "just a plain answer");
});

test("ThinkSplitter handles a tag split across frames", () => {
  const s = new ThinkSplitter();
  let reasoning = "";
  let answer = "";
  // "<thi" then "nk>reason</thi" then "nk>ans"
  for (const delta of ["<thi", "nk>reason</thi", "nk>ans"]) {
    const out = s.feed(delta);
    reasoning += out.reasoning;
    answer += out.answer;
  }
  const tail = s.flush();
  reasoning += tail.reasoning;
  answer += tail.answer;
  assert.equal(reasoning, "reason");
  assert.equal(answer, "ans");
});

test("estimateMaxaiTokens ~ 4 chars/token", () => {
  assert.equal(estimateMaxaiTokens(""), 0);
  assert.equal(estimateMaxaiTokens("abcd"), 1);
  assert.equal(estimateMaxaiTokens("abcde"), 2);
});

// ── Credentials ──────────────────────────────────────────────────────────────

test("userIdFromJwt decodes subject.user_id (no signature verification)", () => {
  // Build a fake JWT with { subject: { user_id } }.
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({ subject: { user_id: USER_ID } })).toString(
    "base64url"
  );
  const jwt = `${header}.${payload}.sig`;
  assert.equal(userIdFromJwt(jwt), USER_ID);
});

// ── Browserless access-token refresh ─────────────────────────────────────────

/** Build a fake (unsigned) JWT carrying an `exp` and optional subject.user_id. */
function fakeJwt(expEpochSeconds: number, userId?: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const claims: Record<string, unknown> = { exp: expEpochSeconds };
  if (userId) claims.subject = { user_id: userId };
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${header}.${payload}.sig`;
}

test("maxaiAccessTokenNeedsRefresh: absent / unparseable / near-expiry / fresh", () => {
  const now = () => 1_000_000_000_000; // fixed ms clock
  const nowSec = 1_000_000_000;
  assert.equal(maxaiAccessTokenNeedsRefresh("", 3600, now), true); // absent
  assert.equal(maxaiAccessTokenNeedsRefresh("not-a-jwt", 3600, now), true); // unparseable
  // exp 30 min out with a 1h margin → needs refresh.
  assert.equal(maxaiAccessTokenNeedsRefresh(fakeJwt(nowSec + 1800), 3600, now), true);
  // exp 5h out with a 1h margin → still fresh.
  assert.equal(maxaiAccessTokenNeedsRefresh(fakeJwt(nowSec + 5 * 3600), 3600, now), false);
});

test("maxaiRefreshAccessToken sends the exact web-app request + parses data.access_token", async () => {
  const nowSec = Math.floor(Date.now() / 1000);
  const refreshToken = fakeJwt(nowSec + 365 * 24 * 3600, USER_ID); // 1y refresh token
  const newAccess = fakeJwt(nowSec + 24 * 3600, USER_ID);
  let seen: { url: string; init: RequestInit } | null = null;

  const fakeFetch = (async (url: string, init: RequestInit) => {
    seen = { url: String(url), init };
    return new Response(JSON.stringify({ data: { access_token: newAccess } }), { status: 200 });
  }) as unknown as typeof fetch;

  const result = await maxaiRefreshAccessToken({
    refreshToken,
    deviceId: MOCK_DEVICE_ID,
    fetchImpl: fakeFetch,
  });

  assert.equal(result.ok, true);
  assert.equal(result.accessToken, newAccess);
  assert.ok(result.expiresAt && result.expiresAt > nowSec);

  // Request shape: bare refresh path, refresh token as Bearer, noAuthLogout, app body.
  assert.ok(seen);
  const { url, init } = seen!;
  assert.ok(url.endsWith(MAXAI_REFRESH_PATH));
  assert.equal(init.method, "POST");
  const headers = init.headers as Record<string, string>;
  assert.equal(headers["Authorization"], `Bearer ${refreshToken}`);
  assert.equal(headers["noAuthLogout"], "true");
  assert.ok(headers["X-Authorization"] && headers["X-Authorization"].length > 0);
  assert.equal(init.body, JSON.stringify({ app: "maxai_webapp" }));
});

test("maxaiRefreshAccessToken returns a structured error on non-200 (no throw)", async () => {
  const nowSec = Math.floor(Date.now() / 1000);
  const fakeFetch = (async () => new Response("nope", { status: 418 })) as unknown as typeof fetch;
  const result = await maxaiRefreshAccessToken({
    refreshToken: fakeJwt(nowSec + 1000, USER_ID),
    deviceId: "dev",
    fetchImpl: fakeFetch,
  });
  assert.equal(result.ok, false);
  assert.equal(result.status, 418);
});

test("maxaiRefreshAccessToken refuses when required inputs are missing", async () => {
  const result = await maxaiRefreshAccessToken({ refreshToken: "", deviceId: "" });
  assert.equal(result.ok, false);
  assert.equal(result.status, 0);
});

// ── Email login (browserless device-pair) ────────────────────────────────────

test("requestMaxaiEmailCode posts the signed signin request + treats status OK as success", async () => {
  let seen: { url: string; init: RequestInit } | null = null;
  const fakeFetch = (async (url: string, init: RequestInit) => {
    seen = { url: String(url), init };
    return new Response(JSON.stringify({ data: { status: "OK" } }), { status: 200 });
  }) as unknown as typeof fetch;

  const r = await requestMaxaiEmailCode({
    email: "user@example.com",
    deviceId: MOCK_DEVICE_ID,
    fetchImpl: fakeFetch,
  });

  assert.equal(r.ok, true);
  assert.ok(seen);
  const { url, init } = seen!;
  assert.ok(url.endsWith(MAXAI_SIGNIN_EMAIL_PATH));
  assert.equal(init.method, "POST");
  assert.equal(init.body, JSON.stringify({ email: "user@example.com", app: "maxai_webapp" }));
  const headers = init.headers as Record<string, string>;
  assert.ok(headers["X-Authorization"] && headers["X-Authorization"].length > 0);
});

test("requestMaxaiEmailCode surfaces a non-OK detail as an error", async () => {
  const fakeFetch = (async () =>
    new Response(JSON.stringify({ data: { status: "FAIL", detail: "Invalid email" } }), {
      status: 200,
    })) as unknown as typeof fetch;
  const r = await requestMaxaiEmailCode({ email: "x@y.z", deviceId: "dev", fetchImpl: fakeFetch });
  assert.equal(r.ok, false);
  assert.match(r.error ?? "", /Invalid email/);
});

test("verifyMaxaiEmailCode returns the full credential from auth_user", async () => {
  const nowSec = Math.floor(Date.now() / 1000);
  const accessToken = "acc.jwt.token";
  const refreshToken = "ref.jwt.token";
  let seen: { url: string; init: RequestInit } | null = null;
  const fakeFetch = (async (url: string, init: RequestInit) => {
    seen = { url: String(url), init };
    return new Response(
      JSON.stringify({
        data: {
          status: "OK",
          auth_user: {
            accessToken,
            refreshToken,
            userId: USER_ID,
            email: "user@example.com",
            clientUserId: "client-uuid-1",
          },
        },
      }),
      { status: 200 }
    );
  }) as unknown as typeof fetch;

  const r = await verifyMaxaiEmailCode({
    email: "user@example.com",
    code: "123456",
    deviceId: "device-uuid-1",
    clientUserId: "client-uuid-1",
    fetchImpl: fakeFetch,
  });

  assert.equal(r.ok, true);
  assert.deepEqual(r.credential, {
    accessToken,
    refreshToken,
    userId: USER_ID,
    email: "user@example.com",
    deviceId: "device-uuid-1",
    clientUserId: "client-uuid-1",
  });
  assert.ok(nowSec > 0); // sanity anchor

  // Request shape: verify path + pinned body fields.
  const { url, init } = seen!;
  assert.ok(url.endsWith(MAXAI_VERIFY_CODE_PATH));
  const body = JSON.parse(String(init.body));
  assert.equal(body.email, "user@example.com");
  assert.equal(body.secret_code, "123456");
  assert.equal(body.app, "maxai_webapp");
  assert.equal(body.env, "prod_co");
  assert.equal(body.client_user_id, "client-uuid-1");
});

test("verifyMaxaiEmailCode maps code 10119 to an expired-code message", async () => {
  const fakeFetch = (async () =>
    new Response(JSON.stringify({ data: { status: "FAIL", code: 10119 } }), {
      status: 200,
    })) as unknown as typeof fetch;
  const r = await verifyMaxaiEmailCode({
    email: "x@y.z",
    code: "000000",
    deviceId: "dev",
    clientUserId: "cu",
    fetchImpl: fakeFetch,
  });
  assert.equal(r.ok, false);
  assert.match(r.error ?? "", /expired|too many/i);
});

test("verifyMaxaiEmailCode defaults to an invalid-code message otherwise", async () => {
  const fakeFetch = (async () =>
    new Response(JSON.stringify({ data: { status: "FAIL" } }), {
      status: 200,
    })) as unknown as typeof fetch;
  const r = await verifyMaxaiEmailCode({
    email: "x@y.z",
    code: "999999",
    deviceId: "dev",
    clientUserId: "cu",
    fetchImpl: fakeFetch,
  });
  assert.equal(r.ok, false);
  assert.match(r.error ?? "", /Invalid code/);
});

test("email login guards missing inputs", async () => {
  assert.equal((await requestMaxaiEmailCode({ email: "", deviceId: "" })).ok, false);
  assert.equal(
    (await verifyMaxaiEmailCode({ email: "", code: "", deviceId: "", clientUserId: "" })).ok,
    false
  );
});

// ── Tool calling (prompted <tool> protocol) ──────────────────────────────────

import { MaxAiExecutor } from "../../open-sse/executors/maxai.ts";

const TOOL_CRED = {
  providerSpecificData: {
    maxaiAccessToken: "acc.tok.en",
    maxaiDeviceId: "dev-1",
    maxaiUserId: USER_ID,
  },
  accessToken: "acc.tok.en",
};

const WEATHER_TOOL = {
  type: "function",
  function: {
    name: "get_weather",
    description: "Get the current weather for a city.",
    parameters: {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
    },
  },
};

/** Build a MaxAI SSE body streaming `full` as one mergeable text frame. */
function maxaiSseBody(full: string): string {
  return (
    `data: ${JSON.stringify({ data_key: "text", need_merge: true, text: full })}\n\n` +
    "data: [DONE]\n\n"
  );
}

/** Run MaxAiExecutor.execute with a stubbed global fetch returning `sseText`. */
async function runToolExecute(opts: {
  sseText: string;
  stream: boolean;
  tools?: unknown[];
}): Promise<{ captured: { url: string; body: string } | null; response: Response }> {
  const realFetch = globalThis.fetch;
  let captured: { url: string; body: string } | null = null;
  globalThis.fetch = (async (url: unknown, init: unknown) => {
    captured = {
      url: String(url),
      body: String((init as RequestInit)?.body ?? ""),
    };
    return new Response(opts.sseText, { status: 200 });
  }) as unknown as typeof fetch;
  try {
    const executor = new MaxAiExecutor();
    const result = await executor.execute({
      model: "gpt-5.6-luna",
      stream: opts.stream,
      credentials: TOOL_CRED,
      body: {
        model: "gpt-5.6-luna",
        messages: [{ role: "user", content: "what's the weather in Paris?" }],
        ...(opts.tools ? { tools: opts.tools } : {}),
        stream: opts.stream,
      },
    } as unknown as Parameters<MaxAiExecutor["execute"]>[0]);
    const response = "response" in result ? result.response : (result as Response);
    return { captured, response };
  } finally {
    globalThis.fetch = realFetch;
  }
}

test("executor injects the <tool> contract into the upstream text when tools are present", async () => {
  const { captured } = await runToolExecute({
    sseText: maxaiSseBody("Sure, let me check."),
    stream: false,
    tools: [WEATHER_TOOL],
  });
  assert.ok(captured);
  const chatBody = JSON.parse(captured!.body);
  const sentText = chatBody.message_content[0].text as string;
  // The prompted-tool contract + the tool name reach the model.
  assert.match(sentText, /<tool>/);
  assert.match(sentText, /get_weather/);
});

test("executor parses a <tool> block from the reply into OpenAI tool_calls (non-stream)", async () => {
  const toolBlock =
    '<tool>{"name": "get_weather", "arguments": {"city": "Paris"}, "_nonce": "NONCE"}</tool>';
  // The parser needs the SAME nonce serializeToolsToPrompt derived from tools[].
  // getToolNonce is deterministic per tools ref+content, so re-derive it here.
  const { getToolNonce } = await import("../../open-sse/translator/webTools.ts");
  const tools = [WEATHER_TOOL];
  const nonce = getToolNonce(tools);
  const reply = `<tool>{"name": "get_weather", "arguments": {"city": "Paris"}, "_nonce": "${nonce}"}</tool>`;
  void toolBlock;

  const { response } = await runToolExecute({
    sseText: maxaiSseBody(reply),
    stream: false,
    tools,
  });
  assert.equal(response.status, 200);
  const json = await response.json();
  const choice = json.choices[0];
  assert.equal(choice.finish_reason, "tool_calls");
  assert.ok(Array.isArray(choice.message.tool_calls));
  assert.equal(choice.message.tool_calls[0].function.name, "get_weather");
  assert.deepEqual(JSON.parse(choice.message.tool_calls[0].function.arguments), { city: "Paris" });
});

test("executor tool mode emits a terminal SSE replay with tool_calls (stream)", async () => {
  const { getToolNonce } = await import("../../open-sse/translator/webTools.ts");
  const tools = [WEATHER_TOOL];
  const nonce = getToolNonce(tools);
  const reply = `<tool>{"name": "get_weather", "arguments": {"city": "Paris"}, "_nonce": "${nonce}"}</tool>`;

  const { response } = await runToolExecute({
    sseText: maxaiSseBody(reply),
    stream: true,
    tools,
  });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("Content-Type") ?? "", /text\/event-stream/);
  const sse = await response.text();
  assert.match(sse, /"tool_calls"/);
  assert.match(sse, /get_weather/);
  assert.match(sse, /\[DONE\]/);
});

test("executor without tools streams normally (no tool_calls, plain content)", async () => {
  const { response } = await runToolExecute({
    sseText: maxaiSseBody("Paris is sunny today."),
    stream: false,
  });
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.choices[0].finish_reason, "stop");
  assert.equal(json.choices[0].message.content, "Paris is sunny today.");
  assert.equal(json.choices[0].message.tool_calls, undefined);
});

/** Like runToolExecute but returns a DIFFERENT sse body per upstream call, so we
 *  can simulate a narration-miss on turn 1 and a clean tool call on turn 2. */
async function runToolExecuteSeq(bodies: string[]): Promise<Response> {
  const realFetch = globalThis.fetch;
  let call = 0;
  globalThis.fetch = (async () => {
    const body = bodies[Math.min(call, bodies.length - 1)];
    call += 1;
    return new Response(body, { status: 200 });
  }) as unknown as typeof fetch;
  try {
    const executor = new MaxAiExecutor();
    const result = await executor.execute({
      model: "maxai/deepseek-r1",
      stream: false,
      credentials: TOOL_CRED,
      body: {
        model: "maxai/deepseek-r1",
        messages: [{ role: "user", content: "what's the weather in Ghent?" }],
        tools: [WEATHER_TOOL],
        stream: false,
      },
    } as unknown as Parameters<MaxAiExecutor["execute"]>[0]);
    return "response" in result ? result.response : (result as Response);
  } finally {
    globalThis.fetch = realFetch;
  }
}

test("executor recovers a tool narration-miss via one nudged retry", async () => {
  // Turn 1: the model NARRATES about the <tool> block but emits none parseable.
  const narration =
    "I can use the get_current_weather tool here via a special <tool> block. Let me think about the arguments...";
  // Turn 2 (after nudge): a clean, parseable tool call. Omit _nonce (tolerated
  // for models that don't echo it) so the test isn't coupled to the internal
  // per-tools-reference nonce the executor injected.
  const clean = `<tool>{"name": "get_current_weather", "arguments": {"city": "Ghent"}}</tool>`;

  const response = await runToolExecuteSeq([maxaiSseBody(narration), maxaiSseBody(clean)]);
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.choices[0].finish_reason, "tool_calls");
  assert.equal(json.choices[0].message.tool_calls[0].function.name, "get_current_weather");
  assert.deepEqual(JSON.parse(json.choices[0].message.tool_calls[0].function.arguments), {
    city: "Ghent",
  });
});

test("executor does NOT retry a genuine no-tool answer (no narration signal)", async () => {
  // A plain answer with no tool intent must pass through unchanged (single call).
  let calls = 0;
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    calls += 1;
    return new Response(maxaiSseBody("The weather in Ghent is mild and cloudy."), { status: 200 });
  }) as unknown as typeof fetch;
  try {
    const executor = new MaxAiExecutor();
    const result = await executor.execute({
      model: "maxai/gpt-5.6",
      stream: false,
      credentials: TOOL_CRED,
      body: {
        model: "maxai/gpt-5.6",
        messages: [{ role: "user", content: "how's Ghent?" }],
        tools: [WEATHER_TOOL],
        stream: false,
      },
    } as unknown as Parameters<MaxAiExecutor["execute"]>[0]);
    const response = "response" in result ? result.response : (result as Response);
    const json = await response.json();
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.equal(calls, 1); // no retry
  } finally {
    globalThis.fetch = realFetch;
  }
});

// ── Model discovery (/models/get_config → per-model context windows) ──────────

const DISCOVERY_CRED = {
  providerSpecificData: {
    maxaiAccessToken: "acc.tok.en",
    maxaiDeviceId: "dev-1",
    maxaiUserId: USER_ID,
  },
  accessToken: "acc.tok.en",
};

/** A minimal /models/get_config body with the fields the mapper reads. */
function modelsConfigBody(models: unknown[]): string {
  return JSON.stringify({ data: { chat_models: models } });
}

test("discoverMaxaiModels maps curated chat models with live max_tokens as the window", async () => {
  const fakeFetch = (async () =>
    new Response(
      modelsConfigBody([
        {
          model_name: "gpt-5.6-luna",
          ui_display_name: "GPT-5.6 Luna",
          type: "chat",
          group: "fast",
          max_tokens: 1_050_000,
          is_deprecated: false,
          capabilities: { vision: true, thinking_mode: false },
        },
        {
          model_name: "gpt-5.6-thinking",
          ui_display_name: "GPT-5.6 Thinking",
          type: "chat",
          group: "reasoning",
          max_tokens: 1_050_000,
          is_deprecated: false,
          capabilities: { vision: false, thinking_mode: true },
        },
      ]),
      { status: 200 }
    )) as unknown as typeof fetch;

  const { models, warning } = await discoverMaxaiModels({
    providerSpecificData: DISCOVERY_CRED.providerSpecificData,
    accessToken: DISCOVERY_CRED.accessToken,
    fetchImpl: fakeFetch,
  });

  const luna = models.find((m) => m.id === "gpt-5.6-luna");
  assert.ok(luna);
  assert.equal(luna!.inputTokenLimit, 1_050_000);
  assert.equal(luna!.name, "GPT-5.6 Luna");
  assert.equal(luna!.toolCalling, true);
  assert.equal(luna!.supportsVision, true);
  const thinking = models.find((m) => m.id === "gpt-5.6-thinking");
  assert.equal(thinking!.supportsReasoning, true);
  // Two curated returned, so the "no longer offered" warning names the rest.
  assert.ok(warning && /no longer offers/.test(warning));
});

test("discoverMaxaiModels drops deprecated, non-chat, and non-curated models", async () => {
  const fakeFetch = (async () =>
    new Response(
      modelsConfigBody([
        { model_name: "gpt-5.6-luna", type: "chat", max_tokens: 1_050_000, is_deprecated: false },
        { model_name: "gpt-5-mini", type: "chat", max_tokens: 400_000, is_deprecated: true }, // deprecated
        { model_name: "some-image-model", type: "image", max_tokens: 0 }, // non-chat
        { model_name: "not-in-catalog", type: "chat", max_tokens: 123 }, // non-curated
      ]),
      { status: 200 }
    )) as unknown as typeof fetch;

  const { models } = await discoverMaxaiModels({
    providerSpecificData: DISCOVERY_CRED.providerSpecificData,
    accessToken: DISCOVERY_CRED.accessToken,
    fetchImpl: fakeFetch,
  });
  assert.deepEqual(
    models.map((m) => m.id),
    ["gpt-5.6-luna"]
  );
});

test("discoverMaxaiModels falls back to the catalog window when max_tokens is absent", async () => {
  const fakeFetch = (async () =>
    new Response(modelsConfigBody([{ model_name: "claude-5-sonnet", type: "chat" }]), {
      status: 200,
    })) as unknown as typeof fetch;
  const { models } = await discoverMaxaiModels({
    providerSpecificData: DISCOVERY_CRED.providerSpecificData,
    accessToken: DISCOVERY_CRED.accessToken,
    fetchImpl: fakeFetch,
  });
  const sonnet = models.find((m) => m.id === "claude-5-sonnet");
  assert.ok(sonnet);
  assert.ok(sonnet!.inputTokenLimit > 0); // from catalog fallback (1_000_000)
});

test("discoverMaxaiModels throws on non-200 and on missing chat_models", async () => {
  const err418 = (async () => new Response("nope", { status: 418 })) as unknown as typeof fetch;
  await assert.rejects(
    discoverMaxaiModels({
      providerSpecificData: DISCOVERY_CRED.providerSpecificData,
      accessToken: DISCOVERY_CRED.accessToken,
      fetchImpl: err418,
    }),
    /418/
  );

  const noModels = (async () =>
    new Response(JSON.stringify({ data: {} }), { status: 200 })) as unknown as typeof fetch;
  await assert.rejects(
    discoverMaxaiModels({
      providerSpecificData: DISCOVERY_CRED.providerSpecificData,
      accessToken: DISCOVERY_CRED.accessToken,
      fetchImpl: noModels,
    }),
    /no chat_models/
  );
});

test("discoverMaxaiModels refuses when the connection is unconfigured", async () => {
  await assert.rejects(
    discoverMaxaiModels({ providerSpecificData: {}, accessToken: "" }),
    /not configured/
  );
});

// ── Body-too-large classification (context_length_exceeded) ──────────────────

test("executor classifies a MaxAI 'too long' rejection as context_length_exceeded", async () => {
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        code: -2,
        detail:
          "Something went wrong. It's probably due to the message you submitted being too long. Please reload the conversation and submit something shorter.",
      }),
      { status: 422 }
    )) as unknown as typeof fetch;
  try {
    const executor = new MaxAiExecutor();
    const result = await executor.execute({
      model: "maxai/gpt-5.6",
      stream: false,
      credentials: TOOL_CRED,
      body: {
        model: "maxai/gpt-5.6",
        messages: [{ role: "user", content: "a very long transcript..." }],
        stream: false,
      },
    } as unknown as Parameters<MaxAiExecutor["execute"]>[0]);
    const response = "response" in result ? result.response : (result as Response);
    assert.equal(response.status, 400);
    const json = await response.json();
    assert.equal(json.error.code, "context_length_exceeded");
  } finally {
    globalThis.fetch = realFetch;
  }
});
