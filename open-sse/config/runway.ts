export const RUNWAYML_DEFAULT_BASE_URL = "https://api.dev.runwayml.com/v1";
export const RUNWAYML_API_VERSION = "2024-11-06";

export const RUNWAYML_SUPPORTED_VIDEO_MODELS = [
  { id: "gen4.5", name: "Gen-4.5" },
  { id: "gen4_turbo", name: "Gen-4 Turbo" },
  { id: "veo3.1", name: "Veo 3.1" },
  { id: "veo3.1_fast", name: "Veo 3.1 Fast" },
  { id: "veo3", name: "Veo 3" },
  { id: "gen3a_turbo", name: "Gen-3 Alpha Turbo" },
];

export const RUNWAYML_IMAGE_REQUIRED_MODELS = new Set(["gen4_turbo", "gen3a_turbo"]);

export function normalizeRunwayBaseUrl(baseUrl?: string | null) {
  const normalized = String(baseUrl || "")
    .trim()
    .replace(/\/$/, "");
  if (!normalized) return RUNWAYML_DEFAULT_BASE_URL;

  const stripped = normalized
    .replace(/\/organization$/i, "")
    .replace(/\/tasks\/[^/]+$/i, "")
    .replace(/\/(?:image_to_video|text_to_video)$/i, "");

  return stripped.endsWith("/v1") ? stripped : `${stripped}/v1`;
}

export function buildRunwayApiUrl(path: string, baseUrl?: string | null) {
  const normalizedBaseUrl = normalizeRunwayBaseUrl(baseUrl);
  return `${normalizedBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildRunwayHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "X-Runway-Version": RUNWAYML_API_VERSION,
  };
}
