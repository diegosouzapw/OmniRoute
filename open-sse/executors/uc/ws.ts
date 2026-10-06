/**
 * UC (uncensored.com) PERSONA WebSocket driver.
 *
 * Opens one socket per turn (connect → send the persona frame → stream frames →
 * close), mirroring the reference client and the muse-spark-web WS executor. Auth
 * is 100% the `?token=` query param (a 60s Clerk JWT); the ONLY required
 * handshake header is `Origin: https://uncensored.com` (the backend checks it —
 * NO Cookie, NO Authorization on the upgrade).
 *
 * The driver is transport-only: it classifies frames via UcFrameParser and hands
 * each event to an `onEvent` callback, so the executor can drive both a live
 * OpenAI SSE stream and a buffered non-streaming response from the same path. The
 * module-level constructor + `__setUcWebSocketForTesting` hook let tests inject a
 * fake socket (same pattern as muse-spark-web).
 */
import WebSocket from "ws";
import { sanitizeErrorMessage } from "../../utils/error.ts";

import { UC_ORIGIN, UC_WS_HOST, UC_WS_TIMEOUT_MS } from "./constants.ts";
import { buildPersonaFrame, type UcHistoryEntry } from "./protocol.ts";
import { UcFrameParser, type UcEvent } from "./stream.ts";

let WebSocketCtor: typeof WebSocket = WebSocket;

/** Inject a fake WebSocket constructor for tests. Returns a restore fn. */
export function __setUcWebSocketForTesting(ctor: typeof WebSocket): () => void {
  const previous = WebSocketCtor;
  WebSocketCtor = ctor;
  return () => {
    WebSocketCtor = previous;
  };
}

/** Build the persona WS URL: wss://.../ws/{uid}?token={jwt}&_t={epochms}. */
export function buildUcWsUrl(uid: string, jwt: string): string {
  return `${UC_WS_HOST}/${encodeURIComponent(uid)}?token=${encodeURIComponent(jwt)}&_t=${Date.now()}`;
}

export interface UcTurnInput {
  jwt: string;
  uid: string;
  model: string;
  text: string;
  history: UcHistoryEntry[];
  /** Uploaded input-media blobs (images/docs) for the current turn. */
  media?: Array<{ blobName: string; contentType: string }>;
  timeoutMs?: number;
  signal?: AbortSignal | null;
  /** Called for each classified event (delta/reasoning/status/done/error). */
  onEvent?: (evt: UcEvent) => void;
}

export interface UcTurnResult {
  /** The final answer text (raw_text authoritative, else concatenated deltas). */
  content: string;
  /** Reasoning text accumulated from intermediary_message frames. */
  reasoning: string;
  /** Set when the turn failed (error frame, transport failure, or timeout). */
  error?: string;
}

/**
 * Drive one persona turn to completion. Never rejects — a transport/timeout/error
 * failure resolves with `{ error }` set (and any partial content). The caller
 * decides whether a partial is usable or should surface the error.
 */
export function runUcTurn(input: UcTurnInput): Promise<UcTurnResult> {
  const timeoutMs = input.timeoutMs ?? UC_WS_TIMEOUT_MS;
  const url = buildUcWsUrl(input.uid, input.jwt);
  const parser = new UcFrameParser();
  const reasoningParts: string[] = [];

  return new Promise<UcTurnResult>((resolve) => {
    let ws: WebSocket;
    try {
      ws = new WebSocketCtor(url, {
        headers: { Origin: UC_ORIGIN },
        // The persona frame + long answers can exceed the default 100MB cap only
        // in pathological cases; leave the library default. permessage-deflate is
        // negotiated by the server and handled by `ws` transparently.
      });
    } catch (err) {
      resolve({
        content: "",
        reasoning: "",
        error: `ws connect failed: ${sanitizeErrorMessage(err instanceof Error ? err.message : String(err))}`,
      });
      return;
    }

    let settled = false;
    let errorText: string | undefined;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let abortHandler: (() => void) | null = null;

    const finish = (result: UcTurnResult) => {
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

    const fail = (error: string) =>
      finish({ content: parser.accumulated.trim(), reasoning: reasoningParts.join(""), error });

    timeout = setTimeout(
      () => fail(`UC persona WS timed out (readyState=${ws.readyState})`),
      timeoutMs
    );
    abortHandler = () => fail("Request aborted");
    input.signal?.addEventListener("abort", abortHandler, { once: true });

    ws.onopen = () => {
      try {
        const frame = buildPersonaFrame({
          model: input.model,
          text: input.text,
          history: input.history,
          uid: input.uid,
          media: input.media,
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

      for (const evt of parser.feed(raw)) {
        input.onEvent?.(evt);
        if (evt.kind === "reasoning") {
          reasoningParts.push(evt.text);
        } else if (evt.kind === "error") {
          errorText = evt.text;
        } else if (evt.kind === "done") {
          finish({ content: evt.text, reasoning: reasoningParts.join("") });
          return;
        }
      }
      if (parser.done) {
        // Terminal error frame consumed by the parser.
        finish({
          content: parser.accumulated.trim(),
          reasoning: reasoningParts.join(""),
          error: errorText,
        });
      }
    };

    ws.onerror = () => fail("UC persona WebSocket connection error");
    ws.onclose = () => {
      if (settled) return;
      // Closed without an explicit end_of_stream: use whatever we accumulated.
      finish({
        content: parser.finalText(),
        reasoning: reasoningParts.join(""),
        error: errorText,
      });
    };
  });
}
