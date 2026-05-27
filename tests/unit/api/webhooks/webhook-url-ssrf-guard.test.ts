/**
 * Tests for SSRF guard on the webhook URL surface:
 *
 * - POST /api/webhooks rejects custom/slack/discord webhooks targeting
 *   loopback / RFC1918 / link-local hosts.
 * - PUT /api/webhooks/[id] rejects updates that would point a non-telegram
 *   webhook at a blocked host.
 * - POST /api/webhooks/[id]/test refuses to perform the diagnostic fetch
 *   when the persisted URL is blocked (defense in depth, in case a row
 *   bypassed schema validation via direct DB access or older data).
 * - kind === "telegram" is exempt — `url` there is a Telegram chat_id, not
 *   an HTTP URL — so the guard must not block it.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-webhook-ssrf-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../../src/lib/db/core.ts");
const { updateSettings } = await import("../../../../src/lib/db/settings.ts");
await updateSettings({ requireLogin: false });

const webhooksRoute = await import("../../../../src/app/api/webhooks/route.ts");
const webhookByIdRoute = await import("../../../../src/app/api/webhooks/[id]/route.ts");
const webhookTestRoute =
  await import("../../../../src/app/api/webhooks/[id]/test/route.ts?suite=ssrf-guard");
const { createWebhook } = await import("../../../../src/lib/db/webhooks.ts");

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function jsonRequest(url: string, method: string, body: unknown): Request {
  return new Request(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/webhooks — SSRF guard on create", () => {
  it("rejects custom webhook pointing to 127.0.0.1", async () => {
    const req = jsonRequest("http://localhost/api/webhooks", "POST", {
      url: "http://127.0.0.1:20128/api/v1/management/proxies",
      kind: "custom",
    });
    const res = await webhooksRoute.POST(req);
    assert.equal(res.status, 400, "loopback URL must be rejected");
    const body = await res.json();
    assert.ok(body.error, "error body must be present");
  });

  it("rejects slack webhook pointing to link-local metadata host", async () => {
    const req = jsonRequest("http://localhost/api/webhooks", "POST", {
      url: "http://169.254.169.254/latest/meta-data/iam",
      kind: "slack",
    });
    const res = await webhooksRoute.POST(req);
    assert.equal(res.status, 400, "169.254/16 must be rejected");
  });

  it("rejects discord webhook pointing to RFC1918 (192.168/16)", async () => {
    const req = jsonRequest("http://localhost/api/webhooks", "POST", {
      url: "http://192.168.0.15:8080/hook",
      kind: "discord",
    });
    const res = await webhooksRoute.POST(req);
    assert.equal(res.status, 400, "RFC1918 must be rejected");
  });

  it("rejects discord webhook with embedded credentials", async () => {
    const req = jsonRequest("http://localhost/api/webhooks", "POST", {
      url: "https://user:pass@example.com/hook",
      kind: "discord",
    });
    const res = await webhooksRoute.POST(req);
    assert.equal(res.status, 400, "embedded credentials must be rejected");
  });

  it("rejects discord webhook with non-http(s) protocol", async () => {
    const req = jsonRequest("http://localhost/api/webhooks", "POST", {
      url: "file:///etc/passwd",
      kind: "discord",
    });
    const res = await webhooksRoute.POST(req);
    assert.equal(res.status, 400, "non-http protocol must be rejected");
  });

  it("accepts public https webhook", async () => {
    const req = jsonRequest("http://localhost/api/webhooks", "POST", {
      url: "https://example.com/hook",
      kind: "custom",
    });
    const res = await webhooksRoute.POST(req);
    assert.equal(res.status, 201, "public URL must be accepted");
  });

  it("does not trip the SSRF guard for telegram kind (url is a chat_id, not HTTP)", async () => {
    const req = jsonRequest("http://localhost/api/webhooks", "POST", {
      url: "@my-telegram-channel",
      kind: "telegram",
    });
    const res = await webhooksRoute.POST(req);
    // Telegram may still be rejected for unrelated reasons (e.g., storage
    // encryption not configured). What matters is that the rejection is NOT
    // caused by the SSRF/URL guard refinement.
    if (res.status === 400) {
      const body = await res.json();
      const msg = JSON.stringify(body).toLowerCase();
      assert.ok(
        !/block|private|invalid outbound url|outbound url/.test(msg),
        `telegram chat_id must not trip the URL guard: ${msg}`
      );
    }
  });
});

describe("PUT /api/webhooks/[id] — SSRF guard on update", () => {
  it("rejects an update that flips a webhook URL to loopback", async () => {
    const created = createWebhook({
      url: "https://example.com/initial",
      events: ["*"],
      kind: "custom",
    });

    const req = jsonRequest(`http://localhost/api/webhooks/${created.id}`, "PUT", {
      url: "http://localhost/internal",
    });
    const res = await webhookByIdRoute.PUT(req, {
      params: Promise.resolve({ id: created.id }),
    });
    assert.equal(res.status, 400, "PUT must reject loopback host");
  });
});

describe("POST /api/webhooks/[id]/test — defense in depth on dispatch", () => {
  it("does not exfiltrate response body when persisted URL is loopback", async () => {
    // Bypass schema by inserting directly via the DB layer.
    const stale = createWebhook({
      url: "http://127.0.0.1:1/should-be-blocked",
      events: ["*"],
      kind: "custom",
    });

    const req = new Request(`http://localhost/api/webhooks/${stale.id}/test`, { method: "POST" });
    const res = await webhookTestRoute.POST(req, {
      params: Promise.resolve({ id: stale.id }),
    });
    assert.equal(res.status, 200, "test endpoint still returns a structured diagnostic envelope");
    const body = await res.json();
    assert.equal(body.delivered, false, "blocked URL must not report a successful delivery");
    assert.equal(body.status, 0, "no upstream status from a guarded call");
    assert.equal(body.responseBody, "", "no upstream body must be exfiltrated");
    assert.ok(
      typeof body.error === "string" && /block|private|invalid/i.test(body.error),
      `error message must signal the block: ${body.error}`
    );
  });
});
