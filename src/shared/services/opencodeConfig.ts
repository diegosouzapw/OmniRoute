import { applyEdits, modify, parse, printParseErrorCode, type ParseError } from "jsonc-parser";

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

  const modelsRecord: Record<
    string,
    { name: string; limit: { context: number; output: number } }
  > = {};
  for (const m of uniqueModels) {
    if (m) {
      modelsRecord[m] = {
        name: getModelEntryName(m, normalizedLabels),
        limit: {
          context: 128_000,
          output: 8_192,
        },
      };
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

export const buildOpenCodeV2ProviderConfig = (
  input: OpenCodeConfigInput
): Record<string, any> => {
  const v1Config = buildOpenCodeProviderConfig(input);
  return {
    name: v1Config.name,
    package: "@opencode-ai/ai/providers/openai-compatible",
    settings: {
      baseURL: v1Config.options.baseURL,
      apiKey: v1Config.options.apiKey,
    },
    models: v1Config.models,
  };
};

export const buildOpenCodeConfigDocument = (input: OpenCodeConfigInput) => ({
  $schema: "https://opencode.ai/config.json",
  provider: {
    omniroute: buildOpenCodeProviderConfig(input),
  },
  providers: {
    omniroute: buildOpenCodeV2ProviderConfig(input),
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

  const existingProvider = (safeConfig as Record<string, unknown>).provider;
  const safeProvider =
    existingProvider && typeof existingProvider === "object" && !Array.isArray(existingProvider)
      ? (existingProvider as Record<string, unknown>)
      : {};

  const existingProviders = (safeConfig as Record<string, unknown>).providers;
  const safeProviders =
    existingProviders && typeof existingProviders === "object" && !Array.isArray(existingProviders)
      ? (existingProviders as Record<string, unknown>)
      : {};

  return {
    ...safeConfig,
    $schema: safeConfig.$schema || "https://opencode.ai/config.json",
    provider: {
      ...safeProvider,
      omniroute: buildOpenCodeProviderConfig(input),
    },
    providers: {
      ...safeProviders,
      omniroute: buildOpenCodeV2ProviderConfig(input),
    },
  };
};

export const mergeOpenCodeConfigText = (
  existingText: string | null | undefined,
  input: OpenCodeConfigInput
) => {
  const providerConfig = buildOpenCodeProviderConfig(input);
  const v2ProviderConfig = buildOpenCodeV2ProviderConfig(input);
  const content = typeof existingText === "string" ? existingText : "";
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return JSON.stringify(buildOpenCodeConfigDocument(input), null, 2);
  }

  const errors: ParseError[] = [];
  const parsed = parse(content, errors, { allowTrailingComma: true, disallowComments: false });

  if (errors.length > 0 || !parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    const detail = errors[0]
      ? `${printParseErrorCode(errors[0].error)} at offset ${errors[0].offset}`
      : "root must be an object";
    throw new Error(
      `Existing OpenCode config is invalid JSONC (${detail}); refusing to overwrite it.`
    );
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
  nextText = applyEdits(nextText, providerEdits);

  const v2ProviderEdits = modify(nextText, ["providers", "omniroute"], v2ProviderConfig, {
    formattingOptions: { insertSpaces: true, tabSize: 2 },
  });

  return applyEdits(nextText, v2ProviderEdits);
};
