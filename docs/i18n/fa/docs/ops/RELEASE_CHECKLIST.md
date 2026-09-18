# Release Checklist (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **آخرین بهروزرسانی:** 2026-08-28 — v3.8.51
> فرایند انتشار سادهسازیشدهای که از مهارتهای Claude Code برای خودکارسازی بهره میگیرد.
>
> **صف/شاخه را بین انتشارها سبز نگه دارید:** به [RELEASE_GREEN.md](./RELEASE_GREEN.md) مراجعه کنید
> (خانوادهٔ `/green-prs` + `npm run check:release-green` + `/babysit` + اجرای شبانه). اجرای
> دورهای این فرایند — و بهویژه **پیش از** این چکلیست — باعث میشود PR انتشار از ابتدا سبز باشد.

## خلاصه

```bash
# 1. افزایش نسخه + تولید CHANGELOG (مهارت)
/version-bump-cc patch    # یا minor/major

# 2. اجرای دروازهٔ کیفیت بهصورت محلی
npm run check              # لینت + آزمونها
npm run test:coverage      # دروازهٔ کامل پوشش (60/60/60/60)

# 3. ساخت و آزمون دود
npm run build
npm run test:e2e           # اختیاری، اما توصیه میشود

# 4. تولید انتشار (مهارت)
/generate-release-cc

# 5. استقرار (مهارت)
/deploy-vps-both-cc        # یا akamai-cc / local-cc

# 6. ثبت شواهد انتشار (مهارت)
/capture-release-evidences-cc
```

## انتشار مورد اعتماد npm (پیشفرض از v3.8.51) — مرحلهای در صورت درخواست، مستقیم بهعنوان راهکار جایگزین

`npm-publish.yml` بهطور پیشفرض از طریق **انتشار مورد اعتماد npm (OIDC)** منتشر میکند:
وظیفهٔ `stage-npm` (میزبانیشده در GitHub)، id-token گیتهاب را با یک اعتبارنامهٔ کوتاهعمر npm
برای همان اجرا مبادله میکند — بدون توکن بلندمدت npm در اسرار مخزن، بدون درخواست 2FA و با منشأ پیوستشده.
اکنون که توکنهای عبورکننده از 2FA در حال منسوخشدن هستند، این همان روش عبور مورد تأیید npm است؛
این روش ضمن حفظ تضمین WS1.3، جریان کاملاً خودکاری را که پروژه تا v3.8.48 داشت بازیابی میکند
(یک توکن افشاشده بهتنهایی نمیتواند منتشر کند — زیرا اصلاً توکنی وجود ندارد).

**راهاندازی یکباره (مالک):** npmjs.com → بستهٔ `omniroute` → Settings → _Trusted
Publisher_ → GitHub: مالک `diegosouzapw`، مخزن `OmniRoute`، گردشکار `npm-publish.yml`
(محیط: هیچکدام). تا زمانی که این مورد ایجاد نشده باشد، مرحلهٔ خودکار با `ENEEDAUTH` شکست میخورد:
دوباره با `publish_mode=staged` (در ادامه) یا `direct` اجرا کنید.

### انتشار مرحلهای (در صورت درخواست — `publish_mode=staged`)

گردشکار npm-publish دیگر مستقیماً منتشر نمیکند: tarball بستهبندیشده را
راهاندازی میکند (`check:pack-boot`) و سپس `npm stage publish` را اجرا میکند — دقیقاً همان بایتها
در رجیستری نگه داشته میشوند و تا زمان تأیید مالک، **قابل نصب نیستند**. دروازهٔ انسانی 2FA
به بعد از اثبات منتقل شده است، نه پیش از آن.

**جریان کار مالک پس از سبزشدن گردشکار:**

1. `npm stage list omniroute` — شناسهٔ مرحله را پیدا کنید (در خلاصهٔ گردشکار نیز چاپ میشود).
2. بایتهای مرحلهبندیشده را تأیید کنید (توصیه میشود): `npm stage download <id>`، سپس
   tarball دانلودشده را در یک پیشوند موقت نصب و راهاندازی کنید (`npm run check:pack-boot` همین
   نتیجهگیری pack→install→boot را در CI خودکار میکند).
3. `npm stage approve <id>` — درخواست 2FA همان انتشار است. `npm stage reject <id>` آن را کنار میگذارد.
4. شبکهٔ ایمنی پس از انتشار: تأییدکنندهٔ پس از انتشار (WS1.4 از برنامهٔ v3.8.49)،
   نسخهٔ منتشرشده را از رجیستری عمومی در یک کانتینر پاک نصب و راهاندازی میکند.

**راهکار اضطراری جایگزین:** `workflow_dispatch` با `publish_mode=direct`، رفتار قدیمی
`npm publish` فوری را بازیابی میکند (فقط در صورتی استفاده کنید که خود مرحلهبندی درست عمل نکند؛ دلیل را ثبت کنید).

**سختسازی یکباره (مالک، npmjs.com):** Trusted Publisher را برای
`omniroute` در حالت فقط مرحلهبندی پیکربندی کنید تا یک توکن بلندمدت افشاشده نتواند
از هیچجا مستقیماً `npm publish` را اجرا کند — CI فقط میتواند مرحلهبندی کند؛ تنها 2FA مالک انتشار را انجام میدهد.

**راهنمای عملیاتی آرتیفکت خراب (بدون تغییر):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
بهعنوان واکنش پیشفرض (چند دقیقه، برگشتپذیر)؛ `npm unpublish` فقط در بازهٔ 72h/بدون وابستگان
و هرگز بهعنوان نخستین اقدام. Docker: هرگز یک برچسب نسخه را بازنویسی نکنید — بازگردانی یعنی
اشارهٔ مجدد `latest` به آخرین digest سالم.

**Docker Hub `latest` (برای هر انتشار پایدار SemVer الزامی است):**
گردشکار `docker-publish` باید **هر دو** برچسب `X.Y.Z` و، هنگامی که
`should-promote-latest.sh` تأیید میکند این بالاترین SemVer پایدار است، `:latest`
را با **digest یکسان** اعمال کند. پس از اجرای وظیفه: digest مربوط به `latest` در Hub با digest جدید
SemVer برابر است و `last_updated` بهروزرسانی شده است. اجازه ندهید `:latest` روی یک
ساخت قدیمی باقی بماند، درحالیکه یادداشتهای انتشار از اصلاحاتی صحبت میکنند که فقط در git وجود دارند.
شروعهای سریع Compose از `:latest` استفاده میکنند؛ GitOps باید همچنان `X.Y.Z` را پین کند. به
[کانالهای انتشار Docker](../guides/DOCKER_GUIDE.md#release-channels) و #10317 مراجعه کنید.

## مسیر سریع اصلاح فوری (برچسب `hotfix`)

یک PR با برچسب `hotfix` از ماتریس سنگین CI (E2E با 9 شارد، ضامن پوشش،
quality-gate، quality-extended) عبور میکند و گیتهای سریع و پُرسیگنال را حفظ میکند: ساخت،
شاردهای واحد، یکپارچهسازی، vitest، lint/typecheck، docs-sync، `check:pack-artifact`
و آزمون اولیهٔ بوتِ tarball (`check:pack-boot`). هدف: سبزشدن در ≤15min بهجای ~33min.

**سیاست ورود — هر چهار مورد الزامیاند (الگوبرداریشده از مسیرهای اضطراری Chromium/VS Code/Node):**

1. **شدت**: محیط production از کار افتاده است — یک آرتیفکت منتشرشده هنگام بوت کرش میکند / یک
   اصلاح امنیتی / تمام کاربران نسخه تحت تأثیر قرار گرفتهاند. «مهم» بهمعنای «ازکارافتاده» نیست.
2. **اختیار**: فقط مالک مخزن برچسب `hotfix` را اعمال میکند. خودِ برچسب
   بهمنزلهٔ تأیید است — هرگز آن را شخصاً روی یک PR کارزاری اعمال نکنید.
3. **شواهد**: بدنهٔ PR به اجرای سنگین قبلی که کاملاً سبز بوده پیوند میدهد (مجموعهای که
   jobهای ردشده دوباره اعتبارسنجی میکردند)، بهعلاوهٔ تست خودِ اصلاح که ابتدا شکست خورده و سپس قبول شده است.
4. **دامنه**: فقط cherry-pick — حداقل اصلاح ممکن، بدون بازآرایی و بدون تغییرات جانبی.

سطح پوشش/ضامنِ ردشده در اجرای کامل بعدی روی شاخهٔ
انتشار دوباره اعتبارسنجی میشود (سبز ماندن پیوستهٔ انتشار) — این مسیر فقط «انتظار» را حذف میکند، نه اعتبارسنجی را.
تغییرات صرفاً مربوط به تست (همهٔ فایلها زیر `tests/` و هیچکدام زیر `tests/e2e/`) بدون نیاز به هیچ برچسبی،
ماتریس E2E را بهصورت خودکار رد میکنند.

## چکلیست تفصیلی

### پیش از انتشار

- [ ] همهٔ PRهای هدفگذاریشده برای این انتشار در `release/vX.Y.0` ادغام شدهاند
- [ ] همهٔ آیتمهای باز Linear/issue برای این نسخه بسته شده یا به milestone بعدی منتقل شدهاند
- [ ] CI روی شاخهٔ `release/vX.Y.0` سبز است
- [ ] هیچ نشانگر `TODO(release)` در کد وجود ندارد: `grep -r "TODO(release)" src/ open-sse/`
- [ ] ایمیج پایهٔ Docker بهروز است (در حال حاضر `node:24.15.0-trixie-slim`)

### نسخه و گزارش تغییرات

- [ ] `/version-bump-cc <patch|minor|major>` را اجرا کنید (مهارت Claude Code)
  - نسخهٔ `package.json` و `electron/package.json` را افزایش میدهد
  - `CHANGELOG.md` را از روی commitهای git پس از آخرین تگ دوباره تولید میکند
  - نشانهای README.md را بهروزرسانی میکند
- [ ] `CHANGELOG.md` را بهصورت دستی بازبینی کرده و در صورت نیاز پیامهای commit را پاکسازی کنید
- [ ] اطمینان حاصل کنید که آخرین بخش semver در `CHANGELOG.md` با نسخهٔ `package.json` برابر است
- [ ] `## [Unreleased]` را بهعنوان نخستین بخش گزارش تغییرات برای کارهای آینده حفظ کنید
- [ ] `docs/openapi.yaml` را بهروزرسانی کنید ← `info.version` باید با نسخهٔ `package.json` برابر باشد

### کیفیت کد

- [ ] `npm run lint` — 0 خطا (هشدارها از قبل وجود داشتهاند)
- [ ] `npm run typecheck:core` — بدون خطا
- [ ] `npm run typecheck:noimplicit:core` — بدون خطا (سختگیرانه)
- [ ] `npm run check:cycles` — بدون وابستگی دوری
- [ ] `npm run check:any-budget:t11` — در محدودهٔ بودجه
- [ ] `npm run check:route-validation:t06` — بدون خطا
- [ ] `npm run check:node-runtime` — حداقل نسخهٔ runtime پشتیبانیشده رعایت شده است (`>=22.22.2 <23`، `>=24.0.0 <27`، طبق `SUPPORTED_NODE_RANGE` در `src/shared/utils/nodeRuntimeSupport.ts`؛ همراستا با `engines` در `package.json`)

### تست

- [ ] `npm run test:unit` — قبول
- [ ] `npm run test:vitest` — قبول (سرور MCP، autoCombo، cache)
- [ ] `npm run test:coverage` — گیت 60/60/60/60 برقرار است (دستورها/خطوط/توابع/شاخهها)
- [ ] `npm run test:integration` — قبول (اگر تغییرات DB / handlerها را تحت تأثیر قرار میدهند)
- [ ] `npm run test:combo:matrix` — قبول (ماتریس راهبرد combo: تصمیمهای انتخاب هر 19 راهبرد مسیریابی عمومی را بهصورت قطعی اثبات میکند؛ هنگام تغییر مسیریابی combo، تفکیک راهبرد یا منطق fallback اجرا شود)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **اختیاری/دستی** (آزمون اولیهٔ کنترلشده با upstream واقعی؛ یک snapshot فقطخواندنی از DB را از VPS با آدرس `root@192.168.0.15` دریافت میکند؛ ارائهدهندگان واقعی را فراخوانی میکند و اعتبار مصرف میکند؛ هرگز در CI اجرا نمیشود؛ بدون گیت بهشکلی تمیز رد میشود)
- [ ] `npm run test:combo:live:vps` — **اختیاری/دستی** (آزمون اولیهٔ زندهٔ VPS در Phase-3: شامل 7 سناریوی HTTP روی سرور زندهٔ `.15` از طریق Node ESM ساده؛ نیازمند `ssh root@192.168.0.15` است؛ فقط comboهای `__live_test__*` را ایجاد/حذف میکند؛ ارائهدهندگان واقعی را فراخوانی میکند؛ هرگز در CI اجرا نمیشود)
- [ ] `npm run test:e2e` — قبول (تغییرات UI)
- [ ] `npm run test:protocols:e2e` — قبول (تغییرات MCP/A2A)
- [ ] `npm run test:ecosystem` — قبول

### هوکها (اعتبارسنجیشده با Husky)

هوکهای Husky در `.husky/` قرار دارند و بهطور خودکار هنگام عملیات git اجرا میشوند.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** گیتهای سریع و قطعی — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (فعالشده در 2026-06-13). عمداً `test:unit` را شامل نمیشود (کند است؛ job مربوط به `test-unit` در CI آن را پوشش میدهد).
  - پیش از push کردن شاخههای انتشار، `npm run test:unit` را بهصورت دستی اجرا کنید.

اگر یک هوک شکست خورد: مشکل زیربنایی را اصلاح کنید؛ با `--no-verify` آن را دور نزنید.

### Conventional Commits

همهٔ commitهایی که قرار است وارد انتشار شوند باید از قالب `type(scope): subject` پیروی کنند.

**نوعهای معتبر:** `feat`، `fix`، `refactor`، `docs`، `test`، `chore`، `perf`، `style`، `ci`

**دامنههای معتبر:** `db`، `sse`، `oauth`، `dashboard`، `api`، `cli`، `docker`، `ci`، `mcp`، `a2a`، `memory`، `skills`، `cloud-agent`، `guardrails`، `compression`، `auto-combo`، `resilience`، `providers`، `executors`، `translator`، `domain`، `authz`

تغییرات ناسازگار: پاورقی `BREAKING CHANGE:` یا `!` را پس از دامنه اضافه کنید (برای مثال `feat(api)!: drop /v0`).

### مستندات

- [ ] `npm run check:docs-sync` با موفقیت اجرا میشود (بهصورت خودکار توسط pre-commit اجرا میشود)
- [ ] `npm run check:docs-all` با موفقیت اجرا میشود (دستور جامع: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` با کد 0 خاتمه مییابد — قرارداد متغیرهای محیطی میان کد ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` دستنخورده است
- [ ] `npm run check:doc-links` با کد 0 خاتمه مییابد — پس از بازساختاربندی، هیچ ارجاع داخلی شکستهای در markdown وجود ندارد
- [ ] `docs/architecture/ARCHITECTURE.md` از نظر ناهماهنگی فضای ذخیرهسازی/زمان اجرا بازبینی شده است
- [ ] `docs/guides/TROUBLESHOOTING.md` از نظر ناهماهنگی متغیرهای محیطی و عملیاتی بازبینی شده است
- [ ] اگر `.env.example` تغییر کرده است: `docs/reference/ENVIRONMENT.md` بهروزرسانی شده است
- [ ] اگر قابلیت جدید دارای رابط کاربری است: در `docs/guides/USER_GUIDE.md` به آن اشاره شده است
- [ ] اگر قابلیت جدید دارای API است: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` بهروزرسانی شدهاند
- [ ] اگر قابلیت جدید یک ماژول است: فایل اختصاصی `docs/<MODULE>.md` وجود دارد
- [ ] اگر تغییر ناسازگار وجود دارد: `docs/guides/TROUBLESHOOTING.md` شامل یادداشت مهاجرت است

### بینالمللیسازی

- [ ] `npm run i18n:check` با کد 0 خاتمه مییابد — وضعیت ترجمه (`.i18n-state.json`) با مستندات منبع همگام است (در حالت سختگیرانه هیچ منبع ناهماهنگی وجود ندارد؛ هشدارهای حالت هشدار برای اصلاحات لحظه آخری مستندات قابل قبولاند، اما پیش از برچسبگذاری باید مقدار 0 باشد)
- [ ] `npm run i18n:check-ui-coverage` با کد 0 خاتمه مییابد — پوشش هر زبان رابط کاربری برابر یا بیشتر از حداقل 80٪ است
- [ ] `npm run i18n:sync-ui:dry` برای هر 42 زبان، 0 کلید مفقود گزارش میکند
- [ ] اگر مستندات انگلیسی منبع تغییر کردهاند، پیش از برچسبگذاری `npm run i18n:run` را اجرا کنید (به `OMNIROUTE_TRANSLATION_API_KEY` در `.env` نیاز دارد)
- [ ] اگر تغییرات ترجمه جزئی هستند، میتوان آنها را به انتشار بعدی موکول کرد (در CHANGELOG پیگیری شود)

### مهاجرتهای پایگاه داده

- [ ] اگر `src/lib/db/migrations/` فایلهای جدیدی دارد:
  - [ ] هر مهاجرت همتوان است (`CREATE TABLE IF NOT EXISTS` و غیره)
  - [ ] مهاجرتها در تراکنشها محصور شدهاند
  - [ ] شمارهگذاری صحیح است (هیچ شکافی در ترتیب وجود ندارد)
- [ ] آزمایش روی نصب تازه: `~/.omniroute/omniroute.db` را حذف و `npm run dev` را اجرا کنید
- [ ] آزمایش روی نصب موجود: از پایگاه داده نسخه پشتیبان تهیه کنید، مهاجرت را اجرا کنید و شِما را تأیید کنید
- [ ] اگر مهاجرت جدولها را بازنویسی میکند، فایلهای WAL (`-wal`، `-shm`) بهدرستی مدیریت میشوند

### کاتالوگ ارائهدهندگان (اعتبارسنجیشده با Zod)

- [ ] شِمای Zod در `src/shared/constants/providers.ts` هنگام بارگذاری معتبر است
  - [ ] همه ارائهدهندگان فیلدهای الزامی (`id`، `label`، `kind` و غیره) را دارند
  - [ ] برای ارائهدهندگان رایگان جدید، `freeNote` ارائه شده است
  - [ ] ارائهدهندگان OAuth دارای `oauthConfig` ثبتشده در `src/lib/oauth/constants/oauth.ts` هستند
- [ ] اگر ارائهدهنده جدیدی اضافه شده است: اجراکننده متناظر در `open-sse/executors/` وجود دارد
- [ ] اگر قالب غیر OpenAI است: مترجم در `open-sse/translator/` وجود دارد
- [ ] مدلها در `open-sse/config/providerRegistry.ts` ثبت شدهاند
- [ ] آزمونهای واحد در `tests/unit/` طبقهبندی و مسیریابی ارائهدهنده را پوشش میدهند

### دسکتاپ (Electron)

اگر `electron/` تغییر کرده است:

- [ ] `npm run electron:smoke:packaged` با موفقیت اجرا میشود
- [ ] ساختها برای حداقل یکی از `:win`، `:mac`، `:linux` آزمایش شدهاند
- [ ] گواهیهای امضای کد منقضی نشدهاند (در صورت امضا)
- [ ] نسخه `electron/package.json` با `package.json` ریشه مطابقت دارد
- [ ] در صورت انتشار در `stable`، اشارهگر کانال بهروزرسانی خودکار بهروزرسانی شده است

### چیدمان ساخت

مخزن از سه پوشه خروجی مجزا استفاده میکند — هرگز آنها را با هم اشتباه نگیرید:

| پوشه      | هدف                                                       | ردیابی میشود؟      |
| --------- | --------------------------------------------------------- | ------------------ |
| `src/`    | منبع برنامه (TypeScript / TSX)                            | بله                |
| `.build/` | فایلهای میانی ساخت — خروجی `next build` (`distDir`)       | خیر (در gitignore) |
| `dist/`   | بسته قابلانتشار npm — مونتاژشده توسط `assembleStandalone` | خیر (در gitignore) |

> **یادداشت اپراتور:** پوشه ایمیج VPS راهدور همچنان `/usr/lib/node_modules/omniroute/app/` است.
> فقط خروجی ساخت **درون مخزن** جابهجا شده است (`app/` → `dist/`). مهارتهای استقرار، محتوای
> `dist/` را با rsync به پوشه راهدور `app/` منتقل میکنند — هیچ تغییری در مسیر VPS لازم نیست.

**جریان تکساخت:**

```
npm run build:release
  └─ rm -rf .build dist          (پاکسازی)
  └─ next build → .build/next/   (فایلهای میانی)
  └─ assembleStandalone          (standalone + static + public + natives را در dist/ کپی میکند)
  └─ writes dist/BUILD_SHA       (نشانگر HEAD)
```

برای استقرار، `npm run build` را در پی اجرای جداگانه `npm run build:cli` اجرا نکنید — از
`npm run build:release` استفاده کنید که بازسازی پاک + نشانگر را در یک فرمان انجام میدهد.

### اعتبارسنجی آرتیفکت

- [ ] `npm run build:release` با موفقیت اجرا میشود و `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` پاک است — هیچ `app.__qa_backup`، `scripts/scratch`، `package-lock.json` یا باقیمانده محلی دیگری وجود ندارد
- [ ] پس از ساخت، `dist/server.js` وجود دارد

### برچسبگذاری و انتشار

- [ ] `/generate-release-cc` (مهارت Claude Code) را اجرا کنید:
  - برچسب `vX.Y.Z` را ایجاد میکند
  - برچسب و شاخه را push میکند
  - یک انتشار GitHub با بدنه تغییرات باز میکند
  - نصبکنندههای Electron را پیوست میکند (اگر ساخته شده باشند)
- [ ] یا بهصورت دستی:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### استقرار

مهارتهای استقرار از جریان سبک rsync استفاده میکنند — بدون `npm pack` و بدون `npm i -g`:

- [ ] از مهارت استقرار متناسب با مقصد استفاده کنید:
  - `/deploy-vps-local-cc` — VPS محلی (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS آکامای (69.164.221.35)
  - `/deploy-vps-both-cc` — هر دو
- [ ] پیش از استقرار، تأیید کنید که `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] ساخت باید در جایی اجرا شود که `node_modules` واقعی باشد (checkout اصلی یا worktreeای که در آن `npm ci` اجرا شده است — نه یک worktree دارای پیوند نمادین)
- [ ] آزمایش دود نمونه مستقرشده:
  - `/dashboard/health` را باز کنید → بررسی کنید رشته نسخه با انتشار مطابقت دارد
  - یک درخواست `/v1/chat/completions` را در برابر یک ارائهدهنده شناختهشده اجرا کنید
  - تأیید کنید که `/api/monitoring/health` قطعکنندههای مدار `CLOSED` را برمیگرداند
  - تأیید کنید انتقالهای MCP پاسخ میدهند (`/mcp` HTTP، `/mcp-sse` SSE)

### پس از انتشار

- [ ] اجرای `/capture-release-evidences-cc` (مهارت Claude Code)
  - ثبت اسکرینشاتها/ضبطهای WebP از قابلیتهای جدید
  - پیوستکردن به یادداشتهای انتشار / پست وبلاگ
- [ ] بهروزرسانی GitHub Discussions / Discord با اطلاعیهٔ انتشار
- [ ] ایجاد milestone برای نسخهٔ بعدی
- [ ] در صورت بحرانیبودن: سنجاقکردن گفتوگو یا انتشار در `news.json` برای بنر درونبرنامهای

### دروازهٔ انتشار عمومی Radar

اطلاعیهٔ Radar عمداً با `active: false` ثبت شده است. فعالسازی، تغییری جداگانه است که پس از ارائهٔ شواهد برای تمام موارد زیر انجام میشود:

- [ ] تمام PRهای پشتهای Radar ادغام شدهاند و CI مربوط به نوک انتشار سبز است
- [ ] مسیرهای OSS مربوط به Radar را در حالی مستقر و smoke test کنید که `RADAR_ENABLED` همچنان بهصورت پیشفرض خاموش است
- [ ] روی میزبان تعیینشدهٔ Radar، مسیرهای `GET /planos`، `/termos`، `/privacidade` و `/reembolso` را smoke test کنید
- [ ] هویت/اطلاعات تماس/نشانی اپراتور و بازبینی حقوقی تأییدشده توسط مالک را در سرویس خصوصی ثبت کنید
- [ ] Stripe Checkout و webhook امضاشده را فقط در حالت آزمایشی تست کنید
- [ ] یک ارسال ایمیل تراکنشی رمزگذاریشده را با فرستنده/دامنهٔ تأییدشده آزمایش کنید
- [ ] بازیابی نسخهٔ پشتیبان و اجرای یک پژوهش تحت نظارت با سقف بودجه را اثبات کنید
- [ ] پیش از پذیرش شواهد کمک مالی، سیاست بازبینی BRL/PIX را تأیید کنید
- [ ] Checkout عمومی را فقط پس از عبور از دروازههای پیشین فعال کنید و سپس ID جدید `news.json` را فعال کنید
- [ ] تأیید کنید که بنر صفحهٔ اصلی از متن بومیسازیشده استفاده میکند و پس از نادیدهگرفتن یک ID قدیمی، ID جدید دوباره ظاهر میشود

## آزمون دودِ سرویسهای تعبیهشده (v3.8.4+)

پیش از انتشار هر نسخهای که شامل تغییرات سرویسهای تعبیهشده است، موارد زیر را بررسی کنید:

### راهاندازی با DB تازه (تداخلهای migration را شناسایی میکند — پس از hotfix نسخهٔ v3.8.4 اضافه شده است)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — برای راهاندازی ۱۰ ثانیه صبر کنید
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` مقدار `"9router"` را برمیگرداند (نه 404 و نه 500). تأیید میکند که migration مربوط به `071_services.sql` اعمال شده و ردیف اولیه درج شده است.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` تعداد ۳ ردیف برمیگرداند.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` تعداد ۲ ردیف برمیگرداند (اعمال شدن `070_webhooks_kind_metadata.sql` را اعتبارسنجی میکند).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` با موفقیت اجرا میشود — از بروز تداخلهای آینده جلوگیری میکند.

### 9Router

- [ ] `POST /api/services/9router/install` در کمتر از ۲ دقیقه، پاسخ 200 را بههمراه `installedVersion` برمیگرداند
- [ ] `POST /api/services/9router/start` در کمتر از ۳۰ ثانیه، پاسخ 200 و `state: "running"` را برمیگرداند
- [ ] `GET /api/services/9router/status` وضعیت `health: "healthy"` را گزارش میکند
- [ ] `POST /v1/chat/completions` با `"model": "9router/auto/..."` پاسخ 200 را برمیگرداند (مسیریابی سرتاسری از طریق 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` رابط کاربری بومی 9Router را داخل proxy رندر میکند (بدون iframe مستقیم با `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` مقدار `{ keyRotated: true }` را برمیگرداند و سرویس بدون مشکل راهاندازی مجدد میشود
- [ ] `POST /api/services/9router/stop` پاسخ 200 و `state: "stopped"` را برمیگرداند
- [ ] `GET /api/services/9router/logs?tail=50` جریان SSE را با رویداد `snapshot` شامل خطوط اخیر برمیگرداند
- [ ] نصب در محیطی که `npm` در PATH آن وجود ندارد، پاسخ 500 را با یک پیام خطای کاربرپسند (بدون stack trace) برمیگرداند

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` در کمتر از ۲ دقیقه پاسخ 200 را برمیگرداند
- [ ] `POST /api/services/cliproxy/start` در کمتر از ۳۰ ثانیه، پاسخ 200 و `state: "running"` را برمیگرداند
- [ ] `GET /api/services/cliproxy/status` وضعیت `health: "healthy"` را گزارش میکند
- [ ] `POST /api/services/cliproxy/stop` پاسخ 200 و `state: "stopped"` را برمیگرداند
- [ ] `GET /api/services/cliproxy/logs?tail=50` جریان SSE را برمیگرداند

### آزمون رگرسیون امنیتی

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` مقدار `403 LOCAL_ONLY` را برمیگرداند
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` مقدار `403 LOCAL_ONLY` را برمیگرداند
- [ ] پاسخهای خطای `/api/services/*` شامل `err.stack` یا مسیرهای مطلق فایل نیستند

## بررسیهای v3.8.0+

پیش از انتشار هر نسخهٔ v3.8.x، این موارد اضافی را بررسی کنید:

- [ ] `omniroute --tray` در macOS راهاندازی میشود (systray2 در `~/.omniroute/runtime/` نصب شده است)
- [ ] `omniroute --tray` در Linux راهاندازی میشود (به DISPLAY نیاز دارد؛ اگر تنظیم نشده باشد، خطای کنترلشده نمایش داده میشود)
- [ ] `omniroute --tray` در Windows راهاندازی میشود (PowerShell NotifyIcon، بدون فایلهای باینری اضافی)
- [ ] `omniroute config tray enable` ورودی autostart را ایجاد میکند؛ غیرفعالسازی آن را حذف میکند
- [ ] `npm install -g omniroute@<this-version>` مرحلهٔ postinstall را بدون خروج بحرانی اجرا میکند
- [ ] مسیر بهروزرسانی وابستگیهای اختیاری را حفظ میکند: `omniroute update --apply` و بهروزرسان خودکار
      دستور `npm install -g … --include=optional` را اجرا میکنند تا `optionalDependencies` (better-sqlite3،
      keytar، tls-client و پشتهٔ SLM مربوط به llmlingua: `@atjsh/llmlingua-2@2.0.5`،
      `js-tiktoken`) پس از بهروزرسانی باقی بمانند. سطح ultra مربوط به `modelPath` در SLM نیز به
      مدل tinybert نیاز دارد که هنگام نخستین استفاده بهصورت خودکار در `${DATA_DIR}/models/llmlingua` دانلود میشود. سپس postinstall
      (`scripts/build/colocateOptionals.mjs`) بستار اختیاری SLM را در
      `dist/node_modules` هممکان میکند تا worker دقیقاً یک نمونهٔ `@huggingface/transformers` ^4.2.0
      را resolve کند — trace مستقل فقط transformers را bundle میکند، نه گزینههایی را که بهصورت پویا import شدهاند؛
      بنابراین بدون این کار، worker، llmlingua-2 را در برابر transformers موجود در root بارگذاری میکند
      و سطح SLM بهصورت بیصدا در حالت fail-open قرار میگیرد.
- [ ] `omniroute status` بدون `.env` کار میکند (مسیر token در CLI، فقط loopback)
- [ ] `curl http://localhost:20128/api/shutdown` پاسخ 401 را برمیگرداند (مسیری که همیشه محافظت میشود)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` پاسخ 401 را برمیگرداند (محافظ loopback)
- [ ] runtime مربوط به SQLite در نخستین اجرا به `bundled` resolve میشود (فایل باینری bundleشده برای پلتفرم معتبر است)
- [ ] وقتی `node_modules/better-sqlite3` حذف میشود، runtime مربوط به SQLite به `runtime` fallback میکند
- [ ] فیلتر هوشمند MCP، خروجی واقعی `playwright-mcp browser_snapshot` را فشرده میکند (کاهش ≥۵۰٪)
- [ ] هر ۱۰ فایل `skills/omniroute*/SKILL.md` از طریق URL خام GitHub بهصورت عمومی قابل دریافت هستند
- [ ] جادوگر onboarding در راهاندازی تازه، مرحلهٔ معرفی سطحها با عنوان "نحوهٔ کارکرد" را نمایش میدهد
- [ ] ویجت پوشش سطحها در داشبورد Home، تعداد موارد پیکربندیشده/فعال را نمایش میدهد

---

## بازگردانی

اگر انتشار با مشکل بحرانی مواجه است:

1. `gh release edit vX.Y.Z --prerelease` (آن را بهعنوان آخرین نسخه علامتگذاری نمیکند)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (فقط اگر هنوز توسط کاربران استفاده نشده باشد)
3. یا: رفع فوری روی `release/vX.Y.0` ← انتشار وصله `vX.Y.(Z+1)`
4. فوراً در GitHub Discussions و Discord اطلاعرسانی کنید

## قوانین سختگیرانه

- هرگز مستقیماً در `main` کامیت نکنید
- هرگز از `git push --force` برای شاخههای `main` یا `release/*` استفاده نکنید
- هرگز هوکهای Husky را نادیده نگیرید (`--no-verify`)
- هرگز اطلاعات محرمانه، اطلاعات احراز هویت یا فایلهای `.env` را کامیت نکنید
- پوشش آزمون باید در سطح ≥60/60/60/60 (عبارتها/خطوط/توابع/شاخهها) باقی بماند
- هنگام تغییر کد عملیاتی در `src/`، `open-sse/`، `electron/` یا `bin/`، همیشه آزمونها را اضافه یا بهروزرسانی کنید

## بررسی همگامسازی خودکار

پیش از باز کردن یک PR، محافظ همگامسازی مستندات را بهصورت محلی اجرا کنید:

```bash
npm run check:docs-sync
```

CI نیز این بررسی را در `.github/workflows/ci.yml` (کار lint) اجرا میکند.
