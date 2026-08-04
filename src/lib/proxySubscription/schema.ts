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

function readRuleProviders(b: Record<string, unknown>): string[] | null {
  if (!Array.isArray(b.ruleProviders)) return null;
  return b.ruleProviders.filter((x): x is string => typeof x === "string");
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
    const name = typeof b.name === "string" ? b.name.trim() : "";
    const url = typeof b.url === "string" ? b.url.trim() : "";
    if (!name) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "name is required" });
      return z.NEVER;
    }
    if (!url) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "url is required" });
      return z.NEVER;
    }

    const mode = b.mode === "rule" ? "rule" : "global";
    const ruleProviders = readRuleProviders(b);
    if (mode === "rule" && (!ruleProviders || ruleProviders.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ruleProviders is required when mode is 'rule'",
      });
      return z.NEVER;
    }

    const localCoreEndpoint =
      typeof b.localCoreEndpoint === "string" && b.localCoreEndpoint.trim()
        ? b.localCoreEndpoint.trim()
        : null;
    const updateIntervalMinutes = Number(b.updateIntervalMinutes) || 60;
    const enabled = b.enabled === true;

    return {
      name,
      url,
      mode,
      ruleProviders,
      localCoreEndpoint,
      updateIntervalMinutes,
      enabled,
    };
  });

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

    return payload;
  });

/** Read the first Zod issue message, matching the routes' single-string `{ error }` envelope. */
export function firstIssueMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid request";
}
