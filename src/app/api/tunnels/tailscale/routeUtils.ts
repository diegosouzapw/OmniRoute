import { NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

export const tailscaleEnableSchema = z.object({
  sudoPassword: z.string().optional(),
  hostname: z.string().optional(),
  port: z.number().int().positive().optional(),
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
    return { response: validation.response };
  }

  return { data: validation.data };
}
