// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { AUTO_COMBO_TEMPLATES } from "@/domain/assessment/types";

// Minimal i18n stub — return interpolated value so {count} works.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values && typeof values.count !== "undefined") {
      return `${values.count} ${key}`;
    }
    return key;
  },
}));

// Minimal next/link stub — renders as a plain anchor element.
vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
}));

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => {
    container.remove();
  });
  return container;
}

// The component pulls a heavy dependency graph (Card + i18n), so the cold
// module import takes ~20s of transform overhead — and well past 60s when the
// full vitest UI suite runs its 20 workers in parallel. That cost used to be
// charged to whichever test imported first: it blew the per-test timeout, and
// the abort landed *inside* an open `act()`, leaking an unbalanced act scope
// that then failed every remaining test in the file in ~20ms ("You seem to have
// overlapping act() calls"). Paying the import once here, on the hook's own
// budget, keeps each test's timeout covering only render + assertions.
let AutoComboCatalog: React.ComponentType<{
  onComboCreated?: (comboId: string) => void;
  onTestCombo?: (combo: { name: string }) => void;
  testingName?: string | null;
}>;

// Mirrors the real /api/combos/auto response: every curated template id plus
// the variants, category:tier combos and model families the static template
// list never showed.
const LIVE_CATALOG = {
  combos: [
    { id: "auto", name: "Auto", kind: "variant", candidateCount: 12 },
    { id: "auto/coding", name: "Auto Coding", kind: "variant", candidateCount: 5 },
    { id: "auto/fast", name: "Auto Fast", kind: "variant", candidateCount: 4 },
    ...AUTO_COMBO_TEMPLATES.map((tpl) => ({
      id: tpl.name,
      name: tpl.displayName,
      kind: "template",
      candidateCount: 4,
    })),
    { id: "auto/coding:fast", name: "Auto Coding Fast", kind: "category", candidateCount: 2 },
    { id: "auto/gemini", name: "Auto Gemini", kind: "family", candidateCount: 3 },
    { id: "auto/qwen", name: "Auto Qwen", kind: "family", candidateCount: 0 },
    // The real route dedupes by id (seenIds): auto/coding and auto/fast are
    // emitted once as variants even though they are also template ids.
  ].filter((entry, index, all) => all.findIndex((other) => other.id === entry.id) === index),
};

function stubAutoCatalogFetch(payload: unknown = LIVE_CATALOG, ok = true) {
  globalThis.fetch = vi.fn(async (input) => {
    const url = typeof input === "string" ? input : String(input);
    if (url.includes("/api/combos/duplicate")) {
      return new Response(JSON.stringify({ id: "static-gemini", name: "static-gemini" }), {
        status: 201,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(JSON.stringify(payload), {
      status: ok ? 200 : 500,
      headers: { "content-type": "application/json" },
    });
  }) as unknown as typeof fetch;
}

function findCard(container: HTMLElement, id: string): HTMLElement | null {
  const code = [...container.querySelectorAll("code")].find((el) => el.textContent === id);
  return (code?.closest(".rounded-lg") as HTMLElement | null) ?? null;
}

async function expand(container: HTMLElement) {
  await act(async () => {
    (container.querySelector("button") as HTMLButtonElement | null)?.click();
    // Flush the lazy /api/combos/auto load — undici's Response.json() resolves
    // on a macrotask, so a microtask-only flush can leave liveItems unset.
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe("AutoComboCatalog", { timeout: 60_000 }, () => {
  const realFetch = globalThis.fetch;

  beforeAll(async () => {
    ({ default: AutoComboCatalog } =
      await import("@/app/(dashboard)/dashboard/combos/AutoComboCatalog"));
  }, 180_000);

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    stubAutoCatalogFetch();
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
  });

  it("renders the header with translated title and template-count badge", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog />);
    });
    expect(container.textContent).toContain("autoCatalogTitle");
    expect(container.textContent).toContain(
      `${AUTO_COMBO_TEMPLATES.length} autoCatalogTemplateCount`
    );
  });

  it("stays collapsed by default — no template rows in the DOM", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog />);
    });
    // Absence alone is vacuously true on a container that never mounted — this
    // test stayed green through the act-leak that failed the other four. Pin the
    // header first so "no rows" can only mean collapsed, never "nothing rendered".
    expect(container.textContent ?? "").toContain("autoCatalogTitle");
    const first = AUTO_COMBO_TEMPLATES[0];
    expect(container.textContent ?? "").not.toContain(first.name);
  });

  it("expands when toggled and lists every template name", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog />);
    });
    const toggle = container.querySelector("button");
    expect(toggle).toBeTruthy();
    await act(async () => {
      toggle?.click();
    });
    for (const tpl of AUTO_COMBO_TEMPLATES) {
      expect(container.textContent ?? "").toContain(tpl.name);
    }
  });

  it("flips the toggle aria-label between expand and collapse", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog />);
    });
    const toggle = container.querySelector("button");
    expect(toggle?.getAttribute("aria-label")).toBe("autoCatalogExpand");
    expect(toggle?.getAttribute("aria-expanded")).toBe("false");
    await act(async () => {
      toggle?.click();
    });
    expect(toggle?.getAttribute("aria-label")).toBe("autoCatalogCollapse");
    expect(toggle?.getAttribute("aria-expanded")).toBe("true");
  });

  it("renders the strategy badge for each template when expanded", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog />);
    });
    await act(async () => {
      (container.querySelector("button") as HTMLButtonElement | null)?.click();
    });
    const strategies = new Set(AUTO_COMBO_TEMPLATES.map((t) => t.strategy));
    for (const s of strategies) {
      expect(container.textContent ?? "").toContain(s);
    }
  });

  it("loads the live catalog on expand — families and category:tiers the static list lacks", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog />);
    });
    await expand(container);
    expect(globalThis.fetch).toHaveBeenCalledWith("/api/combos/auto", expect.anything());
    for (const id of ["auto", "auto/coding", "auto/coding:fast", "auto/gemini", "auto/qwen"]) {
      expect(container.textContent ?? "").toContain(id);
    }
    expect(container.textContent ?? "").toContain(
      `${LIVE_CATALOG.combos.length} autoCatalogComboCount`
    );
  });

  it("keeps the static template fallback when the live endpoint fails", async () => {
    stubAutoCatalogFetch(LIVE_CATALOG, false);
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog />);
    });
    await expand(container);
    for (const tpl of AUTO_COMBO_TEMPLATES) {
      expect(container.textContent ?? "").toContain(tpl.name);
    }
    expect(container.textContent ?? "").not.toContain("auto/gemini");
  });

  it("renders Control Center link, test and copy actions on every auto combo", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog onTestCombo={vi.fn()} />);
    });
    await expand(container);

    const geminiCard = findCard(container, "auto/gemini");
    expect(geminiCard).toBeTruthy();
    const ccLink = geminiCard?.querySelector("a[href]");
    expect(ccLink?.getAttribute("href")).toBe(
      `/dashboard/combos/${encodeURIComponent("auto/gemini")}`
    );
    expect(geminiCard?.querySelector('button[title="testCombo"]')).toBeTruthy();
    expect(geminiCard?.querySelector('button[title="duplicateAutoComboTitle"]')).toBeTruthy();
    expect(geminiCard?.textContent).toContain("3 autoCatalogCandidates");

    // Bare `auto` cannot be snapshotted by the duplicate endpoint — no copy button.
    const autoCard = findCard(container, "auto");
    expect(autoCard).toBeTruthy();
    expect(autoCard?.querySelector('button[title="duplicateAutoComboTitle"]')).toBeNull();

    // A family with no live candidates shows the empty-state chip.
    const qwenCard = findCard(container, "auto/qwen");
    expect(qwenCard?.textContent).toContain("autoCatalogNoCandidates");
  });

  it("calls onTestCombo with the auto combo id when the test action is clicked", async () => {
    const onTestCombo = vi.fn();
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog onTestCombo={onTestCombo} testingName={null} />);
    });
    await expand(container);

    const geminiCard = findCard(container, "auto/gemini");
    const testButton = geminiCard?.querySelector(
      'button[title="testCombo"]'
    ) as HTMLButtonElement | null;
    expect(testButton).toBeTruthy();
    await act(async () => {
      testButton?.click();
    });
    expect(onTestCombo).toHaveBeenCalledWith({ name: "auto/gemini" });
  });

  it("shows the running spinner on the entry being tested", async () => {
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog onTestCombo={() => {}} testingName="auto/gemini" />);
    });
    await expand(container);
    const geminiCard = findCard(container, "auto/gemini");
    const testButton = geminiCard?.querySelector('button[title="testCombo"]');
    expect(testButton?.textContent).toContain("progress_activity");
    expect((testButton as HTMLButtonElement | null)?.disabled).toBe(true);
  });

  it("duplicates non-template auto combos with the auto strategy", async () => {
    const onComboCreated = vi.fn();
    const confirmSpy = vi.fn(() => true);
    vi.stubGlobal("confirm", confirmSpy);
    vi.stubGlobal("alert", vi.fn());

    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog onComboCreated={onComboCreated} />);
    });
    await expand(container);

    const geminiCard = findCard(container, "auto/gemini");
    const copyButton = geminiCard?.querySelector(
      'button[title="duplicateAutoComboTitle"]'
    ) as HTMLButtonElement | null;
    await act(async () => {
      copyButton?.click();
    });

    const duplicateCall = vi
      .mocked(globalThis.fetch)
      .mock.calls.find(([input]) => String(input).includes("/api/combos/duplicate"));
    expect(duplicateCall).toBeTruthy();
    const body = JSON.parse(String((duplicateCall?.[1] as RequestInit | undefined)?.body));
    expect(body).toEqual({ name: "auto/gemini", strategy: "auto" });
    expect(onComboCreated).toHaveBeenCalledWith("static-gemini");
  });

  it("duplicates curated templates with their authored strategy", async () => {
    vi.stubGlobal(
      "confirm",
      vi.fn(() => true)
    );
    vi.stubGlobal("alert", vi.fn());

    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoComboCatalog />);
    });
    await expand(container);

    const tpl = AUTO_COMBO_TEMPLATES[0];
    const card = findCard(container, tpl.name);
    const copyButton = card?.querySelector(
      'button[title="duplicateAutoComboTitle"]'
    ) as HTMLButtonElement | null;
    await act(async () => {
      copyButton?.click();
    });

    const duplicateCall = vi
      .mocked(globalThis.fetch)
      .mock.calls.find(([input]) => String(input).includes("/api/combos/duplicate"));
    const body = JSON.parse(String((duplicateCall?.[1] as RequestInit | undefined)?.body));
    expect(body).toEqual({ name: tpl.name, strategy: tpl.strategy });
  });
});
