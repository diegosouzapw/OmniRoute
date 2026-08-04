// @vitest-environment jsdom
/**
 * Regression guard for #7889: quota polling recreates `windows` and `current`
 * while the cutoff modal is open. Those identity-only prop changes must not
 * overwrite an operator's unsaved input; opening another connection still
 * seeds that connection's persisted values.
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: QuotaCutoffModal } =
  await import("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCutoffModal");

const cleanupCallbacks: Array<() => void> = [];

function props(connectionId: string, persisted: number) {
  return {
    isOpen: true,
    onClose: () => {},
    connectionId,
    connectionName: connectionId,
    provider: "codex",
    windows: [{ key: "session", displayName: "Session" }],
    current: { session: persisted },
    providerDefaults: { session: 2 },
    globalDefaultPercent: 2,
    onSave: async () => {},
  };
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (cleanupCallbacks.length) cleanupCallbacks.pop()!();
});

describe("QuotaCutoffModal draft lifetime (#7889)", () => {
  it("preserves an unsaved draft across same-connection prop refreshes and resets for a new connection", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    cleanupCallbacks.push(() => {
      act(() => root.unmount());
      container.remove();
    });

    await act(async () => {
      root.render(<QuotaCutoffModal {...props("connection-a", 2)} />);
    });

    const input = container.querySelector<HTMLInputElement>('input[type="number"]')!;
    expect(input.value).toBe("2");
    setInputValue(input, "10");
    expect(input.value).toBe("10");

    // Quota polling reconstructs both objects without changing the active connection.
    await act(async () => {
      root.render(<QuotaCutoffModal {...props("connection-a", 2)} />);
    });
    expect(input.value).toBe("10");

    // Switching the same mounted modal to another connection must seed its persisted value.
    await act(async () => {
      root.render(<QuotaCutoffModal {...props("connection-b", 7)} />);
    });
    expect(input.value).toBe("7");
  });
});
