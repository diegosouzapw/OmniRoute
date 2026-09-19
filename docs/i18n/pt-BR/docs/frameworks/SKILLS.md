# Skills Framework (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Fonte da verdade:** `src/lib/skills/` e `src/app/api/skills/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute oferece um framework extensível de Skills que permite que modelos de linguagem (e operadores) componham funcionalidades reutilizáveis — desde leituras do sistema de arquivos e requisições HTTP até execução de código em sandbox e skills selecionadas do marketplace.

Uma skill é uma unidade de trabalho versionada e definida por esquema. O OmniRoute pode injetar skills como definições de ferramentas em requisições de saída, interceptar chamadas de ferramentas retornadas pelo modelo, executar o manipulador correspondente e fornecer o resultado de volta ao modelo para que a conversa possa continuar. O modelo nunca vê a implementação — apenas a interface da ferramenta.

---

## Agent Skills vs Omni Skills

O OmniRoute possui dois sistemas de skills distintos, mas complementares:

| Dimensão         | **Omni Skills** (este documento)                                                  | **Agent Skills**                                                                                     |
| :--------------- | :-------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| Finalidade       | Injeção de ferramentas para LLM + execução em sandbox                             | Catálogo SKILL.md para descoberta e consumo por agentes externos                                     |
| Fonte da verdade | `src/lib/skills/` + marketplace                                                   | `src/lib/agentSkills/` + diretório `skills/`                                                         |
| Modo de execução | Injetadas em requisições de saída, executadas em eventos de chamada de ferramenta | Catálogo estático em markdown + endpoints de descoberta REST/MCP/A2A                                 |
| Quem utiliza     | O próprio OmniRoute (roteamento combinado, chamadas de entrada para LLM)          | Agentes externos, clientes MCP, orquestradores A2A                                                   |
| Quantidade       | Variável (determinada pelo marketplace)                                           | 45 entradas no catálogo (23 de API + 21 de CLI + 1 de configuração)                                  |
| Formato          | `SkillDefinition` com esquema da ferramenta + manipulador                         | Frontmatter de `SKILL.md` + corpo em markdown                                                        |
| Descoberta       | REST `/api/skills/*` + ferramentas MCP `omniroute_skills_*`                       | REST `/api/agent-skills/*` + ferramentas MCP `omniroute_agent_skills_*` + `list-capabilities` do A2A |

As **Omni Skills** são o mecanismo de execução — elas definem o que o OmniRoute _pode fazer_ quando uma LLM invoca uma ferramenta.

As **Agent Skills** são o catálogo de documentação — elas explicam a agentes externos _como usar_ a API REST e a CLI do OmniRoute, com arquivos SKILL.md estruturados que podem ser fornecidos diretamente aos prompts dos agentes.

Para conhecer o catálogo, o gerador, as ferramentas MCP e a skill A2A das Agent Skills, consulte [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Conceitos

### Fontes de skills

Três fontes de skills coexistem no mesmo registro:

1. **Skills integradas** (`src/lib/skills/builtins.ts`) — fornecidas com o OmniRoute. Abrangem os casos comuns:
   - `file_read`, `file_write` — workspace em sandbox por chave de API em `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP de saída por meio de `safeOutboundFetch` com `guard: "public-only"`
   - `web_search` — provedor de pesquisa conectável com cache (`executeWebSearch`)
   - `eval_code` — execução de `node` ou `python` em sandbox Docker
   - `execute_command` — comando de shell em sandbox Docker
   - `browser` — estrutura baseada em Playwright, desabilitada por padrão (`builtin/browser.ts`)
2. **SkillsMP** (o Marketplace do OmniRoute) — obtidas de `https://skillsmp.com/api/v1/skills/search`. Requer `skillsmpApiKey` nas Configurações.
3. **SkillsSH** (catálogo da comunidade `skills.sh`) — obtidas de `https://skills.sh/api/search`. Não requer autenticação; o conteúdo de SKILL.md é obtido do conteúdo bruto do GitHub.

Um único "provedor ativo" controla de qual catálogo o dashboard realiza instalações (`src/lib/skills/providerSettings.ts`). Altere-o em **Configurações → Memória e Skills**. Padrão: `skillsmp`.

### Identidade da skill

As skills são identificadas por `name@version` no registro em memória (`src/lib/skills/registry.ts`). A versão deve seguir semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` reconhece as restrições `^`, `~`, `>`, `>=`, `<`, `<=`, `==` e de correspondência exata.

### Modo da skill

Cada skill possui um modo de execução que controla quando ela é injetada:

| Modo   | Comportamento                                                                                             |
| ------ | --------------------------------------------------------------------------------------------------------- |
| `on`   | Sempre injetada como uma definição de ferramenta                                                          |
| `off`  | Nunca injetada, nunca executável                                                                          |
| `auto` | Avaliada em relação à requisição recebida; injetada somente se a pontuação ≥ `AUTO_MIN_SCORE` (padrão: 3) |

`auto` é o padrão para skills instaladas pelo marketplace. `enabled=true` e `mode="off"` juntos significam "registrada, mas inativa" — alternar `enabled` por meio da coluna legada também atualiza `mode`, para que os fluxos de código mais antigos permaneçam consistentes (`src/app/api/skills/[id]/route.ts`).

### Status (execuções)

As execuções de skills são registradas na tabela `skill_executions` com os seguintes status (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache do registro

`SkillRegistry` é um singleton com cache TTL de 60 segundos (`registry.ts:14`). `loadFromDatabase()` é idempotente e elimina chamadas simultâneas duplicadas por meio de `pendingLoad`. Qualquer gravação (`register`/`unregister`/`unregisterById`) invalida o cache. Consulte versões por meio de `getSkillVersions(name)` e `resolveVersion(name, constraint)`.

### Injeção específica por provedor

`injectSkills()` em `src/lib/skills/injection.ts` é o ponto de entrada que transforma skills registradas em definições de ferramentas específicas de cada provedor:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

O nome da ferramenta é codificado como `name@version` para que o manipulador possa selecionar a versão correta quando o modelo fizer a chamada de retorno.

### Pontuação AUTO

Quando `mode="auto"`, cada habilidade candidata é pontuada em relação ao contexto da solicitação (`scoreAutoSkill()` em `injection.ts`):

| Sinal                                                              | Pontos       |
| ------------------------------------------------------------------ | ------------ |
| O nome da habilidade aparece literalmente no contexto              | +6           |
| Cada token do nome corresponde a um token do contexto              | +2           |
| Cada substring de tag corresponde ao contexto                      | +3           |
| Cada token da descrição corresponde ao contexto                    | +1           |
| O motivo em segundo plano corresponde a um token do nome           | +2 por token |
| O motivo em segundo plano corresponde a uma tag                    | +2 por token |
| A dica de provedor nas tags corresponde ao provedor da solicitação | +2 / −2      |

As `AUTO_MAX_SKILLS = 5` habilidades com maior pontuação e `score >= AUTO_MIN_SCORE = 3` são injetadas. Os empates são resolvidos por `installCount` (decrescente) e, em seguida, pelo nome em ordem alfabética (`injection.ts:225-235`).

### Interceptação de chamadas de ferramentas

`handleToolCallExecution()` em `src/lib/skills/interception.ts` é invocada pelo manipulador de chat depois que o provedor upstream retorna uma resposta de chamada de ferramenta:

1. `extractToolCalls()` lê formatos específicos de cada provedor (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Os aliases de ferramentas integradas (por exemplo, `omniroute_web_search` → `web_search`) são resolvidos primeiro. Os manipuladores integrados são executados diretamente.
3. Todo o restante é encaminhado por meio de `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Os resultados são inseridos novamente na resposta — itens `tool_results`, `function_call_output` ou blocos `tool_result` da Anthropic, conforme apropriado.

`customSkillExecutionEnabled` no contexto de execução pode ser definido como `false` para permitir apenas a interceptação integrada (usado por caminhos de solicitação que desabilitam explicitamente manipuladores definidos pelo usuário).

---

## Sandbox do Docker

Caminhos de código não integrados (`eval_code`, `execute_command`) são executados dentro do Docker por meio de `SandboxRunner` (`src/lib/skills/sandbox.ts`). Cada contêiner é iniciado com:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (quando readOnly=true)
```

Valores padrão (`SandboxRunner.DEFAULT_CONFIG`):

| Campo            | Padrão          | Observações                                              |
| ---------------- | --------------- | -------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Dividido por 1000 antes de ser passado para `--cpus`     |
| `memoryLimit`    | 256 MB          | Limite rígido                                            |
| `timeout`        | 30000 ms        | Encerramento suave via `SIGTERM` + `docker kill`         |
| `networkEnabled` | `false`         | Torna-se `--network none`                                |
| `readOnly`       | `true`          | FS raiz somente leitura; `/tmp` e `/workspace` são tmpfs |

`SandboxRunner.kill(id)` e `killAll()` são expostos para encerramento; os contêineres em execução são rastreados em `runningContainers: Map<string, ChildProcess>`.

### Variáveis de ambiente do sandbox

Configuradas por meio de `process.env` em `src/lib/skills/builtins.ts`:

| Variável de ambiente              | Padrão           | Finalidade                                                                             |
| --------------------------------- | ---------------- | -------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Limite para `file_read` e `file_write`                                                 |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Limite para o corpo da resposta de `http_request`                                      |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Limite para stdout/stderr retornados ao chamador                                       |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Timeout padrão para comandos em sandbox; limitado a 60 s                               |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Controle mestre de saída. Defina como `1` ou `true` para permitir ativação por chamada |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (veja abaixo)    | Lista de imagens do Docker permitidas, separadas por vírgulas                          |

Imagens permitidas por padrão: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Quaisquer adições por meio de `SKILLS_ALLOWED_SANDBOX_IMAGES` são mescladas com os padrões; imagens desconhecidas são rejeitadas por `normalizeImage()`.

> Observação: não há uma variável de ambiente `SKILLS_EXECUTION_TIMEOUT_MS` separada. O timeout do manipulador fora do sandbox é fixado em 30 s no `SkillExecutor` (`executor.ts:13`), mas pode ser substituído em tempo de execução por meio de `skillExecutor.setTimeout(ms)`.

### Isolamento do espaço de trabalho

`file_read` e `file_write` resolvem todos os caminhos relativos a um espaço de trabalho por chave de API em `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. A travessia de caminhos (`..`) e segmentos proibidos (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) são rejeitados antes de qualquer E/S de disco.

### Reforço de segurança HTTP

`http_request` (`builtins.ts:257`):

- Lista de métodos permitidos: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Cabeçalhos de saída bloqueados: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Redirecionamentos desativados (`allowRedirect: false`)
- Roteado por meio de `safeOutboundFetch` com `guard: "public-only"` (intervalos privados/de loopback bloqueados)
- Resposta truncada em `SKILLS_MAX_HTTP_RESPONSE_BYTES`; o cliente recebe `truncated: true`

---

## Executor híbrido (prévia)

`src/lib/skills/hybrid.ts` define um `HybridExecutor` que decide entre a execução `direct` (no processo) e `sandbox` a cada chamada, com um caminho de nova tentativa `autoUpgrade` em caso de erros de tempo limite/memória. As implementações integradas de `directExecutor` / `sandboxRunner` são stubs (`executeDirect`, `executeInSandbox` retornam objetos de espaço reservado) — considere este módulo um contrato em construção. A execução real ainda ocorre por meio de `skillExecutor` + `SandboxRunner`.

---

## Armazenamento

O esquema está definido em duas migrações:

- `src/lib/db/migrations/016_create_skills.sql` — tabelas básicas `skills` e `skill_executions`, com índices em `(api_key_id, name)` e `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — adiciona `mode`, `source_provider`, `tags` (JSON), `install_count` a `skills`.

`skill_executions.status` tem uma restrição no nível do banco de dados: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API REST

Todos os endpoints estão em `src/app/api/skills/`. Os endpoints de gerenciamento (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) exigem **autenticação de gerenciamento** por meio de `requireManagementAuth()`. Os fluxos de marketplace/instalação usam o `isAuthenticated()` mais simples (sessão ou chave de API).

| Endpoint | Método | Finalidade |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Lista as skills registradas. Oferece suporte a `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, paginação |
| `/api/skills/[id]` | PUT | Atualiza `enabled` ou `mode` |
| `/api/skills/[id]` | DELETE | Remove o registro por ID |
| `/api/skills/install` | POST | Instala uma skill personalizada (código do handler + esquema) |
| `/api/skills/marketplace` | GET | Pesquisa o catálogo SkillsMP (retorna opções populares padrão quando `q` está vazio) |
| `/api/skills/marketplace/install` | POST | Instala uma skill do SkillsMP (exige provedor ativo = `skillsmp`) |
| `/api/skills/skillssh` | GET | Pesquisa o catálogo skills.sh (`?q=&limit=`, limitado a 100) |
| `/api/skills/skillssh/install` | POST | Instala uma skill do skills.sh (exige provedor ativo = `skillssh`) |
| `/api/skills/executions` | GET | Histórico paginado de execuções (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Executa uma skill registrada de forma ad hoc |

O endpoint `POST /api/skills/executions` retorna HTTP `503` com `{ error: "Skills execution is disabled..." }` quando `settings.skillsEnabled === false` (`executor.ts:42-45`). Os operadores podem alterar a chave mestra em **Configurações → IA**.

### Exemplo: instalar uma skill personalizada

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

A string `handlerCode` é uma **consulta pelo nome do handler** — não é código executável. O executor a mapeia por meio de `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). As instalações do marketplace armazenam o texto de SKILL.md nesse campo como documentação e direcionam a execução por meio de chamadas de ferramentas geradas pelo modelo. O código-fonte arbitrário fornecido pelo usuário não é avaliado com `eval`.

---

## Ferramentas MCP

Quatro ferramentas MCP encapsulam a superfície de skills (`open-sse/mcp-server/tools/skillTools.ts`). Elas são registradas automaticamente quando o servidor MCP é inicializado.

| Ferramenta                    | Descrição                                                      |
| ----------------------------- | -------------------------------------------------------------- |
| `omniroute_skills_list`       | Lista skills; filtros opcionais: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Ativa/desativa uma skill por `skillId`                         |
| `omniroute_skills_execute`    | Executa uma skill com um payload de entrada                    |
| `omniroute_skills_executions` | Histórico de execuções recentes (padrão: 50; máximo: 100)      |

Consulte [MCP-SERVER.md](./MCP-SERVER.md) para a configuração de transporte e as atribuições de escopo.

---

## Integração A2A

`src/lib/skills/a2a.ts` exporta o descritor da skill A2A `memory_aware_routing` e um auxiliar `registerA2ASkill(registry)`. As skills A2A personalizadas ficam em `src/lib/a2a/skills/` e são despachadas por meio de `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Consulte [A2A-SERVER.md](./A2A-SERVER.md) para conhecer o ciclo de vida completo das tarefas.

---

## Como adicionar uma nova skill integrada

1. **Defina o handler** em `src/lib/skills/builtins.ts` (ou em um arquivo relacionado em `src/lib/skills/builtin/`). Assinatura: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Caminho de código em sandbox?** Chame `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Use `normalizeImage()` em relação à lista de permissões.
3. **Caminho do sistema de arquivos?** Sempre passe por `resolveWorkspacePath(input, context)` antes de acessar o disco.
4. **Chamada de rede?** Use `safeOutboundFetch` com `guard: "public-only"`; higienize os cabeçalhos por meio de `sanitizeHeaders()`.
5. **Registre** adicionando a entrada a `builtinSkills` (ou chamando algo no estilo `registerBrowserSkill(executor)` durante a inicialização).
6. **Configure aliases de ferramentas integradas** (opcional) em `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) caso o modelo upstream emita um nome diferente.
7. **Testes** em `src/lib/skills/__tests__/` (Vitest).

---

## Como adicionar uma skill personalizada (não integrada)

1. Registre o handler na inicialização do processo:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Insira a skill por meio de `POST /api/skills/install` (o campo `handlerCode` deve corresponder ao nome do handler registrado).
3. Altere `mode` para `on` ou `auto` por meio de `PUT /api/skills/[id]`.

---

## Dicas operacionais

- **Chave geral:** `settings.skillsEnabled = false` bloqueia todas as execuções e retorna HTTP `503` em `/api/skills/executions`. O registro continua sendo carregado.
- **Restrinja o tráfego de saída:** mantenha `SKILLS_SANDBOX_NETWORK_ENABLED` não definida (padrão) para um sandbox totalmente isolado da rede. A opção `networkEnabled: true` por chamada ainda exige a habilitação geral.
- **Permita imagens específicas:** defina `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` para ampliar a lista de permissões.
- **Audite execuções:** `/dashboard/skills/executions` e `omniroute_skills_executions` consultam `skill_executions`. Execuções bem-sucedidas incluem `durationMs`; falhas incluem `errorMessage`.
- **Invalidação de cache:** chame `skillRegistry.invalidateCache()` após edições manuais no banco de dados; caso contrário, aguarde 60 s.
- **Workspace anônimo:** quando `apiKeyId` está vazio, todas as chamadas geram hash para o mesmo workspace `"anonymous"` — códigos que consideram compartilhamento devem sempre fornecer uma chave real.

---

## Ciclo de vida da execução (v3.8.16+)

O `SkillExecutor` (`src/lib/skills/executor.ts`) é um **singleton** que gerencia todas as invocações de skills. Entender seu ciclo de vida é essencial para depurar tempos limite, novas tentativas e o estado da execução.

### O ciclo de vida em 5 estágios

```
   execute() chamado
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← na fila, ainda não iniciado (linha criada no BD)
  └──────┬──────┘
         │ iniciar handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler invocado com tempo limite
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (nenhum outro caminho — encerrado pelo processo pai)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Linha do BD atualizada com status, saída e durationMs
```

### Configuração padrão

| Configuração | Padrão        | Configurável por meio de             |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Importante**: O executor é um singleton — chamar `setTimeout()` afeta globalmente todas as invocações subsequentes. Tempos limite por skill não são compatíveis no momento; se precisar de tempos limite diferentes para cada skill, envie processos separados ou crie um fork do executor.

### Valores de status

De `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Na fila, ainda não iniciado
  RUNNING = "running", // Handler invocado
  SUCCESS = "success", // O handler retornou uma saída válida
  ERROR = "error", // O handler lançou uma exceção
  TIMEOUT = "timeout", // Excedeu o tempo limite do executor
}
```

> **Observação**: O status `TIMEOUT` está definido no enum, mas **na realidade não é gravado no BD** pela implementação atual do executor — tempos limite são apresentados como `ERROR` com a mensagem `"Skill execution timed out"`. O enum de status está reservado para uso futuro.

### Inspeção de execuções

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Obter uma execução específica pelo ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Listar execuções recentes de uma chave de API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Contar o total de execuções
const total = skillExecutor.countExecutions("api-key-id");
```

### Comportamento das novas tentativas

A configuração `maxRetries` é armazenada, mas **não é usada no momento** pelo método `execute()` do executor — ele realiza apenas uma tentativa. O valor de `maxRetries` é exposto para implementação futura e para hooks que queiram consultá-lo.

Por enquanto, as novas tentativas devem ser implementadas dentro do próprio handler da skill. As skills
integradas são registradas no executor (por exemplo, `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` em `src/lib/skills/builtin/`); qualquer handler
que você registrar pode encapsular seu próprio loop de novas tentativas:

```ts
// dentro de um handler de skill
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode em Detalhes

O enum `SkillMode` (`src/lib/skills/types.ts`) controla **quando e como** as skills são invocadas:

```ts
enum SkillMode {
  AUTO = "auto", // O LLM decide quando chamar a skill
  MANUAL = "manual", // Invocada somente por solicitação explícita do usuário
  HYBRID = "hybrid", // Pontuação AUTO + substituição manual
}
```

> **Observação**: O código define `SkillMode` (AUTO/MANUAL/HYBRID), enquanto o campo `Skill.mode` usa um formato diferente (`"on" | "off" | "auto"`). Eles estão relacionados, mas não são idênticos — `SkillMode` é usado para a política do executor, enquanto `Skill.mode` é usado para habilitar ou desabilitar cada skill individualmente.

### Quando Usar Cada Modo

| Modo     | Comportamento do LLM                                                                       | Caso de uso                                                   |
| -------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `AUTO`   | O LLM pode chamar a skill quando considerar necessário                                     | Skills de uso geral (leitura de arquivos, requisições HTTP)   |
| `MANUAL` | O LLM não pode chamar a skill; somente uma chamada explícita à API `executeSkill` a invoca | Operações sensíveis (gravações em banco de dados, pagamentos) |
| `HYBRID` | O LLM pode sugerir a skill; o usuário precisa confirmar                                    | Skills que têm efeitos colaterais, mas não são perigosas      |

### Pontuação AUTO

Quando o modo `AUTO` está ativo, cada skill candidata recebe uma pontuação em relação ao contexto
da solicitação por meio de `scoreAutoSkill()` em `src/lib/skills/injection.ts` — um sistema aditivo
de pontos inteiros (correspondência do nome da skill, sobreposição de tokens de nome/tag/descrição,
indícios de motivos em segundo plano, bônus/penalidade por indício de provedor). As
`AUTO_MAX_SKILLS = 5` skills mais bem classificadas com `score >= AUTO_MIN_SCORE = 3` são injetadas como
ferramentas que podem ser chamadas, com empates resolvidos por `installCount` e depois pelo nome. Consulte a tabela completa de pontos
em [**Geração do Esquema de Ferramentas → Pontuação AUTO**](#auto-scoring), apresentada anteriormente neste
documento; não há um limite de ponto flutuante no estilo `0.6`, nem pontuação em `registry.ts`.

---

## Catálogo de Skills Integradas

O OmniRoute inclui um conjunto selecionado de skills integradas em `src/lib/skills/builtin/`. As mais comuns são:

### Skill de Automação de Navegador

A skill de navegador (`src/lib/skills/builtin/browser.ts`) fornece automação de navegador headless por meio do Playwright/Puppeteer. **Ela está implementada, mas não faz parte do catálogo padrão de skills** — para usá-la, instale separadamente o plugin de extensão do navegador.

```ts
// Habilite na sua configuração
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Sempre exige invocação explícita
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s para carregamentos de página
  maxRetries: 1,
};
```

### Outras Categorias Integradas

| Categoria          | Skills                                         | Modo   |
| ------------------ | ---------------------------------------------- | ------ |
| E/S de arquivos    | `file_read`, `file_write`                      | AUTO   |
| HTTP               | `http_request`                                 | AUTO   |
| Pesquisa           | `web_search`                                   | AUTO   |
| Execução de código | `eval_code` (JavaScript/Python em sandbox)     | HYBRID |
| Sistema            | `execute_command` (execução de CLI em sandbox) | MANUAL |

### Como Adicionar uma Skill Personalizada

Consulte [SDK de Plugins e Integração de Skills](./PLUGIN_SDK.md) para saber como adicionar uma skill personalizada por meio do sistema de plugins.

---

## Veja Também

- [MCP-SERVER.md](./MCP-SERVER.md) — registro de ferramentas MCP e transportes
- [A2A-SERVER.md](./A2A-SERVER.md) — ciclo de vida das tarefas A2A e encaminhamento de skills
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — introdução voltada ao usuário
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — pipeline de requisições e mapa de componentes
- Código-fonte: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testes: `src/lib/skills/__tests__/integration.test.ts`
