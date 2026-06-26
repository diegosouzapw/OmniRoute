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
// Stale-enforcement (6A.3): entradas em INTENTIONALLY_INTERNAL / EXTERNAL_DB_ALLOWED
// que não suprimem nenhuma violação real → gate falha com instrução de remoção.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertNoStale } from "./lib/allowlist.mjs";

const cwd = process.cwd();
const DB_DIR = path.join(cwd, "src/lib/db");
const LOCAL_DB = path.join(cwd, "src/lib/localDb.ts");
const API_DIR = path.join(cwd, "src/app/api");
const HANDLERS_DIR = path.join(cwd, "open-sse/handlers");

// (a) Módulos db/ que NÃO são re-exportados por localDb.ts por DESIGN (Hard Rule #2:
// "Never barrel-import from localDb.ts — import specific db/ modules instead").
// Cada entrada aqui foi auditada e é consumida via import direto de "@/lib/db/X"
// (estático ou dinâmico) pelos seus consumidores — exatamente o padrão correto.
// Re-exportar esses módulos via localDb.ts INCENTIVARIA o anti-padrão proibido.
// O gate ainda bloqueia QUALQUER módulo db/ NOVO que não seja re-exportado E não
// esteja nessa lista — mantendo a decisão consciente obrigatória (Hard Rule #2).
// Legenda de classificação:
//   type-only          = exporta apenas tipos (sem runtime API), não há o que re-exportar
//   db-internal        = importado apenas dentro de src/lib/db/ (coordenação interna)
//   intentionally-internal = consumido por import direto fora de db/ (correto per Rule #2)
//   DEAD?              = zero importers encontrados na auditoria de 2026-06-11; não deletar
//                        sem investigação — pode ser reserva de schema ou F2 pendente
export const INTENTIONALLY_INTERNAL = new Set([
  "_rowTypes", // type-only: 5 importers internos em db/ (AgentBridge/Inspector row types)
  "accessTokens", // intentionally-internal: 4 rotas /api/cli/* (connect, whoami, tokens, tokens/[id]) + server/authz/accessTokenAuth.ts via import direto "@/lib/db/accessTokens" (Rule #2)
  "apiKeyColumnFallbacks", // db-internal: importado só por db/apiKeys.ts (API_KEY_COLUMN_FALLBACKS — fallbacks de coluna split do apiKeys.ts)
  "apiKeyUsageLimitFields", // db-internal: importado só por db/apiKeys.ts (helpers de campo de limite de uso split do apiKeys.ts; mig 101)
  "caseMapping", // db-internal: importado só por db/core.ts (toSnakeCase/toCamelCase/objToSnake — column-mapping snake↔camel split do core.ts, #4947)
  "cleanup", // intentionally-internal: 3 API routes (purge-quota-snapshots, purge-call-logs, purge-detailed-logs)
  "cliToolState", // intentionally-internal: 14+ API routes em /api/cli-tools/*-settings
  "comboForecast", // intentionally-internal: src/lib/usage/comboForecast.ts
  "commandCodeAuth", // intentionally-internal: 5 API routes em /api/providers/command-code/auth/*
  "compression", // intentionally-internal: 2 API routes (settings/compression, context/rtk/config)
  "vacuumScheduler", // intentionally-internal: src/instrumentation-node.ts (dynamic import, lifecycle wiring per Rule #2)
  "detailedLogs", // intentionally-internal: 3 callers (callLogs.ts, logs/detail route, embeddings handler)
  "discovery", // DEAD?: 0 importers na auditoria de 2026-06-11; lib/discovery/index.ts não usa db/discovery
  "domainState", // intentionally-internal: 5 callers (batchWriter, circuitBreaker, costRules, fallbackPolicy, lockoutPolicy)
  "encryption", // intentionally-internal: 8+ callers (container, webhookDispatcher, cloudAgent/credentials, services/apiKey, 4+ routes, open-sse)
  "healthCheck", // db-internal: importado por db/core.ts (runDbHealthCheck)
  "jsonMigration", // intentionally-internal: src/app/api/settings/import-json/route.ts
  "migrationRunner", // db-internal: importado por db/core.ts (runMigrations ao inicializar o DB)
  "notion", // intentionally-internal: settings/notion API route + open-sse/mcp-server/tools/notionTools.ts
  "obsidian", // intentionally-internal: src/lib/obsidianSync.ts + settings/obsidian route + MCP obsidianTools.ts
  "optimizationSettings", // db-internal: imported by db/core.ts for SQLite PRAGMA application helpers that require the live adapter
  "pluginMetrics", // DEAD? (production): write path não foi conectado ainda (documentado no cabeçalho do módulo); testado por tests/unit/plugins-metrics.test.ts
  "prompts", // DEAD? (production): zero callers de produção encontrados; domínio domain/prompts.ts é independente; testado por tests/integration/proxy-pipeline.test.ts
  "providerNodeSelect", // db-internal: importado só por db/providers.ts (selectProviderNodeForConnection — lógica pura de seleção de provider node split do providers.ts, #4421)
  "providerStats", // intentionally-internal: src/app/api/provider-stats/route.ts
  "recovery", // intentionally-internal: bin/cli/runtime.mjs (import() dinâmico) + tests
  "schemaColumns", // db-internal: importado só por db/core.ts (ensureProviderConnections/UsageHistory/CallLogsColumns + hasColumn/hasTable/getTableColumns — schema-column reconciliation split do core.ts, #4948)
  "secrets", // intentionally-internal: src/instrumentation-node.ts (import() dinâmico na inicialização)
  "serviceModels", // intentionally-internal: 3 callers (services/modelSync, services/bootstrap, /api/services/9router/models)
  "stateReset", // db-internal: 3 callers dentro de src/lib/db/ (core, backup, apiKeys) para coordenação de reset
  "stats", // intentionally-internal: src/app/api/settings/database/refresh-stats/route.ts
  "tierConfig", // intentionally-internal: open-sse/services/tierResolver.ts (require() dinâmico)
]);

// Alias para retrocompatibilidade com os testes existentes que importam KNOWN_UNEXPORTED.
// O comportamento do gate é idêntico — só o nome e os comentários mudaram (#3499).
export const KNOWN_UNEXPORTED = INTENTIONALLY_INTERNAL;

// (c) Leituras de SQL contra bancos EXTERNOS, permitidas por design (#3500).
// Estas rotas NÃO consultam o DB do OmniRoute (getDbInstance) — elas abrem o
// SQLite de OUTRO aplicativo (Cursor / Kiro) para auto-importar credenciais.
// Por isso NÃO podem viver em src/lib/db/ (que é o domínio do DB do OmniRoute):
// são leituras read-only de um arquivo externo, com caminho/escopo próprios.
// Continuam no allowlist como exceção DOCUMENTADA — o gate ainda bloqueia
// QUALQUER novo SQL cru contra o DB do OmniRoute em rotas/handlers.
// Toda a dívida real da Hard Rule #5 (15 rotas internas) foi migrada para
// módulos src/lib/db/ nas slices do #3500; este set ficou só com as exceções.
const EXTERNAL_DB_ALLOWED = new Set([
  "src/app/api/oauth/cursor/auto-import/route.ts", // read-only no itemTable do SQLite do Cursor (DB externo)
  "src/app/api/oauth/kiro/auto-import/route.ts", // read-only no SQLite do Kiro (DB externo)
]);

// Alias de retrocompatibilidade (testes/consumidores que importam KNOWN_RAW_SQL).
// Comportamento do gate idêntico — só o nome e o enquadramento mudaram (#3500).
const KNOWN_RAW_SQL = EXTERNAL_DB_ALLOWED;

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

// (a) Módulos db/ que não são re-exportados e não estão na lista de
// intencionalmente-internos (INTENTIONALLY_INTERNAL). O gate falha para
// qualquer módulo NOVO que não seja re-exportado nem justificado.
export function findMissingReexports(dbModules, reexported, allowlist = INTENTIONALLY_INTERNAL) {
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
  const localDbSource = fs.readFileSync(LOCAL_DB, "utf8");

  // (a) re-export completeness
  const dbModules = collectDbModules();
  const reexported = extractReexportedModules(localDbSource);

  // Live unexported modules BEFORE allowlist filtering (needed for stale-enforcement).
  const liveUnexported = dbModules.filter((mod) => !reexported.has(mod));
  assertNoStale(INTENTIONALLY_INTERNAL, liveUnexported, "check-db-rules:unexported");

  const missing = findMissingReexports(dbModules, reexported);
  if (missing.length) {
    failures.push(
      `[#2 re-export] ${missing.length} módulo(s) db/ não re-exportado(s) por src/lib/localDb.ts:\n` +
        missing.map((m) => `  ✗ src/lib/db/${m}.ts`).join("\n") +
        `\n  → re-exporte de src/lib/localDb.ts (apenas a lista de re-export, nada de lógica)` +
        ` ou adicione a INTENTIONALLY_INTERNAL com justificativa (import direto de "@/lib/db/${missing[0]}").`
    );
  }

  // (b) localDb sem lógica
  if (hasLogic(localDbSource)) {
    failures.push(
      `[#2 sem-lógica] src/lib/localDb.ts contém lógica (function/class/arrow). É camada de` +
        ` re-export apenas — mova a lógica para um módulo src/lib/db/.`
    );
  }

  // (c) SQL cru fora de db/
  // Live raw-SQL offenders BEFORE allowlist filtering (needed for stale-enforcement).
  const scanFiles = collectSqlScanFiles();
  const liveRawSql = findRawSql(scanFiles, new Set());
  assertNoStale(EXTERNAL_DB_ALLOWED, liveRawSql, "check-db-rules:raw-sql");

  const rawSql = findRawSql(scanFiles);
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
    process.exitCode = 1;
  }
  if (!process.exitCode) {
    console.log(
      `[check-db-rules] OK (${dbModules.length} módulos db/, ${reexported.size} re-exportados, ` +
        `${INTENTIONALLY_INTERNAL.size} intencionalmente-internos (Rule #2); ${EXTERNAL_DB_ALLOWED.size} leituras de DB externo permitidas (#3500))`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
