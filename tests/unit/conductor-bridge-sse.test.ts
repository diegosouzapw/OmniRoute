import test from "node:test";
import assert from "node:assert/strict";

import { SseParser } from "../../src/lib/conductor/bridge.ts";

test("whole event in a single chunk", () => {
  const p = new SseParser();
  const out = p.push('id: 7\nevent: task.created\ndata: {"task_id":"t_1"}\n\n');
  assert.equal(out.length, 1);
  assert.deepEqual(out[0], { id: "7", event: "task.created", data: '{"task_id":"t_1"}' });
});

test("event fragmented across three chunks (cut mid-data)", () => {
  const p = new SseParser();
  assert.equal(p.push("id: 8\nevent: task.sch").length, 0);
  assert.equal(p.push('eduled\ndata: {"task_id"').length, 0);
  const out = p.push(':"t_2"}\n\n');
  assert.equal(out.length, 1);
  assert.deepEqual(out[0], { id: "8", event: "task.scheduled", data: '{"task_id":"t_2"}' });
});

test("two events in one chunk", () => {
  const p = new SseParser();
  const out = p.push("id: 1\nevent: a\ndata: x\n\nid: 2\nevent: b\ndata: y\n\n");
  assert.equal(out.length, 2);
  assert.equal(out[0].id, "1");
  assert.equal(out[1].data, "y");
});

test("comment pings are ignored", () => {
  const p = new SseParser();
  assert.equal(p.push(": ping\n\n").length, 0);
  const out = p.push(": ping\n\nid: 3\nevent: c\ndata: z\n\n");
  assert.equal(out.length, 1);
  assert.equal(out[0].id, "3");
});

test("multi-line data joins with newline (SSE spec)", () => {
  const p = new SseParser();
  const out = p.push("event: m\ndata: line1\ndata: line2\n\n");
  assert.equal(out.length, 1);
  assert.equal(out[0].data, "line1\nline2");
});
