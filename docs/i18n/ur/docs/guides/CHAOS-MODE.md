# Chaos Mode (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ڈیش بورڈ:** **Chaos Mode** (سائیڈ بار) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ڈیش بورڈ سیشن) · `POST /api/skills/collect/chaos` (API کلید)  
> **ماخذ:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ایک کام بیک وقت کئی فراہم کنندگان کو بھیجتا ہے** — ہر شریک فراہم کنندہ
ایک ماڈل انسٹینس فراہم کرتا ہے، اور آپ کو تمام جوابات ساتھ ساتھ (یا زنجیروار) ملتے ہیں۔ یہ
ملٹی ماڈل عمل درآمد کی سطح ہے، روٹنگ کی حکمت عملی نہیں: آپ کی معمول کی `/v1/chat/completions`
ٹریفک اس سے کبھی متاثر نہیں ہوتی۔

**وضاحت — "chaos" نام کے ساتھ تین مختلف چیزیں فراہم کی جاتی ہیں:**

| چیز              | یہ کیا ہے                                                                                                | دستاویز کہاں موجود ہے                        |
| ---------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**   | یہاں بیان کردہ ڈیش بورڈ صفحہ + API: ایک کام کو کئی فراہم کنندگان میں پھیلانا (متوازی یا اشتراکی طور پر)۔ | یہ رہنما                                     |
| `auto/chaos`     | مضبوطی کی جانچ کے لیے فالٹ انجیکشن اسکورنگ ویٹس والی Auto-Combo ماڈل id۔ کنفیگر کرنے کے لیے کچھ نہیں۔    | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo کنفگ | `config.chaos.enabled` کے ساتھ محفوظ شدہ کومبو، جو اختیاری جج ماڈل والے پینل تک پھیلتا ہے (صرف API)۔     | `open-sse/services/autoCombo/chaosEngine.ts` |

## سیٹ اپ

1. **Dashboard → Chaos Mode** (`/dashboard/chaos`) کھولیں۔
2. اسے **آن** کریں — Chaos Mode بطور ڈیفالٹ **غیر فعال** فراہم ہوتا ہے (`enabled: false`
   `src/lib/chaos/chaosConfig.ts` میں)۔ غیر فعال ہونے کی صورت میں، `POST /api/chaos/run`
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` کے ساتھ جواب دیتا ہے۔
3. شرکاء اور ڈیفالٹس منتخب کریں (سیٹنگز اسٹور کے ذریعے ہر انسٹینس کے لیے محفوظ کیے جاتے ہیں):

   | فیلڈ                | مطلب                                                                | ڈیفالٹ / حدود                                  |
   | ------------------- | ------------------------------------------------------------------- | ---------------------------------------------- |
   | `enabled`           | مرکزی سوئچ                                                          | `false`                                        |
   | `defaultMode`       | `parallel` یا `collaborative` (نیچے دیکھیں)                         | `parallel`                                     |
   | `providerOverrides` | ہر فراہم کنندہ کی شرکت (`providerId`، اختیاری `modelId`، `enabled`) | خالی = ہر فعال فراہم کنندہ، زیادہ سے زیادہ 200 |
   | `systemPrompt`      | پہلے سے موجود Chaos سسٹم پرامپٹ کا متبادل                           | اختیاری، زیادہ سے زیادہ 10 000 حروف            |
   | `timeoutMs`         | ہر ماڈل کال کے لیے زیادہ سے زیادہ وقت                               | `120000` (5 000–600 000)                       |
   | `maxTokens`         | ہر ماڈل کال کے لیے `max_tokens`                                     | `4096` (256–128 000)                           |

4. **اسی صفحے سے ٹیسٹ چلائیں** — نتائج کا پینل ہر فراہم کنندہ کا جواب،
   اسٹیٹس اور دورانیہ دکھاتا ہے۔

## عمل درآمد کے طریقے

- **`parallel`** — ہر ماڈل کو ایک ہی کام بیک وقت ملتا ہے؛ آپ کو تمام جوابات
  ایک دوسرے سے آزاد طور پر موصول ہوتے ہیں۔
- **`collaborative`** — ماڈلز **زنجیر میں** چلتے ہیں: ہر ماڈل پچھلے ماڈل کا آؤٹ پٹ دیکھتا ہے اور
  اس سے اسے بہتر بنانے، وسعت دینے، تنقید کرنے یا متبادل پیش کرنے کے لیے کہا جاتا ہے۔ جواب کا `summary`
  فیلڈ کامیاب آؤٹ پٹس کو زنجیر کی ترتیب میں یکجا کرتا ہے (متوازی رنز میں `summary` نہیں ہوتا)۔

## API

### `POST /api/chaos/run` — ڈیش بورڈ سیشن

کوکی سے توثیق شدہ (مینجمنٹ سیشن — دیکھیں
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md))؛ ڈیش بورڈ صفحہ اسے استعمال کرتا ہے۔

```jsonc
// باڈی
{
  "task": "Compare approaches to X", // درکار
  "providers": ["glm", "kimi"], // اختیاری فلٹر
  "mode": "parallel", // اختیاری — defaultMode کو اوور رائیڈ کرتا ہے
  "systemPrompt": "…", // اختیاری متبادل
  "maxTokens": 4096, // اختیاری متبادل
}
```

### `POST /api/skills/collect/chaos` — API کلید

بیرونی کالرز کے لیے بیئرر ٹوکن متبادل۔ کلید کے پاس **Chaos Mode کی اجازت**
(`chaosModeEnabled`) ہونا ضروری ہے، جو **بطور ڈیفالٹ بند** ہوتی ہے — اسے ہر کلید کے لیے
**Dashboard → API Manager → edit key → permissions → Chaos Mode** میں فعال کریں۔ باڈی اوپر جیسی ہی ہے۔

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

دونوں اینڈ پوائنٹس ایک ہی ساخت میں جواب دیتے ہیں:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // صرف collaborative موڈ
}
```

## مسائل کا حل

- **`400 Chaos Mode is not enabled`** — اوپر مرحلہ 2 دیکھیں: عالمی سوئچ بند ہے۔
- **`/api/skills/collect/chaos` پر API کلید مسترد ہو جاتی ہے** — کلید کے پاس فی کلید
  `chaosModeEnabled` اجازت نہیں ہے (بطور ڈیفالٹ بند؛ یہ ایک سیٹنگ ہے، خرابی نہیں)۔
- **آپ کا متوقع فراہم کنندہ نتائج میں موجود نہیں** — Chaos Mode صفحے پر `providerOverrides`
  چیک کریں (غیر فعال اوور رائیڈ اسے خارج کر دیتا ہے) اور یہ بھی دیکھیں کہ فراہم کنندہ کا کنکشن
  فعال ہے یا نہیں۔
