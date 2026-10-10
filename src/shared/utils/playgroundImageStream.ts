export const PLAYGROUND_IMAGE_STREAM_HEADER = "X-OmniRoute-Playground-Stream";
export const PLAYGROUND_IMAGE_RESULT_EVENT = "playground.image.result";

// Bounds the complete SSE wire envelope, including JSON escaping and heartbeats.
const MAX_PLAYGROUND_IMAGE_STREAM_BYTES = 128 * 1024 * 1024;

type PlaygroundImageResult = {
  status: number;
  body: string;
  headers?: { "content-type"?: string };
};

function frameBoundary(buffer: string): { index: number; length: number } | null {
  const lf = buffer.indexOf("\n\n");
  const crlf = buffer.indexOf("\r\n\r\n");
  if (lf < 0 && crlf < 0) return null;
  if (crlf >= 0 && (lf < 0 || crlf < lf)) return { index: crlf, length: 4 };
  return { index: lf, length: 2 };
}

function parseResultFrame(frame: string): PlaygroundImageResult | null {
  let event = "message";
  const data: string[] = [];
  for (const line of frame.split(/\r?\n/)) {
    if (line.startsWith(":")) continue;
    if (line.startsWith("event:")) event = line.slice(6).trim();
    if (line.startsWith("data:")) data.push(line.slice(5).trimStart());
  }
  if (event !== PLAYGROUND_IMAGE_RESULT_EVENT) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(data.join("\n"));
  } catch {
    throw new Error("Playground image stream returned an invalid result");
  }
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Playground image stream returned an invalid result");
  }

  const result = parsed as {
    status?: unknown;
    body?: unknown;
    headers?: { "content-type"?: unknown };
  };
  if (
    typeof result.status !== "number" ||
    !Number.isInteger(result.status) ||
    result.status < 200 ||
    result.status > 599 ||
    typeof result.body !== "string"
  ) {
    throw new Error("Playground image stream returned an invalid result");
  }

  const contentType = result.headers?.["content-type"];
  if (contentType !== undefined && typeof contentType !== "string") {
    throw new Error("Playground image stream returned an invalid result");
  }
  const headers =
    typeof contentType === "string" && contentType ? { "content-type": contentType } : undefined;
  return {
    status: result.status,
    body: result.body,
    ...(headers ? { headers } : {}),
  };
}

function abortError(signal: AbortSignal): Error {
  if (signal.reason instanceof Error) return signal.reason;
  return new DOMException("The operation was aborted", "AbortError");
}

export async function restorePlaygroundImageResponse(
  response: Response,
  signal?: AbortSignal
): Promise<Response> {
  if (!response.headers.get("content-type")?.includes("text/event-stream")) return response;
  if (!response.body) throw new Error("Playground image stream has no response body");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let receivedBytes = 0;
  let cancelPromise: Promise<void> | undefined;
  const cancel = () => {
    cancelPromise ??= reader.cancel(signal?.reason).catch(() => undefined);
  };
  signal?.addEventListener("abort", cancel, { once: true });

  try {
    if (signal?.aborted) throw abortError(signal);

    while (true) {
      const { done, value } = await reader.read();
      if (signal?.aborted) throw abortError(signal);
      if (done) {
        buffer += decoder.decode();
        break;
      }

      receivedBytes += value.byteLength;
      if (receivedBytes > MAX_PLAYGROUND_IMAGE_STREAM_BYTES) {
        throw new Error("Playground image stream exceeded the response limit");
      }
      buffer += decoder.decode(value, { stream: true });

      let boundary = frameBoundary(buffer);
      while (boundary) {
        const frame = buffer.slice(0, boundary.index);
        buffer = buffer.slice(boundary.index + boundary.length);
        const result = parseResultFrame(frame);
        if (result) {
          const bodyless = result.status === 204 || result.status === 205 || result.status === 304;
          if (bodyless && result.body !== "") {
            throw new Error("Playground image stream returned an invalid result");
          }
          return new Response(bodyless ? null : result.body, {
            status: result.status,
            headers: result.headers,
          });
        }
        boundary = frameBoundary(buffer);
      }
    }

    throw new Error(`Playground image stream ended before ${PLAYGROUND_IMAGE_RESULT_EVENT}`);
  } finally {
    signal?.removeEventListener("abort", cancel);
    cancel();
    await cancelPromise;
    reader.releaseLock();
  }
}
