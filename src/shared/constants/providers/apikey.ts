/**
 * APIKEY provider catalog barrel — merges the 3 source parts (god-file decomposition).
 * Behavior-identical to the previous single object; spread preserves order & all entries.
 */
import { APIKEY_PROVIDERS_PART1 } from "./apikey.part1";
import { APIKEY_PROVIDERS_PART2 } from "./apikey.part2";
import { APIKEY_PROVIDERS_PART3 } from "./apikey.part3";

export const APIKEY_PROVIDERS = {
  ...APIKEY_PROVIDERS_PART1,
  ...APIKEY_PROVIDERS_PART2,
  ...APIKEY_PROVIDERS_PART3,
};
