// @vitest-environment jsdom
import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CompressionSettingsTab from "@/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab";
import CavemanContextPageClient from "@/app/(dashboard)/dashboard/context/caveman/CavemanContextPageClient";

// next-intl echoes the key, so labels are the translation keys.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  SegmentedControl: ({
    options,
    onChange,
  }: {
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  }) => (
    <div>
      {options.map((option) => (
        <button key={option.value} onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  ),
}));

type Settings = Record<string, unknown>;

const STORED: Settings = {
  enabled: true,
  defaultMode: "standard",
  autoTriggerTokens: 0,
  cacheMinutes: 5,
  preserveSystemPrompt: true,
  comboOverrides: {},
  cavemanConfig: {
    enabled: true,
    compressRoles: ["user"],
    skipRules: [],
    minMessageLength: 50,
    preservePatterns: [],
    intensity: "full",
  },
  cavemanOutputMode: { enabled: true, intensity: "full", autoClarity: true },
  outputStyles: [],
  rtkConfig: { enabled: true, intensity: "standard" },
};

const AGGRESSIVE = {
  thresholds: { fullSummary: 5, moderate: 3, light: 2, verbatim: 2 },
  toolStrategies: {
    fileContent: true,
    grepSearch: true,
    shellOutput: true,
    json: true,
    errorMessage: true,
  },
  summarizerEnabled: true,
  maxTokensPerMessage: 2048,
  minSavingsThreshold: 0.05,
};

// Stands in for the compression settings route. Like updateCompressionSettings, a PUT
// overwrites every key in its body. /api/context/caveman/config re-exports the same handler.
function startServer(failPut: (body: Settings) => boolean = () => false) {
  let stored: Settings = JSON.parse(JSON.stringify(STORED));
  const puts: Settings[] = [];
  const respond = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const { pathname } = new URL(String(input), "http://localhost");
      if (pathname === "/api/settings/compression" || pathname === "/api/context/caveman/config") {
        if (init?.method !== "PUT") return respond(stored);
        const body = JSON.parse(String(init.body)) as Settings;
        puts.push(body);
        if (failPut(body)) return respond({ error: "Save failed" }, 500);
        stored = { ...stored, ...body };
        return respond(stored);
      }
      if (pathname === "/api/compression/rules") return respond({ rules: [] });
      if (pathname === "/api/compression/language-packs") return respond({ packs: [] });
      return respond(null, 404);
    })
  );
  return {
    get stored() {
      return stored;
    },
    puts,
    // A save made from another browser tab after this one loaded.
    write(patch: Settings) {
      stored = { ...stored, ...patch };
    },
  };
}

async function settle() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function inputFor(labelKey: string): HTMLInputElement {
  const input = screen.getByText(labelKey).closest("label")?.querySelector("input");
  if (!input) throw new Error(`no input next to ${labelKey}`);
  return input;
}

function buttonFor(labelKey: string): HTMLButtonElement {
  const button = screen.getByText(labelKey).closest("label")?.querySelector("button");
  if (!button) throw new Error(`no button next to ${labelKey}`);
  return button;
}

async function renderTab() {
  render(<CompressionSettingsTab />);
  await settle();
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("CompressionSettingsTab saves only what changed", () => {
  // Rendering the whole caveman page takes over 5 seconds on a cold run.
  it(
    "keeps Auto-Clarity off on the caveman page when the embedded tab saves",
    { timeout: 30_000 },
    async () => {
      const server = startServer();
      render(<CavemanContextPageClient />);
      await settle();
      fireEvent.click(screen.getByText("advancedMode"));
      await settle();

      const autoClarity = screen.getByLabelText("autoClarity") as HTMLInputElement;
      expect(autoClarity.checked).toBe(true);
      fireEvent.click(autoClarity);
      await settle();
      expect(server.stored.cavemanOutputMode).toMatchObject({ autoClarity: false });

      fireEvent.change(inputFor("compressionCacheTTL"), { target: { value: "10" } });
      await settle();

      expect(server.stored.cacheMinutes).toBe(10);
      expect(server.stored.cavemanOutputMode).toMatchObject({ autoClarity: false });
      expect(autoClarity.checked).toBe(false);
    }
  );

  it("leaves outputStyles saved from another tab in place", async () => {
    const server = startServer();
    await renderTab();
    server.write({ outputStyles: [{ id: "caveman", level: "full" }] });

    fireEvent.change(inputFor("compressionCacheTTL"), { target: { value: "10" } });
    await settle();

    expect(server.stored.outputStyles).toEqual([{ id: "caveman", level: "full" }]);
    expect(server.puts.at(-1)).toEqual({ cacheMinutes: 10 });
  });

  it("keeps an output-mode field changed elsewhere when the tab toggles Auto-Clarity", async () => {
    const server = startServer();
    await renderTab();
    // The panel changes the output-mode level after this tab loaded.
    server.write({ cavemanOutputMode: { enabled: true, intensity: "ultra", autoClarity: true } });

    fireEvent.click(buttonFor("compressionSettingsAutoClarityBypass"));
    await settle();

    expect(server.puts.at(-1)).toEqual({
      cavemanOutputMode: { enabled: true, intensity: "ultra", autoClarity: false },
    });
  });

  it("fills the rest of a nested save from the stored row, two levels down", async () => {
    const server = startServer();
    server.write({ defaultMode: "aggressive", aggressive: AGGRESSIVE });
    await renderTab();
    // Another tab changes a sibling threshold and another aggressive field.
    server.write({
      aggressive: {
        ...AGGRESSIVE,
        maxTokensPerMessage: 4096,
        thresholds: { ...AGGRESSIVE.thresholds, moderate: 9 },
      },
    });

    fireEvent.change(inputFor("full Summary"), { target: { value: "7" } });
    await settle();

    expect(server.stored.aggressive).toEqual({
      ...AGGRESSIVE,
      maxTokensPerMessage: 4096,
      thresholds: { ...AGGRESSIVE.thresholds, fullSummary: 7, moderate: 9 },
    });
    // The tab now shows the stored row it saved into.
    expect(inputFor("moderate").value).toBe("9");
  });

  it("rolls the field back when its save fails", async () => {
    startServer(() => true);
    await renderTab();
    const cache = inputFor("compressionCacheTTL");

    fireEvent.change(cache, { target: { value: "10" } });
    await settle();

    expect(cache.value).toBe("5");
    expect(screen.getByText("saveFailed")).toBeTruthy();
  });

  it("rolls back only the failed save when a newer one succeeds", async () => {
    const server = startServer((body) => "cacheMinutes" in body);
    await renderTab();
    const cache = inputFor("compressionCacheTTL");
    const autoTrigger = inputFor("compressionAutoTrigger");

    fireEvent.change(cache, { target: { value: "10" } });
    fireEvent.change(autoTrigger, { target: { value: "100" } });
    await settle();

    expect(cache.value).toBe("5");
    expect(autoTrigger.value).toBe("100");
    expect(server.stored).toMatchObject({ cacheMinutes: 5, autoTriggerTokens: 100 });
    // The queued success does not cover up the failure that rolled the cache field back.
    expect(screen.getByText("saveFailed")).toBeTruthy();
    expect(screen.queryByText("saved")).toBeNull();

    // The next edit starts a new save, which clears the error.
    fireEvent.change(autoTrigger, { target: { value: "200" } });
    await settle();
    expect(screen.getByText("saved")).toBeTruthy();
    expect(cache.value).toBe("5");
  });

  it("keeps a later save's error when an earlier save's success message times out", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    startServer((body) => "autoTriggerTokens" in body);
    await renderTab();

    fireEvent.change(inputFor("compressionCacheTTL"), { target: { value: "10" } });
    await settle();
    expect(screen.getByText("saved")).toBeTruthy();

    fireEvent.change(inputFor("compressionAutoTrigger"), { target: { value: "100" } });
    await settle();
    expect(screen.getByText("saveFailed")).toBeTruthy();

    // The first save's 2-second "saved" timeout fires after the second save failed.
    await act(() => vi.advanceTimersByTimeAsync(2000));
    expect(screen.getByText("saveFailed")).toBeTruthy();
  });
});

describe("CompressionSettingsTab when the settings GET fails", () => {
  it("shows a retry in place of default settings, then loads the stored ones", async () => {
    startServer();
    // The tab's first request is the settings GET. It answers 500, as while the server
    // restarts; the retried GET reaches the stored row.
    vi.mocked(fetch).mockImplementationOnce(
      async () => new Response(JSON.stringify({ error: "unavailable" }), { status: 500 })
    );
    await renderTab();

    // The defaults would report every compression layer as off.
    expect(screen.queryByText("tokenSaverTitle")).toBeNull();
    expect(screen.getByText(/failedToLoad/)).toBeTruthy();

    fireEvent.click(screen.getByText("retry"));
    await settle();

    expect(screen.queryByText(/failedToLoad/)).toBeNull();
    // The stored row has compression enabled, which the defaults do not.
    expect(inputFor("compressionCacheTTL")).toBeTruthy();
  });
});
