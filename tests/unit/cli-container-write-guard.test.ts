import test from "node:test";
import assert from "node:assert/strict";
import {
  assertHostConfigTarget,
  guardHostConfigTarget,
  CONTAINER_WRITE_EXIT_CODE,
} from "../../bin/cli/utils/config-home-guard.mjs";

// Container/mount state is injected — CI and dev machines are not containers,
// and macOS has no /proc/self/mountinfo.

const MOUNTINFO = "44 28 254:1 /Users/me/.codex /host-home/.codex rw,relatime - ext4 /dev/vda1 rw";

const containerDeps = {
  existsSync: (p: string) => p === "/.dockerenv",
  readFileSync: (p: string, _enc: string) => {
    if (p === "/proc/self/mountinfo") return MOUNTINFO;
    throw new Error("ENOENT");
  },
  env: {} as NodeJS.ProcessEnv,
};

const hostDeps = {
  existsSync: (_p: string) => false,
  readFileSync: (_p: string, _enc: string) => "12:cpuset:/\n",
  env: {} as NodeJS.ProcessEnv,
};

test("guard allows any write on a host machine", async () => {
  const result = await assertHostConfigTarget("/Users/me/.codex", {
    deps: hostDeps,
    env: {},
  });
  assert.deepEqual(result, { ok: true });
});

test("guard refuses an ephemeral container home and explains both escape routes", async () => {
  const result = await assertHostConfigTarget("/home/node/.codex", {
    toolLabel: "Codex",
    hostCommand: "omniroute setup-codex",
    deps: containerDeps,
    env: {},
  });

  assert.equal(result.ok, false);
  assert.match(result.message!, /Refusing to write Codex config to \/home\/node\/\.codex/);
  assert.match(result.message!, /omniroute setup-codex/);
  assert.match(result.message!, /CLI_CONFIG_HOME=\/host-home/);
  assert.match(result.message!, /--allow-container-write/);
});

test("guard allows a bind-mounted container target without warning", async () => {
  const result = await assertHostConfigTarget("/host-home/.codex/glm.config.toml", {
    deps: containerDeps,
    env: {},
  });
  assert.deepEqual(result, { ok: true });
});

test("--allow-container-write proceeds but warns about the ephemeral write", async () => {
  const result = await assertHostConfigTarget("/home/node/.codex", {
    allowContainerWrite: true,
    deps: containerDeps,
    env: {},
  });
  assert.equal(result.ok, true);
  assert.match(result.warning!, /lost when the container is recreated/);
});

test("OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE env has the same effect as the flag", async () => {
  for (const value of ["1", "true", "yes", "on", "TRUE"]) {
    const result = await assertHostConfigTarget("/home/node/.codex", {
      deps: containerDeps,
      env: { OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE: value },
    });
    assert.equal(result.ok, true, `expected ${value} to allow the write`);
  }
});

test("a falsy env override does not allow the write", async () => {
  for (const value of ["0", "false", "off", ""]) {
    const result = await assertHostConfigTarget("/home/node/.codex", {
      deps: containerDeps,
      env: { OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE: value },
    });
    assert.equal(result.ok, false, `expected ${value} to keep the refusal`);
  }
});

test("--dry-run is not blocked but says a real run would be refused", async () => {
  const result = await assertHostConfigTarget("/home/node/.codex", {
    dryRun: true,
    deps: containerDeps,
    env: {},
  });
  assert.equal(result.ok, true);
  assert.match(result.warning!, /\[dry-run\]/);
  assert.match(result.warning!, /would be refused/);
});

test("guardHostConfigTarget returns exit code 2 on refusal and 0 otherwise", async () => {
  const originalLog = console.log;
  const lines: string[] = [];
  console.log = (msg?: unknown) => {
    lines.push(String(msg));
  };
  try {
    const blocked = await guardHostConfigTarget("/home/node/.codex", {
      deps: containerDeps,
      env: {},
    });
    const allowed = await guardHostConfigTarget("/host-home/.codex", {
      deps: containerDeps,
      env: {},
    });
    assert.equal(blocked, CONTAINER_WRITE_EXIT_CODE);
    assert.equal(allowed, 0);
    assert.ok(
      lines.some((l) => l.includes("Refusing to write")),
      "refusal should be printed"
    );
  } finally {
    console.log = originalLog;
  }
});
