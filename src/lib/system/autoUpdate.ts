import { execFile, spawn } from "node:child_process";
import { closeSync, mkdirSync, openSync, existsSync } from "node:fs";
import { access } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { homedir } from "node:os";

const execFileAsync = promisify(execFile);

/** @internal — exported for testability. */
export function resolveProjectRoot(
  fallback: string,
  startDir: string = typeof __dirname !== "undefined" ? __dirname : process.cwd()
): string {
  const markers = ["package.json", ".git"] as const;
  let dir = path.resolve(startDir);
  while (true) {
    if (markers.some((m) => existsSync(path.join(dir, m)))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return fallback;
}

const FALLBACK_CWD = process.env.HOME || homedir() || "/tmp";
export const PROJECT_ROOT: string = resolveProjectRoot(FALLBACK_CWD);

type ComposeCommand = "docker compose" | "docker-compose";
export type AutoUpdateMode = "npm" | "docker-compose" | "source";

type ExecFileLike = typeof execFileAsync;
type SpawnLike = typeof spawn;

export type AutoUpdateConfig = {
  mode: AutoUpdateMode;
  repoDir: string;
  composeFile: string;
  composeProfile: string;
  composeService: string;
  gitRemote: string;
  patchCommits: string[];
  logPath: string;
};

export type AutoUpdateValidation = {
  supported: boolean;
  reason: string | null;
  composeCommand: ComposeCommand | null;
};

export type AutoUpdateLaunchResult = {
  started: boolean;
  channel: AutoUpdateMode;
  logPath: string;
  composeCommand: ComposeCommand | null;
  error?: string;
};

function normalizeMode(raw: string | undefined): AutoUpdateMode {
  if (raw === "docker-compose" || raw === "source") {
    return raw;
  }
  return "npm";
}

/**
 * Match `node_modules` as a real path **segment**, not a substring — a folder literally named
 * "my-node_modules-backup" must NOT count as an installed-package location. Operates on a local
 * filesystem path (`__dirname`), never untrusted input; the pattern is linear (ReDoS-safe).
 *
 * @internal — exported for testability.
 */
export function isUnderNodeModules(dir: string): boolean {
  return /(^|[/\\])node_modules([/\\]|$)/.test(dir);
}

/**
 * Decide the effective auto-update channel when the operator left it at the default ("npm").
 *
 * - A source checkout (`.git` present) always self-updates via git, even if it also lives under a
 *   `node_modules` path.
 * - Otherwise "npm" mode only makes sense when the running module sits under a real
 *   `node_modules/` path segment (a global or local package install). Anything else — a downloaded
 *   build/zip with no `.git` — is treated as source.
 *
 * Behavior matches the previous inline heuristic for every realistic path; it only tightens the
 * pathological case where "node_modules" appeared as a substring but not a path segment (Bug 1,
 * security-report v3.8.15). Pure + injectable so the branch logic is unit-testable.
 *
 * @internal — exported for testability.
 */
export function resolveAutoUpdateMode(
  rawMode: AutoUpdateMode,
  detection: { isGitRepo: boolean; currentDir: string }
): AutoUpdateMode {
  if (rawMode !== "npm") return rawMode;
  if (detection.isGitRepo) return "source";
  return isUnderNodeModules(detection.currentDir) ? "npm" : "source";
}

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'"'"'`)}'`;
}

function parsePatchCommits(raw: string | undefined): string[] {
  return (raw || "")
    .split(/[\s,]+/)
    .map((value) => value.trim())
    .filter(Boolean);
}

export function getAutoUpdateConfig(env: NodeJS.ProcessEnv = process.env): AutoUpdateConfig {
  const dataDir = env.DATA_DIR || "/tmp/omniroute";
  const repoDir = env.AUTO_UPDATE_REPO_DIR || "/workspace/omniroute";

  let mode = normalizeMode(env.AUTO_UPDATE_MODE);
  if (mode === "npm") {
    const isGitRepo = existsSync(path.join(PROJECT_ROOT, ".git"));
    const currentDir = typeof __dirname !== "undefined" ? __dirname : PROJECT_ROOT;
    mode = resolveAutoUpdateMode(mode, { isGitRepo, currentDir });
  }

  return {
    mode,
    repoDir,
    composeFile: env.AUTO_UPDATE_COMPOSE_FILE || path.join(repoDir, "docker-compose.yml"),
    composeProfile: env.AUTO_UPDATE_COMPOSE_PROFILE || "cli",
    composeService: env.AUTO_UPDATE_SERVICE || "omniroute-cli",
    gitRemote: env.AUTO_UPDATE_GIT_REMOTE || "origin",
    patchCommits: parsePatchCommits(env.AUTO_UPDATE_PATCH_COMMITS),
    logPath: env.AUTO_UPDATE_LOG_PATH || path.join(dataDir, "logs", "auto-update.log"),
  };
}

export async function detectComposeCommand(
  execFileImpl: ExecFileLike = execFileAsync
): Promise<ComposeCommand | null> {
  try {
    await execFileImpl("docker", ["compose", "version"], { timeout: 10_000 });
    return "docker compose";
  } catch {
    // Fall through.
  }

  try {
    await execFileImpl("docker-compose", ["version"], { timeout: 10_000 });
    return "docker-compose";
  } catch {
    return null;
  }
}

export async function validateAutoUpdateRuntime(
  config: AutoUpdateConfig,
  execFileImpl: ExecFileLike = execFileAsync,
  existsImpl: (targetPath: string) => Promise<boolean> = pathExists
): Promise<AutoUpdateValidation> {
  if (config.mode === "source") {
    const gitDir = path.join(PROJECT_ROOT, ".git");
    if (!(await existsImpl(gitDir))) {
      return {
        supported: false,
        reason: "Not a git repository. Download source or use npm install -g.",
        composeCommand: null,
      };
    }

    try {
      await execFileImpl("git", ["--version"], { timeout: 10_000 });
    } catch {
      return {
        supported: false,
        reason: "git is not available. Install git to enable auto-update.",
        composeCommand: null,
      };
    }

    return {
      supported: true,
      reason: null,
      composeCommand: null,
    };
  }

  if (config.mode !== "docker-compose") {
    return { supported: true, reason: null, composeCommand: null };
  }

  if (!(await existsImpl(config.repoDir))) {
    return {
      supported: false,
      reason: `Repository directory not found: ${config.repoDir}`,
      composeCommand: null,
    };
  }

  if (!(await existsImpl(config.composeFile))) {
    return {
      supported: false,
      reason: `Compose file not found: ${config.composeFile}`,
      composeCommand: null,
    };
  }

  if (!(await existsImpl("/var/run/docker.sock"))) {
    return {
      supported: false,
      reason: "Docker socket is not mounted into the OmniRoute container.",
      composeCommand: null,
    };
  }

  try {
    await execFileImpl("git", ["--version"], { timeout: 10_000 });
  } catch {
    return {
      supported: false,
      reason: "git is not available inside the OmniRoute container.",
      composeCommand: null,
    };
  }

  const composeCommand = await detectComposeCommand(execFileImpl);
  if (!composeCommand) {
    return {
      supported: false,
      reason:
        "Neither docker compose nor docker-compose is available inside the OmniRoute container.",
      composeCommand: null,
    };
  }

  return { supported: true, reason: null, composeCommand };
}

export async function ensureGitTagExists(
  targetTag: string,
  execFileImpl: ExecFileLike = execFileAsync,
  cwd = PROJECT_ROOT
): Promise<void> {
  try {
    await execFileImpl("git", ["rev-parse", "-q", "--verify", `refs/tags/${targetTag}`], {
      timeout: 10_000,
      cwd,
    });
  } catch {
    throw new Error(`Git tag not found: ${targetTag}`);
  }
}

export function buildNpmUpdateScript(latest: string): string {
  return [
    "set -eu",
    // --include=optional keeps the optionalDependencies (better-sqlite3, keytar,
    // tls-client, and the llmlingua SLM stack) installed on every update so an
    // `omit=optional` config / .npmrc cannot silently drop them.
    `npm install -g omniroute@${latest} --include=optional --ignore-scripts --legacy-peer-deps`,
    "if command -v pm2 >/dev/null 2>&1; then",
    "  pm2 restart omniroute || true",
    "fi",
    `echo \"[AutoUpdate] Successfully updated to v${latest}.\"`,
  ].join("\n");
}

export function buildSourceUpdateScript(latest: string, gitRemote = "origin"): string {
  const targetTag = latest.startsWith("v") ? latest : `v${latest}`;

  return [
    "set -eu",
    "git stash --include-untracked 2>/dev/null || true",
    `git fetch --tags ${shellQuote(gitRemote)}`,
    `if ! git rev-parse -q --verify "refs/tags/${targetTag}" >/dev/null 2>&1; then`,
    `  echo "[AutoUpdate] Tag ${targetTag} not found." >&2`,
    "  exit 1",
    "fi",
    'backup_branch="pre-update/$(git rev-parse --short HEAD)-$(date +%Y%m%d-%H%M%S)"',
    'git branch "$backup_branch" 2>/dev/null || true',
    `git checkout "${targetTag}"`,
    "npm install --include=optional --legacy-peer-deps",
    "node scripts/dev/sync-env.mjs 2>/dev/null || true",
    "npm run build",
    "if command -v pm2 >/dev/null 2>&1; then",
    "  pm2 restart omniroute --update-env || true",
    "fi",
    `echo "[AutoUpdate] Successfully updated to ${targetTag}."`,
  ].join("\n");
}

export function buildDockerComposeUpdateScript({
  latest,
  config,
  composeCommand,
}: {
  latest: string;
  config: AutoUpdateConfig;
  composeCommand: ComposeCommand;
}): string {
  const targetTag = latest.startsWith("v") ? latest : `v${latest}`;
  const composeInvocation =
    composeCommand === "docker compose"
      ? 'docker compose -f "$COMPOSE_FILE" up -d --build "$SERVICE"'
      : 'docker-compose -f "$COMPOSE_FILE" up -d --build "$SERVICE"';
  const patchLines = config.patchCommits.length
    ? [`git cherry-pick --keep-redundant-commits ${config.patchCommits.map(shellQuote).join(" ")}`]
    : [];

  return [
    "set -eu",
    'export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH"',
    `REPO_DIR=${shellQuote(config.repoDir)}`,
    `COMPOSE_FILE=${shellQuote(config.composeFile)}`,
    `PROFILE=${shellQuote(config.composeProfile)}`,
    `SERVICE=${shellQuote(config.composeService)}`,
    `REMOTE=${shellQuote(config.gitRemote)}`,
    `TARGET_TAG=${shellQuote(targetTag)}`,
    'cd "$REPO_DIR"',
    'git config --global --add safe.directory "$REPO_DIR" >/dev/null 2>&1 || true',
    'if [ -n "$(git status --porcelain)" ]; then',
    '  echo "[AutoUpdate] Refusing update: git worktree has local changes." >&2',
    "  exit 1",
    "fi",
    'git fetch --tags "$REMOTE"',
    'if ! git rev-parse -q --verify "refs/tags/$TARGET_TAG" >/dev/null 2>&1; then',
    '  echo "[AutoUpdate] Tag $TARGET_TAG not found on remote $REMOTE." >&2',
    "  exit 1",
    "fi",
    'backup_branch="autoupdate/pre-${TARGET_TAG#v}-$(date +%Y%m%d-%H%M%S)"',
    'git branch "$backup_branch" >/dev/null 2>&1 || true',
    'git checkout -B "autoupdate/${TARGET_TAG#v}" "$TARGET_TAG"',
    ...patchLines,
    'export COMPOSE_PROFILES="$PROFILE"',
    composeInvocation,
    `echo "[AutoUpdate] Successfully switched to ${targetTag} via ${composeCommand}."`,
  ].join("\n");
}

export async function launchAutoUpdate({
  latest,
  env = process.env,
  execFileImpl = execFileAsync,
  spawnImpl = spawn,
  existsImpl = pathExists,
}: {
  latest: string;
  env?: NodeJS.ProcessEnv;
  execFileImpl?: ExecFileLike;
  spawnImpl?: SpawnLike;
  existsImpl?: (targetPath: string) => Promise<boolean>;
}): Promise<AutoUpdateLaunchResult> {
  const config = getAutoUpdateConfig(env);
  const validation = await validateAutoUpdateRuntime(config, execFileImpl, existsImpl);

  if (!validation.supported) {
    return {
      started: false,
      channel: config.mode,
      logPath: config.logPath,
      composeCommand: validation.composeCommand,
      error: validation.reason || "Auto-update runtime is not available.",
    };
  }

  const script =
    config.mode === "docker-compose"
      ? buildDockerComposeUpdateScript({
          latest,
          config,
          composeCommand: validation.composeCommand || "docker-compose",
        })
      : config.mode === "source"
        ? buildSourceUpdateScript(latest, config.gitRemote)
        : buildNpmUpdateScript(latest);

  mkdirSync(path.dirname(config.logPath), { recursive: true });
  const logFd = openSync(config.logPath, "a");
  const child = spawnImpl("sh", ["-lc", script], {
    detached: true,
    stdio: ["ignore", logFd, logFd],
    env: { ...process.env, ...env },
  });
  closeSync(logFd);
  child.unref();

  return {
    started: true,
    channel: config.mode,
    logPath: config.logPath,
    composeCommand: validation.composeCommand,
  };
}
