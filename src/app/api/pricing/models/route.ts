import { NextResponse } from "next/server";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getAllCustomModels, getAllSyncedAvailableModels, getPricing } from "@/lib/localDb";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asModelArray(value: unknown): Array<{ id?: string; name?: string }> {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => item && typeof item === "object") as Array<{
    id?: string;
    name?: string;
  }>;
}

/**
 * GET /api/pricing/models
 * Returns the full model catalog merged from three sources:
 *  1. providerRegistry (hardcoded)
 *  2. syncedAvailableModels (DB — discovered/imported from provider /models)
 *  3. customModels (DB — manually added models)
 *  4. pricing data (DB — models with pricing configured but not in sources 1/2/3)
 */
export async function GET() {
  try {
    const catalog: Record<string, any> = {};

    // ── 1. Registry models (hardcoded) ──────────────────────────────
    for (const entry of Object.values(REGISTRY)) {
      const alias = entry.alias || entry.id;
      if (!entry.models || entry.models.length === 0) continue;

      catalog[alias] = {
        id: entry.id,
        alias,
        name: entry.id.charAt(0).toUpperCase() + entry.id.slice(1),
        authType: entry.authType || "unknown",
        format: entry.format || "openai",
        models: entry.models.map((m) => ({
          id: m.id,
          name: m.name || m.id,
          custom: false,
        })),
      };
    }

    const resolveAlias = (providerId: string) => {
      for (const entry of Object.values(REGISTRY)) {
        if (entry.id === providerId) return entry.alias || entry.id;
      }
      return providerId;
    };

    const ensureCatalogProvider = (providerId: string, alias: string) => {
      if (!catalog[alias]) {
        catalog[alias] = {
          id: providerId,
          alias,
          name: providerId.charAt(0).toUpperCase() + providerId.slice(1),
          authType: "unknown",
          format: "openai",
          models: [],
        };
      }
      return catalog[alias];
    };

    const appendDbModels = (providerId: string, rawModels: unknown) => {
      const models = asModelArray(rawModels);
      const alias = resolveAlias(providerId);
      const providerCatalog = ensureCatalogProvider(providerId, alias);
      const existingIds = new Set(providerCatalog.models.map((m) => m.id));

      for (const model of models) {
        const modelId = typeof model.id === "string" ? model.id : null;
        if (!modelId || existingIds.has(modelId)) continue;
        providerCatalog.models.push({
          id: modelId,
          name: typeof model.name === "string" && model.name.trim() ? model.name : modelId,
          custom: true,
        });
        existingIds.add(modelId);
      }
    };

    // ── 2. Synced available models (DB) ─────────────────────────────
    let syncedModelsMap: Record<string, unknown> = {};
    try {
      syncedModelsMap = asRecord(await getAllSyncedAvailableModels());
    } catch {
      /* DB may not be ready */
    }

    for (const [providerId, rawModels] of Object.entries(syncedModelsMap)) {
      appendDbModels(providerId, rawModels);
    }

    // ── 3. Custom models (DB) ───────────────────────────────────────
    let customModelsMap: Record<string, unknown> = {};
    try {
      customModelsMap = asRecord(await getAllCustomModels());
    } catch {
      /* DB may not be ready */
    }

    for (const [providerId, rawModels] of Object.entries(customModelsMap)) {
      appendDbModels(providerId, rawModels);
    }

    // ── 4. Pricing-only models (DB) ─────────────────────────────────
    let pricingData: Record<string, any> = {};
    try {
      pricingData = await getPricing();
    } catch {
      /* DB may not be ready */
    }

    for (const [providerAlias, models] of Object.entries(pricingData)) {
      if (!catalog[providerAlias]) {
        catalog[providerAlias] = {
          id: providerAlias,
          alias: providerAlias,
          name: providerAlias.charAt(0).toUpperCase() + providerAlias.slice(1),
          authType: "unknown",
          format: "openai",
          models: [],
        };
      }

      const existingIds = new Set(catalog[providerAlias].models.map((m) => m.id));
      for (const modelId of Object.keys(models)) {
        if (!existingIds.has(modelId)) {
          catalog[providerAlias].models.push({
            id: modelId,
            name: modelId,
            custom: true,
          });
          existingIds.add(modelId);
        }
      }
    }

    // Add modelCount to each entry
    for (const entry of Object.values(catalog)) {
      entry.modelCount = entry.models.length;
    }

    return NextResponse.json(catalog);
  } catch (error) {
    console.error("Error fetching model catalog:", error);
    return NextResponse.json({ error: "Failed to fetch model catalog" }, { status: 500 });
  }
}
