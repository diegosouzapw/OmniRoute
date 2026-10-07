import test from "node:test";
import assert from "node:assert/strict";
import {
  parseCpaTraceAuthIndex,
  readCpaAuthIndex,
  rememberCpaAuthIndex,
} from "../../open-sse/handlers/chatCore/cpaTraceAuthIndex.ts";
import { labelForCliproxyAuthIndex } from "../../src/lib/services/cliproxyAccountHealth.ts";
import type { CliproxyAccountHealth } from "../../src/lib/services/cliproxyAccountHealth.ts";

test("parseCpaTraceAuthIndex keeps an opaque auth index", () => {
  assert.equal(parseCpaTraceAuthIndex("acct-1"), "acct-1");
  assert.equal(parseCpaTraceAuthIndex("  42  "), "42");
  assert.equal(parseCpaTraceAuthIndex('{"auth_index":"file-7"}'), "file-7");
  assert.equal(parseCpaTraceAuthIndex("auth_index=node-3"), "node-3");
});

test("parseCpaTraceAuthIndex drops missing, secret, and unknown shapes", () => {
  assert.equal(parseCpaTraceAuthIndex(null), null);
  assert.equal(parseCpaTraceAuthIndex(""), null);
  assert.equal(parseCpaTraceAuthIndex("user@example.com"), null);
  assert.equal(parseCpaTraceAuthIndex("/home/me/.cli/auth.json"), null);
  assert.equal(parseCpaTraceAuthIndex("Bearer secret-token"), null);
  assert.equal(parseCpaTraceAuthIndex("{not json"), null);
  assert.equal(parseCpaTraceAuthIndex('{"other":"acct-1"}'), null);
});

test("rememberCpaAuthIndex survives a header rebuild and the latest response wins", () => {
  const first = new Response(null, { headers: { "X-CPA-TRACE-ID": "first-index" } });
  rememberCpaAuthIndex(first);
  const rebuilt = new Response(null, { headers: first.headers });
  assert.equal(readCpaAuthIndex(rebuilt), "first-index");

  const second = new Response(null, { headers: { "x-cpa-trace-id": "second-index" } });
  rememberCpaAuthIndex(second);
  assert.equal(readCpaAuthIndex(second), "second-index");
  assert.equal(readCpaAuthIndex(new Response(null)), null);
});

test("labelForCliproxyAuthIndex joins the sanitized label and hides emails", () => {
  const accounts = [
    { authIndex: "acct-1", label: "work" },
    { authIndex: "acct-2", label: "person@example.com" },
    { authIndex: "acct-3", label: "C:\\keys\\auth.json" },
  ] as CliproxyAccountHealth[];
  assert.equal(labelForCliproxyAuthIndex("acct-1", accounts), "work");
  assert.equal(labelForCliproxyAuthIndex("acct-2", accounts), null);
  assert.equal(labelForCliproxyAuthIndex("acct-3", accounts), null);
  assert.equal(labelForCliproxyAuthIndex("missing", accounts), null);
});
