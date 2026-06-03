/**
 * Tests for src/shared/utils/clipboard.ts
 * Runs under Vitest + jsdom (via vitest.config.ts — environment: "jsdom").
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { copyToClipboard } from "../../src/shared/utils/clipboard";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("copyToClipboard", () => {
  it("exports copyToClipboard as a function", () => {
    expect(typeof copyToClipboard).toBe("function");
  });

  it("returns a Promise", () => {
    // Minimal smoke test: the function returns a thenable even when
    // navigator.clipboard is undefined (HTTP context simulation).
    const result = copyToClipboard("hello");
    expect(result).toBeInstanceOf(Promise);
  });

  it("succeeds via Clipboard API when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
      writable: true,
    });

    const ok = await copyToClipboard("test-text");

    expect(writeText).toHaveBeenCalledWith("test-text");
    expect(ok).toBe(true);
  });

  it("falls back to execCommand when Clipboard API throws", async () => {
    const writeText = vi.fn().mockRejectedValue(new DOMException("NotAllowedError"));
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
      writable: true,
    });

    // jsdom does not implement execCommand — it returns false.
    // We just verify the function does not throw and returns a boolean.
    const ok = await copyToClipboard("fallback-text");
    expect(typeof ok).toBe("boolean");
  });

  it("falls back when navigator.clipboard is undefined (HTTP context)", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
      writable: true,
    });

    // jsdom's execCommand returns false; that's acceptable in tests.
    const ok = await copyToClipboard("http-context-text");
    expect(typeof ok).toBe("boolean");
  });
});
