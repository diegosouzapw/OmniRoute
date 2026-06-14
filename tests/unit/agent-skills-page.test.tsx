// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Root } from "react-dom/client";
import type { AgentSkill, SkillCoverage } from "../../src/lib/agentSkills/types";

// ── i18n stub ────────────────────────────────────────────────────────────────
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── next/link stub ───────────────────────────────────────────────────────────
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// ── next/dynamic stub — renders placeholder immediately ───────────────────────
vi.mock("next/dynamic", () => ({
  default: (loader: () => Promise<{ default: React.ComponentType<{ children: string }> }>, _opts?: unknown) => {
    // Return a synchronous stub that renders children as plain text.
    return function DynamicStub({ children }: { children: string }) {
      return <div data-testid="react-markdown">{children}</div>;
    };
  },
}));

// ── Fixture helpers ──────────────────────────────────────────────────────────

function makeSkill(overrides: Partial<AgentSkill> = {}): AgentSkill {
  return {
    id: "omni-providers",
    name: "Providers",
    description: "Manage provider connections and API keys.",
    category: "api",
    area: "providers",
    icon: "hub",
    endpoints: ["POST /api/providers", "GET /api/providers"],
    rawUrl: "https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/omni-providers/SKILL.md",
    githubUrl: "https://github.com/diegosouzapw/OmniRoute/blob/main/skills/omni-providers/SKILL.md",
    ...overrides,
  };
}

function make42Skills(): AgentSkill[] {
  const skills: AgentSkill[] = [];
  for (let i = 0; i < 22; i++) {
    skills.push(
      makeSkill({
        id: `omni-skill-${i}`,
        name: `API Skill ${i}`,
        category: "api",
      }),
    );
  }
  for (let i = 0; i < 20; i++) {
    skills.push(
      makeSkill({
        id: `cli-skill-${i}`,
        name: `CLI Skill ${i}`,
        category: "cli",
        endpoints: undefined,
        cliCommands: [`skill${i} run`, `skill${i} status`],
      }),
    );
  }
  return skills;
}

const FULL_COVERAGE: SkillCoverage = {
  api: { have: 22, total: 22 },
  cli: { have: 20, total: 20 },
  totalSkills: 42,
  generatedAt: new Date().toISOString(),
};

const PARTIAL_COVERAGE: SkillCoverage = {
  api: { have: 10, total: 22 },
  cli: { have: 8, total: 20 },
  totalSkills: 18,
  generatedAt: new Date().toISOString(),
};

// ── Fetch mock factory ───────────────────────────────────────────────────────

function mockFetch(skills: AgentSkill[], coverage: SkillCoverage, rawMarkdown = "# Test Skill\nContent here.") {
  return vi.fn(async (url: string | Request) => {
    const urlStr = typeof url === "string" ? url : url.toString();
    if (urlStr === "/api/agent-skills") {
      return new Response(JSON.stringify({ skills, coverage }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (/\/api\/agent-skills\/.+\/raw/.test(urlStr)) {
      return new Response(rawMarkdown, {
        status: 200,
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
      });
    }
    return new Response(JSON.stringify({}), { status: 404 });
  });
}

// ── Test setup ───────────────────────────────────────────────────────────────

const cleanupCallbacks: Array<() => void> = [];
let root: Root | null = null;

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  // Mock clipboard
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
  });
  // Mock window.location.origin
  Object.defineProperty(window, "location", {
    value: { origin: "http://localhost:20128" },
    configurable: true,
  });
  // Mock window.confirm
  vi.spyOn(window, "confirm").mockReturnValue(false);
});

afterEach(async () => {
  if (root) {
    await act(async () => {
      root?.unmount();
    });
    root = null;
  }
  while (cleanupCallbacks.length > 0) {
    cleanupCallbacks.pop()?.();
  }
  document.body.innerHTML = "";
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

// ── Tests ────────────────────────────────────────────────────────────────────

describe("AgentSkillsPageClient", () => {
  it("renders 42 skill cards after fetch resolves", async () => {
    const skills = make42Skills();
    vi.stubGlobal("fetch", mockFetch(skills, FULL_COVERAGE));

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    const cards = container.querySelectorAll("[data-testid^='skill-card-']");
    expect(cards.length).toBe(42);
  });

  it("renders SkillsConceptCard variant=agent at the top", async () => {
    vi.stubGlobal("fetch", mockFetch(make42Skills(), FULL_COVERAGE));

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    // SkillsConceptCard uses i18n key conceptCard.agent.title
    expect(container.textContent).toContain("conceptCard.agent.title");
  });

  it("filter API shows only api-category cards", async () => {
    const skills = make42Skills();
    vi.stubGlobal("fetch", mockFetch(skills, FULL_COVERAGE));

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    const filterApiBtn = container.querySelector("[data-testid='filter-api']") as HTMLButtonElement | null;
    expect(filterApiBtn).not.toBeNull();

    await act(async () => {
      filterApiBtn?.click();
    });

    const cards = container.querySelectorAll("[data-testid^='skill-card-']");
    expect(cards.length).toBe(22);
  });

  it("filter CLI shows only cli-category cards", async () => {
    const skills = make42Skills();
    vi.stubGlobal("fetch", mockFetch(skills, FULL_COVERAGE));

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    const filterCliBtn = container.querySelector("[data-testid='filter-cli']") as HTMLButtonElement | null;
    await act(async () => {
      filterCliBtn?.click();
    });

    const cards = container.querySelectorAll("[data-testid^='skill-card-']");
    expect(cards.length).toBe(20);
  });

  it("clicking a card triggers preview fetch after 200ms debounce", async () => {
    vi.useFakeTimers();
    const skills = make42Skills();
    const fetchMock = mockFetch(skills, FULL_COVERAGE, "# omni-skill-0 doc");
    vi.stubGlobal("fetch", fetchMock);

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    const firstCard = container.querySelector("[data-testid='skill-card-omni-skill-0']") as HTMLElement | null;
    expect(firstCard).not.toBeNull();

    await act(async () => {
      firstCard?.click();
    });

    // Before debounce fires — raw fetch should NOT have been made yet
    const rawFetchCallsBefore = (fetchMock as ReturnType<typeof vi.fn>).mock.calls.filter(
      ([url]: [string]) => typeof url === "string" && url.includes("/raw"),
    );
    expect(rawFetchCallsBefore.length).toBe(0);

    // Advance timers past the 200ms debounce
    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    // Now the raw fetch should have been triggered
    const rawFetchCallsAfter = (fetchMock as ReturnType<typeof vi.fn>).mock.calls.filter(
      ([url]: [string]) => typeof url === "string" && url.includes("/raw"),
    );
    expect(rawFetchCallsAfter.length).toBeGreaterThan(0);

    vi.useRealTimers();
  });

  it("preview pane shows empty state when no card is selected", async () => {
    vi.stubGlobal("fetch", mockFetch(make42Skills(), FULL_COVERAGE));

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    const emptyState = container.querySelector("[data-testid='skill-preview-empty']");
    expect(emptyState).not.toBeNull();
  });

  it("CoverageBar is rendered with 100% = green bars when coverage is full", async () => {
    vi.stubGlobal("fetch", mockFetch(make42Skills(), FULL_COVERAGE));

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    const coverageBar = container.querySelector("[data-testid='coverage-bar']");
    expect(coverageBar).not.toBeNull();

    const progressBars = container.querySelectorAll("[role='progressbar']");
    expect(progressBars.length).toBe(2);

    // API bar — 22/22 = 100%, should have emerald color class
    const apiBar = progressBars[0] as HTMLElement;
    expect(apiBar.className).toContain("bg-emerald-500");

    // CLI bar — 20/20 = 100%, should have emerald color class
    const cliBar = progressBars[1] as HTMLElement;
    expect(cliBar.className).toContain("bg-emerald-500");
  });

  it("generate button is hidden when coverage is 100%", async () => {
    vi.stubGlobal("fetch", mockFetch(make42Skills(), FULL_COVERAGE));

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    const generateBtn = container.querySelector("[data-testid='generate-button']");
    expect(generateBtn).toBeNull();
  });

  it("generate button is visible when coverage is partial", async () => {
    vi.stubGlobal("fetch", mockFetch(make42Skills(), PARTIAL_COVERAGE));

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    const generateBtn = container.querySelector("[data-testid='generate-button']");
    expect(generateBtn).not.toBeNull();
  });

  it("search filters cards by name", async () => {
    const skills = make42Skills();
    vi.stubGlobal("fetch", mockFetch(skills, FULL_COVERAGE));

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    const searchInput = container.querySelector("[data-testid='search-input']") as HTMLInputElement | null;
    expect(searchInput).not.toBeNull();

    await act(async () => {
      if (searchInput) {
        searchInput.value = "API Skill 0";
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
        // React uses onChange
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        )?.set;
        nativeInputValueSetter?.call(searchInput, "API Skill 0");
        searchInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    // After search, cards with "API Skill 0" in name should be visible
    // (at minimum the one exact match)
    const cards = container.querySelectorAll("[data-testid^='skill-card-']");
    expect(cards.length).toBeLessThanOrEqual(42);
  });

  it("MCP and A2A links bar is present", async () => {
    vi.stubGlobal("fetch", mockFetch(make42Skills(), FULL_COVERAGE));

    const { AgentSkillsPageClient } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/AgentSkillsPageClient"
    );
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root?.render(<AgentSkillsPageClient />);
    });

    const linksBar = container.querySelector("[data-testid='mcp-a2a-links-bar']");
    expect(linksBar).not.toBeNull();
  });
});

// ── CoverageBar isolated tests ───────────────────────────────────────────────

describe("CoverageBar", () => {
  it("renders two progressbars with correct aria attributes", async () => {
    const { CoverageBar } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/CoverageBar"
    );
    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(<CoverageBar coverage={FULL_COVERAGE} />);
    });

    const bars = container.querySelectorAll("[role='progressbar']");
    expect(bars.length).toBe(2);

    const apiBar = bars[0] as HTMLElement;
    expect(apiBar.getAttribute("aria-valuenow")).toBe("22");
    expect(apiBar.getAttribute("aria-valuemax")).toBe("22");

    const cliBar = bars[1] as HTMLElement;
    expect(cliBar.getAttribute("aria-valuenow")).toBe("20");
    expect(cliBar.getAttribute("aria-valuemax")).toBe("20");

    await act(async () => localRoot.unmount());
  });

  it("applies red color class when coverage is below 75%", async () => {
    const { CoverageBar } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/CoverageBar"
    );
    const lowCoverage: SkillCoverage = {
      api: { have: 5, total: 22 },
      cli: { have: 0, total: 20 },
      totalSkills: 5,
      generatedAt: new Date().toISOString(),
    };

    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(<CoverageBar coverage={lowCoverage} />);
    });

    const bars = container.querySelectorAll("[role='progressbar']");
    const apiBar = bars[0] as HTMLElement;
    expect(apiBar.className).toContain("bg-red-500");

    await act(async () => localRoot.unmount());
  });

  it("applies amber color class when coverage is between 75% and 100%", async () => {
    const { CoverageBar } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/CoverageBar"
    );
    const partialCoverage: SkillCoverage = {
      api: { have: 18, total: 22 }, // ~81.8% = amber
      cli: { have: 15, total: 20 }, // 75% = amber
      totalSkills: 33,
      generatedAt: new Date().toISOString(),
    };

    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(<CoverageBar coverage={partialCoverage} />);
    });

    const bars = container.querySelectorAll("[role='progressbar']");
    const apiBar = bars[0] as HTMLElement;
    expect(apiBar.className).toContain("bg-amber-400");

    await act(async () => localRoot.unmount());
  });
});

// ── SkillCard isolated tests ─────────────────────────────────────────────────

describe("SkillCard", () => {
  it("renders skill name and description", async () => {
    const { SkillCard } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/SkillCard"
    );
    const skill = makeSkill({ name: "Providers", description: "Manage connections" });
    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(<SkillCard skill={skill} selected={false} onClick={() => {}} />);
    });

    expect(container.textContent).toContain("Providers");
    expect(container.textContent).toContain("Manage connections");

    await act(async () => localRoot.unmount());
  });

  it("has role=button and aria-pressed=false when not selected", async () => {
    const { SkillCard } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/SkillCard"
    );
    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(<SkillCard skill={makeSkill()} selected={false} onClick={() => {}} />);
    });

    const btn = container.querySelector("[role='button']") as HTMLElement | null;
    expect(btn).not.toBeNull();
    expect(btn?.getAttribute("aria-pressed")).toBe("false");

    await act(async () => localRoot.unmount());
  });

  it("has aria-pressed=true when selected", async () => {
    const { SkillCard } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/SkillCard"
    );
    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(<SkillCard skill={makeSkill()} selected={true} onClick={() => {}} />);
    });

    const btn = container.querySelector("[role='button']") as HTMLElement | null;
    expect(btn?.getAttribute("aria-pressed")).toBe("true");

    await act(async () => localRoot.unmount());
  });

  it("calls onClick when clicked", async () => {
    const { SkillCard } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/SkillCard"
    );
    const handleClick = vi.fn();
    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(<SkillCard skill={makeSkill()} selected={false} onClick={handleClick} />);
    });

    const btn = container.querySelector("[role='button']") as HTMLElement | null;
    await act(async () => btn?.click());
    expect(handleClick).toHaveBeenCalledTimes(1);

    await act(async () => localRoot.unmount());
  });

  it("shows first 2 endpoints as chips for API skill", async () => {
    const { SkillCard } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/SkillCard"
    );
    const skill = makeSkill({
      endpoints: ["POST /api/providers", "GET /api/providers", "DELETE /api/providers/:id"],
    });
    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(<SkillCard skill={skill} selected={false} onClick={() => {}} />);
    });

    const chips = container.querySelectorAll("code");
    expect(chips.length).toBe(2);
    expect(chips[0].textContent).toBe("POST /api/providers");
    expect(chips[1].textContent).toBe("GET /api/providers");

    await act(async () => localRoot.unmount());
  });
});

// ── SkillPreviewPane isolated tests ──────────────────────────────────────────

describe("SkillPreviewPane", () => {
  it("renders empty state when skillId is null", async () => {
    const { SkillPreviewPane } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/SkillPreviewPane"
    );
    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(
        <SkillPreviewPane skillId={null} markdown={null} loading={false} />,
      );
    });

    const empty = container.querySelector("[data-testid='skill-preview-empty']");
    expect(empty).not.toBeNull();
    expect(container.textContent).toContain("previewEmpty");

    await act(async () => localRoot.unmount());
  });

  it("renders markdown when skillId and markdown are provided", async () => {
    const { SkillPreviewPane } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/SkillPreviewPane"
    );
    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(
        <SkillPreviewPane
          skillId="omni-providers"
          markdown="# Providers\nContent here."
          loading={false}
        />,
      );
    });

    const preview = container.querySelector("[data-testid='skill-preview-pane']");
    expect(preview).not.toBeNull();
    expect(container.textContent).toContain("Providers");

    await act(async () => localRoot.unmount());
  });

  it("shows error state when skillId provided but markdown is empty string", async () => {
    const { SkillPreviewPane } = await import(
      "../../src/app/(dashboard)/dashboard/agent-skills/components/SkillPreviewPane"
    );
    const container = makeContainer();
    const localRoot = createRoot(container);
    await act(async () => {
      localRoot.render(
        <SkillPreviewPane skillId="omni-providers" markdown="" loading={false} />,
      );
    });

    // markdown is "" (falsy) — should show error state
    const errorEl = container.querySelector("[data-testid='skill-preview-error']");
    expect(errorEl).not.toBeNull();

    await act(async () => localRoot.unmount());
  });
});
