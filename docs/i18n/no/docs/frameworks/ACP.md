# ACP (Agent Client Protocol) (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Kort fortalt**: ACP lar OmniRoute starte CLI-agenter (som Claude Code og Codex) som underprosesser i stedet for å bruke HTTP-API-er. Dette gir deg «CLI-som-backend»-transport.

---

## Hva er ACP?

ACP (Agent Client Protocol) er en **«CLI-som-backend»-transport** for OmniRoute. I stedet for å avskjære HTTP-API-kall til KI-leverandører **starter ACP CLI-agenter som underprosesser** og sender forespørsler gjennom deres opprinnelige grensesnitt.

### Hvorfor bruke ACP?

| Fordel                      | Beskrivelse                                     |
| --------------------------- | ----------------------------------------------- |
| **Ingen API-nøkler kreves** | Bruker den eksisterende CLI-autentiseringen din |
| **Opprinnelig protokoll**   | Bruker hver CLI sitt eget inn-/utdataformat     |
| **Automatisk oppdagelse**   | Oppdager installerte CLI-er på systemet ditt    |
| **15 innebygde agenter**    | Forhåndskonfigurert for populære CLI-verktøy    |
| **Egendefinerte agenter**   | Legg til egne CLI-verktøy via innstillingene    |
| **Prosesshåndtering**       | Håndterer livssyklusen (start, send, avslutt)   |

---

## Støttede CLI-agenter

ACP støtter **15 innebygde CLI-agenter** som standard:

| Agent-ID      | Visningsnavn       | Binærfil      | Protokoll |
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

### Egendefinerte agenter

Du kan legge til egne CLI-agenter via innstillingene. Egendefinerte agenter støtter de samme funksjonene som innebygde agenter.

---

## Hurtigstart

### Trinn 1: Installer en CLI-agent

```bash
# Eksempel: Installer Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Bekreft installasjonen
claude --version
```

### Trinn 2: Automatisk ACP-oppdagelse

ACP oppdager automatisk installerte CLI-agenter på systemet ditt. Ingen konfigurasjon er nødvendig!

### Trinn 3: Bruk ACP-transport

Når ACP er oppdaget, kan det brukes som transport for alle støttede leverandører. OmniRoute bruker automatisk ACP når CLI-en er tilgjengelig.

---

## Slik fungerer ACP

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
│  Underprosess   │
│  (CLI-agent)    │
│                 │
│  stdin  ◄──────┤  Send forespørsel
│  stdout ──────►│  Motta svar
│  stderr ──────►│  Motta feil
└─────────────────┘
```

### Prosessens livssyklus

1. **Start** — ACP oppretter en underprosess for CLI-agenten
2. **Send** — ACP skriver forespørsler til prosessens stdin
3. **Motta** — ACP leser svar fra stdout/stderr
4. **Registrering av inaktivitet** — ACP venter på 2 sekunders inaktivitet før svaret anses som fullført
5. **Avslutt** — ACP avslutter prosessen (SIGTERM, deretter SIGKILL etter 5 sekunder)

### Kommunikasjonsprotokoll

ACP bruker **stdio** (standard inn-/utdata) til kommunikasjon med CLI-agenter. Protokollen er:

1. **Send forespørsel** — Skriv til stdin med et linjeskift
2. **Vent på svar** — Les fra stdout frem til inaktivitet (ingen utdata i 2 sekunder)
3. **Tidsavbrudd** — Standardverdien er 120 sekunder (kan konfigureres)

---

## API-referanse

### Registerfunksjoner

#### `detectInstalledAgents()`

Oppdager alle installerte CLI-agenter på systemet. Resultatene bufres i 60 sekunder.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Returnerer: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // f.eks. «codex», «claude»
  name: string; // Visningsnavn
  binary: string; // Navn på binærfilen som skal startes
  versionCommand: string; // Kommando for versjonsregistrering
  version: string | null; // Registrert versjon (null hvis den ikke er installert)
  installed: boolean; // Om agenten er installert
  providerAlias: string; // Leverandør-ID i OmniRoute
  spawnArgs: string[]; // Argumenter som skal sendes ved oppstart
  protocol: "stdio" | "http"; // Kommunikasjonsprotokoll
  isCustom?: boolean; // Om dette er en brukerdefinert tilpasset agent
}
```

#### `getAvailableAgents()`

Henter bare agentene som er installert og tilgjengelige for ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Returnerer: CliAgentInfo[] (bare installerte agenter)
```

#### `getAgentById(id)`

Henter en bestemt agent etter ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Returnerer: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Angir egendefinerte agentdefinisjoner fra innstillingene.

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

### Administrasjonsfunksjoner

#### `acpManager.spawn(agentId, binary, args, env)`

Starter en ny CLI-agentprosess.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* egendefinerte miljøvariabler */
});
// Returnerer: AcpSession
```

**Tillatte agent-ID-er**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Sender en instruksjon til en CLI-agent og samler inn svaret.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // tidsavbrudd etter 2 minutter
);
// Returnerer: Promise<string>
```

#### `acpManager.kill(sessionId)`

Avslutter en økt og rydder opp.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Returnerer: boolean
```

#### `acpManager.getActiveSessions()`

Henter alle aktive økter.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Returnerer: AcpSession[]
```

#### `acpManager.killAll()`

Avslutter alle økter.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Øktgrensesnitt

```typescript
interface AcpSession {
  id: string; // Unik økt-ID
  agentId: string; // Agent-ID (f.eks. «claude»)
  process: ChildProcess; // Referanse til underprosessen
  alive: boolean; // Om prosessen kjører
  stdoutBuffer: string; // Akkumulert stdout-buffer
  stderrBuffer: string; // Akkumulert stderr-buffer
  createdAt: Date; // Tidsstempel for opprettelse
}
```

### Hendelser

`AcpManager` utvider `EventEmitter` og sender ut følgende hendelser:

#### `stdout`

Sendes ut når CLI-agenten skriver til stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Sendes ut når CLI-agenten skriver til stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Sendes ut når CLI-agentprosessen avsluttes.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Sendes ut når det oppstår en feil i CLI-agentprosessen.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfigurasjon

### Miljøvariabler

ACP arver alle miljøvariabler fra den overordnede prosessen og kan utvides med egendefinerte miljøvariabler:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Oppstartsargumenter

Hver agent har standardargumenter for oppstart definert i registeret. Du kan overstyre dem:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Tidsavbrudd

Standard tidsavbrudd for ledetekster er **120 sekunder** (2 minutter). Du kan overstyre det:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutter
```

### Deteksjonsbuffer

Agentdeteksjon bufres i **60 sekunder** for å unngå ressurskrevende søk i filsystemet. Tving frem en oppdatering:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Sikkerhet

### Forebygging av kommandoinjeksjon

ACP validerer versjonskommandoer for å forhindre kommandoinjeksjonsangrep:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Versjonskommandoer som inneholder disse tegnene, avvises:

- `;` — Kommandoseparator
- `&` — Bakgrunnsprosess
- `|` — Kommandorør
- `<`, `>` — Omdirigering
- `` ` `` — Kommandoerstatning
- `$` — Variabelutvidelse
- `\r`, `\n` — Linjeskift

### Validering av binærnavn

ACP validerer at binærfilen i versjonskommandoen samsvarer med det forventede binærnavnet (med mindre det er en egendefinert agent).

### Prosessisolasjon

Hver ACP-økt kjører i sin egen underprosess. Prosessen avsluttes når økten avsluttes eller tidsavbruddet inntreffer.

---

## Ytelse

### Deteksjonsytelse

- **Første kall**: ~50–200 ms (kjører `version`-kommandoen for hver agent)
- **Bufrede kall**: <1 ms (returnerer fra hurtigbufferen)
- **Hurtigbufferens TTL**: 60 sekunder

### Ledetekstytelse

- **Oppstart**: ~50–100 ms
- **Sending av ledetekst**: ~10–50 ms
- **Ventetid på svar**: Avhenger av CLI-agenten (vanligvis 1–30 sekunder)
- **Avslutning**: ~5 sekunder (SIGTERM) + umiddelbart (SIGKILL)

### Ressursbruk

- **Minne per økt**: ~10–50 MB (avhenger av CLI-agenten)
- **CPU**: Minimal (I/O-bundet)
- **Disk**: Ingen

---

## Feilsøking

### Feilen "Unknown agent"

**Problem**: `acpManager.spawn()` utløser `Unknown agent: <id>`

**Løsning**: Bare disse agentene er tillatt i `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Andre agenter må startes manuelt eller via egendefinerte agentdefinisjoner.

### Feilen "Session not alive"

**Problem**: `acpManager.sendPrompt()` utløser `Session ${sessionId} is not alive`

**Løsning**: Økten kan ha blitt avsluttet eller stoppet. Kontroller øktstatusen:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Start økten på nytt
  acpManager.spawn("claude", "claude", [], {});
}
```

### Feilen "ACP timeout"

**Problem**: `acpManager.sendPrompt()` utløser `ACP timeout after 120000ms`

**Løsning**: Øk tidsavbruddet:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutter
```

### CLI ble ikke oppdaget

**Problem**: `detectInstalledAgents()` finner ikke CLI-verktøyet ditt

**Løsninger**:

1. **Kontroller PATH**: Sørg for at CLI-verktøyet finnes i systemets PATH
2. **Kontroller versjonskommandoen**: Kjør `claude --version` manuelt
3. **Kontroller tillatelser**: Sørg for at CLI-verktøyet er kjørbart
4. **Egendefinert agent**: Legg til en egendefinert agentdefinisjon for ikke-standardiserte CLI-verktøy

### Ingen tilgang

**Problem**: ACP kan ikke kjøre CLI-verktøyet

**Løsninger**:

1. **Kontroller filtillatelser**: `chmod +x /usr/local/bin/claude`
2. **Kontroller eierskap**: Sørg for at OmniRoute har lese- og kjøretillatelser
3. **Kontroller SELinux/AppArmor**: Kan blokkere oppstart av prosesser

---

## Eksempler

### Eksempel 1: Start og bruk Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Oppdag installerte agenter
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Start en ny økt
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Send en ledetekst
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Rydd opp
  acpManager.kill(session.id);
}
```

### Eksempel 2: Automatisk oppdagelse med reservealternativ

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Prøv Claude først, bruk Codex som reserve
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

### Eksempel 3: Egendefinert agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registrer en egendefinert CLI-agent
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

// Nå vil detectInstalledAgents() inkludere "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Hva er neste steg?

- **[API-referanse](../reference/API_REFERENCE.md)** — REST API-endepunkter
- **[Leverandørreferanse](../reference/PROVIDER_REFERENCE.md)** — Alle 352 leverandører
- **[MCP-server](./MCP-SERVER.md)** — Integrasjon med Model Context Protocol
- **[A2A-server](./A2A-SERVER.md)** — Agent-til-agent-protokoll
- **[Skyagent](./CLOUD_AGENT.md)** — Skybaserte agenter

---

## Referanse

- [AionUi-prosjektet](https://github.com/iOfficeAI/AionUi) — Inspirasjon for automatisk ACP-oppdagelse
- [ACP-kildekode](../../src/lib/acp/) — Implementasjonsdetaljer
  - `manager.ts` — Administrasjon av prosesslivssyklus
  - `registry.ts` — Oppdagelse og registrering av agenter
  - `index.ts` — Offentlige API-eksporter
