/* Adapted from miuuyy/codex-chatgpt-web v4.0.7 commit b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494 (MIT). */
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { defaultBrokerEndpoint, expandUserPath, resolveBrokerEndpoint } from "../../config";
import { releaseLauncherRetainedConversation } from "../../launcher-browser-host";
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
import { ChatGptWebAdapterError } from "./adapter-error";
import { ChatGptBrowserWorker } from "./browser-worker";
import { extractChatGptTurnEnvironment, extractChatGptTurnIdentity } from "./environment";
import {
  CHATGPT_WEB_LUNA_MODEL_ID,
  resolveChatGptWebModelMode,
  type ChatGptWebCapabilities,
} from "./model";
import { chatGptReadOnlyContextWarning, compileChatGptWebPrompt } from "./prompt";
import { createChatGptStructuredOutputValidator } from "./output-validation";
import { chatGptWebTurnRetryPolicy } from "./retry-policy";
import {
  TurnBroker,
  type BrokerToolRequest,
  type BrokerToolResult,
  type TurnBrokerOwner,
} from "./turn-broker";
import {
  ChatGptTextFeed,
  ChatGptTraceFeed,
  chatGptCompactionSourceExecutionKey,
  chatGptThreadOwnershipKey,
  chatGptTurnExecutionKey,
  chatGptTurnRetryKey,
  chatGptTurnRoundKey,
  chatGptTurnSessions,
  type ChatGptBrowserOutcome,
  type ChatGptTraceEvent,
  type ChatGptTurnRuntime,
  type ChatGptTurnSession,
} from "./turn-execution";
import { estimateChatGptWebUsage, resolveBiggerContextMultipartParts } from "./usage";
import { ChatGptThreadEnvironmentStore } from "./thread-environment";
import {
  ChatGptLunaCheckpointStore,
  type CapturedChatGptLunaCheckpoint,
} from "./rolling-checkpoint";
import { ChatGptExternalTurnProgress } from "./turn-progress";
import {
  canonicalizeCompactionHandoff,
  existingStructuredCompactionRun,
  requestRetainedCompactionHandoff,
  runStructuredCompactionOnce,
  settleActiveCompactionSource,
} from "./compaction-handoff";
import { chatGptConversationKey, retainedConversationResumeRequest } from "./conversation-key";

function brokerSocketPath(provider: CodexProviderConfig): string {
  const configured = provider.chatgptWeb?.brokerSocketPath?.trim();
  return resolveBrokerEndpoint(configured || defaultBrokerEndpoint());
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

function abortError(signal?: AbortSignal): Error {
  if (signal?.reason instanceof ChatGptWebAdapterError) return signal.reason;
  return new DOMException("ChatGPT web turn aborted", "AbortError");
}

function withAbort<T>(promise: Promise<T>, signal: AbortSignal | undefined): Promise<T> {
  if (!signal) return promise;
  if (signal.aborted) return Promise.reject(abortError(signal));
  return new Promise<T>((resolveWait, rejectWait) => {
    const onAbort = () => rejectWait(abortError(signal));
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

function cancellableBrowserTurn(
  run: Promise<string>,
  controller: AbortController
): {
  browser: Promise<string>;
  physicalSettlement: Promise<void>;
  cancel: (reason?: Error) => void;
} {
  let rejectCancellation!: (error: Error) => void;
  const cancellation = new Promise<never>((_resolve, reject) => {
    rejectCancellation = reject;
  });
  let cancellationRejected = false;
  return {
    // Cancellation wins immediately even while the detached Playwright helper is still unwinding.
    // The helper keeps the same abort signal and remains responsible for its normal end/cleanup
    // handshake, but the Codex Responses turn no longer waits on that process cleanup.
    browser: Promise.race([run, cancellation]),
    // `browser` is the fast client-facing result. Replacement ownership must wait for the actual
    // worker promise, whose finally block completes the launcher /turn/end handshake.
    physicalSettlement: run.then(
      () => undefined,
      () => undefined
    ),
    cancel(reason?: Error) {
      if (!controller.signal.aborted) controller.abort(reason);
      // Explicit targeted cancellation ends the Codex Responses turn immediately. Generic
      // retirement (client disconnect or compaction replacement) still waits for the helper's
      // cleanup handshake before a replacement browser may start.
      if (reason && !cancellationRejected) {
        cancellationRejected = true;
        rejectCancellation(reason);
      }
    },
  };
}

export function chatGptWebExecutionNamespace(provider: CodexProviderConfig): string {
  return createHash("sha256")
    .update(
      JSON.stringify({
        baseUrl: provider.baseUrl,
        chatgptWeb: provider.chatgptWeb ?? {},
      })
    )
    .digest("hex");
}

export function chatGptWebTraceId(
  provider: CodexProviderConfig,
  parsed: CodexParsedRequest
): string {
  return createHash("sha256")
    .update(`${chatGptWebExecutionNamespace(provider)}:${chatGptTurnExecutionKey(parsed)}`)
    .digest("hex")
    .slice(0, 12);
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
    if (part.type === "file") {
      const parsed = parseDataUrl(part.fileData);
      return {
        type: "resource",
        resource: {
          uri: `file:///${encodeURIComponent(part.filename)}`,
          mimeType: parsed?.mediaType ?? "application/octet-stream",
          blob: parsed?.base64 ?? part.fileData,
        },
      };
    }
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
      emit({ type: "thinking_delta", thinking: event.text });
    }
  }
}

function emitTextDeltas(deltas: string[], emit: (event: AdapterEvent) => void): void {
  for (const text of deltas) emit({ type: "text_delta", text, phase: "final_answer" });
}

function emitReadOnlyContextWarning(
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

function submittedTurnFailure(session: ChatGptTurnSession, error: unknown): Error {
  const normalized = error instanceof Error ? error : new Error(String(error));
  if (normalized instanceof ChatGptWebAdapterError) return normalized;
  const phase = session.runtime.submission?.phase;
  if (!phase || phase === "prepared") return normalized;
  const ambiguous = phase === "send_activated";
  return new ChatGptWebAdapterError(
    ambiguous
      ? `ChatGPT Send was activated, but acceptance could not be proven; the prompt will not be resent: ${normalized.message}`
      : `ChatGPT failed after accepting the Web prompt; the prompt will not be resent: ${normalized.message}`,
    {
      status: 502,
      errorType: "server_error",
      code: ambiguous ? "chatgpt_submission_ambiguous" : "chatgpt_submitted_turn_failed",
      retryable: false,
    }
  );
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

/** Keep the Responses bridge alive during every awaited phase of a browser turn. */
export const CHATGPT_WEB_ADAPTER_HEARTBEAT_MS = 10_000;

export function createChatGptWebAdapter(
  provider: CodexProviderConfig,
  dependencies: { broker?: TurnBrokerOwner } = {}
): ProviderAdapter {
  const worker = ChatGptBrowserWorker.forProvider(provider);
  const broker = dependencies.broker ?? TurnBroker.forSocket(brokerSocketPath(provider));
  const structuredBroker = broker instanceof TurnBroker ? broker : undefined;
  const timeoutMs = provider.chatgptWeb?.turnTimeoutMs;
  const experimentalBiggerContext = provider.chatgptWeb?.experimentalBiggerContext;
  if (experimentalBiggerContext !== undefined && typeof experimentalBiggerContext !== "boolean") {
    throw new Error("ChatGPT Bigger Context preference must be a boolean");
  }
  const configuredCapabilities: ChatGptWebCapabilities = {
    localToolsEnabled: provider.chatgptWeb?.localToolsEnabled === true,
    solAvailable: provider.chatgptWeb?.solAvailable !== false,
    proAvailable: provider.chatgptWeb?.proAvailable === true,
  };
  const executionNamespace = chatGptWebExecutionNamespace(provider);
  const retainedLauncherDescriptor =
    provider.chatgptWeb?.browserHost === "launcher" && provider.chatgptWeb.browserHostDescriptorPath
      ? resolve(expandUserPath(provider.chatgptWeb.browserHostDescriptorPath))
      : undefined;
  const environmentStore = new ChatGptThreadEnvironmentStore(
    provider.chatgptWeb?.threadEnvironmentStatePath
      ? resolve(expandUserPath(provider.chatgptWeb.threadEnvironmentStatePath))
      : undefined
  );
  const lunaCheckpointStore = new ChatGptLunaCheckpointStore(
    provider.chatgptWeb?.lunaCheckpointStatePath
      ? resolve(expandUserPath(provider.chatgptWeb.lunaCheckpointStatePath))
      : undefined
  );
  const currentUsageInput = (parsed: CodexParsedRequest): CodexParsedRequest =>
    parsed.modelId === CHATGPT_WEB_LUNA_MODEL_ID && !parsed._compactionRequest
      ? lunaCheckpointStore.apply(parsed).parsed
      : parsed;

  const startRuntime = (
    parsed: CodexParsedRequest,
    environment: ReturnType<typeof extractChatGptTurnEnvironment> | undefined,
    traceId: string,
    turnCapabilities: ChatGptWebCapabilities
  ): ChatGptTurnRuntime => {
    const mode = resolveChatGptWebModelMode(
      parsed.modelId,
      parsed.options.reasoning,
      turnCapabilities
    );
    const identity = extractChatGptTurnIdentity(parsed);
    const captureLunaCheckpoint =
      parsed.modelId === CHATGPT_WEB_LUNA_MODEL_ID &&
      !parsed._compactionRequest &&
      Boolean(identity.threadId && identity.turnId);
    const checkpointInput = captureLunaCheckpoint
      ? lunaCheckpointStore.apply(parsed)
      : { parsed, applied: false };
    const conversationKey =
      !parsed._compactionRequest &&
      parsed.modelId !== CHATGPT_WEB_LUNA_MODEL_ID &&
      mode.localTools &&
      retainedLauncherDescriptor
        ? chatGptConversationKey(checkpointInput.parsed, executionNamespace)
        : undefined;
    const resumeInput = conversationKey
      ? retainedConversationResumeRequest(checkpointInput.parsed)
      : undefined;
    const retainConversation = conversationKey !== undefined;
    const releaseRetainedConversation =
      conversationKey && retainedLauncherDescriptor
        ? async () => {
            await releaseLauncherRetainedConversation(retainedLauncherDescriptor, conversationKey);
          }
        : undefined;
    const compileOptionsFor = (input: CodexParsedRequest) => {
      const experimentalMultipartParts = experimentalBiggerContext
        ? resolveBiggerContextMultipartParts(input, turnCapabilities)
        : undefined;
      return {
        captureLunaCheckpoint,
        ...(experimentalMultipartParts !== undefined ? { experimentalMultipartParts } : {}),
      };
    };
    if (captureLunaCheckpoint) {
      console.info(
        `[chatgpt-web] Luna rolling checkpoint applied=${checkpointInput.applied}${checkpointInput.reason ? ` reason=${checkpointInput.reason}` : ""}`
      );
    }
    let capturedCheckpoint: CapturedChatGptLunaCheckpoint | undefined;
    let checkpointCaptureError: Error | undefined;
    const captureCheckpoint = (captured: CapturedChatGptLunaCheckpoint): void => {
      if (capturedCheckpoint) {
        checkpointCaptureError = new Error("ChatGPT Luna emitted more than one rolling checkpoint");
        return;
      }
      capturedCheckpoint = captured;
    };
    const finalizeCheckpoint = (browser: Promise<string>): Promise<string> =>
      browser.then((answer) => {
        if (!captureLunaCheckpoint) return answer;
        if (checkpointCaptureError) throw checkpointCaptureError;
        if (capturedCheckpoint) lunaCheckpointStore.commit(parsed, capturedCheckpoint, answer);
        return answer;
      });
    const browserAbort = new AbortController();
    const trace = new ChatGptTraceFeed();
    const text = new ChatGptTextFeed();
    const submission: NonNullable<ChatGptTurnRuntime["submission"]> = { phase: "prepared" };
    // A canonical compaction request is side-effect free and remains safe to rebuild after an
    // ambiguous browser send. Normal task prompts must never be replayed after Send activation.
    const submissionLifecycle = parsed._compactionRequest
      ? {}
      : {
          onSendActivated: () => {
            submission.phase = "send_activated" as const;
          },
          onSubmitted: () => {
            submission.phase = "accepted" as const;
          },
        };
    if (!mode.localTools) {
      const browserTurn = cancellableBrowserTurn(
        finalizeCheckpoint(
          worker.run({
            traceId,
            modelId: parsed.modelId,
            reasoning: parsed.options.reasoning,
            capabilities: turnCapabilities,
            prepare: async () => ({
              ...compileChatGptWebPrompt(
                checkpointInput.parsed,
                turnCapabilities,
                undefined,
                compileOptionsFor(checkpointInput.parsed)
              ),
              release: () => {},
            }),
            abortSignal: browserAbort.signal,
            ...(parsed._compactionRequest ? { compaction: true } : {}),
            ...submissionLifecycle,
            onReasoningSummary: (text, continuation) =>
              trace.push({
                kind: "reasoning",
                text,
                ...(continuation ? { continuation: true } : {}),
              }),
            onCommentary: (text, continuation) =>
              trace.push({
                kind: "commentary",
                text,
                ...(continuation ? { continuation: true } : {}),
              }),
            onTextDelta: (delta) => text.push(delta),
            ...(captureLunaCheckpoint
              ? {
                  captureLunaCheckpoint: true,
                  onLunaCheckpoint: captureCheckpoint,
                }
              : {}),
          })
        ),
        browserAbort
      );
      return {
        mode: "read-only",
        browser: browserTurn.browser,
        physicalSettlement: browserTurn.physicalSettlement,
        trace,
        text,
        usageInput: checkpointInput.parsed,
        submission,
        cancel: browserTurn.cancel,
      };
    }
    if (!environment)
      throw new Error("Tool-capable ChatGPT web mode requires a trusted Codex environment");
    const token = deferred<string>();
    const externalProgress = new ChatGptExternalTurnProgress();
    let tokenSettled = false;
    let activeToken: string | undefined;
    const prepareWith = async (input: CodexParsedRequest) => {
      const turnToken =
        activeToken ??
        (await broker.register(
          environment,
          timeoutMs === undefined ? undefined : timeoutMs + 60_000,
          traceId
        ));
      activeToken = turnToken;
      if (!tokenSettled) {
        tokenSettled = true;
        token.resolve(turnToken);
      }
      try {
        const compiled = compileChatGptWebPrompt(
          input,
          turnCapabilities,
          turnToken,
          compileOptionsFor(input)
        );
        return { ...compiled, release: () => {} };
      } catch (error) {
        await broker.revoke(turnToken);
        activeToken = undefined;
        throw error;
      }
    };
    const browserTurn = cancellableBrowserTurn(
      finalizeCheckpoint(
        worker.run({
          traceId,
          modelId: parsed.modelId,
          reasoning: parsed.options.reasoning,
          capabilities: turnCapabilities,
          prepare: () => prepareWith(checkpointInput.parsed),
          ...(resumeInput ? { prepareResume: () => prepareWith(resumeInput) } : {}),
          ...(retainConversation ? { retainConversation: true, conversationKey } : {}),
          abortSignal: browserAbort.signal,
          ...(parsed._compactionRequest ? { compaction: true } : {}),
          ...submissionLifecycle,
          onReasoningSummary: (text, continuation) =>
            trace.push({
              kind: "reasoning",
              text,
              ...(continuation ? { continuation: true } : {}),
            }),
          onCommentary: (text, continuation) =>
            trace.push({
              kind: "commentary",
              text,
              ...(continuation ? { continuation: true } : {}),
            }),
          onTextDelta: (delta) => text.push(delta),
          externalProgress,
          ...(captureLunaCheckpoint
            ? {
                captureLunaCheckpoint: true,
                onLunaCheckpoint: captureCheckpoint,
              }
            : {}),
        })
      ),
      browserAbort
    );
    void browserTurn.browser.catch((error) => {
      if (!tokenSettled) {
        tokenSettled = true;
        token.reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
    return {
      mode: "tools",
      token: token.promise,
      externalProgress,
      browser: browserTurn.browser,
      physicalSettlement: browserTurn.physicalSettlement,
      trace,
      text,
      usageInput: checkpointInput.parsed,
      ...(conversationKey ? { conversationKey } : {}),
      ...(releaseRetainedConversation ? { releaseRetainedConversation } : {}),
      retireCapability: async () => {
        if (activeToken) await broker.revoke(activeToken);
      },
      submission,
      cancel: (reason?: Error) => {
        browserTurn.cancel(reason);
        if (activeToken) {
          void Promise.resolve(broker.revoke(activeToken, reason)).catch((error) => {
            console.error(
              `[chatgpt-web] failed to revoke cancelled turn token: ${error instanceof Error ? error.message : String(error)}`
            );
          });
        }
      },
    };
  };

  return {
    name: "chatgpt-web",
    async runTurn(parsed, incoming, emit) {
      const runChatGptWebTurn = async (): Promise<void> => {
        const turnCapabilities = parsed._compactionRequest
          ? { ...configuredCapabilities, localToolsEnabled: false }
          : configuredCapabilities;
        const mode = resolveChatGptWebModelMode(
          parsed.modelId,
          parsed.options.reasoning,
          turnCapabilities
        );
        const structuredOutputValidator = parsed._compactionRequest
          ? undefined
          : createChatGptStructuredOutputValidator(parsed.options.outputFormat);
        const bufferStructuredOutput = structuredOutputValidator !== undefined;
        const retryKey = `${executionNamespace}:${chatGptTurnRetryKey(parsed)}`;
        const exhaustedRetry = chatGptWebTurnRetryPolicy.exhaustedError(retryKey);
        if (exhaustedRetry) {
          emit({
            type: "error",
            message: exhaustedRetry.message,
            status: exhaustedRetry.status,
            errorType: exhaustedRetry.errorType,
            code: exhaustedRetry.code,
            retryable: false,
          });
          return;
        }
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
        if (parsed._compactionRequest) {
          const structuredCompactionRequired =
            parsed.modelId !== CHATGPT_WEB_LUNA_MODEL_ID &&
            configuredCapabilities.localToolsEnabled;
          if (structuredCompactionRequired && (!retainedLauncherDescriptor || !structuredBroker)) {
            emit({
              type: "error",
              message:
                "Full-mode ChatGPT compaction requires the launcher retained-conversation lease and its local one-shot control broker; the bridge will not replace it with a read-only summarizer.",
              status: 409,
              errorType: "invalid_request_error",
              code: "compaction_control_unavailable",
              retryable: false,
            });
            return;
          }
          if (structuredCompactionRequired) {
            const compactionExecutionKey = `${executionNamespace}:${chatGptTurnExecutionKey(parsed)}`;
            const handoffTraceId = createHash("sha256")
              .update(`${compactionExecutionKey}:handoff`)
              .digest("hex")
              .slice(0, 12);
            const runFreshCompactionFallback = async (reason: string): Promise<string> => {
              console.warn(`[chatgpt-web] retained compaction fallback=${reason}`);
              const fallbackRuntime = startRuntime(
                parsed,
                undefined,
                `${handoffTraceId}_fallback`,
                turnCapabilities
              );
              try {
                const rawSummary = await fallbackRuntime.browser;
                await fallbackRuntime.physicalSettlement;
                return canonicalizeCompactionHandoff(parsed, rawSummary);
              } catch (error) {
                fallbackRuntime.cancel(error instanceof Error ? error : new Error(String(error)));
                await fallbackRuntime.physicalSettlement.catch(() => {});
                throw error;
              }
            };
            let sharedSummary = existingStructuredCompactionRun(compactionExecutionKey);
            if (!sharedSummary) {
              const sourceConversationKey = chatGptConversationKey(parsed, executionNamespace);
              const source = sourceConversationKey
                ? chatGptTurnSessions.findConversationHead(sourceConversationKey)
                : undefined;
              sharedSummary = runStructuredCompactionOnce(compactionExecutionKey, async () => {
                const retainedKey = source?.conversationKey();
                if (!source || !retainedKey) {
                  return runFreshCompactionFallback("source_unavailable_before_handoff");
                }
                try {
                  let rawSummary: string;
                  if (source.isActive() && source.runtime.mode === "tools") {
                    rawSummary =
                      (await settleActiveCompactionSource(parsed, source, structuredBroker!)) ??
                      (await requestRetainedCompactionHandoff(
                        worker,
                        parsed,
                        source,
                        structuredBroker!,
                        configuredCapabilities,
                        handoffTraceId,
                        undefined,
                        timeoutMs
                      ));
                  } else {
                    if (source.isActive()) {
                      const outcome = await source.browserOutcome;
                      if (outcome.type === "error") throw outcome.error;
                      await source.physicalSettlement;
                    }
                    rawSummary = await requestRetainedCompactionHandoff(
                      worker,
                      parsed,
                      source,
                      structuredBroker!,
                      configuredCapabilities,
                      handoffTraceId,
                      undefined,
                      timeoutMs
                    );
                  }
                  const summary = canonicalizeCompactionHandoff(parsed, rawSummary);
                  await chatGptTurnSessions.retireConversationAndWait(retainedKey);
                  return summary;
                } catch (error) {
                  let handoffError = error instanceof Error ? error : new Error(String(error));
                  try {
                    await chatGptTurnSessions.retireConversationAndWait(retainedKey);
                  } catch (retirementError) {
                    handoffError = new AggregateError(
                      [
                        handoffError,
                        retirementError instanceof Error
                          ? retirementError
                          : new Error(String(retirementError)),
                      ],
                      "Structured compaction failed and its retained conversation could not be retired"
                    );
                  }
                  if (
                    handoffError instanceof ChatGptWebAdapterError &&
                    handoffError.code === "compaction_source_unavailable"
                  ) {
                    return runFreshCompactionFallback("source_disappeared_before_handoff");
                  }
                  throw handoffError;
                }
              });
            }
            emit({ type: "heartbeat" });
            let summary: string;
            try {
              summary = await withAbort(sharedSummary, incoming.abortSignal);
            } catch (error) {
              if (
                incoming.abortSignal?.aborted &&
                error instanceof DOMException &&
                error.name === "AbortError"
              ) {
                // The observer detached; the shared exact compaction round continues and remains
                // available to a canonical reconnect without a second browser submission.
                throw error;
              }
              const handoffError = error instanceof Error ? error : new Error(String(error));
              emit({
                type: "error",
                message: `The retained ChatGPT agent did not complete the structured context handoff: ${handoffError.message}`,
                status: 409,
                errorType: "invalid_request_error",
                code: "compaction_handoff_failed",
                retryable: false,
              });
              return;
            }
            emit({ type: "text_delta", text: summary, phase: "final_answer" });
            emitBrowserCompletion(
              { type: "final", answer: summary },
              estimateChatGptWebUsage(parsed, { answer: summary, reasoning: [] }, turnCapabilities),
              emit
            );
            chatGptWebTurnRetryPolicy.clear(retryKey);
            return;
          }
          const responseExecutionKey = `${executionNamespace}:${chatGptCompactionSourceExecutionKey(parsed)}`;
          await chatGptTurnSessions.retireAndWait(responseExecutionKey, incoming.abortSignal);
        }
        const executionKey = `${executionNamespace}:${chatGptTurnExecutionKey(parsed)}`;
        const ownerKey = `${executionNamespace}:${chatGptThreadOwnershipKey(parsed)}`;
        const traceId = createHash("sha256").update(executionKey).digest("hex").slice(0, 12);
        const session = await chatGptTurnSessions.getOrCreateAfterOwnerRetirement(
          executionKey,
          ownerKey,
          () => startRuntime(parsed, environment, traceId, turnCapabilities),
          traceId,
          incoming.abortSignal
        );
        const roundKey = chatGptTurnRoundKey(parsed);
        const emitRoundEvents = (events: readonly AdapterEvent[]): void => {
          // Journal the complete synchronous event batch before touching the HTTP observer. If the
          // observer disconnects midway through emission, an exact reconnect can replay the entire
          // canonical batch instead of losing the already-drained tail.
          session.appendRoundEvents(roundKey, events);
          for (const event of events) emit(event);
        };
        const emitRoundBatch = (produce: (buffer: (event: AdapterEvent) => void) => void): void => {
          const events: AdapterEvent[] = [];
          produce((event) => events.push(event));
          emitRoundEvents(events);
        };
        const emitRoundEvent = (event: AdapterEvent): void => emitRoundEvents([event]);
        try {
          await session.runExclusive(async () => {
            const replay = session.roundEvents(roundKey);
            replayEvents(replay, emit);
            if (session.roundCompleted(roundKey)) {
              const failure = session.roundFailure(roundKey);
              if (failure) throw failure;
              return;
            }
            if (session.roundHasTerminalEvent(roundKey)) {
              session.completeRound(roundKey);
              return;
            }
            const settled = session.settledOutcome();
            if (settled) {
              if (settled.type === "error") throw settled.error;
              const trace = session.runtime.trace.drain();
              session.appendRoundReasoning(
                roundKey,
                trace.map((event) => event.text)
              );
              if (replay.length === 0 && !parsed._compactionRequest) {
                emitRoundBatch((buffer) =>
                  emitReadOnlyContextWarning(parsed, turnCapabilities, buffer)
                );
              }
              emitRoundBatch((buffer) => emitTraceEvents(trace, buffer));
              const completedTextDeltas = session.runtime.text.drain();
              if (!bufferStructuredOutput) {
                emitRoundBatch((buffer) => emitTextDeltas(completedTextDeltas, buffer));
              }
              if (session.runtime.text.value() !== settled.answer) {
                throw new Error(
                  "ChatGPT browser Markdown stream did not reproduce the completed answer"
                );
              }
              structuredOutputValidator?.(settled.answer);
              if (bufferStructuredOutput) {
                emitRoundBatch((buffer) => emitTextDeltas([settled.answer], buffer));
              }
              const reasoning = session.roundReasoning(roundKey);
              session.setFinalReasoning(reasoning);
              session.setFinalEvents(session.roundEvents(roundKey));
              emitRoundBatch((buffer) =>
                emitBrowserCompletion(
                  settled,
                  estimateChatGptWebUsage(
                    currentUsageInput(parsed),
                    { answer: settled.answer, reasoning },
                    turnCapabilities
                  ),
                  buffer
                )
              );
              session.completeRound(roundKey);
              chatGptWebTurnRetryPolicy.clear(retryKey);
              return;
            }

            let turnToken: string | undefined;
            if (session.runtime.mode === "tools") {
              turnToken = await withAbort(session.runtime.token, incoming.abortSignal);
              if (!environment)
                throw new Error("Tool-capable ChatGPT web runtime lost its trusted environment");
              await broker.updateEnvironment(turnToken, environment);

              const outstanding = session.outstanding();
              if (outstanding.length > 0) {
                const results = currentToolResults(parsed, session);
                if (results.length === 0) {
                  const reasoning = session.reasoningForOutstandingReplay();
                  if (replay.length === 0) emitRoundEvents(session.eventsForOutstandingReplay());
                  emitRoundBatch((buffer) =>
                    emitToolBatch(
                      outstanding,
                      estimateChatGptWebUsage(
                        currentUsageInput(parsed),
                        { reasoning, toolRequests: outstanding },
                        turnCapabilities
                      ),
                      buffer
                    )
                  );
                  session.completeRound(roundKey);
                  return;
                }
                if (results.length !== outstanding.length) {
                  throw new Error(
                    `Codex returned ${results.length} of ${outstanding.length} results for a parallel ChatGPT tool batch`
                  );
                }
                for (const message of results) {
                  await broker.completeTool(turnToken, message.toolCallId, brokerResult(message));
                  session.runtime.externalProgress.recordToolResult();
                  session.markResultDelivered(message.toolCallId);
                }
              }
            } else if (session.outstanding().length > 0) {
              throw new Error("Read-only ChatGPT Web runtime cannot own local tool calls");
            }

            const toolWaitAbort = new AbortController();
            try {
              const roundReasoning = session.roundReasoning(roundKey);
              const emitNewTrace = (trace: ChatGptTraceEvent[]) => {
                roundReasoning.push(...trace.map((event) => event.text));
                session.appendRoundReasoning(
                  roundKey,
                  trace.map((event) => event.text)
                );
                emitRoundBatch((buffer) => emitTraceEvents(trace, buffer));
              };
              const emitNewText = (deltas: string[]) => {
                if (!bufferStructuredOutput)
                  emitRoundBatch((buffer) => emitTextDeltas(deltas, buffer));
              };
              if (replay.length === 0 && !parsed._compactionRequest) {
                emitRoundBatch((buffer) =>
                  emitReadOnlyContextWarning(parsed, turnCapabilities, buffer)
                );
              }
              emitNewTrace(session.runtime.trace.drain());
              emitNewText(session.runtime.text.drain());
              const externalProgress =
                session.runtime.mode === "tools" ? session.runtime.externalProgress : undefined;
              const nextTools = turnToken
                ? broker.nextToolBatch(turnToken, toolWaitAbort.signal).then((requests) => {
                    if (!externalProgress) {
                      throw new Error("ChatGPT broker returned tools for a read-only browser turn");
                    }
                    externalProgress.recordToolBatch(requests.length);
                    return { type: "tools" as const, requests };
                  })
                : undefined;
              const browserOutcome = session.browserOutcome.then((outcome) => ({
                type: "browser" as const,
                outcome,
              }));
              let nextTrace = session.runtime.trace
                .wait(toolWaitAbort.signal)
                .then(() => ({ type: "trace" as const }));
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
                  emitNewTrace(session.runtime.trace.drain());
                  nextTrace = session.runtime.trace
                    .wait(toolWaitAbort.signal)
                    .then(() => ({ type: "trace" as const }));
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
                  const completedOutcome = next.outcome;
                  session.setFinalReasoning(roundReasoning);
                  session.setFinalEvents(session.roundEvents(roundKey));
                  if (turnToken) await broker.revoke(turnToken);
                  if (completedOutcome.type === "error") throw completedOutcome.error;
                  if (session.runtime.text.value() !== completedOutcome.answer) {
                    throw new Error(
                      "ChatGPT browser Markdown stream did not reproduce the completed answer"
                    );
                  }
                  structuredOutputValidator?.(completedOutcome.answer);
                  if (bufferStructuredOutput) {
                    emitRoundBatch((buffer) => emitTextDeltas([completedOutcome.answer], buffer));
                  }
                  emitRoundBatch((buffer) =>
                    emitBrowserCompletion(
                      completedOutcome,
                      estimateChatGptWebUsage(
                        currentUsageInput(parsed),
                        { answer: completedOutcome.answer, reasoning: roundReasoning },
                        turnCapabilities
                      ),
                      buffer
                    )
                  );
                  session.completeRound(roundKey);
                  chatGptWebTurnRetryPolicy.clear(retryKey);
                  return;
                }
                if (!turnToken || session.runtime.mode !== "tools") {
                  throw new Error("Read-only ChatGPT Web runtime received a broker tool batch");
                }
                if (next.requests.length === 0)
                  throw new Error("ChatGPT tool bridge returned an empty batch");
                validateBatchTools(parsed, next.requests);
                session.setOutstanding(
                  next.requests,
                  roundReasoning,
                  session.roundEvents(roundKey)
                );
                emitRoundBatch((buffer) =>
                  emitToolBatch(
                    next.requests,
                    estimateChatGptWebUsage(
                      currentUsageInput(parsed),
                      { reasoning: roundReasoning, toolRequests: next.requests },
                      turnCapabilities
                    ),
                    buffer
                  )
                );
                session.completeRound(roundKey);
                return;
              }
            } finally {
              toolWaitAbort.abort();
            }
          });
        } catch (error) {
          if (
            incoming.abortSignal?.aborted &&
            error instanceof DOMException &&
            error.name === "AbortError"
          ) {
            // The HTTP observer detached. Keep the exact browser execution and its round journal so
            // the same canonical request can reconnect without another ChatGPT submission.
            throw error;
          }
          const turnError = submittedTurnFailure(session, error);
          const handledError =
            turnError instanceof ChatGptWebAdapterError && turnError.retryable
              ? chatGptWebTurnRetryPolicy.recordRetryableFailure(retryKey, turnError)
              : turnError;
          if (!(turnError instanceof ChatGptWebAdapterError && turnError.retryable)) {
            chatGptWebTurnRetryPolicy.clear(retryKey);
          }
          if (handledError instanceof ChatGptWebAdapterError && !handledError.retryable) {
            // A deterministic request failure remains replayable so a native reconnect cannot burn
            // another browser attempt. Every other failure retires the browser session: client
            // disconnects, stage failures, and retryable ChatGPT errors must start a fresh surface
            // instead of replaying one rejected browser outcome for the registry's full TTL.
            session.cancel();
          } else {
            chatGptTurnSessions.retire(executionKey, session);
          }
          if (session.runtime.mode === "tools") {
            void session.runtime.token
              .then((turnToken) => broker.revoke(turnToken))
              .catch(() => {});
          }
          if (handledError instanceof ChatGptWebAdapterError) {
            emitRoundEvent({
              type: "error",
              message: handledError.message,
              status: handledError.status,
              errorType: handledError.errorType,
              code: handledError.code,
              retryable: handledError.retryable,
            });
            session.completeRound(roundKey);
            return;
          }
          session.failRound(roundKey, turnError);
          chatGptWebTurnRetryPolicy.clear(retryKey);
          throw turnError;
        }
      };

      // Arm this before any awaited work, including environment lookup and owner retirement.
      const heartbeat = setInterval(
        () => emit({ type: "heartbeat" }),
        CHATGPT_WEB_ADAPTER_HEARTBEAT_MS
      );
      try {
        emit({ type: "heartbeat" });
        await runChatGptWebTurn();
      } finally {
        clearInterval(heartbeat);
      }
    },
  };
}
