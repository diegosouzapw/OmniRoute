/**
 * tests/unit/sre-tcp-close-analyzer.test.ts
 *
 * Contract test for scripts/sre/tcp-close-analyzer.py — the dependency-free
 * pcap analyzer used to debug "who closed the TCP connection first" between
 * Caddy and omniroute-dev (see the script's module docstring for the story
 * behind it: dashboard-level 499s don't say whether OmniRoute or the far end
 * actually tore down the socket).
 *
 * Builds a minimal, synthetic libpcap file by hand (classic Ethernet framing,
 * no third-party pcap-writing library) covering one TCP stream: SYN/SYN-ACK/
 * ACK handshake, an HTTP POST carrying a marker string in its body, then a
 * server-initiated FIN/ACK close — and asserts the script's own analysis
 * (--out JSONL) and marker search (--find) both report it correctly.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const SCRIPT = path.join(ROOT, "scripts", "sre", "tcp-close-analyzer.py");

const hasPython3 = spawnSync("python3", ["--version"], { stdio: "ignore" }).status === 0;

// --- minimal libpcap + Ethernet/IPv4/TCP packet builder (test-only) --------

const TCP_FIN = 0x01;
const TCP_SYN = 0x02;
const TCP_ACK = 0x10;

function ipv4(a: number, b: number, c: number, d: number): Buffer {
  return Buffer.from([a, b, c, d]);
}

function buildTcpPacket(opts: {
  srcIp: Buffer;
  dstIp: Buffer;
  srcPort: number;
  dstPort: number;
  seq: number;
  ack: number;
  flags: number;
  payload?: Buffer;
}): Buffer {
  const payload = opts.payload ?? Buffer.alloc(0);

  const tcp = Buffer.alloc(20 + payload.length);
  tcp.writeUInt16BE(opts.srcPort, 0);
  tcp.writeUInt16BE(opts.dstPort, 2);
  tcp.writeUInt32BE(opts.seq >>> 0, 4);
  tcp.writeUInt32BE(opts.ack >>> 0, 8);
  tcp.writeUInt16BE((5 << 12) | opts.flags, 12); // data offset=5 (no options)
  tcp.writeUInt16BE(65535, 14); // window
  // checksum (16) and urgent pointer (18) left as 0 — analyzer doesn't verify them
  payload.copy(tcp, 20);

  const ip = Buffer.alloc(20 + tcp.length);
  ip.writeUInt8((4 << 4) | 5, 0); // version=4, ihl=5
  ip.writeUInt8(0, 1);
  ip.writeUInt16BE(ip.length, 2); // total length
  ip.writeUInt16BE(0, 4); // id
  ip.writeUInt16BE(0, 6); // flags/fragment
  ip.writeUInt8(64, 8); // ttl
  ip.writeUInt8(6, 9); // protocol = TCP
  ip.writeUInt16BE(0, 10); // checksum (unverified by analyzer)
  opts.srcIp.copy(ip, 12);
  opts.dstIp.copy(ip, 16);
  tcp.copy(ip, 20);

  const eth = Buffer.alloc(14 + ip.length);
  Buffer.from([0x02, 0, 0, 0, 0, 1]).copy(eth, 0); // dst mac
  Buffer.from([0x02, 0, 0, 0, 0, 2]).copy(eth, 6); // src mac
  eth.writeUInt16BE(0x0800, 12); // ethertype = IPv4
  ip.copy(eth, 14);

  return eth;
}

function buildPcap(packets: { tsSec: number; tsUsec: number; data: Buffer }[]): Buffer {
  const globalHeader = Buffer.alloc(24);
  globalHeader.writeUInt32LE(0xa1b2c3d4, 0); // magic (LE, microsecond resolution)
  globalHeader.writeUInt16LE(2, 4); // version major
  globalHeader.writeUInt16LE(4, 6); // version minor
  globalHeader.writeInt32LE(0, 8); // thiszone
  globalHeader.writeUInt32LE(0, 12); // sigfigs
  globalHeader.writeUInt32LE(262144, 16); // snaplen
  globalHeader.writeUInt32LE(1, 20); // linktype = Ethernet

  const records = packets.map((p) => {
    const recHeader = Buffer.alloc(16);
    recHeader.writeUInt32LE(p.tsSec, 0);
    recHeader.writeUInt32LE(p.tsUsec, 4);
    recHeader.writeUInt32LE(p.data.length, 8); // incl_len
    recHeader.writeUInt32LE(p.data.length, 12); // orig_len
    return Buffer.concat([recHeader, p.data]);
  });

  return Buffer.concat([globalHeader, ...records]);
}

const CLIENT_IP = ipv4(10, 89, 2, 17);
const SERVER_IP = ipv4(10, 89, 2, 41);
const MARKER = "test-marker-c9f1a3d2-live-repro";

function buildSyntheticCapture(): Buffer {
  const httpBody = Buffer.from(
    `POST /v1/responses HTTP/1.1\r\nHost: omniroute\r\nContent-Length: 40\r\n\r\n{"input":"ping ${MARKER}"}`
  );

  const packets = [
    {
      tsSec: 1000,
      tsUsec: 0,
      data: buildTcpPacket({
        srcIp: CLIENT_IP,
        dstIp: SERVER_IP,
        srcPort: 43368,
        dstPort: 20128,
        seq: 1,
        ack: 0,
        flags: TCP_SYN,
      }),
    },
    {
      tsSec: 1000,
      tsUsec: 100,
      data: buildTcpPacket({
        srcIp: SERVER_IP,
        dstIp: CLIENT_IP,
        srcPort: 20128,
        dstPort: 43368,
        seq: 100,
        ack: 2,
        flags: TCP_SYN | TCP_ACK,
      }),
    },
    {
      tsSec: 1000,
      tsUsec: 200,
      data: buildTcpPacket({
        srcIp: CLIENT_IP,
        dstIp: SERVER_IP,
        srcPort: 43368,
        dstPort: 20128,
        seq: 2,
        ack: 101,
        flags: TCP_ACK,
      }),
    },
    {
      tsSec: 1000,
      tsUsec: 300,
      data: buildTcpPacket({
        srcIp: CLIENT_IP,
        dstIp: SERVER_IP,
        srcPort: 43368,
        dstPort: 20128,
        seq: 2,
        ack: 101,
        flags: TCP_ACK,
        payload: httpBody,
      }),
    },
    {
      tsSec: 1000,
      tsUsec: 400,
      data: buildTcpPacket({
        srcIp: SERVER_IP,
        dstIp: CLIENT_IP,
        srcPort: 20128,
        dstPort: 43368,
        seq: 101,
        ack: 2 + httpBody.length,
        flags: TCP_ACK,
      }),
    },
    // Server closes first.
    {
      tsSec: 1005,
      tsUsec: 0,
      data: buildTcpPacket({
        srcIp: SERVER_IP,
        dstIp: CLIENT_IP,
        srcPort: 20128,
        dstPort: 43368,
        seq: 101,
        ack: 2 + httpBody.length,
        flags: TCP_FIN | TCP_ACK,
      }),
    },
    {
      tsSec: 1005,
      tsUsec: 100,
      data: buildTcpPacket({
        srcIp: CLIENT_IP,
        dstIp: SERVER_IP,
        srcPort: 43368,
        dstPort: 20128,
        seq: 2 + httpBody.length,
        ack: 102,
        flags: TCP_ACK,
      }),
    },
    {
      tsSec: 1005,
      tsUsec: 200,
      data: buildTcpPacket({
        srcIp: CLIENT_IP,
        dstIp: SERVER_IP,
        srcPort: 43368,
        dstPort: 20128,
        seq: 2 + httpBody.length,
        ack: 102,
        flags: TCP_FIN | TCP_ACK,
      }),
    },
  ];

  return buildPcap(packets);
}

function withTempPcap<T>(fn: (pcapPath: string, tmpDir: string) => T): T {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tcp-analyzer-test-"));
  const pcapPath = path.join(tmpDir, "capture.pcap");
  fs.writeFileSync(pcapPath, buildSyntheticCapture());
  try {
    return fn(pcapPath, tmpDir);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

test("scripts/sre/tcp-close-analyzer.py exists, is executable, and prints capture instructions", () => {
  assert.ok(fs.existsSync(SCRIPT), "tcp-close-analyzer.py is missing");
  assert.ok(fs.statSync(SCRIPT).mode & 0o111, "tcp-close-analyzer.py is not executable (chmod +x)");

  if (!hasPython3) return;
  const result = spawnSync("python3", [SCRIPT, "--show-capture-cmd"], { encoding: "utf8" });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /nsenter/);
  assert.match(result.stdout, /podman inspect omniroute-dev/);
});

test(
  "analyze: reports the synthetic stream with a server_closed_first verdict",
  { skip: !hasPython3 },
  () => {
    withTempPcap((pcapPath, tmpDir) => {
      const outPath = path.join(tmpDir, "out.jsonl");
      const result = spawnSync("python3", [SCRIPT, pcapPath, "--out", outPath], {
        encoding: "utf8",
      });
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /Parsed 8 TCP\/IPv4 packets across 1 streams/);

      const lines = fs.readFileSync(outPath, "utf8").trim().split("\n");
      assert.equal(lines.length, 1);
      const stream = JSON.parse(lines[0]);

      assert.equal(stream.client, "10.89.2.17:43368");
      assert.equal(stream.server, "10.89.2.41:20128");
      assert.equal(stream.packetCount, 8);
      assert.equal(stream.verdict, "server_closed_first");
      assert.equal(stream.closes.length, 2);
      assert.equal(stream.closes[0].side, "server");
      assert.equal(stream.closes[1].side, "client");
      assert.match(stream.firstLineFromA, /^POST \/v1\/responses HTTP\/1\.1$/);
    });
  }
);

test(
  "--find: locates the marker string and reports the carrying stream",
  { skip: !hasPython3 },
  () => {
    withTempPcap((pcapPath) => {
      const result = spawnSync("python3", [SCRIPT, pcapPath, "--find", MARKER], {
        encoding: "utf8",
      });
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /FOUND in buf_a/);
      assert.match(result.stdout, /10\.89\.2\.17:43368<->10\.89\.2\.41:20128/);
      assert.match(result.stdout, new RegExp(MARKER));
    });
  }
);

test(
  "--find: exits non-zero and reports nothing found for an absent marker",
  { skip: !hasPython3 },
  () => {
    withTempPcap((pcapPath) => {
      const result = spawnSync(
        "python3",
        [SCRIPT, pcapPath, "--find", "definitely-not-present-xyz"],
        {
          encoding: "utf8",
        }
      );
      assert.equal(result.status, 1);
      assert.match(result.stderr, /not found in any of 1 streams/);
    });
  }
);
