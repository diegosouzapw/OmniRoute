// @vitest-environment jsdom
// tests/unit/ui/use-structured-output.test.tsx
// Runs via Vitest (vitest.config.ts)
// Uses React DOM directly (no @testing-library/dom dep required).
import React, { act, useRef } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect } from "vitest";
import {
  useStructuredOutput,
} from "../../../src/app/(dashboard)/dashboard/playground/hooks/useStructuredOutput";

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

const VALID_SCHEMA = {
  name: "WeatherResponse",
  schema: {
    type: "object",
    properties: {
      temperature: { type: "number" },
      condition: { type: "string" },
    },
    required: ["temperature", "condition"],
  },
  strict: true,
};

const VALID_SCHEMA_NO_REQUIRED = {
  name: "FreeForm",
  schema: {
    type: "object",
    properties: {
      result: { type: "string" },
    },
  },
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("useStructuredOutput", () => {
  describe("initial state", () => {
    it("starts with enabled=false, schema=null, error=null", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());
      expect(result.current.enabled).toBe(false);
      expect(result.current.schema).toBeNull();
      expect(result.current.error).toBeNull();
      unmount();
    });
  });

  describe("setEnabled()", () => {
    it("sets enabled to true", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setEnabled(true);
      });

      expect(result.current.enabled).toBe(true);
      unmount();
    });

    it("toggles enabled back to false", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setEnabled(true);
        result.current.setEnabled(false);
      });

      expect(result.current.enabled).toBe(false);
      unmount();
    });
  });

  describe("setSchema()", () => {
    it("accepts a valid schema and clears error", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema(VALID_SCHEMA);
      });

      expect(result.current.schema).toEqual(VALID_SCHEMA);
      expect(result.current.error).toBeNull();
      unmount();
    });

    it("sets error when schema name is empty", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema({ name: "", schema: { type: "object" } });
      });

      expect(result.current.error).toBeTruthy();
      expect(result.current.schema).toBeNull();
      unmount();
    });

    it("sets error when name is too long (>64 chars)", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema({ name: "a".repeat(65), schema: { type: "object" } });
      });

      expect(result.current.error).toBeTruthy();
      unmount();
    });

    it("clears error after previously invalid schema when valid one is set", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema({ name: "", schema: {} });
      });
      expect(result.current.error).toBeTruthy();

      act(() => {
        result.current.setSchema(VALID_SCHEMA);
      });
      expect(result.current.error).toBeNull();
      expect(result.current.schema).toEqual(VALID_SCHEMA);
      unmount();
    });

    it("accepts schema with strict=false", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema({ ...VALID_SCHEMA, strict: false });
      });

      expect(result.current.schema?.strict).toBe(false);
      expect(result.current.error).toBeNull();
      unmount();
    });

    it("accepts schema without strict field", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema(VALID_SCHEMA_NO_REQUIRED);
      });

      expect(result.current.schema?.strict).toBeUndefined();
      expect(result.current.error).toBeNull();
      unmount();
    });
  });

  describe("validateResponse()", () => {
    it("returns { valid: false, error } when no schema is set", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      const res = result.current.validateResponse({ temperature: 25, condition: "sunny" });

      expect(res.valid).toBe(false);
      expect(res.error).toBeTruthy();
      unmount();
    });

    it("parses JSON string and validates correctly", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema(VALID_SCHEMA);
      });

      const json = JSON.stringify({ temperature: 25, condition: "sunny" });
      const res = result.current.validateResponse(json);

      expect(res.valid).toBe(true);
      unmount();
    });

    it("returns { valid: false } when content is not valid JSON string", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema(VALID_SCHEMA);
      });

      const res = result.current.validateResponse("not-valid-json{{");

      expect(res.valid).toBe(false);
      expect(res.error).toContain("JSON");
      unmount();
    });

    it("validates object directly (no JSON.parse needed)", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema(VALID_SCHEMA);
      });

      const res = result.current.validateResponse({ temperature: 20, condition: "cloudy" });
      expect(res.valid).toBe(true);
      unmount();
    });

    it("returns { valid: false } when required field is missing", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema(VALID_SCHEMA);
      });

      const res = result.current.validateResponse({ temperature: 25 }); // missing "condition"
      expect(res.valid).toBe(false);
      expect(res.error).toContain("condition");
      unmount();
    });

    it("returns { valid: false } when content is null", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema(VALID_SCHEMA_NO_REQUIRED);
      });

      const res = result.current.validateResponse(null);
      expect(res.valid).toBe(false);
      unmount();
    });

    it("returns { valid: false } when content is an array", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema(VALID_SCHEMA_NO_REQUIRED);
      });

      const res = result.current.validateResponse([1, 2, 3]);
      expect(res.valid).toBe(false);
      unmount();
    });

    it("passes validation for schema without required field", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema(VALID_SCHEMA_NO_REQUIRED);
      });

      const res = result.current.validateResponse({});
      expect(res.valid).toBe(true);
      unmount();
    });

    it("passes validation for schema with no properties field", () => {
      const { hookRef: result, unmount } = mountHook(() => useStructuredOutput());

      act(() => {
        result.current.setSchema({ name: "AnyObj", schema: { type: "object" } });
      });

      const res = result.current.validateResponse({ foo: "bar" });
      expect(res.valid).toBe(true);
      unmount();
    });
  });
});
