// Pure streaming pass-through helpers for the Antigravity executor (#7408):
// tap an upstream Gemini SSE Response through a credits-extraction
// TransformStream instead of buffering the whole body in the executor, so
// long-thinking models aren't killed by an artificial collection timeout.
// Extracted from antigravity.ts (no host state, no fetch/auth) -- the
// credit-balance cache itself stays in antigravity.ts; callers inject the
// update function below so the two modules don't import each other.

/** Shape of one entry in a Gemini `remainingCredits` SSE payload array. */
export type AntigravityCreditEntry = {
  creditType?: string;
  creditAmount?: string;
};

function asCreditRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * Create a pass-through TransformStream that extracts `remainingCredits`
 * from SSE data without consuming the stream.  The downstream client
 * receives the unmodified bytes.
 *
 * @param accountId  Provider account ID for credit-balance persistence.
 * @param onCreditsUpdate  Invoked with the parsed GOOGLE_ONE_AI balance.
 *                   Injected by the caller (antigravity.ts's
 *                   updateAntigravityRemainingCredits) to avoid this module
 *                   importing back the executor's credit-balance cache.
 * @param bufferSize  Optional sliding-window buffer cap in bytes.
 *                   Pass 0 or omit for unlimited (non-streaming callers
 *                   where the full body is already buffered upstream).
 *                   The streaming path uses 16384 (16 KB) to prevent OOM
 *                   on long-lived SSE connections.  Credit-balance data
 *                   appears near the end of the SSE stream (after
 *                   content), so the sliding window captures it even at
 *                   16 KB -- only truly massive responses (>16 KB of
 *                   consecutive non-newline content) would lose credits.
 */
export function createCreditsExtractionTransform(
  accountId: string,
  onCreditsUpdate: (accountId: string, balance: number) => void,
  bufferSize = 0
): TransformStream<Uint8Array, Uint8Array> {
  let buffer = "";
  const decoder = new TextDecoder();

  return new TransformStream(
    {
      transform(chunk, controller) {
        controller.enqueue(chunk);
        try {
          buffer += decoder.decode(chunk, { stream: true });
          // Sliding-window cap: truncate after the last complete newline
          // in the discard region so SSE lines are never split mid-payload.
          if (bufferSize > 0 && buffer.length > bufferSize) {
            const lastNewline = buffer.lastIndexOf("\n", buffer.length - bufferSize);
            if (lastNewline !== -1) {
              buffer = buffer.slice(lastNewline + 1);
            } else {
              // No newline in the discard region -- incomplete line, discard entirely.
              buffer = "";
            }
          }
        } catch {
          /* decoding best-effort */
        }
      },
      flush() {
        try {
          buffer += decoder.decode();
        } catch {
          /* decoding best-effort */
        }
        try {
          const lines = buffer.split("\n");
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const parsed = JSON.parse(payload);
              if (Array.isArray(parsed?.remainingCredits)) {
                const googleCredit = parsed.remainingCredits.find((c: unknown) => {
                  const credit = asCreditRecord(c);
                  return credit?.creditType === "GOOGLE_ONE_AI";
                }) as AntigravityCreditEntry | undefined;
                if (googleCredit) {
                  const balance = parseInt(String(googleCredit.creditAmount ?? ""), 10);
                  if (!isNaN(balance)) onCreditsUpdate(accountId, balance);
                }
              }
            } catch {
              /* skip malformed lines */
            }
          }
        } catch {
          /* credits extraction is best-effort */
        }
        buffer = "";
      },
    },
    { highWaterMark: 16384 },
    { highWaterMark: 16384 }
  );
}

/** Result shape returned to callers of AntigravityExecutor.execute(). */
export type SsePassthroughResult = {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
};

/** Cancel `body` when `signal` aborts, releasing the upstream connection. */
function cancelBodyOnAbort(body: ReadableStream<Uint8Array>, signal: AbortSignal): void {
  signal.addEventListener(
    "abort",
    () => {
      body.cancel().catch(() => {});
    },
    { once: true }
  );
}

/**
 * Build the non-streaming pass-through result: tap `body` through
 * createCreditsExtractionTransform and wrap it in a same-status Response so
 * chatCore's non-streaming path (readNonStreamingResponseBody +
 * parseNonStreamingSSEPayload) can drain and parse the Gemini SSE without
 * this executor buffering the whole stream itself.
 *
 * If the client already disconnected (`signal.aborted`), cancels the
 * upstream body immediately and returns a bare 499 instead of piping a
 * cancelled body through.
 */
export function buildSsePassthroughResult(
  body: ReadableStream<Uint8Array>,
  upstream: { status: number; statusText: string; headers: Headers },
  accountId: string,
  onCreditsUpdate: (accountId: string, balance: number) => void,
  url: string,
  outHeaders: Record<string, string>,
  transformedBody: unknown,
  signal: AbortSignal | null | undefined
): SsePassthroughResult {
  // Client already disconnected — skip pipe
  if (signal?.aborted) {
    body.cancel().catch(() => {});
    return {
      response: new Response(null, { status: 499 }),
      url,
      headers: outHeaders,
      transformedBody: null,
    };
  }
  // Cancel upstream body on client disconnect
  if (signal) cancelBodyOnAbort(body, signal);

  const tapped = body.pipeThrough(
    createCreditsExtractionTransform(accountId, onCreditsUpdate, 16 * 1024)
  );
  return {
    response: new Response(tapped, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: upstream.headers,
    }),
    url,
    headers: outHeaders,
    transformedBody,
  };
}
