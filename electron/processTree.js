"use strict";

// Cross-platform "kill the whole process tree" helper (#3347).
//
// The embedded server is spawned via process.execPath (= omniroute.exe) with
// ELECTRON_RUN_AS_NODE=1, and it in turn spawns grandchildren (embedded services,
// MITM proxy, tunnels — several also omniroute.exe-as-node). On Windows, Node's
// ChildProcess.kill()/SIGTERM/SIGKILL only terminate the DIRECT child via
// TerminateProcess — they do NOT walk the tree. Surviving grandchildren keep a lock
// on omniroute.exe, so the process "hangs in memory" after Exit and updates fail with
// "file in use". Windows needs `taskkill /PID <pid> /T /F` (the /T flag terminates the
// process AND its descendants). POSIX keeps signal-based termination, which propagates.

const { spawn } = require("child_process");

/**
 * Terminate a child process and all of its descendants.
 * @param {{ pid?: number, kill?: (signal?: string) => void } | null | undefined} proc
 * @param {{ platform?: string, signal?: string, spawnFn?: typeof spawn }} [options]
 */
function killProcessTree(proc, options = {}) {
  if (!proc || proc.pid == null) return;
  const platform = options.platform || process.platform;
  const signal = options.signal || "SIGTERM";

  if (platform === "win32") {
    const spawnFn = options.spawnFn || spawn;
    try {
      // Array args + no shell → the pid (an integer we own) is never interpolated into a
      // shell command string (Hard Rule #13). /T walks the tree, /F forces termination.
      const killer = spawnFn("taskkill", ["/PID", String(proc.pid), "/T", "/F"], {
        windowsHide: true,
      });
      if (killer && typeof killer.on === "function") {
        killer.on("error", () => {
          try {
            proc.kill(signal);
          } catch {
            /* already dead */
          }
        });
      }
    } catch {
      // taskkill unavailable (rare) — fall back to the direct kill.
      try {
        proc.kill(signal);
      } catch {
        /* already dead */
      }
    }
    return;
  }

  // POSIX: signals propagate to the process group of a normally-spawned child.
  try {
    proc.kill(signal);
  } catch {
    /* already dead */
  }
}

module.exports = { killProcessTree };
