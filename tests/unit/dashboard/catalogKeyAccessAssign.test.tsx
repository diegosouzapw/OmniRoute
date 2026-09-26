// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
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

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import ModelCatalogPage from "@/app/(dashboard)/dashboard/models/page";
import { useNotificationStore } from "@/store/notificationStore";

const catalogText = (enMessages as { modelCatalog: Record<string, string> }).modelCatalog;

interface KeyFixture {
  id: string;
  name: string;
  modelAccessMode: "all" | "restricted";
  allowedModels: string[];
  allowedCombos: string[];
  isActive?: boolean;
  isBanned?: boolean;
}

interface AccessBody {
  add?: { models?: string[]; combos?: string[] };
  remove?: { models?: string[]; combos?: string[] };
  switchToRestricted?: boolean;
}

interface AccessCall {
  keyId: string;
  body: AccessBody;
}

type AccessHandler = (call: AccessCall, current: KeyFixture) => Promise<Response>;

const CATALOG = {
  alpha: {
    provider: "Alpha Labs",
    models: [
      { id: "alpha/chat", name: "Alpha Chat", type: "chat" },
      { id: "alpha/embed", name: "Alpha Embed", type: "embedding" },
    ],
  },
  cc: {
    provider: "Claude Code",
    models: [{ id: "cc/claude-sonnet", name: "Claude Sonnet", type: "chat" }],
  },
};

const COMBOS = [
  {
    id: "c-1",
    name: "combo-1",
    displayName: "First Combo",
    strategy: "priority",
    models: [{ model: "alpha/chat" }],
    isActive: true,
  },
  {
    id: "c-2",
    name: "combo-2",
    displayName: "Second Combo",
    strategy: "priority",
    models: [{ model: "alpha/embed" }],
    isActive: true,
  },
];

function initialKeys(): KeyFixture[] {
  return [
    {
      id: "k-alice",
      name: "key-alice",
      modelAccessMode: "restricted",
      allowedModels: ["alpha/chat"],
      allowedCombos: ["combo/combo-1"],
      isActive: true,
    },
    {
      id: "k-bob",
      name: "key-bob",
      modelAccessMode: "restricted",
      allowedModels: ["cc/*"],
      allowedCombos: [],
      isActive: true,
    },
    {
      id: "k-all",
      name: "key-all",
      modelAccessMode: "all",
      allowedModels: [],
      allowedCombos: ["combo/*"],
      isActive: true,
    },
  ];
}

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as unknown as Response;
}

function strip(name: string) {
  return name.startsWith("combo/") ? name.slice(6) : name;
}

/** Minimal server-side merge so optimistic updates can be reconciled in the tests. */
function serverApply(current: KeyFixture, body: AccessBody) {
  const next = { ...current, allowedModels: [...current.allowedModels] };
  next.allowedCombos = [...current.allowedCombos];
  const addModels = body.add?.models ?? [];
  if (addModels.length > 0) {
    next.allowedModels =
      current.modelAccessMode === "all"
        ? [...addModels]
        : [...new Set([...current.allowedModels, ...addModels])];
    next.modelAccessMode = "restricted";
  }
  const removeModels = new Set(body.remove?.models ?? []);
  if (current.modelAccessMode === "restricted") {
    next.allowedModels = next.allowedModels.filter((model) => !removeModels.has(model));
  }
  const addCombos = body.add?.combos ?? [];
  if (addCombos.length > 0) next.allowedCombos = [...next.allowedCombos, ...addCombos];
  const removeCombos = new Set((body.remove?.combos ?? []).map(strip));
  if (!current.allowedCombos.includes("combo/*")) {
    next.allowedCombos = next.allowedCombos.filter((combo) => !removeCombos.has(strip(combo)));
  }
  const changed = JSON.stringify(next) !== JSON.stringify(current);
  return { ...next, changed };
}

function installFetch(options: { access?: AccessHandler } = {}) {
  const keys = initialKeys();
  const accessCalls: AccessCall[] = [];
  const keyListUrls: string[] = [];
  const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const accessMatch = url.match(/\/api\/keys\/([^/]+)\/access$/);
    if (accessMatch) {
      const call = {
        keyId: decodeURIComponent(accessMatch[1]),
        body: JSON.parse(String(init?.body)),
      };
      accessCalls.push(call);
      const index = keys.findIndex((entry) => entry.id === call.keyId);
      const current = keys[index];
      if (options.access) return options.access(call, current);
      const result = serverApply(current, call.body);
      const { changed, ...stored } = result;
      keys[index] = stored;
      return Promise.resolve(jsonResponse({ ...stored, changed }));
    }
    if (url.includes("/api/keys")) {
      keyListUrls.push(url);
      return Promise.resolve(jsonResponse({ keys: keys.map((entry) => ({ ...entry })), total: 3 }));
    }
    if (url.includes("/api/models/catalog"))
      return Promise.resolve(jsonResponse({ catalog: CATALOG }));
    if (url.includes("/api/providers/health-matrix")) {
      return Promise.resolve(jsonResponse({ providers: [] }));
    }
    if (url.includes("/api/combos")) return Promise.resolve(jsonResponse({ combos: COMBOS }));
    return Promise.reject(new Error(`Unhandled mock url: ${url}`));
  });
  vi.stubGlobal("fetch", fetchMock);
  return { accessCalls, keyListUrls, keys };
}

function deferred<T>() {
  let resolve: (value: T) => void = () => undefined;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

describe("Catalog: assign models and combos to API keys", () => {
  let container: HTMLDivElement;
  let root: Root;
  let toasts: Array<{ type: string; message: string }>;
  let unsubscribe: () => void;

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
    useNotificationStore.getState().clearAll();
    toasts = [];
    unsubscribe = useNotificationStore.subscribe((state, previous) => {
      for (const entry of state.notifications) {
        if (!previous.notifications.includes(entry)) {
          toasts.push({ type: entry.type, message: entry.message });
        }
      }
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    unsubscribe();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

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

  async function click(element: Element | null) {
    expect(element).not.toBeNull();
    await act(async () => {
      (element as HTMLElement).click();
    });
    await flush();
  }

  function byTestId<T extends Element = HTMLElement>(id: string): T | null {
    return document.querySelector<T>(`[data-testid="${id}"]`);
  }

  function byLabel<T extends Element = HTMLElement>(label: string): T | null {
    return document.querySelector<T>(`[aria-label="${label}"]`);
  }

  function dialog(): HTMLElement {
    const element = document.querySelector<HTMLElement>('[role="dialog"][aria-modal="true"]');
    expect(element).not.toBeNull();
    return element as HTMLElement;
  }

  async function openAssignDialogForAlphaModels() {
    await click(byLabel("Select model Alpha Chat"));
    await click(byLabel("Select model Alpha Embed"));
    await click(byTestId("assign-keys-btn"));
  }

  async function selectKeys(...names: string[]) {
    for (const name of names) await click(byLabel(`Select API key ${name}`));
  }

  function resultText(keyId: string) {
    return byTestId(`assign-result-${keyId}`)?.textContent ?? "";
  }

  it("loads keys lazily and skips all-mode keys on add unless switched", async () => {
    const { accessCalls, keyListUrls } = installFetch();
    await renderPage();

    expect(keyListUrls).toEqual([]);
    expect(byTestId("assign-keys-btn")?.hasAttribute("disabled")).toBe(true);
    expect(byTestId("key-access-models-alpha/chat")?.textContent).toContain(
      catalogText.keyAccessButton
    );

    await openAssignDialogForAlphaModels();

    expect(keyListUrls.length).toBe(1);
    expect(keyListUrls[0]).toContain("offset=0");
    const modal = dialog();
    expect(modal.textContent).toContain("key-alice");
    expect(modal.textContent).toContain("Models: 1");
    expect(modal.textContent).toContain("All models");
    expect(modal.textContent).toContain("Active");

    await selectKeys("key-alice", "key-bob", "key-all");
    const switchBox = byTestId<HTMLInputElement>("switch-restricted-k-all");
    expect(switchBox).not.toBeNull();
    expect(switchBox?.checked).toBe(false);

    await click(byTestId("assign-apply-btn"));

    expect(accessCalls.map((call) => call.keyId).sort()).toEqual(["k-alice", "k-bob"]);
    for (const call of accessCalls) {
      expect(call.body).toEqual({ add: { models: ["alpha/chat", "alpha/embed"] } });
    }
    expect(resultText("k-all")).toContain(catalogText.resultSkipped);
    expect(resultText("k-alice")).toContain(catalogText.resultChanged);
    expect(resultText("k-bob")).toContain(catalogText.resultChanged);
    expect(toasts.some((toast) => toast.type === "success")).toBe(true);
    // Completion refreshes the key data once.
    expect(keyListUrls.length).toBe(2);
  });

  it("sends switchToRestricted only for the opted-in key and keeps at most 2 requests in flight", async () => {
    const pending: Array<() => void> = [];
    const state = { inFlight: 0, maxInFlight: 0 };
    const { accessCalls } = installFetch({
      access: (call, current) => {
        const response = deferred<Response>();
        state.inFlight += 1;
        state.maxInFlight = Math.max(state.maxInFlight, state.inFlight);
        pending.push(() => {
          state.inFlight -= 1;
          response.resolve(jsonResponse(serverApply(current, call.body)));
        });
        return response.promise;
      },
    });
    await renderPage();
    await openAssignDialogForAlphaModels();
    await selectKeys("key-alice", "key-bob", "key-all");
    await click(byTestId("switch-restricted-k-all"));
    await click(byTestId("assign-apply-btn"));

    expect(accessCalls.length).toBe(2);
    expect(state.inFlight).toBe(2);

    while (pending.length > 0) {
      await act(async () => {
        pending.shift()?.();
      });
      await flush();
    }

    expect(accessCalls.length).toBe(3);
    expect(state.maxInFlight).toBe(2);
    const byKey = Object.fromEntries(accessCalls.map((call) => [call.keyId, call.body]));
    expect(byKey["k-all"]).toEqual({
      add: { models: ["alpha/chat", "alpha/embed"] },
      switchToRestricted: true,
    });
    expect(byKey["k-alice"]).toEqual({ add: { models: ["alpha/chat", "alpha/embed"] } });
    expect(byKey["k-bob"]).toEqual({ add: { models: ["alpha/chat", "alpha/embed"] } });
    expect(resultText("k-all")).toContain(catalogText.resultChanged);
  });

  it("shows a 409 as needing the restricted switch", async () => {
    installFetch({
      access: () =>
        Promise.resolve(
          jsonResponse(
            { error: { code: "key_allows_all_models", message: "API key allows all models." } },
            409
          )
        ),
    });
    await renderPage();
    await openAssignDialogForAlphaModels();
    await selectKeys("key-alice");
    await click(byTestId("assign-apply-btn"));

    expect(resultText("k-alice")).toContain(catalogText.resultNeedsSwitch);
    expect(resultText("k-alice")).not.toContain(catalogText.resultNetworkError);
    expect(toasts.some((toast) => toast.type === "error")).toBe(true);
  });

  it("shows the sanitized API message for other errors", async () => {
    installFetch({
      access: () =>
        Promise.resolve(
          jsonResponse({ error: { message: "Allowed models list exceeds maximum" } }, 400)
        ),
    });
    await renderPage();
    await openAssignDialogForAlphaModels();
    await selectKeys("key-bob");
    await click(byTestId("assign-apply-btn"));

    expect(resultText("k-bob")).toContain("Allowed models list exceeds maximum");
  });

  it("reports Remove on an all-mode key as no change", async () => {
    const { accessCalls } = installFetch();
    await renderPage();
    await openAssignDialogForAlphaModels();
    await click(byLabel(catalogText.assignActionRemove));
    await selectKeys("key-all");

    expect(byTestId("switch-restricted-k-all")).toBeNull();
    expect(dialog().textContent).toContain(catalogText.removeNoChangeHint);

    await click(byTestId("assign-apply-btn"));

    expect(accessCalls).toEqual([
      { keyId: "k-all", body: { remove: { models: ["alpha/chat", "alpha/embed"] } } },
    ]);
    expect(resultText("k-all")).toContain(catalogText.resultUnchanged);
  });

  it("toggles a model on a key from the row popover with optimistic updates", async () => {
    const { accessCalls, keyListUrls } = installFetch();
    await renderPage();

    await click(byTestId("key-access-models-alpha/chat"));
    expect(keyListUrls.length).toBe(1);
    expect(byTestId("key-access-models-alpha/chat")?.textContent).toContain("Allowed in: 2 keys");

    const bobSwitch = byLabel<HTMLButtonElement>("Allow alpha/chat on key-bob");
    expect(bobSwitch?.getAttribute("aria-checked")).toBe("false");
    await click(bobSwitch);
    expect(accessCalls.at(-1)).toEqual({
      keyId: "k-bob",
      body: { add: { models: ["alpha/chat"] } },
    });
    expect(byLabel("Allow alpha/chat on key-bob")?.getAttribute("aria-checked")).toBe("true");
    expect(byTestId("key-access-models-alpha/chat")?.textContent).toContain("Allowed in: 3 keys");

    await click(byLabel("Allow alpha/chat on key-alice"));
    expect(accessCalls.at(-1)).toEqual({
      keyId: "k-alice",
      body: { remove: { models: ["alpha/chat"] } },
    });
    expect(byLabel("Allow alpha/chat on key-alice")?.getAttribute("aria-checked")).toBe("false");
    // The popover reuses the loaded index instead of refetching.
    expect(keyListUrls.length).toBe(1);
  });

  it("rolls a failed toggle back and reports the error", async () => {
    const response = deferred<Response>();
    installFetch({ access: () => response.promise });
    await renderPage();
    await click(byTestId("key-access-models-alpha/chat"));

    await click(byLabel("Allow alpha/chat on key-bob"));
    // Optimistic state while the request is pending.
    expect(byLabel("Allow alpha/chat on key-bob")?.getAttribute("aria-checked")).toBe("true");

    await act(async () => {
      response.resolve(jsonResponse({ error: "Failed to assign key access" }, 500));
    });
    await flush();

    expect(byLabel("Allow alpha/chat on key-bob")?.getAttribute("aria-checked")).toBe("false");
    expect(toasts.some((toast) => toast.type === "error")).toBe(true);
  });

  it("disables wildcard-covered and all-mode keys in the popover", async () => {
    installFetch();
    await renderPage();
    await click(byTestId("key-access-models-cc/claude-sonnet"));

    const bobSwitch = byLabel<HTMLButtonElement>("Allow cc/claude-sonnet on key-bob");
    expect(bobSwitch?.getAttribute("aria-checked")).toBe("true");
    expect(bobSwitch?.disabled).toBe(true);
    expect(byTestId("key-access-row-k-bob")?.textContent).toContain("via cc/*");

    const allSwitch = byLabel<HTMLButtonElement>("Allow cc/claude-sonnet on key-all");
    expect(allSwitch?.getAttribute("aria-checked")).toBe("true");
    expect(allSwitch?.disabled).toBe(true);
    const editLink = byTestId<HTMLAnchorElement>("key-access-row-k-all")?.querySelector("a");
    expect(editLink?.getAttribute("href")).toBe("/dashboard/api-manager/k-all/access");
    expect(editLink?.textContent).toContain(catalogText.editKeyAccess);

    const aliceSwitch = byLabel<HTMLButtonElement>("Allow cc/claude-sonnet on key-alice");
    expect(aliceSwitch?.getAttribute("aria-checked")).toBe("false");
    expect(aliceSwitch?.disabled).toBe(false);
  });

  it("toggles combos with normalised names and closes the popover on Escape", async () => {
    const { accessCalls } = installFetch();
    await renderPage();
    const combosTab = [...container.querySelectorAll('[role="tab"]')][1];
    await click(combosTab);

    await click(byTestId("key-access-combos-combo-1"));
    expect(byTestId("key-access-combos-combo-1")?.textContent).toContain("Allowed in: 2 keys");
    const aliceSwitch = byLabel<HTMLButtonElement>("Allow combo-1 on key-alice");
    expect(aliceSwitch?.getAttribute("aria-checked")).toBe("true");
    expect(byLabel<HTMLButtonElement>("Allow combo-1 on key-all")?.disabled).toBe(true);

    await click(aliceSwitch);
    expect(accessCalls.at(-1)).toEqual({
      keyId: "k-alice",
      body: { remove: { combos: ["combo-1"] } },
    });

    await act(async () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    await flush();
    expect(byLabel("Allow combo-1 on key-alice")).toBeNull();
  });

  it("assigns selected combos from the combos tab", async () => {
    const { accessCalls } = installFetch();
    await renderPage();
    await click([...container.querySelectorAll('[role="tab"]')][1]);
    await click(byLabel("Select combo combo-2"));
    await click(byTestId("assign-keys-btn"));

    expect(dialog().textContent).toContain("All combos");
    await selectKeys("key-bob");
    await click(byTestId("assign-apply-btn"));

    expect(accessCalls).toEqual([{ keyId: "k-bob", body: { add: { combos: ["combo-2"] } } }]);
  });
});
