import type { CircuitBreakerStore } from "./circuitBreakerStore";
import type { WarmupResult } from "./core";

type RedisCtor = new (url: string, opts?: Record<string, unknown>) => any;

let storeInstance: CircuitBreakerStore | null = null;
let storeIsRedis = false;
let redisClient: { disconnect?: () => void } | null = null;
/**
 * The probe currently in flight, if any. Without it two concurrent callers
 * both see a null cache, both build a store, and the loser's Redis client is
 * overwritten before anything can close it -- a leaked socket that holds the
 * event loop open. Concurrent callers await the first probe instead.
 */
let pending: Promise<CircuitBreakerStore> | null = null;

/**
 * Wraps a Redis-backed store so a runtime Redis failure drops the cached
 * instance instead of being served from cache forever.
 *
 * Without this the cache is a trap: `getCircuitBreakerStore()` returns early on
 * `storeInstance`, and the Redis methods do not catch their own errors (only
 * the SQLite backup writes inside them do), so once Redis dies every later
 * warmup run gets the same dead client and throws again until the process
 * restarts. The error still propagates -- the run that hit the outage fails --
 * but the next call re-probes Redis and falls back to SQLite when it is gone.
 *
 * The three methods are listed explicitly rather than proxied because
 * `CircuitBreakerStore` has exactly three, and a missed one would silently keep
 * the old behaviour.
 *
 * Kept as a named class, not an object literal: the factory's own tests
 * identify a store by `constructor.name`, so an anonymous wrapper would make a
 * Redis-backed store report itself as `Object`.
 */
class RedisCircuitBreakerStoreWithFailureReset implements CircuitBreakerStore {
  constructor(private inner: CircuitBreakerStore) {}

  private static onFailure(err: unknown): never {
    clearCircuitBreakerStoreOnRedisError();
    throw err;
  }

  get(connectionId: string) {
    return this.inner.get(connectionId).catch(RedisCircuitBreakerStoreWithFailureReset.onFailure);
  }

  recordResult(connectionId: string, result: WarmupResult) {
    return this.inner
      .recordResult(connectionId, result)
      .catch(RedisCircuitBreakerStoreWithFailureReset.onFailure);
  }

  isInBackoff(connectionId: string) {
    return this.inner
      .isInBackoff(connectionId)
      .catch(RedisCircuitBreakerStoreWithFailureReset.onFailure);
  }
}

/**
 * Returns the circuit-breaker store. Prefers Redis when REDIS_URL is set,
 * falls back to SQLite. If Redis was connected once but later fails at
 * runtime, clears the cached instance so the next call re-probes Redis
 * (or falls back to SQLite if Redis is still down).
 *
 * Concurrent callers share one probe rather than each starting their own.
 *
 * Known ceiling, unchanged by that reset: once the SQLite store is cached the
 * process keeps it, because only a Redis-backed store is ever evicted. A Redis
 * that comes back is picked up on the next process start, not sooner.
 */
export function getCircuitBreakerStore(): Promise<CircuitBreakerStore> {
  if (storeInstance) return Promise.resolve(storeInstance);
  if (pending) return pending;

  const p = buildStore().finally(() => {
    // Only retract our own promise. A reset can already have replaced it, and
    // nulling someone else's would let the next caller start a second probe.
    if (pending === p) pending = null;
  });
  pending = p;
  return p;
}

async function buildStore(): Promise<CircuitBreakerStore> {
  const redisUrl = process.env.REDIS_URL;
  if (redisUrl) {
    try {
      const mod = await import("ioredis");
      const RedisCtor = (mod.default ?? mod) as RedisCtor;
      const redis = new RedisCtor(redisUrl, {
        maxRetriesPerRequest: 3,
        connectTimeout: 3000,
        lazyConnect: true,
        retryStrategy: () => null,
      });
      // Hand the client to closeRedisClient's care before anything that can
      // throw. connect() and ping() both can, and a client the catch below
      // cannot see is a socket nobody ever closes.
      redisClient = redis;
      await redis.connect();
      await redis.ping();
      const { RedisCircuitBreakerStore } = await import("./redisCircuitBreakerStore");
      storeInstance = new RedisCircuitBreakerStoreWithFailureReset(
        new RedisCircuitBreakerStore(redis)
      );
      storeIsRedis = true;
      return storeInstance;
    } catch {
      closeRedisClient();
      storeInstance = null;
      storeIsRedis = false;
    }
  }

  const { SqliteCircuitBreakerStore } = await import("./sqliteCircuitBreakerStore");
  storeInstance = new SqliteCircuitBreakerStore();
  storeIsRedis = false;
  return storeInstance;
}

/**
 * Call when a Redis store operation fails at runtime. Clears the cached
 * instance so the next getCircuitBreakerStore() call re-probes. This
 * prevents a transient Redis blip from permanently killing warmup IO.
 */
export function clearCircuitBreakerStoreOnRedisError(): void {
  if (storeIsRedis) {
    closeRedisClient();
    storeInstance = null;
    storeIsRedis = false;
  }
}

/**
 * Releases the ioredis handle we are about to stop referencing. `retryStrategy`
 * returns null so a dropped client never reconnects on its own, but the socket
 * still holds the event loop open, and every re-probe would add another one.
 *
 * `disconnect()` rather than the graceful `quit()`, on purpose. We only get
 * here once the client has been judged dead, so there is no reply worth
 * draining -- and `quit()` on a client that never finished connecting is
 * queued until it is ready, which `retryStrategy: () => null` guarantees will
 * never happen. That promise never settles, so anything chained to it to do
 * the actual release never runs and the handle leaks. `disconnect()` closes
 * the socket now, whatever state it is in.
 */
function closeRedisClient(): void {
  const client = redisClient;
  redisClient = null;
  if (!client) return;
  try {
    client.disconnect?.();
  } catch {
    /* the handle is already gone; nothing left to release */
  }
}

/**
 * Test hook: forget everything and release the client.
 *
 * Call it between operations, never while a probe is in flight. Dropping
 * `pending` mid-build leaves that build running: it will still assign
 * `storeInstance` when it finishes, and a caller arriving in the meantime
 * starts a second one, which is the duplicate the pending guard exists to
 * prevent. Every call site today either precedes the first
 * getCircuitBreakerStore() or sits in a finally after awaiting it, so the
 * window stays closed by discipline rather than by machinery.
 */
export function __resetCircuitBreakerFactory(): void {
  closeRedisClient();
  storeInstance = null;
  storeIsRedis = false;
  pending = null;
}
