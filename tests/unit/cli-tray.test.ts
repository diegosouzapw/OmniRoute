import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

let tmpDir: string;
let origHome: string | undefined;

test.before(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "omniroute-tray-test-"));
  origHome = process.env.HOME;
  // Redirecionar HOME para tmpDir para isolar testes de autostart
  process.env.HOME = tmpDir;
});

test.after(() => {
  if (origHome === undefined) delete process.env.HOME;
  else process.env.HOME = origHome;
  try {
    rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
});

test("tray/index.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/tray/index.mjs");
  assert.equal(typeof mod.initTray, "function");
  assert.equal(typeof mod.killTray, "function");
  assert.equal(typeof mod.isTrayActive, "function");
  assert.equal(typeof mod.isTraySupported, "function");
});

test("isTraySupported retorna boolean", async () => {
  const { isTraySupported } = await import("../../bin/cli/tray/index.mjs");
  assert.equal(typeof isTraySupported(), "boolean");
});

test("isTrayActive retorna false antes de iniciar", async () => {
  const { isTrayActive } = await import("../../bin/cli/tray/index.mjs");
  assert.equal(isTrayActive(), false);
});

test("tray/autostart.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/tray/autostart.mjs");
  assert.equal(typeof mod.enable, "function");
  assert.equal(typeof mod.disable, "function");
  assert.equal(typeof mod.isAutostartEnabled, "function");
});

test("autostart.isAutostartEnabled retorna boolean", async () => {
  const { isAutostartEnabled } = await import("../../bin/cli/tray/autostart.mjs");
  const result = isAutostartEnabled();
  assert.equal(typeof result, "boolean");
  assert.equal(result, false, "autostart não deve estar habilitado em tmpDir isolado");
});

test("autostart.enable registers Linux autostart (systemd and/or desktop)", async () => {
  if (process.platform !== "linux") return;
  const { enable, isAutostartEnabled, disable, getAutostartStatus } =
    await import("../../bin/cli/tray/autostart.mjs");
  const ok = enable();
  assert.equal(typeof ok, "boolean");
  if (ok) {
    assert.equal(isAutostartEnabled(), true, "isAutostartEnabled deve ser true após enable");
    const status = getAutostartStatus();
    assert.ok(
      status.mechanism === "systemd-user" || status.mechanism === "xdg-desktop",
      "expected systemd-user or xdg-desktop mechanism"
    );
  }
  disable();
  assert.equal(isAutostartEnabled(), false, "isAutostartEnabled deve ser false após disable");
});

test("killSystrayUnix mata o PID filho com SIGKILL ANTES de tray.kill(false)", async () => {
  const { killSystrayUnix } = await import("../../bin/cli/tray/traySystray.mjs");
  const calls: string[] = [];
  const fakeKill = (pid: number, signal: string) => {
    calls.push(`kill:${pid}:${signal}`);
  };
  const tray = {
    _process: { pid: 4242 },
    kill: (exit: boolean) => {
      calls.push(`tray.kill:${exit}`);
    },
  };

  killSystrayUnix(tray, fakeKill);

  // O child PID deve ser morto com SIGKILL ANTES de fechar o IPC (tray.kill).
  assert.deepEqual(calls, ["kill:4242:SIGKILL", "tray.kill:false"]);
});

test("killSystrayUnix usa tray.process() como fallback quando _process ausente", async () => {
  const { killSystrayUnix } = await import("../../bin/cli/tray/traySystray.mjs");
  const calls: string[] = [];
  const fakeKill = (pid: number, signal: string) => {
    calls.push(`kill:${pid}:${signal}`);
  };
  const tray = {
    process: () => ({ pid: 7777 }),
    kill: (exit: boolean) => {
      calls.push(`tray.kill:${exit}`);
    },
  };

  killSystrayUnix(tray, fakeKill);

  assert.deepEqual(calls, ["kill:7777:SIGKILL", "tray.kill:false"]);
});

test("killSystrayUnix fecha o IPC mesmo sem PID filho disponível", async () => {
  const { killSystrayUnix } = await import("../../bin/cli/tray/traySystray.mjs");
  const calls: string[] = [];
  const fakeKill = (pid: number, signal: string) => {
    calls.push(`kill:${pid}:${signal}`);
  };
  const tray = {
    kill: (exit: boolean) => {
      calls.push(`tray.kill:${exit}`);
    },
  };

  killSystrayUnix(tray, fakeKill);

  // Sem child PID, nenhum SIGKILL — mas o IPC ainda é fechado.
  assert.deepEqual(calls, ["tray.kill:false"]);
});

test("commands/tray.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/tray.mjs");
  assert.equal(typeof mod.registerTray, "function");
});

test("commands/autostart.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/autostart.mjs");
  assert.equal(typeof mod.registerAutostart, "function");
});
