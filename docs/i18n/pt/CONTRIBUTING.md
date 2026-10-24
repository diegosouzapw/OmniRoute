# Contributing to OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Configuração de Desenvolvimento

### Pré-requisitos

- **Node.js** `>=22.22.2 <23`, ou `>=24.0.0 <27` (recomendado: 24 LTS)
- **npm** 10+

> **Utilizadores do npm v11+ (Node 24+):** Após executar `npm install`, confirme que os módulos nativos foram instalados:
> `node -e "require('better-sqlite3')"`. Se falhar com `MODULE_NOT_FOUND`,
> execute `npm approve-scripts better-sqlite3 && npm install`. Consulte
> [Resolução de problemas](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clonar e Instalar

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variáveis de Ambiente

```bash
# Crie o seu .env a partir do modelo
cp .env.example .env

# Gere os segredos necessários
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Principais variáveis para desenvolvimento:

| Variável               | Predefinição de Desenvolvimento | Descrição                                  |
| ---------------------- | ------------------------------- | ------------------------------------------ |
| `PORT`                 | `20128`                         | Porta do servidor                          |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`        | URL base para a interface                  |
| `JWT_SECRET`           | (gerado acima)                  | Segredo de assinatura JWT                  |
| `INITIAL_PASSWORD`     | `CHANGEME`                      | Palavra-passe do primeiro início de sessão |
| `APP_LOG_LEVEL`        | `info`                          | Nível de detalhe dos registos              |

### Definições do Painel

O painel disponibiliza controlos da interface para funcionalidades que também podem ser configuradas através de variáveis de ambiente:

| Localização da Definição | Controlo                      | Descrição                                    |
| ------------------------ | ----------------------------- | -------------------------------------------- |
| Definições → Avançadas   | Modo de Depuração             | Ativar registos de pedidos de depuração (IU) |
| Definições → Geral       | Visibilidade da Barra Lateral | Mostrar/ocultar secções da barra lateral     |

Estas definições são armazenadas na base de dados e persistem entre reinícios, substituindo as predefinições das variáveis de ambiente quando configuradas.

### Execução Local

```bash
# Modo de desenvolvimento (recarregamento automático)
npm run dev

# Compilação de produção
npm run build    # next build → .build/next/ e, depois, assembleStandalone → dist/
npm run start

# Compilação rápida apenas do backend/API para alterações de colaboradores
npm run build:contributor

# Compilação de lançamento (recompilação limpa + sentinela HEAD — necessária para a implementação)
npm run build:release   # rm -rf .build dist && compilação + grava dist/BUILD_SHA

# Configuração comum da porta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

A compilação de colaborador efetua uma validação apenas de compilação: não monta a
distribuição autónoma nem compila recursos opcionais de empacotamento nativo. Utilize a compilação de produção normal quando
precisar de validar o pacote distribuível.

### Estrutura do Resultado da Compilação

| Diretório | Conteúdo                                                                                | Controlado |
| --------- | --------------------------------------------------------------------------------------- | ---------- |
| `src/`    | Código-fonte da aplicação (TypeScript / TSX)                                            | Sim        |
| `.build/` | Intermediários — resultado de `next build` (ignorado pelo Git, `distDir = .build/next`) | Não        |
| `dist/`   | Pacote distribuível — montado por `assembleStandalone` (ignorado pelo Git)              | Não        |

O pipeline de compilação consiste numa única passagem:

```
npm run build
  └─ next build → .build/next/standalone  (resultado do Next.js)
  └─ assembleStandalone()                 (copia o pacote autónomo + ficheiros estáticos + públicos + recursos nativos)
       └─ resultado: dist/                (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` também limpa primeiro ambos os diretórios e grava
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) como sentinela de integridade da implementação.

`npm run build:contributor` utiliza o perfil de compilação apenas do backend. Durante a compilação, substitui temporariamente
os ficheiros da IU do painel por stubs, mantém os processadores de rotas da API e restaura os ficheiros originais
após a compilação. Utilize `npm run build` para alterações que afetem a IU do painel ou para uma validação
completa do lançamento; o perfil de colaborador não substitui a compilação de lançamento.

> **Nota sobre a implementação em VPS:** o diretório remoto da imagem `/usr/lib/node_modules/omniroute/app/`
> permanece inalterado. As ferramentas de implementação sincronizam o conteúdo de `dist/` para esse diretório através de rsync.
> Apenas o caminho do resultado da compilação no repositório foi alterado (`app/` → `dist/`).

URLs predefinidos:

- **Painel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Fluxo de Trabalho do Git

> ⚠️ **NUNCA faça commits diretamente em `main`.** Utilize sempre branches de funcionalidade.
>
> **Base do PR:** selecione como destino a branch `release/vX.Y.Z` ativa (não `main`). Consulte
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) para obter informações sobre o
> modelo de uma release por branch + etiqueta aquando da publicação.

```bash
# Crie uma branch a partir da versão mais recente da release ativa (exemplo: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... efetue as alterações ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Abra um Pull Request com base = release/v3.8.49
```

### Nomenclatura das Branches

| Prefixo     | Finalidade                    |
| ----------- | ----------------------------- |
| `feat/`     | Novas funcionalidades         |
| `fix/`      | Correções de erros            |
| `refactor/` | Reestruturação do código      |
| `docs/`     | Alterações à documentação     |
| `test/`     | Adições/correções de testes   |
| `chore/`    | Ferramentas, CI, dependências |

### Mensagens de Commit

Siga a especificação [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adicionar circuit breaker às chamadas de fornecedores
fix: resolver caso extremo na validação do segredo JWT
docs: atualizar SECURITY.md com proteção de PII
test: adicionar testes unitários de observabilidade
refactor(db): consolidar tabelas de limites de taxa
```

Âmbitos (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Executar testes

```bash
# Todos os testes (unitários + vitest + ecossistema + e2e)
npm run test:all

# Um único ficheiro de teste (executor de testes nativo do Node.js — a maioria dos testes utiliza este)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Apenas os testes unitários afetados pela sua alteração (o mesmo seletor TIA utilizado no controlo de CI, #8084)
npm run test:scoped            # alterações no último commit (ou na árvore de trabalho)
npm run test:scoped:staged     # apenas alterações preparadas — combina bem com uma execução pre-commit
npm run test:scoped:full       # reconstrói primeiro o mapa do grafo de importações (após adicionar/mover ficheiros)
# O código de saída 1 + "execute o conjunto completo" significa que um ficheiro central (tsconfig, package.json, …) ou
# código-fonte não mapeado foi alterado — o seletor falha de forma segura e nunca omite testes silenciosamente.

# Vitest (servidor MCP, autoCombo, cache)
npm run test:vitest

# Testes E2E (requer Playwright)
npm run test:e2e

# Testes E2E dos clientes de protocolo (transportes MCP, A2A)
npm run test:protocols:e2e

# Testes de compatibilidade com o ecossistema
npm run test:ecosystem

# Limite de cobertura: 60% de instruções/linhas/funções/ramos
npm run test:coverage
npm run coverage:report

# Verificação de lint + formatação
npm run lint
npm run check

# Teste rápido combinado, condicionado, com serviços reais a montante (requer acesso ao VPS + créditos reais de fornecedores)
# Contacta fornecedores REAIS — tem um pequeno custo. NUNCA é executado em CI. É ignorado de forma limpa sem a condição.
# Requer: acesso ssh root@192.168.0.15 (obtém do VPS um instantâneo da BD só de leitura).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Teste rápido em produção no VPS da fase 3 — scripts Node ESM simples, contactam diretamente o servidor .15 em produção.
# Requer: acesso ssh root@192.168.0.15 (combinações criadas/removidas através de SSH sqlite).
# Contacta fornecedores REAIS (pequeno custo). Cria/elimina apenas combinações __live_test__*. NUNCA é executado em CI.
# REQUIRE_API_KEY=false no .15, pelo que não é necessária uma chave de API, mas respeita COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY, se estiverem definidas.
npm run test:combo:live:vps              # 7 cenários HTTP (prioridade/round-robin/ponderado/custo/fusão/automático + estado)
npm run test:combo:live:vps:failover     # adiciona um cenário real de ativação pós-falha entre fornecedores (8 no total)
```

Notas sobre cobertura:

- `npm run test:coverage` mede a cobertura do código-fonte para o conjunto principal de testes unitários, exclui `tests/**` e inclui `open-sse/**`
- Os pull requests devem manter o limite de cobertura em **60%+** de instruções/linhas/funções/ramos
- Se um PR alterar código de produção em `src/`, `open-sse/`, `electron/` ou `bin/`, deverá adicionar ou atualizar testes automatizados no mesmo PR
- `npm run coverage:report` apresenta o relatório detalhado, ficheiro a ficheiro, da execução de cobertura mais recente
- `npm run test:coverage:legacy` preserva a métrica anterior para comparação histórica
- Consulte `docs/ops/COVERAGE_PLAN.md` para obter o plano faseado de melhoria da cobertura

### Requisitos dos pull requests

Antes de abrir um PR, utilize o
[Percurso recomendado de contribuição](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) para executar o ciclo direcionado às
alterações efetuadas. O conjunto completo de testes unitários (4 partições de CI), o Vitest, o limite de cobertura de **60%+** e
a compilação de produção são da responsabilidade do CI — executá-los localmente não fornece informações adicionais que as verificações
do PR ainda não forneçam e, em máquinas mais pequenas, pode saturar o sistema anfitrião (#8084):

- Execute os ficheiros de teste que abrangem a sua alteração: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Execute `npm run lint`
- Inclua ou atualize testes automatizados no mesmo PR sempre que alterar código de produção
- Inclua na descrição do PR os ficheiros de teste alterados ou adicionados quando tiver alterado código de produção
- Verifique o resultado do SonarQube no PR quando os segredos do projeto estiverem configurados no CI

Estado atual dos testes: **122 ficheiros de testes unitários**, abrangendo:

- Tradutores de fornecedores e conversão de formatos
- Limitação de taxa, disjuntor e resiliência
- Cache semântica, idempotência e acompanhamento do progresso
- Operações de base de dados e esquema (21 módulos de BD)
- Fluxos OAuth e autenticação
- Validação de endpoints da API (Zod v4)
- Ferramentas do servidor MCP e aplicação de âmbitos
- Sistemas de memória e competências

---

## Estilo de código

- **ESLint** — Execute `npm run lint` antes de fazer commit
- **Prettier** — Formatação automática através de `lint-staged` ao fazer commit (2 espaços, pontos e vírgulas, aspas duplas, largura de 100 caracteres, vírgulas finais es5)
- **TypeScript** — Todo o código em `src/` utiliza `.ts`/`.tsx`; `open-sse/` utiliza `.ts`/`.js`; documente com TSDoc (`@param`, `@returns`, `@throws`)
- **Sem `eval()`** — O ESLint aplica `no-eval`, `no-implied-eval`, `no-new-func`
- **Validação com Zod** — Utilize esquemas Zod v4 para validar todos os dados de entrada da API
- **Nomenclatura**: ficheiros = camelCase/kebab-case, componentes = PascalCase, constantes = UPPER_SNAKE

### Tratamento de erros / blocos catch vazios

Nunca deixe um `catch` sem explicação. Classifique-o numa de duas categorias (operacionaliza
a regra estrita «nunca ignorar silenciosamente erros em streams SSE»):

- **Intencional (a nossa própria limpeza/telemetria de melhor esforço)** — uma falha neste ponto é esperada e
  inofensiva; adicione um comentário de uma linha com a justificação, sem registo (o registo em cada pedido é o
  ruído que esta convenção evita).

  ```ts
  } catch {} // é esperado fechar um controlador já fechado após o cliente se desligar
  ```

- **Deve ser registado (código externo/fornecido pelo autor da chamada, ou quando ignorar o erro altera o fluxo de controlo)** — mantenha
  o catch (nunca permita que interrompa o stream), mas emita um `console.debug`/`warn` contextual para que a
  falha possa ser detetada.

  ```ts
  } catch (e) {
    console.debug("[STREAM] erro na callback onFailure:", e);
  }
  ```

Consulte `open-sse/utils/stream.ts` e `open-sse/utils/streamHandler.ts` para ver exemplos aplicados.

---

## Estrutura do Projeto

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # App Router do Next.js 16
│   ├── (dashboard)/        # Páginas do painel (23 secções)
│   ├── api/                # Rotas da API (51 diretórios)
│   └── login/              # Páginas de autenticação (.tsx)
├── domain/                 # Motor de políticas (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Lógica de negócio principal (.ts)
│   ├── a2a/                # Servidor do protocolo Agente-a-Agente v0.3
│   ├── acp/                # Registo do Agent Communication Protocol
│   ├── compliance/         # Motor de políticas de conformidade
│   ├── db/                 # Módulos de domínio SQLite + 130 migrações
│   ├── memory/             # Memória de conversação persistente
│   ├── oauth/              # Fornecedores, serviços e utilitários OAuth
│   ├── skills/             # Framework extensível de competências
│   ├── usage/              # Monitorização da utilização e cálculo de custos
│   └── localDb.ts          # Apenas camada de reexportação — nunca adicionar lógica aqui
├── middleware/              # Middleware de pedidos (promptInjectionGuard)
├── mitm/                   # Proxy MITM (certificados, DNS, encaminhamento de destinos)
├── shared/
│   ├── components/         # Componentes React (.tsx)
│   ├── constants/          # Definições de fornecedores (329), âmbitos MCP, 21 estratégias de encaminhamento
│   ├── utils/              # Disjuntor, higienizador, auxiliares de autenticação
│   └── validation/         # Esquemas Zod v4
└── sse/                    # Pipeline do proxy SSE

open-sse/                   # Workspace @omniroute/open-sse
├── executors/              # 150 módulos de execução (classes de execução + auxiliares por fornecedor)
├── handlers/               # 11 processadores de pedidos (conversação, respostas, embeddings, imagens, etc.)
├── mcp-server/             # Servidor MCP (110 ferramentas únicas, 3 transportes, 33 âmbitos)
├── services/               # 178 serviços de nível superior (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Tradutores de formatos (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformador da Responses API
└── utils/                  # 22 módulos utilitários (stream, TLS, proxy, registo)

electron/                   # Aplicação Electron para computador (multiplataforma)

tests/
├── unit/                   # Executor de testes do Node.js (1 574 ficheiros de teste)
├── integration/            # Testes de integração
├── e2e/                    # Testes Playwright
├── security/               # Testes de segurança
├── translator/             # Testes específicos do tradutor
└── load/                   # Testes de carga

docs/
├── adr/                     # Registos de Decisões de Arquitetura
├── architecture/            # Arquitetura e resiliência do sistema
├── comparison/              # OmniRoute vs. alternativas
├── compression/             # Guias e regras de compressão
├── dev/                     # Guias de desenvolvimento
├── diagrams/                # Diagramas de arquitetura
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Guia do utilizador, Docker, configuração, resolução de problemas
├── i18n/                    # Traduções internacionalizadas do README
├── marketing/               # Materiais de marketing
├── ops/                     # Implementação, proxy, cobertura, lançamentos
├── providers/               # Documentação específica dos fornecedores
├── reference/               # Referência da API, variáveis de ambiente, ferramentas CLI, escalões gratuitos
├── releases/                # Notas de lançamento
├── routing/                 # Motor de combinação automática, reprodução do raciocínio
├── screenshots/             # Capturas de ecrã do painel
├── security/                # Salvaguardas, conformidade, dissimulação, tokens
└── specs/                   # Especificações de design
```

---

## Adicionar um Novo Fornecedor

### Passo 1: Registar Constantes do Fornecedor

Adicione a `src/shared/constants/providers.ts` — validado pelo Zod aquando do carregamento do módulo.

### Passo 2: Adicionar um Executor (se for necessária lógica personalizada)

Crie um executor em `open-sse/executors/your-provider.ts`, estendendo o executor base.

### Passo 3: Adicionar um Tradutor (se o formato não for OpenAI)

Crie tradutores de pedidos/respostas em `open-sse/translator/`.

### Passo 4: Adicionar a Configuração OAuth (se for baseada em OAuth)

Adicione as credenciais OAuth em `src/lib/oauth/constants/oauth.ts` e o serviço em `src/lib/oauth/services/`.

Se o fornecedor a montante distribuir um `client_id`/segredo OAuth público ou uma chave da API Web do Firebase no respetivo CLI público / pacote para navegador, **não** o incorpore como um literal de cadeia de caracteres. Utilize `resolvePublicCred()` de `open-sse/utils/publicCreds.ts` e adicione uma entrada de bytes mascarada a `EMBEDDED_DEFAULTS`. O fluxo de trabalho completo obrigatório está documentado em [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

No interior de processadores/executores, as mensagens de erro que chegam ao cliente têm de passar por `buildErrorBody()` / `sanitizeErrorMessage()` de `open-sse/utils/error.ts` — nunca coloque `err.stack` ou `err.message` em bruto no corpo de uma resposta. Consulte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Passo 5: Registar Modelos

Adicione as definições dos modelos em `open-sse/config/providerRegistry.ts`.

### Passo 6: Adicionar Testes

Escreva testes unitários em `tests/unit/` que abranjam, no mínimo:

- Registo do fornecedor
- Tradução de pedidos/respostas
- Tratamento de erros

---

## Lista de verificação do Pull Request

- [ ] Os testes passam (`npm test`)
- [ ] A verificação de lint passa (`npm run lint`)
- [ ] A compilação é concluída com êxito (`npm run build`)
- [ ] Foram adicionados tipos TypeScript para novas funções e interfaces públicas
- [ ] Não existem segredos ou valores de recurso codificados diretamente
- [ ] As credenciais públicas de upstream são incorporadas através de `resolvePublicCred()` (consulte [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nunca como literais
- [ ] As respostas de erro são encaminhadas através de `buildErrorBody()` / `sanitizeErrorMessage()` — sem rastreios de pilha em bruto nos corpos das respostas (consulte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Os comandos de shell (`exec` / `spawn`) transmitem valores de tempo de execução através de `env`, não através de interpolação de strings
- [ ] Todas as entradas são validadas com esquemas Zod
- [ ] Foi adicionado um **fragmento** de registo de alterações em `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` para alterações visíveis para o utilizador (consulte [`changelog.d/README.md`](./changelog.d/README.md)) — **não** edite `CHANGELOG.md` diretamente; os fragmentos são agregados aquando do lançamento e nunca entram em conflito entre PRs
- [ ] A documentação foi atualizada (se aplicável)
- [ ] Não foram abertos novos alertas do CodeQL / Secret-Scanning, ou cada um foi dispensado com uma justificação técnica que referencia o documento relevante em `docs/security/`
- [ ] As rotas que iniciam processos filhos (`/api/mcp/`, `/api/cli-tools/runtime/`) estão classificadas como `isLocalOnlyPath()` em `src/server/authz/routeGuard.ts` — consulte a [Regra Rígida n.º 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Não existem trailers `Co-authored-by` de IA/bots nas mensagens de commit (Regra Rígida n.º 16) — os colaboradores humanos cujo trabalho é reutilizado são creditados com trailers padrão `Co-authored-by: Name <email>`

---

## Lançamentos

Os lançamentos são geridos através do fluxo de trabalho `/generate-release`. Quando é criado um novo GitHub Release, o pacote é **publicado automaticamente no npm** através do GitHub Actions.

Para implementações em VPS, utilize `npm run build:release` (e não `npm run build`) — este comando efetua uma
recompilação limpa, reúne o bundle em `dist/` e escreve o ficheiro sentinela `dist/BUILD_SHA`.
Em seguida, utilize as skills `/deploy-vps-*-cc`, que sincronizam `dist/` através de rsync com o diretório remoto `app/`.

---

## Obter Ajuda

- **Arquitetura**: Consulte [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referência da API**: Consulte [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Documentação de segurança**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Documentação de operações**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemas**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
