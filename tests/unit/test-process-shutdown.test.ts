import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import test from "node:test";
import { readFileSync } from "node:fs";
import { stopTestProcess } from "../_helpers/stopTestProcess.ts";

test("batch HTTP fixture uses the peer-stamping server entrypoint", () => {
  const source = readFileSync(
    new URL("../integration/batch-e2e-rate-limit.test.ts", import.meta.url),
    "utf8"
  );
  assert.ok(source.includes('["scripts/dev/run-next.mjs", "dev"]'));
  assert.ok(!source.includes('["scripts/dev/run-next-playwright.mjs", "dev"]'));
  assert.ok(source.includes('HOST: "127.0.0.1"'));
});

test(
  "test server cleanup returns when the process already exited",
  { timeout: 15_000 },
  async () => {
    const child = spawn(process.execPath, ["-e", "process.exit(0)"]);
    await once(child, "exit");
    let timer: NodeJS.Timeout;
    try {
      await Promise.race([
        stopTestProcess(child, 20),
        new Promise((_, reject) => {
          timer = setTimeout(
            () => reject(new Error("cleanup waited for an exit that already happened")),
            500
          );
        }),
      ]);
    } finally {
      clearTimeout(timer!);
    }
  }
);

test("test server cleanup escalates when SIGTERM is ignored", { timeout: 15_000 }, async () => {
  const child = spawn(process.execPath, [
    "-e",
    'process.on("SIGTERM", () => {}); process.stdout.write("ready"); setInterval(() => {}, 1000);',
  ]);
  try {
    await once(child.stdout, "data");
    await stopTestProcess(child, 20);
    assert.equal(child.signalCode, "SIGKILL");
  } finally {
    if (child.exitCode === null && child.signalCode === null) {
      const exited = once(child, "exit");
      child.kill("SIGKILL");
      await exited;
    }
  }
});

test("test server cleanup waits for a graceful SIGTERM exit", { timeout: 15_000 }, async () => {
  const child = spawn(process.execPath, [
    "-e",
    'process.on("SIGTERM", () => process.exit(0)); process.stdout.write("ready"); setInterval(() => {}, 1000);',
  ]);
  try {
    await once(child.stdout, "data");
    await stopTestProcess(child);
    assert.equal(child.exitCode, 0);
  } finally {
    if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
  }
});
