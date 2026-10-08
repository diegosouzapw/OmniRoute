// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn(), prefetch: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/dashboard/logs",
  useSearchParams: () => new URLSearchParams(globalThis.location.search),
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ emailsVisible: true }),
}));

vi.mock("@/shared/components", async () => {
  const { default: RequestLoggerV2 } =
    await import("../../../src/shared/components/RequestLoggerV2.tsx");
  const ConfirmModal = ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="confirm-modal" /> : null;
  return { RequestLoggerV2, ConfirmModal };
});

const { default: LogsPage } = await import("../../../src/app/(dashboard)/dashboard/logs/page.tsx");

const LOG_ROW = {
  id: "log-1",
  status: 200,
  timestamp: new Date().toISOString(),
  model: "gpt-4o",
  provider: "openai",
  account: "user@example.com",
  correlationId: "abc",
  tokens: { in: 10, out: 20 },
  duration: 1234,
};

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  localStorage.clear();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith("/api/usage/call-logs")) return Response.json([LOG_ROW]);
      if (url.startsWith("/api/logs/detail")) return Response.json({ enabled: false });
      if (url.startsWith("/api/provider-nodes")) return Response.json({ nodes: [] });
      return Response.json({});
    })
  );
  vi.useFakeTimers();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => {
    root.unmount();
  });
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/dashboard/logs");
});

describe("LogsPage ?correlationId= prefill", () => {
  it("prefills the correlation filter and keeps only matching rows", async () => {
    window.history.replaceState(null, "", "/dashboard/logs?correlationId=abc");
    await act(async () => {
      root.render(<LogsPage />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    const input = container.querySelector('input[placeholder="correlationId"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe("abc");
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(1);
  });
});
