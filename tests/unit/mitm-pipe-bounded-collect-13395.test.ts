// #13395: MITM pipe paths must not retain unbounded transcripts, and an
// abandoned downstream must stop the upstream read.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import type { ServerResponse } from "node:http";
import { Readable } from "node:stream";
import {
  MitmHandlerBase,
  createBoundedCollector,
  MITM_PIPE_MAX_COLLECT_BYTES,
} from "../../src/mitm/handlers/base.ts";
import type { AgentId } from "../../src/mitm/types.ts";

class ExposedHandler extends MitmHandlerBase {
  readonly agentId: AgentId = "antigravity";
  async intercept(): Promise<void> {
    throw new Error("not used");
  }
  pipe(
    upstream: Response,
    res: ServerResponse,
    onChunk?: (c: Buffer) => void
  ): Promise<void> {
    return this.pipeSSE(upstream, res, onChunk);
  }
}

function trackingRes() {
  const listeners = new Map<string, Set<(...a: unknown[]) => void>>();
  const written: string[] = [];
  let offCalls = 0;
  const res = {
    headersSent: false,
    closed: false,
    destroyed: false,
    once(event: string, fn: (...a: unknown[]) => void) {
      let s = listeners.get(event);
      if (!s) {
        s = new Set();
        listeners.set(event, s);
      }
      s.add(fn);
      return res;
    },
    off(event: string, fn: (...a: unknown[]) => void) {
      offCalls += 1;
      listeners.get(event)?.delete(fn);
      return res;
    },
    emitClose() {
      for (const fn of [...(listeners.get("close") ?? [])]) fn();
    },
    writeHead() {
      (res as { headersSent: boolean }).headersSent = true;
    },
    write(c: Buffer | string) {
      written.push(typeof c === "string" ? c : c.toString());
      return true;
    },
    end() {},
  } as unknown as ServerResponse;
  return { res, written, listeners, offCalls: () => offCalls };
}

function chunkedUpstream(chunks: string[], delayMs = 0): Response {
  const iterable = (async function* () {
    for (const c of chunks) {
      if (delayMs > 0) await new Promise((r) => setTimeout(r, delayMs));
      yield Buffer.from(c);
    }
  })();
  const stream = Readable.toWeb(Readable.from(iterable)) as unknown as ReadableStream<Uint8Array>;
  return new Response(stream, { status: 200 });
}

test("bounded collector retains at most the cap but counts the true total", () => {
  const sink = createBoundedCollector(100);
  sink.push("a".repeat(60));
  sink.push("b".repeat(60));
  assert.equal(sink.text.length, 100);
  assert.equal(sink.totalBytes, 120);
  assert.equal(sink.truncated, true);
});

test("bounded collector passes small transcripts through untouched", () => {
  const sink = createBoundedCollector(100);
  sink.push("hello");
  assert.equal(sink.text, "hello");
  assert.equal(sink.totalBytes, 5);
  assert.equal(sink.truncated, false);
});

test("default collect ceiling is 1 MiB", () => {
  assert.equal(MITM_PIPE_MAX_COLLECT_BYTES, 1 * 1024 * 1024);
});

test("pipeSSE delivers every chunk when the downstream stays open", async () => {
  const h = new ExposedHandler();
  const { res, written } = trackingRes();
  await h.pipe(chunkedUpstream(["x".repeat(10), "y".repeat(10), "z".repeat(10)]), res);
  assert.equal(written.join(""), "x".repeat(10) + "y".repeat(10) + "z".repeat(10));
});

test("pipeSSE stops the upstream read after downstream close", async () => {
  const h = new ExposedHandler();
  const { res, written } = trackingRes();
  const seen: string[] = [];
  const pipe = h.pipe(
    chunkedUpstream(Array.from({ length: 50 }, (_, i) => `c${i};`), 5),
    res,
    (c) => seen.push(c.toString())
  );
  // Let a few chunks flow, then abandon the downstream.
  await new Promise((r) => setTimeout(r, 25));
  (res as unknown as { emitClose: () => void }).emitClose();
  await pipe;
  const totalUpstream = Array.from({ length: 50 }, (_, i) => `c${i};`).join("");
  assert.ok(
    seen.join("").length < totalUpstream.length,
    `abandoned pipe must stop early (read ${seen.join("").length} of ${totalUpstream.length})`
  );
  assert.ok(written.join("").length <= seen.join("").length, "no writes after close");
});

test("pipeSSE detaches its close listener when the stream completes", async () => {
  const h = new ExposedHandler();
  const t = trackingRes();
  await h.pipe(chunkedUpstream(["done"]), t.res);
  assert.equal(t.listeners.get("close")?.size ?? 0, 0, "close listener must be removed");
  assert.ok(t.offCalls() >= 1, "off(close) must run");
});

test("server.cjs aborts the router fetch and cancels the reader on downstream close (#13395)", async () => {
  const here = path.dirname(url.fileURLToPath(import.meta.url));
  const src = fs.readFileSync(path.resolve(here, "../../src/mitm/server.cjs"), "utf8");
  assert.match(src, /new AbortController\(\)/, "must create an abort controller per intercept");
  assert.match(src, /signal:\s*upstreamAbort\.signal/, "router fetch must take the abort signal");
  assert.match(src, /res\.once\(\s*"close"/, "must listen for downstream close");
  assert.match(src, /reader\.cancel\(\)/, "must cancel the upstream reader on close");
});
