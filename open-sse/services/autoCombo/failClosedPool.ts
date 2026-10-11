import type { AutoComboSpec } from "./virtualFactory";

/**
 * #15546: `auto/subscription` promises plan-included capacity only, so an empty
 * pool must stay empty. The flag is read by `expandAutoComboCandidatePool`,
 * which would otherwise widen an empty auto pool to every active provider's
 * full catalog (paid models included).
 */
export function failClosedAutoConfig(spec?: Pick<AutoComboSpec, "tier">): {
  failClosedWhenEmpty?: true;
  preserveRungOrder?: true;
} {
  // `auto/thrifty`: the pool is rung-ordered; scoring must not reshuffle the rungs.
  if (spec?.tier === "thrifty") return { preserveRungOrder: true };
  return spec?.tier === "subscription" ? { failClosedWhenEmpty: true } : {};
}
