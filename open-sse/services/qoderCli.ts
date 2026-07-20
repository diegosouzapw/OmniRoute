import { spawn } from "child_process";
import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import { getLookupEnv } from "@/shared/services/cliRuntime";
import { qoderProvider } from "../config/providers/registry/qoder/index.ts";
import { buildQoderCliNotFoundHint, resolveQoderCliInvocation } from "./qoderCliResolve";
export { getQoderCliCommand } from "./qoderCliResolve"; // #6263 public entry point

const DEFAULT_TIMEOUT_MS = 45_000;
const DEFAULT_MODELS_TIMEOUT_MS = 20_000;
const QODER_DEFAULT_MODEL = "qwen3.8-max-preview";
const QODER_MODEL_LEVELS = {
  "qwen3.8-max-preview": "qmodel_preview",
  "qwen3.7-max": "qmodel_latest",
  "qwen3.7-plus": "qmodel",
  "kimi-k3": "kmodel_latest",
  "kimi-k2.7-code": "kmodel",
  "glm-5.2": "gm51model",
  "deepseek-v4-pro": "dmodel",
  "deepseek-v4-flash": "dfmodel",
  "minimax-m3": "mmodel",
} as const;

export const QODER_STATIC_MODELS = qoderProvider.models.map(({ id, name }) => ({ id, name }));

type JsonRecord = Record<string, unknown>;

type QoderCliRunOptions = {
  token: string;
  prompt: string;
  stream: boolean;
  model?: string | null;
  workspace?: string | null;
  command?: string | null;
  signal?: AbortSignal | null;
  timeoutMs?: number;
};

type QoderCliRunResult = {
  ok: boolean;
  code: number | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
  error: string | null;
};

type QoderCliFailure = {
  status: number;
  message: string;
  code: string;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function getString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function getQoderCliWorkspace(): string {
  const explicit = String(
    process.env.QODER_CLI_WORKSPACE || process.env.OMNIROUTE_QODER_WORKSPACE || ""
  ).trim();
  if (explicit) return explicit;
  const home = String(process.env.HOME || "").trim();
  return home || process.cwd();
}

/**
 * Isolated `--config-dir` for OmniRoute-driven qodercli runs. Keeping it separate
 * from the operator's own `~/.qoder` avoids polluting an interactive qodercli
 * session and lets each PAT authenticate via `QODER_PERSONAL_ACCESS_TOKEN`
 * without clobbering a browser login. Override with `QODER_CLI_CONFIG_DIR`.
 */
export function getQoderCliConfigDir(): string {
  const explicit = String(process.env.QODER_CLI_CONFIG_DIR || "").trim();
  if (explicit) return explicit;
  const dataDir = String(process.env.DATA_DIR || "").trim();
  const base = dataDir || path.join(os.homedir() || os.tmpdir(), ".omniroute");
  return path.join(base, "qoder-cli");
}

// Memoized per resolved path so we don't hit synchronous disk I/O
// (fs.mkdirSync blocks the event loop) on every chat/quota request.
const ensuredQoderCliConfigDirs = new Set<string>();

/** Ensure the qodercli config dir exists so it is a valid spawn cwd + cache root. */
function ensureQoderCliConfigDir(): string {
  const dir = getQoderCliConfigDir();
  if (ensuredQoderCliConfigDirs.has(dir)) return dir;
  try {
    fs.mkdirSync(dir, { recursive: true });
    ensuredQoderCliConfigDirs.add(dir);
  } catch {
    /* best-effort — spawn will surface a real failure */
  }
  return dir;
}

type SpawnQoderCliOptions = {
  args: string[];
  token?: string | null;
  stdin?: string | null;
  signal?: AbortSignal | null;
  timeoutMs?: number;
  command?: string | null;
  cwd?: string | null;
};

/**
 * Low-level qodercli spawn. The PAT (if any) is passed via the
 * `QODER_PERSONAL_ACCESS_TOKEN` env var — the only env var the official CLI
 * honors for headless PAT auth — and the prompt is piped through stdin so no
 * untrusted value is ever interpolated into a shell command (Hard Rule #13).
 */
async function spawnQoderCli(options: SpawnQoderCliOptions): Promise<QoderCliRunResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  // #6263: resolve the real qodercli command (absolute .cmd/.exe on Windows) and
  // whether it needs a shell, then spawn with the cliRuntime-enriched env (PATH +
  // PATHEXT + APPDATA) so the npm `.cmd` wrapper under %APPDATA%\npm is found.
  const { command, useShell } = await resolveQoderCliInvocation(options.command);
  const env: NodeJS.ProcessEnv = { ...getLookupEnv() };
  const token = String(options.token || "").trim();
  if (token) env.QODER_PERSONAL_ACCESS_TOKEN = token;

  return new Promise<QoderCliRunResult>((resolve) => {
    let stdout = "";
    let stderr = "";
    let settled = false;
    let timedOut = false;

    let child: ReturnType<typeof spawn>;
    try {
      child = spawn(command, options.args, {
        env,
        cwd: options.cwd || undefined,
        stdio: ["pipe", "pipe", "pipe"],
        ...(useShell ? { shell: true } : {}),
      });
    } catch (err) {
      resolve({
        ok: false,
        code: null,
        stdout: "",
        stderr: "",
        timedOut: false,
        error: (err as Error).message,
      });
      return;
    }

    const timer = setTimeout(() => {
      timedOut = true;
      try {
        child.kill("SIGKILL");
      } catch {
        /* already gone */
      }
    }, timeoutMs);
    timer.unref?.();

    const onAbort = () => {
      try {
        child.kill("SIGKILL");
      } catch {
        /* already gone */
      }
    };
    if (options.signal) {
      if (options.signal.aborted) onAbort();
      else options.signal.addEventListener("abort", onAbort, { once: true });
    }

    const finish = (result: QoderCliRunResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      options.signal?.removeEventListener?.("abort", onAbort);
      resolve(result);
    };

    child.on("error", (err: Error) => {
      finish({ ok: false, code: null, stdout, stderr, timedOut, error: err.message });
    });
    // If qodercli exits or closes stdin before we finish writing the prompt, the
    // write/end below can emit an ASYNC EPIPE/EINVAL on the stream (not caught by
    // the surrounding try/catch). Without a listener that becomes an unhandled
    // 'error' event that crashes the whole process — attach no-op handlers.
    child.stdin?.on("error", () => {});
    child.stdout?.on("error", () => {});
    child.stderr?.on("error", () => {});
    // Decode with a stateful UTF-8 reader so a multi-byte character (e.g. Chinese,
    // common in Qoder output) split across two chunks is not corrupted — Buffer
    // per-chunk toString() would mangle the boundary bytes.
    child.stdout?.setEncoding("utf8");
    child.stderr?.setEncoding("utf8");
    child.stdout?.on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr?.on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.on("close", (code: number | null) => {
      finish({
        ok: code === 0 && !timedOut,
        code,
        stdout,
        stderr,
        timedOut,
        error: timedOut ? "qodercli timed out" : null,
      });
    });

    try {
      if (options.stdin != null) child.stdin?.write(options.stdin);
      child.stdin?.end();
    } catch {
      /* stdin closed early — the child will surface its own error */
    }
  });
}

/**
 * Run a single non-interactive chat turn through qodercli. Returns the raw
 * process result; use {@link parseQoderCliResult} to extract the reply text.
 */
export async function runQoderCli(options: QoderCliRunOptions): Promise<QoderCliRunResult> {
  const level = await resolveQoderCliModel(options.model, options.token, {
    command: options.command,
    signal: options.signal,
  });
  const configDir = ensureQoderCliConfigDir();
  const cwd = String(options.workspace || "").trim() || configDir;
  const args = [
    "--print",
    "--output-format",
    "json",
    "--model",
    level,
    // Disable all built-in tools — OmniRoute only wants a plain LM reply, never
    // file-system access or command execution from the proxied CLI.
    "--tools",
    "",
    "--config-dir",
    configDir,
  ];
  return spawnQoderCli({
    args,
    token: options.token,
    stdin: options.prompt,
    signal: options.signal,
    timeoutMs: options.timeoutMs,
    command: options.command,
    cwd,
  });
}

/**
 * List the models qodercli can reach for the given PAT. Used as a cheap
 * connection/credential check (no chat tokens are consumed).
 */
export async function listQoderCliModels(
  options: {
    token?: string | null;
    signal?: AbortSignal | null;
    timeoutMs?: number;
    command?: string | null;
  } = {}
): Promise<QoderCliRunResult> {
  const configDir = ensureQoderCliConfigDir();
  return spawnQoderCli({
    args: ["--list-models", "--config-dir", configDir],
    token: options.token,
    signal: options.signal,
    timeoutMs: options.timeoutMs ?? DEFAULT_MODELS_TIMEOUT_MS,
    command: options.command,
    cwd: configDir,
  });
}

/** Normalize a model id / display name so "glm-5.2" and "GLM-5.2" compare equal. */
export function normalizeQoderModelKey(value: unknown): string {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/** Extract the display names from a `qodercli --list-models` table. */
export function parseQoderCliModelNames(stdout: string): string[] {
  return String(stdout || "")
    .split("\n")
    .map((line) => line.replace(/\[[0-9;]*m/g, "").trim()) // strip ANSI colors
    .filter(
      (line) =>
        line.length > 0 &&
        line.toLowerCase() !== "model" && // header row
        !/invalid model|not logged in|please run|available model keys/i.test(line)
    );
}

/**
 * Resolve an OmniRoute model id to the exact value to pass to `qodercli -m`.
 * Pure (no I/O) so it can be unit-tested against a captured model list.
 *
 * Preference order:
 *  1. A live `--list-models` display name (case-insensitive, punctuation-insensitive)
 *     — qodercli accepts these directly and they track upstream renames of the
 *     opaque internal level keys.
 *  2. The static family map (level keys) — used when the live list is unavailable
 *     or has no match.
 *  3. "Auto".
 */
export function resolveQoderModelName(
  requested: string | null | undefined,
  availableNames: string[]
): string {
  const normalized = normalizeQoderModelKey(requested);
  if (!normalized) return "auto";
  const match = (availableNames || []).find((name) => normalizeQoderModelKey(name) === normalized);
  if (match) return match;
  return mapQoderModelToLevel(requested) || "auto";
}

// Per-token cache of the `--list-models` display names (the catalog is stable and
// per-account); TTL keeps it fresh without a CLI spawn on every request.
const QODER_MODEL_LIST_TTL_MS = 10 * 60 * 1000;
type QoderModelNamesCacheEntry = { names: string[]; expiresAt: number };
const qoderModelNamesCache = new Map<string, QoderModelNamesCacheEntry>();
const qoderModelNamesPending = new Map<string, Promise<string[]>>();

async function getCachedQoderCliModelNames(
  token?: string | null,
  options: { command?: string | null; signal?: AbortSignal | null; now?: number } = {}
): Promise<string[]> {
  const key = String(token || "").trim() || "default";
  const now = options.now ?? Date.now();
  const cached = qoderModelNamesCache.get(key);
  if (cached && cached.expiresAt > now) return cached.names;

  let pending = qoderModelNamesPending.get(key);
  if (!pending) {
    pending = listQoderCliModels({ token, command: options.command, signal: options.signal })
      .then((run) => {
        const names = run.ok ? parseQoderCliModelNames(run.stdout) : [];
        // Only cache a non-empty success; a failed/empty list should retry next time.
        if (names.length > 0) {
          qoderModelNamesCache.set(key, { names, expiresAt: now + QODER_MODEL_LIST_TTL_MS });
        }
        return names;
      })
      .catch(() => [] as string[])
      .finally(() => qoderModelNamesPending.delete(key));
    qoderModelNamesPending.set(key, pending);
  }
  return pending;
}

/** Async resolver: matches the request against the live (cached) `--list-models`. */
export async function resolveQoderCliModel(
  requested: string | null | undefined,
  token?: string | null,
  options: { command?: string | null; signal?: AbortSignal | null } = {}
): Promise<string> {
  let names: string[] = [];
  try {
    names = await getCachedQoderCliModelNames(token, options);
  } catch {
    names = [];
  }
  return resolveQoderModelName(requested, names);
}

/** Test-only: drop the cached `--list-models` names so unit tests don't leak state. */
export function __clearQoderModelNamesCache(): void {
  qoderModelNamesCache.clear();
  qoderModelNamesPending.clear();
}

/**
 * Parse the `--output-format json` envelope qodercli prints in print mode. The
 * CLI may emit banner/log lines before the JSON, so we fall back to scanning for
 * the last JSON object line. Returns the assistant text plus an error flag.
 */
export function parseQoderCliResult(stdout: string): {
  text: string;
  isError: boolean;
  errorMessage: string;
} {
  const trimmed = String(stdout || "").trim();
  if (!trimmed) {
    return { text: "", isError: true, errorMessage: "qodercli produced no output" };
  }

  let parsed: JsonRecord | null = null;
  try {
    const whole = JSON.parse(trimmed);
    if (whole && typeof whole === "object") parsed = whole as JsonRecord;
  } catch {
    for (const line of trimmed.split("\n").reverse()) {
      const candidate = line.trim();
      if (!candidate.startsWith("{")) continue;
      try {
        const obj = JSON.parse(candidate);
        if (obj && typeof obj === "object") {
          parsed = obj as JsonRecord;
          break;
        }
      } catch {
        /* keep scanning earlier lines */
      }
    }
  }

  if (!parsed) {
    return { text: "", isError: true, errorMessage: trimmed.slice(0, 300) };
  }

  const result = getString(parsed.result);
  const isError =
    parsed.is_error === true || getString(parsed.subtype).trim().toLowerCase() === "error";
  return {
    text: result,
    isError,
    errorMessage: isError ? result || "qodercli returned an error" : "",
  };
}

export function normalizeQoderPatProviderData(providerSpecificData: JsonRecord = {}): JsonRecord {
  return {
    ...providerSpecificData,
    authMode: "pat",
    transport: "qodercli",
  };
}

export function isQoderCliTransport(providerSpecificData: unknown = {}): boolean {
  const data = asRecord(providerSpecificData);
  const transport = getString(data.transport).trim().toLowerCase();
  const authMode = getString(data.authMode).trim().toLowerCase();
  if (transport === "http-legacy") return false;
  return transport === "qodercli" || authMode === "pat";
}

export function getStaticQoderModels() {
  return QODER_STATIC_MODELS.map((model) => ({ ...model }));
}

/** qodercli's `-m` accepts these level keys (see `qodercli --list-models`). */
const QODER_LEVEL_KEYS = new Set(["auto", ...Object.values(QODER_MODEL_LEVELS)]);

function resolveQoderModelLevel(value: string): string | null {
  const modelId = value.includes("/") ? value.slice(value.lastIndexOf("/") + 1) : value;
  return QODER_MODEL_LEVELS[modelId as keyof typeof QODER_MODEL_LEVELS] ?? null;
}

export function mapQoderModelToLevel(model: string | null | undefined): string | null {
  const normalized = String(model || "")
    .trim()
    .toLowerCase();
  if (!normalized) return null;
  // Keep Qoder's retired pre-3.8 level as an alias for the current preview.
  if (normalized === "q35model_preview") return "qmodel_preview";
  // A caller may pass a qodercli level key directly (e.g. "gm51model") — honor it.
  if (QODER_LEVEL_KEYS.has(normalized)) return normalized;
  const currentLevel = resolveQoderModelLevel(normalized);
  if (currentLevel) return currentLevel;
  // Legacy public ids stay accepted without keeping the retired abstract tiers.
  if (normalized.includes("deepseek-r1")) return "dmodel";
  if (normalized.includes("glm")) return "gm51model"; // GLM-5.2 (`qoder/glm-5.2`)
  if (normalized.includes("minimax")) return "mmodel";
  if (normalized.includes("qwen3-max-preview")) return "qmodel_preview";
  if (normalized.includes("qwen3-max")) return "qmodel_latest";
  if (normalized.includes("kimi-k2")) return "kmodel";
  if (normalized.includes("qwen3-coder")) return "qmodel";
  if (normalized.includes("qoder-rome")) return "qmodel";
  return "auto";
}

function flattenMessageContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((item) => {
      if (typeof item === "string") return item;
      if (!item || typeof item !== "object") return "";

      const record = item as JsonRecord;
      const itemType = getString(record.type);
      if (itemType === "text" || itemType === "input_text") {
        return getString(record.text);
      }
      if (itemType === "image_url" || itemType === "input_image") {
        return "[Image omitted]";
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

function formatMessage(message: unknown): string {
  if (!message || typeof message !== "object") return "";
  const record = message as JsonRecord;
  const role = getString(record.role).trim().toUpperCase() || "UNKNOWN";
  const base = flattenMessageContent(record.content);

  if (role === "TOOL") {
    const toolName = getString(record.name).trim();
    return `TOOL${toolName ? ` (${toolName})` : ""}:\n${base}`.trim();
  }

  const toolCalls = Array.isArray(record.tool_calls) ? record.tool_calls : [];
  if (toolCalls.length > 0) {
    const toolLines = toolCalls
      .map((toolCall) => {
        const toolRecord = asRecord(toolCall);
        const functionRecord = asRecord(toolRecord.function);
        const toolName =
          getString(functionRecord.name).trim() || getString(toolRecord.name).trim() || "tool";
        const toolArgs =
          getString(functionRecord.arguments).trim() || getString(toolRecord.arguments).trim();
        return `TOOL_CALL ${toolName}: ${toolArgs}`.trim();
      })
      .filter(Boolean)
      .join("\n");

    return `${role}:\n${base}\n${toolLines}`.trim();
  }

  return `${role}:\n${base}`.trim();
}

export function buildQoderPrompt(body: unknown): string {
  const requestBody = asRecord(body);
  const lines = [
    "You are answering an OmniRoute OpenAI-compatible request through the Qoder CLI transport.",
    "Respond as a plain language model only.",
    "Do not use your own tools, do not inspect files, and do not run commands.",
    "Do not mention the adapter unless the user explicitly asks.",
  ];

  const tools = Array.isArray(requestBody.tools) ? requestBody.tools : [];
  if (tools.length > 0) {
    const toolNames = tools
      .map((tool) => {
        const toolRecord = asRecord(tool);
        const functionRecord =
          toolRecord.type === "function" ? asRecord(toolRecord.function) : toolRecord;
        return getString(functionRecord.name).trim();
      })
      .filter(Boolean)
      .join(", ");

    if (toolNames) {
      lines.push(`Caller-side tools are available externally: ${toolNames}.`);
      lines.push("Do not call those tools yourself. Answer in assistant text only.");
    }
  }

  const responseFormat = asRecord(requestBody.response_format);
  if (responseFormat.type === "json_object") {
    lines.push("Return only valid JSON.");
  } else if (
    responseFormat.type === "json_schema" &&
    responseFormat.json_schema &&
    typeof responseFormat.json_schema === "object"
  ) {
    const jsonSchema = asRecord(responseFormat.json_schema);
    if (jsonSchema.schema && typeof jsonSchema.schema === "object") {
      lines.push(
        `Return only valid JSON matching this schema:\n${JSON.stringify(jsonSchema.schema, null, 2)}`
      );
    }
  }

  const messages = Array.isArray(requestBody.messages)
    ? requestBody.messages
    : Array.isArray(requestBody.input)
      ? requestBody.input
      : [];

  if (messages.length > 0) {
    lines.push("Conversation transcript:");
    for (const message of messages) {
      const formatted = formatMessage(message);
      if (formatted) lines.push(formatted);
    }
  }

  lines.push("Reply now with the assistant response only.");
  return lines.filter(Boolean).join("\n\n");
}

export function extractTextFromQoderEnvelope(parsed: unknown): string {
  const record = asRecord(parsed);
  const messageRecord = asRecord(record.message);
  const content = messageRecord.content ?? record.content ?? record.delta ?? record.text ?? null;

  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((item) => {
      const itemRecord = asRecord(item);
      const itemType = getString(itemRecord.type).trim();
      if (itemType === "text" || !itemType) {
        return getString(itemRecord.text);
      }
      return "";
    })
    .filter(Boolean)
    .join("");
}

export function buildQoderCompletionPayload({
  model,
  text,
}: {
  model?: string | null;
  text: string;
}) {
  const created = Math.floor(Date.now() / 1000);
  return {
    id: `chatcmpl-${crypto.randomUUID()}`,
    object: "chat.completion",
    created,
    model: model || QODER_DEFAULT_MODEL,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: text,
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    },
  };
}

export function buildQoderChunk({
  id,
  model,
  created,
  delta,
  finishReason = null,
}: {
  id: string;
  model: string;
  created: number;
  delta: Record<string, unknown>;
  finishReason?: string | null;
}) {
  return {
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [
      {
        index: 0,
        delta,
        finish_reason: finishReason,
      },
    ],
  };
}

export function parseQoderCliFailure(stderrText: string, stdoutText = ""): QoderCliFailure {
  const stderr = String(stderrText || "").trim();
  const stdout = String(stdoutText || "").trim();
  const combined = `${stderr}\n${stdout}`.trim() || "Qoder API request failed";
  const normalized = combined.toLowerCase();

  if (
    normalized.includes("invalid api key") ||
    normalized.includes("invalid token") ||
    normalized.includes("invalid personal token") ||
    normalized.includes("personal access token") ||
    normalized.includes("personal token format") ||
    normalized.includes("exchangejobtoken failed") ||
    normalized.includes("not logged in") ||
    normalized.includes("please run /login") ||
    normalized.includes("login required") ||
    (normalized.includes("unauthorized") && normalized.includes("qoder"))
  ) {
    return { status: 401, message: combined, code: "upstream_auth_error" };
  }

  if (normalized.includes("timed out") || normalized.includes("timeout")) {
    return { status: 504, message: combined, code: "timeout" };
  }

  return { status: 502, message: combined, code: "upstream_error" };
}

export function createQoderErrorResponse(failure: QoderCliFailure): Response {
  return new Response(
    JSON.stringify({
      error: {
        message: failure.message,
        type: failure.status === 401 ? "authentication_error" : "provider_error",
        code: failure.code,
      },
    }),
    {
      status: failure.status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDA8iMH5c02LilrsERw9t6Pv5Nc
4k6Pz1EaDicBMpdpxKduSZu5OANqUq8er4GM95omAGIOPOh+Nx0spthYA2BqGz+l
6HRkPJ7S236FZz73In/KVuLnwI8JJ2CbuJap8kvheCCZpmAWpb/cPx/3Vr/J6I17
XcW+ML9FoCI6AOvOzwIDAQAB
-----END PUBLIC KEY-----`;

export function buildCosyHeadersForValidation(bodyStr: string, token: string) {
  const aesKeyBytes = crypto.randomBytes(16);
  const aesKeyStr = aesKeyBytes.toString("hex").slice(0, 16);
  const aesKeyBuf = Buffer.from(aesKeyStr, "utf8");

  const uid = "omniroute.user@qoder.sh";
  const userInfo = {
    uid: uid,
    security_oauth_token: token,
    name: "omniroute",
    aid: "",
    email: uid,
  };

  const cipher = crypto.createCipheriv("aes-128-cbc", aesKeyBuf, aesKeyBuf);
  let ciphertext = cipher.update(JSON.stringify(userInfo), "utf8", "base64");
  ciphertext += cipher.final("base64");

  const encryptedKeyBuf = crypto.publicEncrypt(
    { key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_PADDING },
    aesKeyBuf
  );
  const cosyKeyB64 = encryptedKeyBuf.toString("base64");
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const payloadStr = JSON.stringify({
    version: "v1",
    requestId: crypto.randomUUID(),
    info: ciphertext,
    cosyVersion: "0.12.3",
    ideVersion: "",
  });
  const payloadB64 = Buffer.from(payloadStr).toString("base64");
  const sigPath = "/api/v2/service/pro/sse/agent_chat_generation";
  const sigInput = `${payloadB64}\n${cosyKeyB64}\n${timestamp}\n${bodyStr}\n${sigPath}`;
  const sig = crypto.createHash("md5").update(sigInput).digest("hex");

  return {
    Authorization: `Bearer COSY.${payloadB64}.${sig}`,
    "Cosy-Key": cosyKeyB64,
    "Cosy-User": uid,
    "Cosy-Date": timestamp,
    "Content-Type": "application/json",
  };
}

// #4683: Qoder PATs (`pt-*`) cannot be used directly as the Cosy
// `security_oauth_token`. The official qodercli performs a two-step flow: it first
// exchanges the PAT for a short-lived job token (`jt-*`) at
// `openapi.qoder.sh/api/v1/jobToken/exchange`, then carries that `jt-*` in the Cosy
// envelope for chat. Passing the raw `pt-*` makes Cosy return a generic 500, which
// OmniRoute mis-surfaced as "PAT may not be valid for the chat API". We mirror the
// exchange here and cache the `jt-*` for its lifetime.
const QODER_JOB_TOKEN_EXCHANGE_URL = "https://openapi.qoder.sh/api/v1/jobToken/exchange";
// Refresh a little before the ~24h expiry to avoid using a just-expired token.
const QODER_JOB_TOKEN_DEFAULT_TTL_MS = 23 * 60 * 60 * 1000;
const QODER_JOB_TOKEN_MIN_TTL_MS = 60 * 1000;

type QoderJobTokenCacheEntry = { jobToken: string; expiresAt: number };
const qoderJobTokenCache = new Map<string, QoderJobTokenCacheEntry>();
const qoderJobTokenPending = new Map<
  string,
  Promise<{ jobToken: string; expiresInMs: number } | null>
>();

type FetchLike = (input: string, init?: Record<string, unknown>) => Promise<Response>;

/** A Qoder Personal Access Token is the only credential that needs the exchange. */
export function isQoderPatToken(token: string): boolean {
  return typeof token === "string" && token.trim().startsWith("pt-");
}

/** Pull a `jt-*` job token out of the (loosely-specified) exchange response. */
export function parseQoderJobTokenResponse(json: unknown): {
  jobToken: string;
  expiresInMs: number;
} | null {
  const root = asRecord(json);
  const data = asRecord(root.data);
  const candidates = [
    root.job_token,
    root.jobToken,
    root.jt,
    root.token,
    data.job_token,
    data.jobToken,
    data.jt,
    data.token,
  ];
  const jobToken = candidates.map(getString).find((v) => v.trim().startsWith("jt-")) || "";
  if (!jobToken) return null;

  const expiresRaw = [root.expires_in, root.expiresIn, data.expires_in, data.expiresIn].find(
    (v) => typeof v === "number" && Number.isFinite(v) && (v as number) > 0
  ) as number | undefined;
  // Qoder reports expiry in seconds; fall back to the default ~24h window.
  const expiresInMs = expiresRaw ? expiresRaw * 1000 : QODER_JOB_TOKEN_DEFAULT_TTL_MS;
  return { jobToken, expiresInMs: Math.max(expiresInMs, QODER_JOB_TOKEN_MIN_TTL_MS) };
}

/** Exchange a `pt-*` PAT for a short-lived `jt-*` job token (no caching). */
export async function exchangeQoderJobToken(
  pat: string,
  options: { fetchImpl?: FetchLike; signal?: AbortSignal | null } = {}
): Promise<{ jobToken: string; expiresInMs: number } | null> {
  const fetchImpl = options.fetchImpl || (fetch as unknown as FetchLike);
  const res = await fetchImpl(QODER_JOB_TOKEN_EXCHANGE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ personal_token: pat }),
    signal: options.signal || AbortSignal.timeout(15000),
  });
  if (!res || !res.ok) return null;
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    return null;
  }
  return parseQoderJobTokenResponse(json);
}

/**
 * Resolve the token to carry in the Cosy envelope. For a `pt-*` PAT this returns a
 * cached/freshly-exchanged `jt-*` job token; any other token (already a `jt-*`, or a
 * non-PAT credential) is returned unchanged. Exchange failures fall back to the
 * original token so behavior is no worse than before the fix.
 */
export async function resolveQoderJobToken(
  token: string,
  options: { fetchImpl?: FetchLike; signal?: AbortSignal | null; now?: number } = {}
): Promise<string> {
  const trimmed = (token || "").trim();
  if (!isQoderPatToken(trimmed)) return trimmed;

  const now = options.now ?? Date.now();
  const cached = qoderJobTokenCache.get(trimmed);
  if (cached && cached.expiresAt > now) return cached.jobToken;

  let pending = qoderJobTokenPending.get(trimmed);
  if (!pending) {
    pending = exchangeQoderJobToken(trimmed, { fetchImpl: options.fetchImpl }).finally(() => {
      qoderJobTokenPending.delete(trimmed);
    });
    qoderJobTokenPending.set(trimmed, pending);
  }
  const exchanged = await pending;
  if (!exchanged) return trimmed; // graceful fallback — keep prior behavior
  qoderJobTokenCache.set(trimmed, {
    jobToken: exchanged.jobToken,
    expiresAt: now + exchanged.expiresInMs,
  });
  return exchanged.jobToken;
}

/** Test-only: clear the job-token cache so unit tests don't leak state. */
export function __clearQoderJobTokenCache(): void {
  qoderJobTokenCache.clear();
  qoderJobTokenPending.clear();
}

export async function validateQoderCliPat({
  apiKey,
  providerSpecificData = {},
}: {
  apiKey: string;
  providerSpecificData?: JsonRecord;
}) {
  // Resolve token: dashboard input → env var fallback
  const resolvedToken =
    apiKey?.trim() || String(process.env.QODER_PERSONAL_ACCESS_TOKEN || "").trim();

  if (!resolvedToken) {
    return {
      valid: false,
      error:
        "No Qoder token provided. Get your Personal Access Token from https://qoder.com/account/integrations or set QODER_PERSONAL_ACCESS_TOKEN env var.",
      unsupported: false,
    };
  }

  // PAT format guidance: Qoder PATs should be non-empty strings.
  // Warn if the token looks like it might be an encrypted blob (from ~/.qoder/.auth/user)
  // rather than a proper PAT from the website.
  if (resolvedToken.length > 500) {
    return {
      valid: false,
      error:
        "Token appears to be an encrypted auth blob (from ~/.qoder/.auth/user). " +
        "Please use a Personal Access Token from https://qoder.com/account/integrations instead.",
      unsupported: false,
    };
  }

  // Reference providerSpecificData so callers can still pass validation hints
  // (model id, etc.) without a signature change; the CLI resolves models itself.
  void providerSpecificData;

  // Validate by asking the local qodercli to list the models reachable for this
  // PAT. The official CLI signs the (WASM-based) Cosy request internally, which
  // the pure-HTTP path can no longer replicate — a raw Cosy call now returns a
  // generic 500 for every token, so it cannot distinguish valid from invalid.
  // `--list-models` authenticates without consuming any chat tokens.
  const run = await listQoderCliModels({ token: resolvedToken });
  const combined = `${run.stdout}\n${run.stderr}`.trim();
  const normalized = combined.toLowerCase();

  if (run.error && /enoent|not found|no such file|spawn/i.test(run.error)) {
    return {
      valid: false,
      error: buildQoderCliNotFoundHint(run.error),
      unsupported: false,
    };
  }

  if (run.timedOut) {
    return {
      valid: false,
      error:
        "qodercli timed out while validating the token. Check network/proxy access from the OmniRoute host.",
      unsupported: false,
    };
  }

  if (
    /not logged in|please run \/login|login required|unauthorized|forbidden|exchangejobtoken failed|personal token format|invalid[\s\w]{0,40}?(?:token|credential|api[\s_-]*key)/i.test(
      normalized
    )
  ) {
    return {
      valid: false,
      error:
        "Qoder rejected this Personal Access Token (not authorized). " +
        "Check your token at https://qoder.com/account/integrations.",
      unsupported: false,
    };
  }

  // A successful `--list-models` prints the catalog (a table headed by "MODEL").
  if (run.ok && normalized.includes("model")) {
    return { valid: true, error: null, unsupported: false };
  }

  return {
    valid: false,
    error: `qodercli validation failed: ${(combined || run.error || "unknown error").slice(0, 300)}`,
    unsupported: false,
  };
}
