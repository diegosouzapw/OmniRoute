import { describe, it, before } from "node:test";
import assert from "node:assert";
import * as toolDetector from "../../../src/lib/cli-helper/tool-detector.ts";

describe("tool-detector", () => {
  before(() => {
    // Install mock exec implementation for deterministic testing
    // @ts-expect-error - internal test hook
    toolDetector.__setExecFileImpl(async (cmd) => {
      if (cmd === "opencode") {
        return { stdout: "v1.0.0\n" };
      }
      if (cmd === "which") {
        return { stdout: "/usr/local/bin/opencode\n" };
      }
      throw new Error("Command not found");
    });
  });

  describe("detectTool", () => {
    it("returns null for unknown tool id", async () => {
      const result = await toolDetector.detectTool("unknown-tool-xyz");
      assert.strictEqual(result, null);
    });

    it("returns DetectedTool object for installed tool", async () => {
      const result = await toolDetector.detectTool("opencode");
      assert.ok(result !== null);
      assert.strictEqual(result!.id, "opencode");
      assert.strictEqual(result!.name, "OpenCode");
      assert.strictEqual(result!.installed, true);
      assert.strictEqual(result!.version, "1.0.0");
      assert.ok(result!.configPath.includes(".config/opencode"));
      assert.strictEqual(typeof result!.configured, "boolean");
    });
  });

  describe("detectAllTools", () => {
    it("returns array (may be empty if tools not installed)", async () => {
      const tools = await toolDetector.detectAllTools();
      assert.ok(Array.isArray(tools));
      // All items must pass shape check
      for (const t of tools) {
        assert.ok(t.id);
        assert.ok(t.name);
        assert.strictEqual(typeof t.installed, "boolean");
        assert.ok("configPath" in t);
        assert.ok("configured" in t);
      }
    });
  });
});
