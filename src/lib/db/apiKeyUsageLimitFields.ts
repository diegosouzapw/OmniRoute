type UsageLimitRecord = Record<string, unknown>;

export interface ApiKeyUsageLimitFields {
  usageLimitEnabled: boolean;
  dailyUsageLimitUsd: number | null;
  weeklyUsageLimitUsd: number | null;
}

export function parseUsageLimitEnabled(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

export function parseNullablePositiveNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  return null;
}

export function parseApiKeyUsageLimitFields(record: UsageLimitRecord): ApiKeyUsageLimitFields {
  return {
    usageLimitEnabled: parseUsageLimitEnabled(
      record.usage_limit_enabled ?? record.usageLimitEnabled
    ),
    dailyUsageLimitUsd: parseNullablePositiveNumber(
      record.daily_usage_limit_usd ?? record.dailyUsageLimitUsd
    ),
    weeklyUsageLimitUsd: parseNullablePositiveNumber(
      record.weekly_usage_limit_usd ?? record.weeklyUsageLimitUsd
    ),
  };
}

export function hasUsageLimitUpdate(update: UsageLimitRecord): boolean {
  return (
    update.usageLimitEnabled !== undefined ||
    update.dailyUsageLimitUsd !== undefined ||
    update.weeklyUsageLimitUsd !== undefined
  );
}

export function appendUsageLimitUpdates(
  update: UsageLimitRecord,
  updates: string[],
  params: {
    usageLimitEnabled?: number;
    dailyUsageLimitUsd?: number | null;
    weeklyUsageLimitUsd?: number | null;
  }
) {
  if (update.usageLimitEnabled !== undefined) {
    updates.push("usage_limit_enabled = @usageLimitEnabled");
    params.usageLimitEnabled = update.usageLimitEnabled === true ? 1 : 0;
  }
  if (update.dailyUsageLimitUsd !== undefined) {
    updates.push("daily_usage_limit_usd = @dailyUsageLimitUsd");
    params.dailyUsageLimitUsd = parseNullablePositiveNumber(update.dailyUsageLimitUsd);
  }
  if (update.weeklyUsageLimitUsd !== undefined) {
    updates.push("weekly_usage_limit_usd = @weeklyUsageLimitUsd");
    params.weeklyUsageLimitUsd = parseNullablePositiveNumber(update.weeklyUsageLimitUsd);
  }
}
