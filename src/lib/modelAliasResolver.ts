/**
 * Model Alias Resolver — maps client-facing model names to OmniRoute provider IDs.
 *
 * When a client sends `model: "deepseek-chat"`, this resolver looks up the alias
 * in the database and rewrites it to the target model ID (e.g. `"ds/deepseek-v4-flash"`)
 * before the request reaches the chat handler.
 *
 * Aliases are stored in the `modelAliases` key-value namespace and seeded by
 * `src/lib/modelAliasSeed.ts`.
 */
import { getModelAliases } from "@/lib/db/models/aliases";
import { DEFAULT_MODEL_ALIAS_SEED } from "@/lib/modelAliasSeed";
import { getComboByName } from "@/lib/db/combos";
import { getModelIsHidden } from "@/lib/db/models";
import { resolveProviderId } from "@/shared/constants/providers";

let cachedAliases: Record<string, unknown> | null = null;
let lastFetch = 0;
const CACHE_TTL_MS = 60_000; // 1 minute

function isTargetModelHidden(provider: string, modelId: string): boolean {
  if (getModelIsHidden(provider, modelId)) return true;
  const canonicalProvider = resolveProviderId(provider);
  if (canonicalProvider !== provider && getModelIsHidden(canonicalProvider, modelId)) return true;
  return false;
}

async function loadAliases(): Promise<Record<string, unknown>> {
  const now = Date.now();
  if (cachedAliases && now - lastFetch < CACHE_TTL_MS) {
    return cachedAliases;
  }
  cachedAliases = await getModelAliases();
  lastFetch = now;
  return cachedAliases;
}

/**
 * Resolve a model alias to its target provider model ID, falling back to the
 * static DEFAULT_MODEL_ALIAS_SEED when the alias is not in the database.
 * If the alias maps to an array, returns the first element.
 * If no alias is found, returns the original model name unchanged.
 *
 * Named distinctly from `resolveModelAlias` (modelDeprecation.ts /
 * modelSpecs.ts, sync string→string) to avoid export collisions when both
 * modules are imported together.
 */
export async function resolveModelAliasWithSeedFallback(
  model: string | null | undefined
): Promise<string | null | undefined> {
  if (!model) return model;

  // Combo routing takes precedence over individual model aliases (#10124 / #9020)
  if (model.startsWith("combo/")) return model;
  const existingCombo = await getComboByName(model).catch(() => null);
  if (existingCombo) return model;

  const aliases = await loadAliases();
  const target = aliases[model] ?? (DEFAULT_MODEL_ALIAS_SEED as Record<string, unknown>)[model];

  if (target === undefined) return model;

  if (typeof target === "string") {
    const slashIndex = target.indexOf("/");
    if (slashIndex > 0) {
      const targetProvider = target.slice(0, slashIndex);
      const targetModel = target.slice(slashIndex + 1);
      if (isTargetModelHidden(targetProvider, targetModel)) {
        return model;
      }
    }
    return target;
  }

  if (Array.isArray(target) && target.length > 0) {
    const first = target[0];
    if (typeof first === "string") {
      const slashIndex = first.indexOf("/");
      if (slashIndex > 0) {
        const targetProvider = first.slice(0, slashIndex);
        const targetModel = first.slice(slashIndex + 1);
        if (isTargetModelHidden(targetProvider, targetModel)) {
          return model;
        }
      }
      return first;
    }
    return model;
  }

  if (typeof target === "object" && target !== null) {
    const t = target as { provider?: string; model?: string };
    if (t.provider && t.model) {
      if (isTargetModelHidden(t.provider, t.model)) {
        return model;
      }
      return `${t.provider}/${t.model}`;
    }
  }

  return model;
}

/**
 * Resolve model alias on a parsed request body in-place.
 * Mutates `body.model` if an alias is found.
 */
export async function resolveModelAliasWithSeedFallbackOnBody(
  body: Record<string, unknown> | null | undefined
): Promise<void> {
  if (!body || typeof body !== "object") return;
  body.model = await resolveModelAliasWithSeedFallback(body.model as string | null | undefined);
}

/**
 * Invalidate the alias cache (e.g. after a new alias is added).
 */
export function invalidateAliasCache(): void {
  cachedAliases = null;
  lastFetch = 0;
}
