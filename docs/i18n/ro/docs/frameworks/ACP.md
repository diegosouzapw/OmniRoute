# ACP (Agent Client Protocol) (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Pe scurt**: ACP permite OmniRoute să lanseze agenți CLI (precum Claude Code, Codex) ca procese copil, în loc să utilizeze API-uri HTTP. Astfel, beneficiați de un transport de tip „CLI ca backend”.

---

## Ce este ACP?

ACP (Agent Client Protocol) este un **transport de tip „CLI ca backend”** pentru OmniRoute. În loc să intercepteze apelurile API HTTP către furnizorii de AI, ACP **lansează agenți CLI ca procese copil** și le transmite prompturile prin interfața lor nativă.

### De ce să utilizați ACP?

| Beneficiu                     | Descriere                                                   |
| ----------------------------- | ----------------------------------------------------------- |
| **Nu sunt necesare chei API** | Utilizează autentificarea CLI existentă                     |
| **Protocol nativ**            | Utilizează formatul nativ de intrare/ieșire al fiecărui CLI |
| **Detectare automată**        | Detectează instrumentele CLI instalate în sistem            |
| **15 agenți integrați**       | Preconfigurați pentru instrumente CLI populare              |
| **Agenți personalizați**      | Adăugați propriile instrumente CLI prin setări              |
| **Gestionarea proceselor**    | Gestionează ciclul de viață (lansare, trimitere, oprire)    |

---

## Agenți CLI acceptați

ACP acceptă în mod implicit **15 agenți CLI integrați**:

| ID agent      | Nume afișat        | Binar         | Protocol |
| ------------- | ------------------ | ------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`      | Claude Code CLI    | `claude`      | stdio    |
| `goose`       | Goose CLI          | `goose`       | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio    |
| `aider`       | Aider              | `aider`       | stdio    |
| `opencode`    | OpenCode           | `opencode`    | stdio    |
| `cline`       | Cline              | `cline`       | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode          | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio    |
| `interpreter` | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio    |
| `warp`        | Warp AI            | `warp`        | stdio    |
| `gemini`      | Gemini CLI         | `gemini`      | stdio    |
| `zcode`       | ZCode              | `zcode`       | stdio    |

### Agenți personalizați

Puteți adăuga propriii agenți CLI prin intermediul setărilor. Agenții personalizați acceptă aceleași funcționalități ca agenții integrați.

---

## Pornire rapidă

### Pasul 1: Instalați un agent CLI

```bash
# Exemplu: instalați Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verificați instalarea
claude --version
```

### Pasul 2: Detectarea automată ACP

ACP detectează automat agenții CLI instalați în sistem. Nu este necesară nicio configurare!

### Pasul 3: Utilizați transportul ACP

După detectare, ACP poate fi utilizat ca transport pentru orice furnizor acceptat. OmniRoute va utiliza automat ACP atunci când instrumentul CLI este disponibil.

---

## Cum funcționează ACP

### Arhitectură

```
┌─────────────────┐
│  OmniRoute      │
│  (Proxy HTTP)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Proces copil   │
│  (Agent CLI)    │
│                 │
│  stdin  ◄──────┤  Trimitere prompt
│  stdout ──────►│  Primire răspuns
│  stderr ──────►│  Primire erori
└─────────────────┘
```

### Ciclul de viață al procesului

1. **Lansare** — ACP creează un proces copil pentru agentul CLI
2. **Trimitere** — ACP scrie prompturile în stdin-ul procesului
3. **Primire** — ACP citește răspunsurile din stdout/stderr
4. **Detectarea inactivității** — ACP așteaptă 2 secunde de inactivitate înainte de a considera răspunsul complet
5. **Oprire** — ACP încheie procesul (SIGTERM, apoi SIGKILL după 5s)

### Protocol de comunicare

ACP utilizează **stdio** (intrare/ieșire standard) pentru comunicarea cu agenții CLI. Protocolul este:

1. **Trimiterea promptului** — Scriere în stdin, urmată de o linie nouă
2. **Așteptarea răspunsului** — Citire din stdout până la inactivitate (2s fără ieșire)
3. **Expirarea timpului de așteptare** — Valoarea implicită este de 120 de secunde (configurabilă)

---

## Referință API

### Funcții de registru

#### `detectInstalledAgents()`

Detectează toți agenții CLI instalați pe sistem. Rezultatele sunt stocate în cache timp de 60 de secunde.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Returnează: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // de ex., "codex", "claude"
  name: string; // Numele afișat
  binary: string; // Numele fișierului binar care va fi pornit
  versionCommand: string; // Comanda de detectare a versiunii
  version: string | null; // Versiunea detectată (null dacă nu este instalat)
  installed: boolean; // Indică dacă agentul este instalat
  providerAlias: string; // ID-ul furnizorului în OmniRoute
  spawnArgs: string[]; // Argumentele transmise la pornire
  protocol: "stdio" | "http"; // Protocolul de comunicare
  isCustom?: boolean; // Indică dacă acesta este un agent personalizat definit de utilizator
}
```

#### `getAvailableAgents()`

Obține numai agenții instalați și disponibili pentru ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Returnează: CliAgentInfo[] (numai agenții instalați)
```

#### `getAgentById(id)`

Obține un anumit agent după ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Returnează: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Setează definițiile agenților personalizați din configurări.

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

### Funcții de gestionare

#### `acpManager.spawn(agentId, binary, args, env)`

Pornește un proces nou pentru agentul CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* variabile de mediu personalizate */
});
// Returnează: AcpSession
```

**ID-uri de agent permise**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Trimite un prompt unui agent CLI și colectează răspunsul.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // timp de expirare de 2 minute
);
// Returnează: Promise<string>
```

#### `acpManager.kill(sessionId)`

Oprește o sesiune și efectuează curățarea.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Returnează: boolean
```

#### `acpManager.getActiveSessions()`

Obține toate sesiunile active.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Returnează: AcpSession[]
```

#### `acpManager.killAll()`

Oprește toate sesiunile.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interfața sesiunii

```typescript
interface AcpSession {
  id: string; // ID unic al sesiunii
  agentId: string; // ID-ul agentului (de ex., "claude")
  process: ChildProcess; // Referință la procesul copil
  alive: boolean; // Indică dacă procesul este activ
  stdoutBuffer: string; // Buffer stdout acumulat
  stderrBuffer: string; // Buffer stderr acumulat
  createdAt: Date; // Data și ora creării
}
```

### Evenimente

`AcpManager` extinde `EventEmitter` și emite următoarele evenimente:

#### `stdout`

Emis atunci când agentul CLI scrie în stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Emis atunci când agentul CLI scrie în stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Emis atunci când procesul agentului CLI se încheie.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Emis atunci când procesul agentului CLI întâmpină o eroare.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Configurare

### Variabile de mediu

ACP moștenește toate variabilele de mediu de la procesul părinte și poate fi extins cu variabile de mediu personalizate:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumente de pornire

Fiecare agent are argumente de pornire implicite definite în registru. Le puteți suprascrie:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Expirări

Timpul de expirare implicit pentru prompturi este de **120 de secunde** (2 minute). Îl puteți suprascrie:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minute
```

### Memoria cache pentru detectare

Detectarea agenților este stocată în memoria cache timp de **60 de secunde** pentru a evita scanările costisitoare ale sistemului de fișiere. Pentru a forța reîmprospătarea:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Securitate

### Prevenirea injectării comenzilor

ACP validează comenzile de afișare a versiunii pentru a preveni atacurile prin injectarea comenzilor:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Comenzile de afișare a versiunii care conțin aceste caractere sunt respinse:

- `;` — Separator de comenzi
- `&` — Proces în fundal
- `|` — Conductă
- `<`, `>` — Redirecționare
- `` ` `` — Substituire de comandă
- `$` — Expansiune de variabilă
- `\r`, `\n` — Sfârșituri de linie

### Validarea numelui fișierului binar

ACP validează dacă fișierul binar din comanda de afișare a versiunii corespunde numelui așteptat al fișierului binar (cu excepția cazului în care este un agent personalizat).

### Izolarea proceselor

Fiecare sesiune ACP rulează în propriul proces copil. Procesul este oprit atunci când sesiunea se încheie sau expiră.

---

## Performanță

### Performanța detectării

- **Primul apel**: ~50-200ms (rulează comanda `version` pentru fiecare agent)
- **Apeluri stocate în cache**: <1ms (returnează rezultatul din memoria cache)
- **TTL-ul memoriei cache**: 60 de secunde

### Performanța prompturilor

- **Pornire**: ~50-100ms
- **Trimiterea promptului**: ~10-50ms
- **Așteptarea răspunsului**: Depinde de agentul CLI (de obicei, 1-30 de secunde)
- **Oprire**: ~5 secunde (SIGTERM) + imediat (SIGKILL)

### Utilizarea resurselor

- **Memorie per sesiune**: ~10-50MB (depinde de agentul CLI)
- **CPU**: Minimă (limitată de operațiunile de intrare/ieșire)
- **Disc**: Niciuna

---

## Depanare

### Eroarea „Unknown agent”

**Problemă**: `acpManager.spawn()` generează eroarea `Unknown agent: <id>`

**Soluție**: Numai următorii agenți sunt permiși în `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Ceilalți agenți trebuie porniți manual sau prin intermediul definițiilor de agenți personalizați.

### Eroarea „Session not alive”

**Problemă**: `acpManager.sendPrompt()` generează eroarea `Session ${sessionId} is not alive`

**Soluție**: Este posibil ca sesiunea să se fi încheiat sau să fi fost oprită. Verificați starea sesiunii:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Reporniți sesiunea
  acpManager.spawn("claude", "claude", [], {});
}
```

### Eroarea „ACP timeout”

**Problemă**: `acpManager.sendPrompt()` generează eroarea `ACP timeout after 120000ms`

**Soluție**: Măriți timpul de expirare:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minute
```

### CLI nedetectat

**Problemă**: `detectInstalledAgents()` nu găsește CLI-ul dumneavoastră

**Soluții**:

1. **Verificați PATH**: Asigurați-vă că CLI-ul se află în variabila PATH a sistemului
2. **Verificați comanda de afișare a versiunii**: Rulați manual `claude --version`
3. **Verificați permisiunile**: Asigurați-vă că CLI-ul este executabil
4. **Agent personalizat**: Adăugați o definiție de agent personalizat pentru CLI-urile nestandard

### Permisiune refuzată

**Problemă**: ACP nu poate executa CLI-ul

**Soluții**:

1. **Verificați permisiunile fișierului**: `chmod +x /usr/local/bin/claude`
2. **Verificați proprietarul**: Asigurați-vă că OmniRoute are permisiuni de citire/executare
3. **Verificați SELinux/AppArmor**: Poate bloca pornirea proceselor

---

## Exemple

### Exemplul 1: Lansarea și utilizarea Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Detectează agenții instalați
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Lansează o sesiune nouă
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Trimite un prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Efectuează curățarea
  acpManager.kill(session.id);
}
```

### Exemplul 2: Descoperire automată cu opțiune de rezervă

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Încearcă mai întâi Claude, apoi folosește Codex ca opțiune de rezervă
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

### Exemplul 3: Agent personalizat

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Înregistrează un agent CLI personalizat
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

// Acum detectInstalledAgents() va include "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Ce urmează?

- **[Referință API](../reference/API_REFERENCE.md)** — Endpointuri REST API
- **[Referință pentru furnizori](../reference/PROVIDER_REFERENCE.md)** — Toți cei 352 de furnizori
- **[Server MCP](./MCP-SERVER.md)** — Integrarea Model Context Protocol
- **[Server A2A](./A2A-SERVER.md)** — Protocol Agent-to-Agent
- **[Agent cloud](./CLOUD_AGENT.md)** — Agenți bazați pe cloud

---

## Referințe

- [Proiectul AionUi](https://github.com/iOfficeAI/AionUi) — Sursă de inspirație pentru detectarea automată ACP
- [Codul sursă ACP](../../src/lib/acp/) — Detalii de implementare
  - `manager.ts` — Gestionarea ciclului de viață al proceselor
  - `registry.ts` — Descoperirea și înregistrarea agenților
  - `index.ts` — Exporturile API publice
