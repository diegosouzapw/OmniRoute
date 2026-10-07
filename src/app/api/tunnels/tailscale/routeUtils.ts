import { NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  formatValidationMessage,
  isValidationFailure,
  validateBody,
} from "@/shared/validation/helpers";

export const tailscaleEnableSchema = z.object({
  sudoPassword: z.string().optional(),
  hostname: z.string().optional(),
  port: z.number().int().min(1).max(65535).optional(),
});

export const tailscaleLoginSchema = z.object({
  hostname: z.string().optional(),
});

export const tailscaleSudoSchema = z.object({
  sudoPassword: z.string().optional(),
});

export async function requireTailscaleAuth(request: Request) {
  if (await isAuthenticated(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function parseOptionalJsonBody<T extends z.ZodTypeAny>(request: Request, schema: T) {
  let rawBody: unknown = {};

  try {
    const rawText = await request.text();
    rawBody = rawText.trim() ? JSON.parse(rawText) : {};
  } catch {
    return { response: NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }) };
  }

  const validation = validateBody(schema, rawBody);
  if (isValidationFailure(validation)) {
    // validateBody() returns { success, error } — it has no `response` field, so
    // the previous `{ response: validation.response }` handed every caller an
    // `undefined` response and Next answered with a framework 500 instead of a 400.
    return {
      response: NextResponse.json(
        { error: formatValidationMessage(validation.error) },
        { status: 400 }
      ),
    };
  }

  return { data: validation.data };
}
