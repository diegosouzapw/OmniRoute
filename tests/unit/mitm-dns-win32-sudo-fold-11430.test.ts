/**
 * #11430 — Windows 11 native sudo.exe rejects POSIX `sudo -S` during MITM DNS
 * provisioning and Repair.
 *
 * Same fold as #10293 / #11236: the published artifact is bundled on Linux, and
 * Turbopack constant-folds a module-load `process.platform` read to "linux",
 * pruning the PowerShell hosts-file branch. The POSIX path then spawns `sudo -S`,
 * which Windows 11's opt-in sudo.exe rejects (`unexpected argument '-S'`).
 *
 * Invariant: DNS/sudo helpers must read `os.platform()` at call time. A source
 * `process.platform` literal in these files would bring the fold back.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { mock } from "node:test";
import { fileURLToPath } from "node:url";
import {
  addDNSEntries,
  isSudoAvailable,
  isSudoPasswordRequired,
} from "../../src/mitm/dns/dnsConfig.ts";
import { isSudoAvailable as posixSudoAvailable } from "../../src/mitm/systemCommands.ts";
import { isMitmSudoPasswordRequired } from "../../src/mitm/sudoGate.ts";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const GUARDED_FILES = [
  "src/mitm/dns/dnsConfig.ts",
  "src/mitm/systemCommands.ts",
  "src/mitm/sudoGate.ts",
];

function stripComments(source: string): string {
  let out = "";
  let i = 0;
  let inBlock = false;
  let inLine = false;
  let inString: string | null = null;
  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];
    if (inLine) {
      if (ch === "\n") {
        inLine = false;
        out += ch;
      } else {
        out += " ";
      }
      i++;
      continue;
    }
    if (inBlock) {
      if (ch === "*" && next === "/") {
        inBlock = false;
        out += "  ";
        i += 2;
        continue;
      }
      out += ch === "\n" ? "\n" : " ";
      i++;
      continue;
    }
    if (inString) {
      out += ch;
      if (ch === "\\") {
        out += next ?? "";
        i += 2;
        continue;
      }
      if (ch === inString) inString = null;
      i++;
      continue;
    }
    if (ch === "/" && next === "/") {
      inLine = true;
      out += "  ";
      i += 2;
      continue;
    }
    if (ch === "/" && next === "*") {
      inBlock = true;
      out += "  ";
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") inString = ch;
    out += ch;
    i++;
  }
  return out;
}

function findFoldableReads(source: string): string[] {
  const stripped = stripComments(source);
  const offenders: string[] = [];
  stripped.split("\n").forEach((line, index) => {
    if (line.includes("process.platform")) {
      offenders.push(`L${index + 1}: ${source.split("\n")[index].trim()}`);
    }
  });
  return offenders;
}

for (const relPath of GUARDED_FILES) {
  test(`${relPath} has no build-foldable process.platform reads (#11430)`, () => {
    const source = fs.readFileSync(path.join(REPO_ROOT, relPath), "utf8");
    const offenders = findFoldableReads(source);
    assert.deepEqual(
      offenders,
      [],
      `${relPath} must read os.platform() at call time instead of the ` +
        `build-foldable process.platform literal. Offenders: ${offenders.join("; ")}`
    );
    assert.match(
      source,
      /os\.platform\(\)/,
      `${relPath} must call os.platform() so the Windows branch survives a Linux build`
    );
  });
}

test("dnsConfig Windows branch is selected via isWin32()/os.platform(), not a module-load IS_WIN constant", () => {
  const source = fs.readFileSync(path.join(REPO_ROOT, "src/mitm/dns/dnsConfig.ts"), "utf8");
  assert.match(
    source,
    /function isWin32\(\):\s*boolean\s*\{\s*return os\.platform\(\) === "win32";?\s*\}/
  );
  assert.doesNotMatch(source, /const IS_WIN\s*=/);
  assert.match(source, /if \(isWin32\(\)\)/);
  assert.match(source, /runElevatedPowerShell/);
});

test("addDNSEntries on win32 uses elevated PowerShell and never POSIX sudo -S (#11430)", async () => {
  const previousSkip = process.env.OMNIROUTE_SKIP_DNS_WRITE;
  delete process.env.OMNIROUTE_SKIP_DNS_WRITE;
  const platformMock = mock.method(os, "platform", () => "win32" as NodeJS.Platform);
  const execCalls: Array<{ command: string; args: string[] }> = [];
  let powershellScript = "";
  try {
    await addDNSEntries(["fold-test-11430.example.com"], "unused-password", {
      execFileWithPassword: async (command, args) => {
        execCalls.push({ command, args });
        return "";
      },
      runElevatedPowerShell: async (script) => {
        powershellScript = script;
        return "";
      },
    });
    assert.equal(execCalls.length, 0, "must not spawn POSIX sudo on Windows");
    assert.ok(
      powershellScript.includes("Add-Content"),
      `must use elevated PowerShell Add-Content, got: ${powershellScript.slice(0, 200)}`
    );
    assert.ok(
      powershellScript.includes("fold-test-11430.example.com"),
      "PowerShell payload must include the missing host entry"
    );
  } finally {
    platformMock.mock.restore();
    if (previousSkip === undefined) delete process.env.OMNIROUTE_SKIP_DNS_WRITE;
    else process.env.OMNIROUTE_SKIP_DNS_WRITE = previousSkip;
  }
});

test("dnsConfig isSudoAvailable is true on win32 without probing POSIX sudo (#11430)", () => {
  const platformMock = mock.method(os, "platform", () => "win32" as NodeJS.Platform);
  try {
    assert.equal(isSudoAvailable(), true);
    assert.equal(isSudoPasswordRequired(), false);
  } finally {
    platformMock.mock.restore();
  }
});

test("systemCommands isSudoAvailable is false on win32 so sudo -S is never spawned (#11430)", () => {
  const platformMock = mock.method(os, "platform", () => "win32" as NodeJS.Platform);
  try {
    assert.equal(posixSudoAvailable(), false);
  } finally {
    platformMock.mock.restore();
  }
});

test("isMitmSudoPasswordRequired is false on win32 even with an empty password (#11430)", () => {
  const platformMock = mock.method(os, "platform", () => "win32" as NodeJS.Platform);
  try {
    assert.equal(isMitmSudoPasswordRequired(""), false);
  } finally {
    platformMock.mock.restore();
  }
});
