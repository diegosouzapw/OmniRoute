/**
 * UC (uncensored.com) TEXT-TO-SPEECH handler — exposed on OpenAI /v1/audio/speech.
 *
 * UC's voice synthesis runs over a dedicated WebSocket (distinct from the persona
 * chat socket and the metered REST API — three separate backends):
 *
 *   wss://tts-stream.chatuncensored.ai/{user_id}?token={clerk_jwt}
 *
 * Auth is identical to the chat WS: a short-lived (60s) Clerk `__session` JWT in
 * the `?token=` query param, minted per-connect from the durable `__client`
 * cookie, plus an `Origin: https://uncensored.com` handshake header (the ONLY
 * required header — no Cookie, no Authorization on the upgrade). The JWT is ALSO
 * echoed inside the `start` frame body.
 *
 * Wire (capture-confirmed, UC-MEDIA-GENERATION.md lines 7-42):
 *   SEND  one `start` frame: { message_type:'start', text, raw_text, model,
 *         voice, turn_anchor_message_id, message_id, thread_id, threadId, token }
 *   RECV  a stream of frames:
 *           { type:'usage_update', usage_percent, threshold_crossed }  ← quota, tracked
 *           { data:'<base64 MP3 chunk>' }                              ← audio (ID3/MP3)
 *         The socket closes when synthesis completes. We accumulate every `data`
 *         chunk, base64-decode, and concatenate into the full MP3 buffer.
 *
 * The module mirrors open-sse/executors/uc/ws.ts: a module-level WebSocket
 * constructor with a `__setUcTtsWebSocketForTesting` swap hook, a Promise-wrapped
 * `new Ctor(url, { headers: { Origin } })`, onopen/onmessage/onerror/onclose, and
 * a timeout/abort guard. `fetchImpl` is injectable for the token mint so the whole
 * path is unit-testable with no live network.
 */
import { randomUUID } from "node:crypto";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { Buffer } from "node:buffer";

import WebSocket from "ws";

import {
  UC_ORIGIN,
  UC_TTS_DEFAULT_MODEL,
  UC_TTS_DEFAULT_VOICE,
  UC_TTS_WS_HOST,
  UC_TTS_WS_TIMEOUT_MS,
} from "../../executors/uc/constants.ts";
import { resolveUcCredential, type UcCredential } from "../../executors/uc/credentials.ts";
import { mintUcSessionToken } from "../../executors/uc/clerkAuth.ts";

let WebSocketCtor: typeof WebSocket = WebSocket;

/** Inject a fake WebSocket constructor for tests. Returns a restore fn. */
export function __setUcTtsWebSocketForTesting(ctor: typeof WebSocket): () => void {
  const previous = WebSocketCtor;
  WebSocketCtor = ctor;
  return () => {
    WebSocketCtor = previous;
  };
}

/** Build the TTS WS URL: wss://tts-stream.chatuncensored.ai/{uid}?token={jwt}. */
export function buildUcTtsWsUrl(uid: string, jwt: string): string {
  return `${UC_TTS_WS_HOST}/${encodeURIComponent(uid)}?token=${encodeURIComponent(jwt)}`;
}

/** The `start` frame the client sends to begin synthesis. */
export interface UcTtsStartFrame {
  message_type: "start";
  text: string;
  raw_text: string;
  turn_anchor_message_id: string;
  message_id: string;
  thread_id: string;
  threadId: string;
  model: string;
  voice: string;
  token: string;
}

/** Build the `start` frame for a synthesis request. */
export function buildUcTtsStartFrame(input: {
  text: string;
  voice: string;
  jwt: string;
  model?: string;
}): UcTtsStartFrame {
  const threadId = randomUUID();
  return {
    message_type: "start",
    text: input.text,
    raw_text: input.text,
    turn_anchor_message_id: randomUUID(),
    message_id: randomUUID(),
    thread_id: threadId,
    threadId,
    model: input.model ?? UC_TTS_DEFAULT_MODEL,
    voice: input.voice,
    token: input.jwt,
  };
}

/** Narrow an unknown parsed frame to `{ data: string }` (a base64 MP3 chunk). */
function extractDataChunk(value: unknown): string | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const data = (value as { data?: unknown }).data;
    if (typeof data === "string" && data.length > 0) return data;
  }
  return null;
}

/** Narrow an unknown parsed frame to a `usage_update` quota frame. */
function extractUsagePercent(value: unknown): number | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const obj = value as { type?: unknown; usage_percent?: unknown };
    if (obj.type === "usage_update" && typeof obj.usage_percent === "number") {
      return obj.usage_percent;
    }
  }
  return null;
}

export interface UcTtsSocketInput {
  jwt: string;
  uid: string;
  text: string;
  voice: string;
  model?: string;
  timeoutMs?: number;
  signal?: AbortSignal | null;
}

export interface UcTtsSocketResult {
  /** Concatenated MP3 bytes decoded from all `data` frames. */
  audio: Buffer<ArrayBuffer>;
  /** Last observed TTS quota percentage (from usage_update frames), if any. */
  usagePercent?: number;
  /** Set when the request failed (transport failure, timeout, or empty audio). */
  error?: string;
}

/**
 * Drive one TTS synthesis to completion over the WebSocket. Never rejects — a
 * transport/timeout failure resolves with `{ error }` set plus whatever audio was
 * accumulated so far. Mirrors runUcTurn in executors/uc/ws.ts.
 */
export function runUcTtsSocket(input: UcTtsSocketInput): Promise<UcTtsSocketResult> {
  const timeoutMs = input.timeoutMs ?? UC_TTS_WS_TIMEOUT_MS;
  const url = buildUcTtsWsUrl(input.uid, input.jwt);
  const chunks: Buffer[] = [];
  let usagePercent: number | undefined;

  return new Promise<UcTtsSocketResult>((resolve) => {
    let ws: WebSocket;
    try {
      ws = new WebSocketCtor(url, { headers: { Origin: UC_ORIGIN } });
    } catch (err) {
      resolve({
        audio: Buffer.alloc(0) as Buffer<ArrayBuffer>,
        error: `ws connect failed: ${sanitizeErrorMessage(err instanceof Error ? err.message : String(err))}`,
      });
      return;
    }

    let settled = false;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let abortHandler: (() => void) | null = null;

    const concat = (): Buffer<ArrayBuffer> => Buffer.concat(chunks) as Buffer<ArrayBuffer>;

    const finish = (result: UcTtsSocketResult) => {
      if (settled) return;
      settled = true;
      if (timeout) clearTimeout(timeout);
      if (input.signal && abortHandler) input.signal.removeEventListener("abort", abortHandler);
      try {
        ws.close();
      } catch {
        /* ignore */
      }
      resolve(result);
    };

    const fail = (error: string) => finish({ audio: concat(), usagePercent, error });

    timeout = setTimeout(
      () => fail(`UC TTS WS timed out (readyState=${ws.readyState})`),
      timeoutMs
    );
    abortHandler = () => fail("Request aborted");
    input.signal?.addEventListener("abort", abortHandler, { once: true });

    ws.onopen = () => {
      try {
        const frame = buildUcTtsStartFrame({
          text: input.text,
          voice: input.voice,
          jwt: input.jwt,
          model: input.model,
        });
        ws.send(JSON.stringify(frame));
      } catch (err) {
        fail(`ws send failed: ${sanitizeErrorMessage(err instanceof Error ? err.message : String(err))}`);
      }
    };

    ws.onmessage = (event: WebSocket.MessageEvent) => {
      let raw = "";
      const data = event.data as unknown;
      if (typeof data === "string") {
        raw = data;
      } else if (Buffer.isBuffer(data)) {
        raw = data.toString("utf-8");
      } else if (data instanceof ArrayBuffer) {
        raw = new TextDecoder().decode(data);
      } else if (ArrayBuffer.isView(data as ArrayBufferView)) {
        raw = new TextDecoder().decode(data as ArrayBufferView);
      }
      if (!raw) return;

      // Frames may arrive newline-delimited or one-per-message; handle both.
      for (const line of raw.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        let parsed: unknown;
        try {
          parsed = JSON.parse(trimmed);
        } catch {
          continue;
        }
        const percent = extractUsagePercent(parsed);
        if (percent !== null) {
          usagePercent = percent;
          continue;
        }
        const chunk = extractDataChunk(parsed);
        if (chunk !== null) {
          try {
            chunks.push(Buffer.from(chunk, "base64"));
          } catch {
            /* skip an undecodable chunk */
          }
        }
      }
    };

    ws.onerror = () => fail("UC TTS WebSocket connection error");
    ws.onclose = () => {
      if (settled) return;
      const audio = concat();
      finish({
        audio,
        usagePercent,
        error: audio.length === 0 ? "UC TTS produced no audio" : undefined,
      });
    };
  });
}

export interface HandleUcTextToSpeechInput {
  /** The text to synthesize (mapped from OpenAI `input`). */
  text: string;
  /** The voice selection (mapped from OpenAI `voice`; defaults to `jade`). */
  voice?: string;
  /** TTS model tier (defaults to `default`). */
  model?: string;
  /** Connection credentials — providerSpecificData carries the UC durable cred. */
  credentials?: { providerSpecificData?: Record<string, unknown> | null } | null;
  signal?: AbortSignal | null;
  /** Injectable fetch for the Clerk token mint (tests). */
  fetchImpl?: typeof fetch;
}

export interface HandleUcTextToSpeechResult {
  ok: boolean;
  /** Concatenated MP3 bytes on success. */
  audio?: Buffer<ArrayBuffer>;
  /** MIME type of the returned audio. */
  contentType?: string;
  /** HTTP-ish status to surface (200 ok, 401 auth, 502 upstream). */
  status?: number;
  error?: string;
}

/**
 * Resolve credentials, mint a fresh Clerk session JWT, open the TTS socket, and
 * return the concatenated MP3 bytes. Never throws — always resolves a structured
 * result the caller maps to an HTTP response.
 */
export async function handleUcTextToSpeech(
  input: HandleUcTextToSpeechInput
): Promise<HandleUcTextToSpeechResult> {
  const text = typeof input.text === "string" ? input.text : "";
  if (!text.trim()) {
    return { ok: false, status: 400, error: "input text is required" };
  }

  const cred: UcCredential | null = resolveUcCredential(input.credentials?.providerSpecificData);
  if (!cred) {
    return {
      ok: false,
      status: 401,
      error: "UC credential not configured (need clientCookie, sid, uid)",
    };
  }

  const mint = await mintUcSessionToken({
    sid: cred.sid,
    cookies: cred.cookies,
    signal: input.signal,
    fetchImpl: input.fetchImpl,
  });
  if (!mint.ok || !mint.token) {
    const status = mint.status === 401 || mint.status === 403 ? 401 : 502;
    return { ok: false, status, error: mint.error || `Clerk mint HTTP ${mint.status}` };
  }

  const result = await runUcTtsSocket({
    jwt: mint.token.jwt,
    uid: cred.uid,
    text,
    voice: input.voice?.trim() || UC_TTS_DEFAULT_VOICE,
    model: input.model,
    signal: input.signal,
  });

  if (result.error && result.audio.length === 0) {
    return { ok: false, status: 502, error: result.error };
  }

  return { ok: true, status: 200, audio: result.audio, contentType: "audio/mpeg" };
}
