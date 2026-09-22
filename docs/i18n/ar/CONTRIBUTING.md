# Contributing to OmniRoute (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## إعداد بيئة التطوير

### المتطلبات الأساسية

- **Node.js** بالإصدار `>=22.22.3 <23`، أو `>=24.0.0 <27` (الموصى به: 24 LTS)
- **npm** بالإصدار 10+

> **لمستخدمي npm v11+ ‏(Node 24+):** بعد تنفيذ `npm install`، تحقّق من تثبيت الوحدات الأصلية:
> `node -e "require('better-sqlite3')"`. إذا فشل بسبب `MODULE_NOT_FOUND`،
> فنفّذ `npm approve-scripts better-sqlite3 && npm install`. راجع
> [استكشاف الأخطاء وإصلاحها](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### الاستنساخ والتثبيت

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### متغيرات البيئة

```bash
# أنشئ ملف .env الخاص بك من القالب
cp .env.example .env

# أنشئ الأسرار المطلوبة
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

المتغيرات الأساسية للتطوير:

| المتغير                | القيمة الافتراضية للتطوير | الوصف                              |
| ---------------------- | ------------------------- | ---------------------------------- |
| `PORT`                 | `20128`                   | منفذ الخادم                        |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`  | عنوان URL الأساسي للواجهة الأمامية |
| `JWT_SECRET`           | (أنشئه كما هو موضح أعلاه) | سر توقيع JWT                       |
| `INITIAL_PASSWORD`     | `CHANGEME`                | كلمة مرور تسجيل الدخول الأول       |
| `APP_LOG_LEVEL`        | `info`                    | مستوى تفصيل السجلات                |

### إعدادات لوحة التحكم

توفّر لوحة التحكم مفاتيح تبديل في واجهة المستخدم للميزات التي يمكن أيضًا ضبطها عبر متغيرات البيئة:

| موقع الإعدادات    | مفتاح التبديل       | الوصف                                      |
| ----------------- | ------------------- | ------------------------------------------ |
| الإعدادات ← متقدم | وضع التصحيح         | تفعيل سجلات طلبات التصحيح (واجهة المستخدم) |
| الإعدادات ← عام   | ظهور الشريط الجانبي | إظهار/إخفاء أقسام الشريط الجانبي           |

تُخزَّن هذه الإعدادات في قاعدة البيانات وتستمر عبر عمليات إعادة التشغيل، وتتجاوز القيم الافتراضية لمتغيرات البيئة عند ضبطها.

### التشغيل محليًا

```bash
# وضع التطوير (إعادة التحميل الفورية)
npm run dev

# بناء الإنتاج
npm run build    # next build → .build/next/ ثم assembleStandalone → dist/
npm run start

# ترجمة سريعة للواجهة الخلفية/API فقط من أجل تغييرات المساهمين
npm run build:contributor

# بناء الإصدار (إعادة بناء نظيفة + مؤشر HEAD — مطلوب للنشر)
npm run build:release   # rm -rf .build dist && build + يكتب dist/BUILD_SHA

# إعداد المنفذ الشائع
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

ينفّذ بناء المساهمين تحققًا يعتمد على الترجمة فقط: فهو لا يُجمّع التوزيعة المستقلة
ولا يبني أصول الحزم الأصلية الاختيارية. استخدم بناء الإنتاج المعتاد عندما
تحتاج إلى التحقق من الحزمة القابلة للشحن.

### بنية مخرجات البناء

| الدليل    | المحتويات                                                                  | مُتتبَّع |
| --------- | -------------------------------------------------------------------------- | -------- |
| `src/`    | مصدر التطبيق (TypeScript / TSX)                                            | نعم      |
| `.build/` | ملفات وسيطة — مخرجات `next build` (يتجاهلها git، ‏`distDir = .build/next`) | لا       |
| `dist/`   | الحزمة القابلة للشحن — يُجمّعها `assembleStandalone` (يتجاهلها git)        | لا       |

مسار البناء عبارة عن تمريرة واحدة:

```
npm run build
  └─ next build → .build/next/standalone  (مخرجات Next.js)
  └─ assembleStandalone()                 (ينسخ الملفات المستقلة + الثابتة + العامة + الأصول الأصلية)
       └─ المخرجات: dist/                 (server.js، .next/static/، public/، node_modules/)
```

يقوم `npm run build:release` أيضًا بتنظيف كلا الدليلين أولًا وكتابة
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) بوصفه مؤشرًا للتحقق من سلامة النشر.

يستخدم `npm run build:contributor` ملف تعريف البناء الخاص بالواجهة الخلفية فقط. ويستبدل مؤقتًا
ملفات واجهة مستخدم لوحة التحكم بملفات بديلة أثناء البناء، مع الاحتفاظ بمعالجات مسارات API، ثم يستعيد الملفات الأصلية
بعد البناء. استخدم `npm run build` للتغييرات التي تؤثر في واجهة مستخدم لوحة التحكم أو للتحقق الكامل
من الإصدار؛ فملف تعريف المساهمين ليس بديلًا عن بناء الإصدار.

> **ملاحظة حول النشر على VPS:** لم يتغير دليل الصورة البعيد `/usr/lib/node_modules/omniroute/app/`.
> تقوم مهارات النشر بمزامنة محتويات `dist/` إليه باستخدام rsync.
> لم يتغير سوى مسار مخرجات البناء داخل المستودع (`app/` ← `dist/`).

عناوين URL الافتراضية:

- **لوحة التحكم**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## سير عمل Git

> ⚠️ **لا تُجرِ أي عملية commit مباشرةً إلى `main` مطلقًا.** استخدم دائمًا فروع الميزات.
>
> **قاعدة PR:** استهدف فرع `release/vX.Y.Z` النشط (وليس `main`). راجع
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) للاطلاع على
> نموذج إصدار لكل فرع + وسم عند الإطلاق.

```bash
# أنشئ الفرع من أحدث نقطة في الإصدار النشط (مثال: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... أجرِ التغييرات ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# افتح طلب سحب بحيث تكون القاعدة = release/v3.8.49
```

### تسمية الفروع

| البادئة     | الغرض                     |
| ----------- | ------------------------- |
| `feat/`     | ميزات جديدة               |
| `fix/`      | إصلاحات الأخطاء           |
| `refactor/` | إعادة هيكلة الشيفرة       |
| `docs/`     | تغييرات التوثيق           |
| `test/`     | إضافات/إصلاحات الاختبارات |
| `chore/`    | الأدوات، CI، التبعيات     |

### رسائل Commit

اتبع معيار [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

النطاقات (v3.8): `db`، `sse`، `oauth`، `dashboard`، `api`، `cli`، `docker`، `ci`، `mcp`، `a2a`، `memory`، `skills`، `cloud-agent`، `guardrails`، `compression`، `auto-combo`، `resilience`، `providers`، `executors`، `translator`، `domain`، `authz`.

---

## تشغيل الاختبارات

```bash
# جميع الاختبارات (الوحدة + vitest + المنظومة + الاختبارات الشاملة)
npm run test:all

# ملف اختبار واحد (مشغّل الاختبارات الأصلي في Node.js — تستخدمه معظم الاختبارات)
node --import tsx/esm --test tests/unit/your-file.test.ts

# اختبارات الوحدة المتأثرة بتغييرك فقط (مُحدِّد TIA نفسه المستخدم كبوابة CI، #8084)
npm run test:scoped            # التغييرات في آخر عملية تثبيت (أو شجرة العمل)
npm run test:scoped:staged     # التغييرات المُرحّلة فقط — يتكامل جيدًا مع التشغيل قبل التثبيت
npm run test:scoped:full       # أعد بناء خريطة مخطط الاستيراد أولًا (بعد إضافة/نقل الملفات)
# يعني الخروج بالحالة 1 مع "run the full suite" أن ملفًا محوريًا (tsconfig، أو package.json، أو …) أو مصدرًا
# غير معيّن قد تغيّر — يفشل المُحدِّد بأمان، ولا يتخطّى أي شيء بصمت مطلقًا.

# Vitest (خادم MCP، وautoCombo، وذاكرة التخزين المؤقت)
npm run test:vitest

# الاختبارات الشاملة (تتطلب Playwright)
npm run test:e2e

# الاختبارات الشاملة لعملاء البروتوكول (وسائل نقل MCP، وA2A)
npm run test:protocols:e2e

# اختبارات توافق المنظومة
npm run test:ecosystem

# بوابة التغطية: 60% من العبارات/الأسطر/الدوال/الفروع
npm run test:coverage
npm run coverage:report

# فحص التدقيق + التنسيق
npm run lint
npm run check

# اختبار دخان حقيقي مُقيّد للمجموعات في الأنظمة المصدرية (يتطلب وصولًا إلى VPS + أرصدة حقيقية لدى المزوّد)
# يستخدم مزوّدين حقيقيين — بتكلفة بسيطة. لا يعمل مطلقًا في CI. يُتخطّى بسلاسة من دون البوابة.
# يتطلب: صلاحية الوصول عبر ssh root@192.168.0.15 (يستورد لقطة DB للقراءة فقط من VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# اختبار دخان مباشر للمرحلة 3 على VPS — نصوص Node ESM عادية تتصل مباشرة بخادم .15 الحي.
# يتطلب: صلاحية الوصول عبر ssh root@192.168.0.15 (تُنشأ/تُفكك المجموعات عبر SSH sqlite).
# يستخدم مزوّدين حقيقيين (بتكلفة بسيطة). يُنشئ/يحذف مجموعات __live_test__* فقط. لا يعمل مطلقًا في CI.
# القيمة REQUIRE_API_KEY=false على .15، لذا لا يلزم مفتاح API، لكنه يحترم COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY إذا ضُبطا.
npm run test:combo:live:vps              # 7 سيناريوهات HTTP (الأولوية/التناوب/الترجيح/التكلفة/الدمج/التلقائي + السلامة)
npm run test:combo:live:vps:failover     # يضيف سيناريو تجاوز فشل حقيقيًا بين المزوّدين (الإجمالي 8)
```

ملاحظات التغطية:

- يقيس `npm run test:coverage` تغطية المصدر لمجموعة اختبارات الوحدة الرئيسية، ويستبعد `tests/**`، ويتضمن `open-sse/**`
- يجب أن تحافظ طلبات السحب على بوابة التغطية عند **60%+** من العبارات/الأسطر/الدوال/الفروع
- إذا غيّر طلب سحب شيفرة الإنتاج في `src/`، أو `open-sse/`، أو `electron/`، أو `bin/`، فيجب أن يضيف اختبارات آلية أو يحدّثها ضمن طلب السحب نفسه
- يطبع `npm run coverage:report` التقرير المفصّل ملفًا بملف من أحدث تشغيل للتغطية
- يحافظ `npm run test:coverage:legacy` على المقياس الأقدم للمقارنة التاريخية
- راجع `docs/ops/COVERAGE_PLAN.md` للاطلاع على خارطة الطريق المرحلية لتحسين التغطية

### متطلبات طلب السحب

قبل فتح طلب سحب، استخدم
[المسار الذهبي للمساهمة](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) لتشغيل الدورة المركّزة الخاصة
بما غيّرته. تقع مسؤولية مجموعة اختبارات الوحدة الكاملة (4 أجزاء CI)، وVitest، وبوابة التغطية
**60%+**، وبناء الإنتاج على CI — ولا يضيف تشغيلها محليًا أي مؤشرات لن توفرها لك بالفعل
عمليات التحقق من طلب السحب، كما قد يؤدي ذلك إلى استنزاف موارد المضيف على الأجهزة الأضعف (#8084):

- شغّل ملفات الاختبار التي تغطي تغييرك: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- شغّل `npm run lint`
- أضف اختبارات آلية أو حدّثها ضمن طلب السحب نفسه كلما تغيرت شيفرة الإنتاج
- أدرج ملفات الاختبار التي تم تغييرها أو إضافتها في وصف طلب السحب عند تغيير شيفرة الإنتاج
- تحقّق من نتيجة SonarQube في طلب السحب عندما تكون أسرار المشروع مضبوطة في CI

حالة الاختبارات الحالية: **122 ملف اختبار وحدة** تغطي:

- مترجمات المزوّدين وتحويل التنسيقات
- تحديد المعدّل، وقاطع الدارة، والمرونة
- ذاكرة التخزين المؤقت الدلالية، وعدم التكرار، وتتبع التقدم
- عمليات قاعدة البيانات والمخطط (21 وحدة DB)
- تدفقات OAuth والمصادقة
- التحقق من نقاط نهاية API ‏(Zod v4)
- أدوات خادم MCP وفرض النطاق
- نظامي الذاكرة والمهارات

---

## نمط الشيفرة

- **ESLint** — شغّل `npm run lint` قبل إجراء الالتزام
- **Prettier** — تُنسَّق الشيفرة تلقائيًا عبر `lint-staged` عند الالتزام (مسافتان، فواصل منقوطة، علامات اقتباس مزدوجة، عرض 100 محرف، وفواصل لاحقة وفق es5)
- **TypeScript** — تستخدم جميع الشيفرات في `src/` الامتدادات `.ts`/`.tsx`؛ ويستخدم `open-sse/` الامتدادات `.ts`/`.js`؛ وثّق باستخدام TSDoc (`@param`، `@returns`، `@throws`)
- **ممنوع استخدام `eval()`** — يفرض ESLint القواعد `no-eval`، و`no-implied-eval`، و`no-new-func`
- **التحقق باستخدام Zod** — استخدم مخططات Zod v4 للتحقق من جميع مدخلات API
- **التسمية**: الملفات = camelCase/kebab-case، والمكوّنات = PascalCase، والثوابت = UPPER_SNAKE

### معالجة الأخطاء / كتل catch الفارغة

لا تترك أي `catch` من دون تفسير. صنّفها ضمن إحدى الفئتين التاليتين (لتطبيق
القاعدة الصارمة «عدم تجاهل الأخطاء بصمت مطلقًا في تدفقات SSE»):

- **متعمدة (عمليات التنظيف/القياس عن بُعد بأفضل جهد من جانبنا)** — الفشل هنا متوقع
  وغير ضار؛ أضف تعليقًا من سطر واحد يوضح السبب، من دون تسجيل (فالتسجيل مع كل طلب هو
  الضوضاء التي تتجنبها هذه القاعدة).

  ```ts
  } catch {} // من المتوقع إغلاق متحكم مغلق بالفعل بعد انقطاع اتصال العميل
  ```

- **يجب تسجيلها (شيفرة خارجية/مقدمة من المستدعي، أو عندما يؤدي التجاهل إلى تغيير تدفق التحكم)** — أبقِ
  كتلة catch (ولا تسمح لها مطلقًا بتعطيل التدفق)، ولكن أصدِر `console.debug`/`warn` سياقيًا حتى يكون
  الفشل قابلًا للاكتشاف.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

راجع `open-sse/utils/stream.ts` و`open-sse/utils/streamHandler.ts` للاطلاع على أمثلة مطبقة.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## إضافة مزوّد جديد

### الخطوة 1: تسجيل ثوابت المزوّد

أضفها إلى `src/shared/constants/providers.ts` — حيث يتم التحقق منها باستخدام Zod عند تحميل الوحدة.

### الخطوة 2: إضافة منفّذ (إذا كان يلزم منطق مخصّص)

أنشئ منفّذًا في `open-sse/executors/your-provider.ts` يمتد من المنفّذ الأساسي.

### الخطوة 3: إضافة مترجم (إذا كان التنسيق غير متوافق مع OpenAI)

أنشئ مترجمات للطلبات والاستجابات في `open-sse/translator/`.

### الخطوة 4: إضافة إعدادات OAuth (إذا كان يعتمد على OAuth)

أضف بيانات اعتماد OAuth في `src/lib/oauth/constants/oauth.ts` والخدمة في `src/lib/oauth/services/`.

إذا كان المزوّد المصدر يوزّع `client_id`/سرًا عامًا لـ OAuth أو مفتاح Firebase Web API ضمن أداة CLI عامة أو حزمة متصفح عامة، **فلا** تضمّنه كسلسلة نصية حرفية. استخدم `resolvePublicCred()` من `open-sse/utils/publicCreds.ts` وأضف إدخال بايتات مُقنّعًا إلى `EMBEDDED_DEFAULTS`. سير العمل الإلزامي الكامل موثّق في [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

داخل المعالجات/المنفّذات، يجب تمرير رسائل الخطأ التي تصل إلى العميل عبر `buildErrorBody()` / `sanitizeErrorMessage()` من `open-sse/utils/error.ts` — لا تضع مطلقًا `err.stack` أو `err.message` الخام في نص Response. راجع [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### الخطوة 5: تسجيل النماذج

أضف تعريفات النماذج في `open-sse/config/providerRegistry.ts`.

### الخطوة 6: إضافة اختبارات

اكتب اختبارات وحدة في `tests/unit/` تغطي، كحد أدنى:

- تسجيل المزوّد
- ترجمة الطلبات/الاستجابات
- معالجة الأخطاء

---

## قائمة التحقق لطلب السحب

- [ ] نجاح الاختبارات (`npm test`)
- [ ] اجتياز فحص التنسيق (`npm run lint`)
- [ ] نجاح عملية البناء (`npm run build`)
- [ ] إضافة أنواع TypeScript للدوال والواجهات العامة الجديدة
- [ ] عدم وجود أسرار أو قيم احتياطية مضمنة مباشرةً
- [ ] تضمين بيانات اعتماد المصادر العامة عبر `resolvePublicCred()` (راجع [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md))، وليس كقيم حرفية مطلقًا
- [ ] تمرير استجابات الأخطاء عبر `buildErrorBody()` / `sanitizeErrorMessage()` — من دون آثار مكدس خام في نصوص الاستجابة (راجع [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] تمرير أوامر الصدفة (`exec` / `spawn`) قيم وقت التشغيل عبر `env`، وليس عبر استيفاء السلاسل النصية
- [ ] التحقق من صحة جميع المدخلات باستخدام مخططات Zod
- [ ] إضافة **جزء** من سجل التغييرات ضمن `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` للتغييرات الظاهرة للمستخدم (راجع [`changelog.d/README.md`](./changelog.d/README.md)) — **لا** تعدّل `CHANGELOG.md` مباشرةً؛ إذ تُجمّع الأجزاء عند الإصدار ولا تتعارض مطلقًا بين طلبات السحب
- [ ] تحديث الوثائق (إن كان ذلك منطبقًا)
- [ ] عدم فتح أي تنبيهات جديدة من CodeQL / Secret-Scanning، أو رفض كل تنبيه مع تقديم مبرر تقني يشير إلى المستند ذي الصلة ضمن `docs/security/`
- [ ] تصنيف المسارات التي تُنشئ عمليات فرعية (`/api/mcp/`، و`/api/cli-tools/runtime/`) على أنها `isLocalOnlyPath()` في `src/server/authz/routeGuard.ts` — راجع [القاعدة الصارمة رقم 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] عدم وجود تذييلات `Co-Authored-By` في رسائل الالتزام — يجب أن تظهر الالتزامات حصريًا ضمن هوية Git الخاصة بمالك المستودع (القاعدة الصارمة رقم 16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## الحصول على المساعدة

- **البنية المعمارية**: راجع [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **مرجع API**: راجع [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **وثائق الأمان**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md)، [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md)، [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)، [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **وثائق العمليات**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **المشكلات**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **سجلات القرارات المعمارية (ADRs)**: راجع `docs/adr/` للاطلاع على سجلات القرارات المعمارية
