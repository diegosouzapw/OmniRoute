/**
 * Claude Code discovery aliases (`claude/<id>` mirror entries).
 *
 * Claude Code's gateway model discovery only lists models whose id begins with
 * `claude` or `anthropic` — any other provider prefix (`kimi/…`, `gemini-cli/…`,
 * combo names, etc.) is invisible to it even when the underlying model is fully
 * routable through OmniRoute. To make every enabled model reachable from Claude
 * Code without renaming anything in the real catalog, this module synthesizes a
 * mirror entry for each eligible model:
 *
 *     claude/<original-id>            e.g. claude/kimi/kimi-k2.6
 *     claude/combo/<combo-name>       for owned_by:"combo" entries
 *
 * The mirror entry keeps every field from the original (translated by the
 * existing model-id handling once the request lands, same as `no-think/…` and
 * the effort-variant aliases), only overriding `id`, `root` (back-pointer to the
 * real id), and `display_name`. This mirrors the structure of
 * `claudeEffortVariants.ts` and `noThinkingAlias.ts`: pure synthesis over the
 * already key-filtered catalog list, no I/O, no mutation of the input array.
 *
 * Never aliased:
 *  - ids that already start with `claude` or `anthropic` (with or without a
 *    following `/`, case-insensitive) — would double-prefix or shadow the base id.
 *  - `no-think/…` aliases and reasoning-effort variants (`-low`/`-medium`/`-high`/
 *    `-xhigh` suffix) — v1 only mirrors base ids; effort/no-think discovery is a
 *    separate concern.
 *  - entries the caller's `isEnabled` predicate rejects.
 */

export const CC_DISCOVERY_PREFIX = "claude/";
export const CC_DISCOVERY_COMBO_PREFIX = "claude/combo/";

// Ids that already live under the claude/anthropic namespace — never re-mirror them.
const ALREADY_CLAUDE_RE = /^(?:claude|anthropic)(?:\/|$)/i;
// Ids that already carry a reasoning-effort suffix — v1 only mirrors base ids.
const EFFORT_SUFFIX_RE = /-(?:xhigh|high|medium|low)$/i;
const NO_THINKING_PREFIX = "no-think/";
// Built-in `auto`/`auto/*` combos are synthesized by createBuiltinAutoCombo, NOT
// stored in the DB combos table — the request-path resolver (getComboByName) can't
// find them, so mirroring them would advertise a `claude/combo/auto/*` id that the
// request path rejects. Skip them; DB-defined combos (arbitrary names) still mirror.
const BUILTIN_AUTO_COMBO_RE = /^auto(?:\/|$)/;

interface CcDiscoveryCatalogEntry {
  id?: unknown;
  owned_by?: unknown;
  name?: unknown;
  root?: unknown;
  [key: string]: unknown;
}

/**
 * Append `claude/<id>` (or `claude/combo/<id>` for combos) discovery-mirror
 * entries for every eligible model. Returns the original array reference
 * unchanged when nothing is eligible (no allocation in the common case).
 *
 * `isEnabled` is caller-supplied so this module stays free of feature-flag /
 * gate lookups — it only knows how to synthesize the mirror shape.
 */
/**
 * Ids the mirror must never cover: already claude/anthropic (would double-prefix
 * or shadow the base id), `no-think/…` aliases, and reasoning-effort variants —
 * v1 mirrors base ids only.
 */
function isMirrorableId(id: string): boolean {
  if (id.length === 0) return false;
  if (ALREADY_CLAUDE_RE.test(id)) return false;
  if (id.startsWith(NO_THINKING_PREFIX)) return false;
  return !EFFORT_SUFFIX_RE.test(id);
}

export function appendCcDiscoveryAliases<T extends CcDiscoveryCatalogEntry>(
  models: T[],
  isEnabled: (entry: T) => boolean
): T[] {
  if (!Array.isArray(models)) return models;

  const aliases: T[] = [];
  for (const model of models) {
    const id = model.id;
    if (typeof id !== "string" || !isMirrorableId(id)) continue;
    if (!isEnabled(model)) continue;

    const isCombo = model.owned_by === "combo";
    // Skip built-in auto combos — advertised-but-unroutable (see the regex above).
    if (isCombo && BUILTIN_AUTO_COMBO_RE.test(id)) continue;
    const aliasId = isCombo ? `${CC_DISCOVERY_COMBO_PREFIX}${id}` : `${CC_DISCOVERY_PREFIX}${id}`;
    const label = typeof model.name === "string" && model.name ? model.name : id;

    aliases.push({
      ...model,
      id: aliasId,
      root: id,
      display_name: `${label} (OmniRoute)`,
    } as T);
  }

  return aliases.length > 0 ? [...models, ...aliases] : models;
}
