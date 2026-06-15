import test from "node:test";
import assert from "node:assert/strict";
import { fakeUpstreamStream } from "../../helpers/fakeUpstreamStream.ts";

test("fakeUpstreamStream emits pushed chunks then closes", async () => {
  const { stream, push, close } = fakeUpstreamStream();
  push("a");
  push("b");
  close();
  const reader = stream.getReader();
  const dec = new TextDecoder();
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += dec.decode(value);
  }
  assert.equal(out, "ab");
});

test("fakeUpstreamStream signals cancel when consumer aborts", async () => {
  const { stream, onCancel } = fakeUpstreamStream();
  let cancelled = false;
  onCancel(() => {
    cancelled = true;
  });
  const reader = stream.getReader();
  await reader.cancel("client-abort");
  assert.equal(cancelled, true);
});

test("fakeUpstreamStream propagates error to reader", async () => {
  const { stream, error } = fakeUpstreamStream();
  error(new Error("upstream boom"));
  const reader = stream.getReader();
  await assert.rejects(async () => {
    await reader.read();
  }, /upstream boom/);
});
