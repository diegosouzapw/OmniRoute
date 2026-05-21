import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";

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

test("ServerSupervisor.handleExit com code=0 chama process.exit(0)", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

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
  supervisor.handleExit(0);

  // @ts-ignore
  process.exit = origExit;
  assert.equal(exits[0], 0);
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

test("ServerSupervisor reseta restartCount após processo viver >=30s", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 2,
  });
  supervisor.start = () => null as any;
  supervisor.restartCount = 2;
  supervisor.startedAt = Date.now() - 31_000; // viveu 31s
  supervisor.handleExit(1);

  assert.equal(supervisor.restartCount, 1); // reset p/ 0, depois incrementado p/ 1
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
