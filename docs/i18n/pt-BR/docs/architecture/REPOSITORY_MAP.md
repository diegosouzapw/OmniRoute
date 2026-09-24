# Repository Map (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descrição em uma linha de cada diretório e arquivo raiz.**
> Última atualização: 2026-06-28 — OmniRoute v3.8.40
>
> Use este mapa para navegar rapidamente pela base de código. Para análises mais detalhadas, siga os links para a documentação dedicada.

## Árvore de nível superior

```
OmniRoute/
├── src/                  # Aplicação Next.js 16 (interface + rotas de API + bibliotecas + domínio + servidor)
├── open-sse/             # Workspace do mecanismo de streaming (manipuladores, executores, tradutor, servidor MCP)
├── electron/             # Wrapper para desktop (Electron 41 + electron-builder 26.10)
├── bin/                  # Ponto de entrada da CLI e manipuladores de comandos
├── scripts/              # Scripts de compilação, verificação, sincronização e execução única
├── docs/                 # Documentação pública (você está aqui)
├── tests/                # Todas as suítes de testes (unitários, integração, e2e, clientes de protocolo)
├── public/               # Ativos estáticos do Next.js, manifesto PWA, service worker, ícones
├── config/               # Configuração estática + estado dos critérios de qualidade (i18n, payloadRules, quality/)
├── images/               # Ativos de imagem para marketing / README
├── @omniroute/           # Pacotes complementares publicáveis (opencode-plugin, opencode-provider)
├── skills/               # Pacotes de habilidades para CLI/agentes (cli-* + omni-* + config-codex-cli)
├── examples/             # Plugins de exemplo + projeto inicial omniroute-cmd-hello
├── contrib/              # Contribuições da comunidade (podman/)
├── .source/              # Configuração de origem do Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Workflows do GitHub Actions + modelos de issues + modelo de PR
├── .husky/               # Hooks do Git (pre-commit, pre-push)
├── .claude/              # Comandos de barra do Claude Code (específicos do projeto)
├── .agents/              # Workflows + habilidades para Codex / agentes genéricos (espelho de .claude/)
├── .vscode/              # Configurações do workspace do VS Code
├── _ideia/               # Notas de planejamento (informais; não distribuídas)
├── _mono_repo/           # Subprojetos históricos (cloud, site, vscode-extension)
├── _references/          # Clones de referência somente leitura de projetos OSS relacionados
├── _tasks/               # Arquivos de acompanhamento de tarefas por versão (informais)
├── .build/ .worktrees/ dist/   # Rascunhos locais de compilação / git-worktree / saída de compilação (ignorados pelo Git)
├── .issues/              # Cache local de issues (ignorado pelo Git)
├── .playwright-mcp/      # Artefatos de testes do Playwright MCP
├── coverage/             # Saída de cobertura do c8 (ignorada pelo Git)
├── logs/                 # Logs de execução (ignorados pelo Git)
├── node_modules/         # Dependências (ignoradas pelo Git)
├── package/              # Área de preparação do npm pack (artefato de compilação)
├── .next/                # Saída de compilação do Next.js (ignorada pelo Git)
└── (arquivos raiz — veja abaixo)
```

---

## Arquivos raiz

| Arquivo                                     | Finalidade                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **README.md**                               | Página inicial de marketing + início rápido + matriz de recursos (consulte também `llm.txt`)                       |
| **CHANGELOG.md**                            | Histórico de alterações por versão (gerado automaticamente pela skill `/version-bump-cc`)                          |
| **LICENSE**                                 | Texto da licença MIT                                                                                               |
| **CLAUDE.md**                               | Regras do projeto para agentes do Claude Code (regras rígidas, convenções, cenários)                               |
| **AGENTS.md**                               | Igual ao CLAUDE.md, mas para agentes de IA que não sejam Claude (Codex, Cursor etc.)                               |
| **GEMINI.md**                               | Regras concisas para agentes baseados no Gemini (subconjunto do CLAUDE.md)                                         |
| **CONTRIBUTING.md**                         | Guia do colaborador: configuração, commits convencionais, testes, fluxo de PR                                      |
| **SECURITY.md**                             | Política de comunicação de vulnerabilidades, versões compatíveis, modelo de ameaças                                |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — expectativas de comportamento da comunidade                                                 |
| **llm.txt**                                 | Página inicial em texto simples otimizada para rastreadores de LLM (SEO para assistentes de IA)                    |
| **package.json**                            | Manifesto npm, scripts, dependências, engines, limite de cobertura do c8                                           |
| **package-lock.json**                       | Árvore de dependências bloqueada                                                                                   |
| **tsconfig.json**                           | Configuração raiz do TypeScript                                                                                    |
| **tsconfig.typecheck-core.json**            | Configuração de verificação de tipos para o núcleo em `src/`                                                       |
| **tsconfig.typecheck-noimplicit-core.json** | Verificação de tipos estrita (`noImplicitAny`)                                                                     |
| **tsconfig.tsbuildinfo**                    | Cache de compilação incremental do TS (ignorado pelo Git)                                                          |
| **next.config.mjs**                         | Configuração de compilação do Next.js 16 (saída autônoma)                                                          |
| **next-env.d.ts**                           | Tipos de ambiente gerados automaticamente pelo Next.js                                                             |
| **eslint.config.mjs**                       | Configuração plana do ESLint (regras por área do projeto)                                                          |
| **prettier.config.mjs**                     | Regras de formatação do Prettier                                                                                   |
| **postcss.config.mjs**                      | Configuração do PostCSS para o pipeline Tailwind/CSS                                                               |
| **playwright.config.ts**                    | Configuração de testes E2E do Playwright                                                                           |
| **vitest.config.ts**                        | Configuração do Vitest (suíte padrão)                                                                              |
| **vitest.mcp.config.ts**                    | Configuração do Vitest para o servidor MCP / suítes autoCombo / cache                                              |
| **sonar-project.properties**                | Configuração do SonarQube/SonarCloud (qualidade do código)                                                         |
| **Dockerfile**                              | Build do Docker em vários estágios (builder → runner-base → runner-cli)                                            |
| **docker-compose.yml**                      | Compose de desenvolvimento com 4 perfis (base, cli, host, cliproxyapi) + contêiner auxiliar do redis               |
| **docker-compose.prod.yml**                 | Compose de produção (porta 20130, redis, volumes nomeados)                                                         |
| **.dockerignore**                           | Arquivos excluídos do contexto do Docker                                                                           |
| **fly.toml**                                | Configuração de implantação no Fly.io (região `sin`, porta 20128, volume /data)                                    |
| **.env.example**                            | Arquivo de ambiente de modelo (copiado automaticamente para `.env` na primeira instalação)                         |
| **.gitignore**                              | Padrões de arquivos ignorados pelo Git                                                                             |
| **.npmignore**                              | Lista de exclusão para publicação no npm                                                                           |
| **.npmrc**                                  | Configuração do npm (registro, política de lockfile)                                                               |
| **.node-version**                           | Versão fixa do Node (usada por ferramentas compatíveis com nvm)                                                    |
| **.nvmrc**                                  | Versão fixa do Node para nvm                                                                                       |
| **eslint.complexity.config.mjs**            | Configuração do ESLint para o controle progressivo de complexidade (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Configuração do ESLint para regras do SonarJS (complexidade cognitiva / duplicação)                                |
| **source.config.ts**                        | Configuração de origem `defineDocs` do Fumadocs (alimenta `.source/`)                                              |
| **knip.json**                               | Configuração do Knip — arquivos/exportações/dependências não utilizados (alimenta a verificação de código morto)   |
| **stryker.conf.json**                       | Configuração de testes de mutação do Stryker                                                                       |
| **.size-limit.json**                        | Configuração de limite de tamanho do bundle do size-limit                                                          |
| **promptfooconfig.yaml**                    | Configuração de avaliação do promptfoo                                                                             |
| **.gitleaks.toml**                          | Conjunto de regras do gitleaks para verificação de segredos                                                        |
| **.zizmor.yml**                             | Configuração do zizmor para análise de segurança do GitHub Actions                                                 |
| **socket.yml**                              | Configuração de cadeia de suprimentos do Socket.dev                                                                |
| **news.json**                               | Feed localizado de anúncios da v2; o item de lançamento do Radar é enviado inativo                                 |
| **flake.nix** / **flake.lock**              | Definição do shell de desenvolvimento do Nix + arquivo de lock                                                     |
| **.env**                                    | Segredos locais (ignorados pelo git — gerados a partir de `.env.example`)                                          |

> **Removidos da raiz na v3.8.26 (organização):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` e o arquivo `quality-metrics.json` gerado (ignorado pelo git). Consulte [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Aplicação Next.js

```
src/
├── app/                 # App Router (páginas + rotas de API + páginas de status + landing page)
├── lib/                 # Bibliotecas principais / módulos de domínio (80 subdiretórios + ~70 arquivos no nível superior)
├── domain/              # Lógica de domínio pura (mecanismo de políticas, fallback, custo, bloqueio, comboResolver, avaliação)
├── server/              # Módulos exclusivos do servidor (pipeline de authz, cors, middleware de autenticação) — não podem ser importados pelo cliente
├── shared/              # Compartilhado entre servidor e cliente quando seguro (constantes, tipos, validação, contratos, utilitários)
├── i18n/                # Configuração do next-intl + JSON de mensagens por localidade (42 localidades)
├── middleware/          # Middleware do Next.js (enriquecimento de requisições, detecção de localidade)
├── mitm/                # Núcleo do proxy MITM: geração/instalação de certificados, manipuladores, destinos, inspetor, máscaras, passagem direta
│   ├── handlers/        # 9 classes de manipuladores de agentes de IDE que estendem MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Camada de captura de tráfego: buffer (anel em memória), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Código de integração de adaptadores de modelos (shim legado)
├── scripts/             # Scripts de manutenção internos (por exemplo, backfillAggregation)
├── sse/                 # Manipuladores/serviços SSE legados (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Armazenamento legado em memória (sendo gradualmente substituído por src/lib/db)
├── types/               # Arquivos de tipos TS compartilhados
├── instrumentation.ts   # Hook de telemetria do Next.js (navegador + edge)
├── instrumentation-node.ts  # Instrumentação exclusiva do Node
└── proxy.ts             # Shim de entrada do proxy HTTP
```

### `src/app/` — App Router (Next.js 16)

| Caminho                                                                      | Finalidade                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | API pública compatível com OpenAI (~25 sub-rotas: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers etc.)                                                                                                                            |
| `app/api/v1beta/`                                                            | Endpoints de API no estilo Gemini                                                                                                                                                                                                                                                                                            |
| `app/api/playground/`                                                        | Rotas do Playground Studio: `improve-prompt/` (POST — reescritor de prompts com LLM), `presets/` (GET para listar / POST para criar), `presets/[id]/` (GET / PUT / DELETE) — consulte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                 |
| `app/api/` (não v1)                                                          | Rotas de gerenciamento/administração (~60 diretórios: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools etc.)                                                                                                                                   |
| `app/api/tools/agent-bridge/`                                                | API REST do AgentBridge — 12 rotas (controle do servidor, estado/DNS/mapeamentos do agente, bypass, certificado, CA upstream). LOCAL_ONLY + SPAWN_CAPABLE. Consulte `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                     |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS do Traffic Inspector — mais de 16 rotas (solicitações, sessões, hosts, modos de captura, exportação, ws). LOCAL_ONLY + SPAWN_CAPABLE. Consulte `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                      |
| `app/a2a/`                                                                   | Ponto de entrada A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                              |
| `app/.well-known/agent.json/`                                                | Cartão de Agente A2A (descoberta)                                                                                                                                                                                                                                                                                            |
| `app/(dashboard)/dashboard/`                                                 | Páginas da interface do painel (mais de 50 seções, ~118 arquivos page.tsx: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity etc.)                                                                                                                          |
| `app/(dashboard)/dashboard/search-tools/`                                    | Interface do Search Tools Studio (3 abas: Pesquisa/Extração/Comparação + SearchConceptCard + ProviderCatalog) — consulte `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                            |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plano 21): `page.tsx` (estrutura com 3 abas), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Página do AgentBridge no painel — cartão do servidor, 9 cartões de agentes, assistente de configuração, mapeamento de modelos, lista de bypass. i18n PT-BR + EN. Consulte `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                  |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Página do Traffic Inspector no painel — divisão no estilo DevTools, 7 abas de detalhes, 4 opções de modo de captura, gravador de sessões, colorização de contexto. i18n PT-BR + EN. Consulte `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                         |
| `app/(dashboard)/dashboard/activity/`                                        | Página do feed de atividades (Grupo B): `page.tsx` (servidor) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — consulte `docs/architecture/MONITORING_SECTIONS.md`                                                                                                      |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Página de compartilhamento de cotas (Grupo B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                   |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Página de configuração de planos de provedores (Grupo B): `page.tsx` + `ProviderPlanConfigClient.tsx` — substituição das dimensões de cota por conexão                                                                                                                                                                       |
| `app/docs/`                                                                  | Visualizador de documentação incorporado (renderiza `docs/*.md`)                                                                                                                                                                                                                                                             |
| `app/landing/`                                                               | Página inicial de marketing                                                                                                                                                                                                                                                                                                  |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Páginas relacionadas à autenticação                                                                                                                                                                                                                                                                                          |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Páginas de erro HTTP                                                                                                                                                                                                                                                                                                         |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Páginas estáticas/de status                                                                                                                                                                                                                                                                                                  |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Layout raiz, página inicial, manifesto PWA, CSS global                                                                                                                                                                                                                                                                       |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Limites de erro                                                                                                                                                                                                                                                                                                              |

### `src/lib/` — Bibliotecas principais (~50 módulos)

| Módulo                                        | Finalidade                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                        | Gerenciador de tarefas do protocolo A2A, habilidades (5), streaming                                                                                                                                                                                                                                                                            |
| `acp/`                                        | Registro de Agentes CLI (descoberta de CLI local — consulte `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                        |
| `api/`                                        | Utilitários de API compartilhados (`requireManagementAuth`, validação)                                                                                                                                                                                                                                                                         |
| `auth/`                                       | Sessão, hash de senhas, validação de tokens                                                                                                                                                                                                                                                                                                    |
| `batches/`                                    | Manipuladores da API Batches da OpenAI                                                                                                                                                                                                                                                                                                         |
| `catalog/`                                    | Validação Zod do catálogo de provedores + resolução de recursos                                                                                                                                                                                                                                                                                |
| `cloudAgent/`                                 | Agentes em nuvem (Codex Cloud, Devin, Jules) — consulte `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                       |
| `combos/`                                     | Resolução de combos + utilitários de reordenação                                                                                                                                                                                                                                                                                               |
| `audit/`                                      | Utilitários do feed de atividades: `highLevelActions.ts` (lista de permissões + `isHighLevelAction()`), `activityIcons.ts` (mapa de ação → ícone/verbo), `timeline.ts` (groupByDay/relativeTime) — consulte `docs/architecture/MONITORING_SECTIONS.md`                                                                                         |
| `compliance/`                                 | Log de auditoria + auditoria de provedores — consulte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                            |
| `compression/`                                | Integração do mecanismo de compressão (os mecanismos ficam em `open-sse/services/compression/`)                                                                                                                                                                                                                                                |
| `config/`                                     | Utilitários de configuração em tempo de execução                                                                                                                                                                                                                                                                                               |
| `db/`                                         | Mais de 120 módulos de banco de dados por domínio + 168 migrações (sempre passe por aqui para acessar o SQLite)                                                                                                                                                                                                                                |
| `quota/`                                      | Mecanismo de Compartilhamento de Cotas: `dimensions.ts` (tipos/Zod), `types.ts` (interface QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — consulte `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                      | Cliente do catálogo de modelos gratuitos Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — consulte `docs/frameworks/RADAR.md`                                                                                                                                               |
| `display/`                                    | Utilitários de formatação da interface (custo, latência etc.)                                                                                                                                                                                                                                                                                  |
| `embeddings/`                                 | Utilitários do serviço de embeddings                                                                                                                                                                                                                                                                                                           |
| `env/`                                        | Análise e validação de variáveis de ambiente                                                                                                                                                                                                                                                                                                   |
| `evals/`                                      | Framework de avaliação (suítes, executor, ambiente de execução) — consulte `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                          |
| `guardrails/`                                 | Mascarador de PII, proteção contra injeção de prompt, ponte de visão — consulte `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                  |
| `jobs/`                                       | Tarefas em segundo plano (semelhantes ao cron)                                                                                                                                                                                                                                                                                                 |
| `memory/`                                     | Memória conversacional (RRF híbrido com SQLite FTS5 + sqlite-vec e nível 2 com Qdrant) — consulte `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                  |
| `memory/embedding/`                           | Camada de embeddings com múltiplas fontes: `index.ts` (resolvedor), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plano 21)                                                                                                                                                                                  |
| `memory/vectorStore.ts`                       | Wrapper do sqlite-vec v0.1.9 — KNN por força bruta + RRF híbrido (FTS5 + vetor, k=60). Inicialização tardia, com degradação gradual quando o sqlite-vec não está disponível. (plano 21)                                                                                                                                                        |
| `memory/reindex.ts`                           | `runReindexBatch()` — processa em segundo plano as memórias com `needs_reindex=1`; chamado por `POST /api/memory/reindex` e pelo caminho de preenchimento retroativo tardio. (plano 21)                                                                                                                                                        |
| `monitoring/`                                 | Verificações de integridade, emissão de métricas                                                                                                                                                                                                                                                                                               |
| `oauth/`                                      | Fluxos de OAuth/importação para 22 módulos de provedores (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                           |
| `plugins/`                                    | Registro de plugins                                                                                                                                                                                                                                                                                                                            |
| `promptCache/`                                | Pontos de interrupção do cache de prompts no estilo Anthropic                                                                                                                                                                                                                                                                                  |
| `skills/`                                     | Framework de habilidades (integradas + marketplace + SkillsSH) — consulte `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                          |
| `playground/`                                 | Auxiliares compartilhados do Playground Studio: `codeExport.ts` (gerador de curl/Python/TS), `promptImprover.ts` (construtor de metaprompts), `streamMetrics.ts` (TTFT/TPS puro), `types.ts` (tabela de preços) — consulte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                              |
| `webhookDispatcher.ts`                        | Entrega de webhooks com HMAC — consulte `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                          |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`      | Gerenciadores de túneis — consulte `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                                 |
| `cloudSync.ts`, `initCloudSync.ts`            | Sincronização opcional do estado com a nuvem                                                                                                                                                                                                                                                                                                   |
| `localDb.ts`                                  | Módulo de reexportação para os módulos do banco de dados (sem lógica — apenas reexportações)                                                                                                                                                                                                                                                   |
| `cacheLayer.ts`, `idempotencyLayer.ts`        | Cache de solicitações + idempotência                                                                                                                                                                                                                                                                                                           |
| (cerca de mais 30 arquivos de nível superior) | Auxiliares especializados (logEnv, modelsDevSync, piiSanitizer etc.)                                                                                                                                                                                                                                                                           |

### `src/lib/db/` — Banco de dados (122 módulos + 168 migrações)

| Subdiretório              | Finalidade                                                                                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` com registro em log WAL                                                                                                                                |
| `db/migrations/`          | Arquivos SQL versionados (idempotentes, transacionais). `073_memory_vec.sql` adiciona `memory_vec_meta` + coluna `needs_reindex` (plano 21).                                       |
| `db/playgroundPresets.ts` | Módulo CRUD para predefinições do Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD para `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` etc. (plano 21)                       |
| `db/<domain>.ts`          | Um módulo por domínio: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache etc.          |

### `src/domain/`

| Módulo                 | Finalidade                                           |
| ---------------------- | ---------------------------------------------------- |
| `policy.ts`            | Mecanismo de políticas                               |
| `fallbackPolicy.ts`    | Árvore de decisão de fallback                        |
| `costRules.ts`         | Regras de cálculo de custos                          |
| `lockoutPolicy.ts`     | Política de bloqueio de modelo/conexão               |
| `tagRouter.ts`         | Roteamento baseado em tags                           |
| `comboResolver.ts`     | Resolução de combos (usada pelo mecanismo de combos) |
| `modelAvailability.ts` | Verificação de disponibilidade por modelo            |
| `assessment/`          | Avaliação de modelos (Fase 1 da RFC-AUTO-ASSESSMENT) |

### `src/server/`

| Módulo   | Finalidade                                                                                                 |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline de autorização: `classify` → `policies` → `enforce` — consulte `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configuração de CORS                                                                                       |
| `auth/`  | Middleware de sessão                                                                                       |

### `src/shared/`

| Módulo                           | Finalidade                                                                       |
| -------------------------------- | -------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 provedores** com validação Zod (fonte da verdade)                          |
| `constants/cliTools.ts`          | Registro de ferramentas CLI externas                                             |
| `constants/routingStrategies.ts` | **19 estratégias de roteamento** com prioridades                                 |
| `constants/publicApiRoutes.ts`   | Rotas que exigem autenticação Bearer (em vez de autenticação de gerenciamento)   |
| `constants/upstreamHeaders.ts`   | Lista de bloqueio de cabeçalhos para requisições upstream                        |
| `validation/schemas.ts`          | ~80 esquemas Zod (fonte única da verdade para contratos de API)                  |
| `validation/helpers.ts`          | Auxiliares de validação Zod (`validateBody` etc.)                                |
| `types/`                         | Tipos TS compartilhados                                                          |
| `contracts/`                     | Contratos de API pública (consumidos por `files:` em `package.json`)             |
| `utils/circuitBreaker.ts`        | Circuit breaker de provedores (consulte `docs/architecture/RESILIENCE_GUIDE.md`) |
| `utils/apiAuth.ts`               | Validação de chave de API e verificação de escopo                                |
| `utils/fetchTimeout.ts`          | Wrappers de timeout/interrupção para fetch upstream                              |
| `utils/releaseNotes.ts`          | Analisador de anúncios fechados da v2/legado, localização e descarte por ID      |

---

## `open-sse/` — Workspace do mecanismo de streaming

Workspace npm separado (`@omniroute/open-sse`). Processa requisições e executa provedores.

```
open-sse/
├── handlers/            # 16 arquivos (12 handlers + 4 auxiliares): chatCore, responsesHandler, embeddings, audio, imagem, vídeo, música, reclassificação, moderações, pesquisa etc.
├── executors/           # 67 executores específicos de provedores (estendem BaseExecutor)
├── translator/          # Conversores de formato (9 de requisição, 9 de resposta, 9 auxiliares)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # Mais de 80 módulos de serviço (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM etc.)
├── mcp-server/          # Servidor MCP (110 ferramentas, 3 transportes, 33 escopos)
├── config/              # Registros de provedores/modelos, configuração de cabeçalhos, aliases de modelos
├── utils/               # Cliente TLS, fetch/dispatcher de proxy, auxiliares de rede
├── index.ts             # Ponto de entrada do workspace
├── package.json         # Manifesto do workspace
├── tsconfig.json        # Configuração TS do workspace
└── types.d.ts           # Declarações de tipos do workspace
```

### `open-sse/mcp-server/`

| Caminho                     | Finalidade                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `server.ts`                 | Ciclo de vida do servidor MCP (transportes stdio + HTTP)                                   |
| `httpTransport.ts`          | Transportes HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                      |
| `audit.ts`                  | Registro de auditoria na tabela `mcp_tool_audit`                                           |
| `scopeEnforcement.ts`       | Validação de escopo por ferramenta                                                         |
| `runtimeHeartbeat.ts`       | Sinal de integridade em `DATA_DIR/runtime/mcp-heartbeat.json`                              |
| `descriptionCompressor.ts`  | Compacta os metadados de descrição das ferramentas para economizar contexto                |
| `schemas/tools.ts`          | 36 definições de ferramentas básicas + escopos                                             |
| `tools/advancedTools.ts`    | Implementações de ferramentas avançadas                                                    |
| `tools/memoryTools.ts`      | 3 ferramentas de memória (pesquisar/adicionar/limpar)                                      |
| `tools/skillTools.ts`       | 4 ferramentas de habilidades (listar/habilitar/executar/execuções)                         |
| `tools/compressionTools.ts` | 5 ferramentas de compactação                                                               |
| `README.md`                 | README interno do servidor MCP (com referência cruzada em `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Wrapper para desktop

| Arquivo          | Finalidade                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `main.js`        | Processo principal do Electron (BrowserWindow, servidor Next.js integrado, bandeja, atualização automática) |
| `preload.js`     | Ponte IPC (contextBridge → `window.omniroute`)                                                              |
| `package.json`   | Configuração do electron-builder + dependências Electron 41 + electron-builder 26.10                        |
| `assets/`        | Ícones do aplicativo (Windows .ico, macOS .icns, Linux .png)                                                |
| `dist-electron/` | Saída da compilação (ignorada pelo git)                                                                     |
| `types.d.ts`     | Declarações de tipos para a ponte do renderer                                                               |
| `README.md`      | README interno do Electron (consulte também `docs/guides/ELECTRON_GUIDE.md`)                                |

---

## `bin/` — CLI

| Arquivo                                                                                                     | Finalidade                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Ponto de entrada principal da CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` etc. |
| `reset-password.mjs`                                                                                        | CLI independente para redefinição de senha                                                                                                   |
| `cli/commands/setup.mjs`                                                                                    | Assistente de configuração interativo e não interativo                                                                                       |
| `cli/commands/doctor.mjs`                                                                                   | Diagnósticos de integridade do sistema (mais de 8 verificações)                                                                              |
| `cli/commands/providers.mjs`                                                                                | Listagem/teste/validação de provedores                                                                                                       |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Módulos auxiliares da CLI                                                                                                                    |
| `cli/tray/tray.ts`                                                                                          | Integração com a bandeja do sistema (multiplataforma: NotifyIcon no Windows, systray2 no macOS/Linux)                                        |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell com NotifyIcon (Windows, sem novos binários)                                                                              |
| `cli/tray/autostart.ts`                                                                                     | Inicialização automática multiplataforma (LaunchAgent / .desktop / registro)                                                                 |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Cadeia de resolução do driver SQLite em 5 etapas (incluído → runtime → instalação sob demanda → node:sqlite → sql.js)                        |
| `cli/runtime/magicBytes.mjs`                                                                                | Validação dos bytes mágicos de arquivos binários (ELF / Mach-O / Mach-O fat / PE)                                                            |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — pré-resolve drivers durante a pós-instalação / primeira inicialização                                                   |
| `nodeRuntimeSupport.mjs`                                                                                    | Valida a versão compatível do Node.js durante a instalação                                                                                   |

---

## `skills/` — Habilidades públicas de agentes

| Arquivo                      | Finalidade                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestos de habilidades para agentes de IA externos (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Scripts de build e verificação

| Script                              | Finalidade                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Executor de desenvolvimento/inicialização com carregamento de variáveis de ambiente                          |
| `build-next-isolated.mjs`           | Build independente (modo standalone do Next.js 16)                                                           |
| `prepublish.ts`                     | Preparação do pacote antes de `npm pack`                                                                     |
| `postinstall.mjs`                   | Cria automaticamente o `.env` a partir de `.env.example` na primeira instalação                              |
| `sync-env.mjs`                      | Ressincroniza as chaves do `.env` com o `.env.example`                                                       |
| `check-cycles.mjs`                  | Detecta dependências circulares                                                                              |
| `check-route-validation.mjs`        | Valida se todas as rotas da API têm validação Zod                                                            |
| `check-t11-any-budget.mjs`          | Impõe um limite explícito de `any` por arquivo                                                               |
| `check-docs-sync.mjs`               | Valida a sincronização de versões da documentação (pre-commit existente)                                     |
| **`check-env-doc-sync.mjs`**        | NOVO: faz a verificação cruzada das variáveis de ambiente no código, no `.env.example` e no `ENVIRONMENT.md` |
| **`check-docs-counts-sync.mjs`**    | NOVO: valida se as contagens (executores, estratégias, OAuth e habilidades A2A) correspondem à documentação  |
| **`check-deprecated-versions.mjs`** | NOVO: sinaliza versões/datas desatualizadas na documentação                                                  |
| `check-supported-node-runtime.ts`   | Valida se a versão atual do Node é compatível                                                                |
| `check-pr-test-policy.mjs`          | Impõe a regra de "testes obrigatórios" para alterações no código de produção                                 |
| **`gen-provider-reference.ts`**     | NOVO: gera automaticamente `docs/reference/PROVIDER_REFERENCE.md` a partir do catálogo                       |
| `i18n/generate-multilang.mjs`       | Traduz strings da interface e documentação via Google Translate                                              |
| `i18n_autotranslate.py`             | Pipeline de tradução de documentação baseado em LLM                                                          |
| `validate_translation.py`           | Validação da tradução por localidade                                                                         |
| `check_translations.py`             | Verificação de chaves de i18n no código                                                                      |
| `run-playwright-tests.mjs`          | Executor de testes E2E do Playwright                                                                         |
| `run-protocol-clients-tests.mjs`    | Executor de testes E2E de MCP/A2A                                                                            |
| `run-ecosystem-tests.mjs`           | Testes do ecossistema (integração com provedores)                                                            |
| `test-report-summary.mjs`           | Gera um resumo de cobertura em markdown                                                                      |
| `smoke-electron-packaged.mjs`       | Executa teste de fumaça do build empacotado do Electron                                                      |
| `native-binary-compat.mjs`          | Valida se as dependências nativas (`better-sqlite3`) correspondem ao Node do Electron                        |
| `validate-pack-artifact.ts`         | Valida a saída do empacotamento npm                                                                          |
| `responses-ws-proxy.mjs`            | Ponte WebSocket para a API Codex Responses                                                                   |
| `v1-ws-bridge.mjs`                  | Ponte WebSocket para o endpoint `/api/v1/ws`                                                                 |
| `standalone-server-ws.mjs`          | Executor de servidor WS independente                                                                         |
| `system-info.mjs`                   | Exibe informações do sistema/ambiente de execução para suporte                                               |
| `healthcheck.mjs`                   | Verificação de integridade de execução única (usada pelo HEALTHCHECK do Docker)                              |
| `uninstall.mjs`                     | Script de desinstalação limpa                                                                                |

---

## `docs/` — Documentação pública (7 arquivos raiz + 17 subdiretórios)

### Guias principais

| Documento                   | Finalidade                                                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arquitetura de alto nível, mapa de subsistemas, interface do painel                                 |
| `CODEBASE_DOCUMENTATION.md` | Referência de engenharia: diretórios, módulos, convenções                                           |
| `FEATURES.md`               | Matriz de recursos com destaques da v3.8                                                            |
| `USER_GUIDE.md`             | Manual do usuário final (configuração, modelos, combos, CLIs, áudio etc.)                           |
| `API_REFERENCE.md`          | Referência dos endpoints da API com modelo de autenticação                                          |
| `openapi.yaml`              | Especificação OpenAPI 3.0 (121 caminhos)                                                            |
| `SETUP_GUIDE.md`            | Métodos de instalação (npm, npx, Docker, Electron, Termux, código-fonte)                            |
| `ENVIRONMENT.md`            | Todas as variáveis de ambiente (~800 documentadas, ~3.050 linhas em `.env.example`)                 |
| `TROUBLESHOOTING.md`        | Erros comuns + problemas conhecidos da v3.8.0                                                       |
| `RELEASE_CHECKLIST.md`      | Fluxo completo de lançamento (skills, husky, commits convencionais, implantação)                    |
| `COVERAGE_PLAN.md`          | Metas de cobertura e estado atual                                                                   |
| `FREE_TIERS.md`             | Provedores selecionados com planos gratuitos (48+ gratuitos + 11 OAuth)                             |
| `CLI-TOOLS.md`              | Integrações com CLIs externas + CLI interna do OmniRoute                                            |
| `I18N.md`                   | Arquitetura de i18n, adição de idiomas, 42 localidades                                              |
| `UNINSTALL.md`              | Etapas para desinstalação completa                                                                  |
| `PROVIDER_REFERENCE.md`     | Catálogo **gerado automaticamente** de 355 provedores (regenerar: `npm run gen:provider-reference`) |

### Análises detalhadas dos subsistemas

| Documento                                         | Finalidade                                                                                      |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                   | Servidor MCP: 110 ferramentas, 3 transportes, 33 escopos, endpoints REST                        |
| `A2A-SERVER.md`                                   | A2A v0.3: JSON-RPC, 6 skills, auxiliares REST, cartão do agente                                 |
| `AGENT_PROTOCOLS_GUIDE.md`                        | Guia unificado: A2A vs ACP vs agentes de nuvem                                                  |
| `CLOUD_AGENT.md`                                  | Orquestração do Codex Cloud / Devin / Jules                                                     |
| `SKILLS.md`                                       | Framework de skills (integradas + marketplace + SkillsSH + sandbox)                             |
| `RADAR.md`                                        | Sobreposição do catálogo de modelos gratuitos do Radar (`RADAR_ENABLED`, desativada por padrão) |
| `MEMORY.md`                                       | Sistema de memória (SQLite FTS5 + Qdrant)                                                       |
| `EVALS.md`                                        | Framework de avaliações (suítes, execuções, rubricas)                                           |
| `GUARDRAILS.md`                                   | Mascarador de PII, injeção de prompt, ponte de visão                                            |
| `COMPLIANCE.md`                                   | Log de auditoria, retenção, opção de exclusão noLog                                             |
| `WEBHOOKS.md`                                     | Entrega de webhooks assinados com HMAC                                                          |
| `REASONING_REPLAY.md`                             | Cache híbrido de memória/SQLite para `reasoning_content`                                        |
| `AUTHZ_GUIDE.md`                                  | Pipeline de autorização (`classify` → `policies` → `enforce`)                                   |
| `RESILIENCE_GUIDE.md`                             | Disjuntor + período de espera + bloqueio de modelo                                              |
| `docs/security/STEALTH_GUIDE.md` (somente no git) | Impressão digital TLS (JA3/JA4), Claude Code CCH, certificado MITM                              |
| `AUTO-COMBO.md`                                   | Mecanismo Auto Combo (pontuação de 16 fatores, 6 pacotes de modos, fábrica virtual)             |

### Compactação

| Documento                       | Finalidade                                     |
| ------------------------------- | ---------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Visão geral dos modos de compactação + roteiro |
| `COMPRESSION_ENGINES.md`        | Mecanismos Caveman + RTK, contrato do registro |
| `COMPRESSION_RULES_FORMAT.md`   | Esquema JSON do pacote de regras do Caveman    |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventário de pacotes de regras por idioma     |
| `RTK_COMPRESSION.md`            | Pipeline declarativo do RTK (49 filtros)       |

### Implantação

| Documento                    | Finalidade                                                         |
| ---------------------------- | ------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Build do Docker, perfis (base/cli/host/cliproxyapi), sidecar Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Implantação genérica em VM/VPS (Ubuntu/Debian + nginx + systemd)   |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Implantação no Fly.io (atualmente disponível somente em chinês)    |
| `TERMUX_GUIDE.md`            | Android sem interface gráfica via Termux                           |
| `PWA_GUIDE.md`               | Instalação do Progressive Web App + service worker                 |
| `ELECTRON_GUIDE.md`          | Build + assinatura + distribuição do aplicativo para desktop       |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                             |
| `PROXY_GUIDE.md`             | Proxy de saída em 4 níveis + marketplace 1proxy                    |

### Subdiretórios

| Subdiretório          | Finalidade                                                                                                                                                                                                                               |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Traduções localizadas da documentação (41 localidades)                                                                                                                                                                                   |
| `docs/screenshots/`   | Recursos de imagem para guias                                                                                                                                                                                                            |
| `_tasks/superpowers/` | Planos/especificações do superpowers (`writing-plans`/`brainstorming`) + pesquisas — repositório isolado, versionado separadamente e ignorado pelo Git na árvore principal. Consulte CLAUDE.md → "Artefatos de Planejamento e Pesquisa". |

---

## `tests/` — Suítes de testes

| Subdiretório                         | Tipo                                             | Executor                                           |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------- |
| `tests/unit/`                        | Testes unitários (~4.800 arquivos, mais rápidos) | Executor de testes nativo do Node                  |
| `tests/integration/`                 | Testes de integração de múltiplos módulos + BD   | Executor de testes nativo do Node (concorrência 1) |
| `tests/e2e/`                         | E2E de interface + fluxo de trabalho             | Playwright                                         |
| `tests/e2e/protocol-clients.test.ts` | E2E de cliente real MCP + A2A                    | Clientes de protocolo personalizados               |
| `tests/e2e/ecosystem.test.ts`        | Integração de provedores (acessa a rede)         | Executor de testes nativo do Node                  |

---

## `public/` — Recursos estáticos

| Caminho             | Finalidade                                                            |
| ------------------- | --------------------------------------------------------------------- |
| `public/` (raiz)    | Favicons, robots.txt, manifesto, service worker, imagens de marketing |
| `public/providers/` | Logotipos PNG/SVG dos provedores (usados no painel)                   |

---

## `config/` — Configurações estáticas + estado dos critérios de qualidade

Modelos de configuração distribuídos, além das linhas de base de critérios de qualidade versionadas
(movidos da raiz do repositório na v3.8.26 para mantê-la enxuta).

| Caminho                                       | Finalidade                                                                                    |
| --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista de localidades + metadados (fonte canônica para a contagem de 42 localidades)           |
| `config/i18n-schema.json`                     | Esquema JSON que valida `i18n.json`                                                           |
| `config/payloadRules.json`                    | Regras de sanitização de payloads upstream                                                    |
| `config/quality/quality-baseline.json`        | Linha de base incremental de múltiplas métricas (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Linha de base fixa de complexidade do ESLint (`check-complexity.mjs`)                         |
| `config/quality/duplication-baseline.json`    | Linha de base fixa de duplicação do jscpd (`check-duplication.mjs`)                           |
| `config/quality/file-size-baseline.json`      | Linha de base fixa de tamanho por arquivo (`check-file-size.mjs`)                             |
| `config/quality/test-discovery-baseline.json` | Linha de base fixa de testes órfãos (`check-test-discovery.mjs`)                              |
| `config/quality/dependency-allowlist.json`    | Lista de permissões de dependências aprovadas (`check-deps.mjs`)                              |
| `config/quality/.license-allowlist.json`      | Lista de permissões de licenças SPDX (`check-licenses.mjs`)                                   |
| `config/quality/quality-metrics.json`         | Métricas coletadas efêmeras (geradas por `collect-metrics.mjs`; **ignoradas pelo git**)       |

---

## `.github/` — Integração com o GitHub

| Caminho                            | Finalidade                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| `.github/workflows/`               | Fluxos de trabalho de CI/CD do GitHub Actions (lint, testes, cobertura, release) |
| `.github/ISSUE_TEMPLATE/`          | Modelos de issues para bugs/funcionalidades                                      |
| `.github/pull_request_template.md` | Modelo de PR                                                                     |
| `.github/dependabot.yml`           | Configuração de atualização de dependências                                      |

---

## `.husky/` — Hooks do Git

| Arquivo      | Finalidade                                                                    |
| ------------ | ----------------------------------------------------------------------------- |
| `pre-commit` | Executa `lint-staged + check-docs-sync + check:any-budget:t11`                |
| `pre-push`   | Atualmente desabilitado (comentado). Execute `npm run test:unit` manualmente. |
| `_/`         | Componentes internos do Husky                                                 |

---

## `.claude/` — Comandos de Barra do Claude Code

| Arquivo                                             | Finalidade                                                      |
| --------------------------------------------------- | --------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incrementa a versão + changelog automático |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — fluxo de trabalho completo de release  |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Faz deploy em VPS                                               |
| `commands/capture-release-evidences-cc.md`          | Grava no navegador novos recursos em formato WebP               |
| `commands/review-{prs,discussions}-cc.md`           | Faz a triagem de PRs/discussões do GitHub                       |
| `commands/{review-issues,implement-features}-cc.md` | Fluxos de trabalho de issues                                    |
| `settings.local.json`                               | Configurações do Claude Code específicas do projeto             |

---

## `.agents/` — Fluxos de Trabalho Genéricos para Agentes (Codex / Cursor / etc.)

| Caminho                  | Finalidade                                                           |
| ------------------------ | -------------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definições de fluxos de trabalho (espelho de `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definições de habilidades com notas de execução do Codex           |

> **Observação:** No momento, os fluxos de trabalho e os comandos são idênticos byte a byte. Se `.agents/` tiver como objetivo um runtime de agente diferente (Codex), as variantes precisam divergir de forma significativa.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Fora da Árvore

Estes diretórios prefixados com sublinhado armazenam conteúdo que não faz parte da distribuição:

- **`_ideia/`** — notas de design (categorias defer / notfit / viable)
- **`_mono_repo/`** — subprojetos históricos (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — clones somente leitura de projetos OSS relacionados (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api etc.) para referência cruzada durante o desenvolvimento
- **`_tasks/`** — arquivos de acompanhamento de tarefas por release (informais)

Não incluídos na saída de `npm pack`. Consulte `.npmignore`.

---

## Gerados / Ignorados pelo Git

| Caminho                | Finalidade                           |
| ---------------------- | ------------------------------------ |
| `node_modules/`        | Dependências do npm                  |
| `.next/`               | Saída de build do Next.js            |
| `coverage/`            | Relatórios de cobertura do c8        |
| `logs/`                | Logs de execução                     |
| `package/`             | Área de preparação do npm pack       |
| `.playwright-mcp/`     | Artefatos de teste do Playwright MCP |
| `.issues/`             | Cache local de issues                |
| `tsconfig.tsbuildinfo` | Cache incremental do TS              |

---

## Dicas de navegação

- **Novo colaborador?** Leia `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Adicionando um provedor?** Siga `docs/architecture/ARCHITECTURE.md § Adding a New Provider` e confira também `docs/reference/PROVIDER_REFERENCE.md`.
- **Adicionando uma rota?** Consulte `docs/architecture/ARCHITECTURE.md § Adding a New API Route` e `src/shared/validation/schemas.ts`.
- **Adicionando uma ferramenta MCP?** Consulte `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Adicionando uma habilidade A2A?** Consulte `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Executando localmente?** Consulte `docs/guides/SETUP_GUIDE.md`.
- **Fazendo a implantação?** Consulte `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Preparando uma versão?** Consulte `docs/ops/RELEASE_CHECKLIST.md` (e a habilidade `/generate-release-cc` do Claude Code).
