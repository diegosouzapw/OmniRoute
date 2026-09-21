// @vitest-environment jsdom
/**
 * Provider page: saving a proxy from the provider/account proxy modal must
 * refresh the per-connection proxy badges, not only the provider-level config.
 *
 * ProxyConfigModal writes the assignment through
 * `PUT /api/settings/proxies/assignments` (registry scope assignment), but the
 * account-row badges on the provider page are fed by `connProxyMap`, which is
 * filled from `GET /api/settings/proxy?resolve=<connectionId>`. The modal's
 * `onSaved` callback refreshed only `proxyConfig`
 * (`GET /api/settings/proxy`), so a saved proxy stayed invisible on the page
 * until a manual reload.
 *
 * This wires the same production pieces the real page composes —
 * useProviderConnections (owns connProxyMap + the refresh callbacks) and
 * ProviderModalsPanel (owns the ProxyConfigModal `onSaved` binding) — and
 * asserts the refresh contract through that public path, so it holds for any
 * implementation of the refresh rather than pinning one helper name.
 */
import React, { act, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "codex" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/dashboard/providers/codex",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

// Stand in for the real ProxyConfigModal: it only needs to expose the `onSaved`
// callback the page binds, which is what fires after a successful save.
vi.mock("@/shared/components", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("@/shared/components");
  return {
    ...actual,
    ProxyConfigModal: ({ onSaved }: { onSaved?: () => void }) => (
      <button type="button" data-testid="proxy-saved" onClick={() => onSaved?.()}>
        save
      </button>
    ),
  };
});

const CONNECTION_ID = "conn-proxy-refresh";

/** What `GET /api/settings/proxy?resolve=<id>` currently reports. */
let resolvedProxy: { name: string; host: string } | null = null;

const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
  const url = typeof input === "string" ? input : String(input);
  const json = (body: unknown) => ({
    ok: true,
    status: 200,
    json: async () => body,
    text: async () => JSON.stringify(body),
    headers: { get: () => "application/json" },
  });

  if (url.startsWith("/api/settings/proxy?resolve=")) {
    return json(resolvedProxy ? { proxy: resolvedProxy, level: "account" } : { proxy: null });
  }
  if (url.startsWith("/api/settings/proxy")) {
    return json({ global: null, providers: {} });
  }
  if (url.startsWith("/api/providers")) {
    return json({
      connections: [{ id: CONNECTION_ID, provider: "codex", name: "Account A", priority: 1 }],
    });
  }
  if (url.startsWith("/api/provider-nodes")) {
    return json({ nodes: [] });
  }
  return json({});
});

vi.stubGlobal("fetch", fetchMock);

function resolveCallCount() {
  return fetchMock.mock.calls.filter((call) =>
    String(call[0]).startsWith("/api/settings/proxy?resolve=")
  ).length;
}

describe("provider page — proxy save refreshes per-connection proxy badges", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    resolvedProxy = null;
    fetchMock.mockClear();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("re-resolves connection proxies when ProxyConfigModal reports a save", async () => {
    const { useProviderConnections } = await import("../hooks/useProviderConnections");
    const ProviderModalsPanel = (await import("../components/ProviderModalsPanel")).default;

    type HookResult = ReturnType<typeof useProviderConnections>;
    let hook: HookResult | null = null;

    // Mirrors the real page: the hook owns connProxyMap + refresh callbacks,
    // ProviderModalsPanel owns the ProxyConfigModal binding.
    function Harness() {
      const hookResult = useProviderConnections("codex", false, false);
      const [proxyTarget, setProxyTarget] = useState<{
        level: string;
        id: string;
        label: string;
      } | null>({ level: "key", id: CONNECTION_ID, label: "Account A" });

      useEffect(() => {
        hook = hookResult;
      }, [hookResult]);

      const panelProps = {
        providerId: "codex",
        providerInfo: { name: "Codex" },
        isCompatible: false,
        isAnthropicProtocolCompatible: false,
        isCcCompatible: false,
        isCommandCode: false,
        isUpstreamProxyProvider: false,
        subscriptionRisk: false,
        showRiskNoticeModal: false,
        showKimiAuthMethodModal: false,
        showOAuthModal: false,
        reauthConnection: null,
        showSiliconFlowEndpointModal: false,
        showAddApiKeyModal: false,
        siliconFlowInitialBaseUrl: undefined,
        commandCodeAuthState: { phase: "idle" },
        batchDeleteConfirmOpen: false,
        selectedIds: new Set<string>(),
        batchDeleting: false,
        deleteConfirm: hookResult.deleteConfirm,
        applyCodexModalConnectionId: null,
        applyingCodexAuthId: null,
        importCodexModalOpen: false,
        fetchConnections: hookResult.fetchConnections,
        externalLinkModalOpen: false,
        externalLinkLoading: false,
        externalLinkError: null,
        externalLinkUrl: null,
        externalLinkCopied: false,
        showEditModal: false,
        selectedConnection: null,
        showEditNodeModal: false,
        providerNode: null,
        codexCliGuideOpen: false,
        applyClaudeModalConnectionId: null,
        applyingClaudeAuthId: null,
        importClaudeModalOpen: false,
        importGrokCliModalOpen: false,
        batchTestResults: null,
        emailsVisible: false,
        proxyTarget,
        setProxyTarget,
        fetchProxyConfig: hookResult.fetchProxyConfig,
        refreshProxyState: hookResult.refreshProxyState,
        importProgress: {
          current: 0,
          total: 0,
          phase: "idle",
          status: "",
          logs: [],
          error: "",
          importedCount: 0,
        },
        showImportModal: false,
        showTutorialModal: false,
        t: (key: string) => key,
      };

      return <ProviderModalsPanel {...(panelProps as never)} />;
    }

    await act(async () => {
      root.render(<Harness />);
    });
    // Let the connections effect settle so connProxyMap is populated once.
    await act(async () => {
      await Promise.resolve();
    });

    expect(hook).not.toBeNull();
    expect(hook!.connProxyMap[CONNECTION_ID]).toBeNull();

    const resolvesBeforeSave = resolveCallCount();
    expect(resolvesBeforeSave).toBeGreaterThan(0);

    // The user picks a proxy and saves: the assignment now exists server-side.
    resolvedProxy = { name: "Saved Proxy", host: "10.0.0.9" };

    const saveButton = container.querySelector<HTMLButtonElement>('[data-testid="proxy-saved"]');
    expect(saveButton).not.toBeNull();

    await act(async () => {
      saveButton!.click();
    });
    await act(async () => {
      await Promise.resolve();
    });

    expect(resolveCallCount()).toBeGreaterThan(resolvesBeforeSave);
    expect(hook!.connProxyMap[CONNECTION_ID]).toEqual({
      proxy: { name: "Saved Proxy", host: "10.0.0.9" },
      level: "account",
    });
  }, 30000);
});
