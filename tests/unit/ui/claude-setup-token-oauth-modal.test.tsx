// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const MESSAGES = vi.hoisted<Record<string, string>>(() => ({
  tabBrowserLogin: "Browser Login",
  tabPasteSetupToken: "Setup Token",
  claudeSetupTokenDescription: "Run `claude setup-token` and paste the token.",
  claudeSetupTokenPlaceholder: "sk-ant-oat01-...",
  apiKeyTokenLabel: "API Key / Token",
  saveConnection: "Save Connection",
  saving: "Saving…",
  cancel: "Cancel",
}));

vi.mock("next-intl", () => ({
  useTranslations: () =>
    Object.assign((key: string) => MESSAGES[key] ?? key, {
      rich: (key: string) => MESSAGES[key] ?? key,
    }),
}));

const { default: OAuthModal } = await import("@/shared/components/OAuthModal");

const SETUP_TOKEN = "sk-ant-oat01-ui-test-token";
const roots: Array<{ root: ReturnType<typeof createRoot>; element: HTMLDivElement }> = [];

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

function renderClaudeModal(onSuccess = vi.fn()) {
  const element = document.createElement("div");
  document.body.appendChild(element);
  const root = createRoot(element);
  roots.push({ root, element });
  const render = (isOpen: boolean) =>
    act(() => {
      root.render(
        <OAuthModal
          isOpen={isOpen}
          provider="claude"
          providerInfo={{ name: "Claude Code" }}
          onClose={vi.fn()}
          onSuccess={onSuccess}
        />
      );
    });
  render(true);
  return { onSuccess, render };
}

function button(label: string) {
  return [...document.querySelectorAll("button")].find((b) => b.textContent === label);
}

function tokenInput() {
  return document.querySelector<HTMLInputElement>('input[placeholder="sk-ant-oat01-..."]');
}

function typeInto(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  act(() => {
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

describe("OAuthModal Claude Code setup-token", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let openMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("/import-token")) {
        return new Response(JSON.stringify({ success: true, connection: { id: "c1" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ authUrl: "https://claude.ai/oauth/authorize" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    openMock = vi.fn(() => null);
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("open", openMock);
  });

  afterEach(() => {
    for (const { root, element } of roots.splice(0)) {
      act(() => root.unmount());
      element.remove();
    }
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("OAuthModal_OpenForClaude_ShowsSetupTokenFormWithoutStartingOAuth", async () => {
    renderClaudeModal();
    await flushEffects();

    expect(tokenInput()).not.toBeNull();
    expect(document.body.textContent).toContain("claude setup-token");
    expect(button("Browser Login")).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(openMock).not.toHaveBeenCalled();
  });

  it("OAuthModal_SaveSetupToken_PostsTokenToImportEndpoint", async () => {
    const { onSuccess } = renderClaudeModal();
    await flushEffects();

    typeInto(tokenInput() as HTMLInputElement, `  ${SETUP_TOKEN}  `);
    await act(async () => {
      button("Save Connection")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/oauth/claude/import-token");
    expect(JSON.parse(String(init.body))).toEqual({ token: SETUP_TOKEN });
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("OAuthModal_ClickBrowserLogin_StartsOAuthFlowOnlyThen", async () => {
    renderClaudeModal();
    await flushEffects();
    expect(fetchMock).not.toHaveBeenCalled();

    await act(async () => {
      button("Browser Login")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();

    expect(fetchMock.mock.calls.some(([u]) => String(u).includes("/api/oauth/claude/"))).toBe(true);
    expect(tokenInput()).toBeNull();
  });

  it("OAuthModal_ReopenAfterSuccessfulImport_ShowsEmptySetupTokenForm", async () => {
    const { render } = renderClaudeModal();
    await flushEffects();
    typeInto(tokenInput() as HTMLInputElement, SETUP_TOKEN);
    await act(async () => {
      button("Save Connection")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();
    expect(tokenInput()).toBeNull();

    render(false);
    render(true);
    await flushEffects();

    expect(tokenInput()?.value).toBe("");
    expect(openMock).not.toHaveBeenCalled();
  });
});
