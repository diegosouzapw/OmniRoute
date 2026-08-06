/**
 * Adobe Firefly durable session manager.
 *
 * Goal: same as other OmniRoute web-cookie providers (notion-web, perplexity-web):
 * paste Cookie (+ optional IMS JWT) once and use pure HTTP — **no browser window**.
 *
 *  1) Extract / cache IMS user JWT from paste (or short-lived memory/disk cache)
 *  2) Rebuild x-arp-session-id from cookie pieces (ff_session_guid + arkose + forterToken)
 *     or pasted sherlockToken — never launch Chrome by default
 *  3) Sticky working ARP across batch jobs + submit spacing (colligo rate-limit defense)
 *  4) Packaged-safe Chrome/CDP warm on stale risk state, JWT expiry, or 408 recovery.
 *     The durable browser profile holds Adobe SSO; Playwright is not required.
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
  /** Stable provider connection id used to isolate browser SSO/cookie state per Adobe account. */
  browserSessionKey?: string;
  source: "paste" | "ims" | "browser" | "cache" | "rebuild";
}

export interface AdobeFireflySessionResolveOpts {
  credentials?: {
    apiKey?: string;
    accessToken?: string;
    connectionId?: string;
    providerSpecificData?: {
      cookie?: unknown;
      access_token?: unknown;
      accessToken?: unknown;
      browserSessionKey?: unknown;
    } | null;
  } | null;
  /** Force browser / cookie ARP rebuild (e.g. after HTTP 408). */
  forceRefresh?: boolean;
  /** Prefer minting a brand-new ARP (retry path). */
  rotateArp?: boolean;
  fetchImpl?: typeof fetch;
  log?: {
    info?: (...args: unknown[]) => void;
    warn?: (...args: unknown[]) => void;
  };
  /** Disable durable CDP refresh (tests / hosts without Chrome or Edge). */
  allowBrowserRefresh?: boolean;
}

const sessionCache = new Map<string, AdobeFireflySession>();
const browserRefreshInFlight = new Map<string, Promise<AdobeFireflySession | null>>();
/** Last ARP that produced HTTP 2xx on generate-async — prefer until colligo 408. */
const lastWorkingArpByFingerprint = new Map<string, { arp: string; at: number }>();
/** After a failed force-warm, skip re-launching Chrome for this fingerprint for a short window. */
const browserWarmFailureCooldown = new Map<string, number>();
const BROWSER_WARM_FAIL_COOLDOWN_MS = 90_000;
/** Serialize Firefly generate submits + enforce a quiet period (colligo rate-limits look like 408). */
let adobeSubmitChain: Promise<void> = Promise.resolve();
let lastAdobeSubmitAt = 0;

/** Do not thrash rebuilds: a working ARP stays sticky for this long unless 408 clears it. */
const WORKING_ARP_STICKY_MS = 25 * 60_000;
/** Forter token age above this → consider risk session stale (informational / recovery). */
const FORTER_STALE_MS = 4 * 60_000;
/** After this many successful submits in a row, add an extra quiet period (colligo batch throttle). */
const BATCH_SUCCESS_COOLDOWN_EVERY = 3;
const BATCH_SUCCESS_EXTRA_GAP_MS = 15_000;

let consecutiveAdobeSubmitSuccesses = 0;

/** Minimum gap between generate-async submits (ms). Prevents batch thrashing → 408. */
function minSubmitGapMs(): number {
  if (
    process.env.ADOBE_FIREFLY_MIN_SUBMIT_GAP_MS != null &&
    process.env.ADOBE_FIREFLY_MIN_SUBMIT_GAP_MS !== ""
  ) {
    return Math.max(0, Number(process.env.ADOBE_FIREFLY_MIN_SUBMIT_GAP_MS) || 0);
  }
  // Unit tests must not serialize multi-second gaps between cases that share the process-global gate.
  if (process.env.NODE_ENV === "test" || process.env.VITEST || process.env.NODE_TEST_CONTEXT)
    return 0;
  // Live colligo rejects thrash after a few generates even with sticky ARP — 12s default.
  return 12_000;
}

/** Extra gap after every N successful submits (mid-batch death defense). */
function batchExtraGapMs(): number {
  if (process.env.NODE_ENV === "test" || process.env.VITEST || process.env.NODE_TEST_CONTEXT)
    return 0;
  if (
    consecutiveAdobeSubmitSuccesses > 0 &&
    consecutiveAdobeSubmitSuccesses % BATCH_SUCCESS_COOLDOWN_EVERY === 0
  ) {
    return Number(process.env.ADOBE_FIREFLY_BATCH_EXTRA_GAP_MS || BATCH_SUCCESS_EXTRA_GAP_MS);
  }
  return 0;
}
/** Refresh IMS token this many ms before JWT expiry. */
const JWT_REFRESH_SKEW_MS = 10 * 60_000;
/**
 * Proactively browser-warm the risk session when the Forter token is older than this.
 * Colligo 408s a stale Forter/ARP; warming before the first submit avoids the wasted 408.
 * Kept above a single batch's duration so mid-batch requests reuse the sticky working ARP.
 */
const FORTER_PROACTIVE_WARM_MS = 3 * 60_000;

/**
 * Browser Forter-warm is the DEFAULT engine for Adobe Firefly (the only reliable way to
 * keep the Forter/Arkose risk session fresh — pure HTTP goes stale and 408s). It stays on
 * unless explicitly disabled with ADOBE_FIREFLY_BROWSER_REFRESH=0. The legacy opt-in value
 * "1" still enables it; any other value (including unset) now also enables it.
 */
export function adobeFireflyBrowserEnabled(): boolean {
  return process.env.ADOBE_FIREFLY_BROWSER_REFRESH !== "0";
}
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
  return createHash("sha256")
    .update(String(raw || "").trim())
    .digest("hex")
    .slice(0, 32);
}

/** Pull a single cookie value from a Cookie header / paste blob. */
export function getAdobeCookieValue(cookieOrBlob: string, name: string): string {
  const raw = String(cookieOrBlob || "");
  if (!raw || !name) return "";
  const re = new RegExp(
    `(?:^|[;\\s\\n\\r])${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}=([^;\\s\\n\\r]+)`,
    "i"
  );
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

/** Epoch ms embedded in forterToken (`…_{ms}__UDF43…`), or 0 if unknown. */
export function extractAdobeForterTimestampMs(cookieOrBlob: string): number {
  const ftr =
    normalizeAdobeForterToken(getAdobeCookieValue(cookieOrBlob, "forterToken")) ||
    normalizeAdobeForterToken(getAdobeCookieValue(cookieOrBlob, "forter")) ||
    "";
  const m = ftr.match(/_(\d{13})__/);
  return m ? Number(m[1]) : 0;
}

export function getAdobeForterAgeMs(cookieOrBlob: string): number {
  const ts = extractAdobeForterTimestampMs(cookieOrBlob);
  if (!ts) return Number.POSITIVE_INFINITY;
  return Math.max(0, Date.now() - ts);
}

/** Remember an ARP that just got generate-async 2xx — batch jobs must stick to it. */
export function markAdobeFireflyArpSuccess(fingerprint: string, arpSessionId: string): void {
  const fp = String(fingerprint || "").trim();
  const arp = String(arpSessionId || "").trim();
  if (!fp || !arp) return;
  lastWorkingArpByFingerprint.set(fp, { arp, at: Date.now() });
  consecutiveAdobeSubmitSuccesses += 1;
  const cached = sessionCache.get(fp);
  if (cached) {
    cached.arpSessionId = arp;
    cached.updatedAt = Date.now();
    sessionCache.set(fp, cached);
    saveDiskSession(cached);
  } else {
    // Persist sticky ARP even when session map was not primed (fingerprint-only mark).
    try {
      const path = sessionFilePath(fp);
      if (existsSync(path)) {
        const obj = JSON.parse(readFileSync(path, "utf8")) as AdobeFireflySession;
        obj.arpSessionId = arp;
        obj.updatedAt = Date.now();
        writeFileSync(path, JSON.stringify(obj, null, 2), "utf8");
        sessionCache.set(fp, { ...obj, fingerprint: fp });
      }
    } catch {
      /* best-effort */
    }
  }
}

export function clearAdobeFireflyWorkingArp(fingerprint: string): void {
  lastWorkingArpByFingerprint.delete(String(fingerprint || "").trim());
}

export function noteAdobeFireflySubmitFailure(): void {
  consecutiveAdobeSubmitSuccesses = 0;
}

/**
 * Serialize Firefly generate-async calls and enforce a quiet period.
 * Colligo often returns 408 "system under load" when submits are hammered in a batch
 * or after a few successes in a row with the same risk session.
 */
export async function withAdobeFireflySubmitGate<T>(fn: () => Promise<T>): Promise<T> {
  const run = adobeSubmitChain.then(async () => {
    const gap = minSubmitGapMs() + batchExtraGapMs();
    const wait = Math.max(0, lastAdobeSubmitAt + gap - Date.now());
    if (wait > 0) {
      await new Promise((r) => setTimeout(r, wait));
    }
    try {
      return await fn();
    } finally {
      lastAdobeSubmitAt = Date.now();
    }
  });
  // Keep the chain alive even if fn throws
  adobeSubmitChain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
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
    getAdobeCookieValue(blob, "ff_session_guid") || getAdobeCookieValue(blob, "sid") || "";
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
        const j = JSON.parse(
          Buffer.from(rebuilt + "=".repeat((4 - (rebuilt.length % 4)) % 4), "base64").toString(
            "utf8"
          )
        ) as { ftr?: string };
        return String(j.ftr || "");
      } catch {
        return "";
      }
    })();
    const extractedFtr = (() => {
      try {
        const j = JSON.parse(
          Buffer.from(extracted + "=".repeat((4 - (extracted.length % 4)) % 4), "base64").toString(
            "utf8"
          )
        ) as { ftr?: string };
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
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
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

/** Serialize session back into a multi-line credential paste (JWT + Cookie). */
export function serializeAdobeFireflyCredential(
  session: Pick<AdobeFireflySession, "accessToken" | "cookie" | "arpSessionId">
): string {
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
 * Browser warm for Firefly risk session (Forter/Arkose + IMS JWT refresh).
 * Uses the same persistent pure-CDP profile as interactive sign-in, including in pkg builds.
 * Never throws — returns null when unavailable.
 */
/**
 * Best-effort write refreshed JWT+Cookie back to provider_connections so restarts
 * and WinUI sync do not keep serving a guest/stale paste after a successful warm.
 */
async function writeBackAdobeFireflyCredentials(
  session: AdobeFireflySession,
  log?: AdobeFireflySessionResolveOpts["log"]
): Promise<void> {
  const connectionId = String(session.browserSessionKey || "").trim();
  if (!connectionId || connectionId === "legacy-default") return;
  if (!isAdobeUserAccessToken(session.accessToken)) return;
  // Skip when connectionId looks like a credential fingerprint (32 hex) without a real UUID.
  // Real OmniRoute connection ids are UUIDs; still attempt write-back for any non-empty key.
  try {
    const { updateProviderConnection } = await import("@/lib/db/providers");
    const credential = serializeAdobeFireflyCredential(session);
    await updateProviderConnection(connectionId, {
      apiKey: credential,
      providerSpecificData: {
        mode: "browser-profile",
        adobeFireflyMode: "browser-profile",
        cookie: session.cookie || credential,
        access_token: session.accessToken,
        browserSessionKey: connectionId,
        arpSessionId: session.arpSessionId || "",
        refreshedAt: Date.now(),
      },
    });
    log?.info?.(
      "ADOBE-FIREFLY",
      `wrote refreshed JWT+Cookie to connection ${connectionId.slice(0, 8)}…`
    );
  } catch (err) {
    log?.warn?.(
      "ADOBE-FIREFLY",
      `credential write-back skipped: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

export async function refreshAdobeSessionViaBrowser(
  session: AdobeFireflySession,
  log?: AdobeFireflySessionResolveOpts["log"],
  opts?: { force?: boolean; proveWithPing?: boolean }
): Promise<AdobeFireflySession | null> {
  const force = opts?.force === true;
  // Browser warm is the default engine now — only the explicit kill switch disables it.
  if (!adobeFireflyBrowserEnabled()) return null;

  const coolKey = String(session.browserSessionKey || session.fingerprint || "").trim();
  const coolUntil = coolKey ? browserWarmFailureCooldown.get(coolKey) || 0 : 0;
  if (force && coolUntil > Date.now()) {
    log?.warn?.(
      "ADOBE-FIREFLY",
      `skip CDP warm (cooldown ${Math.ceil((coolUntil - Date.now()) / 1000)}s after recent failure)`
    );
    return null;
  }

  try {
    const baseFtr = extractAdobeForterTimestampMs(session.cookie || "");
    const { refreshAdobeFireflyViaCdp } = await import("./adobeFireflyBrowserLogin.ts");
    const warmed = await refreshAdobeFireflyViaCdp({
      cookie: session.cookie,
      accessToken: session.accessToken,
      log,
      timeoutMs: force ? 90_000 : 75_000,
      sessionKey: session.browserSessionKey || session.fingerprint,
    });
    if (!warmed) {
      if (force && coolKey) {
        browserWarmFailureCooldown.set(coolKey, Date.now() + BROWSER_WARM_FAIL_COOLDOWN_MS);
      }
      return null;
    }
    if (coolKey) browserWarmFailureCooldown.delete(coolKey);

    // Prefer warm cookie as authority for risk pieces (do not re-merge stale forter over new).
    // On force warm, prefer the warmed cookie as authority (do not re-merge hours-old forter
    // from the previous session blob over a freshly minted jar).
    const nextCookie = force
      ? warmed.cookie || session.cookie
      : warmed.cookie
        ? mergeAdobeCookieHeaders(session.cookie || "", warmed.cookie)
        : session.cookie;
    const warmFtr = extractAdobeForterTimestampMs(nextCookie);
    const warmAge = warmFtr > 0 ? Math.max(0, Date.now() - warmFtr) : Number.POSITIVE_INFINITY;
    // Force path: require a parseable forter younger than FORTER_STALE (or strictly newer than base).
    if (force) {
      const advanced =
        warmFtr > 0 && (baseFtr <= 0 || warmFtr > baseFtr || warmAge < FORTER_STALE_MS);
      if (!advanced) {
        log?.warn?.(
          "ADOBE-FIREFLY",
          `CDP warm rejected: forter not advanced (base=${baseFtr}, warm=${warmFtr || 0}, ageMs=${Number.isFinite(warmAge) ? warmAge : "inf"})`
        );
        return null;
      }
    }

    const nextArp =
      warmed.arpSessionId ||
      buildAdobeArpSessionIdFromCookies(nextCookie) ||
      extractAdobeArpSessionId(nextCookie);
    if (!nextArp) return null;

    const nextToken =
      (warmed.accessToken && isAdobeUserAccessToken(warmed.accessToken)
        ? warmed.accessToken
        : "") || session.accessToken;
    if (!isAdobeUserAccessToken(nextToken)) return null;

    const next: AdobeFireflySession = {
      ...session,
      accessToken: nextToken,
      cookie: nextCookie,
      arpSessionId: nextArp,
      tokenExpiresAt: estimateAdobeTokenExpiry(nextToken),
      updatedAt: Date.now(),
      browserSessionKey: session.browserSessionKey || session.fingerprint,
      source: "browser",
    };
    sessionCache.set(session.fingerprint, next);
    saveDiskSession(next);
    clearAdobeFireflyWorkingArp(session.fingerprint);
    void writeBackAdobeFireflyCredentials(next, log);
    log?.info?.(
      "ADOBE-FIREFLY",
      `durable CDP warm refreshed session (arpLen=${next.arpSessionId.length}, force=${force}, forterTs=${warmFtr || 0}, forterDeltaMs=${warmFtr && baseFtr ? warmFtr - baseFtr : 0})`
    );
    return next;
  } catch (err) {
    if (force && coolKey) {
      browserWarmFailureCooldown.set(coolKey, Date.now() + BROWSER_WARM_FAIL_COOLDOWN_MS);
    }
    log?.warn?.(
      "ADOBE-FIREFLY",
      `browser CDP session refresh failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return null;
  }
}

/**
 * Resolve a durable Firefly session from stored credentials.
 * Caches in memory + DATA_DIR; rebuilds ARP from cookies; optionally warms via durable CDP.
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
  // Prefer stable connection-scoped fingerprint so JWT/cookie refresh does not orphan
  // the session cache / sticky ARP map (paste hash changes every warm write-back).
  const connectionId = String(
    opts.credentials?.connectionId ||
      opts.credentials?.providerSpecificData?.browserSessionKey ||
      ""
  ).trim();
  const fingerprint = connectionId
    ? fingerprintAdobeCredential(`conn:${connectionId}`)
    : fingerprintAdobeCredential(joined);
  const browserSessionKey = connectionId || fingerprint;

  // forceRefresh / rotate always drop in-memory cache for this fingerprint
  if (opts.forceRefresh) sessionCache.delete(fingerprint);

  // Also try legacy paste-hash session files (pre-connection-scoped fingerprints).
  const legacyFingerprint = fingerprintAdobeCredential(joined);
  const cached =
    sessionCache.get(fingerprint) ||
    loadDiskSession(fingerprint) ||
    (legacyFingerprint !== fingerprint ? loadDiskSession(legacyFingerprint) : null);
  if (cached && !opts.forceRefresh) {
    // Re-key legacy disk session under the stable connection fingerprint.
    const normalized = {
      ...cached,
      fingerprint,
      browserSessionKey: cached.browserSessionKey || browserSessionKey,
    };
    sessionCache.set(fingerprint, normalized);
  }

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
  // A browser-refreshed disk token must survive process restarts. Prefer it when the pasted
  // token is absent or near expiry; the fingerprint still binds it to these credentials.
  const pastedExpiresAt = accessToken ? estimateAdobeTokenExpiry(accessToken) : 0;
  const cachedExpiresAt = cached?.accessToken
    ? cached.tokenExpiresAt > 0
      ? cached.tokenExpiresAt
      : estimateAdobeTokenExpiry(cached.accessToken)
    : 0;
  if (
    cached?.accessToken &&
    isAdobeUserAccessToken(cached.accessToken) &&
    cachedExpiresAt - Date.now() >= JWT_REFRESH_SKEW_MS &&
    (!accessToken || pastedExpiresAt - Date.now() < JWT_REFRESH_SKEW_MS)
  ) {
    accessToken = cached.accessToken;
    pasteHadUserJwt = false;
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

  const cookieBlob = cookie || extractAdobeCookieHeader(joined) || "";

  if (!accessToken) {
    // Try the pure-HTTP resolve (paste JWT / IMS exchange). When the browser engine is on,
    // a missing/guest token is NOT fatal here — the off-screen Chrome warm below reads the
    // live user JWT from a signed-in profile (the "one-time browser sign-in" path). Only
    // surface the guest/missing error when the browser engine is disabled.
    try {
      accessToken = await resolveAdobeAccessToken(opts.credentials, fetchImpl);
    } catch (err) {
      if (!adobeFireflyBrowserEnabled()) throw err;
      opts.log?.info?.(
        "ADOBE-FIREFLY",
        "no user JWT from paste/cookie — will read it from the signed-in Chrome profile"
      );
    }
  }

  const cookieForSession = cookie || cookieBlob;
  const forterTs = extractAdobeForterTimestampMs(cookieForSession);
  const working = lastWorkingArpByFingerprint.get(fingerprint);
  const workingFresh =
    working && Date.now() - working.at < WORKING_ARP_STICKY_MS ? working.arp : "";

  // Prefer last ARP that actually got generate-async 2xx (batch stability).
  // Rebuild from cookie pieces / sherlockToken — pure HTTP, no browser.
  let arpSessionId = "";
  if (!opts.forceRefresh && !opts.rotateArp && workingFresh) {
    arpSessionId = workingFresh;
  } else if (!opts.forceRefresh && !opts.rotateArp && cached?.arpSessionId) {
    arpSessionId = cached.arpSessionId;
  } else {
    arpSessionId = resolveAdobeArpSessionIdSmart(cookieForSession || joined, {
      rotate: Boolean(opts.rotateArp),
    });
  }

  let session: AdobeFireflySession = {
    accessToken,
    cookie: cookieForSession,
    arpSessionId: String(arpSessionId || ""),
    tokenExpiresAt: estimateAdobeTokenExpiry(accessToken || cached?.accessToken || ""),
    updatedAt: Date.now(),
    fingerprint,
    browserSessionKey,
    source: workingFresh ? "cache" : cached?.source || "paste",
  };
  // Prefer connection-scoped browser profile always (never empty → legacy-default).
  if (!session.browserSessionKey) session.browserSessionKey = browserSessionKey;

  // Off-screen Chrome Forter-warm is now the DEFAULT engine (kill switch:
  // ADOBE_FIREFLY_BROWSER_REFRESH=0). Warm proactively when we lack a usable session so the
  // first submit doesn't eat a colligo 408, and so a signed-in profile can supply the user
  // JWT with no JWT/cookie paste ("one-time browser sign-in" model):
  //   - explicit forceRefresh / rotateArp, or
  //   - no AdobeID user JWT yet (profile may hold one — cookie/JWT-free path), or
  //   - stale Forter risk session and no recently-accepted (sticky 2xx) ARP to reuse.
  const jwtIsUser = isAdobeUserAccessToken(session.accessToken);
  const jwtNeedsBrowserRefresh =
    !jwtIsUser || session.tokenExpiresAt - Date.now() < JWT_REFRESH_SKEW_MS;
  const forterAgeMs = getAdobeForterAgeMs(session.cookie);
  const riskStale = !workingFresh && forterAgeMs > FORTER_PROACTIVE_WARM_MS;
  const shouldWarm =
    adobeFireflyBrowserEnabled() &&
    opts.allowBrowserRefresh !== false &&
    (opts.forceRefresh || opts.rotateArp || jwtNeedsBrowserRefresh || riskStale);
  // A persistent signed-in browser profile can refresh even when the stored cookie is empty.
  const canWarm = true;
  if (shouldWarm && canWarm) {
    const key = fingerprint;
    let inflight = browserRefreshInFlight.get(key);
    if (!inflight) {
      inflight = refreshAdobeSessionViaBrowser(session, opts.log, {
        force: true,
        proveWithPing: Boolean(opts.forceRefresh),
      }).finally(() => {
        browserRefreshInFlight.delete(key);
      });
      browserRefreshInFlight.set(key, inflight);
    }
    const warmed = await inflight;
    if (warmed) {
      session = { ...warmed, fingerprint };
      opts.log?.info?.(
        "ADOBE-FIREFLY",
        `durable CDP session warm applied (reason=${opts.forceRefresh ? "force" : opts.rotateArp ? "rotate" : jwtNeedsBrowserRefresh ? "jwt-expiry" : "stale-forter"})`
      );
    }
  }

  // Final ARP if still empty
  if (!session.arpSessionId) {
    session.arpSessionId = resolveAdobeArpSessionIdSmart(session.cookie || joined);
  }
  // Re-apply sticky working ARP if warm did not produce a newer forter-based ARP
  if (workingFresh && !opts.forceRefresh && !opts.rotateArp) {
    const warmForterTs = extractAdobeForterTimestampMs(session.cookie);
    if (!(warmForterTs > forterTs)) {
      session.arpSessionId = workingFresh;
      session.source = "cache";
    }
  }

  // No usable AdobeID user JWT after the warm → marker-only credentials or cold profile.
  if (!isAdobeUserAccessToken(session.accessToken)) {
    throw new AdobeFireflyError(
      "Adobe Firefly is not signed in. On Providers → Adobe Firefly → Add Account (OAuth) choose " +
        '"Sign in with browser" (fresh login window) or "Paste JWT / Cookie". After browser sign-in ' +
        "the app stores JWT+Cookie and keeps the risk session fresh automatically.",
      401,
      "not_signed_in"
    );
  }
  if (session.tokenExpiresAt <= Date.now() + 30_000) {
    throw new AdobeFireflyError(
      "Adobe Firefly browser session expired and could not renew automatically. Re-open the " +
        "Adobe Firefly account and sign in once so the durable browser profile can renew future JWTs.",
      401,
      "session_expired"
    );
  }

  // Dead Forter risk session: colligo returns 408 for ~minutes/hours of retries. Fail closed
  // with a re-login instruction instead of burning ~600s of generate-async attempts.
  // Only when forter timestamp is parseable and old — missing timestamp is not treated as stale
  // (JWT-only / synthetic ARP / unit fixtures).
  const finalForterTs = extractAdobeForterTimestampMs(session.cookie);
  const finalForterAge = getAdobeForterAgeMs(session.cookie);
  const hasStickyWorking =
    Boolean(workingFresh) &&
    Date.now() - (lastWorkingArpByFingerprint.get(fingerprint)?.at || 0) < WORKING_ARP_STICKY_MS;
  if (
    finalForterTs > 0 &&
    Number.isFinite(finalForterAge) &&
    finalForterAge > FORTER_STALE_MS &&
    !hasStickyWorking &&
    opts.allowBrowserRefresh !== false
  ) {
    throw new AdobeFireflyError(
      "Adobe Firefly risk session expired (Forter/Arkose). Open Providers → Adobe Firefly → " +
        "Add Account (OAuth) → Sign in with browser once. After sign-in the app stores a fresh " +
        "JWT+Cookie and refreshes them automatically for later generates.",
      401,
      "risk_session_stale"
    );
  }

  session.fingerprint = fingerprint;
  session.browserSessionKey = session.browserSessionKey || browserSessionKey;
  sessionCache.set(fingerprint, session);
  saveDiskSession(session);
  // Keep SQLite in sync when we have a real connection + user JWT (best-effort).
  if (session.source === "browser" || session.source === "rebuild") {
    void writeBackAdobeFireflyCredentials(session, opts.log);
  }
  return session;
}

/**
 * After a colligo 408: clear sticky ARP, try browser warm for a NEW forter, fall back carefully.
 * Rebuilding from the same forter cookie is a no-op and must not burn all retries.
 *
 * Policy:
 *  - Fresh forter + attempt 1–2 → quiet reuse (rate-limit masquerading as 408).
 *  - Stale forter (age > FORTER_STALE_MS) OR attempt ≥ 3 → off-screen Chrome warm immediately.
 */
export async function rotateAdobeFireflySessionOnError(
  session: AdobeFireflySession,
  opts?: {
    tryBrowser?: boolean;
    log?: AdobeFireflySessionResolveOpts["log"];
    /** Attempt index (1-based) for backoff policy. */
    attempt?: number;
    /** 401/403: bypass quiet ARP reuse and refresh JWT + cookies immediately. */
    authFailure?: boolean;
  }
): Promise<AdobeFireflySession> {
  if (session.tokenExpiresAt <= 0) {
    session = {
      ...session,
      tokenExpiresAt: estimateAdobeTokenExpiry(session.accessToken),
    };
  }
  const prevArp = session.arpSessionId;
  const attempt = opts?.attempt ?? 1;
  const forterTs = extractAdobeForterTimestampMs(session.cookie);
  const forterAgeMs = forterTs > 0 ? Math.max(0, Date.now() - forterTs) : null;
  // Only treat as "known stale" when the cookie embeds a forter timestamp we can age.
  // Unknown age (synthetic ARP / tests) keeps the quiet 1–2 reuse path.
  const forterKnownStale = forterAgeMs != null && forterAgeMs > FORTER_STALE_MS;

  // Attempt 1–2 when forter is not known-stale: keep same ARP (colligo short load / rate limit).
  // Hours-old forter → skip quiet reuse and warm Chrome immediately (else all 5 attempts 408).
  if (attempt <= 2 && !forterKnownStale && !opts?.authFailure) {
    const same: AdobeFireflySession = {
      ...session,
      updatedAt: Date.now(),
      source: "cache",
    };
    sessionCache.set(session.fingerprint, same);
    saveDiskSession(same);
    opts?.log?.info?.(
      "ADOBE-FIREFLY",
      `408 recovery: reusing ARP (quiet period, attempt ${attempt}, forterAgeMs=${forterAgeMs ?? "unknown"})`
    );
    return same;
  }

  // Known-stale forter or attempt 3+: cookie rebuild is a no-op. CDP warm mints a fresh
  // Forter/ARP via offscreen headed Chrome by default (colligo rejects true headless).
  // ADOBE_FIREFLY_CHROME_HEADLESS=1 is debug-only and usually keeps returning 408.
  clearAdobeFireflyWorkingArp(session.fingerprint);
  noteAdobeFireflySubmitFailure();

  const tryBrowser =
    opts?.tryBrowser !== false && process.env.ADOBE_FIREFLY_BROWSER_REFRESH !== "0";
  if (tryBrowser) {
    opts?.log?.info?.(
      "ADOBE-FIREFLY",
      `${opts?.authFailure ? "auth" : "408"} recovery: durable CDP warm (attempt=${attempt}, forterKnownStale=${forterKnownStale}, forterAgeMs=${forterAgeMs ?? "unknown"})`
    );
    const warmed = await refreshAdobeSessionViaBrowser(session, opts?.log, {
      force: true,
      proveWithPing: true,
    });
    if (warmed?.arpSessionId) {
      const next = { ...warmed, fingerprint: session.fingerprint };
      sessionCache.set(session.fingerprint, next);
      saveDiskSession(next);
      opts?.log?.info?.(
        "ADOBE-FIREFLY",
        `${opts?.authFailure ? "auth" : "408"} recovery: CDP warm done (arp changed=${warmed.arpSessionId !== prevArp}, forterTs=${extractAdobeForterTimestampMs(warmed.cookie)})`
      );
      return next;
    }
  }

  const rebuilt = resolveAdobeArpSessionIdSmart(session.cookie, {
    rotate: true,
  });
  const next: AdobeFireflySession = {
    ...session,
    arpSessionId: rebuilt && rebuilt !== prevArp ? rebuilt : session.arpSessionId,
    updatedAt: Date.now(),
    source: "rebuild",
  };
  sessionCache.set(session.fingerprint, next);
  saveDiskSession(next);
  return next;
}

/** Test helper — clear in-memory session cache. */
export function __resetAdobeFireflySessionCacheForTests(): void {
  sessionCache.clear();
  browserRefreshInFlight.clear();
  lastWorkingArpByFingerprint.clear();
  browserWarmFailureCooldown.clear();
  lastAdobeSubmitAt = 0;
  consecutiveAdobeSubmitSuccesses = 0;
  adobeSubmitChain = Promise.resolve();
}
