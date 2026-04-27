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
 * Check if DNS entry already exists
 */
export function checkDNSEntry(): boolean {
  try {
    const hostsContent = fs.readFileSync(HOSTS_FILE, "utf8");
    const lines = hostsContent.split(/\r?\n/);
    return lines.some((line) => {
      const parts = line.trim().split(/\s+/);
      return parts.length >= 2 && parts[0] === "127.0.0.1" && parts.some((p) => p === TARGET_HOST);
    });
  } catch {
    return false;
  }
}

/**
 * Add DNS entry to hosts file
 */
export async function addDNSEntry(sudoPassword: string): Promise<void> {
  if (checkDNSEntry()) {
    console.log(`DNS entry for ${TARGET_HOST} already exists`);
    return;
  }

  const entry = `127.0.0.1 ${TARGET_HOST}`;

  try {
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
    console.log(`✅ Added DNS entry: ${entry}`);
  } catch (error) {
    throw new Error(`Failed to add DNS entry: ${getErrorMessage(error)}`);
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
