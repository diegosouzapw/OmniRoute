// @vitest-environment jsdom
//
// #5088 — When the inline credential "Check" fails, the modal showed only a bare
// "invalid" badge and threw away the detailed reason returned by
// /api/providers/validate. For claude-web/chatgpt-web the real cause is often an
// environment error (e.g. "TLS impersonation client failed to start: EACCES …"),
// which the backend already surfaces in `data.error` — but the UI hid it, so the
// reporter had to dig it out via a separate Provider Test. The detailed message
// must be shown next to the badge.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddApiKeyModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal");

const TLS_EACCES_ERROR =
  "TLS impersonation client failed to start: EACCES: permission denied, mkdir " +
  "'/usr/lib/node_modules/omniroute/dist/node_modules/tls-client-node/bin'. " +
  "Verify tls-client-node is installed and its native binary downloaded. " +
  "(claude-web requires this — without it, Cloudflare blocks every request)";

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
  // /api/providers/validate fails with the detailed TLS/EACCES reason; any other
  // call (e.g. model lookups) succeeds.
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) => {
      if (String(url).includes("/api/providers/validate")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ valid: false, error: TLS_EACCES_ERROR }),
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

describe("AddApiKeyModal — surfaces the detailed validation error (#5088)", () => {
  it("shows the underlying TLS/EACCES reason, not just an 'invalid' badge", async () => {
    const el = render({ provider: "claude-web", providerName: "Claude Web" });

    const apiKeyInput = el.querySelector<HTMLInputElement>('input[type="password"]')!;
    expect(apiKeyInput).toBeTruthy();
    setInputValue(apiKeyInput, "sk-ant-sid01-fake-session-key");

    // The validate ("check") button is the first button that follows the
    // credential input in DOM order (it sits right next to it).
    const checkBtn = Array.from(el.querySelectorAll("button")).find(
      (b) =>
        (apiKeyInput.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
    )!;
    expect(checkBtn).toBeTruthy();
    act(() => {
      checkBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // The full reason must reach the DOM — a bare "invalid" badge is not enough.
    await waitFor(() => el.textContent?.includes("EACCES: permission denied") ?? false);
    expect(el.textContent).toContain("TLS impersonation client failed to start");
  });
});
