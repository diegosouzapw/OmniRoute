# Fase 7 — Quality Gates: Segurança, Dead-Code, Mutação & Ferramental Community

> **Para workers agênticos:** SUB-SKILL OBRIGATÓRIA: `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans`, tarefa-a-tarefa. Cada tarefa aqui é um subsistema independente → **expandir em sub-plano bite-sized próprio** no momento da execução. Hard Rule #18 (TDD/VPS) em tudo.

> # ⏳ PORTÃO DE ATIVAÇÃO — NÃO INICIAR ANTES DE **2026-06-16**
> **Este plano está GUARDADO, não ativo.** Decisão do owner (2026-06-09): finalizar 100% as Fases 0–6 (PR #3471), **usar em produção por 1 semana** para validar na prática, e só então evoluir. **Data cravada de início da Fase 7: 2026-06-16.** Não ativar antes — o objetivo da semana é coletar sinal real (falsos-positivos dos gates, custo de CI, atrito) antes de adicionar mais.
> **Pré-condições para ativar:** (1) PR #3471 (Fases 0–6) mergeada e rodada ≥1 semana; (2) re-home do PR para `release/v3.8.18` resolvido; (3) as issues #3483–#3501 com decisões aplicadas ou conscientemente adiadas; (4) **Fase 6A executada (ou conscientemente re-priorizada)** — a auditoria crítica de 2026-06-09 ([`PLANO-QUALITY-GATES-FASE6A.md`](./PLANO-QUALITY-GATES-FASE6A.md)) encontrou bugs sistêmicos de runner (≈135 testes órfãos, vitest fora do CI) e furos de escopo nos gates existentes que devem ser consertados ANTES de adicionar ferramentas novas por cima.

**Goal:** Maximizar a cobertura de quality gates do OmniRoute adicionando catracas de **segurança** (Sonar/osv/CodeQL → zero na timeline), **dead-code**, **complexidade cognitiva**, **type-coverage**, **mutação**, **bundle-size**, **a11y** e completando o anti-slopsquatting — usando **somente ferramentas Community/OSS** (projeto é open-source, zero SaaS pago, dados na box).

**Architecture:** Reusa o motor existente — toda métrica numérica entra como `{value, direction}` em `quality-baseline.json` (catraca só-regressão) ou vira um `scripts/check/check-*.mjs` dedicado (padrão `check-t11-any-budget.mjs`). Gates pesados vão no job paralelo `quality-gate`; gates rápidos no `lint`; mutação/visual em job nightly separado. Tudo só-regressão (sem flag-day).

**Tech Stack (tudo OSS/Community):** SonarQube **Community Build** (self-hosted) · osv-scanner (Google) · CodeQL (GitHub, grátis p/ público) · knip · eslint-plugin-sonarjs · type-coverage · lockfile-lint · dpdm · Stryker (`@stryker-mutator/*`) · size-limit · `@axe-core/playwright` · semcheck · agent-lsp (MCP) · Qlty CLI (OSS, opcional) · **gitleaks** (secret scanning, MIT; avaliar o sucessor drop-in Betterleaks, 2026-03) · **actionlint + zizmor** (lint + auditoria de segurança dos workflows) · **license-compliance** (allowlist SPDX de licenças). ESLint 9 flat · c8 · Node native test runner · GitHub Actions.

---

## Princípio (igual às Fases 0–6)

Toda catraca é **só-regressão**: congela o baseline atual, bloqueia QUALQUER piora, decai a zero/melhor com o tempo via `--update`. Nenhum gate exige limpeza imediata (flag-day). Cada ferramenta nova que vira dependência **deve ser adicionada a `dependency-allowlist.json`** (o gate `check-deps` da Fase 2 vai exigir — é o ponto de revisão humana).

## Mapa de arquivos (criar/modificar)

| Arquivo | Responsabilidade |
|---|---|
| `quality-baseline.json` (modificar) | + `vulnCount`, `codeqlAlerts`, `sonarIssues`, `cognitiveComplexity`, `typeCoveragePct`, `deadExports` |
| `scripts/quality/collect-metrics.mjs` (modificar) | + coletores: osv-scanner, CodeQL count, Sonar API, knip, type-coverage, sonarjs |
| `scripts/check/check-vuln-ratchet.mjs` (criar) | osv-scanner → vulnCount (catraca) |
| `scripts/check/check-dead-code.mjs` (criar) | knip → exports/files/deps mortos (catraca) |
| `scripts/check/check-cognitive-complexity.mjs` + `eslint.sonarjs.config.mjs` (criar) | sonarjs/cognitive-complexity em config isolado (não polui o count principal) |
| `scripts/check/check-type-coverage.mjs` (criar) | type-coverage % (catraca up) |
| `scripts/check/check-lockfile.mjs` (criar) | lockfile-lint (host/https/integrity) |
| `scripts/check/check-pr-evidence.mjs` (criar) | exige output de comando no corpo do PR (Rule #18 mecânica) |
| `scripts/check/check-bundle-size.mjs` + `.size-limit.json` (criar) | size-limit → orçamento de bundle |
| `tests/e2e/a11y.spec.ts` (criar) | `@axe-core/playwright` nas páginas-chave |
| `stryker.conf.json` (criar) | mutação nos ~8 módulos críticos (nightly) |
| `sonar-project.properties` (modificar) | remover `coverage`/`cpd` exclusions; ativar new-code gate |
| `.github/workflows/ci.yml` (modificar) | wirar novos gates (lint / quality-gate / nightly) + `qualitygate.wait` no Sonar |
| `semcheck.yaml` (criar) | semcheck: docs↔código (camada fuzzy LLM, opcional) |
| `.mcp.json` / config de agentes (modificar) | registrar agent-lsp (LSP-in-the-loop) |
| `.gitleaks.toml` + `scripts/check/check-secrets.mjs` (criar) | gitleaks → catraca de findings de secret (Task 18) |
| `.github/workflows/quality.yml` ou job lint (modificar) | actionlint + zizmor sobre `.github/workflows/**` (Task 19) |
| `scripts/check/check-licenses.mjs` + `.license-allowlist.json` (criar) | allowlist SPDX das licenças das deps (Task 20) |
| `dependency-allowlist.json` (modificar) | + osv-scanner, knip, sonarjs, type-coverage, lockfile-lint, stryker, size-limit, axe-core, dpdm, license-compliance |

---

## Tarefas (cada uma = 1 sub-plano bite-sized na execução)

### Task 1 — Ativar SonarQube Community + "Clean as You Code" (gate de segurança nativo)
- **Tool:** SonarQube Community Build (self-hosted, grátis).
- **Files:** `sonar-project.properties`, `.github/workflows/ci.yml` (job `sonarqube`).
- **Approach:** setar secrets `SONAR_TOKEN`/`SONAR_HOST_URL`; **remover** `sonar.coverage.exclusions=**/*` e `sonar.cpd.exclusions=**/*` (hoje neutralizam o Sonar); ativar o quality gate **new-code / "Clean as You Code"** (código novo não pode adicionar issue/bug/vuln/hotspot; legado grandfathered) + adicionar `-Dsonar.qualitygate.wait=true` para **bloquear** o PR (hoje o job é inerte: secrets-gated, sem wait).
- **Acceptance:** PR que introduz um code-smell/bug/vuln em código novo falha o gate; legado não bloqueia. Documentar suppressions legítimas (já há h1–h6 no properties).

### Task 2 — Catraca de vulnerabilidades (osv-scanner)
- **Tool:** osv-scanner (Google/OSV, OSS) — `--format json`, on-box.
- **Files:** `scripts/check/check-vuln-ratchet.mjs`, `quality-baseline.json` (+`vulnCount`), `collect-metrics.mjs`, `ci.yml` (job `quality-gate`), `dependency-allowlist.json`.
- **Approach:** rodar `osv-scanner --format json` sobre os lockfiles → contar vulns → métrica `vulnCount {direction: down}`. Catraca: não pode subir, decai a zero. Mantém o `npm audit` escalonado da Fase 0 como bloqueio de crítico imediato; osv é o ratchet de timeline.
- **Acceptance:** nova dep com vuln conhecida sobe o count → falha; remediar/remover baixa → `--update`.

### Task 3 — Catraca de alertas CodeQL
- **Tool:** GitHub CodeQL (já roda; grátis p/ repo público).
- **Files:** `scripts/check/check-codeql-ratchet.mjs`, `quality-baseline.json` (+`codeqlAlerts`), `ci.yml`.
- **Approach:** puxar a contagem de alertas abertos via `gh api /repos/{owner}/{repo}/code-scanning/alerts?state=open` → métrica `codeqlAlerts {down}`. (Respeitar Hard Rule #14 — dismiss só com justificativa; alertas dismissed não contam.)
- **Acceptance:** novo alerta CodeQL sobe o count → sinaliza; resolver baixa.

### Task 4 — Dead-code / unused-exports / unused-deps (knip)
- **Tool:** knip (OSS, v6+) — `--reporter json`.
- **Files:** `scripts/check/check-dead-code.mjs`, `quality-baseline.json` (+`deadExports`/`unusedDeps`), `knip.json` (config), `collect-metrics.mjs`, `ci.yml`, `dependency-allowlist.json`.
- **Approach:** `knip --reporter json` sobre os workspaces `src/`+`open-sse/` → contar unused files/exports/deps → catraca `down`. Config knip ciente do monorepo + Next 16.
- **Acceptance:** novo export/dep morto sobe → falha; remoção baixa.

### Task 5 — Complexidade cognitiva (eslint-plugin-sonarjs, config isolado)
- **Tool:** eslint-plugin-sonarjs (OSS) — `sonarjs/cognitive-complexity`.
- **Files:** `eslint.sonarjs.config.mjs` (config standalone, NÃO o principal — não polui o `eslintWarnings=3482`), `scripts/check/check-cognitive-complexity.mjs`, `quality-baseline.json` (+`cognitiveComplexity`), `ci.yml` (job `quality-gate`), `dependency-allowlist.json`.
- **Approach:** mesmo molde do `check-complexity` (Fase 6) mas com `sonarjs/cognitive-complexity` num config isolado; contar violações → catraca `down`. (Complementa a complexidade ciclomática core já existente.)
- **Acceptance:** função acima do limite cognitivo sobe o count → falha.

### Task 6 — Type-coverage ratchet
- **Tool:** type-coverage (OSS).
- **Files:** `scripts/check/check-type-coverage.mjs`, `quality-baseline.json` (+`typeCoveragePct {up}`), `dependency-allowlist.json`.
- **Approach:** `type-coverage --detail --json` → % de símbolos tipados → catraca `up`. Complementa o `check:any-budget` (count de `any` por arquivo) com a visão %-global.
- **Acceptance:** queda do % tipado → falha.

### Task 7 — Lockfile policy (lockfile-lint)
- **Tool:** lockfile-lint (OSS, v5).
- **Files:** `scripts/check/check-lockfile.mjs`, `ci.yml` (lint), `dependency-allowlist.json`.
- **Approach:** `lockfile-lint --path package-lock.json --type npm --validate-https --validate-integrity --allowed-hosts npm` → gate pass/fail (não é ratchet; é política anti-poisoning). Complementa o `check-deps` (Fase 2).
- **Acceptance:** lockfile com host não-https/sem integrity → falha.

### Task 8 — Completar anti-slopsquatting (registry-existence + age-cooldown)
- **Tool:** npm registry API (`npm view <pkg> time.created`).
- **Files:** `scripts/check/check-deps.mjs` (estender), test.
- **Approach:** além do allowlist-diff atual, para uma dep NOVA: verificar que existe no registry E que foi publicada há ≥72h (age-cooldown contra "registra o nome alucinado em horas"). Base: CSA 2026 (19,7% de nomes alucinados; 43% reaparecem).
- **Acceptance:** dep nova inexistente no registry ou publicada há <72h → falha (a menos que allowlistada com justificativa).

### Task 9 — Pisos de cobertura por módulo crítico (peça adiada da Fase 4)
- **Files:** `scripts/quality/collect-metrics.mjs` (estender), `quality-baseline.json`.
- **Approach:** emitir `coverage.<modulo>.lines` (lido do `coverage-summary.json` por-arquivo) para ~8 módulos de alto risco: `open-sse/handlers/chatCore.ts`, `open-sse/services/combo.ts`, `open-sse/services/accountFallback.ts`, `src/sse/services/auth.ts`, `src/server/authz/routeGuard.ts`, `open-sse/utils/error.ts`, `open-sse/utils/publicCreds.ts`, `src/shared/utils/circuitBreaker.ts`. Cada um vira métrica `up`. **Calibrar a partir do coverage mergeado real do 1º run verde na main.**
- **Acceptance:** queda de cobertura num módulo crítico → falha, mesmo que o global não caia.

### Task 10 — Evidence-in-PR-body (peça adiada da Fase 5)
- **Files:** `scripts/check/check-pr-evidence.mjs`, `ci.yml` (job `pr-test-policy`).
- **Approach:** se o corpo do PR afirma "tests pass"/"added endpoint X"/"fixed Y" sem um bloco de **output de comando** anexado (typecheck/test/grep), falha (torna a Rule #18 mecânica — "evidence before assertions"). Heurístico, no contexto de PR.
- **Acceptance:** PR alegando sucesso sem output anexado → falha.

### Task 11 — Mutation testing nos módulos críticos (Stryker, nightly)
- **Tool:** Stryker (`@stryker-mutator/core` + runner; OSS).
- **Files:** `stryker.conf.json`, `ci.yml` (job NIGHTLY separado — não no PR), `dependency-allowlist.json`.
- **Approach:** escopar Stryker aos ~8 módulos críticos da Task 9 (não repo-wide — é caro + c8 já OOM-prone). Mutantes sobreviventes = **testes tautológicos** (passam sem provar nada) → complementa o `check-test-masking` da Fase 4. Rodar nightly/weekly, não por-PR.
- **Acceptance:** mutation score por módulo crítico vira métrica (catraca `up`, nightly).

### Task 12 — Bundle-size / perf budget (size-limit)
- **Tool:** size-limit (OSS).
- **Files:** `.size-limit.json`, `scripts/check/check-bundle-size.mjs`, `ci.yml`, `dependency-allowlist.json`.
- **Approach:** definir orçamento por bundle Next 16; size-limit emite tamanhos → catraca `down` (bundle não pode inchar).
- **Acceptance:** PR que estoura o orçamento de bundle → falha.

### Task 13 — a11y gate (axe-core + Playwright)
- **Tool:** `@axe-core/playwright` (OSS; Playwright já existe).
- **Files:** `tests/e2e/a11y.spec.ts`, `ci.yml` (job `test-e2e`), `dependency-allowlist.json`.
- **Approach:** rodar axe nas páginas-chave do dashboard; congelar violações atuais (catraca `down`). Atende o item a11y/visual do plano t15.
- **Acceptance:** nova violação a11y → falha; correção baixa.

### Task 14 — semcheck (camada fuzzy docs↔código, opcional/LLM)
- **Tool:** semcheck (OSS, MIT) — `fail-on-issues`.
- **Files:** `semcheck.yaml`, `ci.yml` (advisory).
- **Approach:** regras ligando `docs/**` ao módulo de código que documentam; pega docs que descrevem o que o código NÃO faz (camada fuzzy sobre o determinístico `check-docs-symbols` da Fase 6). É LLM → rodar advisory/non-blocking ou em label, por custo.
- **Acceptance:** doc que descreve comportamento inexistente → flag (advisory).

### Task 15 — agent-lsp (LSP-in-the-loop para os agentes)
- **Tool:** agent-lsp (MCP server, OSS).
- **Files:** config MCP dos agentes (`.mcp.json`/equivalente).
- **Approach:** expor `tsserver`/agent-lsp aos agentes para `blast_radius`/diagnostics/`preview_edit` ANTES de escrever — vira "símbolo inventado" de catch-de-review para impossibilidade-no-edit. Pareia com `typecheck:core` como gate pré-PR (compile-before-claim).
- **Acceptance:** agentes resolvem símbolo/import via LSP; menos alucinação de símbolo na origem.

### Task 16 — dpdm circular-deps JSON cross-check (opcional)
- **Tool:** dpdm (OSS, v4) — `--circular --output`.
- **Approach:** cross-check JSON de ciclos complementando o `check-cycles.mjs` existente (AST-TS mais preciso). Catraca de contagem de ciclos. Baixa prioridade (já temos check-cycles).

### Task 17 — Avaliar Qlty CLI como consolidador (opcional, spike)
- **Tool:** Qlty CLI (OSS, grátis).
- **Approach:** spike: avaliar se Qlty (Baseline analysis + 70 analyzers) substitui N scripts caseiros sem perder o controle/determinismo. Decisão build-vs-buy. Não obrigatório.

### Task 18 — Secret scanning local (gitleaks) ➕ *adicionada pela auditoria 6A (2026-06-09)*
- **Tool:** gitleaks (OSS, MIT — binário Go, on-box). Nota 2026: o criador original (Zach Rice) lançou o **Betterleaks** (2026-03) como drop-in replacement (flags/config compatíveis) — avaliar os dois no Step 0 e escolher 1.
- **Files:** `.gitleaks.toml`, `scripts/check/check-secrets.mjs`, `quality-baseline.json` (+`secretFindings {down}`), `ci.yml` (job quality-gate), pre-commit (modo `--staged`, é rápido).
- **Approach:** complementa o `check-public-creds` da Fase 6 (que cobre apenas credenciais PÚBLICAS por chave de objeto em 2 arquivos): gitleaks pega a classe geral — `const API_KEY = "sk-…"`, tokens em config/teste/docs, secrets em histórico. Rodar `gitleaks dir --report-format json` → contar findings → catraca `down`. Findings legítimos (creds públicas já congeladas no check-public-creds, fixtures de teste) vão para `.gitleaks.toml` `[allowlist]` com comentário — sujeitos ao stale-enforcement da 6A.3 (conceitual: revisar allowlist a cada release).
- **Acceptance:** secret real plantado em fixture é detectado; baseline congela os findings atuais; novo finding falha o gate.

### Task 19 — Lint + auditoria de segurança dos workflows (actionlint + zizmor) ➕ *adicionada pela auditoria 6A*
- **Tools:** actionlint (OSS — correção/sintaxe/shellcheck dos YAML) + zizmor (OSS, zizmorcore — 24+ audits de segurança: unpinned actions, script injection, `pull_request_target` perigoso, cache poisoning). Complementares por design; o repo tem 10 workflows sem NENHUMA validação hoje.
- **Motivação 2026:** o incidente trivy-action/LiteLLM (2026-03) explorou exatamente uma misconfiguração de `pull_request_target` que o zizmor detecta estaticamente. Os release-workflows do OmniRoute (npm/Docker/Electron publish) são alvo de alto valor.
- **Files:** `ci.yml` ou `quality.yml` (steps actionlint + zizmor), `zizmor.yml` (config/ignores justificados), `quality-baseline.json` (+`zizmorFindings {down}` — começar advisory, congelar baseline, depois bloquear).
- **Approach:** actionlint = pass/fail imediato (sintaxe não tem "legado aceitável"); zizmor = catraca `down` no padrão do motor (os findings atuais — provavelmente actions não-pinadas por SHA — são dívida congelada que decai).
- **Acceptance:** workflow novo com `pull_request_target` + checkout de código do PR falha; action não-pinada NOVA sobe o count e falha.

### Task 20 — License compliance (allowlist SPDX) ➕ *adicionada pela auditoria 6A*
- **Tool:** license-compliance ou @onebeyond/license-checker (ambos OSS, npm). Projeto é **MIT** — deps com copyleft forte (GPL/AGPL) em produção são risco de compliance para os usuários do proxy.
- **Files:** `scripts/check/check-licenses.mjs`, `.license-allowlist.json` (SPDX permitidas: MIT, Apache-2.0, BSD-2/3, ISC, 0BSD, …), `ci.yml` (lint job), `dependency-allowlist.json`.
- **Approach:** rodar sobre as `dependencies` de produção (devDependencies = relatório advisory); licença fora da allowlist → fail com o caminho da dep. Exceções pontuais (dual-license, LGPL avaliada) entram na allowlist por **pacote** com justificativa — pareia com o `check-deps` da Fase 2 (lá controla O QUE entra; aqui, SOB QUAL licença).
- **Acceptance:** dep GPL-3.0 sintética em fixture falha; árvore atual passa com a allowlist calibrada.

---

## Wiring & CI (resumo)
- **lint job:** check-lockfile, check-cognitive-complexity (rápido?), check-type-coverage, **check-licenses (Task 20)**, **actionlint (Task 19)**.
- **quality-gate job (paralelo):** check-vuln-ratchet, check-dead-code, check-codeql-ratchet, check-cognitive-complexity (se lento), check-bundle-size, **check-secrets (Task 18)**, **zizmor (Task 19)**.
- **pr-test-policy job:** check-pr-evidence.
- **sonarqube job:** Clean-as-You-Code + `qualitygate.wait`.
- **NIGHTLY job (novo):** Stryker (mutação), semcheck (advisory), a11y full.
- Todas as métricas numéricas → `quality-baseline.json` (motor da Fase 1, com `eps`/`tightenSlack` da 6A.5). Toda dep nova → `dependency-allowlist.json`. Toda allowlist nova nasce com o stale-enforcement da 6A.3.

## Self-Review
- **Cobertura do spec:** 7 gates sugeridos = Task 1-3 (segurança), 4 (knip), 9 (coverage por módulo), 10 (evidence), 11 (mutação), 12 (bundle), 13 (a11y). "Todas as ferramentas discutidas" = Tasks 1-8, 11-17 (Sonar/osv/CodeQL/knip/sonarjs/type-coverage/lockfile/dpdm/stryker/size-limit/axe/semcheck/agent-lsp/Qlty). Auditoria 6A (2026-06-09) acrescentou Tasks 18-20 (gitleaks, actionlint+zizmor, license compliance). ✓
- **Community/OSS only:** confirmado — Sonar Community Build, todos os demais OSS (gitleaks MIT, zizmor/actionlint OSS, license-compliance npm), zero SaaS pago. ✓
- **Sem flag-day:** toda catraca é só-regressão, calibrada do estado atual (zizmor/gitleaks começam advisory→baseline→bloqueio). ✓
- **Consistência:** todas as métricas usam o formato `{value, direction}` do motor da Fase 1; deps novas passam pelo `check-deps`+`dependency-allowlist.json`. ✓
- **Não-sobreposição com a 6A:** a 6A conserta/endurece o EXISTENTE (runners, stale-allowlists, escopos); a Fase 7 só adiciona ferramenta nova. gitleaks (Task 18) complementa — não substitui — o check-public-creds expandido pela 6A.8. ✓

## Handoff (na ativação, 2026-06-16+)
**Ordem: Fase 6A primeiro** ([`PLANO-QUALITY-GATES-FASE6A.md`](./PLANO-QUALITY-GATES-FASE6A.md)) — consertar os runners (testes órfãos + vitest no CI) e endurecer as catracas existentes muda os baselines (cobertura recalibrada) sobre os quais várias tasks daqui (1, 9, 11) calibram. Depois: começar pela **Task 1-3 (catraca de segurança)**, **Task 4 (knip)** e **Task 19 (zizmor — protege os release-workflows)** — maior retorno. Cada Task vira um sub-plano `writing-plans` bite-sized próprio. Recomendado: Subagent-Driven, 1 subagente por Task, com auditoria (trust-but-verify) e o ratchet `eslintWarnings`/`check-deps` validando que cada adição não regride o que já temos.
