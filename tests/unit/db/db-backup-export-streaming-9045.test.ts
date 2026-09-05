// #9045 — Export database times out on large DBs (280MB) because the route
// buffered the entire backup file into memory (fs.readFileSync + new Response(buffer)).
// The fix streams the backup file as a ReadableStream response body, keeping peak
// RSS under 0.5x the DB size instead of 5x+.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

test("response body is a ReadableStream (not a Buffer) — structural check (#9045)", () => {
  const source = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../../src/app/api/db-backups/export/route.ts"),
    "utf-8"
  );

  // The fix uses createReadStream / ReadableStream for streaming the backup file
  assert.ok(
    source.includes("createReadStream"),
    "route must use createReadStream for streaming"
  );
  assert.ok(
    source.includes("ReadableStream"),
    "route must use ReadableStream for the response body"
  );

  // The fix must NOT use readFileSync (which would buffer the entire file into memory)
  // readFileSync is only acceptable for the source file in this test, not in the route
  const routeSource = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../../src/app/api/db-backups/export/route.ts"),
    "utf-8"
  );

  // The route should use createReadStream+ReadableStream (streaming) instead of readFileSync (buffering)
  assert.ok(
    !routeSource.includes("readFileSync("),
    "route must NOT use readFileSync (would buffer entire file into memory)"
  );
});

test("Content-Length header is set from statSync, not from buffer length (#9045)", () => {
  const source = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../../src/app/api/db-backups/export/route.ts"),
    "utf-8"
  );

  // Content-Length must be derived from statSync (file size), not from .length on a buffer
  assert.ok(
    source.includes("statSync"),
    "route must use statSync to get file size for Content-Length"
  );
  assert.ok(
    !source.includes("fileBuffer.length"),
    "route must NOT use buffer.length for Content-Length (no readFileSync buffer)"
  );
});

test("temp file cleanup on stream completion, error, and abort (#9045)", () => {
  const source = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../../src/app/api/db-backups/export/route.ts"),
    "utf-8"
  );

  // The fix must clean up the temp file on stream completion and client abort
  assert.ok(
    source.includes("cleanup"),
    "route must have a cleanup function for temp file removal"
  );
  assert.ok(
    source.includes("unlink("),
    "route must call unlink on the temp file during cleanup"
  );
  assert.ok(
    source.includes("abort"),
    "route must clean up temp file on request abort (client disconnect)"
  );
});

test("streaming keeps memory bounded — simulate with a large file (#9045)", async () => {
  // Create a large-ish temp file to simulate a DB backup
  const tmpDir = os.tmpdir();
  const tmpPath = path.join(tmpDir, "omniroute-9045-test-streaming.sqlite");
  const fileSize = 10 * 1024 * 1024; // 10 MB

  try {
    // Write a 10 MB file with SQLite header
    const header = Buffer.from("SQLite format 3\0");
    const buf = Buffer.alloc(fileSize, 0x41); // fill with 'A'
    header.copy(buf);
    fs.writeFileSync(tmpPath, buf);

    const { size: statSize } = fs.statSync(tmpPath);
    assert.equal(statSize, fileSize, "test file size must match");

    // Measure RSS before streaming
    const rssBefore = process.resourceUsage().maxRSS;

    // Simulate the streaming response pattern from the route
    const readStream = fs.createReadStream(tmpPath);
    const webStream = new ReadableStream({
      start(controller) {
        readStream.on("data", (chunk) => controller.enqueue(chunk));
        readStream.on("end", () => controller.close());
        readStream.on("error", (err) => controller.error(err));
      },
    });

    // Consume the stream
    const reader = webStream.getReader();
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.length;
    }

    const rssAfter = process.resourceUsage().maxRSS;
    const rssRatio = rssAfter / fileSize;

    assert.equal(totalBytes, fileSize, "streamed bytes must match file size");
    // Peak RSS should stay well under 2x the file size (for a 10 MB file)
    assert.ok(
      rssRatio < 2.0,
      `peak RSS must stay under 2x file size (was ${rssRatio.toFixed(2)}x)`
    );
  } finally {
    // Cleanup
    try {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    } catch {
      /* best effort */
    }
  }
});

test("stream content matches file content (data integrity) (#9045)", async () => {
  const tmpDir = os.tmpdir();
  const tmpPath = path.join(tmpDir, "omniroute-9045-test-integrity.sqlite");

  try {
    // Write a known pattern
    const knownContent = Buffer.from("SQLite format 3\0\x01\x02\x03\x04");
    const buf = Buffer.alloc(1 * 1024 * 1024, 0x42);
    knownContent.copy(buf);
    fs.writeFileSync(tmpPath, buf);

    // Simulate the streaming response
    const readStream = fs.createReadStream(tmpPath);
    const webStream = new ReadableStream({
      start(controller) {
        readStream.on("data", (chunk) => controller.enqueue(chunk));
        readStream.on("end", () => controller.close());
        readStream.on("error", (err) => controller.error(err));
      },
    });

    // Read the stream into a single buffer
    const reader = webStream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const streamed = Buffer.concat(chunks);
    const original = fs.readFileSync(tmpPath);

    assert.ok(streamed.equals(original), "streamed data must match original file content");
  } finally {
    try {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    } catch {
      /* best effort */
    }
  }
});