---
title: "Quality-Gate Maturity Re-evaluation (Fase 9)"
---

# Reavaliação de Maturidade — pós-Ondas 0–3 (Quality-Gate v2)

> **O que é este documento.** Uma re-medição da maturidade do sistema de quality-gates
> **após** as Ondas 0–3 do programa Quality-Gate v2, comparada ao baseline registrado em
> [`QUALITY_GATE_PLAYBOOK.md`](./QUALITY_GATE_PLAYBOOK.md) (2026-06-16). Mede o que mudou,
> contra DSOMM L5 / OpenSSF Scorecard 9 / SLSA L3, separando o que é **CI-mensurável**
> (já entregue / entregável por código) do que é **processo/owner** (settings de organização).
>
> **Data:** 2026-06-30. Gerado do estado real do repositório, não da memória.
> **Régua:** OWASP DSOMM · OpenSSF Scorecard · SLSA · SonarQube "Clean as You Code".

---

## 1. Veredito atualizado

**Nota geral: A− → A ("Avançado", topo ~5%).** As **duas maiores fraquezas estruturais**
do baseline 06-16 — o *buraco fast-gates* e o *mutation-score-não-catraca* — foram **fechadas**.
Os gaps residuais para "máximo absoluto" são quase todos **owner/infra-gated** (branch-protection,
SLSA L3, CodeQL advanced); o lado-código do programa está essencialmente completo.

| Framework de referência | Baseline 06-16 | Agora 06-30 | Movimento | Evidência |
| --- | --- | --- | --- | --- |
| **OWASP DSOMM** (5 níveis) | L3→L4 | **L4** em *Test Intensity* e *Static Depth*; L3 sólido nas demais | ▲ | mutation-ratchet bloqueante + suíte determinística no gate-de-merge |
| **OpenSSF Scorecard** | ~7–8/10 | ~7–8/10 (inalterado — gate é o **owner**) | = | falta Branch-Protection na `main` (setting do dono) + pin de actions |
| **SLSA** | L2→L3 | **L2** (encostando em L3) | = | falta builder hermético/reprodutível (infra/owner) |
| **SonarQube "Clean as You Code"** | Alinhado c/ ressalva | Alinhado c/ ressalva | = | ressalva de *sprawl* (~46+ gates) permanece — review de ROI pendente |
| **Quality-Ratchet pattern** | Exemplar | **Exemplar+** | ▲ | novo `dedicatedGate` de `mutationScore` (direction up) |
| **Mutation testing** | "Quase lá" (não-catraca) | **Catraca ativa** | ▲▲ | `check-mutation-ratchet.mjs` + baseline semeado + job nightly bloqueante |

---

## 2. Deltas desde 2026-06-16 (o que as Ondas 0–3 entregaram)

### 2.1 🔴→✅ Buraco fast-gates FECHADO (era a fraqueza estrutural #1)
O baseline alertava: `quality.yml` (PR→`release/**`) rodava **só gates de filesystem** — sem
typecheck, testes ou build —, então regressões determinísticas só explodiam no PR→`main`.
**Hoje** `.github/workflows/quality.yml` roda, no job *Fast Quality Gates*: `typecheck:core`,
**testes unitários impactados (TIA) bloqueantes com fail-safe para a suíte completa**, o
fast-path do **vitest**, e shards de unit. O gate agora roda **onde o merge acontece** (shift-left),
exatamente o princípio transversal que o playbook prescreve.

### 2.2 🟠→✅ Mutation score virou CATRACA (era a fraqueza #3 / P0 #1)
O antídoto mais forte contra coverage-gaming estava **advisory**. **Hoje**:
- `scripts/check/check-mutation-ratchet.mjs` (advisory por default, `--ratchet` bloqueante, skip gracioso);
- `config/quality/quality-baseline.json` tem entradas `mutationScore.<módulo>` semeadas (`direction: up`, `dedicatedGate`);
- `.github/workflows/nightly-mutation.yml` tem o job **"Mutation score ratchet (blocking)"** que unifica os relatórios por-batch e ratcheteia os scores merged por-módulo.

Resultado: o score de mutação por-módulo **não pode regredir** — cobertura deixou de ser vanity-metric.

### 2.3 ✅ Quick-wins de gate (Fase 6A/7) entregues
- **a11y axe-core "fake-green" corrigido:** `@axe-core/playwright` em devDeps; `a11y.spec.ts` com skip condicional `REQUIRE_AXE`; job no `nightly-resilience.yml`.
- **complexity varre `bin/`+`electron`:** `check-complexity.mjs` inclui esses diretórios no `ESLINT_ARGS`.
- **tracked-artifacts no pre-commit + pre-push:** `.husky/pre-commit` + `pre-push` bloqueiam artefato rastreado por engano.

---

## 3. As 12 categorias — situação (delta-focada)

| # | Categoria | Situação 06-30 |
| --- | --- | --- |
| 1 | Estilo & formatação | ✅ inalterado (Prettier+ESLint lint-staged) |
| 2 | Tipos | ✅ **reforçado** — `typecheck:core` agora também no gate PR→release |
| 3 | Testes (intensidade) | ✅ **reforçado** — mutation testing virou catraca; suíte determinística no gate-de-merge |
| 4 | Política de testes (anti-gaming) | ✅ inalterado (pr-test-policy/test-masking/pr-evidence) |
| 5 | Complexidade & saúde | ✅ **reforçado** — complexity varre bin/electron |
| 6 | Segurança estática (SAST+segredos) | 🟡 CodeQL default-setup (advanced = owner); semgrep cloud não-versionado |
| 7 | Supply-chain (deps) | ✅ inalterado (osv/audit/Trivy/Dependabot + allowlist) |
| 8 | Supply-chain (build/release) | 🟡 SLSA L2 (L3 = builder hermético, owner/infra) |
| 9 | Contratos & API | 🟡 oasdiff/osv advisory (candidatos a bloqueante-com-escopo, P1) |
| 10 | Docs & i18n (anti-rot) | ✅ **reforçado** — `fabricated-docs --strict` bloqueante (verificado exit 0) |
| 11 | Anti-alucinação / consistência | ✅ inalterado (known-symbols/fetch-targets/docs-symbols/db-rules) |
| 12 | Resiliência & domínio | ✅ inalterado (chaos/heap/k6/promptfoo/garak nightly) |

---

## 4. Gap residual para "máximo absoluto"

### 4.1 CI-mensurável / entregável por código (backlog deste programa)
- **P1 — osv/oasdiff → bloqueante com escopo certo:** osv só `CRITICAL`+fixable (two-step como o Trivy); oasdiff bloqueia breaking-change de contrato.
- **P1 — `require-tighten` bloqueante (fim de ciclo):** trava ganhos de métrica (impede afrouxar baseline sem registrar).
- **P1/P2 — review de ROI / sprawl de gates:** consolidar micro-gates de doc-sync; medir timing por-gate no `ci-summary` (combate a fadiga — ressalva do SonarQube/DORA). Os merges ROI deferidos (complexity unificada; `/api` anti-alucinação unificada) entram aqui.
- **P2 — CodeQL config commitado + semgrep versionado:** mais controle/reprodutibilidade.

### 4.2 Processo / owner (CI não move — settings de organização)
- **Branch-protection na `main`** (sobe Scorecard, fecha o gap DSOMM). Ver [`BRANCH_PROTECTION_MAIN.md`](./BRANCH_PROTECTION_MAIN.md).
- **CodeQL Default → Advanced setup.**
- **SLSA L3** — builder hermético/reprodutível (gerador SLSA do GitHub). Stretch (diminishing returns).

### 4.3 Explicitamente fora-de-escopo
- **DSOMM L5** é majoritariamente **org-level / processo** (não CI-codificável).
- **SLSA L4** (bit-a-bit reprodutível) é stretch declarado.

---

## 5. Itens deferidos / removidos (housekeeping da cauda)

- **`semcheck.yaml` (camada LLM de drift semântico docs↔code) — REMOVIDO.** Estava **órfão**
  (nenhum workflow/script o invocava) e com contagens stale nas regras. A cobertura determinística
  já existe (`check:fabricated-docs --strict` + `check:docs-counts-sync` + `check:docs-symbols`),
  e a ressalva de *gate sprawl* desaconselha adicionar um gate LLM advisory de custo recorrente.
  Pode ser re-introduzido no futuro como job nightly opt-in se o drift semântico virar problema real.
- **`agent-lsp` scaffold — DEFERIDO / opt-in não-ativado.** Existe como menção em docs
  (`docs/architecture/QUALITY_GATES.md`, CHANGELOG) mas **sem wiring** e sem `.mcp.json.example`
  no repo. Permanece como scaffold opt-in documentado; não é um gate ativo nem um gap de maturidade.
