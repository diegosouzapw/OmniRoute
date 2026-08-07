import { describe, it } from "node:test";
import { ok } from "node:assert/strict";
import { readFileSync } from "node:fs";

describe("Management auth documentation (#7786)", () => {
  const docPath = "docs/guides/MANAGEMENT-AUTH.md";
  const content = readFileSync(docPath, "utf-8");

  it("exists and has content", () => {
    ok(content.length > 500, "should have substantial content");
    ok(content.includes("Dashboard JWT session"));
    ok(content.includes("CLI machine-id token"));
    ok(content.includes("oma_"));
  });

  it("documents all four credential families", () => {
    const families = ["Dashboard JWT", "CLI machine-id", "oma_", "Manage-scope"];
    for (const f of families) {
      ok(content.includes(f), `should document ${f}`);
    }
  });

  it("mentions relevant auth header examples", () => {
    ok(content.includes("Authorization"));
    ok(content.includes("Bearer"));
  });
});
