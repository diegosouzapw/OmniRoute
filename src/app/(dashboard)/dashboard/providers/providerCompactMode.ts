import { IDE_PROVIDER_IDS } from "@/shared/constants/providers";
import {
  buildCompactProviderEntries,
  resolveDashboardProviderInfo,
  type ProviderEntry,
} from "./providerPageUtils";

type ProviderCategoryEntries<TProvider> = ProviderEntry<TProvider>[];

export interface CompactProviderEntryOptions<TProvider> {
  activeCategory: string;
  showFreeOnly: boolean;
  freeSectionEntries: ProviderCategoryEntries<TProvider>;
  compatibleProviderEntries: ProviderCategoryEntries<TProvider>;
  oauthProviderEntries: ProviderCategoryEntries<TProvider>;
  ideProviderEntries: ProviderCategoryEntries<TProvider>;
  noAuthEntries: ProviderCategoryEntries<TProvider>;
  upstreamProxyEntries: ProviderCategoryEntries<TProvider>;
  llmProviderEntries: ProviderCategoryEntries<TProvider>;
  aggregatorProviderEntries: ProviderCategoryEntries<TProvider>;
  enterpriseProviderEntries: ProviderCategoryEntries<TProvider>;
  embeddingRerankProviderEntries: ProviderCategoryEntries<TProvider>;
  imageProviderEntries: ProviderCategoryEntries<TProvider>;
  videoProviderEntries: ProviderCategoryEntries<TProvider>;
  webCookieProviderEntries: ProviderCategoryEntries<TProvider>;
  searchProviderEntries: ProviderCategoryEntries<TProvider>;
  webFetchEntries: ProviderCategoryEntries<TProvider>;
  audioProviderEntries: ProviderCategoryEntries<TProvider>;
  localProviderEntries: ProviderCategoryEntries<TProvider>;
  cloudAgentProviderEntries: ProviderCategoryEntries<TProvider>;
}

function getCompactProviderEntryGroups<TProvider>({
  activeCategory,
  showFreeOnly,
  freeSectionEntries,
  compatibleProviderEntries,
  oauthProviderEntries,
  ideProviderEntries,
  noAuthEntries,
  upstreamProxyEntries,
  llmProviderEntries,
  aggregatorProviderEntries,
  enterpriseProviderEntries,
  embeddingRerankProviderEntries,
  imageProviderEntries,
  videoProviderEntries,
  webCookieProviderEntries,
  searchProviderEntries,
  webFetchEntries,
  audioProviderEntries,
  localProviderEntries,
  cloudAgentProviderEntries,
}: CompactProviderEntryOptions<TProvider>): ProviderEntry<TProvider>[][] {
  const oauthEntries = oauthProviderEntries.filter(
    (entry) => !IDE_PROVIDER_IDS.has(entry.providerId)
  );
  const apiKeyEntries = [
    llmProviderEntries,
    aggregatorProviderEntries,
    enterpriseProviderEntries,
    embeddingRerankProviderEntries,
    imageProviderEntries,
    videoProviderEntries,
  ];

  if (showFreeOnly) return [freeSectionEntries];

  if (activeCategory === "compatible") return [compatibleProviderEntries];
  if (activeCategory === "oauth") return [oauthEntries];
  if (activeCategory === "ide") return [ideProviderEntries];
  if (activeCategory === "no-auth") return [noAuthEntries];
  if (activeCategory === "upstream-proxy") return [upstreamProxyEntries];
  if (activeCategory === "apikey") return apiKeyEntries;
  if (activeCategory === "webcookie") return [webCookieProviderEntries];
  if (activeCategory === "search") return [searchProviderEntries];
  if (activeCategory === "webfetch") return [webFetchEntries];
  if (activeCategory === "audio") return [audioProviderEntries];
  if (activeCategory === "local") return [localProviderEntries];
  if (activeCategory === "cloudagent") return [cloudAgentProviderEntries];

  return [
    compatibleProviderEntries,
    oauthEntries,
    ideProviderEntries,
    webCookieProviderEntries,
    llmProviderEntries,
    upstreamProxyEntries,
    aggregatorProviderEntries,
    enterpriseProviderEntries,
    cloudAgentProviderEntries,
    localProviderEntries,
    searchProviderEntries,
    embeddingRerankProviderEntries,
    imageProviderEntries,
    audioProviderEntries,
    videoProviderEntries,
    noAuthEntries,
  ];
}

export function buildCompactProviderEntriesForPage<TProvider>(
  options: CompactProviderEntryOptions<TProvider>
): ProviderEntry<TProvider>[] {
  return buildCompactProviderEntries(getCompactProviderEntryGroups(options), {
    deferNoAuth: options.activeCategory !== "no-auth",
  });
}

const CATEGORY_AUTH_TYPES: Record<string, string> = {
  "cloud-agent": "cloud-agent",
  "no-auth": "no-auth",
  "upstream-proxy": "upstream-proxy",
  "web-cookie": "web-cookie",
  audio: "audio",
  local: "local",
  search: "search",
};

export function getCompactProviderAuthType<TProvider>(
  entry: ProviderEntry<TProvider>,
  showFreeOnly: boolean
): string {
  if (showFreeOnly && entry.toggleAuthType === "free") return "free";
  if (entry.displayAuthType === "compatible") return "compatible";

  const info = resolveDashboardProviderInfo(entry.providerId);
  if (!info) return entry.displayAuthType;

  return CATEGORY_AUTH_TYPES[info.category] ?? entry.displayAuthType;
}
