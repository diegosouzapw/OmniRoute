# Relatório — Quality Gates, Catraca & Anti-Alucinação no OmniRoute

> **Data:** 2026-06-09
> **Origem:** Auditoria do projeto (5 subagentes Opus em paralelo mapeando todas as pastas exceto `node_modules`/`_references`/`dist`) + análise da transcrição do vídeo *"Qualidade de código"* (Stupid Button Club, 2026-05-04) + pesquisa web 2026 (4 frentes, últimos ~3 meses).
> **Companheiro:** Veja [`PLANO-QUALITY-GATES.md`](./PLANO-QUALITY-GATES.md) para o plano de implementação bite-sized (TDD).

---

## 0. TL;DR

1. **O OmniRoute já é muito mais maduro** que o projeto "Strawberry" do vídeo: tem CI com 20 jobs, gate de cobertura, ESLint 9 flat, SonarQube, 14 scripts `check-*.mjs` e **uma catraca real já funcionando** (`check-t11-any-budget.mjs` — orçamento de `any` por arquivo que só pode encolher). O vídeo descreve onde queremos chegar; nós já estamos a meio caminho.
2. **Mas faltam exatamente as catracas que o vídeo prega.** Não há baseline congelado de métricas, nem gate de **duplicação**, nem de **tamanho de arquivo**, e o gate de cobertura é um **piso fixo** — não uma catraca "nunca piorar".
3. **Há derivas (drifts) reais que pegamos na auditoria:** o gate de cobertura **no CI é `40/40/40/40`** (ci.yml:377), não os `60/60/60/60` que o CLAUDE.md anuncia (esse é só o script local). O Husky está **100% comentado** (zero gate local). O SonarQube tem `coverage` e `cpd` **excluídos** (`sonar-project.properties:9-10`) — as duas métricas mais úteis contra "slop" estão desligadas. E 3 scripts `check-*` existem mas **não rodam em lugar nenhum**.
4. **Os maiores ímãs de alucinação são estruturais:** o split de provider em 3 arquivos gigantes em 2 workspaces (`providers.ts` ↔ `providerRegistry.ts` ↔ `validation.ts`, com contagens que já divergem: 229 ids vs 155 blocos vs N validadores), os 300 paths `fetch("/api/...")` hardcoded sem ligação de compilação com as rotas, e o arquivo de **12.760 linhas** (`providers/[id]/page.tsx`) que nenhum agente consegue segurar em contexto.
5. **2026 confirma a tese do vídeo com dados:** GitClear (211M linhas) mostra duplicação crescendo 4–8× na era da IA; o paper SlopCodeBench prova que *instrução de prompt sozinha não impede a degradação* — só gates determinísticos seguram. O ecossistema 2026 tem ferramentas maduras para cada métrica (jscpd v5, knip v6, eslint-plugin-sonarjs v4, osv-scanner, Qlty, Sonar "Clean as You Code"/"AI Code Assurance").
6. **A jogada é em camadas:** (a) reativar/reconciliar o que já existe; (b) construir o **motor de catraca** (baseline.json + coletor + comparador, clonando o `any-budget`); (c) adicionar **gates determinísticos anti-alucinação** (provider-consistency, fetch-target, openapi-routes); (d) catraca de **duplicação + tamanho**; (e) catraca de **cobertura** + detecção de test-masking; (f) skill **`/babysit`** com guarda-corpos. Detalhe no plano.

---

## 1. O que o vídeo ensina (insights destilados)

O vídeo é uma fala sem roteiro sobre *qualidade de código no mundo em que a IA escreve ~100% do código*. Pontos centrais:

| # | Insight | Citação/essência |
|---|---------|------------------|
| 1 | **O humano virou o gargalo.** | "Eu acabei virando o gargalo da IA. Fazer o babysit das coisas do request básicas é o gargalo. Não consigo entregar 4 tarefas ao mesmo tempo se preciso ler 10.000 linhas/dia." |
| 2 | **Quality Gate = portão que a IA tem que passar.** | Todo PR passa por um portão; a IA fica em loop se autocorrigindo até ficar verde, em vez de o humano revisar e pedir refação. |
| 3 | **Baseline + Catraca (ratchet).** | "Tu congela o baseline e o repositório só pode melhorar a partir dali ou empatar." A catraca anda num sentido só. |
| 4 | **Regra de ouro.** | "Cada PR pode adicionar código, mas não pode aumentar nenhuma das métricas — nem por uma violação, nem por uma linha, nem por 0,1 ponto percentual." |
| 5 | **Métricas do baseline.** | Violações de ESLint (483 em 120 arquivos), duplicação de código (2,2% via JSCPD), cobertura (%), arquivos acima do limite de tamanho (19 arquivos; o maior com 4.600 linhas). |
| 6 | **Pipeline de CI.** | `npm ci` → `npm audit` (critical=bloqueia / high=avisa) → `npm run lint` → `test:coverage` → **script node de quality gate** que compara métricas atuais vs `baseline.json` e falha em qualquer regressão → comentário no PR + **upload de artefatos** que o agente lê para se autocorrigir. |
| 7 | **Artefatos legíveis pelo agente.** | "Não adianta cuspir isso no PR. O agente precisa ter acesso ao que está dando errado." |
| 8 | **Babysit skill.** | "Recomendo criar uma skill de babysit": a IA monitora o CI + comentários dos revisores, endereça os comentários e **resolve as conversas** para dar rastreabilidade no GitHub. |
| 9 | **Comentários perto do código (legibilidade p/ agente).** | Mudou de ideia: antes era contra comentários ("o código é a documentação"); agora, no mundo de agentes, comentário explicando *o quê* e *por quê* perto do código vale mais que um MD gigante, porque o harness faz `grep` no arquivo e lê o comentário junto. |
| 10 | **É "só" colar ferramentas.** | "Não é nada excepcional. Eu só estou colando um monte de ferramentas e chamando de quality gate." Pode-se usar SonarQube ou GitHub Code Quality no lugar do script caseiro. |
| 11 | **Por que a IA não faz certo de primeira.** | Modelos top já sabem (foram treinados com os livros), mas são "preguiçosos" porque output imperfeito = mais tokens vendidos. A catraca força o nível. |

**Tradução para o nosso contexto:** o vídeo descreve um sistema que **já temos em embrião** (o `any-budget` é exatamente a catraca da regra de ouro, só que para uma métrica). O salto é (1) generalizar a catraca para todas as métricas, (2) reconciliar os drifts, e (3) fechar os buracos anti-alucinação que são específicos do nosso tamanho.

---

## 2. Onde o OmniRoute está hoje (panorama auditado)

### 2.1 O que já temos (e o vídeo nem sonha)

- **CI robusto** (`.github/workflows/ci.yml`, ~25 KB, 20 jobs): lint + audit + cycles + route-validation + any-budget + docs-sync + typecheck (core e noimplicit) + build + package-artifact + electron-smoke + unit (8 shards) + Node 24/26 compat + coverage (8 shards + merge) + SonarQube + e2e (9 shards) + integration + security.
- **Catraca real já existente:** `scripts/check/check-t11-any-budget.mjs` — array `{file, maxAny}` (a maioria `0`), strip de comentários, anotações de falso-positivo, `exit 1` em regressão. **É o template exato da catraca do vídeo.**
- **14 scripts `check-*.mjs`** (cycles, route-validation, any-budget, docs-sync, docs-counts, env-doc-sync, deprecated-versions, doc-links, cli-i18n, openapi-coverage, openapi-security-tiers, pr-test-policy, node-runtime, test-report-summary) — vários já são *gates de consistência fonte-vs-derivado*, o mesmo padrão que precisamos para anti-alucinação.
- **PR test policy:** `check-pr-test-policy.mjs` já força "mudou código de produção ⇒ mudou teste" (diff base...HEAD).
- **Cobertura sumarizada + comentada no PR:** `test-report-summary.mjs` + `coverage/coverage-summary.json` + job `coverage-pr-comment` (comentário com marcador `<!-- omniroute-coverage-report -->`). **Isto é exatamente o "artefato legível pelo agente" do vídeo** — já construído.
- **Disciplina TDD institucionalizada** (Hard Rule #18: todo fix precisa de teste falha→passa ou validação ao vivo no VPS).
- **SonarQube** configurado (job no CI + `sonar-project.properties`).
- **Skills agênticas de review** já existem: `/review-prs`, `/review-reviews` (bateria de 8 reviewers + ralph-loop), `/code-review`, `/generate-release` (a única com babysit real de CI, mas de workflows de *release*, não do `ci.yml` do PR).

### 2.2 O que está DESLIGADO ou inerte ⚠️ (achados da auditoria)

| Item | Estado | Evidência | Impacto |
|------|--------|-----------|---------|
| **Husky** | 100% comentado (pre-commit **e** pre-push) | `.husky/pre-commit`, `.husky/pre-push` (todas as linhas com `#`) | Zero enforcement local — lint-staged, docs-sync, any-budget, env-doc-sync, openapi checks e o `test:unit` de pre-push dependem 100% do CI. |
| **Gate de cobertura no CI** | **40/40/40/40** (não 60) | `ci.yml:377` `--statements 40 --lines 40 --functions 40 --branches 40` | O comentário do PR renderiza contra 60, o script local gata 60, o RELEASE_CHECKLIST diz 75/70, e o baseline real é ~79–82%. **O único número que bloqueia merge é 40** → gate de cobertura quase banguela. |
| **Sonar coverage** | Excluído | `sonar-project.properties:9` `sonar.coverage.exclusions=**/*` | Sonar ignora cobertura de todo arquivo. |
| **Sonar CPD (duplicação)** | Excluído | `sonar-project.properties:10` `sonar.cpd.exclusions=**/*` | Sonar não detecta copy-paste — a assinatura nº1 de slop de IA. |
| **SonarQube job** | Inerte | `ci.yml` roda scan só se `PR && SONAR_TOKEN != '' && SONAR_HOST_URL != ''`; sem `qualitygate.wait` | Em runs sem secret, escreve "skipped"; mesmo quando roda, nunca falha o build. |
| **`npm audit`** | Plano (`moderate`), não escalonado | `package.json:112` `--audit-level=moderate` | O vídeo prega critical=bloqueia / high=avisa. O nosso é um nível único. |
| **3 scripts órfãos** | Sem CI nem husky | `check:cli-i18n`, `check:openapi-coverage`, `check:openapi-security-tiers` | Existem, dão `exit 1`, mas não rodam em lugar nenhum (Hard Rules #15/#17 guardadas só por um deles). |
| **`typecheck:noimplicit:core`** | `continue-on-error: true` | `ci.yml:45-46` | Warn-only "forward-looking". |

### 2.3 Hotspots de tamanho (sem gate hoje)

`64 arquivos > 1000 LOC`, `194 > 500 LOC` (src + open-sse, sem testes). Top:

| LOC | Arquivo | Risco para edição por IA |
|-----|---------|--------------------------|
| **12.760** | `src/app/(dashboard)/dashboard/providers/[id]/page.tsx` | God-component: **192 `useState`**, 21 `useEffect`, 87 `fetch()` inline, 34 tipos inline. Nenhuma IA segura em contexto; qualquer edição arrisca apagar estado não relacionado. |
| 5.977 | `open-sse/handlers/chatCore.ts` | God-handler: 58 funções, invariantes demais, blast radius alto. |
| 4.590 | `open-sse/config/providerRegistry.ts` | Array gigante providers+models+OAuth; mistura `resolvePublicCred()` e literais crus. |
| 4.456 | `open-sse/services/combo.ts` | 14 estratégias num `if/else if` sem enum/exhaustiveness — estratégia desconhecida vira no-op silencioso. |
| 4.349 | `src/app/(dashboard)/dashboard/combos/page.tsx` | 51 `useState`, mesmo padrão god-component. |
| 4.205 | `src/lib/providers/validation.ts` | Mega-função com closures e `SPECIALTY_VALIDATORS` definidos *dentro* da função. |
| 3.776 | `open-sse/handlers/imageGeneration.ts` | Branching multi-provider num handler. |
| 3.076 | `src/shared/constants/providers.ts` | 229 ids em 27 consts agrupados via `Proxy` — sem lista plana. |
| 2.869 | `open-sse/executors/chatgpt-web.ts` | Sessão web reversa; classe só começa na linha 2443. |
| 2.278 | `src/app/api/providers/[id]/models/route.ts` | God-route: importa ~30 módulos provider-específicos e ramifica por provider num GET. |

### 2.4 Ímãs de alucinação (ranqueados, da auditoria)

1. **Split de provider em 3 arquivos / 2 workspaces (nº1).** Não há lista plana de providers — 229 ids escondidos atrás de 27 consts + merge via `Proxy` (`AI_PROVIDERS`). Uma IA não consegue enumerar "quais providers existem" barato → **inventa ids plausíveis** (variantes `*-web`/`*-cli` inexistentes) ou registra no grupo errado. As três contagens (`providers.ts` 229 ids ↔ `providerRegistry.ts` 155 blocos ↔ `validation.ts` N validadores) **já divergem**, então não há cross-check autoritativo. *(Esse é o tema recorrente das nossas memórias de alucinação — ex.: ids inventados, modelos inexistentes.)*
2. **300 paths `fetch("/api/...")` hardcoded** no dashboard (659 call sites), sem client tipado. Refatore uma rota e os call sites apodrecem silenciosamente; uma IA editando a UI inventa rota (`/api/providers/[id]/refresh`) ou assume `res.error.message` numa rota que devolve `{error:"..."}`. Sem ligação de símbolo entre os 659 call sites e os 488 `route.ts`.
3. **Dual chat stack (armadilha documentada).** Seleção/fallback de conta vive em `src/sse/` (não `open-sse/`). Uma IA pedida para "consertar fallback de conta" edita `open-sse/handlers/chatCore.ts` (errado) em vez de `src/sse/services/auth.ts`. Nada no código cruza os dois stacks. *(Já erramos um diagnóstico público por isso.)*
4. **Estratégias de combo inventadas.** 14 nomes reais soterrados num `if/else` de strings (sem enum exportado) → IA inventa nomes plausíveis-mas-falsos (`"latency-optimized"`, `"failover"`) que passam no typecheck como string e viram no-op.
5. **Métodos de executor inventados.** O padrão real é "sobrescreve `execute()` inteiro" (48/50 executors), sem hooks documentados → IA inventa `buildRequest`/`parseChunk`/`mapError` que não existem em `BaseExecutor`.
6. **Helpers de erro inventados** + queda para `err.message` cru (viola Rule #12) quando o helper inventado "falha"; 5 web executors hoje **não importam helper nenhum**.
7. **AGENTS.md de DB defasado:** documenta 21 migrations / 22 módulos quando o real é **94 / 75** — uma IA lendo isso acredita em conjuntos de tabelas/módulos que não existem mais.
8. **Route-guard omitido:** rotas novas spawn-capazes (`/api/services/`, `/api/mcp/`) devem entrar em `LOCAL_ONLY_API_PREFIXES`; a convenção está só no CLAUDE.md, não num teste que a IA veja (parcialmente coberta por 1 script órfão).

---

## 3. Gap analysis — modelo do vídeo vs OmniRoute

| Métrica/peça do vídeo | OmniRoute hoje | Gap |
|-----------------------|----------------|-----|
| `npm ci` determinístico | ✅ em todos os 14 jobs | — |
| `npm audit` critical=bloqueia / high=avisa | ⚠️ `--audit-level=moderate` (nível único) | **Escalonar** em dois invokes |
| `lint` | ✅ bloqueante | — |
| `test` + cobertura | ✅ mas piso **40** no CI (drift) | **Reconciliar** p/ baseline real + catraca |
| **Contagem de ESLint congelada** | ❌ (lint é 0-erros, mas warnings livres) | **Construir** (ratchet de violações) |
| **Duplicação % (JSCPD)** | ❌ (Sonar CPD excluído, sem jscpd) | **Construir** (jscpd + catraca) |
| **Limite de tamanho de arquivo** | ❌ (sem `max-lines`, sem script) | **Construir** (ESLint max-lines + catraca, freeze dos 64) |
| **`baseline.json` congelado** | ❌ (nenhum baseline de métricas no repo) | **Construir** (o coração da catraca) |
| **Script comparador (regra de ouro)** | 🟡 existe **para `any`** (`any-budget`) | **Generalizar** p/ todas as métricas |
| **Sumário markdown + artefatos p/ o agente** | ✅ (coverage summary + PR comment + artifact) | **Reusar** wholesale |
| **Babysit skill (monitora CI + resolve conversas)** | 🟡 `review-prs`/`review-reviews`/`generate-release` parciais; nenhuma resolve threads do PR nem loopa no `ci.yml` | **Construir** `/babysit` |
| **Comentários perto do código p/ legibilidade de agente** | 🟡 `routeGuard.ts` é exemplar; resto irregular | **Padrão cultural** (Karpathy/guidelines) |

---

## 4. O que o mundo faz em 2026 (pesquisa, últimos ~3 meses)

> Todas as fontes abaixo vêm com URL + data nas seções de origem (ver §7). Onde a pesquisa **não conseguiu confirmar** algo de fonte primária, está marcado **[não-verificado]** — honestidade de engenharia.

### 4.1 Catraca / baseline-freeze (a "catraca" do vídeo)

- **betterer** — o tool canônico de ratchet (snapshot de métrica → `.betterer.results`; CI falha se piora, auto-atualiza se melhora). **[caveat]** Baixa velocidade: último commit no `master` em **ago/2025**, releases vazias no GitHub. Viável, mas **não** apostar como peça load-bearing de longo prazo.
- **eslint-formatter-ratchet** — formatter que congela contagem de violações de ESLint. **Ativamente mantido** (commit 2026-03-17). Mais estreito (só ESLint) mas é a trajetória oposta ao betterer.
- **SonarQube "Clean as You Code" (new-code conditions)** — o padrão baseline-freeze mais maduro: o quality gate aplica condições **só ao código novo** (branch de referência), grandfathering do legado. Atual.
- **SonarQube "AI Code Assurance" (2026.1.0)** — gate específico para código gerado por IA (tag o projeto → workflow de assurance + "Sonar way for AI Code" mais estrito). **[não-verificado]** se *bloqueia* o PR (docs canônicas deram 404; descrito como "enforced quality gate" mas mecânica de bloqueio não confirmada em fonte única).
- **Qlty CLI (qlty.sh)** — o produto 2026 mais aderente: CLI Rust **OSS e grátis** (v0.630.0, 2026-05-08) que agrega 70+ analisadores; tem **Baseline analysis** (= a catraca), **Quality Gates** com veredito go/no-go e coverage gates. **[caveat]** `qlty metrics` (a tabela LOC/complexidade) **não tem flag JSON** — só `qlty check --sarif`/`qlty smells --sarif`; o ratchet de tamanho/complexidade por arquivo ainda precisa do JSON do ESLint.
- **Code Climate Quality → Qlty** — a marca clássica de ratchet virou empresa separada (Qlty, nov/2024). Write-ups antigos de "Code Climate" = Qlty hoje.

### 4.2 Ferramentas de métrica por tipo (todas com JSON p/ alimentar a catraca)

| Métrica | Tool 2026 | Comando JSON | Status |
|---------|-----------|--------------|--------|
| Duplicação | **jscpd v5** (reescrita Rust) | `jscpd --reporters json` (ou `sarif`) | Muito ativo (v5.0.4, 2026-06-08). **[caveat]** schema JSON v4→v5 não confirmado — verificar no install. |
| Tamanho/fn-length/ciclomática | **ESLint core** (`max-lines`, `max-lines-per-function`, `complexity`) | `eslint --format json` | Built-in ESLint 9 |
| Complexidade cognitiva | **eslint-plugin-sonarjs** (`sonarjs/cognitive-complexity`) | `eslint --format json` | Mantido (v4.0.3, 2026-04-16; agora no monorepo SonarJS — o repo standalone foi arquivado, mas o pacote está vivo). **[caveat]** README das rules deu 404; presença de S3776 em v4 é alta-confiança mas confirmar no install. |
| Dead code / unused exports / unused deps | **knip** (vence ts-prune **arquivado** + depcheck **arquivado**) | `knip --reporter json` | Muito ativo (v6.16.1, 2026-06-06) |
| Ciclos | **check-cycles.mjs** (já temos) + **dpdm** opcional | `dpdm --circular --output deps.json` | dpdm ativo (v4.2.0, 2026-05-09); madge estagnado |
| Vulnerabilidades | **osv-scanner** (Google/OSV) | `osv-scanner --format json` | Muito ativo (push 2026-06-08) |
| Política de lockfile (gate, não métrica) | **lockfile-lint** | `lockfile-lint --validate-https --validate-integrity` | Mantido (v5.0.0, 2026-01-25) |

> **Realidade do ratchet:** não existe tool único 2026 que emita *todas* as métricas como um JSON limpo. O padrão robusto é **N tools que emitem JSON + um reducer Node** que monta `metrics-summary.json` + o comparador que falha só em regressão (exatamente o que o `any-budget` já faz para uma métrica).

### 4.3 Anti-alucinação (2026)

- **LSP-in-the-loop / `agent-lsp` (MCP)** — servidor MCP que dá ao agente fatos verificáveis do language server (definições, referências, tipos, diagnostics, `blast_radius`) e `preview_edit` antes de escrever. Funciona com Claude Code. **Fit alto:** vira "símbolo inventado" de catch-de-review para *impossibilidade-no-edit*. (v0.13.0, 2026-06-04 — pequeno mas ativo.)
- **Slopsquatting / pacotes alucinados** — **CSA Research Note (2026-04-19):** **19,7%** de 2,23M amostras de código IA continham nomes de pacote alucinados; 205k nomes fabricados únicos; **43%** reaparecem em re-runs (registráveis por atacantes). Defesas: **allowlist** de deps para agentes, **registry existence check** antes de instalar, **age-cooldown** (24–72h), lockfile-exact, scripts de install desabilitados. **Fit alto:** novo `check-deps.mjs`.
- **Semcheck** (v1.2.1, fev/2026) — CLI que usa LLM para verificar que a implementação bate com o spec/doc, via `semcheck.yaml` ligando doc↔código; roda em pre-commit e Actions com `fail-on-issues`. Feito para pegar **"docs que descrevem features não implementadas"**. **Fit muito alto** para nossos incidentes recorrentes de docs alucinadas — porém é fuzzy (LLM); pareie com checks determinísticos.
- **OpenAPI drift determinístico** — check que toda `path` do `openapi.yaml` resolve para um `route.ts` real (e vice-versa). Rápido, sem LLM, pega "endpoint inventado". **Fit alto** para `docs/reference/openapi.yaml`.
- **Skill `verify` / `verification-before-completion`** (já no nosso ambiente) — "evidence before assertions": o veredito PASS/FAIL repousa **só** no que o app rodando demonstrou; rejeita "rodei os testes" como prova. **Fit altíssimo:** é a formalização da nossa Hard Rule #18 — exigir o *output literal* do comando colado no PR ("tool receipt").
- **Adversarial review (críticos de sessão fresca)** — agentes Skeptic/Architect/Minimalist leem o diff *contra o spec* ("o autor está comprometido — vai racionalizar"); símbolos/APIs inventados viram violação de spec. Mapeia no nosso `/review-reviews`.
- **SlopCodeBench (arXiv 2603.24755, ~mai/2026)** — sem mitigação, erosão estrutural aumentou em **77%** das trajetórias; o código de agente acumula verbosidade ~7× e erosão ~5× mais rápido que repos humanos. **Mitigações só-de-prompt ("anti-slop", "plan-first") melhoram o início mas NÃO param a degradação iterativa.** → **justificativa empírica** de que precisamos de gates determinísticos, não instrução.
- **GPT-5.5 System Card (2026-04-23)** — figuras oficiais são modestas (23% mais provável de acerto factual; 3% menos erros num set propenso). O headline de **"queda de 60% em alucinação / 88,7% SWE-bench" é imprensa secundária [não-verificado]**, não a seção de factualidade do system card. Upgrade de modelo ajuda na margem, não substitui gate.

### 4.4 Babysit loops (2026)

- **Claude Code "auto-fix in the cloud"** (Anthropic, lançado 2026-03-27): "observa seus PRs na nuvem, resolvendo falhas de CI e comentários de review automaticamente; empurra fixes quando claro, pergunta quando ambíguo." Não auto-mergeia.
- **Devin Autofix** (2026-02-10): auto-conserta comentários de review + lint/CI; endereça comentários de bots, mas deixa julgamento humano nas conversas humanas.
- **CodeRabbit Autofix** (early access abr/2026): coleta o bloco **"Prompt for AI Agents"** de cada comentário, aplica fix, roda build-verification; **nada mergeia automaticamente**.
- **Greptile `greploop` + skill `check-pr`** (MIT) — "dispara review → conserta comentários → re-review até 5/5 de confiança e zero comentários". **Template quase-exato** para a nossa `/babysit`.
- **Claude `claude ultrareview <PR#> --json`** (subcomando não-interativo, research preview): bloqueia até terminar, `exit 0/1`, payload de bugs verificados parseável. **Não auto-inicia** e custa $5–20/run → usar atrás de label, não em todo push. (O `/code-review ultra` local com `--fix` é o loop interno de custo-zero.)
- **Resolver threads de review:** não há comando `gh` nativo (cli/cli#12419). Padrão de 2 passos GraphQL: `reviewThreads(first:50){nodes{id isResolved...}}` → `mutation { resolveReviewThread(input:{threadId}) }`, respondendo antes com o SHA do commit via REST.
- **Guarda-corpos (críticos):**
  - **Snyk Agent Fix field test (2026): ~5,3% de regressão** ("1 em 19 fixes auto-mergeados introduz problema novo") → **forte argumento contra auto-merge**.
  - **Token burn:** loops ingênuos realimentam a conversa crescente → prompt incha → alucina do próprio histórico. Uber capou gasto em **$1.500/mês/dev/tool** (abr/2026). Mitigação: **max-iterations**, time limit, idle-exit.
  - **Test-masking:** o babysit **NÃO** pode enfraquecer/remover asserts para ficar verde (= nossa Rule #18 + memória "trust but verify"). Revisão humana fica nos limites arquiteturais (interface/schema/cross-service).
  - **Audit trail:** deixar rastro humano-legível (qual fix endereçou o quê, qual gate satisfez, quais conversas resolveu) — nunca um verde silencioso. Reforça o guard de prompt-injection sobre os *corpos de comentário* que o agente ingere (21% dos reviews do ICLR 2026 eram IA; injeção embutida em código é vetor real).

---

## 5. Recomendações (ranqueadas) → ver o PLANO

> Build-vs-buy: **construir in-repo** os gates determinísticos (zero SaaS, dados não saem da box, reusa o harness `check-*.mjs`). **Avaliar Qlty CLI** depois, se quisermos consolidar N scripts num tool. **Não** depender de CodeRabbit/Greptile/Diamond como *o* gate de "não-piorar-métrica" — são opiniões de LLM, não contadores determinísticos.

**Fase 0 — Reativar & reconciliar (quick wins, sem tooling novo):**
1. Reativar pre-commit barato do Husky (lint-staged + docs-sync + any-budget).
2. Reconciliar o gate de cobertura: subir o CI de 40 → baseline real (com headroom) e alinhar os 4 lugares que divergem.
3. Escalonar `npm audit` (critical=bloqueia / high=avisa).
4. Plugar os 3 scripts órfãos (`cli-i18n`, `openapi-coverage`, `openapi-security-tiers`) no CI.

**Fase 1 — Motor de catraca (o coração):**
5. `quality-baseline.json` commitado + `collect-metrics.mjs` (coletor) + `check-quality-ratchet.mjs` (comparador, clone do `any-budget`) + job de CI + artefato + comentário no PR (clone do `coverage-pr-comment`).

**Fase 2 — Gates determinísticos anti-alucinação:**
6. `check-provider-consistency.mjs` (o ímã nº1), `check-fetch-targets.mjs`, `check-openapi-routes.mjs`, allow-list de estratégias/translators/executors, lint Rule #11/#12, `check-deps.mjs` (slopsquatting).

**Fase 3 — Catraca de duplicação + tamanho (mata-slop):**
7. jscpd + ESLint `max-lines`/`max-lines-per-function`/`complexity` + `sonarjs/cognitive-complexity`, congelando os 64 arquivos grandes (catraca só-pode-encolher).

**Fase 4 — Catraca de cobertura + anti test-masking:**
8. `check-coverage-ratchet.mjs` (cobertura não cai vs baseline) + pisos por módulo crítico + `check-test-masking.mjs` (delta de contagem de asserts em testes alterados).

**Fase 5 — Skill `/babysit` + evidência + LSP:**
9. Skill `/babysit` (gh pr checks + reviewThreads + worktree de fix + resolveReviewThread + loop-até-verde, com guarda-corpos), "evidence-before-assertions" obrigatório no corpo do PR, e (opcional) `agent-lsp` MCP.

---

## 6. Riscos & ressalvas (honestidade de engenharia)

- **Flag-day risk:** ligar qualquer gate num projeto que nunca o teve deixa tudo vermelho. **Toda** catraca aqui é *só-regressão* (baseline congelado), nunca um piso absoluto que exige limpeza imediata — exatamente o ponto do vídeo.
- **Custo de IA:** o babysit pode queimar tokens. Guarda-corpos (max-iterations, sem auto-merge, sem editar `.github/workflows/`) são não-negociáveis.
- **Ressalvas de pesquisa não-verificadas:** betterer baixa-velocidade; Sonar "AI Code Assurance" bloqueio-de-PR não confirmado; "GPT-5.5 −60% alucinação" é imprensa, não system card; schema JSON do jscpd v5 e S3776 do sonarjs v4 a confirmar no install; `qlty metrics` sem JSON. Nenhuma decisão do plano depende criticamente de um item não-verificado.
- **Trust-but-verify:** estes números internos (CI=40, husky off, sonar exclusions, 12.760 LOC, any-budget como catraca) foram **conferidos manualmente** contra os arquivos, não só relatados pelos subagentes.

---

## 7. Fontes (consolidadas)

**Catraca / ratchet:** betterer `github.com/phenomnomnominal/betterer` (último master ago/2025); eslint-formatter-ratchet `github.com/Jmsa/eslint-formatter-ratchet` (commit 2026-03-17); SonarQube Clean as You Code `docs.sonarsource.com/.../clean-as-you-code/about-new-code/`; Sonar AI Code Assurance `sonarsource.com/solutions/ai/ai-code-assurance/` + community thread 2026.1.0; Qlty `github.com/qltysh/qlty` (v0.630.0, 2026-05-08), `docs.qlty.sh`; Code Climate→Qlty `codeclimate.com/legacy/...` (2024-11-11).

**Métricas:** jscpd `github.com/kucherenko/jscpd` (v5.0.4, 2026-06-08); ESLint v10 `eslint.org/blog/2026/02/eslint-v10.0.0-released/` (2026-02-06); eslint-plugin-sonarjs `npm` (v4.0.3, 2026-04-16) + `github.com/SonarSource/SonarJS`; knip `knip.dev` (v6.16.1, 2026-06-06); dpdm `github.com/acrazing/dpdm` (v4.2.0, 2026-05-09); osv-scanner `google.github.io/osv-scanner` (push 2026-06-08); lockfile-lint `github.com/lirantal/lockfile-lint` (v5.0.0, 2026-01-25); GitClear `gitclear.com/ai_assistant_code_quality_2025_research`.

**Anti-alucinação:** agent-lsp `github.com/blackwell-systems/agent-lsp` (v0.13.0, 2026-06-04); CSA Slopsquatting `labs.cloudsecurityalliance.org/research/...slopsquatting...20260419...` (2026-04-19); Nesbitt package defenses `nesbitt.io/2026/04/09/...` (2026-04-09); Semcheck `github.com/rejot-dev/semcheck` (v1.2.1, fev/2026); verify skill `github.com/Piebald-AI/claude-code-system-prompts/.../skill-verify-skill.md`; Claude best practices `code.claude.com/docs/en/best-practices`; SlopCodeBench `arxiv.org/pdf/2603.24755`; GPT-5.5 system card `deploymentsafety.openai.com/gpt-5-5` (2026-04-23); adversarial review `asdlc.io/patterns/adversarial-code-review/`; OpenAPI drift `speakeasy.com/blog/openapi-spec-drift-detection`.

**Babysit:** Claude auto-fix cloud `producthunt.com/products/claude-code-auto-fix-in-the-cloud` (2026-03-27); Devin Autofix `cognition.ai/blog/closing-the-agent-loop-...` (2026-02-10); CodeRabbit Autofix `coderabbit.ai/blog/fix-all-issues-with-ai-agents` (2026-02-19); Greptile skills `github.com/greptileai/skills`; Claude GitHub Actions/Code Review/ultrareview `code.claude.com/docs/en/{github-actions,code-review,ultrareview}`; Nx self-healing `nx.dev/blog/autonomous-ai-workflows-with-nx` (2026-02-03); Snyk Agent Fix 5,3% `safeguard.sh/resources/blog/snyk-agent-fix-autofix-field-test-2026`; resolveReviewThread `nakamasato.medium.com/...` + `github.com/cli/cli/issues/12419`; ICLR 2026 AI review `blog.pebblous.ai/report/iclr-2026-ai-peer-review-crisis`.

---

*Relatório gerado a partir de auditoria paralela do código + transcrição do vídeo + pesquisa web 2026. Próximo passo: aprovar o [`PLANO-QUALITY-GATES.md`](./PLANO-QUALITY-GATES.md) e escolher por onde começar (recomendação: Fase 0 → Fase 1).*
