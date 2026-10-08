// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../src/i18n/messages/en.json";
import { ProxyHealthCell } from "../../../src/app/(dashboard)/dashboard/settings/components/ProxyHealthCell";

// #14807: the sweep label keys must resolve through next-intl (nested
// `sweepLabel.{verdict}` object). A flat `"sweepLabel.ok"` key in the JSON is
// NOT reachable via `t("sweepLabel.ok")` — next-intl treats the dot as a path.

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

describe("ProxyHealthCell sweep verdict", () => {
  it("renders the translated cause for a blocked/unproven verdict", () => {
    const el = render(
      <ProxyHealthCell
        health={{
          successRate: 90,
          avgLatencyMs: 120,
          sweep: { verdict: "blocked", cause: "unproven", status: 403, at: 0, ageMs: 240_000 },
        }}
      />
    );
    const text = el.textContent ?? "";
    expect(text).toContain("Last sweep: target refused (403)");
    expect(text).not.toContain("sweepLabel");
  });

  it("renders the translated label for a non-blocked verdict", () => {
    const el = render(
      <ProxyHealthCell
        health={{
          successRate: 100,
          avgLatencyMs: 50,
          sweep: { verdict: "ok", cause: "unclassified", status: 200, at: 0, ageMs: 0 },
        }}
      />
    );
    expect(el.textContent ?? "").toContain("Last sweep: served (200)");
  });

  it("renders the no-data line when no sweep verdict exists", () => {
    const el = render(<ProxyHealthCell health={{ successRate: 100, avgLatencyMs: 50 }} />);
    expect(el.textContent ?? "").toContain("No sweep yet since startup");
  });
});
