/**
 * TypeSafe System One model catalog.
 *
 * Jev is not a chat model. GET /v1/models lists the aliases; versioned
 * `jev-*` ids are accepted by POST /v1/systemone even when omitted here.
 */

export interface SystemoneModel {
  id: string;
  name: string;
}

export interface SystemoneProvider {
  id: string;
  alias?: string;
  baseUrl: string;
  authType: string;
  authHeader: string;
  models: SystemoneModel[];
}

export const SYSTEMONE_PROVIDERS: Record<string, SystemoneProvider> = {
  typesafe: {
    id: "typesafe",
    alias: "typesafe",
    baseUrl: "https://api.typesafe.ai/v1/systemone",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "jev-latest", name: "Jev (latest stable)" },
      { id: "jev-preview", name: "Jev (preview)" },
    ],
  },
};

export function getSystemoneProvider(providerId: string): SystemoneProvider | null {
  return SYSTEMONE_PROVIDERS[providerId] || null;
}

export function getAllSystemoneModels(): Array<{
  id: string;
  name: string;
  provider: string;
}> {
  const models: Array<{ id: string; name: string; provider: string }> = [];
  for (const [providerId, config] of Object.entries(SYSTEMONE_PROVIDERS)) {
    const prefixes = [providerId, config.alias].filter(
      (prefix): prefix is string => typeof prefix === "string" && prefix.length > 0
    );
    const uniquePrefixes = [...new Set(prefixes)];
    for (const model of config.models) {
      for (const prefix of uniquePrefixes) {
        models.push({
          id: `${prefix}/${model.id}`,
          name: model.name,
          provider: providerId,
        });
      }
    }
  }
  return models;
}
