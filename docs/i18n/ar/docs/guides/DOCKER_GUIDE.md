# 🐳 Docker Guide — OmniRoute (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> مرجع كامل لنشر Docker. للبدء السريع، راجع [قسم Docker في README](../README.md#-docker).

## جدول المحتويات

- [التشغيل السريع](#quick-run)
- [باستخدام ملف البيئة](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ملفات التعريف المتاحة](#available-profiles)
- [إعداد أدوات CLI على المضيف عند تشغيل OmniRoute داخل Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [حاوية Redis الجانبية](#redis-sidecar)
- [Compose للإنتاج](#production-compose)
- [مراحل Dockerfile](#dockerfile-stages)
- [متغيرات البيئة المهمة](#critical-environment-variables)
- [Docker Compose مع Caddy ‏(HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [نفق Cloudflare السريع](#cloudflare-quick-tunnel)
- [وسوم الصور](#image-tags)
- [التوافر: يستخدم SQLite الافتراضي نسخة متماثلة واحدة](#availability-default-sqlite-is-single-replica)
- [أخطاء Gemini الإقليمية داخل Docker](#gemini-regional-errors-inside-docker)
- [ملاحظات مهمة](#important-notes)

---

## التشغيل السريع

> **هل تريد الاستضافة الذاتية بأمر واحد؟** راجع
> [دليل الاستضافة الذاتية](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (صورة منشورة +
> Redis، متاح عبر عنوان الاسترجاع المحلي فقط، دون اختيار ملف تعريف). التشغيل السريع أدناه هو
> مسار الحاوية الواحدة للمستخدمين الذين يشغّلون Redis بالفعل في مكان آخر.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## باستخدام ملف البيئة

```bash
# انسخ ملف .env وعدّله أولًا
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# ملف التعريف الأساسي (دون أدوات CLI)
docker compose --profile base up -d

# ملف تعريف CLI ‏(Claude Code وCodex وOpenClaw مضمنة)
docker compose --profile cli up -d

# ملف تعريف المضيف (مخصص لنظام Linux في المقام الأول؛ يربط ملفات CLI التنفيذية الخاصة بالمضيف بوضع القراءة فقط)
docker compose --profile host up -d

# ملف تعريف الويب (Chromium/Playwright لموفري جلسات الويب)
docker compose --profile web up -d

# دمج CLI مع حاوية CLIProxyAPI الجانبية
docker compose --profile cli --profile cliproxyapi up -d
```

## ملفات التعريف المتاحة

يتضمن OmniRoute ملفات تعريف Compose لأشكال النشر الرئيسية. اختر الملف الذي يتوافق مع بيئتك.

| ملف التعريف        | الخدمة           | حالات الاستخدام                                                                                                                                                | الأمر                                        |
| ------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (الافتراضي) | `omniroute-base` | خادم بلا واجهة رسومية / بيئة تشغيل محدودة، دون تضمين واجهات CLI الخاصة بالموفرين                                                                               | `docker compose --profile base up -d`        |
| `cli`              | `omniroute-cli`  | تدفقات عمل قائمة على الوكلاء تستدعي `omniroute providers/setup/doctor` وواجهات CLI المضمنة (Codex وClaude Code وDroid وOpenClaw)                               | `docker compose --profile cli up -d`         |
| `host`             | `omniroute-host` | مضيفو Linux الذين يريدون وصولًا شبيهًا بـ`network_mode` إلى واجهات CLI على المضيف، من خلال ربط `~/.local/bin` و`~/.codex` و`~/.claude` وغيرها بوضع القراءة فقط | `docker compose --profile host up -d`        |
| `cliproxyapi`      | `cliproxyapi`    | تشغيل حاوية [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) الجانبية على المنفذ `8317` لتوكيل CLI إلى الخدمات المنبع                               | `docker compose --profile cliproxyapi up -d` |
| `web`              | `omniroute-web`  | موفرو جلسات الويب الذين يحتاجون إلى متصفح: `gemini-web` و`claude-web` و`claude-turnstile` (يبني `runner-web`، مع تضمين Chromium)                               | `docker compose --profile web up -d`         |

> يمكن دمج عدة ملفات تعريف: `docker compose --profile cli --profile cliproxyapi up -d`.

## تهيئة أدوات CLI على المضيف عند تشغيل OmniRoute في Docker

تكتب الأوامر `omniroute setup-codex` و`setup-claude` و`config set <tool>` وزر
**حفظ الإعدادات** في لوحة المعلومات ملفات مثل `~/.codex/*.config.toml`. لا يكون لهذه المسارات
معنى إلا على الجهاز الذي تعمل عليه أداة CLI فعليًا. إذا شغّلتها داخل
الحاوية، فستتم الكتابة في المجلد الرئيسي الخاص بالحاوية (`/home/node` —
إذ تعمل الصورة باستخدام `USER node`)، حيث لن تقرأها أي أداة CLI على المضيف مطلقًا،
وحيث يتم التخلص منها لحظة إعادة إنشاء الحاوية.

يكتشف OmniRoute ذلك ويرفض الكتابة مع عرض إرشادات بدلًا من
الإبلاغ عن نجاح لا يمكنك الاستفادة منه: تنتهي أداة CLI بالرمز `2`، وتستجيب API بالرمز `422`
مع `containerEphemeralTarget: true`.

### موصى به: شغّل أداة CLI على المضيف وOmniRoute في Docker

توفّر الحاوية API؛ بينما تهيّئ أداة CLI أدوات المضيف لديك.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # وجّه أداة CLI إلى الحاوية
omniroute setup-codex                      # يكتب في ~/.codex الفعلي على مضيفك
```

هذا هو الخيار الصحيح عندما تعمل Codex أو Claude Code أو Cursor أو أدوات مشابهة على
حاسوبك المحمول — وهو الإعداد المعتاد.

### بديل: اربط مجلدات إعدادات المضيف (`host` profile) باستخدام bind mount

إذا أردت أن تكتب الحاوية نفسها إعدادات المضيف، فاربط
المجلدات داخلها ووجّه `CLI_CONFIG_HOME` إلى جذر الربط. يقوم `host` profile
بذلك بالفعل:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

يجعل bind mount المسار موثوقًا: يقرأ OmniRoute
`/proc/self/mountinfo` ويسمح بالكتابة في المسارات المربوطة (وكذلك في المجلدات
التي تكون المجلدات الفرعية فيها نقاط ربط، وهو بالضبط شكل `/host-home` أعلاه)، مع
استمراره في رفض المسارات غير المربوطة.

### مخرج طوارئ: هيّئ أدوات CLI الخاصة بالحاوية نفسها (استخدمه بحذر)

عندما تكون أدوات CLI موجودة بالفعل داخل الحاوية (`cli` profile)، تكون الكتابة
مقصودة. مرّر `--allow-container-write` إلى أي أمر `setup-*`، أو عيّن
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` للخادم. تستمر عملية الكتابة
مع تحذير بأنها لن تبقى بعد زوال الحاوية.

> **تحذير أمني — `cli` profile مع ربط `docker.sock`.**
> يربط `cli` profile الملف `/var/run/docker.sock` باستخدام bind mount حتى يتمكن برنامج
> التحديث التلقائي داخل الحاوية من إعادة إنشاء المكدس عبر daemon المضيف
> (يتحقق `src/lib/system/autoUpdate.ts` من وجود ذلك المقبس ويتجاوز
> مسار Docker عندما يكون غائبًا). يمثّل ذلك المقبس **حد ثقة بصلاحيات root على
> المضيف**: أي شيء يمكنه الوصول إليه يستطيع التحكم في Docker daemon الخاص بالمضيف
> بصلاحيات root — إذ يمكنه إنشاء أي حاوية على المضيف وفحصها وإيقافها وإزالتها.
> التداعيات:
>
> 1. **لا تكشف أبدًا منفذ `cli` profile للشبكة.** انشره
>    على `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — إن جعل `cli` profile متاحًا عبر LAN يحوّل أي RCE على مستوى لوحة المعلومات إلى
>    اختراق كامل للمضيف.
> 2. **لا تربط أي مجلدات إضافية من المضيف داخل `cli` profile.**
>    يمنح مقبس Docker مع أي ربط إضافي الحاوية صلاحية كاملة
>    للقراءة والكتابة في نظام ملفاتك وإعدادات المضيف. إذا كنت تحتاج إلى أن ترى أداةٌ
>    مشروعًا، فشغّلها محليًا باستخدام ملف CLI التنفيذي — ولا تربط المشروع
>    داخل حاوية `cli`.
>
> إذا لم تكن بحاجة إلى التحديث التلقائي من داخل الحاوية، فاترك `cli` profile معطّلًا
> (`COMPOSE_PROFILES=core,redis` أو قيمة أقصر). لا تربط ملفات التعريف الأخرى
> مقبس Docker.
>
> راجع `docs/security/MITM-TPROXY-DECRYPT.md` (ضمن git؛ غير مضمّن في `/docs`) للاطلاع على نموذج التهديد ذي الصلة
> حول MITM، و`docs/security/SUPPLY_CHAIN.md` للاطلاع على
> سلسلة مصدر الملفات التنفيذية `codex`/`claude-code`/`droid`/`openclaw`.

## حاوية Redis الجانبية

يعتمد OmniRoute على Redis لدعم محدِّد المعدّل الموزّع وذاكرة التخزين المؤقت المشتركة. تكون خدمة `redis` **مُعرَّفة دائمًا** في `docker-compose.yml` (ولا تخضع لأي ملف تعريف)، وتبدأ بالتزامن مع أي ملف تعريف آخر.

| التفاصيل                        | القيمة                                            |
| ------------------------------- | ------------------------------------------------- |
| الصورة                          | `redis:7-alpine`                                  |
| اسم الحاوية                     | `omniroute-redis`                                 |
| المنفذ الداخلي                  | `6379`                                            |
| منفذ المضيف (قابل للتجاوز)      | `REDIS_PORT` (القيمة الافتراضية `6379`)           |
| عنوان ربط المضيف (قابل للتجاوز) | `REDIS_BIND_HOST` (القيمة الافتراضية `127.0.0.1`) |
| وحدة التخزين                    | `omniroute-redis-data` → `/data`                  |
| فحص السلامة                     | `redis-cli ping` (بفاصل زمني قدره 10 ثوانٍ)       |

متغيرات البيئة ذات الصلة:

- `REDIS_URL` — سلسلة الاتصال التي تُحقن في التطبيق (`redis://redis:6379` افتراضيًا).
- `REDIS_PORT` — تعيين منفذ المضيف لحاوية Redis.
- `REDIS_BIND_HOST` — واجهة المضيف التي يُنشر عليها المنفذ. القيمة الافتراضية هي `127.0.0.1`.

> **سبب استخدام واجهة الاسترجاع افتراضيًا:** تعمل الحاوية الجانبية دون `requirepass`، وتتصل بها
> حاويات التطبيق عبر شبكة Compose (`redis:6379`) — أما المنفذ المنشور فالغرض منه فقط
> أدوات جانب المضيف (`redis-cli` و`npm run dev` محلي). سيؤدي النشر على
> `0.0.0.0` إلى إتاحة Redis دون مصادقة لكل مضيف على شبكتك المحلية. إذا عيّنت
> `REDIS_BIND_HOST=0.0.0.0`، فأضف أيضًا `--requirepass` إلى `command:` الخاص بالخدمة.

**لا يُنصح بتعطيل Redis** (إذ سيتراجع محدِّد المعدّل إلى آلية احتياطية داخل الذاكرة). إذا كان ذلك ضروريًا، فإما أن تزيل/تعلّق كتلة خدمة `redis:` في `docker-compose.yml` أو تقلّص عدد مثيلاتها إلى صفر:

```bash
docker compose up -d --scale redis=0
```

## Compose للإنتاج

لتشغيل نسخة إنتاج معزولة بالتوازي مع بيئة التطوير، استخدم `docker-compose.prod.yml`.

| التفاصيل                      | القيمة                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| الملف                         | `docker-compose.prod.yml`                                                           |
| منفذ لوحة المعلومات الافتراضي | `PROD_DASHBOARD_PORT=20130` (يُعيَّن إلى المنفذ الداخلي `${DASHBOARD_PORT:-20128}`) |
| منفذ API الافتراضي            | `PROD_API_PORT=20131`                                                               |
| الصورة                        | `omniroute:prod` (مبنية من هدف `runner-cli`)                                        |
| حاوية Redis                   | `omniroute-redis-prod` (`redis:8.6.2`، مع وحدة تخزين مخصصة `redis-prod-data`)       |
| وحدة تخزين البيانات           | `omniroute-prod-data` (مُسمّاة وتستمر عبر عمليات إعادة البناء)                      |
| فحوصات السلامة                | `node healthcheck.mjs` + `redis-cli ping`، مع تقييد `depends_on` بحالة سلامة Redis  |

طريقة الاستخدام:

```bash
# بناء حزمة الإنتاج وتشغيلها
docker compose -f docker-compose.prod.yml up -d --build

# بث السجلات
docker compose -f docker-compose.prod.yml logs -f

# إيقاف الحزمة وإزالتها (مع الاحتفاظ بوحدات التخزين)
docker compose -f docker-compose.prod.yml down
```

تعمل حزمة الإنتاج بالتوازي مع حزمة Compose الخاصة بالتطوير (بأسماء حاويات ومنافذ ووحدات تخزين مختلفة)، لذا يمكنك مواصلة التطوير محليًا بينما تظل بيئة الإنتاج قيد التشغيل.

## مراحل Dockerfile

يوفّر المستودع ملف Dockerfile متعدد المراحل (`Dockerfile`). تتوفر أربع مراحل؛ اختر `target` المناسب لحالة استخدامك.

| المرحلة       | الصورة الأساسية       | الغرض                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | تثبّت التبعيات (`npm ci --legacy-peer-deps`) وتشغّل `npm run build` (باستخدام Turbopack افتراضيًا — راجع موارد وقت البناء أدناه)                                                                                                                       |
| `runner-base` | `node:26-trixie-slim` | بيئة تشغيل إنتاجية تتضمن مخرجات Next.js المستقلة. **لا تتضمن أدوات CLI خاصة بموفّري الخدمات.**                                                                                                                                                         |
| `runner-cli`  | `runner-base`         | تضيف `git` و`docker.io` و`docker-compose` وأدوات CLI العامة: `@openai/codex` و`@anthropic-ai/claude-code` و`droid` و`openclaw`. **اختر هذه المرحلة لسير العمل الوكيلي.**                                                                               |
| `runner-web`  | `runner-base`         | تضيف Playwright ومتصفح Chromium (`--with-deps`) لموفّري جلسات الويب: `gemini-web` و`claude-web` و`claude-turnstile`. **اختر هذه المرحلة عند استخدام أولئك الموفّرين** — تفشل الصورة العادية وقت الطلب من دونها (راجع ملاحظة `-web` ضمن قنوات الإصدار). |

ابنِ هدفًا محددًا يدويًا:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### موارد وقت البناء

تتحكم ثلاث وسائط بناء في تكلفة مرحلة `builder`. وهي خاصة بوقت البناء فقط —
أما `OMNIROUTE_MEMORY_MB` (أدناه) فهو إعداد منفصل لوقت التشغيل.

| وسيطة البناء                | القيمة الافتراضية | التأثير                                                                                                  |
| --------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`               | تنفّذ القيمة `0` البناء باستخدام webpack: ذروة ذاكرة أقل، لكن أبطأ. وتفعّل القيمة `1` استخدام Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`            | الحد الأقصى لكومة V8 (`--max-old-space-size`) لعملية `next build` التي يتم تشغيلها.                      |
| `OMNIROUTE_BUILD_WORKERS`   | `2`               | تمرّر القيمة إلى `CIRCLE_NODE_TOTAL`؛ ويشتق Next القيمة `workers = N - 1` لجمع بيانات الصفحات.           |

`OMNIROUTE_BUILD_WORKERS` هو الإعداد الذي ينبغي زيادته على جهاز بناء كبير، وهو
أيضًا أول ما ينبغي الاشتباه به عندما تفشل عملية بناء محدودة الموارد **بعد**
`✓ Compiled successfully`. كل عامل لجمع بيانات الصفحات هو عملية مستقلة، وكذلك
عملية `next build` الأم نفسها؛ وقد أظهر إعادة إنتاج مباشرة على VPS (المشكلة #7518)
أن ذروة RSS لكل عملية بلغت نحو 4.5 GB، بشكل مستقل عن علامة الكومة
`NODE_OPTIONS` (ينفّذ Turbopack الترجمة باستخدام ذاكرة Rust أصلية خارج كومة V8).
القيمة الافتراضية `2` (← عامل واحد، وعمليتان إجمالًا) مضبوطة لتناسب مشغّلات
GitHub المستضافة ذات 16 GB و4 vCPU التي يستخدمها مسار النشر. عند القيمة `8`
(← 7 عمال)، نفدت ذاكرة ذلك المشغّل وفشل buildkit في الخطوة مع
`ResourceExhausted: ... cannot allocate memory`؛ وحتى القيمة `3` (← عاملان)
لم تكن مناسبة بعد قياس RSS لكل عملية مباشرة بدلًا من استنتاجها.
ينفّذ `tests/unit/docker-build-memory-budget.test.ts` الحسابات استنادًا إلى
القيمة المقاسة، ويفشل إذا أدى أي من الإعدادين إلى تجاوز سعة المشغّل.

ينفّذ Turbopack الترجمة في ذاكرة Rust أصلية تقع **خارج** كومة V8، ولذلك لا يضع
`OMNIROUTE_BUILD_MEMORY_MB` حدًا لها. على مضيف ذي سقف للذاكرة، يرسل قاتل OOM
إشارة SIGKILL إلى عملية البناء من دون أي نص خطأ على الإطلاق — إذ تتوقف ببساطة
في منتصف `Creating an optimized production build`، ما يوحي بأنها معلّقة بدلًا
من نفاد الذاكرة. ولهذا يستخدم `Dockerfile` الإعداد الافتراضي webpack
(`OMNIROUTE_USE_TURBOPACK=0`)، بخلاف `npm run dev` / `npm run build`، حيث يكون
Turbopack هو الإعداد الافتراضي في الشيفرة: يجب ألا يفشل أمر `docker build .`
المجرّد، من دون وسائط بناء (وهو ما تشغّله Railway وغيرها من خدمات الاستضافة
بنقرة واحدة)، بصمت على جهاز بناء ذي ذاكرة محدودة. تمرّر الصور المنشورة بالفعل
`OMNIROUTE_USE_TURBOPACK=0` صراحةً في `docker-publish.yml`. على جهاز بناء ذي
ذاكرة RAM وفيرة، فعّل Turbopack للحصول على بناء أسرع:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

تم تفعيل `webpackBuildWorker`، لذلك يشغّل `next build` عملية أم **وعملية عامل**
وتلتزم كل منهما بـ`OMNIROUTE_BUILD_MEMORY_MB` بشكل منفصل. اضبط سقف الحاوية على
قيمة تزيد تقريبًا على ضعف تلك القيمة، لا على القيمة نفسها.

النتائج المقاسة على هذه الشجرة (`--target runner-base`، `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| أداة التحزيم | سقف الحاوية    | النتيجة                                |
| ------------ | -------------- | -------------------------------------- |
| Turbopack    | 8 GiB / 16 GiB | أنهى قاتل OOM العملية في الحالتين بصمت |
| webpack      | 8 GiB          | أُرسلت SIGKILL إلى عامل البناء         |
| webpack      | 12 GiB         | نجح، وبلغت الذروة 11.1 GiB             |

### الإعدادات الافتراضية لوقت التشغيل

الإعدادات الافتراضية التي تصدّرها `runner-base`: `PORT=20128`، `HOSTNAME=0.0.0.0`، `OMNIROUTE_MEMORY_MB=1024`، `NODE_OPTIONS=--max-old-space-size=1024`، `DATA_DIR=/app/data`، `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

سلوك الذاكرة في Docker:

- تضبط الصورة `OMNIROUTE_MEMORY_MB=1024` وتشتق منه `NODE_OPTIONS=--max-old-space-size=1024`.
- تُشغَّل عملية الخادم الفعلية بواسطة مُشغِّل الوضع المستقل، الذي يقرأ `OMNIROUTE_MEMORY_MB` ويُلحق `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- تستخدم Node آخر قيمة مكررة لـ `--max-old-space-size`، لذا فإن ضبط `OMNIROUTE_MEMORY_MB` يتحكم في حد كومة Docker الفعلي.
- نظرًا إلى أن الصورة تضبطه دائمًا، فلن يُطبَّق أبدًا الخيار الاحتياطي الخاص بالمُشغِّل، الذي تتم معايرته وفق ذاكرة RAM، ضمن Docker. ارفع القيمة صراحةً بما يناسب عبء العمل (الجدول أدناه). لا تزال `2048` صغيرة جدًا بالنسبة إلى `/v1/responses` الخاص بوكلاء البرمجة.

### ذاكرة RAM في وقت التشغيل لوكلاء البرمجة

القيمة الافتراضية البالغة 1 GiB في Docker هي حد أدنى للوحة المعلومات/الدردشة الخفيفة، وليست حجمًا مناسبًا للإنتاج. تحتفظ أجسام طلبات `POST /v1/responses` الطويلة (مئات الرسائل وعشرات الأدوات) بعدة رسوم بيانية داخل الذاكرة أثناء الضغط. تسبّب طلبان متداخلان بحجم يقارب 3 MiB / 750 ألف رمز مميز لكل منهما في إيقاف V8 عند مساحة قديمة تبلغ **12 GiB** (`FATAL ERROR: Reached heap limit`)، كما أدّيا إلى نفاد ذاكرة cgroup بحجم 16 GiB. راجع [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

اضبط حجم **cgroup `--memory` ليكون أكبر من الكومة** — فالمخازن المؤقتة الأصلية وSQLite والبيانات الوسيطة للضغط تقع خارج V8.

| عبء العمل                            | `OMNIROUTE_MEMORY_MB`      | الحاوية / cgroup       | ملاحظات                                                                                           |
| ------------------------------------ | -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------- |
| لوحة المعلومات، دردشة خفيفة واحدة    | `1024` (افتراضي الصورة)    | ≥2 GiB                 |                                                                                                   |
| وكيل برمجة واحد (Claude/Codex/Grok)  | `8192`                     | ≥10 GiB                | جلسة `/v1/responses` واحدة نموذجية                                                                |
| طلبا `/v1/responses` طويلان متزامنان | `10240`–`12288`            | ≥12–16 GiB             | تم قياس توقف V8 عند كومة بحجم يقارب 12 GiB                                                        |
| ثلاثة سياقات طويلة متزامنة أو أكثر   | لا تفعل ذلك في عملية واحدة | تسلسل / ذاكرة RAM أكبر | حد القبول الافتراضي للأحمال الثقيلة هو طلب واحد قيد التنفيذ؛ ورفعه دون زيادة RAM يعيد حدوث التوقف |

تُعاير `omniroute serve` على الأجهزة الفعلية نحو 35% من RAM (ضمن النطاق `[512, 4096]`) عندما يكون `OMNIROUTE_MEMORY_MB` **غير مضبوط**. تضبط Docker القيمة `1024` دائمًا، لذا لا تُنفَّذ هذه المعايرة أبدًا في الصورة الرسمية.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## متغيرات البيئة الحرجة

إضافةً إلى القيم الافتراضية الموثقة في [ENVIRONMENT.md](../reference/ENVIRONMENT.md)، تُعد المتغيرات التالية الأكثر أهمية عند التشغيل ضمن Docker:

| المتغير                       | الغرض                                                                                                                                                                                                                                                                | القيمة الافتراضية      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | السر المشترك لجسر WebSocket. **مطلوب في بيئة الإنتاج** — اضبطه على سلسلة عشوائية قوية.                                                                                                                                                                               | غير مضبوط (يجب توفيره) |
| `REDIS_URL`                   | سلسلة الاتصال بالواجهة الخلفية لمحدد المعدل / ذاكرة التخزين المؤقت                                                                                                                                                                                                   | `redis://redis:6379`   |
| `REDIS_PORT`                  | المنفذ على جانب المضيف لحاوية Redis المضمّنة                                                                                                                                                                                                                         | `6379`                 |
| `REDIS_BIND_HOST`             | واجهة المضيف التي يُنشر عليها منفذ Redis المضمّن (واجهة الاسترجاع ما لم تُضف AUTH)                                                                                                                                                                                   | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | مسار المضيف المركّب في ملف التعريف `cli` عند `/workspace/omniroute` لسير عمل التحديث الذاتي                                                                                                                                                                          | `.` (الدليل الحالي)    |
| `OMNIROUTE_MEMORY_MB`         | الحد الأقصى لكومة Node في وقت التشغيل لخادم Docker المستقل؛ يتجاوز القيمة الافتراضية للصورة المذكورة أعلاه. لوكلاء البرمجة: `8192`+ (راجع [ذاكرة RAM في وقت التشغيل](#runtime-ram-for-coding-agents)).                                                               | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | تجاوز المنافذ المكشوفة للوحة المعلومات (20128) وواجهة API ‏(20129)                                                                                                                                                                                                   | `20128` / `20129`      |
| `APP_BIND_HOST`               | واجهة المضيف التي ينشر docker-compose عليها منافذ لوحة المعلومات/API/‏WS المباشر. مع `REQUIRE_API_KEY=false` (القيمة الافتراضية)، يكشف `0.0.0.0` وكيل `/v1` المجهول للشبكة المحلية — لا توسّع نطاق الوصول إلا مع `REQUIRE_API_KEY=true` أو عند وجود وكيل عكسي أمامه. | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | واجهة المضيف التي ينشر docker-compose عليها الحاوية الجانبية `cliproxyapi` — يحتوي حجم بياناتها على بيانات اعتماد المزوّد.                                                                                                                                           | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | الدليل الذي يقرأ منه ماسح الملحقات في وقت التشغيل ويثبّت فيه. اضبطه عند تركيب الملحقات عبر ربط المجلدات: تتبع القيمة الافتراضية `HOME`، وقد لا تصدّرها الصورة.                                                                                                       | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | المسار الفرعي لعنوان URL عند نشر التطبيق خلف وكيل عكسي (مثل `/omniroute`)                                                                                                                                                                                            | _(فارغ = الجذر)_       |
| `NEXT_PUBLIC_BASE_URL`        | أصل المتصفح العام، متضمنًا المسار الفرعي (مثل `https://host/omniroute`)                                                                                                                                                                                              | غير مضبوط              |
| `PROD_DASHBOARD_PORT`         | منفذ لوحة المعلومات على جانب المضيف للملف `docker-compose.prod.yml`                                                                                                                                                                                                  | `20130`                |
| `CLIPROXYAPI_PORT`            | المنفذ على جانب المضيف للحاوية الجانبية `cliproxyapi`                                                                                                                                                                                                                | `8317`                 |

## الوكيل العكسي على مسار فرعي (Traefik / nginx)

يتم تضمين `basePath` الخاص بـ Next.js في الحزمة المستقلة أثناء عملية البناء. تسجّل OmniRoute القيمة المضمّنة في ملف علامة عند جذر التطبيق (تتم كتابته أثناء `npm run build`، وتتم قراءته بواسطة `scripts/docker/ensure-docker-base-path.mjs`) وتقارنها مع `OMNIROUTE_BASE_PATH` عند بدء تشغيل الحاوية. عندما تختلف القيمتان وتكون الصورة قد بُنيت لجذر النطاق، تعيد نقطة الدخول كتابة بيانات الحزمة المستقلة، وقيم `basePath`/`assetPrefix` الحرفية المضمّنة (يعرض Next 16 عناوين URL لأصول SSR اعتمادًا على `assetPrefix` وحده — لذلك ينسخ برنامج التصحيح المسار الفرعي إليه)، وعناوين URL المضمّنة لأصول `/_next/static` (بيانات مراجع العميل، واستيرادات الوسائط، وصفحات الأخطاء المُصيّرة مسبقًا)، وطبقة المحاكاة `process.env` الخاصة بالعميل قبل تشغيل `node dev/run-standalone.mjs`.

### البناء باستخدام Compose (موصى به)

عيّن كلا المتغيرين في `.env`، ثم أعد البناء لكي تتطابق الصورة مع بيئة التشغيل:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

يمرّر `docker-compose.yml` المتغير `OMNIROUTE_BASE_PATH` كوسيط بناء Docker وكمتغير بيئة في وقت التشغيل.

### صورة جذر مبنية مسبقًا + مسار فرعي في وقت التشغيل

تُبنى صور `diegosouzapw/omniroute:*` المنشورة لجذر النطاق. لا يزال بإمكانك تعيين `OMNIROUTE_BASE_PATH` في وقت التشغيل؛ إذ تُصحّح الحاوية الحزمة مرة واحدة عند بدء التشغيل. استخدم معه الأصل العام المطابق:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

اضبط الوكيل العكسي لإعادة توجيه المسار الخارجي **كاملًا** (لا تزل البادئة). يجب أن يوجّه Traefik المسار `PathPrefix(`/omniroute`)` إلى الحاوية دون `StripPrefix`، لكي يستقبل Next.js المسار `/omniroute/...` ويقدّم الأصول من `/omniroute/_next/...`.

يفحص اختبار سلامة Docker نقطة نهاية دورة الحياة الخفيفة `/healthz` مسبوقة بقيمة `OMNIROUTE_BASE_PATH` النشطة. تظل `/api/monitoring/health` متاحة للتشخيصات البشرية وتشخيصات لوحات المعلومات؛ ولإعادة توجيه HEALTHCHECK الخاص بالحاوية إليها (على سبيل المثال، لفرض فحص سلامة عميق)، عيّن `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. يُعد هذا المسار فحصًا **عميقًا** (قاعدة البيانات + ملخص المراقبة) — وهو مناسب لاختبار `HEALTHCHECK` غير المتكرر في Docker إذا اخترت إعادة تفعيله، لكنه **غير مناسب** لفواصل `livenessProbe` الزمنية في Kubernetes.

بالنسبة إلى أنظمة التنسيق (Kubernetes وNomad وغيرها):

| الفحص             | المفضّل                                                                                | يجب تجنّبه                                        |
| ----------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------- |
| البقاء            | طلب HTTP ‏`GET /livez`، أو TCP على المنفذ الرئيسي (`PORT`، والقيمة الافتراضية `20128`) | استخدام `/api/monitoring/health` لفحص البقاء      |
| الجاهزية          | طلب HTTP ‏`GET /healthz`                                                               | مُهل زمنية قصيرة تعتبر انشغال حلقة الأحداث توقفًا |
| عميق / صندوق أسود | `/api/monitoring/health`                                                               | —                                                 |

يعرض `/healthz` حالة دورة حياة العملية (`ok` / `starting` / `stopping`). أما `/livez` فيتحقق فقط من أن العملية قيد التشغيل (يرجع 200 كلما أمكن تشغيل المعالج؛ ولا ينتظر الجاهزية). ولا يزال كلاهما يعمل ضمن حلقة أحداث Node نفسها التي تعالج الطلبات، ولذلك قد تؤدي أعمال الفهرسة أو الضغط المستهلكة للمعالج إلى تأخيرهما — الانشغال ≠ التوقف. يُفضّل استخدام فحص البقاء عبر TCP إذا انتهت مهلة فحوص HTTP. للاطلاع على إرشادات الفحص الكاملة:
[دليل المراقبة — توصيات فحوص Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose مع Caddy (HTTPS Auto-TLS)

يمكن عرض OmniRoute بأمان باستخدام التوفير التلقائي لشهادات SSL في Caddy. تأكد من أن سجل DNS من النوع A لنطاقك يشير إلى عنوان IP الخاص بخادمك.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # الأصل الذي تتعامل معه المتصفحات لاستدعاءات OAuth وروابط لوحة المعلومات وعناوين URL العامة المُنشأة.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # عنوان URL الداخلي للاتصال من خادم إلى خادم للمهام المجدولة / عمليات الجلب الذاتي.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

يضبط Caddy ترويسات إعادة التوجيه القياسية للحاوية الصاعدة. يستخدم OmniRoute
`NEXT_PUBLIC_BASE_URL` بوصفه الأصل العام الأساسي لاستدعاءات OAuth والروابط العامة
المُنشأة؛ وتستخدم عمليات الكتابة الموثَّقة في لوحة المعلومات طلبات من الأصل نفسه إلى جانب حماية CSRF
مرتبطة بالجلسة. لا تفعّل `OMNIROUTE_TRUST_PROXY` إلا لعمليات النشر المتقدمة التي تريد فيها عمدًا
أن يستنتج OmniRoute الأصل العام من ترويسات إعادة التوجيه الموثوقة بدلًا من الإعداد
الصريح.

## نفق Cloudflare السريع

يتضمن دعم لوحة المعلومات لعمليات نشر Docker خيار **Cloudflare Quick Tunnel** بنقرة واحدة ضمن `Dashboard → Endpoints`. عند التفعيل لأول مرة، يُنزَّل `cloudflared` عند الحاجة فقط، ويبدأ نفقًا مؤقتًا إلى نقطة النهاية الحالية `/v1`، ويعرض عنوان URL المُنشأ `https://*.trycloudflare.com/v1` مباشرةً أسفل عنوان URL العام المعتاد.

يمكن إظهار لوحات أنفاق نقاط النهاية (Cloudflare وTailscale وngrok) أو إخفاؤها من `Settings → Appearance` دون تغيير حالة النفق النشط.

### ملاحظات حول النفق

- عناوين URL الخاصة بـ Quick Tunnel مؤقتة وتتغير بعد كل إعادة تشغيل.
- لا تُستعاد Quick Tunnels تلقائيًا بعد إعادة تشغيل OmniRoute أو الحاوية. أعد تفعيلها من لوحة المعلومات عند الحاجة.
- يدعم التثبيت المُدار حاليًا Linux وmacOS وWindows على `x64` / `arm64`.
- تستخدم Quick Tunnels المُدارة نقل HTTP/2 افتراضيًا لتجنب تحذيرات مخزن UDP المؤقت المزعجة الخاصة بـ QUIC في بيئات الحاويات محدودة الموارد. اضبط `CLOUDFLARED_PROTOCOL=quic` أو `auto` إذا كنت تريد وسيلة نقل مختلفة.
- تتضمن صور Docker جذور شهادات CA الخاصة بالنظام وتمررها إلى `cloudflared` المُدار، ما يمنع حالات فشل ثقة TLS عند تهيئة النفق داخل الحاوية.
- اضبط `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` إذا كنت تريد أن يستخدم OmniRoute ملفًا تنفيذيًا موجودًا بدلًا من تنزيله.

## وسوم الصور

| الصورة                   | الوسم    | الحجم  | الوصف                                                  |
| ------------------------ | -------- | ------ | ------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | أعلى إصدار SemVer مستقر **منشور** (وليس `main` في git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | ثبّت هذه الفئة من الوسوم لاستخدام GitOps               |

بيان متعدد المنصات: `linux/amd64` + `linux/arm64` أصلي (Apple Silicon وAWS Graviton وRaspberry Pi). يحدد Docker البنية المطابقة تلقائيًا؛ مرّر `--platform linux/amd64` إذا كنت بحاجة إلى فرض محاكاة AMD64 على مضيفات ARM.

### قنوات الإصدار

ينشر OmniRoute قنوات Docker منفصلة للإصدارات المستقرة، واختبار فرع الإصدار النشط، وبُنى التطوير.

| القناة                          | المصدر                            | قابلية التغيير                   | الاستخدام الموصى به                                                                                           |
| ------------------------------- | --------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | إصدار موقّع/مرقّم                 | غير قابل للتغيير                 | عمليات نشر الإنتاج التي تثبّت إصدارًا محددًا                                                                  |
| `:latest` / `:latest-web`       | أعلى إصدار SemVer مستقر **منشور** | مؤشر مستقر قابل للتغيير          | يتبع الإصدارات المستقرة **بعد** مهمة نشر SemVer — ولا يتتبع `main` أو عمليات اعتماد `release/v*` غير المنشورة |
| `:next` / `:next-web`           | فرع `release/v*` الافتراضي الحالي | مؤشر ما قبل الإصدار قابل للتغيير | اختبار الإصلاحات التي وصلت إلى فرع الإصدار النشط، لكنها لم تُضمَّن بعد في إصدار مستقر                         |
| `:main` / `:main-web`           | فرع `main`                        | مؤشر تطوير قابل للتغيير          | للتطوير واختبار التكامل فقط                                                                                   |

#### موفرو جلسات الويب: صور `-web`

تتوفر كل قناة أعلاه أيضًا كوسم `-web` (`:latest-web` و`:<version>-web` و`:next-web` و`:main-web`)، مبني من مرحلة `runner-web` — وهي الصورة نفسها بالإضافة إلى Playwright ومتصفح Chromium. تأتي الصورة العادية **من دون** Chromium؛ وتحتاج إليه `gemini-web` و`claude-web` و`claude-turnstile`.

يحدث الفشل لاحقًا وليس عند بدء التشغيل: يعرض هؤلاء الموفرون نماذجهم ويظهرون كمتصلين في لوحة المعلومات، ولا يفشل سوى الطلب الأول مع الرسالة التالية:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

إذا كنت تستخدم هؤلاء الموفرين، فاسحب وسم `-web` للقناة التي تستخدمها بالفعل — ولا يتغير أي شيء آخر. عند التثبيت باستخدام npm/CLI (من دون صورة Docker)، يكون الجزء المكافئ المفقود هو الملف التنفيذي للمتصفح: شغّل `npx playwright install chromium` على المضيف.

#### استخدام قناة ما قبل الإصدار

تُعاد عملية بناء قناة `next` عند كل عملية دفع إلى فرع `release/v*` الافتراضي الحالي، وتُنشر لكل من AMD64 وARM64. ولا يمكن لفروع الصيانة الأقدم الكتابة فوقها. توفّر القناة صورة قابلة للسحب للإصلاحات التي دُمجت في فرع الإصدار النشط قبل إنشاء وسم الإصدار المستقر التالي.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

بالنسبة إلى Docker Compose، تجاوز وسم الصورة الذي يستخدمه ملف التعريف المحدد، ثم اسحب الخدمة وأعد إنشاءها:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### الأمان والتراجع

`next` هي قناة عائمة لإصدارات ما قبل النشر. وقد تتغير مع أي عملية دفع إلى فرع الإصدار النشط، وهي **غير مدعومة للاستخدام في بيئات الإنتاج**. ثبّت ملخص الصورة أثناء تقييم بنية محددة:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

قبل الاختبار، أنشئ نسخة احتياطية من وحدة تخزين بيانات OmniRoute أو دليل البيانات الموصول عبر الربط. وللتراجع، استعد الإصدار المستقر أو الملخص المستخدم سابقًا، ثم أعد إنشاء الحاوية:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

لا يمكن لبنية فرع إصدار نقل `latest` مطلقًا؛ إذ لا يمكن ترقية المؤشر المستقر إلا بواسطة إصدار دلالي مستقر مؤهل. تحتفظ صور `next` بفحص صورة الإصدار وبوابة الحظر الخاصة بالثغرات ذات الخطورة CRITICAL.

**لا يضمن `latest` حداثة محتوى git.** لا تُضمَّن الإصلاحات المدمجة في `main` أو في فرع `release/v*` النشط ضمن `:latest` حتى تُنشر صورة SemVer مستقرة وتُرقّي مهمة النشر `:latest` (بالملخص نفسه الخاص بذلك الإصدار الدلالي). إذا بدا `latest` ثابتًا بينما يعرض GitHub الإصلاح بالفعل، فاسحب `:next` لاختبار فرع الإصدار أو انتظر وسم SemVer.

| ما تريده                                                            | ما يجب استخدامه                |
| ------------------------------------------------------------------- | ------------------------------ |
| GitOps / بيئة إنتاج يجب ألا تنحرف                                   | ثبّت `:X.Y.Z` (أو ملخص الصورة) |
| متابعة الإصدارات المستقرة المنشورة وقبول إعادة الإنشاء عند كل إصدار | `:latest`                      |
| اختبار تغييرات `release/v*` غير المنشورة                            | `:next` (ليس للإنتاج)          |
| اختبار `main`                                                       | `:main` (ليس للإنتاج)          |

## التوفّر: يستخدم SQLite الافتراضي نسخةً متماثلة واحدة

يتكوّن OmniRoute القياسي على Docker / Kubernetes من **عملية Node واحدة + كاتب SQLite واحد**. **لا يتوفر دعم للتوافر العالي** في هذه البنية.

| القيد                                                      | النتيجة                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| كاتب واحد                                                  | **لا** تشغّل نسخًا متماثلة متعددة باستخدام ملف SQLite نفسه. سيؤدي ذلك إلى إتلاف قاعدة البيانات.                                                                                                                                                                                                                         |
| إعادة الإنشاء / إعادة التشغيل / الإنهاء بواسطة HEALTHCHECK | **انقطاع كامل** لاتصالات SSE قيد التنفيذ، وجلسات لوحة المعلومات، والحالة الموجودة في الذاكرة. ينقطع اتصال كل عميل متصل. تتلقى الطلبات الجديدة خلال فترة عدم وجود نقاط نهاية استجابة **`502 Bad Gateway: Unknown error`** من الوكيل العكسي، وليس JSON من OmniRoute — ولا يمكن للعملاء تمييز ذلك عن فشل المزوّد (#11015). |
| حلقة الأحداث نفسها المستخدمة بواسطة `/healthz`             | قد تؤدي دورة معالجة كتالوج أو ضغط مشغولة إلى تأخير عمليات الفحص؛ وعندئذٍ تؤدي مهلة قصيرة إلى إعادة تشغيل النسخة المتماثلة **الوحيدة**.                                                                                                                                                                                  |

**مصفوفة عمليات الفحص** (راجع أيضًا [توصيات عمليات الفحص في Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| الفحص             | الهدف                                                          | لا تستخدم                                           |
| ----------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| فحص الاستمرارية   | TCP على `PORT` (الافتراضي `20128`)، أو HTTP مرن على `/healthz` | `/api/monitoring/health`                            |
| فحص الجاهزية      | HTTP `GET /healthz`                                            | مُهلًا زمنية قصيرة تعتبر انشغال حلقة الأحداث توقفًا |
| فحص متعمق / للبشر | `/api/monitoring/health`                                       | فحص الاستمرارية الآلي لـ kubelet                    |

**الترقيات:** توقّع انقطاع كل جلسة. أفرغ اتصالات العملاء إن أمكن؛ لا يتوفر تحديث تدريجي مع SQLite الافتراضي. سيؤدي أيضًا استخدام Compose مع `restart: unless-stopped` بالإضافة إلى Docker `HEALTHCHECK` إلى استبدال العملية الوحيدة عندما تصبح الحاوية غير سليمة — وبنطاق التأثير نفسه.

مقتطف Kubernetes من أجل **نسخة متماثلة واحدة** (يلزم استخدام Recreate؛ لا ترفع قيمة `replicas` عند استخدام ملف SQLite واحد):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

يتيح الانتظار في `preStop` لـ kube إزالة نقاط نهاية Service قبل SIGTERM، بحيث تتوقف حركة البيانات **الجديدة** عن الوصول إلى العملية التي يجري إنهاؤها. تُمنح اتصالات SSE قيد التنفيذ على `/v1/responses` مهلةً للإكمال تصل إلى `SHUTDOWN_TIMEOUT_MS` (الافتراضية 30 ثانية) عبر تأجيرات قبول ذات تكلفة مرتفعة (#11015). تتلقى الطلبات الجديدة التي لا تزال تصل إلى العملية استجابة `503` + `Retry-After: 5`. تظل فجوة عدم وجود نقاط نهاية في أثناء Recreate وحتى تصبح النسخة البديلة جاهزة انقطاعًا كاملًا — وهذا ناتج عن بنية SQLite، وليس عن سوء تهيئة الفحص.

لا يُعد استخدام Postgres خارجي / توافر عالٍ متعدد الكتّاب مسارًا قياسيًا موثقًا. إذا كنت تحتاج إلى توافر عالٍ، فاحتفظ بنسخة متماثلة واحدة أو شغّل بنية اختبرها المشروع ووثّقها بصورة منفصلة. يجري العمل على Postgres/MySQL ضمن [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). وحتى إصدار ذلك، فإن الطريقة الوحيدة المدعومة لمضاعفة سعة طلبات `/v1/responses` **الكبيرة** هي تشغيل N من العمليات المستقلة (القسم التالي)، وليس استخدام `replicas > 1` على وحدة تخزين واحدة.

## التوسّع الأفقي: N من العمليات المستقلة

عملية Node واحدة تعني **كومة V8 واحدة**. يؤدي طلبان متداخلان لوكيلَي برمجة بحجم ~3 MiB / ~750k-token عبر `POST /v1/responses` ‏(RTK + Caveman) إلى إجهاض تلك الكومة عند ~12 Gi (`FATAL ERROR: Reached heap limit`)، وقد يتسببان في نفاد الذاكرة (OOM) لمجموعة cgroup بسعة 16 Gi. راجع [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). هذا القياس تحذير بشأن **ميزانية الذاكرة**، وليس حدًا أقصى ثابتًا في المنتج عند طلبي `/v1/responses` طويلين متزامنين. يُضبط قبول محادثات الدردشة الثقيلة بواسطة ميزانية بايتات إدخال مشتقة تلقائيًا (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`، ‏`src/shared/middleware/admissionBudget.ts`) ومحددة وفق سقف V8/cgroup نفسه — ويؤدي تجاوزها بقيمة أعلى (أو تعيين حد عدد الطلبات القديم `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) في عملية سبق تحديد حجمها إلى إعادة حدوث الإجهاض. لا تخضع المحادثات الصغيرة و`/healthz` و`/v1/models` وMCP لهذا الحد.

### عملية واحدة: أكثر من طلبي `/v1/responses` طويلين

**قد** تشغّل العملية **السليمة** (التي تكون فيها الكومة دون `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`، وقيمته الافتراضية `0.75`) أكثر من طلبي `POST /v1/responses` طويلين متزامنين عندما تظل هناك سعة ضمن ميزانية البايتات قيد التنفيذ على مستوى العملية (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). تحصل أجسام الطلبات التي يبلغ حجمها `OMNIROUTE_CHAT_LARGE_BODY_BYTES` أو يزيد عليه (القيمة الافتراضية 256 KiB) على الحجز الثقيل نفسه المخصص للطلبات ذات البنية الثقيلة، وتستخدم آلية الإفلات `tryAcquireHealthyHeadroom` نفسها من [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ‏(`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). إن تشغيل عشرات عملاء SSE الطويلين المتزامنين (يحتاج المشغّلون غالبًا إلى 40–50) هو مسألة **ميزانية ذاكرة** — أي تحديد حجم الكومة + الخانات الأساسية/الاحتياطية + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — وليس حدًا ثابتًا في المنتج مقداره «طلبان كحد أقصى». وتظل الكومة الواقعة تحت الضغط ترفض الحمل باستخدام استجابة `503` قابلة لإعادة المحاولة حتى لا تتكرر مشكلة #7849.

**لمضاعفة الأكوام** (مساحات V8 القديمة المستقلة) **حاليًا**:

| افعل                                                                                                                                                                                               | لا تفعل                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| شغّل **N من الحاويات/وحدات pods**، لكل منها `DATA_DIR` / وحدة تخزين **خاصة بها**                                                                                                                   | تعيّن `replicas > 1` على ملف SQLite واحد                   |
| حدّد حجم الطلبات الثقيلة قيد التنفيذ + السعة الاحتياطية السليمة وفقًا لميزانية الكومة / البايتات قيد التنفيذ؛ القيمة 1–2 هي الإعداد الافتراضي المتحفظ للمشكلة #7849، وليست حدًا أقصى ثابتًا للمنتج | تمنح عملية واحدة ذاكرة RAM أكبر بـ8× وحدًا غير مقيد للعدد  |
| اختياري: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` من أجل **عدادات حصص مشتركة**                                                                                                         | تعامل Redis بوصفه SQLite مشتركًا — فهو ليس كذلك            |
| انسخ أسرار المزوّد إلى كل مثيل (أو اقبل لوحات معلومات مقسّمة)                                                                                                                                      | تتوقع لوحة معلومات واحدة / سجل مكالمات واحدًا عبر المثيلات |
| ضع أي موازن أحمال في الواجهة؛ ويكفي تثبيت الجلسة حسب مفتاح API أو الجلسة                                                                                                                           | تشترط برمجية وسيطة خاصة بمورّد محدد وتراعي الحجم           |

العتاد: عدد طلبات `/v1/responses` الطويلة المتزامنة لكل مثيل هو مسألة **ميزانية ذاكرة** (الكومة + البايتات قيد التنفيذ / #10110). تظل أدلة `DATA_DIR` المستقلة وعددها `N` تضاعف الأكوام: يجب أن تغطي ذاكرة RAM للمضيف `N × cgroup`، وليس «وحدة pod واحدة بسعة 16 Gi مع N=8». لا تستخدم مطلقًا `replicas > 1` على ملف SQLite واحد.

مخطط Compose (كومتان ووحدتا تخزين — وليس `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

تتوفر كثافة التشغيل داخل العملية (مع نقل الضغط خارج عزل HTTP) في [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). وتتوفر مجموعة منطقية واحدة تعتمد على حالة دائمة مشتركة في [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## أخطاء Gemini الإقليمية داخل Docker

قد تُرجع Google AI Studio / Gemini API استجابة HTTP 400 مع FAILED_PRECONDITION والرسالة
`User location is not supported for the API use.` لا يثبت نجاح الطلب على المضيف
أن الحاوية تستخدم مسار الخروج نفسه. فقد يختلف ترتيب DNS، واتصال IPv4/IPv6،
وتوجيه VPN، والوكلاء المُعدّون. تحقّق من
[المناطق التي تدعمها Google](https://ai.google.dev/gemini-api/docs/available-regions)
ومن مسار الاتصال الفعلي أيضًا؛ فهذا الخطأ وحده لا يدل على أن مفتاح API غير صالح.

### تفضيل وكيل خاص بالاتصال

استخدم [إعداد الوكيل لكل اتصال](../ops/PROXY_GUIDE.md#4-level-proxy-system) في OmniRoute
لاتصال Gemini المتأثر، ثم أعد إجراء **اختبار الاتصال** وطلب صغير
باستخدام النموذج نفسه. يؤدي ذلك إلى حصر تغيير التوجيه في ذلك الاتصال. تحقّق
من إمكانية الوصول إلى الوكيل من داخل الحاوية، ومن أن الاتصال يحدده بالفعل.
لا يضمن تغيير المسار استيفاء متطلبات الأهلية الإقليمية لدى الجهة المقدمة للخدمة.

### مقارنة شبكة المضيف والحاوية

أبقِ المفتاح والنموذج والطلب متطابقة عند مقارنة النتائج المصادَق عليها؛ ولا
تلصق أبدًا بيانات الاعتماد أو كلمات مرور الوكيل أو ترويسات التفويض الكاملة في مشكلة.
افحص أولًا عائلات العناوين التي يوفّرها محلّل نظام التشغيل، باستخدام الأمر نفسه
على المضيف وداخل الحاوية:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

استبدل `omniroute` بالخدمة التي تشغّلها (مثلًا، `omniroute-web`). تطبع هذه
الأوامر عائلات العناوين دون بيانات اعتماد أو عناوين IP. لا تُظهر القيمة `6`
المُعادة سوى نتيجة DNS من نوع IPv6: وهي **لا** تثبت وجود مسار IPv6 قابل للاستخدام أو إمكانية الوصول إلى API.
عند تثبيت `curl`، قارن `curl -4 -I https://generativelanguage.googleapis.com`
مع `curl -6 -I https://generativelanguage.googleapis.com` في كلتا البيئتين.
تثبت استجابة HTTP وجود اتصال لذلك الفحص، حتى لو كانت خطأً غير مصادَق عليه؛
ولا يختبر أهلية Gemini سوى طلب النموذج المصادَق عليه.

### بديل على مستوى المضيف: IPv6 عامل وسياسة المحلّل

استعاد مُبلّغ المشكلة [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)
إمكانية الوصول في بيئته عبر تمكين IPv6 للحاويات وتغيير آلية اختيار العناوين في glibc.
تعامل مع هذا على أنه بديل خاص بالبيئة. تأكد من أن IPv6 يعمل على المضيف،
ومن توجيه حركة الخروج من الحاوية وقواعد جدار الحماية، قبل تعديل تفضيلات المحلّل.
لا يكفي عنوان ULA خاص وحده لإثبات وجود اتصال عام عبر IPv6.

بالنسبة إلى الخدمات المرتبطة بالفعل بشبكة Compose الافتراضية، يفعّل
هذا المقتطف IPv6 على تلك الشبكة؛ احتفظ ببقية إعدادات الخدمة والمنافذ ووحدات التخزين والتهيئة:

```yaml
networks:
  default:
    enable_ipv6: true
```

بالنسبة إلى شبكة مُسمّاة، فعّله على الشبكة التي تنضم إليها الخدمة فعليًا. يمكن لـ Docker
تخصيص شبكة فرعية من نوع ULA؛ ولا تحدد شبكة فرعية صريحة وغير متداخلة إلا عندما تتطلب شبكتك
ذلك. راجع [شبكات IPv6 في Docker](https://docs.docker.com/engine/daemon/ipv6/)
و[خيارات شبكات Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

في **صورة مبنية على glibc**، يمكن للملف `/etc/gai.conf` تغيير آلية اختيار العناوين. يستخدم
Dockerfile الحالي للمستودع Debian؛ ولا تشترك الصور المخصصة المبنية على musl في هذه الآلية.
يغيّر التعديل المُبلّغ عنه تسمية ULA من `label fc00::/7 6` إلى
`label fc00::/7 1`. ابدأ من جدول السياسات الكامل للصورة واحتفظ بإدخالاته الأخرى:
فإضافة إدخال `label` أو `precedence` تستبدل ذلك الجدول الافتراضي، ولذلك لا يكفي ملف
لا يحتوي إلا على السطر المعدّل. يوثّق
[مرجع تهيئة glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
هذه الدلالات. اربط الملف الذي تمت مراجعته للقراءة فقط في `/etc/gai.conf`
وأعد إنشاء الخدمة لتطبيقه.

يغيّر هذا آلية اختيار العناوين في نظام التشغيل **لكل حركة المرور الصادرة من تلك الحاوية**.
ولا يُجبر كل تطبيق على اختيار IPv6: إذ يؤثر أيضًا ترتيب DNS وآلية اختيار الاتصال
في Node. وعلى وجه الخصوص، يفضّل `--dns-result-order=ipv4first` بروتوكول IPv4
ولا يُعد علاجًا لفشل يقتصر على IPv4. راجع [ترتيب DNS في Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

أعد اختبار Gemini ومزوّديك الآخرين بعد أي تغيير على مستوى المضيف. وللتراجع،
أزل ربط ملف `gai.conf` المخصص، واستعد تهيئة الشبكة السابقة،
وأعد إنشاء الخدمة/الشبكة المتأثرة خلال نافذة صيانة. قد تؤدي إعادة إنشاء الشبكة
إلى مقاطعة الحاويات الأخرى المرتبطة بها؛ ولا تحذف وحدة تخزين البيانات الدائمة.

## ملاحظات مهمة

- **وضع SQLite WAL:** يجب السماح لأمر `docker stop` بالإكمال حتى يتمكن OmniRoute من ترحيل أحدث التغييرات إلى `storage.sqlite`. تضبط ملفات Compose المرفقة بالفعل فترة سماح للإيقاف مدتها 40 ثانية. إذا شغّلت الصورة مباشرةً، فاحتفظ بالخيار `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** اضبطه على `true` إذا كانت النسخ الاحتياطية الدورية/السابقة للكتابة تُدار خارجيًا. لا تزال عمليات ترحيل قواعد البيانات الحالية تتطلب لقطة أمان دائمة خاصة بها وآلية حماية لعمليات الترحيل الجماعي.
- **استمرارية البيانات:** احرص دائمًا على تركيب وحدة تخزين على `/app/data` للاحتفاظ بقاعدة البيانات والمفاتيح والإعدادات عبر عمليات إعادة تشغيل الحاوية.
- **إعداد المنفذ:** تجاوز متغير البيئة `PORT` لتغيير المنفذ الافتراضي `20128`.

## انظر أيضًا

- [دليل النشر على VM](../ops/VM_DEPLOYMENT_GUIDE.md) — إعداد VM مع nginx وCloudflare
- [دليل النشر على Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — النشر على Fly.io
- [إعدادات البيئة](../reference/ENVIRONMENT.md) — مرجع `.env` الكامل
