/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { expandUserPath, getConfigDir } from "../../config";
import {
  namespacedToolName,
  type AdapterEvent,
  type CodexContentPart,
  type CodexParsedRequest,
  type CodexProviderConfig,
  type CodexToolResultMessage,
  type CodexUsage,
} from "../../types";
import type { ProviderAdapter } from "../base";
import { parseDataUrl } from "../image";
import { ChatGptBrowserWorker, DEFAULT_CHATGPT_TURN_TIMEOUT_MS } from "./browser-worker";
import { extractChatGptTurnEnvironment, extractChatGptTurnIdentity } from "./environment";
import { resolveChatGptWebModelMode, type ChatGptWebCapabilities } from "./model";
import { chatGptReadOnlyContextWarning, compileChatGptWebPrompt } from "./prompt";
import { TurnBroker, type BrokerToolRequest, type BrokerToolResult } from "./turn-broker";
import {
  ChatGptTextFeed,
  ChatGptTraceFeed,
  chatGptTurnExecutionKey,
  chatGptTurnSessions,
  type ChatGptBrowserOutcome,
  type ChatGptTraceEvent,
  type ChatGptTurnRuntime,
  type ChatGptTurnSession,
} from "./turn-execution";
import { estimateChatGptWebUsage } from "./usage";
import { ChatGptThreadEnvironmentStore } from "./thread-environment";

function brokerSocketPath(provider: CodexProviderConfig): string {
  const configured = provider.chatgptWeb?.brokerSocketPath?.trim();
  return resolve(expandUserPath(configured || `${getConfigDir()}/runtime/turn-broker.sock`));
}

function deferred<T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
} {
  let resolvePromise!: (value: T) => void;
  let rejectPromise!: (error: Error) => void;
  const promise = new Promise<T>((resolveDeferred, rejectDeferred) => {
    resolvePromise = resolveDeferred;
    rejectPromise = rejectDeferred;
  });
  return { promise, resolve: resolvePromise, reject: rejectPromise };
}

function abortError(): DOMException {
  return new DOMException("ChatGPT web turn aborted", "AbortError");
}

function withAbort<T>(promise: Promise<T>, signal: AbortSignal | undefined): Promise<T> {
  if (!signal) return promise;
  if (signal.aborted) return Promise.reject(abortError());
  return new Promise<T>((resolveWait, rejectWait) => {
    const onAbort = () => rejectWait(abortError());
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", onAbort);
        resolveWait(value);
      },
      (error) => {
        signal.removeEventListener("abort", onAbort);
        rejectWait(error);
      }
    );
  });
}

function structuredContent(text: string): unknown | undefined {
  try {
    const parsed: unknown = JSON.parse(text);
    return parsed !== null && typeof parsed === "object" ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function brokerContent(content: string | CodexContentPart[]): unknown[] {
  if (typeof content === "string") return [{ type: "text", text: content }];
  return content.map((part) => {
    if (part.type === "text") return { type: "text", text: part.text };
    const parsed = parseDataUrl(part.imageUrl);
    if (parsed) return { type: "image", data: parsed.base64, mimeType: parsed.mediaType };
    return {
      type: "resource_link",
      uri: part.imageUrl,
      name: "Codex tool image",
      mimeType: "image/*",
    };
  });
}

function brokerResult(message: CodexToolResultMessage): BrokerToolResult {
  const content = brokerContent(message.content);
  const text =
    typeof message.content === "string"
      ? message.content
      : message.content
          .filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("\n");
  const structured = structuredContent(text);
  return {
    content,
    ...(structured !== undefined ? { structuredContent: structured } : {}),
    ...(message.isError ? { isError: true } : {}),
  };
}

function emitToolBatch(
  requests: BrokerToolRequest[],
  usage: CodexUsage,
  emit: (event: AdapterEvent) => void
): void {
  for (const request of requests) {
    emit({ type: "tool_call_start", id: request.callId, name: request.wireName });
    emit({
      type: "tool_call_delta",
      arguments: request.freeform
        ? JSON.stringify({ input: request.input ?? "" })
        : JSON.stringify(request.arguments ?? {}),
    });
    emit({ type: "tool_call_end" });
  }
  emit({ type: "done", stopReason: "tool_use", endTurn: false, usage });
}

function emitBrowserCompletion(
  outcome: ChatGptBrowserOutcome,
  usage: CodexUsage,
  emit: (event: AdapterEvent) => void
): void {
  if (outcome.type === "error") throw outcome.error;
  emit({ type: "done", stopReason: "stop", endTurn: true, usage });
}

function emitTraceEvents(trace: ChatGptTraceEvent[], emit: (event: AdapterEvent) => void): void {
  for (const event of trace) {
    if (!event.continuation) emit({ type: "assistant_boundary" });
    if (event.kind === "commentary") {
      emit({ type: "text_delta", text: event.text, phase: "commentary" });
    } else {
      emit({ type: "thinking_delta", thinking: `${event.text}\n` });
    }
  }
}

function emitTextDeltas(deltas: string[], emit: (event: AdapterEvent) => void): void {
  for (const text of deltas) emit({ type: "text_delta", text, phase: "final_answer" });
}

function emitProContextWarning(
  parsed: CodexParsedRequest,
  capabilities: ChatGptWebCapabilities,
  emit: (event: AdapterEvent) => void
): void {
  const warning = chatGptReadOnlyContextWarning(parsed, capabilities);
  if (!warning) return;
  emit({ type: "assistant_boundary" });
  emit({ type: "text_delta", text: warning, phase: "commentary" });
  emit({ type: "assistant_boundary" });
}

function replayEvents(events: AdapterEvent[], emit: (event: AdapterEvent) => void): void {
  for (const event of events) emit(event);
}

function currentToolResults(
  parsed: CodexParsedRequest,
  session: ChatGptTurnSession
): CodexToolResultMessage[] {
  const byId = new Map<string, CodexToolResultMessage>();
  for (const message of parsed.context.messages) {
    if (message.role !== "toolResult" || !session.hasOutstanding(message.toolCallId)) continue;
    if (byId.has(message.toolCallId))
      throw new Error(`Codex returned duplicate results for tool call ${message.toolCallId}`);
    byId.set(message.toolCallId, message);
  }
  return [...byId.values()];
}

function validateBatchTools(parsed: CodexParsedRequest, requests: BrokerToolRequest[]): void {
  const available = new Set(
    (parsed.context.tools ?? []).map((tool) => namespacedToolName(tool.namespace, tool.name))
  );
  for (const request of requests) {
    if (!available.has(request.wireName)) {
      throw new Error(
        `ChatGPT requested a tool that the active Codex round did not advertise: ${request.wireName}`
      );
    }
  }
}

export function createChatGptWebAdapter(provider: CodexProviderConfig): ProviderAdapter {
  const worker = ChatGptBrowserWorker.forProvider(provider);
  const broker = TurnBroker.forSocket(brokerSocketPath(provider));
  const timeoutMs = provider.chatgptWeb?.turnTimeoutMs ?? DEFAULT_CHATGPT_TURN_TIMEOUT_MS;
  const capabilities: ChatGptWebCapabilities = {
    localToolsEnabled: provider.chatgptWeb?.localToolsEnabled === true,
    proAvailable: provider.chatgptWeb?.proAvailable === true,
  };
  const executionNamespace = createHash("sha256")
    .update(
      JSON.stringify({
        baseUrl: provider.baseUrl,
        chatgptWeb: provider.chatgptWeb ?? {},
      })
    )
    .digest("hex");
  const environmentStore = new ChatGptThreadEnvironmentStore(
    provider.chatgptWeb?.threadEnvironmentStatePath
      ? resolve(expandUserPath(provider.chatgptWeb.threadEnvironmentStatePath))
      : undefined
  );

  const startRuntime = (
    parsed: CodexParsedRequest,
    environment: ReturnType<typeof extractChatGptTurnEnvironment> | undefined,
    traceId: string
  ): ChatGptTurnRuntime => {
    const mode = resolveChatGptWebModelMode(parsed.modelId, parsed.options.reasoning, capabilities);
    const browserAbort = new AbortController();
    const trace = new ChatGptTraceFeed();
    const text = new ChatGptTextFeed();
    if (!mode.localTools) {
      const browser = worker.run({
        traceId,
        modelId: parsed.modelId,
        reasoning: parsed.options.reasoning,
        capabilities,
        prepare: async () => ({
          ...compileChatGptWebPrompt(parsed, capabilities),
          release: () => {},
        }),
        abortSignal: browserAbort.signal,
        onReasoningSummary: (text) => trace.push({ kind: "reasoning", text }),
        onCommentary: (text, continuation) =>
          trace.push({ kind: "commentary", text, ...(continuation ? { continuation: true } : {}) }),
        onTextDelta: (delta) => text.push(delta),
      });
      return {
        mode: "read-only",
        browser,
        trace,
        text,
        cancel: () => browserAbort.abort(),
      };
    }
    if (!environment)
      throw new Error("Tool-capable ChatGPT web mode requires a trusted Codex environment");
    const token = deferred<string>();
    let tokenSettled = false;
    let activeToken: string | undefined;
    const browser = worker.run({
      traceId,
      modelId: parsed.modelId,
      reasoning: parsed.options.reasoning,
      capabilities,
      prepare: async () => {
        const turnToken = await broker.register(environment, timeoutMs + 60_000, traceId);
        activeToken = turnToken;
        tokenSettled = true;
        token.resolve(turnToken);
        try {
          const compiled = compileChatGptWebPrompt(parsed, capabilities, turnToken);
          return { ...compiled, release: () => {} };
        } catch (error) {
          broker.revoke(turnToken);
          throw error;
        }
      },
      abortSignal: browserAbort.signal,
      onReasoningSummary: (text) => trace.push({ kind: "reasoning", text }),
      onCommentary: (text, continuation) =>
        trace.push({ kind: "commentary", text, ...(continuation ? { continuation: true } : {}) }),
      onTextDelta: (delta) => text.push(delta),
    });
    void browser.catch((error) => {
      if (!tokenSettled) {
        tokenSettled = true;
        token.reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
    return {
      mode: "tools",
      token: token.promise,
      browser,
      trace,
      text,
      cancel: () => {
        browserAbort.abort();
        if (activeToken) broker.revoke(activeToken);
      },
    };
  };

  return {
    name: "chatgpt-web",
    async runTurn(parsed, incoming, emit) {
      const mode = resolveChatGptWebModelMode(
        parsed.modelId,
        parsed.options.reasoning,
        capabilities
      );
      let environment: ReturnType<typeof extractChatGptTurnEnvironment> | undefined;
      if (mode.localTools) {
        try {
          environment = environmentStore.resolve(parsed);
        } catch (error) {
          const identity = extractChatGptTurnIdentity(parsed);
          console.warn(
            `[chatgpt-web] trusted environment unavailable (thread_id=${identity.threadId ? "present" : "missing"}, turn_id=${identity.turnId ? "present" : "missing"}, previous_response_id=${parsed.previousResponseId ?? "none"}, replay_prefix_items=${parsed._replayPrefixLen ?? 0}, context_messages=${parsed.context.messages.length})`
          );
          throw error;
        }
      }
      const executionKey = `${executionNamespace}:${chatGptTurnExecutionKey(parsed)}`;
      const traceId = createHash("sha256").update(executionKey).digest("hex").slice(0, 12);
      const session = chatGptTurnSessions.getOrCreate(executionKey, () =>
        startRuntime(parsed, environment, traceId)
      );
      const heartbeat = setInterval(() => emit({ type: "heartbeat" }), 10_000);
      try {
        emit({ type: "heartbeat" });
        await session.runExclusive(async () => {
          const settled = session.settledOutcome();
          if (settled) {
            if (settled.type === "error") throw settled.error;
            let reasoning = session.reasoningForFinalReplay();
            const replay = session.eventsForFinalReplay();
            if (replay.length > 0) {
              replayEvents(replay, emit);
            } else {
              const events: AdapterEvent[] = [];
              const emitCaptured = (event: AdapterEvent) => {
                events.push(event);
                emit(event);
              };
              emitProContextWarning(parsed, capabilities, emitCaptured);
              const trace = session.runtime.trace.drain();
              reasoning = trace.map((event) => event.text);
              emitTraceEvents(trace, emitCaptured);
              emitTextDeltas(session.runtime.text.drain(), emitCaptured);
              if (session.runtime.text.value() !== settled.answer) {
                throw new Error(
                  "ChatGPT browser Markdown stream did not reproduce the completed answer"
                );
              }
              session.setFinalReasoning(reasoning);
              session.setFinalEvents(events);
            }
            emitBrowserCompletion(
              settled,
              estimateChatGptWebUsage(parsed, { answer: settled.answer, reasoning }, capabilities),
              emit
            );
            return;
          }

          let turnToken: string | undefined;
          if (session.runtime.mode === "tools") {
            turnToken = await withAbort(session.runtime.token, incoming.abortSignal);
            if (!environment)
              throw new Error("Tool-capable ChatGPT web runtime lost its trusted environment");
            broker.updateEnvironment(turnToken, environment);

            const outstanding = session.outstanding();
            if (outstanding.length > 0) {
              const results = currentToolResults(parsed, session);
              if (results.length === 0) {
                const reasoning = session.reasoningForOutstandingReplay();
                replayEvents(session.eventsForOutstandingReplay(), emit);
                emitToolBatch(
                  outstanding,
                  estimateChatGptWebUsage(
                    parsed,
                    { reasoning, toolRequests: outstanding },
                    capabilities
                  ),
                  emit
                );
                return;
              }
              if (results.length !== outstanding.length) {
                throw new Error(
                  `Codex returned ${results.length} of ${outstanding.length} results for a parallel ChatGPT tool batch`
                );
              }
              for (const message of results) {
                broker.completeTool(turnToken, message.toolCallId, brokerResult(message));
                session.markResultDelivered(message.toolCallId);
              }
            }
          } else if (session.outstanding().length > 0) {
            throw new Error("Read-only ChatGPT Web runtime cannot own local tool calls");
          }

          const toolWaitAbort = new AbortController();
          try {
            const roundReasoning: string[] = [];
            const roundEvents: AdapterEvent[] = [];
            const emitRound = (event: AdapterEvent) => {
              roundEvents.push(event);
              emit(event);
            };
            const emitNewTrace = (trace: ChatGptTraceEvent[]) => {
              roundReasoning.push(...trace.map((event) => event.text));
              emitTraceEvents(trace, emitRound);
            };
            const emitNewText = (deltas: string[]) => emitTextDeltas(deltas, emitRound);
            emitProContextWarning(parsed, capabilities, emitRound);
            emitNewTrace(session.runtime.trace.drain());
            emitNewText(session.runtime.text.drain());
            const nextTools = turnToken
              ? broker
                  .nextToolBatch(turnToken, toolWaitAbort.signal)
                  .then((requests) => ({ type: "tools" as const, requests }))
              : undefined;
            const browserOutcome = session.browserOutcome.then((outcome) => ({
              type: "browser" as const,
              outcome,
            }));
            let nextTrace = session.runtime.trace
              .next(toolWaitAbort.signal)
              .then((event) => ({ type: "trace" as const, event }));
            let nextText = session.runtime.text
              .wait(toolWaitAbort.signal)
              .then(() => ({ type: "text" as const }));
            for (;;) {
              const next = await withAbort(
                Promise.race([
                  ...(nextTools ? [nextTools] : []),
                  browserOutcome,
                  nextTrace,
                  nextText,
                ]),
                incoming.abortSignal
              );
              if (next.type === "trace") {
                emitNewTrace([next.event]);
                nextTrace = session.runtime.trace
                  .next(toolWaitAbort.signal)
                  .then((event) => ({ type: "trace" as const, event }));
                continue;
              }
              if (next.type === "text") {
                emitNewText(session.runtime.text.drain());
                nextText = session.runtime.text
                  .wait(toolWaitAbort.signal)
                  .then(() => ({ type: "text" as const }));
                continue;
              }
              emitNewTrace(session.runtime.trace.drain());
              emitNewText(session.runtime.text.drain());
              if (next.type === "browser") {
                session.setFinalReasoning(roundReasoning);
                session.setFinalEvents(roundEvents);
                if (turnToken) broker.revoke(turnToken);
                if (next.outcome.type === "error") throw next.outcome.error;
                if (session.runtime.text.value() !== next.outcome.answer) {
                  throw new Error(
                    "ChatGPT browser Markdown stream did not reproduce the completed answer"
                  );
                }
                emitBrowserCompletion(
                  next.outcome,
                  estimateChatGptWebUsage(
                    parsed,
                    { answer: next.outcome.answer, reasoning: roundReasoning },
                    capabilities
                  ),
                  emit
                );
                return;
              }
              if (!turnToken || session.runtime.mode !== "tools") {
                throw new Error("Read-only ChatGPT Web runtime received a broker tool batch");
              }
              if (next.requests.length === 0)
                throw new Error("ChatGPT tool bridge returned an empty batch");
              validateBatchTools(parsed, next.requests);
              session.setOutstanding(next.requests, roundReasoning, roundEvents);
              emitToolBatch(
                next.requests,
                estimateChatGptWebUsage(
                  parsed,
                  { reasoning: roundReasoning, toolRequests: next.requests },
                  capabilities
                ),
                emit
              );
              return;
            }
          } finally {
            toolWaitAbort.abort();
          }
        });
      } catch (error) {
        session.cancel();
        if (session.runtime.mode === "tools") {
          void session.runtime.token.then((turnToken) => broker.revoke(turnToken)).catch(() => {});
        }
        throw error;
      } finally {
        clearInterval(heartbeat);
      }
    },
  };
}
