// #14528: pipeSSE honors socket backpressure; server.cjs capture can't
// overshoot INGEST_MAX_BODY by one chunk.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import type { ServerResponse } from "node:http";
import { Readable } from "node:stream";
import { MitmHandlerBase } from "../../src/mitm/handlers/base.ts";
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

function chunkedUpstream(chunks: string[]): Response {
  const iterable = (async function* () {
    for (const c of chunks) yield Buffer.from(c);
  })();
  const stream = Readable.toWeb(Readable.from(iterable)) as unknown as ReadableStream<Uint8Array>;
  return new Response(stream, { status: 200 });
}

// Fake res with controllable write() backpressure. `mode: "oneshot"` pressures
// the first chunk only (drain next tick); `mode: "sticky"` pressures every
// write and drains after `drainDelayMs` — lets a test close the downstream
// mid-wait and prove the waiter resolves instead of hanging.
// NOTE: real-timer delays are deliberate — this exercises genuine async pipe
// behavior (drain/close races) that fake timers cannot reproduce.
function backpressureRes(opts: { mode?: "oneshot" | "sticky"; drainDelayMs?: number } = {}) {
  const mode = opts.mode ?? "oneshot";
  const drainDelayMs = opts.drainDelayMs ?? 0;
  const listeners = new Map<string, Set<(...a: unknown[]) => void>>();
  const written: string[] = [];
  let drainWaits = 0;
  let writeCalls = 0;
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
      listeners.get(event)?.delete(fn);
      return res;
    },
    listenerCount(event: string) {
      return listeners.get(event)?.size ?? 0;
    },
    emitDrain() {
      for (const fn of [...(listeners.get("drain") ?? [])]) fn();
    },
    emitClose() {
      (res as { closed: boolean }).closed = true;
      for (const fn of [...(listeners.get("close") ?? [])]) fn();
    },
    writeHead() {
      (res as { headersSent: boolean }).headersSent = true;
    },
    write(c: Buffer | string) {
      writeCalls += 1;
      written.push(typeof c === "string" ? c : c.toString());
      const pressured = mode === "sticky" || writeCalls === 1;
      if (pressured) {
        drainWaits += 1;
        setTimeout(() => (res as unknown as { emitDrain: () => void }).emitDrain(), drainDelayMs);
        return false;
      }
      return true;
    },
    end() {},
  } as unknown as ServerResponse & { listenerCount: (e: string) => number };
  const stats = () => ({ drainWaits, writeCalls });
  return { res, written, stats };
}

test("pipeSSE waits for drain on backpressure and delivers everything", async () => {
  const h = new ExposedHandler();
  const t = backpressureRes();
  await h.pipe(chunkedUpstream(["aaa", "bbb", "ccc"]), t.res);
  assert.equal(t.written.join(""), "aaabbbccc");
  assert.equal(t.stats().drainWaits, 1);
  assert.equal(t.res.listenerCount("drain"), 0, "drain listener must be removed");
  assert.equal(t.res.listenerCount("close"), 0, "close listeners must be removed");
});

test("pipeSSE close during drain-wait breaks the pipe without hanging", async () => {
  const h = new ExposedHandler();
  // Sticky backpressure with a drain delay longer than the close delay, so the
  // downstream is guaranteed to close while the pipe waits for drain.
  const t = backpressureRes({ mode: "sticky", drainDelayMs: 500 });
  const many = Array.from({ length: 1000 }, (_, i) => `c${i};`);
  const pipe = h.pipe(chunkedUpstream(many), t.res);
  await new Promise((r) => setTimeout(r, 25));
  (t.res as unknown as { emitClose: () => void }).emitClose();
  await Promise.race([
    pipe,
    new Promise((_, reject) => setTimeout(() => reject(new Error("pipe hung")), 2000)),
  ]);
  assert.ok(t.written.join("").length < many.join("").length, "must stop early after close");
});

test("server.cjs slices the capture append so one chunk can't overshoot the cap (#14528)", async () => {
  const here = path.dirname(url.fileURLToPath(import.meta.url));
  const src = fs.readFileSync(path.resolve(here, "../../src/mitm/server.cjs"), "utf8");
  assert.match(
    src,
    /respBody \+= text\.slice\(0, INGEST_MAX_BODY - respBody\.length\)/,
    "capture append must be sliced to the remaining budget"
  );
});
