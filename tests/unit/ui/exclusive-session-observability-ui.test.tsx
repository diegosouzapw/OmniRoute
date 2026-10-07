// @vitest-environment jsdom

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    if (namespace === "common" && key === "active") return "Localized active";
    if (namespace === "usage" && key === "noSessions") return "Localized empty state";
    return key;
  },
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
}));

const { default: SessionsTab } =
  await import("../../../src/app/(dashboard)/dashboard/usage/components/SessionsTab");

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

async function renderPayload(payload: Record<string, unknown>): Promise<void> {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      json: async () => payload,
    }))
  );

  await act(async () => {
    root.render(<SessionsTab />);
    await Promise.resolve();
    await Promise.resolve();
  });
}

it("keeps idle leases visible, de-duplicates legacy rows, and localizes only active work", async () => {
  await renderPayload({
    count: 2,
    sessions: [
      {
        sessionId: "legacy-active",
        ageMs: 1_000,
        requestCount: 4,
        connectionId: "conn-active",
      },
      {
        sessionId: "legacy-unmanaged",
        ageMs: 2_000,
        requestCount: 1,
        connectionId: "conn-unmanaged",
      },
    ],
    exclusiveSessions: [
      {
        sessionId: "lease:conn-active",
        ageMs: null,
        requestCount: 4,
        connectionId: "conn-active",
        connectionName: "Friendly active account",
        leaseBacked: true,
        active: true,
      },
      {
        sessionId: "lease:conn-idle",
        ageMs: null,
        requestCount: 0,
        connectionId: "conn-idle",
        connectionName: "Friendly idle account",
        leaseBacked: true,
        active: false,
      },
    ],
  });

  expect(container.querySelector("[title='lease:conn-active']")).not.toBeNull();
  expect(container.querySelector("[title='lease:conn-idle']")).not.toBeNull();
  expect(container.querySelector("[title='legacy-unmanaged']")).not.toBeNull();
  expect(container.querySelector("[title='legacy-active']")).toBeNull();
  expect(container.textContent).toContain("Friendly active account");
  expect(container.textContent).toContain("Friendly idle account");

  const activeLabels = Array.from(container.querySelectorAll("span")).filter(
    (node) => node.textContent === "Localized active"
  );
  expect(activeLabels).toHaveLength(1);
  const idleRow = container.querySelector("[title='lease:conn-idle']")?.closest("tr");
  expect(idleRow?.textContent).not.toContain("Localized active");
  expect(container.textContent).not.toContain("IDLE");

  expect(container.querySelector("[data-testid='session-count']")?.textContent).toBe("3");
});

it("preserves a legacy-only response when additive lease fields are absent", async () => {
  await renderPayload({
    count: 1,
    sessions: [
      {
        sessionId: "legacy-only",
        ageMs: 1_000,
        requestCount: 1,
        connectionId: null,
      },
    ],
    byApiKey: {},
  });

  expect(container.querySelector("[title='legacy-only']")).not.toBeNull();
  expect(container.textContent).not.toContain("Localized empty state");
  expect(container.querySelector("[data-testid='session-count']")?.textContent).toBe("1");
});

it("keeps the localized empty state and zero count", async () => {
  await renderPayload({ count: 0, sessions: [], byApiKey: {} });

  expect(container.textContent).toContain("Localized empty state");
  expect(container.querySelector("tbody")).toBeNull();
  expect(container.querySelector("[data-testid='session-count']")?.textContent).toBe("0");
});
