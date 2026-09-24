/** db/models/compat.ts — model-compat overrides (normalizeToolCallId, per-protocol flags, upstream headers). */

import { getDbInstance } from "../core";
import {
  MODEL_COMPAT_PROTOCOL_KEYS,
  type ModelCompatProtocolKey,
} from "@/shared/constants/modelCompat";
import { isForbiddenUpstreamHeaderName } from "@/shared/constants/upstreamHeaders";
import { getKeyValue } from "./shared";
import { finishModelCatalogWriteWithBackup } from "./modelCatalogWriteSignals";

/** Built-in / alias models: tool-call + developer-role flags without a full custom row */
const MODEL_COMPAT_NAMESPACE = "modelCompatOverrides";

export { MODEL_COMPAT_PROTOCOL_KEYS, type ModelCompatProtocolKey };

export type ModelCompatPerProtocol = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  preserveVideoUrl?: boolean;
  /** Merged into upstream HTTP requests for this model (after default auth headers). */
  upstreamHeaders?: Record<string, string>;
};

export type CompatByProtocolMap = Partial<Record<ModelCompatProtocolKey, ModelCompatPerProtocol>>;

export function isCompatProtocolKey(p: string): p is ModelCompatProtocolKey {
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

export function deepMergeCompatByProtocol(
  prev: CompatByProtocolMap | undefined,
  patch: Partial<Record<ModelCompatProtocolKey, Partial<ModelCompatPerProtocol>>>
): CompatByProtocolMap {
  const out: CompatByProtocolMap = { ...(prev || {}) };
  for (const key of Object.keys(patch) as ModelCompatProtocolKey[]) {
    if (!isCompatProtocolKey(key)) continue;
    const deltas = patch[key];
    if (!deltas || typeof deltas !== "object") continue;
    const hasDelta =
      Object.prototype.hasOwnProperty.call(deltas, "normalizeToolCallId") ||
      Object.prototype.hasOwnProperty.call(deltas, "preserveOpenAIDeveloperRole") ||
      Object.prototype.hasOwnProperty.call(deltas, "preserveVideoUrl") ||
      Object.prototype.hasOwnProperty.call(deltas, "upstreamHeaders");
    if (!hasDelta) continue;
    const cur: ModelCompatPerProtocol = { ...(out[key] || {}) };
    if ("normalizeToolCallId" in deltas) {
      cur.normalizeToolCallId = Boolean(deltas.normalizeToolCallId);
    }
    if ("preserveOpenAIDeveloperRole" in deltas) {
      cur.preserveOpenAIDeveloperRole = Boolean(deltas.preserveOpenAIDeveloperRole);
    }
    if ("preserveVideoUrl" in deltas) {
      cur.preserveVideoUrl = Boolean(deltas.preserveVideoUrl);
    }
    if ("upstreamHeaders" in deltas) {
      const uh = deltas.upstreamHeaders;
      if (uh === undefined) {
        /* skip */
      } else {
        const s = sanitizeUpstreamHeadersMap(uh as Record<string, unknown>);
        if (Object.keys(s).length === 0) delete cur.upstreamHeaders;
        else cur.upstreamHeaders = s;
      }
    }
    if (Object.keys(cur).length === 0) delete out[key];
    else out[key] = cur;
  }
  return out;
}

export type ModelCompatOverride = {
  id: string;
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  preserveVideoUrl?: boolean;
  compatByProtocol?: CompatByProtocolMap;
  upstreamHeaders?: Record<string, string>;
  isHidden?: boolean;
  /**
   * #12172: per-modality visibility override, keyed by endpoint/modality id
   * (e.g. "chat", "images", "embeddings", ...). A key present here always wins
   * over the legacy top-level `isHidden` for that specific modality — this is
   * what lets an operator hide a model from Chat without also suppressing an
   * identically-ID'd model in the Image (or any other) registry. A modality
   * with no entry here falls back to `isHidden` (the pre-#12172 "hide
   * everywhere" behavior), so existing rows keep working unchanged.
   */
  hiddenModalities?: Record<string, boolean>;
  apiFormat?: string;
  targetFormat?: string;
  supportsVision?: boolean;
};

/**
 * Resolve whether an override hides its model for a given modality.
 * Precedence: an explicit `hiddenModalities[modality]` entry always wins;
 * otherwise fall back to the legacy all-modalities `isHidden` flag.
 */
export function isOverrideHiddenForModality(
  override: Pick<ModelCompatOverride, "isHidden" | "hiddenModalities"> | null | undefined,
  modality: string
): boolean {
  if (!override) return false;
  const scoped = override.hiddenModalities?.[modality];
  if (scoped !== undefined) return Boolean(scoped);
  return Boolean(override.isHidden);
}

export function readCompatList(providerId: string): ModelCompatOverride[] {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(MODEL_COMPAT_NAMESPACE, providerId);
  const value = getKeyValue(row).value;
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((raw): ModelCompatOverride[] => {
      if (!raw || typeof raw !== "object") return [];
      // Old releases persisted an `isDeleted` tombstone alongside `isHidden`.
      // Ignore that retired state while preserving the visibility choice.
      const entry = { ...(raw as Record<string, unknown>) };
      delete entry.isDeleted;
      return typeof entry.id === "string" ? [entry as ModelCompatOverride] : [];
    });
  } catch {
    return [];
  }
}

export function writeCompatList(providerId: string, list: ModelCompatOverride[]) {
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
  finishModelCatalogWriteWithBackup();
}

export function getModelCompatOverrides(providerId: string): ModelCompatOverride[] {
  return readCompatList(providerId);
}

export type ModelCompatPatch = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean | null;
  preserveVideoUrl?: boolean | null;
  compatByProtocol?: CompatByProtocolMap;
  /** Replace top-level extra headers for override-only rows; omit to leave unchanged. */
  upstreamHeaders?: Record<string, string> | null;
  isHidden?: boolean | null;
  /**
   * #12172: when set alongside `isHidden`, scopes the write to that one
   * modality (see {@link ModelCompatOverride.hiddenModalities}) instead of
   * the legacy all-modalities flag. `isHidden: null` with a `modality` clears
   * just that modality's override (reverting it to inherit the legacy flag).
   */
  modality?: string | null;
  apiFormat?: string | null;
  targetFormat?: string | null;
  supportsVision?: boolean | null;
};

export function compatByProtocolHasEntries(map: CompatByProtocolMap | undefined): boolean {
  if (!map || typeof map !== "object") return false;
  return Object.keys(map).some((k) => {
    const v = map[k as ModelCompatProtocolKey];
    return v && typeof v === "object" && Object.keys(v).length > 0;
  });
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
  if ("normalizeToolCallId" in patch) {
    if (patch.normalizeToolCallId) next.normalizeToolCallId = true;
    else delete next.normalizeToolCallId;
  }
  if ("preserveOpenAIDeveloperRole" in patch) {
    if (patch.preserveOpenAIDeveloperRole === null) {
      delete next.preserveOpenAIDeveloperRole; // unset: revert to default (undefined at read time)
    } else {
      next.preserveOpenAIDeveloperRole = Boolean(patch.preserveOpenAIDeveloperRole);
    }
  }
  if ("preserveVideoUrl" in patch) {
    if (patch.preserveVideoUrl === null) {
      delete next.preserveVideoUrl;
    } else {
      next.preserveVideoUrl = Boolean(patch.preserveVideoUrl);
    }
  }
  if (patch.compatByProtocol && Object.keys(patch.compatByProtocol).length > 0) {
    const merged = deepMergeCompatByProtocol(next.compatByProtocol, patch.compatByProtocol);
    if (compatByProtocolHasEntries(merged)) next.compatByProtocol = merged;
    else delete next.compatByProtocol;
  }
  if ("upstreamHeaders" in patch) {
    if (patch.upstreamHeaders === null) {
      delete next.upstreamHeaders;
    } else if (patch.upstreamHeaders && typeof patch.upstreamHeaders === "object") {
      const s = sanitizeUpstreamHeadersMap(patch.upstreamHeaders as Record<string, unknown>);
      if (Object.keys(s).length === 0) delete next.upstreamHeaders;
      else next.upstreamHeaders = s;
    }
  }
  const filtered = list.filter((e) => e.id !== modelId);
  const hasPreserveFlag = Object.prototype.hasOwnProperty.call(next, "preserveOpenAIDeveloperRole");
  const hasVideoUrlFlag = Object.prototype.hasOwnProperty.call(next, "preserveVideoUrl");
  const hasTopUpstream = next.upstreamHeaders && Object.keys(next.upstreamHeaders).length > 0;
  if ("isHidden" in patch) {
    const modality = typeof patch.modality === "string" && patch.modality ? patch.modality : null;
    if (modality) {
      const hiddenModalities = { ...(next.hiddenModalities || {}) };
      if (patch.isHidden === null) {
        delete hiddenModalities[modality];
      } else {
        hiddenModalities[modality] = Boolean(patch.isHidden);
      }
      if (Object.keys(hiddenModalities).length > 0) next.hiddenModalities = hiddenModalities;
      else delete next.hiddenModalities;
    } else if (patch.isHidden === null) {
      delete next.isHidden;
    } else {
      next.isHidden = Boolean(patch.isHidden);
    }
  }
  if ("apiFormat" in patch) {
    if (!patch.apiFormat) {
      delete next.apiFormat;
    } else {
      next.apiFormat = patch.apiFormat;
    }
  }
  if ("targetFormat" in patch) {
    if (!patch.targetFormat) {
      delete next.targetFormat;
    } else {
      next.targetFormat = patch.targetFormat;
    }
  }
  if ("supportsVision" in patch) {
    if (patch.supportsVision === null) {
      delete next.supportsVision;
    } else {
      next.supportsVision = Boolean(patch.supportsVision);
    }
  }
  const hasHiddenFlag =
    Object.prototype.hasOwnProperty.call(next, "isHidden") ||
    (!!next.hiddenModalities && Object.keys(next.hiddenModalities).length > 0);
  const hasApiFormat = Object.prototype.hasOwnProperty.call(next, "apiFormat");
  const hasTargetFormat = Object.prototype.hasOwnProperty.call(next, "targetFormat");
  const hasVisionFlag = Object.prototype.hasOwnProperty.call(next, "supportsVision");
  if (
    next.normalizeToolCallId ||
    hasPreserveFlag ||
    hasVideoUrlFlag ||
    hasHiddenFlag ||
    hasApiFormat ||
    hasTargetFormat ||
    hasVisionFlag ||
    compatByProtocolHasEntries(next.compatByProtocol) ||
    hasTopUpstream
  ) {
    filtered.push(next);
  }
  writeCompatList(providerId, filtered);
}

export function removeModelCompatOverride(providerId: string, modelId: string) {
  const list = readCompatList(providerId);
  const filtered = list.filter((e) => e.id !== modelId);
  if (filtered.length === list.length) return;
  writeCompatList(providerId, filtered);
}
