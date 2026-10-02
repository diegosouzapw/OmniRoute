import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const autoUpdate = await import("../../src/lib/system/autoUpdate.ts");
const {
  getAutoUpdateConfig,
  validateAutoUpdateRuntime,
  buildCommandUpdateScript,
  launchAutoUpdate,
} = autoUpdate;

const env = (extra: Record<string, string>) =>
  ({ DATA_DIR: "/tmp/omniroute-test", ...extra }) as NodeJS.ProcessEnv;

test("AUTO_UPDATE_MODE=command is honoured and reads AUTO_UPDATE_COMMAND", () => {
  const config = getAutoUpdateConfig(
    env({ AUTO_UPDATE_MODE: "command", AUTO_UPDATE_COMMAND: " /opt/update.sh " })
  );
  assert.equal(config.mode, "command");
  assert.equal(config.command, "/opt/update.sh");
});

test("command mode without AUTO_UPDATE_COMMAND is reported unsupported", async () => {
  const config = getAutoUpdateConfig(env({ AUTO_UPDATE_MODE: "command" }));
  const result = await validateAutoUpdateRuntime(config, undefined, async () => true);
  assert.equal(result.supported, false);
  assert.match(result.reason ?? "", /AUTO_UPDATE_COMMAND/);
});

test("command mode with a missing executable is reported unsupported", async () => {
  const config = getAutoUpdateConfig(
    env({ AUTO_UPDATE_MODE: "command", AUTO_UPDATE_COMMAND: "/nope/update.sh" })
  );
  const result = await validateAutoUpdateRuntime(config, undefined, async () => false);
  assert.equal(result.supported, false);
  assert.match(result.reason ?? "", /\/nope\/update\.sh/);
});

test("command mode with an existing executable is supported", async () => {
  const config = getAutoUpdateConfig(
    env({ AUTO_UPDATE_MODE: "command", AUTO_UPDATE_COMMAND: "/opt/update.sh" })
  );
  const result = await validateAutoUpdateRuntime(config, undefined, async () => true);
  assert.deepEqual(result, { supported: true, reason: null, composeCommand: null });
});

test("buildCommandUpdateScript passes the version as one shell-quoted argument", () => {
  const script = buildCommandUpdateScript("3.8.52", "/opt/my updater/run.sh");
  assert.equal(script, "set -eu\nexec '/opt/my updater/run.sh' '3.8.52'");
  assert.match(
    buildCommandUpdateScript("1.0.0';rm -rf /;'", "/x"),
    /'1\.0\.0'"'"';rm -rf \/;'"'"''/
  );
});

test("launchAutoUpdate starts the configured command detached", async () => {
  const dir = mkdtempSync(path.join(tmpdir(), "omniroute-cmd-update-"));
  const calls: Array<{ cmd: string; args: string[]; opts: Record<string, unknown> }> = [];
  const spawnImpl = ((cmd: string, args: string[], opts: Record<string, unknown>) => {
    calls.push({ cmd, args, opts });
    return { unref() {} };
  }) as unknown as typeof import("node:child_process").spawn;

  const result = await launchAutoUpdate({
    latest: "3.8.52",
    env: env({
      AUTO_UPDATE_MODE: "command",
      AUTO_UPDATE_COMMAND: "/opt/update.sh",
      AUTO_UPDATE_LOG_PATH: path.join(dir, "auto-update.log"),
    }),
    spawnImpl,
    existsImpl: async () => true,
  });

  assert.equal(result.started, true);
  assert.equal(result.channel, "command");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].cmd, "sh");
  assert.deepEqual(calls[0].args, ["-lc", "set -eu\nexec '/opt/update.sh' '3.8.52'"]);
  assert.equal(calls[0].opts.detached, true);
});
