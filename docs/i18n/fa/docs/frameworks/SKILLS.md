# Skills Framework (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **منبع حقیقت:** `src/lib/skills/` و `src/app/api/skills/`
> **آخرین بهروزرسانی:** 2026-06-28 — v3.8.40

OmniRoute یک چارچوب توسعهپذیر برای مهارتها ارائه میکند که به مدلهای زبانی (و اپراتورها) اجازه میدهد قابلیتهای قابلاستفادهٔ مجدد را ترکیب کنند — از خواندن فایلسیستم و درخواستهای HTTP گرفته تا اجرای کد در محیط ایزوله و مهارتهای منتخب بازارچه.

هر مهارت، یک واحد کاری نسخهبندیشده و تعریفشده با schema است. OmniRoute میتواند مهارتها را بهصورت تعریف ابزار در درخواستهای خروجی تزریق کند، فراخوانیهای ابزار بازگشتی از مدل را رهگیری کند، handler متناظر را اجرا کند و نتیجه را دوباره به مدل بازگرداند تا مکالمه ادامه یابد. مدل هرگز پیادهسازی را نمیبیند — فقط رابط ابزار را مشاهده میکند.

---

## مهارتهای عامل در برابر مهارتهای Omni

OmniRoute دارای دو سیستم مهارت متمایز اما مکمل است:

| بُعد           | **مهارتهای Omni** (این سند)                                        | **مهارتهای عامل**                                                                                                     |
| :------------- | :----------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| هدف            | تزریق ابزار LLM + اجرای ایزولهشده                                  | کاتالوگ SKILL.md برای کشف و استفاده توسط عاملهای خارجی                                                                |
| منبع حقیقت     | `src/lib/skills/` + بازارچه                                        | `src/lib/agentSkills/` + دایرکتوری `skills/`                                                                          |
| حالت زمان اجرا | تزریق در درخواستهای خروجی و اجرا هنگام رخدادهای فراخوانی ابزار     | کاتالوگ ایستای markdown + نقاط پایانی کشف REST/MCP/A2A                                                                |
| استفادهکننده   | خود OmniRoute (مسیریابی ترکیبی، فراخوانیهای ورودی LLM)             | عاملهای خارجی، کلاینتهای MCP و هماهنگکنندههای A2A                                                                     |
| تعداد          | متغیر (وابسته به بازارچه)                                          | 45 ورودی کاتالوگ (23 مورد API + 21 مورد CLI + 1 مورد پیکربندی)                                                        |
| قالب           | `SkillDefinition` همراه با schema ابزار + handler                  | frontmatter در `SKILL.md` + بدنهٔ markdown                                                                            |
| کشف            | REST در `/api/skills/*` + ابزارهای MCP با نام `omniroute_skills_*` | REST در `/api/agent-skills/*` + ابزارهای MCP با نام `omniroute_agent_skills_*` + فرمان A2A با نام `list-capabilities` |

**مهارتهای Omni** موتور اجرا هستند — آنها مشخص میکنند وقتی یک LLM ابزاری را فراخوانی میکند، OmniRoute _چه کارهایی میتواند انجام دهد_.

**مهارتهای عامل** کاتالوگ مستندات هستند — آنها با استفاده از فایلهای ساختاریافتهٔ SKILL.md که میتوان مستقیماً در promptهای عامل قرار داد، برای عاملهای خارجی توضیح میدهند که _چگونه از_ REST API و CLI مربوط به OmniRoute استفاده کنند.

برای اطلاعات مربوط به کاتالوگ مهارتهای عامل، مولد، ابزارهای MCP و مهارت A2A، به [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) مراجعه کنید.

---

## مفاهیم

### منابع مهارت

سه منبع مهارت در یک registry مشترک همزمان وجود دارند:

1. **مهارتهای داخلی** (`src/lib/skills/builtins.ts`) — همراه با OmniRoute عرضه میشوند. موارد رایج را پوشش میدهند:
   - `file_read`، `file_write` — فضای کاری ایزوله بهازای هر کلید API در `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — درخواست HTTP خروجی از طریق `safeOutboundFetch` با `guard: "public-only"`
   - `web_search` — ارائهدهندهٔ جستوجوی قابلتعویض همراه با cache (`executeWebSearch`)
   - `eval_code` — اجرای `node` یا `python` در محیط ایزولهٔ Docker
   - `execute_command` — فرمان shell در محیط ایزولهٔ Docker
   - `browser` — زیرساخت مبتنی بر Playwright که بهطور پیشفرض غیرفعال است (`builtin/browser.ts`)
2. **SkillsMP** (بازارچهٔ OmniRoute) — از `https://skillsmp.com/api/v1/skills/search` دریافت میشود. به `skillsmpApiKey` در تنظیمات نیاز دارد.
3. **SkillsSH** (کاتالوگ انجمن `skills.sh`) — از `https://skills.sh/api/search` دریافت میشود. به احراز هویت نیاز ندارد؛ محتوای SKILL.md از GitHub raw دریافت میشود.

یک «ارائهدهندهٔ فعال» واحد تعیین میکند داشبورد از کدام کاتالوگ نصب انجام دهد (`src/lib/skills/providerSettings.ts`). آن را از مسیر **تنظیمات ← حافظه و مهارتها** تغییر دهید. پیشفرض: `skillsmp`.

### هویت مهارت

کلید مهارتها در registry درونحافظهای (`src/lib/skills/registry.ts`) بهشکل `name@version` است. نسخه باید semver باشد (`^\d+\.\d+\.\d+$`). تابع `resolveVersion()` محدودیتهای `^`، `~`، `>`، `>=`، `<`، `<=`، `==` و تطبیق دقیق را درک میکند.

### حالت مهارت

هر مهارت دارای یک حالت زمان اجرا است که زمان تزریق آن را کنترل میکند:

| حالت   | رفتار                                                                                                       |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| `on`   | همیشه بهصورت تعریف ابزار تزریق میشود                                                                        |
| `off`  | هرگز تزریق نمیشود و هرگز قابلاجرا نیست                                                                      |
| `auto` | براساس درخواست ورودی امتیازدهی میشود؛ فقط در صورتی تزریق میشود که امتیاز ≥ `AUTO_MIN_SCORE` باشد (پیشفرض 3) |

`auto` حالت پیشفرض مهارتهای نصبشده از بازارچه است. ترکیب `enabled=true` و `mode="off"` بهمعنای «ثبتشده اما غیرفعال» است — تغییر `enabled` از طریق ستون قدیمی، مقدار `mode` را نیز بهروزرسانی میکند تا مسیرهای کد قدیمی سازگار باقی بمانند (`src/app/api/skills/[id]/route.ts`).

### وضعیت (اجراها)

اجرای مهارتها در جدول `skill_executions` با وضعیتهای زیر ردیابی میشود (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache مربوط به Registry

`SkillRegistry` یک singleton با cache دارای TTL شصتثانیهای است (`registry.ts:14`). تابع `loadFromDatabase()` idempotent است و فراخوانیهای همزمان را از طریق `pendingLoad` حذف میکند. هر عملیات نوشتن (`register`/`unregister`/`unregisterById`) cache را نامعتبر میکند. نسخهها را از طریق `getSkillVersions(name)` و `resolveVersion(name, constraint)` جستوجو کنید.

### تزریق آگاه از ارائهدهنده

تابع `injectSkills()` در `src/lib/skills/injection.ts` نقطهٔ ورود برای تبدیل مهارتهای ثبتشده به تعریف ابزارهای مختص هر ارائهدهنده است:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

نام ابزار بهصورت `name@version` کدگذاری میشود تا وقتی مدل آن را فراخوانی میکند، کنترلکننده بتواند نسخهٔ مناسب را انتخاب کند.

### امتیازدهی AUTO

وقتی `mode="auto"` باشد، هر مهارت کاندید بر اساس زمینهٔ درخواست امتیازدهی میشود (`scoreAutoSkill()` در `injection.ts`):

| سیگنال                                                                 | امتیاز            |
| ---------------------------------------------------------------------- | ----------------- |
| نام مهارت عیناً در زمینه ظاهر شود                                      | +6                |
| هر توکن نام با یک توکن زمینه مطابقت داشته باشد                         | +2                |
| هر زیررشتهٔ برچسب با زمینه مطابقت داشته باشد                           | +3                |
| هر توکن توضیحات با زمینه مطابقت داشته باشد                             | +1                |
| دلیل پسزمینه با یک توکن نام مطابقت داشته باشد                          | +2 بهازای هر توکن |
| دلیل پسزمینه با یک برچسب مطابقت داشته باشد                             | +2 بهازای هر توکن |
| راهنمای ارائهدهنده در برچسبها با ارائهدهندهٔ درخواست مطابقت داشته باشد | +2 / −2           |

حداکثر `AUTO_MAX_SKILLS = 5` مهارت برتر با `score >= AUTO_MIN_SCORE = 3` تزریق میشوند. در صورت تساوی، ابتدا `installCount` (نزولی) و سپس نام بهترتیب حروف الفبا ملاک قرار میگیرد (`injection.ts:225-235`).

### رهگیری فراخوانی ابزار

`handleToolCallExecution()` در `src/lib/skills/interception.ts` پس از اینکه سرویس بالادستی پاسخی حاوی فراخوانی ابزار برمیگرداند، توسط کنترلکنندهٔ چت فراخوانی میشود:

1. `extractToolCalls()` ساختارهای مختص هر ارائهدهنده را میخواند (OpenAI `tool_calls` / Responses `function_call`، Anthropic `tool_use`، Gemini `functionCalls`).
2. نامهای مستعار ابزارهای داخلی (برای مثال `omniroute_web_search` → `web_search`) ابتدا تفکیک میشوند. کنترلکنندههای داخلی بهصورت درونخطی اجرا میشوند.
3. هر مورد دیگری از طریق `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` هدایت میشود.
4. نتایج در مکان مناسب به پاسخ بازگردانده میشوند — آیتمهای `tool_results`، آیتمهای `function_call_output` یا بلوکهای `tool_result` متعلق به Anthropic.

مقدار `customSkillExecutionEnabled` در زمینهٔ اجرا را میتوان روی `false` تنظیم کرد تا فقط رهگیری داخلی مجاز باشد (این حالت توسط مسیرهای درخواستی استفاده میشود که کنترلکنندههای تعریفشده توسط کاربر را صراحتاً غیرفعال میکنند).

---

## سندباکس Docker

مسیرهای کد غیرداخلی (`eval_code`، `execute_command`) از طریق `SandboxRunner` (`src/lib/skills/sandbox.ts`) درون Docker اجرا میشوند. هر کانتینر با گزینههای زیر راهاندازی میشود:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (وقتی readOnly=true است)
```

مقادیر پیشفرض (`SandboxRunner.DEFAULT_CONFIG`):

| فیلد             | مقدار پیشفرض    | توضیحات                                                                 |
| ---------------- | --------------- | ----------------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | پیش از ارسال به `--cpus` بر 1000 تقسیم میشود                            |
| `memoryLimit`    | 256 MB          | محدودیت قطعی                                                            |
| `timeout`        | 30000 ms        | خاتمه نرم از طریق `SIGTERM` و سپس `docker kill`                         |
| `networkEnabled` | `false`         | به `--network none` تبدیل میشود                                         |
| `readOnly`       | `true`          | فایلسیستم ریشه فقطخواندنی است؛ `/tmp` و `/workspace` از نوع tmpfs هستند |

متدهای `SandboxRunner.kill(id)` و `killAll()` برای خاموشسازی در دسترساند؛ کانتینرهای در حال اجرا در `runningContainers: Map<string, ChildProcess>` ردیابی میشوند.

### متغیرهای محیطی سندباکس

از طریق `process.env` در `src/lib/skills/builtins.ts` پیکربندی میشوند:

| متغیر محیطی                       | مقدار پیشفرض      | کاربرد                                                                                           |
| --------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)  | سقف اندازه برای `file_read` و `file_write`                                                       |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`          | سقف اندازه بدنه پاسخ `http_request`                                                              |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`          | سقف stdout/stderr بازگرداندهشده به فراخواننده                                                    |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`           | مهلت زمانی پیشفرض برای فرمانهای سندباکسشده؛ با سقف 60 s                                          |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`           | کنترل اصلی خروجی شبکه. برای مجازکردن فعالسازی در هر فراخوانی، آن را روی `1` یا `true` تنظیم کنید |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (پایین را ببینید) | فهرست مجاز تصاویر Docker با جداکننده ویرگول                                                      |

تصاویر مجاز پیشفرض عبارتاند از: `alpine:3.20`، `node:22-alpine`، `python:3.12-alpine`. هر مورد افزودهشده از طریق `SKILLS_ALLOWED_SANDBOX_IMAGES` با مقادیر پیشفرض ادغام میشود؛ تصاویر ناشناخته توسط `normalizeImage()` رد میشوند.

> توجه: متغیر محیطی جداگانهای با نام `SKILLS_EXECUTION_TIMEOUT_MS` وجود ندارد. مهلت زمانی کنترلکننده خارج از سندباکس در `SkillExecutor` (`executor.ts:13`) بهصورت ثابت روی 30 s تنظیم شده است، اما میتوان آن را هنگام اجرا از طریق `skillExecutor.setTimeout(ms)` بازنویسی کرد.

### جداسازی فضای کاری

`file_read` و `file_write` هر مسیر را نسبت به فضای کاری مختص هر کلید API در `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` تفکیک میکنند. پیمایش مسیر (`..`) و بخشهای ممنوع (`.env`، `.git`، `.ssh`، `.omniroute`، `.codex`، `secrets`) پیش از هرگونه ورودی/خروجی دیسک رد میشوند.

### مقاومسازی HTTP

`http_request` (`builtins.ts:257`):

- فهرست مجاز متدها: `GET, HEAD, POST, PUT, PATCH, DELETE`
- هدرهای خروجی مسدودشده: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- تغییرمسیرها غیرفعالاند (`allowRedirect: false`)
- درخواستها از طریق `safeOutboundFetch` با `guard: "public-only"` مسیریابی میشوند (بازههای خصوصی/loopback مسدود هستند)
- پاسخ در `SKILLS_MAX_HTTP_RESPONSE_BYTES` قطع میشود؛ کلاینت مقدار `truncated: true` را مشاهده میکند

---

## اجراکنندهٔ ترکیبی (پیشنمایش)

فایل `src/lib/skills/hybrid.ts` یک `HybridExecutor` تعریف میکند که در هر فراخوانی بین اجرای `direct` (درونپردازهای) و `sandbox` تصمیم میگیرد و برای خطاهای مهلت زمانی/حافظه، مسیر تلاش مجدد `autoUpgrade` را در اختیار دارد. پیادهسازیهای متصلشدهٔ `directExecutor` / `sandboxRunner` صرفاً نمونههای موقت هستند (`executeDirect` و `executeInSandbox` اشیای جایگزین برمیگردانند) — این ماژول را قراردادی در حال توسعه در نظر بگیرید. اجرای واقعی همچنان از طریق `skillExecutor` + `SandboxRunner` انجام میشود.

---

## ذخیرهسازی

طرحواره در دو migration قرار دارد:

- `src/lib/db/migrations/016_create_skills.sql` — جدولهای پایهٔ `skills` و `skill_executions`، با ایندکسهایی روی `(api_key_id, name)` و `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — فیلدهای `mode`، `source_provider`، `tags` (JSON) و `install_count` را به `skills` اضافه میکند.

مقدار `skill_executions.status` در سطح پایگاه داده محدود شده است: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API مبتنی بر REST

همهٔ endpointها زیر `src/app/api/skills/` قرار دارند. endpointهای مدیریتی (`/api/skills`، `/api/skills/[id]`، `/api/skills/install`) از طریق `requireManagementAuth()` به **احراز هویت مدیریتی** نیاز دارند. جریانهای marketplace/نصب از `isAuthenticated()` سبکتر استفاده میکنند (نشست یا کلید API).

| Endpoint | متد | هدف |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | فهرستکردن مهارتهای ثبتشده. از `?q=`، `?mode=on                        | off | auto`، `?source=skillsmp | skillssh | local` و صفحهبندی پشتیبانی میکند |
| `/api/skills/[id]` | PUT | بهروزرسانی `enabled` یا `mode` |
| `/api/skills/[id]` | DELETE | لغو ثبت براساس شناسه |
| `/api/skills/install` | POST | نصب یک مهارت سفارشی (کد handler + طرحواره) |
| `/api/skills/marketplace` | GET | جستوجوی کاتالوگ SkillsMP (وقتی `q` خالی باشد، موارد محبوب پیشفرض را برمیگرداند) |
| `/api/skills/marketplace/install` | POST | نصب یک مهارت SkillsMP (نیازمند provider فعال = `skillsmp`) |
| `/api/skills/skillssh` | GET | جستوجوی کاتالوگ skills.sh (`?q=&limit=`، با سقف 100) |
| `/api/skills/skillssh/install` | POST | نصب یک مهارت skills.sh (نیازمند provider فعال = `skillssh`) |
| `/api/skills/executions` | GET | تاریخچهٔ صفحهبندیشدهٔ اجرا (`?apiKeyId=`) |
| `/api/skills/executions` | POST | اجرای موردی یک مهارت ثبتشده |

هنگامی که `settings.skillsEnabled === false` باشد، endpoint مربوط به `POST /api/skills/executions`، HTTP `503` را با `{ error: "Skills execution is disabled..." }` برمیگرداند (`executor.ts:42-45`). اپراتورها میتوانند کلید اصلی را از مسیر **تنظیمات ← هوش مصنوعی** تغییر دهند.

### نمونه: نصب یک مهارت سفارشی

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

رشتهٔ `handlerCode` یک **جستوجوی نام handler** است — نه کد قابل اجرا. اجراکننده آن را از طریق `skillExecutor.registerHandler(name, fn)` نگاشت میکند (`executor.ts:25`). نصبهای marketplace، متن SKILL.md را بهعنوان مستندات در این فیلد ذخیره میکنند و اجرا را از طریق فراخوانیهای ابزار تولیدشده توسط مدل هدایت میکنند. کد منبع دلخواه ارائهشده توسط کاربر با `eval` اجرا نمیشود.

---

## ابزارهای MCP

چهار ابزار MCP سطح مهارتها را پوشش میدهند (`open-sse/mcp-server/tools/skillTools.ts`). این ابزارها هنگام راهاندازی سرور MCP بهطور خودکار ثبت میشوند.

| ابزار                         | توضیحات                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| `omniroute_skills_list`       | فهرست مهارتها؛ فیلترهای اختیاری: `apiKeyId`، `name`، `enabled` |
| `omniroute_skills_enable`     | فعال یا غیرفعالکردن یک مهارت با استفاده از `skillId`           |
| `omniroute_skills_execute`    | اجرای یک مهارت با بار ورودی                                    |
| `omniroute_skills_executions` | تاریخچه اجرای اخیر (پیشفرض 50، حداکثر 100)                     |

برای تنظیم انتقال و تخصیص محدودهها، به [MCP-SERVER.md](./MCP-SERVER.md) مراجعه کنید.

---

## یکپارچهسازی A2A

فایل `src/lib/skills/a2a.ts` توصیفگر مهارت A2A با نام `memory_aware_routing` و یک تابع کمکی `registerA2ASkill(registry)` را صادر میکند. مهارتهای سفارشی A2A در `src/lib/a2a/skills/` قرار میگیرند و از طریق `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) توزیع میشوند. برای چرخه کامل عمر وظیفه، به [A2A-SERVER.md](./A2A-SERVER.md) مراجعه کنید.

---

## افزودن یک مهارت داخلی جدید

1. **مدیریتکننده را تعریف کنید** در `src/lib/skills/builtins.ts` (یا فایلی همسطح در `src/lib/skills/builtin/`). امضا: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **مسیر کد ایزولهشده؟** تابع `sandboxRunner.run(image, command, env, sandboxConfig({...}))` را فراخوانی کنید. از `normalizeImage()` برای بررسی فهرست مجاز استفاده کنید.
3. **مسیر فایلسیستم؟** پیش از دسترسی به دیسک، همیشه آن را از `resolveWorkspacePath(input, context)` عبور دهید.
4. **فراخوانی شبکه؟** از `safeOutboundFetch` با `guard: "public-only"` استفاده کنید؛ سرآیندها را با `sanitizeHeaders()` پاکسازی کنید.
5. **ثبت کنید** با افزودن ورودی به `builtinSkills` (یا فراخوانی مشابه `registerBrowserSkill(executor)` هنگام راهاندازی).
6. **نامهای مستعار ابزار داخلی را متصل کنید** (اختیاری) در `BUILTIN_TOOL_ALIASES` (`interception.ts:23`)، اگر مدل بالادستی نام متفاوتی تولید میکند.
7. **آزمونها** در `src/lib/skills/__tests__/` (Vitest).

---

## افزودن یک مهارت سفارشی (غیرداخلی)

1. مدیریتکننده را هنگام راهاندازی فرایند ثبت کنید:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. مهارت را از طریق `POST /api/skills/install` درج کنید (فیلد `handlerCode` باید با نام مدیریتکننده ثبتشده مطابقت داشته باشد).
3. با استفاده از `PUT /api/skills/[id]`، مقدار `mode` را به `on` یا `auto` تغییر دهید.

---

## نکات عملیاتی

- **کلید اصلی:** تنظیم `settings.skillsEnabled = false` تمام اجراها را مسدود میکند و در `/api/skills/executions` پاسخ HTTP `503` برمیگرداند. رجیستری همچنان بارگذاری میشود.
- **محدودسازی خروجی شبکه:** برای ایزولهسازی کامل سندباکس از شبکه، `SKILLS_SANDBOX_NETWORK_ENABLED` را تنظیمنشده نگه دارید (حالت پیشفرض). مقدار `networkEnabled: true` در هر فراخوانی همچنان به فعالبودن دروازه اصلی نیاز دارد.
- **مجازکردن ایمیجهای مشخص:** برای گسترش فهرست مجاز، `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` را تنظیم کنید.
- **ممیزی اجراها:** هر دو مورد `/dashboard/skills/executions` و `omniroute_skills_executions` جدول `skill_executions` را واکشی میکنند. اجراهای موفق شامل `durationMs` و اجراهای ناموفق شامل `errorMessage` هستند.
- **بیاعتبارسازی کش:** پس از ویرایش دستی پایگاه داده، `skillRegistry.invalidateCache()` را فراخوانی کنید؛ در غیر این صورت 60 ثانیه منتظر بمانید.
- **فضای کاری ناشناس:** وقتی `apiKeyId` خالی باشد، هش تمام فراخوانیها به فضای کاری یکسان `"anonymous"` نگاشت میشود — کدی که اشتراکگذاری را در نظر میگیرد باید همیشه یک کلید واقعی ارسال کند.

---

## چرخهٔ اجرای عملیات (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) یک **تکنمونه** است که همهٔ فراخوانیهای مهارت را مدیریت میکند. درک چرخهٔ حیات آن برای اشکالزدایی مهلتهای زمانی، تلاشهای مجدد و وضعیت اجرا ضروری است.

### چرخهٔ حیات ۵ مرحلهای

```
   execute() فراخوانی شد
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← در صف، هنوز شروع نشده است (ردیف پایگاه داده ایجاد شد)
  └──────┬──────┘
         │ شروع کنترلکننده
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← کنترلکننده با مهلت زمانی فراخوانی شد
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (مسیر دیگری وجود ندارد — توسط والد متوقف شده است)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   ردیف پایگاه داده با وضعیت، خروجی و durationMs بهروزرسانی شد
```

### پیکربندی پیشفرض

| تنظیم        | پیشفرض             | قابل پیکربندی از طریق                |
| ------------ | ------------------ | ------------------------------------ |
| `timeout`    | `30000` (۳۰ ثانیه) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                | `skillExecutor.setMaxRetries(count)` |

> **مهم**: اجراکننده یک تکنمونه است — فراخوانی `setTimeout()` بر همهٔ فراخوانیهای بعدی در سطح سراسری تأثیر میگذارد. مهلتهای زمانی مختص هر مهارت در حال حاضر پشتیبانی نمیشوند؛ اگر برای هر مهارت به مهلت زمانی متفاوتی نیاز دارید، فرایندهای جداگانه اجرا کنید یا از اجراکننده یک انشعاب ایجاد کنید.

### مقادیر وضعیت

از `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // در صف، هنوز شروع نشده است
  RUNNING = "running", // کنترلکننده فراخوانی شد
  SUCCESS = "success", // کنترلکننده خروجی معتبری بازگرداند
  ERROR = "error", // کنترلکننده یک استثنا پرتاب کرد
  TIMEOUT = "timeout", // از مهلت زمانی اجراکننده فراتر رفت
}
```

> **توجه**: وضعیت `TIMEOUT` در enum تعریف شده است، اما در پیادهسازی فعلی اجراکننده **عملاً در پایگاه داده نوشته نمیشود** — مهلتهای زمانی بهصورت `ERROR` با پیام `"Skill execution timed out"` ظاهر میشوند. enum وضعیت برای استفاده در آینده رزرو شده است.

### بررسی اجراها

```ts
import { skillExecutor } from "omniroute/skills/executor";

// دریافت یک اجرای مشخص بر اساس شناسه
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// فهرست کردن اجراهای اخیر برای یک کلید API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// شمارش کل اجراها
const total = skillExecutor.countExecutions("api-key-id");
```

### رفتار تلاش مجدد

تنظیم `maxRetries` ذخیره میشود، اما در حال حاضر توسط متد `execute()` اجراکننده **استفاده نمیشود** — این متد فقط یک تلاش انجام میدهد. مقدار `maxRetries` برای پیادهسازی آینده و برای هوکهایی که میخواهند آن را بخوانند، در دسترس قرار گرفته است.

در حال حاضر، تلاشهای مجدد باید درون خود کنترلکنندهٔ مهارت پیادهسازی شوند. مهارتهای
داخلی در اجراکننده ثبت میشوند (برای مثال `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` در `src/lib/skills/builtin/`)؛ هر کنترلکنندهای که
ثبت کنید میتواند حلقهٔ تلاش مجدد خودش را در بر بگیرد:

```ts
// درون یک کنترلکنندهٔ مهارت
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## جزئیات SkillMode

enum مربوط به `SkillMode` در مسیر (`src/lib/skills/types.ts`) کنترل میکند که مهارتها **چه زمانی و چگونه** فراخوانی شوند:

```ts
enum SkillMode {
  AUTO = "auto", // LLM تصمیم میگیرد چه زمانی مهارت را فراخوانی کند
  MANUAL = "manual", // فقط با درخواست صریح کاربر فراخوانی میشود
  HYBRID = "hybrid", // امتیازدهی AUTO بههمراه لغو دستی
}
```

> **نکته**: پایگاه کد `SkillMode` را بهشکل (AUTO/MANUAL/HYBRID) تعریف میکند، درحالیکه فیلد `Skill.mode` از ساختار متفاوتی (`"on" | "off" | "auto"`) استفاده میکند. این دو به یکدیگر مرتبطاند، اما یکسان نیستند — `SkillMode` برای سیاست اجراکننده است و `Skill.mode` برای فعالسازی هر مهارت بهصورت مجزا استفاده میشود.

### زمان استفاده از هر حالت

| حالت     | رفتار LLM                                                                                       | مورد استفاده                                    |
| -------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `AUTO`   | LLM میتواند هر زمان که لازم بداند مهارت را فراخوانی کند                                         | مهارتهای عمومی (خواندن فایلها، درخواستهای HTTP) |
| `MANUAL` | LLM نمیتواند مهارت را فراخوانی کند؛ فقط یک فراخوانی صریح API با `executeSkill` آن را اجرا میکند | عملیات حساس (نوشتن در پایگاه داده، پرداختها)    |
| `HYBRID` | LLM میتواند مهارت را پیشنهاد دهد؛ کاربر باید آن را تأیید کند                                    | مهارتهایی که اثر جانبی دارند، اما خطرناک نیستند |

### امتیازدهی AUTO

هنگامی که حالت `AUTO` فعال است، هر مهارت کاندید بر اساس بافت درخواست توسط
`scoreAutoSkill()` در `src/lib/skills/injection.ts` امتیازدهی میشود — یک سیستم
امتیازدهی عدد صحیح و افزایشی (تطابق نام مهارت، همپوشانی توکنهای نام/برچسب/توضیحات،
سرنخهای دلیل پسزمینه و امتیاز تشویقی/جریمه سرنخ ارائهدهنده). حداکثر
`AUTO_MAX_SKILLS = 5` مهارت برتر با `score >= AUTO_MIN_SCORE = 3` بهعنوان
ابزارهای قابل فراخوانی تزریق میشوند و تساویها ابتدا بر اساس `installCount` و سپس نام
شکسته میشوند. جدول کامل امتیازها را در بخش [**تولید شِمای ابزار ← امتیازدهی AUTO**](#auto-scoring)
که پیشتر در این سند آمده است، مشاهده کنید؛ هیچ آستانه اعشاری به سبک `0.6` و هیچ
امتیازدهی در `registry.ts` وجود ندارد.

---

## فهرست مهارتهای داخلی

OmniRoute همراه با مجموعهای منتخب از مهارتهای داخلی در `src/lib/skills/builtin/` ارائه میشود. رایجترین آنها عبارتاند از:

### مهارت خودکارسازی مرورگر

مهارت مرورگر (`src/lib/skills/builtin/browser.ts`) امکان خودکارسازی مرورگر بدون رابط گرافیکی را از طریق Playwright/Puppeteer فراهم میکند. **این مهارت پیادهسازی شده است، اما در فهرست پیشفرض مهارتها قرار ندارد** — برای استفاده از آن، افزونه مرورگر را جداگانه نصب کنید.

```ts
// در پیکربندی خود فعال کنید
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // همیشه به فراخوانی صریح نیاز داشته باشد
  allowedSkills: ["browser"],
  timeout: 60000, // ۶۰ ثانیه برای بارگذاری صفحات
  maxRetries: 1,
};
```

### سایر دستههای داخلی

| دسته             | مهارتها                                        | حالت   |
| ---------------- | ---------------------------------------------- | ------ |
| ورودی/خروجی فایل | `file_read`، `file_write`                      | AUTO   |
| HTTP             | `http_request`                                 | AUTO   |
| جستوجو           | `web_search`                                   | AUTO   |
| اجرای کد         | `eval_code` (JavaScript/Python در محیط ایزوله) | HYBRID |
| سیستم            | `execute_command` (اجرای CLI در محیط ایزوله)   | MANUAL |

### افزودن یک مهارت سفارشی

برای آگاهی از نحوه افزودن یک مهارت سفارشی از طریق سیستم افزونه، به [SDK افزونه و یکپارچهسازی مهارتها](./PLUGIN_SDK.md) مراجعه کنید.

---

## همچنین ببینید

- [MCP-SERVER.md](./MCP-SERVER.md) — ثبت ابزار MCP و روشهای انتقال
- [A2A-SERVER.md](./A2A-SERVER.md) — چرخهٔ حیات وظیفه در A2A و هدایت مهارت
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — مقدمهای برای کاربران
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — خط لولهٔ درخواست و نقشهٔ مؤلفهها
- منبع: `src/lib/skills/`، `src/app/api/skills/`، `open-sse/mcp-server/tools/skillTools.ts`
- آزمونها: `src/lib/skills/__tests__/integration.test.ts`
