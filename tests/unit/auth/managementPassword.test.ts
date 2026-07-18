// @vitest-environment node
import { describe, it, expect } from "vitest";
import {
  hashManagementPassword,
  verifyManagementPassword,
  isBcryptHash,
  isArgon2idHash,
} from "../../../src/lib/auth/managementPassword";

const STRONG_PASSWORD = "Correct-Horse-Battery-Staple-2026!";
const WRONG_PASSWORD = "wrong-password";

describe("managementPassword", () => {
  it("hashes with argon2id by default", async () => {
    const hash = await hashManagementPassword(STRONG_PASSWORD);
    expect(isArgon2idHash(hash)).toBe(true);
    expect(isBcryptHash(hash)).toBe(false);
  });

  it("verifies a freshly-hashed argon2id password", async () => {
    const hash = await hashManagementPassword(STRONG_PASSWORD);
    expect(await verifyManagementPassword(STRONG_PASSWORD, hash)).toBe(true);
    expect(await verifyManagementPassword(WRONG_PASSWORD, hash)).toBe(false);
  });

  it("detects argon2 hashes by prefix", () => {
    expect(isArgon2idHash("$argon2id$v=19$m=19456,t=2,p=1$abcd")).toBe(true);
    expect(isArgon2idHash("$argon2i$v=19$m=19456,t=2,p=1$abcd")).toBe(true);
    expect(isArgon2idHash("$2b$10$abcdefghijklmnopqrstuvwxyz1234567890")).toBe(false);
  });

  it("detects bcrypt hashes by prefix", () => {
    expect(isBcryptHash("$2b$10$abcdefghijklmnopqrstuv")).toBe(true);
    expect(isBcryptHash("$2a$10$abcdefghijklmnopqrstuv")).toBe(true);
    expect(isBcryptHash("$argon2id$v=19$abcd")).toBe(false);
  });

  it("rejects empty / malformed passwords", async () => {
    await expect(hashManagementPassword("")).rejects.toThrow();
    expect(await verifyManagementPassword(STRONG_PASSWORD, "")).toBe(false);
    expect(await verifyManagementPassword(STRONG_PASSWORD, "garbage")).toBe(false);
  });

  it("verifyManagementPassword still accepts legacy bcrypt hashes (no upgrade required)", async () => {
    const bcrypt = await import("bcryptjs");
    const legacyHash = await bcrypt.hash(STRONG_PASSWORD, 10);
    expect(isBcryptHash(legacyHash)).toBe(true);
    expect(await verifyManagementPassword(STRONG_PASSWORD, legacyHash)).toBe(true);
    expect(await verifyManagementPassword(WRONG_PASSWORD, legacyHash)).toBe(false);
  });
});