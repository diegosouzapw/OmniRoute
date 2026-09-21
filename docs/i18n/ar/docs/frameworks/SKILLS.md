# Skills Framework (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **مصدر الحقيقة:** `src/lib/skills/` و`src/app/api/skills/`
> **آخر تحديث:** 2026-06-28 — v3.8.40

يوفّر OmniRoute إطار عمل قابلًا للتوسعة للمهارات، يتيح لنماذج اللغة (والمشغّلين) تركيب قدرات قابلة لإعادة الاستخدام — بدءًا من قراءة نظام الملفات وطلبات HTTP، وصولًا إلى تنفيذ التعليمات البرمجية ضمن بيئة معزولة ومهارات السوق المنتقاة.

المهارة هي وحدة عمل ذات إصدار ومحددة بواسطة مخطط. يستطيع OmniRoute حقن المهارات كتعريفات أدوات ضمن الطلبات الصادرة، واعتراض استدعاءات الأدوات العائدة من النموذج، وتشغيل المعالج المطابق، وإعادة تمرير النتيجة إلى النموذج كي تتمكن المحادثة من الاستمرار. لا يرى النموذج التنفيذ مطلقًا — بل واجهة الأداة فقط.

---

## مهارات الوكلاء مقابل مهارات Omni

يمتلك OmniRoute نظامين منفصلين لكن متكاملين للمهارات:

| البُعد             | **مهارات Omni** (هذا المستند)                                     | **مهارات الوكلاء**                                                                                                 |
| :----------------- | :---------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| الغرض              | حقن أدوات LLM + التنفيذ ضمن بيئة معزولة                           | كتالوج SKILL.md لتكتشفه الوكلاء الخارجية وتستخدمه                                                                  |
| مصدر الحقيقة       | `src/lib/skills/` + السوق                                         | `src/lib/agentSkills/` + دليل `skills/`                                                                            |
| وضع وقت التشغيل    | تُحقن في الطلبات الصادرة وتُنفّذ عند أحداث استدعاء الأدوات        | كتالوج Markdown ثابت + نقاط نهاية اكتشاف REST/MCP/A2A                                                              |
| الجهة المستخدمة له | OmniRoute نفسه (التوجيه المركّب، واستدعاءات LLM الواردة)          | الوكلاء الخارجية، وعملاء MCP، ومنسّقات A2A                                                                         |
| العدد              | متغير (يحدده السوق)                                               | 45 إدخالًا في الكتالوج (23 لـ API + 21 لـ CLI + 1 للإعدادات)                                                       |
| التنسيق            | `SkillDefinition` مع مخطط أداة + معالج                            | بيانات frontmatter في `SKILL.md` + محتوى Markdown                                                                  |
| الاكتشاف           | REST عبر `/api/skills/*` + أدوات MCP المسماة `omniroute_skills_*` | REST عبر `/api/agent-skills/*` + أدوات MCP المسماة `omniroute_agent_skills_*` + أمر A2A المسمى `list-capabilities` |

**مهارات Omni** هي محرك التنفيذ — فهي تحدد ما _يمكن لـ OmniRoute فعله_ عندما يستدعي LLM أداة.

**مهارات الوكلاء** هي كتالوج التوثيق — فهي تشرح للوكلاء الخارجية _كيفية استخدام_ واجهة REST API وCLI الخاصة بـ OmniRoute، من خلال ملفات SKILL.md منظّمة يمكن إدخالها مباشرةً ضمن موجّهات الوكلاء.

للاطلاع على كتالوج مهارات الوكلاء ومولّده وأدوات MCP ومهارة A2A، راجع [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## المفاهيم

### مصادر المهارات

تتعايش ثلاثة مصادر للمهارات في السجل نفسه:

1. **المهارات المضمّنة** (`src/lib/skills/builtins.ts`) — تأتي مع OmniRoute. وتغطي حالات الاستخدام الشائعة:
   - `file_read`، و`file_write` — مساحة عمل معزولة لكل مفتاح API ضمن `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — طلبات HTTP صادرة عبر `safeOutboundFetch` مع `guard: "public-only"`
   - `web_search` — مزوّد بحث قابل للاستبدال مع التخزين المؤقت (`executeWebSearch`)
   - `eval_code` — تنفيذ `node` أو `python` داخل بيئة Docker معزولة
   - `execute_command` — أمر shell يُنفّذ داخل بيئة Docker معزولة
   - `browser` — بنية أساسية مدعومة بـ Playwright، ومعطلة افتراضيًا (`builtin/browser.ts`)
2. **SkillsMP** (سوق OmniRoute) — تُجلب من `https://skillsmp.com/api/v1/skills/search`. تتطلب `skillsmpApiKey` ضمن الإعدادات.
3. **SkillsSH** (كتالوج مجتمع `skills.sh`) — تُجلب من `https://skills.sh/api/search`. لا تتطلب مصادقة؛ ويُجلب محتوى SKILL.md الخام من GitHub.

يتحكم «مزوّد نشط» واحد في الكتالوج الذي تثبّت منه لوحة المعلومات (`src/lib/skills/providerSettings.ts`). بدّله ضمن **الإعدادات ← الذاكرة والمهارات**. القيمة الافتراضية: `skillsmp`.

### هوية المهارة

تُفهرس المهارات بواسطة `name@version` في السجل الموجود في الذاكرة (`src/lib/skills/registry.ts`). يجب أن يكون الإصدار بتنسيق semver (`^\d+\.\d+\.\d+$`). تفهم `resolveVersion()` القيود `^`، و`~`، و`>`، و`>=`، و`<`، و`<=`، و`==`، وقيود المطابقة التامة.

### وضع المهارة

لكل مهارة وضع وقت تشغيل يتحكم في توقيت حقنها:

| الوضع  | السلوك                                                                                                |
| ------ | ----------------------------------------------------------------------------------------------------- |
| `on`   | تُحقن دائمًا كتعريف أداة                                                                              |
| `off`  | لا تُحقن مطلقًا ولا يمكن تنفيذها                                                                      |
| `auto` | تُقيّم مقارنةً بالطلب الوارد؛ ولا تُحقن إلا إذا كانت النتيجة ≥ `AUTO_MIN_SCORE` (القيمة الافتراضية 3) |

`auto` هو الوضع الافتراضي للمهارات المثبّتة من السوق. يعني اجتماع `enabled=true` و`mode="off"` أنها «مسجّلة لكنها غير نشطة» — كما يؤدي تبديل `enabled` عبر العمود القديم إلى تحديث `mode` حتى تظل مسارات التعليمات البرمجية القديمة متسقة (`src/app/api/skills/[id]/route.ts`).

### الحالة (عمليات التنفيذ)

يُتتبّع تنفيذ المهارات في جدول `skill_executions` باستخدام الحالات التالية (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### ذاكرة السجل المؤقتة

`SkillRegistry` هو مثيل مفرد بذاكرة مؤقتة ذات مدة صلاحية تبلغ 60 ثانية (`registry.ts:14`). الدالة `loadFromDatabase()` متكررة آمنة وتزيل تكرار الاستدعاءات المتزامنة عبر `pendingLoad`. تؤدي أي عملية كتابة (`register`/`unregister`/`unregisterById`) إلى إبطال الذاكرة المؤقتة. ابحث عن الإصدارات عبر `getSkillVersions(name)` و`resolveVersion(name, constraint)`.

### الحقن المدرك للمزوّد

الدالة `injectSkills()` في `src/lib/skills/injection.ts` هي نقطة الدخول التي تحوّل المهارات المسجّلة إلى تعريفات أدوات خاصة بكل مزوّد:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

يُرمَّز اسم الأداة بصيغة `name@version` حتى يتمكن المعالج من اختيار الإصدار الصحيح عندما يستدعيه النموذج.

### احتساب نقاط AUTO

عندما تكون `mode="auto"`، تُقيَّم كل مهارة مرشحة مقارنةً بسياق الطلب (`scoreAutoSkill()` في `injection.ts`):

| الإشارة                                      | النقاط     |
| -------------------------------------------- | ---------- |
| ظهور اسم المهارة حرفيًا في السياق            | +6         |
| تطابق كل رمز من الاسم مع رمز في السياق       | +2         |
| تطابق كل سلسلة فرعية من الوسوم مع السياق     | +3         |
| تطابق كل رمز من الوصف مع السياق              | +1         |
| تطابق سبب الخلفية مع رمز من الاسم            | +2 لكل رمز |
| تطابق سبب الخلفية مع وسم                     | +2 لكل رمز |
| تطابق تلميح المزوّد في الوسوم مع مزوّد الطلب | +2 / −2    |

تُحقن أفضل `AUTO_MAX_SKILLS = 5` مهارات التي تحقق `score >= AUTO_MIN_SCORE = 3`. ويُفصل في حالات التعادل باستخدام `installCount` (تنازليًا)، ثم اسم المهارة بالترتيب الأبجدي (`injection.ts:225-235`).

### اعتراض استدعاءات الأدوات

تُستدعى `handleToolCallExecution()` في `src/lib/skills/interception.ts` بواسطة معالج المحادثة بعد أن تُرجع الخدمة المصدر استجابةً تستدعي أداة:

1. تقرأ `extractToolCalls()` التنسيقات الخاصة بكل مزوّد (OpenAI ‏`tool_calls` / ‏Responses ‏`function_call`، وAnthropic ‏`tool_use`، وGemini ‏`functionCalls`).
2. تُحل أولًا الأسماء البديلة للأدوات المضمّنة (مثلًا `omniroute_web_search` → `web_search`). وتُشغَّل المعالجات المضمّنة مباشرةً.
3. يُوجَّه أي شيء آخر عبر `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. تُدمج النتائج مجددًا في الاستجابة — كعناصر `tool_results` أو `function_call_output` أو كتل `tool_result` الخاصة بـAnthropic، حسب الاقتضاء.

يمكن تعيين `customSkillExecutionEnabled` في سياق التنفيذ إلى `false` للسماح باعتراض الأدوات المضمّنة فقط (ويُستخدم ذلك في مسارات الطلبات التي تُعطّل صراحةً المعالجات التي يعرّفها المستخدم).

---

## بيئة Docker المعزولة

تُشغَّل مسارات التعليمات البرمجية غير المضمّنة (`eval_code`، و`execute_command`) داخل Docker عبر `SandboxRunner` (`src/lib/skills/sandbox.ts`). وتُشغَّل كل حاوية باستخدام:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (عندما تكون readOnly=true)
```

القيم الافتراضية (`SandboxRunner.DEFAULT_CONFIG`):

| الحقل            | القيمة الافتراضية | ملاحظات                                                         |
| ---------------- | ----------------- | --------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)   | تُقسَّم على 1000 قبل تمريرها إلى `--cpus`                       |
| `memoryLimit`    | 256 MB            | حد صارم                                                         |
| `timeout`        | 30000 ms          | إيقاف ميسّر عبر `SIGTERM` + `docker kill`                       |
| `networkEnabled` | `false`           | تصبح `--network none`                                           |
| `readOnly`       | `true`            | نظام الملفات الجذري للقراءة فقط؛ `/tmp` و`/workspace` هما tmpfs |

تُتاح `SandboxRunner.kill(id)` و`killAll()` لإيقاف التشغيل؛ ويجري تتبّع الحاويات قيد التشغيل في `runningContainers: Map<string, ChildProcess>`.

### متغيرات بيئة صندوق العزل

تُضبط عبر `process.env` في `src/lib/skills/builtins.ts`:

| متغير البيئة                      | القيمة الافتراضية | الغرض                                                                                          |
| --------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)  | الحد الأقصى لـ`file_read` و`file_write`                                                        |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`          | الحد الأقصى لمحتوى استجابة `http_request`                                                      |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`          | الحد الأقصى لـstdout/stderr المُعاد إلى المستدعي                                               |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`           | المهلة الافتراضية للأوامر المعزولة؛ بحد أقصى 60 s                                              |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`           | بوابة رئيسية للاتصالات الصادرة. اضبطها على `1` أو `true` للسماح بالتفعيل الاختياري لكل استدعاء |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (انظر أدناه)      | قائمة مسموح بها من صور Docker مفصولة بفواصل                                                    |

الصور المسموح بها افتراضيًا: `alpine:3.20`، و`node:22-alpine`، و`python:3.12-alpine`. تُدمج أي إضافات عبر `SKILLS_ALLOWED_SANDBOX_IMAGES` مع القيم الافتراضية؛ وترفض `normalizeImage()` الصور غير المعروفة.

> ملاحظة: لا يوجد متغير بيئة منفصل باسم `SKILLS_EXECUTION_TIMEOUT_MS`. مهلة معالج التنفيذ غير المعزول مضبوطة بشكل ثابت على 30 s في `SkillExecutor` (`executor.ts:13`)، ولكن يمكن تجاوزها في وقت التشغيل عبر `skillExecutor.setTimeout(ms)`.

### عزل مساحة العمل

تحلّ `file_read` و`file_write` كل مسار نسبةً إلى مساحة عمل مخصّصة لكل مفتاح API في `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. ويُرفض اجتياز المسارات (`..`) والمقاطع المحظورة (`.env`، و`.git`، و`.ssh`، و`.omniroute`، و`.codex`، و`secrets`) قبل أي عمليات إدخال/إخراج على القرص.

### تحصين HTTP

`http_request` (`builtins.ts:257`):

- قائمة الطرق المسموح بها: `GET, HEAD, POST, PUT, PATCH, DELETE`
- ترويسات الاتصالات الصادرة المحظورة: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- عمليات إعادة التوجيه معطّلة (`allowRedirect: false`)
- تُوجَّه عبر `safeOutboundFetch` باستخدام `guard: "public-only"` (تُحظر نطاقات الشبكات الخاصة/الاسترجاعية)
- تُقتطع الاستجابة عند `SKILLS_MAX_HTTP_RESPONSE_BYTES`؛ ويرى العميل `truncated: true`

---

## المنفّذ الهجين (معاينة)

يعرّف `src/lib/skills/hybrid.ts` منفّذًا باسم `HybridExecutor` يختار لكل استدعاء بين التنفيذ `direct` (داخل العملية) والتنفيذ `sandbox`، مع مسار لإعادة المحاولة عبر `autoUpgrade` عند حدوث أخطاء انتهاء المهلة أو الذاكرة. تُعدّ تطبيقات `directExecutor` / `sandboxRunner` المضمّنة حاليًا مجرد هياكل أولية (`executeDirect` و`executeInSandbox` يعيدان كائنات نائبة) — لذا تعامل مع هذه الوحدة على أنها عقد قيد الإنشاء. لا يزال التنفيذ الفعلي يمر عبر `skillExecutor` و`SandboxRunner`.

---

## التخزين

يوجد المخطط في عمليتي ترحيل:

- `src/lib/db/migrations/016_create_skills.sql` — جدولا `skills` و`skill_executions` الأساسيان، مع فهارس على `(api_key_id, name)` و`(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — يضيف `mode` و`source_provider` و`tags` (JSON) و`install_count` إلى `skills`.

تُفرض قيود على `skill_executions.status` على مستوى قاعدة البيانات: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## واجهة REST API

توجد جميع نقاط النهاية ضمن `src/app/api/skills/`. تتطلب نقاط النهاية الإدارية (`/api/skills` و`/api/skills/[id]` و`/api/skills/install`) **مصادقة إدارية** عبر `requireManagementAuth()`. تستخدم تدفقات السوق/التثبيت آلية `isAuthenticated()` الأخف (جلسة أو مفتاح API).

| نقطة النهاية | الطريقة | الغرض |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | عرض المهارات المسجلة. يدعم `?q=` و`?mode=on                             | off | auto` و`?source=skillsmp | skillssh | local` والترقيم الصفحي |
| `/api/skills/[id]` | PUT | تحديث `enabled` أو `mode` |
| `/api/skills/[id]` | DELETE | إلغاء التسجيل حسب المعرّف |
| `/api/skills/install` | POST | تثبيت مهارة مخصصة (رمز المعالج + المخطط) |
| `/api/skills/marketplace` | GET | البحث في كتالوج SkillsMP (يعيد الخيارات الشائعة الافتراضية عندما تكون `q` فارغة) |
| `/api/skills/marketplace/install` | POST | تثبيت مهارة من SkillsMP (يتطلب أن يكون المزوّد النشط = `skillsmp`) |
| `/api/skills/skillssh` | GET | البحث في كتالوج skills.sh (`?q=&limit=`، بحد أقصى 100) |
| `/api/skills/skillssh/install` | POST | تثبيت مهارة من skills.sh (يتطلب أن يكون المزوّد النشط = `skillssh`) |
| `/api/skills/executions` | GET | سجل تنفيذ مرقّم صفحيًا (`?apiKeyId=`) |
| `/api/skills/executions` | POST | تنفيذ مهارة مسجلة عند الطلب |

تعيد نقطة النهاية `POST /api/skills/executions` حالة HTTP `503` مع `{ error: "Skills execution is disabled..." }` عندما تكون `settings.skillsEnabled === false` (`executor.ts:42-45`). يمكن للمشغّلين تبديل المفتاح الرئيسي من **الإعدادات ← الذكاء الاصطناعي**.

### مثال: تثبيت مهارة مخصصة

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

السلسلة النصية `handlerCode` هي **مرجع بحث عن اسم معالج** — وليست رمزًا قابلًا للتنفيذ. يربطها المنفّذ عبر `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). تخزّن عمليات التثبيت من السوق نص SKILL.md في هذا الحقل بوصفه توثيقًا، وتوجّه التنفيذ عبر استدعاءات أدوات مولّدة بواسطة النموذج. لا يُنفّذ المصدر العشوائي الذي يقدّمه المستخدم باستخدام eval.

---

## أدوات MCP

تغلّف أربع أدوات MCP واجهة المهارات (`open-sse/mcp-server/tools/skillTools.ts`). ويتم تسجيلها تلقائيًا عند تشغيل خادم MCP.

| الأداة                        | الوصف                                                                |
| ----------------------------- | -------------------------------------------------------------------- |
| `omniroute_skills_list`       | سرد المهارات، مع عوامل تصفية اختيارية: `apiKeyId` و`name` و`enabled` |
| `omniroute_skills_enable`     | تمكين/تعطيل مهارة باستخدام `skillId`                                 |
| `omniroute_skills_execute`    | تنفيذ مهارة باستخدام حمولة إدخال                                     |
| `omniroute_skills_executions` | سجلّ التنفيذات الأخيرة (الافتراضي 50، والحد الأقصى 100)              |

راجع [MCP-SERVER.md](./MCP-SERVER.md) لإعداد النقل وتعيينات النطاقات.

---

## تكامل A2A

يُصدّر `src/lib/skills/a2a.ts` واصف مهارة A2A المسمى `memory_aware_routing` ودالة المساعدة `registerA2ASkill(registry)`. توجد مهارات A2A المخصصة في `src/lib/a2a/skills/`، ويجري توجيهها عبر `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). راجع [A2A-SERVER.md](./A2A-SERVER.md) للاطلاع على دورة حياة المهمة كاملةً.

---

## إضافة مهارة مضمّنة جديدة

1. **عرّف المعالج** في `src/lib/skills/builtins.ts` (أو في ملف مجاور ضمن `src/lib/skills/builtin/`). التوقيع: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **هل مسار الشيفرة معزول؟** استدعِ `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. استخدم `normalizeImage()` للتحقق وفق قائمة السماح.
3. **هل يوجد مسار لنظام الملفات؟** مرّره دائمًا عبر `resolveWorkspacePath(input, context)` قبل التعامل مع القرص.
4. **هل توجد مكالمة شبكة؟** استخدم `safeOutboundFetch` مع `guard: "public-only"`، ونقِّ الترويسات عبر `sanitizeHeaders()`.
5. **سجّل المهارة** بإضافة الإدخال إلى `builtinSkills` (أو باستدعاء دالة على غرار `registerBrowserSkill(executor)` عند بدء التشغيل).
6. **اربط الأسماء البديلة للأدوات المضمّنة** (اختياري) في `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) إذا كان النموذج المصدر يُنتج اسمًا مختلفًا.
7. **الاختبارات** في `src/lib/skills/__tests__/` (Vitest).

---

## إضافة مهارة مخصصة (غير مضمّنة)

1. سجّل المعالج عند بدء العملية:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. أدرج المهارة عبر `POST /api/skills/install` (يجب أن يتطابق الحقل `handlerCode` مع اسم المعالج المسجّل).
3. بدّل `mode` إلى `on` أو `auto` عبر `PUT /api/skills/[id]`.

---

## نصائح تشغيلية

- **المفتاح الرئيسي:** تمنع `settings.skillsEnabled = false` جميع عمليات التنفيذ وتُرجع HTTP `503` على `/api/skills/executions`. ويستمر السجل في التحميل.
- **تقييد الاتصالات الصادرة:** أبقِ `SKILLS_SANDBOX_NETWORK_ENABLED` غير معيّن (الإعداد الافتراضي) لعزل بيئة الاختبار تمامًا عن الشبكة. ويظل `networkEnabled: true` لكل استدعاء متطلبًا لتمكين البوابة الرئيسية.
- **السماح بصور محددة:** عيّن `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` لتوسيع قائمة السماح.
- **تدقيق التنفيذات:** يستعلم كل من `/dashboard/skills/executions` و`omniroute_skills_executions` من `skill_executions`. تتضمن عمليات التشغيل الناجحة `durationMs`، بينما تتضمن حالات الفشل `errorMessage`.
- **إبطال ذاكرة التخزين المؤقت:** استدعِ `skillRegistry.invalidateCache()` بعد تعديلات قاعدة البيانات اليدوية؛ وإلا فانتظر 60 ثانية.
- **مساحة العمل المجهولة:** عندما يكون `apiKeyId` فارغًا، تُجزّأ جميع الاستدعاءات إلى مساحة العمل `"anonymous"` نفسها — ويجب على الشيفرة التي تراعي المشاركة أن تمرر دائمًا مفتاحًا حقيقيًا.

---

## دورة حياة التنفيذ (v3.8.16+)

يُعد `SkillExecutor` (`src/lib/skills/executor.ts`) كائنًا **فرديًا** يدير كل استدعاء لمهارة. ويُعد فهم دورة حياته أمرًا بالغ الأهمية لتصحيح مشكلات انتهاء المهلة وإعادة المحاولات وحالة التنفيذ.

### دورة الحياة ذات المراحل الخمس

```
   استدعاء execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← في قائمة الانتظار، لم يبدأ بعد (تم إنشاء صف في قاعدة البيانات)
  └──────┬──────┘
         │ بدء المعالج
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← تم استدعاء المعالج مع مهلة زمنية
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (لا يوجد مسار آخر — تم إنهاؤه بواسطة العملية الأصلية)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   تم تحديث صف قاعدة البيانات بالحالة والمخرجات وdurationMs
```

### الإعدادات الافتراضية

| الإعداد      | القيمة الافتراضية  | قابل للتهيئة عبر                     |
| ------------ | ------------------ | ------------------------------------ |
| `timeout`    | `30000` (30 ثانية) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                | `skillExecutor.setMaxRetries(count)` |

> **مهم**: المنفّذ كائن فردي — يؤثر استدعاء `setTimeout()` في جميع الاستدعاءات اللاحقة على مستوى التطبيق بأكمله. لا تتوفر حاليًا مهل زمنية خاصة بكل مهارة؛ إذا كنت تحتاج إلى مهل زمنية مختلفة لكل مهارة، فأرسل عمليات منفصلة أو أنشئ نسخة متفرعة من المنفّذ.

### قيم الحالة

من `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // في قائمة الانتظار، لم يبدأ بعد
  RUNNING = "running", // تم استدعاء المعالج
  SUCCESS = "success", // أعاد المعالج مخرجات صالحة
  ERROR = "error", // طرح المعالج استثناءً
  TIMEOUT = "timeout", // تجاوز المهلة الزمنية للمنفّذ
}
```

> **ملاحظة**: حالة `TIMEOUT` معرّفة في التعداد، لكنها **لا تُكتب فعليًا في قاعدة البيانات** بواسطة التنفيذ الحالي للمنفّذ — تظهر حالات انتهاء المهلة على هيئة `ERROR` مع الرسالة `"Skill execution timed out"`. حالة التعداد محجوزة للاستخدام مستقبلًا.

### فحص عمليات التنفيذ

```ts
import { skillExecutor } from "omniroute/skills/executor";

// الحصول على عملية تنفيذ محددة بواسطة المعرّف
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// عرض عمليات التنفيذ الأخيرة لمفتاح API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// حساب إجمالي عمليات التنفيذ
const total = skillExecutor.countExecutions("api-key-id");
```

### سلوك إعادة المحاولة

يُخزَّن إعداد `maxRetries`، لكنه **غير مستخدم حاليًا** بواسطة الدالة `execute()` التابعة للمنفّذ — فهي لا تُجري سوى محاولة واحدة. قيمة `maxRetries` متاحة للتنفيذ مستقبلًا وللخطافات التي تريد قراءتها.

في الوقت الحالي، يجب تنفيذ إعادة المحاولات داخل معالج المهارة نفسه. تُسجَّل
المهارات المضمّنة لدى المنفّذ (مثل `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` في `src/lib/skills/builtin/`)؛ ويمكن لأي معالج
تسجّله تضمين حلقة إعادة المحاولة الخاصة به:

```ts
// داخل معالج مهارة
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

## ‏SkillMode بالتفصيل

يتحكم تعداد `SkillMode` ‏(`src/lib/skills/types.ts`) في **متى وكيف** يتم استدعاء المهارات:

```ts
enum SkillMode {
  AUTO = "auto", // يقرر LLM متى يستدعي المهارة
  MANUAL = "manual", // لا تُستدعى إلا بطلب صريح من المستخدم
  HYBRID = "hybrid", // تقييم AUTO مع إمكانية التجاوز اليدوي
}
```

> **ملاحظة**: تعرّف قاعدة الشيفرة `SkillMode` ‏(AUTO/MANUAL/HYBRID)، بينما يستخدم الحقل `Skill.mode` بنية مختلفة (`"on" | "off" | "auto"`). كلاهما مرتبط بالآخر، لكنهما غير متطابقين — يُستخدم `SkillMode` لسياسة المنفّذ، بينما يُستخدم `Skill.mode` لتمكين كل مهارة على حدة.

### متى يُستخدم كل وضع

| الوضع    | سلوك LLM                                                                         | حالة الاستخدام                                           |
| -------- | -------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `AUTO`   | يمكن لـ LLM استدعاء المهارة عندما يراها ضرورية                                   | المهارات ذات الأغراض العامة (قراءة الملفات، وطلبات HTTP) |
| `MANUAL` | لا يمكن لـ LLM استدعاء المهارة؛ ولا يستدعيها سوى طلب API صريح إلى `executeSkill` | العمليات الحساسة (الكتابة في قواعد البيانات، والمدفوعات) |
| `HYBRID` | يمكن لـ LLM اقتراح المهارة؛ ويجب على المستخدم التأكيد                            | المهارات التي لها آثار جانبية لكنها ليست خطرة            |

### تقييم AUTO

عندما يكون وضع `AUTO` نشطًا، تُقيَّم كل مهارة مرشحة مقارنةً بسياق الطلب
بواسطة `scoreAutoSkill()` في `src/lib/skills/injection.ts` — باستخدام نظام نقاط
صحيحة تراكمي (مطابقة اسم المهارة، وتداخل رموز الاسم/الوسوم/الوصف،
وتلميحات أسباب الخلفية، ومكافأة/عقوبة تلميحات المزوّد). تُحقن أعلى
`AUTO_MAX_SKILLS = 5` مهارات ذات `score >= AUTO_MIN_SCORE = 3` كأدوات
قابلة للاستدعاء، وتُحسم حالات التعادل بواسطة `installCount` ثم الاسم. راجع جدول النقاط الكامل
في [**إنشاء مخطط الأدوات ← تقييم AUTO**](#auto-scoring) في موضع سابق من هذا
المستند؛ لا توجد عتبة عشرية بأسلوب `0.6` ولا يوجد تقييم في `registry.ts`.

---

## دليل المهارات المضمّنة

يأتي OmniRoute مع مجموعة منتقاة من المهارات المضمّنة في `src/lib/skills/builtin/`. وأكثرها شيوعًا:

### مهارة أتمتة المتصفح

توفر مهارة المتصفح (`src/lib/skills/builtin/browser.ts`) أتمتةً لمتصفح يعمل دون واجهة رسومية عبر Playwright/Puppeteer. **وهي منفّذة، لكنها غير مضمنة في دليل المهارات الافتراضي** — لاستخدامها، ثبّت إضافة المتصفح بشكل منفصل.

```ts
// فعّلها في إعداداتك
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // اطلب دائمًا استدعاءً صريحًا
  allowedSkills: ["browser"],
  timeout: 60000, // 60 ثانية لتحميل الصفحات
  maxRetries: 1,
};
```

### فئات مضمّنة أخرى

| الفئة               | المهارات                                         | الوضع  |
| ------------------- | ------------------------------------------------ | ------ |
| إدخال/إخراج الملفات | `file_read`, `file_write`                        | AUTO   |
| HTTP                | `http_request`                                   | AUTO   |
| البحث               | `web_search`                                     | AUTO   |
| تنفيذ الشيفرة       | `eval_code` ‏(JavaScript/Python ضمن بيئة معزولة) | HYBRID |
| النظام              | `execute_command` (تنفيذ CLI ضمن بيئة معزولة)    | MANUAL |

### إضافة مهارة مخصصة

راجع [حزمة SDK للإضافات وتكامل المهارات](./PLUGIN_SDK.md) لمعرفة كيفية إضافة مهارة مخصصة عبر نظام الإضافات.

---

## انظر أيضًا

- [MCP-SERVER.md](./MCP-SERVER.md) — تسجيل أدوات MCP ووسائل النقل
- [A2A-SERVER.md](./A2A-SERVER.md) — دورة حياة مهام A2A وتوجيه المهارات
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — مقدمة موجّهة للمستخدم
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — مسار معالجة الطلبات وخريطة المكوّنات
- المصدر: `src/lib/skills/`، `src/app/api/skills/`، `open-sse/mcp-server/tools/skillTools.ts`
- الاختبارات: `src/lib/skills/__tests__/integration.test.ts`
