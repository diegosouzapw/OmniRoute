/**
 * TDD for RTK learn/discover sample source (F2.1).
 *
 * The pure miners discoverRepeatedNoise()/suggestFilter() already exist and consume
 * CommandSample[] ({ command, output }). What was missing is the SAMPLE SOURCE: an
 * adapter over the opt-in rtk raw-output store (DATA_DIR/rtk/raw-output/*.log).
 *
 * This also covers the capture enhancement: maybePersistRtkRawOutput now writes a
 * sidecar <base>.meta.json carrying the FULL command (the .log filename only had a
 * lossy slug), so listRtkCommandSamples() recovers the exact command — falling back
 * to the filename slug for legacy .log files written before the sidecar existed.
 *
 * Run: node --import tsx/esm --test tests/unit/compression/rtk-command-samples.test.ts
 */
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  maybePersistRtkRawOutput,
  listRtkCommandSamples,
} from "../../../open-sse/services/compression/engines/rtk/rawOutput.ts";

let tmp: string;
let prevDataDir: string | undefined;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rtk-samples-"));
  prevDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tmp;
});

afterEach(() => {
  if (prevDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = prevDataDir;
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe("maybePersistRtkRawOutput — command sidecar", () => {
  it("writes a <base>.meta.json sidecar carrying the full command alongside the .log", () => {
    const ptr = maybePersistRtkRawOutput("error: boom\nline2\n", {
      retention: "always",
      command: "npm run build --workspace=@scope/pkg",
    });
    assert.ok(ptr, "pointer returned");
    const sidecar = ptr!.path.replace(/\.log$/, ".meta.json");
    assert.ok(fs.existsSync(sidecar), "sidecar meta file written");
    const meta = JSON.parse(fs.readFileSync(sidecar, "utf8"));
    assert.equal(meta.command, "npm run build --workspace=@scope/pkg", "full command preserved");
    assert.equal(typeof meta.timestamp, "number");
  });

  it("still writes the .log with pure output (sidecar does not pollute it)", () => {
    const ptr = maybePersistRtkRawOutput("just output\n", {
      retention: "always",
      command: "ls -la",
    });
    assert.ok(ptr);
    assert.equal(fs.readFileSync(ptr!.path, "utf8"), "just output\n");
  });

  it("does not write a sidecar when nothing is persisted (retention never)", () => {
    const ptr = maybePersistRtkRawOutput("x", { retention: "never", command: "git status" });
    assert.equal(ptr, null);
    const dir = path.join(tmp, "rtk", "raw-output");
    assert.ok(!fs.existsSync(dir) || fs.readdirSync(dir).length === 0);
  });
});

describe("listRtkCommandSamples", () => {
  it("returns [] when the store dir does not exist", () => {
    assert.deepEqual(listRtkCommandSamples(), []);
  });

  it("recovers the exact command from the sidecar + output from the .log", () => {
    maybePersistRtkRawOutput("Compiling...\nDone in 3s\n", {
      retention: "always",
      command: "cargo build --release",
    });
    const samples = listRtkCommandSamples();
    assert.equal(samples.length, 1);
    assert.equal(samples[0].command, "cargo build --release");
    assert.match(samples[0].output, /Compiling/);
  });

  it("falls back to the filename slug for legacy .log files with no sidecar", () => {
    // Simulate a legacy capture: write a .log directly, no sidecar.
    const dir = path.join(tmp, "rtk", "raw-output");
    fs.mkdirSync(dir, { recursive: true });
    // Real captures use a 24-hex-char id (safeId().slice(0,24)).
    fs.writeFileSync(
      path.join(dir, "1700000000000-git_status-abc123def456abc123def456.log"),
      "nothing to commit\n"
    );
    const samples = listRtkCommandSamples();
    assert.equal(samples.length, 1);
    assert.equal(samples[0].command, "git status", "slug underscores → spaces");
    assert.match(samples[0].output, /nothing to commit/);
  });

  it("honours a limit and returns the most recent samples first", () => {
    for (let i = 0; i < 5; i++) {
      maybePersistRtkRawOutput(`output ${i}\n`, {
        retention: "always",
        command: `cmd-${i}`,
      });
    }
    const limited = listRtkCommandSamples({ limit: 2 });
    assert.equal(limited.length, 2);
  });

  it("skips empty/unreadable entries without throwing", () => {
    const dir = path.join(tmp, "rtk", "raw-output");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "1700000000001-empty-xyz.log"), "");
    const samples = listRtkCommandSamples();
    assert.equal(samples.length, 0, "empty output is not a usable sample");
  });
});
