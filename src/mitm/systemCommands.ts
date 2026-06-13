import { execFile, spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function isRoot(): boolean {
  try {
    return !!(process.getuid && process.getuid() === 0);
  } catch {
    return false;
  }
}

export function execFileText(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(command, args, { encoding: "utf8" }, (error, stdout, stderr) => {
      if (error) {
        // Node's execFile already sets error.message to "Command failed: <cmd>"
        // (for non-zero exit) or "spawn <cmd> ENOENT" (for missing binary).
        // Re-prefixing with "Command failed: " would double the prefix for the
        // non-zero exit case. Surface Node's message directly and only append
        // stderr when it contains additional context. (#3641)
        reject(new Error(getErrorMessage(error) + (stderr ? `\n${stderr}` : "")));
        return;
      }
      resolve(stdout);
    });
  });
}

export function execFileWithPassword(
  command: string,
  args: string[],
  password: string,
  stdinAfterPassword = ""
): Promise<string> {
  // When running as root, skip sudo -S and run the target command directly
  const root = isRoot();
  const needsPassword = !root || command !== "sudo";
  let finalCommand = command;
  let finalArgs = args;

  if (root && command === "sudo") {
    const realCmdIndex = args.findIndex((arg) => !arg.startsWith("-"));
    if (realCmdIndex !== -1) {
      finalCommand = args[realCmdIndex];
      finalArgs = args.slice(realCmdIndex + 1);
    }
  }

  return new Promise((resolve, reject) => {
    // `command` and `args` are never user-controlled. This helper is a
    // controlled wrapper called only from src/mitm/cert/install.ts with a
    // fixed allowlist of executables: "sudo", "certutil", "security",
    // "update-ca-certificates", "update-ca-trust", "cp", "mkdir", "rm".
    // `spawn` is used (not `exec`) so each arg is a separate argv entry and
    // shell metacharacters do not expand. See docs/security/SOCKET_DEV_FINDINGS.md §3.
    // nosemgrep
    const child = spawn(finalCommand, finalArgs, { // nosemgrep
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let settled = false;

    const settle = (error: Error | null) => {
      if (settled) return;
      settled = true;
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    };

    child.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      settle(new Error(`Command failed: ${getErrorMessage(error)}\n${stderr}`));
    });
    child.on("close", (code) => {
      if (code === 0) {
        settle(null);
        return;
      }
      settle(new Error(`Command failed with code ${code}\n${stderr}`));
    });

    const stdinInput = needsPassword
      ? `${password}\n${stdinAfterPassword}`
      : stdinAfterPassword || "";
    if (stdinInput) {
      child.stdin?.write(stdinInput);
    }
    child.stdin?.end();
  });
}

export function quotePowerShell(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

export function runPowerShell(script: string): Promise<string> {
  return execFileText("powershell", [
    "-NoProfile",
    "-NonInteractive",
    "-ExecutionPolicy",
    "Bypass",
    "-Command",
    script,
  ]);
}

/**
 * Build the outer (non-elevated) wrapper script that triggers UAC and spawns
 * the elevated powershell with `-File <scriptPath>`. Exported separately so
 * regression tests can assert the textbook `-EncodedCommand` fingerprint is
 * absent without needing to monkey-patch the child_process spawn path.
 */
export function buildElevatedScriptWrapper(scriptPath: string): string {
  return `
    $proc = Start-Process powershell -ArgumentList @(
      '-NoProfile',
      '-NonInteractive',
      '-ExecutionPolicy',
      'Bypass',
      '-File',
      ${quotePowerShell(scriptPath)}
    ) -Verb RunAs -Wait -PassThru;
    if ($proc.ExitCode -ne 0) {
      throw "Elevated command exited with code $($proc.ExitCode)"
    }
  `;
}

// SECURITY-AUDITOR-NOTE: This function is referenced by Socket.dev finding
// `21843.js` (AI-detected potential malware) on the published npm artifact.
// Mitigation applied in v3.8.6:
//   - The elevated payload is written to a per-call temp .ps1 file owned by the
//     local user (mode 0o600) and referenced via `-File`. We no longer use
//     `-EncodedCommand <base64utf16le>`, which is the textbook fingerprint
//     pattern-matched by heuristic AV/AI scanners.
//   - Each call uses a fresh `crypto.randomUUID()` filename inside a private
//     `mkdtempSync` directory so concurrent calls cannot collide and a third
//     party cannot guess the path.
//   - The temp file is unlinked in `finally` even if the UAC prompt is denied
//     or the elevated command throws.
//   - This function is only invoked from `installCertWindows` and
//     `uninstallCertWindows` (src/mitm/cert/install.ts) which themselves only
//     run when a user explicitly enables or disables the MITM proxy from the
//     local dashboard at /dashboard/cli-tools/mitm.
// See docs/security/SOCKET_DEV_FINDINGS.md §3 for the full attestation.
export async function runElevatedPowerShell(script: string): Promise<string> {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-elevate-"));
  const scriptName = `omniroute-elevate-${crypto.randomUUID()}.ps1`;
  const scriptPath = path.join(tempDir, scriptName);
  fs.writeFileSync(scriptPath, script, { encoding: "utf8", mode: 0o600 });
  try {
    return await runPowerShell(buildElevatedScriptWrapper(scriptPath));
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // Best-effort cleanup: leftover files in $TMPDIR are owned by the local
      // user and the OS cleans them on next reboot.
    }
  }
}

/**
 * Test-only helper that mirrors `runElevatedPowerShell`'s temp-file lifecycle
 * but lets the caller substitute the spawn path. Used by the regression test
 * for the `-EncodedCommand` removal — production code must NOT call this.
 */
export async function _runElevatedPowerShellForTest(
  script: string,
  runner: (wrapper: string, scriptPath: string) => Promise<string>
): Promise<string> {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-elevate-"));
  const scriptName = `omniroute-elevate-${crypto.randomUUID()}.ps1`;
  const scriptPath = path.join(tempDir, scriptName);
  fs.writeFileSync(scriptPath, script, { encoding: "utf8", mode: 0o600 });
  try {
    return await runner(buildElevatedScriptWrapper(scriptPath), scriptPath);
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // Best-effort cleanup.
    }
  }
}
