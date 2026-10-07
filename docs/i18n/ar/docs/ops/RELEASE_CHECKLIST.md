# Release Checklist (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **آخر تحديث:** 2026-08-28 — v3.8.51
> مسار إصدار مُبسّط يستفيد من مهارات Claude Code للأتمتة.
>
> **حافظ على سلامة قائمة الانتظار/الفرع بين الإصدارات:** راجع [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (عائلة `/green-prs` + ‏`npm run check:release-green` + ‏`/babysit` + التشغيل الليلي). يساعد تشغيل
> هذا دوريًا — وخصوصًا **قبل** قائمة التحقق هذه — على بدء طلب سحب الإصدار بحالة سليمة.

## الخلاصة

```bash
# 1. ارفع الإصدار وأنشئ CHANGELOG (مهارة)
/version-bump-cc patch    # أو minor/major

# 2. شغّل بوابة الجودة محليًا
npm run check              # التدقيق + الاختبارات
npm run test:coverage      # بوابة التغطية الكاملة (60/60/60/60)

# 3. ابنِ ونفّذ اختبارًا مبدئيًا
npm run build
npm run test:e2e           # اختياري لكنه موصى به

# 4. أنشئ الإصدار (مهارة)
/generate-release-cc

# 5. انشر (مهارة)
/deploy-vps-both-cc        # أو akamai-cc / local-cc

# 6. التقط أدلة الإصدار (مهارة)
/capture-release-evidences-cc
```

## النشر الموثوق في npm (الافتراضي منذ v3.8.51) — مرحلي عند الطلب، ومباشر كخيار احتياطي

ينشر `npm-publish.yml` عبر **النشر الموثوق في npm (OIDC)** افتراضيًا: تستبدل
مهمة `stage-npm` (المستضافة على GitHub) رمز هوية GitHub ببيانات اعتماد npm
قصيرة الأجل لذلك التشغيل — من دون رمز npm طويل الأجل في أسرار المستودع، ومن دون مطالبة بالمصادقة الثنائية، مع إرفاق إثبات المصدر.
هذا هو التجاوز الذي يقرّه npm الآن بعد بدء إيقاف الرموز التي تتخطى المصادقة الثنائية؛
وهو يعيد المسار المؤتمت بالكامل الذي كان لدى المشروع حتى v3.8.48 مع الحفاظ على
ضمان WS1.3 (لا يمكن لرمز مُسرَّب أن ينشر بمفرده — إذ لا يوجد رمز أصلًا).

**إعداد لمرة واحدة (المالك):** npmjs.com ← الحزمة `omniroute` ← Settings ← _Trusted
Publisher_ ← GitHub: المالك `diegosouzapw`، المستودع `OmniRoute`، سير العمل `npm-publish.yml`
(البيئة: لا شيء). وحتى يتم ذلك، تفشل الخطوة التلقائية برسالة `ENEEDAUTH`:
أعِد التشغيل باستخدام `publish_mode=staged` (أدناه) أو `direct`.

### النشر المرحلي (عند الطلب — `publish_mode=staged`)

لم يعد سير عمل npm-publish ينشر مباشرةً: بل يُشغّل حزمة tarball المعبأة
(`check:pack-boot`) ثم ينفّذ `npm stage publish` — فتُحفظ وحدات البايت نفسها في
السجل، وتكون **غير قابلة للتثبيت** إلى أن يوافق المالك. انتقلت بوابة المصادقة الثنائية البشرية
إلى ما بعد الإثبات، وليس قبله.

**مسار المالك بعد نجاح سير العمل:**

1. `npm stage list omniroute` — ابحث عن معرّف المرحلة (يُطبع أيضًا في ملخص سير العمل).
2. تحقّق من وحدات البايت المرحلية (موصى به): `npm stage download <id>`، ثم ثبّت ملف tarball
   المنزّل في بادئة مؤقتة وشغّله (`npm run check:pack-boot` يؤتمت
   نتيجة الحزم←التثبيت←التشغيل نفسها في CI).
3. `npm stage approve <id>` — مطالبة المصادقة الثنائية هي عملية النشر نفسها. أما `npm stage reject <id>` فيتجاهل المرحلة.
4. شبكة أمان ما بعد النشر: يثبّت مدقّق ما بعد النشر (WS1.4 من خطة v3.8.49)
   الإصدار المنشور من السجل العام داخل حاوية نظيفة ويشغّله.

**الخيار الاحتياطي للطوارئ:** يعيد `workflow_dispatch` مع `publish_mode=direct`
سلوك `npm publish` الفوري القديم (استخدمه فقط إذا تعطّل النظام المرحلي نفسه؛ وسجّل السبب).

**تحصين لمرة واحدة (المالك، npmjs.com):** اضبط Trusted Publisher للحزمة
`omniroute` على وضع المراحل فقط، بحيث لا يستطيع رمز طويل الأجل مُسرَّب تنفيذ `npm publish`
مباشرةً من أي مكان — لا يستطيع CI سوى إنشاء مرحلة؛ ولا يُصدرها إلا المالك عبر المصادقة الثنائية.

**دليل التعامل مع العنصر المعطّل (من دون تغيير):** استخدم `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
بصفته الإجراء الافتراضي السريع (دقائق، قابل للعكس)؛ ولا تستخدم `npm unpublish` إلا ضمن نافذة
72 ساعة/عدم وجود حزم تابعة، وألا يكون ذلك الإجراء الأول أبدًا. بالنسبة إلى Docker: لا تعِد كتابة وسم إصدار مطلقًا — تتم
العودة إلى الإصدار السابق بإعادة توجيه `latest` إلى آخر بصمة سليمة.

**وسم Docker Hub‏ `latest` (مطلوب مع كل نشر SemVer مستقر):** يجب أن يضع سير عمل
`docker-publish` وسمًا **لكلٍ من** `X.Y.Z` و، عندما يؤكد
`should-promote-latest.sh` أنه أعلى إصدار SemVer مستقر، `:latest`
باستخدام **البصمة نفسها**. بعد اكتمال المهمة: يجب أن تساوي بصمة `latest` على Hub بصمة
SemVer الجديدة وأن تتغير قيمة `last_updated`. لا تترك `:latest` يشير إلى
بناء أقدم بينما تتحدث ملاحظات الإصدار عن إصلاحات لا توجد إلا في git. تستخدم
أدلة البدء السريع في Compose الوسم `:latest`؛ وينبغي أن يستمر GitOps في تثبيت `X.Y.Z`. راجع
[قنوات إصدار Docker](../guides/DOCKER_GUIDE.md#release-channels) و#10317.

## المسار السريع للإصلاحات العاجلة (التسمية `hotfix`)

يتجاوز طلب السحب الذي يحمل التسمية `hotfix` مصفوفة CI الثقيلة (اختبارات E2E موزعة على 9 أجزاء، وآلية رفع عتبة التغطية،
وquality-gate، وquality-extended)، ويُبقي على بوابات التحقق السريعة وعالية الدلالة: البناء،
وأجزاء اختبارات الوحدة، والتكامل، وvitest، وlint/typecheck، وdocs-sync، و`check:pack-artifact`
واختبار التشغيل الأولي لحزمة tarball (`check:pack-boot`). الهدف: الوصول إلى الحالة الخضراء خلال ≤15 دقيقة بدلًا من نحو 33 دقيقة.

**سياسة الدخول — المتطلبات الأربعة جميعها إلزامية (على غرار مسارات الطوارئ في Chromium/VS Code/Node):**

1. **الخطورة**: بيئة الإنتاج معطلة — حزمة منشورة تتعطل عند التشغيل / إصلاح أمني /
   كل مستخدمي الإصدار متأثرون. «مهم» لا يعني «معطل».
2. **الصلاحية**: مالك المستودع وحده يطبّق التسمية `hotfix`. التسمية هي
   الموافقة — ولا يجوز أبدًا تطبيقها ذاتيًا على طلب سحب ضمن حملة.
3. **الدليل**: يتضمن نص طلب السحب رابطًا إلى آخر تشغيل ثقيل مكتمل بحالة خضراء (مجموعة الاختبارات التي
   كانت المهام المتجاوزة ستعيد التحقق منها)، بالإضافة إلى اختبار الإصلاح نفسه الذي يفشل قبل الإصلاح ثم ينجح بعده.
4. **النطاق**: cherry-pick فقط — الحد الأدنى من الإصلاح، دون إعادة هيكلة أو تغييرات إضافية مرافقة.

تُعاد عملية التحقق من نطاق التغطية/رفع العتبة المتجاوز في التشغيل الكامل التالي على
فرع الإصدار (استمرار خضرة الإصدار) — يتجاوز المسار الانتظار فقط، ولا يتجاوز التحقق مطلقًا.
تتجاوز التغييرات الخاصة بالاختبارات فقط (جميع الملفات تحت `tests/`، ولا شيء تحت `tests/e2e/`) مصفوفة E2E
تلقائيًا، دون أي تسمية.

## قائمة التحقق التفصيلية

### ما قبل الإصدار

- [ ] دُمجت جميع طلبات السحب المستهدفة لهذا الإصدار في `release/vX.Y.0`
- [ ] أُغلقت جميع عناصر Linear/المشكلات المفتوحة لهذا الإصدار أو نُقلت إلى المرحلة الرئيسية التالية
- [ ] حالة CI خضراء على فرع `release/vX.Y.0`
- [ ] لا توجد علامات `TODO(release)` في الشيفرة: `grep -r "TODO(release)" src/ open-sse/`
- [ ] صورة Docker الأساسية محدّثة (حاليًا `node:24.15.0-trixie-slim`)

### الإصدار وسجل التغييرات

- [ ] شغّل `/version-bump-cc <patch|minor|major>` (مهارة Claude Code)
  - يرفع الإصدار في `package.json` و`electron/package.json`
  - يعيد إنشاء `CHANGELOG.md` من إيداعات git منذ آخر وسم
  - يحدّث شارات README.md
- [ ] راجع CHANGELOG.md يدويًا ونظّف رسائل الإيداعات عند الحاجة
- [ ] تأكد من أن أحدث قسم semver في `CHANGELOG.md` يطابق إصدار `package.json`
- [ ] أبقِ `## [Unreleased]` بوصفه أول قسم في سجل التغييرات للأعمال القادمة
- [ ] حدّث `docs/openapi.yaml` ← يجب أن تساوي `info.version` إصدار `package.json`

### جودة الشيفرة

- [ ] `npm run lint` — 0 أخطاء (التحذيرات موجودة مسبقًا)
- [ ] `npm run typecheck:core` — بلا أخطاء
- [ ] `npm run typecheck:noimplicit:core` — بلا أخطاء (صارم)
- [ ] `npm run check:cycles` — لا توجد تبعيات دائرية
- [ ] `npm run check:any-budget:t11` — ضمن الميزانية
- [ ] `npm run check:route-validation:t06` — بلا أخطاء
- [ ] `npm run check:node-runtime` — استيفاء الحد الأدنى لبيئة التشغيل المدعومة (`>=22.22.2 <23`، و`>=24.0.0 <27`، وفقًا لـ`SUPPORTED_NODE_RANGE` في `src/shared/utils/nodeRuntimeSupport.ts`؛ ومتوافق مع `engines` في `package.json`)

### الاختبارات

- [ ] `npm run test:unit` — ناجح
- [ ] `npm run test:vitest` — ناجح (خادم MCP، وautoCombo، وذاكرة التخزين المؤقت)
- [ ] `npm run test:coverage` — استيفاء بوابة 60/60/60/60 (العبارات/الأسطر/الدوال/الفروع)
- [ ] `npm run test:integration` — ناجح (إذا مست التغييرات قاعدة البيانات / المعالجات)
- [ ] `npm run test:combo:matrix` — ناجح (مصفوفة إستراتيجيات combo: تثبت قرارات الاختيار لجميع إستراتيجيات التوجيه العامة البالغ عددها 19 بصورة حتمية؛ شغّله عند تعديل توجيه combo، أو تحليل الإستراتيجية، أو منطق الرجوع الاحتياطي)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **اختياري/يدوي** (اختبار أولي مقيّد لخدمات المنبع الحقيقية؛ يستورد لقطة قاعدة بيانات للقراءة فقط من VPS ‏`root@192.168.0.15`؛ يتصل بموفّرين حقيقيين ويستهلك رصيدًا؛ لا يعمل مطلقًا في CI؛ ويُتجاوز دون أخطاء عند غياب البوابة)
- [ ] `npm run test:combo:live:vps` — **اختياري/يدوي** (اختبار VPS أولي مباشر للمرحلة الثالثة: 7 سيناريوهات HTTP على خادم `.15` المباشر عبر Node ESM خالص؛ يتطلب `ssh root@192.168.0.15`؛ ينشئ/يحذف فقط مجموعات `__live_test__*`؛ يتصل بموفّرين حقيقيين؛ ولا يعمل مطلقًا في CI)
- [ ] `npm run test:e2e` — ناجح (تغييرات واجهة المستخدم)
- [ ] `npm run test:protocols:e2e` — ناجح (تغييرات MCP/A2A)
- [ ] `npm run test:ecosystem` — ناجح

### الخطافات (متحقق منها بواسطة Husky)

توجد خطافات Husky في `.husky/` وتعمل تلقائيًا عند تنفيذ عمليات git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** بوابات تحقق سريعة وحتمية — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (فُعّلت في 2026-06-13). تستبعد `test:unit` عمدًا (بطيء؛ وتغطيه مهمة CI المسماة `test-unit`).
  - شغّل `npm run test:unit` يدويًا قبل دفع فروع الإصدار.

إذا فشل أحد الخطافات: أصلح المشكلة الأساسية، ولا تتجاوزه باستخدام `--no-verify`.

### الإيداعات التقليدية

يجب أن تتبع جميع الإيداعات الموجهة إلى الإصدار التنسيق `type(scope): subject`.

**الأنواع الصالحة:** `feat`، و`fix`، و`refactor`، و`docs`، و`test`، و`chore`، و`perf`، و`style`، و`ci`

**النطاقات الصالحة:** `db`، و`sse`، و`oauth`، و`dashboard`، و`api`، و`cli`، و`docker`، و`ci`، و`mcp`، و`a2a`، و`memory`، و`skills`، و`cloud-agent`، و`guardrails`، و`compression`، و`auto-combo`، و`resilience`، و`providers`، و`executors`، و`translator`، و`domain`، و`authz`

التغييرات الكاسرة للتوافق: أضف تذييل `BREAKING CHANGE:` أو `!` بعد النطاق (مثل `feat(api)!: drop /v0`).

### التوثيق

- [ ] ينجح `npm run check:docs-sync` (يُشغَّل تلقائيًا بواسطة pre-commit)
- [ ] ينجح `npm run check:docs-all` (فحص شامل: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] ينتهي `npm run check:env-doc-sync` بالرمز 0 — عقد متغيرات البيئة بين الشيفرة ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` سليم
- [ ] ينتهي `npm run check:doc-links` بالرمز 0 — لا توجد مراجع markdown داخلية معطّلة بعد إعادة الهيكلة
- [ ] تمت مراجعة `docs/architecture/ARCHITECTURE.md` للتحقق من عدم وجود انحراف في التخزين/بيئة التشغيل
- [ ] تمت مراجعة `docs/guides/TROUBLESHOOTING.md` للتحقق من عدم وجود انحراف في متغيرات البيئة والإجراءات التشغيلية
- [ ] إذا تغيّر `.env.example`: تم تحديث `docs/reference/ENVIRONMENT.md`
- [ ] إذا كانت للميزة الجديدة واجهة مستخدم: يذكرها `docs/guides/USER_GUIDE.md`
- [ ] إذا كانت للميزة الجديدة API: تم تحديث `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] إذا كانت الميزة الجديدة وحدة: يوجد ملف مخصص باسم `docs/<MODULE>.md`
- [ ] إذا كان التغيير كاسرًا للتوافق: يتضمن `docs/guides/TROUBLESHOOTING.md` ملاحظة ترحيل

### التدويل

- [ ] ينتهي `npm run i18n:check` بالرمز 0 — حالة الترجمة (`.i18n-state.json`) متزامنة مع مستندات المصدر (لا توجد مصادر منحرفة في الوضع الصارم؛ يُقبل التحذير الإرشادي في وضع التحذير للتعديلات الأخيرة على المستندات، ولكن يجب أن تكون النتيجة 0 قبل وضع الوسم)
- [ ] ينتهي `npm run i18n:check-ui-coverage` بالرمز 0 — تبلغ تغطية كل لغة لواجهة المستخدم حد 80% الأدنى أو تتجاوزه
- [ ] يُبلغ `npm run i18n:sync-ui:dry` عن عدم وجود أي مفاتيح مفقودة عبر جميع اللغات الـ 42
- [ ] إذا تغيّرت مستندات المصدر الإنجليزية، فشغّل `npm run i18n:run` (يتطلب `OMNIROUTE_TRANSLATION_API_KEY` في `.env`) قبل وضع الوسم
- [ ] يمكن تأجيل مساهمات الترجمة إلى الإصدار التالي إذا كانت طفيفة (تُتابع في CHANGELOG)

### ترحيلات قاعدة البيانات

- [ ] إذا كان `src/lib/db/migrations/` يحتوي على ملفات جديدة:
  - [ ] كل ترحيل متكرر التنفيذ بأمان (`CREATE TABLE IF NOT EXISTS`، وما إلى ذلك)
  - [ ] الترحيلات مغلّفة ضمن معاملات
  - [ ] مرقّمة بصورة صحيحة (لا توجد فجوات في التسلسل)
- [ ] الاختبار على تثبيت جديد: احذف `~/.omniroute/omniroute.db` وشغّل `npm run dev`
- [ ] الاختبار على تثبيت موجود: أنشئ نسخة احتياطية من قاعدة البيانات، وشغّل الترحيل، وتحقق من المخطط
- [ ] تتم معالجة ملفات WAL (`-wal`، `-shm`) بصورة صحيحة إذا كان الترحيل يعيد كتابة الجداول

### كتالوج المزوّدين (مُتحقق منه بواسطة Zod)

- [ ] مخطط Zod في `src/shared/constants/providers.ts` صالح عند التحميل
  - [ ] لدى جميع المزوّدين الحقول المطلوبة (`id`، `label`، `kind`، وما إلى ذلك)
  - [ ] تم توفير `freeNote` للمزوّدين المجانيين الجدد
  - [ ] لدى مزوّدي OAuth إعداد `oauthConfig` مسجل في `src/lib/oauth/constants/oauth.ts`
- [ ] إذا تمت إضافة مزوّد جديد: يوجد منفّذ مقابل في `open-sse/executors/`
- [ ] إذا كان التنسيق غير متوافق مع OpenAI: يوجد مترجم في `open-sse/translator/`
- [ ] النماذج مسجلة في `open-sse/config/providerRegistry.ts`
- [ ] تغطي اختبارات الوحدة في `tests/unit/` تصنيف المزوّدين والتوجيه

### سطح المكتب (Electron)

إذا تغيّر `electron/`:

- [ ] ينجح `npm run electron:smoke:packaged`
- [ ] تم اختبار عمليات البناء لواحد على الأقل من `:win`، `:mac`، `:linux`
- [ ] شهادات توقيع الشيفرة غير منتهية الصلاحية (إذا كان التوقيع مستخدمًا)
- [ ] يتطابق إصدار `electron/package.json` مع `package.json` الجذري
- [ ] تم تحديث مؤشر قناة التحديث التلقائي إذا كان الإصدار موجّهًا إلى `stable`

### تخطيط البناء

يستخدم المستودع ثلاثة أدلة إخراج منفصلة — لا تخلط بينها مطلقًا:

| الدليل    | الغرض                                                  | خاضع للتتبع؟     |
| --------- | ------------------------------------------------------ | ---------------- |
| `src/`    | مصدر التطبيق (TypeScript / TSX)                        | نعم              |
| `.build/` | نواتج البناء الوسيطة — مخرجات `next build` (`distDir`) | لا (يتجاهله git) |
| `dist/`   | حزمة npm القابلة للتوزيع — يجمعها `assembleStandalone` | لا (يتجاهله git) |

> **ملاحظة للمشغّل:** يظل دليل الصورة على VPS البعيد هو `/usr/lib/node_modules/omniroute/app/`.
> انتقلت فقط مخرجات البناء **داخل المستودع** (`app/` → `dist/`). تستخدم مهارات النشر rsync
> لمزامنة محتويات `dist/` مع دليل `app/` البعيد — ولا يلزم إجراء أي تغييرات على مسارات VPS.

**تدفق البناء الواحد:**

```
npm run build:release
  └─ rm -rf .build dist          (تنظيف)
  └─ next build → .build/next/   (نواتج وسيطة)
  └─ assembleStandalone          (ينسخ الحزمة المستقلة + الملفات الثابتة + العامة + الأصلية → dist/)
  └─ writes dist/BUILD_SHA       (علامة HEAD)
```

لا تشغّل `npm run build` متبوعًا بأمر `npm run build:cli` منفصل للنشر — استخدم
`npm run build:release`، الذي يُجري إعادة بناء نظيفة + إنشاء العلامة في أمر واحد.

### التحقق من الملفات الناتجة

- [ ] ينجح `npm run build:release` وتكون `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] ينجح `npm run check:pack-artifact` دون مشكلات — لا توجد `app.__qa_backup` أو `scripts/scratch` أو `package-lock.json` أو أي بقايا محلية أخرى
- [ ] يوجد `dist/server.js` بعد البناء

### وضع الوسم والإصدار

- [ ] شغّل `/generate-release-cc` (مهارة Claude Code):
  - ينشئ الوسم `vX.Y.Z`
  - يدفع الوسم والفرع
  - ينشئ إصدار GitHub يتضمن سجل التغييرات
  - يرفق مثبّتات Electron (إذا تم بناؤها)
- [ ] أو نفّذ ذلك يدويًا:
  ```bash
  git tag -a vX.Y.Z -m "إصدار vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### النشر

تستخدم مهارات النشر تدفق rsync الخفيف — دون `npm pack` ودون `npm i -g`:

- [ ] استخدم مهارة النشر المطابقة للهدف:
  - `/deploy-vps-local-cc` — خادم VPS محلي (192.168.0.15)
  - `/deploy-vps-akamai-cc` — خادم Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — كلاهما
- [ ] قبل النشر، تأكد من أن `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] يجب تشغيل البناء في مكان يكون فيه `node_modules` حقيقيًا (نسخة العمل الرئيسية أو شجرة عمل نُفّذ فيها `npm ci` — وليست شجرة عمل مرتبطة برابط رمزي)
- [ ] أجرِ اختبارًا أوليًا على النسخة المنشورة:
  - افتح `/dashboard/health` ← تحقق من تطابق سلسلة الإصدار مع الإصدار المنشور
  - نفّذ طلب `/v1/chat/completions` باستخدام مزوّد معروف
  - تحقق من أن `/api/monitoring/health` يعيد قواطع دوائر بالحالة `CLOSED`
  - تأكد من استجابة وسائل نقل MCP (`/mcp` عبر HTTP، و`/mcp-sse` عبر SSE)

### ما بعد الإصدار

- [ ] شغّل `/capture-release-evidences-cc` (مهارة Claude Code)
  - يلتقط لقطات شاشة/تسجيلات بصيغة WebP للميزات الجديدة
  - يرفقها بملاحظات الإصدار / منشور المدونة
- [ ] حدّث GitHub Discussions / Discord بإعلان الإصدار
- [ ] افتح مرحلة رئيسية للإصدار التالي
- [ ] إذا كان الأمر بالغ الأهمية: ثبّت المناقشة أو انشر في `news.json` لعرض لافتة داخل التطبيق

### بوابة الإطلاق العام لـ Radar

أُدرج إعلان Radar عمدًا مع `active: false`. ويُعد التفعيل تغييرًا منفصلًا
يتم بعد تقديم أدلة على إنجاز كل بند أدناه:

- [ ] دُمجت جميع طلبات السحب المتراكبة الخاصة بـ Radar، وكانت عملية CI لـ release-tip ناجحة
- [ ] انشر مسارات Radar مفتوحة المصدر واختبرها مبدئيًا مع إبقاء `RADAR_ENABLED` معطّلًا افتراضيًا
- [ ] اختبر مبدئيًا `GET /planos` و`/termos` و`/privacidade` و`/reembolso` على مضيف Radar المحدد
- [ ] سجّل هوية المشغّل/جهة الاتصال/العنوان والمراجعة القانونية المعتمدة من المالك في الخدمة الخاصة
- [ ] اختبر Stripe Checkout وخطاف الويب الموقّع في وضع الاختبار فقط
- [ ] اختبر عملية تسليم واحدة لبريد إلكتروني مشفّر خاص بالمعاملات باستخدام المرسِل/النطاق المعتمد
- [ ] أثبت نجاح استعادة النسخة الاحتياطية وتنفيذ عملية بحث واحدة خاضعة للإشراف ومحدودة الميزانية
- [ ] اعتمد سياسة مراجعة BRL/PIX قبل قبول أدلة التبرعات
- [ ] فعّل Checkout العام فقط بعد اجتياز البوابات السابقة، ثم فعّل المعرّف الجديد في `news.json`
- [ ] تحقّق من أن لافتة الصفحة الرئيسية تستخدم نصًا مترجمًا، وأن المعرّف الجديد يظهر مجددًا بعد تجاهل معرّف أقدم

## اختبار دخان الخدمات المضمّنة (v3.8.4+)

قبل إصدار أي نسخة تتضمن تغييرات في الخدمات المضمّنة، تحقّق مما يلي:

### الإقلاع بقاعدة بيانات جديدة (يكشف تعارضات الترحيل — أُضيف بعد الإصلاح العاجل لـ v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — انتظر 10 ثوانٍ حتى الإقلاع
- [ ] يُرجع `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` القيمة `"9router"` (وليس 404 أو 500). يؤكد تطبيق الترحيل `071_services.sql` + إدراج الصف الأولي.
- [ ] يُرجع `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` عدد 3 صفوف.
- [ ] يُرجع `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` عدد صفّين (يتحقق من تطبيق `070_webhooks_kind_metadata.sql`).
- [ ] ينجح `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` — يحمي من التعارضات المستقبلية.

### 9Router

- [ ] يُرجع `POST /api/services/9router/install` الحالة 200 مع `installedVersion` خلال أقل من دقيقتين
- [ ] يُرجع `POST /api/services/9router/start` الحالة 200 و`state: "running"` خلال أقل من 30 ثانية
- [ ] يُبلغ `GET /api/services/9router/status` عن `health: "healthy"`
- [ ] يُرجع `POST /v1/chat/completions` مع `"model": "9router/auto/..."` الحالة 200 (توجيه شامل من طرف إلى طرف عبر 9Router)
- [ ] يعرض `GET /dashboard/providers/services/9router/embed/dashboard` واجهة 9Router الأصلية داخل الوكيل (من دون iframe مباشر إلى `127.0.0.1:port`)
- [ ] يُرجع `POST /api/services/9router/rotate-key` القيمة `{ keyRotated: true }` وتُعاد إعادة تشغيل الخدمة بصورة سليمة
- [ ] يُرجع `POST /api/services/9router/stop` الحالة 200 و`state: "stopped"`
- [ ] يُرجع `GET /api/services/9router/logs?tail=50` تدفق SSE مع حدث `snapshot` يحتوي على الأسطر الحديثة
- [ ] يُرجع التثبيت في بيئة لا تحتوي على `npm` ضمن PATH الحالة 500 مع رسالة خطأ مفهومة (من دون تتبّع للمكدس)

### CLIProxyAPI

- [ ] يُرجع `POST /api/services/cliproxy/install` الحالة 200 خلال أقل من دقيقتين
- [ ] يُرجع `POST /api/services/cliproxy/start` الحالة 200 و`state: "running"` خلال أقل من 30 ثانية
- [ ] يُبلغ `GET /api/services/cliproxy/status` عن `health: "healthy"`
- [ ] يُرجع `POST /api/services/cliproxy/stop` الحالة 200 و`state: "stopped"`
- [ ] يُرجع `GET /api/services/cliproxy/logs?tail=50` تدفق SSE

### التحقق من الانحدارات الأمنية

- [ ] يُرجع `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` القيمة `403 LOCAL_ONLY`
- [ ] يُرجع `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` القيمة `403 LOCAL_ONLY`
- [ ] لا تحتوي استجابات الأخطاء من `/api/services/*` على `err.stack` أو مسارات ملفات مطلقة

## فحوصات v3.8.0+

قبل إصدار أي نسخة من v3.8.x، تحقّق من هذه العناصر الإضافية:

- [ ] يُقلع `omniroute --tray` على macOS (مع تثبيت systray2 في `~/.omniroute/runtime/`)
- [ ] يُقلع `omniroute --tray` على Linux (يتطلب DISPLAY؛ ويعرض خطأً مناسبًا إذا لم يكن معيّنًا)
- [ ] يُقلع `omniroute --tray` على Windows (PowerShell NotifyIcon، من دون ملفات ثنائية إضافية)
- [ ] ينشئ `omniroute config tray enable` إدخال تشغيل تلقائي؛ وتؤدي عملية التعطيل إلى إزالته
- [ ] يشغّل `npm install -g omniroute@<this-version>` مرحلة ما بعد التثبيت من دون خروج فادح
- [ ] يحتفظ مسار التحديث بالتبعيات الاختيارية: يشغّل `omniroute update --apply` والمحدّث التلقائي
      الأمر `npm install -g … --include=optional` بحيث تبقى `optionalDependencies` (better-sqlite3،
      وkeytar، وtls-client، ومكدس llmlingua SLM: ‏`@atjsh/llmlingua-2@2.0.5`،
      و`js-tiktoken`) بعد التحديث. تحتاج فئة SLM فائقة المستوى `modelPath` أيضًا إلى نموذج
      tinybert، الذي يُنزَّل تلقائيًا إلى `${DATA_DIR}/models/llmlingua` عند أول استخدام. بعد ذلك، تعمل مرحلة ما بعد التثبيت
      (`scripts/build/colocateOptionals.mjs`) على وضع إغلاق تبعيات SLM الاختيارية في الموقع نفسه داخل
      `dist/node_modules` لكي يحلّ العامل مثيلًا واحدًا فقط من `@huggingface/transformers` ^4.2.0
      — إذ لا تضم حزمة التتبّع المستقلة سوى transformers، وليس التبعيات الاختيارية المستوردة ديناميكيًا،
      ولذلك، من دون هذا، سيحمّل العامل llmlingua-2 مقابل transformers الموجود في الجذر
      وستفشل فئة SLM بصمت مع السماح بالمتابعة.
- [ ] يعمل `omniroute status` من دون `.env` (مسار رمز CLI، عبر loopback فقط)
- [ ] يُرجع `curl http://localhost:20128/api/shutdown` الحالة 401 (مسار محمي دائمًا)
- [ ] يُرجع `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` الحالة 401 (حارس loopback)
- [ ] يُحل وقت تشغيل SQLite إلى `bundled` عند التشغيل الأول (الملف الثنائي المضمّن صالح للمنصة)
- [ ] يعود وقت تشغيل SQLite إلى `runtime` عند حذف `node_modules/better-sqlite3`
- [ ] يضغط مرشّح MCP الذكي المخرجات الفعلية للأمر `playwright-mcp browser_snapshot` (خفض بنسبة ≥50%)
- [ ] يمكن جلب جميع ملفات `skills/omniroute*/SKILL.md` العشرة علنًا عبر عنوان URL خام من GitHub
- [ ] يعرض معالج الإعداد الأولي خطوة جولة الفئات "كيف يعمل" في الإعداد الجديد
- [ ] تعرض أداة تغطية الفئات في لوحة المعلومات الرئيسية أعداد العناصر المهيأة/النشطة

---

## التراجع عن الإصدار

إذا كان الإصدار يحتوي على مشكلة حرجة:

1. `gh release edit vX.Y.Z --prerelease` (يضع علامة عليه بأنه ليس الأحدث)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (فقط إذا لم يكن المستخدمون قد اعتمدوه بعد)
3. أو: إصلاح عاجل على `release/vX.Y.0` ← إصدار تصحيحي `vX.Y.(Z+1)`
4. أبلغ فورًا عبر GitHub Discussions وDiscord

## قواعد صارمة

- لا تُجرِ أي عملية commit مباشرةً إلى `main`
- لا تستخدم مطلقًا `git push --force` مع `main` أو فروع `release/*`
- لا تتخطَّ أبدًا خطافات Husky باستخدام (`--no-verify`)
- لا تُضمِّن أبدًا الأسرار أو بيانات الاعتماد أو ملفات `.env` في أي commit
- يجب أن تظل التغطية ≥60/60/60/60 (التعليمات/الأسطر/الدوال/الفروع)
- أضف الاختبارات أو حدّثها دائمًا عند تغيير كود الإنتاج في `src/` أو `open-sse/` أو `electron/` أو `bin/`

## التحقق الآلي من المزامنة

شغّل أداة التحقق من مزامنة الوثائق محليًا قبل فتح PR:

```bash
npm run check:docs-sync
```

يشغّل CI أيضًا هذا التحقق في `.github/workflows/ci.yml` (مهمة lint).
