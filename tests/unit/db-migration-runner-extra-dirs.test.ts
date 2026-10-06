// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs or exercises a real better-sqlite3-backed SQLite database.
// better-sqlite3 is a native addon; production and CI load it normally, but some
// sandboxes/dev boxes ship a system glibc older than the prebuilt binary requires
// ("GLIBC_2.29 not found"), so the native module fails to dlopen and any test that
// reaches better-sqlite3 directly (or asserts stdout that the load-failure warning
// would pollute) fails HERE while passing in CI. This is a known environment
// limitation, not a defect in the code under test: the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 is unavailable. See
// tests/unit/_helpers/betterSqlite3Availability.ts for a guard helper.
/**
 * tests/unit/db-migration-runner-extra-dirs.test.ts
 *
 * Extra migration directories with a namespaced version space.
 *
 * The runner reads exactly one directory (`MIGRATIONS_DIR`) and requires every
 * file to be `NNN_name.sql`, recording the bare number as the version. That makes
 * the numeric slots a single global namespace: any distribution that ships its own
 * migrations alongside the upstream set has to pick numbers out of the same range,
 * and upstream keeps appending to it. When both sides claim a number, the runner
 * records one name for it and silently treats the other as already applied — the
 * migration never runs, on every already-provisioned database.
 *
 * This suite pins the extension point: `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` maps
 * `namespace=directory` entries (separated by `path.delimiter`), and files found
 * there are recorded as `<namespace>-<number>` so they can never collide with the
 * upstream numeric slots. Unset (the default, and always the case for a plain
 * install) the runner behaves exactly as before.
 *
 * Misconfiguration fails LOUDLY rather than silently skipping schema — a typo'd
 * namespace or a moved directory is the same class of defect this mechanism
 * exists to prevent.
 *
 * TEST SHAPE — read before editing. Two constraints, both learned from CI:
 *
 *  1. `MIGRATIONS_DIR` is resolved ONCE, at module evaluation of
 *     migrationRunner.ts, so the core directory is fixed here BEFORE the first
 *     import and never changed again. Re-importing under a cache-busting query
 *     string to pick up a new value is not reliable under the loader chain CI uses
 *     (`--import tsx/esm --import setupPolyfill --import isolateDataDir`); an
 *     earlier revision did that, passed locally and failed in CI. The extra
 *     directories, by contrast, are resolved at CALL time, so each test varies only
 *     `OMNIROUTE_EXTRA_MIGRATIONS_DIRS`.
 *
 *  2. Tests are registered WITHOUT top-level `await`. The bodies are synchronous,
 *     so awaiting each one drains the event loop between tests and `--test-force-exit`
 *     (used by every CI test script) cancels the rest of the file.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const tempDirs: string[] = [];

function mkTempDir(prefix: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
}

function writeMigrations(dir: string, files: Record<string, string>): void {
  for (const [name, sql] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, name), sql, "utf-8");
  }
}

// ── The core directory must be fixed BEFORE migrationRunner.ts is imported ──────
const CORE_DIR = mkTempDir("mig-core-");
writeMigrations(CORE_DIR, {
  "001_initial_schema.sql": "CREATE TABLE core_one (id INTEGER);",
  "002_core_two.sql": "CREATE TABLE core_two (id INTEGER);",
});
process.env.OMNIROUTE_MIGRATIONS_DIR = CORE_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

// Cleanup on process exit, NOT via test.after(): the root after-hook fires as soon
// as the first top-level test settles, while a later test has already registered its
// directories and is sitting on an `await` — it would delete a directory still in use.
process.on("exit", () => {
  for (const dir of tempDirs) {
    try {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      /* ignore */
    }
  }
});

interface RunResult {
  count: number;
  rows: Array<{ version: string; name: string }>;
  tables: string[];
}

/** Run the migrations against a fresh in-memory DB with the given extra-dir spec. */
function runWithExtras(extraSpec: string | null): RunResult {
  const prev = process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;
  if (extraSpec === null) delete process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;
  else process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS = extraSpec;

  const db = new Database(":memory:");
  try {
    const count = runMigrations(db as never, { isNewDb: true });
    const rows = db
      .prepare("SELECT version, name FROM _omniroute_migrations ORDER BY rowid")
      .all() as Array<{ version: string; name: string }>;
    const tables = (
      db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all() as Array<{
        name: string;
      }>
    ).map((r) => r.name);
    return { count, rows, tables };
  } finally {
    db.close();
    if (prev === undefined) delete process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;
    else process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS = prev;
  }
}

test("sem a env, o runner só enxerga o diretório core (comportamento atual)", async () => {
  const r = runWithExtras(null);
  assert.deepEqual(
    r.rows.map((x) => x.version),
    ["001", "002"]
  );
  assert.ok(r.tables.includes("core_one") && r.tables.includes("core_two"));
});

test("migration de diretório extra é aplicada e gravada com versão namespaced", async () => {
  const eeDir = mkTempDir("mig-ee-");
  writeMigrations(eeDir, { "001_ee_lending.sql": "CREATE TABLE ee_lending (id INTEGER);" });

  const r = runWithExtras(`ee=${eeDir}`);

  assert.ok(
    r.tables.includes("ee_lending"),
    `a migration do diretório extra deve ter rodado; count=${r.count} ` +
      `rows=${JSON.stringify(r.rows)} tabelas=${r.tables.join(", ")}`
  );
  assert.deepEqual(
    r.rows.map((x) => x.version),
    ["001", "002", "ee-001"],
    "o número do diretório extra é gravado prefixado pelo namespace e depois das core"
  );
  assert.equal(r.rows.at(-1)?.name, "ee_lending");
});

test("o mesmo número em core e em diretório extra NÃO colide — ambas rodam", async () => {
  const eeDir = mkTempDir("mig-collide-");
  // Mesmo prefixo numérico de uma migration core: é exatamente o caso que hoje
  // faz uma das duas ser silenciosamente considerada já aplicada.
  writeMigrations(eeDir, { "002_ee_same_slot.sql": "CREATE TABLE ee_same_slot (id INTEGER);" });

  const r = runWithExtras(`ee=${eeDir}`);

  assert.ok(r.tables.includes("core_two"), "a core 002 deve ter rodado");
  assert.ok(r.tables.includes("ee_same_slot"), "a extra 002 deve ter rodado também");
  assert.deepEqual(
    r.rows.map((x) => x.version),
    ["001", "002", "ee-002"]
  );
});

test("dois namespaces extras coexistem, cada um no seu espaço de versão", async () => {
  const a = mkTempDir("mig-nsa-");
  const b = mkTempDir("mig-nsb-");
  writeMigrations(a, { "001_from_a.sql": "CREATE TABLE from_a (id INTEGER);" });
  writeMigrations(b, { "001_from_b.sql": "CREATE TABLE from_b (id INTEGER);" });

  const r = runWithExtras(`ee=${a}${path.delimiter}lab=${b}`);

  assert.ok(r.tables.includes("from_a") && r.tables.includes("from_b"));
  assert.deepEqual(
    r.rows.map((x) => x.version),
    ["001", "002", "ee-001", "lab-001"]
  );
});

test("número duplicado DENTRO de um namespace extra é erro (não pode ser pulado em silêncio)", async () => {
  const eeDir = mkTempDir("mig-dup-");
  writeMigrations(eeDir, {
    "003_first.sql": "CREATE TABLE ee_first (id INTEGER);",
    "003_second.sql": "CREATE TABLE ee_second (id INTEGER);",
  });

  assert.throws(
    () => runWithExtras(`ee=${eeDir}`),
    /collision/i,
    "duas migrations com o mesmo número no mesmo namespace têm que estourar"
  );
});

test("spec malformada estoura em vez de ignorar o diretório", async () => {
  const eeDir = mkTempDir("mig-malformed-");
  writeMigrations(eeDir, { "001_x.sql": "CREATE TABLE x (id INTEGER);" });

  assert.throws(
    () => runWithExtras(eeDir), // sem "namespace="
    /OMNIROUTE_EXTRA_MIGRATIONS_DIRS/,
    "entrada sem namespace= é configuração inválida, não um diretório a ignorar"
  );
});

test("namespace inválido estoura (só minúsculas/dígitos, começando por letra)", async () => {
  const eeDir = mkTempDir("mig-badns-");
  writeMigrations(eeDir, { "001_x.sql": "CREATE TABLE x (id INTEGER);" });

  assert.throws(
    () => runWithExtras(`EE Corp=${eeDir}`),
    /namespace/i,
    "namespace fora de [a-z][a-z0-9]* tem que estourar"
  );
});

test("diretório configurado que não existe estoura (schema faltando em silêncio é o bug)", async () => {
  const missing = path.join(os.tmpdir(), `mig-nao-existe-${process.pid}`);
  assert.throws(
    () => runWithExtras(`ee=${missing}`),
    /does not exist/i,
    "um diretório explicitamente configurado e ausente é erro de configuração"
  );
});

test("arquivos que não casam NNN_nome.sql são ignorados, como no diretório core", async () => {
  const eeDir = mkTempDir("mig-junk-");
  writeMigrations(eeDir, {
    "001_ok.sql": "CREATE TABLE ee_ok (id INTEGER);",
    "README.md": "# não é migration",
    "rascunho.sql": "CREATE TABLE nope (id INTEGER);",
  });

  const r = runWithExtras(`ee=${eeDir}`);

  assert.ok(r.tables.includes("ee_ok"));
  assert.ok(!r.tables.includes("nope"), "arquivo .sql sem prefixo numérico não deve rodar");
  assert.deepEqual(
    r.rows.map((x) => x.version),
    ["001", "002", "ee-001"]
  );
});

test("diretório core ausente não impede as migrations dos extras", async () => {
  // O runner devolve [] assim que MIGRATIONS_DIR não existe. Os extras são um
  // conjunto independente: um core ausente não pode fazê-los desaparecer em
  // silêncio — é a mesma falha de "schema some sem avisar" que isto previne.
  // MIGRATIONS_DIR é lido a cada chamada por fs.existsSync, então basta remover
  // o diretório durante o teste e recriá-lo depois.
  const eeDir = mkTempDir("mig-extra-only-");
  writeMigrations(eeDir, { "001_ee_solo.sql": "CREATE TABLE ee_solo (id INTEGER);" });

  const backup = fs.readdirSync(CORE_DIR).map((f) => ({
    name: f,
    body: fs.readFileSync(path.join(CORE_DIR, f), "utf-8"),
  }));
  fs.rmSync(CORE_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  try {
    const r = runWithExtras(`ee=${eeDir}`);
    assert.ok(r.tables.includes("ee_solo"), `tabelas: ${r.tables.join(", ")}`);
    assert.deepEqual(
      r.rows.map((x) => x.version),
      ["ee-001"]
    );
  } finally {
    fs.mkdirSync(CORE_DIR, { recursive: true });
    for (const f of backup) fs.writeFileSync(path.join(CORE_DIR, f.name), f.body, "utf-8");
  }
});

test("rodar duas vezes não reaplica as migrations do diretório extra", async () => {
  const eeDir = mkTempDir("mig-idem-");
  writeMigrations(eeDir, { "001_ee_idem.sql": "CREATE TABLE ee_idem (id INTEGER);" });

  const prev = process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;
  process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS = `ee=${eeDir}`;
  const db = new Database(":memory:");
  try {
    const first = runMigrations(db as never, { isNewDb: true });
    const second = runMigrations(db as never);
    assert.equal(first, 3, "primeira execução aplica core 001/002 + ee-001");
    assert.equal(second, 0, "segunda execução não tem nada pendente");
  } finally {
    db.close();
    if (prev === undefined) delete process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;
    else process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS = prev;
  }
});
