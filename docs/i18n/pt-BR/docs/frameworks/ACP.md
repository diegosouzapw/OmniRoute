# ACP (Agent Client Protocol) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: O ACP permite que o OmniRoute inicie agentes de CLI (como Claude Code e Codex) como processos filhos, em vez de usar APIs HTTP. Isso oferece um transporte de "CLI como backend".

---

## O que é o ACP?

O ACP (Agent Client Protocol) é um transporte de **"CLI como backend"** para o OmniRoute. Em vez de interceptar chamadas de API HTTP para provedores de IA, o ACP **inicia agentes de CLI como processos filhos** e envia prompts por meio de suas interfaces nativas.

### Por que usar o ACP?

| Benefício                      | Descrição                                                     |
| ------------------------------ | ------------------------------------------------------------- |
| **Não requer chaves de API**   | Usa a autenticação existente da sua CLI                       |
| **Protocolo nativo**           | Usa o formato nativo de entrada/saída de cada CLI             |
| **Descoberta automática**      | Detecta as CLIs instaladas no seu sistema                     |
| **15 agentes integrados**      | Pré-configurados para ferramentas de CLI populares            |
| **Agentes personalizados**     | Adicione suas próprias ferramentas de CLI pelas configurações |
| **Gerenciamento de processos** | Gerencia o ciclo de vida (iniciar, enviar, encerrar)          |

---

## Agentes de CLI compatíveis

O ACP oferece suporte nativo a **15 agentes de CLI integrados**:

| ID do agente  | Nome de exibição   | Binário       | Protocolo |
| ------------- | ------------------ | ------------- | --------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio     |
| `claude`      | Claude Code CLI    | `claude`      | stdio     |
| `goose`       | Goose CLI          | `goose`       | stdio     |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio     |
| `aider`       | Aider              | `aider`       | stdio     |
| `opencode`    | OpenCode           | `opencode`    | stdio     |
| `cline`       | Cline              | `cline`       | stdio     |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio     |
| `forge`       | ForgeCode          | `forge`       | stdio     |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio     |
| `interpreter` | Open Interpreter   | `interpreter` | stdio     |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio     |
| `warp`        | Warp AI            | `warp`        | stdio     |
| `gemini`      | Gemini CLI         | `gemini`      | stdio     |
| `zcode`       | ZCode              | `zcode`       | stdio     |

### Agentes personalizados

Você pode adicionar seus próprios agentes de CLI pelas configurações. Os agentes personalizados oferecem os mesmos recursos que os agentes integrados.

---

## Início rápido

### Etapa 1: instale um agente de CLI

```bash
# Exemplo: instalar o Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verificar a instalação
claude --version
```

### Etapa 2: detecção automática do ACP

O ACP detecta automaticamente os agentes de CLI instalados no seu sistema. Nenhuma configuração é necessária!

### Etapa 3: use o transporte ACP

Após a detecção, o ACP pode ser usado como transporte para qualquer provedor compatível. O OmniRoute usará o ACP automaticamente quando a CLI estiver disponível.

---

## Como o ACP funciona

### Arquitetura

```
┌─────────────────┐
│  OmniRoute      │
│  (Proxy HTTP)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Processo filho │
│  (Agente de CLI)│
│                 │
│  stdin  ◄──────┤  Enviar prompt
│  stdout ──────►│  Receber resposta
│  stderr ──────►│  Receber erros
└─────────────────┘
```

### Ciclo de vida do processo

1. **Inicialização** — O ACP cria um processo filho para o agente de CLI
2. **Envio** — O ACP grava prompts no stdin do processo
3. **Recebimento** — O ACP lê respostas do stdout/stderr
4. **Detecção de inatividade** — O ACP aguarda 2 segundos de inatividade antes de considerar a resposta concluída
5. **Encerramento** — O ACP encerra o processo (SIGTERM e, depois, SIGKILL após 5s)

### Protocolo de comunicação

O ACP usa **stdio** (entrada/saída padrão) para se comunicar com agentes de CLI. O protocolo é:

1. **Enviar prompt** — Gravar no stdin com uma nova linha
2. **Aguardar resposta** — Ler o stdout até que fique inativo (2s sem saída)
3. **Tempo limite** — 120 segundos por padrão (configurável)

---

## Referência da API

### Funções do Registro

#### `detectInstalledAgents()`

Detecta todos os agentes de CLI instalados no sistema. Os resultados são armazenados em cache por 60 segundos.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Retorna: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // por exemplo, "codex", "claude"
  name: string; // Nome de exibição
  binary: string; // Nome do binário a ser iniciado
  versionCommand: string; // Comando de detecção da versão
  version: string | null; // Versão detectada (null se não estiver instalado)
  installed: boolean; // Indica se o agente está instalado
  providerAlias: string; // ID do provedor no OmniRoute
  spawnArgs: string[]; // Argumentos a serem passados ao iniciar
  protocol: "stdio" | "http"; // Protocolo de comunicação
  isCustom?: boolean; // Indica se este é um agente personalizado definido pelo usuário
}
```

#### `getAvailableAgents()`

Obtém somente os agentes que estão instalados e disponíveis para o ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Retorna: CliAgentInfo[] (somente agentes instalados)
```

#### `getAgentById(id)`

Obtém um agente específico pelo ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Retorna: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Define as configurações de agentes personalizados.

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### Funções do Gerenciador

#### `acpManager.spawn(agentId, binary, args, env)`

Inicia um novo processo de agente de CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* variáveis de ambiente personalizadas */
});
// Retorna: AcpSession
```

**IDs de agente permitidos**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Envia um prompt a um agente de CLI e coleta a resposta.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // tempo limite de 2 minutos
);
// Retorna: Promise<string>
```

#### `acpManager.kill(sessionId)`

Encerra uma sessão e realiza a limpeza.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Retorna: boolean
```

#### `acpManager.getActiveSessions()`

Obtém todas as sessões ativas.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Retorna: AcpSession[]
```

#### `acpManager.killAll()`

Encerra todas as sessões.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interface de Sessão

```typescript
interface AcpSession {
  id: string; // ID exclusivo da sessão
  agentId: string; // ID do agente (por exemplo, "claude")
  process: ChildProcess; // Referência do processo filho
  alive: boolean; // Indica se o processo está ativo
  stdoutBuffer: string; // Buffer acumulado de stdout
  stderrBuffer: string; // Buffer acumulado de stderr
  createdAt: Date; // Data e hora de criação
}
```

### Eventos

O `AcpManager` estende `EventEmitter` e emite os seguintes eventos:

#### `stdout`

Emitido quando o agente de CLI grava em stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Emitido quando o agente de CLI grava em stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Emitido quando o processo do agente de CLI é encerrado.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Emitido quando ocorre um erro no processo do agente de CLI.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Configuração

### Variáveis de ambiente

O ACP herda todas as variáveis de ambiente do processo pai e pode ser estendido com variáveis de ambiente personalizadas:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumentos de inicialização

Cada agente possui argumentos de inicialização padrão definidos no registro. Você pode substituí-los:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Tempos limite

O tempo limite padrão para prompts é de **120 segundos** (2 minutos). Você pode substituí-lo:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutos
```

### Cache de detecção

A detecção de agentes é armazenada em cache por **60 segundos** para evitar verificações custosas no sistema de arquivos. Para forçar a atualização:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Segurança

### Prevenção contra injeção de comandos

O ACP valida os comandos de versão para evitar ataques de injeção de comandos:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Comandos de versão que contêm estes caracteres são rejeitados:

- `;` — Separador de comandos
- `&` — Processo em segundo plano
- `|` — Pipe
- `<`, `>` — Redirecionamento
- `` ` `` — Substituição de comando
- `$` — Expansão de variável
- `\r`, `\n` — Quebras de linha

### Validação do nome do binário

O ACP valida se o binário do comando de versão corresponde ao nome esperado do binário (a menos que seja um agente personalizado).

### Isolamento de processos

Cada sessão ACP é executada em seu próprio processo filho. O processo é encerrado quando a sessão termina ou atinge o tempo limite.

---

## Desempenho

### Desempenho da detecção

- **Primeira chamada**: ~50-200ms (executa o comando `version` para cada agente)
- **Chamadas em cache**: <1ms (retorna do cache)
- **TTL do cache**: 60 segundos

### Desempenho dos prompts

- **Inicialização**: ~50-100ms
- **Envio do prompt**: ~10-50ms
- **Espera pela resposta**: Depende do agente de CLI (normalmente de 1 a 30 segundos)
- **Encerramento**: ~5 segundos (SIGTERM) + imediato (SIGKILL)

### Uso de recursos

- **Memória por sessão**: ~10-50MB (depende do agente de CLI)
- **CPU**: Mínimo (limitado por E/S)
- **Disco**: Nenhum

---

## Solução de problemas

### Erro "Unknown agent"

**Problema**: `acpManager.spawn()` gera `Unknown agent: <id>`

**Solução**: Apenas estes agentes são permitidos em `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Outros agentes devem ser inicializados manualmente ou por meio de definições de agentes personalizados.

### Erro "Session not alive"

**Problema**: `acpManager.sendPrompt()` gera `Session ${sessionId} is not alive`

**Solução**: A sessão pode ter sido encerrada ou finalizada. Verifique o status da sessão:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Reinicialize a sessão
  acpManager.spawn("claude", "claude", [], {});
}
```

### Erro "ACP timeout"

**Problema**: `acpManager.sendPrompt()` gera `ACP timeout after 120000ms`

**Solução**: Aumente o tempo limite:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutos
```

### CLI não detectada

**Problema**: `detectInstalledAgents()` não encontra sua CLI

**Soluções**:

1. **Verifique o PATH**: Certifique-se de que a CLI esteja no PATH do sistema
2. **Verifique o comando de versão**: Execute `claude --version` manualmente
3. **Verifique as permissões**: Certifique-se de que a CLI seja executável
4. **Agente personalizado**: Adicione uma definição de agente personalizado para CLIs não padronizadas

### Permissão negada

**Problema**: O ACP não consegue executar a CLI

**Soluções**:

1. **Verifique as permissões do arquivo**: `chmod +x /usr/local/bin/claude`
2. **Verifique a propriedade**: Certifique-se de que o OmniRoute tenha permissões de leitura/execução
3. **Verifique o SELinux/AppArmor**: Pode bloquear a inicialização de processos

---

## Exemplos

### Exemplo 1: Iniciar e usar o Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Detectar agentes instalados
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Iniciar uma nova sessão
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Enviar um prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Limpar recursos
  acpManager.kill(session.id);
}
```

### Exemplo 2: Descoberta automática com alternativa

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Tentar o Claude primeiro; usar o Codex como alternativa
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### Exemplo 3: Agente personalizado

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registrar um agente de CLI personalizado
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// Agora, detectInstalledAgents() incluirá "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## O que vem a seguir?

- **[Referência da API](../reference/API_REFERENCE.md)** — Endpoints da API REST
- **[Referência de provedores](../reference/PROVIDER_REFERENCE.md)** — Todos os 352 provedores
- **[Servidor MCP](./MCP-SERVER.md)** — Integração com o Model Context Protocol
- **[Servidor A2A](./A2A-SERVER.md)** — Protocolo entre agentes
- **[Agente de nuvem](./CLOUD_AGENT.md)** — Agentes baseados em nuvem

---

## Referência

- [Projeto AionUi](https://github.com/iOfficeAI/AionUi) — Inspiração para a detecção automática de ACP
- [Código-fonte do ACP](../../src/lib/acp/) — Detalhes da implementação
  - `manager.ts` — Gerenciamento do ciclo de vida dos processos
  - `registry.ts` — Descoberta e registro de agentes
  - `index.ts` — Exportações da API pública
