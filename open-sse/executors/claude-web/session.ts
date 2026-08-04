import { createHash, randomUUID } from "crypto";
import { z } from "zod";

import type { ProviderCredentials } from "../base.ts";
import {
  transformToClaude,
  type ClaudeWebOperation,
  type ClaudeWebRequestPayload,
  type ClaudeWebTurnFields,
} from "./payload.ts";

const CLAUDE_WEB_SESSION_TTL_MS = 30 * 60 * 1000;
const CLAUDE_WEB_SESSION_MAX = 5000;
const RECOVERY_PROMPT_HEADER =
  "Conversation context supplied by the caller follows. These serialized role blocks are not " +
  "native Claude Web message fields. Continue from the final user message.";

type NormalizedMessage = {
  role: string;
  content: string;
};

type CachedClaudeWebConversation = {
  accountScope: string;
  conversationId: string;
  parentMessageUuid: string;
  expiresAt: number;
};

const conversationCache = new Map<string, CachedClaudeWebConversation>();
let testNow: number | null = null;

function isValidTimezone(value: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value }).format(0);
    return true;
  } catch {
    return false;
  }
}

function canonicalLocale(value: string): string | null {
  try {
    return Intl.getCanonicalLocales(value)[0] ?? null;
  } catch {
    return null;
  }
}

const claudeWebExtensionSchema = z
  .object({
    operation: z.enum(["completion", "retry"]).default("completion"),
    conversation_id: z.string().uuid().optional(),
    parent_message_uuid: z.string().uuid().optional(),
    timezone: z.string().min(1).max(128).refine(isValidTimezone).optional(),
    locale: z
      .string()
      .min(1)
      .max(64)
      .refine((value) => canonicalLocale(value) !== null)
      .optional(),
    tool_states: z.array(z.unknown()).max(128).optional(),
  })
  .strict();

type ClaudeWebExtension = z.infer<typeof claudeWebExtensionSchema>;

export interface PrepareClaudeWebTurnInput {
  body: Record<string, unknown>;
  model: string;
  credentials: ProviderCredentials;
  organizationId: string;
  normalizedCookie: string;
}

export interface PreparedClaudeWebTurn {
  operation: ClaudeWebOperation;
  conversationId: string;
  assistantMessageUuid: string;
  parentMessageUuid?: string;
  accountScope: string;
  pageUrl: string;
  endpointSuffix: "completion" | "retry_completion";
  payload: ClaudeWebRequestPayload;
  responseMetadata: Record<string, string>;
  /** @internal Canonical request state used only to commit a completed turn. */
  commitTranscript: ReadonlyArray<NormalizedMessage>;
  /** @internal Cache entry that supplied this turn's continuation state. */
  sourceCacheKey?: string;
}

function now(): number {
  return testNow ?? Date.now();
}

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) {
    if (content && typeof content === "object") {
      const record = content as Record<string, unknown>;
      if (typeof record.text === "string") return record.text;
      if ("content" in record) return normalizeContent(record.content);
    }
    return "";
  }

  return content
    .map((part) => {
      if (typeof part === "string") return part;
      if (!part || typeof part !== "object" || Array.isArray(part)) return "";
      const record = part as Record<string, unknown>;
      if (typeof record.text === "string") return record.text;
      if ("content" in record) return normalizeContent(record.content);
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

function normalizeMessages(body: Record<string, unknown>): NormalizedMessage[] {
  if (!Array.isArray(body.messages)) return [];
  const normalized: NormalizedMessage[] = [];
  for (const candidate of body.messages) {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) continue;
    const message = candidate as Record<string, unknown>;
    if (typeof message.role !== "string" || !message.role.trim()) continue;
    normalized.push({
      role: message.role.trim().toLowerCase(),
      content: normalizeContent(message.content),
    });
  }
  return normalized;
}

function canonicalizeTranscript(messages: ReadonlyArray<NormalizedMessage>): string {
  return messages
    .map(
      ({ role, content }) =>
        `${role.length}:${role}${String.fromCharCode(30)}${content.length}:${content}`
    )
    .join(String.fromCharCode(31));
}

function makeAccountScope(input: PrepareClaudeWebTurnInput): string {
  const connectionId = input.credentials.connectionId?.trim();
  const credentialScope = connectionId
    ? `connection:${connectionId}`
    : `cookie:${hash(input.normalizedCookie)}`;
  return hash(
    `${credentialScope}${String.fromCharCode(31)}${input.organizationId}${String.fromCharCode(31)}${input.model}`
  );
}

function makeCacheKey(accountScope: string, messages: ReadonlyArray<NormalizedMessage>): string {
  return hash(`${accountScope}${String.fromCharCode(31)}${canonicalizeTranscript(messages)}`);
}

function lookupCache(key: string): CachedClaudeWebConversation | null {
  const entry = conversationCache.get(key);
  if (!entry) return null;
  if (now() >= entry.expiresAt) {
    conversationCache.delete(key);
    return null;
  }
  return entry;
}

function pruneExpiredEntries(): void {
  const currentTime = now();
  for (const [key, entry] of conversationCache) {
    if (currentTime >= entry.expiresAt) conversationCache.delete(key);
  }
}

function rememberCache(key: string, entry: Omit<CachedClaudeWebConversation, "expiresAt">): void {
  pruneExpiredEntries();
  if (conversationCache.has(key)) conversationCache.delete(key);
  while (conversationCache.size >= CLAUDE_WEB_SESSION_MAX) {
    const oldestKey = conversationCache.keys().next().value;
    if (typeof oldestKey !== "string") break;
    conversationCache.delete(oldestKey);
  }
  conversationCache.set(key, {
    ...entry,
    expiresAt: now() + CLAUDE_WEB_SESSION_TTL_MS,
  });
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildRecoveryPrompt(messages: ReadonlyArray<NormalizedMessage>): string {
  const blocks = messages.map(
    ({ role, content }) => `<message role="${escapeXml(role)}">\n${escapeXml(content)}\n</message>`
  );
  return `${RECOVERY_PROMPT_HEADER}\n\n${blocks.join("\n\n")}`;
}

function readExtension(body: Record<string, unknown>): ClaudeWebExtension {
  return claudeWebExtensionSchema.parse(body.claude_web ?? {});
}

function readProviderString(credentials: ProviderCredentials, key: string): string | undefined {
  const value = credentials.providerSpecificData?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function resolveTimezone(extension: ClaudeWebExtension, credentials: ProviderCredentials): string {
  if (extension.timezone) return extension.timezone;
  const providerTimezone = readProviderString(credentials, "timezone");
  if (providerTimezone && isValidTimezone(providerTimezone)) return providerTimezone;
  const runtimeTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return runtimeTimezone && isValidTimezone(runtimeTimezone) ? runtimeTimezone : "UTC";
}

function resolveLocale(extension: ClaudeWebExtension, credentials: ProviderCredentials): string {
  if (extension.locale) return canonicalLocale(extension.locale) ?? "en-US";
  const providerLocale = readProviderString(credentials, "locale");
  const canonicalProviderLocale = providerLocale ? canonicalLocale(providerLocale) : null;
  if (canonicalProviderLocale) return canonicalProviderLocale;
  const runtimeLocale = Intl.DateTimeFormat().resolvedOptions().locale;
  return (runtimeLocale && canonicalLocale(runtimeLocale)) || "en-US";
}

function readLegacyConversationId(credentials: ProviderCredentials): string | undefined {
  const candidate = (credentials as ProviderCredentials & { conversationId?: unknown })
    .conversationId;
  return typeof candidate === "string" && candidate.trim() ? candidate.trim() : undefined;
}

function latestUserIndex(messages: ReadonlyArray<NormalizedMessage>): number {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === "user") return index;
  }
  return -1;
}

function retryCommitTranscript(messages: ReadonlyArray<NormalizedMessage>): NormalizedMessage[] {
  const copy = messages.map((message) => ({ ...message }));
  if (copy.at(-1)?.role === "assistant") copy.pop();
  return copy;
}

interface PrepareTurnContext {
  extension: ClaudeWebExtension;
  messages: NormalizedMessage[];
  accountScope: string;
  timezone: string;
  locale: string;
  explicitConversationId?: string;
  explicitParentMessageUuid?: string;
  assistantMessageUuid: string;
}

function prepareTurnContext(input: PrepareClaudeWebTurnInput): PrepareTurnContext {
  const extension = readExtension(input.body);
  return {
    extension,
    messages: normalizeMessages(input.body),
    accountScope: makeAccountScope(input),
    timezone: resolveTimezone(extension, input.credentials),
    locale: resolveLocale(extension, input.credentials),
    explicitConversationId:
      extension.conversation_id ?? readLegacyConversationId(input.credentials),
    explicitParentMessageUuid: extension.parent_message_uuid,
    assistantMessageUuid: randomUUID(),
  };
}

function prepareRetryTurn(
  input: PrepareClaudeWebTurnInput,
  context: PrepareTurnContext
): PreparedClaudeWebTurn {
  const retryKey = makeCacheKey(context.accountScope, context.messages);
  const cached = lookupCache(retryKey);
  const conversationId = context.explicitConversationId ?? cached?.conversationId;
  const parentMessageUuid = context.explicitParentMessageUuid ?? cached?.parentMessageUuid;
  if (!conversationId || !parentMessageUuid) {
    throw new Error("Claude Web retry requires both conversation and parent message state");
  }

  const operation: ClaudeWebOperation = "retry_completion";
  const turnFields: ClaudeWebTurnFields = {
    operation,
    prompt: "",
    timezone: context.timezone,
    locale: context.locale,
    parentMessageUuid,
    assistantMessageUuid: context.assistantMessageUuid,
    isNewConversation: false,
    toolStates: context.extension.tool_states,
  };
  const responseMetadata = {
    operation,
    conversation_id: conversationId,
    parent_message_uuid: parentMessageUuid,
    assistant_message_uuid: context.assistantMessageUuid,
  };

  return {
    operation,
    conversationId,
    assistantMessageUuid: context.assistantMessageUuid,
    parentMessageUuid,
    accountScope: context.accountScope,
    pageUrl: `https://claude.ai/chat/${encodeURIComponent(conversationId)}`,
    endpointSuffix: "retry_completion",
    payload: transformToClaude(input.body, input.model, turnFields),
    responseMetadata,
    commitTranscript: retryCommitTranscript(context.messages),
    ...(cached ? { sourceCacheKey: retryKey } : {}),
  };
}

interface CompletionConversationState {
  conversationId: string;
  parentMessageUuid?: string;
  isNewConversation: boolean;
  sourceCacheKey?: string;
}

function resolveCompletionConversation(
  context: PrepareTurnContext,
  userIndex: number
): CompletionConversationState {
  const lookupKey = makeCacheKey(context.accountScope, context.messages.slice(0, userIndex));
  const cached = lookupCache(lookupKey);
  const cacheMatchesExplicitConversation =
    !context.explicitConversationId || cached?.conversationId === context.explicitConversationId;
  const cachedParent = cacheMatchesExplicitConversation ? cached?.parentMessageUuid : undefined;
  const conversationId = context.explicitConversationId ?? cached?.conversationId ?? randomUUID();
  const parentMessageUuid = context.explicitParentMessageUuid ?? cachedParent;

  if (
    context.explicitParentMessageUuid &&
    !context.explicitConversationId &&
    !cached?.conversationId
  ) {
    throw new Error("Claude Web parent message state requires a conversation");
  }

  return {
    conversationId,
    parentMessageUuid,
    isNewConversation: !parentMessageUuid,
    ...(cached && cacheMatchesExplicitConversation ? { sourceCacheKey: lookupKey } : {}),
  };
}

function prepareCompletionTurn(
  input: PrepareClaudeWebTurnInput,
  context: PrepareTurnContext
): PreparedClaudeWebTurn {
  const userIndex = latestUserIndex(context.messages);
  if (userIndex < 0 || !context.messages[userIndex].content.trim()) {
    throw new Error("No user message found in request");
  }

  const conversation = resolveCompletionConversation(context, userIndex);
  const prompt =
    conversation.isNewConversation && context.messages.length > 1
      ? buildRecoveryPrompt(context.messages)
      : context.messages[userIndex].content;
  const humanMessageUuid = randomUUID();
  const operation: ClaudeWebOperation = "completion";
  const turnFields: ClaudeWebTurnFields = {
    operation,
    prompt,
    timezone: context.timezone,
    locale: context.locale,
    parentMessageUuid: conversation.parentMessageUuid,
    humanMessageUuid,
    assistantMessageUuid: context.assistantMessageUuid,
    isNewConversation: conversation.isNewConversation,
    toolStates: context.extension.tool_states,
  };
  const responseMetadata = {
    operation,
    conversation_id: conversation.conversationId,
    ...(conversation.parentMessageUuid
      ? { parent_message_uuid: conversation.parentMessageUuid }
      : {}),
    assistant_message_uuid: context.assistantMessageUuid,
  };

  return {
    operation,
    conversationId: conversation.conversationId,
    assistantMessageUuid: context.assistantMessageUuid,
    ...(conversation.parentMessageUuid
      ? { parentMessageUuid: conversation.parentMessageUuid }
      : {}),
    accountScope: context.accountScope,
    pageUrl: conversation.isNewConversation
      ? "https://claude.ai/new"
      : `https://claude.ai/chat/${encodeURIComponent(conversation.conversationId)}`,
    endpointSuffix: "completion",
    payload: transformToClaude(input.body, input.model, turnFields),
    responseMetadata,
    commitTranscript: context.messages.map((message) => ({ ...message })),
    ...(conversation.sourceCacheKey ? { sourceCacheKey: conversation.sourceCacheKey } : {}),
  };
}

export function prepareClaudeWebTurn(input: PrepareClaudeWebTurnInput): PreparedClaudeWebTurn {
  const context = prepareTurnContext(input);
  return context.extension.operation === "retry"
    ? prepareRetryTurn(input, context)
    : prepareCompletionTurn(input, context);
}

export function commitClaudeWebTurn(turn: PreparedClaudeWebTurn, assistantText: string): void {
  const completedTranscript = [
    ...turn.commitTranscript.map((message) => ({ ...message })),
    { role: "assistant", content: assistantText },
  ];
  const cacheKey = makeCacheKey(turn.accountScope, completedTranscript);
  if (turn.operation === "retry_completion" && turn.sourceCacheKey) {
    conversationCache.delete(turn.sourceCacheKey);
  }
  rememberCache(cacheKey, {
    accountScope: turn.accountScope,
    conversationId: turn.conversationId,
    parentMessageUuid: turn.assistantMessageUuid,
  });
}

export function invalidateClaudeWebTurn(
  turn: PreparedClaudeWebTurn,
  scope: "turn" | "conversation" = "turn"
): void {
  // A failed in-flight branch has not committed cache state, so its normal
  // invalidation is intentionally a no-op. Authentication failures are the
  // only callers that invalidate every cached branch for the conversation.
  if (scope === "turn") return;
  for (const [key, entry] of conversationCache) {
    if (entry.accountScope === turn.accountScope && entry.conversationId === turn.conversationId) {
      conversationCache.delete(key);
    }
  }
}

export function __resetClaudeWebSessionForTesting(): void {
  conversationCache.clear();
}

export function __setClaudeWebSessionNowForTesting(value: number | null): void {
  testNow = value;
}
