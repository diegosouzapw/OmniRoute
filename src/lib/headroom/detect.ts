/**
 * Headroom proxy detection helpers.
 *
 * Ported from upstream 9router (decolua/9router @ b55cf36d + 50ed79fe).
 * Original authors: decolua, Carmelo Campos (@carmelogunsroses), Cursor.
 *
 * Headroom is the optional third-party token-saver proxy (headroom-ai
 * Python CLI). OmniRoute can either:
 *   1. Manage a local proxy lifecycle (loopback URL → start/stop from the
 *      dashboard via `process.ts`).
 *   2. Use an external Docker sidecar proxy (non-loopback HEADROOM_URL).
 *      In this case we only probe /health; start/stop are NOT exposed.
 *
 * All functions here are pure / side-effect-free where possible so they can
 * be unit-tested without spawning processes.
 */

import { execFileSync } from "node:child_process";

const EXTRA_BINS = ["/usr/local/bin", "/opt/homebrew/bin", "/usr/bin", "/bin"];

export const PYTHON_CANDIDATES = [
  "python3.13",
  "python3.12",
  "python3.11",
  "python3.10",
  "python3",
  "python",
];

type EnvLike = Record<string, string | undefined>;

/**
 * Build the PATH used to locate a python interpreter (upstream 9router#2353).
 *
 * Version managers (mise, pyenv, asdf) and conda expose their interpreters via
 * shim dirs that are only added to PATH by interactive-shell activation
 * (`eval "$(mise activate bash)"` in `.bashrc`). The non-interactive server
 * process never runs that, so it would only ever see the system python. We
 * therefore prepend the well-known shim/bin dirs (respecting the managers' own
 * root env vars when set) so `findPython310` can discover a managed interpreter.
 *
 * Pure + env-injectable so it is unit-testable without spawning.
 */
export function buildPythonSearchPath(env: EnvLike = process.env): string {
  const home = env.HOME || "";
  const managerDirs: string[] = [];
  if (home || env.MISE_DATA_DIR) {
    managerDirs.push(`${env.MISE_DATA_DIR || `${home}/.local/share/mise`}/shims`);
  }
  if (home || env.PYENV_ROOT) {
    managerDirs.push(`${env.PYENV_ROOT || `${home}/.pyenv`}/shims`);
  }
  if (home || env.ASDF_DATA_DIR) {
    managerDirs.push(`${env.ASDF_DATA_DIR || `${home}/.asdf`}/shims`);
  }
  if (env.CONDA_PREFIX) {
    managerDirs.push(`${env.CONDA_PREFIX}/bin`);
  }
  if (home) {
    managerDirs.push(`${home}/.local/bin`); // pipx / uv installs
  }
  return [...managerDirs, ...EXTRA_BINS, env.PATH || ""].filter(Boolean).join(":");
}

/**
 * Resolve the ordered list of python commands to probe. A `HEADROOM_PYTHON`
 * override (absolute path or command name) is tried first, mirroring the
 * `HEADROOM_URL` escape hatch, so operators on exotic setups can point directly
 * at their interpreter (upstream 9router#2353).
 */
export function resolvePythonCandidates(env: EnvLike = process.env): string[] {
  const override = env.HEADROOM_PYTHON?.trim();
  return override ? [override, ...PYTHON_CANDIDATES] : [...PYTHON_CANDIDATES];
}
const MIN_VERSION: readonly [number, number] = [3, 10];
const HEADROOM_HEALTH_TIMEOUT_MS = 1500;
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]", "0.0.0.0"]);

export const DEFAULT_HEADROOM_URL = process.env.HEADROOM_URL || "http://localhost:8787";

export interface HeadroomStatus {
  installed: boolean;
  path: string | null;
  running: boolean;
  python: string | null;
  localUrl: boolean;
  canStart: boolean;
}

export interface BuildHeadroomStatusInput {
  url: string;
  binaryPath: string | null;
  python: string | null;
  proxyReachable: boolean;
}

// ──────────────── Pure helpers (unit-testable) ────────────────

export function isLoopbackHeadroomUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return LOOPBACK_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}

export function parsePortFromHeadroomUrl(url: string): number | null {
  try {
    const u = new URL(url);
    if (!u.port) return null;
    const p = parseInt(u.port, 10);
    if (Number.isFinite(p) && p > 0 && p < 65536) return p;
  } catch {
    // fall through
  }
  return null;
}

/**
 * Assemble the headroom status payload from already-resolved inputs.
 * Kept pure so unit tests can exercise every branch without spawning
 * processes or hitting the network.
 *
 * - `running` reflects /health reachability regardless of local CLI presence
 *   (pair commit 50ed79fe — Docker sidecar support).
 * - `canStart` is only true for a loopback URL with the CLI installed; we
 *   never spawn against a non-loopback URL.
 */
export function buildHeadroomStatus(input: BuildHeadroomStatusInput): HeadroomStatus {
  const installed = Boolean(input.binaryPath);
  const localUrl = isLoopbackHeadroomUrl(input.url);
  return {
    installed,
    path: input.binaryPath,
    running: input.proxyReachable,
    python: input.python,
    localUrl,
    canStart: installed && localUrl,
  };
}

// ──────────────── Side-effecting probes ────────────────

export function findHeadroomBinary(): string | null {
  try {
    // execFileSync (no shell): "which" is invoked directly with "headroom" as an
    // arg, so even if some upstream caller passes attacker-controlled input the
    // shell metacharacters cannot reach a shell parser.
    const out = execFileSync("which", ["headroom"], {
      stdio: ["ignore", "pipe", "ignore"],
      windowsHide: true,
      env: { ...process.env, PATH: buildPythonSearchPath() },
    })
      .toString()
      .trim();
    return out || null;
  } catch {
    return null;
  }
}

export function findPython310(): string | null {
  const searchPath = buildPythonSearchPath();
  for (const candidate of resolvePythonCandidates()) {
    try {
      // candidate is from a fixed allowlist (PYTHON_CANDIDATES) plus an optional
      // operator-set HEADROOM_PYTHON override — never remote/request input — but
      // use execFileSync anyway to remove the shell entirely.
      const ver = execFileSync(candidate, ["--version"], {
        stdio: ["ignore", "pipe", "ignore"],
        windowsHide: true,
        env: { ...process.env, PATH: searchPath },
      })
        .toString()
        .trim();
      const match = ver.match(/(\d+)\.(\d+)/);
      if (!match) continue;
      const major = parseInt(match[1], 10);
      const minor = parseInt(match[2], 10);
      if (major > MIN_VERSION[0] || (major === MIN_VERSION[0] && minor >= MIN_VERSION[1])) {
        return candidate;
      }
    } catch {
      // try next candidate
    }
  }
  return null;
}

export async function probeProxyRunning(url: string): Promise<boolean> {
  if (!url) return false;
  const base = String(url).replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/health`, {
      signal: AbortSignal.timeout(HEADROOM_HEALTH_TIMEOUT_MS),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Aggregated dashboard status. Composes the three probes above with the
 * pure builder so the I/O happens in one place.
 */
export async function getHeadroomStatus(url: string): Promise<HeadroomStatus> {
  const binaryPath = findHeadroomBinary();
  const python = findPython310();
  const proxyReachable = await probeProxyRunning(url);
  return buildHeadroomStatus({ url, binaryPath, python, proxyReachable });
}
