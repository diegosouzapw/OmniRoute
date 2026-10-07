// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Namespace-prefixed keys instead of the global en.json-backed mock: any English
// string still hard-coded in the page would surface verbatim in the rendered text.
vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const RAW_ENGLISH = ["Loading...", "Status", "Suspicious"];
const originalFetch = globalThis.fetch;

function mockFetch(payload: unknown) {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => payload,
  }) as unknown as typeof fetch;
}

async function renderPage() {
  const { default: GamificationAdminPage } =
    await import("../../../src/app/(dashboard)/dashboard/gamification/admin/page");
  return render(<GamificationAdminPage />);
}

describe("GamificationAdminPage (anomalies)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    cleanup();
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("announces the loading state through a busy polite live region", async () => {
    globalThis.fetch = vi.fn().mockReturnValue(new Promise(() => {})) as unknown as typeof fetch;
    const { container } = await renderPage();

    const status = screen.getByRole("status");
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.getAttribute("aria-busy")).toBe("true");
    expect(status.textContent).toBe("common.loading");
    for (const raw of RAW_ENGLISH) expect(container.textContent).not.toContain(raw);
  });

  it("announces the empty result through a polite live region", async () => {
    mockFetch({ anomalies: [] });
    const { container } = await renderPage();

    const status = await screen.findByText("common.noAnomaliesDetected");
    expect(status.getAttribute("role")).toBe("status");
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.hasAttribute("aria-busy")).toBe(false);
    for (const raw of RAW_ENGLISH) expect(container.textContent).not.toContain(raw);
  });

  it("renders the flagged table with translated column headers and badge", async () => {
    mockFetch({
      anomalies: [{ apiKeyId: "sk-0123456789abcdef0123", xpLastHour: 12345, zScore: 4.2 }],
    });
    const { container } = await renderPage();

    await waitFor(() => expect(screen.getByText("common.suspicious")).toBeTruthy());
    for (const key of ["common.apiKey", "common.xpLastHour", "common.zScore", "common.status"]) {
      expect(screen.getByText(key)).toBeTruthy();
    }
    expect(screen.getByText("4.20")).toBeTruthy();
    expect(screen.queryByRole("status")).toBeNull();
    for (const raw of RAW_ENGLISH) expect(container.textContent).not.toContain(raw);
  });
});
