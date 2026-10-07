# 🗜️ Prompt Compression Guide — OmniRoute (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> اہل سیاق پر خودکار طور پر 15-95% بچت کریں۔ مختصر جائزے کے لیے، [README کا Compression سیکشن](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) دیکھیں۔

## جائزہ

OmniRoute ایک ماڈیولر پرامپٹ کمپریشن پائپ لائن نافذ کرتا ہے جو درخواستوں کے اپ اسٹریم فراہم کنندگان تک پہنچنے سے **پہلے ہی فعال طور پر** چلتی ہے۔ اس کا مطلب ہے کہ آپ کے ٹوکنز کی بچت شفاف انداز میں ہوتی ہے — آپ کے ورک فلو میں کسی تبدیلی کی ضرورت نہیں۔

```
کلائنٹ کی درخواست
  → کمپریشن حکمتِ عملی کا انتخاب کنندہ
    → کومبو اوور رائیڈ؟ → کومبو سیٹنگ استعمال کریں
    → خودکار ٹرگر کی حد؟ → خودکار موڈ استعمال کریں
    → ڈیفالٹ موڈ؟ → عالمی سیٹنگ استعمال کریں
    → بند؟ → کمپریشن چھوڑ دیں
  → منتخب کردہ کمپریشن موڈ
    → بند: کوئی کمپریشن نہیں
    → ہلکا: محفوظ وائٹ اسپیس/فارمیٹنگ کی صفائی (~15%)
    → معیاری: Caveman طرز میں غیر ضروری الفاظ کا اخراج (~30%)
    → جارحانہ: ہسٹری ایجنگ + خلاصہ سازی (~50%)
    → الٹرا: ہیورسٹک چھانٹی + کوڈ بلاکس کو مختصر کرنا (~75%)
    → RTK: کمانڈ سے آگاہ ٹرمینل/ٹول آؤٹ پٹ فلٹرنگ (اپ اسٹریم حد 60-90%)
    → اسٹیکڈ: ترتیب وار ملٹی انجن پائپ لائن، عموماً پہلے RTK پھر Caveman (اہل حد 78-95%)
  → کمپریس شدہ درخواست → فراہم کنندہ
```

---

## کمپریشن موڈز

### بند

کوئی کمپریشن لاگو نہیں ہوتی۔ تمام پیغامات بغیر تبدیلی کے گزر جاتے ہیں۔

### ہلکا موڈ (~15% بچت، <1ms تاخیر)

سب سے محفوظ موڈ — معنوی طور پر کوئی تبدیلی نہیں، صرف فارمیٹنگ کی صفائی:

| تکنیک                    | وضاحت                                            |
| ------------------------ | ------------------------------------------------ |
| `collapseWhitespace`     | مسلسل خالی سطروں اور اختتامی اسپیسز کو یکجا کرنا |
| `dedupSystemPrompt`      | نقل شدہ سسٹم پیغامات ہٹانا                       |
| `compressToolResults`    | طویل ٹول/فنکشن آؤٹ پٹس کو کمپریس کرنا            |
| `removeRedundantContent` | دہرائی گئی ہدایات ہٹانا                          |
| `replaceImageUrls`       | base64 امیج ڈیٹا URIs کو مختصر کرنا              |

**اس کے لیے بہترین:** ہمیشہ فعال استعمال، تحفظ کے لحاظ سے حساس ورک فلوز۔

### معیاری موڈ (~30% بچت)

[Caveman](https://github.com/JuliusBrussee/caveman) سے متاثر — مفہوم برقرار رکھتے ہوئے غیر ضروری الفاظ اور طویل عبارتیں ہٹاتا ہے:

- غیر ضروری الفاظ ہٹاتا ہے ("براہِ کرم"، "میرے خیال میں"، "بنیادی طور پر"، "درحقیقت")
- طویل فقروں کو مختصر کرتا ہے ("کرنے کے لیے" → "کو"، "کے نتیجے میں" → "کیونکہ")
- مؤدبانہ تذبذب والی عبارتیں ہٹاتا ہے ("کیا آپ کو اعتراض ہوگا..."، "اگر آپ ممکنہ طور پر کر سکیں...")
- کوڈنگ پرامپٹس کے لیے موزوں بنائے گئے 30+ regex قواعد

**اس کے لیے بہترین:** روزمرہ کوڈنگ ورک فلوز، لاگت کا خیال رکھنے والی ٹیمیں۔

### جارحانہ موڈ (~50% بچت)

طویل سیشنز کے لیے ذہین ہسٹری مینجمنٹ:

- **پیغامات کی ایجنگ** — پرانے پیغامات بتدریج زیادہ کمپریس ہوتے جاتے ہیں
- **ٹول نتائج کی کمپریشن** — طویل ٹول آؤٹ پٹس کو مختصر یا حذف کیا جاتا ہے (ابتدائی/آخری سطور،
  مماثل سطور کی فلٹرنگ، JSON کلیدوں کی اختصار کاری)
- **ساختی سالمیت کے حفاظتی اقدامات** — یقینی بناتے ہیں کہ `tool_use` + `tool_result` کے جوڑے ہم آہنگ رہیں
- **کانٹیکسٹ ونڈو سے آگاہی** — ہر ماڈل کی ٹوکن حدود کا لحاظ رکھتی ہے

**اس کے لیے بہترین:** طویل ڈیبگنگ سیشنز، بڑے کوڈ بیسز۔

### الٹرا موڈ (~75% بچت)

ٹوکن کے لحاظ سے نازک حالات کے لیے زیادہ سے زیادہ کمپریشن:

- **ہیورسٹک چھانٹی** — نثری متن کے ٹوکنز کی اسکور پر مبنی چھانٹی
- **ساخت کا تحفظ** — فینس کیے گئے کوڈ بلاکس، اِن لائن کوڈ، URLs اور شناخت کاروں کو
  ٹومب اسٹون کرکے بعینہٖ دوبارہ جوڑا جاتا ہے، انہیں کبھی نہیں چھانٹا جاتا
- **اختیاری SLM درجہ** — کنفیگر ہونے پر ایک چھوٹا مقامی ماڈل چھانٹی کو مزید بہتر بنا سکتا ہے
- جارحانہ موڈ سے آزاد: یہ پیغامات کی ایجنگ، ٹول نتائج کی کمپریشن
  یا فال بیک خلاصہ ساز نہیں چلاتا (صرف SLM درجے کی ناکامی فال بیک مرحلے کو
  جارحانہ موڈ کے ذریعے چلا سکتی ہے)

**اس کے لیے بہترین:** جب آپ بار بار کانٹیکسٹ کی حدود تک پہنچ رہے ہوں۔

### RTK موڈ (اپ اسٹریم حد 60-90%)

RTK موڈ کو کوڈنگ ایجنٹ سیشنز میں ظاہر ہونے والے طویل ٹول آؤٹ پٹس کے لیے بہتر بنایا گیا ہے:

- `git status`، `git diff`، `git log`، ٹیسٹ رنرز،
  TypeScript/Vite/Webpack بلڈز، ESLint/Biome/Prettier، npm آڈٹ/انسٹالیشنز، Docker لاگز، انفرا
  آؤٹ پٹ، اور عمومی شیل آؤٹ پٹ جیسی کمانڈ/آؤٹ پٹ کلاسز کا پتہ لگاتا ہے
- `open-sse/services/compression/engines/rtk/filters/` سے JSON فلٹر پیکس لاگو کرتا ہے
- پروجیکٹ یا عالمی `filters.toml` فائلوں سے RTK TOML schema v1 فلٹرز درآمد کرتا ہے، اِن لائن ٹیسٹ
  کی توثیق اور پروجیکٹ فائلوں کے لیے اعتماد پر مبنی پابندی کے ساتھ
- اِن لائن تصدیقی نمونوں کے ساتھ 55 پہلے سے شامل فلٹرز فراہم کرتا ہے
- ANSI کنٹرول سلسلے، پروگریس بارز، دہرائی گئی سطور، اور غیر قابلِ عمل شور ہٹاتا ہے
- ناکامیاں، ایررز، وارننگز، تبدیل شدہ فائلیں، خلاصے، اور طویل آؤٹ پٹ کا آخری حصہ محفوظ رکھتا ہے
- اعتماد پر مبنی پروجیکٹ فلٹرز، عالمی فلٹرز، اور اختیاری طور پر رازداری کے لیے ترمیم شدہ خام آؤٹ پٹ کی بازیابی کی معاونت کرتا ہے

**اس کے لیے بہترین:** شیل، بلڈ، ٹیسٹ، git، grep، اور فائل آؤٹ پٹ ٹرانسکرپٹس والے ایجنٹ سیشنز۔

### اسٹیکڈ موڈ (اہل حد 78-95%)

اسٹیکڈ موڈ متعدد کمپریشن انجنز کو ایک متعین ترتیب میں چلاتا ہے۔ ڈیفالٹ پائپ لائن یہ ہے:

```txt
RTK -> Caveman
```

یہ ترتیب پہلے ٹرمینل/ٹول آؤٹ پٹ کو مختصر رکھتی ہے، پھر باقی قدرتی زبان کے پرامپٹ پر Caveman کی معنوی اختصار کاری
لاگو کرتی ہے۔ اسٹیکڈ پائپ لائنز کو عالمی طور پر یا روٹنگ کومبوز کو تفویض کردہ
کمپریشن کومبوز کے ذریعے کنفیگر کیا جا سکتا ہے۔

**اس کے لیے بہترین:** بڑے ٹول لاگز کے ساتھ انسانی ہدایات یا اسسٹنٹ خلاصوں پر مشتمل مخلوط سیاق۔

---

## اپ اسٹریم بچت کا حساب

OmniRoute دو ذرائع سے حاصل ہونے والی کمپریشن کی بچت کو دستاویزی شکل دیتا ہے: اپ اسٹریم پروجیکٹ بینچ مارکس اور
OmniRoute کے اپنے انجنوں کا امتزاج۔

| ماخذ    | یہاں استعمال کیا گیا اپ اسٹریم README کا عدد                                                           |
| ------- | ------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` کم آؤٹ پٹ ٹوکنز، بینچ مارک کی اوسط آؤٹ پٹ بچت `65%`، حد `22-87%`، اور `~46%` اِن پٹ کمپریشن ٹول |
| RTK     | کمانڈ آؤٹ پٹ میں `60-90%` بچت؛ نمونہ سیشن میں `~118,000 -> ~23,900` ٹوکنز، یا `79.7%` بچت (`~80%`)     |

ایک دوسرے سے متجاوز ٹول/کانٹیکسٹ پے لوڈز کے لیے، ڈیفالٹ OmniRoute کومبو انجنوں کو اس ترتیب میں استعمال کرتا ہے:

```txt
RTK -> Caveman
```

مشترکہ بچت ضربی ہوتی ہے، جمعی نہیں:

```txt
combined = 1 - (1 - RTK بچت) * (1 - Caveman اِن پٹ بچت)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

یہ `78-95%` عدد اس وقت لاگو ہوتا ہے جب RTK اور Caveman دونوں ایک ہی اِن پٹ/کانٹیکسٹ پے لوڈ کو کم کر سکیں۔
Caveman کا رسپانس آؤٹ پٹ موڈ الگ ہے: فعال ہونے پر، Caveman کی اپنی آؤٹ پٹ بچت استعمال کریں (اوسط `65%`،
نمایاں عدد `~75%`، حد `22-87%`)۔ بلنگ کی مجموعی بچت آپ کے پرامپٹ/آؤٹ پٹ کے تناسب پر منحصر ہے۔

### دراصل "اہل" ہونے کا کیا مطلب ہے

15-95% کی نمایاں حد حقیقی ہے، لیکن یہ صرف **فالتو یا ضرورت سے زیادہ تفصیلی** مواد پر لاگو ہوتی ہے — بار بار دہرائی گئی
خرابی کی سطریں، ایک ایسا بلڈ لاگ جو ایک ہی انتباہ کو بار بار دکھاتا ہو، یا ضرورت سے بڑا `grep`/فائل ریڈ ڈمپ۔ اس کا
یہ مطلب **نہیں** کہ ہر درخواست میں اتنی بچت ہوگی۔

تجرباتی طور پر تصدیق شدہ (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 یکساں
خرابی کی سطروں پر مشتمل Anthropic ساخت کے `tool_result` بلاک پر چلائے گئے `stacked` (RTK + Caveman) عمل نے
**95.93% ٹوکن بچت / 96.26% کریکٹر بچت** فراہم کی — جو بالکل مشتہر کردہ
حد میں ہے۔ لیکن اسی پائپ لائن کو عام، غیر تکراری ٹول آؤٹ پٹ (ایک صاف `grep` میچ فہرست،
مختصر فائل ریڈ، عام مکالماتی متن) پر چلانے سے درست طور پر **تقریباً صفر بچت** حاصل ہوتی ہے، کیونکہ
ہٹانے کے لیے کوئی تکراری مواد موجود نہیں ہوتا اور `validateCompression()` (`validation.ts`) ایسی
دوبارہ تحریر بھیجنے سے انکار کر دیتا ہے جو کوڈ بلاکس، URLs، سرخیوں، ورژنز، یا تمام بڑے حروف والے مستقل شناخت کنندگان کو حذف یا تبدیل کر دے۔

یہ متوقع اور محفوظ طرزِ عمل ہے، کوئی بگ نہیں: ایک کوڈنگ سیشن جو زیادہ تر صاف فائلوں کو پڑھتا یا ان میں grep کرتا ہے،
مکمل طور پر فعال کمپریشن کے باوجود معمولی مجموعی بچت دکھائے گا، جبکہ ناکام ہونے والے
لوپ یا بہت زیادہ آؤٹ پٹ دینے والے لنٹر کا سامنا کرنے والا سیشن اس ٹریفک پر مکمل 78-95% حد کی بچت دیکھے گا۔ کسی ایک سیشن کی
کم مجموعی بچت کی شرح کو کمپریشن کی غلط کنفیگریشن کا ثبوت نہ سمجھیں — پہلے یہ جانچیں کہ آیا
بنیادی ٹول آؤٹ پٹ واقعی تکراری تھا۔

---

## ٹوکن بچت کی بصری نمائندگی

```
کمپریشن کے بغیر:       LLM کو 47K ٹوکنز بھیجے گئے
Lite کے ساتھ:          40K ٹوکنز بھیجے گئے          (15% بچت — محفوظ، ہمیشہ فعال)
Standard کے ساتھ:      33K ٹوکنز بھیجے گئے          (30% بچت — caveman طرزِ گفتگو کے قواعد)
Aggressive کے ساتھ:    24K ٹوکنز بھیجے گئے          (50% بچت — پرانے مواد کی تخفیف + خلاصہ سازی)
Ultra کے ساتھ:         12K ٹوکنز بھیجے گئے          (75% بچت — تخمینی چھانٹی)
RTK کے ساتھ:           19K-5K ٹوکنز بھیجے گئے       (کمانڈ/ٹول آؤٹ پٹ پر 60-90% بچت)
Stacked کے ساتھ:       10K-2.5K ٹوکنز بھیجے گئے     (اہل RTK+Caveman مواد پر 78-95% حد)
```

---

## کنفیگریشن

### ڈیش بورڈ

`ڈیش بورڈ → کانٹیکسٹ اور کیش` پر جائیں:

- **Caveman** — موڈ کا انتخاب، لینگویج پیکس، پیش منظر، اور عالمی ڈیفالٹس
- **RTK** — کمانڈ فلٹر کا پیش منظر، RTK حفاظتی ترتیبات، اور فلٹر کیٹلاگ
- **کمپریشن کومبوز** — روٹنگ کومبوز کو تفویض کردہ نام والے انجن پائپ لائنز
- **آٹو ٹریگر تھریش ہولڈ** — ٹوکنز کی تعداد تھریش ہولڈ سے تجاوز کرنے پر خودکار طور پر کمپریشن فعال کریں

### فی کومبو اوور رائیڈ

`ڈیش بورڈ → کانٹیکسٹ اور کیش → کمپریشن کومبوز` میں، کسی روٹنگ کومبو کو ایک کمپریشن کومبو تفویض کریں:

```txt
کومبو: "free-tier-fallback"
  کمپریشن کومبو: "coding-agent-stack"
  پائپ لائن: RTK -> Caveman
  اہداف:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

یہ آپ کو مفت/کوڈنگ فراہم کنندگان پر اسٹیکڈ کمپریشن استعمال کرنے کی سہولت دیتا ہے، جبکہ بامعاوضہ
سبسکرپشنز پر لائٹ موڈ برقرار رہتا ہے۔

یہ "فی کومبو اوور رائیڈ" تفویض، **روٹنگ کومبو کمپریشن موڈ** اوور رائیڈ
(Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — فیلڈ کا اسکیما
`rtk`، `stacked` اور `omniglyph` کو بھی قبول کرتا ہے) سے مختلف کنٹرول ہے — وہ اوور رائیڈ کسی نام والے
کمپریشن کومبو پائپ لائن کا انتخاب نہیں کرتا؛ وہ صرف `resolveCompressionPlan` کے زیرِ استعمال
`compressionMode` فیلڈ متعین کرتا ہے۔ اسے کومبو کارڈ (`ڈیش بورڈ → کومبوز`) پر، یا #6760 سے،
`ڈیش بورڈ → کانٹیکسٹ اور کیش → کمپریشن کومبوز` میں "روٹنگ کو تفویض کریں" کی فہرست کے اندر ہر روٹنگ کومبو کے لیے،
اوپر درج پائپ لائن تفویض کے چیک باکس کے عین ساتھ متعین کیا جا سکتا ہے۔ دونوں سطحیں ایک ہی
`PUT /api/combos/{id}` اینڈ پوائنٹ کے ذریعے برقرار رہتی ہیں۔

### فی درخواست اوور رائیڈ

کسی ایک درخواست کے لیے کمپریشن پلان کو اوور رائیڈ کرنے کی خاطر `x-omniroute-compression` درخواست ہیڈر
بھیجیں۔ اسے سب سے زیادہ ترجیح حاصل ہے — یہ روٹنگ کومبو اوور رائیڈ، فعال پروفائل،
آٹو ٹریگر، اور پینل ڈیفالٹ پر فوقیت رکھتا ہے۔ نامعلوم اقدار نظر انداز کر دی جاتی ہیں (درخواست کبھی مسترد نہیں کی جاتی)، اور
عالمی ماسٹر سوئچ بدستور ہر چیز کو کنٹرول کرتا ہے: جب کمپریشن عالمی سطح پر بند ہو تو ہیڈر اسے
فعال نہیں کر سکتا۔ اقدار:

| قدر           | اثر                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `off`         | اس درخواست کے لیے کوئی کمپریشن نہیں۔                                                                         |
| `default`     | پینل سے اخذ کردہ ڈیفالٹ پروفائل (فعال پروفائل کو نظر انداز کرتا ہے)۔ لاسّی انجن بند رہتے ہیں۔                |
| `safe`        | ہیڈر حذف کرنے جیسا ہی: صرف ڈی ڈپلیکیشن اور وائٹ اسپیس فولڈنگ۔                                                |
| `allow-lossy` | اس درخواست کا آپریٹر پلان برقرار رکھیں، جس میں خلاصے، مطابقت کے فلٹرز، اور اسلوب کی باز تحریر شامل ہیں۔      |
| `engine:<id>` | فعال ہونے کی صورت میں ایک انجن، مثلاً `engine:rtk`۔ یہ اس انجن کے لیے فی درخواست آپٹ اِن ہے۔                 |
| `<combo>`     | ایک نام والا کومبو، جسے پہلے نام (حروف کی بڑی یا چھوٹی صورت سے قطع نظر)، پھر id کی بنیاد پر میچ کیا جاتا ہے۔ |

`allow-lossy`، `engine:<id>`، یا کسی نام والے کومبو کے بغیر، لاسّی انجنز لاگو نہیں کیے جاتے۔
کمپریشن فعال ہونے کی صورت میں درخواست پر پھر بھی سیشن ڈی ڈپلیکیشن اور وائٹ اسپیس فولڈنگ لاگو ہوتی ہے۔

لاگو شدہ پلان کو `X-OmniRoute-Compression: <mode>; source=<source>` رسپانس
ہیڈر میں واپس بھیجا جاتا ہے، جہاں `<source>`، `request-header`، `routing-override`، `active-profile`،
`auto-trigger`، `default`، یا `off` میں سے ایک ہوتا ہے۔

### API

```bash
# کمپریشن کی ترتیبات حاصل کریں
curl http://localhost:20128/api/settings/compression

# کمپریشن کی ترتیبات اپ ڈیٹ کریں
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# کسی مخصوص RTK/stacked پے لوڈ کا پیش منظر دیکھیں
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK فلٹر پیکس کی فہرست حاصل کریں
curl http://localhost:20128/api/context/rtk/filters

# اختیاری کمانڈ میٹا ڈیٹا کے ساتھ براہِ راست RTK ٹیسٹ کریں
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## کیا محفوظ رہتا ہے

کمپریشن انجن **ہمیشہ محفوظ رکھتا ہے:**

- ✅ کوڈ بلاکس (fenced اور inline)
- ✅ URLs اور فائل پاتھس
- ✅ JSON اسٹرکچرز اور ساختہ ڈیٹا
- ✅ identifiers اور محفوظ تکنیکی tokens
- ✅ ریاضیاتی expressions
- ✅ ٹول/function call definitions
- ✅ سسٹم prompts (lite موڈ میں)

RTK کی raw-output recovery کسی بھی چیز کو محفوظ کرنے سے پہلے عام API keys، bearer tokens، Slack tokens، AWS access keys، passwords، tokens، اور secrets کو مخفی کر دیتی ہے۔

---

## کمپریشن کے اعداد و شمار

ہر کمپریس شدہ درخواست کے اعداد و شمار سرور logs میں شامل ہوتے ہیں:

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

## مراحل کا روڈ میپ

| مرحلہ    | موڈز                                                                                                                                          | حیثیت              |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| مرحلہ 1  | Off, Lite                                                                                                                                     | ✅ جاری کر دیا گیا |
| مرحلہ 2  | Standard, Aggressive, Ultra                                                                                                                   | ✅ جاری کر دیا گیا |
| مرحلہ 3  | RTK, Stacked, Compression Combos                                                                                                              | ✅ جاری کر دیا گیا |
| مرحلہ 4  | Output Styles, SLM-tier Ultra، eval harness                                                                                                   | ✅ جاری کر دیا گیا |
| مرحلہ 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` on `PUT /api/settings/compression`) + dashboard mode/policy controls | ✅ جاری کر دیا گیا |

---

## اعترافات

Standard mode کے کمپریشن قواعد **[JuliusBrussee](https://github.com/JuliusBrussee)** کے **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) سے متاثر ہیں — یہ وائرل "جب کم tokens سے کام ہو جاتا ہے تو زیادہ tokens کیوں استعمال کریں" پروجیکٹ ہے۔ Caveman کے مطابق output tokens میں `~75%` کمی، benchmark میں output کی اوسط `65%` بچت، output کی `22-87%` حد، اور input compression کے لیے ایک `~46%` ٹول حاصل ہوتا ہے۔

RTK mode، **[RTK AI](https://github.com/rtk-ai)** کے **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** سے متاثر ہے — یہ terminal، build، test، git، اور tool-output filtering کے لیے اعلیٰ کارکردگی کا command-output compression پروجیکٹ ہے۔ RTK کے مطابق `60-90%` بچت ہوتی ہے، جبکہ اس کے README میں موجود نمونہ session تقریباً `~80%` بچت دکھاتا ہے۔

---

## جدید کمپریشن سسٹمز

اوپر بیان کردہ 7 موڈز کے علاوہ (source، `codex-responses` اور `omniglyph` موڈز بھی قبول کرتا ہے، جن کا احاطہ اس گائیڈ میں نہیں کیا گیا)، ذیل کے حصے ان خصوصیات کا احاطہ کرتے ہیں جو ان موڈز کے اندر یا ان کے ساتھ کام کرتی ہیں: Tool Result Compression اور Progressive Aging، aggressive engine کے مراحل 1 اور 2 ہیں (Aggressive mode اور stacked pipeline کا ایک `aggressive` مرحلہ)، Stacked Pipeline وہ طریقہ ہے جس سے Stacked mode چلتا ہے، Cache-Aware Compression کمپریشن آن ہونے کے دوران caching providers کے لیے `aggressive` اور `ultra` کو `standard` میں downgrade کرتا ہے، جبکہ Caveman Output Mode اور Output Styles اختیاری system-prompt ہدایات ہیں، جو ڈیفالٹ طور پر آف ہوتی ہیں اور درخواست کو کمپریس کرنے کے بجائے model کے output کو شکل دیتی ہیں۔

### Cache-Aware کمپریشن

کچھ providers (جیسے prompt caching کے ساتھ Anthropic) **prompt caching** کی معاونت کرتے ہیں، جس سے وہ لاگت اور latency کم کرنے کے لیے prompt کے کچھ حصوں کو cache کر سکتے ہیں۔ جب caching فعال ہو تو aggressive کمپریشن درحقیقت کارکردگی کو **نقصان** پہنچا سکتا ہے، کیونکہ یہ cached tokens کو تبدیل کر کے cache کو غیر مؤثر بنا دیتا ہے۔

`cachingAware.ts` module، **caching context کا پتا لگا کر** اور اس کے مطابق **کمپریشن حکمتِ عملی کو ایڈجسٹ کر کے** یہ مسئلہ حل کرتا ہے۔

#### یہ کیسے کام کرتا ہے

1. **caching context کا پتا لگانا** — درخواست کی body میں `cache_control` markers تلاش کرتا ہے
2. **caching providers کی شناخت** — جانچتا ہے کہ آیا ہدف provider caching کی معاونت کرتا ہے
3. **حکمتِ عملی کو ایڈجسٹ کرنا** — caching providers کے لیے `aggressive`/`ultra` کو `standard` میں downgrade کرتا ہے
4. **system prompt کو چھوڑ دینا** — system prompts عموماً cached ہوتے ہیں، اس لیے انہیں کمپریس نہ کریں

strategy helper ایک `deterministicOnly` flag بھی واپس کرتا ہے، لیکن plan builder صرف strategy استعمال کرتا ہے — فی الحال downstream میں کوئی بھی اس flag کو نہیں پڑھتا۔

#### کوڈ کی مثال

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### کب استعمال کریں

Cache-aware کمپریشن **ہمیشہ فعال** رہتا ہے — کسی configuration کی ضرورت نہیں۔ جب بھی کمپریشن آن ہو اور ہدف provider، prompt caching (Anthropic، OpenAI وغیرہ) کی معاونت کرے تو یہ خودکار طور پر فعال ہو جاتا ہے؛ واضح `cache_control` markers ضروری نہیں — صرف caching provider ہی downgrade کو متحرک کر دیتا ہے، جبکہ صرف markers کبھی ایسا نہیں کرتے (marker detection، cache telemetry کو ڈیٹا فراہم کرتی ہے، strategy کے فیصلے کو نہیں)۔

### Progressive Aging

طویل گفتگوؤں میں بہت سے message turns جمع ہو جاتے ہیں، لیکن پرانے turns کی مطابقت کم ہوتی جاتی ہے۔ `progressiveAging.ts` module، **turn distance کے لحاظ سے messages کو بتدریج مختصر کرتا ہے** (فاصلہ گفتگو کے اختتام سے ناپا جاتا ہے)۔ جاری کردہ ڈیفالٹس (`verbatim: 2, light: 2, moderate: 3`) کے ساتھ:

- **آخری 2 ٹرنز (فاصلہ ≤ 2)**: بعینہٖ برقرار رکھے جاتے ہیں
- **فاصلہ 3**: کیو مین کمپریشن (غیر ضروری الفاظ ہٹانا)
- **فاصلہ 4+**: اسسٹنٹ کے پیغامات کا خلاصہ بنایا جاتا ہے؛ صارف کے پیغامات کو ان کی پہلی
  سطر تک محدود کیا جاتا ہے، جس کی حد 120 حروف ہے؛ دیگر کرداروں کو چھیڑا نہیں جاتا۔ سسٹم پرامپٹس، پہلے سے ایج کیے گئے
  پیغامات اور صارف کا تازہ ترین پیغام فاصلے سے قطع نظر ہمیشہ بعینہٖ برقرار رکھے جاتے ہیں۔
  کسی چیز کو مکمل طور پر حذف نہیں کیا جاتا، اور فراہم کردہ ڈیفالٹس کے ساتھ `light`
  بینڈ تک پہنچا نہیں جا سکتا (`light`، `verbatim` کے برابر ہے)۔

#### کوڈ کی مثال

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... مزید 50 ٹرنز ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // آخری 3 ٹرنز: بعینہٖ
  light: 8, // فاصلہ <= 8: ہلکی کمپریشن
  moderate: 20, // فاصلہ <= 20: کیو مین کمپریشن
  fullSummary: 5, // ٹائپ کے لیے درکار ہے، بینڈنگ کوڈ اسے نہیں پڑھتا
  // فاصلہ > 20: خلاصہ بنایا جاتا ہے (اسسٹنٹ) / پہلی سطر برقرار رکھی جاتی ہے (صارف)
});

// saved = محفوظ کیے گئے ٹوکنز کی تعداد
```

#### کب استعمال کریں

پروگریسو ایجنگ `aggressive` موڈ کے لیے **ہمیشہ فعال** ہوتی ہے — یہ
`compressAggressive()` کا مرحلہ 2 ہے۔ Ultra موڈ اسے نہیں چلاتا۔ یہ خصوصاً
ان حالات میں مؤثر ہے:

- طویل عرصے تک جاری رہنے والے کوڈنگ سیشنز
- کئی دنوں پر محیط گفتگوئیں
- بہت سی ٹول کالز والے ایجنٹک ورک فلوز

### کیو مین آؤٹ پٹ موڈ

کیو مین آؤٹ پٹ موڈ ایسی **سسٹم پرامپٹ ہدایات** شامل کرتا ہے جو خود ماڈل سے
مختصر آؤٹ پٹ مانگتی ہیں — `lite` لیول مکمل جملے برقرار رکھتے ہوئے مختصر جوابات کا مطالبہ کرتا ہے، `full`
اسے "سمجھ دار غار کے انسان کی طرح مختصر جواب دینے" کو کہتا ہے، اور `ultra` ٹیلی گرافک آؤٹ پٹ مانگتا ہے؛
ہدایات صرف مطالبہ کرتی ہیں، وہ اس کی ضمانت نہیں دے سکتیں۔ درخواستوں کو یہ ہدایات
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) کے ذریعے ملتی ہیں:
`open-sse/handlers/chatCore.ts` پہلے بیک ورڈ کمپیٹیبلٹی شِم کے ذریعے انتخاب طے کرتا ہے
(`resolveOutputStyleSelection()` در
`open-sse/services/compression/outputStyles/backCompat.ts`)، جو `outputStyles`
خالی ہونے کی صورت میں فعال `cavemanOutputMode` کو
`cavemanOutputMode.intensity` پر `terse-prose` آؤٹ پٹ اسٹائل سے میپ کرتا ہے
(ذیل میں بیک ورڈ کمپیٹیبلٹی دیکھیں)؛ غیر خالی `outputStyles`
انتخاب جوں کا توں استعمال ہوتا ہے، اور پھر `cavemanOutputMode.enabled` اور `intensity` کا
کوئی اثر نہیں ہوتا، جبکہ اس کا `autoClarity` ٹوگل بدستور لاگو رہتا ہے۔ `outputMode.ts` میں
ہدایات کے متن (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`)، مواد کو بائی پاس کرنے کی منطق اور
وہ پلیسمنٹ ہیلپر موجود ہے جسے انجیکشن استعمال کرتا ہے؛ اس کے اپنے `applyCavemanOutputMode()` انجیکٹر کا
کوئی پروڈکشن کالر نہیں ہے۔

#### یہ کیسے کام کرتا ہے

یہ موڈ ان پٹ کو کمپریس نہیں کرتا۔ یہ سسٹم پرامپٹ میں ایک ہدایتی بلاک شامل کرتا ہے
(ذیل میں انجیکشن کے کام کرنے کا طریقہ دیکھیں)، اور درخواست کے لیے منتخب کیا گیا کوئی بھی ان پٹ کمپریشن موڈ
اس کے بعد بھی اس باڈی پر چلتا ہے جس میں اب یہ بلاک موجود ہوتا ہے۔ ہر لیول کے اختتام پر آنے والی مشترکہ
حدود کی شق سے پہلے، انگریزی `full` لیول کا متن یہ ہے:

> "سمجھ دار غار کے انسان کی طرح مختصر جواب دیں۔ آرٹیکلز (a/an/the)، غیر ضروری الفاظ (just/really/basically/actually/simply)، رسمی خوش اخلاقی، اور غیر یقینی انداز حذف کریں۔ جملوں کے ٹکڑے قابل قبول ہیں۔ مختصر مترادفات استعمال کریں (extensive کی بجائے big، implement کی بجائے fix)۔ تمام تکنیکی مواد، کوڈ، ایررز، URLs اور identifiers بعینہٖ برقرار رکھیں۔"

یہ خصوصاً ان کاموں کے لیے مؤثر ہے:

- کوڈ جنریشن (زیادہ مختصر آؤٹ پٹ = کم ٹوکنز)
- فوری سوال و جواب (تفصیلی وضاحتوں کی ضرورت نہیں)
- بیچ پروسیسنگ (تھروپٹ کو زیادہ سے زیادہ کرنا)

#### کب استعمال کریں

کیو مین آؤٹ پٹ موڈ **اختیاری** ہے۔ کمپریشن فعال ہونے پر (`enabled: true`، کمپریشن سیٹنگز
صفحے پر موجود ماسٹر ٹوگل)، اسے `cavemanOutputMode.enabled` کے ذریعے فعال کریں؛ `intensity`
`lite`، `full` یا `ultra` منتخب کرتا ہے:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

کسی کمپریشن کومبو کا **آؤٹ پٹ موڈ** ٹوگل (`outputMode`، جبکہ لیول `outputModeIntensity` میں ہے)
ان درخواستوں کے لیے یہی سوئچ سیٹ کرتا ہے جن پر وہ کومبو لاگو ہوتا ہے، اور
`omniroute_set_compression_engine` MCP ٹول اپنے بولین `outputMode`
آرگیومنٹ کے ذریعے اسے لکھتا ہے۔ غیر خالی `outputStyles` انتخاب کو اس سوئچ پر ترجیح حاصل ہوتی ہے۔ ڈیش بورڈ میں،
**مختصر نثر** آؤٹ پٹ اسٹائل فعال کرنے سے یہی بلاک انجیکٹ ہوتا ہے (ذیل میں آؤٹ پٹ اسٹائلز دیکھیں)۔

### آؤٹ پٹ اسٹائلز (کیٹلاگ)

اوپر دیا گیا کیو مین آؤٹ پٹ موڈ **پرانا سنگل اسٹائل راستہ** ہے۔ فیز 4 نے اسے
قابلِ ترکیب آؤٹ پٹ اسٹائلز کے ایک کیٹلاگ میں عمومی بنا دیا:
`open-sse/services/compression/outputStyles/catalog.ts` میں `OUTPUT_STYLE_CATALOG`۔ ہر اسٹائل ایک سسٹم پرامپٹ
ہدایت ہے جو خود ماڈل سے کم خرچ آؤٹ پٹ مانگتی ہے؛ متعدد اسٹائل ایک ساتھ فعال کیے جا سکتے ہیں
اور انہیں کیٹلاگ کی ترتیب کے مطابق انجیکٹ کیا جاتا ہے۔

| انداز                       | `id`          | یہ کیا کرتا ہے                                                                                                                                                                                             | ہدایات کی زبانیں                              |
| --------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| مختصر نثر                   | `terse-prose` | غیر ضروری الفاظ/حروفِ تعریف/تذبذب حذف کرتا ہے؛ تکنیکی مواد کو عین درست رکھتا ہے۔ وہی متن جو پرانے caveman آؤٹ پٹ موڈ میں تھا (حوالہ دیا گیا ہے، دوبارہ ٹائپ نہیں کیا گیا)۔                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| کم کوڈ                      | `less-code`   | YAGNI درجہ بندی: سب سے چھوٹی کارآمد تبدیلی، بغیر مانگی تجریدات کے۔                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| پونی ٹیل (سست سینئر ڈویلپر) | `ponytail`    | "بہترین کوڈ وہ ہے جو کبھی لکھا ہی نہ جائے": دوبارہ استعمال > دوبارہ تحریر، بنیادی وجہ > علامت، مختصر ترین کارآمد diff۔                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| مجھے ADHD ہے (عمل پہلے)     | `i-have-adhd` | عمل پہلے (نثر سے پہلے command/path/snippet)، نمبر وار محدود مراحل، صرف ایک ٹھوس اگلا قدم، کوئی تمہید/خلاصہ/اختتامی کلمات نہیں۔ [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) سے ماخوذ۔ | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| مختصر CJK (文言)            | `terse-cjk`   | `full`/`ultra` جواب کلاسیکی چینی (文言) میں؛ `lite` صرف حروفِ ربط، رسمی کلمات یا آرائش کے بغیر مختصر جوابات مانگتا ہے۔                                                                                     | zh (locale کے لحاظ سے محدود، ذیل میں دیکھیں)  |

ہر انداز شدت کی تین سطحوں — `lite`، `full`، `ultra` — کے ساتھ آتا ہے، اور ہر سطح
مشترکہ حدود کی شق (`outputMode.ts` میں `SHARED_BOUNDARIES`) پر ختم ہوتی ہے، جو
کوڈ بلاکس، فائل پاتھز، کمانڈز، errors اور URLs کو عین اصل حالت میں رکھتی ہے۔ `terse-prose` اور
`terse-cjk` کی سطحوں کے متن اس فہرست میں identifiers بھی شامل کرتے ہیں۔

`terse-cjk` دو جگہوں پر locale کے لحاظ سے `zh` تک محدود ہے۔ Compression Settings صفحہ
اس کی row صرف اس وقت دکھاتا ہے جب dashboard UI کی زبان چینی (`zh-CN` یا `zh-TW`) ہو، اور
`applyOutputStyles()` اسے صرف اس وقت inject کرتا ہے جب request کی resolved language (ذیل میں Language
selection دیکھیں) `zh` ہو۔ row چھپانے سے محفوظ شدہ `terse-cjk` selection صاف نہیں ہوتی:
settings API کسی بھی style id کو قبول کرتا ہے، اور صفحے پر دوسرے styles محفوظ کرنے سے یہ برقرار رہتا ہے۔ request
کے وقت، `applyOutputStyles()` کی language check ہی واحد locale gate ہے۔

#### injection کیسے کام کرتا ہے

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`)
catalog کے مقابلے میں selection کو resolve کرتا ہے (نامعلوم ids اور locale سے غیر موافق styles
خارج کر دیے جاتے ہیں، کبھی error نہیں بنتے؛ ایسی selection جو کسی style پر resolve نہ ہو body کو
بغیر تبدیلی کے چھوڑ دیتی ہے، بطور `no_styles` skip ہوتی ہے)، منتخب instructions کو catalog
کی ترتیب میں جوڑتا ہے،
حدود کی شق **صرف ایک بار** شامل کرتا ہے (نیز safety clause، `SAFETY_BOUNDARIES` یا اس کا
ترجمہ، جب `less-code` یا `ponytail` منتخب ہو)، اور block کو ایک واحد
idempotency marker (`[OmniRoute Output Styles]`) سے شروع کرتا ہے، لہٰذا دوبارہ apply کرنا no-op ہوتا ہے۔ جب
resolved language (ذیل میں Language selection دیکھیں) کا ترجمہ موجود ہو، تو انگریزی کے بجائے
مقامی زبان کی instruction inject کی جاتی ہے۔

غیر خالی `messages` array والی body پر، idempotency check
content bypass سے پہلے چلتا ہے: جب `[OmniRoute Output Styles]` marker پہلے ہی top-level
`system` field (string یا content-block array) میں، یا string
content والے system message میں موجود ہو، تو body کو `already_applied` کے طور پر بغیر تبدیلی کے چھوڑ دیا جاتا ہے اور کوئی keyword check نہیں چلتی۔
ورنہ content bypass (`open-sse/services/compression/outputMode.ts` میں
`shouldBypassCavemanOutputMode()`) آخری تین
messages کے متن کو، ان کے role سے قطع نظر، check کرتا ہے، اور پوری turn کے لیے styles کو skip کر دیتا ہے جب وہ متن
security، irreversible-action یا clarification keywords، یا کسی
ترتیب پر منحصر sequence سے match کرے: `first`، `then`، `after that`، `before`، `rollback` یا
`backup`، جس کے بعد 240 characters کے اندر `delete`، `drop`، `migrate`، `deploy` یا
`release` آئے۔ bypass اس وقت چلتا ہے جب **Auto-Clarity Bypass** toggle
(`cavemanOutputMode.autoClarity`، بطور default on) on ہو؛ toggle کو off کرنے سے
keyword check skip ہو جاتی ہے۔

جب bypass turn کو گزرنے دیتا ہے، تو `placeSystemInstruction()` (اسی file میں)، جو
کبھی نیا `messages[0]` تخلیق نہیں کرتا، block کو ان میں سے پہلی دستیاب جگہ پر رکھتا ہے:

1. string content والا ابتدائی system message: block اس کے متن کے بعد append کیا جاتا ہے۔
2. top-level `system` field: block کو string کے متن کے بعد append کیا جاتا ہے، یا
   content-block array میں نئے text block کے طور پر شامل کیا جاتا ہے۔
3. string content والا پہلا بعد کا system message: block اس کے
   متن کے بعد append کیا جاتا ہے۔
4. مذکورہ بالا میں سے کوئی نہیں: block کو `messages` کے آخر میں ایک نئے system message میں رکھا جاتا ہے۔

`messages` array کے بغیر body پر (یا خالی array کے ساتھ)، کوئی content bypass نہیں چلتا اور
top-level `system` field سے رجوع نہیں کیا جاتا۔ block کو string `instructions` field کے متن کے بعد
append کیا جاتا ہے، الا یہ کہ اس field میں پہلے ہی
`[OmniRoute Output Styles]` marker موجود ہو، ایسی صورت میں body کو
`already_applied` کے طور پر بغیر تبدیلی کے چھوڑ دیا جاتا ہے۔ جب body میں string `instructions` field نہ ہو مگر `input`
(string یا array) موجود ہو، تو block `instructions` بن جاتا ہے اور اس field میں موجود کسی بھی non-string value
کی جگہ لے لیتا ہے۔ ایسی body جس میں نہ string `instructions` field ہو اور نہ string یا array
`input`، بغیر تبدیلی کے چھوڑ دی جاتی ہے اور `no_messages` کے طور پر skip ہوتی ہے۔

#### فعال کرنے کا طریقہ

ڈیش بورڈ میں: **کمپریشن کانٹیکسٹ → کمپریشن سیٹنگز**
(`/dashboard/context/settings`)، آؤٹ پٹ اسٹائلز سیکشن: ہر اسٹائل کے لیے ایک قطار، جس میں آن/آف
ٹوگل اور لیول سلیکٹر ہوتا ہے۔ اسٹائلز اس وقت شامل ہوتے ہیں جب کمپریشن خود آن ہو (صفحے کا
ماسٹر ٹوگل، `enabled`)۔ **آٹو-کلیئرٹی بائی پاس** ٹوگل **کیومین**
صفحے (`/dashboard/context/caveman`) پر، اس کے **آؤٹ پٹ موڈ** کارڈ میں موجود ہے۔ پروگرام کے ذریعے،
کمپریشن کنفگ منتخب کردہ ترتیب کو یوں محفوظ رکھتا ہے:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

بیک ورڈ کمپیٹیبلٹی: جب تک `outputStyles` خالی ہو، پرانی `cavemanOutputMode.enabled`
سیٹنگ `cavemanOutputMode.intensity` پر `terse-prose` سے میپ ہوتی ہے۔ اس کے بعد بلاک
`[OmniRoute Output Styles]` مارکر سے شروع ہوتا ہے، جبکہ پرانا `applyCavemanOutputMode()`
انجیکٹر `[OmniRoute Caveman Output Mode]` لکھتا تھا۔ مارکر کے نیچے، متن en، pt-BR، es، de، fr، it، ru، id اور vi میں
پرانی انجیکشن سے مطابقت رکھتا ہے؛ ja اور zh میں باؤنڈریز کی شق سے پہلے ایک
اضافی اسپیس ہوتی ہے۔ `terse-prose` کا pt-BR، es، de،
fr، it، ru، zh، ja، id اور vi میں ترجمہ موجود ہے، اس لیے ایسی درخواست جس کی طے شدہ زبان `hu` ہو، اسے
انگریزی متن ملتا ہے، جبکہ پرانا انجیکٹر اس کے لیے ہنگیرین متن استعمال کرتا تھا۔

آؤٹ پٹ اسٹائل کی زبان کا انتخاب (`outputStyles/apply.ts` میں
`resolveOutputStyleLanguage()`): جب `languageConfig.enabled` آن ہو، تو `autoDetect` درخواست کی
`messages` ارے میں تازہ ترین ایسے صارف پیغام کا نمونہ لیتا ہے جس میں متن موجود ہو (اسٹرنگ مواد، یا
اس کے مواد کے حصوں کا `text`) اور اس پر Caveman انجن کا ڈیٹیکٹر
(`detectCompressionLanguage()`) چلاتا ہے۔ اگر متن میں Han
حروف ہوں اور kana نہ ہو تو ڈیٹیکٹر `zh` واپس کرتا ہے؛ بصورتِ دیگر یہ `it`، `pt-BR`، `es`، `de`،
`fr`، `ru`، `ja`، `hu` اور `id` میں سے وہ زبان واپس کرتا ہے جس کے اشاروں کی مماثلتیں سب سے زیادہ ہوں، اور جب کوئی مماثلت نہ ہو تو `en` واپس کرتا ہے —
جس متن کی درجہ بندی نہ ہو سکے اسے انگریزی ملتی ہے، کبھی `defaultLanguage` نہیں، اور
اگرچہ اسٹائلز میں `vi` متن شامل ہے، پھر بھی `vi` کبھی ڈیٹیکٹ نہیں ہوتی۔ Responses API باڈی اپنی باریوں کو
`input` میں رکھتی ہے، جس کا نمونہ نہیں لیا جاتا، اس لیے اسے `defaultLanguage` اور پھر انگریزی ملتی ہے۔ جب
`messages` میں کسی صارف پیغام میں متن نہ ہو، یا `autoDetect` آف ہو، تو
`defaultLanguage` لاگو ہوتی ہے، اور پھر انگریزی۔ جب `languageConfig.enabled` آف ہو، تو زبان انگریزی ہوتی ہے — سوائے اس کے کہ
درخواست پر کوئی کمپریشن کومبو لاگو ہو (درخواست کے روٹنگ
کومبو کو تفویض کردہ کومبو، یا وہ ڈیفالٹ کمپریشن کومبو جسے chatCore بلٹ اِن اسٹیکڈ
پائپ لائن کے لیے فال بیک کے طور پر استعمال کرتا ہے): کومبو لاگو کرنے سے اس درخواست کے لیے `languageConfig.enabled` آن ہو جاتا ہے اور
کومبو کے لینگویج پیکس سے `defaultLanguage` سیٹ ہوتی ہے (محفوظ شدہ قدر، اگر وہ
کومبو کے پیکس میں سے ایک ہو، بصورتِ دیگر کومبو کا پہلا پیک، جس کا ڈیفالٹ `en` ہے)، جبکہ
محفوظ شدہ `autoDetect` (جو ڈیفالٹ طور پر آن ہے) بدستور لاگو رہتا ہے۔ Caveman ان پٹ انجن اپنی
رول پیک زبان مختلف انداز میں منتخب کرتا ہے — ہر متنی حصے کے لحاظ سے، اور آٹو ڈیٹیکٹ آف ہونے کی صورت میں،
`enabledPacks` کے تحت۔

اسٹائل × زبان میٹرکس کو
`tests/unit/compression/output-styles-i18n-matrix.test.ts` کے ذریعے مقرر رکھا گیا ہے: ہر کیٹلاگ اسٹائل کے لیے ٹیسٹ کے
`BASELINE_LANGUAGES` میں ایک اندراج ضروری ہے؛ جو اسٹائل لوکیل کے مطابق محدود نہ ہو، اسے
pt-BR ترجمہ فراہم کرنا ضروری ہے (لوکیل کے مطابق محدود `terse-cjk` اس اصول سے مستثنیٰ ہے)، الا یہ کہ وہ
`KNOWN_ENGLISH_ONLY` میں درج ہو، جس میں صرف ایسے اسٹائلز شامل ہو سکتے ہیں جن کا کوئی ترجمہ نہ ہو —
اگر کسی درج شدہ اسٹائل کا کوئی بھی ترجمہ موجود ہو تو ٹیسٹ ناکام ہو جاتا ہے؛ اور اگر کوئی اسٹائل ایسی زبان کھو دے
جو اس کے `BASELINE_LANGUAGES` اندراج میں درج ہو، تو بھی ٹیسٹ ناکام ہو جاتا ہے۔ اسٹائل شامل کرنے کے لیے،
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) دیکھیں۔

### ٹول رزلٹ کمپریشن

`open-sse/services/compression/toolResultCompressor.ts` میں `compressToolResult()`
ٹول رزلٹ کے متن کو **5 حکمتِ عملیوں** کے ذریعے کمپریس کرتا ہے۔ یہ انہیں اسی ترتیب سے آزماتا ہے، اور
پہلی فعال حکمتِ عملی جس کی جانچ مواد سے مطابقت رکھتی ہو، نتیجے کا فیصلہ کرتی ہے:

1. **`fileContent`**: 3 یا زیادہ سطروں پر مشتمل مواد، جس میں کم از کم ایک سطر، ابتدائی
   حاشیہ بندی کو نظر انداز کرتے ہوئے، `import `، `export `، `function `، `class `،
   `const `، `let `، `var ` یا `return ` (کلیدی لفظ کے ساتھ ایک اسپیس) سے، یا `if`،
   `for` یا `while` کے بعد `(` یا ` (` سے شروع ہوتی ہو، اپنی پہلی 20 اور آخری 5 سطریں
   برقرار رکھتا ہے، جبکہ حذف شدہ درمیانی حصے کو نشان زد کیا جاتا ہے۔
2. **`grepSearch`**: ایسا مواد جس میں کم از کم ایک سطر `<path>:<digits>:` کی شکل میں ہو،
   جہاں پہلے کولن سے پہلے کے متن میں کوئی خالی جگہ نہ ہو، صرف ایسی سطریں برقرار رکھتا
   ہے، زیادہ سے زیادہ 30، جن کے بعد مزید مماثلتوں کی تعداد اور مماثل فائلوں کی فہرست
   دی جاتی ہے؛ ہر دوسری سطر حذف کر دی جاتی ہے۔ حکمت عملی فعال کرنے کے لیے ایسی ایک
   سطر ہی کافی ہے، اس لیے `12:30:45` جیسے ٹائم اسٹیمپ سے شروع ہونے والی لاگ سطر بھی
   شمار ہوتی ہے۔
3. **`shellOutput`**: ایسی آؤٹ پٹ جس میں ANSI CSI سیکوینس (`ESC[`، پھر ہندسے یا
   سیمی کولن، اور پھر ایک حرف، جیسا کہ رنگوں کے کوڈز میں ہوتا ہے) یا متن میں کہیں بھی
   `$` کے بعد خالی جگہ ہو، ان سیکوینسز کو کھو دیتی ہے (دیگر escape سیکوینسز، جیسے
   `ESC[?25l` یا OSC ونڈو ٹائٹل سیکوینس، برقرار رہتی ہیں) اور اپنی آخری 50 سطریں
   برقرار رکھتی ہے، جبکہ مسلسل دہرائی گئی سطروں کو ایک سطر میں سمیٹ دیا جاتا ہے۔
   چونکہ یہ جانچ `json` اور `errorMessage` سے پہلے چلتی ہے، اس لیے ایسی JSON یا خرابی
   کی آؤٹ پٹ جس میں ایسا `$` موجود ہو، `shellOutput` کے فعال ہونے پر کبھی ان تک نہیں
   پہنچتی۔
4. **`json`**: 2,000 سے زیادہ حروف پر مشتمل ایسا JSON پے لوڈ، جو (اختیاری خالی جگہ
   کے بعد) `{` یا `[` سے شروع ہو اور کامیابی سے پارس ہو، خلاصہ کیا جاتا ہے: 7 سے
   زیادہ آئٹمز والی array اپنی پہلی 5 اور آخری 2 آئٹمز اور اپنی کُل تعداد برقرار
   رکھتی ہے، جبکہ object اپنی پہلی 20 keys برقرار رکھتا ہے، اور ہر nested object یا
   array ویلیو کو `{…N keys}` پلیس ہولڈر سے بدل دیا جاتا ہے (array کے لیے N اس کی
   لمبائی ہے)، نیز پہلی 20 کے بعد حذف کی گئی keys کی گنتی کے لیے
   `_remaining_<N>_keys` مارکر شامل کیا جاتا ہے۔ Scalar ویلیوز مکمل نقل کی جاتی ہیں،
   اس لیے 20 یا اس سے کم keys اور بغیر nested ویلیوز والا object صرف دوبارہ حاشیہ بند
   کیا جاتا ہے — minified شکل میں موجود object کے حروف بڑھ جاتے ہیں اور وہ غیر تبدیل
   شدہ رہتا ہے۔
5. **`errorMessage`**: ایسی آؤٹ پٹ جس میں کہیں بھی، حروف کی کسی بھی صورت میں،
   `error:`، `error ` (لفظ کے بعد ایک اسپیس، جیسا کہ `no error found` میں)،
   `[error]`، `exception:`، `exception `، `[exception]` یا `traceback` موجود ہو،
   اپنی پہلی سطر، اگلی 10 سطریں اور آخری 3 سطریں برقرار رکھتی ہے، جبکہ ان کے درمیان
   موجود سطروں کی جگہ `… [N frames elided] …` مارکر دیا جاتا ہے۔ یہ مارکر صرف اس وقت
   ظاہر ہوتا ہے جب پہلی سطر کے بعد 13 سے زیادہ سطریں ہوں، اس لیے 14 یا اس سے کم سطروں
   والی خرابی کی آؤٹ پٹ مختصر نہیں ہوتی (12 یا 13 سطروں کی صورت میں آخری 3 سطریں پہلے
   سے برقرار رکھی گئی سطروں کو دہراتی ہیں)۔

کسی حکمت عملی کے مماثل ہونے کے بعد، چاہے وہ کچھ بھی نہ بچائے، بعد کی حکمت عملیوں کو
نہیں آزمایا جاتا۔ جب مماثل حکمت عملی کوئی تخمینی tokens نہ بچائے (لمبائی ÷ 4، اوپر
کی جانب گول کی گئی) — مثلاً 25 یا اس سے کم سطروں والی code-like فائل، یا 2,000 سے
زیادہ حروف لیکن 7 یا اس سے کم آئٹمز والی JSON array — تو aggressive engine اصل tool
result برقرار رکھتا ہے: دونوں callers (`compressAggressive()` اور
`compressAnthropicToolResultBlock()`) اس وقت اصل مواد برقرار رکھتے ہیں جب `saved`
0 یا اس سے کم ہو، جبکہ `compressToolResult()` خود اب بھی اس حکمت عملی کی آؤٹ پٹ
واپس کرتا ہے۔ tool-result مرحلہ حتمی فیصلہ نہیں ہے: engine کا fallback summarizer
اب بھی 8,192 حروف (`maxTokensPerMessage`، 2,048، ضرب 4) سے طویل `tool` یا
`function` پیغام کو مختصر کر سکتا ہے۔

#### کب استعمال کریں

Tool result compression، aggressive engine (`compressAggressive()`،
`open-sse/services/compression/aggressive.ts` میں) کا مرحلہ 1 ہے، اس لیے یہ
Aggressive mode اور stacked pipeline کے `aggressive` مرحلے میں چلتا ہے۔ یہ
OpenAI-shape کے `tool` اور `function` پیغامات، اور Anthropic کے `tool_result`
بلاکس کے اندر موجود متن کو compress کرتا ہے۔ ہر حکمت عملی کا اپنا switch
`aggressive.toolStrategies` کے تحت ہے، اور سب بطور ڈیفالٹ فعال ہیں۔ dashboard میں،
compression فعال ہونے اور default mode کے Aggressive ہونے پر یہ switches، Caveman
صفحے کے **Advanced** منظر میں موجود ہوتے ہیں۔

### Stacked Pipeline

stacked mode میں **متعدد engines ترتیب وار** چلتے ہیں — عموماً پہلے RTK
(tool output پر 60-90% بچت)، پھر باقی متن پر Caveman (input میں ~46% بچت)۔
اکٹھا کرنے پر یہ **78-95% اہل حد** بنتی ہے (اوپر Upstream Savings Math دیکھیں):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` کا اوسط ≈89% ہے۔

#### یہ کیسے کام کرتا ہے

```
ان پٹ (1000 tokens)
  → RTK (command-aware فلٹر) → 200 tokens
    → Caveman (فالتو متن کا اخراج) → 108 tokens
  → آؤٹ پٹ (108 tokens، ~89% بچت)
```

#### کب استعمال کریں

stacked mode کو درج ذیل کے لیے استعمال کریں:

- Tool-heavy workflows (agentic coding، تحقیق)
- لاگت کے حوالے سے حساس batch processing
- جب آپ کو tokens کی زیادہ سے زیادہ بچت درکار ہو

Stacked pipelines کو عالمی `stackedPipeline` compression setting کے ذریعے، یا کسی
routing combo کو تفویض کیے گئے نام زد compression combo کے ذریعے configure کیا جاتا
ہے (اوپر Per-Combo Override دیکھیں) — auto-combo کے `modePack` کے ذریعے نہیں (وہ
field صرف auto-combo model selection کے weights دوبارہ ترتیب دیتا ہے، اور `stacked`
ایک درست pack name نہیں ہے)۔

---

## کمپریشن کومبو اوور رائیڈز

آپ مختلف استعمالات کے لیے رویّے کو باریک بینی سے ایڈجسٹ کرنے کی خاطر عالمی کمپریشن موڈ کو **ہر کومبو کے لیے** اوور رائیڈ کر سکتے ہیں:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

یہ درج ذیل صورتوں میں مفید ہے:

- **کوڈنگ کومبوز**: طویل سیشنز کے لیے `aggressive` موڈ استعمال کریں
- **فوری سوال و جواب کے کومبوز**: تیز جوابات کے لیے `lite` موڈ استعمال کریں
- **ٹول پر زیادہ انحصار کرنے والے کومبوز**: زیادہ سے زیادہ بچت کے لیے `stacked` موڈ استعمال کریں
- **پروڈکشن کومبوز**: کیشنگ فراہم کنندگان کے لیے اوور رائیڈ بند رکھیں — ہمیشہ فعال
  کیش سے آگاہ ایڈجسٹمنٹ خودکار طور پر `aggressive`/`ultra` کو `standard` پر ڈاؤن گریڈ کر دیتی ہے
  (`cache-aware` موڈ قابلِ انتخاب نہیں ہے)

---

## مزید دیکھیں

- [انوائرنمنٹ کنفیگ](../reference/ENVIRONMENT.md) — کمپریشن کے انوائرنمنٹ ویری ایبلز
- [آرکیٹیکچر گائیڈ](../architecture/ARCHITECTURE.md) — کمپریشن پائپ لائن کی اندرونی تفصیلات
- [صارف گائیڈ](../guides/USER_GUIDE.md) — کمپریشن کے ساتھ شروعات
- [RTK کمپریشن](./RTK_COMPRESSION.md) — RTK فلٹرز، اعتماد کا ماڈل، تصدیقی گیٹ، خام آؤٹ پٹ کی بازیابی
- [کمپریشن انجنز](./COMPRESSION_ENGINES.md) — Caveman، RTK، stacked، APIs، MCP، ڈیش بورڈ
- [کمپریشن رولز فارمیٹ](./COMPRESSION_RULES_FORMAT.md) — JSON رول پیک فارمیٹ
- [کمپریشن لینگویج پیکس](./COMPRESSION_LANGUAGE_PACKS.md) — زبان سے مخصوص Caveman قواعد
