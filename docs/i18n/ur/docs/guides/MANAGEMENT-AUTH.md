# Management Authentication (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute کے پاس **چار کریڈینشل فیملیز** ہیں جو انتظامی روٹس کو اجازت دے سکتی ہیں۔
یہ آپس میں بدلے نہیں جا سکتے۔ انفرنس API کیز (`sk-…`) سرور کا انتظام **نہیں** کرتیں جب تک کہ انہیں واضح طور پر `manage` یا `admin` اسکوپ نہ دیا گیا ہو۔

کینونیکل امپلیمینٹیشن: `src/lib/api/requireManagementAuth.ts`۔

| کریڈینشل             | عام شکل                          | کہاں بنایا گیا                                   | مطلوبہ استعمال            | انتظامی صلاحیت                                                               |
| :------------------- | :------------------------------- | :----------------------------------------------- | :------------------------ | :--------------------------------------------------------------------------- |
| ڈیش بورڈ JWT سیشن    | `auth_token` کوکی                | ڈیش بورڈ لاگ ان                                  | براؤزر UI                 | مکمل ڈیش بورڈ کا انتظام، CSRF، لوکیلٹی، اور ہمیشہ محفوظ روٹ کے قواعد کے تابع |
| CLI مشین-آئی ڈی ٹوکن | اندرونی / مقامی                  | CLI بوٹ سٹریپ (اسی مشین پر `omniroute`)          | مقامی CLI                 | صرف مقامی انتظام                                                             |
| اسکوپڈ ایکسیس ٹوکن   | `oma_live_…`                     | **سیٹنگز → ایکسیس ٹوکنز** یا `omniroute connect` | ریموٹ CLI اور انتظامی API | روٹ کے مطلوبہ `read`، `write`، یا `admin` اسکوپ کو پورا کرنا ضروری ہے        |
| انفرنس API کی        | `sk-…` (اور دیگر API-کی پریفکسز) | **API مینیجر / API کیز**                         | `/v1/*` انفرنس            | **کوئی نہیں** جب تک کہ کی میٹا ڈیٹا میں `manage` یا `admin` شامل نہ ہو       |

`oma_` کریڈینشلز انتظامی/CLI کریڈینشلز ہیں۔ یہ انفرنس API کیز **نہیں** ہیں۔

اگر سرور کے لیے لاگ ان/API-کی کی تصدیق غیر فعال ہے، تو کچھ انتظامی روٹس غیر تصدیق شدہ کالز کو قبول کر سکتے ہیں۔ صرف مقامی اور ہمیشہ محفوظ روٹس اب بھی اپنے قواعد لاگو کرتے ہیں۔ لہذا، ان کریڈینشلز میں سے کسی ایک کو پیش کرنا عالمی طور پر لازمی نہیں ہے، اور مطلوبہ اسکوپ اور روٹ لوکیلٹی کے بغیر کسی ایک کا ہونا عالمی طور پر کافی نہیں ہے۔

متعلقہ: [ریموٹ موڈ](./REMOTE-MODE.md) (کس طرح `oma_live_…` ریموٹ CLI کے لیے بنایا جاتا ہے)۔

---

## اسکوپ میٹرکس

API-کی مینجمنٹ اسکوپس اور ایکسیس ٹوکن اسکوپس مختلف اصطلاحات ہیں۔ MCP ٹول اسکوپس ایک تیسری اصطلاح ہیں، جنہیں نیچے دی گئی جدولوں میں سے کسی بھی فنکشن کے بجائے `scopeMatches` کے ساتھ چیک کیا جاتا ہے۔ ساتھ ساتھ: [تین اسکوپ نیم اسپیسز](../frameworks/MCP-SERVER.md#three-scope-namespaces)۔

### ایکسیس ٹوکن اسکوپس (`oma_live_…`)

| اسکوپ   | عام آپریشنز                                                   |
| ------- | ------------------------------------------------------------- |
| `read`  | فہرست/اسٹیٹس GETs جو ٹوکن کو دیکھنے کی اجازت ہے۔              |
| `write` | ایڈمن سے نیچے کی تبدیلیاں (بنانا/اپ ڈیٹ کرنا/حذف کرنا)        |
| `admin` | مکمل ریموٹ CLI / کنیکٹ ٹوکن (پاس ورڈ بوٹ اسٹریپ ڈیفالٹس یہاں) |

ایک ٹوکن جس میں `read` ہو وہ `write` روٹ کو کال نہیں کر سکتا۔ رن ٹائم میسج کی شکل:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-کی مینجمنٹ اسکوپس

| اسکوپ    | مطلب                                                                    |
| -------- | ----------------------------------------------------------------------- |
| (none)   | صرف اندازہ۔ مینجمنٹ روٹس 403 واپس کرتے ہیں۔                             |
| `manage` | مینجمنٹ API (وہی گیٹ جو `requireManagementAuth` API-کی برانچ کا ہے)     |
| `admin`  | یہ `hasManageScope` کو بھی پورا کرتا ہے (مینجمنٹ کے قابل سمجھا جاتا ہے) |

API Keys / API Manager UI میں کی پر `manage` کو فعال کریں۔ آٹومیشن کے لیے چیٹ کلائنٹ کی کو دوبارہ استعمال نہ کریں جب تک کہ آپ نے جان بوجھ کر وہ اسکوپ نہ دی ہو۔

---

## تخلیق اور منسوخی کا طریقہ

### Dashboard JWT سیشن

1. `/login` کھولیں، اور انتظامی پاس ورڈ کے ساتھ سائن اِن کریں (پہلی بوٹ پر `INITIAL_PASSWORD`)۔
2. `auth_token` کوکی HttpOnly ہے۔ براؤزر Dashboard اسے خودکار طور پر استعمال کرتا ہے۔
3. `/api/auth/logout` کے ذریعے لاگ آؤٹ کریں۔ نقل کرنے کے لیے کوئی طویل مدتی راز موجود نہیں ہے۔

### CLI machine-id ٹوکن

1. سرور والے **اسی ہوسٹ** پر `omniroute` چلائیں (loopback)۔
2. CLI، `~/.omniroute/` کے تحت ایک machine-id ٹوکن بوٹسٹریپ کرتا ہے (chmod 600)۔
3. یہ کسی دوسری مشین سے کام **نہیں** کرتا۔ ریموٹ CLI کے لیے Access Token استعمال کریں۔

### اسکوپ شدہ Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → تخلیق کریں (نام + اسکوپ)۔ **راز صرف ایک مرتبہ دکھایا جاتا ہے۔**
2. یا CLI: `omniroute connect <host>` (پاس ورڈ → ٹوکن)۔ [ریموٹ موڈ](./REMOTE-MODE.md) دیکھیں۔
3. ہیڈر: `Authorization: Bearer oma_live_…`
4. اسی Access Tokens صفحے سے منسوخ کریں (یا CLI سیاق حذف کریں)۔
5. سرور صرف ہیش محفوظ کرتا ہے۔ سادہ متن کو پاس ورڈ کی طرح محفوظ رکھیں۔

### `manage` اسکوپ والی API کلید

1. Dashboard: **API Manager / API Keys** → کلید تخلیق یا ترمیم کریں → `manage` (یا `admin`) فعال کریں۔
2. ہیڈر: `Authorization: Bearer sk-…` (کلید کا اصل سابقہ)۔
3. اسی UI میں کلید منسوخ کریں یا `manage` ہٹا دیں۔
4. ایسی خودکاری کے لیے جو CLI نہیں ہے، کم سے کم اختیار اپنائیں: صرف GET والے کاموں کے لیے `read` Access Token کو ترجیح دیں؛ API کلید پر `manage` صرف اس وقت استعمال کریں جب کالر کو `/v1` اور انتظامی API دونوں سے رابطہ کرنا ضروری ہو۔

---

## ہیڈر کی شکل

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

انتظامی اسناد کو URL پاتھ یا کوئری اسٹرنگ میں نہ رکھیں۔ انتظامی
تصدیق صرف ہیڈر/کوکی کے ذریعے ہوتی ہے۔

---

## کاپی پیسٹ کی مثالیں

صرف پڑھنے کے لیے (فراہم کنندگان کی فہرست)۔ `read` رسائی ٹوکن استعمال کریں:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

ترمیم کے لیے (فراہم کنندہ کنکشن بنانا)۔ `write`/`admin` رسائی ٹوکن یا
`manage` اسکوپ والی API کلید استعمال کریں:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

استدلال (انتظام کے لیے نہیں)۔ عام API کلید، `manage` درکار نہیں:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## موجودہ رن ٹائم کی خرابیاں (رازوں کو ظاہر نہ کریں)

| صورتحال                                | عام حیثیت | پیغام (صاف شدہ)                                                               |
| :------------------------------------- | :-------- | :---------------------------------------------------------------------------- |
| کوئی سند نہیں                          | 401       | `تصدیق درکار ہے`                                                              |
| غلط/میعاد ختم شدہ `oma_live_…`         | 401       | `غلط یا میعاد ختم شدہ رسائی ٹوکن`                                             |
| `manage`/`admin` کے بغیر درست API کلید | 403       | `API کلید میں 'manage' اسکوپ کی کمی ہے۔ اسے API Keys ڈیش بورڈ میں فعال کریں۔` |
| انتظامی راستے پر غلط عام API کلید      | 403       | `غلط انتظامی ٹوکن`                                                            |
| رسائی ٹوکن کا اسکوپ بہت کم ہے          | 403       | `رسائی ٹوکن کا اسکوپ '<have>' ناکافی ہے؛ '<need>' درکار ہے۔`                  |

"غلط انتظامی ٹوکن" کا مطلب ہے کہ بیئرر کو انتظامی سند کے طور پر **قبول نہیں** کیا گیا۔
یہ آپ کو یہ نہیں بتاتا کہ کون سی فیملی بنانی ہے۔ اوپر دی گئی جدول استعمال کریں:
انفرنس کیز کو `manage` اسکوپ کی ضرورت ہوتی ہے؛ ریموٹ CLI کو `oma_live_…` کی ضرورت ہوتی ہے؛ ڈیش بورڈ سیشن کوکی استعمال کرتا ہے۔

---

## کم سے کم استحقاق کا تجویز کردہ انتخاب

| کالر                                               | استعمال                                               |
| -------------------------------------------------- | ----------------------------------------------------- |
| براؤزر                                             | ڈیش بورڈ سیشن                                         |
| سرور ہوسٹ پر CLI                                   | مشین ٹوکن                                             |
| ریموٹ سرور سے بات کرنے والے لیپ ٹاپ پر CLI         | `oma_live_…` سے `omniroute connect`                   |
| CI / اسکرپٹس (صرف انتظام)                          | `oma_live_…` سب سے چھوٹے اسکوپ کے ساتھ جو کام کرتا ہے |
| CI جسے `/v1` اور `/api` دونوں کو کال کرنا ضروری ہے | `manage` کے ساتھ API کلید **یا** دو اسناد             |
