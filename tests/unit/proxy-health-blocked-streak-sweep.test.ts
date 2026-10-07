/**
 * #13608 through the real sweep (forceProxyHealthSweep): fail -> blocked -> fail on one
 * proxy with PROXY_AUTO_DISABLE=true and a threshold of 2.
 *
 * - Flag off (default, #10654): the refusal is neutral, the streak survives it, and the
 *   second failure soft-disables the proxy.
 * - PROXY_HEALTH_BLOCKED_RESETS_STREAK on: the refusal resets the streak, so the second
 *   failure is only the first of a new streak and the proxy keeps its status.
 *
 * The refusal comes from a local HTTP proxy that relays to a local target answering 403;
 * the failures come from the same port with nothing listening (immediate ECONNREFUSED).
 * No outbound traffic. The sweep summary line is captured to pin its refusal tally.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-blocked-streak-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.PROXY_AUTO_DISABLE = "true";
process.env.PROXY_AUTO_REMOVE_AFTER = "2";
process.env.PROXY_HEALTH_TEST_STAGGER_MS = "0";
delete process.env.PROXY_AUTO_REMOVE;
delete process.env.PROXY_HEALTH_BLOCKED_RESETS_STREAK;

// The probe target: any request is refused, the way a destination refuses an egress IP.
const target = http.createServer((_req, res) => {
  res.writeHead(403);
  res.end();
});
await new Promise<void>((resolve) => target.listen(0, "127.0.0.1", () => resolve()));
const targetPort = (target.address() as net.AddressInfo).port;
process.env.PROXY_HEALTH_TEST_URL = `http://127.0.0.1:${targetPort}/probe`;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { forceProxyHealthSweep } = await import("../../src/lib/proxyHealth/scheduler.ts");

test.after(async () => {
  delete process.env.PROXY_HEALTH_BLOCKED_RESETS_STREAK;
  await new Promise<void>((resolve) => target.close(() => resolve()));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// A minimal forward proxy on a fixed port: absolute-form requests and CONNECT tunnels both
// reach the refusing target. Tunnel sockets are detached from the server, so they are tracked
// and destroyed on stop: a kept-alive tunnel must not turn the next "fail" into a refusal.
const tunnelSockets = new Set<net.Socket>();

function startRelay(port: number): Promise<http.Server> {
  const relay = http.createServer((req, res) => {
    const upstream = http.request(
      { host: "127.0.0.1", port: targetPort, method: req.method, path: "/probe" },
      (answer) => {
        res.writeHead(answer.statusCode ?? 502);
        answer.pipe(res);
      }
    );
    upstream.on("error", () => res.destroy());
    req.pipe(upstream);
  });
  relay.on("connect", (_req, client, head) => {
    tunnelSockets.add(client as net.Socket);
    const socket = net.connect(targetPort, "127.0.0.1", () => {
      client.write("HTTP/1.1 200 Connection Established\r\n\r\n");
      socket.write(head);
      socket.pipe(client);
      client.pipe(socket);
    });
    tunnelSockets.add(socket);
    socket.on("error", () => client.destroy());
    client.on("error", () => socket.destroy());
  });
  return new Promise((resolve) => relay.listen(port, "127.0.0.1", () => resolve(relay)));
}

function stopRelay(relay: http.Server): Promise<void> {
  for (const socket of tunnelSockets) socket.destroy();
  tunnelSockets.clear();
  relay.closeAllConnections();
  return new Promise((resolve) => relay.close(() => resolve()));
}

async function freePort(): Promise<number> {
  const probe = net.createServer();
  await new Promise<void>((resolve) => probe.listen(0, "127.0.0.1", () => resolve()));
  const { port } = probe.address() as net.AddressInfo;
  await new Promise<void>((resolve) => probe.close(() => resolve()));
  return port;
}

async function sweepCapturingSummary(): Promise<string> {
  const lines: string[] = [];
  const original = console.log;
  console.log = (...args: unknown[]) => {
    lines.push(args.map(String).join(" "));
  };
  try {
    await forceProxyHealthSweep();
  } finally {
    console.log = original;
  }
  return lines.find((line) => line.includes("Sweep complete")) ?? "";
}

async function failBlockedFail(): Promise<{ status: string | undefined; summaries: string[] }> {
  const port = await freePort();
  const created = await proxiesDb.createProxy({
    name: `flaky ${port}`,
    type: "http",
    host: "127.0.0.1",
    port,
  });
  const summaries: string[] = [];
  summaries.push(await sweepCapturingSummary()); // nothing listening: fail (streak 1)
  const relay = await startRelay(port);
  try {
    summaries.push(await sweepCapturingSummary()); // relayed, target refused: blocked
  } finally {
    await stopRelay(relay);
  }
  summaries.push(await sweepCapturingSummary()); // nothing listening again: fail
  const row = await proxiesDb.getProxyById(created!.id, { includeSecrets: false });
  await proxiesDb.deleteProxyById(created!.id, { force: true });
  return { status: (row as { status?: string } | null)?.status, summaries };
}

test("flag off (default): a refusal keeps the streak, the second failure disables", async () => {
  delete process.env.PROXY_HEALTH_BLOCKED_RESETS_STREAK;
  const { status, summaries } = await failBlockedFail();
  assert.match(summaries[1], /1 tested, 0 alive, 1 refused by target/);
  assert.equal(status, "dead");
});

test("flag on: a refusal resets the streak, the second failure does not disable", async () => {
  process.env.PROXY_HEALTH_BLOCKED_RESETS_STREAK = "true";
  const { status, summaries } = await failBlockedFail();
  assert.match(summaries[1], /1 tested, 0 alive, 1 refused by target/);
  assert.notEqual(status, "dead");
});
