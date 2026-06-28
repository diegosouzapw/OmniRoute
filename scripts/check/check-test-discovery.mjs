#!/usr/bin/env node
// scripts/check/check-test-discovery.mjs
// Gate 6A.1 — test discovery: todo arquivo *.test.ts|tsx / *.spec.ts|tsx do repo deve
// ser COLETADO por pelo menos um runner que efetivamente RODA via npm script ou CI.
//
// WHY: a auditoria 2026-06-09 encontrou ≈135 testes em subdiretórios de tests/unit/
// que nenhum runner coleta (o glob `tests/unit/*.test.ts` é top-level-only), incluindo
// tests/unit/authz/routeGuard.test.ts (Hard Rules #15/#17) — cujos asserts JÁ FALHAM,
// apodrecidos sem ninguém ver. Teste que não roda é o falso verde definitivo: todo o
// investimento anti test-masking protege asserts que nem executam.
//
// Modelo: COLLECTORS declara explicitamente o glob de cada runner REAL + as fontes
// (package.json / ci.yml / vitest configs) onde o padrão deve aparecer textualmente
// (drift-check: mudou o glob na fonte sem atualizar aqui → o gate falha pedindo sync).
// "Coletado" = casado pelo glob de um runner executado por script npm ou job de CI.
// Includes de config que NENHUM script executa (ex.: vitest.config.ts sem filtro) NÃO
// contam — config morta não roda teste.
//
// Catraca: órfãos pré-existentes ficam congelados em test-discovery-baseline.json
// (dívida visível, decrescente). Órfão NOVO → fail. Entrada do baseline que deixou de
// ser órfã (religada/deletada) → fail pedindo remoção (stale-allowlist enforcement).
// --update regrava o baseline com o estado atual (use só para REMOVER religados;
// adições novas devem ser corrigidas, não congeladas — esse é o ponto do gate).
//
// Limitações documentadas (v1):
//  - `exclude` de arquivo individual em vitest configs não é modelado (1 caso hoje:
//    providerDiversity.test.ts — coletado pelo include, deliberadamente excluído).
//  - @omniroute/* ficam fora do walk (têm CI próprio: opencode-*-ci.yml).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/test-discovery-baseline.json")
);
const UPDATE = process.argv.includes("--update");

// Raízes varridas em busca de arquivos de teste.
const WALK_ROOTS = ["tests", "src", "open-sse", "electron", "bin"];
const WALK_EXCLUDE = new Set(["node_modules", ".next", "dist", "coverage", ".git"]);
const TEST_FILE_RE = /\.(test|spec)\.(ts|tsx)$/;

// Runners REAIS e seus globs. `sources`: arquivos onde `anchor` (default: o próprio
// glob) deve aparecer textualmente — se o runner mudar, este gate exige o sync.
export const COLLECTORS = [
  // Node native runner — test:unit / test:unit:fast / shards / test:coverage + CI (8 shards, node24, node26)
  { glob: "tests/unit/*.test.ts", sources: ["package.json", ".github/workflows/ci.yml"] },
  // Node native runner — subdiretórios religados pela 6A.1c (2026-06-09). Braces
  // explícitos para NÃO incluir tests/unit/autoCombo/** (testes vitest — importam
  // "vitest" e explodem no node runner). Subdir novo: adicione aqui E nos scripts
  // (o drift-check + o gate de órfãos forçam a manutenção em sincronia).
  {
    glob: "tests/unit/{api,auth,authz,build,cli,cli-helper,combo,compression,correctness,cors,dashboard,db,db-adapters,docs,gamification,guardrails,lib,mcp,runtime,security,services,settings,shared,ui,usage}/**/*.test.ts",
    sources: ["package.json", ".github/workflows/ci.yml"],
  },
  // Node native runner — test:integration (top-level only; tests/integration/services/ NÃO roda)
  { glob: "tests/integration/*.test.ts", sources: ["package.json"] },
  // Node native runner — test:combo:matrix / test:integration (combo strategy decision matrix, 17 strategies)
  { glob: "tests/integration/combo-matrix/*.test.ts", sources: ["package.json"] },
  // Node native runner — test:combo:live (gated real-upstream smoke; RUN_COMBO_LIVE=1 + VPS creds)
  { glob: "tests/integration/combo-live/*.live.test.ts", sources: ["package.json"] },
  // Node native runner — test:system
  { glob: "tests/e2e/system-failover.test.ts", sources: ["package.json"] },
  // vitest.mcp.config.ts — test:vitest
  { glob: "open-sse/mcp-server/__tests__/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "open-sse/services/autoCombo/__tests__/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  // Single-file include: the rest of open-sse/services/__tests__/ are frozen orphans
  // (empty/dormant stubs); only this one is wired to run under test:vitest.
  {
    glob: "open-sse/services/__tests__/antigravity-quota-family.test.ts",
    sources: ["vitest.mcp.config.ts"],
  },
  { glob: "tests/unit/autoCombo/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "tests/unit/encryption.spec.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/shared/components/**/*.test.tsx", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/shared/hooks/__tests__/**/*.test.tsx", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/app/(dashboard)/**/__tests__/**/*.test.tsx", sources: ["vitest.mcp.config.ts"] },
  // vitest.config.ts via test:vitest:ui (roda com path-filter `tests/unit/ui`, então o
  // conjunto EFETIVO é a interseção do include `tests/unit/**/*.test.tsx` com o filtro)
  {
    glob: "tests/unit/ui/**/*.test.tsx",
    sources: ["package.json", "vitest.config.ts"],
    anchors: { "package.json": "tests/unit/ui", "vitest.config.ts": "tests/unit/**/*.test.tsx" },
  },
  // Playwright — test:e2e (o script passa tests/e2e/*.spec.ts; testMatch **/*.spec.ts)
  { glob: "tests/e2e/*.spec.ts", sources: ["package.json"] },
  // Runners custom — test:ecosystem / test:protocols:e2e (spawnam vitest com o arquivo)
  { glob: "tests/e2e/ecosystem.test.ts", sources: ["scripts/dev/run-ecosystem-tests.mjs"] },
  {
    glob: "tests/e2e/protocol-clients.test.ts",
    sources: ["scripts/dev/run-protocol-clients-tests.mjs"],
  },
];

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Converte um glob em RegExp ancorada. Suporta `*`, `**` (com ou sem barra) e `{a,b}`. */
export function globToRegExp(glob) {
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        if (glob[i + 2] === "/") {
          re += "(?:.*/)?"; // "**/" — zero ou mais diretórios
          i += 2;
        } else {
          re += ".*"; // "**" solto
          i += 1;
        }
      } else {
        re += "[^/]*"; // "*" não atravessa "/"
      }
    } else if (c === "{") {
      const end = glob.indexOf("}", i);
      const alts = glob
        .slice(i + 1, end)
        .split(",")
        .map(escapeRe);
      re += "(?:" + alts.join("|") + ")";
      i = end;
    } else {
      re += escapeRe(c);
    }
  }
  return new RegExp("^" + re + "$");
}

/** Arquivos de teste não casados por NENHUM glob de collector (ordem preservada). */
export function findOrphans(files, globs) {
  const regexes = globs.map(globToRegExp);
  return files.filter((f) => !regexes.some((re) => re.test(f)));
}

/**
 * Compara os órfãos atuais com o baseline congelado.
 *  - newOrphans: órfão atual fora do baseline → teste novo que NÃO RODA (fail).
 *  - stale: entrada do baseline que não é mais órfã (religada/deletada) → remova (fail).
 */
export function evaluateAgainstBaseline(orphans, baselineList) {
  const baseSet = new Set(baselineList);
  const orphanSet = new Set(orphans);
  return {
    newOrphans: orphans.filter((o) => !baseSet.has(o)),
    stale: baselineList.filter((b) => !orphanSet.has(b)),
  };
}

/**
 * Drift-check: cada glob declarado (ou seu anchor por fonte) deve aparecer textualmente
 * em TODAS as suas fontes. Retorna mensagens de drift.
 */
export function findCollectorDrift(collectors, contents) {
  const drift = [];
  for (const c of collectors) {
    for (const source of c.sources) {
      const anchor = c.anchors?.[source] ?? c.glob;
      const body = contents[source];
      if (body === undefined || !body.includes(anchor)) {
        drift.push(
          `glob "${c.glob}" (anchor "${anchor}") não encontrado em ${source} — o runner mudou? Sincronize COLLECTORS em check-test-discovery.mjs`
        );
      }
    }
  }
  return drift;
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (WALK_EXCLUDE.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (TEST_FILE_RE.test(e.name)) acc.push(p);
  }
  return acc;
}

function collectTestFiles() {
  const out = [];
  for (const root of WALK_ROOTS) {
    for (const f of walk(path.join(ROOT, root))) {
      out.push(path.relative(ROOT, f).replace(/\\/g, "/"));
    }
  }
  return out.sort();
}

function main() {
  // 1) drift dos collectors vs fontes reais
  const contents = {};
  for (const c of COLLECTORS) {
    for (const s of c.sources) {
      if (contents[s] === undefined) {
        const p = path.join(ROOT, s);
        contents[s] = fs.existsSync(p) ? fs.readFileSync(p, "utf8") : undefined;
      }
    }
  }
  const drift = findCollectorDrift(COLLECTORS, contents);

  // 2) órfãos vs baseline
  const files = collectTestFiles();
  const orphans = findOrphans(
    files,
    COLLECTORS.map((c) => c.glob)
  );
  if (!fs.existsSync(BASELINE_PATH) && !UPDATE) {
    console.error(
      `[test-discovery] FAIL — ${path.basename(BASELINE_PATH)} ausente. Bootstrap:\n` +
        `  node scripts/check/check-test-discovery.mjs --update  (gera o baseline com os órfãos atuais)`
    );
    process.exit(2);
  }
  const baseline = fs.existsSync(BASELINE_PATH)
    ? JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"))
    : {
        _comment:
          "Catraca de test-discovery (check-test-discovery.mjs). Cada entrada e um arquivo de teste que NENHUM runner coleta (ele nunca roda) — divida congelada na auditoria 6A.1 (2026-06-09). So pode DIMINUIR: religue o teste (ajustando o glob do runner ou movendo o arquivo) e remova a entrada via --update. NAO adicione novos orfaos — corrija o runner.",
        orphans: [],
      };
  const { newOrphans, stale } = evaluateAgainstBaseline(orphans, baseline.orphans || []);

  if (UPDATE && drift.length === 0) {
    baseline.orphans = orphans;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + "\n");
    console.log(
      `[test-discovery] baseline regravado: ${orphans.length} órfão(s) (${stale.length} removido(s), ${newOrphans.length} adicionado(s) — adições devem ser corrigidas, não congeladas)`
    );
    return;
  }

  const problems = [];
  for (const d of drift) problems.push(`  ✗ [drift] ${d}`);
  for (const o of newOrphans) {
    problems.push(
      `  ✗ [órfão NOVO] ${o} — nenhum runner coleta este arquivo (ele NUNCA roda). Mova-o para um path coletado ou ajuste o runner.`
    );
  }
  for (const s of stale) {
    problems.push(
      `  ✗ [stale] ${s} — não é mais órfão (religado/removido). Remova do baseline: node scripts/check/check-test-discovery.mjs --update`
    );
  }

  if (problems.length) {
    console.error(`[test-discovery] ${problems.length} problema(s):\n` + problems.join("\n"));
    process.exit(1);
  }
  console.log(
    `[test-discovery] OK — ${files.length} arquivos de teste, ${COLLECTORS.length} collectors, ${(baseline.orphans || []).length} órfão(s) congelado(s) (dívida rastreada, só decresce)`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
