import { sanitizeErrorMessage } from "../../utils/error.ts";

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

async function drainSseDeltas(
  sourceBody: ReadableStream<Uint8Array>,
  onDelta: (delta: ZaiDelta) => boolean
): Promise<boolean> {
  const decoder = new TextDecoder();
  const reader = sourceBody.getReader();
  const buffer = { text: "" };
  while (true) {
    const { done, value } = await reader.read();
    if (done) return false;
    const payloads = extractSseDataPayloads(buffer, decoder.decode(value, { stream: true }));
    for (const raw of payloads) {
      const delta = parseSsePayload(raw);
      if (delta && onDelta(delta)) return true;
    }
  }
}

function emitDeltaChunks(
  controller: ReadableStreamDefaultController,
  delta: ZaiDelta,
  emitChunk: ZaiChunkEmitter,
  roleState: { emitted: boolean }
): boolean {
  if (!roleState.emitted && (delta.content || delta.reasoning || delta.error)) {
    roleState.emitted = true;
    emitChunk(controller, { role: "assistant", content: "" });
  }
  if (delta.reasoning) emitChunk(controller, { reasoning_content: delta.reasoning });
  if (delta.content) emitChunk(controller, { content: delta.content });
  // Surfaced as visible content, matching the other web executors' mid-stream
  // error convention (see zed-hosted's createErrorChunk): the 200 is already on
  // the wire, so the status cannot change — but the caller must not be left
  // reading an empty success. Any content streamed before the failure is kept.
  if (delta.error) emitChunk(controller, { content: `[Z.ai error] ${delta.error}` });
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
  return new ReadableStream({
    async start(controller) {
      const roleState = { emitted: false };
      try {
        const ended = await drainSseDeltas(sourceBody, (delta) =>
          emitDeltaChunks(controller, delta, emitChunk, roleState)
        );
        if (ended) return;
        if (!roleState.emitted) emitChunk(controller, { role: "assistant", content: "" });
        emitChunk(controller, {}, "stop");
        controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        if (!signal?.aborted) {
          try {
            controller.error(error);
          } catch {
            // The controller was already closed.
          }
        }
      }
    },
  });
}

export async function collectZaiNonStreaming(
  sourceBody: ReadableStream<Uint8Array>
): Promise<{ answer: string; reasoning: string }> {
  let answer = "";
  let reasoning = "";
  await drainSseDeltas(sourceBody, (delta) => {
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
