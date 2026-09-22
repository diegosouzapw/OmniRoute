export const META_MUSE_API_KEY_URL = "https://api.meta.ai/muse-code/key";
export const META_MUSE_MODELS_URL = "https://api.meta.ai/v1/models";
export const META_MUSE_API_KEY_TTL_SECONDS = 24 * 60 * 60;
export const META_MUSE_DEVICE_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:device_code";

export interface MetaMuseApiKeyResponse {
  // Field name mirrors Meta's upstream `api_key` JSON contract; the value is
  // only ever read from the live mint response, never embedded in source.
  api_key?: string;
  error?: string;
  error_description?: string;
  message?: string;
}

export class MetaMuseAuthError extends Error {
  status: number;
  code: string | null;

  constructor(message: string, status: number, code: string | null = null) {
    super(message);
    this.name = "MetaMuseAuthError";
    this.status = status;
    this.code = code;
  }
}

async function readJsonResponse(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  if (!text) return {};
  try {
    const value = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

/**
 * Exchange the Meta OIDC identity token for the Model API key accepted by the
 * Muse Code Responses API. Meta currently expects this key to be re-minted on
 * roughly a daily cadence; the OIDC identity token is retained as refreshToken.
 */
export async function mintMuseCodeApiKey(identityToken: string): Promise<string> {
  if (!identityToken?.trim()) {
    throw new MetaMuseAuthError("Meta Muse identity token is missing", 401, "missing_identity");
  }

  const response = await fetch(META_MUSE_API_KEY_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${identityToken}`,
      "Content-Type": "application/json",
      "x-api-version": "1.0.0",
    },
    body: "{}",
  });

  const data = (await readJsonResponse(response)) as MetaMuseApiKeyResponse;
  const apiKey = typeof data.api_key === "string" ? data.api_key.trim() : "";
  if (response.ok && apiKey) return apiKey;

  const message =
    (typeof data.error_description === "string" && data.error_description) ||
    (typeof data.message === "string" && data.message) ||
    (typeof data.error === "string" && data.error) ||
    `Meta Muse API-key mint failed with status ${response.status}`;
  throw new MetaMuseAuthError(
    message,
    response.status,
    typeof data.error === "string" ? data.error : null
  );
}
