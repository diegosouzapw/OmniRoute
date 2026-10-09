// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import enMessages from "@/i18n/messages/en.json";

vi.mock("next-intl", () => ({
  useTranslations: (ns: string = "common") => {
    const bag = ((enMessages as Record<string, unknown>)[ns] || {}) as Record<string, string>;
    const translate = (key: string, params?: Record<string, unknown>) => {
      let str = bag[key] ?? key;
      if (params) {
        for (const [pKey, pVal] of Object.entries(params)) {
          str = str.replace(new RegExp(`\\{${pKey}\\}`, "g"), String(pVal));
        }
      }
      return str;
    };
    return Object.assign(translate, { has: (key: string) => key in bag });
  },
}));

import ModelCatalogPage from "@/app/(dashboard)/dashboard/models/page";
import {
  CATALOG_TEST_RESULTS_STORAGE_NAME,
  getComboTestKey,
  getModelTestKey,
} from "@/app/(dashboard)/dashboard/models/catalogTestStorage";

type RouteHandler = (init?: RequestInit) => Promise<Response>;

interface CatalogModelFixture {
  id: string;
  name: string;
  type: string;
  [key: string]: unknown;
}

type CatalogFixture = Record<string, { provider: string; models: CatalogModelFixture[] }>;

interface TestAllBody {
  providerId: string;
  modelIds: string[];
  respectRateLimit: boolean;
}

interface PendingCall<TBody> {
  body: TBody;
  signal: AbortSignal | null | undefined;
  resolve: () => void;
}

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
}

function deferred<T>(): Deferred<T> {
  let resolve: (value: T) => void = () => undefined;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as unknown as Response;
}

const DEFAULT_CATALOG: CatalogFixture = {
  alpha: {
    provider: "Alpha Labs",
    models: [
      {
        id: "alpha-chat",
        name: "Alpha Chat",
        type: "chat",
        subtype: "general",
        free: true,
        context_length: 128_000,
        max_output_tokens: 16_384,
        capabilities: { tools: true, vision: true },
      },
      { id: "alpha-embed", name: "Alpha Embed", type: "embedding", context_length: 8_192 },
    ],
  },
  beta: {
    provider: "Beta AI",
    models: [
      {
        id: "beta-coder",
        name: "Beta Coder",
        type: "chat",
        subtype: "code",
        max_output_tokens: 4_096,
        capabilities: { reasoning: true },
      },
    ],
  },
};

const DEFAULT_COMBOS = [
  {
    id: "c-1",
    name: "combo-1",
    displayName: "First Combo",
    strategy: "priority",
    description: "Fallback chain",
    models: [{ model: "alpha/alpha-chat" }, { model: "beta/beta-coder" }],
    isActive: true,
  },
  {
    id: "c-2",
    name: "combo-2",
    displayName: "Second Combo",
    strategy: "round-robin",
    models: [{ model: "alpha/alpha-embed" }],
    isActive: false,
  },
];

function okResultsFor(body: TestAllBody, latencyMs = 140) {
  return Object.fromEntries(body.modelIds.map((id) => [id, { status: "ok", latencyMs }]));
}

function installFetch(
  options: {
    catalog?: CatalogFixture;
    /** Overrides the whole /api/models/catalog response (e.g. a failure or a pending reload). */
    catalogResponse?: () => Promise<Response>;
    combos?: unknown[];
    testAll?: RouteHandler;
    modelTest?: RouteHandler;
    comboTest?: RouteHandler;
  } = {}
) {
  const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url.includes("/api/models/catalog")) {
      if (options.catalogResponse) return options.catalogResponse();
      return Promise.resolve(jsonResponse({ catalog: options.catalog ?? DEFAULT_CATALOG }));
    }
    if (url.includes("/api/providers/health-matrix")) {
      return Promise.resolve(
        jsonResponse({
          providers: [
            { provider: "alpha", state: "healthy" },
            { provider: "beta", state: "degraded" },
          ],
        })
      );
    }
    if (url.includes("/api/models/test-all")) {
      if (options.testAll) return options.testAll(init);
      const body = JSON.parse(String(init?.body)) as TestAllBody;
      return Promise.resolve(jsonResponse({ results: okResultsFor(body) }));
    }
    if (url.includes("/api/models/test")) {
      if (options.modelTest) return options.modelTest(init);
      return Promise.resolve(jsonResponse({ status: "ok", latencyMs: 185 }));
    }
    if (url.includes("/api/combos/test")) {
      if (options.comboTest) return options.comboTest(init);
      return Promise.resolve(
        jsonResponse({
          comboName: "combo-1",
          resolvedBy: "alpha/alpha-chat",
          results: [{ model: "alpha-chat", provider: "alpha", status: "ok", latencyMs: 210 }],
        })
      );
    }
    if (url.includes("/api/combos")) {
      return Promise.resolve(jsonResponse({ combos: options.combos ?? DEFAULT_COMBOS }));
    }
    return Promise.reject(new Error(`Unhandled mock url: ${url}`));
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

/** Deferred /api/models/test-all handler that records bodies, signals and concurrency. */
function deferredTestAll() {
  const calls: Array<PendingCall<TestAllBody>> = [];
  const state = { inFlight: 0, maxInFlight: 0 };
  const handler: RouteHandler = (init) => {
    const body = JSON.parse(String(init?.body)) as TestAllBody;
    const response = deferred<Response>();
    state.inFlight += 1;
    state.maxInFlight = Math.max(state.maxInFlight, state.inFlight);
    let settled = false;
    calls.push({
      body,
      signal: init?.signal,
      resolve: () => {
        if (settled) return;
        settled = true;
        state.inFlight -= 1;
        response.resolve(jsonResponse({ results: okResultsFor(body, 90) }));
      },
    });
    return response.promise;
  };
  return { calls, state, handler };
}

function readStoredResults(): Record<string, { status: string; error?: string }> {
  return JSON.parse(localStorage.getItem(CATALOG_TEST_RESULTS_STORAGE_NAME) || "{}");
}

describe("Models and Combos Catalog Page UI", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval"] });
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    localStorage.clear();
    window.history.replaceState(null, "", "/dashboard/models");
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  /** Runs pending timers (mount effects are deferred) and settles resolved fetch promises. */
  async function flush() {
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  }

  async function renderPage() {
    await act(async () => {
      root.render(<ModelCatalogPage />);
    });
    await flush();
  }

  function query<T extends Element = HTMLElement>(selector: string): T | null {
    return container.querySelector<T>(selector) as T | null;
  }

  function buttonByText(text: string, scope: ParentNode = container): HTMLButtonElement | null {
    return (
      [...scope.querySelectorAll<HTMLButtonElement>("button")].find(
        (button) => button.textContent?.trim() === text
      ) ?? null
    );
  }

  function inputByLabel(text: string): HTMLInputElement {
    const label = [...container.querySelectorAll("label")].find((element) =>
      element.textContent?.trim().startsWith(text)
    );
    const input = label?.querySelector("input") ?? null;
    expect(input).not.toBeNull();
    return input as HTMLInputElement;
  }

  function setInputValue(input: HTMLInputElement, value: string) {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function bodyRows(): HTMLTableRowElement[] {
    return [...container.querySelectorAll<HTMLTableRowElement>("tbody tr")];
  }

  async function click(element: HTMLElement | null) {
    expect(element).not.toBeNull();
    await act(async () => {
      element?.click();
    });
    await flush();
  }

  it("renders tabs and switches between Models and Combos with deep linking", async () => {
    installFetch();
    await renderPage();

    expect(container.textContent).toContain("Alpha Labs");
    const tabs = container.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBe(2);
    expect(tabs[0].textContent).toContain("Models");
    expect(tabs[1].textContent).toContain("Combos");
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");

    await click(tabs[1] as HTMLElement);

    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(window.location.search).toContain("tab=combos");
    expect(container.textContent).toContain("First Combo");
  });

  it("restores the active tab and filters from the URL after mount", async () => {
    installFetch();
    window.history.replaceState(null, "", "/dashboard/models?tab=combos&status=paused");

    await renderPage();

    const tabs = container.querySelectorAll('[role="tab"]');
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(container.textContent).toContain("Second Combo");
    expect(container.textContent).not.toContain("First Combo");
  });

  it("server-renders defaults without reading the URL or stored results", () => {
    installFetch();
    window.history.replaceState(null, "", "/dashboard/models?tab=combos&provider=beta");
    const key = getModelTestKey("alpha", "alpha-chat");
    localStorage.setItem(
      CATALOG_TEST_RESULTS_STORAGE_NAME,
      JSON.stringify({
        [key]: { id: key, targetType: "model", status: "ok", latencyMs: 99, testedAt: Date.now() },
      })
    );

    const host = document.createElement("div");
    host.innerHTML = renderToString(<ModelCatalogPage />);

    const tabs = host.querySelectorAll('[role="tab"]');
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[1].getAttribute("aria-selected")).toBe("false");
    expect(host.querySelector("[data-testid='clear-test-results-btn']")).toBeNull();
  });

  it("moves selection and focus between tabs with the arrow, Home and End keys", async () => {
    installFetch();
    await renderPage();

    const modelsTab = query<HTMLButtonElement>("#tab-models");
    const combosTab = query<HTMLButtonElement>("#tab-combos");
    expect(modelsTab).not.toBeNull();
    expect(combosTab).not.toBeNull();

    const press = async (target: HTMLElement, key: string) => {
      await act(async () => {
        target.focus();
        target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
      });
      await flush();
    };

    await press(modelsTab as HTMLElement, "ArrowRight");
    expect(combosTab?.getAttribute("aria-selected")).toBe("true");
    expect(combosTab?.tabIndex).toBe(0);
    expect(modelsTab?.tabIndex).toBe(-1);
    expect(document.activeElement).toBe(combosTab);
    expect(window.location.search).toContain("tab=combos");
    const comboPanel = query('[role="tabpanel"]');
    expect(comboPanel?.getAttribute("aria-labelledby")).toBe("tab-combos");

    await press(combosTab as HTMLElement, "ArrowRight");
    expect(modelsTab?.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(modelsTab);

    await press(modelsTab as HTMLElement, "End");
    expect(combosTab?.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(combosTab);

    await press(combosTab as HTMLElement, "Home");
    expect(modelsTab?.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(modelsTab);

    await press(modelsTab as HTMLElement, "ArrowLeft");
    expect(combosTab?.getAttribute("aria-selected")).toBe("true");
    expect(query('[role="tabpanel"]')?.getAttribute("aria-labelledby")).toBe("tab-combos");
  });

  it("updates the URL query and visible rows when filters change", async () => {
    installFetch();
    await renderPage();
    expect(bodyRows()).toHaveLength(3);

    const minOutput = inputByLabel("Min max output");
    await act(async () => setInputValue(minOutput, "8000"));
    await flush();

    expect(new URLSearchParams(window.location.search).get("minOutput")).toBe("8000");
    expect(bodyRows()).toHaveLength(1);
    expect(query("tbody")?.textContent).toContain("Alpha Chat");

    await act(async () => setInputValue(minOutput, ""));
    const providerFilter = query<HTMLSelectElement>("select");
    expect(providerFilter).not.toBeNull();
    await act(async () => {
      if (!providerFilter) return;
      providerFilter.value = "beta";
      providerFilter.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();

    const params = new URLSearchParams(window.location.search);
    expect(params.get("provider")).toBe("beta");
    expect(params.has("minOutput")).toBe(false);
    expect(bodyRows()).toHaveLength(1);
    expect(query("tbody")?.textContent).toContain("Beta Coder");
  });

  it("ignores NaN and negative numeric URL params", async () => {
    installFetch();
    window.history.replaceState(null, "", "/dashboard/models?minContext=abc&minOutput=-5");
    await renderPage();

    expect(buttonByText("Clear filters")).toBeNull();
    expect(inputByLabel("Min context").value).toBe("");
    expect(inputByLabel("Min max output").value).toBe("");
    expect(bodyRows()).toHaveLength(3);
  });

  it("ignores NaN and negative member-count URL params on the combos tab", async () => {
    installFetch();
    window.history.replaceState(
      null,
      "",
      "/dashboard/models?tab=combos&minMembers=-1&maxMembers=x"
    );
    await renderPage();

    expect(buttonByText("Clear filters")).toBeNull();
    expect(inputByLabel("Min members").value).toBe("");
    expect(inputByLabel("Max members").value).toBe("");
    expect(bodyRows()).toHaveLength(2);
  });

  it("ignores unknown provider filters once catalog options load", async () => {
    installFetch();
    window.history.replaceState(null, "", "/dashboard/models?provider=unknown");
    await renderPage();
    expect(bodyRows().length).toBeGreaterThan(0);
    expect(window.location.search).not.toContain("provider=unknown");
  });

  it("keeps both row tests disabled until their own requests finish", async () => {
    const responses = [deferred<Response>(), deferred<Response>()];
    let index = 0;
    installFetch({ modelTest: () => responses[index++].promise });
    await renderPage();
    const buttons = Array.from(
      container.querySelectorAll<HTMLButtonElement>("button[data-testid^='test-model-']")
    );
    await click(buttons[0]);
    await click(buttons[1]);
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].disabled).toBe(true);
    await act(async () => {
      responses[0].resolve(jsonResponse({ status: "ok", latencyMs: 90 }));
      await flush();
    });
    expect(buttons[0].disabled).toBe(false);
    expect(buttons[1].disabled).toBe(true);
    await act(async () => {
      responses[1].resolve(jsonResponse({ status: "ok", latencyMs: 90 }));
      await flush();
    });
    expect(buttons[1].disabled).toBe(false);
  });

  it("executes a single model test and displays the status badge and latency", async () => {
    const fetchMock = installFetch();
    await renderPage();

    await click(query("button[data-testid='test-model-alpha-chat']"));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/models/test",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ providerId: "alpha", modelId: "alpha-chat" }),
      })
    );
    const saved = readStoredResults();
    expect(saved[getModelTestKey("alpha", "alpha-chat")]?.status).toBe("ok");
    expect(bodyRows()[0].textContent).toContain("185ms");
    expect(bodyRows()[0].textContent).toContain("Just now");
  });

  it("executes a single combo test and displays the status badge and latency", async () => {
    const fetchMock = installFetch();
    window.history.replaceState(null, "", "/dashboard/models?tab=combos");
    await renderPage();

    await click(query("button[data-testid='test-combo-combo-1']"));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/combos/test",
      expect.objectContaining({ method: "POST", body: JSON.stringify({ comboName: "combo-1" }) })
    );
    const firstRow = bodyRows().find((row) => row.textContent?.includes("First Combo"));
    expect(firstRow?.textContent).toContain("OK");
    expect(firstRow?.textContent).toContain("210ms");
    expect(readStoredResults()[getComboTestKey("combo-1")]?.status).toBe("ok");
  });

  it("restores stored results on mount with relative test times and screen-reader error text", async () => {
    const okKey = getModelTestKey("alpha", "alpha-chat");
    const quotaKey = getModelTestKey("alpha", "alpha-embed");
    const httpKey = getModelTestKey("beta", "beta-coder");
    localStorage.setItem(
      CATALOG_TEST_RESULTS_STORAGE_NAME,
      JSON.stringify({
        [okKey]: {
          id: okKey,
          targetType: "model",
          status: "ok",
          latencyMs: 123,
          testedAt: Date.now() - 5 * 60_000,
        },
        [quotaKey]: {
          id: quotaKey,
          targetType: "model",
          status: "error",
          error: "Upstream quota exhausted",
          errorClass: "quota",
          testedAt: Date.now() - 3 * 3_600_000,
        },
        [httpKey]: {
          id: httpKey,
          targetType: "model",
          status: "error",
          errorClass: "other",
          statusCode: 503,
          testedAt: Date.now(),
        },
      })
    );
    installFetch();
    await renderPage();

    const [chatRow, embedRow, coderRow] = bodyRows();
    expect(chatRow.textContent).toContain("123ms");
    expect(chatRow.textContent).toContain("5m ago");
    expect(embedRow.textContent).toContain("Quota exceeded");
    expect(embedRow.textContent).toContain("3h ago");

    const quotaDetail = [...embedRow.querySelectorAll(".sr-only")].find((element) =>
      element.textContent?.includes("Upstream quota exhausted")
    );
    expect(quotaDetail).not.toBeUndefined();
    const httpDetail = [...coderRow.querySelectorAll(".sr-only")].find((element) =>
      element.textContent?.includes("HTTP 503")
    );
    expect(httpDetail).not.toBeUndefined();
  });

  it("confirms large bulk runs, batches ≤100 ids per provider and keeps ≤2 calls in flight", async () => {
    const bigModels = Array.from({ length: 120 }, (_, index) => ({
      id: `big-${String(index).padStart(3, "0")}`,
      name: `Big ${index}`,
      type: "chat",
    }));
    const testAll = deferredTestAll();
    installFetch({
      catalog: {
        big: { provider: "Provider Big", models: bigModels },
        two: { provider: "Provider Two", models: [{ id: "two-1", name: "Two", type: "chat" }] },
        three: {
          provider: "Provider Three",
          models: [{ id: "three-1", name: "Three", type: "chat" }],
        },
      },
      testAll: testAll.handler,
    });
    await renderPage();

    await click(query("button[data-testid='test-all-filtered-btn']"));

    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.textContent).toContain("122");
    expect(testAll.calls).toHaveLength(0);

    await click(buttonByText("Start tests", dialog ?? container));
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(testAll.calls).toHaveLength(2);

    const progress = query('[role="progressbar"]');
    expect(progress).not.toBeNull();
    expect(progress?.getAttribute("aria-label")).toBe("Bulk test progress");
    expect(progress?.getAttribute("aria-valuetext")).toBe("Testing 0 of 122 models…");
    expect(query<HTMLButtonElement>("button[data-testid='test-model-big-000']")?.disabled).toBe(
      true
    );

    for (let index = 0; index < testAll.calls.length; index += 1) {
      testAll.calls[index].resolve();
      await flush();
    }

    expect(testAll.calls).toHaveLength(4);
    expect(testAll.state.maxInFlight).toBe(2);
    for (const call of testAll.calls) {
      expect(call.body.modelIds.length).toBeLessThanOrEqual(100);
      expect(call.body.respectRateLimit).toBe(true);
    }
    const bigBatches = testAll.calls.filter((call) => call.body.providerId === "big");
    expect(bigBatches.map((call) => call.body.modelIds.length).sort((a, b) => b - a)).toEqual([
      100, 20,
    ]);
    const sentIds = testAll.calls.flatMap((call) => call.body.modelIds);
    expect(new Set(sentIds).size).toBe(122);
    expect(sentIds).toHaveLength(122);

    expect(query("button[data-testid='cancel-tests-btn']")).toBeNull();
    expect(Object.keys(readStoredResults())).toHaveLength(122);
    expect(query<HTMLButtonElement>("button[data-testid='test-model-big-000']")?.disabled).toBe(
      false
    );
  });

  it("asks for confirmation before testing more than 20 combos and can be dismissed", async () => {
    const combos = Array.from({ length: 21 }, (_, index) => ({
      id: `c-${index}`,
      name: `combo-${index}`,
      strategy: "priority",
      models: [{ model: "alpha/alpha-chat" }],
      isActive: true,
    }));
    const fetchMock = installFetch({ combos });
    window.history.replaceState(null, "", "/dashboard/models?tab=combos");
    await renderPage();

    await click(query("button[data-testid='test-all-filtered-btn']"));
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog?.textContent).toContain("21");

    await click(buttonByText("Cancel", dialog ?? container));
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(fetchMock.mock.calls.some((call) => String(call[0]).includes("/api/combos/test"))).toBe(
      false
    );
  });

  it("keeps models the server did not test (stoppedEarly) untested", async () => {
    installFetch({
      testAll: async (init) => {
        const body = JSON.parse(String(init?.body)) as TestAllBody;
        if (body.providerId === "alpha") {
          return jsonResponse({
            results: {
              "alpha-chat": { status: "error", latencyMs: 20, rateLimited: true, statusCode: 429 },
            },
            stoppedEarly: true,
            stopReason: "consecutive_rate_limits",
          });
        }
        return jsonResponse({ results: okResultsFor(body) });
      },
    });
    await renderPage();

    await click(query("button[data-testid='test-all-filtered-btn']"));

    const saved = readStoredResults();
    expect(saved[getModelTestKey("alpha", "alpha-chat")]?.status).toBe("error");
    expect(saved[getModelTestKey("beta", "beta-coder")]?.status).toBe("ok");
    expect(saved[getModelTestKey("alpha", "alpha-embed")]).toBeUndefined();
    expect(Object.keys(saved)).toHaveLength(2);
  });

  it("aborts a running bulk test on unmount and schedules nothing afterwards", async () => {
    const testAll = deferredTestAll();
    installFetch({
      catalog: {
        p1: { provider: "P1", models: [{ id: "m1", name: "m1", type: "chat" }] },
        p2: { provider: "P2", models: [{ id: "m2", name: "m2", type: "chat" }] },
        p3: { provider: "P3", models: [{ id: "m3", name: "m3", type: "chat" }] },
      },
      testAll: testAll.handler,
    });
    await renderPage();

    await click(query("button[data-testid='test-all-filtered-btn']"));
    expect(testAll.calls).toHaveLength(2);

    act(() => root.unmount());
    expect(testAll.calls.every((call) => call.signal?.aborted === true)).toBe(true);

    for (const call of testAll.calls) call.resolve();
    await flush();

    expect(testAll.calls).toHaveLength(2);
    expect(localStorage.getItem(CATALOG_TEST_RESULTS_STORAGE_NAME)).toBeNull();
  });

  it("cancels run A, and A's late completions leave run B running and cancellable", async () => {
    const comboCalls: Array<PendingCall<{ comboName: string }>> = [];
    installFetch({
      comboTest: (init) => {
        const body = JSON.parse(String(init?.body)) as { comboName: string };
        const response = deferred<Response>();
        comboCalls.push({
          body,
          signal: init?.signal,
          resolve: () =>
            response.resolve(
              jsonResponse({
                comboName: body.comboName,
                resolvedBy: "alpha/alpha-chat",
                results: [{ model: "alpha-chat", status: "ok", latencyMs: 50 }],
              })
            ),
        });
        return response.promise;
      },
    });
    window.history.replaceState(null, "", "/dashboard/models?tab=combos");
    await renderPage();

    // Run A
    await click(query("button[data-testid='test-all-filtered-btn']"));
    expect(comboCalls).toHaveLength(2);
    expect(query('[role="progressbar"]')?.getAttribute("aria-valuetext")).toBe(
      "Testing 0 of 2 combos…"
    );
    await click(query("button[data-testid='cancel-tests-btn']"));
    expect(comboCalls.every((call) => call.signal?.aborted === true)).toBe(true);
    expect(query("button[data-testid='cancel-tests-btn']")).toBeNull();
    expect(container.textContent).toContain("Tests cancelled after 0 of 2");

    // Run B
    await click(query("button[data-testid='test-all-filtered-btn']"));
    expect(comboCalls).toHaveLength(4);

    // A's late completions
    comboCalls[0].resolve();
    comboCalls[1].resolve();
    await flush();

    expect(query("button[data-testid='cancel-tests-btn']")).not.toBeNull();
    expect(query('[role="progressbar"]')).not.toBeNull();
    expect(query<HTMLButtonElement>("button[data-testid='test-combo-combo-1']")?.disabled).toBe(
      true
    );
    expect(localStorage.getItem(CATALOG_TEST_RESULTS_STORAGE_NAME)).toBeNull();

    await click(query("button[data-testid='cancel-tests-btn']"));
    expect(comboCalls[2].signal?.aborted).toBe(true);
    expect(comboCalls[3].signal?.aborted).toBe(true);
    expect(query("button[data-testid='cancel-tests-btn']")).toBeNull();
  });

  describe("URL sync", () => {
    function selectByLabel(text: string): HTMLSelectElement {
      const label = [...container.querySelectorAll("label")].find((element) =>
        element.textContent?.trim().startsWith(text)
      );
      const select = label?.querySelector("select") ?? null;
      expect(select).not.toBeNull();
      return select as HTMLSelectElement;
    }

    function refreshButton(): HTMLButtonElement | null {
      return (
        [...container.querySelectorAll<HTMLButtonElement>("button")].find((button) =>
          button.textContent?.trim().endsWith("Refresh")
        ) ?? null
      );
    }

    it("keeps the page usable and filtering when history.replaceState throws", async () => {
      installFetch();
      await renderPage();
      // Safari throws a SecurityError after 100 history updates in 10 seconds.
      const replaceState = vi.spyOn(window.history, "replaceState").mockImplementation(() => {
        throw new DOMException("history.replaceState() called too often", "SecurityError");
      });

      const minOutput = inputByLabel("Min max output");
      for (const value of ["8", "80", "800", "8000"]) {
        await act(async () => setInputValue(minOutput, value));
        await flush();
      }

      expect(replaceState).toHaveBeenCalled();
      expect(query('[role="tablist"]')).not.toBeNull();
      expect(bodyRows()).toHaveLength(1);
      expect(query("tbody")?.textContent).toContain("Alpha Chat");
    });

    it("does not rewrite the URL when it already matches the filters", async () => {
      installFetch();
      await renderPage();
      const replaceState = vi.spyOn(window.history, "replaceState");

      await act(async () => {
        window.dispatchEvent(new PopStateEvent("popstate"));
      });
      await flush();

      expect(replaceState).not.toHaveBeenCalled();
    });

    it("writes the URL once per filter change", async () => {
      installFetch();
      await renderPage();
      const replaceState = vi.spyOn(window.history, "replaceState");

      await act(async () => setInputValue(inputByLabel("Min context"), "8000"));
      await flush();

      expect(replaceState).toHaveBeenCalledTimes(1);
      expect(new URLSearchParams(window.location.search).get("minContext")).toBe("8000");
    });

    it("keeps rows visible during Refresh when the URL carries an unknown provider", async () => {
      const reload = deferred<Response>();
      let catalogCalls = 0;
      installFetch({
        catalogResponse: () => {
          catalogCalls += 1;
          return catalogCalls === 1
            ? Promise.resolve(jsonResponse({ catalog: DEFAULT_CATALOG }))
            : reload.promise;
        },
      });
      window.history.replaceState(null, "", "/dashboard/models?provider=bogus");
      await renderPage();
      expect(bodyRows()).toHaveLength(3);

      await click(refreshButton());
      expect(catalogCalls).toBe(2);
      expect(container.textContent).not.toContain("No models match these filters.");
      expect(bodyRows()).toHaveLength(3);

      await act(async () => {
        reload.resolve(jsonResponse({ catalog: DEFAULT_CATALOG }));
      });
      await flush();
      expect(bodyRows()).toHaveLength(3);
      expect(window.location.search).not.toContain("provider=bogus");
    });

    it("keeps valid URL filters when the catalog request fails", async () => {
      installFetch({ catalogResponse: () => Promise.reject(new Error("network down")) });
      window.history.replaceState(null, "", "/dashboard/models?provider=alpha&type=chat");
      await renderPage();

      expect(query('[role="alert"]')?.textContent).toContain("Unable to load the model catalog.");
      const params = new URLSearchParams(window.location.search);
      expect(params.get("provider")).toBe("alpha");
      expect(params.get("type")).toBe("chat");
    });

    it("matches a capability URL param case-insensitively", async () => {
      installFetch();
      window.history.replaceState(null, "", "/dashboard/models?capability=Tools");
      await renderPage();

      expect(bodyRows()).toHaveLength(1);
      expect(query("tbody")?.textContent).toContain("Alpha Chat");
      expect(selectByLabel("Capability").value).toBe("tools");
    });
  });
});
