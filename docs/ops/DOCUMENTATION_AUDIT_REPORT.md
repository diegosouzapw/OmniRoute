# OmniRoute — Relatório de Auditoria de Documentação & Plano de Sincronização

> **Versão do projeto:** 3.8.24 · **Data:** 2026-06-13 · **Status:** FASE 1 (pesquisa/organização) — execução **pendente de confirmação**
> **Escopo:** docs raiz · `/docs` · site `:20128/docs` (Fumadocs) · Wiki GitHub · i18n (42 locales) · CI de docs/i18n

---

## 0. TL;DR

1. **As contagens estão dessincronizadas entre 5 fontes diferentes** (código, README, AGENTS.md, site, Wiki). O caso mais grave: **providers** aparece como `177` (README) / `232` (AGENTS) / `223` (gerador, **correto**) / `212+` (Wiki) / `160+` (CLAUDE.md).
2. **Os gates de CI atuais NÃO validam os números mais visíveis** (provider count, free count, test count, locale count). Por isso o drift passou despercebido.
3. **A Wiki do GitHub está órfã**: 995 páginas, **sem automação de sync**, último update genérico, números muito antigos (`14 strategies`, `37 MCP tools`, `212+ providers`).
4. **O pipeline i18n nunca rodou para os docs**: `.i18n-state.json` não existe → drift check não tem baseline.
5. **~10–12 funcionalidades recentes não têm documentação** (Plugin Marketplace, Free Provider Rankings/Arena ELO, IPv6 egress, Feature Flags, Notion/Obsidian context, etc.).

---

## 1. Números canônicos REAIS (a fonte de verdade de cada um)

| Métrica                               | **Valor real**                                       | Fonte de verdade (como medir)                                                     | README         | AGENTS.md | CLAUDE.md  | docs/README.md              | Wiki Home | Site              |
| ------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- | -------------- | --------- | ---------- | --------------------------- | --------- | ----------------- | --- |
| **Providers (total)**                 | **223**                                              | `scripts/docs/gen-provider-reference.ts` → `PROVIDER_REFERENCE.md` ("unique IDs") | ❌ 177         | ❌ 232    | ❌ "160+"  | (n/a)                       | ❌ 212+   | via gerador       |
| **Providers c/ free tier**            | **103** `hasFree:true` / **98** pesquisados c/ quota | `grep hasFree:true providers.ts` / `FREE_TIERS.md`                                | ⚠️ "50+"       | —         | —          | —                           | ⚠️ "50+"  | —                 |
| **Free forever**                      | **11** (a revalidar)                                 | README claim — sem fonte programática                                             | "11"           | —         | —          | —                           | —         | —                 |
| **Test files (unit)**                 | **1.574**                                            | `find tests/unit -name '*.test.ts'`                                               | —              | —         | —          | —                           | —         | —                 |
| **Test files (integration)**          | **76**                                               | `find tests/integration`                                                          | —              | —         | —          | —                           | —         | —                 |
| **Test files (total)**                | **~1.660** (+46 em src/open-sse)                     | find global                                                                       | —              | —         | —          | —                           | —         | —                 |
| **Test cases (aprox)**                | **~16.000**                                          | `grep -E '(test                                                                   | it)\(' tests/` | —         | —          | —                           | —         | —                 | —   |
| **`unit/` test files (CONTRIBUTING)** | **1.574**                                            | —                                                                                 | —              | —         | —          | ❌ **CONTRIBUTING diz 122** | —         | —                 |
| **API endpoints (route.ts)**          | **502**                                              | `find src/app/api -name route.ts`                                                 | —              | —         | —          | —                           | —         | —                 |
| **Endpoints `/v1` (OpenAI-compat)**   | **75**                                               | `find src/app/api/v1 -name route.ts`                                              | —              | —         | —          | —                           | —         | —                 |
| **MCP tools**                         | **87** (33 base + módulos)                           | `schemas/tools.ts` = 33 base; +memory/skill/notion/obsidian/gamification/plugin   | ✅ 87          | ✅ 87     | ✅ 87      | —                           | ❌ 37     | —                 |
| **MCP scopes**                        | **30** (16 base em tools.ts)                         | `scopeEnforcement.ts` + módulos                                                   | —              | ✅ 30     | ✅ 30      | —                           | —         | —                 |
| **Routing strategies**                | **15**                                               | `open-sse/services/combo.ts` (gate valida)                                        | ✅ 15          | ✅ 15     | ✅ 15      | ❌ 14                       | ❌ 14     | —                 |
| **Auto-combo scoring factors**        | **9** (label) / engine multifator                    | `AUTO-COMBO.md`                                                                   | "9"            | "12"      | "9-factor" | ❌ "9-factor"               | —         | —                 |
| **i18n locales**                      | **42** (+en = 43)                                    | `config/i18n.json`                                                                | —              | ✅ 42     | —          | ❌ 40                       | ❌ "40+"  | ✅ 40 (LANGUAGES) |
| **Executors**                         | **60**                                               | gate valida ✓                                                                     | —              | ✅        | —          | —                           | —         | —                 |
| **A2A skills**                        | **6**                                                | gate valida ✓                                                                     | ✅             | ✅        | ✅         | —                           | —         | —                 |
| **Cloud agents**                      | **3**                                                | gate valida ✓                                                                     | ✅             | —         | —          | —                           | —         | —                 |
| **OAuth flows / providers**           | **16** flows / **19** providers OAuth                | gate (16) vs `PROVIDER_REFERENCE` (19)                                            | —              | —         | —          | —                           | —         | —                 |
| **DB modules / migrations**           | **83 / 97**                                          | gate/CLAUDE ✓                                                                     | —              | ✅        | ✅         | —                           | —         | —                 |

> ⚠️ **Inconsistências de número que precisam de decisão de produto (não só correção mecânica):**
>
> - **Free count:** `hasFree:true` = 103, mas inclui créditos-de-cadastro one-time. `FREE_TIERS.md` documenta 98 pesquisados (≈63 recorrentes, 29 signup-only, 6 descontinuados). O "50+/11 forever" é conservador e defensável — **decidir o headline canônico**.
> - **Auto-combo "9-factor" vs "12":** README diz 9, AGENTS diz 12. Precisa alinhar à contagem real em `AUTO-COMBO.md`.

---

## 2. Defasagens por fonte de documentação

### 2.1 Documentos da raiz

| Arquivo                                            | Problema                                                                                                                           | Ação                                                                    |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `README.md`                                        | `177 providers` em ~9 lugares (linhas 9, 22, 23, 62, 139, 143, 266, 322, 326, 736) + badges + âncora `#-177-ai-providers--50-free` | Corrigir para **223**; revisar badge/âncora; revalidar "50+/11 forever" |
| `AGENTS.md`                                        | `232 provider entries` (linha 6) + live counts `providers 232` (linha 11)                                                          | Corrigir para **223**                                                   |
| `CLAUDE.md`                                        | `"160+"` providers (linha ~40)                                                                                                     | Corrigir para **223**                                                   |
| `CONTRIBUTING.md`                                  | `unit/ (122 test files)` (linha 255) — defasado em >1.400                                                                          | Corrigir para **1.574** (ou texto dinâmico)                             |
| `CHANGELOG.md`                                     | OK (v3.8.24 correto)                                                                                                               | —                                                                       |
| `SECURITY.md` / `CODE_OF_CONDUCT.md` / `GEMINI.md` | Genéricos, OK                                                                                                                      | —                                                                       |

### 2.2 `/docs`

| Arquivo                                                                                        | Problema                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/README.md` (índice)                                                                      | `9-factor scoring, 14 strategies` (linha 81 → deveria ser 15); `40 locales` (linha 121 → 42)                                                                                         |
| `docs/guides/I18N.md`                                                                          | "supports 30 languages" (real: 42); `lastUpdated 2026-05-13`                                                                                                                         |
| `docs/frameworks/AGENT-SKILLS.md, AGENTBRIDGE.md`                                              | `lastUpdated 2026-05-28` (v3.8.6)                                                                                                                                                    |
| `docs/frameworks/WEBHOOKS.md`, `docs/guides/PWA_GUIDE.md`                                      | `lastUpdated 2026-05-13` (v3.8.0)                                                                                                                                                    |
| `docs/frameworks/SEARCH_TOOLS_STUDIO.md`, `PLAYGROUND_STUDIO.md`                               | `lastUpdated 2026-05-30`                                                                                                                                                             |
| `docs/guides/TROUBLESHOOTING.md, FEATURES.md, UNINSTALL.md`, `docs/reference/API_REFERENCE.md` | refs a versões antigas (v3.5.x–v3.7.x) — verificar se históricas (ok) ou stale                                                                                                       |
| Órfãos do site (existem em `/docs` mas fora do `meta.json`)                                    | `routing/QUOTA_SHARE.md`, `guides/CODEX-CLI-CONFIGURATION.md`, `security/SOCKET_DEV_FINDINGS.md`, `compression/EXTENDING_COMPRESSION.md` — acessíveis por URL mas **não na sidebar** |
| Raiz `/docs` nunca no site                                                                     | `AGENTROUTER.md`, `PROVIDERS.md`, `DOCUMENTATION_OVERHAUL_PLAN.md`, `SUBMIT_PR.md`, `fix-opencode-context.md`                                                                        |

### 2.3 Site `:20128/docs` (Fumadocs)

- **Como funciona:** `docs/<seção>/*.md` → `source.config.ts` (globs) → `.source/server.ts` (gerado) → `src/lib/source.ts` → `src/app/docs/layout.tsx` (sidebar = `pageTree` dos `meta.json`) → `[...slug]/page.tsx`. **60 docs em inglês** entram no site.
- **Navegação curada por `meta.json`** → arquivo novo em `/docs` **não aparece** até ser adicionado manualmente ao `meta.json` da seção. Hoje há 4 arquivos importados mas fora da sidebar (acima).
- **i18n no site:** `[...slug]/page.tsx` lê cookie `NEXT_LOCALE`; se ≠ en, tenta `docs/i18n/<locale>/docs/<seção>/<FILE>.md` via `marked.parse()`, com fallback para o MDX inglês. Seletor: `LanguageSelector.tsx` (40 idiomas em `LANGUAGES`).
- **API Explorer:** `openapi.generated.ts` é gerado por `scripts/docs/gen-openapi-module.mjs` a partir de `docs/reference/openapi.yaml` no `prebuild:docs`.
- **Riscos de drift:** (a) `meta.json` manual; (b) traduções não atualizam quando o inglês muda; (c) `openapi.yaml` precisa de regen; (d) `LANGUAGES` no app diz 40, config diz 42 → **divergência app vs config**.

### 2.4 Wiki do GitHub (`/wiki`) — **mais defasada de todas**

- **995 páginas** (`60 docs Title-Case` + `935 i18n`), `Home.md`, `_Sidebar.md`, `_Footer.md`.
- **Sem nenhum script/automação de sync** no repo (`grep wiki` em `scripts/`, `.github/`, `package.json` = vazio). Foi populada uma vez, manualmente.
- **Números muito antigos no `Home.md`:** `212+ providers`, `14 Routing Strategies`, `MCP Server 37 tools`, `40+ Languages`.
- **Conclusão:** a Wiki não tem "fonte de verdade" — precisa virar **espelho automatizado** de `/docs` (ver Plano §6, Fase 4).

### 2.5 i18n (42 locales)

- **Fonte de verdade dos locales:** `config/i18n.json` → **42** (+en=43). Documentação diz 30 (`I18N.md`) e 40 (`docs/README.md`, `LANGUAGES` no app) — **3 números diferentes**.
- **Subset espelhado por idioma:** ~26–27 arquivos (7 raiz: README/CONTRIBUTING/CLAUDE/GEMINI/AGENTS/SECURITY/CODE_OF_CONDUCT + llm.txt/CHANGELOG copiados + ~19 docs em architecture/frameworks/guides/ops/reference/routing).
- **`.i18n-state.json` não existe** → `i18n:check` (drift) não tem baseline; tradução de docs nunca foi executada pelo pipeline novo.
- **Duplicações/legados:** `pt` vs `pt-BR` (ambos traduzem os mesmos arquivos); `id` vs `in` (Indonésio — `in` é legado ISO 639-3, deveria deprecar).
- **CLI locales incompletos:** `bn, gu, he, mr, ms, phi, in` = 3 bytes (vazios).
- **Motor:** `run-translation.mjs` usa endpoint OpenAI-compat via env `OMNIROUTE_TRANSLATION_*` (LLM); scripts Python (`i18n_autotranslate.py`, `generate-multilang.mjs`) marcados deprecated.

---

## 3. Gaps de funcionalidades (features sem doc) — com curadoria

> Curadoria aplicada: o agente de exploração marcou 57% dos módulos como "não documentados", mas muitos (`config`, `runtime`, `middleware`, `images`, `catalog`, `system`, `display`, `events`, `embeddings`) são **internos** e não merecem doc dedicado. Lista abaixo filtrada para o que é **voltado ao usuário/operador**.

### P0 — features novas visíveis ao usuário, sem doc

| Feature                                                | Onde no código                                                             | PR           | Doc sugerido                                               |
| ------------------------------------------------------ | -------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------- |
| **Plugin Marketplace** (customizável + SSRF hardening) | `src/app/api/plugins/marketplace/`                                         | #3656, #3774 | `docs/frameworks/PLUGIN_MARKETPLACE.md`                    |
| **Free Provider Rankings (Arena ELO)**                 | `src/app/api/free-provider-rankings/`, `/dashboard/free-provider-rankings` | #3799        | `docs/guides/FREE_PROVIDER_RANKINGS.md`                    |
| **IPv6 egress family selector** (auto/ipv4/ipv6)       | proxy/egress + UI form                                                     | #3777        | `docs/security/EGRESS_POLICY.md` (ou seção em PROXY_GUIDE) |
| **Feature Flags page (runtime + emergency fallback)**  | `/dashboard` feature-flags                                                 | #3752, #3741 | `docs/reference/FEATURE_FLAGS.md`                          |

### P1 — integrações/frameworks sem doc

| Feature                                | Onde                                | Doc sugerido                          |
| -------------------------------------- | ----------------------------------- | ------------------------------------- |
| **Notion context source**              | `src/lib/notion/` (+6 MCP tools)    | `docs/frameworks/NOTION_CONTEXT.md`   |
| **Obsidian context source**            | `src/lib/obsidian/` (+22 MCP tools) | `docs/frameworks/OBSIDIAN_CONTEXT.md` |
| **Quota-shared routing audit** (#3779) | combo + quota                       | seção em `AUTO-COMBO.md`              |
| **Model lockout / success-decay**      | `RESILIENCE_GUIDE.md` desatualizado | atualizar `RESILIENCE_GUIDE.md`       |
| **Cost/Spend tracking**                | `/dashboard/costs`                  | `docs/guides/COST_TRACKING.md`        |

### P2 — sub-documentados

Traffic Inspector, Search Tools Studio (raso), Prompt Caching, Credential Health, Background Jobs, Database Migrations guide.

> **Validação obrigatória na execução:** cada item acima será confirmado no código (trust-but-verify) antes de escrever doc — não documentar feature que não exista/esteja como descrita.

---

## 4. CI de docs/i18n — coberto vs lacunas

### Coberto (hard gates)

`check:docs-sync` (version package↔openapi↔CHANGELOG + mirrors i18n) · `check:env-doc-sync` (env code↔.env.example↔ENVIRONMENT.md) · `check:docs-symbols` (anti-alucinação rota) · `check:openapi-routes` · `check:cli-i18n` · `check-ui-keys-coverage` (floor 65%).

### Parcial / advisory

`check:docs-counts` (**soft, não no CI principal** — e **não cobre providers/free/tests/locales**) · `check:doc-links` (só internos) · `check:fabricated-docs` (soft) · `check-translation-drift` (`--warn`, não bloqueia) · `validate_translation.py` (matrix `continue-on-error`).

### Lacunas (sem gate algum)

1. **Provider count / free count / test count / locale count** — os números mais visíveis **não são validados**. → causa-raiz de todo o drift atual.
2. **Validação MDX/Fumadocs** — quebra de sintaxe só aparece no deploy.
3. **Lint de prosa (Vale/markdownlint)** — sem checagem de estilo/ortografia.
4. **Links externos** — `check:doc-links` ignora http(s); URLs mortas passam.
5. **Imagens/screenshots/diagramas órfãos.**
6. **Drift de tradução não é blocking.**
7. **`meta.json` ↔ `/docs`** — arquivo novo fora da sidebar não é detectado.
8. **Wiki sync** — inexistente.
9. **`config/i18n.json` (42) vs `LANGUAGES` app (40)** — sem gate de consistência.

---

## 5. Boas práticas 2026 (pesquisa web) aplicáveis

| Prática                             | Ferramenta                                                                             | Aplicação no OmniRoute                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Lint de prosa em CI**             | **Vale** (Google/Microsoft style) + **markdownlint**                                   | Novo job `docs-lint` (warning-first p/ não travar)                              |
| **Severidade graduada**             | error = link quebrado / code-fence / alt-text faltando; warning = voz passiva / estilo | Configurar `.vale.ini` + `.markdownlint.json`                                   |
| **Feedback local rápido**           | pre-commit com markdownlint/Vale (<2s)                                                 | Adicionar ao husky lint-staged p/ `*.md`                                        |
| **Accept-list de vocabulário**      | `Vale accept.txt`                                                                      | Evitar ruído com termos do projeto (OmniRoute, combo, etc.)                     |
| **Link checker robusto**            | **lychee** (Rust, externos + internos, cache)                                          | Job semanal/cron + flag opcional no doc-links                                   |
| **Wiki como espelho automatizado**  | **`Andrew-Chen-Wang/github-wiki-action`** ou `wiki-sync`                               | Workflow que espelha `/docs` → `.wiki.git` em push to main                      |
| **Tradução LLM roteada por tarefa** | docs técnicos → GPT-5.x; nuance → Claude; bulk → modelo barato                         | Já temos roteamento próprio — usar `cx/gpt-5.4-mini` p/ docs (config existente) |
| **Translation memory + glossário**  | reduz drift e protege termos                                                           | Adotar glossário/accept-list compartilhado UI+docs                              |
| **TMS via MCP**                     | Crowdin/Lokalise/Tolgee/SimpleLocalize têm MCP oficial                                 | Opcional futuro; hoje pipeline próprio já cobre                                 |
| **Gerar docs no CI**                | docs sempre refletem o código                                                          | Elevar gerador de provider/openapi + count-guard a gate                         |

**Fontes:** [Fern — Docs Linting Guide (jan/2026)](https://buildwithfern.com/post/docs-linting-guide) · [Netlify — Docs Linting in CI/CD](https://www.netlify.com/blog/a-key-to-high-quality-documentation-docs-linting-in-ci-cd/) · [GitLab Docs — Documentation testing](https://docs.gitlab.com/development/documentation/testing/) · [Lokalise — Best LLM for translation 2026](https://lokalise.com/blog/what-is-the-best-llm-for-translation/) · [Crowdin — AI Localization 2026](https://crowdin.com/blog/ai-localization) · [Andrew-Chen-Wang/github-wiki-action](https://github.com/Andrew-Chen-Wang/github-wiki-action) · [OneUptime — Generate Docs with GitHub Actions](https://oneuptime.com/blog/post/2026-01-27-generate-documentation-github-actions/view)

---

## 6. PLANO DE MELHORIAS & SINCRONIZAÇÃO (execução pós-confirmação)

### Fase A — Números canônicos (correção mecânica de alto impacto)

1. Regenerar `PROVIDER_REFERENCE.md` (`gen-provider-reference.ts`) e fixar **223** como fonte.
2. Corrigir **providers** em: README (9 ocorrências + badge + âncora), AGENTS.md, CLAUDE.md, Wiki Home → **223**.
3. Corrigir **tests** em CONTRIBUTING.md (122 → 1.574) — ou tornar texto dinâmico.
4. Corrigir **strategies** (14 → 15) e **locales** (30/40 → 42) em `docs/README.md`, `I18N.md`, Wiki Home, e `LANGUAGES` do app.
5. Corrigir **MCP tools** na Wiki (37 → 87) e alinhar **auto-combo factors** (9 vs 12 → valor real).
6. Decidir headline **free** (50+/11 vs 98/103) e aplicar uniformemente.

### Fase B — Sincronizar /docs + README (estrutural)

7. Atualizar `lastUpdated`/versão dos docs defasados (AGENT-SKILLS, WEBHOOKS, PWA, I18N, SEARCH/PLAYGROUND_STUDIO).
8. Adicionar os 4 arquivos órfãos ao `meta.json` (ou removê-los conscientemente).
9. Avaliar README: adicionar/atualizar seções (Quick Start, tabela de números, links p/ novos docs).

### Fase C — Novos documentos (gaps de features, P0→P1)

10. Criar P0: PLUGIN_MARKETPLACE, FREE_PROVIDER_RANKINGS, EGRESS_POLICY, FEATURE_FLAGS.
11. Atualizar RESILIENCE_GUIDE (model lockout) e AUTO-COMBO (quota-shared).
12. Criar P1: NOTION_CONTEXT, OBSIDIAN_CONTEXT, COST_TRACKING (conforme confirmação).

### Fase D — i18n

13. Bootstrapar `.i18n-state.json` (`i18n:run --dry-run`) e rodar tradução dos docs corrigidos.
14. Reconciliar `config/i18n.json` (42) ↔ `LANGUAGES` app (40); decidir sobre `in` (deprecar) e `pt`/`pt-BR`.
15. Atualizar I18N.md com o processo real e contagem 42.

### Fase E — Site `:20128/docs`

16. Regenerar `openapi.generated.ts` e validar API Explorer.
17. Garantir que os novos docs entram no `meta.json` e renderizam (verificação visual via browser).

### Fase F — Wiki GitHub (automatizar)

18. Criar workflow `wiki-sync.yml` espelhando `/docs` → `.wiki.git` (github-wiki-action) — **fim do drift manual**.
19. Re-sincronizar a Wiki com os números corrigidos.

### Fase G — CI de docs (fechar lacunas)

20. **Adicionar count-guard** a `check:docs-counts`: providers, free, tests, locales, MCP tools/scopes → **gate blocking** (matando a causa-raiz).
21. Promover `check-translation-drift` a blocking (`--strict`) após baseline.
22. Adicionar job advisory `docs-lint` (Vale + markdownlint) e link-check externo (lychee, cron).
23. Adicionar gate de consistência `config/i18n.json ↔ LANGUAGES`.

---

## 7. Decisões necessárias do usuário (antes de executar)

1. **Headline de "free"**: manter `50+ / 11 forever` ou adotar número pesquisado (`98` documentados)?
2. **Escopo dos novos docs**: criar todos P0+P1 agora, ou só P0 nesta rodada?
3. **Wiki**: automatizar via workflow (recomendado) ou só re-sincronizar manualmente desta vez?
4. **i18n**: re-traduzir os docs alterados agora (custa chamadas LLM) ou só corrigir o inglês e deixar i18n para um passo seguinte?
5. **`in`/`pt` legados**: deprecar `in` (Indonésio legado) nesta rodada?
6. **CI**: implementar os novos gates (count-guard, Vale, wiki-sync) nesta rodada ou em PR separado?

---

_Relatório gerado na Fase 1 (pesquisa). Nenhum documento de produto foi alterado ainda. A sincronização começa após confirmação do escopo acima._
