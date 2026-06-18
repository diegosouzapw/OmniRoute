/**
 * Fase 3 / Epic A spike — TPROXY transparent capture mode (Linux).
 *
 * The kernel wiring (IP_TRANSPARENT listener, live intercept) cannot be unit-
 * tested here — it needs CAP_NET_ADMIN + a real kernel and is gated on a VPS
 * live test (Hard Rule #18). What CAN be locked down now, with no root, is the
 * exact set of iptables / ip-rule / ip-route commands and the invariant that
 * revert is the precise inverse of apply (in reverse order). A leftover mangle
 * rule after a crash is the very failure Fase 1 set out to prevent, so this
 * builder is the spec the VPS spike will execute and the future execFile wiring
 * will consume. Commands are produced as {bin, args[]} for execFile — never a
 * shell string (Hard Rule #13).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { buildTproxyApplyCommands, buildTproxyRevertCommands, validateTproxyConfig } = await import(
  "../../src/mitm/tproxy/commands.ts"
);

const CFG = { dport: 443, mark: 1, onPort: 8443, routeTable: 100 };

test("apply builds the three TPROXY/policy-routing commands in order", () => {
  const cmds = buildTproxyApplyCommands(CFG);
  assert.equal(cmds.length, 3);

  // 1) mangle PREROUTING TPROXY rule
  assert.deepEqual(cmds[0], {
    bin: "iptables",
    args: [
      "-t", "mangle", "-A", "PREROUTING",
      "-p", "tcp", "--dport", "443",
      "-j", "TPROXY", "--tproxy-mark", "1", "--on-port", "8443",
    ],
  });
  // 2) ip rule fwmark -> table
  assert.deepEqual(cmds[1], { bin: "ip", args: ["rule", "add", "fwmark", "1", "lookup", "100"] });
  // 3) local default route in that table
  assert.deepEqual(cmds[2], {
    bin: "ip",
    args: ["route", "add", "local", "default", "dev", "lo", "table", "100"],
  });
});

test("every arg is a string (execFile-safe, Hard Rule #13)", () => {
  for (const cmd of [...buildTproxyApplyCommands(CFG), ...buildTproxyRevertCommands(CFG)]) {
    assert.ok(typeof cmd.bin === "string" && cmd.bin.length > 0);
    for (const a of cmd.args) assert.equal(typeof a, "string", `arg ${a} must be a string`);
  }
});

test("revert is the exact inverse of apply, in reverse order", () => {
  const revert = buildTproxyRevertCommands(CFG);
  assert.equal(revert.length, 3);

  // route del (reverse order: route added last is torn down first)
  assert.deepEqual(revert[0], {
    bin: "ip",
    args: ["route", "del", "local", "default", "dev", "lo", "table", "100"],
  });
  // rule del
  assert.deepEqual(revert[1], { bin: "ip", args: ["rule", "del", "fwmark", "1", "lookup", "100"] });
  // iptables -D mirrors -A exactly except the operation flag
  assert.deepEqual(revert[2], {
    bin: "iptables",
    args: [
      "-t", "mangle", "-D", "PREROUTING",
      "-p", "tcp", "--dport", "443",
      "-j", "TPROXY", "--tproxy-mark", "1", "--on-port", "8443",
    ],
  });
});

test("apply -A and revert -D differ only in the iptables operation flag", () => {
  const apply = buildTproxyApplyCommands(CFG)[0].args;
  const revert = buildTproxyRevertCommands(CFG)[2].args;
  assert.deepEqual(
    apply.map((a) => (a === "-A" ? "OP" : a)),
    revert.map((a) => (a === "-D" ? "OP" : a)),
    "the rule spec must be identical so -D matches the exact -A rule"
  );
});

test("config values flow into the commands (no hardcoding)", () => {
  const custom = { dport: 8443, mark: 7, onPort: 9999, routeTable: 200 };
  const cmds = buildTproxyApplyCommands(custom);
  assert.ok(cmds[0].args.includes("8443") && cmds[0].args.includes("9999") && cmds[0].args.includes("7"));
  assert.ok(cmds[1].args.includes("200"));
});

test("validateTproxyConfig accepts a sane config and rejects bad ports/marks", () => {
  assert.equal(validateTproxyConfig(CFG), null);
  assert.match(validateTproxyConfig({ ...CFG, dport: 0 }) ?? "", /dport/i);
  assert.match(validateTproxyConfig({ ...CFG, onPort: 70000 }) ?? "", /onPort/i);
  assert.match(validateTproxyConfig({ ...CFG, mark: 0 }) ?? "", /mark/i);
  assert.match(validateTproxyConfig({ ...CFG, routeTable: -1 }) ?? "", /table/i);
});
