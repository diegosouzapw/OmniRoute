/**
 * Pricing data — DEFAULT_PRICING barrel (spread-merge of 2 parts) (god-file decomposition). Pure data; merged by the barrel.
 */
import { DEFAULT_PRICING_PART1 } from "./default-pricing.part1";
import { DEFAULT_PRICING_PART2 } from "./default-pricing.part2";

export const DEFAULT_PRICING = {
  ...DEFAULT_PRICING_PART1,
  ...DEFAULT_PRICING_PART2,
};
