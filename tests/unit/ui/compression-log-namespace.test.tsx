// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CompressionLogTab from "@/app/(dashboard)/dashboard/logs/CompressionLogTab";

// Keys that CompressionLogTab uses from the "logs" namespace.
const LOGS_KEYS = ["loading", "compressionLogTitle", "compressionLogEmpty", "tokens"] as const;

// Track calls to useTranslations so we can assert the namespace.
const namespacesSeen: string[] = [];

// i18n stub that simulates next-intl's useTranslations.
// Only the "logs" namespace has the compression-related keys.
const logsMessages: Record<string, string> = {
  loading: "Loading...",
  compressionLogTitle: "Compression Log",
  compressionLogEmpty:
    "No compressed requests yet. Compression stats will appear here when requests are processed with compression enabled.",
  tokens: "tokens",
};

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    namespacesSeen.push(namespace);
    return (key: string) => {
      if (namespace === "logs") {
        return logsMessages[key] ?? `_MISSING_${key}`;
      }
      // Any other namespace returns a sentinel so tests can catch wrong namespace.
      return `_WRONG_NS_${namespace}_${key}`;
    };
  },
}));

// Mock fetch so the component doesn't fail on network calls.
vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    } as unknown as Response)
  )
);

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("CompressionLogTab — logs namespace", { timeout: 30000 }, () => {
  beforeEach(() => {
    namespacesSeen.length = 0;
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
  });

  it("renders without missing-key sentinels — all required logs.* keys are present", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<CompressionLogTab />);
    });

    // The rendered text must NOT contain any _MISSING_ or _WRONG_NS_ sentinel.
    const text = container.textContent ?? "";
    expect(text).not.toContain("_MISSING_");
    expect(text).not.toContain("_WRONG_NS_");
  });

  it("uses the 'logs' namespace (not 'settings')", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<CompressionLogTab />);
    });

    // Verify that useTranslations was called with "logs".
    expect(namespacesSeen).toContain("logs");
    // Must NOT have been called with "settings".
    expect(namespacesSeen).not.toContain("settings");
  });

  it("renders loading state text from logs namespace", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<CompressionLogTab />);
    });

    // Either the loading text or the empty state text should appear — both come from logs keys.
    const text = container.textContent ?? "";
    const hasExpectedText =
      text.includes(logsMessages.loading) ||
      text.includes(logsMessages.compressionLogEmpty) ||
      text.includes(logsMessages.compressionLogTitle);

    expect(hasExpectedText).toBe(true);
  });

  it("all required logs keys have defined values in the mock", () => {
    // Sanity-check: the test mock itself covers all the keys the component uses.
    for (const key of LOGS_KEYS) {
      expect(logsMessages[key]).toBeDefined();
      expect(typeof logsMessages[key]).toBe("string");
    }
  });
});
