import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { createRequire } from "node:module";

import { builtinSkills, registerBuiltinSkills } from "../../src/lib/skills/builtins.ts";

const require = createRequire(import.meta.url);
const childProcess = require("child_process");

function createFakeProcess({ onKill } = {}) {
  const proc = new EventEmitter();
  proc.stdout = new EventEmitter();
  proc.stderr = new EventEmitter();
  proc.kill = (signal) => {
    proc.killedSignal = signal;
    if (onKill) onKill(proc, signal);
    return true;
  };
  return proc;
}

async function withSandboxModule(fakeSpawn, fn) {
  const originalSpawn = childProcess.spawn;
  childProcess.spawn = fakeSpawn;

  try {
    const module = await import(
      `../../src/lib/skills/sandbox.ts?test=${Date.now()}-${Math.random()}`
    );
    return await fn(module);
  } finally {
    childProcess.spawn = originalSpawn;
  }
}

test("builtin skill handlers validate required fields and return contextual stubs", async () => {
  const context = { apiKeyId: "key-123", sessionId: "session-123" };

  await assert.rejects(() => builtinSkills.file_read({}, context), /Missing required field: path/);
  await assert.rejects(
    () => builtinSkills.file_write({ path: "/tmp/file.txt" }, context),
    /Missing required fields/
  );
  await assert.rejects(
    () => builtinSkills.http_request({}, context),
    /Missing required field: url/
  );
  await assert.rejects(
    () => builtinSkills.web_search({}, context),
    /Missing required field: query/
  );
  await assert.rejects(() => builtinSkills.eval_code({}, context), /Missing required field: code/);
  await assert.rejects(
    () => builtinSkills.execute_command({}, context),
    /Missing required field: command/
  );

  assert.deepEqual(await builtinSkills.file_read({ path: "/tmp/demo.txt" }, context), {
    success: true,
    path: "/tmp/demo.txt",
    content: "[File read stub]",
    context: "key-123",
  });
  assert.deepEqual(
    await builtinSkills.file_write({ path: "/tmp/demo.txt", content: "hello world" }, context),
    {
      success: true,
      path: "/tmp/demo.txt",
      bytesWritten: 11,
      context: "key-123",
    }
  );
  assert.deepEqual(
    await builtinSkills.execute_command({ command: "echo", args: ["hello"] }, context),
    {
      success: true,
      command: "echo",
      args: ["hello"],
      output: "[Command execution stub]",
      context: "key-123",
    }
  );
});

test("registerBuiltinSkills registers every builtin handler with the executor", () => {
  const registered = [];
  const executor = {
    registerHandler(name, handler) {
      registered.push({ name, handler });
    },
  };

  registerBuiltinSkills(executor);

  assert.equal(registered.length, Object.keys(builtinSkills).length);
  assert.deepEqual(registered.map((entry) => entry.name).sort(), Object.keys(builtinSkills).sort());
});

test("sandboxRunner handles success, spawn errors, timeouts, and killAll cleanup", async () => {
  let mode = "success";
  const calls = [];

  await withSandboxModule(
    (_command, args, options) => {
      calls.push({ mode, args, options });

      if (args[0] === "kill") {
        return createFakeProcess();
      }

      if (mode === "error") {
        const proc = createFakeProcess();
        setImmediate(() => {
          proc.emit("error", new Error("docker not found"));
        });
        return proc;
      }

      if (mode === "timeout") {
        return createFakeProcess({
          onKill: (instance) => {
            setImmediate(() => instance.emit("close", null));
          },
        });
      }

      const proc = createFakeProcess();
      setImmediate(() => {
        proc.stdout.emit("data", Buffer.from("hello sandbox"));
        proc.stderr.emit("data", Buffer.from("warning stream"));
        proc.emit("close", 0);
      });
      return proc;
    },
    async ({ sandboxRunner }) => {
      sandboxRunner.setConfig({
        cpuLimit: 200,
        memoryLimit: 128,
        timeout: 100,
        networkEnabled: false,
        readOnly: true,
      });

      const successResult = await sandboxRunner.run("alpine", ["echo", "sandbox"], {
        CUSTOM_ENV: "1",
      });

      assert.equal(successResult.exitCode, 0);
      assert.equal(successResult.stdout, "hello sandbox");
      assert.equal(successResult.stderr, "warning stream");
      assert.equal(successResult.killed, false);
      assert.equal(calls[0].args[0], "run");
      assert.ok(calls[0].args.includes("--read-only"));
      assert.ok(calls[0].args.includes("alpine"));
      assert.equal(calls[0].options.env.CUSTOM_ENV, "1");

      mode = "error";
      const errorResult = await sandboxRunner.run("alpine", ["echo", "sandbox"]);

      assert.equal(
        calls.filter((entry) => entry.mode === "error" && entry.args[0] === "run").length,
        1
      );
      assert.equal(errorResult.exitCode, -1);
      assert.equal(errorResult.stderr, "docker not found");
      assert.equal(errorResult.killed, false);

      mode = "timeout";
      sandboxRunner.setConfig({ timeout: 20, networkEnabled: false, readOnly: true });
      const pending = sandboxRunner.run("alpine", ["sleep", "10"]);
      await new Promise((resolve) => setTimeout(resolve, 5));
      assert.equal(sandboxRunner.getRunningCount(), 1);

      const timeoutResult = await pending;
      assert.equal(timeoutResult.killed, true);
      assert.equal(timeoutResult.exitCode, null);
      assert.equal(
        calls.some((entry) => entry.mode === "timeout" && entry.args[0] === "kill"),
        true
      );

      const procA = createFakeProcess();
      const procB = createFakeProcess();
      sandboxRunner.runningContainers.set("a", procA);
      sandboxRunner.runningContainers.set("b", procB);

      sandboxRunner.killAll();

      assert.equal(procA.killedSignal, "SIGTERM");
      assert.equal(procB.killedSignal, "SIGTERM");
      assert.equal(sandboxRunner.getRunningCount(), 0);
      assert.equal(sandboxRunner.isRunning("a"), false);
    }
  );
});
