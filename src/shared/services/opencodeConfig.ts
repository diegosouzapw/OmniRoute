type OpenCodeConfigInput = {
  baseUrl?: string;
  apiKey?: string;
  model?: string;
};

type OpenCodeProviderConfig = {
  name: string;
  api: "openai";
  baseURL: string;
  apiKey: string;
  models: string[];
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

export const buildOpenCodeProviderConfig = ({
  baseUrl,
  apiKey,
  model,
}: OpenCodeConfigInput): OpenCodeProviderConfig => {
  const normalizedBaseUrl = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");
  const normalizedModel = normalizeValue(model);

  const uniqueModels = [...new Set([normalizedModel, ...OPENCODE_DEFAULT_MODELS].filter(Boolean))];

  return {
    name: "OmniRoute",
    api: "openai",
    baseURL: normalizedBaseUrl,
    apiKey: apiKey || "sk_omniroute",
    models: uniqueModels,
  };
};

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
    providers: {
      ...((safeConfig as any).providers || {}),
      omniroute: buildOpenCodeProviderConfig(input),
    },
  };
};
