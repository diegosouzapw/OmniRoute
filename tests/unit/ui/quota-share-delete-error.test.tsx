// @vitest-environment jsdom
/**
 * Deleting a pool must not fail silently.
 *
 * The handler used to be:
 *
 *   if (!confirm(t("removeConfirm"))) return;
 *   await fetch(`/api/quota/pools/${id}`, { method: "DELETE" });
 *   await mutate();
 *
 * — no check on the response. When the DELETE failed (a 401 from an expired
 * session, a 500, a network drop) the page revalidated, the card stayed exactly
 * where it was and NOTHING was shown. From the operator's side the click simply
 * did nothing, with no way to tell "it failed" from "I misclicked". Reported
 * from two boxes on 2026-07-28; the sibling flow in the API manager already
 * handled this correctly, this page had no error surface at all.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("next/dynamic", () => ({ default: () => () => null }));

vi.mock("@/shared/components", () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Modal: ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) =>
    isOpen ? <div data-testid="modal">{children}</div> : null,
}));
vi.mock("@/shared/components/Card", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => <span /> }));

const MOCK_POOLS = [
  {
    id: "pool_1",
    connectionId: "conn_1",
    name: "Pool A",
    createdAt: new Date().toISOString(),
    allocations: [{ apiKeyId: "key_1", weight: 50, policy: "hard" }],
  },
];

const mockMutate = vi.fn().mockResolvedValue(undefined);
const mockUsePools = vi.fn(() => ({
  pools: MOCK_POOLS,
  loading: false,
  error: null,
  mutate: mockMutate,
}));

vi.mock("../../../src/app/(dashboard)/dashboard/costs/quota-share/hooks/usePools", () => ({
  usePools: mockUsePools,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/costs/quota-share/hooks/usePoolUsage", () => ({
  usePoolUsage: () => ({ usage: null, loading: false, error: null }),
}));
vi.mock(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/hooks/useLocalStoragePoolMigration",
  () => ({ useLocalStoragePoolMigration: vi.fn() })
);
vi.mock(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/hooks/usePoolsUsageAggregate",
  () => ({
    usePoolsUsageAggregate: () => ({
      avgUtilizationPercent: 0,
      borrowingKeyCount: 0,
      loading: false,
      error: null,
    }),
  })
);

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);
vi.stubGlobal("confirm", vi.fn(() => true));

const { default: QuotaSharePageClient } = await import(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/QuotaSharePageClient"
);

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

async function renderComponent() {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(<QuotaSharePageClient />);
  });
}

/** Clicks the delete button of the first pool card. */
async function clickDelete() {
  const btn = [...document.querySelectorAll("button")].find(
    (b) => b.querySelector("span.material-symbols-outlined")?.textContent?.trim() === "delete"
  );
  if (!btn) throw new Error("delete button not rendered");
  await act(async () => {
    btn.click();
  });
  // let the awaited fetch + state update flush
  await act(async () => {
    await Promise.resolve();
  });
}

describe("quota-share — deleting a pool", { timeout: 15000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePools.mockReturnValue({
      pools: MOCK_POOLS,
      loading: false,
      error: null,
      mutate: mockMutate,
    });
    (globalThis.confirm as ReturnType<typeof vi.fn>).mockReturnValue(true);
  });

  afterEach(() => {
    if (root && container) act(() => root!.unmount());
    container?.remove();
    container = null;
    root = null;
  });

  it("surfaces an error when the DELETE fails instead of looking like nothing happened", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: { message: "boom" } }),
    } as unknown as Response);

    await renderComponent();
    await clickDelete();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/quota/pools/pool_1",
      expect.objectContaining({ method: "DELETE" })
    );
    expect(document.body.innerHTML).toContain("removeFailed");
  });

  it("surfaces an error when the request itself throws (offline / dropped)", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));

    await renderComponent();
    await clickDelete();

    expect(document.body.innerHTML).toContain("removeFailed");
  });

  it("shows nothing and still refreshes when the DELETE succeeds", async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 204, json: () => Promise.resolve({}) } as unknown as Response);

    await renderComponent();
    await clickDelete();

    expect(mockMutate).toHaveBeenCalled();
    expect(document.body.innerHTML).not.toContain("removeFailed");
  });

  it("does not call the API at all when the confirmation is dismissed", async () => {
    (globalThis.confirm as ReturnType<typeof vi.fn>).mockReturnValue(false);

    await renderComponent();
    await clickDelete();

    // O componente busca dados auxiliares na montagem, então o que importa é
    // que NENHUMA chamada de DELETE tenha saído — não que fetch nunca rodou.
    const deletes = fetchMock.mock.calls.filter(
      ([, init]) => (init as RequestInit | undefined)?.method === "DELETE"
    );
    expect(deletes).toHaveLength(0);
    expect(document.body.innerHTML).not.toContain("removeFailed");
  });

  it("clears a previous error once a later delete succeeds", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    } as unknown as Response);
    await renderComponent();
    await clickDelete();
    expect(document.body.innerHTML).toContain("removeFailed");

    fetchMock.mockResolvedValue({ ok: true, status: 204, json: () => Promise.resolve({}) } as unknown as Response);
    await clickDelete();
    expect(document.body.innerHTML).not.toContain("removeFailed");
  });
});
