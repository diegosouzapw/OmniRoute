# ACP (Agent Client Protocol) (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **خلاصہ**: ACP، OmniRoute کو HTTP APIs استعمال کرنے کے بجائے CLI agents (جیسے Claude Code، Codex) کو child processes کے طور پر شروع کرنے کی سہولت دیتا ہے۔ اس طرح آپ کو "CLI-as-backend" transport ملتا ہے۔

---

## ACP کیا ہے؟

ACP (Agent Client Protocol)، OmniRoute کے لیے ایک **"CLI-as-backend" transport** ہے۔ AI providers کی HTTP API calls کو intercept کرنے کے بجائے، ACP **CLI agents کو child processes کے طور پر شروع کرتا ہے** اور prompts کو ان کے native interface کے ذریعے بھیجتا ہے۔

### ACP کیوں استعمال کریں؟

| فائدہ                      | تفصیل                                                |
| -------------------------- | ---------------------------------------------------- |
| **API keys کی ضرورت نہیں** | آپ کی موجودہ CLI authentication استعمال کرتا ہے      |
| **Native protocol**        | ہر CLI کا native input/output format استعمال کرتا ہے |
| **خودکار دریافت**          | آپ کے سسٹم پر نصب CLIs کا پتہ لگاتا ہے               |
| **15 پہلے سے شامل agents** | مقبول CLI tools کے لیے پہلے سے configured            |
| **Custom agents**          | settings کے ذریعے اپنے CLI tools شامل کریں           |
| **Process management**     | lifecycle (spawn، send، kill) کو سنبھالتا ہے         |

---

## معاونت یافتہ CLI Agents

ACP بغیر کسی اضافی ترتیب کے **15 پہلے سے شامل CLI agents** کو سپورٹ کرتا ہے:

| Agent ID      | دکھایا جانے والا نام | Binary        | Protocol |
| ------------- | -------------------- | ------------- | -------- |
| `codex`       | OpenAI Codex CLI     | `codex`       | stdio    |
| `claude`      | Claude Code CLI      | `claude`      | stdio    |
| `goose`       | Goose CLI            | `goose`       | stdio    |
| `openclaw`    | OpenClaw             | `openclaw`    | stdio    |
| `aider`       | Aider                | `aider`       | stdio    |
| `opencode`    | OpenCode             | `opencode`    | stdio    |
| `cline`       | Cline                | `cline`       | stdio    |
| `qwen`        | Qwen Code            | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode            | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer   | `q`           | stdio    |
| `interpreter` | Open Interpreter     | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI           | `cursor`      | stdio    |
| `warp`        | Warp AI              | `warp`        | stdio    |
| `gemini`      | Gemini CLI           | `gemini`      | stdio    |
| `zcode`       | ZCode                | `zcode`       | stdio    |

### Custom Agents

آپ settings کے ذریعے اپنے CLI agents شامل کر سکتے ہیں۔ Custom agents بھی پہلے سے شامل agents جیسی خصوصیات کو سپورٹ کرتے ہیں۔

---

## فوری آغاز

### مرحلہ 1: ایک CLI Agent نصب کریں

```bash
# مثال: Claude Code CLI نصب کریں
npm install -g @anthropic-ai/claude-code

# تنصیب کی تصدیق کریں
claude --version
```

### مرحلہ 2: ACP کی خودکار شناخت

ACP آپ کے سسٹم پر نصب CLI agents کا خودکار طور پر پتہ لگاتا ہے۔ کسی configuration کی ضرورت نہیں!

### مرحلہ 3: ACP Transport استعمال کریں

پتہ لگنے کے بعد، ACP کو کسی بھی معاونت یافتہ provider کے لیے transport کے طور پر استعمال کیا جا سکتا ہے۔ CLI دستیاب ہونے پر OmniRoute خودکار طور پر ACP استعمال کرے گا۔

---

## ACP کیسے کام کرتا ہے

### ساخت

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
│  stdin  ◄──────┤  Prompt بھیجیں
│  stdout ──────►│  Response موصول کریں
│  stderr ──────►│  Errors موصول کریں
└─────────────────┘
```

### Process Lifecycle

1. **شروع کرنا** — ACP، CLI agent کے لیے ایک child process بناتا ہے
2. **بھیجنا** — ACP، prompts کو process کے stdin میں لکھتا ہے
3. **موصول کرنا** — ACP، stdout/stderr سے responses پڑھتا ہے
4. **عدم فعالیت کی شناخت** — response کو مکمل سمجھنے سے پہلے ACP دو سیکنڈ کی عدم فعالیت کا انتظار کرتا ہے
5. **ختم کرنا** — ACP، process کو ختم کرتا ہے (SIGTERM، پھر 5s کے بعد SIGKILL)

### Communication Protocol

ACP، CLI agents کے ساتھ communication کے لیے **stdio** (standard input/output) استعمال کرتا ہے۔ Protocol یہ ہے:

1. **Prompt بھیجیں** — newline کے ساتھ stdin میں لکھیں
2. **Response کا انتظار کریں** — idle ہونے تک stdout سے پڑھیں (2s تک کوئی output نہ ہو)
3. **Timeout** — بطور default 120 سیکنڈ (قابلِ ترتیب)

---

## API حوالہ

### رجسٹری فنکشنز

#### `detectInstalledAgents()`

سسٹم پر انسٹال تمام CLI ایجنٹس کا پتہ لگاتا ہے۔ نتائج 60 سیکنڈز کے لیے کیش کیے جاتے ہیں۔

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// واپس کرتا ہے: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // مثلاً، "codex"، "claude"
  name: string; // نمائشی نام
  binary: string; // شروع کی جانے والی بائنری کا نام
  versionCommand: string; // ورژن معلوم کرنے کی کمانڈ
  version: string | null; // معلوم کردہ ورژن (انسٹال نہ ہونے کی صورت میں null)
  installed: boolean; // آیا ایجنٹ انسٹال ہے
  providerAlias: string; // OmniRoute میں فراہم کنندہ کی ID
  spawnArgs: string[]; // شروع کرتے وقت پاس کیے جانے والے آرگیومنٹس
  protocol: "stdio" | "http"; // مواصلاتی پروٹوکول
  isCustom?: boolean; // آیا یہ صارف کی وضاحت کردہ حسبِ ضرورت ایجنٹ ہے
}
```

#### `getAvailableAgents()`

صرف ان ایجنٹس کو حاصل کرتا ہے جو انسٹال ہیں اور ACP کے لیے دستیاب ہیں۔

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// واپس کرتا ہے: CliAgentInfo[] (صرف انسٹال شدہ ایجنٹس)
```

#### `getAgentById(id)`

ID کے ذریعے ایک مخصوص ایجنٹ حاصل کرتا ہے۔

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// واپس کرتا ہے: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

ترتیبات سے حسبِ ضرورت ایجنٹ کی تعریفیں مقرر کرتا ہے۔

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

### مینیجر فنکشنز

#### `acpManager.spawn(agentId, binary, args, env)`

ایک نیا CLI ایجنٹ پروسیس شروع کرتا ہے۔

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* حسبِ ضرورت ماحول کے متغیرات */
});
// واپس کرتا ہے: AcpSession
```

**اجازت یافتہ ایجنٹ IDs**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI ایجنٹ کو ایک پرامپٹ بھیجتا ہے اور جواب جمع کرتا ہے۔

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 منٹ کا ٹائم آؤٹ
);
// واپس کرتا ہے: Promise<string>
```

#### `acpManager.kill(sessionId)`

سیشن ختم کرتا ہے اور صفائی انجام دیتا ہے۔

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// واپس کرتا ہے: boolean
```

#### `acpManager.getActiveSessions()`

تمام فعال سیشنز حاصل کرتا ہے۔

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// واپس کرتا ہے: AcpSession[]
```

#### `acpManager.killAll()`

تمام سیشنز ختم کرتا ہے۔

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### سیشن انٹرفیس

```typescript
interface AcpSession {
  id: string; // منفرد سیشن ID
  agentId: string; // ایجنٹ ID (مثلاً، "claude")
  process: ChildProcess; // چائلڈ پروسیس ہینڈل
  alive: boolean; // آیا پروسیس فعال ہے
  stdoutBuffer: string; // جمع شدہ stdout بفر
  stderrBuffer: string; // جمع شدہ stderr بفر
  createdAt: Date; // تخلیق کا ٹائم اسٹیمپ
}
```

### ایونٹس

`AcpManager`، `EventEmitter` کو توسیع دیتا ہے اور درج ذیل ایونٹس خارج کرتا ہے:

#### `stdout`

جب CLI ایجنٹ stdout پر لکھتا ہے تو خارج ہوتا ہے۔

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

جب CLI ایجنٹ stderr پر لکھتا ہے تو خارج ہوتا ہے۔

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

جب CLI ایجنٹ پروسیس ختم ہوتا ہے تو خارج ہوتا ہے۔

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

جب CLI ایجنٹ پروسیس میں خرابی پیش آتی ہے تو خارج ہوتا ہے۔

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## کنفیگریشن

### ماحولیاتی متغیرات

ACP پیرنٹ پراسیس سے تمام ماحولیاتی متغیرات وراثت میں لیتا ہے اور اسے حسبِ ضرورت env vars کے ذریعے توسیع دی جا سکتی ہے:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### اسپان آرگیومنٹس

ہر ایجنٹ کے ڈیفالٹ اسپان آرگیومنٹس رجسٹری میں متعین ہوتے ہیں۔ آپ انہیں اوور رائیڈ کر سکتے ہیں:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### ٹائم آؤٹس

ڈیفالٹ پرامپٹ ٹائم آؤٹ **120 سیکنڈز** (2 منٹ) ہے۔ آپ اسے اوور رائیڈ کر سکتے ہیں:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 منٹ
```

### ڈیٹیکشن کیش

مہنگے فائل سسٹم اسکینز سے بچنے کے لیے ایجنٹ ڈیٹیکشن کو **60 سیکنڈز** تک کیش کیا جاتا ہے۔ جبراً ریفریش کرنے کے لیے:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## سیکیورٹی

### کمانڈ انجیکشن کی روک تھام

ACP کمانڈ انجیکشن حملوں سے بچنے کے لیے ورژن کمانڈز کی توثیق کرتا ہے:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

ان حروف پر مشتمل ورژن کمانڈز مسترد کر دی جاتی ہیں:

- `;` — کمانڈ الگ کرنے والا
- `&` — بیک گراؤنڈ پراسیس
- `|` — پائپ
- `<`, `>` — ری ڈائریکشن
- `` ` `` — کمانڈ سبسٹی ٹیوشن
- `$` — متغیر کی توسیع
- `\r`, `\n` — لائن بریکس

### بائنری نام کی توثیق

ACP توثیق کرتا ہے کہ ورژن کمانڈ کا بائنری متوقع بائنری نام سے مطابقت رکھتا ہے (سوائے اس صورت کے جب وہ کسٹم ایجنٹ ہو)۔

### پراسیس آئسولیشن

ہر ACP سیشن اپنے الگ چائلڈ پراسیس میں چلتا ہے۔ سیشن ختم ہونے یا ٹائم آؤٹ ہونے پر پراسیس کو ختم کر دیا جاتا ہے۔

---

## کارکردگی

### ڈیٹیکشن کی کارکردگی

- **پہلی کال**: ~50-200ms (ہر ایجنٹ کے لیے `version` کمانڈ چلاتی ہے)
- **کیش شدہ کالز**: <1ms (کیش سے واپس کرتی ہیں)
- **کیش TTL**: 60 سیکنڈز

### پرامپٹ کی کارکردگی

- **اسپان**: ~50-100ms
- **پرامپٹ بھیجنا**: ~10-50ms
- **جواب کا انتظار**: CLI ایجنٹ پر منحصر ہے (عموماً 1-30 سیکنڈز)
- **ختم کرنا**: ~5 سیکنڈز (SIGTERM) + فوری (SIGKILL)

### وسائل کا استعمال

- **فی سیشن میموری**: ~10-50MB (CLI ایجنٹ پر منحصر ہے)
- **CPU**: انتہائی کم (I/O باؤنڈ)
- **ڈسک**: کوئی نہیں

---

## مسائل کا ازالہ

### "Unknown agent" کی خرابی

**مسئلہ**: `acpManager.spawn()` سے `Unknown agent: <id>` کی خرابی آتی ہے

**حل**: `spawn()` میں صرف ان ایجنٹس کی اجازت ہے:

- `claude`
- `codex`
- `gemini`
- `qwen`

دیگر ایجنٹس کو دستی طور پر یا کسٹم ایجنٹ کی تعریفوں کے ذریعے اسپان کرنا ضروری ہے۔

### "Session not alive" کی خرابی

**مسئلہ**: `acpManager.sendPrompt()` سے `Session ${sessionId} is not alive` کی خرابی آتی ہے

**حل**: ممکن ہے سیشن بند ہو گیا ہو یا اسے ختم کر دیا گیا ہو۔ سیشن کی حیثیت چیک کریں:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // سیشن کو دوبارہ اسپان کریں
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" کی خرابی

**مسئلہ**: `acpManager.sendPrompt()` سے `ACP timeout after 120000ms` کی خرابی آتی ہے

**حل**: ٹائم آؤٹ بڑھائیں:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 منٹ
```

### CLI کا پتہ نہیں چلا

**مسئلہ**: `detectInstalledAgents()` آپ کی CLI تلاش نہیں کرتا

**حل**:

1. **PATH چیک کریں**: یقینی بنائیں کہ CLI آپ کے سسٹم PATH میں موجود ہے
2. **ورژن کمانڈ چیک کریں**: `claude --version` کو دستی طور پر چلائیں
3. **اجازتیں چیک کریں**: یقینی بنائیں کہ CLI قابلِ اجرا ہے
4. **کسٹم ایجنٹ**: غیر معیاری CLIs کے لیے کسٹم ایجنٹ کی تعریف شامل کریں

### اجازت مسترد

**مسئلہ**: ACP، CLI کو اجرا نہیں کر سکتا

**حل**:

1. **فائل کی اجازتیں چیک کریں**: `chmod +x /usr/local/bin/claude`
2. **ملکیت چیک کریں**: یقینی بنائیں کہ OmniRoute کے پاس پڑھنے/اجرا کی اجازتیں ہیں
3. **SELinux/AppArmor چیک کریں**: یہ پراسیس اسپاننگ کو بلاک کر سکتے ہیں

---

## مثالیں

### مثال 1: Claude Code کو شروع کرنا اور استعمال کرنا

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// انسٹال شدہ ایجنٹس کا پتا لگائیں
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // نیا سیشن شروع کریں
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // پرامپٹ بھیجیں
  const response = await acpManager.sendPrompt(
    session.id,
    "کوانٹم کمپیوٹنگ کی 100 الفاظ میں وضاحت کریں"
  );

  console.log("Claude کا جواب:", response);

  // صفائی کریں
  acpManager.kill(session.id);
}
```

### مثال 2: متبادل کے ساتھ خودکار دریافت

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// پہلے Claude آزمائیں، پھر بطور متبادل Codex استعمال کریں
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("کوئی ACP سے مطابقت رکھنے والا CLI ایجنٹ نہیں ملا");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "سلام!");

acpManager.kill(session.id);
```

### مثال 3: حسبِ ضرورت ایجنٹ

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// حسبِ ضرورت CLI ایجنٹ رجسٹر کریں
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

// اب detectInstalledAgents() میں "my-llm-cli" شامل ہوگا
const agents = detectInstalledAgents();
```

---

## آگے کیا ہے؟

- **[API حوالہ](../reference/API_REFERENCE.md)** — REST API اینڈ پوائنٹس
- **[فراہم کنندگان کا حوالہ](../reference/PROVIDER_REFERENCE.md)** — تمام 352 فراہم کنندگان
- **[MCP سرور](./MCP-SERVER.md)** — Model Context Protocol کا انضمام
- **[A2A سرور](./A2A-SERVER.md)** — Agent-to-Agent پروٹوکول
- **[کلاؤڈ ایجنٹ](./CLOUD_AGENT.md)** — کلاؤڈ پر مبنی ایجنٹس

---

## حوالہ

- [AionUi پروجیکٹ](https://github.com/iOfficeAI/AionUi) — ACP کی خودکار دریافت کے لیے ماخذِ ترغیب
- [ACP سورس کوڈ](../../src/lib/acp/) — نفاذ کی تفصیلات
  - `manager.ts` — پراسیس لائف سائیکل کا نظم
  - `registry.ts` — ایجنٹ کی دریافت اور رجسٹریشن
  - `index.ts` — عوامی API ایکسپورٹس
