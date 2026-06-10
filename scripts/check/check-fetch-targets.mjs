#!/usr/bin/env node
// scripts/check/check-fetch-targets.mjs
// Gate anti-alucinação: todo fetch("/api/...") em src/app/(dashboard) deve resolver
// para um route.ts real em src/app/api/. Mata rotas inventadas (a IA editando a UI
// "chuta" um endpoint que não existe). 300 paths hardcoded sem ligação de compilação
// com as 488 rotas — este gate cria essa ligação no CI.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const cwd = process.cwd();
const DASH = path.join(cwd, "src/app/(dashboard)");
const API = path.join(cwd, "src/app/api");

// Paths que o checker não resolve estaticamente (allowlist com justificativa):
//  - /api/v1/* é a superfície OpenAI-compat (proxy), não rotas internas do dashboard.
//  - paths construídos por template/concatenação não são literais estáticos.
const IGNORE = [
  /^\/api\/v1\//, // superfície OpenAI-compat
];

// Mismatches dashboard→rota PRÉ-EXISTENTES (UI chama rota que não existe → 404 ou
// código morto). Congelados para a catraca ficar verde e bloquear QUALQUER nova rota
// inventada. CADA UM precisa de triagem: criar a rota, corrigir o path, ou remover a
// chamada morta. NÃO adicione novos aqui sem justificativa — esse é o ponto do gate.
const KNOWN_MISSING = new Set([
  "/api/gamification/level", // profile/page.tsx — rota inexistente (gamification tem transfer/leaderboard/… mas não level)
  "/api/gamification/badges", // profile/page.tsx — idem
  "/api/gamification/badges/earned", // profile/page.tsx — idem
  "/api/settings/obsidian/webdav", // ObsidianSourceCard.tsx — só existe /api/settings/obsidian
]);

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

function collectRouteFiles() {
  return new Set(
    walk(API)
      .filter((p) => /route\.tsx?$/.test(p))
      .map((p) => path.relative(cwd, p).replace(/\\/g, "/"))
  );
}

// /api/providers/abc/models → src/app/api/providers/[id]/models/route.ts
export function resolveApiPathToRoute(apiPath, routeFiles) {
  const segs = apiPath
    .replace(/^\//, "")
    .replace(/[?#].*$/, "")
    .split("/");
  for (const rf of routeFiles) {
    const rsegs = rf
      .replace(/^src\/app\//, "")
      .replace(/\/route\.tsx?$/, "")
      .split("/");
    if (rsegs.length !== segs.length) continue;
    const ok = rsegs.every((rs, i) => rs === segs[i] || /^\[.*\]$/.test(rs));
    if (ok) return true;
  }
  return false;
}

function extractFetchPaths(file) {
  const src = fs.readFileSync(file, "utf8");
  // Só literais ESTÁTICOS começando em /api/ (não template literals com ${...}).
  const re = /(?:fetch|fetchJson|apiFetch)\(\s*["'`](\/api\/[A-Za-z0-9_\-/[\]]+)["'`]/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) out.push(m[1]);
  return out;
}

function main() {
  const routeFiles = collectRouteFiles();
  const misses = [];
  for (const f of walk(DASH)) {
    for (const apiPath of extractFetchPaths(f)) {
      if (IGNORE.some((rx) => rx.test(apiPath))) continue;
      if (KNOWN_MISSING.has(apiPath)) continue;
      if (!resolveApiPathToRoute(apiPath, routeFiles)) {
        misses.push(`${path.relative(cwd, f)} → ${apiPath}`);
      }
    }
  }
  if (misses.length) {
    console.error(
      `[check-fetch-targets] ${misses.length} fetch(es) para rota inexistente:\n` +
        misses.map((m) => "  ✗ " + m).join("\n") +
        `\n  → crie o route.ts faltante, corrija o path, ou adicione um padrão a IGNORE com justificativa.`
    );
    process.exit(1);
  }
  console.log(`[check-fetch-targets] OK (${routeFiles.size} rotas conhecidas)`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
