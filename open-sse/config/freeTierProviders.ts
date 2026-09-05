/**
 * freeTierProviders.ts — registration list of providers with documented free models.
 *
 * Derived from `FREE_MODEL_BUDGETS` (`./freeModelCatalog.data.ts`) filtered by
 * `grantsFreeAccess` (`./freeModelCatalog.ts`), so a `discontinued` entry never
 * grants access. Pure data — no imports outside `open-sse/config`, no module
 * state — so it cannot introduce a cycle and `open-sse/config/providerPluginManifest.ts`
 * stays a light leaf. The open-sse typecheck gate forbids open-sse → src imports;
 * `src/shared/utils/freeModels.ts` reads the same source for dashboard use.
 */

import { FREE_MODEL_BUDGETS } from "./freeModelCatalog.data.ts";
import { grantsFreeAccess } from "./freeModelCatalog.ts";

const FREE_BUDGETS = FREE_MODEL_BUDGETS.filter((m) => grantsFreeAccess(m.freeType));

export const FREE_TIER_PROVIDER_SET: ReadonlySet<string> = new Set(
  FREE_BUDGETS.map((m) => m.provider),
);

export function hasFreeTierProvider(idOrAlias: string | undefined | null): boolean {
  if (typeof idOrAlias !== "string") return false;
  return FREE_TIER_PROVIDER_SET.has(idOrAlias);
}
