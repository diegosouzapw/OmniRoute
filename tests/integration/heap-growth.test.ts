import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DB setup required by createSSEStream (via trackPendingRequest / appendRequestLog)
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-heap-growth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

const HAS_GC = typeof (globalThis as { gc?: () => void }).gc === "function";
const enc = new TextEncoder();

function sseChunks(n: number): Uint8Array[] {
  const parts: Uint8Array[] = [];
  for (let i = 0; i < n; i++) {
    parts.push(
      enc.encode(
        `data: {"id":"chatcmpl","object":"chat.completion.chunk","created":1,"model":"gpt-4o","choices":[{"delta":{"content":"x"},"index":0}]}\n\n`
      )
    );
  }
  parts.push(enc.encode(`data: [DONE]\n\n`));
  return parts;
}

async function runOneStream(i: number): Promise<void> {
  const ts = createSSEStream({
    mode: "passthrough",
    clientResponseFormat: "openai",
    connectionId: `heap-${i}`,
  }) as TransformStream<Uint8Array, Uint8Array>;
  const writer = ts.writable.getWriter();
  const reader = ts.readable.getReader();
  const chunks = sseChunks(10);
  const pump = (async () => {
    for (const c of chunks) await writer.write(c);
    await writer.close();
  })();
  for (;;) {
    const { done } = await reader.read();
    if (done) break;
  }
  await pump;
}

async function gcSettle(): Promise<void> {
  const gc = (globalThis as { gc?: () => void }).gc!;
  gc();
  await new Promise((r) => setTimeout(r, 50));
  gc();
}

test("SSE pipeline does not leak heap across 500 streams", { skip: !HAS_GC }, async () => {
  for (let i = 0; i < 50; i++) await runOneStream(i); // warmup
  await gcSettle();
  const baseline = process.memoryUsage().heapUsed;

  for (let i = 0; i < 500; i++) await runOneStream(i);
  await gcSettle();
  const after = process.memoryUsage().heapUsed;

  const growthMB = (after - baseline) / 1024 / 1024;
  console.log(`[heap] growth=${growthMB.toFixed(2)}MB after 500 streams`);
  // Ceiling is 20MB — goal is detecting linear growth (leaks), not noise.
  // If growth is stably near this boundary, raise to 30MB with justification.
  assert.ok(growthMB < 20, `heap grew ${growthMB.toFixed(1)}MB after 500 streams (ceiling 20MB)`);
});
