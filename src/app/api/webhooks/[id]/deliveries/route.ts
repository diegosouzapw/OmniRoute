/**
 * API: Webhook Delivery History
 * GET — List recent deliveries for a webhook
 */

import { NextResponse } from "next/server";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getWebhook, getDeliveries } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const webhook = getWebhook(id);
    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }

    const url = new URL(request.url);
    const limitParam = url.searchParams.get("limit");
    const limit = Math.min(Math.max(1, parseInt(limitParam ?? "20", 10) || 20), 100);

    const deliveries = getDeliveries(id, limit);
    return NextResponse.json({ deliveries });
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to fetch deliveries" },
      { status: 500 }
    );
  }
}
