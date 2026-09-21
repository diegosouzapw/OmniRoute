# ACP (Agent Client Protocol) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP consente a OmniRoute di avviare agenti CLI (come Claude Code, Codex) come processi figli invece di utilizzare API HTTP. Ciò offre un trasporto "CLI-as-backend".

---

## Che cos'è ACP?

ACP (Agent Client Protocol) è un trasporto **"CLI-as-backend"** per OmniRoute. Invece di intercettare le chiamate API HTTP ai provider di IA, ACP **avvia gli agenti CLI come processi figli** e invia i prompt tramite la loro interfaccia nativa.

### Perché utilizzare ACP?

| Vantaggio                         | Descrizione                                            |
| --------------------------------- | ------------------------------------------------------ |
| **Nessuna chiave API necessaria** | Utilizza l'autenticazione CLI esistente                |
| **Protocollo nativo**             | Utilizza il formato di input/output nativo di ogni CLI |
| **Rilevamento automatico**        | Rileva le CLI installate nel sistema                   |
| **15 agenti integrati**           | Preconfigurato per gli strumenti CLI più diffusi       |
| **Agenti personalizzati**         | Aggiungi i tuoi strumenti CLI tramite le impostazioni  |
| **Gestione dei processi**         | Gestisce il ciclo di vita (avvio, invio, terminazione) |

---

## Agenti CLI supportati

ACP supporta **15 agenti CLI integrati** pronti all'uso:

| ID agente     | Nome visualizzato  | Eseguibile    | Protocollo |
| ------------- | ------------------ | ------------- | ---------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio      |
| `claude`      | Claude Code CLI    | `claude`      | stdio      |
| `goose`       | Goose CLI          | `goose`       | stdio      |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio      |
| `aider`       | Aider              | `aider`       | stdio      |
| `opencode`    | OpenCode           | `opencode`    | stdio      |
| `cline`       | Cline              | `cline`       | stdio      |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio      |
| `forge`       | ForgeCode          | `forge`       | stdio      |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio      |
| `interpreter` | Open Interpreter   | `interpreter` | stdio      |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio      |
| `warp`        | Warp AI            | `warp`        | stdio      |
| `gemini`      | Gemini CLI         | `gemini`      | stdio      |
| `zcode`       | ZCode              | `zcode`       | stdio      |

### Agenti personalizzati

Puoi aggiungere i tuoi agenti CLI tramite le impostazioni. Gli agenti personalizzati supportano le stesse funzionalità degli agenti integrati.

---

## Guida rapida

### Passaggio 1: installare un agente CLI

```bash
# Esempio: installa Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verifica l'installazione
claude --version
```

### Passaggio 2: rilevamento automatico di ACP

ACP rileva automaticamente gli agenti CLI installati nel sistema. Non è necessaria alcuna configurazione!

### Passaggio 3: utilizzare il trasporto ACP

Una volta rilevato, ACP può essere utilizzato come trasporto per qualsiasi provider supportato. OmniRoute utilizzerà automaticamente ACP quando la CLI è disponibile.

---

## Come funziona ACP

### Architettura

```
┌─────────────────┐
│  OmniRoute      │
│  (Proxy HTTP)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Processo figlio │
│  (Agente CLI)   │
│                 │
│  stdin  ◄──────┤  Invia prompt
│  stdout ──────►│  Ricevi risposta
│  stderr ──────►│  Ricevi errori
└─────────────────┘
```

### Ciclo di vita del processo

1. **Avvio** — ACP crea un processo figlio per l'agente CLI
2. **Invio** — ACP scrive i prompt nello stdin del processo
3. **Ricezione** — ACP legge le risposte da stdout/stderr
4. **Rilevamento dell'inattività** — ACP attende 2 secondi di inattività prima di considerare completa la risposta
5. **Terminazione** — ACP termina il processo (SIGTERM, quindi SIGKILL dopo 5 secondi)

### Protocollo di comunicazione

ACP utilizza **stdio** (input/output standard) per comunicare con gli agenti CLI. Il protocollo è il seguente:

1. **Invio del prompt** — Scrittura su stdin con un carattere di nuova riga
2. **Attesa della risposta** — Lettura da stdout fino all'inattività (2 secondi senza output)
3. **Timeout** — Valore predefinito di 120 secondi (configurabile)

---

## Riferimento API

### Funzioni del registro

#### `detectInstalledAgents()`

Rileva tutti gli agenti CLI installati nel sistema. I risultati vengono memorizzati nella cache per 60 secondi.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Restituisce: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ad es., "codex", "claude"
  name: string; // Nome visualizzato
  binary: string; // Nome del binario da avviare
  versionCommand: string; // Comando di rilevamento della versione
  version: string | null; // Versione rilevata (null se non installato)
  installed: boolean; // Indica se l'agente è installato
  providerAlias: string; // ID del provider in OmniRoute
  spawnArgs: string[]; // Argomenti da passare all'avvio
  protocol: "stdio" | "http"; // Protocollo di comunicazione
  isCustom?: boolean; // Indica se si tratta di un agente personalizzato definito dall'utente
}
```

#### `getAvailableAgents()`

Ottiene solo gli agenti installati e disponibili per ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Restituisce: CliAgentInfo[] (solo gli agenti installati)
```

#### `getAgentById(id)`

Ottiene un agente specifico in base all'ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Restituisce: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Imposta le definizioni degli agenti personalizzati dalle impostazioni.

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

### Funzioni del gestore

#### `acpManager.spawn(agentId, binary, args, env)`

Avvia un nuovo processo dell'agente CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* variabili d'ambiente personalizzate */
});
// Restituisce: AcpSession
```

**ID agente consentiti**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Invia un prompt a un agente CLI e ne raccoglie la risposta.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // timeout di 2 minuti
);
// Restituisce: Promise<string>
```

#### `acpManager.kill(sessionId)`

Termina una sessione ed esegue la pulizia.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Restituisce: boolean
```

#### `acpManager.getActiveSessions()`

Ottiene tutte le sessioni attive.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Restituisce: AcpSession[]
```

#### `acpManager.killAll()`

Termina tutte le sessioni.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interfaccia della sessione

```typescript
interface AcpSession {
  id: string; // ID univoco della sessione
  agentId: string; // ID dell'agente (ad es., "claude")
  process: ChildProcess; // Handle del processo figlio
  alive: boolean; // Indica se il processo è attivo
  stdoutBuffer: string; // Buffer stdout accumulato
  stderrBuffer: string; // Buffer stderr accumulato
  createdAt: Date; // Data e ora di creazione
}
```

### Eventi

`AcpManager` estende `EventEmitter` ed emette i seguenti eventi:

#### `stdout`

Emesso quando l'agente CLI scrive su stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Emesso quando l'agente CLI scrive su stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Emesso quando il processo dell'agente CLI termina.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Emesso quando si verifica un errore nel processo dell'agente CLI.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Configurazione

### Variabili d'ambiente

ACP eredita tutte le variabili d'ambiente dal processo padre e può essere esteso con variabili d'ambiente personalizzate:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argomenti di avvio

Ogni agente dispone di argomenti di avvio predefiniti definiti nel registro. È possibile sovrascriverli:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Timeout

Il timeout predefinito per i prompt è di **120 secondi** (2 minuti). È possibile sovrascriverlo:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuti
```

### Cache di rilevamento

Il rilevamento degli agenti viene memorizzato nella cache per **60 secondi** per evitare costose scansioni del file system. Per forzare l'aggiornamento:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Sicurezza

### Prevenzione dell'iniezione di comandi

ACP convalida i comandi di versione per prevenire attacchi di command injection:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

I comandi di versione contenenti questi caratteri vengono rifiutati:

- `;` — Separatore di comandi
- `&` — Processo in background
- `|` — Pipe
- `<`, `>` — Reindirizzamento
- `` ` `` — Sostituzione di comando
- `$` — Espansione di variabile
- `\r`, `\n` — Interruzioni di riga

### Convalida del nome del file binario

ACP verifica che il file binario del comando di versione corrisponda al nome previsto (a meno che non si tratti di un agente personalizzato).

### Isolamento dei processi

Ogni sessione ACP viene eseguita nel proprio processo figlio. Il processo viene terminato quando la sessione finisce o scade.

---

## Prestazioni

### Prestazioni del rilevamento

- **Prima chiamata**: ~50-200ms (esegue il comando `version` per ogni agente)
- **Chiamate memorizzate nella cache**: <1ms (restituisce il risultato dalla cache)
- **TTL della cache**: 60 secondi

### Prestazioni dei prompt

- **Avvio**: ~50-100ms
- **Invio del prompt**: ~10-50ms
- **Attesa della risposta**: dipende dall'agente CLI (in genere 1-30 secondi)
- **Terminazione**: ~5 secondi (SIGTERM) + immediata (SIGKILL)

### Utilizzo delle risorse

- **Memoria per sessione**: ~10-50MB (dipende dall'agente CLI)
- **CPU**: minimo (limitato dalle operazioni di I/O)
- **Disco**: nessuno

---

## Risoluzione dei problemi

### Errore "Agente sconosciuto"

**Problema**: `acpManager.spawn()` genera `Unknown agent: <id>`

**Soluzione**: in `spawn()` sono consentiti solo questi agenti:

- `claude`
- `codex`
- `gemini`
- `qwen`

Gli altri agenti devono essere avviati manualmente o tramite definizioni di agenti personalizzati.

### Errore "Sessione non attiva"

**Problema**: `acpManager.sendPrompt()` genera `Session ${sessionId} is not alive`

**Soluzione**: la sessione potrebbe essere terminata o essere stata arrestata. Verificare lo stato della sessione:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Riavvia la sessione
  acpManager.spawn("claude", "claude", [], {});
}
```

### Errore "Timeout ACP"

**Problema**: `acpManager.sendPrompt()` genera `ACP timeout after 120000ms`

**Soluzione**: aumentare il timeout:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuti
```

### CLI non rilevata

**Problema**: `detectInstalledAgents()` non trova la CLI

**Soluzioni**:

1. **Verificare PATH**: assicurarsi che la CLI sia presente nel PATH di sistema
2. **Verificare il comando di versione**: eseguire manualmente `claude --version`
3. **Verificare i permessi**: assicurarsi che la CLI sia eseguibile
4. **Agente personalizzato**: aggiungere una definizione di agente personalizzato per le CLI non standard

### Permesso negato

**Problema**: ACP non riesce a eseguire la CLI

**Soluzioni**:

1. **Verificare i permessi del file**: `chmod +x /usr/local/bin/claude`
2. **Verificare la proprietà**: assicurarsi che OmniRoute disponga dei permessi di lettura/esecuzione
3. **Verificare SELinux/AppArmor**: potrebbero bloccare l'avvio dei processi

---

## Esempi

### Esempio 1: Avviare e utilizzare Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Rileva gli agenti installati
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Avvia una nuova sessione
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Invia un prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Esegui la pulizia
  acpManager.kill(session.id);
}
```

### Esempio 2: Rilevamento automatico con fallback

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Prova prima Claude, con fallback su Codex
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

### Esempio 3: Agente personalizzato

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registra un agente CLI personalizzato
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

// Ora detectInstalledAgents() includerà "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Passaggi successivi

- **[Riferimento API](../reference/API_REFERENCE.md)** — Endpoint REST API
- **[Riferimento dei provider](../reference/PROVIDER_REFERENCE.md)** — Tutti i 352 provider
- **[Server MCP](./MCP-SERVER.md)** — Integrazione con Model Context Protocol
- **[Server A2A](./A2A-SERVER.md)** — Protocollo Agent-to-Agent
- **[Agente cloud](./CLOUD_AGENT.md)** — Agenti basati sul cloud

---

## Riferimenti

- [Progetto AionUi](https://github.com/iOfficeAI/AionUi) — Fonte di ispirazione per il rilevamento automatico ACP
- [Codice sorgente ACP](../../src/lib/acp/) — Dettagli sull'implementazione
  - `manager.ts` — Gestione del ciclo di vita dei processi
  - `registry.ts` — Rilevamento e registrazione degli agenti
  - `index.ts` — Esportazioni dell'API pubblica
