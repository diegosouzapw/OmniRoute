// Regression test for the "⚠ Server did not respond within 60s" false alarm on a
// server that is actually healthy: `omniroute serve` printed the readiness-timeout
// diagnostic while the process went on to serve traffic normally.
//
// Cause: every probe of /api/monitoring/health was aborted after a FIXED 2s
// (`AbortSignal.timeout(2000)`), and a probe that times out is classified
// "hanging", which waitForServer refuses to count toward readiness (#6800).
// So whenever the first health response takes longer than 2s — a cold Windows
// boot where that route resolves ~10 dynamic imports and reads the DB — the poll
// can never succeed: each abort discards the in-flight request before the route
// finishes (so the route's own 1s payload cache is never populated either), and
// 500ms later a fresh probe restarts the same work into the same 2s ceiling, for
// the whole 60s budget. Same failure family as #10508, which fixed it by taking a
// DNS lookup out of that 2s budget rather than by widening the budget.
//
// Fix: escalate the per-probe timeout (2s → 4s → 8s → 15s) so a slow-but-real
// response is observed instead of aborted forever, clamped to the remaining
// budget so the total wait still honours the caller's timeout.

import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import { waitForServer } from "../../bin/cli/utils/pid.mjs";

const SLOW_RESPONSE_MS = 3200; // > the initial 2s probe timeout

test("waitForServer reports ready when the health response outlasts a probe timeout", async () => {
  let served = 0;
  const server = http.createServer((req, res) => {
    served += 1;
    // Answer only after a delay that exceeds the initial probe timeout. An
    // aborted probe tears the socket down before this fires — exactly how the
    // real health route loses all of its work on every abort.
    const timer = setTimeout(() => {
      if (res.writableEnded || res.destroyed) return;
      res.writeHead(200, { "content-type": "application/json" });
      res.end('{"status":"healthy"}');
    }, SLOW_RESPONSE_MS);
    res.on("close", () => clearTimeout(timer));
    res.on("error", () => {});
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;

  try {
    const start = Date.now();
    const ready = await waitForServer(port, 30000);
    const elapsedMs = Date.now() - start;

    assert.equal(
      ready,
      true,
      `waitForServer() reported ready=false after ${elapsedMs}ms (${served} probe(s)) even ` +
        `though /api/monitoring/health answered 200 in ${SLOW_RESPONSE_MS}ms — a healthy ` +
        `server that is merely slower than one probe timeout must not be declared timed out.`
    );
    assert.ok(
      elapsedMs < 30000,
      `expected readiness well before the 30s budget, took ${elapsedMs}ms`
    );
  } finally {
    server.close();
  }
});

test("escalating probe timeouts stay clamped to the caller's remaining budget", async () => {
  // A socket that accepts TCP and never answers must still resolve false at
  // (roughly) the caller's timeout — an escalating per-probe timeout must never
  // let a single in-flight probe overrun the overall budget (#6800 guard).
  const server = net.createServer(() => {});
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;

  try {
    const start = Date.now();
    const ready = await waitForServer(port, 8000);
    const elapsedMs = Date.now() - start;

    assert.equal(ready, false, "a never-answering socket must not be reported ready");
    assert.ok(
      elapsedMs < 12000,
      `waitForServer overran its 8s budget by more than 4s (took ${elapsedMs}ms) — a probe ` +
        `timeout must be clamped to the time left in the budget`
    );
  } finally {
    server.close();
  }
});

test("readiness-timeout diagnostic distinguishes a listening port from a dead one", async () => {
  const { reportReadinessTimeout } = await import("../../bin/cli/commands/serve.mjs");
  const supervisor = { getRecentLog: () => [] };

  const capture = async (lastProbeOutcome) => {
    const lines = [];
    const origErr = console.error.bind(console);
    console.error = (...args) => lines.push(args.join(" "));
    try {
      reportReadinessTimeout(20128, supervisor, lastProbeOutcome);
    } finally {
      console.error = origErr;
    }
    return lines.join("\n");
  };

  const hanging = await capture("hanging");
  assert.match(
    hanging,
    /IS accepting connections/,
    "a timeout against a listening port must say the server is probably up, not just that it " +
      "failed — that is the difference between a scary false alarm and an accurate hint"
  );

  const dead = await capture("not-listening");
  assert.match(dead, /Nothing is listening/, "a port that never bound must be reported as such");
  assert.doesNotMatch(dead, /IS accepting connections/);

  // Callers that pass no classification (and the #6321 test) keep the old output.
  const unknown = await capture(undefined);
  assert.doesNotMatch(unknown, /IS accepting connections|Nothing is listening/);
  assert.match(unknown, /did not respond/);
});
