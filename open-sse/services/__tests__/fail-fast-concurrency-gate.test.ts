import { describe, it, expect, beforeEach } from "vitest";
import { acquire, isAccountSemaphoreFull, resetAll } from "../accountSemaphore.ts";

describe("isAccountSemaphoreFull fail-fast concurrency gate", () => {
  beforeEach(() => {
    resetAll();
  });

  it("returns false when no semaphore gate exists", () => {
    expect(isAccountSemaphoreFull("featherless-ai", "conn-1", 1)).toBe(false);
  });

  it("returns false when maxConcurrency is null, <= 0, or bypassed", () => {
    expect(isAccountSemaphoreFull("featherless-ai", "conn-1", null)).toBe(false);
    expect(isAccountSemaphoreFull("featherless-ai", "conn-1", 0)).toBe(false);
  });

  it("returns false when running < maxConcurrency", async () => {
    const release = await acquire("featherless-ai:conn-1", { maxConcurrency: 2 });
    expect(isAccountSemaphoreFull("featherless-ai", "conn-1", 2)).toBe(false);
    release();
  });

  it("returns true immediately when running >= maxConcurrency", async () => {
    const release = await acquire("featherless-ai:conn-1", { maxConcurrency: 1 });
    expect(isAccountSemaphoreFull("featherless-ai", "conn-1", 1)).toBe(true);
    release();
    expect(isAccountSemaphoreFull("featherless-ai", "conn-1", 1)).toBe(false);
  });
});
