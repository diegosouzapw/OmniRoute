export type KeyStatus = "active" | "disabled" | "banned" | "expired";

// "manage" scope = management key; "restricted" = has model/connection allowlists;
// "standard" = no manage scope and no allowlists.
// Note: a "manage" key with allowlists is still classified as "manage" (manage takes priority).
export type KeyType = "standard" | "manage" | "restricted";

export interface ApiKeyShape {
  isActive?: boolean;
  isBanned?: boolean;
  expiresAt?: string | null;
  scopes?: string[];
  allowedModels?: string[] | null;
  allowedConnections?: string[] | null;
}

export function isKeyActive(k: ApiKeyShape): boolean {
  if (k.isBanned === true) return false;
  if (k.isActive === false) return false;
  if (k.expiresAt) {
    return new Date(k.expiresAt).getTime() > Date.now();
  }
  return true;
}

export function isExpired(k: ApiKeyShape): boolean {
  if (!k.expiresAt) return false;
  const ts = new Date(k.expiresAt).getTime();
  if (Number.isNaN(ts)) return false;
  return ts < Date.now();
}

export function isRestricted(k: ApiKeyShape): boolean {
  const hasModelRestrictions = Array.isArray(k.allowedModels) && k.allowedModels.length > 0;
  const hasConnectionRestrictions =
    Array.isArray(k.allowedConnections) && k.allowedConnections.length > 0;
  return hasModelRestrictions || hasConnectionRestrictions;
}

export function classifyKeyStatus(k: ApiKeyShape): KeyStatus {
  if (k.isBanned === true) return "banned";
  if (isExpired(k)) return "expired";
  if (k.isActive === false) return "disabled";
  return "active";
}

export function classifyKeyType(k: ApiKeyShape): KeyType {
  if (Array.isArray(k.scopes) && k.scopes.includes("manage")) return "manage";
  if (isRestricted(k)) return "restricted";
  return "standard";
}

export interface ApiKeyCounts {
  total: number;
  active: number;
  disabled: number;
  banned: number;
  expired: number;
  standard: number;
  manage: number;
  restricted: number;
}

export function computeApiKeyCounts(keys: ApiKeyShape[]): ApiKeyCounts {
  const counts: ApiKeyCounts = {
    total: keys.length,
    active: 0,
    disabled: 0,
    banned: 0,
    expired: 0,
    standard: 0,
    manage: 0,
    restricted: 0,
  };

  for (const k of keys) {
    const status = classifyKeyStatus(k);
    counts[status] += 1;

    const type = classifyKeyType(k);
    counts[type] += 1;
  }

  return counts;
}

export function toLocalDateTimeInputValue(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export function formatUsdCost(value: number, locale: string): string {
  const amount = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount > 0 && amount < 1 ? 4 : 2,
    maximumFractionDigits: amount > 0 && amount < 1 ? 4 : 2,
  }).format(amount);
}
