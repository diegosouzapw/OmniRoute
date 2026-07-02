import { applyEdits, modify, parse } from "jsonc-parser";

type OpenCodeConfigInput = {
  baseUrl?: string;
  apiKey?: string;
  model?: string;
  models?: string[];
  modelLabels?: Record<string, string>;
};

const OPENCODE_DEFAULT_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;

const normalizeValue = (value: unknown) =>
  String(value || "")
    .trim()
    .replace(/^\/+/, "");

const normalizeModels = (models: unknown): string[] => {
  if (!Array.isArray(models)) return [];
  return [...new Set(models.map((model) => normalizeValue(model)).filter(Boolean))];
};

const normalizeModelLabels = (labels: unknown): Record<string, string> => {
  if (!labels || typeof labels !== "object" || Array.isArray(labels)) return {};

  return Object.fromEntries(
    Object.entries(labels)
      .map(([key, value]) => [normalizeValue(key), String(value || "").trim()])
      .filter(([key, value]) => key && value)
  );
};

const getModelEntryName = (modelId: string, labels: Record<string, string>) =>
  labels[modelId] || modelId;

export const buildOpenCodeProviderConfig = ({
  baseUrl,
  apiKey,
  model,
  models,
  modelLabels,
}: OpenCodeConfigInput): Record<string, any> => {
  const normalizedBaseUrl = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");
  const normalizedModel = normalizeValue(model);
  const normalizedModels = normalizeModels(models);
  const normalizedLabels = normalizeModelLabels(modelLabels);

  const uniqueModels =
    normalizedModels.length > 0
      ? normalizedModels
      : [...new Set([normalizedModel, ...OPENCODE_DEFAULT_MODELS].filter(Boolean))];

  const modelsRecord: Record<string, { name: string }> = {};
  for (const m of uniqueModels) {
    if (m) {
      modelsRecord[m] = { name: getModelEntryName(m, normalizedLabels) };
    }
  }

  return {
    npm: "@ai-sdk/openai-compatible",
    name: "OmniRoute",
    options: {
      baseURL: normalizedBaseUrl,
      apiKey: apiKey || "sk_omniroute",
    },
    models: modelsRecord,
  };
};

export const buildOpenCodeConfigDocument = (input: OpenCodeConfigInput) => ({
  $schema: "https://opencode.ai/config.json",
  provider: {
    omniroute: buildOpenCodeProviderConfig(input),
  },
});

export const mergeOpenCodeConfig = (
  existingConfig: Record<string, any> | null | undefined,
  input: OpenCodeConfigInput
) => {
  const safeConfig =
    existingConfig && typeof existingConfig === "object" && !Array.isArray(existingConfig)
      ? existingConfig
      : {};

  return {
    ...safeConfig,
    $schema: safeConfig.$schema || "https://opencode.ai/config.json",
    provider: {
      ...((safeConfig as any).provider || {}),
      omniroute: buildOpenCodeProviderConfig(input),
    },
  };
};

export const mergeOpenCodeConfigText = (
  existingText: string | null | undefined,
  input: OpenCodeConfigInput
) => {
  const providerConfig = buildOpenCodeProviderConfig(input);
  const content = typeof existingText === "string" ? existingText : "";
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return JSON.stringify(buildOpenCodeConfigDocument(input), null, 2);
  }

  const errors: { error: number }[] = [];
  const parsed = parse(content, errors, { allowTrailingComma: true, disallowComments: false });

  if (errors.length > 0 || !parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return JSON.stringify(mergeOpenCodeConfig({}, input), null, 2);
  }

  let nextText = content;

  const schemaEdits = modify(
    nextText,
    ["$schema"],
    parsed.$schema || "https://opencode.ai/config.json",
    {
      formattingOptions: { insertSpaces: true, tabSize: 2 },
    }
  );
  nextText = applyEdits(nextText, schemaEdits);

  const providerEdits = modify(nextText, ["provider", "omniroute"], providerConfig, {
    formattingOptions: { insertSpaces: true, tabSize: 2 },
  });

  return applyEdits(nextText, providerEdits);
};
