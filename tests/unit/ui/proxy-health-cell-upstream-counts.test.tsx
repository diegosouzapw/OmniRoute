// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../src/i18n/messages/en.json";
import { ProxyHealthCell } from "../../../src/app/(dashboard)/dashboard/settings/components/ProxyHealthCell";

// The health cell shows upstream 4xx and 5xx as two separate counts so an
// upstream-wide 5xx outage reads differently from client errors.

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
  act(() => {
    while (roots.length > 0) roots.pop()?.unmount();
  });
  while (containers.length > 0) containers.pop()?.remove();
});

describe("ProxyHealthCell upstream counts", () => {
  it("shows upstream 4xx and 5xx as two separate counts", () => {
    const el = render(<ProxyHealthCell health={{ upstream4xx: 2, upstream5xx: 7 }} />);
    const text = el.textContent ?? "";
    expect(text).toContain("2 upstream client errors");
    expect(text).toContain("7 upstream server errors");
    expect(text).not.toContain("upstream refusals");
  });

  it("shows zeros when the counts are missing", () => {
    const el = render(<ProxyHealthCell health={{}} />);
    const text = el.textContent ?? "";
    expect(text).toContain("0 upstream client errors");
    expect(text).toContain("0 upstream server errors");
  });
});
