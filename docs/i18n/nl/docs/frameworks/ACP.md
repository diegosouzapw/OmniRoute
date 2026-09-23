# ACP (Agent Client Protocol) (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: Met ACP kan OmniRoute CLI-agents (zoals Claude Code en Codex) als onderliggende processen starten in plaats van HTTP-API's te gebruiken. Dit biedt je een ‘CLI-als-backend’-transport.

---

## Wat is ACP?

ACP (Agent Client Protocol) is een **‘CLI-als-backend’-transport** voor OmniRoute. In plaats van HTTP-API-aanroepen naar AI-providers te onderscheppen, **start ACP CLI-agents als onderliggende processen** en voert het prompts in via hun native interface.

### Waarom ACP gebruiken?

| Voordeel                    | Beschrijving                                             |
| --------------------------- | -------------------------------------------------------- |
| **Geen API-sleutels nodig** | Gebruikt je bestaande CLI-authenticatie                  |
| **Native protocol**         | Gebruikt de native invoer-/uitvoerindeling van elke CLI  |
| **Automatische detectie**   | Detecteert geïnstalleerde CLI's op je systeem            |
| **15 ingebouwde agents**    | Vooraf geconfigureerd voor populaire CLI-tools           |
| **Aangepaste agents**       | Voeg je eigen CLI-tools toe via de instellingen          |
| **Procesbeheer**            | Beheert de levenscyclus (starten, verzenden, beëindigen) |

---

## Ondersteunde CLI-agents

ACP ondersteunt standaard **15 ingebouwde CLI-agents**:

| Agent-ID      | Weergavenaam       | Binair bestand | Protocol |
| ------------- | ------------------ | -------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`        | stdio    |
| `claude`      | Claude Code CLI    | `claude`       | stdio    |
| `goose`       | Goose CLI          | `goose`        | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`     | stdio    |
| `aider`       | Aider              | `aider`        | stdio    |
| `opencode`    | OpenCode           | `opencode`     | stdio    |
| `cline`       | Cline              | `cline`        | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`   | stdio    |
| `forge`       | ForgeCode          | `forge`        | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`            | stdio    |
| `interpreter` | Open Interpreter   | `interpreter`  | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`       | stdio    |
| `warp`        | Warp AI            | `warp`         | stdio    |
| `gemini`      | Gemini CLI         | `gemini`       | stdio    |
| `zcode`       | ZCode              | `zcode`        | stdio    |

### Aangepaste agents

Je kunt via de instellingen je eigen CLI-agents toevoegen. Aangepaste agents ondersteunen dezelfde functies als ingebouwde agents.

---

## Snel aan de slag

### Stap 1: installeer een CLI-agent

```bash
# Voorbeeld: installeer Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Controleer de installatie
claude --version
```

### Stap 2: automatische detectie door ACP

ACP detecteert automatisch geïnstalleerde CLI-agents op je systeem. Er is geen configuratie nodig!

### Stap 3: gebruik het ACP-transport

Zodra een agent is gedetecteerd, kan ACP worden gebruikt als transport voor elke ondersteunde provider. OmniRoute gebruikt automatisch ACP wanneer de CLI beschikbaar is.

---

## Hoe ACP werkt

### Architectuur

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP-proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Onderliggend   │
│  proces         │
│  (CLI-agent)    │
│                 │
│  stdin  ◄──────┤  Prompt verzenden
│  stdout ──────►│  Antwoord ontvangen
│  stderr ──────►│  Fouten ontvangen
└─────────────────┘
```

### Proceslevenscyclus

1. **Starten** — ACP maakt een onderliggend proces voor de CLI-agent
2. **Verzenden** — ACP schrijft prompts naar stdin van het proces
3. **Ontvangen** — ACP leest antwoorden uit stdout/stderr
4. **Inactiviteitsdetectie** — ACP wacht 2 seconden zonder activiteit voordat het antwoord als voltooid wordt beschouwd
5. **Beëindigen** — ACP beëindigt het proces (SIGTERM en vervolgens SIGKILL na 5 seconden)

### Communicatieprotocol

ACP gebruikt **stdio** (standaardinvoer/-uitvoer) voor communicatie met CLI-agents. Het protocol werkt als volgt:

1. **Prompt verzenden** — Schrijf naar stdin, gevolgd door een nieuwe regel
2. **Op antwoord wachten** — Lees uit stdout totdat er sprake is van inactiviteit (2 seconden zonder uitvoer)
3. **Time-out** — Standaard 120 seconden (configureerbaar)

---

## API-referentie

### Registerfuncties

#### `detectInstalledAgents()`

Detecteert alle geïnstalleerde CLI-agents op het systeem. Resultaten worden 60 seconden in de cache bewaard.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Retourneert: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // bijv. "codex", "claude"
  name: string; // Weergavenaam
  binary: string; // Naam van het uitvoerbare bestand dat moet worden gestart
  versionCommand: string; // Opdracht voor versiedetectie
  version: string | null; // Gedetecteerde versie (null indien niet geïnstalleerd)
  installed: boolean; // Of de agent is geïnstalleerd
  providerAlias: string; // Provider-ID in OmniRoute
  spawnArgs: string[]; // Argumenten die bij het starten worden doorgegeven
  protocol: "stdio" | "http"; // Communicatieprotocol
  isCustom?: boolean; // Of dit een door de gebruiker gedefinieerde aangepaste agent is
}
```

#### `getAvailableAgents()`

Haalt alleen de agents op die geïnstalleerd en beschikbaar zijn voor ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Retourneert: CliAgentInfo[] (alleen geïnstalleerde agents)
```

#### `getAgentById(id)`

Haalt een specifieke agent op via ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Retourneert: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Stelt aangepaste agentdefinities uit de instellingen in.

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

### Beheerfuncties

#### `acpManager.spawn(agentId, binary, args, env)`

Start een nieuw CLI-agentproces.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* aangepaste omgevingsvariabelen */
});
// Retourneert: AcpSession
```

**Toegestane agent-ID's**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Stuurt een prompt naar een CLI-agent en verzamelt het antwoord.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // time-out van 2 minuten
);
// Retourneert: Promise<string>
```

#### `acpManager.kill(sessionId)`

Beëindigt een sessie en ruimt deze op.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Retourneert: boolean
```

#### `acpManager.getActiveSessions()`

Haalt alle actieve sessies op.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Retourneert: AcpSession[]
```

#### `acpManager.killAll()`

Beëindigt alle sessies.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Sessie-interface

```typescript
interface AcpSession {
  id: string; // Unieke sessie-ID
  agentId: string; // Agent-ID (bijv. "claude")
  process: ChildProcess; // Handle van het onderliggende proces
  alive: boolean; // Of het proces actief is
  stdoutBuffer: string; // Geaccumuleerde stdout-buffer
  stderrBuffer: string; // Geaccumuleerde stderr-buffer
  createdAt: Date; // Tijdstip van aanmaak
}
```

### Gebeurtenissen

De `AcpManager` breidt `EventEmitter` uit en genereert de volgende gebeurtenissen:

#### `stdout`

Wordt gegenereerd wanneer de CLI-agent naar stdout schrijft.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Wordt gegenereerd wanneer de CLI-agent naar stderr schrijft.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Wordt gegenereerd wanneer het CLI-agentproces wordt afgesloten.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Wordt gegenereerd wanneer er een fout optreedt in het CLI-agentproces.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Configuratie

### Omgevingsvariabelen

ACP neemt alle omgevingsvariabelen over van het bovenliggende proces en kan worden uitgebreid met aangepaste omgevingsvariabelen:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Spawn-argumenten

Elke agent heeft standaard-spawn-argumenten die in het register zijn gedefinieerd. U kunt deze overschrijven:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Time-outs

De standaardtime-out voor prompts is **120 seconden** (2 minuten). U kunt deze overschrijven:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuten
```

### Detectiecache

Agentdetectie wordt gedurende **60 seconden** gecachet om kostbare scans van het bestandssysteem te voorkomen. Een vernieuwing forceren:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Beveiliging

### Preventie van opdrachtinjectie

ACP valideert versieopdrachten om aanvallen via opdrachtinjectie te voorkomen:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Versieopdrachten die deze tekens bevatten, worden geweigerd:

- `;` — Opdrachtscheidingsteken
- `&` — Achtergrondproces
- `|` — Pipe
- `<`, `>` — Omleiding
- `` ` `` — Opdrachtvervanging
- `$` — Variabele-uitbreiding
- `\r`, `\n` — Regeleinden

### Validatie van binaire namen

ACP valideert dat het binaire bestand in de versieopdracht overeenkomt met de verwachte naam van het binaire bestand (tenzij het een aangepaste agent is).

### Procesisolatie

Elke ACP-sessie wordt uitgevoerd in een eigen onderliggend proces. Het proces wordt beëindigd wanneer de sessie eindigt of een time-out optreedt.

---

## Prestaties

### Detectieprestaties

- **Eerste aanroep**: ~50-200 ms (voert voor elke agent de opdracht `version` uit)
- **Gecachete aanroepen**: <1 ms (retourneert vanuit de cache)
- **Cache-TTL**: 60 seconden

### Promptprestaties

- **Spawnen**: ~50-100 ms
- **Prompt verzenden**: ~10-50 ms
- **Wachten op antwoord**: Afhankelijk van de CLI-agent (doorgaans 1-30 seconden)
- **Beëindigen**: ~5 seconden (SIGTERM) + onmiddellijk (SIGKILL)

### Resourcegebruik

- **Geheugen per sessie**: ~10-50 MB (afhankelijk van de CLI-agent)
- **CPU**: Minimaal (I/O-gebonden)
- **Schijf**: Geen

---

## Probleemoplossing

### Fout "Unknown agent"

**Probleem**: `acpManager.spawn()` genereert `Unknown agent: <id>`

**Oplossing**: Alleen deze agents zijn toegestaan in `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Andere agents moeten handmatig of via aangepaste agentdefinities worden gestart.

### Fout "Session not alive"

**Probleem**: `acpManager.sendPrompt()` genereert `Session ${sessionId} is not alive`

**Oplossing**: De sessie is mogelijk afgesloten of beëindigd. Controleer de sessiestatus:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Start de sessie opnieuw
  acpManager.spawn("claude", "claude", [], {});
}
```

### Fout "ACP timeout"

**Probleem**: `acpManager.sendPrompt()` genereert `ACP timeout after 120000ms`

**Oplossing**: Verhoog de time-out:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuten
```

### CLI niet gedetecteerd

**Probleem**: `detectInstalledAgents()` vindt uw CLI niet

**Oplossingen**:

1. **Controleer PATH**: Zorg dat de CLI in uw systeem-PATH staat
2. **Controleer de versieopdracht**: Voer `claude --version` handmatig uit
3. **Controleer de machtigingen**: Zorg dat de CLI uitvoerbaar is
4. **Aangepaste agent**: Voeg een aangepaste agentdefinitie toe voor niet-standaard-CLI's

### Toegang geweigerd

**Probleem**: ACP kan de CLI niet uitvoeren

**Oplossingen**:

1. **Controleer bestandsmachtigingen**: `chmod +x /usr/local/bin/claude`
2. **Controleer het eigenaarschap**: Zorg dat OmniRoute lees- en uitvoermachtigingen heeft
3. **Controleer SELinux/AppArmor**: Kan het starten van processen blokkeren

---

## Voorbeelden

### Voorbeeld 1: Claude Code starten en gebruiken

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Detecteer geïnstalleerde agents
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Start een nieuwe sessie
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Stuur een prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Ruim op
  acpManager.kill(session.id);
}
```

### Voorbeeld 2: Automatische detectie met terugvaloptie

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Probeer eerst Claude en val terug op Codex
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

### Voorbeeld 3: Aangepaste agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registreer een aangepaste CLI-agent
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

// detectInstalledAgents() bevat nu ook "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Wat nu?

- **[API-referentie](../reference/API_REFERENCE.md)** — REST API-eindpunten
- **[Providerreferentie](../reference/PROVIDER_REFERENCE.md)** — Alle 352 providers
- **[MCP-server](./MCP-SERVER.md)** — Integratie met Model Context Protocol
- **[A2A-server](./A2A-SERVER.md)** — Agent-to-Agent-protocol
- **[Cloudagent](./CLOUD_AGENT.md)** — Cloudgebaseerde agents

---

## Referentie

- [AionUi-project](https://github.com/iOfficeAI/AionUi) — Inspiratie voor automatische ACP-detectie
- [ACP-broncode](../../src/lib/acp/) — Implementatiedetails
  - `manager.ts` — Beheer van de proceslevenscyclus
  - `registry.ts` — Detectie en registratie van agents
  - `index.ts` — Openbare API-exports
