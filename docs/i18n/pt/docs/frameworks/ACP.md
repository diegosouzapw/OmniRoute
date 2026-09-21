# ACP (Agent Client Protocol) (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: O ACP permite ao OmniRoute iniciar agentes CLI (como Claude Code e Codex) como processos-filho, em vez de utilizar APIs HTTP. Isto disponibiliza um transporte de "CLI como backend".

---

## O que é o ACP?

O ACP (Agent Client Protocol) é um transporte de **"CLI como backend"** para o OmniRoute. Em vez de intercetar chamadas à API HTTP de fornecedores de IA, o ACP **inicia agentes CLI como processos-filho** e envia os prompts através da respetiva interface nativa.

### Porquê utilizar o ACP?

| Benefício                    | Descrição                                                        |
| ---------------------------- | ---------------------------------------------------------------- |
| **Não requer chaves de API** | Utiliza a autenticação existente da sua CLI                      |
| **Protocolo nativo**         | Utiliza o formato nativo de entrada/saída de cada CLI            |
| **Deteção automática**       | Deteta as CLIs instaladas no seu sistema                         |
| **15 agentes incorporados**  | Pré-configurado para ferramentas CLI populares                   |
| **Agentes personalizados**   | Adicione as suas próprias ferramentas CLI através das definições |
| **Gestão de processos**      | Gere o ciclo de vida (iniciar, enviar, terminar)                 |

---

## Agentes CLI suportados

O ACP suporta de origem **15 agentes CLI incorporados**:

| ID do agente  | Nome de apresentação | Binário       | Protocolo |
| ------------- | -------------------- | ------------- | --------- |
| `codex`       | OpenAI Codex CLI     | `codex`       | stdio     |
| `claude`      | Claude Code CLI      | `claude`      | stdio     |
| `goose`       | Goose CLI            | `goose`       | stdio     |
| `openclaw`    | OpenClaw             | `openclaw`    | stdio     |
| `aider`       | Aider                | `aider`       | stdio     |
| `opencode`    | OpenCode             | `opencode`    | stdio     |
| `cline`       | Cline                | `cline`       | stdio     |
| `qwen`        | Qwen Code            | `qwen --acp`  | stdio     |
| `forge`       | ForgeCode            | `forge`       | stdio     |
| `amazon-q`    | Amazon Q Developer   | `q`           | stdio     |
| `interpreter` | Open Interpreter     | `interpreter` | stdio     |
| `cursor-cli`  | Cursor CLI           | `cursor`      | stdio     |
| `warp`        | Warp AI              | `warp`        | stdio     |
| `gemini`      | Gemini CLI           | `gemini`      | stdio     |
| `zcode`       | ZCode                | `zcode`       | stdio     |

### Agentes personalizados

Pode adicionar os seus próprios agentes CLI através das definições. Os agentes personalizados suportam as mesmas funcionalidades que os agentes incorporados.

---

## Início rápido

### Passo 1: instalar um agente CLI

```bash
# Exemplo: instalar a CLI Claude Code
npm install -g @anthropic-ai/claude-code

# Verificar a instalação
claude --version
```

### Passo 2: deteção automática do ACP

O ACP deteta automaticamente os agentes CLI instalados no seu sistema. Não é necessária qualquer configuração!

### Passo 3: utilizar o transporte ACP

Após a deteção, o ACP pode ser utilizado como transporte para qualquer fornecedor suportado. O OmniRoute utilizará automaticamente o ACP quando a CLI estiver disponível.

---

## Como funciona o ACP

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
│  Processo-filho │
│  (Agente CLI)   │
│                 │
│  stdin  ◄──────┤  Enviar prompt
│  stdout ──────►│  Receber resposta
│  stderr ──────►│  Receber erros
└─────────────────┘
```

### Ciclo de vida do processo

1. **Iniciar** — O ACP cria um processo-filho para o agente CLI
2. **Enviar** — O ACP escreve os prompts no stdin do processo
3. **Receber** — O ACP lê as respostas do stdout/stderr
4. **Deteção de inatividade** — O ACP aguarda 2 segundos de inatividade antes de considerar a resposta concluída
5. **Terminar** — O ACP termina o processo (SIGTERM e, em seguida, SIGKILL após 5s)

### Protocolo de comunicação

O ACP utiliza **stdio** (entrada/saída padrão) para comunicar com os agentes CLI. O protocolo é o seguinte:

1. **Enviar prompt** — Escrever no stdin com uma nova linha
2. **Aguardar resposta** — Ler do stdout até ficar inativo (2s sem saída)
3. **Tempo limite** — 120 segundos por predefinição (configurável)

---

## Referência da API

### Funções do Registo

#### `detectInstalledAgents()`

Deteta todos os agentes CLI instalados no sistema. Os resultados são armazenados em cache durante 60 segundos.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Devolve: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // por exemplo, "codex", "claude"
  name: string; // Nome de apresentação
  binary: string; // Nome do binário a executar
  versionCommand: string; // Comando de deteção da versão
  version: string | null; // Versão detetada (null se não estiver instalado)
  installed: boolean; // Indica se o agente está instalado
  providerAlias: string; // ID do fornecedor no OmniRoute
  spawnArgs: string[]; // Argumentos a transmitir durante a execução
  protocol: "stdio" | "http"; // Protocolo de comunicação
  isCustom?: boolean; // Indica se este é um agente personalizado definido pelo utilizador
}
```

#### `getAvailableAgents()`

Obtém apenas os agentes que estão instalados e disponíveis para ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Devolve: CliAgentInfo[] (apenas agentes instalados)
```

#### `getAgentById(id)`

Obtém um agente específico através do ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Devolve: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Define agentes personalizados a partir das definições.

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

### Funções do Gestor

#### `acpManager.spawn(agentId, binary, args, env)`

Inicia um novo processo de agente CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* variáveis de ambiente personalizadas */
});
// Devolve: AcpSession
```

**IDs de agentes permitidos**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Envia um pedido a um agente CLI e recolhe a resposta.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // tempo limite de 2 minutos
);
// Devolve: Promise<string>
```

#### `acpManager.kill(sessionId)`

Termina uma sessão e efetua a limpeza.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Devolve: boolean
```

#### `acpManager.getActiveSessions()`

Obtém todas as sessões ativas.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Devolve: AcpSession[]
```

#### `acpManager.killAll()`

Termina todas as sessões.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interface de Sessão

```typescript
interface AcpSession {
  id: string; // ID único da sessão
  agentId: string; // ID do agente (por exemplo, "claude")
  process: ChildProcess; // Referência ao processo subordinado
  alive: boolean; // Indica se o processo está ativo
  stdoutBuffer: string; // Buffer stdout acumulado
  stderrBuffer: string; // Buffer stderr acumulado
  createdAt: Date; // Data e hora de criação
}
```

### Eventos

O `AcpManager` estende o `EventEmitter` e emite os seguintes eventos:

#### `stdout`

Emitido quando o agente CLI escreve em stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Emitido quando o agente CLI escreve em stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Emitido quando o processo do agente CLI termina.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Emitido quando ocorre um erro no processo do agente CLI.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Configuração

### Variáveis de ambiente

O ACP herda todas as variáveis de ambiente do processo principal e pode ser expandido com variáveis de ambiente personalizadas:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumentos de inicialização

Cada agente tem argumentos de inicialização predefinidos no registo. Pode substituí-los:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Tempos limite

O tempo limite predefinido para pedidos é de **120 segundos** (2 minutos). Pode substituí-lo:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutos
```

### Cache de deteção

A deteção de agentes é armazenada em cache durante **60 segundos** para evitar pesquisas dispendiosas no sistema de ficheiros. Para forçar a atualização:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Segurança

### Prevenção de injeção de comandos

O ACP valida os comandos de versão para impedir ataques de injeção de comandos:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Os comandos de versão que contenham estes caracteres são rejeitados:

- `;` — Separador de comandos
- `&` — Processo em segundo plano
- `|` — Pipe
- `<`, `>` — Redirecionamento
- `` ` `` — Substituição de comandos
- `$` — Expansão de variáveis
- `\r`, `\n` — Quebras de linha

### Validação do nome do binário

O ACP valida se o binário do comando de versão corresponde ao nome de binário esperado (a menos que seja um agente personalizado).

### Isolamento de processos

Cada sessão ACP é executada no seu próprio processo subordinado. O processo é terminado quando a sessão termina ou o tempo limite é excedido.

---

## Desempenho

### Desempenho da deteção

- **Primeira chamada**: ~50-200ms (executa o comando `version` para cada agente)
- **Chamadas em cache**: <1ms (devolve a partir da cache)
- **TTL da cache**: 60 segundos

### Desempenho dos pedidos

- **Inicialização**: ~50-100ms
- **Envio do pedido**: ~10-50ms
- **Espera pela resposta**: Depende do agente CLI (normalmente, entre 1 e 30 segundos)
- **Terminação**: ~5 segundos (SIGTERM) + imediata (SIGKILL)

### Utilização de recursos

- **Memória por sessão**: ~10-50MB (depende do agente CLI)
- **CPU**: Mínima (limitada por E/S)
- **Disco**: Nenhum

---

## Resolução de problemas

### Erro "Unknown agent"

**Problema**: `acpManager.spawn()` gera `Unknown agent: <id>`

**Solução**: Apenas estes agentes são permitidos em `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Os outros agentes têm de ser iniciados manualmente ou através de definições de agentes personalizados.

### Erro "Session not alive"

**Problema**: `acpManager.sendPrompt()` gera `Session ${sessionId} is not alive`

**Solução**: A sessão pode ter terminado ou ter sido encerrada. Verifique o estado da sessão:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Reiniciar a sessão
  acpManager.spawn("claude", "claude", [], {});
}
```

### Erro "ACP timeout"

**Problema**: `acpManager.sendPrompt()` gera `ACP timeout after 120000ms`

**Solução**: Aumente o tempo limite:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutos
```

### CLI não detetada

**Problema**: `detectInstalledAgents()` não encontra a sua CLI

**Soluções**:

1. **Verificar PATH**: Certifique-se de que a CLI está no PATH do seu sistema
2. **Verificar o comando de versão**: Execute `claude --version` manualmente
3. **Verificar as permissões**: Certifique-se de que a CLI é executável
4. **Agente personalizado**: Adicione uma definição de agente personalizado para CLIs não padrão

### Permissão negada

**Problema**: O ACP não consegue executar a CLI

**Soluções**:

1. **Verificar as permissões do ficheiro**: `chmod +x /usr/local/bin/claude`
2. **Verificar o proprietário**: Certifique-se de que o OmniRoute tem permissões de leitura/execução
3. **Verificar o SELinux/AppArmor**: Pode bloquear a criação de processos

---

## Exemplos

### Exemplo 1: Iniciar e utilizar o Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Detetar agentes instalados
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Iniciar uma nova sessão
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Enviar um pedido
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Efetuar a limpeza
  acpManager.kill(session.id);
}
```

### Exemplo 2: Deteção automática com alternativa

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Experimentar primeiro o Claude e, como alternativa, o Codex
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

// Registar um agente CLI personalizado
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

## E agora?

- **[Referência da API](../reference/API_REFERENCE.md)** — Endpoints da API REST
- **[Referência de fornecedores](../reference/PROVIDER_REFERENCE.md)** — Todos os 352 fornecedores
- **[Servidor MCP](./MCP-SERVER.md)** — Integração do Model Context Protocol
- **[Servidor A2A](./A2A-SERVER.md)** — Protocolo Agent-to-Agent
- **[Agente na nuvem](./CLOUD_AGENT.md)** — Agentes baseados na nuvem

---

## Referências

- [Projeto AionUi](https://github.com/iOfficeAI/AionUi) — Inspiração para a deteção automática de ACP
- [Código-fonte do ACP](../../src/lib/acp/) — Detalhes da implementação
  - `manager.ts` — Gestão do ciclo de vida dos processos
  - `registry.ts` — Descoberta e registo de agentes
  - `index.ts` — Exportações da API pública
