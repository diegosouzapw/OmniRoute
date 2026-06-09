#!/usr/bin/env node
// scripts/check/check-db-rules.mjs
// Gate de convenções de banco (CLAUDE.md Hard Rules #2 e #5). Três verificações:
//  (a) Todo módulo de domínio em src/lib/db/*.ts deve ser re-exportado por
//      src/lib/localDb.ts (camada de compat). Um módulo db NOVO que não é
//      re-exportado (e não está congelado) falha — força a decisão consciente
//      de expor ou justificar (Hard Rule #2).
//  (b) src/lib/localDb.ts é APENAS camada de re-export: nada de lógica
//      (function/class/arrow de negócio). Mata o anti-padrão de "só uma
//      funçãozinha aqui" que vira regra de negócio fora dos módulos db/.
//  (c) Nenhum SQL cru em src/app/api/**/route.ts ou open-sse/handlers/*.ts.
//      SQL deve viver em src/lib/db/ (Hard Rule #5). Ofensores pré-existentes
//      são congelados; QUALQUER novo SQL cru em rota/handler falha.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const cwd = process.cwd();
const DB_DIR = path.join(cwd, "src/lib/db");
const LOCAL_DB = path.join(cwd, "src/lib/localDb.ts");
const API_DIR = path.join(cwd, "src/app/api");
const HANDLERS_DIR = path.join(cwd, "open-sse/handlers");

// (a) Módulos db/ que NÃO são re-exportados por localDb.ts hoje. Congelados
// para a catraca ficar verde e bloquear QUALQUER módulo novo não re-exportado.
// CADA UM é dívida: ou é consumido por import direto de "@/lib/db/X" (legítimo,
// não precisa de re-export) ou deveria ser re-exportado. NÃO adicione novos aqui
// sem justificativa — esse é o ponto do gate (Hard Rule #2).
const KNOWN_UNEXPORTED = new Set([
  "_rowTypes", // só tipos de linha (sem runtime API), consumido localmente pelos CRUDs F2
  "cleanup", // rotina de manutenção, chamada por jobs/rotas via import direto
  "cliToolState", // estado de CLI tools, import direto pelos consumidores
  "comboForecast", // previsão de combo, import direto
  "commandCodeAuth", // auth de command-code, import direto
  "compression", // núcleo de compressão, import direto
  "compressionScheduler", // scheduler, import direto
  "detailedLogs", // logs detalhados, import direto
  "discovery", // discovery de modelos, import direto
  "domainState", // estado de domínio/circuit breaker, import direto
  "encryption", // util de cripto at-rest, import direto
  "healthCheck", // health check de DB, import direto
  "jsonMigration", // migração JSON→SQLite (one-shot), import direto
  "migrationRunner", // runner de migrations, import direto
  "notion", // integração Notion, import direto
  "obsidian", // integração Obsidian, import direto
  "pluginMetrics", // métricas de plugin, import direto
  "prompts", // prompts salvos, import direto
  "providerStats", // stats de provider, import direto
  "recovery", // recuperação de DB, import direto
  "secrets", // secrets store, import direto
  "serviceModels", // modelos de serviços embutidos, import direto
  "stateReset", // reset de estado de resiliência, import direto
  "stats", // agregações de stats, import direto
  "tierConfig", // config de tier, import direto
]);

// (c) Ofensores de SQL cru PRÉ-EXISTENTES em rotas/handlers. Congelados para a
// catraca ficar verde e bloquear QUALQUER nova rota/handler com SQL inline.
// CADA UM é dívida da Hard Rule #5: mover para um módulo src/lib/db/. NÃO
// adicione novos aqui sem justificativa — crie/estenda um módulo db/ em vez disso.
// (Chaves = caminho relativo POSIX a partir da raiz do repo.)
const KNOWN_RAW_SQL = new Set([
  "src/app/api/analytics/auto-routing/route.ts", // SELECT … FROM usage_logs
  "src/app/api/cache/entries/route.ts", // semantic_cache COUNT/DELETE inline
  "src/app/api/db-backups/exportAll/route.ts", // SELECT key_value/combos/connections/keys
  "src/app/api/db-backups/import/route.ts", // SELECT sqlite_master + COUNTs
  "src/app/api/gamification/federation/leaderboard/route.ts", // SELECT community_servers
  "src/app/api/gamification/federation/score/route.ts", // SELECT community_servers
  "src/app/api/logs/export/route.ts", // SELECT de proxy_logs
  "src/app/api/oauth/cursor/auto-import/route.ts", // SELECT no itemTable do Cursor (DB externo)
  "src/app/api/oauth/kiro/auto-import/route.ts", // SELECT no SQLite do Kiro (DB externo)
  "src/app/api/provider-metrics/route.ts", // SELECT … FROM call_logs (agregação)
  "src/app/api/search/stats/route.ts", // SELECT … FROM call_logs
  "src/app/api/settings/export-json/route.ts", // SELECT * de usage_history/domain_*
  "src/app/api/skills/[id]/route.ts", // UPDATE skills SET dinâmico
  "src/app/api/usage/analytics/route.ts", // SELECT … FROM usage_history/daily_usage_summary
  "src/app/api/v1/search/analytics/route.ts", // SELECT … FROM call_logs (request_type=search)
]);

// Módulos sempre excluídos da checagem (a): não são domínio re-exportável.
const DB_MODULE_EXCLUDE = new Set(["core", "localDb", "index"]);

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

// Lista os módulos de domínio em src/lib/db (top-level *.ts), excluindo
// core/localDb/index, *.d.ts e qualquer subdiretório (migrations/, adapters/, __tests__/).
export function collectDbModules(dbDir = DB_DIR) {
  if (!fs.existsSync(dbDir)) return [];
  return fs
    .readdirSync(dbDir, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.ts$/.test(e.name) && !/\.d\.ts$/.test(e.name))
    .map((e) => e.name.replace(/\.ts$/, ""))
    .filter((name) => !DB_MODULE_EXCLUDE.has(name))
    .sort();
}

// Extrai os nomes de módulo re-exportados de localDb.ts a partir de
// `... from "./db/X"` (cobre export {…}, export * e export type {…}).
export function extractReexportedModules(localDbSource) {
  const re = /from\s+["']\.\/db\/([A-Za-z0-9_]+)["']/g;
  const out = new Set();
  let m;
  while ((m = re.exec(localDbSource))) out.add(m[1]);
  return out;
}

// (a) Módulos db/ que não são re-exportados e não estão congelados.
export function findMissingReexports(dbModules, reexported, allowlist = KNOWN_UNEXPORTED) {
  return dbModules.filter((mod) => !reexported.has(mod) && !allowlist.has(mod));
}

// (b) localDb.ts deve conter SOMENTE import/export + comentários (sem lógica).
// Remove comentários e strings, depois procura declarações de runtime.
export function hasLogic(localDbSource) {
  const stripped = localDbSource
    // comentários de bloco
    .replace(/\/\*[\s\S]*?\*\//g, "")
    // comentários de linha
    .replace(/\/\/[^\n]*/g, "")
    // template strings
    .replace(/`(?:\\[\s\S]|[^\\`])*`/g, '""')
    // strings simples/duplas (paths de import etc.)
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/'(?:\\.|[^'\\])*'/g, '""');

  // function/class declaradas, ou atribuição a função (const X = (…) =>, const X = function).
  const logicPatterns = [
    /(^|[^.\w])function\s+[A-Za-z_$]/, // function decl (não method .foo())
    /(^|[^.\w])class\s+[A-Za-z_$]/, // class decl
    /(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*(?:async\s*)?\(/, // const X = (…) ... (arrow/call)
    /(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*(?:async\s+)?function\b/, // const X = function
  ];
  return logicPatterns.some((rx) => rx.test(stripped));
}

// SQL cru é sempre uma STRING passada a db.prepare()/exec(): casamos os padrões
// SÓ dentro de literais de string (não em código JS — `import … from`, `.set(`,
// `new Set(`, `delete x` etc. são falsos positivos se varrermos o código todo).
const SQL_PATTERNS = [
  /\bSELECT\b[\s\S]*?\bFROM\b/i, // SELECT … FROM (multi-linha)
  /\bINSERT\s+INTO\b/i,
  /\bUPDATE\b[\s\S]*?\bSET\b/i, // UPDATE … SET (multi-linha)
  /\bDELETE\s+FROM\b/i,
  /\bCREATE\s+TABLE\b/i,
];

// Remove comentários (linha // … e blocos /* */) — SQL em comentário não conta.
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
}

// Extrai o conteúdo de todos os literais de string (template, aspas duplas, aspas
// simples) de um trecho de código já sem comentários. Retorna a concatenação dos
// corpos — é nesse corpo que SQL cru vive.
export function extractStringLiterals(code) {
  const re = /`(?:\\[\s\S]|[^\\`])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g;
  const out = [];
  let m;
  while ((m = re.exec(code))) {
    // tira as aspas/crases delimitadoras
    out.push(m[0].slice(1, -1));
  }
  return out.join("\n \n"); // separador que nenhum padrão SQL atravessa
}

// (c) Arquivos com SQL cru dentro de literais de string (linhas não-comentário),
// fora do allowlist.
export function findRawSql(files, allowlist = KNOWN_RAW_SQL) {
  const offenders = [];
  for (const file of files) {
    const rel = path.relative(cwd, file).replace(/\\/g, "/");
    if (allowlist.has(rel)) continue;
    let src;
    try {
      src = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }
    const literals = extractStringLiterals(stripComments(src));
    if (SQL_PATTERNS.some((rx) => rx.test(literals))) {
      offenders.push(rel);
    }
  }
  return offenders;
}

// Coleta os arquivos sujeitos à checagem (c): rotas de API + handlers de stream.
export function collectSqlScanFiles(apiDir = API_DIR, handlersDir = HANDLERS_DIR) {
  const routes = walk(apiDir).filter((p) => /(^|\/)route\.tsx?$/.test(p.replace(/\\/g, "/")));
  const handlers = fs.existsSync(handlersDir)
    ? fs
        .readdirSync(handlersDir, { withFileTypes: true })
        .filter((e) => e.isFile() && /\.tsx?$/.test(e.name))
        .map((e) => path.join(handlersDir, e.name))
    : [];
  return [...routes, ...handlers];
}

function main() {
  const failures = [];

  // (a) re-export completeness
  const dbModules = collectDbModules();
  const reexported = extractReexportedModules(fs.readFileSync(LOCAL_DB, "utf8"));
  const missing = findMissingReexports(dbModules, reexported);
  if (missing.length) {
    failures.push(
      `[#2 re-export] ${missing.length} módulo(s) db/ não re-exportado(s) por src/lib/localDb.ts:\n` +
        missing.map((m) => `  ✗ src/lib/db/${m}.ts`).join("\n") +
        `\n  → re-exporte de src/lib/localDb.ts (apenas a lista de re-export, nada de lógica)` +
        ` ou adicione a KNOWN_UNEXPORTED com justificativa (import direto de "@/lib/db/${missing[0]}").`
    );
  }

  // (b) localDb sem lógica
  if (hasLogic(fs.readFileSync(LOCAL_DB, "utf8"))) {
    failures.push(
      `[#2 sem-lógica] src/lib/localDb.ts contém lógica (function/class/arrow). É camada de` +
        ` re-export apenas — mova a lógica para um módulo src/lib/db/.`
    );
  }

  // (c) SQL cru fora de db/
  const rawSql = findRawSql(collectSqlScanFiles());
  if (rawSql.length) {
    failures.push(
      `[#5 sql-cru] ${rawSql.length} arquivo(s) com SQL cru fora de src/lib/db/:\n` +
        rawSql.map((f) => `  ✗ ${f}`).join("\n") +
        `\n  → mova o SQL para um módulo src/lib/db/ (nunca SQL cru em rota/handler)` +
        ` ou congele em KNOWN_RAW_SQL com justificativa.`
    );
  }

  if (failures.length) {
    console.error(`[check-db-rules] FALHOU:\n\n` + failures.join("\n\n"));
    process.exit(1);
  }
  console.log(
    `[check-db-rules] OK (${dbModules.length} módulos db/, ${reexported.size} re-exportados, ` +
      `${KNOWN_UNEXPORTED.size} congelados; ${KNOWN_RAW_SQL.size} ofensores de SQL congelados)`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
