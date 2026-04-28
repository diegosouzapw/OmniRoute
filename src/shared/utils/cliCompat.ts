export function normalizeCliCompatProviderId(providerId: string): string {
  return providerId.toLowerCase() === "copilot" ? "github" : providerId.toLowerCase();
}
