import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnections } from "@/lib/db/providers";
import { resolveAllowedOrigin, getCorsStatus } from "@/server/cors/origins";
import type { AgentCredentials } from "./baseAgent.ts";
import type { CloudAgentTaskRow } from "./db.ts";

type JsonRecord = Record<string, unknown>;

/**
 * CORS headers for the cloud-agent surface. These routes are MANAGEMENT
 * (cookie/session) authed (`requireCloudAgentManagementAuth`), so their CORS
 * must be fail-closed: the previous `origin || "*"` reflected ANY caller's
 * origin AND paired it with `Allow-Credentials: true`, which lets any website
 * make credentialed (cookie-bearing) requests against the management API — a
 * classic CSRF/exfil hole. We now defer to the central allowlist
 * (`resolveAllowedOrigin`): only an allowlisted origin is echoed, and
 * `Allow-Credentials` is emitted ONLY for an EXPLICITLY allowlisted origin —
 * never for a `CORS_ALLOW_ALL` wildcard echo. Same-origin dashboard calls need
 * no ACAO at all. See docs/security/CORS.md.
 */
export function getCloudAgentCorsHeaders(request?: Request): Record<string, string> {
  const requestOrigin = request?.headers.get("origin") ?? null;
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  const allowed = resolveAllowedOrigin(requestOrigin);
  if (allowed) {
    headers["Access-Control-Allow-Origin"] = allowed;
    headers["Vary"] = "Origin";
    const normalized = requestOrigin?.toLowerCase().replace(/\/+$/, "") ?? "";
    if (normalized && getCorsStatus().allowedOrigins.includes(normalized)) {
      headers["Access-Control-Allow-Credentials"] = "true";
    }
  }
  return headers;
}

export function withCloudAgentCors(response: Response, request?: Request): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(getCloudAgentCorsHeaders(request))) {
    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function requireCloudAgentManagementAuth(request: Request): Promise<Response | null> {
  const authError = await requireManagementAuth(request);
  return authError ? withCloudAgentCors(authError, request) : null;
}

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function serializeCloudAgentTask(task: CloudAgentTaskRow) {
  return {
    id: task.id,
    providerId: task.provider_id,
    externalId: task.external_id,
    status: task.status,
    prompt: task.prompt,
    source: parseJson<JsonRecord>(task.source, {}),
    options: parseJson<JsonRecord>(task.options, {}),
    result: task.result ? parseJson<JsonRecord>(task.result, {}) : null,
    activities: parseJson<JsonRecord[]>(task.activities, []),
    error: task.error,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
    completedAt: task.completed_at,
  };
}

function getConnectionToken(connection: JsonRecord): string | null {
  const apiKey = typeof connection.apiKey === "string" ? connection.apiKey.trim() : "";
  if (apiKey) return apiKey;

  const accessToken =
    typeof connection.accessToken === "string" ? connection.accessToken.trim() : "";
  return accessToken || null;
}

export async function getCloudAgentCredentials(
  providerId: string
): Promise<AgentCredentials | null> {
  const connections = (await getProviderConnections({
    provider: providerId,
    isActive: true,
  })) as JsonRecord[];

  for (const connection of connections) {
    const token = getConnectionToken(connection);
    if (token) return { apiKey: token };
  }

  return null;
}
