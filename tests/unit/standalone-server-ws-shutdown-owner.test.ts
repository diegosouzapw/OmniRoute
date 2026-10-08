import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// scripts/dev/standalone-server-ws.mjs (dist/server-ws.mjs) is the production entry point for
// Docker (`node dev/run-standalone.mjs`), `omniroute serve` and Electron. Next's standalone
// start-server registers its own SIGINT/SIGTERM handlers, which `server.close()` and then
// `process.exit(143)` as soon as the HTTP server has no connection left. That exit raced
// OmniRoute's async cleanup (src/lib/gracefulShutdown.ts: spend batch flush, call-log flush,
// DB checkpoint) and won, so a SIGTERM (docker stop, systemctl stop, Ctrl+C) dropped that work.
// Like scripts/dev/run-next.mjs (#12074), the wrapper must own process exit.
//
// The wrapper ends with `await import("./server.js")`, a file that only exists in the assembled
// standalone output, so the test copies the wrapper and its shipped siblings into a temp dir
// next to a fake server.js that behaves like Next's start-server for signals.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WRAPPER_SOURCE = path.join(ROOT, "scripts/dev/standalone-server-ws.mjs");

// Same sibling closure assembleStandalone.mjs ships next to dist/server-ws.mjs.
const SIBLINGS: Array<[string, string]> = [
  ["scripts/dev/peer-stamp.mjs", "peer-stamp.mjs"],
  ["scripts/dev/main-server-timeouts.mjs", "main-server-timeouts.mjs"],
  ["scripts/dev/systemd-notify.mjs", "systemd-notify.mjs"],
  ["scripts/dev/http-method-guard.cjs", "http-method-guard.cjs"],
  ["scripts/dev/head-response-guard.cjs", "head-response-guard.cjs"],
  ["scripts/dev/responses-ws-proxy.mjs", "responses-ws-proxy.mjs"],
  ["src/shared/utils/httpClientAbortGuard.mjs", "httpClientAbortGuard.mjs"],
  ["scripts/dev/webdav-handler.mjs", "webdav-handler.mjs"],
  ["scripts/dev/tls-options.mjs", "tls-options.mjs"],
];

// Fake Next standalone server.js. Signal handling mirrors
// node_modules/next/dist/server/lib/start-server.js: inside the 'listening' handler, unless
// NEXT_MANUAL_SIG_HANDLE is set, SIGINT/SIGTERM -> server.close() -> process.exit(130/143).
// It also plays the part of instrumentation: an application cleanup that takes a while (like the
// spend/call-log flush + DB checkpoint), registered the way src/lib/gracefulShutdown.ts
// initGracefulShutdown() registers it.
const FAKE_NEXT_SERVER = String.raw`
const http = require("node:http");
const log = (msg) => process.stdout.write("EVENT " + msg + "\n");
const mode = process.env.FAKE_MODE || "normal";
const server = http.createServer((req, res) => res.end("ok"));
server.on("listening", () => {
  if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
    let started = false;
    const cleanup = (signal) => {
      if (started) return;
      started = true;
      server.close(() => process.exit(signal === "SIGINT" ? 130 : 143));
    };
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    log("next-handlers-registered");
  }
  setTimeout(() => {
    log("env-after-listen=" + (process.env.NEXT_MANUAL_SIG_HANDLE ?? "unset"));
    if (mode !== "no-instrumentation") {
      const requestShutdown = async (signal) => {
        log("cleanup-start " + signal + " listening=" + server.listening);
        if (mode === "hang") {
          setInterval(() => {}, 1000); // like the real app's timers/handles: the loop stays alive
          return new Promise(() => {});
        }
        await new Promise((r) => setTimeout(r, 400));
        log("cleanup-done");
      };
      globalThis.__omnirouteRequestShutdown = requestShutdown;
      if (!globalThis.__omnirouteCustomServerOwnsShutdown) {
        for (const sig of ["SIGTERM", "SIGINT", "SIGHUP"]) {
          process.on(sig, () => requestShutdown(sig).then(() => setTimeout(() => process.exit(0), 0)));
        }
        log("app-handlers-registered");
      }
    }
    log("ready");
  }, 50);
});
server.listen(0, "127.0.0.1");
`;

function makeStandaloneDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-server-ws-"));
  fs.copyFileSync(WRAPPER_SOURCE, path.join(dir, "server-ws.mjs"));
  for (const [src, dest] of SIBLINGS) fs.copyFileSync(path.join(ROOT, src), path.join(dir, dest));
  fs.writeFileSync(path.join(dir, "server.js"), FAKE_NEXT_SERVER);
  return dir;
}

type RunResult = { code: number | null; signal: string | null; events: string[]; ms: number };

async function runAndSignal(
  dir: string,
  env: Record<string, string>,
  signals: NodeJS.Signals[] = ["SIGTERM"]
): Promise<RunResult> {
  const childEnv: NodeJS.ProcessEnv = { ...process.env, ...env };
  delete childEnv.NEXT_MANUAL_SIG_HANDLE;
  delete childEnv.NOTIFY_SOCKET;
  // Lets a test pass an explicit (possibly empty) value through the delete above.
  if ("NEXT_MANUAL_SIG_HANDLE" in env) childEnv.NEXT_MANUAL_SIG_HANDLE = env.NEXT_MANUAL_SIG_HANDLE;
  const child = spawn(process.execPath, ["server-ws.mjs"], {
    cwd: dir,
    env: childEnv,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let out = "";
  child.stdout.on("data", (d: Buffer) => (out += d.toString()));
  child.stderr.on("data", (d: Buffer) => (out += d.toString()));
  const exited = new Promise<{ code: number | null; signal: string | null }>((resolve) =>
    child.once("exit", (code, signal) => resolve({ code, signal }))
  );
  const deadline = Date.now() + 10_000;
  while (!out.includes("EVENT ready")) {
    if (Date.now() > deadline) {
      child.kill("SIGKILL");
      throw new Error(`fake server never became ready:\n${out}`);
    }
    await new Promise((r) => setTimeout(r, 20));
  }
  const sentAt = Date.now();
  for (const sig of signals) child.kill(sig);
  const killer = setTimeout(() => child.kill("SIGKILL"), 15_000);
  const { code, signal } = await exited;
  clearTimeout(killer);
  const events = out
    .split("\n")
    .filter((l) => l.startsWith("EVENT "))
    .map((l) => l.slice("EVENT ".length));
  return { code, signal, events, ms: Date.now() - sentAt };
}

test("SIGTERM: the wrapper owns exit, so application cleanup finishes before the process exits", async () => {
  const dir = makeStandaloneDir();
  try {
    const r = await runAndSignal(dir, {});
    assert.ok(
      !r.events.includes("next-handlers-registered"),
      "Next's own SIGTERM handler must not be installed (it exits 143 mid-cleanup)"
    );
    assert.ok(
      !r.events.includes("app-handlers-registered"),
      "the app must register its cleanup with the wrapper, not compete with its own listener"
    );
    assert.equal(r.code, 0, `expected exit 0, got ${r.code}/${r.signal}: ${r.events.join(", ")}`);
    const start = r.events.indexOf("cleanup-start SIGTERM listening=false");
    const done = r.events.indexOf("cleanup-done");
    assert.ok(start >= 0, `cleanup must run after the listener stopped accepting: ${r.events}`);
    assert.ok(done > start, "application cleanup must complete before exit");
    assert.ok(r.ms < 5_000, `exit must be prompt once cleanup is done (took ${r.ms} ms)`);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("NEXT_MANUAL_SIG_HANDLE does not leak to child processes after Next read it", async () => {
  const dir = makeStandaloneDir();
  try {
    const r = await runAndSignal(dir, {});
    assert.ok(
      r.events.includes("env-after-listen=unset"),
      `embedded services (e.g. a Next-based child) inherit process.env: ${r.events}`
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("an empty NEXT_MANUAL_SIG_HANDLE is treated as unset: the wrapper still owns exit", async () => {
  const dir = makeStandaloneDir();
  try {
    const r = await runAndSignal(dir, { NEXT_MANUAL_SIG_HANDLE: "" });
    assert.ok(
      !r.events.includes("next-handlers-registered"),
      "an empty value is falsy for Next; the wrapper must still set it"
    );
    assert.equal(r.code, 0, `expected exit 0, got ${r.code}/${r.signal}: ${r.events.join(", ")}`);
    assert.ok(r.events.includes("cleanup-done"), `cleanup must finish: ${r.events}`);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("duplicate signals (shell + parent forwarding) do not cut cleanup short", async () => {
  const dir = makeStandaloneDir();
  try {
    const r = await runAndSignal(dir, {}, ["SIGINT", "SIGTERM"]);
    assert.equal(r.code, 0, `expected exit 0, got ${r.code}/${r.signal}: ${r.events.join(", ")}`);
    assert.ok(r.events.includes("cleanup-done"), `cleanup must finish: ${r.events}`);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("SIGTERM before instrumentation registered cleanup still exits promptly", async () => {
  const dir = makeStandaloneDir();
  try {
    const r = await runAndSignal(dir, { FAKE_MODE: "no-instrumentation" });
    assert.equal(r.code, 0, `expected exit 0, got ${r.code}/${r.signal}: ${r.events.join(", ")}`);
    assert.ok(r.ms < 3_000, `took ${r.ms} ms`);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a cleanup that never settles is bounded by the force-exit timer", async () => {
  const dir = makeStandaloneDir();
  try {
    // Force exit = SHUTDOWN_TIMEOUT_MS (the in-flight request drain budget) + 5 s cleanup margin.
    const r = await runAndSignal(dir, { FAKE_MODE: "hang", SHUTDOWN_TIMEOUT_MS: "100" });
    assert.ok(
      r.events.some((e) => e.startsWith("cleanup-start SIGTERM")),
      `${r.events}`
    );
    assert.ok(!r.events.includes("cleanup-done"));
    assert.equal(r.code, 0, `expected exit 0, got ${r.code}/${r.signal}: ${r.events.join(", ")}`);
    assert.ok(r.ms >= 4_000 && r.ms < 9_000, `force exit expected at ~5.1 s, took ${r.ms} ms`);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const MOVED =
  "Next's start-server.js changed — re-check by hand that NEXT_MANUAL_SIG_HANDLE is still read synchronously in the 'listening' handler before the wrapper clears it";

test("Next still reads NEXT_MANUAL_SIG_HANDLE synchronously in its listening handler", () => {
  // The wrapper clears the variable on the tick after the first 'listening' event (so children
  // never inherit it). That is only safe while Next checks it before its first await there.
  const src = fs.readFileSync(
    path.join(ROOT, "node_modules/next/dist/server/lib/start-server.js"),
    "utf8"
  );
  const listening = src.indexOf("server.on('listening', async ()=>{");
  const check = src.indexOf("if (!process.env.NEXT_MANUAL_SIG_HANDLE)", listening);
  const firstUnconditionalAwait = src.indexOf("await getRequestHandlers", listening);
  assert.ok(listening >= 0 && check > listening, MOVED);
  assert.ok(check < firstUnconditionalAwait, MOVED);
  // Awaits inside the (not yet running) cleanup closure do not count: skip its definition.
  const cleanupDef = src.indexOf("const cleanup = (signal)=>{", listening);
  const afterCleanupDef = src.indexOf("// Make sure commands gracefully respect", cleanupDef);
  assert.ok(
    cleanupDef > listening && afterCleanupDef > cleanupDef && afterCleanupDef < check,
    MOVED
  );
  const awaits = (s: string) => (s.match(/\bawait\b/g) ?? []).length;
  assert.equal(
    awaits(src.slice(listening, cleanupDef)) + awaits(src.slice(afterCleanupDef, check)),
    1,
    MOVED
  );
});
