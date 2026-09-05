import { describe, it } from "node:test";
import { ok } from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

describe("Small VPS documentation (#8237)", () => {
  it("VM_DEPLOYMENT_GUIDE.md exists", () => {
    ok(existsSync("docs/ops/VM_DEPLOYMENT_GUIDE.md"));
  });

  it("ENVIRONMENT.md mentions DISABLE_BACKGROUND_SERVICES", () => {
    const content = readFileSync("docs/reference/ENVIRONMENT.md", "utf-8");
    ok(content.includes("DISABLE_BACKGROUND_SERVICES"), "should document the env var");
  });

  it("VM_DEPLOYMENT_GUIDE.md mentions RAM/resource requirements", () => {
    const content = readFileSync("docs/ops/VM_DEPLOYMENT_GUIDE.md", "utf-8");
    ok(content.includes("RAM") || content.includes("memory"), "should reference memory sizing");
  });
});
