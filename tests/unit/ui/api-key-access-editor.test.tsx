// @vitest-environment jsdom

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../src/i18n/messages/en.json";
import ApiKeyAccessEditorClient from "../../../src/app/(dashboard)/dashboard/api-manager/[id]/access/ApiKeyAccessEditorClient";
import { useNotificationStore } from "../../../src/store/notificationStore";

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
};

let currentSearch = "";

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(currentSearch),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const sampleKey = {
  id: "test-key-id",
  name: "Production Test Key",
  key: "omni-tes****5678",
  modelAccessMode: "all",
  allowedModels: [] as string[],
  blockedModels: [] as string[],
  allowedCombos: [] as string[],
  allowedConnections: [] as string[],
  noLog: false,
  autoResolve: false,
  isActive: true,
  throttleDelayMs: 0,
  isBanned: false,
  expiresAt: null,
  maxSessions: 0,
  accessSchedule: null,
  rateLimits: null,
  scopes: ["manage", "self:usage"],
  allowedEndpoints: [] as string[],
  streamDefaultMode: "legacy",
  compressionEnabled: true,
  allowAutoCombos: true,
  catalogScope: "all",
  disableNonPublicModels: false,
  allowUsageCommand: false,
  usageLimitEnabled: false,
  dailyUsageLimitUsd: null,
  weeklyUsageLimitUsd: null,
  chaosModeEnabled: false,
};

type KeyRecord = typeof sampleKey;
type FakeResponse = { ok: boolean; status: number; json: () => Promise<unknown> };

interface FetchOptions {
  /** Answer for the Nth (0-based) GET of the key; default: the current server copy. */
  keyGet?: (callIndex: number, serverKey: KeyRecord) => Promise<FakeResponse> | FakeResponse;
  /** Answer for PATCH; default: 200 and the body is merged into the server copy. */
  patch?: (body: Record<string, unknown>) => Promise<FakeResponse> | FakeResponse;
  /** Answer for GET /v1/models; default: a two-model catalog. */
  models?: () => Promise<FakeResponse> | FakeResponse;
}

function jsonResponse(body: unknown, status = 200): FakeResponse {
  // A real Response.json() always yields a fresh object, never the server's own reference.
  const payload = JSON.stringify(body);
  return { ok: status >= 200 && status < 300, status, json: async () => JSON.parse(payload) };
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

describe("ApiKeyAccessEditorClient", () => {
  let patchCalls: Array<{ url: string; body: Record<string, unknown> }> = [];
  let fetchUrls: string[] = [];
  let keyGetCount = 0;

  function installFetch(options: FetchOptions = {}, initialKey: KeyRecord = sampleKey) {
    let serverKey: KeyRecord = { ...initialKey };
    keyGetCount = 0;
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      const urlStr = String(url);
      fetchUrls.push(urlStr);
      if (urlStr.includes("/api/keys/test-key-id") && init?.method === "PATCH") {
        const body = JSON.parse(String(init.body));
        patchCalls.push({ url: urlStr, body });
        if (options.patch) return options.patch(body);
        serverKey = { ...serverKey, ...body };
        return jsonResponse({ message: "API key settings updated successfully" });
      }
      if (urlStr.includes("/api/keys/test-key-id")) {
        const index = keyGetCount++;
        if (options.keyGet) return options.keyGet(index, serverKey);
        return jsonResponse(serverKey);
      }
      if (urlStr.includes("/v1/models")) {
        if (options.models) return options.models();
        return jsonResponse({
          data: [
            { id: "openai/gpt-4o", name: "GPT-4o", owned_by: "openai" },
            { id: "anthropic/claude-3-5-sonnet", name: "Claude 3.5 Sonnet", owned_by: "claude" },
          ],
        });
      }
      if (urlStr.includes("/api/combos")) {
        return jsonResponse({ combos: [{ name: "test-combo", isActive: true }] });
      }
      if (urlStr.includes("/api/providers")) {
        return jsonResponse({ connections: [] });
      }
      return jsonResponse({});
    });
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  }

  beforeEach(() => {
    patchCalls = [];
    fetchUrls = [];
    currentSearch = "";
    vi.clearAllMocks();
    installFetch();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function renderEditor() {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ApiKeyAccessEditorClient apiKeyId="test-key-id" />
      </NextIntlClientProvider>
    );
  }

  async function renderLoaded() {
    const view = renderEditor();
    await waitFor(() => {
      expect(screen.getByRole("tablist")).toBeDefined();
    });
    return view;
  }

  function isUnloadBlocked(): boolean {
    const event = new Event("beforeunload", { cancelable: true });
    window.dispatchEvent(event);
    return event.defaultPrevented;
  }

  async function makeDirty(value = "Updated Key Name") {
    const nameInput = await screen.findByDisplayValue("Production Test Key");
    fireEvent.change(nameInput, { target: { value } });
    return nameInput as HTMLInputElement;
  }

  async function waitForSaveToSettle() {
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /save changes/i })).toBeDefined();
    });
  }

  it("renders tabs and default general tab content", async () => {
    await renderLoaded();

    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBe(6);

    const generalTab = screen.getByRole("tab", { name: /general/i });
    expect(generalTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tabpanel")).toBeDefined();

    // Decorative icon ligatures ("tune", "arrow_back") stay out of accessible names.
    expect(screen.getByRole("tab", { name: "General" })).toBe(generalTab);
    expect(screen.getByRole("link", { name: messages.apiManager.keyManagement })).toBeDefined();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Production Test Key")).toBeDefined();
    });
  });

  it("switches tabs via click and via keyboard navigation", async () => {
    await renderLoaded();

    const modelsTab = screen.getByRole("tab", { name: /models/i });
    fireEvent.click(modelsTab);

    expect(modelsTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("button", { name: /allow all/i })).toBeDefined();

    fireEvent.keyDown(modelsTab, { key: "ArrowRight" });
    const combosTab = screen.getByRole("tab", { name: /combos/i });
    expect(combosTab.getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(combosTab, { key: "ArrowLeft" });
    expect(modelsTab.getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(modelsTab, { key: "End" });
    const behaviourTab = screen.getByRole("tab", { name: /behaviour/i });
    expect(behaviourTab.getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(behaviourTab, { key: "Home" });
    const generalTab = screen.getByRole("tab", { name: /general/i });
    expect(generalTab.getAttribute("aria-selected")).toBe("true");
  });

  it("every aria-controls points at a rendered tabpanel labelled by its tab", async () => {
    await renderLoaded();

    for (const tabId of ["general", "limits", "behaviour"]) {
      fireEvent.click(screen.getByRole("tab", { name: new RegExp(tabId, "i") }));
      for (const tab of screen.getAllByRole("tab")) {
        const controls = tab.getAttribute("aria-controls");
        if (controls) expect(document.getElementById(controls)).not.toBeNull();
      }
      const selected = screen.getByRole("tab", { selected: true });
      const panel = screen.getByRole("tabpanel");
      expect(selected.getAttribute("aria-controls")).toBe(panel.id);
      expect(panel.getAttribute("aria-labelledby")).toBe(selected.id);
    }
  });

  it("respects deep link ?tab=limits", async () => {
    currentSearch = "tab=limits";
    await renderLoaded();

    const limitsTab = screen.getByRole("tab", { name: /limits/i });
    expect(limitsTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText(/Max Active Sessions/i)).toBeDefined();
  });

  it("fetches the key and the model/combo/connection lists in parallel", async () => {
    const keyGate = deferred<FakeResponse>();
    installFetch({ keyGet: (index, key) => (index === 0 ? keyGate.promise : jsonResponse(key)) });

    renderEditor();

    // Lists must be requested without waiting for the key to resolve
    await waitFor(() => {
      const hasModels = fetchUrls.some((url) => url.includes("/v1/models"));
      const hasCombos = fetchUrls.some((url) => url.includes("/api/combos"));
      const hasProviders = fetchUrls.some((url) => url.includes("/api/providers"));
      const hasKey = fetchUrls.some((url) => url.includes("/api/keys/test-key-id"));
      expect(hasModels).toBe(true);
      expect(hasCombos).toBe(true);
      expect(hasProviders).toBe(true);
      expect(hasKey).toBe(true);
    });
    // Loading gate should still be up (key not yet resolved)
    expect(screen.queryByRole("tablist")).toBeNull();

    keyGate.resolve(jsonResponse(sampleKey));
    await waitFor(() => {
      expect(screen.getByRole("tablist")).toBeDefined();
    });
  });

  it("dirty state enables save/discard and discard restores the loaded values", async () => {
    await renderLoaded();

    const saveButton = screen.getByRole("button", { name: /save changes/i });
    const discardButton = screen.getByRole("button", { name: /discard/i });
    expect(saveButton.hasAttribute("disabled")).toBe(true);
    expect(discardButton.hasAttribute("disabled")).toBe(true);

    const nameInput = await makeDirty();
    expect(saveButton.hasAttribute("disabled")).toBe(false);
    expect(discardButton.hasAttribute("disabled")).toBe(false);

    fireEvent.click(discardButton);
    expect(nameInput.value).toBe("Production Test Key");
    expect(saveButton.hasAttribute("disabled")).toBe(true);
  });

  it("blocks beforeunload only while dirty, including right after a save", async () => {
    await renderLoaded();
    expect(isUnloadBlocked()).toBe(false);

    await makeDirty();
    expect(isUnloadBlocked()).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: /discard/i }));
    expect(isUnloadBlocked()).toBe(false);

    await makeDirty("Saved Key Name");
    expect(isUnloadBlocked()).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(patchCalls.length).toBe(1);
      expect(keyGetCount).toBe(2);
    });
    await waitForSaveToSettle();
    expect(isUnloadBlocked()).toBe(false);
    expect(screen.getByDisplayValue("Saved Key Name")).toBeDefined();
  });

  it("asks for confirmation before following an in-app link while dirty", async () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);
    await renderLoaded();

    const backLink = screen.getByRole("link", { name: /api key management/i });
    const swallowNavigation = (event: Event) => event.preventDefault();

    backLink.addEventListener("click", swallowNavigation);
    fireEvent.click(backLink);
    expect(confirmSpy).not.toHaveBeenCalled();
    backLink.removeEventListener("click", swallowNavigation);

    await makeDirty();
    const notCancelled = fireEvent.click(backLink);
    expect(confirmSpy).toHaveBeenCalledWith(messages.apiManager.unsavedChangesWarning);
    expect(notCancelled).toBe(false);
  });

  it("does not intercept modified clicks, middle clicks or links opening a new tab", async () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);
    await renderLoaded();
    await makeDirty();

    const backLink = screen.getByRole("link", { name: /api key management/i });
    const newTabLink = document.createElement("a");
    newTabLink.href = "/dashboard/api-manager";
    newTabLink.target = "_blank";
    newTabLink.textContent = "open in new tab";
    document.body.appendChild(newTabLink);

    const swallowNavigation = (event: Event) => event.preventDefault();
    backLink.addEventListener("click", swallowNavigation);
    newTabLink.addEventListener("click", swallowNavigation);

    fireEvent.click(backLink, { ctrlKey: true });
    fireEvent.click(backLink, { metaKey: true });
    fireEvent.click(backLink, { shiftKey: true });
    fireEvent.click(backLink, { altKey: true });
    fireEvent.click(backLink, { button: 1 });
    fireEvent.click(newTabLink);

    expect(confirmSpy).not.toHaveBeenCalled();

    // The guard is still armed: a plain click on the same link asks once.
    fireEvent.click(backLink);
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    newTabLink.remove();
  });

  it("does not prompt for same-page hash links", async () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);
    await renderLoaded();
    await makeDirty();

    const { pathname, search } = window.location;
    const hashLink = document.createElement("a");
    hashLink.href = `${pathname}${search}#rate-limits`;
    hashLink.textContent = "jump to rate limits";
    document.body.appendChild(hashLink);
    const otherPageHashLink = document.createElement("a");
    otherPageHashLink.href = `${pathname.replace(/\/?$/, "/elsewhere")}#rate-limits`;
    otherPageHashLink.textContent = "other page section";
    document.body.appendChild(otherPageHashLink);

    const swallowNavigation = (event: Event) => event.preventDefault();
    hashLink.addEventListener("click", swallowNavigation);
    otherPageHashLink.addEventListener("click", swallowNavigation);

    fireEvent.click(hashLink);
    expect(confirmSpy).not.toHaveBeenCalled();

    fireEvent.click(otherPageHashLink);
    expect(confirmSpy).toHaveBeenCalledTimes(1);

    hashLink.remove();
    otherPageHashLink.remove();
  });

  it("Save sends the full PATCH body", async () => {
    await renderLoaded();
    await makeDirty("New Patched Name");

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(patchCalls.length).toBe(1);
    });

    expect(patchCalls[0].url).toBe("/api/keys/test-key-id");
    expect(patchCalls[0].body).toEqual({
      name: "New Patched Name",
      modelAccessMode: "all",
      connectionAccessMode: "all",
      allowedModels: [],
      blockedModels: [],
      allowedCombos: [],
      allowedConnections: [],
      noLog: false,
      autoResolve: false,
      isActive: true,
      throttleDelayMs: 0,
      isBanned: false,
      expiresAt: null,
      maxSessions: 0,
      accessSchedule: null,
      rateLimits: null,
      scopes: ["manage", "self:usage"],
      allowedEndpoints: [],
      streamDefaultMode: "legacy",
      compressionEnabled: true,
      allowAutoCombos: true,
      catalogScope: "all",
      disableNonPublicModels: false,
      allowUsageCommand: false,
      usageLimitEnabled: false,
      dailyUsageLimitUsd: null,
      weeklyUsageLimitUsd: null,
      chaosModeEnabled: false,
    });
  });

  it("a failed refetch after a successful PATCH leaves the form clean without an error toast", async () => {
    installFetch({
      keyGet: (index, key) => {
        if (index === 0) return jsonResponse(key);
        throw new TypeError("network down");
      },
    });
    const successSpy = vi.spyOn(useNotificationStore.getState(), "success");
    const errorSpy = vi.spyOn(useNotificationStore.getState(), "error");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});

    await renderLoaded();
    await makeDirty("Renamed Once");
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(successSpy).toHaveBeenCalledWith(messages.apiManager.accessUpdatedSuccess);
      expect(keyGetCount).toBe(2);
    });
    await waitForSaveToSettle();

    expect(screen.queryByText(messages.apiManager.unsavedChanges)).toBeNull();
    expect(screen.getByRole("button", { name: /save changes/i }).hasAttribute("disabled")).toBe(
      true
    );
    expect(screen.getByDisplayValue("Renamed Once")).toBeDefined();
    expect(isUnloadBlocked()).toBe(false);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("shows error toast on 4xx PATCH response and keeps the edits", async () => {
    installFetch({
      patch: () => jsonResponse({ error: { message: "Invalid key configuration" } }, 400),
    });
    const errorSpy = vi.spyOn(useNotificationStore.getState(), "error");

    await renderLoaded();
    await makeDirty("Trigger Error Name");
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith("Invalid key configuration");
    });
    await waitForSaveToSettle();
    expect(screen.getByText(messages.apiManager.unsavedChanges)).toBeDefined();
    expect(isUnloadBlocked()).toBe(true);
  });

  it("renders validation messages inline on the tab and counts them on the tab badge", async () => {
    currentSearch = "tab=limits";
    await renderLoaded();

    fireEvent.click(screen.getByRole("button", { name: /add limit/i }));
    const [requestsInput] = screen.getAllByPlaceholderText(
      messages.apiManager.apiManagerRateLimitRequestsPlaceholder
    );
    fireEvent.change(requestsInput, { target: { value: "0" } });

    const panel = screen.getByRole("tabpanel");
    expect(within(panel).getByText(messages.apiManager.rateLimitPositiveError)).toBeDefined();

    const limitsTab = screen.getByRole("tab", { name: /limits/i });
    const hiddenCount = within(limitsTab).getByText("1 validation error");
    expect(hiddenCount.className).toContain("sr-only");
    expect(screen.getByRole("tab", { name: "Limits 1 validation error" })).toBe(limitsTab);
    expect(screen.getByRole("button", { name: /save changes/i }).hasAttribute("disabled")).toBe(
      true
    );
  });

  it("locks the tab panel while a save is in flight so no edit is lost to the refresh", async () => {
    const saveGate = deferred<FakeResponse>();
    installFetch({ patch: () => saveGate.promise });
    await renderLoaded();

    const nameInput = await makeDirty("Pending Name");
    const [firstSwitch] = screen.getAllByRole("switch");
    expect(nameInput.matches(":disabled")).toBe(false);
    expect(firstSwitch.matches(":disabled")).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));
    await waitFor(() => {
      expect(screen.getByText(messages.settings.saving)).toBeDefined();
    });
    expect(nameInput.matches(":disabled")).toBe(true);
    expect(firstSwitch.matches(":disabled")).toBe(true);

    saveGate.resolve(jsonResponse({}));
    await waitForSaveToSettle();
    // The refresh returned the stored key, and the panel is editable again.
    await waitFor(() => {
      expect(nameInput.value).toBe("Production Test Key");
    });
    expect(nameInput.matches(":disabled")).toBe(false);
  });

  it("expands every provider group once the catalog arrives for a key with selected models", async () => {
    const modelsGate = deferred<FakeResponse>();
    installFetch(
      { models: () => modelsGate.promise },
      { ...sampleKey, modelAccessMode: "restricted", allowedModels: ["openai/gpt-4o"] }
    );
    currentSearch = "tab=models";
    await renderLoaded();

    const modelButton = (id: string) =>
      screen.queryAllByTitle(id).find((element) => element.tagName === "BUTTON") ?? null;
    expect(modelButton("openai/gpt-4o-mini")).toBeNull();

    modelsGate.resolve(
      jsonResponse({
        data: [
          { id: "openai/gpt-4o", name: "GPT-4o", owned_by: "openai" },
          { id: "openai/gpt-4o-mini", name: "GPT-4o mini", owned_by: "openai" },
          { id: "anthropic/claude-3-5-sonnet", name: "Claude 3.5 Sonnet", owned_by: "claude" },
        ],
      })
    );

    await waitFor(() => {
      expect(modelButton("openai/gpt-4o-mini")).not.toBeNull();
      expect(modelButton("anthropic/claude-3-5-sonnet")).not.toBeNull();
    });

    // Only once: a group the user collapses afterwards stays collapsed.
    const openaiGroup = modelButton("openai/gpt-4o-mini")?.closest(".group");
    const expandToggle = openaiGroup?.querySelector("button");
    expect(expandToggle).toBeTruthy();
    fireEvent.click(expandToggle as HTMLButtonElement);
    await waitFor(() => {
      expect(modelButton("openai/gpt-4o-mini")).toBeNull();
    });
    expect(modelButton("anthropic/claude-3-5-sonnet")).not.toBeNull();
  });

  it("shows the model selection cap inline on the Models tab", async () => {
    installFetch(
      {},
      {
        ...sampleKey,
        modelAccessMode: "restricted",
        allowedModels: Array.from({ length: 501 }, (_, i) => `provider/model-${i}`),
      }
    );
    currentSearch = "tab=models";
    await renderLoaded();

    const panel = screen.getByRole("tabpanel");
    expect(within(panel).getByText("Cannot select more than 500 models")).toBeDefined();
    expect(
      within(screen.getByRole("tab", { name: /models/i })).getByText("1 validation error")
    ).toBeDefined();
  });

  // The vitest UI setup mocks next-intl globally with the real en.json and falls back to the bare
  // key for a missing message, so these assertions catch an absent catalog entry. That the
  // strings are not hardcoded is guarded in api-manager-page-static.test.ts.
  it("renders the page chrome from catalog entries", async () => {
    const saveGate = deferred<FakeResponse>();
    installFetch({ patch: () => saveGate.promise });

    await renderLoaded();

    expect(
      screen.getByRole("tablist", { name: messages.apiManager.accessEditorTabsLabel })
    ).toBeDefined();
    expect(screen.getByText(messages.apiManager.accessBreadcrumb)).toBeDefined();
    expect(screen.getByText(messages.settings.saved)).toBeDefined();

    await makeDirty();
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));
    await waitFor(() => {
      expect(screen.getByText(messages.settings.saving)).toBeDefined();
    });
    saveGate.resolve(jsonResponse({}));
    await waitForSaveToSettle();
  });
});
