import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";
import { addDNSEntry, removeDNSEntry } from "./dns/dnsConfig.js";
import { generateCert } from "./cert/generate.js";
import { installCert } from "./cert/install.js";

// Store server process
let serverProcess = null;
let serverPid = null;

// Module-scoped password cache (not exposed on globalThis).
// Cleared automatically when the MITM proxy is stopped.
let _cachedPassword = null;
export function getCachedPassword() {
  return _cachedPassword;
}
export function setCachedPassword(pwd) {
  _cachedPassword = pwd || null;
}
export function clearCachedPassword() {
  _cachedPassword = null;
}

// server.js is in same directory as this file
const PID_FILE = path.join(os.homedir(), ".omniroute", "mitm", ".mitm.pid");

// Check if a PID is alive
function isProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get MITM status
 */
export async function getMitmStatus() {
  // Check in-memory process first, then fallback to PID file
  let running = serverProcess !== null && !serverProcess.killed;
  let pid = serverPid;

  if (!running) {
    try {
      if (fs.existsSync(PID_FILE)) {
        const savedPid = parseInt(fs.readFileSync(PID_FILE, "utf-8").trim(), 10);
        if (savedPid && isProcessAlive(savedPid)) {
          running = true;
          pid = savedPid;
        } else {
          // Stale PID file, clean up
          fs.unlinkSync(PID_FILE);
        }
      }
    } catch {
      // Ignore
    }
  }

  // Check DNS configuration
  let dnsConfigured = false;
  try {
    const hostsContent = fs.readFileSync("/etc/hosts", "utf-8");
    dnsConfigured = hostsContent.includes("daily-cloudcode-pa.googleapis.com");
  } catch {
    // Ignore
  }

  // Check cert
  const certDir = path.join(os.homedir(), ".omniroute", "mitm");
  const certExists = fs.existsSync(path.join(certDir, "server.crt"));

  return { running, pid, dnsConfigured, certExists };
}

/**
 * Start MITM proxy
 * @param {string} apiKey - OmniRoute API key
 * @param {string} sudoPassword - Sudo password for DNS/cert operations
 */
export async function startMitm(apiKey, sudoPassword) {
  // Check if already running
  if (serverProcess && !serverProcess.killed) {
    throw new Error("MITM proxy is already running");
  }

  // 1. Generate SSL certificate if not exists
  const certPath = path.join(os.homedir(), ".omniroute", "mitm", "server.crt");
  if (!fs.existsSync(certPath)) {
    console.log("Generating SSL certificate...");
    await generateCert();
  }

  // 2. Install certificate to system keychain
  await installCert(sudoPassword, certPath);

  // 3. Add DNS entry
  console.log("Adding DNS entry...");
  await addDNSEntry(sudoPassword);

  // 4. Start MITM server
  console.log("Starting MITM server...");
  const serverPath = path.join(process.cwd(), "src/mitm/server.js");
  serverProcess = spawn("node", [serverPath], {
    env: {
      ...process.env,
      ROUTER_API_KEY: apiKey,
      NODE_ENV: "production",
    },
    detached: false,
    stdio: ["ignore", "pipe", "pipe"],
  });

  serverPid = serverProcess.pid;

  // Save PID to file
  fs.writeFileSync(PID_FILE, String(serverPid));

  // Log server output
  serverProcess.stdout.on("data", (data) => {
    console.log(`[MITM Server] ${data.toString().trim()}`);
  });

  serverProcess.stderr.on("data", (data) => {
    console.error(`[MITM Server Error] ${data.toString().trim()}`);
  });

  serverProcess.on("exit", (code) => {
    console.log(`MITM server exited with code ${code}`);
    serverProcess = null;
    serverPid = null;

    // Remove PID file
    try {
      fs.unlinkSync(PID_FILE);
    } catch (error) {
      // Ignore
    }
  });

  // Wait and verify server actually started
  const started = await new Promise((resolve) => {
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(true);
      }
    }, 2000);

    serverProcess.on("exit", (code) => {
      clearTimeout(timeout);
      if (!resolved) {
        resolved = true;
        resolve(false);
      }
    });

    // Check stderr for error messages
    serverProcess.stderr.on("data", (data) => {
      const msg = data.toString().trim();
      if (msg.includes("Port") && msg.includes("already in use")) {
        clearTimeout(timeout);
        if (!resolved) {
          resolved = true;
          resolve(false);
        }
      }
    });
  });

  if (!started) {
    throw new Error("MITM server failed to start (port 443 may be in use)");
  }

  return {
    running: true,
    pid: serverPid,
  };
}

/**
 * Stop MITM proxy
 * @param {string} sudoPassword - Sudo password for DNS cleanup
 */
export async function stopMitm(sudoPassword) {
  // 1. Kill server process (in-memory or from PID file)
  const proc = serverProcess;
  if (proc && !proc.killed) {
    console.log("Stopping MITM server...");
    proc.kill("SIGTERM");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!proc.killed) {
      proc.kill("SIGKILL");
    }
    serverProcess = null;
    serverPid = null;
  } else {
    // Fallback: kill by PID file
    try {
      if (fs.existsSync(PID_FILE)) {
        const savedPid = parseInt(fs.readFileSync(PID_FILE, "utf-8").trim(), 10);
        if (savedPid && isProcessAlive(savedPid)) {
          console.log(`Killing MITM server (PID: ${savedPid})...`);
          process.kill(savedPid, "SIGTERM");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (isProcessAlive(savedPid)) {
            process.kill(savedPid, "SIGKILL");
          }
        }
      }
    } catch {
      // Ignore
    }
    serverProcess = null;
    serverPid = null;
  }

  // 2. Remove DNS entry
  console.log("Removing DNS entry...");
  await removeDNSEntry(sudoPassword);

  // 3. Clean up
  clearCachedPassword(); // Clear password from memory when proxy stops
  try {
    fs.unlinkSync(PID_FILE);
  } catch (error) {
    // Ignore
  }

  return {
    running: false,
    pid: null,
  };
}
