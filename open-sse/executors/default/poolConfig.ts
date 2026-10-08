import type { PoolConfig } from "../../services/sessionPool/types.ts";
import type { StrictValidationDispatch } from "../base/validationDispatch.ts";

export function normalizePoolConfig(value: Record<string, unknown>): PoolConfig | null {
  const {
    minSessions,
    maxSessions,
    cooldownBase,
    cooldownMax,
    cooldownJitter,
    requestTimeout,
    requestJitter,
  } = value;
  if (
    typeof minSessions !== "number" ||
    typeof maxSessions !== "number" ||
    typeof cooldownBase !== "number" ||
    typeof cooldownMax !== "number" ||
    typeof cooldownJitter !== "number" ||
    typeof requestTimeout !== "number" ||
    typeof requestJitter !== "number"
  ) {
    return null;
  }
  return {
    minSessions,
    maxSessions,
    cooldownBase,
    cooldownMax,
    cooldownJitter,
    requestTimeout,
    requestJitter,
  };
}

/**
 * A pool may warm anonymous sessions or replace authentication headers, so strict model
 * validation rejects before any session is created or acquired (and before any concurrency
 * slot is taken).
 */
export function rejectStrictPool(
  observer: StrictValidationDispatch | undefined,
  poolConfig: PoolConfig | undefined
): void {
  if (observer && poolConfig) observer.reject();
}
