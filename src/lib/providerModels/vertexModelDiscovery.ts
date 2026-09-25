import { parseGeminiModelsList } from "@/lib/providerModels/geminiModelsParser";
import { parseVertexPublisherModels } from "@/lib/providerModels/vertexPublisherModelsParser";

const GOOGLE_MODELS_URL = "https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000";
const VERTEX_PUBLISHER_PAGE_SIZE = 300;
const MAX_CATALOG_PAGES = 20;

// #12328 — generativelanguage.googleapis.com is a different Google service from Vertex AI and
// always rejects a genuine Vertex Express API key (400 API_KEY_INVALID), even though the same
// key is valid for inference against aiplatform.googleapis.com's project-less publisher endpoint
// (open-sse/executors/vertex.ts buildExpressGeminiUrl). Vertex AI Express mode has no public
// list-all endpoint, so this single GET against the correct service only validates the key —
// a 200 confirms the key is authorized for Vertex, and the caller-supplied (or default) curated
// Express catalog is returned rather than an unreliable live listing.
const VERTEX_EXPRESS_VALIDATION_URL =
  "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-3.7-flash";

interface VertexExpressCuratedModel {
  id: string;
  name?: string;
}

const VERTEX_EXPRESS_DEFAULT_MODELS: VertexExpressCuratedModel[] = [
  { id: "gemini-3.7-flash", name: "Gemini 3.7 Flash (Vertex)" },
  { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview (Vertex)" },
];

/**
 * Serverless chat publishers currently documented by Vertex Model Garden. The parser and executor
 * remain publisher-generic, so newly returned model versions need no source change.
 */
export const VERTEX_MODEL_GARDEN_PUBLISHERS = [
  "google",
  "anthropic",
  "xai",
  "mistralai",
  "meta",
  "deepseek-ai",
  "qwen",
  "moonshotai",
  "minimaxai",
  "openai",
  "zai-org",
] as const;

export type VertexModelDiscoveryFetch = (url: string, init: RequestInit) => Promise<Response>;

export interface VertexModelDiscoveryResult {
  models: unknown[];
  warning?: string;
  projectId?: string;
  failureStatus?: number;
  unavailable?: boolean;
}

interface DiscoveryAuth {
  headers: Record<string, string>;
}

function asObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function mergeDiscoveryModelsById(models: unknown[]): unknown[] {
  const merged = new Map<string, Record<string, unknown>>();
  const unkeyed: unknown[] = [];

  for (const candidate of models) {
    const model = asObject(candidate);
    if (!model) {
      unkeyed.push(candidate);
      continue;
    }
    const id = typeof model.id === "string" ? model.id : null;
    if (!id) {
      unkeyed.push(candidate);
      continue;
    }
    const existing = merged.get(id);
    // Earlier sources have higher precedence. The Generative Language API is queried before the
    // publisher catalog, so its structured token limits survive while publisher transport fields
    // fill gaps.
    merged.set(id, existing ? { ...model, ...existing } : model);
  }

  return [...merged.values(), ...unkeyed];
}

function readNextPageToken(data: unknown): string | null {
  const token = asObject(data)?.nextPageToken;
  return typeof token === "string" && token.length > 0 ? token : null;
}

function readConsumerProjectId(consumer: unknown): string | null {
  if (typeof consumer !== "string") return null;
  const match = consumer.match(/^projects\/([^/]+)$/);
  return match?.[1] ?? null;
}

function readApiKeyConsumerProjectId(data: unknown): string | null {
  const details = asObject(asObject(data)?.error)?.details;
  if (!Array.isArray(details)) return null;
  for (const detail of details) {
    const projectId = readConsumerProjectId(asObject(asObject(detail)?.metadata)?.consumer);
    if (projectId) return projectId;
  }
  return null;
}

async function discoverVertexModels(options: {
  auth: DiscoveryAuth;
  fetchImpl: VertexModelDiscoveryFetch;
}): Promise<VertexModelDiscoveryResult> {
  const { auth, fetchImpl } = options;
  const models: unknown[] = [];
  let publisherFailureCount = 0;

  try {
    let pageUrl = GOOGLE_MODELS_URL;
    let pageCount = 0;
    const seenTokens = new Set<string>();

    while (pageUrl && pageCount < MAX_CATALOG_PAGES) {
      pageCount += 1;
      const response = await fetchImpl(pageUrl, { method: "GET", headers: auth.headers });
      if (!response.ok) {
        break;
      }

      const data = await response.json();
      models.push(...parseGeminiModelsList(data));
      const nextPageToken = readNextPageToken(data);
      if (!nextPageToken || seenTokens.has(nextPageToken)) break;
      seenTokens.add(nextPageToken);
      pageUrl = `${GOOGLE_MODELS_URL}&pageToken=${encodeURIComponent(nextPageToken)}`;
    }
  } catch {
    // The Generative Language models API intentionally rejects Service Accounts. Publisher
    // discovery below is independent and remains authoritative for the live partner catalog.
  }

  const publisherResults = await Promise.all(
    VERTEX_MODEL_GARDEN_PUBLISHERS.map(async (publisher) => {
      const publisherModels: unknown[] = [];
      let pageUrl =
        `https://aiplatform.googleapis.com/v1beta1/publishers/${publisher}/models` +
        `?pageSize=${VERTEX_PUBLISHER_PAGE_SIZE}`;
      let pageCount = 0;
      const seenTokens = new Set<string>();

      try {
        while (pageUrl && pageCount < MAX_CATALOG_PAGES) {
          pageCount += 1;
          const response = await fetchImpl(pageUrl, { method: "GET", headers: auth.headers });
          if (!response.ok) {
            publisherFailureCount += 1;
            break;
          }

          const data = await response.json();
          publisherModels.push(...parseVertexPublisherModels(data, publisher));
          const nextPageToken = readNextPageToken(data);
          if (!nextPageToken || seenTokens.has(nextPageToken)) break;
          seenTokens.add(nextPageToken);
          pageUrl =
            `https://aiplatform.googleapis.com/v1beta1/publishers/${publisher}/models` +
            `?pageSize=${VERTEX_PUBLISHER_PAGE_SIZE}&pageToken=${encodeURIComponent(nextPageToken)}`;
        }
      } catch {
        publisherFailureCount += 1;
      }

      return publisherModels;
    })
  );
  for (const publisherModels of publisherResults) models.push(...publisherModels);

  return {
    models: mergeDiscoveryModelsById(models),
    ...(publisherFailureCount > 0 && models.length > 0
      ? { warning: "Some Vertex catalogs were unavailable — imported available models" }
      : {}),
  };
}

/** Discover live Gemini and Model Garden catalogs with OAuth or Service Account credentials. */
export function discoverVertexModelsWithBearer(options: {
  bearerToken: string;
  fetchImpl: VertexModelDiscoveryFetch;
}): Promise<VertexModelDiscoveryResult> {
  return discoverVertexModels({
    auth: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options.bearerToken}`,
      },
    },
    fetchImpl: options.fetchImpl,
  });
}

/**
 * Discover the Gemini catalog exposed to an API key and recover its Google Cloud consumer project
 * from structured error metadata when API restrictions block models.list. Vertex Model Garden's
 * publishers.models.list rejects API-key authentication even when the same key is authorized for
 * project-scoped partner inference, so publisher discovery is deliberately Bearer-only.
 */
export async function discoverVertexModelsWithApiKey(options: {
  apiKey: string;
  fetchImpl: VertexModelDiscoveryFetch;
  curatedModels?: VertexExpressCuratedModel[];
}): Promise<VertexModelDiscoveryResult> {
  const headers = {
    "Content-Type": "application/json",
    // Keep the secret out of URLs and any URL-bearing error/log path.
    "x-goog-api-key": options.apiKey,
  };

  try {
    const response = await options.fetchImpl(VERTEX_EXPRESS_VALIDATION_URL, {
      method: "GET",
      headers,
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      const projectId = readApiKeyConsumerProjectId(data);
      return {
        models: [],
        failureStatus: response.status,
        unavailable: ![400, 401, 403].includes(response.status),
        ...(projectId ? { projectId } : {}),
      };
    }

    return {
      models: options.curatedModels?.length ? options.curatedModels : VERTEX_EXPRESS_DEFAULT_MODELS,
    };
  } catch {
    return { models: [], unavailable: true };
  }
}
