# ACP (Agent Client Protocol) (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **အကျဉ်းချုပ်**: ACP သည် HTTP API များကို အသုံးပြုမည့်အစား OmniRoute က CLI agent များ (Claude Code၊ Codex ကဲ့သို့) ကို child process များအဖြစ် စတင်နိုင်စေသည်။ ၎င်းက သင့်အား "CLI-as-backend" transport ကို ရရှိစေသည်။

---

## ACP ဆိုသည်မှာ အဘယ်နည်း?

ACP (Agent Client Protocol) သည် OmniRoute အတွက် **"CLI-as-backend" transport** တစ်ခုဖြစ်သည်။ AI provider များသို့ HTTP API ခေါ်ဆိုမှုများကို ကြားဖြတ်ဖမ်းယူမည့်အစား ACP သည် **CLI agent များကို child process များအဖြစ် စတင်ပြီး** ၎င်းတို့၏ မူရင်း interface မှတစ်ဆင့် prompt များကို ပေးပို့သည်။

### ACP ကို အဘယ်ကြောင့် အသုံးပြုသင့်သနည်း?

| အကျိုးကျေးဇူး                 | ဖော်ပြချက်                                                           |
| ----------------------------- | -------------------------------------------------------------------- |
| **API key မလိုအပ်ပါ**         | သင့်ရှိပြီးသား CLI authentication ကို အသုံးပြုသည်                    |
| **မူရင်း protocol**           | CLI တစ်ခုချင်းစီ၏ မူရင်း input/output format ကို အသုံးပြုသည်         |
| **အလိုအလျောက် ရှာဖွေခြင်း**   | သင့်စနစ်တွင် ထည့်သွင်းထားသော CLI များကို ရှာဖွေသတ်မှတ်သည်            |
| **အသင့်ပါဝင်သော agent 15 ခု** | လူသုံးများသော CLI tool များအတွက် ကြိုတင်စီစဉ်ထားသည်                  |
| **စိတ်ကြိုက် agent များ**     | settings မှတစ်ဆင့် သင့်ကိုယ်ပိုင် CLI tool များကို ထည့်သွင်းနိုင်သည် |
| **Process စီမံခန့်ခွဲမှု**    | lifecycle (စတင်ခြင်း၊ ပေးပို့ခြင်း၊ ရပ်တန့်ခြင်း) ကို ကိုင်တွယ်သည်   |

---

## ပံ့ပိုးထားသော CLI Agent များ

ACP တွင် **အသင့်ပါဝင်သော CLI agent 15 ခု** ကို တစ်ခါတည်း ပံ့ပိုးပေးထားသည်-

| Agent ID      | ပြသမည့်အမည်        | Binary        | Protocol |
| ------------- | ------------------ | ------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`      | Claude Code CLI    | `claude`      | stdio    |
| `goose`       | Goose CLI          | `goose`       | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio    |
| `aider`       | Aider              | `aider`       | stdio    |
| `opencode`    | OpenCode           | `opencode`    | stdio    |
| `cline`       | Cline              | `cline`       | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode          | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio    |
| `interpreter` | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio    |
| `warp`        | Warp AI            | `warp`        | stdio    |
| `gemini`      | Gemini CLI         | `gemini`      | stdio    |
| `zcode`       | ZCode              | `zcode`       | stdio    |

### စိတ်ကြိုက် Agent များ

settings မှတစ်ဆင့် သင့်ကိုယ်ပိုင် CLI agent များကို ထည့်သွင်းနိုင်သည်။ စိတ်ကြိုက် agent များသည် အသင့်ပါဝင်သော agent များနှင့် တူညီသည့် လုပ်ဆောင်ချက်များကို ပံ့ပိုးသည်။

---

## အမြန်စတင်ခြင်း

### အဆင့် 1: CLI Agent တစ်ခုကို ထည့်သွင်းပါ

```bash
# ဥပမာ- Claude Code CLI ကို ထည့်သွင်းပါ
npm install -g @anthropic-ai/claude-code

# ထည့်သွင်းမှုကို စစ်ဆေးပါ
claude --version
```

### အဆင့် 2: ACP အလိုအလျောက်ရှာဖွေခြင်း

ACP သည် သင့်စနစ်တွင် ထည့်သွင်းထားသော CLI agent များကို အလိုအလျောက် ရှာဖွေသတ်မှတ်သည်။ မည်သည့် configuration မျှ မလိုအပ်ပါ!

### အဆင့် 3: ACP Transport ကို အသုံးပြုပါ

ရှာဖွေတွေ့ရှိပြီးသည်နှင့် ACP ကို ပံ့ပိုးထားသည့် မည်သည့် provider အတွက်မဆို transport အဖြစ် အသုံးပြုနိုင်သည်။ CLI ရရှိနိုင်သည့်အခါ OmniRoute သည် ACP ကို အလိုအလျောက် အသုံးပြုမည်ဖြစ်သည်။

---

## ACP အလုပ်လုပ်ပုံ

### တည်ဆောက်ပုံ

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
│  stdin  ◄──────┤  prompt ပေးပို့ရန်
│  stdout ──────►│  response လက်ခံရန်
│  stderr ──────►│  error များ လက်ခံရန်
└─────────────────┘
```

### Process Lifecycle

1. **စတင်ခြင်း** — ACP သည် CLI agent အတွက် child process တစ်ခုကို ဖန်တီးစတင်သည်
2. **ပေးပို့ခြင်း** — ACP သည် prompt များကို process ၏ stdin သို့ ရေးသားပေးပို့သည်
3. **လက်ခံခြင်း** — ACP သည် stdout/stderr မှ response များကို ဖတ်ယူသည်
4. **အလုပ်မလုပ်မှုကို ရှာဖွေခြင်း** — response ပြည့်စုံသည်ဟု မသတ်မှတ်မီ ACP သည် လုပ်ဆောင်မှုမရှိသည့် အချိန် 2 စက္ကန့်ကို စောင့်ဆိုင်းသည်
5. **ရပ်တန့်ခြင်း** — ACP သည် process ကို ရပ်တန့်သည် (SIGTERM၊ ထို့နောက် 5s ကြာပြီးနောက် SIGKILL)

### ဆက်သွယ်ရေး Protocol

ACP သည် CLI agent များနှင့် ဆက်သွယ်ရန် **stdio** (စံ input/output) ကို အသုံးပြုသည်။ Protocol မှာ အောက်ပါအတိုင်းဖြစ်သည်-

1. **prompt ပေးပို့ခြင်း** — newline တစ်ခုဖြင့် stdin သို့ ရေးသားပေးပို့သည်
2. **response ကို စောင့်ဆိုင်းခြင်း** — output မရှိသည့် အချိန် 2s ရောက်သည်အထိ stdout မှ ဖတ်ယူသည်
3. **အချိန်ကုန်ဆုံးမှု** — မူလသတ်မှတ်ချက်အရ 120 စက္ကန့် (ပြင်ဆင်သတ်မှတ်နိုင်သည်)

---

## API အကိုးအကား

### Registry လုပ်ဆောင်ချက်များ

#### `detectInstalledAgents()`

စနစ်တွင် ထည့်သွင်းထားသည့် CLI agent အားလုံးကို ရှာဖွေစစ်ဆေးသည်။ ရလဒ်များကို 60 စက္ကန့်ကြာ cache လုပ်ထားသည်။

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// ပြန်ပေးသည်- CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ဥပမာ၊ "codex", "claude"
  name: string; // ပြသမည့်အမည်
  binary: string; // စတင်လုပ်ဆောင်မည့် binary အမည်
  versionCommand: string; // Version ရှာဖွေစစ်ဆေးရေး command
  version: string | null; // ရှာဖွေတွေ့ရှိသည့် version (ထည့်သွင်းမထားပါက null)
  installed: boolean; // Agent ကို ထည့်သွင်းထားခြင်းရှိမရှိ
  providerAlias: string; // OmniRoute ရှိ Provider ID
  spawnArgs: string[]; // စတင်လုပ်ဆောင်ရာတွင် ထည့်သွင်းပေးမည့် argument များ
  protocol: "stdio" | "http"; // ဆက်သွယ်ရေး protocol
  isCustom?: boolean; // ၎င်းသည် အသုံးပြုသူသတ်မှတ်ထားသော custom agent ဟုတ်မဟုတ်
}
```

#### `getAvailableAgents()`

ထည့်သွင်းထားပြီး ACP အတွက် အသုံးပြုနိုင်သည့် agent များကိုသာ ရယူသည်။

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// ပြန်ပေးသည်- CliAgentInfo[] (ထည့်သွင်းထားသော agent များသာ)
```

#### `getAgentById(id)`

ID ဖြင့် သတ်မှတ်ထားသော agent တစ်ခုကို ရယူသည်။

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// ပြန်ပေးသည်- CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

ဆက်တင်များမှ custom agent သတ်မှတ်ချက်များကို သတ်မှတ်ပေးသည်။

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

### Manager လုပ်ဆောင်ချက်များ

#### `acpManager.spawn(agentId, binary, args, env)`

CLI agent process အသစ်တစ်ခုကို စတင်လုပ်ဆောင်သည်။

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* စိတ်ကြိုက် environment variable များ */
});
// ပြန်ပေးသည်- AcpSession
```

**ခွင့်ပြုထားသော agent ID များ**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI agent တစ်ခုထံ prompt ပေးပို့ပြီး တုံ့ပြန်ချက်ကို စုစည်းရယူသည်။

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // အချိန်ကုန်ဆုံးကန့်သတ်ချက် 2 မိနစ်
);
// ပြန်ပေးသည်- Promise<string>
```

#### `acpManager.kill(sessionId)`

Session တစ်ခုကို ရပ်တန့်ပြီး ရှင်းလင်းသည်။

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// ပြန်ပေးသည်- boolean
```

#### `acpManager.getActiveSessions()`

လက်ရှိလုပ်ဆောင်နေသော session အားလုံးကို ရယူသည်။

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// ပြန်ပေးသည်- AcpSession[]
```

#### `acpManager.killAll()`

Session အားလုံးကို ရပ်တန့်သည်။

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Session Interface

```typescript
interface AcpSession {
  id: string; // သီးခြား session ID
  agentId: string; // Agent ID (ဥပမာ၊ "claude")
  process: ChildProcess; // Child process handle
  alive: boolean; // Process လုပ်ဆောင်နေခြင်းရှိမရှိ
  stdoutBuffer: string; // စုစည်းထားသော stdout buffer
  stderrBuffer: string; // စုစည်းထားသော stderr buffer
  createdAt: Date; // ဖန်တီးခဲ့သည့် timestamp
}
```

### Event များ

`AcpManager` သည် `EventEmitter` ကို တိုးချဲ့ထားပြီး အောက်ပါ event များကို ထုတ်လွှတ်သည်-

#### `stdout`

CLI agent က stdout သို့ ရေးသားသောအခါ ထုတ်လွှတ်သည်။

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI agent က stderr သို့ ရေးသားသောအခါ ထုတ်လွှတ်သည်။

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI agent process ရပ်တန့်ထွက်ခွာသောအခါ ထုတ်လွှတ်သည်။

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI agent process တွင် အမှားဖြစ်ပေါ်သောအခါ ထုတ်လွှတ်သည်။

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## ဖွဲ့စည်းသတ်မှတ်ခြင်း

### ပတ်ဝန်းကျင် ကိန်းရှင်များ

ACP သည် ပင်မ process မှ ပတ်ဝန်းကျင် ကိန်းရှင်အားလုံးကို ဆက်ခံပြီး စိတ်ကြိုက် env vars များဖြင့် တိုးချဲ့နိုင်သည်-

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Spawn အတွက် Argument များ

Agent တစ်ခုစီတွင် registry ထဲ၌ သတ်မှတ်ထားသည့် မူလ spawn argument များရှိသည်။ ၎င်းတို့ကို override လုပ်နိုင်သည်-

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### အချိန်ကုန်ဆုံးမှုများ

မူလ prompt timeout သည် **120 စက္ကန့်** (2 မိနစ်) ဖြစ်သည်။ Override လုပ်နိုင်သည်-

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 မိနစ်
```

### ရှာဖွေသိရှိမှု Cache

ကုန်ကျစရိတ်များသော filesystem scan များကို ရှောင်ရှားရန် Agent ရှာဖွေသိရှိမှုကို **60 စက္ကန့်** ကြာ cache လုပ်ထားသည်။ မဖြစ်မနေ refresh လုပ်ရန်-

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## လုံခြုံရေး

### Command Injection ကာကွယ်ခြင်း

ACP သည် command injection တိုက်ခိုက်မှုများကို ကာကွယ်ရန် version command များကို အတည်ပြုစစ်ဆေးသည်-

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

ဤအက္ခရာများ ပါဝင်သော version command များကို ငြင်းပယ်သည်-

- `;` — Command ခွဲခြားသည့်သင်္ကေတ
- `&` — နောက်ကွယ် process
- `|` — Pipe
- `<`, `>` — လမ်းကြောင်းလွှဲခြင်း
- `` ` `` — Command အစားထိုးခြင်း
- `$` — ကိန်းရှင် ဖြန့်ချဲ့ခြင်း
- `\r`, `\n` — စာကြောင်းဖြတ်ခြင်းများ

### Binary အမည် အတည်ပြုစစ်ဆေးခြင်း

ACP သည် version command ၏ binary အမည်က မျှော်လင့်ထားသော binary အမည်နှင့် ကိုက်ညီကြောင်း အတည်ပြုစစ်ဆေးသည် (စိတ်ကြိုက် agent ဖြစ်လျှင် မစစ်ဆေးပါ)။

### Process သီးခြားခွဲထားခြင်း

ACP session တစ်ခုစီသည် ၎င်း၏ကိုယ်ပိုင် child process ထဲတွင် အလုပ်လုပ်သည်။ Session ပြီးဆုံးသည့်အခါ သို့မဟုတ် timeout ဖြစ်သည့်အခါ process ကို ရပ်တန့်သည်။

---

## စွမ်းဆောင်ရည်

### ရှာဖွေသိရှိမှု စွမ်းဆောင်ရည်

- **ပထမဆုံးခေါ်ဆိုမှု**: ~50-200ms (agent တစ်ခုစီအတွက် `version` command ကို လုပ်ဆောင်သည်)
- **Cache လုပ်ထားသော ခေါ်ဆိုမှုများ**: <1ms (cache မှ ပြန်ပေးသည်)
- **Cache TTL**: 60 စက္ကန့်

### Prompt စွမ်းဆောင်ရည်

- **Spawn**: ~50-100ms
- **Prompt ပို့ခြင်း**: ~10-50ms
- **တုံ့ပြန်မှုကို စောင့်ဆိုင်းခြင်း**: CLI agent ပေါ်တွင် မူတည်သည် (ပုံမှန်အားဖြင့် 1-30 စက္ကန့်)
- **ရပ်တန့်ခြင်း**: ~5 စက္ကန့် (SIGTERM) + ချက်ချင်း (SIGKILL)

### Resource အသုံးပြုမှု

- **Session တစ်ခုလျှင် Memory**: ~10-50MB (CLI agent ပေါ်တွင် မူတည်သည်)
- **CPU**: အနည်းဆုံး (I/O ပေါ် မူတည်သည်)
- **Disk**: မရှိပါ

---

## ပြဿနာဖြေရှင်းခြင်း

### "Unknown agent" အမှား

**ပြဿနာ**: `acpManager.spawn()` က `Unknown agent: <id>` ကို throw လုပ်သည်

**ဖြေရှင်းနည်း**: `spawn()` တွင် အောက်ပါ agent များကိုသာ ခွင့်ပြုသည်-

- `claude`
- `codex`
- `gemini`
- `qwen`

အခြား agent များကို ကိုယ်တိုင် သို့မဟုတ် စိတ်ကြိုက် agent သတ်မှတ်ချက်များမှတစ်ဆင့် spawn လုပ်ရမည်။

### "Session not alive" အမှား

**ပြဿနာ**: `acpManager.sendPrompt()` က `Session ${sessionId} is not alive` ကို throw လုပ်သည်

**ဖြေရှင်းနည်း**: Session သည် ရပ်သွားပြီးဖြစ်နိုင်သည် သို့မဟုတ် ရပ်တန့်ခံထားရနိုင်သည်။ Session အခြေအနေကို စစ်ဆေးပါ-

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Session ကို ပြန်လည် spawn လုပ်ပါ
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" အမှား

**ပြဿနာ**: `acpManager.sendPrompt()` က `ACP timeout after 120000ms` ကို throw လုပ်သည်

**ဖြေရှင်းနည်း**: Timeout ကို တိုးမြှင့်ပါ-

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 မိနစ်
```

### CLI ကို ရှာမတွေ့ခြင်း

**ပြဿနာ**: `detectInstalledAgents()` က သင့် CLI ကို ရှာမတွေ့ပါ

**ဖြေရှင်းနည်းများ**:

1. **PATH ကို စစ်ဆေးပါ**: CLI သည် သင့် system PATH ထဲတွင် ရှိကြောင်း သေချာစေပါ
2. **Version command ကို စစ်ဆေးပါ**: `claude --version` ကို ကိုယ်တိုင် လုပ်ဆောင်ပါ
3. **ခွင့်ပြုချက်များကို စစ်ဆေးပါ**: CLI ကို execute လုပ်နိုင်ကြောင်း သေချာစေပါ
4. **စိတ်ကြိုက် agent**: စံသတ်မှတ်ချက်နှင့် မကိုက်ညီသော CLI များအတွက် စိတ်ကြိုက် agent သတ်မှတ်ချက်တစ်ခု ထည့်ပါ

### ခွင့်ပြုချက် ငြင်းပယ်ခံရခြင်း

**ပြဿနာ**: ACP သည် CLI ကို execute မလုပ်နိုင်ပါ

**ဖြေရှင်းနည်းများ**:

1. **ဖိုင်ခွင့်ပြုချက်များကို စစ်ဆေးပါ**: `chmod +x /usr/local/bin/claude`
2. **ပိုင်ဆိုင်မှုကို စစ်ဆေးပါ**: OmniRoute တွင် ဖတ်ရှု/လုပ်ဆောင်ခွင့်များ ရှိကြောင်း သေချာစေပါ
3. **SELinux/AppArmor ကို စစ်ဆေးပါ**: Process spawn လုပ်ခြင်းကို ပိတ်ဆို့ထားနိုင်သည်

---

## ဥပမာများ

### ဥပမာ 1: Claude Code ကို စတင်ပြီး အသုံးပြုခြင်း

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// ထည့်သွင်းထားသော agent များကို ရှာဖွေပါ
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // session အသစ်တစ်ခုကို စတင်ပါ
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // prompt တစ်ခု ပို့ပါ
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // ရှင်းလင်းပါ
  acpManager.kill(session.id);
}
```

### ဥပမာ 2: အရန်နည်းလမ်းပါသော အလိုအလျောက်ရှာဖွေခြင်း

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Claude ကို ဦးစွာ စမ်းသပ်ပြီး မရပါက Codex ကို အသုံးပြုပါ
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

### ဥပမာ 3: စိတ်ကြိုက် Agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// စိတ်ကြိုက် CLI agent တစ်ခုကို မှတ်ပုံတင်ပါ
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

// ယခု detectInstalledAgents() တွင် "my-llm-cli" ပါဝင်လာပါမည်
const agents = detectInstalledAgents();
```

---

## နောက်တစ်ဆင့်မှာ ဘာရှိသလဲ?

- **[API ကိုးကားချက်](../reference/API_REFERENCE.md)** — REST API endpoint များ
- **[Provider ကိုးကားချက်](../reference/PROVIDER_REFERENCE.md)** — Provider 352 ခုလုံး
- **[MCP Server](./MCP-SERVER.md)** — Model Context Protocol ပေါင်းစပ်အသုံးပြုမှု
- **[A2A Server](./A2A-SERVER.md)** — Agent-to-Agent protocol
- **[Cloud Agent](./CLOUD_AGENT.md)** — Cloud အခြေပြု agent များ

---

## ကိုးကားချက်

- [AionUi Project](https://github.com/iOfficeAI/AionUi) — ACP အလိုအလျောက်ရှာဖွေခြင်းအတွက် စိတ်ကူးရင်းမြစ်
- [ACP Source Code](../../src/lib/acp/) — အကောင်အထည်ဖော်မှု အသေးစိတ်များ
  - `manager.ts` — Process lifecycle စီမံခန့်ခွဲမှု
  - `registry.ts` — Agent ရှာဖွေခြင်းနှင့် မှတ်ပုံတင်ခြင်း
  - `index.ts` — အများသုံး API export များ
