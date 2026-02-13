import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import { getProviderConnections, getCombos, getAllCustomModels } from "@/lib/localDb";
import { getAllEmbeddingModels } from "@omniroute/open-sse/config/embeddingRegistry.js";
import { getAllImageModels } from "@omniroute/open-sse/config/imageRegistry.js";

const FALLBACK_ALIAS_TO_PROVIDER = {
  ag: "antigravity",
  cc: "claude",
  cl: "cline",
  cu: "cursor",
  cx: "codex",
  gc: "gemini-cli",
  gh: "github",
  if: "iflow",
  kc: "kilocode",
  kmc: "kimi-coding",
  kr: "kiro",
  qw: "qwen",
};

function buildAliasMaps() {
  const aliasToProviderId = {};
  const providerIdToAlias = {};

  // Canonical source for ID/alias pairs used across dashboard/provider config.
  for (const provider of Object.values(AI_PROVIDERS)) {
    const providerId = provider?.id;
    const alias = provider?.alias || providerId;
    if (!providerId) continue;
    aliasToProviderId[providerId] = providerId;
    aliasToProviderId[alias] = providerId;
    if (!providerIdToAlias[providerId]) {
      providerIdToAlias[providerId] = alias;
    }
  }

  for (const [left, right] of Object.entries(PROVIDER_ID_TO_ALIAS)) {
    // Handle both possible directions:
    // - providerId -> alias
    // - alias -> providerId
    if (PROVIDER_MODELS[left]) {
      aliasToProviderId[left] = aliasToProviderId[left] || right;
      continue;
    }
    if (PROVIDER_MODELS[right]) {
      aliasToProviderId[right] = aliasToProviderId[right] || left;
      continue;
    }
    aliasToProviderId[right] = aliasToProviderId[right] || left;
  }

  for (const alias of Object.keys(PROVIDER_MODELS)) {
    if (!aliasToProviderId[alias]) {
      aliasToProviderId[alias] = alias;
    }
  }

  for (const [alias, providerId] of Object.entries(aliasToProviderId)) {
    if (!providerIdToAlias[providerId]) {
      providerIdToAlias[providerId] = alias;
    }
  }

  // Safety net for environments where alias maps are partially loaded during
  // module initialization/circular imports.
  for (const [alias, providerId] of Object.entries(FALLBACK_ALIAS_TO_PROVIDER)) {
    if (!aliasToProviderId[alias]) aliasToProviderId[alias] = providerId;
    if (!aliasToProviderId[providerId]) aliasToProviderId[providerId] = providerId;
    if (!providerIdToAlias[providerId]) providerIdToAlias[providerId] = alias;
  }

  return { aliasToProviderId, providerIdToAlias };
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * GET /v1/models - OpenAI compatible models list
 * Returns models from all active providers, combos, embeddings, and image models in OpenAI format
 */
export async function GET() {
  try {
    const { aliasToProviderId, providerIdToAlias } = buildAliasMaps();

    // Get active provider connections
    let connections = [];
    try {
      connections = await getProviderConnections();
      // Filter to only active connections
      connections = connections.filter((c) => c.isActive !== false);
    } catch (e) {
      // If database not available, return all models
      console.log("Could not fetch providers, returning all models");
    }

    // Get combos
    let combos = [];
    try {
      combos = await getCombos();
    } catch (e) {
      console.log("Could not fetch combos");
    }

    // Build set of active provider aliases
    const activeAliases = new Set();
    for (const conn of connections) {
      const alias = providerIdToAlias[conn.provider] || conn.provider;
      activeAliases.add(alias);
      activeAliases.add(conn.provider);
    }

    // Collect models from active providers (or all if none active)
    const models = [];
    const timestamp = Math.floor(Date.now() / 1000);

    // Add combos first (they appear at the top)
    for (const combo of combos) {
      models.push({
        id: combo.name,
        object: "model",
        created: timestamp,
        owned_by: "combo",
        permission: [],
        root: combo.name,
        parent: null,
      });
    }

    // Add provider models (chat)
    for (const [alias, providerModels] of Object.entries(PROVIDER_MODELS)) {
      const providerId = aliasToProviderId[alias] || alias;
      const canonicalProviderId = FALLBACK_ALIAS_TO_PROVIDER[alias] || providerId;

      // If we have active providers, only include those; otherwise include all
      if (
        connections.length > 0 &&
        !activeAliases.has(alias) &&
        !activeAliases.has(canonicalProviderId)
      ) {
        continue;
      }

      for (const model of providerModels) {
        const aliasId = `${alias}/${model.id}`;
        models.push({
          id: aliasId,
          object: "model",
          created: timestamp,
          owned_by: canonicalProviderId,
          permission: [],
          root: model.id,
          parent: null,
        });

        // Add provider-id prefix in addition to short alias (ex: kiro/model + kr/model).
        // This improves compatibility for clients that expect full provider names.
        if (canonicalProviderId !== alias) {
          models.push({
            id: `${canonicalProviderId}/${model.id}`,
            object: "model",
            created: timestamp,
            owned_by: canonicalProviderId,
            permission: [],
            root: model.id,
            parent: aliasId,
          });
        }
      }
    }

    // Add embedding models
    for (const embModel of getAllEmbeddingModels()) {
      models.push({
        id: embModel.id,
        object: "model",
        created: timestamp,
        owned_by: embModel.provider,
        type: "embedding",
        dimensions: embModel.dimensions,
      });
    }

    // Add image models
    for (const imgModel of getAllImageModels()) {
      models.push({
        id: imgModel.id,
        object: "model",
        created: timestamp,
        owned_by: imgModel.provider,
        type: "image",
        supported_sizes: imgModel.supportedSizes,
      });
    }

    // Add custom models (user-defined)
    try {
      const customModelsMap = await getAllCustomModels();
      for (const [providerId, providerCustomModels] of Object.entries(customModelsMap)) {
        const alias = providerIdToAlias[providerId] || providerId;
        const canonicalProviderId = FALLBACK_ALIAS_TO_PROVIDER[alias] || providerId;
        // Only include if provider is active (or no connections configured)
        if (
          connections.length > 0 &&
          !activeAliases.has(alias) &&
          !activeAliases.has(canonicalProviderId)
        )
          continue;

        for (const model of providerCustomModels) {
          // Skip if already added as built-in
          const aliasId = `${alias}/${model.id}`;
          if (models.some((m) => m.id === aliasId)) continue;

          models.push({
            id: aliasId,
            object: "model",
            created: timestamp,
            owned_by: canonicalProviderId,
            permission: [],
            root: model.id,
            parent: null,
            custom: true,
          });

          if (canonicalProviderId !== alias) {
            const providerPrefixedId = `${canonicalProviderId}/${model.id}`;
            if (models.some((m) => m.id === providerPrefixedId)) continue;
            models.push({
              id: providerPrefixedId,
              object: "model",
              created: timestamp,
              owned_by: canonicalProviderId,
              permission: [],
              root: model.id,
              parent: aliasId,
              custom: true,
            });
          }
        }
      }
    } catch (e) {
      console.log("Could not fetch custom models");
    }

    return Response.json(
      {
        object: "list",
        data: models,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.log("Error fetching models:", error);
    return Response.json(
      { error: { message: error.message, type: "server_error" } },
      { status: 500 }
    );
  }
}
