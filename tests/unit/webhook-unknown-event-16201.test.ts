/** Public webhook builders and delivery bookkeeping for unknown programmatic events (#16201). */
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import type { WebhookEvent } from "../../src/lib/webhooks/eventDescriptions.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "webhook-unknown-16201-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";
const core = await import("../../src/lib/db/core.ts");
const dispatcher = await import("../../src/lib/webhookDispatcher.ts");
const db = await import("../../src/lib/db/webhooks.ts");
const deliveries = await import("../../src/lib/db/webhookDeliveries.ts");
const slack = await import("../../src/lib/webhooks/integrations/slack.ts");
const discord = await import("../../src/lib/webhooks/integrations/discord.ts");
const telegram = await import("../../src/lib/webhooks/integrations/telegram.ts");

const timestamp = "2026-10-10T14:00:00.000Z";
const received: { path: string; headers: http.IncomingHttpHeaders; body: string }[] = [];
const statuses = new Map<string, number>();
const server = http.createServer((request, response) => {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    received.push({ path: request.url ?? "", headers: request.headers, body });
    response.writeHead(statuses.get(request.url ?? "") ?? 200).end("receiver");
  });
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

test.after(async () => {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function expectedSlack(title: string) {
  return {
    text: title,
    blocks: [
      { type: "section", text: { type: "mrkdwn", text: title } },
      { type: "context", elements: [{ type: "mrkdwn", text: `OmniRoute · ${timestamp}` }] },
    ],
  };
}

const knownEvents: [WebhookEvent, string, string, string, number][] = [
  [
    "request.completed",
    "Request Completed",
    "✅",
    "Triggered when an upstream request completes successfully (HTTP 2xx).",
    0x22c55e,
  ],
  [
    "request.failed",
    "Request Failed",
    "🚨",
    "Triggered when a request fails after all retries and fallback combo targets.",
    0xef4444,
  ],
  [
    "quota.exceeded",
    "Quota Exceeded",
    "📊",
    "A usage threshold (e.g. 95% of quota) was reached.",
    0xeab308,
  ],
  [
    "proxy.set_aside",
    "Proxy Set Aside",
    "🚧",
    "Triggered when a pool member is temporarily set aside after repeated refusals. Transition only, never per request.",
    0x6366f1,
  ],
  [
    "proxy.pool.exhausted",
    "Proxy Pool Exhausted",
    "🪫",
    "Triggered when every member of a pool scope is set aside and selection falls back to fail-closed serving.",
    0x6366f1,
  ],
  [
    "test.ping",
    "Test Ping",
    "🏓",
    "Manual test delivery to verify your webhook is reachable.",
    0x8b5cf6,
  ],
];
const unknownEvents = [
  "future.event",
  "",
  "constructor",
  "toString",
  "__proto__",
  "[unknown]*_`event",
];
const eventCases: [string, string, string, string, number][] = [
  ...knownEvents,
  ...unknownEvents.map((event): [string, string, string, string, number] => [
    event,
    "Webhook Event",
    "🔔",
    "An OmniRoute webhook event was received.",
    0x6366f1,
  ]),
];

for (const [event, label, emoji, description, color] of eventCases) {
  test(`Slack payload preserves its schema for ${JSON.stringify(event)}`, (context) => {
    context.mock.timers.enable({ apis: ["Date"], now: new Date(timestamp) });
    assert.deepEqual(
      slack.buildSlackPayload(event as WebhookEvent, {}),
      expectedSlack(`${emoji} *${label}*`)
    );
  });
  test(`Discord payload preserves its schema for ${JSON.stringify(event)}`, (context) => {
    context.mock.timers.enable({ apis: ["Date"], now: new Date(timestamp) });
    assert.deepEqual(discord.buildDiscordPayload(event as WebhookEvent, {}), {
      embeds: [
        {
          title: `${emoji} ${label}`,
          description,
          color,
          footer: { text: `OmniRoute · ${timestamp}` },
        },
      ],
    });
  });
  test(`Telegram payload preserves its schema for ${JSON.stringify(event)}`, (context) => {
    context.mock.timers.enable({ apis: ["Date"], now: new Date(timestamp) });
    assert.deepEqual(telegram.buildTelegramPayload(event as WebhookEvent, {}, "synthetic-chat"), {
      chat_id: "synthetic-chat",
      text: `${emoji} *${label}*\n_OmniRoute · ${timestamp}_`,
      parse_mode: "Markdown",
    });
  });
}

for (const event of ["test.ping", "future.event"]) {
  test(`Telegram escapes data and retains metrics for ${event}`, (context) => {
    context.mock.timers.enable({ apis: ["Date"], now: new Date(timestamp) });
    const raw = "m_*[]`";
    const escaped = "m\\_\\*\\[\\]\\`";
    const result = telegram.buildTelegramPayload(
      event as WebhookEvent,
      {
        model: raw,
        provider: raw,
        account: raw,
        combo: raw,
        error: raw,
        latencyMs: 12,
        fallbackCount: 2,
      },
      "123"
    );
    assert.deepEqual(result, {
      chat_id: "123",
      parse_mode: "Markdown",
      text: [
        event === "test.ping" ? "🏓 *Test Ping*" : "🔔 *Webhook Event*",
        ...["Model", "Provider", "Account", "Combo"].map((field) => `${field}: \`${escaped}\``),
        "Latency: `12ms`",
        "Fallbacks: `2`",
        `Error: \`${escaped}\``,
        `_OmniRoute · ${timestamp}_`,
      ].join("\n"),
    });
  });
}

test("Telegram token validation and URL remain unchanged without a network request", () => {
  const token = `123456:${"A".repeat(35)}`;
  assert.equal(
    telegram.buildTelegramUrl(token),
    `https://api.telegram.org/bot${token}/sendMessage`
  );
  assert.throws(() => telegram.buildTelegramUrl("invalid"), /Invalid Telegram bot token format/);
});

function seedFailures(id: string) {
  for (let count = 0; count < 9; count++) db.recordWebhookDelivery(id, 500, false);
  assert.equal(db.getWebhook(id)?.failure_count, 9);
}

function assertRecordedSuccess(id: string, event: string) {
  const rows = deliveries.getDeliveries(id, 10);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].event_type, event);
  assert.equal(rows[0].status, "success");
  assert.equal(rows[0].http_status, 200);
  const webhook = db.getWebhook(id);
  assert.equal(webhook?.failure_count, 0);
  assert.equal(webhook?.enabled, true);
}

test("unknown events reach wildcard receivers and keep delivery identity and counters", async () => {
  received.length = 0;
  const event = "future.event" as WebhookEvent;
  const hooks = (["slack", "discord", "custom"] as const).map((kind) =>
    db.createWebhook({
      kind,
      url: `${baseUrl}/${kind}`,
      events: ["*"],
      secret: "synthetic-secret",
    })
  );
  const other = db.createWebhook({
    kind: "slack",
    url: `${baseUrl}/other`,
    events: ["request.failed"],
  });
  try {
    hooks.forEach((hook) => seedFailures(hook.id));
    await dispatcher.dispatchEvent(event, { marker: "same-data" });
    assert.deepEqual(received.map((hit) => hit.path).sort(), ["/custom", "/discord", "/slack"]);
    hooks.forEach((hook) => assertRecordedSuccess(hook.id, event));
    assert.equal(deliveries.getDeliveries(other.id, 10).length, 0);
    assert.equal(db.getWebhook(other.id)?.failure_count, 0);
    const custom = received.find((hit) => hit.path === "/custom")!;
    const payload = JSON.parse(custom.body);
    assert.equal(payload.event, event);
    assert.deepEqual(payload.data, { marker: "same-data" });
    assert.equal(custom.headers["x-webhook-event"], event);
    assert.equal(
      custom.headers["x-webhook-signature"],
      `sha256=${crypto.createHmac("sha256", "synthetic-secret").update(custom.body).digest("hex")}`
    );
    assert.equal(
      JSON.parse(received.find((hit) => hit.path === "/slack")!.body).text,
      "🔔 *Webhook Event*"
    );
    assert.equal(
      JSON.parse(received.find((hit) => hit.path === "/discord")!.body).embeds[0].title,
      "🔔 Webhook Event"
    );
  } finally {
    [...hooks, other].forEach((hook) => db.deleteWebhook(hook.id));
  }
});

for (const kind of ["slack", "discord"] as const) {
  test(`${kind} unknown-event receiver failures still count and disable at ten`, async () => {
    received.length = 0;
    const receiverPath = `/reject-${kind}`;
    statuses.set(receiverPath, 400);
    const hook = db.createWebhook({ kind, url: `${baseUrl}${receiverPath}`, events: ["*"] });
    try {
      seedFailures(hook.id);
      await dispatcher.dispatchEvent("future.event" as WebhookEvent, {});
      assert.equal(received.length, 1);
      assert.equal(received[0].path, receiverPath);
      const rows = deliveries.getDeliveries(hook.id, 10);
      assert.equal(rows.length, 1);
      assert.equal(rows[0].status, "failed");
      assert.equal(rows[0].http_status, 400);
      assert.equal(rows[0].event_type, "future.event");
      assert.equal(db.getWebhook(hook.id)?.failure_count, 10);
      assert.equal(db.getWebhook(hook.id)?.enabled, false);
    } finally {
      db.deleteWebhook(hook.id);
      statuses.delete(receiverPath);
    }
  });
}
