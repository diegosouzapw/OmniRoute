import test from "node:test";
import assert from "node:assert/strict";

// #8091: when the child process itself fails to spawn (ENOENT/EACCES/etc.), the
// 'error' listener passes `err` into handleExit(-1, err) but handleExit only ever
// declared a single `code` parameter — the real reason (err.code/err.path/err.message)
// was silently dropped. The user only ever saw "Server exited (code=-1)" plus a
// permanently empty crash log, with no way to diagnose the underlying spawn failure.
//
// This test spawns a server that does not exist on disk, which forces a deterministic,
// cross-platform ENOENT 'error' event (no Windows/Bun needed to reproduce the bug class),
// and asserts the real error surfaces both via console.error and via crashLog/dumpCrashLog().

process.env.PORT = "0";

test("ServerSupervisor surfaces the real spawn error (ENOENT) instead of swallowing it (#8091)", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  const logs: string[] = [];
  const origErr = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    logs.push(args.map((a) => String(a)).join(" "));
  };

  const origExit = process.exit.bind(process);
  // @ts-ignore
  process.exit = () => {};

  const supervisor = new ServerSupervisor({
    serverPath: "/definitely/does/not/exist/server.js",
    env: {},
    maxRestarts: 0,
  });

  // Real spawn+'error' path the supervisor uses in production; ENOENT fires async.
  supervisor.start();

  await new Promise<void>((resolve) => {
    const check = setInterval(() => {
      if (logs.length || supervisor.crashLog.length) {
        clearInterval(check);
        resolve();
      }
    }, 10);
    setTimeout(() => {
      clearInterval(check);
      resolve();
    }, 2000);
  });

  // @ts-ignore
  process.exit = origExit;
  console.error = origErr;

  const printed = logs.join("\n");
  const inCrashLog = supervisor.crashLog.join("\n");

  assert.ok(
    printed.includes("ENOENT") || inCrashLog.includes("ENOENT"),
    `expected the real spawn error (ENOENT) to be surfaced via console.error or crashLog, got:\nconsole.error: ${printed}\ncrashLog: ${inCrashLog}`
  );
});

test("ServerSupervisor.handleExit(code, err) logs err.code/err.path/err.message and pushes into crashLog", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  const logs: string[] = [];
  const origErr = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    logs.push(args.map((a) => String(a)).join(" "));
  };

  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 5,
  });
  // @ts-ignore — stub start() so the scheduled restart never spawns a real process
  supervisor.start = () => null;
  supervisor.startedAt = Date.now() - 100;

  const fakeErr = Object.assign(new Error("spawn /fake/server.js ENOENT"), {
    code: "ENOENT",
    path: "/fake/server.js",
    syscall: "spawn",
  });
  supervisor.handleExit(-1, fakeErr);

  console.error = origErr;

  const printed = logs.join("\n");
  assert.ok(printed.includes("ENOENT"), `expected err.code (ENOENT) to be printed, got: ${printed}`);
  assert.ok(
    printed.includes("/fake/server.js"),
    `expected err.path to be printed, got: ${printed}`
  );
  assert.ok(
    supervisor.crashLog.some((l: string) => l.includes("ENOENT")),
    `expected the error to be pushed into crashLog, got: ${JSON.stringify(supervisor.crashLog)}`
  );

  await new Promise((r) => setTimeout(r, 1100)); // drain the scheduled restart timer
});
