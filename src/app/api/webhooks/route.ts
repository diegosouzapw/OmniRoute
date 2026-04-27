/**
 * API: Webhooks
 * GET  — List all webhooks
 * POST — Create a new webhook
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { getWebhooks, createWebhook } from "@/lib/localDb";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const createWebhookSchema = z.object({
  url: z.string().url("Invalid URL format").max(2000),
  events: z.array(z.string()).optional().default(["*"]),
  secret: z.string().max(500).optional(),
  description: z.string().max(1000).optional().default(""),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const webhooks = getWebhooks();
    // Mask secrets in listing
    const masked = webhooks.map((w) => ({
      ...w,
      secret: w.secret ? `${w.secret.slice(0, 10)}...` : null,
    }));
    return NextResponse.json({ webhooks: masked });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to list webhooks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(createWebhookSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { data } = validation;
    const webhook = createWebhook({
      url: data.url,
      events: data.events,
      secret: data.secret,
      description: data.description,
    });

    return NextResponse.json({ webhook }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create webhook" },
      { status: 500 }
    );
  }
}
