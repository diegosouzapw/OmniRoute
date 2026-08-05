import { DefaultExecutor } from "./default.ts";
import type { ExecuteInput, ExecutorExecuteResult, ProviderCredentials } from "./base.ts";

const SENSITIVE_CONTENT_REJECTION =
  "抱歉，系统检测到您当前输入的信息存在敏感内容，我无法响应您的请求，请检查后重新输入";
const LARGE_TOOL_METADATA_BYTES = 64 * 1024;

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
      // Gateway has no "none" — just omit. Do NOT set reasoning_summary.
      delete out.reasoning_effort;
    } else if (eff) {
      // Client explicitly asked for reasoning — mirror the CLI's reasoning_summary
      // so CodeBuddy surfaces the model's reasoning.
      out.reasoning_summary = "auto";
    }
    // No reasoning requested: leave both unset. Forcing reasoning_effort:"medium"
    // + reasoning_summary on plain requests makes CodeBuddy trip its content
    // filter and return an error.
    return out;
  }
}

export default CodeBuddyCnExecutor;
