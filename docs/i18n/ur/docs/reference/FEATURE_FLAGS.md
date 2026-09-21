# Feature Flags (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

> رن ٹائم ٹوگلز جو OmniRoute کے رویّے کو **دوبارہ تعیناتی کے بغیر** تبدیل کرتے ہیں۔
> یہاں درج ہر فلیگ کی تعریف
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> میں موجود ہے — یہی واحد مستند ماخذ ہے۔ ڈیش بورڈ اور REST API دونوں اسی
> فائل سے پڑھتے ہیں، اس لیے نیچے دی گئی جدول اس سے 1:1 مطابقت کے لیے تیار کی گئی ہے۔

---

## فیچر فلیگز کیا ہیں

فیچر فلیگ ایک نام زد ٹوگل (boolean یا enum) ہے، جس کی قدر کو رن ٹائم پر تبدیل
اور ڈیٹابیس میں محفوظ کیا جا سکتا ہے، اور اس کے لیے پراسیس کی دوبارہ تعیناتی
درکار نہیں ہوتی۔ ہر فلیگ کو ایک `FeatureFlagDefinition` کے ذریعے بیان کیا جاتا
ہے، جس میں `key`، `label`، `description`، `category`، `defaultValue`، `type`،
اور `requiresRestart` کا اشارہ شامل ہوتا ہے۔

### حل کرنے کی ترتیب

کسی فلیگ کی **مؤثر قدر** کو
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) درج ذیل ترجیحی
ترتیب کے مطابق حل کرتا ہے (سب سے زیادہ ترجیح غالب آتی ہے):

1. **DB اوور رائیڈ** — `feature_flags` نیم اسپیس کے تحت `key_value` جدول میں
   محفوظ قدر (جسے ڈیش بورڈ یا REST API کے ذریعے سیٹ کیا گیا ہو)۔
2. **ماحولیاتی متغیر** — `process.env[<KEY>]`، بشرطیکہ یہ سیٹ ہو اور خالی نہ ہو۔
3. **تعریف کی ڈیفالٹ قدر** — `featureFlagDefinitions.ts` سے حاصل کردہ `defaultValue`۔

ایک boolean فلیگ اس وقت **فعال** سمجھا جاتا ہے جب اس کی مؤثر قدر `"true"`،
`"1"`، یا `"yes"` ہو (`isFeatureFlagEnabled()` دیکھیں)۔

> [!NOTE]
> زیادہ تر فلیگز کے لیے **اسی نام** کا مماثل ماحولیاتی متغیر بھی موجود ہے،
> جس کی دستاویز [`ENVIRONMENT.md`](./ENVIRONMENT.md) میں دی گئی ہے۔ فلیگ کا DB
> اوور رائیڈ اس ماحولیاتی متغیر پر ترجیح رکھتا ہے۔ `requiresRestart: true` والا
> فلیگ فوراً محفوظ ہو جاتا ہے، لیکن اسے صرف پراسیس کے آغاز پر دوبارہ پڑھا جاتا
> ہے — اسے ٹوگل کرنے پر ڈیش بورڈ میں **"سرور دوبارہ شروع کریں"** کا بینر ظاہر ہوتا ہے۔

---

## فلیگ کیٹلاگ

6 زمروں میں 74 فلیگز۔ **Default** سے مراد تعریف میں مقرر کردہ ڈیفالٹ ہے — یعنی وہ قدر
جو اس وقت استعمال ہوتی ہے جب نہ DB اوور رائیڈ موجود ہو اور نہ کوئی انوائرمنٹ ویری ایبل۔

### سیکیورٹی (10)

| کلید                                    | قسم   | ڈیفالٹ   | تفصیل                                                                                                                                                                                                                                                                         |
| --------------------------------------- | ----- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | بولین | `false`  | تمام آنے والی درخواستوں کے لیے API کلید درکار بنائیں۔                                                                                                                                                                                                                         |
| `INPUT_SANITIZER_ENABLED`               | بولین | `true`   | تمام درخواستوں کے لیے ان پٹ کی صفائی فعال کریں۔                                                                                                                                                                                                                               |
| `INJECTION_GUARD_MODE`                  | اینم  | `off`    | پرامپٹ انجیکشن گارڈ موڈ۔ اقدار: `off`، `warn`، `block`، `redact`۔                                                                                                                                                                                                             |
| `PII_REDACTION_ENABLED`                 | بولین | `false`  | درخواستوں سے PII حذف کریں (`INPUT_SANITIZER_MODE` سے آزاد)۔                                                                                                                                                                                                                   |
| `PII_RESPONSE_SANITIZATION`             | بولین | `false`  | فراہم کنندہ کے جوابات سے PII صاف کریں۔                                                                                                                                                                                                                                        |
| `PII_RESPONSE_SANITIZATION_MODE`        | اینم  | `redact` | PII جواب کی صفائی کا موڈ۔ اقدار: `redact`، `warn`، `block`، `off`۔                                                                                                                                                                                                            |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | بولین | `true`   | نجی/داخلی IP رینجز کی جانب جانے والی آؤٹ باؤنڈ درخواستوں کو بلاک کریں۔                                                                                                                                                                                                        |
| `ALLOW_API_KEY_REVEAL`                  | بولین | `false`  | تصدیق شدہ ڈیش بورڈ صارفین کو صرف چھپی ہوئی اقدار دیکھنے کے بجائے محفوظ کردہ API کلیدیں ظاہر کرنے کی اجازت دیں۔                                                                                                                                                                |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | بولین | `false`  | AUTH لاگ لائنوں میں اکاؤنٹ کا سابقہ شامل کریں (مثلاً "استعمال کیا جا رہا <provider> اکاؤنٹ: abc12345...")۔ ڈیفالٹ طور پر غیر فعال ہے تاکہ مشترکہ/ملٹی ٹیننٹ پروسیس لاگز میں اکاؤنٹ شناخت کنندگان پوشیدہ رہیں۔ Debug Mode سے آزاد؛ Debug Mode تبدیل کرنے سے یہ ظاہر نہیں ہوتا۔ |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | بولین | `false`  | جب OIDC فعال ہو، تو پاس ورڈ لاگ اِن غیر فعال کریں تاکہ صارفین صرف OIDC Single Sign-On کے ذریعے تصدیق کر سکیں۔ غیر فعال ہونے پر (ڈیفالٹ)، پاس ورڈ لاگ اِن اور OIDC دونوں دستیاب ہوتے ہیں۔                                                                                      |

### نیٹ ورک (16)

| کلید                                            | قسم     | طے شدہ  | دوبارہ آغاز | تفصیل                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------- | ------- | ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓           | TLS فنگرپرنٹ کا مخفی موڈ فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |             | /v1/audio/* روٹس کو localhost سے باہر ہوسٹ کیے گئے OpenAI-مطابق فراہم کنندہ نوڈز استعمال کرنے کی اجازت دیں۔ بطور طے شدہ بند ہے — آڈیو کو کسی ریموٹ ہوسٹ کی طرف روٹ کرنے سے ایگریس شناخت تبدیل ہو جاتی ہے اور یہ آپریٹر کا واضح فیصلہ ہونا چاہیے۔ لوپ بیک نوڈز ہمیشہ مجاز اور غیر متاثر رہتے ہیں۔                                                                                                                                                                                             |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |             | POST /v1/rerank (اور میموری انجن کے لوپ بیک rerank مرحلے) کو localhost سے باہر ہوسٹ کیے گئے OpenAI-مطابق فراہم کنندہ نوڈز استعمال کرنے کی اجازت دیں۔ بطور طے شدہ بند ہے — کسی ریموٹ ہوسٹ کی طرف روٹ کرنے سے ایگریس شناخت تبدیل ہو جاتی ہے اور یہ آپریٹر کا واضح فیصلہ ہونا چاہیے۔ لوپ بیک نوڈز ہمیشہ مجاز ہیں؛ ریموٹ نوڈز کو فراہم کنندہ کی آؤٹ باؤنڈ URL پالیسی بھی پاس کرنا ہوگی۔                                                                                                          |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |             | جب کسی کنکشن کو کوئی پراکسی تفویض نہ کی گئی ہو تو رجسٹری سے پہلی کارآمد پراکسی خودکار طور پر منتخب کریں۔ بطور طے شدہ بند ہے (ورنہ رجسٹری کی کوئی بھی پراکسی عالمی متبادل بن جاتی ہے — #3332)۔                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |             | جب پراکسی تک رسائی کی پیشگی جانچ ناکام ہو تو OAuth اور فراہم کنندہ کی توثیقی کارروائیوں کو پن کردہ پراکسی سے گزرے بغیر براہ راست منسلک ہونے کی اجازت دیں۔ بطور طے شدہ بند ہے کیونکہ اس سے ایگریس IP تبدیل ہو سکتا ہے۔                                                                                                                                                                                                                                                                        |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |             | متعدد اکاؤنٹس والے روٹیشن ایگزیکیوٹر کے لیے نیٹ ورک استثنا (ٹائم آؤٹ، کنکشن مسترد/ری سیٹ) کی صورت میں، جب ناکام اکاؤنٹ کی کوئی مختص پراکسی نہ ہو، تو مختصر کول ڈاؤن لاگو کریں اور ہر اکاؤنٹ پر دوبارہ کوشش کرنے کے بجائے باقی درخواست کے لیے پراکسی کے بغیر دوسرے اکاؤنٹس چھوڑ دیں۔ بطور طے شدہ فعال ہے (محفوظ: ایگریس IP تبدیل نہیں ہوتا، صرف مشترکہ ایگریس والے اکاؤنٹس پر تاخیر/کول ڈاؤن کا خطرہ کم ہوتا ہے)۔ پراکسی کے بغیر پہلی خرابی پر فوری ترسیل بحال کرنے کے لیے اسے غیر فعال کریں۔ |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |             | پراکسی پولز اور opencode کی فی اکاؤنٹ روٹیشن ایسی پراکسی دوبارہ پیش کرنا بند کر دیتے ہیں جو ابھی ناکام ہوئی ہو (مسترد شدہ TCP پروب، یا اس کے ذریعے موصول ہونے والا 429)، ہر پروسیس کے لیے ایسی مدت تک جو ہر تکرار پر دگنی ہوتی ہے، ایک مقررہ حد تک۔ پراکسی کی کوئی حیثیت نہیں لکھی جاتی؛ ہر امیدوار کو ایک طرف رکھنے پر انتخاب غیر تبدیل شدہ رہتا ہے۔ بطور طے شدہ بند ہے۔                                                                                                                    |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |             | ڈیش بورڈ میں پراکسی پول کے تحت دکھائیں کہ گزشتہ 24 گھنٹوں کے دوران کتنے مشاہدہ شدہ ایگریس IPs نے اس کے اراکین کو خدمات فراہم کیں اور کتنے کنکشنز نے انہیں استعمال کیا۔ صرف پڑھنے کے لیے، پراکسی لاگ سے حساب شدہ، اور روٹنگ کے لیے کبھی استعمال نہیں ہوتا۔ بطور طے شدہ بند ہے۔                                                                                                                                                                                                                |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |             | OpenCode ایگزیکیوٹر کے لیے، اسٹریم کردہ Responses جواب کی پہلی باڈی بائٹ کی نگرانی کریں (وقفہ: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`، طے شدہ `15000`)۔ ایسا 2xx Responses اسٹریم جو اس وقفے سے زیادہ خاموش رہے، رکا ہوا تصور کیا جاتا ہے: اکاؤنٹ کو کول ڈاؤن میں ڈال دیا جاتا ہے اور درخواست ایک بار اگلے اکاؤنٹ کی طرف منتقل ہو جاتی ہے؛ دوسری بار رکنے پر فوراً ناکام ہو جاتی ہے۔ بطور طے شدہ بند ہے: رکی ہوئی اسٹریمز، اسٹریم کی تیاری کے ٹائم آؤٹ تک موجودہ انتظار جاری رکھتی ہیں۔           |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |             | OpenCode ایگزیکیوٹر: `user_blocked` انکار کے حامل 403/451 پر (جو جغرافیائی پابندی یا Cloudflare فنگرپرنٹ کا رد نہ ہو)، مسترد شدہ اکاؤنٹ کو عارضی طور پر روکیں اور ہر درخواست میں زیادہ سے زیادہ ایک بار اگلے اکاؤنٹ پر منتقل ہوں؛ دوسرا انکار کامیابی کا نشان لگائے بغیر جوں کا توں واپس کیا جاتا ہے۔ بطور ڈیفالٹ بند: اپ اسٹریم صارف بلاک سے بچنے کے لیے روٹنگ کرنا گریز کی کوشش معلوم ہو سکتا ہے اور پوری فلیٹ میں فلیگ پھیلا سکتا ہے۔                                                     |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |             | OpenCode روٹیشن: اپ اسٹریم کی دو مسلسل عارضی ناکامیوں (5xx یا خالی 400) کے بعد، اگلے اکاؤنٹ سے پہلے توقف کریں — 1.5s، جو ہر مزید ناکامی پر دوگنا ہو، فی توقف زیادہ سے زیادہ 6s اور فی درخواست 10s تک محدود ہو، اور کلائنٹ کے منقطع ہونے پر چھوڑ دیا جائے؛ انتظار سے پہلے ناکام باڈی ریلیز کر دی جاتی ہے۔ بطور ڈیفالٹ بند: فیل اوور فوری رہتا ہے۔                                                                                                                                             |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |             | OpenCode روٹیشن: حقیقی شرح کی حد کے طور پر درجہ بند پہلے 429 پر اکاؤنٹس کی لہر روک دیں (قابلِ تجزیہ `Retry-After`، یا ایسی باڈی جس میں شرح/استعمال کی حد کا ذکر ہو) اور وہ اپ اسٹریم 429 بغیر تبدیلی کے واپس کریں۔ غیر درجہ بند 429s پر روٹیشن جاری رہتی ہے۔ بطور ڈیفالٹ بند: مفت درجہ ہر خارجی IP کے لحاظ سے محدود ہے (#9611)، اس لیے ہر 429 پر روٹیشن ہوتی ہے اور تمام اکاؤنٹس ختم ہونے پر آخری اپ اسٹریم 429 واپس کیا جاتا ہے۔                                                            |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓           | MITM پراکسی کے لیے TLS سرٹیفکیٹ کی تصدیق غیر فعال کریں۔ **خطرہ۔**                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |             | نجی/اندرونی نیٹ ورکس کی طرف اشارہ کرنے والے فراہم کنندہ URLs کی اجازت دیں۔                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |             | مقامی/نجی پتوں (127.0.0.1، localhost، LAN) پر فراہم کنندگان شامل کرنے/توثیق کرنے کی اجازت دیں۔ بطور ڈیفالٹ فعال (مقامی کو ترجیح)؛ صرف عوامی پتوں کی سخت پابندی کے لیے غیر فعال کریں۔ کلاؤڈ میٹا ڈیٹا بدستور مسدود رہتا ہے۔                                                                                                                                                                                                                                                                   |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓           | Claude Code سے ہم آہنگ فراہم کنندہ موڈ فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                            |

### پالیسیاں (5)

| کلید                            | قسم     | ڈیفالٹ     | تفصیل                                                                                                                                                                                                                                          |
| ------------------------------- | ------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | ٹول کے استعمال سے متعلق پالیسی کے نفاذ کا موڈ۔ اقدار: `disabled`، `warn`، `block`۔                                                                                                                                                             |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | استعمال کے نمونوں کی بنیاد پر شرح کی حد خودکار طور پر فعال کریں۔                                                                                                                                                                               |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | براہِ راست واحد ماڈل کی درخواستوں کے لیے OmniRoute کی مقامی کانٹیکسٹ ونڈو / زیادہ سے زیادہ اِن پٹ ٹوکن کی جانچ چھوڑ دیں۔ اپ اسٹریم حدود بدستور لاگو رہتی ہیں۔                                                                                  |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | جب ہدف ماڈل میں مطلوبہ صلاحیتیں (وژن، ٹولز، ساختہ آؤٹ پٹ، کانٹیکسٹ ونڈو) موجود نہ ہوں تو بھیجنے سے پہلے درخواستیں مسترد کریں۔ یہ ان براہِ راست واحد فراہم کنندہ درخواستوں کا تحفظ کرتا ہے جو کومبو لیئر کے مطابقتی فلٹر کو نظر انداز کرتی ہیں۔ |
| `RADAR_ENABLED`                 | boolean | `false`    | OmniRoute Radar ماڈیول (کیٹلاگ فیڈ اسکرینز اور سنک) فعال کریں۔ بطور ڈیفالٹ بند؛ فعال کرنے سے صرف UI کھلتا ہے — ڈیٹا سنک کے لیے اب بھی علیحدہ رضامندی درکار ہے۔                                                                                 |

### رن ٹائم (33)

| کلید                                        | قسم     | طے شدہ  | دوبارہ آغاز | تفصیل                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------- | ------- | ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | بولین   | `true`  |             | جب کومبو روٹنگ ماڈلز تبدیل کرے تو گفتگو کے خلاصے تیار کر کے شامل کریں۔ ماڈل کی تبدیلیوں کو آزادانہ طور پر برتنے اور تمام موجودہ اور آئندہ کومبوز کے لیے پس منظر کی ہینڈ آف درخواستوں کو روکنے کے لیے اسے غیر فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | بولین   | `true`  |             | کلائنٹس کو بھیجنے سے پہلے Responses API پاس تھرو اسٹریمز سے داخلی کمنٹری مرحلے کے آؤٹ پٹ آئٹمز حذف کریں۔ خام اپ اسٹریم کمنٹری حاصل کرنے کے لیے اسے غیر فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | بولین   | `true`  |             | MCP ٹول تک رسائی پر اسکوپ کی پابندیاں نافذ کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | بولین   | `false` |             | ٹوکن کا استعمال کم کرنے کے لیے MCP ٹول کی تفصیلات مختصر کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | بولین   | `false` |             | رن ٹائم پر پس منظر کے کاموں کی پروسیسنگ فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | بولین   | `false` | ✓           | تمام پس منظر کی سروسز (کوٹہ ریفریش، سنک وغیرہ) غیر فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |             | پروجیکٹ کی سطح کے RTK فلٹرز پر توثیق کے بغیر اعتماد کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓           | امپورٹ کے وقت ریئل ٹائم ڈیش بورڈ WebSocket سرور شروع کریں (بطور ڈیفالٹ پورٹ 20132)۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |             | Codex کو Responses-over-WebSocket ٹرانسپورٹ استعمال کرنے کی اجازت دیں۔ بند ہونے پر، Codex واپس HTTP Responses استعمال کرتا ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |             | Codex کو مقامی app-server WebSocket JSON-RPC ٹرانسپورٹ (codexTransport=app-server) استعمال کرنے کی اجازت دیں۔ بند ہونے پر، app-server منتخب کرنے والے کنکشنز Codex کے دیگر ٹرانسپورٹس پر واپس چلے جاتے ہیں۔                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |             | بجٹ ختم ہو جانے والی درخواستوں کو ہنگامی مفت فال بیک فراہم کنندہ/ماڈل کی طرف روٹ کریں۔ (ذیل میں [ہنگامی بجٹ فال بیک](#emergency-budget-fallback) دیکھیں۔)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |             | کلائنٹ تک کسی بھی ریسپانس بائٹ کے پہنچنے سے پہلے منقطع شدہ upstream SSE اسٹریمز کے لیے شفاف ابتدائی دوبارہ کوشش فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |             | بائٹس کے پہلے ہی کلائنٹ تک پہنچ جانے کے بعد اسٹریم ریکوری کو دوبارہ درخواست کرنے اور ریسپانس کو جوڑنے کی اجازت دیں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |             | درمیانی اسٹریم کے تسلسل کو ٹول کال کے لیے محفوظ بنائیں: ٹول کال خارج ہو جانے کے بعد (زیرِ عمل ہو یا finish_reason tool_calls کے ساتھ پہلے ہی مکمل ہو چکی ہو) کٹی ہوئی اسٹریم کو کبھی دوبارہ شروع نہ کریں، اور پورا بجٹ خرچ کرنے کے بجائے ایک خالی تسلسل کے بعد بند کر دیں۔ بند: ریلیز والا طرزِ عمل۔                                                                                                                                                                                                                                                                                                                                                  |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |             | جب کوئی SSE اسٹریم کوئی مفید فریم خارج کرنے سے پہلے بند ہو جائے اور اسی کنکشن پر محدود دوبارہ کوشش ختم ہو چکی ہو، تو ایک مرتبہ ہم مرتبہ کنکشن پر منتقل ہوں؛ اگر کوئی قابلِ استعمال ہم مرتبہ کنکشن نہ ہو تو اصل `STREAM_EARLY_EOF` 502 واپس کیا جاتا ہے۔ بطور ڈیفالٹ بند: اسی کنکشن پر دوبارہ کوشش کے بعد early-EOF حتمی رہتا ہے۔                                                                                                                                                                                                                                                                                                                      |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |             | `/v1/models` کے جوابات میں نمائش کے لیے موزوں نام والے فیلڈز شامل کریں۔ صرف ماڈل IDs کی توقع رکھنے والے کلائنٹس کے لیے اسے غیر فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |             | یہ کنٹرول کرتا ہے کہ /v1/models میں ماڈل IDs کے ساتھ سابقے کیسے لگائے جائیں۔ پسماندہ مطابقت کے لیے 'dual' (ڈیفالٹ) عرف اور معیاری provider-id، دونوں سابقے خارج کرتا ہے۔ 'alias' صرف مختصر عرفی سابقہ خارج کرتا ہے (مثلاً ds-web/model، نہ کہ deepseek-web/model)۔ 'canonical' صرف مکمل provider-id سابقہ خارج کرتا ہے۔ اقدار: `dual`، `alias`، `canonical`۔                                                                                                                                                                                                                                                                                          |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |             | ماڈل کی ذہانت کی درجہ بندیوں کے لیے Arena AI لیڈر بورڈ کی وقتاً فوقتاً ELO ہم وقت سازی فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |             | `/v1/models` پر `claude/<provider>/<model>` عکس IDs مشتہر کریں تاکہ Claude Code گیٹ وے کی ماڈل دریافت میں غیر Claude ماڈلز درج ہوں۔ تین سطحی گیٹ کی عالمی سطح (env کو ڈیش بورڈ اوور رائیڈ پر ترجیح حاصل ہے)۔ [Claude Code کنفیگریشن](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker) دیکھیں۔                                                                                                                                                                                                                                                                                                 |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |             | no-think/<provider>/<model> گیٹ وے عرف کے لیے مرکزی سوئچ۔ فعال (ڈیفالٹ): /v1/models ہر اہل، سوچنے کی صلاحیت رکھنے والے Claude ماڈل کے لیے بغیر سوچنے والا متبادل مشتہر کرتا ہے، اور درخواست میں بھیجی گئی no-think/ ID اصل ماڈل پر واپس حل ہوتی ہے، جبکہ استدلال دبا دیا جاتا ہے۔ غیر فعال: کوئی متبادل مشتہر نہیں کیا جاتا اور no-think/ ID کو کسی بھی دوسری نامعلوم ماڈل ID کی طرح سمجھا جاتا ہے۔ اس کے فعال ہونے کے دوران فی ماڈل ModelSpec.noThinkingAlias کی opt-in/opt-out ترتیب پھر بھی لاگو ہوتی ہے۔                                                                                                                                          |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |             | /v1/models کیٹلاگ میں سوچنے کی سطح کے متبادلات (مثلاً -low، -medium، -high) بنانا غیر فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓           | فراہم کنندہ کو بھیجنے کے لیے فی کرایہ دار موافق مجازی داخلہ لینز فعال کریں (#9654): اب ایک کرایہ دار کا اچانک بوجھ دوسرے کے لیے 503 کا سبب نہیں بنتا۔ `OMNIROUTE_CHAT_VIRTUAL_LANES` env var کو اس ڈیش بورڈ اوور رائیڈ پر ترجیح حاصل ہے؛ تبدیلیاں سرور کے دوبارہ شروع ہونے پر مؤثر ہوتی ہیں۔                                                                                                                                                                                                                                                                                                                                                          |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |             | ان ماڈلز کے لیے /v1/models پر <gateway-alias>/<model> مرر IDs مشتہر کریں جن کے بنیادی مالک کے پاس کوئی فعال اسناد نہیں، لیکن فعال اسناد والا پاس تھرو گیٹ وے انہیں روٹ کرتا ہے۔ انتباہ: عالمی سطح پر فعال ہونے پر یہ تمام کلائنٹس کے لیے کیٹلاگ اندراجات شامل کرتا ہے۔                                                                                                                                                                                                                                                                                                                                                                                |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |             | New-API / One-API / Sub2API ایگریگیٹر سے ہم آہنگ نوڈز کے لیے بیلنس کی تشخیص فعال کریں۔ فعال ہونے پر، ایگریگیٹر فلیگ سیٹ رکھنے والے ہم آہنگ نوڈز ڈیش بورڈ اور کوٹا پری فلائٹ روٹنگ میں اپنا بیلنس رپورٹ کریں گے۔                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |             | سرور کی ملکیت والی نان اسٹریمنگ ٹول کالز اس وقت تک جاری رکھیں جب تک ماڈل کلائنٹ کے قابلِ استعمال جواب واپس نہ کرے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |             | تلاش کے اعداد و شمار اور حالیہ تلاشوں میں صرف ان فراہم کنندگان کو شمار کریں جن کا کنکشن اب بھی فعال ہے (کلید سے آزاد فراہم کنندگان، جیسے duckduckgo-free، ہمیشہ شمار ہوتے ہیں)۔ غیر فعال ہونے پر فراہم کنندہ ID والی ہر محفوظ شدہ تلاش کی قطار برقرار رہتی ہے۔                                                                                                                                                                                                                                                                                                                                                                                        |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |             | ڈیش بورڈ کے فراہم کنندہ صفحات: Free بیج صرف انہی اشاروں پر دکھائیں جنہیں فراہم کنندہ تسلیم کرتا ہے — دستاویزی مفت درجے کے بغیر رجسٹرڈ فراہم کنندگان کے لیے ڈسپلے نام پر مبنی قیاس، غیر بولین free فیلڈز، اور :free لاحقے نظر انداز کر دیے جاتے ہیں۔ غیر فعال ہونے پر تاریخی بیج کا اصول برقرار رہتا ہے۔                                                                                                                                                                                                                                                                                                                                               |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |             | مجموعی 429/503 عدم دستیابی کے جوابات میں، جب مستقبل میں دوبارہ کوشش کا کوئی ٹھوس وقت معلوم نہ ہو تو مصنوعی 1s کی بجائے `Retry-After` حذف کریں، `error.retry_after_provenance` (`signal` \| `none`) شامل کریں، اور کومبو ڈرین راستوں کو JSON اور سادہ متن والے اپ اسٹریم اجسام سے نثری دوبارہ کوشش کے اشارے پڑھنے دیں۔ یہ فیلڈ صرف `unavailableResponse()` کے بنائے ہوئے جوابات میں ظاہر ہوتی ہے؛ دیگر 429/503 اجسام میں کوئی تبدیلی نہیں ہوتی۔                                                                                                                                                                                                        |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |             | جب `priority` کومبو کا کوئی ہدف، جسے صرف کوٹا ختم ہونے پر فال بیک کے طور پر نشان زد کیا گیا ہو، کسی ایسی وجہ سے کومبو روک دے جو یقینی طور پر کوٹا سے متعلق نہ ہو (فراہم کنندہ کا سرکٹ بریکر کھلا ہونا، پیش گوئی شدہ تاخیر کی بنا پر چھوڑ دینا)، تو کوٹا جیسا نظر آنے والا 503 دینے کی بجائے 502 جواب دیں۔ لاک آؤٹ، کول ڈاؤن، عدم دستیابی، اخراج، اور کنکرنسی کی حد کی وجہ سے رکنے پر 503 برقرار رہتا ہے۔                                                                                                                                                                                                                                              |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |             | ایک سادہ Mistral 401 (`{"detail":"Unauthorized"}`، واضح تصدیقی اشارے کے بغیر) منسوخ شدہ کلید اور ختم شدہ کوٹا، دونوں کے لیے یکساں ہوتا ہے۔ فعال ہونے پر، یہ کنکشن کو `expired` کے طور پر پارک کرنے کی بجائے کول ڈاؤن کرتا ہے، فی کنکشن فی گھنٹہ زیادہ سے زیادہ 3 بار؛ اگلی مرتبہ اسے پارک کر دیا جاتا ہے، لہٰذا منسوخ شدہ کلید بالآخر اسی حالت تک پہنچ جاتی ہے۔ بطور ڈیفالٹ غیر فعال: ہر سادہ Mistral 401 پہلے کی طرح کنکشن کو پارک کرتا ہے۔                                                                                                                                                                                                          |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |             | منجمد جامد سیڈ کے بجائے OAuth بیئرر ٹوکن استعمال کرتے ہوئے `https://api.x.ai/v1/models` سے `xai-oauth` کنکشنز کے لیے براہِ راست xAI ماڈل کیٹلاگ حاصل کریں۔ بطور ڈیفالٹ بند: `xai-oauth` بغیر کسی تبدیلی کے جامد سیڈ فراہم کرتا رہتا ہے۔ کسی بھی ریزولیوشن خرابی کی صورت میں، دریافت واپس سیڈ پر آ جاتی ہے (یہ غیر تصدیق شدہ ہے کہ آیا x.ai اس اینڈ پوائنٹ پر OAuth بیئرر قبول کرتا ہے)۔                                                                                                                                                                                                                                                               |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |             | خودکار صفائی کے عمل کو اجازت دیں کہ وہ `OMNIROUTE_BATCH_RETENTION_DAYS` سے پرانی حتمی حالت والی (مکمل/ناکام/منسوخ/میعاد ختم شدہ) Batch API جابز کو، ان کے فی سطر چیک پوائنٹس سمیت، حذف کرے اور اپنی `expires_at` مدت سے تجاوز کر جانے والی اپ لوڈ شدہ فائلوں کا BLOB مواد صاف کرے۔ بطور ڈیفالٹ بند: ہر موجودہ انسٹالیشن اس ڈیٹا کو پہلے کی طرح بعینہٖ برقرار رکھتی ہے، جب تک کوئی آپریٹر اسے فعال نہ کرے۔ آپریٹر کے ذریعے چلایا جانے والا `DELETE /api/v1/batches/delete-completed` روٹ دونوں صورتوں میں غیر متاثر رہتا ہے — یہ ایک علیحدہ، غیر مشروط عوامی API معاہدہ ہے۔                                                                            |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |             | منتخب کردہ Antigravity اکاؤنٹ کو اس درخواست کے اسٹریمنگ لائف سائیکل کے لیے مختص کریں جس نے اسے منتخب کیا تھا، تاکہ کوئی متوازی دوبارہ کوشش یا کریڈینشل ہینڈ آف پہلے سے زیرِ عمل اسٹریم کے لیے مختص اکاؤنٹ کو دوبارہ منتخب نہ کر سکے۔ یہ تخصیص (کنکشن، قابلِ کال اپ اسٹریم ماڈل) تک محدود ہوتی ہے، اس لیے ایک اکاؤنٹ اب بھی بیک وقت دو مختلف ماڈلز کی خدمت کر سکتا ہے۔ جب ہر اہل اکاؤنٹ اس ماڈل کے لیے پہلے ہی مختص ہو، تو درخواست مصروف اکاؤنٹ پر مزید بوجھ ڈالنے کے بجائے محدود `Retry-After` کے ساتھ ایک ساختہ 503 `antigravity_pool_busy` واپس کرتی ہے۔ بطور ڈیفالٹ بند: اکاؤنٹ کا انتخاب پہلے کی طرح بعینہٖ رہتا ہے، اور کوئی تخصیص نہیں کی جاتی۔ |

### CLI (5)

| کلید                                  | قسم     | ڈیفالٹ  | دوبارہ آغاز | وضاحت                                                                                                                                                                                                                         |
| ------------------------------------- | ------- | ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓           | تمام CLI کلائنٹس کے لیے مطابقتی موڈ فعال کریں۔                                                                                                                                                                                |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |             | ماڈل عرف کی مطابقتی تہہ فعال کریں۔                                                                                                                                                                                            |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |             | قیمتوں کے ڈیٹا کی خودکار ہم وقت سازی فعال کریں (اس کے لیے `PRICING_SYNC_ENABLED` ماحول متغیر بھی درکار ہے)۔                                                                                                                   |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |             | فراہم کنندہ کے ماڈل کی ہم وقت سازی کے بعد، براہِ راست کیٹلاگ سے ~/.codex/*.config.toml پروفائل فائلیں خودکار طور پر (دوبارہ) لکھیں۔ فعال/ڈیفالٹ Codex کنفیگ کو کبھی تبدیل نہیں کرتا۔ بطور ڈیفالٹ بند۔                         |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |             | فراہم کنندہ کے ماڈل کی ہم وقت سازی کے بعد، براہِ راست کیٹلاگ سے ~/.claude/profiles/<name>/settings.json Claude Code پروفائلز خودکار طور پر (دوبارہ) لکھیں۔ فعال/ڈیفالٹ Claude کنفیگ کو کبھی تبدیل نہیں کرتا۔ بطور ڈیفالٹ بند۔ |

### صحت (5)

| کلید                                      | قسم     | طے شدہ  | وضاحت                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | مقامی انسٹینس کے صحت کی جانچ کے اینڈ پوائنٹ کو غیر فعال کریں۔                                                                                                                                                                                                                                                   |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | ٹوکن کی توثیق کی صحت کی جانچ کو غیر فعال کریں۔                                                                                                                                                                                                                                                                  |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | اسکلز سینڈ باکس ماحول میں نیٹ ورک رسائی فعال کریں۔                                                                                                                                                                                                                                                              |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | پراکسی کی صحت کی جانچ میں، ہدف کی جانب سے مسترد کردہ پروب (401/403/429) پراکسی کی مسلسل ناکامیوں کا سلسلہ ری سیٹ کر دیتا ہے۔ بطور طے شدہ غیر فعال: مسترد ہونا غیر جانب دار رہتا ہے (#10654)۔ 5xx دونوں صورتوں میں غیر فیصلہ کن رہتا ہے؛ مسترد ہونا کبھی بھی پراکسی کو ہٹاتا، غیر فعال یا دوبارہ فعال نہیں کرتا۔ |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | آغاز پر DB کی سالمیت/صحت کی جانچ کو، اس کی تکمیل تک آغاز کو مسدود رکھنے کے بجائے، سرور کے درخواستیں قبول کرنا شروع کرنے کے بعد (`setImmediate` کے ذریعے) چلائیں (#13717)۔ بطور طے شدہ غیر فعال: آغاز بالکل اسی طرح مسدود رہتا ہے جیسے اس PR سے پہلے تھا۔                                                        |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` اور اس کا سابقہ عرف
> `INJECTION_GUARD_BLOCK_THRESHOLD`، `INJECTION_GUARD_MODE` کے `block` موڈ کو
> ترتیب دیتے ہیں، لیکن یہ سادہ ماحولیاتی متغیرات ہیں جنہیں
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> پڑھتا ہے، فیچر فلیگز نہیں: ان کے لیے کوئی DB اوور رائیڈ یا ڈیش بورڈ ٹوگل موجود نہیں۔ دیکھیے
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)۔

> [!NOTE]
> `Restart` کالم ان فلیگز کی نشاندہی کرتا ہے جن میں `requiresRestart: true` ہو — قدر
> فوری طور پر محفوظ ہو جاتی ہے لیکن صرف پراسیس کے دوبارہ لوڈ ہونے کے بعد مؤثر ہوتی ہے۔ Enum
> فلیگز اپنی اجازت یافتہ فہرست سے باہر کسی بھی قدر کو مسترد کرتے ہیں (سرور کی جانب سے
> `setFeatureFlagOverride()` اور REST `PUT` ہینڈلر، دونوں میں توثیق کی جاتی ہے)۔

---

## فلیگز کو ٹوگل کرنا

### ڈیش بورڈ

**Dashboard → Settings → Feature Flags**
(`/dashboard/settings/feature-flags`) پر جائیں۔ گرڈ
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
درج ذیل کی معاونت کرتا ہے:

- کلید یا تفصیل کے لحاظ سے **تلاش**، اور زمرے کے لحاظ سے **فلٹر** (اس کے علاوہ ایک مصنوعی
  **Requires Restart** منظر)۔
- بولین فلیگز کے لیے ایک **ٹوگل** اور enum فلیگز کے لیے ایک **ڈراپ ڈاؤن**
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)۔
- ہر فلیگ کے لیے ایک **ماخذ بیج** — `DB`، `ENV`، یا `DEF` — جو دکھاتا ہے کہ
  مؤثر قدر کہاں سے آئی۔
- اوور رائیڈ ہٹانے کے لیے ایک **Reset** بٹن (جو صرف `DB` سے ماخوذ فلیگز کے لیے دکھایا جاتا ہے)،
  اور نیچے ایک **Reset All Overrides** بٹن۔
- جب کوئی `requiresRestart` فلیگ تبدیل کیا جائے تو ایک **Restart Server** بینر۔

### REST API

تمام کارروائیاں ایک ہی روٹ کے ذریعے ہوتی ہیں:
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts)۔
ہر میتھڈ کے لیے ایک تصدیق شدہ ڈیش بورڈ سیشن درکار ہے (بصورتِ دیگر `401`)۔

#### `GET /api/settings/feature-flags`

ہر فلیگ کو اس کی مؤثر قدر، ماخذ، اور خلاصے کے ساتھ واپس کرتا ہے۔

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "Require API Key",
      "description": "Require an API key for all incoming requests",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... تمام 74 فلیگز
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

کسی ایک اوور رائیڈ کو مقرر کریں یا ہٹائیں۔ باڈی: `{ key: string; value?: string }`۔
`value` کو چھوڑ دینے سے اوور رائیڈ ہٹ جاتا ہے (اور env / ڈیفالٹ بحال ہو جاتا ہے)۔

```bash
# DB اوور رائیڈ مقرر کریں
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# اوور رائیڈ ہٹائیں ("value" کے بغیر)
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

جواب نئی `effectiveValue`/`source`، سابقہ `previousValue`/
`previousSource`، اور `requiresRestart` واپس دہراتا ہے۔ نامعلوم کلیدیں اور حد سے باہر enum
اقدار `400` کے ساتھ مسترد کر دی جاتی ہیں۔

#### `DELETE /api/settings/feature-flags`

تمام DB اوور رائیڈز کو بیک وقت صاف کرتا ہے، اور ہر فلیگ کو اس کی env / ڈیفالٹ
قدر پر بحال کرتا ہے۔ `{ cleared: <count>, message: "..." }` واپس کرتا ہے۔

> [!NOTE]
> `requiresRestart: true` والے فلیگز صرف پروسیس دوبارہ لوڈ ہونے کے بعد مؤثر ہوتے ہیں۔
> ڈیش بورڈ کا ری اسٹارٹ فلو `POST /api/restart` کو کال کرتا ہے اور پھر سرور کے دوبارہ فعال ہونے تک
> `GET /api/health/ping` کو پول کرتا ہے۔

---

## ہنگامی بجٹ فال بیک

`OMNIROUTE_EMERGENCY_FALLBACK` (زمرہ `runtime`، ڈیفالٹ `true`)
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts)
میں ہنگامی مفت فال بیک راستے کو کنٹرول کرتا ہے۔
فعال ہونے پر، اپنے بجٹ کو ختم کر دینے والی درخواستوں کو مکمل طور پر ناکام ہونے کے بجائے ایک مفت فال بیک
فراہم کنندہ/ماڈل کی طرف روٹ کیا جاتا ہے۔ اس رویے کو غیر فعال کرنے اور بجٹ ختم کر دینے والی درخواستوں کو
ناکام ہونے دینے کے لیے اسے `false` (یا `0`) پر مقرر کریں — ڈیش بورڈ ٹوگل، DB اوور رائیڈ، یا
`OMNIROUTE_EMERGENCY_FALLBACK` ماحول کے متغیر کے ذریعے۔
(PRs #3741 / #3752 میں ڈیش بورڈ ٹوگل کے طور پر پیش کیا گیا۔)

---

## مزید دیکھیں

- [ماحولیاتی متغیرات کا حوالہ](./ENVIRONMENT.md) — زیادہ تر فلیگز کے لیے اسی نام کا ایک
  ماحولیاتی متغیر وہاں دستاویزی شکل میں موجود ہے (DB اوور رائیڈ کو
  اس پر ترجیح حاصل ہوتی ہے)۔
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — ہر فلیگ کے لیے مستند ماخذ۔
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — تعین کی منطق (`resolveFeatureFlag`, `isFeatureFlagEnabled`,
  `resolveAllFeatureFlags`)۔
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — `key_value` ٹیبل کی
  `feature_flags` نیم اسپیس میں DB اوور رائیڈ کا مستقل ذخیرہ۔
