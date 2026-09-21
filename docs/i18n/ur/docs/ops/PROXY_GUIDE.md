# 🌐 OmniRoute Proxy Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **جغرافیائی پابندیوں کو بائی پاس کریں، اپنی شناخت محفوظ رکھیں، اور AI ٹریفک کو کسی بھی پراکسی کے ذریعے روٹ کریں — وہ بھی کنفیگریشن کی کسی پیچیدگی کے بغیر۔**

OmniRoute میں مکمل خصوصیات کا حامل پراکسی مینجمنٹ سسٹم شامل ہے، جو آپ کو upstream AI فراہم کنندگان کی ٹریفک HTTP، HTTPS، یا SOCKS5 پراکسیز کے ذریعے روٹ کرنے دیتا ہے۔ چاہے آپ کسی پابندی زدہ خطے میں ہوں، آپ کو IP روٹیشن درکار ہو، یا آپ خفیہ فنگرپرنٹنگ چاہتے ہوں — اس گائیڈ میں ہر چیز کا احاطہ کیا گیا ہے۔

---

## فہرستِ مضامین

- [پراکسیز کیوں استعمال کریں؟](#why-use-proxies)
- [آرکیٹیکچر کا جائزہ](#architecture-overview)
- [4 سطحی پراکسی سسٹم](#4-level-proxy-system)
- [پراکسی رجسٹری (CRUD)](#proxy-registry-crud)
- [1proxy مفت مارکیٹ پلیس](#1proxy-free-proxy-marketplace)
- [پراکسی روٹیشن](#proxy-rotation)
- [اینٹی ڈیٹیکشن اور خفیہ کاری](#anti-detection--stealth)
- [Upstream پراکسی موڈز](#upstream-proxy-modes)
- [ڈیش بورڈ UI](#dashboard-ui)
- [API حوالہ](#api-reference)
- [ماحولیاتی متغیرات](#environment-variables)
- [مسائل کا حل](#troubleshooting)

---

## پراکسیز کیوں استعمال کریں؟

بہت سے AI فراہم کنندگان جغرافیائی خطے کی بنیاد پر رسائی محدود کرتے ہیں۔ **روس، چین، ایران، کیوبا، ترکی** اور دیگر ممالک میں موجود ڈویلپرز کو اس طرح کی خرابیوں کا سامنا کرنا پڑتا ہے:

```
unsupported_country_region_territory
```

پابندی زدہ خطوں سے باہر بھی پراکسیز درج ذیل مقاصد کے لیے مفید ہیں:

| استعمال کی صورت                       | تفصیل                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------ |
| **جغرافیائی پابندی کو بائی پاس کرنا** | پابندی زدہ ممالک سے OpenAI، Anthropic، Codex، Copilot تک رسائی حاصل کریں |
| **IP روٹیشن**                         | شرح کی حد بندی سے بچنے کے لیے درخواستوں کو متعدد IPs میں تقسیم کریں      |
| **رازداری**                           | upstream فراہم کنندگان سے اپنا حقیقی IP چھپائیں                          |
| **ضابطہ جاتی تعمیل**                  | ٹریفک کو مخصوص قانونی دائرۂ اختیار کے ذریعے روٹ کریں                     |
| **ٹیسٹنگ**                            | مختلف خطوں سے آنے والی درخواستوں کی نقل تیار کریں                        |

---

## آرکیٹیکچر کا جائزہ

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute سرور                          │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ پراکسی      │    │ پراکسی       │    │ پراکسی           │  │
│  │ رجسٹری      │───▶│ ڈسپیچر       │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │ (کیش شدہ)    │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy Sync │                        │ Upstream         │  │
│  │ (مفت پول)   │                        │ فراہم کنندہ API  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### کلیدی اجزاء

| جزو               | فائل                                         | کردار                                                    |
| ----------------- | -------------------------------------------- | -------------------------------------------------------- |
| **پراکسی رجسٹری** | `src/lib/db/proxies.ts`                      | پراکسی اندراجات اور دائرۂ کار کی تفویضات کے لیے CRUD     |
| **پراکسی ڈسپیچر** | `open-sse/utils/proxyDispatcher.ts`          | کیشنگ کے ساتھ `undici` ProxyAgent/SOCKS ڈسپیچرز بناتا ہے |
| **پراکسی Fetch**  | `open-sse/utils/proxyFetch.ts`               | پراکسی ڈسپیچر داخل کرکے `fetch()` کو ریپ کرتا ہے         |
| **سیٹنگز روٹ**    | `src/app/api/settings/proxy/route.ts`        | سابقہ پراکسی کنفیگ API (GET/PUT/DELETE)                  |
| **مینجمنٹ روٹ**   | `src/app/api/v1/management/proxies/route.ts` | رجسٹری CRUD API (GET/POST/PATCH/DELETE)                  |
| **1proxy DB**     | `src/lib/db/oneproxy.ts`                     | مفت پراکسی مارکیٹ پلیس کی مستقل اسٹوریج                  |

---

## 4-سطحی پراکسی سسٹم

OmniRoute پراکسی کی تشکیل کو **چار آزاد دائروں** میں سپورٹ کرتا ہے، جن کا تعین ترجیحی ترتیب کے مطابق کیا جاتا ہے:

```
ترجیح کے تعین کی ترتیب (سب سے زیادہ → سب سے کم):

  1. 🔵 اکاؤنٹ/کنکشن پراکسی  →  فی API کلید / OAuth کنکشن
  2. 🟡 فراہم کنندہ پراکسی    →  فی فراہم کنندہ (مثلاً، تمام OpenAI ٹریفک)
  3. 🟠 کومبو پراکسی          →  فی کومبو/روٹنگ تشکیل
  4. 🟢 عالمی پراکسی          →  تمام ٹریفک، تمام فراہم کنندگان
```

### تعین کیسے کام کرتا ہے

جب OmniRoute کسی بالائی فراہم کنندہ کو درخواست بھیجتا ہے، تو یہ `resolveProxyForConnectionFromRegistry()` کو کال کرتا ہے، جو ہر سطح کو ترتیب وار جانچتا ہے:

1. **اکاؤنٹ کی سطح** — کیا اس مخصوص کنکشن ID کو کوئی پراکسی تفویض کی گئی ہے؟
2. **فراہم کنندہ کی سطح** — کیا اس فراہم کنندہ (مثلاً، `openai`) کو کوئی پراکسی تفویض کی گئی ہے؟
3. **عالمی سطح** — کیا کوئی عالمی پراکسی تشکیل دی گئی ہے؟
4. **کوئی پراکسی نہیں** — فراہم کنندہ سے براہ راست کنکشن۔

پہلا مماثل نتیجہ منتخب کیا جاتا ہے۔ اس کا مطلب ہے کہ آپ عالمی پراکسی کو متبادل کے طور پر مقرر کر سکتے ہیں، لیکن مخصوص فراہم کنندگان یا کنکشنز کے لیے اسے اوور رائیڈ کر سکتے ہیں۔

### کن ٹریفک اقسام کو پراکسی کیا جاتا ہے

| ٹریفک کی قسم         | پراکسی؟ | نوٹس                                                 |
| -------------------- | ------- | ---------------------------------------------------- |
| چیٹ تکمیلات          | ✅      | تمام `/v1/chat/completions` درخواستیں                |
| ایمبیڈنگز            | ✅      | `/v1/embeddings`                                     |
| تصویر بنانا          | ✅      | `/v1/images/generations`                             |
| آڈیو (TTS/STT)       | ✅      | `/v1/audio/*`                                        |
| OAuth ٹوکن کا تبادلہ | ✅      | `unsupported_country_region_territory` کو حل کرتا ہے |
| کنکشن ٹیسٹس          | ✅      | "کنکشن ٹیسٹ کریں" بٹن پراکسی استعمال کرتا ہے         |
| ٹوکن ریفریش          | ✅      | پس منظر میں OAuth تجدید                              |
| ماڈل ہم وقت سازی     | ✅      | ماڈلز کی فہرست سازی اور دریافت                       |

---

## پراکسی رجسٹری (CRUD)

پراکسی رجسٹری ایک SQLite ٹیبل (`proxy_registry`) ہے جو آپ کی تمام پراکسیز محفوظ کرتی ہے۔ ہر پراکسی میں یہ شامل ہوتا ہے:

| فیلڈ       | قسم      | وضاحت                                  |
| ---------- | -------- | -------------------------------------- |
| `id`       | UUID     | منفرد شناخت کنندہ                      |
| `name`     | اسٹرنگ   | انسانوں کے لیے قابلِ فہم لیبل          |
| `type`     | اسٹرنگ   | پروٹوکول: `http`، `https`، `socks5`    |
| `host`     | اسٹرنگ   | پراکسی ہوسٹ نیم یا IP                  |
| `port`     | عدد صحیح | پورٹ نمبر                              |
| `username` | اسٹرنگ   | توثیقی صارف نام (محفوظ حالت میں مرموز) |
| `password` | اسٹرنگ   | توثیقی پاس ورڈ (محفوظ حالت میں مرموز)  |
| `region`   | اسٹرنگ   | جغرافیائی علاقے کا لیبل                |
| `notes`    | اسٹرنگ   | آزاد متنی نوٹس                         |
| `status`   | اسٹرنگ   | `active` یا `inactive`                 |
| `source`   | اسٹرنگ   | `manual` یا `oneproxy`                 |

### پراکسی بنانا

**ڈیش بورڈ کے ذریعے:**

1. **ترتیبات → پراکسی** پر جائیں
2. **پراکسی شامل کریں** پر کلک کریں
3. قسم، ہوسٹ، پورٹ، اور اختیاری توثیقی اسناد درج کریں
4. محفوظ کریں

**API کے ذریعے:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### پراکسی کو اپ ڈیٹ کرنا

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **نوٹ:** اسناد اس وقت تک محفوظ رہتی ہیں جب تک آپ واضح طور پر غیر خالی متبادل نہ بھیجیں۔ `username`/`password` کے لیے خالی اسٹرنگز بھیجنے پر محفوظ شدہ اقدار برقرار رہیں گی۔

### پراکسی حذف کرنا

```bash
# اگر پراکسی کسی بھی دائرے کو تفویض ہو تو یہ ناکام ہو جاتا ہے
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# جبری حذف (تفویضات بھی ہٹا دیتا ہے)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### پراکسیز کی فہرست بنانا

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### پراکسیز کو دائروں میں تفویض کرنا

```bash
# عالمی دائرے کو تفویض کریں
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# کسی مخصوص فراہم کنندہ کو تفویض کریں
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# کسی مخصوص کنکشن/کلید کو تفویض کریں
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### مؤثر پراکسی کا تعین کرنا

دیکھیں کہ کسی دیے گئے کنکشن کے لیے کون سی پراکسی استعمال ہوگی:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

یہ تعین شدہ پراکسی کو اس کی سطح (`account`، `provider`، یا `global`) اور ماخذ کے ساتھ واپس کرتا ہے۔

### اجتماعی تفویض

ایک ہی پراکسی کو بیک وقت متعدد فراہم کنندگان یا کنکشنز کو تفویض کریں:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### درآمد/برآمد

پراکسیز **بیک اپ/بحالی** سسٹم میں شامل ہوتی ہیں۔ جب آپ اپنی OmniRoute تشکیل برآمد کرتے ہیں:

1. **ڈیش بورڈ → ترتیبات → بیک اپ** پر جائیں
2. **برآمد کریں** پر کلک کریں — پراکسی رجسٹری اور تفویضات شامل ہوتی ہیں
3. بحال کرنے کے لیے، **درآمد کریں** پر کلک کریں اور بیک اپ فائل اپ لوڈ کریں

پراکسی رجسٹری **host+port کے لحاظ سے upsert** کو بھی سپورٹ کرتی ہے — اگر آپ ایسی پراکسی درآمد کرتے ہیں جو پہلے سے موجود ہو (ایک ہی ہوسٹ اور پورٹ)، تو نقل بنانے کے بجائے اسے اپ ڈیٹ کر دیا جاتا ہے۔

### سابقہ نظام سے منتقلی

اگر آپ نے کسی پرانے ورژن (pre-registry) میں پراکسیز کنفیگر کی تھیں، تو OmniRoute انہیں خودکار طور پر منتقل کر دیتا ہے:

```
قدیم key_value اسٹور → proxy_registry + proxy_assignments
```

اپ گریڈ کے بعد پہلی بار اسٹارٹ ہونے پر یہ عمل صرف ایک مرتبہ ہوتا ہے۔ اسے دوبارہ چلانے کے لیے `migrateLegacyProxyConfigToRegistry({ force: true })` استعمال کریں۔

---

## 1proxy مفت پراکسی مارکیٹ پلیس

> 🆕 **تعاون کنندہ: [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (مسئلہ [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute، **[1proxy](https://1proxy-api.aitradepulse.com)** کمیونٹی پلیٹ فارم کے ساتھ انضمام کرتا ہے تاکہ دنیا بھر سے **سینکڑوں مفت، تصدیق شدہ پراکسیز** تک رسائی فراہم کی جا سکے۔ یہ ان صارفین کے لیے بہترین ہے جن کے پاس اپنا پراکسی انفراسٹرکچر موجود نہیں ہے۔

### یہ کیسے کام کرتا ہے

```
┌─────────────┐    ہم وقت سازی    ┌─────────────────┐    گردش      ┌──────────┐
│  1proxy API │ ─────────────────▶ │  proxy_registry  │ ────────────▶ │ فراہم کنندہ │
│   (بیرونی)  │    500 تک پراکسیز  │  source=oneproxy │  معیار کے لحاظ سے │   API    │
└─────────────┘                    └─────────────────┘               └──────────┘
```

1. **ہم وقت سازی** — OmniRoute، 1proxy API سے تصدیق شدہ پراکسیز حاصل کرتا ہے
2. **محفوظ کرنا** — پراکسیز کو اسی `proxy_registry` ٹیبل میں `source = 'oneproxy'` کے ساتھ محفوظ کیا جاتا ہے
3. **فلٹر کرنا** — پروٹوکول، ملک اور معیار کے اسکور کے لحاظ سے فلٹر کریں
4. **گردش** — معیار، بے ترتیب یا ترتیبی حکمت عملی استعمال کرتے ہوئے بہترین پراکسی منتخب کریں
5. **خودکار تنزلی** — ناکام پراکسیز کا معیار اسکور کم کر دیا جاتا ہے؛ حد سے نیچے ہونے پر → غیر فعال نشان زد کر دیا جاتا ہے

### پراکسیز کی ہم وقت سازی

**ڈیش بورڈ کے ذریعے:**

1. **Settings → 1proxy** ٹیب پر جائیں
2. **"Sync Now"** پر کلک کریں
3. اعداد و شمار دیکھیں: پراکسیز کی کل تعداد، فعال تعداد، اوسط معیار اور ملک کے لحاظ سے تفصیل

**API کے ذریعے:**

```bash
# ہم وقت سازی شروع کریں
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# جواب:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### پراکسیز کو فلٹر کرنا

```bash
# پروٹوکول کے لحاظ سے فلٹر کریں
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# ملک کے لحاظ سے فلٹر کریں
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# کم از کم معیار اسکور کے لحاظ سے فلٹر کریں
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# فلٹرز کو یکجا کریں
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### پراکسی کے معیار کے اسکورز

ہر 1proxy پراکسی کے ساتھ میٹا ڈیٹا شامل ہوتا ہے:

| فیلڈ            | وضاحت                                            |
| --------------- | ------------------------------------------------ |
| `qualityScore`  | 1proxy کی تصدیق سے حاصل کردہ 0-100 درجہ بندی     |
| `latencyMs`     | نیٹ ورک کی ناپی گئی تاخیر                        |
| `anonymity`     | `transparent`، `anonymous`، یا `elite`           |
| `googleAccess`  | آیا پراکسی Google سروسز تک رسائی حاصل کر سکتی ہے |
| `countryCode`   | دو حروف پر مشتمل ISO ملکی کوڈ                    |
| `lastValidated` | آخری تصدیق کا ٹائم اسٹیمپ                        |

معیار کے اسکورز کو متحرک طور پر ایڈجسٹ کیا جاتا ہے:

- **ناکام درخواستیں** اسکور کو 10 پوائنٹس کم کرتی ہیں
- **اسکور ≤10 تک گر جائے** → پراکسی کو `inactive` نشان زد کر دیا جاتا ہے
- غیر فعال پراکسیز کو گردش سے خارج کر دیا جاتا ہے

### گردش کی حکمت عملیاں

```bash
# معیار کے لحاظ سے گردش (بہترین پراکسی پہلے) — طے شدہ
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# بے ترتیب گردش
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# ترتیبی (جس کی حالیہ تصدیق سب سے پہلے ہوئی ہو)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### سرکٹ بریکر

1proxy کی ہم وقت سازی میں ایک بلٹ اِن سرکٹ بریکر موجود ہے:

- **مسلسل 5 ہم وقت سازی کی ناکامیوں** کے بعد، مزید کوششیں روک دی جاتی ہیں
- اس کے ذریعے ری سیٹ کریں: `resetOneproxyCircuitBreaker()` یا سرور دوبارہ شروع کریں
- ہم وقت سازی کی حالت `GET /api/settings/oneproxy?action=status` پر دستیاب ہے

### 1proxy پراکسیز صاف کرنا

```bash
# ایک 1proxy پراکسی حذف کریں
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# تمام 1proxy پراکسیز صاف کریں (دستی پراکسیز متاثر نہیں ہوں گی)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## اینٹی ڈیٹیکشن اور اسٹیلتھ

OmniRoute صرف ٹریفک کو پراکسی کے ذریعے روٹ نہیں کرتا — بلکہ یہ ٹریفک کو جائز بھی ظاہر کرتا ہے:

### TLS فنگرپرنٹ اسپوفنگ

براؤزر جیسے TLS فنگرپرنٹس بنانے کے لیے `wreq-js` استعمال کرتا ہے، جس سے ایسے بوٹ ڈیٹیکشن سسٹمز کو بائی پاس کیا جا سکتا ہے جو غیر براؤزر TLS ہینڈ شیکس کو نشان زد کرتے ہیں۔

### CLI فنگرپرنٹ میچنگ

**CLI فنگرپرنٹ ٹوگل** (`Settings → Security`) HTTP ہیڈرز اور JSON باڈی فیلڈز کو دوبارہ ترتیب دیتا ہے تاکہ وہ مقامی CLI بائنریز (Claude Code، Codex وغیرہ) کے عین سگنیچر سے مطابقت رکھیں۔ یہ پراکسی کے **ساتھ اضافی طور پر** کام کرتا ہے:

```
آپ کا IP (بلاک شدہ) → پراکسی IP (US) → فراہم کنندہ API
                       + TLS اسپوف
                       + CLI فنگرپرنٹ
```

آپ کو بیک وقت **IP ماسکنگ** اور **درخواست کی صداقت** دونوں حاصل ہوتی ہیں۔

### پراکسی IP کا تحفظ

ڈیش بورڈ میں رنگوں سے نشان زد بیجز دکھاتے ہیں کہ پراکسی کی کون سی سطح فعال ہے:

| بیج | سطح         | مطلب                                              |
| --- | ----------- | ------------------------------------------------- |
| 🟢  | عالمی       | تمام ٹریفک اس پراکسی کے ذریعے گزرتی ہے            |
| 🟡  | فراہم کنندہ | صرف اس فراہم کنندہ کی ٹریفک پراکسی سے گزرتی ہے    |
| 🔵  | کنکشن       | یہ مخصوص کلید/اکاؤنٹ اس پراکسی کو استعمال کرتا ہے |

تصدیق کے لیے بیج حل شدہ پراکسی IP بھی دکھاتا ہے۔

---

## اپ اسٹریم پراکسی موڈز

CLIProxyAPI پیٹرن استعمال کرنے والے فراہم کنندگان کے لیے، OmniRoute تین اپ اسٹریم پراکسی موڈز کی معاونت کرتا ہے:

| موڈ           | وضاحت                                                             |
| ------------- | ----------------------------------------------------------------- |
| `native`      | OmniRoute پراکسی روٹنگ کو براہ راست سنبھالتا ہے (ڈیفالٹ)          |
| `cliproxyapi` | ایک بیرونی CLIProxyAPI انسٹینس کو ذمہ داری سونپتا ہے              |
| `fallback`    | پہلے مقامی طریقہ آزماتا ہے، ناکامی پر CLIProxyAPI استعمال کرتا ہے |

ہر فراہم کنندہ کے لیے الگ ترتیب دیں:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## ڈیش بورڈ UI

### Settings → Proxy ٹیب

- **عالمی پراکسی** کی کنفیگریشن (تمام ٹریفک کے لیے ایک بار مقرر کریں)
- **ہر فراہم کنندہ کے لیے پراکسی** اوور رائیڈز
- **ہر کنکشن کے لیے پراکسی** تفویضات
- ترتیب دی گئی پراکسی کے ذریعے **کنکشن ٹیسٹ**
- فعال پراکسی سطح دکھانے والے **رنگوں سے نشان زد بیجز**

### Settings → 1proxy ٹیب

- مفت پراکسیز حاصل کرنے کے لیے **ابھی ہم وقت ساز کریں** بٹن
- **اعدادوشمار کے کارڈز**: کل، فعال، اوسط معیار، آخری ہم وقت سازی
- **فلٹرز**: پروٹوکول، ملک کا کوڈ، کم از کم معیار
- ہوسٹ، پروٹوکول، ملک، معیار کے اسکور، تاخیر، گمنامی اور Google رسائی کے ساتھ **پراکسی ٹیبل**
- کامیابی/ناکامی کی ٹریکنگ اور مسلسل ناکامیوں کی تعداد کے ساتھ **ہم وقت سازی کی حیثیت** کا پینل
- تمام 1proxy اندراجات ہٹانے کے لیے **سب صاف کریں**

---

## API حوالہ

### پراکسی سیٹنگز API

| طریقہ    | اینڈ پوائنٹ                                    | وضاحت                           |
| -------- | ---------------------------------------------- | ------------------------------- |
| `GET`    | `/api/settings/proxy`                          | مکمل پراکسی کنفیگریشن حاصل کریں |
| `GET`    | `/api/settings/proxy?level=global`             | عالمی پراکسی حاصل کریں          |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | فراہم کنندہ کی پراکسی حاصل کریں |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | مؤثر پراکسی حل کریں             |
| `PUT`    | `/api/settings/proxy`                          | پراکسی کنفیگریشن اپ ڈیٹ کریں    |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | اس سطح سے پراکسی ہٹائیں         |

### پراکسی رجسٹری API

| طریقہ    | اینڈ پوائنٹ                                       | وضاحت                        |
| -------- | ------------------------------------------------- | ---------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | تمام پراکسیز کی فہرست دیکھیں |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | ID کے ذریعے پراکسی حاصل کریں |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | پراکسی تفویضات حاصل کریں     |
| `POST`   | `/api/v1/management/proxies`                      | پراکسی بنائیں                |
| `PATCH`  | `/api/v1/management/proxies`                      | پراکسی اپ ڈیٹ کریں           |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | پراکسی حذف کریں              |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | جبراً حذف کریں               |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | بڑی تعداد میں تفویض کریں     |
| `GET`    | `/api/v1/management/proxies/assignments`          | تفویضات کی فہرست دیکھیں      |
| `GET`    | `/api/v1/management/proxies/health`               | پراکسی کی صحت کے اعدادوشمار  |

### ٹنلز API

پراکسی کے ذریعے آؤٹ باؤنڈ روٹنگ کرنے کے بجائے اپنے OmniRoute انسٹینس کو عوامی انٹرنیٹ (Cloudflare/ngrok/Tailscale) پر ظاہر کرنے کے لیے، [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) دیکھیں۔ ٹنل REST API، `/api/tunnels/{cloudflared,ngrok,tailscale}/*` کے تحت موجود ہے اور اوپر دستاویزی شکل میں بیان کردہ آؤٹ باؤنڈ پراکسی چین سے آزاد ہے۔

### 1proxy API

| طریقہ    | اینڈ پوائنٹ                            | وضاحت                                 |
| -------- | -------------------------------------- | ------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | 1proxy پراکسیز کی فہرست دیکھیں        |
| `GET`    | `/api/settings/oneproxy?action=stats`  | اعدادوشمار + ہم وقت سازی کی حیثیت لیں |
| `GET`    | `/api/settings/oneproxy?action=status` | صرف ہم وقت سازی کی حیثیت حاصل کریں    |
| `POST`   | `/api/settings/oneproxy`               | ہم وقت سازی شروع کریں                 |
| `POST`   | `/api/settings/oneproxy/rotate`        | اگلی پراکسی پر منتقل ہوں              |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | ایک کو حذف کریں                       |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | سب صاف کریں                           |

### اپ اسٹریم پراکسی API

| طریقہ    | اینڈ پوائنٹ                       | وضاحت                                |
| -------- | --------------------------------- | ------------------------------------ |
| `GET`    | `/api/upstream-proxy/:providerId` | اپ اسٹریم پراکسی کنفیگریشن حاصل کریں |
| `PUT`    | `/api/upstream-proxy/:providerId` | اپ اسٹریم پراکسی موڈ مقرر کریں       |
| `DELETE` | `/api/upstream-proxy/:providerId` | اپ اسٹریم پراکسی کنفیگریشن ہٹائیں    |

---

## ماحولیاتی متغیرات

| متغیر                 | ڈیفالٹ | تفصیل                                                               |
| --------------------- | ------ | ------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true` | SOCKS5 پراکسی سپورٹ فعال کریں (`.env.example` میں ڈیفالٹ `true` ہے) |

---

## مسائل کا حل

### "SOCKS5 پراکسی غیر فعال ہے"

اپنی `.env` فائل میں `ENABLE_SOCKS5_PROXY=true` مقرر کریں اور دوبارہ شروع کریں۔

### پراکسی کے ذریعے "socket hang up" کی خرابیاں

سستی پراکسیز کے ساتھ یہ معمول کی بات ہے، کیونکہ وہ غیر فعال کنکشنز منقطع کر دیتی ہیں۔ OmniRoute پہلے ہی اسے مندرجہ ذیل طریقوں سے سنبھالتا ہے:

- پراکسی کنکشنز پر keep-alive کو غیر فعال کرنا (`keepAliveTimeout: 1`)
- pipelining کو غیر فعال کرنا (`pipelining: 0`)
- بار بار handshakes سے بچنے کے لیے dispatchers کو کیش کرنا

اگر مسئلہ برقرار رہے تو کوئی دوسری پراکسی آزمائیں یا 1proxy کی rotation خصوصیت استعمال کریں۔

### OAuth کے دوران "unsupported_country_region_territory"

یقینی بنائیں کہ OAuth فلو شروع کرنے سے **پہلے** پراکسی کنفیگر کی گئی ہو۔ OmniRoute، OAuth ٹوکن ایکسچینج کو کنفیگر کردہ پراکسی کے ذریعے روٹ کرتا ہے۔ پہلے global یا provider-level پراکسی مقرر کریں، پھر کنیکٹ کریں۔

### پراکسی استعمال نہیں ہو رہی

resolution کی ترتیب چیک کریں:

1. `GET /api/settings/proxy?resolve=your-connection-id` کے ذریعے تصدیق کریں
2. چیک کریں کہ پراکسی کا `status`، `active` ہے (`inactive` نہیں)
3. یقینی بنائیں کہ پراکسی assignment کا scope آپ کے کنکشن سے مطابقت رکھتا ہے

### 1proxy sync ناکام ہو رہا ہے

sync کی حالت چیک کریں:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

اگر `consecutiveFailures >= 5` ہو، تو circuit breaker فعال ہو چکا ہے۔ reset کرنے کے لیے سرور دوبارہ شروع کریں، یا دستی reset کا انتظار کریں۔

---

## ڈیٹابیس اسکیما

### `proxy_registry` ٹیبل

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' یا 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (صرف 1proxy)
  latency_ms INTEGER,                        -- ملی سیکنڈز (صرف 1proxy)
  anonymity TEXT,                            -- شفاف/گمنام/ایلیٹ
  google_access INTEGER DEFAULT 0,           -- کیا Google تک رسائی ہو سکتی ہے؟ (1proxy)
  last_validated TEXT,                       -- ISO ٹائم اسٹیمپ (1proxy)
  country_code TEXT,                         -- ISO کا 2-حرفی کوڈ (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments` ٹیبل

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global'، 'provider'، 'account'، 'combo'
  scope_id TEXT,              -- provider ID، connection ID، یا combo ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## پراکسی کی صحت کی جانچ (v3.8.16+)

OmniRoute کا **proxy fast-fail** میکانزم (`src/lib/proxyHealth.ts`) ایک فوری TCP کنکشن چیک کے ذریعے <2s میں ناکارہ پراکسیز کا پتہ لگاتا ہے، پھر ہر درخواست پر اضافی بوجھ سے بچنے کے لیے **نتیجہ کیش کرتا ہے**۔

### یہ کیسے کام کرتا ہے

```
درخواست ──▶ ProxyHealthCache.get(url)
             │
             ├─ کیش ہٹ + تازہ؟  ──▶ کیش شدہ حالت واپس کریں
             │
             └─ کیش مِس / پرانا؟  ──▶ host:port سے TCP کنکشن
                                          (ٹائم آؤٹ: FAST_FAIL_TIMEOUT_MS)
                                          ──▶ HEALTH_CACHE_TTL_MS تک کیش کریں
                                          ──▶ نتیجہ واپس کریں
```

اس کے بغیر، کوئی ناکارہ پراکسی ناکام ہونے سے پہلے ہر درخواست کو مکمل `PROXY_TIMEOUT_MS` (ڈیفالٹ 30s) تک بلاک کر دے گی۔

### قابلِ ترتیب ماحولیاتی متغیرات

| متغیر                        | ڈیفالٹ  | مقصد                                     |
| ---------------------------- | ------- | ---------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | ہر صحت کی جانچ کے لیے TCP کنکشن ٹائم آؤٹ |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | صحت کا نتیجہ کتنی دیر تک کیش کیا جاتا ہے |

**تجویز کردہ قدریں:**

| منظرنامہ                        | Fast-fail ٹائم آؤٹ | کیش TTL | وجہ                                                               |
| ------------------------------- | ------------------ | ------- | ----------------------------------------------------------------- |
| زیادہ تھروپٹ والا API گیٹ وے    | 1500ms             | 60000ms | جارحانہ fail-fast، چیکس کم کرنے کے لیے طویل کیش                   |
| جغرافیائی طور پر تقسیم شدہ نوڈز | 3000ms             | 15000ms | سست نیٹ ورکس کو زیادہ وقت درکار ہے؛ تیز failover کے لیے مختصر کیش |
| ڈیولپمنٹ / ٹیسٹنگ               | 1000ms             | 10000ms | مقامی پراکسیز پر تیز iteration                                    |
| اسٹیلتھ / anti-detection        | 2500ms             | 45000ms | ایسی تیز probing سے بچیں جو rate limits کو متحرک کر سکتی ہے       |

### پراکسی کی صحت کا معائنہ

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// کسی مخصوص پراکسی کو دوبارہ چیک کرنے پر مجبور کریں
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

جب کیش انٹری `HEALTH_CACHE_TTL_MS` سے تجاوز کر جائے تو `stale` فلیگ `true` ہوتا ہے، اور اگلی درخواست ایک نئی جانچ متحرک کرے گی۔

### ہر پراکسی قسم کے لیے ڈیفالٹس

صحت کی جانچ URL اسکیم کی بنیاد پر موزوں ڈیفالٹس استعمال کرتی ہے:

| اسکیم                      | ڈیفالٹ پورٹ |
| -------------------------- | ----------- |
| `http://`                  | 8080        |
| `https://`                 | 443         |
| `socks5://` / `socks5h://` | 1080        |

URL میں حسبِ ضرورت پورٹس (`http://host:9999`) کو ہمیشہ اسکیم کے ڈیفالٹ پر ترجیح حاصل ہوتی ہے۔

---

## پراکسی تجزیات اور مشاہدہ پذیری

OmniRoute ہر پراکسی کے استعمال کو ٹریک کرتا ہے تاکہ آپریٹرز کو روٹنگ کے پیٹرنز، تاخیر میں اچانک اضافے، اور بار بار ہونے والی ناکامیوں کی تشخیص میں مدد مل سکے۔

### کیا ٹریک کیا جاتا ہے

کنفیگر کردہ پراکسی سے گزرنے والی ہر درخواست کے لیے، OmniRoute درج ذیل معلومات ریکارڈ کرتا ہے:

| میٹرک        | وضاحت                                               |
| ------------ | --------------------------------------------------- |
| `proxy_url`  | مکمل پراکسی URL (تصدیقی اسناد کو مخفی کر کے)        |
| `provider`   | اپ اسٹریم فراہم کنندہ ID (openai، anthropic، وغیرہ) |
| `latency_ms` | پراکسی ہینڈ شیک سمیت آنے جانے کا کل وقت             |
| `connect_ms` | صرف TCP کنکشن کا وقت                                |
| `status`     | اپ اسٹریم سے موصول ہونے والا HTTP اسٹیٹس کوڈ        |
| `error`      | درخواست ناکام ہونے کی صورت میں خرابی کی کلاس        |
| `timestamp`  | ISO 8601 UTC                                        |

### ڈیٹا تک رسائی

```bash
# حالیہ پراکسی ایونٹس
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

اصل اینڈ پوائنٹ `/api/usage/proxy-logs` ہے (`src/app/api/usage/proxy-logs/route.ts` دیکھیں)۔ یہ اینڈ پوائنٹ درج ذیل کو سپورٹ کرتا ہے:

- `GET /api/usage/proxy-logs` — پراکسی لاگز حاصل کریں
- `DELETE /api/usage/proxy-logs` — تمام پراکسی لاگز صاف کریں

ضرورت پڑنے پر مجموعی اعداد و شمار کو SQL کے ذریعے براہِ راست `proxy_logs` ٹیبل سے حاصل کیا جا سکتا ہے۔ ڈیش بورڈ UI مجموعی ویوز فراہم کر سکتا ہے۔

### عام پیٹرنز

**غیر مستقل پراکسی کا پتہ لگائیں** (جو کامیابی اور ناکامی کے درمیان بدلتی رہتی ہو):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**سست پراکسیز تلاش کریں** (p95 تاخیر > 2s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## روٹیشن حکمتِ عملی کا فیصلہ جاتی درخت

جب ایک اسکوپ کو متعدد پراکسیز تفویض کی جاتی ہیں، تو OmniRoute ہر درخواست کے لیے استعمال ہونے والی پراکسی منتخب کرنے کی خاطر ایک **روٹیشن حکمتِ عملی** استعمال کرتا ہے۔ حکمتِ عملی کو اسکوپ کی سطح پر کنفیگر کیا جاتا ہے (عالمی، فی فراہم کنندہ، فی اکاؤنٹ، فی کومبو)۔

### دستیاب حکمتِ عملیاں

| حکمتِ عملی         | کب استعمال کریں                        | سمجھوتا                                                                                |
| ------------------ | -------------------------------------- | -------------------------------------------------------------------------------------- |
| `quality` (ڈیفالٹ) | مختلف معیار کی پراکسیز کے ساتھ پروڈکشن | زیادہ ریٹنگ والی پراکسیز کو ترجیح دیتی ہے؛ کم ریٹنگ والی پراکسیز کو مواقع نہیں مل سکتے |
| `random`           | لوڈ کی تقسیم، رازداری                  | یکساں تقسیم؛ معیار کے سگنلز کو نظر انداز کرتی ہے                                       |
| `sequential`       | ڈی بگنگ، قابلِ تکرار ٹیسٹنگ            | پراکسیز کو ترتیب وار استعمال کرتی ہے؛ سمجھنا آسان ہے                                   |

### فیصلہ جاتی درخت

```
                    کیا آپ کے پاس اپنی پراکسیز کے معیار کے اسکور موجود ہیں؟
                    │
        ┌───────────┴───────────┐
        │                       │
       ہاں                     نہیں
        │                       │
   کیا تمام پراکسیز             │
   معیار میں تقریباً             │
   برابر ہیں؟                    │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  ہاں       نہیں              استعمال کریں
   │         │              `random`
   │         │              (یکساں تقسیم
   │         │              وقت کے ساتھ معیار
   │         │              کا ڈیٹا بناتی ہے)
   │         │
   │    `quality` استعمال کریں
   │    (مختلف معیار کے
   │    لیے بہترین)
   │
`random` استعمال کریں
(لوڈ کو یکساں
طور پر تقسیم کریں)
```

## آپ کی اپنی پراکسیز کے لیے خودکار ناکامی اخراج

1proxy مارکیٹ پلیس پول پہلے ہی ناکام پراکسیز کی درجہ بندی خودکار طور پر گھٹا دیتا ہے (دیکھیے
[پراکسی معیار کے اسکورز](#proxy-quality-scores))۔ ان پراکسیز کے لیے جو **آپ** نے رجسٹری میں شامل کی ہیں، پس منظر کا صحت شیڈیولر
(`src/lib/proxyHealth/scheduler.ts`) کسی بھی چیز کو حذف کیے بغیر، یہی طرزِ عمل فراہم کرتا ہے کہ "غیر فعال رکن کو خودکار طور پر
چین سے خارج کر دیا جائے":

```bash
# .env — مسلسل 3 ناکام جانچوں کے بعد کسی پراکسی کو عارضی طور پر غیر فعال کریں، اور جب وہ
# دوبارہ جانچوں کا جواب دینا شروع کرے تو اسے خودکار طور پر دوبارہ فعال کر دیں۔
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

یہ متعدد پراکسیز پر مشتمل چین میں اس طرح کام کرتا ہے:

1. شیڈیولر ہر رجسٹرڈ پراکسی کو ہر `PROXY_HEALTH_INTERVAL_MS` کے بعد جانچتا ہے
   (پہلے سے طے شدہ 10 منٹ؛ کم از کم 1 منٹ)۔
2. `PROXY_AUTO_REMOVE_AFTER` مسلسل **حتمی** ناکامیوں کے بعد (ایک حقیقی
   کنکشن ناکامی — ٹائم آؤٹ یا جانچ کے ہدف کی اپنی 5xx خرابی کبھی شمار نہیں ہوتی، دیکھیے
   [پراکسی صحت کی جانچ](#proxy-health-checking-v3816))، پراکسی کا `status`
   `dead` پر سیٹ کر دیا جاتا ہے۔
3. `dead` ان اسٹیٹسز میں سے ایک ہے جنہیں پول/روٹیشن
   ریزولیوشن میں استعمال ہونے والا فعال-اسٹیٹس فلٹر خارج کر دیتا ہے، لہٰذا کسی اسکوپ کی روٹیشن (راؤنڈ رابن / بے ترتیب / اسٹکی /
   لیٹنسی — دیکھیے [روٹیشن حکمتِ عملی کا فیصلہ جاتی درخت](#rotation-strategy-decision-tree))
   فوری طور پر نئی درخواستوں کو وہ پراکسی دینا بند کر دیتی ہے۔ پول میں موجود کوئی دوسری پراکسی
   متاثر نہیں ہوتی، اور پورا پول کبھی خاموشی سے براہِ راست
   کنکشن پر واپس نہیں جاتا — فیل-کلوزڈ حفاظتی انتظام کے لیے [4 سطحی پراکسی سسٹم](#4-level-proxy-system) دیکھیے۔
4. شیڈیولر اسی وقفے سے `dead` پراکسیز کی جانچ جاری رکھتا ہے۔ اگلی
   کامیاب جانچ `status` کو دوبارہ `active` میں بدل دیتی ہے اور پراکسی دوبارہ روٹیشن میں شامل ہو جاتی ہے —
   اسے دستی طور پر دوبارہ شامل کرنے کی ضرورت نہیں ہوتی۔

یہ جان بوجھ کر **اختیاری اور غیر تخریبی** ہے: پہلے سے طے شدہ طور پر شیڈیولر صرف
ناکامیوں کو شمار اور لاگ کرتا ہے (`decision.ts` میں پالیسی C دیکھیے)، اور `PROXY_AUTO_DISABLE`
کبھی کوئی قطار حذف نہیں کرتا — اس مقصد کے لیے الگ اور زیادہ سخت
`PROXY_AUTO_REMOVE` فلیگ موجود ہے۔ اگر دونوں کو `true` پر سیٹ کیا گیا ہو تو `PROXY_AUTO_REMOVE`
کو ترجیح حاصل ہوتی ہے (جس پراکسی کو حذف کیا جانے والا ہو، اسے درمیان میں عارضی طور پر غیر فعال کرنے کا کوئی فائدہ نہیں)۔ متغیرات کی مکمل
فہرست کے لیے [ماحولیاتی کنفیگریشن](../reference/ENVIRONMENT.md) کا حوالہ دیکھیے۔

---

> 📖 **متعلقہ دستاویزات:**
>
> - [صارف رہنما](../guides/USER_GUIDE.md) — عمومی سیٹ اپ اور کنفیگریشن
> - [API حوالہ](../reference/API_REFERENCE.md) — مکمل API دستاویزات
> - [ماحولیاتی کنفیگریشن](../reference/ENVIRONMENT.md) — تمام ماحولیاتی متغیرات
