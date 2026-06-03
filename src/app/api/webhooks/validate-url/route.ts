/**
 * API: Validate Webhook URL
 * POST — Check if a URL is safe to use as a webhook endpoint (SSRF guard)
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  parseAndValidatePublicUrl,
  OutboundUrlGuardError,
} from "@/shared/network/outboundUrlGuard";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";

const validateUrlSchema = z.object({
  url: z.string().min(1).max(2000),
});

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(validateUrlSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { url } = validation.data;

  try {
    parseAndValidatePublicUrl(url);
    return NextResponse.json({ valid: true });
  } catch (err) {
    if (err instanceof OutboundUrlGuardError) {
      return NextResponse.json({ valid: false, reason: "blocked_private" });
    }
    return NextResponse.json({ valid: false, reason: "invalid_url" });
  }
}
