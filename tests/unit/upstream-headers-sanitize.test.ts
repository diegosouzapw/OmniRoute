import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeUpstreamHeadersMap } from "../../src/lib/db/models.ts";
import {
  isForbiddenUpstreamHeaderName,
  isForbiddenCustomHeaderName,
} from "../../src/shared/constants/upstreamHeaders.ts";

test("sanitizeUpstreamHeadersMap: drops hop-by-hop / Host names", () => {
  const out = sanitizeUpstreamHeadersMap({
    Host: "evil",
    Connection: "close",
    "Content-Length": "999",
    "X-Custom": "ok",
  });
  assert.deepEqual(out, { "X-Custom": "ok" });
});

test("sanitizeUpstreamHeadersMap: drops origin-IP forwarding headers (no origin IP leak upstream)", () => {
  const out = sanitizeUpstreamHeadersMap({
    "X-Custom": "kept",
    "X-Forwarded-For": "203.0.113.9",
    "X-Real-IP": "203.0.113.9",
    "CF-Connecting-IP": "203.0.113.9",
    Forwarded: "for=203.0.113.9",
    Via: "1.1 proxy",
    "True-Client-IP": "203.0.113.9",
    "X-Forwarded-Host": "origin.example.com",
    "X-Forwarded-Proto": "https",
  });
  assert.deepEqual(out, { "X-Custom": "kept" });
});

test("isForbiddenUpstreamHeaderName: blocks origin-IP forwarding headers", () => {
  for (const name of [
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
    "forwarded",
    "via",
    "true-client-ip",
    "client-ip",
    "X-Forwarded-For",
    "X-Real-IP",
    "CF-Connecting-IP",
  ]) {
    assert.equal(isForbiddenUpstreamHeaderName(name), true, `${name} must be forbidden upstream`);
  }
  assert.equal(isForbiddenUpstreamHeaderName("x-custom-hdr"), false);
});

test("isForbiddenCustomHeaderName: blocks origin-IP forwarding headers for operator custom headers", () => {
  assert.equal(isForbiddenCustomHeaderName("x-forwarded-for"), true);
  assert.equal(isForbiddenCustomHeaderName("x-real-ip"), true);
  assert.equal(isForbiddenCustomHeaderName("cf-connecting-ip"), true);
  assert.equal(isForbiddenCustomHeaderName("forwarded"), true);
  assert.equal(isForbiddenCustomHeaderName("via"), true);
  assert.equal(isForbiddenCustomHeaderName("x-custom-hdr"), false);
});

test("sanitizeUpstreamHeadersMap: drops values with CR/LF", () => {
  const out = sanitizeUpstreamHeadersMap({
    Good: "a",
    Bad: "x\ny",
    Bad2: "x\ry",
  });
  assert.deepEqual(out, { Good: "a" });
});

test("sanitizeUpstreamHeadersMap: caps count at 16", () => {
  const raw = Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`H${i}`, String(i)]));
  const out = sanitizeUpstreamHeadersMap(raw);
  assert.strictEqual(Object.keys(out).length, 16);
});
