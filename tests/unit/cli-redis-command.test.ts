import { test } from "node:test";
import assert from "node:assert/strict";

// ─── T-12 (#3932 PR-3): `omniroute redis` CLI command ─────────────────────

test("registerRedis: exports a registerRedis function", async () => {
  const mod = await import(`../../bin/cli/commands/redis.mjs?case=${Date.now()}-${Math.random()}`);
  assert.equal(typeof mod.registerRedis, "function");
});

test("registerRedis: attaches a `redis` command with up/down/status subcommands", async () => {
  const { registerRedis } = await import(
    `../../bin/cli/commands/redis.mjs?case=${Date.now()}-${Math.random()}`
  );
  // Use a minimal stub of the commander program that records what was attached.
  const recorded = { commands: new Map() };
  const subCommands: Array<{ name: string; options: Set<string> }> = [];
  const fakeProgram = {
    command(name) {
      const cmd = {
        name,
        description() {
          return cmd;
        },
        option(flag) {
          // Track every registered option so we can assert on them.
          const optName = flag.split(/[ ,]/)[0].replace(/^-+/, "");
          cmd.options = cmd.options || new Set();
          cmd.options.add(optName);
          return cmd;
        },
        action() {
          return cmd;
        },
      };
      recorded.commands.set(name, cmd);
      return cmd;
    },
  };

  // registerRedis calls .command("redis") first, then .command("up") etc.
  // on the returned sub-command. We need a smarter stub that returns a
  // separate object for each call.
  const subStubs: Array<{ name: string; options: Set<string> }> = [];
  const allCommands = new Map();
  const program = {
    command(name) {
      if (name === "redis") {
        // Return the parent-of-subcommands stub
        const redisCmd = {
          options: new Set<string>(),
          command(subName) {
            const sub = {
              name: subName,
              options: new Set<string>(),
              description() { return sub; },
              option(flag) {
                const optName = flag.split(/[ ,]/)[0].replace(/^-+/, "");
                sub.options.add(optName);
                return sub;
              },
              action() { return sub; },
            };
            subStubs.push(sub);
            return sub;
          },
          description() { return redisCmd; },
          option(flag) {
            const optName = flag.split(/[ ,]/)[0].replace(/^-+/, "");
            redisCmd.options.add(optName);
            return redisCmd;
          },
        };
        allCommands.set(name, redisCmd);
        return redisCmd;
      }
      return null;
    },
  };

  registerRedis(program);
  assert.equal(subStubs.length, 3, `expected 3 subcommands, got ${subStubs.length}`);
  const names = subStubs.map((s) => s.name).sort();
  assert.deepEqual(names, ["down", "status", "up"]);
});

test("registerRedis: `up` subcommand has the expected option flags", async () => {
  const { registerRedis } = await import(
    `../../bin/cli/commands/redis.mjs?case=${Date.now()}-${Math.random()}`
  );
  const subStubs: Array<{ name: string; options: Set<string> }> = [];
  const program = {
    command(_name: string) {
      const redisCmd = {
        options: new Set<string>(),
        command(subName: string) {
          const sub = {
            name: subName,
            options: new Set<string>(),
            description() { return sub; },
            option(flag: string) {
              // Prefer the canonical long flag (`--port` from `-p, --port <port>`);
              // fall back to the first token for short-only / `--no-x` flags.
              const long = flag.match(/--([\w-]+)/);
              const optName = long ? long[1] : flag.split(/[ ,]/)[0].replace(/^-+/, "");
              sub.options.add(optName);
              return sub;
            },
            action() { return sub; },
          };
          subStubs.push(sub);
          return sub;
        },
        description() { return redisCmd; },
        option(flag: string) {
          // Prefer the canonical long flag (`--port` from `-p, --port <port>`);
          // fall back to the first token for short-only / `--no-x` flags.
          const long = flag.match(/--([\w-]+)/);
          const optName = long ? long[1] : flag.split(/[ ,]/)[0].replace(/^-+/, "");
          redisCmd.options.add(optName);
          return redisCmd;
        },
      };
      return redisCmd;
    },
  };
  registerRedis(program);
  const upCmd = subStubs.find((s) => s.name === "up")!;
  assert.ok(upCmd.options.has("port"), "missing --port");
  assert.ok(upCmd.options.has("name"), "missing --name");
  assert.ok(upCmd.options.has("image"), "missing --image");
  assert.ok(upCmd.options.has("runtime"), "missing --runtime");
  assert.ok(upCmd.options.has("password"), "missing --password");
  assert.ok(upCmd.options.has("no-pull"), "missing --no-pull (boolean negation)");
});

test("runRedisUpCommand: returns 1 when no podman/docker is available (no PATH)", async () => {
  // We force this by passing a --runtime that doesn't exist. execFile will
  // throw ENOENT, the runner will print the error and return 1.
  const { runRedisUpCommand } = await import(
    `../../bin/cli/commands/redis.mjs?case=${Date.now()}-${Math.random()}`
  );
  // Capture stderr to keep the test output clean.
  const origStderr = process.stderr.write.bind(process.stderr);
  const captured: string[] = [];
  process.stderr.write = ((chunk: string | Uint8Array) => {
    captured.push(typeof chunk === "string" ? chunk : chunk.toString());
    return true;
  }) as typeof process.stderr.write;
  try {
    const code = await runRedisUpCommand({ runtime: "/nonexistent/runtime-binary" });
    assert.equal(code, 1, "expected exit 1 when runtime is missing");
  } finally {
    process.stderr.write = origStderr;
  }
});

test("runRedisStatusCommand: returns 1 when no podman/docker is available", async () => {
  const { runRedisStatusCommand } = await import(
    `../../bin/cli/commands/redis.mjs?case=${Date.now()}-${Math.random()}`
  );
  const origStderr = process.stderr.write.bind(process.stderr);
  process.stderr.write = (() => true) as typeof process.stderr.write;
  try {
    const code = await runRedisStatusCommand({ runtime: "/nonexistent/runtime-binary" });
    assert.equal(code, 1);
  } finally {
    process.stderr.write = origStderr;
  }
});

test("runRedisDownCommand: returns 1 when no podman/docker is available", async () => {
  const { runRedisDownCommand } = await import(
    `../../bin/cli/commands/redis.mjs?case=${Date.now()}-${Math.random()}`
  );
  const origStderr = process.stderr.write.bind(process.stderr);
  process.stderr.write = (() => true) as typeof process.stderr.write;
  try {
    const code = await runRedisDownCommand({ runtime: "/nonexistent/runtime-binary" });
    assert.equal(code, 1);
  } finally {
    process.stderr.write = origStderr;
  }
});
