import {
  APIKEY_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  FREE_PROVIDERS,
  LOCAL_PROVIDERS,
  OAUTH_PROVIDERS,
  SEARCH_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  isClaudeCodeCompatibleProvider,
  supportsApiKeyOnFreeProvider,
} from "@/shared/constants/providers";

export type ProviderDisplayAuthType = "oauth" | "apikey" | "compatible";
export type ProviderToggleAuthType = "oauth" | "free" | "apikey";
export type StaticProviderCatalogCategory =
  | "free"
  | "oauth"
  | "web-cookie"
  | "local"
  | "search"
  | "audio"
  | "upstream-proxy"
  | "apikey";

export interface ProviderCatalogMetadata {
  id: string;
  name: string;
  color: string;
  alias?: string;
  icon?: string;
  textIcon?: string;
  website?: string;
  authHint?: string;
  apiHint?: string;
  passthroughModels?: boolean;
  apiType?: string;
  baseUrl?: string;
  [key: string]: unknown;
}

type ProviderRecord = Record<string, ProviderCatalogMetadata>;

export interface StaticProviderCatalogGroup {
  category: StaticProviderCatalogCategory;
  providers: ProviderRecord;
  displayAuthType: Exclude<ProviderDisplayAuthType, "compatible">;
  toggleAuthType: ProviderToggleAuthType;
}

export interface CompatibleProviderNodeLike {
  id: string;
  name?: string | null;
  type?: string | null;
  apiType?: string | null;
  baseUrl?: string | null;
}

export interface CompatibleProviderLabels {
  ccCompatibleName: string;
  anthropicCompatibleName: string;
  openAiCompatibleName: string;
}

export interface ResolvedStaticProviderCatalogEntry extends ProviderCatalogMetadata {
  category: StaticProviderCatalogCategory;
  displayAuthType: Exclude<ProviderDisplayAuthType, "compatible">;
  toggleAuthType: ProviderToggleAuthType;
  isCompatible: false;
}

export interface ResolvedCompatibleProviderCatalogEntry extends ProviderCatalogMetadata {
  category: "compatible";
  displayAuthType: "compatible";
  toggleAuthType: "apikey";
  isCompatible: true;
  type?: string | null;
}

export type ResolvedProviderCatalogEntry =
  | ResolvedStaticProviderCatalogEntry
  | ResolvedCompatibleProviderCatalogEntry;

export const STATIC_PROVIDER_CATALOG_GROUPS: Record<
  StaticProviderCatalogCategory,
  StaticProviderCatalogGroup
> = {
  free: {
    category: "free",
    providers: FREE_PROVIDERS as ProviderRecord,
    displayAuthType: "oauth",
    toggleAuthType: "free",
  },
  oauth: {
    category: "oauth",
    providers: OAUTH_PROVIDERS as ProviderRecord,
    displayAuthType: "oauth",
    toggleAuthType: "oauth",
  },
  "web-cookie": {
    category: "web-cookie",
    providers: WEB_COOKIE_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  local: {
    category: "local",
    providers: LOCAL_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  search: {
    category: "search",
    providers: SEARCH_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  audio: {
    category: "audio",
    providers: AUDIO_ONLY_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  "upstream-proxy": {
    category: "upstream-proxy",
    providers: UPSTREAM_PROXY_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  apikey: {
    category: "apikey",
    providers: APIKEY_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
};

export const STATIC_PROVIDER_CATALOG_RESOLUTION_ORDER: StaticProviderCatalogCategory[] = [
  "free",
  "oauth",
  "web-cookie",
  "local",
  "search",
  "audio",
  "upstream-proxy",
  "apikey",
];

const MANAGED_PROVIDER_CONNECTION_CATEGORIES = new Set<StaticProviderCatalogCategory>([
  "apikey",
  "web-cookie",
  "local",
  "search",
  "audio",
]);

export function getStaticProviderCatalogGroup(
  category: StaticProviderCatalogCategory
): StaticProviderCatalogGroup {
  return STATIC_PROVIDER_CATALOG_GROUPS[category];
}

export function getStaticProviderCategories(providerId: string): StaticProviderCatalogCategory[] {
  const categories: StaticProviderCatalogCategory[] = [];
  for (const category of STATIC_PROVIDER_CATALOG_RESOLUTION_ORDER) {
    if (STATIC_PROVIDER_CATALOG_GROUPS[category].providers[providerId]) {
      categories.push(category);
    }
  }
  return categories;
}

export function resolveStaticProviderCatalogEntry(
  providerId: string
): ResolvedStaticProviderCatalogEntry | null {
  for (const category of STATIC_PROVIDER_CATALOG_RESOLUTION_ORDER) {
    const group = STATIC_PROVIDER_CATALOG_GROUPS[category];
    const provider = group.providers[providerId];
    if (!provider) continue;
    return {
      ...provider,
      category,
      displayAuthType: group.displayAuthType,
      toggleAuthType: group.toggleAuthType,
      isCompatible: false,
    };
  }
  return null;
}

export function isManagedProviderConnectionId(providerId: string): boolean {
  if (supportsApiKeyOnFreeProvider(providerId)) return true;

  const entry = resolveStaticProviderCatalogEntry(providerId);
  return !!(entry && MANAGED_PROVIDER_CONNECTION_CATEGORIES.has(entry.category));
}

export function resolveCompatibleProviderCatalogEntry(
  providerNode: CompatibleProviderNodeLike,
  labels: CompatibleProviderLabels
): ResolvedCompatibleProviderCatalogEntry {
  const isCcCompatible = isClaudeCodeCompatibleProvider(providerNode.id);
  const isAnthropicCompatible = providerNode.type === "anthropic-compatible" && !isCcCompatible;

  return {
    id: providerNode.id,
    name:
      providerNode.name ||
      (isCcCompatible
        ? labels.ccCompatibleName
        : isAnthropicCompatible
          ? labels.anthropicCompatibleName
          : labels.openAiCompatibleName),
    color: isCcCompatible ? "#B45309" : isAnthropicCompatible ? "#D97757" : "#10A37F",
    textIcon: isCcCompatible ? "CC" : isAnthropicCompatible ? "AC" : "OC",
    apiType: providerNode.apiType || undefined,
    baseUrl: providerNode.baseUrl || undefined,
    type: providerNode.type,
    category: "compatible",
    displayAuthType: "compatible",
    toggleAuthType: "apikey",
    isCompatible: true,
  };
}

export function resolveProviderCatalogEntry(
  providerId: string,
  options?: {
    providerNode?: CompatibleProviderNodeLike | null;
    compatibleLabels?: CompatibleProviderLabels | null;
  }
): ResolvedProviderCatalogEntry | null {
  if (options?.providerNode && options.compatibleLabels) {
    return resolveCompatibleProviderCatalogEntry(options.providerNode, options.compatibleLabels);
  }

  return resolveStaticProviderCatalogEntry(providerId);
}
