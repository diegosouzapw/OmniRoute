// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — node:child_process available at runtime in Next.js server context
import { spawn } from "node:child_process";
import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import type { ExecuteInput } from "./base.ts";

type QoderMessage = {
  role: string;
  content: string | Array<{ type: string; text?: string }>;
};

type QoderContentItem = {
  type: string;
  text?: string;
  reason?: string;
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
  };
  done?: boolean;
};

type ExecuteResult = {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
};

function extractTextContent(content: string | Array<{ type: string; text?: string }>): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .filter((c) => c.type === "text")
    .map((c) => c.text || "")
    .join("");
}

/**
 * Convert OpenAI-format messages array into a plain prompt string for qodercli.
 * Multi-turn conversations are formatted with role prefixes.
 */
function buildPrompt(messages: QoderMessage[]): string {
  const parts: string[] = [];
  for (const msg of messages) {
    const text = extractTextContent(msg.content).trim();
    if (!text) continue;
    if (msg.role === "system") {
      parts.push(`System: ${text}`);
    } else if (msg.role === "user") {
      parts.push(`Human: ${text}`);
    } else if (msg.role === "assistant") {
      parts.push(`Assistant: ${text}`);
    }
  }
  return parts.join("\n\n");
}

function generateId(): string {
  return `chatcmpl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function mapFinishReason(reason: string | undefined): string {
  if (reason === "end_turn") return "stop";
  if (reason === "max_tokens") return "length";
  return reason || "stop";
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

  transformRequest(_model: string, body: unknown, _stream: boolean, _credentials: unknown): unknown {
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
      return { response: errResp, url: "subprocess://qodercli", headers: {}, transformedBody: body };
    }

    // Build qodercli args
    const args = ["-p", prompt, "-f", "stream-json", "--quiet"];
    if (model && model !== "auto") {
      args.push("--model", model);
    }

    // Merge PAT into child process env
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore — process global available at runtime in Node.js
    const spawnEnv: Record<string, string | undefined> = { ...process.env };
    if (pat) {
      spawnEnv["QODER_PERSONAL_ACCESS_TOKEN"] = pat;
    }

    const completionId = generateId();
    const created = Math.floor(Date.now() / 1000);

    if (stream) {
      return this._streamingExecute(model, body, args, spawnEnv, completionId, created, signal, log);
    }
    return this._nonStreamingExecute(model, body, args, spawnEnv, completionId, created, signal, log);
  }

  _streamingExecute(
    model: string,
    body: unknown,
    args: string[],
    spawnEnv: Record<string, string | undefined>,
    completionId: string,
    created: number,
    signal: AbortSignal | null | undefined,
    log: ExecuteInput["log"]
  ): ExecuteResult {
    const encoder = new TextEncoder();

    const readable = new ReadableStream<Uint8Array>({
      start(controller) {
        let proc: ReturnType<typeof spawn>;
        try {
          // On Windows, use shell:true to allow .cmd/.bat resolution via PATH
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore — process global available at runtime in Node.js
          const isWindows = process.platform === "win32";
          proc = spawn("qodercli", args, {
            stdio: ["ignore", "pipe", "pipe"],
            env: spawnEnv,
            shell: isWindows,
            windowsHide: true, // Don't pop up console window
          });
        } catch (err) {
          controller.error(err);
          return;
        }

        let headerSent = false;
        let done = false;

        const cleanup = () => {
          if (!done) {
            done = true;
            try {
              proc.kill();
            } catch {}
          }
        };

        if (signal) {
          if (signal.aborted) {
            cleanup();
            controller.close();
            return;
          }
          signal.addEventListener("abort", cleanup, { once: true });
        }

        proc.stdout?.on("data", (chunk: unknown) => {
          const lines = String(chunk).split("\n");
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const parsed = JSON.parse(trimmed) as QoderParsedLine;
              if (parsed.type === "assistant" && parsed.subtype === "message") {
                const contentArr = parsed.message?.content || [];
                for (const item of contentArr) {
                  if (item.type === "text" && item.text) {
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
                      controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify(roleChunk)}\n\n`)
                      );
                      headerSent = true;
                    }
                    const textChunk = {
                      id: completionId,
                      object: "chat.completion.chunk",
                      created,
                      model,
                      choices: [
                        { index: 0, delta: { content: item.text }, finish_reason: null },
                      ],
                    };
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify(textChunk)}\n\n`)
                    );
                  } else if (item.type === "finish") {
                    const doneChunk = {
                      id: completionId,
                      object: "chat.completion.chunk",
                      created,
                      model,
                      choices: [
                        {
                          index: 0,
                          delta: {},
                          finish_reason: mapFinishReason(item.reason),
                        },
                      ],
                    };
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify(doneChunk)}\n\n`)
                    );
                  }
                }
              }
            } catch {
              // skip non-JSON lines (qodercli debug/info output)
            }
          }
        });

        proc.stderr?.on("data", (chunk: unknown) => {
          log?.debug?.("QODER", `stderr: ${String(chunk).slice(0, 300)}`);
        });

        proc.on("error", (err: Error) => {
          log?.error?.("QODER", `spawn error: ${err.message}`);
          controller.error(err);
        });

        proc.on("close", (code: number | null) => {
          done = true;
          if (signal) signal.removeEventListener("abort", cleanup);
          log?.debug?.("QODER", `qodercli exited with code ${code}`);
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
    log: ExecuteInput["log"]
  ): Promise<ExecuteResult> {
    return new Promise((resolve, reject) => {
      let proc: ReturnType<typeof spawn>;
      try {
        // On Windows, use shell:true to allow .cmd/.bat resolution via PATH
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — process global available at runtime in Node.js
        const isWindows = process.platform === "win32";
        proc = spawn("qodercli", args, {
          stdio: ["ignore", "pipe", "pipe"],
          env: spawnEnv,
          shell: isWindows,
          windowsHide: true, // Don't pop up console window
        });
      } catch (err) {
        reject(err);
        return;
      }

      let output = "";
      let aborted = false;

      const cleanup = () => {
        if (!aborted) {
          aborted = true;
          try {
            proc.kill();
          } catch {}
          reject(new Error("Aborted"));
        }
      };

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
        log?.debug?.("QODER", `stderr: ${String(chunk).slice(0, 300)}`);
      });

      proc.on("error", reject);

      proc.on("close", (code: number | null) => {
        if (aborted) return;
        if (signal) signal.removeEventListener("abort", cleanup);
        log?.debug?.("QODER", `qodercli exited with code ${code}`);

        // Parse stream-json output — prefer result line, fall back to last assistant line
        let fullText = "";
        let inputTokens = 0;
        let outputTokens = 0;

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
              fullText = contentArr
                .filter((c) => c.type === "text")
                .map((c) => c.text || "")
                .join("");
              inputTokens = parsed.message?.usage?.input_tokens || 0;
              outputTokens = parsed.message?.usage?.output_tokens || 0;
            }
          } catch {
            // skip non-JSON lines
          }
        }

        const completion = {
          id: completionId,
          object: "chat.completion",
          created,
          model,
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: fullText },
              finish_reason: "stop",
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
  }
}

export default QoderExecutor;
