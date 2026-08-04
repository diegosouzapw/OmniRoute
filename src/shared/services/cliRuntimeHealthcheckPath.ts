import path from "path";

/**
 * #8036: npm-installed CLIs (e.g. codex) are `#!/usr/bin/env node` shebang
 * scripts — running them needs `node` resolvable on the child's PATH. A
 * minimal launcher PATH (systemd/docker/PM2/Electron) may omit this Node's
 * own bin dir even though the binary was correctly LOCATED via the
 * PATH-independent known-path search (cliRuntime.ts's getKnownToolPaths()
 * already merges it in for locating). Merge it into the healthcheck spawn's
 * PATH too so the shebang can always resolve its interpreter.
 */
export const buildHealthcheckPath = (callerPath: string, nodeBinDir: string): string => {
  const entries = callerPath.split(path.delimiter);
  if (entries.includes(nodeBinDir)) {
    return callerPath;
  }
  return [callerPath, nodeBinDir].filter(Boolean).join(path.delimiter);
};
