// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Operator error-rules editor on the Cooldown Manager page: reads providerErrorRules /
// providerErrorDefaults from GET /api/settings and writes both back with PATCH /api/settings.

const CARD_PATH =
  "@/app/(dashboard)/dashboard/resilience/cooldowns/components/ProviderErrorRulesCard";

const STORED = {
  providerErrorRules: {
    openai: [{ match: "insufficient_quota", scope: "connection", cooldownMs: 3_600_000 }],
  },
  providerErrorDefaults: { openai: { cooldownMs: 18_000_000, scope: "connection" } },
};

const json = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status }));

const cleanupCallbacks: Array<() => void> = [];

async function renderCard() {
  const { default: ProviderErrorRulesCard } = await import(CARD_PATH);
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  cleanupCallbacks.push(() => {
    root.unmount();
    container.remove();
  });
  await act(async () => {
    root.render(React.createElement(ProviderErrorRulesCard));
  });
  await act(async () => {
    await Promise.resolve();
  });
  return container;
}

function buttonByText(container: HTMLElement, text: string): HTMLButtonElement | undefined {
  return [...container.querySelectorAll("button")].find((button) =>
    button.textContent?.includes(text)
  ) as HTMLButtonElement | undefined;
}

describe("ProviderErrorRulesCard", { timeout: 30_000 }, () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock = vi.fn((url: string, init?: RequestInit) => {
      if (url === "/api/settings" && init?.method === "PATCH") return json({ ok: true });
      if (url === "/api/settings") return json(STORED);
      return Promise.resolve(new Response("{}", { status: 404 }));
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("shows the stored rules and catch-all default", async () => {
    const container = await renderCard();
    const values = [...container.querySelectorAll("input")].map((input) => input.value);

    expect(container.textContent).toContain("Error cooldown rules");
    expect(values).toContain("openai");
    expect(values).toContain("insufficient_quota");
    expect(container.textContent).toContain("Default for unmatched failures");
  });

  it("saves both settings keys through PATCH /api/settings", async () => {
    const container = await renderCard();

    await act(async () => {
      buttonByText(container, "Save error rules")?.click();
    });

    const patch = fetchMock.mock.calls.find(
      ([url, init]) => url === "/api/settings" && init?.method === "PATCH"
    );
    expect(JSON.parse(String(patch?.[1]?.body))).toEqual(STORED);
  });

  it("blocks the save and flags a rule with neither status nor text", async () => {
    const container = await renderCard();

    await act(async () => {
      buttonByText(container, "Add rule")?.click();
    });
    await act(async () => {
      buttonByText(container, "Save error rules")?.click();
    });

    const patch = fetchMock.mock.calls.find(
      ([url, init]) => url === "/api/settings" && init?.method === "PATCH"
    );
    expect(patch).toBeUndefined();
    expect(container.textContent).toContain("Set an HTTP status, an error text, or both.");
    expect(container.textContent).toContain("Enter a provider.");
  });

  it("shows a load error when settings cannot be read", async () => {
    fetchMock.mockImplementation(() => json({}, 500));
    const container = await renderCard();

    expect(container.textContent).toContain("Couldn't load the error rules");
  });
});
