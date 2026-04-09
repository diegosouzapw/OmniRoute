import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const autoUpdate = await import("../../src/lib/system/autoUpdate.ts");

test("auto update config normalizes env values and local source installs to source mode", () => {
  const config = autoUpdate.getAutoUpdateConfig({
    DATA_DIR: "/tmp/omniroute-data",
    AUTO_UPDATE_MODE: "npm",
    AUTO_UPDATE_REPO_DIR: "/workspace/custom-omniroute",
    AUTO_UPDATE_COMPOSE_FILE: "/workspace/custom-omniroute/compose.yml",
    AUTO_UPDATE_COMPOSE_PROFILE: "desktop",
    AUTO_UPDATE_SERVICE: "omniroute-desktop",
    AUTO_UPDATE_GIT_REMOTE: "upstream",
    AUTO_UPDATE_PATCH_COMMITS: "abc123, def456 ghi789",
    AUTO_UPDATE_LOG_PATH: "/tmp/omniroute-data/auto-update.log",
  });

  assert.equal(config.mode, "source");
  assert.equal(config.repoDir, "/workspace/custom-omniroute");
  assert.equal(config.composeFile, "/workspace/custom-omniroute/compose.yml");
  assert.equal(config.composeProfile, "desktop");
  assert.equal(config.composeService, "omniroute-desktop");
  assert.equal(config.gitRemote, "upstream");
  assert.deepEqual(config.patchCommits, ["abc123", "def456", "ghi789"]);
  assert.equal(config.logPath, "/tmp/omniroute-data/auto-update.log");
});

test("detectComposeCommand prefers docker compose and falls back to docker-compose", async () => {
  const dockerCompose = await autoUpdate.detectComposeCommand(async (command, args) => {
    if (command === "docker" && args[0] === "compose") {
      return { stdout: "Docker Compose version v2", stderr: "" };
    }
    throw new Error("unexpected");
  });
  assert.equal(dockerCompose, "docker compose");

  const dockerComposeLegacy = await autoUpdate.detectComposeCommand(async (command, args) => {
    if (command === "docker") throw new Error("missing");
    if (command === "docker-compose" && args[0] === "version") {
      return { stdout: "docker-compose 1.29", stderr: "" };
    }
    throw new Error("unexpected");
  });
  assert.equal(dockerComposeLegacy, "docker-compose");

  const none = await autoUpdate.detectComposeCommand(async () => {
    throw new Error("missing");
  });
  assert.equal(none, null);
});

test("validateAutoUpdateRuntime covers source, docker preconditions and successful docker runtime", async () => {
  const sourceValidation = await autoUpdate.validateAutoUpdateRuntime(
    {
      mode: "source",
      repoDir: "/repo",
      composeFile: "/repo/docker-compose.yml",
      composeProfile: "cli",
      composeService: "omniroute-cli",
      gitRemote: "origin",
      patchCommits: [],
      logPath: "/tmp/log",
    },
    async (command, args) => {
      if (command === "git" && args[0] === "--version") {
        return { stdout: "git version 2.0", stderr: "" };
      }
      throw new Error(`unexpected: ${command}`);
    },
    async () => true
  );

  assert.deepEqual(sourceValidation, {
    supported: true,
    reason: null,
    composeCommand: null,
  });

  const sourceMissingGitRepo = await autoUpdate.validateAutoUpdateRuntime(
    {
      mode: "source",
      repoDir: "/repo",
      composeFile: "/repo/docker-compose.yml",
      composeProfile: "cli",
      composeService: "omniroute-cli",
      gitRemote: "origin",
      patchCommits: [],
      logPath: "/tmp/log",
    },
    async () => ({ stdout: "git version 2.0", stderr: "" }),
    async () => false
  );
  assert.equal(sourceMissingGitRepo.supported, false);
  assert.match(sourceMissingGitRepo.reason, /Not a git repository/);

  const sourceMissingGit = await autoUpdate.validateAutoUpdateRuntime(
    {
      mode: "source",
      repoDir: "/repo",
      composeFile: "/repo/docker-compose.yml",
      composeProfile: "cli",
      composeService: "omniroute-cli",
      gitRemote: "origin",
      patchCommits: [],
      logPath: "/tmp/log",
    },
    async () => {
      throw new Error("git missing");
    },
    async () => true
  );
  assert.equal(sourceMissingGit.supported, false);
  assert.match(sourceMissingGit.reason, /git is not available/);

  const missingRepo = await autoUpdate.validateAutoUpdateRuntime(
    {
      mode: "docker-compose",
      repoDir: "/repo",
      composeFile: "/repo/docker-compose.yml",
      composeProfile: "cli",
      composeService: "omniroute-cli",
      gitRemote: "origin",
      patchCommits: [],
      logPath: "/tmp/log",
    },
    async () => ({ stdout: "", stderr: "" }),
    async (targetPath) => targetPath !== "/repo"
  );
  assert.equal(missingRepo.supported, false);
  assert.match(missingRepo.reason, /Repository directory not found/);

  const missingComposeFile = await autoUpdate.validateAutoUpdateRuntime(
    {
      mode: "docker-compose",
      repoDir: "/repo",
      composeFile: "/repo/docker-compose.yml",
      composeProfile: "cli",
      composeService: "omniroute-cli",
      gitRemote: "origin",
      patchCommits: [],
      logPath: "/tmp/log",
    },
    async () => ({ stdout: "", stderr: "" }),
    async (targetPath) => targetPath === "/repo"
  );
  assert.equal(missingComposeFile.supported, false);
  assert.match(missingComposeFile.reason, /Compose file not found/);

  const missingGit = await autoUpdate.validateAutoUpdateRuntime(
    {
      mode: "docker-compose",
      repoDir: "/repo",
      composeFile: "/repo/docker-compose.yml",
      composeProfile: "cli",
      composeService: "omniroute-cli",
      gitRemote: "origin",
      patchCommits: [],
      logPath: "/tmp/log",
    },
    async (command) => {
      if (command === "git") throw new Error("git missing");
      return { stdout: "", stderr: "" };
    },
    async () => true
  );
  assert.equal(missingGit.supported, false);
  assert.match(missingGit.reason, /git is not available/);

  const missingComposeCommand = await autoUpdate.validateAutoUpdateRuntime(
    {
      mode: "docker-compose",
      repoDir: "/repo",
      composeFile: "/repo/docker-compose.yml",
      composeProfile: "cli",
      composeService: "omniroute-cli",
      gitRemote: "origin",
      patchCommits: [],
      logPath: "/tmp/log",
    },
    async (command) => {
      if (command === "git") return { stdout: "git version 2", stderr: "" };
      throw new Error("compose missing");
    },
    async () => true
  );
  assert.equal(missingComposeCommand.supported, false);
  assert.match(missingComposeCommand.reason, /Neither docker compose nor docker-compose/);

  const supported = await autoUpdate.validateAutoUpdateRuntime(
    {
      mode: "docker-compose",
      repoDir: "/repo",
      composeFile: "/repo/docker-compose.yml",
      composeProfile: "cli",
      composeService: "omniroute-cli",
      gitRemote: "origin",
      patchCommits: [],
      logPath: "/tmp/log",
    },
    async (command, args) => {
      if (command === "git" && args[0] === "--version") {
        return { stdout: "git version 2.0", stderr: "" };
      }
      if (command === "docker" && args[0] === "compose") {
        return { stdout: "Docker Compose version v2", stderr: "" };
      }
      throw new Error(`unexpected: ${command}`);
    },
    async () => true
  );
  assert.deepEqual(supported, {
    supported: true,
    reason: null,
    composeCommand: "docker compose",
  });
});

test("ensureGitTagExists verifies refs/tags paths and throws a clear error when missing", async () => {
  const calls = [];
  await autoUpdate.ensureGitTagExists("v3.6.0", async (command, args, options) => {
    calls.push({ command, args, options });
    return { stdout: "deadbeef", stderr: "" };
  });

  assert.deepEqual(calls, [
    {
      command: "git",
      args: ["rev-parse", "-q", "--verify", "refs/tags/v3.6.0"],
      options: {
        timeout: 10_000,
        cwd: process.cwd(),
      },
    },
  ]);

  await assert.rejects(
    autoUpdate.ensureGitTagExists("v9.9.9", async () => {
      throw new Error("missing tag");
    }),
    /Git tag not found: v9\.9\.9/
  );
});

test("auto update script builders generate npm, source, and docker-compose scripts with quoting and patch commits", () => {
  const npmScript = autoUpdate.buildNpmUpdateScript("3.6.0");
  assert.match(npmScript, /npm install -g omniroute@3.6.0/);
  assert.match(npmScript, /pm2 restart omniroute \|\| true/);
  assert.match(npmScript, /Successfully updated to v3.6.0/);

  const sourceScript = autoUpdate.buildSourceUpdateScript("3.6.0", "upstream");
  assert.match(sourceScript, /git fetch --tags 'upstream'/);
  assert.match(sourceScript, /git stash --include-untracked/);
  assert.match(sourceScript, /node scripts\/sync-env\.mjs 2>\/dev\/null \|\| true/);
  assert.match(sourceScript, /Successfully updated to v3\.6\.0/);

  const dockerScript = autoUpdate.buildDockerComposeUpdateScript({
    latest: "3.6.0",
    composeCommand: "docker-compose",
    config: {
      mode: "docker-compose",
      repoDir: "/workspace/with spaces",
      composeFile: "/workspace/with spaces/docker-compose.yml",
      composeProfile: "cli",
      composeService: "omniroute-cli",
      gitRemote: "origin",
      patchCommits: ["abc123", "feature'fix"],
      logPath: "/tmp/logs/auto-update.log",
    },
  });

  assert.match(dockerScript, /TARGET_TAG='v3\.6\.0'/);
  assert.match(dockerScript, /git cherry-pick --keep-redundant-commits 'abc123' 'feature'"'"'fix'/);
  assert.match(dockerScript, /docker-compose -f "\$COMPOSE_FILE" up -d --build "\$SERVICE"/);
  assert.match(dockerScript, /Successfully switched to v3\.6\.0 via docker-compose/);
});

test("launchAutoUpdate returns validation failures and starts detached update scripts when runtime is supported", async () => {
  const unsupported = await autoUpdate.launchAutoUpdate({
    latest: "3.6.0",
    env: {
      AUTO_UPDATE_MODE: "source",
      AUTO_UPDATE_LOG_PATH: "/tmp/auto-update-source.log",
    },
    existsImpl: async () => false,
  });

  assert.equal(unsupported.started, false);
  assert.equal(unsupported.channel, "source");
  assert.match(unsupported.error, /Not a git repository/);

  const sourceSpawnCalls = [];
  const sourceStarted = await autoUpdate.launchAutoUpdate({
    latest: "3.6.0",
    env: {
      AUTO_UPDATE_MODE: "source",
      AUTO_UPDATE_GIT_REMOTE: "upstream",
      AUTO_UPDATE_LOG_PATH: "/tmp/auto-update-source.log",
    },
    execFileImpl: async (command, args) => {
      if (command === "git" && args[0] === "--version") {
        return { stdout: "git version 2.0", stderr: "" };
      }
      throw new Error(`unexpected exec: ${command}`);
    },
    existsImpl: async () => true,
    spawnImpl: (command, args, options) => {
      sourceSpawnCalls.push({ command, args, options, unrefCalled: false });
      return {
        unref() {
          sourceSpawnCalls[0].unrefCalled = true;
        },
      };
    },
  });

  assert.equal(sourceStarted.started, true);
  assert.equal(sourceStarted.channel, "source");
  assert.equal(sourceStarted.composeCommand, null);
  assert.equal(sourceSpawnCalls.length, 1);
  assert.match(sourceSpawnCalls[0].args[1], /git fetch --tags 'upstream'/);
  assert.match(sourceSpawnCalls[0].args[1], /npm run build/);
  assert.equal(sourceSpawnCalls[0].unrefCalled, true);

  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-autoupdate-"));
  const repoDir = path.join(tempRoot, "repo");
  const composeFile = path.join(repoDir, "docker-compose.yml");
  const logPath = path.join(tempRoot, "logs", "auto-update.log");
  fs.mkdirSync(repoDir, { recursive: true });
  fs.writeFileSync(composeFile, "services: {}\n");

  const execCalls = [];
  const spawnCalls = [];
  const started = await autoUpdate.launchAutoUpdate({
    latest: "3.6.0",
    env: {
      AUTO_UPDATE_MODE: "docker-compose",
      AUTO_UPDATE_REPO_DIR: repoDir,
      AUTO_UPDATE_COMPOSE_FILE: composeFile,
      AUTO_UPDATE_COMPOSE_PROFILE: "cli",
      AUTO_UPDATE_SERVICE: "omniroute-cli",
      AUTO_UPDATE_GIT_REMOTE: "origin",
      AUTO_UPDATE_PATCH_COMMITS: "abc123",
      AUTO_UPDATE_LOG_PATH: logPath,
    },
    execFileImpl: async (command, args) => {
      execCalls.push([command, args]);
      if (command === "git" && args[0] === "--version") {
        return { stdout: "git version 2.0", stderr: "" };
      }
      if (command === "docker" && args[0] === "compose") {
        return { stdout: "Docker Compose version v2", stderr: "" };
      }
      throw new Error(`unexpected exec: ${command}`);
    },
    spawnImpl: (command, args, options) => {
      spawnCalls.push({ command, args, options, unrefCalled: false });
      return {
        unref() {
          spawnCalls[0].unrefCalled = true;
        },
      };
    },
  });

  try {
    assert.equal(started.started, true);
    assert.equal(started.channel, "docker-compose");
    assert.equal(started.composeCommand, "docker compose");
    assert.equal(started.logPath, logPath);
    assert.equal(
      execCalls.some(([command]) => command === "git"),
      true
    );
    assert.equal(
      execCalls.some(([command]) => command === "docker"),
      true
    );
    assert.equal(spawnCalls.length, 1);
    assert.equal(spawnCalls[0].command, "sh");
    assert.deepEqual(spawnCalls[0].args.slice(0, 2), ["-lc", spawnCalls[0].args[1]]);
    assert.equal(spawnCalls[0].options.detached, true);
    assert.equal(spawnCalls[0].options.stdio[0], "ignore");
    assert.equal(typeof spawnCalls[0].options.stdio[1], "number");
    assert.equal(typeof spawnCalls[0].options.stdio[2], "number");
    assert.equal(spawnCalls[0].unrefCalled, true);
    assert.match(spawnCalls[0].args[1], /git cherry-pick --keep-redundant-commits 'abc123'/);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});
