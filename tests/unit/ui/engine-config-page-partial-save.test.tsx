// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EngineConfigPage } from "@/shared/components/compression/EngineConfigPage";
import {
  compressionPreviewConfigSchema,
  compressionSettingsUpdateSchema,
} from "@/shared/validation/compressionConfigSchemas";
import {
  aggressiveEngine,
  liteEngine,
  ultraEngine,
} from "@omniroute/open-sse/services/compression/engines/cavemanAdapter.ts";
import {
  DEFAULT_AGGRESSIVE_CONFIG,
  DEFAULT_ULTRA_CONFIG,
} from "@omniroute/open-sse/services/compression/types.ts";

type Settings = Record<string, unknown>;

// The same fields GET /api/compression/engines returns, taken from the real engines.
const ENGINES = {
  engines: [aggressiveEngine, ultraEngine, liteEngine].map((engine) => ({
    id: engine.id,
    name: engine.name,
    description: engine.description,
    icon: engine.icon,
    stackable: engine.stackable,
    stackPriority: engine.stackPriority,
    metadata: engine.metadata,
    configSchema: engine.getConfigSchema(),
  })),
};

// Lite rows merge with the stored row, as mergeLiteSettingsForWrite does: an omitted cap stays,
// and a null cap is cleared.
function mergeLite(existing: unknown, incoming: Settings): Settings {
  const merged: Settings = { ...(existing as Settings), ...incoming };
  if (merged.maxToolLength === null) delete merged.maxToolLength;
  return merged;
}

// Stands in for /api/settings/compression. A PUT is checked against the real update schema,
// and each key in its body replaces the stored sub-object whole, as updateCompressionSettings
// does, except lite, which merges. `readsFail` makes GETs fail. `holdNextRead` keeps the next GET
// waiting until the returned function runs, then fails it. `failNextWrite` answers the next PUT
// with a 500, either before applying it ("rejected") or after ("applied"). `loseNextResponse`
// applies the next PUT and then fails the request, as a dropped connection would. `holdWrites`
// keeps PUTs waiting until the returned function runs. A preview's config is checked against the
// preview route's schema.
function startServer(initial: Settings) {
  let stored: Settings = JSON.parse(JSON.stringify(initial));
  let held: Promise<void> | null = null;
  let heldRead: Promise<void> | null = null;
  const server = {
    readsFail: false,
    failNextWrite: null as null | "rejected" | "applied",
    loseNextResponse: false,
    puts: [] as { body: Settings; status: number }[],
    previews: [] as { config: unknown; status: number }[],
    get stored() {
      return stored;
    },
    // A save made on another page, such as the compression settings tab.
    write(patch: Settings) {
      stored = { ...stored, ...patch };
    },
    holdWrites() {
      let release = () => {};
      held = new Promise((resolve) => {
        release = () => {
          held = null;
          resolve();
        };
      });
      return release;
    },
    holdNextRead() {
      let fail = () => {};
      heldRead = new Promise((resolve) => {
        fail = () => resolve();
      });
      return fail;
    },
  };
  const respond = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const { pathname } = new URL(String(input), "http://localhost");
      if (pathname === "/api/compression/engines") return respond(ENGINES);
      if (pathname === "/api/context/analytics/engine") {
        return respond({ engineId: "", runs: 0, tokensSaved: 0, avgSavingsPercent: 0, days: 7 });
      }
      if (pathname === "/api/settings/compression") {
        if (init?.method !== "PUT") {
          if (heldRead) {
            const wait = heldRead;
            heldRead = null;
            await wait;
            return respond({ error: "unavailable" }, 500);
          }
          return server.readsFail ? respond({ error: "unavailable" }, 500) : respond(stored);
        }
        const body = JSON.parse(String(init.body)) as Settings;
        const parsed = compressionSettingsUpdateSchema.safeParse(body);
        server.puts.push({ body, status: parsed.success ? 200 : 400 });
        if (!parsed.success) return respond({ error: "Invalid request" }, 400);
        if (held) await held;
        if (server.failNextWrite === "rejected") {
          server.failNextWrite = null;
          return respond({ error: "unavailable" }, 500);
        }
        const { lite, ...rest } = parsed.data as Settings;
        stored = { ...stored, ...rest };
        if (lite) stored.lite = mergeLite(stored.lite, lite as Settings);
        if (server.failNextWrite === "applied") {
          server.failNextWrite = null;
          return respond({ error: "unavailable" }, 500);
        }
        if (server.loseNextResponse) {
          server.loseNextResponse = false;
          throw new TypeError("Failed to fetch");
        }
        return respond(stored);
      }
      if (pathname === "/api/compression/preview") {
        const { config } = JSON.parse(String(init?.body)) as { config?: unknown };
        const parsed = compressionPreviewConfigSchema.optional().safeParse(config);
        server.previews.push({ config, status: parsed.success ? 200 : 400 });
        if (!parsed.success) return respond({ error: "Invalid request" }, 400);
        return respond({
          original: "original text",
          compressed: "compressed text",
          originalTokens: 4,
          compressedTokens: 2,
          savingsPct: 50,
        });
      }
      return respond(null, 404);
    })
  );
  return server;
}

async function settle() {
  for (let i = 0; i < 3; i++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
}

function inputFor(label: string): HTMLInputElement {
  const input = screen.getByText(label).closest("label")?.querySelector("input");
  if (!input) throw new Error(`no input for ${label}`);
  return input;
}

async function renderPage(engineId: string) {
  render(<EngineConfigPage engineId={engineId} />);
  await settle();
}

async function save() {
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  await settle();
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("EngineConfigPage saves only what the operator changed", () => {
  it("keeps Aggressive thresholds and tool strategies saved elsewhere after the page loaded", async () => {
    const server = startServer({ aggressive: DEFAULT_AGGRESSIVE_CONFIG });
    await renderPage("aggressive");
    // The compression settings tab edits the same sub-object after this page loaded.
    const fromSettingsTab = {
      ...DEFAULT_AGGRESSIVE_CONFIG,
      thresholds: { ...DEFAULT_AGGRESSIVE_CONFIG.thresholds, fullSummary: 9 },
      toolStrategies: { ...DEFAULT_AGGRESSIVE_CONFIG.toolStrategies, json: false },
      summarizerEnabled: false,
    };
    server.write({ aggressive: fromSettingsTab });

    fireEvent.change(inputFor("Maximum tokens per message"), { target: { value: "4096" } });
    await save();

    expect(server.puts.at(-1)?.status).toBe(200);
    expect(server.stored.aggressive).toEqual({ ...fromSettingsTab, maxTokensPerMessage: 4096 });
  });

  it("saves the Ultra page on a default install that has no model path", async () => {
    const server = startServer({ ultra: DEFAULT_ULTRA_CONFIG });
    await renderPage("ultra");

    fireEvent.change(inputFor("Compression rate"), { target: { value: "0.4" } });
    await save();

    expect(server.puts.at(-1)?.status).toBe(200);
    expect(server.stored.ultra).toEqual({ ...DEFAULT_ULTRA_CONFIG, compressionRate: 0.4 });
    expect(screen.queryByText("Failed to save configuration.")).toBeNull();
  });

  it("keeps ultra.enabled when the Ultra page saves", async () => {
    const server = startServer({
      ultra: { ...DEFAULT_ULTRA_CONFIG, enabled: true, modelPath: "/models/ultra" },
    });
    await renderPage("ultra");

    fireEvent.change(inputFor("Compression rate"), { target: { value: "0.4" } });
    await save();

    expect(server.puts.at(-1)?.status).toBe(200);
    expect(server.stored.ultra).toEqual({
      ...DEFAULT_ULTRA_CONFIG,
      enabled: true,
      modelPath: "/models/ultra",
      compressionRate: 0.4,
    });
  });

  it("clears a stored model path when the field is emptied", async () => {
    const server = startServer({ ultra: { ...DEFAULT_ULTRA_CONFIG, modelPath: "/models/ultra" } });
    await renderPage("ultra");

    fireEvent.change(inputFor("Model path"), { target: { value: "  " } });
    await save();

    expect(server.puts.at(-1)?.status).toBe(200);
    expect(server.stored.ultra).toEqual(DEFAULT_ULTRA_CONFIG);
  });

  it("fails the save without writing when the current settings cannot be read", async () => {
    const server = startServer({ aggressive: DEFAULT_AGGRESSIVE_CONFIG });
    await renderPage("aggressive");
    server.readsFail = true;

    fireEvent.change(inputFor("Maximum tokens per message"), { target: { value: "4096" } });
    await save();

    expect(server.puts).toHaveLength(0);
    expect(screen.getByText("Failed to save configuration.")).toBeTruthy();
  });

  it("sends a second save's change without resending the first one", async () => {
    const server = startServer({ aggressive: DEFAULT_AGGRESSIVE_CONFIG });
    await renderPage("aggressive");

    fireEvent.change(inputFor("Maximum tokens per message"), { target: { value: "4096" } });
    await save();
    // Another page sets the same field back after the first save.
    server.write({ aggressive: { ...DEFAULT_AGGRESSIVE_CONFIG, maxTokensPerMessage: 1024 } });

    fireEvent.change(inputFor("Minimum savings threshold"), { target: { value: "0.2" } });
    await save();

    expect(server.stored.aggressive).toEqual({
      ...DEFAULT_AGGRESSIVE_CONFIG,
      maxTokensPerMessage: 1024,
      minSavingsThreshold: 0.2,
    });
  });

  it("shows the stored values after a save, so a value typed back afterwards is sent", async () => {
    const server = startServer({ aggressive: DEFAULT_AGGRESSIVE_CONFIG });
    await renderPage("aggressive");
    // Another page changes a field this page shows, after it loaded.
    server.write({ aggressive: { ...DEFAULT_AGGRESSIVE_CONFIG, maxTokensPerMessage: 1024 } });

    fireEvent.change(inputFor("Minimum savings threshold"), { target: { value: "0.2" } });
    await save();

    expect(inputFor("Maximum tokens per message").value).toBe("1024");

    fireEvent.change(inputFor("Maximum tokens per message"), {
      target: { value: String(DEFAULT_AGGRESSIVE_CONFIG.maxTokensPerMessage) },
    });
    await save();

    expect(server.stored.aggressive).toEqual({
      ...DEFAULT_AGGRESSIVE_CONFIG,
      minSavingsThreshold: 0.2,
    });
  });

  it("sends a field again after a save whose response was lost", async () => {
    const server = startServer({ ultra: DEFAULT_ULTRA_CONFIG });
    await renderPage("ultra");

    // The server applies the write, but the response never arrives.
    server.loseNextResponse = true;
    fireEvent.change(inputFor("Compression rate"), { target: { value: "0.4" } });
    await save();
    expect(screen.getByText("Failed to save configuration.")).toBeTruthy();
    expect((server.stored.ultra as Settings).compressionRate).toBe(0.4);

    // The operator puts the loaded value back and saves again.
    fireEvent.change(inputFor("Compression rate"), {
      target: { value: String(DEFAULT_ULTRA_CONFIG.compressionRate) },
    });
    await save();

    expect(server.puts.at(-1)?.status).toBe(200);
    expect(server.stored.ultra).toEqual(DEFAULT_ULTRA_CONFIG);
  });

  it("keeps an edit typed while a save is in flight", async () => {
    const server = startServer({ aggressive: DEFAULT_AGGRESSIVE_CONFIG });
    await renderPage("aggressive");
    const release = server.holdWrites();

    fireEvent.change(inputFor("Maximum tokens per message"), { target: { value: "4096" } });
    await save();
    fireEvent.change(inputFor("Minimum savings threshold"), { target: { value: "0.2" } });
    release();
    await settle();

    expect(inputFor("Minimum savings threshold").value).toBe("0.2");
    await save();

    expect(server.stored.aggressive).toEqual({
      ...DEFAULT_AGGRESSIVE_CONFIG,
      maxTokensPerMessage: 4096,
      minSavingsThreshold: 0.2,
    });
  });

  it("keeps the Lite switch another page changed when this page edits the cap", async () => {
    const server = startServer({ lite: { compressToolResults: true, maxToolLength: 8000 } });
    await renderPage("lite");
    server.write({ lite: { compressToolResults: false, maxToolLength: 8000 } });

    fireEvent.change(inputFor("Maximum tool-result length"), { target: { value: "9000" } });
    await save();

    expect(server.puts.at(-1)?.status).toBe(200);
    expect(server.stored.lite).toEqual({ compressToolResults: false, maxToolLength: 9000 });
  });

  it("turns Save off when the stored settings cannot be loaded", async () => {
    const server = startServer({ aggressive: DEFAULT_AGGRESSIVE_CONFIG });
    server.readsFail = true;
    await renderPage("aggressive");

    expect(
      screen.getByText(
        "Failed to load the saved settings. The fields show defaults, and Save stays off until the page reloads."
      )
    ).toBeTruthy();
    expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("ignores a settings read that fails after the page reloads", async () => {
    const server = startServer({
      ultra: DEFAULT_ULTRA_CONFIG,
      aggressive: DEFAULT_AGGRESSIVE_CONFIG,
    });
    const failFirstRead = server.holdNextRead();
    const { rerender } = render(<EngineConfigPage engineId="ultra" />);
    await settle();
    // The page reloads before the first settings read answers.
    rerender(<EngineConfigPage engineId="aggressive" />);
    await settle();
    failFirstRead();
    await settle();

    expect(screen.queryByText(/Failed to load/)).toBeNull();
    expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(
      false
    );
  });

  it("keeps an edit after a rejected save, so the next save sends it", async () => {
    const server = startServer({ ultra: DEFAULT_ULTRA_CONFIG });
    await renderPage("ultra");
    server.failNextWrite = "rejected";

    fireEvent.change(inputFor("Compression rate"), { target: { value: "0.4" } });
    await save();
    expect(screen.getByText("Failed to save configuration.")).toBeTruthy();
    expect(server.stored.ultra).toEqual(DEFAULT_ULTRA_CONFIG);

    await save();

    expect(server.stored.ultra).toEqual({ ...DEFAULT_ULTRA_CONFIG, compressionRate: 0.4 });
  });

  it("sends a field again after a save the server applied but answered with an error", async () => {
    const server = startServer({ ultra: DEFAULT_ULTRA_CONFIG });
    await renderPage("ultra");
    server.failNextWrite = "applied";

    fireEvent.change(inputFor("Compression rate"), { target: { value: "0.4" } });
    await save();
    expect(screen.getByText("Failed to save configuration.")).toBeTruthy();
    expect((server.stored.ultra as Settings).compressionRate).toBe(0.4);

    // The operator puts the loaded value back and saves again.
    fireEvent.change(inputFor("Compression rate"), {
      target: { value: String(DEFAULT_ULTRA_CONFIG.compressionRate) },
    });
    await save();

    expect(server.stored.ultra).toEqual(DEFAULT_ULTRA_CONFIG);
  });

  it("keeps another page's value when a keystroke lands as a save finishes", async () => {
    const server = startServer({ aggressive: DEFAULT_AGGRESSIVE_CONFIG });
    await renderPage("aggressive");
    // Another page changes a field this page shows, after it loaded.
    server.write({ aggressive: { ...DEFAULT_AGGRESSIVE_CONFIG, maxTokensPerMessage: 1024 } });
    const release = server.holdWrites();
    fireEvent.change(inputFor("Minimum savings threshold"), { target: { value: "0.2" } });
    await save();

    // The response arrives, and a keystroke lands before the page re-renders.
    await act(async () => {
      release();
      await new Promise((resolve) => setTimeout(resolve, 0));
      fireEvent.change(inputFor("Minimum savings threshold"), { target: { value: "0.3" } });
    });
    await settle();

    expect(inputFor("Maximum tokens per message").value).toBe("1024");
    await save();

    expect(server.stored.aggressive).toEqual({
      ...DEFAULT_AGGRESSIVE_CONFIG,
      maxTokensPerMessage: 1024,
      minSavingsThreshold: 0.3,
    });
  });

  it("previews the Ultra engine on a default install that has no model path", async () => {
    const server = startServer({ ultra: DEFAULT_ULTRA_CONFIG });
    await renderPage("ultra");

    fireEvent.click(screen.getByRole("button", { name: "Preview" }));
    await settle();

    expect(server.previews.at(-1)?.status).toBe(200);
    expect(screen.queryByText("Preview failed.")).toBeNull();
    expect(screen.getByText("compressed text")).toBeTruthy();
  });
});
