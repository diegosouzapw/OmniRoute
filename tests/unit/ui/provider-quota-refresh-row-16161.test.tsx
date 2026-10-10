// @vitest-environment jsdom
import React, { act, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    const labels: Record<string, string> = {
      quotaRefreshCurrent: "Refresh current quota",
      quotaRefreshCurrentHint:
        "Queries this account's current quota without spending reset credits.",
      quotaRefreshing: "Checking quota…",
      quotaRefreshFresh: "Quota checked. Account availability is determined by the server.",
      quotaRefreshFailed: "Quota check failed. Previous data is unchanged.",
      quotaRefreshStale: "The server returned old quota data. This is not a fresh observation.",
      quotaRefreshPartial: "Only part of the quota is available.",
      quotaWindowUnavailable: "{window} quota unavailable",
      quotaConnectionRefreshFailed:
        "Quota check finished, but the account list could not be refreshed.",
      quotaRefresh: "Refresh usage",
    };
    let text = labels[key] ?? key;
    for (const [name, value] of Object.entries(values ?? {}))
      text = text.replace(`{${name}}`, String(value));
    return text;
  },
}));

import ConnectionRow, {
  type ConnectionRowProps,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";
import ConnectionsListPanel from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionsListPanel";
import { useProviderConnections } from "@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderConnections";
import { useProviderQuota } from "@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderQuota";

const cleanup: Array<() => void> = [];
const noop = () => {};
const valid = { quotas: { session: { used: 20, total: 100 }, weekly: { used: 40, total: 100 } } };
const account = {
  id: "a",
  provider: "codex",
  name: "Synthetic Codex",
  testStatus: "active",
  priority: 1,
};

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
});
afterEach(() => {
  while (cleanup.length) cleanup.pop()?.();
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

async function mount(element: React.ReactElement) {
  const el = document.createElement("div");
  document.body.append(el);
  const root = createRoot(el);
  cleanup.push(() => act(() => root.unmount()));
  await act(async () => root.render(element));
  return el;
}

function rowProps(overrides: Partial<ConnectionRowProps> = {}): ConnectionRowProps {
  return {
    connection: account,
    isOAuth: true,
    isCodex: true,
    isFirst: true,
    isLast: true,
    onMoveUp: noop,
    onMoveDown: noop,
    onToggleActive: noop,
    onToggleRateLimit: noop,
    onRetest: noop,
    onEdit: noop,
    onDelete: noop,
    onToggleQuotaVisibility: noop,
    onRefreshQuota: noop,
    quotaCache: valid,
    ...overrides,
  };
}

function refreshButtons(el: HTMLElement) {
  return Array.from(el.querySelectorAll<HTMLButtonElement>("button")).filter(
    (b) =>
      b.textContent?.includes("Refresh current quota") || b.textContent?.includes("Checking quota…")
  );
}

function listProps(tagged: boolean): Parameters<typeof ConnectionsListPanel>[0] {
  return {
    connections: [{ ...account, providerSpecificData: tagged ? { tag: "test-group" } : {} }],
    providerId: "codex",
    isCcCompatible: false,
    isOAuth: true,
    codexGlobalServiceMode: "auto",
    selectedIds: new Set(),
    batchUpdating: null,
    batchRetesting: false,
    batchDeleting: false,
    batchTesting: false,
    retestingId: null,
    refreshingId: null,
    distributingProxies: false,
    healthFilter: "all",
    page: 0,
    accountSearch: "",
    PAGE_SIZE: 50,
    connProxyMap: {},
    proxyConfig: null,
    applyingCodexAuthId: null,
    exportingCodexAuthId: null,
    applyingClaudeAuthId: null,
    exportingClaudeAuthId: null,
    emailsVisible: true,
    setSelectedIds: noop,
    setPage: noop,
    setHealthFilter: noop,
    setAccountSearch: noop,
    deleteConfirm: {
      connection: null,
      deleting: false,
      request: noop,
      confirm: async () => {},
      cancel: noop,
    },
    handleUpdateConnectionStatus: noop,
    handleToggleRateLimit: noop,
    handleToggleQuotaVisibility: noop,
    handleToggleClaudeExtraUsage: noop,
    handleToggleCodexPaidCredits: noop,
    handleToggleCliproxyapiMode: noop,
    handleSetUpstreamProxyMode: noop,
    upstreamProxyMode: "native",
    upstreamProxyFallbackBackend: "cliproxyapi",
    handleToggleCodexLimit: noop,
    handleToggleProxyEnabled: noop,
    handleTogglePerKeyProxyEnabled: noop,
    handleRetestConnection: noop,
    handleRefreshToken: noop,
    handleSwapPriority: noop,
    handleBatchSetActive: noop,
    handleBatchDeleteOpenModal: noop,
    handleBatchRetest: noop,
    handleToggleSelectOne: noop,
    handleToggleSelectAll: noop,
    handleDistributeProxies: noop,
    cpaProviderEnabled: false,
    quotaByConnectionId: { a: valid },
    quotaRefreshingIds: new Set(),
    quotaRefreshStates: { a: { status: "stale" } },
    handleRefreshQuota: noop,
    onOpenEditModal: noop,
    onOpenOAuth: noop,
    onSetProxyTarget: noop,
    onOpenApplyCodexModal: noop,
    onExportCodexAuthFile: noop,
    onOpenApplyClaudeModal: noop,
    onExportClaudeAuthFile: noop,
    gateConnectionFlow: (callback) => callback(),
    t: (key: string) => key,
  };
}

describe("#16161 quota row action", () => {
  it.each([true, false])(
    "A10 provides exactly one Codex action when quotaVisible=%s",
    async (quotaVisible) => {
      const click = vi.fn();
      const el = await mount(
        <ConnectionRow
          {...rowProps({ connection: { ...account, quotaVisible }, onRefreshQuota: click })}
        />
      );
      const buttons = refreshButtons(el);
      expect(buttons).toHaveLength(1);
      expect(buttons[0].title).toContain("without spending reset credits");
      expect(el.querySelector("button[title='Refresh usage']")).toBeNull();
      expect(click).not.toHaveBeenCalled();
      act(() => buttons[0].click());
      expect(click).toHaveBeenCalledTimes(1);
    }
  );

  it("A10 exposes a disabled busy action and accessible status", async () => {
    const click = vi.fn();
    const el = await mount(
      <ConnectionRow
        {...rowProps({
          quotaRefreshing: true,
          quotaRefreshState: { status: "loading" },
          onRefreshQuota: click,
        })}
      />
    );
    const buttons = refreshButtons(el);
    expect(buttons).toHaveLength(1);
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[0].getAttribute("aria-busy")).toBe("true");
    expect(el.querySelector("[role='status']")?.textContent).toContain("Checking quota");
    act(() => buttons[0].click());
    expect(click).not.toHaveBeenCalled();
  });

  it.each(["stale", "error", "fresh"] as const)(
    "A10 renders a safe %s result without claiming recovery",
    async (status) => {
      const el = await mount(<ConnectionRow {...rowProps({ quotaRefreshState: { status } })} />);
      expect(el.querySelector("[role='status']")?.textContent).toContain(
        status === "stale"
          ? "old quota"
          : status === "error"
            ? "check failed"
            : "determined by the server"
      );
      expect(el.textContent).not.toContain("recovered");
    }
  );

  it.each(["session", "weekly"] as const)(
    "A05 explicitly marks the missing %s window",
    async (missing) => {
      const el = await mount(
        <ConnectionRow
          {...rowProps({ quotaRefreshState: { status: "partial", missingWindows: [missing] } })}
        />
      );
      expect(el.querySelector("[role='status']")?.textContent).toContain(
        `${missing === "session" ? "5h" : "7d"} quota unavailable`
      );
    }
  );

  it("A09 distinguishes list reload failure in the row", async () => {
    const el = await mount(
      <ConnectionRow
        {...rowProps({ quotaRefreshState: { status: "fresh", connectionsRefreshFailed: true } })}
      />
    );
    expect(el.querySelector("[role='status']")?.textContent).toContain(
      "account list could not be refreshed"
    );
  });

  it.each([false, true])(
    "A10 forwards status and ID through the list (tagged=%s)",
    async (tagged) => {
      const click = vi.fn();
      const props = listProps(tagged);
      props.handleRefreshQuota = click;
      const el = await mount(<ConnectionsListPanel {...props} />);
      expect(el.querySelector("[role='status']")?.textContent).toContain("old quota");
      expect(refreshButtons(el)).toHaveLength(1);
      act(() => refreshButtons(el)[0].click());
      expect(click).toHaveBeenCalledExactlyOnceWith("a");
    }
  );

  it.each(["claude", "antigravity"])("A11 preserves the existing %s action", async (provider) => {
    const click = vi.fn();
    const el = await mount(
      <ConnectionRow
        {...rowProps({
          connection: { ...account, provider },
          isCodex: false,
          onRefreshQuota: click,
        })}
      />
    );
    expect(refreshButtons(el)).toHaveLength(0);
    const button = el.querySelector<HTMLButtonElement>("button[title='Refresh usage']")!;
    expect(button).not.toBeNull();
    act(() => button.click());
    expect(click).toHaveBeenCalledTimes(1);
  });
});

let currentConnections: ReturnType<typeof useProviderConnections>;
let currentQuota: ReturnType<typeof useProviderQuota>;
function ComposedHooks() {
  const connections = useProviderConnections("codex", false, false);
  const quota = useProviderQuota({
    providerId: "codex",
    refreshConnections: connections.fetchConnections,
  });
  useEffect(() => {
    currentConnections = connections;
    currentQuota = quota;
  }, [connections, quota]);
  return <output>{connections.connections.map((connection) => connection.name).join(",")}</output>;
}

function fixtureFetch(listFails = false) {
  let live = false;
  return vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
    const url = String(input);
    expect(init?.method ?? "GET").toBe("GET");
    if (url === "/api/usage/provider-limits") return Response.json({ caches: {} });
    if (url === "/api/usage/a") {
      live = true;
      return Response.json(valid);
    }
    if (url.startsWith("/api/providers?"))
      return Response.json(
        { connections: [{ ...account, name: live ? "Updated projection" : "Old projection" }] },
        { status: live && listFails ? 503 : 200 }
      );
    if (url === "/api/provider-nodes") return Response.json({ nodes: [] });
    if (url.startsWith("/api/settings/proxy")) return Response.json({});
    if (url === "/api/upstream-proxy/codex") return Response.json({ enabled: false });
    throw new Error(`Unexpected fixture request: ${url}`);
  });
}

describe("#16161 real hook composition", () => {
  it("A09 refreshes the row projection through the existing connections GET", async () => {
    const fetch = fixtureFetch();
    const el = await mount(<ComposedHooks />);
    expect(el.textContent).toBe("Old projection");
    await act(async () => currentQuota.refreshConnection("a"));
    expect(el.textContent).toBe("Updated projection");
    expect(currentQuota.refreshStates.a).toEqual({ status: "fresh" });
    expect(
      fetch.mock.calls.filter(([url]) => String(url).startsWith("/api/providers?"))
    ).toHaveLength(2);
  });

  it("A09 detects a swallowed list HTTP failure without overwriting the valid quota", async () => {
    fixtureFetch(true);
    const el = await mount(<ComposedHooks />);
    await act(async () => currentQuota.refreshConnection("a"));
    expect(el.textContent).toBe("Old projection");
    expect(currentQuota.refreshStates.a).toEqual({
      status: "fresh",
      connectionsRefreshFailed: true,
    });
    expect(currentQuota.quotaByConnectionId.a.quotas).toEqual(valid.quotas);
  });

  it("A09 the connections callback reports successful and failed observations", async () => {
    const fetch = fixtureFetch();
    await mount(<ComposedHooks />);
    let success: unknown;
    await act(async () => {
      success = await currentConnections.fetchConnections();
    });
    expect(success).toBe(true);
    fetch.mockImplementation(async (input) =>
      String(input) === "/api/provider-nodes"
        ? Response.json({ nodes: [] })
        : Response.json({}, { status: 503 })
    );
    await act(async () => {
      success = await currentConnections.fetchConnections();
    });
    expect(success).toBe(false);
  });
});

function pendingResponse() {
  let resolve!: (value: Response) => void;
  const promise = new Promise<Response>((done) => {
    resolve = done;
  });
  return { resolve, promise };
}

describe("#16161 connection projection ordering", () => {
  it("A08/A09 concurrent account queries cannot restore an older connection projection", async () => {
    const slow = pendingResponse();
    const fast = pendingResponse();
    let reads = 0;
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);
      if (url.startsWith("/api/providers?")) {
        reads++;
        if (reads === 2) return slow.promise;
        if (reads === 3) return fast.promise;
        return Response.json({ connections: [account] });
      }
      if (url === "/api/provider-nodes") return Response.json({ nodes: [] });
      if (url === "/api/usage/provider-limits") return Response.json({ caches: {} });
      if (url === "/api/usage/a" || url === "/api/usage/b") return Response.json(valid);
      if (url.startsWith("/api/settings/proxy") || url === "/api/upstream-proxy/codex")
        return Response.json({});
      throw new Error("Unexpected fixture request");
    });
    const el = await mount(<ComposedHooks />);
    let a!: Promise<void>;
    let b!: Promise<void>;
    await act(async () => {
      a = currentQuota.refreshConnection("a");
    });
    await act(async () => {
      b = currentQuota.refreshConnection("b");
    });
    expect(reads).toBe(3);
    await act(async () => {
      fast.resolve(Response.json({ connections: [{ ...account, name: "Newest projection" }] }));
      await b;
    });
    expect(el.textContent).toBe("Newest projection");
    await act(async () => {
      slow.resolve(Response.json({ connections: [{ ...account, name: "Obsolete projection" }] }));
      await a;
    });
    expect(el.textContent).toBe("Newest projection");
    expect(currentQuota.refreshingIds.size).toBe(0);
  });

  it("A08 a delayed initial connections GET cannot replace the refreshed projection", async () => {
    const initial = pendingResponse();
    let reads = 0;
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);
      if (url.startsWith("/api/providers?")) {
        reads++;
        if (reads === 1) return initial.promise;
        return Response.json({ connections: [{ ...account, name: "Newest projection" }] });
      }
      if (url === "/api/provider-nodes") return Response.json({ nodes: [] });
      if (url === "/api/usage/provider-limits") return Response.json({ caches: {} });
      if (url === "/api/usage/a") return Response.json(valid);
      if (url.startsWith("/api/settings/proxy") || url === "/api/upstream-proxy/codex")
        return Response.json({});
      throw new Error("Unexpected fixture request");
    });
    const el = await mount(<ComposedHooks />);
    await act(async () => currentQuota.refreshConnection("a"));
    expect(el.textContent).toBe("Newest projection");
    await act(async () =>
      initial.resolve(Response.json({ connections: [{ ...account, name: "Obsolete projection" }] }))
    );
    expect(el.textContent).toBe("Newest projection");
    expect(reads).toBe(2);
  });
});

function ConnectionsProbe({ providerId = "codex" }: { providerId?: string }) {
  const connections = useProviderConnections(providerId, false, false);
  useEffect(() => {
    currentConnections = connections;
  }, [connections]);
  return <output>{connections.connections.map((connection) => connection.name).join(",")}</output>;
}

describe("#16161 projection lifecycle controls", () => {
  it.each(["provider change", "unmount"])(
    "A08 rejects an in-flight projection after %s",
    async (transition) => {
      const slow = pendingResponse();
      let reads = 0;
      vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
        const url = String(input);
        if (url.startsWith("/api/providers?")) {
          reads++;
          if (reads === 2) return slow.promise;
          return Response.json({
            connections: [
              {
                ...account,
                provider: reads > 2 ? "openai" : "codex",
                name: reads > 2 ? "New provider" : "Initial",
              },
            ],
          });
        }
        if (url === "/api/provider-nodes") return Response.json({ nodes: [] });
        if (url.startsWith("/api/settings/proxy") || url === "/api/upstream-proxy/codex")
          return Response.json({});
        throw new Error("Unexpected fixture request");
      });
      const el = document.createElement("div");
      document.body.append(el);
      const root = createRoot(el);
      let mounted = true;
      cleanup.push(() => {
        if (mounted) act(() => root.unmount());
      });
      await act(async () => root.render(<ConnectionsProbe />));
      let request!: Promise<boolean>;
      await act(async () => {
        request = currentConnections.fetchConnections();
      });
      if (transition === "provider change")
        await act(async () => root.render(<ConnectionsProbe providerId="openai" />));
      else {
        await act(async () => root.unmount());
        mounted = false;
      }
      let accepted: boolean | undefined;
      await act(async () => {
        slow.resolve(Response.json({ connections: [{ ...account, name: "Obsolete" }] }));
        accepted = await request;
      });
      expect(accepted).toBe(false);
      expect(el.textContent).toBe(transition === "provider change" ? "New provider" : "");
    }
  );

  it("A08 StrictMode cleanup does not suppress the replacement mount", async () => {
    const fetch = fixtureFetch();
    const el = await mount(
      <React.StrictMode>
        <ComposedHooks />
      </React.StrictMode>
    );
    expect(el.textContent).toBe("Old projection");
    await act(async () => currentQuota.refreshConnection("a"));
    expect(el.textContent).toBe("Updated projection");
    expect(currentQuota.refreshStates.a.status).toBe("fresh");
    expect(
      fetch.mock.calls.filter(([url]) => String(url).startsWith("/api/providers?"))
    ).toHaveLength(3);
  });
});
