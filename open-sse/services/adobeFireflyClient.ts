/**
 * Adobe Firefly (unofficial) media client.
 *
 * Talks to the same Firefly 3P async APIs that firefly.adobe.com uses (live browser
 * captures in repo `adobe/`):
 *   POST https://firefly-3p.ff.adobe.io/v2/3p-images/generate-async
 *   POST https://firefly-3p.ff.adobe.io/v2/3p-videos/generate-async
 *   POST https://firefly-3p.ff.adobe.io/v2/models/discovery
 *   GET  https://firefly.adobe.io/v1/credits/balance
 * then polls BKS job result URLs rewritten from links.result.
 *
 * Auth is an Adobe IMS access token (Bearer, client_id = clio-playground-web).
 * Callers may pass either:
 *   - a raw IMS access_token JWT (from Authorization: Bearer on Firefly), or
 *   - a browser Cookie header from firefly.adobe.com (exchanged via IMS check/v6/token
 *     with client_id clio-playground-web; Express projectx_webapp as fallback).
 *
 * x-api-key on generate/discovery MUST match the token's IMS client
 * (`clio-playground-web`). Mismatch → HTTP 401 invalid token.
 *
 * Unofficial — tokens/cookies are short-lived; Adobe may change the wire contract.
 */

import { createHash, randomBytes, randomUUID } from "node:crypto";
import { resolvePublicCred } from "../utils/publicCreds.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

export const ADOBE_FIREFLY_IMAGE_SUBMIT_URL =
  "https://firefly-3p.ff.adobe.io/v2/3p-images/generate-async";
export const ADOBE_FIREFLY_VIDEO_SUBMIT_URL =
  "https://firefly-3p.ff.adobe.io/v2/3p-videos/generate-async";
export const ADOBE_FIREFLY_IMAGE_UPLOAD_URL = "https://firefly-3p.ff.adobe.io/v2/storage/image";
export const ADOBE_FIREFLY_MODELS_DISCOVERY_URL =
  "https://firefly-3p.ff.adobe.io/v2/models/discovery";
export const ADOBE_FIREFLY_CREDITS_BALANCE_URL = "https://firefly.adobe.io/v1/credits/balance";
export const ADOBE_FIREFLY_IMS_REFRESH_URL =
  "https://adobeid-na1.services.adobe.com/ims/check/v6/token?jslVersion=v2-v0.48.0-1-g1e322cb";
/** Scope set observed on live firefly.adobe.com IMS access tokens. */
export const ADOBE_FIREFLY_IMS_SCOPE =
  "AdobeID,firefly_api,openid,pps.read,pps.write,additional_info.projectedProductContext," +
  "additional_info.ownerOrg,uds_read,uds_write,ab.manage,read_organizations," +
  "additional_info.roles,account_cluster.read,creative_production,tk_platform," +
  "tk_platform_sync,profile";

const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";
const DEFAULT_SEC_CH_UA = '"Not;A=Brand";v="8", "Chromium";v="150", "Google Chrome";v="150"';
const DEFAULT_POLL_INTERVAL_MS = 3000;
const DEFAULT_IMAGE_TIMEOUT_MS = 180_000;
const DEFAULT_VIDEO_TIMEOUT_MS = 300_000;
const FIREFLY_ORIGIN = "https://firefly.adobe.com";
const FIREFLY_REFERER = "https://firefly.adobe.com/";

export type AdobeFireflyImageModelId =
  | "nano-banana-pro"
  | "nano-banana"
  | "nano-banana-2"
  | "gpt-image"
  | "gpt-image-2"
  | "gpt-image-1.5"
  | "flux-2"
  | "flux-pro"
  | "flux-ultra"
  | "seedream-4"
  | "seedream-5-lite"
  | "runway-gen4-image";

export type AdobeFireflyVideoModelId =
  "sora-2" | "sora-2-pro" | "veo-3.1" | "veo-3.1-fast" | "veo-3.1-ref" | "kling-3";

export interface AdobeFireflyImageModelSpec {
  upstreamModelId: string;
  upstreamModelVersion: string;
  /** Payload builder family — nano uses Gemini-style size maps; gpt-image uses OpenAI detail levels. */
  family: "nano" | "gpt-image" | "generic";
}

export interface AdobeFireflyVideoModelSpec {
  engine: "sora2" | "sora2-pro" | "veo31-standard" | "veo31-fast" | "kling3";
  upstreamModel: string;
  modelId?: string;
  modelVersion?: string;
  referenceMode?: "frame" | "image";
  defaultDuration: number;
  defaultResolution: string;
}

/**
 * Upstream modelId/modelVersion pairs from firefly-3p models/discovery
 * (captured 2026-07 — see adobe/get_models.txt). Friendly catalog ids map here.
 */
export const ADOBE_FIREFLY_IMAGE_MODELS: Record<
  AdobeFireflyImageModelId,
  AdobeFireflyImageModelSpec
> = {
  // Gemini 3.0 (Nano Banana Pro) — discovery: gemini-flash / nano-banana-2
  "nano-banana-pro": {
    upstreamModelId: "gemini-flash",
    upstreamModelVersion: "nano-banana-2",
    family: "nano",
  },
  // Gemini 2.5 (Nano Banana) — discovery: gemini-flash / nano-banana
  "nano-banana": {
    upstreamModelId: "gemini-flash",
    upstreamModelVersion: "nano-banana",
    family: "nano",
  },
  // Gemini 3.1 (Nano Banana 2) — discovery: gemini-flash / nano-banana-3
  "nano-banana-2": {
    upstreamModelId: "gemini-flash",
    upstreamModelVersion: "nano-banana-3",
    family: "nano",
  },
  // GPT Image 2 — discovery modelVersion "2" (get_models: modelDisplayName "GPT Image 2")
  "gpt-image": {
    upstreamModelId: "gpt-image",
    upstreamModelVersion: "2",
    family: "gpt-image",
  },
  // Explicit catalog alias so pickers show "gpt-image-2" distinctly
  "gpt-image-2": {
    upstreamModelId: "gpt-image",
    upstreamModelVersion: "2",
    family: "gpt-image",
  },
  "gpt-image-1.5": {
    upstreamModelId: "gpt-image",
    upstreamModelVersion: "1.5",
    family: "gpt-image",
  },
  "flux-2": {
    upstreamModelId: "flux",
    upstreamModelVersion: "2",
    family: "generic",
  },
  "flux-pro": {
    upstreamModelId: "flux",
    upstreamModelVersion: "fluxPro",
    family: "generic",
  },
  "flux-ultra": {
    upstreamModelId: "flux",
    upstreamModelVersion: "fluxUltra",
    family: "generic",
  },
  "seedream-4": {
    upstreamModelId: "seedream",
    upstreamModelVersion: "seedream_v4",
    family: "generic",
  },
  "seedream-5-lite": {
    upstreamModelId: "seedream",
    upstreamModelVersion: "seedream_v5_lite",
    family: "generic",
  },
  "runway-gen4-image": {
    upstreamModelId: "runway-gen4-image",
    upstreamModelVersion: "gen4_image",
    family: "generic",
  },
};

export const ADOBE_FIREFLY_VIDEO_MODELS: Record<
  AdobeFireflyVideoModelId,
  AdobeFireflyVideoModelSpec
> = {
  "sora-2": {
    engine: "sora2",
    upstreamModel: "openai:firefly:colligo:sora2",
    defaultDuration: 8,
    defaultResolution: "720p",
  },
  "sora-2-pro": {
    engine: "sora2-pro",
    upstreamModel: "openai:firefly:colligo:sora2-pro",
    defaultDuration: 8,
    defaultResolution: "720p",
  },
  "veo-3.1": {
    engine: "veo31-standard",
    upstreamModel: "google:firefly:colligo:veo31",
    modelId: "veo",
    modelVersion: "3.1-generate",
    defaultDuration: 6,
    defaultResolution: "720p",
  },
  "veo-3.1-fast": {
    engine: "veo31-fast",
    upstreamModel: "google:firefly:colligo:veo31-fast",
    modelId: "veo",
    modelVersion: "3.1-fast-generate",
    defaultDuration: 6,
    defaultResolution: "720p",
  },
  "veo-3.1-ref": {
    engine: "veo31-standard",
    upstreamModel: "google:firefly:colligo:veo31",
    modelId: "veo",
    modelVersion: "3.1-generate",
    referenceMode: "image",
    defaultDuration: 6,
    defaultResolution: "720p",
  },
  "kling-3": {
    engine: "kling3",
    upstreamModel: "kling:firefly:colligo:kling3",
    modelId: "kling",
    modelVersion: "kling_v3_standard_i2v",
    defaultDuration: 5,
    defaultResolution: "1080p",
  },
};

const NANO_SIZE_MAP: Record<string, Record<string, { width: number; height: number }>> = {
  "1K": {
    "1:1": { width: 1024, height: 1024 },
    "16:9": { width: 1360, height: 768 },
    "9:16": { width: 768, height: 1360 },
    "4:3": { width: 1152, height: 864 },
    "3:4": { width: 864, height: 1152 },
    "1:8": { width: 384, height: 3072 },
    "1:4": { width: 512, height: 2048 },
    "4:1": { width: 2048, height: 512 },
    "8:1": { width: 3072, height: 384 },
  },
  "2K": {
    "1:1": { width: 2048, height: 2048 },
    "16:9": { width: 2752, height: 1536 },
    "9:16": { width: 1536, height: 2752 },
    "4:3": { width: 2048, height: 1536 },
    "3:4": { width: 1536, height: 2048 },
    "1:8": { width: 768, height: 6144 },
    "1:4": { width: 1024, height: 4096 },
    "4:1": { width: 4096, height: 1024 },
    "8:1": { width: 6144, height: 768 },
  },
  "4K": {
    "1:1": { width: 4096, height: 4096 },
    "16:9": { width: 5504, height: 3072 },
    "9:16": { width: 3072, height: 5504 },
    "4:3": { width: 4096, height: 3072 },
    "3:4": { width: 3072, height: 4096 },
    "1:8": { width: 1536, height: 12288 },
    "1:4": { width: 2048, height: 8192 },
    "4:1": { width: 8192, height: 2048 },
    "8:1": { width: 12288, height: 1536 },
  },
};

const GPT_SIZE_MAP: Record<string, Record<string, { width: number; height: number }>> = {
  "1K": {
    "1:1": { width: 1024, height: 1024 },
    "5:4": { width: 1120, height: 896 },
    "9:16": { width: 720, height: 1280 },
    "21:9": { width: 1456, height: 624 },
    "16:9": { width: 1280, height: 720 },
    "4:3": { width: 1152, height: 864 },
    "3:2": { width: 1248, height: 832 },
    "4:5": { width: 896, height: 1120 },
    "3:4": { width: 864, height: 1152 },
    "2:3": { width: 832, height: 1248 },
  },
  "2K": {
    "1:1": { width: 2048, height: 2048 },
    "5:4": { width: 2240, height: 1792 },
    "9:16": { width: 1440, height: 2560 },
    "21:9": { width: 3024, height: 1296 },
    "16:9": { width: 2560, height: 1440 },
    "4:3": { width: 2304, height: 1728 },
    "3:2": { width: 2496, height: 1664 },
    "4:5": { width: 1792, height: 2240 },
    "3:4": { width: 1728, height: 2304 },
    "2:3": { width: 1664, height: 2496 },
  },
  "4K": {
    "1:1": { width: 2880, height: 2880 },
    "5:4": { width: 3200, height: 2560 },
    "9:16": { width: 2160, height: 3840 },
    "21:9": { width: 3696, height: 1584 },
    "16:9": { width: 3840, height: 2160 },
    "4:3": { width: 3264, height: 2448 },
    "3:2": { width: 3504, height: 2336 },
    "4:5": { width: 2560, height: 3200 },
    "3:4": { width: 2448, height: 3264 },
    "2:3": { width: 2336, height: 3504 },
  },
};

const PIXEL_SIZE_TO_RATIO: Record<string, string> = {
  "1024x1024": "1:1",
  "1536x1536": "1:1",
  "2048x2048": "1:1",
  "1024x1792": "9:16",
  "1536x2752": "9:16",
  "1792x1024": "16:9",
  "2752x1536": "16:9",
  "2048x1536": "4:3",
  "1536x2048": "3:4",
  "1280x720": "16:9",
  "720x1280": "9:16",
  "1920x1080": "16:9",
  "1080x1920": "9:16",
};

export class AdobeFireflyError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status = 502, code?: string) {
    super(message);
    this.name = "AdobeFireflyError";
    this.status = status;
    this.code = code;
  }
}

/** Public x-api-key + primary IMS client_id for firefly.adobe.com (`clio-playground-web`). */
export function adobeFireflyApiKey(): string {
  return resolvePublicCred("adobe_firefly_api_key", "ADOBE_FIREFLY_API_KEY");
}

/** Express IMS client_id fallback for cookie exchange (`projectx_webapp`). */
export function adobeFireflyExpressClientId(): string {
  return resolvePublicCred("adobe_firefly_express_client_id", "ADOBE_FIREFLY_EXPRESS_CLIENT_ID");
}

/** Public x-api-key for GET firefly.adobe.io/v1/credits/balance (`SunbreakWebUI1`). */
export function adobeFireflyBalanceApiKey(): string {
  return resolvePublicCred("adobe_firefly_balance_api_key", "ADOBE_FIREFLY_BALANCE_API_KEY");
}

/** Decode IMS JWT payload (no signature verification — client-side claim read only). */
export function decodeAdobeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    // Do not call extractAdobeCredentialToken here (would recurse via guest checks).
    let raw = String(token || "")
      .trim()
      .replace(/^bearer\s+/i, "")
      .trim();
    // If a blob was passed, take the first JWT-shaped segment.
    const m = raw.match(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/);
    if (m) raw = m[0];
    const part = raw.split(".")[1];
    if (!part) return null;
    const json = Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    const obj = JSON.parse(json);
    return obj && typeof obj === "object" ? (obj as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** AdobeID subject for x-account-id on balance / account_cluster calls. */
export function extractAdobeAccountIdFromToken(token: string): string {
  const payload = decodeAdobeJwtPayload(token);
  if (!payload) return "";
  const candidates = [payload.user_id, payload.aa_id, payload.sub, payload.id];
  for (const c of candidates) {
    if (typeof c === "string" && c.includes("@")) return c.trim();
  }
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  return "";
}

export function looksLikeAdobeJwt(value: string): boolean {
  const raw = value.trim();
  if (!raw) return false;
  // Avoid treating cookie blobs that happen to have two dots as JWT.
  if (raw.includes(";") || (raw.includes("=") && !raw.startsWith("eyJ"))) return false;
  // Allow a single space after optional Bearer prefix (stripped earlier).
  if (/\s/.test(raw) && !/^bearer\s+/i.test(raw)) return false;
  const token = raw.replace(/^bearer\s+/i, "").trim();
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  // Adobe IMS access tokens are sizable; reject tiny accidental 3-segment strings.
  if (token.length < 80) return false;
  return parts.every((p) => p.length > 0 && /^[A-Za-z0-9_-]+$/.test(p));
}

/**
 * True when IMS issued a guest token (no signed-in AdobeID).
 * Live repro: firefly.adobe.com page cookies alone → account_type=guest → generate 401 /
 * balance 403 ErrMismatchOauthToken.
 */
export function isAdobeGuestAccessToken(token: string): boolean {
  const payload = decodeAdobeJwtPayload(token);
  if (!payload) return false;
  const userId = typeof payload.user_id === "string" ? payload.user_id : "";
  const aaId = typeof payload.aa_id === "string" ? payload.aa_id : "";
  const type = typeof payload.type === "string" ? payload.type.toLowerCase() : "";
  // Authenticated Firefly tokens always carry an @AdobeID (or similar) subject.
  if (userId.includes("@AdobeID") || aaId.includes("@AdobeID")) return false;
  if (userId.includes("@GuestID") || aaId.includes("@GuestID")) return true;
  if (type === "guest" || type.includes("guest")) return true;
  // Guest tokens from ims/check often omit type/user_id entirely.
  if (!userId && !aaId) return true;
  return false;
}

export function isAdobeUserAccessToken(token: string): boolean {
  return looksLikeAdobeJwt(token) && !isAdobeGuestAccessToken(token);
}

/**
 * Pull an IMS JWT out of free-form paste: raw JWT, Bearer …, access_token=…,
 * IMS sessionStorage JSON (`tokenValue`), multi-line Network/HAR dumps.
 * Prefer the longest user (non-guest) eyJ… JWT found.
 */
export function extractAdobeCredentialToken(raw: string): string {
  const value = String(raw || "").trim();
  if (!value) return "";

  if (/^bearer\s+/i.test(value)) {
    const bare =
      value
        .replace(/^bearer\s+/i, "")
        .trim()
        .split(/\s+/)[0] || "";
    if (looksLikeAdobeJwt(bare)) return bare;
  }

  // access_token=... in cookie-ish or form paste
  const accessMatch = value.match(/(?:^|[;\s&])access_token=([^;\s&]+)/i);
  if (accessMatch?.[1]) {
    const t = decodeURIComponent(accessMatch[1].trim());
    if (looksLikeAdobeJwt(t)) return t;
  }

  // IMS sessionStorage / localStorage JSON: "tokenValue":"eyJ..."
  const tokenValueMatch = value.match(/"tokenValue"\s*:\s*"(eyJ[^"]+)"/i);
  if (tokenValueMatch?.[1] && looksLikeAdobeJwt(tokenValueMatch[1])) {
    return tokenValueMatch[1];
  }

  // Authorization: Bearer eyJ...
  const authMatch = value.match(
    /Authorization\s*:\s*Bearer\s+([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)/i
  );
  if (authMatch?.[1] && looksLikeAdobeJwt(authMatch[1])) return authMatch[1];

  // Any eyJ… JWT in the blob (HAR / multi-line). Prefer user AdobeID tokens.
  const jwtMatches = value.match(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g);
  if (jwtMatches && jwtMatches.length > 0) {
    const sorted = [...jwtMatches].sort((a, b) => b.length - a.length);
    const user = sorted.find((t) => looksLikeAdobeJwt(t) && isAdobeUserAccessToken(t));
    if (user) return user;
    const best = sorted[0];
    if (looksLikeAdobeJwt(best)) return best;
  }

  // Pure JWT
  if (looksLikeAdobeJwt(value)) return value.replace(/^bearer\s+/i, "").trim();

  // Cookie / other blob unchanged for IMS exchange
  return value;
}

/**
 * True when the paste still looks like a Cookie header (not a bare JWT).
 * Used to attach Cookie + sherlockToken → x-arp-session-id on generate.
 */
export function looksLikeAdobeCookieBlob(value: string): boolean {
  const raw = String(value || "").trim();
  if (!raw || looksLikeAdobeJwt(raw)) return false;
  if (raw.includes(";") && raw.includes("=")) return true;
  if (/(?:^|[;\s])(?:aux_sid|ff_session|sherlockToken|forterToken|arkose)=/i.test(raw)) {
    return true;
  }
  return false;
}

/**
 * Strip JWTs / Authorization lines from a mixed paste so only Cookie pairs remain.
 * Undici Headers.append rejects multi-line Cookie values (throws Headers.append: "eyJ…").
 */
export function extractAdobeCookieHeader(raw: string): string {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (looksLikeAdobeJwt(value)) return "";

  // Drop pure JWT lines and Authorization: Bearer lines
  const cleaned = value
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .filter((line) => {
      if (!line) return false;
      if (/^authorization\s*:/i.test(line)) return false;
      if (/^bearer\s+/i.test(line)) return false;
      if (looksLikeAdobeJwt(line)) return false;
      // Drop standalone eyJ… segments
      if (/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(line)) return false;
      return true;
    })
    .join("; ");

  // Also strip inline eyJ JWT tokens that may sit inside a cookie string
  const noJwt = cleaned
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "")
    .replace(/;\s*;/g, ";")
    .replace(/^;\s*|\s*;$/g, "")
    .trim();

  if (!noJwt || !looksLikeAdobeCookieBlob(noJwt)) return "";
  // Final safety: Cookie header must be single-line
  return noJwt.replace(/[\r\n]+/g, "; ").trim();
}

const GUEST_COOKIE_HELP =
  "Firefly page cookies alone only mint a GUEST IMS token (no AdobeID) — generate returns 401 and Limits 403. " +
  "Fix: open firefly.adobe.com signed-in → F12 → Network → click a request to firefly-3p.ff.adobe.io " +
  "(generate-async or models/discovery) → Request Headers → Authorization → copy the token AFTER 'Bearer ' " +
  "(starts with eyJ…). Paste that JWT as the credential. " +
  "Cookie-only works only if you also export IMS session cookies from adobelogin.com / adobeid-na1 " +
  "(Cookie-Editor → export all Adobe domains); firefly.adobe.com cookies by themselves are not enough.";

export function normalizeAdobeAspectRatio(sizeOrRatio: unknown, fallback = "1:1"): string {
  if (typeof sizeOrRatio !== "string" || !sizeOrRatio.trim()) return fallback;
  let raw = sizeOrRatio.trim().replace(/_/g, ":");
  if (raw.toLowerCase() === "auto") return fallback;

  if (/^\d+:\d+$/.test(raw)) return raw;

  // Short ratio forms like 16x9 / 9x16
  const short = raw.match(/^(\d+)x(\d+)$/i);
  if (short) {
    const a = Number(short[1]);
    const b = Number(short[2]);
    if (a > 0 && b > 0 && a < 100 && b < 100) return `${a}:${b}`;
  }

  const lower = raw.toLowerCase();
  if (PIXEL_SIZE_TO_RATIO[lower]) return PIXEL_SIZE_TO_RATIO[lower];

  // Generic WxH pixel sizes → closest common ratio
  const pixel = lower.match(/^(\d+)x(\d+)$/);
  if (pixel) {
    const w = Number(pixel[1]);
    const h = Number(pixel[2]);
    if (w > 0 && h > 0) {
      if (Math.abs(w - h) / Math.max(w, h) < 0.08) return "1:1";
      if (w > h * 1.5) return "16:9";
      if (h > w * 1.5) return "9:16";
      if (w > h) return "4:3";
      return "3:4";
    }
  }

  return fallback;
}

export function normalizeAdobeOutputResolution(
  quality: unknown,
  size: unknown
): "1K" | "2K" | "4K" {
  const q = String(quality ?? "")
    .trim()
    .toLowerCase();
  if (q === "4k" || q === "ultra" || q === "high") return "4K";
  if (q === "2k" || q === "hd" || q === "standard" || q === "medium") return "2K";
  if (q === "1k" || q === "low") return "1K";

  const s = String(size ?? "").toLowerCase();
  if (s.includes("4k") || /4096|5504|3840/.test(s)) return "4K";
  if (s.includes("1k") || /1024x1024|768x1360|1360x768/.test(s)) return "1K";
  return "2K";
}

export function resolveAdobeImageModel(model: string): {
  id: AdobeFireflyImageModelId;
  spec: AdobeFireflyImageModelSpec;
} {
  const raw = String(model || "")
    .trim()
    .toLowerCase()
    .replace(/^adobe-firefly\//, "")
    .replace(/^firefly\//, "");

  // Accept long catalog ids like firefly-nano-banana-pro-2k-16x9
  if (
    raw.includes("nano-banana2") ||
    raw.includes("nano-banana-2") ||
    raw.includes("nano-banana-3")
  ) {
    return {
      id: "nano-banana-2",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-2"],
    };
  }
  if (raw.includes("nano-banana-pro")) {
    return {
      id: "nano-banana-pro",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-pro"],
    };
  }
  if (raw.includes("nano-banana")) {
    return {
      id: "nano-banana",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana"],
    };
  }
  if (raw.includes("gpt-image-1.5") || raw.includes("gpt-image1.5")) {
    return {
      id: "gpt-image-1.5",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["gpt-image-1.5"],
    };
  }
  // Prefer explicit "2" / "gpt-image-2" before generic gpt-image
  if (
    raw === "gpt-image-2" ||
    raw.includes("gpt-image-2") ||
    raw.includes("gptimage2") ||
    raw === "gpt-image" ||
    raw.includes("gpt-image")
  ) {
    // Bare gpt-image and gpt-image-2 both map to upstream version "2" (GPT Image 2).
    if (raw.includes("1.5")) {
      return {
        id: "gpt-image-1.5",
        spec: ADOBE_FIREFLY_IMAGE_MODELS["gpt-image-1.5"],
      };
    }
    const id =
      raw.includes("gpt-image-2") || raw.includes("gptimage2") ? "gpt-image-2" : "gpt-image";
    return {
      id: id as AdobeFireflyImageModelId,
      spec: ADOBE_FIREFLY_IMAGE_MODELS["gpt-image"],
    };
  }
  if (raw.includes("flux-ultra") || raw.includes("fluxultra")) {
    return { id: "flux-ultra", spec: ADOBE_FIREFLY_IMAGE_MODELS["flux-ultra"] };
  }
  if (raw.includes("flux-pro") || raw.includes("fluxpro")) {
    return { id: "flux-pro", spec: ADOBE_FIREFLY_IMAGE_MODELS["flux-pro"] };
  }
  if (raw.includes("flux")) {
    return { id: "flux-2", spec: ADOBE_FIREFLY_IMAGE_MODELS["flux-2"] };
  }
  if (raw.includes("seedream-5") || raw.includes("seedream_v5")) {
    return {
      id: "seedream-5-lite",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["seedream-5-lite"],
    };
  }
  if (raw.includes("seedream")) {
    return { id: "seedream-4", spec: ADOBE_FIREFLY_IMAGE_MODELS["seedream-4"] };
  }
  if (raw.includes("runway") && raw.includes("image")) {
    return {
      id: "runway-gen4-image",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["runway-gen4-image"],
    };
  }

  if (raw in ADOBE_FIREFLY_IMAGE_MODELS) {
    const id = raw as AdobeFireflyImageModelId;
    return { id, spec: ADOBE_FIREFLY_IMAGE_MODELS[id] };
  }

  // Default to Nano Banana Pro (most common Firefly image path).
  return {
    id: "nano-banana-pro",
    spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-pro"],
  };
}

export function resolveAdobeVideoModel(model: string): {
  id: AdobeFireflyVideoModelId;
  spec: AdobeFireflyVideoModelSpec;
} {
  const raw = String(model || "")
    .trim()
    .toLowerCase()
    .replace(/^adobe-firefly\//, "")
    .replace(/^firefly\//, "");

  if (raw.includes("sora2-pro") || raw.includes("sora-2-pro") || raw.includes("sora2_pro")) {
    return { id: "sora-2-pro", spec: ADOBE_FIREFLY_VIDEO_MODELS["sora-2-pro"] };
  }
  if (raw.includes("sora2") || raw.includes("sora-2") || raw.includes("sora")) {
    return { id: "sora-2", spec: ADOBE_FIREFLY_VIDEO_MODELS["sora-2"] };
  }
  if (raw.includes("veo31-ref") || raw.includes("veo-3.1-ref") || raw.includes("veo31_ref")) {
    return {
      id: "veo-3.1-ref",
      spec: ADOBE_FIREFLY_VIDEO_MODELS["veo-3.1-ref"],
    };
  }
  if (raw.includes("veo31-fast") || raw.includes("veo-3.1-fast") || raw.includes("veo31_fast")) {
    return {
      id: "veo-3.1-fast",
      spec: ADOBE_FIREFLY_VIDEO_MODELS["veo-3.1-fast"],
    };
  }
  if (raw.includes("veo31") || raw.includes("veo-3.1") || raw.includes("veo")) {
    return { id: "veo-3.1", spec: ADOBE_FIREFLY_VIDEO_MODELS["veo-3.1"] };
  }
  if (raw.includes("kling")) {
    return { id: "kling-3", spec: ADOBE_FIREFLY_VIDEO_MODELS["kling-3"] };
  }

  if (raw in ADOBE_FIREFLY_VIDEO_MODELS) {
    const id = raw as AdobeFireflyVideoModelId;
    return { id, spec: ADOBE_FIREFLY_VIDEO_MODELS[id] };
  }

  return { id: "sora-2", spec: ADOBE_FIREFLY_VIDEO_MODELS["sora-2"] };
}

/**
 * Map OpenAI/VibeProxy quality tiers onto Firefly gpt-image `generationSettings.detailLevel`.
 * Wire range is integer 1–5 (discovery schema). Default is **maximal (5)** —
 * the SPA often defaults to 3, but detail is critical for GPT Image 2 output quality.
 * Explicit low/medium still honor the caller's choice.
 */
function gptDetailLevel(quality: unknown): number {
  // Live firefly.adobe.com default for gpt-image is detailLevel 3 (medium).
  const q = String(quality ?? "medium")
    .trim()
    .toLowerCase();
  if (q === "high" || q === "4k" || q === "ultra") return 5;
  if (q === "low" || q === "1k") return 1;
  if (q === "medium" || q === "2k" || q === "standard" || q === "hd" || q === "auto") return 3;
  return 3;
}

export function buildAdobeImagePayload(opts: {
  prompt: string;
  aspectRatio: string;
  outputResolution: "1K" | "2K" | "4K";
  modelSpec: AdobeFireflyImageModelSpec;
  quality?: unknown;
  seed?: number;
  sourceImageIds?: string[];
  negativePrompt?: string;
}): Record<string, unknown> {
  const ratio = opts.aspectRatio === "auto" ? "1:1" : opts.aspectRatio || "1:1";
  const seeds = [typeof opts.seed === "number" ? opts.seed : Math.floor(Date.now() % 999999)];
  const negative = String(opts.negativePrompt || "").trim();
  const genSettings: Record<string, unknown> = {};
  if (negative) {
    genSettings.avoidKeywords = negative
      .replace(/;/g, ",")
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);
  }

  if (opts.modelSpec.family === "gpt-image") {
    // Live firefly.adobe.com body (adobe/image_generate.txt) — no top-level size /
    // outputResolution; modelSpecificPayload.size is "auto".
    const payload: Record<string, unknown> = {
      n: 1,
      seeds,
      output: { storeInputs: true },
      prompt: opts.prompt,
      referenceBlobs: [] as Array<Record<string, unknown>>,
      modelSpecificPayload: { size: "auto" },
      modelId: opts.modelSpec.upstreamModelId,
      modelVersion: opts.modelSpec.upstreamModelVersion,
      generationMetadata: {
        module: "text2image",
        submodule: "ff-image-generate",
      },
      generationSettings: {
        detailLevel: gptDetailLevel(opts.quality),
        ...genSettings,
      },
    };
    if (opts.sourceImageIds?.length) {
      // gpt-image subject references (mask path uses separate mask blob when present).
      payload.generationMetadata = { module: "image2image", submodule: "ff-image-generate" };
      payload.referenceBlobs = opts.sourceImageIds.map((id) => ({
        id: String(id),
        usage: "subject",
      }));
      payload.modelSpecificPayload = {};
    }
    return payload;
  }

  // nano (Gemini Flash) + generic (Flux / Seedream / Runway image): same 3P image shape.
  // Live capture (web_providers/adobe_atach_images.txt): referenceBlobs with usage "general"
  // keep module "text2image" (not image2image) for nano multi-ref composition.
  const sizeMap = NANO_SIZE_MAP[opts.outputResolution] || NANO_SIZE_MAP["2K"];
  const pixel = sizeMap[ratio] || sizeMap["1:1"];
  const payload: Record<string, unknown> = {
    modelId: opts.modelSpec.upstreamModelId,
    modelVersion: opts.modelSpec.upstreamModelVersion,
    n: 1,
    prompt: opts.prompt,
    size: pixel,
    seeds,
    groundSearch: false,
    skipCai: false,
    output: { storeInputs: true },
    generationMetadata: {
      module: "text2image",
      submodule: "ff-image-generate",
    },
    modelSpecificPayload: {
      parameters: { addWatermark: false },
      aspectRatio: ratio,
    },
    referenceBlobs: [] as Array<Record<string, unknown>>,
  };
  if (Object.keys(genSettings).length) payload.generationSettings = genSettings;

  if (opts.sourceImageIds?.length) {
    payload.referenceBlobs = opts.sourceImageIds.map((id) => ({
      id: String(id),
      usage: "general",
    }));
    // Flux / Seedream / Runway image historically used image2image; nano keeps text2image.
    if (opts.modelSpec.family === "generic") {
      payload.generationMetadata = {
        module: "image2image",
        submodule: "ff-image-generate",
      };
    }
  }
  return payload;
}

function videoSize(aspectRatio: string, resolution: string): { width: number; height: number } {
  const res = String(resolution || "720p").toLowerCase();
  const short = res.includes("1080") ? 1080 : res.includes("480") ? 480 : 720;
  const ratio = aspectRatio === "9:16" ? "9:16" : aspectRatio === "1:1" ? "1:1" : "16:9";
  if (ratio === "1:1") return { width: short, height: short };
  if (ratio === "9:16") return { width: Math.round((short * 9) / 16), height: short };
  return { width: Math.round((short * 16) / 9), height: short };
}

export function buildAdobeVideoPayload(opts: {
  prompt: string;
  aspectRatio: string;
  duration: number;
  modelSpec: AdobeFireflyVideoModelSpec;
  resolution?: string;
  seed?: number;
  sourceImageIds?: string[];
  negativePrompt?: string;
  generateAudio?: boolean;
}): Record<string, unknown> {
  const seedVal = typeof opts.seed === "number" ? opts.seed : Math.floor(Date.now() % 999999);
  const aspect = opts.aspectRatio === "auto" ? "16:9" : opts.aspectRatio || "16:9";
  const duration = Math.max(
    1,
    Math.min(30, Math.floor(opts.duration || opts.modelSpec.defaultDuration))
  );
  const resolution = opts.resolution || opts.modelSpec.defaultResolution;
  const vidSize = videoSize(aspect, resolution);
  const engine = opts.modelSpec.engine;
  const sourceImageIds = opts.sourceImageIds || [];
  const negative = String(opts.negativePrompt || "");

  if (engine === "veo31-standard" || engine === "veo31-fast") {
    const payload: Record<string, unknown> = {
      n: 1,
      seeds: [seedVal],
      modelId: "veo",
      modelVersion:
        opts.modelSpec.modelVersion ||
        (engine === "veo31-fast" ? "3.1-fast-generate" : "3.1-generate"),
      output: { storeInputs: true },
      prompt: opts.prompt,
      size: vidSize,
      generateAudio: opts.generateAudio !== false,
      referenceBlobs: [] as Array<Record<string, unknown>>,
      generationMetadata: { module: "text2video" },
      modelSpecificPayload: {
        parameters: {
          durationSeconds: duration,
          aspectRatio: aspect,
          addWaterMark: false,
        },
      },
    };
    if (sourceImageIds.length) {
      const refs = payload.referenceBlobs as Array<Record<string, unknown>>;
      if (opts.modelSpec.referenceMode === "image") {
        for (const imageId of sourceImageIds.slice(0, 3)) {
          refs.push({ id: String(imageId), usage: "asset" });
        }
      } else {
        sourceImageIds.slice(0, 2).forEach((imageId, idx) => {
          refs.push({ id: String(imageId), usage: "general", order: idx + 1 });
        });
      }
      payload.generationMetadata = { module: "image2video" };
    }
    if (negative) payload.negativePrompt = negative;
    return payload;
  }

  if (engine === "kling3") {
    const payload: Record<string, unknown> = {
      n: 1,
      seeds: [seedVal],
      modelId: "kling",
      modelVersion: "kling_v3_standard_i2v",
      output: { storeInputs: true },
      prompt: opts.prompt,
      size: vidSize,
      generationMetadata: {
        module: sourceImageIds.length ? "image2video" : "text2video",
      },
      duration,
      generationSettings: { aspectRatio: aspect },
      referenceBlobs: [] as Array<Record<string, unknown>>,
    };
    if (sourceImageIds.length) {
      const refs = payload.referenceBlobs as Array<Record<string, unknown>>;
      sourceImageIds.slice(0, 2).forEach((imageId, idx) => {
        refs.push({ id: String(imageId), usage: "frame", order: idx + 1 });
      });
    }
    if (negative) payload.negativePrompt = negative;
    return payload;
  }

  // Sora 2 / Sora 2 Pro
  const promptJson = JSON.stringify({
    prompt: opts.prompt,
    duration,
    ...(negative ? { negative_prompt: negative } : {}),
  });
  const payload: Record<string, unknown> = {
    n: 1,
    seeds: [seedVal],
    modelId: "sora",
    modelVersion: engine === "sora2-pro" ? "sora-2-pro" : "sora-2",
    size: vidSize,
    duration,
    fps: 24,
    prompt: promptJson,
    generationMetadata: {
      module: sourceImageIds.length ? "image2video" : "text2video",
    },
    model: opts.modelSpec.upstreamModel,
    generateLoop: false,
    transparentBackground: false,
    seed: String(seedVal),
    locale: "en-US",
    camera: {
      angle: "none",
      shotSize: "none",
      motion: null,
      promptStyle: null,
    },
    negativePrompt: negative,
    jobMode: "standard",
    debugGenerationEndpoint: "",
    referenceBlobs: [] as Array<Record<string, unknown>>,
    referenceFrames: [] as Array<Record<string, unknown> | null>,
    referenceVideo: null,
    cameraMotionReferenceVideo: null,
    characterReference: null,
    editReferenceVideo: null,
    output: { storeInputs: true },
  };
  if (sourceImageIds.length) {
    const firstId = String(sourceImageIds[0]);
    payload.referenceBlobs = [{ id: firstId, usage: "general", promptReference: 1 }];
    const frames: Array<Record<string, unknown> | null> = [{ localBlobRef: firstId }, null];
    if (sourceImageIds.length > 1) {
      const lastId = String(sourceImageIds[1]);
      (payload.referenceBlobs as Array<Record<string, unknown>>).push({
        id: lastId,
        usage: "general",
        promptReference: 2,
      });
      frames[1] = { localBlobRef: lastId };
    }
    payload.referenceFrames = frames;
  }
  return payload;
}

function browserHeaders(): Record<string, string> {
  return {
    "user-agent": DEFAULT_USER_AGENT,
    origin: FIREFLY_ORIGIN,
    referer: FIREFLY_REFERER,
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": DEFAULT_SEC_CH_UA,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-site": "cross-site",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
  };
}

/** Random 64-char hex fallback when token/prompt are missing for deterministic nonce. */
export function generateAdobeNonce(): string {
  const bytes = new Uint8Array(32);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Deterministic x-nonce used by working open-source Firefly clients
 * (adobe2api / GPT2Image-Pro / image2api):
 *   sha256(`${user_id}-${prompt.slice(0, 256)}`)
 *
 * Random nonces (browser-looking) still get colligo 408 on many accounts when
 * the request is not from the SPA. Deterministic nonce is what unblocks generate.
 */
export function buildAdobeSubmitNonce(accessToken: string, prompt: string): string {
  const userId = extractAdobeAccountIdFromToken(accessToken);
  const promptPrefix = String(prompt || "").slice(0, 256);
  if (!userId || !promptPrefix) return "";
  return createHash("sha256").update(`${userId}-${promptPrefix}`, "utf8").digest("hex");
}

/**
 * Live firefly.adobe.com Arkose public key (web_providers/adobe_atach_images.txt, 2026-07).
 * Browser x-arp-session-id is base64(JSON({sid, ark, ftr})) — synthetic sessions without a
 * real Arkose blob often get colligo HTTP 408 "system under load". Prefer pasted sherlockToken.
 */
export const ADOBE_FIREFLY_ARKOSE_PUBLIC_KEY = "BBCC314C-4937-4CCD-B0A3-FDF0F0F7603C";
/** Live ftr magic (replaces older adobe2api `dUAL43-mnts-ants-d4_31ck__tt`). */
export const ADOBE_FIREFLY_FTR_MAGIC = "__UDF43-m4_31ck";

/**
 * True when a string looks like a Firefly ARP session (base64 JSON with sid).
 */
export function isValidAdobeArpSessionId(value: string): boolean {
  const t = String(value || "").trim();
  if (t.length < 4) return false;
  // Never treat Cookie name=value pairs (e.g. aux_sid=…, forter=…) as ARP.
  // Live ARP is base64(JSON) or a bare opaque token — not "key=value".
  if (/^[A-Za-z_][A-Za-z0-9_.%-]*=/.test(t) && !t.startsWith("eyJ")) return false;
  try {
    const padded = t + "=".repeat((4 - (t.length % 4)) % 4);
    const json = Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(
      "utf8"
    );
    // Reject binary garbage that "decodes" but isn't JSON (corrupted sherlock paste).
    if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(json)) return false;
    const obj = JSON.parse(json) as {
      sid?: unknown;
      ftr?: unknown;
      ark?: unknown;
    };
    return typeof obj.sid === "string" && obj.sid.length > 0;
  } catch {
    // Opaque short sherlockToken values (tests / non-JSON) when non-empty.
    // No mid-string "=" (cookie pair leftovers); padding "=" at end is OK.
    if (/=.+/.test(t.replace(/=+$/, ""))) return false;
    return !looksLikeAdobeJwt(t) && /^[A-Za-z0-9+/_=-]+$/.test(t);
  }
}

/**
 * Synthesize x-arp-session-id when no browser sherlockToken is available.
 * Shape matches live successful generate (adobe/image_generate.txt):
 *   base64(JSON({sid, ark, bfp, ftr, fpjs}))
 * ALWAYS send this header on generate-async / storage upload.
 * Prefer real sherlockToken / cookie rebuild (forter+arkose+sid) when available.
 */
export function buildAdobeArpSessionId(region = "eu-west-1"): string {
  const nowMs = Date.now();
  const sid = randomUUID();
  const randHex = randomBytes(16).toString("hex");
  // Live ftr: {32hex}_{ms}__UDF43-m4_31ck_{b64}=-N-v2_tt
  const mid = randomBytes(12).toString("base64url");
  const n = 1000 + Math.floor(Math.random() * 9000);
  const ftr = `${randHex}_${nowMs}${ADOBE_FIREFLY_FTR_MAGIC}_${mid}=-${n}-v2_tt`;
  // Arkose session-shaped string (public pk from firefly SPA). Without a real
  // Arkose solve this may still 408; real sherlockToken is the stable path.
  const arkSession = `${randomBytes(8).toString("hex")}.${Math.random().toFixed(10).slice(2)}`;
  const ark =
    `${arkSession}|r=${region}|meta=3|metabgclr=transparent|metaiconclr=%23757575|` +
    `guitextcolor=%23000000|pk=${ADOBE_FIREFLY_ARKOSE_PUBLIC_KEY}|at=40|sup=1|rid=13|ag=101|` +
    `cdn_url=https%3A%2F%2Farks-client.adobe.com%2Fcdn%2Ffc|` +
    `surl=https%3A%2F%2Farks-client.adobe.com|` +
    `smurl=https%3A%2F%2Farks-client.adobe.com%2Fcdn%2Ffc%2Fassets%2Fstyle-manager`;
  // Successful browser ARP also carries Browser Fingerprint + FingerprintJS payload.
  const bfp = randomUUID();
  const fpjs = JSON.stringify({
    requestId: `${nowMs}.${randomBytes(3).toString("base64url")}`,
    visitorId: randomBytes(12).toString("base64url"),
  });
  const raw = JSON.stringify({ sid, ark, bfp, ftr, fpjs });
  return Buffer.from(raw, "utf-8").toString("base64");
}

/**
 * Pull sherlockToken / x-arp-session-id from Cookie header, HAR paste, or multi-line credential.
 * Browser generate sends Cookie.sherlockToken (or the request header) as x-arp-session-id.
 * Live value is base64({sid, ark, ftr}) — includes Arkose session data.
 *
 * Also handles PasswordBox mangling (JWT + ARP joined by a single space) and full fetch()
 * copy/paste from DevTools (web_providers/adobe_atach_images.txt).
 */
export function extractAdobeArpSessionId(cookieOrBlob: string): string {
  const raw = String(cookieOrBlob || "");
  if (!raw.trim()) return "";

  const candidates: string[] = [];
  const push = (v: string | undefined | null) => {
    if (!v) return;
    let t = v
      .trim()
      .replace(/^["']|["']$/g, "")
      .trim();
    try {
      // Cookie values are often URI-encoded
      if (/%[0-9A-Fa-f]{2}/.test(t)) t = decodeURIComponent(t);
    } catch {
      /* keep raw */
    }
    if (t) candidates.push(t);
  };

  // Cookie: sherlockToken=...
  const m = raw.match(/(?:^|[;\s\n\r])sherlockToken=([^;\s\n\r]+)/i);
  if (m?.[1]) push(m[1]);

  // Cookie or form: x-arp-session-id=...
  const m2 = raw.match(/(?:^|[;\s\n\r])x-arp-session-id=([^;\s\n\r]+)/i);
  if (m2?.[1]) push(m2[1]);

  // HAR / Network / fetch() headers: "x-arp-session-id": "eyJ..." or x-arp-session-id: eyJ...
  const m3 = raw.match(/["']?x-arp-session-id["']?\s*[:=]\s*["']?([A-Za-z0-9+/=_-]{40,})["']?/i);
  if (m3?.[1]) push(m3[1]);

  // HAR: "sherlockToken": "eyJ..."
  const m4 = raw.match(/["']?sherlockToken["']?\s*[:=]\s*["']?([A-Za-z0-9+/=_-]{40,})["']?/i);
  if (m4?.[1]) push(m4[1]);

  // Bare base64 ARP blob on its own line (line 2 of two-line paste)
  for (const line of raw.split(/[\r\n]+/)) {
    const t = line.trim().replace(/^["']|["']$/g, "");
    // Skip pure JWT lines
    if (looksLikeAdobeJwt(t)) continue;
    if (t.length >= 40 && isValidAdobeArpSessionId(t)) push(t);
  }

  // JWT + ARP joined by whitespace (single-line PasswordBox paste collapses \n → space)
  // Split on whitespace only — NOT on "=" — so we never treat "aux_sid=…" as a token.
  const withoutJwt = raw.replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, " ");
  for (const token of withoutJwt.split(/[\s,;"']+/)) {
    let t = token.trim();
    // If this chunk is name=value from a Cookie header, only keep the value when
    // the name is sherlockToken / x-arp-session-id; skip aux_sid, forter, etc.
    const eq = t.indexOf("=");
    if (eq > 0 && eq < 40 && /^[A-Za-z0-9_.%-]+$/.test(t.slice(0, eq))) {
      const name = t.slice(0, eq).toLowerCase();
      if (name === "sherlocktoken" || name === "x-arp-session-id") {
        t = t.slice(eq + 1).trim();
      } else {
        continue;
      }
    }
    if (t.length >= 40 && isValidAdobeArpSessionId(t)) push(t);
  }

  // Prefer ARP that decodes to JSON with sid+ark (real browser session over opaque short tokens)
  const ranked = candidates
    .map((c) => c.replace(/^["']|["']$/g, "").trim())
    .filter((v) => isValidAdobeArpSessionId(v));
  ranked.sort((a, b) => scoreAdobeArpCandidate(b) - scoreAdobeArpCandidate(a));
  return ranked[0] || "";
}

/** Higher = more like a live firefly-3p x-arp-session-id (sid+ark+ftr[+bfp+fpjs] base64). */
function scoreAdobeArpCandidate(value: string): number {
  let score = value.length;
  try {
    const padded = value + "=".repeat((4 - (value.length % 4)) % 4);
    const json = Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(
      "utf8"
    );
    const obj = JSON.parse(json) as {
      sid?: unknown;
      ark?: unknown;
      ftr?: unknown;
      bfp?: unknown;
      fpjs?: unknown;
    };
    if (typeof obj.sid === "string" && obj.sid) score += 1000;
    if (typeof obj.ark === "string" && obj.ark.length > 20) score += 500;
    if (typeof obj.ftr === "string" && obj.ftr.includes(ADOBE_FIREFLY_FTR_MAGIC)) score += 200;
    if (typeof obj.ark === "string" && obj.ark.includes(ADOBE_FIREFLY_ARKOSE_PUBLIC_KEY))
      score += 100;
    // Live successful generates (adobe/image_generate.txt) include browser fingerprint fields.
    if (typeof obj.bfp === "string" && obj.bfp.length >= 8) score += 150;
    if (typeof obj.fpjs === "string" && obj.fpjs.length > 10) score += 150;
  } catch {
    /* opaque sherlockToken */
  }
  return score;
}

/**
 * True when the credential blob already contains a browser ARP / sherlockToken
 * OR enough cookie pieces to rebuild one (ff_session_guid + arkose + forterToken).
 * Synthetic-only ARP is a fallback — real cookie pieces are required for stable generate.
 */
export function hasBrowserAdobeArpSession(sessionCookieOrBlob?: string): boolean {
  const blob = String(sessionCookieOrBlob || "");
  if (extractAdobeArpSessionId(blob)) return true;
  // Rebuild path counts as browser ARP (same pieces the SPA uses for sherlockToken).
  const sid = blob.match(/(?:^|[;\s])ff_session_guid=([^;\s]+)/i)?.[1];
  const ark = blob.match(/(?:^|[;\s])arkose=([^;\s]+)/i)?.[1];
  const ftr =
    blob.match(/(?:^|[;\s])forterToken=([^;\s]+)/i)?.[1] ||
    blob.match(/(?:^|[;\s])forter=([^;\s]+)/i)?.[1];
  return Boolean(sid && ark && ftr && !/^[a-f0-9]{32},\d+$/i.test(ftr));
}

/**
 * Resolve ARP for a Firefly request.
 * Prefer cookie rebuild (ff_session_guid + arkose + forterToken [+bfp/fpjs]) over a
 * frozen sherlockToken paste — Forter advances while the pasted ARP goes stale.
 * Fall back to sherlockToken / x-arp-session-id extract, then synthetic rich ARP.
 * Mint once per generate/upload chain and reuse (browser uses the same ARP for upload+submit);
 * on 408 the submit loop rotates ARP separately.
 */
export function resolveAdobeArpSessionId(sessionCookieOrBlob?: string): string {
  const blob = String(sessionCookieOrBlob || "");
  // Lazy require of rebuild helper to avoid circular import at module load.
  // Inline minimal rebuild here (sid+ark+ftr) so resolve stays self-contained.
  const getCookie = (name: string): string => {
    const m = blob.match(new RegExp(`(?:^|[;\\s\\n\\r])${name}=([^;\\s\\n\\r]+)`, "i"));
    if (!m?.[1]) return "";
    let v = m[1].trim();
    try {
      if (/%[0-9A-Fa-f]{2}/.test(v)) v = decodeURIComponent(v);
    } catch {
      /* keep */
    }
    return v;
  };
  const sid = getCookie("ff_session_guid");
  const ark = getCookie("arkose");
  let ftr = getCookie("forterToken") || getCookie("forter");
  try {
    if (/%[0-9A-Fa-f]{2}/.test(ftr)) ftr = decodeURIComponent(ftr);
  } catch {
    /* keep */
  }
  if (ftr.endsWith("v2") && !ftr.endsWith("v2_tt")) ftr = `${ftr}_tt`;
  // Skip localStorage-style "id,timestamp" forter values
  if (/^[a-f0-9]{32},\d+$/i.test(ftr)) ftr = "";
  if (sid && ark && ftr) {
    const bfp = getCookie("bfp");
    let fpjs = getCookie("fpjs");
    try {
      if (fpjs && /%[0-9A-Fa-f]{2}/.test(fpjs)) fpjs = decodeURIComponent(fpjs);
    } catch {
      /* keep */
    }
    const obj: Record<string, string> = { sid, ark, ftr };
    if (bfp) obj.bfp = bfp;
    if (fpjs) obj.fpjs = fpjs;
    return Buffer.from(JSON.stringify(obj), "utf-8").toString("base64");
  }
  const extracted = extractAdobeArpSessionId(blob);
  if (extracted) return extracted;
  return buildAdobeArpSessionId();
}

export function buildAdobeSubmitHeaders(
  accessToken: string,
  extras?: {
    arpSessionId?: string;
    nonce?: string;
    cookie?: string;
    /** Required for deterministic x-nonce (sha256 user_id+prompt). */
    prompt?: string;
  }
): Record<string, string> {
  // Live capture (web_providers/adobe_atach_images.txt) + working clients:
  // Authorization + x-api-key + x-nonce + ALWAYS x-arp-session-id (sid+ark+ftr).
  // Do NOT attach firefly.adobe.com page Cookie to firefly-3p (wrong origin).
  // Prefer real sherlockToken from cookie blob; synthetic ARP is fallback only.
  const cookieBlob = String(extras?.cookie || "").trim();
  const deterministic =
    extras?.nonce ||
    (extras?.prompt ? buildAdobeSubmitNonce(accessToken, extras.prompt) : "") ||
    generateAdobeNonce();
  // Explicit arpSessionId wins (caller may pass synthetic short test ids or real browser ARP).
  const explicitArp = extras?.arpSessionId ? String(extras.arpSessionId).trim() : "";
  const arp = explicitArp || extractAdobeArpSessionId(cookieBlob) || buildAdobeArpSessionId();
  const headers: Record<string, string> = {
    ...browserHeaders(),
    Authorization: `Bearer ${accessToken}`,
    // Must be clio-playground-web — same client_id that minted the IMS token.
    "x-api-key": adobeFireflyApiKey(),
    "content-type": "application/json",
    accept: "*/*",
    "cache-control": "no-cache",
    pragma: "no-cache",
    priority: "u=1, i",
    "x-nonce": deterministic,
    "x-arp-session-id": arp,
  };
  return headers;
}

/** Max reference image size for Firefly storage upload (20 MiB). */
export const ADOBE_FIREFLY_MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

/**
 * Headers for POST /v2/storage/image (raw image body).
 * Live capture (web_providers/adobe_atach_images.txt): Bearer + x-api-key + x-arp + x-nonce
 * + content-type image/png|jpeg (not application/json).
 */
export function buildAdobeUploadHeaders(
  accessToken: string,
  contentType: string,
  extras?: {
    arpSessionId?: string;
    nonce?: string;
    cookie?: string;
    prompt?: string;
  }
): Record<string, string> {
  const base = buildAdobeSubmitHeaders(accessToken, {
    arpSessionId: extras?.arpSessionId,
    nonce: extras?.nonce,
    cookie: extras?.cookie,
    prompt: extras?.prompt || "upload",
  });
  const ct =
    String(contentType || "image/png")
      .trim()
      .toLowerCase() || "image/png";
  return {
    ...base,
    "content-type": ct.startsWith("image/") ? ct : "image/png",
  };
}

/**
 * Collect reference image sources from an OpenAI-style / Media-page image|video body.
 * Supports: image_url, image, images[], image_urls[], input_image(s), reference_images,
 * provider_options.*, and prompt_image fields used by the WinUI Media page.
 */
export function extractAdobeSourceImageSources(body: unknown, max = 4): string[] {
  if (!body || typeof body !== "object") return [];
  const b = body as Record<string, unknown>;
  const po =
    b.provider_options &&
    typeof b.provider_options === "object" &&
    !Array.isArray(b.provider_options)
      ? (b.provider_options as Record<string, unknown>)
      : {};

  const out: string[] = [];
  const seen = new Set<string>();
  const push = (v: unknown) => {
    if (out.length >= max) return;
    if (typeof v === "string") {
      const t = v.trim();
      if (!t || seen.has(t)) return;
      // Skip empty / clearly non-image
      if (t === "null" || t === "undefined") return;
      seen.add(t);
      out.push(t);
      return;
    }
    if (Array.isArray(v)) {
      for (const item of v) {
        if (out.length >= max) break;
        push(item);
      }
      return;
    }
    if (v && typeof v === "object") {
      const o = v as Record<string, unknown>;
      if (typeof o.url === "string") push(o.url);
      else if (typeof o.image_url === "string") push(o.image_url);
      else if (o.image_url && typeof o.image_url === "object") {
        const inner = (o.image_url as Record<string, unknown>).url;
        if (typeof inner === "string") push(inner);
      } else if (typeof o.b64_json === "string") {
        push(`data:image/png;base64,${o.b64_json}`);
      } else if (typeof o.base64 === "string") {
        push(`data:image/png;base64,${o.base64}`);
      }
    }
  };

  // Order matches MediaViewModel / OpenAI edit aliases (primary single fields first).
  const keys = [
    "image_url",
    "imageUrl",
    "input_image",
    "source_image",
    "promptImage",
    "prompt_image",
    "image",
    "images",
    "image_urls",
    "imageUrls",
    "input_images",
    "reference_images",
    "referenceImages",
    "reference_image",
  ];
  for (const k of keys) {
    push(b[k]);
    push(po[k]);
  }

  // OpenAI chat-style content parts (rare on /v1/images but harmless).
  if (Array.isArray(b.messages)) {
    for (const msg of b.messages) {
      if (!msg || typeof msg !== "object") continue;
      const content = (msg as Record<string, unknown>).content;
      if (!Array.isArray(content)) continue;
      for (const part of content) {
        if (!part || typeof part !== "object") continue;
        const p = part as Record<string, unknown>;
        if (p.type === "image_url" || p.type === "image") {
          push(p.image_url ?? p.image ?? p.url);
        }
      }
    }
  }

  return out.slice(0, max);
}

export function parseAdobeImageSourceBytes(source: string): {
  buffer: Buffer;
  contentType: string;
} {
  const trimmed = String(source || "").trim();
  if (!trimmed) {
    throw new AdobeFireflyError("Empty image reference", 400, "bad_image");
  }

  const dataUri = /^data:([^;,]+)?(?:;charset=[^;,]+)?(;base64)?,([\s\S]+)$/i.exec(trimmed);
  if (dataUri) {
    const mime = (dataUri[1] || "image/png").trim().toLowerCase() || "image/png";
    const isB64 = Boolean(dataUri[2]);
    const payload = dataUri[3] || "";
    if (!isB64) {
      throw new AdobeFireflyError(
        "Image data URL must be base64-encoded (data:image/...;base64,...)",
        400,
        "bad_image"
      );
    }
    const buffer = Buffer.from(payload.replace(/\s/g, ""), "base64");
    if (!buffer.length) {
      throw new AdobeFireflyError("Image data URL decoded to empty bytes", 400, "bad_image");
    }
    if (buffer.length > ADOBE_FIREFLY_MAX_UPLOAD_BYTES) {
      throw new AdobeFireflyError(
        `Image reference too large (${buffer.length} bytes; max ${ADOBE_FIREFLY_MAX_UPLOAD_BYTES})`,
        400,
        "bad_image"
      );
    }
    return {
      buffer,
      contentType: mime.startsWith("image/") ? mime : "image/png",
    };
  }

  // Raw base64 without data: prefix
  if (
    !/^https?:\/\//i.test(trimmed) &&
    /^[A-Za-z0-9+/=\s]+$/.test(trimmed) &&
    trimmed.length > 64
  ) {
    const buffer = Buffer.from(trimmed.replace(/\s/g, ""), "base64");
    if (buffer.length > 0 && buffer.length <= ADOBE_FIREFLY_MAX_UPLOAD_BYTES) {
      return { buffer, contentType: "image/png" };
    }
  }

  throw new AdobeFireflyError(
    "Unsupported image reference (need data:image/...;base64,... or raw base64). " +
      "HTTP(S) URLs are resolved by the caller before upload.",
    400,
    "bad_image"
  );
}

/**
 * Parse Firefly storage upload response: {"images":[{"id":"uuid"}]}.
 */
export function parseAdobeStorageUploadResponse(body: unknown): string {
  if (!body || typeof body !== "object") return "";
  const images = (body as Record<string, unknown>).images;
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];
    if (first && typeof first === "object") {
      const id = (first as Record<string, unknown>).id;
      if (typeof id === "string" && id.trim()) return id.trim();
    }
  }
  const id = (body as Record<string, unknown>).id;
  if (typeof id === "string" && id.trim()) return id.trim();
  return "";
}

/**
 * Upload one image to Firefly storage → blob id for referenceBlobs.
 * Wire: POST https://firefly-3p.ff.adobe.io/v2/storage/image (raw bytes).
 */
export async function uploadAdobeFireflyImage(opts: {
  accessToken: string;
  bytes: Buffer | Uint8Array;
  contentType?: string;
  sessionCookie?: string;
  /** Reuse the same ARP as generate-async (browser does). */
  arpSessionId?: string;
  /** Used for deterministic x-nonce (optional). */
  prompt?: string;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  };
}): Promise<string> {
  const fetchImpl = opts.fetchImpl || fetch;
  const buffer = Buffer.isBuffer(opts.bytes) ? opts.bytes : Buffer.from(opts.bytes);
  if (!buffer.length) {
    throw new AdobeFireflyError("Cannot upload empty image", 400, "bad_image");
  }
  if (buffer.length > ADOBE_FIREFLY_MAX_UPLOAD_BYTES) {
    throw new AdobeFireflyError(
      `Image reference too large (${buffer.length} bytes; max ${ADOBE_FIREFLY_MAX_UPLOAD_BYTES})`,
      400,
      "bad_image"
    );
  }

  const sessionCookie = String(opts.sessionCookie || "").trim();
  const cookieHeader = extractAdobeCookieHeader(sessionCookie);
  // One ARP for the whole chain — do not mint a new synthetic id per upload.
  const arpSessionId =
    (opts.arpSessionId && String(opts.arpSessionId).trim()) ||
    resolveAdobeArpSessionId(cookieHeader || sessionCookie);
  const contentType =
    (opts.contentType && opts.contentType.trim()) ||
    (buffer[0] === 0xff && buffer[1] === 0xd8
      ? "image/jpeg"
      : buffer[0] === 0x89 && buffer[1] === 0x50
        ? "image/png"
        : "image/png");

  const resp = await fetchImpl(ADOBE_FIREFLY_IMAGE_UPLOAD_URL, {
    method: "POST",
    headers: buildAdobeUploadHeaders(opts.accessToken, contentType, {
      arpSessionId,
      cookie: cookieHeader || undefined,
      prompt: opts.prompt || "upload",
    }),
    body: Uint8Array.from(buffer),
  });

  const text = await resp.text().catch(() => "");
  if (resp.status === 401 || resp.status === 403) {
    throw new AdobeFireflyError(
      "Adobe Firefly image upload unauthorized — paste a fresh IMS JWT",
      401,
      "auth"
    );
  }
  if (!resp.ok) {
    throw new AdobeFireflyError(
      `Adobe Firefly image upload failed (${resp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`,
      resp.status >= 400 && resp.status < 500 ? resp.status : 502,
      "upload"
    );
  }

  let json: unknown = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new AdobeFireflyError("Adobe Firefly image upload returned non-JSON body", 502, "upload");
  }
  const id = parseAdobeStorageUploadResponse(json);
  if (!id) {
    throw new AdobeFireflyError(
      "Adobe Firefly image upload succeeded but no images[].id was returned",
      502,
      "upload"
    );
  }
  opts.log?.info?.("ADOBE-FIREFLY", `uploaded reference image id=${id} (${buffer.length} bytes)`);
  return id;
}

/**
 * Resolve Media/OpenAI body image fields → Firefly storage blob ids.
 * - data: URLs / raw base64 → upload
 * - http(s) URLs → fetch then upload
 * - already looks like a UUID blob id → use as-is (advanced)
 */
export async function resolveAdobeSourceImageIds(opts: {
  accessToken: string;
  body: unknown;
  max?: number;
  sessionCookie?: string;
  /** Shared ARP for upload+generate (required for stable Firefly 3P). */
  arpSessionId?: string;
  prompt?: string;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  };
}): Promise<string[]> {
  const max = Math.max(1, Math.min(8, opts.max ?? 4));
  const sources = extractAdobeSourceImageSources(opts.body, max);
  if (!sources.length) return [];

  const fetchImpl = opts.fetchImpl || fetch;
  const ids: string[] = [];
  // One ARP for all uploads in this request (browser reuses the same header).
  const arpSessionId =
    (opts.arpSessionId && String(opts.arpSessionId).trim()) ||
    resolveAdobeArpSessionId(opts.sessionCookie);

  for (const src of sources) {
    // Already a Firefly storage id (uuid)
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(src)) {
      ids.push(src);
      continue;
    }

    let buffer: Buffer;
    let contentType = "image/png";

    if (/^https?:\/\//i.test(src)) {
      const r = await fetchImpl(src, {
        method: "GET",
        headers: { accept: "image/*,*/*" },
      });
      if (!r.ok) {
        throw new AdobeFireflyError(
          `Failed to download reference image (${r.status}): ${src.slice(0, 120)}`,
          400,
          "bad_image"
        );
      }
      const ab = await r.arrayBuffer();
      buffer = Buffer.from(ab);
      const ct = r.headers.get("content-type") || "";
      if (ct.toLowerCase().startsWith("image/")) {
        contentType = ct.split(";")[0]!.trim();
      }
    } else {
      const parsed = parseAdobeImageSourceBytes(src);
      buffer = parsed.buffer;
      contentType = parsed.contentType;
    }

    const id = await uploadAdobeFireflyImage({
      accessToken: opts.accessToken,
      bytes: buffer,
      contentType,
      sessionCookie: opts.sessionCookie,
      arpSessionId,
      prompt: opts.prompt,
      fetchImpl,
      log: opts.log,
    });
    ids.push(id);
  }

  return ids;
}

/** Transient Adobe 3P overload / rate / edge errors worth retrying. */
export function isAdobeTransientSubmitError(status: number, bodyText: string): boolean {
  if (status === 408 || status === 429 || status === 502 || status === 503 || status === 504) {
    return true;
  }
  const t = (bodyText || "").toLowerCase();
  return (
    t.includes("timeout_error") ||
    t.includes("system under load") ||
    t.includes("try again") ||
    t.includes("temporarily") ||
    t.includes("overloaded")
  );
}

export function buildAdobePollHeaders(accessToken: string): Record<string, string> {
  // Live adobe/status_check.txt: Bearer + accept only (no x-api-key, no Cookie).
  return {
    Authorization: `Bearer ${accessToken}`,
    accept: "*/*",
    "cache-control": "no-cache",
    pragma: "no-cache",
    "user-agent": DEFAULT_USER_AGENT,
    referer: FIREFLY_REFERER,
  };
}

export function buildAdobeBalanceHeaders(accessToken: string): Record<string, string> {
  const accountId = extractAdobeAccountIdFromToken(accessToken);
  const headers: Record<string, string> = {
    ...browserHeaders(),
    Authorization: `Bearer ${accessToken}`,
    accept: "application/json",
    "content-type": "application/json",
    "x-api-key": adobeFireflyBalanceApiKey(),
  };
  if (accountId) headers["x-account-id"] = accountId;
  return headers;
}

export function buildAdobeDiscoveryHeaders(accessToken: string): Record<string, string> {
  return {
    ...browserHeaders(),
    Authorization: `Bearer ${accessToken}`,
    "x-api-key": adobeFireflyApiKey(),
    "content-type": "application/json",
    // Missing Accept → HTTP 406 "Unsupported Accept Type or not allowed".
    accept: "*/*",
  };
}

/** User-facing message when Adobe colligo returns 408 "system under load". */
export function formatAdobeSystemUnderLoadError(
  kind: "image" | "video",
  attempts: number,
  opts?: { hadBrowserArp?: boolean }
): string {
  const hadArp = opts?.hadBrowserArp === true;
  if (!hadArp) {
    return (
      `Adobe Firefly ${kind} generation failed (HTTP 408 "system under load", after ${attempts} attempt` +
      `${attempts === 1 ? "" : "s"}). Your credential is missing a browser x-arp-session-id / sherlockToken ` +
      `(JWT alone almost always 408s even when credits/Limits work). Re-open the Adobe Firefly account and paste ` +
      `TWO lines from a SUCCESSFUL firefly-3p.ff.adobe.io generate-async request (F12 → Network): ` +
      `(1) Authorization token AFTER "Bearer " (eyJ… JWT), (2) the raw x-arp-session-id header value ` +
      `OR Cookie containing sherlockToken. Use the multi-line credential box so both lines are kept.`
    );
  }
  return (
    `Adobe Firefly ${kind} generation failed (HTTP 408 "system under load", after ${attempts} attempt` +
    `${attempts === 1 ? "" : "s"}). JWT was accepted for balance/discovery but colligo rejected the risk session ` +
    `(Forter/Arkose stale or rate-limited). The app spaces submits, sticks to the last working x-arp-session-id, ` +
    `and on 408 auto-warms Forter/ARP via off-screen Chrome CDP (true headless is rejected by colligo — set ADOBE_FIREFLY_CHROME_HEADLESS=1 only for debug). ` +
    `Paste the full firefly.adobe.com Cookie once with the JWT so recovery can run. If it still fails after that, ` +
    `open firefly.adobe.com, generate one image in-browser, then paste a FRESH multi-line credential (JWT + Cookie) once.`
  );
}

export function extractAdobeResultLink(
  headers: Headers | Record<string, string | null | undefined>,
  body: unknown
): string {
  const get = (name: string): string => {
    if (typeof (headers as Headers).get === "function") {
      return String((headers as Headers).get(name) || "").trim();
    }
    const rec = headers as Record<string, string | null | undefined>;
    const key = Object.keys(rec).find((k) => k.toLowerCase() === name.toLowerCase());
    return String((key ? rec[key] : "") || "").trim();
  };

  const override = get("x-override-status-link");
  if (override) return override;

  const data = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const links =
    data.links && typeof data.links === "object" ? (data.links as Record<string, unknown>) : {};
  const result = links.result;
  if (typeof result === "string" && result) return result;
  if (result && typeof result === "object") {
    const href = (result as Record<string, unknown>).href;
    if (typeof href === "string" && href) return href;
  }
  if (typeof data.statusUrl === "string" && data.statusUrl) return data.statusUrl;
  if (typeof data.resultUrl === "string" && data.resultUrl) return data.resultUrl;
  return "";
}

/**
 * Rewrite Firefly EPO result links to the BKS poll endpoint used by the SPA.
 *
 * Live capture (adobe/status_check.txt):
 *   links.result = https://firefly-epo855232.adobe.io/jobs/result/{jobId}
 *   poll URL     = https://bks-epo8552.adobe.io/v2/jobs/result/{jobId}?host=firefly-epo855232.adobe.io
 *
 * BKS host uses the first 4 digits of the EPO id when the id is longer (855232 → 8552).
 */
export function normalizeAdobePollUrl(rawUrl: string): string {
  const url = String(rawUrl || "").trim();
  if (!url) return url;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (!host.startsWith("firefly-epo")) return url;

    const path = parsed.pathname || "";
    const isJobPath =
      path.includes("/jobs/result/") || path.includes("/v2/status") || path.includes("/status/");
    if (!isJobPath) return url;

    const jobId = path.split("/").filter(Boolean).pop() || "";
    if (!jobId || jobId === "status" || jobId === "result") return url;

    const epoId = host.slice("firefly-epo".length).split(".")[0] || "";
    // 855232 → 8552 (browser BKS host); short ids kept as-is.
    const bksId = epoId.length > 4 ? epoId.slice(0, 4) : epoId;
    return `https://bks-epo${bksId}.adobe.io/v2/jobs/result/${jobId}?host=${host}`;
  } catch {
    return url;
  }
}

export function extractAdobeMediaUrl(latest: unknown, kind: "image" | "video"): string | null {
  const body = latest && typeof latest === "object" ? (latest as Record<string, unknown>) : {};
  const outputs = Array.isArray(body.outputs) ? body.outputs : [];
  if (outputs.length > 0) {
    const first =
      outputs[0] && typeof outputs[0] === "object" ? (outputs[0] as Record<string, unknown>) : {};
    const media =
      kind === "image"
        ? first.image && typeof first.image === "object"
          ? (first.image as Record<string, unknown>)
          : null
        : first.video && typeof first.video === "object"
          ? (first.video as Record<string, unknown>)
          : null;
    const url = media && typeof media.presignedUrl === "string" ? media.presignedUrl : null;
    if (url) return url;
  }

  // Fallback recursive search for a presigned URL.
  const found = findPresignedUrl(
    latest,
    kind === "image" ? [".png", ".jpg", ".jpeg", ".webp"] : [".mp4", ".webm"]
  );
  return found;
}

function findPresignedUrl(obj: unknown, exts: string[]): string | null {
  if (!obj) return null;
  if (typeof obj === "string") {
    const s = obj.trim();
    if (
      /^https?:\/\//i.test(s) &&
      (exts.some((e) => s.toLowerCase().includes(e)) ||
        s.includes("presigned") ||
        s.includes("X-Amz"))
    ) {
      return s;
    }
    return null;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const found = findPresignedUrl(item, exts);
      if (found) return found;
    }
    return null;
  }
  if (typeof obj === "object") {
    const rec = obj as Record<string, unknown>;
    if (typeof rec.presignedUrl === "string" && rec.presignedUrl) return rec.presignedUrl;
    for (const value of Object.values(rec)) {
      const found = findPresignedUrl(value, exts);
      if (found) return found;
    }
  }
  return null;
}

export function isAdobeJobInProgress(status: string): boolean {
  const s = String(status || "").toUpperCase();
  return (
    !s ||
    s === "IN_PROGRESS" ||
    s === "PENDING" ||
    s === "RUNNING" ||
    s === "QUEUED" ||
    s === "PROCESSING" ||
    s === "SUBMITTED"
  );
}

export function isAdobeJobFailed(status: string): boolean {
  const s = String(status || "").toUpperCase();
  return s === "FAILED" || s === "CANCELLED" || s === "ERROR" || s === "CANCELED";
}

type ImsTokenResponse = {
  access_token?: string;
  account_type?: string;
  guestId?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

async function imsCheckToken(opts: {
  cookie: string;
  clientId: string;
  guestAllowed: boolean;
  fetchImpl: typeof fetch;
}): Promise<
  { ok: true; token: string; data: ImsTokenResponse } | { ok: false; status: number; error: string }
> {
  const form = new URLSearchParams({
    client_id: opts.clientId,
    scope: ADOBE_FIREFLY_IMS_SCOPE,
    guest_allowed: opts.guestAllowed ? "true" : "false",
  });

  const resp = await opts.fetchImpl(ADOBE_FIREFLY_IMS_REFRESH_URL, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Cookie: opts.cookie,
      Origin: FIREFLY_ORIGIN,
      Referer: FIREFLY_REFERER,
      "User-Agent": DEFAULT_USER_AGENT,
    },
    body: form.toString(),
  });

  const text = await resp.text().catch(() => "");
  let data: ImsTokenResponse | null = null;
  try {
    data = JSON.parse(text) as ImsTokenResponse;
  } catch {
    data = null;
  }

  if (!resp.ok) {
    return {
      ok: false,
      status: resp.status,
      error: sanitizeErrorMessage(
        data?.error_description || data?.error || text.slice(0, 200) || `HTTP ${resp.status}`
      ),
    };
  }

  const token = String(data?.access_token || "").trim();
  if (!token) {
    return {
      ok: false,
      status: 401,
      error: sanitizeErrorMessage(
        data?.error_description || data?.error || "IMS response missing access_token"
      ),
    };
  }
  return { ok: true, token, data: data || {} };
}

/**
 * Exchange a browser Cookie header for an Adobe IMS **user** access_token.
 *
 * Live repro (user firefly.adobe.com Cookie export):
 * - guest_allowed=true → account_type=guest (no AdobeID) → generate 401 / balance 403
 * - guest_allowed=false → "All session cookies are empty" (IMS cookies live on adobelogin.com)
 *
 * Reliable path: paste Authorization Bearer JWT from a live firefly-3p request.
 */
export async function exchangeAdobeCookieForAccessToken(
  cookieHeader: string,
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  const cookie = String(cookieHeader || "").trim();
  if (!cookie) {
    throw new AdobeFireflyError("Adobe Firefly cookie is empty", 401, "missing_cookie");
  }

  // HAR / mixed paste that already contains a user JWT
  const embedded = extractAdobeCredentialToken(cookie);
  if (embedded !== cookie && looksLikeAdobeJwt(embedded)) {
    if (isAdobeGuestAccessToken(embedded)) {
      throw new AdobeFireflyError(GUEST_COOKIE_HELP, 401, "guest_token");
    }
    return embedded;
  }

  const clientIds = [adobeFireflyApiKey(), adobeFireflyExpressClientId()].filter(
    (id, i, arr) => id && arr.indexOf(id) === i
  );

  let sawEmptySession = false;
  let lastError = "";
  let lastStatus = 502;
  let guestTokenSeen = false;

  for (const clientId of clientIds) {
    // 1) Authenticated session only (needs IMS cookies from adobelogin.com)
    const authed = await imsCheckToken({
      cookie,
      clientId,
      guestAllowed: false,
      fetchImpl,
    });
    if (authed.ok) {
      if (
        isAdobeGuestAccessToken(authed.token) ||
        authed.data.account_type === "guest" ||
        authed.data.guestId
      ) {
        guestTokenSeen = true;
      } else {
        return authed.token;
      }
    } else {
      lastStatus = authed.status;
      lastError = authed.error;
      if (/session cookies are empty/i.test(authed.error)) sawEmptySession = true;
    }

    // 2) Guest path — never accept guest tokens for Firefly media/limits
    const guest = await imsCheckToken({
      cookie,
      clientId,
      guestAllowed: true,
      fetchImpl,
    });
    if (guest.ok) {
      if (
        guest.data.account_type === "guest" ||
        guest.data.guestId ||
        isAdobeGuestAccessToken(guest.token)
      ) {
        guestTokenSeen = true;
        lastError = "IMS returned a guest token (no AdobeID session)";
        lastStatus = 401;
        continue;
      }
      return guest.token;
    }
    lastStatus = guest.status;
    lastError = guest.error;
    if (/session cookies are empty/i.test(guest.error)) sawEmptySession = true;
  }

  if (guestTokenSeen || sawEmptySession) {
    throw new AdobeFireflyError(GUEST_COOKIE_HELP, 401, "guest_token");
  }

  throw new AdobeFireflyError(
    `Adobe IMS token exchange failed (${lastStatus}): ${lastError || "no access_token"}. ${GUEST_COOKIE_HELP}`,
    lastStatus === 401 || lastStatus === 403 ? 401 : 502,
    "ims_refresh_failed"
  );
}

/**
 * Resolve credentials into a usable **user** IMS access token (rejects guest tokens).
 */
export async function resolveAdobeAccessToken(
  credentials:
    | {
        apiKey?: string;
        accessToken?: string;
        providerSpecificData?: {
          cookie?: unknown;
          access_token?: unknown;
          accessToken?: unknown;
        } | null;
      }
    | null
    | undefined,
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  const psd = credentials?.providerSpecificData;
  const candidates: string[] = [];
  const push = (v: unknown) => {
    if (typeof v === "string" && v.trim()) candidates.push(v.trim());
  };
  push(credentials?.apiKey);
  push(credentials?.accessToken);
  push(psd?.access_token);
  push(psd?.accessToken);
  push(psd?.cookie);

  if (candidates.length === 0) {
    throw new AdobeFireflyError(
      "Adobe Firefly credentials missing. " + GUEST_COOKIE_HELP,
      401,
      "missing_credentials"
    );
  }

  for (const c of candidates) {
    const extracted = extractAdobeCredentialToken(c);
    if (looksLikeAdobeJwt(extracted) && isAdobeUserAccessToken(extracted)) {
      return extracted;
    }
  }

  for (const c of candidates) {
    const extracted = extractAdobeCredentialToken(c);
    if (looksLikeAdobeJwt(extracted) && isAdobeGuestAccessToken(extracted)) {
      throw new AdobeFireflyError(GUEST_COOKIE_HELP, 401, "guest_token");
    }
  }

  const cookieBlob =
    candidates.find(
      (c) =>
        c.includes(";") ||
        c.toLowerCase().includes("aux_sid") ||
        c.toLowerCase().includes("ff_session")
    ) || candidates[0];

  const token = await exchangeAdobeCookieForAccessToken(cookieBlob, fetchImpl);
  if (isAdobeGuestAccessToken(token)) {
    throw new AdobeFireflyError(GUEST_COOKIE_HELP, 401, "guest_token");
  }
  return token;
}

// ── Credits balance (Limits) ────────────────────────────────────────────────

export interface AdobeFireflyCreditsBalance {
  total: number;
  used: number;
  remaining: number;
  availableUntil: string | null;
  freeTotal: number;
  freeUsed: number;
  freeRemaining: number;
  planTotal: number;
  planUsed: number;
  planRemaining: number;
  raw?: unknown;
}

function readQuotaBlock(block: unknown): {
  total: number;
  used: number;
  available: number;
} {
  if (!block || typeof block !== "object") return { total: 0, used: 0, available: 0 };
  const q =
    (block as Record<string, unknown>).quota &&
    typeof (block as Record<string, unknown>).quota === "object"
      ? ((block as Record<string, unknown>).quota as Record<string, unknown>)
      : (block as Record<string, unknown>);
  const total = Number(q.total ?? 0);
  const used = Number(q.used ?? 0);
  const available = Number(q.available ?? Math.max(0, total - used));
  return {
    total: Number.isFinite(total) ? total : 0,
    used: Number.isFinite(used) ? used : 0,
    available: Number.isFinite(available) ? available : 0,
  };
}

/**
 * Parse GET /v1/credits/balance JSON (adobe/balance.txt Response).
 * total.quota = aggregate; credits.firefly_* = free + plan buckets.
 */
export function parseAdobeCreditsBalance(body: unknown): AdobeFireflyCreditsBalance {
  const root = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const totalBlock = readQuotaBlock(root.total);
  const credits =
    root.credits && typeof root.credits === "object"
      ? (root.credits as Record<string, unknown>)
      : {};
  const free = readQuotaBlock(credits.firefly_free_credit);
  const plan = readQuotaBlock(credits.firefly_plan_credit);

  // Prefer top-level total; fall back to free+plan sum when total missing.
  let total = totalBlock.total;
  let used = totalBlock.used;
  let remaining = totalBlock.available;
  if (total <= 0 && (free.total > 0 || plan.total > 0)) {
    total = free.total + plan.total;
    used = free.used + plan.used;
    remaining = free.available + plan.available;
  }
  if (remaining <= 0 && total > 0) remaining = Math.max(0, total - used);

  const availableUntil =
    root.total &&
    typeof root.total === "object" &&
    typeof (root.total as Record<string, unknown>).availableUntil === "string"
      ? String((root.total as Record<string, unknown>).availableUntil)
      : null;

  return {
    total,
    used,
    remaining,
    availableUntil,
    freeTotal: free.total,
    freeUsed: free.used,
    freeRemaining: free.available,
    planTotal: plan.total,
    planUsed: plan.used,
    planRemaining: plan.available,
    raw: body,
  };
}

export async function fetchAdobeCreditsBalance(
  accessToken: string,
  fetchImpl: typeof fetch = fetch
): Promise<AdobeFireflyCreditsBalance> {
  const resp = await fetchImpl(ADOBE_FIREFLY_CREDITS_BALANCE_URL, {
    method: "GET",
    headers: buildAdobeBalanceHeaders(accessToken),
  });
  if (resp.status === 401 || resp.status === 403) {
    throw new AdobeFireflyError("Adobe Firefly balance: token invalid or expired", 401, "auth");
  }
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new AdobeFireflyError(
      `Adobe Firefly balance failed (${resp.status}): ${sanitizeErrorMessage(text.slice(0, 200))}`,
      502
    );
  }
  const data = await resp.json().catch(() => ({}));
  return parseAdobeCreditsBalance(data);
}

// ── Models discovery ────────────────────────────────────────────────────────

export interface AdobeFireflyDiscoveredModel {
  modelId: string;
  modelVersion: string;
  displayName: string;
  modality: "image" | "video" | "audio" | "unknown";
  enabled: boolean;
  healthStatus?: string;
}

/**
 * Parse POST /v2/models/discovery response into flat model/version rows.
 */
export function parseAdobeModelsDiscovery(body: unknown): AdobeFireflyDiscoveredModel[] {
  const root = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const models = Array.isArray(root.models) ? root.models : [];
  const out: AdobeFireflyDiscoveredModel[] = [];

  for (const m of models) {
    if (!m || typeof m !== "object") continue;
    const rec = m as Record<string, unknown>;
    const modelId = String(rec.modelId || "").trim();
    if (!modelId) continue;
    const versions =
      rec.modelVersions && typeof rec.modelVersions === "object"
        ? (rec.modelVersions as Record<string, unknown>)
        : {};
    for (const [ver, spec] of Object.entries(versions)) {
      if (!spec || typeof spec !== "object") continue;
      const s = spec as Record<string, unknown>;
      if (s.enabled === false) continue;
      const mods = Array.isArray(s.outputModality)
        ? s.outputModality.map((x) => String(x).toLowerCase())
        : [];
      let modality: AdobeFireflyDiscoveredModel["modality"] = "unknown";
      if (mods.includes("image")) modality = "image";
      else if (mods.includes("video")) modality = "video";
      else if (mods.includes("audio")) modality = "audio";
      out.push({
        modelId,
        modelVersion: ver,
        displayName: String(s.modelDisplayName || s.modelCaiDisplayName || ver),
        modality,
        enabled: s.enabled !== false,
        healthStatus: typeof s.healthStatus === "string" ? s.healthStatus : undefined,
      });
    }
  }
  return out;
}

export async function discoverAdobeFireflyModels(
  accessToken: string,
  fetchImpl: typeof fetch = fetch
): Promise<AdobeFireflyDiscoveredModel[]> {
  const resp = await fetchImpl(ADOBE_FIREFLY_MODELS_DISCOVERY_URL, {
    method: "POST",
    headers: buildAdobeDiscoveryHeaders(accessToken),
    body: JSON.stringify({ filters: { resolveSchema: true } }),
  });
  if (resp.status === 401 || resp.status === 403) {
    throw new AdobeFireflyError(
      "Adobe Firefly model discovery: token invalid or expired",
      401,
      "auth"
    );
  }
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new AdobeFireflyError(
      `Adobe Firefly model discovery failed (${resp.status}): ${sanitizeErrorMessage(text.slice(0, 200))}`,
      502
    );
  }
  const data = await resp.json().catch(() => ({}));
  return parseAdobeModelsDiscovery(data);
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function pollAdobeJob(opts: {
  pollUrl: string;
  accessToken: string;
  kind: "image" | "video";
  timeoutMs: number;
  pollIntervalMs?: number;
  /** Optional session cookie so a mid-poll 401 can renew JWT once via CDP. */
  sessionCookie?: string;
  sessionFingerprint?: string;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  };
}): Promise<{ mediaUrl: string; latest: unknown }> {
  const fetchImpl = opts.fetchImpl || fetch;
  const deadline = Date.now() + opts.timeoutMs;
  const interval =
    opts.pollIntervalMs && opts.pollIntervalMs > 0 ? opts.pollIntervalMs : DEFAULT_POLL_INTERVAL_MS;
  let attempt = 0;
  let latest: unknown = {};
  let accessToken = opts.accessToken;
  let authRefreshAttempted = false;

  while (Date.now() < deadline) {
    attempt += 1;
    const pollResp = await fetchImpl(opts.pollUrl, {
      method: "GET",
      headers: buildAdobePollHeaders(accessToken),
    });

    if (pollResp.status === 401 || pollResp.status === 403) {
      const accessError = pollResp.headers.get("x-access-error") || "";
      if (accessError === "taste_exhausted") {
        throw new AdobeFireflyError(
          "Adobe Firefly quota exhausted for this account",
          429,
          "quota_exhausted"
        );
      }
      // One CDP JWT renewal mid-poll (long jobs can outlive a near-expiry IMS token).
      if (!authRefreshAttempted && opts.sessionCookie) {
        authRefreshAttempted = true;
        try {
          const {
            rotateAdobeFireflySessionOnError,
            fingerprintAdobeCredential,
            estimateAdobeTokenExpiry,
          } = await import("./adobeFireflySession.ts");
          const fp =
            String(opts.sessionFingerprint || "").trim() ||
            fingerprintAdobeCredential(
              [accessToken, opts.sessionCookie].filter(Boolean).join("\n")
            );
          const refreshed = await rotateAdobeFireflySessionOnError(
            {
              accessToken,
              cookie: opts.sessionCookie,
              arpSessionId: "",
              tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
              updatedAt: Date.now(),
              fingerprint: fp,
              source: "rebuild",
            },
            { attempt: 3, authFailure: true, tryBrowser: true, log: opts.log }
          );
          if (refreshed?.accessToken && isAdobeUserAccessToken(refreshed.accessToken)) {
            accessToken = refreshed.accessToken;
            opts.log?.info?.(
              "ADOBE-FIREFLY",
              `poll auth ${pollResp.status}; retrying once with renewed JWT`
            );
            continue;
          }
        } catch {
          /* fall through to auth error */
        }
      }
      throw new AdobeFireflyError("Adobe Firefly token invalid or expired", 401, "auth");
    }

    if (!pollResp.ok) {
      const text = await pollResp.text().catch(() => "");
      if (
        pollResp.status === 408 ||
        pollResp.status === 429 ||
        pollResp.status === 451 ||
        pollResp.status >= 500 ||
        isAdobeTransientSubmitError(pollResp.status, text)
      ) {
        opts.log?.info?.("ADOBE-FIREFLY", `poll temporary ${pollResp.status}, attempt #${attempt}`);
        await sleep(interval);
        continue;
      }
      throw new AdobeFireflyError(
        `Adobe Firefly poll failed (${pollResp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`,
        502
      );
    }

    latest = await pollResp.json().catch(() => ({}));
    const statusHeader = String(pollResp.headers.get("x-task-status") || "").toUpperCase();
    const statusVal = String(
      (latest && typeof latest === "object" ? (latest as Record<string, unknown>).status : "") ||
        statusHeader ||
        ""
    ).toUpperCase();

    const mediaUrl = extractAdobeMediaUrl(latest, opts.kind);
    if (mediaUrl) {
      return { mediaUrl, latest };
    }

    if (isAdobeJobFailed(statusVal)) {
      throw new AdobeFireflyError(
        `Adobe Firefly ${opts.kind} job failed: ${sanitizeErrorMessage(JSON.stringify(latest).slice(0, 300))}`,
        502,
        "job_failed"
      );
    }

    opts.log?.info?.(
      "ADOBE-FIREFLY",
      `${opts.kind} pending #${attempt} status=${statusVal || "unknown"}`
    );
    await sleep(interval);
  }

  throw new AdobeFireflyError(`Adobe Firefly ${opts.kind} generation timed out`, 504, "timeout");
}

// Colligo often returns instant 408 with x-colligo-timeout:0.0 under load OR when
// generate-async is hammered in a batch. Space submits (gate) + reuse sticky ARP;
// do NOT thrash synthetic rebuilds on every retry (identical forter → no-op).
// More attempts: 1–2 reuse sticky ARP when forter is fresh; stale forter / attempt 3+ → off-screen Chrome warm.
const SUBMIT_MAX_ATTEMPTS = 5;
/** Base backoff after 408; combined with withAdobeFireflySubmitGate (~12s min gap). */
function submitBaseDelayMs(): number {
  if (
    process.env.ADOBE_FIREFLY_SUBMIT_BASE_DELAY_MS != null &&
    process.env.ADOBE_FIREFLY_SUBMIT_BASE_DELAY_MS !== ""
  ) {
    return Math.max(0, Number(process.env.ADOBE_FIREFLY_SUBMIT_BASE_DELAY_MS) || 0);
  }
  if (process.env.NODE_ENV === "test" || process.env.VITEST || process.env.NODE_TEST_CONTEXT)
    return 20;
  return 8000;
}

export async function adobeFireflyGenerateImage(opts: {
  accessToken: string;
  prompt: string;
  model: string;
  size?: unknown;
  aspectRatio?: unknown;
  quality?: unknown;
  seed?: number;
  sourceImageIds?: string[];
  negativePrompt?: string;
  /** Optional Cookie blob — used only to lift sherlockToken → x-arp-session-id */
  sessionCookie?: string;
  /** Shared ARP (sid+ark+ftr). Reuse with uploads; do not mint per retry. */
  arpSessionId?: string;
  /** Session cache key from ensureAdobeFireflySession — sticky ARP across batch jobs. */
  sessionFingerprint?: string;
  /** Chrome profile key (provider connection id) for CDP warm/login isolation. */
  sessionBrowserKey?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  };
}): Promise<{ url: string; b64_json?: string; latest: unknown }> {
  const fetchImpl = opts.fetchImpl || fetch;
  const { spec } = resolveAdobeImageModel(opts.model);
  const aspectRatio = normalizeAdobeAspectRatio(opts.aspectRatio ?? opts.size, "1:1");
  const outputResolution = normalizeAdobeOutputResolution(opts.quality, opts.size);
  const payload = buildAdobeImagePayload({
    prompt: opts.prompt,
    aspectRatio,
    outputResolution,
    modelSpec: spec,
    quality: opts.quality,
    seed: opts.seed,
    sourceImageIds: opts.sourceImageIds,
    negativePrompt: opts.negativePrompt,
  });

  const sessionCookie = String(opts.sessionCookie || "").trim();
  let activeCookie = extractAdobeCookieHeader(sessionCookie) || sessionCookie;
  // Prefer real browser sherlockToken / cookie rebuild (forter+arkose). Only the raw
  // credential paste counts as "browser ARP" — never the pure synthetic fallback.
  const hadBrowserArp = hasBrowserAdobeArpSession(activeCookie);
  let arpSessionId =
    (opts.arpSessionId && String(opts.arpSessionId).trim()) ||
    resolveAdobeArpSessionId(activeCookie);
  let submitData: unknown = {};
  let submitHeaders: Headers | Record<string, string | null | undefined> = new Headers();
  let lastSubmitError = "";
  let sawSystemUnderLoad = false;
  let accessToken = opts.accessToken;
  let authRefreshAttempted = false;

  const {
    withAdobeFireflySubmitGate,
    markAdobeFireflyArpSuccess,
    noteAdobeFireflySubmitFailure,
    rotateAdobeFireflySessionOnError,
    resolveAdobeArpSessionIdSmart,
    fingerprintAdobeCredential,
    estimateAdobeTokenExpiry,
  } = await import("./adobeFireflySession.ts");

  // Stable sticky key — do NOT include arpSessionId (it changes and would break sticky).
  const fingerprint =
    String(opts.sessionFingerprint || "").trim() ||
    fingerprintAdobeCredential([accessToken, activeCookie].filter(Boolean).join("\n"));
  const browserSessionKey = String(opts.sessionBrowserKey || "").trim() || fingerprint;

  // Gate ONLY the actual generate-async HTTP call (min gap). CDP warm / backoff run
  // outside so interactive browser login and other Firefly submits are not blocked for minutes.
  let submitOk = false;
  for (let attempt = 1; attempt <= SUBMIT_MAX_ATTEMPTS; attempt++) {
    const submitResp = await withAdobeFireflySubmitGate(() =>
      fetchImpl(ADOBE_FIREFLY_IMAGE_SUBMIT_URL, {
        method: "POST",
        headers: buildAdobeSubmitHeaders(accessToken, {
          arpSessionId,
          prompt: opts.prompt,
          cookie: activeCookie || undefined,
        }),
        body: JSON.stringify(payload),
      })
    );

    if (submitResp.status === 401 || submitResp.status === 403) {
      noteAdobeFireflySubmitFailure();
      const accessError = submitResp.headers.get("x-access-error") || "";
      if (accessError === "taste_exhausted") {
        throw new AdobeFireflyError(
          "Adobe Firefly quota exhausted for this account",
          429,
          "quota_exhausted"
        );
      }
      if (!authRefreshAttempted && attempt < SUBMIT_MAX_ATTEMPTS) {
        authRefreshAttempted = true;
        const refreshed = await rotateAdobeFireflySessionOnError(
          {
            accessToken,
            cookie: activeCookie,
            arpSessionId,
            tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
            updatedAt: Date.now(),
            fingerprint,
            browserSessionKey,
            source: "rebuild",
          },
          { attempt, authFailure: true, tryBrowser: true, log: opts.log }
        ).catch(() => null);
        if (refreshed?.accessToken && refreshed?.arpSessionId) {
          accessToken = refreshed.accessToken;
          activeCookie = refreshed.cookie || activeCookie;
          arpSessionId = refreshed.arpSessionId;
          opts.log?.info?.(
            "ADOBE-FIREFLY",
            `image submit auth ${submitResp.status}; retrying once with renewed CDP session`
          );
          continue;
        }
      }
      throw new AdobeFireflyError(
        "Adobe Firefly session is no longer authenticated and automatic browser renewal failed. " +
          "Sign in once through the Adobe Firefly browser login to restore durable renewal.",
        401,
        "auth"
      );
    }

    if (!submitResp.ok) {
      const text = await submitResp.text().catch(() => "");
      if (isAdobeTransientSubmitError(submitResp.status, text)) {
        sawSystemUnderLoad = true;
      }
      lastSubmitError = `Adobe Firefly image submit failed (${submitResp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`;
      if (isAdobeTransientSubmitError(submitResp.status, text) && attempt < SUBMIT_MAX_ATTEMPTS) {
        const { getAdobeForterAgeMs: forterAgeMsFn, extractAdobeForterTimestampMs: forterTsFn } =
          await import("./adobeFireflySession.ts");
        // Only treat as known-stale when the cookie embeds a parseable forter timestamp.
        // Missing timestamp (tests / synthetic ARP) must keep the full retry ladder.
        const forterTs = forterTsFn(activeCookie || "");
        const forterAgeBefore = forterAgeMsFn(activeCookie || "");
        const forterKnownStale =
          forterTs > 0 && Number.isFinite(forterAgeBefore) && forterAgeBefore > 4 * 60_000;
        // Stale risk session: at most 2 attempts (warm once + one retry). Avoid ~600s thrash.
        if (forterKnownStale && attempt >= 2) {
          noteAdobeFireflySubmitFailure();
          throw new AdobeFireflyError(
            formatAdobeSystemUnderLoadError("image", attempt, { hadBrowserArp }) +
              " Risk session looks expired — open Providers → Adobe Firefly → Sign in with browser once.",
            408,
            "system_under_load"
          );
        }
        try {
          if (activeCookie) {
            const rotated = await rotateAdobeFireflySessionOnError(
              {
                accessToken,
                cookie: activeCookie,
                arpSessionId,
                tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
                updatedAt: Date.now(),
                fingerprint,
                browserSessionKey,
                source: "rebuild",
              },
              {
                // Stale forter warms immediately; fresh forter quiet-reuses on 1–2 then warms.
                attempt,
                tryBrowser: process.env.ADOBE_FIREFLY_BROWSER_REFRESH !== "0",
                log: opts.log,
              }
            );
            accessToken = rotated.accessToken || accessToken;
            activeCookie = rotated.cookie || activeCookie;
            arpSessionId = rotated.arpSessionId;
          } else {
            arpSessionId = resolveAdobeArpSessionIdSmart(sessionCookie, {
              rotate: true,
            });
          }
        } catch {
          // Keep prior ARP — synthetic thrash rarely recovers colligo 408.
        }
        const base = submitBaseDelayMs();
        const delay =
          base <= 50
            ? base
            : Math.min(90_000, base * Math.pow(2, attempt - 1)) + Math.floor(Math.random() * 1500);
        opts.log?.info?.(
          "ADOBE-FIREFLY",
          `image submit transient ${submitResp.status}, retry ${attempt}/${SUBMIT_MAX_ATTEMPTS} in ${delay}ms (recovery attempt=${attempt})`
        );
        await sleep(delay);
        continue;
      }
      noteAdobeFireflySubmitFailure();
      if (sawSystemUnderLoad && isAdobeTransientSubmitError(submitResp.status, text)) {
        throw new AdobeFireflyError(
          formatAdobeSystemUnderLoadError("image", attempt, {
            hadBrowserArp,
          }),
          408,
          "system_under_load"
        );
      }
      throw new AdobeFireflyError(
        lastSubmitError,
        submitResp.status >= 400 && submitResp.status < 500 ? submitResp.status : 502
      );
    }

    submitData = await submitResp.json().catch(() => ({}));
    submitHeaders = submitResp.headers;
    // Sticky: remember ARP that colligo accepted so the next batch image reuses it.
    markAdobeFireflyArpSuccess(fingerprint, arpSessionId);
    submitOk = true;
    break;
  }
  if (!submitOk && !lastSubmitError) {
    throw new AdobeFireflyError(
      formatAdobeSystemUnderLoadError("image", SUBMIT_MAX_ATTEMPTS, { hadBrowserArp }),
      408,
      "system_under_load"
    );
  }

  let pollUrl = extractAdobeResultLink(submitHeaders, submitData);
  if (!pollUrl) {
    if (sawSystemUnderLoad) {
      throw new AdobeFireflyError(
        formatAdobeSystemUnderLoadError("image", SUBMIT_MAX_ATTEMPTS, {
          hadBrowserArp,
        }),
        408,
        "system_under_load"
      );
    }
    throw new AdobeFireflyError(
      lastSubmitError || "Adobe Firefly image submit succeeded but no poll URL was returned",
      502
    );
  }
  pollUrl = normalizeAdobePollUrl(pollUrl);

  const { mediaUrl, latest } = await pollAdobeJob({
    pollUrl,
    accessToken,
    kind: "image",
    timeoutMs: opts.timeoutMs && opts.timeoutMs > 0 ? opts.timeoutMs : DEFAULT_IMAGE_TIMEOUT_MS,
    fetchImpl,
    log: opts.log,
  });

  return { url: mediaUrl, latest };
}

export async function adobeFireflyGenerateVideo(opts: {
  accessToken: string;
  prompt: string;
  model: string;
  size?: unknown;
  aspectRatio?: unknown;
  duration?: unknown;
  quality?: unknown;
  resolution?: unknown;
  seed?: number;
  sourceImageIds?: string[];
  negativePrompt?: string;
  generateAudio?: boolean;
  sessionCookie?: string;
  /** Shared ARP (sid+ark+ftr). Reuse with frame uploads. */
  arpSessionId?: string;
  /** Session cache key from ensureAdobeFireflySession — sticky ARP across batch jobs. */
  sessionFingerprint?: string;
  /** Chrome profile key (provider connection id) for CDP warm/login isolation. */
  sessionBrowserKey?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  };
}): Promise<{
  url: string;
  b64_json?: string;
  format: string;
  latest: unknown;
}> {
  const fetchImpl = opts.fetchImpl || fetch;
  const { spec } = resolveAdobeVideoModel(opts.model);
  const aspectRatio = normalizeAdobeAspectRatio(opts.aspectRatio ?? opts.size, "16:9");
  const duration =
    typeof opts.duration === "number"
      ? opts.duration
      : typeof opts.duration === "string" && opts.duration.trim()
        ? Number(opts.duration)
        : spec.defaultDuration;
  const resolution =
    typeof opts.resolution === "string" && opts.resolution.trim()
      ? opts.resolution
      : typeof opts.quality === "string" && /p$/i.test(opts.quality)
        ? opts.quality
        : spec.defaultResolution;

  const payload = buildAdobeVideoPayload({
    prompt: opts.prompt,
    aspectRatio,
    duration: Number.isFinite(duration) ? Number(duration) : spec.defaultDuration,
    modelSpec: spec,
    resolution,
    seed: opts.seed,
    sourceImageIds: opts.sourceImageIds,
    negativePrompt: opts.negativePrompt,
    generateAudio: opts.generateAudio,
  });

  const sessionCookie = String(opts.sessionCookie || "").trim();
  let activeCookie = extractAdobeCookieHeader(sessionCookie) || sessionCookie;
  const hadBrowserArp = hasBrowserAdobeArpSession(activeCookie);
  let arpSessionId =
    (opts.arpSessionId && String(opts.arpSessionId).trim()) ||
    resolveAdobeArpSessionId(activeCookie);
  let submitData: unknown = {};
  let submitHeaders: Headers | Record<string, string | null | undefined> = new Headers();
  let lastSubmitError = "";
  let sawSystemUnderLoad = false;
  let accessToken = opts.accessToken;
  let authRefreshAttempted = false;

  const {
    withAdobeFireflySubmitGate,
    markAdobeFireflyArpSuccess,
    noteAdobeFireflySubmitFailure,
    rotateAdobeFireflySessionOnError,
    resolveAdobeArpSessionIdSmart,
    fingerprintAdobeCredential,
    estimateAdobeTokenExpiry,
  } = await import("./adobeFireflySession.ts");

  const fingerprint =
    String(opts.sessionFingerprint || "").trim() ||
    fingerprintAdobeCredential([accessToken, activeCookie].filter(Boolean).join("\n"));
  const browserSessionKey = String(opts.sessionBrowserKey || "").trim() || fingerprint;

  let videoSubmitOk = false;
  for (let attempt = 1; attempt <= SUBMIT_MAX_ATTEMPTS; attempt++) {
    const submitResp = await withAdobeFireflySubmitGate(() =>
      fetchImpl(ADOBE_FIREFLY_VIDEO_SUBMIT_URL, {
        method: "POST",
        headers: buildAdobeSubmitHeaders(accessToken, {
          arpSessionId,
          prompt: opts.prompt,
          cookie: activeCookie || undefined,
        }),
        body: JSON.stringify(payload),
      })
    );

    if (submitResp.status === 401 || submitResp.status === 403) {
      noteAdobeFireflySubmitFailure();
      const accessError = submitResp.headers.get("x-access-error") || "";
      if (accessError === "taste_exhausted") {
        throw new AdobeFireflyError(
          "Adobe Firefly quota exhausted for this account",
          429,
          "quota_exhausted"
        );
      }
      if (!authRefreshAttempted && attempt < SUBMIT_MAX_ATTEMPTS) {
        authRefreshAttempted = true;
        const refreshed = await rotateAdobeFireflySessionOnError(
          {
            accessToken,
            cookie: activeCookie,
            arpSessionId,
            tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
            updatedAt: Date.now(),
            fingerprint,
            browserSessionKey,
            source: "rebuild",
          },
          { attempt, authFailure: true, tryBrowser: true, log: opts.log }
        ).catch(() => null);
        if (refreshed?.accessToken && refreshed?.arpSessionId) {
          accessToken = refreshed.accessToken;
          activeCookie = refreshed.cookie || activeCookie;
          arpSessionId = refreshed.arpSessionId;
          opts.log?.info?.(
            "ADOBE-FIREFLY",
            `video submit auth ${submitResp.status}; retrying once with renewed CDP session`
          );
          continue;
        }
      }
      throw new AdobeFireflyError(
        "Adobe Firefly session is no longer authenticated and automatic browser renewal failed. " +
          "Sign in once through the Adobe Firefly browser login to restore durable renewal.",
        401,
        "auth"
      );
    }

    if (!submitResp.ok) {
      const text = await submitResp.text().catch(() => "");
      if (isAdobeTransientSubmitError(submitResp.status, text)) {
        sawSystemUnderLoad = true;
      }
      lastSubmitError = `Adobe Firefly video submit failed (${submitResp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`;
      if (isAdobeTransientSubmitError(submitResp.status, text) && attempt < SUBMIT_MAX_ATTEMPTS) {
        const { getAdobeForterAgeMs: forterAgeMsFn, extractAdobeForterTimestampMs: forterTsFn } =
          await import("./adobeFireflySession.ts");
        const forterTs = forterTsFn(activeCookie || "");
        const forterAgeBefore = forterAgeMsFn(activeCookie || "");
        const forterKnownStale =
          forterTs > 0 && Number.isFinite(forterAgeBefore) && forterAgeBefore > 4 * 60_000;
        if (forterKnownStale && attempt >= 2) {
          noteAdobeFireflySubmitFailure();
          throw new AdobeFireflyError(
            formatAdobeSystemUnderLoadError("video", attempt, { hadBrowserArp }) +
              " Risk session looks expired — open Providers → Adobe Firefly → Sign in with browser once.",
            408,
            "system_under_load"
          );
        }
        try {
          if (activeCookie) {
            const rotated = await rotateAdobeFireflySessionOnError(
              {
                accessToken,
                cookie: activeCookie,
                arpSessionId,
                tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
                updatedAt: Date.now(),
                fingerprint,
                browserSessionKey,
                source: "rebuild",
              },
              {
                attempt,
                tryBrowser: process.env.ADOBE_FIREFLY_BROWSER_REFRESH !== "0",
                log: opts.log,
              }
            );
            accessToken = rotated.accessToken || accessToken;
            activeCookie = rotated.cookie || activeCookie;
            arpSessionId = rotated.arpSessionId;
          } else {
            arpSessionId = resolveAdobeArpSessionIdSmart(sessionCookie, {
              rotate: true,
            });
          }
        } catch {
          /* keep prior ARP */
        }
        const base = submitBaseDelayMs();
        const delay =
          base <= 50
            ? base
            : Math.min(90_000, base * Math.pow(2, attempt - 1)) + Math.floor(Math.random() * 1500);
        opts.log?.info?.(
          "ADOBE-FIREFLY",
          `video submit transient ${submitResp.status}, retry ${attempt}/${SUBMIT_MAX_ATTEMPTS} in ${delay}ms (recovery attempt=${attempt})`
        );
        await sleep(delay);
        continue;
      }
      noteAdobeFireflySubmitFailure();
      if (sawSystemUnderLoad && isAdobeTransientSubmitError(submitResp.status, text)) {
        throw new AdobeFireflyError(
          formatAdobeSystemUnderLoadError("video", attempt, {
            hadBrowserArp,
          }),
          408,
          "system_under_load"
        );
      }
      throw new AdobeFireflyError(
        lastSubmitError,
        submitResp.status >= 400 && submitResp.status < 500 ? submitResp.status : 502
      );
    }

    submitData = await submitResp.json().catch(() => ({}));
    submitHeaders = submitResp.headers;
    markAdobeFireflyArpSuccess(fingerprint, arpSessionId);
    videoSubmitOk = true;
    break;
  }
  if (!videoSubmitOk && !lastSubmitError) {
    throw new AdobeFireflyError(
      formatAdobeSystemUnderLoadError("video", SUBMIT_MAX_ATTEMPTS, { hadBrowserArp }),
      408,
      "system_under_load"
    );
  }

  let pollUrl = extractAdobeResultLink(submitHeaders, submitData);
  if (!pollUrl) {
    if (sawSystemUnderLoad) {
      throw new AdobeFireflyError(
        formatAdobeSystemUnderLoadError("video", SUBMIT_MAX_ATTEMPTS, {
          hadBrowserArp,
        }),
        408,
        "system_under_load"
      );
    }
    throw new AdobeFireflyError(
      lastSubmitError || "Adobe Firefly video submit succeeded but no poll URL was returned",
      502
    );
  }
  pollUrl = normalizeAdobePollUrl(pollUrl);

  const { mediaUrl, latest } = await pollAdobeJob({
    pollUrl,
    accessToken,
    kind: "video",
    timeoutMs: opts.timeoutMs && opts.timeoutMs > 0 ? opts.timeoutMs : DEFAULT_VIDEO_TIMEOUT_MS,
    sessionCookie: activeCookie || sessionCookie || undefined,
    sessionFingerprint: fingerprint,
    fetchImpl,
    log: opts.log,
  });

  return { url: mediaUrl, format: "mp4", latest };
}
