/**
 * @file raycast.ts
 * @description Raycast Pro AI reverse-engineered protocol (backend.raycast.com).
 * Ported from szcharlesji/raycast-relay (Node, 2026-06) — V2 HMAC + V1 JWT signatures.
 *
 * @changes
 * - [2026-07-27] [Composer] - Initial Raycast Pro local-dev provider protocol
 */

import { createHmac, createHash, randomUUID } from "node:crypto";

export const RAYCAST_CHAT_URL = "https://backend.raycast.com/api/v1/ai/chat_completions";
export const RAYCAST_MODELS_URL = "https://backend.raycast.com/api/v1/ai/models";
export const RAYCAST_DEFAULT_USER_AGENT =
  "Raycast/1.104.20 (macOS Version 26.5.1 (Build 25F80))";
export const RAYCAST_DEFAULT_EXPERIMENTAL = "chatBranching, mcpHTTPServer";

/** Community-extracted default; override via providerSpecificData.sigSecret or RAYCAST_SIG_SECRET. */
export const RAYCAST_DEFAULT_SIG_SECRET =
  "6bc455473576ce2cd6f70426caff867aabbe3f7291c1a79681af5e8ce0ca1408";

export type RaycastCredentials = {
  accessToken?: string;
  providerSpecificData?: {
    deviceId?: string;
    aid?: string;
    sigSecret?: string;
    userAgent?: string;
    experimental?: string;
  };
};

export type RaycastModelEntry = {
  id: string;
  model: string;
  name: string;
  provider: string;
  requires_better_ai?: boolean;
  availability?: string;
};

type ChatMessage = { role?: string; content?: unknown };

export function rot13rot5(input: string): string {
  return input.replace(/[A-Za-z0-9]/g, (char) => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + 13) % 26) + 65);
    if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + 13) % 26) + 97);
    return String.fromCharCode(((code - 48 + 5) % 10) + 48);
  });
}

export function signatureV2(
  timestamp: string,
  deviceId: string,
  payload: string,
  secret: string
): string {
  const bodyHash = createHash("sha256").update(payload).digest("hex");
  const message = [timestamp, deviceId, bodyHash].map(rot13rot5).join(".");
  return createHmac("sha256", secret).update(message).digest("hex");
}

function base64UrlJson(value: Record<string, unknown>): string {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

export function raycastJwt(aid: string, secret: string): string {
  const iat = Date.now() / 1000;
  const header = base64UrlJson({ typ: "JWT", alg: "HS256" });
  const payload = base64UrlJson({ aid, exp: iat + 60, iat });
  const signature = createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64url");
  return `${header}.${payload}.${signature}`;
}

export function decodeAidFromRaycastJwt(jwt: string): string | null {
  const parts = jwt.trim().split(".");
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as {
      aid?: string;
    };
    return payload.aid || null;
  } catch {
    return null;
  }
}

export function resolveRaycastSecrets(credentials: RaycastCredentials): {
  bearerToken: string;
  deviceId: string;
  aid: string;
  sigSecret: string;
} {
  const psd = credentials.providerSpecificData || {};
  const bearerToken = (credentials.accessToken || "").trim();
  const deviceId = (psd.deviceId || "").trim();
  const aid = (psd.aid || deviceId || "").trim();
  const sigSecret = (
    psd.sigSecret ||
    process.env.RAYCAST_SIG_SECRET ||
    RAYCAST_DEFAULT_SIG_SECRET
  ).trim();

  if (!bearerToken) throw new Error("Raycast bearer token is required");
  if (!deviceId) throw new Error("Raycast device ID is required");
  if (!sigSecret) throw new Error("Raycast signature secret is required");

  return { bearerToken, deviceId, aid, sigSecret };
}

export function buildRaycastHeaders(payload: string, credentials: RaycastCredentials): Record<string, string> {
  const { bearerToken, deviceId, aid, sigSecret } = resolveRaycastSecrets(credentials);
  const psd = credentials.providerSpecificData || {};
  const timestamp = Math.floor(Date.now() / 1000).toString();

  return {
    Accept: "application/json",
    Authorization: `Bearer ${bearerToken}`,
    "X-Raycast-Timestamp": timestamp,
    "Accept-Language": "en-US,en;q=0.9",
    "X-Raycast-DeviceId": deviceId,
    "Content-Type": "application/json",
    "X-Raycast-Signature-v2": signatureV2(timestamp, deviceId, payload, sigSecret),
    "X-Raycast-Experimental": psd.experimental || RAYCAST_DEFAULT_EXPERIMENTAL,
    "X-Raycast-Signature": raycastJwt(aid, sigSecret),
    "User-Agent": psd.userAgent || RAYCAST_DEFAULT_USER_AGENT,
  };
}

export function contentToText(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return JSON.stringify(content ?? "");

  return content
    .map((part) => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object" && "type" in part && (part as { type?: string }).type === "text") {
        return String((part as { text?: string }).text || "");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

export function convertOpenAiMessages(messages: ChatMessage[]): {
  raycastMessages: Array<{ author: string; content: { text: string } }>;
  systemInstruction: string;
} {
  let systemInstruction = "markdown";
  const raycastMessages: Array<{ author: string; content: { text: string } }> = [];

  for (const [index, message] of messages.entries()) {
    if (message.role === "system" && index === 0) {
      systemInstruction = contentToText(message.content);
      continue;
    }

    if (message.role === "user" || message.role === "assistant") {
      raycastMessages.push({
        author: message.role,
        content: { text: contentToText(message.content) },
      });
    }
  }

  return { raycastMessages, systemInstruction };
}

export function inferProviderInfo(modelId: string): { provider: string; model: string } {
  if (modelId.startsWith("openai_o1-")) {
    return { provider: "openai", model: modelId.slice("openai_o1-".length) };
  }

  const providers = [
    "anthropic",
    "baseten",
    "google",
    "groq",
    "mistral",
    "openai",
    "perplexity",
    "raycast",
    "together",
    "xai",
  ];

  for (const provider of providers) {
    const prefix = `${provider}-`;
    if (modelId.startsWith(prefix)) {
      return { provider, model: modelId.slice(prefix.length) };
    }
  }

  if (modelId.includes("/")) return { provider: "baseten", model: modelId };
  return { provider: "openai", model: modelId || "gpt-5-mini" };
}

export function buildRaycastChatBody(
  modelId: string,
  messages: ChatMessage[],
  temperature?: number
): string {
  const { provider, model } = inferProviderInfo(modelId);
  const { raycastMessages, systemInstruction } = convertOpenAiMessages(messages);

  if (raycastMessages.length === 0) {
    throw new Error("Raycast requires at least one user or assistant message");
  }

  return JSON.stringify({
    model,
    provider,
    messages: raycastMessages,
    system_instruction: systemInstruction,
    temperature: temperature ?? 0.5,
    additional_system_instructions: "",
    debug: false,
    locale: "en-US",
    source: "ai_chat",
    thread_id: randomUUID(),
    tools: [],
  });
}

export function parseRaycastSseText(responseText: string): string {
  let fullText = "";

  for (const line of responseText.split("\n")) {
    if (!line.startsWith("data:")) continue;
    try {
      const data = JSON.parse(line.slice(5).trim()) as { text?: string };
      if (data.text) fullText += data.text;
    } catch {
      // Ignore non-JSON SSE lines.
    }
  }

  return fullText;
}

export async function fetchRaycastModels(
  credentials: RaycastCredentials,
  options?: { includePremium?: boolean; includeDeprecated?: boolean }
): Promise<RaycastModelEntry[]> {
  const payload = "{}";
  const headers = buildRaycastHeaders(payload, credentials);
  const res = await fetch(RAYCAST_MODELS_URL, { method: "GET", headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Raycast models error [${res.status}]: ${text.slice(0, 300)}`);
  }

  const data = (await res.json()) as { models?: RaycastModelEntry[] };
  const includePremium = options?.includePremium ?? true;
  const includeDeprecated = options?.includeDeprecated ?? true;

  return (data.models || []).filter((model) => {
    if (!includePremium && model.requires_better_ai) return false;
    if (!includeDeprecated && model.availability === "deprecated") return false;
    return true;
  });
}
