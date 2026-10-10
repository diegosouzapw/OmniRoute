import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import fs from "node:fs";
import path from "node:path";

// #4425: the supervisor now waits for the listen port to free up before respawning.
// Point that probe at the no-op port 0 so the restart tests don't open real sockets.
process.env.PORT = "0";

// Stub para o processSupervisor: testa a lógica de restart/backoff/MITM sem processos reais.

class StubChild extends EventEmitter {
  pid = 99999;
  stderr = new EventEmitter();
  killed = false;
  kill(_sig?: string) {
    this.killed = true;
  }
}

function makeChildFactory(exitCodes: (number | null)[]) {
  let calls = 0;
  return () => {
    const child = new StubChild();
    const code = exitCodes[calls++] ?? null;
    // Emite exit no próximo tick para simular processo assíncrono
    setImmediate(() => child.emit("exit", code));
    return child;
  };
}

// --- detectMitmCrash ---

test("detectMitmCrash retorna true quando >=2 sinais MITM presentes", async () => {
  const { detectMitmCrash } = await import("../../bin/cli/runtime/processSupervisor.mjs");
  assert.ok(detectMitmCrash(["mitm proxy failed", "certificate error in tls socket"]));
  assert.ok(detectMitmCrash(["TLS Socket closed", "certificate invalid"]));
});

test("detectMitmCrash retorna false com menos de 2 sinais", async () => {
  const { detectMitmCrash } = await import("../../bin/cli/runtime/processSupervisor.mjs");
  assert.ok(!detectMitmCrash(["certificate error"]));
  assert.ok(!detectMitmCrash(["generic error"]));
  assert.ok(!detectMitmCrash([]));
});

// --- ServerSupervisor: lógica de restart ---

test("ServerSupervisor.handleExit com code=0 espontâneo reinicia em vez de sair (#4425)", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  // waitUntilPortFree no-ops on port 0, so the scheduled restart fires fast and leaks no timer.
  const origPort = process.env.PORT;
  process.env.PORT = "0";

  const exits: number[] = [];
  const origExit = process.exit.bind(process);
  // @ts-ignore
  process.exit = (code?: number) => {
    exits.push(code ?? 0);
  };

  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 2,
  });
  let started = 0;
  // Stub start() so the scheduled restart never spawns the fake server.
  supervisor.start = () => {
    started++;
    return null as any;
  };
  supervisor.handleExit(0);

  // #4425: a spontaneous code-0 exit (e.g. a systemd MemoryMax cgroup kill, which reports
  // a clean exit) must NOT terminate the supervisor — it schedules a restart instead.
  assert.equal(exits.length, 0, "must not process.exit on a spontaneous code-0 exit");
  assert.equal(supervisor.restartCount, 1);

  // Let the scheduled restart fire so no timer leaks past the test.
  await new Promise((r) => setTimeout(r, 1100));
  assert.equal(started, 1, "restart should fire after the backoff delay");

  // @ts-ignore
  process.exit = origExit;
  if (origPort === undefined) delete process.env.PORT;
  else process.env.PORT = origPort;
});

test("ServerSupervisor.handleExit com isShuttingDown=true chama process.exit imediato", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  const exits: number[] = [];
  const origExit = process.exit.bind(process);
  // @ts-ignore
  process.exit = (code?: number) => exits.push(code ?? 0);

  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 2,
  });
  supervisor.isShuttingDown = true;
  supervisor.handleExit(1);

  // @ts-ignore
  process.exit = origExit;
  assert.equal(exits[0], 1);
});

test("ServerSupervisor.handleExit incrementa restartCount e chama start() após delay", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  let startCalls = 0;
  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 5,
  });
  supervisor.start = () => {
    startCalls++;
    return null as any;
  };

  supervisor.startedAt = Date.now() - 100; // viveu <30s
  supervisor.handleExit(1);

  assert.equal(supervisor.restartCount, 1);
  await new Promise((r) => setTimeout(r, 1100)); // aguarda o delay de 1s
  assert.equal(startCalls, 1);
});

test("ServerSupervisor.handleExit exibe crash log ao reiniciar", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  const logs: string[] = [];
  const origErr = console.error.bind(console);
  console.error = (...args: unknown[]) => logs.push(args.join(" "));

  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 5,
  });
  supervisor.start = () => null as any;
  supervisor.startedAt = Date.now() - 100;
  supervisor.crashLog = ["line1", "line2"];
  supervisor.handleExit(1);

  console.error = origErr;
  assert.ok(logs.some((l) => l.includes("line1") || l.includes("crash log")));
  await new Promise((r) => setTimeout(r, 1100)); // drain the scheduled restart timer
});

test("ServerSupervisor chama onCrashCallback após maxRestarts atingido", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  let callbackCalled = false;
  const exits: number[] = [];
  const origExit = process.exit.bind(process);
  // @ts-ignore
  process.exit = (code?: number) => exits.push(code ?? 0);

  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 2,
    onCrashCallback: (log: string[]) => {
      callbackCalled = true;
      return null;
    },
  });

  supervisor.restartCount = 2; // já no limite
  supervisor.startedAt = Date.now() - 100;
  supervisor.handleExit(1);

  // @ts-ignore
  process.exit = origExit;
  assert.ok(callbackCalled);
  assert.equal(exits[0], 1);
});

test("ServerSupervisor retorna 'disable-mitm-and-retry' chama start() novamente", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  let startCalls = 0;
  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 2,
    onCrashCallback: () => "disable-mitm-and-retry",
  });
  supervisor.start = () => {
    startCalls++;
    return null as any;
  };

  supervisor.restartCount = 2;
  supervisor.startedAt = Date.now() - 100;
  supervisor.handleExit(1);

  assert.equal(startCalls, 1);
  assert.equal(supervisor.restartCount, 0); // foi resetado
});

test("ServerSupervisor reseta restartCount após viver >= RESTART_RESET_MS (#4425: 60s)", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 2,
  });
  supervisor.start = () => null as any;
  supervisor.restartCount = 2;
  supervisor.startedAt = Date.now() - 61_000; // #4425: reset window bumped 30s→60s
  supervisor.handleExit(1);

  assert.equal(supervisor.restartCount, 1); // reset p/ 0, depois incrementado p/ 1
  await new Promise((r) => setTimeout(r, 1100)); // drain the scheduled restart timer
});

// --- Node.js v24 compat: process.exit() must receive a number (#3748) ---

test("ServerSupervisor.handleExit com string code não passa string para process.exit (#3748)", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  const exits: Array<number | string | undefined> = [];
  const origExit = process.exit.bind(process);
  // @ts-ignore
  process.exit = (code?: number | string) => exits.push(code);

  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 0,
  });
  // Simulates the 'error' event on child spawn failure: err.code = 'ENOENT' (string, not number).
  // maxRestarts=0 → restartCount(0) >= maxRestarts(0) → process.exit() is called immediately.
  supervisor.startedAt = Date.now() - 100;
  supervisor.handleExit("ENOENT" as any);

  // @ts-ignore
  process.exit = origExit;
  assert.equal(exits.length, 1, "process.exit deve ser chamado exatamente 1 vez");
  assert.equal(
    typeof exits[0],
    "number",
    `process.exit deve receber number, recebeu: ${typeof exits[0]} (${exits[0]})`
  );
});

// --- pid.mjs multi-service ---

test("writePidFile/readPidFile/cleanupPidFile operam por service", async () => {
  const os = await import("node:os");
  const tmpDir = os.default.tmpdir() + "/omniroute-pid-test-" + Date.now();
  process.env.DATA_DIR = tmpDir;

  const { writePidFile, readPidFile, cleanupPidFile } = await import("../../bin/cli/utils/pid.mjs");

  writePidFile("server", 12345);
  assert.equal(readPidFile("server"), 12345);

  writePidFile("mitm", 99999);
  assert.equal(readPidFile("mitm"), 99999);

  // Services são independentes
  assert.equal(readPidFile("server"), 12345);

  cleanupPidFile("server");
  assert.equal(readPidFile("server"), null);
  assert.equal(readPidFile("mitm"), 99999); // mitm não foi afetado

  cleanupPidFile("mitm");
  delete process.env.DATA_DIR;
});

// --- #11980: Bun --preload must resolve against the package root, never dist/ ---

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

function withBunRuntime<T>(fn: () => T): T {
  const versions = process.versions as Record<string, string | undefined>;
  const hadBun = Object.prototype.hasOwnProperty.call(versions, "bun");
  const previous = versions.bun;
  versions.bun = "1.2.0";
  try {
    return fn();
  } finally {
    if (hadBun) versions.bun = previous;
    else delete versions.bun;
  }
}

test("buildServerSpawnArgs under Bun preloads the package-root polyfill, not dist/ (#11980)", async () => {
  const { buildServerSpawnArgs } = await import("../../bin/cli/runtime/processSupervisor.mjs");
  // The published layout: bin/ + open-sse/ + dist/server.js are siblings under the package root.
  const serverPath = path.join(REPO_ROOT, "dist", "server.js");

  const args = withBunRuntime(() => buildServerSpawnArgs(serverPath, 512));

  const expectedPreload = path.join(REPO_ROOT, "open-sse", "utils", "setupPolyfill.ts");
  assert.deepEqual(args, ["--preload", expectedPreload, serverPath]);
  assert.ok(fs.existsSync(args[1]), `Bun --preload target must exist on disk: ${args[1]}`);
});

test("buildServerSpawnArgs under Node keeps the runtime args and never passes --preload (#11980)", async () => {
  const { buildServerSpawnArgs } = await import("../../bin/cli/runtime/processSupervisor.mjs");
  const { buildNodeRuntimeArgs } = await import("../../scripts/build/runtime-env.mjs");
  const serverPath = "/fake/dist/server.js";
  const env = {};

  const args = buildServerSpawnArgs(serverPath, 512, env);

  assert.deepEqual(args, buildNodeRuntimeArgs(env, 512, serverPath));
  assert.ok(!args.includes("--preload"));
});

test("every Bun server spawn (supervisor, --daemon, --no-recovery) uses the shared package-root preload (#11980)", () => {
  const supervisorSrc = fs.readFileSync(
    path.join(REPO_ROOT, "bin/cli/runtime/processSupervisor.mjs"),
    "utf8"
  );
  const serveSrc = fs.readFileSync(path.join(REPO_ROOT, "bin/cli/commands/serve.mjs"), "utf8");

  assert.match(supervisorSrc, /spawn\(\s*process\.execPath,\s*buildServerSpawnArgs\(/);
  assert.equal(
    (serveSrc.match(/"--preload",\s*BUN_PRELOAD_PATH\b/g) ?? []).length,
    2,
    "serve.mjs --daemon and --no-recovery must both preload BUN_PRELOAD_PATH"
  );
  assert.doesNotMatch(serveSrc, /join\(APP_DIR,\s*"open-sse/);
});

test("#13992: supervised server spawn hides the console window on Windows", () => {
  const supervisorSrc = fs.readFileSync(
    path.join(REPO_ROOT, "bin/cli/runtime/processSupervisor.mjs"),
    "utf8"
  );

  assert.match(
    supervisorSrc,
    /spawn\(process\.execPath,\s*buildServerSpawnArgs\([\s\S]*?\),\s*\{[\s\S]*?windowsHide:\s*true[\s\S]*?\}\)/,
    "the supervised server spawn() must pass windowsHide: true so a tray-mode restart never " +
      "flashes a visible console on Windows"
  );
});

// --- #16030: shutdown intent marker ---

test("consumeShutdownIntent honors only a marker carrying the exited child's pid", async () => {
  const os = await import("node:os");
  const tmpDir = path.join(os.default.tmpdir(), `omniroute-intent-test-${Date.now()}`);
  process.env.DATA_DIR = tmpDir;
  try {
    const { consumeShutdownIntent } = await import("../../bin/cli/utils/pid.mjs");
    const markerDir = path.join(tmpDir, "supervisor");
    fs.mkdirSync(markerDir, { recursive: true });
    const marker = path.join(markerDir, ".shutdown-intent");

    fs.writeFileSync(marker, "4242", "utf8");
    assert.equal(consumeShutdownIntent(4242), true, "matching pid is honored");
    assert.equal(fs.existsSync(marker), false, "marker is single-shot");

    fs.writeFileSync(marker, "4242", "utf8");
    assert.equal(consumeShutdownIntent(7777), false, "a stale/foreign pid is not honored");
    assert.equal(consumeShutdownIntent(4242), false, "marker is gone after the read");

    fs.writeFileSync(marker, "4242", "utf8");
    assert.equal(consumeShutdownIntent(null), false, "unknown child pid never honors a marker");
    fs.writeFileSync(marker, "4242", "utf8");
    assert.equal(consumeShutdownIntent(0), false, "pid 0 never honors a marker");
  } finally {
    delete process.env.DATA_DIR;
  }
});

test("ServerSupervisor.handleExit exits instead of restarting when the child wrote a shutdown intent", async () => {
  const os = await import("node:os");
  const tmpDir = path.join(os.default.tmpdir(), `omniroute-intent-exit-${Date.now()}`);
  process.env.DATA_DIR = tmpDir;
  process.env.PORT = "0";

  const exits: number[] = [];
  const origExit = process.exit.bind(process);
  // @ts-ignore
  process.exit = (code?: number) => exits.push(code ?? 0);

  try {
    const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");
    const markerDir = path.join(tmpDir, "supervisor");
    fs.mkdirSync(markerDir, { recursive: true });
    // The child (pid 4242) asked to shut down, then died from its own SIGTERM (143).
    fs.writeFileSync(path.join(markerDir, ".shutdown-intent"), "4242", "utf8");

    const supervisor = new ServerSupervisor({
      serverPath: "/fake/server.js",
      env: {},
      maxRestarts: 2,
      onCrashCallback: undefined,
    });
    supervisor.lastChildPid = 4242;
    supervisor.handleExit(143);

    assert.deepEqual(exits, [143], "supervisor exits with the child's code");
    assert.equal(supervisor.restartCount, 0, "no restart is scheduled");
  } finally {
    // @ts-ignore
    process.exit = origExit;
    delete process.env.DATA_DIR;
  }
});

test("ServerSupervisor.handleExit still restarts a spontaneous 143 with no intent marker", async () => {
  const os = await import("node:os");
  const tmpDir = path.join(os.default.tmpdir(), `omniroute-intent-crash-${Date.now()}`);
  process.env.DATA_DIR = tmpDir;
  process.env.PORT = "0";

  const exits: number[] = [];
  const origExit = process.exit.bind(process);
  // @ts-ignore
  process.exit = (code?: number) => exits.push(code ?? 0);

  try {
    const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");
    const supervisor = new ServerSupervisor({
      serverPath: "/fake/server.js",
      env: {},
      maxRestarts: 2,
      onCrashCallback: undefined,
    });
    supervisor.lastChildPid = 4242;
    supervisor.start = () => null as never;
    supervisor.handleExit(143);

    assert.equal(exits.length, 0, "no intent marker: must NOT exit");
    assert.equal(supervisor.restartCount, 1, "spontaneous exit still restarts");
    await new Promise((r) => setTimeout(r, 1100));
  } finally {
    // @ts-ignore
    process.exit = origExit;
    delete process.env.DATA_DIR;
  }
});
