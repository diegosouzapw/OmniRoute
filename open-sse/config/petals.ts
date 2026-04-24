export const PETALS_DEFAULT_BASE_URL = "https://chat.petals.dev/api/v1/generate";
export const PETALS_DEFAULT_MODEL = "stabilityai/StableBeluga2";

export function normalizePetalsBaseUrl(baseUrl: string | null | undefined): string {
  const normalized = String(baseUrl || PETALS_DEFAULT_BASE_URL)
    .trim()
    .replace(/\/+$/, "");

  if (normalized.endsWith("/api/v1/generate")) {
    return normalized;
  }
  if (normalized.endsWith("/api/v1")) {
    return `${normalized}/generate`;
  }
  if (normalized.endsWith("/api")) {
    return `${normalized}/v1/generate`;
  }
  return `${normalized}/api/v1/generate`;
}
