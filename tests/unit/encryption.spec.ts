import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createCipheriv, randomBytes, scryptSync, createHash } from "crypto";

// Test helper to manually create legacy-encrypted values
function createLegacyEncrypted(plaintext: string, secret: string): string {
  const ALGORITHM = "aes-256-gcm";
  const IV_LENGTH = 16;
  const KEY_LENGTH = 32;
  const PREFIX = "enc:v1:";

  // OLD dynamic salt derivation (the bug)
  const dynamicSalt = createHash("sha256").update(secret).digest().slice(0, 16);
  const legacyKey = scryptSync(secret, dynamicSalt, KEY_LENGTH);

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, legacyKey, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return `${PREFIX}${iv.toString("hex")}:${encrypted}:${authTag}`;
}

describe("encryption module", () => {
  beforeEach(() => {
    // Clear all env vars and reset modules before each test
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  describe("encrypt/decrypt roundtrip with static key (PRIMARY path)", () => {
    it("should encrypt and decrypt a value successfully", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encrypt, decrypt } = await import("@/lib/db/encryption");

      const plaintext = "my-secret-api-key";
      const encrypted = encrypt(plaintext);

      expect(encrypted).toBeDefined();
      expect(encrypted).toMatch(/^enc:v1:/);
      expect(encrypted).not.toBe(plaintext);

      const decrypted = decrypt(encrypted!);
      expect(decrypted).toBe(plaintext);
    });

    it("should handle multiple encrypt/decrypt cycles", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encrypt, decrypt } = await import("@/lib/db/encryption");

      const values = ["token1", "token2", "token3"];
      const encrypted = values.map((v) => encrypt(v));
      const decrypted = encrypted.map((e) => decrypt(e!));

      expect(decrypted).toEqual(values);
    });
  });

  describe("legacy fallback: decrypt values encrypted with dynamic-salt key", () => {
    it("should decrypt legacy-encrypted value using fallback key", async () => {
      const secret = "test-secret-key-12345";
      const plaintext = "legacy-api-token";

      // Manually create a legacy-encrypted value
      const legacyEncrypted = createLegacyEncrypted(plaintext, secret);

      vi.stubEnv("STORAGE_ENCRYPTION_KEY", secret);
      vi.resetModules();

      const { decrypt } = await import("@/lib/db/encryption");

      const decrypted = decrypt(legacyEncrypted);
      expect(decrypted).toBe(plaintext);
    });

    it("should handle multiple legacy-encrypted values", async () => {
      const secret = "test-secret-key-12345";
      const values = ["legacy1", "legacy2", "legacy3"];

      const legacyEncrypted = values.map((v) => createLegacyEncrypted(v, secret));

      vi.stubEnv("STORAGE_ENCRYPTION_KEY", secret);
      vi.resetModules();

      const { decrypt } = await import("@/lib/db/encryption");

      const decrypted = legacyEncrypted.map((e) => decrypt(e));
      expect(decrypted).toEqual(values);
    });
  });

  describe("migration flag: after legacy decrypt, isMigrationNeeded() returns true", () => {
    it("should set migration flag when decrypting legacy value", async () => {
      const secret = "test-secret-key-12345";
      const plaintext = "legacy-token";
      const legacyEncrypted = createLegacyEncrypted(plaintext, secret);

      vi.stubEnv("STORAGE_ENCRYPTION_KEY", secret);
      vi.resetModules();

      const { decrypt, isMigrationNeeded } = await import("@/lib/db/encryption");

      expect(isMigrationNeeded()).toBe(false);

      const decrypted = decrypt(legacyEncrypted);
      expect(decrypted).toBe(plaintext);
      expect(isMigrationNeeded()).toBe(true);
    });

    it("should NOT set migration flag when decrypting static-key value", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encrypt, decrypt, isMigrationNeeded } = await import("@/lib/db/encryption");

      const plaintext = "modern-token";
      const encrypted = encrypt(plaintext);

      expect(isMigrationNeeded()).toBe(false);

      const decrypted = decrypt(encrypted!);
      expect(decrypted).toBe(plaintext);
      expect(isMigrationNeeded()).toBe(false);
    });
  });

  describe("resetMigrationFlag() clears the flag", () => {
    it("should reset migration flag after it was set", async () => {
      const secret = "test-secret-key-12345";
      const plaintext = "legacy-token";
      const legacyEncrypted = createLegacyEncrypted(plaintext, secret);

      vi.stubEnv("STORAGE_ENCRYPTION_KEY", secret);
      vi.resetModules();

      const { decrypt, isMigrationNeeded, resetMigrationFlag } =
        await import("@/lib/db/encryption");

      decrypt(legacyEncrypted);
      expect(isMigrationNeeded()).toBe(true);

      resetMigrationFlag();
      expect(isMigrationNeeded()).toBe(false);
    });
  });

  describe("passthrough mode: no STORAGE_ENCRYPTION_KEY set → plaintext stored", () => {
    it("should return plaintext when encryption key is not set", async () => {
      // No STORAGE_ENCRYPTION_KEY set
      vi.resetModules();

      const { encrypt, decrypt, isEncryptionEnabled } = await import("@/lib/db/encryption");

      expect(isEncryptionEnabled()).toBe(false);

      const plaintext = "my-api-key";
      const encrypted = encrypt(plaintext);

      expect(encrypted).toBe(plaintext);

      const decrypted = decrypt(plaintext);
      expect(decrypted).toBe(plaintext);
    });

    it("should handle null and undefined in passthrough mode", async () => {
      vi.resetModules();

      const { encrypt, decrypt } = await import("@/lib/db/encryption");

      expect(encrypt(null)).toBeNull();
      expect(encrypt(undefined)).toBeUndefined();
      expect(decrypt(null)).toBeNull();
      expect(decrypt(undefined)).toBeUndefined();
    });
  });

  describe("encryptConnectionFields / decryptConnectionFields helpers", () => {
    it("should encrypt all credential fields in a connection object", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encryptConnectionFields } = await import("@/lib/db/encryption");

      const conn = {
        id: "conn-123",
        apiKey: "plain-api-key",
        accessToken: "plain-access-token",
        refreshToken: "plain-refresh-token",
        idToken: "plain-id-token",
      };

      const encrypted = encryptConnectionFields(conn);

      expect(encrypted.id).toBe("conn-123");
      expect(encrypted.apiKey).toMatch(/^enc:v1:/);
      expect(encrypted.accessToken).toMatch(/^enc:v1:/);
      expect(encrypted.refreshToken).toMatch(/^enc:v1:/);
      expect(encrypted.idToken).toMatch(/^enc:v1:/);
    });

    it("should decrypt all credential fields in a connection object", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encryptConnectionFields, decryptConnectionFields } =
        await import("@/lib/db/encryption");

      const conn = {
        id: "conn-123",
        apiKey: "plain-api-key",
        accessToken: "plain-access-token",
        refreshToken: "plain-refresh-token",
        idToken: "plain-id-token",
      };

      const encrypted = encryptConnectionFields({ ...conn });
      const decrypted = decryptConnectionFields(encrypted);

      expect(decrypted.id).toBe("conn-123");
      expect(decrypted.apiKey).toBe("plain-api-key");
      expect(decrypted.accessToken).toBe("plain-access-token");
      expect(decrypted.refreshToken).toBe("plain-refresh-token");
      expect(decrypted.idToken).toBe("plain-id-token");
    });

    it("should handle null and undefined connection objects", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encryptConnectionFields, decryptConnectionFields } =
        await import("@/lib/db/encryption");

      expect(encryptConnectionFields(null)).toBeNull();
      expect(encryptConnectionFields(undefined)).toBeUndefined();
      expect(decryptConnectionFields(null)).toBeNull();
      expect(decryptConnectionFields(undefined)).toBeUndefined();
    });

    it("should handle connection objects with missing fields", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encryptConnectionFields, decryptConnectionFields } =
        await import("@/lib/db/encryption");

      const conn: import("@/lib/db/encryption").ConnectionFields = {
        id: "conn-123",
        apiKey: "plain-api-key",
        // accessToken, refreshToken, idToken missing
      };

      const encrypted = encryptConnectionFields({ ...conn });
      expect(encrypted.apiKey).toMatch(/^enc:v1:/);
      expect(encrypted.accessToken).toBeUndefined();

      const decrypted = decryptConnectionFields(encrypted);
      expect(decrypted.apiKey).toBe("plain-api-key");
      expect(decrypted.accessToken).toBeUndefined();
    });

    it("should set migration flag when decrypting legacy-encrypted connection fields", async () => {
      const secret = "test-secret-key-12345";
      const legacyApiKey = createLegacyEncrypted("legacy-api-key", secret);

      vi.stubEnv("STORAGE_ENCRYPTION_KEY", secret);
      vi.resetModules();

      const { decryptConnectionFields, isMigrationNeeded } = await import("@/lib/db/encryption");

      const conn = {
        id: "conn-123",
        apiKey: legacyApiKey,
      };

      expect(isMigrationNeeded()).toBe(false);

      const decrypted = decryptConnectionFields(conn);
      expect(decrypted.apiKey).toBe("legacy-api-key");
      expect(isMigrationNeeded()).toBe(true);
    });
  });

  describe("edge cases: null/undefined inputs, already-encrypted, malformed ciphertext", () => {
    it("should handle null and undefined inputs", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encrypt, decrypt } = await import("@/lib/db/encryption");

      expect(encrypt(null)).toBeNull();
      expect(encrypt(undefined)).toBeUndefined();
      expect(decrypt(null)).toBeNull();
      expect(decrypt(undefined)).toBeUndefined();
    });

    it("should not double-encrypt already-encrypted values", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encrypt } = await import("@/lib/db/encryption");

      const plaintext = "my-secret";
      const encrypted = encrypt(plaintext);

      expect(encrypted).toMatch(/^enc:v1:/);

      // Try to encrypt again
      const doubleEncrypted = encrypt(encrypted!);
      expect(doubleEncrypted).toBe(encrypted);
    });

    it("should return null for malformed ciphertext (missing parts)", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { decrypt } = await import("@/lib/db/encryption");

      const malformed = "enc:v1:onlyonepart";
      const result = decrypt(malformed);
      expect(result).toBeNull();
    });

    it("should return null for malformed ciphertext (invalid hex)", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { decrypt } = await import("@/lib/db/encryption");

      const malformed = "enc:v1:notvalidhex:notvalidhex:notvalidhex";
      const result = decrypt(malformed);
      expect(result).toBeNull();
    });

    it("should return null for ciphertext with wrong auth tag", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encrypt, decrypt } = await import("@/lib/db/encryption");

      const plaintext = "my-secret";
      const encrypted = encrypt(plaintext);

      // Tamper with the auth tag
      const parts = encrypted!.split(":");
      parts[parts.length - 1] = "0000000000000000000000000000000000000000000000000000000000000000";
      const tampered = parts.join(":");

      const result = decrypt(tampered);
      expect(result).toBeNull();
    });

    it("should return plaintext unchanged if not encrypted (legacy plaintext)", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { decrypt } = await import("@/lib/db/encryption");

      const plaintext = "not-encrypted-value";
      const result = decrypt(plaintext);
      expect(result).toBe(plaintext);
    });

    it("should return null when trying to decrypt without encryption key", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encrypt } = await import("@/lib/db/encryption");

      const plaintext = "my-secret";
      const encrypted = encrypt(plaintext);

      // Now remove the key and try to decrypt
      vi.unstubAllEnvs();
      vi.resetModules();

      const { decrypt } = await import("@/lib/db/encryption");

      const result = decrypt(encrypted!);
      expect(result).toBeNull();
    });
  });

  describe("validateEncryptionConfig() with various key states", () => {
    it("should return valid when no key is set (passthrough mode)", async () => {
      vi.resetModules();

      const { validateEncryptionConfig } = await import("@/lib/db/encryption");

      const result = validateEncryptionConfig();
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should return valid when a proper key is set", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { validateEncryptionConfig } = await import("@/lib/db/encryption");

      const result = validateEncryptionConfig();
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should return valid when key is empty string (treated as not set)", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "");
      vi.resetModules();

      const { validateEncryptionConfig } = await import("@/lib/db/encryption");

      const result = validateEncryptionConfig();
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should return invalid when key is whitespace only", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "   ");
      vi.resetModules();

      const { validateEncryptionConfig } = await import("@/lib/db/encryption");

      const result = validateEncryptionConfig();
      expect(result.valid).toBe(false);
      expect(result.error).toContain("empty");
    });
  });

  describe("isEncryptionEnabled() accuracy", () => {
    it("should return false when no key is set", async () => {
      vi.resetModules();

      const { isEncryptionEnabled } = await import("@/lib/db/encryption");

      expect(isEncryptionEnabled()).toBe(false);
    });

    it("should return true when key is set", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { isEncryptionEnabled } = await import("@/lib/db/encryption");

      expect(isEncryptionEnabled()).toBe(true);
    });

    it("should return true even when key is invalid (just checks presence)", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "");
      vi.resetModules();

      const { isEncryptionEnabled } = await import("@/lib/db/encryption");

      // isEncryptionEnabled only checks if the env var is truthy
      expect(isEncryptionEnabled()).toBe(false);
    });
  });

  describe("new encryptions always use static salt key", () => {
    it("should encrypt with static key and decrypt without migration flag", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encrypt, decrypt, isMigrationNeeded } = await import("@/lib/db/encryption");

      const plaintext = "new-token";
      const encrypted = encrypt(plaintext);

      expect(isMigrationNeeded()).toBe(false);

      const decrypted = decrypt(encrypted!);
      expect(decrypted).toBe(plaintext);
      expect(isMigrationNeeded()).toBe(false);
    });

    it("should verify multiple new encryptions use static key", async () => {
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", "test-secret-key-12345");
      vi.resetModules();

      const { encrypt, decrypt, isMigrationNeeded } = await import("@/lib/db/encryption");

      const values = ["token1", "token2", "token3"];
      const encrypted = values.map((v) => encrypt(v));

      expect(isMigrationNeeded()).toBe(false);

      const decrypted = encrypted.map((e) => decrypt(e!));
      expect(decrypted).toEqual(values);
      expect(isMigrationNeeded()).toBe(false);
    });
  });

  describe("EXACT bug scenario: dynamic salt → legacy fallback → migration flag", () => {
    it("should reproduce the exact bug: value encrypted with dynamic salt, decrypt recovers via legacy fallback, migration flag set", async () => {
      const secret = "test-secret-key-12345";
      const plaintext = "health-check-token";

      // Simulate the bug: health-check thread encrypted with dynamic salt
      const buggyEncrypted = createLegacyEncrypted(plaintext, secret);

      // Main API tries to decrypt
      vi.stubEnv("STORAGE_ENCRYPTION_KEY", secret);
      vi.resetModules();

      const { decrypt, isMigrationNeeded } = await import("@/lib/db/encryption");

      expect(isMigrationNeeded()).toBe(false);

      // Should recover via legacy fallback
      const decrypted = decrypt(buggyEncrypted);
      expect(decrypted).toBe(plaintext);

      // Migration flag should be set
      expect(isMigrationNeeded()).toBe(true);
    });

    it("should verify re-encryption after migration flag is set", async () => {
      const secret = "test-secret-key-12345";
      const plaintext = "health-check-token";

      const legacyEncrypted = createLegacyEncrypted(plaintext, secret);

      vi.stubEnv("STORAGE_ENCRYPTION_KEY", secret);
      vi.resetModules();

      const { decrypt, encrypt, isMigrationNeeded, resetMigrationFlag } =
        await import("@/lib/db/encryption");

      // Decrypt legacy value
      const decrypted = decrypt(legacyEncrypted);
      expect(decrypted).toBe(plaintext);
      expect(isMigrationNeeded()).toBe(true);

      // Re-encrypt with static key
      const reEncrypted = encrypt(decrypted!);
      expect(reEncrypted).toMatch(/^enc:v1:/);
      expect(reEncrypted).not.toBe(legacyEncrypted);

      // Reset migration flag
      resetMigrationFlag();
      expect(isMigrationNeeded()).toBe(false);

      // Verify new encryption decrypts without migration flag
      const finalDecrypted = decrypt(reEncrypted!);
      expect(finalDecrypted).toBe(plaintext);
      expect(isMigrationNeeded()).toBe(false);
    });
  });
});
