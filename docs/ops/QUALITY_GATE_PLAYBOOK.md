# Quality-Gate System — Avaliação Crítica, Catálogo e Playbook de Replicação

> **O que é este documento.** Uma avaliação crítica do sistema de quality-gates do OmniRoute,
> comparado às melhores práticas da indústria, **mais** um catálogo completo de todos os pontos
> de qualidade e um **plano de replicação tool-agnóstico** para aplicar o mesmo sistema em
> qualquer projeto. Gerado em 2026-06-16 a partir do estado real do repositório (não da memória).
>
> Régua de comparação: OWASP DSOMM · OpenSSF Scorecard · SLSA · SonarQube "Clean as You Code" ·
> Quality-Ratchet pattern · DORA 2024 · OWASP LLM Top 10 (2025) · mutation-testing best practices.

---

## Parte 1 — Veredito e Classificação de Maturidade

**Nota geral: A− / "Avançado". Top ~5–10% de projetos.** O sistema implementa, de forma
independente, vários padrões que a indústria nomeia explicitamente — o que é o melhor sinal de
alinhamento (não copiamos uma checklist; convergimos para as práticas certas).

| Framework de referência | Onde estamos | Nota |
| --- | --- | --- |
| **OWASP DSOMM** (5 níveis, 5 dimensões) | Nível 3 sólido, alcançando 4 em *Test Intensity* e *Static Depth*. A maioria das orgs fica em 1–2. | **L3→L4** |
| **OpenSSF Scorecard** (18 checks) | Atendemos CI-Tests, Code-Review, Dependency-Update-Tool, Fuzzing, SAST, Signed-Releases (provenance), Token-Permissions, Vulnerabilities, Dangerous-Workflow. **Gaps:** Branch-Protection na `main` OFF; algumas actions não-pinadas. | **~7–8/10** |
| **SLSA** (4 níveis) | `npm publish --provenance` + `id-token: write` + build GitHub-hosted = **L2**, encostando em L3. Falta builder endurecido/hermético p/ L3+. | **L2→L3** |
| **SonarQube "Clean as You Code"** | Filosofia idêntica: o ratchet gateia *não-regressão* (código novo não piora a métrica). **Divergência:** Sonar recomenda **poucas** condições; temos ~46 gates (risco de fadiga). | **Alinhado, com ressalva** |
| **Quality-Ratchet pattern** | Implementação de referência: ratchet + `dedicatedGate` + `tightenSlack` + `--require-tighten` + skip-gracioso. Mais sofisticado que a maioria dos exemplos públicos. | **Exemplar** |
| **DORA 2024** | Fortíssimos no eixo *estabilidade*. Risco: gates pesados podem custar *lead time* — mitigado pelo split fast-gates, mas com buraco de cobertura (ver Parte 2). | **Forte (estabilidade)** |
| **OWASP LLM Top 10 (2025)** | Cobrimos o risco #1 (prompt-injection) com guard em runtime + promptfoo (eval) + garak (red-team). Ferramentas-padrão da indústria. | **Coberto** |
| **Mutation testing** | Stryker nightly, thresholds 70/50, 8 módulos críticos. Consenso da indústria (60% existente / 80% novo, nightly) — **batemos**. **Gap:** score ainda não é catraca. | **Quase lá** |

---

## Parte 2 — Avaliação Crítica (forças + fraquezas honestas)

### Forças (o que está acima da média)

1. **Motor de ratchet multi-métrica.** O coração do sistema. 24 métricas em `quality-baseline.json`
   + 4 baselines dedicados, cada uma com direção (`up`/`down`), tolerância (`eps`), folga
   (`tightenSlack`) e flag `dedicatedGate`. Coisas consertadas **ficam** consertadas — é o
   antídoto da entropia de codebase.
2. **Defesa-em-profundidade de supply-chain.** SAST (CodeQL/Sonar) + segredos (gitleaks com
   `useDefault`) + SCA (osv/npm-audit/Trivy/Dependabot) + licenças + lockfile + SBOM + proveniência
   SLSA + Scorecard + hardening de workflow (zizmor). Poucas codebases têm essa pilha completa.
3. **Antídotos contra a Lei de Goodhart.** Cobertura como alvo é um anti-padrão clássico
   ("quando a medida vira alvo, deixa de ser boa medida"). Temos os contra-pesos: **mutation
   testing** (mede se o teste pega o bug, não só se executa a linha), **`check-test-masking`**
   (bloqueia enfraquecer asserts pra passar), **pisos de cobertura por-módulo** (força testar o
   código de ALTO risco, não só o fácil) e **`check-pr-evidence`** (Hard Rule #18).
4. **Gates anti-alucinação / consistência.** Categoria rara e valiosa: `check-known-symbols`,
   `check-fetch-targets`, `check-openapi-routes`, `check-docs-symbols` garantem que docs, specs e
   dispatch por-string apontam para símbolos vivos. Pega "rot" que lint/test não pegam.
5. **Ciclo de vida advisory→bloqueante.** Gate novo entra advisory (não trava merges enquanto
   amadurece), depois vira bloqueante no fim do ciclo. Reduz fricção sem perder o teto.
6. **Skip-gracioso quando a infra falta.** Scanners (`--ratchet`) saem `exit 0` se o binário/rede
   falha — infra ausente nunca trava um PR legítimo. Engenharia madura.
7. **Cultura codificada.** Hard Rules + `trust-but-verify` + stale-allowlist + evidence-gate
   transformam disciplina em verificação automática.

### Fraquezas honestas (gaps reais)

1. **🔴 O split fast-gates é um buraco estrutural.** `quality.yml` (PR→`release/**`) roda **só os
   gates de filesystem** — sem typecheck, sem testes, sem build, sem cobertura. Uma regressão de
   typecheck/teste passa num PR de release e só explode no forward-merge pra `main`. A motivação
   (velocidade) é válida, mas o gate deveria estar onde o merge acontece (shift-left). **Maior
   correção estrutural pendente.**
2. **🟠 Risco de sprawl/fadiga de gates.** ~46 gates + 25 jobs é MUITO. O próprio Sonar alerta:
   muitas condições causam "fadiga de gate" e debate sobre prioridade, com risco de um gate
   ignorado. DORA alerta que gates pesados custam lead-time. Mitigamos com tiers advisory e
   ratchet-não-absoluto, mas falta um **review periódico de ROI por gate** (alguns micro-gates de
   doc-sync são consolidáveis).
3. **🟠 Mutation score ainda não é catraca.** O antídoto mais forte contra coverage-gaming está
   **advisory**. É o item de maior valor pendente (e já 90% construído).
4. **🟡 Advisory que deveriam bloquear (com escopo certo).** `osv` (vulnCount) e `oasdiff` são
   advisory apesar de baseline congelado. osv-advisory tem razão (CVE nova em dep velha bloquearia
   PR não-relacionado) — mas há meio-termo (bloquear só CRITICAL+fixable, como fizemos no Trivy).
   oasdiff advisory significa que uma mudança quebra-contrato pode passar.
5. **🟡 Segurança runtime é nightly-only.** schemathesis/garak/promptfoo/chaos/k6 rodam à noite.
   Decisão correta (lentos, precisam de servidor vivo), mas um PR pode introduzir regressão de
   injection-guard só pega na noite seguinte.
6. **🟡 Branch-protection na `main` OFF.** O `BRANCH_LOCK_TOKEN` trava branches de *release*, mas a
   `main` em si não é protegida. Ding no Scorecard/DSOMM. Ação do owner.
7. **🟡 CodeQL default-setup; semgrep não codificado.** default-setup funciona (0 alertas), mas um
   `codeql.yml` commitado dá mais controle; o semgrep roda via plataforma cloud externa, não está
   versionado no repo.

---

## Parte 3 — Catálogo Completo dos Pontos de Qualidade (portável)

As 12 categorias abaixo são o "sistema de qualidade" em forma reutilizável. Cada uma lista o
**objetivo** (o que proteger), as **ferramentas que usamos** e o **equivalente tool-agnóstico**
para replicar em qualquer stack.

### 1. Estilo & formatação (determinístico, rápido)
- **OmniRoute:** Prettier + ESLint via lint-staged (pre-commit), 2-espaços/aspas-duplas/100col.
- **Genérico:** um formatter auto-fixável + um linter, rodando em pre-commit nos arquivos staged.

### 2. Tipos
- **OmniRoute:** `typecheck:core` (bloqueante) + `typecheck:noimplicit:core` (advisory) + `type-coverage` ratchet 92.17% + any-budget por-arquivo.
- **Genérico:** typecheck estrito no CI + métrica de cobertura-de-tipo ratcheteada + orçamento de `any`/escape-hatches por-arquivo.

### 3. Testes (intensidade)
- **OmniRoute:** 2 runners não-sobrepostos (Node native + vitest), 8 shards, cobertura global 60/60/60/60 + ratchet ~76% + **8 pisos por-módulo crítico** + testes de propriedade nightly + **mutation testing** nightly.
- **Genérico:** runner(s) de teste + piso de cobertura **absoluto** (anti-zero) + **ratchet** de cobertura (anti-regressão) + **pisos por-módulo de alto risco** (anti-Goodhart) + property-based para lógica pura + **mutation testing** nightly como medida real de qualidade-de-teste.

### 4. Política de testes (anti-gaming)
- **OmniRoute:** `pr-test-policy` (código de prod exige teste), `check-test-masking` (bloqueia enfraquecer asserts), `pr-evidence` (claim de sucesso exige bloco de evidência), `test-discovery` (todo teste coletado por um runner).
- **Genérico:** gate "código novo ⇒ teste novo" + detector de assert-removido/tautologia + exigência de evidência (TDD ou teste-vivo) + garantia de que nenhum teste fica órfão fora dos globs.

### 5. Complexidade & saúde de código (ratchets)
- **OmniRoute:** ESLint-warnings (3769↓), duplicação jscpd (5.72%↓), complexidade ciclomática+max-lines (1800↓), complexidade cognitiva sonarjs (753↓), dead-code/unused-exports knip (339↓), file-size por-arquivo (frozen, só-encolhe), circular-deps (Tarjan próprio, bloqueante).
- **Genérico:** ratchetear toda métrica de saúde (warnings, duplicação, complexidade ciclomática **e** cognitiva, código-morto, tamanho-de-arquivo, ciclos de import). Direção sempre "não-piorar".

### 6. Segurança estática (SAST + segredos)
- **OmniRoute:** CodeQL (ratchet de alertas = 0), gitleaks (`[extend] useDefault=true` — crítico!), SonarQube, regras de segurança próprias (public-creds, error-helper, route-guard-membership, route-validation).
- **Genérico:** SAST (CodeQL/Sonar/semgrep) com ratchet-de-alertas + scanner de segredos com **ruleset default herdado** (config custom que substitui o default = cego) + gates próprios para as Hard Rules de segurança do projeto.

### 7. Supply-chain (dependências)
- **OmniRoute:** osv-scanner + npm-audit + Trivy + Dependabot (SCA), license-checker (SPDX allowlist), lockfile-lint (HTTPS+sha512+registry), `check-deps` anti-slopsquatting (allowlist + idade ≥72h).
- **Genérico:** SCA multi-fonte + allowlist de licenças + verificação de integridade de lockfile + allowlist de dependências com checagem de idade/typosquatting + bot de atualização agrupado.

### 8. Supply-chain (build & release)
- **OmniRoute:** SBOM (CycloneDX + syft), proveniência SLSA (`--provenance`), OpenSSF Scorecard (weekly), hardening de workflow (zizmor: artipacked→`persist-credentials:false`, cache-poisoning, token-permissions).
- **Genérico:** gerar SBOM no publish + proveniência assinada (SLSA L2+) + Scorecard agendado + endurecer todos os workflows (mínimo-privilégio de token, sem credencial persistida em checkout não-pusher, actions pinadas por SHA).

### 9. Contratos & API
- **OmniRoute:** oasdiff (breaking-change OpenAPI), schemathesis (fuzz de contrato nightly), openapi-coverage (% rotas documentadas, ratchet 38.3%), openapi-security-tiers (spec vs route-guard).
- **Genérico:** diff de breaking-change do contrato (oasdiff/buf) + fuzz property-based contra o spec (schemathesis) + cobertura-de-documentação ratcheteada + consistência spec↔código.

### 10. Docs & i18n (anti-rot)
- **OmniRoute:** docs-sync (versões espelhadas), docs-counts-sync (números nos docs vs código), env-doc-sync, doc-links, fabricated-docs, cli-i18n, i18n-ui-coverage (`--threshold=65` + ratchet 80.1%).
- **Genérico:** sincronizar versões/contagens/env-vars entre docs e código (gate, não confiança) + validar links internos + cobertura de i18n ratcheteada.

### 11. Anti-alucinação / consistência (a categoria rara)
- **OmniRoute:** known-symbols (dispatch por-string ⇒ símbolo vivo), provider-consistency, fetch-targets (fetch cliente ⇒ rota real), docs-symbols, db-rules (Hard Rules #2/#5), migration-numbering.
- **Genérico:** para toda "fonte de verdade duplicada" (registry, dispatch por-string, referências cross-camada), um gate que prova que os dois lados batem. Pega o rot que typecheck/test não pegam.

### 12. Resiliência & domínio (específico do produto)
- **OmniRoute:** chaos (fault-injection), heap-growth (leak), k6 (soak), promptfoo+garak (LLM red-team OWASP LLM Top 10), as 3 leis de resiliência (circuit-breaker/cooldown/lockout).
- **Genérico:** identificar os modos-de-falha do **seu** domínio e ter um gate (ainda que nightly) para cada um. Para apps de IA: red-team de injeção. Para sistemas distribuídos: chaos + leak + soak.

---

## Parte 4 — Plano de Replicação em Qualquer Projeto

Construa em **fases**, cada uma entregando valor sozinha. Não tente as 12 categorias de uma vez —
isso causa exatamente a fadiga de gate que a Parte 2 alerta. Cada gate novo entra **advisory** e
vira **bloqueante** quando estável.

### A peça central reutilizável: a "anatomia de um gate de ratchet"

Todo o sistema gira em torno deste padrão de 3 arquivos. Copie-o primeiro:

1. **`baseline.json`** — o valor congelado da métrica + `direction` (`up`/`down`) + `eps` (anti-flake) + `tightenSlack` + `dedicatedGate`.
2. **`collect-metrics.<ext>`** — roda a ferramenta, extrai o número, escreve `metrics.json`.
3. **`check-ratchet.<ext>`** — compara `metrics.json` vs `baseline.json`; `exit 1` **só** se regrediu além de `eps`; `exit 0` (skip-gracioso) se a ferramenta/infra faltou; com `--require-tighten`, `exit 1` se **melhorou** sem atualizar o baseline (trava o ganho).

Com isso pronto, **toda** métrica nova (cobertura, complexidade, warnings, alertas SAST, tamanho de bundle, mutation score…) é só uma linha no baseline.

### Fase 0 — Fundação (semana 1)
CI existe; formatter + linter + typecheck + 1 runner de teste + piso de cobertura **absoluto**
(ex.: 60%). Pre-commit roda os checks rápidos auto-fixáveis. *Saída: nenhum PR entra quebrando o básico.*

### Fase 1 — O motor de ratchet (semana 2) — **a fundação de tudo**
Implemente os 3 arquivos acima. Congele baselines de: warnings, cobertura, complexidade, duplicação,
código-morto, tamanho-de-arquivo. *Saída: a codebase só pode melhorar dali pra frente.*

### Fase 2 — Profundidade estática (semana 3)
SAST (CodeQL/Sonar/semgrep) com ratchet-de-alertas; scanner de segredos (**herde o ruleset default**);
SCA (osv/Dependabot) + allowlist de licenças + lockfile-lint. *Saída: vulnerabilidade conhecida e
segredo vazado não passam.*

### Fase 3 — Supply-chain de build (semana 4)
SBOM no publish + proveniência assinada (SLSA L2) + Scorecard agendado + hardening de workflow
(zizmor: token mínimo, sem credencial persistida, actions pinadas). *Saída: release rastreável e
à prova de adulteração.*

### Fase 4 — Intensidade de teste (semana 5–6)
2º runner se útil; **pisos de cobertura por-módulo crítico** (anti-Goodhart); property-based para
lógica pura; **mutation testing nightly** → quando der o 1º score, vire catraca `mutationScore`.
*Saída: cobertura deixa de ser vanity-metric; testes provadamente pegam bugs.*

### Fase 5 — Contrato & dinâmico (semana 7)
Se há API pública: oasdiff (breaking-change, **bloqueante**) + schemathesis (fuzz nightly). DAST/
red-team nightly conforme o domínio. *Saída: contrato não quebra em silêncio.*

### Fase 6 — Anti-alucinação & domínio (semana 8)
Um gate de consistência para cada "verdade duplicada" do projeto. Gates de modo-de-falha do seu
domínio (para IA: red-team de injeção). *Saída: rot estrutural e falhas de domínio têm rede.*

### Fase 7 — Governança (contínuo)
- Ciclo advisory→bloqueante para cada gate novo.
- `stale-allowlist`: toda supressão tem justificativa + issue; supressão obsoleta é pega.
- `evidence-gate`: claim de sucesso em PR exige prova (teste ou teste-vivo).
- **Review trimestral de ROI por gate** (mate/funda os que não pagam o custo — combate a fadiga).
- Mature os Hard Rules do projeto em gates executáveis.

### Princípios transversais (não-negociáveis)
- **Ratchet, não absoluto.** Gateie *não-regressão*, não um número fixo (exceto pisos anti-zero).
- **Piso absoluto + ratchet juntos.** O piso impede o colapso; o ratchet impede a erosão lenta.
- **Anti-Goodhart por design.** Toda métrica-alvo precisa de um contra-peso (cobertura ⇒ mutation + anti-masking; pisos por-módulo p/ forçar o código difícil).
- **Skip-gracioso.** Infra ausente nunca bloqueia; só regressão real bloqueia.
- **`dedicatedGate` para métricas caras.** Métrica que precisa de binário externo tem seu próprio script (com skip), fora do ratchet central síncrono.
- **Gate onde o merge acontece.** Não deixe buraco entre o gate-rápido e o merge real (a lição do split fast-gates).
- **Poucos gates bloqueantes, bem-escolhidos.** Sonar/DORA: muitas condições = fadiga. Prefira advisory + ratchet a um muro de gates bloqueantes.

---

## Parte 5 — Melhorias recomendadas (priorizadas, compatíveis)

**P0 — maior ROI, já quase prontas**
1. **Catraca de mutation score** (após 1º nightly Stryker dar valores). Antídoto-chave contra coverage-Goodhart; ~90% pronto.
2. **Fechar o buraco fast-gates** — adicionar typecheck + testes-impactados ao `quality.yml` (PR→release).
3. **Branch-protection na `main`** (setting do owner) — sobe Scorecard, fecha o gap DSOMM.

**P1 — valiosas**
4. **osv/oasdiff → bloqueante com escopo certo** — osv só CRITICAL+fixable (two-step como o Trivy); oasdiff bloqueia breaking-change.
5. **`require-tighten` → bloqueante** (fim de ciclo) — trava ganhos de métrica.
6. **Review de ROI / timing por-gate** no `ci-summary` — achar e podar gates lentos/de-baixo-valor.

**P2 — diminishing returns**
7. **SLSA L3** — builder hermético/reprodutível (gerador SLSA do GitHub) se quiser subir de L2.
8. **CodeQL config commitado + semgrep versionado** — mais controle/reprodutibilidade.
9. **DAST smoke por-PR** — subconjunto rápido de schemathesis/promptfoo nos endpoints de maior risco (não só nightly).
10. **Dashboard de flakiness + métricas DORA** — garantir que os gates não erodem a velocidade.

---

## Fontes (boas práticas da indústria)

- OWASP DevSecOps Maturity Model (DSOMM) — https://dsomm.owasp.org/about
- OpenSSF Scorecard / SLSA — https://openssf.org · https://slsa.dev
- SonarQube "Clean as You Code" — https://docs.sonarsource.com/sonarqube-server/latest/user-guide/clean-as-you-code
- Quality Ratchets (LeadDev) — https://leaddev.com/software-quality/introducing-quality-ratchets-tool-managing-complex-systems
- Continuous Code Improvement Using Ratcheting (Greiner) — https://robertgreiner.com/continuous-code-improvement-using-ratcheting/
- DORA 2024 State of DevOps — https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report
- Mutation testing best practices (Stryker) — https://stryker-mutator.io
- Coverage como anti-padrão (Goodhart) — https://www.industriallogic.com/blog/code-coverage-complications/
- OWASP Top 10 for LLM Applications (2025) — https://owasp.org/www-project-top-10-for-large-language-model-applications/
- Contract testing (oasdiff/schemathesis) — https://www.oasdiff.com · https://schemathesis.readthedocs.io
