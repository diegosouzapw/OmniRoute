export interface CustomCliAliasMapping {
  alias: string;
  model: string;
}

export interface CustomCliConfigInput {
  cliName: string;
  baseUrl: string;
  apiKey: string;
  defaultModel?: string;
  aliasMappings?: CustomCliAliasMapping[];
}

export function normalizeOpenAiBaseUrl(baseUrl: string): string {
  const trimmed = (baseUrl || "http://localhost:20128").trim().replace(/\/+$/, "");
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}

export function slugifyCliCommand(cliName: string): string {
  const normalized = cliName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "my-cli";
}

export function buildAliasEnvVar(alias: string): string | null {
  const normalized = alias
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();

  if (!normalized) return null;
  return `OMNIROUTE_MODEL_${normalized}`;
}

function getValidMappings(aliasMappings: CustomCliAliasMapping[] = []): CustomCliAliasMapping[] {
  return aliasMappings.filter(
    (mapping) => mapping.alias.trim().length > 0 && mapping.model.trim().length > 0
  );
}

export function buildCustomCliEnvScript({
  cliName,
  baseUrl,
  apiKey,
  defaultModel = "",
  aliasMappings = [],
}: CustomCliConfigInput): string {
  const normalizedBaseUrl = normalizeOpenAiBaseUrl(baseUrl);
  const resolvedName = cliName.trim() || "Custom CLI";
  const resolvedCommand = slugifyCliCommand(resolvedName);
  const resolvedDefaultModel = defaultModel.trim();
  const mappings = getValidMappings(aliasMappings);

  const lines = [
    `# ${resolvedName} -> OmniRoute (OpenAI-compatible)`,
    `export OPENAI_BASE_URL="${normalizedBaseUrl}"`,
    `export OPENAI_API_KEY="${apiKey}"`,
  ];

  if (resolvedDefaultModel) {
    lines.push(`export OPENAI_MODEL="${resolvedDefaultModel}"`);
  }

  if (mappings.length > 0) {
    lines.push("", "# Optional alias mappings for wrapper scripts");
    mappings.forEach((mapping) => {
      const envVar = buildAliasEnvVar(mapping.alias);
      if (!envVar) return;
      lines.push(`export ${envVar}="${mapping.model.trim()}"`);
    });
  }

  lines.push("", "# Raw chat completions endpoint", `# ${normalizedBaseUrl}/chat/completions`, "");

  const exampleCommand = [
    resolvedCommand,
    '--base-url "$OPENAI_BASE_URL"',
    '--api-key "$OPENAI_API_KEY"',
    resolvedDefaultModel ? '--model "$OPENAI_MODEL"' : "",
  ]
    .filter(Boolean)
    .join(" ");

  lines.push("# Example invocation", exampleCommand);

  const firstAliasEnv = buildAliasEnvVar(mappings[0]?.alias ?? "");
  if (firstAliasEnv) {
    lines.push(`# Alias example: ${resolvedCommand} --model "\${${firstAliasEnv}:-$OPENAI_MODEL}"`);
  }

  return lines.join("\n");
}

export function buildCustomCliJsonConfig({
  cliName,
  baseUrl,
  apiKey,
  defaultModel = "",
  aliasMappings = [],
}: CustomCliConfigInput): string {
  const normalizedBaseUrl = normalizeOpenAiBaseUrl(baseUrl);
  const resolvedName = cliName.trim() || "Custom CLI";
  const resolvedDefaultModel = defaultModel.trim();
  const mappings = getValidMappings(aliasMappings);

  const config = {
    name: resolvedName,
    provider: {
      type: "openai",
      baseURL: normalizedBaseUrl,
      apiKey,
      ...(resolvedDefaultModel ? { model: resolvedDefaultModel } : {}),
    },
    ...(mappings.length > 0
      ? {
          modelAliases: Object.fromEntries(
            mappings.map((mapping) => [mapping.alias.trim(), mapping.model.trim()])
          ),
        }
      : {}),
  };

  return JSON.stringify(config, null, 2);
}
