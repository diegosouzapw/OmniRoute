import { spawn } from "node:child_process";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { DEVIN_MODEL_CATALOG } from "../config/providers/registry/devin/catalog.ts";
import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";
import {
  buildClaudeSseFrames,
  buildClaudeTextResponse,
  buildClaudeToolUseResponse,
} from "./devin-agentic/anthropicResponse.ts";
import { serializeAnthropicForDevin } from "./devin-agentic/serializer.ts";
import { parseDevinToolRequest } from "./devin-agentic/toolParser.ts";
import { asRecord, DevinAgenticBridgeError, estimateTokens } from "./devin-agentic/types.ts";

type AcpMessage = {
  jsonrpc: "2.0";
  id?: number | null;
  method?: string;
  params?: unknown;
  result?: unknown;
  error?: { code: number; message: string };
};

const ACP_PROTOCOL_VERSION = 1;
const MAX_ACP_OUTPUT_CHARS = 1024 * 1024;
const TRUSTED_DEVIN_BRIDGE_PROXY_URL = "http://network-guard:8080";
const REPAIRABLE_TOOL_ERRORS = new Set([
  "invalid_tool_json",
  "missing_tool_name",
  "unknown_tool",
  "invalid_tool_arguments",
  "multiple_tool_requests",
  "mixed_tool_narrative",
  "unexecuted_tool_intent",
]);

function describesUnexecutedToolIntent(text: string): boolean {
  const action = "(?:read|inspect|examine|edit|fix|run|check|test|start)";
  const futureAction = new RegExp(
    `\\b(?:(?:next(?: immediate)?|immediate next)\\s+(?:task|step)|planned actions?)\\b[\\s\\S]{0,320}\\b${action}\\b`,
    "i"
  );
  return (
    futureAction.test(text) ||
    new RegExp(`\\b(?:i(?:'ll| will)|let me)\\b[^\\n.!?]{0,160}\\b${action}\\b`, "i").test(text) ||
    new RegExp(`\\bnext steps?\\s*:\\s*${action}\\b`, "i").test(text) ||
    new RegExp(`\\bnext immediate (?:task|step)\\s*:\\s*${action}\\b`, "i").test(text) ||
    new RegExp(`\\bplanned actions?\\s*:\\s*${action}\\b`, "i").test(text) ||
    new RegExp(`\\b(?:still|now)\\s+(?:need|needs|required)\\s+to\\s+${action}\\b`, "i").test(
      text
    ) ||
    /\btests?\s+(?:have|has|were|was)?\s*not\s+(?:yet\s+)?(?:been\s+)?run\b/i.test(text)
  );
}

function framePromptForNoToolsSummarizer(promptText: string): string {
  return [
    "[Devin Summarizer Bridge]",
    "Treat the content below as an execution trace whose next assistant output must be determined.",
    "If another client-owned action is required, return exactly one <tool> JSON envelope using the catalog in the trace and no prose.",
    "The client will execute that tool; never execute or claim to execute a tool inside Devin.",
    "The client workspace is /workspace; /home/bridge is only the isolated Devin process home.",
    "If the task is complete, return only a concise final answer.",
    "Do not wrap the response in Markdown fences or a <summary> element.",
    "",
    "[Execution Trace]",
    promptText,
  ].join("\n");
}

const CLAUDE_ENV_BLOCKLIST = [
  "ANTHROPIC_API_KEY",
  "CLAUDE_CODE_OAUTH_TOKEN",
  "ANTHROPIC_BEDROCK_BASE_URL",
  "ANTHROPIC_VERTEX_BASE_URL",
  "CLAUDE_CODE_USE_BEDROCK",
  "CLAUDE_CODE_USE_VERTEX",
  "CLAUDE_CODE_USE_FOUNDRY",
];

function resolveDevinBin(): string {
  const envBin = process.env.CLI_DEVIN_AGENTIC_BIN?.trim() || process.env.CLI_DEVIN_BIN?.trim();
  if (envBin) return envBin;

  if (process.platform === "win32") {
    const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local");
    const winPath = path.join(localAppData, "devin", "cli", "bin", "devin.exe");
    if (fs.existsSync(winPath)) return winPath;
    return "devin.exe";
  }

  for (const candidate of [
    path.join(os.homedir(), ".local", "share", "devin", "bin", "devin"),
    path.join(os.homedir(), ".devin", "bin", "devin"),
  ]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return "devin";
}

function rpc(method: string, params: unknown, id: number): string {
  return JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n";
}

export function assertLocalAcpUrl(url: string): void {
  if (url !== "devin://acp/stdio") {
    throw new DevinAgenticBridgeError(
      "devin-cli-agentic accepts only the local Devin ACP stdio upstream",
      "invalid_acp_upstream",
      500
    );
  }
}

function isIsolatedHome(value: string): boolean {
  return value === "/home/bridge" || value.includes("/.sandbox/");
}

export function buildDevinChildEnv(
  _credentials: ExecuteInput["credentials"],
  source: NodeJS.ProcessEnv = process.env
): NodeJS.ProcessEnv {
  const home = source.DEVIN_AGENTIC_HOME?.trim() || "";
  if (!home || !path.isAbsolute(home) || !isIsolatedHome(home)) {
    throw new DevinAgenticBridgeError(
      "DEVIN_AGENTIC_HOME must be an absolute path inside the bridge sandbox",
      "unsafe_devin_home",
      500
    );
  }

  const env: NodeJS.ProcessEnv = {
    HOME: home,
    XDG_CONFIG_HOME: path.join(home, ".config"),
    XDG_DATA_HOME: path.join(home, ".local", "share"),
    XDG_CACHE_HOME: path.join(home, ".cache"),
    PATH: source.PATH || "/usr/local/bin:/usr/bin:/bin",
    LANG: source.LANG || "C.UTF-8",
    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1",
    DISABLE_TELEMETRY: "1",
    DISABLE_ERROR_REPORTING: "1",
    DISABLE_AUTOUPDATER: "1",
  };
  if (source.LC_ALL) env.LC_ALL = source.LC_ALL;
  if (source.TERM) env.TERM = source.TERM;
  if (source.DEVIN_BRIDGE_MOCK_LOG === "/evidence/mock-acp.jsonl") {
    env.DEVIN_BRIDGE_MOCK_LOG = source.DEVIN_BRIDGE_MOCK_LOG;
  }
  if (source.DEVIN_BRIDGE_PROXY_URL === TRUSTED_DEVIN_BRIDGE_PROXY_URL) {
    env.HTTP_PROXY = TRUSTED_DEVIN_BRIDGE_PROXY_URL;
    env.HTTPS_PROXY = TRUSTED_DEVIN_BRIDGE_PROXY_URL;
  }

  for (const key of CLAUDE_ENV_BLOCKLIST) delete env[key];
  return env;
}

function errorBody(error: unknown) {
  const bridge = error instanceof DevinAgenticBridgeError ? error : null;
  const status = bridge?.status || 500;
  const message = bridge?.message || (error instanceof Error ? error.message : String(error));
  return buildErrorBody(status, sanitizeErrorMessage(message), undefined, {
    type: "devin_agentic_error",
    code: bridge?.code || "devin_agentic_error",
  });
}

export async function runAcpTurn(args: {
  devinBin: string;
  env: NodeJS.ProcessEnv;
  model: string;
  promptText: string;
  signal?: AbortSignal | null;
  log?: ExecuteInput["log"];
}) {
  const timeoutMs = Number(process.env.DEVIN_AGENTIC_ACP_TIMEOUT_MS || 120000);
  const child = spawn(args.devinBin, ["acp", "--agent-type", "summarizer"], {
    env: args.env,
    cwd: args.env.HOME,
    stdio: ["pipe", "pipe", "pipe"],
    shell: false,
  });

  let nextId = 1;
  let buffer = "";
  let text = "";
  let phase: "initialize" | "session" | "prompt" = "initialize";
  let sessionId = "";
  let initializeRequestId = 0;
  let sessionRequestId = 0;
  let promptRequestId = 0;
  let settled = false;

  return await new Promise<string>((resolve, reject) => {
    const abortHandler = () => {
      finish(new DevinAgenticBridgeError("Devin ACP request was cancelled", "acp_cancelled", 499));
    };

    const finish = (err: Error | null, value = "") => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      args.signal?.removeEventListener("abort", abortHandler);
      try {
        child.stdin.end();
      } catch {}
      if (!child.killed) child.kill("SIGTERM");
      if (err) reject(err);
      else resolve(value);
    };

    const timer = setTimeout(() => {
      finish(
        new DevinAgenticBridgeError(`Devin ACP timed out after ${timeoutMs}ms`, "acp_timeout", 504)
      );
    }, timeoutMs);
    timer.unref?.();

    const send = (method: string, params: unknown) => {
      const id = nextId++;
      child.stdin.write(rpc(method, params, id));
      return id;
    };

    if (args.signal?.aborted) return abortHandler();
    args.signal?.addEventListener("abort", abortHandler, { once: true });

    child.on("error", (err) => {
      const message =
        err.message.includes("ENOENT") || err.message.includes("not found")
          ? `Devin CLI not found: ${args.devinBin}. Install the official Devin CLI or set CLI_DEVIN_AGENTIC_BIN.`
          : `Devin CLI spawn error: ${err.message}`;
      finish(new DevinAgenticBridgeError(message, "spawn_failed", 502));
    });

    child.stderr.on("data", (chunk: Buffer) => {
      args.log?.debug?.("DEVIN_AGENTIC", `stderr: ${chunk.toString("utf8").slice(0, 200)}`);
    });

    child.stdout.on("data", (chunk: Buffer) => {
      buffer += chunk.toString("utf8");
      if (buffer.length + text.length > MAX_ACP_OUTPUT_CHARS) {
        finish(
          new DevinAgenticBridgeError(
            "Devin ACP output exceeded the bridge limit",
            "acp_output_too_large",
            502
          )
        );
        return;
      }
      let nl: number;
      while ((nl = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line) continue;

        let msg: AcpMessage;
        try {
          msg = JSON.parse(line);
        } catch {
          finish(
            new DevinAgenticBridgeError(
              "Devin ACP emitted invalid JSON on stdout",
              "invalid_acp_frame",
              502
            )
          );
          return;
        }

        if (msg.error) {
          finish(
            new DevinAgenticBridgeError(
              `Devin ACP error ${msg.error.code}: ${msg.error.message}`,
              "acp_error",
              502
            )
          );
          return;
        }

        if (phase === "initialize" && msg.id === initializeRequestId && msg.result !== undefined) {
          const protocolVersion = Number(asRecord(msg.result).protocolVersion);
          if (protocolVersion !== ACP_PROTOCOL_VERSION) {
            finish(
              new DevinAgenticBridgeError(
                `Devin ACP negotiated unsupported protocol version: ${String(protocolVersion)}`,
                "unsupported_acp_version",
                502
              )
            );
            return;
          }
          phase = "session";
          sessionRequestId = send("session/new", {
            cwd: args.env.HOME,
            mcpServers: [],
            model: args.model || undefined,
          });
          continue;
        }

        if (phase === "session" && msg.id === sessionRequestId && msg.result !== undefined) {
          const sessionResult = asRecord(msg.result);
          sessionId = String(sessionResult.sessionId || "");
          if (!sessionId) {
            finish(
              new DevinAgenticBridgeError(
                "Devin ACP session/new returned no sessionId",
                "missing_session_id",
                502
              )
            );
            return;
          }

          phase = "prompt";
          promptRequestId = send("session/prompt", {
            sessionId,
            prompt: [{ type: "text", text: framePromptForNoToolsSummarizer(args.promptText) }],
          });
          continue;
        }

        if (msg.method === "session/update" || msg.method === "$/update") {
          const params = asRecord(msg.params);
          const updateSessionId = String(params.sessionId || "");
          if (updateSessionId && sessionId && updateSessionId !== sessionId) {
            finish(
              new DevinAgenticBridgeError(
                "Devin ACP update referenced a different session",
                "acp_session_mismatch",
                502
              )
            );
            return;
          }
          const update = asRecord(params.update);
          const kind = String(update.sessionUpdate || params.type || "");
          if (kind === "tool_call" || kind === "tool_call_update") {
            finish(
              new DevinAgenticBridgeError(
                "Devin attempted to execute a tool internally; Claude Code must own all tool execution",
                "devin_internal_tool_execution",
                502
              )
            );
            return;
          }
          if (kind === "agent_message_chunk") {
            text += extractText(update.content);
          } else if (
            kind === "message_delta" ||
            kind === "text_delta" ||
            kind === "content_delta"
          ) {
            text += String(params.content || params.delta || params.text || "");
          }
          continue;
        }

        if (phase === "prompt" && msg.id === promptRequestId && msg.result !== undefined) {
          const stopReason = String(asRecord(msg.result).stopReason || "");
          if (stopReason === "cancelled") {
            finish(
              new DevinAgenticBridgeError("Devin ACP cancelled the turn", "acp_cancelled", 502)
            );
            return;
          }
          const resultText =
            extractText(asRecord(msg.result).content) || extractText(asRecord(msg.result).message);
          const finalText = text || resultText;
          if (!finalText) {
            finish(
              new DevinAgenticBridgeError(
                `Devin ACP completed without model output (stopReason=${stopReason || "missing"})`,
                "empty_acp_output",
                502
              )
            );
            return;
          }
          finish(null, finalText);
          continue;
        }

        if (msg.id !== undefined && msg.id !== null && !msg.method) {
          finish(
            new DevinAgenticBridgeError(
              `Devin ACP returned an unexpected response id: ${String(msg.id)}`,
              "unexpected_acp_response",
              502
            )
          );
          return;
        }
      }
    });

    child.on("close", (code) => {
      if (settled) return;
      if (code === 0 && text) finish(null, text);
      else
        finish(
          new DevinAgenticBridgeError(
            `Devin CLI exited before completing the turn with code ${code}`,
            "acp_early_exit",
            502
          )
        );
    });

    initializeRequestId = send("initialize", {
      protocolVersion: ACP_PROTOCOL_VERSION,
      clientInfo: { name: "omniroute-devin-cli-agentic", version: "1.0" },
      clientCapabilities: {},
    });
  });
}

function assertKnownDevinModel(model: string): void {
  if (!DEVIN_MODEL_CATALOG.some((entry) => entry.id === model)) {
    throw new DevinAgenticBridgeError(
      `Model is not present in the current Devin catalog: ${model}`,
      "unknown_devin_model",
      400
    );
  }
}

async function generateAgenticOutput(
  args: Omit<Parameters<typeof runAcpTurn>[0], "promptText">,
  promptText: string
) {
  const first = await runAcpTurn({ ...args, promptText });
  return first;
}

function extractText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map((item) => extractText(item)).join("");
  const record = asRecord(value);
  if (typeof record.text === "string") return record.text;
  if (typeof record.content === "string") return record.content;
  return "";
}

export class DevinCliAgenticExecutor extends BaseExecutor {
  constructor() {
    super("devin-cli-agentic", { id: "devin-cli-agentic", baseUrl: "devin://acp/stdio" });
  }

  buildUrl(): string {
    const url = "devin://acp/stdio";
    assertLocalAcpUrl(url);
    return url;
  }

  buildHeaders(): Record<string, string> {
    return {};
  }

  transformRequest(): unknown {
    return null;
  }

  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
    try {
      assertKnownDevinModel(model);
      const prompt = serializeAnthropicForDevin(body);
      const devinBin = resolveDevinBin();
      log?.info?.("DEVIN_AGENTIC", `devin acp → model=${model}, bin=${devinBin}`);

      const turnArgs = {
        devinBin,
        env: buildDevinChildEnv(credentials),
        model,
        signal,
        log,
      };

      let text = await generateAgenticOutput(turnArgs, prompt.text);
      let tool;
      try {
        if (prompt.tools.length > 0 && describesUnexecutedToolIntent(text)) {
          throw new DevinAgenticBridgeError(
            "The response described a future action without performing it; call exactly one tool now",
            "unexecuted_tool_intent"
          );
        }
        tool = parseDevinToolRequest(text, prompt.tools, prompt.idSeed);
      } catch (error) {
        if (
          !(error instanceof DevinAgenticBridgeError) ||
          !REPAIRABLE_TOOL_ERRORS.has(error.code)
        ) {
          throw error;
        }
        const requiresToolOnRepair = error.code === "unexecuted_tool_intent";
        const repairPrompt = [
          prompt.text,
          "",
          "---",
          "",
          "[Single Repair Attempt]",
          `The previous output was rejected: ${sanitizeErrorMessage(error.message)}`,
          requiresToolOnRepair
            ? "Plain text is not accepted for this repair. Return exactly one standalone <tool> JSON envelope now."
            : "Return either plain final text or exactly one standalone <tool> JSON envelope.",
          "Do not narrate a tool action.",
        ].join("\n");
        text = await generateAgenticOutput(turnArgs, repairPrompt);
        tool = parseDevinToolRequest(text, prompt.tools, prompt.idSeed);
        if (requiresToolOnRepair && !tool) {
          throw new DevinAgenticBridgeError(
            "Devin repeated a narrated tool action instead of requesting a tool",
            "unexecuted_tool_intent",
            502
          );
        }
      }

      const id = `msg_devin_${randomUUID().replaceAll("-", "")}`;
      const outputTokens = estimateTokens(text);
      const message = tool
        ? buildClaudeToolUseResponse({
            id,
            model,
            tool,
            inputTokens: prompt.inputTokensEstimate,
            outputTokens,
          })
        : buildClaudeTextResponse({
            id,
            model,
            text,
            inputTokens: prompt.inputTokensEstimate,
            outputTokens,
          });

      const responseBody = stream ? buildClaudeSseFrames(message) : JSON.stringify(message);
      return {
        response: new Response(responseBody, {
          status: 200,
          headers: {
            "Content-Type": stream ? "text/event-stream" : "application/json",
            "Cache-Control": "no-cache",
          },
        }),
        url: "devin://acp/stdio",
        headers: {},
        transformedBody: { model, promptLength: prompt.text.length },
      };
    } catch (error) {
      const bridge = error instanceof DevinAgenticBridgeError ? error : null;
      return {
        response: new Response(JSON.stringify(errorBody(error)), {
          status: bridge?.status || 500,
          headers: { "Content-Type": "application/json" },
        }),
        url: "devin://acp/stdio",
        headers: {},
        transformedBody: { model },
      };
    }
  }
}
