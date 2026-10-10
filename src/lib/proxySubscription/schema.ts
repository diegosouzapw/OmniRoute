/**
 * Zod schemas for the proxy-subscriptions management routes (T06).
 *
 * These are `z.unknown().transform()` pipelines rather than plain `z.object()`
 * shapes because the routes' original hand-rolled parsers are coercive (a bad
 * `mode` silently falls back to "global", a bad `updateIntervalMinutes` falls
 * back to 60, `enabled` defaults to false unless exactly `true`, ...). The
 * transforms below reproduce that exact coercion + short-circuit error
 * precedence (first failing field wins, matching the original early-return
 * order) so swapping the routes over to `.safeParse()` does not change any
 * client-observable status code, error message, or accepted/rejected shape.
 */
import { z } from "zod";
import type { ProxySubscriptionPayload } from "./subscriptionService";
import { isCoreConfigPathAllowed } from "./coreConfig/pathGuard";
import { isSelectorControlUrlAllowed } from "./selectorGuard";
import { clampSelectorGapSeconds } from "./selectorTrigger";

function readRuleProviders(b: Record<string, unknown>): string[] | null {
  if (!Array.isArray(b.ruleProviders)) return null;
  return b.ruleProviders.filter((x): x is string => typeof x === "string");
}

function readControlUrl(b: Record<string, unknown>): string | null | undefined {
  if (b.controlUrl === undefined) return undefined;
  if (typeof b.controlUrl !== "string" || !b.controlUrl.trim()) return null;
  return b.controlUrl.trim();
}

function checkControlUrl(
  controlUrl: string | null | undefined,
  ctx: z.RefinementCtx
): string | null | undefined {
  if (controlUrl === undefined || controlUrl === null) return controlUrl;
  const verdict = isSelectorControlUrlAllowed(controlUrl);
  if (!verdict.allowed) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `controlUrl is not allowed (${verdict.reason})`,
    });
    return z.NEVER;
  }
  return controlUrl;
}

/**
 * The core binary is executed with `execFile`, so it is never taken from a request body: it comes
 * from the host environment only (OMNIROUTE_PROXY_CORE_BINARY_PATH, Hard Rule #15). A body that
 * carries the field is refused instead of silently dropped.
 */
function refuseCoreBinaryPath(b: Record<string, unknown>, ctx: z.RefinementCtx): boolean {
  if (b.coreBinaryPath === undefined) return false;
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message:
      "coreBinaryPath cannot be set through the API; set OMNIROUTE_PROXY_CORE_BINARY_PATH on the host",
  });
  return true;
}

function readControlSecret(b: Record<string, unknown>): string | null | undefined {
  if (b.controlSecret === undefined) return undefined;
  if (typeof b.controlSecret !== "string" || b.controlSecret.length === 0) return null;
  return b.controlSecret;
}

function readGap(b: Record<string, unknown>): number {
  if (b.selectorMinGapSeconds === undefined) return 60;
  return clampSelectorGapSeconds(b.selectorMinGapSeconds);
}

function readCoreConfigPath(b: Record<string, unknown>): string | null | undefined {
  if (b.coreConfigPath === undefined) return undefined;
  if (typeof b.coreConfigPath !== "string" || !b.coreConfigPath.trim()) return null;
  return b.coreConfigPath.trim();
}

function checkCoreConfigPath(
  coreConfigPath: string | null | undefined,
  ctx: z.RefinementCtx
): string | null | undefined {
  if (coreConfigPath === undefined || coreConfigPath === null) return coreConfigPath;
  const verdict = isCoreConfigPathAllowed(coreConfigPath);
  if (!verdict.allowed) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `coreConfigPath is not allowed (${verdict.reason})`,
    });
    return z.NEVER;
  }
  return coreConfigPath;
}

function requireNameUrl(
  b: Record<string, unknown>,
  ctx: z.RefinementCtx
): { name: string; url: string } | null {
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const url = typeof b.url === "string" ? b.url.trim() : "";
  if (!name) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "name is required" });
    return null;
  }
  // A feedless subscription carries no URL: accepted only with a control URL.
  if (!url && readControlUrl(b) == null) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "url is required" });
    return null;
  }
  return { name, url };
}

function requireRuleProviders(
  b: Record<string, unknown>,
  mode: string,
  ctx: z.RefinementCtx
): string[] | null | null {
  const ruleProviders = readRuleProviders(b);
  if (mode === "rule" && (!ruleProviders || ruleProviders.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "ruleProviders is required when mode is 'rule'",
    });
    return null;
  }
  return ruleProviders;
}

/** Read + validate the optional core config path; a body carrying a binary path is refused. */
function checkCorePaths(
  b: Record<string, unknown>,
  ctx: z.RefinementCtx
): { coreConfigPath: string | null } | null {
  if (refuseCoreBinaryPath(b, ctx)) return null;
  const coreConfigPath = checkCoreConfigPath(readCoreConfigPath(b), ctx);
  if (coreConfigPath === z.NEVER) return null;
  return { coreConfigPath: coreConfigPath ?? null };
}

/** POST /api/v1/management/proxy-subscriptions body — mirrors the removed `parsePayload()`. */
export const proxySubscriptionCreateSchema = z
  .unknown()
  .transform((body, ctx): ProxySubscriptionPayload => {
    if (!body || typeof body !== "object") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid JSON body" });
      return z.NEVER;
    }
    const b = body as Record<string, unknown>;
    const named = requireNameUrl(b, ctx);
    if (!named) return z.NEVER;
    const mode = b.mode === "rule" ? "rule" : "global";
    const ruleProviders = requireRuleProviders(b, mode, ctx);
    if (mode === "rule" && !ruleProviders) return z.NEVER;

    const localCoreEndpoint =
      typeof b.localCoreEndpoint === "string" && b.localCoreEndpoint.trim()
        ? b.localCoreEndpoint.trim()
        : null;
    const updateIntervalMinutes = Number(b.updateIntervalMinutes) || 60;
    const enabled = b.enabled === true;

    const controlUrl = checkControlUrl(readControlUrl(b), ctx);
    if (controlUrl === z.NEVER) return z.NEVER;
    const corePaths = checkCorePaths(b, ctx);
    if (!corePaths) return z.NEVER;
    const controlSecret = readControlSecret(b);
    const selectorMinGapSeconds = readGap(b);

    return {
      name: named.name,
      url: named.url,
      mode,
      ruleProviders,
      localCoreEndpoint,
      updateIntervalMinutes,
      enabled,
      controlUrl: controlUrl ?? null,
      coreConfigPath: corePaths.coreConfigPath,
      controlSecret: controlSecret ?? null,
      selectorMinGapSeconds,
    };
  });

function applyScalarFields(
  b: Record<string, unknown>,
  payload: Partial<ProxySubscriptionPayload>
): void {
  if (typeof b.name === "string") payload.name = b.name.trim();
  if (typeof b.url === "string") payload.url = b.url.trim();
  if (typeof b.mode === "string") payload.mode = b.mode === "rule" ? "rule" : "global";
  if (typeof b.enabled === "boolean") payload.enabled = b.enabled;
  if (typeof b.localCoreEndpoint === "string") {
    payload.localCoreEndpoint = b.localCoreEndpoint.trim() || null;
  }
  if (typeof b.updateIntervalMinutes === "number") {
    payload.updateIntervalMinutes = b.updateIntervalMinutes;
  }
  const ruleProviders = readRuleProviders(b);
  if (ruleProviders !== null) payload.ruleProviders = ruleProviders;
  if (b.controlSecret !== undefined) {
    payload.controlSecret = readControlSecret(b) ?? null;
  }
  if (b.selectorMinGapSeconds !== undefined) {
    payload.selectorMinGapSeconds = readGap(b);
  }
}

/** PATCH /api/v1/management/proxy-subscriptions/:id body — mirrors the route's inline parser. */
export const proxySubscriptionUpdateSchema = z
  .unknown()
  .transform((body, ctx): Partial<ProxySubscriptionPayload> => {
    if (!body || typeof body !== "object") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid JSON body" });
      return z.NEVER;
    }
    const b = body as Record<string, unknown>;
    const payload: Partial<ProxySubscriptionPayload> = {};
    applyScalarFields(b, payload);
    if (b.controlUrl !== undefined) {
      const controlUrl = checkControlUrl(readControlUrl(b), ctx);
      if (controlUrl === z.NEVER) return z.NEVER;
      payload.controlUrl = controlUrl ?? null;
    }
    if (b.coreConfigPath !== undefined) {
      const coreConfigPath = checkCoreConfigPath(readCoreConfigPath(b), ctx);
      if (coreConfigPath === z.NEVER) return z.NEVER;
      payload.coreConfigPath = coreConfigPath ?? null;
    }
    if (refuseCoreBinaryPath(b, ctx)) return z.NEVER;

    return payload;
  });

/** PATCH rule, same as creation: an emptied URL needs a resulting control URL. */
export function checkFeedlessUpdate(
  payload: Partial<ProxySubscriptionPayload>,
  existing: { url: string; controlUrl: string | null }
): string | null {
  const url = payload.url !== undefined ? payload.url.trim() : existing.url.trim();
  if (url !== "") return null;
  const controlUrl = payload.controlUrl !== undefined ? payload.controlUrl : existing.controlUrl;
  return controlUrl ? null : "url is required";
}

/** Creation guard: a feedless row needs a control URL. Throws before any insert. */
export function throwIfFeedlessWithoutControl(url: string, controlUrl: string | null): void {
  if (url.trim() === "" && !controlUrl) {
    throw Object.assign(new Error("url is required"), { status: 400 });
  }
}

/** Update guard: same rule as creation, read against the resulting row. Throws. */
export function throwIfFeedlessUpdate(
  payload: Partial<ProxySubscriptionPayload>,
  existing: { url: string; controlUrl: string | null }
): void {
  const message = checkFeedlessUpdate(payload, existing);
  if (message) {
    throw Object.assign(new Error(message), { status: 400, type: "invalid_request" });
  }
}

/** Read the first Zod issue message, matching the routes' single-string `{ error }` envelope. */
export function firstIssueMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid request";
}
