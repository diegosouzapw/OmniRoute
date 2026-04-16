export const ANTIGRAVITY_BASE_URLS = Object.freeze([
  "https://daily-cloudcode-pa.googleapis.com",
  "https://daily-cloudcode-pa.sandbox.googleapis.com",
  "https://cloudcode-pa.googleapis.com",
]);

const ANTIGRAVITY_MODELS_PATH = "/v1internal:models";
const ANTIGRAVITY_FETCH_AVAILABLE_MODELS_PATH = "/v1internal:fetchAvailableModels";

function buildAntigravityUrls(path: string): string[] {
  return ANTIGRAVITY_BASE_URLS.map((baseUrl) => `${baseUrl}${path}`);
}

export function getAntigravityModelsDiscoveryUrls(): string[] {
  return buildAntigravityUrls(ANTIGRAVITY_MODELS_PATH);
}

export function getAntigravityFetchAvailableModelsUrls(): string[] {
  return buildAntigravityUrls(ANTIGRAVITY_FETCH_AVAILABLE_MODELS_PATH);
}
