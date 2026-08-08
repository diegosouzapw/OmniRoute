/**
 * @file steps.ts
 * @description Combo step normalization helpers for model, combo-ref, provider-wildcard, and routing metadata.
 *
 * @changes
 * - [2026-07-25] [Composer] - Preserve provider-wildcard steps during combo normalization
 */
type JsonRecord = Record<string, unknown>;

export const COMBO_SCHEMA_VERSION = 2;

export interface ComboModelStep {
  id: string;
  kind: "model";
  model: string;
  providerId?: string | null;
  connectionId?: string | null;
  /**
   * Account allowlist (#3266): scope this step's round-robin/weighted selection
   * to a subset of the provider's connections. Empty/absent = whole active pool.
   * Reuses the `allowedConnectionIds` plumbing tag routing already populates.
   */
  allowedConnectionIds?: string[] | null;
  weight: number;
  label?: string;
  prompt?: string | null;
  tags?: string[];
}

export interface ComboRefStep {
  id: string;
  kind: "combo-ref";
  comboName: string;
  weight: number;
  label?: string;
}

export interface ComboProviderWildcardStep {
  id: string;
  kind: "provider-wildcard";
  providerId: string;
  modelPattern: string;
  connectionId?: string | null;
  allowedConnectionIds?: string[] | null;
  weight: number;
  label?: string;
}

export type ComboStep = ComboModelStep | ComboRefStep | ComboProviderWildcardStep;

type ComboCollectionLike =
  | Array<{ name?: unknown } | string>
  | { combos?: Array<{ name?: unknown }> }
  | Iterable<string>
  | null
  | undefined;

interface NormalizeComboStepOptions {
  comboName?: string | null;
  index?: number;
  allCombos?: ComboCollectionLike;
}

interface NormalizeComboRecordOptions {
  allCombos?: ComboCollectionLike;
}

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toTrimmedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function toWeight(value: unknown): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : 0;

  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(100, parsed));
}

function collectComboNames(allCombos: ComboCollectionLike): Set<string> {
  const names = new Set<string>();
  if (!allCombos) return names;

  if (
    !Array.isArray(allCombos) &&
    typeof (allCombos as { [Symbol.iterator]?: unknown })[Symbol.iterator] === "function" &&
    !(isRecord(allCombos) && Array.isArray(allCombos.combos))
  ) {
    for (const value of allCombos as Iterable<string>) {
      const name = toTrimmedString(value);
      if (name) names.add(name);
    }
    return names;
  }

  const combosFromRecord =
    isRecord(allCombos) && Array.isArray(allCombos.combos) ? allCombos.combos : [];
  const combos = Array.isArray(allCombos) ? allCombos : combosFromRecord;

  for (const combo of combos) {
    const name = typeof combo === "string" ? toTrimmedString(combo) : toTrimmedString(combo?.name);
    if (name) names.add(name);
  }

  return names;
}

function parseProviderId(model: string): string | null {
  const trimmed = model.trim();
  const slashIndex = trimmed.indexOf("/");
  if (slashIndex <= 0) return null;
  const providerId = trimmed.slice(0, slashIndex).trim();
  return providerId.length > 0 ? providerId : null;
}

function parseProviderWildcardPattern(
  target: string
): { providerId: string; modelPattern: string } | null {
  const trimmed = target.trim();
  const slashIndex = trimmed.indexOf("/");
  if (slashIndex <= 0) return null;
  const providerId = trimmed.slice(0, slashIndex).trim();
  const modelPattern = trimmed.slice(slashIndex + 1).trim();
  if (!providerId || !modelPattern.includes("*")) return null;
  return { providerId, modelPattern };
}

function toFullModelString(model: string, providerId?: string | null): string {
  const trimmedModel = model.trim();
  if (trimmedModel.includes("/")) return trimmedModel;
  const normalizedProviderId = toTrimmedString(providerId);
  return normalizedProviderId ? `${normalizedProviderId}/${trimmedModel}` : trimmedModel;
}

function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.length > 0 ? slug : "step";
}

function buildStepId(
  kind: ComboStep["kind"],
  comboName: string | null,
  index: number,
  seed: string
) {
  const kindSlug =
    kind === "combo-ref" ? "ref" : kind === "provider-wildcard" ? "wildcard" : "model";
  const parts = [slugify(comboName || "combo"), kindSlug, String(index + 1), slugify(seed)];
  return parts.join("-").slice(0, 200);
}

function shouldTreatAsComboRef(
  target: string,
  providerId: string | null,
  options: NormalizeComboStepOptions
): boolean {
  if (providerId) return false;
  const comboNames = collectComboNames(options.allCombos);
  return comboNames.has(target) || target === toTrimmedString(options.comboName);
}

export function getComboStepWeight(value: unknown): number {
  if (typeof value === "string") return 0;
  if (!isRecord(value)) return 0;
  return toWeight(value.weight);
}

export function getComboModelString(value: unknown): string | null {
  if (typeof value === "string") return toTrimmedString(value);
  if (!isRecord(value) || value.kind === "combo-ref") return null;

  const rawModel = toTrimmedString(value.model);
  if (!rawModel) return null;

  const providerId =
    toTrimmedString(value.providerId) ||
    toTrimmedString(value.provider) ||
    parseProviderId(rawModel);

  return toFullModelString(rawModel, providerId);
}

export function getComboModelProvider(value: unknown): string | null {
  if (typeof value === "string") return parseProviderId(value);
  if (!isRecord(value) || value.kind === "combo-ref") return null;

  return (
    toTrimmedString(value.providerId) ||
    toTrimmedString(value.provider) ||
    parseProviderId(toTrimmedString(value.model) || "")
  );
}

export function getComboStepTarget(
  value: unknown,
  options: NormalizeComboStepOptions = {}
): string | null {
  if (typeof value === "string") {
    const target = toTrimmedString(value);
    if (!target) return null;
    return shouldTreatAsComboRef(target, null, options) ? target : target;
  }

  if (!isRecord(value)) return null;
  if (value.kind === "combo-ref") return toTrimmedString(value.comboName);
  if (value.kind === "provider-wildcard") {
    const providerId = toTrimmedString(value.providerId);
    const modelPattern = toTrimmedString(value.modelPattern) || "*";
    return providerId ? `${providerId}/${modelPattern}` : null;
  }

  const rawModel = toTrimmedString(value.model);
  if (!rawModel) return null;
  const isExplicitModel = value.kind === "model";
  const providerId =
    toTrimmedString(value.providerId) ||
    toTrimmedString(value.provider) ||
    parseProviderId(rawModel);

  if (!isExplicitModel && shouldTreatAsComboRef(rawModel, providerId, options)) {
    return rawModel;
  }

  return toFullModelString(rawModel, providerId);
}

export function normalizeComboStep(
  value: unknown,
  options: NormalizeComboStepOptions = {}
): ComboStep | null {
  const comboName = toTrimmedString(options.comboName);
  const index = typeof options.index === "number" ? options.index : 0;

  if (typeof value === "string") {
    const target = toTrimmedString(value);
    if (!target) return null;

    if (shouldTreatAsComboRef(target, null, options)) {
      return {
        id: buildStepId("combo-ref", comboName, index, target),
        kind: "combo-ref",
        comboName: target,
        weight: 0,
      };
    }

    const wildcardPattern = parseProviderWildcardPattern(target);
    if (wildcardPattern) {
      return {
        id: buildStepId(
          "provider-wildcard",
          comboName,
          index,
          `${wildcardPattern.providerId}/${wildcardPattern.modelPattern}`
        ),
        kind: "provider-wildcard",
        providerId: wildcardPattern.providerId,
        modelPattern: wildcardPattern.modelPattern,
        weight: 0,
      };
    }

    const providerId = parseProviderId(target);
    return {
      id: buildStepId("model", comboName, index, target),
      kind: "model",
      model: target,
      ...(providerId ? { providerId } : {}),
      weight: 0,
    };
  }

  if (!isRecord(value)) return null;

  const explicitId = toTrimmedString(value.id);
  const weight = toWeight(value.weight);
  const label = toTrimmedString(value.label);
  const prompt = toTrimmedString(value.prompt);

  if (value.kind === "combo-ref") {
    const comboRefName = toTrimmedString(value.comboName);
    if (!comboRefName) return null;
    return {
      id: explicitId || buildStepId("combo-ref", comboName, index, comboRefName),
      kind: "combo-ref",
      comboName: comboRefName,
      weight,
      ...(label ? { label } : {}),
    };
  }

  if (value.kind === "provider-wildcard") {
    const providerId =
      toTrimmedString(value.providerId) ||
      toTrimmedString(value.provider) ||
      parseProviderId(toTrimmedString(value.model) || "");
    if (!providerId) return null;
    const modelPattern = toTrimmedString(value.modelPattern) || "*";
    const connectionId =
      value.connectionId === null ? null : toTrimmedString(value.connectionId) || undefined;
    const allowedConnectionIds = Array.isArray(value.allowedConnectionIds)
      ? value.allowedConnectionIds
          .map((connId) => toTrimmedString(connId))
          .filter((connId): connId is string => !!connId)
      : undefined;
    return {
      id:
        explicitId ||
        buildStepId(
          "provider-wildcard",
          comboName,
          index,
          connectionId
            ? `${providerId}/${modelPattern}:${connectionId}`
            : `${providerId}/${modelPattern}`
        ),
      kind: "provider-wildcard",
      providerId,
      modelPattern,
      ...(connectionId !== undefined ? { connectionId } : {}),
      weight,
      ...(label ? { label } : {}),
      ...(allowedConnectionIds && allowedConnectionIds.length > 0 ? { allowedConnectionIds } : {}),
    };
  }

  const rawModel = toTrimmedString(value.model);
  if (!rawModel) return null;
  const isExplicitModel = value.kind === "model";

  const providerId =
    toTrimmedString(value.providerId) ||
    toTrimmedString(value.provider) ||
    parseProviderId(rawModel);

  const wildcardPattern = parseProviderWildcardPattern(rawModel);
  if (wildcardPattern) {
    const connectionId =
      value.connectionId === null ? null : toTrimmedString(value.connectionId) || undefined;
    const allowedConnectionIds = Array.isArray(value.allowedConnectionIds)
      ? value.allowedConnectionIds
          .map((connId) => toTrimmedString(connId))
          .filter((connId): connId is string => !!connId)
      : undefined;
    return {
      id:
        explicitId ||
        buildStepId(
          "provider-wildcard",
          comboName,
          index,
          connectionId
            ? `${wildcardPattern.providerId}/${wildcardPattern.modelPattern}:${connectionId}`
            : `${wildcardPattern.providerId}/${wildcardPattern.modelPattern}`
        ),
      kind: "provider-wildcard",
      providerId: wildcardPattern.providerId,
      modelPattern: wildcardPattern.modelPattern,
      ...(connectionId !== undefined ? { connectionId } : {}),
      weight,
      ...(label ? { label } : {}),
      ...(allowedConnectionIds && allowedConnectionIds.length > 0 ? { allowedConnectionIds } : {}),
    };
  }

  if (!isExplicitModel && shouldTreatAsComboRef(rawModel, providerId, options)) {
    return {
      id: explicitId || buildStepId("combo-ref", comboName, index, rawModel),
      kind: "combo-ref",
      comboName: rawModel,
      weight,
      ...(label ? { label } : {}),
    };
  }

  const model = toFullModelString(rawModel, providerId);
  const connectionId =
    value.connectionId === null ? null : toTrimmedString(value.connectionId) || undefined;
  const tags = Array.isArray(value.tags)
    ? value.tags.map((tag) => toTrimmedString(tag)).filter((tag): tag is string => !!tag)
    : undefined;
  const allowedConnectionIds = Array.isArray(value.allowedConnectionIds)
    ? value.allowedConnectionIds
        .map((connId) => toTrimmedString(connId))
        .filter((connId): connId is string => !!connId)
    : undefined;

  return {
    id:
      explicitId ||
      buildStepId("model", comboName, index, connectionId ? `${model}:${connectionId}` : model),
    kind: "model",
    model,
    ...(providerId ? { providerId } : {}),
    ...(connectionId !== undefined ? { connectionId } : {}),
    weight,
    ...(label ? { label } : {}),
    ...(prompt ? { prompt } : {}),
    ...(tags && tags.length > 0 ? { tags } : {}),
    ...(allowedConnectionIds && allowedConnectionIds.length > 0 ? { allowedConnectionIds } : {}),
  };
}

export function normalizeComboModels(
  models: unknown,
  options: Omit<NormalizeComboStepOptions, "index"> = {}
): ComboStep[] {
  const list = Array.isArray(models) ? models : [];
  return list
    .map((value, index) => normalizeComboStep(value, { ...options, index }))
    .filter((value): value is ComboStep => value !== null);
}

export function normalizeComboRecord<T extends JsonRecord>(
  combo: T,
  options: NormalizeComboRecordOptions = {}
): T & { version: 2; models: ComboStep[] } {
  const comboName = toTrimmedString(combo.name);
  return {
    ...combo,
    version: COMBO_SCHEMA_VERSION,
    models: normalizeComboModels(combo.models, {
      comboName,
      allCombos: options.allCombos,
    }),
  };
}
