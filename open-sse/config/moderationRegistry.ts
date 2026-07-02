/**
 * Moderation Provider Registry
 *
 * Defines providers that support the /v1/moderations endpoint.
 * Follows OpenAI's moderation API format.
 */

export interface ModerationModel {
  id: string;
  name: string;
}

export interface ModerationProvider {
  id: string;
  baseUrl: string;
  authType: string;
  authHeader: string;
  models: ModerationModel[];
}

export interface ParsedModerationModel {
  provider: string | null;
  model: string | null;
}

export const MODERATION_PROVIDERS: Record<string, ModerationProvider> = {
  openai: {
    id: "openai",
    baseUrl: "https://api.openai.com/v1/moderations",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "omni-moderation-latest", name: "Omni Moderation Latest" },
      { id: "text-moderation-latest", name: "Text Moderation Latest" },
    ],
  },
  mistral: {
    id: "mistral",
    baseUrl: "https://api.mistral.ai/v1/moderations",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "mistral-moderation-latest", name: "Mistral Moderation" }],
  },
};

/**
 * Get moderation provider config by ID.
 */
export function getModerationProvider(providerId: string): ModerationProvider | null {
  return MODERATION_PROVIDERS[providerId] || null;
}

/**
 * Parse a moderation model string.
 */
export function parseModerationModel(modelStr: string | null | undefined): ParsedModerationModel {
  if (!modelStr) return { provider: null, model: null };

  for (const providerId of Object.keys(MODERATION_PROVIDERS)) {
    if (modelStr.startsWith(providerId + "/")) {
      return { provider: providerId, model: modelStr.slice(providerId.length + 1) };
    }
  }

  for (const [providerId, config] of Object.entries(MODERATION_PROVIDERS)) {
    if (config.models.some((m) => m.id === modelStr)) {
      return { provider: providerId, model: modelStr };
    }
  }

  return { provider: null, model: modelStr };
}

/**
 * Get all moderation models as a flat list.
 */
export function getAllModerationModels(): Array<{ id: string; name: string; provider: string }> {
  const models: Array<{ id: string; name: string; provider: string }> = [];
  for (const [providerId, config] of Object.entries(MODERATION_PROVIDERS)) {
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
