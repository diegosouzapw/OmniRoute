// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The Cooldown Manager page: lists connections out of routing (healthy ones hidden by
// default), clears one row through POST /api/resilience/cooldowns, and saves the cooldown
// rules through PATCH /api/resilience.

const CLIENT_PATH =
  "@/app/(dashboard)/dashboard/resilience/cooldowns/components/CooldownManagerClient";

const CONNECTIONS = [
  {
    id: "conn-cooling-1",
    provider: "codex",
    name: "Cooling account",
    authType: "oauth",
    priority: 1,
    isActive: true,
    status: "cooling_down",
    testStatus: "unavailable",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    cooldownRemainingMs: 60_000,
    backoffLevel: 1,
    errorCode: "502",
    lastErrorType: "server_error",
    lastErrorAt: null,
    lockouts: [],
  },
  {
    id: "conn-healthy-1",
    provider: "codex",
    name: "Healthy account",
    authType: "oauth",
    priority: 2,
    isActive: true,
    status: "healthy",
    testStatus: "active",
    rateLimitedUntil: null,
    cooldownRemainingMs: 0,
    backoffLevel: 0,
    errorCode: null,
    lastErrorType: null,
    lastErrorAt: null,
    lockouts: [],
  },
];

const SETTINGS = {
  streamStallCooldown: { enabled: false },
  connectionCooldown: {
    oauth: { baseCooldownMs: 5000, maxBackoffSteps: 6 },
    apikey: { baseCooldownMs: 3000, maxBackoffSteps: 4 },
  },
};

const json = (body: unknown) =>
  Promise.resolve(new Response(JSON.stringify(body), { status: 200 }));

const cleanupCallbacks: Array<() => void> = [];

async function renderClient() {
  const { default: CooldownManagerClient } = await import(CLIENT_PATH);
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  cleanupCallbacks.push(() => {
    root.unmount();
    container.remove();
  });
  await act(async () => {
    root.render(React.createElement(CooldownManagerClient));
  });
  await act(async () => {
    await Promise.resolve();
  });
  return container;
}

function buttonByText(container: HTMLElement, text: string): HTMLButtonElement | undefined {
  return [...container.querySelectorAll("button")].find((button) =>
    button.textContent?.includes(text)
  ) as HTMLButtonElement | undefined;
}

describe("CooldownManagerClient", { timeout: 30_000 }, () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock = vi.fn((url: string, init?: RequestInit) => {
      if (url === "/api/resilience/cooldowns" && init?.method === "POST") {
        return json({ ok: true, cleared: 1, unchanged: 0, skippedTerminal: 0, lockoutsCleared: 0 });
      }
      if (url === "/api/resilience/cooldowns") return json({ connections: CONNECTIONS });
      if (url === "/api/resilience" && init?.method === "PATCH") {
        return json({ ...SETTINGS, streamStallCooldown: { enabled: true } });
      }
      if (url === "/api/resilience") return json(SETTINGS);
      return Promise.resolve(new Response("{}", { status: 404 }));
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("lists connections out of routing and hides healthy ones by default", async () => {
    const container = await renderClient();

    expect(container.textContent).toContain("Cooldown rules");
    expect(container.textContent).toContain("Cooling account");
    expect(container.textContent).toContain("Cooling down");
    expect(container.textContent).not.toContain("Healthy account");
  });

  it("clears one connection through POST /api/resilience/cooldowns", async () => {
    const container = await renderClient();
    const rowClear = [...container.querySelectorAll("tbody button")][0] as HTMLButtonElement;

    await act(async () => {
      rowClear.click();
    });

    const post = fetchMock.mock.calls.find(
      ([url, init]) => url === "/api/resilience/cooldowns" && init?.method === "POST"
    );
    expect(post).toBeTruthy();
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({ connectionIds: ["conn-cooling-1"] });
  });

  it("saves the stall switch and cooldown profiles through PATCH /api/resilience", async () => {
    const container = await renderClient();
    const stallSwitch = container.querySelector("[role='switch']") as HTMLElement;

    await act(async () => {
      stallSwitch.click();
    });
    await act(async () => {
      buttonByText(container, "Save rules")?.click();
    });

    const patch = fetchMock.mock.calls.find(
      ([url, init]) => url === "/api/resilience" && init?.method === "PATCH"
    );
    expect(JSON.parse(String(patch?.[1]?.body))).toEqual({
      streamStallCooldown: { enabled: true },
      connectionCooldown: {
        oauth: { baseCooldownMs: 5000, maxBackoffSteps: 6 },
        apikey: { baseCooldownMs: 3000, maxBackoffSteps: 4 },
      },
    });
  });
});
