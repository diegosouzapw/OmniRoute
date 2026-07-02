/**
 * Process attribution for the Traffic Inspector (Linux).
 *
 * Maps an inbound connection's *client* ephemeral port to the owning PID +
 * process name by reading /proc/net/tcp{,6} (port → socket inode) then scanning
 * /proc/<pid>/fd for a symlink to socket:[inode]. A short TTL cache mirrors
 * ProxyBridge's 1s PID cache to bound the cost of the procfs scan under load.
 *
 * Non-Linux platforms return null (stub) — macOS/Windows would need
 * lsof/GetExtendedTcpTable and are a follow-up. Attribution is always
 * best-effort: any failure resolves to null and never blocks capture. (Gap 1.)
 */
import fs from "node:fs";

const IS_LINUX = process.platform === "linux";
const CACHE_TTL_MS = 1000;
const cache = new Map<number, { value: ProcessInfo | null; expires: number }>();

export interface ProcessInfo {
  pid: number;
  processName: string;
}

/**
 * Parse /proc/net/tcp content and return the socket inode for `localPort`, or
 * null if no row matches. Pure + fixture-testable. The local_address column is
 * "HEXIP:HEXPORT"; the inode is column index 9 (after whitespace split).
 */
export function parseProcNetTcpForInode(content: string, localPort: number): string | null {
  const lines = content.split("\n");
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].trim().split(/\s+/);
    if (cols.length < 10) continue;
    const portHex = cols[1]?.split(":")[1];
    if (!portHex) continue;
    const port = parseInt(portHex, 16);
    if (Number.isNaN(port)) continue;
    if (port === localPort) return cols[9];
  }
  return null;
}

/** Best-effort PID + name for the process whose socket uses `localPort`. */
export function attributeProcess(localPort: number): ProcessInfo | null {
  if (!IS_LINUX) return null;
  const now = Date.now();
  const hit = cache.get(localPort);
  if (hit && hit.expires > now) return hit.value;

  let result: ProcessInfo | null = null;
  try {
    const inode = findInode(localPort);
    if (inode) {
      const pid = findPidByInode(inode);
      if (pid) result = { pid, processName: readProcessName(pid) };
    }
  } catch {
    result = null;
  }
  cache.set(localPort, { value: result, expires: now + CACHE_TTL_MS });
  return result;
}

function findInode(localPort: number): string | null {
  for (const f of ["/proc/net/tcp", "/proc/net/tcp6"]) {
    try {
      const inode = parseProcNetTcpForInode(fs.readFileSync(f, "utf8"), localPort);
      if (inode && inode !== "0") return inode;
    } catch {
      // file may not exist (e.g. no tcp6) — continue
    }
  }
  return null;
}

function findPidByInode(inode: string): number | null {
  const target = `socket:[${inode}]`;
  let pids: string[];
  try {
    pids = fs.readdirSync("/proc").filter((d) => /^\d+$/.test(d));
  } catch {
    return null;
  }
  for (const pid of pids) {
    try {
      const fds = fs.readdirSync(`/proc/${pid}/fd`);
      for (const fd of fds) {
        try {
          if (fs.readlinkSync(`/proc/${pid}/fd/${fd}`) === target) return Number(pid);
        } catch {
          // fd vanished mid-scan — skip
        }
      }
    } catch {
      // process vanished or not readable — skip
    }
  }
  return null;
}

function readProcessName(pid: number): string {
  try {
    return fs.readFileSync(`/proc/${pid}/comm`, "utf8").trim() || "unknown";
  } catch {
    return "unknown";
  }
}
