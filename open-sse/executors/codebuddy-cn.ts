import { DefaultExecutor } from "./default.ts";
import type { ExecuteInput, ExecutorExecuteResult, ProviderCredentials } from "./base.ts";
import { requiresReasoningReplay } from "../services/reasoningCache.ts";

const SENSITIVE_CONTENT_REJECTION =
  "抱歉，系统检测到您当前输入的信息存在敏感内容，我无法响应您的请求，请检查后重新输入";
const LARGE_TOOL_METADATA_BYTES = 64 * 1024;
// Mirrors reasoningCache.ts's MAX_ENTRY_BYTES cap — keep the inlined block from
// unboundedly growing the outbound token count for very large reasoning traces.
const MAX_INLINED_REASONING_CHARS = 10000;
const THOUGHT_OPEN = "<thought>";
const THOUGHT_CLOSE = "</thought>";

function responseFromResult(result: ExecutorExecuteResult): Response {
  return result instanceof Response ? result : result.response;
}

function credentialsFromResult(
  result: ExecutorExecuteResult,
  fallback: ProviderCredentials
): ProviderCredentials {
  if (result instanceof Response || !result.headers) return fallback;

  const authorization = Object.entries(result.headers).find(
    ([name]) => name.toLowerCase() === "authorization"
  )?.[1];
  if (!authorization?.startsWith("Bearer ")) return fallback;

  return {
    ...fallback,
    accessToken: authorization.slice("Bearer ".length),
    expiresAt: undefined,
  };
}

function compactToolDescriptions(body: unknown): unknown | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;

  const request = body as Record<string, unknown>;
  if (!Array.isArray(request.tools) || request.tools.length === 0) return null;

  const originalTools = request.tools;
  try {
    const serializedTools = JSON.stringify(originalTools);
    if (new TextEncoder().encode(serializedTools).byteLength < LARGE_TOOL_METADATA_BYTES) {
      return null;
    }
  } catch {
    return null;
  }

  let tools: unknown[] | null = null;
  originalTools.forEach((tool, index) => {
    if (!tool || typeof tool !== "object" || Array.isArray(tool)) return;

    const declaration = tool as Record<string, unknown>;
    if (
      declaration.type !== "function" ||
      !declaration.function ||
      typeof declaration.function !== "object" ||
      Array.isArray(declaration.function)
    ) {
      return;
    }

    const toolFunction = declaration.function as Record<string, unknown>;
    if (!Object.prototype.hasOwnProperty.call(toolFunction, "description")) return;

    const compactFunction = { ...toolFunction };
    delete compactFunction.description;
    tools ??= originalTools.slice();
    tools[index] = { ...declaration, function: compactFunction };
  });

  return tools ? { ...request, tools } : null;
}

async function isSensitiveContentRejection(response: Response): Promise<boolean> {
  if (response.status !== 400) return false;
  const responseText = await response
    .clone()
    .text()
    .catch(() => "");
  return responseText.includes(SENSITIVE_CONTENT_REJECTION);
}

function extractReasoningText(message: Record<string, unknown>): string | null {
  const raw = message.reasoning_content ?? message.reasoning;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function alreadyInlined(text: string): boolean {
  return text.trimStart().startsWith(THOUGHT_OPEN);
}

function buildThoughtBlock(reasoning: string): string {
  const capped =
    reasoning.length > MAX_INLINED_REASONING_CHARS
      ? reasoning.slice(0, MAX_INLINED_REASONING_CHARS)
      : reasoning;
  return `${THOUGHT_OPEN}\n${capped}\n${THOUGHT_CLOSE}\n\n`;
}

/**
 * injectAssistantReasoning — issue #13632.
 *
 * CodeBuddy CN's `/v2/chat/completions` gateway is reported to silently drop
 * unrecognized JSON fields on replayed assistant messages, including
 * `reasoning_content`. Unlike DeepSeek/Kimi's own endpoints (which 400 when
 * `reasoning_content` is missing — see `reasoningCache.ts`, issue #1628),
 * CodeBuddy CN degrades silently, so the existing field-replay cache does not
 * help here. This inlines the reasoning text as a visible `<thought>` block
 * at the front of the assistant message's `content` so it survives even if
 * the `reasoning_content` field itself gets stripped upstream. The field is
 * left in place too — harmless if dropped, redundant-but-safe if not.
 *
 * Only fires for models that actually require reasoning replay
 * (`requiresReasoningReplay()` — DeepSeek-V4/Kimi-K2 thinking families that
 * CodeBuddy CN re-exports), so non-thinking models in the catalog are
 * untouched. Idempotent: skips messages whose content already starts with a
 * `<thought>` block.
 */
function injectAssistantReasoning(model: string, messages: unknown): unknown {
  if (!Array.isArray(messages)) return messages;
  if (!requiresReasoningReplay({ provider: "codebuddy-cn", model })) return messages;

  let mutated = false;
  const next = messages.map((raw) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return raw;
    const message = raw as Record<string, unknown>;
    if (message.role !== "assistant") return message;

    const reasoning = extractReasoningText(message);
    if (!reasoning) return message;

    if (typeof message.content === "string") {
      if (alreadyInlined(message.content)) return message;
      mutated = true;
      return { ...message, content: buildThoughtBlock(reasoning) + message.content };
    }

    if (Array.isArray(message.content)) {
      const blocks = message.content as Array<Record<string, unknown>>;
      const firstTextIndex = blocks.findIndex(
        (block) => block && typeof block === "object" && block.type === "text"
      );
      if (firstTextIndex === -1) return message;
      const firstText = blocks[firstTextIndex];
      const text = typeof firstText.text === "string" ? firstText.text : "";
      if (alreadyInlined(text)) return message;
      mutated = true;
      const nextBlocks = blocks.slice();
      nextBlocks[firstTextIndex] = { ...firstText, text: buildThoughtBlock(reasoning) + text };
      return { ...message, content: nextBlocks };
    }

    return message;
  });

  return mutated ? next : messages;
}

/**
 * CodeBuddyCnExecutor — talks to https://copilot.tencent.com/v2/chat/completions
 *
 * CodeBuddy CN is an OpenAI-compatible Tencent gateway but it rejects non-stream
 * chat requests (HTTP 400, code 11101 "Non-stream chat request is currently not
 * supported"). The same-format (openai→openai) translator path leaves body.stream
 * as the client sent it, so we force it true here — OmniRoute still re-aggregates
 * the SSE into a JSON response for non-streaming clients.
 *
 * Reasoning params are opt-in: reasoning_summary:"auto" is only added when the
 * client explicitly sets reasoning_effort. Plain requests are left untouched.
 * When the caller explicitly asks for "none"/"off" we drop the field entirely
 * (the gateway has no "none" value). Forcing reasoning on plain requests trips
 * CodeBuddy's content filter and returns an error.
 *
 * Agent system prompt replacement: Tencent's content filter flags CLI agent system
 * prompts ("You are Claude Code, Anthropic's official CLI…") as prompt injection /
 * sensitive content and rejects the whole request. Detect agent system prompts
 * (length catch-all + identity-marker regex) and replace them with a neutral one,
 * while leaving legitimate user system prompts untouched. Content may be a string
 * or typed blocks ([{type:"text",text}]) depending on the incoming client format,
 * so flatten before matching and preserve the original shape on replacement.
 */
export class CodeBuddyCnExecutor extends DefaultExecutor {
  constructor() {
    super("codebuddy-cn");
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const result = await super.execute(input);
    if (!(await isSensitiveContentRejection(responseFromResult(result)))) {
      return result;
    }

    const compactBody = compactToolDescriptions(input.body);
    if (!compactBody) return result;

    input.log?.debug?.(
      "CODEBUDDY_CN",
      "Upstream rejected an oversized tool request as sensitive content; retrying with compact tool descriptions"
    );
    return super.execute({
      ...input,
      body: compactBody,
      credentials: credentialsFromResult(result, input.credentials),
    });
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const transformed = super.transformRequest(model, body, stream, credentials);
    if (!transformed || typeof transformed !== "object" || Array.isArray(transformed)) {
      return transformed;
    }
    const out = transformed as Record<string, unknown>;
    out.stream = true;

    const eff = out.reasoning_effort;
    if (eff === "none" || eff === "off") {
      delete out.reasoning_effort;
    } else if (eff) {
      out.reasoning_summary = "auto";
    }

    // --- Agent system prompt replacement ---
    // Tencent's content filter flags CLI agent system prompts as sensitive content.
    // Detect and replace them with a neutral prompt.
    const NEUTRAL_PROMPT =
      "You are a helpful AI assistant that helps with software engineering tasks.";
    const AGENT_PATTERN =
      /you are claude code|claude.?code.+official.+cli|anthropic.+official.+cli|anxthxropic.+official.+cli|you are (?:cursor|windsurf|cline|aider|continue|copilot|cody)|you are an? (?:ai )?(?:coding |code )?agent|cc_entrypoint\s*=\s*(?:cli|vscode|jetbrains|gui)|claude.?code.+issues|give feedback.+claude.?code|you are .{0,30}(?:powerful )?ai agent|orchestration capabilities|OhMyOpenCode|<agent-identity>|<Role>|<Behavior_Instructions>/i;
    const flatten = (content: unknown): string =>
      typeof content === "string"
        ? content
        : Array.isArray(content)
          ? (content as Array<Record<string, unknown>>)
              .map((b) => (b && typeof b.text === "string" ? b.text : ""))
              .join("\n")
          : "";

    // Handle top-level `system` field (Anthropic format after translation)
    if (out.system) {
      const text = flatten(out.system);
      if (text && (text.length > 2000 || AGENT_PATTERN.test(text))) {
        out.system = NEUTRAL_PROMPT;
      }
    }

    // Handle messages array with role: "system"
    if (Array.isArray(out.messages)) {
      out.messages = (out.messages as Array<Record<string, unknown>>).map((message) => {
        if (!message || message.role !== "system") return message;
        const text = flatten(message.content);
        if (!text) return message;
        if (text.length > 2000 || AGENT_PATTERN.test(text)) {
          return typeof message.content === "string"
            ? { ...message, content: NEUTRAL_PROMPT }
            : { ...message, content: [{ type: "text", text: NEUTRAL_PROMPT }] };
        }
        return message;
      });
    }

    // --- Strip oversized tool descriptions (>64KB) ---
    // Large tool descriptions can also trigger the content filter.
    if (Array.isArray(out.tools) && out.tools.length > 0) {
      try {
        const s = JSON.stringify(out.tools);
        if (new TextEncoder().encode(s).byteLength >= 65536) {
          out.tools = (out.tools as Array<Record<string, unknown>>).map((tool) => {
            if (!tool || typeof tool !== "object" || Array.isArray(tool)) return tool;
            if (
              tool.type !== "function" ||
              !tool.function ||
              typeof tool.function !== "object" ||
              Array.isArray(tool.function)
            )
              return tool;
            if (!Object.prototype.hasOwnProperty.call(tool.function, "description")) return tool;
            const cf = { ...(tool.function as Record<string, unknown>) };
            delete cf.description;
            return { ...tool, function: cf };
          });
        }
      } catch {}
    }

    // --- Inline reasoning_content as a <thought> block (#13632) ---
    out.messages = injectAssistantReasoning(model, out.messages);

    return out;
  }
}

export default CodeBuddyCnExecutor;
