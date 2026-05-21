# CLAUDE.md (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Este ficheiro fornece orientações para Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Início Rápido

```bash
npm install                    # Instalar dependências (gera automaticamente .env a partir de .env.example)
npm run dev                    # Servidor de desenvolvimento em http://localhost:20128
npm run build                  # Compilação para produção (Next.js 16 standalone)
npm run lint                   # ESLint (0 erros esperados; avisos são pré-existentes)
npm run typecheck:core         # Verificação TypeScript (deve estar limpo)
npm run typecheck:noimplicit:core  # Verificação rigorosa (sem any implícito)
npm run test:coverage          # Testes unitários + gate de cobertura (75/75/75/70 — declarações/líneas/funções/branches)
npm run check                  # lint + teste combinados
npm run check:cycles           # Detectar dependências circulares
```

### Execução de Testes

```bash
# Ficheiro de teste único (executador de testes nativo do Node.js — a maioria dos testes)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (servidor MCP, autoCombo, cache)
npm run test:vitest

# Todas as suítes
npm run test:all
```

Para a matriz de testes completa, consulte `CONTRIBUTING.md` → "Execução de Testes". Para uma arquitetura profunda, consulte `AGENTS.md`.

---

## Projeto em Resumo

**OmniRoute** — proxy/router de IA unificado. Um endpoint, 160+ fornecedores de LLM, fallback automático.

| Camada           | Localização             | Propósito                                                                        |
| ---------------- | ----------------------- | -------------------------------------------------------------------------------- |
| Rotas API        | `src/app/api/v1/`       | Next.js App Router — pontos de entrada                                           |
| Manipuladores    | `open-sse/handlers/`    | Processamento de pedidos (chat, embeddings, etc)                                 |
| Executores       | `open-sse/executors/`   | Despacho HTTP específico do fornecedor                                           |
| Tradutores       | `open-sse/translator/`  | Conversão de formato (OpenAI↔Claude↔Gemini)                                      |
| Transformador    | `open-sse/transformer/` | API de respostas ↔ Completações de Chat                                          |
| Serviços         | `open-sse/services/`    | Roteamento combinado, limites de taxa, caching, etc                              |
| Base de Dados    | `src/lib/db/`           | Módulos de domínio SQLite (45+ ficheiros, 55 migrações)                          |
| Domínio/Política | `src/domain/`           | Motor de políticas, regras de custo, lógica de fallback                          |
| Servidor MCP     | `open-sse/mcp-server/`  | 37 ferramentas (30 base + 3 memória + 4 habilidades), 3 transportes, ~13 âmbitos |
| Servidor A2A     | `src/lib/a2a/`          | Protocolo de agente JSON-RPC 2.0                                                 |
| Habilidades      | `src/lib/skills/`       | Estrutura de habilidades extensível                                              |
| Memória          | `src/lib/memory/`       | Memória conversacional persistente                                               |

Monorepo: `src/` (aplicação Next.js 16), `open-sse/` (espaço de trabalho do motor de streaming), `electron/` (aplicação de desktop), `tests/`, `bin/` (ponto de entrada CLI).

---

## Pipeline de Requisições

```
Cliente → /v1/chat/completions (rota Next.js)
  → CORS → validação Zod → autenticação? → verificação de política → proteção contra injeção de prompt
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → verificação de cache → limite de taxa → roteamento combinado?
      → resolveComboTargets() → handleSingleModel() por alvo
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → tradução da resposta → stream SSE ou JSON
    → Se API de Respostas: responsesTransformer.ts TransformStream
```

As rotas da API seguem um padrão consistente: `Rota → pré-vôo CORS → validação do corpo Zod → Autenticação opcional (extractApiKey/isValidApiKey) → aplicação da política da chave da API → delegação do manipulador (open-sse)`. Não há middleware global do Next.js — a intercepção é específica da rota.

**Roteamento combinado** (`open-sse/services/combo.ts`): 14 estratégias (prioridade, ponderada, preenchimento-primeiro, round-robin, P2C, aleatório, menos-usado, otimizado por custo, ciente de reset, aleatório-rígido, automático, lkgp, otimizado por contexto, retransmissão de contexto). Cada alvo chama `handleSingleModel()` que envolve `handleChatCore()` com tratamento de erro por alvo e verificações de disjuntor. Veja `docs/routing/AUTO-COMBO.md` para a pontuação Auto-Combo de 9 fatores e `docs/architecture/RESILIENCE_GUIDE.md` para as 3 camadas de resiliência.

---

## Estado de Execução da Resiliência

OmniRoute tem três mecanismos de falha temporária relacionados, mas distintos. Mantenha seu escopo separado ao depurar o comportamento de roteamento. Veja o
[diagrama de resiliência de 3 camadas](./docs/diagrams/exported/resilience-3layers.svg)
(fonte: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
para um mapa rápido.

### Disjuntor do Provedor

**Escopo**: provedor inteiro, por exemplo, `glm`, `openai`, `anthropic`.

**Propósito**: parar de enviar tráfego para um provedor que está falhando repetidamente no nível upstream/serviço, para que um provedor não saudável não atrase cada requisição.

**Implementação**:

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Fiação de portão/execução de chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de status em tempo de execução: `src/app/api/monitoring/health/route.ts`
- Wrappers compartilhados: `open-sse/services/accountFallback.ts`
- Tabela de estado persistido: `domain_circuit_breakers`

**Estados**:

- `CLOSED`: tráfego normal é permitido.
- `OPEN`: provedor está temporariamente bloqueado; chamadores recebem uma resposta de circuito-aberto do provedor ou o roteamento combinado pula para outro alvo.
- `HALF_OPEN`: o tempo limite de reset expirou; permite uma requisição de teste. Sucesso fecha o disjuntor, falha o abre novamente.

**Padrões** (`open-sse/config/constants.ts`):

- Provedores OAuth: limite `3`, tempo limite de reset `60s`.
- Provedores de chave API: limite `5`, tempo limite de reset `30s`.
- Provedores locais: limite `2`, tempo limite de reset `15s`.

Apenas estados de falha a nível de provedor devem ativar o disjuntor do provedor:

```ts
(408, 500, 502, 503, 504);
```

Não ative o disjuntor do provedor inteiro para erros normais de conta/chave/modelo como a maioria dos casos `401`, `403` ou `429`. Esses geralmente pertencem a cooldown de conexão ou bloqueio de modelo. Um provedor de chave API genérico `403` deve ser recuperável, a menos que seja classificado como um erro terminal de provedor/conta.

O disjuntor usa recuperação preguiçosa, não um temporizador em segundo plano. Quando `OPEN` expira, leituras como `getStatus()`, `canExecute()`, e `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`, para que painéis e construtores de candidatos combinados não continuem excluindo um provedor expirado para sempre.

### Cooldown de Conexão

**Escopo**: uma conexão de provedor/conta/chave.

**Propósito**: pular temporariamente uma chave/conta ruim enquanto permite que outras conexões para o mesmo provedor continuem atendendo requisições.

**Implementação**:

- Caminho de escrita/atualização: `src/sse/services/auth.ts::markAccountUnavailable()`
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

Cooldowns também são preguiçosos: quando `rateLimitedUntil` está no passado, a conexão se torna elegível novamente. Ao usar com sucesso, `clearAccountError()` limpa `testStatus`,
`rateLimitedUntil`, campos de erro e `backoffLevel`.

Comportamento padrão de cooldown de conexão:

- Cooldown base OAuth: `5s`.
- Cooldown base de chave API: `3s`.
- Chave API `429` deve preferir dicas de retry upstream (`Retry-After`, cabeçalhos de reset, ou texto de reset analisável) quando disponíveis.
- Falhas recuperáveis repetidas usam backoff exponencial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

O guardião anti-thundering-herd impede que falhas concorrentes na mesma conexão estendam repetidamente o cooldown ou dobrem o `backoffLevel`.

Estados terminais não são cooldowns. `banned`, `expired`, e `credits_exhausted` são destinados a permanecer indisponíveis até que credenciais/configurações mudem ou um operador os redefina. Não sobrescreva estados terminais com estado de cooldown transitório.

### Bloqueio de Modelo

**Escopo**: provedor + conexão + modelo.

**Propósito**: evitar desativar uma conexão inteira quando apenas um modelo está indisponível ou limitado por cota para essa conexão.

Exemplos:

- Provedores por cota por modelo retornando `429`.
- Provedores locais retornando `404` para um modelo ausente.
- Falhas de permissão de modo/modelo específicas do provedor, como modos Grok selecionados.

O bloqueio de modelo vive em `open-sse/services/accountFallback.ts` e permite que a mesma conexão continue atendendo outros modelos.

### Orientação para Depuração

- Se todas as chaves para um provedor forem puladas, inspecione tanto o estado do disjuntor do provedor quanto `rateLimitedUntil`/`testStatus` de cada conexão.
- Se um provedor parecer permanentemente excluído após a janela de reset, verifique se o código está lendo o `state` bruto em vez de usar `getStatus()`/`canExecute()`.
- Se uma chave de provedor falhar, mas outras devem funcionar, prefira o cooldown de conexão em vez do disjuntor do provedor.
- Se apenas um modelo falhar, prefira o bloqueio de modelo em vez do cooldown de conexão.
- Se um estado deve se recuperar automaticamente, deve ter um timestamp futuro/tempo limite de reset e um caminho de leitura que atualiza o estado expirado. Status permanentes requerem mudanças manuais de credenciais ou configuração.

## Convenções Chave

### Estilo de Código

- **2 espaços**, ponto e vírgula, aspas duplas, largura de 100 caracteres, vírgulas finais ES5 (aplicadas pelo lint-staged via Prettier)
- **Importações**: externo → interno (`@/`, `@omniroute/open-sse`) → relativo
- **Nomenclatura**: arquivos=camelCase/kebab, componentes=PascalCase, constantes=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = erro em todo o lado; `no-explicit-any` = aviso em `open-sse/` e `tests/`
- **TypeScript**: `strict: false`, alvo ES2022, módulo esnext, resolução bundler. Preferir tipos explícitos.

### Base de Dados

- **Sempre** passar pelos módulos de domínio em `src/lib/db/` — **nunca** escrever SQL bruto em rotas ou manipuladores
- **Nunca** adicionar lógica em `src/lib/localDb.ts` (apenas camada de re-exportação)
- **Nunca** importar em barril de `localDb.ts` — importar módulos específicos de `db/` em vez disso
- Singleton DB: `getDbInstance()` de `src/lib/db/core.ts` (journaling WAL)
- Migrações: `src/lib/db/migrations/` — arquivos SQL versionados, idempotentes, executados em transações

### Tratamento de Erros

- try/catch com tipos de erro específicos, registrar com contexto pino
- Nunca ignorar erros em streams SSE — usar sinais de abortar para limpeza
- Retornar códigos de status HTTP apropriados (4xx/5xx)

### Segurança

- **Nunca** usar `eval()`, `new Function()`, ou eval implícito
- Validar todas as entradas com esquemas Zod
- Criptografar credenciais em repouso (AES-256-GCM)
- Lista de negação de cabeçalhos upstream: `src/shared/constants/upstreamHeaders.ts` — manter sanitização, esquemas Zod e testes unitários alinhados ao editar
- **Credenciais públicas upstream** (client_id/secret OAuth estilo Gemini/Antigravity/Windsurf + chaves Web Firebase extraídas de CLIs públicas): **DEVEM** ser incorporadas via `resolvePublicCred()` de `open-sse/utils/publicCreds.ts` — **nunca** como literais de string. Veja `docs/security/PUBLIC_CREDS.md` para o padrão obrigatório.
- **Respostas de erro** (HTTP / SSE / executor / manipulador MCP): **DEVEM** passar por `buildErrorBody()` ou `sanitizeErrorMessage()` de `open-sse/utils/error.ts` — **nunca** colocar `err.stack` ou `err.message` brutos no corpo da resposta. Veja `docs/security/ERROR_SANITIZATION.md`.
- **Comandos de shell construídos a partir de variáveis**: ao chamar `exec()`/`spawn()` com um script que precisa de valores em tempo de execução, passe-os via a opção `env` (escapados automaticamente) — **nunca** interpolar strings de caminhos não confiáveis/externos no corpo do script. Referência: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Bibliotecas seguras por padrão** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): preferir Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink em vez de implementações personalizadas sempre que adicionar novas superfícies sensíveis à segurança.

---

## Cenários Comuns de Modificação

### Adicionando um Novo Provedor

1. Registar em `src/shared/constants/providers.ts` (validado por Zod ao carregar)
2. Adicionar executor em `open-sse/executors/` se lógica personalizada for necessária (estender `BaseExecutor`)
3. Adicionar tradutor em `open-sse/translator/` se formato não OpenAI
4. Adicionar configuração OAuth em `src/lib/oauth/constants/oauth.ts` se baseado em OAuth — se o CLI upstream enviar um client_id/secret público, incorporar via `resolvePublicCred()` (veja `docs/security/PUBLIC_CREDS.md`), **nunca** como um literal
5. Registar modelos em `open-sse/config/providerRegistry.ts`
6. Escrever testes em `tests/unit/` (incluir a afirmação de forma publicCreds se você adicionou um novo padrão embutido)

### Adicionando uma Nova Rota API

1. Criar diretório em `src/app/api/v1/your-route/`
2. Criar `route.ts` com manipuladores `GET`/`POST`
3. Seguir o padrão: CORS → validação do corpo Zod → autenticação opcional → delegação de manipulador
4. O manipulador vai em `open-sse/handlers/` (importar de lá, não inline)
5. Respostas de erro usam `buildErrorBody()` / `errorResponse()` de `open-sse/utils/error.ts` (auto-sanitizado — nunca colocar `err.stack` ou `err.message` brutos no corpo). Veja `docs/security/ERROR_SANITIZATION.md`.
6. Adicionar testes — incluindo pelo menos uma afirmação de que as respostas de erro não vazam rastros de pilha (`!body.error.message.includes("at /")`)

### Adicionando um Novo Módulo DB

1. Criar `src/lib/db/yourModule.ts` — importar `getDbInstance` de `./core.ts`
2. Exportar funções CRUD para sua(s) tabela(s) de domínio
3. Adicionar migração em `src/lib/db/migrations/` se novas tabelas forem necessárias
4. Re-exportar de `src/lib/localDb.ts` (adicionar à lista de re-exportação apenas)
5. Escrever testes

### Adicionando uma Nova Ferramenta MCP

1. Adicionar definição da ferramenta em `open-sse/mcp-server/tools/` com esquema de entrada Zod + manipulador assíncrono
2. Registar no conjunto de ferramentas (conectado por `createMcpServer()`)
3. Atribuir aos escopos apropriados
4. Escrever testes (invocação da ferramenta registrada na tabela `mcp_audit`)

### Adicionando uma Nova Habilidade A2A

1. Criar habilidade em `src/lib/a2a/skills/` (já existem 5: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. A habilidade recebe contexto da tarefa (mensagens, metadados) → retorna resultado estruturado
3. Registar em `A2A_SKILL_HANDLERS` em `src/lib/a2a/taskExecution.ts`
4. Expor em `src/app/.well-known/agent.json/route.ts` (Cartão do Agente)
5. Escrever testes em `tests/unit/`
6. Documentar na tabela de habilidades em `docs/frameworks/A2A-SERVER.md`

### Adicionando um Novo Agente de Nuvem

1. Criar classe de agente em `src/lib/cloudAgent/agents/` estendendo `CloudAgentBase` (já existem 3: codex-cloud, devin, jules)
2. Implementar `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registar em `src/lib/cloudAgent/registry.ts`
4. Adicionar tratamento de OAuth/credenciais se necessário (`src/lib/oauth/providers/`)
5. Testes + documentar em `docs/frameworks/CLOUD_AGENT.md`

### Adicionando um Novo Guardrail / Eval / Skill / Evento Webhook

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Conjunto Eval: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Habilidade (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Evento Webhook: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

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
| Estrutura de competências                           | `docs/frameworks/SKILLS.md`                                       |
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
| Referência de API + OpenAPI                         | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Catálogo de provedores (gerado automaticamente)     | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Fluxo de lançamento                                 | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Testes

| O que                   | Comando                                                                           |
| ----------------------- | --------------------------------------------------------------------------------- |
| Testes unitários        | `npm run test:unit`                                                               |
| Ficheiro único          | `node --import tsx/esm --test tests/unit/file.test.ts`                            |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                             |
| E2E (Playwright)        | `npm run test:e2e`                                                                |
| Protocolo E2E (MCP+A2A) | `npm run test:protocols:e2e`                                                      |
| Ecossistema             | `npm run test:ecosystem`                                                          |
| Porta de cobertura      | `npm run test:coverage` (75/75/75/70 — declarações/ligações/funções/ramificações) |
| Relatório de cobertura  | `npm run coverage:report`                                                         |

**Regra de PR**: Se alterar código de produção em `src/`, `open-sse/`, `electron/` ou `bin/`, deve incluir ou atualizar testes no mesmo PR.

**Preferência de camada de teste**: unitário primeiro → integração (multi-módulo ou estado de DB) → e2e (UI/workflow apenas). Codifique reproduções de bugs como testes automatizados antes ou juntamente com a correção.

**Política de cobertura do Copilot**: Quando um PR altera código de produção e a cobertura está abaixo de 75% (declarações/ligações/funções) ou 70% (ramificações), não apenas reporte — adicione ou atualize testes, execute novamente a porta de cobertura e depois peça confirmação. Inclua comandos executados, ficheiros de teste alterados e resultado final da cobertura no relatório do PR.

---

## Fluxo de Trabalho do Git

```bash
# Nunca comite diretamente para main
git checkout -b feat/your-feature
git commit -m "feat: descreva a sua alteração"
git push -u origin feat/your-feature
```

**Prefixos de branch**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Formato de commit** (Commits Convencionais): `feat(db): adicionar circuito de interrupção` — escopos: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Ganchos do Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Ambiente

- **Tempo de execução**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, Módulos ES
- **TypeScript**: 5.9+, alvo ES2022, módulo esnext, resolução bundler
- **Aliases de caminho**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Porta padrão**: 20128 (API + dashboard na mesma porta)
- **Diretório de dados**: variável de ambiente `DATA_DIR`, padrão para `~/.omniroute/`
- **Principais variáveis de ambiente**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Configuração: `cp .env.example .env` e depois gerar `JWT_SECRET` (`openssl rand -base64 48`) e `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Regras Estritas

1. Nunca comite segredos ou credenciais
2. Nunca adicione lógica a `localDb.ts`
3. Nunca use `eval()` / `new Function()` / eval implícito
4. Nunca comite diretamente para `main`
5. Nunca escreva SQL bruto em rotas — use módulos de `src/lib/db/`
6. Nunca silencie erros em streams SSE
7. Sempre valide entradas com esquemas Zod
8. Sempre inclua testes ao alterar código de produção
9. A cobertura deve permanecer ≥75% (declarações, linhas, funções) / ≥70% (ramificações). Medido atualmente: ~82%.
10. Nunca contorne ganchos do Husky (`--no-verify`, `--no-gpg-sign`) sem aprovação explícita do operador.
11. Nunca incorpore client_id/secret OAuth público ou chaves Web do Firebase como literais de string — sempre passe por `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Veja `docs/security/PUBLIC_CREDS.md`.
12. Nunca retorne `err.stack` / `err.message` bruto em respostas HTTP / SSE / executor — sempre passe por `buildErrorBody()` ou `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Veja `docs/security/ERROR_SANITIZATION.md`.
13. Nunca interpolar strings de caminhos externos ou valores de tempo de execução em scripts de shell passados para `exec()`/`spawn()` — passe através da opção `env` em vez disso. Referência: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nunca desconsidere um alerta de CodeQL / Secret-Scanning sem (a) primeiro verificar a documentação dos padrões acima para ver se o helper se aplica, e (b) registrar a justificativa técnica no comentário de desclassificação. Precedente: `js/stack-trace-exposure` levantado em sites de chamada que já passam por `sanitizeErrorMessage()` é uma limitação conhecida do CodeQL (sanitizadores personalizados não reconhecidos) — desconsidere como `falso positivo` referenciando `docs/security/ERROR_SANITIZATION.md`.
15. Nunca exponha rotas que geram processos filhos (`/api/mcp/`, `/api/cli-tools/runtime/`) sem classificação `isLocalOnlyPath()` em `src/server/authz/routeGuard.ts`. A aplicação de loopback ocorre incondicionalmente antes de qualquer verificação de autenticação — JWT vazado através de túnel não pode acionar a geração de processos. Veja `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nunca inclua trailers `Co-Authored-By` em mensagens de commit. Os commits devem aparecer exclusivamente sob a identidade Git do proprietário do repositório (`diegosouzapw`). A linha `Co-Authored-By: Claude …` faz com que o GitHub atribua commits à conta `claude` da Anthropic, ocultando o verdadeiro autor na história do PR.
