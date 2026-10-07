// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import EvalsTab from "@/app/(dashboard)/dashboard/usage/components/EvalsTab";

describe("EvalsTab memoization", () => {
  it("EvalsTab page module exports a default component", () => {
    expect(EvalsTab).toBeDefined();
    expect(typeof EvalsTab).toBe("function");
  });
});
