# Monitoring & Observability Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **خلاصہ**: OmniRoute میں صحت کی اندرونی نگرانی، فراہم کنندہ آٹو پائلٹ، کوٹا ٹریکنگ، اور مشاہداتی ہُکس شامل ہیں۔ یہ رہنما ڈیش بورڈ، انتباہات، اور خرابیوں کے ازالے کا احاطہ کرتا ہے۔

**ماخذ:**

- `src/lib/monitoring/observability.ts` — مشاہداتی اسنیپ شاٹ
- `src/lib/monitoring/comboHealthAutopilot.ts` — کومبو ہیلتھ آٹو پائلٹ
- `src/lib/monitoring/providerHealthAutopilot.ts` — فراہم کنندہ آٹو پائلٹ
- `src/lib/monitoring/providerHealthMatrix.ts` — فراہم کنندہ ہیلتھ میٹرکس
- `src/lib/localHealthCheck.ts` — مقامی صحت کی جانچ
- `src/lib/tokenHealthCheck.ts` — ٹوکن ریفریش کی صحت
- `src/lib/proxyHealth.ts` — پراکسی ہیلتھ کیش (PROXY_GUIDE.md میں شامل)

---

## جائزہ

OmniRoute میں **نگرانی کی 3 تہیں** ہیں:

```
┌──────────────────────────────────────────────────────────────┐
│  تہہ 1: سسٹم کی صحت (سرور کی سطح پر)                          │
│  ├─ localHealthCheck.ts — DB، پورٹس، مقامی انحصارات           │
│  ├─ db/healthCheck.ts — سالمیت، FK، غیر منسلک باقیات          │
│  └─ ڈیش بورڈ: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  تہہ 2: فراہم کنندہ کی صحت (ہر فراہم کنندہ کی لچک)             │
│  ├─ providerHealthAutopilot.ts — سرکٹ بریکر، کول ڈاؤنز        │
│  ├─ providerHealthMatrix.ts — فراہم کنندہ/ماڈل کے لحاظ سے صحت کے اسکور │
│  └─ ڈیش بورڈ: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  تہہ 3: لائیو مشاہدہ پذیری (رن ٹائم اسنیپ شاٹس)               │
│  ├─ observability.ts — سرکٹ بریکرز، سیشنز، کوٹا               │
│  ├─ tokenHealthCheck.ts — OAuth ٹوکن ریفریش کی صحت            │
│  └─ MCP ٹولز: omniroute_get_health، omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ڈیش بورڈ کے صفحات

### `/dashboard/health` (سسٹم کی صحت)

اعلیٰ سطحی ہیلتھ ڈیش بورڈ یہ معلومات دکھاتا ہے:

| حصہ                      | یہ کیا دکھاتا ہے                                |
| ------------------------ | ----------------------------------------------- |
| **سرور کی حالت**         | اپ ٹائم، ورژن، پورٹ، فعال کنکشنز                |
| **ڈیٹابیس**              | کنکشن، سالمیت، WAL سائز، حالیہ مائیگریشنز       |
| **فراہم کنندہ کا خلاصہ** | فعال تعداد، صحت مند تعداد، کھلے بریکرز کی تعداد |
| **کوٹا مانیٹرز**         | فعال سیشنز، انتباہی حالت، ختم شدہ کوٹا          |
| **حالیہ خرابیاں**        | اسٹیک ٹریسز کے ساتھ آخری 10 خرابیاں             |
| **وسائل کا استعمال**     | میموری، CPU، ہیپ پریشر کا اشاریہ                |

### `/dashboard/providers` (فراہم کنندہ کی صحت)

ہر فراہم کنندہ کا ڈیش بورڈ:

| کالم        | وضاحت                                                      |
| ----------- | ---------------------------------------------------------- |
| فراہم کنندہ | فراہم کنندہ ID + ظاہری نام                                 |
| صحت         | سبز/پیلی/سرخ حالت                                          |
| سرکٹ        | کھلی/بند/نیم کھلی حالت                                     |
| کنکشنز      | کنکشنز کی تعداد، آخری ریفریش                               |
| ماڈلز       | دستیاب ماڈلز، ہر ماڈل کی صحت                               |
| لاگت        | آج کی لاگت، 7 دن کا رجحان                                  |
| خرابیاں     | گزشتہ 24 گھنٹوں کی خرابیوں کی تعداد، سرفہرست خرابی کی کلاس |

کسی فراہم کنندہ پر کلک کرکے یہ معلومات دیکھیں:

- تاخیر کی تفصیل کے ساتھ حالیہ درخواستیں
- ہر کنکشن کے صحت کے اسکور
- ہر ماڈل کے لاک آؤٹس
- آٹو پائلٹ کی سفارشات

### `/dashboard/quota` (کوٹا ٹریکنگ)

ہر API کلید کے لیے:

- موجودہ استعمال بمقابلہ حد (پروگریس بار)
- کوٹا کا رجحان (30 دن کا چارٹ)
- اگلا ری سیٹ وقت
- انتباہات کی تاریخ

### `/dashboard/combos` (کومبو کی صحت)

ہر کومبو کے لیے:

- حکمت عملی + اہداف
- ہر ہدف کی صحت
- حالیہ فال بیک واقعات
- کامیابی کی شرح (24 گھنٹے، 7 دن، 30 دن)

---

## ہیلتھ چیک API

OmniRoute دو HTTP ہیلتھ سطحیں فراہم کرتا ہے۔ آرکیسٹریٹرز کے لیے یہ ایک دوسرے کا متبادل نہیں ہیں۔

| راستہ                        | مقصد                                                          | بوجھ                                | استعمال                                                                    |
| ---------------------------- | ------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------- |
| `GET /healthz`               | لائف سائیکل لائیونیس/ریڈینیس (`ok` / `starting` / `stopping`) | معمولی (صرف فیز فلیگ)               | Kubernetes **ریڈینیس**؛ اگر HTTP استعمال کرنا ضروری ہو تو نرم **لائیونیس** |
| `GET /api/monitoring/health` | گہرا سسٹم + پرووائیڈر خلاصہ (DB، ہیپ، کیٹلاگ کی تعداد، …)     | بھاری (ہم وقت DB / مانیٹرنگ کا کام) | ڈیش بورڈز، بلیک باکس گہرے چیکس، Docker کا بلٹ اِن ہیلتھ چیک                |

> **نوٹ:** پرووائیڈر ہیلتھ میٹرکس، آٹو پائلٹ مسائل، کوٹا مانیٹرز، ٹوکن ہیلتھ، اور `/api/monitoring/health` سے زیادہ تفصیلی لیٹنسی کی معلومات **MCP ٹول** `observability_snapshot` یا **ڈیش بورڈ** صفحات کے ذریعے دستیاب ہیں — ان کے لیے کوئی مخصوص REST روٹس موجود نہیں ہیں۔

دونوں روٹس درخواستوں کو سنبھالنے والے **اسی Node ایونٹ لوپ** پر چلتے ہیں۔ CPU پر منحصر کوئی پاتھ (بڑے `GET /v1/models` کیٹلاگ کا کام، طویل کانٹیکسٹ کمپریشن / ٹوکن گنتی) `/healthz` سمیت **تمام** HTTP ہینڈلرز میں تاخیر کر سکتا ہے۔ مصروف ایونٹ لوپ ≠ مردہ پراسیس۔ وسائل پر قبضہ کرنے والے عمل کو درست کرنا ترجیح ہونی چاہیے؛ پروب ٹیوننگ صرف غلط طور پر پراسیس ختم کیے جانے کے واقعات کم کرتی ہے۔

### ہلکا پھلکا آرکیسٹریٹر پروب

```bash
GET /healthz
# یا HEAD /healthz
```

- جب سرور کا لائف سائیکل فیز تیار ہو تو **200** + باڈی `ok`
- بوٹ یا شٹ ڈاؤن کے دوران **503** + `starting` / `stopping`
- امپلیمینٹیشن: `src/app/healthz/route.ts` (کوئی DB پنگ نہیں)

### سسٹم ہیلتھ (گہرا)

```bash
GET /api/monitoring/health
```

جواب:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: پروب کیش بمقابلہ SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` **اِن میموری پروب کیش
گیج** ہے، `provider_connections.test_status` کا لائیو ڈمپ نہیں۔ #12532 کے بعد
درخواست کا پاتھ صرف `getCachedCredentialHealthSummary()` کو پڑھتا ہے؛ پس منظر کے پروبس
ایونٹ لوپ سے الگ کیش کو ریفریش کرتے ہیں۔

| تہہ                  | مقام                                                                  | اس کا مطلب                                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| پروب کیش گیج         | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | کریڈینشل ہیلتھ کے آخری پروب نتائج جو اب بھی پراسیس میموری میں موجود ہیں۔ `source` ہمیشہ `probe-cache` ہوتا ہے۔                                                                                                                 |
| ناکام کنکشن کی تفصیل | `credentialHealth.failedConnections`                                  | **صرف اس وقت موجود ہوتی ہے جب `failed > 0` ہو**۔ `status=error` والی کیش قطاروں کی محدود فہرست (`connectionId`، `status`، صاف کیا گیا `lastError` / `lastErrorType`)۔ فہرست محدود کیے جانے پر `failedOmitted` سیٹ کیا جاتا ہے۔ |
| SQLite مستقل اسٹیٹس  | `credentialHealth.staleDbNonOkCount`                                  | ان **فعال** (`is_active=1`) کنکشن قطاروں کی تعداد جن کا محفوظ کردہ `test_status` کوئی معلوم غیر درست قدر ہو (`error`، `expired`، `credits_exhausted`، `banned`، `deactivated`، `unavailable`)۔                                 |

دونوں تہیں دانستہ طور پر مختلف نتائج دکھا سکتی ہیں:

- گیج `failed=0` جبکہ `staleDbNonOkCount>0` — SQLite میں اب بھی ایک مستقل
  `test_status` (مثلاً `expired` یا `credits_exhausted`) موجود ہے جسے تازہ ترین
  پروب کیش اسنیپ شاٹ `status=error` کے طور پر شمار نہیں کرتا۔
- گیج `failed>0` جبکہ SQLite صحت مند دکھائی دے — حالیہ پروب ناکام ہوا اور
  کیش میں موجود ہے؛ DB قطار اپ ڈیٹ نہیں ہوئی، یا بعد میں صاف کر دی گئی۔

اس اینڈ پوائنٹ کو اسکریپ کرتے وقت صرف `provider_connections.test_status` کی بنیاد پر الرٹ
نہ کریں۔ لائیو پروب کی ناکامیوں کے لیے `failed` + `failedConnections` استعمال کریں، اور
محفوظ شدہ مستقل اسٹیٹس کی تعداد درکار ہو تو `staleDbNonOkCount` استعمال کریں۔

### Kubernetes پروب کی سفارشات

OmniRoute ایک **واحد Node پراسیس** (ایک ایونٹ لوپ) ہے۔ معیاری Docker `HEALTHCHECK` ہلکے پھلکے `/healthz` کو ہدف بناتا ہے۔ `/api/monitoring/health` kubelet کے لائیونیس وقفوں کے لیے **بہت بھاری** ہے۔

| پروب           | تجویز کردہ ہدف                                                                 | نوٹس                                                                                                                                                                                                                                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **آغاز**       | HTTP `GET /healthz` ایک طویل `failureThreshold` (یا بڑے `startPeriod`) کے ساتھ | کولڈ اسٹارٹ + SQLite مائیگریشن میں چند سیکنڈ سے زیادہ وقت لگ سکتا ہے                                                                                                                                                                                                                                                                                                     |
| **تیاری**      | HTTP `GET /healthz`                                                            | لائف سائیکل `ok` / `starting` / `stopping` (200 بمقابلہ 503)۔ اگر لوپ CPU کی وجہ سے بلاک ہو تو پھر بھی حالت بار بار بدلتی ہے۔ **کئی سیکنڈ بعد آنے والا 200 صحت مند حالت نہیں ہے** (#10303) — اس کا مطلب ہے کہ 3 بائٹ ہینڈلر کے چلنے سے پہلے ایونٹ لوپ وسائل سے محروم رہا                                                                                                 |
| **فعالیت**     | HTTP `GET /livez`، **یا مرکزی سروس پورٹ پر TCP** (`PORT`، ڈیفالٹ `20128`)      | `/livez` صرف پروسیس کے فعال ہونے کی جانچ کرتا ہے (اگر ہینڈلر چلے تو ہمیشہ 200)۔ یہ بھی اسی ایونٹ لوپ کو استعمال کرتا ہے — مصروف ≠ مردہ، اور یہ ایونٹ لوپ کے وسائل سے محروم ہونے (#10303) کا TCP سے بہتر پتا نہیں لگاتا۔ اگر کیٹلاگ/کمپریشن لوڈ کے تحت HTTP پروب ٹائم آؤٹ ہوں تو **TCP** کو ترجیح دیں؛ دونوں صورتوں میں ایونٹ لوپ کے مختصر تعطل پر پوڈ کو ختم **نہ کریں** |
| **تفصیلی صحت** | کسی بیرونی چیکر سے `GET /api/monitoring/health`                                | kubelet کے `livenessProbe` / سخت `readinessProbe` کے لیے نہیں                                                                                                                                                                                                                                                                                                            |

مثالی ساخت (تھریش ہولڈز کو اپنے کولڈ اسٹارٹ اور کمپریشن لوڈ کے مطابق ایڈجسٹ کریں):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # ایونٹ لوپ کے تعطل کے دوران HTTP /livez پھر بھی ٹائم آؤٹ ہو سکتا ہے۔ TCP
  # محتاط متبادل ہے:
  # tcpSocket:
  #   port: http
```

kubelet کی **فعالیت** کی جانچ کو `/api/monitoring/health` کی طرف **مت بھیجیں**۔ یہ پاتھ حقیقی DB/مانیٹرنگ کا کام کرتا ہے اور لوڈ کے تحت غلط مثبت نتیجہ دے گا۔

متعلقہ: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (ایونٹ لوپ کے مصروف ہونے کے دوران پروبز)، [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (کیٹلاگ پرائسنگ کا وسائل پر قابض ہونا)، [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (کمپریشن ٹوکن کی گنتی کا وسائل پر قابض ہونا)۔

### اختیاری ریکویسٹ پاتھ کا کام (میموری، اسکلز، ٹوکن ریفریش)

میموری ایکسٹریکشن، اسکلز انجیکشن، اور OAuth ٹوکن ریفریش `/healthz` کے ساتھ **مرکزی Node ایونٹ لوپ** استعمال کرتے ہیں۔ یہ ڈیش بورڈ سے ٹوگل ہونے والی خصوصیات (`memoryEnabled`، `skillsEnabled`) ہیں، ورکر پول نہیں۔ دیکھیے [ماحول — ایونٹ لوپ کی لاگت](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349)۔

### پرووائیڈر کی صحت

> **کوئی REST اینڈ پوائنٹ نہیں۔** پرووائیڈر کی صحت کا ڈیٹا MCP ٹول `observability_snapshot` یا ڈیش بورڈ کے `/dashboard/providers` صفحے کے ذریعے دستیاب ہے۔

### پرووائیڈر کی تفصیل

> **کوئی REST اینڈ پوائنٹ نہیں۔** ہر پرووائیڈر کی تفصیل ڈیش بورڈ کے `/dashboard/providers` صفحے کے ذریعے دستیاب ہے۔

---

## پرووائیڈر ہیلتھ آٹو پائلٹ

`providerHealthAutopilot.ts` ماڈیول ایک **خود بحال ہونے والا نظام** ہے جو:

1. پرووائیڈر کے مسائل کا پتہ لگاتا ہے (سرکٹ کھلا ہونا، کول ڈاؤنز، لاک آؤٹس، کوٹا انتباہات)
2. انہیں حل کرنے کے لیے **تجویز کردہ اقدامات** تیار کرتا ہے
3. اختیاری طور پر کم خطرے والے اقدامات کو **خودکار طور پر انجام دیتا** ہے

### دریافت کردہ مسائل کی اقسام

| مسئلے کی قسم                 | شدت      | مثالی صورتِ حال                      |
| ---------------------------- | -------- | ------------------------------------ |
| `provider_circuit_open`      | سنگین    | 5 ناکامیوں کے بعد سرکٹ بریکر کھلا ہے |
| `provider_circuit_half_open` | انتباہ   | سرکٹ بحالی کی جانچ کر رہا ہے         |
| `connection_cooldown`        | انتباہ   | 429 کے بعد کنکشن کول ڈاؤن میں ہے     |
| `stale_connection_error`     | انتباہ   | آخری ریفریش 30+ منٹ پہلے ناکام ہوا   |
| `terminal_connection_error`  | سنگین    | OAuth منسوخ، کلید غیر درست           |
| `inactive_connection`        | معلوماتی | ترتیبات میں کنکشن غیر فعال ہے        |
| `model_lockout`              | انتباہ   | مخصوص ماڈل قرنطینہ میں ہے            |
| `quota_monitor_warning`      | انتباہ   | کوٹا کا 80%+ استعمال ہو چکا ہے       |

### تیار کردہ اقدامات کی اقسام

| اقدام                          | خطرہ    | وضاحت                                       |
| ------------------------------ | ------- | ------------------------------------------- |
| `clear_provider_breaker`       | درمیانہ | سرکٹ بریکر کو بند حالت میں ری سیٹ کریں      |
| `clear_connection_cooldown`    | کم      | کنکشن سے کول ڈاؤن ہٹائیں                    |
| `clear_stale_connection_error` | کم      | فرسودہ خرابی کا فلیگ صاف کریں               |
| `clear_model_lockout`          | کم      | قرنطینہ شدہ ماڈل کو دوبارہ فعال کریں        |
| `reactivate_connection`        | درمیانہ | غیر فعال کنکشن کو دوبارہ فعال کریں          |
| `deactivate_connection`        | زیادہ   | مسئلہ پیدا کرنے والے کنکشن کو غیر فعال کریں |

### API

> **کوئی REST اینڈ پوائنٹ نہیں ہے۔** آٹو پائلٹ کے مسائل MCP ٹول `observability_snapshot` یا ڈیش بورڈ کے ذریعے دستیاب ہیں۔ آٹو پائلٹ اندرونی طور پر چلتا ہے؛ اس کا رویہ ماحول کے متغیرات کے بجائے ترتیبات کے DB کے ذریعے ترتیب دیا جاتا ہے (ہر کنکشن کا `autopilotMode` فیلڈ) — آٹو پائلٹ موڈ کے env var کے لیے `grep -rn` صفر نتائج لوٹاتا ہے۔

### آٹو پائلٹ موڈ

آٹو پائلٹ بطور ڈیفالٹ **دستی موڈ** میں کام کرتا ہے — یہ مسائل کا پتہ لگاتا اور تجویز کردہ اقدامات تیار کرتا ہے، لیکن انہیں خودکار طور پر لاگو نہیں کرتا۔ اقدامات ڈیش بورڈ کے ذریعے لاگو کیے جا سکتے ہیں۔

---

## کومبو ہیلتھ آٹو پائلٹ

`comboHealthAutopilot.ts` پرووائیڈر آٹو پائلٹ کا **کومبو کے لیے مخصوص** متبادل ہے۔ یہ:

- غیر صحت مند کومبوز کا پتہ لگاتا ہے
- اہداف کی ترتیب نو تجویز کرتا ہے
- خراب اہداف کو غیر فعال کرنے کی تجویز دیتا ہے
- N ناکامیوں کے بعد ناکارہ اہداف کو خودکار طور پر ہٹا دیتا ہے

### کومبو مسائل کی مثالیں

```
کومبو "always-on" (ترجیحی حکمتِ عملی)
├─ ہدف 1: openai/gpt-5 (صحت مند)
├─ ہدف 2: anthropic/claude-opus-4-6 (⚠️ ماڈل 14:00 تک لاک آؤٹ ہے)
└─ ہدف 3: kiro/claude-sonnet-4-5 (صحت مند)

تجویز کردہ اقدام: ترتیب نو — لاک آؤٹ ختم ہونے تک kiro کو anthropic سے اوپر منتقل کریں
```

---

## کوٹا مانیٹرز

`observability.ts` سبسکرپشن پرووائیڈرز (Claude Code، Codex، GitHub Copilot) کے لیے **ہر سیشن کے کوٹا مانیٹرز** ظاہر کرتا ہے:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### اسٹیٹس کے معانی

| اسٹیٹس      | کب                     | UI اقدام                                 |
| ----------- | ---------------------- | ---------------------------------------- |
| `starting`  | ابتدائی پول جاری ہے    | اسپنر                                    |
| `idle`      | کوئی حالیہ سرگرمی نہیں | ڈیش بورڈ سے پوشیدہ                       |
| `healthy`   | کوٹا کا > 50% باقی ہے  | سبز نقطہ                                 |
| `warning`   | کوٹا کا < 50% باقی ہے  | زرد انتباہ                               |
| `exhausted` | کوٹا = 0%              | سرخ بلاک، اگلے پرووائیڈر کی طرف روٹ کریں |
| `error`     | پولنگ ناکام ہو گئی     | سرخ نقطہ، جلد دوبارہ کوشش کریں           |

### API

> **کوئی REST اینڈ پوائنٹ نہیں ہے۔** کوٹا مانیٹر کا ڈیٹا MCP ٹول `observability_snapshot` یا ڈیش بورڈ کے ذریعے دستیاب ہے۔

---

## مشاہداتی اسنیپ شاٹ

MCP ٹول `observability_snapshot`، AI ایجنٹس کے لیے **سسٹم کا مکمل اسنیپ شاٹ** واپس کرتا ہے:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* اوپر دیکھیں */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ایجنٹس اسے **روٹنگ کے فیصلے** کرنے کے لیے استعمال کرتے ہیں — مثلاً، "اگر openai کا سرکٹ کھلا ہو تو پہلے anthropic کی طرف روٹ کریں"۔

---

## ٹوکن کی صحت کی جانچ

OAuth فراہم کنندگان (Claude Code، GitHub Copilot، Cursor) کو **وقتاً فوقتاً ٹوکن ریفریش** کی ضرورت ہوتی ہے۔ `src/lib/tokenHealthCheck.ts` پس منظر میں ایک شیڈیولر چلاتا ہے:

- **سویپ ٹِک**: ہر 60 سیکنڈ بعد (`src/lib/tokenHealthCheck.ts:30` میں `TICK_MS = 60 * 1000` کے مطابق سویپ)
- **فی کنکشن صحت کی جانچ کا وقفہ**: ڈیفالٹ 60 منٹ (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`)؛ سیٹنگز DB کے ذریعے قابلِ ترتیب
- **401 پر پیشگی ریفریش**: فی کنکشن انٹرسیپٹر کے ذریعے سنبھالا جاتا ہے

### ٹوکن کی صحت کی حالت

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### ترتیب

ٹوکن کی صحت کی جانچ کی ترتیب داخلی طور پر `tokenHealthCheck.ts` کے ذریعے سنبھالی جاتی ہے۔

### ٹوکن کی صحت

> **کوئی REST اینڈ پوائنٹ نہیں۔** ٹوکن کی صحت کا ڈیٹا ڈیش بورڈ یا MCP ٹول `observability_snapshot` کے ذریعے دستیاب ہے۔

---

## الرٹنگ

### بلٹ اِن چینلز

OmniRoute، **3 الرٹ چینلز** کو سپورٹ کرتا ہے:

| چینل          | سیٹ اپ        | استعمال کی صورت             |
| ------------- | ------------- | --------------------------- |
| ڈیش بورڈ بینر | ہمیشہ فعال    | اِن-ایپ اطلاعات             |
| Webhook       | URL ترتیب دیں | Slack، Discord، PagerDuty   |
| لاگ           | ڈیفالٹ        | بیرونی لاگ ایگریگیشن کے لیے |

### Webhook کی ترتیب

> **نوٹ:** Webhook الرٹنگ کی ترتیب ڈیش بورڈ کے Settings صفحے کے ذریعے سنبھالی جاتی ہے۔ Webhook URL، ایونٹ فلٹرنگ، اور پے لوڈ کی تخصیص کے لیے Settings UI دیکھیں۔

### الرٹ کی اقسام

| الرٹ                         | کب                                   | ڈیفالٹ شدت |
| ---------------------------- | ------------------------------------ | ---------- |
| `provider_circuit_open`      | سرکٹ کھلنے پر                        | نازک       |
| `provider_circuit_half_open` | سرکٹ کی بحالی کی جانچ کے دوران       | معلوماتی   |
| `quota_warning`              | کوٹہ 80%+ ہونے پر                    | انتباہ     |
| `quota_exhausted`            | کوٹہ 100% ہونے پر                    | نازک       |
| `token_refresh_failed`       | ریفریش کی مسلسل 3+ ناکامیوں پر       | انتباہ     |
| `token_expired`              | ٹوکن کی میعاد گزرنے پر               | نازک       |
| `combo_target_unhealthy`     | کومبو ہدف 1h+ تک کول ڈاؤن میں ہو     | انتباہ     |
| `db_integrity_warning`       | FK خلاف ورزیاں > 0 ہوں               | انتباہ     |
| `heap_pressure`              | ہیپ کا استعمال حد کے 80% سے زیادہ ہو | انتباہ     |

---

## کارکردگی کے میٹرکس

### ٹریک کیے جانے والے میٹرکس

| میٹرک                   | قسم      | ماخذ                            |
| ----------------------- | -------- | ------------------------------- |
| `request_count`         | کاؤنٹر   | `services/usage.ts`             |
| `request_latency_ms`    | ہسٹوگرام | `services/usage.ts`             |
| `tokens_consumed`       | کاؤنٹر   | `services/usage.ts`             |
| `cost_usd`              | کاؤنٹر   | `services/usage.ts`             |
| `provider_errors`       | کاؤنٹر   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | کاؤنٹر   | `services/resilience.ts`        |
| `cache_hits`            | کاؤنٹر   | `services/signatureCache.ts`    |
| `compression_savings`   | ہسٹوگرام | `services/compression/stats.ts` |
| `quota_used`            | گیج      | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | گیج      | `observability.ts`              |

### لیٹنسی پرسنٹائلز (p50/p95/p99)

> **کوئی REST endpoint نہیں ہے۔** لیٹنسی پرسنٹائل کا ڈیٹا ڈیش بورڈ کے `/dashboard/health` صفحے کے ذریعے دستیاب ہے۔ Prometheus/OpenTelemetry ایکسپورٹ v3.9 کے لیے منصوبہ بند ہے۔

### Prometheus / OpenTelemetry ایکسپورٹ (مرحلہ 2)

v3.9 کے لیے منصوبہ بند: Prometheus، OpenTelemetry، Datadog کو مقامی ایکسپورٹ۔

فی الحال، کسی بھی HTTP پر مبنی مانیٹرنگ سسٹم (Prometheus blackbox exporter، Datadog HTTP check، وغیرہ) کے ذریعے `/api/monitoring/health` کو اسکریپ کریں۔

---

## الرٹنگ کی تراکیب

### Slack

> **نوٹ:** Webhook الرٹنگ ڈیش بورڈ کے Settings صفحے کے ذریعے کنفیگر کی جاتی ہے — اس کے لیے کوئی مخصوص webhook env vars نہیں ہیں (`grep -rn` صفر نتائج واپس کرتا ہے)۔ webhook URL، ایونٹ فلٹرنگ، اور پے لوڈ کی تخصیص کے لیے Settings UI دیکھیں۔

### Discord

> Webhook الرٹنگ، Slack جیسا ہی Settings UI طریقۂ کار استعمال کرتی ہے۔ Discord اسی JSON پے لوڈ ساخت کو قبول کرتا ہے۔

### PagerDuty

> Webhook الرٹنگ وہی Settings UI طریقۂ کار استعمال کرتی ہے۔ PagerDuty Events API v2 روٹنگ کیز Settings UI میں کنفیگر کی جاتی ہیں۔

### حسبِ ضرورت Webhook (JSON)

> JSON باڈی کے ساتھ POST قبول کرنے والا کوئی بھی HTTP endpoint کام کرے گا۔ URL کو Settings UI میں کنفیگر کریں۔

---

## ڈیش بورڈ کی کنفیگریشن

### ہیلتھ ڈیش بورڈ کو حسبِ ضرورت بنائیں

ایک `~/.omniroute/dashboard.json` بنائیں:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### کسی پرووائیڈر کو سب سے اوپر پِن کریں

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## مسائل کا ازالہ

### "پرووائیڈر صحت مند دکھائی دیتا ہے لیکن درخواستیں ناکام ہو رہی ہیں"

1. **autopilot مسائل** چیک کریں — ممکن ہے کوئی ماڈل لاک آؤٹ ہو
2. مخصوص ایرر کلاس کے لیے **حالیہ خرابیاں** دیکھیں
3. پرووائیڈر کارڈ میں **کنکشن ٹیسٹ** آزمائیں
4. چیک کریں کہ آیا پرووائیڈر **upstream پر ریٹ لمیٹڈ** ہے (مقامی طور پر دکھائی نہیں دیتا)

### "کوٹہ صحت مند دکھائی دیتا ہے لیکن مجھے 429s نظر آ رہے ہیں"

- 429 کا مطلب ہے کہ پرووائیڈر کے مطابق آپ اپنا کوٹہ استعمال کر چکے ہیں
- OmniRoute کی کوٹہ ٹریکنگ **پرانی** ہو سکتی ہے — حتمی درست صورتِ حال upstream پرووائیڈر کے پاس ہوتی ہے
- کوٹہ ڈیٹا اندرونی کوٹہ مانیٹر کے ذریعے خودکار طور پر ریفریش ہوتا ہے

### "Combo ناکام ہو رہا ہے لیکن تمام اہداف صحت مند دکھائی دیتے ہیں"

- اہداف کی ترتیب کے مسائل کے لیے **combo health** ڈیش بورڈ چیک کریں
- **fallback ایونٹس** دیکھیں — ممکن ہے combo بہت تیزی سے تمام اختیارات آزما رہا ہو
- تصدیق کریں کہ **strategy** آپ کے استعمال کے معاملے سے مطابقت رکھتی ہے (priority بمقابلہ round-robin بمقابلہ auto)

### "ڈیٹا بیس ہیلتھ چیک ناکام ہو رہا ہے"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` چلائیں
- اگر "ok" آئے — یہ غلط الارم ہے، ہیلتھ چیک ضرورت سے زیادہ سخت ہے
- اگر کچھ اور آئے — **OmniRoute کو روکیں** اور [ڈیزاسٹر ریکوری گائیڈ](./DATABASE_GUIDE.md#disaster-recovery) پر عمل کریں

### "میموری ہیپ پر دباؤ تشویش ناک ہے"

```bash
# موجودہ ہیپ چیک کریں
node -e "console.log(process.memoryUsage())"

# دستی GC متحرک کریں (اگر --expose-gc موجود ہو)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# بیک وقت درخواستوں کی تعداد کم کریں (اسے ڈیش بورڈ کے Settings صفحے کے ذریعے سیٹ کریں، env var کے ذریعے نہیں)
# کوئی `MAX_CONCURRENT_REQUESTS` env var موجود نہیں ہے — اسے Settings → Concurrency میں کنفیگر کریں۔
```

---

## مزید دیکھیں

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — استعمال اور لاگت کی ٹریکنگ
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB اسکیما + صحت
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — پراکسی کی صحت (علیحدہ کیش)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — سسٹم کا فنِ تعمیر
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — سرکٹ بریکر کی تفصیلات
- ماخذ: `src/lib/monitoring/` (4 فائلیں، 2121 LOC)
