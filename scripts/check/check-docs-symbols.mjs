#!/usr/bin/env node
// scripts/check/check-docs-symbols.mjs
// Gate anti-alucinação (docs → código): toda referência a uma rota `/api/...` dentro de
// docs/**/*.md deve resolver para um `route.ts` real em src/app/api/. Pega endpoint
// INVENTADO/obsoleto que a IA escreve em docs/PRs descrevendo uma rota que não existe —
// o padrão recorrente das PRs de docs (ex.: oyi77) que fabricam endpoints/APIs.
//
// Complementa os outros gates anti-alucinação:
//   - check-fetch-targets.mjs  : fetch("/api/...") na UI → route.ts (código → código)
//   - check-openapi-routes.mjs : path da openapi.yaml → route.ts (spec → código)
//   - este gate                : /api/... na prosa/markdown → route.ts (docs → código)
//
// LOW-NOISE por design: escopo APENAS a paths de rota `/api/...` (sinal mais alto).
// Tudo que é ruído conhecido (superfície proxy OpenAI-compat, refs a arquivos-fonte,
// APIs upstream de terceiros, placeholders) vai para IGNORE com justificativa, NÃO para
// a allowlist. A allowlist congela só drift REAL pré-existente de docs.
// Stale-enforcement (6A.3): entrada em KNOWN_STALE_DOC_REFS que não suprime nenhum miss
// real → gate falha com instrução de remoção (evita furo de regressão silencioso).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { reportStaleEntries } from "./lib/allowlist.mjs";
import { collectApiRouteFiles } from "./lib/apiRoutes.mjs";

const ROOT = process.cwd();
const DOCS = path.join(ROOT, "docs");

// Padrões que NÃO são rotas internas do OmniRoute (ruído estrutural, não drift).
// Adicione aqui (com justificativa) em vez da allowlist quando uma categoria gera
// falsos positivos — a allowlist é só para endpoints stale REAIS.
const IGNORE = [
  /^\/api\/v1\//, // superfície OpenAI-compat (proxy), não rota interna
  /^\/api\/v1beta\//, // superfície Gemini-compat (proxy)
  /^\/api\/v0\//, // APIs upstream de terceiros citadas em docs de pesquisa
  /^\/api\/v2\//, // idem (deployments etc.)
  /^\/api\/(organizations|map-image|graphql|gql)\b/, // APIs de provedores externos documentadas
  /your-/i, // placeholder de exemplo
  /example/i, // placeholder de exemplo
  /\.{3}/, // placeholder "..."
  /\{\}/, // placeholder de param vazio
  /_(POST|GET|PUT|DELETE|PATCH)$/, // refs estilo trace de rede (gql_POST)
];

// Refs a ARQUIVOS-FONTE, não a URLs (ex.: src/app/api/.../route.ts citado em prosa).
// O gate só valida URLs de rota, não caminhos de arquivo.
function isFileRef(p) {
  return /\.(ts|tsx|js|mjs|jsx)$/.test(p) || /\/route$/.test(p);
}

// Refs a `/api/...` que NÃO resolvem para rota real, congeladas para triagem
// (catraca: bloqueia QUALQUER nova ref inventada em docs). Estas são achados REAIS de
// drift/alucinação em docs pré-existentes — cada uma precisa de: criar a rota, corrigir
// o path na doc, ou remover a menção. NÃO adicione novas aqui sem justificativa — esse
// é o ponto do gate. Issues de tracking devem ser abertas para cada cluster.
export const KNOWN_STALE_DOC_REFS = new Set([
  // docs/reference/API_REFERENCE.md — guardrails/shadow doc-fiction RESOLVED in #3496:
  // GET /api/guardrails + POST /api/guardrails/test are now REAL routes (wrapping the
  // existing guardrailRegistry); the fictional enable/disable/logs rows and the entire
  // shadow table were removed from the doc (shadow A-B comparison is combo-config +
  // /api/combos/metrics). No allowlist entries needed for these anymore.
  // (DISCOVERY_TOOL_DESIGN.md saiu de docs/research/ para o repo isolado _tasks/research/
  // — gitignored, fora do escopo deste gate. As 4 entradas /api/discovery/* viraram
  // obsoletas e foram removidas para satisfazer o stale-enforcement da allowlist.)
]);

function walk(dir, filter, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, filter, acc);
    else if (filter(e.name)) acc.push(p);
  }
  return acc;
}

/** @deprecated prefer collectApiRouteFiles from lib/apiRoutes.mjs — re-export for tests. */
export function collectRouteFiles(root = ROOT) {
  return collectApiRouteFiles(root);
}

/** Normaliza um segmento dinâmico ({param} / [param] / [...param] / :param) para wildcard. */
function normSeg(seg) {
  if (/^\[\[?\.{3}.+\]\]?$/.test(seg)) return ""; // catch-all [...x] / [[...x]]
  if (/^\{[^}]+\}$/.test(seg) || /^\[[^\]]+\]$/.test(seg) || /^:[^/]+$/.test(seg)) return " ";
  return seg;
}

// /api/providers/{id}/models → src/app/api/providers/[id]/models/route.ts
// Casa por contagem de segmentos OU por prefixo (uma doc pode citar só o prefixo de
// uma rota mais profunda, ex.: /api/auth descrevendo a família /api/auth/login). Qualquer
// segmento dinâmico ([..]/{..}/:..) casa com um segmento dinâmico real.
export function resolveApiDocPathToRoute(apiPath, routeFiles) {
  const segs = apiPath
    .replace(/^\//, "")
    .replace(/[?#].*$/, "")
    .split("/")
    .map(normSeg);
  for (const rf of routeFiles) {
    const rsegs = rf
      .replace(/^src\/app\//, "")
      .replace(/\/route\.tsx?$/, "")
      .split("/");
    const rnorm = rsegs.map((rs) => {
      if (/^\[\[?\.{3}.+\]\]?$/.test(rs)) return ""; // catch-all
      if (/^\[[^\]]+\]$/.test(rs)) return " "; // [param]
      return rs;
    });
    const catchAll = rnorm.includes("");
    const effLen = catchAll ? rnorm.indexOf("") : rnorm.length;
    if (!catchAll && segs.length > rnorm.length) continue; // doc mais profunda que a rota
    if (catchAll && segs.length < effLen) continue;
    const cmpLen = Math.min(segs.length, effLen || rnorm.length);
    let match = true;
    for (let i = 0; i < cmpLen; i++) {
      const rs = rnorm[i];
      if (rs === "") break; // catch-all absorve o resto
      if (!(rs === segs[i] || rs === " " || segs[i] === " ")) {
        match = false;
        break;
      }
    }
    if (match) return true;
  }
  return false;
}

/** Limpa o path capturado: remove pontuação/ênfase de prosa, fecha brackets pendentes. */
function cleanCapturedPath(raw) {
  let p = raw.replace(/[.,:;_)>]+$/, "");
  const ob = (p.match(/\[/g) || []).length;
  const cb = (p.match(/\]/g) || []).length;
  const oc = (p.match(/\{/g) || []).length;
  const cc = (p.match(/\}/g) || []).length;
  if (ob !== cb || oc !== cc) {
    // segmento final truncado pelo regex (bracket aberto sem fechar na prosa) → descarta
    p = p.replace(/\/[^/]*[[{][^/]*$/, "");
  }
  return p.replace(/\/$/, ""); // remove barra final (forma de prefixo)
}

// /api/... só conta como URL quando NÃO é a cauda de um caminho de arquivo-fonte
// (src/lib/api/, @/app/api/, app/api/). O grupo 2 é o path.
const API_PATH_RE = /(^|[^A-Za-z0-9_/])(\/api\/[A-Za-z0-9_\-/{}\[\].:]+)/g;

/** Extrai os paths /api/... distintos de um arquivo markdown (forma URL, não arquivo). */
export function extractDocApiPaths(src) {
  const out = new Set();
  let m;
  API_PATH_RE.lastIndex = 0;
  while ((m = API_PATH_RE.exec(src))) {
    const p = cleanCapturedPath(m[2]);
    if (p && p !== "/api") out.add(p);
  }
  return [...out];
}

/**
 * Núcleo puro/testável.
 * @param {{file: string, paths: string[]}[]} docPathsByFile
 * @param {Set<string>} routeFiles  conjunto de "src/app/api/.../route.ts"
 * @param {Set<string>} allowlist   paths stale congelados
 * @returns {string[]}  misses no formato "file → /api/path"
 */
export function findStaleDocApiRefs(docPathsByFile, routeFiles, allowlist) {
  const misses = [];
  for (const { file, paths } of docPathsByFile) {
    for (const p of paths) {
      if (IGNORE.some((rx) => rx.test(p))) continue;
      if (isFileRef(p)) continue;
      if (allowlist.has(p)) continue;
      if (!resolveApiDocPathToRoute(p, routeFiles)) {
        misses.push(`${file} → ${p}`);
      }
    }
  }
  return misses;
}

/**
 * @param {{ root?: string, routeFiles?: Set<string> }} [opts]
 * @returns {{ ok: boolean, exitCode: number, message: string }}
 */
export function runDocsSymbolsCheck(opts = {}) {
  const root = opts.root || ROOT;
  const docsDir = path.join(root, "docs");
  const routeFiles = opts.routeFiles || collectApiRouteFiles(root);
  // docs/i18n/** são espelhos auto-gerados das docs canônicas — validar só o canônico
  // evita 40× de ruído duplicado (e os mirrors herdam qualquer fix do canônico).
  // docs/superpowers/** são planos internos de implementação (snapshots históricos
  // de intenção — podem citar rotas planejadas/abandonadas), não claims sobre o
  // código atual; fora do escopo do gate (drift surgiu no ciclo v3.8.18).
  const docFiles = walk(docsDir, (n) => /\.md$/.test(n)).filter((f) => {
    const rel = path.relative(root, f).replace(/\\/g, "/");
    return !rel.startsWith("docs/i18n/") && !rel.startsWith("docs/superpowers/");
  });
  const docPathsByFile = docFiles.map((f) => ({
    file: path.relative(root, f).replace(/\\/g, "/"),
    paths: extractDocApiPaths(fs.readFileSync(f, "utf8")),
  }));

  const allMisses = findStaleDocApiRefs(docPathsByFile, routeFiles, new Set());
  const liveMissPaths = allMisses.map((m) => m.split(" → ")[1]);
  const stale = reportStaleEntries(KNOWN_STALE_DOC_REFS, liveMissPaths, "check-docs-symbols");
  const misses = findStaleDocApiRefs(docPathsByFile, routeFiles, KNOWN_STALE_DOC_REFS);

  const parts = [];
  if (stale.length) {
    parts.push(
      `[check-docs-symbols] ${stale.length} entrada(s) obsoleta(s) na allowlist ` +
        `— a violação foi corrigida; REMOVA a entrada para travar a correção:\n` +
        stale.map((e) => `  ✗ ${e}`).join("\n")
    );
  }
  if (misses.length) {
    parts.push(
      `[check-docs-symbols] ${misses.length} ref(s) /api em docs sem rota real:\n` +
        misses.map((m) => "  ✗ " + m).join("\n") +
        `\n  → crie o route.ts, corrija o path na doc, ou (se for upstream/placeholder)` +
        ` adicione um padrão a IGNORE com justificativa. NÃO adicione à allowlist sem` +
        ` confirmar que é drift pré-existente real.`
    );
  }
  if (parts.length) {
    return { ok: false, exitCode: 1, message: parts.join("\n") };
  }
  return {
    ok: true,
    exitCode: 0,
    message:
      `[check-docs-symbols] OK — ${docFiles.length} docs canônicas, ` +
      `${routeFiles.size} rotas conhecidas, ${KNOWN_STALE_DOC_REFS.size} stale congeladas`,
  };
}

function main() {
  const result = runDocsSymbolsCheck();
  if (result.ok) console.log(result.message);
  else console.error(result.message);
  process.exit(result.exitCode);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
