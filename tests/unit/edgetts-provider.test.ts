// EdgeTTS (Microsoft Edge "Read Aloud") audio-tts provider (#6668).
//
// EdgeTTS is a reverse-engineered WebSocket endpoint with no API key, so
// there is no live upstream we can validate against in CI (Hard Rule #18
// TDD path). This suite covers everything that is a pure function: the
// Sec-MS-GEC token/HMAC construction, WS message framing, binary-chunk
// demuxing, SSML building/escaping, registry lookup, and the error path
// (mocked WebSocket failure -> sanitized error response, no stack leak).
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

import {
  computeSecMsGec,
  buildConnectionId,
  buildSpeechConfigMessage,
  buildSsmlMessage,
  buildSsml,
  buildEdgeTtsWsUrl,
  escapeSsmlText,
  normalizeEdgeVoice,
  isTurnEndMessage,
  demuxAudioChunk,
  synthesizeEdgeTts,
  handleEdgeTtsSpeech,
  type MinimalWebSocket,
} from "../../open-sse/executors/edgeTts.ts";
import { getSpeechProvider, parseSpeechModel } from "../../open-sse/config/audioRegistry.ts";
import { resolvePublicCred } from "../../open-sse/utils/publicCreds.ts";

// ─── Sec-MS-GEC token (HMAC-ish SHA-256 construction) ──────────────────────

test("computeSecMsGec is deterministic for the same 5-minute window", () => {
  const base = Date.UTC(2026, 6, 17, 12, 0, 0); // 2026-07-17T12:00:00Z
  const a = computeSecMsGec(base);
  const b = computeSecMsGec(base + 60_000); // +1 minute, same 5-minute bucket
  assert.equal(a, b, "same rounded-down 5-minute window must hash identically");
  assert.match(a, /^[0-9A-F]{64}$/, "output must be a 64-char uppercase hex SHA-256 digest");
});

test("computeSecMsGec changes across a 5-minute window boundary", () => {
  const base = Date.UTC(2026, 6, 17, 12, 0, 0);
  const before = computeSecMsGec(base - 1); // just before the 5-min bucket
  const after = computeSecMsGec(base);
  assert.notEqual(before, after);
});

test("computeSecMsGec matches the reference rany2/edge-tts algorithm shape", () => {
  // Cross-check against a hand-computed reference vector for a fixed instant,
  // using the same constants/algorithm documented in drm.py:
  //   ticks = floor((nowMs/1000 + 11644473600) - (... % 300)) * 1e7
  //   sha256(`${ticks}${TRUSTED_CLIENT_TOKEN}`).hexdigest().upper()
  const nowMs = Date.UTC(2026, 0, 1, 0, 0, 0);
  const winEpoch = 11644473600;
  let ticks = nowMs / 1000 + winEpoch;
  ticks -= ticks % 300;
  ticks *= 1e7;
  const token = resolvePublicCred("edgetts_token");
  const expected = createHash("sha256")
    .update(`${Math.floor(ticks)}${token}`, "ascii")
    .digest("hex")
    .toUpperCase();
  assert.equal(computeSecMsGec(nowMs), expected);
});

// ─── publicCreds shape assertion (Hard Rule #11) ───────────────────────────

test("edgetts_token is embedded via resolvePublicCred, not a string literal", () => {
  const token = resolvePublicCred("edgetts_token");
  assert.equal(typeof token, "string");
  assert.ok(token.length > 0, "embedded default must decode to a non-empty token");
  // The well-known public trusted-client-token format used by every Edge
  // build and every open-source edge-tts port: 32 uppercase hex chars.
  assert.match(token, /^[0-9A-F]{32}$/);
});

test("resolvePublicCred('edgetts_token') is stable across repeated calls", () => {
  // No envName is passed for this key (there's no legacy .env var to migrate
  // from — it's a brand-new provider), so it must always resolve to the same
  // embedded default rather than reading from process.env.
  assert.equal(resolvePublicCred("edgetts_token"), resolvePublicCred("edgetts_token"));
});

// ─── Connection id / message framing ───────────────────────────────────────

test("buildConnectionId returns a 32-char lowercase hex id with no dashes", () => {
  const id = buildConnectionId();
  assert.match(id, /^[0-9a-f]{32}$/);
});

test("buildConnectionId is unique per call", () => {
  const ids = new Set(Array.from({ length: 20 }, () => buildConnectionId()));
  assert.equal(ids.size, 20);
});

test("buildSpeechConfigMessage frames a valid speech.config WS text message", () => {
  const msg = buildSpeechConfigMessage("Tue, 01 Jan 2026 00:00:00 GMT");
  assert.match(msg, /^X-Timestamp:Tue, 01 Jan 2026 00:00:00 GMT\r\n/);
  assert.match(msg, /Content-Type:application\/json; charset=utf-8\r\n/);
  assert.match(msg, /Path:speech\.config\r\n\r\n/);
  const jsonPart = msg.slice(msg.indexOf("\r\n\r\n") + 4);
  const parsed = JSON.parse(jsonPart);
  assert.equal(
    parsed.context.synthesis.audio.outputFormat,
    "audio-24khz-48kbitrate-mono-mp3"
  );
});

test("buildSsmlMessage frames a valid ssml WS text message carrying the SSML body", () => {
  const ssml = buildSsml({ text: "hello" });
  const msg = buildSsmlMessage("req-123", ssml, "Tue, 01 Jan 2026 00:00:00 GMT");
  assert.match(msg, /^X-RequestId:req-123\r\n/);
  assert.match(msg, /Content-Type:application\/ssml\+xml\r\n/);
  assert.match(msg, /Path:ssml\r\n\r\n/);
  assert.ok(msg.endsWith(ssml), "message must end with the exact SSML payload");
});

test("buildEdgeTtsWsUrl includes TrustedClientToken, Sec-MS-GEC, and ConnectionId", () => {
  const url = new URL(buildEdgeTtsWsUrl(Date.UTC(2026, 6, 17)));
  assert.equal(url.protocol, "wss:");
  assert.equal(url.hostname, "speech.platform.bing.com");
  assert.ok(url.searchParams.get("TrustedClientToken"));
  assert.match(url.searchParams.get("Sec-MS-GEC") || "", /^[0-9A-F]{64}$/);
  assert.match(url.searchParams.get("ConnectionId") || "", /^[0-9a-f]{32}$/);
});

// ─── SSML building / escaping (untrusted-input safety) ─────────────────────

test("escapeSsmlText escapes all five XML special characters", () => {
  assert.equal(
    escapeSsmlText(`<tag> & "quoted" 'single'`),
    "&lt;tag&gt; &amp; &quot;quoted&quot; &apos;single&apos;"
  );
});

test("buildSsml embeds escaped text and rejects SSML injection via prosody attrs", () => {
  const ssml = buildSsml({
    text: "</voice><voice name='evil'>pwned",
    rate: "'; </prosody><script>alert(1)</script>",
  });
  assert.ok(!ssml.includes("<script>"), "malicious prosody rate must be clamped, not embedded");
  assert.ok(ssml.includes("&lt;/voice&gt;"), "malicious text must be XML-escaped");
  assert.ok(ssml.includes("rate='default'"), "invalid rate falls back to default");
});

test("normalizeEdgeVoice accepts well-formed voice names and rejects everything else", () => {
  assert.equal(normalizeEdgeVoice("en-US-AriaNeural"), "en-US-AriaNeural");
  assert.equal(normalizeEdgeVoice("pt-BR-FranciscaNeural"), "pt-BR-FranciscaNeural");
  assert.equal(normalizeEdgeVoice("not a voice; DROP TABLE"), "en-US-AriaNeural");
  assert.equal(normalizeEdgeVoice(undefined), "en-US-AriaNeural");
});

// ─── Binary audio chunk demux (pure, no live socket needed) ────────────────

test("demuxAudioChunk splits a binary frame into headers + raw audio bytes", () => {
  const headers = "Path:audio\r\nContent-Type:audio/mpeg\r\n";
  const headerBuf = Buffer.from(headers, "ascii");
  const audioBuf = Buffer.from([1, 2, 3, 4, 5]);
  const lenBuf = Buffer.alloc(2);
  lenBuf.writeUInt16BE(headerBuf.length, 0);
  const frame = Buffer.concat([lenBuf, headerBuf, audioBuf]);

  const result = demuxAudioChunk(frame);
  assert.ok(result);
  assert.equal(result!.headers, headers);
  assert.deepEqual(Array.from(result!.audio), [1, 2, 3, 4, 5]);
});

test("demuxAudioChunk returns null for a truncated/malformed frame", () => {
  assert.equal(demuxAudioChunk(Buffer.from([0])), null);
  const lenBuf = Buffer.alloc(2);
  lenBuf.writeUInt16BE(100, 0); // claims 100 header bytes but frame is short
  assert.equal(demuxAudioChunk(Buffer.concat([lenBuf, Buffer.from("short")])), null);
});

test("isTurnEndMessage recognizes the turn.end marker and nothing else", () => {
  assert.equal(isTurnEndMessage("X-RequestId:abc\r\nPath:turn.end\r\n\r\n"), true);
  assert.equal(isTurnEndMessage("Path:turn.start\r\n\r\n"), false);
  assert.equal(isTurnEndMessage(""), false);
});

// ─── Registry wiring ────────────────────────────────────────────────────────

test("edgetts is registered in AUDIO_SPEECH_PROVIDERS with no-key WS transport", () => {
  const provider = getSpeechProvider("edgetts");
  assert.ok(provider);
  assert.equal(provider!.authType, "none");
  assert.equal(provider!.format, "edgetts");
  assert.match(provider!.baseUrl, /^wss:\/\//);
  assert.ok(provider!.models.length > 0);
});

test("parseSpeechModel resolves 'edgetts/<voice>' to the edgetts provider", () => {
  const { provider, model } = parseSpeechModel("edgetts/en-US-AriaNeural");
  assert.equal(provider, "edgetts");
  assert.equal(model, "en-US-AriaNeural");
});

// ─── synthesizeEdgeTts / handleEdgeTtsSpeech with an injected fake WebSocket ─

class FakeEmitterSocket implements MinimalWebSocket {
  private listeners: Record<string, ((...args: unknown[]) => void)[]> = {};
  sent: string[] = [];
  closed = false;

  on(event: string, listener: (...args: unknown[]) => void) {
    (this.listeners[event] ??= []).push(listener);
  }
  send(data: string) {
    this.sent.push(data);
  }
  close() {
    this.closed = true;
  }
  emit(event: string, ...args: unknown[]) {
    for (const l of this.listeners[event] || []) l(...args);
  }
}

test("synthesizeEdgeTts resolves with concatenated audio on turn.end", async () => {
  let socket: FakeEmitterSocket;
  const Ctor = function (this: unknown, _url: string) {
    socket = new FakeEmitterSocket();
    // Simulate the server's protocol asynchronously after `open` is sent.
    queueMicrotask(() => {
      socket.emit("open");
      const headers = "Path:audio\r\nContent-Type:audio/mpeg\r\n";
      const headerBuf = Buffer.from(headers, "ascii");
      const lenBuf = Buffer.alloc(2);
      lenBuf.writeUInt16BE(headerBuf.length, 0);
      const frame = Buffer.concat([lenBuf, headerBuf, Buffer.from("audiobytes")]);
      socket.emit("message", frame, true);
      socket.emit("message", "Path:turn.end\r\n\r\n", false);
    });
    return socket;
  } as unknown as new (url: string) => MinimalWebSocket;

  const result = await synthesizeEdgeTts({ text: "hello" }, Ctor);
  assert.equal(result.audio.toString(), "audiobytes");
  assert.equal(result.contentType, "audio/mpeg");
});

test("synthesizeEdgeTts rejects when the socket errors", async () => {
  const Ctor = function (this: unknown, _url: string) {
    const socket = new FakeEmitterSocket();
    queueMicrotask(() => socket.emit("error", new Error("upstream refused connection")));
    return socket;
  } as unknown as new (url: string) => MinimalWebSocket;

  await assert.rejects(
    () => synthesizeEdgeTts({ text: "hello" }, Ctor),
    /upstream refused connection/
  );
});

test("handleEdgeTtsSpeech returns 400 without touching the network on empty input", async () => {
  const response = await handleEdgeTtsSpeech({ input: "" });
  assert.equal(response.status, 400);
  const bodyJson = await response.json();
  assert.equal(bodyJson.error.message, "input is required");
});

test("handleEdgeTtsSpeech returns a sanitized 502 on upstream WS failure (Hard Rule #12)", async () => {
  const Ctor = function (this: unknown, _url: string) {
    const socket = new FakeEmitterSocket();
    // Simulate a raw upstream failure that could contain a stack trace or an
    // absolute filesystem path — the handler must never leak it verbatim.
    const err = new Error("connect ECONNREFUSED 127.0.0.1:443");
    (err as Error).stack = `Error: connect ECONNREFUSED\n    at /home/user/secret/app.js:42:10`;
    queueMicrotask(() => socket.emit("error", err));
    return socket;
  } as unknown as new (url: string) => MinimalWebSocket;

  const response = await handleEdgeTtsSpeech({ input: "hello" }, null, Ctor);
  assert.equal(response.status, 502);
  const bodyJson = await response.json();
  assert.ok(bodyJson.error.message.includes("ECONNREFUSED"));
  assert.ok(!bodyJson.error.message.includes("/home/user/secret"), "must not leak a filesystem path");
  assert.ok(!bodyJson.error.message.includes("at /"), "must not leak a stack trace frame");
});

test("handleEdgeTtsSpeech enforces the per-IP sliding-window rate limit", async () => {
  const ip = `203.0.113.${Math.floor(Math.random() * 250) + 1}`;
  // Drain the window with the input-validation fast-path (still exercises
  // tryAcquire before validation) using an always-invalid body to avoid a
  // real network call, then assert the last call is 429, not 400.
  let last: Response | undefined;
  for (let i = 0; i < 21; i++) {
    last = await handleEdgeTtsSpeech({ input: "" }, ip);
  }
  assert.equal(last!.status, 429);
  const bodyJson = await last!.json();
  assert.match(bodyJson.error.message, /rate limit/i);
});
