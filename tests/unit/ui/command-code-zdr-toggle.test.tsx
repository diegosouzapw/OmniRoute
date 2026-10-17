// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "command-code" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddApiKeyModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal");
const { default: EditConnectionModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal");

const ZDR_TOGGLE = 'button[role="switch"][aria-label="commandCodeZdrLabel"]';

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function mount(node: React.ReactElement) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(node));
  containers.push({ root, el });
  return el;
}

function renderAdd(props: Record<string, unknown>) {
  return mount(
    <AddApiKeyModal isOpen onSave={async () => undefined} onClose={() => {}} {...(props as any)} />
  );
}

function renderEdit(props: Record<string, unknown>) {
  return mount(
    <EditConnectionModal
      isOpen
      providerId={(props.providerId as string) || "command-code"}
      onSave={async () => undefined}
      onClose={() => {}}
      {...(props as any)}
    />
  );
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function click(el: Element) {
  act(() => {
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

function saveButton(el: HTMLElement) {
  return Array.from(el.querySelectorAll("button")).find((b) => b.textContent?.trim() === "save")!;
}

async function waitFor(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  vi.clearAllMocks();
  fetchMock = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ valid: true }),
      text: async () => "",
    } as Response)
  );
  vi.stubGlobal("fetch", fetchMock);
  vi.stubGlobal("localStorage", {
    getItem: () => null,
    setItem: () => undefined,
    removeItem: () => undefined,
    clear: () => undefined,
  });
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

function validateBodies() {
  return fetchMock.mock.calls
    .filter(([url]) => String(url) === "/api/providers/validate")
    .map(([, init]) => JSON.parse(String((init as RequestInit).body)));
}

describe("AddApiKeyModal — Command Code ZDR toggle", () => {
  it("renders the toggle only for Command Code, off by default", () => {
    const el = renderAdd({ provider: "command-code", providerName: "Command Code" });
    expect(el.querySelector(ZDR_TOGGLE)?.getAttribute("aria-checked")).toBe("false");
    const other = renderAdd({ provider: "openai", providerName: "OpenAI" });
    expect(other.querySelector(ZDR_TOGGLE)).toBeNull();
  });

  it("validates and saves with zdrEnabled when the toggle is on", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const el = renderAdd({ provider: "command-code", providerName: "Command Code", onSave });
    setInputValue(el.querySelector<HTMLInputElement>('input[placeholder="productionKey"]')!, "cc");
    setInputValue(el.querySelector<HTMLInputElement>('input[type="password"]')!, "user_cc_key");
    click(el.querySelector(ZDR_TOGGLE)!);
    click(saveButton(el));

    await waitFor(() => onSave.mock.calls.length > 0);
    expect(onSave.mock.calls[0][0].providerSpecificData?.zdrEnabled).toBe(true);
    expect(validateBodies()[0]).toMatchObject({ provider: "command-code", zdrEnabled: true });
  });

  it("does not send zdrEnabled when the toggle stays off", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const el = renderAdd({ provider: "command-code", providerName: "Command Code", onSave });
    setInputValue(el.querySelector<HTMLInputElement>('input[placeholder="productionKey"]')!, "cc");
    setInputValue(el.querySelector<HTMLInputElement>('input[type="password"]')!, "user_cc_key");
    click(saveButton(el));

    await waitFor(() => onSave.mock.calls.length > 0);
    expect(onSave.mock.calls[0][0].providerSpecificData ?? {}).not.toHaveProperty("zdrEnabled");
    expect(validateBodies()[0]).not.toHaveProperty("zdrEnabled");
  });
});

describe("EditConnectionModal — Command Code ZDR toggle", () => {
  it("reflects the persisted flag and is absent for other providers", () => {
    const el = renderEdit({
      connection: {
        id: "cc-1",
        provider: "command-code",
        authType: "apikey",
        providerSpecificData: { zdrEnabled: true },
      },
    });
    expect(el.querySelector(ZDR_TOGGLE)?.getAttribute("aria-checked")).toBe("true");
    const other = renderEdit({
      providerId: "openai",
      connection: { id: "oa-1", provider: "openai", authType: "apikey", providerSpecificData: {} },
    });
    expect(other.querySelector(ZDR_TOGGLE)).toBeNull();
  });

  it("saves an explicit false when turned off, keeping the other providerSpecificData keys", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const el = renderEdit({
      connection: {
        id: "cc-2",
        provider: "command-code",
        name: "CC",
        authType: "apikey",
        providerSpecificData: { zdrEnabled: true, customUserAgent: "ua/1.0", someFlag: "keep" },
      },
      onSave,
    });
    click(el.querySelector(ZDR_TOGGLE)!);
    click(saveButton(el));

    await waitFor(() => onSave.mock.calls.length > 0);
    const psd = onSave.mock.calls[0][0].providerSpecificData;
    expect(psd.zdrEnabled).toBe(false);
    expect(psd.customUserAgent).toBe("ua/1.0");
    expect(psd.someFlag).toBe("keep");
  });

  it("sends zdrEnabled on the validation probe when a new key is entered with ZDR on", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const el = renderEdit({
      connection: {
        id: "cc-3",
        provider: "command-code",
        name: "CC",
        authType: "apikey",
        providerSpecificData: {},
      },
      onSave,
    });
    click(el.querySelector(ZDR_TOGGLE)!);
    setInputValue(el.querySelector<HTMLInputElement>('input[placeholder="enterNewApiKey"]')!, "k2");
    click(saveButton(el));

    await waitFor(() => onSave.mock.calls.length > 0);
    expect(validateBodies()[0]).toMatchObject({ provider: "command-code", zdrEnabled: true });
    expect(onSave.mock.calls[0][0].providerSpecificData.zdrEnabled).toBe(true);
  });
});
