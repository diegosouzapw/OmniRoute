import React from "react";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterAll, afterEach, beforeEach, expect, test, vi } from "vitest";
import en from "../../../src/i18n/messages/en.json";
import ptBr from "../../../src/i18n/messages/pt-BR.json";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-ui-13562-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "synthetic-catalog-ui-13562";

vi.unmock("next-intl");
vi.mock("@/app/(dashboard)/dashboard/settings/components/RoutingStrategyCard", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/QuotaPreflightCard", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/ComboDefaultsTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/ModelAliasesUnified", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/FallbackChainsEditor", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/RoutingTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/BackgroundDegradationTab", () => ({
  default: () => null,
}));
vi.mock("@/shared/components/ModelRoutingSection", () => ({ default: () => null }));
vi.mock("@/shared/components/routing/RoutingEntryLink", () => ({ default: () => null }));

const { default: SettingsRoutingPage } =
  await import("@/app/(dashboard)/dashboard/settings/routing/page");
const { NextIntlClientProvider } = await import("next-intl");
const fetchMock = vi.fn<typeof fetch>();
let stored = { hideAutoCombos: false, hideNoThinkVariants: false };
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const mount = (locale = "en") =>
  render(
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      messages={locale === "pt-BR" ? ptBr : en}
    >
      <SettingsRoutingPage />
    </NextIntlClientProvider>
  );
const autoSwitch = () => screen.getByRole("switch", { name: "Hide auto/*" });
const noThinkSwitch = () => screen.getByRole("switch", { name: "Hide no-think/*" });

beforeEach(() => {
  stored = { hideAutoCombos: false, hideNoThinkVariants: false };
  fetchMock.mockReset();
  fetchMock.mockImplementation(async (_url, options) => {
    if (options?.method === "PATCH") stored = { ...stored, ...JSON.parse(String(options.body)) };
    return reply(stored);
  });
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
afterAll(() => fs.rmSync(dataDir, { recursive: true, force: true }));

test("the routing settings page remains mounted", () => {
  const view = mount();
  expect(view.container.querySelector("p")?.textContent).toBeTruthy();
});

test("both catalog visibility switches are reachable and use persisted defaults", async () => {
  mount();
  await waitFor(() => expect(autoSwitch()).toHaveProperty("disabled", false));
  expect(autoSwitch().getAttribute("aria-checked")).toBe("false");
  expect(noThinkSwitch().getAttribute("aria-checked")).toBe("false");
});

test.each([
  ["hideAutoCombos", "Hide auto/*"],
  ["hideNoThinkVariants", "Hide no-think/*"],
] as const)("saves only %s and keeps it after a page reload", async (key, label) => {
  const view = mount();
  await waitFor(() =>
    expect(screen.getByRole("switch", { name: label })).toHaveProperty("disabled", false)
  );
  fireEvent.click(screen.getByRole("switch", { name: label }));
  await waitFor(() => expect(stored[key]).toBe(true));
  const patch = fetchMock.mock.calls.find(([, options]) => options?.method === "PATCH");
  expect(patch?.[0]).toBe("/api/settings");
  expect(JSON.parse(String(patch?.[1]?.body))).toEqual({ [key]: true });
  view.unmount();
  mount();
  await waitFor(() =>
    expect(screen.getByRole("switch", { name: label }).getAttribute("aria-checked")).toBe("true")
  );
});

test("a rejected save retains the stored value and shows an error", async () => {
  mount();
  await waitFor(() => expect(autoSwitch()).toHaveProperty("disabled", false));
  fetchMock.mockResolvedValueOnce(reply({ error: "rejected" }, 500));
  fireEvent.click(autoSwitch());
  await screen.findByRole("alert");
  expect(autoSwitch().getAttribute("aria-checked")).toBe("false");
  expect(stored.hideAutoCombos).toBe(false);
  expect(autoSwitch()).toHaveProperty("disabled", false);
});

test("a failed load cannot write guessed defaults and can be retried", async () => {
  fetchMock.mockResolvedValueOnce(reply({}, 500));
  mount();
  await screen.findByRole("alert");
  expect(autoSwitch()).toHaveProperty("disabled", true);
  fireEvent.click(autoSwitch());
  expect(fetchMock.mock.calls.some(([, options]) => options?.method === "PATCH")).toBe(false);
  fireEvent.click(screen.getByRole("button", { name: "Retry" }));
  await waitFor(() => expect(autoSwitch()).toHaveProperty("disabled", false));
});

test("both switches stay disabled while a save is pending", async () => {
  mount();
  await waitFor(() => expect(autoSwitch()).toHaveProperty("disabled", false));
  let complete!: (response: Response) => void;
  fetchMock.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        complete = resolve;
      })
  );
  fireEvent.click(autoSwitch());
  expect(autoSwitch()).toHaveProperty("disabled", true);
  expect(noThinkSwitch()).toHaveProperty("disabled", true);
  fireEvent.click(noThinkSwitch());
  expect(fetchMock.mock.calls.filter(([, options]) => options?.method === "PATCH")).toHaveLength(1);
  complete(reply({ hideAutoCombos: true, hideNoThinkVariants: false }));
  await waitFor(() => expect(autoSwitch()).toHaveProperty("disabled", false));
  expect(autoSwitch().getAttribute("aria-checked")).toBe("true");
});

test("catalog labels and the visibility-only explanation use the selected locale", async () => {
  mount("pt-BR");
  const auto = await screen.findByRole("switch", { name: `${ptBr.common.hide} auto/*` });
  await waitFor(() => expect(auto).toHaveProperty("disabled", false));
  expect(screen.getByRole("switch", { name: `${ptBr.common.hide} no-think/*` })).toBeTruthy();
  expect(screen.getByText(ptBr.settings.catalogVisibilityHint)).toBeTruthy();
  expect(screen.queryByText(en.settings.catalogVisibilityHint)).toBeNull();
});
