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
}

export interface ParsedOcrModel {
  provider: string | null;
  model: string | null;
}

export const OCR_PROVIDERS: Record<string, OcrProvider> = {
  mistral: {
    id: "mistral",
    baseUrl: "https://api.mistral.ai/v1/ocr",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "mistral-ocr-latest", name: "Mistral OCR" }],
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
  if (!modelStr) return { provider: null, model: null };

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
