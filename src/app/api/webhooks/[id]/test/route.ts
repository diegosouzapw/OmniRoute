/**
 * API: Webhook Test Delivery
 * POST — Send a test ping event to a specific webhook
 */

import { NextResponse } from "next/server";
import { getWebhook, recordWebhookDelivery } from "@/lib/localDb";
import { deliverWebhook } from "@/lib/webhookDispatcher";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(_);
  if (authError) return authError;

  try {
    const { id } = await params;
    const webhook = getWebhook(id);
    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }

    const result = await deliverWebhook(
      webhook.url,
      {
        event: "test.ping",
        timestamp: new Date().toISOString(),
        data: {
          message: "Test webhook delivery from OmniRoute",
          webhookId: webhook.id,
        },
      },
      webhook.secret,
      0 // No retries for test
    );

    recordWebhookDelivery(webhook.id, result.status, result.success);

    return NextResponse.json({
      delivered: result.success,
      status: result.status,
      error: result.error || null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
