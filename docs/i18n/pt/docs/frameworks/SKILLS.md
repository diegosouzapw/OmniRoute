# Skills Framework (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Fonte canónica:** `src/lib/skills/` e `src/app/api/skills/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute disponibiliza uma framework extensível de Skills que permite aos modelos de linguagem (e aos operadores) compor capacidades reutilizáveis — desde leituras do sistema de ficheiros e pedidos HTTP até à execução de código em sandbox e Skills selecionadas do marketplace.

Uma Skill é uma unidade de trabalho com controlo de versão e definida por um esquema. O OmniRoute pode injetar Skills como definições de ferramentas em pedidos enviados, intercetar chamadas de ferramentas devolvidas pelo modelo, executar o handler correspondente e enviar o resultado de volta ao modelo para que a conversa possa continuar. O modelo nunca vê a implementação — apenas a interface da ferramenta.

---

## Agent Skills vs Omni Skills

O OmniRoute tem dois sistemas de Skills distintos, mas complementares:

| Dimensão         | **Omni Skills** (este documento)                                              | **Agent Skills**                                                                                  |
| :--------------- | :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| Finalidade       | Injeção de ferramentas no LLM + execução em sandbox                           | Catálogo SKILL.md para agentes externos descobrirem e utilizarem                                  |
| Fonte canónica   | `src/lib/skills/` + marketplace                                               | `src/lib/agentSkills/` + diretório `skills/`                                                      |
| Modo de execução | Injetadas em pedidos enviados, executadas em eventos de chamada de ferramenta | Catálogo markdown estático + endpoints de descoberta REST/MCP/A2A                                 |
| Quem as utiliza  | O próprio OmniRoute (encaminhamento combinado, chamadas LLM recebidas)        | Agentes externos, clientes MCP, orquestradores A2A                                                |
| Quantidade       | Variável (determinada pelo marketplace)                                       | 45 entradas no catálogo (23 API + 21 CLI + 1 configuração)                                        |
| Formato          | `SkillDefinition` com esquema da ferramenta + handler                         | Frontmatter de `SKILL.md` + corpo em markdown                                                     |
| Descoberta       | REST `/api/skills/*` + ferramentas MCP `omniroute_skills_*`                   | REST `/api/agent-skills/*` + ferramentas MCP `omniroute_agent_skills_*` + `list-capabilities` A2A |

As **Omni Skills** são o motor de execução — definem o que o OmniRoute _pode fazer_ quando um LLM invoca uma ferramenta.

As **Agent Skills** são o catálogo de documentação — explicam a agentes externos _como utilizar_ a API REST e a CLI do OmniRoute, através de ficheiros SKILL.md estruturados que podem ser fornecidos diretamente aos prompts dos agentes.

Para obter informações sobre o catálogo de Agent Skills, o gerador, as ferramentas MCP e a Skill A2A, consulte [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Conceitos

### Fontes de Skills

Três fontes de Skills coexistem no mesmo registo:

1. **Skills integradas** (`src/lib/skills/builtins.ts`) — incluídas no OmniRoute. Abrangem os casos comuns:
   - `file_read`, `file_write` — espaço de trabalho em sandbox por chave de API em `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP enviado através de `safeOutboundFetch` com `guard: "public-only"`
   - `web_search` — fornecedor de pesquisa substituível com cache (`executeWebSearch`)
   - `eval_code` — execução de `node` ou `python` numa sandbox Docker
   - `execute_command` — comando de shell executado numa sandbox Docker
   - `browser` — estrutura baseada no Playwright, desativada por predefinição (`builtin/browser.ts`)
2. **SkillsMP** (o Marketplace do OmniRoute) — obtidas a partir de `https://skillsmp.com/api/v1/skills/search`. Requer `skillsmpApiKey` nas Definições.
3. **SkillsSH** (catálogo da comunidade `skills.sh`) — obtidas a partir de `https://skills.sh/api/search`. Não requer autenticação; o conteúdo de SKILL.md é obtido diretamente dos ficheiros raw do GitHub.

Um único "fornecedor ativo" controla o catálogo a partir do qual o painel instala Skills (`src/lib/skills/providerSettings.ts`). Altere-o em **Definições → Memória e Skills**. Predefinição: `skillsmp`.

### Identidade das Skills

As Skills são identificadas por `name@version` no registo em memória (`src/lib/skills/registry.ts`). A versão tem de seguir semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` reconhece as restrições `^`, `~`, `>`, `>=`, `<`, `<=`, `==` e de correspondência exata.

### Modo das Skills

Cada Skill tem um modo de execução que controla quando é injetada:

| Modo   | Comportamento                                                                                                   |
| ------ | --------------------------------------------------------------------------------------------------------------- |
| `on`   | Sempre injetada como definição de ferramenta                                                                    |
| `off`  | Nunca injetada nem executável                                                                                   |
| `auto` | Avaliada em relação ao pedido recebido; injetada apenas se a pontuação for ≥ `AUTO_MIN_SCORE` (predefinição: 3) |

`auto` é a predefinição para Skills instaladas a partir do marketplace. `enabled=true` e `mode="off"` em conjunto significam "registada, mas inativa" — alternar `enabled` através da coluna legada também atualiza `mode`, para que os fluxos de código mais antigos permaneçam consistentes (`src/app/api/skills/[id]/route.ts`).

### Estado (execuções)

As execuções de Skills são registadas na tabela `skill_executions` com os seguintes estados (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache do Registo

`SkillRegistry` é um singleton com uma cache TTL de 60 segundos (`registry.ts:14`). `loadFromDatabase()` é idempotente e elimina chamadas simultâneas duplicadas através de `pendingLoad`. Qualquer operação de escrita (`register`/`unregister`/`unregisterById`) invalida a cache. Consulte versões através de `getSkillVersions(name)` e `resolveVersion(name, constraint)`.

### Injeção Sensível ao Fornecedor

`injectSkills()` em `src/lib/skills/injection.ts` é o ponto de entrada que transforma as Skills registadas em definições de ferramentas específicas de cada fornecedor:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

O nome da ferramenta é codificado como `name@version`, para que o processador possa selecionar a versão correta quando o modelo a invocar.

### Pontuação AUTO

Quando `mode="auto"`, cada competência candidata é pontuada em relação ao contexto do pedido (`scoreAutoSkill()` em `injection.ts`):

| Sinal                                                                       | Pontos       |
| --------------------------------------------------------------------------- | ------------ |
| O nome da competência aparece literalmente no contexto                      | +6           |
| Cada token do nome corresponde a um token do contexto                       | +2           |
| Cada subcadeia de etiqueta corresponde ao contexto                          | +3           |
| Cada token da descrição corresponde ao contexto                             | +1           |
| O motivo em segundo plano corresponde a um token do nome                    | +2 por token |
| O motivo em segundo plano corresponde a uma etiqueta                        | +2 por token |
| A indicação do fornecedor nas etiquetas corresponde ao fornecedor do pedido | +2 / −2      |

As `AUTO_MAX_SKILLS = 5` competências mais bem classificadas com `score >= AUTO_MIN_SCORE = 3` são injetadas. Os empates são resolvidos por `installCount` (descendente) e, em seguida, pelo nome por ordem alfabética (`injection.ts:225-235`).

### Interceção de Chamadas de Ferramentas

`handleToolCallExecution()` em `src/lib/skills/interception.ts` é invocada pelo processador de conversação depois de o serviço a montante devolver uma resposta com uma chamada de ferramenta:

1. `extractToolCalls()` lê os formatos específicos do fornecedor (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Os aliases das ferramentas incorporadas (por exemplo, `omniroute_web_search` → `web_search`) são resolvidos primeiro. Os processadores incorporados são executados diretamente.
3. Tudo o resto é encaminhado através de `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Os resultados são reinseridos na resposta — itens `tool_results`, `function_call_output` ou blocos `tool_result` da Anthropic, conforme apropriado.

`customSkillExecutionEnabled` no contexto de execução pode ser definido como `false` para permitir apenas a interceção incorporada (utilizada por caminhos de pedidos que desativam explicitamente os processadores definidos pelo utilizador).

---

## Sandbox Docker

Os caminhos de código não incorporados (`eval_code`, `execute_command`) são executados dentro do Docker através de `SandboxRunner` (`src/lib/skills/sandbox.ts`). Cada contentor é iniciado com:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (quando readOnly=true)
```

Predefinições (`SandboxRunner.DEFAULT_CONFIG`):

| Campo            | Predefinição    | Notas                                                  |
| ---------------- | --------------- | ------------------------------------------------------ |
| `cpuLimit`       | 100 (= 0,1 CPU) | Dividido por 1000 antes de ser transmitido a `--cpus`  |
| `memoryLimit`    | 256 MB          | Limite rígido                                          |
| `timeout`        | 30000 ms        | Terminação normal via `SIGTERM` + `docker kill`        |
| `networkEnabled` | `false`         | Converte-se em `--network none`                        |
| `readOnly`       | `true`          | FS raiz só de leitura; `/tmp` e `/workspace` são tmpfs |

`SandboxRunner.kill(id)` e `killAll()` são disponibilizados para o encerramento; os contentores em execução são monitorizados em `runningContainers: Map<string, ChildProcess>`.

### Variáveis de ambiente da sandbox

Configuradas através de `process.env` em `src/lib/skills/builtins.ts`:

| Variável de ambiente              | Predefinição     | Finalidade                                                                                  |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Limite para `file_read` e `file_write`                                                      |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Limite para o corpo da resposta de `http_request`                                           |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Limite para stdout/stderr devolvido ao autor da chamada                                     |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Tempo limite predefinido para comandos em sandbox; limitado a 60 s                          |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Controlo principal de saída. Defina como `1` ou `true` para permitir a ativação por chamada |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (ver abaixo)     | Lista, separada por vírgulas, de imagens Docker permitidas                                  |

Imagens permitidas por predefinição: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Quaisquer adições através de `SKILLS_ALLOWED_SANDBOX_IMAGES` são combinadas com as predefinições; imagens desconhecidas são rejeitadas por `normalizeImage()`.

> Nota: não existe uma variável de ambiente `SKILLS_EXECUTION_TIMEOUT_MS` separada. O tempo limite do processador fora da sandbox está definido diretamente como 30 s em `SkillExecutor` (`executor.ts:13`), mas pode ser substituído em tempo de execução através de `skillExecutor.setTimeout(ms)`.

### Isolamento do espaço de trabalho

`file_read` e `file_write` resolvem todos os caminhos relativamente a um espaço de trabalho por chave de API em `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. O atravessamento de caminhos (`..`) e os segmentos proibidos (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) são rejeitados antes de qualquer E/S em disco.

### Reforço de segurança HTTP

`http_request` (`builtins.ts:257`):

- Lista de métodos permitidos: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Cabeçalhos de saída bloqueados: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Redirecionamentos desativados (`allowRedirect: false`)
- Encaminhado através de `safeOutboundFetch` com `guard: "public-only"` (intervalos privados/de loopback bloqueados)
- Resposta truncada em `SKILLS_MAX_HTTP_RESPONSE_BYTES`; o cliente recebe `truncated: true`

---

## Executor híbrido (pré-visualização)

`src/lib/skills/hybrid.ts` define um `HybridExecutor` que decide entre a execução `direct` (no processo) e `sandbox` em cada chamada, com um caminho de repetição `autoUpgrade` em caso de erros de tempo limite/memória. As implementações `directExecutor` / `sandboxRunner` integradas são stubs (`executeDirect`, `executeInSandbox` devolvem objetos de marcador de posição) — trate este módulo como um contrato em desenvolvimento. A execução real continua a ser efetuada através de `skillExecutor` + `SandboxRunner`.

---

## Armazenamento

O esquema encontra-se em duas migrações:

- `src/lib/db/migrations/016_create_skills.sql` — tabelas base `skills` e `skill_executions`, com índices em `(api_key_id, name)` e `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — adiciona `mode`, `source_provider`, `tags` (JSON), `install_count` a `skills`.

`skill_executions.status` é restringido ao nível da base de dados: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API REST

Todos os endpoints encontram-se em `src/app/api/skills/`. Os endpoints de gestão (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) requerem **autenticação de gestão** através de `requireManagementAuth()`. Os fluxos do marketplace/de instalação utilizam o `isAuthenticated()` mais simples (sessão ou chave de API).

| Endpoint | Método | Finalidade |
| --------------------------------- | ------ | ------------------------------------------------------------------------- | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Lista as skills registadas. Suporta `?q=`, `?mode=on                      | off | auto`, `?source=skillsmp | skillssh | local`, paginação |
| `/api/skills/[id]` | PUT | Atualiza `enabled` ou `mode` |
| `/api/skills/[id]` | DELETE | Remove o registo por id |
| `/api/skills/install` | POST | Instala uma skill personalizada (código do handler + esquema) |
| `/api/skills/marketplace` | GET | Pesquisa o catálogo SkillsMP (devolve opções populares predefinidas quando `q` está vazio) |
| `/api/skills/marketplace/install` | POST | Instala uma skill do SkillsMP (requer fornecedor ativo = `skillsmp`) |
| `/api/skills/skillssh` | GET | Pesquisa o catálogo skills.sh (`?q=&limit=`, limitado a 100) |
| `/api/skills/skillssh/install` | POST | Instala uma skill do skills.sh (requer fornecedor ativo = `skillssh`) |
| `/api/skills/executions` | GET | Histórico de execuções paginado (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Executa uma skill registada de forma ad hoc |

O endpoint `POST /api/skills/executions` devolve HTTP `503` com `{ error: "Skills execution is disabled..." }` quando `settings.skillsEnabled === false` (`executor.ts:42-45`). Os operadores podem alterar o interruptor principal em **Definições → IA**.

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

A string `handlerCode` é uma **pesquisa pelo nome do handler** — não é código executável. O executor mapeia-a através de `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). As instalações do marketplace guardam o texto SKILL.md neste campo como documentação e encaminham a execução através de chamadas de ferramentas geradas pelo modelo. O código-fonte arbitrário fornecido pelo utilizador não é avaliado com eval.

## Ferramentas MCP

Quatro ferramentas MCP encapsulam a interface de competências (`open-sse/mcp-server/tools/skillTools.ts`). São registadas automaticamente quando o servidor MCP arranca.

| Ferramenta                    | Descrição                                                            |
| ----------------------------- | -------------------------------------------------------------------- |
| `omniroute_skills_list`       | Lista competências; filtros opcionais: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Ativa/desativa uma competência através de `skillId`                  |
| `omniroute_skills_execute`    | Executa uma competência com um payload de entrada                    |
| `omniroute_skills_executions` | Histórico de execuções recentes (predefinição: 50, máximo: 100)      |

Consulte [MCP-SERVER.md](./MCP-SERVER.md) para obter informações sobre a configuração do transporte e as atribuições de âmbito.

---

## Integração A2A

`src/lib/skills/a2a.ts` exporta o descritor da competência A2A `memory_aware_routing` e uma função auxiliar `registerA2ASkill(registry)`. As competências A2A personalizadas encontram-se em `src/lib/a2a/skills/` e são encaminhadas através de `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Consulte [A2A-SERVER.md](./A2A-SERVER.md) para conhecer o ciclo de vida completo das tarefas.

---

## Adicionar uma Nova Competência Incorporada

1. **Defina o processador** em `src/lib/skills/builtins.ts` (ou num ficheiro adjacente em `src/lib/skills/builtin/`). Assinatura: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Caminho de código em sandbox?** Chame `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Use `normalizeImage()` em relação à lista de permissões.
3. **Caminho do sistema de ficheiros?** Passe-o sempre por `resolveWorkspacePath(input, context)` antes de aceder ao disco.
4. **Chamada de rede?** Use `safeOutboundFetch` com `guard: "public-only"`; higienize os cabeçalhos através de `sanitizeHeaders()`.
5. **Registe-a**, adicionando a entrada a `builtinSkills` (ou chamando algo semelhante a `registerBrowserSkill(executor)` durante o arranque).
6. **Configure os aliases das ferramentas incorporadas** (opcional) em `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), caso o modelo a montante emita um nome diferente.
7. **Testes** em `src/lib/skills/__tests__/` (Vitest).

---

## Adicionar uma Competência Personalizada (Não Incorporada)

1. Registe o processador no arranque do processo:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Insira a competência através de `POST /api/skills/install` (o campo `handlerCode` tem de corresponder ao nome do processador registado).
3. Altere `mode` para `on` ou `auto` através de `PUT /api/skills/[id]`.

---

## Sugestões Operacionais

- **Interruptor principal:** `settings.skillsEnabled = false` bloqueia todas as execuções e devolve HTTP `503` em `/api/skills/executions`. O registo continua a ser carregado.
- **Restrinja o tráfego de saída:** mantenha `SKILLS_SANDBOX_NETWORK_ENABLED` por definir (predefinição) para um isolamento completo da sandbox. A opção `networkEnabled: true` por chamada continua a exigir a permissão principal.
- **Permita imagens específicas:** defina `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` para expandir a lista de permissões.
- **Audite as execuções:** `/dashboard/skills/executions` e `omniroute_skills_executions` consultam ambos `skill_executions`. As execuções bem-sucedidas incluem `durationMs`; as falhas incluem `errorMessage`.
- **Invalidação da cache:** chame `skillRegistry.invalidateCache()` após edições manuais da base de dados; caso contrário, aguarde 60 s.
- **Espaço de trabalho anónimo:** quando `apiKeyId` está vazio, todas as chamadas são associadas por hash ao mesmo espaço de trabalho `"anonymous"` — o código que tenha em conta a partilha deve fornecer sempre uma chave real.

---

## Ciclo de Execução (v3.8.16+)

O `SkillExecutor` (`src/lib/skills/executor.ts`) é um **singleton** que gere todas as invocações de skills. Compreender o seu ciclo de vida é fundamental para depurar tempos limite, novas tentativas e o estado da execução.

### O Ciclo de Vida em 5 Fases

```
   execute() chamado
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← em fila, ainda não iniciado (registo criado na BD)
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
  SUCCESS   ERROR     TIMEOUT   (nenhum outro caminho — terminado pelo processo principal)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Registo da BD atualizado com estado, resultado, durationMs
```

### Configuração Predefinida

| Definição    | Predefinição  | Configurável através de              |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Importante**: O executor é um singleton — chamar `setTimeout()` afeta globalmente todas as invocações subsequentes. Atualmente, não são suportados tempos limite por skill; se precisar de tempos limite diferentes por skill, execute processos separados ou crie uma bifurcação do executor.

### Valores de Estado

De `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Em fila, ainda não iniciado
  RUNNING = "running", // Handler invocado
  SUCCESS = "success", // O handler devolveu um resultado válido
  ERROR = "error", // O handler lançou uma exceção
  TIMEOUT = "timeout", // Excedeu o tempo limite do executor
}
```

> **Nota**: O estado `TIMEOUT` está definido no enum, mas **não é efetivamente escrito na BD** pela implementação atual do executor — os tempos limite são apresentados como `ERROR` com a mensagem `"Skill execution timed out"`. O enum de estado está reservado para utilização futura.

### Inspecionar Execuções

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Obter uma execução específica por ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} em ${exec.durationMs}ms`);
}

// Listar execuções recentes de uma chave de API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Contar o total de execuções
const total = skillExecutor.countExecutions("api-key-id");
```

### Comportamento das Novas Tentativas

A definição `maxRetries` é armazenada, mas **não é atualmente utilizada** pelo método `execute()` do executor — este realiza apenas uma tentativa. O valor `maxRetries` é exposto para implementação futura e para hooks que pretendam lê-lo.

Por enquanto, as novas tentativas têm de ser implementadas dentro do próprio handler da skill. As
skills incorporadas são registadas no executor (por exemplo, `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` em `src/lib/skills/builtin/`); qualquer handler que
registe pode encapsular o seu próprio ciclo de novas tentativas:

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

## SkillMode em Detalhe

O enum `SkillMode` (`src/lib/skills/types.ts`) controla **quando e como** as skills são invocadas:

```ts
enum SkillMode {
  AUTO = "auto", // O LLM decide quando chamar a skill
  MANUAL = "manual", // Invocada apenas mediante um pedido explícito do utilizador
  HYBRID = "hybrid", // Pontuação AUTO + substituição manual
}
```

> **Nota**: A base de código define `SkillMode` (AUTO/MANUAL/HYBRID), enquanto o campo `Skill.mode` utiliza uma estrutura diferente (`"on" | "off" | "auto"`). Estão relacionados, mas não são idênticos — `SkillMode` destina-se à política do executor, enquanto `Skill.mode` se destina à ativação individual de cada skill.

### Quando Utilizar Cada Modo

| Modo     | Comportamento do LLM                                                                      | Caso de utilização                                              |
| -------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `AUTO`   | O LLM pode chamar a skill quando considerar necessário                                    | Skills de utilização geral (leitura de ficheiros, pedidos HTTP) |
| `MANUAL` | O LLM não pode chamar a skill; apenas uma chamada explícita à API `executeSkill` a invoca | Operações sensíveis (escritas em bases de dados, pagamentos)    |
| `HYBRID` | O LLM pode sugerir a skill; o utilizador tem de confirmar                                 | Skills com efeitos secundários, mas que não são perigosas       |

### Pontuação AUTO

Quando o modo `AUTO` está ativo, cada skill candidata é pontuada em relação ao
contexto do pedido por `scoreAutoSkill()` em `src/lib/skills/injection.ts` — um
sistema aditivo de pontos inteiros (correspondência com o nome da skill,
sobreposição de tokens de nome/etiqueta/descrição, indícios do motivo de
execução em segundo plano, bónus/penalização de indícios do fornecedor). As
`AUTO_MAX_SKILLS = 5` skills mais bem classificadas com
`score >= AUTO_MIN_SCORE = 3` são injetadas como ferramentas que podem ser
chamadas, com os empates desfeitos por `installCount` e, depois, pelo nome.
Consulte a tabela completa de pontos em
[**Geração do Esquema de Ferramentas → Pontuação AUTO**](#auto-scoring),
apresentada anteriormente neste documento; não existe qualquer limiar decimal
ao estilo de `0.6`, nem pontuação em `registry.ts`.

---

## Catálogo de Skills Incorporadas

O OmniRoute inclui um conjunto selecionado de skills incorporadas em `src/lib/skills/builtin/`. As mais comuns são:

### Skill de Automatização do Navegador

A skill de navegador (`src/lib/skills/builtin/browser.ts`) fornece automatização de navegador headless através de Playwright/Puppeteer. **Está implementada, mas não faz parte do catálogo de skills predefinido** — para a utilizar, instale separadamente o plugin da extensão do navegador.

```ts
// Ativar na sua configuração
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Exigir sempre uma invocação explícita
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s para carregamentos de páginas
  maxRetries: 1,
};
```

### Outras Categorias Incorporadas

| Categoria          | Skills                                         | Modo   |
| ------------------ | ---------------------------------------------- | ------ |
| E/S de ficheiros   | `file_read`, `file_write`                      | AUTO   |
| HTTP               | `http_request`                                 | AUTO   |
| Pesquisa           | `web_search`                                   | AUTO   |
| Execução de código | `eval_code` (JavaScript/Python em sandbox)     | HYBRID |
| Sistema            | `execute_command` (execução de CLI em sandbox) | MANUAL |

### Adicionar uma Skill Personalizada

Consulte [SDK de Plugins e Integração de Skills](./PLUGIN_SDK.md) para saber como adicionar uma skill personalizada através do sistema de plugins.

---

## Ver também

- [MCP-SERVER.md](./MCP-SERVER.md) — registo de ferramentas MCP e transportes
- [A2A-SERVER.md](./A2A-SERVER.md) — ciclo de vida das tarefas A2A e encaminhamento de competências
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — introdução para o utilizador
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — fluxo de pedidos e mapa de componentes
- Código-fonte: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testes: `src/lib/skills/__tests__/integration.test.ts`
