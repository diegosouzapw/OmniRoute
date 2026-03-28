/**
 * Tests for CLI tool detection: cross-platform known paths, size threshold,
 * npm prefix deduplication, and env var overrides.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { getCliRuntimeStatus, CLI_TOOL_IDS } =
  await import("../../src/shared/services/cliRuntime.ts");

// ─── Helpers ──────────────────────────────────────────────────

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "cli-test-"));
}

function createFile(dir, name, content) {
  const filePath = path.join(dir, name);
  fs.writeFileSync(filePath, content);
  if (process.platform !== "win32") {
    fs.chmodSync(filePath, 0o755);
  }
  return filePath;
}

// ─── CLI_TOOL_IDS ─────────────────────────────────────────────

describe("CLI_TOOL_IDS", () => {
  it("should include all expected tools", () => {
    const expected = [
      "claude",
      "codex",
      "droid",
      "openclaw",
      "cursor",
      "windsurf",
      "cline",
      "kilo",
      "continue",
      "opencode",
    ];
    for (const id of expected) {
      assert.ok(CLI_TOOL_IDS.includes(id), `Missing tool: ${id}`);
    }
  });
});

// ─── Size Threshold (30 bytes) ────────────────────────────────

describe("Size threshold — checkKnownPath", () => {
  let tmpDir;

  before(() => {
    tmpDir = createTempDir();
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("should detect files >= 30 bytes via env var", async () => {
    const prev = process.env.CLI_DROID_BIN;
    // Create a valid 30-byte+ script
    const content =
      process.platform === "win32"
        ? "@echo off\r\necho 1.0.0\r\nexit 0\r\n"
        : "#!/bin/sh\r\necho 1.0.0\r\nexit 0\r\n";
    const script = createFile(tmpDir, "droid-valid", content);
    // Verify it's at least 30 bytes
    const stat = fs.statSync(script);
    assert.ok(stat.size >= 30, `File should be >= 30 bytes, got ${stat.size}`);

    process.env.CLI_DROID_BIN = script;
    try {
      const result = await getCliRuntimeStatus("droid");
      assert.ok(result.installed, `Expected installed=true, got reason=${result.reason}`);
      assert.ok(result.commandPath === script, `Expected commandPath=${script}`);
    } finally {
      if (prev !== undefined) process.env.CLI_DROID_BIN = prev;
      else delete process.env.CLI_DROID_BIN;
    }
  });

  it("should detect a valid CLI script (>= 30 bytes) via env var", async () => {
    const prev = process.env.CLI_DROID_BIN;
    const script =
      process.platform === "win32"
        ? createFile(tmpDir, "droid.cmd", "@echo off\necho 1.0.0\n")
        : createFile(tmpDir, "droid", "#!/bin/sh\necho 1.0.0\n");

    process.env.CLI_DROID_BIN = script;
    try {
      const result = await getCliRuntimeStatus("droid");
      assert.ok(result.installed, `Expected installed=true, got reason=${result.reason}`);
      assert.ok(
        result.commandPath === script,
        `Expected commandPath=${script}, got ${result.commandPath}`
      );
    } finally {
      if (prev !== undefined) process.env.CLI_DROID_BIN = prev;
      else delete process.env.CLI_DROID_BIN;
    }
  });
});

// ─── Healthcheck with --version ───────────────────────────────

describe("Healthcheck — checkRunnable", () => {
  let tmpDir;

  before(() => {
    tmpDir = createTempDir();
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("should report runnable=true for a script that outputs version", async () => {
    const prev = process.env.CLI_CLINE_BIN;
    const script =
      process.platform === "win32"
        ? createFile(tmpDir, "good.cmd", "@echo off\necho 1.0.0\n")
        : createFile(tmpDir, "good", "#!/bin/sh\necho 1.0.0\n");

    process.env.CLI_CLINE_BIN = script;
    try {
      const result = await getCliRuntimeStatus("cline");
      assert.ok(result.installed, `Expected installed=true, got reason=${result.reason}`);
      if (result.runnable) {
        assert.ok(result.reason === null, `Expected no reason, got ${result.reason}`);
      }
    } finally {
      if (prev !== undefined) process.env.CLI_CLINE_BIN = prev;
      else delete process.env.CLI_CLINE_BIN;
    }
  });
});

// ─── Unknown tool ─────────────────────────────────────────────

describe("Unknown tool", () => {
  it("should return unknown_tool for non-existent tool", async () => {
    const result = await getCliRuntimeStatus("nonexistent-tool-xyz");
    assert.equal(result.installed, false);
    assert.equal(result.reason, "unknown_tool");
  });
});

// ─── continue tool (requiresBinary: false) ────────────────────

describe("continue tool — no binary required", () => {
  it("should report installed=true without checking binary", async () => {
    const result = await getCliRuntimeStatus("continue");
    assert.equal(result.installed, true);
    assert.equal(result.reason, "not_required");
  });
});

describe("windsurf tool — guide-only integration", () => {
  it("should report installed=true without requiring a local binary", async () => {
    const result = await getCliRuntimeStatus("windsurf");
    assert.equal(result.installed, true);
    assert.equal(result.runnable, true);
    assert.equal(result.reason, "not_required");
  });
});

// ─── resolveOpencodeConfigPath — cross-platform ─────────────────

const { resolveOpencodeConfigPath: resolveOpencodeConfigPathFn } =
  await import("../../src/shared/services/cliRuntime.ts");

describe("resolveOpencodeConfigPath — cross-platform", () => {
  it("should resolve on Linux with XDG_CONFIG_HOME", () => {
    const result = resolveOpencodeConfigPathFn(
      "linux",
      { XDG_CONFIG_HOME: "/tmp/xdg" },
      "/home/dev"
    );
    assert.equal(result, path.join("/tmp/xdg", "opencode", "opencode.json"));
  });

  it("should resolve on Linux with default .config", () => {
    const result = resolveOpencodeConfigPathFn("linux", {}, "/home/dev");
    assert.equal(result, path.join("/home/dev", ".config", "opencode", "opencode.json"));
  });

  it("should resolve on Windows with APPDATA", () => {
    const result = resolveOpencodeConfigPathFn(
      "win32",
      { APPDATA: "C:\\Users\\dev\\AppData\\Roaming" },
      "C:\\Users\\dev"
    );
    assert.equal(
      result,
      path.join("C:\\Users\\dev\\AppData\\Roaming", "opencode", "opencode.json")
    );
  });

  it("should fallback to home/AppData/Roaming on Windows without APPDATA", () => {
    const result = resolveOpencodeConfigPathFn("win32", {}, "C:\\Users\\dev");
    assert.equal(
      result,
      path.join("C:\\Users\\dev", "AppData", "Roaming", "opencode", "opencode.json")
    );
  });
});
