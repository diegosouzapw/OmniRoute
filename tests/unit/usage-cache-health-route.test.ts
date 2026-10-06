/**
 * Route contract for GET /api/usage/cache-health.
 *
 * Uses a real on-disk SQLite so the SQL itself is exercised — a summary that
 * silently returns zeros because the WHERE clause is wrong is worse than no
 * endpoint at all, and only a real query catches that.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-health-"));
process.env.DATA_DIR = tmpDir;

// Cleanup on exit, not in test.after(): a root after-hook fires as soon as the
// first top-level test settles and would delete the directory out from under
// the later ones.
process.on("exit", () => {
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* best effort */
  }
});

const { getDbInstance, resetDbInstance } = await import("@/lib/db/core");
const { buildCacheHealthResponse } = await import("@/lib/usage/cacheHealth");
const { GET } = await import("@/app/api/usage/cache-health/route");

const NOW = Date.parse("2026-07-28T03:00:00.000Z");

function seed() {
  const db = getDbInstance();
  db.prepare("DELETE FROM call_logs").run();
  const insert = db.prepare(
    `INSERT INTO call_logs (id, timestamp, status, model, requested_model,
       tokens_cache_read, tokens_cache_creation)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  const iso = (minsAgo: number) => new Date(NOW - minsAgo * 60_000).toISOString();

  // dentro da janela de 1h: um write inicial + dois reads (padrão saudável)
  insert.run("a1", iso(10), 200, "claude-sonnet-5", "claude-sonnet-5", 0, 11660);
  insert.run("a2", iso(9), 200, "claude-sonnet-5", "claude-sonnet-5", 11660, 14);
  insert.run("a3", iso(8), 200, "claude-sonnet-5", "claude-sonnet-5", 11674, 15);
  // uma chamada cara do mesmo período, modelo diferente
  insert.run("a4", iso(7), 200, "claude-opus-4-8", "claude-opus-4-8", 37509, 91878);
  // ruído que NÃO pode entrar: erro, fora da janela, e linha sem contabilidade de cache
  insert.run("b1", iso(5), 500, "claude-sonnet-5", "claude-sonnet-5", 999999, 999999);
  insert.run("b2", iso(600), 200, "claude-sonnet-5", "claude-sonnet-5", 888888, 888888);
  insert.run("b3", iso(4), 200, "claude-sonnet-5", "claude-sonnet-5", null, null);
}

test("resume a janela ignorando erro, fora-da-janela e linhas sem contabilidade", () => {
  seed();
  const r = buildCacheHealthResponse({ range: "1h", now: NOW });

  assert.equal(r.totalCalls, 4, "só as 4 chamadas 200 dentro de 1h com colunas de cache");
  assert.equal(r.cacheReadTotal, 0 + 11660 + 11674 + 37509);
  assert.equal(r.cacheWriteTotal, 11660 + 14 + 15 + 91878);
  assert.equal(r.timeRange, "1h");
  assert.equal(r.truncated, false);
  assert.ok(
    !JSON.stringify(r).includes("999999") && !JSON.stringify(r).includes("888888"),
    "o 500 e a linha antiga não podem vazar para o resumo"
  );
});

test("filtra por modelo quando pedido", () => {
  seed();
  const r = buildCacheHealthResponse({ range: "1h", model: "claude-opus-4-8", now: NOW });

  assert.equal(r.totalCalls, 1);
  assert.equal(r.byModel.length, 1);
  assert.equal(r.byModel[0].model, "claude-opus-4-8");
});

test("GET responde 200 com o resumo", async () => {
  seed();
  const res = await GET(new Request("http://localhost/api/usage/cache-health?range=1h"));
  assert.equal(res.status, 200);

  const body = await res.json();
  assert.equal(body.timeRange, "1h");
  assert.equal(typeof body.writeReadRatio, "number");
  assert.ok(Array.isArray(body.byModel));
  assert.ok(["healthy", "degraded", "thrash", "no-data"].includes(body.verdict));
});

test("GET rejeita range inválido com 400", async () => {
  const res = await GET(new Request("http://localhost/api/usage/cache-health?range=99y"));
  assert.equal(res.status, 400);
});

test("GET assume 24h quando o range é omitido", async () => {
  seed();
  const res = await GET(new Request("http://localhost/api/usage/cache-health"));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).timeRange, "24h");
});

test("erro interno responde 500 sem vazar stack trace nem SQL", async () => {
  // Gatilho determinístico: sem a tabela, o prepare() lança SqliteError. Um
  // DATA_DIR inválido NÃO serve — o driver fica preso tentando criar o arquivo
  // em vez de falhar, e o teste passaria sem exercitar o catch.
  seed();
  const db = getDbInstance();
  db.prepare("DROP TABLE call_logs").run();
  try {
    const res = await GET(new Request("http://localhost/api/usage/cache-health?range=1h"));
    assert.equal(res.status, 500, "o caminho de erro precisa ser realmente exercitado");

    const text = JSON.stringify(await res.json());
    assert.ok(!text.includes("at /"), "sem stack trace no corpo");
    assert.ok(!/\.ts:\d+/.test(text), "sem caminho de arquivo no corpo");
    assert.ok(!/SELECT|call_logs/i.test(text), "sem o texto do SQL nem nome de tabela no corpo");
  } finally {
    resetDbInstance();
  }
});
