// @vitest-environment jsdom
//
// #5565 / #5567 — Providers without a live validator (e.g. lmarena session
// cookie, piapi API key) return `{ unsupported: true }` from
// /api/providers/validate. The modal previously treated that like a hard
// "Invalid" and blocked Save entirely, so the credential could never be added.
// "Validation not supported" must be a non-blocking warning: Save still persists
// the credential as-is.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddApiKeyModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal");

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: Record<string, unknown>) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <AddApiKeyModal isOpen onSave={async () => undefined} onClose={() => {}} {...(props as any)} />
    );
  });
  containers.push({ root, el });
  return el;
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function waitFor(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

beforeEach(() => {
  vi.clearAllMocks();
  // The validate endpoint reports the provider has no live validator (400 +
  // unsupported:true). Any other call (model lookups, etc.) succeeds.
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) => {
      if (String(url).includes("/api/providers/validate")) {
        return Promise.resolve({
          ok: false,
          json: () =>
            Promise.resolve({ error: "Provider validation not supported", unsupported: true }),
        } as Response);
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ valid: true }) } as Response);
    })
  );
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

describe("AddApiKeyModal — 'validation not supported' is a non-blocking warning (#5565/#5567)", () => {
  it("still calls onSave when /validate returns unsupported=true", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const el = render({ provider: "piapi", providerName: "PiAPI", onSave });

    const nameInput = el.querySelector<HTMLInputElement>('input[placeholder="productionKey"]')!;
    const apiKeyInput = el.querySelector<HTMLInputElement>('input[type="password"]')!;
    expect(apiKeyInput).toBeTruthy();
    setInputValue(nameInput, "My PiAPI");
    setInputValue(apiKeyInput, "piapi-secret-key");

    const saveBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "save"
    )!;
    expect(saveBtn).toBeTruthy();
    act(() => {
      saveBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // RED on pre-fix code: the modal ignored `unsupported`, set a save error and
    // returned without calling onSave. After the fix it proceeds to save.
    await waitFor(() => onSave.mock.calls.length > 0);
    expect(onSave).toHaveBeenCalled();
  });
});
