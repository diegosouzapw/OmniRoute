/**
 * Fase 3 / Epic A — OS trust-store install for the TPROXY dynamic CA (decrypt 4b/N).
 *
 * Installs the dynamic CA into the trust store under a DEDICATED slot
 * (`omniroute-tproxy-ca.crt`) so it never clobbers the static MITM cert slot.
 * Every effectful seam is injected, so these tests pin the exact privileged
 * command sequence (no shell, arg arrays — Hard Rule #13) without root.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  installTproxyCa,
  uninstallTproxyCa,
  TPROXY_CA_CERT_NAME,
} from "../../src/mitm/tproxy/caTrust.ts";

function fakeDeps(over: Record<string, unknown> = {}) {
  const calls: Array<{ command: string; args: string[] }> = [];
  const writes: Array<{ path: string; data: string }> = [];
  const removed: string[] = [];
  return {
    calls,
    writes,
    removed,
    deps: {
      run: async (command: string, args: string[]) => {
        calls.push({ command, args });
      },
      writeFile: (p: string, data: string) => {
        writes.push({ path: p, data });
      },
      rmFile: (p: string) => {
        removed.push(p);
      },
      tmpDir: () => "/tmp",
      certConfig: () => ({ dir: "/usr/local/share/ca-certificates", cmd: "update-ca-certificates" }),
      platform: () => "linux",
      ...over,
    } as never,
  };
}

test("installTproxyCa stages the PEM, copies it into the dedicated slot, refreshes, cleans up", async () => {
  const f = fakeDeps();
  await installTproxyCa("CA-PEM", "", f.deps);

  assert.equal(f.writes.length, 1);
  assert.match(f.writes[0].path, /omniroute-tproxy-ca\.crt$/);
  assert.equal(f.writes[0].data, "CA-PEM");

  const cmds = f.calls.map((c) => `${c.command} ${c.args.join(" ")}`);
  assert.deepEqual(cmds, [
    "sudo -S mkdir -p /usr/local/share/ca-certificates",
    `sudo -S cp /tmp/${TPROXY_CA_CERT_NAME} /usr/local/share/ca-certificates/${TPROXY_CA_CERT_NAME}`,
    "sudo -S update-ca-certificates",
  ]);
  assert.deepEqual(f.removed, [`/tmp/${TPROXY_CA_CERT_NAME}`], "staged file cleaned up");
});

test("installTproxyCa never touches the static MITM cert slot", async () => {
  const f = fakeDeps();
  await installTproxyCa("CA-PEM", "", f.deps);
  const joined = f.calls.map((c) => c.args.join(" ")).join(" ");
  assert.ok(!joined.includes("omniroute-mitm.crt"), "must not collide with the MITM cert");
  assert.ok(joined.includes("omniroute-tproxy-ca.crt"));
});

test("installTproxyCa cleans up the staged file even when a privileged command fails", async () => {
  const f = fakeDeps({
    run: async (_c: string, a: string[]) => {
      if (a.includes("cp")) throw new Error("EPERM: not permitted");
    },
  });
  await assert.rejects(() => installTproxyCa("CA-PEM", "", f.deps), /EPERM/);
  assert.deepEqual(f.removed, [`/tmp/${TPROXY_CA_CERT_NAME}`], "staged file still cleaned up on failure");
});

test("installTproxyCa throws on non-Linux hosts and runs nothing", async () => {
  const f = fakeDeps({ platform: () => "darwin" });
  await assert.rejects(() => installTproxyCa("CA-PEM", "", f.deps), /Linux-only/);
  assert.equal(f.calls.length, 0);
});

test("uninstallTproxyCa removes only the dedicated slot and refreshes", async () => {
  const f = fakeDeps();
  await uninstallTproxyCa("", f.deps);
  const cmds = f.calls.map((c) => `${c.command} ${c.args.join(" ")}`);
  assert.deepEqual(cmds, [
    `sudo -S rm -f /usr/local/share/ca-certificates/${TPROXY_CA_CERT_NAME}`,
    "sudo -S update-ca-certificates",
  ]);
});

test("uninstallTproxyCa is a no-op on non-Linux hosts", async () => {
  const f = fakeDeps({ platform: () => "win32" });
  await uninstallTproxyCa("", f.deps);
  assert.equal(f.calls.length, 0);
});
