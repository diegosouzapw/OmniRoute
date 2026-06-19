// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// ── Helpers ───────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

function mountInContainer(ui: React.ReactElement): HTMLElement {
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

// ── Mock fetch ────────────────────────────────────────────────────────────

function makeEnginePayload(engines: Array<{ id: string; name: string }>) {
  return {
    engines: engines.map(({ id, name }) => ({
      id,
      name,
      description: "",
      icon: "table_rows",
      stackable: true,
      stackPriority: 15,
      metadata: {},
      configSchema: [],
    })),
  };
}

const ANALYTICS_PAYLOAD = {
  runs: 0,
  tokensSaved: 0,
  avgSavingsPercent: 0,
  days: 7,
};

function setupFetchMock(engines: Array<{ id: string; name: string }>) {
  vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
    const url = input.toString();
    if (url.includes("/api/compression/engines")) {
      return new Response(JSON.stringify(makeEnginePayload(engines)), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/api/context/combos")) {
      return new Response(JSON.stringify({ pipeline: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/api/context/analytics/engine")) {
      return new Response(JSON.stringify(ANALYTICS_PAYLOAD), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({}), { status: 404 });
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("HeadroomPage", () => {
  it("mounts without throwing and renders the engine name", async () => {
    setupFetchMock([{ id: "headroom", name: "Headroom" }]);
    const { default: HeadroomPage } =
      await import("../../../src/app/(dashboard)/dashboard/context/headroom/page");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<HeadroomPage />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(container).toBeTruthy();
    expect(container.textContent).toContain("Headroom");
  });
});

describe("SessionDedupPage", () => {
  it("mounts without throwing and renders the engine name", async () => {
    setupFetchMock([{ id: "session-dedup", name: "Session Dedup" }]);
    const { default: SessionDedupPage } =
      await import("../../../src/app/(dashboard)/dashboard/context/session-dedup/page");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<SessionDedupPage />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(container).toBeTruthy();
    expect(container.textContent).toContain("Session Dedup");
  });
});

describe("CcrPage", () => {
  it("mounts without throwing and renders the engine name", async () => {
    setupFetchMock([{ id: "ccr", name: "CCR" }]);
    const { default: CcrPage } =
      await import("../../../src/app/(dashboard)/dashboard/context/ccr/page");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CcrPage />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(container).toBeTruthy();
    expect(container.textContent).toContain("CCR");
  });
});

describe("LlmlinguaPage", () => {
  it("mounts without throwing and renders the engine name", async () => {
    setupFetchMock([{ id: "llmlingua", name: "LLMLingua" }]);
    const { default: LlmlinguaPage } =
      await import("../../../src/app/(dashboard)/dashboard/context/llmlingua/page");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<LlmlinguaPage />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(container).toBeTruthy();
    expect(container.textContent).toContain("LLMLingua");
  });
});

describe("LitePage", () => {
  it("mounts without throwing and renders the engine name", async () => {
    setupFetchMock([{ id: "lite", name: "Lite" }]);
    const { default: LitePage } =
      await import("../../../src/app/(dashboard)/dashboard/context/lite/page");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<LitePage />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(container).toBeTruthy();
    expect(container.textContent).toContain("Lite");
  });
});

describe("AggressivePage", () => {
  it("mounts without throwing and renders the engine name", async () => {
    setupFetchMock([{ id: "aggressive", name: "Aggressive" }]);
    const { default: AggressivePage } =
      await import("../../../src/app/(dashboard)/dashboard/context/aggressive/page");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<AggressivePage />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(container).toBeTruthy();
    expect(container.textContent).toContain("Aggressive");
  });
});

describe("UltraPage", () => {
  it("mounts without throwing and renders the engine name", async () => {
    setupFetchMock([{ id: "ultra", name: "Ultra" }]);
    const { default: UltraPage } =
      await import("../../../src/app/(dashboard)/dashboard/context/ultra/page");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<UltraPage />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(container).toBeTruthy();
    expect(container.textContent).toContain("Ultra");
  });
});
