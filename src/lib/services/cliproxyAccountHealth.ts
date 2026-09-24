import { getServiceRow } from "@/lib/db/versionManager";
import { getOrCreateApiKey } from "@/lib/services/apiKey";
import { CLIPROXY_DEFAULT_PORT } from "@/lib/services/installers/cliproxy";

const DEFAULT_TIMEOUT_MS = 5_000;
const AUTH_FILES_PATH = "/v0/management/auth-files";

export type CliproxyAccountHealthState =
  | "ready"
  | "disabled"
  | "missing_key"
  | "unreachable"
  | "unauthorized"
  | "unsupported"
  | "invalid_response";

export interface CliproxyRecentRequest {
  time: string;
  success: number;
  failed: number;
}

export interface CliproxyAccountHealth {
  authIndex: string;
  provider: string;
  type: string;
  label: string;
  status: string;
  disabled: boolean;
  unavailable: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  success: number;
  failed: number;
  recentRequests: CliproxyRecentRequest[];
}

export interface CliproxyAccountHealthResult {
  state: CliproxyAccountHealthState;
  accounts: CliproxyAccountHealth[];
  version: string | null;
}

type FetchLike = typeof fetch;

interface GetCliproxyAccountHealthOptions {
  fetchImpl?: FetchLike;
  timeoutMs?: number;
  host?: string;
  port?: number;
  managementKey?: string | null;
  embedded?: boolean;
}

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function string(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function nullableTimestamp(value: unknown): string | null {
  const text = string(value);
  return text && !Number.isNaN(Date.parse(text)) ? text : null;
}

function count(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
}

function sanitizeRecentRequests(value: unknown): CliproxyRecentRequest[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 20)
    .map(record)
    .filter((bucket): bucket is Record<string, unknown> => bucket !== null)
    .map((bucket) => ({
      time: nullableTimestamp(bucket.time) ?? "",
      success: count(bucket.success),
      failed: count(bucket.failed),
    }))
    .filter((bucket) => bucket.time !== "");
}

export function sanitizeCliproxyAuthFiles(payload: unknown): CliproxyAccountHealth[] | null {
  const files = record(payload)?.files;
  if (!Array.isArray(files)) return null;
  return files
    .map(record)
    .filter((file): file is Record<string, unknown> => file !== null)
    .map((file) => ({
      authIndex: string(file.auth_index),
      provider: string(file.provider),
      type: string(file.type),
      label: string(file.label),
      status: string(file.status),
      disabled: file.disabled === true,
      unavailable: file.unavailable === true,
      createdAt: nullableTimestamp(file.created_at),
      updatedAt: nullableTimestamp(file.updated_at ?? file.modtime),
      success: count(file.success),
      failed: count(file.failed),
      recentRequests: sanitizeRecentRequests(file.recent_requests),
    }))
    .filter((file) => file.authIndex !== "");
}

/** Read-time label for a stored auth index. Drops emails, paths, and blank labels. */
export function labelForCliproxyAuthIndex(
  authIndex: string | null | undefined,
  accounts: readonly CliproxyAccountHealth[]
): string | null {
  if (!authIndex) return null;
  const label = accounts.find((account) => account.authIndex === authIndex)?.label.trim() ?? "";
  if (!label || label.length > 80 || /[@/\\\s]/.test(label)) return null;
  return label;
}

async function resolveConnection(
  options: GetCliproxyAccountHealthOptions
): Promise<
  | { state: "ready"; host: string; port: number; managementKey: string }
  | { state: "disabled" | "missing_key" }
> {
  if (options.managementKey !== undefined) {
    const key = options.managementKey?.trim();
    if (!key) return { state: "missing_key" };
    return {
      state: "ready",
      host: options.host ?? "127.0.0.1",
      port: options.port ?? CLIPROXY_DEFAULT_PORT,
      managementKey: key,
    };
  }

  const externalHost = process.env.CLIPROXYAPI_HOST?.trim();
  const externalKey = process.env.CLIPROXYAPI_MANAGEMENT_KEY?.trim();
  const embedded = options.embedded ?? !(externalHost || externalKey);
  if (embedded) {
    const row = await getServiceRow("cliproxy");
    if (!row || row.status === "not_installed") return { state: "disabled" };
    return {
      state: "ready",
      host: options.host ?? "127.0.0.1",
      port: options.port ?? row.port ?? CLIPROXY_DEFAULT_PORT,
      managementKey: await getOrCreateApiKey("cliproxy"),
    };
  }

  if (!externalKey) return { state: "missing_key" };
  const configuredPort = Number.parseInt(process.env.CLIPROXYAPI_PORT ?? "", 10);
  return {
    state: "ready",
    host: options.host ?? externalHost ?? "127.0.0.1",
    port:
      options.port ??
      (Number.isInteger(configuredPort) && configuredPort > 0
        ? configuredPort
        : CLIPROXY_DEFAULT_PORT),
    managementKey: externalKey,
  };
}

export async function getCliproxyAccountHealth(
  options: GetCliproxyAccountHealthOptions = {}
): Promise<CliproxyAccountHealthResult> {
  let connection: Awaited<ReturnType<typeof resolveConnection>>;
  try {
    connection = await resolveConnection(options);
  } catch {
    return { state: "missing_key", accounts: [], version: null };
  }
  if (connection.state !== "ready") {
    return { state: connection.state, accounts: [], version: null };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  try {
    const response = await (options.fetchImpl ?? fetch)(
      `http://${connection.host}:${connection.port}${AUTH_FILES_PATH}`,
      {
        headers: { Authorization: `Bearer ${connection.managementKey}` },
        signal: controller.signal,
      }
    );
    const version = response.headers.get("x-cpa-version");
    if (response.status === 401 || response.status === 403) {
      return { state: "unauthorized", accounts: [], version };
    }
    if (response.status === 404) {
      return { state: "unsupported", accounts: [], version };
    }
    if (!response.ok) {
      return { state: "unreachable", accounts: [], version };
    }
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      return { state: "invalid_response", accounts: [], version };
    }
    const accounts = sanitizeCliproxyAuthFiles(payload);
    return accounts
      ? { state: "ready", accounts, version }
      : { state: "invalid_response", accounts: [], version };
  } catch {
    return { state: "unreachable", accounts: [], version: null };
  } finally {
    clearTimeout(timeout);
  }
}
