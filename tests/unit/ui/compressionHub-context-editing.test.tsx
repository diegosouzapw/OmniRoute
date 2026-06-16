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

const ENGINES = [{ id: "rtk", name: "RTK", stackPriority: 10, stable: true }];

function enginePayload() {
  return {
    engines: ENGINES.map((e) => ({
      id: e.id,
      name: e.name,
      description: `${e.name} description`,
      icon: "compress",
      stackable: true,
      stackPriority: e.stackPriority,
      metadata: { stable: e.stable },
      configSchema: [],
    })),
  };
}

interface FetchCall {
  url: string;
  method: string;
  body: unknown;
}

function setupFetchMock(opts: { contextEditingEnabled?: boolean }): FetchCall[] {
  const { contextEditingEnabled = false } = opts;
  const calls: FetchCall[] = [];
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = (init?.method ?? "GET").toUpperCase();
      let parsedBody: unknown;
      if (typeof init?.body === "string") {
        try {
          parsedBody = JSON.parse(init.body);
        } catch {
          parsedBody = init.body;
        }
      }
      calls.push({ url, method, body: parsedBody });

      if (url.includes("/api/settings/compression")) {
        return json({
          enabled: true,
          defaultMode: "stacked",
          contextEditing: { enabled: contextEditingEnabled },
        });
      }
      if (url.includes("/api/compression/engines")) {
        return json(enginePayload());
      }
      if (url.includes("/api/context/combos/default")) {
        return json({ id: "default-caveman", name: "Standard Savings", pipeline: [] });
      }
      if (url.includes("/api/context/combos")) {
        return json({ combos: [] });
      }
      if (url.includes("/api/combos")) {
        return json({ combos: [] });
      }
      if (url.includes("/api/compression/language-packs")) {
        return json({ packs: [] });
      }
      return json({}, 404);
    }
  );

  return calls;
}

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("CompressionHub — Context Editing", () => {
  it("renders the delegated-compression section with the Context Editing toggle", async () => {
    setupFetchMock({ contextEditingEnabled: false });
    const { default: CompressionHub } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionHub />);
    });
    await flush();

    const text = container.textContent ?? "";
    expect(text).toContain("Compressão delegada ao provedor");
    expect(text).toContain("Context Editing (Claude)");
  });

  it("renders the Claude-only delegated note", async () => {
    setupFetchMock({ contextEditingEnabled: false });
    const { default: CompressionHub } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionHub />);
    });
    await flush();

    const text = container.textContent ?? "";
    expect(text).toContain("apenas para Claude");
    expect(text).toContain("não reescrevemos a mensagem");
  });

  it("PUTs contextEditing: { enabled: true } when the toggle is flipped on", async () => {
    const calls = setupFetchMock({ contextEditingEnabled: false });
    const { default: CompressionHub } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionHub />);
    });
    await flush();

    const toggle = container.querySelector(
      'button[role="switch"][aria-label="Context Editing"]'
    ) as HTMLButtonElement | null;
    expect(toggle).not.toBeNull();
    expect(toggle?.getAttribute("aria-checked")).toBe("false");

    await act(async () => {
      toggle?.click();
    });
    await flush();

    const put = calls.find(
      (c) => c.method === "PUT" && c.url.includes("/api/settings/compression")
    );
    expect(put).toBeTruthy();
    expect((put?.body as { contextEditing?: { enabled?: boolean } })?.contextEditing).toEqual({
      enabled: true,
    });
  });
});
