// @vitest-environment jsdom
//
// Phase 1f smoke tests for Issue #3501 (strangler-fig decomposition).
// Validates:
//   1. useProviderConnections initialises with expected defaults.
//   2. useProviderSettings initialises with expected defaults.
//   3. useProviderModels initialises with expected defaults.
//   4. No cycle: none of the three hooks import from ProviderDetailPageClient.
//
// Uses createRoot + act to mount each hook inside a minimal wrapper component
// so we test real React hook semantics without a full Next.js server context.

import React, { act, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import path from "node:path";

// ---------------------------------------------------------------------------
// Global mocks required by the extracted hooks
// ---------------------------------------------------------------------------

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "test-provider" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/providers/test-provider",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) {
      return Object.entries(values).reduce((acc, [k, v]) => acc.replace(`{${k}}`, String(v)), key);
    }
    return key;
  },
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

// Stub fetch so the hooks don't fire real network calls during mount
const fetchStub = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({}),
  text: async () => "",
  headers: { get: () => null },
} as any);
vi.stubGlobal("fetch", fetchStub);

// ---------------------------------------------------------------------------
// useProviderConnections
// ---------------------------------------------------------------------------

describe("useProviderConnections — initial state", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    fetchStub.mockClear();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("exposes connections=[], loading=true, batchTesting=false on first render", async () => {
    const { useProviderConnections } = await import("../hooks/useProviderConnections");

    type HookResult = ReturnType<typeof useProviderConnections>;
    let result: HookResult | null = null;

    function TestWrapper() {
      const hookResult = useProviderConnections("openai", true, false);
      useEffect(() => {
        result = hookResult;
      }, [hookResult]);
      return (
        <span data-testid="loaded">
          {String(hookResult.connections.length)}|{String(hookResult.batchTesting)}
        </span>
      );
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });

    expect(result).not.toBeNull();
    expect(result!.connections).toEqual([]);
    expect(result!.batchTesting).toBe(false);
    expect(result!.batchDeleting).toBe(false);
    expect(result!.selectedIds.size).toBe(0);
    expect(result!.batchDeleteConfirmOpen).toBe(false);
    expect(result!.healthFilter).toBe("all");
    expect(result!.page).toBe(0);
  });

  it("exposes all expected handler functions", async () => {
    const { useProviderConnections } = await import("../hooks/useProviderConnections");

    type HookResult = ReturnType<typeof useProviderConnections>;
    let result: HookResult | null = null;

    function TestWrapper() {
      const hookResult = useProviderConnections("openai", true, false);
      useEffect(() => {
        result = hookResult;
      }, [hookResult]);
      return <span />;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });

    const expected = [
      "fetchConnections",
      "fetchProxyConfig",
      "handleDelete",
      "handleUpdateConnectionStatus",
      "handleToggleRateLimit",
      "handleToggleClaudeExtraUsage",
      "handleToggleCodexLimit",
      "handleToggleCliproxyapiMode",
      "handleToggleProxyEnabled",
      "handleTogglePerKeyProxyEnabled",
      "handleRetestConnection",
      "handleRefreshToken",
      "handleSwapPriority",
      "handleBatchSetActive",
      "handleBatchDeleteOpenModal",
      "handleBatchDeleteConfirm",
      "handleBatchRetest",
      "handleBatchTestAll",
      "handleToggleSelectOne",
      "handleToggleSelectAll",
      "handleDistributeProxies",
      "parseApiErrorMessage",
      "getAttachmentFilename",
    ] as const;

    for (const fn of expected) {
      expect(typeof (result as any)[fn]).toBe("function");
    }
  });
});

// ---------------------------------------------------------------------------
// useProviderSettings
// ---------------------------------------------------------------------------

describe("useProviderSettings — initial state", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    fetchStub.mockClear();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("exposes codex defaults for a non-codex provider", async () => {
    const { useProviderSettings } = await import("../hooks/useProviderSettings");

    type HookResult = ReturnType<typeof useProviderSettings>;
    let result: HookResult | null = null;

    function TestWrapper() {
      const hookResult = useProviderSettings("openai");
      useEffect(() => {
        result = hookResult;
      }, [hookResult]);
      return <span />;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });

    expect(result).not.toBeNull();
    // Non-codex provider: settings stay at defaults
    expect(result!.codexGlobalServiceMode).toBe("none");
    expect(result!.codexSettingsLoaded).toBe(false);
    expect(result!.savingCodexGlobalServiceMode).toBe(false);
    // Claude routing starts unloaded
    expect(result!.preferClaudeCodeForUnprefixedClaudeModels).toBe(false);
    expect(result!.claudeRoutingSettingsLoaded).toBe(false);
    expect(result!.savingClaudeRoutingPreference).toBe(false);
  });

  it("exposes handler functions", async () => {
    const { useProviderSettings } = await import("../hooks/useProviderSettings");

    type HookResult = ReturnType<typeof useProviderSettings>;
    let result: HookResult | null = null;

    function TestWrapper() {
      const hookResult = useProviderSettings("codex");
      useEffect(() => {
        result = hookResult;
      }, [hookResult]);
      return <span />;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });

    expect(typeof result!.loadCodexSettings).toBe("function");
    expect(typeof result!.handleChangeCodexGlobalServiceMode).toBe("function");
    expect(typeof result!.loadClaudeRoutingSettings).toBe("function");
    expect(typeof result!.handleToggleClaudeRoutingPreference).toBe("function");
    expect(Array.isArray(result!.codexGlobalServiceModeOptions)).toBe(true);
    expect(result!.codexGlobalServiceModeOptions.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// useProviderModels
// ---------------------------------------------------------------------------

describe("useProviderModels — initial state", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    fetchStub.mockClear();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("initialises with empty arrays and empty alias map", async () => {
    const { useProviderModels } = await import("../hooks/useProviderModels");

    type HookResult = ReturnType<typeof useProviderModels>;
    let result: HookResult | null = null;

    function TestWrapper() {
      const hookResult = useProviderModels("openai", false);
      useEffect(() => {
        result = hookResult;
      }, [hookResult]);
      return <span />;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });

    expect(result).not.toBeNull();
    expect(result!.modelMeta.customModels).toEqual([]);
    expect(result!.modelMeta.modelCompatOverrides).toEqual([]);
    expect(result!.syncedAvailableModels).toEqual([]);
    expect(result!.modelAliases).toEqual({});
  });

  it("exposes handler functions", async () => {
    const { useProviderModels } = await import("../hooks/useProviderModels");

    type HookResult = ReturnType<typeof useProviderModels>;
    let result: HookResult | null = null;

    function TestWrapper() {
      const hookResult = useProviderModels("openai", false);
      useEffect(() => {
        result = hookResult;
      }, [hookResult]);
      return <span />;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });

    expect(typeof result!.fetchProviderModelMeta).toBe("function");
    expect(typeof result!.fetchAliases).toBe("function");
    expect(typeof result!.handleSetAlias).toBe("function");
    expect(typeof result!.handleDeleteAlias).toBe("function");
  });

  it("does not auto-fetch on isSearchProvider=true", async () => {
    const { useProviderModels } = await import("../hooks/useProviderModels");

    function TestWrapper() {
      useProviderModels("perplexity-search", true);
      return <span />;
    }

    const callCountBefore = fetchStub.mock.calls.length;

    await act(async () => {
      root.render(<TestWrapper />);
    });

    // No fetch should have been triggered by the hook itself (the client
    // gates the effect on !isSearchProvider).
    const callsForModelMeta = fetchStub.mock.calls.filter((c: any[]) =>
      String(c[0]).includes("provider-models")
    );
    expect(callsForModelMeta.length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Cycle-safety: hooks must NOT import from ProviderDetailPageClient
// ---------------------------------------------------------------------------

// Resolve the hooks dir from the repo root (vitest runs from cwd). Was a
// hardcoded absolute worktree path that broke the test outside that worktree
// (#3501 Phase 1g-1j).
const HOOKS_DIR = path.join(
  process.cwd(),
  "src/app/(dashboard)/dashboard/providers/[id]/hooks"
);

describe("Cycle-safety — hooks do not import ProviderDetailPageClient", () => {
  // We allow the name in JSDoc comments; what we forbid is an actual ES import statement.
  function hasImport(source: string): boolean {
    return /^import[^;]*ProviderDetailPageClient/m.test(source);
  }

  it("useProviderConnections has no ES import of ProviderDetailPageClient", async () => {
    const fs = await import("fs/promises");
    const source = await fs.readFile(`${HOOKS_DIR}/useProviderConnections.ts`, "utf-8");
    expect(hasImport(source)).toBe(false);
  });

  it("useProviderSettings has no ES import of ProviderDetailPageClient", async () => {
    const fs = await import("fs/promises");
    const source = await fs.readFile(`${HOOKS_DIR}/useProviderSettings.ts`, "utf-8");
    expect(hasImport(source)).toBe(false);
  });

  it("useProviderModels has no ES import of ProviderDetailPageClient", async () => {
    const fs = await import("fs/promises");
    const source = await fs.readFile(`${HOOKS_DIR}/useProviderModels.ts`, "utf-8");
    expect(hasImport(source)).toBe(false);
  });
});
