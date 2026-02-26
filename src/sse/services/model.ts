// Re-export from open-sse with localDb integration
import { getModelAliases, getComboByName, getProviderNodes } from "@/lib/localDb";
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
 * Get full model info (parse or resolve)
 */
export async function getModelInfo(modelStr) {
  const parsed = parseModel(modelStr);

  // Check custom provider nodes first (for both alias and non-alias formats)
  // Check custom provider nodes first (for both alias and non-alias formats)
  if (parsed.providerAlias || parsed.provider) {
    // Ensure prefixToCheck is always a concise identifier, not a full model string
    const prefixToCheck = parsed.providerAlias || parsed.provider;

    // Check OpenAI Compatible nodes
    const openaiNodes = await getProviderNodes({ type: "openai-compatible" });
    const matchedOpenAI = openaiNodes.find((node) => node.prefix === prefixToCheck);
    if (matchedOpenAI) {
      return { provider: matchedOpenAI.id, model: parsed.model };
    }

    // Check Anthropic Compatible nodes
    const anthropicNodes = await getProviderNodes({ type: "anthropic-compatible" });
    const matchedAnthropic = anthropicNodes.find((node) => node.prefix === prefixToCheck);
    if (matchedAnthropic) {
      return { provider: matchedAnthropic.id, model: parsed.model };
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
  const combo = await getComboByName(modelStr);
  if (combo && combo.models && combo.models.length > 0) {
    return combo;
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
  return combo.models.map((m) => (typeof m === "string" ? m : m.model));
}
