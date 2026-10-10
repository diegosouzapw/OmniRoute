import {
  FACTORY_HEADERS,
  FACTORY_DROID_SYSTEM_PROMPT,
  ANTHROPIC_VERSION,
  ANTHROPIC_BETAS,
  FACTORY_OPENAI_PLATFORM_ORG,
  type FactoryModelContract,
} from "../../config/factory.ts";
import { ensureToolMessageNames } from "../kimiToolNames.ts";

export const FACTORY_DROID_SYSTEM_PROMPT_PREFIX =
  "You are Droid, an AI software engineering agent built by Factory.";

export class FactoryError extends Error {
  statusCode: number;
  status: number;
  type: string;
  code?: string;

  constructor(status: number, message: string, type = "invalid_request_error", code?: string) {
    super(message);
    this.name = "FactoryError";
    this.status = status;
    this.statusCode = status;
    this.type = type;
    this.code = code;
  }
}

function randomHex(bytesCount: number): string {
  const bytes = new Uint8Array(bytesCount);
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytesCount; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function randomTraceparent(): string {
  const traceId = randomHex(16);
  const spanId = randomHex(8);
  return `00-${traceId}-${spanId}-01`;
}

export function randomUuid(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `${randomHex(4)}-${randomHex(2)}-4${randomHex(2).slice(1)}-a${randomHex(2).slice(1)}-${randomHex(6)}`;
}

const PROTECTED_HEADER_NAMES: Record<string, true> = {
  authorization: true,
  "x-factory-org-id": true,
  host: true,
  "x-factory-client": true,
  "x-client-version": true,
  "user-agent": true,
  "x-api-provider": true,
  "x-provider-routing-source": true,
  traceparent: true,
  "x-goog-api-key": true,
};
export function buildFactoryHeaders(
  credentials: Record<string, unknown>,
  stream: boolean,
  clientHeaders?: Record<string, string> | null,
  contract?: FactoryModelContract | null,
  upstreamExtraHeaders?: Record<string, string> | null
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Factory-Client": FACTORY_HEADERS["X-Factory-Client"],
    "X-Client-Version": FACTORY_HEADERS["X-Client-Version"],
    "User-Agent": FACTORY_HEADERS["User-Agent"],
    "x-api-provider": contract?.upstreamProvider ?? "fireworks",
    "x-provider-routing-source": "registry_default",
    traceparent: randomTraceparent(),
    Accept: stream ? "text/event-stream" : "application/json",
  };

  // Bearer uses accessToken only; never apiKey
  const accessToken = credentials?.accessToken;
  if (typeof accessToken === "string" && accessToken.trim()) {
    headers["Authorization"] = `Bearer ${accessToken.trim()}`;
  }

  // Session ID from clientHeaders if present else request UUID
  let sessionId: string | undefined;
  if (clientHeaders && typeof clientHeaders === "object") {
    for (const [key, val] of Object.entries(clientHeaders)) {
      const lower = key.toLowerCase();
      if (
        (lower === "x-session-id" ||
          lower === "session-id" ||
          lower === "session_id" ||
          lower === "x-session_id") &&
        typeof val === "string" &&
        val.trim()
      ) {
        sessionId = val.trim();
        break;
      }
    }
  }
  headers["x-session-id"] = sessionId || randomUuid();
  headers["x-assistant-message-id"] = randomUuid();

  // X-Factory-Org-Id from that connection
  const psd = (credentials?.providerSpecificData as Record<string, unknown> | undefined) || {};
  const orgId = psd.orgId || psd.organizationId || psd.workosOrgId;
  if (typeof orgId === "string" && orgId.trim()) {
    headers["X-Factory-Org-Id"] = orgId.trim();
  }

  // Wire family specific headers
  if (contract?.targetFormat === "claude") {
    headers["anthropic-version"] = ANTHROPIC_VERSION;
    headers["anthropic-beta"] = ANTHROPIC_BETAS;
  } else if (contract?.targetFormat === "openai-responses") {
    headers["OpenAI-Platform"] = FACTORY_OPENAI_PLATFORM_ORG;
  }

  // Honor allowed custom-header/proxy without replacing bearer/org/host identity
  if (upstreamExtraHeaders && typeof upstreamExtraHeaders === "object") {
    for (const [key, value] of Object.entries(upstreamExtraHeaders)) {
      if (typeof value === "string" && !PROTECTED_HEADER_NAMES[key.toLowerCase()]) {
        headers[key] = value;
      }
    }
  }

  if (contract?.targetFormat === "gemini") {
    delete headers["x-goog-api-key"];
  }

  return headers;
}

function applyFactoryMessagesPrompt(cloned: Record<string, unknown>): void {
  const existingSystem = cloned.system;
  if (typeof existingSystem === "string") {
    if (!existingSystem.includes(FACTORY_DROID_SYSTEM_PROMPT_PREFIX)) {
      cloned.system = `${FACTORY_DROID_SYSTEM_PROMPT}\n\n${existingSystem}`;
    }
  } else if (Array.isArray(existingSystem)) {
    const hasPrompt = existingSystem.some((block) => {
      const text =
        block && typeof block === "object" && "text" in block
          ? String((block as Record<string, unknown>).text ?? "")
          : String(block ?? "");
      return text.includes(FACTORY_DROID_SYSTEM_PROMPT_PREFIX);
    });
    if (!hasPrompt) {
      cloned.system = [{ type: "text", text: FACTORY_DROID_SYSTEM_PROMPT }, ...existingSystem];
    }
  } else {
    cloned.system = FACTORY_DROID_SYSTEM_PROMPT;
  }
}

function applyFactoryResponsesPrompt(cloned: Record<string, unknown>): void {
  const existingInstructions = cloned.instructions;
  if (typeof existingInstructions === "string" && existingInstructions.trim().length > 0) {
    if (!existingInstructions.includes(FACTORY_DROID_SYSTEM_PROMPT_PREFIX)) {
      cloned.instructions = `${FACTORY_DROID_SYSTEM_PROMPT}\n\n${existingInstructions}`;
    }
  } else {
    cloned.instructions = FACTORY_DROID_SYSTEM_PROMPT;
  }
}

function applyFactoryGeminiPrompt(cloned: Record<string, unknown>): void {
  const existing = cloned.systemInstruction;
  if (!existing || typeof existing !== "object") {
    cloned.systemInstruction = {
      role: "system",
      parts: [{ text: FACTORY_DROID_SYSTEM_PROMPT }],
    };
    return;
  }
  const parts = Array.isArray((existing as Record<string, unknown>).parts)
    ? [...((existing as Record<string, unknown>).parts as unknown[])]
    : [];
  const hasPrompt = parts.some((p) => {
    const text =
      p && typeof p === "object" && "text" in p
        ? String((p as Record<string, unknown>).text)
        : String(p);
    return text.includes(FACTORY_DROID_SYSTEM_PROMPT_PREFIX);
  });
  if (!hasPrompt) {
    parts.unshift({ text: FACTORY_DROID_SYSTEM_PROMPT });
  }
  cloned.systemInstruction = {
    ...(existing as Record<string, unknown>),
    role: (existing as Record<string, unknown>).role || "system",
    parts,
  };
}

function applyFactoryChatPrompt(cloned: Record<string, unknown>): void {
  const messages = Array.isArray(cloned.messages) ? [...cloned.messages] : [];
  const hasPrompt = messages.some((m) => {
    if (!m || typeof m !== "object") return false;
    const content = (m as Record<string, unknown>).content;
    const text =
      typeof content === "string"
        ? content
        : content !== undefined
          ? (JSON.stringify(content) ?? "")
          : "";
    return text.includes(FACTORY_DROID_SYSTEM_PROMPT_PREFIX);
  });
  if (!hasPrompt) {
    messages.unshift({ role: "system", content: FACTORY_DROID_SYSTEM_PROMPT });
  }
  cloned.messages = messages;
}

const ADAPTIVE_MODELS_WITH_SUMMARIZED_DISPLAY: Record<string, true> = {
  "claude-fable-5.1": true,
  "claude-fable-5": true,
  "claude-opus-5": true,
  "claude-opus-5-fast": true,
  "claude-opus-5-5": true,
  "claude-opus-5-5-fast": true,
  "claude-opus-4-8": true,
  "claude-opus-4-8-fast": true,
  "claude-opus-4-7": true,
  "claude-opus-4-7-fast": true,
  "claude-sonnet-5": true,
  "claude-sonnet-5-5": true,
};

function supportsExtraHighEffort(modelId: string): boolean {
  const m = modelId.toLowerCase();
  return (
    m === "grok-4.6" ||
    m === "grok-4.7" ||
    m.startsWith("gpt-6") ||
    m.startsWith("gpt-5.6") ||
    m.startsWith("glm-5.3") ||
    m.startsWith("claude-opus-5") ||
    m.startsWith("claude-sonnet-5") ||
    m.startsWith("claude-fable-5") ||
    m.startsWith("qwen")
  );
}

function mapEffort(requestedEffort: unknown, modelId: string): string {
  const effortStr = typeof requestedEffort === "string" ? requestedEffort.toLowerCase() : "";
  if (effortStr === "minimal") return "low";
  if (effortStr === "max" || effortStr === "xhigh") {
    return supportsExtraHighEffort(modelId) ? "xhigh" : "high";
  }
  if (effortStr === "low" || effortStr === "medium" || effortStr === "high") {
    return effortStr;
  }
  return "high";
}

function transformMessagesRequest(
  cloned: Record<string, unknown>,
  model: string,
  credentials?: Record<string, unknown>
): void {
  // 1. Prepend Droid prompt
  applyFactoryMessagesPrompt(cloned);

  // 2. Default max_tokens 4096 only when absent
  if (cloned.max_tokens == null || cloned.max_tokens === "") {
    cloned.max_tokens = 4096;
  }
  const maxTokens = Number(cloned.max_tokens);

  // 3. Thinking resolution
  const m = model.toLowerCase();
  const isM3OrMinimax = m.startsWith("minimax-");
  const isAdaptiveDisplay =
    m.startsWith("atlas-") ||
    m.startsWith("aster-") ||
    !!ADAPTIVE_MODELS_WITH_SUMMARIZED_DISPLAY[m];
  const isAdaptiveNoDisplay = m.startsWith("claude-sonnet-4-6") || m.startsWith("claude-opus-4-6");
  // Check if thinking is explicitly disabled
  const requestedEffort =
    cloned.reasoning_effort ||
    (cloned.thinking && typeof cloned.thinking === "object"
      ? (cloned.thinking as Record<string, unknown>).effort
      : undefined) ||
    (credentials?._requestedEffort as unknown);

  const disabled =
    requestedEffort === "off" ||
    requestedEffort === "none" ||
    cloned.thinking === null ||
    (cloned.thinking &&
      typeof cloned.thinking === "object" &&
      (cloned.thinking as Record<string, unknown>).type === "disabled");

  // Claude 5.5 models cannot disable thinking
  const cannotDisable = m.startsWith("claude-opus-5-5") || m.startsWith("claude-sonnet-5-5");

  if (disabled && !cannotDisable) {
    delete cloned.thinking;
    delete cloned.output_config;
    return;
  }

  // Model specifically without reasoning support (Haiku 4.5)
  if (m.startsWith("claude-haiku-4-5") && !cloned.thinking && !cloned.reasoning_effort) {
    delete cloned.thinking;
    delete cloned.output_config;
    return;
  }

  if (isM3OrMinimax) {
    // M3 budget thinking, no output_config
    delete cloned.output_config;

    // Check for explicit budget
    const explicitBudgetVal =
      cloned.thinking && typeof cloned.thinking === "object"
        ? (cloned.thinking as Record<string, unknown>).budget_tokens
        : cloned.thinking_budget;

    let budget: number;
    if (explicitBudgetVal !== undefined && explicitBudgetVal !== null) {
      const explicitNum = Number(explicitBudgetVal);
      if (!Number.isFinite(explicitNum) || explicitNum < 1024 || explicitNum >= maxTokens) {
        throw new FactoryError(
          400,
          `Invalid budget_tokens: ${explicitNum}. Must be >= 1024 and < max_tokens (${maxTokens}).`,
          "invalid_request_error"
        );
      }
      budget = explicitNum;
    } else {
      // Implicit budget from effort
      const effort = typeof requestedEffort === "string" ? requestedEffort.toLowerCase() : "high";
      let implicitBudget = effort === "low" ? 1024 : effort === "medium" ? 2048 : 4096;
      if (implicitBudget >= maxTokens) {
        implicitBudget = maxTokens - 1;
      }
      if (implicitBudget < 1024) {
        throw new FactoryError(
          400,
          `max_tokens (${maxTokens}) is too small to accommodate minimum thinking budget (1024).`,
          "invalid_request_error"
        );
      }
      budget = implicitBudget;
    }

    cloned.thinking = { type: "enabled", budget_tokens: budget };
    return;
  }

  if (isAdaptiveDisplay) {
    const effort = mapEffort(requestedEffort, m);
    cloned.thinking = { type: "adaptive", display: "summarized" };
    cloned.output_config = { effort };
    return;
  }

  if (isAdaptiveNoDisplay) {
    const effort = mapEffort(requestedEffort, m);
    cloned.thinking = { type: "adaptive" };
    cloned.output_config = { effort };
    return;
  }

  // Older / Budget Claude models
  const isOpus45 = m.startsWith("claude-opus-4-5");
  const effort = mapEffort(requestedEffort, m);

  const explicitBudgetVal =
    cloned.thinking && typeof cloned.thinking === "object"
      ? (cloned.thinking as Record<string, unknown>).budget_tokens
      : cloned.thinking_budget;

  let budget: number;
  if (explicitBudgetVal !== undefined && explicitBudgetVal !== null) {
    const explicitNum = Number(explicitBudgetVal);
    if (!Number.isFinite(explicitNum) || explicitNum < 1024 || explicitNum >= maxTokens) {
      throw new FactoryError(
        400,
        `Invalid budget_tokens: ${explicitNum}. Must be >= 1024 and < max_tokens (${maxTokens}).`,
        "invalid_request_error"
      );
    }
    budget = explicitNum;
  } else {
    let implicitBudget = effort === "low" ? 4096 : effort === "medium" ? 12288 : 24576;
    if (implicitBudget >= maxTokens) {
      implicitBudget = maxTokens - 1;
    }
    if (implicitBudget < 1024) {
      throw new FactoryError(
        400,
        `max_tokens (${maxTokens}) is too small to accommodate minimum thinking budget (1024).`,
        "invalid_request_error"
      );
    }
    budget = implicitBudget;
  }

  cloned.thinking = { type: "enabled", budget_tokens: budget };
  if (isOpus45) {
    cloned.output_config = { effort };
  } else {
    delete cloned.output_config;
  }
}

const SERVER_ID_RE = /^(rs|fc|resp|msg)_/;

function transformResponsesRequest(cloned: Record<string, unknown>): void {
  // If previous_response_id still present after local resume, local 400 requiring replayed input
  if (cloned.previous_response_id) {
    throw new FactoryError(
      400,
      "previous_response_id is not supported; full input replay is required",
      "invalid_request_error"
    );
  }

  // store: false
  cloned.store = false;

  // union reasoning.encrypted_content into include without dropping other include values
  const include = Array.isArray(cloned.include) ? [...cloned.include] : [];
  if (!include.includes("reasoning.encrypted_content")) {
    include.push("reasoning.encrypted_content");
  }
  cloned.include = include;

  // Prepend Droid prompt
  applyFactoryResponsesPrompt(cloned);

  // Strip item_reference and server object IDs matching ^(rs|fc|resp|msg)_; never strip call_id/tool_call_id
  if (Array.isArray(cloned.input)) {
    cloned.input = cloned.input
      .filter((item) => {
        if (typeof item === "string" && SERVER_ID_RE.test(item)) return false;
        if (item && typeof item === "object" && !Array.isArray(item)) {
          if ((item as Record<string, unknown>).type === "item_reference") return false;
        }
        return true;
      })
      .map((item) => {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const rec = item as Record<string, unknown>;
          if (typeof rec.id === "string" && SERVER_ID_RE.test(rec.id)) {
            const copy = { ...rec };
            delete copy.id;
            return copy;
          }
        }
        return item;
      });
  }
}

const GEMINI_REJECTED_KEYS = [
  "stream",
  "reasoning_effort",
  "thinking",
  "tool_choice",
  "parallel_tool_calls",
  "messages",
  "max_tokens",
  "temperature",
  "top_p",
  "top_k",
  "stop",
  "user",
  "store",
  "metadata",
  "service_tier",
  "n",
  "logit_bias",
  "response_format",
] as const;

function transformGeminiRequest(cloned: Record<string, unknown>, model: string): void {
  // model in JSON body
  cloned.model = model;

  // Prepend Droid prompt
  applyFactoryGeminiPrompt(cloned);

  // Remove Factory-rejected top-level keys
  for (const key of GEMINI_REJECTED_KEYS) {
    delete cloned[key];
  }
  // keep native contents/parts/functionCall/functionResponse/thought signatures
  // do not remove generationConfig/toolConfig or multimodal parts
}

function transformChatRequest(cloned: Record<string, unknown>, model: string): void {
  const isDeepseek = model.startsWith("deepseek-");
  const isKimi = model.startsWith("kimi-");
  const isGlm = model.startsWith("glm-");

  // reasoning_history interleaved for DeepSeek, preserved otherwise
  cloned.reasoning_history = isDeepseek ? "interleaved" : "preserved";

  // Strip enable_thinking only at top level and inside chat_template_kwargs
  delete cloned.enable_thinking;
  if (cloned.chat_template_kwargs && typeof cloned.chat_template_kwargs === "object") {
    cloned.chat_template_kwargs = {
      ...(cloned.chat_template_kwargs as Record<string, unknown>),
    };
    delete (cloned.chat_template_kwargs as Record<string, unknown>).enable_thinking;
  }

  // Prepend Droid prompt
  applyFactoryChatPrompt(cloned);

  // ensureToolMessageNames for Kimi
  if (isKimi) {
    const withNames = ensureToolMessageNames(cloned);
    if (withNames && typeof withNames === "object") {
      cloned.messages = withNames.messages;
    }
  }

  // Assistant & tool turn normalization
  if (Array.isArray(cloned.messages)) {
    cloned.messages = cloned.messages.map((m) => {
      if (!m || typeof m !== "object") return m;
      const msg = { ...(m as Record<string, unknown>) };

      if (msg.role === "assistant") {
        const hasToolCalls = Array.isArray(msg.tool_calls) && msg.tool_calls.length > 0;
        const hasRealReasoning =
          typeof msg.reasoning_content === "string" && msg.reasoning_content.length > 0;

        if (isDeepseek) {
          // DeepSeek every assistant turn real replay or empty string, never synthetic dot
          if (!hasRealReasoning) {
            const replayed =
              (typeof msg.reasoning === "string" && msg.reasoning) ||
              (typeof msg.reasoning_text === "string" && msg.reasoning_text) ||
              "";
            msg.reasoning_content = replayed;
          }
        }

        if (hasToolCalls) {
          // Missing tool-turn content empty string
          if (msg.content === undefined || msg.content === null) {
            msg.content = "";
          }

          // Reasoning content for tool calls
          if (msg.reasoning_content === undefined || msg.reasoning_content === null) {
            if (isDeepseek) {
              msg.reasoning_content = ""; // never synthetic dot
            } else if (isKimi || isGlm) {
              msg.reasoning_content = "."; // reference dot
            } else {
              // others follow Droid allowsSyntheticReasoningContentForToolCalls
              msg.reasoning_content = ".";
            }
          }
        }
      }

      return msg;
    });
  }
}

export function transformFactoryRequest(
  model: string,
  body: unknown,
  stream: boolean,
  credentials: Record<string, unknown>,
  contract: FactoryModelContract
): unknown {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const cloned: Record<string, unknown> = { ...(body as Record<string, unknown>) };

  if (contract.targetFormat !== "gemini") {
    cloned.stream = !!stream;
  }

  switch (contract.targetFormat) {
    case "claude":
      transformMessagesRequest(cloned, model, credentials);
      break;
    case "openai-responses":
      transformResponsesRequest(cloned);
      break;
    case "gemini":
      transformGeminiRequest(cloned, model);
      break;
    case "openai":
      transformChatRequest(cloned, model);
      break;
  }

  return cloned;
}
