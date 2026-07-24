// @vitest-environment jsdom
/**
 * dashboard/logs/timeline: clicking a request bar sets ?id= for direct-linking,
 * matching the regular request log page (RequestLoggerV2 / LogsPage). Mirrors
 * the reopen-on-close regression guard in logs-page-detail-modal-reopen-on-close
 * for the same App Router router.replace() timing (the segment re-renders
 * before window.location commits).
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const routerControl = vi.hoisted(() => ({
  pendingUrl: null as string | null,
  bumpPageRender: () => {},
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: (url: string) => {
      routerControl.pendingUrl = url;
      routerControl.bumpPageRender();
    },
    push: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/dashboard/logs/timeline",
  useSearchParams: () => new URLSearchParams(globalThis.location.search),
}));

const { default: LogsTimelinePage } = await import(
  "../../../src/app/(dashboard)/dashboard/logs/timeline/page.tsx"
);

function Harness() {
  const [, setVersion] = React.useState(0);
  React.useEffect(() => {
    routerControl.bumpPageRender = () => setVersion((v) => v + 1);
    return () => {
      routerControl.bumpPageRender = () => {};
    };
  }, []);
  return <LogsTimelinePage />;
}

function commitPendingUrl() {
  if (routerControl.pendingUrl != null) {
    window.history.replaceState(null, "", routerControl.pendingUrl);
    routerControl.pendingUrl = null;
  }
}

class FakeResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
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
    await vi.advanceTimersByTimeAsync(50);
  });
}

beforeEach(() => {
  routerControl.pendingUrl = null;
  routerControl.bumpPageRender = () => {};
  vi.stubGlobal("ResizeObserver", FakeResizeObserver);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith("/api/usage/call-logs")) {
        return Response.json([LOG_ROW]);
      }
      if (url.startsWith(`/api/logs/${LOG_ROW.id}`)) {
        return Response.json({ ...LOG_ROW, active: false });
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
  window.history.replaceState(null, "", "/dashboard/logs/timeline");
});

describe("Timeline page detail modal — deep link + reopen-on-close regression", () => {
  it("clicking a request bar sets ?id= and closing removes it (stays closed)", async () => {
    window.history.replaceState(null, "", "/dashboard/logs/timeline");

    await act(async () => {
      root.render(<Harness />);
    });
    await settle();

    const bar = container.querySelector(`[data-testid="timeline-bar-${LOG_ROW.id}"]`);
    expect(bar).not.toBeNull();

    await act(async () => {
      (bar as HTMLElement).click();
    });
    await settle();
    commitPendingUrl();

    expect(window.location.search).toContain(`id=${LOG_ROW.id}`);
    expect(container.querySelector('[role="dialog"]')).not.toBeNull();

    const dialog = container.querySelector('[role="dialog"]') as HTMLElement;
    await act(async () => {
      dialog.click(); // backdrop click -> onClose
    });
    await settle();
    commitPendingUrl();

    expect(window.location.search).not.toContain("id=");
    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it("deep link ?id= opens the modal on mount", async () => {
    window.history.replaceState(null, "", `/dashboard/logs/timeline?id=${LOG_ROW.id}`);

    await act(async () => {
      root.render(<Harness />);
    });
    await settle();

    expect(container.querySelector('[role="dialog"]')).not.toBeNull();
  });
});
