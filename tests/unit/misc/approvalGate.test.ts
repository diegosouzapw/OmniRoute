import { describe, it } from "node:test";
import { ok, equal } from "node:assert/strict";

describe("Approval gate integration (#8461)", () => {
  it("classifyCommand types are exported", async () => {
    const mod = await import("@/lib/copilot/commandClassification");
    equal(typeof mod.classifyCommand, "function");
  });

  it("classification module has the expected categories", async () => {
    const mod = await import("@/lib/copilot/commandClassification");
    const r = mod.classifyCommand(["status"]);
    ok(r !== null, "should classify status");
    ok(["read-only", "mutating", "destructive", "secret-affecting"].includes(r.category));
  });

  it("read-only command returns category and rule", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    const r = classifyCommand(["help"]);
    equal(r?.category, "read-only");
    ok(r?.rule.reason.length > 0, "rule should have a reason");
  });

  it("mutating command returns warning reason", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    const r = classifyCommand(["create", "something"]);
    equal(r?.category, "mutating");
    ok(r?.rule.reason.includes("changes"), "reason should explain the risk");
  });

  it("destructive command returns a stronger reason", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    const r = classifyCommand(["delete", "provider"]);
    equal(r?.category, "destructive");
    ok(r?.rule.reason.includes("permanently"), "reason should warn about permanence");
  });

  it("secret-affecting command warns about credentials", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    const r = classifyCommand(["keys", "show"]);
    equal(r?.category, "secret-affecting");
    ok(r?.rule.reason.includes("secrets"), "reason should mention secrets");
  });
});