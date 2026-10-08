import { hasUnsafeModelIdSyntax } from "../utils/modelIdSafety.ts";

/**
 * OCR Provider Registry
 *
 * Defines providers that support the /v1/ocr endpoint.
 * Follows Mistral's OCR API format.
 */

export interface OcrModel {
  id: string;
  name: string;
}

export interface OcrProvider {
  id: string;
  baseUrl: string;
  authType: string;
  authHeader: string;
  models: OcrModel[];
  transformation?: OcrTransformation;
}

export interface ParsedOcrModel {
  provider: string | null;
  model: string | null;
}

export interface OcrResponseShape {
  pages: Array<{ index: number; markdown: string }>;
  model: string;
  usage_info?: Record<string, unknown>;
}

export interface OcrTransformation {
  buildRequest(args: {
    baseUrl: string;
    token: string;
    body: Record<string, unknown>;
    modelId: string;
  }): { url: string; init: RequestInit };
  parseResponse(raw: unknown): OcrResponseShape;
  /** Async providers (Azure DI): return the poll URL from the first response, else null. */
  pollUrl?(res: Response): string | null;
}

export const MISTRAL_PASSTHROUGH: OcrTransformation = {
  buildRequest({ baseUrl, token, body, modelId }) {
    return {
      url: baseUrl,
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...body, model: modelId }),
      },
    };
  },
  parseResponse(raw) {
    return raw as OcrResponseShape;
  },
};

export function getOcrTransformation(providerId: string): OcrTransformation {
  return OCR_PROVIDERS[providerId]?.transformation ?? MISTRAL_PASSTHROUGH;
}

const AZURE_DI_API_VERSION = "2024-11-30";

function azureDiSource(document: Record<string, unknown> | undefined): Record<string, string> {
  if (!document) return {};
  const url = String(document.document_url ?? document.image_url ?? "");
  if (url.startsWith("data:")) {
    const comma = url.indexOf(",");
    return { base64Source: comma >= 0 ? url.slice(comma + 1) : "" };
  }
  return url ? { urlSource: url } : {};
}

export const AZURE_DI_TRANSFORMATION: OcrTransformation = {
  buildRequest({ baseUrl, token, body, modelId }) {
    const root = baseUrl.replace(/\/+$/, "");
    return {
      url: `${root}/documentintelligence/documentModels/${modelId}:analyze?api-version=${AZURE_DI_API_VERSION}&outputContentFormat=markdown`,
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json", "Ocp-Apim-Subscription-Key": token },
        body: JSON.stringify(azureDiSource(body.document as Record<string, unknown>)),
      },
    };
  },
  pollUrl(res) {
    return res.headers.get("Operation-Location");
  },
  parseResponse(raw) {
    const r = raw as {
      analyzeResult?: { content?: string; pages?: unknown[] };
    };
    const pageCount = r.analyzeResult?.pages?.length ?? 1;
    // Azure returns the whole-document markdown in `content`; we mirror it into the
    // Mistral shape as a single aggregated "page" (index 0), preserving pageCount.
    return {
      pages: [{ index: 0, markdown: r.analyzeResult?.content ?? "" }],
      model: "prebuilt-read",
      usage_info: { pages_processed: pageCount },
    };
  },
};

/**
 * Vertex AI DeepSeek OCR (deepseek-ai/deepseek-ocr-maas), served through Vertex's generic
 * OpenAI-compatible partner endpoint ("openapi/chat/completions"). Modeled on litellm's
 * VertexAIDeepSeekOCRConfig (litellm/llms/vertex_ai/ocr/deepseek_transformation.py):
 *   - request: OpenAI chat-completions shape, model prefixed with "deepseek-ai/", the OCR
 *     document sent as a single image_url content part (document_url documents are mapped to
 *     the same image_url shape — Vertex accepts both gs:// and https:// URLs there).
 *   - response: an OpenAI chat-completions body whose choices[0].message.content is either a
 *     JSON string already in the canonical {pages,model,usage_info} shape, or plain markdown
 *     text — both are normalized into OcrResponseShape.
 *
 * The full project/location endpoint URL is resolved into credentials.baseUrl upstream (see
 * resolveOcrCredentials in src/app/api/v1/ocr/route.ts, the same pattern Azure DI uses for its
 * resource endpoint) — buildRequest treats baseUrl as the complete URL, exactly like Mistral.
 */
function vertexDeepseekOcrContent(document: Record<string, unknown> | undefined): {
  type: string;
  image_url: string;
} {
  const url = String(document?.document_url ?? document?.image_url ?? "");
  return { type: "image_url", image_url: url };
}

export const VERTEX_DEEPSEEK_TRANSFORMATION: OcrTransformation = {
  buildRequest({ baseUrl, token, body, modelId }) {
    return {
      url: baseUrl,
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          model: `deepseek-ai/${modelId}`,
          messages: [
            {
              role: "user",
              content: [vertexDeepseekOcrContent(body.document as Record<string, unknown>)],
            },
          ],
        }),
      },
    };
  },
  parseResponse(raw) {
    const r = raw as {
      model?: string;
      choices?: Array<{ message?: { content?: unknown } }>;
      usage?: Record<string, unknown>;
    };
    const model = r.model ?? "deepseek-ocr-maas";
    const content = r.choices?.[0]?.message?.content;

    if (typeof content === "string") {
      const trimmed = content.trim();
      if (trimmed.startsWith("{")) {
        try {
          const parsed = JSON.parse(trimmed) as Partial<OcrResponseShape>;
          if (Array.isArray(parsed.pages)) {
            return {
              pages: parsed.pages,
              model: parsed.model ?? model,
              usage_info: parsed.usage_info ?? r.usage,
            };
          }
        } catch {
          // Not JSON after all — fall through and treat it as plain markdown.
        }
      }
      return { pages: [{ index: 0, markdown: content }], model, usage_info: r.usage };
    }

    return { pages: [{ index: 0, markdown: "" }], model, usage_info: r.usage };
  },
};

export const OCR_PROVIDERS: Record<string, OcrProvider> = {
  mistral: {
    id: "mistral",
    baseUrl: "https://api.mistral.ai/v1/ocr",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "mistral-ocr-latest", name: "Mistral OCR" }],
  },
  "azure-document-intelligence": {
    id: "azure-document-intelligence",
    baseUrl: "",
    authType: "apikey",
    authHeader: "Ocp-Apim-Subscription-Key",
    models: [{ id: "prebuilt-read", name: "Azure Document Intelligence (Read)" }],
    transformation: AZURE_DI_TRANSFORMATION,
  },
  "vertex-deepseek-ocr": {
    id: "vertex-deepseek-ocr",
    baseUrl: "",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "deepseek-ocr-maas", name: "DeepSeek OCR (Vertex AI MaaS)" }],
    transformation: VERTEX_DEEPSEEK_TRANSFORMATION,
  },
};

/**
 * Get OCR provider config by ID.
 */
export function getOcrProvider(providerId: string): OcrProvider | null {
  return OCR_PROVIDERS[providerId] || null;
}

/**
 * Parse an OCR model string.
 *
 * Accepts either a "provider/model" prefixed string or a bare model id that
 * matches one of the registered OCR models.
 */
export function parseOcrModel(modelStr: string | null | undefined): ParsedOcrModel {
  if (!modelStr || hasUnsafeModelIdSyntax(modelStr)) return { provider: null, model: null };

  for (const providerId of Object.keys(OCR_PROVIDERS)) {
    if (modelStr.startsWith(providerId + "/")) {
      return { provider: providerId, model: modelStr.slice(providerId.length + 1) };
    }
  }

  for (const [providerId, config] of Object.entries(OCR_PROVIDERS)) {
    if (config.models.some((m) => m.id === modelStr)) {
      return { provider: providerId, model: modelStr };
    }
  }

  return { provider: null, model: modelStr };
}

/**
 * Get all OCR models as a flat list.
 */
export function getAllOcrModels(): Array<{ id: string; name: string; provider: string }> {
  const models: Array<{ id: string; name: string; provider: string }> = [];
  for (const [providerId, config] of Object.entries(OCR_PROVIDERS)) {
    for (const model of config.models) {
      models.push({
        id: `${providerId}/${model.id}`,
        name: model.name,
        provider: providerId,
      });
    }
  }
  return models;
}
