/**
 * Tests for CLI Memory Sanitization (bin/omniroute.mjs)
 *
 * Tests cover:
 * - Memory limit parsing and validation
 * - Command injection prevention
 * - Boundary values
 * - .env file loading
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ─── Memory Limit Sanitization Tests ─────────────────────────

describe("CLI Memory Limit Sanitization", () => {
  /**
   * Replicate the memory sanitization logic from bin/omniroute.mjs
   */
  function sanitizeMemoryLimit(envValue) {
    const rawMemory = parseInt(envValue || "512", 10);
    return Number.isFinite(rawMemory) && rawMemory >= 64 && rawMemory <= 16384 ? rawMemory : 512;
  }

  it("should default to 512 when no env var set", () => {
    assert.equal(sanitizeMemoryLimit(undefined), 512);
    assert.equal(sanitizeMemoryLimit(null), 512);
    assert.equal(sanitizeMemoryLimit(""), 512);
  });

  it("should accept valid numeric values", () => {
    assert.equal(sanitizeMemoryLimit("128"), 128);
    assert.equal(sanitizeMemoryLimit("256"), 256);
    assert.equal(sanitizeMemoryLimit("512"), 512);
    assert.equal(sanitizeMemoryLimit("1024"), 1024);
    assert.equal(sanitizeMemoryLimit("2048"), 2048);
    assert.equal(sanitizeMemoryLimit("4096"), 4096);
    assert.equal(sanitizeMemoryLimit("8192"), 8192);
  });

  it("should accept boundary values", () => {
    assert.equal(sanitizeMemoryLimit("64"), 64); // minimum
    assert.equal(sanitizeMemoryLimit("16384"), 16384); // maximum
  });

  it("should reject values below minimum (64MB)", () => {
    assert.equal(sanitizeMemoryLimit("0"), 512);
    assert.equal(sanitizeMemoryLimit("1"), 512);
    assert.equal(sanitizeMemoryLimit("32"), 512);
    assert.equal(sanitizeMemoryLimit("63"), 512);
    assert.equal(sanitizeMemoryLimit("-1"), 512);
    assert.equal(sanitizeMemoryLimit("-9999"), 512);
  });

  it("should reject values above maximum (16384MB)", () => {
    assert.equal(sanitizeMemoryLimit("16385"), 512);
    assert.equal(sanitizeMemoryLimit("99999"), 512);
    assert.equal(sanitizeMemoryLimit("1000000"), 512);
  });

  // ── Command Injection Prevention ──────────────────────────

  it("should prevent command injection via shell metacharacters", () => {
    // parseInt('256; rm -rf /') returns 256 which is valid — but the sanitized
    // integer value is safe because it's a pure number, not a shell string
    const r1 = sanitizeMemoryLimit("256; rm -rf /");
    assert.equal(typeof r1, "number"); // always returns a safe number
    assert.ok(r1 >= 64 && r1 <= 16384); // within safe range

    // These produce NaN via parseInt → fallback to 512
    assert.equal(sanitizeMemoryLimit("`id`"), 512);
    assert.equal(sanitizeMemoryLimit("$(whoami)"), 512);
  });

  it("should prevent injection via Node.js spawn args", () => {
    // These would be dangerous if passed unsanitized to spawn()
    assert.equal(sanitizeMemoryLimit("--require=/tmp/malware.js"), 512);
    assert.equal(sanitizeMemoryLimit("--experimental-modules"), 512);
    assert.equal(sanitizeMemoryLimit("-e 'process.exit()'"), 512);
  });

  it("should handle non-numeric strings gracefully", () => {
    assert.equal(sanitizeMemoryLimit("abc"), 512);
    assert.equal(sanitizeMemoryLimit("twelve"), 512);
    assert.equal(sanitizeMemoryLimit("NaN"), 512);
    assert.equal(sanitizeMemoryLimit("Infinity"), 512);
    assert.equal(sanitizeMemoryLimit("undefined"), 512);
  });

  it("should handle special numeric formats", () => {
    // parseInt('0x100') = 0 (stops at 'x'), outside 64–16384? No, 0 < 64 → fallback
    assert.equal(sanitizeMemoryLimit("0x100"), 512);
    // parseInt('1e3') = 1, which is < 64 → fallback
    assert.equal(sanitizeMemoryLimit("1e3"), 512);
    assert.equal(sanitizeMemoryLimit("512.7"), 512); // parseInt truncates → 512 ✅
    assert.equal(sanitizeMemoryLimit("  256  "), 256); // whitespace → 256 ✅
  });
});

// ─── .env Loading Tests ──────────────────────────────────────

describe("CLI .env File Loading", () => {
  /**
   * Simulate the .env parsing logic from bin/omniroute.mjs
   */
  function parseEnvLine(line) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return null;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) return null;
    const key = trimmed.substring(0, eqIdx).trim();
    let value = trimmed.substring(eqIdx + 1).trim();
    // Remove surrounding quotes
    value = value.replace(/^["']|["']$/g, "");
    return { key, value };
  }

  it("should parse KEY=VALUE lines", () => {
    const result = parseEnvLine("PORT=3000");
    assert.deepEqual(result, { key: "PORT", value: "3000" });
  });

  it("should strip surrounding quotes", () => {
    const dq = parseEnvLine('JWT_SECRET="my-secret"');
    assert.deepEqual(dq, { key: "JWT_SECRET", value: "my-secret" });

    const sq = parseEnvLine("JWT_SECRET='my-secret'");
    assert.deepEqual(sq, { key: "JWT_SECRET", value: "my-secret" });
  });

  it("should skip comments", () => {
    assert.equal(parseEnvLine("# This is a comment"), null);
    assert.equal(parseEnvLine("  # Indented comment"), null);
  });

  it("should skip empty lines", () => {
    assert.equal(parseEnvLine(""), null);
    assert.equal(parseEnvLine("   "), null);
  });

  it("should skip lines without =", () => {
    assert.equal(parseEnvLine("MALFORMED_LINE"), null);
  });

  it("should handle values with equals signs", () => {
    const result = parseEnvLine("DATABASE_URL=postgres://user:pass@host:5432/db?sslmode=require");
    assert.equal(result.key, "DATABASE_URL");
    assert.equal(result.value, "postgres://user:pass@host:5432/db?sslmode=require");
  });

  it("should handle empty values", () => {
    const result = parseEnvLine("EMPTY_VAR=");
    assert.deepEqual(result, { key: "EMPTY_VAR", value: "" });
  });
});
