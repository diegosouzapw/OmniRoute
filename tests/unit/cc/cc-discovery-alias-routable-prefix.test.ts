import { test } from "node:test";
import assert from "node:assert/strict";

import { isRoutableProviderPrefix } from "../../../src/lib/ccDiscoveryAliasResolve.ts";

/**
 * Regression guard for the "listed but rejected" cc-discovery alias mismatch.
 *
 * The /v1/models catalog mirrors `claude/<provider>/<model>` ids based purely on
 * the alias gate (src/app/api/v1/models/ccAliasPredicate.ts — it does NOT consult
 * any provider registry). The request path additionally required the prefix to be
 * an `open-sse` REGISTRY entry or an operator-defined custom node.
 *
 * Enterprise-cloud providers such as `azure-ai` / `azure-openai` live in the
 * provider CATALOG (src/shared/constants/providers/apikey/enterprise-cloud.ts)
 * and route fine directly (`azure-ai/Phi-4` → 200), but have no `open-sse`
 * registry entry. So the catalog advertised `claude/azure-ai/<model>` while the
 * request path refused to strip it — the id fell through with `claude` parsed as
 * the provider, and every request was routed to the Claude provider instead.
 *
 * These assertions pin the predicate to "can the router actually reach it",
 * which is the property the catalog side already assumes.
 */

test("catalog-only enterprise-cloud providers are routable (azure-ai regression)", () => {
  assert.equal(isRoutableProviderPrefix("azure-ai"), true);
  assert.equal(isRoutableProviderPrefix("azure-openai"), true);
});

test("open-sse registry providers stay routable", () => {
  assert.equal(isRoutableProviderPrefix("openai"), true);
  assert.equal(isRoutableProviderPrefix("anthropic"), true);
});

test("provider aliases resolve too", () => {
  // `azure` is the declared alias of the `azure-openai` catalog entry.
  assert.equal(isRoutableProviderPrefix("azure"), true);
});

test("an unknown prefix is not routable", () => {
  assert.equal(isRoutableProviderPrefix("definitely-not-a-provider-xyz"), false);
  assert.equal(isRoutableProviderPrefix(""), false);
});
