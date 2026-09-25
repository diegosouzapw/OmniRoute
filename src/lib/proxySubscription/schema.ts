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

function readControlSecret(b: Record<string, unknown>): string | null | undefined {
  if (b.controlSecret === undefined) return undefined;
  if (typeof b.controlSecret !== "string" || b.controlSecret.length === 0) return null;
  return b.controlSecret;
}

function readGap(b: Record<string, unknown>): number {
  if (b.selectorMinGapSeconds === undefined) return 60;
  return clampSelectorGapSeconds(b.selectorMinGapSeconds);
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
  if (!url) {
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

    return payload;
  });

/** Read the first Zod issue message, matching the routes' single-string `{ error }` envelope. */
export function firstIssueMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid request";
}
