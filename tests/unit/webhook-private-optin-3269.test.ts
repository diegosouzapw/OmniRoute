/**
 * #3269: webhooks could not target a private/internal address (10.x, 192.168.x, a
 * docker-internal host) — common for self-hosted automation (n8n, Home Assistant).
 * The webhook URL guard now allows private targets only when the operator opts in via
 * the existing `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` flag (default OFF). Protocol and
 * embedded-credential checks stay unconditional.
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-wh-3269-"));

const { OutboundUrlGuardError } = await import("../../src/shared/network/outboundUrlGuard.ts");
const { parseAndValidateWebhookUrl } = await import(
  "../../src/shared/network/outboundUrlGuardPolicy.ts"
);
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const FLAG = "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS";

describe("parseAndValidateWebhookUrl — private target opt-in (#3269)", () => {
  it("blocks a private webhook URL when the opt-in is off (default)", () => {
    delete process.env[FLAG];
    assert.throws(
      () => parseAndValidateWebhookUrl("http://192.168.0.10/hook"),
      OutboundUrlGuardError
    );
  });

  it("allows a private webhook URL when OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS=true", () => {
    process.env[FLAG] = "true";
    try {
      const url = parseAndValidateWebhookUrl("http://192.168.0.10/hook");
      assert.equal(url.hostname, "192.168.0.10");
    } finally {
      delete process.env[FLAG];
    }
  });

  it("still blocks embedded credentials even with the opt-in on", () => {
    process.env[FLAG] = "true";
    try {
      assert.throws(
        () => parseAndValidateWebhookUrl("http://user:pass@192.168.0.10/hook"),
        OutboundUrlGuardError
      );
    } finally {
      delete process.env[FLAG];
    }
  });

  it("still blocks non-http(s) schemes even with the opt-in on", () => {
    process.env[FLAG] = "true";
    try {
      assert.throws(() => parseAndValidateWebhookUrl("file:///etc/passwd"), OutboundUrlGuardError);
    } finally {
      delete process.env[FLAG];
    }
  });

  it("allows a normal public URL regardless of the flag", () => {
    delete process.env[FLAG];
    const url = parseAndValidateWebhookUrl("https://hooks.example.com/abc");
    assert.equal(url.hostname, "hooks.example.com");
  });
});

after(() => {
  try {
    resetDbInstance();
  } catch {
    /* ignore */
  }
  try {
    fs.rmSync(process.env.DATA_DIR as string, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});
