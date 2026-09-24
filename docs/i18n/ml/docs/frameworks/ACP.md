# ACP (Agent Client Protocol) (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **ചുരുക്കത്തിൽ**: HTTP API-കൾ ഉപയോഗിക്കുന്നതിന് പകരം Claude Code, Codex പോലുള്ള CLI ഏജന്റുകളെ ചൈൽഡ് പ്രോസസ്സുകളായി ആരംഭിക്കാൻ ACP OmniRoute-നെ അനുവദിക്കുന്നു. ഇതിലൂടെ നിങ്ങൾക്ക് "CLI-as-backend" ട്രാൻസ്പോർട്ട് ലഭിക്കുന്നു.

---

## എന്താണ് ACP?

ACP (Agent Client Protocol) എന്നത് OmniRoute-നുള്ള ഒരു **"CLI-as-backend" ട്രാൻസ്പോർട്ടാണ്**. AI ദാതാക്കളിലേക്കുള്ള HTTP API കോളുകൾ തടഞ്ഞ് കൈകാര്യം ചെയ്യുന്നതിന് പകരം, ACP **CLI ഏജന്റുകളെ ചൈൽഡ് പ്രോസസ്സുകളായി ആരംഭിക്കുകയും** അവയുടെ നേറ്റീവ് ഇന്റർഫേസിലൂടെ പ്രോംപ്റ്റുകൾ നൽകുകയും ചെയ്യുന്നു.

### എന്തുകൊണ്ട് ACP ഉപയോഗിക്കണം?

| പ്രയോജനം                      | വിവരണം                                                                 |
| ----------------------------- | ---------------------------------------------------------------------- |
| **API കീകൾ ആവശ്യമില്ല**       | നിലവിലുള്ള നിങ്ങളുടെ CLI ഓതന്റിക്കേഷൻ ഉപയോഗിക്കുന്നു                   |
| **നേറ്റീവ് പ്രോട്ടോക്കോൾ**    | ഓരോ CLI-യുടെയും നേറ്റീവ് ഇൻപുട്ട്/ഔട്ട്പുട്ട് ഫോർമാറ്റ് ഉപയോഗിക്കുന്നു |
| **സ്വയമേവ കണ്ടെത്തൽ**         | നിങ്ങളുടെ സിസ്റ്റത്തിൽ ഇൻസ്റ്റാൾ ചെയ്തിട്ടുള്ള CLI-കൾ കണ്ടെത്തുന്നു    |
| **ബിൽറ്റ്-ഇൻ ആയ 15 ഏജന്റുകൾ** | ജനപ്രിയ CLI ടൂളുകൾക്കായി മുൻകൂട്ടി കോൺഫിഗർ ചെയ്തിരിക്കുന്നു            |
| **കസ്റ്റം ഏജന്റുകൾ**          | ക്രമീകരണങ്ങളിലൂടെ നിങ്ങളുടെ സ്വന്തം CLI ടൂളുകൾ ചേർക്കാം                |
| **പ്രോസസ് മാനേജ്മെന്റ്**      | ലൈഫ്സൈക്കിൾ കൈകാര്യം ചെയ്യുന്നു (ആരംഭിക്കൽ, അയയ്ക്കൽ, അവസാനിപ്പിക്കൽ)  |

---

## പിന്തുണയ്ക്കുന്ന CLI ഏജന്റുകൾ

ACP-യിൽ ഉപയോഗിക്കാൻ തയ്യാറായ **15 ബിൽറ്റ്-ഇൻ CLI ഏജന്റുകൾക്ക്** പിന്തുണയുണ്ട്:

| ഏജന്റ് ID     | പ്രദർശന നാമം       | ബൈനറി         | പ്രോട്ടോക്കോൾ |
| ------------- | ------------------ | ------------- | ------------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio         |
| `claude`      | Claude Code CLI    | `claude`      | stdio         |
| `goose`       | Goose CLI          | `goose`       | stdio         |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio         |
| `aider`       | Aider              | `aider`       | stdio         |
| `opencode`    | OpenCode           | `opencode`    | stdio         |
| `cline`       | Cline              | `cline`       | stdio         |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio         |
| `forge`       | ForgeCode          | `forge`       | stdio         |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio         |
| `interpreter` | Open Interpreter   | `interpreter` | stdio         |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio         |
| `warp`        | Warp AI            | `warp`        | stdio         |
| `gemini`      | Gemini CLI         | `gemini`      | stdio         |
| `zcode`       | ZCode              | `zcode`       | stdio         |

### കസ്റ്റം ഏജന്റുകൾ

ക്രമീകരണങ്ങളിലൂടെ നിങ്ങളുടെ സ്വന്തം CLI ഏജന്റുകൾ ചേർക്കാം. ബിൽറ്റ്-ഇൻ ഏജന്റുകൾക്കുള്ള അതേ സവിശേഷതകൾ കസ്റ്റം ഏജന്റുകളും പിന്തുണയ്ക്കുന്നു.

---

## വേഗത്തിലുള്ള തുടക്കം

### ഘട്ടം 1: ഒരു CLI ഏജന്റ് ഇൻസ്റ്റാൾ ചെയ്യുക

```bash
# ഉദാഹരണം: Claude Code CLI ഇൻസ്റ്റാൾ ചെയ്യുക
npm install -g @anthropic-ai/claude-code

# ഇൻസ്റ്റാളേഷൻ പരിശോധിക്കുക
claude --version
```

### ഘട്ടം 2: ACP സ്വയമേവ കണ്ടെത്തൽ

നിങ്ങളുടെ സിസ്റ്റത്തിൽ ഇൻസ്റ്റാൾ ചെയ്തിട്ടുള്ള CLI ഏജന്റുകളെ ACP സ്വയമേവ കണ്ടെത്തുന്നു. കോൺഫിഗറേഷൻ ആവശ്യമില്ല!

### ഘട്ടം 3: ACP ട്രാൻസ്പോർട്ട് ഉപയോഗിക്കുക

കണ്ടെത്തിക്കഴിഞ്ഞാൽ, പിന്തുണയ്ക്കുന്ന ഏതൊരു ദാതാവിനുമുള്ള ട്രാൻസ്പോർട്ടായി ACP ഉപയോഗിക്കാം. CLI ലഭ്യമാകുമ്പോൾ OmniRoute സ്വയമേവ ACP ഉപയോഗിക്കും.

---

## ACP എങ്ങനെ പ്രവർത്തിക്കുന്നു

### ആർക്കിടെക്ചർ

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP പ്രോക്സി) │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  ചൈൽഡ് പ്രോസസ്  │
│  (CLI ഏജന്റ്)   │
│                 │
│  stdin  ◄──────┤  പ്രോംപ്റ്റ് അയയ്ക്കുക
│  stdout ──────►│  പ്രതികരണം സ്വീകരിക്കുക
│  stderr ──────►│  പിശകുകൾ സ്വീകരിക്കുക
└─────────────────┘
```

### പ്രോസസ് ലൈഫ്സൈക്കിൾ

1. **ആരംഭിക്കൽ** — CLI ഏജന്റിനായി ACP ഒരു ചൈൽഡ് പ്രോസസ് സൃഷ്ടിക്കുന്നു
2. **അയയ്ക്കൽ** — പ്രോസസ്സിന്റെ stdin-ലേക്ക് ACP പ്രോംപ്റ്റുകൾ എഴുതുന്നു
3. **സ്വീകരിക്കൽ** — stdout/stderr-ൽ നിന്ന് ACP പ്രതികരണങ്ങൾ വായിക്കുന്നു
4. **നിഷ്ക്രിയത്വം കണ്ടെത്തൽ** — പ്രതികരണം പൂർത്തിയായതായി കണക്കാക്കുന്നതിന് മുമ്പ് 2 സെക്കൻഡ് നിഷ്ക്രിയത്വത്തിനായി ACP കാത്തിരിക്കുന്നു
5. **അവസാനിപ്പിക്കൽ** — ACP പ്രോസസ് അവസാനിപ്പിക്കുന്നു (SIGTERM, തുടർന്ന് 5s കഴിഞ്ഞ് SIGKILL)

### ആശയവിനിമയ പ്രോട്ടോക്കോൾ

CLI ഏജന്റുകളുമായി ആശയവിനിമയം നടത്താൻ ACP **stdio** (സ്റ്റാൻഡേർഡ് ഇൻപുട്ട്/ഔട്ട്പുട്ട്) ഉപയോഗിക്കുന്നു. പ്രോട്ടോക്കോൾ ഇപ്രകാരമാണ്:

1. **പ്രോംപ്റ്റ് അയയ്ക്കുക** — ഒരു പുതിയ വരിയോടൊപ്പം stdin-ലേക്ക് എഴുതുക
2. **പ്രതികരണത്തിനായി കാത്തിരിക്കുക** — നിഷ്ക്രിയമാകുന്നതുവരെ stdout-ൽ നിന്ന് വായിക്കുക (2s നേരത്തേക്ക് ഔട്ട്പുട്ട് ഇല്ലാത്തത്)
3. **ടൈംഔട്ട്** — ഡിഫോൾട്ടായി 120 സെക്കൻഡ് (കോൺഫിഗർ ചെയ്യാവുന്നത്)

---

## API റഫറൻസ്

### രജിസ്ട്രി ഫംഗ്ഷനുകൾ

#### `detectInstalledAgents()`

സിസ്റ്റത്തിൽ ഇൻസ്റ്റാൾ ചെയ്തിട്ടുള്ള എല്ലാ CLI ഏജന്റുകളെയും കണ്ടെത്തുന്നു. ഫലങ്ങൾ 60 സെക്കൻഡ് നേരത്തേക്ക് കാഷ് ചെയ്യപ്പെടുന്നു.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// മടക്കിനൽകുന്നത്: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ഉദാ., "codex", "claude"
  name: string; // പ്രദർശന നാമം
  binary: string; // പ്രവർത്തിപ്പിക്കേണ്ട ബൈനറിയുടെ പേര്
  versionCommand: string; // പതിപ്പ് കണ്ടെത്തുന്നതിനുള്ള കമാൻഡ്
  version: string | null; // കണ്ടെത്തിയ പതിപ്പ് (ഇൻസ്റ്റാൾ ചെയ്തിട്ടില്ലെങ്കിൽ null)
  installed: boolean; // ഏജന്റ് ഇൻസ്റ്റാൾ ചെയ്തിട്ടുണ്ടോ എന്ന്
  providerAlias: string; // OmniRoute-ലെ പ്രൊവൈഡർ ID
  spawnArgs: string[]; // പ്രവർത്തിപ്പിക്കുമ്പോൾ കൈമാറേണ്ട ആർഗ്യുമെന്റുകൾ
  protocol: "stdio" | "http"; // ആശയവിനിമയ പ്രോട്ടോക്കോൾ
  isCustom?: boolean; // ഇത് ഉപയോക്താവ് നിർവചിച്ച കസ്റ്റം ഏജന്റാണോ എന്ന്
}
```

#### `getAvailableAgents()`

ഇൻസ്റ്റാൾ ചെയ്തിട്ടുള്ളതും ACP-യ്ക്ക് ലഭ്യമായതുമായ ഏജന്റുകളെ മാത്രം ലഭ്യമാക്കുന്നു.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// മടക്കിനൽകുന്നത്: CliAgentInfo[] (ഇൻസ്റ്റാൾ ചെയ്ത ഏജന്റുകൾ മാത്രം)
```

#### `getAgentById(id)`

ID ഉപയോഗിച്ച് ഒരു നിർദ്ദിഷ്ട ഏജന്റിനെ ലഭ്യമാക്കുന്നു.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// മടക്കിനൽകുന്നത്: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

ക്രമീകരണങ്ങളിൽനിന്നുള്ള കസ്റ്റം ഏജന്റ് നിർവചനങ്ങൾ സജ്ജീകരിക്കുന്നു.

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

### മാനേജർ ഫംഗ്ഷനുകൾ

#### `acpManager.spawn(agentId, binary, args, env)`

ഒരു പുതിയ CLI ഏജന്റ് പ്രോസസ് പ്രവർത്തിപ്പിക്കുന്നു.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* കസ്റ്റം എൻവയോൺമെന്റ് വേരിയബിളുകൾ */
});
// മടക്കിനൽകുന്നത്: AcpSession
```

**അനുവദനീയമായ ഏജന്റ് ID-കൾ**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

ഒരു CLI ഏജന്റിന് പ്രോംപ്റ്റ് അയയ്ക്കുകയും പ്രതികരണം ശേഖരിക്കുകയും ചെയ്യുന്നു.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 മിനിറ്റ് സമയപരിധി
);
// മടക്കിനൽകുന്നത്: Promise<string>
```

#### `acpManager.kill(sessionId)`

ഒരു സെഷൻ അവസാനിപ്പിക്കുകയും വൃത്തിയാക്കുകയും ചെയ്യുന്നു.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// മടക്കിനൽകുന്നത്: boolean
```

#### `acpManager.getActiveSessions()`

സജീവമായ എല്ലാ സെഷനുകളും ലഭ്യമാക്കുന്നു.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// മടക്കിനൽകുന്നത്: AcpSession[]
```

#### `acpManager.killAll()`

എല്ലാ സെഷനുകളും അവസാനിപ്പിക്കുന്നു.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### സെഷൻ ഇന്റർഫേസ്

```typescript
interface AcpSession {
  id: string; // തനതായ സെഷൻ ID
  agentId: string; // ഏജന്റ് ID (ഉദാ., "claude")
  process: ChildProcess; // ചൈൽഡ് പ്രോസസ് ഹാൻഡിൽ
  alive: boolean; // പ്രോസസ് സജീവമാണോ എന്ന്
  stdoutBuffer: string; // ശേഖരിച്ച stdout ബഫർ
  stderrBuffer: string; // ശേഖരിച്ച stderr ബഫർ
  createdAt: Date; // സൃഷ്ടിച്ച സമയമുദ്ര
}
```

### ഇവന്റുകൾ

`AcpManager`, `EventEmitter`-നെ വിപുലീകരിക്കുകയും ഇനിപ്പറയുന്ന ഇവന്റുകൾ എമിറ്റ് ചെയ്യുകയും ചെയ്യുന്നു:

#### `stdout`

CLI ഏജന്റ് stdout-ലേക്ക് എഴുതുമ്പോൾ എമിറ്റ് ചെയ്യപ്പെടുന്നു.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI ഏജന്റ് stderr-ലേക്ക് എഴുതുമ്പോൾ എമിറ്റ് ചെയ്യപ്പെടുന്നു.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI ഏജന്റ് പ്രോസസ് അവസാനിക്കുമ്പോൾ എമിറ്റ് ചെയ്യപ്പെടുന്നു.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI ഏജന്റ് പ്രോസസിൽ പിശക് സംഭവിക്കുമ്പോൾ എമിറ്റ് ചെയ്യപ്പെടുന്നു.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## കോൺഫിഗറേഷൻ

### എൻവയോൺമെന്റ് വേരിയബിളുകൾ

പാരന്റ് പ്രോസസിൽ നിന്നുള്ള എല്ലാ എൻവയോൺമെന്റ് വേരിയബിളുകളും ACP സ്വീകരിക്കുന്നു; കൂടാതെ ഇഷ്ടാനുസൃത env vars ഉപയോഗിച്ച് അവ വിപുലീകരിക്കാനും കഴിയും:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### സ്പോൺ ആർഗ്യുമെന്റുകൾ

ഓരോ ഏജന്റിനും രജിസ്ട്രിയിൽ നിർവചിച്ചിട്ടുള്ള ഡിഫോൾട്ട് സ്പോൺ ആർഗ്യുമെന്റുകളുണ്ട്. നിങ്ങൾക്ക് അവ ഓവർറൈഡ് ചെയ്യാം:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### ടൈംഔട്ടുകൾ

ഡിഫോൾട്ട് പ്രോംപ്റ്റ് ടൈംഔട്ട് **120 സെക്കൻഡ്** (2 മിനിറ്റ്) ആണ്. നിങ്ങൾക്ക് ഇത് ഓവർറൈഡ് ചെയ്യാം:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 മിനിറ്റ്
```

### ഡിറ്റക്ഷൻ കാഷ്

ചെലവേറിയ ഫയൽസിസ്റ്റം സ്കാനുകൾ ഒഴിവാക്കാൻ ഏജന്റ് ഡിറ്റക്ഷൻ **60 സെക്കൻഡ്** നേരത്തേക്ക് കാഷ് ചെയ്യപ്പെടുന്നു. നിർബന്ധിതമായി പുതുക്കാൻ:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## സുരക്ഷ

### കമാൻഡ് ഇൻജക്ഷൻ തടയൽ

കമാൻഡ് ഇൻജക്ഷൻ ആക്രമണങ്ങൾ തടയാൻ ACP വേർഷൻ കമാൻഡുകൾ സാധൂകരിക്കുന്നു:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

ഈ പ്രതീകങ്ങൾ ഉൾക്കൊള്ളുന്ന വേർഷൻ കമാൻഡുകൾ നിരസിക്കപ്പെടും:

- `;` — കമാൻഡ് വേർതിരിക്കൽ ചിഹ്നം
- `&` — പശ്ചാത്തല പ്രോസസ്
- `|` — പൈപ്പ്
- `<`, `>` — റീഡയറക്ഷൻ
- `` ` `` — കമാൻഡ് സബ്സ്റ്റിറ്റ്യൂഷൻ
- `$` — വേരിയബിൾ എക്സ്പാൻഷൻ
- `\r`, `\n` — ലൈൻ ബ്രേക്കുകൾ

### ബൈനറി നാമത്തിന്റെ സാധൂകരണം

വേർഷൻ കമാൻഡിലെ ബൈനറി പ്രതീക്ഷിക്കുന്ന ബൈനറി നാമവുമായി പൊരുത്തപ്പെടുന്നുവെന്ന് ACP സാധൂകരിക്കുന്നു (ഇത് ഒരു ഇഷ്ടാനുസൃത ഏജന്റ് അല്ലെങ്കിൽ).

### പ്രോസസ് ഐസൊലേഷൻ

ഓരോ ACP സെഷനും അതിന്റേതായ ചൈൽഡ് പ്രോസസിലാണ് പ്രവർത്തിക്കുന്നത്. സെഷൻ അവസാനിക്കുമ്പോഴോ ടൈംഔട്ട് ആകുമ്പോഴോ പ്രോസസ് നിർത്തപ്പെടുന്നു.

---

## പ്രകടനം

### ഡിറ്റക്ഷൻ പ്രകടനം

- **ആദ്യ കോൾ**: ~50-200ms (ഓരോ ഏജന്റിനുമായി `version` കമാൻഡ് പ്രവർത്തിപ്പിക്കുന്നു)
- **കാഷ് ചെയ്ത കോളുകൾ**: <1ms (കാഷിൽ നിന്ന് നൽകുന്നു)
- **കാഷ് TTL**: 60 സെക്കൻഡ്

### പ്രോംപ്റ്റ് പ്രകടനം

- **സ്പോൺ**: ~50-100ms
- **പ്രോംപ്റ്റ് അയയ്ക്കൽ**: ~10-50ms
- **പ്രതികരണത്തിനായി കാത്തിരിപ്പ്**: CLI ഏജന്റിനെ ആശ്രയിച്ചിരിക്കുന്നു (സാധാരണയായി 1-30 സെക്കൻഡ്)
- **നിർത്തൽ**: ~5 സെക്കൻഡ് (SIGTERM) + ഉടനടി (SIGKILL)

### റിസോഴ്സ് ഉപയോഗം

- **ഓരോ സെഷനിലെയും മെമ്മറി**: ~10-50MB (CLI ഏജന്റിനെ ആശ്രയിച്ചിരിക്കുന്നു)
- **CPU**: ഏറ്റവും കുറവ് (I/O ബൗണ്ട്)
- **ഡിസ്ക്**: ഒന്നുമില്ല

---

## പ്രശ്നപരിഹാരം

### "Unknown agent" പിശക്

**പ്രശ്നം**: `acpManager.spawn()` എന്നത് `Unknown agent: <id>` പിശക് ഉയർത്തുന്നു

**പരിഹാരം**: `spawn()`-ൽ ഈ ഏജന്റുകൾ മാത്രമാണ് അനുവദിച്ചിരിക്കുന്നത്:

- `claude`
- `codex`
- `gemini`
- `qwen`

മറ്റ് ഏജന്റുകളെ മാനുവലായോ ഇഷ്ടാനുസൃത ഏജന്റ് നിർവചനങ്ങൾ വഴിയോ സ്പോൺ ചെയ്യണം.

### "Session not alive" പിശക്

**പ്രശ്നം**: `acpManager.sendPrompt()` എന്നത് `Session ${sessionId} is not alive` പിശക് ഉയർത്തുന്നു

**പരിഹാരം**: സെഷൻ അവസാനിച്ചിരിക്കാം അല്ലെങ്കിൽ നിർത്തപ്പെട്ടിരിക്കാം. സെഷന്റെ നില പരിശോധിക്കുക:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // സെഷൻ വീണ്ടും സ്പോൺ ചെയ്യുക
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" പിശക്

**പ്രശ്നം**: `acpManager.sendPrompt()` എന്നത് `ACP timeout after 120000ms` പിശക് ഉയർത്തുന്നു

**പരിഹാരം**: ടൈംഔട്ട് വർധിപ്പിക്കുക:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 മിനിറ്റ്
```

### CLI കണ്ടെത്തിയില്ല

**പ്രശ്നം**: `detectInstalledAgents()` നിങ്ങളുടെ CLI കണ്ടെത്തുന്നില്ല

**പരിഹാരങ്ങൾ**:

1. **PATH പരിശോധിക്കുക**: CLI നിങ്ങളുടെ സിസ്റ്റം PATH-ൽ ഉണ്ടെന്ന് ഉറപ്പാക്കുക
2. **വേർഷൻ കമാൻഡ് പരിശോധിക്കുക**: `claude --version` മാനുവലായി പ്രവർത്തിപ്പിക്കുക
3. **അനുമതികൾ പരിശോധിക്കുക**: CLI എക്സിക്യൂട്ട് ചെയ്യാനാകുന്നതാണെന്ന് ഉറപ്പാക്കുക
4. **ഇഷ്ടാനുസൃത ഏജന്റ്**: നിലവാരമില്ലാത്ത CLI-കൾക്കായി ഒരു ഇഷ്ടാനുസൃത ഏജന്റ് നിർവചനം ചേർക്കുക

### അനുമതി നിരസിച്ചു

**പ്രശ്നം**: ACP-ക്ക് CLI എക്സിക്യൂട്ട് ചെയ്യാൻ കഴിയുന്നില്ല

**പരിഹാരങ്ങൾ**:

1. **ഫയൽ അനുമതികൾ പരിശോധിക്കുക**: `chmod +x /usr/local/bin/claude`
2. **ഉടമസ്ഥാവകാശം പരിശോധിക്കുക**: OmniRoute-ന് വായിക്കാനും എക്സിക്യൂട്ട് ചെയ്യാനുമുള്ള അനുമതികളുണ്ടെന്ന് ഉറപ്പാക്കുക
3. **SELinux/AppArmor പരിശോധിക്കുക**: ഇവ പ്രോസസ് സ്പോണിംഗ് തടഞ്ഞേക്കാം

---

## ഉദാഹരണങ്ങൾ

### ഉദാഹരണം 1: Claude Code ആരംഭിച്ച് ഉപയോഗിക്കുക

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// ഇൻസ്റ്റാൾ ചെയ്ത ഏജന്റുകളെ കണ്ടെത്തുക
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // ഒരു പുതിയ സെഷൻ ആരംഭിക്കുക
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ഒരു പ്രോംപ്റ്റ് അയയ്ക്കുക
  const response = await acpManager.sendPrompt(
    session.id,
    "100 വാക്കുകളിൽ ക്വാണ്ടം കമ്പ്യൂട്ടിംഗ് വിശദീകരിക്കുക"
  );

  console.log("Claude-ന്റെ പ്രതികരണം:", response);

  // വിഭവങ്ങൾ നീക്കം ചെയ്യുക
  acpManager.kill(session.id);
}
```

### ഉദാഹരണം 2: ഫാൾബാക്കോടുകൂടിയ സ്വയമേവയുള്ള കണ്ടെത്തൽ

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// ആദ്യം Claude പരീക്ഷിക്കുക, ലഭ്യമല്ലെങ്കിൽ Codex ഉപയോഗിക്കുക
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("ACP-അനുയോജ്യമായ CLI ഏജന്റൊന്നും കണ്ടെത്തിയില്ല");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "നമസ്കാരം!");

acpManager.kill(session.id);
```

### ഉദാഹരണം 3: ഇഷ്ടാനുസൃത ഏജന്റ്

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// ഒരു ഇഷ്ടാനുസൃത CLI ഏജന്റ് രജിസ്റ്റർ ചെയ്യുക
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

// ഇപ്പോൾ detectInstalledAgents() എന്നതിൽ "my-llm-cli" ഉൾപ്പെടും
const agents = detectInstalledAgents();
```

---

## അടുത്തത് എന്താണ്?

- **[API റഫറൻസ്](../reference/API_REFERENCE.md)** — REST API എൻഡ്പോയിന്റുകൾ
- **[പ്രൊവൈഡർ റഫറൻസ്](../reference/PROVIDER_REFERENCE.md)** — എല്ലാ 352 പ്രൊവൈഡറുകളും
- **[MCP സെർവർ](./MCP-SERVER.md)** — Model Context Protocol സംയോജനം
- **[A2A സെർവർ](./A2A-SERVER.md)** — Agent-to-Agent പ്രോട്ടോക്കോൾ
- **[ക്ലൗഡ് ഏജന്റ്](./CLOUD_AGENT.md)** — ക്ലൗഡ് അധിഷ്ഠിത ഏജന്റുകൾ

---

## റഫറൻസ്

- [AionUi പ്രോജക്റ്റ്](https://github.com/iOfficeAI/AionUi) — ACP സ്വയം കണ്ടെത്തലിനുള്ള പ്രചോദനം
- [ACP സോഴ്സ് കോഡ്](../../src/lib/acp/) — നടപ്പാക്കൽ വിശദാംശങ്ങൾ
  - `manager.ts` — പ്രോസസ് ലൈഫ്സൈക്കിൾ മാനേജ്മെന്റ്
  - `registry.ts` — ഏജന്റുകളെ കണ്ടെത്തലും രജിസ്ട്രേഷനും
  - `index.ts` — പൊതു API എക്സ്പോർട്ടുകൾ
