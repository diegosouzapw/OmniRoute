import {
  cleanupExpiredHandoffs,
  hasActiveHandoff,
  type HandoffPayload,
  upsertHandoff,
} from "../../src/lib/db/contextHandoffs.ts";
import { estimateTokens } from "./contextManager.ts";
import { stripMarkdownCodeFence } from "../utils/aiSdkCompat.ts";

export const HANDOFF_WARNING_THRESHOLD = 0.85;
export const HANDOFF_EXHAUSTION_THRESHOLD = 0.95;

const MAX_HISTORY_TOKENS_FOR_SUMMARY = 8000;
const DEFAULT_MAX_MESSAGES_FOR_SUMMARY = 30;
const DEFAULT_SUMMARY_RESPONSE_TOKENS = 800;
const MAX_SUMMARY_LENGTH = 2000;
const MAX_TASK_PROGRESS_LENGTH = 1200;
const MAX_DECISIONS = 8;
const MAX_ENTITIES = 10;
const DEFAULT_TTL_MS = 5 * 60 * 60 * 1000;
const OMNI_MODEL_TAG_PATTERN = /(?:\\n|\n|\r)*<omniModel>[^<]+<\/omniModel>(?:\\n|\n|\r)*/g;
const inflightHandoffGenerations = new Set<string>();

const HANDOFF_PROMPT_TEMPLATE = `You are a context summarizer. Analyze the conversation below and generate a structured handoff summary.
This summary will be used to restore context when this conversation is moved to a new AI account.

CONVERSATION HISTORY:
{HISTORY}

Generate a JSON object with this exact structure:
{
  "summary": "A clear, dense summary of what has been discussed and accomplished (max 200 words). Focus on what the AI needs to know to continue seamlessly.",
  "keyDecisions": ["decision1", "decision2"],
  "taskProgress": "Current state of the task: what's done, what's pending, next steps",
  "activeEntities": ["file1.ts", "feature X", "topic Y"]
}

Important: Return ONLY the JSON object, no markdown, no explanation.`;

type MessageLike = {
  role?: string;
  content?: unknown;
};

export interface ContextRelayConfig {
  handoffModel?: string;
  handoffThreshold?: number;
  handoffProviders?: string[];
  maxMessagesForSummary?: number;
}

export interface ParsedHandoffContent {
  summary: string;
  keyDecisions: string[];
  taskProgress: string;
  activeEntities: string[];
}

export function resolveContextRelayConfig(
  config?: Record<string, unknown> | null
): Required<ContextRelayConfig> {
  const rawThreshold = Number(config?.handoffThreshold);
  const rawMaxMessages = Number(config?.maxMessagesForSummary);
  const hasExplicitProviders = Array.isArray(config?.handoffProviders);
  const handoffProviders = hasExplicitProviders
    ? (config?.handoffProviders as unknown[])
        .map((item) => (typeof item === "string" ? item.trim().toLowerCase() : ""))
        .filter(Boolean)
    : ["codex"];

  return {
    handoffModel:
      typeof config?.handoffModel === "string" && config.handoffModel.trim().length > 0
        ? config.handoffModel.trim()
        : "",
    handoffThreshold:
      Number.isFinite(rawThreshold) &&
      rawThreshold > 0 &&
      rawThreshold < HANDOFF_EXHAUSTION_THRESHOLD
        ? rawThreshold
        : HANDOFF_WARNING_THRESHOLD,
    handoffProviders: hasExplicitProviders ? handoffProviders : ["codex"],
    maxMessagesForSummary:
      Number.isFinite(rawMaxMessages) && rawMaxMessages >= 5 && rawMaxMessages <= 100
        ? Math.round(rawMaxMessages)
        : DEFAULT_MAX_MESSAGES_FOR_SUMMARY,
  };
}

function getInflightKey(sessionId: string, comboName: string): string {
  return `${sessionId}::${comboName}`;
}

function toTextContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((part) => {
      if (!part || typeof part !== "object") return "";
      if (typeof (part as Record<string, unknown>).text === "string") {
        return String((part as Record<string, unknown>).text);
      }
      if (typeof (part as Record<string, unknown>).content === "string") {
        return String((part as Record<string, unknown>).content);
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

function formatMessagesForPrompt(messages: MessageLike[]): string {
  return messages
    .map((message, index) => {
      const role = typeof message.role === "string" ? message.role : "unknown";
      const content = toTextContent(message.content).trim();
      if (!content) return "";
      return `[${index + 1}] ${role.toUpperCase()}:\n${content}`;
    })
    .filter(Boolean)
    .join("\n\n");
}

function selectMessagesForSummary(messages: MessageLike[], maxMessages: number): MessageLike[] {
  const recentMessages = messages.slice(-maxMessages);
  let working = [...recentMessages];

  while (working.length > 1) {
    const history = formatMessagesForPrompt(working);
    if (estimateTokens(history) <= MAX_HISTORY_TOKENS_FOR_SUMMARY) {
      return working;
    }
    working = working.slice(1);
  }

  return working;
}

function normalizeStringArray(value: unknown, maxItems: number, maxLength = 240): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .slice(0, maxItems)
    .map((item) => item.slice(0, maxLength));
}

function sanitizeJsonCandidate(content: string): string {
  return content.replace(OMNI_MODEL_TAG_PATTERN, "").trim();
}

function extractJsonCandidate(content: string): string {
  const stripped = sanitizeJsonCandidate(String(stripMarkdownCodeFence(content) || ""));
  if (!stripped) return "";

  try {
    JSON.parse(stripped);
    return stripped;
  } catch {
    const firstBrace = stripped.indexOf("{");
    const lastBrace = stripped.lastIndexOf("}");
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      return stripped.slice(firstBrace, lastBrace + 1);
    }
    return stripped;
  }
}

export function parseHandoffJSON(content: string): ParsedHandoffContent | null {
  const candidate = extractJsonCandidate(content);
  if (!candidate) return null;

  try {
    const parsed = JSON.parse(candidate) as Record<string, unknown>;
    const summary =
      typeof parsed.summary === "string" ? parsed.summary.trim().slice(0, MAX_SUMMARY_LENGTH) : "";
    const taskProgress =
      typeof parsed.taskProgress === "string"
        ? parsed.taskProgress.trim().slice(0, MAX_TASK_PROGRESS_LENGTH)
        : "";
    const keyDecisions = normalizeStringArray(parsed.keyDecisions, MAX_DECISIONS);
    const activeEntities = normalizeStringArray(parsed.activeEntities, MAX_ENTITIES);

    if (!summary) return null;

    return {
      summary,
      keyDecisions,
      taskProgress,
      activeEntities,
    };
  } catch {
    return null;
  }
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getResponseText(json: Record<string, unknown>): string {
  const choices = Array.isArray(json.choices) ? json.choices : [];
  const firstChoice = choices[0] as Record<string, unknown> | undefined;
  const firstMessage = firstChoice?.message as Record<string, unknown> | undefined;
  if (typeof firstMessage?.content === "string") {
    return firstMessage.content;
  }

  if (Array.isArray(firstMessage?.content)) {
    return toTextContent(firstMessage.content);
  }

  const output = Array.isArray(json.output) ? json.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = Array.isArray((item as Record<string, unknown>).content)
      ? ((item as Record<string, unknown>).content as Array<Record<string, unknown>>)
      : [];
    for (const part of content) {
      if (typeof part?.text === "string") return part.text;
    }
  }

  const content = Array.isArray(json.content) ? json.content : [];
  for (const part of content) {
    if (!part || typeof part !== "object") continue;
    if (typeof (part as Record<string, unknown>).text === "string") {
      return String((part as Record<string, unknown>).text);
    }
  }

  return "";
}

async function generateHandoffAsync(options: {
  sessionId: string;
  comboName: string;
  connectionId: string;
  percentUsed: number;
  messages: MessageLike[];
  model: string;
  expiresAt: string | null;
  config?: ContextRelayConfig | null;
  handleSingleModel: (body: Record<string, unknown>, modelStr: string) => Promise<Response>;
}): Promise<void> {
  cleanupExpiredHandoffs();

  const relayConfig = resolveContextRelayConfig(options.config as Record<string, unknown>);
  const summaryModel = relayConfig.handoffModel || options.model;
  const selectedMessages = selectMessagesForSummary(
    Array.isArray(options.messages) ? options.messages : [],
    relayConfig.maxMessagesForSummary
  );
  const historyText = formatMessagesForPrompt(selectedMessages);
  if (!historyText) return;

  const summaryPrompt = HANDOFF_PROMPT_TEMPLATE.replace("{HISTORY}", historyText);
  const summaryBody = {
    model: summaryModel,
    messages: [{ role: "user", content: summaryPrompt }],
    stream: false,
    max_tokens: DEFAULT_SUMMARY_RESPONSE_TOKENS,
    temperature: 0.1,
    _omnirouteSkipContextRelay: true,
    _omnirouteInternalRequest: "context-handoff",
  };

  const response = await options.handleSingleModel(summaryBody, summaryModel);
  if (!response.ok) return;

  let content = "";
  try {
    const json = (await response.clone().json()) as Record<string, unknown>;
    content = getResponseText(json);
  } catch {
    try {
      content = await response.clone().text();
    } catch {
      content = "";
    }
  }

  const parsed = parseHandoffJSON(content);
  if (!parsed) return;

  upsertHandoff({
    sessionId: options.sessionId,
    comboName: options.comboName,
    fromAccount: options.connectionId,
    summary: parsed.summary,
    keyDecisions: parsed.keyDecisions,
    taskProgress: parsed.taskProgress,
    activeEntities: parsed.activeEntities,
    messageCount: Array.isArray(options.messages) ? options.messages.length : 0,
    model: summaryModel,
    warningThresholdPct: relayConfig.handoffThreshold,
    generatedAt: new Date().toISOString(),
    expiresAt: options.expiresAt || new Date(Date.now() + DEFAULT_TTL_MS).toISOString(),
  });
}

export function maybeGenerateHandoff(options: {
  sessionId: string | null;
  comboName: string;
  connectionId: string | null;
  percentUsed: number;
  messages: MessageLike[];
  model: string;
  expiresAt: string | null;
  config?: ContextRelayConfig | null;
  handleSingleModel: (body: Record<string, unknown>, modelStr: string) => Promise<Response>;
}): void {
  if (!options.sessionId || !options.connectionId) return;

  const relayConfig = resolveContextRelayConfig(options.config as Record<string, unknown>);
  if (relayConfig.handoffProviders.length === 0) return;
  if (options.percentUsed < relayConfig.handoffThreshold) return;
  if (options.percentUsed >= HANDOFF_EXHAUSTION_THRESHOLD) return;

  cleanupExpiredHandoffs();
  if (hasActiveHandoff(options.sessionId, options.comboName)) return;
  const inflightKey = getInflightKey(options.sessionId, options.comboName);
  if (inflightHandoffGenerations.has(inflightKey)) return;
  inflightHandoffGenerations.add(inflightKey);

  setImmediate(() => {
    generateHandoffAsync({
      ...options,
      sessionId: options.sessionId as string,
      connectionId: options.connectionId as string,
      config: relayConfig,
    })
      .catch((err) => {
        if (process.env.NODE_ENV !== "test") {
          console.warn("[context-relay] Handoff generation failed:", err?.message || err);
        }
      })
      .finally(() => {
        inflightHandoffGenerations.delete(inflightKey);
      });
  });
}

export function buildHandoffSystemMessage(payload: HandoffPayload): string {
  const decisions = payload.keyDecisions.map((decision) => `  - ${escapeXml(decision)}`).join("\n");
  const entities = payload.activeEntities.map((entity) => escapeXml(entity)).join(", ");

  return `<context_handoff>
<transfer_reason>Account quota transfer - continuing from previous session</transfer_reason>
<session_summary>${escapeXml(payload.summary)}</session_summary>
<task_progress>${escapeXml(payload.taskProgress)}</task_progress>
<key_decisions>
${decisions}
</key_decisions>
<active_context>${entities}</active_context>
<messages_processed>${payload.messageCount}</messages_processed>
</context_handoff>

You are continuing a conversation that was transferred from another account due to quota limits.
The context above contains a concise summary of the prior work. Continue seamlessly from where the session left off.`;
}

export function injectHandoffIntoBody(
  body: Record<string, unknown>,
  payload: HandoffPayload
): Record<string, unknown> {
  const handoffContent = buildHandoffSystemMessage(payload);
  const isResponsesRequest =
    Object.prototype.hasOwnProperty.call(body, "input") ||
    Object.prototype.hasOwnProperty.call(body, "instructions");

  if (isResponsesRequest) {
    const existingInstructions =
      typeof body.instructions === "string" && body.instructions.trim().length > 0
        ? body.instructions
        : "";
    const nextBody: Record<string, unknown> = {
      ...body,
      instructions: existingInstructions
        ? `${handoffContent}\n\n${existingInstructions}`
        : handoffContent,
    };

    if (Array.isArray(nextBody.messages) && nextBody.messages.length === 0) {
      const { messages: _messages, ...rest } = nextBody;
      return rest;
    }

    return nextBody;
  }

  const handoffMessage = {
    role: "system",
    content: handoffContent,
  };
  const messages = Array.isArray(body.messages) ? [...body.messages] : [];

  return {
    ...body,
    messages: [handoffMessage, ...messages],
  };
}
