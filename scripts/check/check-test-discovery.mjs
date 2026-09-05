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
const TEST_FILE_RE = /\.(test|spec)\.(ts|tsx|mjs)$/;

// Runners REAIS e seus globs. `sources`: arquivos onde `anchor` (default: o próprio
// glob) deve aparecer textualmente — se o runner mudar, este gate exige o sync.
export const COLLECTORS = [
  // Node native runner — test:unit / test:unit:fast / shards / test:coverage. O CI
  // (test-unit ×8 + quality.yml fast-unit) agora chama o npm script test:unit:ci:shard
  // (fonte única, plano mestre testes+CI QW-d) — o wiring é ancorado pelo NOME do script
  // nos workflows (entrada dedicada abaixo), e os globs vivem SÓ no package.json.
  { glob: "tests/unit/*.test.ts", sources: ["package.json"] },
  // Node native runner — subdiretórios religados pela 6A.1c (2026-06-09). Braces
  // explícitos para NÃO incluir tests/unit/autoCombo/** (testes vitest — importam
  // "vitest" e explodem no node runner) NEM tests/unit/dashboard/** (invocação própria
  // abaixo). Subdir novo: adicione aqui E nos scripts (o drift-check + o gate de
  // órfãos forçam a manutenção em sincronia).
  {
    glob: "tests/unit/{a2a,account,adaptive,admission,adobe,agent,agentSkills,agentrouter,agy,aihorde,alibaba,anthropic,antigravity,api,apikeys,audio,audit,auth,authz,auto,bailian,base,batch,blackbox,bug,build,bulk,cache,call,catalog,cc,chat,chatcore,chatgpt,check,circuit,claude,cli,cli-helper,cline,cliproxyapi,cloud,cloudflare,codex,combo,combos,command,compression,conductor,connection,context,copilot,correctness,cors,credential,crof,cursor,custom,dahl,db,db-adapters,deepseek,dev,devin,docker,dockerfile,docs,domain,duckduckgo,electron,embedding,embeddings,empty,error,exclusive,executor,firecrawl,fix,free,freeProviderRankings,fusion,gamification,gemini,github,gitlab,glm,grok,guardrails,headroom,helpers,home,homolog,i18n,image,inspector,instrumentation,issue,json,kie,kimi,kiro,lib,live,lmarena,local,log,m365,management,mcp,media,memory,microsoft,migration,minimax,misc,mitm,modality,model,models,moonshot,muse,no,noauth,notion,nvidia,oauth,obsidian,ocr,ollama,openai,openapi,opencode,openrouter,pack,perplexity,playground,plugins,pricing,probe,prompt,provider,providers,proxy,proxyfetch,qoder,quota,qwen,radar,rate,rateLimitManager,reasoning,refactor,relay,remote,repro,request,rerank,resilience,resolve,resource,responses,route,router,routing,run,runtime,search,security,seekai,service,services,session,settings,shared,sidebar,skills,socks,sse,stream,sync,synced,system,task,test,thinking,tls,token,tool,topology,tproxy,translator,ts7,uc,ui,upstream,usage,v1,v388,validation,vercel,vertex,video,vision,vscode,web,webhook,windows,xai,zai,zed}/**/*.test.ts",
    sources: ["package.json"],
  },
  // Node native runner — tests/unit/dashboard/** roda numa invocação separada com o hook
  // COMPLETO do tsx (--import tsx): o grafo dos componentes de dashboard puxa
  // @lobehub/icons, cujo build es/ faz require() interno de arquivos com sintaxe ESM —
  // sem o patch CJS do tsx isso estoura "Unexpected token 'export'" (visto no Node
  // 24.18 do CI; no 24.16 local vira um crawl de ~60s/arquivo). O resto da suíte roda
  // sob tsx/esm (~-50% de bootstrap por processo). Plano mestre testes+CI, QW-b.
  { glob: "tests/unit/dashboard/**/*.test.ts", sources: ["package.json"] },
  // Quarentena de flakes de concorrência (plano melhorias v3.8.46, P0.3): arquivos
  // sensíveis a contenção de CPU/timing (classe glm-3580 / quota-division /
  // provider-health-autopilot) rodam num passo dedicado --test-concurrency=1 ao FIM
  // de cada runner. Fora dos globs paralelos acima por diretório próprio.
  { glob: "tests/unit/serial/**/*.test.ts", sources: ["package.json"] },
  // Órfãos religados (plano mestre QW-c): arquivos .test.mjs (top-level + db/ + feature-triage/) — fora do glob
  // *.test.ts histórico, nunca rodava em job nenhum (53 casos recuperados).
  { glob: "tests/unit/**/*.test.mjs", sources: ["package.json"] },
  // Wiring CI→npm script (fonte única): os jobs de unit do ci.yml e o fast-unit do
  // quality.yml DEVEM invocar o script canônico — se renomearem/inlinarem, este gate
  // exige o sync (substitui as âncoras textuais de glob que existiam nos workflows).
  {
    glob: "tests/unit/*.test.ts",
    sources: ["package.json", ".github/workflows/ci.yml", ".github/workflows/quality.yml"],
    anchors: {
      ".github/workflows/ci.yml": "test:unit:ci:shard",
      ".github/workflows/quality.yml": "test:unit:ci:shard",
    },
  },
  // Node native runner — test:integration (top-level only; tests/integration/services/ NÃO roda)
  { glob: "tests/integration/*.test.ts", sources: ["package.json"] },
  // Node native runner — test:combo:matrix / test:integration (combo strategy decision matrix, 17 strategies)
  { glob: "tests/integration/combo-matrix/*.test.ts", sources: ["package.json"] },
  // Node native runner — test:combo:live (gated real-upstream smoke; RUN_COMBO_LIVE=1 + VPS creds)
  { glob: "tests/integration/combo-live/*.live.test.ts", sources: ["package.json"] },
  // Node native runner — test:boundary:live (gated real-upstream smoke; RUN_BOUNDARY_LIVE=1,
  // hits omniroute.vhost2.harre.dynv6.net — never runs unopted in CI)
  { glob: "tests/boundary/*.live.test.ts", sources: ["package.json"] },
  // Node native runner — test:system
  { glob: "tests/e2e/system-failover.test.ts", sources: ["package.json"] },
  // vitest.mcp.config.ts — test:vitest
  { glob: "open-sse/mcp-server/__tests__/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "open-sse/services/autoCombo/__tests__/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "open-sse/services/combo/__tests__/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  // Single-file include: the rest of open-sse/services/__tests__/ are frozen orphans
  // (empty/dormant stubs); only this one is wired to run under test:vitest.
  {
    glob: "open-sse/services/__tests__/antigravity-quota-family.test.ts",
    sources: ["vitest.mcp.config.ts"],
  },
  // #8890 landed this suite here without wiring a runner, so it had never run once.
  {
    glob: "open-sse/services/__tests__/fail-fast-concurrency-gate.test.ts",
    sources: ["vitest.mcp.config.ts"],
  },
  { glob: "tests/unit/autoCombo/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "tests/unit/api/**/*.spec.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/lib/memory/__tests__/generic-backend.test.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "tests/unit/encryption.spec.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/shared/components/**/*.test.tsx", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/shared/hooks/__tests__/**/*.test.tsx", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/app/(dashboard)/**/__tests__/**/*.test.tsx", sources: ["vitest.mcp.config.ts"] },
  // vitest.config.ts via test:vitest:ui. The script uses the config-wide include list.
  {
    glob: "tests/unit/**/*.test.tsx",
    sources: ["package.json", "vitest.config.ts"],
    anchors: { "package.json": "test:vitest:ui", "vitest.config.ts": "tests/unit/**/*.test.tsx" },
  },
  // vitest.config.ts include — open-sse/__tests__ files collected by vitest.config.ts.
  // These were previously listed as orphans because the COLLECTORS only modelled the
  // tests/unit/**/*.test.tsx include; the open-sse globs were missing. Both the top-level
  // glob and the more-specific services sub-path glob from vitest.config.ts are listed so
  // the drift-check anchors remain exact matches to the config file text.
  {
    glob: "open-sse/**/__tests__/**/*.test.ts",
    sources: ["vitest.config.ts"],
    anchors: { "vitest.config.ts": "open-sse/**/__tests__/**/*.test.ts" },
  },
  // vitest.config.ts include — src/lib/memory and src/lib/skills __tests__ collected by vitest.config.ts.
  {
    glob: "src/lib/memory/__tests__/**/*.test.ts",
    sources: ["vitest.config.ts"],
    anchors: { "vitest.config.ts": "src/lib/memory/__tests__/**/*.test.ts" },
  },
  {
    glob: "src/lib/skills/__tests__/**/*.test.ts",
    sources: ["vitest.config.ts"],
    anchors: { "vitest.config.ts": "src/lib/skills/__tests__/**/*.test.ts" },
  },
  // vitest.config.ts include — single-file entry for the .test.ts encryption file.
  {
    glob: "tests/unit/encryption.test.ts",
    sources: ["vitest.config.ts"],
    anchors: { "vitest.config.ts": "tests/unit/encryption.test.ts" },
  },
  // Playwright — test:e2e (o script passa tests/e2e/*.spec.ts; testMatch **/*.spec.ts)
  { glob: "tests/e2e/*.spec.ts", sources: ["package.json"] },
  // Runners custom — test:ecosystem / test:protocols:e2e (spawnam vitest com o arquivo)
  { glob: "tests/e2e/ecosystem.test.ts", sources: ["scripts/dev/run-ecosystem-tests.mjs"] },
  {
    glob: "tests/e2e/protocol-clients.test.ts",
    sources: ["scripts/dev/run-protocol-clients-tests.mjs"],
  },
  // Playwright — suíte de homologação real (npm run homolog, L4 UI): run.mjs invoca
  // `playwright test -c tests/homolog/ui/playwright.config.ts` (testMatch **/*.spec.ts).
  {
    glob: "tests/homolog/ui/*.spec.ts",
    sources: ["scripts/homolog/run.mjs"],
    anchors: { "scripts/homolog/run.mjs": "tests/homolog/ui/playwright.config.ts" },
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
