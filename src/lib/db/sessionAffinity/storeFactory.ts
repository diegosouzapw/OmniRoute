import { getRedisClient, isRedisConfigured } from "@/shared/utils/rateLimiter";
import { RedisSessionAffinityStore, type AffinityRedisClient } from "./redisStore";
import { sqliteSessionAffinityStore } from "./sqliteStore";
import type { SessionAffinityStore } from "./store";

/** Bound the whole store call (including lazy client acquisition), not each command. */
export const SESSION_AFFINITY_REDIS_TIMEOUT_MS = 100;

interface RedisDependencies {
  getClient: () => Promise<AffinityRedisClient>;
  isConfigured: () => boolean;
}
const productionRedis: RedisDependencies = {
  getClient: getRedisClient,
  isConfigured: isRedisConfigured,
};
let dependencies = productionRedis;
let redisStore: SessionAffinityStore | null = null;
let fallbackWarned = false;

/** Test-only client injection; does not construct or connect an ioredis instance. */
export function _setSessionAffinityRedisForTests(value: RedisDependencies | null): void {
  dependencies = value ?? productionRedis;
  redisStore = null;
  fallbackWarned = false;
}

export function getSessionAffinityStore(): SessionAffinityStore {
  const driver = process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
  if (driver === "redis" && dependencies.isConfigured()) {
    redisStore ??= new RedisSessionAffinityStore(
      dependencies.getClient,
      sqliteSessionAffinityStore,
      SESSION_AFFINITY_REDIS_TIMEOUT_MS
    );
    return redisStore;
  }
  // Unknown values and redis-without-REDIS_URL never enable shared storage.
  if (!fallbackWarned && driver && driver !== "sqlite") {
    fallbackWarned = true;
    console.warn("[SESSION_AFFINITY] Redis store not selected/configured; using SQLite.");
  }
  return sqliteSessionAffinityStore;
}
