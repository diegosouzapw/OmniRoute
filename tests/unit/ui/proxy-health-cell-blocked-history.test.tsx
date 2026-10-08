// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../src/i18n/messages/en.json";
import { ProxyHealthCell } from "../../../src/app/(dashboard)/dashboard/settings/components/ProxyHealthCell";

// Extension 2026-09-27: the persistent blocked history renders under the
// sweep line (same formatSweepAge/sweepLabelKey), or nothing when absent.

const roots: Array<{ unmount: () => void }> = [];
const containers: HTMLElement[] = [];

function render(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => {
    root.render(
      <NextIntlClientProvider
        locale="en"
        messages={{ proxyRegistry: messages.proxyRegistry }}
        onError={(error) => {
          throw error;
        }}
      >
        {ui}
      </NextIntlClientProvider>
    );
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  vi.restoreAllMocks();
  act(() => {
    while (roots.length > 0) roots.pop()?.unmount();
  });
  while (containers.length > 0) containers.pop()?.remove();
});

describe("ProxyHealthCell blocked history", () => {
  it("renders the persistent blocked line under the sweep line", () => {
    const el = render(
      <ProxyHealthCell
        health={{
          successRate: 90,
          avgLatencyMs: 120,
          sweep: { verdict: "blocked", cause: "unproven", status: 403, at: 0, ageMs: 240_000 },
          blockedHistory: {
            count: 3,
            firstSeen: 0,
            lastSeen: Date.now() - 240_000,
            lastCause: "unproven",
            lastStatus: 403,
            ageMs: 240_000,
          },
        }}
      />
    );
    const text = el.textContent ?? "";
    expect(text).toContain("Last sweep: target refused (403)");
    expect(text).toContain("Blocked history: 3");
    expect(text).toContain("target refused (403)");
    expect(text).not.toContain("blockedHistory");
  });

  it("renders nothing extra when no blocked history exists", () => {
    const el = render(
      <ProxyHealthCell
        health={{
          successRate: 100,
          avgLatencyMs: 50,
          sweep: { verdict: "ok", cause: "unclassified", status: 200, at: 0, ageMs: 0 },
        }}
      />
    );
    const text = el.textContent ?? "";
    expect(text).toContain("Last sweep: served (200)");
    expect(text).not.toContain("Blocked history");
  });
});
