// SSRF regression guard for kiro region — GHSA-6mwv-4mrm-5p3m.
// Without the assertValidAwsRegion guard, a malicious region value
// would be interpolated directly into upstream URLs like
// `https://oidc.${region}.amazonaws.com/token`, allowing the caller to
// redirect the proxy to arbitrary hosts (file://, 127.0.0.1, EC2 metadata, etc).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  AWS_REGION_PATTERN,
  assertValidAwsRegion,
} from "../../src/lib/oauth/constants/oauth";
import { KiroService } from "../../src/lib/oauth/services/kiro";

describe("AWS_REGION_PATTERN", () => {
  it("accepts canonical AWS regions", () => {
    for (const r of [
      "us-east-1",
      "us-west-2",
      "eu-west-1",
      "ap-southeast-2",
      "ca-central-1",
      "sa-east-1",
      "me-south-1",
      "af-south-1",
      "eu-central-2",
    ]) {
      assert.ok(AWS_REGION_PATTERN.test(r), `expected ${r} to match`);
    }
  });

  it("rejects SSRF-shaped values", () => {
    for (const bad of [
      "127.0.0.1",
      "169.254.169.254",
      "localhost",
      "evil.example.com",
      "us-east-1.evil.com",
      "us-east-1/../foo",
      "us-east-1#frag",
      "us-east-1?x=1",
      "file:///etc/passwd",
      "http://internal",
      "",
      "US-EAST-1", // wrong case
      "us_east_1",
      "us-east-",
      "-east-1",
      "us--east-1",
    ]) {
      assert.ok(!AWS_REGION_PATTERN.test(bad), `expected ${bad!} to be rejected`);
    }
  });
});

describe("assertValidAwsRegion", () => {
  it("returns the region when valid", () => {
    assert.equal(assertValidAwsRegion("us-east-1"), "us-east-1");
  });

  it("throws on non-string", () => {
    assert.throws(() => assertValidAwsRegion(undefined as unknown as string));
    assert.throws(() => assertValidAwsRegion(null as unknown as string));
    assert.throws(() => assertValidAwsRegion(123 as unknown as string));
  });

  it("throws on invalid region", () => {
    assert.throws(() => assertValidAwsRegion("127.0.0.1"));
    assert.throws(() => assertValidAwsRegion("evil.com"));
    assert.throws(() => assertValidAwsRegion(""));
  });
});

describe("KiroService SSRF guard", () => {
  const svc = new KiroService();

  it("registerClient rejects malicious region", async () => {
    await assert.rejects(() => svc.registerClient("127.0.0.1"));
    await assert.rejects(() => svc.registerClient("evil.example.com"));
  });

  it("startDeviceAuthorization rejects malicious region", async () => {
    await assert.rejects(() =>
      svc.startDeviceAuthorization("cid", "csec", "https://x", "169.254.169.254")
    );
  });

  it("pollDeviceToken rejects malicious region", async () => {
    await assert.rejects(() =>
      svc.pollDeviceToken("cid", "csec", "dc", "127.0.0.1")
    );
  });

  it("validateImportToken rejects malicious region before fetching", async () => {
    await assert.rejects(() => svc.validateImportToken("aorAAAAAGfoo", "127.0.0.1"));
  });
});
