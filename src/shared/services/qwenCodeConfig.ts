type JsonRecord = Record<string, unknown>;

export const QWEN_CODE_ENV_KEY = "OMNIROUTE_API_KEY";

const LEGACY_ENV_KEYS = new Set(["OPENAI_API_KEY", "ANTHROPIC_API_KEY", "GEMINI_API_KEY"]);

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const cloneRecord = (value: unknown): JsonRecord => (isRecord(value) ? { ...value } : {});

export const normalizeQwenCodeBaseUrl = (value: unknown): string => {
  const baseUrl = String(value || "")
    .trim()
    .replace(/\/+$/, "");
  if (!baseUrl) return "";
  return baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;
};

/**
 * Identifies only entries owned by OmniRoute. Generic custom endpoints are not
 * considered managed: users can keep any other OpenAI-compatible provider.
 */
export const isManagedQwenCodeModel = (value: unknown): boolean => {
  if (!isRecord(value)) return false;
  if (value.envKey === QWEN_CODE_ENV_KEY || value.id === "omniroute") return true;

  return (
    typeof value.name === "string" &&
    value.name.endsWith(" (OmniRoute)") &&
    typeof value.envKey === "string" &&
    LEGACY_ENV_KEYS.has(value.envKey)
  );
};

const unwrapProviderModels = (value: unknown): unknown => {
  if (Array.isArray(value)) return [...value];
  if (isRecord(value) && Array.isArray(value.models)) return [...value.models];
  return value;
};

const getProviderMap = (value: unknown): JsonRecord => {
  if (Array.isArray(value)) {
    const migrated: Record<string, unknown[]> = {};
    for (const entry of value) {
      if (!isRecord(entry) || typeof entry.id !== "string") continue;
      const providerId = typeof entry.authType === "string" ? entry.authType : "openai";
      const model = { ...entry };
      delete model.authType;
      (migrated[providerId] ||= []).push(model);
    }
    return migrated;
  }
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    Object.entries(value).map(([providerId, models]) => [providerId, unwrapProviderModels(models)])
  );
};

const filterManagedModels = (value: unknown): { value: unknown; removed: JsonRecord[] } => {
  if (!Array.isArray(value)) return { value, removed: [] };

  const removed = value.filter(isManagedQwenCodeModel).filter(isRecord);
  return {
    value: value.filter((entry) => !isManagedQwenCodeModel(entry)),
    removed,
  };
};

const removeEmptyObject = (parent: JsonRecord, key: string): void => {
  if (isRecord(parent[key]) && Object.keys(parent[key]).length === 0) delete parent[key];
};

export type QwenCodeConfigInput = {
  baseUrl: string;
  model: string;
  modelName?: string;
};

export const buildQwenCodeModel = ({
  baseUrl,
  model,
  modelName,
}: QwenCodeConfigInput): JsonRecord => {
  const normalizedBaseUrl = normalizeQwenCodeBaseUrl(baseUrl);
  const normalizedModel = String(model || "").trim();
  if (!normalizedBaseUrl || !normalizedModel) {
    throw new Error("Qwen Code requires a base URL and model");
  }

  return {
    id: normalizedModel,
    name: `${String(modelName || normalizedModel).trim()} (OmniRoute)`,
    envKey: QWEN_CODE_ENV_KEY,
    baseUrl: normalizedBaseUrl,
  };
};

/**
 * Merge one OmniRoute model into Qwen Code's current V4 settings contract.
 * `modelProviders.openai` is a bare ModelConfig[] array. Other settings and
 * user-owned provider entries are preserved.
 */
export const mergeQwenCodeSettings = (
  existing: unknown,
  input: QwenCodeConfigInput
): JsonRecord => {
  const next = cloneRecord(existing);
  const modelEntry = buildQwenCodeModel(input);
  const modelProviders = getProviderMap(next.modelProviders);

  for (const [providerId, value] of Object.entries(modelProviders)) {
    const filtered = filterManagedModels(value);
    modelProviders[providerId] = filtered.value;
    if (Array.isArray(filtered.value) && filtered.value.length === 0 && providerId !== "openai") {
      delete modelProviders[providerId];
    }
  }

  const openaiModels = Array.isArray(modelProviders.openai) ? modelProviders.openai : [];
  modelProviders.openai = [...openaiModels, modelEntry];
  next.modelProviders = modelProviders;

  const security = cloneRecord(next.security);
  const auth = cloneRecord(security.auth);
  const previousAuthBaseUrl = normalizeQwenCodeBaseUrl(auth.baseUrl);
  const replacingLegacyAuth =
    auth.selectedType === "openai" && previousAuthBaseUrl === modelEntry.baseUrl;

  auth.selectedType = "openai";
  if (replacingLegacyAuth) {
    delete auth.apiKey;
    delete auth.baseUrl;
  }
  security.auth = auth;
  next.security = security;

  next.model = {
    ...cloneRecord(next.model),
    name: modelEntry.id,
    baseUrl: modelEntry.baseUrl,
  };

  if (next.selectedProvider === "omniroute") delete next.selectedProvider;

  return next;
};

export const findOmniRouteQwenCodeModel = (settings: unknown): JsonRecord | undefined => {
  if (!isRecord(settings)) return undefined;
  const providers = settings.modelProviders;
  if (Array.isArray(providers))
    return providers.find(isManagedQwenCodeModel) as JsonRecord | undefined;
  if (!isRecord(providers)) return undefined;

  for (const value of Object.values(providers)) {
    const models = unwrapProviderModels(value);
    if (!Array.isArray(models)) continue;
    const managed = models.find(isManagedQwenCodeModel);
    if (isRecord(managed)) return managed;
  }
  return undefined;
};

export const hasOmniRouteQwenCodeConfig = (settings: unknown): boolean =>
  findOmniRouteQwenCodeModel(settings) !== undefined;

/** Remove only OmniRoute-owned Qwen Code entries and selection state. */
export const removeQwenCodeSettings = (existing: unknown): JsonRecord => {
  const next = cloneRecord(existing);
  const originalProviders = next.modelProviders;
  const removed: JsonRecord[] = [];

  if (Array.isArray(originalProviders)) {
    const filtered = filterManagedModels(originalProviders);
    next.modelProviders = filtered.value;
    removed.push(...filtered.removed);
    if ((filtered.value as unknown[]).length === 0) delete next.modelProviders;
  } else if (isRecord(originalProviders)) {
    const providers = { ...originalProviders };
    for (const [providerId, rawValue] of Object.entries(providers)) {
      const unwrapped = unwrapProviderModels(rawValue);
      const filtered = filterManagedModels(unwrapped);
      removed.push(...filtered.removed);
      if (Array.isArray(filtered.value) && filtered.value.length === 0) {
        delete providers[providerId];
      } else {
        providers[providerId] = filtered.value;
      }
    }
    if (Object.keys(providers).length === 0) delete next.modelProviders;
    else next.modelProviders = providers;
  }

  const model = cloneRecord(next.model);
  const selectedMatchesRemoved = removed.some(
    (entry) =>
      entry.id === model.name &&
      (!model.baseUrl ||
        normalizeQwenCodeBaseUrl(entry.baseUrl) === normalizeQwenCodeBaseUrl(model.baseUrl))
  );

  if (selectedMatchesRemoved) {
    delete model.name;
    delete model.baseUrl;
    if (Object.keys(model).length === 0) delete next.model;
    else next.model = model;
  }

  const security = cloneRecord(next.security);
  const auth = cloneRecord(security.auth);
  const remainingOpenai = isRecord(next.modelProviders) ? next.modelProviders.openai : undefined;
  const authBaseUrl = normalizeQwenCodeBaseUrl(auth.baseUrl);
  const authMatchesRemoved = removed.some(
    (entry) => normalizeQwenCodeBaseUrl(entry.baseUrl) === authBaseUrl
  );
  if (authMatchesRemoved) {
    delete auth.apiKey;
    delete auth.baseUrl;
    if (auth.selectedType === "openai" && !Array.isArray(remainingOpenai)) {
      delete auth.selectedType;
    }
    if (Object.keys(auth).length === 0) delete security.auth;
    else security.auth = auth;
    if (Object.keys(security).length === 0) delete next.security;
    else next.security = security;
  }

  if (next.selectedProvider === "omniroute") delete next.selectedProvider;
  removeEmptyObject(next, "modelProviders");
  return next;
};

const OWNED_ENV_LINE = /^\s*(?:export\s+)?OMNIROUTE_API_KEY\s*=/;

export const mergeQwenCodeEnv = (existing: unknown, apiKey: unknown): string => {
  const lines = String(existing || "")
    .split(/\r?\n/)
    .filter((line) => !OWNED_ENV_LINE.test(line));

  while (lines.length > 0 && lines.at(-1) === "") lines.pop();
  lines.push(`${QWEN_CODE_ENV_KEY}=${JSON.stringify(String(apiKey || "sk_omniroute"))}`);
  return `${lines.join("\n")}\n`;
};

export const removeQwenCodeEnv = (existing: unknown): string => {
  const lines = String(existing || "")
    .split(/\r?\n/)
    .filter((line) => !OWNED_ENV_LINE.test(line));
  while (lines.length > 0 && lines.at(-1) === "") lines.pop();
  return lines.length > 0 ? `${lines.join("\n")}\n` : "";
};
