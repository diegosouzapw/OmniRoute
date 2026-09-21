# ACP (Agent Client Protocol) (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **សង្ខេបខ្លី**: ACP អនុញ្ញាតឱ្យ OmniRoute បង្កើត agent CLI (ដូចជា Claude Code, Codex) ជា child process ជំនួសឱ្យការប្រើ HTTP API។ វាផ្តល់ឱ្យអ្នកនូវការបញ្ជូនទិន្នន័យបែប "CLI-as-backend"។

---

## តើ ACP ជាអ្វី?

ACP (Agent Client Protocol) គឺជាការបញ្ជូនទិន្នន័យបែប **"CLI-as-backend"** សម្រាប់ OmniRoute។ ជំនួសឱ្យការស្ទាក់ចាប់ការហៅ HTTP API ទៅកាន់អ្នកផ្តល់សេវា AI, ACP **បង្កើត agent CLI ជា child process** និងបញ្ជូន prompt តាមរយៈ interface ដើមរបស់ពួកវា។

### ហេតុអ្វីគួរប្រើ ACP?

| អត្ថប្រយោជន៍                 | ការពិពណ៌នា                                         |
| ---------------------------- | -------------------------------------------------- |
| **មិនត្រូវការ API key**      | ប្រើការផ្ទៀងផ្ទាត់ CLI ដែលមានស្រាប់របស់អ្នក        |
| **ពិធីការដើម**               | ប្រើទម្រង់ input/output ដើមរបស់ CLI នីមួយៗ         |
| **ការរកឃើញដោយស្វ័យប្រវត្តិ** | រកឃើញ CLI ដែលបានដំឡើងនៅលើប្រព័ន្ធរបស់អ្នក          |
| **agent ស្រាប់ចំនួន 15**     | បានកំណត់រចនាសម្ព័ន្ធជាមុនសម្រាប់ឧបករណ៍ CLI ពេញនិយម |
| **agent ផ្ទាល់ខ្លួន**        | បន្ថែមឧបករណ៍ CLI ផ្ទាល់ខ្លួនរបស់អ្នកតាមរយៈការកំណត់ |
| **ការគ្រប់គ្រង process**     | គ្រប់គ្រងវដ្តជីវិត (បង្កើត ផ្ញើ បញ្ចប់)            |

---

## Agent CLI ដែលគាំទ្រ

ACP គាំទ្រ **agent CLI ស្រាប់ចំនួន 15** ដែលអាចប្រើបានភ្លាមៗ៖

| ID របស់ agent | ឈ្មោះបង្ហាញ        | Binary        | ពិធីការ |
| ------------- | ------------------ | ------------- | ------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio   |
| `claude`      | Claude Code CLI    | `claude`      | stdio   |
| `goose`       | Goose CLI          | `goose`       | stdio   |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio   |
| `aider`       | Aider              | `aider`       | stdio   |
| `opencode`    | OpenCode           | `opencode`    | stdio   |
| `cline`       | Cline              | `cline`       | stdio   |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio   |
| `forge`       | ForgeCode          | `forge`       | stdio   |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio   |
| `interpreter` | Open Interpreter   | `interpreter` | stdio   |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio   |
| `warp`        | Warp AI            | `warp`        | stdio   |
| `gemini`      | Gemini CLI         | `gemini`      | stdio   |
| `zcode`       | ZCode              | `zcode`       | stdio   |

### Agent ផ្ទាល់ខ្លួន

អ្នកអាចបន្ថែម agent CLI ផ្ទាល់ខ្លួនរបស់អ្នកតាមរយៈការកំណត់។ Agent ផ្ទាល់ខ្លួនគាំទ្រមុខងារដូចគ្នានឹង agent ដែលមានស្រាប់។

---

## ចាប់ផ្តើមរហ័ស

### ជំហានទី 1៖ ដំឡើង Agent CLI

```bash
# ឧទាហរណ៍៖ ដំឡើង Claude Code CLI
npm install -g @anthropic-ai/claude-code

# ផ្ទៀងផ្ទាត់ការដំឡើង
claude --version
```

### ជំហានទី 2៖ ការរកឃើញដោយស្វ័យប្រវត្តិរបស់ ACP

ACP រកឃើញ agent CLI ដែលបានដំឡើងនៅលើប្រព័ន្ធរបស់អ្នកដោយស្វ័យប្រវត្តិ។ មិនចាំបាច់កំណត់រចនាសម្ព័ន្ធទេ!

### ជំហានទី 3៖ ប្រើការបញ្ជូនទិន្នន័យ ACP

នៅពេលរកឃើញហើយ ACP អាចត្រូវបានប្រើជាការបញ្ជូនទិន្នន័យសម្រាប់អ្នកផ្តល់សេវាណាមួយដែលគាំទ្រ។ OmniRoute នឹងប្រើ ACP ដោយស្វ័យប្រវត្តិនៅពេលមាន CLI។

---

## របៀបដំណើរការរបស់ ACP

### ស្ថាបត្យកម្ម

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
│  (Agent CLI)    │
│                 │
│  stdin  ◄──────┤  ផ្ញើ prompt
│  stdout ──────►│  ទទួល response
│  stderr ──────►│  ទទួល error
└─────────────────┘
```

### វដ្តជីវិតរបស់ Process

1. **បង្កើត** — ACP បង្កើត child process សម្រាប់ agent CLI
2. **ផ្ញើ** — ACP សរសេរ prompt ទៅកាន់ stdin របស់ process
3. **ទទួល** — ACP អាន response ពី stdout/stderr
4. **ការរកឃើញភាពអសកម្ម** — ACP រង់ចាំភាពអសកម្មរយៈពេល 2 វិនាទី មុននឹងចាត់ទុកថា response បានបញ្ចប់
5. **បញ្ចប់** — ACP បិទ process (SIGTERM បន្ទាប់មក SIGKILL ក្រោយរយៈពេល 5 វិនាទី)

### ពិធីការទំនាក់ទំនង

ACP ប្រើ **stdio** (standard input/output) សម្រាប់ទំនាក់ទំនងជាមួយ agent CLI។ ពិធីការនេះគឺ៖

1. **ផ្ញើ prompt** — សរសេរទៅកាន់ stdin ដោយមានបន្ទាត់ថ្មី
2. **រង់ចាំ response** — អានពី stdout រហូតដល់អសកម្ម (គ្មាន output រយៈពេល 2 វិនាទី)
3. **Timeout** — លំនាំដើម 120 វិនាទី (អាចកំណត់បាន)

---

## ឯកសារយោង API

### អនុគមន៍ Registry

#### `detectInstalledAgents()`

រកឃើញភ្នាក់ងារ CLI ទាំងអស់ដែលបានដំឡើងនៅលើប្រព័ន្ធ។ លទ្ធផលត្រូវបានរក្សាទុកក្នុងឃ្លាំងសម្ងាត់រយៈពេល 60 វិនាទី។

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// ត្រឡប់៖ CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ឧ. "codex", "claude"
  name: string; // ឈ្មោះបង្ហាញ
  binary: string; // ឈ្មោះ binary ដែលត្រូវចាប់ផ្ដើម
  versionCommand: string; // ពាក្យបញ្ជាសម្រាប់រកឃើញកំណែ
  version: string | null; // កំណែដែលបានរកឃើញ (null ប្រសិនបើមិនបានដំឡើង)
  installed: boolean; // ថាតើភ្នាក់ងារត្រូវបានដំឡើងឬអត់
  providerAlias: string; // ID របស់អ្នកផ្ដល់សេវានៅក្នុង OmniRoute
  spawnArgs: string[]; // អាគុយម៉ង់ដែលត្រូវបញ្ជូននៅពេលចាប់ផ្ដើម
  protocol: "stdio" | "http"; // ពិធីការទំនាក់ទំនង
  isCustom?: boolean; // ថាតើនេះជាភ្នាក់ងារផ្ទាល់ខ្លួនដែលកំណត់ដោយអ្នកប្រើប្រាស់ឬអត់
}
```

#### `getAvailableAgents()`

ទទួលយកតែភ្នាក់ងារដែលបានដំឡើង និងអាចប្រើបានសម្រាប់ ACP ប៉ុណ្ណោះ។

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// ត្រឡប់៖ CliAgentInfo[] (តែភ្នាក់ងារដែលបានដំឡើងប៉ុណ្ណោះ)
```

#### `getAgentById(id)`

ទទួលយកភ្នាក់ងារជាក់លាក់មួយតាម ID។

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// ត្រឡប់៖ CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

កំណត់និយមន័យភ្នាក់ងារផ្ទាល់ខ្លួនពីការកំណត់។

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

### អនុគមន៍ Manager

#### `acpManager.spawn(agentId, binary, args, env)`

ចាប់ផ្ដើមដំណើរការភ្នាក់ងារ CLI ថ្មីមួយ។

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* អថេរបរិស្ថានផ្ទាល់ខ្លួន */
});
// ត្រឡប់៖ AcpSession
```

**ID ភ្នាក់ងារដែលបានអនុញ្ញាត**៖ `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

ផ្ញើ prompt ទៅភ្នាក់ងារ CLI និងប្រមូលការឆ្លើយតប។

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // អស់ពេលរង់ចាំបន្ទាប់ពី 2 នាទី
);
// ត្រឡប់៖ Promise<string>
```

#### `acpManager.kill(sessionId)`

បញ្ឈប់សម័យ និងសម្អាតធនធាន។

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// ត្រឡប់៖ boolean
```

#### `acpManager.getActiveSessions()`

ទទួលយកសម័យសកម្មទាំងអស់។

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// ត្រឡប់៖ AcpSession[]
```

#### `acpManager.killAll()`

បញ្ឈប់សម័យទាំងអស់។

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interface របស់សម័យ

```typescript
interface AcpSession {
  id: string; // ID តែមួយគត់របស់សម័យ
  agentId: string; // ID របស់ភ្នាក់ងារ (ឧ. "claude")
  process: ChildProcess; // ឧបករណ៍យោងទៅកាន់ដំណើរការរង
  alive: boolean; // ថាតើដំណើរការនៅកំពុងដំណើរការឬអត់
  stdoutBuffer: string; // ឃ្លាំងបណ្ដោះអាសន្ន stdout ដែលបានប្រមូលផ្ដុំ
  stderrBuffer: string; // ឃ្លាំងបណ្ដោះអាសន្ន stderr ដែលបានប្រមូលផ្ដុំ
  createdAt: Date; // ត្រាពេលវេលាដែលបានបង្កើត
}
```

### ព្រឹត្តិការណ៍

`AcpManager` ពង្រីកពី `EventEmitter` និងបញ្ចេញព្រឹត្តិការណ៍ខាងក្រោម៖

#### `stdout`

ត្រូវបានបញ្ចេញនៅពេលភ្នាក់ងារ CLI សរសេរទៅកាន់ stdout។

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

ត្រូវបានបញ្ចេញនៅពេលភ្នាក់ងារ CLI សរសេរទៅកាន់ stderr។

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

ត្រូវបានបញ្ចេញនៅពេលដំណើរការភ្នាក់ងារ CLI បិទ។

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

ត្រូវបានបញ្ចេញនៅពេលដំណើរការភ្នាក់ងារ CLI មានកំហុស។

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## ការកំណត់រចនាសម្ព័ន្ធ

### អថេរបរិស្ថាន

ACP ទទួលមរតកអថេរបរិស្ថានទាំងអស់ពីដំណើរការមេ ហើយអាចត្រូវបានពង្រីកដោយប្រើអថេរបរិស្ថានផ្ទាល់ខ្លួន៖

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### អាគុយម៉ង់សម្រាប់បង្កើតដំណើរការ

ភ្នាក់ងារនីមួយៗមានអាគុយម៉ង់លំនាំដើមសម្រាប់បង្កើតដំណើរការ ដែលបានកំណត់ក្នុងបញ្ជីចុះឈ្មោះ។ អ្នកអាចកំណត់ជំនួសពួកវាបាន៖

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### ពេលវេលាកំណត់

ពេលវេលាកំណត់លំនាំដើមសម្រាប់ប្រូមគឺ **120 វិនាទី** (2 នាទី)។ អ្នកអាចកំណត់ជំនួសបាន៖

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 នាទី
```

### ឃ្លាំងសម្ងាត់សម្រាប់ការរកឃើញ

ការរកឃើញភ្នាក់ងារត្រូវបានរក្សាទុកក្នុងឃ្លាំងសម្ងាត់រយៈពេល **60 វិនាទី** ដើម្បីជៀសវាងការស្កេនប្រព័ន្ធឯកសារដែលចំណាយធនធានច្រើន។ ដើម្បីបង្ខំឱ្យផ្ទុកឡើងវិញ៖

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## សុវត្ថិភាព

### ការទប់ស្កាត់ការបញ្ចូលពាក្យបញ្ជា

ACP ផ្ទៀងផ្ទាត់ពាក្យបញ្ជាកំណែ ដើម្បីទប់ស្កាត់ការវាយប្រហារដោយបញ្ចូលពាក្យបញ្ជា៖

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

ពាក្យបញ្ជាកំណែដែលមានតួអក្សរទាំងនេះនឹងត្រូវបានបដិសេធ៖

- `;` — សញ្ញាបំបែកពាក្យបញ្ជា
- `&` — ដំណើរការផ្ទៃខាងក្រោយ
- `|` — បំពង់បញ្ជូនទិន្នន័យ
- `<`, `>` — ការប្ដូរទិស
- `` ` `` — ការជំនួសពាក្យបញ្ជា
- `$` — ការពង្រីកអថេរ
- `\r`, `\n` — ការចុះបន្ទាត់

### ការផ្ទៀងផ្ទាត់ឈ្មោះឯកសារប្រតិបត្តិ

ACP ផ្ទៀងផ្ទាត់ថា ឯកសារប្រតិបត្តិរបស់ពាក្យបញ្ជាកំណែត្រូវគ្នានឹងឈ្មោះឯកសារប្រតិបត្តិដែលរំពឹងទុក (លើកលែងតែវាជាភ្នាក់ងារផ្ទាល់ខ្លួន)។

### ការញែកដំណើរការ

សម័យ ACP នីមួយៗដំណើរការក្នុងដំណើរការកូនផ្ទាល់ខ្លួន។ ដំណើរការនឹងត្រូវបានបញ្ឈប់ នៅពេលសម័យបញ្ចប់ ឬផុតពេលកំណត់។

---

## ប្រសិទ្ធភាព

### ប្រសិទ្ធភាពនៃការរកឃើញ

- **ការហៅលើកដំបូង**៖ ~50-200ms (ដំណើរការពាក្យបញ្ជា `version` សម្រាប់ភ្នាក់ងារនីមួយៗ)
- **ការហៅពីឃ្លាំងសម្ងាត់**៖ <1ms (ត្រឡប់លទ្ធផលពីឃ្លាំងសម្ងាត់)
- **រយៈពេលមានសុពលភាពរបស់ឃ្លាំងសម្ងាត់**៖ 60 វិនាទី

### ប្រសិទ្ធភាពនៃប្រូម

- **ការបង្កើតដំណើរការ**៖ ~50-100ms
- **ការផ្ញើប្រូម**៖ ~10-50ms
- **ការរង់ចាំចម្លើយ**៖ អាស្រ័យលើភ្នាក់ងារ CLI (ជាធម្មតា 1-30 វិនាទី)
- **ការបញ្ឈប់**៖ ~5 វិនាទី (SIGTERM) + ភ្លាមៗ (SIGKILL)

### ការប្រើប្រាស់ធនធាន

- **អង្គចងចាំក្នុងមួយសម័យ**៖ ~10-50MB (អាស្រ័យលើភ្នាក់ងារ CLI)
- **CPU**៖ តិចតួចបំផុត (ផ្អែកលើ I/O)
- **ថាស**៖ គ្មាន

---

## ការដោះស្រាយបញ្ហា

### កំហុស "Unknown agent"

**បញ្ហា**៖ `acpManager.spawn()` បោះកំហុស `Unknown agent: <id>`

**ដំណោះស្រាយ**៖ មានតែភ្នាក់ងារទាំងនេះប៉ុណ្ណោះដែលត្រូវបានអនុញ្ញាតក្នុង `spawn()`៖

- `claude`
- `codex`
- `gemini`
- `qwen`

ភ្នាក់ងារផ្សេងទៀតត្រូវតែបង្កើតដំណើរការដោយដៃ ឬតាមរយៈនិយមន័យភ្នាក់ងារផ្ទាល់ខ្លួន។

### កំហុស "Session not alive"

**បញ្ហា**៖ `acpManager.sendPrompt()` បោះកំហុស `Session ${sessionId} is not alive`

**ដំណោះស្រាយ**៖ សម័យអាចបានបិទ ឬត្រូវបានបញ្ឈប់។ ពិនិត្យស្ថានភាពសម័យ៖

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // បង្កើតដំណើរការសម័យឡើងវិញ
  acpManager.spawn("claude", "claude", [], {});
}
```

### កំហុស "ACP timeout"

**បញ្ហា**៖ `acpManager.sendPrompt()` បោះកំហុស `ACP timeout after 120000ms`

**ដំណោះស្រាយ**៖ បង្កើនពេលវេលាកំណត់៖

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 នាទី
```

### រកមិនឃើញ CLI

**បញ្ហា**៖ `detectInstalledAgents()` រកមិនឃើញ CLI របស់អ្នក

**ដំណោះស្រាយ**៖

1. **ពិនិត្យ PATH**៖ ត្រូវប្រាកដថា CLI ស្ថិតនៅក្នុង PATH របស់ប្រព័ន្ធអ្នក
2. **ពិនិត្យពាក្យបញ្ជាកំណែ**៖ ដំណើរការ `claude --version` ដោយដៃ
3. **ពិនិត្យសិទ្ធិ**៖ ត្រូវប្រាកដថា CLI អាចប្រតិបត្តិបាន
4. **ភ្នាក់ងារផ្ទាល់ខ្លួន**៖ បន្ថែមនិយមន័យភ្នាក់ងារផ្ទាល់ខ្លួនសម្រាប់ CLI ដែលមិនមែនជាស្តង់ដារ

### សិទ្ធិត្រូវបានបដិសេធ

**បញ្ហា**៖ ACP មិនអាចប្រតិបត្តិ CLI បាន

**ដំណោះស្រាយ**៖

1. **ពិនិត្យសិទ្ធិឯកសារ**៖ `chmod +x /usr/local/bin/claude`
2. **ពិនិត្យភាពជាម្ចាស់**៖ ត្រូវប្រាកដថា OmniRoute មានសិទ្ធិអាន/ប្រតិបត្តិ
3. **ពិនិត្យ SELinux/AppArmor**៖ អាចរារាំងការបង្កើតដំណើរការ

---

## ឧទាហរណ៍

### ឧទាហរណ៍ទី 1៖ បើកដំណើរការ និងប្រើ Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// រកឃើញភ្នាក់ងារដែលបានដំឡើង
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // បើកដំណើរការសម័យថ្មី
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ផ្ញើប្រអប់បញ្ចូល
  const response = await acpManager.sendPrompt(
    session.id,
    "ពន្យល់អំពីកុំព្យូទ័រកង់ទិចជា 100 ពាក្យ"
  );

  console.log("ការឆ្លើយតបរបស់ Claude៖", response);

  // សម្អាត
  acpManager.kill(session.id);
}
```

### ឧទាហរណ៍ទី 2៖ ការរកឃើញដោយស្វ័យប្រវត្តិជាមួយជម្រើសបម្រុង

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// សាកល្បង Claude ជាមុន ហើយប្រើ Codex ជាជម្រើសបម្រុង
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("រកមិនឃើញភ្នាក់ងារ CLI ដែលត្រូវគ្នាជាមួយ ACP");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "សួស្តី!");

acpManager.kill(session.id);
```

### ឧទាហរណ៍ទី 3៖ ភ្នាក់ងារផ្ទាល់ខ្លួន

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// ចុះឈ្មោះភ្នាក់ងារ CLI ផ្ទាល់ខ្លួន
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

// ឥឡូវនេះ detectInstalledAgents() នឹងរួមបញ្ចូល "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## បន្ទាប់ទៀតជាអ្វី?

- **[ឯកសារយោង API](../reference/API_REFERENCE.md)** — ចំណុចចុង REST API
- **[ឯកសារយោងអ្នកផ្តល់សេវា](../reference/PROVIDER_REFERENCE.md)** — អ្នកផ្តល់សេវាទាំង 352
- **[ម៉ាស៊ីនមេ MCP](./MCP-SERVER.md)** — ការរួមបញ្ចូល Model Context Protocol
- **[ម៉ាស៊ីនមេ A2A](./A2A-SERVER.md)** — ពិធីការពីភ្នាក់ងារទៅភ្នាក់ងារ
- **[ភ្នាក់ងារក្លោដ](./CLOUD_AGENT.md)** — ភ្នាក់ងារដែលដំណើរការលើក្លោដ

---

## ឯកសារយោង

- [គម្រោង AionUi](https://github.com/iOfficeAI/AionUi) — ប្រភពបំផុសគំនិតសម្រាប់ការរកឃើញ ACP ដោយស្វ័យប្រវត្តិ
- [កូដប្រភព ACP](../../src/lib/acp/) — សេចក្ដីលម្អិតអំពីការអនុវត្ត
  - `manager.ts` — ការគ្រប់គ្រងវដ្តជីវិតរបស់ដំណើរការ
  - `registry.ts` — ការរកឃើញ និងការចុះឈ្មោះភ្នាក់ងារ
  - `index.ts` — ការនាំចេញ API សាធារណៈ
