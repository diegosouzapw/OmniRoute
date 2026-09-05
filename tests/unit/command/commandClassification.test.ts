import { describe, it } from "node:test";
import { equal, deepEqual } from "node:assert/strict";

describe("Command classification (#8461)", () => {
  it("classifies read-only commands", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    const r = classifyCommand(["status"]);
    equal(r?.category, "read-only");
  });

  it("classifies version as read-only", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["version"])?.category, "read-only");
  });

  it("classifies config list as read-only", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["config", "list"])?.category, "read-only");
  });

  it("classifies models as read-only", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["models"])?.category, "read-only");
  });

  it("classifies health as read-only", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["health"])?.category, "read-only");
  });

  it("classifies config set as mutating", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["config", "set", "key", "value"])?.category, "mutating");
  });

  it("classifies providers add as mutating", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["providers", "add", "openai"])?.category, "mutating");
  });

  it("classifies providers delete as destructive", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["providers", "delete", "my-provider"])?.category, "destructive");
  });

  it("classifies reset as destructive", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["reset"])?.category, "destructive");
  });

  it("classifies keys show as secret-affecting", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["keys", "show"])?.category, "secret-affecting");
  });

  it("classifies auth token as secret-affecting", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["auth", "token"])?.category, "secret-affecting");
  });

  it("returns null for unknown commands (denied by default)", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["nonexistent-command"]), null);
  });

  it("returns null for gibberish input", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    equal(classifyCommand(["xyzzy", "--foobar"]), null);
  });

  it("destructive priority over mutating", async () => {
    const { classifyCommand } = await import(
      "@/lib/copilot/commandClassification"
    );
    // "delete" pattern matches destructive first, even though it also matches mutating
    equal(classifyCommand(["providers", "delete", "x"])?.category, "destructive");
  });
});