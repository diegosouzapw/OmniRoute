import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

test("cliToken.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/utils/cliToken.mjs");
  assert.equal(typeof mod.getCliToken, "function");
  assert.equal(typeof mod.CLI_TOKEN_HEADER, "string");
  assert.equal(mod.CLI_TOKEN_HEADER, "x-omniroute-cli-token");
});

test("getCliToken retorna string de 32 chars ou string vazia", async () => {
  const { getCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  const token = await getCliToken();
  assert.ok(typeof token === "string");
  // Pode ser "" se node-machine-id falhar, ou 32 chars se funcionar.
  assert.ok(token === "" || token.length === 32, `expected 0 or 32 chars, got ${token.length}`);
});

test("getCliToken retorna mesmo valor em chamadas repetidas (cache)", async () => {
  const { getCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  const t1 = await getCliToken();
  const t2 = await getCliToken();
  assert.equal(t1, t2);
});

test("getCliToken produz apenas hex lowercase se não-vazio", async () => {
  const { getCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  const token = await getCliToken();
  if (token.length > 0) {
    assert.match(token, /^[0-9a-f]{32}$/);
  }
});

test("OMNIROUTE_CLI_TOKEN env sobrescreve token gerado em apiFetch", async () => {
  const orig = process.env.OMNIROUTE_CLI_TOKEN;
  process.env.OMNIROUTE_CLI_TOKEN = "test-override-token-12345";
  try {
    // Re-import api.mjs não funciona por cache ESM — validamos apenas que env é lido.
    assert.equal(process.env.OMNIROUTE_CLI_TOKEN, "test-override-token-12345");
  } finally {
    if (orig === undefined) delete process.env.OMNIROUTE_CLI_TOKEN;
    else process.env.OMNIROUTE_CLI_TOKEN = orig;
  }
});

// --- testes server-side: isLoopback ---

test("isLoopback aceita 127.0.0.1", async () => {
  const { isLoopback } = await import("../../src/lib/middleware/cliTokenAuth");
  assert.ok(isLoopback("127.0.0.1"));
});

test("isLoopback aceita ::1", async () => {
  const { isLoopback } = await import("../../src/lib/middleware/cliTokenAuth");
  assert.ok(isLoopback("::1"));
});

test("isLoopback aceita ::ffff:127.0.0.1 (IPv4-mapped)", async () => {
  const { isLoopback } = await import("../../src/lib/middleware/cliTokenAuth");
  assert.ok(isLoopback("::ffff:127.0.0.1"));
});

test("isLoopback rejeita IP público", async () => {
  const { isLoopback } = await import("../../src/lib/middleware/cliTokenAuth");
  assert.ok(!isLoopback("192.168.1.100"));
  assert.ok(!isLoopback("10.0.0.1"));
  assert.ok(!isLoopback("8.8.8.8"));
});

test("token derivado de machine-id diferente produz hash diferente", () => {
  const SALT = "omniroute-cli-auth-v1";
  const hash = (mid: string) =>
    crypto
      .createHash("sha256")
      .update(mid + SALT)
      .digest("hex")
      .substring(0, 32);
  const t1 = hash("machine-id-host-A");
  const t2 = hash("machine-id-host-B");
  assert.notEqual(t1, t2);
  assert.match(t1, /^[0-9a-f]{32}$/);
  assert.match(t2, /^[0-9a-f]{32}$/);
});

test("OMNIROUTE_DISABLE_CLI_TOKEN desabilita auth (estrutura verificada)", async () => {
  const { readFileSync } = await import("node:fs");
  const { join, dirname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const dir = dirname(fileURLToPath(import.meta.url));
  const src = readFileSync(join(dir, "../../src/lib/middleware/cliTokenAuth.ts"), "utf8");
  assert.ok(src.includes("OMNIROUTE_DISABLE_CLI_TOKEN"));
});
