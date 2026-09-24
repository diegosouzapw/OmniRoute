# ACP (Agent Client Protocol) (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Īsumā**: ACP ļauj OmniRoute palaist CLI aģentus (piemēram, Claude Code, Codex) kā pakārtotus procesus, nevis izmantot HTTP API. Tas nodrošina „CLI kā aizmugursistēmas” transportu.

---

## Kas ir ACP?

ACP (Agent Client Protocol) ir **„CLI kā aizmugursistēmas” transports**, kas paredzēts OmniRoute. Tā vietā, lai pārtvertu HTTP API izsaukumus AI nodrošinātājiem, ACP **palaiž CLI aģentus kā pakārtotus procesus** un padod uzvednes, izmantojot to vietējo saskarni.

### Kāpēc izmantot ACP?

| Ieguvums                        | Apraksts                                                |
| ------------------------------- | ------------------------------------------------------- |
| **API atslēgas nav vajadzīgas** | Izmanto jūsu esošo CLI autentifikāciju                  |
| **Vietējais protokols**         | Izmanto katra CLI vietējo ievades/izvades formātu       |
| **Automātiska noteikšana**      | Nosaka jūsu sistēmā instalētos CLI                      |
| **15 iebūvēti aģenti**          | Iepriekš konfigurēti populāriem CLI rīkiem              |
| **Pielāgoti aģenti**            | Pievienojiet savus CLI rīkus, izmantojot iestatījumus   |
| **Procesu pārvaldība**          | Pārvalda dzīves ciklu (palaišanu, sūtīšanu, apturēšanu) |

---

## Atbalstītie CLI aģenti

ACP pēc noklusējuma atbalsta **15 iebūvētus CLI aģentus**:

| Aģenta ID     | Attēlojamais nosaukums | Binārais fails | Protokols |
| ------------- | ---------------------- | -------------- | --------- |
| `codex`       | OpenAI Codex CLI       | `codex`        | stdio     |
| `claude`      | Claude Code CLI        | `claude`       | stdio     |
| `goose`       | Goose CLI              | `goose`        | stdio     |
| `openclaw`    | OpenClaw               | `openclaw`     | stdio     |
| `aider`       | Aider                  | `aider`        | stdio     |
| `opencode`    | OpenCode               | `opencode`     | stdio     |
| `cline`       | Cline                  | `cline`        | stdio     |
| `qwen`        | Qwen Code              | `qwen --acp`   | stdio     |
| `forge`       | ForgeCode              | `forge`        | stdio     |
| `amazon-q`    | Amazon Q Developer     | `q`            | stdio     |
| `interpreter` | Open Interpreter       | `interpreter`  | stdio     |
| `cursor-cli`  | Cursor CLI             | `cursor`       | stdio     |
| `warp`        | Warp AI                | `warp`         | stdio     |
| `gemini`      | Gemini CLI             | `gemini`       | stdio     |
| `zcode`       | ZCode                  | `zcode`        | stdio     |

### Pielāgoti aģenti

Varat pievienot savus CLI aģentus, izmantojot iestatījumus. Pielāgotie aģenti atbalsta tās pašas funkcijas, ko iebūvētie aģenti.

---

## Ātrā darba sākšana

### 1. darbība: instalējiet CLI aģentu

```bash
# Piemērs: instalējiet Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Pārbaudiet instalāciju
claude --version
```

### 2. darbība: ACP automātiskā noteikšana

ACP automātiski nosaka jūsu sistēmā instalētos CLI aģentus. Konfigurēšana nav nepieciešama!

### 3. darbība: izmantojiet ACP transportu

Kad CLI aģents ir noteikts, ACP var izmantot kā transportu jebkuram atbalstītam nodrošinātājam. OmniRoute automātiski izmantos ACP, kad CLI būs pieejams.

---

## Kā darbojas ACP

### Arhitektūra

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP Proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Pakārtotais     │
│ process         │
│ (CLI aģents)    │
│                 │
│  stdin  ◄──────┤  Nosūtīt uzvedni
│  stdout ──────►│  Saņemt atbildi
│  stderr ──────►│  Saņemt kļūdas
└─────────────────┘
```

### Procesa dzīves cikls

1. **Palaišana** — ACP izveido CLI aģenta pakārtoto procesu
2. **Sūtīšana** — ACP ieraksta uzvednes procesa stdin
3. **Saņemšana** — ACP nolasa atbildes no stdout/stderr
4. **Dīkstāves noteikšana** — ACP nogaida 2 neaktivitātes sekundes, pirms uzskata atbildi par pabeigtu
5. **Apturēšana** — ACP pārtrauc procesu (SIGTERM, pēc tam SIGKILL pēc 5s)

### Saziņas protokols

ACP saziņai ar CLI aģentiem izmanto **stdio** (standarta ievadi/izvadi). Protokols ir šāds:

1. **Nosūtīt uzvedni** — ierakstīt stdin, pievienojot jaunu rindu
2. **Gaidīt atbildi** — lasīt no stdout līdz dīkstāvei (2s bez izvades)
3. **Taimauts** — pēc noklusējuma 120 sekundes (konfigurējams)

---

## API atsauce

### Reģistra funkcijas

#### `detectInstalledAgents()`

Nosaka visus sistēmā instalētos CLI aģentus. Rezultāti tiek saglabāti kešatmiņā 60 sekundes.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Atgriež: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // piem., "codex", "claude"
  name: string; // Attēlojamais nosaukums
  binary: string; // Palaižamā binārā faila nosaukums
  versionCommand: string; // Versijas noteikšanas komanda
  version: string | null; // Noteiktā versija (null, ja nav instalēts)
  installed: boolean; // Vai aģents ir instalēts
  providerAlias: string; // Pakalpojumu sniedzēja ID sistēmā OmniRoute
  spawnArgs: string[]; // Palaišanas laikā nododamie argumenti
  protocol: "stdio" | "http"; // Saziņas protokols
  isCustom?: boolean; // Vai šis ir lietotāja definēts pielāgots aģents
}
```

#### `getAvailableAgents()`

Iegūst tikai tos aģentus, kas ir instalēti un pieejami ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Atgriež: CliAgentInfo[] (tikai instalētie aģenti)
```

#### `getAgentById(id)`

Iegūst konkrētu aģentu pēc ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Atgriež: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Iestata pielāgotu aģentu definīcijas no iestatījumiem.

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

### Pārvaldnieka funkcijas

#### `acpManager.spawn(agentId, binary, args, env)`

Palaiž jaunu CLI aģenta procesu.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* pielāgoti vides mainīgie */
});
// Atgriež: AcpSession
```

**Atļautie aģentu ID**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Nosūta uzvedni CLI aģentam un apkopo atbildi.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 minūšu taimauts
);
// Atgriež: Promise<string>
```

#### `acpManager.kill(sessionId)`

Pārtrauc sesiju un veic tīrīšanu.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Atgriež: boolean
```

#### `acpManager.getActiveSessions()`

Iegūst visas aktīvās sesijas.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Atgriež: AcpSession[]
```

#### `acpManager.killAll()`

Pārtrauc visas sesijas.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Sesijas saskarne

```typescript
interface AcpSession {
  id: string; // Unikāls sesijas ID
  agentId: string; // Aģenta ID (piem., "claude")
  process: ChildProcess; // Pakārtotā procesa turis
  alive: boolean; // Vai process ir aktīvs
  stdoutBuffer: string; // Uzkrātais stdout buferis
  stderrBuffer: string; // Uzkrātais stderr buferis
  createdAt: Date; // Izveides laikspiedols
}
```

### Notikumi

`AcpManager` paplašina `EventEmitter` un izstaro tālāk norādītos notikumus:

#### `stdout`

Tiek izstarots, kad CLI aģents raksta uz stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Tiek izstarots, kad CLI aģents raksta uz stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Tiek izstarots, kad CLI aģenta process tiek pabeigts.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Tiek izstarots, kad CLI aģenta procesā rodas kļūda.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfigurācija

### Vides mainīgie

ACP pārmanto visus vides mainīgos no vecākprocesa, un tos var papildināt ar pielāgotiem vides mainīgajiem:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Procesa palaišanas argumenti

Katram aģentam reģistrā ir definēti noklusējuma procesa palaišanas argumenti. Tos var pārrakstīt:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Taimauti

Noklusējuma uzvednes taimauts ir **120 sekundes** (2 minūtes). To var pārrakstīt:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minūtes
```

### Noteikšanas kešatmiņa

Aģentu noteikšanas rezultāti tiek saglabāti kešatmiņā **60 sekundes**, lai izvairītos no resursietilpīgas failu sistēmas skenēšanas. Lai veiktu piespiedu atsvaidzināšanu:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Drošība

### Komandu injekciju novēršana

ACP validē versijas komandas, lai novērstu komandu injekcijas uzbrukumus:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Versijas komandas, kas satur šīs rakstzīmes, tiek noraidītas:

- `;` — Komandu atdalītājs
- `&` — Fona process
- `|` — Konveijers
- `<`, `>` — Pārvirzīšana
- `` ` `` — Komandas aizstāšana
- `$` — Mainīgā izvēršana
- `\r`, `\n` — Rindu pārtraukumi

### Binārā faila nosaukuma validācija

ACP validē, vai versijas komandas binārā faila nosaukums atbilst sagaidāmajam binārā faila nosaukumam (izņemot gadījumus, kad tas ir pielāgots aģents).

### Procesu izolācija

Katra ACP sesija darbojas savā bērnprocesā. Process tiek apturēts, kad sesija beidzas vai iestājas taimauts.

---

## Veiktspēja

### Noteikšanas veiktspēja

- **Pirmais izsaukums**: ~50-200ms (izpilda `version` komandu katram aģentam)
- **Kešotie izsaukumi**: <1ms (atgriež rezultātu no kešatmiņas)
- **Kešatmiņas TTL**: 60 sekundes

### Uzvednes apstrādes veiktspēja

- **Procesa palaišana**: ~50-100ms
- **Uzvednes nosūtīšana**: ~10-50ms
- **Atbildes gaidīšana**: Atkarīga no CLI aģenta (parasti 1-30 sekundes)
- **Procesa apturēšana**: ~5 sekundes (SIGTERM) + nekavējoties (SIGKILL)

### Resursu izmantojums

- **Atmiņa vienai sesijai**: ~10-50MB (atkarīga no CLI aģenta)
- **CPU**: Minimāls lietojums (ierobežo ievadizvades operācijas)
- **Disks**: Netiek izmantots

---

## Problēmu novēršana

### Kļūda "Unknown agent"

**Problēma**: `acpManager.spawn()` izmet kļūdu `Unknown agent: <id>`

**Risinājums**: Funkcijā `spawn()` ir atļauti tikai šie aģenti:

- `claude`
- `codex`
- `gemini`
- `qwen`

Citi aģenti jāpalaiž manuāli vai izmantojot pielāgotu aģentu definīcijas.

### Kļūda "Session not alive"

**Problēma**: `acpManager.sendPrompt()` izmet kļūdu `Session ${sessionId} is not alive`

**Risinājums**: Sesija, iespējams, ir beigusies vai tikusi apturēta. Pārbaudiet sesijas statusu:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Atkārtoti palaidiet sesiju
  acpManager.spawn("claude", "claude", [], {});
}
```

### Kļūda "ACP timeout"

**Problēma**: `acpManager.sendPrompt()` izmet kļūdu `ACP timeout after 120000ms`

**Risinājums**: Palieliniet taimautu:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minūtes
```

### CLI nav noteikts

**Problēma**: `detectInstalledAgents()` neatrod jūsu CLI

**Risinājumi**:

1. **Pārbaudiet PATH**: Pārliecinieties, ka CLI atrodas jūsu sistēmas PATH
2. **Pārbaudiet versijas komandu**: Manuāli izpildiet `claude --version`
3. **Pārbaudiet atļaujas**: Pārliecinieties, ka CLI ir izpildāms
4. **Pielāgots aģents**: Pievienojiet pielāgota aģenta definīciju nestandarta CLI

### Piekļuve liegta

**Problēma**: ACP nevar izpildīt CLI

**Risinājumi**:

1. **Pārbaudiet faila atļaujas**: `chmod +x /usr/local/bin/claude`
2. **Pārbaudiet īpašumtiesības**: Pārliecinieties, ka OmniRoute ir lasīšanas/izpildes atļaujas
3. **Pārbaudiet SELinux/AppArmor**: Tie var bloķēt procesu palaišanu

---

## Piemēri

### 1. piemērs: Claude Code palaišana un izmantošana

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Noteikt instalētos aģentus
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Palaist jaunu sesiju
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Nosūtīt uzvedni
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Veikt tīrīšanu
  acpManager.kill(session.id);
}
```

### 2. piemērs: automātiska noteikšana ar rezerves variantu

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Vispirms izmēģināt Claude, kā rezerves variantu izmantot Codex
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

### 3. piemērs: pielāgots aģents

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Reģistrēt pielāgotu CLI aģentu
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

// Tagad detectInstalledAgents() iekļaus "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Kas tālāk?

- **[API atsauce](../reference/API_REFERENCE.md)** — REST API galapunkti
- **[Pakalpojumu sniedzēju atsauce](../reference/PROVIDER_REFERENCE.md)** — Visi 352 pakalpojumu sniedzēji
- **[MCP serveris](./MCP-SERVER.md)** — Model Context Protocol integrācija
- **[A2A serveris](./A2A-SERVER.md)** — Starpaģentu protokols
- **[Mākoņa aģents](./CLOUD_AGENT.md)** — Mākonī izvietoti aģenti

---

## Atsauces

- [AionUi projekts](https://github.com/iOfficeAI/AionUi) — Iedvesmas avots ACP automātiskajai noteikšanai
- [ACP pirmkods](../../src/lib/acp/) — Informācija par implementāciju
  - `manager.ts` — Procesu dzīves cikla pārvaldība
  - `registry.ts` — Aģentu noteikšana un reģistrēšana
  - `index.ts` — Publiskā API eksporti
