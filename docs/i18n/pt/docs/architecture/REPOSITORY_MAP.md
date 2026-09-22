# Repository Map (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descrição de uma linha para cada diretório e ficheiro na raiz.**
> Última atualização: 2026-06-28 — OmniRoute v3.8.40
>
> Utilize este mapa para navegar rapidamente pela base de código. Para análises detalhadas, siga as ligações para a documentação dedicada.

## Árvore de nível superior

```
OmniRoute/
├── src/                  # Aplicação Next.js 16 (IU + rotas da API + bibliotecas + domínio + servidor)
├── open-sse/             # Área de trabalho do motor de streaming (processadores, executores, tradutor, servidor MCP)
├── electron/             # Invólucro para ambiente de trabalho (Electron 41 + electron-builder 26.10)
├── bin/                  # Ponto de entrada da CLI e processadores de comandos
├── scripts/              # Scripts de compilação, verificação, sincronização e execução pontual
├── docs/                 # Documentação pública (está aqui)
├── tests/                # Todos os conjuntos de testes (unitários, integração, e2e, clientes de protocolo)
├── public/               # Recursos estáticos do Next.js, manifesto PWA, service worker, ícones
├── config/               # Configuração estática + estado dos critérios de qualidade (i18n, payloadRules, quality/)
├── images/               # Recursos de imagem para marketing / README
├── @omniroute/           # Pacotes complementares publicáveis (opencode-plugin, opencode-provider)
├── skills/               # Pacotes de competências para CLI/agentes (cli-* + omni-* + config-codex-cli)
├── examples/             # Plugins de exemplo + modelo inicial omniroute-cmd-hello
├── contrib/              # Contribuições da comunidade (podman/)
├── .source/              # Configuração de origem do Fumadocs (source.config.mjs + servidor/navegador/dinâmico)
├── .github/              # Fluxos de trabalho do GitHub Actions + modelos de problemas + modelo de PR
├── .husky/               # Hooks do Git (pre-commit, pre-push)
├── .claude/              # Comandos de barra do Claude Code (específicos do projeto)
├── .agents/              # Fluxos de trabalho + competências para Codex / agentes genéricos (espelho de .claude/)
├── .vscode/              # Definições da área de trabalho do VS Code
├── _ideia/               # Notas de planeamento (informais; não distribuídas)
├── _mono_repo/           # Subprojetos históricos (cloud, site, vscode-extension)
├── _references/          # Clones de referência, apenas de leitura, de projetos OSS relacionados
├── _tasks/               # Ficheiros de acompanhamento de tarefas por versão (informais)
├── .build/ .worktrees/ dist/   # Áreas temporárias locais de compilação / git-worktree / resultados de compilação (ignoradas pelo Git)
├── .issues/              # Cache local de problemas (ignorado pelo Git)
├── .playwright-mcp/      # Artefactos de teste do Playwright MCP
├── coverage/             # Resultados de cobertura do c8 (ignorados pelo Git)
├── logs/                 # Registos de execução (ignorados pelo Git)
├── node_modules/         # Dependências (ignoradas pelo Git)
├── package/              # Área de preparação do npm pack (artefacto de compilação)
├── .next/                # Resultados da compilação do Next.js (ignorados pelo Git)
└── (ficheiros na raiz — ver abaixo)
```

---

## Ficheiros na raiz

| Ficheiro                                    | Finalidade                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **README.md**                               | Página de apresentação de marketing + início rápido + matriz de funcionalidades (ver também `llm.txt`)             |
| **CHANGELOG.md**                            | Registo de alterações por versão (gerado automaticamente pela skill `/version-bump-cc`)                            |
| **LICENSE**                                 | Texto da licença MIT                                                                                               |
| **CLAUDE.md**                               | Regras do projeto para agentes do Claude Code (regras obrigatórias, convenções, cenários)                          |
| **AGENTS.md**                               | Igual ao CLAUDE.md, mas para agentes de IA que não sejam Claude (Codex, Cursor, etc.)                              |
| **GEMINI.md**                               | Regras concisas para agentes baseados no Gemini (subconjunto do CLAUDE.md)                                         |
| **CONTRIBUTING.md**                         | Guia para contribuidores: configuração, commits convencionais, testes, fluxo de PR                                 |
| **SECURITY.md**                             | Política de comunicação de vulnerabilidades, versões suportadas, modelo de ameaças                                 |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — expectativas relativas ao comportamento da comunidade                                       |
| **llm.txt**                                 | Página de apresentação em texto simples, otimizada para crawlers de LLM (SEO para assistentes de IA)               |
| **package.json**                            | Manifesto npm, scripts, dependências, engines, limite de cobertura c8                                              |
| **package-lock.json**                       | Árvore de dependências bloqueada                                                                                   |
| **tsconfig.json**                           | Configuração TypeScript de raiz                                                                                    |
| **tsconfig.typecheck-core.json**            | Configuração da verificação de tipos para o núcleo em `src/`                                                       |
| **tsconfig.typecheck-noimplicit-core.json** | Verificação de tipos estrita (`noImplicitAny`)                                                                     |
| **tsconfig.tsbuildinfo**                    | Cache de compilação incremental do TS (ignorada pelo Git)                                                          |
| **next.config.mjs**                         | Configuração de compilação do Next.js 16 (saída autónoma)                                                          |
| **next-env.d.ts**                           | Tipos de ambiente gerados automaticamente pelo Next.js                                                             |
| **eslint.config.mjs**                       | Configuração plana do ESLint (regras por área do projeto)                                                          |
| **prettier.config.mjs**                     | Regras de formatação do Prettier                                                                                   |
| **postcss.config.mjs**                      | Configuração do PostCSS para o pipeline Tailwind/CSS                                                               |
| **playwright.config.ts**                    | Configuração dos testes E2E do Playwright                                                                          |
| **vitest.config.ts**                        | Configuração do Vitest (conjunto de testes predefinido)                                                            |
| **vitest.mcp.config.ts**                    | Configuração do Vitest para os conjuntos do servidor MCP / autoCombo / cache                                       |
| **sonar-project.properties**                | Configuração do SonarQube/SonarCloud (qualidade do código)                                                         |
| **Dockerfile**                              | Compilação Docker em várias fases (builder → runner-base → runner-cli)                                             |
| **docker-compose.yml**                      | Compose de desenvolvimento com 4 perfis (base, cli, host, cliproxyapi) + sidecar redis                             |
| **docker-compose.prod.yml**                 | Compose de produção (porta 20130, redis, volumes nomeados)                                                         |
| **.dockerignore**                           | Ficheiros excluídos do contexto do Docker                                                                          |
| **fly.toml**                                | Configuração de implementação no Fly.io (região `sin`, porta 20128, volume /data)                                  |
| **.env.example**                            | Ficheiro de ambiente de modelo (copiado automaticamente para `.env` na primeira instalação)                        |
| **.gitignore**                              | Padrões de exclusão do Git                                                                                         |
| **.npmignore**                              | Lista de exclusões da publicação npm                                                                               |
| **.npmrc**                                  | Configuração do npm (registo, política de lockfile)                                                                |
| **.node-version**                           | Versão fixa do Node (utilizada por ferramentas compatíveis com nvm)                                                |
| **.nvmrc**                                  | Versão fixa do Node para nvm                                                                                       |
| **eslint.complexity.config.mjs**            | Configuração do ESLint para o controlo progressivo da complexidade (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Configuração do ESLint para regras do SonarJS (complexidade cognitiva / duplicação)                                |
| **source.config.ts**                        | Configuração de origem `defineDocs` do Fumadocs (alimenta `.source/`)                                              |
| **knip.json**                               | Configuração do Knip — ficheiros/exportações/dependências não utilizados (alimenta o controlo de código morto)     |
| **stryker.conf.json**                       | Configuração de testes de mutação do Stryker                                                                       |
| **.size-limit.json**                        | Configuração do limite do tamanho do bundle                                                                        |
| **promptfooconfig.yaml**                    | Configuração de avaliação do promptfoo                                                                             |
| **.gitleaks.toml**                          | Conjunto de regras do gitleaks para deteção de segredos                                                            |
| **.zizmor.yml**                             | Configuração do zizmor para análise de segurança do GitHub Actions                                                 |
| **socket.yml**                              | Configuração do Socket.dev para a cadeia de fornecimento                                                           |
| **news.json**                               | Feed localizado de anúncios da v2; o item de lançamento do Radar é fornecido inativo                               |
| **flake.nix** / **flake.lock**              | Definição da shell de desenvolvimento do Nix + ficheiro de bloqueio                                                |
| **.env**                                    | Segredos locais (ignorados pelo git — gerados a partir de `.env.example`)                                          |

> **Movidos da raiz na v3.8.26 (organização):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` e o ficheiro `quality-metrics.json` gerado (ignorado pelo git). Consulte [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — aplicação Next.js

```
src/
├── app/                 # App Router (páginas + rotas de API + páginas de estado + página de destino)
├── lib/                 # Bibliotecas principais / módulos de domínio (80 subdiretórios + ~70 ficheiros de nível superior)
├── domain/              # Lógica de domínio pura (motor de políticas, contingência, custo, bloqueio, comboResolver, avaliação)
├── server/              # Módulos exclusivos do servidor (pipeline de authz, cors, middleware de autenticação) — não podem ser importados pelo cliente
├── shared/              # Partilhado entre o servidor e o cliente quando seguro (constantes, tipos, validação, contratos, utilitários)
├── i18n/                # Configuração do next-intl + JSON de mensagens por locale (42 locales)
├── middleware/          # Middleware do Next.js (enriquecimento de pedidos, deteção de locale)
├── mitm/                # Núcleo do proxy MITM: geração/instalação de certificados, handlers, destinos, inspetor, máscaras, passagem direta
│   ├── handlers/        # 9 classes de handlers de agentes de IDE que estendem MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Camada de captura de tráfego: buffer (anel em memória), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Código de integração do adaptador de modelos (shim legado)
├── scripts/             # Scripts de manutenção integrados na árvore (por exemplo, backfillAggregation)
├── sse/                 # Handlers/serviços SSE legados (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Armazenamento legado em memória (a ser gradualmente substituído por src/lib/db)
├── types/               # Ficheiros de tipos TS partilhados
├── instrumentation.ts   # Hook de telemetria do Next.js (navegador + edge)
├── instrumentation-node.ts  # Instrumentação exclusiva do Node
└── proxy.ts             # Shim de entrada do proxy HTTP
```

### `src/app/` — App Router (Next.js 16)

| Caminho                                                                      | Finalidade                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | API pública compatível com OpenAI (~25 sub-rotas: chat, conclusões, embeddings, ficheiros, lotes, áudio, imagens, vídeos, música, reordenação, moderação, pesquisa, ws, agentes, contas, fornecedores, etc.)                                                                                                                        |
| `app/api/v1beta/`                                                            | Endpoints de API ao estilo Gemini                                                                                                                                                                                                                                                                                                   |
| `app/api/playground/`                                                        | Rotas do Playground Studio: `improve-prompt/` (POST — reformulador de prompts com LLM), `presets/` (GET para listar / POST para criar), `presets/[id]/` (GET / PUT / DELETE) — consulte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                      |
| `app/api/` (não v1)                                                          | Rotas de gestão/administração (~60 diretórios: fornecedores, combinações, definições, mcp, a2a, avaliações, memória, competências, webhooks, conformidade, resiliência, monitorização, túneis, ferramentas de CLI, etc.)                                                                                                            |
| `app/api/tools/agent-bridge/`                                                | API REST do AgentBridge — 12 rotas (controlo do servidor, estado/DNS/mapeamentos dos agentes, bypass, certificado, CA a montante). LOCAL_ONLY + SPAWN_CAPABLE. Consulte `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                        |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS do Traffic Inspector — mais de 16 rotas (pedidos, sessões, anfitriões, modos de captura, exportação, ws). LOCAL_ONLY + SPAWN_CAPABLE. Consulte `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                             |
| `app/a2a/`                                                                   | Ponto de entrada A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                     |
| `app/.well-known/agent.json/`                                                | Cartão de Agente A2A (descoberta)                                                                                                                                                                                                                                                                                                   |
| `app/(dashboard)/dashboard/`                                                 | Páginas da interface do painel de controlo (mais de 50 secções, ~118 ficheiros page.tsx: fornecedores, combinações, definições, memória, competências, webhooks, avaliações, auditoria, lotes, cache, custos, estado, sistema, atividade, etc.)                                                                                     |
| `app/(dashboard)/dashboard/search-tools/`                                    | Interface do Search Tools Studio (3 separadores: Pesquisa/Extração/Comparação + SearchConceptCard + ProviderCatalog) — consulte `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                            |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plano 21): `page.tsx` (estrutura com 3 separadores), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Página do painel de controlo do AgentBridge — cartão do servidor, 9 cartões de agentes, assistente de configuração, mapeamento de modelos, lista de bypass. i18n PT-BR + EN. Consulte `docs/frameworks/AGENTBRIDGE.md`.                                                                                                             |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Página do painel de controlo do Traffic Inspector — vista dividida de DevTools, 7 separadores de detalhes, 4 opções de modo de captura, gravador de sessões, colorização de contexto. i18n PT-BR + EN. Consulte `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | Página do feed de atividade (Grupo B): `page.tsx` (servidor) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — consulte `docs/architecture/MONITORING_SECTIONS.md`                                                                                                              |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Página de partilha de quotas (Grupo B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                 |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Página de configuração do plano do fornecedor (Grupo B): `page.tsx` + `ProviderPlanConfigClient.tsx` — substituição das dimensões de quota por ligação                                                                                                                                                                              |
| `app/docs/`                                                                  | Visualizador de documentação incorporado (renderiza `docs/*.md`)                                                                                                                                                                                                                                                                    |
| `app/landing/`                                                               | Página de destino de marketing                                                                                                                                                                                                                                                                                                      |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Páginas relacionadas com autenticação                                                                                                                                                                                                                                                                                               |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Páginas de erro HTTP                                                                                                                                                                                                                                                                                                                |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Páginas estáticas/de estado                                                                                                                                                                                                                                                                                                         |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Esquema raiz, página inicial, manifesto PWA, CSS global                                                                                                                                                                                                                                                                             |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Limites de erro                                                                                                                                                                                                                                                                                                                     |

### `src/lib/` — Bibliotecas principais (~50 módulos)

| Módulo                                         | Finalidade                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                         | Gestor de tarefas do protocolo A2A, competências (5), transmissão em fluxo                                                                                                                                                                                                                                                          |
| `acp/`                                         | Registo de agentes CLI (deteção de CLI local — consulte `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                 |
| `api/`                                         | Funções auxiliares partilhadas da API (`requireManagementAuth`, validação)                                                                                                                                                                                                                                                          |
| `auth/`                                        | Sessão, hashing de palavras-passe, validação de tokens                                                                                                                                                                                                                                                                              |
| `batches/`                                     | Processadores da API Batches da OpenAI                                                                                                                                                                                                                                                                                              |
| `catalog/`                                     | Validação Zod do catálogo de fornecedores + resolução de capacidades                                                                                                                                                                                                                                                                |
| `cloudAgent/`                                  | Agentes na nuvem (Codex Cloud, Devin, Jules) — consulte `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                            |
| `combos/`                                      | Funções auxiliares de resolução e reordenação de combinações                                                                                                                                                                                                                                                                        |
| `audit/`                                       | Funções auxiliares do feed de atividade: `highLevelActions.ts` (lista de permissões + `isHighLevelAction()`), `activityIcons.ts` (mapa de ação → ícone/verbo), `timeline.ts` (groupByDay/relativeTime) — consulte `docs/architecture/MONITORING_SECTIONS.md`                                                                        |
| `compliance/`                                  | Registo de auditoria + auditoria de fornecedores — consulte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                           |
| `compression/`                                 | Código de integração do motor de compressão (os motores encontram-se em `open-sse/services/compression/`)                                                                                                                                                                                                                           |
| `config/`                                      | Funções auxiliares de configuração em tempo de execução                                                                                                                                                                                                                                                                             |
| `db/`                                          | Mais de 120 módulos de BD de domínio + 168 migrações (para SQLite, utilize sempre estes módulos)                                                                                                                                                                                                                                    |
| `quota/`                                       | Motor de partilha de quotas: `dimensions.ts` (tipos/Zod), `types.ts` (interface QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — consulte `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                       | Cliente do catálogo de modelos gratuitos do Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — consulte `docs/frameworks/RADAR.md`                                                                                                                                 |
| `display/`                                     | Utilitários auxiliares de formatação da IU (custo, latência, etc.)                                                                                                                                                                                                                                                                  |
| `embeddings/`                                  | Utilitários auxiliares do serviço de embeddings                                                                                                                                                                                                                                                                                     |
| `env/`                                         | Análise + validação de variáveis de ambiente                                                                                                                                                                                                                                                                                        |
| `evals/`                                       | Framework de avaliação (conjuntos, executor, ambiente de execução) — consulte `docs/frameworks/EVALS.md`                                                                                                                                                                                                                            |
| `guardrails/`                                  | Mascarador de PII, injeção de prompts, ponte de visão — consulte `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                      |
| `jobs/`                                        | Tarefas em segundo plano (semelhantes ao cron)                                                                                                                                                                                                                                                                                      |
| `memory/`                                      | Memória de conversação (RRF híbrido SQLite FTS5 + sqlite-vec + nível 2 do Qdrant) — consulte `docs/frameworks/MEMORY.md`                                                                                                                                                                                                            |
| `memory/embedding/`                            | Camada de embeddings com múltiplas fontes: `index.ts` (resolvedor), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plano 21)                                                                                                                                                                       |
| `memory/vectorStore.ts`                        | Wrapper de sqlite-vec v0.1.9 — KNN de força bruta + RRF híbrido (FTS5 + vetor, k=60). Inicialização tardia, com degradação controlada quando sqlite-vec não está disponível. (plano 21)                                                                                                                                             |
| `memory/reindex.ts`                            | `runReindexBatch()` — processa em segundo plano as memórias com `needs_reindex=1`; chamado por `POST /api/memory/reindex` e pelo fluxo de preenchimento retroativo tardio. (plano 21)                                                                                                                                               |
| `monitoring/`                                  | Verificações de estado, emissão de métricas                                                                                                                                                                                                                                                                                         |
| `oauth/`                                       | Fluxos de OAuth/importação para 22 módulos de fornecedores (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                              |
| `plugins/`                                     | Registo de plugins                                                                                                                                                                                                                                                                                                                  |
| `promptCache/`                                 | Pontos de interrupção da cache de prompts ao estilo da Anthropic                                                                                                                                                                                                                                                                    |
| `skills/`                                      | Framework de competências (integradas + marketplace + SkillsSH) — consulte `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                              |
| `playground/`                                  | Auxiliares partilhados do Playground Studio: `codeExport.ts` (gerador de curl/Python/TS), `promptImprover.ts` (construtor de meta-prompts), `streamMetrics.ts` (TTFT/TPS puros), `types.ts` (tabela de preços) — consulte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                    |
| `webhookDispatcher.ts`                         | Entrega de webhooks com HMAC — consulte `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                               |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`       | Gestores de túneis — consulte `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                           |
| `cloudSync.ts`, `initCloudSync.ts`             | Sincronização opcional do estado com a nuvem                                                                                                                                                                                                                                                                                        |
| `localDb.ts`                                   | Módulo agregador de reexportação para módulos da base de dados (sem lógica — apenas reexportações)                                                                                                                                                                                                                                  |
| `cacheLayer.ts`, `idempotencyLayer.ts`         | Colocação em cache de pedidos + idempotência                                                                                                                                                                                                                                                                                        |
| (mais cerca de 30 ficheiros de nível superior) | Auxiliares especializados (logEnv, modelsDevSync, piiSanitizer, etc.)                                                                                                                                                                                                                                                               |

### `src/lib/db/` — Base de dados (122 módulos + 168 migrações)

| Subdiretório              | Finalidade                                                                                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` com registo WAL                                                                                                                                        |
| `db/migrations/`          | Ficheiros SQL com controlo de versões (idempotentes, transacionais). `073_memory_vec.sql` adiciona `memory_vec_meta` + coluna `needs_reindex` (plano 21).                          |
| `db/playgroundPresets.ts` | Módulo CRUD para predefinições do Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD para `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, etc. (plano 21)                      |
| `db/<domain>.ts`          | Um módulo por domínio: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache, etc.         |

### `src/domain/`

| Módulo                 | Finalidade                                                     |
| ---------------------- | -------------------------------------------------------------- |
| `policy.ts`            | Motor de políticas                                             |
| `fallbackPolicy.ts`    | Árvore de decisão de recurso                                   |
| `costRules.ts`         | Regras de cálculo de custos                                    |
| `lockoutPolicy.ts`     | Política de bloqueio de modelos/ligações                       |
| `tagRouter.ts`         | Encaminhamento baseado em etiquetas                            |
| `comboResolver.ts`     | Resolução de combinações (utilizada pelo motor de combinações) |
| `modelAvailability.ts` | Verificação da disponibilidade por modelo                      |
| `assessment/`          | Avaliação de modelos (Fase 1 de RFC-AUTO-ASSESSMENT )          |

### `src/server/`

| Módulo   | Finalidade                                                                                                 |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline de autorização: `classify` → `policies` → `enforce` — consulte `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configuração de CORS                                                                                       |
| `auth/`  | Middleware de sessão                                                                                       |

### `src/shared/`

| Módulo                           | Finalidade                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 fornecedores** com validação Zod (fonte de verdade)                              |
| `constants/cliTools.ts`          | Registo de ferramentas CLI externas                                                    |
| `constants/routingStrategies.ts` | **19 estratégias de encaminhamento** com prioridades                                   |
| `constants/publicApiRoutes.ts`   | Rotas que requerem autenticação Bearer (em vez de autenticação de gestão)              |
| `constants/upstreamHeaders.ts`   | Lista de bloqueio de cabeçalhos para pedidos a montante                                |
| `validation/schemas.ts`          | ~80 esquemas Zod (fonte única de verdade para contratos da API)                        |
| `validation/helpers.ts`          | Auxiliares de validação Zod (`validateBody`, etc.)                                     |
| `types/`                         | Tipos TS partilhados                                                                   |
| `contracts/`                     | Contratos da API pública (consumidos por `files:` em `package.json`)                   |
| `utils/circuitBreaker.ts`        | Disjuntor de circuito do fornecedor (consulte `docs/architecture/RESILIENCE_GUIDE.md`) |
| `utils/apiAuth.ts`               | Validação de chaves da API e verificação de âmbito                                     |
| `utils/fetchTimeout.ts`          | Wrappers de tempo limite/interrupção para fetch a montante                             |
| `utils/releaseNotes.ts`          | Analisador de anúncios fechados v2/legados, localização e dispensa por ID              |

---

## `open-sse/` — Área de Trabalho do Motor de Streaming

Área de trabalho npm separada (`@omniroute/open-sse`). Gere o processamento de pedidos e a execução de fornecedores.

```
open-sse/
├── handlers/            # 16 ficheiros (12 processadores + 4 auxiliares): chatCore, responsesHandler, embeddings, áudio, imagem, vídeo, música, reclassificação, moderações, pesquisa, etc.
├── executors/           # 67 executores específicos de fornecedores (estendem BaseExecutor)
├── translator/          # Conversores de formato (9 de pedidos, 9 de respostas, 9 auxiliares)
├── transformer/         # API Responses ↔ Chat Completions (TransformStream)
├── services/            # ~80+ módulos de serviço (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, etc.)
├── mcp-server/          # Servidor MCP (110 ferramentas, 3 transportes, 33 âmbitos)
├── config/              # Registos de fornecedores/modelos, configuração de cabeçalhos, aliases de modelos
├── utils/               # Cliente TLS, fetch/dispatcher de proxy, auxiliares de rede
├── index.ts             # Ponto de entrada da área de trabalho
├── package.json         # Manifesto da área de trabalho
├── tsconfig.json        # Configuração TS da área de trabalho
└── types.d.ts           # Declarações de tipos da área de trabalho
```

### `open-sse/mcp-server/`

| Caminho                     | Finalidade                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `server.ts`                 | Ciclo de vida do servidor MCP (transportes stdio + HTTP)                                              |
| `httpTransport.ts`          | Transportes HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                                 |
| `audit.ts`                  | Registo de auditoria na tabela `mcp_tool_audit`                                                       |
| `scopeEnforcement.ts`       | Validação do âmbito por ferramenta                                                                    |
| `runtimeHeartbeat.ts`       | Sinal de atividade para `DATA_DIR/runtime/mcp-heartbeat.json`                                         |
| `descriptionCompressor.ts`  | Comprime os metadados de descrição das ferramentas para poupar contexto                               |
| `schemas/tools.ts`          | 36 definições de ferramentas base + âmbitos                                                           |
| `tools/advancedTools.ts`    | Implementações de ferramentas avançadas                                                               |
| `tools/memoryTools.ts`      | 3 ferramentas de memória (pesquisar/adicionar/limpar)                                                 |
| `tools/skillTools.ts`       | 4 ferramentas de competências (listar/ativar/executar/execuções)                                      |
| `tools/compressionTools.ts` | 5 ferramentas de compressão                                                                           |
| `README.md`                 | README interno do servidor MCP (com referências cruzadas a partir de `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Wrapper para Desktop

| Ficheiro         | Finalidade                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `main.js`        | Processo principal do Electron (BrowserWindow, servidor Next.js incorporado, tabuleiro do sistema, atualização automática) |
| `preload.js`     | Ponte IPC (contextBridge → `window.omniroute`)                                                                             |
| `package.json`   | Configuração do electron-builder + dependências Electron 41 + electron-builder 26.10                                       |
| `assets/`        | Ícones da aplicação (Windows .ico, macOS .icns, Linux .png)                                                                |
| `dist-electron/` | Resultado da compilação (ignorado pelo Git)                                                                                |
| `types.d.ts`     | Declarações de tipos para a ponte do renderer                                                                              |
| `README.md`      | README interno do Electron (consulte também `docs/guides/ELECTRON_GUIDE.md`)                                               |

---

## `bin/` — CLI

| Ficheiro                                                                                                    | Finalidade                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute.mjs`                                                                                             | Entrada principal da CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, etc. |
| `reset-password.mjs`                                                                                        | CLI autónoma para reposição da palavra-passe                                                                                         |
| `cli/commands/setup.mjs`                                                                                    | Assistente de configuração interativo e não interativo                                                                               |
| `cli/commands/doctor.mjs`                                                                                   | Diagnóstico do estado do sistema (mais de 8 verificações)                                                                            |
| `cli/commands/providers.mjs`                                                                                | Listagem/teste/validação de fornecedores                                                                                             |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Módulos auxiliares da CLI                                                                                                            |
| `cli/tray/tray.ts`                                                                                          | Integração com a área de notificação do sistema (multiplataforma: NotifyIcon no Windows, systray2 no macOS/Linux)                    |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell NotifyIcon (Windows, sem novos binários)                                                                          |
| `cli/tray/autostart.ts`                                                                                     | Arranque automático multiplataforma (LaunchAgent / .desktop / registo)                                                               |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Cadeia de resolução do controlador SQLite em 5 passos (incluído → runtime → instalação diferida → node:sqlite → sql.js)              |
| `cli/runtime/magicBytes.mjs`                                                                                | Validação dos bytes mágicos de binários (ELF / Mach-O / Mach-O fat / PE)                                                             |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — pré-resolve os controladores durante a pós-instalação / o primeiro arranque                                     |
| `nodeRuntimeSupport.mjs`                                                                                    | Valida a versão suportada do Node.js durante a instalação                                                                            |

---

## `skills/` — Competências Públicas de Agentes

| Ficheiro                     | Finalidade                                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestos de competências para agentes de IA externos (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Scripts de Compilação e Verificação

| Script                              | Finalidade                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Executor de desenvolvimento/inicialização com carregamento de variáveis de ambiente                                |
| `build-next-isolated.mjs`           | Compilação autónoma (Next.js 16 autónomo)                                                                          |
| `prepublish.ts`                     | Preparação do pacote antes de `npm pack`                                                                           |
| `postinstall.mjs`                   | Criação automática de `.env` a partir de `.env.example` na primeira instalação                                     |
| `sync-env.mjs`                      | Ressincronização das chaves de `.env` com `.env.example`                                                           |
| `check-cycles.mjs`                  | Deteção de dependências circulares                                                                                 |
| `check-route-validation.mjs`        | Validação de que todas as rotas da API têm validação Zod                                                           |
| `check-t11-any-budget.mjs`          | Aplicação do limite explícito de `any` por ficheiro                                                                |
| `check-docs-sync.mjs`               | Validação da sincronização de versões da documentação (pré-commit existente)                                       |
| **`check-env-doc-sync.mjs`**        | NOVO: verificação cruzada das variáveis de ambiente no código, em `.env.example` e em `ENVIRONMENT.md`             |
| **`check-docs-counts-sync.mjs`**    | NOVO: validação de que as contagens (executores, estratégias, OAuth, competências A2A) correspondem à documentação |
| **`check-deprecated-versions.mjs`** | NOVO: sinalização de versões/datas desatualizadas na documentação                                                  |
| `check-supported-node-runtime.ts`   | Validação de que a versão atual do Node é suportada                                                                |
| `check-pr-test-policy.mjs`          | Aplicação da regra «testes obrigatórios» a alterações no código de produção                                        |
| **`gen-provider-reference.ts`**     | NOVO: geração automática de `docs/reference/PROVIDER_REFERENCE.md` a partir do catálogo                            |
| `i18n/generate-multilang.mjs`       | Tradução de cadeias da IU e da documentação através do Google Translate                                            |
| `i18n_autotranslate.py`             | Pipeline de tradução da documentação baseado em LLM                                                                |
| `validate_translation.py`           | Validação da tradução por idioma                                                                                   |
| `check_translations.py`             | Verificação das chaves de i18n no código                                                                           |
| `run-playwright-tests.mjs`          | Executor de testes E2E do Playwright                                                                               |
| `run-protocol-clients-tests.mjs`    | Executor de testes E2E de MCP/A2A                                                                                  |
| `run-ecosystem-tests.mjs`           | Testes do ecossistema (integração de fornecedores)                                                                 |
| `test-report-summary.mjs`           | Geração do resumo de cobertura em markdown                                                                         |
| `smoke-electron-packaged.mjs`       | Teste rápido da compilação empacotada do Electron                                                                  |
| `native-binary-compat.mjs`          | Validação de que as dependências nativas (`better-sqlite3`) correspondem ao Node do Electron                       |
| `validate-pack-artifact.ts`         | Validação do resultado do pacote npm                                                                               |
| `responses-ws-proxy.mjs`            | Ponte WebSocket para a API Codex Responses                                                                         |
| `v1-ws-bridge.mjs`                  | Ponte WebSocket para o endpoint `/api/v1/ws`                                                                       |
| `standalone-server-ws.mjs`          | Executor autónomo do servidor WS                                                                                   |
| `system-info.mjs`                   | Apresentação de informações do sistema/ambiente de execução para suporte                                           |
| `healthcheck.mjs`                   | Verificação de integridade única (utilizada pelo Docker HEALTHCHECK)                                               |
| `uninstall.mjs`                     | Script de desinstalação completa                                                                                   |

---

## `docs/` — Documentação pública (7 ficheiros raiz + 17 subdiretórios)

### Guias de nível superior

| Documento                   | Finalidade                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arquitetura de alto nível, mapa de subsistemas, superfície do painel                                  |
| `CODEBASE_DOCUMENTATION.md` | Referência de engenharia: diretórios, módulos, convenções                                             |
| `FEATURES.md`               | Matriz de funcionalidades com destaques da v3.8                                                       |
| `USER_GUIDE.md`             | Manual do utilizador final (configuração, modelos, combos, CLIs, áudio, etc.)                         |
| `API_REFERENCE.md`          | Referência dos endpoints da API com modelo de autenticação                                            |
| `openapi.yaml`              | Especificação OpenAPI 3.0 (121 caminhos)                                                              |
| `SETUP_GUIDE.md`            | Métodos de instalação (npm, npx, Docker, Electron, Termux, código-fonte)                              |
| `ENVIRONMENT.md`            | Todas as variáveis de ambiente (~800 documentadas, ~3.050 linhas em `.env.example`)                   |
| `TROUBLESHOOTING.md`        | Erros comuns + problemas conhecidos da v3.8.0                                                         |
| `RELEASE_CHECKLIST.md`      | Fluxo completo de lançamento (skills, husky, commits convencionais, implementação)                    |
| `COVERAGE_PLAN.md`          | Objetivos de cobertura e estado atual                                                                 |
| `FREE_TIERS.md`             | Fornecedores selecionados com planos gratuitos (mais de 48 gratuitos + 11 OAuth)                      |
| `CLI-TOOLS.md`              | Integrações com CLIs externas + CLI interna do OmniRoute                                              |
| `I18N.md`                   | Arquitetura de i18n, adição de um idioma, 42 configurações regionais                                  |
| `UNINSTALL.md`              | Passos para uma desinstalação completa                                                                |
| `PROVIDER_REFERENCE.md`     | Catálogo **gerado automaticamente** de 355 fornecedores (regenerar: `npm run gen:provider-reference`) |

### Análises aprofundadas dos subsistemas

| Documento                                        | Finalidade                                                                                            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                  | Servidor MCP: 110 ferramentas, 3 transportes, 33 âmbitos, endpoints REST                              |
| `A2A-SERVER.md`                                  | A2A v0.3: JSON-RPC, 6 skills, auxiliares REST, cartão de agente                                       |
| `AGENT_PROTOCOLS_GUIDE.md`                       | Guia unificado: A2A vs ACP vs agentes na nuvem                                                        |
| `CLOUD_AGENT.md`                                 | Orquestração do Codex Cloud / Devin / Jules                                                           |
| `SKILLS.md`                                      | Framework de skills (integradas + marketplace + SkillsSH + sandbox)                                   |
| `RADAR.md`                                       | Sobreposição do catálogo de modelos gratuitos do Radar (`RADAR_ENABLED`, desativada por predefinição) |
| `MEMORY.md`                                      | Sistema de memória (SQLite FTS5 + Qdrant)                                                             |
| `EVALS.md`                                       | Framework de avaliação (suites, execuções, rubricas)                                                  |
| `GUARDRAILS.md`                                  | Mascarador de PII, injeção de prompts, ponte de visão                                                 |
| `COMPLIANCE.md`                                  | Registo de auditoria, retenção, exclusão voluntária com noLog                                         |
| `WEBHOOKS.md`                                    | Entrega de webhooks assinada com HMAC                                                                 |
| `REASONING_REPLAY.md`                            | Cache híbrida de memória/SQLite para `reasoning_content`                                              |
| `AUTHZ_GUIDE.md`                                 | Pipeline de autorização (`classify` → `policies` → `enforce`)                                         |
| `RESILIENCE_GUIDE.md`                            | Disjuntor + período de espera + bloqueio de modelo                                                    |
| `docs/security/STEALTH_GUIDE.md` (apenas no git) | Impressão digital TLS (JA3/JA4), Claude Code CCH, certificado MITM                                    |
| `AUTO-COMBO.md`                                  | Motor Auto Combo (pontuação de 16 fatores, 6 pacotes de modos, fábrica virtual)                       |

### Compressão

| Documento                       | Finalidade                                    |
| ------------------------------- | --------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Visão geral dos modos de compressão + roteiro |
| `COMPRESSION_ENGINES.md`        | Motores Caveman + RTK, contrato do registo    |
| `COMPRESSION_RULES_FORMAT.md`   | Esquema JSON do pacote de regras Caveman      |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventário de pacotes de regras por idioma    |
| `RTK_COMPRESSION.md`            | Pipeline declarativo RTK (49 filtros)         |

### Implementação

| Documento                    | Finalidade                                                           |
| ---------------------------- | -------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Compilação Docker, perfis (base/cli/host/cliproxyapi), sidecar Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Implementação genérica em VM/VPS (Ubuntu/Debian + nginx + systemd)   |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Implementação no Fly.io (atualmente disponível apenas em chinês)     |
| `TERMUX_GUIDE.md`            | Android sem interface gráfica através do Termux                      |
| `PWA_GUIDE.md`               | Instalação da aplicação Web progressiva + service worker             |
| `ELECTRON_GUIDE.md`          | Compilação + assinatura + distribuição da aplicação para computador  |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                               |
| `PROXY_GUIDE.md`             | Proxy de saída de 4 níveis + marketplace 1proxy                      |

### Subdiretórios

| Subdiretório          | Finalidade                                                                                                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Traduções localizadas da documentação (41 idiomas)                                                                                                                                                                                                      |
| `docs/screenshots/`   | Recursos de imagem para guias                                                                                                                                                                                                                           |
| `_tasks/superpowers/` | Planos/especificações do superpowers (`writing-plans`/`brainstorming`) + investigação — repositório isolado, com controlo de versões separado e ignorado pelo Git na árvore principal. Consulte CLAUDE.md → "Artefactos de Planeamento e Investigação". |

---

## `tests/` — Conjuntos de testes

| Subdiretório                         | Tipo                                                 | Executor                                           |
| ------------------------------------ | ---------------------------------------------------- | -------------------------------------------------- |
| `tests/unit/`                        | Testes unitários (~4 800 ficheiros, os mais rápidos) | Executor de testes nativo do Node                  |
| `tests/integration/`                 | Testes de integração multimódulo + BD                | Executor de testes nativo do Node (concorrência 1) |
| `tests/e2e/`                         | E2E da IU + fluxo de trabalho                        | Playwright                                         |
| `tests/e2e/protocol-clients.test.ts` | E2E com clientes reais MCP + A2A                     | Clientes de protocolo personalizados               |
| `tests/e2e/ecosystem.test.ts`        | Integração de fornecedores (com acesso à rede)       | Executor de testes nativo do Node                  |

---

## `public/` — Recursos estáticos

| Caminho             | Finalidade                                                            |
| ------------------- | --------------------------------------------------------------------- |
| `public/` (raiz)    | Favicons, robots.txt, manifesto, service worker, imagens de marketing |
| `public/providers/` | Logótipos PNG/SVG dos fornecedores (utilizados no painel)             |

---

## `config/` — Configurações estáticas + estado dos controlos de qualidade

Modelos de configuração distribuídos, juntamente com as linhas de base dos controlos de qualidade confirmadas
(movidos para aqui a partir da raiz do repositório na v3.8.26, para manter a raiz simples).

| Caminho                                       | Finalidade                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista de localidades + metadados (fonte canónica para a contagem de 42 localidades)         |
| `config/i18n-schema.json`                     | Esquema JSON que valida `i18n.json`                                                         |
| `config/payloadRules.json`                    | Regras de saneamento dos payloads a montante                                                |
| `config/quality/quality-baseline.json`        | Linha de base progressiva com várias métricas (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Linha de base fixa da complexidade do ESLint (`check-complexity.mjs`)                       |
| `config/quality/duplication-baseline.json`    | Linha de base fixa da duplicação do jscpd (`check-duplication.mjs`)                         |
| `config/quality/file-size-baseline.json`      | Linha de base fixa do tamanho por ficheiro (`check-file-size.mjs`)                          |
| `config/quality/test-discovery-baseline.json` | Linha de base fixa de testes órfãos (`check-test-discovery.mjs`)                            |
| `config/quality/dependency-allowlist.json`    | Lista de dependências permitidas e aprovadas (`check-deps.mjs`)                             |
| `config/quality/.license-allowlist.json`      | Lista de licenças SPDX permitidas (`check-licenses.mjs`)                                    |
| `config/quality/quality-metrics.json`         | Métricas efémeras recolhidas (geradas por `collect-metrics.mjs`; **ignoradas pelo git**)    |

---

## `.github/` — Integração com o GitHub

| Caminho                            | Finalidade                                                                 |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `.github/workflows/`               | Workflows de CI/CD do GitHub Actions (lint, testes, cobertura, lançamento) |
| `.github/ISSUE_TEMPLATE/`          | Modelos de issues para bugs/funcionalidades                                |
| `.github/pull_request_template.md` | Modelo de PR                                                               |
| `.github/dependabot.yml`           | Configuração de atualização de dependências                                |

---

## `.husky/` — Hooks do Git

| Ficheiro     | Finalidade                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| `pre-commit` | Executa `lint-staged + check-docs-sync + check:any-budget:t11`              |
| `pre-push`   | Atualmente desativado (comentado). Execute `npm run test:unit` manualmente. |
| `_/`         | Componentes internos do Husky                                               |

---

## `.claude/` — Comandos Slash do Claude Code

| Ficheiro                                            | Finalidade                                                      |
| --------------------------------------------------- | --------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incrementa a versão + changelog automático |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — workflow completo de lançamento        |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Implementa no VPS                                               |
| `commands/capture-release-evidences-cc.md`          | Grava novas funcionalidades no browser em formato WebP          |
| `commands/review-{prs,discussions}-cc.md`           | Faz a triagem de PRs/discussões do GitHub                       |
| `commands/{review-issues,implement-features}-cc.md` | Workflows de issues                                             |
| `settings.local.json`                               | Definições do Claude Code específicas do projeto                |

---

## `.agents/` — Workflows Genéricos de Agentes (Codex / Cursor / etc.)

| Caminho                  | Finalidade                                                  |
| ------------------------ | ----------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definições de workflows (espelho de `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definições de competências com Notas de Execução do Codex |

> **Nota:** Atualmente, os workflows e os comandos são idênticos byte a byte. Se `.agents/` se destinar a um runtime de agente diferente (Codex), as variantes terão de divergir de forma significativa.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Fora da árvore

Estes diretórios com prefixo de sublinhado contêm conteúdo que não é distribuído:

- **`_ideia/`** — notas de design (categorias defer / notfit / viable)
- **`_mono_repo/`** — subprojetos históricos (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — clones só de leitura de projetos OSS relacionados (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, etc.) para consulta cruzada durante o desenvolvimento
- **`_tasks/`** — ficheiros de acompanhamento de tarefas por lançamento (informais)

Não incluídos no resultado de `npm pack`. Consulte `.npmignore`.

---

## Gerado / Ignorado pelo Git

| Caminho                | Finalidade                            |
| ---------------------- | ------------------------------------- |
| `node_modules/`        | Dependências npm                      |
| `.next/`               | Resultado da compilação do Next.js    |
| `coverage/`            | Relatórios de cobertura do c8         |
| `logs/`                | Registos de execução                  |
| `package/`             | Área de preparação do npm pack        |
| `.playwright-mcp/`     | Artefactos de teste do Playwright MCP |
| `.issues/`             | Cache local de problemas              |
| `tsconfig.tsbuildinfo` | Cache incremental do TS               |

---

## Sugestões de navegação

- **É um novo colaborador?** Leia `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Vai adicionar um fornecedor?** Siga `docs/architecture/ARCHITECTURE.md § Adding a New Provider` e confirme em `docs/reference/PROVIDER_REFERENCE.md`.
- **Vai adicionar uma rota?** Consulte `docs/architecture/ARCHITECTURE.md § Adding a New API Route` e `src/shared/validation/schemas.ts`.
- **Vai adicionar uma ferramenta MCP?** Consulte `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Vai adicionar uma capacidade A2A?** Consulte `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Vai executar localmente?** Consulte `docs/guides/SETUP_GUIDE.md`.
- **Vai implementar?** Consulte `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Vai publicar uma versão?** Consulte `docs/ops/RELEASE_CHECKLIST.md` (e a capacidade `/generate-release-cc` do Claude Code).
