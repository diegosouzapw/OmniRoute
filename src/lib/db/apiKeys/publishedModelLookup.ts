import { splitSyncedEffortSuffix } from "@omniroute/open-sse/services/model.ts";
import { getLearnedReasoningEffortForModel } from "@omniroute/open-sse/services/learnedReasoningEffortCaps.ts";
import { isSkippedEffortProvider } from "@omniroute/open-sse/utils/syncedEffortVariants.ts";
import { resolveProviderId } from "@/shared/constants/providers";
import { isReservedProviderPrefix } from "@/shared/constants/reservedProviderPrefixes";
import { checkKeyModelAccess } from "../apiKeyGroups";
import { getCustomModels, getModelIsHidden, getSyncedAvailableModelsByConnection } from "../models";
import { getCachedProviderNodes } from "../readCache";

/**
 * Published-model lookup for keys with "Disable Non-Public Models": resolves the
 * model a client addressed (by provider id or alias) to the synced/custom row it
 * stands for, keeping the alias form as strict as the provider that serves it.
 */

/**
 * #7694: `/v1/models` and the combo builder advertise `<model>-<tier>` variants for
 * synced models that declare `supportedThinkingEfforts`, and request routing strips
 * the tier back to the base model before dispatch. Resolve such an id to its base
 * discovered model — only for a tier that model itself declares — so the
 * published-model gate judges the base model instead of rejecting the variant.
 */
export function resolveSyncedEffortVariantBase(
  providerId: string,
  modelId: string,
  models: ReadonlyArray<{ id?: unknown; supportedThinkingEfforts?: unknown }>
): string | null {
  if (isSkippedEffortProvider(providerId)) return null;
  for (const candidate of models) {
    if (typeof candidate.id !== "string" || !Array.isArray(candidate.supportedThinkingEfforts)) {
      continue;
    }
    // Same tier set as routing (`effectiveKnownEfforts` in src/sse/services/model.ts):
    // learned upstream caps win over the synced declaration.
    const learned = getLearnedReasoningEffortForModel(candidate.id);
    const knownEfforts = learned ? [...learned] : candidate.supportedThinkingEfforts;
    const { baseModel, effort } = splitSyncedEffortSuffix(modelId, knownEfforts);
    if (effort && baseModel === candidate.id) return candidate.id;
  }
  return null;
}

// Chat routing hands a non-reserved prefix claimed by a compatible provider node
// to that node (src/sse/services/model.ts), so such a prefix must not be judged
// against the built-in provider whose alias it happens to match.
async function isPrefixClaimedByProviderNode(prefix: string): Promise<boolean> {
  if (isReservedProviderPrefix(prefix)) return false;
  const nodes = await getCachedProviderNodes();
  return nodes.some((node) => node?.prefix === prefix || node?.id === prefix);
}

/** The canonical provider id an alias prefix stands for, or null when it has none. */
async function canonicalProviderForAlias(prefix: string): Promise<string | null> {
  const canonicalId = resolveProviderId(prefix);
  if (canonicalId === prefix || (await isPrefixClaimedByProviderNode(prefix))) return null;
  return canonicalId;
}

// Synced and imported models are stored under the canonical provider id, while
// clients may address the provider by its alias (`sx/tts-rt-v2` for `soniox`).
// The literal prefix is tried first so a provider id that doubles as another
// provider's alias keeps its current meaning.
export async function findPublishedModel(
  providerOrAlias: string,
  shortModelId: string
): Promise<{ providerId: string; publishedModelId: string } | null> {
  const providerIds = [providerOrAlias];
  const canonicalId = await canonicalProviderForAlias(providerOrAlias);
  if (canonicalId) providerIds.push(canonicalId);

  for (const providerId of providerIds) {
    const [syncedModelsByConnection, customModels] = await Promise.all([
      getSyncedAvailableModelsByConnection(providerId),
      getCustomModels(providerId),
    ]);
    const syncedModels = Object.values(syncedModelsByConnection).flat();
    const publishedModelId = syncedModels.concat(customModels).some((m) => m.id === shortModelId)
      ? shortModelId
      : resolveSyncedEffortVariantBase(providerId, shortModelId, syncedModels);
    if (publishedModelId) return { providerId, publishedModelId };
  }
  return null;
}

/** Hidden under the canonical id, or under the alias the client used. */
export function isPublishedModelHidden(
  providerId: string,
  providerOrAlias: string,
  publishedModelId: string
): boolean {
  return (
    getModelIsHidden(providerId, publishedModelId) ||
    (providerId !== providerOrAlias && getModelIsHidden(providerOrAlias, publishedModelId))
  );
}

/**
 * A key-group deny rule written against the canonical provider must also stop the
 * alias form (`sx/…` for a rule on `soniox`). Only explicit denies are applied, so
 * allow rules written against the alias keep working.
 */
export async function isDeniedUnderCanonicalProvider(
  apiKeyId: string,
  provider: string | undefined,
  modelTarget: string
): Promise<boolean> {
  const canonicalProvider = provider ? await canonicalProviderForAlias(provider) : null;
  if (!canonicalProvider) return false;
  return Boolean(
    checkKeyModelAccess(apiKeyId, modelTarget, canonicalProvider).deniedBy ||
    checkKeyModelAccess(apiKeyId, `${canonicalProvider}/${modelTarget}`, canonicalProvider).deniedBy
  );
}
