import { SkillHandler } from "./types";
import { executeWebSearch } from "@/lib/search/executeWebSearch";
import { resolveDataDir } from "@/lib/dataPaths";
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { sandboxRunner, type SandboxConfig } from "./sandbox";
import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";

const MAX_FILE_BYTES = Number.parseInt(process.env.SKILLS_MAX_FILE_BYTES || "", 10) || 1_048_576;
const MAX_HTTP_RESPONSE_BYTES =
  Number.parseInt(process.env.SKILLS_MAX_HTTP_RESPONSE_BYTES || "", 10) || 256_000;
const MAX_SANDBOX_OUTPUT_CHARS =
  Number.parseInt(process.env.SKILLS_MAX_SANDBOX_OUTPUT_CHARS || "", 10) || 100_000;
const DEFAULT_SANDBOX_TIMEOUT_MS =
  Number.parseInt(process.env.SKILLS_SANDBOX_TIMEOUT_MS || "", 10) || 10_000;
const SANDBOX_NETWORK_ENABLED =
  process.env.SKILLS_SANDBOX_NETWORK_ENABLED === "1" ||
  process.env.SKILLS_SANDBOX_NETWORK_ENABLED === "true";
const DEFAULT_COMMAND_IMAGE = "alpine:3.20";
const DEFAULT_JS_IMAGE = "node:22-alpine";
const DEFAULT_PYTHON_IMAGE = "python:3.12-alpine";
const ALLOWED_SANDBOX_IMAGES = new Set(
  (process.env.SKILLS_ALLOWED_SANDBOX_IMAGES || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
);

for (const image of [DEFAULT_COMMAND_IMAGE, DEFAULT_JS_IMAGE, DEFAULT_PYTHON_IMAGE]) {
  ALLOWED_SANDBOX_IMAGES.add(image);
}

const FORBIDDEN_PATH_SEGMENTS = new Set([
  ".env",
  ".git",
  ".ssh",
  ".omniroute",
  ".codex",
  "secrets",
]);
const ALLOWED_HTTP_METHODS = new Set(["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"]);
const BLOCKED_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
  "cookie",
  "set-cookie",
  "authorization",
  "proxy-authorization",
]);

function getContextId(context: { apiKeyId: string }) {
  // Not a password hash — SHA-256 is used here only to derive a short, stable
  // filesystem-safe key from the API key identifier for workspace isolation.
  return createHash("sha256") // lgtm[js/insufficient-password-hash]
    .update(context.apiKeyId || "anonymous")
    .digest("hex")
    .slice(0, 24);
}

function getWorkspaceRoot(context: { apiKeyId: string }) {
  return path.join(resolveDataDir(), "skills", "workspaces", getContextId(context));
}

function resolveWorkspacePath(inputPath: string, context: { apiKeyId: string }) {
  if (path.isAbsolute(inputPath)) {
    throw new Error("Skill file paths must be relative to the skill workspace");
  }

  const segments = inputPath.split(/[\\/]+/).filter(Boolean);
  if (segments.some((segment) => FORBIDDEN_PATH_SEGMENTS.has(segment.toLowerCase()))) {
    throw new Error("Skill file path contains a restricted segment");
  }

  const root = path.resolve(getWorkspaceRoot(context));
  const resolved = path.resolve(root, inputPath);
  const relative = path.relative(root, resolved);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Skill file path escapes the skill workspace");
  }

  return { root, resolved, relative };
}

function normalizePositiveInteger(value: unknown, fallback: number, max: number) {
  if (value === undefined || value === null) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return fallback;
  return Math.min(parsed, max);
}

function sanitizeHeaders(headers: unknown) {
  if (!headers || typeof headers !== "object" || Array.isArray(headers)) return undefined;

  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers as Record<string, unknown>)) {
    const normalizedKey = key.trim();
    if (!normalizedKey || BLOCKED_REQUEST_HEADERS.has(normalizedKey.toLowerCase())) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      sanitized[normalizedKey] = String(value);
    }
  }

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

async function readResponseText(response: Response, maxBytes: number) {
  const reader = response.body?.getReader();
  if (!reader) return { body: "", truncated: false };

  const decoder = new TextDecoder();
  const chunks: Uint8Array[] = [];
  let bytesRead = 0;
  let truncated = false;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (!value) continue;

    const remaining = maxBytes - bytesRead;
    if (remaining <= 0) {
      truncated = true;
      await reader.cancel();
      break;
    }

    const chunk = value.byteLength > remaining ? value.slice(0, remaining) : value;
    chunks.push(chunk);
    bytesRead += chunk.byteLength;

    if (value.byteLength > remaining) {
      truncated = true;
      await reader.cancel();
      break;
    }
  }

  return {
    body:
      chunks.map((chunk) => decoder.decode(chunk, { stream: true })).join("") + decoder.decode(),
    truncated,
  };
}

function normalizeBody(body: unknown, headers?: Record<string, string>) {
  if (body === undefined || body === null) return undefined;
  if (typeof body === "string") return body;
  if (body instanceof Uint8Array) return body;
  if (typeof body === "object") {
    if (headers && !Object.keys(headers).some((key) => key.toLowerCase() === "content-type")) {
      headers["Content-Type"] = "application/json";
    }
    return JSON.stringify(body);
  }
  return String(body);
}

function normalizeImage(image: unknown, fallback: string) {
  const selected = typeof image === "string" && image.trim() ? image.trim() : fallback;
  if (!ALLOWED_SANDBOX_IMAGES.has(selected)) {
    throw new Error(`Sandbox image is not allowed: ${selected}`);
  }
  return selected;
}

function sandboxConfig(input: {
  timeoutMs?: unknown;
  networkEnabled?: unknown;
}): Partial<SandboxConfig> {
  const requestedNetwork = input.networkEnabled === true;
  return {
    timeout: normalizePositiveInteger(input.timeoutMs, DEFAULT_SANDBOX_TIMEOUT_MS, 60_000),
    networkEnabled: requestedNetwork && SANDBOX_NETWORK_ENABLED,
    readOnly: true,
  };
}

function truncateOutput(value: string) {
  if (value.length <= MAX_SANDBOX_OUTPUT_CHARS) return { value, truncated: false };
  return { value: value.slice(0, MAX_SANDBOX_OUTPUT_CHARS), truncated: true };
}

function normalizeArgs(args: unknown): string[] {
  if (args === undefined) return [];
  if (!Array.isArray(args)) throw new Error("Field args must be an array");
  return args.map((arg) => {
    if (typeof arg !== "string" && typeof arg !== "number" && typeof arg !== "boolean") {
      throw new Error("Command arguments must be strings, numbers, or booleans");
    }
    return String(arg);
  });
}

export const builtinSkills: Record<string, SkillHandler> = {
  file_read: async (input, context) => {
    const { path: inputPath, encoding = "utf8" } = input as {
      path: string;
      encoding?: BufferEncoding;
    };
    if (!inputPath || typeof inputPath !== "string") {
      throw new Error("Missing required field: path");
    }
    if (encoding !== "utf8" && encoding !== "base64") {
      throw new Error("Unsupported encoding. Use utf8 or base64.");
    }

    const { resolved, relative } = resolveWorkspacePath(inputPath, context);
    const stat = await fs.stat(resolved);
    if (!stat.isFile()) throw new Error("Skill file path must point to a file");
    if (stat.size > MAX_FILE_BYTES) {
      throw new Error(`Skill file exceeds the ${MAX_FILE_BYTES} byte read limit`);
    }

    return {
      success: true,
      path: relative,
      content: await fs.readFile(resolved, encoding),
      bytesRead: stat.size,
      encoding,
      context: context.apiKeyId,
    };
  },

  file_write: async (input, context) => {
    const {
      path: inputPath,
      content,
      append = false,
      overwrite = true,
    } = input as {
      path: string;
      content: string;
      append?: boolean;
      overwrite?: boolean;
    };
    if (!inputPath || typeof inputPath !== "string" || typeof content !== "string") {
      throw new Error("Missing required fields: path, content");
    }

    const bytesWritten = Buffer.byteLength(content, "utf8");
    if (bytesWritten > MAX_FILE_BYTES) {
      throw new Error(`Skill file write exceeds the ${MAX_FILE_BYTES} byte limit`);
    }

    const { resolved, relative } = resolveWorkspacePath(inputPath, context);
    await fs.mkdir(path.dirname(resolved), { recursive: true });
    await fs.writeFile(resolved, content, {
      encoding: "utf8",
      flag: append ? "a" : overwrite ? "w" : "wx",
    });

    return { success: true, path: relative, bytesWritten, context: context.apiKeyId };
  },

  http_request: async (input, context) => {
    const {
      url,
      method = "GET",
      headers: rawHeaders,
      body,
      timeoutMs,
      maxBytes,
    } = input as {
      url: string;
      method?: string;
      headers?: Record<string, unknown>;
      body?: unknown;
      timeoutMs?: number;
      maxBytes?: number;
    };
    if (!url || typeof url !== "string") {
      throw new Error("Missing required field: url");
    }

    const normalizedMethod = method.toUpperCase();
    if (!ALLOWED_HTTP_METHODS.has(normalizedMethod)) {
      throw new Error(`Unsupported HTTP method: ${method}`);
    }

    const headers = sanitizeHeaders(rawHeaders);
    const response = await safeOutboundFetch(url, {
      method: normalizedMethod,
      headers,
      body:
        normalizedMethod === "GET" || normalizedMethod === "HEAD"
          ? undefined
          : normalizeBody(body, headers),
      timeoutMs: normalizePositiveInteger(timeoutMs, 10_000, 60_000),
      allowRedirect: false,
      retry: false,
      guard: "public-only",
    });
    const limit = normalizePositiveInteger(
      maxBytes,
      MAX_HTTP_RESPONSE_BYTES,
      MAX_HTTP_RESPONSE_BYTES
    );
    const responseBody =
      normalizedMethod === "HEAD"
        ? { body: "", truncated: false }
        : await readResponseText(response, limit);

    return {
      success: response.ok,
      url,
      method: normalizedMethod,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody.body,
      truncated: responseBody.truncated,
      context: context.apiKeyId,
    };
  },

  web_search: async (input, context) => {
    const {
      query,
      limit,
      max_results,
      search_type,
      provider,
      country,
      language,
      time_range,
      offset,
      filters,
      content,
      provider_options,
      strict_filters,
    } = input as {
      query: string;
      limit?: number;
      max_results?: number;
      search_type?: "web" | "news";
      provider?: string;
      country?: string;
      language?: string;
      time_range?: "any" | "day" | "week" | "month" | "year";
      offset?: number;
      filters?: {
        include_domains?: string[];
        exclude_domains?: string[];
        safe_search?: "off" | "moderate" | "strict";
      };
      content?: {
        snippet?: boolean;
        full_page?: boolean;
        format?: "text" | "markdown";
        max_characters?: number;
      };
      provider_options?: Record<string, unknown>;
      strict_filters?: boolean;
    };
    if (!query) {
      throw new Error("Missing required field: query");
    }
    const search = await executeWebSearch({
      query,
      provider,
      limit,
      max_results,
      search_type,
      country,
      language,
      time_range,
      offset,
      filters,
      content,
      provider_options,
      strict_filters,
      apiKeyId: context.apiKeyId || null,
    });
    return {
      success: true,
      provider: search.data.provider,
      query: search.data.query,
      results: search.data.results,
      answer: search.data.answer,
      usage: search.cached ? { queries_used: 0, search_cost_usd: 0 } : search.data.usage,
      metrics: search.data.metrics,
      cached: search.cached,
      context: context.apiKeyId,
    };
  },

  eval_code: async (input, context) => {
    const {
      code,
      language = "javascript",
      image,
      timeoutMs,
      networkEnabled,
    } = input as {
      code: string;
      language?: string;
      image?: string;
      timeoutMs?: number;
      networkEnabled?: boolean;
    };
    if (!code || typeof code !== "string") {
      throw new Error("Missing required field: code");
    }

    const normalizedLanguage = language.toLowerCase();
    let selectedImage: string;
    let command: string[];
    if (normalizedLanguage === "javascript" || normalizedLanguage === "js") {
      selectedImage = normalizeImage(image, DEFAULT_JS_IMAGE);
      command = ["node", "--eval", code];
    } else if (normalizedLanguage === "python" || normalizedLanguage === "py") {
      selectedImage = normalizeImage(image, DEFAULT_PYTHON_IMAGE);
      command = ["python", "-c", code];
    } else {
      throw new Error(`Unsupported code language: ${language}`);
    }

    const result = await sandboxRunner.run(
      selectedImage,
      command,
      {},
      sandboxConfig({ timeoutMs, networkEnabled })
    );
    const stdout = truncateOutput(result.stdout);
    const stderr = truncateOutput(result.stderr);
    return {
      success: result.exitCode === 0,
      language: normalizedLanguage,
      image: selectedImage,
      exitCode: result.exitCode,
      stdout: stdout.value,
      stderr: stderr.value,
      output: stdout.value,
      truncated: stdout.truncated || stderr.truncated,
      durationMs: result.duration,
      killed: result.killed,
      context: context.apiKeyId,
    };
  },

  execute_command: async (input, context) => {
    const {
      command,
      args = [],
      image,
      timeoutMs,
      networkEnabled,
    } = input as {
      command: string;
      args?: unknown[];
      image?: string;
      timeoutMs?: number;
      networkEnabled?: boolean;
    };
    if (!command || typeof command !== "string") {
      throw new Error("Missing required field: command");
    }

    const normalizedArgs = normalizeArgs(args);
    const selectedImage = normalizeImage(image, DEFAULT_COMMAND_IMAGE);
    const result = await sandboxRunner.run(
      selectedImage,
      [command, ...normalizedArgs],
      {},
      sandboxConfig({ timeoutMs, networkEnabled })
    );
    const stdout = truncateOutput(result.stdout);
    const stderr = truncateOutput(result.stderr);

    return {
      success: result.exitCode === 0,
      command,
      args: normalizedArgs,
      image: selectedImage,
      exitCode: result.exitCode,
      stdout: stdout.value,
      stderr: stderr.value,
      output: stdout.value,
      truncated: stdout.truncated || stderr.truncated,
      durationMs: result.duration,
      killed: result.killed,
      context: context.apiKeyId,
    };
  },
};

export function registerBuiltinSkills(executor: any): void {
  for (const [name, handler] of Object.entries(builtinSkills)) {
    executor.registerHandler(name, handler);
  }
}
