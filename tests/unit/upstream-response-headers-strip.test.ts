import { test } from "node:test";
import assert from "node:assert/strict";
import {
  stripStaleEncodingHeaders,
  filterUpstreamResponseHeaderEntries,
  STRIP_UPSTREAM_HEADER_NAMES,
} from "../../open-sse/utils/upstreamResponseHeaders.ts";

test("stripStaleEncodingHeaders: removes content-encoding/length/transfer-encoding (lowercase)", () => {
  const input = new Headers({
    "content-encoding": "gzip",
    "content-length": "1234",
    "transfer-encoding": "chunked",
    "content-type": "application/json",
    "x-request-id": "abc",
  });
  const out = stripStaleEncodingHeaders(input);
  assert.strictEqual(out.get("content-encoding"), null);
  assert.strictEqual(out.get("content-length"), null);
  assert.strictEqual(out.get("transfer-encoding"), null);
  assert.strictEqual(out.get("content-type"), "application/json");
  assert.strictEqual(out.get("x-request-id"), "abc");
});

test("stripStaleEncodingHeaders: removes mixed-case header names (case-insensitive)", () => {
  const input = new Headers({
    "Content-Encoding": "gzip",
    "Content-Length": "1234",
    "Transfer-Encoding": "chunked",
    "Content-Type": "text/plain",
  });
  const out = stripStaleEncodingHeaders(input);
  assert.strictEqual(out.get("content-encoding"), null);
  assert.strictEqual(out.get("content-length"), null);
  assert.strictEqual(out.get("transfer-encoding"), null);
  assert.strictEqual(out.get("content-type"), "text/plain");
});

test("stripStaleEncodingHeaders: does not mutate the input Headers", () => {
  const input = new Headers({
    "content-encoding": "gzip",
    "content-type": "application/json",
  });
  const out = stripStaleEncodingHeaders(input);
  assert.strictEqual(input.get("content-encoding"), "gzip");
  assert.strictEqual(out.get("content-encoding"), null);
});

test("stripStaleEncodingHeaders: empty input returns empty Headers", () => {
  const out = stripStaleEncodingHeaders(new Headers());
  // Iterate to confirm no entries.
  const entries: Array<[string, string]> = [];
  out.forEach((v, k) => entries.push([k, v]));
  assert.deepEqual(entries, []);
});

test("filterUpstreamResponseHeaderEntries: strips default header set", () => {
  const entries: Array<[string, string]> = [
    ["content-encoding", "gzip"],
    ["content-length", "1234"],
    ["transfer-encoding", "chunked"],
    ["content-type", "application/json"],
    ["x-request-id", "abc"],
  ];
  const out = filterUpstreamResponseHeaderEntries(entries);
  assert.deepEqual(out, [
    ["content-type", "application/json"],
    ["x-request-id", "abc"],
  ]);
});

test("filterUpstreamResponseHeaderEntries: extraToStrip is case-insensitive", () => {
  const entries: Array<[string, string]> = [
    ["Content-Type", "text/event-stream"],
    ["X-Request-Id", "abc"],
  ];
  const out = filterUpstreamResponseHeaderEntries(entries, ["CONTENT-TYPE"]);
  assert.deepEqual(out, [["X-Request-Id", "abc"]]);
});

test("filterUpstreamResponseHeaderEntries: empty extraToStrip preserves non-default headers", () => {
  const entries: Array<[string, string]> = [
    ["content-type", "application/json"],
    ["x-custom", "value"],
  ];
  const out = filterUpstreamResponseHeaderEntries(entries, []);
  assert.deepEqual(out, [
    ["content-type", "application/json"],
    ["x-custom", "value"],
  ]);
});

test("filterUpstreamResponseHeaderEntries: empty input returns empty array", () => {
  const out = filterUpstreamResponseHeaderEntries([]);
  assert.deepEqual(out, []);
});

test("filterUpstreamResponseHeaderEntries: handles mixed-case default header names", () => {
  const entries: Array<[string, string]> = [
    ["Content-Encoding", "gzip"],
    ["X-Custom", "v"],
  ];
  const out = filterUpstreamResponseHeaderEntries(entries);
  assert.deepEqual(out, [["X-Custom", "v"]]);
});

test("STRIP_UPSTREAM_HEADER_NAMES: contains expected three lowercase names", () => {
  assert.strictEqual(STRIP_UPSTREAM_HEADER_NAMES.size, 3);
  assert.ok(STRIP_UPSTREAM_HEADER_NAMES.has("content-encoding"));
  assert.ok(STRIP_UPSTREAM_HEADER_NAMES.has("content-length"));
  assert.ok(STRIP_UPSTREAM_HEADER_NAMES.has("transfer-encoding"));
});
