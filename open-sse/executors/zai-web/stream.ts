import { buildErrorBody, sanitizeErrorMessage } from "../../utils/error.ts";

export interface ZaiDelta {
  content: string;
  reasoning: string;
  done: boolean;
  /** Set when the frame carried an upstream error rather than a delta. */
  error?: string;
}

/**
 * Pull a human-readable message out of an error-shaped frame.
 *
 * z.ai answers some failures with HTTP 200 and an error payload in the SSE body
 * (rejected signature, expired captcha, stale token). Those frames carry no
 * `delta_content`, so without this they take the same "no usable delta" path as
 * a benign phase frame and are dropped — the caller then sees a successful
 * empty completion. Only an *explicit* error field counts: contentless frames
 * remain a normal, skipped part of the protocol.
 */
function readFrameError(frame: Record<string, unknown>): string | null {
  const data = (frame.data ?? {}) as Record<string, unknown>;
  const raw = frame.error ?? data.error;
  if (!raw) return null;

  if (typeof raw === "string") return sanitizeErrorMessage(raw) || "upstream error";
  if (typeof raw === "object") {
    const rec = raw as Record<string, unknown>;
    const message = rec.detail ?? rec.message ?? rec.msg;
    if (typeof message === "string" && message) return sanitizeErrorMessage(message);
    return sanitizeErrorMessage(JSON.stringify(raw));
  }
  return sanitizeErrorMessage(String(raw));
}

export type ZaiChunkEmitter = (
  controller: ReadableStreamDefaultController,
  delta: Record<string, unknown>,
  finish?: string | null
) => void;

function parseOpenAiShapedFrame(choices: Array<Record<string, unknown>>): ZaiDelta {
  const delta = (choices[0]?.delta ?? {}) as Record<string, unknown>;
  const finishReason = choices[0]?.finish_reason;
  return {
    content: typeof delta.content === "string" ? delta.content : "",
    reasoning: typeof delta.reasoning_content === "string" ? delta.reasoning_content : "",
    done: finishReason != null,
  };
}

function parseInternalEnvelopeFrame(
  frame: Record<string, unknown>,
  data: Record<string, unknown>
): ZaiDelta | null {
  const phase = String(data.phase ?? "");
  const deltaContent = data.delta_content ?? data.edit_content ?? data.content;
  const done =
    data.done === true ||
    phase === "done" ||
    phase === "finish" ||
    String(frame.type ?? "") === "chat:completion:finish";

  if (typeof deltaContent === "string" && deltaContent) {
    const isThinking = phase === "thinking";
    return {
      content: isThinking ? "" : deltaContent,
      reasoning: isThinking ? deltaContent : "",
      done,
    };
  }
  if (done) return { content: "", reasoning: "", done: true };
  return null;
}

export function parseZaiFrame(raw: unknown): ZaiDelta | null {
  if (!raw || typeof raw !== "object") return null;
  const frame = raw as Record<string, unknown>;

  // Checked before the delta paths: an error frame is terminal, and must not
  // fall through to the "no usable delta" null that would silently drop it.
  const error = readFrameError(frame);
  if (error) return { content: "", reasoning: "", done: true, error };

  const choices = frame.choices as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(choices) && choices.length > 0) {
    return parseOpenAiShapedFrame(choices);
  }

  const data = (frame.data ?? frame) as Record<string, unknown>;
  return parseInternalEnvelopeFrame(frame, data);
}

function extractSseDataPayloads(buffer: { text: string }, incoming: string): string[] {
  buffer.text += incoming;
  const lines = buffer.text.split("\n");
  buffer.text = lines.pop() || "";
  const payloads: string[] = [];
  for (const line of lines) {
    if (!line.startsWith("data:")) continue;
    const data = line.slice(5).trim();
    if (!data || data === "[DONE]") continue;
    payloads.push(data);
  }
  return payloads;
}

function parseSsePayload(data: string): ZaiDelta | null {
  try {
    return parseZaiFrame(JSON.parse(data));
  } catch {
    return null;
  }
}

type ZaiDeltaSource = {
  deltas: AsyncGenerator<ZaiDelta, void, void>;
  cancel: (reason?: unknown) => void;
};

function createZaiDeltaSource(sourceBody: ReadableStream<Uint8Array>): ZaiDeltaSource {
  const decoder = new TextDecoder();
  const reader = sourceBody.getReader();
  const buffer = { text: "" };
  let upstreamDone = false;
  let cancelRequested = false;
  let readerReleased = false;

  const releaseReader = () => {
    if (readerReleased) return;
    readerReleased = true;
    try {
      reader.releaseLock();
    } catch {
      // A concurrent read cancellation owns the final release.
    }
  };

  const cancel = (reason?: unknown) => {
    if (upstreamDone || cancelRequested) return;
    cancelRequested = true;
    try {
      // Do not await an upstream cancel hook: a stalled provider is allowed to
      // ignore cancellation, but it must never keep the client cancellation open.
      void reader.cancel(reason).catch(() => {});
    } catch {
      // The reader may already have closed or released concurrently.
    }
  };

  async function* iterate(): AsyncGenerator<ZaiDelta, void, void> {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          upstreamDone = true;
          return;
        }
        const payloads = extractSseDataPayloads(buffer, decoder.decode(value, { stream: true }));
        for (const raw of payloads) {
          const delta = parseSsePayload(raw);
          if (delta) yield delta;
        }
      }
    } finally {
      if (!upstreamDone && !cancelRequested) cancel("Z.ai delta iteration ended");
      releaseReader();
    }
  }

  return { deltas: iterate(), cancel };
}

async function drainSseDeltas(
  sourceBody: ReadableStream<Uint8Array>,
  onDelta: (delta: ZaiDelta) => boolean
): Promise<boolean> {
  const { deltas } = createZaiDeltaSource(sourceBody);
  for await (const delta of deltas) {
    if (onDelta(delta)) return true;
  }
  return false;
}

function emitDeltaChunks(
  controller: ReadableStreamDefaultController,
  delta: ZaiDelta,
  emitChunk: ZaiChunkEmitter,
  roleState: { emitted: boolean }
): boolean {
  if (delta.error) {
    const errorBody = buildErrorBody(502, `Z.ai stream failed: ${delta.error}`, undefined, {
      type: "upstream_error",
      code: "zai_stream_error",
    });

    if (!roleState.emitted) {
      // Keep a pre-content failure as an error-only Chat frame. Stream readiness
      // rejects it before response headers are committed, so fallback receives a 502.
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(errorBody)}\n\n`));
      controller.close();
    } else {
      // Once content is public, error the protocol-neutral producer. The shared
      // pipeline preserves prior chunks, records the failure, and emits the terminal
      // error in the client's native Chat, Claude, or Responses wire format.
      controller.error(Object.assign(new Error(errorBody.error.message), { statusCode: 502 }));
    }
    return true;
  }

  if (!roleState.emitted && (delta.content || delta.reasoning)) {
    roleState.emitted = true;
    emitChunk(controller, { role: "assistant", content: "" });
  }
  if (delta.reasoning) emitChunk(controller, { reasoning_content: delta.reasoning });
  if (delta.content) emitChunk(controller, { content: delta.content });
  if (delta.done) {
    emitChunk(controller, {}, "stop");
    controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
    controller.close();
    return true;
  }
  return false;
}

export function buildZaiStreamingBody(
  sourceBody: ReadableStream<Uint8Array>,
  emitChunk: ZaiChunkEmitter,
  signal: AbortSignal | null | undefined
): ReadableStream {
  const deltaSource = createZaiDeltaSource(sourceBody);
  const { deltas } = deltaSource;
  const roleState = { emitted: false };
  let terminated = false;

  return new ReadableStream({
    async pull(controller) {
      if (terminated) return;
      try {
        const next = await deltas.next();
        if (terminated) return;
        if (next.done === false) {
          if (emitDeltaChunks(controller, next.value, emitChunk, roleState)) {
            terminated = true;
            await deltas.return(undefined);
          }
          return;
        }

        terminated = true;
        if (!roleState.emitted) emitChunk(controller, { role: "assistant", content: "" });
        emitChunk(controller, {}, "stop");
        controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        terminated = true;
        if (!signal?.aborted) {
          try {
            controller.error(error);
          } catch {
            // The controller was already closed.
          }
        }
      }
    },
    cancel(reason) {
      terminated = true;
      deltaSource.cancel(reason);
      void deltas.return(undefined).catch(() => {});
    },
  });
}

export async function collectZaiNonStreaming(
  sourceBody: ReadableStream<Uint8Array>
): Promise<{ answer: string; reasoning: string }> {
  let answer = "";
  let reasoning = "";
  await drainSseDeltas(sourceBody, (delta) => {
    // Match the streaming path: an upstream error frame (rejected signature,
    // expired captcha, stale token) must surface as a failed request, not as a
    // successful empty completion. The caller converts this throw into an error
    // result (e.g. 502), so the client is never left reading an empty 200.
    if (delta.error) throw new Error(delta.error);
    if (delta.reasoning) reasoning += delta.reasoning;
    if (delta.content) answer += delta.content;
    return delta.done;
  });
  return { answer, reasoning };
}

export function makeZaiChunkEmitter(id: string, created: number, modelId: string): ZaiChunkEmitter {
  return (controller, delta, finish = null) => {
    const chunk = {
      id,
      object: "chat.completion.chunk",
      created,
      model: modelId,
      choices: [{ index: 0, delta, finish_reason: finish }],
    };
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`));
  };
}
