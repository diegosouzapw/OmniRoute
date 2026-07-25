export interface ZaiDelta {
  content: string;
  reasoning: string;
  done: boolean;
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
