import { providerUsesAuthoritativeLiveCatalog } from "@omniroute/open-sse/config/providerRegistry";
import { PROVIDER_ID_TO_ALIAS } from "@omniroute/open-sse/config/providerModels.ts";
import { ensureCursorAutoCatalogEntry } from "@/lib/providerModels/cursorAutoCatalog";
import {
  getCustomModels,
  getSyncedAvailableModels,
  getSyncedAvailableModelsByConnection,
  type SyncedAvailableModel,
} from "../models";
import { normalizeSyncedAvailableModels } from "./synced";
import { getRawProviderConnections } from "../providers";

export type ActiveSyncedCatalog = {
  authoritative: boolean;
  models: SyncedAvailableModel[];
};

/**
 * Fail-open membership check for explicit combo members against a live catalog.
 * `null` means no authoritative catalog is synced yet (unchanged behavior).
 */
export function catalogContainsModel(
  catalog: ActiveSyncedCatalog,
  modelId: string
): boolean | null {
  if (!catalog.authoritative) return null;
  const trimmed = modelId.trim();
  if (!trimmed) return false;
  const ids = new Set(catalog.models.map((model) => model.id));
  if (ids.has(trimmed)) return true;
  const slash = trimmed.indexOf("/");
  if (slash > 0 && ids.has(trimmed.slice(slash + 1))) return true;
  return false;
}

export type ProviderCatalogReconciliation = {
  providers: string[];
  excludedProviders: string[];
};

type ProviderConnectionRef = {
  id: string;
  provider: string;
  syncedModelsAt: string | null;
};

// #12849: a connection synced once and never refreshed must not pin routing to
// that point-in-time snapshot forever — a live model the provider has since
// added would be rejected as "unavailable" indefinitely. Once the synced
// catalog exceeds this age (or was never timestamped — pre-migration rows),
// getActiveSyncedCatalog stops treating it as authoritative and fails open,
// matching the existing no-sync-yet behavior. Overridable for ops/testing.
const DEFAULT_SYNCED_CATALOG_STALE_AFTER_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSyncedCatalogStaleAfterMs(): number {
  const raw = process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS;
  const parsed = raw !== undefined ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_SYNCED_CATALOG_STALE_AFTER_MS;
}

function isSyncedAtFresh(syncedModelsAt: string | null): boolean {
  if (!syncedModelsAt) return false;
  const syncedAtMs = Date.parse(syncedModelsAt);
  if (Number.isNaN(syncedAtMs)) return false;
  return Date.now() - syncedAtMs <= getSyncedCatalogStaleAfterMs();
}

function resolveStoredProviderId(aliasOrId: string): string {
  const normalized = aliasOrId.trim();
  if (!normalized) return "";

  if (Object.prototype.hasOwnProperty.call(PROVIDER_ID_TO_ALIAS, normalized)) {
    return normalized;
  }

  for (const [providerId, alias] of Object.entries(PROVIDER_ID_TO_ALIAS)) {
    if (alias === normalized) return providerId;
  }

  return normalized;
}

/**
 * Distinct stored provider ids that share an account family.
 * Credential lookup already pairs these in PROVIDER_SEARCH_PAIRS (#8779);
 * live catalogs are keyed `provider:connectionId`, so the same pair must
 * union here. parseModel folds `agy/` → `antigravity`, but CLI-card rows
 * persist catalogs under `agy:` and the IDE card under `antigravity:`.
 */
const CATALOG_SIBLING_IDS: Record<string, string[]> = {
  antigravity: ["agy"],
  agy: ["antigravity"],
};

function catalogLookupIds(storedProviderId: string): string[] {
  const siblings = CATALOG_SIBLING_IDS[storedProviderId] || [];
  return [storedProviderId, ...siblings.filter((id) => id !== storedProviderId)];
}

function unionModels(groups: SyncedAvailableModel[][]): SyncedAvailableModel[] {
  const models = new Map<string, SyncedAvailableModel>();
  for (const group of groups) {
    for (const model of group) {
      if (!model?.id || models.has(model.id)) continue;
      models.set(model.id, model);
    }
  }
  return Array.from(models.values());
}

function readConnectionRef(connection: unknown): ProviderConnectionRef | null {
  if (!connection || typeof connection !== "object") return null;

  const record = connection as {
    id?: unknown;
    provider?: unknown;
    syncedModelsAt?: unknown;
  };

  if (
    typeof record.id !== "string" ||
    record.id.length === 0 ||
    typeof record.provider !== "string" ||
    record.provider.length === 0
  ) {
    return null;
  }

  return {
    id: record.id,
    provider: record.provider,
    syncedModelsAt: typeof record.syncedModelsAt === "string" ? record.syncedModelsAt : null,
  };
}

function collectModelsForConnections(
  modelsByConnection: Record<string, SyncedAvailableModel[]>,
  connectionIds: Iterable<string>
): SyncedAvailableModel[] {
  const models = new Map<string, SyncedAvailableModel>();

  for (const connectionId of connectionIds) {
    for (const model of modelsByConnection[connectionId] || []) {
      if (!model?.id || models.has(model.id)) continue;
      models.set(model.id, model);
    }
  }

  return Array.from(models.values());
}

function enrichCursorCatalog(
  providerId: string,
  models: SyncedAvailableModel[]
): SyncedAvailableModel[] {
  // An empty sync means discovery has not completed (or failed). Do not let the
  // synthetic Cursor auto-router rows turn that empty state into an authoritative
  // catalog, otherwise every built-in model is incorrectly marked unavailable.
  if (models.length === 0) return models;
  return providerId === "cursor" || providerId === "cursor-api"
    ? ensureCursorAutoCatalogEntry(models)
    : models;
}

/**
 * #12597: picker-added `customModels` are already merged on GET /api/providers/{id}/models.
 * Dispatch-time live catalog must union the same rows or combo / bare inference 400.
 * Same-id custom metadata overlays the synced row (name, vision, …).
 */
async function unionCustomModels(
  providerId: string,
  models: SyncedAvailableModel[]
): Promise<SyncedAvailableModel[]> {
  let customRows: SyncedAvailableModel[] = [];
  try {
    customRows = normalizeSyncedAvailableModels(await getCustomModels(providerId), providerId);
  } catch {
    // Fail open: a customModels read/parse miss must not empty the synced catalog.
    return models;
  }
  if (customRows.length === 0) return models;

  const merged = new Map<string, SyncedAvailableModel>();
  for (const model of models) {
    if (model?.id) merged.set(model.id, model);
  }
  for (const model of customRows) {
    if (!model?.id) continue;
    const existing = merged.get(model.id);
    if (!existing) {
      merged.set(model.id, model);
      continue;
    }
    const overlay = Object.fromEntries(
      Object.entries(model).filter(([, value]) => value !== undefined)
    ) as Partial<SyncedAvailableModel>;
    merged.set(model.id, { ...existing, ...overlay, id: model.id });
  }
  return Array.from(merged.values());
}

/**
 * Return the unioned synced catalog belonging only to active connections.
 *
 * A provider is authoritative only when at least one active connection has a
 * non-empty usable catalog that was synced recently enough (#12849). Missing,
 * empty, malformed, stale, or unavailable state fails open to the static
 * registry instead of gating on a frozen point-in-time snapshot forever.
 */
type ConnectionCatalog = {
  models: SyncedAvailableModel[];
  hasFreshConnection: boolean;
};

async function loadConnectionCatalog(storedProviderId: string): Promise<ConnectionCatalog> {
  const [connections, modelsByConnection] = await Promise.all([
    getRawProviderConnections({ provider: storedProviderId, isActive: true }, undefined, undefined, [
      "id",
      "provider",
      "synced_models_at",
    ]),
    getSyncedAvailableModelsByConnection(storedProviderId),
  ]);

  const activeConnections = connections
    .map(readConnectionRef)
    .filter((connection): connection is ProviderConnectionRef => connection !== null);

  return {
    models: collectModelsForConnections(
      modelsByConnection,
      activeConnections.map((connection) => connection.id)
    ),
    hasFreshConnection: activeConnections.some((connection) =>
      isSyncedAtFresh(connection.syncedModelsAt)
    ),
  };
}

export async function getActiveSyncedCatalog(providerId: string): Promise<ActiveSyncedCatalog> {
  const storedProviderId = resolveStoredProviderId(providerId);
  if (!storedProviderId) {
    return { authoritative: false, models: [] };
  }

  try {
    const lookupIds = catalogLookupIds(storedProviderId);
    const siblingCatalogs = await Promise.all(lookupIds.map(loadConnectionCatalog));
    // #12866 unions the agy/antigravity sibling catalogs; #12934 then overlays the
    // picker-added customModels so dispatch admits the same rows the picker REST shows.
    const models = enrichCursorCatalog(
      storedProviderId,
      await unionCustomModels(
        storedProviderId,
        unionModels(siblingCatalogs.map((catalog) => catalog.models))
      )
    );
    if (models.length > 0) {
      // #12849: only gate on this catalog while at least one sibling connection
      // was synced recently — otherwise a one-time historical sync would keep
      // rejecting live models forever with no way to self-recover.
      const hasFreshConnection = siblingCatalogs.some((catalog) => catalog.hasFreshConnection);
      return {
        authoritative: providerUsesAuthoritativeLiveCatalog(providerId) && hasFreshConnection,
        models,
      };
    }

    // No ACTIVE CONNECTION carries a catalog for this provider — but a provider
    // NODE can: nodes live in `provider_nodes`, never in `provider_connections`,
    // so filtering by active connection ids drops their synced catalog entirely.
    // Before #9294 this path read the provider-wide key_value set, and losing it
    // took every node's runtime metadata with it (supportedThinkingEfforts, so
    // `-high`/`-low` effort suffixes stopped resolving, plus contextWindow /
    // maxInputTokens used by the combo context-window filter).
    //
    // Fall back to that provider-wide set, and deliberately keep it
    // NON-authoritative: #9294's live-catalog gating is about what an active
    // connection actually serves, so a node-backed catalog must inform metadata
    // without ever being used to reject a model as unavailable.
    return {
      authoritative: false,
      models: enrichCursorCatalog(
        storedProviderId,
        await unionCustomModels(storedProviderId, await getSyncedAvailableModels(storedProviderId))
      ),
    };
  } catch {
    return { authoritative: false, models: [] };
  }
}

/**
 * Return non-empty synced catalogs grouped by provider, restricted to active
 * connections. This is the authoritative live source for /v1/models.
 */
export async function getAllActiveSyncedModels(): Promise<Record<string, SyncedAvailableModel[]>> {
  try {
    const connections = await getRawProviderConnections({ isActive: true }, undefined, undefined, [
      "id",
      "provider",
    ]);

    const connectionIdsByProvider = new Map<string, Set<string>>();

    for (const rawConnection of connections) {
      const connection = readConnectionRef(rawConnection);
      if (!connection) continue;

      if (!connectionIdsByProvider.has(connection.provider)) {
        connectionIdsByProvider.set(connection.provider, new Set());
      }

      connectionIdsByProvider.get(connection.provider)!.add(connection.id);
    }

    const result: Record<string, SyncedAvailableModel[]> = {};

    await Promise.all(
      Array.from(connectionIdsByProvider.entries()).map(async ([providerId, connectionIds]) => {
        const modelsByConnection = await getSyncedAvailableModelsByConnection(providerId);

        const models = enrichCursorCatalog(
          providerId,
          await unionCustomModels(
            providerId,
            collectModelsForConnections(modelsByConnection, connectionIds)
          )
        );

        if (models.length > 0) {
          result[providerId] = models;
        }
      })
    );

    return result;
  } catch {
    return {};
  }
}

/**
 * Remove static provider candidates whose active live catalog exists but does
 * not contain the requested model. Providers without a usable live catalog
 * retain their static fallback behavior.
 */
export async function reconcileProvidersWithActiveSyncedCatalog(
  providerIds: string[],
  modelId: string
): Promise<ProviderCatalogReconciliation> {
  const uniqueProviders = Array.from(
    new Set(
      providerIds.filter(
        (provider): provider is string => typeof provider === "string" && provider.length > 0
      )
    )
  );

  const states = await Promise.all(
    uniqueProviders.map(async (provider) => ({
      provider,
      catalog: await getActiveSyncedCatalog(provider),
    }))
  );

  const providers: string[] = [];
  const excludedProviders: string[] = [];

  for (const { provider, catalog } of states) {
    const modelIsLive = catalog.models.some((model) => model.id === modelId);
    // Cursor auto-router: always allow `auto` / router variants even if a stale live
    // catalog omitted them (AvailableModels / agent list often returns wire id
    // `default` only; listing injects `auto` + cost/balance/intelligence).
    const cursorAutoAllow =
      provider === "cursor" &&
      (modelId === "auto" ||
        modelId === "default" ||
        modelId === "auto-cost" ||
        modelId === "auto-balance" ||
        modelId === "auto-intelligence");

    if (!catalog.authoritative || modelIsLive || cursorAutoAllow) {
      providers.push(provider);
    } else {
      excludedProviders.push(provider);
    }
  }

  return { providers, excludedProviders };
}
