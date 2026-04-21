import {
  getStaticProviderCatalogGroup,
  resolveProviderCatalogEntry,
  type CompatibleProviderLabels,
  type CompatibleProviderNodeLike,
  type ProviderCatalogMetadata,
  type ResolvedProviderCatalogEntry,
  type StaticProviderCatalogCategory,
} from "@/lib/providers/catalog";

export interface ProviderStatsSnapshot {
  total?: number;
  [key: string]: unknown;
}

export interface ProviderEntry<TProvider = Record<string, unknown>> {
  providerId: string;
  provider: TProvider;
  stats: ProviderStatsSnapshot;
  displayAuthType: "oauth" | "apikey" | "compatible";
  toggleAuthType: "oauth" | "free" | "apikey";
}

export interface ZedQuotaSummary {
  planLabel: string | null;
  spendLabel: string | null;
  editPredictionsLabel: string | null;
  isAccountTooYoung: boolean;
  billingPortalUrl: string | null;
}

type ProviderRecord<TProvider = Record<string, unknown>> = Record<string, TProvider>;

type GetProviderStats = (
  providerId: string,
  authType: "oauth" | "free" | "apikey"
) => ProviderStatsSnapshot;

function readRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readInteger(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.round(value);
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseInt(value.trim(), 10);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function formatUsdCents(value: number): string {
  return `$${(value / 100).toFixed(2)}`;
}

export function summarizeZedQuota(
  providerSpecificData?: Record<string, unknown> | null
): ZedQuotaSummary | null {
  const root = readRecord(providerSpecificData);
  if (!root) return null;

  const quota = readRecord(root.zedQuota);
  const planRaw = readString(quota?.planRaw) || readString(root.planRaw);
  const spendUsed = readInteger(quota?.tokenSpendUsedCents);
  const spendLimit = readInteger(quota?.tokenSpendLimitCents);
  const editUsed = readInteger(quota?.editPredictionsUsed);
  const editLimit = readString(quota?.editPredictionsLimitRaw);
  const editRemaining = readString(quota?.editPredictionsRemainingRaw);
  const billingPortalUrl =
    readString(quota?.billingPortalUrl) || readString(root.billingPortalUrl) || null;
  const isAccountTooYoung = root.isAccountTooYoung === true || quota?.isAccountTooYoung === true;

  const spendLabel =
    spendUsed !== null && spendLimit !== null
      ? `Spend ${formatUsdCents(spendUsed)} / ${formatUsdCents(spendLimit)}`
      : spendUsed !== null
        ? `Spend ${formatUsdCents(spendUsed)}`
        : null;

  let editPredictionsLabel: string | null = null;
  if (editUsed !== null && editLimit) {
    editPredictionsLabel = `Edits ${editUsed} / ${editLimit}`;
  } else if (editUsed !== null && editRemaining) {
    editPredictionsLabel = `Edits ${editUsed} used • ${editRemaining} left`;
  } else if (editUsed !== null) {
    editPredictionsLabel = `Edits ${editUsed} used`;
  }

  if (!planRaw && !spendLabel && !editPredictionsLabel && !billingPortalUrl && !isAccountTooYoung) {
    return null;
  }

  return {
    planLabel: planRaw ? planRaw.replace(/_/g, " ") : null,
    spendLabel,
    editPredictionsLabel,
    isAccountTooYoung,
    billingPortalUrl,
  };
}

export function buildProviderEntries<TProvider = Record<string, unknown>>(
  providers: ProviderRecord<TProvider>,
  displayAuthType: ProviderEntry["displayAuthType"],
  toggleAuthType: ProviderEntry["toggleAuthType"],
  getProviderStats: GetProviderStats
): ProviderEntry<TProvider>[] {
  return Object.entries(providers).map(([providerId, provider]) => ({
    providerId,
    provider,
    stats: getProviderStats(providerId, toggleAuthType),
    displayAuthType,
    toggleAuthType,
  }));
}

export function buildMergedOAuthProviderEntries<TProvider = Record<string, unknown>>(
  oauthProviders: ProviderRecord<TProvider>,
  freeProviders: ProviderRecord<TProvider>,
  getProviderStats: GetProviderStats
): ProviderEntry<TProvider>[] {
  return [
    ...buildProviderEntries(oauthProviders, "oauth", "oauth", getProviderStats),
    ...buildProviderEntries(freeProviders, "oauth", "free", getProviderStats),
  ];
}

export function buildStaticProviderEntries(
  category: StaticProviderCatalogCategory,
  getProviderStats: GetProviderStats
): ProviderEntry<ProviderCatalogMetadata>[] {
  const group = getStaticProviderCatalogGroup(category);
  return buildProviderEntries(
    group.providers,
    group.displayAuthType,
    group.toggleAuthType,
    getProviderStats
  );
}

export function filterConfiguredProviderEntries<TProvider>(
  entries: ProviderEntry<TProvider>[],
  showConfiguredOnly: boolean
): ProviderEntry<TProvider>[] {
  if (!showConfiguredOnly) return entries;

  return entries.filter((entry) => Number(entry.stats?.total || 0) > 0);
}

export function resolveDashboardProviderInfo(
  providerId: string,
  options?: {
    providerNode?: CompatibleProviderNodeLike | null;
    compatibleLabels?: CompatibleProviderLabels | null;
  }
): ResolvedProviderCatalogEntry | null {
  return resolveProviderCatalogEntry(providerId, options);
}
