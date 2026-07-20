import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { fixTlsClientNodeBinary } from "../../scripts/build/fixTlsClientNodeBinary.mjs";

function makeRoot() {
  return mkdtempSync(join(tmpdir(), "fix-tls-client-node-binary-7802-"));
}

function collectLogs() {
  const logs: string[] = [];
  return { logs, log: (m: string) => logs.push(m) };
}

test("no-ops when node_modules/tls-client-node is absent (module not installed)", async () => {
  const rootDir = makeRoot();
  try {
    const { logs, log } = collectLogs();
    await fixTlsClientNodeBinary({ rootDir, log });
    assert.deepEqual(logs, []);
  } finally {
    rmSync(rootDir, { recursive: true, force: true });
  }
});

test("copies an already-populated root bin/ into the standalone dist bundle (#7802 item 2)", async () => {
  const rootDir = makeRoot();
  try {
    const rootBin = join(rootDir, "node_modules", "tls-client-node", "bin");
    mkdirSync(rootBin, { recursive: true });
    writeFileSync(join(rootBin, "tls-client-linux-ubuntu-amd64-1.0.0.so"), "fake-binary");

    const distTlsClientDir = join(rootDir, "dist", "node_modules", "tls-client-node");
    mkdirSync(distTlsClientDir, { recursive: true });

    const { log } = collectLogs();
    await fixTlsClientNodeBinary({ rootDir, log });

    const distBin = join(distTlsClientDir, "bin");
    assert.ok(existsSync(distBin), "dist bin/ should have been created");
    assert.deepEqual(readdirSync(distBin), ["tls-client-linux-ubuntu-amd64-1.0.0.so"]);
  } finally {
    rmSync(rootDir, { recursive: true, force: true });
  }
});

test("retries the download when root bin/ is empty, and stops once a file appears (#7802 item 3)", async () => {
  const rootDir = makeRoot();
  try {
    const tlsClientDir = join(rootDir, "node_modules", "tls-client-node");
    const rootBin = join(tlsClientDir, "bin");
    mkdirSync(rootBin, { recursive: true });

    const scriptsDir = join(tlsClientDir, "scripts");
    mkdirSync(scriptsDir, { recursive: true });
    // A postinstall.js stand-in that drops a file into bin/ on its 2nd invocation —
    // simulating a first attempt eaten by a GitHub rate-limit and a 2nd that recovers.
    writeFileSync(
      join(scriptsDir, "postinstall.js"),
      `const fs = require("fs");
       const path = require("path");
       const marker = path.join(__dirname, "..", ".attempts");
       const attempts = fs.existsSync(marker) ? Number(fs.readFileSync(marker, "utf8")) : 0;
       fs.writeFileSync(marker, String(attempts + 1));
       if (attempts + 1 >= 2) {
         fs.writeFileSync(path.join(__dirname, "..", "bin", "tls-client-linux-ubuntu-amd64-1.0.0.so"), "ok");
       }`
    );

    const { logs, log } = collectLogs();
    await fixTlsClientNodeBinary({ rootDir, log, retryDelaysMs: [1, 1, 1] });

    assert.ok(existsSync(join(rootBin, "tls-client-linux-ubuntu-amd64-1.0.0.so")));
    assert.ok(
      logs.some((m) => m.includes("fetched successfully")),
      "expected a success log once the retry recovered"
    );
  } finally {
    rmSync(rootDir, { recursive: true, force: true });
  }
});

test("warns without throwing when every retry leaves bin/ empty (still rate-limited)", async () => {
  const rootDir = makeRoot();
  try {
    const tlsClientDir = join(rootDir, "node_modules", "tls-client-node");
    mkdirSync(join(tlsClientDir, "bin"), { recursive: true });
    const scriptsDir = join(tlsClientDir, "scripts");
    mkdirSync(scriptsDir, { recursive: true });
    // A postinstall.js stand-in that always fails to produce a binary (persistent rate-limit).
    writeFileSync(join(scriptsDir, "postinstall.js"), `process.exitCode = 0;`);

    const originalWarn = console.warn;
    const warnings: string[] = [];
    console.warn = (m: string) => warnings.push(m);
    try {
      const { log } = collectLogs();
      await assert.doesNotReject(
        fixTlsClientNodeBinary({ rootDir, log, retryDelaysMs: [1, 1] })
      );
    } finally {
      console.warn = originalWarn;
    }

    assert.ok(
      warnings.some((m) => m.includes("Could not fetch tls-client-node")),
      "expected a clear warning pointing at the manual fix, not a silent no-op"
    );
  } finally {
    rmSync(rootDir, { recursive: true, force: true });
  }
});
