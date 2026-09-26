// @vitest-environment jsdom
//
// ProviderCliVersionSection: renders only for the claude/codex identity presets,
// surfaces which layer the advertised version came from, and drives the
// save/reset flow against /api/settings/cli-versions.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProviderCliVersionSection from "../ProviderCliVersionSection";
import ProviderExtraPanels from "../ProviderExtraPanels";

// Registration is tested through the real ProviderExtraPanels, so its sibling
// panels are stubbed out and only this card can contribute text.
vi.mock("../ProviderPlaygroundPanel", () => ({ default: () => null }));
vi.mock("../ProviderParamFilterSection", () => ({ default: () => null }));
vi.mock("../ProviderInterceptionSection", () => ({ default: () => null }));
vi.mock("../ProviderCcAliasSection", () => ({ default: () => null }));

// Stable references: the load effect depends on `t` and `notify`, so a mock
// returning a fresh closure/object on every render would re-fire the effect
// after every setState (an infinite loop) instead of running once. `t` has no
// `has`, so providerText() takes its literal fallback path and the assertions
// can match real English copy.
const stableTranslate = (key: string, values?: Record<string, string>) =>
  values ? `${key}:${JSON.stringify(values)}` : key;
vi.mock("next-intl", () => ({
  useTranslations: () => stableTranslate,
}));

const notifyError = vi.fn();
const notifySuccess = vi.fn();
const stableNotify = { error: notifyError, success: notifySuccess };
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => stableNotify,
}));

const cleanups: Array<() => void> = [];

function renderComponent(node: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(node));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container;
}

async function flush() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response;
}

const CLAUDE_ROW = {
  key: "claude",
  version: null,
  effective: "2.1.258",
  source: "default",
  pinned: "2.1.258",
};

/** React controlled inputs need the native value setter plus an `input` event. */
function typeInto(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  act(() => {
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function clickButton(container: HTMLElement, label: string) {
  const button = Array.from(container.querySelectorAll("button")).find(
    (el) => el.textContent === label
  );
  if (!button) throw new Error(`no button labelled ${label}`);
  act(() => button.click());
}

function stubGet(row: Record<string, unknown>) {
  return vi.fn((url: unknown) => {
    expect(String(url)).toBe("/api/settings/cli-versions");
    return Promise.resolve(jsonResponse({ items: [row] }));
  });
}

describe("ProviderCliVersionSection", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    notifyError.mockClear();
    notifySuccess.mockClear();
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("renders nothing for a provider with no override support and never fetches", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const container = renderComponent(<ProviderCliVersionSection providerId="openai" />);
    await flush();

    expect(container.textContent).toBe("");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows the effective version, which layer won, and the Claude billing caveat", async () => {
    vi.stubGlobal("fetch", stubGet(CLAUDE_ROW));

    const container = renderComponent(<ProviderCliVersionSection providerId="claude" />);
    await flush();

    const text = container.textContent ?? "";
    expect(text).toContain("Advertised CLI client version");
    expect(text).toContain("2.1.258");
    expect(text).toContain("Resolved from: captured default");
    expect(text).toContain("Captured default: 2.1.258");
    expect(text).toContain("Billing caveat");
  });

  it("renders the Codex card with the caller-forwarding caveat", async () => {
    vi.stubGlobal(
      "fetch",
      stubGet({ key: "codex", version: null, effective: "0.155.0", source: "default", pinned: "0.155.0" })
    );

    const container = renderComponent(<ProviderCliVersionSection providerId="codex" />);
    await flush();

    const text = container.textContent ?? "";
    expect(text).toContain("0.155.0");
    expect(text).toContain("gpt-6-astra");
    expect(text).toContain("Inference caveat");
  });

  it("PUTs only this provider's key on save and re-reads the resolved status", async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    vi.stubGlobal(
      "fetch",
      vi.fn((url: unknown, init?: RequestInit) => {
        calls.push({ url: String(url), init });
        const saved = calls.some((c) => c.init?.method === "PUT");
        return Promise.resolve(
          jsonResponse({
            items: [
              {
                ...CLAUDE_ROW,
                version: saved ? "2.1.260" : null,
                effective: saved ? "2.1.260" : "2.1.258",
                source: saved ? "settings" : "default",
              },
            ],
          })
        );
      })
    );

    const container = renderComponent(<ProviderCliVersionSection providerId="claude" />);
    await flush();

    const input = container.querySelector("input");
    if (!(input instanceof HTMLInputElement)) throw new Error("expected a version input");
    typeInto(input, "2.1.260");
    clickButton(container, "Save");
    await flush();

    const put = calls.find((c) => c.init?.method === "PUT");
    if (!put?.init) throw new Error("a PUT should have been issued");
    expect(put.init.body).toBe(JSON.stringify({ claude: "2.1.260" }));
    expect(notifyError).not.toHaveBeenCalled();
    // Save re-reads, so the card now reports the dashboard override as the source.
    expect(container.textContent).toContain("Resolved from: dashboard override");
    expect(container.textContent).toContain("2.1.260");
  });

  it("clears the override with a null body when Reset is clicked", async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    vi.stubGlobal(
      "fetch",
      vi.fn((url: unknown, init?: RequestInit) => {
        calls.push({ url: String(url), init });
        const cleared = calls.some((c) => c.init?.method === "PUT");
        return Promise.resolve(
          jsonResponse({
            items: [
              {
                ...CLAUDE_ROW,
                version: cleared ? null : "2.1.260",
                effective: cleared ? "2.1.258" : "2.1.260",
                source: cleared ? "default" : "settings",
              },
            ],
          })
        );
      })
    );

    const container = renderComponent(<ProviderCliVersionSection providerId="claude" />);
    await flush();

    clickButton(container, "Reset to default");
    await flush();

    const put = calls.find((c) => c.init?.method === "PUT");
    if (!put?.init) throw new Error("a PUT should have been issued");
    expect(put.init.body).toBe(JSON.stringify({ claude: null }));
    expect(container.textContent).toContain("Resolved from: captured default");
  });

  it("reports a load failure as a clean message, not a hung skeleton", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.reject(new SyntaxError('Unexpected token I, "Internal S"')),
        } as unknown as Response)
      )
    );

    const container = renderComponent(<ProviderCliVersionSection providerId="claude" />);
    await flush();

    expect(notifyError).toHaveBeenCalledTimes(1);
    const [message] = notifyError.mock.calls[0] as [string];
    expect(message).toContain("HTTP 500");
    expect(message).not.toContain("SyntaxError");
    expect(container.textContent).toContain("Could not load the current CLI version settings.");
  });

  it("is registered in ProviderExtraPanels, and only for claude/codex", async () => {
    vi.stubGlobal("fetch", stubGet(CLAUDE_ROW));

    const claudeBox = renderComponent(<ProviderExtraPanels providerId="claude" />);
    await flush();
    expect(claudeBox.textContent).toContain("Advertised CLI client version");

    const codexBox = renderComponent(<ProviderExtraPanels providerId="codex" />);
    await flush();
    expect(codexBox.textContent).toContain("Advertised CLI client version");

    const otherBox = renderComponent(<ProviderExtraPanels providerId="openai" />);
    await flush();
    expect(otherBox.textContent).not.toContain("Advertised CLI client version");
  });

  it("disables Save until the draft differs, and Reset when nothing is overridden", async () => {
    vi.stubGlobal("fetch", stubGet(CLAUDE_ROW));
    const container = renderComponent(<ProviderCliVersionSection providerId="claude" />);
    await flush();

    const [save, reset] = Array.from(container.querySelectorAll("button"));
    expect(save?.disabled, "Save must be inert while the draft is unchanged").toBe(true);
    expect(reset?.disabled, "Reset must be inert with no override to clear").toBe(true);

    const input = container.querySelector("input");
    if (!(input instanceof HTMLInputElement)) throw new Error("expected a version input");
    typeInto(input, "2.1.260");
    expect(save?.disabled, "typing a new value must arm Save").toBe(false);
  });

  it("submits on Enter in the version input", async () => {
    const calls: Array<{ init?: RequestInit }> = [];
    let saved = false;
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: unknown, init?: RequestInit) => {
        if (init?.method === "PUT") saved = true;
        calls.push({ init });
        return Promise.resolve(
          jsonResponse({
            items: [
              {
                ...CLAUDE_ROW,
                version: saved ? "2.1.260" : null,
                effective: saved ? "2.1.260" : "2.1.258",
                source: saved ? "settings" : "default",
              },
            ],
          })
        );
      })
    );

    const container = renderComponent(<ProviderCliVersionSection providerId="claude" />);
    await flush();

    const input = container.querySelector("input");
    if (!(input instanceof HTMLInputElement)) throw new Error("expected a version input");
    typeInto(input, "2.1.260");
    // Let React commit the draft before the key event, and mark it cancelable
    // because the handler calls preventDefault().
    await flush();
    await act(async () => {
      input.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true })
      );
    });
    await flush();

    const put = calls.find((c) => c.init?.method === "PUT");
    if (!put?.init) throw new Error("Enter should have submitted the override");
    expect(put.init.body).toBe(JSON.stringify({ claude: "2.1.260" }));
  });

  it("keeps the draft and reports the error when a save fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: unknown, init?: RequestInit) =>
        Promise.resolve(
          init?.method === "PUT"
            ? jsonResponse({ error: "upstream rejected it" }, 400)
            : jsonResponse({ items: [CLAUDE_ROW] })
        )
      )
    );

    const container = renderComponent(<ProviderCliVersionSection providerId="claude" />);
    await flush();

    const input = container.querySelector("input");
    if (!(input instanceof HTMLInputElement)) throw new Error("expected a version input");
    typeInto(input, "2.1.260");
    clickButton(container, "Save");
    await flush();

    expect(notifyError).toHaveBeenCalledTimes(1);
    expect(input.value, "a failed save must not discard what the operator typed").toBe("2.1.260");
  });

  it("shows the skeleton until the load settles, not a half-drawn card", async () => {
    let release: (value: unknown) => void = () => {};
    const gate = new Promise((resolve) => {
      release = resolve;
    });
    vi.stubGlobal("fetch", vi.fn(() => gate.then(() => jsonResponse({ items: [CLAUDE_ROW] }))));

    const container = renderComponent(<ProviderCliVersionSection providerId="claude" />);
    expect(container.querySelector(".animate-pulse"), "skeleton expected").toBeTruthy();
    expect(container.textContent).toBe("");

    await act(async () => {
      release(undefined);
      await gate;
    });
    await flush();
    expect(container.textContent).toContain("Advertised CLI client version");
  });
});
