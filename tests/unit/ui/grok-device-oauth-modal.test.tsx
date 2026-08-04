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
    expect(element.textContent).toContain("Import auth.json");
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

  // #7013 rework coexistence guard: device_code (#7358) and the browser PKCE
  // login (#7013) must BOTH be reachable from the same modal instance via the
  // "Device Code" / "Browser Login" tabs, instead of one flow replacing the
  // other.
  it("lets the user switch to Browser Login, then back to Device Code", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/device-code")) {
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
      if (url.includes("/start-callback-server")) {
        return new Response(
          JSON.stringify({
            authUrl: "https://auth.x.ai/oauth2/authorize?client_id=test&code_challenge=abc",
            codeVerifier: "verifier-123",
            redirectUri: "http://127.0.0.1:56122/callback",
            serverPort: 56122,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      if (url.includes("/poll-callback")) {
        return new Response(JSON.stringify({ success: false, pending: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ success: false, pending: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);
    const openMock = vi.spyOn(window, "open").mockImplementation(() => null);

    const { element } = renderModal(true);
    await flushEffects();

    // Default: device_code flow started first (matches the #7358 test above).
    expect(fetchMock.mock.calls[0]?.[0].toString()).toContain("/api/oauth/grok-cli/device-code");
    expect(element.textContent).toContain("Device Code");
    expect(element.textContent).toContain("Browser Login");
    expect(element.textContent).toContain("Import auth.json");

    const findButton = (label: string) =>
      Array.from(element.querySelectorAll("button")).find((b) => b.textContent === label);

    const browserLoginButton = findButton("Browser Login");
    expect(browserLoginButton).toBeTruthy();

    await act(async () => {
      browserLoginButton!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();

    // Clicking "Browser Login" must dispatch the PKCE callback-server path,
    // not another device-code request.
    const callbackServerCall = fetchMock.mock.calls.find(([url]) =>
      String(url).includes("/start-callback-server")
    );
    expect(callbackServerCall).toBeTruthy();
    expect(openMock).toHaveBeenCalledWith(
      expect.stringContaining("https://auth.x.ai/oauth2/authorize"),
      "oauth_auth"
    );

    // Switching back to "Device Code" must re-issue a device-code request.
    const deviceCodeCallsBefore = fetchMock.mock.calls.filter(([url]) =>
      String(url).includes("/device-code")
    ).length;

    const deviceCodeButton = findButton("Device Code");
    expect(deviceCodeButton).toBeTruthy();

    await act(async () => {
      deviceCodeButton!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();

    const deviceCodeCallsAfter = fetchMock.mock.calls.filter(([url]) =>
      String(url).includes("/device-code")
    ).length;
    expect(deviceCodeCallsAfter).toBeGreaterThan(deviceCodeCallsBefore);
  });
});

// #7610: the "Import auth.json" paste path must require the FULL ~/.grok/auth.json
// object (including refresh_token), not just the bare JWT "key" — otherwise the
// created connection can never auto-refresh and dies at expiry. These tests drive
// parseGrokCliPasteToken() behaviorally through the rendered component instead of
// regex-matching the component source, so they actually catch regressions in the
// branching logic (bare JWT, auth.json missing refresh_token, multiple auth.json
// entries, valid full auth.json).
describe("OAuthModal Grok Build paste-import auth.json (#7610)", () => {
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

  function enterPasteMode(fetchMock: ReturnType<typeof vi.fn>) {
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(window, "open").mockImplementation(() => null);
    const { element } = renderModal(true);
    const importButton = Array.from(element.querySelectorAll("button")).find(
      (b) => b.textContent === "Import auth.json"
    );
    expect(importButton).toBeTruthy();
    act(() => {
      importButton!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const textarea = element.querySelector('textarea[aria-label="Grok Build auth.json"]');
    expect(textarea).toBeTruthy();
    const saveButton = Array.from(element.querySelectorAll("button")).find(
      (b) => b.textContent === "Save Connection" || b.textContent === "Saving…"
    );
    expect(saveButton).toBeTruthy();
    return { element, textarea: textarea as HTMLTextAreaElement, saveButton: saveButton! };
  }

  function setPasteValue(textarea: HTMLTextAreaElement, value: string) {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    )!.set!;
    setter.call(textarea, value);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  }

  it("rejects a bare Grok JWT paste with the #7610 guidance message", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    const { element, textarea, saveButton } = enterPasteMode(fetchMock);

    act(() => {
      setPasteValue(textarea, "eyJhbGciOiJIUzI1NiJ9.bare.jwt");
    });
    await flushEffects();

    act(() => {
      saveButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();

    expect(element.textContent).toContain(
      'Do not paste only the JWT "key" field'
    );
    // No import-token request should have been fired — validation must short-circuit.
    expect(
      fetchMock.mock.calls.some(([url]) => String(url).includes("/import-token"))
    ).toBe(false);
  });

  it("rejects a full auth.json missing refresh_token", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    const { element, textarea, saveButton } = enterPasteMode(fetchMock);

    const authJsonNoRefresh = JSON.stringify({
      "https://auth.x.ai::clientId": { key: "eyJhbGciOiJIUzI1NiJ9.no.refresh" },
    });
    act(() => {
      setPasteValue(textarea, authJsonNoRefresh);
    });
    await flushEffects();

    act(() => {
      saveButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();

    expect(element.textContent).toContain("auth.json is missing refresh_token");
    expect(
      fetchMock.mock.calls.some(([url]) => String(url).includes("/import-token"))
    ).toBe(false);
  });

  it("accepts a valid full auth.json and POSTs the parsed object to import-token", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input).includes("/import-token")) {
        expect(init?.method).toBe("POST");
        const body = JSON.parse(String(init?.body));
        expect(body.token).toEqual(validAuthJson);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
      return new Response(JSON.stringify({ success: false, pending: true }), { status: 200 });
    });
    const validAuthJson = {
      "https://auth.x.ai::clientId": {
        key: "eyJhbGciOiJIUzI1NiJ9.valid.jwt",
        refresh_token: "refresh-abc-123",
      },
    };
    const { element, textarea, saveButton } = enterPasteMode(fetchMock);

    act(() => {
      setPasteValue(textarea, JSON.stringify(validAuthJson));
    });
    await flushEffects();

    act(() => {
      saveButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();

    expect(
      fetchMock.mock.calls.some(([url]) => String(url).includes("/import-token"))
    ).toBe(true);
    expect(element.textContent).not.toContain("auth.json is missing refresh_token");
    expect(element.textContent).not.toContain('Do not paste only the JWT "key"');
  });

  it("accepts a multi-entry auth.json where refresh_token lives on a different entry than the first JWT key", async () => {
    // Real ~/.grok/auth.json nests credentials per-endpoint; parseGrokCliPasteToken()
    // scans ALL entries and only requires that SOME entry carrying a JWT also carry
    // a refresh_token — it must not reject just because the first entry lacks one.
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input).includes("/import-token")) {
        const body = JSON.parse(String(init?.body));
        expect(body.token).toEqual(multiEntry);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
      return new Response(JSON.stringify({ success: false, pending: true }), { status: 200 });
    });
    const multiEntry = {
      "https://auth.x.ai::clientId": {
        key: "eyJhbGciOiJIUzI1NiJ9.no.refresh.here",
      },
      "https://auth.x.ai::otherClientId": {
        key: "eyJhbGciOiJIUzI1NiJ9.has.refresh",
        refresh_token: "refresh-xyz-789",
      },
    };
    const { element, textarea, saveButton } = enterPasteMode(fetchMock);

    act(() => {
      setPasteValue(textarea, JSON.stringify(multiEntry));
    });
    await flushEffects();

    act(() => {
      saveButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();

    expect(element.textContent).not.toContain("auth.json is missing refresh_token");
    expect(
      fetchMock.mock.calls.some(([url]) => String(url).includes("/import-token"))
    ).toBe(true);
  });
});
