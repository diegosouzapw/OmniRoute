/**
 * Shared Registry Utilities
 *
 * Common interfaces and helpers used by all provider registries
 * (audio, image, video, music). Extracts duplicated patterns into
 * reusable functions.
 */

export interface BaseModel {
  id: string;
  name: string;
}

export interface BaseProvider<M extends BaseModel = BaseModel> {
  id: string;
  baseUrl: string;
  authType: string; // "apikey" | "oauth" | "none"
  authHeader: string; // "bearer" | "token" | "xi-api-key" | "x-api-key" | "none"
  format?: string;
  models: M[];
}

/**
 * Parse a "provider/model" string against a registry.
 * Supports both "provider/model" prefix and bare "model" lookup.
 */
export function parseModelFromRegistry<P extends BaseProvider>(
  modelStr: string | null,
  registry: Record<string, P>
): { provider: string | null; model: string | null } {
  if (!modelStr) return { provider: null, model: null };

  // Try each provider prefix
  for (const [providerId] of Object.entries(registry)) {
    if (modelStr.startsWith(providerId + "/")) {
      return { provider: providerId, model: modelStr.slice(providerId.length + 1) };
    }
  }

  // No provider prefix — try to find the model in any provider
  for (const [providerId, config] of Object.entries(registry)) {
    if (config.models.some((m) => m.id === modelStr)) {
      return { provider: providerId, model: modelStr };
    }
  }

  return { provider: null, model: modelStr };
}

/**
 * Flatten all models from a registry into a list with provider info.
 * Optionally merge extra fields per provider via the `extra` callback.
 */
export function getAllModelsFromRegistry<P extends BaseProvider>(
  registry: Record<string, P>,
  extra?: (providerId: string, config: P) => Record<string, any>
): Array<{ id: string; name: string; provider: string } & Record<string, any>> {
  const models: Array<{ id: string; name: string; provider: string } & Record<string, any>> = [];

  for (const [providerId, config] of Object.entries(registry)) {
    const extraFields = extra ? extra(providerId, config) : {};
    for (const model of config.models) {
      models.push({
        id: `${providerId}/${model.id}`,
        name: model.name,
        provider: providerId,
        ...extraFields,
      });
    }
  }

  return models;
}

/**
 * Build auth headers for a provider.
 * Handles bearer, token, xi-api-key, x-api-key, and none.
 */
export function buildAuthHeaders(
  provider: BaseProvider,
  token: string | null
): Record<string, string> {
  if (provider.authType === "none" || provider.authHeader === "none" || !token) {
    return {};
  }

  switch (provider.authHeader) {
    case "token":
      return { Authorization: `Token ${token}` };
    case "xi-api-key":
      return { "xi-api-key": token };
    case "x-api-key":
      return { "x-api-key": token };
    case "bearer":
    default:
      return { Authorization: `Bearer ${token}` };
  }
}
