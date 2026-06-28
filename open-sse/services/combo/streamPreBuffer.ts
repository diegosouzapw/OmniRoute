/**
 * Stream pre-buffer: holds streaming response chunks before sending to client.
 * If an error occurs before the threshold is met, the combo can retry with
 * another provider. Once the threshold is met, chunks flush to the client
 * and no more retries are possible.
 *
 * Modes:
 *   - "time": buffer for N seconds, then flush
 *   - "tokens": buffer until N tokens are accumulated, then flush
 */

export type StreamPreBufferConfig = {
  enabled: boolean;
  mode: "time" | "tokens";
  threshold: number;
};

/**
 * Reads the stream until the pre-buffer threshold is met.
 * Returns a new Response with the buffered + remaining stream.
 * Throws if the stream errors before the threshold.
 */
export async function preBufferStream(
  response: Response,
  config: StreamPreBufferConfig,
  log?: { info?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void }
): Promise<Response> {
  if (!config.enabled || !response.body) return response;

  const { mode, threshold } = config;
  const reader = response.body.getReader();
  const buffered: Uint8Array[] = [];
  let totalTokens = 0;
  const startTime = Date.now();
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffered.push(value);
      totalBytes += value.length;
      totalTokens += Math.ceil(value.length / 4); // ~4 chars/token

      const elapsed = Date.now() - startTime;
      const met =
        (mode === "time" && elapsed >= threshold * 1000) ||
        (mode === "tokens" && totalTokens >= threshold);

      if (met) {
        log?.info?.(
          "COMBO",
          `Pre-buffer threshold met (${mode}=${threshold}, actual ${mode === "time" ? elapsed + "ms" : totalTokens + " tokens"}, ${buffered.length} chunks, ${totalBytes} bytes) — releasing to client`
        );
        // Threshold met — return a replay response
        return buildPreBufferResponse(buffered, reader, response);
      }
    }

    // Stream ended before threshold — still valid, return what we have
    log?.warn?.(
      "COMBO",
      `Pre-buffer stream ended before threshold (${mode}=${threshold}, actual ${mode === "time" ? Date.now() - startTime + "ms" : totalTokens + " tokens"}) — releasing ${buffered.length} buffered chunks`
    );
    return buildPreBufferResponse(buffered, reader, response);
  } catch (err) {
    // Stream errored before threshold — combo can retry
    log?.warn?.(
      "COMBO",
      `Pre-buffer stream error before threshold (${mode}=${threshold}): ${err instanceof Error ? err.message : err}`
    );
    await reader.cancel(err).catch(() => {});
    throw err;
  }
}

function buildPreBufferResponse(
  buffered: Uint8Array[],
  reader: ReadableStreamDefaultReader<Uint8Array>,
  original: Response
): Response {
  const prefix = buffered.slice();
  let idx = 0;
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (idx < prefix.length) {
        controller.enqueue(prefix[idx++]);
        return;
      }
      try {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (err) {
        controller.error(err);
      }
    },
    cancel(reason) {
      reader.cancel(reason).catch(() => {});
    },
  });

  return new Response(stream, {
    status: original.status,
    statusText: original.statusText,
    headers: original.headers,
  });
}
