# Router Backends & Embedded Services — architecture contract (ADR) (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **حیثیت:** منظور شدہ · **سیاق:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670)،
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **معاہدہ:** `domain/routing/routerBackends.ts`
> (ٹائپ شدہ رجسٹری — کوڈ [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) کے ساتھ شامل ہوگا)

یہ ADR واضح طور پر متعین کرتا ہے کہ `ts` (مقامی)، `bifrost`، `cliproxy`، `9router`، اور
VibeProxy سے مطابقت رکھنے والے انجن ایک دوسرے سے کیسے متعلق ہیں، تاکہ شراکت کنندگان
فنِ تعمیر کے لحاظ سے الگ دو چیزوں کو آپس میں خلط ملط نہ کریں۔ یہ router-backend-registry
کے کام کے ذریعے متعارف کرائی گئی ٹائپ شدہ رجسٹری کو اس ماڈل کے لیے حقیقت کا واحد
مستند ماخذ قرار دیتا ہے۔

## بنیادی امتیاز — دو باہم مستقل محور

کسی انجن کے کردار کو **دو آزاد محوروں** کے ذریعے بیان کیا جاتا ہے، جنہیں رجسٹری کے
`RouterBackendDefinition` میں یکجا انکوڈ کیا گیا ہے:

1. **لائف سائیکل** (`RouterBackendLifecycle`) — _انجن کیسے چلتا ہے_:
   - `in-process` — OmniRoute کے Node پراسیس کے اندر چلتا ہے (مقامی TS پائپ لائن)۔
   - `supervised` — ایک مقامی ذیلی پراسیس جسے OmniRoute، `ServiceSupervisor` کے ذریعے
     انسٹال/شروع/بند/صحت کی جانچ کرتا ہے، اور پھر بطور فراہم کنندہ کنکشن استعمال کرتا ہے۔
   - `external` — ایک HTTP اینڈ پوائنٹ جس کی طرف OmniRoute درخواستیں بھیجتا ہے مگر
     اسے منظم **نہیں** کرتا (ایک env بیس URL کے ذریعے کنفیگر کیا جاتا ہے)۔
   - `disabled` — رجسٹر شدہ، مگر قابلِ انتخاب نہیں۔
2. **انتخابی محور** (ریلے روٹنگ بیک اینڈ) — _آیا ریلے درخواستیں اس کی طرف بھیجتا ہے_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`، جو
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` میں ہے۔

جس غلطی سے بچنا ہے: "ایمبیڈڈ سروس" اور "روٹنگ بیک اینڈ" کو ایک ہی
فہرست سمجھنا۔ یہ ایک نہیں ہیں۔ ایک `supervised` انجن (9router/cliproxy) ایک **فراہم کنندہ
کنکشن ہے جسے مقامی پائپ لائن استعمال کرتی ہے**، نہ کہ ریلے کی درخواست رسانی کا کوئی متبادل
بیک اینڈ۔ `bifrost` اس کے برعکس ہے — ریلے کی درخواست رسانی کا ایک بیک اینڈ جو (تاریخی طور پر)
صرف `external` تھا۔

## رجسٹری — حقیقت کا واحد مستند ماخذ

`domain/routing/routerBackends.ts` معاہدہ (کوڈ
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) کے ساتھ شامل ہوگا) ہر انجن کو ایک مرتبہ، اس کے
لائف سائیکل، صلاحیتوں، سروس کی شناخت، ڈیفالٹ پورٹ، صحت کی کنفیگریشن، اور
ٹیلی میٹری معاونت کے ساتھ بیان کرتا ہے۔ صارفین ہر sidecar کے لیے
خصوصی منطق لکھنے کے بجائے `getRouterBackend(id)`،
`listRouterBackends()`، اور `listRouterBackendsByCapability(cap)` کے ذریعے
انجن تلاش کرتے ہیں۔

| بیک اینڈ    | لائف سائیکل  | سروس (محور A) | ریلے بیک اینڈ (محور B) | صحت           | ڈیفالٹ پورٹ |
| ----------- | ------------ | ------------- | ---------------------- | ------------- | ----------- |
| `ts`        | `in-process` | —             | `ts` (مقامی)           | —             | —           |
| `bifrost`   | `external`¹  | —¹            | `bifrost` / `auto`     | `/health`     | —           |
| `cliproxy`  | `supervised` | `cliproxy`    | — (فراہم کنندہ)        | `/v1/models`  | 8317        |
| `9router`   | `supervised` | `9router`     | — (فراہم کنندہ)        | `/api/health` | 20130       |
| `vibeproxy` | `external`   | —             | — (فراہم کنندہ اڈاپٹر) | `/v1/models`  | —           |

¹ Bifrost کو ایک `supervised` ایمبیڈڈ سروس کے طور پر ترقی دینا (جسے
`/api/services/bifrost/` سے انسٹال/شروع کیا جا سکے)
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) میں ٹریک کیا جا رہا ہے؛ اس کے ضم ہونے تک،
Bifrost صرف `external` ہے (اور صرف `BIFROST_BASE_URL` کے ذریعے قابلِ رسائی ہے)۔

`capabilities` (`chat`، `responses`، `streaming`، `tools`، `vision`،
`oauth-backed`، `dashboard-embed`، `model-sync`، `native-hot-path`) کالرز کو
ہر id کے لیے الگ شاخیں ہارڈ کوڈ کرنے کے بجائے اس بنیاد پر فلٹر کرنے دیتی ہیں کہ کوئی انجن
حقیقتاً کیا کر سکتا ہے۔

## محور A — ایمبیڈڈ سروسز (زیرِ نگرانی پراسیس کا رخ)

- **زیرِ نگرانی پراسیسز کی رجسٹری:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (فی الحال: `9router`، `cliproxy`)۔
- **لائف سائیکل کا مالک:** `src/lib/services/ServiceSupervisor.ts` — `start()` چائلڈ
  پراسیس شروع کرتا ہے، `waitForHealthy()` پر گیٹ لگاتا ہے، اور stdout/stderr کو رنگ بفر
  میں محفوظ کرتا ہے؛ `stop()` SIGTERM→SIGKILL؛ یہ سب ایک لاک کے تحت سلسلہ وار ہوتا ہے۔
- **اسٹیٹ یونین** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`، اس کے ساتھ ایک
  متعامد `HealthState = healthy | unhealthy | unknown`۔
- **الگ پراسیس کیوں (ان-پراک SDK کیوں نہیں)؟** پراسیس آئسولیشن ہی ہر سائیڈکار کے لیے
  انسٹال/شروع/بند/صحت/لاگز کو آزادانہ طور پر قابلِ کنٹرول بناتی ہے اور لوپ بیک
  اسپان-گارڈ کے اطلاق کو ممکن بناتی ہے۔ ان-پراک اڈاپٹر کی ماڈلنگ مستقبل کا کام ہے —
  اسے `native-hot-path` کیپیبلٹی فلیگ کے ذریعے ظاہر کیا جائے گا۔

### لائف سائیکل روٹ کا معاہدہ (`/api/services/<tool>/…`)

اسٹیٹس کوڈز **ڈیزائن کے مطابق اسٹیٹ/فعل/پاتھ کے لیے مخصوص** ہیں — یہ معاہدہ ہے،
عدم مطابقت نہیں:

| کال                            | حالت                                | اسٹیٹس                               |
| ------------------------------ | ----------------------------------- | ------------------------------------ |
| `POST .../start`               | سروس `not_installed` ہو             | **409** (پیشگی شرط)                  |
| `POST .../stop`                | پہلے ہی بند ہو                      | **200** (آئیڈیمپوٹینٹ نو-آپ)         |
| `GET .../status`               | درست                                | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`               | اسپان کی ناکامی                     | **503** (عارضی)                      |
| `GET .../status`, `.../stop`   | غیر گرفتہ خرابی                     | **500**                              |
| `GET /api/services/<x>/logs`   | نامعلوم ٹول `<x>`                   | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`    | `X-Reveal-Confirm: yes` موجود نہ ہو | **403** (صرف 9router)                |
| **کوئی بھی** `/api/services/*` | کالر لوپ بیک/نجی LAN سے نہ ہو       | **403 LOCAL_ONLY**                   |

تمام خرابیوں کی باڈیز `createErrorResponse()` کے ذریعے اس ساخت میں ہوتی ہیں →
`{ error: { message, type }, requestId }`، جہاں `type` اسٹیٹس سے اخذ کیا جاتا ہے
(`500→server_error`، `404→not_found`، `409→conflict`، بصورتِ دیگر `invalid_request`)
اور مشین کے لیے قابلِ عمل امتیاز کنندہ ہے۔ پیغامات پہلے سے سینیٹائز کیے جاتے ہیں
(`sanitizeErrorMessage()`، سخت اصول #12)۔

**لوپ بیک گارڈ** کسی `403` کی سب سے عام وجہ ہے: `/api/services/`،
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) میں شامل ہے اور
`src/server/authz/policies/management.ts` کسی بھی غیر لوپ بیک / غیر نجی LAN کالر کو
**توثیق سے پہلے** مسترد کرتا ہے، کیونکہ یہ روٹس چائلڈ پراسیسز شروع کرتے ہیں (سخت اصول
15 اور 17)۔ عوامی ٹنل کے ذریعے ان تک پہنچنے پر ڈیزائن کے مطابق `403` ملتا ہے۔

## محور B — ریلے روٹنگ بیک اینڈ (ڈسپیچ کا رخ)

صرف ریلے پراکسی پاتھ `/api/v1/relay/chat/completions` ڈسپیچ بیک اینڈ منتخب کرتا ہے؛
مرکزی `/api/v1/chat/completions` سطح کبھی بھی `routingBackend.ts` سے رجوع نہیں کرتی۔

- **انتخاب** (`resolveRelayRoutingBackend`): ایک واحد عالمی env ٹوگل —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}۔
  اگر سیٹ نہ ہو تو، Bifrost کے کنفیگرڈ+فعال ہونے کی صورت میں `auto`، بصورتِ دیگر `ts`۔
- **طرزِ عمل:**
  - `bifrost` (جبراً): Bifrost کی ناکامی → قطعی `502`، کوئی فال بیک نہیں۔
  - `auto`: Bifrost آزمائیں، ناکامی/کول ڈاؤن پر خاموشی سے نیٹو کی طرف منتقل ہو جائیں۔
  - `ts` / فال بیک کے بعد: نیٹو `open-sse` ٹرانسلیٹر/ایگزیکیوٹر پائپ لائن۔
- **کول ڈاؤن:** `bifrostCooldown.ts` میں فی-`baseUrl` ناکامی کا کول ڈاؤن۔

فی الحال انتخاب ریلے کی سطح پر **مکمل طور پر ایک یا دوسرا** ہے — `release/v3.8.43`
پر فی پرووائیڈر یا فی درخواست انجن کی تبدیلی موجود نہیں۔ فی درخواست گیٹ کو
سائیڈکار-مینی فیسٹ کے کام کے ذریعے شامل کیا جا رہا ہے
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) مینی فیسٹ +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`)،
جو `auto` کو صرف مینی فیسٹ کے اہل پرووائیڈرز کو Bifrost کے ذریعے روٹ کرنے دیتا ہے۔

## ڈیش بورڈ انضمام

سروسز ڈیش بورڈ ہر 5s بعد
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` کے ذریعے `GET /api/services/<tool>/status` کو پول کرتا ہے،
جو `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` واپس کرتا ہے۔ دستیابی کے لیے کوئی مشترکہ context provider موجود نہیں —
ہر component ہر tool کے لیے الگ سے hook کو کال کرتا ہے۔ `!res.ok` کی صورت میں hook فی الحال
صرف `HTTP <status>` دکھاتا ہے؛ `error.type` فیلڈ کو انسانی فہم کی وضاحت سے map کرنا
ایک زیرِ نگرانی UX بہتری ہے، contract میں تبدیلی نہیں۔

## نتائج

- نئے engines کو `ROUTER_BACKENDS` میں صرف ایک بار register کیا جاتا ہے؛ consumers انہیں نئی فی-id
  branches کے بغیر capability queries کے ذریعے حاصل کرتے ہیں۔
- "کیا یہ ایک service ہے یا routing backend؟" کا جواب `lifecycle` فیلڈ سے ملتا ہے، نہ کہ
  اس بنیاد پر کہ کوئی id اتفاقاً کس فہرست میں موجود ہے۔
- Bifrost supervision (#5817) اور native hot-path migration (#5670)، ہر sidecar کے لیے
  الگ special-casing کرنے کے بجائے، اسی مشترکہ contract پر استوار ہیں۔
