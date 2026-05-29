/**
 * Moderation Provider Registry
 *
 * Defines providers that support the /v1/moderations endpoint.
 * Follows OpenAI's moderation API format.
 */

let _MODERATION_PROVIDERS: Record<string, any> | null = null;

function getOrCreateModerationProviders(): Record<string, any> {
  if (!_MODERATION_PROVIDERS) {
    _MODERATION_PROVIDERS = {
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
  }
  return _MODERATION_PROVIDERS;
}

export const MODERATION_PROVIDERS = new Proxy({} as Record<string, any>, {
  get(target, key: string) {
    if (key in target) {
      return target[key];
    }
    return getOrCreateModerationProviders()[key];
  },
  set(target, key: string, value) {
    target[key] = value;
    getOrCreateModerationProviders()[key] = value;
    return true;
  },
  deleteProperty(target, key: string) {
    delete target[key];
    delete getOrCreateModerationProviders()[key];
    return true;
  },
  ownKeys(target) {
    const targetKeys = Reflect.ownKeys(target);
    const registryKeys = Reflect.ownKeys(getOrCreateModerationProviders());
    return Array.from(new Set([...targetKeys, ...registryKeys]));
  },
  has(target, key) {
    return key in target || key in getOrCreateModerationProviders();
  },
  getOwnPropertyDescriptor(target, key) {
    if (key in target) {
      return Reflect.getOwnPropertyDescriptor(target, key);
    }
    if (key in getOrCreateModerationProviders()) {
      return { configurable: true, enumerable: true, value: getOrCreateModerationProviders()[key as string] };
    }
    return undefined;
  },
});

export function getModerationProviders(): Record<string, any> {
  return MODERATION_PROVIDERS;
}

export function getModerationProvider(providerId) {
  return MODERATION_PROVIDERS[providerId] || null;
}

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
