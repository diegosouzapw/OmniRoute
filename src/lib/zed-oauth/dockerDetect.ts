import fs from "fs";

export interface DockerDetectDeps {
  existsSync: (path: string) => boolean;
  readFileSync: (path: string, encoding: string) => string;
}

const defaultDeps: DockerDetectDeps = {
  existsSync: fs.existsSync,
  readFileSync: (path, encoding) => fs.readFileSync(path, encoding as BufferEncoding) as string,
};

/**
 * Returns true when OmniRoute appears to be running inside a Docker container.
 * Uses two complementary heuristics that work on Linux-based Docker images:
 *   1. Presence of /.dockerenv (written by Docker at container startup).
 *   2. The string "docker" appearing in /proc/1/cgroup (Linux only).
 *
 * This is intentionally a best-effort check; false negatives on exotic runtimes
 * (e.g. podman without Docker compatibility) are acceptable — the caller degrades
 * gracefully and still surfaces the manual-import option.
 *
 * @param deps Optional dependency injection for testing.
 */
export function isRunningInDocker(deps: DockerDetectDeps = defaultDeps): boolean {
  try {
    if (deps.existsSync("/.dockerenv")) return true;
  } catch {
    // ignore — not Linux or permission denied
  }
  try {
    const cgroup = deps.readFileSync("/proc/1/cgroup", "utf8");
    if (cgroup.includes("docker")) return true;
  } catch {
    // ignore — not Linux or /proc not mounted
  }
  return false;
}
