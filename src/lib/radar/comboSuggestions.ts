import type { ComboBuilderProviderOption } from "../combos/builderOptions";

import type { MergedEntry } from "./applyFeed";

export interface RadarComboSuggestionModel {
  providerId: string;
  providerName: string;
  modelId: string;
  qualifiedModel: string;
  displayName: string;
  monthlyTokens: number;
}

export interface RadarComboSuggestionPayload {
  name: string;
  strategy: "priority";
  models: Array<{
    kind: "model";
    providerId: string;
    model: string;
    weight: 0;
  }>;
}

export interface RadarComboSuggestion {
  familyId: string;
  name: string;
  alreadyExists: boolean;
  models: RadarComboSuggestionModel[];
  payload: RadarComboSuggestionPayload;
}

export interface BuildRadarComboSuggestionsInput {
  entries: readonly MergedEntry[];
  providers: readonly ComboBuilderProviderOption[];
  existingComboNames: Iterable<string>;
}

function compareText(left: string, right: string): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function normalizedIdentity(value: string | null | undefined): string {
  return value?.trim().toLowerCase() ?? "";
}

function resolveProvider(
  providerIdentity: string,
  providers: readonly ComboBuilderProviderOption[]
): ComboBuilderProviderOption | null {
  const identity = normalizedIdentity(providerIdentity);
  if (!identity) return null;

  const active = providers.filter((provider) => provider.activeConnectionCount > 0);
  const selectors: Array<(provider: ComboBuilderProviderOption) => string | null | undefined> = [
    (provider) => provider.providerId,
    (provider) => provider.alias,
    (provider) => provider.prefix,
  ];

  for (const select of selectors) {
    const matches = active.filter((provider) => normalizedIdentity(select(provider)) === identity);
    if (matches.length === 1) return matches[0];
    if (matches.length > 1) return null;
  }

  return null;
}

function stableHash(value: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function comboNameForFamily(familyId: string): string {
  const safeFamily =
    familyId
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "family";
  const fullName = `radar-${safeFamily}`;
  if (fullName.length <= 100) return fullName;

  const hash = stableHash(familyId);
  const availableFamilyLength = 100 - "radar-".length - 1 - hash.length;
  return `radar-${safeFamily.slice(0, availableFamilyLength)}-${hash}`;
}

function compareModels(left: RadarComboSuggestionModel, right: RadarComboSuggestionModel): number {
  return (
    right.monthlyTokens - left.monthlyTokens ||
    compareText(left.providerId, right.providerId) ||
    compareText(left.modelId, right.modelId)
  );
}

/** Build pure, deterministic combo proposals from curated Radar families and live provider options. */
export function buildRadarComboSuggestions(
  input: BuildRadarComboSuggestionsInput
): RadarComboSuggestion[] {
  const families = new Map<string, Map<string, RadarComboSuggestionModel>>();

  for (const entry of input.entries) {
    const familyId = entry.familyId?.trim();
    if (!familyId || entry.enabled === false) continue;

    const provider = resolveProvider(entry.provider, input.providers);
    if (!provider) continue;
    const model = provider.models.find((candidate) => candidate.id === entry.modelId);
    if (!model) continue;

    const candidate: RadarComboSuggestionModel = {
      providerId: provider.providerId,
      providerName: provider.displayName,
      modelId: entry.modelId,
      qualifiedModel: model.qualifiedModel,
      displayName: entry.displayName,
      monthlyTokens: entry.monthlyTokens,
    };
    const byProvider = families.get(familyId) ?? new Map<string, RadarComboSuggestionModel>();
    const current = byProvider.get(provider.providerId);
    if (!current || compareModels(candidate, current) < 0) {
      byProvider.set(provider.providerId, candidate);
    }
    families.set(familyId, byProvider);
  }

  const existingNames = new Set(
    [...input.existingComboNames].map((name) => normalizedIdentity(name)).filter(Boolean)
  );
  const suggestions: RadarComboSuggestion[] = [];

  for (const familyId of [...families.keys()].sort(compareText)) {
    const models = [...(families.get(familyId)?.values() ?? [])].sort(compareModels);
    if (models.length < 2) continue;

    const name = comboNameForFamily(familyId);
    suggestions.push({
      familyId,
      name,
      alreadyExists: existingNames.has(normalizedIdentity(name)),
      models,
      payload: {
        name,
        strategy: "priority",
        models: models.map((model) => ({
          kind: "model",
          providerId: model.providerId,
          model: model.qualifiedModel,
          weight: 0,
        })),
      },
    });
  }

  return suggestions;
}
