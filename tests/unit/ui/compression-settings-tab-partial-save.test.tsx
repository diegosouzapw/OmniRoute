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

async function renderTab() {
  render(<CompressionSettingsTab />);
  await settle();
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CompressionSettingsTab saves only what changed", () => {
  it("keeps Auto-Clarity off on the caveman page when the embedded tab saves", async () => {
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
  });

  it("leaves outputStyles saved from another tab in place", async () => {
    const server = startServer();
    await renderTab();
    server.write({ outputStyles: [{ id: "caveman", level: "full" }] });

    fireEvent.change(inputFor("compressionCacheTTL"), { target: { value: "10" } });
    await settle();

    expect(server.stored.outputStyles).toEqual([{ id: "caveman", level: "full" }]);
    expect(server.puts.at(-1)).toEqual({ cacheMinutes: 10 });
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
  });
});
