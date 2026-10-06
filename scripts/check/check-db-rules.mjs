#!/usr/bin/env node
// scripts/check/check-db-rules.mjs
// Gate de convenções de banco (CLAUDE.md Hard Rules #2 e #5). Uma verificação:
//  (c) Nenhum SQL cru em src/app/api/**/route.ts ou open-sse/handlers/*.ts.
//      SQL deve viver em src/lib/db/ (Hard Rule #5). Ofensores pré-existentes
//      são congelados; QUALQUER novo SQL cru em rota/handler falha.
// As antigas verificações (a) re-export completo via src/lib/localDb.ts e
// (b) localDb.ts sem lógica foram REMOVIDAS: o barrel src/lib/localDb.ts foi
// deletado (#11795) — consumidores importam módulos src/lib/db/* diretamente
// (regra "never barrel-import", aplicada por eslint no-restricted-imports).
// Stale-enforcement (6A.3): entradas em EXTERNAL_DB_ALLOWED que não suprimem
// nenhuma violação real → gate falha com instrução de remoção.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertNoStale } from "./lib/allowlist.mjs";

const cwd = process.cwd();
const API_DIR = path.join(cwd, "src/app/api");
const HANDLERS_DIR = path.join(cwd, "open-sse/handlers");

// (c) Leituras de SQL contra bancos EXTERNOS, permitidas por design (#3500).
// Esta rota NÃO consulta o DB do OmniRoute (getDbInstance) — ela abre o
// SQLite de OUTRO aplicativo (Kiro) para auto-importar credenciais.
// Por isso NÃO pode viver em src/lib/db/ (que é o domínio do DB do OmniRoute):
// é uma leitura read-only de um arquivo externo, com caminho/escopo próprio.
// Continua no allowlist como exceção DOCUMENTADA — o gate ainda bloqueia
// QUALQUER novo SQL cru contra o DB do OmniRoute em rotas/handlers.
// Toda a dívida real da Hard Rule #5 (15 rotas internas) foi migrada para
// módulos src/lib/db/ nas slices do #3500; este set ficou só com as exceções.
// O análogo do Cursor (src/app/api/oauth/cursor/auto-import/route.ts) NÃO
// precisa de entrada aqui: o SQL contra o state.vscdb externo do Cursor vive
// em src/lib/cursor/tokenExtractor.ts, fora do escopo desta checagem (que só
// varre src/app/api/**/route.ts e open-sse/handlers/*.ts).
export const EXTERNAL_DB_ALLOWED = new Set([
  "src/app/api/oauth/kiro/auto-import/route.ts", // read-only no SQLite do Kiro (DB externo)
]);

// Alias de retrocompatibilidade (testes/consumidores que importam KNOWN_RAW_SQL).
// Comportamento do gate idêntico — só o nome e o enquadramento mudaram (#3500).
export const KNOWN_RAW_SQL = EXTERNAL_DB_ALLOWED;

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
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
  return out.join("\n\u0000\n"); // separador que nenhum padrão SQL atravessa
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
    // Match each literal independently. Joining literals before scanning would
    // turn harmless code such as `update(...)` plus a later `"set"` string into
    // a false UPDATE ... SET SQL match.
    const literals = extractStringLiterals(stripComments(src)).split("\n\u0000\n");
    if (literals.some((literal) => SQL_PATTERNS.some((rx) => rx.test(literal)))) {
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
      `[check-db-rules] OK (${scanFiles.length} arquivos varridos; ` +
        `${EXTERNAL_DB_ALLOWED.size} leituras de DB externo permitidas (#3500))`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
