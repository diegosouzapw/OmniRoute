/**
 * Legacy synchronous SQLite API remains compatible with existing callers/tests.
 * Request routing awaits Redis operations; SQLite mutations stay synchronous;
 * synchronous consumers prefetch only for Redis; SQLite reads stay in place.
 */
export {
  getSessionAccountAffinity,
  upsertSessionAccountAffinity,
  touchSessionAccountAffinity,
  deleteSessionAccountAffinity,
  evictSessionAccountAffinityForConnection,
  cleanupStaleSessionAccountAffinities,
  startSessionAccountAffinityCleanup,
} from "./sessionAffinity/sqliteStore";
export { getSessionAffinityStore } from "./sessionAffinity/storeFactory";
export {
  evictSessionAccountAffinityForConnectionAsync,
  deleteSessionAccountAffinityBestEffort,
} from "./sessionAffinity/requestEviction";
export type { SessionAccountAffinityRecord } from "./sessionAffinity/store";
