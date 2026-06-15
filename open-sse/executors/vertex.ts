import { SignJWT, importPKCS8 } from "jose";
import { BaseExecutor, ExecuteInput } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  [key: string]: unknown;
}

const TOKEN_CACHE = new Map<string, { token: string; expiresAt: number }>();

export function parseSAFromApiKey(apiKey: string): ServiceAccount {
  try {
    return JSON.parse(apiKey);
  } catch {
    throw new Error("Vertex AI requires a valid Service Account JSON as the API key");
  }
}

/**
 * A Service Account credential is a JSON object (type/client_email/private_key). A Vertex AI
 * Express-mode API key is an opaque non-JSON string. Distinguishing them lets the executor
 * support BOTH: Service Account JSON (JWT → OAuth → project-scoped endpoint + Bearer auth) and
 * Express keys (project-less publisher endpoint + x-goog-api-key auth), instead of failing every
 * Express key with "requires a valid Service Account JSON".
 */
export function looksLikeServiceAccountJson(apiKey: string): boolean {
  if (!apiKey || typeof apiKey !== "string") return false;
  try {
    const parsed = JSON.parse(apiKey);
    return !!parsed && typeof parsed === "object" && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

/** True for a Vertex AI Express-mode API key (a non-empty, non-JSON, non-OAuth credential). */
export function isExpressApiKey(apiKey?: string | null): boolean {
  return typeof apiKey === "string" && apiKey.trim().length > 0 && !looksLikeServiceAccountJson(apiKey);
}

export async function getAccessToken(sa: ServiceAccount): Promise<string> {
  if (!sa.client_email || !sa.private_key) {
    throw new Error(
      "Service Account JSON is missing required fields (client_email or private_key)"
    );
  }

  const cacheKey = sa.client_email;
  const cached = TOKEN_CACHE.get(cacheKey);

  // Buffer of 60 seconds
  if (cached && Date.now() < cached.expiresAt - 60_000) {
    return cached.token;
  }

  const privateKey = await importPKCS8(sa.private_key, "RS256");
  const now = Math.floor(Date.now() / 1000);

  const jwt = await new SignJWT({
    iss: sa.client_email,
    sub: sa.client_email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    // cloud-platform authorizes Vertex AI (aiplatform.googleapis.com) for chat/image execution.
    // generative-language.retriever is ADDITIONALLY required so model discovery can list the live
    // catalog from generativelanguage.googleapis.com/v1beta/models — without it that listing returns
    // 403 ACCESS_TOKEN_SCOPE_INSUFFICIENT and discovery silently falls back to the static ~10-model
    // registry list. Requesting the extra scope is harmless for execution (cloud-platform still
    // present) and for projects where it isn't needed (the mint never validates scope availability).
    scope:
      "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/generative-language.retriever",
  })
    .setProtectedHeader({ alg: "RS256", kid: sa.private_key_id })
    .sign(privateKey);

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    throw new Error(
      `Failed to exchange JWT for Vertex access token: ${tokenRes.status} ${errorText}`
    );
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    throw new Error("Vertex AI token exchange succeeded but no access_token found");
  }

  TOKEN_CACHE.set(cacheKey, {
    token: accessToken,
    expiresAt: (now + 3600) * 1000,
  });

  return accessToken;
}

const PARTNER_MODELS = new Set([
  "claude-3-5-sonnet",
  "claude-3-opus",
  "claude-3-haiku",
  "deepseek-v3",
  "deepseek-v3.2",
  "deepseek-v4",
  "deepseek-deepseek-r1",
  "qwen3-next-80b",
  "qwen3.6-",
  "llama-3.1",
  "mistral-",
  "glm-5",
  "glm-5.1",
  "meta/llama",
]);

function isPartnerModel(model: string) {
  const normalizedModel = model.toLowerCase();
  return [...PARTNER_MODELS].some((prefix) => normalizedModel.startsWith(prefix));
}

export class VertexExecutor extends BaseExecutor {
  constructor() {
    super("vertex", PROVIDERS.vertex);
  }

  async execute(input: ExecuteInput) {
    const { credentials, log } = input;
    // Defensive: trim stray surrounding whitespace from a pasted credential.
    if (typeof credentials.apiKey === "string") {
      credentials.apiKey = credentials.apiKey.trim();
    }
    // Service Account JSON → mint a short-lived OAuth token (Bearer). An Express-mode API key is
    // sent as-is via x-goog-api-key (see buildHeaders), so no token exchange is needed for it.
    if (credentials.apiKey && !credentials.accessToken && looksLikeServiceAccountJson(credentials.apiKey)) {
      try {
        const sa = parseSAFromApiKey(credentials.apiKey);
        credentials.accessToken = await getAccessToken(sa);
      } catch (err: any) {
        log?.error?.("VERTEX", `Failed to generate JWT token: ${err.message}`);
        throw err;
      }
    }
    return super.execute(input);
  }

  buildUrl(model: string, stream: boolean, urlIndex = 0, credentials: any = null) {
    // Vertex AI Express mode: project-less v1 publisher endpoint with the API key passed as a
    // ?key= query parameter (verified working contract — same as the CaptionAI GeminiClient). The
    // Express key is NOT accepted as a Bearer/OAuth credential or via x-goog-api-key on this API.
    if (isExpressApiKey(credentials?.apiKey) && !credentials?.accessToken) {
      const expressKey = encodeURIComponent(String(credentials.apiKey).trim());
      if (isPartnerModel(model)) {
        // Partner (Anthropic/etc.) models are not available via Express keys; best-effort.
        return `https://aiplatform.googleapis.com/v1/publishers/openapi/chat/completions?key=${expressKey}`;
      }
      const op = stream ? "streamGenerateContent?alt=sse&" : "generateContent?";
      return `https://aiplatform.googleapis.com/v1/publishers/google/models/${model}:${op}key=${expressKey}`;
    }

    const region = credentials?.providerSpecificData?.region || "us-central1";
    let project = "unknown-project";

    if (credentials?.apiKey) {
      try {
        const sa = parseSAFromApiKey(credentials.apiKey);
        if (sa.project_id) project = sa.project_id;
      } catch {
        // Ignored, handled in execute
      }
    }

    if (isPartnerModel(model)) {
      return `https://aiplatform.googleapis.com/v1/projects/${project}/locations/global/endpoints/openapi/chat/completions`;
    }
    return `https://aiplatform.googleapis.com/v1/projects/${project}/locations/${region}/publishers/google/models/${model}:${stream ? "streamGenerateContent?alt=sse" : "generateContent"}`;
  }

  buildHeaders(credentials: any, stream = true) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    }
    // Express-mode keys are carried in the ?key= query parameter (see buildUrl), not a header.
    if (stream) {
      headers["Accept"] = "text/event-stream";
    }
    return headers;
  }
}
