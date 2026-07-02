/**
 * Pricing data — DEFAULT_PRICING barrel (god-file decomposition). Merges the semantic family files
 * via spread; preserves every entry. Keys are grouped by provider family (was partN order);
 * pricing lookups are by-key (getPricingForModel) so this is a cosmetic-only ordering change.
 */
import { DEFAULT_PRICING_OAUTH } from "./oauth-subscriptions";
import { DEFAULT_PRICING_FRONTIER } from "./frontier-labs";
import { DEFAULT_PRICING_INFERENCE } from "./inference-hosts";
import { DEFAULT_PRICING_REGIONAL } from "./regional";

export const DEFAULT_PRICING = {
  ...DEFAULT_PRICING_OAUTH,
  ...DEFAULT_PRICING_FRONTIER,
  ...DEFAULT_PRICING_INFERENCE,
  ...DEFAULT_PRICING_REGIONAL,
};
