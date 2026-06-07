/**
 * Security hardening for #3269: even when private webhook targets are opted in via
 * OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS, cloud-metadata / link-local endpoints
 * (169.254.169.254, metadata.google.internal, 100.100.100.200, 169.254.0.0/16) must be
 * blocked UNCONDITIONALLY — they are the classic SSRF→IAM-credential pivot and have no
 * legitimate webhook use case.
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-wh-meta-3269-"));

const { parseAndValidateWebhookUrl, isCloudMetadataHost, OutboundUrlGuardError } = await import(
  "../../src/shared/network/outboundUrlGuard.ts"
);
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const FLAG = "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS";
const METADATA_TARGETS = [
  "http://169.254.169.254/latest/meta-data/iam/security-credentials/",
  "http://metadata.google.internal/computeMetadata/v1/",
  "http://100.100.100.200/latest/meta-data/",
  "http://169.254.1.2/anything",
];

describe("webhook guard blocks cloud-metadata unconditionally (#3269 hardening)", () => {
  it("isCloudMetadataHost flags the known metadata + link-local hosts", () => {
    assert.equal(isCloudMetadataHost("169.254.169.254"), true);
    assert.equal(isCloudMetadataHost("metadata.google.internal"), true);
    assert.equal(isCloudMetadataHost("100.100.100.200"), true);
    assert.equal(isCloudMetadataHost("169.254.55.66"), true);
    assert.equal(isCloudMetadataHost("10.0.0.5"), false);
    assert.equal(isCloudMetadataHost("hooks.example.com"), false);
  });

  it("blocks metadata targets even when the private opt-in is ON", () => {
    process.env[FLAG] = "true";
    try {
      for (const target of METADATA_TARGETS) {
        assert.throws(
          () => parseAndValidateWebhookUrl(target),
          OutboundUrlGuardError,
          `expected ${target} to be blocked`
        );
      }
    } finally {
      delete process.env[FLAG];
    }
  });

  it("still allows a normal private LAN host when opted in (not metadata)", () => {
    process.env[FLAG] = "true";
    try {
      const url = parseAndValidateWebhookUrl("http://192.168.0.10/hook");
      assert.equal(url.hostname, "192.168.0.10");
    } finally {
      delete process.env[FLAG];
    }
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
