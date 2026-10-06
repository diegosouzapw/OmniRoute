// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConnectionsHeaderToolbar from "../ConnectionsHeaderToolbar";
import EmptyConnectionsPlaceholder from "../EmptyConnectionsPlaceholder";
import type { ProviderMessageTranslator } from "../../providerPageHelpers";

const cleanups: Array<() => void> = [];

function renderComponent(node: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(node));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container;
}

const translations: Record<string, string> = {
  add: "Add",
  addConnection: "Add connection",
  connections: "Connections",
  noConnectionsYet: "No connections yet",
  addFirstConnectionHint: "Add your first connection",
  providerProxy: "Proxy",
  providerProxyConfigureHint: "Configure proxy",
};
const t = ((key: string) => translations[key] ?? key) as ProviderMessageTranslator;
t.has = () => false;

function getButton(container: HTMLElement, label: string): HTMLButtonElement | undefined {
  return Array.from(container.querySelectorAll("button")).find((button) =>
    button.textContent?.includes(label)
  );
}

function createActions() {
  const openApiKeyAddFlow = vi.fn();
  const openPrimaryAddFlow = vi.fn();
  const gateConnectionFlow = vi.fn((callback: () => void) => callback());
  return { openApiKeyAddFlow, openPrimaryAddFlow, gateConnectionFlow };
}

function renderEmptyProvider({
  providerId,
  supportsDualAuth,
  providerSupportsPat,
}: {
  providerId: string;
  supportsDualAuth: boolean;
  providerSupportsPat: boolean;
}) {
  const actions = createActions();
  const props: React.ComponentProps<typeof EmptyConnectionsPlaceholder> & {
    supportsDualAuth: boolean;
  } = {
    isOAuth: !providerSupportsPat,
    isCompatible: false,
    isCommandCode: false,
    providerId,
    supportsDualAuth,
    providerSupportsPat,
    commandCodeAuthState: { phase: "idle" },
    ...actions,
    handleOpenCommandCodeConnect: vi.fn(),
    onOpenOAuthModal: vi.fn(),
    onOpenImportCodex: vi.fn(),
    onOpenImportClaude: vi.fn(),
    onOpenImportGemini: vi.fn(),
    onOpenImportGrokCli: vi.fn(),
    t,
  };
  return { container: renderComponent(<EmptyConnectionsPlaceholder {...props} />), ...actions };
}

function renderPopulatedCodeBuddy() {
  const actions = createActions();
  const props: React.ComponentProps<typeof ConnectionsHeaderToolbar> & {
    supportsDualAuth: boolean;
  } = {
    providerId: "codebuddy-cn",
    providerInfo: { id: "codebuddy-cn", name: "CodeBuddy CN" },
    isCompatible: false,
    isCommandCode: false,
    isOAuth: true,
    supportsDualAuth: true,
    providerSupportsPat: false,
    connections: [{ id: "connection-1", authType: "oauth" }],
    batchTesting: false,
    batchRetesting: false,
    retestingId: null,
    proxyConfig: null,
    reorderingByAvailability: false,
    handleReorderByAvailability: vi.fn(),
    preferClaudeCodeForUnprefixedClaudeModels: false,
    claudeRoutingSettingsLoaded: true,
    claudeRoutingSettingsLoadError: null,
    savingClaudeRoutingPreference: false,
    handleToggleClaudeRoutingPreference: vi.fn(),
    loadClaudeRoutingSettings: vi.fn(),
    codexGlobalServiceMode: "auto",
    codexGlobalServiceModeOptions: [],
    codexSettingsLoaded: true,
    codexSettingsLoadError: null,
    savingCodexGlobalServiceMode: false,
    handleChangeCodexGlobalServiceMode: vi.fn(),
    loadCodexSettings: vi.fn(),
    onSetProxyTarget: vi.fn(),
    handleDistributeProxies: vi.fn(),
    handleBatchTestAll: vi.fn(),
    ...actions,
    openExternalLinkFlow: vi.fn(),
    handleOpenCommandCodeConnect: vi.fn(),
    commandCodeAuthState: { phase: "idle" },
    onOpenOAuthModal: vi.fn(),
    onOpenCodexCliGuide: vi.fn(),
    onOpenImportCodex: vi.fn(),
    onOpenImportClaude: vi.fn(),
    onOpenImportGemini: vi.fn(),
    onOpenImportGrokCli: vi.fn(),
    t,
  };
  return { container: renderComponent(<ConnectionsHeaderToolbar {...props} />), ...actions };
}

function expectDualAuthActions(
  container: HTMLElement,
  actions: ReturnType<typeof createActions>
): void {
  const connect = getButton(container, "Connect");
  const manualApiKey = getButton(container, "Manual API key");
  expect(connect, "OAuth Connect action must be rendered").toBeDefined();
  expect(manualApiKey, "Manual API key action must be rendered").toBeDefined();

  act(() => connect?.click());
  expect(actions.gateConnectionFlow).toHaveBeenCalledWith(actions.openPrimaryAddFlow);
  expect(actions.openPrimaryAddFlow).toHaveBeenCalledOnce();

  act(() => manualApiKey?.click());
  expect(actions.gateConnectionFlow).toHaveBeenCalledWith(actions.openApiKeyAddFlow);
  expect(actions.openApiKeyAddFlow).toHaveBeenCalledOnce();
}

describe("dual-auth provider actions (#8882)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("renders OAuth Connect and Manual API key for empty CodeBuddy CN", () => {
    const rendered = renderEmptyProvider({
      providerId: "codebuddy-cn",
      supportsDualAuth: true,
      providerSupportsPat: false,
    });
    expectDualAuthActions(rendered.container, rendered);
  });

  it("renders OAuth Connect and Manual API key for empty xAI", () => {
    const rendered = renderEmptyProvider({
      providerId: "xai",
      supportsDualAuth: true,
      providerSupportsPat: false,
    });
    expectDualAuthActions(rendered.container, rendered);
  });

  it("renders OAuth Connect and Manual API key for populated CodeBuddy CN", () => {
    const rendered = renderPopulatedCodeBuddy();
    expectDualAuthActions(rendered.container, rendered);
  });

  it("preserves ClinePass dual-auth actions", () => {
    const rendered = renderEmptyProvider({
      providerId: "clinepass",
      supportsDualAuth: true,
      providerSupportsPat: false,
    });
    expectDualAuthActions(rendered.container, rendered);
  });

  it("preserves Qoder PAT-primary and experimental OAuth actions", () => {
    const { container } = renderEmptyProvider({
      providerId: "qoder",
      supportsDualAuth: false,
      providerSupportsPat: true,
    });
    expect(getButton(container, "Add PAT")).toBeDefined();
    expect(getButton(container, "Experimental OAuth")).toBeDefined();
    expect(getButton(container, "Connect")).toBeUndefined();
    expect(getButton(container, "Manual API key")).toBeUndefined();
  });

  it("preserves an ordinary OAuth provider primary action", () => {
    const { container } = renderEmptyProvider({
      providerId: "gemini",
      supportsDualAuth: false,
      providerSupportsPat: false,
    });
    expect(getButton(container, "Add connection")).toBeDefined();
    expect(getButton(container, "Manual API key")).toBeUndefined();
  });

  it("preserves an ordinary free API-key provider PAT-primary action", () => {
    const { container } = renderEmptyProvider({
      providerId: "mimocode",
      supportsDualAuth: false,
      providerSupportsPat: true,
    });
    expect(getButton(container, "Add PAT")).toBeDefined();
    expect(getButton(container, "Connect")).toBeUndefined();
    expect(getButton(container, "Manual API key")).toBeUndefined();
  });
});
