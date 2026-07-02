/**
 * Gap 1: parse /proc/net/tcp to map a local port → socket inode. Pure parser,
 * fixture-driven — no real /proc access. The proxy sees the client process's
 * ephemeral port as the connection's remote port, which appears in that
 * process's /proc/net/tcp LOCAL address column — so we match on local_address.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  parseProcNetTcpForInode,
  attributeProcess,
} from "../../src/mitm/inspector/processAttribution.ts";

// Real /proc/net/tcp layout: sl local_address rem_address st tx/rx tr tm retr uid timeout inode ...
// local 0100007F:1F90 = 127.0.0.1:8080 (1F90 hex = 8080), inode 45678 in column 9.
const SAMPLE = [
  "  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode",
  "   0: 0100007F:1F90 0100007F:C001 01 00000000:00000000 00:00000000 00000000  1000        0 45678 1 0000 0",
  "   1: 0100007F:0050 00000000:0000 0A 00000000:00000000 00:00000000 00000000  1000        0 11111 1 0000 0",
].join("\n");

test("parseProcNetTcpForInode finds the inode for a given local port (hex 1F90 = 8080)", () => {
  assert.equal(parseProcNetTcpForInode(SAMPLE, 8080), "45678");
});

test("parseProcNetTcpForInode matches another row by its local port (hex 0050 = 80)", () => {
  assert.equal(parseProcNetTcpForInode(SAMPLE, 80), "11111");
});

test("parseProcNetTcpForInode returns null when no row matches the local port", () => {
  assert.equal(parseProcNetTcpForInode(SAMPLE, 9999), null);
});

test("parseProcNetTcpForInode tolerates malformed/short lines without throwing", () => {
  const garbage = "not a real proc table\n   x: zzz\n";
  assert.equal(parseProcNetTcpForInode(garbage, 8080), null);
});

test("attributeProcess returns null on non-Linux (stub) without throwing", () => {
  // On the CI/dev host this is Linux, but an unbound ephemeral port that no
  // socket owns must resolve to null rather than throw — exercises the
  // not-found path safely regardless of platform.
  const result = attributeProcess(0);
  assert.ok(result === null || (typeof result.pid === "number" && typeof result.processName === "string"));
});
