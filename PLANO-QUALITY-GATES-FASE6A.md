# Fase 6A — Auditoria Crítica das Fases 0–6: o que deixamos passar

> **Para workers agênticos:** SUB-SKILL OBRIGATÓRIA: `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans`, tarefa-a-tarefa. Tarefas P0/P1 maiores devem ser **expandidas em sub-plano bite-sized próprio** (`writing-plans`) no momento da execução. Hard Rule #18 (TDD/VPS) em tudo. Auditar subagentes (trust-but-verify) após cada task.

> # ⏳ PORTÃO DE ATIVAÇÃO — NÃO INICIAR ANTES DE **2026-06-16**
> Mesma janela da Fase 7 (decisão do owner 2026-06-09: 1 semana de uso em produção das Fases 0–6 antes de evoluir). **Ordem na ativação: Fase 6A ANTES da Fase 7** — primeiro consertamos/endurecemos o que já existe, depois adicionamos ferramentas novas.
> **Exceção possível (decisão do owner):** as tasks **6A.1 e 6A.2 são bugs pré-existentes descobertos pela auditoria** (testes que nunca rodam + suíte vitest fora do CI), não "gates novos" — podem ser antecipados como fix avulso se o owner preferir não esperar a janela.

**Goal:** Fechar os furos que a auditoria crítica pós-implementação (2026-06-09, análise inline dos 18 gates + motor + CI + baselines) encontrou nas Fases 0–6 — antes de adicionar qualquer ferramenta nova na Fase 7.

**Architecture:** Zero ferramenta nova (tudo homegrown, padrão `check-*.mjs` + motor existente). Três frentes: (1) **bugs sistêmicos de runner** descobertos (testes órfãos, vitest fora do CI); (2) **endurecimento do padrão de catraca** (stale-allowlist enforcement + require-tighten, validados pela prática da Notion); (3) **expansão de escopo** dos gates existentes (diretórios/superfícies que ficaram de fora).

**Tech Stack:** Node ≥20 ESM, ESLint 9 flat, c8, jscpd@4 (a pinar), GitHub Actions, Node native test runner, vitest. Nada novo em `dependency-allowlist.json` exceto a promoção do jscpd a devDependency (Task 6A.12).

---

## Origem: o que a auditoria encontrou (resumo dos achados)

Método: releitura inline de todos os `scripts/check/*.{mjs,ts}` criados nas Fases 0–6, `scripts/quality/*`, baselines, `ci.yml`, `package.json`, hooks Husky e docs — sem subagentes — mais validação por pesquisa (sistema de ratcheting da Notion; práticas de suppression-hygiene de linters).

| # | Achado | Gravidade | Task |
|---|--------|-----------|------|
| A1 | **≈135 arquivos `*.test.ts` em subdiretórios de `tests/unit/` não são coletados por NENHUM runner** — `test:unit`, `test:coverage` e os shards do CI usam o glob não-recursivo `tests/unit/*.test.ts`; o vitest só inclui `autoCombo/**` (+ `.tsx`). Inclui `authz/routeGuard.test.ts` (Hard Rules #15/#17), 50 testes de `compression/`, 12 de `services/`, 10 de `gamification/`, 6 de `guardrails/`, 5 de `security/`. **Amostra rodada na auditoria: 2 asserts de `routeGuard.test.ts` FALHAM hoje** ("management policy allows /api/services/ (e /api/copilot/chat) from localhost with valid CLI token") — o arquivo apodreceu sem ninguém ver, provavelmente desde o redesign do peer-stamp (2026-05-31) | **P0 — falso verde sistêmico** | 6A.1 |
| A2 | **Nenhum workflow roda `test:vitest`** (`grep -rln vitest .github/workflows/` = vazio). O CLAUDE.md afirma "Both test runners must pass… before merging", mas a suíte vitest (MCP server 43 tools, autoCombo, cache, componentes) está 100% fora da esteira | **P0** | 6A.2 |
| B1 | **Nenhum gate falha quando uma entrada de allowlist deixa de ser necessária.** Os 18 gates congelam ~90 violações em `KNOWN_*`; quando alguém corrige a violação (ex.: criar `/api/gamification/level` da issue #3484, remover `krutrim` da #3483), a entrada vira um furo aberto — a regressão pode VOLTAR sem revisão. Só `check-error-helper` tem detecção parcial (WARN de arquivo inexistente, que ninguém lê). Prática validada: linters maduros "yell when an exclusion exists that doesn't break the rule" | **P0 — corrói a catraca com o tempo** | 6A.3 |
| B2 | **Melhoria não-capturada vira folga permanente no motor**: sem `--update` manual, uma métrica que melhorou pode regredir de volta até o baseline antigo sem ninguém ver. A Notion auto-decrementa budgets no pre-commit; nosso motor não exige aperto | P1 | 6A.5 |
| B3 | EPS único (0.01) para todas as métricas; o plano da Fase 4 pedia epsilon maior para `coverage.branches` (não-determinismo do v8) e não foi implementado | P1 | 6A.5 |
| B4 | Métrica coletada sem entrada no baseline é ignorada em silêncio (coletor novo esquecido do baseline = falso conforto) | P2 | 6A.5 |
| C1 | `check-fetch-targets` só varre `src/app/(dashboard)` — **20+ arquivos com `fetch("/api/…")` fora do escopo**: `src/shared/components/` (Sidebar, CommandPalette, modais…), `src/app/connect/`, `src/app/status/`, `src/lib/evals/` | P1 | 6A.7 |
| C2 | `check-fetch-targets` ignora 100% dos template literals (`` fetch(`/api/x/${id}`) ``) — nem o prefixo estático é validado | P1 | 6A.7 |
| C3 | `check-fetch-targets` não valida o método HTTP (fetch `POST` → rota só com `GET` = 405 em runtime, gate verde) | P2 | 6A.7 |
| C4 | `check-deps` cobre só `package.json` raiz + `electron/` — **`@omniroute/opencode-plugin` (dep `zod` + 5 devDeps, pacote PUBLICADO no npm), `@omniroute/opencode-provider` e `open-sse/` ficam fora** | P1 | 6A.8 |
| C5 | `check-public-creds` escaneia só 2 arquivos hardcoded — credencial literal em arquivo NOVO (executor, oauth provider) passa batida | P1 | 6A.8 |
| C6 | `check-error-helper` cobre `open-sse/executors` + `handlers` — a Hard Rule #12 também fala de **MCP handlers** (`open-sse/mcp-server/`) e rotas HTTP (`src/app/api/`), fora do escopo | P1 | 6A.8 |
| C7 | `check-file-size` e `check-complexity` varrem `src` + `open-sse` — `electron/` e `bin/` fora (god-file pode nascer lá) | P2 | 6A.11 |
| C8 | `check-known-symbols` cobre executors/strategies/translators — **faltam as 3 superfícies de despacho por-string restantes: MCP tools (43), A2A skills (5, `A2A_SKILL_HANDLERS`), cloud agents (3, registry)** | P1 | 6A.9 |
| C10 | `check-route-guard-membership` depende da lista manual `SPAWN_CAPABLE_ROUTE_ROOTS` (3 raízes) — rota nova que spawna processo FORA dessas raízes é invisível ao gate | P1 | 6A.8 |
| C11 | `check-openapi-coverage` (THRESHOLD=36%) e `check-ui-keys-coverage` (65%) são pisos fixos manuais — não ratcheteiam; rotas/strings novas sem doc/i18n passam enquanto o % não cai do piso | P2 | 6A.11 |
| C12 | `check-test-masking`: (a) `--diff-filter=M` não vê teste **DELETADO** (o masking mais brutal); (b) não vê `.skip`/`.todo`/`.only` adicionados (mantêm os asserts no texto, mas nunca rodam); (c) tautologia só cobre `assert.ok(true)` | P1 | 6A.10 |
| D1 | **`ci.yml` roda gates apenas em `pull_request → main`** — todo o ciclo de PRs feature→`release/vX` passa SEM gate; as violações acumulam por semanas e estouram juntas no merge release→main (observado no gate da v3.8.18: 4 fixes de typecheck + ReDoS de última hora) | P1 — decisão do owner | 6A.6 |
| D2 | `.husky/pre-push` está 100% comentado, mas o CLAUDE.md afirma "pre-push: npm run test:unit" (drift doc↔real) | P2 | 6A.12 |
| D3 | **CLAUDE.md não menciona nenhum dos 18 gates** — um agente futuro não sabe que existem, qual a política de allowlist ("corrija, não congele"), nem como apertar baselines. Hard Rule #9 ainda diz "≥60%" (a catraca real é 80/80/82/73) | **P0 — anti-alucinação para os próprios agentes** | 6A.4 |
| D4 | `check-duplication` roda `npx --yes jscpd@4` — pacote **não pinado por lockfile**, baixado do registry a cada run do CI (supply-chain + flakiness + latência); contraria o espírito do próprio `check-deps` | P2 | 6A.12 |
| D5 | A skill `/quality-scan` roda ~20 comandos um a um — falta um runner agregador paralelo | P2 | 6A.12 |
| D6 | Baselines de coverage com folga de ~2,5pt (80/80/82/73 vs real ~82,6/82,6/84,2/75,2) — a nota "_aperte após o 1º run verde_" existe no JSON mas não é tarefa de ninguém | P1 | 6A.5 |
| E4 | Sem guarda contra artefato trackeado por engano — `node_modules` symlink já foi commitado 2× neste repo (`git add -A` em worktree) | P2 | 6A.12 |

**Decisões conscientes de NÃO fazer (avaliadas e descartadas, com motivo):**
- **Gate de idempotência de migrations via regex** — SQLite não tem `ADD COLUMN IF NOT EXISTS`; idempotência vive em try/catch do runner; regex seria frágil (FP/FN). O `check-migration-numbering` + revisão humana bastam.
- **Endurecer `check-docs-counts-sync` para fail** — contagens em prosa são heurísticas; soft-fail é o design correto. A cobertura de MCP tools entra pela 6A.9 (símbolos, não prosa).
- **Sentido inverso do provider-consistency (providers.ts → REGISTRY)** — muitos providers canônicos legitimamente não têm entrada no REGISTRY (web/OAuth-only); a allowlist nasceria com dezenas de entradas e baixa razão sinal/ruído. Reavaliar quando o refactor #3501 tocar o split de providers.
- **Complexidade por-função/por-arquivo (formato any-budget)** — upgrade real, mas o count global + `max-lines-per-function` já bloqueiam o grosso; o formato per-file entra junto com `sonarjs/cognitive-complexity` na Fase 7 Task 5 para não pagar duas migrações de baseline.

---

# Tasks

## P0 — bugs sistêmicos + documentação

### Task 6A.1 — `check-test-discovery` + religamento triado dos ~135 testes órfãos ⭐

**O achado nº1 da auditoria.** Testes que não rodam são o falso verde definitivo — todo o investimento anti test-masking da Fase 4 protege asserts de testes que **nem executam**.

**Files:**
- Create: `scripts/check/check-test-discovery.mjs` + `tests/unit/check-test-discovery.test.ts`
- Modify: `package.json` (globs de `test:unit`, `test:coverage`), `.github/workflows/ci.yml` (globs dos shards 8×/node24/node26), `vitest.mcp.config.ts` ou `vitest.config.ts` (se algum subdir for re-homed para vitest)
- Create: `test-discovery-baseline.json` (órfãos ainda-não-religados, catraca `down` até zerar)

**Approach (expandir em sub-plano na execução):**
1. **Gate primeiro (TDD):** `check-test-discovery.mjs` enumera todo `**/*.{test,spec}.{ts,tsx}` do repo (fora de `node_modules`/`.next`) e verifica que cada arquivo é coletado por ≥1 runner: (a) globs do node test runner extraídos de `package.json`/`ci.yml`; (b) `include` dos dois `vitest.*config.ts`; (c) projetos Playwright. Órfão fora do baseline → exit 1. O baseline congela os órfãos atuais (catraca: não pode SUBIR; religamentos a fazem cair até `{}`).
2. **Inventário verde/vermelho:** rodar cada subdir órfão isoladamente (`node --import tsx --test tests/unit/<dir>/*.test.ts`), registrar passa/falha. *Não* ligar tudo de uma vez — a amostra já provou que há vermelhos (`authz/routeGuard.test.ts`: 2 asserts).
3. **Religar os verdes:** trocar o glob principal para recursivo — `"tests/unit/**/*.test.ts"` ENTRE ASPAS (expandido pelo test runner do Node, não pelo shell; **Step 0: validar o suporte a glob do runner na menor versão de Node suportada pelo repo** — fallback: listar os subdirs explicitamente) — em `test:unit`, `test:coverage` e nos 3 lugares do `ci.yml` (shards 8×, node24, node26). Remover religados do baseline.
4. **Triar os vermelhos (Hard Rule #18 em cada um):** teste desatualizado → atualizar para o comportamento real (e provar que o comportamento real é o desejado); bug real revelado → fix TDD; teste de feature morta → deletar com justificativa no commit. Os 2 asserts do `routeGuard.test.ts` ("allows … with valid CLI token") são o primeiro caso: provável drift do peer-stamp de 2026-05-31 — MAS, por ser superfície de segurança (#15/#17), confirmar com cuidado que é o teste que está errado, não o guard.
5. **Recalibrar cobertura:** religar ≈135 arquivos muda o denominador/numerador da cobertura — re-medir e apertar `quality-baseline.json` via `--update` no mesmo PR (resolve também o D6).

**Acceptance:** `check-test-discovery` no CI (job lint); zero órfãos fora do baseline; baseline decrescente documentado; suíte verde com os religados; cobertura recalibrada.

### Task 6A.2 — vitest no CI

**Files:** `.github/workflows/ci.yml` (job novo `test-vitest`, paralelo aos shards; NÃO tocar nos triggers — apenas adicionar job).

**Approach:** job com `npm ci` + `npm run test:vitest` (+ `test:vitest:ui` se o tempo couber; senão segundo step). Rodar localmente primeiro para garantir verde (a suíte passa hoje fora da esteira — confirmar). Se houver vermelho pré-existente, triagem antes do wire (mesmo protocolo da 6A.1 passo 4).

**Acceptance:** PR→main roda as DUAS suítes; o claim do CLAUDE.md ("both must be green") vira verdade mecânica.

### Task 6A.3 — Stale-allowlist enforcement em todos os gates (suppression hygiene)

**O endurecimento sistêmico nº1.** Padrão validado (ESLint `--report-unused-disable-directives`; Notion): exclusão que não exclui nada vivo é dívida fantasma e furo de regressão.

**Files:** todos os gates com allowlist + seus testes:
`check-fetch-targets` (KNOWN_MISSING, 7) · `check-provider-consistency` (KNOWN_REGISTRY_ONLY, 1) · `check-openapi-routes` (KNOWN_STALE_SPEC, 1) · `check-public-creds` (KNOWN_LITERAL_CREDS, 5) · `check-db-rules` (KNOWN_UNEXPORTED 25 + KNOWN_RAW_SQL 15) · `check-docs-symbols` (KNOWN_STALE_DOC_REFS, 30) · `check-migration-numbering` (KNOWN_GAPS/DUPLICATES) · `check-error-helper` (KNOWN_MISSING_ERROR_HELPER, 7 — promover o WARN existente a FAIL e cobrir também "arquivo existe mas não viola mais") · `check-deps` (dependency-allowlist: entrada sem dep correspondente em manifest algum = stale) · `check-file-size` (entrada `frozen` cujo arquivo foi deletado/renomeado) · `check-route-guard-membership` (KNOWN_UNCLASSIFIED — vazio hoje; implementar o check para quando deixar de ser).

**Approach (mecânica única, TDD por gate):** após a detecção normal, re-avaliar cada entrada da allowlist: *"se esta entrada não existisse, o gate flagaria algo?"* — para allowlists de path/valor isso é `violationsDetectadas.has(entry)`; para arquivos, existência + violação presente. Entrada que não suprime nada → **exit 1** com mensagem `entrada obsoleta — a violação foi corrigida; REMOVA a entrada para travar a correção`. Extrair helper comum `reportStaleEntries(allowlist, liveViolations, gateName)` em `scripts/check/lib/allowlist.mjs` para não duplicar 11×.

**Acceptance:** corrigir qualquer violação congelada (ex.: as issues #3483–#3501) passa a EXIGIR a remoção da entrada no mesmo PR; teste sintético prova fail-on-stale em cada gate.

### Task 6A.4 — Documentar os gates no CLAUDE.md (+ corrigir drifts de doc)

**Files:** `CLAUDE.md`, `AGENTS.md` (se houver seção espelho), `docs/architecture/` (página `QUALITY_GATES.md` referenciada pela tabela de docs).

**Approach:** (1) seção nova "Quality Gates & Ratchets" no CLAUDE.md: tabela dos gates (nome → o que trava → allowlist/baseline), a política **"corrija a causa; allowlist só com justificativa + issue"**, como apertar (`npm run quality:ratchet -- --update`, `check:<gate> -- --update`), e o que fazer quando um gate falha num PR. (2) Corrigir: Hard Rule #9 (60% → "catraca de cobertura: nunca abaixo do baseline congelado em `quality-baseline.json`; piso absoluto 60"), claim do pre-push (refletir o real pós-6A.12), claim "both runners" (verdade pós-6A.2). (3) Página `docs/architecture/QUALITY_GATES.md` com o detalhe operacional (o CLAUDE.md fica curto, linka). Rodar `check:docs-all` após editar (o próprio docs-sync valida).

**Acceptance:** agente novo lendo o CLAUDE.md descobre os gates e a política sem ler scripts; `check:docs-all` verde.

## P1 — endurecimento do motor + escopos

### Task 6A.5 — Motor v2: `--require-tighten`, eps por métrica, métricas órfãs

**Files:** `scripts/quality/check-quality-ratchet.mjs`, `quality-baseline.json` (schema), `tests/unit/quality-ratchet.test.ts`, `.github/workflows/ci.yml` (flag no job quality-gate).

**Approach (TDD):**
1. Schema por métrica ganha campos opcionais: `eps` (default 0.01) e `tightenSlack` (default: igual a `eps`).
2. Novo modo `--require-tighten` (ligado no CI): se `atual` melhor que `baseline` além de `tightenSlack`, **exit 1** com `melhorou de X para Y — rode 'npm run quality:ratchet -- --update' e commite o baseline apertado neste PR`. Métricas determinísticas (`eslintWarnings`) usam slack 0; cobertura usa slack 1.5 (flutuação v8). É o "auto-decrement" da Notion adaptado a CI sem bot de commit.
3. Warning para métricas presentes em `quality-metrics.json` sem entrada no baseline (coletor órfão).
4. Calibrar os 4 `coverage.*` para o real medido (fecha D6 — coordenar com a 6A.1 passo 5, que muda a base).

**Acceptance:** melhoria sem aperto de baseline falha no CI; flutuação de coverage dentro do slack não falha; testes cobrem os 3 comportamentos novos.

### Task 6A.6 — `quality.yml`: gates rápidos em PRs → `release/**` ⚠️ DECISÃO DO OWNER

**Contexto sensível:** o owner já reverteu mudança de trigger no `ci.yml` ("não mexe na CI"). Esta task **não toca o `ci.yml`** — cria um workflow NOVO e enxuto. Ainda assim, **passo 0 = confirmação explícita do owner**.

**Files:** Create: `.github/workflows/quality.yml`.

**Approach:** `on: pull_request: branches: ["release/**"]`; um job único (~1–2 min) só com os gates determinísticos filesystem-only: provider-consistency, fetch-targets, openapi-routes, docs-symbols, deps, file-size, error-helper, migration-numbering, public-creds, db-rules, known-symbols, route-guard-membership, test-discovery (pós-6A.1) + `check:any-budget:t11`. SEM lint/test/build (continuam só no PR→main). Ganho: a violação aparece no PR que a introduz, não semanas depois no gate do release (padrão observado: 4 fixes de última hora no release da v3.8.18).

**Acceptance:** PR de teste contra a release branch com uma rota inventada falha em <2 min; PRs limpos não ganham mais que ~2 min de CI.

### Task 6A.7 — `check-fetch-targets` v2: escopo completo + prefixo de template + método HTTP

**Files:** `scripts/check/check-fetch-targets.mjs`, `tests/unit/check-fetch-targets.test.ts`.

**Approach (TDD):**
1. **Escopo:** varrer todo `src/**/*.{ts,tsx}` client-side (excluindo `src/app/api/**`, testes, `src/lib/db`), não só `(dashboard)` — congela os misses pré-existentes que aparecerem em `KNOWN_MISSING` (com triagem/issue por cluster, igual Fase 2).
2. **Template literals:** extrair o prefixo estático de `` fetch(`/api/x/y/${id}…`) `` e validar por **prefix-match** contra as rotas reais (existe alguma rota cujo path começa com `/api/x/y/`?). Pega diretório inteiro alucinado; não tenta resolver o sufixo dinâmico.
3. **Método HTTP (heurístico, mesma chamada):** quando o 2º argumento literal contém `method: "POST"` (etc.), verificar que o `route.ts` resolvido exporta a função correspondente (`grep` por `export (async )?function POST` / `export const POST`). Sem method literal → assume GET-ok (rota existe basta). Casos dinâmicos → skip silencioso.

**Acceptance:** fixture com fetch em `src/shared/components` + template com prefixo falso + `method: "DELETE"` para rota só-GET — 3 detecções; repo real verde com os novos congelados documentados.

### Task 6A.8 — Escopo dos gates de segurança: error-helper, public-creds, route-guard, deps

**Files:** `check-error-helper.mjs`, `check-public-creds.mjs`, `check-route-guard-membership.ts`, `check-deps.mjs` + testes.

**Approach (TDD, um sub-commit por gate):**
1. **error-helper** (+Rule #12 completa): incluir `open-sse/mcp-server/**` e `src/app/api/**/route.ts` no SCAN_DIRS; rodar; congelar os achados novos em KNOWN com comentário-justificativa cada (e issue por cluster).
2. **public-creds**: além dos 2 arquivos âncora, varrer `open-sse/**` e `src/lib/oauth/**` com a mesma `CRED_KEY_RE` (linha a linha, barato); congelar achados. Limitação documentada: `const CLIENT_ID = "…"` (variável solta) continua fora — o gitleaks da Fase 7 cobre essa classe.
3. **route-guard**: novo sub-check — todo `route.ts` (qualquer raiz) cujo fonte OU imports de 1º nível relativos contenham `child_process`/`spawn(`/`execFile(`/`worker_threads` deve ser classificado local-only por `isLocalOnlyPath()`. Mata a dependência da lista manual de 3 raízes.
4. **deps**: `MANIFESTS` → descoberta automática de todo `package.json` do repo (fora `node_modules`/`.next`): hoje raiz, `electron/`, `open-sse/`, `@omniroute/opencode-plugin/` (dep `zod` entra na allowlist), `@omniroute/opencode-provider/`. Workspace novo amanhã entra sozinho.

**Acceptance:** fixtures sintéticas por gate; repo real verde com achados congelados + issues; dep nova em QUALQUER manifest do repo dispara o gate.

### Task 6A.9 — `check-known-symbols` v2: MCP tools, A2A skills, cloud agents

**Files:** `scripts/check/check-known-symbols.ts`, `tests/unit/check-known-symbols.test.ts`.

**Approach (TDD, mesmo padrão das 3 superfícies existentes — Step 0 de verificação dos exports reais antes de codar):**
1. **MCP tools:** enumerar os tools registrados (via `createMcpServer()` ou parse determinístico do tool-set em `open-sse/mcp-server/tools/`) e congelar o snapshot de nomes (catraca: tool sumir = fail; tool novo = report). Cruzar com os scopes (~13) — tool sem scope atribuído = fail.
2. **A2A skills:** chaves de `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) ↔ skills expostas no Agent Card (`src/app/.well-known/agent.json/route.ts`) — divergência = fail.
3. **Cloud agents:** entradas do `src/lib/cloudAgent/registry.ts` ↔ classes em `agents/` — incompleto/órfão = fail.

**Acceptance:** remover um tool/skill/agent do registro quebra o gate; adicionar reporta (e `check-docs-counts-sync` continua cuidando da prosa).

## P2 — refinamentos

### Task 6A.10 — `check-test-masking` v2: deleções, skips, tautologias

**Files:** `scripts/check/check-test-masking.mjs`, `tests/unit/check-test-masking.test.ts`.

**Approach (TDD):** (a) `--diff-filter=M` → `MDR` (com `-M` para rename-detection): arquivo de teste **deletado** = flag automático ("N asserts removidos — arquivo deletado"); renamed = comparar contra o path antigo. (b) Contar `\.(skip|todo|only)\s*\(` + `\{\s*skip:\s*true` base vs HEAD — **aumento líquido de skips = flag** (skip novo esconde asserts sem removê-los); `.only` novo = flag sempre (filtra o resto da suíte). (c) Tautologias extras: `expect(true).toBe(true)`, `assert.equal(1, 1)`, `expect(x).toBeDefined()` como ÚNICO assert do teste.

**Acceptance:** fixtures para os 3 bypasses (delete, skip, only) — todos flagados; suíte real verde.

### Task 6A.11 — Pisos manuais → catraca do motor + escopo electron/bin

**Files:** `scripts/quality/collect-metrics.mjs`, `quality-baseline.json`, `check-openapi-coverage.mjs`, `scripts/i18n/check-ui-keys-coverage.mjs` (só leitura do valor), `check-file-size.mjs`, `eslint.complexity.config.mjs` + baselines.

**Approach:** (1) coletor emite `openapiCoverage.pct` e `i18nUiCoverage.pct` → baseline `{direction: up}` com o valor real atual (36→real, 65→real); os THRESHOLDs fixos viram redundância de segurança (mantidos). Rotas/strings novas sem doc/i18n agora REGRIDEM o % e falham. (2) `check-file-size` e `check-complexity`: adicionar `electron/` e `bin/` ao scan (congelar os >cap que existirem).

**Acceptance:** rota nova não-documentada derruba `openapiCoverage.pct` → gate falha; god-file novo em `electron/` falha.

### Task 6A.12 — Higiene operacional (4 itens pequenos)

**Files:** `package.json`, `dependency-allowlist.json`, `.husky/pre-push`, Create: `scripts/check/check-tracked-artifacts.mjs`, `scripts/quality/run-all-gates.mjs`; Modify: `.agents/skills/quality-scan/SKILL.md`.

**Approach:**
1. **jscpd pinado:** `jscpd@^4` como devDependency (entra no lockfile + allowlist); `check-duplication` chama o binário local em vez de `npx --yes jscpd@4` (remove download de registry no CI + supply-chain risk + flakiness).
2. **pre-push barato:** reativar com APENAS os gates determinísticos rápidos (<10s: fetch-targets, openapi-routes, db-rules, public-creds, migration-numbering, file-size, deps, error-helper) — NÃO `test:unit` (lento; CI cobre). Atualizar o claim do CLAUDE.md (coordenar com 6A.4).
3. **check-tracked-artifacts:** falhar se `git ls-files` contém `node_modules/`, `.next/`, `coverage/`, `quality-metrics.json` ou symlink para fora do repo (o incidente do symlink trackeado já aconteceu 2×). Wire no lint job + pre-commit (é instantâneo).
4. **Runner agregador:** `scripts/quality/run-all-gates.mjs` roda os gates em paralelo (pool ~4), agrega `{gate, exitCode, lastLine, durationMs}` e imprime a tabela consolidada; `npm run quality:scan`. A skill `/quality-scan` passa a chamá-lo (atualizar SKILL.md).

**Acceptance:** `npm run quality:scan` < 3 min com tabela única; pre-push roda <10s; `git add node_modules && commit` falha no pre-commit.

---

## Ordem de execução recomendada (na ativação, 2026-06-16+)

1. **6A.1 + 6A.2** (bugs de runner — destravam números reais de cobertura para o resto)
2. **6A.3 + 6A.4** (stale-enforcement + docs — endurecem o que já roda)
3. **6A.5** (motor v2) → **6A.6** (quality.yml, após OK do owner)
4. **6A.7 → 6A.9** (escopos)
5. **6A.10 → 6A.12** (refinamentos)
6. Só então **Fase 7** (ferramentas novas sobre uma fundação consertada)

## Self-Review
- **Cobertura dos achados:** todos os achados A*/B*/C*/D*/E* da tabela têm task (coluna Task); os descartados estão em "Decisões conscientes de NÃO fazer" com motivo. ✓
- **Zero dependência nova** exceto a promoção do jscpd (que já roda hoje via npx, não-pinado — a task REDUZ risco). ✓
- **Sem flag-day:** toda expansão de escopo congela os achados pré-existentes (allowlist + issue), igual Fases 0–6; o stale-enforcement só exige remoção quando a correção JÁ aconteceu. ✓
- **Consistência com o motor:** novas métricas (`openapiCoverage.pct`, `i18nUiCoverage.pct`) usam o formato `{value, direction}`; `eps`/`tightenSlack` são opcionais e retrocompatíveis. ✓
- **Não-duplicação com a Fase 7:** cognitive-complexity per-file, gitleaks (creds não-públicas), knip, osv — tudo continua na Fase 7; a 6A só conserta/endurece o existente. ✓
