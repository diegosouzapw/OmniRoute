/**
 * Adobe Firefly durable session manager.
 *
 * Goal: user pastes JWT and/or browser Cookie once; we keep generate working by:
 *  1) Extracting / caching the IMS user JWT (24h typical)
 *  2) Rebuilding x-arp-session-id from live cookie pieces (ff_session_guid + arkose +
 *     forterToken + optional bfp/fpjs) — the SPA's sherlockToken is just that blob
 *  3) Optionally warming forter/arkose via Playwright against firefly.adobe.com
 *  4) Merging Set-Cookie / jar updates back into the stored cookie string
 *  5) Rotating ARP on colligo 408 retries (stale Arkose/Forter is the usual cause)
 *
 * Firefly.adobe.com page cookies alone still cannot mint a user IMS token (IMS cookies
 * live on adobelogin.com). JWT paste once covers that; ARP is what expires every few
 * minutes and must be auto-rebuilt.
 */

import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  AdobeFireflyError,
  buildAdobeArpSessionId,
  extractAdobeArpSessionId,
  extractAdobeCookieHeader,
  extractAdobeCredentialToken,
  isAdobeUserAccessToken,
  looksLikeAdobeCookieBlob,
  looksLikeAdobeJwt,
  decodeAdobeJwtPayload,
  resolveAdobeAccessToken,
  exchangeAdobeCookieForAccessToken,
} from "./adobeFireflyClient.ts";

export interface AdobeFireflySession {
  accessToken: string;
  cookie: string;
  arpSessionId: string;
  /** Epoch ms when the IMS token is expected to expire (best-effort). */
  tokenExpiresAt: number;
  updatedAt: number;
  /** Hash of the original credential paste (cache key). */
  fingerprint: string;
  source: "paste" | "ims" | "browser" | "cache" | "rebuild";
}

export interface AdobeFireflySessionResolveOpts {
  credentials?: {
    apiKey?: string;
    accessToken?: string;
    providerSpecificData?: { cookie?: unknown; access_token?: unknown; accessToken?: unknown } | null;
  } | null;
  /** Force browser / cookie ARP rebuild (e.g. after HTTP 408). */
  forceRefresh?: boolean;
  /** Prefer minting a brand-new ARP (retry path). */
  rotateArp?: boolean;
  fetchImpl?: typeof fetch;
  log?: { info?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void };
  /** Disable Playwright refresh (tests / hosts without browsers). */
  allowBrowserRefresh?: boolean;
}

const sessionCache = new Map<string, AdobeFireflySession>();
const browserRefreshInFlight = new Map<string, Promise<AdobeFireflySession | null>>();

/** ARP / sherlock is short-lived; refresh before this age when cookies can rebuild. */
const ARP_MAX_AGE_MS = 90_000;
/** Refresh IMS token this many ms before JWT expiry. */
const JWT_REFRESH_SKEW_MS = 10 * 60_000;
/** Persist sessions under DATA_DIR so restarts keep JWT + last cookie. */
const SESSION_DIR_NAME = "adobe-firefly-sessions";

function dataDir(): string {
  return (
    String(process.env.DATA_DIR || process.env.OMNIROUTE_DATA_DIR || "").trim() ||
    join(process.cwd(), ".data")
  );
}

function sessionFilePath(fingerprint: string): string {
  const dir = join(dataDir(), SESSION_DIR_NAME);
  try {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  } catch {
    /* ignore */
  }
  return join(dir, `${fingerprint}.json`);
}

export function fingerprintAdobeCredential(raw: string): string {
  return createHash("sha256").update(String(raw || "").trim()).digest("hex").slice(0, 32);
}

/** Pull a single cookie value from a Cookie header / paste blob. */
export function getAdobeCookieValue(cookieOrBlob: string, name: string): string {
  const raw = String(cookieOrBlob || "");
  if (!raw || !name) return "";
  const re = new RegExp(`(?:^|[;\\s\\n\\r])${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}=([^;\\s\\n\\r]+)`, "i");
  const m = raw.match(re);
  if (!m?.[1]) return "";
  let v = m[1].trim().replace(/^["']|["']$/g, "");
  try {
    if (/%[0-9A-Fa-f]{2}/.test(v)) v = decodeURIComponent(v);
  } catch {
    /* keep */
  }
  return v;
}

/** Normalize Forter token to the live ftr shape ending in -v2_tt. */
export function normalizeAdobeForterToken(value: string): string {
  let f = String(value || "").trim();
  if (!f) return "";
  try {
    if (/%[0-9A-Fa-f]{2}/.test(f)) f = decodeURIComponent(f);
  } catch {
    /* keep */
  }
  // Cookie sometimes stores "id,timestamp" (localStorage form) — not usable as ftr.
  if (/^[a-f0-9]{32},\d+$/i.test(f)) return "";
  if (f.endsWith("v2") && !f.endsWith("v2_tt")) f = `${f}_tt`;
  return f;
}

/**
 * Rebuild x-arp-session-id from browser cookie components.
 * Live successful generate-async ARP is base64(JSON({sid, ark, ftr, bfp?, fpjs?})).
 * Returns "" when required pieces are missing.
 */
export function buildAdobeArpSessionIdFromCookies(
  cookieOrBlob: string,
  extras?: { region?: string; bfp?: string; fpjs?: string }
): string {
  const blob = String(cookieOrBlob || "");
  if (!blob.trim()) return "";

  const sid =
    getAdobeCookieValue(blob, "ff_session_guid") ||
    getAdobeCookieValue(blob, "sid") ||
    "";
  const ark = getAdobeCookieValue(blob, "arkose") || "";
  const ftr =
    normalizeAdobeForterToken(getAdobeCookieValue(blob, "forterToken")) ||
    normalizeAdobeForterToken(getAdobeCookieValue(blob, "forter")) ||
    "";
  if (!sid || !ark || !ftr) return "";

  let bfp = extras?.bfp || getAdobeCookieValue(blob, "bfp") || "";
  let fpjsRaw = extras?.fpjs || getAdobeCookieValue(blob, "fpjs") || "";
  if (fpjsRaw) {
    try {
      if (/%[0-9A-Fa-f]{2}/.test(fpjsRaw)) fpjsRaw = decodeURIComponent(fpjsRaw);
    } catch {
      /* keep */
    }
  }

  // Prefer rebuilding over a stale sherlockToken when cookie pieces exist —
  // forterToken timestamps advance as the SPA warms risk SDKs.
  const obj: Record<string, string> = { sid, ark, ftr };
  if (bfp) obj.bfp = bfp;
  if (fpjsRaw) obj.fpjs = fpjsRaw;
  return Buffer.from(JSON.stringify(obj), "utf-8").toString("base64");
}

/** True when the blob can rebuild a full ARP without a pasted sherlockToken. */
export function canRebuildAdobeArpFromCookies(cookieOrBlob: string): boolean {
  return Boolean(buildAdobeArpSessionIdFromCookies(cookieOrBlob));
}

/**
 * Resolve the best ARP for a request:
 *  1) force-rotate → mint fresh synthetic (or rebuild if cookies present)
 *  2) rebuild from cookie pieces (forter/arkose/sid) — usually fresher than sherlock
 *  3) explicit sherlockToken / x-arp-session-id from paste
 *  4) synthetic rich ARP
 */
export function resolveAdobeArpSessionIdSmart(
  cookieOrBlob?: string,
  opts?: { rotate?: boolean }
): string {
  const blob = String(cookieOrBlob || "");
  if (opts?.rotate) {
    const rebuilt = buildAdobeArpSessionIdFromCookies(blob);
    if (rebuilt) return rebuilt;
    return buildAdobeArpSessionId();
  }
  const rebuilt = buildAdobeArpSessionIdFromCookies(blob);
  const extracted = extractAdobeArpSessionId(blob);
  // Prefer rebuild when both exist: cookie forter is updated by the SPA more often
  // than the frozen sherlockToken the user pasted minutes ago.
  if (rebuilt && extracted) {
    const rebuiltFtr = (() => {
      try {
        const j = JSON.parse(Buffer.from(rebuilt + "=".repeat((4 - (rebuilt.length % 4)) % 4), "base64").toString("utf8")) as { ftr?: string };
        return String(j.ftr || "");
      } catch {
        return "";
      }
    })();
    const extractedFtr = (() => {
      try {
        const j = JSON.parse(Buffer.from(extracted + "=".repeat((4 - (extracted.length % 4)) % 4), "base64").toString("utf8")) as { ftr?: string };
        return String(j.ftr || "");
      } catch {
        return "";
      }
    })();
    // Prefer the ARP whose forter timestamp is newer (…_ms__UDF43…).
    const ts = (ftr: string) => {
      const m = ftr.match(/_(\d{13})__/);
      return m ? Number(m[1]) : 0;
    };
    if (ts(rebuiltFtr) >= ts(extractedFtr)) return rebuilt;
    return extracted;
  }
  if (rebuilt) return rebuilt;
  if (extracted) return extracted;
  return buildAdobeArpSessionId();
}

/** Merge cookie name=value pairs (new wins). Single-line Cookie header. */
export function mergeAdobeCookieHeaders(base: string, updates: string): string {
  const map = new Map<string, string>();
  const ingest = (raw: string) => {
    for (const part of String(raw || "").split(";")) {
      const idx = part.indexOf("=");
      if (idx <= 0) continue;
      let name = part.slice(0, idx).trim();
      let value = part.slice(idx + 1).trim();
      if (!name) continue;
      try {
        name = decodeURIComponent(name);
      } catch {
        /* keep */
      }
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (/[\r\n\0]/.test(value)) continue;
      map.set(name, value);
    }
  };
  ingest(extractAdobeCookieHeader(base) || base);
  ingest(extractAdobeCookieHeader(updates) || updates);
  return [...map.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

/** Serialize session back into the multi-line credential paste application stores. */
export function serializeAdobeFireflyCredential(session: Pick<AdobeFireflySession, "accessToken" | "cookie" | "arpSessionId">): string {
  const lines: string[] = [];
  if (session.accessToken) lines.push(session.accessToken.trim());
  if (session.arpSessionId) lines.push(session.arpSessionId.trim());
  if (session.cookie) lines.push(session.cookie.trim());
  return lines.join("\n");
}

export function estimateAdobeTokenExpiry(accessToken: string): number {
  const payload = decodeAdobeJwtPayload(accessToken);
  if (!payload) return Date.now() + 60 * 60_000;
  const created = Number(payload.created_at || 0);
  const expiresIn = Number(payload.expires_in || 0);
  if (created > 0 && expiresIn > 0) return created + expiresIn;
  // Fallback: treat as 20h from now if claims missing
  return Date.now() + 20 * 60 * 60_000;
}

function diskSessionsEnabled(): boolean {
  // Unit tests and explicit opt-out skip durable disk cache (avoids sticky IMS skips).
  if (process.env.ADOBE_FIREFLY_SESSION_DISK === "0") return false;
  if (process.env.NODE_ENV === "test") return false;
  if (process.env.VITEST || process.env.NODE_TEST_CONTEXT) return false;
  return true;
}

function loadDiskSession(fingerprint: string): AdobeFireflySession | null {
  if (!diskSessionsEnabled()) return null;
  try {
    const path = sessionFilePath(fingerprint);
    if (!existsSync(path)) return null;
    const raw = readFileSync(path, "utf8");
    const obj = JSON.parse(raw) as AdobeFireflySession;
    if (!obj?.accessToken || !isAdobeUserAccessToken(obj.accessToken)) return null;
    return { ...obj, fingerprint, source: "cache" };
  } catch {
    return null;
  }
}

function saveDiskSession(session: AdobeFireflySession): void {
  if (!diskSessionsEnabled()) return;
  try {
    const path = sessionFilePath(session.fingerprint);
    writeFileSync(path, JSON.stringify(session, null, 2), "utf8");
  } catch {
    /* best-effort */
  }
}

function collectCredentialBlobs(
  credentials: AdobeFireflySessionResolveOpts["credentials"]
): string[] {
  const out: string[] = [];
  const push = (v: unknown) => {
    if (typeof v === "string" && v.trim()) out.push(v.trim());
  };
  push(credentials?.apiKey);
  push(credentials?.accessToken);
  push(credentials?.providerSpecificData?.cookie);
  push(credentials?.providerSpecificData?.access_token);
  push(credentials?.providerSpecificData?.accessToken);
  return out;
}

/**
 * Optional Playwright warm-up: open firefly.adobe.com with the user's cookies so
 * Forter/Arkose mint fresh tokens, then rebuild ARP + merge the jar.
 * Never throws — returns null when Playwright is unavailable or warm-up fails.
 */
export async function refreshAdobeSessionViaBrowser(
  session: AdobeFireflySession,
  log?: AdobeFireflySessionResolveOpts["log"]
): Promise<AdobeFireflySession | null> {
  if (process.env.ADOBE_FIREFLY_BROWSER_REFRESH === "0") return null;

  let chromium: typeof import("playwright").chromium | null = null;
  try {
    const pw = await import("playwright");
    chromium = pw.chromium;
  } catch {
    log?.warn?.("ADOBE-FIREFLY", "Playwright not available — skip browser ARP refresh");
    return null;
  }

  let browser: import("playwright").Browser | null = null;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--disable-blink-features=AutomationControlled"],
    });
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
      locale: "en-US",
      viewport: { width: 1280, height: 800 },
    });
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    });

    const cookieHeader = extractAdobeCookieHeader(session.cookie) || session.cookie;
    for (const part of cookieHeader.split(";")) {
      const idx = part.indexOf("=");
      if (idx <= 0) continue;
      let name = part.slice(0, idx).trim();
      let value = part.slice(idx + 1).trim();
      try {
        name = decodeURIComponent(name);
      } catch {
        /* keep */
      }
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!name || /[\r\n\0]/.test(value)) continue;
      try {
        await context.addCookies([
          { name, value, domain: ".adobe.com", path: "/", secure: true, sameSite: "Lax" },
        ]);
      } catch {
        try {
          await context.addCookies([
            { name, value, url: "https://firefly.adobe.com/", path: "/", secure: true },
          ]);
        } catch {
          /* skip invalid cookie */
        }
      }
    }

    const page = await context.newPage();
    await page.goto("https://firefly.adobe.com/generate/image", {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });

    // Inject stored user JWT so SPA API calls (if any) use AdobeID, not guest.
    if (session.accessToken) {
      await page
        .evaluate((token) => {
          for (const key of Object.keys(sessionStorage)) {
            if (!key.includes("adobeid_ims_access_token/clio-playground-web")) continue;
            let obj: Record<string, unknown> = {};
            try {
              obj = JSON.parse(sessionStorage.getItem(key) || "{}") as Record<string, unknown>;
            } catch {
              obj = {};
            }
            obj.tokenValue = token;
            obj.access_token = token;
            obj.valid = true;
            obj.expire = Date.now() + 20 * 3600 * 1000;
            obj.expires_in = 86400000;
            obj.client_id = "clio-playground-web";
            sessionStorage.setItem(key, JSON.stringify(obj));
          }
        }, session.accessToken)
        .catch(() => {});
    }

    // Wait for Forter / Arkose warm-up.
    await page.waitForTimeout(6_000);

    const jar = await context.cookies();
    const jarHeader = jar.map((c) => `${c.name}=${c.value}`).join("; ");
    const ls = await page
      .evaluate(() => ({
        bfp: localStorage.getItem("bfp") || "",
        fpjs: localStorage.getItem("fpjs") || "",
        forter: localStorage.getItem("forterToken") || "",
      }))
      .catch(() => ({ bfp: "", fpjs: "", forter: "" }));

    const mergedCookie = mergeAdobeCookieHeaders(session.cookie, jarHeader);
    // Ensure bfp/fpjs land in the cookie blob for rebuild if only in localStorage
    let blobForArp = mergedCookie;
    if (ls.bfp && !getAdobeCookieValue(blobForArp, "bfp")) {
      blobForArp = mergeAdobeCookieHeaders(blobForArp, `bfp=${ls.bfp}`);
    }
    if (ls.fpjs && !getAdobeCookieValue(blobForArp, "fpjs")) {
      blobForArp = mergeAdobeCookieHeaders(blobForArp, `fpjs=${ls.fpjs}`);
    }

    const arp =
      buildAdobeArpSessionIdFromCookies(blobForArp, {
        bfp: ls.bfp || undefined,
        fpjs: ls.fpjs || undefined,
      }) ||
      extractAdobeArpSessionId(blobForArp) ||
      buildAdobeArpSessionId();

    const next: AdobeFireflySession = {
      ...session,
      cookie: extractAdobeCookieHeader(blobForArp) || blobForArp,
      arpSessionId: arp,
      updatedAt: Date.now(),
      source: "browser",
    };
    sessionCache.set(session.fingerprint, next);
    saveDiskSession(next);
    log?.info?.("ADOBE-FIREFLY", "browser session warm-up refreshed ARP/cookie");
    return next;
  } catch (err) {
    log?.warn?.(
      "ADOBE-FIREFLY",
      `browser ARP refresh failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return null;
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        /* ignore */
      }
    }
  }
}

/**
 * Resolve a durable Firefly session from stored credentials.
 * Caches in memory + DATA_DIR; rebuilds ARP from cookies; optionally warms via Playwright.
 */
export async function ensureAdobeFireflySession(
  opts: AdobeFireflySessionResolveOpts
): Promise<AdobeFireflySession> {
  const blobs = collectCredentialBlobs(opts.credentials);
  if (blobs.length === 0) {
    throw new AdobeFireflyError(
      "Adobe Firefly credentials missing. Paste the IMS JWT (Authorization: Bearer on firefly-3p) " +
        "and ideally the full firefly.adobe.com Cookie (with sherlockToken / forterToken / arkose) once.",
      401,
      "missing_credentials"
    );
  }

  const joined = blobs.join("\n");
  const fingerprint = fingerprintAdobeCredential(joined);

  // forceRefresh / rotate always drop in-memory cache for this fingerprint
  if (opts.forceRefresh) sessionCache.delete(fingerprint);

  const cached = sessionCache.get(fingerprint) || loadDiskSession(fingerprint);
  if (cached && !opts.forceRefresh) sessionCache.set(fingerprint, cached);

  const fetchImpl = opts.fetchImpl || fetch;
  let accessToken = "";
  let cookie = "";
  let pasteHadUserJwt = false;

  // Prefer JWT from the live paste (authoritative for this request)
  for (const b of blobs) {
    const tok = extractAdobeCredentialToken(b);
    if (looksLikeAdobeJwt(tok) && isAdobeUserAccessToken(tok)) {
      accessToken = tok;
      pasteHadUserJwt = true;
      break;
    }
  }
  // Cookie-only paste: use short-lived memory cache JWT only (not a stale disk token alone)
  if (
    !accessToken &&
    cached?.accessToken &&
    isAdobeUserAccessToken(cached.accessToken) &&
    sessionCache.has(fingerprint) &&
    Date.now() - cached.updatedAt < 30 * 60_000
  ) {
    accessToken = cached.accessToken;
  }

  // Cookie blob
  for (const b of blobs) {
    const c = extractAdobeCookieHeader(b);
    if (c) {
      cookie = c;
      break;
    }
    if (looksLikeAdobeCookieBlob(b)) {
      cookie = extractAdobeCookieHeader(b) || b;
      break;
    }
  }
  if (!cookie && cached?.cookie) cookie = cached.cookie;
  if (cached?.cookie && cookie) cookie = mergeAdobeCookieHeaders(cached.cookie, cookie);

  // Cookie-only or near-expiry JWT → try IMS exchange (needs real IMS cookies on adobelogin.com)
  const tokenExpiresAt = accessToken ? estimateAdobeTokenExpiry(accessToken) : 0;
  const needJwtRefresh =
    !accessToken ||
    !pasteHadUserJwt ||
    (tokenExpiresAt > 0 && tokenExpiresAt - Date.now() < JWT_REFRESH_SKEW_MS);

  if (needJwtRefresh && cookie) {
    try {
      const refreshed = await exchangeAdobeCookieForAccessToken(cookie, fetchImpl);
      if (isAdobeUserAccessToken(refreshed)) {
        accessToken = refreshed;
        opts.log?.info?.("ADOBE-FIREFLY", "IMS cookie exchange produced a user JWT");
      }
    } catch {
      // Fall through — pure firefly cookies still yield guest-only; keep existing JWT.
    }
  }

  if (!accessToken) {
    // Last resort: full resolve path (throws guest_token with help text)
    accessToken = await resolveAdobeAccessToken(opts.credentials, fetchImpl);
  }

  const arpAge = cached ? Date.now() - cached.updatedAt : Number.POSITIVE_INFINITY;
  const shouldRotate =
    Boolean(opts.rotateArp) ||
    Boolean(opts.forceRefresh) ||
    arpAge > ARP_MAX_AGE_MS ||
    !cached?.arpSessionId;

  let arpSessionId = shouldRotate
    ? resolveAdobeArpSessionIdSmart(cookie || joined, { rotate: true })
    : cached?.arpSessionId || resolveAdobeArpSessionIdSmart(cookie || joined);

  let session: AdobeFireflySession = {
    accessToken,
    cookie: cookie || extractAdobeCookieHeader(joined) || "",
    arpSessionId,
    tokenExpiresAt: estimateAdobeTokenExpiry(accessToken),
    updatedAt: Date.now(),
    fingerprint,
    source: shouldRotate ? "rebuild" : cached?.source || "paste",
  };

  // Browser warm-up is OFF by default: headless Forter/Arkose is rejected by colligo (408).
  // Enable only with ADOBE_FIREFLY_BROWSER_REFRESH=1 (and forceRefresh / missing ARP pieces).
  const allowBrowser =
    opts.allowBrowserRefresh === true || process.env.ADOBE_FIREFLY_BROWSER_REFRESH === "1";
  const needsBrowser =
    allowBrowser &&
    Boolean(session.cookie) &&
    (opts.forceRefresh ||
      (!canRebuildAdobeArpFromCookies(session.cookie) && !extractAdobeArpSessionId(session.cookie)));

  if (needsBrowser && session.cookie) {
    const key = fingerprint;
    let inflight = browserRefreshInFlight.get(key);
    if (!inflight) {
      inflight = refreshAdobeSessionViaBrowser(session, opts.log).finally(() => {
        browserRefreshInFlight.delete(key);
      });
      browserRefreshInFlight.set(key, inflight);
    }
    const warmed = await inflight;
    if (warmed) session = warmed;
  }

  // Final ARP if still empty
  if (!session.arpSessionId) {
    session.arpSessionId = resolveAdobeArpSessionIdSmart(session.cookie || joined, {
      rotate: true,
    });
  }

  sessionCache.set(fingerprint, session);
  saveDiskSession(session);
  return session;
}

/**
 * After a colligo 408: rotate ARP (and optionally warm browser), return next session.
 */
export async function rotateAdobeFireflySessionOnError(
  session: AdobeFireflySession,
  opts?: {
    tryBrowser?: boolean;
    log?: AdobeFireflySessionResolveOpts["log"];
  }
): Promise<AdobeFireflySession> {
  let next: AdobeFireflySession = {
    ...session,
    arpSessionId: resolveAdobeArpSessionIdSmart(session.cookie, { rotate: true }),
    updatedAt: Date.now(),
    source: "rebuild",
  };

  if (opts?.tryBrowser && session.cookie && process.env.ADOBE_FIREFLY_BROWSER_REFRESH !== "0") {
    const warmed = await refreshAdobeSessionViaBrowser(next, opts.log);
    if (warmed) next = warmed;
  }

  // Always mint a unique synthetic ARP if rebuild produced the same string
  if (next.arpSessionId === session.arpSessionId) {
    next.arpSessionId = buildAdobeArpSessionId();
    next.source = "rebuild";
  }

  sessionCache.set(session.fingerprint, next);
  saveDiskSession(next);
  return next;
}

/** Test helper — clear in-memory session cache. */
export function __resetAdobeFireflySessionCacheForTests(): void {
  sessionCache.clear();
  browserRefreshInFlight.clear();
}
