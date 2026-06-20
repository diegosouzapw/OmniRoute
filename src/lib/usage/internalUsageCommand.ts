import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";
import {
  buildApiKeyUsageLimitText,
  type ApiKeyUsageLimitStatus,
} from "@/lib/usage/apiKeyUsageLimits";

export const INTERNAL_USAGE_COMMAND = "@@om-usage";
export const USAGE_COMMAND_DISABLED_MESSAGE = "Usage command is disabled for this API key.";
const USAGE_COMMAND_AUTH_REQUIRED_MESSAGE = "Usage command requires an authenticated API key.";
const LOCAL_USAGE_MODEL = "omniroute/local-usage";

type JsonRecord = Record<string, unknown>;

interface UsageCommandApiKeyMetadata {
  id: string;
  name?: string;
  allowedConnections?: string[] | null;
  allowUsageCommand?: boolean;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
}

interface ProviderConnectionLike {
  id: string;
  provider: string;
  isActive?: boolean;
}

interface UsageSnapshot {
  connectionId: string;
  provider: string;
  plan: unknown;
  quotas: JsonRecord;
}

export interface InternalUsageCommandDeps {
  now?: () => number;
  isValidApiKey?: (apiKey: string) => Promise<boolean>;
  getApiKeyMetadata?: (apiKey: string) => Promise<UsageCommandApiKeyMetadata | null>;
  getProviderConnectionById?: (connectionId: string) => Promise<unknown>;
  getProviderConnections?: (filter?: JsonRecord) => Promise<unknown[]>;
  getProviderLimitsCache?: (connectionId: string) => ProviderLimitsCacheEntry | null;
  getAllProviderLimitsCache?: () => Record<string, ProviderLimitsCacheEntry>;
  getApiKeyUsageLimitStatus?: (
    metadata: UsageCommandApiKeyMetadata,
    deps?: { now?: () => number }
  ) => Promise<ApiKeyUsageLimitStatus>;
}

type RequiredDeps = Required<InternalUsageCommandDeps>;

async function normalizeDeps(deps: InternalUsageCommandDeps = {}): Promise<RequiredDeps> {
  const auth = deps.isValidApiKey ? null : await import("@/sse/services/auth");
  const apiKeys = deps.getApiKeyMetadata ? null : await import("@/lib/db/apiKeys");
  const providers =
    deps.getProviderConnectionById && deps.getProviderConnections
      ? null
      : await import("@/lib/db/providers");
  const providerLimits =
    deps.getProviderLimitsCache && deps.getAllProviderLimitsCache
      ? null
      : await import("@/lib/db/providerLimits");
  const usageLimits = deps.getApiKeyUsageLimitStatus
    ? null
    : await import("@/lib/usage/apiKeyUsageLimits");

  return {
    now: deps.now ?? Date.now,
    isValidApiKey: deps.isValidApiKey ?? auth!.isValidApiKey,
    getApiKeyMetadata: deps.getApiKeyMetadata ?? apiKeys!.getApiKeyMetadata,
    getProviderConnectionById:
      deps.getProviderConnectionById ?? providers!.getProviderConnectionById,
    getProviderConnections: deps.getProviderConnections ?? providers!.getProviderConnections,
    getProviderLimitsCache: deps.getProviderLimitsCache ?? providerLimits!.getProviderLimitsCache,
    getAllProviderLimitsCache:
      deps.getAllProviderLimitsCache ?? providerLimits!.getAllProviderLimitsCache,
    getApiKeyUsageLimitStatus:
      deps.getApiKeyUsageLimitStatus ?? usageLimits!.getApiKeyUsageLimitStatus,
  };
}

function isRecord(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function readHeader(request: Request, name: string): string | null {
  return request.headers.get(name) || request.headers.get(name.toLowerCase());
}

function readPathScopedToken(request: Request): string | null {
  try {
    const url = new URL(request.url, "http://localhost");
    const segments = url.pathname
      .split("/")
      .map((segment) => segment.trim())
      .filter(Boolean);

    if (segments[0] === "vscode" && segments[1]) {
      return decodeURIComponent(segments[1]).trim() || null;
    }

    if (segments[0] === "api" && segments[1] === "v1" && segments[2] === "vscode") {
      const tokenIndex = segments[3] === "raw" || segments[3] === "combos" ? 4 : 3;
      if (segments[tokenIndex]) return decodeURIComponent(segments[tokenIndex]).trim() || null;
    }
  } catch {
    return null;
  }

  return null;
}

function extractUsageCommandApiKey(request: Request): string | null {
  const authHeader = readHeader(request, "Authorization");
  if (authHeader) {
    const trimmed = authHeader.trim();
    if (trimmed.toLowerCase().startsWith("bearer ")) return trimmed.slice(7).trim() || null;
  }

  if (readHeader(request, "anthropic-version")) {
    const xApiKey = readHeader(request, "x-api-key");
    if (xApiKey?.trim()) return xApiKey.trim();
  }

  return readPathScopedToken(request);
}

function toNumber(value: unknown, fallback = Number.NaN): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function textFromContent(content: unknown): string | null {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    const parts: string[] = [];
    for (const part of content) {
      if (typeof part === "string") {
        parts.push(part);
        continue;
      }
      if (!isRecord(part)) continue;
      const text = part.text ?? part.content;
      if (typeof text === "string") parts.push(text);
    }
    return parts.length > 0 ? parts.join("") : null;
  }

  if (isRecord(content)) {
    const text = content.text ?? content.content;
    return typeof text === "string" ? text : null;
  }

  return null;
}

function extractLastRoleText(items: unknown, role: string): string | null {
  if (!Array.isArray(items)) return null;

  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    if (!isRecord(item) || item.role !== role) continue;
    return textFromContent(item.content);
  }

  return null;
}

export function extractLastUserText(body: unknown): string | null {
  if (!isRecord(body)) return null;

  const messagesText = extractLastRoleText(body.messages, "user");
  if (messagesText !== null) return messagesText;

  if (typeof body.input === "string") return body.input;

  const inputText = extractLastRoleText(body.input, "user");
  if (inputText !== null) return inputText;

  return null;
}

export function isInternalUsageCommand(text: string | null | undefined): boolean {
  return typeof text === "string" && text.trim() === INTERNAL_USAGE_COMMAND;
}

function connectionFromValue(value: unknown): ProviderConnectionLike | null {
  if (!isRecord(value)) return null;
  const id = typeof value.id === "string" ? value.id : "";
  const provider = typeof value.provider === "string" ? value.provider : "";
  if (!id || !provider || value.isActive === false) return null;
  return { id, provider, isActive: value.isActive === true };
}

function snapshotFromConnection(
  connection: ProviderConnectionLike,
  cache: ProviderLimitsCacheEntry | null
): UsageSnapshot | null {
  if (!cache || !isRecord(cache.quotas) || Object.keys(cache.quotas).length === 0) return null;
  return {
    connectionId: connection.id,
    provider: connection.provider,
    plan: cache.plan,
    quotas: cache.quotas,
  };
}

async function collectUsageSnapshots(
  metadata: UsageCommandApiKeyMetadata,
  deps: RequiredDeps
): Promise<UsageSnapshot[]> {
  const allowedConnections = Array.isArray(metadata.allowedConnections)
    ? metadata.allowedConnections.filter((id) => typeof id === "string" && id.trim())
    : [];

  if (allowedConnections.length > 0) {
    const snapshots: UsageSnapshot[] = [];
    for (const connectionId of allowedConnections) {
      const connection = connectionFromValue(await deps.getProviderConnectionById(connectionId));
      if (!connection) continue;
      const snapshot = snapshotFromConnection(
        connection,
        deps.getProviderLimitsCache(connection.id)
      );
      if (snapshot) snapshots.push(snapshot);
    }
    return snapshots;
  }

  const caches = deps.getAllProviderLimitsCache();
  const connections = await deps.getProviderConnections({ isActive: true });
  const snapshots: UsageSnapshot[] = [];
  for (const rawConnection of connections) {
    const connection = connectionFromValue(rawConnection);
    if (!connection) continue;
    const snapshot = snapshotFromConnection(connection, caches[connection.id] ?? null);
    if (snapshot) snapshots.push(snapshot);
  }
  return snapshots;
}

function normalizeQuotaKey(key: string): string {
  return key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function findQuota(quotas: JsonRecord, kind: "session" | "weekly" | "weekly-sonnet") {
  const entries = Object.entries(quotas).filter(([, value]) => isRecord(value));

  for (const [key, value] of entries) {
    const normalized = normalizeQuotaKey(key);
    if (kind === "session" && (normalized.includes("session") || normalized.includes("5h"))) {
      return value as JsonRecord;
    }
    if (
      kind === "weekly-sonnet" &&
      normalized.includes("weekly") &&
      normalized.includes("sonnet")
    ) {
      return value as JsonRecord;
    }
    if (
      kind === "weekly" &&
      (normalized === "weekly" || normalized.includes("weekly") || normalized.includes("7d")) &&
      !normalized.includes("sonnet")
    ) {
      return value as JsonRecord;
    }
  }

  return null;
}

function getQuotaUsedPercent(quota: JsonRecord | null): number | null {
  if (!quota) return null;

  const usedPercentage = toNumber(quota.usedPercentage);
  if (Number.isFinite(usedPercentage)) return Math.max(0, Math.min(100, usedPercentage));

  const used = toNumber(quota.used);
  const total = toNumber(quota.total);
  if (Number.isFinite(used) && Number.isFinite(total) && total > 0) {
    return Math.max(0, Math.min(100, (used / total) * 100));
  }

  if (Number.isFinite(used) && used >= 0 && used <= 100) {
    return used;
  }

  const remainingPercentage = toNumber(quota.remainingPercentage);
  if (Number.isFinite(remainingPercentage)) {
    return Math.max(0, Math.min(100, 100 - remainingPercentage));
  }

  const remaining = toNumber(quota.remaining);
  if (Number.isFinite(remaining) && remaining >= 0 && remaining <= 100) {
    return Math.max(0, Math.min(100, 100 - remaining));
  }

  return null;
}

function getResetAt(quota: JsonRecord | null): string | null {
  if (!quota) return null;
  return typeof quota.resetAt === "string" && quota.resetAt.trim() ? quota.resetAt : null;
}

function formatPercent(percent: number | null): string {
  if (percent === null || !Number.isFinite(percent)) return "Unavailable";
  return `${Math.round(percent)}%`;
}

export function formatResetIn(resetAt: string | null, now = Date.now()): string {
  if (!resetAt) return "unknown";
  const resetMs = Date.parse(resetAt);
  if (!Number.isFinite(resetMs)) return "unknown";

  const deltaMs = resetMs - now;
  if (deltaMs <= 0) return "now";

  const minuteMs = 60_000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;

  if (deltaMs < hourMs) return `${Math.max(1, Math.ceil(deltaMs / minuteMs))}m`;
  if (deltaMs < dayMs) return `${Math.max(1, Math.ceil(deltaMs / hourMs))}h`;
  return `${Math.max(1, Math.ceil(deltaMs / dayMs))}d`;
}

function formatPlan(plan: unknown): string {
  if (typeof plan === "string" && plan.trim()) return plan.trim();
  if (typeof plan === "number" && Number.isFinite(plan)) return String(plan);
  return "Unavailable";
}

function snapshotScore(snapshot: UsageSnapshot): number {
  let score = snapshot.provider === "claude" ? 100 : 0;
  if (findQuota(snapshot.quotas, "session")) score += 10;
  if (findQuota(snapshot.quotas, "weekly")) score += 10;
  if (findQuota(snapshot.quotas, "weekly-sonnet")) score += 10;
  if (formatPlan(snapshot.plan) !== "Unavailable") score += 1;
  return score;
}

function selectUsageSnapshot(snapshots: UsageSnapshot[]): UsageSnapshot | null {
  let selected: UsageSnapshot | null = null;
  let bestScore = -1;
  for (const snapshot of snapshots) {
    const score = snapshotScore(snapshot);
    if (score > bestScore) {
      selected = snapshot;
      bestScore = score;
    }
  }
  return selected;
}

function appendQuotaBlock(lines: string[], label: string, quota: JsonRecord | null, now: number) {
  lines.push(label);
  lines.push(formatPercent(getQuotaUsedPercent(quota)));
  lines.push(`Resets in ${formatResetIn(getResetAt(quota), now)}`);
}

export async function buildUsageCommandText(
  metadata: UsageCommandApiKeyMetadata,
  deps: InternalUsageCommandDeps = {}
): Promise<string> {
  const resolvedDeps = await normalizeDeps(deps);
  if (metadata.usageLimitEnabled === true) {
    return buildApiKeyUsageLimitText(
      await resolvedDeps.getApiKeyUsageLimitStatus(metadata, { now: resolvedDeps.now })
    );
  }

  const snapshot = selectUsageSnapshot(await collectUsageSnapshots(metadata, resolvedDeps));

  if (!snapshot) {
    return ["Plan", "Unavailable", "", "Usage", "No cached usage data available."].join("\n");
  }

  const now = resolvedDeps.now();
  const lines = ["Plan", formatPlan(snapshot.plan), "", "Usage"];
  appendQuotaBlock(lines, "Session (5hr)", findQuota(snapshot.quotas, "session"), now);
  lines.push("");
  appendQuotaBlock(lines, "Weekly (7 day)", findQuota(snapshot.quotas, "weekly"), now);
  lines.push("");
  appendQuotaBlock(lines, "Weekly Sonnet", findQuota(snapshot.quotas, "weekly-sonnet"), now);
  return lines.join("\n");
}

function getResponseModel(body: unknown): string {
  return isRecord(body) && typeof body.model === "string" && body.model.trim()
    ? body.model
    : LOCAL_USAGE_MODEL;
}

function isAnthropicRequest(request: Request): boolean {
  if (request.headers.has("anthropic-version")) return true;
  try {
    return new URL(request.url).pathname.endsWith("/v1/messages");
  } catch {
    return false;
  }
}

function textEncoderStream(payload: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(payload));
      controller.close();
    },
  });
}

function createOpenAITextResponse(text: string, body: unknown): Response {
  const created = Math.floor(Date.now() / 1000);
  const model = getResponseModel(body);
  const payload = {
    id: `chatcmpl_usage_${created}`,
    object: "chat.completion",
    created,
    model,
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: text },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
  return Response.json(payload);
}

function createOpenAIStreamResponse(text: string, body: unknown): Response {
  const created = Math.floor(Date.now() / 1000);
  const model = getResponseModel(body);
  const id = `chatcmpl_usage_${created}`;
  const first = {
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: { role: "assistant", content: text }, finish_reason: null }],
  };
  const second = {
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
  };
  return new Response(
    textEncoderStream(
      `data: ${JSON.stringify(first)}\n\ndata: ${JSON.stringify(second)}\n\ndata: [DONE]\n\n`
    ),
    { headers: { "Content-Type": "text/event-stream; charset=utf-8" } }
  );
}

function createAnthropicTextResponse(text: string, body: unknown): Response {
  const payload = {
    id: `msg_usage_${Date.now()}`,
    type: "message",
    role: "assistant",
    model: getResponseModel(body),
    content: [{ type: "text", text }],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: { input_tokens: 0, output_tokens: 0 },
  };
  return Response.json(payload);
}

function createAnthropicStreamResponse(text: string, body: unknown): Response {
  const id = `msg_usage_${Date.now()}`;
  const model = getResponseModel(body);
  const events = [
    [
      "message_start",
      {
        type: "message_start",
        message: {
          id,
          type: "message",
          role: "assistant",
          model,
          content: [],
          stop_reason: null,
          stop_sequence: null,
          usage: { input_tokens: 0, output_tokens: 0 },
        },
      },
    ],
    [
      "content_block_start",
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    ],
    [
      "content_block_delta",
      { type: "content_block_delta", index: 0, delta: { type: "text_delta", text } },
    ],
    ["content_block_stop", { type: "content_block_stop", index: 0 }],
    [
      "message_delta",
      {
        type: "message_delta",
        delta: { stop_reason: "end_turn", stop_sequence: null },
        usage: { output_tokens: 0 },
      },
    ],
    ["message_stop", { type: "message_stop" }],
  ] as const;
  const payload = events
    .map(([event, data]) => `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
    .join("");
  return new Response(textEncoderStream(payload), {
    headers: { "Content-Type": "text/event-stream; charset=utf-8" },
  });
}

export function createLocalTextResponse(request: Request, body: unknown, text: string): Response {
  const stream = isRecord(body) && body.stream === true;
  if (isAnthropicRequest(request)) {
    return stream
      ? createAnthropicStreamResponse(text, body)
      : createAnthropicTextResponse(text, body);
  }
  return stream ? createOpenAIStreamResponse(text, body) : createOpenAITextResponse(text, body);
}

export async function handleInternalUsageCommand(
  request: Request,
  body: unknown,
  deps: InternalUsageCommandDeps = {}
): Promise<Response | null> {
  const lastUserText = extractLastUserText(body);
  if (!isInternalUsageCommand(lastUserText)) return null;

  const resolvedDeps = await normalizeDeps(deps);
  const apiKey = extractUsageCommandApiKey(request);
  if (!apiKey || !(await resolvedDeps.isValidApiKey(apiKey))) {
    return createLocalTextResponse(request, body, USAGE_COMMAND_AUTH_REQUIRED_MESSAGE);
  }

  const metadata = await resolvedDeps.getApiKeyMetadata(apiKey);
  if (!metadata?.id) {
    return createLocalTextResponse(request, body, USAGE_COMMAND_AUTH_REQUIRED_MESSAGE);
  }

  if (metadata.allowUsageCommand !== true) {
    return createLocalTextResponse(request, body, USAGE_COMMAND_DISABLED_MESSAGE);
  }

  return createLocalTextResponse(
    request,
    body,
    await buildUsageCommandText(metadata, resolvedDeps)
  );
}
