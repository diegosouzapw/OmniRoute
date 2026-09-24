# ACP (Agent Client Protocol) (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP låter OmniRoute starta CLI-agenter (som Claude Code och Codex) som underordnade processer i stället för att använda HTTP-API:er. Detta ger dig transporttypen ”CLI-som-backend”.

---

## Vad är ACP?

ACP (Agent Client Protocol) är en **transporttyp där CLI används som backend** för OmniRoute. I stället för att fånga upp HTTP-API-anrop till AI-leverantörer **startar ACP CLI-agenter som underordnade processer** och skickar prompter via deras inbyggda gränssnitt.

### Varför använda ACP?

| Fördel                       | Beskrivning                                         |
| ---------------------------- | --------------------------------------------------- |
| **Inga API-nycklar behövs**  | Använder din befintliga CLI-autentisering           |
| **Inbyggt protokoll**        | Använder respektive CLI:s inbyggda in-/utdataformat |
| **Automatisk identifiering** | Identifierar installerade CLI:er på ditt system     |
| **15 inbyggda agenter**      | Förkonfigurerat för populära CLI-verktyg            |
| **Anpassade agenter**        | Lägg till egna CLI-verktyg via inställningarna      |
| **Processhantering**         | Hanterar livscykeln (starta, skicka, avsluta)       |

---

## CLI-agenter som stöds

ACP har inbyggt stöd för **15 CLI-agenter** direkt:

| Agent-ID      | Visningsnamn       | Binärfil      | Protokoll |
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

### Anpassade agenter

Du kan lägga till egna CLI-agenter via inställningarna. Anpassade agenter har stöd för samma funktioner som inbyggda agenter.

---

## Snabbstart

### Steg 1: Installera en CLI-agent

```bash
# Exempel: Installera Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verifiera installationen
claude --version
```

### Steg 2: Automatisk identifiering med ACP

ACP identifierar automatiskt installerade CLI-agenter på ditt system. Ingen konfiguration behövs!

### Steg 3: Använd ACP-transport

När ACP har identifierat en agent kan det användas som transport för alla leverantörer som stöds. OmniRoute använder automatiskt ACP när CLI:n är tillgänglig.

---

## Så fungerar ACP

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
│  Underordnad    │
│  process        │
│  (CLI-agent)    │
│                 │
│  stdin  ◄──────┤  Skicka prompt
│  stdout ──────►│  Ta emot svar
│  stderr ──────►│  Ta emot fel
└─────────────────┘
```

### Processens livscykel

1. **Starta** — ACP skapar en underordnad process för CLI-agenten
2. **Skicka** — ACP skriver prompter till processens stdin
3. **Ta emot** — ACP läser svar från stdout/stderr
4. **Identifiering av inaktivitet** — ACP väntar tills ingen aktivitet har förekommit i 2 sekunder innan svaret betraktas som fullständigt
5. **Avsluta** — ACP avslutar processen (SIGTERM och därefter SIGKILL efter 5 sekunder)

### Kommunikationsprotokoll

ACP använder **stdio** (standardindata/-utdata) för kommunikation med CLI-agenter. Protokollet är:

1. **Skicka prompt** — Skriv till stdin med en radbrytning
2. **Vänta på svar** — Läs från stdout tills processen är inaktiv (inga utdata under 2 sekunder)
3. **Tidsgräns** — Standardvärdet är 120 sekunder (kan konfigureras)

---

## API-referens

### Registerfunktioner

#### `detectInstalledAgents()`

Identifierar alla installerade CLI-agenter i systemet. Resultaten cachelagras i 60 sekunder.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Returnerar: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // t.ex. "codex", "claude"
  name: string; // Visningsnamn
  binary: string; // Namnet på binärfilen som ska startas
  versionCommand: string; // Kommando för versionsidentifiering
  version: string | null; // Identifierad version (null om den inte är installerad)
  installed: boolean; // Huruvida agenten är installerad
  providerAlias: string; // Leverantörs-ID i OmniRoute
  spawnArgs: string[]; // Argument som ska skickas vid start
  protocol: "stdio" | "http"; // Kommunikationsprotokoll
  isCustom?: boolean; // Huruvida detta är en användardefinierad anpassad agent
}
```

#### `getAvailableAgents()`

Hämtar endast de agenter som är installerade och tillgängliga för ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Returnerar: CliAgentInfo[] (endast installerade agenter)
```

#### `getAgentById(id)`

Hämtar en specifik agent efter ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Returnerar: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Anger definitioner för anpassade agenter från inställningarna.

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

### Hanterarfunktioner

#### `acpManager.spawn(agentId, binary, args, env)`

Startar en ny CLI-agentprocess.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* anpassade miljövariabler */
});
// Returnerar: AcpSession
```

**Tillåtna agent-ID:n**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Skickar en prompt till en CLI-agent och samlar in svaret.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // tidsgräns på 2 minuter
);
// Returnerar: Promise<string>
```

#### `acpManager.kill(sessionId)`

Avslutar en session och rensar upp.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Returnerar: boolean
```

#### `acpManager.getActiveSessions()`

Hämtar alla aktiva sessioner.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Returnerar: AcpSession[]
```

#### `acpManager.killAll()`

Avslutar alla sessioner.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Sessionsgränssnitt

```typescript
interface AcpSession {
  id: string; // Unikt sessions-ID
  agentId: string; // Agent-ID (t.ex. "claude")
  process: ChildProcess; // Referens till underordnad process
  alive: boolean; // Huruvida processen körs
  stdoutBuffer: string; // Ackumulerad stdout-buffert
  stderrBuffer: string; // Ackumulerad stderr-buffert
  createdAt: Date; // Tidsstämpel för skapandet
}
```

### Händelser

`AcpManager` utökar `EventEmitter` och genererar följande händelser:

#### `stdout`

Genereras när CLI-agenten skriver till stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Genereras när CLI-agenten skriver till stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Genereras när CLI-agentprocessen avslutas.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Genereras när ett fel uppstår i CLI-agentprocessen.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfiguration

### Miljövariabler

ACP ärver alla miljövariabler från den överordnade processen och kan utökas med anpassade miljövariabler:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Startargument

Varje agent har standardargument för start definierade i registret. Du kan åsidosätta dem:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Tidsgränser

Standardtidsgränsen för prompter är **120 sekunder** (2 minuter). Du kan åsidosätta den:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuter
```

### Detekteringscache

Agentdetektering cachelagras i **60 sekunder** för att undvika resurskrävande genomsökningar av filsystemet. Tvinga fram en uppdatering:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Säkerhet

### Förebyggande av kommandoinjektion

ACP validerar versionskommandon för att förhindra kommandoinjektionsattacker:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Versionskommandon som innehåller dessa tecken avvisas:

- `;` — Kommandoavgränsare
- `&` — Bakgrundsprocess
- `|` — Pipe
- `<`, `>` — Omdirigering
- `` ` `` — Kommandoersättning
- `$` — Variabelexpansion
- `\r`, `\n` — Radbrytningar

### Validering av binärnamn

ACP validerar att binärfilen i versionskommandot matchar det förväntade binärnamnet (såvida det inte är en anpassad agent).

### Processisolering

Varje ACP-session körs i en egen underordnad process. Processen avslutas när sessionen avslutas eller tidsgränsen överskrids.

---

## Prestanda

### Detekteringsprestanda

- **Första anropet**: ~50-200ms (kör kommandot `version` för varje agent)
- **Cachelagrade anrop**: <1ms (returnerar från cachen)
- **Cachens TTL**: 60 sekunder

### Promptprestanda

- **Start**: ~50-100ms
- **Skicka prompt**: ~10-50ms
- **Vänta på svar**: Beror på CLI-agenten (vanligtvis 1-30 sekunder)
- **Avsluta**: ~5 sekunder (SIGTERM) + omedelbart (SIGKILL)

### Resursanvändning

- **Minne per session**: ~10-50MB (beror på CLI-agenten)
- **CPU**: Minimal (I/O-bunden)
- **Disk**: Ingen

---

## Felsökning

### Felet "Unknown agent"

**Problem**: `acpManager.spawn()` genererar `Unknown agent: <id>`

**Lösning**: Endast dessa agenter är tillåtna i `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Andra agenter måste startas manuellt eller via anpassade agentdefinitioner.

### Felet "Session not alive"

**Problem**: `acpManager.sendPrompt()` genererar `Session ${sessionId} is not alive`

**Lösning**: Sessionen kan ha avslutats eller stoppats. Kontrollera sessionsstatusen:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Starta sessionen igen
  acpManager.spawn("claude", "claude", [], {});
}
```

### Felet "ACP timeout"

**Problem**: `acpManager.sendPrompt()` genererar `ACP timeout after 120000ms`

**Lösning**: Öka tidsgränsen:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuter
```

### CLI identifieras inte

**Problem**: `detectInstalledAgents()` hittar inte ditt CLI

**Lösningar**:

1. **Kontrollera PATH**: Säkerställ att CLI:t finns i systemets PATH
2. **Kontrollera versionskommandot**: Kör `claude --version` manuellt
3. **Kontrollera behörigheter**: Säkerställ att CLI:t är körbart
4. **Anpassad agent**: Lägg till en anpassad agentdefinition för CLI:n som inte följer standarden

### Åtkomst nekad

**Problem**: ACP kan inte köra CLI:t

**Lösningar**:

1. **Kontrollera filbehörigheter**: `chmod +x /usr/local/bin/claude`
2. **Kontrollera ägarskap**: Säkerställ att OmniRoute har läs- och körbehörigheter
3. **Kontrollera SELinux/AppArmor**: Kan blockera start av processer

---

## Exempel

### Exempel 1: Starta och använd Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Identifiera installerade agenter
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Starta en ny session
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Skicka en prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Rensa upp
  acpManager.kill(session.id);
}
```

### Exempel 2: Automatisk identifiering med reservlösning

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Prova Claude först och använd Codex som reserv
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

### Exempel 3: Anpassad agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registrera en anpassad CLI-agent
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

// Nu kommer detectInstalledAgents() att inkludera "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Vad händer härnäst?

- **[API-referens](../reference/API_REFERENCE.md)** — REST API-slutpunkter
- **[Leverantörsreferens](../reference/PROVIDER_REFERENCE.md)** — Alla 352 leverantörer
- **[MCP-server](./MCP-SERVER.md)** — Integrering med Model Context Protocol
- **[A2A-server](./A2A-SERVER.md)** — Agent-till-agent-protokoll
- **[Molnagent](./CLOUD_AGENT.md)** — Molnbaserade agenter

---

## Referens

- [AionUi-projektet](https://github.com/iOfficeAI/AionUi) — Inspiration för automatisk ACP-identifiering
- [ACP-källkod](../../src/lib/acp/) — Implementeringsdetaljer
  - `manager.ts` — Hantering av processers livscykel
  - `registry.ts` — Identifiering och registrering av agenter
  - `index.ts` — Offentliga API-exporter
