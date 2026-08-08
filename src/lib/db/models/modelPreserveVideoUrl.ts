/**
 * modelPreserveVideoUrl.ts — preserveVideoUrl resolver for model-compat overrides.
 *
 * Extracted from models.ts to avoid growing the frozen file-size baseline.
 * Follows the same pattern as getModelPreserveOpenAIDeveloperRole.
 */

import { getDbInstance } from "../core";
import { type CompatByProtocolMap, readCompatList, isCompatProtocolKey } from "./compat";

/** The model-compat override key for the preserveVideoUrl flag. */
const KEY = "preserveVideoUrl";

function getCustomModelRow(providerId: string, modelId: string): Record<string, unknown> | undefined {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT value FROM key_value WHERE namespace = 'modelCompatOverrides' AND key = ?"
    )
    .get(`${providerId}::${modelId}`);
  if (!row) return undefined;
  try {
    const v = JSON.parse((row as { value: string }).value);
    return typeof v === "object" && v !== null ? (v as Record<string, unknown>) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Get the explicit preserve-video-url preference for a provider/model.
 * `undefined` = unset → fall back to moonshot/kimi hardcoded behavior (caller decides).
 * `true` = keep video_url content parts in the translated request.
 * Per-protocol overrides live under `compatByProtocol[sourceFormat]`.
 */
export function getModelPreserveVideoUrl(
  providerId: string,
  modelId: string,
  sourceFormat?: string | null
): boolean | undefined {
  const m = getCustomModelRow(providerId, modelId);
  const protocol = sourceFormat && isCompatProtocolKey(sourceFormat) ? sourceFormat : null;

  if (m) {
    if (protocol) {
      const pc = (m.compatByProtocol as CompatByProtocolMap | undefined)?.[protocol];
      if (pc && Object.prototype.hasOwnProperty.call(pc, KEY)) {
        return Boolean(pc[KEY]);
      }
    }
    if (Object.prototype.hasOwnProperty.call(m, KEY)) {
      return Boolean(m[KEY]);
    }
    return undefined;
  }
  const co = readCompatList(providerId).find((e) => e.id === modelId);
  if (protocol && co?.compatByProtocol?.[protocol]) {
    const pc = co.compatByProtocol[protocol]!;
    if (Object.prototype.hasOwnProperty.call(pc, KEY)) {
      return Boolean(pc[KEY]);
    }
  }
  if (co && Object.prototype.hasOwnProperty.call(co, KEY)) {
    return Boolean(co[KEY]);
  }
  return undefined;
}
