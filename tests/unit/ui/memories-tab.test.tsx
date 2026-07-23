// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) return `${key}:${JSON.stringify(values)}`;
    return key;
  },
}));

// Mock shared components
vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { className: "card" }, children),
  Badge: ({ children, variant, title }: { children: React.ReactNode; variant?: string; title?: string }) =>
    React.createElement("span", { "data-variant": variant, title }, children),
  Button: ({
    children,
    onClick,
    disabled,
    loading,
    variant,
    size,
    "data-testid": testId,
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: string;
    size?: string;
    "data-testid"?: string;
  }) =>
    React.createElement(
      "button",
      {
        onClick,
        disabled: disabled || loading,
        "data-variant": variant,
        "data-testid": testId,
      },
      children,
    ),
  Input: ({
    value,
    onChange,
    placeholder,
    "data-testid": testId,
    className,
    onKeyDown,
  }: {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    "data-testid"?: string;
    className?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }) =>
    React.createElement("input", {
      value,
      onChange,
      placeholder,
      "data-testid": testId,
      className,
      onKeyDown,
    }),
  Select: ({
    children,
    value,
    onChange,
  }: {
    children: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }) => React.createElement("select", { value, onChange }, children),
  Modal: ({
    isOpen,
    title,
    children,
    footer,
    onClose,
  }: {
    isOpen?: boolean;
    title?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    onClose?: () => void;
  }) =>
    isOpen
      ? React.createElement(
          "div",
          { "data-testid": "modal", "data-title": title },
          React.createElement("button", { onClick: onClose, "data-testid": "modal-close" }, "X"),
          children,
          footer,
        )
      : null,
}));

vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/components/EditMemoryModal",
  () => ({
    default: ({
      isOpen,
      onClose,
    }: {
      isOpen: boolean;
      memory: unknown;
      onClose: () => void;
      onSaved: () => void;
    }) =>
      isOpen
        ? React.createElement("div", { "data-testid": "edit-memory-modal" }, [
            React.createElement("button", { key: "close", onClick: onClose }, "close"),
          ])
        : null,
  }),
);

const MOCK_MEMORIES = [
  {
    id: "mem-1",
    apiKeyId: "key-1",
    sessionId: null,
    type: "factual",
    key: "user.name",
    content: "Alice",
    metadata: {},
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    expiresAt: null,
  },
  {
    id: "mem-2",
    apiKeyId: "key-1",
    sessionId: null,
    type: "episodic",
    key: "event.meeting",
    content: "Had a meeting",
    metadata: {},
    createdAt: "2026-01-02T00:00:00Z",
    updatedAt: "2026-01-02T00:00:00Z",
    expiresAt: null,
  },
];

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("MemoriesTab", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
      true;
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: MOCK_MEMORIES,
        total: 2,
        totalPages: 1,
        stats: {
          total: 2,
          tokensUsed: 150,
          hitRate: 0.75,
          cacheStats: { hits: 3, misses: 1 },
        },
      }),
    });
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders memories after fetch", async () => {
    const { default: MemoriesTab } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/tabs/MemoriesTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoriesTab />);
    });
    // Wait for the 300ms debounce
    await act(async () => {
      await new Promise((r) => setTimeout(r, 350));
    });
    expect(container.textContent).toContain("user.name");
    expect(container.textContent).toContain("Alice");
  });

  it("shows hit rate card when cacheStats.hits + misses > 0", async () => {
    const { default: MemoriesTab } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/tabs/MemoriesTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoriesTab />);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 350));
    });
    // hitRate is shown since cacheStats.hits=3, misses=1
    expect(container.textContent).toContain("hitRate");
  });

  it("does not show hit rate when cacheStats is 0/0", async () => {
    vi.resetModules();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: MOCK_MEMORIES,
        total: 2,
        totalPages: 1,
        stats: {
          total: 2,
          tokensUsed: 0,
          hitRate: 0,
          cacheStats: { hits: 0, misses: 0 },
        },
      }),
    });
    const { default: MemoriesTab } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/tabs/MemoriesTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoriesTab />);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 350));
    });
    // hitRate card should NOT appear
    expect(container.querySelector("[data-testid='hit-rate-card']")).toBeNull();
  });

  it("opens edit modal when pencil button is clicked", async () => {
    const { default: MemoriesTab } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/tabs/MemoriesTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoriesTab />);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 350));
    });
    const editBtn = container.querySelector("[data-testid='edit-memory-mem-1']") as HTMLButtonElement | null;
    expect(editBtn).toBeTruthy();
    await act(async () => {
      editBtn?.click();
    });
    expect(container.querySelector("[data-testid='edit-memory-modal']")).toBeTruthy();
  });

  it("shows empty state when no memories returned", async () => {
    vi.resetModules();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [],
        total: 0,
        totalPages: 1,
        stats: { total: 0, tokensUsed: 0, hitRate: 0, cacheStats: { hits: 0, misses: 0 } },
      }),
    });
    const { default: MemoriesTab } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/tabs/MemoriesTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoriesTab />);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 350));
    });
    expect(container.querySelector("[data-testid='memories-empty-state']")).toBeTruthy();
  });

  it("calls DELETE when delete confirmed", async () => {
    // MemoriesTab fires two independent fetches on mount: an immediate health
    // check (/api/memory/health) and a 300ms-debounced memories list fetch
    // (/api/memory?...). A call-order-dependent mock (mockResolvedValueOnce +
    // fallback) is fragile here because the health check resolves first and
    // would consume the "once" response meant for the list. Key off the URL
    // instead, like the rest of this file's fetch mocks do.
    const mockFetch = vi.fn((url: string) => {
      if (typeof url === "string" && url.startsWith("/api/memory?")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            data: MOCK_MEMORIES,
            total: 2,
            totalPages: 1,
            stats: { total: 2, tokensUsed: 0, hitRate: 0, cacheStats: { hits: 0, misses: 0 } },
          }),
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });
    globalThis.fetch = mockFetch as unknown as typeof fetch;
    const { default: MemoriesTab } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/tabs/MemoriesTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoriesTab />);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 350));
    });
    const deleteBtn = container.querySelector("[data-testid='delete-memory-mem-1']") as HTMLButtonElement | null;
    expect(deleteBtn).toBeTruthy();
    await act(async () => {
      deleteBtn?.click();
    });
    // Confirm modal shown
    const modal = container.querySelector("[data-testid='modal']");
    expect(modal).toBeTruthy();
    // Find danger button inside modal
    const dangerBtns = Array.from(container.querySelectorAll("button")).filter(
      (b) => b.getAttribute("data-variant") === "danger",
    );
    expect(dangerBtns.length).toBeGreaterThan(0);
    await act(async () => {
      dangerBtns[0].click();
    });
    // DELETE should have been called
    const deleteCalls = (mockFetch as ReturnType<typeof vi.fn>).mock.calls.filter(
      (c: [string, ...unknown[]]) =>
        typeof c[0] === "string" && c[0].includes("mem-1") && c[1] && (c[1] as { method: string }).method === "DELETE",
    );
    expect(deleteCalls.length).toBeGreaterThan(0);
  });
});
