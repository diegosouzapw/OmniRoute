# Management Authentication (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute میں **اسناد کی چار اقسام** ہیں جو انتظامی روٹس کو مجاز بنا سکتی ہیں۔
یہ ایک دوسرے کے متبادل نہیں ہیں۔ Inference API keys (`sk-…`) سرور کا انتظام **نہیں** کرتیں،
الا یہ کہ انہیں واضح طور پر `manage` یا `admin` scope دیا گیا ہو۔

بنیادی نفاذ: `src/lib/api/requireManagementAuth.ts`۔

| سند                   | عمومی شکل                          | کہاں بنائی جاتی ہے                                  | مطلوبہ استعمال               | انتظامی صلاحیت                                                                              |
| --------------------- | ---------------------------------- | --------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------- |
| Dashboard JWT session | `auth_token` cookie                | Dashboard login                                     | Browser UI                   | مکمل dashboard انتظام، جو CSRF، مقامیت، اور ہمیشہ محفوظ رہنے والے روٹس کے قواعد سے مشروط ہے |
| CLI machine-id token  | اندرونی / مقامی                    | CLI bootstrap (اسی مشین پر `omniroute`)             | مقامی CLI                    | صرف مقامی انتظام                                                                            |
| Scoped Access Token   | `oma_live_…`                       | **Settings → Access Tokens** یا `omniroute connect` | ریموٹ CLI اور management API | روٹ کے مطلوبہ `read`، `write`، یا `admin` scope کو پورا کرنا ضروری ہے                       |
| Inference API key     | `sk-…` (اور دیگر API-key prefixes) | **API Manager / API Keys**                          | `/v1/*` inference            | **کوئی نہیں**، الا یہ کہ key metadata میں `manage` یا `admin` شامل ہو                       |

`oma_` اسناد management/CLI اسناد ہیں۔ یہ inference API keys **نہیں** ہیں۔

اگر سرور کے لیے login/API-key auth غیر فعال ہو، تو کچھ انتظامی روٹس
بغیر توثیق والی calls قبول کر سکتے ہیں۔ صرف مقامی اور ہمیشہ محفوظ رہنے والے روٹس پھر بھی
اپنے قواعد لاگو کرتے ہیں۔ لہٰذا ان اسناد میں سے کسی ایک کو پیش کرنا ہر صورت میں
لازمی نہیں، اور مطلوبہ scope اور روٹ کی مقامیت کے بغیر کسی سند کا مالک ہونا بھی
ہر صورت میں کافی نہیں۔

متعلقہ: [ریموٹ موڈ](./REMOTE-MODE.md) (ریموٹ CLI کے لیے `oma_live_…` کیسے جاری کیا جاتا ہے)۔

---

## Scope میٹرکس

API-key management scopes اور access-token scopes کی اصطلاحات مختلف ہیں۔
MCP tool scopes اصطلاحات کا ایک تیسرا مجموعہ ہیں، جنہیں ذیل کی جدولوں میں موجود
کسی بھی function کے بجائے `scopeMatches` کے ذریعے جانچا جاتا ہے۔ بالمقابل:
[تین scope namespaces](../frameworks/MCP-SERVER.md#three-scope-namespaces)۔

### Access Token scopes (`oma_live_…`)

| Scope   | عمومی کارروائیاں                                                             |
| ------- | ---------------------------------------------------------------------------- |
| `read`  | فہرست/status GETs جنہیں دیکھنے کی token کو اجازت ہے                          |
| `write` | admin سے کم درجے کی تبدیلیاں (تخلیق/تجدید/حذف)                               |
| `admin` | مکمل ریموٹ CLI / connect token (password bootstrap یہاں بطور ڈیفالٹ ہوتا ہے) |

`read` والا token کسی `write` روٹ کو call نہیں کر سکتا۔ Runtime message کی شکل:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-key management scopes

| Scope       | مفہوم                                                                   |
| ----------- | ----------------------------------------------------------------------- |
| (کوئی نہیں) | صرف inference۔ Management routes 403 واپس کرتے ہیں۔                     |
| `manage`    | Management API (`requireManagementAuth` کی API-key branch والا ہی gate) |
| `admin`     | `hasManageScope` کو بھی پورا کرتا ہے (management-capable سمجھا جاتا ہے) |

API Keys / API Manager UI میں key پر `manage` فعال کریں۔ automation کے لیے
chat client key کو دوبارہ استعمال نہ کریں، الا یہ کہ آپ نے جان بوجھ کر اسے وہ scope دیا ہو۔

---

## بنانے اور منسوخ کرنے کا طریقہ

### ڈیش بورڈ JWT سیشن

1. `/login` کھولیں، مینجمنٹ پاس ورڈ کے ساتھ سائن اِن کریں (پہلی بار بوٹ ہونے پر `INITIAL_PASSWORD`)۔
2. کوکی `auth_token`، HttpOnly ہے۔ براؤزر ڈیش بورڈ اسے خودکار طور پر استعمال کرتا ہے۔
3. `/api/auth/logout` کے ذریعے لاگ آؤٹ کریں۔ نقل کرنے کے لیے کوئی طویل مدتی خفیہ قدر موجود نہیں ہے۔

### CLI مشین-id ٹوکن

1. `omniroute` کو سرور والے **اسی ہوسٹ** پر چلائیں (loopback)۔
2. CLI، `~/.omniroute/` کے تحت ایک مشین-id ٹوکن بوٹسٹریپ کرتا ہے (chmod 600)۔
3. یہ کسی دوسری مشین سے کام **نہیں** کرتا۔ ریموٹ CLI کے لیے Access Token استعمال کریں۔

### محدود دائرۂ کار والا Access Token (`oma_live_…`)

1. ڈیش بورڈ: **Settings → Access Tokens** → بنائیں (نام + دائرۂ کار)۔ **خفیہ قدر صرف ایک بار دکھائی جاتی ہے۔**
2. یا CLI: `omniroute connect <host>` (پاس ورڈ → ٹوکن)۔ [ریموٹ موڈ](./REMOTE-MODE.md) دیکھیں۔
3. ہیڈر: `Authorization: Bearer oma_live_…`
4. اسی Access Tokens صفحے سے منسوخ کریں (یا CLI سیاق حذف کریں)۔
5. سرور صرف ہیش محفوظ کرتا ہے۔ سادہ متن کو پاس ورڈ کی طرح محفوظ رکھیں۔

### `manage` دائرۂ کار والی API کلید

1. ڈیش بورڈ: **API Manager / API Keys** → کوئی کلید بنائیں یا ترمیم کریں → `manage` (یا `admin`) فعال کریں۔
2. ہیڈر: `Authorization: Bearer sk-…` (کلید کا اصل سابقہ)۔
3. اسی UI میں اسے منسوخ کریں یا `manage` ہٹا دیں۔
4. ایسی آٹومیشن کے لیے کم از کم اختیارات دیں جو CLI نہیں ہے: صرف GET کاموں کے لیے `read` Access Token کو ترجیح دیں؛ کسی API کلید پر `manage` صرف اس وقت استعمال کریں جب کالر کو `/v1` اور مینجمنٹ، دونوں سے رابطہ کرنا ضروری ہو۔

---

## ہیڈر کی ساخت

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

مینجمنٹ کی اسناد URL پاتھ یا کوئری اسٹرنگ میں نہ ڈالیں۔ مینجمنٹ
توثیق صرف ہیڈر/کوکی کے ذریعے ہوتی ہے۔

---

## نقل کرکے استعمال کرنے کی مثالیں

صرف پڑھنے کے لیے (فراہم کنندگان کی فہرست)۔ ایک `read` Access Token استعمال کریں:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

ترمیم کے لیے (فراہم کنندہ کا کنکشن بنائیں)۔ `write`/`admin` Access Token یا
`manage` دائرۂ کار والی API کلید استعمال کریں:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

انفرنس (مینجمنٹ نہیں)۔ عام API کلید، `manage` درکار نہیں:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## موجودہ رن ٹائم کی خرابیاں (خفیہ اقدار واپس نہ دکھائیں)

| صورتِ حال                              | عمومی اسٹیٹس | پیغام (خفیہ معلومات سے پاک)                                          |
| -------------------------------------- | ------------ | -------------------------------------------------------------------- |
| کوئی سند نہیں                          | 401          | `Authentication required`                                            |
| غلط/میعاد ختم شدہ `oma_live_…`         | 401          | `Invalid or expired access token`                                    |
| `manage`/`admin` کے بغیر درست API کلید | 403          | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| مینجمنٹ روٹ پر غلط عام API کلید        | 403          | `Invalid management token`                                           |
| Access Token کا دائرۂ کار بہت کم       | 403          | `Access token scope '<have>' is insufficient; '<need>' required.`    |

`Invalid management token` کا مطلب ہے کہ bearer کو مینجمنٹ کی سند کے طور پر
قبول **نہیں** کیا گیا۔ یہ آپ کو نہیں بتاتا کہ کس قسم کی سند بنانی ہے۔ اوپر دی گئی جدول استعمال کریں:
انفرنس کلیدوں کو `manage` دائرۂ کار درکار ہے؛ ریموٹ CLI کو `oma_live_…` درکار ہے؛ ڈیش بورڈ
سیشن کوکی استعمال کرتا ہے۔

---

## تجویز کردہ کم از کم مراعات والا انتخاب

| کال کرنے والا                                      | استعمال کریں                                        |
| -------------------------------------------------- | --------------------------------------------------- |
| براؤزر                                             | ڈیش بورڈ سیشن                                       |
| سرور ہوسٹ پر CLI                                   | مشین ٹوکن                                           |
| ریموٹ سرور سے رابطہ کرنے والے لیپ ٹاپ پر CLI       | `omniroute connect` سے حاصل کردہ `oma_live_…`       |
| CI / اسکرپٹس (صرف انتظام کے لیے)                   | `oma_live_…`، ایسے کم ترین اسکوپ کے ساتھ جو کام کرے |
| CI جسے `/v1` اور `/api` دونوں کو کال کرنا ضروری ہو | `manage` کے ساتھ API کلید **یا** دو اسناد           |
