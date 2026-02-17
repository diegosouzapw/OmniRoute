/**
 * Moderation Provider Registry
 *
 * Defines providers that support the /v1/moderations endpoint.
 * Follows OpenAI's moderation API format.
 */

export const MODERATION_PROVIDERS = {
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
};

/**
 * Get moderation provider config by ID
 */
export function getModerationProvider(providerId) {
  return MODERATION_PROVIDERS[providerId] || null;
}

/**
 * Parse moderation model string
 */
export function parseModerationModel(modelStr) {
  if (!modelStr) return { provider: null, model: null };

  for (const [providerId, config] of Object.entries(MODERATION_PROVIDERS)) {
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
 * Get all moderation models as a flat list
 */
export function getAllModerationModels() {
  const models = [];
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
