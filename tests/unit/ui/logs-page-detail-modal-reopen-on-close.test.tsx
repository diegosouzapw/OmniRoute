// @vitest-environment jsdom
/**
 * TDD regression: dashboard/logs — closing the request-detail modal after the
 * FIRST row click immediately reopens it; only the second close works.
 *
 * Root cause: LogsPage computes `initialId` from `window.location` on EVERY
 * render, but Next.js App Router syncs `window.location` only after the
 * navigation commits — i.e. after the re-render triggered by
 * `router.replace()`. So:
 *
 *  1. Row click → openDetail → router.replace("?id=X"): page re-renders while
 *     location is still the old URL → initialId stays null, the child's
 *     one-shot `initialOpenedRef` guard is never consumed.
 *  2. First close → closeDetail → router.replace(no id): page re-renders while
 *     location STILL carries "?id=X" → initialId flips null → "X" → the child's
 *     deep-link effect fires (guard still unarmed) → openDetail reopens the
 *     modal.
 *  3. Second close works because the guard is now armed.
 *
 * The router mock below reproduces that ordering: replace() re-renders the
 * page synchronously (like the App Router segment re-render) and the URL is
 * committed to window.location separately, after the render — via
 * commitPendingUrl().
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const routerControl = vi.hoisted(() => ({
  pendingUrl: null as string | null,
  bumpPageRender: () => {},
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: (url: string) => {
      // Mirror App Router ordering: the segment re-renders first, the URL is
      // synced to window.location only after the commit (commitPendingUrl()).
      routerControl.pendingUrl = url;
      routerControl.bumpPageRender();
    },
    push: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/dashboard/logs",
  useSearchParams: () => new URLSearchParams(globalThis.location.search),
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ emailsVisible: true }),
}));

// LogsPage imports { ConfirmModal, RequestLoggerV2 } from the barrel; keep the
// real logger (the component under test) and stub the unrelated ConfirmModal
// so the test doesn't drag the whole barrel into jsdom.
vi.mock("@/shared/components", async () => {
  const { default: RequestLoggerV2 } = await import(
    "../../../src/shared/components/RequestLoggerV2.tsx"
  );
  const ConfirmModal = ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="confirm-modal" /> : null;
  return { RequestLoggerV2, ConfirmModal };
});

const { default: LogsPage } = await import(
  "../../../src/app/(dashboard)/dashboard/logs/page.tsx"
);

// Stands in for the App Router segment root: router.replace() re-renders the
// whole page tree, which is exactly what re-evaluates LogsPage's initialId.
function Harness() {
  const [, setVersion] = React.useState(0);
  React.useEffect(() => {
    routerControl.bumpPageRender = () => setVersion((v) => v + 1);
    return () => {
      routerControl.bumpPageRender = () => {};
    };
  }, []);
  return <LogsPage />;
}

function commitPendingUrl() {
  if (routerControl.pendingUrl != null) {
    window.history.replaceState(null, "", routerControl.pendingUrl);
    routerControl.pendingUrl = null;
  }
}

class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

const LOG_ROW = {
  id: "log-1",
  status: 200,
  timestamp: new Date().toISOString(),
  model: "gpt-4o",
  provider: "openai",
  account: "user@example.com",
  tokens: { in: 10, out: 20 },
  duration: 1234,
};

let container: HTMLElement;
let root: Root;

async function settle() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
}

beforeEach(() => {
  localStorage.clear();
  routerControl.pendingUrl = null;
  routerControl.bumpPageRender = () => {};
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith("/api/usage/call-logs")) {
        return Response.json([LOG_ROW]);
      }
      if (url.startsWith("/api/logs/detail")) {
        return Response.json({ enabled: false });
      }
      if (url.startsWith(`/api/logs/${LOG_ROW.id}`)) {
        return Response.json({ ...LOG_ROW, active: false });
      }
      if (url.startsWith("/api/provider-nodes")) {
        return Response.json({ nodes: [] });
      }
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

describe("LogsPage detail modal — first-close reopen regression", () => {
  it("closing the modal after the first row click keeps it closed", async () => {
    window.history.replaceState(null, "", "/dashboard/logs");

    await act(async () => {
      root.render(<Harness />);
    });
    await settle();

    // First click on the log row opens the detail modal.
    const row = container.querySelector("tbody tr") as HTMLTableRowElement;
    expect(row).not.toBeNull();
    await act(async () => {
      row.click();
    });
    await settle();
    // Navigation commits after the render: URL now carries ?id=log-1.
    commitPendingUrl();
    expect(window.location.search).toContain("id=log-1");
    expect(container.querySelector('[role="dialog"]')).not.toBeNull();

    // First close: closeDetail() re-renders the page while window.location
    // still has ?id=log-1 (the close navigation has not committed yet).
    const dialog = container.querySelector('[role="dialog"]') as HTMLElement;
    await act(async () => {
      dialog.click(); // backdrop click → onClose
    });
    await settle();

    // The modal must stay closed — the stale ?id in location must not reopen it.
    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it("deep link ?id= still opens the modal on mount", async () => {
    window.history.replaceState(null, "", `/dashboard/logs?id=${LOG_ROW.id}`);

    await act(async () => {
      root.render(<Harness />);
    });
    await settle();

    expect(container.querySelector('[role="dialog"]')).not.toBeNull();
  });
});
