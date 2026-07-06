/**
 * bifrostShadowWrap — WP-B4 helper.
 *
 * Wraps a Bifrost-routed executor so every Bifrost-routed request
 * also fires a `legacyExecute` call in parallel and the result is
 * compared via `computeAgreementScore`. The LIVE response returned
 * to the caller is the BIFROST result. The legacy result is only
 * used for divergence measurement.
 *
 * This is the INVERSE of the existing `runWithShadowSampler` in
 * `bifrostShadow.ts`, which treats the chatCore executor (named
 * `legacyExecute` for historical reasons) as the live path and
 * Bifrost as the shadow. The B6 phase used that shape. The B7
 * phase (5% → 100%) flips the live path to Bifrost.
 *
 * B7 traffic swap (WP-B7): the `BIFROST_TRAFFIC_PCT` env var (0-100)
 * controls what percentage of Bifrost-routed requests actually use
 * Bifrost as the live path. The remainder fall through to the
 * legacy executor (Bifrost is the shadow). Decision is made on a
 * deterministic hash of the request id so it is stable across
 * retries; default is 100 (full Bifrost).
 *
 * @module open-sse/executors/bifrostShadowWrap
 */

import { computeAgreementScore } from "./bifrostShadow.ts";
import { BIFROST_TAG } from "./bifrost.ts";

/**
 * Read the B7 traffic swap percentage from the environment.
 * Defaults to 100 (full Bifrost). Returns a number in [0, 100].
 *
 * `BIFROST_TRAFFIC_PCT=0`   → 0% Bifrost (legacy always, Bifrost shadow only)
 * `BIFROST_TRAFFIC_PCT=5`   → 5% canary
 * `BIFROST_TRAFFIC_PCT=50`  → 50/50 split
 * `BIFROST_TRAFFIC_PCT=100` → 100% Bifrost (default)
 */
function readBifrostTrafficPct(): number {
  const raw = process.env.BIFROST_TRAFFIC_PCT;
  if (raw === undefined || raw === "") return 100;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return 100;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return n;
}

/**
 * Deterministic 0-99 bucket for a request id. Stable across retries
 * so a retried request keeps the same routing decision.
 */
function bucketForRequest(requestId: string | null | undefined): number {
  const id = (requestId ?? "").trim() || "default";
  // FNV-1a 32-bit hash, modulo 100.
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return Math.abs(h) % 100;
}

type ShadowWrapLogger = {
  info?: (tag: string, msg: string) => void;
  warn?: (tag: string, msg: string) => void;
  error?: (tag: string, msg: string) => void;
};

export interface WrapBifrostExecutorWithShadowOptions {
  provider: string;
  log?: ShadowWrapLogger;
  /**
   * Legacy executor used as the shadow. Fires in parallel with the
   * live Bifrost call. Required.
   */
  legacyExecute: (input: unknown) => Promise<unknown>;
  /**
   * Optional divergence event recorder. Defaults to no-op.
   */
  recordEvent?: (input: {
    provider: string;
    agreementScore: number;
    tsUnixMs: number;
  }) => void;
  /**
   * Optional disable flag. When true the wrapper forwards to the
   * Bifrost executor without firing a shadow. Defaults to false.
   */
  disableShadow?: boolean;
}

export interface BifrostShadowWrapped<T> {
  wrapped: T;
  /**
   * Stop firing shadow calls. Subsequent `.execute(input)` calls
   * only invoke the Bifrost executor.
   */
  disable(): void;
}

/**
 * Wrap a Bifrost executor with legacy-shadow sampling. The returned
 * `wrapped` object exposes the same `.execute(input)` shape as the
 * underlying Bifrost executor. The BifrostShadowWrapped envelope
 * also exposes `disable()` for the kill switch.
 */
export function wrapBifrostExecutorWithShadow<
  T extends { execute: (input: unknown) => Promise<unknown> }
>(bifrost: T, opts: WrapBifrostExecutorWithShadowOptions): BifrostShadowWrapped<T> {
  const trafficPct = readBifrostTrafficPct();
  let shadowEnabled = !opts.disableShadow;
  const wrapped: T = Object.create(bifrost);
  wrapped.execute = async (input: unknown): Promise<unknown> => {
    if (!shadowEnabled) {
      opts.log?.info?.(BIFROST_TAG, `${opts.provider} → bifrost (shadow disabled)`);
      return bifrost.execute(input);
    }
    // B7 traffic swap: roll the dice on the request id to decide
    // whether Bifrost is the LIVE path or the SHADOW for this call.
    const reqId = readRequestId(input);
    const bucket = bucketForRequest(reqId);
    const inBifrostLive = bucket < trafficPct;
    if (!inBifrostLive) {
      opts.log?.info?.(
        BIFROST_TAG,
        `${opts.provider} → legacy (live, B7 pct=${trafficPct}%) + bifrost (shadow)`,
      );
      const liveP = opts.legacyExecute(input);
      const shadowP = bifrost.execute(input);
      void Promise.allSettled([liveP, shadowP]).then(([live, shadow]) => {
        if (live.status !== "fulfilled" || shadow.status !== "fulfilled") return;
        const liveText = extractText(live.value);
        const shadowText = extractText(shadow.value);
        if (liveText === null || shadowText === null) return;
        const score = computeAgreementScore(liveText, shadowText);
        opts.recordEvent?.({
          provider: opts.provider,
          agreementScore: score,
          tsUnixMs: Date.now(),
        });
      });
      return liveP;
    }
    opts.log?.info?.(
      BIFROST_TAG,
      `${opts.provider} → bifrost (live, B7 pct=${trafficPct}%) + legacy (shadow), agree=pending`,
    );
    // Fire both in parallel. Bifrost is the live path; the legacy
    // result is captured for divergence measurement only.
    const livePromise = bifrost.execute(input);
    const shadowPromise = opts.legacyExecute(input);
    void Promise.allSettled([livePromise, shadowPromise]).then(([live, shadow]) => {
      if (live.status !== "fulfilled" || shadow.status !== "fulfilled") return;
      const liveText = extractText(live.value);
      const shadowText = extractText(shadow.value);
      if (liveText === null || shadowText === null) return;
      const score = computeAgreementScore(liveText, shadowText);
      opts.recordEvent?.({
        provider: opts.provider,
        agreementScore: score,
        tsUnixMs: Date.now(),
      });
      if (score < 0.8) {
        opts.log?.warn?.(
          BIFROST_TAG,
          `${opts.provider} bifrost/legacy divergence score=${score.toFixed(3)}`,
        );
      }
    });
    return livePromise;
  };
  return {
    wrapped,
    disable(): void {
      shadowEnabled = false;
    },
  };
}

/** Best-effort text extraction from an executor output. */
function extractText(out: unknown): string | null {
  if (!out || typeof out !== "object") return null;
  const o = out as { response?: { body?: unknown } };
  const body = o.response?.body;
  if (typeof body === "string") return body;
  if (body && typeof body === "object") {
    const b = body as { text?: unknown; content?: unknown };
    if (typeof b.text === "string") return b.text;
    if (Array.isArray(b.content)) {
      return b.content
        .map((c: unknown) => {
          if (c && typeof c === "object" && "text" in c) {
            const t = (c as { text?: unknown }).text;
            return typeof t === "string" ? t : "";
          }
          return "";
        })
        .join("");
    }
  }
  return null;
}

/** Best-effort extraction of a request id from a chatCore input shape. */
function readRequestId(input: unknown): string | null {
  if (!input || typeof input !== "object") return null;
  const o = input as { requestId?: unknown; body?: { requestId?: unknown } };
  if (typeof o.requestId === "string") return o.requestId;
  if (o.body && typeof o.body === "object" && typeof (o.body as { requestId?: unknown }).requestId === "string") {
    return (o.body as { requestId: string }).requestId;
  }
  return null;
}
