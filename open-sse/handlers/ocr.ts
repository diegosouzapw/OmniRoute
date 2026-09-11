import { CORS_HEADERS } from "../utils/cors.ts";
/**
 * OCR Handler
 *
 * Handles POST /v1/ocr (Mistral OCR API format).
 */

import {
  getOcrProvider,
  getOcrTransformation,
  parseOcrModel,
  OCR_PROVIDERS,
} from "../config/ocrRegistry.ts";
import { errorResponse, sanitizeErrorMessage } from "../utils/error.ts";
import { buildSanitizedUpstreamErrorResponse } from "../utils/upstreamErrorResponse.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import {
  getAccessToken,
  looksLikeServiceAccountJson,
  parseSAFromApiKey,
} from "../executors/vertex.ts";

const OCR_POLL_MAX_ATTEMPTS = 30;
const OCR_POLL_INTERVAL_MS = 1000;

const defaultSleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const VERTEX_DEEPSEEK_OCR_PROVIDER_ID = "vertex-deepseek-ocr";
const VERTEX_OCR_DEFAULT_REGION = "us-central1";

/**
 * Resolve the Vertex AI project id backing a vertex-deepseek-ocr connection: an explicit
 * providerSpecificData.project always wins; otherwise fall back to the project_id embedded in
 * the Service Account JSON credential (the same source VertexExecutor.buildUrl uses for the
 * chat/image pipeline — open-sse/executors/vertex.ts). Returns null when neither is available.
 * Kept in this handler (rather than the route) because routes may not import executors
 * directly (see EXECUTOR_IMPORT_RESTRICTION in eslint.config.mjs) — this stays behind the
 * open-sse handler boundary and is re-exported for the route to call.
 */
function resolveVertexOcrProject(credentials: {
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
}): string | null {
  const explicitProject = credentials.providerSpecificData?.project;
  if (typeof explicitProject === "string" && explicitProject.trim()) return explicitProject;
  if (credentials.apiKey && looksLikeServiceAccountJson(credentials.apiKey)) {
    try {
      const projectId = parseSAFromApiKey(credentials.apiKey).project_id;
      return typeof projectId === "string" && projectId.trim() ? projectId : null;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Builds the full Vertex AI DeepSeek OCR endpoint URL (the generic Vertex
 * "openapi/chat/completions" partner endpoint — see VERTEX_DEEPSEEK_TRANSFORMATION in
 * open-sse/config/ocrRegistry.ts) from the resolved project + region, or null when the
 * project cannot be resolved (handleOcr then surfaces the standard "No base URL configured"
 * error, since OCR_PROVIDERS["vertex-deepseek-ocr"].baseUrl is intentionally empty).
 */
export function resolveVertexOcrBaseUrl(credentials: {
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
}): string | null {
  const project = resolveVertexOcrProject(credentials);
  if (!project) return null;
  const region = credentials.providerSpecificData?.region;
  const resolvedRegion =
    typeof region === "string" && region.trim() ? region : VERTEX_OCR_DEFAULT_REGION;
  return `https://aiplatform.googleapis.com/v1/projects/${project}/locations/${resolvedRegion}/endpoints/openapi/chat/completions`;
}

/**
 * Mint a short-lived Vertex AI OAuth access token for vertex-deepseek-ocr connections that
 * authenticate with a Service Account JSON credential, reusing the exact JWT-bearer exchange
 * the chat/image executor already uses (open-sse/executors/vertex.ts::getAccessToken) — no new
 * OAuth flow. A raw (non-JSON) apiKey is treated as an already-minted OAuth access token and
 * used as-is (matches the Vertex provider's "Service Account JSON or OAuth access_token"
 * authHint), and an existing credentials.accessToken always wins.
 */
export async function resolveVertexOcrAccessToken<
  T extends { apiKey?: string; accessToken?: string },
>(providerId: string, credentials: T): Promise<T> {
  if (providerId !== VERTEX_DEEPSEEK_OCR_PROVIDER_ID) return credentials;
  if (credentials.accessToken || !credentials.apiKey) return credentials;
  if (!looksLikeServiceAccountJson(credentials.apiKey)) return credentials;
  const accessToken = await getAccessToken(parseSAFromApiKey(credentials.apiKey));
  return { ...credentials, accessToken };
}

/**
 * Handle OCR request
 *
 * Dispatches to the per-provider transformation (see `open-sse/config/ocrRegistry.ts`)
 * to build the upstream request, then (for async providers like Azure Document
 * Intelligence) polls the returned operation URL until it succeeds or fails,
 * before normalizing the response into the Mistral OCR shape.
 *
 * @param {Object} options
 * @param {Object} options.body - JSON body { model, document }
 * @param {Object} options.credentials - Provider credentials { apiKey, accessToken, baseUrl }
 * @param {Function} [options.fetchImpl] - DI hook for tests; defaults to global fetch
 * @param {Function} [options.sleepImpl] - DI hook for tests; defaults to a real setTimeout-based sleep
 * @returns {Response}
 */
/** @returns {Promise<unknown>} */
export async function handleOcr({
  body,
  credentials,
  fetchImpl = fetch,
  sleepImpl = defaultSleep,
}) {
  const startTime = Date.now();
  if (!body.document) {
    return errorResponse(400, "document is required");
  }

  // Default to latest OCR model
  const model = body.model || "mistral-ocr-latest";
  const { provider: providerId, model: modelId } = parseOcrModel(model);
  const providerConfig = providerId ? getOcrProvider(providerId) : null;

  if (!providerConfig) {
    return errorResponse(
      400,
      `No OCR provider found for model "${model}". Available: ${Object.keys(OCR_PROVIDERS).join(", ")}`
    );
  }

  // accessToken wins when both are present: providers like vertex-deepseek-ocr resolve a
  // short-lived OAuth token from a Service Account JSON apiKey (see resolveVertexOcrAccessToken
  // in src/app/api/v1/ocr/route.ts) while keeping the original apiKey around for other
  // resolution steps (e.g. deriving the project id) — the minted token must be the one sent.
  const token = credentials?.accessToken || credentials?.apiKey;
  if (!token) {
    return errorResponse(401, `No credentials for OCR provider: ${providerId}`);
  }

  const baseUrl = credentials?.baseUrl || providerConfig.baseUrl;
  if (!baseUrl) {
    return errorResponse(400, `No base URL configured for OCR provider: ${providerId}`);
  }

  try {
    const transformation = getOcrTransformation(providerId);
    const { url, init } = transformation.buildRequest({ baseUrl, token, body, modelId });
    const res = await fetchImpl(url, init);

    if (!res.ok) {
      const errText = await res.text();
      return buildSanitizedUpstreamErrorResponse({
        status: res.status,
        rawBody: errText,
        fallbackMessage: `OCR provider returned HTTP ${res.status}`,
        headers: CORS_HEADERS,
      });
    }

    const pollUrl = transformation.pollUrl?.(res) ?? null;
    let data: unknown;
    if (pollUrl) {
      const authHeader = buildAuthHeader(providerConfig.authHeader, token);
      data = await pollOcrOperation({ pollUrl, authHeader, fetchImpl, sleepImpl });
      if (data instanceof Response) return data;
    } else {
      data = await res.json();
    }

    const parsed = transformation.parseResponse(data);
    const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
    attachOmniRouteMetaHeaders(headers, {
      provider: providerId,
      model: modelId,
      costUsd: 0,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
    return new Response(JSON.stringify(parsed), { status: 200, headers });
  } catch (err) {
    const safeErrorMessage = sanitizeErrorMessage(err).trim() || "OCR request failed";
    console.error("[OCR]", safeErrorMessage);
    return errorResponse(500, "OCR request failed");
  }
}

/**
 * Build the same auth header used for the initial upstream request, so the
 * poll GET (e.g. Azure Document Intelligence's Operation-Location) authenticates
 * identically.
 */
function buildAuthHeader(authHeader: string, token: string): Record<string, string> {
  if (authHeader === "bearer") {
    return { Authorization: `Bearer ${token}` };
  }
  return { [authHeader]: token };
}

/**
 * Poll an async OCR operation (Azure Document Intelligence) until it succeeds or fails.
 *
 * @returns {Promise<unknown|Response>} the parsed JSON body on success, or an error Response
 */
async function pollOcrOperation({ pollUrl, authHeader, fetchImpl, sleepImpl }) {
  for (let attempt = 0; attempt < OCR_POLL_MAX_ATTEMPTS; attempt++) {
    await sleepImpl(OCR_POLL_INTERVAL_MS);
    const pollRes = await fetchImpl(pollUrl, {
      method: "GET",
      headers: authHeader,
    });
    if (!pollRes.ok) {
      console.error("[OCR] poll error", pollRes.status);
      return errorResponse(502, "OCR analysis failed");
    }
    const json = await pollRes.json();
    if (json.status === "succeeded") {
      return json;
    }
    if (json.status === "failed") {
      return errorResponse(502, "OCR analysis failed");
    }
  }
  return errorResponse(504, "OCR analysis timed out");
}
