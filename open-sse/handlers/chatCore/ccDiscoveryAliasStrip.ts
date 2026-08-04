/**
 * chatCore cc-discovery alias strip (request-path counterpart of
 * open-sse/utils/ccDiscoveryAliases.ts, which only synthesizes the `claude/…`
 * mirror entries on the /v1/models catalog).
 *
 * Claude Code's gateway model discovery only lists ids starting with `claude`/
 * `anthropic`, so the catalog mirrors every eligible model under `claude/<id>`
 * (and `claude/combo/<name>` for combos). When a client actually sends one of
 * those mirror ids back on a chat request, this module strips the `claude/`
 * wrapper back to the real id BEFORE provider resolution — desambiguating the
 * synthetic alias from the legitimate Claude OAuth provider namespace, whose
 * real ids (`claude/claude-fable-5`, etc.) must never be touched.
 *
 * Pure function, no I/O: every lookup the decision depends on (is `rest` a
 * real Claude-provider model? is the first path segment a known provider
 * prefix? does the combo exist? is the alias gate on for this real id?) is
 * injected via `deps`, mirroring the `applyClaudeEffortVariant` /
 * `stripNoThinkingAlias` precedent so the branch logic here stays testable
 * without touching the DB or the provider registry directly.
 */

const CC_DISCOVERY_PREFIX = "claude/";
const CC_DISCOVERY_COMBO_PREFIX = "combo/";

export interface CcDiscoveryStripDeps {
  /** True when `rest` resolves to a real model of the legitimate "claude" OAuth provider. */
  isClaudeProviderModel(rest: string): boolean;
  /** True when `prefix` is a known/routable provider id or alias. */
  isKnownProviderPrefix(prefix: string): boolean;
  /** True when a combo named `name` exists. */
  hasCombo(name: string): boolean;
  /** True when the cc-discovery alias gate is enabled for the real id `rest` resolves to. */
  aliasEnabledFor(rest: string): boolean;
}

export interface CcDiscoveryStripResult {
  model: string;
  stripped: boolean;
}

/**
 * Strip the `claude/` discovery-alias wrapper back to the real model id.
 *
 * Branches (see task brief for the canonical spec):
 *  1. Not a `claude/`-prefixed id → untouched.
 *  2. `rest` is a real Claude-provider model → untouched (legitimate passthrough).
 *  3. `rest` is `combo/<name>` → stripped to `<name>` iff the combo exists AND the gate is on.
 *  4. Otherwise `rest` is `<provider>/<model>` → stripped to `rest` iff the prefix is a known
 *     provider AND the gate is on.
 *  5. Any gate/lookup miss → untouched (an unknown/gated model just flows through normally,
 *     picking up whatever "unknown model" handling already exists downstream).
 */
export function stripCcDiscoveryAlias(
  model: string,
  deps: CcDiscoveryStripDeps
): CcDiscoveryStripResult {
  if (typeof model !== "string" || !model.startsWith(CC_DISCOVERY_PREFIX)) {
    return { model, stripped: false };
  }

  const rest = model.slice(CC_DISCOVERY_PREFIX.length);

  // Legitimate Claude OAuth provider model (e.g. "claude/claude-fable-5") — never re-target.
  if (deps.isClaudeProviderModel(rest)) {
    return { model, stripped: false };
  }

  if (rest.startsWith(CC_DISCOVERY_COMBO_PREFIX)) {
    const comboName = rest.slice(CC_DISCOVERY_COMBO_PREFIX.length);
    if (deps.hasCombo(comboName) && deps.aliasEnabledFor(rest)) {
      return { model: comboName, stripped: true };
    }
    return { model, stripped: false };
  }

  const slashIndex = rest.indexOf("/");
  if (
    slashIndex > 0 &&
    deps.isKnownProviderPrefix(rest.slice(0, slashIndex)) &&
    deps.aliasEnabledFor(rest)
  ) {
    return { model: rest, stripped: true };
  }

  return { model, stripped: false };
}
