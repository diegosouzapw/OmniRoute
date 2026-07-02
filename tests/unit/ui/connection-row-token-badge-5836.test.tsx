// @vitest-environment jsdom
/**
 * Regression guard for #5836 — the red "Token Expired" connection badge must
 * NOT flash for OAuth refresh-capable providers (Antigravity/Gemini) whose
 * access token merely lapsed but is auto-refreshed. It should render ONLY when
 * the connection is terminally expired (testStatus === "expired").
 * Continuation of #5326.
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
  isOAuth: true,
  isFirst: true,
  isLast: true,
  onMoveUp: () => {},
  onMoveDown: () => {},
  onToggleActive: () => {},
  onToggleRateLimit: () => {},
  onRetest: () => {},
  onEdit: () => {},
  onDelete: () => {},
};

function renderRow(connection: ConnectionRowConnection): HTMLElement {
  const container = makeContainer();
  const root = createRoot(container);
  cleanupCallbacks.push(() => act(() => root.unmount()));
  act(() => {
    root.render(React.createElement(ConnectionRow, { ...baseProps, connection } as never));
  });
  return container;
}

const PAST = new Date(Date.now() - 60 * 60 * 1000).toISOString(); // 1h ago

describe("ConnectionRow token expiry badge (#5836)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length) cleanupCallbacks.pop()!();
  });

  it("does NOT render the red Token Expired badge for a healthy OAuth connection whose access token merely lapsed", () => {
    const container = renderRow({
      id: "c1",
      provider: "antigravity",
      testStatus: "active",
      isActive: true,
      tokenExpiresAt: PAST,
      priority: 1,
    } as ConnectionRowConnection);
    expect(container.textContent).not.toContain("tokenExpiredBadge");
  });

  it("renders the red Token Expired badge when the connection is terminally expired", () => {
    const container = renderRow({
      id: "c2",
      provider: "antigravity",
      testStatus: "expired",
      isActive: true,
      tokenExpiresAt: PAST,
      errorCode: "no_refresh_token",
      priority: 1,
    } as ConnectionRowConnection);
    expect(container.textContent).toContain("tokenExpiredBadge");
  });
});
