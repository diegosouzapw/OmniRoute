/**
 * Adobe Firefly — browser-session emulation: nonces, ARP session ids, request headers.
 *
 * Split out of adobeFireflyClient.ts.
 */

import { stripAdobeJwts } from "./adobeFireflySecurity.ts";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import {
  DEFAULT_SEC_CH_UA,
  DEFAULT_USER_AGENT,
  FIREFLY_ORIGIN,
  FIREFLY_REFERER,
} from "./adobeFireflyCatalog.ts";
import {
  adobeFireflyApiKey,
  extractAdobeAccountIdFromToken,
  looksLikeAdobeJwt,
} from "./adobeFireflyCredentials.ts";

export function browserHeaders(): Record<string, string> {
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
  const withoutJwt = stripAdobeJwts(raw, " ");
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
