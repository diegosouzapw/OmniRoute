// @vitest-environment jsdom
/**
 * Regression guard for #7643 — the per-connection "proxy configured" badge
 * must show the saved proxy's NAME (when available) instead of always
 * falling back to its hostname. Several saved proxies sharing a domain
 * hostname would otherwise render identically, making it impossible to tell
 * which proxy is actually assigned at a glance.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

import ConnectionRow, {
  type ConnectionRowConnection,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

const baseProps = {
  isOAuth: false,
  isFirst: true,
  isLast: true,
  onMoveUp: () => {},
  onMoveDown: () => {},
  onToggleActive: () => {},
  onToggleRateLimit: () => {},
  onRetest: () => {},
  onEdit: () => {},
  onDelete: () => {},
  hasProxy: true,
  proxySource: "key",
};

function renderRow(
  connection: ConnectionRowConnection,
  extraProps: Record<string, unknown>
): HTMLElement {
  const container = makeContainer();
  const root = createRoot(container);
  cleanupCallbacks.push(() => act(() => root.unmount()));
  act(() => {
    root.render(
      React.createElement(ConnectionRow, {
        ...baseProps,
        ...extraProps,
        connection,
      } as never)
    );
  });
  return container;
}

const connection = {
  id: "c1",
  provider: "openai",
  testStatus: "active",
  isActive: true,
  priority: 1,
} as ConnectionRowConnection;

describe("ConnectionRow proxy badge name-vs-host (#7643)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length) cleanupCallbacks.pop()!();
  });

  function getBadge(container: HTMLElement): HTMLElement {
    // The proxy badge is the only `title`-bearing <span> rendered by this
    // minimal prop set (no onToggleProxyEnabled/onTogglePerKeyProxyEnabled
    // callbacks are wired, so those other proxy chips don't render).
    const badge = container.querySelector("span[title]");
    expect(badge).not.toBeNull();
    return badge as HTMLElement;
  }

  it("shows the proxy name (not the host) when both are provided", () => {
    const container = renderRow(connection, {
      proxyName: "My US Proxy",
      proxyHost: "203.0.113.10",
    });
    const badge = getBadge(container);
    expect(badge.textContent).toContain("My US Proxy");
    expect(badge.textContent).not.toContain("203.0.113.10");
  });

  it("falls back to the host when no proxy name is available", () => {
    const container = renderRow(connection, {
      proxyName: null,
      proxyHost: "203.0.113.10",
    });
    const badge = getBadge(container);
    expect(badge.textContent).toContain("203.0.113.10");
  });

  it("falls back to the translated placeholder when neither name nor host is available", () => {
    const container = renderRow(connection, {
      proxyName: null,
      proxyHost: null,
    });
    const badge = getBadge(container);
    // badge label falls back to t("proxy") -> mocked to the literal key "proxy"
    expect(badge.textContent?.replace("vpn_lock", "").trim()).toBe("proxy");
  });
});
