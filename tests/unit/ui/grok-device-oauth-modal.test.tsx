// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: OAuthModal, formatDeviceCodeRemaining } =
  await import("@/shared/components/OAuthModal");

const roots: Array<{ root: ReturnType<typeof createRoot>; element: HTMLDivElement }> = [];

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

function renderModal(isOpen: boolean, reauthConnection?: { id: string }) {
  const element = document.createElement("div");
  document.body.appendChild(element);
  const root = createRoot(element);
  roots.push({ root, element });
  act(() => {
    root.render(
      <OAuthModal
        isOpen={isOpen}
        provider="grok-cli"
        providerInfo={{ name: "Grok Build" }}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
        reauthConnection={reauthConnection}
      />
    );
  });
  return { root, element };
}

describe("OAuthModal Grok Device Code", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-13T00:00:00Z"));
  });

  afterEach(() => {
    for (const { root, element } of roots.splice(0)) {
      act(() => root.unmount());
      element.remove();
    }
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("starts Browser Login, opens xAI, and renders code plus countdown", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
      if (String(input).includes("/device-code")) {
        return new Response(
          JSON.stringify({
            device_code: "opaque-device-code",
            user_code: "ABCD-EFGH",
            verification_uri: "https://accounts.x.ai/oauth2/device",
            verification_uri_complete: "https://accounts.x.ai/oauth2/device?user_code=ABCD-EFGH",
            expires_in: 1800,
            interval: 5,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ success: false, pending: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);
    const openMock = vi.spyOn(window, "open").mockImplementation(() => null);

    const { element } = renderModal(true, { id: "conn-existing" });
    await flushEffects();

    expect(fetchMock.mock.calls[0]?.[0].toString()).toContain("/api/oauth/grok-cli/device-code");
    expect(openMock).toHaveBeenCalledWith(
      "https://accounts.x.ai/oauth2/device?user_code=ABCD-EFGH",
      "oauth_verify"
    );
    expect(element.textContent).toContain("ABCD-EFGH");
    expect(element.textContent).toContain("30:00");
    expect(element.textContent).toContain("Browser Login");
    expect(element.textContent).toContain("JWT Token");
    expect(
      element.querySelector('a[href="https://accounts.x.ai/oauth2/device?user_code=ABCD-EFGH"]')
    ).toBeTruthy();
    expect(formatDeviceCodeRemaining(65)).toBe("1:05");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });
    const pollCall = fetchMock.mock.calls.find(([url]) => String(url).endsWith("/poll"));
    expect(pollCall).toBeTruthy();
    const pollBody = JSON.parse(String((pollCall?.[1] as RequestInit).body));
    expect(pollBody.connectionId).toBe("conn-existing");
  });

  it("cancels the old poll when the modal closes", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
      if (String(input).includes("/device-code")) {
        return new Response(
          JSON.stringify({
            device_code: "opaque-device-code",
            user_code: "ABCD-EFGH",
            verification_uri: "https://accounts.x.ai/oauth2/device",
            verification_uri_complete: "https://accounts.x.ai/oauth2/device?user_code=ABCD-EFGH",
            expires_in: 1800,
            interval: 5,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ success: false, pending: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(window, "open").mockImplementation(() => null);

    const { root, element } = renderModal(true);
    await flushEffects();
    act(() => {
      root.render(
        <OAuthModal
          isOpen={false}
          provider="grok-cli"
          providerInfo={{ name: "Grok Build" }}
          onClose={vi.fn()}
          onSuccess={vi.fn()}
        />
      );
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(6000);
    });

    const pollCalls = fetchMock.mock.calls.filter(([url]) => String(url).endsWith("/poll"));
    expect(pollCalls).toHaveLength(0);
    expect(element.textContent).toBe("");
  });
});
