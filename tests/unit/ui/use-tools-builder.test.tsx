// @vitest-environment jsdom
// tests/unit/ui/use-tools-builder.test.tsx
// Runs via Vitest (vitest.config.ts)
// Uses React DOM directly (no @testing-library/dom dep required).
import React, { act, useRef } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect } from "vitest";
import {
  useToolsBuilder,
} from "../../../src/app/(dashboard)/dashboard/playground/hooks/useToolsBuilder";
import type { ToolDefinition } from "../../../src/lib/playground/codeExport";

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

const VALID_TOOL: ToolDefinition = {
  type: "function",
  function: {
    name: "get_weather",
    description: "Get the current weather",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string" },
      },
    },
  },
};

const VALID_TOOL_2: ToolDefinition = {
  type: "function",
  function: {
    name: "search_web",
    parameters: {},
  },
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("useToolsBuilder", () => {
  describe("initial state", () => {
    it("starts with empty tools and empty errors", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());
      expect(result.current.tools).toHaveLength(0);
      expect(result.current.errors.size).toBe(0);
      unmount();
    });
  });

  describe("add()", () => {
    it("returns { ok: false, error } when tool has empty name", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      const invalidTool = {
        type: "function" as const,
        function: { name: "", parameters: {} },
      };

      let outcome: ReturnType<typeof result.current.add> | undefined;
      act(() => {
        outcome = result.current.add(invalidTool as ToolDefinition);
      });

      expect(outcome).toMatchObject({ ok: false });
      expect((outcome as { ok: false; error: string }).error).toBeTruthy();
      expect(result.current.tools).toHaveLength(0);
      unmount();
    });

    it("returns { ok: false } when type is not 'function'", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      const invalidTool = {
        type: "not-function" as unknown as "function",
        function: { name: "valid_name", parameters: {} },
      };

      let outcome: ReturnType<typeof result.current.add> | undefined;
      act(() => {
        outcome = result.current.add(invalidTool as ToolDefinition);
      });

      expect(outcome).toMatchObject({ ok: false });
      expect(result.current.tools).toHaveLength(0);
      unmount();
    });

    it("adds a valid tool and returns { ok: true }", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      let outcome: ReturnType<typeof result.current.add> | undefined;
      act(() => {
        outcome = result.current.add(VALID_TOOL);
      });

      expect(outcome).toMatchObject({ ok: true });
      expect(result.current.tools).toHaveLength(1);
      expect(result.current.tools[0].function.name).toBe("get_weather");
      unmount();
    });

    it("adds multiple valid tools", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      act(() => {
        result.current.add(VALID_TOOL);
        result.current.add(VALID_TOOL_2);
      });

      expect(result.current.tools).toHaveLength(2);
      unmount();
    });

    it("does not add to tools when validation fails", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      act(() => {
        result.current.add(VALID_TOOL);
        result.current.add({ type: "function", function: { name: "", parameters: {} } } as ToolDefinition);
      });

      expect(result.current.tools).toHaveLength(1);
      unmount();
    });
  });

  describe("remove()", () => {
    it("removes tool at given index", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      act(() => {
        result.current.add(VALID_TOOL);
        result.current.add(VALID_TOOL_2);
      });

      act(() => {
        result.current.remove(0);
      });

      expect(result.current.tools).toHaveLength(1);
      expect(result.current.tools[0].function.name).toBe("search_web");
      unmount();
    });

    it("is a no-op when index is out of bounds", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      act(() => {
        result.current.add(VALID_TOOL);
      });

      act(() => {
        result.current.remove(99);
      });

      expect(result.current.tools).toHaveLength(1);
      unmount();
    });

    it("re-indexes errors after remove", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      act(() => {
        result.current.add(VALID_TOOL);
        result.current.add(VALID_TOOL_2);
        // Trigger an error on index 1 via update with invalid tool
        result.current.update(1, {
          type: "function",
          function: { name: "", parameters: {} },
        } as ToolDefinition);
      });

      expect(result.current.errors.has(1)).toBe(true);

      // Remove item at index 0
      act(() => {
        result.current.remove(0);
      });

      // Error for what was index 1 is now at index 0
      expect(result.current.errors.has(0)).toBe(true);
      expect(result.current.errors.has(1)).toBe(false);
      unmount();
    });
  });

  describe("update()", () => {
    it("updates a tool at given index after validation", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      act(() => {
        result.current.add(VALID_TOOL);
      });

      const updated: ToolDefinition = {
        type: "function",
        function: { name: "updated_fn", parameters: {} },
      };

      let outcome: ReturnType<typeof result.current.update> | undefined;
      act(() => {
        outcome = result.current.update(0, updated);
      });

      expect(outcome).toMatchObject({ ok: true });
      expect(result.current.tools[0].function.name).toBe("updated_fn");
      expect(result.current.errors.has(0)).toBe(false);
      unmount();
    });

    it("returns { ok: false, error } and stores error when validation fails", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      act(() => {
        result.current.add(VALID_TOOL);
      });

      let outcome: ReturnType<typeof result.current.update> | undefined;
      act(() => {
        outcome = result.current.update(0, {
          type: "function",
          function: { name: "", parameters: {} },
        } as ToolDefinition);
      });

      expect(outcome).toMatchObject({ ok: false });
      expect(result.current.errors.has(0)).toBe(true);
      // Tool should not be changed
      expect(result.current.tools[0].function.name).toBe("get_weather");
      unmount();
    });

    it("clears error for that index on successful update", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      act(() => {
        result.current.add(VALID_TOOL);
        result.current.update(0, {
          type: "function",
          function: { name: "", parameters: {} },
        } as ToolDefinition);
      });
      expect(result.current.errors.has(0)).toBe(true);

      act(() => {
        result.current.update(0, VALID_TOOL_2);
      });
      expect(result.current.errors.has(0)).toBe(false);
      unmount();
    });
  });

  describe("clear()", () => {
    it("removes all tools and clears all errors", () => {
      const { hookRef: result, unmount } = mountHook(() => useToolsBuilder());

      act(() => {
        result.current.add(VALID_TOOL);
        result.current.add(VALID_TOOL_2);
        result.current.update(0, {
          type: "function",
          function: { name: "", parameters: {} },
        } as ToolDefinition);
      });

      act(() => {
        result.current.clear();
      });

      expect(result.current.tools).toHaveLength(0);
      expect(result.current.errors.size).toBe(0);
      unmount();
    });
  });
});
