const ENABLED_VALUES = new Set(["1", "true", "yes", "on"]);

export function isApiKeyRevealEnabled(): boolean {
  const raw = String(process.env.ALLOW_API_KEY_REVEAL || "")
    .trim()
    .toLowerCase();
  return ENABLED_VALUES.has(raw);
}

export function maskStoredApiKey(key: unknown): string | null {
  if (typeof key !== "string") return null;
  return key.slice(0, 8) + "****" + key.slice(-4);
}
