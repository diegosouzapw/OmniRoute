#!/usr/bin/env node
// scripts/check/check-migration-numbering.mjs
// Gate de numeração de migrations: protege src/lib/db/migrations/ contra regressões
// de numeração. WHY: um incidente destrutivo aconteceu DUAS VEZES — um `git rm` de
// uma migration duplicada durante um merge apagou uma migration REAL da release
// (094/095 em #3365/#3371). Este gate cria uma ligação de CI entre o disco e as
// anomalias já reconhecidas em migrationRunner.ts, falhando em QUALQUER:
//   - nome de arquivo sem prefixo numérico zero-padded (NNN_*.sql);
//   - prefixo de versão DUPLICADO no disco (exceto duplicatas já reconhecidas);
//   - NOVO gap inexplicado na sequência (gaps conhecidos 026/055 são congelados).
// As anomalias conhecidas são derivadas das listas de migrationRunner.ts
// (LEGACY_VERSION_SLOT_MIGRATIONS / SUPERSEDED_DUPLICATE_MIGRATIONS) + a auditoria
// de gaps de sequência. NÃO adicione novos itens sem justificativa — esse é o ponto.
// Stale-enforcement (6A.3): entrada em KNOWN_GAPS / KNOWN_DUPLICATE_VERSIONS que não
// suprime nenhuma anomalia real → gate falha com instrução de remoção.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertNoStale } from "./lib/allowlist.mjs";

const cwd = process.cwd();
const MIGRATIONS_DIR = path.join(cwd, "src/lib/db/migrations");

// Convenção de nome: NNN_descricao.sql (prefixo numérico zero-padded de >= 3 dígitos).
// Mesmo regex usado pelo runner de produção (migrationRunner.ts ~linha 282).
const MIGRATION_NAME_RE = /^(\d{3,})_(.+)\.sql$/;

// ---------------------------------------------------------------------------
// ALLOWLIST 1 — duplicatas de versão CONHECIDAS.
// Fonte: src/lib/db/migrationRunner.ts → SUPERSEDED_DUPLICATE_MIGRATIONS (~L188).
// O runner já aceita estes slots de versão reutilizados (a migration "renomeada"
// foi promovida para um número novo, e o slot antigo é tolerado). Adicionar aqui
// SOMENTE se houver um arquivo físico duplicado no disco (stale-enforcement 6A.3
// detecta entradas sem duplicata física viva e força remoção).
// ---------------------------------------------------------------------------
export const KNOWN_DUPLICATE_VERSIONS = new Set([
  // "041" was removed: 041_session_account_affinity.sql no longer exists on disk
  // (only 041_compression_receipts.sql remains), so no physical duplicate is present.
  // The SUPERSEDED_DUPLICATE_MIGRATIONS entry in migrationRunner.ts handles the runner
  // compatibility at runtime without needing an allowlist here. (#6A.3 stale cleanup)
]);

// ---------------------------------------------------------------------------
// ALLOWLIST 2 — gaps de sequência CONHECIDOS.
// Fonte: auditoria do disco (src/lib/db/migrations/) — a sequência pula 026 e 055.
// Estes números nunca tiveram arquivo físico (slots legados que viraram outros
// números via RENAMED_MIGRATION_COMPATIBILITY em migrationRunner.ts). Congelados
// para que o gate bloqueie apenas NOVOS buracos inexplicados na sequência.
// ---------------------------------------------------------------------------
export const KNOWN_GAPS = new Set(["026", "055", "121"]); // 121: número queimado no ciclo v3.8.47 — 122 (#6909) mergeou antes e 121 nunca aterrissou (validação e2e 2026-07-12)

function pad3(n) {
  return String(n).padStart(3, "0");
}

/**
 * Função pura — detecta anomalias de numeração de migrations.
 *
 * @param {string[]} filenames    nomes de arquivo (basename) em src/lib/db/migrations/
 * @param {Set<string>} knownDuplicates  versões com duplicata reconhecida (ex.: "041")
 * @param {Set<string>} knownGaps        gaps de sequência reconhecidos (ex.: "026")
 * @returns {{ duplicates: Array<{version:string,names:string[]}>, gaps: string[], badNames: string[] }}
 */
export function findMigrationAnomalies(filenames, knownDuplicates, knownGaps) {
  const dups = knownDuplicates || new Set();
  const gapsAllow = knownGaps || new Set();

  const badNames = [];
  const byVersion = new Map();

  for (const filename of filenames) {
    if (!filename.endsWith(".sql")) continue;
    const match = filename.match(MIGRATION_NAME_RE);
    if (!match) {
      badNames.push(filename);
      continue;
    }
    const version = match[1];
    if (!byVersion.has(version)) byVersion.set(version, []);
    byVersion.get(version).push(filename);
  }

  // Duplicatas: dois arquivos físicos com o mesmo prefixo, exceto os reconhecidos.
  const duplicates = [];
  for (const [version, names] of byVersion.entries()) {
    if (names.length <= 1) continue;
    if (dups.has(version)) continue;
    duplicates.push({ version, names: [...names].sort() });
  }
  duplicates.sort((a, b) => a.version.localeCompare(b.version));

  // Gaps: buracos na sequência min..max que não estão na allowlist.
  const versions = [...byVersion.keys()].map((v) => parseInt(v, 10)).sort((a, b) => a - b);
  const gaps = [];
  if (versions.length > 0) {
    const min = versions[0];
    const max = versions[versions.length - 1];
    const present = new Set(versions);
    for (let n = min + 1; n < max; n++) {
      if (present.has(n)) continue;
      const padded = pad3(n);
      if (gapsAllow.has(padded)) continue;
      gaps.push(padded);
    }
  }

  return { duplicates, gaps, badNames };
}

function listMigrationFilenames() {
  if (!fs.existsSync(MIGRATIONS_DIR)) return [];
  return fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));
}

function main() {
  const filenames = listMigrationFilenames();

  // Compute raw anomalies WITHOUT allowlists — needed for stale-enforcement (6A.3).
  const raw = findMigrationAnomalies(filenames, new Set(), new Set());
  const liveGaps = raw.gaps;
  const liveDupVersions = raw.duplicates.map((d) => d.version);
  assertNoStale(KNOWN_GAPS, liveGaps, "check-migration-numbering:gaps");
  assertNoStale(KNOWN_DUPLICATE_VERSIONS, liveDupVersions, "check-migration-numbering:duplicates");

  const { duplicates, gaps, badNames } = findMigrationAnomalies(
    filenames,
    KNOWN_DUPLICATE_VERSIONS,
    KNOWN_GAPS
  );

  const problems = [];
  for (const b of badNames) {
    problems.push(`  ✗ nome inválido (esperado NNN_descricao.sql): ${b}`);
  }
  for (const d of duplicates) {
    problems.push(`  ✗ prefixo de versão duplicado ${d.version}: [${d.names.join(", ")}]`);
  }
  for (const g of gaps) {
    problems.push(`  ✗ gap inexplicado na sequência: faltando ${g}`);
  }

  if (problems.length > 0) {
    console.error(
      `[check-migration-numbering] ${problems.length} anomalia(s) de numeração:\n` +
        problems.join("\n") +
        `\n  → renomeie o arquivo colidente, preencha o gap, ou — se for legítimo — ` +
        `adicione o número às allowlists KNOWN_DUPLICATE_VERSIONS / KNOWN_GAPS com ` +
        `justificativa rastreável a src/lib/db/migrationRunner.ts.`
    );
    process.exitCode = 1;
  }

  if (!process.exitCode) {
    console.log(
      `[check-migration-numbering] OK (${filenames.length} migrations, ` +
        `${KNOWN_GAPS.size} gap(s) conhecido(s), ${KNOWN_DUPLICATE_VERSIONS.size} duplicata(s) conhecida(s))`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
