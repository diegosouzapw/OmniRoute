import { MODEL_COMPAT_PROTOCOL_KEYS } from "@/shared/constants/modelCompat";
import { isForbiddenUpstreamHeaderName } from "@/shared/constants/upstreamHeaders";
import type {
  ProviderModelCapabilities,
  ProviderModelCapabilitiesPatch,
} from "@/shared/types/modelConfig";

import { backupDbFile } from "./backup";
import { getDbInstance } from "./core";
import {
  applyCapabilityPatchDeletes,
  cloneJsonRecord,
  modelCapabilitiesHasEntries,
  normalizeModelCapabilities,
} from "./modelCompatCapabilities";

type JsonRecord = Record<string, unknown>;

const MODEL_COMPAT_NAMESPACE = "modelCompatOverrides";

export { MODEL_COMPAT_PROTOCOL_KEYS };
export {
  applyCapabilitiesToLegacyFields,
  applyCapabilityPatchDeletes,
  buildTokenLimitDeleteMarkers,
  capabilityPatchHasNonNull,
  cloneJsonRecord,
  modelCapabilitiesHasEntries,
  normalizeModelCapabilities,
  normalizeModelCapabilitiesFromRow,
} from "./modelCompatCapabilities";
export type ModelCompatProtocolKey = (typeof MODEL_COMPAT_PROTOCOL_KEYS)[number];

export type ModelCompatPerProtocol = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  upstreamHeaders?: Record<string, string>;
};

export type CompatByProtocolMap = Partial<Record<ModelCompatProtocolKey, ModelCompatPerProtocol>>;

export type ModelCompatOverride = {
  id: string;
  capabilities?: ProviderModelCapabilitiesPatch;
  targetFormat?: string;
  unsupportedParams?: string[];
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  compatByProtocol?: CompatByProtocolMap;
  upstreamHeaders?: Record<string, string>;
  isHidden?: boolean;
  isDeleted?: boolean;
};

export type ModelCompatPatch = {
  capabilities?: ProviderModelCapabilitiesPatch | null;
  targetFormat?: string | null;
  unsupportedParams?: string[] | null;
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean | null;
  compatByProtocol?: CompatByProtocolMap;
  upstreamHeaders?: Record<string, string> | null;
  isHidden?: boolean | null;
  isDeleted?: boolean | null;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function getKeyValue(row: unknown): { key: string | null; value: string | null } {
  const record = asRecord(row);
  return {
    key: typeof record.key === "string" ? record.key : null,
    value: typeof record.value === "string" ? record.value : null,
  };
}

function isCompatProtocolKey(p: string): p is ModelCompatProtocolKey {
  return (MODEL_COMPAT_PROTOCOL_KEYS as readonly string[]).includes(p);
}

const UPSTREAM_HEADERS_MAX = 16;
const UPSTREAM_HEADER_NAME_MAX = 128;
const UPSTREAM_HEADER_VALUE_MAX = 4096;

function isValidUpstreamHeaderName(k: string): boolean {
  if (!k || k.length > UPSTREAM_HEADER_NAME_MAX) return false;
  if (isForbiddenUpstreamHeaderName(k)) return false;
  if (/[\r\n\0]/.test(k)) return false;
  if (/\s/.test(k)) return false;
  if (k.includes(":")) return false;
  return true;
}

/** Sanitize user-provided upstream header map (used when persisting and when reading for requests). */
export function sanitizeUpstreamHeadersMap(
  raw: Record<string, unknown> | null | undefined
): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [k0, v0] of Object.entries(raw)) {
    const k = String(k0).trim();
    if (!k || !isValidUpstreamHeaderName(k)) {
      continue;
    }
    const v =
      typeof v0 === "string"
        ? v0.trim().slice(0, UPSTREAM_HEADER_VALUE_MAX)
        : String(v0 ?? "")
            .trim()
            .slice(0, UPSTREAM_HEADER_VALUE_MAX);
    if (v.includes("\r") || v.includes("\n")) continue;
    out[k] = v;
    if (Object.keys(out).length >= UPSTREAM_HEADERS_MAX) break;
  }
  return out;
}

function hasCompatProtocolDelta(deltas: Partial<ModelCompatPerProtocol>): boolean {
  return (
    Object.prototype.hasOwnProperty.call(deltas, "normalizeToolCallId") ||
    Object.prototype.hasOwnProperty.call(deltas, "preserveOpenAIDeveloperRole") ||
    Object.prototype.hasOwnProperty.call(deltas, "upstreamHeaders")
  );
}

function applyProtocolHeaderDelta(
  cur: ModelCompatPerProtocol,
  upstreamHeaders: unknown
): ModelCompatPerProtocol {
  const s = sanitizeUpstreamHeadersMap(upstreamHeaders as Record<string, unknown>);
  if (Object.keys(s).length === 0) delete cur.upstreamHeaders;
  else cur.upstreamHeaders = s;
  return cur;
}

function mergeProtocolDeltas(
  current: ModelCompatPerProtocol,
  deltas: Partial<ModelCompatPerProtocol>
): ModelCompatPerProtocol {
  const cur: ModelCompatPerProtocol = { ...current };
  if ("normalizeToolCallId" in deltas) {
    cur.normalizeToolCallId = Boolean(deltas.normalizeToolCallId);
  }
  if ("preserveOpenAIDeveloperRole" in deltas) {
    cur.preserveOpenAIDeveloperRole = Boolean(deltas.preserveOpenAIDeveloperRole);
  }
  if ("upstreamHeaders" in deltas && deltas.upstreamHeaders !== undefined) {
    applyProtocolHeaderDelta(cur, deltas.upstreamHeaders);
  }
  return cur;
}

export function deepMergeCompatByProtocol(
  prev: CompatByProtocolMap | undefined,
  patch: Partial<Record<ModelCompatProtocolKey, Partial<ModelCompatPerProtocol>>>
): CompatByProtocolMap {
  const out: CompatByProtocolMap = { ...(prev || {}) };
  for (const key of Object.keys(patch) as ModelCompatProtocolKey[]) {
    if (!isCompatProtocolKey(key)) continue;
    const deltas = patch[key];
    if (!deltas || typeof deltas !== "object") continue;
    if (!hasCompatProtocolDelta(deltas)) continue;
    const cur = mergeProtocolDeltas(out[key] || {}, deltas);
    if (Object.keys(cur).length === 0) delete out[key];
    else out[key] = cur;
  }
  return out;
}

export function compatByProtocolHasEntries(map: CompatByProtocolMap | undefined): boolean {
  if (!map || typeof map !== "object") return false;
  return Object.keys(map).some((k) => {
    const v = map[k as ModelCompatProtocolKey];
    return v && typeof v === "object" && Object.keys(v).length > 0;
  });
}

function readCompatList(providerId: string): ModelCompatOverride[] {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(MODEL_COMPAT_NAMESPACE, providerId);
  const value = getKeyValue(row).value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeSourceProtocol(sourceFormat?: string | null): ModelCompatProtocolKey | null {
  return sourceFormat && isCompatProtocolKey(sourceFormat) ? sourceFormat : null;
}

function readProtocolCompat(
  row: JsonRecord | ModelCompatOverride | null | undefined,
  protocol: ModelCompatProtocolKey | null
): ModelCompatPerProtocol | undefined {
  if (!row || !protocol) return undefined;
  const record = row as JsonRecord;
  const nestedCompat = asRecord(record.compat);
  const nestedCompatByProtocol = nestedCompat.compatByProtocol as CompatByProtocolMap | undefined;
  const legacyCompatByProtocol = record.compatByProtocol as CompatByProtocolMap | undefined;
  const compat = nestedCompatByProtocol?.[protocol] ?? legacyCompatByProtocol?.[protocol];
  return compat && typeof compat === "object" ? compat : undefined;
}

function readCompatOwnBoolean(
  row: JsonRecord | ModelCompatOverride | null | undefined,
  key: "normalizeToolCallId" | "preserveOpenAIDeveloperRole"
): boolean | undefined {
  if (!row) return undefined;
  return readOwnBoolean(asRecord((row as JsonRecord).compat), key) ?? readOwnBoolean(row, key);
}

function readOwnBoolean(
  row: JsonRecord | ModelCompatPerProtocol | ModelCompatOverride | null | undefined,
  key: "normalizeToolCallId" | "preserveOpenAIDeveloperRole"
): boolean | undefined {
  if (!row || !Object.prototype.hasOwnProperty.call(row, key)) return undefined;
  return Boolean((row as JsonRecord)[key]);
}

function readProtocolBoolean(
  row: JsonRecord | ModelCompatOverride | null | undefined,
  protocol: ModelCompatProtocolKey | null,
  key: "normalizeToolCallId" | "preserveOpenAIDeveloperRole"
): boolean | undefined {
  return readOwnBoolean(readProtocolCompat(row, protocol), key);
}

function writeCompatList(providerId: string, list: ModelCompatOverride[]) {
  const db = getDbInstance();
  if (list.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      MODEL_COMPAT_NAMESPACE,
      providerId
    );
  } else {
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      MODEL_COMPAT_NAMESPACE,
      providerId,
      JSON.stringify(list)
    );
  }
  backupDbFile("pre-write");
}

function getCustomModelRow(providerId: string, modelId: string): JsonRecord | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  const value = getKeyValue(row).value;
  if (!value) return null;
  try {
    const models = JSON.parse(value) as unknown;
    if (!Array.isArray(models)) return null;
    const m = models.find((x: unknown) => {
      if (!x || typeof x !== "object" || Array.isArray(x)) return false;
      return (x as { id?: string }).id === modelId;
    }) as JsonRecord | undefined;
    return m ?? null;
  } catch {
    return null;
  }
}

function updateCustomModelHidden(providerId: string, modelId: string, hidden: boolean): boolean {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  const value = getKeyValue(row).value;
  if (!value) return false;
  const models = JSON.parse(value);
  if (!Array.isArray(models)) return false;
  const index = models.findIndex((m) => m && typeof m === "object" && m.id === modelId);
  if (index === -1) return false;

  const next = { ...models[index] };
  if (hidden) {
    next.isHidden = true;
  } else {
    delete next.isHidden;
  }
  models[index] = next;
  db.prepare("UPDATE key_value SET value = ? WHERE namespace = 'customModels' AND key = ?").run(
    JSON.stringify(models),
    providerId
  );
  backupDbFile("pre-write");
  return true;
}

export function getModelCompatOverrides(providerId: string): ModelCompatOverride[] {
  return readCompatList(providerId);
}

function applyCapabilitiesPatch(
  next: ModelCompatOverride,
  capabilities: ModelCompatPatch["capabilities"]
) {
  if (capabilities === null) {
    delete next.capabilities;
    return;
  }
  const rawCapabilities = asRecord(capabilities);
  const mergedCapabilities = applyCapabilityPatchDeletes(
    { ...(next.capabilities || {}) },
    rawCapabilities,
    true
  );
  const normalized = normalizeModelCapabilities(rawCapabilities);
  if (normalized) Object.assign(mergedCapabilities, normalized);
  if (modelCapabilitiesHasEntries(mergedCapabilities as ProviderModelCapabilities)) {
    next.capabilities = mergedCapabilities as ProviderModelCapabilities;
  } else {
    delete next.capabilities;
  }
}

function applyTargetFormatPatch(
  next: ModelCompatOverride,
  value: ModelCompatPatch["targetFormat"]
) {
  const targetFormat = typeof value === "string" ? value.trim() : "";
  if (targetFormat) next.targetFormat = targetFormat;
  else delete next.targetFormat;
}

function normalizeUnsupportedParams(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(value.map((entry) => (typeof entry === "string" ? entry.trim() : "")).filter(Boolean))
  );
}

function applyUnsupportedParamsPatch(
  next: ModelCompatOverride,
  value: ModelCompatPatch["unsupportedParams"]
) {
  const params = normalizeUnsupportedParams(value);
  if (params.length > 0) next.unsupportedParams = params;
  else delete next.unsupportedParams;
}

function applyPreserveDeveloperPatch(
  next: ModelCompatOverride,
  value: ModelCompatPatch["preserveOpenAIDeveloperRole"]
) {
  if (value === null) delete next.preserveOpenAIDeveloperRole;
  else next.preserveOpenAIDeveloperRole = Boolean(value);
}

function applyUpstreamHeadersPatch(
  next: ModelCompatOverride,
  value: ModelCompatPatch["upstreamHeaders"]
) {
  if (value === null) {
    delete next.upstreamHeaders;
    return;
  }
  const sanitized = sanitizeUpstreamHeadersMap(value as Record<string, unknown>);
  if (Object.keys(sanitized).length === 0) delete next.upstreamHeaders;
  else next.upstreamHeaders = sanitized;
}

function applyVisibilityPatch(
  next: ModelCompatOverride,
  field: "isHidden" | "isDeleted",
  value: boolean | null | undefined
) {
  if (value === null) delete next[field];
  else next[field] = Boolean(value);
}

function shouldKeepCompatOverride(next: ModelCompatOverride): boolean {
  return Boolean(
    next.normalizeToolCallId ||
    Object.prototype.hasOwnProperty.call(next, "preserveOpenAIDeveloperRole") ||
    modelCapabilitiesHasEntries(next.capabilities) ||
    (typeof next.targetFormat === "string" && next.targetFormat.length > 0) ||
    (Array.isArray(next.unsupportedParams) && next.unsupportedParams.length > 0) ||
    Object.prototype.hasOwnProperty.call(next, "isHidden") ||
    Object.prototype.hasOwnProperty.call(next, "isDeleted") ||
    compatByProtocolHasEntries(next.compatByProtocol) ||
    Boolean(next.upstreamHeaders && Object.keys(next.upstreamHeaders).length > 0)
  );
}

export function mergeModelCompatOverride(
  providerId: string,
  modelId: string,
  patch: ModelCompatPatch
) {
  const list = readCompatList(providerId);
  const idx = list.findIndex((e) => e.id === modelId);
  const prev = idx >= 0 ? { ...list[idx] } : { id: modelId };
  const next: ModelCompatOverride = { ...prev, id: modelId };
  if ("capabilities" in patch) {
    applyCapabilitiesPatch(next, patch.capabilities);
  }
  if ("targetFormat" in patch) {
    applyTargetFormatPatch(next, patch.targetFormat);
  }
  if ("unsupportedParams" in patch) {
    applyUnsupportedParamsPatch(next, patch.unsupportedParams);
  }
  if ("normalizeToolCallId" in patch) {
    if (patch.normalizeToolCallId) next.normalizeToolCallId = true;
    else delete next.normalizeToolCallId;
  }
  if ("preserveOpenAIDeveloperRole" in patch) {
    applyPreserveDeveloperPatch(next, patch.preserveOpenAIDeveloperRole);
  }
  if (patch.compatByProtocol && Object.keys(patch.compatByProtocol).length > 0) {
    const merged = deepMergeCompatByProtocol(next.compatByProtocol, patch.compatByProtocol);
    if (compatByProtocolHasEntries(merged)) next.compatByProtocol = merged;
    else delete next.compatByProtocol;
  }
  if ("upstreamHeaders" in patch) {
    applyUpstreamHeadersPatch(next, patch.upstreamHeaders);
  }
  const filtered = list.filter((e) => e.id !== modelId);
  if ("isHidden" in patch) {
    applyVisibilityPatch(next, "isHidden", patch.isHidden);
  }
  if ("isDeleted" in patch) {
    applyVisibilityPatch(next, "isDeleted", patch.isDeleted);
  }
  if (shouldKeepCompatOverride(next)) filtered.push(next);
  writeCompatList(providerId, filtered);
}

export function removeModelCompatOverride(providerId: string, modelId: string) {
  const list = readCompatList(providerId);
  const filtered = list.filter((e) => e.id !== modelId);
  if (filtered.length === list.length) return;
  writeCompatList(providerId, filtered);
}

export function resetModelConfigOverride(providerId: string, modelId: string) {
  const list = readCompatList(providerId);
  const idx = list.findIndex((e) => e.id === modelId);
  if (idx < 0) return;
  const prev = list[idx];
  const next: ModelCompatOverride = { id: modelId };
  if (prev.isDeleted !== true && Object.prototype.hasOwnProperty.call(prev, "isHidden")) {
    next.isHidden = prev.isHidden;
  }
  const filtered = list.filter((_, i) => i !== idx);
  if (Object.keys(next).length > 1) filtered.push(next);
  writeCompatList(providerId, filtered);
}

/**
 * Whether the given provider/model has "normalize tool call id" (9-char Mistral-style) enabled.
 * Custom model row wins; otherwise {@link getModelCompatOverrides}.
 * When `sourceFormat` is one of `openai` | `openai-responses` | `claude`, per-protocol
 * `compatByProtocol[sourceFormat].normalizeToolCallId` overrides the legacy top-level flag.
 */
export function getModelNormalizeToolCallId(
  providerId: string,
  modelId: string,
  sourceFormat?: string | null
): boolean {
  const m = getCustomModelRow(providerId, modelId);
  const protocol = normalizeSourceProtocol(sourceFormat);

  if (m) {
    const protocolValue = readProtocolBoolean(m, protocol, "normalizeToolCallId");
    if (protocolValue !== undefined) return protocolValue;
    return Boolean(readCompatOwnBoolean(m, "normalizeToolCallId"));
  }
  const co = readCompatList(providerId).find((e) => e.id === modelId);
  const protocolValue = readProtocolBoolean(co, protocol, "normalizeToolCallId");
  if (protocolValue !== undefined) return protocolValue;
  return Boolean(readCompatOwnBoolean(co, "normalizeToolCallId"));
}

/**
 * Explicit preserve-openai-developer preference for this provider/model.
 * `undefined` = unset -> routing keeps legacy default (preserve developer for OpenAI format).
 * `false` = map developer -> system (e.g. MiniMax). `true` = keep developer.
 * Per-protocol overrides live under `compatByProtocol[sourceFormat]` when `sourceFormat` matches.
 */
export function getModelPreserveOpenAIDeveloperRole(
  providerId: string,
  modelId: string,
  sourceFormat?: string | null
): boolean | undefined {
  const m = getCustomModelRow(providerId, modelId);
  const protocol = normalizeSourceProtocol(sourceFormat);

  if (m) {
    return (
      readProtocolBoolean(m, protocol, "preserveOpenAIDeveloperRole") ??
      readCompatOwnBoolean(m, "preserveOpenAIDeveloperRole")
    );
  }
  const co = readCompatList(providerId).find((e) => e.id === modelId);
  return (
    readProtocolBoolean(co, protocol, "preserveOpenAIDeveloperRole") ??
    readCompatOwnBoolean(co, "preserveOpenAIDeveloperRole")
  );
}

/**
 * Check if the model is flagged as hidden from the public catalog.
 */
export function getModelIsHidden(providerId: string, modelId: string): boolean {
  const m = getCustomModelRow(providerId, modelId);
  if (m && Object.prototype.hasOwnProperty.call(m, "isHidden")) {
    return Boolean(m.isHidden);
  }
  const co = readCompatList(providerId).find((e) => e.id === modelId);
  return Boolean(co?.isHidden);
}

/**
 * Get a map of provider ID -> set of hidden model IDs from all modelCompatOverrides
 * and customModels. Used by auto-combo candidate building to skip user-hidden models.
 * Single bulk DB query — not N+1 per model.
 */
export function getHiddenModelsByProvider(): Map<string, Set<string>> {
  const db = getDbInstance();
  const result = new Map<string, Set<string>>();

  const rows = db
    .prepare(
      "SELECT key, value FROM key_value WHERE namespace IN ('modelCompatOverrides', 'customModels')"
    )
    .all() as Array<{ key: string; value: string | null }>;

  for (const row of rows) {
    if (!row.value) continue;
    try {
      const parsed = JSON.parse(row.value);
      if (!Array.isArray(parsed)) continue;
      for (const entry of parsed) {
        if (entry && typeof entry === "object" && entry.isHidden) {
          const modelId = entry.id;
          if (typeof modelId === "string" && modelId.length > 0) {
            if (!result.has(row.key)) result.set(row.key, new Set());
            result.get(row.key)!.add(modelId);
          }
        }
      }
    } catch {
      // Skip malformed entries.
    }
  }

  return result;
}

/**
 * #3782 — Check if a model was DELETED (trash) rather than merely eye-hidden.
 *
 * Only the DELETE route sets `isDeleted`. The sync re-import filter keys on this
 * (not on `isHidden`) so eye-hidden models survive a re-sync while deleted ones
 * stay dropped.
 *
 * Legacy caveat: rows written by the DELETE route BEFORE this change carry only
 * `isHidden:true` (no `isDeleted`). Treating bare legacy `isHidden:true` as
 * deleted here would resurrect the #3782 bug for eye-hidden models; treating it
 * as "kept" would resurrect previously-deleted models. Resurrecting a deleted
 * model is the less-surprising, recoverable outcome (the operator can re-hide or
 * re-delete it), whereas silently dropping an eye-hidden model is the reported
 * regression — so we deliberately key ONLY on the explicit `isDeleted` flag and
 * accept that a handful of pre-existing deleted rows may reappear once after the
 * upgrade. Going forward both paths write the correct distinct markers.
 */
export function getModelIsDeleted(providerId: string, modelId: string): boolean {
  const co = readCompatList(providerId).find((e) => e.id === modelId);
  return Boolean(co?.isDeleted);
}

/**
 * Persist the hidden flag for a model. Stores the override on the custom-model
 * row when one exists, otherwise on the compat-override list. Setting
 * `hidden = false` is a no-op when the model is already visible.
 */
export function setModelIsHidden(providerId: string, modelId: string, hidden: boolean): void {
  const customRow = getCustomModelRow(providerId, modelId);
  if (customRow) {
    if (hidden || Object.prototype.hasOwnProperty.call(customRow, "isHidden")) {
      updateCustomModelHidden(providerId, modelId, hidden);
    }
    return;
  }

  const list = readCompatList(providerId);
  const idx = list.findIndex((e) => e.id === modelId);
  if (hidden) {
    const prev = idx >= 0 ? list[idx] : { id: modelId };
    const next: ModelCompatOverride = { ...prev, id: modelId, isHidden: true };
    if (idx >= 0) list[idx] = next;
    else list.push(next);
    writeCompatList(providerId, list);
    return;
  }

  if (idx < 0) return;
  if (Object.keys(list[idx]).length <= 1) {
    const filtered = list.filter((_, i) => i !== idx);
    writeCompatList(providerId, filtered);
    return;
  }
  delete list[idx].isHidden;
  writeCompatList(providerId, list);
}

function readUpstreamFromJsonRecord(
  row: JsonRecord | null | undefined,
  key: "upstreamHeaders"
): Record<string, string> | undefined {
  if (!row) return undefined;
  const nestedCompat = asRecord(row.compat);
  const raw = nestedCompat[key] ?? row[key];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const s = sanitizeUpstreamHeadersMap(raw as Record<string, unknown>);
  return Object.keys(s).length > 0 ? s : undefined;
}

function mergeUpstreamHeaders(
  target: Record<string, string>,
  raw: Record<string, unknown> | null | undefined
) {
  const sanitized = sanitizeUpstreamHeadersMap(raw);
  if (Object.keys(sanitized).length > 0) Object.assign(target, sanitized);
}

function mergeRowUpstreamHeaders(
  target: Record<string, string>,
  row: JsonRecord | ModelCompatOverride | null | undefined,
  protocol: ModelCompatProtocolKey | null
) {
  const fromModel = readUpstreamFromJsonRecord(
    row as JsonRecord | null | undefined,
    "upstreamHeaders"
  );
  if (fromModel) Object.assign(target, fromModel);
  mergeUpstreamHeaders(target, readProtocolCompat(row, protocol)?.upstreamHeaders);
}

/**
 * Extra HTTP headers to send to the upstream provider for this model (after executor auth headers).
 * Order: top-level `upstreamHeaders` on the custom model row (override list merged under custom),
 * then per-protocol `compatByProtocol[sourceFormat].upstreamHeaders` (wins on key conflict).
 * Use for gateways that expect `Authentication`, `X-API-Key`, etc. alongside Bearer.
 *
 * `modelId` should be the **canonical** model id when known. Callers that accept client aliases
 * (e.g. chat proxy) should merge results for both alias and `resolveModelAlias(alias)` so UI
 * config on the resolved id still applies — see `chatCore` merge.
 */
export function getModelUpstreamExtraHeaders(
  providerId: string,
  modelId: string,
  sourceFormat?: string | null
): Record<string, string> {
  const protocol = normalizeSourceProtocol(sourceFormat);
  const m = getCustomModelRow(providerId, modelId);

  const base: Record<string, string> = {};
  if (m) {
    mergeRowUpstreamHeaders(base, m, protocol);
    return base;
  }

  const co = readCompatList(providerId).find((e) => e.id === modelId);
  mergeRowUpstreamHeaders(base, co, protocol);
  return base;
}
