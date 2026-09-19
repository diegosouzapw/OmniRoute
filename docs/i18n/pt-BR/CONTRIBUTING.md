# Contributing to OmniRoute (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Agradecemos seu interesse em contribuir! Este guia aborda tudo o que você precisa para começar.

Para consultar o fluxo de trabalho oficial para cada alteração, comece pelo
[Fluxo Principal de Contribuição](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Ele relaciona alterações de provedores, roteamento,
UI/UX, i18n, CLI, banco de dados e build/deploy aos respectivos contratos, testes específicos, cobertura de CI
e etapas de reconciliação.

---

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- **Node.js** `>=22.22.3 <23` ou `>=24.0.0 <27` (recomendado: 24 LTS)
- **npm** 10+

> **Usuários do npm v11+ (Node 24+):** Após executar `npm install`, verifique se os módulos nativos foram instalados:
> `node -e "require('better-sqlite3')"`. Se ocorrer uma falha com `MODULE_NOT_FOUND`,
> execute `npm approve-scripts better-sqlite3 && npm install`. Consulte
> [Solução de problemas](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clonar e Instalar

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variáveis de Ambiente

```bash
# Crie seu arquivo .env a partir do modelo
cp .env.example .env

# Gere os segredos obrigatórios
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Principais variáveis para desenvolvimento:

| Variável               | Padrão de Desenvolvimento | Descrição                           |
| ---------------------- | ------------------------- | ----------------------------------- |
| `PORT`                 | `20128`                   | Porta do servidor                   |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`  | URL base do frontend                |
| `JWT_SECRET`           | (gerar conforme acima)    | Segredo de assinatura do JWT        |
| `INITIAL_PASSWORD`     | `CHANGEME`                | Senha do primeiro acesso            |
| `APP_LOG_LEVEL`        | `info`                    | Nível de detalhamento dos registros |

### Configurações do Painel

O painel oferece controles de interface para recursos que também podem ser configurados por meio de variáveis de ambiente:

| Local da Configuração    | Controle                      | Descrição                                           |
| ------------------------ | ----------------------------- | --------------------------------------------------- |
| Configurações → Avançado | Modo de Depuração             | Habilita registros de depuração de requisições (UI) |
| Configurações → Geral    | Visibilidade da Barra Lateral | Exibe/oculta seções da barra lateral                |

Essas configurações são armazenadas no banco de dados e persistem após reinicializações, substituindo os valores padrão das variáveis de ambiente quando definidas.

### Execução Local

```bash
# Modo de desenvolvimento (recarregamento automático)
npm run dev

# Build de produção
npm run build    # next build → .build/next/ e, em seguida, assembleStandalone → dist/
npm run start

# Compilação rápida somente do backend/API para alterações de colaboradores
npm run build:contributor

# Build de lançamento (recompilação limpa + sentinela HEAD — obrigatório para deploy)
npm run build:release   # rm -rf .build dist && build + grava dist/BUILD_SHA

# Configuração comum de porta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

O build para colaboradores realiza uma validação somente de compilação: ele não monta a
distribuição autônoma nem compila recursos opcionais de empacotamento nativo. Use o build normal de produção quando
precisar validar o pacote pronto para distribuição.

### Estrutura da Saída do Build

| Diretório | Conteúdo                                                                            | Rastreado |
| --------- | ----------------------------------------------------------------------------------- | --------- |
| `src/`    | Código-fonte da aplicação (TypeScript / TSX)                                        | Sim       |
| `.build/` | Intermediários — saída de `next build` (ignorada pelo Git, `distDir = .build/next`) | Não       |
| `dist/`   | Pacote distribuível — montado por `assembleStandalone` (ignorado pelo Git)          | Não       |

O pipeline de build é executado em uma única passagem:

```
npm run build
  └─ next build → .build/next/standalone  (saída do Next.js)
  └─ assembleStandalone()                 (copia o pacote autônomo + arquivos estáticos + públicos + recursos nativos)
       └─ saída: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` também limpa ambos os diretórios primeiro e grava
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) como uma sentinela de integridade do deploy.

`npm run build:contributor` usa o perfil de build exclusivo do backend. Ele substitui temporariamente por stubs
os arquivos da interface do painel durante o build, preserva os manipuladores de rotas da API e restaura os arquivos originais
após o build. Use `npm run build` para alterações que afetem a interface do painel ou para a validação completa
do lançamento; o perfil de colaborador não substitui o build de lançamento.

> **Observação sobre deploy em VPS:** o diretório remoto da imagem `/usr/lib/node_modules/omniroute/app/`
> permanece inalterado. As rotinas de deploy sincronizam o conteúdo de `dist/` com ele usando rsync.
> Somente o caminho da saída do build dentro do repositório foi alterado (`app/` → `dist/`).

URLs padrão:

- **Painel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Fluxo de trabalho do Git

> ⚠️ **NUNCA faça commits diretamente em `main`.** Sempre use branches de funcionalidade.
>
> **Base do PR:** use como destino a branch `release/vX.Y.Z` ativa (não `main`). Consulte
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) para conhecer o
> modelo de uma release por branch + tag no lançamento.

```bash
# Crie uma branch a partir da ponta da release ativa (exemplo: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... faça as alterações ...
git commit -m "feat: descreva sua alteração"
git push -u origin feat/your-feature-name
# Abra um Pull Request com base = release/v3.8.49
```

### Nomenclatura de branches

| Prefixo     | Finalidade                    |
| ----------- | ----------------------------- |
| `feat/`     | Novas funcionalidades         |
| `fix/`      | Correções de bugs             |
| `refactor/` | Reestruturação de código      |
| `docs/`     | Alterações na documentação    |
| `test/`     | Adições/correções de testes   |
| `chore/`    | Ferramentas, CI, dependências |

### Mensagens de commit

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adicionar circuit breaker às chamadas de provedores
fix: resolver caso extremo na validação do segredo JWT
docs: atualizar SECURITY.md com proteção de PII
test: adicionar testes unitários de observabilidade
refactor(db): consolidar tabelas de limite de taxa
```

Escopos (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Execução de testes

```bash
# Todos os testes (unitários + vitest + ecossistema + e2e)
npm run test:all

# Um único arquivo de teste (executor de testes nativo do Node.js — a maioria dos testes usa este)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Somente os testes unitários afetados pela sua alteração (mesmo seletor TIA que o gate da CI, #8084)
npm run test:scoped            # alterações no último commit (ou na árvore de trabalho)
npm run test:scoped:staged     # somente alterações em staging — combina bem com uma execução de pre-commit
npm run test:scoped:full       # primeiro reconstrói o mapa do grafo de imports (após adicionar/mover arquivos)
# Exit 1 + "run the full suite" significa que um arquivo central (tsconfig, package.json, …) ou uma
# fonte não mapeada foi alterada — o seletor falha de forma segura e nunca ignora nada silenciosamente.

# Vitest (servidor MCP, autoCombo, cache)
npm run test:vitest

# Testes E2E (requer Playwright)
npm run test:e2e

# E2E dos clientes de protocolo (transportes MCP, A2A)
npm run test:protocols:e2e

# Testes de compatibilidade do ecossistema
npm run test:ecosystem

# Gate de cobertura: 60% de instruções/linhas/funções/branches
npm run test:coverage
npm run coverage:report

# Verificação de lint + formatação
npm run lint
npm run check

# Smoke test combinado com upstream real, protegido por gate (requer acesso ao VPS + créditos reais de provedores)
# Acessa provedores REAIS — custa um pouco. NUNCA é executado na CI. É ignorado de forma limpa sem o gate.
# Requer: acesso via ssh root@192.168.0.15 (obtém um snapshot somente leitura do banco de dados a partir do VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Smoke test ao vivo da Fase 3 no VPS — scripts Node ESM simples, acessam diretamente o servidor .15 ao vivo.
# Requer: acesso via ssh root@192.168.0.15 (combos criados/removidos via SSH sqlite).
# Acessa provedores REAIS (baixo custo). Cria/exclui somente combos __live_test__*. NUNCA é executado na CI.
# REQUIRE_API_KEY=false em .15, portanto nenhuma chave de API é necessária, mas respeita COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY se definidas.
npm run test:combo:live:vps              # 7 cenários HTTP (prioridade/round-robin/ponderado/custo/fusão/automático + integridade)
npm run test:combo:live:vps:failover     # adiciona um cenário real de failover entre provedores (8 no total)
```

Observações sobre cobertura:

- `npm run test:coverage` mede a cobertura do código-fonte para a suíte principal de testes unitários, exclui `tests/**` e inclui `open-sse/**`
- Os Pull Requests devem manter o gate de cobertura em **60%+** para instruções/linhas/funções/branches
- Se um PR alterar código de produção em `src/`, `open-sse/`, `electron/` ou `bin/`, ele deverá adicionar ou atualizar testes automatizados no mesmo PR
- `npm run coverage:report` exibe o relatório detalhado, arquivo por arquivo, da execução de cobertura mais recente
- `npm run test:coverage:legacy` preserva a métrica anterior para comparação histórica
- Consulte `docs/ops/COVERAGE_PLAN.md` para conhecer o roteiro de melhoria gradual da cobertura

### Requisitos do Pull Request

Antes de abrir um PR, use o
[Caminho ideal de contribuição](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) para executar o ciclo focado no
que você alterou. A suíte completa de testes unitários (4 shards da CI), o Vitest, o gate de cobertura de **60%+** e
o build de produção são responsabilidade da CI — executá-los localmente não fornece nenhum sinal que as
verificações do PR já não forneçam e, em máquinas menores, isso pode saturar o host (#8084):

- Execute os arquivos de teste que cobrem sua alteração: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Execute `npm run lint`
- Inclua ou atualize testes automatizados no mesmo PR sempre que o código de produção for alterado
- Inclua os arquivos de teste alterados ou adicionados na descrição do PR quando o código de produção for alterado
- Verifique o resultado do SonarQube no PR quando os segredos do projeto estiverem configurados na CI

Status atual dos testes: **122 arquivos de testes unitários** cobrindo:

- Tradutores de provedores e conversão de formatos
- Limitação de taxa, circuit breaker e resiliência
- Cache semântico, idempotência e acompanhamento de progresso
- Operações e esquema do banco de dados (21 módulos de banco de dados)
- Fluxos OAuth e autenticação
- Validação de endpoints da API (Zod v4)
- Ferramentas do servidor MCP e aplicação de escopos
- Sistemas de Memória e Skills

---

## Estilo de código

- **ESLint** — Execute `npm run lint` antes de fazer commit
- **Prettier** — Formatação automática via `lint-staged` no commit (2 espaços, ponto e vírgula, aspas duplas, largura de 100 caracteres, vírgulas finais es5)
- **TypeScript** — Todo o código em `src/` usa `.ts`/`.tsx`; `open-sse/` usa `.ts`/`.js`; documente com TSDoc (`@param`, `@returns`, `@throws`)
- **Sem `eval()`** — O ESLint aplica `no-eval`, `no-implied-eval`, `no-new-func`
- **Validação com Zod** — Use esquemas do Zod v4 para toda validação de entrada da API
- **Nomenclatura**: arquivos = camelCase/kebab-case, componentes = PascalCase, constantes = UPPER_SNAKE

### Tratamento de erros / blocos catch vazios

Nunca deixe um `catch` sem explicação. Classifique-o em uma de duas categorias (isso operacionaliza
a regra rígida de "nunca ignorar silenciosamente erros em streams SSE"):

- **Intencional (nossa própria limpeza/telemetria de melhor esforço)** — uma falha aqui é esperada e
  inofensiva; adicione um comentário de uma linha explicando o motivo, sem logging (fazer logging em cada solicitação é o
  ruído que esta convenção evita).

  ```ts
  } catch {} // fechar um controller que já foi fechado após a desconexão do cliente é esperado
  ```

- **Deve registrar (código externo/fornecido pelo chamador ou quando ignorar o erro altera o fluxo de controle)** — mantenha
  o catch (nunca permita que ele interrompa o stream), mas emita um `console.debug`/`warn` contextual para que a
  falha possa ser descoberta.

  ```ts
  } catch (e) {
    console.debug("[STREAM] erro no callback onFailure:", e);
  }
  ```

Consulte `open-sse/utils/stream.ts` e `open-sse/utils/streamHandler.ts` para ver exemplos aplicados.

---

## Estrutura do projeto

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # App Router do Next.js 16
│   ├── (dashboard)/        # Páginas do dashboard (23 seções)
│   ├── api/                # Rotas da API (51 diretórios)
│   └── login/              # Páginas de autenticação (.tsx)
├── domain/                 # Mecanismo de políticas (policyEngine, comboResolver, costRules etc.)
├── lib/                    # Lógica de negócios principal (.ts)
│   ├── a2a/                # Servidor do protocolo Agent-to-Agent v0.3
│   ├── acp/                # Registro do Agent Communication Protocol
│   ├── compliance/         # Mecanismo de políticas de conformidade
│   ├── db/                 # Módulos de domínio SQLite + 130 migrações
│   ├── memory/             # Memória conversacional persistente
│   ├── oauth/              # Provedores, serviços e utilitários OAuth
│   ├── skills/             # Framework extensível de habilidades
│   ├── usage/              # Rastreamento de uso e cálculo de custos
│   └── localDb.ts          # Apenas camada de reexportação — nunca adicione lógica aqui
├── middleware/              # Middleware de solicitações (promptInjectionGuard)
├── mitm/                   # Proxy MITM (certificado, DNS, roteamento de destino)
├── shared/
│   ├── components/         # Componentes React (.tsx)
│   ├── constants/          # Definições de provedores (329), escopos MCP, 19 estratégias de roteamento
│   ├── utils/              # Circuit breaker, sanitizador, auxiliares de autenticação
│   └── validation/         # Esquemas do Zod v4
└── sse/                    # Pipeline de proxy SSE

open-sse/                   # Workspace @omniroute/open-sse
├── executors/              # 89 módulos de implementação de executores
├── handlers/               # 11 manipuladores de solicitações (chat, respostas, embeddings, imagens etc.)
├── mcp-server/             # Servidor MCP (110 ferramentas únicas, 3 transportes, 33 escopos)
├── services/               # 178 serviços de nível superior (combo, autoCombo, rateLimitManager etc.)
├── translator/             # Tradutores de formato (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformador da Responses API
└── utils/                  # 22 módulos utilitários (stream, TLS, proxy, logging)

electron/                   # Aplicativo desktop Electron (multiplataforma)

tests/
├── unit/                   # Executor de testes do Node.js (1.574 arquivos de teste)
├── integration/            # Testes de integração
├── e2e/                    # Testes do Playwright
├── security/               # Testes de segurança
├── translator/             # Testes específicos de tradução
└── load/                   # Testes de carga

docs/
├── adr/                     # Registros de Decisões de Arquitetura
├── architecture/            # Arquitetura e resiliência do sistema
├── comparison/              # OmniRoute vs. alternativas
├── compression/             # Guias e regras de compressão
├── dev/                     # Guias de desenvolvimento
├── diagrams/                # Diagramas de arquitetura
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Guia do usuário, Docker, configuração, solução de problemas
├── i18n/                    # Traduções internacionalizadas do README
├── marketing/               # Materiais de marketing
├── ops/                     # Implantação, proxy, cobertura, lançamentos
├── providers/               # Documentação específica dos provedores
├── reference/               # Referência da API, variáveis de ambiente, ferramentas CLI, camadas gratuitas
├── releases/                # Notas de versão
├── routing/                 # Mecanismo de combinação automática, repetição de raciocínio
├── screenshots/             # Capturas de tela do dashboard
├── security/                # Barreiras de proteção, conformidade, furtividade, tokens
└── specs/                   # Especificações de design
```

---

## Adicionando um Novo Provedor

### Etapa 1: Registrar as Constantes do Provedor

Adicione a `src/shared/constants/providers.ts` — validado pelo Zod durante o carregamento do módulo.

### Etapa 2: Adicionar um Executor (se for necessária lógica personalizada)

Crie um executor em `open-sse/executors/your-provider.ts` estendendo o executor base.

### Etapa 3: Adicionar um Tradutor (se o formato não for OpenAI)

Crie tradutores de solicitação/resposta em `open-sse/translator/`.

### Etapa 4: Adicionar a Configuração OAuth (se for baseado em OAuth)

Adicione as credenciais OAuth em `src/lib/oauth/constants/oauth.ts` e o serviço em `src/lib/oauth/services/`.

Se o provedor upstream distribuir um client_id/segredo OAuth público ou uma chave da API Web do Firebase dentro de sua CLI pública / pacote do navegador, **não** o incorpore como um literal de string. Use `resolvePublicCred()` de `open-sse/utils/publicCreds.ts` e adicione uma entrada de bytes mascarada a `EMBEDDED_DEFAULTS`. O fluxo de trabalho obrigatório completo está documentado em [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Dentro de manipuladores/executores, as mensagens de erro que chegam ao cliente devem passar por `buildErrorBody()` / `sanitizeErrorMessage()` de `open-sse/utils/error.ts` — nunca coloque `err.stack` ou `err.message` brutos no corpo de uma Response. Consulte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Etapa 5: Registrar os Modelos

Adicione as definições dos modelos em `open-sse/config/providerRegistry.ts`.

### Etapa 6: Adicionar Testes

Escreva testes unitários em `tests/unit/` que cubram, no mínimo:

- Registro do provedor
- Tradução de solicitação/resposta
- Tratamento de erros

---

## Checklist da Pull Request

- [ ] Os testes passam (`npm test`)
- [ ] O lint passa (`npm run lint`)
- [ ] O build é concluído com sucesso (`npm run build`)
- [ ] Tipos TypeScript adicionados para novas funções e interfaces públicas
- [ ] Nenhum segredo ou valor de fallback codificado diretamente
- [ ] Credenciais públicas upstream incorporadas por meio de `resolvePublicCred()` (consulte [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nunca como literais
- [ ] As respostas de erro passam por `buildErrorBody()` / `sanitizeErrorMessage()` — nenhum stack trace bruto nos corpos das respostas (consulte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Comandos de shell (`exec` / `spawn`) passam valores de runtime por meio de `env`, não por interpolação de strings
- [ ] Todas as entradas são validadas com esquemas Zod
- [ ] **Fragmento** do changelog adicionado em `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` para alterações visíveis aos usuários (consulte [`changelog.d/README.md`](./changelog.d/README.md)) — **não** edite `CHANGELOG.md` diretamente; os fragmentos são agregados no momento do lançamento e nunca geram conflitos entre PRs
- [ ] Documentação atualizada (se aplicável)
- [ ] Nenhum novo alerta do CodeQL / Secret-Scanning aberto, ou cada um foi descartado com uma justificativa técnica que faça referência ao documento relevante em `docs/security/`
- [ ] Rotas que iniciam processos filhos (`/api/mcp/`, `/api/cli-tools/runtime/`) classificadas como `isLocalOnlyPath()` em `src/server/authz/routeGuard.ts` — consulte a [Regra Rígida nº 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Nenhum trailer `Co-Authored-By` nas mensagens de commit — os commits devem aparecer exclusivamente sob a identidade Git do proprietário do repositório (Regra Rígida nº 16)

---

## Lançamentos

Os lançamentos são gerenciados por meio do fluxo de trabalho `/generate-release`. Quando um novo lançamento do GitHub é criado, o pacote é **publicado automaticamente no npm** por meio do GitHub Actions.

Para implantações em VPS, use `npm run build:release` (não `npm run build`) — esse comando realiza uma
recompilação limpa, monta o pacote em `dist/` e grava o arquivo sentinela `dist/BUILD_SHA`.
Em seguida, use as skills `/deploy-vps-*-cc`, que sincronizam `dist/` via rsync com o diretório remoto `app/`.

---

## Como obter ajuda

- **Arquitetura**: Consulte [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referência da API**: Consulte [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Documentação de segurança**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Documentação de operações**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: Consulte `docs/adr/` para ver os registros de decisões arquiteturais
