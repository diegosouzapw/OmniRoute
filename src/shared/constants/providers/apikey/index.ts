/**
 * APIKEY provider catalog barrel — merges the semantic family files into one object
 * (god-file decomposition). Pure data; spread preserves every entry. Keys are now grouped
 * by provider family (was historical-accretion order); lookups are by-key so this is a
 * cosmetic-only iteration-order change (e.g. the dashboard blocked-providers grid).
 */
import { APIKEY_PROVIDERS_GATEWAYS } from "./gateways";
import { APIKEY_PROVIDERS_FRONTIER } from "./frontier-labs";
import { APIKEY_PROVIDERS_INFERENCE } from "./inference-hosts";
import { APIKEY_PROVIDERS_ENTERPRISE } from "./enterprise-cloud";
import { APIKEY_PROVIDERS_REGIONAL } from "./regional";
import { APIKEY_PROVIDERS_SPECIALTY } from "./specialty-media";

export const APIKEY_PROVIDERS = {
  ...APIKEY_PROVIDERS_GATEWAYS,
  ...APIKEY_PROVIDERS_FRONTIER,
  ...APIKEY_PROVIDERS_INFERENCE,
  ...APIKEY_PROVIDERS_ENTERPRISE,
  ...APIKEY_PROVIDERS_REGIONAL,
  ...APIKEY_PROVIDERS_SPECIALTY,
};
