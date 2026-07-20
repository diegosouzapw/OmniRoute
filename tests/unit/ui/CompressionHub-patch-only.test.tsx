// @vitest-environment jsdom
/**
 * Guards fix for issue #6039:
 * CompressionHub was sending the full merged settings object to PUT
 * /api/settings/compression instead of only the patch. The API schema uses
 * .strict() Zod validation, so any field present in CompressionConfig but
 * absent from compressionSettingsUpdateSchema (e.g. contextBudget, or
 * stackedPipeline steps using engines not yet in the discriminated union)
 * would cause a 400 validation failure — making switching to any non-default
 * combo fail silently.
 *
 * Fix: send `patch` (the caller-supplied partial update) instead of `next`
 * (the full optimistically-merged state).
 */

import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

// Stub next/navigation (not used by CompressionHub but required by module graph)
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
}));

// Track all fetch calls
const fetchCalls: { url: string; init: RequestInit }[] = [];
const mockFetch = vi.fn().mockImplementation((url: string, init: RequestInit) => {
  fetchCalls.push({ url, init });
  return Promise.resolve({
    ok: true,
    json: async () => ({ combos: [] }),
  });
});
vi.stubGlobal("fetch", mockFetch);

// Import after mocks are in place
import CompressionHub from "../../../src/app/(dashboard)/dashboard/context/combos/CompressionHub";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getLastPutBody(): Record<string, unknown> | null {
  const putCall = [...fetchCalls].reverse().find(
    (c) => c.init?.method === "PUT"
  );
  if (!putCall) return null;
  return JSON.parse(putCall.init.body as string);
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("CompressionHub — PUT sends patch only, not full settings", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    fetchCalls.length = 0;
    mockFetch.mockClear();

    // GET /api/settings/compression returns a config with extra fields that
    // are NOT in compressionSettingsUpdateSchema (simulates contextBudget etc.)
    mockFetch.mockImplementationOnce((_url: string) =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          enabled: true,
          defaultMode: "lite",
          activeComboId: null,
          contextEditing: { enabled: false },
          // Field present in CompressionConfig but NOT in the update schema:
          contextBudget: { mode: "floor", floorTokens: 4096 },
          // Engine step type not in stackedPipelineStepSchema discriminated union:
          stackedPipeline: [
            { engine: "headroom", intensity: "standard" },
            { engine: "caveman", intensity: "lite" },
          ],
        }),
      })
    );

    // GET /api/settings/compression/combos
    mockFetch.mockImplementationOnce((_url: string) =>
      Promise.resolve({
        ok: true,
        json: async () => ({ combos: [{ id: "c1", name: "My Combo", pipeline: [] }] }),
      })
    );

    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => { root.unmount(); });
    document.body.removeChild(container);
  });

  it("sends only the changed field when activeComboId is updated", async () => {
    await act(async () => {
      root.render(<CompressionHub />);
    });

    // Find the combo selector and change it to "c1"
    const select = container.querySelector("select");
    expect(select).not.toBeNull();

    await act(async () => {
      if (select) {
        Object.defineProperty(select, "value", { writable: true, value: "c1" });
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    const body = getLastPutBody();
    expect(body).not.toBeNull();

    // Must contain the changed field
    expect(body).toHaveProperty("activeComboId", "c1");

    // Must NOT contain fields from the full settings that would fail strict
    // schema validation (contextBudget, stackedPipeline with unknown engines)
    expect(body).not.toHaveProperty("contextBudget");
    expect(body).not.toHaveProperty("stackedPipeline");
    expect(body).not.toHaveProperty("enabled");
    expect(body).not.toHaveProperty("defaultMode");
  });

  it("sends only the toggle field when contextEditing is toggled", async () => {
    await act(async () => {
      root.render(<CompressionHub />);
    });

    // Find the context editing toggle button
    const toggleButtons = container.querySelectorAll("button[role='switch']");
    expect(toggleButtons.length).toBeGreaterThan(0);

    await act(async () => {
      (toggleButtons[0] as HTMLButtonElement).click();
    });

    const body = getLastPutBody();
    expect(body).not.toBeNull();

    // Should only include contextEditing, not the full settings
    expect(body).toHaveProperty("contextEditing");
    expect(body).not.toHaveProperty("contextBudget");
    expect(body).not.toHaveProperty("stackedPipeline");
  });
});
