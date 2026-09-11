// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "codex" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/dashboard/providers/codex",
}));
vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));
const notify = { success: vi.fn(), error: vi.fn(), info: vi.fn(), warning: vi.fn() };
vi.mock("@/store/notificationStore", () => ({ useNotificationStore: () => notify }));

import ConnectionRow from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";
import { useProviderConnections } from "@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderConnections";

const connection = {
  id: "business",
  provider: "codex",
  name: "Business",
  isActive: true,
  lastErrorSource: "rate_limit",
  rateLimitedUntil: "2099-01-01T00:00:00Z",
  providerSpecificData: { workspaceId: "workspace", allowPaidCredits: false },
};
const secondConnection = { ...connection, id: "pro", name: "Pro" };
type Hook = ReturnType<typeof useProviderConnections>;

describe("Codex extra-credit account button", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;
  let hook: Hook;
  let putStatus: number;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    putStatus = 200;
    vi.clearAllMocks();
    fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (init?.method === "PUT") {
        return { ok: putStatus === 200, json: async () => ({ error: "Update rejected" }) };
      }
      const body = url.startsWith("/api/providers")
        ? { connections: [connection, secondConnection] }
        : url === "/api/provider-nodes"
          ? { nodes: [] }
          : {};
      return { ok: true, json: async () => body, headers: { get: () => null } };
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  async function mount(provider = "codex") {
    function Harness() {
      hook = useProviderConnections(provider, false, true);
      const target = hook.connections.find((c) => c.id === connection.id);
      return target ? (
        <ConnectionRow
          connection={target}
          isOAuth
          isCodex={provider === "codex"}
          isFirst
          isLast
          onMoveUp={() => {}}
          onMoveDown={() => {}}
          onToggleActive={() => {}}
          onToggleRateLimit={() => {}}
          onToggleCodexPaidCredits={(enabled) =>
            void hook.handleToggleCodexPaidCredits(target.id!, enabled)
          }
          onRetest={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ) : null;
    }
    await act(async () => root.render(<Harness />));
  }

  function button() {
    return container.querySelector<HTMLButtonElement>(
      "button[title='codexPaidCreditsToggleTitle']"
    )!;
  }

  it("saves both directions without changing other settings, accounts or cooldowns", async () => {
    await mount();
    expect(button().getAttribute("aria-pressed")).toBe("false");
    expect(button().textContent).toContain("toggleOffShort");
    for (const enabled of [true, false]) {
      await act(async () => button().click());
      expect(button().getAttribute("aria-pressed")).toBe(String(enabled));
      const puts = fetchMock.mock.calls.filter(([, init]) => init?.method === "PUT");
      expect(puts.at(-1)?.[0]).toBe("/api/providers/business");
      expect(JSON.parse(puts.at(-1)?.[1].body)).toEqual({
        providerSpecificData: { workspaceId: "workspace", allowPaidCredits: enabled },
      });
      expect(hook.connections[0].rateLimitedUntil).toBe(connection.rateLimitedUntil);
      expect(hook.connections[0].lastErrorSource).toBe("rate_limit");
      expect(hook.connections[1]).toEqual(secondConnection);
    }
    expect(notify.success).toHaveBeenCalledTimes(2);
  });

  it("leaves credits disabled and reports a rejected update", async () => {
    putStatus = 500;
    await mount();
    await act(async () => button().click());
    expect(button().getAttribute("aria-pressed")).toBe("false");
    expect(hook.connections[0].providerSpecificData?.allowPaidCredits).toBe(false);
    expect(notify.error).toHaveBeenCalledWith("Update rejected");
    expect(notify.success).not.toHaveBeenCalled();
  });

  it("does not show the Codex paid-credit button on other providers", async () => {
    await mount("claude");
    expect(button()).toBeNull();
  });
});
