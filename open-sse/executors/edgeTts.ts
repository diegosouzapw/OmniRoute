/**
 * EdgeTTS — Microsoft Edge "Read Aloud" text-to-speech (#6668).
 *
 * Reverse-engineered, unofficial, undocumented endpoint (not a published
 * Microsoft public API) — the same class of integration this codebase
 * already accepts for other "-web" style providers (chatgpt-web.ts,
 * copilot-web.ts). No user account/API key is required; Microsoft gates
 * abuse with a `Sec-MS-GEC` header computed from a public "trusted client
 * token" (see `open-sse/utils/publicCreds.ts::edgetts_token` — Hard Rule
 * #11, this is a constant hardcoded in every Edge browser build and every
 * open-source edge-tts reimplementation, not a per-user secret).
 *
 * Protocol (verified against rany2/edge-tts + msedge-tts + edge-tts-universal):
 *   1. WS connect to
 *      wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1
 *      with `TrustedClientToken`, `Sec-MS-GEC`, `Sec-MS-GEC-Version` query params.
 *   2. Send a `speech.config` text frame (output format, metadata options).
 *   3. Send an `ssml` text frame carrying the SSML payload to synthesize.
 *   4. Receive interleaved text frames (turn.start / audio.metadata / turn.end)
 *      and binary frames — each binary frame is a 2-byte big-endian header
 *      length, followed by ASCII headers, followed by raw audio bytes.
 *   5. `turn.end` (or WS close) marks the end of the stream; concatenated
 *      audio chunks are the final MP3.
 *
 * All parsing above (Sec-MS-GEC HMAC input, message framing, binary chunk
 * demux) is implemented as pure functions so it can be unit-tested without a
 * live upstream connection — only `synthesizeEdgeTts()` itself touches the
 * network, and it accepts an injectable WebSocket constructor for tests.
 */
import { createHash, randomBytes } from "node:crypto";
import { resolvePublicCred } from "../utils/publicCreds.ts";
import { errorResponse } from "../utils/error.ts";
import { SlidingWindowLimiter } from "../services/slidingWindowLimiter.ts";

const EDGE_TTS_WS_URL =
  "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1";
const EDGE_TTS_GEC_VERSION = "1-138.0.0.0";
const WIN_EPOCH_OFFSET_SECONDS = 11644473600;
const SEC_MS_GEC_ROUND_SECONDS = 300; // 5 minutes
const DEFAULT_VOICE = "en-US-AriaNeural";
const DEFAULT_OUTPUT_FORMAT = "audio-24khz-48kbitrate-mono-mp3";
const CONNECT_TIMEOUT_MS = 10_000;
const SYNTH_TIMEOUT_MS = 30_000;

// Per-client-IP throttle — EdgeTTS has no per-user key, so every OmniRoute
// deployment shares the same trusted-token identity upstream. A single
// abusive caller could get the shared token rate-limited/blocked for
// everyone, so we cap requests per source IP before we ever open a socket.
const EDGE_TTS_RATE_WINDOW = { requests: 20, windowMs: 60_000 };
const edgeTtsLimiter = new SlidingWindowLimiter();

export interface EdgeTtsSynthInput {
  text: string;
  voice?: string;
  rate?: string;
  pitch?: string;
  volume?: string;
}

export interface EdgeTtsSynthResult {
  audio: Buffer;
  contentType: string;
}

/**
 * A minimal shape of the subset of the `ws`/DOM WebSocket API this module
 * needs — lets tests inject a fake implementation without touching the real
 * network or the `ws` package.
 */
export interface MinimalWebSocket {
  on(event: "open" | "message" | "close" | "error", listener: (...args: unknown[]) => void): void;
  send(data: string): void;
  close(): void;
}

export type WebSocketCtor = new (url: string, opts?: unknown) => MinimalWebSocket;

// ─── Pure helpers (unit-testable, no I/O) ──────────────────────────────────

/**
 * Compute the `Sec-MS-GEC` anti-abuse token Microsoft's Read Aloud endpoint
 * requires. `nowMs` is injectable so the function is deterministic in tests.
 * Algorithm ported from rany2/edge-tts `drm.py::generate_sec_ms_gec()`.
 */
export function computeSecMsGec(nowMs: number = Date.now()): string {
  let ticks = nowMs / 1000 + WIN_EPOCH_OFFSET_SECONDS;
  ticks -= ticks % SEC_MS_GEC_ROUND_SECONDS;
  ticks *= 1e7; // seconds -> 100-nanosecond Windows file-time ticks
  const strToHash = `${Math.floor(ticks)}${resolvePublicCred("edgetts_token")}`;
  return createHash("sha256").update(strToHash, "ascii").digest("hex").toUpperCase();
}

/** Random 32-hex-char connection id (no dashes), as the protocol expects. */
export function buildConnectionId(): string {
  return randomBytes(16).toString("hex");
}

function toIsoTimestamp(): string {
  // Edge's protocol wants a JS-Date-toString-like timestamp; ISO is accepted
  // by every reference implementation and is trivially deterministic/testable.
  return new Date().toUTCString();
}

/** Build the `speech.config` WS text frame sent right after connecting. */
export function buildSpeechConfigMessage(timestamp: string = toIsoTimestamp()): string {
  const config = {
    context: {
      synthesis: {
        audio: {
          metadataoptions: {
            sentenceBoundaryEnabled: "false",
            wordBoundaryEnabled: "false",
          },
          outputFormat: DEFAULT_OUTPUT_FORMAT,
        },
      },
    },
  };
  return (
    `X-Timestamp:${timestamp}\r\n` +
    `Content-Type:application/json; charset=utf-8\r\n` +
    `Path:speech.config\r\n\r\n` +
    `${JSON.stringify(config)}`
  );
}

/** Escape user text for safe embedding inside an SSML `<voice>` element. */
export function escapeSsmlText(text: string): string {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Normalize a caller-supplied voice name, falling back to the default voice. */
export function normalizeEdgeVoice(voice: unknown): string {
  const value = typeof voice === "string" ? voice.trim() : "";
  // Edge voice names are e.g. "en-US-AriaNeural" — locale-Name-Neural.
  return /^[A-Za-z]{2,3}-[A-Za-z]{2,3}-[A-Za-z0-9]+Neural$/.test(value) ? value : DEFAULT_VOICE;
}

function clampProsodyValue(value: unknown, fallback: string): string {
  const str = typeof value === "string" ? value.trim() : "";
  // Accept "+10%", "-20%", "default", or a bare number — reject anything else
  // to keep this untrusted-input path from injecting SSML markup.
  return /^(default|[+-]?\d{1,3}%|[+-]?\d{1,3}(\.\d+)?)$/.test(str) ? str : fallback;
}

/** Build the full SSML payload for one synthesis request. */
export function buildSsml(input: EdgeTtsSynthInput): string {
  const voice = normalizeEdgeVoice(input.voice);
  const rate = clampProsodyValue(input.rate, "default");
  const pitch = clampProsodyValue(input.pitch, "default");
  const volume = clampProsodyValue(input.volume, "default");
  const text = escapeSsmlText(input.text);
  return (
    `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>` +
    `<voice name='${voice}'>` +
    `<prosody rate='${rate}' pitch='${pitch}' volume='${volume}'>${text}</prosody>` +
    `</voice></speak>`
  );
}

/** Build the `ssml` WS text frame carrying the synthesis payload. */
export function buildSsmlMessage(
  requestId: string,
  ssml: string,
  timestamp: string = toIsoTimestamp()
): string {
  return (
    `X-RequestId:${requestId}\r\n` +
    `Content-Type:application/ssml+xml\r\n` +
    `X-Timestamp:${timestamp}\r\n` +
    `Path:ssml\r\n\r\n` +
    `${ssml}`
  );
}

/** True when a received text frame marks the end of the synthesis turn. */
export function isTurnEndMessage(message: string): boolean {
  return typeof message === "string" && message.includes("Path:turn.end");
}

/**
 * Demux one binary WS frame into its header block and raw audio payload.
 * Frame shape: 2-byte big-endian header length, then that many bytes of
 * ASCII headers, then the remaining bytes are audio data. Returns `null`
 * for a frame too short to contain a valid header-length prefix.
 */
export function demuxAudioChunk(
  frame: Buffer
): { headers: string; audio: Buffer } | null {
  if (!Buffer.isBuffer(frame) || frame.length < 2) return null;
  const headerLength = frame.readUInt16BE(0);
  if (2 + headerLength > frame.length) return null;
  const headers = frame.subarray(2, 2 + headerLength).toString("ascii");
  const audio = frame.subarray(2 + headerLength);
  return { headers, audio };
}

/** Build the WS connection URL, including the freshly-computed Sec-MS-GEC token. */
export function buildEdgeTtsWsUrl(nowMs: number = Date.now()): string {
  const params = new URLSearchParams({
    TrustedClientToken: resolvePublicCred("edgetts_token"),
    "Sec-MS-GEC": computeSecMsGec(nowMs),
    "Sec-MS-GEC-Version": EDGE_TTS_GEC_VERSION,
    ConnectionId: buildConnectionId(),
  });
  return `${EDGE_TTS_WS_URL}?${params.toString()}`;
}

// ─── Network I/O ────────────────────────────────────────────────────────────

/**
 * Open a WS connection to Edge's Read Aloud service and synthesize `input`.
 * `WebSocketCtor` is injectable for tests; production callers omit it and
 * this lazily imports the `ws` package (mirrors the pattern used in
 * copilot-web.ts / chipotle.ts — keeps `ws` out of the esbuild CJS bundle's
 * top-level graph).
 */
export async function synthesizeEdgeTts(
  input: EdgeTtsSynthInput,
  WebSocketCtor?: WebSocketCtor
): Promise<EdgeTtsSynthResult> {
  const Ctor = WebSocketCtor ?? ((await import("ws")).default as unknown as WebSocketCtor);
  const url = buildEdgeTtsWsUrl();
  const ssml = buildSsml(input);
  const requestId = buildConnectionId();

  return new Promise<EdgeTtsSynthResult>((resolve, reject) => {
    const chunks: Buffer[] = [];
    let settled = false;
    let contentType = "audio/mpeg";

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn();
    };

    const timer = setTimeout(() => {
      finish(() => {
        try {
          ws.close();
        } catch {
          // best-effort close on timeout
        }
        reject(new Error("EdgeTTS synthesis timed out"));
      });
    }, SYNTH_TIMEOUT_MS);

    let ws: MinimalWebSocket;
    try {
      ws = new Ctor(url, { handshakeTimeout: CONNECT_TIMEOUT_MS });
    } catch (err) {
      clearTimeout(timer);
      reject(err instanceof Error ? err : new Error(String(err)));
      return;
    }

    ws.on("open", () => {
      ws.send(buildSpeechConfigMessage());
      ws.send(buildSsmlMessage(requestId, ssml));
    });

    ws.on("message", (data: unknown, isBinary?: unknown) => {
      const binary = isBinary === true || Buffer.isBuffer(data);
      if (binary) {
        const buf = Buffer.isBuffer(data) ? data : Buffer.from(data as ArrayBuffer);
        const demuxed = demuxAudioChunk(buf);
        if (demuxed) {
          const typeMatch = /Content-Type:\s*([^\r\n]+)/i.exec(demuxed.headers);
          if (typeMatch) contentType = typeMatch[1].trim();
          if (demuxed.audio.length > 0) chunks.push(demuxed.audio);
        }
        return;
      }
      const text = String(data);
      if (isTurnEndMessage(text)) {
        finish(() => {
          try {
            ws.close();
          } catch {
            // best-effort close
          }
          resolve({ audio: Buffer.concat(chunks), contentType });
        });
      }
    });

    ws.on("error", (err: unknown) => {
      finish(() => reject(err instanceof Error ? err : new Error(String(err))));
    });

    ws.on("close", () => {
      finish(() => {
        if (chunks.length > 0) {
          resolve({ audio: Buffer.concat(chunks), contentType });
        } else {
          reject(new Error("EdgeTTS connection closed before receiving audio"));
        }
      });
    });
  });
}

// ─── Handler entrypoint (called from audioSpeech.ts) ───────────────────────

/**
 * Handle an EdgeTTS `/v1/audio/speech` request. `clientIp` is optional — when
 * provided, this enforces the per-IP sliding-window throttle described above.
 */
export async function handleEdgeTtsSpeech(
  body: { input?: unknown; voice?: unknown },
  clientIp?: string | null,
  WebSocketCtor?: WebSocketCtor
): Promise<Response> {
  if (clientIp) {
    const { allowed, retryAfterMs } = edgeTtsLimiter.tryAcquire(clientIp, EDGE_TTS_RATE_WINDOW);
    if (!allowed) {
      return errorResponse(
        429,
        `EdgeTTS rate limit exceeded, retry after ${Math.ceil(retryAfterMs / 1000)}s`
      );
    }
  }

  const text = typeof body?.input === "string" ? body.input : "";
  if (!text.trim()) {
    return errorResponse(400, "input is required");
  }

  try {
    const { audio, contentType } = await synthesizeEdgeTts(
      {
        text,
        voice: typeof body.voice === "string" ? body.voice : undefined,
      },
      WebSocketCtor
    );
    return new Response(audio, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    return errorResponse(
      502,
      `EdgeTTS request failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}
