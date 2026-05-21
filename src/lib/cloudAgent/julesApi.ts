/** Jules REST API base — https://developers.google.com/jules/api */
export const JULES_API_BASE_URL = "https://jules.googleapis.com/v1alpha";

export function buildJulesApiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${JULES_API_BASE_URL}${normalized}`;
}
