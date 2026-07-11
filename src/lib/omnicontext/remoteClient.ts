/**
 * Phase 3 — optional remote Continuity backend client.
 * Content-bearing retrieve/publish over HTTP; fail-open on inject path.
 */

export type OmniContextBackendMode = "native" | "remote";

export interface RemoteBackendConfig {
  baseUrl: string;
  apiKey?: string;
  timeoutMs: number;
}

export interface RemoteRetrieveRequest {
  projectId: string;
  query: string;
  limit?: number;
}

export interface RemoteRetrieveResponse {
  artifacts: Array<{ id: string; title: string; body: string; type: string; rank?: number }>;
  stablePrefix?: { id: string; title: string; body: string } | null;
}

export class RemoteBackendError extends Error {
  status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.name = "RemoteBackendError";
    this.status = status;
  }
}

export async function remoteRetrieve(
  config: RemoteBackendConfig,
  req: RemoteRetrieveRequest,
  fetchImpl: typeof fetch = fetch
): Promise<RemoteRetrieveResponse> {
  if (!config.baseUrl) throw new RemoteBackendError("Remote backend baseUrl missing", 500);
  const url = new URL("/v1/omnicontext/retrieve", config.baseUrl.replace(/\/$/, "") + "/");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    const res = await fetchImpl(url.toString(), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(config.apiKey ? { authorization: `Bearer ${config.apiKey}` } : {}),
      },
      body: JSON.stringify(req),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new RemoteBackendError(`Remote retrieve failed (${res.status})`, res.status);
    }
    const json = (await res.json()) as Record<string, unknown>;
    const dynamic = Array.isArray(json.dynamic) ? json.dynamic : [];
    const artifacts = dynamic.map((item) => {
      const row = item as Record<string, unknown>;
      const art = (row.artifact as Record<string, unknown>) || row;
      return {
        id: String(art.id || ""),
        title: String(art.title || ""),
        body: String(art.body || ""),
        type: String(art.type || "summary"),
        rank: typeof row.rank === "number" ? row.rank : undefined,
      };
    });
    const sp = json.stablePrefix as Record<string, unknown> | null | undefined;
    return {
      artifacts,
      stablePrefix: sp
        ? {
            id: String(sp.id || ""),
            title: String(sp.title || ""),
            body: String(sp.body || ""),
          }
        : null,
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function remotePublish(
  config: RemoteBackendConfig,
  body: Record<string, unknown>,
  fetchImpl: typeof fetch = fetch
): Promise<Record<string, unknown>> {
  if (!config.baseUrl) throw new RemoteBackendError("Remote backend baseUrl missing", 500);
  const url = new URL("/v1/omnicontext/artifacts", config.baseUrl.replace(/\/$/, "") + "/");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    const res = await fetchImpl(url.toString(), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(config.apiKey ? { authorization: `Bearer ${config.apiKey}` } : {}),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new RemoteBackendError(`Remote publish failed (${res.status})`, res.status);
    }
    return (await res.json()) as Record<string, unknown>;
  } finally {
    clearTimeout(timer);
  }
}
