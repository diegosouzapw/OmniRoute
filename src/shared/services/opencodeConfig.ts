import { applyEdits, modify, parse, printParseErrorCode, type ParseError } from "jsonc-parser";

type OpenCodeCatalogModel = {
  id: string;
  context_length?: number;
  max_context_window_tokens?: number;
  max_output_tokens?: number;
  capabilities?: {
    attachment?: boolean;
    reasoning?: boolean;
    temperature?: boolean;
    tool_calling?: boolean;
    vision?: boolean;
  };
  input_modalities?: string[];
};

type OpenCodeConfigInput = {
  baseUrl?: string;
  apiKey?: string;
  model?: string;
  models?: string[];
  modelLabels?: Record<string, string>;
  /** Live catalog entries. Unknown models keep the documented 128K/8K default. */
  catalog?: OpenCodeCatalogModel[];
};

/**
 * Documented fallback when the catalog has no usable window for a model.
 * Same numbers the CLI writer emits (#11035, #10940) — never a silent
 * substitute for a catalog value the writer simply ignored.
 */
const DOCUMENTED_DEFAULT_LIMIT = { context: 128_000, output: 8_192 } as const;

const positiveNumber = (value: unknown): number | undefined =>
  typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;

const resolveCatalogLimit = (entry: OpenCodeCatalogModel | undefined) => {
  const context =
    positiveNumber(entry?.context_length) ??
    positiveNumber(entry?.max_context_window_tokens) ??
    DOCUMENTED_DEFAULT_LIMIT.context;
  const output = positiveNumber(entry?.max_output_tokens) ?? DOCUMENTED_DEFAULT_LIMIT.output;
  return { context, output };
};

const resolveCatalogFlags = (entry: OpenCodeCatalogModel | undefined) => {
  const flags: {
    attachment?: boolean;
    reasoning?: boolean;
    temperature?: boolean;
    tool_call?: boolean;
  } = {};
  const caps = entry?.capabilities;
  if (!caps) return flags;

  if (typeof caps.attachment === "boolean") flags.attachment = caps.attachment;
  else if (caps.vision === true) flags.attachment = true;
  else if (Array.isArray(entry?.input_modalities) && entry.input_modalities.includes("image")) {
    flags.attachment = true;
  }
  if (caps.reasoning === true) flags.reasoning = true;
  if (caps.temperature === true) flags.temperature = true;
  if (caps.tool_calling === true) flags.tool_call = true;
  return flags;
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
  catalog,
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

  const catalogById = new Map(
    (Array.isArray(catalog) ? catalog : [])
      .filter((entry) => entry && typeof entry.id === "string" && entry.id.trim())
      .map((entry) => [entry.id.trim(), entry])
  );

  const modelsRecord: Record<string, Record<string, unknown>> = {};
  for (const m of uniqueModels) {
    if (m) {
      modelsRecord[m] = {
        name: getModelEntryName(m, normalizedLabels),
        ...resolveCatalogFlags(catalogById.get(m)),
        limit: resolveCatalogLimit(catalogById.get(m)),
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

export const buildOpenCodeV2ProviderConfig = (input: OpenCodeConfigInput): Record<string, any> => {
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
