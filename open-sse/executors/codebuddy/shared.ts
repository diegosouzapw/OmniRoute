import { DefaultExecutor } from "../default.ts";
import type { ExecuteInput, ExecutorExecuteResult, ProviderCredentials } from "../base.ts";

export const SENSITIVE_CONTENT_REJECTION =
  "抱歉，系统检测到您当前输入的信息存在敏感内容，我无法响应您的请求，请检查后重新输入";
export const LARGE_TOOL_METADATA_BYTES = 64 * 1024;
export const NEUTRAL_PROMPT =
  "You are a helpful AI assistant that helps with software engineering tasks.";
export const AGENT_PATTERN =
  /you are claude code|claude.?code.+official.+cli|anthropic.+official.+cli|anxthxropic.+official.+cli|you are (?:cursor|windsurf|cline|aider|continue|copilot|cody)|you are an? (?:ai )?(?:coding |code )?agent|cc_entrypoint\s*=\s*(?:cli|vscode|jetbrains|gui)|claude.?code.+issues|give feedback.+claude.?code|you are .{0,30}(?:powerful )?ai agent|orchestration capabilities|OhMyOpenCode|<agent-identity>|<Role>|<Behavior_Instructions>/i;

export function responseFromResult(result: ExecutorExecuteResult): Response {
  return result instanceof Response ? result : result.response;
}

export function credentialsFromResult(
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

export function compactToolDescriptions(body: unknown): unknown | null {
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

export async function isSensitiveContentRejection(response: Response): Promise<boolean> {
  if (response.status !== 400) return false;
  const responseText = await response
    .clone()
    .text()
    .catch(() => "");
  return responseText.includes(SENSITIVE_CONTENT_REJECTION);
}

export function flattenContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return (content as Array<Record<string, unknown>>)
      .map((b) => (b && typeof b.text === "string" ? b.text : ""))
      .join("\n");
  }
  return "";
}

/**
 * Shared base executor for CodeBuddy gateways (Tencent CN and International).
 *
 * Both speak OpenAI-compatible SSE over their respective gateways. Shared behavior:
 *  - forces stream: true (non-stream rejected with code 11101)
 *  - handles reasoning_effort (strips none/off, adds reasoning_summary:"auto")
 *  - sanitizes agent system prompts to avoid Tencent's content filter
 *  - proactively strips oversized tool descriptions (>64KB)
 *  - retries sensitive-content 400 rejections once with compact tool descriptions
 */
export class CodeBuddyBaseExecutor extends DefaultExecutor {
  constructor(providerId: string) {
    super(providerId);
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const result = await super.execute(input);
    if (!(await isSensitiveContentRejection(responseFromResult(result)))) {
      return result;
    }

    const compactBody = compactToolDescriptions(input.body);
    if (!compactBody) return result;

    const logTag = (this.provider || "codebuddy").toUpperCase().replace(/-/g, "_");
    input.log?.debug?.(
      logTag,
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
    if (out.system) {
      const text = flattenContent(out.system);
      if (text && (text.length > 2000 || AGENT_PATTERN.test(text))) {
        out.system = NEUTRAL_PROMPT;
      }
    }

    if (Array.isArray(out.messages)) {
      out.messages = (out.messages as Array<Record<string, unknown>>).map((message) => {
        if (!message || message.role !== "system") return message;
        const text = flattenContent(message.content);
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
            ) {
              return tool;
            }
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
