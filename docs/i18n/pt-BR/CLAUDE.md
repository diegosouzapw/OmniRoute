# CLAUDE.md (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Este arquivo fornece orientações para Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Início Rápido

```bash
npm install                    # Instalar dependências (gera automaticamente .env a partir de .env.example)
npm run dev                    # Servidor de desenvolvimento em http://localhost:20128
npm run build                  # Build de produção (Next.js 16 standalone)
npm run lint                   # ESLint (0 erros esperados; avisos são pré-existentes)
npm run typecheck:core         # Verificação TypeScript (deve estar limpa)
npm run typecheck:noimplicit:core  # Verificação rigorosa (sem any implícito)
npm run test:coverage          # Testes unitários + gate de cobertura (75/75/75/70 — declarações/líneas/funções/branches)
npm run check                  # lint + teste combinados
npm run check:cycles           # Detectar dependências circulares
```

### Executando Testes

```bash
# Arquivo de teste único (executador de teste nativo do Node.js — a maioria dos testes)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (servidor MCP, autoCombo, cache)
npm run test:vitest

# Todos os conjuntos
npm run test:all
```

Para a matriz completa de testes, veja `CONTRIBUTING.md` → "Executando Testes". Para arquitetura profunda, veja `AGENTS.md`.

---

## Projeto em Resumo

**OmniRoute** — proxy/router de IA unificado. Um endpoint, 160+ provedores de LLM, fallback automático.

| Camada           | Localização             | Propósito                                                                        |
| ---------------- | ----------------------- | -------------------------------------------------------------------------------- |
| Rotas da API     | `src/app/api/v1/`       | Next.js App Router — pontos de entrada                                           |
| Manipuladores    | `open-sse/handlers/`    | Processamento de requisições (chat, embeddings, etc)                             |
| Executores       | `open-sse/executors/`   | Dispatch HTTP específico do provedor                                             |
| Tradutores       | `open-sse/translator/`  | Conversão de formato (OpenAI↔Claude↔Gemini)                                      |
| Transformador    | `open-sse/transformer/` | API de Respostas ↔ Completações de Chat                                          |
| Serviços         | `open-sse/services/`    | Roteamento combinado, limites de taxa, cache, etc                                |
| Banco de Dados   | `src/lib/db/`           | Módulos de domínio SQLite (45+ arquivos, 55 migrações)                           |
| Domínio/Política | `src/domain/`           | Motor de políticas, regras de custo, lógica de fallback                          |
| Servidor MCP     | `open-sse/mcp-server/`  | 37 ferramentas (30 base + 3 memória + 4 habilidades), 3 transportes, ~13 escopos |
| Servidor A2A     | `src/lib/a2a/`          | Protocolo de agente JSON-RPC 2.0                                                 |
| Habilidades      | `src/lib/skills/`       | Estrutura de habilidades extensível                                              |
| Memória          | `src/lib/memory/`       | Memória conversacional persistente                                               |

Monorepo: `src/` (aplicativo Next.js 16), `open-sse/` (workspace do motor de streaming), `electron/` (aplicativo desktop), `tests/`, `bin/` (ponto de entrada CLI).

---

## Pipeline de Solicitação

```
Cliente → /v1/chat/completions (rota Next.js)
  → CORS → validação Zod → auth? → verificação de política → proteção contra injeção de prompt
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → verificação de cache → limite de taxa → roteamento combinado?
      → resolveComboTargets() → handleSingleModel() por alvo
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → tradução de resposta → stream SSE ou JSON
    → Se Responses API: responsesTransformer.ts TransformStream
```

As rotas da API seguem um padrão consistente: `Rota → pré-vôo CORS → validação de corpo Zod → Autenticação opcional (extractApiKey/isValidApiKey) → aplicação de política de chave da API → delegação de manipulador (open-sse)`. Sem middleware global do Next.js — a interceptação é específica da rota.

**Roteamento combinado** (`open-sse/services/combo.ts`): 14 estratégias (prioridade, ponderado, preencher-primeiro, round-robin, P2C, aleatório, menos-usado, otimizado por custo, ciente de reset, aleatório-rígido, automático, lkgp, otimizado por contexto, retransmissão de contexto). Cada alvo chama `handleSingleModel()`, que envolve `handleChatCore()` com tratamento de erro por alvo e verificações de disjuntor. Veja `docs/routing/AUTO-COMBO.md` para a pontuação Auto-Combo de 9 fatores e `docs/architecture/RESILIENCE_GUIDE.md` para as 3 camadas de resiliência.

---

## Estado de Execução de Resiliência

OmniRoute possui três mecanismos de falha temporária relacionados, mas distintos. Mantenha seu
escopo separado ao depurar o comportamento de roteamento. Veja o
[diagrama de resiliência de 3 camadas](./docs/diagrams/exported/resilience-3layers.svg)
(fonte: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
para um mapa rápido.

### Disjuntor do Provedor

**Escopo**: provedor inteiro, por exemplo, `glm`, `openai`, `anthropic`.

**Propósito**: parar de enviar tráfego para um provedor que está falhando repetidamente no
nível upstream/serviço, para que um provedor não saudável não atrase cada solicitação.

**Implementação**:

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Fiação de porta/executação de chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de status em tempo de execução: `src/app/api/monitoring/health/route.ts`
- Wrappers compartilhados: `open-sse/services/accountFallback.ts`
- Tabela de estado persistido: `domain_circuit_breakers`

**Estados**:

- `CLOSED`: tráfego normal é permitido.
- `OPEN`: provedor está temporariamente bloqueado; chamadores recebem uma resposta de circuito-aberto do provedor
  ou o roteamento combinado pula para outro alvo.
- `HALF_OPEN`: o tempo limite de reset expirou; permite uma solicitação de teste. Sucesso fecha o
  disjuntor, falha o abre novamente.

**Padrões** (`open-sse/config/constants.ts`):

- Provedores OAuth: limite `3`, tempo limite de reset `60s`.
- Provedores de chave da API: limite `5`, tempo limite de reset `30s`.
- Provedores locais: limite `2`, tempo limite de reset `15s`.

Somente estados de falha em nível de provedor devem acionar o disjuntor do provedor:

```ts
(408, 500, 502, 503, 504);
```

Não acione o disjuntor do provedor inteiro para erros normais de conta/chave/modelo como a maioria
dos casos `401`, `403` ou `429`. Esses geralmente pertencem ao cooldown de conexão ou bloqueio de modelo. Um provedor de chave da API genérico `403` deve ser recuperável, a menos que seja classificado
como um erro terminal de provedor/conta.

O disjuntor usa recuperação preguiçosa, não um temporizador em segundo plano. Quando `OPEN` expira, leituras como
`getStatus()`, `canExecute()`, e `getRetryAfterMs()` atualizam o estado para
`HALF_OPEN`, para que painéis e construtores de candidatos combinados não continuem excluindo um
provedor expirado para sempre.

### Cooldown de Conexão

**Escopo**: uma conexão de provedor/conta/chave.

**Propósito**: pular temporariamente uma chave/conta ruim enquanto permite que outras conexões para
o mesmo provedor continuem atendendo solicitações.

**Implementação**:

- Caminho de gravação/atualização: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção/filtragem de conta: `src/sse/services/auth.ts::getProviderCredentials...`
- Cálculo de cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configurações: `src/lib/resilience/settings.ts`

Campos importantes nas conexões do provedor:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante a seleção de conta, uma conexão é pulada enquanto:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowns também são preguiçosos: quando `rateLimitedUntil` está no passado, a conexão se torna
elegível novamente. Ao usar com sucesso, `clearAccountError()` limpa `testStatus`,
`rateLimitedUntil`, campos de erro e `backoffLevel`.

Comportamento padrão de cooldown de conexão:

- Cooldown base de OAuth: `5s`.
- Cooldown base de chave da API: `3s`.
- Chave da API `429` deve preferir dicas de retry upstream (`Retry-After`, cabeçalhos de reset, ou
  texto de reset analisável) quando disponíveis.
- Falhas recuperáveis repetidas usam backoff exponencial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

O guardião anti-thundering-herd impede que falhas concorrentes na mesma conexão
estendam repetidamente o cooldown ou dobrem o incremento de `backoffLevel`.

Estados terminais não são cooldowns. `banned`, `expired`, e `credits_exhausted` são
destinados a permanecer indisponíveis até que credenciais/configurações mudem ou um operador os redefina.
Não sobrescreva estados terminais com estado de cooldown transitório.

### Bloqueio de Modelo

**Escopo**: provedor + conexão + modelo.

**Propósito**: evitar desabilitar uma conexão inteira quando apenas um modelo está indisponível ou
limitado por cota para essa conexão.

Exemplos:

- Provedores de cota por modelo retornando `429`.
- Provedores locais retornando `404` para um modelo ausente.
- Falhas de permissão de modo/modelo específicas do provedor, como modos Grok selecionados.

O bloqueio de modelo vive em `open-sse/services/accountFallback.ts` e permite que a mesma
conexão continue atendendo outros modelos.

### Orientações para Depuração

- Se todas as chaves para um provedor forem puladas, inspecione tanto o estado do disjuntor do provedor quanto
  `rateLimitedUntil`/`testStatus` de cada conexão.
- Se um provedor parecer permanentemente excluído após a janela de reset, verifique se o código
  está lendo o `state` bruto em vez de usar `getStatus()`/`canExecute()`.
- Se uma chave de provedor falhar, mas outras devem funcionar, prefira o cooldown de conexão em vez
  do disjuntor do provedor.
- Se apenas um modelo falhar, prefira o bloqueio de modelo em vez do cooldown de conexão.
- Se um estado deve se recuperar automaticamente, ele deve ter um timestamp futuro/tempo limite de reset e um
  caminho de leitura que atualiza o estado expirado. Status permanentes requerem mudanças manuais de credenciais
  ou configuração.

## Convenções Chave

### Estilo de Código

- **2 espaços**, ponto e vírgula, aspas duplas, largura de 100 caracteres, vírgulas finais ES5 (aplicadas pelo lint-staged via Prettier)
- **Imports**: externo → interno (`@/`, `@omniroute/open-sse`) → relativo
- **Nomenclatura**: arquivos=camelCase/kebab, componentes=PascalCase, constantes=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = erro em todo lugar; `no-explicit-any` = aviso em `open-sse/` e `tests/`
- **TypeScript**: `strict: false`, alvo ES2022, módulo esnext, resolução bundler. Preferir tipos explícitos.

### Banco de Dados

- **Sempre** passe pelos módulos de domínio em `src/lib/db/` — **nunca** escreva SQL bruto em rotas ou manipuladores
- **Nunca** adicione lógica em `src/lib/localDb.ts` (apenas camada de re-exportação)
- **Nunca** faça importação em barril de `localDb.ts` — importe módulos específicos de `db/` em vez disso
- Singleton de DB: `getDbInstance()` de `src/lib/db/core.ts` (journaling WAL)
- Migrações: `src/lib/db/migrations/` — arquivos SQL versionados, idempotentes, executados em transações

### Tratamento de Erros

- try/catch com tipos de erro específicos, registre com contexto pino
- Nunca oculte erros em streams SSE — use sinais de abortar para limpeza
- Retorne códigos de status HTTP apropriados (4xx/5xx)

### Segurança

- **Nunca** use `eval()`, `new Function()`, ou eval implícito
- Valide todas as entradas com esquemas Zod
- Criptografe credenciais em repouso (AES-256-GCM)
- Lista de negação de cabeçalhos upstream: `src/shared/constants/upstreamHeaders.ts` — mantenha saneamento, esquemas Zod e testes unitários alinhados ao editar
- **Credenciais públicas upstream** (client_id/secret do OAuth estilo Gemini/Antigravity/Windsurf + chaves Web do Firebase extraídas de CLIs públicas): **DEVEM** ser incorporadas via `resolvePublicCred()` de `open-sse/utils/publicCreds.ts` — **nunca** como literais de string. Veja `docs/security/PUBLIC_CREDS.md` para o padrão obrigatório.
- **Respostas de erro** (HTTP / SSE / executor / manipulador MCP): **DEVEM** passar por `buildErrorBody()` ou `sanitizeErrorMessage()` de `open-sse/utils/error.ts` — **nunca** coloque `err.stack` ou `err.message` brutos no corpo da resposta. Veja `docs/security/ERROR_SANITIZATION.md`.
- **Comandos de shell construídos a partir de variáveis**: ao chamar `exec()`/`spawn()` com um script que precisa de valores em tempo de execução, passe-os via a opção `env` (automaticamente escapado para shell) — **nunca** interpolar strings de caminhos não confiáveis/externos no corpo do script. Referência: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Bibliotecas seguras por padrão** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): prefira Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink em vez de implementações personalizadas sempre que adicionar novas superfícies sensíveis à segurança.

---

## Cenários Comuns de Modificação

### Adicionando um Novo Provedor

1. Registre em `src/shared/constants/providers.ts` (validado por Zod ao carregar)
2. Adicione executor em `open-sse/executors/` se lógica personalizada for necessária (estenda `BaseExecutor`)
3. Adicione tradutor em `open-sse/translator/` se formato não for OpenAI
4. Adicione configuração OAuth em `src/lib/oauth/constants/oauth.ts` se baseado em OAuth — se o CLI upstream enviar um client_id/secret público, incorpore via `resolvePublicCred()` (veja `docs/security/PUBLIC_CREDS.md`), **nunca** como um literal
5. Registre modelos em `open-sse/config/providerRegistry.ts`
6. Escreva testes em `tests/unit/` (inclua a asserção de forma publicCreds se você adicionou um novo padrão incorporado)

### Adicionando uma Nova Rota de API

1. Crie um diretório em `src/app/api/v1/sua-rota/`
2. Crie `route.ts` com manipuladores `GET`/`POST`
3. Siga o padrão: CORS → validação do corpo Zod → autenticação opcional → delegação de manipulador
4. O manipulador vai em `open-sse/handlers/` (importe de lá, não inline)
5. Respostas de erro usam `buildErrorBody()` / `errorResponse()` de `open-sse/utils/error.ts` (auto-sanitizado — nunca coloque `err.stack` ou `err.message` brutos no corpo). Veja `docs/security/ERROR_SANITIZATION.md`.
6. Adicione testes — incluindo pelo menos uma asserção de que as respostas de erro não vazam rastros de pilha (`!body.error.message.includes("at /")`)

### Adicionando um Novo Módulo de DB

1. Crie `src/lib/db/seuModulo.ts` — importe `getDbInstance` de `./core.ts`
2. Exporte funções CRUD para sua(s) tabela(s) de domínio
3. Adicione migração em `src/lib/db/migrations/` se novas tabelas forem necessárias
4. Re-exporte de `src/lib/localDb.ts` (adicione à lista de re-exportação apenas)
5. Escreva testes

### Adicionando uma Nova Ferramenta MCP

1. Adicione definição da ferramenta em `open-sse/mcp-server/tools/` com esquema de entrada Zod + manipulador assíncrono
2. Registre no conjunto de ferramentas (conectado por `createMcpServer()`)
3. Atribua aos escopos apropriados
4. Escreva testes (invocação da ferramenta registrada na tabela `mcp_audit`)

### Adicionando uma Nova Habilidade A2A

1. Crie habilidade em `src/lib/a2a/skills/` (5 já existem: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. A habilidade recebe contexto da tarefa (mensagens, metadados) → retorna resultado estruturado
3. Registre em `A2A_SKILL_HANDLERS` em `src/lib/a2a/taskExecution.ts`
4. Exponha em `src/app/.well-known/agent.json/route.ts` (Cartão do Agente)
5. Escreva testes em `tests/unit/`
6. Documente na tabela de habilidades em `docs/frameworks/A2A-SERVER.md`

### Adicionando um Novo Agente de Nuvem

1. Crie classe de agente em `src/lib/cloudAgent/agents/` estendendo `CloudAgentBase` (3 já existem: codex-cloud, devin, jules)
2. Implemente `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registre em `src/lib/cloudAgent/registry.ts`
4. Adicione manipulação de OAuth/credenciais se necessário (`src/lib/oauth/providers/`)
5. Testes + documente em `docs/frameworks/CLOUD_AGENT.md`

### Adicionando um Novo Guardrail / Eval / Skill / Evento de Webhook

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Conjunto de Eval: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Skill (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Evento de Webhook: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

## Documentação de Referência

Para qualquer alteração não trivial, leia primeiro a análise correspondente:

| Área                                                | Documento                                                         |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| Navegação no repositório                            | `docs/architecture/REPOSITORY_MAP.md`                             |
| Arquitetura                                         | `docs/architecture/ARCHITECTURE.md`                               |
| Referência de engenharia                            | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (pontuação de 9 fatores, 14 estratégias) | `docs/routing/AUTO-COMBO.md`                                      |
| Resiliência (3 mecanismos)                          | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Repetição de raciocínio                             | `docs/routing/REASONING_REPLAY.md`                                |
| Estrutura de habilidades                            | `docs/frameworks/SKILLS.md`                                       |
| Sistema de memória (FTS5 + Qdrant)                  | `docs/frameworks/MEMORY.md`                                       |
| Agentes de nuvem                                    | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Guardrails (PII / injeção / visão)                  | `docs/security/GUARDRAILS.md`                                     |
| Credenciais públicas upstream (Gemini/etc.)         | `docs/security/PUBLIC_CREDS.md`                                   |
| Sanitização de mensagens de erro                    | `docs/security/ERROR_SANITIZATION.md`                             |
| Avaliações                                          | `docs/frameworks/EVALS.md`                                        |
| Conformidade / auditoria                            | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                            | `docs/frameworks/WEBHOOKS.md`                                     |
| Pipeline de autorização                             | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / impressão digital)                   | `docs/security/STEALTH_GUIDE.md`                                  |
| Protocolos de agente (A2A / ACP / Nuvem)            | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| Servidor MCP                                        | `docs/frameworks/MCP-SERVER.md`                                   |
| Servidor A2A                                        | `docs/frameworks/A2A-SERVER.md`                                   |
| Referência da API + OpenAPI                         | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Catálogo de provedores (gerado automaticamente)     | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Fluxo de lançamento                                 | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Testes

| O que                   | Comando                                                                         |
| ----------------------- | ------------------------------------------------------------------------------- |
| Testes unitários        | `npm run test:unit`                                                             |
| Arquivo único           | `node --import tsx/esm --test tests/unit/file.test.ts`                          |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                           |
| E2E (Playwright)        | `npm run test:e2e`                                                              |
| Protocolo E2E (MCP+A2A) | `npm run test:protocols:e2e`                                                    |
| Ecossistema             | `npm run test:ecosystem`                                                        |
| Porta de cobertura      | `npm run test:coverage` (75/75/75/70 — declarações/linhas/funções/ramificações) |
| Relatório de cobertura  | `npm run coverage:report`                                                       |

**Regra de PR**: Se você alterar o código de produção em `src/`, `open-sse/`, `electron/` ou `bin/`, você deve incluir ou atualizar testes no mesmo PR.

**Preferência de camada de teste**: unitário primeiro → integração (multi-módulo ou estado do DB) → e2e (somente UI/workflow). Codifique reproduções de bugs como testes automatizados antes ou junto com a correção.

**Política de cobertura do Copilot**: Quando um PR altera o código de produção e a cobertura está abaixo de 75% (declarações/linhas/funções) ou 70% (ramificações), não apenas relate — adicione ou atualize testes, execute novamente a porta de cobertura e, em seguida, peça confirmação. Inclua comandos executados, arquivos de teste alterados e o resultado final da cobertura no relatório do PR.

---

## Fluxo de Trabalho do Git

```bash
# Nunca faça commit diretamente no main
git checkout -b feat/sua-funcionalidade
git commit -m "feat: descreva sua alteração"
git push -u origin feat/sua-funcionalidade
```

**Prefixos de branch**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Formato de commit** (Commits Convencionais): `feat(db): adicionar circuito de interrupção` — escopos: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Ganchos do Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Ambiente

- **Tempo de Execução**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, Módulos ES
- **TypeScript**: 5.9+, alvo ES2022, módulo esnext, resolução bundler
- **Aliases de caminho**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Porta padrão**: 20128 (API + dashboard na mesma porta)
- **Diretório de dados**: variável de ambiente `DATA_DIR`, padrão para `~/.omniroute/`
- **Principais variáveis de ambiente**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Configuração: `cp .env.example .env` e, em seguida, gere `JWT_SECRET` (`openssl rand -base64 48`) e `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Regras Rigorosas

1. Nunca faça commit de segredos ou credenciais
2. Nunca adicione lógica a `localDb.ts`
3. Nunca use `eval()` / `new Function()` / eval implícito
4. Nunca faça commit diretamente em `main`
5. Nunca escreva SQL bruto em rotas — use módulos de `src/lib/db/`
6. Nunca silencie erros em streams SSE
7. Sempre valide entradas com esquemas Zod
8. Sempre inclua testes ao alterar código de produção
9. A cobertura deve permanecer ≥75% (declarações, linhas, funções) / ≥70% (ramificações). Medido atualmente: ~82%.
10. Nunca ignore ganchos do Husky (`--no-verify`, `--no-gpg-sign`) sem aprovação explícita do operador.
11. Nunca incorpore client_id/secret OAuth público ou chaves Web do Firebase como literais de string — sempre passe por `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Veja `docs/security/PUBLIC_CREDS.md`.
12. Nunca retorne `err.stack` / `err.message` bruto em respostas HTTP / SSE / executor — sempre roteie através de `buildErrorBody()` ou `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Veja `docs/security/ERROR_SANITIZATION.md`.
13. Nunca interpolar strings de caminhos externos ou valores de tempo de execução em scripts shell passados para `exec()`/`spawn()` — passe pela opção `env` em vez disso. Referência: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nunca desconsidere um alerta de CodeQL / Secret-Scanning sem (a) primeiro verificar a documentação do padrão acima para ver se o helper se aplica, e (b) registrar a justificativa técnica no comentário de desclassificação. Precedente: `js/stack-trace-exposure` levantado em sites de chamada que já roteiam através de `sanitizeErrorMessage()` é uma limitação conhecida do CodeQL (sanitizadores personalizados não reconhecidos) — desconsidere como `falso positivo` referenciando `docs/security/ERROR_SANITIZATION.md`.
15. Nunca exponha rotas que geram processos filhos (`/api/mcp/`, `/api/cli-tools/runtime/`) sem classificação `isLocalOnlyPath()` em `src/server/authz/routeGuard.ts`. A aplicação de loopback acontece incondicionalmente antes de qualquer verificação de autenticação — JWT vazado via túnel não pode acionar a geração de processos. Veja `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nunca inclua trailers `Co-Authored-By` que creditem um assistente de IA, LLM ou conta de automação (p. ex. nomes contendo "Claude", "GPT", "Copilot", "Bot"; e-mails em `anthropic.com` / `openai.com` / endereços `noreply.github.com` pertencentes a bots). Esses trailers roteiam a atribuição do commit para a conta do bot no GitHub, ocultando o autor real (`diegosouzapw`) no histórico do PR. Colaboradores humanos — incluindo autores de PRs upstream e relatores de issues sendo portados para o OmniRoute — PODEM e DEVEM ser creditados com trailers padrão `Co-authored-by: Name <email>`; os workflows de port upstream (`/port-upstream-features`, `/port-upstream-issues`) dependem disso.
