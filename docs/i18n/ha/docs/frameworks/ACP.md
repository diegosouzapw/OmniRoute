# ACP (Agent Client Protocol) (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **A taƙaice**: ACP yana ba OmniRoute damar ƙaddamar da wakilan CLI (kamar Claude Code, Codex) a matsayin ƙananan matakai maimakon amfani da HTTP APIs. Wannan yana ba ka hanyar jigilar bayanai ta "CLI-as-backend".

---

## Mene Ne ACP?

ACP (Agent Client Protocol) hanya ce ta **"CLI-as-backend"** ga OmniRoute. Maimakon kutsawa cikin kiraye-kirayen HTTP API zuwa masu samar da AI, ACP yana **ƙaddamar da wakilan CLI a matsayin ƙananan matakai** sannan ya aika musu da umarni ta hanyar asalin muhallinsu.

### Me Ya Sa A Yi Amfani da ACP?

| Fa'ida                        | Bayani                                                   |
| ----------------------------- | -------------------------------------------------------- |
| **Ba a buƙatar maɓallan API** | Yana amfani da ingantaccen shiga na CLI ɗinka            |
| **Asalin yarjejeniya**        | Yana amfani da tsarin shigarwa/fitarwa na kowane CLI     |
| **Ganowa ta atomatik**        | Yana gano CLI da aka girka a tsarinka                    |
| **Wakilai 15 da aka haɗa**    | An riga an saita su don shahararrun kayan aikin CLI      |
| **Wakilai na musamman**       | Ƙara naka kayan aikin CLI ta hanyar saituna              |
| **Gudanar da matakai**        | Yana kula da tsarin rayuwa (ƙaddamarwa, aikawa, kashewa) |

---

## Wakilan CLI da Ake Tallafawa

ACP yana tallafa wa **wakilan CLI guda 15 da aka haɗa** kai tsaye:

| ID na Wakili  | Sunan Nuni         | Binary        | Yarjejeniya |
| ------------- | ------------------ | ------------- | ----------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio       |
| `claude`      | Claude Code CLI    | `claude`      | stdio       |
| `goose`       | Goose CLI          | `goose`       | stdio       |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio       |
| `aider`       | Aider              | `aider`       | stdio       |
| `opencode`    | OpenCode           | `opencode`    | stdio       |
| `cline`       | Cline              | `cline`       | stdio       |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio       |
| `forge`       | ForgeCode          | `forge`       | stdio       |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio       |
| `interpreter` | Open Interpreter   | `interpreter` | stdio       |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio       |
| `warp`        | Warp AI            | `warp`        | stdio       |
| `gemini`      | Gemini CLI         | `gemini`      | stdio       |
| `zcode`       | ZCode              | `zcode`       | stdio       |

### Wakilai na Musamman

Za ka iya ƙara naka wakilan CLI ta hanyar saituna. Wakilai na musamman suna tallafa wa fasaloli iri ɗaya da wakilan da aka haɗa.

---

## Farawa Cikin Sauri

### Mataki na 1: Girka Wakilin CLI

```bash
# Misali: Girka Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Tabbatar da an girka shi
claude --version
```

### Mataki na 2: Ganowa ta Atomatik ta ACP

ACP yana gano wakilan CLI da aka girka a tsarinka ta atomatik. Ba a buƙatar wani saiti!

### Mataki na 3: Yi Amfani da Hanyar Jigilar ACP

Da zarar an gano shi, za a iya amfani da ACP a matsayin hanyar jigilar bayanai ga duk wani mai samarwa da ake tallafawa. OmniRoute zai yi amfani da ACP ta atomatik idan CLI yana samuwa.

---

## Yadda ACP Ke Aiki

### Tsarin Gine-gine

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP Proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Ƙaramin Mataki │
│  (Wakilin CLI)  │
│                 │
│  stdin  ◄──────┤  Aika umarni
│  stdout ──────►│  Karɓi amsa
│  stderr ──────►│  Karɓi kurakurai
└─────────────────┘
```

### Tsarin Rayuwar Mataki

1. **Ƙaddamarwa** — ACP yana ƙirƙirar ƙaramin mataki don wakilin CLI
2. **Aikawa** — ACP yana rubuta umarni zuwa stdin na matakin
3. **Karɓa** — ACP yana karanta amsoshi daga stdout/stderr
4. **Gano Rashin Aiki** — ACP yana jira daƙiƙa 2 na rashin aiki kafin ɗaukar cewa amsar ta kammala
5. **Kashewa** — ACP yana dakatar da matakin (SIGTERM, sannan SIGKILL bayan 5s)

### Yarjejeniyar Sadarwa

ACP yana amfani da **stdio** (daidaitacciyar shigarwa/fitarwa) don sadarwa da wakilan CLI. Yarjejeniyar ita ce:

1. **Aika umarni** — Rubuta zuwa stdin tare da sabon layi
2. **Jira amsa** — Karanta daga stdout har sai babu aiki (2s ba tare da wata fitarwa ba)
3. **Iyakar lokaci** — Daƙiƙa 120 ta tsohuwa (ana iya saita ta)

---

## Manazartar API

### Ayyukan Rijista

#### `detectInstalledAgents()`

Yana gano duk wakilan CLI da aka girka a tsarin. Ana adana sakamakon na daƙiƙa 60.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Yana dawo da: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // misali, "codex", "claude"
  name: string; // Sunan da ake nunawa
  binary: string; // Sunan binary da za a ƙaddamar
  versionCommand: string; // Umarnin gano siga
  version: string | null; // Sigar da aka gano (null idan ba a girka ba)
  installed: boolean; // Ko an girka wakilin
  providerAlias: string; // ID na mai samarwa a cikin OmniRoute
  spawnArgs: string[]; // Muhawarar da za a bayar yayin ƙaddamarwa
  protocol: "stdio" | "http"; // Ka'idar sadarwa
  isCustom?: boolean; // Ko wannan wakili ne na musamman da mai amfani ya ayyana
}
```

#### `getAvailableAgents()`

Yana samo wakilan da aka girka kuma suke samuwa don ACP kawai.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Yana dawo da: CliAgentInfo[] (wakilan da aka girka kawai)
```

#### `getAgentById(id)`

Yana samo takamaiman wakili ta hanyar ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Yana dawo da: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Yana saita ayyana wakilai na musamman daga saituna.

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

### Ayyukan Manaja

#### `acpManager.spawn(agentId, binary, args, env)`

Yana ƙaddamar da sabon tsarin aikin wakilin CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* sauye-sauyen muhalli na musamman */
});
// Yana dawo da: AcpSession
```

**ID ɗin wakilan da aka yarda da su**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Yana aika buƙata zuwa wakilin CLI kuma yana tattara amsar.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // iyakar jira ta mintuna 2
);
// Yana dawo da: Promise<string>
```

#### `acpManager.kill(sessionId)`

Yana kashe zama kuma yana tsaftacewa.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Yana dawo da: boolean
```

#### `acpManager.getActiveSessions()`

Yana samo duk zaman da ke aiki.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Yana dawo da: AcpSession[]
```

#### `acpManager.killAll()`

Yana kashe duk zaman.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Fuskar Zama

```typescript
interface AcpSession {
  id: string; // ID na zama na musamman
  agentId: string; // ID na wakili (misali, "claude")
  process: ChildProcess; // Makamin sarrafa ƙaramin tsari
  alive: boolean; // Ko tsarin aikin yana raye
  stdoutBuffer: string; // Ma'ajiyar stdout da aka tara
  stderrBuffer: string; // Ma'ajiyar stderr da aka tara
  createdAt: Date; // Hatimin lokacin ƙirƙira
}
```

### Abubuwan da Suka Faru

`AcpManager` yana faɗaɗa `EventEmitter` kuma yana fitar da abubuwan da suka faru kamar haka:

#### `stdout`

Ana fitar da shi lokacin da wakilin CLI ya rubuta zuwa stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Ana fitar da shi lokacin da wakilin CLI ya rubuta zuwa stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Ana fitar da shi lokacin da tsarin aikin wakilin CLI ya fita.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Ana fitar da shi lokacin da kuskure ya faru a tsarin aikin wakilin CLI.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Kanfigareshan

### Sauye-sauyen Muhalli

ACP yana gado dukkan sauye-sauyen muhalli daga tsarin uwar, kuma ana iya faɗaɗa su da sauye-sauyen muhalli na musamman:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Muhawarar Ƙaddamarwa

Kowane wakili yana da tsoffin muhawarar ƙaddamarwa da aka ayyana a cikin rajista. Za ka iya maye gurbinsu:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Iyakar Lokaci

Tsohuwar iyakar lokacin prompt ita ce **dakikoki 120** (mintuna 2). Za ka iya canza ta:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // mintuna 5
```

### Ma'ajiyar Gano Wakili

Ana adana sakamakon gano wakili na tsawon **dakikoki 60** don guje wa binciken tsarin fayil mai tsada. Don tilasta sabuntawa:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Tsaro

### Hana Shigar da Umarni Ta Hanyar Kutse

ACP yana tantance umarnin sigar don hana hare-haren shigar da umarni ta hanyar kutse:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Ana ƙin karɓar umarnin sigar da ke ɗauke da waɗannan alamomi:

- `;` — Mai raba umarni
- `&` — Tsarin da ke gudana a bango
- `|` — Bututu
- `<`, `>` — Sauya alkiblar shigarwa ko fitarwa
- `` ` `` — Sauya umarni da sakamakonsa
- `$` — Faɗaɗa sauyi
- `\r`, `\n` — Tsallake layi

### Tantance Sunan Binary

ACP yana tabbatar da cewa binary na umarnin sigar ya dace da sunan binary da ake tsammani (sai dai idan wakili ne na musamman).

### Keɓance Tsari

Kowane zaman ACP yana gudana a cikin tsarin ɗa na kansa. Ana kashe tsarin lokacin da zaman ya ƙare ko ya wuce iyakar lokaci.

---

## Aiki

### Aikin Gano Wakili

- **Kira na farko**: ~50-200ms (yana gudanar da umarnin `version` ga kowane wakili)
- **Kiraye-kirayen da aka adana**: <1ms (yana dawo da sakamako daga ma'ajiya)
- **Cache TTL**: dakikoki 60

### Aikin Prompt

- **Ƙaddamarwa**: ~50-100ms
- **Aika prompt**: ~10-50ms
- **Jiran amsa**: Ya dogara da wakilin CLI (yawanci dakikoki 1-30)
- **Kashewa**: ~dakikoki 5 (SIGTERM) + nan take (SIGKILL)

### Amfani da Albarkatu

- **Ƙwaƙwalwa ga kowane zama**: ~10-50MB (ya dogara da wakilin CLI)
- **CPU**: Ƙaranci (ya dogara da I/O)
- **Faifai**: Babu

---

## Magance Matsaloli

### Kuskuren "Unknown agent"

**Matsala**: `acpManager.spawn()` yana jefa `Unknown agent: <id>`

**Mafita**: Waɗannan wakilan kaɗai ne aka yarda da su a cikin `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Dole ne a ƙaddamar da sauran wakilai da hannu ko ta hanyar ayyana wakilai na musamman.

### Kuskuren "Session not alive"

**Matsala**: `acpManager.sendPrompt()` yana jefa `Session ${sessionId} is not alive`

**Mafita**: Mai yiwuwa zaman ya riga ya fita ko kuma an kashe shi. Duba matsayin zaman:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Sake ƙaddamar da zaman
  acpManager.spawn("claude", "claude", [], {});
}
```

### Kuskuren "ACP timeout"

**Matsala**: `acpManager.sendPrompt()` yana jefa `ACP timeout after 120000ms`

**Mafita**: Ƙara iyakar lokaci:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // mintuna 5
```

### Ba a Gano CLI Ba

**Matsala**: `detectInstalledAgents()` bai gano CLI ɗinka ba

**Mafita**:

1. **Duba PATH**: Tabbatar cewa CLI yana cikin PATH na tsarinka
2. **Duba umarnin siga**: Gudanar da `claude --version` da hannu
3. **Duba izini**: Tabbatar cewa ana iya aiwatar da CLI
4. **Wakili na musamman**: Ƙara ayyana wakili na musamman ga CLI marasa daidaitaccen tsari

### An Hana Izini

**Matsala**: ACP ba zai iya aiwatar da CLI ba

**Mafita**:

1. **Duba izinin fayil**: `chmod +x /usr/local/bin/claude`
2. **Duba mallaka**: Tabbatar cewa OmniRoute yana da izinin karantawa/aiwatarwa
3. **Duba SELinux/AppArmor**: Zai iya toshe ƙaddamar da tsari

---

## Misalai

### Misali na 1: Ƙaddamar da Amfani da Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Gano wakilan da aka shigar
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Ƙaddamar da sabon zama
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Aika umarni
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Tsaftacewa
  acpManager.kill(session.id);
}
```

### Misali na 2: Ganowa ta Atomatik tare da Madadin Zaɓi

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Fara gwada Claude, sannan a koma Codex idan bai samu ba
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

### Misali na 3: Wakili na Musamman

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Yi rajistar wakilin CLI na musamman
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

// Yanzu detectInstalledAgents() zai haɗa da "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Mene ne na Gaba?

- **[Manazartar API](../reference/API_REFERENCE.md)** — Wuraren samun damar REST API
- **[Manazartar Masu Bayarwa](../reference/PROVIDER_REFERENCE.md)** — Dukkan masu bayarwa 352
- **[Sabar MCP](./MCP-SERVER.md)** — Haɗawa da Model Context Protocol
- **[Sabar A2A](./A2A-SERVER.md)** — Ƙa'idar sadarwa tsakanin wakili da wakili
- **[Wakilin Gajimare](./CLOUD_AGENT.md)** — Wakilan da ke aiki ta gajimare

---

## Manazarta

- [Aikin AionUi](https://github.com/iOfficeAI/AionUi) — Madogarar ra'ayi don ganowar ACP ta atomatik
- [Lambar Tushe ta ACP](../../src/lib/acp/) — Cikakkun bayanan aiwatarwa
  - `manager.ts` — Gudanar da zagayowar rayuwar tsari
  - `registry.ts` — Ganowa da rajistar wakilai
  - `index.ts` — Fitarwar API ta jama'a
