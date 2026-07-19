import {
  buildKimiCodeIdentityHeaders,
  getKimiCodeCliUserAgent,
  KIMI_CODING_ANTHROPIC_URL,
  KIMI_CODING_OPENAI_URL,
} from "../config/providers/registry/kimi/coding/runtime.ts";
import { FORMATS } from "../translator/formats.ts";
import { DefaultExecutor } from "./default.ts";
import type { ProviderCredentials } from "./base.ts";

type JsonRecord = Record<string, unknown>;
type KimiProtocol = "openai" | "claude";

const KIMI_CONTEXT_MANAGEMENT_BETA = "context-management-2025-06-27";

type KimiThinkingPolicy = {
  supportsThinking?: boolean;
  alwaysThinking?: boolean;
  supportedThinkingEfforts?: string[];
  defaultThinkingEffort?: string;
};

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function resolveKimiProtocol(
  credentials: ProviderCredentials | null | undefined,
  body?: unknown
): KimiProtocol {
  const targetFormat = credentials?.providerSpecificData?._omnirouteKimiTargetFormat;
  if (targetFormat === FORMATS.OPENAI) return "openai";
  if (targetFormat === FORMATS.CLAUDE) return "claude";

  const record = asRecord(body);
  if (
    record?.system !== undefined ||
    record?.output_config !== undefined ||
    record?.context_management !== undefined
  ) {
    return "claude";
  }
  return "openai";
}

function getThinkingPolicy(credentials: ProviderCredentials): KimiThinkingPolicy {
  return (asRecord(credentials.providerSpecificData?._omnirouteKimiThinking) ||
    {}) as KimiThinkingPolicy;
}

function normalizeEffort(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const effort = value.trim().toLowerCase();
  if (!effort) return null;
  if (effort === "none") return "off";
  if (effort === "auto") return "on";
  return effort;
}

function resolveRequestedEffort(body: JsonRecord): string | null {
  const direct = normalizeEffort(body.reasoning_effort);
  if (direct) return direct;
  const reasoning = asRecord(body.reasoning);
  const nested = normalizeEffort(reasoning?.effort);
  if (nested) return nested;
  const thinking = asRecord(body.thinking);
  if (thinking?.type === "disabled") return "off";
  if (thinking?.type === "enabled" || thinking?.type === "adaptive") {
    return normalizeEffort(thinking.effort) || "on";
  }
  return null;
}

function constrainEffort(effort: string, policy: KimiThinkingPolicy): string {
  if (effort === "off" || effort === "on") return effort;
  const supported = policy.supportedThinkingEfforts;
  if (!Array.isArray(supported)) return effort;
  if (supported.includes(effort)) return effort;
  return policy.defaultThinkingEffort && supported.includes(policy.defaultThinkingEffort)
    ? policy.defaultThinkingEffort
    : "on";
}

function applyThinkingPolicyDefaults(
  requestedEffort: string | null,
  policy: KimiThinkingPolicy
): string | null {
  let effort = requestedEffort;
  if (!effort && policy.defaultThinkingEffort) effort = policy.defaultThinkingEffort;
  if (policy.alwaysThinking && effort === "off") {
    effort = policy.defaultThinkingEffort || "on";
  }
  if (policy.alwaysThinking && !effort) effort = policy.defaultThinkingEffort || "on";
  return effort;
}

function buildOpenAIThinking(
  effort: string,
  currentThinking: unknown,
  policy: KimiThinkingPolicy
): JsonRecord {
  const constrained = constrainEffort(effort, policy);
  const previousKeep = asRecord(currentThinking)?.keep;
  if (constrained === "off") {
    return { type: "disabled", ...(previousKeep !== undefined ? { keep: previousKeep } : {}) };
  }
  return {
    type: "enabled",
    ...(constrained !== "on" ? { effort: constrained } : {}),
    keep: previousKeep ?? "all",
  };
}

function normalizeExistingOpenAIThinking(value: unknown): JsonRecord | null {
  const thinking = asRecord(value);
  if (!thinking) return null;
  const type = thinking.type === "adaptive" ? "enabled" : thinking.type;
  return {
    ...thinking,
    ...(type ? { type } : {}),
    ...(type && type !== "disabled" && thinking.keep === undefined ? { keep: "all" } : {}),
  };
}

function applyOpenAIThinking(body: JsonRecord, policy: KimiThinkingPolicy): void {
  const requestedEffort = resolveRequestedEffort(body);
  delete body.reasoning_effort;
  delete body.reasoning;

  if (policy.supportsThinking === false) {
    delete body.thinking;
    return;
  }

  const effort = applyThinkingPolicyDefaults(requestedEffort, policy);
  if (effort) {
    body.thinking = buildOpenAIThinking(effort, body.thinking, policy);
    return;
  }

  const thinking = normalizeExistingOpenAIThinking(body.thinking);
  if (thinking) body.thinking = thinking;
}

function hasAssistantToolCalls(message: JsonRecord): boolean {
  return Array.isArray(message.tool_calls) && message.tool_calls.length > 0;
}

function backfillKimiReasoningContent(body: JsonRecord): JsonRecord {
  const thinking = asRecord(body.thinking);
  if (thinking?.keep !== "all" || thinking.type === "disabled" || !Array.isArray(body.messages)) {
    return body;
  }

  let changed = false;
  const messages = body.messages.map((message) => {
    const record = asRecord(message);
    if (
      !record ||
      record.role !== "assistant" ||
      !hasAssistantToolCalls(record) ||
      Object.hasOwn(record, "reasoning_content")
    ) {
      return message;
    }
    changed = true;
    return { ...record, reasoning_content: "" };
  });
  return changed ? { ...body, messages } : body;
}

function normalizeOpenAIRequest(
  body: JsonRecord,
  stream: boolean,
  policy: KimiThinkingPolicy
): JsonRecord {
  let next: JsonRecord = { ...body };
  if (next.max_completion_tokens === undefined && next.max_tokens !== undefined) {
    next.max_completion_tokens = next.max_tokens;
  }
  delete next.max_tokens;

  applyOpenAIThinking(next, policy);

  if (stream) {
    next.stream_options = {
      ...(asRecord(next.stream_options) || {}),
      include_usage: true,
    };
  }
  next = backfillKimiReasoningContent(next);
  return next;
}

function budgetToEffort(value: unknown): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (value <= 1024) return "low";
  if (value <= 10240) return "medium";
  return "high";
}

function removeClearThinkingEdit(body: JsonRecord): void {
  const contextManagement = asRecord(body.context_management);
  if (!contextManagement || !Array.isArray(contextManagement.edits)) return;
  const edits = contextManagement.edits.filter(
    (edit) => asRecord(edit)?.type !== "clear_thinking_20251015"
  );
  if (edits.length > 0) {
    body.context_management = { ...contextManagement, edits };
  } else {
    delete body.context_management;
    const betas = Array.isArray(body.betas)
      ? body.betas.filter((beta) => beta !== KIMI_CONTEXT_MANAGEMENT_BETA)
      : null;
    if (betas?.length) body.betas = betas;
    else if (betas) delete body.betas;
  }
}

function addClearThinkingKeep(body: JsonRecord): void {
  const contextManagement = asRecord(body.context_management) || {};
  const existingEdits = Array.isArray(contextManagement.edits) ? contextManagement.edits : [];
  body.context_management = {
    ...contextManagement,
    edits: [
      { type: "clear_thinking_20251015", keep: "all" },
      ...existingEdits.filter((edit) => asRecord(edit)?.type !== "clear_thinking_20251015"),
    ],
  };
  const betas = Array.isArray(body.betas) ? body.betas : [];
  body.betas = [
    ...betas.filter((beta) => beta !== KIMI_CONTEXT_MANAGEMENT_BETA),
    KIMI_CONTEXT_MANAGEMENT_BETA,
  ];
}

function backfillKimiAnthropicThinking(body: JsonRecord): void {
  if (!Array.isArray(body.messages)) return;
  body.messages = body.messages.map((message) => {
    const record = asRecord(message);
    if (record?.role !== "assistant" || !Array.isArray(record.content)) return message;
    const content = record.content;
    if (!content.some((block) => asRecord(block)?.type === "tool_use")) return message;
    if (
      content.some((block) => {
        const type = asRecord(block)?.type;
        return type === "thinking" || type === "redacted_thinking";
      })
    ) {
      return message;
    }
    return {
      ...record,
      content: [{ type: "thinking", thinking: "" }, ...content],
    };
  });
}

function firstNormalizedEffort(...values: unknown[]): string | null {
  for (const value of values) {
    const effort = normalizeEffort(value);
    if (effort) return effort;
  }
  return null;
}

function resolveAnthropicEffort(
  body: JsonRecord,
  existingThinking: JsonRecord | null,
  outputConfig: JsonRecord | null,
  policy: KimiThinkingPolicy
): string | null {
  const reasoning = asRecord(body.reasoning);
  let effort = firstNormalizedEffort(
    body.reasoning_effort,
    reasoning?.effort,
    outputConfig?.effort,
    existingThinking?.effort
  );
  if (!effort && existingThinking?.type === "disabled") effort = "off";
  if (!effort) effort = budgetToEffort(existingThinking?.budget_tokens);
  if (!effort && (existingThinking?.type === "enabled" || existingThinking?.type === "adaptive")) {
    effort = "on";
  }
  return applyThinkingPolicyDefaults(effort, policy);
}

function applyAnthropicEffort(
  body: JsonRecord,
  effort: string | null,
  outputConfig: JsonRecord | null,
  policy: KimiThinkingPolicy
): boolean {
  if (!effort) return false;

  const constrained = constrainEffort(effort, policy);
  if (constrained === "off") {
    body.thinking = { type: "disabled" };
    delete body.output_config;
    removeClearThinkingEdit(body);
    return true;
  }

  body.thinking = { type: "enabled" };
  if (constrained === "on") {
    delete body.output_config;
  } else {
    body.output_config = { ...(outputConfig || {}), effort: constrained };
  }
  addClearThinkingKeep(body);
  backfillKimiAnthropicThinking(body);
  return true;
}

function normalizeExistingAnthropicThinking(
  body: JsonRecord,
  existingThinking: JsonRecord | null
): void {
  if (!existingThinking) return;

  const type = existingThinking.type === "adaptive" ? "enabled" : existingThinking.type;
  body.thinking = { ...(type ? { type } : {}) };
  if (type === "disabled") {
    delete body.output_config;
    removeClearThinkingEdit(body);
  } else if (type === "enabled") {
    addClearThinkingKeep(body);
    backfillKimiAnthropicThinking(body);
  }
}

function normalizeAnthropicRequest(body: JsonRecord, policy: KimiThinkingPolicy): JsonRecord {
  const next: JsonRecord = { ...body };
  const existingThinking = asRecord(next.thinking);
  const outputConfig = asRecord(next.output_config);
  const effort = resolveAnthropicEffort(next, existingThinking, outputConfig, policy);
  delete next.reasoning_effort;
  delete next.reasoning;

  if (policy.supportsThinking === false) {
    delete next.thinking;
    delete next.output_config;
    removeClearThinkingEdit(next);
    return next;
  }

  if (applyAnthropicEffort(next, effort, outputConfig, policy)) return next;
  normalizeExistingAnthropicThinking(next, existingThinking);
  return next;
}

function deleteHeaders(headers: Record<string, string>, names: string[]): void {
  const blocked = new Set(names.map((name) => name.toLowerCase()));
  for (const name of Object.keys(headers)) {
    if (blocked.has(name.toLowerCase())) delete headers[name];
  }
}

export class KimiExecutor extends DefaultExecutor {
  constructor(provider = "kimi-coding") {
    super(provider);
  }

  buildUrl(
    model: string,
    stream: boolean,
    urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ): string {
    void model;
    void stream;
    void urlIndex;
    return resolveKimiProtocol(credentials) === "claude"
      ? KIMI_CODING_ANTHROPIC_URL
      : KIMI_CODING_OPENAI_URL;
  }

  buildHeaders(
    credentials: ProviderCredentials,
    stream = true,
    clientHeaders?: Record<string, string> | null
  ): Record<string, string> {
    const headers = super.buildHeaders(credentials, stream, clientHeaders);
    const protocol = resolveKimiProtocol(credentials);
    const token = headers["x-api-key"] || credentials.apiKey || credentials.accessToken || "";

    if (protocol === "claude") {
      deleteHeaders(headers, ["authorization"]);
      headers["x-api-key"] = token;
      headers["Anthropic-Version"] = "2023-06-01";
    } else {
      deleteHeaders(headers, ["x-api-key", "anthropic-version", "anthropic-beta"]);
      headers.Authorization = `Bearer ${token}`;
    }

    if (credentials.accessToken && !credentials.apiKey) {
      Object.assign(headers, buildKimiCodeIdentityHeaders(credentials.providerSpecificData || {}), {
        "User-Agent": getKimiCodeCliUserAgent(),
      });
    }
    return headers;
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const cleanedBody = super.transformRequest(model, body, stream, credentials);
    const record = asRecord(cleanedBody);
    if (!record) return cleanedBody;
    const policy = getThinkingPolicy(credentials);
    return resolveKimiProtocol(credentials, record) === "claude"
      ? normalizeAnthropicRequest(record, policy)
      : normalizeOpenAIRequest(record, stream, policy);
  }
}

export default KimiExecutor;
