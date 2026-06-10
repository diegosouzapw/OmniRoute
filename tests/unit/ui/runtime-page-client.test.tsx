// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import RuntimePageClient from "../../../src/app/(dashboard)/dashboard/runtime/RuntimePageClient";

function jsonResponse(data: unknown) {
  return {
    ok: true,
    json: async () => data,
  } as Response;
}

function getRequestPath(input: RequestInfo | URL) {
  return typeof input === "string" ? input : input instanceof URL ? input.pathname : input.url;
}

const cleanupCallbacks: Array<() => void> = [];

async function waitForText(text: string, timeoutMs = 3000) {
  const startedAt = Date.now();
  while (!document.body.textContent?.includes(text)) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error(`Timed out waiting for text: ${text}`);
    }
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
  }
}

async function renderRuntimePage() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(<RuntimePageClient />);
  });

  cleanupCallbacks.push(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });
}

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/shared/components/Card", () => ({
  default: ({ children }: { children: React.ReactNode }) => <section>{children}</section>,
}));

vi.mock("@/shared/components/ProviderIcon", () => ({
  default: ({ providerId }: { providerId: string }) => (
    <span data-testid={`provider-icon-${providerId}`} />
  ),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const messages: Record<string, string> = {
      title: "Runtime",
      description: "Realtime observability",
      pause: "Pause",
      resume: "Resume",
      refreshNow: "Refresh now",
      kpiSessions: "Sessions",
      kpiCircuits: "Circuits",
      kpiCooldowns: "Cooldowns",
      kpiLockouts: "Lockouts",
      hintStickyBound: "{count} sticky-bound",
      hintRecovering: "{count} recovering",
      hintAllHealthy: "all healthy",
      hintOpen: "open",
      hintConnsCooling: "connections cooling",
      hintModelsBlocked: "models blocked",
      resilienceTitle: "3-Layer Resilience",
      resilienceSubtitle: "Mirrors the documented resilience model",
      providersHealthy: "{percent}% providers healthy",
      layer: "Layer {n}",
      layer1Title: "Provider Circuit Breakers",
      layer1Desc: "Stop traffic to providers failing at the upstream level",
      layer2Title: "Connection Cooldowns",
      layer2Desc: "Skip one bad account/key",
      layer3Title: "Model Lockouts",
      layer3Desc: "Per-model rate-limit locks",
      badgeAffectedOf: "{affected} of {total} affected",
      badgeCooling: "{count} cooling",
      badgeLocked: "{count} locked",
      emptyCircuits: "No circuit breakers active yet",
      emptyCooldowns: "No connection cooldowns active",
      emptyLockouts: "No model lockouts",
      feedTitle: "Live Feed",
      feedSubtitle: "Last {count} events",
      feedFilterAll: "All",
      feedFilterCircuits: "Circuits",
      feedFilterCooldowns: "Cooldowns",
      feedFilterLockouts: "Lockouts",
      feedFilterSessions: "Sessions",
      feedFilterQuotas: "Quotas",
      feedClear: "Clear",
      feedEmptyWaiting: "Waiting for events...",
      feedEmptyFiltered: "No events match this filter",
      sessionsTitle: "Active Sessions",
      sessionsSubtitle: "Sticky-bound request fingerprints",
      sessionsActive: "{count} active",
      sessionsEmptyTitle: "No active sessions",
      sessionsEmptyHint: "Sessions appear as requests flow through the proxy",
      tblSession: "Session",
      tblAge: "Age",
      tblIdle: "Idle",
      tblReqs: "Reqs",
      tblBoundTo: "Bound to",
      topApiKeys: "Top API keys",
      quotaMonitorsTitle: "Quota Monitors",
      quotaMonitorsSubtitle: "Live quota state per account window",
      openQuota: "Open Quota",
      allQuotasHealthy: "All quotas healthy",
      moreSuffix: "+{count} more",
    };

    return (key: string, values?: Record<string, unknown>) => {
      let message = messages[key] ?? key;
      if (values) {
        for (const [name, value] of Object.entries(values)) {
          message = message.replace(`{${name}}`, String(value));
        }
      }
      return message;
    };
  },
}));

describe("RuntimePageClient", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("renders degraded and unknown provider breaker states without crashing", async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const path = getRequestPath(input);
      if (path === "/api/monitoring/health") {
        return Promise.resolve(
          jsonResponse({
            providerBreakers: [
              { provider: "free3", state: "DEGRADED", failureCount: 7, retryAfterMs: 0 },
              { provider: "future-provider", state: "SUSPENDED", failureCount: 1, retryAfterMs: 0 },
            ],
            lockouts: {},
            sessions: { activeCount: 0, stickyBoundCount: 0, byApiKey: {}, top: [] },
            quotaMonitor: { active: 0, alerting: 0, exhausted: 0, errors: 0, monitors: [] },
          })
        );
      }
      if (path === "/api/providers/client") {
        return Promise.resolve(jsonResponse({ connections: [] }));
      }
      return Promise.resolve(jsonResponse({}));
    });

    await renderRuntimePage();

    await waitForText("free3");
    await waitForText("future-provider");
    await waitForText("DEG");
    await waitForText("UNK");
    expect(document.body.textContent).not.toContain("Internal Server Error");
  });
});
