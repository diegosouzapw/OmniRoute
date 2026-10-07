/**
 * Adobe Firefly — upstream response parsing and job-status helpers.
 *
 * Split out of adobeFireflyClient.ts.
 */

import { browserHeaders } from "./adobeFireflyArp.ts";
import { DEFAULT_USER_AGENT, FIREFLY_REFERER } from "./adobeFireflyCatalog.ts";
import {
  adobeFireflyApiKey,
  adobeFireflyBalanceApiKey,
  extractAdobeAccountIdFromToken,
} from "./adobeFireflyCredentials.ts";

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
