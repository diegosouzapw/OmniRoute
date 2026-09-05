import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

// The compose `host` profile mounts the operator's real config dirs at
// /host-home, which sits OUTSIDE the container user's home (/home/node). Before
// this fix getCliConfigHome() silently dropped that override and every write
// landed back in the ephemeral container home. See docker-compose.yml.

const modulePath = path.join(process.cwd(), "src/shared/services/cliRuntime.ts");
const originalEnv = { ...process.env };

async function importFresh(label: string) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}-${Math.random()}`);
}

function restoreEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
}

test.afterEach(restoreEnv);

// Deps are injected because CI and dev machines are not containers and macOS
// has no /proc/self/mountinfo at all.
const HOST_PROFILE_MOUNTINFO = [
  "31 28 254:1 /volumes/omniroute-data/_data /app/data rw,relatime - ext4 /dev/vda1 rw",
  "44 28 254:1 /Users/me/.codex /host-home/.codex rw,relatime - ext4 /dev/vda1 rw",
  "45 28 254:1 /Users/me/.claude /host-home/.claude rw,relatime - ext4 /dev/vda1 rw",
].join("\n");

const containerDeps = {
  existsSync: (p: string) => p === "/.dockerenv",
  readFileSync: (p: string, _enc: string) => {
    if (p === "/proc/self/mountinfo") return HOST_PROFILE_MOUNTINFO;
    if (p === "/proc/1/cgroup") return "12:cpuset:/docker/abc\n";
    throw new Error("ENOENT");
  },
  env: {} as NodeJS.ProcessEnv,
};

const hostDeps = {
  existsSync: (_p: string) => false,
  readFileSync: (_p: string, _enc: string) => "12:cpuset:/\n",
  env: {} as NodeJS.ProcessEnv,
};

test("container + bind-mounted CLI_CONFIG_HOME outside home is honoured", async () => {
  const cliRuntime = await importFresh("container-mounted");
  process.env.CLI_CONFIG_HOME = "/host-home";
  assert.equal(cliRuntime.getCliConfigHome(containerDeps), "/host-home");
});

test("container + unmounted CLI_CONFIG_HOME outside home still falls back", async () => {
  const cliRuntime = await importFresh("container-unmounted");
  process.env.CLI_CONFIG_HOME = "/opt/not-mounted";
  assert.equal(cliRuntime.getCliConfigHome(containerDeps), os.homedir());
});

test("host machine keeps rejecting an outside-home CLI_CONFIG_HOME", async () => {
  const cliRuntime = await importFresh("host-outside");
  process.env.CLI_CONFIG_HOME = "/tmp/outside-home";
  assert.equal(cliRuntime.getCliConfigHome(hostDeps), os.homedir());
  // ...and with the real (non-container) environment too.
  assert.equal(cliRuntime.getCliConfigHome(), os.homedir());
});

test("container exception does not bypass the other CLI_CONFIG_HOME guards", async () => {
  const cliRuntime = await importFresh("container-guards");
  const home = os.homedir();

  process.env.CLI_CONFIG_HOME = "relative/host-home";
  assert.equal(cliRuntime.getCliConfigHome(containerDeps), home, "relative paths rejected");

  process.env.CLI_CONFIG_HOME = "/host-home/../etc";
  assert.equal(cliRuntime.getCliConfigHome(containerDeps), home, "traversal rejected");

  process.env.CLI_CONFIG_HOME = "/host-home;rm -rf /";
  assert.equal(cliRuntime.getCliConfigHome(containerDeps), home, "metacharacters rejected");
});

test("an in-home CLI_CONFIG_HOME is unaffected by container detection", async () => {
  const cliRuntime = await importFresh("in-home");
  const safe = path.join(os.homedir(), "tmp-cli-config-home");
  process.env.CLI_CONFIG_HOME = safe;
  assert.equal(cliRuntime.getCliConfigHome(containerDeps), safe);
  assert.equal(cliRuntime.getCliConfigHome(hostDeps), safe);
});

// ── ensureCliConfigWriteAllowed ──────────────────────────────────────────────

test("ensureCliConfigWriteAllowed without a path keeps flag-only behavior", async () => {
  const cliRuntime = await importFresh("gate-flag-only");
  assert.equal(cliRuntime.ensureCliConfigWriteAllowed(), null);

  process.env.CLI_ALLOW_CONFIG_WRITES = "false";
  assert.match(cliRuntime.ensureCliConfigWriteAllowed(), /CLI_ALLOW_CONFIG_WRITES=false/);
});

test("ensureCliConfigWriteAllowed refuses an ephemeral container target", async () => {
  const cliRuntime = await importFresh("gate-ephemeral");
  const message = cliRuntime.ensureCliConfigWriteAllowed("/home/node/.codex", { containerDeps });
  assert.ok(message, "expected a refusal");
  assert.match(message, /Refusing to write/);
  assert.match(message, /\/home\/node\/\.codex/);
  assert.match(message, /omniroute connect/);
  assert.match(message, /CLI_CONFIG_HOME=\/host-home/);
});

test("ensureCliConfigWriteAllowed allows a bind-mounted container target", async () => {
  const cliRuntime = await importFresh("gate-mounted");
  assert.equal(
    cliRuntime.ensureCliConfigWriteAllowed("/host-home/.codex/config.toml", { containerDeps }),
    null
  );
});

test("ensureCliConfigWriteAllowed allows any target on a host", async () => {
  const cliRuntime = await importFresh("gate-host");
  assert.equal(
    cliRuntime.ensureCliConfigWriteAllowed(path.join(os.homedir(), ".codex"), {
      containerDeps: hostDeps,
    }),
    null
  );
});

test("OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE overrides the container refusal", async () => {
  const cliRuntime = await importFresh("gate-override");
  process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE = "true";
  assert.equal(
    cliRuntime.ensureCliConfigWriteAllowed("/home/node/.codex", { containerDeps }),
    null
  );
});

test("the write-disabled flag still wins over the container override", async () => {
  const cliRuntime = await importFresh("gate-precedence");
  process.env.CLI_ALLOW_CONFIG_WRITES = "false";
  process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE = "true";
  assert.match(
    cliRuntime.ensureCliConfigWriteAllowed("/home/node/.codex", { containerDeps }),
    /CLI_ALLOW_CONFIG_WRITES=false/
  );
});
