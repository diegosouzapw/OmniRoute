import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { ZCODE_MODELS } from "../config/providers/registry/zcode/index.ts";
import {
  BaseExecutor,
  type ExecuteInput,
  type ExecutorExecuteResult,
  type ProviderCredentials,
} from "./base.ts";
import { ZcodeAppServerClient, type ZcodeClientLike } from "./zcodeProtocol.ts";
import { errorResponse, sanitizeErrorMessage } from "../utils/error.ts";
import { MAX_CURSOR_IMAGES, resolveCursorImages } from "../utils/cursorImages.ts";

const ZCODE_URL = "zcode://app-server/stdio";
const DEFAULT_PROVIDER_ID = "builtin:zai-coding-plan";
const ACCOUNT_PROVIDER_ID = "account:zai-individual-coding-plan";
const DEFAULT_TURN_TIMEOUT_MS = 600_000;
const ZCODE_MODEL_ALLOWLIST = new Set(ZCODE_MODELS.map((model) => model.id));
const DEFAULT_ZCODE_MODEL = ZCODE_MODELS[0]?.id || "glm-5.2";
type JsonRecord = Record<string, unknown>;
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
  clientFactory?: () => ZcodeClientLike;
}
function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}
/**
 * Native generateWorkspaceText selection payload. The native schema rejects
 * unknown keys anywhere inside `selection`, so no runtime option bound may be
 * shipped here — it is resolved separately.
 */
export interface ZcodeTurnSelection {
  providerId: string;
  modelId: string;
  options?: { reasoningLevel?: string };
}

type NativeModelEntry = { record: JsonRecord; providerId: string };

function findNativeModelEntry(
  view: unknown,
  model: string,
  providerId?: string
): NativeModelEntry | null {
  const providers = asRecord(view).providers;
  const allowed = providerId ? [providerId] : [ACCOUNT_PROVIDER_ID, DEFAULT_PROVIDER_ID];
  for (const id of allowed) {
    const provider = (Array.isArray(providers) ? providers : [])
      .map(asRecord)
      .find((entry) => entry.providerId === id);
    const models = provider?.models;
    const entry = (Array.isArray(models) ? models : [])
      .map(asRecord)
      .find(
        (candidate) =>
          typeof candidate.modelId === "string" &&
          candidate.modelId.toLowerCase() === model.toLowerCase() &&
          asRecord(candidate.config).enabled !== false
      );
    if (entry) return { record: entry, providerId: id };
  }
  return null;
}

/** Use the native registry's exact, case-sensitive IDs without changing providers. */
export function resolveZcodeSelection(
  view: unknown,
  model: string,
  providerId?: string
): ZcodeTurnSelection {
  const found = findNativeModelEntry(view, model, providerId);
  if (!found) {
    throw new Error(
      `ZCode Coding Plan model "${model}" is not enabled in the native provider registry.`
    );
  }
  const optionSpecs = asRecord(asRecord(found.record.config).optionSpecs);
  const spec = asRecord(optionSpecs.reasoningLevel);
  const levels = Array.isArray(spec.values)
    ? spec.values.filter((value): value is string => typeof value === "string")
    : [];
  const reasoningLevel = levels.includes("high") ? "high" : levels[0];
  return {
    providerId: found.providerId,
    modelId: found.record.modelId as string,
    ...(reasoningLevel ? { options: { reasoningLevel } } : {}),
  };
}

/**
 * Native maxOutputTokens bound from the model option spec, or undefined when
 * the registry does not publish one. The upstream runtime refuses turns whose
 * maxOutputTokens is missing or outside this bound.
 */
export function resolveZcodeMaxTokens(
  view: unknown,
  model: string,
  providerId?: string
): number | undefined {
  const found = findNativeModelEntry(view, model, providerId);
  if (!found) return undefined;
  const optionSpecs = asRecord(asRecord(found.record.config).optionSpecs);
  const tokensSpec = asRecord(optionSpecs.maxOutputTokens);
  return typeof tokensSpec.max === "number" && tokensSpec.max >= 1
    ? Math.floor(tokensSpec.max)
    : undefined;
}

function textContent(content: unknown): string {
  if (content == null) return "";
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) throw new Error("ZCode model messages require text content");
  return content
    .map((part) => {
      const item = asRecord(part);
      if (typeof part === "string") return part;
      if (
        ["text", "input_text", "output_text"].includes(String(item.type)) &&
        typeof item.text === "string"
      )
        return item.text;
      throw new Error("ZCode model transport currently supports text input only");
    })
    .join("");
}

function userContent(content: unknown): string | JsonRecord[] {
  if (!Array.isArray(content)) return textContent(content);
  const blocks = content.map((part) => {
    const item = asRecord(part);
    if (item.type === "image_url") {
      const url = asRecord(item.image_url).url;
      if (typeof url !== "string" || !url) throw new Error("ZCode image URL is missing");
      return {
        type: "image",
        dataUrl: url,
        mediaType: /^data:([^;,]+)/i.exec(url)?.[1]?.toLowerCase() || "image/unknown",
      };
    }
    return { type: "text", text: textContent([part]) };
  });
  return blocks.some((part) => part.type === "image")
    ? blocks
    : blocks.map((part) => part.text).join("");
}

/** Reuse bounded public-URL fetching; retain original image bytes without JPEG prep. */
async function resolveRequestImages(request: JsonRecord, signal?: AbortSignal | null) {
  const blocks = (request.messages as JsonRecord[])
    .flatMap((message) => (Array.isArray(message.content) ? message.content.map(asRecord) : []))
    .filter((block) => block.type === "image");
  if (blocks.length > MAX_CURSOR_IMAGES)
    throw new Error(`Too many ZCode images (max ${MAX_CURSOR_IMAGES})`);
  for (const block of blocks) {
    const [image] = await withAbort(
      resolveCursorImages([String(block.dataUrl)], { prepareForWire: false }),
      signal
    );
    if (
      !["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"].includes(image.mimeType)
    )
      throw new Error("Unsupported ZCode image media type");
    block.mediaType = image.mimeType === "image/jpg" ? "image/jpeg" : image.mimeType;
    block.dataUrl = `data:${block.mediaType};base64,${image.data.toString("base64")}`;
  }
}

/** Preserve caller tool calls/results; the native text API never runs a coding agent. */
export function buildZcodeModelRequest(body: JsonRecord): JsonRecord {
  const names = new Map<string, string>();
  const messages = (Array.isArray(body.messages) ? body.messages : []).map((value) => {
    const message = asRecord(value);
    const content =
      message.role === "user" ? userContent(message.content) : textContent(message.content);
    if (message.role === "assistant") {
      const toolCalls = (Array.isArray(message.tool_calls) ? message.tool_calls : []).map(
        (value) => {
          const call = asRecord(value),
            fn = asRecord(call.function);
          if (typeof call.id !== "string" || typeof fn.name !== "string")
            throw new Error("Invalid assistant tool call");
          names.set(call.id, fn.name);
          return {
            id: call.id,
            name: fn.name,
            input:
              typeof fn.arguments === "string" ? JSON.parse(fn.arguments) : (fn.arguments ?? {}),
          };
        }
      );
      return { role: "assistant", content, ...(toolCalls.length ? { toolCalls } : {}) };
    }
    if (message.role === "tool") {
      const toolCallId = message.tool_call_id;
      const toolName = message.name || names.get(String(toolCallId));
      if (typeof toolCallId !== "string" || typeof toolName !== "string")
        throw new Error("Tool result has no matching assistant call/name");
      return { role: "tool", content, toolCallId, toolName };
    }
    if (!["system", "developer", "user"].includes(String(message.role)))
      throw new Error("Unsupported ZCode message role");
    return { role: message.role === "developer" ? "system" : message.role, content };
  });
  if (!messages.length) throw new Error("ZCode model request requires messages");
  if (body.tool_choice != null && !["auto", "none"].includes(String(body.tool_choice))) {
    throw new Error("ZCode model transport supports automatic tool selection or tool_choice=none");
  }
  const tools =
    body.tool_choice === "none"
      ? []
      : (Array.isArray(body.tools) ? body.tools : []).map((value) => {
          const item = asRecord(value),
            fn = asRecord(item.function);
          if (item.type !== "function" || typeof fn.name !== "string")
            throw new Error("ZCode model transport requires function tools");
          return {
            name: fn.name,
            ...(typeof fn.description === "string" ? { description: fn.description } : {}),
            inputSchema: asRecord(fn.parameters),
          };
        });
  const maxTokens = body.max_completion_tokens ?? body.max_tokens;
  return {
    messages,
    tools,
    ...(typeof maxTokens === "number" && maxTokens > 0
      ? { maxOutputTokens: Math.floor(maxTokens) }
      : {}),
  };
}

export function resolveZcodeModel(model: unknown): ZcodeModelResolution {
  const requested = typeof model === "string" ? model.trim() : "";
  if (!requested) return { ok: true, model: DEFAULT_ZCODE_MODEL };
  if (requested.startsWith("-")) {
    return {
      ok: false,
      error: `Invalid ZCode model \"${requested}\": model must not start with \"-\".`,
    };
  }
  const normalized = requested.startsWith("zcode/") ? requested.slice("zcode/".length) : requested;
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
  if (
    !Array.isArray(parsed) ||
    parsed.length > 16 ||
    !parsed.every((arg) => typeof arg === "string" && arg.length <= 4096)
  ) {
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

function completion(model: string, result: JsonRecord): JsonRecord {
  const toolCalls = (Array.isArray(result.toolCalls) ? result.toolCalls : []).map((value) => {
    const call = asRecord(value);
    if (typeof call.id !== "string" || typeof call.name !== "string")
      throw new Error("ZCode returned an invalid tool call");
    return {
      id: call.id,
      type: "function",
      function: { name: call.name, arguments: JSON.stringify(call.input ?? {}) },
    };
  });
  const nativeUsage = asRecord(result.usage);
  const promptTokens = Number(nativeUsage.inputTokens || 0),
    completionTokens = Number(nativeUsage.outputTokens || 0);
  const finishReason = toolCalls.length
    ? "tool_calls"
    : ["length", "max-tokens"].includes(String(result.finishReason))
      ? "length"
      : "stop";
  return {
    id: `chatcmpl-zcode-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: typeof result.text === "string" ? result.text : "",
          ...(toolCalls.length ? { tool_calls: toolCalls } : {}),
        },
        finish_reason: finishReason,
      },
    ],
    usage: {
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: Number(nativeUsage.totalTokens ?? promptTokens + completionTokens),
      prompt_tokens_details: { cached_tokens: Number(nativeUsage.cacheReadTokens || 0) },
      completion_tokens_details: { reasoning_tokens: Number(nativeUsage.reasoningTokens || 0) },
    },
  };
}

function modelResponse(model: string, result: JsonRecord, stream: boolean): Response {
  const body = completion(model, result);
  if (!stream) return Response.json(body);
  const choice = (body.choices as JsonRecord[])[0],
    message = asRecord(choice.message);
  const base = { id: body.id, object: "chat.completion.chunk", created: body.created, model };
  const toolCalls = Array.isArray(message.tool_calls)
    ? message.tool_calls.map((value, index) => ({ ...asRecord(value), index }))
    : undefined;
  const chunks = [
    {
      ...base,
      choices: [
        {
          index: 0,
          delta: {
            role: "assistant",
            content: message.content,
            ...(toolCalls ? { tool_calls: toolCalls } : {}),
          },
          finish_reason: null,
        },
      ],
    },
    {
      ...base,
      choices: [{ index: 0, delta: {}, finish_reason: choice.finish_reason }],
      usage: body.usage,
    },
  ];
  return new Response(
    chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join("") + "data: [DONE]\n\n",
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );
}

async function withAbort<T>(promise: Promise<T>, signal?: AbortSignal | null): Promise<T> {
  if (!signal) return promise;
  let listener: () => void;
  const aborted = new Promise<never>((_, reject) => {
    listener = () => reject(new Error("ZCode model request aborted"));
    if (signal.aborted) listener();
    else signal.addEventListener("abort", listener, { once: true });
  });
  try {
    return await Promise.race([promise, aborted]);
  } finally {
    signal.removeEventListener("abort", listener!);
  }
}

export class ZcodeExecutor extends BaseExecutor {
  constructor(private readonly options: ZcodeExecutorOptions = {}) {
    super("zcode", { id: "zcode", baseUrl: ZCODE_URL, format: "openai" });
  }
  buildUrl(): string {
    return ZCODE_URL;
  }
  transformRequest(): null {
    return null;
  }
  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const resolution = resolveZcodeModel(input.model);
    if (!resolution.ok)
      return errorResponse(400, "error" in resolution ? resolution.error : "Invalid ZCode model");
    let request: JsonRecord;
    try {
      request = buildZcodeModelRequest(asRecord(input.body));
      const hasImages = (request.messages as JsonRecord[]).some(
        (message) =>
          Array.isArray(message.content) &&
          message.content.some((block) => asRecord(block).type === "image")
      );
      if (hasImages && !ZCODE_MODELS.find((model) => model.id === resolution.model)?.supportsVision)
        throw new Error(`ZCode model "${resolution.model}" does not support image input`);
      await resolveRequestImages(request, input.signal);
    } catch (error) {
      return errorResponse(
        400,
        sanitizeErrorMessage(error instanceof Error ? error.message : String(error))
      );
    }
    const client = this.createClient();
    try {
      const workspace = {
        workspacePath: resolve(this.options.cwd || process.env.ZCODE_CWD || process.cwd()),
        workspaceIdentity: resolve(this.options.cwd || process.env.ZCODE_CWD || process.cwd()),
      };
      await withAbort(client.start(), input.signal);
      const initialized = asRecord(
        await withAbort(client.call("zcode-agent", "initialize", [workspace]), input.signal)
      );
      if (initialized.available !== true) throw new Error("ZCode model runtime is unavailable");
      // The signed-in account can hydrate after initialize while custom providers
      // are already ready. Wait for the exact model; never substitute a provider.
      const readyDeadline = Date.now() + (this.options.startupTimeoutMs ?? 10_000);
      let selection: ZcodeTurnSelection;
      let nativeMaxTokens: number | undefined;
      for (;;) {
        const registry = await withAbort(
          client.call("model-selection", "getView", []),
          input.signal
        );
        try {
          selection = resolveZcodeSelection(
            registry,
            resolution.model,
            this.options.providerId || process.env.ZCODE_PROVIDER_ID
          );
          nativeMaxTokens = resolveZcodeMaxTokens(
            registry,
            resolution.model,
            this.options.providerId || process.env.ZCODE_PROVIDER_ID
          );
          break;
        } catch (error) {
          if (Date.now() >= readyDeadline) throw error;
          await withAbort(
            new Promise((resolve) =>
              setTimeout(resolve, Math.min(250, readyDeadline - Date.now()))
            ),
            input.signal
          );
        }
      }
      input.log?.info?.("ZCODE", `native model request model=${resolution.model}`);
      // The native runtime validates that maxOutputTokens is a positive integer
      // inside the model's option range on every turn, while the RPC selection
      // payload must stay schema-clean. Bound a caller-provided limit into the
      // registry range; otherwise use the bound.
      if (typeof nativeMaxTokens === "number") {
        const callerMax =
          typeof request.maxOutputTokens === "number" && request.maxOutputTokens >= 1
            ? Math.floor(request.maxOutputTokens)
            : undefined;
        request.maxOutputTokens = Math.min(callerMax ?? nativeMaxTokens, nativeMaxTokens);
      }
      const result = asRecord(
        await withAbort(
          client.call("zcode-agent", "generateWorkspaceText", [
            {
              ...workspace,
              selection,
              ...request,
              querySource: "omniroute",
              requestTimeoutMs: this.turnTimeoutMs(),
            },
          ]),
          input.signal
        )
      );
      return {
        response: modelResponse(resolution.model, result, Boolean(input.stream)),
        url: ZCODE_URL,
        headers: {},
        transformedBody: {
          model: resolution.model,
          buffered: true,
          tools: (request.tools as unknown[]).length,
        },
        transport: "local-zcode-model",
      };
    } catch (error) {
      const message = sanitizeErrorMessage(error instanceof Error ? error.message : String(error));
      input.log?.warn?.("ZCODE", message);
      // No stream has started: retain a real HTTP error, not a 200 error-only SSE
      // that the readiness guard rewrites into STREAM_EARLY_EOF.
      return errorResponse(input.signal?.aborted ? 499 : 502, message);
    } finally {
      await client.close().catch(() => undefined);
    }
  }
  private turnTimeoutMs(): number {
    return (
      this.options.turnTimeoutMs ??
      Number(process.env.ZCODE_TURN_TIMEOUT_MS || DEFAULT_TURN_TIMEOUT_MS)
    );
  }
  private createClient(): ZcodeClientLike {
    if (this.options.clientFactory) return this.options.clientFactory();
    const selected = defaultCommand();
    return new ZcodeAppServerClient({
      command: this.options.command || selected.command,
      args: this.options.args || selected.args,
      cwd: this.options.cwd || process.env.ZCODE_CWD || process.cwd(),
      startupTimeoutMs:
        this.options.startupTimeoutMs ?? Number(process.env.ZCODE_STARTUP_TIMEOUT_MS || 10_000),
      requestTimeoutMs: this.options.requestTimeoutMs ?? this.turnTimeoutMs() + 10_000,
    });
  }
  override buildHeaders(_credentials: ProviderCredentials): Record<string, string> {
    return {};
  }
}
