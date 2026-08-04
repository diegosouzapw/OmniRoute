/**
 * Pure, dependency-free resolution of which scope(s) a subscription's synced
 * proxy pool should be bound to.
 *
 * Extracted from `subscriptionService.resolveTargetScopes` so the routing
 * rule is unit-testable without the full DB / Next.js stack.
 */

export type TargetScope = { scope: "global" | "provider"; scopeId: string | null };

export interface ScopeInput {
  mode: "global" | "rule";
  ruleProviders?: string[] | null;
}

/**
 * Resolve the target scopes for a subscription.
 *
 *  - `global` mode (or `rule` mode with no providers selected) binds the
 *    global scope, so every provider's traffic is proxied.
 *  - `rule` mode with providers binds one provider scope per selected
 *    provider, so only those providers' traffic is proxied and the rest go
 *    direct.
 */
export function resolveTargetScopes(sub: ScopeInput): TargetScope[] {
  if (sub.mode === "rule" && sub.ruleProviders && sub.ruleProviders.length > 0) {
    return sub.ruleProviders.map((p) => ({ scope: "provider" as const, scopeId: p }));
  }
  // global mode, or rule mode with no providers selected → bind global.
  return [{ scope: "global" as const, scopeId: null }];
}
