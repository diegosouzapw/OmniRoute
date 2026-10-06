/**
 * GHSA-7x63-xvp5-w2jc — the kiro / amazon-q device-code action interpolates a
 * caller-supplied `region` into the AWS OIDC endpoint URLs that requestDeviceCode()
 * fetches. An attacker-shaped region (userinfo / fragment) re-points the outbound
 * host (SSRF → cloud metadata). The route must reject a non-canonical region with
 * a 400 before any outbound fetch.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-oauth-region-ssrf-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function deviceCode(provider: string, region: string) {
  const url =
    `http://localhost/api/oauth/${provider}/device-code` +
    `?startUrl=${encodeURIComponent("https://d-1234567890.awsapps.com/start")}` +
    `&region=${encodeURIComponent(region)}`;
  return route.GET(new Request(url) as unknown as NextRequest, {
    params: Promise.resolve({ provider, action: "device-code" }),
  });
}

test("kiro device-code rejects a non-canonical region before any outbound fetch (GHSA-7x63)", async () => {
  for (const bad of [
    "evil.com",
    "169.254.169.254",
    "us-east-1@169.254.169.254",
    "us-east-1#.amazonaws.com@evil.com",
    "us-east-1/../..",
    "US-EAST-1", // uppercase is not the canonical shape
  ]) {
    const res = await deviceCode("kiro", bad);
    assert.equal(res.status, 400, `region "${bad}" must be rejected with 400`);
  }
});

test("amazon-q device-code also validates region", async () => {
  const res = await deviceCode("amazon-q", "evil.com:1@169.254.169.254");
  assert.equal(res.status, 400);
});
