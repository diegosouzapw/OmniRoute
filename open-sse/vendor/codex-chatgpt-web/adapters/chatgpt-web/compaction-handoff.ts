/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
import { parseDataUrl } from "../image";
import type { CodexContentPart, CodexParsedRequest, CodexToolResultMessage } from "../../types";
import { extractChatGptCompactionSourceRevision } from "./environment";
import type { ChatGptBrowserWorker } from "./browser-worker";
import type { ChatGptWebCapabilities } from "./model";
import {
  activeCompactionToolResultInstruction,
  structuredCompactionHandoffInstruction,
} from "./native-compaction-control";
import type { BrokerToolResult, TurnBroker } from "./turn-broker";
import type { ChatGptTurnSession } from "./turn-execution";

export const LATEST_USER_PROMPT_MARKER = "CODEX_LATEST_USER_PROMPT_JSON";

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

function structuredContent(text: string): unknown | undefined {
  try {
    const parsed: unknown = JSON.parse(text);
    return parsed !== null && typeof parsed === "object" ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function toolResult(message: CodexToolResultMessage): BrokerToolResult {
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

function withActiveCompactionInstruction(result: BrokerToolResult): BrokerToolResult {
  return {
    ...result,
    content: [...result.content, { type: "text", text: activeCompactionToolResultInstruction() }],
  };
}

function interruptedByActiveCompaction(): BrokerToolResult {
  return {
    content: [{ type: "text", text: activeCompactionToolResultInstruction(false) }],
    isError: true,
  };
}

function userPromptText(content: unknown): string | undefined {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return undefined;
  const text = content
    .flatMap((part) => {
      if (!part || typeof part !== "object" || Array.isArray(part)) return [];
      const value = part as { type?: unknown; text?: unknown };
      return (value.type === "input_text" || value.type === "text") &&
        typeof value.text === "string"
        ? [value.text]
        : [];
    })
    .join("\n");
  return text || undefined;
}

export function canonicalizeCompactionHandoff(parsed: CodexParsedRequest, summary: string): string {
  const normalized = summary.trim();
  if (!normalized) throw new Error("ChatGPT returned an empty structured compaction handoff");
  const latestUserPrompt = userPromptText(extractChatGptCompactionSourceRevision(parsed).content);
  if (latestUserPrompt === undefined) {
    throw new Error("ChatGPT compaction source has no canonical latest user prompt");
  }
  const appendix = `${LATEST_USER_PROMPT_MARKER}\n${JSON.stringify(latestUserPrompt)}`;
  const markerOffset = normalized.lastIndexOf(`\n${LATEST_USER_PROMPT_MARKER}\n`);
  if (markerOffset < 0) return `${normalized}\n\n${appendix}`;
  if (normalized.slice(markerOffset + 1).trimEnd() !== appendix) {
    throw new Error("ChatGPT compaction handoff contains a conflicting latest-user marker");
  }
  return normalized;
}

function currentToolResults(
  parsed: CodexParsedRequest,
  session: ChatGptTurnSession
): Map<string, CodexToolResultMessage> {
  const results = new Map<string, CodexToolResultMessage>();
  for (const message of parsed.context.messages) {
    if (message.role !== "toolResult" || !session.hasOutstanding(message.toolCallId)) continue;
    if (results.has(message.toolCallId)) {
      throw new Error(`Codex returned duplicate results for tool call ${message.toolCallId}`);
    }
    results.set(message.toolCallId, message);
  }
  return results;
}

export async function settleActiveCompactionSource(
  parsed: CodexParsedRequest,
  source: ChatGptTurnSession,
  broker: TurnBroker
): Promise<string | undefined> {
  if (!source.isActive() || source.runtime.mode !== "tools") {
    throw new Error("The active ChatGPT compaction source has no MCP tool boundary");
  }
  const outstanding = source.outstanding();
  const results = currentToolResults(parsed, source);
  if (results.size !== outstanding.length) {
    throw new Error(
      `Codex supplied ${results.size} of ${outstanding.length} required tool results for compaction`
    );
  }
  let token: string | undefined;
  try {
    token = await source.runtime.token;
    const interruptedQueued = broker.requestCompaction(token, interruptedByActiveCompaction());
    for (const [index, request] of outstanding.entries()) {
      const result = results.get(request.callId)!;
      const canonical = toolResult(result);
      await broker.completeTool(
        token,
        request.callId,
        interruptedQueued === 0 && index === outstanding.length - 1
          ? withActiveCompactionInstruction(canonical)
          : canonical
      );
      source.runtime.externalProgress.recordToolResult();
      source.markResultDelivered(request.callId);
    }
    const browserOutcome = await source.browserOutcome;
    if (browserOutcome.type === "error") throw browserOutcome.error;
    // The retained checkpoint message must not race the helper's /turn/end handshake for the
    // just-completed response. Physical settlement retains the same tab before it is rebound.
    await source.physicalSettlement;
    const instructionDelivered =
      outstanding.length > 0 || broker.compactionDeliveryCount(token) > 0;
    if (!instructionDelivered) return undefined;
    const summary = browserOutcome.answer.trim();
    if (!summary)
      throw new Error("The active ChatGPT response returned an empty compaction summary");
    return summary;
  } finally {
    if (token) await broker.revoke(token);
  }
}

export const MAX_COMPACTION_HANDOFF_TIMEOUT_MS = 5 * 60_000;

function boundedCompactionTimeout(timeoutMs: number): number {
  return Math.min(timeoutMs, MAX_COMPACTION_HANDOFF_TIMEOUT_MS);
}

export async function requestRetainedCompactionHandoff(
  worker: ChatGptBrowserWorker,
  parsed: CodexParsedRequest,
  source: ChatGptTurnSession,
  broker: TurnBroker,
  capabilities: ChatGptWebCapabilities,
  traceId: string,
  signal?: AbortSignal,
  timeoutMs = MAX_COMPACTION_HANDOFF_TIMEOUT_MS
): Promise<string> {
  const conversationKey = source.conversationKey();
  if (!conversationKey)
    throw new Error("The completed ChatGPT source has no retained conversation identity");
  const transaction = await broker.beginCompactionTransaction(
    traceId,
    boundedCompactionTimeout(timeoutMs)
  );
  const instruction = structuredCompactionHandoffInstruction(transaction);
  const prepare = async () => ({ text: instruction, images: [], files: [], release: () => {} });
  const browserAbort = new AbortController();
  const abortBrowser = () => browserAbort.abort(signal?.reason);
  let browser: Promise<string> | undefined;
  if (signal?.aborted) abortBrowser();
  else signal?.addEventListener("abort", abortBrowser, { once: true });
  try {
    browser = worker.run({
      traceId,
      modelId: parsed.modelId,
      reasoning: parsed.options.reasoning,
      // The retained connector exposes only the one-shot control token embedded above. It does
      // not receive an ordinary Codex tool environment for this checkpoint message.
      capabilities: { ...capabilities, localToolsEnabled: false },
      nativeConnector: true,
      prepare,
      prepareResume: prepare,
      conversationKey,
      requireRetainedConversation: true,
      abortSignal: browserAbort.signal,
      onTextDelta: () => {},
    });
    const [summary] = await Promise.all([
      broker.waitForCompactionHandoff(transaction.token, signal),
      browser,
    ]);
    return summary;
  } finally {
    browserAbort.abort();
    broker.abortCompactionTransaction(transaction.token);
    if (browser)
      await browser.then(
        () => undefined,
        () => undefined
      );
    signal?.removeEventListener("abort", abortBrowser);
  }
}

interface CachedCompactionRun {
  createdAt: number;
  promise: Promise<string>;
}

const structuredCompactionRuns = new Map<string, CachedCompactionRun>();
const STRUCTURED_COMPACTION_RUN_TTL_MS = 30 * 60_000;

function pruneStructuredCompactionRuns(): void {
  const cutoff = Date.now() - STRUCTURED_COMPACTION_RUN_TTL_MS;
  for (const [candidate, run] of structuredCompactionRuns) {
    if (run.createdAt < cutoff) structuredCompactionRuns.delete(candidate);
  }
}

/** Return the canonical result of an exact compact request, even after its source was retired. */
export function existingStructuredCompactionRun(key: string): Promise<string> | undefined {
  pruneStructuredCompactionRuns();
  return structuredCompactionRuns.get(key)?.promise;
}

export function runStructuredCompactionOnce(
  key: string,
  start: () => Promise<string>
): Promise<string> {
  pruneStructuredCompactionRuns();
  const existing = structuredCompactionRuns.get(key);
  if (existing) return existing.promise;
  const promise = Promise.resolve().then(start);
  structuredCompactionRuns.set(key, { createdAt: Date.now(), promise });
  return promise;
}
