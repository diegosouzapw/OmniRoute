// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { DEFAULT_CONTEXT_BUDGET } from "../../../open-sse/services/compression/adaptiveCompression/types.ts";

// i18n does not resolve to a real locale in vitest/jsdom, so mock next-intl to echo
// the key. This test asserts ONLY on i18n-independent hooks (data-testid + values)
// and the captured PUT body.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => root.render(ui));
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(async () => {
  vi.restoreAllMocks();
  await act(async () => {
    while (roots.length > 0) roots.pop()?.unmount();
  });
  for (let i = 0; i < 10; i++) await Promise.resolve();
  while (containers.length > 0) containers.pop()?.remove();
  document.body.innerHTML = "";
});

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  });
}

interface CapturedPut {
  url: string;
  body: Record<string, unknown>;
}

function setupFetchMock(
  overrides?: Record<string, unknown>,
  opts?: { putStatus?: number; putStatusFn?: (n: number) => number }
): { puts: CapturedPut[] } {
  const puts: CapturedPut[] = [];
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  const initial = {
    enabled: true,
    autoTriggerTokens: 0,
    preserveSystemPrompt: true,
    engines: {},
    activeComboId: null,
    outputStyles: [],
    cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
    ultraEngine: "heuristic",
    ultraSlmPrewarm: false,
    liveZone: { enabled: false },
    contextBudget: { ...DEFAULT_CONTEXT_BUDGET },
    ...overrides,
  };
  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = (init?.method ?? "GET").toUpperCase();
      if (url.includes("/api/settings/compression/mcp-accessibility"))
        return json({ enabled: true });
      if (url.includes("/api/settings/compression")) {
        if (method === "PUT") {
          const body = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
          puts.push({ url, body });
          const n = puts.length;
          const status = opts?.putStatusFn ? opts.putStatusFn(n) : (opts?.putStatus ?? 200);
          const merged =
            body.contextBudget && typeof body.contextBudget === "object"
              ? {
                  ...initial,
                  ...body,
                  contextBudget: {
                    ...(initial.contextBudget as Record<string, unknown>),
                    ...(body.contextBudget as Record<string, unknown>),
                  },
                }
              : { ...initial, ...body };
          return json(merged, status);
        }
        return json(initial);
      }
      return json({}, 404);
    }
  );
  return { puts };
}

describe("CompressionPanel adaptive context-budget dial", () => {
  it("renders the mode select defaulting to off (legacy auto-trigger)", async () => {
    setupFetchMock();
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const select = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement | null;
    expect(select, "mode select must render").toBeTruthy();
    expect(select?.value).toBe("off");
    expect(container.querySelector(`[data-testid="context-budget-policy-select"]`)).toBeFalsy();
    expect(
      container.querySelector(`[data-testid="adaptive-target-preview"]`),
      "preview label stays inside the dial"
    ).toBeTruthy();
  });

  it("hydrates mode off when GET omits contextBudget", async () => {
    setupFetchMock({ contextBudget: undefined });
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const select = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement | null;
    expect(select?.value).toBe("off");
    expect(container.querySelector(`[data-testid="context-budget-policy-select"]`)).toBeFalsy();
  });

  it("hides the policy select when GET hydrates mode as null (same as off)", async () => {
    setupFetchMock({
      contextBudget: { ...DEFAULT_CONTEXT_BUDGET, mode: null as unknown as "off" },
    });
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const select = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement | null;
    expect(select?.value).toBe("off");
    expect(container.querySelector(`[data-testid="context-budget-policy-select"]`)).toBeFalsy();
  });

  it("selecting floor PUTs the full contextBudget object with mode:'floor'", async () => {
    const { puts } = setupFetchMock();
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const select = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    expect(select).toBeTruthy();
    await act(async () => {
      select.value = "floor";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();

    const put = puts.find((p) => "contextBudget" in p.body);
    expect(put, "a PUT carrying contextBudget").toBeTruthy();
    const budget = put!.body.contextBudget as Record<string, unknown>;
    expect(budget.mode).toBe("floor");
    expect(budget.policy).toBe(DEFAULT_CONTEXT_BUDGET.policy);
    expect(budget.outputReserve).toBe(DEFAULT_CONTEXT_BUDGET.outputReserve);
    expect(budget.safetyMargin).toBe(DEFAULT_CONTEXT_BUDGET.safetyMargin);
    expect(budget.pct).toBe(DEFAULT_CONTEXT_BUDGET.pct);
    expect(budget.absoluteBudget).toBe(DEFAULT_CONTEXT_BUDGET.absoluteBudget);
    expect(budget.ladderOverride).toBe(DEFAULT_CONTEXT_BUDGET.ladderOverride);

    expect(
      container.querySelector(`[data-testid="context-budget-policy-select"]`),
      "policy select appears once mode is not off"
    ).toBeTruthy();
  });

  it("selecting replace-autotrigger PUTs mode and reveals the policy select", async () => {
    const { puts } = setupFetchMock();
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const select = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    await act(async () => {
      select.value = "replace-autotrigger";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();

    const put = puts.find((p) => "contextBudget" in p.body);
    expect(put, "a PUT carrying contextBudget").toBeTruthy();
    const budget = put!.body.contextBudget as Record<string, unknown>;
    expect(budget.mode).toBe("replace-autotrigger");
    expect(container.querySelector(`[data-testid="context-budget-policy-select"]`)).toBeTruthy();
  });

  it("rolls the mode select back to off when the PUT fails", async () => {
    setupFetchMock(undefined, { putStatus: 500 });
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const select = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    await act(async () => {
      select.value = "floor";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();

    const after = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    expect(after.value).toBe("off");
    expect(container.querySelector(`[data-testid="context-budget-policy-select"]`)).toBeFalsy();
  });

  it("rolls policy back to the hydrated value when the PUT fails", async () => {
    const { puts } = setupFetchMock(
      {
        contextBudget: {
          ...DEFAULT_CONTEXT_BUDGET,
          mode: "floor",
          policy: "reserve-output",
        },
      },
      { putStatus: 500 }
    );
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const policy = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement;
    expect(policy.value).toBe("reserve-output");
    await act(async () => {
      policy.value = "percentage";
      policy.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();

    const after = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement;
    expect(after.value).toBe("reserve-output");
    expect(puts).toHaveLength(1);
    const budget = puts[0].body.contextBudget as Record<string, unknown>;
    expect(budget.mode).toBe("floor");
    expect(budget.policy).toBe("percentage");
    expect(budget.outputReserve).toBe(DEFAULT_CONTEXT_BUDGET.outputReserve);
    expect(budget.absoluteBudget).toBe(DEFAULT_CONTEXT_BUDGET.absoluteBudget);
  });

  it("does not let an older failed PUT roll back a newer successful save", async () => {
    const puts: CapturedPut[] = [];
    const pending: Array<{
      resolve: (r: Response) => void;
      body: Record<string, unknown>;
    }> = [];
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    const initial = {
      enabled: true,
      autoTriggerTokens: 0,
      preserveSystemPrompt: true,
      engines: {},
      activeComboId: null,
      outputStyles: [],
      cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
      ultraEngine: "heuristic",
      ultraSlmPrewarm: false,
      liveZone: { enabled: false },
      contextBudget: { ...DEFAULT_CONTEXT_BUDGET },
    };
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        const method = (init?.method ?? "GET").toUpperCase();
        if (url.includes("/api/settings/compression/mcp-accessibility"))
          return json({ enabled: true });
        if (url.includes("/api/settings/compression")) {
          if (method === "PUT") {
            const body = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
            puts.push({ url, body });
            return new Promise<Response>((resolve) => {
              pending.push({ resolve, body });
            });
          }
          return json(initial);
        }
        return json({}, 404);
      }
    );

    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const mode = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    const policy = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement | null;
    expect(policy).toBeFalsy();

    // Two PUTs from the same render: older one will 500 after the newer one 200s.
    await act(async () => {
      mode.value = "floor";
      mode.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(pending).toHaveLength(1);

    const policyAfter = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement;
    expect(policyAfter, "policy select after optimistic floor").toBeTruthy();
    await act(async () => {
      policyAfter.value = "percentage";
      policyAfter.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(pending).toHaveLength(2);

    await act(async () => {
      pending[1].resolve(json({ ...initial, ...pending[1].body }, 200));
    });
    await flush();
    await act(async () => {
      pending[0].resolve(json({ ...initial, ...pending[0].body }, 500));
    });
    await flush();

    const afterMode = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    const afterPolicy = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement;
    expect(afterMode.value).toBe("floor");
    expect(afterPolicy.value).toBe("percentage");
  });

  it("keeps an older successful PUT as lastConfirmed when a newer overlapping PUT fails", async () => {
    const puts: CapturedPut[] = [];
    const pending: Array<{
      resolve: (r: Response) => void;
      body: Record<string, unknown>;
    }> = [];
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    const initial = {
      enabled: true,
      autoTriggerTokens: 0,
      preserveSystemPrompt: true,
      engines: {},
      activeComboId: null,
      outputStyles: [],
      cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
      ultraEngine: "heuristic",
      ultraSlmPrewarm: false,
      liveZone: { enabled: false },
      contextBudget: { ...DEFAULT_CONTEXT_BUDGET },
    };
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        const method = (init?.method ?? "GET").toUpperCase();
        if (url.includes("/api/settings/compression/mcp-accessibility"))
          return json({ enabled: true });
        if (url.includes("/api/settings/compression")) {
          if (method === "PUT") {
            const body = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
            puts.push({ url, body });
            return new Promise<Response>((resolve) => {
              pending.push({ resolve, body });
            });
          }
          return json(initial);
        }
        return json({}, 404);
      }
    );

    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const mode = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    await act(async () => {
      mode.value = "floor";
      mode.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(pending).toHaveLength(1);

    const policyAfter = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement;
    await act(async () => {
      policyAfter.value = "percentage";
      policyAfter.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(pending).toHaveLength(2);

    // Older save A acks first (stale gen). Newer save B then 500s.
    await act(async () => {
      pending[0].resolve(json({ ...initial, ...pending[0].body }, 200));
    });
    await flush();
    await act(async () => {
      pending[1].resolve(json({ ...initial, ...pending[1].body }, 500));
    });
    await flush();

    const afterMode = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    const afterPolicy = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement;
    expect(afterMode.value).toBe("floor");
    expect(
      afterPolicy,
      "policy select stays — lastConfirmed is A's floor, not GET off"
    ).toBeTruthy();
    expect(afterPolicy.value).toBe("reserve-output");
  });

  it("rolls both overlapping failed PUTs back to the last GET snapshot, not the first optimistic state", async () => {
    const puts: CapturedPut[] = [];
    const pending: Array<{
      resolve: (r: Response) => void;
      body: Record<string, unknown>;
    }> = [];
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    const initial = {
      enabled: true,
      autoTriggerTokens: 0,
      preserveSystemPrompt: true,
      engines: {},
      activeComboId: null,
      outputStyles: [],
      cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
      ultraEngine: "heuristic",
      ultraSlmPrewarm: false,
      liveZone: { enabled: false },
      contextBudget: { ...DEFAULT_CONTEXT_BUDGET },
    };
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        const method = (init?.method ?? "GET").toUpperCase();
        if (url.includes("/api/settings/compression/mcp-accessibility"))
          return json({ enabled: true });
        if (url.includes("/api/settings/compression")) {
          if (method === "PUT") {
            const body = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
            puts.push({ url, body });
            return new Promise<Response>((resolve) => {
              pending.push({ resolve, body });
            });
          }
          return json(initial);
        }
        return json({}, 404);
      }
    );

    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const mode = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    await act(async () => {
      mode.value = "floor";
      mode.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(pending).toHaveLength(1);

    const policyAfter = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement;
    await act(async () => {
      policyAfter.value = "percentage";
      policyAfter.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(pending).toHaveLength(2);

    await act(async () => {
      pending[1].resolve(json({ ...initial, ...pending[1].body }, 500));
    });
    await flush();
    await act(async () => {
      pending[0].resolve(json({ ...initial, ...pending[0].body }, 500));
    });
    await flush();

    const afterMode = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    expect(afterMode.value).toBe("off");
    expect(container.querySelector(`[data-testid="context-budget-policy-select"]`)).toBeFalsy();
  });

  it("does not let a stale saved-timeout clear a newer error status", async () => {
    vi.useFakeTimers();
    try {
      const { puts } = setupFetchMock(undefined, {
        putStatusFn: (n) => (n === 1 ? 200 : 500),
      });
      const { default: CompressionPanel } =
        await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
      let container!: HTMLElement;
      await act(async () => {
        container = mount(<CompressionPanel />);
      });
      await flush();

      const mode = container.querySelector(
        `[data-testid="context-budget-mode-select"]`
      ) as HTMLSelectElement;
      await act(async () => {
        mode.value = "floor";
        mode.dispatchEvent(new Event("change", { bubbles: true }));
      });
      await flush();
      expect(puts).toHaveLength(1);
      expect(container.textContent).toContain("saved");

      const policy = container.querySelector(
        `[data-testid="context-budget-policy-select"]`
      ) as HTMLSelectElement;
      await act(async () => {
        policy.value = "percentage";
        policy.dispatchEvent(new Event("change", { bubbles: true }));
      });
      await flush();
      expect(puts).toHaveLength(2);
      expect(container.textContent).toContain("saveFailed");

      await act(async () => {
        vi.advanceTimersByTime(2000);
      });
      await flush();
      expect(container.textContent).toContain("saveFailed");
    } finally {
      vi.useRealTimers();
    }
  });

  it("hydrates GET contextBudget and changing policy PUTs the merged object", async () => {
    const { puts } = setupFetchMock({
      contextBudget: {
        ...DEFAULT_CONTEXT_BUDGET,
        mode: "floor",
        policy: "reserve-output",
      },
    });
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const mode = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    const policy = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement;
    expect(mode.value).toBe("floor");
    expect(policy, "policy select must hydrate when mode is floor").toBeTruthy();
    expect(policy.value).toBe("reserve-output");

    await act(async () => {
      policy.value = "percentage";
      policy.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();

    const put = puts.find((p) => "contextBudget" in p.body);
    expect(put, "a PUT carrying contextBudget").toBeTruthy();
    const budget = put!.body.contextBudget as Record<string, unknown>;
    expect(budget.mode).toBe("floor");
    expect(budget.policy).toBe("percentage");
    expect(budget.pct).toBe(DEFAULT_CONTEXT_BUDGET.pct);
    expect(budget.ladderOverride).toBe(DEFAULT_CONTEXT_BUDGET.ladderOverride);
  });
});
