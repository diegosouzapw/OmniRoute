import { describe, it, expect } from "vitest";
import { getAllToolDefinitions } from "../toolSearch/catalog.ts";

const GITHUB_SKILL_TOOL_NAMES = [
  "omniroute_github_skills_search",
  "omniroute_github_skills_scan",
  "omniroute_github_skills_install",
] as const;

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
  it("includes all GitHub skill tools", () => {
    const names = new Set(all.map((tool) => tool.name));
    for (const name of GITHUB_SKILL_TOOL_NAMES) {
      expect(names.has(name)).toBe(true);
    }
  });
  it("includes every canonical CCR lifecycle tool", () => {
    for (const name of ["store", "retrieve", "inspect", "list", "delete", "stats"]) {
      expect(all.find((tool) => tool.name === `omniroute_ccr_${name}`)).toBeTruthy();
    }
  });
});
