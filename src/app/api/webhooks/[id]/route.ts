/**
 * API: Webhook by ID
 * GET    — Get webhook details
 * PUT    — Update webhook
 * DELETE — Delete webhook
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { getWebhook, updateWebhookRecord, deleteWebhook } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";

const updateWebhookSchema = z
  .object({
    url: z.string().url("Invalid URL format").max(2000).optional(),
    events: z.array(z.string()).optional(),
    secret: z.string().max(500).optional(),
    description: z.string().max(1000).optional(),
    enabled: z.boolean().optional(),
    payloadTemplate: z.string().max(5000).optional(),
  })
  .passthrough();

function maskWebhookSecret<T extends { secret?: string | null }>(webhook: T) {
  return {
    ...webhook,
    secret: webhook.secret ? `${webhook.secret.slice(0, 10)}...` : null,
  };
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authError = await requireManagementAuth(request);
    if (authError) return authError;

    const { id } = await params;
    const webhook = getWebhook(id);
    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }
    return NextResponse.json({ webhook: maskWebhookSecret(webhook) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authError = await requireManagementAuth(request);
    if (authError) return authError;

    const { id } = await params;
    const rawBody = await request.json();
    const validation = validateBody(updateWebhookSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { payloadTemplate, ...rest } = validation.data;
    const webhook = updateWebhookRecord(id, {
      ...rest,
      ...(payloadTemplate !== undefined && { payload_template: payloadTemplate }),
    });
    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }
    return NextResponse.json({ webhook });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authError = await requireManagementAuth(_);
    if (authError) return authError;

    const { id } = await params;
    const deleted = deleteWebhook(id);
    if (!deleted) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
