/**
 * ccAliasPredicate.ts — catalog-side predicate for the cc discovery alias gate.
 *
 * Bridges the pure gate storage (`db/ccDiscoveryAliases.ts`) to the pure
 * synthesizer (`open-sse/utils/ccDiscoveryAliases.ts::appendCcDiscoveryAliases`).
 * Builds a single `(entry) => boolean` predicate from a settings snapshot,
 * so the catalog builder only needs to load the bulk settings once (no N+1
 * DB access per candidate model) and hand the closure to the synthesizer.
 *
 * Precedence for a model entry `<providerId>/<modelId...>` (split on the FIRST
 * "/" — everything after it is the modelId, even if it itself contains "/"):
 *   model setting (exact `providerId/modelId` key) > provider setting > global.
 *
 * Combo entries (`owned_by === "combo"`) use a virtual provider key `"combo"`
 * for the provider-level setting, and `combo/<comboName>` for the model-level
 * setting — combos have no real provider id, so this keeps them addressable
 * independently of any other provider's toggle while still falling back to
 * the same global flag.
 *
 * An entry whose id has no "/" and is not a combo (e.g. a bare synced model id
 * with no provider prefix) has no provider/model setting to look up — it only
 * follows the global flag.
 */

import { resolveCcAliasEnabled, type CcAliasSetting } from "@/lib/db/ccDiscoveryAliases";

export interface CcAliasGateSnapshot {
  global: boolean;
  providers: Map<string, "on" | "off">;
  models: Map<string, "on" | "off">; // key `${providerId}/${modelId}`
}

const COMBO_PROVIDER_KEY = "combo";

function settingFor(map: Map<string, "on" | "off">, key: string): CcAliasSetting {
  return map.get(key) ?? null;
}

/**
 * Builds a predicate suitable for `appendCcDiscoveryAliases`'s `isEnabled`
 * argument from a single settings snapshot (global flag + bulk provider/model
 * override maps), so the catalog builder loads settings exactly once.
 */
export function buildCcAliasPredicate(
  snapshot: CcAliasGateSnapshot
): (entry: { id?: unknown; owned_by?: unknown }) => boolean {
  return (entry) => {
    const id = entry.id;
    if (typeof id !== "string" || id.length === 0) return false;

    const isCombo = entry.owned_by === "combo";
    if (isCombo) {
      const provider = settingFor(snapshot.providers, COMBO_PROVIDER_KEY);
      const model = settingFor(snapshot.models, `${COMBO_PROVIDER_KEY}/${id}`);
      return resolveCcAliasEnabled({ model, provider, global: snapshot.global });
    }

    const slashIndex = id.indexOf("/");
    if (slashIndex === -1) {
      // No provider prefix and not a combo — nothing to key a provider/model
      // override on, so only the global flag applies.
      return snapshot.global;
    }

    const providerId = id.slice(0, slashIndex);
    const modelId = id.slice(slashIndex + 1);
    const provider = settingFor(snapshot.providers, providerId);
    const model = settingFor(snapshot.models, `${providerId}/${modelId}`);
    return resolveCcAliasEnabled({ model, provider, global: snapshot.global });
  };
}
