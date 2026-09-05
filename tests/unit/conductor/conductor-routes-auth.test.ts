import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Padrão budget-route-auth: prova pelo fonte que o gate de auth vem ANTES de qualquer uso do proxy.
const ROUTES = [
  "src/app/api/conductor/fleet/route.ts",
  "src/app/api/conductor/tasks/[id]/route.ts",
  "src/app/api/conductor/tasks/[id]/cancel/route.ts",
];

for (const route of ROUTES) {
  test(`${route}: requireManagementAuth antes do proxy ao hub`, () => {
    const src = fs.readFileSync(path.join(process.cwd(), route), "utf8");
    const authAt = src.indexOf("requireManagementAuth(");
    assert.ok(authAt > 0, "handler chama requireManagementAuth");
    assert.match(src, /if \(authError\) return authError;/, "curto-circuito no erro de auth");
    const proxyAt = src.search(/getFleetSnapshot\(|getConductorTaskDetail\(|cancelConductorTask\(/);
    assert.ok(proxyAt > authAt, "proxy ao hub só depois do gate de auth");
    assert.ok(!src.includes("CONDUCTOR_HUB_TOKEN"), "token nunca manuseado na rota (vive no hubProxy)");
  });
}
