/**
 * Notion AI Web — `runInferenceTranscript` transcript construction.
 *
 * Extracted from `executors/notion-web.ts` (file-size gate) — builds a Notion
 * transcript array (`config` + `context` + per-message steps) from OpenAI-style
 * chat messages.
 *
 * Live contract (verified 2026-07-19):
 * - Leading `config` (workflow + optional model food-codename)
 * - Leading `context` (spaceId / userId / surface / timezone)
 * - User turns as `type: "user"` (legacy `human` also works with createThread,
 *   but `user` matches the current web client)
 * - Assistant turns as `agent-inference` text parts
 */
import { randomUUID } from "node:crypto";
import { extractNotionMessageText, type NotionMessage } from "./notionThreadSessions.ts";

/** Custom Notion AI agent (workflow) options from account credential / providerSpecificData. */
export interface NotionAgentOptions {
  /** UUID of a custom agent workflow. Empty = default Notion AI (ai_module). */
  workflowId?: string;
  /** Optional context page id for custom agents. */
  contextPageId?: string;
}

function isoNow(): string {
  // Millisecond precision matches the browser client.
  return new Date().toISOString().replace(/\.\d{3}Z$/, (m) => m); // keep ms + Z
}

function buildNotionConfigStep(model: string, agent?: NotionAgentOptions): Record<string, unknown> {
  const isCustom = Boolean(agent?.workflowId);
  const configValue: Record<string, unknown> = {
    type: "workflow",
    // Match live browser defaults (2026-07-20 capture) for fewer plan/feature mismatches.
    enableAgentAutomations: true,
    enableAgentIntegrations: true,
    enableCustomAgents: true,
    enableScriptAgent: true,
    enableAgentDiffs: true,
    enableCsvAttachmentSupport: true,
    enableComputer: true,
    enableCreateAndRunThread: true,
    enableAgentGenerateImage: !isCustom,
    useWebSearch: true,
    searchScopes: [{ type: "everything" }],
    availableConnectors: [],
    enableUserSessionContext: false,
    isCustomAgent: isCustom,
    isCustomAgentBuilder: false,
    isCustomAgentCreate: false,
    isAgentResearchRequest: false,
    useCustomAgentDraft: isCustom,
    modelFromUser: !isCustom && Boolean(model),
    databaseAgentConfigMode: false,
    isOnboardingAgent: false,
    isMobile: false,
  };
  if (isCustom && agent?.workflowId) {
    configValue.workflowId = agent.workflowId;
  }
  // Default Notion AI: pin the food codename when the client selected a model.
  // Custom agents usually use the agent-configured model (modelFromUser:false).
  if (!isCustom && model) configValue.model = model;
  return { id: randomUUID(), type: "config", value: configValue };
}

function buildNotionContextValue(opts: {
  spaceId?: string;
  userId?: string;
  now: string;
  agent?: NotionAgentOptions;
}): Record<string, unknown> {
  const isCustom = Boolean(opts.agent?.workflowId);
  const contextValue: Record<string, unknown> = {
    timezone: "UTC",
    surface: isCustom ? "custom_agent" : "ai_module",
    currentDatetime: opts.now,
  };
  if (opts.spaceId) contextValue.spaceId = opts.spaceId;
  if (opts.userId) contextValue.userId = opts.userId;
  if (isCustom && opts.agent?.workflowId) {
    contextValue.workflowId = opts.agent.workflowId;
    if (opts.agent.contextPageId) {
      contextValue.context_page_id = opts.agent.contextPageId;
    }
  }
  return contextValue;
}

/** Converts one OpenAI-style message into a transcript step, or `null` when it
 * was folded into the context (system prompts). */
function buildNotionMessageStep(
  m: NotionMessage,
  contextValue: Record<string, unknown>,
  opts: { userId?: string; now: string }
): Record<string, unknown> | null {
  // Accept string OR content-parts array (agent clients often send parts).
  const text = extractNotionMessageText((m as { content?: unknown })?.content);
  if (!text || text.length === 0) return null;
  const role = (m.role || "").toLowerCase();

  if (role === "system") {
    // Fold system prompts into context instructions rather than a separate step.
    const existing = typeof contextValue.instructions === "string" ? contextValue.instructions : "";
    contextValue.instructions = existing ? `${existing}\n${text}` : text;
    return null;
  }

  if (role === "assistant") {
    return {
      id: randomUUID(),
      type: "agent-inference",
      value: [{ type: "text", content: text }],
    };
  }

  // user (and anything else treated as user)
  const userStep: Record<string, unknown> = {
    id: randomUUID(),
    type: "user",
    value: [[text]],
    createdAt: opts.now,
  };
  if (opts.userId) userStep.userId = opts.userId;
  return userStep;
}

/**
 * For follow-ups, only send steps after the last assistant turn (partial transcript).
 * Notion already has prior steps when createThread:false + sticky threadId.
 * Re-sending the entire agent tool loop every turn triggers temporarily-unavailable.
 */
export function messagesForNotionTranscript(
  messages: NotionMessage[],
  isFollowUp: boolean
): NotionMessage[] {
  if (!isFollowUp || !messages.length) return messages;
  let lastAsst = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    const role = (messages[i]?.role || "").toLowerCase();
    if (role === "assistant" || role === "ai" || role === "model") {
      lastAsst = i;
      break;
    }
  }
  if (lastAsst < 0) return messages;
  const slice = messages.slice(lastAsst + 1);
  // Always include at least the last user message
  if (slice.length === 0) {
    const lastUser = [...messages].reverse().find((m) => {
      const r = (m.role || "").toLowerCase();
      return r === "user" || r === "human";
    });
    return lastUser ? [lastUser] : messages;
  }
  return slice;
}

export function buildNotionTranscript(
  messages: NotionMessage[],
  opts: {
    notionModel?: string;
    spaceId?: string;
    userId?: string;
    agent?: NotionAgentOptions;
    /** When true, only append steps after the last assistant (partial follow-up). */
    isFollowUp?: boolean;
  } = {}
): Array<Record<string, unknown>> {
  const trimmedModel = typeof opts.notionModel === "string" ? opts.notionModel.trim() : "";
  const model = trimmedModel && trimmedModel !== "notion-ai" ? trimmedModel : "";
  const now = isoNow();
  const agent = opts.agent?.workflowId ? opts.agent : undefined;
  const isFollowUp = Boolean(opts.isFollowUp);

  const contextValue = buildNotionContextValue({
    spaceId: opts.spaceId,
    userId: opts.userId,
    now,
    agent,
  });
  const entries: Array<Record<string, unknown>> = [
    buildNotionConfigStep(model, agent),
    { id: randomUUID(), type: "context", value: contextValue },
  ];

  const msgs = messagesForNotionTranscript(messages, isFollowUp);
  for (const m of msgs) {
    const step = buildNotionMessageStep(m, contextValue, { userId: opts.userId, now });
    if (step) entries.push(step);
  }
  return entries;
}
