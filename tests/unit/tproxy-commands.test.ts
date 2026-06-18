/**
 * Fase 3 / Epic A — TPROXY command builder (OUTPUT-based recipe).
 *
 * The recipe was validated end-to-end on the VPS (kernel 6.8.0): a local
 * outbound connection to a test port was marked in OUTPUT, rerouted to local
 * delivery, and the PREROUTING TPROXY target assigned it to the IP_TRANSPARENT
 * listener (client CONNECTED, original destination preserved). These tests pin
 * the exact commands + the invariant that revert is the precise inverse of
 * apply, in reverse order (a leftover mangle rule after a crash is the failure
 * Fase 1 prevents). Commands are {bin, args[]} for execFile — never a shell
 * string (Hard Rule #13).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { buildTproxyApplyCommands, buildTproxyRevertCommands, validateTproxyConfig } = await import(
  "../../src/mitm/tproxy/commands.ts"
);

const CFG = { dport: 443, mark: 9011, onPort: 8443, routeTable: 233 };

test("apply builds the 4 OUTPUT-based commands in order (ip rule, ip route, OUTPUT mark, PREROUTING TPROXY)", () => {
  const cmds = buildTproxyApplyCommands(CFG);
  assert.equal(cmds.length, 4);

  assert.deepEqual(cmds[0], { bin: "ip", args: ["rule", "add", "fwmark", "9011", "lookup", "233"] });
  assert.deepEqual(cmds[1], {
    bin: "ip",
    args: ["route", "add", "local", "0.0.0.0/0", "dev", "lo", "table", "233"],
  });
  // OUTPUT marks new local outbound connections to the target port
  assert.deepEqual(cmds[2], {
    bin: "iptables",
    args: ["-t", "mangle", "-A", "OUTPUT", "-p", "tcp", "--dport", "443", "-j", "MARK", "--set-mark", "9011"],
  });
  // PREROUTING TPROXY assigns the rerouted, marked packets to the listener
  assert.deepEqual(cmds[3], {
    bin: "iptables",
    args: [
      "-t", "mangle", "-A", "PREROUTING", "-p", "tcp", "--dport", "443",
      "-m", "mark", "--mark", "9011", "-j", "TPROXY", "--on-port", "8443", "--tproxy-mark", "9011",
    ],
  });
});

test("bypassMark adds the anti-loop exclusion to the OUTPUT rule", () => {
  const cmds = buildTproxyApplyCommands({ ...CFG, bypassMark: 1337 });
  const output = cmds[2].args;
  assert.deepEqual(output, [
    "-t", "mangle", "-A", "OUTPUT", "-p", "tcp", "--dport", "443",
    "-m", "mark", "!", "--mark", "1337", "-j", "MARK", "--set-mark", "9011",
  ]);
});

test("every arg is a string (execFile-safe, Hard Rule #13)", () => {
  const all = [
    ...buildTproxyApplyCommands(CFG),
    ...buildTproxyRevertCommands(CFG),
    ...buildTproxyApplyCommands({ ...CFG, bypassMark: 1337 }),
  ];
  for (const cmd of all) {
    assert.ok(typeof cmd.bin === "string" && cmd.bin.length > 0);
    for (const a of cmd.args) assert.equal(typeof a, "string", `arg ${a} must be a string`);
  }
});

test("revert is the exact inverse of apply, in reverse order", () => {
  const apply = buildTproxyApplyCommands(CFG);
  const revert = buildTproxyRevertCommands(CFG);
  assert.equal(revert.length, 4);

  // reverse order: PREROUTING -D, OUTPUT -D, route del, rule del
  assert.deepEqual(revert[0].args.slice(0, 4), ["-t", "mangle", "-D", "PREROUTING"]);
  assert.deepEqual(revert[1].args.slice(0, 4), ["-t", "mangle", "-D", "OUTPUT"]);
  assert.deepEqual(revert[2], {
    bin: "ip",
    args: ["route", "del", "local", "0.0.0.0/0", "dev", "lo", "table", "233"],
  });
  assert.deepEqual(revert[3], { bin: "ip", args: ["rule", "del", "fwmark", "9011", "lookup", "233"] });

  // -A and -D rule specs match exactly except the op flag (so -D removes the exact -A rule)
  assert.deepEqual(
    apply[3].args.map((a) => (a === "-A" ? "OP" : a)),
    revert[0].args.map((a) => (a === "-D" ? "OP" : a))
  );
  assert.deepEqual(
    apply[2].args.map((a) => (a === "-A" ? "OP" : a)),
    revert[1].args.map((a) => (a === "-D" ? "OP" : a))
  );
});

test("config values flow into the commands (no hardcoding)", () => {
  const custom = { dport: 8443, mark: 7, onPort: 9999, routeTable: 200 };
  const cmds = buildTproxyApplyCommands(custom);
  assert.ok(cmds[2].args.includes("8443") && cmds[2].args.includes("7"));
  assert.ok(cmds[3].args.includes("9999") && cmds[3].args.includes("200") === false); // table not in TPROXY rule
  assert.ok(cmds[0].args.includes("200"));
});

test("validateTproxyConfig accepts a sane config and rejects bad values", () => {
  assert.equal(validateTproxyConfig(CFG), null);
  assert.equal(validateTproxyConfig({ ...CFG, bypassMark: 1337 }), null);
  assert.match(validateTproxyConfig({ ...CFG, dport: 0 }) ?? "", /dport/i);
  assert.match(validateTproxyConfig({ ...CFG, onPort: 70000 }) ?? "", /onPort/i);
  assert.match(validateTproxyConfig({ ...CFG, mark: 0 }) ?? "", /mark/i);
  assert.match(validateTproxyConfig({ ...CFG, routeTable: -1 }) ?? "", /table/i);
  assert.match(validateTproxyConfig({ ...CFG, bypassMark: CFG.mark }) ?? "", /bypassMark/i);
});
