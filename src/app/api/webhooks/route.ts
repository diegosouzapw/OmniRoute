/**
 * API: Webhooks
 * GET  — List all webhooks
 * POST — Create a new webhook
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getWebhooks, createWebhook } from "@/lib/localDb";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { encryptMetadata } from "@/lib/webhookDispatcher";
import { isEncryptionEnabled } from "@/lib/db/encryption";
import { parseAndValidateWebhookUrl } from "@/shared/network/outboundUrlGuardPolicy";

const WEBHOOK_KINDS = ["slack", "telegram", "discord", "custom"] as const;

const createWebhookSchema = z
  .object({
    url: z.string().min(1).max(2000),
    events: z.array(z.string()).optional().default(["*"]),
    secret: z.string().max(500).optional(),
    description: z.string().max(1000).optional().default(""),
    kind: z.enum(WEBHOOK_KINDS).optional().default("custom"),
    metadata: z.record(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.kind === "telegram") return;
    try {
      parseAndValidateWebhookUrl(data.url);
    } catch (err: any) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["url"],
        message: err?.message || "Blocked private or invalid webhook URL",
      });
    }
  });

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.has("limit") ? Number(searchParams.get("limit")) : undefined;
    const offset = searchParams.has("offset") ? Number(searchParams.get("offset")) : 0;
    const result = getWebhooks(limit !== undefined ? { limit, offset } : undefined);
    // Mask secrets in listing
    const masked = result.webhooks.map((w) => ({
      ...w,
      secret: w.secret ? `${w.secret.slice(0, 10)}...` : null,
    }));
    return NextResponse.json({ webhooks: masked, total: result.total });
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to list webhooks" },
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

    if (data.kind === "telegram" && !isEncryptionEnabled()) {
      return NextResponse.json(
        { error: "Telegram webhooks require STORAGE_ENCRYPTION_KEY to be configured" },
        { status: 400 }
      );
    }

    const metadataEncrypted = data.metadata ? encryptMetadata(data.metadata) : undefined;
    const webhook = createWebhook({
      url: data.url,
      events: data.events,
      secret: data.secret,
      description: data.description,
      kind: data.kind,
      metadataEncrypted,
    });

    return NextResponse.json({ webhook }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to create webhook" },
      { status: 500 }
    );
  }
}
