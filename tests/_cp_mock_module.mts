// Mock child_process module — replaces spawn, keeps everything else real.
// Imported by mitm-dnsConfig.test.ts via the loader hook in _cp_mock_hook.mts.
const realCp = await import("node:child_process");

export const execFile = realCp.execFile;
export const execFileSync = realCp.execFileSync;
export const fork = realCp.fork;
export const execSync = realCp.execSync;
export const spawnSync = realCp.spawnSync;

/** All spawn calls recorded as [command, args, options]. */
export const spawnCalls: Array<{ command: string; args: string[] }> = [];

export function spawn(command: string, args?: string[], options?: any) {
  spawnCalls.push({ command, args: args ?? [], options });
  return {
    stdin: { write: () => true, end: () => {} },
    stdout: { on: () => {} },
    stderr: { on: () => {} },
    on: function (ev: string, cb: (code: number) => void) {
      if (ev === "close") cb(0);
      return this;
    },
    kill: () => {},
  };
}

export function resetSpawnCalls() {
  spawnCalls.length = 0;
}

const childProcessMock = { execFile, execFileSync, fork, spawn, execSync, spawnSync };

export default childProcessMock;
