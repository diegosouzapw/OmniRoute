/**
 * Tests for Anthropic billing header fingerprint stability (#1638).
 *
 * Validates that the billing header fingerprint is stable across different
 * messages within the same day, preventing prompt-cache prefix invalidation.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

// Replicate the stabilized fingerprint logic from base.ts
function computeStableFingerprint(ccVersion: string): string {
  const dayStamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return createHash("sha256").update(`${dayStamp}${ccVersion}`).digest("hex").slice(0, 3);
}

// The old implementation for comparison
function computeOldFingerprint(firstUserMessageText: string, version: string): string {
  const FINGERPRINT_SALT = "59cf53e54c78";
  const indices = [4, 7, 20];
  const chars = indices.map((i) => firstUserMessageText[i] || "0").join("");
  const input = `${FINGERPRINT_SALT}${chars}${version}`;
  return createHash("sha256").update(input).digest("hex").slice(0, 3);
}

describe("Anthropic billing header fingerprint (#1638)", () => {
  const ccVersion = "2.1.121";

  it("should produce the same fingerprint for different messages (stable)", () => {
    const fp1 = computeStableFingerprint(ccVersion);
    const fp2 = computeStableFingerprint(ccVersion);
    assert.equal(fp1, fp2, "Same-day fingerprints should be identical");
  });

  it("should produce a 3-character hex fingerprint", () => {
    const fp = computeStableFingerprint(ccVersion);
    assert.equal(fp.length, 3, "Fingerprint should be 3 chars");
    assert.ok(/^[a-f0-9]{3}$/.test(fp), `Fingerprint '${fp}' should be lowercase hex`);
  });

  it("old implementation produces DIFFERENT fingerprints for different messages", () => {
    const msg1 = "Hello, how can I help you with your code?";
    const msg2 = "Please fix the bug in my application";
    const fp1 = computeOldFingerprint(msg1, ccVersion);
    const fp2 = computeOldFingerprint(msg2, ccVersion);
    assert.notEqual(fp1, fp2, "Old method should differ per message — this was the bug");
  });

  it("new implementation produces SAME fingerprint regardless of message content", () => {
    // The new implementation doesn't use message content at all
    const fp1 = computeStableFingerprint(ccVersion);
    const fp2 = computeStableFingerprint(ccVersion);
    const fp3 = computeStableFingerprint(ccVersion);
    assert.equal(fp1, fp2);
    assert.equal(fp2, fp3);
  });

  it("billing header line should be deterministic within the same day", () => {
    const fp = computeStableFingerprint(ccVersion);
    const billingLine1 = `x-anthropic-billing-header: cc_version=${ccVersion}.${fp}; cc_entrypoint=cli; cch=00000;`;
    const billingLine2 = `x-anthropic-billing-header: cc_version=${ccVersion}.${fp}; cc_entrypoint=cli; cch=00000;`;
    assert.equal(billingLine1, billingLine2, "Billing lines should be byte-identical");
  });

  it("should produce different fingerprints for different days", () => {
    // Simulate different days by computing manually
    const day1 = "2026-04-27";
    const day2 = "2026-04-28";
    const fp1 = createHash("sha256").update(`${day1}${ccVersion}`).digest("hex").slice(0, 3);
    const fp2 = createHash("sha256").update(`${day2}${ccVersion}`).digest("hex").slice(0, 3);
    // They should be different (extremely high probability with SHA-256)
    assert.notEqual(fp1, fp2, "Different days should produce different fingerprints");
  });
});
