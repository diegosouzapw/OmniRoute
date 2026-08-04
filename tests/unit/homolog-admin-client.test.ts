import { test } from "node:test";
import assert from "node:assert/strict";
import { extractJwtCookie, extractApiKey } from "../../scripts/homolog/lib/adminClient.mjs";

test("extrai o cookie JWT do set-cookie do login", () => {
  const jwt = extractJwtCookie(["auth_token=abc.def.ghi; Path=/; HttpOnly; SameSite=Lax"]);
  assert.equal(jwt, "auth_token=abc.def.ghi");
});

test("retorna null sem set-cookie de token", () => {
  assert.equal(extractJwtCookie(["other=1; Path=/"]), null);
});

test("extrai key e id do POST /api/keys", () => {
  const r = extractApiKey({ key: "or-abc123", id: "k1", name: "homolog-run" });
  assert.deepEqual(r, { key: "or-abc123", id: "k1" });
});
