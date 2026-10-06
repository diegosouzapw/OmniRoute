// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ENGINE_IDS } from "../../../open-sse/services/compression/engineCatalog.ts";

// i18n does not resolve to a real locale in vitest/jsdom, so mock next-intl to echo
// the key. This test therefore asserts on translation keys, engine ids,
// data-testid hooks, and the PUT request body.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key} ${Object.values(values).join(" ")}` : key,
  useLocale: () => "en",
}));

// ── Harness ─────────────────────────────────────────────────────────────────

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
    while (roots.length > 0) {
      roots.pop()?.unmount();
    }
  });
  for (let i = 0; i < 10; i++) {
    await Promise.resolve();
  }
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  });
}

// ── Fetch stub ────────────────────────────────────────────────────────────────

interface CapturedPut {
  url: string;
  body: Record<string, unknown>;
}

function setupFetchMock(storedOverrides?: Record<string, unknown>): { puts: CapturedPut[] } {
  const puts: CapturedPut[] = [];
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  const initialConfig = {
    enabled: true,
    defaultMode: "stacked",
    autoTriggerTokens: 0,
    cacheMinutes: 5,
    preserveSystemPrompt: true,
    comboOverrides: {},
    engines: {
      rtk: { enabled: true, level: "standard" },
      caveman: { enabled: false },
    },
    activeComboId: null,
    // GET /api/settings/compression reports a stored engines row as enginesExplicit
    // (src/lib/db/compression.ts). Since #14700 the preview follows the runtime default
    // derivation, which only reads the engines map when this flag is set.
    enginesExplicit: true,
    cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
  };
  // The stored row the mock's settings GET serves; each PUT merges into it before answering.
  let stored: Record<string, unknown> = { ...initialConfig, ...storedOverrides };

  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = (init?.method ?? "GET").toUpperCase();

      if (url.includes("/api/settings/compression/mcp-accessibility")) {
        if (method === "PUT") {
          puts.push({ url, body: JSON.parse(String(init?.body ?? "{}")) });
          return json({ enabled: true });
        }
        return json({ enabled: true, maxTextChars: 50000 });
      }

      if (url.includes("/api/settings/compression")) {
        if (method === "PUT") {
          const body = JSON.parse(String(init?.body ?? "{}"));
          puts.push({ url, body });
          // Store each PUT before answering, like the route does, so a GET that arrives
          // after an ack reflects it.
          stored = { ...stored, ...body };
          return json({ ...stored });
        }
        return json(stored);
      }

      return json({}, 404);
    }
  );

  // Lets a test that answers PUTs itself record what the server would have stored, so a
  // later GET reflects the ack.
  const storePut = (body: Record<string, unknown>) => {
    stored = { ...stored, ...body };
  };

  return { puts, storePut };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("CompressionPanel", () => {
  it("renders a row for every engine id in the catalog", async () => {
    setupFetchMock();
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    for (const id of ENGINE_IDS) {
      const row = container.querySelector(`[data-testid="engine-row-${id}"]`);
      expect(row, `expected a row for engine "${id}"`).toBeTruthy();
      expect(container.textContent).toContain(`compressionEngine.${id}.label`);
    }
  });

  it("shows the rtk level 'standard' as selected", async () => {
    setupFetchMock();
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const select = container.querySelector(
      `[data-testid="engine-row-rtk"] select`
    ) as HTMLSelectElement | null;
    expect(select).toBeTruthy();
    expect(select?.value).toBe("standard");
  });

  it("toggling caveman PUTs engines.caveman.enabled === true", async () => {
    const { puts } = setupFetchMock();
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    // The data-testid hook wraps the Toggle; its inner <button role="switch"> is the
    // clickable element.
    const toggle = container.querySelector(
      `[data-testid="engine-toggle-caveman"] button`
    ) as HTMLButtonElement | null;
    expect(toggle, "caveman toggle must exist").toBeTruthy();

    await act(async () => {
      toggle!.click();
    });
    await flush();

    const settingsPuts = puts.filter(
      (p) => p.url.includes("/api/settings/compression") && !p.url.includes("mcp-accessibility")
    );
    expect(settingsPuts.length).toBeGreaterThan(0);
    const lastEngines = settingsPuts
      .map((p) => p.body.engines as Record<string, { enabled: boolean }> | undefined)
      .filter(Boolean)
      .pop();
    expect(lastEngines).toBeTruthy();
    expect(lastEngines!.caveman.enabled).toBe(true);
    // Full engines map is sent (whole-row persistence), so rtk is not dropped.
    expect(lastEngines!.rtk.enabled).toBe(true);
  });

  it("derived-pipeline preview reflects the enabled engines", async () => {
    setupFetchMock();
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");

    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();

    const preview = container.querySelector(`[data-testid="derived-pipeline-preview"]`);
    expect(preview).toBeTruthy();
    // Only rtk is enabled in the initial config. rtk is lossy, and a header-less request
    // downgrades lossy steps to the safe session-dedup → lite pipeline (#14529); the preview
    // shows what a request actually runs (#14700), so it names that pipeline — not rtk,
    // and never the disabled caveman engine.
    expect(preview?.textContent).toContain("session-dedup → lite");
    expect(preview?.textContent).not.toContain("rtk");
    expect(preview?.textContent).not.toContain("caveman");
  });

  async function renderPanel() {
    const { default: CompressionPanel } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionPanel />);
    });
    await flush();
    return container;
  }

  // Settings PUTs wait until the test answers them, so several saves stay in flight together
  // and can answer in any order. Only PUTs to the settings endpoint are held — anything else
  // falls through to the base mock, so `puts` and `answer` indices stay settings-only.
  function holdSettingsPuts(storedOverrides?: Record<string, unknown>) {
    const { storePut } = setupFetchMock(storedOverrides);
    const respond = vi.mocked(globalThis.fetch).getMockImplementation()!;
    const puts: Array<Record<string, unknown>> = [];
    const answers: Array<(status: number) => void> = [];
    let nextGet: Record<string, unknown> | null = null;
    vi.mocked(globalThis.fetch).mockImplementation((input, init) => {
      const url = String(input);
      const method = (init?.method ?? "GET").toUpperCase();
      if (
        nextGet &&
        method === "GET" &&
        url.includes("/api/settings/compression") &&
        !url.includes("mcp-accessibility")
      ) {
        const payload = nextGet;
        nextGet = null;
        return Promise.resolve(
          new Response(JSON.stringify(payload), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        );
      }
      if (
        method !== "PUT" ||
        !url.includes("/api/settings/compression") ||
        url.includes("mcp-accessibility")
      ) {
        return respond(input, init);
      }
      const body = JSON.parse(String(init.body));
      puts.push(body);
      return new Promise<Response>((resolve, reject) => {
        answers.push((status) => {
          // A 2xx answer means the server stored this save before answering.
          if (status >= 200 && status < 300) storePut(body);
          resolve(new Response("{}", { status }));
        });
        init.signal?.addEventListener("abort", () => reject(init.signal?.reason));
      });
    });
    const answer = async (index: number, status: number) => {
      await act(async () => answers[index](status));
      await flush();
    };
    // Serves the panel's next settings GET (the post-failure resync) a stored row of our
    // choosing, once.
    const setNextGet = (payload: Record<string, unknown>) => {
      nextGet = payload;
    };
    return { puts, answer, setNextGet };
  }

  async function commitAutoTrigger(input: HTMLInputElement, value: string) {
    await act(async () => {
      fireEvent.change(input, { target: { value } });
    });
    await act(async () => {
      fireEvent.keyDown(input, { key: "Enter" });
    });
  }

  // The ultra-engine select is disabled while a save is in flight, but the auto-trigger input
  // never is, so a value committed there goes out while the ultra-engine save still waits.
  async function changeUltraEngineThenAutoTrigger(container: HTMLElement) {
    const ultraEngine = container.querySelector(
      `[data-testid="ultra-engine-select"]`
    ) as HTMLSelectElement;
    const autoTrigger = container.querySelector(`input[type="number"]`) as HTMLInputElement;
    await act(async () => {
      fireEvent.change(ultraEngine, { target: { value: "slm" } });
    });
    await commitAutoTrigger(autoTrigger, "500");
    return { ultraEngine, autoTrigger };
  }

  it("a failed save rolls back its own field and keeps a later save", async () => {
    const { puts, answer } = holdSettingsPuts();
    const container = await renderPanel();
    const { ultraEngine, autoTrigger } = await changeUltraEngineThenAutoTrigger(container);
    // Each PUT carries only its own field, so the server never stored ultraEngine "slm".
    expect(puts).toEqual([{ ultraEngine: "slm" }, { autoTriggerTokens: 500 }]);

    await answer(0, 500);
    await answer(1, 200);
    expect(ultraEngine.value).toBe("heuristic");
    expect(autoTrigger.value).toBe("500");
    expect(container.textContent).toContain("saveFailed");
  });

  it("a failed later save rolls back its own field and keeps the earlier save", async () => {
    const { answer } = holdSettingsPuts();
    const container = await renderPanel();
    const { ultraEngine, autoTrigger } = await changeUltraEngineThenAutoTrigger(container);

    await answer(0, 200);
    await answer(1, 500);
    expect(ultraEngine.value).toBe("slm");
    expect(autoTrigger.value).toBe("0");
    expect(container.textContent).toContain("saveFailed");
  });

  it("saves the auto-trigger value once, on Enter or when the field loses focus", async () => {
    const { puts } = holdSettingsPuts();
    const container = await renderPanel();
    const autoTrigger = container.querySelector(`input[type="number"]`) as HTMLInputElement;

    for (const value of ["8", "80", "8000"]) {
      await act(async () => {
        fireEvent.change(autoTrigger, { target: { value } });
      });
    }
    expect(puts, "typing alone saves nothing").toEqual([]);
    await act(async () => {
      fireEvent.keyDown(autoTrigger, { key: "Enter" });
    });
    await act(async () => {
      fireEvent.blur(autoTrigger);
    });
    expect(puts, "the blur after Enter has nothing new to save").toEqual([
      { autoTriggerTokens: 8000 },
    ]);

    await act(async () => {
      fireEvent.change(autoTrigger, { target: { value: "9000" } });
    });
    await act(async () => {
      fireEvent.blur(autoTrigger);
    });
    expect(puts).toEqual([{ autoTriggerTokens: 8000 }, { autoTriggerTokens: 9000 }]);
  });

  it("rolls the auto-trigger box back when a cleared or zero-padded value fails to save", async () => {
    const { answer } = holdSettingsPuts();
    const container = await renderPanel();
    const autoTrigger = container.querySelector(`input[type="number"]`) as HTMLInputElement;
    await commitAutoTrigger(autoTrigger, "500");
    await answer(0, 200);

    await commitAutoTrigger(autoTrigger, "");
    await answer(1, 500);
    expect(autoTrigger.value, "a cleared box comes back to the saved value").toBe("500");

    await commitAutoTrigger(autoTrigger, "0700");
    await answer(2, 500);
    expect(autoTrigger.value, "a zero-padded value comes back to the saved value").toBe("500");
  });

  it("shows the value of the save that answered last when saves of one field overlap", async () => {
    const { puts, answer } = holdSettingsPuts();
    const container = await renderPanel();
    const autoTrigger = container.querySelector(`input[type="number"]`) as HTMLInputElement;
    await commitAutoTrigger(autoTrigger, "1");
    await commitAutoTrigger(autoTrigger, "100");
    expect(puts).toEqual([{ autoTriggerTokens: 1 }, { autoTriggerTokens: 100 }]);

    // The server stores each save just before it answers, so the save that answers last holds
    // the stored value.
    await answer(1, 200);
    await answer(0, 200);
    expect(autoTrigger.value).toBe("1");
  });

  it("shows Saved again once a save succeeds after an earlier failure settled", async () => {
    const { answer } = holdSettingsPuts();
    const container = await renderPanel();
    const ultraEngine = container.querySelector(
      `[data-testid="ultra-engine-select"]`
    ) as HTMLSelectElement;

    await act(async () => {
      fireEvent.change(ultraEngine, { target: { value: "slm" } });
    });
    await answer(0, 500);
    expect(container.textContent).toContain("saveFailed");

    await act(async () => {
      fireEvent.change(ultraEngine, { target: { value: "slm" } });
    });
    await answer(1, 200);
    expect(ultraEngine.value).toBe("slm");
    expect(container.textContent).toContain("saved");
    expect(container.textContent).not.toContain("saveFailed");
  });

  it("shows Save failed at once and keeps it while other saves are in flight", async () => {
    const { answer } = holdSettingsPuts();
    const container = await renderPanel();
    const { autoTrigger } = await changeUltraEngineThenAutoTrigger(container);

    // The auto-trigger save fails while the ultra-engine save still waits on the server.
    await answer(1, 500);
    expect(container.textContent, "the failure shows at once").toContain("saveFailed");
    await commitAutoTrigger(autoTrigger, "700");
    expect(container.textContent, "a new save does not hide it").toContain("saveFailed");

    await answer(2, 200);
    await answer(0, 200);
    expect(autoTrigger.value).toBe("700");
    expect(container.textContent).toContain("saveFailed");
  });

  it("fails a PUT that outlives the save timeout", async () => {
    const { puts, answer } = holdSettingsPuts();
    const timeouts: AbortController[] = [];
    const timeoutSpy = vi.spyOn(AbortSignal, "timeout").mockImplementation(() => {
      const controller = new AbortController();
      timeouts.push(controller);
      return controller.signal;
    });
    const container = await renderPanel();
    const { ultraEngine, autoTrigger } = await changeUltraEngineThenAutoTrigger(container);
    expect(puts, "the auto-trigger save does not wait").toEqual([
      { ultraEngine: "slm" },
      { autoTriggerTokens: 500 },
    ]);
    await answer(1, 200);
    expect(ultraEngine.disabled, "controls stay disabled while a PUT is in flight").toBe(true);

    // The first PUT never answers; its timeout signal ends it.
    await act(async () => timeouts[0].abort());
    for (let i = 0; i < 5; i++) await flush();

    expect(timeoutSpy).toHaveBeenCalledWith(15_000);
    expect(ultraEngine.disabled).toBe(false);
    expect(ultraEngine.value).toBe("heuristic");
    expect(autoTrigger.value).toBe("500");
    expect(container.textContent).toContain("saveFailed");
  });

  it("keeps an unsaved auto-trigger edit when an overlapping save of it fails", async () => {
    const { puts, answer } = holdSettingsPuts();
    const container = await renderPanel();
    const autoTrigger = container.querySelector(`input[type="number"]`) as HTMLInputElement;
    await commitAutoTrigger(autoTrigger, "100");
    await commitAutoTrigger(autoTrigger, "200");
    await act(async () => {
      fireEvent.change(autoTrigger, { target: { value: "100" } });
    });

    // The 200 save answers first; the 100 save then fails, which rolls the value back to 200.
    await answer(1, 200);
    await answer(0, 500);
    expect(autoTrigger.value, "the unsaved edit stays in the box").toBe("100");
    await act(async () => {
      fireEvent.blur(autoTrigger);
    });
    expect(puts).toEqual([
      { autoTriggerTokens: 100 },
      { autoTriggerTokens: 200 },
      { autoTriggerTokens: 100 },
    ]);
  });

  it("delivers a click that ends an auto-trigger edit to the control it lands on", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const { puts } = holdSettingsPuts();
    const container = await renderPanel();
    const autoTrigger = container.querySelector(`input[type="number"]`) as HTMLInputElement;
    const cavemanToggle = container.querySelector(
      `[data-testid="engine-toggle-caveman"] button`
    ) as HTMLButtonElement;
    const user = userEvent.setup();
    await user.clear(autoTrigger);
    await user.type(autoTrigger, "500");

    // Pressing the toggle blurs the box, which saves 500 before the click lands.
    await user.click(cavemanToggle);
    expect(puts).toHaveLength(2);
    expect(puts[0]).toEqual({ autoTriggerTokens: 500 });
    expect((puts[1].engines as Record<string, { enabled: boolean }>).caveman.enabled).toBe(true);
  });

  it("picks up a save the server stored after the panel gave up on it", async () => {
    const { setNextGet } = holdSettingsPuts();
    const timeouts: AbortController[] = [];
    vi.spyOn(AbortSignal, "timeout").mockImplementation(() => {
      const controller = new AbortController();
      timeouts.push(controller);
      return controller.signal;
    });
    const container = await renderPanel();
    const ultraEngine = container.querySelector(
      `[data-testid="ultra-engine-select"]`
    ) as HTMLSelectElement;
    await act(async () => {
      fireEvent.change(ultraEngine, { target: { value: "slm" } });
    });

    // The PUT never answers; the timeout gives up on it. The server stores the save anyway,
    // and the panel's re-read picks the stored value up.
    setNextGet({
      enabled: true,
      autoTriggerTokens: 0,
      preserveSystemPrompt: true,
      engines: { rtk: { enabled: true, level: "standard" }, caveman: { enabled: false } },
      enginesExplicit: true,
      ultraEngine: "slm",
    });
    await act(async () => timeouts[0].abort());
    for (let i = 0; i < 5; i++) await flush();

    expect(ultraEngine.value, "the resync shows the value the server stored").toBe("slm");
    expect(container.textContent).toContain("saveFailed");
  });

  it("a resync answer does not clobber saves started after the failure", async () => {
    const { puts, answer, setNextGet } = holdSettingsPuts();
    const timeouts: AbortController[] = [];
    vi.spyOn(AbortSignal, "timeout").mockImplementation(() => {
      const controller = new AbortController();
      timeouts.push(controller);
      return controller.signal;
    });
    const container = await renderPanel();
    const autoTrigger = container.querySelector(`input[type="number"]`) as HTMLInputElement;

    await commitAutoTrigger(autoTrigger, "500");
    setNextGet({ enabled: true, autoTriggerTokens: 999 });
    await act(async () => timeouts[0].abort());
    // A new save starts while the resync is on its way; its value must survive the resync.
    await commitAutoTrigger(autoTrigger, "700");
    for (let i = 0; i < 5; i++) await flush();

    expect(autoTrigger.value, "the newer save stays in the box").toBe("700");
    await answer(1, 200);
    expect(autoTrigger.value).toBe("700");
    // The newer save started after the failed one had settled, so it clears the banner.
    expect(container.textContent).toContain("saved");
    expect(puts).toEqual([{ autoTriggerTokens: 500 }, { autoTriggerTokens: 700 }]);
  });

  it("does not let the re-read clobber a key a newer save acked", async () => {
    const { puts, answer, setNextGet } = holdSettingsPuts();
    const timeouts: AbortController[] = [];
    vi.spyOn(AbortSignal, "timeout").mockImplementation(() => {
      const controller = new AbortController();
      timeouts.push(controller);
      return controller.signal;
    });
    const container = await renderPanel();
    const autoTrigger = container.querySelector(`input[type="number"]`) as HTMLInputElement;

    await commitAutoTrigger(autoTrigger, "500");
    setNextGet({ autoTriggerTokens: 999 });
    await act(async () => timeouts[0].abort());
    // A newer save of the same field acks before the re-read answers; the re-read's
    // snapshot for that field is older than the ack and must be dropped.
    await commitAutoTrigger(autoTrigger, "700");
    await answer(1, 200);
    for (let i = 0; i < 5; i++) await flush();

    expect(autoTrigger.value, "the acked value stays").toBe("700");
    expect(puts).toEqual([{ autoTriggerTokens: 500 }, { autoTriggerTokens: 700 }]);
  });

  it("keeps Save failed when a stale saved-timer fires", async () => {
    vi.useFakeTimers();
    try {
      const { answer } = holdSettingsPuts();
      const container = await renderPanel();
      const ultraEngine = container.querySelector(
        `[data-testid="ultra-engine-select"]`
      ) as HTMLSelectElement;

      await act(async () => {
        fireEvent.change(ultraEngine, { target: { value: "slm" } });
      });
      await answer(0, 200);
      expect(container.textContent).toContain("saved");

      await act(async () => {
        fireEvent.change(ultraEngine, { target: { value: "heuristic" } });
      });
      await answer(1, 500);
      expect(container.textContent).toContain("saveFailed");

      // The first save's 2s clear timer fires after the failure settled; it must not wipe
      // the failure banner the user still needs to see.
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });
      expect(container.textContent, "the failure banner survives the stale timer").toContain(
        "saveFailed"
      );
    } finally {
      vi.useRealTimers();
    }
  });

  it("carries the whole contextBudget object so a pending mode change is not lost", async () => {
    const { puts, answer } = holdSettingsPuts();
    const container = await renderPanel();
    const modeSelect = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    await act(async () => {
      fireEvent.change(modeSelect, { target: { value: "floor" } });
    });
    const policySelect = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement;
    await act(async () => {
      fireEvent.change(policySelect, { target: { value: "percentage" } });
    });

    // Each PUT carries the full merged object (the persistence layer stores it as one row),
    // so the second save re-carries the still-unsaved mode change.
    expect(puts[0].contextBudget).toMatchObject({ mode: "floor" });
    expect(puts[1].contextBudget).toMatchObject({ mode: "floor", policy: "percentage" });

    await answer(0, 500);
    await answer(1, 200);
    expect(modeSelect.value).toBe("floor");
    expect(policySelect.value).toBe("percentage");
    expect(container.textContent).toContain("saveFailed");
  });

  it("keeps both contextBudget fields when mode and policy change in one turn", async () => {
    // The policy select mounts only while mode is not off. Start on a different mode so
    // both selects exist before the turn, and a stale spread cannot already be mode floor.
    const { puts } = holdSettingsPuts({
      contextBudget: { mode: "replace-autotrigger", policy: "reserve-output" },
    });
    const container = await renderPanel();
    const modeSelect = container.querySelector(
      `[data-testid="context-budget-mode-select"]`
    ) as HTMLSelectElement;
    const policySelect = container.querySelector(
      `[data-testid="context-budget-policy-select"]`
    ) as HTMLSelectElement;
    expect(policySelect, "policy select is mounted while mode is not off").toBeTruthy();

    // A controlled select commits at the end of each native event, so two fireEvents
    // re-render even inside one act() and never share a stale closure. Call both
    // handlers in that act before the commit — that is the turn that drops the first field.
    type SelectChange = (event: { target: { value: string } }) => void;
    const selectOnChange = (node: HTMLElement): SelectChange => {
      const key = Object.keys(node).find((name) => name.startsWith("__reactProps$"));
      const props = key
        ? (node as unknown as Record<string, { onChange?: SelectChange }>)[key]
        : undefined;
      if (!props?.onChange) throw new Error("select has no onChange");
      return props.onChange;
    };
    const changeMode = selectOnChange(modeSelect);
    const changePolicy = selectOnChange(policySelect);
    await act(async () => {
      changeMode({ target: { value: "floor" } });
      changePolicy({ target: { value: "percentage" } });
    });

    expect(puts[0].contextBudget).toMatchObject({ mode: "floor" });
    expect(puts[1].contextBudget).toMatchObject({ mode: "floor", policy: "percentage" });
  });

  it("rolls an engine toggle back when its engines save fails", async () => {
    const { puts, answer } = holdSettingsPuts();
    const container = await renderPanel();
    const toggle = container.querySelector(
      `[data-testid="engine-toggle-caveman"] button`
    ) as HTMLButtonElement;
    await act(async () => {
      toggle.click();
    });
    expect(puts).toHaveLength(1);
    expect(puts[0].engines).toBeTruthy();

    await answer(0, 500);
    expect(toggle.getAttribute("aria-checked"), "the toggle reverts").toBe("false");
    expect(container.textContent).toContain("saveFailed");
  });

  it("commits 1e3 as 1000 and keeps a value the field rejects", async () => {
    const { puts } = holdSettingsPuts();
    const container = await renderPanel();
    const autoTrigger = container.querySelector(`input[type="number"]`) as HTMLInputElement;

    await commitAutoTrigger(autoTrigger, "1e3");
    expect(puts, "e-notation commits its real value").toEqual([{ autoTriggerTokens: 1000 }]);
    expect(autoTrigger.value).toBe("1000");

    await commitAutoTrigger(autoTrigger, "2.5");
    expect(puts, "a decimal is not truncated into a save").toEqual([{ autoTriggerTokens: 1000 }]);
    expect(autoTrigger.value, "the rejected edit stays in the box").toBe("2.5");

    await commitAutoTrigger(autoTrigger, "200000");
    expect(puts, "a value over the field's own max saves nothing").toHaveLength(1);
    expect(autoTrigger.value).toBe("200000");
  });

  it("Escape cancels the draft instead of saving it", async () => {
    const { puts } = holdSettingsPuts();
    const container = await renderPanel();
    const autoTrigger = container.querySelector(`input[type="number"]`) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(autoTrigger, { target: { value: "500" } });
    });
    await act(async () => {
      fireEvent.keyDown(autoTrigger, { key: "Escape" });
    });
    expect(puts, "Escape saves nothing").toEqual([]);
    expect(autoTrigger.value, "the box returns to the current value").toBe("0");

    await act(async () => {
      fireEvent.blur(autoTrigger);
    });
    expect(puts, "the blur after Escape has nothing to save").toEqual([]);
  });
});
