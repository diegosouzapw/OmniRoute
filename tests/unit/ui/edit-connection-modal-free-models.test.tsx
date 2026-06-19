// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "openrouter" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: EditConnectionModal } = await import(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal"
);

const FREE_TOGGLE = 'button[role="switch"][aria-label="importFreeModelsOnlyLabel"]';

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: Record<string, unknown>) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <EditConnectionModal
        isOpen
        providerId={(props.providerId as string) || "openrouter"}
        onSave={async () => undefined}
        onClose={() => {}}
        {...(props as any)}
      />
    );
  });
  containers.push({ root, el });
  return el;
}

async function waitFor(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  vi.clearAllMocks();
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve({ ok: true, json: async () => ({}), text: async () => "" } as Response))
  );
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

describe("EditConnectionModal — import only free models", () => {
  it("shows the free-only toggle for a connection whose provider has free models", () => {
    const el = render({
      connection: { id: "conn-1", provider: "openrouter", providerSpecificData: {} },
    });
    expect(el.querySelector(FREE_TOGGLE)).toBeTruthy();
  });

  it("hides the free-only toggle for a provider without free models", () => {
    const el = render({
      providerId: "anthropic",
      connection: { id: "conn-2", provider: "anthropic", providerSpecificData: {} },
    });
    expect(el.querySelector(FREE_TOGGLE)).toBeNull();
  });

  it("reflects the persisted flag as initially checked", () => {
    const el = render({
      connection: {
        id: "conn-3",
        provider: "openrouter",
        providerSpecificData: { importFreeModelsOnly: true },
      },
    });
    expect(el.querySelector(FREE_TOGGLE)!.getAttribute("aria-checked")).toBe("true");
  });

  it("clears the flag (explicit false) and re-syncs when toggled off", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const onResyncModels = vi.fn().mockResolvedValue(undefined);
    const el = render({
      connection: {
        id: "conn-5",
        provider: "openrouter",
        name: "OR",
        providerSpecificData: { importFreeModelsOnly: true },
      },
      onSave,
      onResyncModels,
    });

    const toggle = el.querySelector<HTMLButtonElement>(FREE_TOGGLE)!;
    expect(toggle.getAttribute("aria-checked")).toBe("true");
    act(() => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const saveBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "save"
    )!;
    act(() => {
      saveBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitFor(() => onSave.mock.calls.length > 0);
    // Must be an explicit `false`, not `undefined` — otherwise the PUT merge keeps the old `true`.
    expect(onSave.mock.calls[0][0].providerSpecificData?.importFreeModelsOnly).toBe(false);
    await waitFor(() => onResyncModels.mock.calls.length > 0);
    expect(onResyncModels).toHaveBeenCalledWith("conn-5");
  });

  it("saves the flag and triggers a re-sync when toggled on", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const onResyncModels = vi.fn().mockResolvedValue(undefined);
    const el = render({
      connection: { id: "conn-4", provider: "openrouter", name: "OR", providerSpecificData: {} },
      onSave,
      onResyncModels,
    });

    const toggle = el.querySelector<HTMLButtonElement>(FREE_TOGGLE)!;
    act(() => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const saveBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "save"
    )!;
    act(() => {
      saveBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitFor(() => onSave.mock.calls.length > 0);
    const payload = onSave.mock.calls[0][0];
    expect(payload.providerSpecificData?.importFreeModelsOnly).toBe(true);

    await waitFor(() => onResyncModels.mock.calls.length > 0);
    expect(onResyncModels).toHaveBeenCalledWith("conn-4");
  });
});
