import { parseRecord } from "./sqliteStore";
import type { SessionAccountAffinityRecord } from "./store";

// Redis liveness is atomic and server-relative; JSON expiresAt is informational.
export const READ_WITH_TTL = `
local raw = redis.call("GET", KEYS[1])
if not raw then return {false, -2} end
return {raw, redis.call("PTTL", KEYS[1])}
`;

// Empty expected represents an absent key; compare the original bytes, never a
// reserialized/local-deadline record. Rejection returns the winner atomically.
export const COMPARE_AND_UPDATE = `
local raw = redis.call("GET", KEYS[1])
local ttl = redis.call("PTTL", KEYS[1])
if (raw or "") ~= ARGV[1] then return {0, raw or false, ttl} end
if ARGV[2] == "" then return {redis.call("DEL", KEYS[1]), false, -2} end
redis.call("SET", KEYS[1], ARGV[2], "PX", ARGV[3])
return {1, ARGV[2], ARGV[3]}
`;

export interface RedisObservation {
  raw: string | null;
  pttl: number;
}

export function redisReadResult(result: unknown): RedisObservation {
  if (!Array.isArray(result)) throw new Error("invalid affinity Redis read reply");
  return {
    raw: typeof result[0] === "string" ? result[0] : null,
    pttl: Number(result[1]),
  };
}

export function redisMutationResult(result: unknown): RedisObservation & { updated: number } {
  if (!Array.isArray(result)) throw new Error("invalid affinity Redis mutation reply");
  return { ...redisReadResult(result.slice(1)), updated: Number(result[0]) };
}

export function liveRedisRecord(
  observed: RedisObservation,
  localNow: number
): SessionAccountAffinityRecord | null {
  if (!Number.isFinite(observed.pttl) || (observed.pttl <= 0 && observed.pttl !== -1)) return null;
  const record = parseRecord(observed.raw);
  if (!record) return null;
  // No-expiry keys remain live independently of the previous writer's clock.
  const deadline = observed.pttl === -1 ? 8_640_000_000_000_000 : localNow + observed.pttl;
  return { ...record, expiresAt: new Date(deadline).toISOString() };
}
