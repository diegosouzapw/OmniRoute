import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  appendWindowsKnownBinPaths,
  getWindowsSystemNodeBinDirs,
  mergeWindowsLookupPath,
} from "../../src/shared/services/cliRuntimeWindowsNode.ts";

// #12563 — Claude Code via `npm install -g` on a stock Windows Node MSI lands as
// `C:\Program Files\nodejs\claude.cmd`. Known-path enumeration never listed that
// directory (only npm-prefix / APPDATA\npm / nvm / WinGet), and Electron's PATH
// often omits it, so `where.exe` missed the shim too. The dashboard then reported
// `settings_found_binary_unresolved`. Distinct from the #7831 `.ps1` / known-path
// short-circuit work for #7774.

const originalPlatform = Object.getOwnPropertyDescriptor(process, "platform");
const savedProgramFiles = process.env.ProgramFiles;
const savedProgramFilesX86 = process.env["ProgramFiles(x86)"];

function setPlatform(value: string) {
  Object.defineProperty(process, "platform", { configurable: true, value });
}

function restorePlatform() {
  if (originalPlatform) Object.defineProperty(process, "platform", originalPlatform);
}

/** Same Program Files allowlist check cliRuntime uses, without importing that module. */
function validateProgramFiles(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (!path.win32.isAbsolute(trimmed)) return "";
  const normalized = path.win32.normalize(trimmed);
  if (normalized.includes("..")) return "";
  const lower = normalized.toLowerCase();
  if (lower === "c:\\program files" || lower.startsWith("c:\\program files\\")) return normalized;
  if (lower === "c:\\program files (x86)" || lower.startsWith("c:\\program files (x86)\\")) {
    return normalized;
  }
  return "";
}

afterEach(() => {
  restorePlatform();
  if (savedProgramFiles === undefined) delete process.env.ProgramFiles;
  else process.env.ProgramFiles = savedProgramFiles;
  if (savedProgramFilesX86 === undefined) delete process.env["ProgramFiles(x86)"];
  else process.env["ProgramFiles(x86)"] = savedProgramFilesX86;
});

describe("#12563 — Windows npm-global .cmd shim under Program Files\\nodejs", () => {
  it("enumerates %ProgramFiles%\\nodejs even when npm prefix lives elsewhere", () => {
    setPlatform("win32");
    process.env.ProgramFiles = "C:\\Program Files";
    delete process.env["ProgramFiles(x86)"];

    const dirs = getWindowsSystemNodeBinDirs(validateProgramFiles);
    assert.ok(
      dirs.includes("C:\\Program Files\\nodejs"),
      `expected system Node bin dir, got: ${dirs.join(", ")}`
    );
  });

  it("lists claude.cmd next to the system Node install, not only under APPDATA\\npm", () => {
    setPlatform("win32");
    process.env.ProgramFiles = "C:\\Program Files";
    delete process.env["ProgramFiles(x86)"];

    const candidates: string[] = [];
    appendWindowsKnownBinPaths(
      candidates,
      "claude.cmd",
      "C:\\Users\\someone\\AppData\\Roaming\\npm-unused",
      "",
      null,
      validateProgramFiles
    );

    assert.ok(
      candidates.includes("C:\\Program Files\\nodejs\\claude.cmd"),
      `expected Program Files claude.cmd shim, got: ${candidates.join(", ")}`
    );
    assert.ok(
      candidates.includes("C:\\Users\\someone\\AppData\\Roaming\\npm-unused\\claude.cmd"),
      "npm prefix candidate should still be listed"
    );
  });

  it("does not duplicate the shim when npm prefix already is Program Files\\nodejs", () => {
    setPlatform("win32");
    process.env.ProgramFiles = "C:\\Program Files";
    delete process.env["ProgramFiles(x86)"];

    const candidates: string[] = [];
    appendWindowsKnownBinPaths(
      candidates,
      "claude.cmd",
      "C:\\Program Files\\nodejs",
      "",
      null,
      validateProgramFiles
    );

    assert.equal(
      candidates.filter((p) => p.toLowerCase() === "c:\\program files\\nodejs\\claude.cmd").length,
      1
    );
  });

  it("puts an existing system Node dir on the lookup PATH ahead of a stripped GUI PATH", () => {
    if (process.platform !== "win32") return;
    setPlatform("win32");
    const fakeRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12563-pf-"));
    const fakeNodeDir = path.join(fakeRoot, "nodejs");
    fs.mkdirSync(fakeNodeDir);

    // validateEnvPath must accept this temp root so existsSync can see it.
    const validate = (value: string | undefined) => (value === fakeRoot ? fakeRoot : "");
    process.env.ProgramFiles = fakeRoot;
    delete process.env["ProgramFiles(x86)"];

    try {
      const merged = mergeWindowsLookupPath([], "C:\\Windows\\System32", validate);
      const segments = merged.split(path.delimiter);
      assert.equal(segments[0], fakeNodeDir);
      assert.ok(segments.includes("C:\\Windows\\System32"));
    } finally {
      fs.rmSync(fakeRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });

  it("prepends custom npm prefix and APPDATA\\npm ahead of a stripped GUI PATH", () => {
    if (process.platform !== "win32") return;
    setPlatform("win32");
    const fakeRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12563-custom-"));
    const npmPrefix = path.join(fakeRoot, "custom-prefix");
    const appDataNpm = path.join(fakeRoot, "Roaming", "npm");
    fs.mkdirSync(npmPrefix, { recursive: true });
    fs.mkdirSync(appDataNpm, { recursive: true });
    delete process.env.ProgramFiles;
    delete process.env["ProgramFiles(x86)"];

    try {
      const merged = mergeWindowsLookupPath([], "C:\\Windows\\System32", () => "", {
        npmPrefix,
        appDataNpm,
      });
      const segments = merged.split(path.delimiter);
      assert.equal(segments[0], npmPrefix);
      assert.equal(segments[1], appDataNpm);
      assert.ok(segments.includes("C:\\Windows\\System32"));
    } finally {
      fs.rmSync(fakeRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });

  it("skips system Node dirs on non-Windows platforms", () => {
    setPlatform("linux");
    process.env.ProgramFiles = "C:\\Program Files";
    assert.deepEqual(getWindowsSystemNodeBinDirs(validateProgramFiles), []);
  });
});
