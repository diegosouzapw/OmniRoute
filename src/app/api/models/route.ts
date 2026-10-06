import { NextResponse } from "next/server";
import { getModelAliases, setModelAlias, getProviderConnections } from "@/models";
import { AI_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { updateModelAliasSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { hasEligibleConnectionForModel } from "@/domain/connectionModelRules";
import { getSettings } from "@/lib/db/settings";
import {
  createModelCapabilityResolutionSnapshot,
  getResolvedModelCapabilities,
} from "@/lib/modelCapabilities";
import { isFreeModel, providerHasFreeModels } from "@/shared/utils/freeModels";
import { getAllActiveSyncedModels } from "@/lib/db/models/activeSyncedCatalog";
import { providerUsesExclusiveSyncedListing } from "@/lib/providers/modelListingCapability";
import {
  buildSyncedModelIdsByCanonicalProvider,
  shouldSuppressStaticModelForExclusiveListing,
} from "@/app/api/v1/models/catalogSyncedCoverage";
import { buildAliasMaps } from "@/app/api/v1/models/catalogProviderMaps";
import { resolveCanonicalProviderId as resolveCanonicalProviderIdFromMaps } from "@/app/api/v1/models/catalogProviderMaps";

interface GetModelsDependencies {
  createCapabilitySnapshot?: typeof createModelCapabilityResolutionSnapshot;
}

// GET /api/models - Get models with aliases (only from active providers by default)
export async function handleGetModels(request: Request, dependencies: GetModelsDependencies = {}) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    const modelAliases = await getModelAliases();

    // Get active provider connections to filter available models
    let activeProviders: Set<string> | null = null;
    if (!showAll) {
      try {
        const connections = await getProviderConnections();
        const active = connections.filter((c: any) => c.isActive !== false);
        // Include both provider IDs and their aliases in the active set.
        // PROVIDER_MODELS keys are aliases (e.g. 'cc' for 'claude', 'gh' for 'github').
        // DB connections are stored under provider IDs ('claude', 'github').
        // Without this, models for aliased providers always appear unconfigured.
        activeProviders = new Set<string>();
        for (const c of active) {
          const pId = String((c as Record<string, unknown>).provider);
          activeProviders.add(pId);
          const alias = PROVIDER_ID_TO_ALIAS[pId];
          if (alias) activeProviders.add(alias);
        }
        const connectionsByProvider = new Map<string, typeof active>();
        const registerConnectionKey = (
          key: string | null | undefined,
          connection: (typeof active)[number]
        ) => {
          if (!key) return;
          const existing = connectionsByProvider.get(key) || [];
          existing.push(connection);
          connectionsByProvider.set(key, existing);
        };
        for (const connection of active) {
          registerConnectionKey(connection.provider, connection);
          registerConnectionKey(PROVIDER_ID_TO_ALIAS[connection.provider], connection);
        }
        const getConnectionsForProvider = (...keys: Array<string | null | undefined>) => {
          const seen = new Set<string>();
          const collected: typeof active = [];
          for (const key of keys) {
            if (!key) continue;
            for (const connection of connectionsByProvider.get(key) || []) {
              if (!connection?.id || seen.has(connection.id)) continue;
              seen.add(connection.id);
              collected.push(connection);
            }
          }
          return collected;
        };

        activeProviders = new Set(
          AI_MODELS.flatMap((model: any) => {
            const providerKeys = [model.provider, PROVIDER_ID_TO_ALIAS[model.provider]];
            return hasEligibleConnectionForModel(
              getConnectionsForProvider(...providerKeys),
              model.model
            )
              ? providerKeys.filter(Boolean)
              : [];
          })
        );
      } catch {
        // If DB unavailable, show all models
      }
    }

    // #6328 (follow-up to #6495): REMOVE — not just hide — paid models from the
    // dashboard model picker when the operator opts into hidePaidModels. Mirrors
    // the `shouldHidePaid` guard in `src/app/api/v1/models/catalog.ts` (public
    // catalog). Settings read fails open: on error we preserve pre-patch behavior.
    let hidePaid = false;
    try {
      const settings = await getSettings();
      hidePaid = settings?.hidePaidModels === true;
    } catch {}

    // Filter before capability resolution so unavailable/paid rows cannot trigger
    // needless capability work. One request-local snapshot supplies all persisted
    // capability and custom-vision rows to the remaining resolutions.
    const candidates = AI_MODELS.filter((model: any) => {
      if (!showAll && activeProviders && !activeProviders.has(model.provider)) return false;
      return (
        !hidePaid ||
        (providerHasFreeModels(model.provider) && isFreeModel(model.provider, { id: model.model }))
      );
    });
    const capabilitySnapshot = (
      dependencies.createCapabilitySnapshot ?? createModelCapabilityResolutionSnapshot
    )();

    // #10615: a static row can be `available: true` here while /v1/models has already
    // dropped it because a provider's live-synced catalog covers it (or, for
    // exclusive-listing providers like Cursor, replaces the static list entirely).
    // Recompute the same suppression /v1/models applies so the two endpoints agree.
    let syncedModelIdsByCanonicalProvider = new Map<string, Set<string>>();
    let resolveCanonicalProviderIdForStatic: (alias: string) => string = (alias) => alias;
    try {
      const syncedModelsByProvider = await getAllActiveSyncedModels();
      const { aliasToProviderId, providerIdToAlias } = buildAliasMaps();
      const resolve = (aliasOrId: string, fallbackProviderId?: string) =>
        resolveCanonicalProviderIdFromMaps(aliasToProviderId, aliasOrId, fallbackProviderId);
      resolveCanonicalProviderIdForStatic = (alias: string) => resolve(alias);
      syncedModelIdsByCanonicalProvider = buildSyncedModelIdsByCanonicalProvider(
        syncedModelsByProvider,
        resolve,
        {},
        providerIdToAlias
      );
    } catch {
      // Synced catalog unavailable — fall through with static-only availability.
    }

    const models = candidates.map((m: any) => {
      const fullModel = `${m.provider}/${m.model}`;
      const canonicalProviderId = resolveCanonicalProviderIdForStatic(m.provider);
      const syncedForProvider = syncedModelIdsByCanonicalProvider.get(canonicalProviderId);
      const providerHasSynced = syncedForProvider !== undefined && syncedForProvider.size > 0;
      const suppressedBySync = shouldSuppressStaticModelForExclusiveListing({
        exclusiveListing: providerUsesExclusiveSyncedListing(canonicalProviderId),
        providerHasSynced,
        staticModelId: m.model,
        syncedModelIds: syncedForProvider ? [...syncedForProvider] : [],
      });
      const available =
        (!activeProviders || activeProviders.has(m.provider)) && !suppressedBySync;
      return {
        ...m,
        fullModel,
        alias: modelAliases[fullModel] || m.model,
        available,
        supportsVision:
          getResolvedModelCapabilities(fullModel, undefined, capabilitySnapshot).supportsVision ===
          true,
      };
    });

    return NextResponse.json({ models });
  } catch (error) {
    console.log("Error fetching models:", error);
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return handleGetModels(request);
}

// PUT /api/models - Update model alias
export async function PUT(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(updateModelAliasSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { model, alias } = validation.data;

    const modelAliases = await getModelAliases();

    // Check if alias already exists for different model
    const existingModel = Object.entries(modelAliases).find(
      ([key, val]) => val === alias && key !== model
    );

    if (existingModel) {
      return NextResponse.json({ error: "Alias already in use" }, { status: 400 });
    }

    // Update alias
    await setModelAlias(model, alias);

    return NextResponse.json({ success: true, model, alias });
  } catch (error) {
    console.log("Error updating alias:", error);
    return NextResponse.json({ error: "Failed to update alias" }, { status: 500 });
  }
}
