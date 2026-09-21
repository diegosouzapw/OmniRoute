# Public Credentials Handling (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **حتمی ماخذ:** `open-sse/utils/publicCreds.ts`
> **ٹیسٹس:** `tests/unit/publicCreds.test.ts`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-08-07 — v3.8.50
> **ہدف قارئین:** وہ انجینئرز جو ایسے فراہم کنندگان کو انٹیگریٹ کر رہے ہیں جو اپنے عوامی CLIs میں عوامی OAuth client_id / client_secret / Firebase Web API keys فراہم کرتے ہیں۔
> **حیثیت:** upstream identifiers شامل کرنے والے تمام نئے کوڈ کے لیے **لازمی**۔

## یہ کیوں موجود ہے

- [مقامی ایپس کے لیے OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — انسٹال شدہ ایپس کے OAuth client_id / client_secret عوامی ہوتے ہیں؛ اصل سیکیورٹی PKCE فراہم کرتا ہے۔
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Web client identifiers کو دانستہ طور پر عوامی رکھا جاتا ہے۔

OmniRoute کو یہ اقدار شامل کرنا ضروری ہے تاکہ `.env` کنفیگر نہ کرنے والے صارفین کو بھی بغیر کسی اضافی ترتیب کے ایک فعال OAuth flow مل سکے۔ شامل شدہ fallback کے بغیر، "بس clone کریں اور چلائیں" والا طریقہ اپنانے والے کسی بھی صارف کے لیے Gemini / Antigravity providers کام کرنا بند کر دیتے ہیں۔

تاہم، `AIzaSy…`، `GOCSPX-…`، `…apps.googleusercontent.com` جیسی صریح اقدار کی **GitHub Secret Scanning**، **Semgrep** اور اسی نوعیت کے دیگر pattern scanners کے ذریعے مطابقت تلاش کی جاتی ہے۔ ہر release بے فائدہ false positives کا شور بن جاتی ہے، push protection جائز commits کو روک دیتا ہے، اور operators alert feed پر اعتماد کرنا چھوڑ دیتے ہیں۔

`open-sse/utils/publicCreds.ts` helper دونوں پابندیوں کو بیک وقت حل کرتا ہے:

- عوامی identifier کو **XOR-masked byte sequence** کے طور پر شامل کرتا ہے (source میں کوئی scanner pattern نہیں ہوتا)۔
- runtime پر `decodePublicCred` / `resolvePublicCred` کے ذریعے decode کرتا ہے۔
- ان raw values کا پتہ لگاتا ہے جو پہلے ہی معروف prefixes (`AIza`، `GOCSPX-`، `<digits>-<32hex>.apps.googleusercontent.com`، `Iv1.<hex>`) کی پیروی کرتی ہیں اور انہیں بغیر تبدیلی کے آگے بھیج دیتا ہے، لہٰذا اپنی موجودہ `.env` میں raw values رکھنے والے صارفین کے لیے **کسی migration کی ضرورت نہیں**۔

یہ **obfuscation ہے، encryption نہیں۔** source پڑھنے والا کوئی بھی شخص value بازیافت کر سکتا ہے — اور یہ قابل قبول ہے کیونکہ value کو دانستہ طور پر عوامی رکھا گیا ہے۔ واحد مقصد scanner regex matches سے بچنا ہے۔

## لازمی طریقۂ کار

### 1. نئی عوامی credential شامل کرنا

جب آپ کو upstream کی فراہم کردہ ایسی نئی value شامل کرنی ہو جو:

- کسی عوامی CLI / desktop app / browser bundle سے آتی ہو، **اور**
- upstream provider اسے عوامی client identifier کے طور پر دستاویزی شکل دیتا ہو (یا ایسا ہی برتاؤ کرتا ہو)، **اور**
- جسے بصورتِ دیگر pattern scanner match کر لے (`AIza…`، `GOCSPX-…`، `<digits>-…apps.googleusercontent.com` وغیرہ)،

…تو اس checklist پر عمل کریں:

1. masked byte sequence بنائیں:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts` میں `EMBEDDED_DEFAULTS` کے اندر ایک **غیر جانب دار key name** (`<provider>_id`، `<provider>_alt`، `<provider>_fb` وغیرہ) کے ساتھ نئی entry شامل کریں۔ helper میں `client_secret` یا `api_key` جیسے نام **استعمال نہ کریں** — یہ الفاظ Semgrep کے generic-secret rules کو متحرک کرتے ہیں۔

3. عوامی type union میں `keyof typeof EMBEDDED_DEFAULTS` شامل کریں (یہ خودکار طور پر infer ہوتا ہے)۔

4. consumer code میں hardcoded literal کو اس سے تبدیل کریں:

   ```ts
   // ایک env override
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // متعدد env aliases (پہلی غیر خالی قدر منتخب ہوگی)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // کوئی env override نہیں (ہمیشہ شامل شدہ default)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example` سے literal ہٹا دیں (اس کی جگہ صرف comments پر مشتمل ایسی دستاویز شامل کریں جو قارئین کو یہاں بھیجے):

   ```dotenv
   # ── فراہم کنندہ (Google / Firebase / وغیرہ) ──
   # عوامی OAuth credentials کو کوڈ میں اس کے ذریعے شامل کیا گیا ہے:
   # open-sse/utils/publicCreds.ts۔ صرف اپنی اقدار استعمال کرنے کے لیے یہ vars سیٹ کریں۔
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. نئی key کے لیے shape assertion شامل کرنے کی خاطر `tests/unit/publicCreds.test.ts` اپ ڈیٹ کریں (literal value کی نہیں بلکہ format کی تصدیق کریں — طریقے کے لیے موجودہ tests دیکھیں)۔

7. test files میں **کبھی بھی** `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literals شامل نہ کریں۔ `.join("")` fragments سے بنائے گئے `FAKE_*` constants استعمال کریں (موجودہ tests دیکھیں)۔

### 2. Consumers

- **صرف `resolvePublicCred()` / `resolvePublicCredMulti()` سے پڑھیں** — helper سے باہر کبھی بھی `decodePublicCredBytes()` کو براہِ راست call نہ کریں۔
- helper کو دانستہ طور پر کم خرچ (linear byte XOR) رکھا گیا ہے اور اسے module-load time پر call کرنا محفوظ ہے؛ defaults صرف ایک بار compute ہوتے ہیں۔
- env override کو ہمیشہ ترجیح حاصل ہوتی ہے۔ اگر کوئی صارف `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` سیٹ کرتا ہے تو helper اس raw value کو بغیر تبدیلی کے آگے بھیج دیتا ہے۔

### 3. ممنوعہ طریقے

❌ production code (`src/`، `open-sse/`، `electron/`، `bin/`) میں درج ذیل میں سے **کبھی بھی** کچھ نہ کریں:

```ts
// غلط: literal value Secret Scanning + Semgrep کو متحرک کرتی ہے
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// غلط: literal کا base64 — GitHub فروری/2025 سے اب بھی اسے شناخت کرتا ہے
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// غلط: string concatenation جو runtime پر pattern کو دوبارہ جوڑتی ہے
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// غلط: hex/ROT13 encoding — مختلف obfuscation، شناخت ہونے کا وہی خطرہ
clientSecret: hexDecode("474f4353..."),
```

یہ سب بالآخر کسی scanner کو متحرک کر دیتے ہیں۔ `resolvePublicCred()` استعمال کریں۔

❌ `.env.example` میں literal credentials **کبھی بھی** شامل نہ کریں۔ جن صارفین کو حقیقی upstream values درکار ہوں وہ انہیں خود عوامی CLI سے اخذ کر سکتے ہیں، یا اپنی OAuth registration استعمال کر سکتے ہیں۔

❌ کسی نئے secret-scanning alert کو پہلے یہ جانچے بغیر **کبھی بھی** مسترد نہ کریں کہ آیا credential کو اس helper میں منتقل کیا جانا چاہیے۔

## متعلقہ کنٹرولز

- `publicCreds.ts` میں `RAW_VALUE_PATTERN` ان سابقوں کی فہرست متعین کرتا ہے جو براہِ راست قدر استعمال کرنے کو متحرک کرتے ہیں (پسماندہ مطابقت)۔ اسے صرف دستاویزی عوامی اسناد کے فارمیٹس کے لیے توسیع دیں، ملکیتی رازوں کے لیے کبھی نہیں۔
- `.env.example`، CI کے `check-env-doc-sync` اسکرپٹ میں شامل ہے — جب آپ یہاں سے کوئی متغیر ہٹائیں، تو یقینی بنائیں کہ دستاویزات بھی اس کے مطابق ہوں۔
- `npm run test:vitest` اور `node --import tsx/esm --test tests/unit/publicCreds.test.ts`، دونوں ٹیسٹ مجموعوں کا کامیاب رہنا ضروری ہے۔

## اس معاون کو کب استعمال **نہیں** کرنا چاہیے

یہ معاون **صرف** ان اسناد کے لیے ہے جو:

1. اصل فراہم کنندہ کی جانب سے عوامی طور پر تقسیم کی جاتی ہیں (CLI بائنری، براؤزر بنڈل، سرکاری دستاویزات)۔
2. دستاویزی طور پر یا مضبوط قرینے کی بنیاد پر غیر خفیہ ہوں (PKCE سے محفوظ، Firebase ویب کلید، یا اس سے ملتی جلتی)۔

باقی ہر چیز کے لیے — آپریٹر کی جاری کردہ ٹوکنز، فی ٹیننٹ راز، آپ کی اپنی OAuth ایپ کا client_secret، خفیہ کاری کی کلیدیں، JWT راز، ڈیٹابیس پاس ورڈز — **صرف env vars** استعمال کریں (`process.env.FOO`، خالی قدر / صریح خرابی کے لیے `||` فال بیک)۔ ان کی جگہ `.env` اور [خفیہ کردہ اسناد کا ذخیرہ](./COMPLIANCE.md) ہے، سورس میں نہیں۔

## حوالہ جات

- [Google: مقامی ایپس کے لیے OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: کلائنٹ کی شناخت کے لیے API کلیدیں](https://firebase.google.com/docs/projects/api-keys)
- [GitHub خفیہ اسکیننگ کے تعاون یافتہ راز](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: ٹوکنز کے لیے base64 کا پتا لگانا (فروری 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- اس معاون کو متعارف کرانے والی کمٹ: `1a39c31f` — _fix(security): عوامی اپ اسٹریم اسناد کو مخفی کریں + خرابیوں کی تطہیر کو مرکزی بنائیں_
