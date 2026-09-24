# ACP (Agent Client Protocol) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Kort fortalt**: ACP gør det muligt for OmniRoute at starte CLI-agenter (som Claude Code og Codex) som underprocesser i stedet for at bruge HTTP-API'er. Det giver dig en "CLI-som-backend"-transport.

---

## Hvad er ACP?

ACP (Agent Client Protocol) er en **"CLI-som-backend"-transport** til OmniRoute. I stedet for at opfange HTTP-API-kald til AI-udbydere **starter ACP CLI-agenter som underprocesser** og sender prompts gennem deres oprindelige grænseflade.

### Hvorfor bruge ACP?

| Fordel                        | Beskrivelse                                             |
| ----------------------------- | ------------------------------------------------------- |
| **Ingen API-nøgler påkrævet** | Bruger din eksisterende CLI-godkendelse                 |
| **Oprindelig protokol**       | Bruger hver CLI's oprindelige input-/outputformat       |
| **Automatisk registrering**   | Registrerer installerede CLI'er på dit system           |
| **15 indbyggede agenter**     | Forudkonfigureret til populære CLI-værktøjer            |
| **Brugerdefinerede agenter**  | Tilføj dine egne CLI-værktøjer via indstillinger        |
| **Processtyring**             | Håndterer livscyklussen (start, afsendelse, afslutning) |

---

## Understøttede CLI-agenter

ACP understøtter som standard **15 indbyggede CLI-agenter**:

| Agent-id      | Visningsnavn       | Binær fil     | Protokol |
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

### Brugerdefinerede agenter

Du kan tilføje dine egne CLI-agenter via indstillingerne. Brugerdefinerede agenter understøtter de samme funktioner som indbyggede agenter.

---

## Hurtig start

### Trin 1: Installer en CLI-agent

```bash
# Eksempel: Installer Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Bekræft installationen
claude --version
```

### Trin 2: Automatisk registrering med ACP

ACP registrerer automatisk installerede CLI-agenter på dit system. Ingen konfiguration er nødvendig!

### Trin 3: Brug ACP-transporten

Når den er registreret, kan ACP bruges som transport for enhver understøttet udbyder. OmniRoute bruger automatisk ACP, når CLI'en er tilgængelig.

---

## Sådan fungerer ACP

### Arkitektur

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP-proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Underproces    │
│  (CLI-agent)    │
│                 │
│  stdin  ◄──────┤  Send prompt
│  stdout ──────►│  Modtag svar
│  stderr ──────►│  Modtag fejl
└─────────────────┘
```

### Processens livscyklus

1. **Start** — ACP opretter en underproces til CLI-agenten
2. **Send** — ACP skriver prompts til processens stdin
3. **Modtag** — ACP læser svar fra stdout/stderr
4. **Registrering af inaktivitet** — ACP venter på 2 sekunders inaktivitet, før svaret betragtes som fuldført
5. **Afslut** — ACP afslutter processen (SIGTERM og derefter SIGKILL efter 5 sek.)

### Kommunikationsprotokol

ACP bruger **stdio** (standardinput/-output) til kommunikation med CLI-agenter. Protokollen er:

1. **Send prompt** — Skriv til stdin med et linjeskift
2. **Vent på svar** — Læs fra stdout indtil inaktivitet (intet output i 2 sek.)
3. **Timeout** — Som standard 120 sekunder (kan konfigureres)

---

## API-reference

### Registreringsfunktioner

#### `detectInstalledAgents()`

Registrerer alle installerede CLI-agenter på systemet. Resultaterne caches i 60 sekunder.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Returnerer: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // f.eks. "codex", "claude"
  name: string; // Vist navn
  binary: string; // Navn på den binære fil, der skal startes
  versionCommand: string; // Kommando til registrering af version
  version: string | null; // Registreret version (null, hvis den ikke er installeret)
  installed: boolean; // Om agenten er installeret
  providerAlias: string; // Udbyder-id i OmniRoute
  spawnArgs: string[]; // Argumenter, der skal overføres ved start
  protocol: "stdio" | "http"; // Kommunikationsprotokol
  isCustom?: boolean; // Om dette er en brugerdefineret agent
}
```

#### `getAvailableAgents()`

Henter kun de agenter, der er installeret og tilgængelige for ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Returnerer: CliAgentInfo[] (kun installerede agenter)
```

#### `getAgentById(id)`

Henter en bestemt agent efter id.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Returnerer: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Angiver brugerdefinerede agentdefinitioner fra indstillingerne.

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

### Managerfunktioner

#### `acpManager.spawn(agentId, binary, args, env)`

Starter en ny CLI-agentproces.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* brugerdefinerede miljøvariabler */
});
// Returnerer: AcpSession
```

**Tilladte agent-id'er**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Sender en prompt til en CLI-agent og indsamler svaret.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // timeout på 2 minutter
);
// Returnerer: Promise<string>
```

#### `acpManager.kill(sessionId)`

Afslutter en session og rydder op.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Returnerer: boolean
```

#### `acpManager.getActiveSessions()`

Henter alle aktive sessioner.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Returnerer: AcpSession[]
```

#### `acpManager.killAll()`

Afslutter alle sessioner.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Sessionsinterface

```typescript
interface AcpSession {
  id: string; // Unikt sessions-id
  agentId: string; // Agent-id (f.eks. "claude")
  process: ChildProcess; // Reference til underproces
  alive: boolean; // Om processen kører
  stdoutBuffer: string; // Akkumuleret stdout-buffer
  stderrBuffer: string; // Akkumuleret stderr-buffer
  createdAt: Date; // Oprettelsestidspunkt
}
```

### Hændelser

`AcpManager` udvider `EventEmitter` og udsender følgende hændelser:

#### `stdout`

Udsendes, når CLI-agenten skriver til stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Udsendes, når CLI-agenten skriver til stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Udsendes, når CLI-agentprocessen afsluttes.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Udsendes, når der opstår en fejl i CLI-agentprocessen.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfiguration

### Miljøvariabler

ACP arver alle miljøvariabler fra den overordnede proces og kan udvides med brugerdefinerede miljøvariabler:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Startargumenter

Hver agent har standardstartargumenter defineret i registreringsdatabasen. Du kan tilsidesætte dem:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Timeouts

Standardtimeouten for prompts er **120 sekunder** (2 minutter). Du kan tilsidesætte den:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutter
```

### Detektionscache

Agentdetektion caches i **60 sekunder** for at undgå ressourcekrævende scanninger af filsystemet. Gennemtving en opdatering:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Sikkerhed

### Forebyggelse af kommandoinjektion

ACP validerer versionskommandoer for at forhindre kommandoinjektionsangreb:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Versionskommandoer, der indeholder disse tegn, afvises:

- `;` — Kommandoseparator
- `&` — Baggrundsproces
- `|` — Pipe
- `<`, `>` — Omdirigering
- `` ` `` — Kommandoerstatning
- `$` — Variabeludvidelse
- `\r`, `\n` — Linjeskift

### Validering af binært navn

ACP validerer, at binærfilen i versionskommandoen matcher det forventede binære navn (medmindre det er en brugerdefineret agent).

### Procesisolering

Hver ACP-session kører i sin egen underproces. Processen afsluttes, når sessionen afsluttes eller får timeout.

---

## Ydeevne

### Detektionsydeevne

- **Første kald**: ~50-200ms (kører kommandoen `version` for hver agent)
- **Cachede kald**: <1ms (returnerer fra cachen)
- **Cachens TTL**: 60 sekunder

### Prompt-ydeevne

- **Start**: ~50-100ms
- **Send prompt**: ~10-50ms
- **Vent på svar**: Afhænger af CLI-agenten (typisk 1-30 sekunder)
- **Afslut**: ~5 sekunder (SIGTERM) + øjeblikkeligt (SIGKILL)

### Ressourceforbrug

- **Hukommelse pr. session**: ~10-50MB (afhænger af CLI-agenten)
- **CPU**: Minimalt (I/O-begrænset)
- **Disk**: Intet

---

## Fejlfinding

### Fejlen "Unknown agent"

**Problem**: `acpManager.spawn()` udløser `Unknown agent: <id>`

**Løsning**: Kun disse agenter er tilladt i `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Andre agenter skal startes manuelt eller via brugerdefinerede agentdefinitioner.

### Fejlen "Session not alive"

**Problem**: `acpManager.sendPrompt()` udløser `Session ${sessionId} is not alive`

**Løsning**: Sessionen kan være afsluttet eller blevet lukket. Kontrollér sessionens status:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Start sessionen igen
  acpManager.spawn("claude", "claude", [], {});
}
```

### Fejlen "ACP timeout"

**Problem**: `acpManager.sendPrompt()` udløser `ACP timeout after 120000ms`

**Løsning**: Forøg timeouten:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutter
```

### CLI ikke fundet

**Problem**: `detectInstalledAgents()` finder ikke din CLI

**Løsninger**:

1. **Kontrollér PATH**: Sørg for, at CLI'en findes i dit systems PATH
2. **Kontrollér versionskommandoen**: Kør `claude --version` manuelt
3. **Kontrollér tilladelser**: Sørg for, at CLI'en kan køres
4. **Brugerdefineret agent**: Tilføj en brugerdefineret agentdefinition for ikke-standardiserede CLI'er

### Adgang nægtet

**Problem**: ACP kan ikke køre CLI'en

**Løsninger**:

1. **Kontrollér filtilladelser**: `chmod +x /usr/local/bin/claude`
2. **Kontrollér ejerskab**: Sørg for, at OmniRoute har læse-/kørselstilladelser
3. **Kontrollér SELinux/AppArmor**: Kan blokere start af processer

---

## Eksempler

### Eksempel 1: Start og brug Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Registrer installerede agenter
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Start en ny session
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Send en prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Ryd op
  acpManager.kill(session.id);
}
```

### Eksempel 2: Automatisk registrering med fallback

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Prøv Claude først, og brug Codex som fallback
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

### Eksempel 3: Brugerdefineret agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registrer en brugerdefineret CLI-agent
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

// Nu vil detectInstalledAgents() inkludere "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Hvad er det næste?

- **[API-reference](../reference/API_REFERENCE.md)** — REST API-slutpunkter
- **[Udbyderreference](../reference/PROVIDER_REFERENCE.md)** — Alle 352 udbydere
- **[MCP-server](./MCP-SERVER.md)** — Integration med Model Context Protocol
- **[A2A-server](./A2A-SERVER.md)** — Agent-til-agent-protokol
- **[Cloud-agent](./CLOUD_AGENT.md)** — Cloudbaserede agenter

---

## Reference

- [AionUi-projektet](https://github.com/iOfficeAI/AionUi) — Inspiration til automatisk ACP-registrering
- [ACP-kildekode](../../src/lib/acp/) — Implementeringsdetaljer
  - `manager.ts` — Administration af processers livscyklus
  - `registry.ts` — Registrering og tilmelding af agenter
  - `index.ts` — Eksport af offentligt API
