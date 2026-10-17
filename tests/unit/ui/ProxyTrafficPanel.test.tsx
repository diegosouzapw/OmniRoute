import React from "react";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, expect, it, vi } from "vitest";
import ProxyTrafficPanel from "../../../src/app/(dashboard)/dashboard/settings/components/proxy/ProxyTrafficPanel";
import { deepMergeFallback } from "../../../src/i18n/request";
import en from "../../../src/i18n/messages/en.json";
import de from "../../../src/i18n/messages/de.json";

vi.unmock("next-intl");

const counters = {
  attempts: 1,
  uploadBytes: 6,
  downloadBytes: 2,
  knownUploadAttempts: 1,
  completedDownloads: 0,
  failedAttempts: 0,
  cancelledDownloads: 1,
  erroredDownloads: 0,
};
const report = {
  items: [
    {
      ...counters,
      key: "registry:fixture",
      proxyId: "fixture",
      kind: "registry",
      name: "Fixture proxy",
    },
    { ...counters, key: "direct", proxyId: null, kind: "direct", uploadBytes: 4 },
  ],
  total: { ...counters, attempts: 2, uploadBytes: 10 },
  proxied: counters,
  direct: { ...counters, uploadBytes: 4 },
  unattributed: { ...counters, attempts: 0 },
  persistenceIncomplete: false,
};
const fetchMock = vi.fn<typeof fetch>();

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

it(
  "real EN and deep-merged DE providers show separate route totals and refresh/error states",
  { timeout: 10000 },
  async () => {
    vi.stubGlobal("fetch", fetchMock);
    for (const [locale, messages] of [
      ["en", en],
      ["de", deepMergeFallback(structuredClone(de), en)],
    ] as const) {
      const labels = messages.settings.proxyTraffic;
      if (locale === "de") {
        expect(labels.title).toBe(de.settings.proxyTraffic.title);
        expect(labels.title).not.toBe(en.settings.proxyTraffic.title);
      }
      let resolve!: (value: Response) => void;
      const pending = new Promise<Response>((r) => {
        resolve = r;
      });
      fetchMock.mockImplementationOnce(() => pending);
      render(
        <NextIntlClientProvider locale={locale} timeZone="UTC" messages={messages}>
          <ProxyTrafficPanel />
        </NextIntlClientProvider>
      );
      expect(screen.getByRole("status").textContent).toBe(labels.loading);
      await act(async () => {
        resolve(Response.json(report));
        await pending;
      });
      const overall = screen.getByText(labels.overall).closest("tr")!;
      const proxied = screen.getByText(labels.proxied).closest("tr")!;
      expect(within(overall).getByText("10 B")).toBeTruthy();
      expect(within(proxied).getByText("6 B")).toBeTruthy();
      expect(screen.getByText(labels.direct).closest("tr")).toBeTruthy();
      expect(screen.getByText(labels.coverageNote)).toBeTruthy();
      fetchMock.mockResolvedValueOnce(new Response(null, { status: 503 }));
      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: labels.refresh }));
      });
      expect(screen.getByRole("alert").textContent).toBe(labels.error);
      fetchMock.mockResolvedValueOnce(Response.json(report));
      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: labels.refresh }));
      });
      expect(screen.queryByRole("alert")).toBeNull();
      expect(screen.getByRole("row", { name: /Fixture proxy/ })).toBeTruthy();
      cleanup();
    }
  }
);
