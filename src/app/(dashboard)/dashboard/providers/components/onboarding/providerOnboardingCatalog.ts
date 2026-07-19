import {
  APIKEY_PROVIDERS,
  FREE_PROVIDERS,
  OAUTH_PROVIDERS,
  providerAllowsOptionalApiKey,
  supportsApiKeyOnFreeProvider,
} from "@/shared/constants/providers";

export type WizardProviderAuthKind = "apikey" | "oauth";

export type WizardProviderDefinition = {
  id: string;
  name?: string;
  icon?: string;
  color?: string;
  alias?: string;
  apiHint?: string;
  authHint?: string;
  freeNote?: string;
  noAuth?: boolean;
  deprecated?: boolean;
  deprecationReason?: string;
  hiddenFromDashboard?: boolean;
};

export type WizardProviderOption = {
  id: string;
  name: string;
  icon: string;
  color?: string;
  alias?: string;
  description: string;
  authKind: WizardProviderAuthKind;
  apiKeyOptional: boolean;
  deprecated: boolean;
};

export const SUPPORTED_WIZARD_OAUTH_PROVIDER_IDS = new Set([
  "claude",
  "codex",
  "antigravity",
  "agy",
  "qwen",
  "kimi-coding",
  "github",
  "gitlab-duo",
  "kiro",
  "amazon-q",
  "cursor",
  "kilocode",
  "cline",
]);

function toProviderOption(
  provider: WizardProviderDefinition,
  authKind: WizardProviderAuthKind
): WizardProviderOption {
  const name = provider.name || provider.id;
  const fallbackDescription =
    authKind === "oauth"
      ? `Connect ${name} with the existing OAuth flow.`
      : `Connect ${name} with an API key.`;

  return {
    id: provider.id,
    name,
    icon: provider.icon || (authKind === "oauth" ? "account_circle" : "key"),
    color: provider.color,
    alias: provider.alias,
    description: provider.apiHint || provider.authHint || provider.freeNote || fallbackDescription,
    authKind,
    apiKeyOptional: Boolean(provider.noAuth || providerAllowsOptionalApiKey(provider.id)),
    deprecated: Boolean(provider.deprecated),
  };
}

function sortProviderOptions(options: WizardProviderOption[]): WizardProviderOption[] {
  return [...options].sort((a, b) => {
    if (a.deprecated !== b.deprecated) return a.deprecated ? 1 : -1;
    return a.name.localeCompare(b.name);
  });
}

export function getWizardApiKeyProviderOptions(): WizardProviderOption[] {
  const freeApiKeyProviders = Object.values(FREE_PROVIDERS).filter(
    (provider) => provider.noAuth || supportsApiKeyOnFreeProvider(provider.id)
  );
  const providers = [...Object.values(APIKEY_PROVIDERS), ...freeApiKeyProviders].filter(
    (provider) => !(provider as WizardProviderDefinition).hiddenFromDashboard
  );
  return sortProviderOptions(providers.map((provider) => toProviderOption(provider, "apikey")));
}

export function getWizardOAuthProviderOptions(): WizardProviderOption[] {
  const providersById = new Map<string, WizardProviderDefinition>();
  for (const provider of [...Object.values(OAUTH_PROVIDERS), ...Object.values(FREE_PROVIDERS)]) {
    if (SUPPORTED_WIZARD_OAUTH_PROVIDER_IDS.has(provider.id)) {
      providersById.set(provider.id, provider);
    }
  }
  return sortProviderOptions(
    [...providersById.values()].map((provider) => toProviderOption(provider, "oauth"))
  );
}

export function filterWizardProviderOptions(
  options: WizardProviderOption[],
  query: string
): WizardProviderOption[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return options;

  return options.filter((option) => {
    const haystack = [option.id, option.name, option.alias, option.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export function getDefaultConnectionName(option: Pick<WizardProviderOption, "name">): string {
  return `${option.name} Primary`;
}

export function buildProviderSpecificData(input: {
  baseUrl?: string;
  region?: string;
  cx?: string;
  customUserAgent?: string;
}): Record<string, string> | null {
  const providerSpecificData = Object.fromEntries(
    Object.entries(input)
      .map(([key, value]) => [key, typeof value === "string" ? value.trim() : ""])
      .filter(([, value]) => value.length > 0)
  );

  return Object.keys(providerSpecificData).length > 0 ? providerSpecificData : null;
}
