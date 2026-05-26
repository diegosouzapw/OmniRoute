/**
 * API: Webhook Test Delivery
 * POST — Send a test ping event to a specific webhook and return full diagnostics.
 */

import { NextResponse } from "next/server";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getWebhook } from "@/lib/localDb";
import { decryptMetadata } from "@/lib/webhookDispatcher";
import { buildSlackPayload } from "@/lib/webhooks/integrations/slack";
import { buildTelegramUrl, buildTelegramPayload } from "@/lib/webhooks/integrations/telegram";
import { buildDiscordPayload } from "@/lib/webhooks/integrations/discord";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { insertDelivery } from "@/lib/db/webhookDeliveries";
import { recordWebhookDelivery } from "@/lib/localDb";
import crypto from "crypto";

const MAX_RESPONSE_BODY = 2048;

async function testFetch(
  url: string,
  body: Record<string, unknown>,
  headers: Record<string, string>
): Promise<{
  success: boolean;
  status: number;
  latencyMs: number;
  responseBody: string;
  error?: string;
}> {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "OmniRoute-Webhook/1.0",
        ...headers,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const latencyMs = Date.now() - start;
    let rawBody = "";
    try {
      rawBody = await res.text();
      if (rawBody.length > MAX_RESPONSE_BODY) rawBody = rawBody.slice(0, MAX_RESPONSE_BODY) + "…";
    } catch {
      rawBody = "";
    }
    return { success: res.ok, status: res.status, latencyMs, responseBody: rawBody };
  } catch (error: any) {
    return {
      success: false,
      status: 0,
      latencyMs: Date.now() - start,
      responseBody: "",
      error: error.message || "Network error",
    };
  }
}

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(_);
  if (authError) return authError;

  try {
    const { id } = await params;
    const webhook = getWebhook(id);
    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }

    const kind = webhook.kind ?? "custom";
    const testData = {
      message: "Test webhook delivery from OmniRoute",
      webhookId: webhook.id,
    };
    const testPayload = { event: "test.ping", timestamp: new Date().toISOString(), data: testData };

    let payloadSent: Record<string, unknown>;
    let fetchUrl: string;
    let extraHeaders: Record<string, string> = {};

    if (kind === "slack") {
      payloadSent = buildSlackPayload("test.ping", testData) as Record<string, unknown>;
      fetchUrl = webhook.url;
    } else if (kind === "discord") {
      payloadSent = buildDiscordPayload("test.ping", testData) as Record<string, unknown>;
      fetchUrl = webhook.url;
    } else if (kind === "telegram") {
      const meta = decryptMetadata(webhook.metadata_encrypted ?? null);
      const botToken = meta?.botToken;
      if (!botToken) {
        return NextResponse.json({ error: "Missing Telegram botToken" }, { status: 422 });
      }
      fetchUrl = buildTelegramUrl(botToken);
      payloadSent = buildTelegramPayload("test.ping", testData, webhook.url) as Record<
        string,
        unknown
      >;
    } else {
      payloadSent = testPayload as Record<string, unknown>;
      fetchUrl = webhook.url;
      if (webhook.secret) {
        const bodyStr = JSON.stringify(testPayload);
        extraHeaders["X-Webhook-Signature"] =
          `sha256=${crypto.createHmac("sha256", webhook.secret).update(bodyStr).digest("hex")}`;
        extraHeaders["X-Webhook-Event"] = "test.ping";
        extraHeaders["X-Webhook-Timestamp"] = testPayload.timestamp;
      }
    }

    const result = await testFetch(fetchUrl, payloadSent, extraHeaders);

    try {
      insertDelivery({
        webhookId: webhook.id,
        eventType: "test.ping",
        status: result.success ? "success" : "failed",
        httpStatus: result.status || null,
        latencyMs: result.latencyMs,
        error: result.error ?? null,
        payloadSnapshot: kind === "custom" ? JSON.stringify(payloadSent).slice(0, 2000) : null,
      });
    } catch {
      // delivery logging is best-effort
    }
    recordWebhookDelivery(webhook.id, result.status, result.success);

    return NextResponse.json({
      delivered: result.success,
      status: result.status,
      latencyMs: result.latencyMs,
      payloadSent,
      responseBody: result.responseBody,
      error: result.error ? sanitizeErrorMessage(result.error) : null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
