import { setTimeout as sleep } from "node:timers/promises";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { resolveDataDir } from "./data-dir.mjs";
import { getCliToken, CLI_TOKEN_HEADER } from "./utils/cliToken.mjs";

export const RETRY_DEFAULTS = Object.freeze({
  maxAttempts: 3,
  baseMs: 500,
  maxMs: 8000,
  jitter: true,
  retryableStatuses: [408, 425, 429, 502, 503, 504],
  retryableErrorCodes: [
    "ECONNRESET",
    "ECONNREFUSED",
    "ETIMEDOUT",
    "ENOTFOUND",
    "EAI_AGAIN",
    "EPIPE",
  ],
});

const NON_RETRYABLE_ON_MUTATION = new Set([409, 422, 429]);
const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function getBaseUrl(opts = {}) {
  if (opts.baseUrl) return stripTrailingSlash(opts.baseUrl);
  const envUrl = process.env.OMNIROUTE_BASE_URL;
  if (envUrl) return stripTrailingSlash(envUrl);

  try {
    const configPath = join(resolveDataDir(), "config.json");
    if (existsSync(configPath)) {
      const cfg = JSON.parse(readFileSync(configPath, "utf8"));
      const profile = cfg.activeProfile && cfg.profiles?.[cfg.activeProfile];
      if (profile?.baseUrl) return stripTrailingSlash(profile.baseUrl);
      if (cfg.baseUrl) return stripTrailingSlash(cfg.baseUrl);
    }
  } catch {
    // Config read failures are not fatal — fall through to default.
  }

  const port = process.env.PORT || "20128";
  return `http://localhost:${port}`;
}

function stripTrailingSlash(value) {
  return String(value).replace(/\/+$/, "");
}

function resolveUrl(path, opts) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${getBaseUrl(opts)}${path.startsWith("/") ? path : `/${path}`}`;
}

async function buildHeaders(opts) {
  const headers = new Headers(opts.headers || {});
  if (!headers.has("accept")) headers.set("accept", "application/json");
  if (opts.body && !headers.has("content-type") && typeof opts.body !== "string") {
    headers.set("content-type", "application/json");
  }
  const apiKey = opts.apiKey ?? process.env.OMNIROUTE_API_KEY;
  if (apiKey && !headers.has("authorization")) {
    headers.set("authorization", `Bearer ${apiKey}`);
  }
  // Inject machine-id derived CLI token; env var override for testing.
  const cliToken = opts.cliToken ?? process.env.OMNIROUTE_CLI_TOKEN ?? (await getCliToken());
  if (cliToken && !headers.has(CLI_TOKEN_HEADER)) {
    headers.set(CLI_TOKEN_HEADER, cliToken);
  }
  if (opts.idempotencyKey && !headers.has("idempotency-key")) {
    headers.set("idempotency-key", opts.idempotencyKey);
  }
  return headers;
}

function serializeBody(body, headers) {
  if (body == null) return undefined;
  if (typeof body === "string") return body;
  if (body instanceof Buffer) return body;
  if (body instanceof URLSearchParams) return body;
  if (typeof body.pipe === "function") return body; // stream
  if (headers.get("content-type")?.includes("application/json")) return JSON.stringify(body);
  return JSON.stringify(body);
}

export function computeBackoff(attempt, retryAfterHeader, defaults = RETRY_DEFAULTS) {
  if (retryAfterHeader != null) {
    const secs = Number.parseFloat(String(retryAfterHeader));
    if (Number.isFinite(secs) && secs >= 0) {
      return Math.min(secs * 1000, defaults.maxMs);
    }
  }
  const exp = Math.min(defaults.baseMs * 2 ** (attempt - 1), defaults.maxMs);
  if (!defaults.jitter) return exp;
  const jitter = exp * 0.25 * (Math.random() * 2 - 1);
  return Math.max(0, exp + jitter);
}

export function shouldRetryStatus(status, method, opts = {}) {
  if (opts.retry === false) return false;
  const list = opts.retryableStatuses || RETRY_DEFAULTS.retryableStatuses;
  if (!list.includes(status)) return false;
  if (MUTATING_METHODS.has(method) && NON_RETRYABLE_ON_MUTATION.has(status)) {
    return status === 429 ? Boolean(opts.retryMutationsOn429) : false;
  }
  return true;
}

export function shouldRetryError(err, opts = {}) {
  if (opts.retry === false) return false;
  const codes = opts.retryableErrorCodes || RETRY_DEFAULTS.retryableErrorCodes;
  if (err?.code && codes.includes(err.code)) return true;
  if (err?.name === "AbortError" || /timeout|abort/i.test(err?.message || "")) return true;
  return false;
}

export function statusToExitCode(status) {
  if (status >= 200 && status < 300) return 0;
  if (status === 408) return 124;
  if (status === 401 || status === 403) return 4;
  if (status === 429) return 5;
  if (status === 400 || status === 404 || status === 422) return 2;
  if (status >= 500) return 1;
  return 1;
}

export class ApiError extends Error {
  constructor(message, { status, code, exitCode } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.exitCode = exitCode ?? (status != null ? statusToExitCode(status) : 1);
  }
}

async function readResponseBody(res) {
  const ct = res.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) return await res.json();
    return await res.text();
  } catch {
    return null;
  }
}

function fetchOnce(url, init, timeoutMs) {
  if (!timeoutMs) return fetch(url, init);
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  const merged = { ...init, signal: ac.signal };
  return fetch(url, merged).finally(() => clearTimeout(t));
}

export async function apiFetch(path, opts = {}) {
  const method = String(opts.method || "GET").toUpperCase();
  const url = resolveUrl(path, opts);
  const headers = await buildHeaders(opts);
  const body = serializeBody(opts.body, headers);
  const timeout =
    opts.timeout ?? (Number.parseInt(process.env.OMNIROUTE_HTTP_TIMEOUT_MS || "", 10) || 30000);
  const maxAttempts = opts.retry === false ? 1 : (opts.retryMax ?? RETRY_DEFAULTS.maxAttempts);
  const verbose = opts.verbose ?? process.env.OMNIROUTE_VERBOSE === "1";

  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetchOnce(url, { method, headers, body }, timeout);
      if (res.ok) return enrichResponse(res, opts);
      if (attempt < maxAttempts && shouldRetryStatus(res.status, method, opts)) {
        const delay = computeBackoff(attempt, res.headers.get("retry-after"));
        if (verbose) {
          process.stderr.write(
            `[retry ${attempt}/${maxAttempts - 1}] ${method} ${url} → HTTP ${res.status}; wait ${Math.round(delay)}ms\n`
          );
        }
        await sleep(delay);
        continue;
      }
      return enrichResponse(res, opts);
    } catch (err) {
      lastErr = err;
      if (attempt < maxAttempts && shouldRetryError(err, opts)) {
        const delay = computeBackoff(attempt, null);
        if (verbose) {
          process.stderr.write(
            `[retry ${attempt}/${maxAttempts - 1}] ${method} ${url} → ${err.code || err.message}; wait ${Math.round(delay)}ms\n`
          );
        }
        await sleep(delay);
        continue;
      }
      throw normalizeNetworkError(err);
    }
  }
  throw normalizeNetworkError(lastErr);
}

function enrichResponse(res, opts) {
  res.exitCode = statusToExitCode(res.status);
  res.json = res.json.bind(res);
  res.text = res.text.bind(res);
  if (!res.ok && !opts.acceptNotOk) {
    res.assertOk = async () => {
      const payload = await readResponseBody(res);
      const message = extractErrorMessage(payload, res.status);
      throw new ApiError(message, { status: res.status });
    };
  } else {
    res.assertOk = async () => res;
  }
  return res;
}

function extractErrorMessage(payload, status) {
  if (payload && typeof payload === "object") {
    if (typeof payload.error === "string") return payload.error;
    if (payload.error?.message) return String(payload.error.message);
    if (payload.message) return String(payload.message);
  }
  if (typeof payload === "string" && payload.length < 200) return payload;
  return `HTTP ${status}`;
}

function normalizeNetworkError(err) {
  if (err instanceof ApiError) return err;
  const code = err?.code || (err?.name === "AbortError" ? "ETIMEDOUT" : undefined);
  const exitCode = code === "ETIMEDOUT" ? 124 : 1;
  return new ApiError(err?.message || "network error", { code, exitCode });
}

export async function isServerUp(opts = {}) {
  try {
    const res = await apiFetch("/api/health", {
      ...opts,
      retry: false,
      timeout: opts.timeout ?? 1500,
      acceptNotOk: true,
    });
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}
