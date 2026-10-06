import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { ZCODE_MODELS } from "../config/providers/registry/zcode/index.ts";
import { BaseExecutor, type ExecuteInput, type ExecutorExecuteResult, type ProviderCredentials } from "./base.ts";
import { ZcodeAppServerClient, type ZcodeClientLike } from "./zcodeProtocol.ts";
import { buildErrorBody, errorResponse, sanitizeErrorMessage } from "../utils/error.ts";

const ZCODE_URL = "zcode://app-server/stdio";
const DEFAULT_PROVIDER_ID = "builtin:zai-coding-plan";
const DEFAULT_TURN_TIMEOUT_MS = 120_000;
const DEFAULT_POLL_INTERVAL_MS = 250;
const TERMINAL_STATUSES = new Set(["completed", "idle", "paused", "error"]);
const ZCODE_MODEL_ALLOWLIST = new Set(ZCODE_MODELS.map((model) => model.id));
const DEFAULT_ZCODE_MODEL = ZCODE_MODELS[0]?.id || "glm-5.2";

type JsonRecord = Record<string, unknown>;
type OpenAIMsg = { role?: string; content?: unknown };

type ZcodeCommand = { command: string; args: string[] };
type ZcodeModelResolution = { ok: true; model: string } | { ok: false; error: string };

export interface ZcodeExecutorOptions {
  command?: string;
  args?: string[];
  cwd?: string;
  providerId?: string;
  startupTimeoutMs?: number;
  requestTimeoutMs?: number;
  turnTimeoutMs?: number;
  pollIntervalMs?: number;
  clientFactory?: () => ZcodeClientLike;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value as JsonRecord : {};
}

function textFromContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (typeof part === "string") return part;
      const record = asRecord(part);
      if (record.type === "text" || record.type === "input_text" || record.type === "output_text") {
        return typeof record.text === "string" ? record.text : "";
      }
      return "";
    })
    .join("");
}

/** Convert an OpenAI conversation into one explicit ZCode coding turn. */
export function buildZcodePrompt(messages: OpenAIMsg[]): string {
  const parts: string[] = [];
  for (const message of messages) {
    const text = textFromContent(message.content).trim();
    if (!text) continue;
    const role = String(message.role || "user");
    const label = role === "system" ? "System" : role === "assistant" ? "Assistant" : "User";
    parts.push(`[${label}]\n${text}`);
  }
  return parts.join("\n\n") || "(empty)";
}

export function resolveZcodeModel(model: unknown): ZcodeModelResolution {
  const requested = typeof model === "string" ? model.trim() : "";
  if (!requested) return { ok: true, model: DEFAULT_ZCODE_MODEL };
  if (requested.startsWith("-")) {
    return { ok: false, error: `Invalid ZCode model \"${requested}\": model must not start with \"-\".` };
  }
  const normalized = requested.startsWith("zcode/")
    ? requested.slice("zcode/".length)
    : requested;
  if (!ZCODE_MODEL_ALLOWLIST.has(normalized)) {
    return {
      ok: false,
      error: `Unknown ZCode model \"${requested}\". Supported models: ${[...ZCODE_MODEL_ALLOWLIST].join(", ")}.`,
    };
  }
  return { ok: true, model: normalized };
}

function parseArgs(raw: string | undefined): string[] {
  if (!raw) return ["app-server"];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed) || parsed.length > 16 || !parsed.every((arg) => typeof arg === "string" && arg.length <= 4096)) {
    throw new Error("ZCODE_ARGS must be a JSON array of at most 16 strings");
  }
  return parsed as string[];
}

function defaultCommand(): ZcodeCommand {
  const runtimeRoot = process.env.ZCODE_SERVER_RUNTIME_ROOT || join(homedir(), ".zcode", "server");
  const serverNode = process.env.ZCODE_SERVER_NODE || join(runtimeRoot, "node");
  const serverEntry = process.env.ZCODE_SERVER_ENTRY || join(runtimeRoot, "zcode-server.cjs");
  if (existsSync(serverNode) && existsSync(serverEntry)) {
    return { command: serverNode, args: [serverEntry] };
  }
  return { command: process.env.ZCODE_BIN || "zcode", args: parseArgs(process.env.ZCODE_ARGS) };
}

function extractSessionId(value: unknown): string | undefined {
  const root = asRecord(value);
  const nested = asRecord(root.session);
  const sessionId = nested.sessionId ?? root.sessionId;
  return typeof sessionId === "string" && sessionId.trim() ? sessionId : undefined;
}

function extractStatus(value: unknown): string | undefined {
  const root = asRecord(value);
  const nested = asRecord(root.session);
  const status = nested.status ?? root.status;
  return typeof status === "string" ? status : undefined;
}

function extractTextFromMessage(value: unknown): { role?: string; text: string } {
  const message = asRecord(value);
  const info = asRecord(message.info);
  const role = typeof info.role === "string" ? info.role : typeof message.role === "string" ? message.role : undefined;
  const parts = Array.isArray(message.parts) ? message.parts : [];
  const text = parts
    .map((part) => {
      const record = asRecord(part);
      if (record.type === "text" && typeof record.text === "string") return record.text;
      return "";
    })
    .join("");
  return { role, text };
}

function extractAssistantText(value: unknown): string {
  const root = asRecord(value);
  const messages = Array.isArray(root.messages) ? root.messages : [];
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = extractTextFromMessage(messages[i]);
    if (message.text && (!message.role || message.role === "assistant")) return message.text;
  }
  const nestedMessage = extractTextFromMessage(root.message);
  if (nestedMessage.text) return nestedMessage.text;
  for (const candidate of [root.content, root.text, root.output_text]) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }
  return "";
}

function extractErrorMessage(value: unknown): string {
  const root = asRecord(value);
  const nested = asRecord(root.error);
  for (const candidate of [nested.message, root.message, root.reason]) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }
  return "ZCode app-server returned an error";
}

function makeWorkspace(cwd: string): JsonRecord {
  return { workspacePath: cwd, workspaceIdentity: cwd };
}

function abortError(): Error {
  return new Error("ZCode request aborted");
}

async function raceAbort<T>(promise: Promise<T>, signal?: AbortSignal | null): Promise<T> {
  if (!signal) return promise;
  if (signal.aborted) {
    promise.catch(() => undefined);
    throw abortError();
  }
  let onAbort: (() => void) | undefined;
  const aborted = new Promise<T>((_, reject) => {
    onAbort = () => reject(abortError());
    signal.addEventListener("abort", onAbort, { once: true });
  });
  promise.catch(() => undefined);
  try {
    return await Promise.race([promise, aborted]);
  } finally {
    if (onAbort) signal.removeEventListener("abort", onAbort);
  }
}

async function delay(ms: number, signal?: AbortSignal | null): Promise<void> {
  if (ms <= 0) {
    if (signal?.aborted) throw abortError();
    return;
  }
  await raceAbort(new Promise<void>((resolveDelay) => {
    const timer = setTimeout(resolveDelay, ms);
    timer.unref?.();
  }), signal);
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

function completionResponse(model: string, prompt: string, content: string): Response {
  const promptTokens = estimateTokens(prompt);
  const completionTokens = estimateTokens(content);
  return new Response(JSON.stringify({
    id: `chatcmpl-zcode-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    usage: {
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: promptTokens + completionTokens,
      estimated: true,
    },
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

function sseResponse(model: string, content: string): Response {
  const id = `chatcmpl-zcode-${Date.now()}`;
  const created = Math.floor(Date.now() / 1000);
  const chunks = [
    { id, object: "chat.completion.chunk", created, model, choices: [{ index: 0, delta: { role: "assistant", content: "" }, finish_reason: null }] },
    { id, object: "chat.completion.chunk", created, model, choices: [{ index: 0, delta: { content }, finish_reason: null }] },
    { id, object: "chat.completion.chunk", created, model, choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
  ];
  const body = `${chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join("")}data: [DONE]\n\n`;
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}

function sseErrorResponse(status: number, message: string): Response {
  const body = `data: ${JSON.stringify(buildErrorBody(status, message))}\n\ndata: [DONE]\n\n`;
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}

export class ZcodeExecutor extends BaseExecutor {
  private readonly options: ZcodeExecutorOptions;

  constructor(options: ZcodeExecutorOptions = {}) {
    super("zcode", { id: "zcode", baseUrl: ZCODE_URL, format: "openai" });
    this.options = options;
  }

  buildUrl(): string {
    return ZCODE_URL;
  }

  transformRequest(): null {
    return null;
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const resolution = resolveZcodeModel(input.model);
    if (!resolution.ok) {
      const message = "error" in resolution ? resolution.error : "Invalid ZCode model";
      return input.stream ? sseErrorResponse(400, message) : errorResponse(400, message);
    }

    const body = asRecord(input.body);
    const messages = Array.isArray(body.messages) ? body.messages as OpenAIMsg[] : [];
    const prompt = buildZcodePrompt(messages);
    input.log?.info?.("ZCODE", `local app-server turn started model=${resolution.model}`);

    try {
      const content = await this.runTurn(resolution.model, prompt, input.signal, input.log);
      const response = input.stream
        ? sseResponse(resolution.model, content)
        : completionResponse(resolution.model, prompt, content);
      return {
        response,
        url: ZCODE_URL,
        headers: {},
        transformedBody: { model: resolution.model, promptLength: prompt.length, buffered: true },
        transport: "local-zcode-app-server",
      };
    } catch (error) {
      const message = sanitizeErrorMessage(error instanceof Error ? error.message : String(error));
      input.log?.warn?.("ZCODE", message);
      return input.stream ? sseErrorResponse(502, message) : errorResponse(502, message);
    }
  }

  private createClient(): ZcodeClientLike {
    if (this.options.clientFactory) return this.options.clientFactory();
    const command = this.options.command || process.env.ZCODE_SERVER_NODE || defaultCommand().command;
    const args = this.options.args || (process.env.ZCODE_SERVER_NODE
      ? [process.env.ZCODE_SERVER_ENTRY || join(process.env.ZCODE_SERVER_RUNTIME_ROOT || join(homedir(), ".zcode", "server"), "zcode-server.cjs")]
      : defaultCommand().args);
    return new ZcodeAppServerClient({
      command,
      args,
      cwd: this.options.cwd || process.env.ZCODE_CWD || process.cwd(),
      startupTimeoutMs: this.options.startupTimeoutMs ?? Number(process.env.ZCODE_STARTUP_TIMEOUT_MS || 10_000),
      requestTimeoutMs: this.options.requestTimeoutMs ?? Number(process.env.ZCODE_RPC_TIMEOUT_MS || 30_000),
    });
  }

  private async runTurn(
    model: string,
    prompt: string,
    signal: AbortSignal | null | undefined,
    log: ExecuteInput["log"]
  ): Promise<string> {
    const client = this.createClient();
    const cwd = resolve(this.options.cwd || process.env.ZCODE_CWD || process.cwd());
    const workspace = makeWorkspace(cwd);
    const providerId = this.options.providerId || process.env.ZCODE_PROVIDER_ID || DEFAULT_PROVIDER_ID;
    const turnTimeoutMs = this.options.turnTimeoutMs ?? Number(process.env.ZCODE_TURN_TIMEOUT_MS || DEFAULT_TURN_TIMEOUT_MS);
    const pollIntervalMs = this.options.pollIntervalMs ?? Number(process.env.ZCODE_POLL_INTERVAL_MS || DEFAULT_POLL_INTERVAL_MS);
    let sessionId: string | undefined;

    try {
      await raceAbort(client.start(), signal);
      const initialized = asRecord(await raceAbort(client.call("zcode-agent", "initialize", [workspace]), signal));
      if (initialized.available !== true) {
        throw new Error(extractErrorMessage(initialized));
      }

      const created = await raceAbort(client.call("zcode-agent", "createSession", [{
        ...workspace,
        sessionTraceId: randomUUID(),
        mode: "build",
        persistence: "persistent",
      }]), signal);
      sessionId = extractSessionId(created);
      if (!sessionId) throw new Error("ZCode createSession returned no sessionId");

      await raceAbort(client.call("zcode-agent", "setModel", [{
        ...workspace,
        sessionId,
        model: { providerId, modelId: model },
      }]), signal);

      let state: unknown = await raceAbort(client.call("zcode-agent", "sendPrompt", [{
        ...workspace,
        sessionId,
        inputId: randomUUID(),
        content: prompt,
      }]), signal);
      const deadline = Date.now() + Math.max(1, turnTimeoutMs);

      while (Date.now() <= deadline) {
        if (signal?.aborted) throw abortError();
        const text = extractAssistantText(state);
        const status = extractStatus(state);
        if (text && (status === undefined || TERMINAL_STATUSES.has(status))) return text;
        if (status === "error") throw new Error(extractErrorMessage(state));
        await delay(Math.max(0, pollIntervalMs), signal);
        state = await raceAbort(client.call("zcode-agent", "readSession", [{
          ...workspace,
          sessionId,
          messageLimit: 200,
        }]), signal);
      }
      const finalText = extractAssistantText(state);
      if (finalText) return finalText;
      throw new Error("ZCode turn timed out before an assistant response was available");
    } finally {
      if (sessionId && !signal?.aborted) {
        await client.call("zcode-agent", "closeSession", [{ ...workspace, sessionId }]).catch(() => undefined);
      }
      await client.close().catch((error) => log?.debug?.("ZCODE", `app-server close failed: ${sanitizeErrorMessage(error)}`));
    }
  }

  // Credentials are intentionally ignored: the local ZCode profile owns auth.
  override buildHeaders(_credentials: ProviderCredentials): Record<string, string> {
    return {};
  }
}
