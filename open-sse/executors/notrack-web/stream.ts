import type { ExecuteInput } from "../base.ts";
import { estimateTokens } from "./cjk.ts";
import { consumeNotrackSse, processNotrackSseLine } from "./sse.ts";
import type { CollectedResponse, NotrackEvent } from "./types.ts";

export function transformNotrackStream(
  upstream: ReadableStream<Uint8Array>,
  model: string,
  id: string,
  created: number,
  userInput: string,
  includeUsage: boolean,
  signal: AbortSignal | null | undefined,
  log: ExecuteInput["log"]
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      const state = { roleEmitted: false, anyDelta: false, totalChars: 0, fullText: "" };
      const emit = makeChunkEmitter(encoder, controller, { id, created, model });
      await consumeNotrackSse(
        upstream,
        signal,
        (rawLine) =>
          processNotrackSseLine(rawLine, (event) => handleStreamEvent(event, state, emit)),
        "Stream parse error",
        log
      );
      finishStream(state, emit, encoder, controller, {
        id,
        created,
        model,
        userInput,
        includeUsage,
      });
    },
  });
}

function makeChunkEmitter(
  encoder: TextEncoder,
  controller: ReadableStreamDefaultController<Uint8Array>,
  meta: { id: string; created: number; model: string }
): (delta: Record<string, unknown>, finish?: string | null) => void {
  return (delta, finish) => {
    controller.enqueue(
      encoder.encode(
        `data: ${JSON.stringify({
          id: meta.id,
          object: "chat.completion.chunk",
          created: meta.created,
          model: meta.model,
          system_fingerprint: "fp_notrack",
          choices: [{ index: 0, delta, finish_reason: finish ?? null }],
        })}\n\n`
      )
    );
  };
}

function handleStreamEvent(
  event: NotrackEvent,
  state: { roleEmitted: boolean; anyDelta: boolean; totalChars: number; fullText: string },
  emit: (delta: Record<string, unknown>, finish?: string | null) => void
): void {
  const ensureRole = () => {
    if (!state.roleEmitted) {
      state.roleEmitted = true;
      emit({ role: "assistant", content: "" });
    }
  };
  if (event.type === "thinking") {
    ensureRole();
    emit({ reasoning: "[thinking]" });
    return;
  }
  if (event.type === "delta" && typeof event.chunk === "string") {
    appendStreamDelta(state, event.chunk, ensureRole, emit);
    return;
  }
  if (event.type === "message" && typeof event.content === "string" && !state.anyDelta) {
    appendStreamDelta(state, event.content, ensureRole, emit);
  }
}

function appendStreamDelta(
  state: { roleEmitted: boolean; anyDelta: boolean; totalChars: number; fullText: string },
  text: string,
  ensureRole: () => void,
  emit: (delta: Record<string, unknown>, finish?: string | null) => void
): void {
  state.anyDelta = true;
  state.totalChars += text.length;
  state.fullText += text;
  ensureRole();
  emit({ content: text });
}

function finishStream(
  state: { roleEmitted: boolean; anyDelta: boolean; totalChars: number; fullText: string },
  emit: (delta: Record<string, unknown>, finish?: string | null) => void,
  encoder: TextEncoder,
  controller: ReadableStreamDefaultController<Uint8Array>,
  meta: {
    id: string;
    created: number;
    model: string;
    userInput: string;
    includeUsage: boolean;
  }
): void {
  if (!state.roleEmitted) emit({ role: "assistant", content: "" });
  emit({}, "stop");
  if (meta.includeUsage) {
    const completionTokens = estimateTokens(state.fullText || "x".repeat(state.totalChars));
    const promptTokens = estimateTokens(meta.userInput);
    controller.enqueue(
      encoder.encode(
        `data: ${JSON.stringify({
          id: meta.id,
          object: "chat.completion.chunk",
          created: meta.created,
          model: meta.model,
          system_fingerprint: "fp_notrack",
          choices: [],
          usage: {
            prompt_tokens: promptTokens,
            completion_tokens: completionTokens,
            total_tokens: promptTokens + completionTokens,
          },
        })}\n\n`
      )
    );
  }
  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
  controller.close();
}

export async function collectNotrackResponse(
  upstream: ReadableStream<Uint8Array>,
  signal: AbortSignal | null | undefined,
  log: ExecuteInput["log"]
): Promise<CollectedResponse> {
  const acc = {
    content: "",
    fallback: "",
    chatMeta: null as string | null,
    userMsgId: null as string | null,
    assistantTurn: null as number | null,
    anyDelta: false,
  };
  await consumeNotrackSse(
    upstream,
    signal,
    (rawLine) => processNotrackSseLine(rawLine, (event) => handleCollectEvent(event, acc)),
    "Collect parse error",
    log
  );
  return {
    content: acc.anyDelta ? acc.content : acc.content || acc.fallback,
    chatMeta: acc.chatMeta,
    userMsgId: acc.userMsgId,
    assistantTurn: acc.assistantTurn,
  };
}

function handleCollectEvent(
  event: NotrackEvent,
  acc: {
    content: string;
    fallback: string;
    chatMeta: string | null;
    userMsgId: string | null;
    assistantTurn: number | null;
    anyDelta: boolean;
  }
): void {
  if (event.type === "chat_meta" && typeof event.chat_id === "string") {
    acc.chatMeta = event.chat_id;
    return;
  }
  if (event.type === "user" && typeof event.message_id === "string") {
    acc.userMsgId = event.message_id;
    return;
  }
  if (event.type === "delta") {
    if (typeof event.chunk === "string") {
      acc.anyDelta = true;
      acc.content += event.chunk;
    }
    if (typeof event.turn === "number") acc.assistantTurn = event.turn;
    return;
  }
  if (event.type === "message") {
    if (typeof event.content === "string") acc.fallback = event.content;
    if (typeof event.turn === "number") acc.assistantTurn = event.turn;
  }
}
