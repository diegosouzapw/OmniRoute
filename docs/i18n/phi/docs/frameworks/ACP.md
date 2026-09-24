# ACP (Agent Client Protocol) (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: Hinahayaan ng ACP ang OmniRoute na magpatakbo ng mga CLI agent (gaya ng Claude Code, Codex) bilang mga child process sa halip na gumamit ng mga HTTP API. Nagbibigay ito sa iyo ng transport na "CLI-as-backend."

---

## Ano ang ACP?

Ang ACP (Agent Client Protocol) ay isang **"CLI-as-backend" transport** para sa OmniRoute. Sa halip na harangin ang mga HTTP API call sa mga AI provider, **nagpapatakbo ang ACP ng mga CLI agent bilang mga child process** at ipinapasa ang mga prompt sa pamamagitan ng native interface ng mga ito.

### Bakit Gagamit ng ACP?

| Benepisyo                          | Paglalarawan                                                    |
| ---------------------------------- | --------------------------------------------------------------- |
| **Hindi kailangan ng mga API key** | Ginagamit ang kasalukuyan mong CLI authentication               |
| **Native na protocol**             | Ginagamit ang native na format ng input/output ng bawat CLI     |
| **Awtomatikong pagtuklas**         | Tinutukoy ang mga naka-install na CLI sa iyong system           |
| **15 built-in na agent**           | Naka-preconfigure para sa mga sikat na CLI tool                 |
| **Mga custom na agent**            | Idagdag ang sarili mong mga CLI tool sa pamamagitan ng settings |
| **Pamamahala ng process**          | Pinangangasiwaan ang lifecycle (spawn, send, kill)              |

---

## Mga Sinusuportahang CLI Agent

Sinusuportahan ng ACP ang **15 built-in na CLI agent** nang hindi nangangailangan ng karagdagang configuration:

| Agent ID      | Pangalan sa Display | Binary        | Protocol |
| ------------- | ------------------- | ------------- | -------- |
| `codex`       | OpenAI Codex CLI    | `codex`       | stdio    |
| `claude`      | Claude Code CLI     | `claude`      | stdio    |
| `goose`       | Goose CLI           | `goose`       | stdio    |
| `openclaw`    | OpenClaw            | `openclaw`    | stdio    |
| `aider`       | Aider               | `aider`       | stdio    |
| `opencode`    | OpenCode            | `opencode`    | stdio    |
| `cline`       | Cline               | `cline`       | stdio    |
| `qwen`        | Qwen Code           | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode           | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer  | `q`           | stdio    |
| `interpreter` | Open Interpreter    | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI          | `cursor`      | stdio    |
| `warp`        | Warp AI             | `warp`        | stdio    |
| `gemini`      | Gemini CLI          | `gemini`      | stdio    |
| `zcode`       | ZCode               | `zcode`       | stdio    |

### Mga Custom na Agent

Maaari mong idagdag ang sarili mong mga CLI agent sa pamamagitan ng settings. Sinusuportahan ng mga custom na agent ang kaparehong mga feature ng mga built-in na agent.

---

## Mabilisang Pagsisimula

### Hakbang 1: Mag-install ng CLI Agent

```bash
# Halimbawa: I-install ang Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Tiyaking matagumpay ang pag-install
claude --version
```

### Hakbang 2: Awtomatikong Pagtukoy ng ACP

Awtomatikong tinutukoy ng ACP ang mga naka-install na CLI agent sa iyong system. Walang kailangang configuration!

### Hakbang 3: Gamitin ang ACP Transport

Kapag natukoy na, maaaring gamitin ang ACP bilang transport para sa anumang sinusuportahang provider. Awtomatikong gagamitin ng OmniRoute ang ACP kapag available ang CLI.

---

## Paano Gumagana ang ACP

### Arkitektura

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP Proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Child Process  │
│  (CLI Agent)    │
│                 │
│  stdin  ◄──────┤  Ipadala ang prompt
│  stdout ──────►│  Tanggapin ang tugon
│  stderr ──────►│  Tanggapin ang mga error
└─────────────────┘
```

### Lifecycle ng Process

1. **Spawn** — Gumagawa ang ACP ng child process para sa CLI agent
2. **Send** — Isinusulat ng ACP ang mga prompt sa stdin ng process
3. **Receive** — Binabasa ng ACP ang mga tugon mula sa stdout/stderr
4. **Idle Detection** — Naghihintay ang ACP ng 2 segundo ng kawalang-aktibidad bago ituring na kumpleto ang tugon
5. **Kill** — Itinitigil ng ACP ang process (SIGTERM, pagkatapos ay SIGKILL pagkalipas ng 5s)

### Protocol ng Komunikasyon

Gumagamit ang ACP ng **stdio** (standard input/output) para sa pakikipag-ugnayan sa mga CLI agent. Ang protocol ay:

1. **Ipadala ang prompt** — Sumulat sa stdin na may newline
2. **Hintayin ang tugon** — Magbasa mula sa stdout hanggang sa maging idle (2s na walang output)
3. **Timeout** — Default na 120 segundo (maaaring i-configure)

---

## Sanggunian ng API

### Mga Function ng Registry

#### `detectInstalledAgents()`

Tinutukoy ang lahat ng naka-install na CLI agent sa system. Naka-cache ang mga resulta sa loob ng 60 segundo.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Ibinabalik: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // hal., "codex", "claude"
  name: string; // Pangalan na ipinapakita
  binary: string; // Pangalan ng binary na patatakbuhin
  versionCommand: string; // Command para sa pagtukoy ng bersyon
  version: string | null; // Natukoy na bersyon (null kung hindi naka-install)
  installed: boolean; // Kung naka-install ang agent
  providerAlias: string; // Provider ID sa OmniRoute
  spawnArgs: string[]; // Mga argument na ipapasa kapag pinatatakbo
  protocol: "stdio" | "http"; // Protocol ng komunikasyon
  isCustom?: boolean; // Kung isa itong custom agent na tinukoy ng user
}
```

#### `getAvailableAgents()`

Kinukuha lamang ang mga agent na naka-install at available para sa ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Ibinabalik: CliAgentInfo[] (mga naka-install na agent lamang)
```

#### `getAgentById(id)`

Kinukuha ang isang partikular na agent ayon sa ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Ibinabalik: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Itinatakda ang mga depinisyon ng custom agent mula sa mga setting.

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

### Mga Function ng Manager

#### `acpManager.spawn(agentId, binary, args, env)`

Nagpapatakbo ng bagong proseso ng CLI agent.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* mga custom na env var */
});
// Ibinabalik: AcpSession
```

**Mga pinapayagang agent ID**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Nagpapadala ng prompt sa isang CLI agent at kinokolekta ang tugon.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 minutong timeout
);
// Ibinabalik: Promise<string>
```

#### `acpManager.kill(sessionId)`

Pinapatigil ang isang session at nagsasagawa ng paglilinis.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Ibinabalik: boolean
```

#### `acpManager.getActiveSessions()`

Kinukuha ang lahat ng aktibong session.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Ibinabalik: AcpSession[]
```

#### `acpManager.killAll()`

Pinapatigil ang lahat ng session.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interface ng Session

```typescript
interface AcpSession {
  id: string; // Natatanging session ID
  agentId: string; // Agent ID (hal., "claude")
  process: ChildProcess; // Handle ng child process
  alive: boolean; // Kung aktibo pa ang proseso
  stdoutBuffer: string; // Naipong stdout buffer
  stderrBuffer: string; // Naipong stderr buffer
  createdAt: Date; // Timestamp ng pagkakagawa
}
```

### Mga Event

Pinalalawak ng `AcpManager` ang `EventEmitter` at inilalabas ang mga sumusunod na event:

#### `stdout`

Inilalabas kapag nagsusulat ang CLI agent sa stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Inilalabas kapag nagsusulat ang CLI agent sa stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Inilalabas kapag humihinto ang proseso ng CLI agent.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Inilalabas kapag nagkakaroon ng error ang proseso ng CLI agent.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Configuration

### Mga Environment Variable

Namamana ng ACP ang lahat ng environment variable mula sa parent process at maaari itong dagdagan ng mga custom na env var:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Mga Argumento sa Pag-spawn

Ang bawat agent ay may mga default na argumento sa pag-spawn na tinukoy sa registry. Maaari mong i-override ang mga ito:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Mga Timeout

Ang default na timeout ng prompt ay **120 segundo** (2 minuto). Maaari mo itong i-override:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuto
```

### Detection Cache

Naka-cache ang pagtukoy sa agent sa loob ng **60 segundo** upang maiwasan ang magastos na pag-scan sa filesystem. Piliting i-refresh:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Seguridad

### Pag-iwas sa Command Injection

Bine-validate ng ACP ang mga version command upang maiwasan ang mga pag-atake gamit ang command injection:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Tinatanggihan ang mga version command na naglalaman ng mga character na ito:

- `;` — Panghiwalay ng command
- `&` — Proseso sa background
- `|` — Pipe
- `<`, `>` — Pag-redirect
- `` ` `` — Pagpapalit ng command
- `$` — Pag-expand ng variable
- `\r`, `\n` — Mga line break

### Pag-validate sa Pangalan ng Binary

Bine-validate ng ACP na tumutugma ang binary ng version command sa inaasahang pangalan ng binary (maliban kung isa itong custom na agent).

### Pagbukod ng Proseso

Tumatakbo ang bawat session ng ACP sa sarili nitong child process. Pinapatigil ang proseso kapag natapos o nag-timeout ang session.

---

## Pagganap

### Pagganap ng Detection

- **Unang pagtawag**: ~50-200ms (pinapatakbo ang `version` command para sa bawat agent)
- **Mga naka-cache na pagtawag**: <1ms (ibinabalik mula sa cache)
- **Cache TTL**: 60 segundo

### Pagganap ng Prompt

- **Pag-spawn**: ~50-100ms
- **Pagpapadala ng prompt**: ~10-50ms
- **Paghihintay sa tugon**: Depende sa CLI agent (karaniwang 1-30 segundo)
- **Pagpatigil**: ~5 segundo (SIGTERM) + kaagad (SIGKILL)

### Paggamit ng Resource

- **Memory sa bawat session**: ~10-50MB (depende sa CLI agent)
- **CPU**: Minimal (I/O bound)
- **Disk**: Wala

---

## Pag-troubleshoot

### Error na "Unknown agent"

**Problema**: Nagti-throw ang `acpManager.spawn()` ng `Unknown agent: <id>`

**Solusyon**: Ang mga agent na ito lamang ang pinapayagan sa `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Dapat manu-manong i-spawn ang ibang mga agent o gumamit ng mga custom na depinisyon ng agent.

### Error na "Session not alive"

**Problema**: Nagti-throw ang `acpManager.sendPrompt()` ng `Session ${sessionId} is not alive`

**Solusyon**: Maaaring natapos o pinatigil ang session. Suriin ang status ng session:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // I-spawn muli ang session
  acpManager.spawn("claude", "claude", [], {});
}
```

### Error na "ACP timeout"

**Problema**: Nagti-throw ang `acpManager.sendPrompt()` ng `ACP timeout after 120000ms`

**Solusyon**: Dagdagan ang timeout:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuto
```

### Hindi Natukoy ang CLI

**Problema**: Hindi mahanap ng `detectInstalledAgents()` ang iyong CLI

**Mga Solusyon**:

1. **Suriin ang PATH**: Tiyaking nasa PATH ng iyong system ang CLI
2. **Suriin ang version command**: Patakbuhin nang manu-mano ang `claude --version`
3. **Suriin ang mga pahintulot**: Tiyaking executable ang CLI
4. **Custom na agent**: Magdagdag ng custom na depinisyon ng agent para sa mga hindi karaniwang CLI

### Tinanggihan ang Pahintulot

**Problema**: Hindi ma-execute ng ACP ang CLI

**Mga Solusyon**:

1. **Suriin ang mga pahintulot ng file**: `chmod +x /usr/local/bin/claude`
2. **Suriin ang pagmamay-ari**: Tiyaking may mga pahintulot sa pagbasa/pag-execute ang OmniRoute
3. **Suriin ang SELinux/AppArmor**: Maaaring hinaharangan nito ang pag-spawn ng proseso

---

## Mga Halimbawa

### Halimbawa 1: Mag-spawn at Gumamit ng Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Tukuyin ang mga naka-install na agent
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Mag-spawn ng bagong session
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Magpadala ng prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Ipaliwanag ang quantum computing sa 100 salita"
  );

  console.log("Tugon ni Claude:", response);

  // Maglinis
  acpManager.kill(session.id);
}
```

### Halimbawa 2: Awtomatikong Pagtuklas na may Fallback

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Subukan muna ang Claude, at gamitin ang Codex bilang fallback
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("Walang nakitang CLI agent na compatible sa ACP");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Kumusta!");

acpManager.kill(session.id);
```

### Halimbawa 3: Custom na Agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Magrehistro ng custom na CLI agent
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

// Isasama na ngayon ng detectInstalledAgents() ang "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Ano ang Susunod?

- **[Sanggunian ng API](../reference/API_REFERENCE.md)** — Mga endpoint ng REST API
- **[Sanggunian ng Provider](../reference/PROVIDER_REFERENCE.md)** — Lahat ng 352 provider
- **[MCP Server](./MCP-SERVER.md)** — Integrasyon ng Model Context Protocol
- **[A2A Server](./A2A-SERVER.md)** — Protocol na Agent-to-Agent
- **[Cloud Agent](./CLOUD_AGENT.md)** — Mga agent na nakabatay sa cloud

---

## Sanggunian

- [Proyekto ng AionUi](https://github.com/iOfficeAI/AionUi) — Inspirasyon para sa awtomatikong pagtuklas ng ACP
- [Source Code ng ACP](../../src/lib/acp/) — Mga detalye ng implementasyon
  - `manager.ts` — Pamamahala ng lifecycle ng proseso
  - `registry.ts` — Pagtuklas at pagpaparehistro ng agent
  - `index.ts` — Mga export ng pampublikong API
