import { exec } from "child_process";
import fs from "fs";
import path from "path";

const TARGET_HOST = "daily-cloudcode-pa.googleapis.com";
const IS_WIN = process.platform === "win32";
const HOSTS_FILE = IS_WIN
  ? path.join(process.env.SystemRoot || "C:\\Windows", "System32", "drivers", "etc", "hosts")
  : "/etc/hosts";

/**
 * Execute command with sudo password via stdin (macOS/Linux only)
 */
export function execWithPassword(command, password) {
  return new Promise((resolve, reject) => {
    const child = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Command failed: ${error.message}\n${stderr}`));
      } else {
        resolve(stdout);
      }
    });
    child.stdin.write(`${password}\n`);
    child.stdin.end();
  });
}

/**
 * Execute elevated command on Windows via PowerShell RunAs
 */
function execElevatedWindows(command) {
  return new Promise((resolve, reject) => {
    const psCommand = `Start-Process cmd -ArgumentList '/c','${command.replace(/'/g, "''")}' -Verb RunAs -Wait`;
    exec(`powershell -Command "${psCommand}"`, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Elevated command failed: ${error.message}\n${stderr}`));
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Check if DNS entry already exists
 */
export function checkDNSEntry() {
  try {
    const hostsContent = fs.readFileSync(HOSTS_FILE, "utf8");
    return hostsContent.includes(TARGET_HOST);
  } catch {
    return false;
  }
}

/**
 * Add DNS entry to hosts file
 */
export async function addDNSEntry(sudoPassword) {
  if (checkDNSEntry()) {
    console.log(`DNS entry for ${TARGET_HOST} already exists`);
    return;
  }

  const entry = `127.0.0.1 ${TARGET_HOST}`;

  try {
    if (IS_WIN) {
      // Windows: use elevated echo >> hosts
      await execElevatedWindows(`echo ${entry} >> "${HOSTS_FILE}"`);
    } else {
      const command = `echo "${entry}" | sudo -S tee -a ${HOSTS_FILE} > /dev/null`;
      await execWithPassword(command, sudoPassword);
    }
    console.log(`✅ Added DNS entry: ${entry}`);
  } catch (error) {
    throw new Error(`Failed to add DNS entry: ${error.message}`);
  }
}

/**
 * Remove DNS entry from hosts file
 */
export async function removeDNSEntry(sudoPassword) {
  if (!checkDNSEntry()) {
    console.log(`DNS entry for ${TARGET_HOST} does not exist`);
    return;
  }

  try {
    if (IS_WIN) {
      // Windows: read, filter, write back via elevated PowerShell
      const psScript = `(Get-Content '${HOSTS_FILE}') | Where-Object { $_ -notmatch '${TARGET_HOST}' } | Set-Content '${HOSTS_FILE}'`;
      const psCommand = `Start-Process powershell -ArgumentList '-Command','${psScript.replace(/'/g, "''")}' -Verb RunAs -Wait`;
      await new Promise((resolve, reject) => {
        exec(`powershell -Command "${psCommand}"`, (error) => {
          if (error) reject(new Error(`Failed to remove DNS entry: ${error.message}`));
          else resolve();
        });
      });
    } else {
      const command = `sudo -S sed -i '' '/${TARGET_HOST}/d' ${HOSTS_FILE}`;
      await execWithPassword(command, sudoPassword);
    }
    console.log(`✅ Removed DNS entry for ${TARGET_HOST}`);
  } catch (error) {
    throw new Error(`Failed to remove DNS entry: ${error.message}`);
  }
}
