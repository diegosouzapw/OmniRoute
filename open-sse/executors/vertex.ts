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

function parseSAFromApiKey(apiKey: string): ServiceAccount {
  try {
    return JSON.parse(apiKey);
  } catch {
    throw new Error("Vertex AI requires a valid Service Account JSON as the API key");
  }
}

async function getAccessToken(sa: ServiceAccount): Promise<string> {
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
    scope: "https://www.googleapis.com/auth/cloud-platform",
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
  "deepseek-deepseek-r1",
  "qwen3-next-80b",
  "llama-3.1",
  "mistral-",
  "glm-5",
  "meta/llama",
]);

function isPartnerModel(model: string) {
  return [...PARTNER_MODELS].some((prefix) => model.startsWith(prefix));
}

export class VertexExecutor extends BaseExecutor {
  constructor() {
    super("vertex", PROVIDERS.vertex);
  }

  async execute(input: ExecuteInput) {
    const { credentials, log } = input;
    if (credentials.apiKey && !credentials.accessToken) {
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
    if (stream) {
      headers["Accept"] = "text/event-stream";
    }
    return headers;
  }
}
