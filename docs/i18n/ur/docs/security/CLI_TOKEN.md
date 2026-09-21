# CLI Machine-ID Token (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## جائزہ

OmniRoute CLI کمانڈز مقامی مینجمنٹ API کے ساتھ توثیق کے لیے
`HMAC-SHA256(machine-id, salt)` ٹوکن استعمال کرتی ہیں، جسے
`x-omniroute-cli-token` درخواست ہیڈر کے ذریعے بھیجا جاتا ہے۔

یہ CLI ذیلی کمانڈز (`omniroute status`، `omniroute providers`، وغیرہ) کو اس قابل
بناتا ہے کہ وہ ہر بار چلائے جانے پر صارف سے JWT یا پاس ورڈ فراہم کرنے کا تقاضا
کیے بغیر مینجمنٹ اینڈ پوائنٹس کو کال کر سکیں۔

## یہ کیسے کام کرتا ہے

1. `getMachineTokenSync()`، `node-machine-id` کے ذریعے ہارڈویئر مشین ID پڑھتا ہے
   (ناکامی کی صورت میں ایک خالی اسٹرنگ استعمال کرتا ہے، جس سے CLI توثیق غیر فعال
   ہو جاتی ہے)۔
2. یہ `HMAC-SHA256(machine_id, salt)` کا حساب لگاتا ہے اور مکمل 64 حروف پر مشتمل
   ہیکس ڈائجسٹ واپس کرتا ہے — ایک قطعی، ناقابلِ واپسی ٹوکن جو اس مشین سے منسلک
   ہوتا ہے۔
3. CLI ٹوکن کو `x-omniroute-cli-token` کے طور پر صرف اس وقت بھیجتا ہے جب حل شدہ
   منزل ایک واضح لوپ بیک URL (`localhost`، `127.0.0.0/8`، یا لوپ بیک IPv6) ہو۔
   ٹوکن رکھنے والی درخواستیں `redirect: error` استعمال کرتی ہیں، اس لیے کوئی
   مقامی ری ڈائریکٹ اسے کسی دوسرے اوریجن کو فارورڈ نہیں کر سکتا۔ ریموٹ سیاق و
   سباق اس کے بجائے محدود دائرۂ کار والے رسائی ٹوکن استعمال کرتے ہیں۔ اگر اخذ
   کرنا دستیاب نہ ہو تو CLI ہیڈر شامل نہیں کرتا، اور `omniroute doctor` خالی
   ٹوکن کو درست سمجھنے کے بجائے ناکامی کی اطلاع دیتا ہے۔
4. سرور (`src/server/authz/policies/management.ts`) اسی سالٹ کے ساتھ متوقع ٹوکن
   دوبارہ شمار کرتا ہے اور وقت کی بنیاد پر اخذ کیے جانے سے بچانے کے لیے
   `timingSafeEqual` کے ذریعے موازنہ کرتا ہے۔

## سیکیورٹی کی خصوصیات

| خصوصیت                                                    | تفصیل                                                                                                                                                                                                            |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **صرف لوپ بیک**                                           | صرف اس وقت قبول کیا جاتا ہے جب سرور کی قابلِ اعتماد پیئر-لوکیلٹی مہر (حقیقی TCP پیئر ایڈریس سے اخذ کردہ) لوپ بیک کی نشان دہی کرے۔ کلائنٹ کے زیرِ کنٹرول `Host` ہیڈر پر لوکیلٹی کے لیے کبھی اعتماد نہیں کیا جاتا۔ |
| **مستقل وقت میں موازنہ**                                  | `crypto.timingSafeEqual` ٹائمنگ حملوں کو روکتا ہے۔                                                                                                                                                               |
| **ناقابلِ واپسی**                                         | HMAC آؤٹ پٹ سے مشین ID بازیافت نہیں کی جا سکتی۔                                                                                                                                                                  |
| **`always` سے محفوظ راستوں کو بائی پاس نہیں کیا جا سکتا** | CLI ٹوکن کی جانچ سے پہلے `isAlwaysProtectedPath()` کا جائزہ لیا جاتا ہے۔ `/api/shutdown` اور `/api/settings/database` کے لیے ہمیشہ JWT درکار ہوتا ہے۔                                                            |
| **ناقابلِ برآمد**                                         | ٹوکن کو کبھی ڈسک پر نہیں لکھا جاتا اور نہ ہی لاگ کیا جاتا ہے۔                                                                                                                                                    |

## ڈیفالٹ سالٹ (ہر انسٹالیشن کے لیے بے ترتیب)

جب `OMNIROUTE_CLI_SALT` سیٹ نہ ہو، تو سالٹ ایک بے ترتیب 64 حروف پر مشتمل ہیکس
اسٹرنگ ہوتا ہے، جسے ایک بار تخلیق کر کے `<DATA_DIR>/cli-token-salt.json` (موڈ
`0600`) میں محفوظ کیا جاتا ہے — نہ کہ ریپوزٹری میں شامل لفظی قدر
`omniroute-cli-auth-v1`۔ `src/lib/machineToken.ts` میں `getActiveSalt()` اور
`bin/cli/utils/cliToken.mjs` میں اس کا مماثل نفاذ، دونوں ایک ہی فائل پڑھتے ہیں،
اس لیے اس انسٹالیشن پر سرور اور ہر CLI اجرا ایک ہی قدر پر متفق ہو جاتے ہیں؛
ریپوزٹری میں شامل لفظی قدر صرف آخری متبادل کے طور پر اس وقت استعمال ہوتی ہے جب
ابھی تک کوئی محفوظ شدہ یا ماحول سے حاصل کردہ سالٹ قائم نہ کیا جا سکے (مثلاً ایک
نئی صرف CLI انسٹالیشن، جس میں سرور ابھی کبھی نہ چلا ہو)۔ یہ پرانی مقررہ لفظی
ڈیفالٹ قدر کی کمزوری ختم کرتا ہے: `/etc/machine-id` عموماً ہر صارف کے لیے قابلِ
مطالعہ ہوتی ہے، اس لیے بصورتِ دیگر کوئی بھی مقامی صارف ہر ایسی انسٹالیشن کے لیے
وہی ٹوکن اخذ کر سکتا تھا جس میں کبھی `OMNIROUTE_CLI_SALT` سیٹ نہ کیا گیا ہو۔

## سالٹ کی تبدیلی

اخذ کردہ ٹوکن کو کوڈ میں تبدیلی کیے بغیر تبدیل کرنے کے لیے `OMNIROUTE_CLI_SALT` سیٹ کریں — اسے ہمیشہ محفوظ شدہ فی انسٹالیشن سالٹ پر ترجیح حاصل ہوتی ہے۔ تبدیلی کے بعد، اس مشین پر موجود تمام CLI پراسیس خودکار طور پر نیا ٹوکن استعمال کریں گے۔ یہ اس صورت میں مفید ہے جب پراسیس فہرست کے افشا ہونے سے سابقہ اخذ کردہ قدر ظاہر ہو گئی ہو۔

```bash
# مستقل تبدیلی (شیل پروفائل میں شامل کریں)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# تصدیق کریں کہ نیا ٹوکن استعمال ہو رہا ہے
omniroute status
```

## لیگیسی فارمیٹ (SHA-256، 32 حروف) — اب بھی قابل قبول

مندرجہ بالا HMAC فارمیٹ سے پہلے، CLI اپنا ٹوکن
`SHA-256(machineId + salt).hex[0..32]` (32 حروف کا سابقہ) کے طور پر
`bin/cli/utils/cliToken.mjs` میں اخذ کرتا تھا (`src/lib/machineToken.ts` میں `getLegacyCliTokenSync`)۔

پسماندہ مطابقت کے لیے سرور **دونوں** فارمیٹس قبول کرتا ہے: تصدیق کنندہ
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` بناتا ہے اور آنے والے
ہیڈر کا ہر ایک کے ساتھ `timingSafeEqual` کے ذریعے موازنہ کرتا ہے
(`src/server/authz/policies/management.ts` اور `src/lib/middleware/cliTokenAuth.ts`)۔
لہٰذا کوئی ٹوکن اس صورت میں درست ہے جب وہ **یا تو** 64 حروف کے HMAC ڈائجسٹ یا 32 حروف کے
لیگیسی SHA-256 سابقے سے مماثل ہو۔

**غیرفعال کرنے کا طریقہ:** CLI ٹوکن کے طریقۂ کار کو مکمل طور پر غیرفعال کرنے کے لیے `OMNIROUTE_DISABLE_CLI_TOKEN=true` (`env` یا `.env` میں) سیٹ کریں؛ اس کے بعد ہر رسائی کے لیے واضح API کلید درکار ہوگی۔ کثیر صارف میزبانوں پر اس کی سفارش کی جاتی ہے، کیونکہ `machine-id` فی آلہ ہوتا ہے (فی صارف نہیں) اور اسی میزبان پر موجود کوئی دوسرا صارف بھی یہی ٹوکن اخذ کر سکتا ہے۔

## فائلیں

| فائل                                      | مقصد                                      |
| ----------------------------------------- | ----------------------------------------- |
| `src/lib/machineToken.ts`                 | ٹوکن کا اخذ (`getMachineTokenSync`)       |
| `bin/cli/utils/cliToken.mjs`              | اسی اخذ کا CLI جانب کا عکس                |
| `<DATA_DIR>/cli-token-salt.json`          | محفوظ شدہ بے ترتیب فی انسٹالیشن سالٹ      |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` مستقل                  |
| `src/server/authz/policies/management.ts` | سرور جانب تصدیق                           |
| `src/server/authz/routeGuard.ts`          | لوپ بیک میزبان کی جانچ (`isLoopbackHost`) |

## مزید دیکھیں

- `docs/security/ROUTE_GUARD_TIERS.md` — روٹ کے تحفظ کی سطحیں
- `docs/architecture/AUTHZ_GUIDE.md` — اجازت دہی کا مکمل پائپ لائن عمل
