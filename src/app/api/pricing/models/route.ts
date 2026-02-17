import { NextResponse } from "next/server";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.js";
import { getAllCustomModels, getPricing } from "@/lib/localDb";

/**
 * GET /api/pricing/models
 * Returns the full model catalog merged from three sources:
 *  1. providerRegistry (hardcoded)
 *  2. customModels (DB — user-added or imported via /models)
 *  3. pricing data (DB — models with pricing configured but not in sources 1/2)
 */
export async function GET() {
  try {
    const catalog = {};

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

    // ── 2. Custom models (DB) ───────────────────────────────────────
    let customModelsMap = {};
    try {
      customModelsMap = await getAllCustomModels();
    } catch {
      /* DB may not be ready */
    }

    for (const [providerId, models] of Object.entries(customModelsMap)) {
      // Resolve alias — check if a registry entry maps this providerId
      let alias = providerId;
      for (const entry of Object.values(REGISTRY)) {
        if (entry.id === providerId) {
          alias = entry.alias || entry.id;
          break;
        }
      }

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

      const existingIds = new Set(catalog[alias].models.map((m) => m.id));
      for (const model of models) {
        if (!existingIds.has(model.id)) {
          catalog[alias].models.push({
            id: model.id,
            name: model.name || model.id,
            custom: true,
          });
          existingIds.add(model.id);
        }
      }
    }

    // ── 3. Pricing-only models (DB) ─────────────────────────────────
    let pricingData = {};
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
