# Plano de Implementação — Quality Gates & Catraca Anti-Alucinação

> **Para workers agênticos:** SUB-SKILL OBRIGATÓRIA: use `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` para executar este plano tarefa-a-tarefa. Os passos usam checkbox (`- [ ]`) para rastreio. **Cada fix de bug obedece à Hard Rule #18** (teste falha→passa OU validação ao vivo no VPS). Não burle Husky (`--no-verify`) sem aprovação. Veja o diagnóstico completo em [`RELATORIO-QUALITY-GATES.md`](./RELATORIO-QUALITY-GATES.md).

**Goal:** Generalizar a catraca de qualidade do OmniRoute (hoje só para `any`) para todas as métricas relevantes — cobertura, duplicação, tamanho de arquivo, complexidade — e adicionar gates determinísticos anti-alucinação, tudo no padrão `check-*.mjs` já existente, sem SaaS novo.

**Architecture:** Camadas incrementais. (0) reativa/reconcilia o que já existe; (1) constrói o **motor de catraca** (`quality-baseline.json` commitado + coletor + comparador genérico que clona o `check-t11-any-budget.mjs`); (2) adiciona gates determinísticos que matam os ímãs de alucinação (provider-consistency, fetch-targets, openapi-routes); (3) catraca de duplicação+tamanho; (4) catraca de cobertura + anti test-masking; (5) skill `/babysit` + evidência. Toda catraca é **só-regressão** (baseline congelado) — nunca um piso absoluto que exija limpeza flag-day.

**Tech Stack:** Node ≥20 ESM (`.mjs`/`.ts` via `tsx`), ESLint 9 flat config, c8, jscpd v5, eslint-plugin-sonarjs v4, GitHub Actions, Node native test runner (`node --import tsx --test`), `gh` CLI + GraphQL.

**Escopo / sub-planos (scope-check):** Fases 0, 1 e 2 estão totalmente bite-sized aqui. Fases 3, 4 e 5 são subsistemas independentes — cada uma deve ser **expandida no próprio sub-plano** (via `writing-plans`) no momento da execução, a partir das specs/critérios de aceitação definidos aqui. Cada fase entrega software funcional e testável por si só.

---

## Mapa de arquivos (o que será criado/modificado)

| Arquivo | Responsabilidade |
|---------|------------------|
| `quality-baseline.json` (criar, **commitar**) | Baseline congelado: por métrica `{value, direction}` (`down`=menor-é-melhor, `up`=maior-é-melhor) |
| `scripts/quality/collect-metrics.mjs` (criar) | Roda os coletores → emite `quality-metrics.json` |
| `scripts/quality/check-quality-ratchet.mjs` (criar) | Comparador genérico: falha em qualquer regressão; com `--update` ratcheta o baseline |
| `scripts/check/check-fetch-targets.mjs` (criar) | Todo `fetch("/api/...")` do dashboard resolve para um `route.ts` real |
| `scripts/check/check-provider-consistency.ts` (criar) | ids de provider batem entre `providers.ts` ↔ `providerRegistry.ts` ↔ `validation.ts` |
| `scripts/check/check-openapi-routes.mjs` (criar) | Toda `path` do `openapi.yaml` ↔ `route.ts` real (bidirecional) |
| `scripts/check/check-deps.mjs` (criar) | Anti-slopsquatting: allowlist + existência no registry + age-cooldown |
| `.github/workflows/ci.yml` (modificar) | Novo job `quality-gate`; reconciliar gate de cobertura; escalonar audit; plugar scripts órfãos |
| `.husky/pre-commit` (modificar) | Reativar a parte barata |
| `package.json` (modificar) | Novos scripts `check:*` / `quality:*` |
| `eslint.config.mjs` (modificar, Fase 3) | `max-lines`, `max-lines-per-function`, `complexity`, `sonarjs/cognitive-complexity` (warn) |
| `.claude/skills/babysit/SKILL.md` (criar, Fase 5) | Skill `/babysit` |
| `tests/unit/quality-ratchet.test.ts` etc. (criar) | Testes TDD de cada gate |

---

# FASE 0 — Reativar & Reconciliar (quick wins, sem tooling novo)

### Task 0.1: Reconciliar o gate de cobertura do CI (40 → baseline real)

**Contexto:** `ci.yml:377` gata em `40/40/40/40`; local gata `60`; comentário renderiza `60`; baseline real ≈ 79–82%. O 40 torna o gate quase banguela.

**Files:**
- Modify: `.github/workflows/ci.yml:376-377`

- [ ] **Step 1: Confirmar o baseline real de cobertura**

Run:
```bash
npm run test:coverage 2>&1 | tail -20
node -e "const c=require('./coverage/coverage-summary.json').total; console.log(c.statements.pct,c.lines.pct,c.functions.pct,c.branches.pct)"
```
Expected: 4 números (ex.: `79.8 79.8 82.2 75.2`). Anote-os.

- [ ] **Step 2: Subir o gate do CI para `baseline_real - 2` (headroom anti-flake)**

Em `.github/workflows/ci.yml`, troque a linha `--statements 40 --lines 40 --functions 40 --branches 40` pelos valores `(real-2)` de cada métrica (ex.: `--statements 77 --lines 77 --functions 80 --branches 73`). Mantenha como **piso**; a catraca da Fase 4 cuidará do "não-cair".

- [ ] **Step 3: Alinhar o script local e o display do comentário** para os mesmos números (procure `60` em `package.json` `test:coverage` e em `scripts/check/test-report-summary.mjs`).

- [ ] **Step 4: Verificar que o CI não quebra** — abrir um PR de teste (ou rodar `act`/push numa branch) e confirmar que o job `test-coverage` fica verde com o novo piso.

- [ ] **Step 5: Commit**
```bash
git add .github/workflows/ci.yml package.json scripts/check/test-report-summary.mjs
git commit -m "fix(ci): reconcile coverage gate to real baseline (40->~78) across CI/local/report"
```

### Task 0.2: Escalonar `npm audit` (critical=bloqueia / high=avisa)

**Files:** Modify: `package.json:112`

- [ ] **Step 1: Trocar o script `audit:deps`** de `npm audit --audit-level=moderate && npm run audit:electron` para:
```json
"audit:deps": "npm audit --audit-level=critical && (npm audit --audit-level=high || echo '::warning::high-severity advisories present (non-blocking)') && npm run audit:electron",
```

- [ ] **Step 2: Rodar e observar o comportamento**
```bash
npm run audit:deps; echo "exit=$?"
```
Expected: `exit=0` se não houver critical; mensagem de warning se houver high.

- [ ] **Step 3: Commit**
```bash
git add package.json && git commit -m "chore(ci): tier npm audit (critical blocks, high warns)"
```

### Task 0.3: Plugar os 3 scripts órfãos no CI

**Contexto:** `check:cli-i18n`, `check:openapi-coverage`, `check:openapi-security-tiers` existem, dão `exit 1`, mas não rodam em lugar nenhum (Hard Rules #15/#17).

**Files:** Modify: `.github/workflows/ci.yml` (job `docs-sync-strict` ou `lint`)

- [ ] **Step 1: Rodar os 3 localmente para confirmar verde no estado atual**
```bash
npm run check:cli-i18n && npm run check:openapi-coverage && npm run check:openapi-security-tiers; echo "exit=$?"
```
Expected: `exit=0` (se algum falhar, corrija a deriva antes de plugar).

- [ ] **Step 2: Adicionar os 3 como steps** no job `docs-sync-strict` do `ci.yml`, após `check:docs-all`.

- [ ] **Step 3: Commit**
```bash
git add .github/workflows/ci.yml && git commit -m "ci: wire orphaned gates (cli-i18n, openapi-coverage, openapi-security-tiers)"
```

### Task 0.4: Reativar a parte barata do pre-commit do Husky

**Files:** Modify: `.husky/pre-commit`

- [ ] **Step 1: Descomentar SÓ as 3 linhas baratas e determinísticas:**
```sh
npx lint-staged
node scripts/check/check-docs-sync.mjs
npm run check:any-budget:t11
```
(Deixe i18n/openapi comentados por enquanto — eles são mais lentos; rodam no CI.)

- [ ] **Step 2: Testar o hook** com um commit trivial e medir o tempo:
```bash
time git commit --allow-empty -m "chore: test pre-commit hook"
git reset --soft HEAD~1
```
Expected: hook roda lint-staged + 2 checks em poucos segundos.

- [ ] **Step 3: Commit**
```bash
git add .husky/pre-commit && git commit -m "chore(husky): re-enable cheap pre-commit gates (lint-staged, docs-sync, any-budget)"
```

---

# FASE 1 — Motor de Catraca (o coração) ⭐

> Generaliza o `check-t11-any-budget.mjs` (catraca de `any` por arquivo) para um motor de catraca genérico, multi-métrica, que lê um baseline commitado e falha em qualquer regressão. Começa com 2 métricas (warnings de ESLint + cobertura) e é estendido nas fases seguintes.

### Task 1.1: Comparador genérico de catraca (TDD)

**Files:**
- Create: `scripts/quality/check-quality-ratchet.mjs`
- Test: `tests/unit/quality-ratchet.test.ts`

- [ ] **Step 1: Escrever o teste que falha**
```ts
// tests/unit/quality-ratchet.test.ts
import { test } from "node:test";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const SCRIPT = path.resolve("scripts/quality/check-quality-ratchet.mjs");

function run(baseline, metrics, extraArgs = []) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ratchet-"));
  const bPath = path.join(dir, "baseline.json");
  const mPath = path.join(dir, "metrics.json");
  fs.writeFileSync(bPath, JSON.stringify(baseline));
  fs.writeFileSync(mPath, JSON.stringify(metrics));
  try {
    const out = execFileSync("node", [SCRIPT, "--baseline", bPath, "--metrics", mPath, ...extraArgs], { encoding: "utf8" });
    return { code: 0, out, dir, bPath };
  } catch (e) {
    return { code: e.status, out: (e.stdout || "") + (e.stderr || ""), dir, bPath };
  }
}

test("passes when metrics equal baseline", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" }, "coverage.lines": { value: 80, direction: "up" } } };
  assert.equal(run(b, { eslintWarnings: 100, "coverage.lines": 80 }).code, 0);
});

test("fails when a 'down' metric regresses (more warnings)", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  const r = run(b, { eslintWarnings: 101 });
  assert.equal(r.code, 1);
  assert.match(r.out, /eslintWarnings/);
});

test("fails when an 'up' metric regresses (coverage drops)", () => {
  const b = { metrics: { "coverage.lines": { value: 80, direction: "up" } } };
  assert.equal(run(b, { "coverage.lines": 79 }).code, 1);
});

test("passes on improvement; --update ratchets the baseline", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  const r = run(b, { eslintWarnings: 90 }, ["--update"]);
  assert.equal(r.code, 0);
  const updated = JSON.parse(fs.readFileSync(r.bPath, "utf8"));
  assert.equal(updated.metrics.eslintWarnings.value, 90);
});

test("fails (code 2) when a baseline metric is missing from collected metrics", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  assert.equal(run(b, {}).code, 1);
});
```

- [ ] **Step 2: Rodar o teste e ver falhar**
```bash
node --import tsx --test tests/unit/quality-ratchet.test.ts
```
Expected: FAIL (script não existe ainda).

- [ ] **Step 3: Implementar o comparador**
```js
#!/usr/bin/env node
// scripts/quality/check-quality-ratchet.mjs
// Catraca genérica multi-métrica. Clona o espírito de check-t11-any-budget.mjs:
// um baseline congelado por métrica; falha em qualquer regressão; só anda num sentido.
import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
function getArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const BASELINE = path.resolve(getArg("--baseline", path.join(cwd, "quality-baseline.json")));
const METRICS = path.resolve(getArg("--metrics", path.join(cwd, "quality-metrics.json")));
const SUMMARY = getArg("--summary", null);
const UPDATE = process.argv.includes("--update");
const EPS = 0.01;

function load(p) {
  if (!fs.existsSync(p)) { console.error(`[quality-ratchet] arquivo ausente: ${p}`); process.exit(2); }
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const baseline = load(BASELINE);
const metrics = load(METRICS);
const failures = [];
const improvements = [];
const rows = [];

for (const [key, spec] of Object.entries(baseline.metrics)) {
  const current = metrics[key];
  const base = spec.value;
  const dir = spec.direction; // "down" = menor-é-melhor | "up" = maior-é-melhor
  if (current === undefined) { failures.push(`métrica "${key}" ausente em ${path.basename(METRICS)}`); rows.push([key, base, "—", "MISSING"]); continue; }
  let status = "ok";
  if (dir === "down") {
    if (current > base + EPS) { failures.push(`${key}: ${current} > baseline ${base} (não pode aumentar)`); status = "REGRESSÃO"; }
    else if (current < base - EPS) { improvements.push([key, current]); status = "↑ melhorou"; }
  } else {
    if (current < base - EPS) { failures.push(`${key}: ${current} < baseline ${base} (não pode cair)`); status = "REGRESSÃO"; }
    else if (current > base + EPS) { improvements.push([key, current]); status = "↑ melhorou"; }
  }
  rows.push([key, base, current, status]);
}

if (SUMMARY) {
  const md = ["# Quality Ratchet", "", "| Métrica | Baseline | Atual | Status |", "|---|---|---|---|",
    ...rows.map(([k, b, c, s]) => `| ${k} | ${b} | ${c} | ${s} |`), "",
    failures.length ? `**${failures.length} regressão(ões) — gate BLOQUEADO.**` : "**Sem regressões — gate OK.**"].join("\n");
  fs.mkdirSync(path.dirname(SUMMARY), { recursive: true });
  fs.writeFileSync(SUMMARY, md + "\n");
}

if (UPDATE && failures.length === 0 && improvements.length) {
  for (const [key, val] of improvements) baseline.metrics[key].value = val;
  fs.writeFileSync(BASELINE, JSON.stringify(baseline, null, 2) + "\n");
  console.log(`[quality-ratchet] baseline ratcheado: ${improvements.length} métrica(s) melhoraram`);
}

if (failures.length) { console.error("[quality-ratchet] FALHOU:\n" + failures.map((f) => "  ✗ " + f).join("\n")); process.exit(1); }
console.log(`[quality-ratchet] OK (${rows.length} métricas, ${improvements.length} melhoraram)`);
```

- [ ] **Step 4: Rodar o teste e ver passar**
```bash
node --import tsx --test tests/unit/quality-ratchet.test.ts
```
Expected: PASS (5/5).

- [ ] **Step 5: Commit**
```bash
git add scripts/quality/check-quality-ratchet.mjs tests/unit/quality-ratchet.test.ts
git commit -m "feat(quality): generic ratchet comparator (multi-metric, regression-only)"
```

### Task 1.2: Coletor de métricas (ESLint warnings + cobertura)

**Files:** Create: `scripts/quality/collect-metrics.mjs`

- [ ] **Step 1: Implementar o coletor**
```js
#!/usr/bin/env node
// scripts/quality/collect-metrics.mjs — emite quality-metrics.json
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const cwd = process.cwd();
const out = {};

// 1) ESLint: contagem de warnings (errors devem ser 0; o lint já gata isso)
function eslintCounts() {
  let stdout;
  try {
    stdout = execFileSync("npx", ["eslint", ".", "--format", "json"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  } catch (e) { stdout = e.stdout?.toString() || "[]"; } // eslint sai !=0 quando há errors
  const results = JSON.parse(stdout);
  out.eslintWarnings = results.reduce((n, r) => n + (r.warningCount || 0), 0);
  out.eslintErrors = results.reduce((n, r) => n + (r.errorCount || 0), 0);
}

// 2) Cobertura: lê coverage/coverage-summary.json se existir
function coverage() {
  const p = path.join(cwd, "coverage", "coverage-summary.json");
  if (!fs.existsSync(p)) return;
  const t = JSON.parse(fs.readFileSync(p, "utf8")).total;
  out["coverage.statements"] = t.statements.pct;
  out["coverage.lines"] = t.lines.pct;
  out["coverage.functions"] = t.functions.pct;
  out["coverage.branches"] = t.branches.pct;
}

eslintCounts();
coverage();
fs.writeFileSync(path.join(cwd, "quality-metrics.json"), JSON.stringify(out, null, 2) + "\n");
console.log("[collect-metrics]", JSON.stringify(out));
```

- [ ] **Step 2: Rodar e inspecionar a saída**
```bash
node scripts/quality/collect-metrics.mjs && cat quality-metrics.json
```
Expected: JSON com `eslintWarnings`, `eslintErrors` e (se houver coverage) os 4 `coverage.*`. **Anote `eslintWarnings`.**

- [ ] **Step 3: Commit**
```bash
git add scripts/quality/collect-metrics.mjs && echo "quality-metrics.json" >> .gitignore
git add .gitignore && git commit -m "feat(quality): metrics collector (eslint warnings + coverage)"
```

### Task 1.3: Congelar o baseline inicial

**Files:** Create: `quality-baseline.json` (**commitado**)

- [ ] **Step 1: Gerar o baseline a partir das métricas reais** (use os números anotados):
```json
{
  "_comment": "Catraca: 'down' nao pode aumentar, 'up' nao pode cair. Atualize via 'npm run quality:ratchet -- --update' (so em melhora).",
  "metrics": {
    "eslintWarnings": { "value": <N_REAL>, "direction": "down" },
    "coverage.statements": { "value": <S>, "direction": "up" },
    "coverage.lines": { "value": <L>, "direction": "up" },
    "coverage.functions": { "value": <F>, "direction": "up" },
    "coverage.branches": { "value": <B>, "direction": "up" }
  }
}
```

- [ ] **Step 2: Validar a catraca contra si mesma**
```bash
node scripts/quality/collect-metrics.mjs
node scripts/quality/check-quality-ratchet.mjs; echo "exit=$?"
```
Expected: `[quality-ratchet] OK` e `exit=0`.

- [ ] **Step 3: Provar que pega regressão** (teste manual): edite `quality-metrics.json` somando 1 a `eslintWarnings`, rode o comparador, confirme `exit=1`, depois descarte a edição.

- [ ] **Step 4: Adicionar scripts npm**
```json
"quality:collect": "node scripts/quality/collect-metrics.mjs",
"quality:ratchet": "node scripts/quality/check-quality-ratchet.mjs",
"quality:gate": "npm run quality:collect && npm run quality:ratchet"
```

- [ ] **Step 5: Commit**
```bash
git add quality-baseline.json package.json
git commit -m "feat(quality): freeze initial quality baseline (eslint warnings + coverage)"
```

### Task 1.4: Wire no CI (job + artefato + comentário no PR)

**Files:** Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Adicionar job `quality-gate`** (depois de `test-coverage`, para reusar `coverage/coverage-summary.json`):
```yaml
  quality-gate:
    name: Quality Ratchet
    runs-on: ubuntu-latest
    needs: test-coverage
    if: ${{ always() && needs.test-coverage.result == 'success' }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '24', cache: 'npm' }
      - run: npm ci
      - uses: actions/download-artifact@v4
        with: { name: coverage-report, path: coverage/ }
      - run: npm run quality:collect
      - run: node scripts/quality/check-quality-ratchet.mjs --summary .artifacts/quality-ratchet.md
      - if: always()
        run: cat .artifacts/quality-ratchet.md >> "$GITHUB_STEP_SUMMARY"
      - if: always()
        uses: actions/upload-artifact@v4
        with: { name: quality-ratchet, path: .artifacts/quality-ratchet.md }
```

- [ ] **Step 2: Adicionar comentário no PR** clonando o job `coverage-pr-comment` (marcador `<!-- omniroute-quality-ratchet -->`, lê `.artifacts/quality-ratchet.md`). Reuse o mesmo `github-script` de upsert de comentário.

- [ ] **Step 3: Validar num PR de teste** — confirmar que o job aparece, o step summary mostra a tabela, e o comentário é postado.

- [ ] **Step 4: Commit**
```bash
git add .github/workflows/ci.yml
git commit -m "ci(quality): add quality-ratchet job with PR comment + artifact"
```

---

# FASE 2 — Gates Determinísticos Anti-Alucinação

> Cada gate ataca um ímã de alucinação específico (ver §2.4 do relatório). Todos no padrão `check-*.mjs`. **`check-fetch-targets` vem com código completo** (parsing determinístico de arquivos, sem risco de inventar nomes de export). **`check-provider-consistency` e `check-openapi-routes` começam com um Step 0 de verificação dos nomes reais** — propositalmente, porque fabricar a forma do import/spec seria o exato anti-padrão que este plano combate.

### Task 2.1: `check-fetch-targets.mjs` — toda rota chamada pelo dashboard existe (TDD)

**Ataca:** ímã nº2 (300 paths `fetch("/api/...")` sem ligação com as rotas).

**Files:**
- Create: `scripts/check/check-fetch-targets.mjs`
- Test: `tests/unit/check-fetch-targets.test.ts`

- [ ] **Step 1: Escrever o teste que falha**
```ts
// tests/unit/check-fetch-targets.test.ts
import { test } from "node:test";
import assert from "node:assert";
import { resolveApiPathToRoute } from "../../scripts/check/check-fetch-targets.mjs";

test("matches a static route file", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/usage", files), true);
});

test("matches a dynamic [param] segment", () => {
  const files = new Set(["src/app/api/providers/[id]/models/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/providers/abc-123/models", files), true);
});

test("rejects a hallucinated route", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/providers/refresh", files), false);
});
```

- [ ] **Step 2: Rodar e ver falhar**
```bash
node --import tsx --test tests/unit/check-fetch-targets.test.ts
```
Expected: FAIL (módulo não existe).

- [ ] **Step 3: Implementar o gate**
```js
#!/usr/bin/env node
// scripts/check/check-fetch-targets.mjs
// Todo fetch("/api/...") em src/app/(dashboard) deve resolver para um route.ts real.
import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const DASH = path.join(cwd, "src/app/(dashboard)");
const API = path.join(cwd, "src/app/api");

// allowlist de paths dinâmicos/externos que o checker não consegue resolver estaticamente
const IGNORE = [/^\/api\/v1\//, /\$\{/, /` \+/]; // /v1 é a superfície OpenAI-compat; templates

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
  return new Set(walk(API).filter((p) => /route\.tsx?$/.test(p)).map((p) => path.relative(cwd, p).replace(/\\/g, "/")));
}

export function resolveApiPathToRoute(apiPath, routeFiles) {
  // apiPath ex.: /api/providers/abc/models  →  src/app/api/providers/[id]/models/route.ts
  const segs = apiPath.replace(/^\//, "").replace(/[?#].*$/, "").split("/"); // ["api","providers","abc","models"]
  for (const rf of routeFiles) {
    const rsegs = rf.replace(/^src\/app\//, "").replace(/\/route\.tsx?$/, "").split("/"); // ["api","providers","[id]","models"]
    if (rsegs.length !== segs.length) continue;
    const ok = rsegs.every((rs, i) => rs === segs[i] || /^\[.*\]$/.test(rs));
    if (ok) return true;
  }
  return false;
}

function extractFetchPaths(file) {
  const src = fs.readFileSync(file, "utf8");
  const re = /(?:fetch|fetchJson|apiFetch)\(\s*["'`](\/api\/[^"'`?]+)/g;
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
      if (!resolveApiPathToRoute(apiPath, routeFiles)) misses.push(`${path.relative(cwd, f)} → ${apiPath}`);
    }
  }
  if (misses.length) {
    console.error(`[check-fetch-targets] ${misses.length} fetch(es) para rota inexistente:\n` + misses.map((m) => "  ✗ " + m).join("\n"));
    process.exit(1);
  }
  console.log(`[check-fetch-targets] OK (${routeFiles.size} rotas conhecidas)`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
```

- [ ] **Step 4: Rodar o teste unitário e ver passar**
```bash
node --import tsx --test tests/unit/check-fetch-targets.test.ts
```
Expected: PASS (3/3).

- [ ] **Step 5: Rodar o gate no repo real** (modo descoberta — pode encontrar misses legítimos)
```bash
node scripts/check/check-fetch-targets.mjs; echo "exit=$?"
```
Se encontrar misses reais: triagem — ou são rotas faltantes (bug), ou paths dinâmicos a adicionar ao `IGNORE`. **Não** mascare; documente cada exceção no `IGNORE` com comentário.

- [ ] **Step 6: Adicionar script + commit**
```json
"check:fetch-targets": "node scripts/check/check-fetch-targets.mjs"
```
```bash
git add scripts/check/check-fetch-targets.mjs tests/unit/check-fetch-targets.test.ts package.json
git commit -m "feat(check): gate that every dashboard fetch() targets a real API route"
```

### Task 2.2: `check-provider-consistency.ts` — ids batem entre os 3 arquivos

**Ataca:** ímã nº1 (split de provider; 229 vs 155 vs N já divergem).

**Files:** Create: `scripts/check/check-provider-consistency.ts` (rodado via `tsx`); Test: `tests/unit/check-provider-consistency.test.ts`

- [ ] **Step 0 (VERIFICAÇÃO — obrigatório antes de codar):** descobrir os nomes reais de export, para **não inventar**:
```bash
grep -nE "export (const|function) " src/shared/constants/providers.ts | grep -iE "provider|section" | head
grep -nE "getOrCreateAiProviders|_PROVIDER_SECTIONS|AI_PROVIDERS" src/shared/constants/providers.ts | head
grep -nE "baseUrl|^\s*['\"][a-z0-9-]+['\"]\s*:" open-sse/config/providerRegistry.ts | head
grep -nE "case ['\"]|=== ['\"]|SPECIALTY_VALIDATORS" src/lib/providers/validation.ts | head
```
Anote: como enumerar os ids canônicos em runtime, a forma das chaves do `providerRegistry.ts`, e onde `validation.ts` lista os providers cobertos.

- [ ] **Step 1: Escrever o teste** com fixtures sintéticas (3 conjuntos de ids), afirmando que o diff detecta um id presente em um e ausente em outro. (Implemente a lógica como função pura `diffProviderSets(canonical, registry, validators)` que retorna `{missingInRegistry, missingInValidators, orphanInRegistry}`.)

- [ ] **Step 2: Rodar e ver falhar.**

- [ ] **Step 3: Implementar** importando os ids reais (descobertos no Step 0) e cruzando-os. Reusar o padrão de `scripts/check/check-docs-counts-sync.mjs` (que **já conta** executors/oauth/strategies vs docs — é o template direto). Para ids que legitimamente vivem só num lugar, manter um `KNOWN_EXCEPTIONS` allowlist com comentário por entrada.

- [ ] **Step 4: Rodar no repo real**, triar as divergências reais (as contagens já divergem — algumas serão bugs de registro pela metade, outras exceções legítimas).

- [ ] **Step 5: Commit** (`feat(check): provider-id consistency gate across providers.ts/registry/validation`).

**Critério de aceitação:** o gate falha quando um id existe em `providers.ts` mas não no `providerRegistry.ts` (ou vice-versa), e quando um model no registry referencia um provider id desconhecido.

### Task 2.3: `check-openapi-routes.mjs` — spec ↔ rotas (bidirecional)

**Ataca:** docs-hallucination (endpoint inventado no `openapi.yaml`).

**Files:** Create: `scripts/check/check-openapi-routes.mjs`; Test correspondente.

- [ ] **Step 0 (VERIFICAÇÃO):** confirmar o caminho e a forma do spec:
```bash
ls docs/reference/openapi.yaml && grep -nE "^\s{2,4}/[a-z]" docs/reference/openapi.yaml | head
```
Confirmar como `check-openapi-coverage.mjs` já parseia o YAML (reusar o parser dele).

- [ ] **Step 1–5 (TDD):** teste com spec sintética → implementar: toda `path` do spec resolve para um `route.ts` (reusando `resolveApiPathToRoute` da Task 2.1) e toda rota não-interna aparece no spec (com allowlist para rotas LOCAL_ONLY/internas). Commit.

### Task 2.4: `check-deps.mjs` — anti-slopsquatting

**Ataca:** pacotes alucinados (CSA: 19,7% das amostras IA).

**Files:** Create: `scripts/check/check-deps.mjs`; Test.

- [ ] **Step 0 (VERIFICAÇÃO):** decidir política — allowlist = todas as deps atuais do `package.json`/lockfile como baseline; novas deps exigem (a) existir no registry, (b) idade ≥ 72h, (c) entrada explícita.
- [ ] **Step 1–5 (TDD):** teste com `package.json` sintético adicionando uma dep nova → gate falha se a dep não está no baseline E (não existe no registry OU foi publicada há <72h). Usar `npm view <pkg> time.created` para idade. Reusar o padrão diff-base...HEAD de `check-pr-test-policy.mjs`. Commit.

### Task 2.5 (opcional): lints Rule #11/#12 via `no-restricted-syntax`

- [ ] Estender o `eslint.config.mjs` (bloco `no-restricted-syntax` já usado p/ a regra de busca turca) para sinalizar `NextResponse.json({ error: "<string>" })` cru (exigir `buildErrorBody()`) e literais de `clientIdDefault`/`clientSecretDefault` no `providerRegistry.ts` (exigir `resolvePublicCred()`). Ratchet via contagem (adoção 11% → sobe). TDD com fixtures de ESLint.

**Plugar tudo da Fase 2 no CI:** adicionar `check:fetch-targets`, `check:provider-consistency`, `check:openapi-routes`, `check:deps` ao job `lint` (ou `docs-sync-strict`) do `ci.yml`, e ao pre-commit barato quando rápidos o suficiente.

---

# FASE 3 — Catraca de Duplicação + Tamanho (mata-slop) — *expandir em sub-plano*

**Justificativa:** GitClear mostra duplicação 4–8× na era IA; é a assinatura nº1 de slop. Nenhum gate hoje (Sonar CPD excluído).

**Specs (criar sub-plano `writing-plans` a partir daqui):**

1. **Adicionar `jscpd` v5** como devDependency. Rodar `jscpd --reporters json src open-sse` → `quality-metrics.json` ganha `duplication.pct`. **[verificar no install]** o schema JSON do v5 antes de parsear (ver ressalva no relatório §4.2).
2. **Estender `collect-metrics.mjs`** com um coletor de duplicação (lê o JSON do jscpd) e um coletor de **tamanho de arquivo** (conta LOC de cada arquivo em `src`+`open-sse`, emite `fileSize.<path>` para os arquivos já acima de um teto, ex. >700 LOC — congelando os 64 atuais).
3. **Adicionar regras ESLint** em `eslint.config.mjs` como `warn`: `max-lines` (700), `max-lines-per-function` (80), `complexity` (15), `sonarjs/cognitive-complexity` (15). Coletor adiciona `eslintWarnings` por categoria (a contagem já está na catraca da Fase 1; opcionalmente segregar `complexityWarnings`).
4. **Estender `quality-baseline.json`** com `duplication.pct` (`down`) e os `fileSize.*` dos arquivos grandes (`down` — só podem encolher; arquivos novos têm teto absoluto).
5. **Teto absoluto para arquivos novos:** o gate falha se um arquivo **não** presente no baseline nasce acima do teto (ex. 700 LOC) — impede o próximo god-component.

**Critérios de aceitação:** PR que aumenta a duplicação % falha; PR que cresce qualquer um dos 64 arquivos grandes falha; PR que cria arquivo novo >700 LOC falha; refator que encolhe um arquivo grande ratcheta o baseline para baixo (via `--update`).

---

# FASE 4 — Catraca de Cobertura + Anti Test-Masking — *expandir em sub-plano*

**Specs:**

1. **`check-coverage-ratchet`** já é coberto pelo motor da Fase 1 (as 4 métricas `coverage.*` com `direction: "up"`). Confirmar que o job `quality-gate` roda **após** o merge dos 8 shards de cobertura no CI (não localmente, onde a cobertura é parcial). Adicionar **epsilon** maior (ex. 0.5) para `coverage.branches` por causa do não-determinismo do v8.
2. **Pisos por módulo crítico:** estender `collect-metrics.mjs` para emitir `coverage.<modulo>.lines` para uma lista curta de módulos de alto risco (lendo o `coverage-summary.json` por arquivo): `open-sse/handlers/chatCore.ts`, `open-sse/services/combo.ts`, `open-sse/services/accountFallback.ts`, `src/sse/services/auth.ts`, `src/server/authz/routeGuard.ts`, `open-sse/utils/error.ts`, `open-sse/utils/publicCreds.ts`, `src/shared/utils/circuitBreaker.ts`. Cada um vira métrica `up` no baseline (implementa o "risco, não % bruto" do vídeo).
3. **`check-test-masking.mjs`** (anti enfraquecimento de asserts): clonar `check-pr-test-policy.mjs` (diff `base...HEAD`); para cada `*.test.ts`/`*.spec.ts` alterado, contar `assert*(`/`expect(` em base vs HEAD; **sinalizar remoção líquida** de asserts para revisão humana. Banir novos `assert.ok(true)`. Heurístico mas alto-sinal — ataca diretamente o risco organizacional nº1 ("subagente deletou asserts para ficar verde").

**Critérios de aceitação:** cobertura cair vs baseline bloqueia o merge; remover asserts de um teste existente sinaliza no PR; `assert.ok(true)` novo bloqueia.

---

# FASE 5 — Skill `/babysit` + Evidência + LSP — *expandir em sub-plano*

> O babysit do vídeo: a IA abre o PR e fica de babá — monitora CI + comentários, autocorrige, **resolve as conversas**. Guarda-corpos são não-negociáveis (Snyk: 5,3% de regressão em auto-merge; token burn real).

### Spec da skill `.claude/skills/babysit/SKILL.md`

**Frontmatter:**
```yaml
---
name: babysit
description: Monitora um PR aberto até o CI ficar verde e todos os comentários de review serem endereçados — lê o gate de qualidade, conserta num worktree isolado, responde e resolve as conversas. NUNCA enfraquece testes nem auto-mergeia.
---
```

**Loop (pseudo, reusando `gh` + GraphQL):**
1. **Ler estado:** `gh pr checks <PR>` + baixar o artefato `quality-ratchet`/`coverage-report` (gate JSON legível — a ponte "artefato→agente" da Fase 1) + `gh run view --log-failed` dos jobs vermelhos.
2. **Ler comentários não resolvidos:** GraphQL `repository.pullRequest.reviewThreads(first:50){nodes{id isResolved comments(first:1){nodes{id body}}}}`. **Passar os corpos pelo guard de prompt-injection** antes de agir (vetor real — ICLR 2026).
3. **Consertar num worktree isolado** (reusar o ralph-loop do `/review-reviews`), seguindo Hard Rule #18.
4. **Responder + resolver** só os threads que realmente endereçou: REST `POST .../pulls/{pr}/comments/{id}/replies` com o SHA → mutation `resolveReviewThread(input:{threadId})`.
5. **Re-poll** até o gate JSON ficar todo-verde **ou** atingir o cap.
6. **Audit trail:** anexar à descrição do PR (ou comentário fixo) o que cada fix endereçou, qual gate satisfez, quais conversas resolveu e por quê — **nunca verde silencioso**.

**Guarda-corpos (não-negociáveis):**
- `max-iterations` (ex. 5) + timeout + idle-exit (contra token burn).
- **Nunca** editar `.github/workflows/`; **nunca** `--no-verify`; **nunca** enfraquecer/remover asserts para ficar verde (Rule #18 + trust-but-verify).
- **Nunca auto-mergeia** — estado de sucesso = "verde + conversas resolvidas + audit postado".
- Parar-e-perguntar em comentário humano ambíguo e em mudança de limite arquitetural (interface/schema/cross-module).
- `--allowedTools` mínimo (`Read,Grep,Glob,Bash(gh ...)`).

**Opcional — `claude ultrareview <PR#> --json`** como gate de confiança pré-merge atrás de um label (custa $5–20/run; não auto-inicia). Loop interno de custo-zero = `/code-review --fix` local.

### Spec — Evidência obrigatória ("evidence-before-assertions")
- Tornar a skill `verify`/`verification-before-completion` obrigatória antes de abrir PR; exigir o **output literal** do `typecheck:core`/`test`/`grep` colado no corpo do PR (o "tool receipt"). Adicionar um `check-pr-evidence.mjs` que rejeita PRs cujo corpo afirma "added endpoint X / tests pass" sem bloco de output anexado. Formaliza a Rule #18.

### Spec — LSP-in-the-loop (opcional)
- Registrar `agent-lsp` (MCP) ou o `tsserver` para os agentes terem `blast_radius`/diagnostics e `preview_edit` antes de escrever — vira "símbolo inventado" de catch-de-review para impossibilidade-no-edit. Pareia com `typecheck:core` como gate pré-PR (compile-before-claim).

**Critérios de aceitação:** a skill `/babysit <PR#>` leva um PR de vermelho a verde sem auto-merge, resolve só as conversas que endereçou, respeita o cap de iterações, e deixa rastro auditável; nenhum assert é enfraquecido.

---

## Self-Review (checklist do autor)

- **Cobertura do spec:** Fases 0–2 mapeiam 1:1 com as recomendações do relatório §5; Fases 3–5 cobrem duplicação/tamanho, cobertura/masking e babysit/evidência. ✓
- **Sem placeholders nos passos bite-sized:** Fases 0/1/2.1 têm comandos e código reais. As Fases 2.2–2.4 usam um Step-0 de verificação **deliberado** (não placeholder) para não fabricar nomes de export — coerente com o objetivo anti-alucinação. ✓
- **Consistência de tipos:** `resolveApiPathToRoute` (Task 2.1) é reusada na Task 2.3; o comparador usa o mesmo formato `{value, direction}` em todas as fases; `quality-metrics.json` é a interface única coletor↔comparador. ✓
- **Ordem de dependência:** Fase 1 (motor) precede 3/4 (que só adicionam métricas ao baseline); Fase 0 destrava o resto. ✓

## Handoff de Execução

**Plano salvo em `PLANO-QUALITY-GATES.md`.** Duas opções:

1. **Subagent-Driven (recomendado)** — um subagente fresco por task, review entre tasks. SUB-SKILL: `superpowers:subagent-driven-development`.
2. **Inline** — executar nesta sessão com checkpoints. SUB-SKILL: `superpowers:executing-plans`.

**Recomendação:** começar pela **Fase 0** (quick wins, baixo risco) e **Fase 1** (motor de catraca) numa branch `feat/quality-ratchet`, validar num PR de teste, e só então abrir as fases anti-alucinação. Fases 3–5 viram sub-planos próprios.
