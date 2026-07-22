import test from "node:test";
import assert from "node:assert/strict";

import { initConductorBridge, stopConductorBridge } from "../../src/lib/conductor/boot.ts";

test.afterEach(() => {
  stopConductorBridge();
  delete process.env.CONDUCTOR_HUB_URL;
  delete process.env.CONDUCTOR_HUB_TOKEN;
});

test("no-op without CONDUCTOR_HUB_URL (bridge is opt-in)", () => {
  delete process.env.CONDUCTOR_HUB_URL;
  assert.equal(initConductorBridge(), null);
});

test("starts once with CONDUCTOR_HUB_URL set and is idempotent", () => {
  process.env.CONDUCTOR_HUB_URL = "http://127.0.0.1:1"; // porta inválida: conexão falha, mas o handle existe
  process.env.CONDUCTOR_HUB_TOKEN = "tok";
  // cursor injetado em memória: o teste não toca o SQLite real
  const first = initConductorBridge({ cursor: { get: () => null, set: () => {} } });
  assert.ok(first, "bridge iniciada");
  const second = initConductorBridge({ cursor: { get: () => null, set: () => {} } });
  assert.equal(second, first, "segunda chamada devolve a mesma instância (idempotente)");
});

test("stopConductorBridge() stops and allows a fresh start", () => {
  process.env.CONDUCTOR_HUB_URL = "http://127.0.0.1:1";
  const first = initConductorBridge({ cursor: { get: () => null, set: () => {} } });
  assert.ok(first);
  stopConductorBridge();
  assert.equal(first!.state(), "stopped");
  const second = initConductorBridge({ cursor: { get: () => null, set: () => {} } });
  assert.ok(second && second !== first, "após stop, novo init cria instância nova");
});
