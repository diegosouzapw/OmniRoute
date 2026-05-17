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

test("autostart.enable cria arquivo de configuração no Linux", async () => {
  if (process.platform !== "linux") return;
  const { enable, isAutostartEnabled, disable } = await import("../../bin/cli/tray/autostart.mjs");
  const ok = enable();
  assert.equal(ok, true, "enable deve retornar true");
  assert.equal(isAutostartEnabled(), true, "isAutostartEnabled deve ser true após enable");
  disable();
  assert.equal(isAutostartEnabled(), false, "isAutostartEnabled deve ser false após disable");
});

test("commands/tray.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/tray.mjs");
  assert.equal(typeof mod.registerTray, "function");
});

test("commands/autostart.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/autostart.mjs");
  assert.equal(typeof mod.registerAutostart, "function");
});
