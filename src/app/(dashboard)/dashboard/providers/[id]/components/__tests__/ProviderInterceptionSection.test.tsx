// @vitest-environment jsdom
//
// Regression test for issue #12072 (second, smaller bug found while fixing
// the TinyCMS DOM-shim leak): fetchInterceptionToggles() used to call
// `await res.json()` without checking `res.ok` first, so a non-JSON error
// body (e.g. a plain-text 500 from the poisoned-SSR bug) surfaced as a raw
// `SyntaxError` inside the `interceptionLoadError` toast instead of a clean
// `HTTP <status>` message.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProviderInterceptionSection from "../ProviderInterceptionSection";

// Stable references: the component's load effect depends on `t` and `notify`,
// so a mock returning a fresh closure/object on every render would re-fire the
// effect after every setState (an infinite loop) instead of running once.
const stableTranslate = (key: string, values?: Record<string, string>) =>
  values ? `${key}:${JSON.stringify(values)}` : key;
vi.mock("next-intl", () => ({
  useTranslations: () => stableTranslate,
}));

const notifyError = vi.fn();
const stableNotify = { error: notifyError, success: vi.fn() };
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

describe("ProviderInterceptionSection (#12072)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    notifyError.mockClear();
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("surfaces a clean HTTP status message when GET returns a non-JSON 500 body", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.reject(new SyntaxError('Unexpected token \'I\', "Internal S"...')),
        } as unknown as Response)
      )
    );

    renderComponent(<ProviderInterceptionSection providerId="openai" />);
    await flush();

    expect(notifyError).toHaveBeenCalledTimes(1);
    const [message] = notifyError.mock.calls[0] as [string];
    expect(message).toContain("HTTP 500");
    expect(message).not.toContain("Unexpected token");
    expect(message).not.toContain("SyntaxError");
  });

  it("loads toggles normally when GET returns a valid JSON body", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ interceptSearch: true, interceptFetch: false }),
        } as unknown as Response)
      )
    );

    renderComponent(<ProviderInterceptionSection providerId="openai" />);
    await flush();

    expect(notifyError).not.toHaveBeenCalled();
  });
});
