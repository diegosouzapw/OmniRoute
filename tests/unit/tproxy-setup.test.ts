/**
 * Fase 3 / Epic A — TPROXY setup layer (execFile wiring over the command builder).
 *
 * The builder (commands.ts) was validated against a real kernel on the VPS
 * (apply/revert accepted, exact-inverse, zero impact on non-targeted traffic —
 * see PR #4139). This layer adds the transactional runner: apply runs the
 * commands in order and, if any step fails mid-way, runs a best-effort full
 * revert so a partial apply never leaves firewall/routing state behind (the
 * Fase 1 / repairMitm crash-safe invariant). revert is itself idempotent /
 * best-effort. The command runner is injected so this is unit-testable without
 * root; the real runner uses execFile (Hard Rule #13 — args array, no shell).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { applyTproxy, revertTproxy } = await import("../../src/mitm/tproxy/setup.ts");

const CFG = { dport: 443, mark: 1, onPort: 8443, routeTable: 100 };

function recorder(failOnIndex = -1) {
  const calls: Array<{ bin: string; args: string[] }> = [];
  const run = async (bin: string, args: string[]) => {
    calls.push({ bin, args });
    if (calls.length - 1 === failOnIndex) throw new Error(`boom at ${failOnIndex}`);
  };
  return { calls, run };
}

test("applyTproxy runs the 3 apply commands in order via the injected runner", async () => {
  const r = recorder();
  await applyTproxy(CFG, r.run);
  assert.equal(r.calls.length, 3);
  assert.equal(r.calls[0].bin, "iptables");
  assert.deepEqual(r.calls[0].args.slice(0, 4), ["-t", "mangle", "-A", "PREROUTING"]);
  assert.deepEqual(r.calls[1], { bin: "ip", args: ["rule", "add", "fwmark", "1", "lookup", "100"] });
  assert.equal(r.calls[2].args[0], "route");
});

test("applyTproxy rejects an invalid config before running anything", async () => {
  const r = recorder();
  await assert.rejects(() => applyTproxy({ ...CFG, dport: 0 }, r.run), /dport/i);
  assert.equal(r.calls.length, 0, "no command runs when the config is invalid");
});

test("applyTproxy runs a best-effort full revert when a command fails mid-way", async () => {
  const r = recorder(1); // fail on the 2nd apply command (ip rule add)
  await assert.rejects(() => applyTproxy(CFG, r.run), /boom/);
  // apply[0], apply[1]=fail, then the 3 revert commands (best-effort cleanup)
  assert.equal(r.calls.length, 5);
  assert.deepEqual(r.calls[2], {
    bin: "ip",
    args: ["route", "del", "local", "default", "dev", "lo", "table", "100"],
  });
  assert.deepEqual(r.calls[4].args.slice(0, 4), ["-t", "mangle", "-D", "PREROUTING"]);
});

test("revertTproxy runs all 3 reverts best-effort even if one fails (idempotent)", async () => {
  const r = recorder(1); // 2nd revert throws (e.g. rule not present)
  await revertTproxy(CFG, r.run); // must NOT throw
  assert.equal(r.calls.length, 3, "all three reverts attempted despite the failure");
});

test("every command the runner receives has string args (execFile-safe)", async () => {
  const r = recorder();
  await applyTproxy(CFG, r.run);
  await revertTproxy(CFG, r.run);
  for (const c of r.calls) {
    assert.ok(typeof c.bin === "string");
    for (const a of c.args) assert.equal(typeof a, "string");
  }
});
