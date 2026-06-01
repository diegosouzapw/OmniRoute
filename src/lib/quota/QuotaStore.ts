/**
 * QuotaStore.ts — Public façade for the Quota Sharing Engine.
 *
 * Re-exports the interface types from types.ts and the factory from
 * storeFactory.ts so consumers have a single import point.
 *
 * Usage:
 *   import { getQuotaStore } from "@/lib/quota/QuotaStore";
 *   import type { QuotaStore, EnforceDecision } from "@/lib/quota/QuotaStore";
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F6).
 */

export type {
  QuotaStore,
  EnforceDecision,
  ConsumeResult,
  PoolUsageSnapshot,
  EnforceInput,
  RecordConsumptionInput,
} from "./types";

export { getQuotaStore, getQuotaStoreSync, resetQuotaStoreSingleton } from "./storeFactory";
