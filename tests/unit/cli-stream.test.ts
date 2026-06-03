import test from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { mkdtempSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function makeSseStream(lines: string[]) {
  const body = lines.join("\n") + "\n";
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function mockStreamFetch(chunks: string[], status = 200) {
  const sseLines = chunks.map((c) => `data: ${c}`);
  sseLines.push("data: [DONE]");
  return () => Promise.resolve(makeSseStream(sseLines));
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (chunk: string | Uint8Array) => {
    chunks.push(typeof chunk === "string" ? chunk : chunk.toString());
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

async function captureStderr(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stderr.write.bind(process.stderr);
  process.stderr.write = (chunk: string | Uint8Array) => {
    chunks.push(typeof chunk === "string" ? chunk : chunk.toString());
    return true;
  };
  try {
    await fn();
  } finally {
    process.stderr.write = orig;
  }
  return chunks.join("");
}

const DELTA1 = JSON.stringify({ choices: [{ delta: { content: "Hello" } }] });
const DELTA2 = JSON.stringify({ choices: [{ delta: { content: " world" } }] });

test("runStreamCommand imprime deltas no stdout", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockStreamFetch([DELTA1, DELTA2]) as any;

  const { runStreamCommand } = await import("../../bin/cli/commands/stream.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "text", quiet: true }) };
  const out = await captureStdout(() => runStreamCommand("hi", { model: "auto" }, cmd as any));

  globalThis.fetch = origFetch;
  assert.ok(out.includes("Hello"));
  assert.ok(out.includes("world"));
});

test("runStreamCommand --raw imprime linhas SSE brutas", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockStreamFetch([DELTA1]) as any;

  const { runStreamCommand } = await import("../../bin/cli/commands/stream.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "text", quiet: true }) };
  const out = await captureStdout(() =>
    runStreamCommand("hi", { model: "auto", raw: true }, cmd as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(out.includes("data:"));
});

test("runStreamCommand --output json retorna chunks e métricas", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockStreamFetch([DELTA1, DELTA2]) as any;

  const { runStreamCommand } = await import("../../bin/cli/commands/stream.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const out = await captureStdout(() => runStreamCommand("hi", { model: "auto" }, cmd as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed.chunks));
  assert.equal(parsed.chunks.length, 2);
  assert.ok(parsed.content.includes("Hello"));
  assert.ok(typeof parsed.metrics.totalMs === "number");
});

test("runStreamCommand --save grava eventos em arquivo", async () => {
  const tmpDir = mkdtempSync(join(tmpdir(), "stream-test-"));
  const savePath = join(tmpDir, "events.jsonl");
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockStreamFetch([DELTA1, DELTA2]) as any;

  const { runStreamCommand } = await import("../../bin/cli/commands/stream.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "text", quiet: true }) };
  await captureStdout(() => runStreamCommand("hi", { model: "auto", save: savePath }, cmd as any));

  globalThis.fetch = origFetch;
  assert.ok(existsSync(savePath));
  const lines = readFileSync(savePath, "utf8").trim().split("\n");
  assert.equal(lines.length, 2);
  assert.ok(JSON.parse(lines[0]).choices);
});

test("runStreamCommand --debug imprime timing no stderr", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockStreamFetch([DELTA1]) as any;

  const { runStreamCommand } = await import("../../bin/cli/commands/stream.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "text", quiet: true }) };
  const err = await captureStderr(() =>
    captureStdout(() => runStreamCommand("hi", { model: "auto", debug: true }, cmd as any))
  );

  globalThis.fetch = origFetch;
  assert.ok(err.includes("[+"));
});

test("runStreamCommand usa /v1/responses com --responses-api", async () => {
  const respDelta = JSON.stringify({ delta: "Hi there" });
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, init: any) => {
    capturedUrl = url;
    return Promise.resolve(makeSseStream([`data: ${respDelta}`, "data: [DONE]"]));
  }) as any;

  const { runStreamCommand } = await import("../../bin/cli/commands/stream.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "text", quiet: true }) };
  const out = await captureStdout(() =>
    runStreamCommand("hi", { model: "auto", responsesApi: true }, cmd as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/v1/responses"));
  assert.ok(out.includes("Hi there"));
});
