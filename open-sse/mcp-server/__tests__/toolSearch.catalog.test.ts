import { describe, it, expect } from "vitest";
import { getAllToolDefinitions } from "../toolSearch/catalog.ts";

describe("getAllToolDefinitions", () => {
  const all = getAllToolDefinitions();
  it("aggregates many tools across collections", () => {
    expect(all.length).toBeGreaterThanOrEqual(34);
    expect(all.find((t) => t.name === "omniroute_get_health")).toBeTruthy();
  });
  it("every entry has name + description", () => {
    for (const t of all) {
      expect(typeof t.name).toBe("string");
      expect(t.name.length).toBeGreaterThan(0);
      expect(typeof t.description).toBe("string");
    }
  });
  it("no duplicate names", () => {
    const names = all.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
