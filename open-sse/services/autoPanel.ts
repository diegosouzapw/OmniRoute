/**
 * Auto-panel resolver for the AI Council / debate strategy.
 *
 * When a council request omits an explicit `models[]` panel, the panel is
 * derived from *every model in the connected fleet* — not just one model per
 * connection, but ALL synced models from every active, credential-valid
 * provider. This is the "use full models" mode: the council fans out across
 * the broadest possible set of knowledge, reasoning, and model architectures.
 *
 * Architecture:
 *   1. Credential gate: `createVirtualAutoCombo` resolves which *providers*
 *      are connected, blocked, or disabled (existing gate, unchanged).
 *   2. Model expansion: for each provider that passed the credential gate,
 *      `getAllSyncedAvailableModels` expands all synced models from that
 *      provider (e.g. 150 models from `oc`). Providers without synced models
 *      fall back to the connection's `defaultModel` (same as before).
 *   3. Endpoint filter: models that only serve image/audio/etc. endpoints and
 *      explicitly exclude chat/responses are dropped. Models with no declared
 *      endpoints are kept (default = chat-capable).
 *   4. Per-provider diversity cap: to prevent a single large provider (e.g.
 *      `oc` with 150 models) from crowding out the entire panel, at most
 *      `maxPerProvider` models are taken from each provider. This guarantees
 *      genuine diversity — different model families, quantizations, vendors.
 *   5. Global cap: total panel is capped at `maxPanel` (OOM guard).
 *   6. Deduplication: identical model strings across providers are kept once.
 */
import { createVirtualAutoCombo, type AutoComboSpec } from "./autoCombo/virtualFactory.ts";
import type { AutoVariant } from "./autoCombo/autoPrefix.ts";
import { getAllSyncedAvailableModels } from "../../src/lib/db/models.ts";
import { DEBATE_DEFAULTS } from "./debate.ts";
import type { ComboLogger } from "./combo/types.ts";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Default maximum models taken from any single provider.
 * Prevents `oc` (150 models) from filling the entire 40-slot panel.
 * Can be overridden per-request via `maxPerProvider`.
 */
export const DEFAULT_MAX_PER_PROVIDER = 3;

// Endpoints that are chat-capable (include these models in the panel).
const CHAT_ENDPOINTS = new Set(["chat", "completions", "responses"]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Return true if the model can serve chat/completions.
 *   - Models with no declared `supportedEndpoints` default to chat-capable.
 *   - Models that declare endpoints but include a chat/responses endpoint are kept.
 *   - Models that declare only non-chat endpoints (e.g. ["image", "embedding"]) are dropped.
 */
export function isChatCapable(supportedEndpoints?: string[]): boolean {
  if (!Array.isArray(supportedEndpoints) || supportedEndpoints.length === 0) return true;
  return supportedEndpoints.some((ep) => CHAT_ENDPOINTS.has(ep.toLowerCase()));
}

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type ResolveAutoPanelOptions = {
  /** Hard cap on panel size (OOM guard). Defaults to DEBATE_DEFAULTS.maxPanel. */
  maxPanel?: number;
  /**
   * Max models taken from any single provider before global cap.
   * Default: DEFAULT_MAX_PER_PROVIDER (3). Set to Infinity to disable.
   */
  maxPerProvider?: number;
  /** Optional `auto/<category>:<tier>` or `auto/<family>` overlay to narrow the pool. */
  spec?: AutoComboSpec;
  /** Optional auto variant (e.g. "fast"); passed through to createVirtualAutoCombo. */
  variant?: AutoVariant;
  /** Logger for diagnostics; optional. */
  log?: ComboLogger;
};

// ---------------------------------------------------------------------------
// Core resolver
// ---------------------------------------------------------------------------

/**
 * Resolve the council panel from the connected fleet's full model inventory.
 *
 * @returns a deduplicated list of `provider/modelId` strings, capped at `maxPanel`
 *          with per-provider diversity enforced. Never throws — returns [] on error.
 */
export async function resolveAutoPanel(
  opts: ResolveAutoPanelOptions = {}
): Promise<string[]> {
  const maxPanel =
    typeof opts.maxPanel === "number" && opts.maxPanel > 0
      ? Math.floor(opts.maxPanel)
      : DEBATE_DEFAULTS.maxPanel;

  const maxPerProvider =
    typeof opts.maxPerProvider === "number" && opts.maxPerProvider > 0
      ? opts.maxPerProvider
      : DEFAULT_MAX_PER_PROVIDER;

  // Step 1: credential gate — which providers are active + usable?
  const combo = await createVirtualAutoCombo(opts.variant, opts.spec);

  // Build a set of provider IDs that passed the credential gate.
  const credentialedProviders = new Set<string>();
  // Also keep the fallback model per provider (for providers without synced models).
  const fallbackByProvider = new Map<string, string>();
  for (const entry of combo.models) {
    if (typeof entry.model !== "string" || entry.model.length === 0) continue;
    const providerId = entry.providerId ?? entry.model.split("/")[0] ?? "";
    if (!providerId) continue;
    credentialedProviders.add(providerId);
    // Store the first fallback model per provider (will be overridden by synced models).
    if (!fallbackByProvider.has(providerId)) {
      fallbackByProvider.set(providerId, entry.model);
    }
  }

  if (credentialedProviders.size === 0) {
    opts.log?.warn(
      "COUNCIL",
      "Auto-panel resolved to 0 connected providers — no provider has usable credentials"
    );
    return [];
  }

  // Step 2: full synced model inventory.
  const syncedByProvider = await getAllSyncedAvailableModels();

  // Step 3: assemble panel with per-provider diversity cap.
  const seen = new Set<string>();
  const panel: string[] = [];
  const countByProvider = new Map<string, number>();

  // Iterate providers in the order the credential gate returned them
  // (preserves the existing auto-combo ordering heuristics).
  for (const providerId of credentialedProviders) {
    if (panel.length >= maxPanel) break;

    const synced = syncedByProvider[providerId];

    if (synced && synced.length > 0) {
      // Expand all synced models for this provider (filtered + diversity-capped).
      for (const m of synced) {
        if (panel.length >= maxPanel) break;

        // Endpoint filter: drop image/audio-only models.
        if (!isChatCapable(m.supportedEndpoints)) continue;

        const modelStr = `${providerId}/${m.id}`;
        if (seen.has(modelStr)) continue;

        const provCount = countByProvider.get(providerId) ?? 0;
        if (provCount >= maxPerProvider) break; // per-provider cap hit

        seen.add(modelStr);
        panel.push(modelStr);
        countByProvider.set(providerId, provCount + 1);
      }
    } else {
      // No synced models — fall back to the single credential-gate model.
      const fallback = fallbackByProvider.get(providerId);
      if (fallback && !seen.has(fallback)) {
        seen.add(fallback);
        panel.push(fallback);
        countByProvider.set(providerId, 1);
      }
    }
  }

  const totalSynced = Object.values(syncedByProvider).reduce((s, arr) => s + arr.length, 0);
  if (panel.length === 0) {
    opts.log?.warn("COUNCIL", "Auto-panel resolved to 0 models after filtering");
  } else {
    opts.log?.info(
      "COUNCIL",
      `Auto-panel: ${panel.length} models from ${credentialedProviders.size} providers ` +
        `(${totalSynced} synced total, maxPerProvider=${maxPerProvider}, maxPanel=${maxPanel})`
    );
  }

  return panel;
}
