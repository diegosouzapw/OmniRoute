import { z } from "zod";

/**
 * Request schemas for the volcengine-plan console connect routes.
 *
 * These bodies drive a headless browser login (phone/SMS, image captcha,
 * identity selection), so every field is validated before it reaches the
 * service — Hard Rule #7, enforced by `check:route-validation:t06`.
 */

// The service forwards this straight to its own wait loops; a non-positive or
// fractional timeout is always a caller bug, never a meaningful request.
const timeoutSchema = z.number().int().positive().optional();

export const volcenginePlanConnectSchema = z.object({
  // Absent phone = the legacy headful flow. Present but blank is a caller bug:
  // the old `body.phone.trim()` check silently fell through to that flow.
  phone: z.string().trim().min(1).optional(),
  timeout: timeoutSchema,
});

export const volcenginePlanCodeSchema = z.object({
  // Previously `String(body.code ?? "")`, which turned 123 into "123" and an
  // absent code into "" — both reached the service as a plausible-looking SMS
  // code and failed far away from the caller.
  code: z.string().trim().min(1),
  captcha: z.string().trim().min(1).optional(),
  timeout: timeoutSchema,
});

export const volcenginePlanIdentitySchema = z.object({
  index: z.number().int().min(0),
  timeout: timeoutSchema,
});

export type VolcenginePlanConnectBody = z.infer<typeof volcenginePlanConnectSchema>;
export type VolcenginePlanCodeBody = z.infer<typeof volcenginePlanCodeSchema>;
export type VolcenginePlanIdentityBody = z.infer<typeof volcenginePlanIdentitySchema>;
