import { CORS_HEADERS } from "../utils/cors.ts";
/**
 * OCR Handler
 *
 * Handles POST /v1/ocr (Mistral OCR API format).
 */

import { getOcrProvider, parseOcrModel } from "../config/ocrRegistry.ts";
import { errorResponse } from "../utils/error.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";

/**
 * Handle OCR request
 *
 * @param {Object} options
 * @param {Object} options.body - JSON body { model, document }
 * @param {Object} options.credentials - Provider credentials { apiKey }
 * @returns {Response}
 */
/** @returns {Promise<unknown>} */
export async function handleOcr({ body, credentials }) {
  const startTime = Date.now();
  if (!body.document) {
    return errorResponse(400, "document is required");
  }

  // Default to latest OCR model
  const model = body.model || "mistral-ocr-latest";
  const { provider: providerId, model: modelId } = parseOcrModel(model);
  const providerConfig = providerId ? getOcrProvider(providerId) : null;

  if (!providerConfig) {
    return errorResponse(400, `No OCR provider found for model "${model}". Available: mistral`);
  }

  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) {
    return errorResponse(401, `No credentials for OCR provider: ${providerId}`);
  }

  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...body,
        model: modelId,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(errText, {
        status: res.status,
        headers: {
          "Content-Type": "application/json",
          ...CORS_HEADERS,
        },
      });
    }

    const data = await res.json();
    const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
    attachOmniRouteMetaHeaders(headers, {
      provider: providerId,
      model: modelId,
      costUsd: 0,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
    return new Response(JSON.stringify(data), { status: 200, headers });
  } catch (err) {
    return errorResponse(500, `OCR request failed: ${err.message}`);
  }
}
