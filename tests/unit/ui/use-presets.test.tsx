// @vitest-environment jsdom
// tests/unit/ui/use-presets.test.tsx
// Runs via Vitest (vitest.config.ts)
// Uses React DOM directly (no @testing-library/dom dep required).
import React, { act, useRef } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  usePresets,
} from "../../../src/app/(dashboard)/dashboard/playground/hooks/usePresets";
import type { PlaygroundPresetListItem } from "../../../src/shared/schemas/playground";

// ─── Minimal hook test harness ────────────────────────────────────────────────

type HookResult<T> = { current: T };

function mountHook<T>(useHook: () => T): {
  hookRef: HookResult<T>;
  unmount: () => void;
} {
  const hookRef: HookResult<T> = { current: undefined as unknown as T };
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  function HookComponent() {
    const captureRef = useRef<T>(undefined as unknown as T);
    captureRef.current = useHook();
    // eslint-disable-next-line react-hooks/immutability -- test harness: intentionally writes to outer capture object from inside component
    hookRef.current = captureRef.current;
    return null;
  }

  act(() => {
    root.render(React.createElement(HookComponent));
  });

  return {
    hookRef,
    unmount: () => {
      act(() => root.unmount());
      container.remove();
    },
  };
}

// ─── Test fixtures ────────────────────────────────────────────────────────────

const MOCK_PRESET: PlaygroundPresetListItem = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Test Preset",
  endpoint: "chat.completions",
  model: "gpt-4o",
  system: "You are helpful.",
  params: { temperature: 0.7 },
  created_at: "2026-01-01T00:00:00.000Z",
};

function mockFetchOnce(response: unknown, status = 200): ReturnType<typeof vi.fn> {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => response,
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("usePresets", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("list()", () => {
    it("fetches GET /api/playground/presets and populates presets", async () => {
      const mockFetch = mockFetchOnce({ presets: [MOCK_PRESET] });
      vi.stubGlobal("fetch", mockFetch);

      const { hookRef: result, unmount } = mountHook(() => usePresets());

      await act(async () => {
        await result.current.list();
      });

      expect(mockFetch).toHaveBeenCalledWith("/api/playground/presets");
      expect(result.current.presets).toHaveLength(1);
      expect(result.current.presets[0].id).toBe(MOCK_PRESET.id);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      unmount();
    });

    it("sets error when fetch returns non-ok", async () => {
      const mockFetch = mockFetchOnce({ error: { message: "Unauthorized" } }, 401);
      vi.stubGlobal("fetch", mockFetch);

      const { hookRef: result, unmount } = mountHook(() => usePresets());

      await act(async () => {
        await result.current.list();
      });

      expect(result.current.error).toBe("Unauthorized");
      expect(result.current.presets).toHaveLength(0);
      unmount();
    });

    it("sets error when fetch throws a network error", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

      const { hookRef: result, unmount } = mountHook(() => usePresets());

      await act(async () => {
        await result.current.list();
      });

      expect(result.current.error).toBe("Network error");
      unmount();
    });
  });

  describe("create()", () => {
    it("calls POST /api/playground/presets with correct body", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          status: 201,
          json: async () => MOCK_PRESET,
        })
        // list() is called after create
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ presets: [MOCK_PRESET] }),
        });
      vi.stubGlobal("fetch", mockFetch);

      const { hookRef: result, unmount } = mountHook(() => usePresets());
      const input = {
        name: "Test Preset",
        endpoint: "chat.completions",
        model: "gpt-4o",
        system: "You are helpful.",
        params: { temperature: 0.7 },
      };

      let created: PlaygroundPresetListItem | null = null;
      await act(async () => {
        created = await result.current.create(input);
      });

      // First call: POST to presets
      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        "/api/playground/presets",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        }),
      );
      // Second call: GET list to refresh
      expect(mockFetch).toHaveBeenNthCalledWith(2, "/api/playground/presets");
      expect(created).not.toBeNull();
      expect((created as PlaygroundPresetListItem | null)?.id).toBe(MOCK_PRESET.id);
      unmount();
    });

    it("returns null and sets error on failure", async () => {
      const mockFetch = mockFetchOnce({ error: { message: "Bad request" } }, 400);
      vi.stubGlobal("fetch", mockFetch);

      const { hookRef: result, unmount } = mountHook(() => usePresets());

      let created: PlaygroundPresetListItem | null = null;
      await act(async () => {
        created = await result.current.create({
          name: "x",
          endpoint: "chat.completions",
          model: "gpt-4o",
        });
      });

      expect(created).toBeNull();
      expect(result.current.error).toBe("Bad request");
      unmount();
    });
  });

  describe("update()", () => {
    it("calls PUT /api/playground/presets/:id with correct body", async () => {
      const updated = { ...MOCK_PRESET, name: "Updated" };
      const mockFetch = vi
        .fn()
        .mockResolvedValueOnce({ ok: true, status: 200, json: async () => updated })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ presets: [updated] }),
        });
      vi.stubGlobal("fetch", mockFetch);

      const { hookRef: result, unmount } = mountHook(() => usePresets());
      const patch = { name: "Updated" };

      let res: PlaygroundPresetListItem | null = null;
      await act(async () => {
        res = await result.current.update(MOCK_PRESET.id, patch);
      });

      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        `/api/playground/presets/${MOCK_PRESET.id}`,
        expect.objectContaining({
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        }),
      );
      expect((res as PlaygroundPresetListItem | null)?.name).toBe("Updated");
      unmount();
    });
  });

  describe("remove()", () => {
    it("calls DELETE /api/playground/presets/:id", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValueOnce({ ok: true, status: 204, json: async () => ({}) })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ presets: [] }),
        });
      vi.stubGlobal("fetch", mockFetch);

      const { hookRef: result, unmount } = mountHook(() => usePresets());

      await act(async () => {
        await result.current.remove(MOCK_PRESET.id);
      });

      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        `/api/playground/presets/${MOCK_PRESET.id}`,
        expect.objectContaining({ method: "DELETE" }),
      );
      // After remove, list is refetched => presets = []
      expect(result.current.presets).toHaveLength(0);
      unmount();
    });

    it("sets error on failure", async () => {
      const mockFetch = mockFetchOnce({ error: { message: "Not found" } }, 404);
      vi.stubGlobal("fetch", mockFetch);

      const { hookRef: result, unmount } = mountHook(() => usePresets());

      await act(async () => {
        await result.current.remove("nonexistent-id");
      });

      expect(result.current.error).toBe("Not found");
      unmount();
    });
  });

  describe("loading state", () => {
    it("loading is false after list() completes", async () => {
      const mockFetch = mockFetchOnce({ presets: [] });
      vi.stubGlobal("fetch", mockFetch);

      const { hookRef: result, unmount } = mountHook(() => usePresets());

      await act(async () => {
        await result.current.list();
      });

      expect(result.current.loading).toBe(false);
      unmount();
    });
  });
});
