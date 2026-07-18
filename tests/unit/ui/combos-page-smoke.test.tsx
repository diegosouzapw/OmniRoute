// @vitest-environment jsdom
import { describe, it, expect } from "vitest";

describe("combos page memoization", () => {
  it("combos page module exports a default component", async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/combos/page"
    );
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });
});
