# ACP (Agent Client Protocol) (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **সংক্ষেপে**: ACP, OmniRoute-কে HTTP API ব্যবহারের পরিবর্তে CLI এজেন্টগুলোকে (যেমন Claude Code, Codex) চাইল্ড প্রসেস হিসেবে চালু করতে দেয়। এটি আপনাকে "CLI-as-backend" ট্রান্সপোর্ট প্রদান করে।

---

## ACP কী?

ACP (Agent Client Protocol) হলো OmniRoute-এর জন্য একটি **"CLI-as-backend" ট্রান্সপোর্ট**। AI প্রদানকারীদের HTTP API কল ইন্টারসেপ্ট করার পরিবর্তে, ACP **CLI এজেন্টগুলোকে চাইল্ড প্রসেস হিসেবে চালু করে** এবং তাদের নিজস্ব ইন্টারফেসের মাধ্যমে প্রম্পট পাঠায়।

### কেন ACP ব্যবহার করবেন?

| সুবিধা                     | বিবরণ                                                  |
| -------------------------- | ------------------------------------------------------ |
| **API কী প্রয়োজন নেই**    | আপনার বিদ্যমান CLI প্রমাণীকরণ ব্যবহার করে              |
| **নিজস্ব প্রোটোকল**        | প্রতিটি CLI-এর নিজস্ব ইনপুট/আউটপুট ফরম্যাট ব্যবহার করে |
| **স্বয়ংক্রিয় শনাক্তকরণ** | আপনার সিস্টেমে ইনস্টল করা CLI শনাক্ত করে               |
| **15টি বিল্ট-ইন এজেন্ট**   | জনপ্রিয় CLI টুলের জন্য আগে থেকেই কনফিগার করা          |
| **কাস্টম এজেন্ট**          | সেটিংসের মাধ্যমে আপনার নিজস্ব CLI টুল যোগ করুন         |
| **প্রসেস ব্যবস্থাপনা**     | লাইফসাইকেল পরিচালনা করে (চালু, পাঠানো, বন্ধ করা)       |

---

## সমর্থিত CLI এজেন্ট

ACP শুরু থেকেই **15টি বিল্ট-ইন CLI এজেন্ট** সমর্থন করে:

| এজেন্ট ID     | প্রদর্শিত নাম      | বাইনারি       | প্রোটোকল |
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

### কাস্টম এজেন্ট

আপনি সেটিংসের মাধ্যমে আপনার নিজস্ব CLI এজেন্ট যোগ করতে পারেন। কাস্টম এজেন্টগুলো বিল্ট-ইন এজেন্টের মতো একই বৈশিষ্ট্য সমর্থন করে।

---

## দ্রুত শুরু

### ধাপ 1: একটি CLI এজেন্ট ইনস্টল করুন

```bash
# উদাহরণ: Claude Code CLI ইনস্টল করুন
npm install -g @anthropic-ai/claude-code

# ইনস্টলেশন যাচাই করুন
claude --version
```

### ধাপ 2: ACP-এর স্বয়ংক্রিয় শনাক্তকরণ

ACP স্বয়ংক্রিয়ভাবে আপনার সিস্টেমে ইনস্টল করা CLI এজেন্ট শনাক্ত করে। কোনো কনফিগারেশন প্রয়োজন নেই!

### ধাপ 3: ACP ট্রান্সপোর্ট ব্যবহার করুন

শনাক্ত হওয়ার পর, সমর্থিত যেকোনো প্রদানকারীর জন্য ACP-কে ট্রান্সপোর্ট হিসেবে ব্যবহার করা যাবে। CLI উপলভ্য থাকলে OmniRoute স্বয়ংক্রিয়ভাবে ACP ব্যবহার করবে।

---

## ACP যেভাবে কাজ করে

### আর্কিটেকচার

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP প্রক্সি)  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  চাইল্ড প্রসেস   │
│  (CLI এজেন্ট)    │
│                 │
│  stdin  ◄──────┤  প্রম্পট পাঠান
│  stdout ──────►│  প্রতিক্রিয়া গ্রহণ করুন
│  stderr ──────►│  ত্রুটি গ্রহণ করুন
└─────────────────┘
```

### প্রসেস লাইফসাইকেল

1. **চালু করা** — ACP, CLI এজেন্টের জন্য একটি চাইল্ড প্রসেস তৈরি করে
2. **পাঠানো** — ACP প্রসেসটির stdin-এ প্রম্পট লেখে
3. **গ্রহণ করা** — ACP stdout/stderr থেকে প্রতিক্রিয়া পড়ে
4. **নিষ্ক্রিয়তা শনাক্তকরণ** — প্রতিক্রিয়াটি সম্পূর্ণ হয়েছে বলে বিবেচনা করার আগে ACP 2 সেকেন্ডের নিষ্ক্রিয়তার জন্য অপেক্ষা করে
5. **বন্ধ করা** — ACP প্রসেসটি বন্ধ করে (SIGTERM, এরপর 5s পরে SIGKILL)

### যোগাযোগ প্রোটোকল

CLI এজেন্টগুলোর সঙ্গে যোগাযোগের জন্য ACP **stdio** (স্ট্যান্ডার্ড ইনপুট/আউটপুট) ব্যবহার করে। প্রোটোকলটি হলো:

1. **প্রম্পট পাঠানো** — একটি নতুন লাইনসহ stdin-এ লিখুন
2. **প্রতিক্রিয়ার জন্য অপেক্ষা করা** — নিষ্ক্রিয় হওয়া পর্যন্ত stdout থেকে পড়ুন (2s কোনো আউটপুট না থাকা)
3. **টাইমআউট** — ডিফল্টভাবে 120 সেকেন্ড (কনফিগারযোগ্য)

---

## API রেফারেন্স

### রেজিস্ট্রি ফাংশনসমূহ

#### `detectInstalledAgents()`

সিস্টেমে ইনস্টল করা সব CLI এজেন্ট শনাক্ত করে। ফলাফল 60 সেকেন্ডের জন্য ক্যাশ করা হয়।

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// রিটার্ন করে: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // যেমন, "codex", "claude"
  name: string; // প্রদর্শনের নাম
  binary: string; // চালু করার জন্য বাইনারির নাম
  versionCommand: string; // সংস্করণ শনাক্তকরণের কমান্ড
  version: string | null; // শনাক্ত করা সংস্করণ (ইনস্টল করা না থাকলে null)
  installed: boolean; // এজেন্টটি ইনস্টল করা আছে কি না
  providerAlias: string; // OmniRoute-এ প্রোভাইডার ID
  spawnArgs: string[]; // চালু করার সময় পাস করার আর্গুমেন্ট
  protocol: "stdio" | "http"; // যোগাযোগ প্রোটোকল
  isCustom?: boolean; // এটি ব্যবহারকারী-সংজ্ঞায়িত কাস্টম এজেন্ট কি না
}
```

#### `getAvailableAgents()`

শুধু ACP-এর জন্য ইনস্টল করা ও উপলভ্য এজেন্টগুলো আনে।

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// রিটার্ন করে: CliAgentInfo[] (শুধু ইনস্টল করা এজেন্ট)
```

#### `getAgentById(id)`

ID অনুযায়ী একটি নির্দিষ্ট এজেন্ট আনে।

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// রিটার্ন করে: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

সেটিংস থেকে কাস্টম এজেন্টের সংজ্ঞা নির্ধারণ করে।

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

### ম্যানেজার ফাংশনসমূহ

#### `acpManager.spawn(agentId, binary, args, env)`

একটি নতুন CLI এজেন্ট প্রসেস চালু করে।

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* কাস্টম পরিবেশ ভেরিয়েবল */
});
// রিটার্ন করে: AcpSession
```

**অনুমোদিত এজেন্ট ID**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

একটি CLI এজেন্টকে প্রম্পট পাঠায় এবং প্রতিক্রিয়া সংগ্রহ করে।

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 মিনিটের টাইমআউট
);
// রিটার্ন করে: Promise<string>
```

#### `acpManager.kill(sessionId)`

একটি সেশন বন্ধ করে এবং পরিষ্কার করে।

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// রিটার্ন করে: boolean
```

#### `acpManager.getActiveSessions()`

সব সক্রিয় সেশন আনে।

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// রিটার্ন করে: AcpSession[]
```

#### `acpManager.killAll()`

সব সেশন বন্ধ করে।

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### সেশন ইন্টারফেস

```typescript
interface AcpSession {
  id: string; // অনন্য সেশন ID
  agentId: string; // এজেন্ট ID (যেমন, "claude")
  process: ChildProcess; // চাইল্ড প্রসেস হ্যান্ডেল
  alive: boolean; // প্রসেসটি সচল আছে কি না
  stdoutBuffer: string; // সঞ্চিত stdout বাফার
  stderrBuffer: string; // সঞ্চিত stderr বাফার
  createdAt: Date; // তৈরির টাইমস্ট্যাম্প
}
```

### ইভেন্টসমূহ

`AcpManager`, `EventEmitter`-কে সম্প্রসারিত করে এবং নিম্নলিখিত ইভেন্টগুলো নির্গত করে:

#### `stdout`

CLI এজেন্ট stdout-এ লিখলে নির্গত হয়।

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI এজেন্ট stderr-এ লিখলে নির্গত হয়।

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI এজেন্ট প্রসেস বন্ধ হলে নির্গত হয়।

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI এজেন্ট প্রসেসে ত্রুটি ঘটলে নির্গত হয়।

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## কনফিগারেশন

### এনভায়রনমেন্ট ভেরিয়েবল

ACP প্যারেন্ট প্রসেস থেকে সব এনভায়রনমেন্ট ভেরিয়েবল গ্রহণ করে এবং কাস্টম env vars দিয়ে এগুলো সম্প্রসারণ করা যায়:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### স্পন আর্গুমেন্ট

প্রতিটি এজেন্টের জন্য রেজিস্ট্রিতে ডিফল্ট স্পন আর্গুমেন্ট নির্ধারিত থাকে। আপনি সেগুলো ওভাররাইড করতে পারেন:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### টাইমআউট

ডিফল্ট প্রম্পট টাইমআউট হলো **120 সেকেন্ড** (2 মিনিট)। আপনি এটি ওভাররাইড করতে পারেন:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 মিনিট
```

### ডিটেকশন ক্যাশ

ব্যয়বহুল ফাইলসিস্টেম স্ক্যান এড়াতে এজেন্ট শনাক্তকরণের ফলাফল **60 সেকেন্ডের** জন্য ক্যাশ করা হয়। জোরপূর্বক রিফ্রেশ করতে:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## নিরাপত্তা

### কমান্ড ইনজেকশন প্রতিরোধ

কমান্ড ইনজেকশন আক্রমণ প্রতিরোধ করতে ACP ভার্সন কমান্ড যাচাই করে:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

এই অক্ষরগুলো থাকা ভার্সন কমান্ড প্রত্যাখ্যান করা হয়:

- `;` — কমান্ড বিভাজক
- `&` — ব্যাকগ্রাউন্ড প্রসেস
- `|` — পাইপ
- `<`, `>` — রিডাইরেকশন
- `` ` `` — কমান্ড সাবস্টিটিউশন
- `$` — ভেরিয়েবল এক্সপ্যানশন
- `\r`, `\n` — লাইন ব্রেক

### বাইনারি নাম যাচাইকরণ

ACP যাচাই করে যে ভার্সন কমান্ডের বাইনারিটি প্রত্যাশিত বাইনারি নামের সঙ্গে মেলে (যদি না এটি একটি কাস্টম এজেন্ট হয়)।

### প্রসেস আইসোলেশন

প্রতিটি ACP সেশন নিজস্ব চাইল্ড প্রসেসে চলে। সেশন শেষ হলে বা টাইমআউট হলে প্রসেসটি বন্ধ করে দেওয়া হয়।

---

## পারফরম্যান্স

### ডিটেকশন পারফরম্যান্স

- **প্রথম কল**: ~50-200ms (প্রতিটি এজেন্টের জন্য `version` কমান্ড চালায়)
- **ক্যাশ করা কল**: <1ms (ক্যাশ থেকে ফেরত দেয়)
- **ক্যাশ TTL**: 60 সেকেন্ড

### প্রম্পট পারফরম্যান্স

- **স্পন**: ~50-100ms
- **প্রম্পট পাঠানো**: ~10-50ms
- **রেসপন্সের জন্য অপেক্ষা**: CLI এজেন্টের ওপর নির্ভর করে (সাধারণত 1-30 সেকেন্ড)
- **বন্ধ করা**: ~5 সেকেন্ড (SIGTERM) + তাৎক্ষণিক (SIGKILL)

### রিসোর্স ব্যবহার

- **প্রতি সেশনে মেমরি**: ~10-50MB (CLI এজেন্টের ওপর নির্ভর করে)
- **CPU**: ন্যূনতম (I/O-বাউন্ড)
- **ডিস্ক**: কোনো ব্যবহার নেই

---

## সমস্যা সমাধান

### "Unknown agent" ত্রুটি

**সমস্যা**: `acpManager.spawn()` থেকে `Unknown agent: <id>` ত্রুটি আসে

**সমাধান**: `spawn()`-এ কেবল এই এজেন্টগুলো অনুমোদিত:

- `claude`
- `codex`
- `gemini`
- `qwen`

অন্যান্য এজেন্টকে ম্যানুয়ালি বা কাস্টম এজেন্ট সংজ্ঞার মাধ্যমে স্পন করতে হবে।

### "Session not alive" ত্রুটি

**সমস্যা**: `acpManager.sendPrompt()` থেকে `Session ${sessionId} is not alive` ত্রুটি আসে

**সমাধান**: সেশনটি হয়তো বন্ধ হয়ে গেছে বা বন্ধ করে দেওয়া হয়েছে। সেশনের স্ট্যাটাস পরীক্ষা করুন:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // সেশনটি পুনরায় স্পন করুন
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" ত্রুটি

**সমস্যা**: `acpManager.sendPrompt()` থেকে `ACP timeout after 120000ms` ত্রুটি আসে

**সমাধান**: টাইমআউট বাড়ান:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 মিনিট
```

### CLI শনাক্ত হয়নি

**সমস্যা**: `detectInstalledAgents()` আপনার CLI খুঁজে পাচ্ছে না

**সমাধানসমূহ**:

1. **PATH পরীক্ষা করুন**: নিশ্চিত করুন যে CLI আপনার সিস্টেম PATH-এ রয়েছে
2. **ভার্সন কমান্ড পরীক্ষা করুন**: ম্যানুয়ালি `claude --version` চালান
3. **অনুমতি পরীক্ষা করুন**: নিশ্চিত করুন যে CLI এক্সিকিউটেবল
4. **কাস্টম এজেন্ট**: অ-স্ট্যান্ডার্ড CLI-এর জন্য একটি কাস্টম এজেন্ট সংজ্ঞা যোগ করুন

### অনুমতি প্রত্যাখ্যাত

**সমস্যা**: ACP CLI চালাতে পারছে না

**সমাধানসমূহ**:

1. **ফাইলের অনুমতি পরীক্ষা করুন**: `chmod +x /usr/local/bin/claude`
2. **মালিকানা পরীক্ষা করুন**: নিশ্চিত করুন যে OmniRoute-এর রিড/এক্সিকিউট অনুমতি রয়েছে
3. **SELinux/AppArmor পরীক্ষা করুন**: এগুলো প্রসেস স্পন করা ব্লক করতে পারে

---

## উদাহরণসমূহ

### উদাহরণ 1: Claude Code চালু ও ব্যবহার করা

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// ইনস্টল করা এজেন্ট শনাক্ত করুন
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // একটি নতুন সেশন চালু করুন
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // একটি প্রম্পট পাঠান
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // পরিষ্কার করুন
  acpManager.kill(session.id);
}
```

### উদাহরণ 2: ফলব্যাকসহ স্বয়ংক্রিয় অনুসন্ধান

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// প্রথমে Claude চেষ্টা করুন, না পেলে Codex ব্যবহার করুন
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

### উদাহরণ 3: কাস্টম এজেন্ট

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// একটি কাস্টম CLI এজেন্ট নিবন্ধন করুন
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

// এখন detectInstalledAgents()-এ "my-llm-cli" অন্তর্ভুক্ত থাকবে
const agents = detectInstalledAgents();
```

---

## এরপর কী?

- **[API রেফারেন্স](../reference/API_REFERENCE.md)** — REST API এন্ডপয়েন্টসমূহ
- **[প্রোভাইডার রেফারেন্স](../reference/PROVIDER_REFERENCE.md)** — সব 352টি প্রোভাইডার
- **[MCP সার্ভার](./MCP-SERVER.md)** — Model Context Protocol ইন্টিগ্রেশন
- **[A2A সার্ভার](./A2A-SERVER.md)** — Agent-to-Agent প্রোটোকল
- **[ক্লাউড এজেন্ট](./CLOUD_AGENT.md)** — ক্লাউড-ভিত্তিক এজেন্টসমূহ

---

## রেফারেন্স

- [AionUi প্রজেক্ট](https://github.com/iOfficeAI/AionUi) — ACP স্বয়ংক্রিয় শনাক্তকরণের অনুপ্রেরণা
- [ACP সোর্স কোড](../../src/lib/acp/) — বাস্তবায়নের বিস্তারিত
  - `manager.ts` — প্রসেস লাইফসাইকেল ব্যবস্থাপনা
  - `registry.ts` — এজেন্ট অনুসন্ধান ও নিবন্ধন
  - `index.ts` — পাবলিক API এক্সপোর্টসমূহ
