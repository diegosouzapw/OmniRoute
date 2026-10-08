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

// The rule packs the caveman page lists.
const PACKS = [
  { language: "en", ruleCount: 3 },
  { language: "es", ruleCount: 2 },
  { language: "fr", ruleCount: 1 },
];

// Stands in for the compression settings route. Like updateCompressionSettings, a PUT
// overwrites every key in its body, except that it merges a partial cavemanOutputMode into
// the stored one. /api/context/caveman/config re-exports the same handler.
function startServer(failPut: (body: Settings) => boolean = () => false) {
  let stored: Settings = JSON.parse(JSON.stringify(STORED));
  let readsFail: false | "status" | "throw" = false;
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
        if (init?.method !== "PUT") {
          if (readsFail === "throw") throw new TypeError("Failed to fetch");
          return readsFail ? respond({ error: "Load failed" }, 500) : respond(stored);
        }
        const body = JSON.parse(String(init.body)) as Settings;
        puts.push(body);
        if (failPut(body)) return respond({ error: "Save failed" }, 500);
        const outputMode = body.cavemanOutputMode as Settings | undefined;
        stored = {
          ...stored,
          ...body,
          ...(outputMode && {
            cavemanOutputMode: { ...(stored.cavemanOutputMode as Settings), ...outputMode },
          }),
        };
        return respond(stored);
      }
      if (pathname === "/api/compression/rules") return respond({ rules: [] });
      if (pathname === "/api/compression/language-packs") return respond({ packs: PACKS });
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
    // Every later read of the settings row fails, with an error status or a network error.
    failReads(how: "status" | "throw" = "status") {
      readsFail = how;
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

async function renderTab() {
  render(<CompressionSettingsTab />);
  await settle();
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("CompressionSettingsTab saves only what changed", () => {
  it("clears the saved-badge timer when the tab unmounts", async () => {
    startServer();
    const nativeSetTimeout = globalThis.setTimeout;
    const badgeTimers: unknown[] = [];
    vi.spyOn(globalThis, "setTimeout").mockImplementation(((
      fn: TimerHandler,
      ms?: number,
      ...args: unknown[]
    ) => {
      const id = nativeSetTimeout(fn as () => void, ms, ...(args as []));
      if (ms === 2000) badgeTimers.push(id);
      return id;
    }) as typeof setTimeout);
    const clearSpy = vi.spyOn(globalThis, "clearTimeout");

    const view = render(<CompressionSettingsTab />);
    await settle();
    fireEvent.change(inputFor("compressionCacheTTL"), { target: { value: "10" } });
    await settle();
    expect(badgeTimers).toHaveLength(1);

    view.unmount();
    expect(clearSpy).toHaveBeenCalledWith(badgeTimers[0]);
  });

  // Rendering the whole caveman page takes over 5 seconds on a cold run.
  it(
    "shows one Auto-Clarity control on the caveman page and keeps it off when the embedded tab saves",
    { timeout: 30_000 },
    async () => {
      const server = startServer();
      render(<CavemanContextPageClient />);
      await settle();
      fireEvent.click(screen.getByText("advancedMode"));
      await settle();

      // This heading renders only once the embedded tab has loaded the stored row. A second
      // Auto-Clarity control would carry another label containing "clarity".
      expect(screen.getByText("compressionGeneral")).toBeTruthy();
      expect(screen.getAllByText(/clarity/i)).toHaveLength(1);

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

  it(
    "keeps output-mode fields saved in another tab when the caveman page toggles Auto-Clarity",
    { timeout: 30_000 },
    async () => {
      const server = startServer();
      render(<CavemanContextPageClient />);
      await settle();
      // The panel turns output mode off and changes its level after this page loaded.
      server.write({
        cavemanOutputMode: { enabled: false, intensity: "ultra", autoClarity: true },
      });

      fireEvent.click(screen.getByLabelText("autoClarity"));
      await settle();

      // The page names only the field it changes, and the store merges it into its row.
      expect(server.puts.at(-1)).toEqual({ cavemanOutputMode: { autoClarity: false } });
      expect(server.stored.cavemanOutputMode).toEqual({
        enabled: false,
        intensity: "ultra",
        autoClarity: false,
      });
    }
  );

  it(
    "keeps language settings saved in another tab when the caveman page changes one",
    { timeout: 30_000 },
    async () => {
      const server = startServer();
      render(<CavemanContextPageClient />);
      await settle();
      // Another tab turns packs on, picks a default language, and enables Spanish.
      server.write({
        languageConfig: {
          enabled: true,
          defaultLanguage: "pt-BR",
          autoDetect: true,
          enabledPacks: ["en", "es"],
        },
      });

      fireEvent.click(screen.getByLabelText("autoDetect"));
      await settle();

      expect(server.stored.languageConfig).toEqual({
        enabled: true,
        defaultLanguage: "pt-BR",
        autoDetect: false,
        enabledPacks: ["en", "es"],
      });
    }
  );

  it(
    "keeps packs enabled in another tab when the caveman page toggles one",
    { timeout: 30_000 },
    async () => {
      const server = startServer();
      render(<CavemanContextPageClient />);
      await settle();
      server.write({
        languageConfig: {
          enabled: true,
          defaultLanguage: "en",
          autoDetect: true,
          enabledPacks: ["en", "es"],
        },
      });

      fireEvent.click(screen.getByLabelText("fr - rulesCount"));
      await settle();

      expect(server.stored.languageConfig).toEqual({
        enabled: true,
        defaultLanguage: "en",
        autoDetect: true,
        enabledPacks: ["en", "es", "fr"],
      });
    }
  );

  it(
    "keeps English when the caveman page turns another pack off",
    { timeout: 30_000 },
    async () => {
      const server = startServer();
      server.write({
        languageConfig: {
          enabled: true,
          defaultLanguage: "en",
          autoDetect: false,
          enabledPacks: ["en", "es", "fr"],
        },
      });
      render(<CavemanContextPageClient />);
      await settle();

      fireEvent.click(screen.getByLabelText("es - rulesCount"));
      await settle();

      expect(server.stored.languageConfig).toMatchObject({ enabledPacks: ["en", "fr"] });
    }
  );

  it(
    "sends no language save when the caveman page cannot read the settings row",
    { timeout: 30_000 },
    async () => {
      const server = startServer();
      server.failReads();
      render(<CavemanContextPageClient />);
      await settle();

      // The page shows its built-in defaults; a save built from them would overwrite the row.
      fireEvent.click(screen.getByLabelText("autoDetect"));
      await settle();

      expect(server.puts).toEqual([]);
    }
  );

  for (const how of ["status", "throw"] as const) {
    it(
      `sends no language save when the caveman page cannot re-read the row it loaded (${how})`,
      { timeout: 30_000 },
      async () => {
        const server = startServer();
        server.write({
          languageConfig: {
            enabled: true,
            defaultLanguage: "en",
            autoDetect: true,
            enabledPacks: ["en", "es"],
          },
        });
        render(<CavemanContextPageClient />);
        await settle();
        // The page holds a loaded copy; a save built from that copy could be stale.
        server.failReads(how);

        fireEvent.click(screen.getByLabelText("autoDetect"));
        await settle();

        expect(server.puts).toEqual([]);
      }
    );
  }

  it("leaves outputStyles saved from another tab in place", async () => {
    const server = startServer();
    await renderTab();
    server.write({ outputStyles: [{ id: "caveman", level: "full" }] });

    fireEvent.change(inputFor("compressionCacheTTL"), { target: { value: "10" } });
    await settle();

    expect(server.stored.outputStyles).toEqual([{ id: "caveman", level: "full" }]);
    expect(server.puts.at(-1)).toEqual({ cacheMinutes: 10 });
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
  // The tab's first request is the settings GET, and it fails as it does while the server
  // restarts. Later requests, including a retried GET, reach the stored row.
  const FAILURES = {
    "a 500": async () => new Response(JSON.stringify({ error: "unavailable" }), { status: 500 }),
    "a network error": async () => {
      throw new TypeError("Failed to fetch");
    },
  };

  // Holds the next request open until the returned function lets `answer` reply to it.
  function holdNextRequest(answer: typeof fetch) {
    let release!: () => Promise<void>;
    vi.mocked(fetch).mockImplementationOnce(
      (input, init) =>
        new Promise<Response>((resolve) => {
          release = async () => {
            resolve(answer(input, init));
            await settle();
          };
        })
    );
    return () => release();
  }

  it.each(Object.keys(FAILURES) as Array<keyof typeof FAILURES>)(
    "shows a retry in place of default settings after %s",
    async (failure) => {
      startServer();
      vi.mocked(fetch).mockImplementationOnce(FAILURES[failure]);
      await renderTab();

      // The defaults would report every compression layer as off.
      expect(screen.queryByText("tokenSaverTitle")).toBeNull();
      expect(screen.getByText(/failedToLoad/)).toBeTruthy();
      expect(screen.getByText("retry")).toBeTruthy();
    }
  );

  it("shows loading while Retry reloads, then the stored settings", async () => {
    startServer();
    vi.mocked(fetch).mockImplementationOnce(FAILURES["a 500"]);
    await renderTab();

    // The retried GET stays open, and the form stays back until it answers.
    const release = holdNextRequest(vi.mocked(fetch).getMockImplementation()!);
    fireEvent.click(screen.getByText("retry"));
    await settle();
    expect(screen.getByText("loading")).toBeTruthy();
    expect(screen.queryByText("compressionCacheTTL")).toBeNull();

    await release();
    expect(screen.queryByText(/failedToLoad/)).toBeNull();
    // The stored row has compression enabled, which the defaults do not.
    expect(inputFor("compressionCacheTTL")).toBeTruthy();
  });

  it("ignores rules from the load that a retry superseded", async () => {
    startServer();
    vi.mocked(fetch).mockImplementationOnce(FAILURES["a 500"]);
    // The first load's rules GET answers only after the retried load finished.
    const staleRule = {
      name: "stale_rule",
      category: "filler",
      context: "all",
      minIntensity: "lite",
      description: "from the superseded load",
    };
    const answerStale = holdNextRequest(
      async () => new Response(JSON.stringify({ rules: [staleRule] }), { status: 200 })
    );
    await renderTab();
    fireEvent.click(screen.getByText("retry"));
    await settle();
    expect(inputFor("compressionCacheTTL")).toBeTruthy();

    await answerStale();
    expect(screen.queryByText("stale rule")).toBeNull();
  });
});
