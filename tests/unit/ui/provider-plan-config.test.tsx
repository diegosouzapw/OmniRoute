// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/components", () => ({
  Button: ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

vi.mock("@/shared/components/ProviderIcon", () => ({
  default: () => <span />,
}));

vi.mock("@/lib/quota/planRegistry", () => ({
  knownProviders: () => ["openai", "anthropic"],
  getKnownPlan: (prov: string) => {
    if (prov === "openai") {
      return { dimensions: [{ unit: "tokens", window: "daily", limit: 100000 }] };
    }
    return null;
  },
}));

const MOCK_CONNECTIONS = [
  { id: "conn_1", provider: "openai", name: "GPT Account" },
  { id: "conn_2", provider: "anthropic", email: "user@example.com" },
];

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

const { default: ProviderPlanConfigClient } = await import(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/plans/ProviderPlanConfigClient"
);

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

async function renderPage() {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(<ProviderPlanConfigClient />);
  });
  // Wait for initial fetch effect to resolve
  await act(async () => {
    await new Promise((r) => setTimeout(r, 30));
  });
}

describe("ProviderPlanConfigClient", { timeout: 15000 }, () => {
  beforeEach(() => {
    mockFetch.mockImplementation((url: string) => {
      if (String(url).includes("/api/providers/client")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ connections: MOCK_CONNECTIONS }),
        } as unknown as Response);
      }
      if (String(url).includes("/api/quota/plans")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        } as unknown as Response);
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as unknown as Response);
    });
  });

  afterEach(() => {
    if (root && container) act(() => root!.unmount());
    container?.remove();
    container = null;
    root = null;
    vi.clearAllMocks();
  });

  it("renders the page title", async () => {
    await renderPage();
    expect(document.body.innerHTML).toContain("title");
  });

  it("renders catalog section with known providers", async () => {
    await renderPage();
    // catalogTitle key should appear
    expect(document.body.innerHTML).toContain("catalogTitle");
    expect(document.body.innerHTML).toContain("openai");
  });

  it("renders connection selector with options", async () => {
    await renderPage();
    const select = document.querySelector("select") as HTMLSelectElement;
    expect(select).not.toBeNull();
    expect(select.options.length).toBeGreaterThan(1);
  });

  it("shows right-panel placeholder when no connection selected", async () => {
    await renderPage();
    expect(document.body.innerHTML).toContain("unknownProviderNotice");
  });

  it("renders save button after selecting a connection", async () => {
    await renderPage();
    const select = document.querySelector("select") as HTMLSelectElement;
    await act(async () => {
      select.value = "conn_1";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(document.body.innerHTML).toContain("saveOverrideButton");
  });
});
