import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { monitorEventLoopDelay } from "node:perf_hooks";
import { spawn, execFileSync, type ChildProcess } from "node:child_process";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import { generateKeyPairSync } from "node:crypto";
import { build } from "esbuild";
import { setTimeout as delay } from "node:timers/promises";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-export-child-"));
process.env.DATA_DIR = dir;
Object.assign(process.env, { NODE_ENV: "test" });
process.env.STORAGE_ENCRYPTION_KEY = "synthetic-child-test-key";
const core = await import("../../src/lib/db/core.ts");
const dbDest = await import("../../src/lib/db/logExportDestinations.ts");
const source = await import("../../src/lib/usage/callLogExportSource.ts");
const runner = await import("../../src/lib/logExport/runner.ts");
const secrets = await import("../../src/lib/logExport/secrets.ts");
const fixture = await import("./fixtures/logExportTestDestination.ts");
const output = path.join(dir, "received.jsonl");
const modulePath = path.join(import.meta.dirname, "fixtures/logExportTestDestination.ts");
const secret = "synthetic-secret-not-for-argv-or-env";
let child: ChildProcess | undefined;
type TestOptions = {
  modulePath: string;
  beforeAck?: () => Promise<void>;
  onSpawn?: (child: ChildProcess) => void;
  config?: Record<string, unknown>;
};
const configure = (
  runner as unknown as { __setLogExportChildOptionsForTest?: (options: TestOptions | null) => void }
).__setLogExportChildOptionsForTest;

function options(beforeAck?: () => Promise<void>) {
  configure?.({
    modulePath,
    beforeAck,
    onSpawn: (spawned) => {
      child = spawned;
    },
  });
}
function destination(mode = "records", batchSize = 2, extra: Record<string, unknown> = {}) {
  return dbDest.createLogExportDestination({
    name: "fixture",
    type: fixture.testDestination.id,
    enabled: true,
    batchSize,
    maxRowsPerRun: 1000,
    includeBodies: true,
    config: secrets.encryptDestinationConfig(fixture.testDestination.id, {
      secret,
      output,
      mode,
      ...extra,
    }),
  });
}
function rows(count: number, artifactBytes = 0) {
  const db = core.getDbInstance();
  const insert = db.prepare(`INSERT INTO call_logs
    (id,timestamp,model,status,artifact_relpath,detail_state,has_request_body)
    VALUES (?, ?, 'fixture-model', 200, ?, ?, ?)`);
  fs.mkdirSync(path.join(dir, "call_logs"), { recursive: true });
  for (let i = 0; i < count; i++) {
    const rel = artifactBytes ? `artifact-${i}.json` : null;
    if (rel)
      fs.writeFileSync(
        path.join(dir, "call_logs", rel),
        JSON.stringify({
          requestBody: { text: "x".repeat(artifactBytes) },
          responseBody: null,
          pipeline: { clientRequest: { model: "fixture" } },
        })
      );
    insert.run(`row-${i}`, "2026-08-29T12:00:00.000Z", rel, rel ? "ready" : "none", rel ? 1 : 0);
  }
}
function received(): unknown[][] {
  return fs.existsSync(output)
    ? fs
        .readFileSync(output, "utf8")
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line) as unknown[])
    : [];
}
function assertGone() {
  assert.ok(child, "must spawn a separate OS process");
  assert.notEqual(child.pid, process.pid);
  assert.ok(
    child.exitCode !== null || child.signalCode !== null,
    "child must exit before the run returns"
  );
  assert.equal(child.listenerCount("message"), 0);
  assert.equal(child.listenerCount("error"), 0);
  assert.throws(() => process.kill(child!.pid!, 0), /ESRCH/);
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  fixture.register();
  child = undefined;
  options();
});
test.afterEach(() => {
  configure?.(null);
  delete process.env.OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("child records match old helpers across artifact, inline, disk, missing and corrupt details", async () => {
  rows(5, 2000);
  const db = core.getDbInstance();
  db.exec(
    "CREATE TABLE IF NOT EXISTS call_logs_v1_legacy (id TEXT, request_body TEXT, response_body TEXT, error TEXT)"
  );
  db.prepare("INSERT INTO call_logs_v1_legacy (id, request_body) VALUES (?, ?)").run(
    "row-1",
    '{"inline":true}'
  );
  db.prepare(
    "UPDATE call_logs SET artifact_relpath = NULL, detail_state = 'legacy-inline' WHERE id = 'row-1'"
  ).run();
  db.prepare(
    "UPDATE call_logs SET artifact_relpath = NULL, timestamp = '2026-08-30T12:00:00.000Z' WHERE id = 'row-2'"
  ).run();
  // Legacy names use local time, like the old dashboard resolver.
  const date = new Date("2026-08-30T12:00:00.000Z");
  const folder = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const time = `${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(date.getSeconds()).padStart(2, "0")}`;
  fs.mkdirSync(path.join(dir, "call_logs", folder), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "call_logs", folder, `${time}_fixture-model_200.json`),
    '{"requestBody":{"disk":true}}'
  );
  fs.rmSync(path.join(dir, "call_logs/artifact-3.json"));
  fs.writeFileSync(path.join(dir, "call_logs/artifact-4.json"), "invalid-json");
  const summaries = source.getCallLogsForExport(0, 10);
  const expected = (await source.attachExportBodies(summaries)).map((row) => row.record);
  // Dashboard reads mark missing/corrupt references; restore original summaries for parity.
  db.prepare(
    "UPDATE call_logs SET artifact_relpath = 'artifact-3.json', detail_state = 'ready' WHERE id = 'row-3'"
  ).run();
  db.prepare("UPDATE call_logs SET detail_state = 'ready' WHERE id = 'row-4'").run();
  const dest = destination();
  assert.equal(source.countCallLogsAfterRowId(0), 5, "fixture rows survive dashboard hydration");
  const result = await runner.runDestinationExport(dest);
  assert.equal(result.success, true, result.error ?? "");
  assert.equal(result.exported, 5, JSON.stringify(result));
  assert.deepEqual(received().flat(), expected);
  assert.equal(
    (
      db.prepare("SELECT detail_state FROM call_logs WHERE id = 'row-4'").get() as {
        detail_state: string;
      }
    ).detail_state,
    "ready",
    "export must not write corrupt detail state"
  );
  assertGone();
});

test("large artifacts block the old hydration control but not the parent's event loop", async (t) => {
  rows(500, 300_000); // ~150 MB, bounded below the storage artifact limit per row.
  const dest = destination("discard", 25);
  async function measure(action: () => Promise<unknown>) {
    const histogram = monitorEventLoopDelay({ resolution: 2 });
    histogram.enable();
    await delay(25);
    await action();
    await delay(25);
    histogram.disable();
    return histogram.max / 1e6;
  }
  const isolated = await measure(async () => {
    const result = await runner.runDestinationExport(dest);
    assert.equal(result.exported, 500);
    assert.equal(result.success, true, result.error ?? "");
  });
  const control = await measure(() =>
    source.attachExportBodies(source.getCallLogsForExport(0, 500))
  );
  t.diagnostic(`event-loop max: child=${isolated.toFixed(2)}ms control=${control.toFixed(2)}ms`);
  // 80 ms tolerates CI scheduler/GC noise, but rules out the hundreds-of-ms
  // synchronous parsing/serialization burst of the same 500-artifact control.
  assert.ok(isolated < 80, `child event-loop delay ${isolated}ms`);
  assert.ok(control > 80, `old control must demonstrate blocking, got ${control}ms`);
  assertGone();
});

test("crash after two acknowledged batches retains cursor and records failure with no orphan", async () => {
  rows(8);
  const dest = destination("crash");
  const result = await runner.runDestinationExport(dest);
  assert.equal(result.success, false);
  assert.equal(result.exported, 4);
  assert.equal(result.batches, 2);
  assert.equal(result.cursorRowId, 4);
  assert.equal(dbDest.getLogExportDestination(dest.id)?.cursorRowId, 4);
  assert.equal(dbDest.getLogExportDestination(dest.id)?.lastStatus, "failure");
  assertGone();
});

test("hung destination is terminated at timeout, escalating past ignored SIGTERM", async () => {
  rows(2);
  process.env.OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS = "1500";
  const dest = destination("hang");
  const start = Date.now();
  const result = await runner.runDestinationExport(dest);
  assert.equal(result.success, false);
  assert.match(result.error ?? "", /timed out/);
  assert.ok(Date.now() - start < 5000);
  assert.equal(dbDest.getLogExportDestination(dest.id)?.lastStatus, "failure");
  assert.equal(result.cursorRowId, 0);
  assertGone();
  assert.equal(child?.signalCode, "SIGKILL");
});

test("secret travels over IPC only, not argv/env, and child gets explicit heap limit", async () => {
  rows(2);
  process.env.UNRELATED_SECRET = secret;
  try {
    const result = await runner.runDestinationExport(destination());
    assert.equal(result.success, true);
    const info = JSON.parse(fs.readFileSync(`${output}.process`, "utf8")) as {
      pid: number;
      argv: string[];
      execArgv: string[];
      env: Record<string, string>;
    };
    assert.notEqual(info.pid, process.pid);
    assert.equal(JSON.stringify(info.argv).includes(secret), false);
    assert.equal(JSON.stringify(info.env).includes(secret), false);
    assert.equal(info.env.STORAGE_ENCRYPTION_KEY, undefined);
    assert.ok(info.execArgv.includes("--max-old-space-size=1024"));
    assertGone();
  } finally {
    delete process.env.UNRELATED_SECRET;
  }
});

test("slow acknowledgement prevents starting the next batch", async () => {
  rows(6);
  options(async () => {
    await delay(150);
  });
  const result = await runner.runDestinationExport(destination());
  assert.equal(result.success, true);
  const times = fs.readFileSync(`${output}.times`, "utf8").trim().split("\n").map(Number);
  assert.equal(times.length, 3);
  assert.ok(times[1] - times[0] >= 140, "second send must wait for ack");
  assert.ok(times[2] - times[1] >= 140, "third send must wait for ack");
  assertGone();
});

test("partial send failure retains the last acknowledged cursor and redacts the secret", async () => {
  rows(6);
  const dest = destination("fail");
  const result = await runner.runDestinationExport(dest);
  assert.equal(result.success, false);
  assert.equal(result.exported, 2);
  assert.equal(result.batches, 1);
  assert.equal(result.cursorRowId, 2);
  assert.equal(result.pendingAfterRun, 4);
  assert.equal(result.error?.includes(secret), false);
  assert.match(result.error ?? "", /REDACTED/);
  assert.equal(dbDest.getLogExportDestination(dest.id)?.cursorRowId, 2);
  assert.equal(dbDest.getLogExportDestination(dest.id)?.lastError, result.error);
  assertGone();
});

test("runtime resolver covers adjacent, standalone, cwd, TS development and missing layouts", async () => {
  const { resolveLogExportChild } = await import("../../src/lib/logExport/childRunner.ts");
  const relative = "src/lib/logExport/exportChild.js";
  const context = { moduleDir: "/module", cwd: "/cwd", entryFile: "/standalone/server.js" };
  for (const candidate of [
    "/module/exportChild.js",
    `/standalone/${relative}`,
    `/cwd/${relative}`,
  ]) {
    assert.deepEqual(
      resolveLogExportChild({ ...context, fileExists: (file) => file === candidate }),
      { childFile: candidate, execArgv: [] }
    );
  }
  assert.deepEqual(
    resolveLogExportChild({ ...context, fileExists: (file) => file === "/module/exportChild.ts" }),
    { childFile: "/module/exportChild.ts", execArgv: ["--import", "tsx/esm"] }
  );
  assert.deepEqual(resolveLogExportChild({ ...context, fileExists: () => false }), {
    childFile: `/standalone/${relative}`,
    execArgv: [],
  });
});

test("read-only opener rejects writes and leaves migration state untouched", async () => {
  rows(1);
  const before = core
    .getDbInstance()
    .prepare("SELECT * FROM _omniroute_migrations ORDER BY version")
    .all();
  const { openLogExportReadOnlyDb } = await import("../../src/lib/db/logExportReadOnly.ts");
  const db = openLogExportReadOnlyDb();
  try {
    assert.deepEqual(
      db.prepare("PRAGMA query_only").get(),
      Object.assign(Object.create(null), { query_only: 1 })
    );
    assert.throws(() => db.exec("DELETE FROM call_logs"), /readonly|read-only/);
  } finally {
    db.close();
  }
  assert.equal(source.countCallLogsAfterRowId(0), 1);
  assert.deepEqual(
    core.getDbInstance().prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
    before
  );
});

test("secret sanitization covers nested JSON credentials and multiline fragments", async () => {
  const { exportSecretValues, safeExportError } =
    await import("../../src/lib/logExport/safeExportError.ts");
  const credential = JSON.stringify({
    private_key: "synthetic-line-one\nsynthetic-line-two",
    token: "synthetic-nested-token",
  });
  const values = exportSecretValues({ credential }, ["credential"]);
  for (const value of [
    credential,
    "synthetic-line-one",
    "synthetic-line-two",
    "synthetic-nested-token",
  ]) {
    assert.equal(safeExportError(`error: ${value}`, values).includes(value), false);
  }
});

test("packaged ESM child bundles without server/Next imports and runs from a CommonJS standalone root", async () => {
  rows(2, 2000);
  const root = path.resolve(import.meta.dirname, "../..");
  fs.mkdirSync(path.join(root, ".tmp"), { recursive: true });
  const stage = fs.mkdtempSync(path.join(root, ".tmp/log-export-bundle-"));
  const childFile = path.join(stage, "src/lib/logExport/exportChild.js");
  try {
    fs.mkdirSync(path.dirname(childFile), { recursive: true });
    fs.writeFileSync(path.join(stage, "package.json"), '{"type":"commonjs"}');
    const { writeEsmWorkerScopes } = await import("../../scripts/build/colocate-standalone.mjs");
    writeEsmWorkerScopes([path.dirname(childFile)]);
    const policy = await import("../../scripts/build/pack-artifact-policy.ts");
    assert.deepEqual(
      policy.findUnexpectedArtifactPaths(
        ["src/lib/logExport/exportChild.js", "src/lib/logExport/package.json"],
        {
          exactPaths: policy.APP_STAGING_ALLOWED_EXACT_PATHS,
          prefixPaths: policy.APP_STAGING_ALLOWED_PATH_PREFIXES,
        }
      ),
      []
    );
    assert.ok(
      policy.PACK_ARTIFACT_REQUIRED_PATHS.includes("dist/src/lib/logExport/exportChild.js")
    );
    assert.ok(policy.PACK_ARTIFACT_REQUIRED_PATHS.includes("dist/src/lib/logExport/package.json"));
    const result = await build({
      entryPoints: [path.join(root, "src/lib/logExport/exportChild.ts")],
      outfile: childFile,
      bundle: true,
      platform: "node",
      packages: "external",
      format: "esm",
      metafile: true,
    });
    assert.ok(
      !Object.keys(result.metafile!.inputs).some((file) =>
        /db\/core|migration|featureFlags|proxyFetch\.ts|callLogs\.ts|next\//.test(file)
      ),
      "bundle must not initialize the server singleton"
    );
    for (const file of Object.keys(result.metafile!.inputs)) {
      assert.ok(
        !fs.readFileSync(path.resolve(root, file), "utf8").includes("getDbInstance"),
        `child imports singleton through ${file}`
      );
    }
    const fixtureFile = path.join(stage, "fixture.mjs");
    await build({
      entryPoints: [modulePath],
      outfile: fixtureFile,
      bundle: true,
      platform: "node",
      packages: "external",
      format: "esm",
    });
    const processInfo = spawn(process.execPath, ["--max-old-space-size=512", childFile], {
      env: { DATA_DIR: dir, NODE_ENV: "test" },
      stdio: ["ignore", "pipe", "pipe", "ipc"],
    });
    let done = false;
    let error = "";
    processInfo.stderr?.on("data", (chunk: Buffer) => {
      error += chunk.toString();
    });
    const closed = new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        processInfo.kill("SIGKILL");
      }, 10_000);
      processInfo.on("error", reject);
      processInfo.on(
        "message",
        (message: { kind: string; cursorRowId: number; message?: string }) => {
          if (message.kind === "batch")
            processInfo.send({ kind: "ack", cursorRowId: message.cursorRowId });
          if (message.kind === "done") done = true;
          if (message.kind === "error") error += message.message;
        }
      );
      processInfo.on("close", (code) => {
        clearTimeout(timer);
        code === 0 && done ? resolve() : reject(new Error(error));
      });
    });
    processInfo.send({
      kind: "start",
      destination: { id: "fixture", type: fixture.testDestination.id, name: "fixture" },
      config: { secret, output, mode: "records" },
      testModulePath: fixtureFile,
      batchSize: 2,
      maxRowsPerRun: 10,
      includeBodies: true,
      maxBodyBytes: 262144,
      cursorRowId: 0,
    });
    await closed;
    assert.equal(received().flat().length, 2);
  } finally {
    fs.rmSync(stage, { recursive: true, force: true });
  }
});

const proxyNames = [
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "ALL_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "all_proxy",
  "no_proxy",
  "OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS",
  "NODE_EXTRA_CA_CERTS",
  "SSL_CERT_FILE",
  "SSL_CERT_DIR",
];
async function withProxyEnv(values: Record<string, string>, action: () => Promise<void>) {
  const saved = Object.fromEntries(proxyNames.map((name) => [name, process.env[name]]));
  for (const name of proxyNames) delete process.env[name];
  Object.assign(process.env, values);
  try {
    await action();
  } finally {
    for (const name of proxyNames) {
      if (saved[name] === undefined) delete process.env[name];
      else process.env[name] = saved[name];
    }
  }
}
async function listen(server: http.Server | https.Server): Promise<number> {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  return (server.address() as net.AddressInfo).port;
}
async function closeServer(server: http.Server | https.Server) {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
}

test("R1 real child routes public HTTP and HTTPS through env proxy, NO_PROXY and private literals direct", async () => {
  rows(1);
  const cert = path.join(dir, "synthetic-ca.pem");
  const key = path.join(dir, "synthetic-key.pem");
  execFileSync(
    "openssl",
    [
      "req",
      "-x509",
      "-newkey",
      "rsa:2048",
      "-nodes",
      "-keyout",
      key,
      "-out",
      cert,
      "-days",
      "1",
      "-subj",
      "/CN=public.example",
      "-addext",
      "subjectAltName=DNS:public.example",
    ],
    { stdio: "ignore" }
  );
  const direct: string[] = [];
  const handle: http.RequestListener = (req, res) => {
    direct.push(req.url ?? "");
    res.end("loopback-fixture");
  };
  const origin = http.createServer(handle);
  const secureOrigin = https.createServer(
    { key: fs.readFileSync(key), cert: fs.readFileSync(cert) },
    handle
  );
  const tunnels: string[] = [];
  const sockets = new Set<net.Socket>();
  const proxy = http.createServer((_req, res) => {
    res.end("loopback-fixture");
  });
  proxy.on("connect", (req, client, head) => {
    tunnels.push(req.url ?? "");
    // Never use the requested hostname for DNS/egress: the fake proxy is loopback-only.
    const port = Number(req.url?.split(":").at(-1));
    const upstream = net.connect(port, "127.0.0.1", () => {
      client.write("HTTP/1.1 200 Connection Established\r\n\r\n");
      upstream.write(head);
      client.pipe(upstream);
      upstream.pipe(client);
    });
    sockets.add(upstream);
    sockets.add(client as net.Socket);
    upstream.on("error", () => client.destroy());
  });
  const port = await listen(origin);
  const securePort = await listen(secureOrigin);
  const proxyPort = await listen(proxy);
  try {
    for (const lower of [false, true]) {
      tunnels.length = 0;
      direct.length = 0;
      configure?.({
        modulePath,
        config: { network: true },
        onSpawn: (spawned) => {
          child = spawned;
        },
      });
      const proxyUrl = `http://synthetic-user:synthetic-p%40ss@127.0.0.1:${proxyPort}`;
      await withProxyEnv(
        {
          [lower ? "http_proxy" : "HTTP_PROXY"]: proxyUrl,
          [lower ? "https_proxy" : "HTTPS_PROXY"]: proxyUrl,
          [lower ? "no_proxy" : "NO_PROXY"]: `bypass.example:${port}`,
          NODE_EXTRA_CA_CERTS: cert,
          OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS: "sidecar",
        },
        async () => {
          const probe = await runner.runDestinationExport(
            destination("network", 2, { urls: [`http://public.example:${port}/probe`] })
          );
          assert.equal(probe.success, true, probe.error ?? "");
          assert.deepEqual(
            tunnels,
            [`public.example:${port}`],
            "public origin must traverse env proxy"
          );
          assertGone();
          tunnels.length = 0;
          direct.length = 0;
          const result = await runner.runDestinationExport(
            destination("network", 2, {
              urls: [
                `http://public.example:${port}/public`,
                `https://public.example:${securePort}/secure`,
                `http://bypass.example:${port}/bypass`,
                `http://127.0.0.1:${port}/private`,
                `http://sidecar:${port}/sidecar`,
              ],
            })
          );
          assert.equal(result.success, true, result.error ?? "");
          assert.deepEqual(tunnels, [`public.example:${port}`, `public.example:${securePort}`]);
          assert.deepEqual(direct, ["/public", "/secure", "/bypass", "/private", "/sidecar"]);
          assertGone();
        }
      );
    }
  } finally {
    for (const socket of sockets) socket.destroy();
    await Promise.all([closeServer(proxy), closeServer(origin), closeServer(secureOrigin)]);
  }
});

test("R1 proxy credentials are absent from forwarded output and recorded errors", async () => {
  rows(1);
  const logs: string[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => logs.push(args.join(" "));
  try {
    await withProxyEnv(
      { HTTP_PROXY: "http://synthetic-proxy-user:synthetic-p%40ss@127.0.0.1:1" },
      async () => {
        const { safeExportError } = await import("../../src/lib/logExport/safeExportError.ts");
        const sanitized = safeExportError(
          "http://synthetic-proxy-user:synthetic-p%40ss@127.0.0.1:1 synthetic-proxy-user synthetic-p@ss"
        );
        assert.ok(
          !sanitized.includes("synthetic-proxy-user") && !sanitized.includes("synthetic-p@ss"),
          sanitized
        );
        const result = await runner.runDestinationExport(destination("proxy-leak"));
        assert.equal(result.success, false);
        const text = [
          ...logs,
          result.error,
          dbDest.getLogExportDestination(result.destinationId)?.lastError,
        ].join("\n");
        for (const token of ["synthetic-proxy-user", "synthetic-p%40ss", "synthetic-p@ss"])
          assert.ok(!text.includes(token), text);
        assert.match(text, /REDACTED/);
        assertGone();
      }
    );
  } finally {
    console.error = original;
  }
});

test("R2 WAL writer continues during export and post-snapshot rows wait for next run", async () => {
  rows(4, 1000);
  const db = core.getDbInstance();
  assert.equal(
    (db.prepare("PRAGMA journal_mode").get() as { journal_mode: string }).journal_mode,
    "wal"
  );
  const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
  const initial = db.prepare("SELECT * FROM call_logs ORDER BY rowid").all();
  let insertions = 0;
  options(async () => {
    if (insertions >= 4) return;
    // Normal server handle holds an IMMEDIATE writer transaction while child reads its snapshot.
    db.exec("BEGIN IMMEDIATE");
    for (let i = 0; i < 2; i++)
      db.prepare(
        "INSERT INTO call_logs (id, timestamp, model, status) VALUES (?, ?, 'writer', 200)"
      ).run(`live-${insertions++}`, "2026-10-13T00:00:00Z");
    await delay(30);
    db.exec("COMMIT");
  });
  const dest = destination("records", 2);
  const result = await runner.runDestinationExport(dest);
  assert.equal(result.success, true, result.error ?? "");
  assert.equal(result.exported, 4);
  assert.equal(result.cursorRowId, 4);
  assert.equal(result.pendingAfterRun, 4);
  assertGone();
  options();
  const next = await runner.runSingleLogExport(dest.id);
  assert.equal(next?.success, true, next?.error ?? "");
  assert.equal(next?.exported, 4);
  assert.equal(next?.cursorRowId, 8);
  assert.equal(next?.pendingAfterRun, 0);
  assert.equal(dbDest.getLogExportDestination(dest.id)?.exportedTotal, 8);
  assert.deepEqual(
    received()
      .flat()
      .map((row) => (row as { id: string }).id),
    ["row-0", "row-1", "row-2", "row-3", "live-0", "live-1", "live-2", "live-3"]
  );
  assert.deepEqual(
    db.prepare("SELECT * FROM call_logs WHERE rowid <= 4 ORDER BY rowid").all(),
    initial
  );
  assert.deepEqual(
    db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
    before
  );
  assertGone();
});

test("R3 tiny heap OOM is actionable and keeps the last acknowledged cursor", async () => {
  rows(6);
  process.env.OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB = "96";
  try {
    const dest = destination("oom", 2);
    const result = await runner.runDestinationExport(dest);
    assert.equal(result.success, false);
    assert.equal(result.exported, 2);
    assert.equal(result.cursorRowId, 2);
    assert.equal(dbDest.getLogExportDestination(dest.id)?.cursorRowId, 2);
    assert.match(result.error ?? "", /heap.*(exhaust|out of memory)/i);
    assert.match(result.error ?? "", /lower.*batch size/i);
    assert.match(result.error ?? "", /OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB/);
    assert.equal(dbDest.getLogExportDestination(dest.id)?.lastError, result.error);
    assertGone();
  } finally {
    delete process.env.OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB;
  }
});

test("R3 10000-row bodies batch exhausts only a tiny export child heap", async () => {
  rows(10_000);
  const db = core.getDbInstance();
  fs.writeFileSync(
    path.join(dir, "call_logs", "shared-oom.json"),
    JSON.stringify({ requestBody: { text: "x".repeat(32_000) }, pipeline: {} })
  );
  db.exec(
    "UPDATE call_logs SET artifact_relpath = 'shared-oom.json', detail_state = 'ready', has_request_body = 1"
  );
  process.env.OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB = "96";
  try {
    const dest = destination("discard", 10_000);
    const result = await runner.runDestinationExport({ ...dest, maxBodyBytes: 5_000_000 });
    assert.equal(result.success, false);
    assert.equal(result.cursorRowId, 0);
    assert.equal(result.exported, 0);
    assert.match(result.error ?? "", /heap.*(exhaust|out of memory)/i);
    assert.match(
      result.error ?? "",
      /lower batch size or raise OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB/
    );
    assert.equal(dbDest.getLogExportDestination(dest.id)?.cursorRowId, 0);
    assert.equal(
      source.countCallLogsAfterRowId(0),
      10_000,
      "parent remains responsive and DB survives"
    );
    assertGone();
  } finally {
    delete process.env.OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB;
  }
});

test("R3 default 500-row maximum artifacts batch passes with heap margin through BigQuery serialization", async (t) => {
  const { MAX_CALL_LOG_ARTIFACT_BYTES } = await import("../../src/lib/usage/callLogArtifacts.ts");
  rows(500);
  const empty = JSON.stringify({ requestBody: { text: "" }, responseBody: null, pipeline: {} });
  // Exact 512 KiB per artifact. A single large field maximizes retained serialized strings.
  const payload = JSON.stringify({
    requestBody: { text: "x".repeat(MAX_CALL_LOG_ARTIFACT_BYTES - Buffer.byteLength(empty)) },
    responseBody: null,
    pipeline: {},
  });
  assert.equal(Buffer.byteLength(payload), MAX_CALL_LOG_ARTIFACT_BYTES);
  const db = core.getDbInstance();
  for (let i = 0; i < 500; i++) {
    const rel = `maximum-${i}.json`;
    fs.writeFileSync(path.join(dir, "call_logs", rel), payload);
    db.prepare(
      "UPDATE call_logs SET artifact_relpath = ?, detail_state = 'ready', has_request_body = 1 WHERE id = ?"
    ).run(rel, `row-${i}`);
  }
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const serviceAccountJson = JSON.stringify({
    type: "service_account",
    client_email: "synthetic@example.invalid",
    private_key: privateKey.export({ type: "pkcs8", format: "pem" }).toString(),
  });
  let gc = "";
  const original = console.log;
  console.log = () => {}; // Capture raw GC output instead of flooding test logs.
  configure?.({
    modulePath,
    config: { memoryOutput: `${output}.memory` },
    onSpawn: (spawned) => {
      child = spawned;
      spawned.stdout?.on("data", (chunk: Buffer) => {
        gc += chunk.toString();
      });
    },
  });
  const dest = destination("memory", 500, { serviceAccountJson });
  let result: Awaited<ReturnType<typeof runner.runDestinationExport>>;
  try {
    result = await runner.runDestinationExport({ ...dest, maxBodyBytes: 5_000_000 });
  } finally {
    console.log = original;
  }
  if (process.env.LOG_EXPORT_TEST_EVIDENCE_DIR) {
    fs.writeFileSync(
      path.join(process.env.LOG_EXPORT_TEST_EVIDENCE_DIR, `memory-${process.pid}.gc.log`),
      gc
    );
    if (fs.existsSync(`${output}.memory`))
      fs.copyFileSync(
        `${output}.memory`,
        path.join(process.env.LOG_EXPORT_TEST_EVIDENCE_DIR, `memory-${process.pid}.samples.jsonl`)
      );
  }
  assert.equal(result.success, true, result.error ?? "");
  assert.equal(result.exported, 500);
  const samples = fs
    .readFileSync(`${output}.memory`, "utf8")
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line) as { heapUsed: number; rss: number; maxRSS: number });
  const peakHeap = Math.max(
    ...samples.map((sample) => sample.heapUsed),
    ...Array.from(gc.matchAll(/total_size_before=(\d+)/g), (match) => Number(match[1]))
  );
  const peakRss = Math.max(...samples.map((sample) => sample.maxRSS * 1024));
  const info = JSON.parse(fs.readFileSync(`${output}.process`, "utf8")) as { execArgv: string[] };
  const heapMb = Number(
    info.execArgv.find((arg) => arg.startsWith("--max-old-space-size="))?.split("=")[1]
  );
  t.diagnostic(
    `memory: rows=500 artifactBytes=${MAX_CALL_LOG_ARTIFACT_BYTES} maxBodyBytes=5000000 heapLimitMiB=${heapMb} peakHeapBytes=${peakHeap} peakRssBytes=${peakRss} (heap: GC before-collection + 5ms/fetch samples; RSS: OS high-water)`
  );
  assert.ok(peakHeap < heapMb * 1024 * 1024 * 0.8, "default heap must have >=20% margin");
  assertGone();
});

test("R4 runtime selection keeps Node isolated and Bun on warned in-process compatibility path", async () => {
  const selection = (
    runner as unknown as { selectLogExportRuntime?: (versions: { bun?: string }) => string }
  ).selectLogExportRuntime;
  assert.equal(typeof selection, "function");
  assert.equal(selection?.({}), "child");
  assert.equal(selection?.({ bun: "1.4.2" }), "in-process");
});

test("R5 forwarded child output suppresses ExperimentalWarning but not other warnings", async () => {
  rows(1);
  const logs: string[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => logs.push(args.join(" "));
  try {
    const result = await runner.runDestinationExport(destination("warning"));
    assert.equal(result.success, true, result.error ?? "");
    assert.ok(!logs.join("\n").includes("ExperimentalWarning"), logs.join("\n"));
    assert.match(logs.join("\n"), /fixture-warning/);
    assertGone();
  } finally {
    console.error = original;
  }
});
