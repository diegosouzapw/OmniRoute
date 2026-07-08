import { NextResponse } from "next/server";
import { getModelAliases, setModelAlias, getProviderConnections } from "@/models";
import { AI_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { updateModelAliasSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { hasEligibleConnectionForModel } from "@/domain/connectionModelRules";
import { getSettings } from "@/lib/db/settings";
import { isFreeModel, providerHasFreeModels } from "@/shared/utils/freeModels";

// GET /api/models - Get models with aliases (only from active providers by default)
export async function GET(request: Request) {
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

    const models = AI_MODELS.map((m: any) => {
      const fullModel = `${m.provider}/${m.model}`;
      const available = !activeProviders || activeProviders.has(m.provider);
      return {
        ...m,
        fullModel,
        alias: modelAliases[fullModel] || m.model,
        available,
      };
    }).filter((m: any) => showAll || m.available);

    // #6328 (follow-up to #6495): REMOVE — not just hide — paid models from the
    // dashboard model picker when the operator opts into hidePaidModels. Mirrors
    // the `shouldHidePaid` guard in `src/app/api/v1/models/catalog.ts` (public
    // catalog). Settings read fails open: on error we preserve pre-patch behavior.
    let hidePaid = false;
    try {
      const settings = await getSettings();
      hidePaid = settings?.hidePaidModels === true;
    } catch {}
    const filtered = hidePaid
      ? models.filter(
          (m: { provider: string; model: string }) => providerHasFreeModels(m.provider) && isFreeModel(m.provider, { id: m.model })
        )
      : models;

    return NextResponse.json({ models: filtered });
  } catch (error) {
    console.log("Error fetching models:", error);
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
  }
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
