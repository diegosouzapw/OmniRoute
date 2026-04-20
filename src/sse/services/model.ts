// Re-export from open-sse with localDb integration
import { getModelAliases, getComboByName, getProviderNodes, getCustomModels } from "@/lib/localDb";
import { getSettings } from "@/lib/localDb";
import { getComboStepTarget } from "@/lib/combos/steps";
import {
  parseModel,
  resolveModelAliasFromMap,
  getModelInfoCore,
} from "@omniroute/open-sse/services/model.ts";

export { parseModel };

/**
 * Resolve model alias from localDb
 */
export async function resolveModelAlias(alias) {
  const aliases = await getModelAliases();
  return resolveModelAliasFromMap(alias, aliases);
}

/**
 * Look up the apiFormat for a custom model from the DB.
 * Returns "responses" if the model is configured for the Responses API, otherwise undefined.
 */
async function lookupCustomModelApiFormat(
  providerId: string,
  modelId: string
): Promise<string | undefined> {
  try {
    const models = await getCustomModels(providerId);
    if (!Array.isArray(models)) return undefined;
    const match = models.find((m: any) => m.id === modelId);
    return match?.apiFormat === "responses" ? "responses" : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Get full model info (parse or resolve)
 */
export async function getModelInfo(modelStr) {
  const parsed = parseModel(modelStr);
  const { extendedContext } = parsed;

  // Check custom provider nodes first (for both alias and non-alias formats)
  if (parsed.providerAlias || parsed.provider) {
    // Ensure prefixToCheck is always a concise identifier, not a full model string
    const prefixToCheck = parsed.providerAlias || parsed.provider;

    // Check OpenAI Compatible nodes
    const openaiNodes = await getProviderNodes({ type: "openai-compatible" });
    const matchedOpenAI = openaiNodes.find((node) => node.prefix === prefixToCheck);
    if (matchedOpenAI) {
      const apiFormat = await lookupCustomModelApiFormat(
        matchedOpenAI.id as string,
        parsed.model as string
      );
      return {
        provider: matchedOpenAI.id,
        model: parsed.model,
        extendedContext,
        ...(apiFormat && { apiFormat }),
      };
    }

    // Check Anthropic Compatible nodes
    const anthropicNodes = await getProviderNodes({ type: "anthropic-compatible" });
    const matchedAnthropic = anthropicNodes.find((node) => node.prefix === prefixToCheck);
    if (matchedAnthropic) {
      const apiFormat = await lookupCustomModelApiFormat(
        matchedAnthropic.id as string,
        parsed.model as string
      );
      return {
        provider: matchedAnthropic.id,
        model: parsed.model,
        extendedContext,
        ...(apiFormat && { apiFormat }),
      };
    }

    // stripModelPrefix: if enabled, strip provider prefix and re-resolve
    // the bare model name using existing heuristics (claude-* → anthropic, etc.)
    try {
      const settings = await getSettings();
      if (settings.stripModelPrefix === true) {
        const strippedResult = await getModelInfoCore(parsed.model, getModelAliases);
        return { ...strippedResult, extendedContext };
      }
    } catch {
      // If settings read fails, fall through to normal resolution
    }
  }

  if (!parsed.isAlias) {
    return getModelInfoCore(modelStr, null);
  }

  return getModelInfoCore(modelStr, getModelAliases);
}

/**
 * Check if model is a combo and return the full combo object
 * @returns {Promise<Object|null>} Full combo object or null if not a combo
 */
export async function getCombo(modelStr) {
  // Check combo DB first (supports names with /)
  // Strip combo/ prefix if present
  const nameToSearch = modelStr.startsWith("combo/") ? modelStr.substring(6) : modelStr;
  const combo = await getComboByName(nameToSearch);
  if (combo && combo.models && combo.models.length > 0) {
    return combo;
  }
  return null;
}

/**
 * Check if model matches a combo by name OR by model-combo mapping pattern.
 * This augments getCombo() with glob-based model-to-combo resolution (#563).
 *
 * Resolution order:
 * 1. Exact combo name match (existing behavior)
 * 2. Model-combo mapping pattern match (new — glob patterns by priority)
 * 3. null (no combo — single-model request)
 */
export async function getComboForModel(modelStr) {
  // 1. Existing behavior — exact combo name match
  const combo = await getCombo(modelStr);
  if (combo) return combo;

  // 2. NEW — check model-combo mappings table (pattern match)
  try {
    const { resolveComboForModel } = await import("@/lib/localDb");
    const mapped = await resolveComboForModel(modelStr);
    if (mapped && (mapped as any).models?.length > 0) {
      return mapped;
    }
  } catch {
    // If the mappings table doesn't exist yet (pre-migration), continue gracefully
  }

  return null;
}

/**
 * Legacy: get combo models as string array
 * @returns {Promise<string[]|null>}
 */
export async function getComboModels(modelStr) {
  const combo = await getCombo(modelStr);
  if (!combo) return null;
  return (combo.models || [])
    .map((entry) => getComboStepTarget(entry))
    .filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}
