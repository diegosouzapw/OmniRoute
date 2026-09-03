import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { z } from "zod";

// ─── maskApiKey ───────────────────────────────────────
// Exact replica of the function from
// src/app/api/v1/agents/credentials/route.ts:31-34

function maskApiKey(key: string): string {
  if (key.length <= 4) return "****";
  return "****" + key.slice(-4);
}

// ─── SaveCredentialSchema ─────────────────────────────
// Exact replica of the schema from
// src/app/api/v1/agents/credentials/route.ts:13-17

const SaveCredentialSchema = z.object({
  providerId: z.enum(["jules", "devin", "codex-cloud"]),
  apiKey: z.string().min(1),
  baseUrl: z.string().url().optional(),
});

describe("cloud-agent credentials API — maskApiKey", () => {
  test('returns "****" for a 1-char key', () => {
    assert.equal(maskApiKey("x"), "****");
  });

  test('returns "****" for exactly 4-char key', () => {
    assert.equal(maskApiKey("abcd"), "****");
  });

  test('returns "****" for empty string', () => {
    assert.equal(maskApiKey(""), "****");
  });

  test("shows last 4 chars for a longer key", () => {
    assert.equal(maskApiKey("sk-1234567890"), "****7890");
  });

  test("shows last 4 chars for a 5-char key", () => {
    assert.equal(maskApiKey("abcde"), "****bcde");
  });

  test("always starts with ****", () => {
    const result = maskApiKey("very-long-api-key-here");
    assert.ok(result.startsWith("****"));
  });
});

describe("cloud-agent credentials API — SaveCredentialSchema validation", () => {
  test("accepts valid body with all required fields", () => {
    const result = SaveCredentialSchema.safeParse({
      providerId: "jules",
      apiKey: "my-secret-key",
    });
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.providerId, "jules");
      assert.equal(result.data.apiKey, "my-secret-key");
    }
  });

  test("accepts valid body with optional baseUrl", () => {
    const result = SaveCredentialSchema.safeParse({
      providerId: "devin",
      apiKey: "key123",
      baseUrl: "https://api.example.com",
    });
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.baseUrl, "https://api.example.com");
    }
  });

  test("accepts all three valid providerIds", () => {
    for (const id of ["jules", "devin", "codex-cloud"]) {
      const result = SaveCredentialSchema.safeParse({ providerId: id, apiKey: "k" });
      assert.equal(result.success, true, `Expected success for providerId="${id}"`);
    }
  });

  test("rejects missing providerId", () => {
    const result = SaveCredentialSchema.safeParse({ apiKey: "my-key" });
    assert.equal(result.success, false);
  });

  test("rejects invalid providerId", () => {
    const result = SaveCredentialSchema.safeParse({
      providerId: "unknown-agent",
      apiKey: "my-key",
    });
    assert.equal(result.success, false);
  });

  test("rejects empty apiKey", () => {
    const result = SaveCredentialSchema.safeParse({
      providerId: "jules",
      apiKey: "",
    });
    assert.equal(result.success, false);
  });

  test("rejects missing apiKey", () => {
    const result = SaveCredentialSchema.safeParse({ providerId: "jules" });
    assert.equal(result.success, false);
  });

  test("rejects invalid baseUrl format", () => {
    const result = SaveCredentialSchema.safeParse({
      providerId: "jules",
      apiKey: "key",
      baseUrl: "not-a-url",
    });
    assert.equal(result.success, false);
  });
});
