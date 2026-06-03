/**
 * API: Webhook by ID
 * GET    — Get webhook details
 * PUT    — Update webhook
 * DELETE — Delete webhook
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getWebhook, updateWebhookRecord, deleteWebhook } from "@/lib/localDb";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { encryptMetadata } from "@/lib/webhookDispatcher";
import { isEncryptionEnabled } from "@/lib/db/encryption";
import { parseAndValidatePublicUrl } from "@/shared/network/outboundUrlGuard";

const WEBHOOK_KINDS = ["slack", "telegram", "discord", "custom"] as const;
const WEBHOOK_EVENT_VALUES = [
  "*",
  "request.completed",
  "request.failed",
  "provider.error",
  "provider.recovered",
  "quota.exceeded",
  "combo.switched",
  "test.ping",
] as const;

const updateWebhookSchema = z
  .object({
    url: z.string().min(1).max(2000).optional(),
    events: z.array(z.enum(WEBHOOK_EVENT_VALUES)).optional(),
    secret: z.string().max(500).optional(),
    description: z.string().max(1000).optional(),
    enabled: z.boolean().optional(),
    kind: z.enum(WEBHOOK_KINDS).optional(),
    metadata: z.record(z.string()).optional(),
  })
  .strict();

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(_);
  if (authError) return authError;

  try {
    const { id } = await params;
    const webhook = getWebhook(id);
    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }
    const masked = {
      ...webhook,
      secret: webhook.secret ? `${webhook.secret.slice(0, 10)}...` : null,
    };
    return NextResponse.json({ webhook: masked });
  } catch (error: any) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const rawBody = await request.json();
    const validation = validateBody(updateWebhookSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { metadata, ...rest } = validation.data as typeof validation.data & {
      metadata?: Record<string, string>;
    };

    const existingWebhook = getWebhook(id);
    if (!existingWebhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }
    const effectiveKind = rest.kind ?? existingWebhook.kind;
    if (effectiveKind === "telegram" && metadata?.botToken && !isEncryptionEnabled()) {
      return NextResponse.json(
        { error: "Telegram webhooks require STORAGE_ENCRYPTION_KEY to be configured" },
        { status: 400 }
      );
    }

    if (rest.url !== undefined && effectiveKind !== "telegram") {
      try {
        parseAndValidatePublicUrl(rest.url);
      } catch (err: any) {
        return NextResponse.json(
          { error: err?.message || "Blocked private or invalid webhook URL" },
          { status: 400 }
        );
      }
    }

    const updateData: Parameters<typeof updateWebhookRecord>[1] = { ...rest };
    if (metadata !== undefined) {
      (updateData as any).metadataEncrypted = encryptMetadata(metadata);
    }

    const webhook = updateWebhookRecord(id, updateData);
    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }
    return NextResponse.json({ webhook });
  } catch (error: any) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(_);
  if (authError) return authError;

  try {
    const { id } = await params;
    const deleted = deleteWebhook(id);
    if (!deleted) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
