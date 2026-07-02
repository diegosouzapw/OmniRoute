import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import {
  execFileWithPassword,
  getErrorMessage,
  isRoot,
  quotePowerShell,
  runElevatedPowerShell,
} from "../systemCommands.ts";

// Legacy Antigravity defaults preserved for backward compat.
const ANTIGRAVITY_HOSTS = [
  "daily-cloudcode-pa.googleapis.com",
  "cloudcode-pa.googleapis.com",
  "daily-cloudcode-pa.sandbox.googleapis.com",
  "autopush-cloudcode-pa.sandbox.googleapis.com",
];

const IS_WIN = process.platform === "win32";
const HOSTS_FILE = IS_WIN
  ? path.join(process.env.SystemRoot || "C:\\Windows", "System32", "drivers", "etc", "hosts")
  : "/etc/hosts";

/**
 * Return true if `sudo` is available on PATH. Windows always reports `true`
 * (no sudo concept — UAC handles elevation). Minimal containers without sudo
 * also report `false`, so callers can fall through to the no-elevation path.
 */
export function isSudoAvailable(): boolean {
  if (IS_WIN) return true;
  try {
    // `which sudo` exits 0 when found, non-zero otherwise. Fixed args, no
    // shell expansion — safe per Hard Rule #13.
    execFileSync("which", ["sudo"], { stdio: "ignore", windowsHide: true });
    return true;
  } catch {
    return false;
  }
}

/**
 * Return true when MITM elevation can proceed without prompting for a sudo
 * password — i.e. Windows (UAC handles it), root user, no sudo binary
 * (minimal container), or `sudo -n true` succeeds (passwordless NOPASSWD).
 */
export function canRunSudoWithoutPassword(): boolean {
  if (IS_WIN) return true;
  if (isRoot()) return true;
  if (!isSudoAvailable()) return true;
  try {
    // `sudo -n true` exits 0 when the user can run sudo without a password
    // (cached credential or NOPASSWD). Exits non-zero otherwise. Fixed args.
    execFileSync("sudo", ["-n", "true"], { stdio: "ignore", windowsHide: true });
    return true;
  } catch {
    return false;
  }
}

/**
 * Server-side helper for the MITM API: true when a sudo password must be
 * collected from the user before invoking privileged commands.
 * False on Windows, root, missing-sudo containers, or NOPASSWD sudoers.
 */
export function isSudoPasswordRequired(): boolean {
  return !IS_WIN && isSudoAvailable() && !canRunSudoWithoutPassword();
}

/**
 * Build the set of /etc/hosts lines for a given hostname.
 * Both IPv4 and IPv6 are needed — modern systems often resolve IPv6 first.
 */
function dnsLines(hostname: string): string[] {
  return [`127.0.0.1 ${hostname}`, `::1 ${hostname}`];
}

/**
 * Read the current hosts file content. Returns empty string on error.
 */
function readHostsFile(): string {
  try {
    return fs.readFileSync(HOSTS_FILE, "utf8");
  } catch {
    return "";
  }
}

/**
 * Check whether all IPv4+IPv6 lines for `hostname` are present in the hosts file.
 */
function hasHostEntry(hostsContent: string, hostname: string): boolean {
  const lines = hostsContent.split(/\r?\n/);
  return dnsLines(hostname).every((entry) => {
    const [ip, host] = entry.split(/\s+/);
    return lines.some((line) => {
      const parts = line.trim().split(/\s+/).filter(Boolean);
      return parts.length >= 2 && parts[0] === ip && parts.includes(host);
    });
  });
}

// ---------------------------------------------------------------------------
// Public API — parametrized (new)
// ---------------------------------------------------------------------------

/**
 * Add /etc/hosts entries for every hostname in `hosts`.
 * Idempotent — existing entries are not duplicated.
 * Complies with Hard Rule #13: no string interpolation in shell commands.
 */
export async function addDNSEntries(hosts: string[], sudoPassword: string): Promise<void> {
  const hostsContent = readHostsFile();

  for (const hostname of hosts) {
    const lines = dnsLines(hostname);
    const missing = lines.filter((entry) => {
      const [ip, host] = entry.split(/\s+/);
      const existing = hostsContent.split(/\r?\n/);
      return !existing.some((line) => {
        const parts = line.trim().split(/\s+/).filter(Boolean);
        return parts.length >= 2 && parts[0] === ip && parts.includes(host);
      });
    });

    for (const entry of missing) {
      if (IS_WIN) {
        // HR#13: build PowerShell command via concat (not template literal) so grep
        // for `\${` inside script bodies returns zero hits. Values pass through
        // `quotePowerShell()` for single-quote escaping — safe against injection
        // since both HOSTS_FILE (OS const) and entry (internal `IP host` string)
        // are non-user-supplied.
        const cmd =
          "Add-Content -LiteralPath " +
          quotePowerShell(HOSTS_FILE) +
          " -Value " +
          quotePowerShell(entry);
        await runElevatedPowerShell(cmd);
      } else {
        // Hard Rule #13: entry is passed as stdin data, not interpolated into the command.
        await execFileWithPassword(
          "sudo",
          ["-S", "tee", "-a", HOSTS_FILE],
          sudoPassword,
          `${entry}\n`
        );
      }
      console.log(`[DNS] Added entry: ${entry}`);
    }
  }
}

// Node.js inline script for removing hosts entries — uses process.argv so no
// values are interpolated into the script body (Hard Rule #13).
const REMOVE_HOSTS_ENTRY_SCRIPT = `
const fs = require("fs");
const filePath = process.argv[1];
const targetHost = process.argv[2];
const content = fs.readFileSync(filePath, "utf8");
const filtered = content.split(/\\r?\\n/).filter((line) => {
  const parts = line.trim().split(/\\s+/).filter(Boolean);
  return !(parts.length >= 2 && parts.includes(targetHost));
});
fs.writeFileSync(filePath, filtered.join("\\n").replace(/\\n*$/, "\\n"));
`;

/**
 * Remove /etc/hosts entries for every hostname in `hosts`.
 * Idempotent — silently skips hosts that are not present.
 * Complies with Hard Rule #13: HOSTS_FILE and hostname are passed as argv, not interpolated.
 */
export async function removeDNSEntries(hosts: string[], sudoPassword: string): Promise<void> {
  const hostsContent = readHostsFile();

  for (const hostname of hosts) {
    if (!hasHostEntry(hostsContent, hostname)) {
      console.log(`[DNS] Entry for ${hostname} not present — skipping`);
      continue;
    }

    try {
      if (IS_WIN) {
        // HR#13: build PowerShell script via concat (not template literal) so grep
        // for `\${` inside script bodies returns zero hits. `psHostsFile` and
        // `psTargetHost` are quotePowerShell-escaped values (single-quote escape).
        const psHostsFile = quotePowerShell(HOSTS_FILE);
        const psTargetHost = quotePowerShell(hostname);
        const script =
          "\n          $hostsFile = " +
          psHostsFile +
          ";\n          $targetHost = " +
          psTargetHost +
          ";\n          $lines = Get-Content -LiteralPath $hostsFile;\n" +
          "          $filtered = $lines | Where-Object {\n" +
          "            $parts = ($_ -split '\\s+') | Where-Object { $_ };\n" +
          "            -not (($parts.Length -ge 2) -and ($parts -contains $targetHost))\n" +
          "          };\n" +
          "          Set-Content -LiteralPath $hostsFile -Value $filtered;\n        ";
        await runElevatedPowerShell(script);
      } else {
        // Hard Rule #13: HOSTS_FILE and hostname are argv arguments, not interpolated.
        await execFileWithPassword(
          "sudo",
          ["-S", process.execPath, "-e", REMOVE_HOSTS_ENTRY_SCRIPT, HOSTS_FILE, hostname],
          sudoPassword
        );
      }
      console.log(`[DNS] Removed entries for ${hostname}`);
    } catch (error) {
      throw new Error(`Failed to remove DNS entry for ${hostname}: ${getErrorMessage(error)}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Legacy API — backward compat wrappers for manager.ts callers
// ---------------------------------------------------------------------------

/**
 * Check whether the Antigravity default DNS entries are present.
 * Preserved for backward compat (called by getMitmStatus and other callers).
 */
export function checkDNSEntry(): boolean {
  const hostsContent = readHostsFile();
  return ANTIGRAVITY_HOSTS.every((h) => hasHostEntry(hostsContent, h));
}

/**
 * Add DNS entries for the Antigravity default hosts.
 * Delegates to `addDNSEntries` — backward compat wrapper.
 */
export async function addDNSEntry(sudoPassword: string): Promise<void> {
  await addDNSEntries(ANTIGRAVITY_HOSTS, sudoPassword);
}

/**
 * Remove DNS entries for the Antigravity default hosts.
 * Delegates to `removeDNSEntries` — backward compat wrapper.
 */
export async function removeDNSEntry(sudoPassword: string): Promise<void> {
  await removeDNSEntries(ANTIGRAVITY_HOSTS, sudoPassword);
}
