import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, mkdtempSync, rmSync, statSync, openSync, readSync, closeSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { captureHeapSnapshot } from "../../scripts/sre/capture-heap-snapshot.mjs";

// ─── 1. captureHeapSnapshot basics ──────────────────────────────────────────

test("captureHeapSnapshot: writes a file at the requested path", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "omniroute-heap-"));
  try {
    const meta = captureHeapSnapshot(dir);
    assert.ok(existsSync(meta.path), "snapshot file exists on disk");
    assert.ok(meta.sizeBytes > 0, "snapshot file is non-empty");
    assert.ok(meta.path.endsWith(".heapsnapshot"), "filename uses .heapsnapshot extension");
    assert.match(meta.path, new RegExp(`^${escapeRegExp(dir)}`));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("captureHeapSnapshot: label suffix is included in the filename", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "omniroute-heap-"));
  try {
    const meta = captureHeapSnapshot(dir, "incident-12345");
    assert.match(path.basename(meta.path), /-incident-12345-/);
    assert.equal(meta.label, "incident-12345");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("captureHeapSnapshot: label with unsafe chars is sanitized", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "omniroute-heap-"));
  try {
    const meta = captureHeapSnapshot(dir, "../../etc/passwd 🚨 test");
    // The path is still inside `dir` (no traversal).
    assert.match(meta.path, new RegExp(`^${escapeRegExp(dir)}`));
    // The unsafe chars in the filename were replaced.
    assert.ok(!meta.path.includes(".."), "no path traversal in filename");
    assert.ok(!meta.path.includes("/etc/"), "no /etc/ in filename");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ─── 2. Header / format validation ──────────────────────────────────────────

test("captureHeapSnapshot: file starts with the valid V8 heap snapshot header", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "omniroute-heap-"));
  try {
    const meta = captureHeapSnapshot(dir);
    // V8 heap snapshots begin with the literal header:
    //   {"snapshot":{...,"nodejs":{...
    // The first 64 bytes must be parseable JSON.
    const fd = openSync(meta.path, "r");
    try {
      const buf = Buffer.alloc(128);
      const bytesRead = readSync(fd, buf, 0, 128, 0);
      const head = buf.subarray(0, bytesRead).toString("utf8");
      assert.ok(head.startsWith("{"), "first byte is '{'");
      assert.ok(head.includes('"snapshot"'), 'header contains "snapshot" key');
      assert.ok(head.includes('"meta_data"'), 'header contains "meta_data" key');
      // It must be valid JSON for the portion we read.
      const trimmed = head.slice(0, head.indexOf("}") + 1);
      // JSON.parse on a partial object would fail; we just confirm the
      // open-brace count makes sense.
      assert.ok((head.match(/\{/g) ?? []).length >= 2, "at least 2 '{' in first 128 bytes");
    } finally {
      closeSync(fd);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("captureHeapSnapshot: file size matches metadata", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "omniroute-heap-"));
  try {
    const meta = captureHeapSnapshot(dir);
    const stat = statSync(meta.path);
    assert.equal(meta.sizeBytes, stat.size);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ─── 3. Metadata accuracy ───────────────────────────────────────────────────

test("captureHeapSnapshot: heap stats are populated and consistent", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "omniroute-heap-"));
  try {
    const meta = captureHeapSnapshot(dir);
    assert.ok(meta.heapUsedMb > 0, "heapUsedMb is positive");
    assert.ok(meta.heapTotalMb >= meta.heapUsedMb, "heapTotalMb >= heapUsedMb");
    assert.ok(meta.heapSizeLimitMb >= meta.heapTotalMb, "heapSizeLimitMb >= heapTotalMb");
    assert.match(meta.nodeVersion, /^v\d+\.\d+\.\d+/, "nodeVersion is vX.Y.Z");
    assert.match(meta.capturedAt, /^\d{4}-\d{2}-\d{2}T/, "capturedAt is ISO-8601");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ─── 4. Output directory handling ───────────────────────────────────────────

test("captureHeapSnapshot: creates the output directory if missing", () => {
  const parent = mkdtempSync(path.join(tmpdir(), "omniroute-heap-parent-"));
  try {
    const nested = path.join(parent, "nested", "heap");
    assert.equal(existsSync(nested), false, "nested dir does not exist yet");
    const meta = captureHeapSnapshot(nested);
    assert.ok(existsSync(nested), "nested dir was created");
    assert.ok(existsSync(meta.path), "snapshot file is inside the new dir");
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
});

test("captureHeapSnapshot: throws on missing outputDir", () => {
  assert.throws(() => captureHeapSnapshot(""), /outputDir is required/);
});

// ─── 5. Two-snapshot uniqueness ─────────────────────────────────────────────

test("captureHeapSnapshot: two consecutive captures produce different files", async () => {
  const dir = mkdtempSync(path.join(tmpdir(), "omniroute-heap-"));
  try {
    const a = captureHeapSnapshot(dir);
    // Sleep ~5ms so the timestamp suffix differs (the formatter includes ms).
    await new Promise((r) => setTimeout(r, 5));
    const b = captureHeapSnapshot(dir);
    assert.notEqual(a.path, b.path, "two captures yield two distinct files");
    assert.ok(existsSync(a.path));
    assert.ok(existsSync(b.path));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ─── 6. Snapshot contains a `node` section (heap-snapshot format) ───────────

test("captureHeapSnapshot: snapshot contains a top-level node_types array", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "omniroute-heap-"));
  try {
    const meta = captureHeapSnapshot(dir);
    const content = readFileSync(meta.path, "utf8");
    // Heap snapshots have a `node_types` array near the top. Just confirm
    // the structural markers are present.
    assert.match(content, /"node_types":/);
    assert.match(content, /"edge_types":/);
    assert.match(content, /"trace_function_info_flags":/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ─── helpers ────────────────────────────────────────────────────────────────

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}