import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

import { resolveReadyTimeout, reportReadinessTimeout } from "../../bin/cli/commands/serve.mjs";
import { waitForServer } from "../../bin/cli/utils/pid.mjs";

// #13369: verify configurable readiness timeout via --ready-timeout and OMNIROUTE_READY_TIMEOUT_MS

test("resolveReadyTimeout returns 60000 by default when no option or env var is set (#13369)", () => {
  const origEnv = process.env.OMNIROUTE_READY_TIMEOUT_MS;
  delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
  try {
    const timeout = resolveReadyTimeout({});
    assert.equal(timeout, 60000);
  } finally {
    if (origEnv !== undefined) process.env.OMNIROUTE_READY_TIMEOUT_MS = origEnv;
    else delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
  }
});

test("resolveReadyTimeout respects OMNIROUTE_READY_TIMEOUT_MS env var (#13369)", () => {
  const origEnv = process.env.OMNIROUTE_READY_TIMEOUT_MS;
  try {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "150000";
    const timeout = resolveReadyTimeout({});
    assert.equal(timeout, 150000);
  } finally {
    if (origEnv !== undefined) process.env.OMNIROUTE_READY_TIMEOUT_MS = origEnv;
    else delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
  }
});

test("resolveReadyTimeout prioritizes opts.readyTimeout over OMNIROUTE_READY_TIMEOUT_MS (#13369)", () => {
  const origEnv = process.env.OMNIROUTE_READY_TIMEOUT_MS;
  try {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "150000";
    const timeout = resolveReadyTimeout({ readyTimeout: 180000 });
    assert.equal(timeout, 180000);

    const stringTimeout = resolveReadyTimeout({ readyTimeout: "240000" });
    assert.equal(stringTimeout, 240000);
  } finally {
    if (origEnv !== undefined) process.env.OMNIROUTE_READY_TIMEOUT_MS = origEnv;
    else delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
  }
});

test("resolveReadyTimeout ignores invalid or non-positive values and falls back safely (#13369)", () => {
  const origEnv = process.env.OMNIROUTE_READY_TIMEOUT_MS;
  try {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "invalid";
    assert.equal(resolveReadyTimeout({ readyTimeout: -50 }), 60000);
    assert.equal(resolveReadyTimeout({ readyTimeout: "not-a-number" }), 60000);
  } finally {
    if (origEnv !== undefined) process.env.OMNIROUTE_READY_TIMEOUT_MS = origEnv;
    else delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
  }
});

test("reportReadinessTimeout formats custom timeout seconds into message (#13369)", () => {
  const logs: string[] = [];
  const origErr = console.error.bind(console);
  console.error = (...args: unknown[]) => logs.push(args.join(" "));

  try {
    reportReadinessTimeout(20128, { getRecentLog: () => [] }, 120000);
    const combined = logs.join("\n");
    assert.ok(
      combined.includes("within 120s"),
      `expected "within 120s" in message, got:\n${combined}`
    );
  } finally {
    console.error = origErr;
  }
});

test("OMNIROUTE_READY_TIMEOUT_MS is registered in CLI env vars (#13369)", async () => {
  const envShowMod = await import("../../bin/cli/commands/env.mjs");
  const logs: string[] = [];
  const origLog = console.log.bind(console);
  console.log = (...args: unknown[]) => logs.push(args.join(" "));

  try {
    await envShowMod.runEnvShowCommand({ json: true });
    const output = JSON.parse(logs.join("\n"));
    assert.equal(output.defaults.OMNIROUTE_READY_TIMEOUT_MS, "60000");
  } finally {
    console.log = origLog;
  }
});

test("waitForServer default timeout respects OMNIROUTE_READY_TIMEOUT_MS (#13369)", async () => {
  const origEnv = process.env.OMNIROUTE_READY_TIMEOUT_MS;
  try {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "1200";

    const server = net.createServer();
    const port = await new Promise<number>((resolve) => {
      server.listen(0, () => {
        const addr = server.address() as net.AddressInfo;
        const p = addr.port;
        server.close(() => resolve(p));
      });
    });

    const start = Date.now();
    const result = await waitForServer(port);
    const elapsed = Date.now() - start;

    assert.equal(result, false);
    assert.ok(
      elapsed >= 1000 && elapsed < 4000,
      `expected waitForServer to respect OMNIROUTE_READY_TIMEOUT_MS=1200, elapsed=${elapsed}ms`
    );
  } finally {
    if (origEnv !== undefined) process.env.OMNIROUTE_READY_TIMEOUT_MS = origEnv;
    else delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
  }
});
