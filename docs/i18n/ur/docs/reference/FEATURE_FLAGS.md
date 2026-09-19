# Feature Flags (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

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

6 زمروں میں 72 فلیگز۔ **ڈیفالٹ** سے مراد تعریف میں دی گئی ڈیفالٹ قدر ہے — یعنی
وہ قدر جو DB اوور رائیڈ اور ماحولیاتی متغیر، دونوں کی عدم موجودگی میں استعمال
ہوتی ہے۔

### سیکیورٹی (10)

| کلید                                    | قسم     | ڈیفالٹ   | وضاحت                                                                                                                                                                                                                                                                               |
| --------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | تمام آنے والی درخواستوں کے لیے API کلید درکار کریں۔                                                                                                                                                                                                                                 |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | تمام درخواستوں کے لیے ان پٹ کی صفائی فعال کریں۔                                                                                                                                                                                                                                     |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | پرامپٹ انجیکشن گارڈ کا موڈ۔ اقدار: `off`، `warn`، `block`، `redact`۔                                                                                                                                                                                                                |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | درخواستوں سے PII کو مخفی کریں (`INPUT_SANITIZER_MODE` سے آزاد)۔                                                                                                                                                                                                                     |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | فراہم کنندہ کے جوابات سے PII صاف کریں۔                                                                                                                                                                                                                                              |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | PII جوابی صفائی کا موڈ۔ اقدار: `redact`، `warn`، `block`، `off`۔                                                                                                                                                                                                                    |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | نجی/اندرونی IP رینجز کی طرف جانے والی آؤٹ باؤنڈ درخواستوں کو بلاک کریں۔                                                                                                                                                                                                             |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | تصدیق شدہ ڈیش بورڈ صارفین کو صرف مخفی اقدار دیکھنے کے بجائے محفوظ شدہ API کلیدیں ظاہر کرنے کی اجازت دیں۔                                                                                                                                                                            |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | AUTH لاگ سطروں میں اکاؤنٹ کا سابقہ شامل کریں (مثلاً "استعمال کیا جا رہا <provider> اکاؤنٹ: abc12345...")۔ یہ ڈیفالٹ طور پر غیر فعال ہے تاکہ مشترکہ/کثیر کرایہ دار پراسیس لاگز سے اکاؤنٹ شناخت کنندگان مخفی رہیں۔ Debug Mode سے آزاد؛ Debug Mode کو تبدیل کرنے سے یہ ظاہر نہیں ہوتا۔ |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | جب OIDC فعال ہو تو پاس ورڈ لاگ اِن غیر فعال کریں، تاکہ صارفین صرف OIDC Single Sign-On کے ذریعے تصدیق کر سکیں۔ غیر فعال ہونے پر (ڈیفالٹ)، پاس ورڈ لاگ اِن اور OIDC دونوں دستیاب ہوتے ہیں۔                                                                                            |

### نیٹ ورک (15)

| کلید                                            | قسم     | طے شدہ  | ری اسٹارٹ | تفصیل                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------- | ------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓         | TLS فنگرپرنٹ مخفی موڈ فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |           | /v1/audio/* روٹس کو localhost سے باہر ہوسٹ کیے گئے OpenAI سے ہم آہنگ فراہم کنندہ نوڈز استعمال کرنے کی اجازت دیں۔ طے شدہ طور پر بند — آڈیو کو کسی ریموٹ ہوسٹ کی طرف روٹ کرنے سے اخراجی شناخت تبدیل ہو جاتی ہے، اس لیے یہ آپریٹر کا واضح فیصلہ ہونا چاہیے۔ لوپ بیک نوڈز کی ہمیشہ اجازت ہوتی ہے اور وہ اس سے متاثر نہیں ہوتے۔                                                                                                                                                                        |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |           | جب کسی کنکشن کو کوئی پراکسی تفویض نہ کی گئی ہو تو رجسٹری سے پہلی فعال پراکسی خودکار طور پر منتخب کریں۔ طے شدہ طور پر بند (ورنہ رجسٹری کی کوئی بھی پراکسی عالمی فال بیک بن جاتی ہے — #3332)۔                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |           | پراکسی تک رسائی کی پیشگی جانچ ناکام ہونے پر OAuth اور فراہم کنندہ کی توثیقی روانیوں کو پن شدہ پراکسی کو نظر انداز کرکے براہِ راست منسلک ہونے کی اجازت دیں۔ طے شدہ طور پر بند، کیونکہ اس سے اخراجی IP تبدیل ہو سکتا ہے۔                                                                                                                                                                                                                                                                            |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |           | متعدد اکاؤنٹس والے گردشی ایگزیکیوٹر میں نیٹ ورک استثنا (ٹائم آؤٹ، کنکشن مسترد/ری سیٹ) کی صورت میں، جب ناکام ہونے والے اکاؤنٹ کی اپنی مخصوص پراکسی نہ ہو، تو مختصر کول ڈاؤن لاگو کریں اور ہر اکاؤنٹ کو دوبارہ آزمانے کے بجائے باقی درخواست کے لیے پراکسی کے بغیر دوسرے اکاؤنٹس کو چھوڑ دیں۔ طے شدہ طور پر فعال (محفوظ: اخراجی IP تبدیل نہیں ہوتا، صرف مشترکہ اخراج والے اکاؤنٹس پر تاخیر/کول ڈاؤن کا خطرہ کم ہوتا ہے)۔ پراکسی کے بغیر پہلی خرابی پر فوری ترسیل بحال کرنے کے لیے اسے غیر فعال کریں۔ |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |           | پراکسی پولز اور opencode کی فی اکاؤنٹ گردش ایسی پراکسی کو دوبارہ پیش کرنا بند کر دیتی ہے جو ابھی ناکام ہوئی ہو (مسترد شدہ TCP پروب، یا اس کے ذریعے موصول ہونے والا 429)، اور یہ روک فی پراسیس مدت کے لیے ہوتی ہے جو ہر تکرار پر دگنی ہو کر ایک حد تک پہنچتی ہے۔ پراکسی کی کوئی حیثیت نہیں لکھی جاتی؛ ہر امیدوار کو الگ رکھ دینے پر انتخاب میں کوئی تبدیلی نہیں ہوتی۔ طے شدہ طور پر بند۔                                                                                                           |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |           | ڈیش بورڈ میں کسی پراکسی پول کے تحت دکھائیں کہ گزشتہ 24 گھنٹوں میں کتنے مشاہدہ شدہ اخراجی IPs نے اس کے ارکان کو خدمات فراہم کیں اور کتنے کنکشنز نے انہیں استعمال کیا۔ صرف پڑھنے کے لیے، پراکسی لاگ سے حساب کیا جاتا ہے، اور روٹنگ کے لیے کبھی استعمال نہیں ہوتا۔ طے شدہ طور پر بند۔                                                                                                                                                                                                                |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |           | OpenCode ایگزیکیوٹر کے لیے، اسٹریم شدہ Responses جواب کے باڈی کے پہلے بائٹ کی نگرانی کریں (وقفہ: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`، طے شدہ `15000`)۔ ایسا 2xx Responses اسٹریم جو اس وقفے کے بعد بھی خاموش رہے، رکا ہوا سمجھا جاتا ہے: اکاؤنٹ کو کول ڈاؤن میں ڈال کر درخواست کو ایک مرتبہ اگلے اکاؤنٹ کی طرف منتقل کیا جاتا ہے؛ دوسری بار رکنے پر فوراً ناکامی ہوتی ہے۔ طے شدہ طور پر بند: رکے ہوئے اسٹریمز، اسٹریم کی تیاری کے ٹائم آؤٹ تک موجودہ انتظار جاری رکھتے ہیں۔                         |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |           | OpenCode ایگزیکیوٹر: `user_blocked` انکار رکھنے والے 403/451 پر (نہ جغرافیائی پابندی، نہ Cloudflare فنگرپرنٹ مسترد ہونا)، مسترد شدہ اکاؤنٹ کو کول ڈاؤن میں ڈالیں اور ہر درخواست میں زیادہ سے زیادہ ایک مرتبہ اگلے اکاؤنٹ کی طرف منتقل کریں؛ دوسری بار انکار کو کامیابی کے نشان کے بغیر جوں کا توں واپس کیا جاتا ہے۔ طے شدہ طور پر بند: اپ اسٹریم صارف بلاک کے گرد روٹنگ، بچنے کی کوشش جیسی دکھائی دے سکتی ہے اور پورے فلیٹ میں یہ نشان پھیلا سکتی ہے۔                                             |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |           | OpenCode روٹیشن: مسلسل دو عارضی اپ اسٹریم ناکامیوں (5xx یا خالی 400) کے بعد، اگلے اکاؤنٹ سے پہلے توقف کریں — ہر مزید ناکامی پر 1.5s کا وقفہ دوگنا ہو گا، فی توقف زیادہ سے زیادہ 6s اور فی درخواست 10s تک محدود، اور کلائنٹ کے منقطع ہونے پر چھوڑ دیا جائے گا؛ انتظار سے پہلے ناکام باڈی کو ریلیز کر دیا جاتا ہے۔ بطور ڈیفالٹ بند: فیل اوور فوری رہتا ہے۔                                                                                                                                          |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |           | OpenCode روٹیشن: پہلے ایسے 429 پر اکاؤنٹ ویو روک دیں جسے حقیقی ریٹ لمٹ قرار دیا گیا ہو (قابلِ پارس `Retry-After`، یا ایسی باڈی جس میں ریٹ/استعمال کی حد کا ذکر ہو) اور وہی اپ اسٹریم 429 بغیر تبدیلی کے واپس کریں۔ غیر درجہ بند 429s پر روٹیشن جاری رہتی ہے۔ بطور ڈیفالٹ بند: مفت درجے کی حد فی ایگریس IP ہے (#9611)، اس لیے ہر 429 پر روٹیشن ہوتی ہے اور ختم شدہ ویو آخری اپ اسٹریم 429 واپس کرتی ہے۔                                                                                            |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓         | MITM پراکسی کے لیے TLS سرٹیفکیٹ کی توثیق غیر فعال کریں۔ **خطرناک۔**                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |           | نجی/اندرونی نیٹ ورکس کی طرف اشارہ کرنے والے پرووائیڈر URLs کی اجازت دیں۔                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |           | مقامی/نجی پتوں (127.0.0.1، localhost، LAN) پر پرووائیڈرز شامل کرنے/توثیق کرنے کی اجازت دیں۔ بطور ڈیفالٹ فعال (مقامی کو ترجیح)؛ صرف عوامی پتوں کی سخت پابندی کے لیے غیر فعال کریں۔ کلاؤڈ میٹا ڈیٹا بدستور بلاک رہتا ہے۔                                                                                                                                                                                                                                                                            |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓         | Claude Code سے ہم آہنگ پرووائیڈر موڈ فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### پالیسیاں (5)

| کلید                            | قسم     | ڈیفالٹ     | وضاحت                                                                                                                                                                                                                                       |
| ------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | ٹول کے استعمال کی پالیسی نافذ کرنے کا موڈ۔ اقدار: `disabled`، `warn`، `block`۔                                                                                                                                                              |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | استعمال کے پیٹرنز کی بنیاد پر ریٹ لمٹنگ خودکار طور پر فعال کریں۔                                                                                                                                                                            |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | براہِ راست سنگل ماڈل درخواستوں کے لیے OmniRoute کی مقامی کانٹیکسٹ ونڈو / زیادہ سے زیادہ ان پٹ ٹوکن کی جانچ چھوڑ دیں۔ اپ اسٹریم حدود پھر بھی لاگو رہتی ہیں۔                                                                                  |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | جب ہدف ماڈل میں مطلوبہ صلاحیتیں (وژن، ٹولز، اسٹرکچرڈ آؤٹ پٹ، کانٹیکسٹ ونڈو) موجود نہ ہوں تو ڈسپیچ سے پہلے درخواستیں مسترد کریں۔ یہ براہِ راست سنگل پرووائیڈر درخواستوں کی حفاظت کرتا ہے جو کومبو لیئر کے مطابقتی فلٹر کو بائی پاس کرتی ہیں۔ |
| `RADAR_ENABLED`                 | boolean | `false`    | OmniRoute Radar ماڈیول (کیٹلاگ فیڈ اسکرینز اور سنک) فعال کریں۔ بطور ڈیفالٹ بند؛ فعال کرنے سے صرف UI کھلتا ہے — ڈیٹا سنک ایک علیحدہ اختیاری عمل رہتا ہے۔                                                                                     |

### رن ٹائم (32)

| کلید                                        | قسم     | طے شدہ  | دوبارہ آغاز | تفصیل                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------- | ------- | ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |             | جب کومبو روٹنگ ماڈلز تبدیل کرے تو گفتگو کے خلاصے تیار کرکے شامل کریں۔ ماڈل کی تبدیلیوں کو آزادانہ طور پر برتنے اور تمام موجودہ اور آئندہ کومبوز کے لیے پس منظر کی ہینڈ آف درخواستوں کو روکنے کے لیے اسے غیر فعال کریں۔                                                                                                                                                                                                                                                                                                                          |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |             | کلائنٹس کو فارورڈ کرنے سے پہلے Responses API پاس تھرو اسٹریمز سے اندرونی کمنٹری مرحلے کے آؤٹ پٹ آئٹمز حذف کریں۔ خام اپ اسٹریم کمنٹری وصول کرنے کے لیے اسے غیر فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`  |             | MCP ٹول تک رسائی پر اسکوپ کی پابندیاں نافذ کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |             | ٹوکن کا استعمال کم کرنے کے لیے MCP ٹول کی تفصیلات مختصر کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |             | رن ٹائم پر پس منظر کے کاموں کی پروسیسنگ فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓           | تمام پس منظر کی سروسز (کوٹا ریفریش، سنک وغیرہ) غیر فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |             | توثیق کے بغیر پروجیکٹ سطح کے RTK فلٹرز پر اعتماد کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓           | امپورٹ پر ریئل ٹائم ڈیش بورڈ WebSocket سرور شروع کریں (بطور طے شدہ پورٹ 20132)۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |             | Codex کو Responses-over-WebSocket ٹرانسپورٹ استعمال کرنے کی اجازت دیں۔ بند ہونے پر، Codex واپس HTTP Responses استعمال کرتا ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |             | Codex کو مقامی app-server WebSocket JSON-RPC ٹرانسپورٹ (codexTransport=app-server) استعمال کرنے کی اجازت دیں۔ بند ہونے پر، app-server کا انتخاب کرنے والے کنکشنز Codex کے دیگر ٹرانسپورٹس پر واپس چلے جاتے ہیں۔                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |             | بجٹ ختم ہونے والی درخواستوں کو ہنگامی مفت فال بیک فراہم کنندہ/ماڈل کی طرف روٹ کریں۔ (ذیل میں [ہنگامی بجٹ فال بیک](#emergency-budget-fallback) دیکھیں۔)                                                                                                                                                                                                                                                                                                                                                                                          |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |             | کلائنٹ تک کسی بھی جوابی بائٹس کے پہنچنے سے پہلے منقطع شدہ upstream SSE اسٹریمز کے لیے شفاف ابتدائی دوبارہ کوشش فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |             | بائٹس کے کلائنٹ تک پہنچ جانے کے بعد بھی اسٹریم بازیابی کو دوبارہ درخواست کرنے اور جواب کو جوڑنے کی اجازت دیں۔                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |             | وسطِ اسٹریم تسلسل کو ٹول کال کے لیے محفوظ بنائیں: ٹول کال خارج ہو جانے کے بعد (زیرِ عمل ہو یا finish_reason tool_calls کے ساتھ پہلے ہی مکمل ہو چکی ہو) منقطع اسٹریم کو کبھی دوبارہ شروع نہ کریں، اور پورا بجٹ خرچ کرنے کے بجائے ایک خالی تسلسل کے بعد بند کر دیں۔ بند: ریلیز کا طرزِ عمل۔                                                                                                                                                                                                                                                       |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |             | جب کوئی SSE اسٹریم کسی مفید فریم کے اخراج سے پہلے بند ہو جائے اور اسی کنکشن کی محدود دوبارہ کوشش ختم ہو چکی ہو تو ایک بار کسی ہم مرتبہ کنکشن پر فیل اوور کریں؛ قابلِ استعمال ہم مرتبہ کنکشن نہ ہونے پر اصل `STREAM_EARLY_EOF` 502 واپس کیا جاتا ہے۔ بطور ڈیفالٹ بند: اسی کنکشن پر دوبارہ کوشش کے بعد early-EOF حتمی رہتا ہے۔                                                                                                                                                                                                                    |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |             | `/v1/models` کے جوابات میں نمائش کے لیے موزوں نام کے فیلڈز شامل کریں۔ صرف ماڈل IDs کی توقع رکھنے والے کلائنٹس کے لیے اسے غیر فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                         |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |             | یہ کنٹرول کرتا ہے کہ /v1/models میں ماڈل IDs کے ساتھ کس طرح سابقہ لگایا جاتا ہے۔ 'dual' (ڈیفالٹ) پسماندہ مطابقت کے لیے عرف اور canonical provider-id، دونوں سابقے خارج کرتا ہے۔ 'alias' صرف مختصر عرف سابقہ خارج کرتا ہے (مثلاً ds-web/model، نہ کہ deepseek-web/model)۔ 'canonical' صرف مکمل provider-id سابقہ خارج کرتا ہے۔ اقدار: `dual`، `alias`، `canonical`۔                                                                                                                                                                              |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |             | ماڈل انٹیلیجنس درجہ بندیوں کے لیے Arena AI لیڈر بورڈ کی متواتر ELO ہم وقت سازی فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |             | `/v1/models` پر `claude/<provider>/<model>` مرر IDs مشتہر کریں تاکہ Claude Code گیٹ وے کی ماڈل دریافت غیر Claude ماڈلز بھی دکھائے۔ تین سطحی گیٹ کی عالمی سطح (env کو ڈیش بورڈ اوور رائیڈ پر ترجیح حاصل ہے)۔ [Claude Code کنفیگریشن](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker) دیکھیں۔                                                                                                                                                                                            |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |             | no-think/<provider>/<model> گیٹ وے عرفیات کے لیے مرکزی سوئچ۔ فعال (ڈیفالٹ): /v1/models ہر اہل، سوچنے کی صلاحیت رکھنے والے Claude ماڈل کے لیے بغیر سوچنے والا ویرینٹ مشتہر کرتا ہے، اور درخواست میں بھیجی گئی no-think/ ID استدلال کو دباتے ہوئے اصل ماڈل میں واپس حل ہو جاتی ہے۔ غیر فعال: کوئی ویرینٹ مشتہر نہیں کیا جاتا اور no-think/ ID کو کسی بھی دوسری نامعلوم ماڈل ID کی طرح سمجھا جاتا ہے۔ اس کے فعال ہونے کے دوران فی ماڈل ModelSpec.noThinkingAlias کا opt-in/opt-out بدستور لاگو ہوتا ہے۔                                            |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |             | /v1/models کیٹلاگ میں سوچنے کی سطح کے ویرینٹس (مثلاً -low، -medium، -high) کی تخلیق غیر فعال کریں۔                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓           | فراہم کنندہ ڈسپیچ کے لیے فی tenant موافق پذیر ورچوئل داخلہ لینز فعال کریں (#9654): اب ایک tenant کا اچانک بوجھ دوسرے کے لیے 503 کا سبب نہیں بنے گا۔ `OMNIROUTE_CHAT_VIRTUAL_LANES` env var کو اس ڈیش بورڈ اوور رائیڈ پر ترجیح حاصل ہے؛ تبدیلیاں سرور دوبارہ شروع ہونے پر نافذ ہوتی ہیں۔                                                                                                                                                                                                                                                         |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |             | ان ماڈلز کے لیے /v1/models پر <gateway-alias>/<model> مرر IDs مشتہر کریں جن کے canonical مالک کے پاس کوئی فعال credential نہیں، مگر فعال credential والا passthrough گیٹ وے انہیں روٹ کرتا ہے۔ انتباہ: عالمی طور پر فعال کیے جانے پر یہ تمام کلائنٹس کے لیے کیٹلاگ اندراجات شامل کرتا ہے۔                                                                                                                                                                                                                                                       |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |             | New-API / One-API / Sub2API aggregator سے مطابقت رکھنے والے نوڈز کے لیے بیلنس کی شناخت فعال کریں۔ فعال ہونے پر، aggregator فلیگ سیٹ رکھنے والے مطابقت پذیر نوڈز ڈیش بورڈ اور quota-preflight روٹنگ میں اپنا بیلنس رپورٹ کریں گے۔                                                                                                                                                                                                                                                                                                                |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |             | non-streaming، سرور کے زیرِ ملکیت ٹول کالز اس وقت تک جاری رکھیں جب تک ماڈل کلائنٹ کے قابلِ استعمال جواب نہ لوٹائے۔                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |             | تلاش کے اعدادوشمار اور حالیہ تلاشیں صرف ان فراہم کنندگان کو شمار کریں جن کا اب بھی فعال کنکشن موجود ہے (بغیر کلید والے فراہم کنندگان، جیسے duckduckgo-free، ہمیشہ شمار ہوتے ہیں)۔ غیر فعال حالت میں فراہم کنندہ ID والی ہر محفوظ شدہ تلاش کی قطار برقرار رہتی ہے۔                                                                                                                                                                                                                                                                               |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |             | ڈیش بورڈ کے فراہم کنندہ صفحات: Free بیج صرف انہی اشاروں پر دکھائیں جنہیں فراہم کنندہ تسلیم کرتا ہے — دستاویزی مفت درجے کے بغیر رجسٹرڈ فراہم کنندگان پر display-name heuristic، non-boolean free فیلڈز اور :free suffixes کو نظر انداز کرتا ہے۔ غیر فعال حالت میں تاریخی بیج کا اصول برقرار رہتا ہے۔                                                                                                                                                                                                                                             |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |             | مجموعی 429/503 عدم دستیابی کے جوابات میں، جب مستقبل میں دوبارہ کوشش کا کوئی ٹھوس وقت معلوم نہ ہو تو مصنوعی 1s کے بجائے `Retry-After` شامل نہ کریں، `error.retry_after_provenance` (`signal` \| `none`) شامل کریں، اور combo drain راستوں کو JSON اور plain-text upstream باڈیز سے نثری دوبارہ کوشش کے اشارے پڑھنے دیں۔ یہ فیلڈ صرف `unavailableResponse()` کے ذریعے بنائے گئے جوابات میں ظاہر ہوتا ہے؛ دیگر 429/503 باڈیز میں کوئی تبدیلی نہیں ہوتی۔                                                                                            |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |             | جب `priority` کا ایسا کومبو ہدف، جسے صرف کوٹا ختم ہونے پر فال بیک کے طور پر نشان زد کیا گیا ہو، کسی ایسی وجہ سے کومبو روک دے جو ثابت شدہ طور پر کوٹا سے متعلق نہ ہو (فراہم کنندہ کا سرکٹ بریکر کھلا ہونا، پیش گوئی کردہ تاخیر کی بنیاد پر چھوڑ دینا)، تو کوٹا سے متعلق دکھائی دینے والے 503 کے بجائے 502 جواب دیں۔ لاک آؤٹ، کول ڈاؤن، عدم دستیابی، کوٹا ختم ہونے اور کنکرنسی کی حد کی وجہ سے رکنے کی صورت میں 503 برقرار رہتا ہے۔                                                                                                               |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |             | ایک سادہ Mistral 401 (`{"detail":"Unauthorized"}`، بغیر کسی واضح توثیقی اشارے کے) منسوخ شدہ کلید اور ختم شدہ کوٹے، دونوں کے لیے یکساں ہوتا ہے۔ فعال ہونے پر، یہ کنکشن کو `expired` کے طور پر غیر فعال کرنے کے بجائے کول ڈاؤن کرتا ہے، فی کنکشن فی گھنٹہ زیادہ سے زیادہ 3 بار؛ اگلی بار یہ اسے غیر فعال کر دیتا ہے، لہٰذا منسوخ شدہ کلید بالآخر اسی حالت تک پہنچ جاتی ہے۔ بطور ڈیفالٹ غیر فعال: ہر سادہ Mistral 401 پہلے کی طرح کنکشن کو غیر فعال کر دیتا ہے۔                                                                                    |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |             | منجمد جامد سیڈ کے بجائے OAuth بیئرر ٹوکن استعمال کرتے ہوئے `xai-oauth` کنکشنز کے لیے لائیو xAI ماڈل کیٹلاگ `https://api.x.ai/v1/models` سے حاصل کریں۔ بطور ڈیفالٹ غیر فعال: `xai-oauth` بغیر کسی تبدیلی کے جامد سیڈ فراہم کرتا رہتا ہے۔ کسی بھی ریزولیوشن خرابی کی صورت میں، دریافت کا عمل واپس سیڈ استعمال کرتا ہے (یہ تصدیق شدہ نہیں کہ آیا x.ai اس اینڈ پوائنٹ پر OAuth بیئرر قبول کرتا ہے)۔                                                                                                                                                 |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |             | خودکار صفائی کے عمل کو `OMNIROUTE_BATCH_RETENTION_DAYS` سے زیادہ پرانی حتمی حالت (مکمل/ناکام/منسوخ/میعاد ختم) والی Batch API جابز، ان کے فی سطر چیک پوائنٹس سمیت، حذف کرنے اور اپنی `expires_at` مدت سے گزر چکی اپ لوڈ شدہ فائلوں کا BLOB مواد صاف کرنے دیں۔ بطور ڈیفالٹ غیر فعال: ہر موجودہ تنصیب اس ڈیٹا کو بالکل پہلے کی طرح برقرار رکھتی ہے، جب تک کوئی آپریٹر اسے فعال نہ کرے۔ آپریٹر کے ذریعے چلایا جانے والا `DELETE /api/v1/batches/delete-completed` روٹ دونوں صورتوں میں متاثر نہیں ہوتا — یہ ایک الگ، غیر مشروط عوامی API معاہدہ ہے۔ |

### CLI (5)

| کلید                                  | قسم     | ڈیفالٹ  | دوبارہ آغاز | وضاحت                                                                                                                                                                                                                      |
| ------------------------------------- | ------- | ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓           | تمام CLI کلائنٹس کے لیے مطابقتی موڈ فعال کریں۔                                                                                                                                                                             |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |             | ماڈل عرف کی مطابقتی تہہ فعال کریں۔                                                                                                                                                                                         |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |             | قیمتوں کے ڈیٹا کی خودکار ہم وقت سازی فعال کریں (`PRICING_SYNC_ENABLED` ماحولیاتی متغیر بھی درکار ہے)۔                                                                                                                      |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |             | فراہم کنندہ کے ماڈل کی ہم وقت سازی کے بعد، لائیو کیٹلاگ سے ~/.codex/*.config.toml پروفائل فائلیں خودکار طور پر (دوبارہ) لکھیں۔ فعال/ڈیفالٹ Codex کنفیگ کبھی تبدیل نہیں ہوتا۔ بطور ڈیفالٹ غیر فعال۔                         |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |             | فراہم کنندہ کے ماڈل کی ہم وقت سازی کے بعد، لائیو کیٹلاگ سے ~/.claude/profiles/<name>/settings.json Claude Code پروفائلز خودکار طور پر (دوبارہ) لکھیں۔ فعال/ڈیفالٹ Claude کنفیگ کبھی تبدیل نہیں ہوتا۔ بطور ڈیفالٹ غیر فعال۔ |

### صحت (5)

| کلید                                      | قسم     | طے شدہ  | تفصیل                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | مقامی انسٹینس کے صحت کی جانچ کے اینڈ پوائنٹ کو غیر فعال کریں۔                                                                                                                                                                                                                                                |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | ٹوکن کی توثیق کی صحت کی جانچ کو غیر فعال کریں۔                                                                                                                                                                                                                                                               |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | اسکلز سینڈ باکس ماحول میں نیٹ ورک تک رسائی فعال کریں۔                                                                                                                                                                                                                                                        |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | پراکسی صحت کی جانچ کے دوران، ہدف کی جانب سے مسترد کردہ پروب (401/403/429) پراکسی کی مسلسل ناکامیوں کا سلسلہ ری سیٹ کر دیتی ہے۔ بطور طے شدہ بند: مسترد ہونا غیر جانب دار رہتا ہے (#10654)۔ 5xx دونوں صورتوں میں غیر حتمی رہتا ہے؛ مسترد ہونا کبھی بھی کسی پراکسی کو ہٹاتا، غیر فعال یا دوبارہ فعال نہیں کرتا۔ |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | آغاز کے وقت DB کی سالمیت/صحت کی جانچ کو اس وقت چلائیں جب سرور درخواستیں قبول کرنا شروع کر دے (`setImmediate` کے ذریعے)، بجائے اس کے کہ جانچ مکمل ہونے تک آغاز کو روکا جائے (#13717)۔ بطور طے شدہ بند: آغاز بالکل اسی طرح رکتا ہے جیسے اس PR سے پہلے رکتا تھا۔                                                |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` اور اس کا قدیمی عرف
> `INJECTION_GUARD_BLOCK_THRESHOLD`، `INJECTION_GUARD_MODE` کے `block` موڈ کو
> ایڈجسٹ کرتے ہیں، لیکن یہ عام ماحولیاتی متغیرات ہیں جنہیں
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> پڑھتا ہے، فیچر فلیگز نہیں: ان کے لیے نہ کوئی DB اوور رائیڈ ہے اور نہ ڈیش بورڈ ٹوگل۔ دیکھیے
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)۔

> [!NOTE]
> `Restart` کالم ان فلیگز کی نشان دہی کرتا ہے جن کے لیے `requiresRestart: true` ہے — قدر
> فوری طور پر محفوظ ہو جاتی ہے، لیکن صرف پراسیس دوبارہ لوڈ ہونے کے بعد مؤثر ہوتی ہے۔ Enum
> فلیگز اپنے اجازت یافتہ سیٹ سے باہر کسی بھی قدر کو مسترد کر دیتے ہیں (سرور کی جانب سے
> `setFeatureFlagOverride()` اور REST `PUT` ہینڈلر، دونوں میں توثیق کی جاتی ہے)۔

---

## فلیگز کو ٹوگل کرنا

### ڈیش بورڈ

**Dashboard → Settings → Feature Flags**
(`/dashboard/settings/feature-flags`) پر جائیں۔ گرڈ
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
درج ذیل سہولتیں فراہم کرتا ہے:

- کلید یا تفصیل کے ذریعے **تلاش**، اور زمرے کے لحاظ سے **فلٹر** (نیز ایک مصنوعی
  **Requires Restart** منظر)۔
- بولین فلیگز کے لیے ایک **ٹوگل** اور enum فلیگز کے لیے ایک **ڈراپ ڈاؤن**
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)۔
- ہر فلیگ کے لیے ایک **ماخذ بیج** — `DB`، `ENV`، یا `DEF` — جو دکھاتا ہے کہ
  مؤثر قدر کہاں سے آئی۔
- اوور رائیڈ ہٹانے کے لیے ایک **Reset** بٹن (جو صرف `DB` سے ماخوذ فلیگز کے لیے دکھایا جاتا ہے)،
  اور نیچے ایک **Reset All Overrides** بٹن۔
- جب کسی `requiresRestart` فلیگ کو تبدیل کیا جائے تو ایک **Restart Server** بینر۔

### REST API

تمام کارروائیاں ایک ہی روٹ کے ذریعے انجام پاتی ہیں:
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts)۔
ہر طریقے کے لیے تصدیق شدہ ڈیش بورڈ سیشن درکار ہے (بصورتِ دیگر `401`)۔

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
    // ... تمام 72 فلیگز
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

ایک اوور رائیڈ مقرر کریں یا ہٹائیں۔ باڈی: `{ key: string; value?: string }`۔
`value` کو چھوڑ دینے سے اوور رائیڈ ہٹ جاتا ہے (اور env / ڈیفالٹ بحال ہو جاتا ہے)۔

```bash
# ایک DB اوور رائیڈ مقرر کریں
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# اوور رائیڈ ہٹائیں ("value" کے بغیر)
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

جواب نئی `effectiveValue`/`source`، `previousValue`/
`previousSource`، اور `requiresRestart` کو واپس منعکس کرتا ہے۔ نامعلوم کلیدیں اور حد سے باہر enum
قدریں `400` کے ساتھ مسترد کر دی جاتی ہیں۔

#### `DELETE /api/settings/feature-flags`

تمام DB اوور رائیڈز کو ایک ساتھ صاف کر کے ہر فلیگ کو اس کی env / ڈیفالٹ
قدر پر بحال کرتا ہے۔ `{ cleared: <count>, message: "..." }` واپس کرتا ہے۔

> [!NOTE]
> `requiresRestart: true` والے فلیگز صرف پراسیس دوبارہ لوڈ ہونے کے بعد مؤثر ہوتے ہیں۔
> ڈیش بورڈ کا ری اسٹارٹ فلو `POST /api/restart` کو کال کرتا ہے اور پھر سرور کے دوبارہ فعال ہونے تک
> `GET /api/health/ping` کو پول کرتا رہتا ہے۔

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
