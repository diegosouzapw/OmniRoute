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
import { ALL_TARGETS } from "../targets/index.ts";

// Legacy Antigravity defaults preserved for backward compat.
const ANTIGRAVITY_HOSTS = [
  "daily-cloudcode-pa.googleapis.com",
  "cloudcode-pa.googleapis.com",
  "daily-cloudcode-pa.sandbox.googleapis.com",
  "autopush-cloudcode-pa.sandbox.googleapis.com",
];

function resolveHostsForAgent(agentId?: string): string[] {
  if (!agentId) return ANTIGRAVITY_HOSTS;
  const target = ALL_TARGETS.find((t) => t.id === agentId);
  return target?.hosts ?? ANTIGRAVITY_HOSTS;
}

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
 *
 * On Windows, all missing entries are batched into a single elevated PowerShell
 * invocation so the user gets one UAC prompt instead of one per line.
 */
export async function addDNSEntries(hosts: string[], sudoPassword: string): Promise<void> {
  const hostsContent = readHostsFile();
  const missingEntries: string[] = [];

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
    missingEntries.push(...missing);
  }

  if (missingEntries.length === 0) return;

  if (IS_WIN) {
    const psHostsFile = quotePowerShell(HOSTS_FILE);
    const psEntries = missingEntries.map((e) => quotePowerShell(e)).join(", ");
    const script = "Add-Content -LiteralPath " + psHostsFile + " -Value " + psEntries;
    await runElevatedPowerShell(script);
    for (const entry of missingEntries) {
      console.log(`[DNS] Added entry: ${entry}`);
    }
  } else {
    const data = missingEntries.map((e) => `${e}\n`).join("");
    await execFileWithPassword("sudo", ["-S", "tee", "-a", HOSTS_FILE], sudoPassword, data);
    for (const entry of missingEntries) {
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
 *
 * On Windows, all hostnames are filtered in a single elevated PowerShell
 * invocation so the user gets one UAC prompt instead of one per host.
 */
export async function removeDNSEntries(hosts: string[], sudoPassword: string): Promise<void> {
  const hostsContent = readHostsFile();
  const presentHosts = hosts.filter((h) => hasHostEntry(hostsContent, h));

  if (presentHosts.length === 0) return;

  if (IS_WIN) {
    const psHostsFile = quotePowerShell(HOSTS_FILE);
    const psTargets = presentHosts.map((h) => quotePowerShell(h)).join(", ");
    const script =
      "$hostsFile = " +
      psHostsFile +
      ";\n          $targetHosts = @(" +
      psTargets +
      ");\n" +
      "          $lines = Get-Content -LiteralPath $hostsFile;\n" +
      "          $filtered = $lines | Where-Object {\n" +
      "            $part = ($_ -split '\\s+') | Where-Object { $_ };\n" +
      "            -not ($part.Length -ge 2 -and ($targetHosts -contains $part[1]))\n" +
      "          };\n" +
      "          Set-Content -LiteralPath $hostsFile -Value $filtered;\n        ";
    await runElevatedPowerShell(script);
    for (const hostname of presentHosts) {
      console.log(`[DNS] Removed entries for ${hostname}`);
    }
  } else {
    for (const hostname of presentHosts) {
      await execFileWithPassword(
        "sudo",
        ["-S", process.execPath, "-e", REMOVE_HOSTS_ENTRY_SCRIPT, HOSTS_FILE, hostname],
        sudoPassword
      );
      console.log(`[DNS] Removed entries for ${hostname}`);
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
 * Add DNS entries for the Antigravity default hosts, or for a specific agent
 * when `agentId` is provided.
 * Delegates to `addDNSEntries` — backward compat wrapper.
 */
export async function addDNSEntry(sudoPassword: string, agentId?: string): Promise<void> {
  await addDNSEntries(resolveHostsForAgent(agentId), sudoPassword);
}

/**
 * Remove DNS entries for the Antigravity default hosts, or for a specific agent
 * when `agentId` is provided.
 * Delegates to `removeDNSEntries` — backward compat wrapper.
 */
export async function removeDNSEntry(sudoPassword: string, agentId?: string): Promise<void> {
  await removeDNSEntries(resolveHostsForAgent(agentId), sudoPassword);
}
