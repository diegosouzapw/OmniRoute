# ACP (Agent Client Protocol) (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **باختصار**: يتيح ACP لـ OmniRoute تشغيل وكلاء CLI (مثل Claude Code وCodex) كعمليات فرعية بدلًا من استخدام واجهات HTTP API. ويوفر ذلك آلية نقل تعتمد على "CLI كواجهة خلفية".

---

## ما هو ACP؟

ACP (بروتوكول عميل الوكيل) هو آلية نقل تعتمد على **"CLI كواجهة خلفية"** في OmniRoute. فبدلًا من اعتراض استدعاءات HTTP API الموجّهة إلى مزوّدي الذكاء الاصطناعي، يقوم ACP **بتشغيل وكلاء CLI كعمليات فرعية** ويمرر المطالبات عبر واجهتهم الأصلية.

### لماذا تستخدم ACP؟

| الفائدة                    | الوصف                                        |
| -------------------------- | -------------------------------------------- |
| **لا حاجة إلى مفاتيح API** | يستخدم مصادقة CLI الحالية لديك               |
| **بروتوكول أصلي**          | يستخدم تنسيق الإدخال/الإخراج الأصلي لكل CLI  |
| **اكتشاف تلقائي**          | يكتشف أدوات CLI المثبّتة على نظامك           |
| **15 وكيلًا مضمّنًا**      | مُعدّة مسبقًا لأدوات CLI الشائعة             |
| **وكلاء مخصصون**           | أضف أدوات CLI الخاصة بك عبر الإعدادات        |
| **إدارة العمليات**         | يدير دورة الحياة (التشغيل والإرسال والإنهاء) |

---

## وكلاء CLI المدعومون

يدعم ACP **15 وكيل CLI مضمّنًا** مباشرةً:

| معرّف الوكيل  | اسم العرض          | الملف التنفيذي | البروتوكول |
| ------------- | ------------------ | -------------- | ---------- |
| `codex`       | OpenAI Codex CLI   | `codex`        | stdio      |
| `claude`      | Claude Code CLI    | `claude`       | stdio      |
| `goose`       | Goose CLI          | `goose`        | stdio      |
| `openclaw`    | OpenClaw           | `openclaw`     | stdio      |
| `aider`       | Aider              | `aider`        | stdio      |
| `opencode`    | OpenCode           | `opencode`     | stdio      |
| `cline`       | Cline              | `cline`        | stdio      |
| `qwen`        | Qwen Code          | `qwen --acp`   | stdio      |
| `forge`       | ForgeCode          | `forge`        | stdio      |
| `amazon-q`    | Amazon Q Developer | `q`            | stdio      |
| `interpreter` | Open Interpreter   | `interpreter`  | stdio      |
| `cursor-cli`  | Cursor CLI         | `cursor`       | stdio      |
| `warp`        | Warp AI            | `warp`         | stdio      |
| `gemini`      | Gemini CLI         | `gemini`       | stdio      |
| `zcode`       | ZCode              | `zcode`        | stdio      |

### الوكلاء المخصصون

يمكنك إضافة وكلاء CLI الخاصين بك عبر الإعدادات. يدعم الوكلاء المخصصون الميزات نفسها التي يدعمها الوكلاء المضمّنون.

---

## البدء السريع

### الخطوة 1: تثبيت وكيل CLI

```bash
# مثال: تثبيت Claude Code CLI
npm install -g @anthropic-ai/claude-code

# التحقق من التثبيت
claude --version
```

### الخطوة 2: الاكتشاف التلقائي عبر ACP

يكتشف ACP تلقائيًا وكلاء CLI المثبّتين على نظامك. لا حاجة إلى أي إعداد!

### الخطوة 3: استخدام آلية نقل ACP

بمجرد اكتشافه، يمكن استخدام ACP كآلية نقل لأي مزوّد مدعوم. سيستخدم OmniRoute بروتوكول ACP تلقائيًا عندما تكون أداة CLI متاحة.

---

## كيف يعمل ACP

### البنية

```
┌─────────────────┐
│  OmniRoute      │
│  (وكيل HTTP)    │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  عملية فرعية    │
│  (وكيل CLI)     │
│                 │
│  stdin  ◄──────┤  إرسال المطالبة
│  stdout ──────►│  استلام الاستجابة
│  stderr ──────►│  استلام الأخطاء
└─────────────────┘
```

### دورة حياة العملية

1. **التشغيل** — ينشئ ACP عملية فرعية لوكيل CLI
2. **الإرسال** — يكتب ACP المطالبات إلى stdin الخاص بالعملية
3. **الاستلام** — يقرأ ACP الاستجابات من stdout/stderr
4. **اكتشاف الخمول** — ينتظر ACP ثانيتين من عدم النشاط قبل اعتبار الاستجابة مكتملة
5. **الإنهاء** — ينهي ACP العملية (`SIGTERM`، ثم `SIGKILL` بعد 5 ثوانٍ)

### بروتوكول الاتصال

يستخدم ACP آلية **stdio** (الإدخال/الإخراج القياسي) للتواصل مع وكلاء CLI. يعمل البروتوكول كما يلي:

1. **إرسال المطالبة** — الكتابة إلى stdin مع سطر جديد
2. **انتظار الاستجابة** — القراءة من stdout حتى الخمول (ثانيتان من دون أي مخرجات)
3. **المهلة الزمنية** — 120 ثانية افتراضيًا (قابلة للتهيئة)

---

## مرجع API

### دوال السجل

#### `detectInstalledAgents()`

تكتشف جميع وكلاء CLI المثبّتين على النظام. تُخزَّن النتائج مؤقتًا لمدة 60 ثانية.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// القيمة المُعادة: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // مثل "codex" و"claude"
  name: string; // اسم العرض
  binary: string; // اسم الملف الثنائي المراد تشغيله
  versionCommand: string; // أمر اكتشاف الإصدار
  version: string | null; // الإصدار المكتشف (null إذا لم يكن مثبّتًا)
  installed: boolean; // ما إذا كان الوكيل مثبّتًا
  providerAlias: string; // معرّف المزوّد في OmniRoute
  spawnArgs: string[]; // الوسائط التي تُمرّر عند التشغيل
  protocol: "stdio" | "http"; // بروتوكول الاتصال
  isCustom?: boolean; // ما إذا كان هذا وكيلاً مخصصًا يعرّفه المستخدم
}
```

#### `getAvailableAgents()`

تحصل فقط على الوكلاء المثبّتين والمتاحين لـ ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// القيمة المُعادة: CliAgentInfo[] (الوكلاء المثبّتون فقط)
```

#### `getAgentById(id)`

تحصل على وكيل محدد بواسطة المعرّف.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// القيمة المُعادة: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

تعيّن تعريفات الوكلاء المخصصين من الإعدادات.

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

### دوال المدير

#### `acpManager.spawn(agentId, binary, args, env)`

تشغّل عملية جديدة لوكيل CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* متغيرات بيئة مخصصة */
});
// القيمة المُعادة: AcpSession
```

**معرّفات الوكلاء المسموح بها**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

ترسل مطالبة إلى وكيل CLI وتجمع الاستجابة.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // مهلة مدتها دقيقتان
);
// القيمة المُعادة: Promise<string>
```

#### `acpManager.kill(sessionId)`

تنهي جلسة وتجري عملية التنظيف.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// القيمة المُعادة: boolean
```

#### `acpManager.getActiveSessions()`

تحصل على جميع الجلسات النشطة.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// القيمة المُعادة: AcpSession[]
```

#### `acpManager.killAll()`

تنهي جميع الجلسات.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### واجهة الجلسة

```typescript
interface AcpSession {
  id: string; // معرّف الجلسة الفريد
  agentId: string; // معرّف الوكيل (مثل "claude")
  process: ChildProcess; // مقبض العملية الفرعية
  alive: boolean; // ما إذا كانت العملية قيد التشغيل
  stdoutBuffer: string; // مخزن stdout المؤقت المتراكم
  stderrBuffer: string; // مخزن stderr المؤقت المتراكم
  createdAt: Date; // الطابع الزمني للإنشاء
}
```

### الأحداث

يوسّع `AcpManager` الصنف `EventEmitter` ويصدر الأحداث التالية:

#### `stdout`

يُصدر عندما يكتب وكيل CLI إلى stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

يُصدر عندما يكتب وكيل CLI إلى stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

يُصدر عند انتهاء عملية وكيل CLI.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

يُصدر عند حدوث خطأ في عملية وكيل CLI.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## الإعداد

### متغيرات البيئة

يرث ACP جميع متغيرات البيئة من العملية الأم، ويمكن توسيعها بمتغيرات بيئة مخصصة:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### وسائط التشغيل

يمتلك كل وكيل وسائط تشغيل افتراضية محددة في السجل. يمكنك تجاوزها:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### المُهل الزمنية

المهلة الزمنية الافتراضية للموجّه هي **120 ثانية** (دقيقتان). يمكنك تجاوزها:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 دقائق
```

### ذاكرة التخزين المؤقت للاكتشاف

يتم تخزين نتائج اكتشاف الوكلاء مؤقتًا لمدة **60 ثانية** لتجنب عمليات فحص نظام الملفات المكلفة. لفرض التحديث:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## الأمان

### منع حقن الأوامر

يتحقق ACP من صحة أوامر الإصدار لمنع هجمات حقن الأوامر:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

يتم رفض أوامر الإصدار التي تحتوي على هذه المحارف:

- `;` — فاصل أوامر
- `&` — عملية في الخلفية
- `|` — أنبوب
- `<`, `>` — إعادة توجيه
- `` ` `` — استبدال الأوامر
- `$` — توسيع المتغيرات
- `\r`, `\n` — فواصل الأسطر

### التحقق من اسم الملف الثنائي

يتحقق ACP من تطابق الملف الثنائي لأمر الإصدار مع اسم الملف الثنائي المتوقع (ما لم يكن وكيلًا مخصصًا).

### عزل العمليات

تعمل كل جلسة ACP في عملية فرعية مستقلة. يتم إنهاء العملية عند انتهاء الجلسة أو تجاوز مهلتها الزمنية.

---

## الأداء

### أداء الاكتشاف

- **الاستدعاء الأول**: ~50-200ms (يشغّل أمر `version` لكل وكيل)
- **الاستدعاءات المخزنة مؤقتًا**: <1ms (تُعاد من ذاكرة التخزين المؤقت)
- **مدة صلاحية ذاكرة التخزين المؤقت**: 60 ثانية

### أداء الموجّه

- **التشغيل**: ~50-100ms
- **إرسال الموجّه**: ~10-50ms
- **انتظار الاستجابة**: يعتمد على وكيل CLI (عادةً من ثانية واحدة إلى 30 ثانية)
- **الإنهاء**: ~5 ثوانٍ (SIGTERM) + فوري (SIGKILL)

### استخدام الموارد

- **الذاكرة لكل جلسة**: ~10-50MB (تعتمد على وكيل CLI)
- **وحدة المعالجة المركزية**: استخدام ضئيل (مقيّد بعمليات الإدخال/الإخراج)
- **القرص**: لا شيء

---

## استكشاف الأخطاء وإصلاحها

### خطأ "Unknown agent"

**المشكلة**: تطرح `acpManager.spawn()` الخطأ `Unknown agent: <id>`

**الحل**: يُسمح فقط بهذه الوكلاء في `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

يجب تشغيل الوكلاء الآخرين يدويًا أو عبر تعريفات الوكلاء المخصصة.

### خطأ "Session not alive"

**المشكلة**: تطرح `acpManager.sendPrompt()` الخطأ `Session ${sessionId} is not alive`

**الحل**: ربما انتهت الجلسة أو تم إنهاؤها. تحقق من حالة الجلسة:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // أعد تشغيل الجلسة
  acpManager.spawn("claude", "claude", [], {});
}
```

### خطأ "ACP timeout"

**المشكلة**: تطرح `acpManager.sendPrompt()` الخطأ `ACP timeout after 120000ms`

**الحل**: زد المهلة الزمنية:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 دقائق
```

### لم يتم اكتشاف CLI

**المشكلة**: لا تعثر `detectInstalledAgents()` على CLI الخاص بك

**الحلول**:

1. **تحقق من PATH**: تأكد من وجود CLI في PATH الخاص بنظامك
2. **تحقق من أمر الإصدار**: شغّل `claude --version` يدويًا
3. **تحقق من الأذونات**: تأكد من أن CLI قابل للتنفيذ
4. **وكيل مخصص**: أضف تعريف وكيل مخصص لواجهات CLI غير القياسية

### تم رفض الإذن

**المشكلة**: يتعذر على ACP تنفيذ CLI

**الحلول**:

1. **تحقق من أذونات الملف**: `chmod +x /usr/local/bin/claude`
2. **تحقق من الملكية**: تأكد من أن OmniRoute لديه أذونات القراءة/التنفيذ
3. **تحقق من SELinux/AppArmor**: قد يمنع تشغيل العمليات

---

## أمثلة

### المثال 1: تشغيل Claude Code واستخدامه

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// اكتشاف الوكلاء المثبّتين
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // بدء جلسة جديدة
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // إرسال مطالبة
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // التنظيف
  acpManager.kill(session.id);
}
```

### المثال 2: الاكتشاف التلقائي مع خيار احتياطي

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// تجربة Claude أولًا، واستخدام Codex كخيار احتياطي
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

### المثال 3: وكيل مخصّص

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// تسجيل وكيل CLI مخصّص
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

// ستتضمن detectInstalledAgents() الآن "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## ما التالي؟

- **[مرجع API](../reference/API_REFERENCE.md)** — نقاط نهاية REST API
- **[مرجع موفّري الخدمة](../reference/PROVIDER_REFERENCE.md)** — جميع موفّري الخدمة البالغ عددهم 352
- **[خادم MCP](./MCP-SERVER.md)** — تكامل Model Context Protocol
- **[خادم A2A](./A2A-SERVER.md)** — بروتوكول التواصل بين الوكلاء
- **[الوكيل السحابي](./CLOUD_AGENT.md)** — وكلاء قائمون على السحابة

---

## المرجع

- [مشروع AionUi](https://github.com/iOfficeAI/AionUi) — مصدر الإلهام للاكتشاف التلقائي في ACP
- [الشيفرة المصدرية لـ ACP](../../src/lib/acp/) — تفاصيل التنفيذ
  - `manager.ts` — إدارة دورة حياة العمليات
  - `registry.ts` — اكتشاف الوكلاء وتسجيلهم
  - `index.ts` — تصديرات API العامة
