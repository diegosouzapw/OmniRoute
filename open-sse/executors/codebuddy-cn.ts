import { DefaultExecutor } from "./default.ts";
import type { ProviderCredentials } from "./base.ts";

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
    const NEUTRAL_PROMPT = "You are a helpful AI assistant that helps with software engineering tasks.";
    const AGENT_PATTERN = /you are claude code|claude.?code.+official.+cli|anthropic.+official.+cli|anxthxropic.+official.+cli|you are (?:cursor|windsurf|cline|aider|continue|copilot|cody)|you are an? (?:ai )?(?:coding |code )?agent|cc_entrypoint\s*=\s*(?:cli|vscode|jetbrains|gui)|claude.?code.+issues|give feedback.+claude.?code|you are .{0,30}(?:powerful )?ai agent|orchestration capabilities|OhMyOpenCode|<agent-identity>|<Role>|<Behavior_Instructions>/i;
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
            if (tool.type !== "function" || !tool.function || typeof tool.function !== "object" || Array.isArray(tool.function)) return tool;
            if (!Object.prototype.hasOwnProperty.call(tool.function, "description")) return tool;
            const cf = { ...(tool.function as Record<string, unknown>) };
            delete cf.description;
            return { ...tool, function: cf };
          });
        }
      } catch {}
    }

    return out;
  }
}

export default CodeBuddyCnExecutor;
