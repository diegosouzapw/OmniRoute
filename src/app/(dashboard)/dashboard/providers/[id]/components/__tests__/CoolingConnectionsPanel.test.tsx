// @vitest-environment jsdom
//
// Biting tests for the manual "Clear cooldown" action in
// CoolingConnectionsPanel (stale-bench case: quota already refreshed upstream,
// OmniRoute's persisted rate_limited_until still benches the connection).
//
// What must NOT regress:
//   1. Clicking the per-row button fires onClearCooldown with the row's
//      connection id — and nothing else (no fetch here; the panel stays a
//      dumb readout + action surface).
//   2. The button is disabled (and stays silent) while that row's clear is
//      in flight, so double-clicks can't stack PUTs.
//   3. Rows without a connection id render no button (nothing to PUT).
//   4. Omitting onClearCooldown renders the legacy read-only panel — the
//      mount in ProviderDetailPageClient is the only consumer, but the prop
//      is optional so the component stays independently mountable.
//   5. The panel still renders nothing when no connection is cooling.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CoolingConnectionsPanel from "../CoolingConnectionsPanel";
import type { ConnectionRowConnection } from "../ConnectionRow";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "zai" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = ((key: string) => key) as ((key: string) => string) & {
      has?: (key: string) => boolean;
    };
    t.has = () => false; // force providerText fallbacks, like phase1d tests
    return t;
  },
}));

function coolingConnection(overrides: Partial<ConnectionRowConnection> = {}) {
  return {
    id: "conn-cooling-1",
    provider: "zai",
    name: "main",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    ...overrides,
  } as ConnectionRowConnection;
}

const cleanups: Array<() => void> = [];

function renderPanel(props: Partial<Parameters<typeof CoolingConnectionsPanel>[0]> = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  let panelRoot: HTMLDivElement | null = null;
  act(() => {
    root.render(
      <CoolingConnectionsPanel
        connections={[coolingConnection()]}
        onClearCooldown={undefined}
        {...props}
      />
    );
  });
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  panelRoot = container.querySelector('[data-testid="cooling-connections-panel"]');
  return { container, root, panelRoot };
}

describe("CoolingConnectionsPanel — manual clear cooldown", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
  });

  it("renders nothing when no connection is cooling", () => {
    const { container } = renderPanel({
      connections: [coolingConnection({ rateLimitedUntil: null })],
    });
    expect(container.querySelector('[data-testid="cooling-connections-panel"]')).toBeNull();
  });

  it("clicking the row button fires onClearCooldown with the connection id", () => {
    const onClearCooldown = vi.fn();
    const { panelRoot } = renderPanel({ onClearCooldown });
    const button = panelRoot!.querySelector<HTMLButtonElement>(
      '[data-testid="clear-cooldown-conn-cooling-1"]'
    );
    expect(button).not.toBeNull();
    act(() => {
      button!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClearCooldown).toHaveBeenCalledTimes(1);
    expect(onClearCooldown).toHaveBeenCalledWith("conn-cooling-1");
  });

  it("disables the button and stays silent while the row's clear is in flight", () => {
    const onClearCooldown = vi.fn();
    const { panelRoot } = renderPanel({ onClearCooldown, clearingCooldownId: "conn-cooling-1" });
    const button = panelRoot!.querySelector<HTMLButtonElement>(
      '[data-testid="clear-cooldown-conn-cooling-1"]'
    );
    expect(button!.disabled).toBe(true);
    act(() => {
      button!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClearCooldown).not.toHaveBeenCalled();
    expect(button!.textContent).toContain("Clearing…");
  });

  it("leaves another row's button enabled (per-row in-flight state)", () => {
    const onClearCooldown = vi.fn();
    const connA = coolingConnection({ id: "conn-a" });
    const connB = coolingConnection({ id: "conn-b" });
    const { panelRoot } = renderPanel({
      connections: [connA, connB],
      onClearCooldown,
      clearingCooldownId: "conn-a",
    });
    const buttonB = panelRoot!.querySelector<HTMLButtonElement>(
      '[data-testid="clear-cooldown-conn-b"]'
    );
    expect(buttonB!.disabled).toBe(false);
    act(() => {
      buttonB!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClearCooldown).toHaveBeenCalledWith("conn-b");
  });

  it("renders read-only (no buttons) when onClearCooldown is omitted", () => {
    const { panelRoot } = renderPanel();
    expect(panelRoot!.querySelector<HTMLButtonElement>("button")).toBeNull();
  });

  it("renders no button for a row without a connection id", () => {
    const { panelRoot } = renderPanel({
      connections: [coolingConnection({ id: undefined, name: "anon" })],
      onClearCooldown: vi.fn(),
    });
    expect(panelRoot!.querySelectorAll("button").length).toBe(0);
  });

  it("#12594 does not claim every cooldown is a 429", () => {
    const lastError =
      "Please make sure you're using the latest version of Cline and re-authenticate your Cline account.";
    const { panelRoot } = renderPanel({
      connections: [
        coolingConnection({
          lastErrorType: "oauth_invalid_token",
          lastError,
          errorCode: 401,
        }),
      ],
    });
    expect(panelRoot!.textContent).not.toMatch(/429 \(rate-limit\)/);
    const recorded = panelRoot!.querySelector("[data-testid='cooling-last-error']");
    expect(recorded?.textContent).toMatch(/re-authenticate your Cline account/i);
    expect(recorded?.getAttribute("title")).toBe(lastError);
  });

  it("#12594 tooltip keeps the full lastError when the visible text is truncated", () => {
    const lastError = `${"x".repeat(200)} unique-tail`;
    const { panelRoot } = renderPanel({
      connections: [coolingConnection({ lastError })],
    });
    const recorded = panelRoot!.querySelector("[data-testid='cooling-last-error']");
    expect(recorded?.textContent).toHaveLength(160);
    expect(recorded?.textContent).toMatch(/\.\.\.$/);
    expect(recorded?.getAttribute("title")).toBe(lastError);
  });
});
