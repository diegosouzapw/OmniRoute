// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    const labels: Record<string, string> = {
      quotaNoData: "No usage data yet",
      quotaRefresh: "Refresh usage",
      quotaCredits: "{count} credits",
      quotaUnlimited: "unlimited",
      quotaResetIn: "resets in {time}",
      quotaMoreWindows: "{count} more usage windows",
      quotaWindowMonthly: "Monthly",
      quotaWindowSpark: "Spark",
      quotaDetails: "Usage details",
      quotaPlanBadge: "Subscription plan (from usage data)",
    };
    let value = labels[key] ?? key;
    for (const [name, replacement] of Object.entries(values ?? {})) {
      value = value.replace(`{${name}}`, String(replacement));
    }
    return value;
  },
}));

import ConnectionQuotaPanel from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionQuotaPanel";
import type { ProviderQuotaCacheEntry } from "@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderQuota";
import ConnectionRow, {
  type ConnectionRowConnection,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";

const cleanupCallbacks: Array<() => void> = [];

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (cleanupCallbacks.length) cleanupCallbacks.pop()?.();
  document.body.innerHTML = "";
});

function mount(element: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  cleanupCallbacks.push(() => act(() => root.unmount()));
  act(() => root.render(element));
  return container;
}

const futureReset = (hours: number) => new Date(Date.now() + hours * 3_600_000).toISOString();

function panelProps(overrides: Partial<Parameters<typeof ConnectionQuotaPanel>[0]> = {}) {
  return {
    providerId: "codex",
    connection: { id: "c1", provider: "codex", name: "Codex account" } as ConnectionRowConnection,
    cache: {
      quotas: {
        session: { used: 0, total: 0, remainingPercentage: 22, resetAt: futureReset(2) },
        weekly: { used: 0, total: 0, remainingPercentage: 43, resetAt: futureReset(96) },
      },
      plan: "pro",
      message: null,
      fetchedAt: new Date().toISOString(),
    } as ProviderQuotaCacheEntry,
    refreshing: false,
    onRefresh: vi.fn(),
    ...overrides,
  };
}

describe("ConnectionQuotaPanel", () => {
  it("renders window chips (5h/7d used%) from a codex cache entry", () => {
    const el = mount(<ConnectionQuotaPanel {...panelProps()} />);
    expect(el.textContent).toContain("5h 78%");
    expect(el.textContent).toContain("7d 57%");
  });

  it("expands to per-window details with reset countdowns", () => {
    const el = mount(<ConnectionQuotaPanel {...panelProps()} />);
    const toggle = el.querySelector<HTMLButtonElement>("button[title='Usage details']")!;
    expect(toggle).not.toBeNull();
    act(() => toggle.click());
    expect(el.textContent).toContain("resets in ");
  });

  it("renders claude percentage-only windows with compact labels", () => {
    const el = mount(
      <ConnectionQuotaPanel
        {...panelProps({
          providerId: "claude",
          connection: {
            id: "c2",
            provider: "claude",
            name: "Claude account",
          } as ConnectionRowConnection,
          cache: {
            quotas: {
              "session (5h)": {
                used: 0,
                total: 0,
                remainingPercentage: 30,
                resetAt: futureReset(3),
              },
              "weekly (7d)": {
                used: 0,
                total: 0,
                remainingPercentage: 80,
                resetAt: futureReset(120),
              },
            },
            plan: "Claude Max",
            message: null,
            fetchedAt: new Date().toISOString(),
          },
        })}
      />
    );
    expect(el.textContent).toContain("5h 70%");
    expect(el.textContent).toContain("7d 20%");
  });

  it("surfaces worst per-model windows as chips when no rolling windows exist (antigravity)", () => {
    const modelQuota = (used: number, remaining: number) => ({
      used,
      total: 100,
      remainingPercentage: remaining,
      resetAt: futureReset(24),
    });
    const el = mount(
      <ConnectionQuotaPanel
        {...panelProps({
          providerId: "antigravity",
          connection: {
            id: "c3",
            provider: "antigravity",
            name: "Antigravity account",
          } as ConnectionRowConnection,
          cache: {
            quotas: {
              "gemini-2.5-pro": modelQuota(10, 90),
              "claude-4-sonnet": modelQuota(4, 96),
              "gemini-3-flash": modelQuota(70, 30),
              "gpt-oss-120b": modelQuota(2, 98),
              "claude-opus-4-6": modelQuota(1, 99),
              credits: { remaining: 120 },
            },
            plan: "Ultra",
            message: null,
            fetchedAt: new Date().toISOString(),
          },
        })}
      />
    );
    // no 5h/7d keys → the 3 most-consumed model windows become chips directly
    expect(el.textContent).toContain("gemini-3-flash 70%");
    expect(el.textContent).toContain("gemini-2.5-pro 10%");
    expect(el.textContent).toContain("claude-4-sonnet 4%");
    // remaining two fold behind +2; credits stay a chip
    expect(el.textContent).toContain("+2");
    expect(el.textContent).toContain("120 credits");
    // most-consumed first: flash before pro
    expect(el.textContent!.indexOf("gemini-3-flash")).toBeLessThan(
      el.textContent!.indexOf("gemini-2.5-pro")
    );
  });

  it("shows only one model chip when rolling windows also exist (agy weekly + models)", () => {
    const el = mount(
      <ConnectionQuotaPanel
        {...panelProps({
          providerId: "agy",
          connection: {
            id: "c4",
            provider: "agy",
            name: "AGY account",
          } as ConnectionRowConnection,
          cache: {
            quotas: {
              gemini_weekly: {
                used: 0,
                total: 0,
                remainingPercentage: 55,
                resetAt: futureReset(90),
              },
              "gemini-2.5-pro": {
                used: 10,
                total: 100,
                remainingPercentage: 90,
                resetAt: futureReset(24),
              },
              "claude-4-sonnet": {
                used: 4,
                total: 100,
                remainingPercentage: 96,
                resetAt: futureReset(24),
              },
            },
            plan: "Pro",
            message: null,
            fetchedAt: new Date().toISOString(),
          },
        })}
      />
    );
    expect(el.textContent).toContain("7d 45%");
    // single worst model chip (pro), the rest folded
    expect(el.textContent).toContain("gemini-2.5-pro 10%");
    expect(el.textContent).toContain("+1");
  });

  it("surfaces an upstream error message when only a message row exists", () => {
    const el = mount(
      <ConnectionQuotaPanel
        {...panelProps({
          cache: {
            quotas: {},
            plan: null,
            message: "usage endpoint rate limited",
            fetchedAt: new Date().toISOString(),
          },
        })}
      />
    );
    expect(el.textContent).toContain("usage endpoint rate limited");
  });

  it("offers a first fetch when no cache exists yet and fires onRefresh", () => {
    const onRefresh = vi.fn();
    const el = mount(<ConnectionQuotaPanel {...panelProps({ cache: null, onRefresh })} />);
    expect(el.textContent).toContain("No usage data yet");
    const refresh = el.querySelector<HTMLButtonElement>("button[title='Refresh usage']")!;
    act(() => refresh.click());
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});

describe("ConnectionRow quota gating", () => {
  const claudeCache: ProviderQuotaCacheEntry = {
    quotas: {
      "session (5h)": { used: 0, total: 0, remainingPercentage: 11, resetAt: futureReset(1) },
      "weekly (7d)": { used: 0, total: 0, remainingPercentage: 77, resetAt: futureReset(100) },
    },
    plan: "Claude Max",
    message: null,
    fetchedAt: new Date().toISOString(),
  };

  function rowProps(
    connection: ConnectionRowConnection,
    quotaCache?: ProviderQuotaCacheEntry | null
  ) {
    return {
      connection,
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
      quotaCache,
      onRefreshQuota: vi.fn(),
    };
  }

  it("renders the quota strip and the plan badge for a supported provider", () => {
    const el = mount(
      React.createElement(ConnectionRow, {
        ...rowProps(
          { id: "a1", provider: "claude", name: "Claude", testStatus: "active" },
          claudeCache
        ),
      } as never)
    );
    expect(el.textContent).toContain("5h 89%");
    expect(el.textContent).toContain("7d 23%");
    expect(el.textContent).toContain("Claude Max");
  });

  it("hides the quota strip when the connection opted out (quotaVisible=false)", () => {
    const el = mount(
      React.createElement(ConnectionRow, {
        ...rowProps(
          {
            id: "a2",
            provider: "claude",
            name: "Claude hidden",
            testStatus: "active",
            quotaVisible: false,
          },
          claudeCache
        ),
      } as never)
    );
    expect(el.textContent).not.toContain("5h 89%");
    expect(el.textContent).not.toContain("Claude Max");
  });

  it("hides the quota strip for providers without a usage API", () => {
    const el = mount(
      React.createElement(ConnectionRow, {
        ...rowProps(
          { id: "a3", provider: "openai", name: "OpenAI", testStatus: "active" },
          claudeCache
        ),
      } as never)
    );
    expect(el.textContent).not.toContain("5h 89%");
  });
});
