# ACP (Agent Client Protocol) (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP võimaldab OmniRoute'il käivitada CLI-agente (nagu Claude Code ja Codex) HTTP API-de kasutamise asemel alamprotsessidena. See pakub „CLI kui taustsüsteem“ transporti.

---

## Mis on ACP?

ACP (Agent Client Protocol) on OmniRoute'i **„CLI kui taustsüsteem“ transport**. Selle asemel, et pealt kuulata AI-teenusepakkujatele tehtavaid HTTP API kutseid, **käivitab ACP CLI-agendid alamprotsessidena** ja edastab viibad nende omaliidese kaudu.

### Miks kasutada ACP-d?

| Eelis                       | Kirjeldus                                             |
| --------------------------- | ----------------------------------------------------- |
| **API-võtmeid pole vaja**   | Kasutab teie olemasolevat CLI-autentimist             |
| **Omavormingus protokoll**  | Kasutab iga CLI omavormingus sisendit ja väljundit    |
| **Automaatne tuvastamine**  | Tuvastab teie süsteemi installitud CLI-d              |
| **15 sisseehitatud agenti** | Eelkonfigureeritud populaarsete CLI-tööriistade jaoks |
| **Kohandatud agendid**      | Lisage seadete kaudu oma CLI-tööriistu                |
| **Protsesside haldus**      | Haldab elutsüklit (käivitamine, saatmine, lõpetamine) |

---

## Toetatud CLI-agendid

ACP toetab kohe kasutusvalmilt **15 sisseehitatud CLI-agenti**:

| Agendi ID     | Kuvatav nimi       | Binaarfail    | Protokoll |
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

### Kohandatud agendid

Seadete kaudu saate lisada oma CLI-agente. Kohandatud agendid toetavad samu funktsioone nagu sisseehitatud agendid.

---

## Kiirjuhend

### 1. samm: installige CLI-agent

```bash
# Näide: installige Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Kontrollige installimist
claude --version
```

### 2. samm: ACP automaatne tuvastamine

ACP tuvastab teie süsteemi installitud CLI-agendid automaatselt. Seadistamine pole vajalik!

### 3. samm: kasutage ACP-transporti

Pärast tuvastamist saab ACP-d kasutada transpordina iga toetatud teenusepakkuja puhul. OmniRoute kasutab ACP-d automaatselt, kui CLI on saadaval.

---

## Kuidas ACP töötab?

### Arhitektuur

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP-puhverserver)│
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Alamprotsess   │
│  (CLI-agent)    │
│                 │
│  stdin  ◄──────┤  Viiba saatmine
│  stdout ──────►│  Vastuse vastuvõtmine
│  stderr ──────►│  Vigade vastuvõtmine
└─────────────────┘
```

### Protsessi elutsükkel

1. **Käivitamine** — ACP loob CLI-agendi jaoks alamprotsessi
2. **Saatmine** — ACP kirjutab viibad protsessi standardsisendisse stdin
3. **Vastuvõtmine** — ACP loeb vastuseid standardväljundist stdout ja standardveaväljundist stderr
4. **Jõudeoleku tuvastamine** — ACP ootab kaks sekundit tegevusetust, enne kui loeb vastuse täielikuks
5. **Lõpetamine** — ACP lõpetab protsessi (SIGTERM, seejärel 5 sekundi pärast SIGKILL)

### Sideprotokoll

ACP kasutab CLI-agentidega suhtlemiseks standardset sisendit ja väljundit ehk **stdio**. Protokoll toimib järgmiselt:

1. **Viiba saatmine** — viip kirjutatakse reavahetusega standardsisendisse stdin
2. **Vastuse ootamine** — standardväljundit stdout loetakse kuni jõudeolekuni (2 sekundit väljundita)
3. **Ajalõpp** — vaikimisi 120 sekundit (seadistatav)

---

## API viide

### Registrifunktsioonid

#### `detectInstalledAgents()`

Tuvastab kõik süsteemi installitud CLI-agendid. Tulemused salvestatakse vahemällu 60 sekundiks.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Tagastab: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // nt "codex", "claude"
  name: string; // Kuvatav nimi
  binary: string; // Käivitatava binaarfaili nimi
  versionCommand: string; // Versiooni tuvastamise käsk
  version: string | null; // Tuvastatud versioon (null, kui pole installitud)
  installed: boolean; // Kas agent on installitud
  providerAlias: string; // Teenusepakkuja ID OmniRoute'is
  spawnArgs: string[]; // Käivitamisel edastatavad argumendid
  protocol: "stdio" | "http"; // Sideprotokoll
  isCustom?: boolean; // Kas see on kasutaja määratletud kohandatud agent
}
```

#### `getAvailableAgents()`

Hangib ainult need agendid, mis on installitud ja ACP jaoks saadaval.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Tagastab: CliAgentInfo[] (ainult installitud agendid)
```

#### `getAgentById(id)`

Hangib ID järgi konkreetse agendi.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Tagastab: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Määrab sätetest kohandatud agentide definitsioonid.

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

### Halduri funktsioonid

#### `acpManager.spawn(agentId, binary, args, env)`

Käivitab uue CLI-agendi protsessi.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* kohandatud keskkonnamuutujad */
});
// Tagastab: AcpSession
```

**Lubatud agendi-ID-d**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Saadab CLI-agendile viiba ja kogub vastuse.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2-minutiline ajalõpp
);
// Tagastab: Promise<string>
```

#### `acpManager.kill(sessionId)`

Lõpetab seansi ja puhastab ressursid.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Tagastab: boolean
```

#### `acpManager.getActiveSessions()`

Hangib kõik aktiivsed seansid.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Tagastab: AcpSession[]
```

#### `acpManager.killAll()`

Lõpetab kõik seansid.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Seansi liides

```typescript
interface AcpSession {
  id: string; // Seansi kordumatu ID
  agentId: string; // Agendi ID (nt "claude")
  process: ChildProcess; // Alamprotsessi pide
  alive: boolean; // Kas protsess töötab
  stdoutBuffer: string; // Kogutud stdout-puhver
  stderrBuffer: string; // Kogutud stderr-puhver
  createdAt: Date; // Loomise ajatempel
}
```

### Sündmused

`AcpManager` laiendab klassi `EventEmitter` ja väljastab järgmisi sündmusi:

#### `stdout`

Väljastatakse, kui CLI-agent kirjutab standardväljundisse.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Väljastatakse, kui CLI-agent kirjutab standardveavoogu.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Väljastatakse, kui CLI-agendi protsess lõpeb.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Väljastatakse, kui CLI-agendi protsessis tekib viga.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfiguratsioon

### Keskkonnamuutujad

ACP pärib kõik keskkonnamuutujad emaprotsessilt ning neid saab täiendada kohandatud keskkonnamuutujatega:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Käivitusargumendid

Igal agendil on registris määratletud vaikimisi käivitusargumendid. Saate need alistada:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Ajalõpud

Vaikimisi on viiba ajalõpp **120 sekundit** (2 minutit). Saate selle alistada:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutit
```

### Tuvastamisvahemälu

Agentide tuvastamise tulemused salvestatakse **60 sekundiks** vahemällu, et vältida kulukaid failisüsteemi skannimisi. Värskendamise sundimiseks:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Turvalisus

### Käsusüsti vältimine

ACP valideerib versioonikäske, et vältida käsusüstiründeid:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Neid märke sisaldavad versioonikäsud lükatakse tagasi:

- `;` — Käskude eraldaja
- `&` — Taustaprotsess
- `|` — Konveier
- `<`, `>` — Ümbersuunamine
- `` ` `` — Käsuasendus
- `$` — Muutuja asendamine
- `\r`, `\n` — Reavahetused

### Binaarfaili nime valideerimine

ACP valideerib, et versioonikäsu binaarfail vastaks eeldatud binaarfaili nimele (välja arvatud juhul, kui tegemist on kohandatud agendiga).

### Protsesside isoleerimine

Iga ACP seanss töötab eraldi alamprotsessis. Protsess lõpetatakse, kui seanss lõpeb või jõuab ajalõpuni.

---

## Jõudlus

### Tuvastamise jõudlus

- **Esimene väljakutse**: ~50–200 ms (käivitab iga agendi jaoks käsu `version`)
- **Vahemällu salvestatud väljakutsed**: <1 ms (tagastatakse vahemälust)
- **Vahemälu TTL**: 60 sekundit

### Viiba jõudlus

- **Käivitamine**: ~50–100 ms
- **Viiba saatmine**: ~10–50 ms
- **Vastuse ootamine**: sõltub CLI-agendist (tavaliselt 1–30 sekundit)
- **Lõpetamine**: ~5 sekundit (SIGTERM) + kohe (SIGKILL)

### Ressursikasutus

- **Mälu seansi kohta**: ~10–50 MB (sõltub CLI-agendist)
- **CPU**: minimaalne (I/O-st sõltuv)
- **Kettaruum**: puudub

---

## Tõrkeotsing

### Tõrge „Unknown agent”

**Probleem**: `acpManager.spawn()` väljastab tõrke `Unknown agent: <id>`

**Lahendus**: Funktsioonis `spawn()` on lubatud ainult järgmised agendid:

- `claude`
- `codex`
- `gemini`
- `qwen`

Muud agendid tuleb käivitada käsitsi või kohandatud agendimääratluste kaudu.

### Tõrge „Session not alive”

**Probleem**: `acpManager.sendPrompt()` väljastab tõrke `Session ${sessionId} is not alive`

**Lahendus**: Seanss võib olla lõppenud või lõpetatud. Kontrollige seansi olekut:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Käivita seanss uuesti
  acpManager.spawn("claude", "claude", [], {});
}
```

### Tõrge „ACP timeout”

**Probleem**: `acpManager.sendPrompt()` väljastab tõrke `ACP timeout after 120000ms`

**Lahendus**: Pikendage ajalõppu:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutit
```

### CLI-d ei tuvastatud

**Probleem**: `detectInstalledAgents()` ei leia teie CLI-d

**Lahendused**:

1. **Kontrollige PATH-i**: veenduge, et CLI oleks teie süsteemi PATH-is
2. **Kontrollige versioonikäsku**: käivitage `claude --version` käsitsi
3. **Kontrollige õigusi**: veenduge, et CLI oleks käivitatav
4. **Kohandatud agent**: lisage mittestandardsete CLI-de jaoks kohandatud agendimääratlus

### Juurdepääs keelatud

**Probleem**: ACP ei saa CLI-d käivitada

**Lahendused**:

1. **Kontrollige failiõigusi**: `chmod +x /usr/local/bin/claude`
2. **Kontrollige omandiõigust**: veenduge, et OmniRoute'il oleksid lugemis- ja käivitamisõigused
3. **Kontrollige SELinuxi/AppArmorit**: need võivad protsessi käivitamise blokeerida

---

## Näited

### Näide 1: Claude Code'i käivitamine ja kasutamine

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Tuvasta installitud agendid
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Käivita uus seanss
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Saada päring
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Puhasta ressursid
  acpManager.kill(session.id);
}
```

### Näide 2: Automaatne tuvastamine koos varuvariandiga

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Proovi esmalt Claude'i, seejärel kasuta varuvariandina Codexit
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

### Näide 3: Kohandatud agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registreeri kohandatud CLI-agent
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

// Nüüd kaasab detectInstalledAgents() ka agendi "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Mis edasi?

- **[API viide](../reference/API_REFERENCE.md)** — REST API lõpp-punktid
- **[Pakkujate viide](../reference/PROVIDER_REFERENCE.md)** — Kõik 352 pakkujat
- **[MCP-server](./MCP-SERVER.md)** — Model Context Protocoli integratsioon
- **[A2A-server](./A2A-SERVER.md)** — Agent-to-Agent-protokoll
- **[Pilveagent](./CLOUD_AGENT.md)** — Pilvepõhised agendid

---

## Viited

- [AionUi projekt](https://github.com/iOfficeAI/AionUi) — Inspiratsioon ACP automaatseks tuvastamiseks
- [ACP lähtekood](../../src/lib/acp/) — Teostuse üksikasjad
  - `manager.ts` — Protsessi elutsükli haldus
  - `registry.ts` — Agentide tuvastamine ja registreerimine
  - `index.ts` — Avaliku API ekspordid
