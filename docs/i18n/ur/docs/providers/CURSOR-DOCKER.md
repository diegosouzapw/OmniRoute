# Cursor Provider in Docker Environments (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

جب OmniRoute، Docker کے اندر چلتا ہے تو پرانے **Cursor IDE سے درآمد کریں** /
`cursor-agent` طریقے ناکام ہو جاتے ہیں کیونکہ کنٹینر میزبان پر موجود Cursor
انسٹالیشن کو نہیں دیکھ سکتا۔ اس کے بجائے **Cursor کے ساتھ لاگ اِن کریں** (deep-control PKCE) استعمال کریں۔

## Docker میں IDE / CLI درآمد کیوں ناکام ہوتی ہے

1. **فائل سسٹم کی علیحدگی** — خودکار درآمد، کنٹینر کے _اندر_ Linux کے راستے تلاش کرتی ہے، مثلاً
   `~/.config/Cursor/User/globalStorage/state.vscdb`۔
   macOS کے لیے Docker Desktop پر میزبان IDE کا DB بطور ڈیفالٹ ماؤنٹ نہیں ہوتا، اور
   میزبان Darwin ہونے کے باوجود کنٹینر کا OS، Linux ہوتا ہے۔
2. **`cursor-agent` بائنری موجود نہیں** — سرکاری OmniRoute امیجز میں
   `cursor-agent` شامل نہیں ہوتا۔ پہلے دستیاب ماڈلز کے لیے
   `cursor-agent --list-models` چلایا جاتا تھا اور ناکامی کی صورت میں جامد کیٹلاگ استعمال ہوتا تھا۔
3. **غلط بائنری** — macOS کا `cursor-agent` کسی Linux
   کنٹینر میں bind-mount **نہ** کریں۔ یہ قابلِ اجرا نہیں ہوگا۔

## تجویز کردہ طریقہ: Cursor کے ساتھ لاگ اِن کریں

1. **Dashboard → Providers → Cursor** کھولیں۔
2. **Cursor کے ساتھ لاگ اِن کریں** ٹیب منتخب کریں۔
3. **Cursor کے ساتھ لاگ اِن کریں** پر کلک کریں — OmniRoute آپ کے **میزبان** براؤزر میں
   `https://cursor.com/loginDeepControl?…` کھولتا ہے۔
4. براؤزر میں لاگ اِن کی منظوری دیں، پھر ڈیش بورڈ پر واپس آئیں۔ ٹوکن موصول ہونے تک OmniRoute
   `api2.cursor.sh/auth/poll` کو پول کرتا ہے۔
5. OmniRoute، **access + refresh** ٹوکنز محفوظ کرتا ہے اور انہیں
   `https://api2.cursor.sh/auth/exchange_user_api_key` کے ذریعے ریفریش کرتا ہے۔

اس طریقے کے لیے کنٹینر کے اندر Cursor IDE یا `cursor-agent` درکار نہیں ہے۔

## ماڈل کی دریافت

لاگ اِن شدہ کنکشن کے ساتھ، **دستیاب ماڈلز / خودکار مطابقت پذیری** کنکشن کے bearer ٹوکن کے ذریعے Cursor کے
HTTP `AiService/AvailableModels` کیٹلاگ کو ترجیح دیتی ہے۔
اگر یہ ناکام ہو جائے تو OmniRoute پھر بھی میزبان کا `cursor-agent` استعمال کرنے کی کوشش کرتا ہے (اگر موجود ہو)، اور
اس کے بعد جامد رجسٹری سیڈ استعمال کرتا ہے۔

OmniRoute کیٹلاگ میں ہمیشہ **`auto`** (دکھایا جانے والا نام “Auto”)، نیز
OpenCodex طرز کے راؤٹر موڈز **`auto-cost`**، **`auto-balance`**، اور
**`auto-intelligence`** فراہم کرتا ہے۔ وائر پر یہ Cursor کے `default` ماڈل سے
میپ ہوتے ہیں (تینوں اقسام کے لیے `optimization` ModelParameter کے ساتھ)۔ جب
پریمیم ماڈلز کا استعمال ختم ہو جائے تو `cu/auto` کو ترجیح دیں — Auto کے پاس اکثر اب بھی بجٹ ہوتا ہے۔

### مطابقت پذیری کے بعد لائیو کیٹلاگ خصوصی ہوتا ہے

Cursor ماڈلز کی کامیاب مطابقت پذیری کے بعد (`cursor-agent --list-models` → محفوظ شدہ
مطابقت پذیر کیٹلاگ، یا اوپر بیان کردہ bearer سے تصدیق شدہ `AvailableModels` بازیافت)،
**ڈیش بورڈ**، **`/v1/models`**، اور **سب کی جانچ کریں** میں یہ فہرست دکھائی جاتی ہے:

1. لائیو مطابقت پذیری سے واپس آنے والے ماڈلز
2. شامل کردہ خودکار راؤٹر ids: `auto`، `auto-cost`، `auto-balance`، `auto-intelligence`
3. آپریٹر کے **حسبِ ضرورت** ماڈلز (درآمد / دستی) — مطابقت پذیری کے ذریعے کبھی حذف نہیں کیے جاتے

`open-sse/config/providers/registry/cursor/` کے تحت موجود بڑی جامد رجسٹری
**صرف آف لائن fallback** ہے۔ جب مطابقت پذیر فہرست خالی ہو (یا دریافت ناکام ہو جائے)، تو
فہرست سازی اس رجسٹری کو fallback کے طور پر استعمال کرتی ہے۔

Effort-suffixed ids (مثلاً `claude-4.6-sonnet-high`) کی اب بھی
رن ٹائم پر **درخواست** کی جا سکتی ہے: `resolveRequestedModel` لاحقہ ہٹا کر اسے وائر
`ModelParameter` میں تبدیل کرتا ہے۔ خصوصی فہرست سازی جان بوجھ کر ان جامد اقسام کو
سب کی جانچ کریں سے چھپاتی ہے تاکہ جانچ کے نتائج Cursor کی اصل دستیابی سے مطابقت رکھیں۔

### معاونین

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — ڈیش بورڈ انضمام
- `ensureCursorAutoCatalogEntry` — دریافت + فہرست سازی پر auto* کا اضافہ
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` جامد لوپ

## فراہم کنندہ کی حدود (کوٹہ)

Cursor کے لیے **استعمال → فراہم کنندہ کی حدود**، PKCE یا ٹوکن
درآمد کے بعد `api2.cursor.sh` پر Bearer APIs استعمال کرتا ہے
(`GetCurrentPeriodUsage` → استعمال کا خلاصہ → auth/usage)۔ پرانا cookie/`cursor.com`
ڈیش بورڈ راستہ، پرانے IDE سے درآمد شدہ سیشنز کے لیے آخری fallback کے طور پر موجود رہتا ہے۔

ونڈوز میں عموماً **کل**، **Auto + Composer**، اور **API** شامل ہوتے ہیں۔ اگر
حدود خالی دکھائی دیں تو **Cursor کے ساتھ لاگ اِن کریں** دوبارہ چلائیں یا ٹوکنز دوبارہ درآمد کریں (صرف IDE درآمد
اب مزید ضروری نہیں ہے)۔

## خالی ٹرنز / استعمال ختم ہونا

جب Cursor کسی Run کو قبول کر لے لیکن اسسٹنٹ کا کوئی متن واپس نہ کرے (یہ پریمیم
استعمال ختم ہونے پر عام ہے)، تو OmniRoute قابلِ عمل رہنمائی کے ساتھ **429** (کوٹے کے اشارے) یا
**502** دکھاتا ہے — محض “فراہم کنندہ نے خالی مواد واپس کیا” نہیں۔ اسٹریمنگ
کی ناکامیاں، مثلاً `not_found: AI Model Not Found` (استعمال کی مدت ختم ہونے پر)،
**Cursor کی شرح کی حد / استعمال سے تجاوز** کے طور پر درجہ بند کی جاتی ہیں اور SSE
پائپ لائن میں اسی پیغام کو برقرار رکھتی ہیں (مشترکہ خالی اسٹریم محافظ پہلے سے جاری کردہ خرابی کو
اوور رائٹ نہیں کرتا)۔ فراہم کنندہ کی حدود چیک کریں، **`auto`** ماڈل آزمائیں، یا
Cursor پلان کی حدود بڑھائیں۔

## کلائنٹ ورژن (ہیڈ لیس)

مقامی `cursor-agent` انسٹالیشن کے بغیر، OmniRoute
`x-cursor-client-version` کو پہلے env `CURSOR_AGENT_CLI_VERSION`، پھر Cursor انسٹالر اسکرپٹ کی
ڈسک میں کیش شدہ اسکریپنگ، اور پھر ایک pinned build id کے ذریعے طے کرتا ہے۔ ضرورت پڑنے پر
`CURSOR_AGENT_CLI_VERSION` سے اوور رائیڈ کریں۔

## fallback: دستی ٹوکن درآمد

اگر آپ براؤزر لاگ اِن مکمل نہیں کر سکتے:

1. میزبان پر Cursor کے `state.vscdb` سے ٹوکنز اخذ کریں:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor کے تصدیقی موڈل میں **ٹوکن درآمد کریں** کھولیں۔
3. **Access Token** اور، دستیاب ہونے پر، **Refresh Token** چسپاں کریں (خودکار
   ریفریش کے لیے ضروری)۔ Machine ID اختیاری ہے۔

صرف access token کی درآمد بھی کام کرتی ہے، لیکن refresh token کے بغیر اس کی میعاد ختم ہو جائے گی —
جب چیٹ تصدیقی خرابیاں واپس کرے تو دوبارہ درآمد کریں۔

## متعلقہ

- Zed Docker رہنمائی: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor لاگ اِن حوالہ (بیرونی):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
