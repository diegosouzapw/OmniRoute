/**
 * sing-box sidecar × native IP_TRANSPARENT listener coexistence (#12962).
 *
 * `applyTproxy()` brings the sing-box sidecar up and installs the iptables rules,
 * then `startTproxyCapture()` binds the native IP_TRANSPARENT listener on
 * `cfg.onPort` (0.0.0.0 by default). The PREROUTING TPROXY rule hands every
 * intercepted connection to `--on-port <onPort>`. Two invariants must hold:
 *
 *   1. sing-box never binds `onPort` (nor any other port the native listener or
 *      the TPROXY rule targets) — otherwise one of the two listeners gets
 *      EADDRINUSE, or sing-box silently wins the traffic and the MITM never sees it.
 *   2. sing-box's own upstream connections carry the bypass SO_MARK
 *      (`routing_mark` on every outbound) that the `mangle OUTPUT` rule excludes
 *      (`! --mark <bypass>`), so its egress is not re-marked and re-TPROXY'd (loop).
 *
 * The real iptables/root/IP_TRANSPARENT run is NOT covered here — see the PR notes.
 * This test asserts the generated sing-box JSON, the exact iptables rule text, and
 * (with real sockets) that the generated listen addresses do not collide.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-singbox-coexist-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.SINGBOX_PORT;

const singbox = await import("../../src/lib/services/installers/singbox.ts");
const { ensureSingboxTproxy, applyTproxy } = await import("../../src/mitm/tproxy/setup.ts");
const { buildTproxyApplyCommands } = await import("../../src/mitm/tproxy/commands.ts");
const { registerSupervisor, unregisterSupervisor } =
  await import("../../src/lib/services/registry.ts");

type SingboxInbound = { type: string; listen: string; listen_port: number };
type SingboxOutbound = { type: string; tag: string; routing_mark?: number };
type SingboxConfig = { inbounds: SingboxInbound[]; outbounds: SingboxOutbound[] };

const BYPASS = 1337; // 0x539 — the route's default SO_MARK for the proxy's own egress
const CFG = { dport: 443, mark: 0x2333, onPort: 8443, routeTable: 233, bypassMark: BYPASS };

function renderRules(cfg: typeof CFG): string[] {
  return buildTproxyApplyCommands(cfg).map((c) => `${c.bin} ${c.args.join(" ")}`);
}

function fakeSupervisor(initial: "stopped" | "running" = "stopped") {
  let state: string = initial;
  const calls = { start: 0 };
  const sup = {
    getStatus: () => ({ tool: "singbox", state }),
    start: async () => {
      calls.start++;
      state = "running";
      return { tool: "singbox", state };
    },
  };
  return { sup, calls };
}

function readWrittenConfig(): SingboxConfig {
  return JSON.parse(fs.readFileSync(singbox.getConfigPath(), "utf8")) as SingboxConfig;
}

test.beforeEach(() => {
  fs.mkdirSync(path.dirname(singbox.getConfigPath()), { recursive: true });
  fs.rmSync(singbox.getConfigPath(), { force: true });
});

test.after(() => {
  unregisterSupervisor("singbox");
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("generated config: no sing-box inbound binds the native listener's onPort, even when the service port is configured onto it", () => {
  const cfg = singbox.generateDefaultSingboxConfig(
    singbox.resolveSingboxListenPort(CFG.onPort, CFG.onPort),
    BYPASS
  ) as unknown as SingboxConfig;
  const ports = cfg.inbounds.map((i) => i.listen_port);
  assert.ok(ports.length >= 1);
  assert.ok(
    !ports.includes(CFG.onPort),
    `sing-box inbound ports ${ports} must not include ${CFG.onPort}`
  );
  assert.equal(
    new Set(ports).size,
    ports.length,
    "sing-box inbounds must not collide with each other"
  );
});

test("resolveSingboxListenPort skips both the reserved port and the paired mixed-inbound port", () => {
  assert.equal(
    singbox.resolveSingboxListenPort(9000, 20140),
    20140,
    "no clash → the service port is kept"
  );
  assert.notEqual(singbox.resolveSingboxListenPort(20140, 20140), 20140);
  assert.notEqual(
    singbox.resolveSingboxListenPort(20141, 20140),
    20140,
    "tproxyPort+1 (mixed) would hit the reserved port"
  );
});

test("generated config: every outbound carries routing_mark = the bypass mark", () => {
  const cfg = singbox.generateDefaultSingboxConfig(20140, BYPASS) as unknown as SingboxConfig;
  assert.ok(cfg.outbounds.length >= 1);
  for (const o of cfg.outbounds) {
    assert.equal(
      o.routing_mark,
      BYPASS,
      `outbound ${o.tag} must be SO_MARK'd with the bypass mark`
    );
  }
});

test("ensureSingboxTproxy writes a config that avoids onPort and marks egress with cfg.bypassMark", async () => {
  const { sup, calls } = fakeSupervisor();
  registerSupervisor(sup as never);
  const ok = await ensureSingboxTproxy(CFG);
  assert.equal(ok, true);
  assert.equal(calls.start, 1);

  const written = readWrittenConfig();
  const inboundPorts = written.inbounds.map((i) => i.listen_port);
  assert.ok(
    !inboundPorts.includes(CFG.onPort),
    `inbounds ${inboundPorts} must not include onPort ${CFG.onPort}`
  );
  for (const o of written.outbounds) assert.equal(o.routing_mark, BYPASS);
  // sing-box's mark must differ from the interception mark, or egress would be re-routed to lo
  for (const o of written.outbounds) assert.notEqual(o.routing_mark, CFG.mark);
});

test("iptables rules: OUTPUT excludes sing-box's mark; TPROXY target is only the native listener's port", async () => {
  const { sup } = fakeSupervisor();
  registerSupervisor(sup as never);
  await ensureSingboxTproxy(CFG);
  const written = readWrittenConfig();
  const singboxMark = written.outbounds[0].routing_mark;
  const rules = renderRules(CFG);

  const output = rules.find((r) => r.includes(" OUTPUT "));
  const prerouting = rules.find((r) => r.includes(" PREROUTING "));
  assert.ok(output && prerouting);
  assert.equal(
    output,
    `iptables -t mangle -A OUTPUT -p tcp --dport 443 -m mark ! --mark ${singboxMark} -j MARK --set-mark ${CFG.mark}`
  );
  assert.equal(
    prerouting,
    `iptables -t mangle -A PREROUTING -p tcp --dport 443 -m mark --mark ${CFG.mark} -j TPROXY --on-port ${CFG.onPort} --tproxy-mark ${CFG.mark}`
  );
  // the TPROXY --on-port must not be a port sing-box listens on
  const onPortInRule = Number(/--on-port (\d+)/.exec(prerouting)![1]);
  assert.ok(!written.inbounds.some((i) => i.listen_port === onPortInRule));
});

test("without cfg.bypassMark the OUTPUT rule cannot exclude sing-box egress → sing-box is NOT started (loop guard)", async () => {
  const { sup, calls } = fakeSupervisor();
  registerSupervisor(sup as never);
  const { bypassMark: _omit, ...noBypass } = CFG;
  const ok = await ensureSingboxTproxy(noBypass);
  assert.equal(ok, false);
  assert.equal(
    calls.start,
    0,
    "starting sing-box with an un-excluded egress would loop its own traffic"
  );
  assert.ok(!fs.existsSync(singbox.getConfigPath()), "no config is written for the refused start");
});

test("real sockets: sing-box inbounds and the native 0.0.0.0:onPort listener bind side by side", async () => {
  // Pick a free port to play the role of cfg.onPort for the native IP_TRANSPARENT listener.
  const probe = net.createServer();
  await new Promise<void>((r) => probe.listen(0, "0.0.0.0", r));
  const onPort = (probe.address() as net.AddressInfo).port;
  await new Promise<void>((r) => probe.close(() => r()));

  const { sup } = fakeSupervisor();
  registerSupervisor(sup as never);
  process.env.SINGBOX_PORT = String(onPort); // worst case: the service port was configured onto onPort
  try {
    assert.equal(await ensureSingboxTproxy({ ...CFG, onPort }), true);
  } finally {
    delete process.env.SINGBOX_PORT;
  }
  const written = readWrittenConfig();

  const servers: net.Server[] = [];
  try {
    // native listener first (what startTproxyCapture does, default listenIp 0.0.0.0)
    const native = net.createServer();
    await new Promise<void>((resolve, reject) => {
      native.once("error", reject);
      native.listen(onPort, "0.0.0.0", resolve);
    });
    servers.push(native);
    // then every sing-box inbound exactly as generated
    for (const inbound of written.inbounds) {
      const s = net.createServer();
      await new Promise<void>((resolve, reject) => {
        s.once("error", (e) =>
          reject(
            new Error(
              `${inbound.type} inbound ${inbound.listen}:${inbound.listen_port}: ${e.message}`
            )
          )
        );
        s.listen(inbound.listen_port, inbound.listen, resolve);
      });
      servers.push(s);
    }
  } finally {
    await Promise.all(servers.map((s) => new Promise<void>((r) => s.close(() => r()))));
  }
});

test("ensureSingboxTproxy never throws on a config-write failure and reports false", async () => {
  const { sup, calls } = fakeSupervisor();
  registerSupervisor(sup as never);
  fs.rmSync(path.dirname(singbox.getConfigPath()), { recursive: true, force: true }); // not installed
  const ok = await ensureSingboxTproxy(CFG);
  assert.equal(ok, false);
  assert.equal(calls.start, 0);
});

test("applyTproxy still installs the firewall rules when the sidecar is unavailable", async () => {
  unregisterSupervisor("singbox");
  const seen: string[] = [];
  await applyTproxy(CFG, async (bin, args) => {
    seen.push(`${bin} ${args.join(" ")}`);
  });
  assert.equal(seen.length, 4);
});
