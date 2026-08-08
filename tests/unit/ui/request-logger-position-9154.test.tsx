// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type ReplaceOptions = { scroll?: boolean };
type Replace = (url: string, options?: ReplaceOptions) => void;

const routerControl = vi.hoisted(() => ({
  pendingUrl: null as string | null,
  bumpPageRender: () => {},
  replace: vi.fn<Replace>(),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: routerControl.replace,
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

vi.mock("@/shared/components", async () => {
  const { default: RequestLoggerV2 } =
    await import("../../../src/shared/components/RequestLoggerV2.tsx");
  const ConfirmModal = ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="confirm-modal" /> : null;
  return { RequestLoggerV2, ConfirmModal };
});

const { default: LogsPage } = await import("../../../src/app/(dashboard)/dashboard/logs/page.tsx");

function Harness() {
  const [, setVersion] = React.useState(0);

  React.useEffect(() => {
    routerControl.bumpPageRender = () => setVersion((version) => version + 1);
    return () => {
      routerControl.bumpPageRender = () => {};
    };
  }, []);

  return <LogsPage />;
}

function commitPendingUrl() {
  if (routerControl.pendingUrl !== null) {
    window.history.replaceState(null, "", routerControl.pendingUrl);
    routerControl.pendingUrl = null;
  }
}

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];

  private active = true;

  constructor(private readonly callback: IntersectionObserverCallback) {
    FakeIntersectionObserver.instances.push(this);
  }

  observe() {}
  unobserve() {}
  disconnect() {
    this.active = false;
  }
  takeRecords() {
    return [];
  }

  static triggerLatest() {
    const instance = [...FakeIntersectionObserver.instances].reverse().find((item) => item.active);
    if (!instance) throw new Error("No active IntersectionObserver");
    instance.callback([{ isIntersecting: true } as IntersectionObserverEntry], instance as never);
  }
}

const LOG_ROWS = Array.from({ length: 120 }, (_, index) => ({
  id: `log-${String(index).padStart(3, "0")}`,
  status: 200,
  method: "POST",
  path: "/v1/chat/completions",
  timestamp: new Date(Date.UTC(2026, 0, 1, 12, 0) - index * 60_000).toISOString(),
  model: `model-${String(index).padStart(3, "0")}`,
  requestedModel: `model-${String(index).padStart(3, "0")}`,
  provider: "openai",
  account: "user@example.com",
  tokens: { in: index + 1, out: index + 2 },
  duration: 1_000 + index,
}));

let container: HTMLElement;
let root: Root;
let deferredDetail: {
  id: string;
  promise: Promise<Response>;
  resolve: (response: Response) => void;
} | null;
let callLogUrls: string[];

function createDeferredDetail(id: string) {
  let resolve!: (response: Response) => void;
  const promise = new Promise<Response>((done) => {
    resolve = done;
  });
  return { id, promise, resolve };
}

async function settle() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
  await act(async () => {
    await Promise.resolve();
  });
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function setSelectValue(select: HTMLSelectElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set;
  setter?.call(select, value);
  select.dispatchEvent(new Event("change", { bubbles: true }));
}

function findButton(text: string) {
  return Array.from(container.querySelectorAll<HTMLButtonElement>("button")).find((button) =>
    button.textContent?.includes(text)
  );
}

function getScrollContainer() {
  const table = container.querySelector("table");
  const scrollContainer = table?.parentElement as HTMLDivElement | null;
  expect(scrollContainer).not.toBeNull();
  return scrollContainer!;
}

function assertRetainedView(scrollContainer: HTMLDivElement) {
  const search = container.querySelector<HTMLInputElement>(
    'input[placeholder="searchPlaceholder"]'
  );
  const sort = container.querySelector<HTMLSelectElement>('select[title="sortLogs"]');
  const successFilter = findButton("statusFilters.success");
  const rows = container.querySelectorAll("tbody tr");

  expect(search?.value).toBe("model");
  expect(sort?.value).toBe("oldest");
  expect(successFilter?.className).toContain("bg-emerald-500/20");
  expect(rows).toHaveLength(100);
  expect(rows[0]?.textContent).toContain("model-099");
  expect(scrollContainer.scrollTop).toBe(337);
  expect(
    callLogUrls.some((url) => new URL(url, "http://test").searchParams.get("limit") === "100")
  ).toBe(true);
}

async function renderExpandedView() {
  window.history.replaceState(null, "", "/dashboard/logs?view=requests&tenant=kept");

  await act(async () => {
    root.render(<Harness />);
  });
  await settle();

  const search = container.querySelector<HTMLInputElement>(
    'input[placeholder="searchPlaceholder"]'
  );
  const successFilter = findButton("statusFilters.success");
  const sort = container.querySelector<HTMLSelectElement>('select[title="sortLogs"]');
  expect(search).not.toBeNull();
  expect(successFilter).not.toBeUndefined();
  expect(sort).not.toBeNull();

  await act(async () => {
    setInputValue(search!, "model");
    successFilter!.click();
    setSelectValue(sort!, "oldest");
  });
  await settle();

  const scrollContainer = getScrollContainer();
  await act(async () => {
    scrollContainer.scrollTop = 120;
    scrollContainer.dispatchEvent(new Event("scroll"));
    FakeIntersectionObserver.triggerLatest();
  });
  await settle();

  await act(async () => {
    scrollContainer.scrollTop = 337;
    scrollContainer.dispatchEvent(new Event("scroll"));
  });
  assertRetainedView(scrollContainer);
  return scrollContainer;
}

async function openOlderRow() {
  const row = Array.from(container.querySelectorAll<HTMLTableRowElement>("tbody tr")).find((item) =>
    item.textContent?.includes("model-080")
  );
  expect(row).not.toBeUndefined();

  await act(async () => {
    row!.click();
  });
  await settle();
  expect(container.querySelector('[aria-label="Request log detail"]')).not.toBeNull();
}

beforeEach(() => {
  const storage = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, String(value)),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
  });

  FakeIntersectionObserver.instances = [];
  callLogUrls = [];
  deferredDetail = null;
  routerControl.pendingUrl = null;
  routerControl.bumpPageRender = () => {};
  routerControl.replace.mockReset();
  routerControl.replace.mockImplementation((url) => {
    routerControl.pendingUrl = url;
    routerControl.bumpPageRender();
  });

  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith("/api/usage/call-logs")) {
        callLogUrls.push(url);
        const limit = Number(new URL(url, "http://test").searchParams.get("limit"));
        return Response.json(LOG_ROWS.slice(0, limit));
      }
      if (url.startsWith("/api/logs/detail")) {
        return Response.json({ enabled: false });
      }
      if (url.startsWith("/api/logs/")) {
        const id = url.split("/api/logs/")[1]?.split("?")[0];
        if (deferredDetail?.id === id) return deferredDetail.promise;
        return Response.json(LOG_ROWS.find((row) => row.id === id));
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

describe("request-log position preservation (#9154)", () => {
  it("opens an older row without changing the loaded, filtered, sorted, or scrolled view", async () => {
    const scrollContainer = await renderExpandedView();

    await openOlderRow();

    expect(routerControl.pendingUrl).toBe("/dashboard/logs?view=requests&tenant=kept&id=log-080");
    expect(routerControl.replace).toHaveBeenLastCalledWith(
      "/dashboard/logs?view=requests&tenant=kept&id=log-080",
      { scroll: false }
    );
    assertRetainedView(scrollContainer);
  });

  it.each([
    [
      "close button",
      async () => {
        container.querySelector<HTMLButtonElement>('[aria-label="Close detail modal"]')!.click();
      },
    ],
    [
      "Escape",
      async () => {
        globalThis.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      },
    ],
    [
      "backdrop",
      async () => {
        container.querySelector<HTMLElement>('[aria-label="Request log detail"]')!.click();
      },
    ],
  ])(
    "closes through %s without changing the loaded, filtered, sorted, or scrolled view",
    async (_name, close) => {
      const scrollContainer = await renderExpandedView();
      await openOlderRow();
      commitPendingUrl();
      routerControl.replace.mockClear();

      await act(async () => {
        await close();
      });
      await settle();

      expect(routerControl.pendingUrl).toBe("/dashboard/logs?view=requests&tenant=kept");
      expect(routerControl.replace).toHaveBeenCalledTimes(1);
      expect(routerControl.replace).toHaveBeenCalledWith(
        "/dashboard/logs?view=requests&tenant=kept",
        { scroll: false }
      );
      commitPendingUrl();
      expect(container.querySelector('[aria-label="Request log detail"]')).toBeNull();
      assertRetainedView(scrollContainer);
    }
  );

  it("opens a direct id deep link on mount", async () => {
    window.history.replaceState(null, "", "/dashboard/logs?tenant=kept&id=log-080");

    await act(async () => {
      root.render(<Harness />);
    });
    await settle();

    expect(container.querySelector('[aria-label="Request log detail"]')).not.toBeNull();
  });

  it("does not reopen a closed modal when its stale detail request completes", async () => {
    deferredDetail = createDeferredDetail("log-000");
    window.history.replaceState(null, "", "/dashboard/logs?tenant=kept");

    await act(async () => {
      root.render(<Harness />);
    });
    await settle();

    const row = Array.from(container.querySelectorAll<HTMLTableRowElement>("tbody tr")).find(
      (item) => item.textContent?.includes("model-000")
    );
    await act(async () => {
      row!.click();
    });
    expect(container.querySelector('[aria-label="Request log detail"]')).not.toBeNull();

    await act(async () => {
      container.querySelector<HTMLButtonElement>('[aria-label="Close detail modal"]')!.click();
    });
    expect(container.querySelector('[aria-label="Request log detail"]')).toBeNull();

    await act(async () => {
      deferredDetail!.resolve(Response.json(LOG_ROWS[0]));
      await deferredDetail!.promise;
    });
    await settle();

    expect(container.querySelector('[aria-label="Request log detail"]')).toBeNull();
  });
});
