 
// @ts-ignore — node:child_process available at runtime in Next.js server context
import { spawn, type ChildProcess } from "node:child_process";
import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import type { ExecuteInput } from "./base.ts";

/** Default timeout for qodercli requests (2 minutes) */
const QODER_TIMEOUT_MS = 120_000;

/** Max command-line argument length (~30KB safe for Windows, ~120KB Linux) */
const MAX_ARG_LENGTH = 30_000;

type QoderMessage = {
  role: string;
  content:
    | string
    | Array<{ type: string; text?: string; id?: string; name?: string; input?: string }>;
};

type QoderContentItem = {
  type: string;
  text?: string;
  reason?: string;
  id?: string;
  name?: string;
  input?: string;
};

type QoderUsage = {
  input_tokens?: number;
  output_tokens?: number;
};

type QoderParsedLine = {
  type: string;
  subtype?: string;
  message?: {
    content?: QoderContentItem[];
    usage?: QoderUsage;
    stop_reason?: string;
    status?: string;
  };
  done?: boolean;
};

type ExecuteResult = {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
};

type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

/**
 * Create an AbortError that chatCore will recognize as client disconnect.
 */
function createAbortError(): Error {
  const err = new Error("Aborted");
  err.name = "AbortError";
  return err;
}

/**
 * Qoder does NOT support model name aliases like OpenAI or Anthropic.
 * Users must specify exact qodercli model names.
 * No mapping needed — pass model ID directly to qodercli.
 */

/**
 * Valid qodercli model IDs from ~/.qoder/.auth/models.
 * Only "lite" is free (price_factor: 0), all others require credits.
 * Source: actual qodercli installation models file.
 */
const VALID_QODER_MODELS = new Set([
  // Base models (assistant/chat/inline)
  "auto",
  "ultimate",
  "performance",
  "efficient",
  "lite", // Only this one is FREE (price_factor: 0)
  // Named premium models
  "qmodel", // Qwen3.6-Plus (price_factor: 0.2)
  "gmodel", // GLM-5 (price_factor: 0.5)
  "kmodel", // Kimi-K2.5 (price_factor: 0.3)
  "mmodel", // MiniMax-M2.7 (price_factor: 0.2)
  // Experts models
  "experts-auto",
  "experts-ultimate",
  // NAP models
  "nap-auto",
  // Quest models
  "quest-auto",
  // Qwork models
  "qwork-auto",
  "qwork-ultimate",
]);

function resolveModel(requestedModel: string | undefined): string {
  if (!requestedModel) return "lite"; // Default to free tier
  // No alias mapping — Qoder doesn't support OpenAI/Anthropic model name compatibility
  return VALID_QODER_MODELS.has(requestedModel) ? requestedModel : "lite";
}

function extractTextContent(content: string | Array<{ type: string; text?: string }>): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .filter((c) => c.type === "text")
    .map((c) => c.text || "")
    .join("");
}

/**
 * Extract tool calls from qodercli message content.
 * Based on battle-tested qoder-proxy implementation.
 */
function extractToolCalls(content: QoderContentItem[] | undefined): ToolCall[] | null {
  if (!Array.isArray(content)) return null;
  const toolCalls: ToolCall[] = [];
  for (const item of content) {
    if (item.type === "function" && item.id && item.name && item.input) {
      toolCalls.push({
        id: item.id,
        type: "function",
        function: {
          name: item.name,
          arguments: item.input,
        },
      });
    }
  }
  return toolCalls.length > 0 ? toolCalls : null;
}

/**
 * Build prompt from messages — uses ONLY the last user message.
 * qodercli responds better to individual prompts than conversation threads.
 * Based on battle-tested qoder-proxy implementation.
 */
function buildPrompt(messages: QoderMessage[]): string {
  // Find the last user message
  const lastUserMessage = messages
    .slice()
    .reverse()
    .find((msg) => msg.role === "user");
  if (!lastUserMessage) return "";

  const content = extractTextContent(lastUserMessage.content).trim();
  return content ? `User: ${content}` : "";
}

function generateId(): string {
  return `chatcmpl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function mapFinishReason(reason: string | undefined): string {
  if (reason === "end_turn") return "stop";
  if (reason === "max_tokens") return "length";
  if (reason === "tool_calls") return "tool_calls";
  return reason || "stop";
}

/**
 * Spawn qodercli with proper cross-platform support.
 * Windows: uses cmd.exe /c qodercli.cmd for .cmd resolution (shell: false).
 * Linux/macOS: spawns qodercli directly.
 *
 * For long prompts, uses stdin piping to avoid command-line length limits.
 * Based on battle-tested qoder-proxy implementation.
 */
function spawnQoderCli(
  args: string[],
  env: Record<string, string | undefined>,
  stdinPrompt?: string
): ChildProcess {
   
  // @ts-ignore — process global available at runtime in Node.js
  const isWindows = process.platform === "win32";

  // Use stdin for input if prompt is provided (avoids arg length limits)
  const stdio: ["pipe" | "ignore", "pipe", "pipe"] = stdinPrompt
    ? ["pipe", "pipe", "pipe"]
    : ["ignore", "pipe", "pipe"];

  let proc: ChildProcess;
  if (isWindows) {
    // Windows: explicit cmd.exe /c qodercli.cmd — shell: false for security
    proc = spawn("cmd.exe", ["/c", "qodercli.cmd", ...args], {
      stdio,
      env,
      windowsHide: true,
    });
  } else {
    // Linux/macOS: spawn directly
    proc = spawn("qodercli", args, {
      stdio,
      env,
    });
  }

  // Write prompt to stdin if using pipe mode
  if (stdinPrompt && proc.stdin) {
    proc.stdin.write(stdinPrompt);
    proc.stdin.end();
  }

  return proc;
}

/**
 * QoderExecutor — Subprocess wrapper for Qoder AI.
 *
 * Qoder's inference API uses a proprietary 2-stage COSY token exchange that
 * cannot be replicated with a raw PAT. Instead, we spawn:
 *
 *   qodercli -p "<prompt>" -f stream-json --quiet [--model <level>]
 *
 * and convert the newline-delimited JSON output to an OpenAI-compatible Response.
 *
 * Auth: pass apiKey (PAT) as the credential — it is forwarded to qodercli
 * via the QODER_PERSONAL_ACCESS_TOKEN environment variable.
 *
 * stream-json output format:
 *   {"type":"system","subtype":"init",...}               — ignored
 *   {"type":"assistant","subtype":"message","message":{"content":[...]}} — content
 *   {"type":"result","subtype":"success","message":{"content":[...]}}    — final
 *
 * Based on battle-tested qoder-proxy implementation (Windows, Docker, Linux).
 */
export class QoderExecutor extends BaseExecutor {
  constructor() {
    super("qoder", PROVIDERS.qoder);
  }

  buildUrl(_model: string, _stream: boolean, _urlIndex = 0, _credentials = null): string {
    void _model;
    void _stream;
    void _urlIndex;
    void _credentials;
    return "subprocess://qodercli";
  }

  buildHeaders(_credentials: unknown, _stream = true): Record<string, string> {
    void _credentials;
    void _stream;
    return {};
  }

  transformRequest(
    _model: string,
    body: unknown,
    _stream: boolean,
    _credentials: unknown
  ): unknown {
    void _model;
    void _stream;
    void _credentials;
    return body;
  }

  async execute(input: ExecuteInput): Promise<ExecuteResult> {
    const { model, body, stream, credentials, signal, log } = input;

    const pat =
      (credentials as { apiKey?: string }).apiKey ||
      (credentials as { accessToken?: string }).accessToken ||
      process.env.QODER_PERSONAL_ACCESS_TOKEN ||
      "";

    const bodyObj = body as Record<string, unknown>;
    const messages = (bodyObj?.messages as QoderMessage[]) || [];
    const prompt = buildPrompt(messages);

    if (!prompt) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "No prompt text found in messages", type: "invalid_request_error" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return {
        response: errResp,
        url: "subprocess://qodercli",
        headers: {},
        transformedBody: body,
      };
    }

    // Resolve model (defaults to lite if invalid)
    const resolvedModel = resolveModel(model);

    // Build qodercli args — use stdin for long prompts to avoid E2BIG
    const useStdin = prompt.length > MAX_ARG_LENGTH;
    const args = useStdin
      ? ["-f", "stream-json", "--quiet"] // prompt via stdin
      : ["-p", prompt, "-f", "stream-json", "--quiet"]; // prompt via -p arg

    if (resolvedModel && resolvedModel !== "lite") {
      args.push("--model", resolvedModel);
    }

    // Handle max_tokens → --max-output-tokens (qodercli uses "16k" or "32k")
    const maxTokens = bodyObj?.max_tokens as number | undefined;
    if (maxTokens != null) {
      if (maxTokens >= 32000) {
        args.push("--max-output-tokens", "32k");
      } else if (maxTokens >= 16000) {
        args.push("--max-output-tokens", "16k");
      }
    }

    // Merge PAT into child process env
     
    // @ts-ignore — process global available at runtime in Node.js
    const spawnEnv: Record<string, string | undefined> = { ...process.env };
    if (pat) {
      spawnEnv["QODER_PERSONAL_ACCESS_TOKEN"] = pat;
    }

    const completionId = generateId();
    const created = Math.floor(Date.now() / 1000);
    const stdinPrompt = useStdin ? prompt : undefined;

    if (stream) {
      return this._streamingExecute(
        resolvedModel,
        body,
        args,
        spawnEnv,
        completionId,
        created,
        signal,
        log,
        stdinPrompt
      );
    }
    return this._nonStreamingExecute(
      resolvedModel,
      body,
      args,
      spawnEnv,
      completionId,
      created,
      signal,
      log,
      stdinPrompt
    );
  }

  _streamingExecute(
    model: string,
    body: unknown,
    args: string[],
    spawnEnv: Record<string, string | undefined>,
    completionId: string,
    created: number,
    signal: AbortSignal | null | undefined,
    log: ExecuteInput["log"],
    stdinPrompt?: string
  ): ExecuteResult {
    const encoder = new TextEncoder();

    const readable = new ReadableStream<Uint8Array>({
      start(controller) {
        let proc: ChildProcess;
        let timeoutHandle: ReturnType<typeof setTimeout> | null = null;
        let done = false;
        let headerSent = false;
        let hasContent = false;
        let lastFinishReason = "stop";
        let stdoutBuffer = ""; // Buffer for partial JSON lines

        const cleanup = () => {
          if (!done) {
            done = true;
            if (timeoutHandle) clearTimeout(timeoutHandle);
            try {
              proc.kill();
            } catch {}
          }
        };

        try {
          proc = spawnQoderCli(args, spawnEnv, stdinPrompt);
        } catch (err) {
          controller.error(err);
          return;
        }

        // Timeout protection (battle-tested from qoder-proxy)
        timeoutHandle = setTimeout(() => {
          log?.error?.("QODER", `qodercli timed out after ${QODER_TIMEOUT_MS}ms`);
          cleanup();
          const errChunk = {
            error: {
              message: `qodercli timed out after ${QODER_TIMEOUT_MS}ms`,
              type: "timeout_error",
            },
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errChunk)}\n\n`));
          controller.close();
        }, QODER_TIMEOUT_MS);

        if (signal) {
          if (signal.aborted) {
            cleanup();
            controller.close();
            return;
          }
          signal.addEventListener("abort", cleanup, { once: true });
        }

        // Buffer partial lines to handle chunks split across JSON boundaries
        proc.stdout?.on("data", (chunk: unknown) => {
          const lines = (stdoutBuffer + String(chunk)).split("\n");
          stdoutBuffer = lines.pop() || ""; // Keep incomplete line for next chunk

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const parsed = JSON.parse(trimmed) as QoderParsedLine;
              if (parsed.type === "assistant" && parsed.subtype === "message") {
                const contentArr = parsed.message?.content || [];

                // Check for tool calls first
                const toolCalls = extractToolCalls(contentArr);
                if (toolCalls) {
                  hasContent = true;
                  const toolChunk = {
                    id: completionId,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    choices: [
                      {
                        index: 0,
                        delta: { tool_calls: toolCalls },
                        finish_reason:
                          parsed.message?.status === "tool_calling" ? null : "tool_calls",
                      },
                    ],
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(toolChunk)}\n\n`));
                  lastFinishReason = "tool_calls";
                  continue;
                }

                // Extract text content
                for (const item of contentArr) {
                  if (item.type === "text" && item.text) {
                    hasContent = true;
                    // Send role delta once before first text
                    if (!headerSent) {
                      const roleChunk = {
                        id: completionId,
                        object: "chat.completion.chunk",
                        created,
                        model,
                        choices: [
                          {
                            index: 0,
                            delta: { role: "assistant", content: "" },
                            finish_reason: null,
                          },
                        ],
                      };
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify(roleChunk)}\n\n`));
                      headerSent = true;
                    }
                    const textChunk = {
                      id: completionId,
                      object: "chat.completion.chunk",
                      created,
                      model,
                      choices: [{ index: 0, delta: { content: item.text }, finish_reason: null }],
                    };
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(textChunk)}\n\n`));
                  } else if (item.type === "finish") {
                    lastFinishReason = mapFinishReason(item.reason);
                  }
                }

                // Check for stop_reason in message
                if (parsed.message?.stop_reason) {
                  lastFinishReason = mapFinishReason(parsed.message.stop_reason);
                }
              }
            } catch {
              // Handle plain text response (happens with some qodercli versions)
              const plainText = trimmed;
              if (plainText && !plainText.startsWith("{")) {
                hasContent = true;
                if (!headerSent) {
                  const roleChunk = {
                    id: completionId,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    choices: [
                      { index: 0, delta: { role: "assistant", content: "" }, finish_reason: null },
                    ],
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(roleChunk)}\n\n`));
                  headerSent = true;
                }
                const textChunk = {
                  id: completionId,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  choices: [{ index: 0, delta: { content: plainText }, finish_reason: null }],
                };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(textChunk)}\n\n`));
              }
            }
          }
        });

        proc.stderr?.on("data", (chunk: unknown) => {
          log?.debug?.("QODER", `stderr: ${String(chunk).slice(0, 300)}`);
        });

        proc.on("error", (err: Error) => {
          log?.error?.("QODER", `spawn error: ${err.message}`);
          cleanup();
          controller.error(err);
        });

        proc.on("close", (code: number | null) => {
          if (done) return;
          done = true;
          if (timeoutHandle) clearTimeout(timeoutHandle);
          if (signal) signal.removeEventListener("abort", cleanup);
          log?.debug?.("QODER", `qodercli exited with code ${code}`);

          // Handle non-zero exit code as error (don't send [DONE] for failures)
          if (code !== 0 && code !== null) {
            const errChunk = {
              error: {
                message: `qodercli exited with code ${code}`,
                type: "api_error",
              },
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(errChunk)}\n\n`));
            controller.close();
            return;
          }

          // Handle case where no content was received
          if (!hasContent) {
            const errChunk = {
              error: {
                message: "qodercli returned no content",
                type: "api_error",
              },
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(errChunk)}\n\n`));
            controller.close();
            return;
          }

          // Send final done chunk with finish reason
          const doneChunk = {
            id: completionId,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: {}, finish_reason: lastFinishReason }],
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(doneChunk)}\n\n`));
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        });
      },
    });

    const response = new Response(readable, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });

    return { response, url: "subprocess://qodercli", headers: {}, transformedBody: body };
  }

  _nonStreamingExecute(
    model: string,
    body: unknown,
    args: string[],
    spawnEnv: Record<string, string | undefined>,
    completionId: string,
    created: number,
    signal: AbortSignal | null | undefined,
    log: ExecuteInput["log"],
    stdinPrompt?: string
  ): Promise<ExecuteResult> {
    return new Promise((resolve, reject) => {
      let proc: ChildProcess;
      let timeoutHandle: ReturnType<typeof setTimeout> | null = null;
      let settled = false;
      let output = "";
      let stderrOutput = "";

      const settle = (fn: () => void) => {
        if (settled) return;
        settled = true;
        if (timeoutHandle) clearTimeout(timeoutHandle);
        fn();
      };

      const cleanup = () => {
        settle(() => {
          try {
            proc.kill();
          } catch {}
          reject(createAbortError());
        });
      };

      try {
        proc = spawnQoderCli(args, spawnEnv, stdinPrompt);
      } catch (err) {
        reject(err);
        return;
      }

      // Timeout protection (battle-tested from qoder-proxy)
      timeoutHandle = setTimeout(() => {
        proc.kill();
        settle(() => {
          const errResp = new Response(
            JSON.stringify({
              error: {
                message: `qodercli timed out after ${QODER_TIMEOUT_MS}ms`,
                type: "timeout_error",
              },
            }),
            { status: 504, headers: { "Content-Type": "application/json" } }
          );
          resolve({
            response: errResp,
            url: "subprocess://qodercli",
            headers: {},
            transformedBody: body,
          });
        });
      }, QODER_TIMEOUT_MS);

      if (signal) {
        if (signal.aborted) {
          cleanup();
          return;
        }
        signal.addEventListener("abort", cleanup, { once: true });
      }

      proc.stdout?.on("data", (chunk: unknown) => {
        output += String(chunk);
      });

      proc.stderr?.on("data", (chunk: unknown) => {
        const text = String(chunk).trim();
        stderrOutput += text + "\n";
        log?.debug?.("QODER", `stderr: ${text.slice(0, 300)}`);
      });

      proc.on("error", (err) => {
        settle(() => reject(err));
      });

      proc.on("close", (code: number | null) => {
        settle(() => {
          if (signal) signal.removeEventListener("abort", cleanup);
          log?.debug?.("QODER", `qodercli exited with code ${code}`);

          // Check exit code (battle-tested from qoder-proxy)
          if (code !== 0 && code !== null) {
            const errResp = new Response(
              JSON.stringify({
                error: {
                  message: `qodercli exited with code ${code}`,
                  type: "api_error",
                  details: stderrOutput.trim(),
                },
              }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
            resolve({
              response: errResp,
              url: "subprocess://qodercli",
              headers: {},
              transformedBody: body,
            });
            return;
          }

          // Parse stream-json output
          let fullText = "";
          let inputTokens = 0;
          let outputTokens = 0;
          let finishReason = "stop";
          const allToolCalls: ToolCall[] = [];

          for (const line of output.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const parsed = JSON.parse(trimmed) as QoderParsedLine;
              if (parsed.type === "result" && parsed.subtype === "success") {
                const contentArr = parsed.message?.content || [];
                fullText = contentArr
                  .filter((c) => c.type === "text")
                  .map((c) => c.text || "")
                  .join("");
                break;
              } else if (parsed.type === "assistant" && parsed.subtype === "message") {
                const contentArr = parsed.message?.content || [];

                // Extract tool calls
                const toolCalls = extractToolCalls(contentArr);
                if (toolCalls) {
                  allToolCalls.push(...toolCalls);
                  finishReason = "tool_calls";
                }

                // Extract text
                fullText = contentArr
                  .filter((c) => c.type === "text")
                  .map((c) => c.text || "")
                  .join("");
                inputTokens = parsed.message?.usage?.input_tokens || 0;
                outputTokens = parsed.message?.usage?.output_tokens || 0;

                if (parsed.message?.stop_reason) {
                  finishReason = mapFinishReason(parsed.message.stop_reason);
                }
              }
            } catch {
              // Handle plain text response (happens with some qodercli versions)
              const plainText = trimmed;
              if (plainText && !plainText.startsWith("{")) {
                fullText += plainText;
              }
            }
          }

          // Build response (with or without tool calls)
          const completion =
            allToolCalls.length > 0
              ? {
                  id: completionId,
                  object: "chat.completion",
                  created,
                  model,
                  choices: [
                    {
                      index: 0,
                      message: {
                        role: "assistant",
                        content: fullText || null,
                        tool_calls: allToolCalls,
                      },
                      finish_reason: finishReason,
                    },
                  ],
                  usage: {
                    prompt_tokens: inputTokens,
                    completion_tokens: outputTokens,
                    total_tokens: inputTokens + outputTokens,
                  },
                }
              : {
                  id: completionId,
                  object: "chat.completion",
                  created,
                  model,
                  choices: [
                    {
                      index: 0,
                      message: { role: "assistant", content: fullText },
                      finish_reason: finishReason,
                    },
                  ],
                  usage: {
                    prompt_tokens: inputTokens,
                    completion_tokens: outputTokens,
                    total_tokens: inputTokens + outputTokens,
                  },
                };

          const response = new Response(JSON.stringify(completion), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
          resolve({ response, url: "subprocess://qodercli", headers: {}, transformedBody: body });
        });
      });
    });
  }
}
