# CLAUDE.md (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Este arquivo fornece orientações para Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Início Rápido

```bash
npm install                    # Instalar dependências (gera automaticamente .env a partir de .env.example)
npm run dev                    # Servidor de desenvolvimento em http://localhost:20128
npm run build                  # Build de produção (Next.js 16 standalone)
npm run lint                   # ESLint (0 erros esperados; avisos são pré-existentes)
npm run typecheck:core         # Verificação TypeScript (deve estar limpo)
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

# Todas as suítes
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

## Pipeline de Requisições

```
Cliente → /v1/chat/completions (rota Next.js)
  → CORS → validação Zod → auth? → verificação de política → proteção contra injeção de prompt
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → verificação de cache → limite de taxa → roteamento combinado?
      → resolveComboTargets() → handleSingleModel() por alvo
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → tradução da resposta → stream SSE ou JSON
    → Se Responses API: responsesTransformer.ts TransformStream
```

As rotas da API seguem um padrão consistente: `Rota → pré-vôo CORS → validação de corpo Zod → Autenticação opcional (extractApiKey/isValidApiKey) → aplicação de política de chave da API → delegação de manipulador (open-sse)`. Sem middleware global do Next.js — a interceptação é específica da rota.

**Roteamento combinado** (`open-sse/services/combo.ts`): 14 estratégias (prioridade, ponderada, preenchimento-primeiro, round-robin, P2C, aleatório, menos-usado, otimizado por custo, ciente de reset, estritamente-aleatório, automático, lkgp, otimizado por contexto, retransmissão de contexto). Cada alvo chama `handleSingleModel()`, que envolve `handleChatCore()` com tratamento de erro por alvo e verificações de disjuntor. Veja `docs/routing/AUTO-COMBO.md` para a pontuação Auto-Combo de 9 fatores e `docs/architecture/RESILIENCE_GUIDE.md` para as 3 camadas de resiliência.

---

## Estado de Execução de Resiliência

OmniRoute possui três mecanismos de falha temporária relacionados, mas distintos. Mantenha seu
escopo separado ao depurar o comportamento de roteamento. Veja o
[diagrama de resiliência de 3 camadas](./docs/diagrams/exported/resilience-3layers.svg)
(fonte: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
para um mapa rápido.

### Disjuntor de Provedor

**Escopo**: provedor inteiro, por exemplo, `glm`, `openai`, `anthropic`.

**Propósito**: parar de enviar tráfego para um provedor que está falhando repetidamente no
nível upstream/serviço, para que um provedor não saudável não atrase cada requisição.

**Implementação**:

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Fiação de gate/executação de chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de status em tempo de execução: `src/app/api/monitoring/health/route.ts`
- Wrappers compartilhados: `open-sse/services/accountFallback.ts`
- Tabela de estado persistido: `domain_circuit_breakers`

**Estados**:

- `CLOSED`: tráfego normal é permitido.
- `OPEN`: provedor está temporariamente bloqueado; chamadores recebem uma resposta de circuito-aberto do provedor
  ou o roteamento combinado pula para outro alvo.
- `HALF_OPEN`: o tempo limite de reset expirou; permite uma requisição de teste. Sucesso fecha o
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
dos casos `401`, `403` ou `429`. Esses geralmente pertencem ao cooldown de conexão ou bloqueio de modelo. Um erro genérico de provedor de chave da API `403` deve ser recuperável, a menos que seja classificado
como um erro terminal de provedor/conta.

O disjuntor usa recuperação preguiçosa, não um temporizador em segundo plano. Quando `OPEN` expira, leituras como `getStatus()`, `canExecute()`, e `getRetryAfterMs()` atualizam o estado para
`HALF_OPEN`, para que painéis e construtores de candidatos de combinação não continuem excluindo um
provedor expirado para sempre.

### Cooldown de Conexão

**Escopo**: uma conexão de provedor/conta/chave.

**Propósito**: pular temporariamente uma chave/conta ruim enquanto permite que outras conexões para
o mesmo provedor continuem atendendo requisições.

**Implementação**:

- Caminho de escrita/atualização: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção/filtragem de conta: `src/sse/services/auth.ts::getProviderCredentials...`
- Cálculo de cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configurações: `src/lib/resilience/settings.ts`

Campos importantes nas conexões de provedor:

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
com limite de cota para essa conexão.

Exemplos:

- Provedores de cota por modelo retornando `429`.
- Provedores locais retornando `404` para um modelo ausente.
- Falhas de permissão de modo/modelo específicas do provedor, como modos Grok selecionados.

O bloqueio de modelo vive em `open-sse/services/accountFallback.ts` e permite que a mesma
conexão continue atendendo outros modelos.

### Orientações para Depuração

- Se todas as chaves para um provedor forem puladas, inspecione tanto o estado do disjuntor do provedor quanto o `rateLimitedUntil`/`testStatus` de cada conexão.
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
- **Nomeação**: arquivos=camelCase/kebab, componentes=PascalCase, constantes=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = erro em todo lugar; `no-explicit-any` = aviso em `open-sse/` e `tests/`
- **TypeScript**: `strict: false`, alvo ES2022, módulo esnext, resolução bundler. Preferir tipos explícitos.

### Banco de Dados

- **Sempre** passe pelos módulos de domínio em `src/lib/db/` — **nunca** escreva SQL bruto em rotas ou manipuladores
- **Nunca** adicione lógica em `src/lib/localDb.ts` (apenas camada de re-exportação)
- **Nunca** faça importação em lote de `localDb.ts` — importe módulos específicos de `db/` em vez disso
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
- Lista de negação de cabeçalhos upstream: `src/shared/constants/upstreamHeaders.ts` — mantenha a sanitização, esquemas Zod e testes unitários alinhados ao editar

---

## Cenários Comuns de Modificação

### Adicionando um Novo Provedor

1. Registre em `src/shared/constants/providers.ts` (validado por Zod ao carregar)
2. Adicione executor em `open-sse/executors/` se lógica personalizada for necessária (estenda `BaseExecutor`)
3. Adicione tradutor em `open-sse/translator/` se formato não for OpenAI
4. Adicione configuração OAuth em `src/lib/oauth/constants/oauth.ts` se baseado em OAuth
5. Registre modelos em `open-sse/config/providerRegistry.ts`
6. Escreva testes em `tests/unit/`

### Adicionando uma Nova Rota de API

1. Crie diretório em `src/app/api/v1/sua-rota/`
2. Crie `route.ts` com manipuladores `GET`/`POST`
3. Siga o padrão: CORS → validação do corpo Zod → autenticação opcional → delegação de manipulador
4. O manipulador vai em `open-sse/handlers/` (importe de lá, não inline)
5. Adicione testes

### Adicionando um Novo Módulo de DB

1. Crie `src/lib/db/seuModulo.ts` — importe `getDbInstance` de `./core.ts`
2. Exporte funções CRUD para sua(s) tabela(s) de domínio
3. Adicione migração em `src/lib/db/migrations/` se novas tabelas forem necessárias
4. Re-exporte de `src/lib/localDb.ts` (adicione apenas à lista de re-exportação)
5. Escreva testes

### Adicionando uma Nova Ferramenta MCP

1. Adicione definição da ferramenta em `open-sse/mcp-server/tools/` com esquema de entrada Zod + manipulador assíncrono
2. Registre no conjunto de ferramentas (conectado por `createMcpServer()`)
3. Atribua aos escopos apropriados
4. Escreva testes (invocação da ferramenta registrada na tabela `mcp_audit`)

### Adicionando uma Nova Habilidade A2A

1. Crie habilidade em `src/lib/a2a/skills/` (5 já existem: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. A habilidade recebe contexto de tarefa (mensagens, metadados) → retorna resultado estruturado
3. Registre em `A2A_SKILL_HANDLERS` em `src/lib/a2a/taskExecution.ts`
4. Exponha em `src/app/.well-known/agent.json/route.ts` (Cartão do Agente)
5. Escreva testes em `tests/unit/`
6. Documente na tabela de habilidades em `docs/frameworks/A2A-SERVER.md`

### Adicionando um Novo Agente de Nuvem

1. Crie classe de agente em `src/lib/cloudAgent/agents/` estendendo `CloudAgentBase` (3 já existem: codex-cloud, devin, jules)
2. Implemente `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registre em `src/lib/cloudAgent/registry.ts`
4. Adicione tratamento de OAuth/credenciais se necessário (`src/lib/oauth/providers/`)
5. Testes + documente em `docs/frameworks/CLOUD_AGENT.md`

### Adicionando um Novo Guardrail / Eval / Habilidade / Evento de Webhook

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Conjunto de Eval: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Habilidade (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
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

| O que                   | Comando                                                                         |
| ----------------------- | ------------------------------------------------------------------------------- |
| Testes unitários        | `npm run test:unit`                                                             |
| Arquivo único           | `node --import tsx/esm --test tests/unit/file.test.ts`                          |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                           |
| E2E (Playwright)        | `npm run test:e2e`                                                              |
| Protocolo E2E (MCP+A2A) | `npm run test:protocols:e2e`                                                    |
| Ecossistema             | `npm run test:ecosystem`                                                        |
| Portão de cobertura     | `npm run test:coverage` (75/75/75/70 — declarações/líneas/funções/ramificações) |
| Relatório de cobertura  | `npm run coverage:report`                                                       |

**Regra de PR**: Se você alterar o código de produção em `src/`, `open-sse/`, `electron/` ou `bin/`, você deve incluir ou atualizar testes no mesmo PR.

**Preferência de camada de teste**: unitário primeiro → integração (multi-módulo ou estado do DB) → e2e (somente UI/workflow). Codifique reproduções de bugs como testes automatizados antes ou junto com a correção.

**Política de cobertura do Copilot**: Quando um PR altera o código de produção e a cobertura está abaixo de 75% (declarações/líneas/funções) ou 70% (ramificações), não apenas relate — adicione ou atualize testes, reexecute o portão de cobertura e, em seguida, peça confirmação. Inclua comandos executados, arquivos de teste alterados e o resultado final da cobertura no relatório do PR.

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
- Configuração: `cp .env.example .env` e então gere `JWT_SECRET` (`openssl rand -base64 48`) e `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Regras Estritas

1. Nunca faça commit de segredos ou credenciais
2. Nunca adicione lógica ao `localDb.ts`
3. Nunca use `eval()` / `new Function()` / eval implícito
4. Nunca faça commit diretamente no `main`
5. Nunca escreva SQL bruto em rotas — use módulos `src/lib/db/`
6. Nunca silenciosamente ignore erros em streams SSE
7. Sempre valide entradas com esquemas Zod
8. Sempre inclua testes ao alterar código de produção
9. A cobertura deve permanecer ≥75% (declarações, linhas, funções) / ≥70% (ramificações). Medido atualmente: ~82%.
10. Nunca contorne ganchos do Husky (`--no-verify`, `--no-gpg-sign`) sem aprovação explícita do operador.
