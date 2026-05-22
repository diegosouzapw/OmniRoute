import fs from "fs";
import path from "path";
import {
  execFileWithPassword,
  getErrorMessage,
  quotePowerShell,
  runElevatedPowerShell,
} from "../systemCommands.ts";

const TARGET_HOST = "daily-cloudcode-pa.googleapis.com";
const IS_WIN = process.platform === "win32";
const HOSTS_FILE = IS_WIN
  ? path.join(process.env.SystemRoot || "C:\\Windows", "System32", "drivers", "etc", "hosts")
  : "/etc/hosts";

// Both IPv4 and IPv6 entries are needed — modern Windows apps often resolve
// to IPv6 first, bypassing an IPv4-only MITM redirect.
const DNS_ENTRIES = [`127.0.0.1 ${TARGET_HOST}`, `::1 ${TARGET_HOST}`];

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

export function checkDNSEntry(): boolean {
  try {
    const hostsContent = fs.readFileSync(HOSTS_FILE, "utf8");
    const lines = hostsContent.split(/\r?\n/);
    return DNS_ENTRIES.every((entry) => {
      const entryIp = entry.split(/\s+/)[0];
      return lines.some((line) => {
        const parts = line.trim().split(/\s+/);
        return parts.length >= 2 && parts[0] === entryIp && parts.some((p) => p === TARGET_HOST);
      });
    });
  } catch {
    return false;
  }
}

export async function addDNSEntry(sudoPassword: string): Promise<void> {
  if (checkDNSEntry()) {
    console.log(`DNS entries for ${TARGET_HOST} already exist (IPv4 + IPv6)`);
    return;
  }

  const entriesToAdd = DNS_ENTRIES.filter((entry) => {
    const entryIp = entry.split(/\s+/)[0];
    try {
      const hostsContent = fs.readFileSync(HOSTS_FILE, "utf8");
      const lines = hostsContent.split(/\r?\n/);
      return !lines.some((line) => {
        const parts = line.trim().split(/\s+/);
        return parts.length >= 2 && parts[0] === entryIp && parts.some((p) => p === TARGET_HOST);
      });
    } catch {
      return true;
    }
  });

  if (entriesToAdd.length === 0) return;

  for (const entry of entriesToAdd) {
    if (IS_WIN) {
      await runElevatedPowerShell(
        `Add-Content -LiteralPath ${quotePowerShell(HOSTS_FILE)} -Value ${quotePowerShell(entry)}`
      );
    } else {
      await execFileWithPassword(
        "sudo",
        ["-S", "tee", "-a", HOSTS_FILE],
        sudoPassword,
        `${entry}\n`
      );
    }
    console.log(`Added DNS entry: ${entry}`);
  }
}

/**
 * Remove DNS entry from hosts file
 */
export async function removeDNSEntry(sudoPassword: string): Promise<void> {
  if (!checkDNSEntry()) {
    console.log(`DNS entry for ${TARGET_HOST} does not exist`);
    return;
  }

  try {
    if (IS_WIN) {
      await runElevatedPowerShell(`
        $hostsFile = ${quotePowerShell(HOSTS_FILE)};
        $targetHost = ${quotePowerShell(TARGET_HOST)};
        $lines = Get-Content -LiteralPath $hostsFile;
        $filtered = $lines | Where-Object {
          $parts = ($_ -split '\\s+') | Where-Object { $_ };
          -not (($parts.Length -ge 2) -and ($parts -contains $targetHost))
        };
        Set-Content -LiteralPath $hostsFile -Value $filtered;
      `);
    } else {
      await execFileWithPassword(
        "sudo",
        ["-S", process.execPath, "-e", REMOVE_HOSTS_ENTRY_SCRIPT, HOSTS_FILE, TARGET_HOST],
        sudoPassword
      );
    }
    console.log(`✅ Removed DNS entry for ${TARGET_HOST}`);
  } catch (error) {
    throw new Error(`Failed to remove DNS entry: ${getErrorMessage(error)}`);
  }
}
