import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import {
  assertNoLargeBacking,
  BYTES_PER_TOKEN_EQUIVALENT,
  buildClaudeContextPayload,
  buildWorkerEnv,
  classifyContextBackingCandidates,
  cleanupWorkerSnapshot,
  summarizeSettledGrowth,
  withRawSnapshotCleanup,
} from "../../scripts/perf/messages-route-memory-profile.ts";

const SCRIPT = new URL("../../scripts/perf/messages-route-memory-profile.ts", import.meta.url);

test("JON-562 corpus varies only context bytes and hits the exact token-equivalent size", () => {
  const small = buildClaudeContextPayload(100_000);
  const medium = buildClaudeContextPayload(300_000);

  assert.equal(
    Buffer.byteLength(JSON.stringify(small.body), "utf8"),
    100_000 * BYTES_PER_TOKEN_EQUIVALENT
  );
  assert.equal(
    Buffer.byteLength(JSON.stringify(medium.body), "utf8"),
    300_000 * BYTES_PER_TOKEN_EQUIVALENT
  );
  assert.deepEqual(buildClaudeContextPayload(100_000), small, "the corpus must be deterministic");
  assert.equal(small.body.messages.length, medium.body.messages.length);
  assert.equal(small.body.stream, medium.body.stream);
  assert.equal(small.body.model, medium.body.model);
});

test("JON-562 settled-growth summary uses only post-GC samples", () => {
  const summary = summarizeSettledGrowth(
    [
      { phase: "baseline", heapUsedBytes: 1_000 },
      { phase: "after_route", heapUsedBytes: 9_000 },
      { phase: "settled", heapUsedBytes: 1_100, requestIndex: 1 },
      { phase: "settled", heapUsedBytes: 1_300, requestIndex: 2 },
      { phase: "settled", heapUsedBytes: 1_600, requestIndex: 3 },
    ],
    400
  );

  assert.equal(summary.settledGrowthBytes, 600);
  assert.equal(summary.settledSlopeBytesPerRequest, 250);
  assert.equal(summary.growthToWireRatio, 1.5);
});

test("JON-562 worker environment is an allowlist and drops credential-shaped variables", () => {
  const env = buildWorkerEnv({
    PATH: "/usr/bin:/bin",
    HOME: "/tmp/profile-home",
    LANG: "C.UTF-8",
    LINEAR_API_KEY: "must-not-cross",
    OPENAI_API_KEY: "must-not-cross",
    OMNIROUTE_MANAGEMENT_TOKEN: "must-not-cross",
  });

  assert.deepEqual(env, {
    PATH: "/usr/bin:/bin",
    HOME: "/tmp/profile-home",
    LANG: "C.UTF-8",
    NODE_ENV: "test",
    APP_LOG_LEVEL: "error",
  });
});

test("JON-562 heap analyzer uses V8 self_size, not truncated string preview length", () => {
  const marker = "JON-562-600000-CONTEXT";
  const truncatedPreview = (marker + "x".repeat(2_000)).slice(0, 1_024);
  const detachedSnapshot = {
    snapshot: {
      meta: {
        node_fields: ["type", "name", "id", "self_size", "edge_count"],
        node_types: [
          ["synthetic", "string", "concatenated string"],
          "string",
          "number",
          "number",
          "number",
        ],
        edge_fields: ["type", "name_or_index", "to_node"],
        edge_types: [["internal"], "string_or_number", "node"],
      },
    },
    nodes: [1, 0, 1, 1_224, 0],
    edges: [],
    strings: [truncatedPreview, "first", "second", "xxxxxxxx"],
  };
  const slicedBackingSnapshot = {
    ...detachedSnapshot,
    // Marker leaf (1 KiB) + large sibling backing (4 MiB) + concatenated-string root.
    nodes: [1, 0, 1, 1_024, 0, 1, 3, 2, 4 * 1024 * 1024, 0, 2, 3, 3, 24, 2],
    edges: [0, 1, 0, 0, 2, 5],
  };

  const retained = classifyContextBackingCandidates(slicedBackingSnapshot, marker, 2_000_000);
  const detached = classifyContextBackingCandidates(detachedSnapshot, marker, 2_000_000);

  assert.equal(retained.largeBackingRetained, true);
  assert.ok(retained.maxBackingRetainedSizeBytes >= 4 * 1024 * 1024);
  assert.equal(detached.largeBackingRetained, false);
  assert.equal(detached.maxBackingRetainedSizeBytes, 1_224);
});

test("JON-562 retention gate rejects any context-sized backing result", () => {
  assert.throws(
    () => assertNoLargeBacking({ largeBackingRetained: true }),
    /context-sized backing string/i
  );
  assert.doesNotThrow(() => assertNoLargeBacking({ largeBackingRetained: false }));
});

test("JON-562 raw snapshot cleanup runs when a case fails or times out", async () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-JON-562-cleanup-"));
  const snapshot = path.join(outputDir, "post-gc.heapsnapshot");
  fs.writeFileSync(snapshot, "synthetic raw snapshot");
  try {
    await assert.rejects(
      withRawSnapshotCleanup(snapshot, async () => {
        throw new Error("simulated analyzer timeout");
      }),
      /simulated analyzer timeout/
    );
    assert.equal(fs.existsSync(snapshot), false);
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});

test("JON-562 worker deletes raw snapshots unless a successful driver handoff owns them", () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-JON-562-worker-cleanup-"));
  const failedSnapshot = path.join(outputDir, "failed.heapsnapshot");
  const handedOffSnapshot = path.join(outputDir, "handed-off.heapsnapshot");
  fs.writeFileSync(failedSnapshot, "failed worker raw snapshot");
  fs.writeFileSync(handedOffSnapshot, "successful handoff raw snapshot");
  try {
    cleanupWorkerSnapshot(failedSnapshot, {
      workerComplete: false,
      snapshotHandoff: true,
    });
    cleanupWorkerSnapshot(handedOffSnapshot, {
      workerComplete: true,
      snapshotHandoff: true,
    });
    assert.equal(fs.existsSync(failedSnapshot), false);
    assert.equal(fs.existsSync(handedOffSnapshot), true);
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});

test("JON-562 standalone analyzer deletes an invalid raw snapshot on failure", () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-JON-562-analyzer-fail-"));
  const snapshot = path.join(outputDir, "post-gc.heapsnapshot");
  fs.writeFileSync(snapshot, "not valid JSON");
  try {
    const result = spawnSync(
      process.execPath,
      [
        "--import",
        "tsx/esm",
        SCRIPT.pathname,
        "--analyze-snapshot",
        "--snapshot",
        snapshot,
        "--output-dir",
        outputDir,
        "--marker",
        "JON-562-invalid",
        "--minimum-self-size-bytes",
        "1024",
      ],
      {
        cwd: new URL("../..", import.meta.url),
        encoding: "utf8",
        env: buildWorkerEnv(process.env),
        timeout: 10_000,
      }
    );
    assert.notEqual(result.status, 0);
    assert.equal(fs.existsSync(snapshot), false);
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});

test("JON-562 standalone analyzer deletes raw input when required arguments are missing", () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-JON-562-analyzer-args-"));
  const snapshot = path.join(outputDir, "post-gc.heapsnapshot");
  fs.writeFileSync(snapshot, "synthetic raw snapshot");
  try {
    const result = spawnSync(
      process.execPath,
      [
        "--import",
        "tsx/esm",
        SCRIPT.pathname,
        "--analyze-snapshot",
        "--snapshot",
        snapshot,
        "--output-dir",
        outputDir,
      ],
      {
        cwd: new URL("../..", import.meta.url),
        encoding: "utf8",
        env: buildWorkerEnv(process.env),
        timeout: 10_000,
      }
    );
    assert.notEqual(result.status, 0);
    assert.equal(fs.existsSync(snapshot), false);
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});

test("JON-562 standalone analyzer deletes raw input when size validation fails", () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-JON-562-analyzer-size-"));
  const snapshot = path.join(outputDir, "post-gc.heapsnapshot");
  fs.writeFileSync(snapshot, "synthetic raw snapshot");
  try {
    const result = spawnSync(
      process.execPath,
      [
        "--import",
        "tsx/esm",
        SCRIPT.pathname,
        "--analyze-snapshot",
        "--snapshot",
        snapshot,
        "--output-dir",
        outputDir,
        "--marker",
        "JON-562-invalid-size",
        "--minimum-self-size-bytes",
        "not-a-number",
      ],
      {
        cwd: new URL("../..", import.meta.url),
        encoding: "utf8",
        env: buildWorkerEnv(process.env),
        timeout: 10_000,
      }
    );
    assert.notEqual(result.status, 0);
    assert.equal(fs.existsSync(snapshot), false);
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});

test(
  "JON-562 real /v1/messages path rejects context-sized post-GC retention",
  // Measured ~4m12s end-to-end (2 iterations @ 100k tokens, including tsx/esm transpile of
  // the full handler chain, allocation sampling and a post-GC heap snapshot) on an idle
  // 16-core/54GB box — 90s/85s left no margin and made the driver's SIGTERM-on-timeout show
  // up as `driver failed: null !== 0`, indistinguishable from a real hang.
  { timeout: 360_000 },
  () => {
    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-JON-562-canary-"));
    try {
      const result = spawnSync(
        process.execPath,
        [
          "--expose-gc",
          "--import",
          "tsx/esm",
          SCRIPT.pathname,
          "--tokens",
          "100000",
          "--iterations",
          "2",
          "--output-dir",
          outputDir,
        ],
        {
          cwd: new URL("../..", import.meta.url),
          encoding: "utf8",
          env: buildWorkerEnv(process.env),
          timeout: 340_000,
        }
      );

      assert.equal(result.status, 0, `driver failed:\n${result.stdout}\n${result.stderr}`);
      const manifest = JSON.parse(
        fs.readFileSync(path.join(outputDir, "workload-manifest.json"), "utf8")
      );
      const caseDir = path.join(outputDir, "context-100000");
      const rows = fs
        .readFileSync(path.join(caseDir, "memory.jsonl"), "utf8")
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line));

      assert.equal(manifest.ticket, "JON-562");
      const profileCase = manifest.cases[0];
      assert.equal(profileCase.route, "/v1/messages");
      assert.equal(
        profileCase.providerCalls,
        4,
        "one warmup, one allocation probe and two unprofiled measured calls"
      );
      assert.equal(profileCase.allocationSampling.requestCount, 1);
      assert.equal(profileCase.retentionSeries.allocationSamplingEnabled, false);
      assert.equal(profileCase.conditions.concurrency, 1);
      assert.equal(profileCase.conditions.cancellation, "none");
      assert.equal(profileCase.conditions.stream, true);
      assert.ok(rows.some((row) => row.phase === "after_route"));
      assert.ok(rows.some((row) => row.phase === "settled"));
      for (const row of rows.filter((entry) => entry.phase === "settled")) {
        assert.equal(row.admission.activeHeavy, 0);
        assert.equal(row.admission.activeHealthyHeadroom, 0);
        assert.equal(row.admission.inflightBytes, 0);
        assert.equal(row.admission.waiting, 0);
      }
      const retaining = JSON.parse(
        fs.readFileSync(path.join(caseDir, "retainers.redacted.json"), "utf8")
      );
      assert.equal(
        retaining.largeBackingRetained,
        false,
        "the real production route must fail if a context-sized backing string survives forced GC"
      );
      assert.equal(fs.existsSync(path.join(caseDir, "post-gc.heapsnapshot")), false);
      assert.ok(fs.statSync(path.join(caseDir, "allocation.heapprofile")).size > 0);
    } finally {
      fs.rmSync(outputDir, { recursive: true, force: true });
    }
  }
);
