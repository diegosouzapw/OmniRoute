# 🗜️ Prompt Compression Guide — OmniRoute (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> موزوں سیاق و سباق پر خودکار طور پر 15-95% بچت کریں۔ فوری جائزے کے لیے، [README کا Compression سیکشن](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) دیکھیں۔

## جائزہ

OmniRoute ایک ماڈیولر پرامپٹ کمپریشن پائپ لائن نافذ کرتا ہے جو درخواستوں کے اپ اسٹریم فراہم کنندگان تک پہنچنے سے **پیشگی** چلتی ہے۔ اس کا مطلب ہے کہ آپ کے ٹوکنز کی بچت شفاف انداز میں ہوتی ہے — آپ کے ورک فلو میں کسی تبدیلی کی ضرورت نہیں۔

```
کلائنٹ کی درخواست
  → کمپریشن حکمتِ عملی کا انتخاب کنندہ
    → Combo اوور رائیڈ؟ → Combo کی ترتیب استعمال کریں
    → خودکار ٹرگر کی حد؟ → خودکار موڈ استعمال کریں
    → ڈیفالٹ موڈ؟ → عالمی ترتیب استعمال کریں
    → بند؟ → کمپریشن چھوڑ دیں
  → منتخب کردہ کمپریشن موڈ
    → بند: کوئی کمپریشن نہیں
    → ہلکا: محفوظ خالی جگہ/فارمیٹنگ کی صفائی (~15%)
    → معیاری: Caveman طرز میں اضافی الفاظ کا اخراج (~30%)
    → جارحانہ: ہسٹری ایجنگ + خلاصہ سازی (~50%)
    → الٹرا: ہیورسٹک چھانٹی + کوڈ بلاک کو مختصر کرنا (~75%)
    → RTK: کمانڈ سے آگاہ ٹرمینل/ٹول آؤٹ پٹ فلٹرنگ (اپ اسٹریم حد 60-90%)
    → اسٹیکڈ: ترتیب وار کثیر انجن پائپ لائن، عموماً پہلے RTK پھر Caveman (موزوں حد 78-95%)
  → کمپریس شدہ درخواست → فراہم کنندہ
```

---

## کمپریشن موڈز

### بند

کوئی کمپریشن لاگو نہیں کی جاتی۔ تمام پیغامات بغیر تبدیلی کے گزر جاتے ہیں۔

### ہلکا موڈ (~15% بچت، <1ms تاخیر)

سب سے محفوظ موڈ — مفہوم میں کوئی تبدیلی نہیں، صرف فارمیٹنگ کی صفائی:

| تکنیک                    | وضاحت                                             |
| ------------------------ | ------------------------------------------------- |
| `collapseWhitespace`     | مسلسل خالی سطروں اور آخری خالی جگہوں کو یکجا کرنا |
| `dedupSystemPrompt`      | نقلی سسٹم پیغامات کو ہٹانا                        |
| `compressToolResults`    | تفصیلی ٹول/فنکشن آؤٹ پٹس کو کمپریس کرنا           |
| `removeRedundantContent` | دہرائی گئی ہدایات کو ہٹانا                        |
| `replaceImageUrls`       | base64 امیج ڈیٹا URIs کو مختصر کرنا               |

**بہترین برائے:** ہمیشہ فعال استعمال، سلامتی کے لحاظ سے حساس ورک فلوز۔

### معیاری موڈ (~30% بچت)

[Caveman](https://github.com/JuliusBrussee/caveman) سے متاثر — معنی برقرار رکھتے ہوئے اضافی الفاظ اور غیر ضروری تفصیلی عبارت کو ہٹاتا ہے:

- اضافی الفاظ ہٹاتا ہے ("براہِ کرم"، "میرے خیال میں"، "بنیادی طور پر"، "دراصل")
- طویل فقروں کو مختصر کرتا ہے ("کرنے کے لیے" → "کو"، "کے نتیجے میں" → "کی وجہ سے")
- مؤدبانہ تذبذب والی عبارت ہٹاتا ہے ("کیا آپ کو اعتراض ہوگا..."، "اگر آپ ممکنہ طور پر کر سکیں...")
- کوڈنگ پرامپٹس کے لیے بہتر بنائے گئے 30+ regex قواعد

**بہترین برائے:** روزمرہ کوڈنگ ورک فلوز، لاگت کے بارے میں محتاط ٹیمیں۔

### جارحانہ موڈ (~50% بچت)

طویل سیشنز کے لیے ذہین ہسٹری مینجمنٹ:

- **پیغامات کی ایجنگ** — پرانے پیغامات کو بتدریج زیادہ کمپریس کیا جاتا ہے
- **ٹول نتائج کی خلاصہ سازی** — طویل ٹول آؤٹ پٹس کو خلاصوں سے بدل دیا جاتا ہے
- **ساختی سالمیت کے محافظ** — یقینی بناتے ہیں کہ `tool_use` + `tool_result` جوڑے ہم آہنگ رہیں
- **کانٹیکسٹ ونڈو سے آگاہی** — ہر ماڈل کی ٹوکن حدود کا لحاظ رکھتی ہے

**بہترین برائے:** طویل ڈیبگنگ سیشنز، بڑے کوڈ بیسز۔

### الٹرا موڈ (~75% بچت)

ٹوکن کے لحاظ سے حساس حالات کے لیے زیادہ سے زیادہ کمپریشن:

- **ہیورسٹک چھانٹی** — مطابقت کی حد سے نیچے موجود پیغامات ہٹاتی ہے
- **کوڈ بلاک کو مختصر کرنا** — دہرائی جانے والی کوڈ مثالوں کو کمپریس کرتا ہے
- **بائنری سرچ ٹرنکیشن** — کانٹیکسٹ ونڈو کے لیے بہترین قطع کا مقام تلاش کرتی ہے
- جارحانہ موڈ کی تمام خصوصیات شامل ہیں

**بہترین برائے:** جب آپ بار بار کانٹیکسٹ حدود تک پہنچ رہے ہوں۔

### RTK موڈ (اپ اسٹریم حد 60-90%)

RTK موڈ کوڈنگ ایجنٹ سیشنز میں ظاہر ہونے والے تفصیلی ٹول آؤٹ پٹس کے لیے بہتر بنایا گیا ہے:

- `git status`، `git diff`، `git log`، ٹیسٹ رنرز،
  TypeScript/Vite/Webpack بلڈز، ESLint/Biome/Prettier، npm آڈٹ/انسٹالیشنز، Docker لاگز، انفرا
  آؤٹ پٹ، اور عمومی شیل آؤٹ پٹ جیسی کمانڈ/آؤٹ پٹ کلاسز کا پتا لگاتا ہے
- `open-sse/services/compression/engines/rtk/filters/` سے JSON فلٹر پیکس لاگو کرتا ہے
- پروجیکٹ یا عالمی `filters.toml` فائلوں سے RTK TOML schema v1 فلٹرز درآمد کرتا ہے، جس میں ان لائن ٹیسٹ
  کی توثیق اور پروجیکٹ فائلوں کے لیے اعتماد پر مبنی پابندی شامل ہے
- ان لائن توثیقی نمونوں کے ساتھ 49 بلٹ اِن فلٹرز فراہم کرتا ہے
- ANSI کنٹرول سلسلے، پروگریس بارز، دہرائی گئی سطریں، اور ناقابلِ عمل شور ہٹاتا ہے
- ناکامیاں، خرابیاں، انتباہات، تبدیل شدہ فائلیں، خلاصے، اور طویل آؤٹ پٹ کا آخری حصہ محفوظ رکھتا ہے
- اعتماد پر مبنی پابندی والے پروجیکٹ فلٹرز، عالمی فلٹرز، اور اختیاری طور پر حذف شدہ حساس معلومات والے خام آؤٹ پٹ کی بازیابی کو سپورٹ کرتا ہے

**بہترین برائے:** شیل، بلڈ، ٹیسٹ، git، grep، اور فائل آؤٹ پٹ ٹرانسکرپٹس والے ایجنٹ سیشنز۔

### اسٹیکڈ موڈ (موزوں حد 78-95%)

اسٹیکڈ موڈ متعدد کمپریشن انجنز کو ایک متعین ترتیب میں چلاتا ہے۔ ڈیفالٹ پائپ لائن یہ ہے:

```txt
RTK -> Caveman
```

یہ ترتیب پہلے ٹرمینل/ٹول آؤٹ پٹ کو مختصر رکھتی ہے، پھر باقی قدرتی زبان کے پرامپٹ پر Caveman کی معنوی اختصار کاری لاگو کرتی ہے۔
اسٹیکڈ پائپ لائنز کو عالمی طور پر یا روٹنگ combos کو تفویض کردہ کمپریشن combos کے ذریعے
کنفیگر کیا جا سکتا ہے۔

**بہترین برائے:** بڑے ٹول لاگز کے ساتھ انسانی ہدایات یا اسسٹنٹ کے خلاصوں پر مشتمل مخلوط سیاق و سباق۔

---

## اپ اسٹریم بچت کا حساب

OmniRoute کمپریشن کی بچت کو دو ذرائع سے دستاویزی شکل دیتا ہے: اپ اسٹریم پروجیکٹ بینچ مارکس اور
OmniRoute کے اپنے انجنوں کی ترکیب۔

| ماخذ    | یہاں استعمال ہونے والا اپ اسٹریم README کا عدد                                                         |
| ------- | ------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` کم آؤٹ پٹ ٹوکنز، `65%` بینچ مارک کی اوسط آؤٹ پٹ بچت، `22-87%` حد، اور `~46%` اِن پٹ کمپریشن ٹول |
| RTK     | کمانڈ آؤٹ پٹ میں `60-90%` بچت؛ نمونہ سیشن میں `~118,000 -> ~23,900` ٹوکنز، یا `79.7%` بچت (`~80%`)     |

ایک دوسرے پر منطبق ہونے والے ٹول/کانٹیکسٹ پے لوڈز کے لیے، OmniRoute کا ڈیفالٹ امتزاج انجنوں کو یکے بعد دیگرے چلاتا ہے:

```txt
RTK -> Caveman
```

مشترکہ بچت ضربی ہوتی ہے، جمعی نہیں:

```txt
مشترکہ = 1 - (1 - RTK بچت) * (1 - Caveman اِن پٹ بچت)
اوسط   = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
حد     = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

یہ `78-95%` عدد اس وقت لاگو ہوتا ہے جب RTK اور Caveman دونوں ایک ہی اِن پٹ/کانٹیکسٹ پے لوڈ کو کم کر سکیں۔
Caveman کا رسپانس آؤٹ پٹ موڈ الگ ہے: فعال ہونے پر، Caveman کی اپنی آؤٹ پٹ بچت (`65%`
اوسط، `~75%` نمایاں عدد، `22-87%` حد) استعمال کریں۔ بلنگ کی کل بچت آپ کے پرامپٹ/آؤٹ پٹ کے تناسب پر منحصر ہے۔

### "اہل" ہونے کا اصل مطلب

15-95% کی نمایاں حد حقیقی ہے، لیکن یہ صرف **مکرر یا غیر ضروری طور پر طویل** مواد پر لاگو ہوتی ہے — بار بار آنے والی
خرابی کی سطریں، ایک بلڈ لاگ جو ایک ہی وارننگ بار بار دکھاتا ہو، یا ضرورت سے بڑا `grep`/فائل ریڈ ڈمپ۔ اس کا
**یہ مطلب نہیں** کہ ہر درخواست میں اتنی بچت ہوتی ہے۔

تجرباتی طور پر تصدیق شدہ (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): ایک
`stacked` (RTK + Caveman) رن نے Anthropic ساخت کے `tool_result` بلاک میں موجود 300 یکساں
خرابی کی سطروں پر **95.93% ٹوکن بچت / 96.26% کریکٹر بچت** حاصل کی — جو تشہیر کردہ
حد کے عین اندر ہے۔ لیکن یہی پائپ لائن جب عام، غیر مکرر ٹول آؤٹ پٹ (ایک صاف `grep` میچ فہرست،
ایک مختصر فائل ریڈ، عام گفتگو کا متن) پر چلائی جاتی ہے تو درست طور پر **تقریباً صفر بچت** دیتی ہے، کیونکہ
حذف کرنے کے لیے کوئی تکرار موجود نہیں ہوتی اور `validateCompression()` (`validation.ts`) ایسی
دوبارہ تحریر بھیجنے سے انکار کرتا ہے جو کوڈ بلاکس، URLs، سرخیوں، ورژنز، یا ALL-CAPS مستقل شناخت کاروں کو حذف یا تبدیل کرے۔

یہ متوقع اور محفوظ رویہ ہے، بگ نہیں: ایک کوڈنگ سیشن جو زیادہ تر صاف فائلیں پڑھتا/grep کرتا ہے، اس میں
کمپریشن مکمل طور پر فعال ہونے کے باوجود مجموعی بچت معمولی ہوگی، جبکہ ناکام ہونے والے
لوپ یا بہت زیادہ آؤٹ پٹ دینے والے لنٹر والے سیشن میں اس ٹریفک پر مکمل 78-95% حد کی بچت ہوگی۔ کسی ایک سیشن کی
کم مجموعی بچت کی شرح کو کمپریشن کی غلط کنفیگریشن کا ثبوت نہ سمجھیں — پہلے یہ جانچیں کہ آیا
بنیادی ٹول آؤٹ پٹ واقعی مکرر تھا۔

---

## ٹوکن بچت کی بصری نمائندگی

```
کمپریشن کے بغیر:       LLM کو 47K ٹوکنز بھیجے گئے
Lite کے ساتھ:          40K ٹوکنز بھیجے گئے          (15% بچت — محفوظ، ہمیشہ فعال)
Standard کے ساتھ:      33K ٹوکنز بھیجے گئے          (30% بچت — caveman-speak اصول)
Aggressive کے ساتھ:    24K ٹوکنز بھیجے گئے          (50% بچت — عمر بندی + خلاصہ سازی)
Ultra کے ساتھ:         12K ٹوکنز بھیجے گئے          (75% بچت — تخمینی چھانٹی)
RTK کے ساتھ:           19K-5K ٹوکنز بھیجے گئے       (کمانڈ/ٹول آؤٹ پٹ پر 60-90% بچت)
Stacked کے ساتھ:       10K-2.5K ٹوکنز بھیجے گئے     (اہل RTK+Caveman مواد پر 78-95% حد)
```

---

## Configuration

### Dashboard

`Dashboard → Context & Cache` پر نیویگیٹ کریں:

- **Caveman** — موڈ کا انتخاب، لینگویج پیکس، پیش نظارہ (preview)، اور عالمی ڈیفالٹس
- **RTK** — کمانڈ فلٹر کا پیش نظارہ، RTK حفاظتی ترتیبات، اور فلٹر کیٹلاگ
- **Compression Combos** — نامزد کردہ انجن پائپ لائنز جو روٹنگ کمبوز کے لیے مختص ہیں
- **Auto-Trigger Threshold** — جب ٹوکن کی تعداد حد (threshold) سے تجاوز کر جائے تو خودکار طور پر کمپریشن کو فعال کریں

### Per-Combo Override

`Dashboard → Context & Cache → Compression Combos` میں، ایک روٹنگ کمبو کے لیے کمپریشن کمبو تفویض کریں:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

یہ آپ کو مفت/کوڈنگ فراہم کنندگان (providers) پر اسٹیکڈ کمپریشن (stacked compression) استعمال کرنے کی اجازت دیتا ہے جبکہ بامعاوضہ سبسکرپشنز پر لائٹ موڈ (lite mode) برقرار رکھتا ہے۔

یہ "Per-Combo Override" اسائنمنٹ **routing-combo compression mode** اوور رائیڈ (Default/Off/Lite/Standard/Aggressive/Ultra) سے ایک مختلف کنٹرول ہے — یہ اوور رائیڈ کسی نامزد کردہ compression-combo پائپ لائن کا انتخاب نہیں کرتا؛ یہ صرف `compressionMode` فیلڈ کو سیٹ کرتا ہے جسے `resolveCompressionPlan` استعمال کرتا ہے۔ اسے یا تو کمبو کارڈ (`Dashboard → Combos`) پر سیٹ کیا جا سکتا ہے یا، #6760 کے بعد سے، `Dashboard → Context & Cache → Compression Combos` پر "Assign to routing" کی فہرست میں فی روٹنگ کمبو سیٹ کیا جا سکتا ہے، بالکل اوپر دستاویزی پائپ لائن اسائنمنٹ چیک باکس کے ساتھ۔ دونوں سطحیں ایک ہی `PUT /api/combos/{id}` اینڈ پوائنٹ کے ذریعے محفوظ (persist) ہوتی ہیں۔

### Per-request override

کسی ایک درخواست (request) کے لیے کمپریشن پلان کو اوور رائیڈ کرنے کے لیے `x-omniroute-compression` درخواست ہیڈر بھیجیں۔ اس کی ترجیح سب سے زیادہ ہے — یہ routing-combo اوور رائیڈ، فعال پروفائل (active profile)، خودکار ٹرگر (auto-trigger)، اور پینل ڈیفالٹ (panel Default) کو پیچھے چھوڑ دیتا ہے۔ نامعلوم ویلیوز کو نظر انداز کر دیا جاتا ہے (درخواست کو کبھی مسترد نہیں کیا جاتا) اور عالمی ماسٹر سوئچ (global master switch) اب بھی سب کچھ کنٹرول کرتا ہے: جب کمپریشن عالمی سطح پر بند ہو، تو ہیڈر اسے آن نہیں کر سکتا۔ ویلیوز درج ذیل ہیں:

| ویلیو         | اثر                                                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | اس درخواست کے لیے کوئی کمپریشن نہیں ہوگی۔                                                                                                               |
| `default`     | پینل سے اخذ کردہ ڈیفالٹ پروفائل (فعال پروفائل کو نظر انداز کرتا ہے)۔ نقصان دہ (lossy) انجن بند رہتے ہیں۔                                                |
| `safe`        | ہیڈر کو چھوڑ دینے کے مترادف: صرف ڈپلیکیشن کا خاتمہ (dedup) اور وائٹ اسپیس فولڈنگ (whitespace folding)۔                                                  |
| `allow-lossy` | اس درخواست کے آپریٹر پلان کو برقرار رکھیں، بشمول خلاصے (summaries)، مطابقت کے فلٹرز (relevance filters)، اور اسٹائل کی دوبارہ تحریریں (style rewrites)۔ |
| `engine:<id>` | فعال ہونے پر ایک واحد انجن، مثال کے طور پر `engine:rtk`۔ یہ اس انجن کے لیے فی درخواست آپٹ ان (opt-in) ہے۔                                               |
| `<combo>`     | ایک نامزد کمبو، جو پہلے نام (کیس کی تفریق کے بغیر) اور پھر آئی ڈی (id) کے ذریعے میچ کیا جاتا ہے۔                                                        |

`allow-lossy`، `engine:<id>`، یا کسی نامزد کمبو کے بغیر، نقصان دہ (lossy) انجن لاگو نہیں ہوتے ہیں۔ کمپریشن آن ہونے پر درخواست کو اب بھی سیشن ڈیڈپ (session dedup) اور وائٹ اسپیس فولڈنگ حاصل ہوتی ہے۔

لاگو کردہ پلان `X-OmniRoute-Compression: <mode>; source=<source>` رسپانس ہیڈر میں واپس بھیجا جاتا ہے، جہاں `<source>` ان میں سے ایک ہوتا ہے: `request-header`، `routing-override`، `active-profile`، `auto-trigger`، `default`، یا `off`۔

### API

```bash
# کمپریشن کی ترتیبات حاصل کریں
curl http://localhost:20128/api/settings/compression

# کمپریشن کی ترتیبات کو اپ ڈیٹ کریں
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# ایک مخصوص RTK/stacked پے لوڈ کا پیش نظارہ کریں
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK فلٹر پیک کی فہرست حاصل کریں
curl http://localhost:20128/api/context/rtk/filters

# اختیاری کمانڈ میٹا ڈیٹا کے ساتھ براہ راست RTK کی جانچ کریں
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## کیا محفوظ رکھا جاتا ہے

کمپریشن انجن **ہمیشہ درج ذیل کو محفوظ رکھتا ہے:**

- ✅ کوڈ بلاکس (فینس شدہ اور اِن لائن)
- ✅ URLs اور فائل پاتھس
- ✅ JSON ساختیں اور منظم ڈیٹا
- ✅ شناخت کنندگان اور محفوظ تکنیکی ٹوکنز
- ✅ ریاضیاتی اظہارات
- ✅ ٹول/فنکشن کال کی تعریفیں
- ✅ سسٹم پرامپٹس (لائٹ موڈ میں)

کسی بھی چیز کو محفوظ کیے جانے سے پہلے RTK خام آؤٹ پٹ ریکوری عام API کیز، بیئرر ٹوکنز، Slack ٹوکنز، AWS ایکسیس کیز،
پاس ورڈز، ٹوکنز، اور رازدارانہ معلومات کو مخفی کر دیتی ہے۔

---

## کمپریشن کے اعداد و شمار

ہر کمپریس شدہ درخواست کے اعداد و شمار سرور لاگز میں شامل ہوتے ہیں:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## مرحلہ جاتی منصوبہ

| مرحلہ    | طریقے                                                                                                                                | حالت               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| مرحلہ 1  | آف، لائٹ                                                                                                                             | ✅ جاری کر دیا گیا |
| مرحلہ 2  | معیاری، جارحانہ، الٹرا                                                                                                               | ✅ جاری کر دیا گیا |
| مرحلہ 3  | RTK، اسٹیکڈ، کمپریشن کومبوز                                                                                                          | ✅ جاری کر دیا گیا |
| مرحلہ 4  | آؤٹ پٹ اسٹائلز، SLM-ٹیر الٹرا، ایوال ہارڈنس                                                                                          | ✅ جاری کر دیا گیا |
| مرحلہ 4C | اڈاپٹیو کانٹیکسٹ بجٹ ("ڈائل") — کمپیوٹ انجن + API (`contextBudget` on `PUT /api/settings/compression`) + ڈیش بورڈ موڈ/پالیسی کنٹرولز | ✅ جاری کر دیا گیا |

---

## اعترافات

اسٹینڈرڈ موڈ کے کمپریشن قواعد **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) کے **[Caveman](https://github.com/JuliusBrussee/caveman)** سے متاثر ہیں — یہ وائرل "جب چند ٹوکن کام کر سکتے ہیں تو زیادہ ٹوکن کیوں استعمال کریں" پروجیکٹ ہے۔ Caveman آؤٹ پٹ ٹوکنز میں `~75%` کمی، بینچ مارک پر اوسطاً `65%` آؤٹ پٹ بچت، `22-87%` آؤٹ پٹ رینج، اور `~46%` اِن پٹ کمپریشن ٹول رپورٹ کرتا ہے۔

RTK موڈ **[RTK AI](https://github.com/rtk-ai)** کے **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** سے متاثر ہے — یہ ٹرمینل، بلڈ، ٹیسٹ، git، اور ٹول آؤٹ پٹ فلٹرنگ کے لیے اعلیٰ کارکردگی والا کمانڈ آؤٹ پٹ کمپریشن پروجیکٹ ہے۔ RTK `60-90%` بچت رپورٹ کرتا ہے، جبکہ اس کے README کے نمونہ سیشن میں `~80%` بچت دکھائی گئی ہے۔

---

## جدید کمپریشن سسٹمز

7 معیاری موڈز کے علاوہ، OmniRoute میں کئی جدید کمپریشن سسٹمز شامل ہیں جو سیاق و سباق کی بنیاد پر خودکار طور پر کام کرتے ہیں۔

### کیش سے باخبر کمپریشن

کچھ فراہم کنندگان (جیسے prompt caching کے ساتھ Anthropic) **prompt caching** کو سپورٹ کرتے ہیں، جس سے وہ لاگت اور تاخیر کم کرنے کے لیے prompt کے کچھ حصوں کو کیش کر سکتے ہیں۔ جب caching فعال ہو، تو جارحانہ کمپریشن دراصل کارکردگی کو **نقصان** پہنچا سکتی ہے کیونکہ یہ کیش شدہ tokens کو تبدیل کرکے cache کو غیر مؤثر بنا دیتی ہے۔

`cachingAware.ts` ماڈیول **caching context کا پتا لگا کر** اور اس کے مطابق **کمپریشن کی حکمتِ عملی کو ایڈجسٹ کرکے** یہ مسئلہ حل کرتا ہے۔

#### یہ کیسے کام کرتا ہے

1. **caching context کا پتا لگانا** — درخواست کی body میں `cache_control` markers تلاش کرتا ہے
2. **caching providers کی شناخت** — جانچتا ہے کہ آیا ہدف provider caching کو سپورٹ کرتا ہے
3. **حکمتِ عملی کو ایڈجسٹ کرنا** — caching providers کے لیے `aggressive`/`ultra` کو گھٹا کر `standard` کر دیتا ہے
4. **system prompt کو چھوڑنا** — system prompts عموماً کیش ہوتے ہیں، اس لیے انہیں compress نہیں کیا جاتا
5. **قطعی transformations استعمال کرنا** — صرف وہ transformations استعمال کرتا ہے جو مستقل output پیدا کریں

#### کوڈ کی مثال

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← کیش marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### کب استعمال کریں

کیش سے باخبر کمپریشن **ہمیشہ فعال** رہتی ہے — کسی configuration کی ضرورت نہیں۔ یہ صرف اس وقت کام شروع کرتی ہے جب:

- درخواست میں `cache_control` markers موجود ہوں
- ہدف provider، prompt caching کو سپورٹ کرتا ہو (Anthropic، OpenAI وغیرہ)

### تدریجی فرسودگی

طویل گفتگوؤں میں پیغامات کے بہت سے turns جمع ہو جاتے ہیں، لیکن پرانے turns کی مطابقت کم ہوتی جاتی ہے۔ `progressiveAging.ts` ماڈیول **turn کے فاصلے کے مطابق پیغامات کی تفصیل کم کرتا ہے**:

- **حالیہ turns (0-3)**: من و عن رکھے جاتے ہیں (مکمل تفصیل)
- **درمیانی turns (4-8)**: ہلکی کمپریشن (whitespace اور formatting کی صفائی)
- **پرانے turns (9+)**: Caveman کمپریشن (غیر ضروری الفاظ کا اخراج، خلاصہ سازی)
- **بہت پرانے turns (20+)**: بہت زیادہ خلاصہ کیا جاتا ہے یا خارج کر دیا جاتا ہے

#### کوڈ کی مثال

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... مزید 50 turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // پہلے 3 turns: من و عن
  light: 8, // Turns 4-8: ہلکی کمپریشن
  moderate: 20, // Turns 9-20: caveman کمپریشن
  // Turns 21+: بھرپور خلاصہ سازی
});

// saved = محفوظ کیے گئے tokens کی تعداد
```

#### کب استعمال کریں

تدریجی فرسودگی `aggressive` اور `ultra` موڈز کے لیے **ہمیشہ فعال** رہتی ہے۔ یہ خصوصاً ان صورتوں میں مؤثر ہے:

- طویل دورانیے کے coding sessions
- کئی دنوں پر محیط گفتگوئیں
- بہت سی tool calls والے agentic workflows

### Caveman آؤٹ پٹ موڈ

`outputMode.ts` ماڈیول **system prompt instructions** شامل کرتا ہے تاکہ model خود مختصر اور جامع output تیار کرے (یعنی "caveman" طرز میں)۔

#### یہ کیسے کام کرتا ہے

input کو compress کرنے کے بجائے، یہ موڈ اس طرح کا system prompt شامل کرتا ہے:

> "کم سے کم الفاظ میں جواب دیں۔ رسمی خوش اخلاقی سے گریز کریں۔ مختصر جملے استعمال کریں۔"

یہ خصوصاً ان صورتوں میں بہت اچھا کام کرتا ہے:

- کوڈ بنانا (زیادہ مختصر output = کم tokens)
- فوری سوال و جواب (تفصیلی وضاحتوں کی ضرورت نہیں)
- بیچ پروسیسنگ (throughput کو زیادہ سے زیادہ کرنا)

#### کب استعمال کریں

Caveman آؤٹ پٹ موڈ **اختیاری** ہے — اسے combo config کے ذریعے مقرر کریں:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### آؤٹ پٹ اسلوب (کیٹلاگ)

اوپر بیان کردہ Caveman آؤٹ پٹ موڈ **قدیم واحد اسلوب والا طریقہ** ہے۔ Phase 4 نے اسے قابلِ ترکیب آؤٹ پٹ اسلوب کے ایک کیٹلاگ کی شکل دے دی: `open-sse/services/compression/outputStyles/catalog.ts` میں `OUTPUT_STYLE_CATALOG`۔ ہر اسلوب ایک system-prompt instruction ہے جو model کو خود زیادہ کم لاگت والا output تیار کرنے کی ہدایت دیتا ہے؛ متعدد اسلوب ایک ساتھ فعال کیے جا سکتے ہیں اور انہیں کیٹلاگ کی ترتیب کے مطابق شامل کیا جاتا ہے۔

| انداز                       | `id`          | یہ کیا کرتا ہے                                                                                                                                                                                          | ہدایات کی زبانیں                                                         |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| مختصر نثر                   | `terse-prose` | غیر ضروری الفاظ/حروفِ تعریف/تذبذب نکال دیتا ہے؛ تکنیکی مفہوم بعینہٖ برقرار رکھتا ہے۔ وہی متن جو سابقہ caveman آؤٹ پٹ موڈ میں تھا (حوالہ دیا گیا ہے، دوبارہ نہیں لکھا گیا)۔                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                            |
| کم کوڈ                      | `less-code`   | YAGNI درجہ بندی: کام کرنے والی سب سے چھوٹی تبدیلی، بلا درخواست تجریدات نہیں۔                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                            |
| پونی ٹیل (سست سینئر ڈویلپر) | `ponytail`    | "بہترین کوڈ وہ ہے جو کبھی لکھا ہی نہ جائے": دوبارہ استعمال > دوبارہ لکھنا، بنیادی وجہ > علامت، کام کرنے والا مختصر ترین diff۔                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                            |
| مجھے ADHD ہے (عمل پہلے)     | `i-have-adhd` | عمل پہلے (نثر سے پہلے کمانڈ/پاتھ/اقتباس)، نمبر وار محدود مراحل، اگلا صرف ایک ٹھوس قدم، کوئی تمہید/خلاصہ/اختتامی کلمات نہیں۔ [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) سے ماخوذ۔ | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                            |
| مختصر CJK (文言)            | `terse-cjk`   | کلاسیکی چینی کا انتہائی مختصر انداز۔                                                                                                                                                                    | zh (locale کی پابندی: صرف اس وقت پیش کیا جاتا ہے جب طے شدہ زبان `zh` ہو) |

ہر انداز شدت کی تین سطحوں — `lite`، `full`، `ultra` — کے ساتھ آتا ہے، اور ہر سطح
مشترکہ حدود کی شق پر ختم ہوتی ہے، جو کوڈ بلاکس، فائل پاتھز، کمانڈز،
خرابی کے اسٹرنگز، URLs اور identifiers کو بعینہٖ برقرار رکھتی ہے۔

#### انجیکشن کیسے کام کرتا ہے

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) انتخاب کو
کیٹلاگ کے مطابق طے کرتا ہے (نامعلوم ids اور locale سے غیر موافق انداز
خارج کر دیے جاتے ہیں، کبھی خرابی نہیں بنتے)، منتخب ہدایات کو کیٹلاگ کی ترتیب میں جوڑتا ہے،
حدود کی شق **صرف ایک بار** شامل کرتا ہے، اور بلاک کو ایک idempotency
نشان (`[OmniRoute Output Styles]`) سے شروع کرتا ہے، لہٰذا دوبارہ اطلاق بے اثر رہتا ہے۔ جب طے شدہ
زبان (ذیل میں زبان کا انتخاب دیکھیں) کا ترجمہ موجود ہو، تو انگریزی کے بجائے مقامی ہدایت
انجیکٹ کی جاتی ہے۔

`messages` والے body پر، مواد کو نظر انداز کرنے کا طریقہ (`shouldBypassCavemanOutputMode()`،
`open-sse/services/compression/outputMode.ts` میں) آخری تین پیغامات کی جانچ کرتا ہے اور
جب وہ اس کے سیکیورٹی، ناقابلِ واپسی عمل، وضاحت طلب، یا ترتیب کے لحاظ سے حساس کلیدی الفاظ سے میل کھائیں
تو پوری turn کے لیے انداز چھوڑ دیتا ہے۔ بائی پاس dashboard کے
**خودکار وضاحت بائی پاس** toggle (`cavemanOutputMode.autoClarity`) کی موجودہ ترتیب کے مطابق چلتا ہے۔

جب بائی پاس turn کو گزرنے دیتا ہے، تو `placeSystemInstruction()` (اسی فائل میں)، جو
کبھی نیا `messages[0]` نہیں بناتا، بلاک کو ان میں سے پہلی دستیاب جگہ پر رکھتا ہے:

1. آغاز میں موجود string content والا system message: بلاک اس کے متن کے بعد شامل کیا جاتا ہے۔
2. اعلیٰ سطح کا `system` field: بلاک کسی string کے متن کے بعد شامل کیا جاتا ہے، یا
   content-block array میں نئے text block کے طور پر شامل کیا جاتا ہے۔
3. بعد میں آنے والا پہلا string content والا system message: بلاک اس کے
   متن کے بعد شامل کیا جاتا ہے۔
4. مذکورہ بالا میں سے کوئی نہیں: بلاک `messages` کے آخر میں ایک نئے system message میں شامل ہوتا ہے۔

`messages` کے بغیر body پر، بلاک string قسم کے `instructions` field کے ساتھ شامل کیا جاتا ہے،
یا جب body میں `input` (ایک string یا array) ہو تو یہ `instructions` بن جاتا ہے۔ وہ body
جس میں نہ `instructions` ہو نہ `input`، اسے `no_messages` کے طور پر چھوڑ دیا جاتا ہے۔

#### فعال کرنے کا طریقہ

dashboard میں: **سیاق → ترتیبات → کمپریشن** — ہر انداز کے لیے ایک قطار، جس میں
on/off toggle اور level selector ہوتا ہے۔ پروگرام کے ذریعے، compression config انتخاب کو یوں محفوظ
کرتا ہے:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

پسماندہ مطابقت: سابقہ `outputMode: "caveman"` combo setting اب بھی کام کرتی ہے اور
`terse-prose` سے نقش ہوتی ہے، جو ہر سابقہ زبان میں پرانے انجیکشن سے بائٹ بہ بائٹ یکساں ہے۔

زبان کا انتخاب: `languageConfig.enabled` فعال ہونے پر، `autoDetect` تازہ ترین
user message کی زبان منتخب کرتا ہے (وہی detector جو input engines استعمال کرتے ہیں)؛
`autoDetect` کو بند کرنے سے `defaultLanguage` مقرر ہو جاتی ہے۔ بند → انگریزی۔

انداز × زبان matrix کو
`tests/unit/compression/output-styles-i18n-matrix.test.ts` کے ذریعے مقرر کیا گیا ہے: کوئی نیا انداز
کم از کم pt-BR ترجمے (یا واضح طور پر ٹریک کی گئی استثنا) کے بغیر جاری نہیں ہو سکتا، اور
کوئی موجودہ انداز خاموشی سے کسی locale سے محروم نہیں ہو سکتا۔ انداز شامل کرنے کے لیے
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) دیکھیں۔

### ٹول نتیجے کی کمپریشن

`toolResultCompressor.ts` module ٹول نتائج (function calls، agent outputs، search results وغیرہ)
کے لیے **5 مخصوص compression strategies** فراہم کرتا ہے:

1. **تلاش کے نتائج کی کمپریشن** — فالتو نتائج ہٹاتی ہے، سرفہرست-N برقرار رکھتی ہے
2. **فائل پڑھنے کی کمپریشن** — بڑی فائلوں کو مختصر کرتی ہے، headers/imports محفوظ رکھتی ہے
3. **کوڈ چلانے کی کمپریشن** — صرف ضروری stdout/stderr برقرار رکھتی ہے
4. **ڈیٹابیس query کمپریشن** — قطاریں محدود کرتی ہے، تفصیلی metadata ہٹاتی ہے
5. **API response کمپریشن** — null fields ہٹاتی ہے، arrays کو مختصر کرتی ہے

#### کب استعمال کریں

جب tool calls موجود ہوں تو tool result compression **ہمیشہ فعال** ہوتی ہے۔ کسی
configuration کی ضرورت نہیں۔

### Stacked Pipeline

stacked mode میں **متعدد engines کو یکے بعد دیگرے** چلایا جاتا ہے — عموماً پہلے RTK
(tool output پر 60-90% بچت)، پھر Caveman (باقی متن پر مزید 30% بچت)۔
اس طرح **مجموعی طور پر 78-95% بچت** حاصل ہوتی ہے۔

#### یہ کیسے کام کرتا ہے

```
Input (1000 tokens)
  → RTK (command سے آگاہ filter) → 200 tokens
    → Caveman (غیر ضروری متن کا اخراج) → 140 tokens
  → Output (140 tokens، 86% بچت)
```

#### کب استعمال کریں

stacked mode کو درج ذیل صورتوں میں استعمال کریں:

- tools پر زیادہ انحصار کرنے والے workflows (agentic coding، تحقیق)
- لاگت کے لحاظ سے حساس batch processing
- جب آپ کو tokens کی زیادہ سے زیادہ بچت درکار ہو

combo کے ذریعے configure کریں:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## کمپریشن کومبو اوور رائیڈز

آپ مختلف استعمالی صورتوں کے لیے رویے کو بہتر بنانے کی خاطر عالمی کمپریشن موڈ کو **ہر کومبو کے لیے** اوور رائیڈ کر سکتے ہیں:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

یہ درج ذیل کے لیے مفید ہے:

- **کوڈنگ کومبوز**: طویل سیشنز کے لیے `aggressive` موڈ استعمال کریں
- **فوری سوال و جواب کے کومبوز**: تیز جوابات کے لیے `lite` موڈ استعمال کریں
- **ٹول پر مبنی کومبوز**: زیادہ سے زیادہ بچت کے لیے `stacked` موڈ استعمال کریں
- **پروڈکشن کومبوز**: کیشنگ فراہم کنندگان کے لیے `cache-aware` موڈ استعمال کریں

---

## مزید دیکھیں

- [انوائرنمنٹ کنفیگ](../reference/ENVIRONMENT.md) — کمپریشن کے انوائرنمنٹ ویری ایبلز
- [آرکیٹیکچر گائیڈ](../architecture/ARCHITECTURE.md) — کمپریشن پائپ لائن کے اندرونی اجزا
- [صارف گائیڈ](../guides/USER_GUIDE.md) — کمپریشن کے ساتھ شروعات
- [RTK کمپریشن](./RTK_COMPRESSION.md) — RTK فلٹرز، ٹرسٹ ماڈل، ویریفائی گیٹ، خام آؤٹ پٹ کی بازیابی
- [کمپریشن انجنز](./COMPRESSION_ENGINES.md) — Caveman، RTK، اسٹیکڈ، APIs، MCP، ڈیش بورڈ
- [کمپریشن رولز فارمیٹ](./COMPRESSION_RULES_FORMAT.md) — JSON رول پیک فارمیٹ
- [کمپریشن لینگویج پیکس](./COMPRESSION_LANGUAGE_PACKS.md) — زبان کے لحاظ سے مخصوص Caveman قواعد
