/**
 * Characterization — src/lib/webhookDispatcher.ts + src/lib/webhooks/ (rail 3.8.55,
 * pre-v4 extraction to @omniroute/mod-*).
 *
 * Pins the PUBLIC surface and the observable delivery behaviour (payload, HMAC signature,
 * retries, per-kind routing, delivery bookkeeping) as it is today, against a real HTTP server
 * on an ephemeral loopback port. Quirks are pinned, not fixed — their names start with
 * "characterization: … currently …". Surface snapshots are literal: update them consciously.
 *
 * External consumers (the real boundary): open-sse/services/combo/{comboAttemptLoop,
 * executeTargetAttempt}.ts + src/lib/quota/enforce.ts + src/lib/proxyEvents/
 * proxyTransitionBridge.ts (notifyWebhookEvent), src/app/api/webhooks/** (encryptMetadata,
 * decryptMetadata, WEBHOOK_EVENT_VALUES, build{Slack,Telegram,Discord}Payload,
 * buildTelegramUrl).
 *
 * Loopback delivery needs the private-URL opt-in (OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS):
 * without it the SSRF guard (#12569) blocks 127.0.0.1 before any socket is opened.
 */
import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-char-webhooks-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";

const core = await import("../../src/lib/db/core.ts");
const dispatcher = await import("../../src/lib/webhookDispatcher.ts");
const eventDescriptions = await import("../../src/lib/webhooks/eventDescriptions.ts");
const slack = await import("../../src/lib/webhooks/integrations/slack.ts");
const telegram = await import("../../src/lib/webhooks/integrations/telegram.ts");
const discord = await import("../../src/lib/webhooks/integrations/discord.ts");
const webhooksDb = await import("../../src/lib/db/webhooks.ts");
const deliveriesDb = await import("../../src/lib/db/webhookDeliveries.ts");

// ─── Fake receiver on an ephemeral port ──────────────────────────────────────

type Received = { path: string; headers: http.IncomingHttpHeaders; body: string };
const received: Received[] = [];
const statusQueue: number[] = [];

const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    received.push({ path: req.url ?? "", headers: req.headers, body });
    res.statusCode = statusQueue.shift() ?? 200;
    res.end("ok");
  });
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const BASE = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

test.after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function reset() {
  received.length = 0;
  statusQueue.length = 0;
}

const PING = {
  event: "test.ping" as const,
  timestamp: "2026-10-09T00:00:00.000Z",
  data: { message: "hi" },
};

// ─── (a) Surface snapshots ───────────────────────────────────────────────────

test("surface: webhook modules runtime exports", () => {
  assert.deepEqual(
    {
      webhookDispatcher: Object.keys(dispatcher).sort(),
      eventDescriptions: Object.keys(eventDescriptions).sort(),
      slack: Object.keys(slack).sort(),
      telegram: Object.keys(telegram).sort(),
      discord: Object.keys(discord).sort(),
    },
    {
      webhookDispatcher: [
        "decryptMetadata",
        "deliverWebhook",
        "dispatchEvent",
        "encryptMetadata",
        "notifyWebhookEvent",
      ],
      eventDescriptions: ["EVENT_DESCRIPTIONS", "WEBHOOK_EVENT_VALUES"],
      slack: ["buildSlackPayload"],
      telegram: ["buildTelegramPayload", "buildTelegramUrl"],
      discord: ["buildDiscordPayload"],
    }
  );
});

test("surface: event catalogue (values ↔ descriptions)", () => {
  assert.deepEqual(
    [...eventDescriptions.WEBHOOK_EVENT_VALUES],
    [
      "request.completed",
      "request.failed",
      "quota.exceeded",
      "proxy.set_aside",
      "proxy.pool.exhausted",
      "test.ping",
    ]
  );
  assert.deepEqual(Object.keys(eventDescriptions.EVENT_DESCRIPTIONS), [
    ...eventDescriptions.WEBHOOK_EVENT_VALUES,
  ]);
  for (const desc of Object.values(eventDescriptions.EVENT_DESCRIPTIONS)) {
    assert.deepEqual(Object.keys(desc).sort(), ["description", "emoji", "exampleData", "label"]);
  }
});

// ─── (b) Contracts — deliverWebhook against a real HTTP server ───────────────

test("deliverWebhook: POSTs the JSON payload with event headers and an HMAC-SHA256 signature", async () => {
  reset();
  const result = await dispatcher.deliverWebhook(`${BASE}/signed`, PING, "s3cret");
  assert.deepEqual(result, { success: true, status: 200 });
  assert.equal(received.length, 1);
  const [hit] = received;
  assert.equal(hit.path, "/signed");
  assert.equal(hit.body, JSON.stringify(PING));
  assert.equal(hit.headers["content-type"], "application/json");
  assert.equal(hit.headers["user-agent"], "OmniRoute-Webhook/1.0");
  assert.equal(hit.headers["x-webhook-event"], "test.ping");
  assert.equal(hit.headers["x-webhook-timestamp"], PING.timestamp);
  const expected = `sha256=${crypto.createHmac("sha256", "s3cret").update(hit.body).digest("hex")}`;
  assert.equal(hit.headers["x-webhook-signature"], expected);
});

test("deliverWebhook: no secret → no signature header", async () => {
  reset();
  await dispatcher.deliverWebhook(`${BASE}/unsigned`, PING, null);
  assert.equal(received[0].headers["x-webhook-signature"], undefined);
});

test("deliverWebhook: 4xx is final — no retry, success=false with the status", async () => {
  reset();
  statusQueue.push(404);
  const result = await dispatcher.deliverWebhook(`${BASE}/gone`, PING, null, 3);
  assert.deepEqual(result, { success: false, status: 404 });
  assert.equal(received.length, 1);
});

test("deliverWebhook: 5xx is retried with backoff and can recover", async () => {
  reset();
  statusQueue.push(503, 200);
  const result = await dispatcher.deliverWebhook(`${BASE}/flaky`, PING, null, 1);
  assert.deepEqual(result, { success: true, status: 200 });
  assert.equal(received.length, 2);
});

test("characterization: deliverWebhook currently reports status 0 'Max retries exceeded' after persistent 5xx", async () => {
  reset();
  statusQueue.push(500, 502);
  const result = await dispatcher.deliverWebhook(`${BASE}/down`, PING, null, 1);
  // The last upstream status (502) is not surfaced.
  assert.deepEqual(result, { success: false, status: 0, error: "Max retries exceeded" });
  assert.equal(received.length, 2);
});

// ─── (c) Errors ──────────────────────────────────────────────────────────────

test("deliverWebhook: cloud-metadata target fails closed immediately (no retries)", async () => {
  const started = Date.now();
  const result = await dispatcher.deliverWebhook("http://169.254.169.254/hook", PING, null, 3);
  assert.equal(result.success, false);
  assert.equal(result.status, 0);
  assert.equal(typeof result.error, "string");
  // Three retries would have cost ≥7s of backoff.
  assert.ok(Date.now() - started < 3000, "blocked URL must not burn retries");
});

test("deliverWebhook: connection refused with maxRetries=0 → success=false, status 0", async () => {
  const probe = http.createServer();
  await new Promise<void>((resolve) => probe.listen(0, "127.0.0.1", resolve));
  const port = (probe.address() as AddressInfo).port;
  await new Promise<void>((resolve) => probe.close(() => resolve()));
  const result = await dispatcher.deliverWebhook(`http://127.0.0.1:${port}/x`, PING, null, 0);
  assert.equal(result.success, false);
  assert.equal(result.status, 0);
  assert.equal(typeof result.error, "string");
});

test("encrypt/decryptMetadata: round trip; null / garbage → null", () => {
  const enc = dispatcher.encryptMetadata({ botToken: "t", chatId: "c" });
  assert.deepEqual(dispatcher.decryptMetadata(enc), { botToken: "t", chatId: "c" });
  assert.equal(dispatcher.decryptMetadata(null), null);
  assert.equal(dispatcher.decryptMetadata(""), null);
  assert.equal(dispatcher.decryptMetadata("not-json"), null);
});

// ─── (b) Contracts — dispatchEvent routing + bookkeeping ─────────────────────

test("dispatchEvent: routes by subscription and kind, records deliveries and status", async () => {
  reset();
  const custom = webhooksDb.createWebhook({
    url: `${BASE}/custom`,
    events: ["test.ping"],
    secret: "whsec_char",
  });
  const otherEvent = webhooksDb.createWebhook({ url: `${BASE}/other`, events: ["request.failed"] });
  const slackHook = webhooksDb.createWebhook({ url: `${BASE}/slack`, kind: "slack" }); // events ["*"]
  const tg = webhooksDb.createWebhook({ url: "-100123", events: ["test.ping"], kind: "telegram" });

  await dispatcher.dispatchEvent("test.ping", { model: "m1" });

  assert.deepEqual(received.map((r) => r.path).sort(), ["/custom", "/slack"]);
  const customHit = received.find((r) => r.path === "/custom")!;
  const customBody = JSON.parse(customHit.body);
  assert.deepEqual(Object.keys(customBody).sort(), ["data", "event", "timestamp"]);
  assert.equal(customBody.event, "test.ping");
  assert.deepEqual(customBody.data, { model: "m1" });
  assert.equal(
    customHit.headers["x-webhook-signature"],
    `sha256=${crypto.createHmac("sha256", "whsec_char").update(customHit.body).digest("hex")}`
  );
  const slackHit = received.find((r) => r.path === "/slack")!;
  assert.equal(slackHit.headers["x-webhook-signature"], undefined, "slack is not HMAC-wrapped");
  assert.match(JSON.parse(slackHit.body).text, /Test Ping\* on `m1`/);

  const summary = (id: string) =>
    deliveriesDb.getDeliveries(id, 10).map((d) => [d.event_type, d.status, d.http_status, d.error]);
  assert.deepEqual(summary(custom.id), [["test.ping", "success", 200, null]]);
  assert.deepEqual(summary(slackHook.id), [["test.ping", "success", 200, null]]);
  assert.deepEqual(summary(otherEvent.id), []);
  assert.deepEqual(summary(tg.id), [
    ["test.ping", "failed", null, "Missing Telegram botToken in metadata"],
  ]);

  assert.equal(webhooksDb.getWebhook(custom.id)?.last_status, 200);
  assert.equal(webhooksDb.getWebhook(custom.id)?.failure_count, 0);
  assert.equal(webhooksDb.getWebhook(tg.id)?.failure_count, 1);
  assert.equal(webhooksDb.getWebhook(tg.id)?.last_status, 0);

  for (const wh of [custom, otherEvent, slackHook, tg]) webhooksDb.deleteWebhook(wh.id);
});

test("dispatchEvent: a webhook reaching 10 consecutive failures is auto-disabled", async () => {
  reset();
  const wh = webhooksDb.createWebhook({ url: `${BASE}/failing`, events: ["request.failed"] });
  for (let i = 0; i < 9; i++) webhooksDb.recordWebhookDelivery(wh.id, 0, false);
  statusQueue.push(400);
  await dispatcher.dispatchEvent("request.failed", {});
  const after = webhooksDb.getWebhook(wh.id);
  assert.equal(after?.failure_count, 10);
  assert.equal(after?.enabled, false);
  webhooksDb.deleteWebhook(wh.id);
});

test("notifyWebhookEvent: fire-and-forget — returns undefined synchronously, never throws", async () => {
  assert.equal(dispatcher.notifyWebhookEvent("request.completed", { model: "m" }), undefined);
  // Let the detached dispatch settle so it never races the DB teardown in test.after.
  await new Promise((resolve) => setTimeout(resolve, 100));
});

// ─── (b)+(c) Integration payload builders ────────────────────────────────────

test("buildSlackPayload: title line + error, provider only shown without a model", () => {
  const p = slack.buildSlackPayload("request.failed", { model: "gpt", error: "503" });
  assert.equal(p.text, "🚨 *Request Failed* on `gpt`\n*Error:* `503`");
  assert.equal(
    (p.blocks as Array<{ type: string }>).map((b) => b.type).join(","),
    "section,context"
  );
  assert.equal(
    slack.buildSlackPayload("quota.exceeded", { provider: "claude" }).text,
    "📊 *Quota Exceeded*\n*Provider:* claude"
  );
});

test("buildDiscordPayload: embed with per-event colour, description fallback", () => {
  const p = discord.buildDiscordPayload("request.completed", { model: "m" });
  assert.equal(p.embeds?.[0].title, "✅ Request Completed");
  assert.equal(p.embeds?.[0].description, "**Model:** `m`");
  assert.equal(p.embeds?.[0].color, 0x22c55e);
  const proxy = discord.buildDiscordPayload("proxy.set_aside", {});
  assert.equal(
    proxy.embeds?.[0].description,
    eventDescriptions.EVENT_DESCRIPTIONS["proxy.set_aside"].description
  );
  // proxy.* events have no dedicated colour → default indigo.
  assert.equal(proxy.embeds?.[0].color, 0x6366f1);
});

test("buildTelegramPayload/Url: Markdown-escaped lines; malformed bot token throws", () => {
  const p = telegram.buildTelegramPayload(
    "request.failed",
    { model: "gpt_4*x", latencyMs: 12, fallbackCount: 2, combo: "c" },
    "-100"
  );
  assert.equal(p.chat_id, "-100");
  assert.equal(p.parse_mode, "Markdown");
  assert.deepEqual(p.text.split("\n").slice(0, 5), [
    "🚨 *Request Failed*",
    "Model: `gpt\\_4\\*x`",
    "Combo: `c`",
    "Latency: `12ms`",
    "Fallbacks: `2`",
  ]);
  const token = `123456:${"A".repeat(35)}`;
  assert.equal(
    telegram.buildTelegramUrl(token),
    `https://api.telegram.org/bot${token}/sendMessage`
  );
  assert.throws(() => telegram.buildTelegramUrl("bad"), {
    message: "Invalid Telegram bot token format (expected <id>:<secret>)",
  });
});

test("characterization: payload builders currently throw a TypeError on an unknown event", () => {
  // The event is only typed, never validated at runtime: EVENT_DESCRIPTIONS[event] is undefined.
  const unknown = "nope.event" as "test.ping";
  assert.throws(() => slack.buildSlackPayload(unknown, {}), TypeError);
  assert.throws(() => discord.buildDiscordPayload(unknown, {}), TypeError);
  assert.throws(() => telegram.buildTelegramPayload(unknown, {}, "1"), TypeError);
});
