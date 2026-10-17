/**
 * "New models" inbox — glue between model sync, the seen_models table and the
 * dashboard. The sync route records every successful listing here; the
 * Providers page reads the unread list through GET /api/models/new.
 */

import { reconcileSeenModels, listUnseenModels, countUnseenModels } from "@/lib/db/seenModels";
import type { ObservedModel } from "@/lib/db/seenModels";
import { getProviderNodeById } from "@/lib/db/providers/nodes";
import { getProviderById } from "@/shared/constants/providers";
import { getProviderDisplayName } from "@/lib/display/names";
import { isCompatibleProviderConnectionId } from "@/shared/utils/compatibleProviderId";
import { isFreeModel } from "@/shared/utils/freeModels";

export interface NewModelsInboxModel {
  modelId: string;
  isFree: boolean;
  firstSeenAt: string;
}

export interface NewModelsInboxGroup {
  provider: string;
  providerName: string;
  models: NewModelsInboxModel[];
}

export interface NewModelsInbox {
  totalUnseen: number;
  groups: NewModelsInboxGroup[];
}

function toObservedModel(providerId: string, raw: unknown): ObservedModel | null {
  if (typeof raw === "string") {
    return raw.trim() ? { modelId: raw, isFree: isFreeModel(providerId, { id: raw }) } : null;
  }
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  if (typeof record.id !== "string" || !record.id.trim()) return null;
  return {
    modelId: record.id,
    isFree: isFreeModel(providerId, {
      id: record.id,
      pricing: record.pricing,
      isFree: record.isFree === true,
      tags: record.tags,
    }),
  };
}

/**
 * Best-effort: record a provider's freshly synced listing. Never throws — the inbox
 * must not be able to fail a model sync.
 */
export function recordSyncedModelsForInbox(providerId: string, models: unknown): void {
  try {
    if (!providerId || !Array.isArray(models)) return;
    const observed: ObservedModel[] = [];
    for (const raw of models) {
      const model = toObservedModel(providerId, raw);
      if (model) observed.push(model);
    }
    reconcileSeenModels(providerId, observed);
  } catch (error) {
    console.warn(
      `[NewModelsInbox] Failed to record synced models for ${providerId}:`,
      error instanceof Error ? error.name : "unknown error"
    );
  }
}

async function resolveProviderName(providerId: string): Promise<string> {
  const known = getProviderById(providerId) as { name?: unknown } | undefined;
  if (typeof known?.name === "string" && known.name.trim()) return known.name;
  if (isCompatibleProviderConnectionId(providerId)) {
    try {
      const node = (await getProviderNodeById(providerId)) as {
        name?: string | null;
        prefix?: string | null;
      } | null;
      return getProviderDisplayName(providerId, node);
    } catch {
      // Fall through to the generic display name.
    }
  }
  return getProviderDisplayName(providerId);
}

/** Unread models grouped by provider, newest first within each group. */
export async function getNewModelsInbox(): Promise<NewModelsInbox> {
  const unseen = listUnseenModels();
  const byProvider = new Map<string, NewModelsInboxModel[]>();
  for (const entry of unseen) {
    const models = byProvider.get(entry.provider) ?? [];
    models.push({ modelId: entry.modelId, isFree: entry.isFree, firstSeenAt: entry.firstSeenAt });
    byProvider.set(entry.provider, models);
  }

  const groups: NewModelsInboxGroup[] = [];
  for (const [provider, models] of byProvider) {
    groups.push({ provider, providerName: await resolveProviderName(provider), models });
  }
  return { totalUnseen: countUnseenModels(), groups };
}
