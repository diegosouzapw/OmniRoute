/**
 * Synced-model reasoning-effort catalog variants (#7694).
 *
 * Generic OpenAI-compatible model discovery (`src/lib/providerModels/modelDiscovery.ts`)
 * captures upstream `reasoning.supported_efforts` (or OmniRoute's own flat
 * `supportedThinkingEfforts` import field) into `SyncedAvailableModel.supportedThinkingEfforts`,
 * and the catalog builder (`src/app/api/v1/models/catalog.ts`) surfaces it as
 * `capabilities.effort_tiers`. Catalog-only clients (OpenCode, plain OpenAI-SDK model
 * pickers) can only choose a model by its `id`, so — mirroring `claudeEffortVariants.ts`'s
 * `<provider>/<model>-<level>` pattern for Claude — this module synthesizes one catalog
 * entry per declared tier:
 *
 *     <provider>/<model>-<tier>     e.g. myprovider/my-model-high
 *
 * The gateway already resolves these ids at request time
 * (`splitSyncedEffortSuffix` in `open-sse/services/model.ts`, wired through
 * `src/sse/services/model.ts`'s synced-metadata lookup): it strips the `-<tier>` suffix
 * back to the real base model and surfaces the tier as `reasoning_effort` before dispatch,
 * only when the base model's own `supportedThinkingEfforts` actually declares that tier —
 * never a blind string match.
 *
 * Skipped entirely for `codex` and `kimi`-owned models: both already own a conflicting
 * native `-{effort}` suffix mechanism (`splitCodexReasoningSuffix` /
 * `getKimiCodeStaticThinkingPolicy`), so double-registering here would collide with their
 * own alias resolution. Also skipped for any model whose id already ends in a token that
 * matches a canonical effort value, to avoid colliding with a model that legitimately ends
 * in an effort-like token (e.g. a model literally named "...-high").
 */
import { CANONICAL_EFFORT_VALUES } from "@/shared/reasoning/effortStandardization.ts";

/** Provider ids that already own a native `-{effort}` suffix mechanism — never double-register. */
export const SYNCED_EFFORT_SKIP_PROVIDERS = new Set(["codex"]);
/** Provider-id prefixes covering that mechanism's multiple connection variants (kimi-coding, kimi-coding-apikey). */
const SYNCED_EFFORT_SKIP_PROVIDER_PREFIXES = ["kimi"];

function isSkippedEffortProvider(ownedBy: string): boolean {
  return (
    SYNCED_EFFORT_SKIP_PROVIDERS.has(ownedBy) ||
    SYNCED_EFFORT_SKIP_PROVIDER_PREFIXES.some((prefix) => ownedBy.startsWith(prefix))
  );
}

interface CatalogModelEntry {
  id?: unknown;
  owned_by?: unknown;
  root?: unknown;
  name?: unknown;
  capabilities?: { effort_tiers?: unknown; [key: string]: unknown };
  [key: string]: unknown;
}

function endsWithKnownEffortToken(id: string): boolean {
  return CANONICAL_EFFORT_VALUES.some((value) => id.endsWith(`-${value}`));
}

function extractEffortTiers(model: CatalogModelEntry): string[] {
  const tiers = model.capabilities?.effort_tiers;
  if (!Array.isArray(tiers)) return [];
  return tiers.filter((tier): tier is string => typeof tier === "string" && tier.length > 0);
}

/**
 * Whether the catalog should advertise reasoning-effort variants for this entry.
 *
 * Rule: a synced model that declares `capabilities.effort_tiers`, is not owned by a
 * provider that already owns its own suffix mechanism, is not a virtual combo entry, and
 * whose id does not already end in a token that collides with a canonical effort value.
 */
export function shouldExposeSyncedEffortVariants(
  model: CatalogModelEntry
): model is CatalogModelEntry & { id: string } {
  if (!model || typeof model !== "object") return false;
  const id = model.id;
  if (typeof id !== "string" || id.length === 0) return false;
  if (model.owned_by === "combo") return false;
  if (typeof model.owned_by === "string" && isSkippedEffortProvider(model.owned_by)) {
    return false;
  }
  if (endsWithKnownEffortToken(id)) return false;
  return extractEffortTiers(model).length > 0;
}

/**
 * Append reasoning-effort variants for every eligible synced model. Returns the original
 * array reference unchanged when nothing is eligible (no allocation in the common case).
 * Derived from the already key-filtered/hidden-filtered catalog list, so a variant's base
 * fields (visibility, capabilities, pricing) are inherited by spreading the base entry
 * rather than re-running any filter — an alias never bypasses a filter the base model was
 * already subject to.
 */
export function appendSyncedEffortVariants<T extends CatalogModelEntry>(models: T[]): T[] {
  if (!Array.isArray(models)) return models;
  const variants: T[] = [];
  const existingIds = new Set(models.map((model) => model.id));

  for (const model of models) {
    if (!shouldExposeSyncedEffortVariants(model)) continue;
    const baseRoot = typeof model.root === "string" && model.root ? model.root : model.id;

    for (const tier of extractEffortTiers(model)) {
      const variantId = `${model.id}-${tier}`;
      if (existingIds.has(variantId)) continue;
      existingIds.add(variantId);
      variants.push({ ...model, id: variantId, root: `${baseRoot}-${tier}` });
    }
  }

  return variants.length > 0 ? [...models, ...variants] : models;
}
