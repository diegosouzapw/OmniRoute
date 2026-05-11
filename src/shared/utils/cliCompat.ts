export function normalizeCliCompatProviderId(providerId: string): string {
  const normalized = providerId.toLowerCase();
  if (normalized === "copilot") return "github";
  return normalized;
}
