# Guardrails (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **مستند ماخذ:** `src/lib/guardrails/`
> **آخری تازہ کاری:** 2026-08-29 — v3.8.51 (Video Bridge ٹرانسکرپٹ کا ماخذ کالر کی جانب سے بیان کیا جاتا ہے،
> ابھی سرور سے تصدیق شدہ نہیں — #11661 کے مطابق وضاحت کی گئی)

Guardrails، OmniRoute اور اپ اسٹریم فراہم کنندگان کے درمیان حد پر حفاظت، پالیسی، اور مواد کی تبدیلیوں کو نافذ کرتے ہیں۔ ہر guardrail درخواست کے پے لوڈز (`preCall`) اور
اپ اسٹریم جوابات (`postCall`) کا معائنہ کر سکتا ہے (اور اختیاری طور پر انہیں مسترد، تبدیل، یا تشریح شدہ کر سکتا ہے)۔

سسٹم **fail-open** ہے: اگر عمل درآمد کے دوران کوئی guardrail استثنا پیدا کرے، تو رجسٹری
خرابی ریکارڈ کرتی ہے اور درخواست کو ناکام کرنے کے بجائے اگلے guardrail کے ساتھ جاری رہتی ہے۔
بلاک کرنا ایک واضح فیصلہ (`block: true`) ہے، کبھی بھی اتفاقی نتیجہ نہیں۔

## بلٹ اِن Guardrails

رجسٹری امپورٹ کے وقت ترجیحی ترتیب میں چھ guardrails خودکار طور پر لوڈ کرتی ہے
(`registry.ts` → `registerDefaultGuardrails()` دیکھیں):

| ترجیح | نام                 | مرحلہ (مراحل)  | فائل                  |
| ----- | ------------------- | -------------- | --------------------- |
| `5`   | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`   | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`   | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`  | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`  | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`  | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

کم ترجیحی نمبر **پہلے** چلتے ہیں۔

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

**غیر وژن ماڈلز** کے لیے بھیجی گئی، تصاویر پر مشتمل درخواستوں کو روکتا ہے اور یا تو
پوری درخواست کو وژن کی صلاحیت رکھنے والے ماڈل کی جانب دوبارہ بھیجتا ہے، یا
اپ اسٹریم کال سے پہلے تصویری حصوں کو ایک قابلِ ترتیب وژن ماڈل کی تیار کردہ متنی وضاحتوں سے بدل دیتا ہے۔ اس سے صرف متن سنبھالنے والے فراہم کنندگان شفاف انداز میں
ملٹی موڈل پے لوڈز کو سنبھال سکتے ہیں۔

عمل:

1. اگر ہدف ماڈل پہلے ہی وژن کو سپورٹ کرتا ہے تو اسے چھوڑ دیں (سوائے اس صورت کے کہ وہ
   جبری bridge فہرست `isVisionBridgeForcedModel` میں موجود ہو)۔
2. `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) کے ذریعے تصویری حصے اخذ کریں، جو
   `open-sse/utils/mediaParts.ts` میں موجود **متحدہ میڈیا
   ڈیٹیکٹر** `detectMediaParts()` کو ذمہ داری سونپتا ہے — یہ combo مطابقتی فلٹر کے ساتھ مشترک
   واحد مستند ماخذ ہے۔
   اخذ کرنے کا عمل صرف ان بالائی سطح کے حصوں کی منظور شدہ فہرست تک محدود ہے جنہیں
   `replaceImageParts` واپس جوڑ سکتا ہے (extract↔replace معاہدہ): OpenAI
   `image_url`، Anthropic base64 `source.type:"base64"`، Anthropic URL
   `source.type:"url"`، اور Responses API `input_image`۔ اندرونی طور پر موجود نتائج اور
   صرف اشارے پر مشتمل ساختیں combo-filter کا مواد ہیں اور کبھی اخذ نہیں کی جاتیں۔
   اگر کچھ نہ ملے تو چھوڑ دیں۔
3. `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) کے ذریعے رن ٹائم کنفیگریشن متعین کریں: نئی `modalityBridge*`
   ترتیبات کی keys کو ترجیح حاصل ہے؛ پرانی `visionBridge*` keys ایک **ایک-سائیکل
   fallback** (rollback window) کے طور پر برقرار رہتی ہیں۔ جب
   bridge غیر فعال ہو تو کسی بھی میڈیا traversal سے پہلے چھوڑ دیں۔
4. Mode selector (`modalityBridgeVisionMode`، ذیل کا جدول دیکھیں)
   reroute یا describe کا فیصلہ کرتا ہے۔ Reroute صرف `model`
   کو تبدیل کر کے `modifiedPayload` واپس کرتا ہے، نیز meta `{ rerouted, fromModel, toModel, imagesKept }`۔
5. Describe کا راستہ: تصاویر کو `maxImages` تک محدود کریں، کام سے آگاہ prompt مرتب کریں،
   describe cache سے رجوع کریں، وژن ماڈل کو **متوازی طور پر**
   (`Promise.allSettled`) کال کریں، اور ان کی جگہ `[Image N]: <description>` کے متنی حصے شامل کریں۔
   ناکام describe سے `null` ملتا ہے اور اصل تصویری حصہ
   **محفوظ** رہتا ہے (#4012) — سوائے combo describe راستے کے، جب ہر
   describe ناکام ہو؛ اس صورت میں تصدیق شدہ غیر وژن اپ اسٹریم کو اس کے بجائے
   `(دستیاب نہیں — کوئی وژن کی صلاحیت رکھنے والا فراہم کنندہ منسلک نہیں)` stub ملتا ہے (#8430)۔
6. `modifiedPayload` + meta (`imagesProcessed`، `descriptions`،
   `processingTimeMs`، `visionModel`) واپس کریں۔

#### Mode selector (`modalityBridgeVisionMode`)

| موڈ        | ڈیفالٹ | طرزِ عمل                                                                                                                                                                                                                                                                                                      |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | سابقہ heuristic، بلا تبدیلی (#6640/#7204): غیر combo/`auto/` ماڈلز بہترین وژن ماڈل کی جانب reroute ہوتے ہیں، سوائے اس کے کہ اصل ماڈل کے پاس پہلے ہی قابلِ استعمال credentials ہوں (تب describe کیا جاتا ہے)؛ combo اہداف ہمیشہ describe ہوتے ہیں۔                                                             |
| `describe` |        | ہمیشہ describe کریں — reroute بلاک مکمل طور پر نظر انداز کر دیا جاتا ہے؛ صارف کا منتخب کردہ ماڈل ہمیشہ جواب دیتا ہے۔                                                                                                                                                                                          |
| `reroute`  |        | جبری reroute: credential والے ماڈل کو برقرار رکھنے والا guard نظر انداز کر دیا جاتا ہے۔ reroute کے **ہدف** کا credential guard پھر بھی لاگو ہوتا ہے — جب کوئی قابلِ استعمال وژن ہدف موجود نہ ہو، تو درخواست describe کی جانب منتقل ہو جاتی ہے تاکہ خام تصاویر کبھی صرف متن والے backend تک نہ پہنچیں (#8430)۔ |

جبری موڈز، auto heuristic کے چلنے سے **پہلے** ہی عمل کو مختصر کر دیتے ہیں؛ `auto` کا طرزِ عمل
PR-1 سے پہلے کے guardrail سے byte-identical ہے۔

#### کام سے آگاہ describe prompt (`modalityBridgeVisionTaskAware`)

ڈیفالٹ **true** ہے۔ `composeVisionPrompt()` (`visionBridgeHelpers.ts`)، بنیادی
describe prompt کے ساتھ **آخری صارف پیغام** کا متن (500 حروف تک محدود) شامل کرتا ہے،
جس سے وضاحت اس جانب رہنمائی پاتی ہے جو صارف نے حقیقتاً پوچھا تھا
(codex-vision-proxy pattern)، اور وژن ماڈل سے مرئی متن کو نقل کرنے کا کہا جاتا ہے۔
flag بند ہونے پر — یا صارف کا متن موجود نہ ہونے پر — بنیادی prompt بلا تبدیلی استعمال ہوتا ہے۔

describe سیلف لوپ کی اپنی OpenAI-مطابقت پذیر درخواست (`callVisionModelSingle()`
در `visionBridgeHelpers.ts`) ہمیشہ `image_url.detail: "high"` کی درخواست کرتی ہے —
بلاشرط، ہر کالر/فراہم کنندہ کے لیے، اور کسی کلائنٹ سگنل سے مشروط نہیں۔
کم تفصیل والی سیمپلنگ عین اسی متن کی نقل نویسی کے کام کے لیے OCR کی درستگی
گھٹا دیتی ہے جس کا یہ پرامپٹ تقاضا کرتا ہے، اس لیے describe کال خود ہمیشہ اعلیٰ
تفصیل کی درخواست کرتی ہے، خواہ اصل آنے والی درخواست نے کوئی بھی تفصیلی سطح استعمال
کی ہو۔ یہ صرف داخلی describe درخواست کی باڈی کو متاثر کرتا ہے؛ اس سے یہ تبدیل
نہیں ہوتا کہ OmniRoute بنیادی درخواست میں کالر کے اپنے `image_url.detail` کو کیسے
آگے بھیجتا ہے — وہ ڈیفالٹ الگ سے لاگو ہوتا ہے، اور صرف شناخت شدہ OpenCode کلائنٹس
کے لیے، `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) میں۔
describe سیلف لوپ کی Anthropic وائر فارمیٹ شاخ میں کوئی `detail` فیلڈ نہیں ہے
اور دونوں میں سے کسی ڈیفالٹ سے متاثر نہیں ہوتی۔

#### Describe آؤٹ پٹ کی حد (`modalityBridgeVisionMaxChars`)

| کلید                           | ڈیفالٹ | حد               |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` یا 100–50000 |

`0` (ڈیفالٹ) کا مطلب ہے **کوئی حد نہیں** — `callVisionModel()` کی واپس کردہ
تفصیل بغیر کسی تبدیلی کے آگے بھیج دی جاتی ہے، جس سے موجودہ طرزِ عمل برقرار رہتا
ہے۔ 100–50000 کی حد میں کوئی بھی قدر، تفصیل کو واپس
`[Image N]: <description>` کے طور پر شامل کیے جانے سے پہلے `…` لاحقے کے ساتھ
مختصر کر دیتی ہے (`src/lib/guardrails/visionBridge.ts` میں
`VisionBridgeGuardrail.preCall()`)۔ ایسی تفصیل طلب OCR کارروائیوں کے لیے اسے
بڑھائیں جہاں ڈاؤن اسٹریم ماڈل کو مکمل نقل نویسی درکار ہو؛ زیادہ گفتگو کرنے والے
وژن ماڈلز پر ٹوکن کے استعمال کو محدود رکھنے کے لیے اسے کم کریں۔
ڈیش بورڈ فیلڈ Vision ٹیب کے Advanced پینل میں موجود ہے
(`ModalityBridgeVisionTab.tsx` میں `modality-bridge-max-chars`) اور 1 سے 99 کے
درمیان کسی بھی قدر کو کم از کم 100 تک محدود کر دیتا ہے، جبکہ واضح `0` کو
بغیر تبدیلی کے چھوڑتا ہے — `0` بذاتِ خود ایک درست Zod قدر ہے
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`)، محض
"غیر مقرر" ڈیفالٹ نہیں۔

#### Describe کیش (`modalityBridge/bridgeCache.ts`)

describe آؤٹ پٹس کے لیے اِن-میموری LRU + TTL کیش، جو پورے پروسیس میں مشترک ہے۔
کلید = `sha256(imageRef + composedPrompt + configuredBridgeModel)`، طوالت-سابقہ
فریمنگ کے ساتھ (فیلڈ کی حدود کے ٹکراؤ کے بغیر)۔ ماڈل جزو **ترتیب دیا گیا**
بریج ماڈل ہے، نہ کہ وہ ماڈل جس نے حقیقتاً جواب دیا —
`callVisionModel` داخلی طور پر فال بیک کر سکتا ہے، اور ہر کوشش کے لحاظ سے کلید
بنانا کیش کو منتشر کر دے گا۔ ناکام describes کبھی کیش نہیں کیے جاتے۔ ترتیبات:

| کلید                            | ڈیفالٹ | حد      |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### ریموٹ امیج نارملائزیشن (سیلف لوپ describe/base64 فیچ)

جب بریج خود کوئی **ریموٹ** امیج فیچ کرتا ہے — Anthropic describe سیلف کال اور
claude وائر فارمیٹ base64 تبدیلی (`ensureBase64ImagesForClaudeWire`)، دونوں
`visionBridgeHelpers.ts` میں `fetchRemoteImageAsDataUri()` کے ذریعے — تو نتیجے
میں حاصل ہونے والا ڈیٹا URI، وژن ماڈل کی درخواست میں شامل کیے جانے سے پہلے
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) سے گزارا جاتا ہے۔
ضرورت سے زیادہ بڑی امیجز کو **2048px طویل کنارے** تک گھٹا دیا جاتا ہے (اسی
ری سائز حد کے مطابق جسے OpenAI/Anthropic پہلے ہی سرور کی جانب لاگو کرتے ہیں)،
جس سے وژن ماڈل کو نظر آنے والی چیز تبدیل کیے بغیر اپ لوڈ بائٹس/تاخیر کم ہوتی ہے۔
ری سائزنگ `sharp` استعمال کرتی ہے، جسے ڈائنامک امپورٹ کے ذریعے لوڈ کیا جاتا ہے:
کسی ایسے پلیٹ فارم پر جہاں اس کی مقامی بائنری لوڈ ہونے میں ناکام ہو،
`normalizeDataUri()` **کبھی استثنا نہیں پھینکتا** — یہ اصل بائٹس کو جوں کا توں
آگے بھیجنے پر فال بیک کرتا ہے، لہٰذا describe/base64-تبدیلی کا راستہ ہمیشہ کام
کرتا رہتا ہے۔ غیر امیج بائٹس (ایسا فیچ جس نے قابلِ ڈی کوڈ امیج واپس نہ کی ہو)
بھی بغیر تبدیلی کے آگے بھیج دی جاتی ہیں۔ یہ نارملائزیشن صرف ان امیجز تک محدود
ہے جنہیں بریج اپنی سیلف کال کے لیے فیچ کرتا ہے — اسے کالر کے خام پاس تھرو پے لوڈ
پر کبھی لاگو نہیں کیا جاتا، جو صرف واضح اجازت پر تبدیلی کے اصول
(Hard Rule #20) سے مطابقت رکھتا ہے۔

#### ترتیبات کا اسکیما + مائیگریشن

نئی `modalityBridge*` کلیدیں `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) میں Zod سے توثیق شدہ ہیں:
`modalityBridgeVisionEnabled`، `modalityBridgeVisionMode`،
`modalityBridgeVisionModel`، `modalityBridgeVisionTaskAware`،
`modalityBridgeVisionPrompt`، `modalityBridgeVisionTimeout`،
`modalityBridgeVisionMaxImages`، `modalityBridgeVisionMaxChars`،
`modalityBridgeCache*` کی تینوں کلیدیں، اور Audio Bridge کے زیرِ استعمال
`modalityBridgeAudio*` گروپ۔ مائیگریشن `141_modality_bridge_settings.sql`
موجودہ لیگیسی `visionBridge*` اقدار کو مماثل نئی کلیدوں میں نقل کرتی ہے
(آئیڈیم پوٹنٹ، اور آپریٹر کی مقرر کردہ `modalityBridge*` قدر کو کبھی اوور رائٹ
نہیں کرتی)؛ لیگیسی کلیدیں ایک ریلیز سائیکل کے لیے ریڈ فال بیک کے طور پر قبول
رہتی ہیں۔

#### شفافیت ہیڈر + اعداد و شمار

Describe سے تبدیل شدہ جوابات میں
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
شامل ہوتا ہے (`modalityBridge/bridgeStats.ts` میں
`buildModalityBridgeHeader()` سے تیار کردہ، اور
`src/sse/handlers/chatHelpers.ts` میں `withModalityBridgeHeader()` کے ذریعے
لگایا گیا)۔ دوبارہ روٹ کی گئی درخواستوں کو **کوئی** ہیڈر نہیں ملتا — پے لوڈ
بغیر تبدیلی کے تھا اور ماڈل کی تبدیلی پہلے ہی جوابی باڈی کے `model` فیلڈ میں
نظر آتی ہے۔

`GET /api/modality-bridge/stats` (انتظامی توثیق، وہی درجہ جو
`GET /api/settings` کا ہے) `vision`، `audio`، اور `video` کے لیے اِن-میموری
فی موڈیلٹی کاؤنٹرز
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` واپس کرتا ہے۔
`averageLatencyMs` اپنے مخرج کے طور پر تمام کوششوں کے بجائے `latencySamples`
استعمال کرتا ہے؛ وقت بندی کے بغیر کوئی کارروائی فرضی صفر ملی سیکنڈ سیمپل تخلیق
نہیں کرتی۔ `bridged` کامیاب تبدیلیوں کے لیے سابقہ مطابقت رکھنے والا عرف رہتا ہے؛
ناکام کوششیں اسے نہیں بڑھاتیں۔
کاؤنٹرز ڈیزائن کے مطابق پروسیس دوبارہ شروع ہونے پر ری سیٹ ہو جاتے ہیں
(ٹیلی میٹری، اکاؤنٹنگ نہیں)۔

#### ڈیش بورڈ کی تشکیل

مخصوص ڈیش بورڈ صفحہ
`/dashboard/settings/modality-bridge` ہے۔ اس کے URL کے ذریعے قابلِ رسائی `Vision`، `Audio`،
اور `Video` ٹیبز، `tab` کی قدر تبدیل کرتے وقت query parameters محفوظ رکھتے ہیں۔
Vision ٹیب فعال کاری، موڈ، ماڈل کا انتخاب (بشمول خودکار
ڈیفالٹ)، ٹاسک سے آگاہ prompting، timeout/image/description-length/cache کی جدید
حدود، runtime
کاؤنٹرز، اور حفاظتی پابندیوں کے ساتھ ایک نمونہ درخواست فراہم کرتا ہے۔ Audio ٹیب بھی فعال ہے: یہ
فعال کاری، Auto کے ساتھ صرف STT ماڈل picker، timeout/max-clip حدود، آڈیو
کاؤنٹرز، اور ایک `input_audio` نمونہ ٹیسٹ فراہم کرتا ہے۔ Video ٹیب مکمل طور پر فعال ہے: یہ
FFmpeg/ffprobe کی runtime حالت دکھاتا ہے — چار واضح UI حالتوں میں سے ایک (`unknown` جب
probe جاری ہو یا مکمل نہ ہو سکا ہو، `restricted` ایسے non-loopback
ڈیش بورڈ host پر جہاں probe کو client-side چھوڑ دیا جاتا ہے، `unavailable` جب probe
کے بعد اس کی عدم دستیابی کی تصدیق ہو جائے، یا FFmpeg/ffprobe ورژنز کے ساتھ `available`) — فعال
کاری/model/frame/video/timeout حدود کو برقرار رکھتا ہے، model picker کو vision-capable
ماڈلز تک محدود کرتا ہے، اور ویڈیو کاؤنٹرز فراہم کرتا ہے۔

AI ترتیبات کے تحت سابقہ Vision Bridge کارڈ اب نئے صفحے کے لیے compatibility link ہے؛
اب یہ فارم کی دوسری نقل کا مالک نہیں ہے۔ Media Providers بھی
موجودہ Speech-to-Text playground کو ہٹائے بغیر Image-to-Text اور Speech-to-Text
workflows کو متعلقہ Modality Bridge ٹیبز سے منسلک کرتا ہے۔

**Self-loop admission bypass:** جب describe call کو OmniRoute کے اپنے
`/v1` self-loop (غیر معیاری provider model) کے ذریعے route کیا جاتا ہے، تو sub-request
`x-omniroute-admission-bypass: internal` بھیجتی ہے اور resolved
self-loop credential کے ساتھ authenticated ہوتی ہے — local mode میں مقامی `sk_omniroute`
sentinel، یا operator کی ترتیب کردہ `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350)، تاکہ
`REQUIRE_API_KEY=true` deployments بھی describe call چلا سکیں۔ bypass
صرف انہی عین credentials کے لیے قبول کیا جاتا ہے، اس لیے external clients اس
header کو admission چھوڑنے کے لیے استعمال نہیں کر سکتے۔

Legacy defaults، `src/shared/constants/visionBridgeDefaults.ts` میں موجود ہیں؛
نئے mode/task-aware/cache defaults اور settings resolver
`src/shared/constants/modalityBridgeDefaults.ts` میں موجود ہیں۔ guardrail ایک
`deps` constructor option فراہم کرتا ہے تاکہ tests جعلی `getSettings` اور
`callVisionModel` implementations inject کر سکیں۔

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

آڈیو پر مشتمل chat requests کو کسی ایسے target تک پہنچنے سے پہلے intercept کرتا ہے جس کے بارے میں
یہ معلوم نہ ہو کہ وہ audio input قبول کرتا ہے۔ یہ کبھی بھی chat request کو reroute نہیں کرتا: audio parts کو
موجودہ OpenAI-compatible multipart endpoint کے ذریعے transcribe کیا جاتا ہے اور
منتخب chat model متنی transcripts کے ساتھ جاری رہتا ہے۔

عمل:

1. `getResolvedModelCapabilities()` کے ذریعے `supportsAudio` کو resolve کریں۔ واضح
   provider-registry metadata کو ترجیح حاصل ہوتی ہے، اس کے بعد static model metadata، پھر synced
   `modalities_input`۔ `audio` کے بغیر اعلان کردہ input list کی قدر `false` ہوتی ہے؛
   capability کا کوئی ثبوت نہ ہونے پر قدر `null` رہتی ہے۔ `false` اور `null` دونوں
   conservative bridge کو فعال کرتے ہیں، جبکہ `true` اسے bypass کرتا ہے۔
2. `modalityBridgeAudio*` ترتیبات کو resolve کریں اور مشترکہ `detectMediaParts()`
   detector کے ذریعے ہر message سے splice کیے جا سکنے والے top-level
   audio parts اخذ کریں۔ معاون wire shapes میں OpenAI `input_audio`، `audio_url`، اور
   `source.media_type: "audio/*"` شامل ہیں۔ Nested audio کو routing کے لیے detect کیا جاتا ہے لیکن
   splice path کے ذریعے ہٹایا نہیں جاتا۔ کام کی حد `modalityBridgeAudioMaxClips` سے مقرر ہوتی ہے؛
   بعد کے parts بغیر تبدیلی کے رہتے ہیں۔
3. ترتیب کردہ `provider/model` کا لحاظ رکھیں، یا `selectAudioBridgeModel()` کو
   stable catalog order میں `AUDIO_TRANSCRIPTION_PROVIDERS` کا جائزہ لینے دیں اور قابلِ استعمال
   active provider credential والا پہلا ماڈل منتخب کرنے دیں۔
4. `callAudioTranscription()`، base64/data-URI آڈیو کو multipart
   `file` میں تبدیل کرتا ہے، یا DNS pinning اور 25 MB حد کے ساتھ public-only outbound
   guard کے ذریعے remote `audio_url` download کرتا ہے۔ پھر یہ file اور منتخب
   model کو local `/v1/audio/transcriptions` self-loop پر POST کرتا ہے، جسے
   `resolveSelfLoopBearer()` کے ساتھ authenticate کیا جاتا ہے۔ موجودہ transcription route معمول کی
   credential lookup، cooldown/rate-limit handling، اور provider dispatch انجام دیتا ہے۔
5. کامیاب calls اپنے parts کو `[Audio N]: <transcript>` سے بدل دیتی ہیں۔ Calls
   `Promise.allSettled` کے ساتھ چلتی ہیں: انفرادی failure اس اصل
   audio part کو محفوظ رکھتی ہے (#4012 contract)۔ اگر ہر call ناکام ہو جائے اور target کے بارے میں ثابت ہو
   کہ `supportsAudio === false` ہے، تو parts
   `[Audio N]: (unavailable — no STT provider connected)` بن جاتے ہیں (#8430 contract)۔ کسی
   نامعلوم target (`null`) کے لیے all-failure نتیجہ بغیر تبدیلی کے رہتا ہے۔ کوئی ثابت شدہ
   text-only target جس کے پاس قابلِ استعمال STT credential نہ ہو، network call کیے بغیر یہی واضح
   stub وصول کرتا ہے۔

کامیاب transcripts، process-wide Modality Bridge LRU/TTL cache استعمال کرتے ہیں۔
key میں audio reference، مستحکم `audio-transcription` operation
label، اور منتخب STT model شامل ہوتے ہیں؛ failures کو کبھی cache نہیں کیا جاتا۔ Audio attempts مشترکہ
`bridged`، `cacheHits`، `failures`، اور `lastUsedAt` کاؤنٹرز update کرتی ہیں۔
تبدیل شدہ responses میں
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` شامل ہوتا ہے؛ بغیر تبدیلی کی
requests کو Audio Bridge segment نہیں ملتا۔

Runtime ترتیبات DB-backed اور Zod-validated ہیں:

| کلید                          | ڈیفالٹ  | حد             |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto یا STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

مشترکہ cache بدستور `modalityBridgeCacheEnabled`،
`modalityBridgeCacheTtlMinutes`، اور `modalityBridgeCacheMaxEntries` کے ذریعے کنٹرول ہوتی ہے۔

### Video Bridge (`videoBridge.ts`، `videoBridgePipeline.ts`)

معلوم مقامی ویڈیو سپورٹ نہ رکھنے والے ہدف کو کال کیے جانے سے پہلے، Chat Completions کے `messages` اور Responses API کے `input` میں اعلیٰ سطحی ویڈیو حصوں کو روکتا ہے۔ معاون ساختوں میں `input_video`، `video_url`، `video_source`، HTTPS URLs، اور `data:video/*;base64,...` ڈیٹا URIs شامل ہیں۔ متن میں موجود سادہ فائل ناموں کو ویڈیو تصور نہیں کیا جاتا۔

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) درخواست کی ٹریورسل، صلاحیت/پالیسی کی جانچ، فی درخواست مجموعہ بندی، اور جوابی پے لوڈ کا ذمہ دار ہے۔ فی ویڈیو کام — حصول، مکمل نتیجے کا کیش، فریموں کی ترتیب کی وضاحت (جو کالر کی فراہم کردہ آڈیو ٹرانسکرپٹ کو یکجا کرتی ہے)، اور فی کوشش میٹرکس/منسوخی/صفائی — `videoBridgePipeline.ts` میں `processVideoPart` کے پیچھے پوشیدہ ہے، جسے `preCall` کے لوپ کے اندر ہر ویڈیو حصے کے لیے ایک مرتبہ کال کیا جاتا ہے۔ یہ ماڈیول واضح پورٹ حدود `VideoMediaBrokerPort` (بائٹس حاصل کرنا اور نمونہ شدہ فریم نکالنا)، `VideoAudioTranscriptionPort` (کالر کی فراہم کردہ آڈیو ٹرانسکرپٹ کو نمونہ شدہ کیپشنز کے ساتھ یکجا کرنا)، اور `VideoDrilldownPort` (فریم ڈرل ڈاؤن کی استمراری حد؛ ابھی `processVideoPart` سے منسلک نہیں — فی الحال صرف علیحدہ `/api/modality-bridge/video/drilldown` روٹ ڈرل ڈاؤن اندراجات لکھتا ہے) بھی متعین کرتا ہے۔

عوامی `/v1` درخواست کا راستہ کبھی کسی ذیلی عمل کو درآمد یا شروع نہیں کرتا۔ ریموٹ ویڈیوز 50 MiB کی حد کے تحت ڈاؤن لوڈ کی جاتی ہیں؛ اِن لائن base64 ویڈیوز کے لیے فی ویڈیو ڈی کوڈ شدہ حجم کی محتاط حد 36 MiB ہے، تاکہ ماڈل/پیغامات/فریمنگ کا لفافہ 50 MiB کی عوامی JSON درخواست قبولیت کی حد کے اندر رہ سکے۔ مختص کرنے سے پہلے اِن لائن طوالت اور ڈی کوڈ شدہ حجم کے تخمینوں کی جانچ کی جاتی ہے۔ ابتدائی ریموٹ URL اور ہر ری ڈائریکٹ پر HTTPS لازم ہے، اور اس کے لیے DNS پننگ کے ساتھ موجودہ صرف عوامی آؤٹ باؤنڈ محافظ استعمال کیا جاتا ہے۔ اس کے بعد بائٹس عین داخلی `POST /api/modality-bridge/video/extract` بروکر حد کو عبور کرتی ہیں۔ یہ روٹ `LOCAL_ONLY` اور `SPAWN_CAPABLE` دونوں ہے، صرف فی عمل توثیق شدہ، قابل اعتماد loopback درخواست قبول کرتا ہے، اور کبھی کوئی URL، فائل سسٹم پاتھ، executable، یا دلائل کی فہرست قبول نہیں کرتا۔ API کی باڈی سائز پائپ لائن اور ہینڈلر کا افزایشی باڈی ریڈر آزادانہ طور پر 50 MiB کی بروکر اِن پٹ حد نافذ کرتے ہیں۔ اس کی محدود قطار ایک وقت میں ایک extraction چلاتی ہے، چار زیر التوا jobs کی اجازت دیتی ہے، اور زیر التوا اِن پٹ کو 100 MiB تک محدود رکھتی ہے۔

بروکر کے اندر، `ffprobe` ایک نجی مقامی فائل پڑھتا ہے؛ مقررہ format allowlist میں playlist اور manifest فارمیٹس شامل نہیں ہیں۔ اجازت یافتہ MOV-family containers کے لیے، بیرونی MOV data references بطور ڈیفالٹ غیر فعال رہتے ہیں، اور مقررہ کمانڈ انہیں فعال نہیں کرتی۔ `ffprobe` اور `ffmpeg` دونوں صرف `file` پر مشتمل protocol whitelist، ایک thread، مقررہ argument arrays، بغیر shell، اور `PATH` سے حل کیے گئے executables استعمال کرتے ہیں۔ attached-picture cover streams قابلِ پلے امیدوار نہیں ہیں۔ تمام قابلِ پلے streams کو حدود پر پورا اترنا ضروری ہے، اور deterministic کم ترین index fallback سے پہلے صریح default stream کو ترجیح دی جاتی ہے۔ ویڈیوز کو 600 سیکنڈ، فی dimension 8,192 pixels، اور 33,554,432 source pixels تک محدود رکھا جاتا ہے۔ FFmpeg وسطی مقامات سے 1–16 JPEG frames کا نمونہ لیتا ہے، چھوٹے inputs کو upscale کیے بغیر طویل کنارے کو زیادہ سے زیادہ 1,024 pixels تک گھٹاتا ہے، اور اسے کبھی URL نہیں دیا جاتا۔ بطور ڈیفالٹ sampling پالیسی `uniform` ہے۔ اختیاری `scene_aware` اور تجرباتی `segment_aware` پالیسیاں پہلے سے توثیق شدہ مقامی stream پر ایک اضافی مقررہ FFmpeg pass انجام دیتی ہیں، محدود `showinfo` scene timestamps منتخب کرتی ہیں، اور detector کی ناکامی، timeout، خراب output، یا خالی candidate set کی صورت میں deterministic انداز سے انہی uniform midpoints پر واپس آتی ہیں۔ Segment-aware موڈ توثیق شدہ scene intervals کے تناسب سے midpoint samples مختص کرتا ہے؛ segment-aware شواہد اور fallback رویے کی تفصیل ذیل میں دی گئی ہے۔ انتخاب کے بعد ہر پالیسی میں 16-frame کی سخت حد لاگو ہوتی ہے۔ جب scene-aware درخواست کا budget صرف ایک frame ہو تو یہ فعال مکمل ویڈیو یا focus window کا uniform midpoint استعمال کرتی ہے اور `policyEffective: uniform` رپورٹ کرتی ہے: ایک واحد منتخب scene frame دونوں زمانی سروں کو محفوظ نہیں رکھ سکتا۔ کالر اختیاری طور پر ایک محدود focus window (`start`/`end` سیکنڈز) فراہم کر سکتا ہے؛ حدود کو میڈیا کی مدت تک محدود کیا جاتا ہے، معکوس یا غیر محدود windows مسترد کر دی جاتی ہیں، اور تمام sampling پالیسیاں صرف normalized interval کے اندر انجام دی جاتی ہیں۔ نتیجے میں حاصل ہونے والی window کو sampling metadata اور غیر قابل اعتماد description prefix میں شامل کیا جاتا ہے، تاکہ downstream models کسی مرکوز اقتباس کو مکمل timeline سے ممتاز کر سکیں۔

معنوی caption focus ایک علیحدہ، صریح ترتیب ہے۔ ڈیفالٹ `full` analysis mode موجودہ frame prompt کو برقرار رکھتا ہے اور درخواست کا متن کبھی caption model کو نہیں بھیجتا۔ `focused` mode میں، bridge اسی Chat یا Responses container سے صرف صارف کا لکھا ہوا تازہ ترین غیر خالی `text`/`input_text` پڑھتا ہے، اسے NFC میں normalize کرتا ہے، control characters اور whitespace کو سکیڑتا ہے، اور اسے 500 Unicode code points تک محدود کرتا ہے۔ خالی نتیجہ بالکل اسی `full` prompt پر واپس آ جاتا ہے۔ قابل استعمال hint کو ایک مخصوص untrusted-user-context block میں JSON کے طور پر serialize کیا جاتا ہے اور وہ صرف قابل مشاہدہ تفصیلات کو ترجیح دے سکتا ہے؛ وہ میڈیا میں نظر آنے یا سنائی دینے والی ہدایات پر عمل نہ کرنے سے متعلق علیحدہ تنبیہ کو override نہیں کر سکتا۔ متنی focus کبھی `start`/`end` اخذ نہیں کرتا اور نہ ہی temporal sampler کو تبدیل کرتا ہے۔

#### FU-07 ساختی segment کے شواہد

`segment_aware` پہلے سے توثیق شدہ مقامی video stream پر ایک محدود pre-analysis pass استعمال کرتا ہے۔ مقررہ filter chain پہلے چوڑائی کو زیادہ سے زیادہ 320 pixels تک scale کرتی ہے، scene changes اور منجمد intervals کا پتا لگاتی ہے، پھر blur، average luma، اور spatial/temporal information کے لیے فی سیکنڈ 1 frame کا نمونہ لیتی ہے۔ یہ pass 600 structural samples، ایک FFmpeg/filter thread، انہی صرف `file` پر مشتمل protocol اور container allowlists، 1 MiB process-output حد، اور بروکر کے مشترکہ abort/deadline کے اندر زیادہ سے زیادہ 30 سیکنڈ تک محدود ہے۔ یہ درخواست سے کبھی کوئی command، filter، path، یا URL قبول نہیں کرتا۔

ساختی اقدار قطعی سیمپلنگ کے شواہد ہیں، معنوی ویڈیو فہم نہیں۔
یہ موضوعات، افعال، کیپشنز، گفتگو، یا صارف کے ارادے کا استنباط نہیں کرتیں۔
منظر اور فریز کی حدود سیگمنٹس بناتی ہیں؛ فریز کوریج، دھندلاپن،
ایکسپوژر، مکانی تفصیل، اور زمانی تبدیلی صرف اس بات پر اثر انداز ہوتے ہیں کہ موجودہ
1–16 فریم بجٹ کیسے مختص کیا جاتا ہے۔ مکمل طور پر فریز شدہ سیگمنٹ کو زیادہ سے زیادہ ایک فریم
دیا جاتا ہے، جبکہ غیر فریز شدہ سیگمنٹس باقی بجٹ کے لیے مقابلہ کرتے ہیں۔ جب حدود
فریموں سے زیادہ ہوں، تو ٹائم لائن کی یکساں کوریج برقرار رکھی جاتی ہے تاکہ ابتدائی تیز رفتار کٹس
کسی طویل آخری سیگمنٹ کو چھپا نہ سکیں۔ فریز باؤنڈری کی 1 سیکنڈ کی
تجزیاتی ریزولیوشن کے اندر موجود منظر کی حدود کو یکجا کر دیا جاتا ہے۔

غائب فلٹرز، خراب ساخت والے/خالی شواہد، ڈیٹیکٹر کی خرابی، یا محدود
قبل از تجزیہ ٹائم آؤٹ کی صورت میں عین یکساں وسطی نقطے کی پالیسی پر کھلے انداز میں واپسی ہوتی ہے۔
کالر کی منسوخی یا بروکر کی ڈیڈ لائن کی صورت میں یہ واپسی نہیں ہوتی: یہ زیرِ عمل
ذیلی عمل کو ختم کرتی ہے، بعد میں فریم نکالنے سے روکتی ہے، اور نجی عارضی درخت
کو `finally` میں ہٹا دیا جاتا ہے۔

`scripts/perf/video-bridge-fu07-eval.ts` ڈی ڈپلیکیشن کے بعد کیپشن کال کی بچت،
کثیف حرکت کے بجٹ کی تخصیص، دھندلاپن/ایکسپوژر/SI-TI شواہد، طویل اختتامی حصے کے ساتھ تیز رفتار کٹس،
اور تدریجی فیڈ کے غلط مثبت نتائج کے لیے قطعی حقیقی FFmpeg
فکسچرز بناتی ہے۔ یہ قبل از تجزیہ وال ٹائم، اور جہاں `/usr/bin/time`
دستیاب ہو وہاں چائلڈ CPU اور چوٹی RSS ریکارڈ کرتی ہے۔ اس کے معیار کے جائزے صرف ساختی اوریکلز
ہیں۔ حقیقی کیپشن ماڈل کا معیار `HOLD` رہتا ہے کیونکہ اس ہارنس کے پاس کوئی
مجاز اینڈ پوائنٹ یا منجمد جج نہیں ہے۔ مالی بچت بھی `HOLD`
رہتی ہے، جب تک `--caption-cost-per-call-usd` فی کال لاگت کا واضح مثبت
تخمینہ فراہم نہ کرے؛ اسکرپٹ کبھی بھی ان میں سے کسی نتیجے کو من گھڑت طور پر تیار نہیں کرتی۔

ہر فریم 4 MiB، تمام خام فریم مجموعی طور پر 23 MiB، اور
سیریلائز شدہ بروکر جواب 32 MiB تک محدود ہے۔ ایک نجی عارضی ڈائریکٹری کو
`finally` میں ہٹا دیا جاتا ہے۔ OmniRoute میں FFmpeg شامل نہیں ہے اور یہ کسی حسبِ ضرورت
قابلِ اجرا فائل کا راستہ قبول نہیں کرتا۔ کیپشننگ سے پہلے، برج ایک محتاط بصری
ڈی ڈپلیکیشن مرحلہ لاگو کرتا ہے: ہر JPEG کو 16×16 گرے اسکیل بفر تک گھٹایا جاتا ہے اور
اس کا موازنہ صرف آخری برقرار رکھے گئے فریم سے کیا جاتا ہے۔ ایک سے زیادہ فریم کے مطلوبہ کیپشن بجٹ
کے لیے، اخراج اس بجٹ سے زیادہ سے زیادہ دو گنا اور کبھی بھی 16 فریم سے زیادہ نہ ہونے والا
محدود امیدوار پول فراہم کرتا ہے۔
مطلوبہ حد صرف ڈی ڈپلیکیشن کے بعد لاگو کی جاتی ہے، اور جب بجٹ کم از کم
دو ہو تو حتمی چھٹائی کے دوران پہلے اور آخری منتخب امیدوار محفوظ رکھے جاتے ہیں۔
ورژن شدہ
`grayscale-16x16-mean-cells-v2` پالیسی اوسط لیوما ڈیلٹا اور
ان تھمب نیل سیلز کے تناسب میں سے بڑی قدر استعمال کرتی ہے جن کا نارملائزڈ ڈیلٹا کم از کم 0.05 ہو۔
ڈپلیکیٹ حد مستقل 0.04 ہے، جسے رن ٹائم سیٹنگ کے طور پر ظاہر کرنے کے بجائے
پیش گوئی کی صلاحیت کے لیے منتخب کیا گیا ہے۔ یہ ثانوی
زیادہ کانٹراسٹ والا سگنل معمولی حرکت اور نمایاں متن کی ان تبدیلیوں کو محفوظ رکھتا ہے جنہیں
صرف اوسط پر مبنی موازنہ چھپا سکتا ہے۔ موازنہ کار یا ڈیکوڈر کی خرابیوں کی صورت میں کھلے انداز میں
واپسی ہوتی ہے اور کوریج برقرار رہتی ہے۔ آؤٹ پٹ میٹا ڈیٹا نکالے گئے امیدواروں، کامیابی سے استعمال ہونے والے
فریموں، اور خارج کیے گئے بصری ڈپلیکیٹس کو الگ الگ ظاہر کرتا ہے۔

واضح طور پر نشان زد ویڈیو پارٹ ٹائم اسٹیمپ والی کانٹیکٹ شیٹ کی درخواست کر سکتا ہے۔
برج زیادہ سے زیادہ 4 کالموں اور 16 فریموں پر مشتمل JPEG گرڈ بناتا ہے۔ ہر 512 پکسل سیل
اپنے ماخذ کا ٹائم اسٹیمپ زیادہ کانٹراسٹ والی نچلی پٹی میں ثبت کرتا ہے، جبکہ وہی ٹائم اسٹیمپس
بعد کے مراحل میں تعلق قائم کرنے اور آڈٹ کے لیے متنی میٹا ڈیٹا میں برقرار رہتے ہیں۔ مکمل
JPEG بدستور 32 MiB تک محدود رہتا ہے۔ اگر `sharp` گرڈ کو ڈی کوڈ یا کمپوز نہ کر سکے، تو
برج انفرادی JPEG فریموں پر واپس چلا جاتا ہے؛ کلائنٹ کی منسوخی پھر بھی
شیٹ آپریشن تک منتقل ہوتی ہے۔

پروموشن کے شواہد کو دانستہ طور پر مصنوعی کمپوزیشن
مائیکرو بینچ مارک سے الگ رکھا گیا ہے۔ `scripts/perf/video-bridge-contact-sheet-eval.ts` حقیقی OpenAI سے مطابقت رکھنے والے وژن ماڈلز کے لیے
اسکیما ورژن شدہ A/B ہارنس متعین کرتی ہے۔ یہ
فراہم کنندہ کی رپورٹ کردہ ٹوکنز، ابتدا سے انتہا تک وال لیٹنسی (بشمول شیٹ کمپوزیشن)،
ماڈل کالز کی تعداد، اور مینی فیسٹ میں متعین حقائق کے برقرار رہنے کی پیمائش کرتی ہے۔ خام ماڈل جوابات
رپورٹ میں نہیں لکھے جاتے؛ صرف SHA-256 ڈائجسٹس اور مطابقت رکھنے والی فیکٹ IDs محفوظ رکھی جاتی ہیں۔
ہارنس اس وقت تک کوئی نیٹ ورک یا بامعاوضہ ماڈل کال نہیں کرتی جب تک `--execute-real` پاس نہ کیا جائے اور
`--model`، `OMNIROUTE_BASE_URL`، اور `OMNIROUTE_API_KEY` کنفیگر نہ ہوں۔ اس
واضح حقیقی عمل درآمد کے بغیر، اس کا مشین کے ذریعے قابلِ مطالعہ فیصلہ `HOLD` رہتا ہے؛ صرف مصنوعی
پے لوڈ/کال تعداد کی پیمائشیں پروموشن کا ثبوت نہیں ہیں۔

جب کالرز کے پاس پہلے سے ہم آہنگ متن موجود ہو تو وہ معاونت یافتہ ویڈیو
پارٹ کے ساتھ ایک اختیاری `transcript.cues` ارے منسلک کر سکتے ہیں۔ ہر کیو میں `text`،
پروب کیے گئے دورانیے کے اندر محدود `start`/`end` وقفہ، اور وائٹ لسٹ شدہ
`source` (`client`، `embedded`، یا `audio-bridge`) ہونا ضروری ہے؛ `confidence` کی
ڈیفالٹ قدر `1` ہے اور اسے `0` اور `1` کے درمیان رہنا چاہیے۔ بالکل یکساں کیوز کو یکجا کر دیا جاتا ہے۔
OmniRoute اس میٹا ڈیٹا سے کبھی ٹرانسکرپشن شروع نہیں کرتا: توثیق شدہ کیوز کو
ماخذ، اعتماد، اور وقفے کے ساتھ بیان کردہ نتیجے میں نقل کیا جاتا ہے، اور
فریم کیپشنز کے ساتھ ناقابلِ اعتماد مشاہدات کے طور پر پیش کیا جاتا ہے۔ نامعتبر،
حد سے باہر، یا ماخذی ثبوت سے خالی متن کو کیپشن اسٹریم میں شامل کرنے کے بجائے مسترد کر دیا جاتا ہے۔
`source` فیلڈ فی الحال کالر کی جانب سے اعلان کردہ ہے، سرور سے تصدیق شدہ نہیں:
OmniRoute یقینی بناتا ہے کہ قدر تین
مجاز اسٹرنگز میں سے ایک ہو، لیکن ابھی تک رمزنگاری کے ذریعے اس بات کی تصدیق نہیں کرتا کہ
`embedded` یا `audio-bridge` لیبل واقعی سرور کی ملکیت والے
اخراج سے آیا ہے۔ جب تک یہ تصدیق دستیاب نہیں ہوتی، `source` کو ناقابلِ اعتماد اشارہ
سمجھیں؛ اس کی بنیاد پر اجازت دینے کے فیصلے نہ کریں۔

ایک ایڈوانسڈ کالر اسی ویڈیو کے لیے پہلے سے مجاز `audioTranscript` ٹریک
فراہم کر سکتا ہے۔ فیوژن سیم بصری اور آڈیو مشاہدات کو ایک ہی ڈیڈ لائن اور
ابارٹ سگنل کے تحت چلاتی ہے، انہیں مشترکہ ٹائم لائن پر ترتیب دیتی ہے، بالکل
یکساں اندراجات کو یکجا کرتی ہے، اور صرف ایک شاخ کامیاب ہونے پر جزوی نتیجہ
رپورٹ کرتی ہے۔ ایک نامعتبر `audioTranscript` اسی جزوی نتیجے میں تبدیل ہو جاتا ہے —
بصری تفصیل برقرار رکھی جاتی ہے اور آڈیو شاخ ایک صاف کردہ ناکامی کوڈ درج کرتی ہے —
بجائے اس کے کہ پوری ویڈیو ناکام ہو جائے۔ ہر شاخ کی دستیابی، جزوی فلیگ،
اور صاف کردہ ناکامی کوڈز بیان کردہ نتیجے، گارڈ ریل میٹا ڈیٹا
(`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`)، نتیجہ-کیش میٹا ڈیٹا، اور برج
فیوژن کاؤنٹرز میں محفوظ رہتے ہیں۔ ڈیفالٹ Video Bridge راستہ اسپیچ-ٹو-ٹیکسٹ
کو استعمال نہیں کرتا اور نہ ہی میڈیا کی دوسری نقل ڈاؤن لوڈ کرتا ہے؛ اس واضح ٹریک
کے بغیر یہ صرف ویڈیو تک محدود رہتا ہے۔

**ٹرانسکرپٹ برقرار رکھنا (#12150 P1)۔** جب بھی Video Bridge (جو خود آپٹ-اِن ہے)
کوئی ٹرانسکرپٹ کیو رینڈر کرتا ہے، یہ خودکار طور پر لاگو ہوتا ہے — برقرار رکھنے
کے لیے کوئی الگ فلیگ نہیں ہے۔ جب کوئی درخواست کسی بھی ٹرانسکرپٹ کیو
(کالر کا اعلان کردہ `transcript` یا فیوز شدہ `audioTranscript`) کو رینڈر کرتی ہے،
تو گارڈ ریل اسے `videoBridgeObserved` کے طور پر نشان زد کرتی ہے اور ویڈیو کی
تفصیل کا ریڈیکٹ شدہ شیڈو بناتی ہے — ایک یکساں رینڈرنگ جس میں ہر کیو کی آزاد
متنی باڈی کو `[redacted-video-transcript]` سے بدل دیا جاتا ہے، اور یہ تبدیلی
اسٹرنگ تشکیل دینے سے پہلے اسٹرکچرڈ کیو فیلڈ میں کی جاتی ہے (فلیٹ کیے گئے متن
کو کبھی پارس نہیں کیا جاتا، لہٰذا کیو کا کوئی مواد — خواہ مخاصمانہ ہو یا عام،
بشمول `]` رکھنے والی باڈیز جیسے `[inaudible]`/`[music]` — باقی نہیں رہ سکتا)۔
محفوظ کردہ کال-لاگ کی درخواست باڈی، مواد کی برابری سے مماثلت قائم کرتے ہوئے،
ویڈیو سے اخذ کردہ ہر متنی حصے کو اس ریڈیکٹ شدہ شیڈو سے بدل دیتی ہے؛ `fullText`
اینکر کو مکمل شدہ پری-کال گارڈ ریل پے لوڈ سے دوبارہ پڑھا جاتا ہے، اس لیے بعد کی
چین گارڈ ریلز (PII اور کریڈینشل ماسکرز، ترجیحات 10/95) کی جانب سے تفصیلی متن
کو وہیں دوبارہ لکھنے اور سسٹم-پرامپٹ/ہینڈ آف/میموری انجیکشن کی جانب سے پیغام
اریے کی ساخت بدلنے کے بعد بھی مماثلت کامیاب رہتی ہے۔ ماڈل کو اپ اسٹریم بھیجی
جانے والی باڈی میں کوئی تبدیلی نہیں ہوتی۔ ایک مشاہدہ شدہ درخواست کسی پائیدار
Memory کو بھی پُر نہیں کرتی (درخواست اور جواب، دونوں سے اخذ کردہ استخراج چھوڑ
دیا جاتا ہے)، اس لیے ماڈل کا اپنا جواب ٹرانسکرپٹ متن کو Memory میں بازگشت نہیں
دے سکتا۔

برقرار رکھنے کی کچھ سطحیں اب بھی کھلی ہیں اور فالو اَپ (**P2**، #12430) کے لیے
ٹریک کی جا رہی ہیں: تفصیلی-لاگ آرٹیفیکٹ میں خام پری-گارڈ ریل کلائنٹ-درخواست
اسنیپ شاٹ؛ `previous_response_id` کا تسلسل فیل-کلوزڈ؛ اخذ کردہ پرامپٹ کی
اندرونی ڈسپیچز جو ٹرانسکرپٹ کو ایک ترکیب کردہ اسٹرنگ پرامپٹ کے اندر شامل کرتی
ہیں (پائپ لائن مراحل، کانٹیکسٹ-ہینڈ آف)؛ اور ماڈل کے ایسے جواب کی ریسپانس باڈی /
سیمینٹک-کیش نقل جو ٹرانسکرپٹ کا اقتباس پیش کرتی ہے۔ یہ P1 کے محفوظ کردہ
درخواست-باڈی + Memory دائرۂ کار سے باہر خام/ریسپانس-کلاس یا آپٹ-اِن سطحیں ہیں۔

اندرونی `/api/modality-bridge/video/drilldown` لائف سائیکل ایک الگ،
لوپ بیک/ٹوکن سے تصدیق شدہ کیش سبسٹریٹ ہے۔ ہر آپریشن کے لیے ایک
کینونیکل مبہم پرنسپل ID بھی درکار ہے۔ کسی پروڈکشن کالر کو فعال کرنے سے پہلے،
اسے یہ ID تصدیق شدہ ٹیننٹ سے اخذ کرنی چاہیے اور کلائنٹ کے منتخب کردہ
قدر کو کبھی فارورڈ نہیں کرنا چاہیے۔ کیش کیز اس پرنسپل کو کینونیکل سیشن اور
ویڈیو-ریفرنس IDs سے منسلک کرتی ہیں، صرف ان کی SHA-256 سے اخذ کردہ کیز محفوظ
کرتی ہیں، اور پڑھنے اور حذف کرنے، دونوں کو اسی پرنسپل تک محدود رکھتی ہیں۔
کیش ہر اندراج میں زیادہ سے زیادہ 16 اخذ کردہ JPEG فریمز محفوظ کرتی ہے، انہیں
دس منٹ بعد زائد المیعاد کرتی ہے، اور محدود `start`/`end` ریڈز یا واضح سیشن
ڈیلیشن کی معاونت کرتی ہے۔

ہر پرنسپل زیادہ سے زیادہ 16 اندراجات اور 64 MiB کینونیکل JPEG ڈیٹا تک محدود
ہے۔ یہ حدود 64 اندراجات/256 MiB کی عالمی حد سے آزاد ہیں: پرنسپل کوٹے کا
دباؤ عالمی LRU ایوکشن پر غور کیے جانے سے پہلے صرف اسی پرنسپل کے سب سے کم
حالیہ استعمال شدہ اندراجات کو ایوکٹ کرتا ہے۔ زائد المیعاد اندراجات کو کیش
سرگرمی کے دوران پرنسپل اور عالمی، دونوں اکاؤنٹنگ سے صاف کر دیا جاتا ہے، جبکہ
منسوخی اور توثیقی ناکامی کسی جزوی متبادل کو کمٹ نہیں کرتیں۔

کیش غیر کینونیکل Base64، ضرورت سے زیادہ پیڈنگ، غیر JPEG میڈیا، خراب یا
نامکمل JPEGs، اور ایسے JPEGs کو مسترد کرتی ہے جو محدود فل-امیج `sharp`
ڈی کوڈ کے دوران تنبیہ پیدا کریں۔ یہ ہر قبول شدہ تصویر کو کینونیکل JPEG کے طور
پر دوبارہ ان کوڈ کرتی ہے، کالر کی فیلڈز پر بھروسا کرنے کے بجائے ڈی کوڈ شدہ
بائٹس سے چوڑائی اور اونچائی اخذ کرتی ہے، اور کسی بھی اختتامی پولی گلاٹ بائٹس
کو برقرار رکھنے کے بجائے خارج کر دیتی ہے۔ صرف محدود کینونیکل کمپریسڈ بفر
دونوں کوٹوں میں شمار کیا جاتا ہے۔ JSON وائر حد میں 32 MiB ڈی کوڈ شدہ اِن پٹ
کی حد کے لیے Base64 اوور ہیڈ شامل ہے۔ ہر
محفوظ شدہ اخذ کردہ نتیجہ اپنا توثیق شدہ JPEG فارمیٹ/ریزولوشن، سیمپلنگ پالیسی،
ڈیریویشن ورژن، تخلیق کا وقت، سرور سے کمپیوٹ کردہ مواد ہیش، اور ہیش شدہ پیرنٹ
ریفرنس کے ساتھ قابلِ اعتماد کالر کا پیرنٹ-مواد ہیش ریکارڈ کرتا ہے۔ ایٹامک کیش
کمٹ سے پہلے غیر ہم وقت ڈی کوڈ/ہیش مراحل کے درمیان منسوخی کی جانچ کی جاتی ہے۔

یہ حصہ ابھی کسی پروڈکشن پروڈیوسر کو روٹ سے منسلک نہیں کرتا اور
ملٹی-ریزولوشن ویریئنٹ کے انتخاب کی سہولت فراہم نہیں کرتا۔ اس لیے شفاف
Video Bridge درخواست راستے پر کوئی اضافی کام عائد نہیں ہوتا، جبکہ ٹیننٹ سے
منسلک پرنسپل ڈیریویشن اور مکمل FU-08 ملٹی-ریزولوشن لائف سائیکل کو مکمل طرزِ عمل
کے طور پر دستاویز کرنے کے بجائے واضح فالو اَپ کام برقرار رکھا گیا ہے۔

فریمز کے لیے ترتیب وار کنفیگر کردہ Video ماڈل کے ذریعے کیپشن تیار کیے جاتے ہیں۔ ایک خالی
Video اووررائیڈ، Vision کی ترتیب وراثت میں لیتی ہے؛ اگر دونوں خالی ہوں تو Vision
آٹو راؤٹر مؤثر، وژن کی صلاحیت رکھنے والا ماڈل منتخب کرتا ہے۔ کامیاب کیپشنز
اصل حصے کو ایک مستحکم `[Video description:` سابقے سے بدل دیتے ہیں، جو متن کو
میڈیا سے اخذ کردہ ایک ناقابلِ اعتماد مشاہدے کے طور پر بھی نشان زد کرتا ہے اور بعد میں آنے والے
ماڈلز کو میڈیا میں موجود ہدایات پر عمل نہ کرنے کی ہدایت دیتا ہے۔ فریم-کیپشن کیش کیز میں
JPEG بائٹس، پرامپٹ، ٹائم اسٹیمپ، اور مؤثر ماڈل شامل ہوتے ہیں؛ صرف کامیاب
کیپشنز کیش کیے جاتے ہیں۔ کیش اندراجات اصل کامیاب پروڈیوسر ماڈل کو برقرار رکھتے ہیں،
جس میں فال بیک ماڈل بھی شامل ہے؛ جب مختلف فریمز مختلف ماڈلز کے ذریعے
تیار کیے گئے ہوں تو برج `mixed` رپورٹ کرتا ہے۔ کیش ہٹ اس پروڈیوسر شناخت کو
درخواست کردہ روٹنگ پلان کا نیا لیبل دینے کے بجائے دوبارہ استعمال کرتا ہے۔ مکمل ویڈیو کے نتیجے
کی کیش کی ہر اس ان پٹ پر مبنی ہوتی ہے جو آؤٹ پٹ کو تبدیل کرتی ہے — پرامپٹ، مؤثر
ماڈل، سیمپلنگ پالیسی، فریم کی تعداد، معنوی تجزیے کا موڈ، نارملائز کردہ فوکس ہنٹ کا SHA-256
فنگر پرنٹ، فوکس ونڈو، `transcript`،
`audioTranscript`، اور کانٹیکٹ شیٹ فلیگ — لہٰذا ان میں سے کسی بھی
جہت کی تبدیلی کیش مس ہوتی ہے، کبھی بھی فرسودہ نتیجے کا دوبارہ استعمال نہیں۔ بصری ڈی ڈپ پالیسی
کا ورژن، تھریش ہولڈ، اور محدود امیدوار فریمز کی تعداد بھی
نتیجہ-کیش کی کلید اور میٹا ڈیٹا میں واضح طور پر شامل ہوتے ہیں؛ چنانچہ پالیسی میں تبدیلی کسی فرسودہ
مکمل ویڈیو وضاحت کو دوبارہ استعمال نہیں کر سکتی۔ نتیجہ-کیش v4 میٹا ڈیٹا موڈ اور
فنگر پرنٹ برقرار رکھتا ہے، خام صارف ٹاسک کبھی نہیں۔ گارڈ ریل میٹا ڈیٹا درخواست کردہ
اور مؤثر دونوں تجزیاتی موڈز رپورٹ کرتا ہے؛ قابلِ استعمال صارف متن کے بغیر درخواست کردہ
`focused` موڈ کو مؤثر طور پر `full` رپورٹ کیا جاتا ہے۔

گارڈ ریل ہر معاونت یافتہ ویڈیو حصے کو اخذ کرتا ہے، مگر
`modalityBridgeVideoMaxVideos` سے زیادہ کی وضاحت نہیں کرتا۔ کسی ایسے ہدف کے لیے جس کے متعلق ثابت ہو کہ
`supportsVideo === false` ہے، ناکام اور حد سے زائد ویڈیوز واضح محفوظ
متنی نشانات میں تبدیل ہو جاتی ہیں، تاکہ کوئی خام ویڈیو باقی نہ رہے۔ جب صلاحیت نامعلوم ہو تو وہ حصے
بغیر تبدیلی کے رہتے ہیں۔ `supportsVideo === true` والے اہداف برج کو بائی پاس کرتے ہیں۔
کلائنٹ کی درخواست کا ابارٹ سگنل ڈاؤن لوڈ، بروکر قطار،
ذیلی عمل، اور کیپشن کالز تک منتقل ہوتا ہے؛ ابارٹس ویڈیوز کے درمیان عمل روک دیتے ہیں اور خام
میڈیا کی جانب کبھی فیل اوپن نہیں ہوتے۔

رن ٹائم ترتیبات DB کی پشت پناہی رکھتی ہیں اور Zod کے ذریعے توثیق شدہ ہیں:

| کلید                                | ڈیفالٹ      | حد / رویہ                                                                                                |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | اختیاری رن ٹائم، آپٹ اِن                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` عمومی کیپشنز برقرار رکھتا ہے؛ `focused` محدود، ناقابلِ اعتماد تازہ ترین صارف سیاق استعمال کرتا ہے |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge ماڈل وراثت میں لیں                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`، `scene_aware`، یا متناسب `segment_aware`؛ ڈیٹیکٹر کی ناکامی پر `uniform` استعمال ہوتا ہے      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

120 سیکنڈ سے زیادہ کی پرانی مستقل Video ٹائم آؤٹ اقدار کو
بروکر کی آخری مہلت تک محدود کر دیا جاتا ہے؛ اس حد سے زیادہ کی نئی ترتیبات لکھنے کی درخواستیں مسترد کر دی جاتی ہیں۔
`GET /api/modality-bridge/video/runtime` کو تصدیق یا رن ٹائم کی جانچ سے پہلے
قابلِ اعتماد، مہر شدہ لوپ بیک مقام درکار ہوتا ہے، اور پھر مینجمنٹ
آتھ درکار ہوتی ہے۔ یہ صرف `available`، صاف کردہ FFmpeg/ffprobe ورژنز، اور رن ٹائم
دستیاب نہ ہونے پر ایک مقررہ وجہ واپس کرتا ہے۔ اندرونی اخراجی اینڈ پوائنٹ
عوامی اپ لوڈ API نہیں ہے: قطار بھر جانے پر `503` کے ساتھ `Retry-After` واپس ہوتا ہے، کالر
کے منقطع ہونے پر `499`، اور بروکر کی مقررہ آخری مہلت پر `504` واپس ہوتا ہے۔ تبدیل شدہ جوابات، Vision یا Audio حصوں کو حذف کیے بغیر،
مرکزی `x-omniroute-modality-bridge` ہیڈر میں
`video->text;model=<visionModel>;parts=<videos>` شامل کرتے ہیں۔

### PII ماسکر (`piiMasker.ts`)

**دونوں** مراحل میں چلتا ہے۔

- **`preCall`** پے لوڈ کو کلون کرتا ہے، `system`، `messages`، `input`، اور
  `prompt` (سادہ اسٹرنگ آئٹمز سمیت) میں سے گزرتا ہے، اور اسٹرنگ `content`/`text`
  فیلڈز پر `processPII()` (`@/shared/utils/inputSanitizer` سے) لاگو کرتا ہے۔ جب
  `PII_REDACTION_ENABLED=true` ہو تو دریافت شدہ PII کو باہر جانے والے
  پے لوڈ میں مخفی کر دیا جاتا ہے۔ یہ `INPUT_SANITIZER_MODE` سے آزاد ہے (جو صرف
  پرامپٹ انجیکشن پالیسی کو کنٹرول کرتا ہے)۔ جب ریڈیکشن بند ہو تو کال مواد کو
  دوبارہ لکھے بغیر شناخت کی تعداد ریکارڈ کرتی ہے۔
- **`postCall`** جواب کو ڈیپ کلون کرتا ہے، `sanitizePIIResponse()` کے ساتھ
  Responses-API ساخت کا ماسکر (`maskResponsesOutput` — جو
  `output_text` اور `output[].content[].text` کا احاطہ کرتا ہے) چلاتا ہے۔ اگر کوئی ریڈیکشن ہو تو
  ترمیم شدہ جواب اصل جواب کی جگہ لے لیتا ہے۔

گارڈ ریل کبھی بلاک نہیں کرتا؛ یہ صرف تشریحی معلومات شامل کرتا (`meta.detections`،
`meta.redacted`) یا متن دوبارہ لکھتا ہے۔

### پرامپٹ انجیکشن (`promptInjection.ts`)

صارف کے فراہم کردہ مواد میں مخالفانہ ساختوں کا سراغ لگاتا ہے اور
کنفیگر کردہ پالیسی نافذ کرتا ہے۔ رویہ ماحولیاتی متغیرات اور کنسٹرکٹر
اختیارات کے ذریعے متعین ہوتا ہے:

| ترتیب      | ماحولیاتی متغیر                                                                                   | طے شدہ قدر | اثر                                                                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| فعال       | `INPUT_SANITIZER_ENABLED`                                                                         | `true`     | جب `false` ہو، تو guardrail فوراً عمل روک دیتا ہے۔                                                                                                                                                               |
| موڈ        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                   | `warn`     | انجیکشن پالیسی: `block`، `warn`، یا `log`۔ (`redact` پچھلی مطابقت کے لیے قبول کیا جاتا ہے، لیکن انجیکشن متن کو **نہیں** ہٹاتا؛ درخواست میں PII کی دوبارہ تحریر `PII_REDACTION_ENABLED` کے ذریعے کنٹرول ہوتی ہے۔) |
| بلاک کی حد | `blockThreshold` آپشن / `INPUT_SANITIZER_BLOCK_THRESHOLD` (عرف `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | بلاک کرنے کے لیے درکار کم از کم شدت۔ طے شدہ ترتیب میں Medium صرف مشاہدے کے لیے ہے۔                                                                                                                               |

**موڈ کی ترجیحی ترتیب** (`getMode`): کالر کا `options.mode` →
`INJECTION_GUARD_MODE` کا **DB فیچر فلیگ اوور رائیڈ** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`۔ لہٰذا ڈیش بورڈ اوور رائیڈ کو env متغیرات پر ترجیح حاصل ہوتی ہے، اس لیے Feature
Flags UI چلتے ہوئے guard کو براہِ راست کنٹرول کرتا ہے (دوبارہ شروع کرنے کی ضرورت نہیں)۔ DB سے پڑھنے کا عمل fail-safe ہے:
اگر اس میں خرابی آئے، تو guard واپس env پر مبنی رویے پر آ جاتا ہے، اور جب کوئی
اوور رائیڈ مقرر نہ ہو تو رویہ صرف env پر مبنی حل کے عین مطابق ہوتا ہے۔

شناخت کے ذرائع:

1. `@/shared/utils/inputSanitizer` سے `sanitizeRequest()` (مشترکہ detector
   سیٹ جو پائپ لائن میں دیگر مقامات پر بھی استعمال ہوتا ہے)۔
2. بلٹ اِن `DEFAULT_GUARD_PATTERNS` (فی الحال `system_override_inline` اور
   `markdown_system_block`، دونوں کی شدت `high` ہے)۔
3. constructor آپشنز کے ذریعے فراہم کردہ اختیاری `customPatterns` (strings، regex،
   یا `{ name, pattern, severity }` ریکارڈز)۔

جب `mode === "block"` ہو **اور** کم از کم ایک شناخت شدت کی
حد پر پورا اترتی ہو، تو `preCall` یہ واپس کرتا ہے: `{ block: true, message: "Request rejected:
suspicious content detected" }`۔ `warn`/`log` موڈز میں guardrail لاگ کرتا ہے لیکن
کال کی اجازت دیتا ہے۔ مشترکہ معاون `evaluatePromptInjection()` بھی export کیا جاتا ہے
تاکہ ایسے کالرز prompts کا جائزہ لے سکیں جنہیں registry کے ذریعے گزرنے کی ضرورت نہ ہو۔

**اسکین کی حد (v3.8.20):** detector مربوط prompt متن کے صرف **ابتدائی 16 KB** کا
معائنہ کرتا ہے — `src/shared/utils/inputSanitizer.ts` میں
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes)۔ `detectInjection()` اور
`evaluatePromptInjection()` دونوں pattern loop چلانے سے پہلے
`slice(0, MAX_INJECTION_SCAN_BYTES)` استعمال کرتے ہیں۔ انجیکشن ہدایات input کے آغاز کے قریب ہوتی ہیں، اس لیے یہ
کثیر-سینکڑوں-KB payloads پر regex CPU/GC کو محدود کرتا ہے، جبکہ شناخت کمزور نہیں ہوتی (دیکھیے
#3932، #4041)۔

### اسنادی معلومات چھپانے والا (`credentialMasker.ts`)

**دونوں** مراحل میں چلتا ہے اور طے شدہ chain میں آخری ہے (ترجیح `95`)۔ outbound payload (پیغام
کا content، tool-call arguments، tool results) **اور** provider response سے
معروف API-key / secret-token patterns کو مخفی کرتا ہے، تاکہ prompt میں چسپاں کی گئی اسنادی معلومات
(یا tool result کے ذریعے واپس دہرائی گئی معلومات) upstream provider یا client کو واپس افشا نہ ہو۔

- **صرف واضح اجازت سے فعال**، PII redaction ہی کی روایت کے مطابق (Hard Rule #20 سے ملحق):
  اس وقت تک غیر فعال رہتا ہے جب تک `settings.credentialRedactionEnabled === true` **یا**
  `CREDENTIAL_REDACTION_ENABLED=true` نہ ہو۔ غیر فعال ہونے پر guardrail کوئی کارروائی نہیں کرتا —
  یہ نہ کبھی بلاک کرتا ہے اور نہ دوبارہ تحریر کرتا ہے۔
- `redactCredentials()` مکمل payload/response tree میں چلتا ہے (`walkValue()`،
  prototype-pollution سے محفوظ، `WeakSet` کے ذریعے cycle-safe) اور مماثلتوں کو
  `[REDACTED:<type>]` placeholder سے بدل دیتا ہے، جبکہ صرف انہی branches کو clone کرتا ہے جو واقعی
  تبدیل ہوئی ہوں۔
- `CREDENTIAL_PATTERNS` میں LLM provider keys (OpenAI، OpenAI-proj،
  Anthropic، Google، Hugging Face، Replicate)، VCS/SaaS tokens (GitHub، Slack،
  Linear، Notion، npm، Postman، Discord)، ادائیگی کی keys (Stripe، Square)، cloud
  keys (AWS access key، Twilio، SendGrid، Mailgun)، private keys / JWTs،
  اسنادی معلومات رکھنے والی connection strings (`mongodb://user:pass@...`، وغیرہ)، اور
  عمومی `Authorization`/`x-api-key`/`api-key`/`apikey` header-value
  pattern شامل ہیں۔ Header جیسی ساخت رکھنے والی keys (`authorization`، `x-api-key`، `api-key`،
  `apikey`) کو عمومی text regex کے بجائے ساختی طور پر مخفی کیا جاتا ہے (صرف value، جبکہ
  `Bearer `/`Basic ` جیسا scheme prefix برقرار رہتا ہے)۔
- guardrail کبھی بلاک نہیں کرتا؛ یہ صرف دوبارہ تحریر (`modifiedPayload` /
  `modifiedResponse`) اور تشریح (`meta.credentialsRedacted`، `meta.count`) کرتا ہے۔

Regression guard: `tests/unit/credential-masker-guardrail.test.ts`۔

## بنیادی کنٹریکٹ (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true چین کو فوری طور پر روک دیتا ہے
  message?: string; // بلاک ہونے پر ظاہر کیا جاتا ہے
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // درخواست کو دوبارہ لکھنے کے لیے preCall کے ذریعے واپس کیا جاتا ہے
  modifiedResponse?: TValue; // جواب کو دوبارہ لکھنے کے لیے postCall کے ذریعے واپس کیا جاتا ہے
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

ایک گارڈ ریل `void`، `{}`، یا `{ block: false }` واپس کرکے "کوئی تبدیلی نہیں" کا اشارہ دیتی ہے۔ `modifiedPayload`/`modifiedResponse` واپس کرنے سے چین میں آگے آنے والی گارڈ ریلز تک پہنچنے والی قدر تبدیل ہو جاتی ہے۔
`signal?: AbortSignal` کالر کے لائف سائیکل کو گارڈ ریلز تک پہنچاتا ہے۔ درخواست کا منسوخ ہونا دانستہ fail-open استثنا ہے: میڈیا برجز کام روک دیتے ہیں اور صفائی کرتے ہیں، مگر خام میڈیا کو ایسے ہدف کے لیے بحال نہیں کرتے جس کے بارے میں معلوم ہو کہ وہ اسے سپورٹ نہیں کرتا۔

## رجسٹری (`registry.ts`)

سنگلٹن `guardrailRegistry` درج ذیل سہولیات فراہم کرتی ہے:

- `register(guardrail)` — ایک گارڈ ریل شامل کرتی ہے (یا نارملائزڈ نام کے لحاظ سے تبدیل کرتی ہے) اور
  صعودی `priority` کے مطابق دوبارہ ترتیب دیتی ہے۔
- `clear()` / `list()` — انتظامی معاون فنکشنز۔
- `runPreCallHooks(payload, context)` — فعال گارڈ ریلز پر تکرار کرتی ہے، پے لوڈ کو
  `modifiedPayload` کے ذریعے آگے بڑھاتی ہے، اور پہلے `block: true` پر رک جاتی ہے۔
- `runPostCallHooks(response, context)` — جواب کی جانب بھی یہی بہاؤ استعمال کرتی ہے۔
- `resetGuardrailsForTests({ registerDefaults })` — حالت صاف کرتی ہے اور صاف ستھری ٹیسٹ علیحدگی کے لیے، اختیاری طور پر
  ڈیفالٹس کو دوبارہ رجسٹر کرتی ہے۔

دونوں رنرز `{ blocked, payload|response, results, guardrail?, message? }`
واپس کرتے ہیں، جہاں `results`، `GuardrailExecutionResult` ریکارڈز کی ایک ارے ہے جس میں
ہر گارڈ ریل کے `blocked`، `skipped`، `modified`، `error`، اور `meta` فیلڈز شامل ہوتے ہیں،
جو ٹریسنگ کے لیے مفید ہیں۔

### ہر درخواست کے لیے گارڈ ریلز کو غیر فعال کرنا

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` گارڈ ریل ناموں کی ایک
نقل سے پاک فہرست یکجا کرتا ہے جنہیں موجودہ درخواست کے لیے چھوڑ دینا چاہیے۔
ذرائع (سب اختیاری، سب ضم کیے جاتے ہیں):

- `apiKeyInfo.disabledGuardrails`
- درخواست کی باڈی کا `disabledGuardrails` (اعلیٰ سطح پر)
- درخواست کی باڈی کا `metadata.disabledGuardrails`
- ہیڈر `x-omniroute-disabled-guardrails` (یا قدیمی
  `x-disabled-guardrails`)

اقدار اسٹرنگز کی ارے یا کوما سے جدا کی گئی اسٹرنگ ہو سکتی ہیں؛ ناموں کو
لوئرکیس kebab-case میں نارملائز کیا جاتا ہے (`pii_masker` → `pii-masker`)۔ نتیجہ
`context.disabledGuardrails` کے ذریعے رجسٹری کو دیا جاتا ہے، جو مماثل
گارڈ ریلز کو چھوڑ دیتی ہے (`results` میں `skipped: true`)۔

## عمل درآمد کی ترتیب

`src/sse/handlers/chat.ts` اور `open-sse/handlers/chatCore.ts` سے گزرنے والی ہر درخواست کے لیے:

1. `resolveDisabledGuardrails(...)`، API کلید، باڈی، اور ہیڈرز سے نظر انداز کیے جانے والے عناصر کی فہرست بناتا ہے۔
2. `guardrailRegistry.runPreCallHooks(body, ctx)` ترجیح کی صعودی ترتیب میں گارڈ ریلز چلاتا ہے:
   - غیر فعال گارڈ ریلز کو `skipped` کے طور پر ریکارڈ کیا جاتا ہے۔
   - ہر گارڈ ریل کا `preCall`، `modifiedPayload` کے ذریعے پے لوڈ دوبارہ لکھ سکتا ہے۔
   - پہلا `block: true` سلسلے کو فوری طور پر روک دیتا ہے اور ہینڈلر گارڈ ریل کی جانب سے مسترد کیے جانے کا جواب واپس کرتا ہے۔
3. (ممکنہ طور پر دوبارہ لکھا گیا) پے لوڈ کومبو روٹنگ اور اپ اسٹریم ڈسپیچ میں جاتا ہے۔
4. جواب تیار ہونے کے بعد، `guardrailRegistry.runPostCallHooks(...)` جواب پر یہی سلسلہ چلاتا ہے۔ یہاں `block: true` اپ اسٹریم جواب کو خارج کر دیتا ہے۔

خرابی پیدا کرنے والی گارڈ ریلز کو `error: <message>` کے ساتھ ریکارڈ کیا جاتا ہے اور `logger.warn` کے ذریعے لاگ کیا جاتا ہے، لیکن سلسلہ جاری رہتا ہے — یہ ڈیزائن کے لحاظ سے فیل-اوپن ہے۔

## کنفیگریشن

بلٹ اِن گارڈ ریلز کے ذریعے پڑھے جانے والے ماحولیاتی متغیرات:

| متغیر                                 | استعمال کنندہ              | اثر                                                                                                    |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | تشخیص کو مکمل طور پر غیر فعال کرنے کے لیے `false` مقرر کریں۔                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | انجیکشن پالیسی: `warn`، `block`، یا `log`۔ پرانی قدر `redact` انجیکشن متن کو دوبارہ نہیں لکھتی۔        |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | انجیکشن گارڈ کا موڈ؛ یہ DB فیچر فلیگ بھی ہے جو ماحولیاتی متغیرات کو **اوور رائیڈ** کرتا ہے (DB > ENV)۔ |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | کم از کم شدت جسے `MODE=block` مسترد کرتا ہے: `high` (ڈیفالٹ)، `medium`، یا `low`۔                      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | `INPUT_SANITIZER_BLOCK_THRESHOLD` کا پرانا عرف۔                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | `true` ہونے پر، درخواست کا PII حذف کر دیا جاتا ہے (انجیکشن موڈ سے آزاد)۔                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (ڈاؤن اسٹریم) | جواب کی جانب ماسکر کے رویے کو کنٹرول کرتا ہے۔                                                          |

Modality Bridge گارڈ ریلز ماحولیاتی متغیرات کے بجائے DB کی معاونت والے سیٹنگز اسٹور (`getSettings()`) سے رن ٹائم کنفیگریشن پڑھتی ہیں۔ Vision کی بنیادی کلیدیں `modalityBridgeVisionEnabled`، `modalityBridgeVisionMode`، `modalityBridgeVisionModel`، `modalityBridgeVisionTaskAware`، `modalityBridgeVisionPrompt`، `modalityBridgeVisionTimeout`، `modalityBridgeVisionMaxImages`، `modalityBridgeVisionMaxChars`، `modalityBridgeCacheEnabled`، `modalityBridgeCacheTtlMinutes`، اور `modalityBridgeCacheMaxEntries` ہیں۔ پرانی `visionBridge*` کلیدیں صرف دستاویزی، ایک سائیکل کے ریڈ فال بیک کے طور پر قبول کی جاتی ہیں؛ ڈیش بورڈ رائٹس بنیادی کلیدیں استعمال کرتی ہیں۔ ڈیفالٹس اور فال بیک ریزالور `src/shared/constants/modalityBridgeDefaults.ts` میں موجود ہیں، جبکہ پرانے کانسٹنٹس `src/shared/constants/visionBridgeDefaults.ts` میں برقرار رکھے گئے ہیں۔

Audio، `modalityBridgeAudioEnabled`، `modalityBridgeAudioModel`، `modalityBridgeAudioTimeout`، اور `modalityBridgeAudioMaxClips` کے ساتھ مشترکہ `modalityBridgeCache*` سیٹنگز استعمال کرتا ہے۔ Audio کے لیے پرانی کلیدوں کا کوئی فال بیک نہیں ہے کیونکہ یہ کلیدیں Modality Bridge اسکیما کے ساتھ متعارف کرائی گئی تھیں۔

Video، `modalityBridgeVideoEnabled`، `modalityBridgeVideoAnalysisMode`، `modalityBridgeVideoModel`، `modalityBridgeVideoFrameCount`، `modalityBridgeVideoSamplingPolicy`، `modalityBridgeVideoMaxVideos`، اور `modalityBridgeVideoTimeout` کے ساتھ مشترکہ `modalityBridgeCache*` سیٹنگز استعمال کرتا ہے۔ یہ ڈیفالٹ طور پر غیر فعال ہے کیونکہ FFmpeg/ffprobe اختیاری آپریشنل انحصارات ہیں اور فریم کیپشننگ تاخیر اور ماڈل کی لاگت میں اضافہ کرتی ہے۔

## حسبِ ضرورت Guardrails

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

مراحل:

1. `BaseGuardrail` کو توسیع دیتے ہوئے `src/lib/guardrails/myGuardrail.ts` بنائیں۔
2. `preCall` اور/یا `postCall` نافذ کریں۔
3. یا تو import کے وقت رجسٹر کریں (`registerDefaultGuardrails` سے push کریں) یا
   runtime پر `guardrailRegistry.register(...)` کو کال کریں — registry اسی normalized نام والے
   کسی بھی سابقہ guardrail کو بدل دیتی ہے۔
4. `tests/unit/` کے تحت ٹیسٹ شامل کریں (موجودہ مثالیں:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`)۔

## ٹیسٹنگ

معلوم حالت سے آغاز کرنے کے لیے ٹیسٹس کے درمیان `resetGuardrailsForTests()` استعمال کریں۔
خالی registry سے آغاز کرنے اور صرف زیرِ ٹیسٹ guardrails رجسٹر کرنے کے لیے
`{ registerDefaults: false }` پاس کریں۔ Vision Bridge dependency
injection (`deps.getSettings`, `deps.callVisionModel`) قبول کرتا ہے؛ Audio Bridge
settings، capabilities، STT model کے انتخاب، credential
کی جانچ، اور transcription کے لیے مساوی seams فراہم کرتا ہے۔ اس طرح ٹیسٹس DB
یا network تک رسائی کے بغیر دونوں flows کو آزما سکتے ہیں۔

## مزید دیکھیے

- `src/lib/guardrails/` — نفاذ
- `src/shared/utils/inputSanitizer.ts` — مشترکہ detector جو
  prompt-injection اور PII masking کو تقویت دیتا ہے
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge کی defaults اور
  forced-bridge model کی فہرست
- `src/shared/constants/modalityBridgeDefaults.ts` — مشترکہ Vision/Audio runtime defaults
- `docs/architecture/RESILIENCE_GUIDE.md` — متعامد layer (circuit breaker، cooldowns)
- `docs/reference/ENVIRONMENT.md` — env vars کا مکمل حوالہ

## Injection-guard route coverage اور red-team (مرحلہ 8 · بلاک D)

injection-guard (`createInjectionGuard` / `withInjectionGuard`) ان تمام routes کا احاطہ کرتا ہے
جو user prompts قبول کرتے ہیں۔ یہ `INJECTION_GUARD_MODE` کا احترام کرتا ہے (default `warn` = صرف log؛
`block` = HTTP 400 `SECURITY_001` واپس کرتا ہے)۔

| قسم          | Routes                                                                                                                                               | Default mode |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| متن (موجودہ) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| تخلیقی       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| ڈیٹا         | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

متن اخذ کرنا (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` کا احاطہ کرتا ہے۔

**Red-team (ہر شب، `nightly-llm-security.yml`):** promptfoo تصدیق کرتا ہے کہ ہر route
`INJECTION_GUARD_MODE=block` میں OWASP-LLM corpus کو block کرتا ہے؛ garak probes چلاتا ہے (secret نہ ہونے پر چھوڑ دیتا ہے)۔
`moderations` کو یکسانیت کے لیے شامل کیا گیا ہے — block-mode میں operators اسے
`resolveDisabledGuardrails` کے ذریعے مستثنیٰ کر سکتے ہیں۔

ہر شب چلنے والے workflow (`.github/workflows/nightly-llm-security.yml`، cron + دستی
dispatch) میں دو jobs ہیں:

- **`promptfoo-guard` (blocking)** — `INJECTION_GUARD_MODE=block` کے ساتھ
  `promptfoo eval -c promptfooconfig.yaml` چلاتا ہے۔ ہر مخالفانہ case (مثلاً "ignore all
  previous instructions…"، DAN-style jailbreaks) تصدیق کرتا ہے کہ response میں
  `error.code === "SECURITY_001"` موجود ہے، یعنی guard نے واقعی request مسترد کی۔
- **`garak` (مشاورتی)** — مقامی OmniRoute instance (`http://localhost:20128/v1`) کے خلاف
  garak کو `--probes promptinject,dan,leakreplay` کے ساتھ چلاتا ہے۔ اسے provider
  secret (`PROMPTFOO_PROVIDER_KEY`) کے ذریعے مشروط کیا گیا ہے؛ یہ مؤدبانہ طور پر چھوڑ دیتا ہے اور اس کے آخر میں
  `|| true` شامل ہے، لہٰذا یہ CI کو ناکام کیے بغیر رپورٹ کرتا ہے۔

guard helper (`createInjectionGuard` / `withInjectionGuard`) کی coverage
ہر prompt رکھنے والے `/v1` route تک پھیلی ہوئی ہے؛ prompt کا متن
`src/shared/utils/inputSanitizer.ts` میں موجود `extractMessageContents()` کے ذریعے
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` سے حاصل کیا جاتا ہے۔
