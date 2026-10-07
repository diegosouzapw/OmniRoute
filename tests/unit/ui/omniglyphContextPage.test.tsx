// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { SAMPLE_METRICS } from "../../../src/app/(dashboard)/dashboard/context/omniglyph/sampleData.ts";

// i18n is not resolved in vitest/jsdom; the page hardcodes its engine copy in English
// anyway (catalog convention), so no next-intl mock is needed. Asserts are on
// i18n-independent content: headings, measured numbers, gate labels, data-testid hooks.

// ── Harness (mirrors tests/unit/ui/compressionPanel.test.tsx) ──────────────────
const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => {
    root.render(ui);
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(async () => {
  vi.restoreAllMocks();
  await act(async () => {
    while (roots.length > 0) roots.pop()?.unmount();
  });
  for (let i = 0; i < 10; i++) await Promise.resolve();
  while (containers.length > 0) containers.pop()?.remove();
  document.body.innerHTML = "";
});

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  });
}

interface CapturedPut {
  url: string;
  body: Record<string, unknown>;
}

// putStatus(n) sets the HTTP status of the n-th PUT (1-based); every PUT succeeds by default.
// rejectPuts makes every PUT throw instead, the network-failure path.
function setupFetchMock(
  options: {
    putStatus?: (n: number) => number;
    rejectPuts?: boolean;
    initialEngines?: Record<string, unknown>;
  } = {}
): {
  puts: CapturedPut[];
} {
  const puts: CapturedPut[] = [];
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

  // omniglyph is absent from `engines`, so the switch starts off; rtk and caveman are present
  // so a test can check that a toggle PUT leaves them out.
  const initialConfig = {
    enabled: true,
    engines: options.initialEngines ?? {
      rtk: { enabled: true, level: "standard" },
      caveman: { enabled: false },
    },
  };

  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = (init?.method ?? "GET").toUpperCase();
      if (url.includes("/api/settings/compression")) {
        if (method === "PUT") {
          if (options.rejectPuts) throw new TypeError("fetch failed");
          const body = JSON.parse(String(init?.body ?? "{}"));
          puts.push({ url, body });
          const status = options.putStatus?.(puts.length) ?? 200;
          return status === 200 ? json({ ...initialConfig, ...body }) : json({}, status);
        }
        return json(initialConfig);
      }
      return json({}, 404);
    }
  );
  return { puts };
}

async function mountPage(): Promise<HTMLElement> {
  const { default: Page } =
    await import("../../../src/app/(dashboard)/dashboard/context/omniglyph/OmniglyphContextPageClient");
  let container!: HTMLElement;
  await act(async () => {
    container = mount(<Page />);
  });
  await flush();
  return container;
}

function enableToggle(container: HTMLElement): HTMLButtonElement {
  const toggle = container.querySelector(
    '[data-testid="omniglyph-enable-toggle"] button'
  ) as HTMLButtonElement | null;
  expect(toggle, "enable toggle button must exist").toBeTruthy();
  return toggle!;
}

async function click(button: HTMLButtonElement) {
  await act(async () => {
    button.click();
  });
  await flush();
}

// ── Tests ──────────────────────────────────────────────────────────────────────
describe("OmniglyphContextPage", () => {
  it("renders the four sections with the measured numbers and the real render", async () => {
    setupFetchMock();
    const { default: Page } =
      await import("../../../src/app/(dashboard)/dashboard/context/omniglyph/OmniglyphContextPageClient");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<Page />);
    });
    await flush();

    const text = container.textContent ?? "";
    // Header + preview status
    expect(text).toContain("OmniGlyph");
    expect(text).toContain("Preview");
    // Economics
    expect(text).toContain("~10×");
    expect(text).toContain("59–70%");
    // Before → after: measured savings + the real rendered image
    expect(text).toContain(`−${SAMPLE_METRICS.savingsPct}% tokens on this block`);
    const img = container.querySelector("img");
    expect(img, "the rendered sample page <img> must be present").toBeTruthy();
    expect(img!.getAttribute("src")).toMatch(/^data:image\/png;base64,/);
    // Gates
    expect(text).toContain("claude-fable-5");
    // A cópia do gate deixou de dizer "direct Anthropic" quando os wires OpenAI
    // nativos entraram: transporte direto é condição de TODO provider, e o que
    // restringe a rota ao Anthropic é o recibo de fidelidade de bytes, não o
    // rótulo do transporte.
    expect(text).toContain("direct provider");
    // Config control
    expect(container.querySelector('[data-testid="omniglyph-enable-toggle"]')).toBeTruthy();
  });

  it("enabling the engine PUTs only the omniglyph entry", async () => {
    const { puts } = setupFetchMock();
    const container = await mountPage();

    await click(enableToggle(container));

    expect(puts.length).toBe(1);
    // The server merges engines by id, so the page sends only the engine it changed and
    // cannot overwrite engines another page changed after this one loaded.
    expect(puts[0]!.body).toEqual({ engines: { omniglyph: { enabled: true } } });
  });

  it("disabling the engine PUTs only the omniglyph entry, off", async () => {
    const { puts } = setupFetchMock({
      initialEngines: {
        omniglyph: { enabled: true, level: "standard" },
        rtk: { enabled: true },
      },
    });
    const container = await mountPage();
    const toggle = enableToggle(container);
    expect(toggle.getAttribute("aria-checked")).toBe("true");

    await click(toggle);

    expect(puts.length).toBe(1);
    // The off toggle also sends only its own entry; a stored level survives server-side.
    expect(puts[0]!.body).toEqual({ engines: { omniglyph: { enabled: false } } });
    expect(toggle.getAttribute("aria-checked")).toBe("false");
  });

  it("a rejected fetch is a failed save: the switch rolls back and the error shows", async () => {
    const { puts } = setupFetchMock({ rejectPuts: true });
    const container = await mountPage();
    const toggle = enableToggle(container);

    await click(toggle);

    expect(puts.length).toBe(0);
    expect(toggle.getAttribute("aria-checked")).toBe("false");
    expect(container.textContent).toContain("Could not save.");
  });

  it("a failed save puts the switch back and shows the error", async () => {
    const { puts } = setupFetchMock({ putStatus: () => 500 });
    const container = await mountPage();
    const toggle = enableToggle(container);

    await click(toggle);

    expect(puts.length).toBe(1);
    expect(toggle.getAttribute("aria-checked")).toBe("false");
    expect(container.textContent).toContain("Could not save.");
  });

  it("a timer left by an earlier save does not clear a later save error", async () => {
    vi.useFakeTimers();
    try {
      const { puts } = setupFetchMock({ putStatus: (n) => (n === 1 ? 200 : 500) });
      const container = await mountPage();
      const toggle = enableToggle(container);

      await click(toggle);
      expect(container.textContent).toContain("Saved.");

      await click(toggle);
      expect(puts.length).toBe(2);
      expect(container.textContent).toContain("Could not save.");

      await act(async () => {
        vi.advanceTimersByTime(2000);
      });
      await flush();
      expect(container.textContent).toContain("Could not save.");
    } finally {
      vi.useRealTimers();
    }
  });

  it("carrega o perfil salvo e faz PATCH só do perfil, sem reescrever o mapa de engines", async () => {
    const puts: CapturedPut[] = [];
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    const stored = {
      enabled: true,
      engines: { rtk: { enabled: true, level: "standard" } },
      omniglyph: { profile: "coding-safe" },
    };
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        const method = (init?.method ?? "GET").toUpperCase();
        if (url.includes("/api/settings/compression")) {
          if (method === "PUT") {
            puts.push({ url, body: JSON.parse(String(init?.body ?? "{}")) });
            return json(stored);
          }
          return json(stored);
        }
        return json({}, 404);
      }
    );

    const { default: Page } =
      await import("../../../src/app/(dashboard)/dashboard/context/omniglyph/OmniglyphContextPageClient");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<Page />);
    });
    await flush();

    const select = container.querySelector(
      '[data-testid="omniglyph-profile-select"]'
    ) as HTMLSelectElement | null;
    expect(select, "o seletor de perfil deve existir").toBeTruthy();
    expect(select!.value, "o perfil salvo tem de vir selecionado").toBe("coding-safe");

    // Os quatro perfis do pacote, com aggressive como primeiro (default).
    expect(Array.from(select!.options).map((o) => o.value)).toEqual([
      "aggressive",
      "balanced",
      "coding-safe",
      "passthrough",
    ]);

    await act(async () => {
      select!.value = "passthrough";
      select!.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await flush();

    expect(puts.length).toBe(1);
    expect(puts[0]!.body).toEqual({ omniglyph: { profile: "passthrough" } });
    // O perfil vive fora do mapa `engines`: mandá-lo junto reescreveria o mapa inteiro.
    expect(puts[0]!.body.engines).toBeUndefined();
  });
});

describe("OmniglyphContextPage when the settings GET fails", () => {
  // The page's only load is the settings GET, and it fails as it does while the server
  // restarts. Later requests, including a retried GET, reach the stored row.
  const FAILURES = {
    "a 500": async () => new Response(JSON.stringify({ error: "unavailable" }), { status: 500 }),
    "a network error": async () => {
      throw new TypeError("Failed to fetch");
    },
  };

  function failFirstSettingsGet(failure: keyof typeof FAILURES) {
    const { puts } = setupFetchMock();
    vi.mocked(globalThis.fetch).mockImplementationOnce(FAILURES[failure]);
    return puts;
  }

  async function mountPage() {
    const { default: Page } =
      await import("../../../src/app/(dashboard)/dashboard/context/omniglyph/OmniglyphContextPageClient");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<Page />);
    });
    await flush();
    return container;
  }

  function retryButton(container: HTMLElement) {
    return Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "Retry"
    );
  }

  function toggleButton(container: HTMLElement) {
    return container.querySelector(
      '[data-testid="omniglyph-enable-toggle"] button'
    ) as HTMLButtonElement | null;
  }

  it.each(Object.keys(FAILURES) as Array<keyof typeof FAILURES>)(
    "offers no control that would save defaults over the stored engines after %s",
    async (failure) => {
      const puts = failFirstSettingsGet(failure);
      const container = await mountPage();

      // The failed load leaves engines {}: a toggle still on the page PUTs
      // {omniglyph:{enabled:true}} alone, and the store keeps only that engine.
      const toggle = toggleButton(container);
      if (toggle) {
        await act(async () => toggle.click());
        await flush();
      }

      expect(puts, "a save before any GET succeeds overwrites the stored engines").toEqual([]);
      expect(container.querySelector('[data-testid="omniglyph-profile-select"]')).toBeNull();
      expect(container.textContent).toContain("Failed To Load");
      expect(retryButton(container), "the load error offers a retry").toBeTruthy();
    }
  );

  it("shows a retry that loads the stored settings before the controls return", async () => {
    const puts = failFirstSettingsGet("a 500");
    const container = await mountPage();
    expect(container.textContent).toContain("Failed To Load");

    // The retried GET stays open, and the controls stay out until it answers.
    let release!: () => Promise<void>;
    vi.mocked(globalThis.fetch).mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          release = async () => {
            await act(async () =>
              resolve(
                new Response(
                  JSON.stringify({
                    enabled: true,
                    engines: {
                      rtk: { enabled: true, level: "standard" },
                      caveman: { enabled: false },
                    },
                  }),
                  { status: 200, headers: { "Content-Type": "application/json" } }
                )
              )
            );
            await flush();
          };
        })
    );
    await act(async () => retryButton(container)!.click());
    await flush();
    expect(toggleButton(container), "the controls wait for the retried GET").toBeNull();

    await release();
    expect(toggleButton(container)).toBeTruthy();
    // Saves go out again once a GET has succeeded. The server merges engines by id,
    // so the page sends only the engine this toggle changed.
    await act(async () => toggleButton(container)!.click());
    await flush();
    expect(puts[0]!.body).toEqual({ engines: { omniglyph: { enabled: true } } });
  });

  it("ignores an answer from the load that a retry superseded", async () => {
    failFirstSettingsGet("a 500");
    const container = await mountPage();

    // The retried GET stays open, so a second retry can start while it is pending.
    let releaseStale!: () => Promise<void>;
    vi.mocked(globalThis.fetch).mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          releaseStale = async () => {
            await act(async () =>
              resolve(
                new Response(JSON.stringify({ engines: { omniglyph: { enabled: true } } }), {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                })
              )
            );
            await flush();
          };
        })
    );
    await act(async () => retryButton(container)!.click());
    await flush();
    await act(async () => retryButton(container)!.click());
    await flush();

    // The first retry's answer lands after the second retry's; it must be dropped.
    await releaseStale();
    const toggle = toggleButton(container);
    expect(toggle?.getAttribute("aria-checked"), "the superseded answer is dropped").toBe("false");
  });
});
