// #14528: the standalone proxy in server.cjs wrote SSE chunks without
// checking res.write()'s return value, so a slow client grew the socket write
// queue without bound. The write must wait for drain, and a close/error during
// that wait must release the loop without leaking listeners.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { EventEmitter } from "node:events";
import { Writable } from "node:stream";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { writeWithBackpressure } = require("../../src/mitm/_internal/writeBackpressure.cjs");

const here = path.dirname(fileURLToPath(import.meta.url));

type FakeRes = EventEmitter & { writes: string[]; writeResult: boolean; write(c: string): boolean };

function fakeRes(writeResult: boolean): FakeRes {
  const res = new EventEmitter() as FakeRes;
  res.writes = [];
  res.writeResult = writeResult;
  res.write = (chunk: string) => {
    res.writes.push(chunk);
    return res.writeResult;
  };
  return res;
}

function listenerTotal(res: EventEmitter) {
  return res.listenerCount("drain") + res.listenerCount("close") + res.listenerCount("error");
}

async function isSettled(p: Promise<unknown>) {
  let settled = false;
  p.then(() => (settled = true));
  await new Promise((r) => setImmediate(r));
  return settled;
}

test("resolves immediately without listeners when the write is accepted (#14528)", async () => {
  const res = fakeRes(true);
  const p = writeWithBackpressure(res, "data: a\n\n");
  assert.deepEqual(res.writes, ["data: a\n\n"]);
  assert.equal(listenerTotal(res), 0);
  assert.equal(await isSettled(p), true);
});

for (const event of ["drain", "close", "error"] as const) {
  test(`waits on backpressure until "${event}", then removes every listener (#14528)`, async () => {
    const res = fakeRes(false);
    const p = writeWithBackpressure(res, "data: b\n\n");
    assert.deepEqual(res.writes, ["data: b\n\n"]);
    assert.equal(await isSettled(p), false, "must not resolve while the socket is full");
    assert.equal(res.listenerCount("drain"), 1);
    assert.equal(res.listenerCount("close"), 1);
    assert.equal(res.listenerCount("error"), 1);

    if (event === "error") res.emit("error", new Error("socket reset"));
    else res.emit(event);

    assert.equal(await isSettled(p), true, `must resolve on ${event}`);
    assert.equal(listenerTotal(res), 0, "no drain/close/error listener may leak");
  });
}

test("a write loop against a slow client keeps the queue bounded (#14528)", async () => {
  const highWaterMark = 64;
  const chunk = "x".repeat(32);
  let maxQueued = 0;
  const slow = new Writable({
    highWaterMark,
    write(_c, _enc, cb) {
      setTimeout(cb, 1);
    },
  });
  for (let i = 0; i < 50; i++) {
    await writeWithBackpressure(slow, chunk);
    maxQueued = Math.max(maxQueued, slow.writableLength);
  }
  assert.ok(
    maxQueued <= highWaterMark + chunk.length,
    `queue grew to ${maxQueued} bytes (bound ${highWaterMark + chunk.length})`
  );
  assert.equal(listenerTotal(slow), 0);
  slow.destroy();
});

test("server.cjs SSE loop goes through writeWithBackpressure (#14528)", () => {
  const src = fs.readFileSync(path.resolve(here, "../../src/mitm/server.cjs"), "utf8");
  assert.match(src, /require\("\.\/_internal\/writeBackpressure\.cjs"\)/);
  assert.match(src, /await\s+writeBackpressureShim\.writeWithBackpressure\(res,\s*text\)/);
  assert.doesNotMatch(src, /^\s*res\.write\(text\);/m, "no unchecked res.write(text) may remain");
});
