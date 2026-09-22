# Compression Engines (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute کمپریشن انجن کنٹریکٹس کے گرد بنایا گیا ہے۔ کوئی موڈ براہِ راست ایک انجن
(`caveman` یا `rtk`) چلا سکتا ہے، یا ایک تعیناتی اسٹیکڈ پائپ لائن جو متعدد انجنوں کو ترتیب وار چلاتی ہے۔

## موڈز

| موڈ          | انجن کا راستہ                      | مطلوبہ اِن پٹ                               |
| ------------ | ---------------------------------- | ------------------------------------------- |
| `off`        | کوئی نہیں                          | پرامپٹ کا عین تحفظ                          |
| `lite`       | Caveman lite ہیلپرز                | کم خطرے والی، ہمیشہ فعال صفائی              |
| `standard`   | Caveman                            | قدرتی زبان کے پرامپٹ کا اختصار              |
| `aggressive` | Caveman + ہسٹری/ٹول سمَرائزرز      | طویل چیٹ سیشنز                              |
| `ultra`      | Caveman + پروننگ ہیلپرز            | کانٹیکسٹ کی حد سے بحالی                     |
| `rtk`        | RTK                                | ٹرمینل، شیل، بلڈ، ٹیسٹ، اور git آؤٹ پٹ      |
| `omniglyph`  | OmniGlyph                          | مقامی پرووائیڈر وائر پر کانٹیکسٹ بطور تصویر |
| `stacked`    | پائپ لائن، ڈیفالٹ `rtk -> caveman` | مخلوط ٹول لاگز اور نثر، زیادہ سے زیادہ بچت  |

### OmniGlyph کمپریشن پروفائلز

`omniglyph` انجن (پیکیج `omniglyph`، 1.4.0+) ایک نام زدہ سیمنٹک پروفائل قبول کرتا ہے، جسے
کمپریشن سیٹنگز میں `omniglyph.profile` کے ذریعے عالمی طور پر، یا اسٹیکڈ پائپ لائن کی اسٹیپ کنفگ کے ذریعے
فی اسٹیپ مقرر کیا جاتا ہے:

| پروفائل       | حد                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| `aggressive`  | ڈیفالٹ۔ وہ پالیسی جسے شائع شدہ رسیٹس نے ناپا — سسٹم، ٹول دستاویزات، اور کثیف ہسٹری کو تصاویر بناتی ہے |
| `balanced`    | لائیو اسٹیٹ کو مقامی رکھتا، آخری 8 ٹرنز کو محفوظ کرتا، اور پرانی بند ہسٹری کو سمیٹتا ہے               |
| `coding-safe` | اتھارٹی، ٹول اسکیماؤں اور لائیو ٹول آؤٹ پٹ کو مقامی رکھتا، اور آخری 12 ٹرنز کو محفوظ کرتا ہے          |
| `passthrough` | تبدیلی کیے بغیر روٹ کرتا ہے؛ انجن کو چھوڑ دیا جاتا ہے                                                 |

پروفائل ایک **بالائی حد ہے، زیریں حد نہیں**: پیکیج میں `mergeCompressionProfileOptions`
کالر کے اووررائیڈ کو کسی ایسے لاسّی راستے کو دوبارہ کھولنے کی اجازت نہیں دیتا جسے پروفائل نے بند کر دیا ہو، لہٰذا فی اسٹیپ
`preserveSystemPrompt: false`، `coding-safe` کے تحت سسٹم کمپریشن کو دوبارہ فعال نہیں کر سکتا۔

اس کوڈ بیس پر پیمائش کے مطابق: `coding-safe` اور `balanced`، `minCompressChars` کو اس کی
زیادہ سے زیادہ حد تک بڑھاتے ہیں اور سسٹم، ٹول اسکیماؤں، اور ٹول نتائج کو مقامی رکھتے ہیں، اس لیے جس سیشن میں ابھی
ہسٹری جمع نہیں ہوئی وہ `below_min_chars` پر رک جاتا ہے اور انجن کچھ بھی تبدیل نہیں کرتا۔ یہی وجہ ہے
کہ ڈیفالٹ محفوظ ترین پروفائل کے بجائے `aggressive` ہے۔

پیکیج اپنی ماحولیاتی کنفگریشن سے اپنے ماڈل کا دائرۂ کار اور پروفائل طے کرتا ہے۔
OmniRoute فیصلہ کبھی تفویض نہیں کرتا: اڈاپٹر ماڈل گیٹ کو پیکیج کے
سب سے محدود دائرۂ کار پر مقید کرتا ہے، اس لیے ہوسٹ ماحول کی سیٹنگز صرف اجازت فہرست کو مزید محدود کر سکتی ہیں، اسے
OmniRoute کی پیمائش شدہ رسیٹس سے آگے کبھی وسیع نہیں کر سکتیں۔

## انجن رجسٹری

رجسٹری `open-sse/services/compression/engines/registry.ts` میں موجود ہے۔ انجن ایک مشترکہ
معاہدہ فراہم کرتے ہیں:

- `id`: مستقل انجن آئی ڈی، جیسے `caveman` یا `rtk`
- `apply(text, config)`: اسٹیک شدہ پائپ لائنز کے زیرِ استعمال روایتی نفاذ کا راستہ
- `compress(input, config)`: متن + اعدادوشمار واپس کرنے والا بنیادی نفاذ کا راستہ
- `getConfigSchema()`: درست کنفگ کی JSON-Schema جیسی ساخت واپس کرتا ہے
- `validateConfig(config)`: `{ valid, errors[] }` واپس کرتا ہے

رجسٹریشن میں `registerCompressionEngine(engine)` (یا پیچیدہ صورتوں کے لیے `registerEngine`)
استعمال ہوتا ہے، جو قبول کرنے سے پہلے `assertValidEngine()` اور `validateConfig(defaultConfig)` کو کال کرتا ہے۔
رن ٹائم پر کسی انجن کو ہٹانے کے لیے `unregisterCompressionEngine(id)` استعمال کریں۔

کمپریشن چلنے سے پہلے `strategySelector.ts` بلٹ اِن انجنز کو رجسٹر کرتا ہے۔ اس طرح پری ویو،
رن ٹائم کمپریشن، اسٹیک شدہ موڈ، ٹیسٹس، اور مستقبل کے انجن ایک ہی نفاذ کا راستہ استعمال کر سکتے ہیں۔

### MCP وضاحت کی کمپریشن (متعلقہ)

ایک علیحدہ رجسٹری، رجسٹری کی سطح پر MCP ٹول کی وضاحت کے میٹا ڈیٹا کو کمپریس کرتی ہے — دیکھیں
`open-sse/mcp-server/descriptionCompressor.ts` اور [MCP-SERVER.md](../frameworks/MCP-SERVER.md)۔ یہ
Caveman کے قواعد دوبارہ استعمال کرتی ہے، لیکن درخواست کے پے لوڈز کے بجائے ٹول میٹا ڈیٹا پر کام کرتی ہے۔

### اضافی بلٹ اِن انجنز

Caveman، RTK، اور LLMLingua-2 کے علاوہ، رجسٹری کئی مخصوص لاس لیس /
ساختی انجنز کے ساتھ فراہم کی جاتی ہے (جنہیں اسٹیک شدہ پائپ لائنز، پلے گراؤنڈ، اور ٹیسٹس استعمال کرتے ہیں):

| انجن          | آئی ڈی          | یہ کیا کرتا ہے                                                                                                                                                                           |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): متن کے بڑے متصل بلاکس کو مواد کے پتے پر مبنی حوالوں سے بدلتا ہے، تاکہ بار بار آنے والے/بڑے بلاکس ایک بار بھیجے جائیں اور اس کے بعد ان کا حوالہ دیا جائے۔ |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): یکساں JSON-array پے لوڈز کو کالمی `[N rows]` شکل میں لاس لیس جدولی انداز سے مختصر کرتا ہے۔                                                                       |
| ionizer       | `ionizer`       | بہت بڑے یکساں بلاکس سے ابتدائی/درمیانی/آخری قطاروں کے نمونے لیتا ہے، اور حذف شدہ درمیانی حصے کو CCR کے مواد کے پتے پر مبنی حوالے کے طور پر محفوظ کرتا ہے۔                                |
| session-dedup | `session-dedup` | مواد کے پتے پر مبنی، مختلف ٹرنز کے درمیان ڈپلی کیشن کا خاتمہ (TokenMizer سے متاثر): اسی سیشن کے سابقہ ٹرنز میں پہلے سے دیکھا گیا متن حذف کرتا ہے۔                                        |

**CCR بازیافت پروٹوکول کی ہدایت (#8033):** جب CCR پہلی بار کسی
درخواست میں ≥1 بلاک کو تبدیل کرتا ہے تو انجن ایک واحد، آئیڈیم پوٹنٹ `system` پیغام شروع میں شامل کرتا ہے (جس کی ابتدا
`[CCR protocol]` سینٹینل سے ہوتی ہے)، جو کالر کو مارکر → ٹول معاہدہ سمجھاتا ہے: یہ کہ
`[CCR retrieve hash=<24hex> chars=N]` مارکر کا کیا مطلب ہے، ہیش کو حرف بہ حرف نقل کرنا ضروری ہے
(تمام 24 ہیکس حروف — غلط نقل کیے گئے ہیش غالباً "بلاک نہیں ملا"
والی ناکامیوں کی وجہ ہوتے ہیں)، اور یہ کہ `[dedup:ref sha=...]` مارکر کا مطلب "ہسٹری میں پیچھے دیکھیں" ہے، نہ کہ "ٹول کو
کال کریں"۔ یہ نوٹ **صرف اس وقت شامل کیا جاتا ہے جب کالر کے مشتہر کردہ `tools[]` سے ثابت ہو کہ وہ
واقعی `omniroute_ccr_retrieve` تک رسائی حاصل کر سکتا ہے** (`callerSupportsCcrRetrieve()`،
`open-sse/services/compression/engines/ccr/protocolInstruction.ts` میں) — اس ٹول کے بغیر کسی سادہ
OpenAI سے مطابقت رکھنے والے کالر کو کسی ایسی چیز کو کال کرنے کی ہدایت کبھی نہیں ملتی جس تک وہ
رسائی حاصل نہیں کر سکتا۔ آئیڈیم پوٹینسی نافذ کرنے کے لیے شامل کرنے سے پہلے پیغام کی ہسٹری میں سینٹینل
تلاش کیا جاتا ہے، تاکہ متعدد ٹرنز والی درخواستیں (جو سابقہ پیغامات دوبارہ چلاتی ہیں) ہر ٹرن کے ساتھ
اس نوٹ کو بار بار جمع نہ کریں۔

## Caveman

Caveman موڈ عام نثر کی معنوی اختصار کاری پر توجہ دیتا ہے:

- کوڈ بلاکس، URLs، JSON، paths، اور ساخت یافتہ ڈیٹا محفوظ رکھتا ہے
- غیر ضروری عبارت، غیر یقینی انداز، دہرایا گیا سیاق، اور طویل ربطی جملے ہٹاتا ہے
- `open-sse/services/compression/rules/` میں زبان سے آگاہ فائل رول پیکس کی معاونت کرتا ہے
- قدیم `standard`، `aggressive`، اور `ultra` موڈز کے ذریعے بھی دستیاب رہتا ہے

ڈیش بورڈ میں اس کا مقام `Dashboard -> Context & Cache -> Caveman` ہے۔

Caveman اپ اسٹریم کے مطابق آؤٹ پٹ ٹوکنز میں `~75%` کمی، بینچ مارکس میں اوسطاً `65%` آؤٹ پٹ بچت،
جس کی حد `22-87%` ہے، اور `~46%` ان پٹ کمپریشن ٹول حاصل ہوتا ہے۔ OmniRoute، مشترکہ prompt/context
بچت کی دستاویز بندی کرتے وقت Caveman کا ان پٹ سائیڈ عدد استعمال کرتا ہے؛ Caveman آؤٹ پٹ موڈ ایک
الگ response-behavior خصوصیت رہتا ہے۔

## RTK

RTK موڈ command اور tool آؤٹ پٹ پر توجہ دیتا ہے:

- `git status`، `git branch`، `git diff`، Vitest/Jest/Pytest، Cargo/Go ٹیسٹس،
  TypeScript/Vite/Webpack بلڈز، ESLint، npm audit/installs، Docker لاگز،
  shell `find`/`grep`، stack traces، اور عمومی لاگز جیسی آؤٹ پٹ کلاسز کا پتہ لگاتا ہے
- `open-sse/services/compression/engines/rtk/filters/` سے 49 JSON فلٹرز لاگو کرتا ہے
- RTK طرز کی declarative pipeline کی معاونت کرتا ہے: ANSI ہٹانا، replace، match-output شارٹ سرکٹ،
  لائنیں strip/keep کرنا، فی لائن truncation، head/tail/max-line truncation، اور خالی ہونے پر fallback
- `.rtk/filters.json` میں trust-gated پروجیکٹ فلٹرز اور
  `DATA_DIR/rtk/filters.json` میں عالمی فلٹرز کی معاونت کرتا ہے
- ANSI sequences، progress noise، دہرائی گئی لائنیں، اور غیر مفید boilerplate ہٹاتا ہے
- قابلِ عمل ناکامیاں، تنبیہات، خلاصے، تبدیل شدہ فائلیں، اور tail context محفوظ رکھتا ہے
- authenticated management routes کے ذریعے بازیابی/debugging کے لیے اختیاری طور پر redacted خام آؤٹ پٹ
  برقرار رکھ سکتا ہے

ڈیش بورڈ میں اس کا مقام `Dashboard -> Context & Cache -> RTK` ہے۔

custom filters، trust، verify، اور raw-output recovery کی آپریشنل تفصیلات
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) میں موجود ہیں۔

RTK اپ اسٹریم کے مطابق command-output compression میں `60-90%` بچت حاصل ہوتی ہے۔ اس کی README مثال میں
30 منٹ کا Claude Code سیشن `~118,000` ٹوکنز سے کم ہو کر `~23,900` رہ جاتا ہے، یعنی `79.7%` بچت۔

## LLMLingua-2 (معنوی تراش خراش)

LLMLingua-2 موڈ ایک چھوٹے ONNX token classifier کے ذریعے نثر پر **semantic token pruning**
انجام دیتا ہے، جو rule-based Caveman اور RTK engines کی تکمیل کرتا ہے:

- صرف non-system پیغامات میں نثر کو compress کرتا ہے؛ fenced code blocks اور دیگر محفوظ
  constructs میں کبھی تبدیلی نہیں کی جاتی
- `@atjsh/llmlingua-2` backend (`@huggingface/transformers` کے ذریعے ONNX) کو
  worker thread میں چلاتا ہے، لہٰذا model inference کبھی request event loop کو block نہیں کرتا
- **stackable** ہے (`stackPriority` 35): stacked pipeline میں یہ structural engines
  (CCR، session-dedup، headroom، Caveman) کے بعد مگر `ultra` سے پہلے چلتا ہے، کیونکہ
  semantic pruning پہلے سے structurally compressed متن پر سب سے زیادہ مؤثر ہے — مثلاً
  `rtk -> caveman -> llmlingua`
- **کسی بھی خرابی پر fail-open ہوتا ہے** (غائب optional deps، worker spawn، model load، inference،
  یا timeout) → اصل متن بغیر تبدیلی کے واپس کیا جاتا ہے، کبھی error نہیں

Engine کا مقام: `open-sse/services/compression/engines/llmlingua/`۔ ڈیش بورڈ میں اس کا مقام
`Dashboard -> Context & Cache -> LLMLingua` ہے۔

### ماڈلز

ڈیفالٹ ماڈل **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`، ~57 MB،
تیز) ہے۔ زیادہ درست **BERT-base** ماڈل (`Arcoldd/llmlingua4j-bert-base-onnx`،
~710 MB) engine config کے `model` فیلڈ کے ذریعے دستیاب ہے۔ `@huggingface/transformers`
پہلی کال پر منتخب ماڈل کو HuggingFace Hub سے
`${DATA_DIR}/models/llmlingua` میں lazily ڈاؤن لوڈ کرتا ہے (`modelStore.ts`)؛ اس کے بجائے `modelPath` config
override اسے مقامی copy کی جانب متوجہ کرتا ہے (offline / air-gapped تنصیبات)۔

### اختیاری dependencies اور حسبِ ضرورت تنصیب

prunable LLMLingua runtime peer stack **اختیاری** ہے۔ دو packages کو
`package.json` میں `optionalDependencies` کے طور پر درج کیا گیا ہے اور production build میں **external** رکھا گیا ہے
(`scripts/build/prepublish.ts` انہیں bundle نہیں کرتا):

| Package              | Version (pin) | Notes                                                |
| -------------------- | ------------- | ---------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | بنیادی package؛ دیگر کو peers کے طور پر بیان کرتا ہے |
| `js-tiktoken`        | `^1.0.20`     | Tokenizer                                            |

`@huggingface/transformers` کو `^4.2.0` پر pin کیا گیا ہے (مقامی embeddings path کے ساتھ مشترک اور
standalone bundle میں بھی trace کیا گیا)؛ `@atjsh/llmlingua-2@2.0.5` اس پر
`"^3.5.2 || ^4.0.0"` کے ساتھ peer کرتا ہے، اس لیے Transformers.js v3 اور v4 دونوں کی معاونت موجود ہے۔ 2.0.4 سے،
`@atjsh/llmlingua-2` کو اب `@tensorflow/tfjs` درکار نہیں، جس سے SLM stack کا سب سے بڑا واحد
حصہ (TensorFlow.js) ہٹ گیا۔ صرف اوپر دیے گئے دو packages ہی prunable SLM
peers ہیں۔ معیاری `npm install` (dev) اختیاری stack خودکار طور پر install کرتا ہے، جب تک optional
dependencies کو خارج نہ کیا جائے۔

**حسبِ ضرورت کیوں:** npm پر شائع شدہ package، standalone bundle، اور Docker image
کم حجم برقرار رکھنے کے لیے ان deps کے **بغیر** فراہم کیے جاتے ہیں۔ جب یہ موجود نہ ہوں تو worker کا dependency
gate (`worker.ts` میں `@atjsh/llmlingua-2` resolve probe) ناکام ہو جاتا ہے اور engine
**خاموشی سے fail-open ہوتا ہے** — LLMLingua منتخب کرنا no-op بن جاتا ہے (متن بغیر تبدیلی کے واپس آتا ہے، کوئی
error log نہیں ہوتا)۔ اسے pruned environment میں فعال کرنے کے لیے optional stack install کریں:

```bash
# package.json کی optionalDependencies میں درج versions پر pin کریں
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` کا اخراج (2.0.4+) پہلے غالب ~800 MB
حصے کو ختم کرتا ہے — باقی footprint transformers.js + onnxruntime-node runtimes،
اور پہلی بار استعمال پر ڈاؤن لوڈ ہونے والا TinyBERT ماڈل (~57 MB) ہے (npm کے ذریعے نہیں)۔

ہر environment کے لیے:

- **Dev / `npm install`** — خودکار طور پر انسٹال ہو جاتا ہے، الا یہ کہ آپ نے `--omit=optional`
  (یا `--no-optional`) استعمال کیا ہو۔ کسی کارروائی کی ضرورت نہیں۔
- **عالمی npm (`npm i -g omniroute`) / اسٹینڈ الون** — اوپر دی گئی انسٹال کمانڈ کو
  انسٹال شدہ پیکیج کی ڈائریکٹری کے اندر چلائیں، یا اختیاری dependencies کو خارج کیے بغیر دوبارہ انسٹال کریں۔
- **Docker** — کسی اخذ کردہ امیج کی لیئر میں انسٹال کمانڈ شامل کریں؛ شائع شدہ امیج کو
  دانستہ طور پر مختصر رکھا گیا ہے۔
- **VPS (PM2)** — ایپ کے `node_modules` میں انسٹال کریں، پھر پراسیس کو دوبارہ شروع کریں تاکہ
  worker، gate کو دوبارہ جانچ سکے۔
- **خام Next اسٹینڈ الون (`npm run build` → `.build/next/standalone/server.js`)** — اسٹینڈ الون
  ٹریس میں نہ worker شامل ہوتا ہے اور نہ ہی اختیاری dependencies، اس لیے engine خاموشی سے
  fail-open ہو جاتا ہے۔ `scripts/build/colocate-standalone.mjs` دونوں کو دوبارہ لاگو کرتا ہے (worker esbuild +
  اختیاری dependency closure کو اسٹینڈ الون tree میں)؛ یہ ہر build کے بعد
  `postbuild` npm hook کے ذریعے خودکار طور پر چلتا ہے۔ Idempotent ہے، اور dependencies موجود نہ ہوں تو fail-soft رہتا ہے۔

**تصدیق کریں کہ یہ فعال ہے:** LLMLingua منتخب ہونے پر، حقیقی نثری متن واقعی مختصر ہو جاتا ہے (engine
fail-open ہونا بند کر دیتا ہے)، اور پہلی درخواست model کو
`${DATA_DIR}/models/llmlingua` میں download کرنے کا آغاز کرتی ہے۔ gate دانستہ طور پر صرف `@atjsh/llmlingua-2` کو probe کرتا ہے —
دیگر peers صرف ESM ہیں اور موجود ہونے کے باوجود `require.resolve` ان پر error پھینکتا ہے — لہٰذا
اگر `import()` کے وقت کوئی peer واقعی غائب ہو تو worker بدستور fail-open ہو جاتا ہے۔

## اسٹیک شدہ پائپ لائنز

اسٹیک شدہ موڈ پائپ لائن کے مراحل کو ترتیب سے چلاتا ہے۔ ڈیفالٹ یہ ہے:

```txt
rtk -> caveman
```

اسے ان کوڈنگ ایجنٹ سیشنز کے لیے استعمال کریں جہاں کوئی پرامپٹ کمانڈ کے آؤٹ پٹ کو انسانی یا اسسٹنٹ کی نثر کے ساتھ یکجا کرتا ہو۔ RTK پہلے غیر ضروری تفصیلی ٹول لاگز کو کم کرتا ہے، پھر Caveman باقی قدرتی زبان کو کمپریس کرتا ہے۔

پائپ لائن کے مراحل کو کمپریشن سیٹنگز میں `stackedPipeline` کے ذریعے یا کمپریشن کومبوز کے ذریعے کنفیگر کیا جاتا ہے۔

جب دونوں انجن ایک ہی اہل پے لوڈ کو کم کرتے ہیں تو بچت مرکب ہو جاتی ہے:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP ایکسیسبیلٹی ٹری فلٹر

MCP ایکسیسبیلٹی ٹری اسمارٹ فلٹر، عمل درآمد کے بعد کی ایک کمپریشن تہہ ہے جو MCP کے **ٹول نتائج** پر چلتی ہے، پرامپٹس یا سیاق و سباق پر نہیں۔ یہ Playwright، computer-use، اور browser-automation MCP سرورز جیسے ٹولز کے ذریعے واپس کیے جانے والے تفصیلی ایکسیسبیلٹی ٹری اور براؤزر اسنیپ شاٹ پے لوڈز کو ہدف بناتی ہے۔

### یہ کیا کرتا ہے

1. **غیر ضروری مواد کا اخراج** — خالی عمومی/متنی اندراجات (`- generic:`, `- text: ""`) ہٹاتا ہے
2. **ہم سطح اندراجات کو سمیٹنا** — جب ≥ `collapseThreshold` (ڈیفالٹ 30) مسلسل لائنیں ساختی تکرار ہوں تو انہیں پہلی `collapseKeepHead` (ڈیفالٹ 10) لائنوں + تعداد کے خلاصے + آخری `collapseKeepTail` (ڈیفالٹ 5) لائنوں میں سمیٹ دیتا ہے
3. **ریفرنس کا تحفظ** — Playwright/computer-use کے لیے درکار `[ref=eXX]` اینکرز کو کبھی تبدیل نہیں کیا جاتا
4. **سخت قطع کرنا** — اگر سمیٹنے کے بعد متن اب بھی `maxTextChars` (ڈیفالٹ 50,000) سے تجاوز کرے تو اسے نیویگیشن کے اشارے کے ساتھ قطع کر دیتا ہے تاکہ ایجنٹ کام جاری رکھ سکے

### انجن کا مقام

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() کا نقطۂ آغاز
  collapseRepeated.ts ← ہم سطح اندراجات کو سمیٹنے کا الگورتھم
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### کنفیگریشن

عالمی سیٹنگز (مائیگریشن 056) میں `compression.mcpAccessibility` کے ذریعے کنٹرول کیا جاتا ہے۔ ڈیفالٹ کنفیگریشن:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

فلٹر صرف ان ٹول رزلٹ پے لوڈز پر لاگو ہوتا ہے جن کی `type`، `"text"` ہو اور جن کی لمبائی `minLengthToProcess` سے تجاوز کرتی ہو۔ یہ پرامپٹ کمپریشن یا ریکویسٹ پے لوڈز کو متاثر نہیں کرتا۔

### متوقع بچت

صفحے کی پیچیدگی کے لحاظ سے براؤزر اسنیپ شاٹ ٹول کے نتائج پر 60–80%۔ سمیٹنے کا الگورتھم لائنوں کی تعداد کے اعتبار سے O(n) ہے اور نہ ہونے کے برابر تاخیر شامل کرتا ہے۔

### یہ فلٹر بمقابلہ مذکورہ بالا کمپریشن انجنز

| پہلو          | Caveman / RTK / Stacked       | MCP ایکسیسبیلٹی فلٹر                   |
| ------------- | ----------------------------- | -------------------------------------- |
| ہدف           | ریکویسٹ پرامپٹس / سیاق و سباق | MCP ٹول کے نتائج                       |
| محرک          | کمپریشن موڈ کی سیٹنگ          | `compression.mcpAccessibility.enabled` |
| دائرۂ کار     | تمام SSE پیغامات              | صرف ٹول کے نتائج                       |
| ریفرنس اینکرز | لاگو نہیں                     | غیر مشروط طور پر محفوظ                 |

---

## کمپریشن کومبوز

کمپریشن کومبوز نامزد کمپریشن پروفائلز ہیں جنہیں روٹنگ کومبوز کے ساتھ منسلک کیا جا سکتا ہے:

- `compression_combos`: موڈ، پائپ لائن، RTK کنفیگ، زبان کی کنفیگ، اور ڈیفالٹ مارکر محفوظ کرتا ہے
- `compression_combo_assignments`: ایک کمپریشن کومبو کو روٹنگ کومبو سے میپ کرتا ہے
- رن ٹائم انٹیگریشن عمومی کومبو اوور رائیڈز سے پہلے منسلک کمپریشن کومبو کو ریزولو کرتی ہے
- اینالیٹکس میں `compression_combo_id` اور `engine` شامل ہوتے ہیں

ڈیش بورڈ میں مقام: `Dashboard -> Context & Cache -> Compression Combos`۔

## API سطح

| روٹ                                    | مقصد                                                       |
| -------------------------------------- | ---------------------------------------------------------- |
| `/api/settings/compression`            | عالمی کمپریشن سیٹنگز (`mcpAccessibility` کنفیگ سمیت)       |
| `/api/compression/preview`             | کسی بھی کمپریشن موڈ کا پیش منظر                            |
| `/api/compression/language-packs`      | دستیاب Caveman لینگویج پیکس کی فہرست                       |
| `/api/context/caveman/config`          | Caveman سیٹنگز کا عرف                                      |
| `/api/context/rtk/config`              | RTK ڈیفالٹس اور سیٹنگز                                     |
| `/api/context/rtk/filters`             | RTK فلٹر کیٹلاگ                                            |
| `/api/context/rtk/test`                | RTK پیش منظر/ٹیسٹ اینڈ پوائنٹ                              |
| `/api/context/rtk/raw-output/[id]`     | توثیق شدہ، حذف شدہ حساس معلومات والے خام آؤٹ پٹ کی بازیابی |
| `/api/context/combos`                  | کمپریشن کومبو CRUD                                         |
| `/api/context/combos/[id]/assignments` | روٹنگ کومبو اسائنمنٹ CRUD                                  |
| `/api/context/analytics`               | کمپریشن اینالیٹکس کا عرف                                   |

انتظامی روٹس کے لیے انتظامی توثیق یا API کلید کی پالیسی جانچ درکار ہے۔

## MCP ٹولز

کمپریشن پانچ MCP ٹولز فراہم کرتی ہے:

| ٹول                                 | دائرۂ کار           | مقصد                                   |
| ----------------------------------- | ------------------- | -------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | سیٹنگز، اینالیٹکس، کیش کے اعداد و شمار |
| `omniroute_compression_configure`   | `write:compression` | عالمی سیٹنگز اپ ڈیٹ کرنا               |
| `omniroute_set_compression_engine`  | `write:compression` | موڈ اور اختیاری پائپ لائن مقرر کرنا    |
| `omniroute_list_compression_combos` | `read:compression`  | کمپریشن کومبوز کی فہرست                |
| `omniroute_compression_combo_stats` | `read:compression`  | کومبو/انجن اینالیٹکس پڑھنا             |

## دائرۂ کار اور استثنا

**ایمبیڈنگز کو کبھی کمپریس نہیں کیا جاتا۔** `open-sse/handlers/embeddings.ts` کبھی بھی کسی
کمپریشن انجن کو کال نہیں کرتا — درخواست/جواب کی باڈیز بغیر کسی تبدیلی کے براہِ راست ایگزیکیوٹر
تک پہنچتی ہیں۔ فی الحال یہ ساختی نوعیت کا ہے (ایمبیڈنگز اور چیٹ کمپلیشنز کے ہینڈلرز الگ الگ ہیں)،
نہ کہ رن ٹائم جانچ، لیکن اس کا مطلب ہے کہ #8034 میں ویکٹر ڈسٹورشن سے متعلق تشویش کے لیے
ایمبیڈنگز کے راستے میں کوئی قابلِ اثر سطح موجود نہیں ہے۔

**فی ماڈل/اینڈ پوائنٹ استثنائی فلٹر (#8034)۔** چیٹ کمپلیشنز کے لیے، آپریٹر ایسے ماڈل
ids / `provider/model` اہداف متعین کر سکتا ہے جنہیں کبھی کمپریس نہیں کیا جانا چاہیے — یہ ایک
حفاظتی حد ہے جو اس صورت میں مفید ہے جب مستقبل میں کمپریشن کو ایمبیڈنگز سے ملحق کسی راستے
کے زیادہ قریب مربوط کیا جائے، اور عمومی طور پر ہر ایسے ماڈل کے لیے مفید ہے جس میں عین بائٹ بہ بائٹ
پرامپٹ اہم ہو (قطعی evals، کیش سے حساس سابقے وغیرہ)۔

- سیٹنگز فیلڈ: عالمی کمپریشن کنفیگ پر `exclusions?: string[]`
  (`GET`/`PUT /api/settings/compression`)، جسے موجودہ `key_value` کمپریشن
  نیم اسپیس (`src/lib/db/compression.ts`) کے ذریعے مستقل محفوظ کیا جاتا ہے — کوئی نئی ٹیبل نہیں۔
- ڈیش بورڈ ٹیب: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`)۔
- پیٹرن نحو: `*` واحد وائلڈ کارڈ ہے۔ پیٹرن میں موجود ہر دوسرے regex میٹا کریکٹر کو
  میچنگ سے پہلے escape کیا جاتا ہے، اس لیے `gpt-5.6` صرف عین اسی اسٹرنگ سے میچ کرتا ہے،
  کبھی بھی `gpt-5x6` سے نہیں (ReDoS سے محفوظ، محدود، اور nested quantifiers کے بغیر)۔ پیٹرنز
  bare model id اور `provider/model` مرکب، دونوں کے ساتھ case-insensitive انداز میں میچ کرتے
  ہیں — `gpt-5-6`، `openai/gpt-5-6`، اور `openai/*` سب کام کرتے ہیں، جبکہ صرف `*` ہر ماڈل
  کو مستثنیٰ کر دیتا ہے۔
- میچنگ: `open-sse/services/compression/exclusions.ts` میں
  `isCompressionExcluded()` / `normalizeCompressionExclusions()`۔ `chatCore.ts` کمپریشن
  سیٹنگز ریزولو کرنے کے فوراً بعد، **کسی بھی انجن کے چلنے سے پہلے** مستثنیٰ ہدف کی جانچ کرتا ہے،
  اور میچ کو بالکل ایسے ہی سمجھتا ہے جیسے کمپریشن عالمی طور پر غیر فعال ہو — درخواست کی باڈی
  ثابت شدہ طور پر بائٹ بہ بائٹ یکساں رہتی ہے۔ اینالیٹکس میں مرئیت کے لیے اس اسکیپ کو
  `writeCompressionSkip(..., "excluded")` کے ذریعے ریکارڈ کیا جاتا ہے۔
- ڈیفالٹ (خالی/غیر موجود فہرست): #8034 سے پہلے کے رویے کے عین مطابق — کچھ بھی مستثنیٰ نہیں ہوتا۔

## معلوم حدود

- **LLMLingua-2 (SLM) کو ایک ہی مقام پر موجود اختیاری dependencies درکار ہیں۔** worker صرف
  production build میں اس وقت چلتا ہے جب `@atjsh/llmlingua-2` + peers کو
  `dist/node_modules` میں ایک ہی مقام پر رکھا گیا ہو
  (`scripts/build/colocateOptionals.mjs`، #4286 دیکھیں)۔ ان کے بغیر
  engine ناکامی کی صورت میں اصل متن واپس کر دیتا ہے۔ worker resolution اب
  `import.meta.url` پر منحصر نہیں ہے (یہ standalone bundle میں ناکام ہو جاتا ہے) — اس کی بنیاد runtime
  cwd / `argv[1]` پر ہے۔
- **Caveman کے `de` / `fr` / `ja` language packs جزوی ہیں۔** ان میں `context` +
  `filler` + `structural` قواعد شامل ہیں، لیکن `dedup` / `ultra` packs نہیں، لہٰذا ان زبانوں کے لیے
  `ultra` intensity، `full` سے زیادہ طاقتور نہیں ہے (وہ صرف اپنے قواعد استعمال کرتی ہیں — English
  `dedup`/`ultra` قواعد کی جانب کوئی خاموش fall-back نہیں ہوتا، کیونکہ اس سے غیر ملکی متن بگڑ سکتا ہے)۔
  `en` / `es` / `id` / `pt-BR` مکمل ہیں۔ جزوی packs کے لیے `dedup.json` + `ultra.json`
  کی شراکتیں خوش آئند ہیں۔
- **Stacked telemetry صرف ان engines کو درج کرتی ہے جنہوں نے compression کی۔** stacked-pipeline کا ایسا مرحلہ جس کا
  engine چلا، مگر اس نے 0 % بچت پیدا کی، `stats:null` واپس کرتا ہے، اس لیے وہ
  `engineBreakdown` میں ظاہر نہیں ہوتا — اور ایسے مرحلے سے ناقابلِ امتیاز رہتا ہے جسے چھوڑ دیا گیا ہو۔
  "چلا، 0 %" اور "چھوڑ دیا گیا" میں فرق کرنے کے لیے breakdown-model میں تبدیلی درکار ہوگی، جسے مؤخر کر دیا گیا ہے۔

## توثیق

اس حصے کے لیے مرکوز gates یہ ہیں:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
