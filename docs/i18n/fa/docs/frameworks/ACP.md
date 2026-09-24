# ACP (Agent Client Protocol) (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **خلاصه**: ACP به OmniRoute اجازه میدهد عاملهای CLI (مانند Claude Code و Codex) را بهجای استفاده از APIهای HTTP، بهصورت فرایندهای فرزند اجرا کند. این قابلیت، انتقال «CLI بهعنوان بکاند» را در اختیار شما قرار میدهد.

---

## ACP چیست؟

ACP (پروتکل کلاینت عامل) یک روش انتقال **«CLI بهعنوان بکاند»** برای OmniRoute است. ACP بهجای رهگیری فراخوانیهای API مبتنی بر HTTP به ارائهدهندگان هوش مصنوعی، **عاملهای CLI را بهصورت فرایندهای فرزند اجرا میکند** و اعلانها را از طریق رابط بومی آنها ارسال میکند.

### چرا از ACP استفاده کنیم؟

| مزیت                      | توضیحات                                         |
| ------------------------- | ----------------------------------------------- |
| **بدون نیاز به کلید API** | از احراز هویت فعلی CLI شما استفاده میکند        |
| **پروتکل بومی**           | از قالب ورودی/خروجی بومی هر CLI استفاده میکند   |
| **کشف خودکار**            | CLIهای نصبشده روی سیستم شما را شناسایی میکند    |
| **۱۵ عامل داخلی**         | برای ابزارهای محبوب CLI از پیش پیکربندی شده است |
| **عاملهای سفارشی**        | ابزارهای CLI خود را از طریق تنظیمات اضافه کنید  |
| **مدیریت فرایند**         | چرخهٔ عمر را مدیریت میکند (اجرا، ارسال، خاتمه)  |

---

## عاملهای CLI پشتیبانیشده

ACP بهصورت پیشفرض از **۱۵ عامل CLI داخلی** پشتیبانی میکند:

| شناسهٔ عامل   | نام نمایشی         | فایل اجرایی   | پروتکل |
| ------------- | ------------------ | ------------- | ------ |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio  |
| `claude`      | Claude Code CLI    | `claude`      | stdio  |
| `goose`       | Goose CLI          | `goose`       | stdio  |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio  |
| `aider`       | Aider              | `aider`       | stdio  |
| `opencode`    | OpenCode           | `opencode`    | stdio  |
| `cline`       | Cline              | `cline`       | stdio  |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio  |
| `forge`       | ForgeCode          | `forge`       | stdio  |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio  |
| `interpreter` | Open Interpreter   | `interpreter` | stdio  |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio  |
| `warp`        | Warp AI            | `warp`        | stdio  |
| `gemini`      | Gemini CLI         | `gemini`      | stdio  |
| `zcode`       | ZCode              | `zcode`       | stdio  |

### عاملهای سفارشی

میتوانید عاملهای CLI خود را از طریق تنظیمات اضافه کنید. عاملهای سفارشی از همان قابلیتهای عاملهای داخلی پشتیبانی میکنند.

---

## شروع سریع

### مرحلهٔ ۱: نصب یک عامل CLI

```bash
# مثال: نصب Claude Code CLI
npm install -g @anthropic-ai/claude-code

# تأیید نصب
claude --version
```

### مرحلهٔ ۲: شناسایی خودکار ACP

ACP عاملهای CLI نصبشده روی سیستم شما را بهطور خودکار شناسایی میکند. به هیچ پیکربندیای نیاز نیست!

### مرحلهٔ ۳: استفاده از انتقال ACP

پس از شناسایی، میتوان از ACP بهعنوان روش انتقال برای هر ارائهدهندهٔ پشتیبانیشده استفاده کرد. هرگاه CLI در دسترس باشد، OmniRoute بهطور خودکار از ACP استفاده خواهد کرد.

---

## ACP چگونه کار میکند

### معماری

```
┌─────────────────┐
│  OmniRoute      │
│  (پروکسی HTTP)  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  فرایند فرزند   │
│  (عامل CLI)     │
│                 │
│  stdin  ◄──────┤  ارسال اعلان
│  stdout ──────►│  دریافت پاسخ
│  stderr ──────►│  دریافت خطاها
└─────────────────┘
```

### چرخهٔ عمر فرایند

1. **اجرا** — ACP یک فرایند فرزند برای عامل CLI ایجاد میکند
2. **ارسال** — ACP اعلانها را در stdin فرایند مینویسد
3. **دریافت** — ACP پاسخها را از stdout/stderr میخواند
4. **تشخیص بیکاری** — ACP پیش از کامل در نظر گرفتن پاسخ، ۲ ثانیه منتظر عدم فعالیت میماند
5. **خاتمه** — ACP فرایند را خاتمه میدهد (SIGTERM و سپس SIGKILL پس از ۵ ثانیه)

### پروتکل ارتباطی

ACP برای ارتباط با عاملهای CLI از **stdio** (ورودی/خروجی استاندارد) استفاده میکند. پروتکل به این صورت است:

1. **ارسال اعلان** — نوشتن در stdin همراه با یک خط جدید
2. **انتظار برای پاسخ** — خواندن از stdout تا زمان بیکاری (۲ ثانیه بدون خروجی)
3. **مهلت زمانی** — بهطور پیشفرض ۱۲۰ ثانیه (قابل پیکربندی)

---

## مرجع API

### توابع رجیستری

#### `detectInstalledAgents()`

تمام عاملهای CLI نصبشده روی سیستم را شناسایی میکند. نتایج بهمدت 60 ثانیه کش میشوند.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// خروجی: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // برای مثال، "codex"، "claude"
  name: string; // نام نمایشی
  binary: string; // نام فایل اجرایی برای راهاندازی
  versionCommand: string; // فرمان تشخیص نسخه
  version: string | null; // نسخه شناساییشده (در صورت نصب نبودن null)
  installed: boolean; // آیا عامل نصب شده است
  providerAlias: string; // شناسه ارائهدهنده در OmniRoute
  spawnArgs: string[]; // آرگومانهایی که هنگام راهاندازی ارسال میشوند
  protocol: "stdio" | "http"; // پروتکل ارتباطی
  isCustom?: boolean; // آیا این یک عامل سفارشی تعریفشده توسط کاربر است
}
```

#### `getAvailableAgents()`

فقط عاملهایی را دریافت میکند که نصب شدهاند و برای ACP در دسترس هستند.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// خروجی: CliAgentInfo[] (فقط عاملهای نصبشده)
```

#### `getAgentById(id)`

یک عامل مشخص را بر اساس شناسه دریافت میکند.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// خروجی: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

تعریف عاملهای سفارشی را از تنظیمات اعمال میکند.

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

### توابع مدیر

#### `acpManager.spawn(agentId, binary, args, env)`

یک فرایند جدید برای عامل CLI راهاندازی میکند.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* متغیرهای محیطی سفارشی */
});
// خروجی: AcpSession
```

**شناسههای مجاز عامل**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

یک پرامپت به عامل CLI ارسال میکند و پاسخ را جمعآوری میکند.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // مهلت زمانی 2 دقیقه
);
// خروجی: Promise<string>
```

#### `acpManager.kill(sessionId)`

یک نشست را خاتمه میدهد و منابع آن را پاکسازی میکند.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// خروجی: boolean
```

#### `acpManager.getActiveSessions()`

تمام نشستهای فعال را دریافت میکند.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// خروجی: AcpSession[]
```

#### `acpManager.killAll()`

تمام نشستها را خاتمه میدهد.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### رابط نشست

```typescript
interface AcpSession {
  id: string; // شناسه یکتای نشست
  agentId: string; // شناسه عامل (برای مثال، "claude")
  process: ChildProcess; // هندل فرایند فرزند
  alive: boolean; // آیا فرایند فعال است
  stdoutBuffer: string; // بافر انباشتهشده stdout
  stderrBuffer: string; // بافر انباشتهشده stderr
  createdAt: Date; // مهر زمانی ایجاد
}
```

### رویدادها

`AcpManager` از `EventEmitter` ارثبری میکند و رویدادهای زیر را منتشر میکند:

#### `stdout`

هنگامی منتشر میشود که عامل CLI در stdout دادهای بنویسد.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

هنگامی منتشر میشود که عامل CLI در stderr دادهای بنویسد.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

هنگامی منتشر میشود که فرایند عامل CLI خاتمه یابد.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

هنگامی منتشر میشود که در فرایند عامل CLI خطایی رخ دهد.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## پیکربندی

### متغیرهای محیطی

ACP همهٔ متغیرهای محیطی را از فرایند والد به ارث میبرد و میتوان آن را با متغیرهای محیطی سفارشی گسترش داد:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### آرگومانهای ایجاد فرایند

هر عامل دارای آرگومانهای پیشفرض برای ایجاد فرایند است که در رجیستری تعریف شدهاند. میتوانید آنها را بازنویسی کنید:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### مهلتهای زمانی

مهلت زمانی پیشفرض برای پرامپت **120 ثانیه** (2 دقیقه) است. میتوانید آن را بازنویسی کنید:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 دقیقه
```

### کش تشخیص

نتیجهٔ تشخیص عاملها بهمدت **60 ثانیه** کش میشود تا از اسکنهای پرهزینهٔ سیستم فایل جلوگیری شود. برای بازخوانی اجباری:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## امنیت

### جلوگیری از تزریق فرمان

ACP برای جلوگیری از حملات تزریق فرمان، فرمانهای نسخه را اعتبارسنجی میکند:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

فرمانهای نسخهای که شامل این نویسهها باشند رد میشوند:

- `;` — جداکنندهٔ فرمان
- `&` — فرایند پسزمینه
- `|` — پایپ
- `<`, `>` — تغییر مسیر
- `` ` `` — جایگزینی فرمان
- `$` — بسط متغیر
- `\r`, `\n` — شکست خط

### اعتبارسنجی نام فایل اجرایی

ACP اعتبارسنجی میکند که فایل اجرایی فرمان نسخه با نام فایل اجرایی مورد انتظار مطابقت داشته باشد (مگر اینکه عامل سفارشی باشد).

### جداسازی فرایند

هر نشست ACP در فرایند فرزند مختص به خود اجرا میشود. با پایان یافتن نشست یا اتمام مهلت زمانی، فرایند خاتمه داده میشود.

---

## عملکرد

### عملکرد تشخیص

- **اولین فراخوانی**: ~50-200ms (فرمان `version` را برای هر عامل اجرا میکند)
- **فراخوانیهای کششده**: <1ms (از کش برمیگرداند)
- **Cache TTL**: 60 ثانیه

### عملکرد پرامپت

- **ایجاد فرایند**: ~50-100ms
- **ارسال پرامپت**: ~10-50ms
- **انتظار برای پاسخ**: به عامل CLI بستگی دارد (معمولاً 1 تا 30 ثانیه)
- **خاتمهدادن**: ~5 ثانیه (SIGTERM) + فوری (SIGKILL)

### مصرف منابع

- **حافظه برای هر نشست**: ~10-50MB (به عامل CLI بستگی دارد)
- **CPU**: حداقل (محدود به I/O)
- **دیسک**: هیچ

---

## عیبیابی

### خطای "Unknown agent"

**مشکل**: `acpManager.spawn()` خطای `Unknown agent: <id>` را ایجاد میکند

**راهحل**: فقط این عاملها در `spawn()` مجاز هستند:

- `claude`
- `codex`
- `gemini`
- `qwen`

عاملهای دیگر باید بهصورت دستی یا از طریق تعریف عامل سفارشی ایجاد شوند.

### خطای "Session not alive"

**مشکل**: `acpManager.sendPrompt()` خطای `Session ${sessionId} is not alive` را ایجاد میکند

**راهحل**: ممکن است نشست خارج شده یا خاتمه داده شده باشد. وضعیت نشست را بررسی کنید:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // نشست را دوباره ایجاد کنید
  acpManager.spawn("claude", "claude", [], {});
}
```

### خطای "ACP timeout"

**مشکل**: `acpManager.sendPrompt()` خطای `ACP timeout after 120000ms` را ایجاد میکند

**راهحل**: مهلت زمانی را افزایش دهید:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 دقیقه
```

### CLI شناسایی نمیشود

**مشکل**: `detectInstalledAgents()` ابزار CLI شما را پیدا نمیکند

**راهحلها**:

1. **بررسی PATH**: مطمئن شوید CLI در PATH سیستم شما قرار دارد
2. **بررسی فرمان نسخه**: `claude --version` را بهصورت دستی اجرا کنید
3. **بررسی مجوزها**: مطمئن شوید CLI قابل اجرا است
4. **عامل سفارشی**: برای CLIهای غیراستاندارد، تعریف عامل سفارشی اضافه کنید

### عدم دسترسی

**مشکل**: ACP نمیتواند CLI را اجرا کند

**راهحلها**:

1. **بررسی مجوزهای فایل**: `chmod +x /usr/local/bin/claude`
2. **بررسی مالکیت**: مطمئن شوید OmniRoute مجوزهای خواندن/اجرا را دارد
3. **بررسی SELinux/AppArmor**: ممکن است ایجاد فرایند را مسدود کند

---

## مثالها

### مثال ۱: اجرای Claude Code و استفاده از آن

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// شناسایی عاملهای نصبشده
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // ایجاد یک نشست جدید
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ارسال یک پرامپت
  const response = await acpManager.sendPrompt(
    session.id,
    "رایانش کوانتومی را در ۱۰۰ کلمه توضیح بده"
  );

  console.log("پاسخ Claude:", response);

  // پاکسازی
  acpManager.kill(session.id);
}
```

### مثال ۲: کشف خودکار با گزینه جایگزین

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// ابتدا Claude را امتحان کنید و در صورت عدم دسترسی، از Codex استفاده کنید
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("هیچ عامل CLI سازگار با ACP یافت نشد");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "سلام!");

acpManager.kill(session.id);
```

### مثال ۳: عامل سفارشی

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// ثبت یک عامل CLI سفارشی
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

// اکنون detectInstalledAgents() شامل "my-llm-cli" نیز خواهد بود
const agents = detectInstalledAgents();
```

---

## گام بعدی چیست؟

- **[مرجع API](../reference/API_REFERENCE.md)** — نقاط پایانی REST API
- **[مرجع ارائهدهندگان](../reference/PROVIDER_REFERENCE.md)** — هر ۳۵۲ ارائهدهنده
- **[سرور MCP](./MCP-SERVER.md)** — یکپارچهسازی با پروتکل زمینه مدل
- **[سرور A2A](./A2A-SERVER.md)** — پروتکل عاملبهعامل
- **[عامل ابری](./CLOUD_AGENT.md)** — عاملهای مبتنی بر ابر

---

## منابع

- [پروژه AionUi](https://github.com/iOfficeAI/AionUi) — منبع الهام برای شناسایی خودکار ACP
- [کد منبع ACP](../../src/lib/acp/) — جزئیات پیادهسازی
  - `manager.ts` — مدیریت چرخه عمر فرایند
  - `registry.ts` — کشف و ثبت عامل
  - `index.ts` — خروجیهای عمومی API
