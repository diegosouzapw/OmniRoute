// API Key Providers — assembled from category sub-modules (split from definitions/apiKey.ts).
// Each sub-module owns a slice of the original provider map; this barrel merges them
// back into the single APIKEY_PROVIDERS export expected by consumers.
import { APIKEY_PROVIDERS_MAJOR } from "./major";
import { APIKEY_PROVIDERS_CLOUD } from "./cloud";
import { APIKEY_PROVIDERS_CHINESE } from "./chinese";
import { APIKEY_PROVIDERS_ROUTERS } from "./routers";
import { APIKEY_PROVIDERS_SPECIALTY } from "./specialty";
import { APIKEY_PROVIDERS_COMMUNITY } from "./community";

export const APIKEY_PROVIDERS = {
  ...APIKEY_PROVIDERS_MAJOR,
  ...APIKEY_PROVIDERS_CLOUD,
  ...APIKEY_PROVIDERS_CHINESE,
  ...APIKEY_PROVIDERS_ROUTERS,
  ...APIKEY_PROVIDERS_SPECIALTY,
  ...APIKEY_PROVIDERS_COMMUNITY,
};