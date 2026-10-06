/**
 * Outbound URL guard: IPv4-mapped IPv6 coverage.
 *
 * `new URL()` serialises an IPv4-mapped IPv6 host as hextets
 * (`[::ffff:169.254.169.254]` -> `[::ffff:a9fe:a9fe]`), so a guard that matches the
 * dotted spelling never sees the address it is meant to reject. These tests pin the
 * mapped spellings for both the unconditional cloud-metadata block and the
 * private-host block, and pin `::` alongside its `0.0.0.0` twin.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/outbound-guard-mapped-ipv4.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  isCloudMetadataHost,
  isPrivateHost,
  parseAndValidateNonMetadataUrl,
  parseAndValidatePublicUrl,
  OutboundUrlGuardError,
} from "../../src/shared/network/outboundUrlGuard.ts";

// Each entry is the URL an attacker supplies and the address it actually routes to.
const MAPPED_METADATA_URLS = [
  ["http://[::ffff:169.254.169.254]/latest/meta-data/", "169.254.169.254 (AWS/GCP/Azure IMDS)"],
  ["http://[::ffff:a9fe:a9fe]/latest/meta-data/", "169.254.169.254 via hextet spelling"],
  ["http://[::ffff:100.100.100.200]/latest/meta-data/", "100.100.100.200 (Alibaba Cloud)"],
  ["http://[::ffff:169.254.170.2]/v2/credentials", "169.254.170.2 (ECS task role)"],
] as const;

describe("isCloudMetadataHost - IPv4-mapped IPv6", () => {
  for (const [url, described] of MAPPED_METADATA_URLS) {
    it(`treats ${new URL(url).hostname} as metadata (${described})`, () => {
      assert.equal(isCloudMetadataHost(new URL(url).hostname), true);
    });
  }

  it("still accepts public hosts", () => {
    for (const host of [
      "api.openai.com",
      "1.1.1.1",
      "[2606:4700:4700::1111]",
      "[::ffff:1.1.1.1]",
    ]) {
      assert.equal(isCloudMetadataHost(host), false, `${host} must not be treated as metadata`);
    }
  });
});

describe("parseAndValidateNonMetadataUrl - metadata stays blocked when private URLs are allowed", () => {
  // This guard mode intentionally permits LAN/loopback provider endpoints, so the
  // cloud-metadata block is the only control standing between it and IMDS credentials.
  for (const [url] of MAPPED_METADATA_URLS) {
    it(`rejects ${url}`, () => {
      assert.throws(
        () => parseAndValidateNonMetadataUrl(url),
        (error: unknown) =>
          error instanceof OutboundUrlGuardError && error.code === "OUTBOUND_URL_GUARD_BLOCKED"
      );
    });
  }

  it("still allows a private LAN provider endpoint", () => {
    assert.equal(
      parseAndValidateNonMetadataUrl("http://192.168.1.50:11434/v1").hostname,
      "192.168.1.50"
    );
  });
});

describe("isPrivateHost - unspecified address", () => {
  it("blocks :: alongside 0.0.0.0", () => {
    // Connecting to `::` reaches a service bound to the IPv6 loopback.
    assert.equal(isPrivateHost("::"), true);
    assert.equal(isPrivateHost("[::]"), true);
    assert.equal(isPrivateHost("0.0.0.0"), true);
  });

  it("rejects http://[::]/ through the strict guard", () => {
    assert.throws(() => parseAndValidatePublicUrl("http://[::]/"), OutboundUrlGuardError);
  });
});
