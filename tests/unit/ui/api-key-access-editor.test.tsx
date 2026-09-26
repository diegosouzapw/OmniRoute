// @vitest-environment jsdom

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../src/i18n/messages/en.json";
import ApiKeyAccessEditorClient from "../../../src/app/(dashboard)/dashboard/api-manager/[id]/access/ApiKeyAccessEditorClient";
import { useNotificationStore } from "../../../src/store/notificationStore";

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
};

let currentSearch = "";

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(currentSearch),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const sampleKey = {
  id: "test-key-id",
  name: "Production Test Key",
  key: "omni-test-12345678",
  modelAccessMode: "all",
  allowedModels: [],
  blockedModels: [],
  allowedCombos: [],
  allowedConnections: [],
  connectionAccessMode: "all",
  noLog: false,
  autoResolve: false,
  isActive: true,
  throttleDelayMs: 0,
  isBanned: false,
  expiresAt: null,
  maxSessions: 0,
  accessSchedule: null,
  rateLimits: null,
  scopes: ["manage", "self:usage"],
  allowedEndpoints: [],
  streamDefaultMode: "legacy",
  compressionEnabled: true,
  allowAutoCombos: true,
  catalogScope: "all",
  disableNonPublicModels: false,
  allowUsageCommand: false,
  usageLimitEnabled: false,
  dailyUsageLimitUsd: null,
  weeklyUsageLimitUsd: null,
  chaosModeEnabled: false,
};

describe("ApiKeyAccessEditorClient", () => {
  let patchCalls: Array<{ url: string; body: Record<string, unknown> }> = [];

  beforeEach(() => {
    patchCalls = [];
    currentSearch = "";
    vi.clearAllMocks();

    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init?: RequestInit) => {
        const urlStr = String(url);
        if (urlStr.includes("/api/keys/test-key-id") && init?.method === "PATCH") {
          const body = JSON.parse(String(init.body));
          patchCalls.push({ url: urlStr, body });
          return {
            ok: true,
            status: 200,
            json: async () => ({ message: "API key settings updated successfully" }),
          };
        }
        if (urlStr.includes("/api/keys/test-key-id")) {
          return {
            ok: true,
            status: 200,
            json: async () => sampleKey,
          };
        }
        if (urlStr.includes("/v1/models")) {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              data: [
                { id: "openai/gpt-4o", name: "GPT-4o", owned_by: "openai" },
                {
                  id: "anthropic/claude-3-5-sonnet",
                  name: "Claude 3.5 Sonnet",
                  owned_by: "claude",
                },
              ],
            }),
          };
        }
        if (urlStr.includes("/api/combos")) {
          return {
            ok: true,
            status: 200,
            json: async () => ({ combos: [{ name: "test-combo", isActive: true }] }),
          };
        }
        if (urlStr.includes("/api/providers")) {
          return {
            ok: true,
            status: 200,
            json: async () => ({ connections: [] }),
          };
        }
        return {
          ok: true,
          status: 200,
          json: async () => ({}),
        };
      })
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  function renderEditor() {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ApiKeyAccessEditorClient apiKeyId="test-key-id" />
      </NextIntlClientProvider>
    );
  }

  it("renders tabs and default general tab content", async () => {
    renderEditor();

    await waitFor(() => {
      expect(screen.getByRole("tablist")).toBeDefined();
    });

    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBe(6);

    // Verify accessible tab semantics
    const generalTab = screen.getByRole("tab", { name: /general/i });
    expect(generalTab.getAttribute("aria-selected")).toBe("true");

    const generalPanel = screen.getByRole("tabpanel");
    expect(generalPanel).toBeDefined();

    // Key Name input should be visible in general tab
    await waitFor(() => {
      expect(screen.getByDisplayValue("Production Test Key")).toBeDefined();
    });
  });

  it("switches tabs via click and via keyboard navigation", async () => {
    renderEditor();

    await waitFor(() => {
      expect(screen.getByRole("tablist")).toBeDefined();
    });

    const modelsTab = screen.getByRole("tab", { name: /models/i });
    fireEvent.click(modelsTab);

    expect(modelsTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("button", { name: /allow all/i })).toBeDefined();

    // Keyboard navigation from models tab
    // ArrowRight should move to Combos tab
    fireEvent.keyDown(modelsTab, { key: "ArrowRight" });
    const combosTab = screen.getByRole("tab", { name: /combos/i });
    expect(combosTab.getAttribute("aria-selected")).toBe("true");

    // ArrowLeft should move back to Models tab
    fireEvent.keyDown(combosTab, { key: "ArrowLeft" });
    expect(modelsTab.getAttribute("aria-selected")).toBe("true");

    // End key should jump to Behaviour tab
    fireEvent.keyDown(modelsTab, { key: "End" });
    const behaviourTab = screen.getByRole("tab", { name: /behaviour/i });
    expect(behaviourTab.getAttribute("aria-selected")).toBe("true");

    // Home key should jump to General tab
    fireEvent.keyDown(behaviourTab, { key: "Home" });
    const generalTab = screen.getByRole("tab", { name: /general/i });
    expect(generalTab.getAttribute("aria-selected")).toBe("true");
  });

  it("respects deep link ?tab=limits", async () => {
    currentSearch = "tab=limits";
    renderEditor();

    await waitFor(() => {
      expect(screen.getByRole("tablist")).toBeDefined();
    });

    const limitsTab = screen.getByRole("tab", { name: /limits/i });
    expect(limitsTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText(/Max Active Sessions/i)).toBeDefined();
  });

  it("dirty guard tracks unsaved state and enables save/discard buttons", async () => {
    renderEditor();

    await waitFor(() => {
      expect(screen.getByRole("tablist")).toBeDefined();
    });

    const saveButton = screen.getByRole("button", { name: /save changes/i });
    const discardButton = screen.getByRole("button", { name: /discard/i });

    // Initially clean -> buttons disabled
    expect(saveButton.hasAttribute("disabled")).toBe(true);
    expect(discardButton.hasAttribute("disabled")).toBe(true);

    // Edit key name
    const nameInput = await screen.findByDisplayValue("Production Test Key");
    fireEvent.change(nameInput, { target: { value: "Updated Key Name" } });

    // Now dirty -> buttons enabled
    expect(saveButton.hasAttribute("disabled")).toBe(false);
    expect(discardButton.hasAttribute("disabled")).toBe(false);

    // Click discard -> restores original name and disables buttons
    fireEvent.click(discardButton);
    expect((nameInput as HTMLInputElement).value).toBe("Production Test Key");
    expect(saveButton.hasAttribute("disabled")).toBe(true);
  });

  it("Save calls PATCH with the built payload", async () => {
    renderEditor();

    await waitFor(() => {
      expect(screen.getByRole("tablist")).toBeDefined();
    });

    const nameInput = await screen.findByDisplayValue("Production Test Key");
    fireEvent.change(nameInput, { target: { value: "New Patched Name" } });

    const saveButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(patchCalls.length).toBe(1);
    });

    expect(patchCalls[0].url).toContain("/api/keys/test-key-id");
    expect(patchCalls[0].body.name).toBe("New Patched Name");
    expect(patchCalls[0].body.modelAccessMode).toBe("all");
    expect(patchCalls[0].body.connectionAccessMode).toBe("all");
  });

  it("shows error toast on 4xx PATCH response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init?: RequestInit) => {
        const urlStr = String(url);
        if (urlStr.includes("/api/keys/test-key-id") && init?.method === "PATCH") {
          return {
            ok: false,
            status: 400,
            json: async () => ({
              error: { message: "Invalid key configuration" },
            }),
          };
        }
        if (urlStr.includes("/api/keys/test-key-id")) {
          return { ok: true, status: 200, json: async () => sampleKey };
        }
        return { ok: true, status: 200, json: async () => ({}) };
      })
    );

    const errorSpy = vi.spyOn(useNotificationStore.getState(), "error");

    renderEditor();

    await waitFor(() => {
      expect(screen.getByRole("tablist")).toBeDefined();
    });

    const nameInput = await screen.findByDisplayValue("Production Test Key");
    fireEvent.change(nameInput, { target: { value: "Trigger Error Name" } });

    const saveButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
