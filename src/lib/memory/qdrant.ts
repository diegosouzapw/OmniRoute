import { getSettings } from "@/lib/db/settings";
import { createEmbeddingResponse } from "@/lib/embeddings/service";

type JsonRecord = Record<string, unknown>;

export type QdrantConfig = {
  enabled: boolean;
  host: string;
  port: number;
  apiKey: string | null;
  collection: string;
  embeddingModel: string;
};

export function normalizeQdrantConfig(settings: Record<string, unknown>): QdrantConfig {
  const host = typeof settings.qdrantHost === "string" ? settings.qdrantHost.trim() : "";
  const portRaw = settings.qdrantPort;
  const port =
    typeof portRaw === "number" && Number.isFinite(portRaw)
      ? Math.round(portRaw)
      : typeof portRaw === "string"
        ? Math.round(Number(portRaw) || 6333)
        : 6333;
  const apiKey =
    typeof settings.qdrantApiKey === "string" && settings.qdrantApiKey.trim().length > 0
      ? settings.qdrantApiKey.trim()
      : null;
  const collection =
    typeof settings.qdrantCollection === "string" && settings.qdrantCollection.trim().length > 0
      ? settings.qdrantCollection.trim()
      : "omniroute_memory";
  const embeddingModel =
    typeof settings.qdrantEmbeddingModel === "string" &&
    settings.qdrantEmbeddingModel.trim().length > 0
      ? settings.qdrantEmbeddingModel.trim()
      : "openai/text-embedding-3-small";
  const enabled = settings.qdrantEnabled === true;

  return { enabled, host, port, apiKey, collection, embeddingModel };
}

export async function getQdrantConfig(): Promise<QdrantConfig> {
  const settings = (await getSettings()) as Record<string, unknown>;
  return normalizeQdrantConfig(settings);
}

function baseUrl(cfg: QdrantConfig): string {
  const host = cfg.host.replace(/\/+$/, "");
  const withProto =
    host.startsWith("http://") || host.startsWith("https://") ? host : `http://${host}`;
  try {
    const url = new URL(withProto);
    if (!url.port) url.port = String(cfg.port);
    return url.toString().replace(/\/+$/, "");
  } catch {
    return `${withProto}:${cfg.port}`;
  }
}

async function qdrantFetch(cfg: QdrantConfig, path: string, init?: RequestInit): Promise<Response> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (cfg.apiKey) headers["api-key"] = cfg.apiKey;

  return fetch(`${baseUrl(cfg)}${path}`, {
    ...init,
    headers,
  });
}

export async function checkQdrantHealth(): Promise<{
  ok: boolean;
  latencyMs: number;
  error?: string;
}> {
  const cfg = await getQdrantConfig();
  const start = Date.now();
  if (!cfg.enabled || !cfg.host) {
    return { ok: false, latencyMs: 0, error: "not_configured" };
  }

  try {
    const res = await qdrantFetch(cfg, "/readyz", { method: "GET" });
    const latencyMs = Date.now() - start;
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, latencyMs, error: text.slice(0, 200) || `HTTP ${res.status}` };
    }
    return { ok: true, latencyMs };
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function ensureCollection(cfg: QdrantConfig, vectorSize: number): Promise<void> {
  const getRes = await qdrantFetch(cfg, `/collections/${encodeURIComponent(cfg.collection)}`, {
    method: "GET",
  });
  if (getRes.ok) return;

  const createRes = await qdrantFetch(cfg, `/collections/${encodeURIComponent(cfg.collection)}`, {
    method: "PUT",
    body: JSON.stringify({
      vectors: { size: vectorSize, distance: "Cosine" },
    }),
  });
  if (!createRes.ok) {
    const text = await createRes.text().catch(() => "");
    throw new Error(text.slice(0, 300) || `Failed to create collection (${createRes.status})`);
  }
}

async function getCollectionVectorName(cfg: QdrantConfig): Promise<string | null> {
  const res = await qdrantFetch(cfg, `/collections/${encodeURIComponent(cfg.collection)}`, {
    method: "GET",
  });
  if (!res.ok) return null;
  const data = (await res.json().catch(() => null)) as any;
  const vectors = data?.result?.config?.params?.vectors;
  if (!vectors || typeof vectors !== "object" || Array.isArray(vectors)) {
    return null;
  }
  // Unnamed/single-vector config: { size, distance, ... } (not a named map)
  if (
    Object.prototype.hasOwnProperty.call(vectors, "size") &&
    (typeof vectors.size === "number" || typeof vectors.size === "string")
  ) {
    return null;
  }
  const names = Object.keys(vectors);
  if (names.length === 0) return null;
  return names[0] || null;
}

async function embedText(cfg: QdrantConfig, text: string): Promise<number[]> {
  const modelStr = cfg.embeddingModel.trim();
  if (!modelStr.includes("/")) {
    throw new Error(`Invalid embedding model '${modelStr}'. Use provider/model format.`);
  }

  const res = await createEmbeddingResponse({
    model: modelStr,
    input: text,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt.slice(0, 300) || `Embeddings request failed (${res.status})`);
  }
  const data = (await res.json().catch(() => null)) as any;
  const vec = data?.data?.[0]?.embedding;
  if (!Array.isArray(vec) || vec.length === 0) {
    throw new Error("Embedding response missing vector");
  }
  return vec as number[];
}

export async function upsertSemanticMemoryPoint(input: {
  id: string;
  apiKeyId: string;
  sessionId: string;
  key: string;
  content: string;
  metadata: JsonRecord;
  createdAt: string;
  expiresAt: string | null;
}): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
  const cfg = await getQdrantConfig();
  if (!cfg.enabled || !cfg.host) return { ok: false, latencyMs: 0, error: "not_configured" };

  const start = Date.now();
  try {
    const vector = await embedText(cfg, `${input.key}\n\n${input.content}`);
    await ensureCollection(cfg, vector.length);
    const vectorName = await getCollectionVectorName(cfg);

    const createdAtUnix = Math.floor(new Date(input.createdAt).getTime() / 1000);
    const expiresAtUnix = input.expiresAt
      ? Math.floor(new Date(input.expiresAt).getTime() / 1000)
      : null;

    const payload = {
      kind: "omniroute_memory",
      memoryId: input.id,
      apiKeyId: input.apiKeyId || "",
      sessionId: input.sessionId || "",
      type: "semantic",
      key: input.key || "",
      content: input.content || "",
      metadata: input.metadata || {},
      createdAtUnix,
      expiresAtUnix,
    };

    const res = await qdrantFetch(
      cfg,
      `/collections/${encodeURIComponent(cfg.collection)}/points?wait=true`,
      {
        method: "PUT",
        body: JSON.stringify({
          points: [
            {
              id: input.id,
              vector: vectorName ? { [vectorName]: vector } : vector,
              payload,
            },
          ],
        }),
      }
    );

    const latencyMs = Date.now() - start;
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, latencyMs, error: text.slice(0, 300) || `HTTP ${res.status}` };
    }
    return { ok: true, latencyMs };
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function searchSemanticMemory(
  query: string,
  topK = 5,
  scope?: { apiKeyId?: string; sessionId?: string | null }
): Promise<{
  ok: boolean;
  latencyMs: number;
  results?: Array<{ id: string; score: number; payload?: JsonRecord }>;
  error?: string;
}> {
  const cfg = await getQdrantConfig();
  if (!cfg.enabled || !cfg.host) return { ok: false, latencyMs: 0, error: "not_configured" };
  const start = Date.now();
  try {
    const vector = await embedText(cfg, query);
    await ensureCollection(cfg, vector.length);
    const vectorName = await getCollectionVectorName(cfg);

    const res = await qdrantFetch(
      cfg,
      `/collections/${encodeURIComponent(cfg.collection)}/points/search`,
      {
        method: "POST",
        body: JSON.stringify({
          vector: vectorName ? { name: vectorName, vector } : vector,
          limit: Math.max(1, Math.min(20, topK)),
          filter: {
            must: [
              { key: "kind", match: { value: "omniroute_memory" } },
              ...(scope?.apiKeyId ? [{ key: "apiKeyId", match: { value: scope.apiKeyId } }] : []),
              ...(scope?.sessionId
                ? [{ key: "sessionId", match: { value: String(scope.sessionId) } }]
                : []),
            ],
          },
          with_payload: true,
        }),
      }
    );

    const latencyMs = Date.now() - start;
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, latencyMs, error: text.slice(0, 300) || `HTTP ${res.status}` };
    }
    const data = (await res.json().catch(() => null)) as any;
    const result = Array.isArray(data?.result) ? data.result : [];
    return {
      ok: true,
      latencyMs,
      results: result.map((r: any) => ({
        id: String(r.id),
        score: typeof r.score === "number" ? r.score : 0,
        payload: r.payload && typeof r.payload === "object" ? (r.payload as JsonRecord) : undefined,
      })),
    };
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function deleteSemanticMemoryPoint(
  id: string
): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
  const cfg = await getQdrantConfig();
  if (!cfg.enabled || !cfg.host) return { ok: false, latencyMs: 0, error: "not_configured" };
  const start = Date.now();
  try {
    const res = await qdrantFetch(
      cfg,
      `/collections/${encodeURIComponent(cfg.collection)}/points/delete?wait=true`,
      {
        method: "POST",
        body: JSON.stringify({ points: [id] }),
      }
    );
    const latencyMs = Date.now() - start;
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, latencyMs, error: text.slice(0, 300) || `HTTP ${res.status}` };
    }
    return { ok: true, latencyMs };
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function cleanupSemanticMemoryPoints(input: {
  retentionDays: number;
}): Promise<{ ok: boolean; deletedCount: number; latencyMs: number; error?: string }> {
  const cfg = await getQdrantConfig();
  if (!cfg.enabled || !cfg.host)
    return { ok: false, deletedCount: 0, latencyMs: 0, error: "not_configured" };

  const retentionDays =
    typeof input.retentionDays === "number" && Number.isFinite(input.retentionDays)
      ? Math.max(1, Math.min(3650, Math.round(input.retentionDays)))
      : 30;

  const start = Date.now();
  try {
    const nowUnix = Math.floor(Date.now() / 1000);
    const cutoffUnix = nowUnix - retentionDays * 24 * 60 * 60;

    const filter: Record<string, unknown> = {
      must: [{ key: "kind", match: { value: "omniroute_memory" } }],
      should: [
        { key: "expiresAtUnix", range: { lt: nowUnix } },
        { key: "createdAtUnix", range: { lt: cutoffUnix } },
      ],
    };

    // Count first (so we can show an actual number in the dashboard)
    const countRes = await qdrantFetch(
      cfg,
      `/collections/${encodeURIComponent(cfg.collection)}/points/count`,
      {
        method: "POST",
        body: JSON.stringify({ filter, exact: true }),
      }
    );
    if (!countRes.ok) {
      const text = await countRes.text().catch(() => "");
      return {
        ok: false,
        deletedCount: 0,
        latencyMs: Date.now() - start,
        error: text.slice(0, 300) || `HTTP ${countRes.status}`,
      };
    }
    const countData = (await countRes.json().catch(() => null)) as any;
    const toDelete =
      typeof countData?.result?.count === "number" && Number.isFinite(countData.result.count)
        ? Math.max(0, Math.round(countData.result.count))
        : 0;

    if (toDelete === 0) {
      return { ok: true, deletedCount: 0, latencyMs: Date.now() - start };
    }

    const delRes = await qdrantFetch(
      cfg,
      `/collections/${encodeURIComponent(cfg.collection)}/points/delete?wait=true`,
      {
        method: "POST",
        body: JSON.stringify({
          filter,
        }),
      }
    );
    if (!delRes.ok) {
      const text = await delRes.text().catch(() => "");
      return {
        ok: false,
        deletedCount: 0,
        latencyMs: Date.now() - start,
        error: text.slice(0, 300) || `HTTP ${delRes.status}`,
      };
    }

    return { ok: true, deletedCount: toDelete, latencyMs: Date.now() - start };
  } catch (err) {
    return {
      ok: false,
      deletedCount: 0,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
