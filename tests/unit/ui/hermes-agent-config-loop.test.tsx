// @vitest-environment jsdom
//
// Regression guard for the infinite render loop on /dashboard/cli-agents/hermes-agent.
//
// HermesAgentToolCard used to list `currentRoles` in the dependency array of the
// effect that calls loadCurrentConfig(); loadCurrentConfig() sets currentRoles to a
// fresh object on every fetch, so the effect re-fired → refetched → re-set → … forever.
// On the detail page isExpanded is hardcoded true, so it spun without end and spammed
// GET /api/cli-tools/hermes-agent-settings in the console. This test mounts the card
// expanded and asserts the settings endpoint is fetched a BOUNDED number of times.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  Button: ({ children, onClick, disabled, ...props }: any) => (
    <button type="button" onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ),
  ModelSelectModal: () => <div data-testid="ModelSelectModal" />,
}));

const { default: HermesAgentToolCard } = await import(
  "@/app/(dashboard)/dashboard/cli-code/components/HermesAgentToolCard"
);

const SETTINGS_ENDPOINT = "/api/cli-tools/hermes-agent-settings";
const containers: HTMLElement[] = [];
let settingsCalls = 0;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  settingsCalls = 0;

  // fetch mock: count settings GETs and return valid roles. A safety valve breaks any
  // runaway loop after 8 calls (returns a non-success body so loadCurrentConfig stops
  // mutating currentRoles) so the buggy code FAILS the assertion instead of hanging.
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: any) => {
      const u = typeof url === "string" ? url : String(url);
      if (u.includes(SETTINGS_ENDPOINT)) {
        settingsCalls++;
        if (settingsCalls > 8) {
          return { ok: false, json: async () => ({ success: false }) } as any;
        }
        return {
          ok: true,
          json: async () => ({
            success: true,
            roles: {
              default: {
                model: "openai/gpt-4o",
                provider: "omniroute",
                base_url: "http://localhost:20128",
              },
            },
          }),
        } as any;
      }
      return { ok: true, json: async () => ({}) } as any;
    })
  );
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

function renderExpandedCard() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(
      <HermesAgentToolCard
        tool={{ name: "Hermes Agent", description: "Hermes Agent" }}
        isExpanded={true}
        baseUrl="http://localhost:20128"
        apiKeys={[{ id: "key-1" }]}
        activeProviders={[]}
        batchStatus={null}
      />
    );
  });
  return container;
}

describe("HermesAgentToolCard — config-load effect", () => {
  it("loads current config once when expanded (does not loop on currentRoles)", async () => {
    renderExpandedCard();

    // Drive every pending microtask/effect to quiescence. On the buggy code each
    // settings response re-triggered the effect, so these flushes would keep firing
    // fetches up to the safety valve; on the fixed code it settles after one fetch.
    for (let i = 0; i < 6; i++) {
      await act(async () => {});
    }

    expect(settingsCalls).toBeLessThanOrEqual(2);
    expect(settingsCalls).toBeGreaterThanOrEqual(1);
  });
});
