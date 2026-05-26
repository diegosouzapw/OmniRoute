/**
 * Webhook Dispatcher
 * Dispatches events to registered webhooks with HMAC-SHA256 signing and retries.
 * Slack/Telegram/Discord use per-kind payload transformers (no HMAC wrapping).
 */

import crypto from "crypto";
import { encrypt, decrypt } from "./db/encryption";
import { parseAndValidatePublicUrl } from "@/shared/network/outboundUrlGuard";
import type { WebhookEvent } from "./webhooks/eventDescriptions";

export type { WebhookEvent };

export interface WebhookPayload {
  event: WebhookEvent;
  timestamp: string;
  data: Record<string, any>;
}

function signPayload(payload: string, secret: string): string {
  return `sha256=${crypto.createHmac("sha256", secret).update(payload).digest("hex")}`;
}

export function encryptMetadata(meta: Record<string, string>): string {
  return encrypt(JSON.stringify(meta)) ?? JSON.stringify(meta);
}

export function decryptMetadata(encrypted: string | null): Record<string, string> | null {
  if (!encrypted) return null;
  const raw = decrypt(encrypted);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return null;
  }
}

async function deliverRaw(
  url: string,
  body: Record<string, unknown>
): Promise<{ success: boolean; status: number; latencyMs: number; error?: string }> {
  const start = Date.now();
  try {
    parseAndValidatePublicUrl(url);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "OmniRoute-Webhook/1.0" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return { success: res.ok, status: res.status, latencyMs: Date.now() - start };
  } catch (error: any) {
    return {
      success: false,
      status: 0,
      latencyMs: Date.now() - start,
      error: error.message || "Network error",
    };
  }
}

export async function deliverWebhook(
  url: string,
  payload: WebhookPayload,
  secret?: string | null,
  maxRetries = 3
): Promise<{ success: boolean; status: number; error?: string }> {
  try {
    parseAndValidatePublicUrl(url);
  } catch (error: any) {
    return { success: false, status: 0, error: error.message || "Blocked outbound URL" };
  }
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "OmniRoute-Webhook/1.0",
    "X-Webhook-Event": payload.event,
    "X-Webhook-Timestamp": payload.timestamp,
  };

  if (secret) {
    headers["X-Webhook-Signature"] = signPayload(body, secret);
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10_000);

      const res = await fetch(url, {
        method: "POST",
        headers,
        body,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok || res.status < 500) {
        return { success: res.ok, status: res.status };
      }

      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
      }
    } catch (error: any) {
      if (attempt === maxRetries) {
        return { success: false, status: 0, error: error.message || "Network error" };
      }
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
    }
  }

  return { success: false, status: 0, error: "Max retries exceeded" };
}

/**
 * Dispatch an event to all matching enabled webhooks.
 * Routes by kind: slack/discord use raw payload helpers; telegram decrypts botToken from metadata;
 * custom uses HMAC-signed deliverWebhook.
 */
export async function dispatchEvent(event: WebhookEvent, data: Record<string, any>): Promise<void> {
  const { getEnabledWebhooks, recordWebhookDelivery, disableWebhooksWithHighFailures } =
    await import("./db/webhooks");
  const { insertDelivery } = await import("./db/webhookDeliveries");
  const { buildSlackPayload } = await import("./webhooks/integrations/slack");
  const { buildTelegramUrl, buildTelegramPayload } =
    await import("./webhooks/integrations/telegram");
  const { buildDiscordPayload } = await import("./webhooks/integrations/discord");

  const webhooks = getEnabledWebhooks();
  const payload: WebhookPayload = {
    event,
    timestamp: new Date().toISOString(),
    data,
  };

  const deliveries = webhooks
    .filter((wh) => wh.events.includes("*") || wh.events.includes(event))
    .map(async (wh) => {
      const kind = wh.kind ?? "custom";
      const start = Date.now();
      let result: { success: boolean; status: number; error?: string };

      try {
        if (kind === "slack") {
          const slackPayload = buildSlackPayload(event, data);
          result = await deliverRaw(wh.url, slackPayload as Record<string, unknown>);
        } else if (kind === "discord") {
          const discordPayload = buildDiscordPayload(event, data);
          result = await deliverRaw(wh.url, discordPayload as Record<string, unknown>);
        } else if (kind === "telegram") {
          const meta = decryptMetadata(wh.metadata_encrypted ?? null);
          const botToken = meta?.botToken;
          if (!botToken) {
            result = { success: false, status: 0, error: "Missing Telegram botToken in metadata" };
          } else {
            const apiUrl = buildTelegramUrl(botToken);
            // For Telegram, wh.url stores the chat_id
            const tgPayload = buildTelegramPayload(event, data, wh.url);
            result = await deliverRaw(apiUrl, tgPayload as Record<string, unknown>);
          }
        } else {
          result = await deliverWebhook(wh.url, payload, wh.secret);
        }
      } catch (err: any) {
        result = { success: false, status: 0, error: err.message || "Dispatch error" };
      }

      const latencyMs = Date.now() - start;

      try {
        insertDelivery({
          webhookId: wh.id,
          eventType: event,
          status: result.success ? "success" : "failed",
          httpStatus: result.status || null,
          latencyMs,
          error: result.error ?? null,
          payloadSnapshot: kind === "custom" ? JSON.stringify(payload).slice(0, 2000) : null,
        });
      } catch {
        // Delivery logging is best-effort
      }

      recordWebhookDelivery(wh.id, result.status, result.success);
      return { webhookId: wh.id, ...result };
    });

  await Promise.allSettled(deliveries);
  disableWebhooksWithHighFailures(10);
}
