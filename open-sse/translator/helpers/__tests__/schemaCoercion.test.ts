import { describe, it, expect } from "vitest";
import { sanitizeToolId } from "../schemaCoercion.ts";

describe("sanitizeToolId", () => {
  it('sanitizes dots and colons to underscores: "call.abc:123" → "call_abc_123"', () => {
    expect(sanitizeToolId("call.abc:123")).toBe("call_abc_123");
  });

  it("generates a valid fallback ID for undefined input", () => {
    const result = sanitizeToolId(undefined);
    expect(result).toMatch(/^tool_[a-z0-9_]+$/);
  });

  it("generates a valid fallback ID for empty string input", () => {
    const result = sanitizeToolId("");
    expect(result).toMatch(/^tool_[a-z0-9_]+$/);
  });

  it("preserves already-valid IDs", () => {
    expect(sanitizeToolId("toolu_abc123")).toBe("toolu_abc123");
    expect(sanitizeToolId("call-xyz_789")).toBe("call-xyz_789");
  });
});
