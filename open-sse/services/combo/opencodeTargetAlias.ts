/**
 * Issue #11912 — a combo step declared with the raw "opencode/<model>" prefix
 * is ambiguous: open-sse/services/model.ts's manual ALIAS_TO_PROVIDER_ID
 * override canonicalizes ANY "opencode/<model>" string to provider
 * "opencode-zen" (the api-key gateway) before dispatch. A round-robin combo
 * mixing declared "opencode/<model>" targets (intended as the free/dynamic
 * no-auth pool) with an explicit "opencode-zen/<model>" target therefore
 * collapses every rotation slot onto the SAME provider + connection identity
 * — every request executes against the single opencode-zen connection
 * instead of rotating across the free pool, and the account eventually
 * 429s.
 *
 * The combo BUILDER already avoids this for freshly-generated model strings
 * by emitting the "oc/" alias for the no-auth provider (#2901,
 * src/lib/combos/builderOptions.ts's rewriteQualifiedModelPrefix). This
 * mirrors that same substitution at combo TARGET RESOLUTION time so a step
 * saved — or hand-typed — with the raw "opencode/" prefix still reaches the
 * true no-auth provider and stays a distinct rotation identity from an
 * explicit "opencode-zen/<model>" target.
 *
 * Deliberately scoped to combo target resolution only — this never touches
 * open-sse/services/model.ts's general alias-resolution path, so a raw
 * client request to "opencode/<model>" outside a combo keeps routing to
 * opencode-zen unchanged (#2798/#3870), and the #7993 sibling credential
 * lookup (tests/unit/opencode-autocombo-search-pair.test.ts) is unaffected.
 */

const AMBIGUOUS_OPENCODE_PREFIX = "opencode";
const OPENCODE_NOAUTH_ALIAS = "oc";

/**
 * Rewrite a combo-declared model string's "opencode/" prefix to the "oc/"
 * no-auth alias. Every other prefix (including "opencode-zen/" and
 * "opencode-go/") passes through untouched.
 */
export function resolveComboTargetModelStr(modelStr: string): string {
  if (typeof modelStr !== "string" || modelStr.length === 0) return modelStr;
  const slashIndex = modelStr.indexOf("/");
  if (slashIndex <= 0) return modelStr;
  const prefix = modelStr.slice(0, slashIndex);
  if (prefix !== AMBIGUOUS_OPENCODE_PREFIX) return modelStr;
  return `${OPENCODE_NOAUTH_ALIAS}${modelStr.slice(slashIndex)}`;
}
