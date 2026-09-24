# ACP (Agent Client Protocol) (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP jippermetti lil OmniRoute jniedi aġenti CLI (bħal Claude Code, Codex) bħala proċessi sekondarji minflok juża APIs HTTP. Dan jagħtik trasport "CLI-as-backend".

---

## X'inhu ACP?

ACP (Agent Client Protocol) huwa trasport **"CLI-as-backend"** għal OmniRoute. Minflok jinterċetta sejħiet HTTP API lill-fornituri tal-IA, ACP **iniedi aġenti CLI bħala proċessi sekondarji** u jgħaddilhom il-prompts permezz tal-interfaċċa nattiva tagħhom.

### Għaliex Għandek Tuża ACP?

| Benefiċċju                        | Deskrizzjoni                                                  |
| --------------------------------- | ------------------------------------------------------------- |
| **M'hemmx bżonn ċwievet tal-API** | Juża l-awtentikazzjoni CLI eżistenti tiegħek                  |
| **Protokoll nattiv**              | Juża l-format nattiv ta' input/output ta' kull CLI            |
| **Skoperta awtomatika**           | Jidentifika s-CLIs installati fis-sistema tiegħek             |
| **15-il aġent inkorporat**        | Ikkonfigurati minn qabel għal għodod CLI popolari             |
| **Aġenti personalizzati**         | Żid l-għodod CLI tiegħek permezz tas-settings                 |
| **Ġestjoni tal-proċessi**         | Jimmaniġġja ċ-ċiklu tal-ħajja (tnedija, bgħit, terminazzjoni) |

---

## Aġenti CLI Appoġġjati

ACP jappoġġja **15-il aġent CLI inkorporat** mill-ewwel:

| ID tal-Aġent  | Isem għall-Wiri    | Binarju       | Protokoll |
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

### Aġenti Personalizzati

Tista' żżid l-aġenti CLI tiegħek permezz tas-settings. L-aġenti personalizzati jappoġġjaw l-istess karatteristiċi bħall-aġenti inkorporati.

---

## Bidu Rapidu

### Pass 1: Installa Aġent CLI

```bash
# Eżempju: Installa Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Ivverifika l-installazzjoni
claude --version
```

### Pass 2: Identifikazzjoni Awtomatika minn ACP

ACP jidentifika awtomatikament l-aġenti CLI installati fis-sistema tiegħek. Mhi meħtieġa l-ebda konfigurazzjoni!

### Pass 3: Uża t-Trasport ACP

Ladarba jiġi identifikat, ACP jista' jintuża bħala trasport għal kwalunkwe fornitur appoġġjat. OmniRoute juża ACP awtomatikament meta s-CLI jkun disponibbli.

---

## Kif Jaħdem ACP

### Arkitettura

```
┌─────────────────┐
│  OmniRoute      │
│  (Proxy HTTP)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Proċess Sekondarju│
│  (Aġent CLI)    │
│                 │
│  stdin  ◄──────┤  Ibgħat il-prompt
│  stdout ──────►│  Irċievi r-risposta
│  stderr ──────►│  Irċievi l-iżbalji
└─────────────────┘
```

### Ċiklu tal-Ħajja tal-Proċess

1. **Tnedija** — ACP joħloq proċess sekondarju għall-aġent CLI
2. **Bgħit** — ACP jikteb il-prompts fl-stdin tal-proċess
3. **Riċeviment** — ACP jaqra r-risposti minn stdout/stderr
4. **Identifikazzjoni tal-Inattività** — ACP jistenna 2 sekondi ta' inattività qabel ma jqis ir-risposta bħala kompluta
5. **Terminazzjoni** — ACP itemm il-proċess (SIGTERM, imbagħad SIGKILL wara 5s)

### Protokoll ta' Komunikazzjoni

ACP juża **stdio** (input/output standard) għall-komunikazzjoni mal-aġenti CLI. Il-protokoll huwa:

1. **Ibgħat il-prompt** — Ikteb fl-stdin b'linja ġdida
2. **Stenna r-risposta** — Aqra mill-stdout sakemm ikun inattiv (2s mingħajr output)
3. **Skadenza** — 120 sekonda awtomatikament (konfigurabbli)

---

## Referenza tal-API

### Funzjonijiet tar-Reġistru

#### `detectInstalledAgents()`

Jidentifika l-aġenti CLI kollha installati fis-sistema. Ir-riżultati jinżammu fil-cache għal 60 sekonda.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Jirritorna: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // eż., "codex", "claude"
  name: string; // Isem għall-wiri
  binary: string; // Isem tal-binarju li għandu jitnieda
  versionCommand: string; // Kmand għall-identifikazzjoni tal-verżjoni
  version: string | null; // Verżjoni identifikata (null jekk mhux installat)
  installed: boolean; // Jekk l-aġent huwiex installat
  providerAlias: string; // ID tal-fornitur f'OmniRoute
  spawnArgs: string[]; // Argumenti li għandhom jiġu mgħoddija mat-tnedija
  protocol: "stdio" | "http"; // Protokoll tal-komunikazzjoni
  isCustom?: boolean; // Jekk dan huwiex aġent personalizzat definit mill-utent
}
```

#### `getAvailableAgents()`

Jikseb biss l-aġenti li huma installati u disponibbli għal ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Jirritorna: CliAgentInfo[] (aġenti installati biss)
```

#### `getAgentById(id)`

Jikseb aġent speċifiku permezz tal-ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Jirritorna: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Jissettja d-definizzjonijiet tal-aġenti personalizzati mis-settings.

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

### Funzjonijiet tal-Maniġer

#### `acpManager.spawn(agentId, binary, args, env)`

Iniedi proċess ġdid ta' aġent CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* varjabbli tal-ambjent personalizzati */
});
// Jirritorna: AcpSession
```

**IDs tal-aġenti permessi**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Jibgħat prompt lil aġent CLI u jiġbor ir-rispons.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // timeout ta' 2 minuti
);
// Jirritorna: Promise<string>
```

#### `acpManager.kill(sessionId)`

Itemm sessjoni u jwettaq it-tindif.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Jirritorna: boolean
```

#### `acpManager.getActiveSessions()`

Jikseb is-sessjonijiet attivi kollha.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Jirritorna: AcpSession[]
```

#### `acpManager.killAll()`

Itemm is-sessjonijiet kollha.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interfaċċa tas-Sessjoni

```typescript
interface AcpSession {
  id: string; // ID uniku tas-sessjoni
  agentId: string; // ID tal-aġent (eż., "claude")
  process: ChildProcess; // Referenza għall-proċess sekondarju
  alive: boolean; // Jekk il-proċess huwiex attiv
  stdoutBuffer: string; // Buffer akkumulat ta' stdout
  stderrBuffer: string; // Buffer akkumulat ta' stderr
  createdAt: Date; // Timestamp tal-ħolqien
}
```

### Avvenimenti

`AcpManager` jestendi `EventEmitter` u jarmi l-avvenimenti li ġejjin:

#### `stdout`

Jinħareġ meta l-aġent CLI jikteb fi stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Jinħareġ meta l-aġent CLI jikteb fi stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Jinħareġ meta jintemm il-proċess tal-aġent CLI.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Jinħareġ meta jseħħ żball fil-proċess tal-aġent CLI.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfigurazzjoni

### Varjabbli tal-Ambjent

ACP jiret il-varjabbli kollha tal-ambjent mill-proċess prinċipali u jista' jiġi estiż b'varjabbli tal-ambjent personalizzati:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumenti tat-Tnedija

Kull aġent għandu argumenti tat-tnedija predefiniti fir-reġistru. Tista' tissostitwihom:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Limiti ta' Ħin

Il-limitu ta' ħin predefinit għall-prompt huwa **120 sekonda** (2 minuti). Tista' tissostitwih:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuti
```

### Cache tad-Detezzjoni

Id-detezzjoni tal-aġenti tinħażen fil-cache għal **60 sekonda** biex jiġu evitati skennijiet għaljin tas-sistema tal-fajls. Biex tisforza aġġornament:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Sigurtà

### Prevenzjoni tal-Injezzjoni tal-Kmandi

ACP jivvalida l-kmandi tal-verżjoni biex jipprevjeni attakki ta' injezzjoni tal-kmandi:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Il-kmandi tal-verżjoni li jkun fihom dawn il-karattri jiġu miċħuda:

- `;` — Separatur tal-kmandi
- `&` — Proċess fl-isfond
- `|` — Pajp
- `<`, `>` — Ridirezzjoni
- `` ` `` — Sostituzzjoni tal-kmand
- `$` — Espansjoni tal-varjabbli
- `\r`, `\n` — Qtugħ tal-linji

### Validazzjoni tal-Isem Binarju

ACP jivvalida li l-binarju tal-kmand tal-verżjoni jaqbel mal-isem binarju mistenni (sakemm ma jkunx aġent personalizzat).

### Iżolament tal-Proċess

Kull sessjoni ACP taħdem fil-proċess subordinat tagħha stess. Il-proċess jintemm meta tintemm is-sessjoni jew jiskadi l-limitu ta' ħin.

---

## Prestazzjoni

### Prestazzjoni tad-Detezzjoni

- **L-ewwel sejħa**: ~50-200ms (tħaddem il-kmand `version` għal kull aġent)
- **Sejħiet mill-cache**: <1ms (tirritorna mill-cache)
- **TTL tal-cache**: 60 sekonda

### Prestazzjoni tal-Prompt

- **Tnedija**: ~50-100ms
- **Tibgħat il-prompt**: ~10-50ms
- **Stennija għat-tweġiba**: Tiddependi mill-aġent CLI (tipikament 1-30 sekonda)
- **Terminazzjoni**: ~5 sekondi (SIGTERM) + immedjata (SIGKILL)

### Użu tar-Riżorsi

- **Memorja għal kull sessjoni**: ~10-50MB (tiddependi mill-aġent CLI)
- **CPU**: Minimu (limitat mill-I/O)
- **Diska**: Xejn

---

## Soluzzjoni tal-Problemi

### Żball "Unknown agent"

**Problema**: `acpManager.spawn()` joħroġ l-iżball `Unknown agent: <id>`

**Soluzzjoni**: Dawn l-aġenti biss huma permessi f'`spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Aġenti oħra jridu jitniedu manwalment jew permezz ta' definizzjonijiet ta' aġenti personalizzati.

### Żball "Session not alive"

**Problema**: `acpManager.sendPrompt()` joħroġ l-iżball `Session ${sessionId} is not alive`

**Soluzzjoni**: Is-sessjoni setgħet għalqet jew ġiet itterminata. Iċċekkja l-istatus tas-sessjoni:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Erġa' niedi s-sessjoni
  acpManager.spawn("claude", "claude", [], {});
}
```

### Żball "ACP timeout"

**Problema**: `acpManager.sendPrompt()` joħroġ l-iżball `ACP timeout after 120000ms`

**Soluzzjoni**: Żid il-limitu ta' ħin:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuti
```

### CLI Mhux Individwat

**Problema**: `detectInstalledAgents()` ma jsibx is-CLI tiegħek

**Soluzzjonijiet**:

1. **Iċċekkja PATH**: Kun żgur li s-CLI jinsab fil-PATH tas-sistema tiegħek
2. **Iċċekkja l-kmand tal-verżjoni**: Ħaddem `claude --version` manwalment
3. **Iċċekkja l-permessi**: Kun żgur li s-CLI huwa eżegwibbli
4. **Aġent personalizzat**: Żid definizzjoni ta' aġent personalizzat għal CLIs mhux standard

### Permess Miċħud

**Problema**: ACP ma jistax jeżegwixxi s-CLI

**Soluzzjonijiet**:

1. **Iċċekkja l-permessi tal-fajl**: `chmod +x /usr/local/bin/claude`
2. **Iċċekkja s-sjieda**: Kun żgur li OmniRoute għandu permessi għall-qari/eżekuzzjoni
3. **Iċċekkja SELinux/AppArmor**: Jistgħu jimblukkaw it-tnedija tal-proċessi

---

## Eżempji

### Eżempju 1: Niedi u Uża Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Identifika l-aġenti installati
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Niedi sessjoni ġdida
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Ibgħat prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Agħmel it-tindif
  acpManager.kill(session.id);
}
```

### Eżempju 2: Skoperta Awtomatika b'Alternattiva ta' Riżerva

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Ipprova Claude l-ewwel, u uża Codex bħala alternattiva
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

### Eżempju 3: Aġent Personalizzat

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Irreġistra aġent CLI personalizzat
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

// Issa detectInstalledAgents() se jinkludi "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## X'Imiss?

- **[Referenza tal-API](../reference/API_REFERENCE.md)** — Endpoints tal-REST API
- **[Referenza tal-Fornituri](../reference/PROVIDER_REFERENCE.md)** — It-352 fornitur kollha
- **[Server MCP](./MCP-SERVER.md)** — Integrazzjoni tal-Model Context Protocol
- **[Server A2A](./A2A-SERVER.md)** — Protokoll minn aġent għal aġent
- **[Aġent tal-Cloud](./CLOUD_AGENT.md)** — Aġenti bbażati fuq il-cloud

---

## Referenza

- [Proġett AionUi](https://github.com/iOfficeAI/AionUi) — Ispirazzjoni għall-iskoperta awtomatika tal-ACP
- [Kodiċi Sors tal-ACP](../../src/lib/acp/) — Dettalji tal-implimentazzjoni
  - `manager.ts` — Ġestjoni taċ-ċiklu tal-ħajja tal-proċess
  - `registry.ts` — Skoperta u reġistrazzjoni tal-aġenti
  - `index.ts` — Esportazzjonijiet pubbliċi tal-API
