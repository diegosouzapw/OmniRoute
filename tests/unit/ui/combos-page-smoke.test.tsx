// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import CombosPage from "@/app/(dashboard)/dashboard/combos/page";

describe("combos page memoization", () => {
  it("combos page module exports a default component", () => {
    expect(CombosPage).toBeDefined();
    expect(typeof CombosPage).toBe("function");
  });
});
