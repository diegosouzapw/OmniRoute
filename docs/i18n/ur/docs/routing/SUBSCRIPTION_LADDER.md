# Subscription-first routing (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> دو نئی `auto/*` ids — `auto/subscription` اور `auto/thrifty`۔ دونوں کو درخواست کرنے سے اختیاری طور پر فعال کیا جاتا ہے:
> جب تک کوئی caller نام کے ذریعے id طلب نہ کرے، کوئی چیز ان کے راستے سے نہیں گزرتی، اور کسی
> موجودہ pool، strategy، یا default میں کوئی تبدیلی نہیں ہوتی۔

## یہ کیوں موجود ہے

OmniRoute پہلے ہی لاگت سے متعلق دو سوالات کے جواب دیتا ہے، مگر ان میں سے کوئی بھی وہ سوال نہیں جسے زیادہ تر operators پوچھتے ہیں۔

| موجودہ طریقۂ کار                                         | جس سوال کا جواب دیتا ہے                        |
| -------------------------------------------------------- | ---------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "کیا یہ model catalog میں مفت درج ہے؟"         |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "کیا یہ connection کبھی مجھے bill کر سکتا ہے؟" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "کیا یہ connection اپنی حد کے قریب ہے؟"        |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "خرچ محدود کرو، سستے ترین پر آ جاؤ"            |

صرف مفت استعمال کا ہر طریقۂ کار **fail closed** ہوتا ہے — ختم شدہ مفت pool ایک خالی pool ہوتا ہے، کبھی بھی
کسی paid option کی طرف اگلا قدم نہیں — اور paid جانب کا ہر طریقۂ کار tier سے بے نیاز ہوتا ہے۔ دونوں میں سے کوئی بھی اس کا جواب نہیں دیتا:

> "وہ quota استعمال کرو جس کی ادائیگی میں پہلے ہی کرتا ہوں۔ جب وہ ختم ہو جائے تو یا تو رک جاؤ، یا
> سستے ترین paid options میں سے ایک وقت میں ایک درجہ اوپر جاؤ — اور reset ہوتے ہی واپس آ جاؤ۔"

## Billing، model کی نہیں بلکہ connection کی خصوصیت ہے

`classifyTier()` (`open-sse/services/tierResolver.ts`)، `(provider, model)` کو کلید بناتا ہے اور
catalog pricing کی بنیاد پر `free | cheap | premium` واپس کرتا ہے۔ لیکن کسی request پر اضافی رقم خرچ ہوتی ہے یا نہیں،
اس کا انحصار اس بات پر ہے کہ **کون سا connection اسے serve کرتا ہے**: وہی model ایک Claude Code
OAuth connection کے ذریعے plan میں شامل ہوتا ہے، جبکہ API-key connection کے ذریعے فی token bill ہوتا ہے۔

`provider_connections.auth_type` کسی بھی سمت میں محفوظ proxy نہیں ہے — metered OAuth
connections بھی موجود ہیں، اور plan میں شامل API-key connections بھی (Copilot seat token کوئی
metered API key نہیں ہے)۔ لہٰذا billing class ایک **منتخب اور جانچا ہوا catalog**،
`open-sse/config/connectionBillingCatalog.ts`، سے آتی ہے، جسے ہر provider کی شائع کردہ شرائط کی بنیاد پر
دستی طور پر مقرر کیا جاتا ہے — یہی pattern `FreeModelBudget.hardStopGuaranteed` نے پہلے ہی مفت models کے لیے قائم کیا تھا۔

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

حل کی ترتیب (`autoCombo/connectionBilling.ts`): مصنوعی no-auth sentinel →
`keyless`؛ provider **اور** `authType` دونوں سے مطابقت رکھنے والی catalog entry؛ provider-wide entry؛
بصورتِ دیگر `unknown`۔ **غیر مرتب شدہ کو مفت نہیں سمجھا جاتا** — `unknown` کو ہر جگہ `metered`
کے طور پر استعمال کیا جاتا ہے، اس لیے کل شامل کیا گیا provider ابتدا میں subscription rung سے باہر ہوگا اور اسے
جان بوجھ کر catalog میں شامل کرنا پڑے گا۔

## Rung model

ترقی کی ترتیب میں پانچ rungs ہیں۔ ان میں فرق صرف قیمت کا نہیں — ہر ایک کا **اپنا**
exhaustion signal ہے، اسی لیے یہ محض sort نہیں ہے۔

| #   | Rung           | رکنیت                                              | کب exhausted سمجھا جائے گا         |
| --- | -------------- | -------------------------------------------------- | ---------------------------------- |
| 0   | `subscription` | منتخب `billing: "subscription"`                    | quota window cutoff پر یا اس سے کم |
| 1   | `keyless`      | مصنوعی no-auth path                                | connection cooldown / breaker      |
| 2   | `free`         | metered connection، `classifyTier() === "free"`    | مفت allowance ختم ہو جائے          |
| 3   | `cheap`        | metered connection، `classifyTier() === "cheap"`   | فی-rung budget استعمال ہو جائے     |
| 4   | `premium`      | metered connection، `classifyTier() === "premium"` | فی-rung budget استعمال ہو جائے     |

Rungs 0-2، **quota** پر exhaust ہوتے ہیں، جس کا مشاہدہ کیا جا سکتا ہے اور جسے پہلے ہی track کیا جاتا ہے۔ Rungs 3-4 کے پاس کوئی
quota نہیں — paid connection ہمیشہ serve کرتا رہتا ہے — اس لیے ان کا واحد معقول exhaustion signal فی-rung
**budget** ہے۔ اس کے بغیر، "cheap ختم ہونے پر escalate کرو" کے لیے کوئی trigger موجود نہیں ہوتا۔

## `auto/subscription` — ناکامی کی صورت میں بند

پول = صرف درجہ 0، اور صرف ان کنکشنز تک محدود جن کا حد سے تجاوز دستاویزی طور پر `hard-stop` ہو، اور ہر ایک کی براہِ راست تصدیق ہو کہ اس میں کوٹے کی گنجائش موجود ہے۔ ہر مبہم چیز خارج کر دی جاتی ہے: غیر مرتب شدہ فراہم کنندہ، کوٹے کی ناقابلِ تصدیق ریڈنگ، باسی ریڈنگ، یا ایسا حد سے تجاوز جس کی پیمائش ادائیگی کے لیے ہو۔

خالی پول **مطلوبہ** جواب ہے، نقص نہیں — کالر کا موجودہ خالی پول والا راستہ اسے خاموش، قابلِ بلنگ متبادل کے بجائے واضح خرابی میں بدل دیتا ہے۔ اس id کا پورا وعدہ یہی ہے۔

`keyless` دانستہ طور پر اہل **نہیں** ہے: اس گروپ بندی کا مطلب ہے "وہ پلان جس کے لیے میں ادائیگی کرتا ہوں"، اس لیے بغیر توثیق والا بیک اینڈ اس میں شامل نہیں ہوتا۔ اس مقصد کے لیے `auto/thrifty` (یا `auto/best-free`) استعمال کریں۔

### کنکشن کی حفاظت

امیدوار ہمیشہ صرف ایک کنکشن سے منسلک نہیں ہوتا — ایک منطقی امیدوار کے پاس `allowedConnectionIds` اجازت فہرست ہوتی ہے، اور حقیقتاً استعمال ہونے والا اکاؤنٹ بعد میں، ڈسپیچ کے وقت، `open-sse/services/combo/autoStrategy.ts` کے ذریعے منتخب کیا جاتا ہے۔ لہٰذا دونوں گروپ بندیاں **ہر کنکشن کی انفرادی طور پر** تصدیق کرتی ہیں اور `allowedConnectionIds` کو دوبارہ لکھ کر صرف باقی بچنے والے ذیلی مجموعے تک محدود کرتی ہیں — نہ کبھی مکمل اصل فہرست، نہ ہی من مانے طور پر منتخب کیا گیا ایک رکن۔ چونکہ `autoStrategy.ts` پہلے ہی اس ارے کو سخت اجازت فہرست کے طور پر نافذ کرتا ہے، اس لیے اسے یہاں دوبارہ لکھنے سے "تصدیق شدہ" اور "حقیقتاً استعمال شدہ" مجموعے ساختی طور پر ایک ہی ہو جاتے ہیں۔ یہ وہی مستقل اصول، اور وہی استدلال ہے جو [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) میں ہے۔

## `auto/thrifty` — ایک وقت میں ایک درجہ اوپر جائیں

پول = تمام درجے، درجہ اشاریے کے مطابق مرتب، جبکہ ختم شدہ امیدوار خارج کر دیے جاتے ہیں۔ `auto` انجن باقی بچنے والے پول کے **اندر** اب بھی اسکورنگ کرتا ہے: سیڑھی طے کرتی ہے کہ کون سے درجے زیرِ استعمال ہیں، جبکہ اسکورنگ طے کرتی ہے کہ ان کے اندر کون سا امیدوار جیتتا ہے۔ ایک درجے کے اندر ترتیب مستحکم رہتی ہے، اس لیے یہ بالائی تہہ اسکورر کی اپنی درجہ بندی کو کبھی ازسرِنو ترتیب نہیں دیتی۔

یہ ترتیب + گیٹنگ کی بالائی تہہ ہے، **نیا** ڈسپیچر نہیں: `combo.ts` کا قیاسی لوپ پہلے ہی اہداف پر ترتیب سے چلتا ہے اور ناکامی کی صورت میں اگلے ہدف کی طرف بڑھ جاتا ہے، اس لیے ایسی رن ٹائم کوٹا فرسودگی جسے پیشگی جانچ نہ پکڑ سکے، پھر بھی اسی درخواست کے اندر اگلے درجے تک لے جاتی ہے۔

جہاں `auto/subscription` ناکامی پر **بند** ہو جاتا ہے، وہاں `auto/thrifty` ناکامی پر **کھلا** رہتا ہے: پلان میں شامل ایسا کنکشن جس کے لیے قابلِ استعمال کوٹا ریڈنگ موجود نہ ہو، پھر بھی پہلے آزمایا جاتا ہے۔ اسے آزمانے کی کوئی لاگت نہیں، اور اگر وہ ختم شدہ نکلے تو اگلے درجے تک منتقلی بہرحال ہو جاتی ہے — جبکہ اسے آزمانے سے انکار، ٹیلی میٹری نہ ہونے پر درخواست کو ادائیگی والے درجے پر بھیج دے گا، یعنی عین وہ نتیجہ جس سے بچنے کے لیے یہ گروپ بندی موجود ہے۔

## ری سیٹ کے بعد پلان پر واپسی

روٹنگ کے درجہ 0 پر واپس آنے سے پہلے تین آزاد چیزوں کا ختم ہونا ضروری ہے۔ صرف ایک کو درست کرنے سے، پلان دوبارہ بھرنے کے کافی دیر بعد تک سیڑھی ادائیگی والے درجوں پر اٹکی رہتی ہے۔

1. **کوٹا اسٹیٹ کیش** — `freeAccessQuota.ts` فی `(provider, connection)` کو 180s TTL کے ساتھ کیش کرتا ہے۔ ایسی کیش شدہ انٹری جس کا اپنا `resetAt` پہلے ہی گزر چکا ہو، ایک ایسی ونڈو بیان کرتی ہے جو اب موجود نہیں، اس لیے اب اسے عمر سے **قطع نظر** باسی سمجھا جاتا ہے اور ریفریش لازمی ہو جاتا ہے۔ اس کے بغیر، نصف شب کو دوبارہ بھرنے والا پلان اس وقت تک ختم شدہ دکھائی دیتا رہتا ہے جب تک اتفاقاً TTL ختم نہ ہو جائے۔
2. **سیڑھی کی اپنی حالت** — ڈیزائن کے مطابق ایسی کوئی حالت نہیں۔ ہر پول کی تعمیر پر براہِ راست کوٹا حالت سے درجے کی اہلیت دوبارہ شمار کی جاتی ہے؛ "فی الحال درجہ 3 پر" کا کوئی مستقل ریکارڈ موجود نہیں جو ری سیٹ سے زیادہ دیر زندہ رہ کر روٹنگ کو جام کر سکے۔
3. **کنکشن کول ڈاؤن** — کوٹا ختم کرنے والا 429، ایکسپونینشل بیک آف سے `rateLimitedUntil` مقرر کرتا ہے، جو پلان کنکشن کے لیے حقیقی ری سیٹ سے آگے نکل سکتا ہے۔ `clampCooldownToReset()` (`subscriptionLadder.ts`) کول ڈاؤن کو اپ اسٹریم کے اپنے ری سیٹ کے لمحے تک محدود کرتا ہے اور اسے کبھی بڑھا نہیں سکتا۔ **یہ نافذ اور آزمودہ ہے، مگر ابھی وائر نہیں کیا گیا**: `src/sse/services/auth.ts` میں کسی بھی کول ڈاؤن کے لکھے جانے سے _پہلے_ کوٹا کیش منسوخ کر دیا جاتا ہے، اس لیے `resetAt` کو اس فنکشن میں پہلے محفوظ کرنا ضروری ہے — یہ لچک پذیری کے حساس راستے میں ایک تبدیلی ہے، جسے اپنی الگ نظرثانی شدہ PR میں ہونا چاہیے۔ تب تک، دوبارہ داخلہ کنکشن کول ڈاؤن ختم ہونے کا انتظار کرتا ہے (جو فراہم کنندہ کی جانب سے بھیجے جانے پر پہلے ہی اپ اسٹریم `Retry-After` اشاروں کو ترجیح دیتا ہے)۔

### بار بار تبدیلی سے بچاؤ

جو درجہ ابھی ری سیٹ ہوا ہو، اسے صرف `reentryMinRemainingPercent` (پہلے سے طے شدہ 5) سے اوپر ہونے پر دوبارہ شامل کیا جاتا ہے، جبکہ پہلے سے زیرِ استعمال کنکشن کو صرف `exitCutoffPercent` (پہلے سے طے شدہ 2، جو `quotaPreflight.defaultThresholdPercent` سے مطابقت رکھتا ہے) سے اوپر رہنا ہوتا ہے۔ ان دونوں کے درمیان فرق ہسٹریسس بینڈ ہے — اس کے بغیر، کٹ آف کے آس پاس منڈلاتا ہوا کنکشن لگاتار درخواستوں پر درجوں کے درمیان جھولتا رہتا ہے۔

## کنفیگریشن

صرف ٹیوننگ کے لیے۔ دانستہ طور پر کوئی `enabled` فلیگ موجود **نہیں** ہے: انہیں بند کرنے کے قابل ٹوگل سے
`auto/subscription` خاموشی سے مکمل پول — بشمول بامعاوضہ ماڈلز — ایک ایسے
نام کے تحت فراہم کرتا رہتا جو اس کے برعکس کا وعدہ کرتا ہے۔

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 کسی زینے کو مکمل طور پر غیر فعال کر دیتا ہے
  },
}
```

بجٹ گیٹنگ اس وقت تک غیر فعال رہتی ہے جب تک اسپینڈ ریزالور منسلک نہ کیا جائے: اکاؤنٹنگ دستیاب نہ ہونے کی صورت میں بامعاوضہ
زینہ ترتیب میں شامل ہوتا ہے مگر کبھی گیٹ نہیں کیا جاتا۔ v3.8.51 کے مطابق `rungBudgetUsd` سیٹنگ کو
اسکیما قبول کرتا ہے، لیکن ابھی تک اس کا نفاذ **نہیں** کیا گیا — اسے فعال اخراجات کی حد کے بجائے محفوظ شدہ کنفیگریشن سمجھیں۔ زینوں کی ترتیب، کوٹے کی بنیاد پر ختم ہونا، اور ری سیٹ کے بعد دوبارہ داخلہ، سب
اس کے بغیر کام کرتے ہیں۔

## امتزاج

`subscription` اور `thrifty`، `AutoTier` ویلیوز ہیں، اس لیے وہ ہر زمرے کے ساتھ امتزاج بناتے ہیں:
`auto/coding:thrifty`، `auto/reasoning:subscription`، وغیرہ۔ دونوں سادہ ids
(`auto/subscription`، `auto/thrifty`) کی تشہیر `/v1/models` اور ڈیش بورڈ میں کی جاتی ہے۔

دونوں میں سے کوئی id بامعاوضہ ٹیئر نہیں ہے، اس لیے `isPaidTierAutoId()` دونوں کے لیے `false` واپس کرتا ہے اور
`auto/subscription`، `hidePaidModels` کے باوجود برقرار رہتا ہے۔

## کوڈ کہاں موجود ہے

| متعلقہ پہلو                       | فائل                                                |
| --------------------------------- | --------------------------------------------------- |
| منتخب شدہ بلنگ حقائق              | `open-sse/config/connectionBillingCatalog.ts`       |
| کلاسیفائر                         | `open-sse/services/autoCombo/connectionBilling.ts`  |
| زینے، دونوں گروپنگز، دوبارہ داخلہ | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| امیدوار پول میں وائرنگ            | `open-sse/services/autoCombo/virtualFactory.ts`     |
| ری سیٹ سے آگاہ کیش کی فرسودگی     | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| ٹیئر سرفیس                        | `open-sse/services/autoCombo/suffixComposition.ts`  |
| مشتہر شدہ ids                     | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| ٹیسٹس                             | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
