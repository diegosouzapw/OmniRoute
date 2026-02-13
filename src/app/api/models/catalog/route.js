import { getProviderConnections, getAllCustomModels } from "@/lib/localDb";
import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { getAllEmbeddingModels } from "@omniroute/open-sse/config/embeddingRegistry.js";
import { getAllImageModels } from "@omniroute/open-sse/config/imageRegistry.js";
import { AI_PROVIDERS, ALIAS_TO_ID } from "@/shared/constants/providers";

/**
 * GET /api/models/catalog
 * Returns all models grouped by provider, with metadata (type, custom flag)
 */
export async function GET() {
  try {
    const connections = await getProviderConnections();
    const activeProviders = new Set(connections.map((c) => c.provider));
    const customModelsMap = await getAllCustomModels().catch(() => ({}));

    const catalog = {};

    // Built-in chat models
    for (const [alias, models] of Object.entries(PROVIDER_MODELS)) {
      const providerId = ALIAS_TO_ID[alias] || alias;
      if (!catalog[alias]) {
        catalog[alias] = {
          provider: AI_PROVIDERS[providerId]?.name || alias,
          active: activeProviders.has(providerId),
          models: [],
        };
      }

      for (const model of models) {
        catalog[alias].models.push({
          id: `${alias}/${model.id}`,
          name: model.name,
          type: "chat",
          custom: false,
        });
      }
    }

    // Embedding models
    for (const emb of getAllEmbeddingModels()) {
      const parts = emb.id.split("/");
      const provAlias = parts[0];
      if (!catalog[provAlias]) {
        catalog[provAlias] = {
          provider: provAlias,
          active: false,
          models: [],
        };
      }
      catalog[provAlias].models.push({
        id: emb.id,
        name: emb.name || emb.id,
        type: "embedding",
        custom: false,
      });
    }

    // Image models
    for (const img of getAllImageModels()) {
      const provAlias = img.provider;
      if (!catalog[provAlias]) {
        catalog[provAlias] = {
          provider: provAlias,
          active: false,
          models: [],
        };
      }
      catalog[provAlias].models.push({
        id: img.id,
        name: img.name || img.id,
        type: "image",
        custom: false,
      });
    }

    // Custom models
    for (const [providerId, models] of Object.entries(customModelsMap)) {
      const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
      if (!catalog[alias]) {
        catalog[alias] = {
          provider: AI_PROVIDERS[providerId]?.name || alias,
          active: activeProviders.has(providerId),
          models: [],
        };
      }

      for (const model of models) {
        const fullId = `${alias}/${model.id}`;
        // Skip duplicates
        if (catalog[alias].models.some((m) => m.id === fullId)) continue;
        catalog[alias].models.push({
          id: fullId,
          name: model.name || model.id,
          type: "chat",
          custom: true,
        });
      }
    }

    return Response.json({ catalog });
  } catch (error) {
    return Response.json(
      { error: { message: error.message, type: "server_error" } },
      { status: 500 }
    );
  }
}
