// @vitest-environment jsdom
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../src/i18n/messages/en.json";
import ReasoningRoutingRules from "../../../src/shared/components/ReasoningRoutingRules";
import RoutingPageClient from "../../../src/app/(dashboard)/dashboard/api-manager/routing/RoutingPageClient";

vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams() }));

const savedRule = {
  id: "rule",
  name: "Luna low",
  description: "",
  scope: "apiKey",
  apiKeyId: "key",
  comboId: null,
  connectionId: null,
  modelPattern: "gpt-5.6-luna",
  sourceEffort: "any",
  requestTags: ["coding"],
  tagMatchMode: "all",
  effortMode: "force",
  targetEffort: "low",
  targetKind: "keep",
  targetModel: null,
  targetComboId: null,
  budgetAction: "preserve",
  budgetTokens: null,
  priority: 7,
  enabled: true,
};

function setup(options: { failLoad?: boolean; failSave?: boolean } = {}) {
  const writes: Record<string, unknown>[] = [];
  let rules = [savedRule];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      if (url.includes("/reasoning-routing-rules") && init?.method === "PATCH") {
        const payload = JSON.parse(String(init.body));
        writes.push(payload);
        if (options.failSave) return { ok: false, json: async () => ({ error: "Save failed" }) };
        rules = [{ ...savedRule, ...payload }];
        return { ok: true, json: async () => ({ success: true }) };
      }
      const data =
        url === "/api/keys"
          ? {
              keys: [
                { id: "key", name: "Example key" },
                { id: "second", name: "Second key" },
              ],
            }
          : url === "/api/combos"
            ? { combos: [{ id: "combo-id", name: "gpt-5.6-luna-combo" }] }
            : url === "/api/providers"
              ? { connections: [] }
              : url === "/api/models/catalog"
                ? { catalog: { codex: { models: [{ id: "gpt-5.6-luna" }] } } }
                : { rules };
      return { ok: !options.failLoad, json: async () => data };
    })
  );
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ReasoningRoutingRules initialApiKeyId="key" />
    </NextIntlClientProvider>
  );
  return writes;
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("isolated routing editor", () => {
  it("uses the full dashboard width without a centered maximum-width wrapper", async () => {
    setup();
    cleanup();
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RoutingPageClient />
      </NextIntlClientProvider>
    );
    await screen.findByText("Luna low");
    const classes = Array.from(container.firstElementChild!.classList);
    expect(classes).toContain("w-full");
    expect(classes).toContain("min-w-0");
    expect(classes.some((name) => name.startsWith("max-w-") || name === "mx-auto")).toBe(false);
  });

  it("round-trips existing patterns and advanced values without changing routing semantics", async () => {
    const writes = setup();
    fireEvent.click(await screen.findByRole("button", { name: "Edit" }));
    expect(
      (
        screen.getByRole("textbox", {
          name: "Exact request ID or pattern",
          exact: true,
        }) as HTMLInputElement
      ).value
    ).toBe(savedRule.modelPattern);
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
    await waitFor(() => expect(writes).toHaveLength(1));
    expect(writes[0]).toMatchObject({
      modelPattern: savedRule.modelPattern,
      requestTags: ["coding"],
      priority: 7,
      tagMatchMode: "all",
      effortMode: "force",
      targetEffort: "low",
      scope: "apiKey",
      apiKeyId: "key",
    });
  });

  it("stores a selected source combo NAME while keeping the key scope", async () => {
    const writes = setup();
    fireEvent.click(await screen.findByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText("Match requests for"), { target: { value: "combo" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Source combo" }), {
      target: { value: "gpt-5.6-luna-combo" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
    await waitFor(() => expect(writes).toHaveLength(1));
    expect(writes[0]).toMatchObject({
      modelPattern: "gpt-5.6-luna-combo",
      comboId: null,
      scope: "apiKey",
      apiKeyId: "key",
    });
  });

  it("keeps a dirty draft on failed save and blocks the saved-rule simulator", async () => {
    setup({ failSave: true });
    fireEvent.click(await screen.findByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Name", exact: true }), {
      target: { value: "Changed draft" },
    });
    expect(
      (screen.getByRole("button", { name: "Simulate without upstream" }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
    await screen.findByText("Save failed");
    expect(
      (screen.getByRole("textbox", { name: "Name", exact: true }) as HTMLInputElement).value
    ).toBe("Changed draft");
  });

  it("asks before changing keys when the editor contains unsaved changes", async () => {
    setup();
    fireEvent.click(await screen.findByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Name", exact: true }), {
      target: { value: "Changed draft" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "API key" }), {
      target: { value: "second" },
    });
    expect(screen.getByRole("dialog")).not.toBeNull();
    fireEvent.click(screen.getByRole("dialog").querySelector("button")!);
    expect((screen.getByRole("combobox", { name: "API key" }) as HTMLSelectElement).value).toBe(
      "key"
    );
  });

  it("does not offer writes after a failed configuration load", async () => {
    setup({ failLoad: true });
    await screen.findByRole("alert");
    expect((screen.getByRole("button", { name: "New rule" }) as HTMLButtonElement).disabled).toBe(
      true
    );
    expect(screen.queryByRole("button", { name: "Edit" })).toBeNull();
  });
});
