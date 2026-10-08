import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runGateProcess } from "../../../scripts/quality/gate-process.mjs";

function fixture(t: { after: (fn: () => void) => void }) {
  const directory = mkdtempSync(join(tmpdir(), "gate-process-test-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return { cwd: directory, logPath: join(directory, "gate.log"), timeout: 15000, killGraceMs: 100 };
}

test("preserves success and nonzero exits with immutable receipts", async (t) => {
  for (const code of [0, 42]) {
    const options = fixture(t);
    const result = await runGateProcess(
      process.execPath,
      ["-e", `console.log('progress'); console.error('diagnostic'); process.exitCode=${code}`],
      options
    );
    assert.equal(result.code, code);
    assert.equal(result.receipt.outcome, code ? "FAIL" : "PASS");
    assert.match(readFileSync(options.logPath, "utf8"), /progress/);
    assert.match(readFileSync(options.logPath, "utf8"), /diagnostic/);
    assert.equal(JSON.parse(readFileSync(result.receiptPath, "utf8")).exitCode, code);
    await assert.rejects(runGateProcess(process.execPath, ["-e", ""], options), /EEXIST/);
  }
});

test("missing executable is infrastructure failure, not a failed test or pass", async (t) => {
  const result = await runGateProcess("/nonexistent/omniroute-gate-command", [], fixture(t));
  assert.notEqual(result.code, 0);
  assert.equal(result.receipt.outcome, "SPAWN_ERROR");
  assert.equal(result.receipt.exitCode, null);
  assert.equal(result.receipt.spawnError, "ENOENT");
});

test(
  "timeout preserves output and kills a TERM-resistant process tree",
  { skip: process.platform === "win32" },
  async (t) => {
    const options = fixture(t);
    options.timeout = 2000;
    const result = await runGateProcess(
      "sh",
      [
        "-c",
        "trap '' TERM; printf 'ready\\n'; sh -c 'trap \"\" TERM; while :; do sleep 1; done' & wait",
      ],
      options
    );
    assert.equal(result.code, 124);
    assert.equal(result.receipt.outcome, "TIMEOUT");
    assert.equal(result.receipt.signal, "SIGKILL");
    assert.match(result.out, /ready/);
    assert.match(readFileSync(options.logPath, "utf8"), /ready/);
  }
);

test("external signal cannot become PASS", { skip: process.platform === "win32" }, async (t) => {
  const result = await runGateProcess(
    "sh",
    ["-c", "printf 'before signal\\n'; kill -TERM $$"],
    fixture(t)
  );
  assert.notEqual(result.code, 0);
  assert.equal(result.receipt.outcome, "SIGNAL");
  assert.equal(result.receipt.signal, "SIGTERM");
  assert.match(result.out, /before signal/);
});

test("heartbeat observes persisted progress and supports cancellation", async (t) => {
  const controller = new AbortController();
  const options = fixture(t);
  let observedProgress = false;
  const result = await runGateProcess(
    process.execPath,
    ["-e", "console.log('ready'); setInterval(()=>{},1000)"],
    {
      ...options,
      signal: controller.signal,
      heartbeatMs: 100,
      onHeartbeat: ({ bytes }: { bytes: number }) => {
        if (bytes > 0) {
          observedProgress = readFileSync(options.logPath, "utf8").includes("ready");
          controller.abort();
        }
      },
    }
  );
  assert.equal(observedProgress, true);
  assert.equal(result.receipt.outcome, "CANCELLED");
  assert.notEqual(result.code, 0);
});

test("excess output is infrastructure failure with a persisted partial log", async (t) => {
  const result = await runGateProcess(process.execPath, ["-e", "console.log('x'.repeat(10000))"], {
    ...fixture(t),
    maxBuffer: 32,
  });
  assert.equal(result.receipt.outcome, "OUTPUT_LIMIT");
  assert.notEqual(result.code, 0);
  assert.ok(result.receipt.bytes >= 10000);
});

test("pre-cancelled commands never start", async (t) => {
  const controller = new AbortController();
  controller.abort();
  const result = await runGateProcess(process.execPath, ["-e", "throw Error('must not run')"], {
    ...fixture(t),
    signal: controller.signal,
  });
  assert.equal(result.receipt.outcome, "CANCELLED");
  assert.equal(result.receipt.bytes, 0);
});

test(
  "a successful parent cannot leave an unsupervised descendant",
  { skip: process.platform === "win32" },
  async (t) => {
    const result = await runGateProcess(
      "sh",
      ["-c", "sleep 30 & printf 'child=%s\\n' \"$!\"; exit 0"],
      fixture(t)
    );
    assert.equal(result.receipt.exitCode, 0);
    assert.equal(result.receipt.outcome, "ORPHANED_DESCENDANTS");
    assert.notEqual(result.code, 0);
    const pid = Number(/child=(\d+)/.exec(result.out)?.[1]);
    assert.ok(pid > 0);
    if (process.platform === "linux") {
      try {
        const state = readFileSync(`/proc/${pid}/stat`, "utf8").split(") ")[1][0];
        assert.equal(state, "Z", "a child awaiting OS reaping must not remain running");
      } catch (error) {
        assert.equal((error as NodeJS.ErrnoException).code, "ENOENT");
      }
    }
  }
);

test("UTF-8 characters split between stream chunks remain intact", async (t) => {
  const result = await runGateProcess(
    process.execPath,
    [
      "-e",
      "const b=Buffer.from('ação');process.stdout.write(b.subarray(0,2));setTimeout(()=>process.stdout.write(b.subarray(2)),50)",
    ],
    fixture(t)
  );
  assert.equal(result.code, 0);
  assert.equal(result.out, "ação");
});
