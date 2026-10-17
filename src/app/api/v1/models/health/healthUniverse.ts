import { hasEligibleConnectionForModel } from "@/domain/connectionModelRules";

export type HealthRow = { id: string; provider: string; rawModel: string; root: string };

export type HealthActiveConnection = {
  id: string;
  provider: string;
  providerSpecificData?: unknown;
};

export type HealthContext = {
  aliasToProviderId: Record<string, string>;
  providerIdToAlias: Record<string, string>;
  blockedProviders: Set<string>;
  connections: HealthActiveConnection[];
  activeAliases: Set<string>;
  includeAlias: boolean;
  providerModels: Record<string, Array<{ id?: unknown }>>;
  synced: Record<string, Array<{ id?: unknown }>>;
  customMap: Record<string, unknown>;
  aliasBacked: Array<{ providerKey: string; modelId: string }>;
  modalities: Array<{ id: string; provider: string; rawModel: string }>;
  emitsCanonicalFor: (canonical: string) => boolean;
  connsFor: (provider: string) => HealthActiveConnection[];
};

function splitCatalogId(id: unknown): { provider: string; rawModel: string } | null {
  if (typeof id !== "string") return null;
  const trimmed = id.trim();
  if (trimmed.length === 0) return null;
  const slash = trimmed.indexOf("/");
  if (slash <= 0 || slash === trimmed.length - 1) return null;
  return { provider: trimmed.slice(0, slash), rawModel: trimmed.slice(slash + 1) };
}

function isQuotaId(id: string): boolean {
  return id.startsWith("qtSd/");
}

function splitQuotaId(id: string): { provider: string; rawModel: string } | null {
  const parts = id.split("/");
  if (parts.length < 4) return null;
  const provider = parts[2];
  const rawModel = parts.slice(3).join("/");
  if (!provider || !rawModel) return null;
  return { provider, rawModel };
}

function toActiveConnections(rows: Array<Record<string, unknown>>): HealthActiveConnection[] {
  const out: HealthActiveConnection[] = [];
  for (const row of rows) {
    const id = typeof row.id === "string" ? row.id : null;
    const provider = typeof row.provider === "string" ? row.provider : null;
    if (!id || !provider) continue;
    // Mirror the catalog (catalog.ts): only active connections count.
    if (row.isActive === false) continue;
    out.push({
      id,
      provider,
      providerSpecificData: row.providerSpecificData,
    });
  }
  return out;
}

async function loadConnections(): Promise<HealthActiveConnection[]> {
  try {
    const { getCachedRawProviderConnections } = await import("@/lib/db/readCache");
    const { createLazyRowProxy } = await import("@/lib/db/providers/lazyConnectionView");
    const raw = (await getCachedRawProviderConnections()) as Array<Record<string, unknown>>;
    return toActiveConnections(raw.map((row) => createLazyRowProxy(row)));
  } catch {
    return [];
  }
}

async function loadRegistries(
  ctx: Pick<HealthContext, "providerModels" | "synced" | "customMap" | "aliasBacked" | "modalities">
): Promise<void> {
  try {
    const { PROVIDER_MODELS } = await import("@/shared/constants/models");
    ctx.providerModels = PROVIDER_MODELS as Record<string, Array<{ id?: unknown }>>;
  } catch {
    ctx.providerModels = {};
  }
  try {
    const { getAllActiveSyncedModels } = await import("@/lib/db/models/activeSyncedCatalog");
    ctx.synced = (await getAllActiveSyncedModels()) as Record<string, Array<{ id?: unknown }>>;
  } catch {
    ctx.synced = {};
  }
  try {
    const { getAllCustomModels } = await import("@/lib/db/models");
    ctx.customMap = (await getAllCustomModels()) as Record<string, unknown>;
  } catch {
    ctx.customMap = {};
  }
  try {
    const { getModelAliases } = await import("@/lib/db/models/aliases");
    const { extractAliasBackedModels } = await import("../aliasBackedModels");
    ctx.aliasBacked = extractAliasBackedModels(
      (await getModelAliases()) as Record<string, unknown>
    );
  } catch {
    ctx.aliasBacked = [];
  }
  ctx.modalities = await loadModalityRows();
}

type ModalityRow = { id: string; provider: string; rawModel: string };

function toModalityRow(id: unknown, provider: unknown): ModalityRow | null {
  if (typeof id !== "string" || typeof provider !== "string") return null;
  const slash = id.indexOf("/");
  const rawModel = slash >= 0 ? id.slice(slash + 1) : id;
  if (!provider || !rawModel) return null;
  return { id, provider, rawModel };
}

async function loadModalityRows(): Promise<ModalityRow[]> {
  const rows: ModalityRow[] = [];
  const loaders: Array<() => Promise<unknown>> = [
    async () =>
      (await import("@omniroute/open-sse/config/embeddingRegistry")).getAllEmbeddingModels(),
    async () => (await import("@omniroute/open-sse/config/imageRegistry")).getAllImageModels(),
    async () => (await import("@omniroute/open-sse/config/rerankRegistry")).getAllRerankModels(),
    async () => (await import("@omniroute/open-sse/config/audioRegistry")).getAllAudioModels(),
    async () =>
      (await import("@omniroute/open-sse/config/moderationRegistry")).getAllModerationModels(),
    async () => (await import("@omniroute/open-sse/config/videoRegistry")).getAllVideoModels(),
    async () => (await import("@omniroute/open-sse/config/musicRegistry")).getAllMusicModels(),
  ];
  for (const load of loaders) {
    let listed: unknown = null;
    try {
      listed = await load();
    } catch {
      continue;
    }
    if (!Array.isArray(listed)) continue;
    for (const entry of listed as Array<{ id?: unknown; provider?: unknown }>) {
      const row = toModalityRow(entry?.id, entry?.provider);
      if (row) rows.push(row);
    }
  }
  return rows;
}

export async function loadHealthContext(
  settings?: Record<string, unknown>
): Promise<HealthContext> {
  const { buildAliasMaps, prefixRoutesToProvider } = await import("../catalogProviderMaps");
  const { getModelsCatalogPrefixMode } = await import("@/shared/utils/featureFlags");
  const { getSettings } = await import("@/lib/db/settings");
  const { normalizeBlockedProviderSet, isNoAuthProviderBlocked } =
    await import("@/shared/utils/noAuthProviders");
  const { NOAUTH_PROVIDERS } = await import("@/shared/constants/providers/noauth");

  const { aliasToProviderId, providerIdToAlias } = buildAliasMaps();
  let resolvedSettings = settings;
  if (!resolvedSettings) {
    try {
      resolvedSettings = (await getSettings()) as Record<string, unknown>;
    } catch {
      resolvedSettings = {};
    }
  }
  const blockedProviders = normalizeBlockedProviderSet(
    (resolvedSettings as Record<string, unknown>).blockedProviders
  );
  const connections = await loadConnections();
  const activeAliases = new Set<string>();
  for (const conn of connections) {
    activeAliases.add(providerIdToAlias[conn.provider] || conn.provider);
    activeAliases.add(conn.provider);
  }
  for (const entry of Object.values(NOAUTH_PROVIDERS) as Array<{
    id: string;
    alias?: string;
  }>) {
    if (isNoAuthProviderBlocked(blockedProviders, entry.id, entry.alias)) continue;
    activeAliases.add(entry.id);
    if (entry.alias) activeAliases.add(entry.alias);
  }
  const prefixMode = getModelsCatalogPrefixMode();
  const { isNoAuthProviderKey } = await import("@/shared/utils/noAuthProviders");
  const ctx: HealthContext = {
    aliasToProviderId,
    providerIdToAlias,
    blockedProviders,
    connections,
    activeAliases,
    includeAlias: prefixMode !== "canonical",
    providerModels: {},
    synced: {},
    customMap: {},
    aliasBacked: [],
    modalities: [],
    emitsCanonicalFor: (canonical: string) =>
      prefixMode !== "alias" &&
      !isNoAuthProviderKey(canonical) &&
      prefixRoutesToProvider(canonical, canonical),
    connsFor: () => [],
  };
  await loadRegistries(ctx);
  const aliasOf = (canonical: string) => providerIdToAlias[canonical] || canonical;
  ctx.connsFor = (provider: string) =>
    connections.filter(
      (c) =>
        c.provider === provider ||
        (providerIdToAlias[c.provider] || c.provider) === provider ||
        c.provider === aliasOf(provider)
    );
  return ctx;
}

function newCollector() {
  const rows: HealthRow[] = [];
  const seen = new Set<string>();
  const pushRow = (id: string, root: string) => {
    const split = isQuotaId(id) ? splitQuotaId(id) : splitCatalogId(id);
    if (!split || seen.has(id)) return;
    seen.add(id);
    rows.push({ id, provider: split.provider, rawModel: split.rawModel, root });
  };
  return { rows, pushRow };
}

function isActive(ctx: HealthContext, alias: string, canonical: string, raw?: string): boolean {
  return (
    ctx.activeAliases.has(alias) ||
    ctx.activeAliases.has(canonical) ||
    (raw ? ctx.activeAliases.has(raw) : false)
  );
}

function isBlocked(ctx: HealthContext, alias: string, canonical: string): boolean {
  return ctx.blockedProviders.has(alias) || ctx.blockedProviders.has(canonical);
}

function canonicalOf(ctx: HealthContext, aliasOrId: string, fallback?: string): string {
  return (
    ctx.aliasToProviderId[aliasOrId] ||
    (fallback ? ctx.aliasToProviderId[fallback] : undefined) ||
    fallback ||
    aliasOrId
  );
}

function collectStaticRows(ctx: HealthContext, pushRow: (id: string, root: string) => void): void {
  for (const [alias, providerModels] of Object.entries(ctx.providerModels)) {
    if (!Array.isArray(providerModels)) continue;
    const providerId = ctx.aliasToProviderId[alias] || alias;
    const canonical = canonicalOf(ctx, alias, providerId);
    if (isBlocked(ctx, alias, canonical)) continue;
    if (!isActive(ctx, alias, canonical)) continue;
    collectProviderRows(ctx, canonical, alias, providerModels, pushRow);
  }
}

function collectProviderRows(
  ctx: HealthContext,
  canonical: string,
  alias: string,
  models: Array<{ id?: unknown }>,
  pushRow: (id: string, root: string) => void
): void {
  for (const model of models) {
    const rawModel = typeof model?.id === "string" ? model.id : null;
    if (!rawModel) continue;
    if (!hasEligibleConnectionForModel(ctx.connsFor(canonical), rawModel)) continue;
    if (ctx.includeAlias || canonical === alias) pushRow(`${alias}/${rawModel}`, rawModel);
    pushCanonicalRow(ctx, canonical, alias, rawModel, pushRow);
  }
}

function pushCanonicalRow(
  ctx: HealthContext,
  canonical: string,
  alias: string,
  rawModel: string,
  pushRow: (id: string, root: string) => void
): void {
  if (canonical === alias) return;
  if (!ctx.emitsCanonicalFor(canonical)) return;
  pushRow(`${canonical}/${rawModel}`, rawModel);
}

function collectSyncedRows(ctx: HealthContext, pushRow: (id: string, root: string) => void): void {
  for (const [providerId, syncedModels] of Object.entries(ctx.synced)) {
    if (!Array.isArray(syncedModels) || syncedModels.length === 0) continue;
    if (ctx.blockedProviders.has(providerId)) continue;
    const alias = ctx.providerIdToAlias[providerId] || providerId;
    const canonical = canonicalOf(ctx, alias, providerId);
    if (!isActive(ctx, alias, canonical, providerId)) continue;
    collectProviderRows(ctx, canonical, alias, syncedModels, pushRow);
  }
}

function collectCustomRows(ctx: HealthContext, pushRow: (id: string, root: string) => void): void {
  for (const [providerId, rawList] of Object.entries(ctx.customMap)) {
    if (!Array.isArray(rawList)) continue;
    if (ctx.blockedProviders.has(providerId)) continue;
    const alias = ctx.providerIdToAlias[providerId] || providerId;
    const canonical = canonicalOf(ctx, alias, providerId);
    if (!isActive(ctx, alias, canonical, providerId)) continue;
    collectProviderRows(ctx, canonical, alias, rawList as Array<{ id?: unknown }>, pushRow);
  }
}

function collectAliasRows(ctx: HealthContext, pushRow: (id: string, root: string) => void): void {
  for (const { providerKey, modelId } of ctx.aliasBacked) {
    const canonical = canonicalOf(ctx, providerKey);
    if (!canonical) continue;
    if (ctx.blockedProviders.has(providerKey) || ctx.blockedProviders.has(canonical)) continue;
    const alias = ctx.providerIdToAlias[canonical] || providerKey;
    if (!isActive(ctx, alias, canonical, providerKey)) continue;
    if (!hasEligibleConnectionForModel(ctx.connsFor(canonical), modelId)) continue;
    if (ctx.includeAlias || canonical === alias) pushRow(`${alias}/${modelId}`, modelId);
    pushCanonicalRow(ctx, canonical, alias, modelId, pushRow);
  }
}

function collectModalityRows(
  ctx: HealthContext,
  pushRow: (id: string, root: string) => void
): void {
  for (const row of ctx.modalities) {
    const canonical = canonicalOf(ctx, row.provider);
    if (!canonical) continue;
    if (ctx.blockedProviders.has(row.provider) || ctx.blockedProviders.has(canonical)) continue;
    const alias = ctx.providerIdToAlias[canonical] || row.provider;
    if (!isActive(ctx, alias, canonical, row.provider)) continue;
    if (!hasEligibleConnectionForModel(ctx.connsFor(canonical), row.rawModel)) continue;
    pushRow(row.id, row.rawModel);
    pushCanonicalRow(ctx, canonical, alias, row.rawModel, pushRow);
  }
}

export function collectHealthRows(ctx: HealthContext): HealthRow[] {
  const { rows, pushRow } = newCollector();
  collectStaticRows(ctx, pushRow);
  collectSyncedRows(ctx, pushRow);
  collectCustomRows(ctx, pushRow);
  collectAliasRows(ctx, pushRow);
  collectModalityRows(ctx, pushRow);
  return rows;
}

async function collectQuotaRows(allowedQuotas: string[]): Promise<HealthRow[]> {
  const { buildQuotaExclusiveModels } = await import("@/lib/quota/quotaCombos");
  const { getCombos } = await import("@/lib/db/combos");
  let combos: Array<{ name?: unknown }> = [];
  try {
    combos = await getCombos();
  } catch {
    combos = [];
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const quotaRows = await buildQuotaExclusiveModels(allowedQuotas, combos, timestamp, () => ({}));
  const { rows, pushRow } = newCollector();
  for (const row of quotaRows as Array<{ id?: unknown }>) {
    const id = typeof row?.id === "string" ? row.id : null;
    if (!id || !splitQuotaId(id)) continue;
    pushRow(id, id);
  }
  return rows;
}

export async function applyHealthKeyScope(
  rows: HealthRow[],
  apiKey: string | null
): Promise<{ rows: HealthRow[]; keyMeta: unknown }> {
  if (!apiKey) return { rows, keyMeta: null };
  const { getApiKeyMetadata } = await import("@/lib/db/apiKeys");
  const { isCatalogModelAllowedForKey } = await import("../catalogKeyFilter");
  const keyMeta = await getApiKeyMetadata(apiKey);
  if (!keyMeta) return { rows, keyMeta };
  const allowedQuotas = keyMeta.allowedQuotas;
  if (Array.isArray(allowedQuotas) && allowedQuotas.length > 0) {
    return { rows: await collectQuotaRows(allowedQuotas), keyMeta };
  }
  const catalogScope = keyMeta.catalogScope ?? "all";
  if (catalogScope === "combos") return { rows: [], keyMeta };
  const blockedModels = keyMeta.blockedModels;
  const out: HealthRow[] = [];
  for (const row of rows) {
    if (await isCatalogModelAllowedForKey(apiKey, { id: row.id, root: row.root }, blockedModels)) {
      out.push(row);
    }
  }
  return { rows: out, keyMeta };
}
