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
let AutoComboCatalog: React.ComponentType<{ onComboCreated?: (comboId: string) => void }>;

describe("AutoComboCatalog", { timeout: 60_000 }, () => {
  beforeAll(async () => {
    ({ default: AutoComboCatalog } =
      await import("@/app/(dashboard)/dashboard/combos/AutoComboCatalog"));
  }, 180_000);

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
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
});
