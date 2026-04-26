import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const childProcess = require("child_process");
const originalDataDir = process.env.DATA_DIR;
const originalFetch = globalThis.fetch;

function makeTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function removePath(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

async function importFresh(modulePath) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

async function withDataDir(dataDir, fn) {
  process.env.DATA_DIR = dataDir;
  try {
    return await fn();
  } finally {
    if (originalDataDir === undefined) {
      delete process.env.DATA_DIR;
    } else {
      process.env.DATA_DIR = originalDataDir;
    }
  }
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

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

test("builtin skill handlers validate required fields and perform real sandboxed work", async () => {
  const dataDir = makeTempDir("omniroute-skills-builtins-");
  const context = { apiKeyId: "key-123", sessionId: "session-123" };

  try {
    await withDataDir(dataDir, async () => {
      const { builtinSkills } = await importFresh("src/lib/skills/builtins.ts");

      await assert.rejects(
        () => builtinSkills.file_read({}, context),
        /Missing required field: path/
      );
      await assert.rejects(
        () => builtinSkills.file_write({ path: "demo.txt" }, context),
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
      await assert.rejects(
        () => builtinSkills.eval_code({}, context),
        /Missing required field: code/
      );
      await assert.rejects(
        () => builtinSkills.execute_command({}, context),
        /Missing required field: command/
      );

      assert.deepEqual(
        await builtinSkills.file_write({ path: "notes/demo.txt", content: "hello world" }, context),
        {
          success: true,
          path: "notes/demo.txt",
          bytesWritten: 11,
          context: "key-123",
        }
      );

      assert.deepEqual(await builtinSkills.file_read({ path: "notes/demo.txt" }, context), {
        success: true,
        path: "notes/demo.txt",
        content: "hello world",
        bytesRead: 11,
        encoding: "utf8",
        context: "key-123",
      });

      await assert.rejects(
        () => builtinSkills.file_read({ path: "../outside.txt" }, context),
        /escapes the skill workspace/
      );
      await assert.rejects(
        () => builtinSkills.file_write({ path: ".env", content: "secret" }, context),
        /restricted segment/
      );

      globalThis.fetch = async (url, init) => {
        assert.equal(String(url), "https://example.com/api");
        assert.equal(init.method, "POST");
        assert.equal(init.headers.Accept, "application/json");
        assert.equal(init.headers.Authorization, undefined);
        assert.equal(init.body, JSON.stringify({ ok: true }));
        return new Response("created", {
          status: 201,
          statusText: "Created",
          headers: { "Content-Type": "text/plain" },
        });
      };

      const httpResult = await builtinSkills.http_request(
        {
          url: "https://example.com/api",
          method: "POST",
          headers: { Accept: "application/json", Authorization: "Bearer secret" },
          body: { ok: true },
        },
        context
      );

      assert.equal(httpResult.success, true);
      assert.equal(httpResult.status, 201);
      assert.equal(httpResult.body, "created");
      assert.equal(httpResult.headers["content-type"], "text/plain");

      await assert.rejects(
        () => builtinSkills.http_request({ url: "http://127.0.0.1:9000" }, context),
        /Blocked private or local provider URL/
      );
    });
  } finally {
    removePath(dataDir);
  }
});

test("builtin command and code skills execute through the Docker sandbox", async () => {
  const context = { apiKeyId: "key-123", sessionId: "session-123" };
  const calls = [];
  const originalSpawn = childProcess.spawn;

  childProcess.spawn = (_command, args, options) => {
    calls.push({ args, options });
    const proc = createFakeProcess();
    setImmediate(() => {
      proc.stdout.emit("data", Buffer.from("hello sandbox\n"));
      proc.stderr.emit("data", Buffer.from("warning stream\n"));
      proc.emit("close", 0);
    });
    return proc;
  };

  try {
    const { builtinSkills } = await importFresh("src/lib/skills/builtins.ts");

    const commandResult = await builtinSkills.execute_command(
      { command: "echo", args: ["hello"] },
      context
    );
    assert.equal(commandResult.success, true);
    assert.equal(commandResult.exitCode, 0);
    assert.equal(commandResult.output, "hello sandbox\n");
    assert.equal(commandResult.stderr, "warning stream\n");

    const codeResult = await builtinSkills.eval_code(
      { code: "console.log('hello sandbox')", language: "javascript" },
      context
    );
    assert.equal(codeResult.success, true);
    assert.equal(codeResult.image, "node:22-alpine");

    const dockerArgs = calls[0].args;
    assert.equal(dockerArgs[0], "run");
    assert.ok(dockerArgs.includes("--network"));
    assert.ok(dockerArgs.includes("none"));
    assert.ok(dockerArgs.includes("--cap-drop"));
    assert.ok(dockerArgs.includes("ALL"));
    assert.ok(dockerArgs.includes("--security-opt"));
    assert.ok(dockerArgs.includes("no-new-privileges"));
    assert.ok(dockerArgs.includes("--read-only"));
    assert.ok(dockerArgs.includes("/workspace:rw,noexec,nosuid,size=64m"));
    assert.equal(dockerArgs.includes("SYS_TIME"), false);

    await assert.rejects(
      () =>
        builtinSkills.execute_command(
          { command: "echo", image: "ubuntu:latest", args: ["hello"] },
          context
        ),
      /Sandbox image is not allowed/
    );
  } finally {
    childProcess.spawn = originalSpawn;
  }
});

test("browser skill fails explicitly instead of returning a fake success", async () => {
  const { browserSkill } = await importFresh("src/lib/skills/builtin/browser.ts");
  const context = { apiKeyId: "key-123", sessionId: "session-123" };

  await assert.rejects(
    () => browserSkill({ action: "navigate", url: "https://example.com" }, context),
    /Browser automation skill is disabled/
  );
  await assert.rejects(() => browserSkill({ action: "launch" }, context), /Unknown action: launch/);
});

test("registerBuiltinSkills registers every builtin handler with the executor", async () => {
  const { builtinSkills, registerBuiltinSkills } = await importFresh("src/lib/skills/builtins.ts");
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
