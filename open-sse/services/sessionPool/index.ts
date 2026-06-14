/**
 * Session Pool — Barrel exports
 *
 * Usage:
 *   import { SessionPool, Session, FingerprintRotator, SessionFactory, withSessionPool } from "./sessionPool/index.ts";
 *   import type { PoolConfig, PoolStats, PoolSessionDetail } from "./sessionPool/types.ts";
 */

export { Session } from "./session.ts";
export { SessionPool } from "./sessionPool.ts";
export { SessionFactory } from "./sessionFactory.ts";
export { FingerprintRotator } from "./fingerprintRotator.ts";
export { withSessionPool } from "./webExecutorWrapper.ts";
export { PoolRegistry } from "./poolRegistry.ts";

export type {
  Fingerprint,
  SessionState,
  SessionResult,
  PoolConfig,
  PoolStats,
  PoolSessionDetail,
  WebExecutorFn,
  WebExecutorRequest,
  WebExecutorResponse,
} from "./types.ts";

export { DEFAULT_POOL_CONFIG } from "./types.ts";
