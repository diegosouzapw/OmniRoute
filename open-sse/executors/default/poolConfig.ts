import type { PoolConfig } from "../../services/sessionPool/types.ts";

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
