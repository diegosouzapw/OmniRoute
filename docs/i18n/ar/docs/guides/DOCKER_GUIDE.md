# 🐳 Docker Guide — OmniRoute (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> مرجع كامل للنشر باستخدام Docker. للبدء السريع، راجع [قسم Docker في README](../README.md#-docker).

## جدول المحتويات

- [التشغيل السريع](#quick-run)
- [باستخدام ملف البيئة](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ملفات التعريف المتاحة](#available-profiles)
- [تهيئة أدوات CLI على المضيف عند تشغيل OmniRoute داخل Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [حاوية Redis الجانبية](#redis-sidecar)
- [Compose للإنتاج](#production-compose)
- [مراحل Dockerfile](#dockerfile-stages)
- [متغيرات البيئة المهمة](#critical-environment-variables)
- [Docker Compose مع Caddy ‏(HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [نفق Cloudflare السريع](#cloudflare-quick-tunnel)
- [وسوم الصور](#image-tags)
- [التوافر: يستخدم SQLite الافتراضي نسخة متماثلة واحدة](#availability-default-sqlite-is-single-replica)
- [ملاحظات مهمة](#important-notes)

---

## تشغيل سريع

> **هل تريد الاستضافة الذاتية بأمر واحد؟** راجع
> [دليل الاستضافة الذاتية](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (صورة منشورة +
> Redis، متاح عبر واجهة الاسترجاع فقط، من دون اختيار ملف تعريف). التشغيل السريع أدناه هو
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
# ملف التعريف الأساسي (من دون أدوات CLI)
docker compose --profile base up -d

# ملف تعريف CLI (يتضمن Claude Code وCodex وOpenClaw)
docker compose --profile cli up -d

# ملف تعريف المضيف (موجّه أساسًا إلى Linux؛ يركّب ملفات CLI الثنائية الخاصة بالمضيف بوضع القراءة فقط)
docker compose --profile host up -d

# ملف تعريف الويب (Chromium/Playwright لموفّري جلسات الويب)
docker compose --profile web up -d

# دمج CLI مع الحاوية الجانبية CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## الملفات التعريفية المتاحة

يأتي OmniRoute مزودًا بملفات Compose تعريفية لأنماط النشر الرئيسية. اختر الملف الذي يتوافق مع بيئتك.

| الملف التعريفي     | الخدمة           | متى يُستخدم                                                                                                                                                     | الأمر                                        |
| ------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (الافتراضي) | `omniroute-base` | خادم دون واجهة رسومية / بيئة تشغيل بالحد الأدنى، دون تضمين أدوات CLI الخاصة بموفري الخدمات                                                                      | `docker compose --profile base up -d`        |
| `cli`              | `omniroute-cli`  | تدفقات العمل الوكيلة التي تستدعي `omniroute providers/setup/doctor` وأدوات CLI المضمّنة (Codex، Claude Code، Droid، OpenClaw)                                   | `docker compose --profile cli up -d`         |
| `host`             | `omniroute-host` | مضيفو Linux الذين يريدون وصولًا شبيهًا بـ `network_mode` إلى أدوات CLI الخاصة بالمضيف عبر تحميل `~/.local/bin` و`~/.codex` و`~/.claude` وغيرها بوضع القراءة فقط | `docker compose --profile host up -d`        |
| `cliproxyapi`      | `cliproxyapi`    | تشغيل الحاوية الجانبية [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) على المنفذ `8317` لإجراء الوكالة إلى أدوات CLI في المنبع                     | `docker compose --profile cliproxyapi up -d` |
| `web`              | `omniroute-web`  | موفرو جلسات الويب الذين يحتاجون إلى متصفح: `gemini-web` و`claude-web` و`claude-turnstile` (يبني `runner-web`، ويتضمن Chromium)                                  | `docker compose --profile web up -d`         |

> يمكن دمج عدة ملفات تعريفية: `docker compose --profile cli --profile cliproxyapi up -d`.

## تهيئة أدوات CLI على المضيف عند تشغيل OmniRoute في Docker

تكتب الأوامر `omniroute setup-codex` و`setup-claude` و`config set <tool>` وزر
**حفظ التهيئة** في لوحة المعلومات جميعها ملفات مثل `~/.codex/*.config.toml`. لا يكون لهذه المسارات
معنى إلا على الجهاز الذي تعمل عليه أداة CLI فعليًا. إذا شغّلتها داخل
الحاوية، فستتم الكتابة في المجلد الرئيسي الخاص بالحاوية (`/home/node` —
إذ تعمل الصورة باستخدام `USER node`)، حيث لن تقرأها أي أداة CLI على المضيف مطلقًا، وحيث سيتم
التخلص منها لحظة إعادة إنشاء الحاوية.

يكتشف OmniRoute ذلك ويرفض الكتابة مع تقديم إرشادات بدلًا من
الإبلاغ عن نجاح لا يمكنك الاستفادة منه: تنهي أداة CLI عملها بالرمز `2`، وتستجيب واجهة API بالحالة `422`
مع `containerEphemeralTarget: true`.

### الموصى به: تشغيل أداة CLI على المضيف وOmniRoute داخل Docker

تقدّم الحاوية واجهة API، بينما تهيئ أداة CLI أدوات المضيف لديك.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # توجيه أداة CLI إلى الحاوية
omniroute setup-codex                      # كتابة المسار الفعلي ~/.codex على المضيف
```

هذا هو الخيار الصحيح عندما تعمل Codex أو Claude Code أو Cursor أو أدوات مشابهة على
حاسوبك المحمول — وهو الإعداد المعتاد.

### البديل: ربط مجلدات تهيئة المضيف (`host` profile)

إذا كنت تريد أن تكتب الحاوية نفسها في تهيئة المضيف، فاربط
المجلدات ووجّه `CLI_CONFIG_HOME` إلى جذر نقطة الربط. يقوم ملف التعريف `host`
بذلك بالفعل:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

ربط المجلد هو ما يجعل المسار موثوقًا: يقرأ OmniRoute
`/proc/self/mountinfo` ويسمح بالكتابة في المسارات المرتبطة (وفي المجلدات
التي تكون المجلدات الفرعية فيها نقاط ربط، وهو بالضبط شكل `/host-home` أعلاه)، مع
استمرار رفض المسارات غير المرتبطة.

### مخرج طوارئ: تهيئة أدوات CLI الخاصة بالحاوية نفسها (استخدمه بحذر)

عندما تكون أدوات CLI موجودة بالفعل داخل الحاوية (ملف التعريف `cli`)، تكون الكتابة
مقصودة. مرّر `--allow-container-write` إلى أي أمر `setup-*`، أو عيّن
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` للخادم. ستتم الكتابة
مع تحذير بأنها لن تبقى بعد زوال الحاوية.

> **تحذير أمني — ملف التعريف `cli` مع ربط `docker.sock`.**
> يربط ملف التعريف `cli` المسار `/var/run/docker.sock` لكي يتمكن
> المحدّث التلقائي داخل الحاوية من إعادة إنشاء المكدس عبر خدمة Docker الخفية على المضيف
> (يتحقق `src/lib/system/autoUpdate.ts` من وجود ذلك المقبس ويتجاوز
> مسار Docker عند غيابه). يمثّل ذلك المقبس **حدّ ثقة بصلاحيات root على المضيف**:
> إذ إن أي شيء يمكنه الوصول إليه يستطيع التحكم في خدمة Docker الخفية على المضيف بصلاحيات
> root — ويمكنه إنشاء أي حاوية على المضيف أو فحصها أو إيقافها أو إزالتها.
> النتائج المترتبة:
>
> 1. **لا تكشف مطلقًا منفذ ملف التعريف `cli` للشبكة.** انشره
>    على `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — إذ إن جعل ملف التعريف `cli` متاحًا عبر الشبكة المحلية يحوّل أي ثغرة RCE على مستوى لوحة المعلومات إلى
>    اختراق كامل للمضيف.
> 2. **لا تربط أي مجلدات إضافية من المضيف بملف التعريف `cli`.**
>    يمنح مقبس Docker مع أي ربط إضافي الحاوية صلاحيات كاملة
>    للقراءة والكتابة في نظام ملفاتك وتهيئة المضيف. إذا كنت بحاجة إلى تمكين أداة من
>    رؤية مشروع، فشغّلها محليًا باستخدام الملف الثنائي لأداة CLI — ولا تربط المشروع
>    داخل حاوية `cli`.
>
> إذا لم تكن بحاجة إلى التحديث التلقائي من داخل الحاوية، فاترك ملف التعريف `cli` معطّلًا
> (`COMPOSE_PROFILES=core,redis` أو قيمة أقصر). لا تربط ملفات التعريف الأخرى
> مقبس Docker.
>
> راجع `docs/security/MITM-TPROXY-DECRYPT.md` (ضمن git؛ غير مضمّن في `/docs`) للاطلاع على نموذج التهديدات ذي الصلة
> المتعلق بهجمات MITM، و`docs/security/SUPPLY_CHAIN.md` للاطلاع على
> سلسلة مصدر الملفات الثنائية لـ`codex` و`claude-code` و`droid` و`openclaw`.

## حاوية Redis الجانبية

يعتمد OmniRoute على Redis لدعم محدِّد المعدل الموزّع وذاكرة التخزين المؤقت المشتركة. تكون خدمة `redis` **مُعرَّفة دائمًا** في `docker-compose.yml` (فهي لا تخضع لأي ملف تعريف) وتبدأ بالتزامن مع أي ملف تعريف آخر.

| التفصيل                    | القيمة                                            |
| -------------------------- | ------------------------------------------------- |
| الصورة                     | `redis:7-alpine`                                  |
| اسم الحاوية                | `omniroute-redis`                                 |
| المنفذ الداخلي             | `6379`                                            |
| منفذ المضيف (قابل للتجاوز) | `REDIS_PORT` (القيمة الافتراضية `6379`)           |
| ربط المضيف (قابل للتجاوز)  | `REDIS_BIND_HOST` (القيمة الافتراضية `127.0.0.1`) |
| وحدة التخزين               | `omniroute-redis-data` → `/data`                  |
| فحص السلامة                | `redis-cli ping` (بفاصل زمني قدره 10 ثوانٍ)       |

متغيرات البيئة ذات الصلة:

- `REDIS_URL` — سلسلة الاتصال التي تُحقن في التطبيق (`redis://redis:6379` افتراضيًا).
- `REDIS_PORT` — تعيين المنفذ على جانب المضيف لحاوية Redis.
- `REDIS_BIND_HOST` — واجهة المضيف التي يُنشر عليها المنفذ. القيمة الافتراضية هي `127.0.0.1`.

> **لماذا تُستخدم واجهة الاسترجاع افتراضيًا:** تعمل الحاوية الجانبية دون `requirepass`، وتصل
> إليها حاويات التطبيق عبر شبكة Compose (`redis:6379`) — والمنفذ المنشور موجود فقط
> لأدوات جانب المضيف (`redis-cli` وتشغيل `npm run dev` محليًا). سيؤدي النشر على
> `0.0.0.0` إلى كشف Redis غير محمي بالمصادقة لكل مضيف على شبكتك المحلية. إذا عيّنت
> `REDIS_BIND_HOST=0.0.0.0`، فأضف أيضًا `--requirepass` إلى `command:` الخاص بالخدمة.

لا يُنصح **بتعطيل Redis** (إذ سيتراجع محدِّد المعدل إلى البديل الموجود في الذاكرة). إذا كان ذلك ضروريًا، فأزل/علّق كتلة خدمة `redis:` في `docker-compose.yml` أو قلّص عدد مثيلاتها إلى صفر:

```bash
docker compose up -d --scale redis=0
```

## Compose للإنتاج

للحصول على لقطة إنتاج معزولة تعمل بالتوازي مع بيئة التطوير، استخدم `docker-compose.prod.yml`.

| التفصيل                       | القيمة                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| الملف                         | `docker-compose.prod.yml`                                                           |
| منفذ لوحة المعلومات الافتراضي | `PROD_DASHBOARD_PORT=20130` (مُعيَّن إلى المنفذ الداخلي `${DASHBOARD_PORT:-20128}`) |
| منفذ API الافتراضي            | `PROD_API_PORT=20131`                                                               |
| الصورة                        | `omniroute:prod` (مبنية من هدف `runner-cli`)                                        |
| حاوية Redis                   | `omniroute-redis-prod` (`redis:8.6.2`، ووحدة تخزين مخصصة `redis-prod-data`)         |
| وحدة تخزين البيانات           | `omniroute-prod-data` (مُسمّاة ومستدامة عبر عمليات إعادة البناء)                    |
| فحوصات السلامة                | `node healthcheck.mjs` + `redis-cli ping`، مع اشتراط `depends_on` سلامة Redis       |

كيفية الاستخدام:

```bash
# بناء حزمة الإنتاج وتشغيلها
docker compose -f docker-compose.prod.yml up -d --build

# بث السجلات
docker compose -f docker-compose.prod.yml logs -f

# إيقاف الحزمة وإزالتها (مع الاحتفاظ بوحدات التخزين)
docker compose -f docker-compose.prod.yml down
```

تعمل حزمة الإنتاج بالتوازي مع Compose الخاص بالتطوير (بأسماء حاويات ومنافذ ووحدات تخزين مختلفة)، لذا يمكنك مواصلة العمل محليًا بينما تظل بيئة الإنتاج قيد التشغيل.

## مراحل Dockerfile

يوفّر المستودع ملف Dockerfile متعدد المراحل (`Dockerfile`). تتوفر أربع مراحل؛ اختر `target` المناسب لحالة استخدامك.

| المرحلة       | الصورة الأساسية       | الغرض                                                                                                                                                                                                                                                    |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | تثبّت التبعيات (`npm ci --legacy-peer-deps`) وتشغّل `npm run build` (باستخدام Turbopack افتراضيًا — راجع موارد وقت البناء أدناه)                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | بيئة تشغيل الإنتاج مع المخرجات المستقلة لـ Next.js. **لا تتضمن أدوات CLI الخاصة بمزودي الخدمة.**                                                                                                                                                         |
| `runner-cli`  | `runner-base`         | تضيف `git` و`docker.io` و`docker-compose` وأدوات CLI العامة: `@openai/codex` و`@anthropic-ai/claude-code` و`droid` و`openclaw`. **اختر هذه المرحلة لسير العمل القائم على الوكلاء.**                                                                      |
| `runner-web`  | `runner-base`         | تضيف Playwright ومتصفح Chromium (`--with-deps`) لمزودي جلسات الويب: `gemini-web` و`claude-web` و`claude-turnstile`. **اختر هذه المرحلة عند استخدام هؤلاء المزودين** — تفشل الصورة العادية عند وقت الطلب من دونها (راجع ملاحظة `-web` ضمن قنوات الإصدار). |

ابنِ هدفًا محددًا يدويًا:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### موارد وقت البناء

تتحكم ثلاث وسيطات بناء في تكلفة مرحلة `builder`. وهي مخصصة لوقت البناء فقط —
أما `OMNIROUTE_MEMORY_MB` (أدناه) فهو إعداد منفصل لوقت التشغيل.

| وسيطة البناء                | القيمة الافتراضية | التأثير                                                                             |
| --------------------------- | ----------------- | ----------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`               | تؤدي القيمة `0` إلى البناء باستخدام webpack بدلًا منه. ذاكرة قصوى أقل، لكنه أبطأ.   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`            | الحد الأقصى لكومة V8 (`--max-old-space-size`) لعملية `next build` التي يتم تشغيلها. |
| `OMNIROUTE_BUILD_WORKERS`   | `2`               | يضبط `CIRCLE_NODE_TOTAL`؛ ويشتق Next القيمة `workers = N - 1` لجمع بيانات الصفحات.  |

يُستحسن زيادة `OMNIROUTE_BUILD_WORKERS` عند استخدام بيئة بناء كبيرة، كما أنه أول ما ينبغي
الاشتباه فيه عندما يفشل بناء محدود الموارد **بعد** `✓ Compiled successfully`. تعمل كل
عملية لجمع بيانات الصفحات كعملية مستقلة، وكذلك عملية `next build` الأم نفسها؛
وقد أظهر اختبار فعلي على VPS (المشكلة #7518) أن ذروة RSS لكل عملية بلغت
نحو 4.5 GB بصرف النظر عن خيار الكومة `NODE_OPTIONS` (يُجري Turbopack عملية التجميع في
ذاكرة Rust أصلية خارج كومة V8). صُممت القيمة الافتراضية `2` (← عامل واحد، وعمليتان
إجمالًا) لتناسب بيئات التشغيل المستضافة على GitHub ذات 16 GB / 4 vCPU التي
يستخدمها مسار النشر. عند القيمة `8` (← 7 عوامل)، نفدت ذاكرة بيئة التشغيل تلك،
وفشل buildkit في الخطوة مع `ResourceExhausted: ... cannot allocate memory`؛
وحتى القيمة `3` (← عاملان) لم تكن مناسبة بعد قياس RSS لكل عملية
مباشرةً بدلًا من استنتاجها. يجري `tests/unit/docker-build-memory-budget.test.ts`
الحسابات بالاستناد إلى القيمة المقاسة، ويفشل إذا تجاوز أي من الإعدادين
قدرة بيئة التشغيل.

يُجري Turbopack عملية التجميع في ذاكرة Rust أصلية تقع **خارج** كومة V8، لذلك
لا يضع `OMNIROUTE_BUILD_MEMORY_MB` حدًا لها. وعلى مضيف ذي حد أقصى للذاكرة، تُنهى
عملية البناء حينها بإشارة SIGKILL بواسطة OOM killer من دون أي نص خطأ — إذ تتوقف
ببساطة في منتصف `Creating an optimized production build`، ما يبدو كأنه تعليق
بدلًا من نفاد الذاكرة. إذا كانت موارد مضيف البناء محدودة، فبدّل أداة التجميع:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

يكون `webpackBuildWorker` مفعّلًا، لذا تشغّل `next build` عملية أم **وعملية عامل**
وتلتزم كل منهما بقيمة `OMNIROUTE_BUILD_MEMORY_MB` بصورة منفصلة. اضبط الحد الأقصى
للحاوية على قيمة تتجاوز تقريبًا ضعف هذه القيمة، لا مرة واحدة فقط.

القياسات على هذه الشجرة (`--target runner-base`، و`OMNIROUTE_BUILD_MEMORY_MB=6144`):

| أداة التجميع | الحد الأقصى للحاوية | النتيجة                            |
| ------------ | ------------------- | ---------------------------------- |
| Turbopack    | 8 GiB / 16 GiB      | أنهى OOM العمليتين بصمت عند الحدين |
| webpack      | 8 GiB               | أُنهي عامل البناء بإشارة SIGKILL   |
| webpack      | 12 GiB              | نجح، وبلغت الذروة 11.1 GiB         |

### الإعدادات الافتراضية لوقت التشغيل

القيم الافتراضية التي تصدّرها `runner-base`: `PORT=20128`، و`HOSTNAME=0.0.0.0`، و`OMNIROUTE_MEMORY_MB=1024`، و`NODE_OPTIONS=--max-old-space-size=1024`، و`DATA_DIR=/app/data`، و`OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

سلوك الذاكرة في Docker:

- تضبط الصورة `OMNIROUTE_MEMORY_MB=1024` وتشتق منها `NODE_OPTIONS=--max-old-space-size=1024`.
- تبدأ عملية الخادم الفعلية بواسطة مشغّل التشغيل المستقل، الذي يقرأ `OMNIROUTE_MEMORY_MB` ويلحق `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- تستخدم Node آخر قيمة مكررة للخيار `--max-old-space-size`، لذا فإن ضبط `OMNIROUTE_MEMORY_MB` يتحكم في الحد الفعلي لذاكرة الكومة داخل Docker.
- نظرًا لأن الصورة تضبطه دائمًا، فلن تُطبَّق القيمة الاحتياطية الخاصة بالمشغّل، والمُعايرة وفقًا لذاكرة RAM، عند التشغيل ضمن Docker. ارفعها صراحةً بما يتناسب مع حمل العمل (الجدول أدناه). لا تزال القيمة `2048` صغيرة جدًا لطلب `/v1/responses` الخاص بوكلاء البرمجة.

### ذاكرة RAM وقت التشغيل لوكلاء البرمجة

القيمة الافتراضية في Docker، وهي 1 GiB، تمثل الحد الأدنى للوحة المعلومات/الدردشة الخفيفة، وليست حجمًا مناسبًا للإنتاج. تحتفظ أجسام طلبات `POST /v1/responses` الطويلة (مئات الرسائل وعشرات الأدوات) برسوم بيانية متعددة داخل الذاكرة أثناء الضغط. تسبب طلبان متداخلان بحجم ~3 MiB / ~750k رمزًا مميزًا في إيقاف V8 عند مساحة قديمة قدرها **12 GiB** (`FATAL ERROR: Reached heap limit`)، كما وصلا إلى نفاد ذاكرة cgroup بسعة 16 GiB. راجع [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

اضبط حجم **cgroup `--memory` ليكون أعلى من حجم الكومة** — إذ تقع المخازن المؤقتة الأصلية وSQLite والبيانات الوسيطة للضغط خارج V8.

| حمل العمل                            | `OMNIROUTE_MEMORY_MB`     | الحاوية / cgroup        | ملاحظات                                                                                                   |
| ------------------------------------ | ------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| لوحة المعلومات، دردشة خفيفة واحدة    | `1024` (افتراضي الصورة)   | ≥2 GiB                  |                                                                                                           |
| وكيل برمجة واحد (Claude/Codex/Grok)  | `8192`                    | ≥10 GiB                 | جلسة `/v1/responses` فردية نموذجية                                                                        |
| طلبا `/v1/responses` طويلان متزامنان | `10240`–`12288`           | ≥12–16 GiB              | تم قياس إيقاف V8 عند كومة بحجم ~12 GiB                                                                    |
| ثلاثة سياقات طويلة متزامنة أو أكثر   | لا تشغّلها في عملية واحدة | تنفيذ تسلسلي / RAM أكبر | حد القبول الافتراضي للأحمال الثقيلة هو طلب واحد قيد التنفيذ؛ وتؤدي زيادته دون RAM كافية إلى تكرار الإيقاف |

يعاير `omniroute serve` على نظام فعلي نحو 35% من RAM (مقيدة بالنطاق `[512, 4096]`) عندما تكون `OMNIROUTE_MEMORY_MB` **غير مضبوطة**. تضبط Docker القيمة `1024` دائمًا، لذا لا تُنفَّذ هذه المعايرة مطلقًا في الصورة الرسمية.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## متغيرات البيئة الحرجة

بالإضافة إلى الإعدادات الافتراضية الموثّقة في [ENVIRONMENT.md](../reference/ENVIRONMENT.md)، تُعد المتغيرات التالية الأكثر أهمية عند التشغيل ضمن Docker:

| المتغير                       | الغرض                                                                                                                                                                                                                                                                         | القيمة الافتراضية      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | السر المشترك لجسر WebSocket. **مطلوب في بيئة الإنتاج** — اضبطه على سلسلة عشوائية قوية.                                                                                                                                                                                        | غير معيّن (يجب توفيره) |
| `REDIS_URL`                   | سلسلة الاتصال بالواجهة الخلفية لمحدد المعدل / ذاكرة التخزين المؤقت                                                                                                                                                                                                            | `redis://redis:6379`   |
| `REDIS_PORT`                  | منفذ المضيف لحاوية Redis المضمّنة                                                                                                                                                                                                                                             | `6379`                 |
| `REDIS_BIND_HOST`             | واجهة المضيف التي يُنشر عليها منفذ Redis المضمّن (واجهة الاسترجاع ما لم تُضف AUTH)                                                                                                                                                                                            | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | مسار المضيف المثبّت ضمن ملف تعريف `cli` عند `/workspace/omniroute` لسير عمل التحديث الذاتي                                                                                                                                                                                    | `.` (الدليل الحالي)    |
| `OMNIROUTE_MEMORY_MB`         | الحد الأقصى لكومة Node في وقت التشغيل لخادم Docker المستقل؛ ويتجاوز القيمة الافتراضية للصورة المذكورة أعلاه. لوكلاء البرمجة: `8192`+ (راجع [ذاكرة RAM في وقت التشغيل](#runtime-ram-for-coding-agents)).                                                                       | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | تجاوز المنافذ المكشوفة للوحة المعلومات (20128) وواجهة API ‏(20129)                                                                                                                                                                                                            | `20128` / `20129`      |
| `APP_BIND_HOST`               | واجهة المضيف التي ينشر عليها docker-compose منافذ لوحة المعلومات/API/اتصال WS المباشر. عند استخدام `REQUIRE_API_KEY=false` (وهو الإعداد الافتراضي)، يكشف `0.0.0.0` وكيل `/v1` المجهول للشبكة المحلية — لا توسّع النطاق إلا مع `REQUIRE_API_KEY=true` أو بوضع وكيل عكسي أمامه. | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | واجهة المضيف التي ينشر عليها docker-compose الحاوية الجانبية `cliproxyapi` — إذ يحتوي مجلد بياناتها على بيانات اعتماد المزوّد.                                                                                                                                                | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | الدليل الذي يقرأ منه ماسح الإضافات في وقت التشغيل ويثبّت الإضافات فيه. اضبطه عند تثبيت الإضافات عبر ربط المجلدات: تتبع القيمة الافتراضية `HOME`، وقد لا تقوم الصورة بتصديره.                                                                                                  | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | المسار الفرعي لعنوان URL عند نشر التطبيق خلف وكيل عكسي (مثل `/omniroute`)                                                                                                                                                                                                     | _(فارغ = الجذر)_       |
| `NEXT_PUBLIC_BASE_URL`        | أصل المتصفح العام متضمّنًا المسار الفرعي (مثل `https://host/omniroute`)                                                                                                                                                                                                       | غير معيّن              |
| `PROD_DASHBOARD_PORT`         | منفذ لوحة المعلومات على جانب المضيف للملف `docker-compose.prod.yml`                                                                                                                                                                                                           | `20130`                |
| `CLIPROXYAPI_PORT`            | منفذ المضيف للحاوية الجانبية `cliproxyapi`                                                                                                                                                                                                                                    | `8317`                 |

## الوكيل العكسي على مسار فرعي (Traefik / nginx)

يُضمَّن `basePath` الخاص بـ Next.js في الحزمة المستقلة أثناء عملية البناء. تسجّل OmniRoute القيمة المضمّنة في ملف علامة عند جذر التطبيق (يُكتب أثناء `npm run build`؛ ويقرأه `scripts/docker/ensure-docker-base-path.mjs`) وتقارنها مع `OMNIROUTE_BASE_PATH` عند بدء تشغيل الحاوية. عندما تختلف القيمتان وتكون الصورة قد بُنيت لجذر النطاق، تعيد نقطة الدخول كتابة بيانات الحزمة المستقلة، والقيم الحرفية المضمّنة لـ `basePath`/`assetPrefix` (يعرض Next 16 عناوين URL لأصول SSR اعتمادًا على `assetPrefix` وحده — لذلك ينسخ برنامج التصحيح المسار الفرعي إليه)، وعناوين URL المضمّنة لأصول `/_next/static` (بيانات مراجع العميل، واستيرادات الوسائط، وصفحات الأخطاء المعروضة مسبقًا)، وكذلك محاكاة `process.env` الخاصة بالعميل، قبل تشغيل `node dev/run-standalone.mjs`.

### البناء باستخدام Compose (موصى به)

عيّن كلا المتغيرين في `.env`، ثم أعد البناء بحيث تتطابق الصورة مع بيئة التشغيل:

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

تُبنى صور `diegosouzapw/omniroute:*` المنشورة لجذر النطاق. ومع ذلك، يمكنك تعيين `OMNIROUTE_BASE_PATH` في وقت التشغيل؛ إذ تُصحّح الحاوية الحزمة مرة واحدة عند بدء التشغيل. استخدمه مع الأصل العام المطابق:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

اضبط الوكيل العكسي لتمرير المسار الخارجي **كاملًا** (لا تزل البادئة). ينبغي أن يوجّه Traefik المسار `PathPrefix(`/omniroute`)` إلى الحاوية من دون `StripPrefix`، بحيث يستقبل Next.js المسار `/omniroute/...` ويقدّم الأصول من `/omniroute/_next/...`.

يفحص اختبار صحة Docker نقطة نهاية دورة الحياة خفيفة الوزن `/healthz` مسبوقة بقيمة `OMNIROUTE_BASE_PATH` النشطة. تظل `/api/monitoring/health` متاحة لتشخيصات المستخدمين/لوحات المعلومات؛ ولإعادة توجيه HEALTHCHECK الخاص بالحاوية إليها (على سبيل المثال، لفرض فحص صحة معمّق)، عيّن `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. هذا المسار عبارة عن فحص **معمّق** (قاعدة البيانات + ملخص المراقبة) — وهو مناسب لـ `HEALTHCHECK` غير المتكرر الخاص بـ Docker إذا اخترت إعادة استخدامه، لكنه **غير** مناسب لفواصل `livenessProbe` في Kubernetes.

بالنسبة إلى أنظمة التنسيق (Kubernetes وNomad وغيرها):

| الفحص              | المفضّل                                                                           | ما ينبغي تجنبه                                   |
| ------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------ |
| البقاء             | HTTP `GET /livez`، أو TCP على المنفذ الرئيسي (`PORT`، والقيمة الافتراضية `20128`) | استخدام `/api/monitoring/health` كفحص للبقاء     |
| الجاهزية           | HTTP `GET /healthz`                                                               | مهل قصيرة تعتبر انشغال حلقة الأحداث توقفًا للعمل |
| معمّق / صندوق أسود | `/api/monitoring/health`                                                          | —                                                |

تعرض `/healthz` حالة دورة حياة العملية (`ok` / `starting` / `stopping`). أما `/livez` فتتحقق فقط من أن العملية قيد التشغيل (تُرجع 200 كلما أمكن تشغيل المعالج؛ ولا تنتظر الجاهزية). ومع ذلك، يعمل كلاهما على حلقة أحداث Node نفسها التي تعالج الطلبات، لذا يمكن أن تؤخرهما أعمال الكتالوج أو الضغط كثيفة استهلاك وحدة المعالجة المركزية — الانشغال ≠ التوقف. يُفضّل استخدام فحص البقاء عبر TCP إذا انتهت مهلة فحوص HTTP. للاطلاع على إرشادات الفحص الكاملة:
[دليل المراقبة — توصيات فحوص Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose مع Caddy (HTTPS Auto-TLS)

يمكن إتاحة OmniRoute بأمان باستخدام التوفير التلقائي لشهادات SSL من Caddy. تأكد من أن سجل DNS من النوع A لنطاقك يشير إلى عنوان IP الخاص بخادمك.

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
      # الأصل الظاهر للمتصفح لاستدعاءات OAuth وروابط لوحة المعلومات وعناوين URL العامة المُنشأة.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # عنوان URL الداخلي من خادم إلى خادم للمهام المجدولة / الطلبات الذاتية.
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

يضبط Caddy ترويسات إعادة التوجيه القياسية للحاوية المصدرية. يستخدم OmniRoute
`NEXT_PUBLIC_BASE_URL` بصفته الأصل العام المعياري لاستدعاءات OAuth والروابط العامة المُنشأة؛
وتستخدم عمليات الكتابة الموثقة في لوحة المعلومات طلبات من الأصل نفسه بالإضافة إلى حماية CSRF
المرتبطة بالجلسة. لا تفعّل `OMNIROUTE_TRUST_PROXY` إلا لعمليات النشر المتقدمة التي تريد فيها عمدًا
أن يستنتج OmniRoute الأصل العام من ترويسات إعادة التوجيه الموثوقة بدلًا من الإعدادات الصريحة.

## نفق Cloudflare السريع

يتضمن دعم لوحة المعلومات لعمليات نشر Docker خيار **Cloudflare Quick Tunnel** بنقرة واحدة ضمن `Dashboard → Endpoints`. عند التفعيل لأول مرة، يُنزَّل `cloudflared` عند الحاجة فقط، ويبدأ نفقًا مؤقتًا إلى نقطة النهاية الحالية `/v1`، ويعرض عنوان URL المُنشأ `https://*.trycloudflare.com/v1` مباشرةً أسفل عنوان URL العام المعتاد.

يمكن إظهار لوحات أنفاق نقاط النهاية (Cloudflare وTailscale وngrok) أو إخفاؤها من `Settings → Appearance` دون تغيير حالة النفق النشط.

### ملاحظات حول النفق

- عناوين URL الخاصة بـ Quick Tunnel مؤقتة وتتغير بعد كل إعادة تشغيل.
- لا تُستعاد Quick Tunnels تلقائيًا بعد إعادة تشغيل OmniRoute أو الحاوية. أعد تفعيلها من لوحة المعلومات عند الحاجة.
- يدعم التثبيت المُدار حاليًا Linux وmacOS وWindows على `x64` / `arm64`.
- تستخدم Quick Tunnels المُدارة نقل HTTP/2 افتراضيًا لتجنب تحذيرات مخزن UDP المؤقت الصاخبة الخاصة بـ QUIC في بيئات الحاويات محدودة الموارد. عيّن `CLOUDFLARED_PROTOCOL=quic` أو `auto` إذا أردت وسيلة نقل مختلفة.
- تتضمن صور Docker جذور CA الخاصة بالنظام وتمررها إلى `cloudflared` المُدار، ما يمنع حالات فشل ثقة TLS عند بدء تشغيل النفق داخل الحاوية.
- عيّن `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` إذا أردت أن يستخدم OmniRoute ملفًا ثنائيًا موجودًا بدلًا من تنزيله.

## وسوم الصور

| الصورة                   | الوسم    | الحجم  | الوصف                                               |
| ------------------------ | -------- | ------ | --------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | أعلى إصدار SemVer مستقر **منشور** (وليس git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | ثبّت هذه الفئة من الوسوم لاستخدامها مع GitOps       |

بيان متعدد المنصات: `linux/amd64` + `linux/arm64` أصليان (Apple Silicon وAWS Graviton وRaspberry Pi). يختار Docker البنية المطابقة تلقائيًا؛ مرّر `--platform linux/amd64` إذا كنت بحاجة إلى فرض محاكاة AMD64 على مضيفات ARM.

### قنوات الإصدار

ينشر OmniRoute قنوات Docker منفصلة للإصدارات المستقرة، واختبار فرع الإصدار النشط، وبُنى التطوير.

| القناة                          | المصدر                            | قابلية التغيير                   | الاستخدام الموصى به                                                                                          |
| ------------------------------- | --------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | إصدار موقّع ومحدد الإصدار         | غير قابل للتغيير                 | عمليات نشر الإنتاج التي تثبّت إصدارًا بعينه                                                                  |
| `:latest` / `:latest-web`       | أعلى إصدار SemVer مستقر **منشور** | مؤشر مستقر قابل للتغيير          | يتبع الإصدارات المستقرة **بعد** مهمة نشر SemVer — ولا يتتبع `main` أو التعديلات غير المُصدرة في `release/v*` |
| `:next` / `:next-web`           | فرع `release/v*` الافتراضي الحالي | مؤشر ما قبل الإصدار قابل للتغيير | اختبار الإصلاحات التي أُدرجت في فرع الإصدار النشط ولكنها لم تُضمّن بعد في إصدار مستقر                        |
| `:main` / `:main-web`           | فرع `main`                        | مؤشر تطوير قابل للتغيير          | للتطوير واختبار التكامل فقط                                                                                  |

#### موفرو جلسات الويب: صور `-web`

تتوافر كل قناة أعلاه أيضًا بوسم `-web` (`:latest-web` و`:<version>-web` و`:next-web` و`:main-web`)، مبني من مرحلة `runner-web` — وهي الصورة نفسها مضافًا إليها Playwright ومتصفح Chromium. تأتي الصورة العادية **من دون** Chromium؛ ويحتاج إليه كل من `gemini-web` و`claude-web` و`claude-turnstile`.

يحدث الفشل عند الاستخدام، وليس عند بدء التشغيل: يسرد هؤلاء الموفّرون نماذجهم ويظهرون كمتصلين في لوحة المعلومات، ولا يفشل إلا الطلب الأول مع الرسالة:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

إذا كنت تستخدم هؤلاء الموفّرين، فاسحب وسم `-web` للقناة التي تستخدمها بالفعل — ولا يتغير أي شيء آخر. عند التثبيت باستخدام npm/CLI (من دون صورة Docker)، يكون الجزء المكافئ المفقود هو الملف التنفيذي للمتصفح: شغّل `npx playwright install chromium` على المضيف.

#### استخدام قناة ما قبل الإصدار

تُعاد تهيئة قناة `next` عند كل عملية دفع إلى فرع `release/v*` الافتراضي الحالي، وتُنشر لكل من AMD64 وARM64. لا يمكن لفروع الصيانة الأقدم الكتابة فوقها. توفر القناة صورة قابلة للسحب للإصلاحات التي دُمجت في فرع الإصدار النشط قبل إنشاء الوسم المستقر التالي.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

بالنسبة إلى Docker Compose، تجاوز وسم الصورة الذي يستخدمه ملف التعريف المحدد، ثم اسحب الخدمة وأعِد إنشاؤها:

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

`next` قناة عائمة لما قبل الإصدار. قد تتغير عند أي عملية دفع إلى فرع الإصدار النشط، وهي **غير مدعومة للاستخدام في الإنتاج**. ثبّت ملخص الصورة أثناء تقييم بنية محددة:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

قبل الاختبار، أنشئ نسخة احتياطية من وحدة تخزين بيانات OmniRoute أو دليل البيانات المركّب بالربط. للتراجع، استعد الإصدار المستقر أو الملخص المستخدم سابقًا، ثم أعِد إنشاء الحاوية:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

لا يمكن أبدًا لبنية فرع إصدار تحريك `latest`؛ وحده إصدار دلالي مستقر مؤهل يمكنه ترقية المؤشر المستقر. تحتفظ صور `next` بفحص صورة الإصدار وبوابة الحظر الخاصة بالثغرات ذات الخطورة CRITICAL.

**لا يضمن `latest` حداثة محتوى git.** الإصلاحات المدمجة في `main` أو في فرع `release/v*` النشط **لا** تكون موجودة في `:latest` حتى تُنشر صورة SemVer مستقرة وتقوم مهمة النشر بترقية `:latest` (بالملخص نفسه لإصدار SemVer ذاك). إذا بدا `latest` ثابتًا بينما يعرض GitHub الإصلاح بالفعل، فاسحب `:next` لاختبار فرع الإصدار أو انتظر وسم SemVer.

| ما تريده                                                           | ما يجب استخدامه                |
| ------------------------------------------------------------------ | ------------------------------ |
| GitOps / إنتاج يجب ألا ينحرف                                       | ثبّت `:X.Y.Z` (أو ملخص الصورة) |
| متابعة الإصدارات المستقرة المنشورة وقبول إعادة الإنشاء مع كل إصدار | `:latest`                      |
| اختبار تعديلات `release/v*` غير المُصدرة                           | `:next` (ليس للإنتاج)          |
| اختبار `main`                                                      | `:main` (ليس للإنتاج)          |

## التوافر: يستخدم SQLite الافتراضي نسخة متماثلة واحدة

يتكون OmniRoute القياسي على Docker / Kubernetes من **عملية Node واحدة + كاتب SQLite واحد**. **لا يتوفر دعم التوافر العالي** في هذه البنية.

| القيد                                             | النتيجة                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| كاتب واحد                                         | **لا** تشغّل عدة نسخ متماثلة مقابل ملف SQLite نفسه. سيؤدي ذلك إلى إتلاف قاعدة البيانات.                                                                                                                                                                                                                                      |
| إعادة الإنشاء / إعادة التشغيل / إنهاء HEALTHCHECK | **انقطاع كامل** لاتصالات SSE قيد التنفيذ، وجلسات لوحة المعلومات، والحالة الموجودة في الذاكرة. ينقطع اتصال كل عميل متصل. تتلقى الطلبات الجديدة أثناء فترة عدم وجود نقاط نهاية خطأ **`502 Bad Gateway: Unknown error`** من الوكيل العكسي، وليس استجابة JSON من OmniRoute — ولا يمكن للعملاء تمييز ذلك عن فشل المزوّد (#11015). |
| حلقة الأحداث نفسها المستخدمة بواسطة `/healthz`    | يمكن أن تؤخر دورة كتالوج أو ضغط مشغولة استجابات الفحوصات؛ وعندئذٍ تؤدي مهلة قصيرة إلى إعادة تشغيل النسخة المتماثلة **الوحيدة**.                                                                                                                                                                                              |

**مصفوفة الفحوصات** (راجع أيضًا [توصيات فحوصات Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| الفحص                 | الهدف                                                          | ما يجب عدم استخدامه                              |
| --------------------- | -------------------------------------------------------------- | ------------------------------------------------ |
| البقاء                | TCP على `PORT` (الافتراضي `20128`)، أو HTTP مرن على `/healthz` | `/api/monitoring/health`                         |
| الجاهزية              | HTTP `GET /healthz`                                            | مهل زمنية صارمة تعتبر انشغال حلقة الأحداث توقفًا |
| الفحص المتعمق / للبشر | `/api/monitoring/health`                                       | فحص البقاء الآلي لـ kubelet                      |

**الترقيات:** توقّع انقطاع كل جلسة. استنزف اتصالات العملاء إن أمكن؛ فلا يوجد تحديث متدرج مع SQLite الافتراضي. سيؤدي أيضًا استخدام `restart: unless-stopped` في Compose مع `HEALTHCHECK` في Docker إلى استبدال العملية الوحيدة عندما تصبح حالة الحاوية Unhealthy — وبنطاق التأثير نفسه.

مقتطف Kubernetes خاص **بنسخة متماثلة واحدة** (يلزم استخدام Recreate؛ لا ترفع قيمة `replicas` عند استخدام ملف SQLite واحد):

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

يتيح الانتظار في `preStop` لـ kube إزالة نقاط نهاية Service قبل SIGTERM، بحيث تتوقف حركة المرور **الجديدة** عن الوصول إلى العملية التي يجري إنهاؤها. تُستنزف اتصالات SSE الخاصة بـ `/v1/responses` قيد التنفيذ لمدة تصل إلى `SHUTDOWN_TIMEOUT_MS` (المدة الافتراضية 30 ثانية) عبر عقود قبول ثقيلة (#11015). تتلقى الطلبات الجديدة التي لا تزال تصل إلى العملية استجابة `503` مع `Retry-After: 5`. وتظل فجوة عدم وجود نقاط نهاية الناتجة عن Recreate، إلى أن تصبح النسخة البديلة Ready، انقطاعًا تامًا — فهذه طبيعة بنية SQLite وليست خطأ في إعداد الفحوصات.

لا يُعد Postgres الخارجي / التوافر العالي متعدد الكتّاب مسارًا قياسيًا **موثّقًا**. إذا كنت بحاجة إلى التوافر العالي، فاحتفظ بنسخة متماثلة واحدة أو شغّل بنية اختبرها المشروع ووثّقها بشكل منفصل. يجري العمل على Postgres/MySQL ضمن [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). وحتى إصدار ذلك، فإن الطريقة الوحيدة المدعومة لمضاعفة سعة طلبات `/v1/responses` **الكبيرة** هي تشغيل N من العمليات المستقلة (القسم التالي)، وليس استخدام `replicas > 1` على وحدة تخزين واحدة.

## التوسّع الأفقي: N من العمليات المستقلة

عملية Node واحدة تعني **كومة V8 واحدة**. يؤدي طلبان متداخلان من نوع `POST /v1/responses` لوكيلَي برمجة (RTK + Caveman)، بحجم يقارب 3 MiB / 750k رمز لكل منهما، إلى إيقاف تلك الكومة عند نحو 12 Gi (`FATAL ERROR: Reached heap limit`)، وقد يتسببان في نفاد الذاكرة ضمن cgroup بسعة 16 Gi. راجع [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). هذا القياس هو تحذير متعلق **بميزانية الذاكرة**، وليس حدًا أقصى ثابتًا في المنتج يقتصر على طلبين طويلين متزامنين من `/v1/responses`. يُنظَّم قبول محادثات الدردشة الثقيلة بواسطة ميزانية بايتات إدخال مشتقة تلقائيًا (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`، و`src/shared/middleware/admissionBudget.ts`) ومحددة الحجم وفق سقف V8/cgroup نفسه — ويؤدي رفعها يدويًا (أو تعيين حد عدد الطلبات القديم `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) في عملية سبق تحديد حجمها إلى إعادة حدوث الإيقاف. لا تخضع المحادثات الصغيرة و`/healthz` و`/v1/models` وMCP لهذا الحد.

### عملية واحدة: أكثر من طلبين طويلين من `/v1/responses`

**قد** تشغّل عملية **سليمة** (تكون الكومة فيها دون `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`، والقيمة الافتراضية `0.75`) أكثر من طلبين طويلين متزامنين من نوع `POST /v1/responses` عندما تظل هناك سعة ضمن ميزانية البايتات قيد التنفيذ على مستوى العملية (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). تحصل أجسام الطلبات التي يبلغ حجمها `OMNIROUTE_CHAT_LARGE_BODY_BYTES` أو يزيد عليه (القيمة الافتراضية 256 KiB) على حجز الموارد الثقيل نفسه الذي تحصل عليه الطلبات كثيفة البنية، وتستخدم مسار التجاوز `tryAcquireHealthyHeadroom` نفسه من [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). إن تشغيل عشرات عملاء SSE الطويلين بالتزامن (يحتاج المشغّلون غالبًا إلى 40–50) هو مسألة **ميزانية ذاكرة** — اضبط حجم الكومة + الخانات الأساسية/الإضافية + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — وليس حدًا ثابتًا في المنتج مقداره «طلبان كحد أقصى». وتستمر الكومة الواقعة تحت الضغط في رفض الحمل باستخدام `503` قابل لإعادة المحاولة كي لا تتكرر المشكلة #7849.

لـ**مضاعفة الأكوام** (مساحات V8 قديمة مستقلة) **حاليًا**:

| افعل                                                                                                                                                                                             | لا تفعل                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| شغّل **N من الحاويات/وحدات pod**، بحيث يكون لكل منها `DATA_DIR` / وحدة تخزين **خاصة بها**                                                                                                        | تعيّن `replicas > 1` لملف SQLite واحد                          |
| اضبط حجم الطلبات الثقيلة قيد التنفيذ + السعة الإضافية السليمة وفق ميزانية الكومة / البايتات قيد التنفيذ؛ القيمة 1–2 هي الإعداد الافتراضي المحافظ للمشكلة #7849، وليست حدًا أقصى ثابتًا في المنتج | تمنح عملية واحدة ذاكرة RAM أكبر بمقدار 8× وحدًا غير مقيد للعدد |
| اختياري: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` لاستخدام **عدادات حصص مشتركة**                                                                                                     | تعامل Redis على أنه SQLite مشترك — فهو ليس كذلك                |
| انسخ أسرار المزوّد إلى كل نسخة (أو اقبل لوحات معلومات مقسّمة)                                                                                                                                    | تتوقع لوحة معلومات واحدة / سجل استدعاءات واحد عبر النسخ        |
| ضع أي موازن أحمال أمامها؛ ويكفي التثبيت حسب مفتاح API أو الجلسة                                                                                                                                  | تتطلب برمجية وسيطة خاصة بمورّد معيّن ومدركة للحجم              |

العتاد: عدد طلبات `/v1/responses` الطويلة المتزامنة لكل نسخة هو مسألة **ميزانية ذاكرة** (الكومة + البايتات قيد التنفيذ / #10110). تظل قيم `DATA_DIR` المستقلة وعددها `N` تضاعف الأكوام: يجب أن تغطي ذاكرة RAM للمضيف `N × cgroup`، وليس «وحدة pod واحدة بسعة 16 Gi مع N=8». لا تستخدم مطلقًا `replicas > 1` مع ملف SQLite واحد.

مخطط Compose (كومتان، ووحدتا تخزين — وليس `deploy.replicas: 2`):

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

زيادة الكثافة داخل العملية (مع نقل الضغط خارج عازل HTTP) هي [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). أما إنشاء عنقود منطقي واحد فوق حالة دائمة مشتركة فهو [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## ملاحظات مهمة

- **وضع SQLite WAL:** يجب السماح للأمر `docker stop` بإكمال التنفيذ حتى يتمكن OmniRoute من تسجيل أحدث التغييرات في `storage.sqlite`. تضبط ملفات Compose المرفقة بالفعل فترة سماح للإيقاف مدتها 40 ثانية. إذا شغّلت الصورة مباشرةً، فاحتفظ بالخيار `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** اضبطه على `true` إذا كانت النسخ الاحتياطية الدورية/السابقة للكتابة تُدار خارجيًا. لا تزال عمليات ترحيل قواعد البيانات الحالية تتطلب لقطة أمان دائمة خاصة بها وآلية حماية لعمليات الترحيل الجماعي.
- **استمرارية البيانات:** احرص دائمًا على تحميل وحدة تخزين إلى `/app/data` للحفاظ على قاعدة البيانات والمفاتيح والإعدادات عبر عمليات إعادة تشغيل الحاوية.
- **إعداد المنفذ:** تجاوز متغير البيئة `PORT` لتغيير المنفذ الافتراضي `20128`.

## انظر أيضًا

- [دليل النشر على جهاز افتراضي](../ops/VM_DEPLOYMENT_GUIDE.md) — إعداد جهاز افتراضي + nginx + Cloudflare
- [دليل النشر على Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — النشر على Fly.io
- [إعدادات البيئة](../reference/ENVIRONMENT.md) — مرجع `.env` الكامل
