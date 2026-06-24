/**
 * db/apiKeys/types.ts — shared API-key value types.
 *
 * Extracted from db/apiKeys.ts (god-file decomposition): the persisted-row shapes
 * that both the host module and the row-parser leaf need. Kept as a neutral leaf so
 * apiKeys.ts and apiKeys/rowParsers.ts can import them without a cycle. apiKeys.ts
 * re-exports both interfaces to preserve its historical public surface.
 */

export interface RateLimitRule {
  limit: number;
  window: number;
}

export interface AccessSchedule {
  enabled: boolean;
  from: string;
  until: string;
  days: number[];
  tz: string;
}
