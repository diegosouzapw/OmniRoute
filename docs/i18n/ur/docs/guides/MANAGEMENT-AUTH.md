# Management Authentication (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute میں **اسناد کے چار خاندان** ہیں جو انتظامی روٹس کو مجاز بنا سکتے ہیں۔
یہ ایک دوسرے کے متبادل نہیں ہیں۔ استدلالی API کلیدیں (`sk-…`) سرور کا
انتظام **نہیں** کرتیں، جب تک انہیں واضح طور پر `manage` یا `admin` اسکوپ نہ دیا گیا ہو۔

بنیادی نفاذ: `src/lib/api/requireManagementAuth.ts`۔

| سند                    | عام شکل                         | کہاں بنائی جاتی ہے                                  | مطلوبہ استعمال            | انتظامی صلاحیت                                                                                 |
| ---------------------- | ------------------------------- | --------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| Dashboard JWT سیشن     | `auth_token` کوکی               | Dashboard لاگ اِن                                   | براؤزر UI                 | Dashboard کا مکمل انتظام، جو CSRF، مقامیت، اور ہمیشہ محفوظ رہنے والے روٹ کے اصولوں سے مشروط ہے |
| CLI machine-id ٹوکن    | داخلی / مقامی                   | CLI بوٹسٹریپ (اسی مشین پر `omniroute`)              | مقامی CLI                 | صرف مقامی انتظام                                                                               |
| اسکوپ شدہ Access Token | `oma_live_…`                    | **Settings → Access Tokens** یا `omniroute connect` | ریموٹ CLI اور انتظامی API | روٹ کے مطلوبہ `read`، `write`، یا `admin` اسکوپ کو پورا کرنا ضروری ہے                          |
| استدلالی API کلید      | `sk-…` (اور دیگر API-key سابقے) | **API Manager / API Keys**                          | `/v1/*` استدلال           | **کوئی نہیں**، جب تک کلید کے میٹا ڈیٹا میں `manage` یا `admin` شامل نہ ہو                      |

`oma_` اسناد انتظامی/CLI اسناد ہیں۔ یہ استدلالی API کلیدیں **نہیں** ہیں۔

اگر سرور کے لیے لاگ اِن/API-key توثیق غیر فعال ہو تو بعض انتظامی روٹس
غیر توثیق شدہ کالز قبول کر سکتے ہیں۔ صرف مقامی اور ہمیشہ محفوظ رہنے والے روٹس پر
ان کے اپنے اصول بدستور لاگو ہوتے ہیں۔ لہٰذا ان اسناد میں سے کسی ایک کو پیش کرنا ہر صورت میں
لازمی نہیں، اور مطلوبہ اسکوپ اور روٹ کی مقامیت کے بغیر کسی سند کا حامل ہونا بھی ہر صورت میں
کافی نہیں ہے۔

متعلقہ: [ریموٹ موڈ](./REMOTE-MODE.md) (ریموٹ CLI کے لیے `oma_live_…` کیسے جاری کیا جاتا ہے)۔

---

## اسکوپ میٹرکس

اسکوپس کے یہ دونوں ذخیرہ ہائے الفاظ **مختلف** ہیں۔ انہیں باہم نہ ملائیں۔

### Access Token اسکوپس (`oma_live_…`)

| اسکوپ   | عام کارروائیاں                                                    |
| ------- | ----------------------------------------------------------------- |
| `read`  | فہرست/حالت کی GET درخواستیں جنہیں دیکھنے کی ٹوکن کو اجازت ہے      |
| `write` | admin سے نچلی سطح کی تبدیلیاں (تخلیق/اپ ڈیٹ/حذف)                  |
| `admin` | مکمل ریموٹ CLI / connect ٹوکن (پاس ورڈ بوٹسٹریپ میں یہ ڈیفالٹ ہے) |

`read` رکھنے والا ٹوکن کسی `write` روٹ کو کال نہیں کر سکتا۔ رَن ٹائم پیغام کی شکل:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-key انتظامی اسکوپس

| اسکوپ       | مطلب                                                                |
| ----------- | ------------------------------------------------------------------- |
| (کوئی نہیں) | صرف استدلال۔ انتظامی روٹس 403 لوٹاتے ہیں۔                           |
| `manage`    | انتظامی API (`requireManagementAuth` کی API-key شاخ والا ہی گیٹ)    |
| `admin`     | `hasManageScope` کو بھی پورا کرتا ہے (انتظام کے قابل سمجھا جاتا ہے) |

API Keys / API Manager UI میں کلید کے لیے `manage` فعال کریں۔ خودکاری کے لیے کسی
چیٹ کلائنٹ کی کلید دوبارہ استعمال نہ کریں، جب تک آپ نے دانستہ طور پر اسے یہ اسکوپ نہ دیا ہو۔

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

## موجودہ رن ٹائم کی خرابیاں (راز ظاہر نہ کریں)

| صورتِ حال                              | عمومی اسٹیٹس | پیغام (حساس معلومات سے پاک)                                          |
| -------------------------------------- | ------------ | -------------------------------------------------------------------- |
| کوئی سند نہیں                          | 401          | `Authentication required`                                            |
| غلط/میعاد ختم شدہ `oma_live_…`         | 401          | `Invalid or expired access token`                                    |
| `manage`/`admin` کے بغیر درست API کلید | 403          | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| انتظامی روٹ پر غلط عام API کلید        | 403          | `Invalid management token`                                           |
| رسائی ٹوکن کا اسکوپ بہت کم ہے          | 403          | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" کا مطلب ہے کہ بیئرر کو انتظامی
سند کے طور پر **قبول نہیں** کیا گیا۔ اس سے یہ معلوم **نہیں** ہوتا کہ آپ کو کس قسم کی سند بنانی چاہیے۔ اوپر دی گئی جدول استعمال کریں:
استدلالی کلیدوں کو `manage` اسکوپ درکار ہے؛ ریموٹ CLI کو `oma_live_…` درکار ہے؛ جبکہ ڈیش بورڈ
سیشن کوکی استعمال کرتا ہے۔

---

## کم از کم اختیارات والا تجویز کردہ انتخاب

| کالر                                            | استعمال                                              |
| ----------------------------------------------- | ---------------------------------------------------- |
| براؤزر                                          | ڈیش بورڈ سیشن                                        |
| سرور ہوسٹ پر CLI                                | مشین ٹوکن                                            |
| ریموٹ سرور سے رابطہ کرنے والے لیپ ٹاپ پر CLI    | `omniroute connect` سے حاصل کردہ `oma_live_…`        |
| CI / اسکرپٹس (صرف انتظام کے لیے)                | کام کرنے والے سب سے محدود اسکوپ کے ساتھ `oma_live_…` |
| وہ CI جسے `/v1` اور `/api` دونوں کو کال کرنا ہو | `manage` والی API کلید **یا** دو اسناد               |
