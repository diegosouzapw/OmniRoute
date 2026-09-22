# Account-Ban / Banned-Keyword Detection (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute اپ اسٹریم خرابی کے جوابات میں ایسے اشارے تلاش کرتا ہے جو ظاہر کریں کہ کسی فراہم کنندہ کا
**اکاؤنٹ مستقل طور پر ناکارہ ہو چکا ہے** (معطل / غیر فعال / ToS کی خلاف ورزی پر ممنوع) اور، مماثلت
ملنے پر، اس کنکشن کو **حتمی `banned` حالت** میں منتقل کر دیتا ہے تاکہ اسے آئندہ
درخواستوں کے لیے منتخب نہ کیا جائے۔ **Security → Banned Keywords**
کی ترتیبات کا کارڈ اسی کو ترتیب دیتا ہے ("اضافی کلیدی الفاظ جو مستقل اکاؤنٹ
پابندی کی شناخت کو متحرک کرتے ہیں۔ بلٹ اِن کلیدی الفاظ ہمیشہ لاگو ہوتے ہیں۔")۔

یہ صفحہ بلٹ اِن فہرست، شناخت کے بہاؤ، اس کے دائرۂ کار، حسبِ ضرورت کلیدی الفاظ محفوظ طریقے سے شامل
کرنے، اور نشان زدہ کنکشن کو بحال کرنے کے طریقے کی دستاویز فراہم کرتا ہے۔ حتمی
حالت بذاتِ خود لچک پذیری کے ماڈل کا حصہ ہے — دیکھیے
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("حتمی حالتیں")۔

**حتمی ماخذ:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`)۔

## بلٹ اِن کلیدی الفاظ

یہ 8 ذیلی اسٹرنگز کسی بھی حسبِ ضرورت فہرست سے قطع نظر ہمیشہ لاگو ہوتی ہیں (حروف کی بڑی یا چھوٹی شکل سے غیر حساس):

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> جیسے جیسے فراہم کنندگان اپنی پابندی کی عبارت تبدیل کرتے ہیں، یہ فہرست بھی ارتقا پذیر رہتی ہے۔ مستند
> نقل `open-sse/services/accountFallback.ts` میں موجود `ACCOUNT_DEACTIVATED_SIGNALS` ہے؛
> اوپر دیے گئے بلاک کو ایک وقتی عکس سمجھیں۔

اسی فائل میں دو ملحقہ، **علیحدہ** سگنل ٹیبلز موجود ہیں جو ممنوعہ کلیدی الفاظ کی شناخت
کا حصہ _نہیں_ ہیں:

- `CREDITS_EXHAUSTED_SIGNALS` — بلنگ/کوٹہ ختم ہو چکا ہے (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → حتمی `credits_exhausted`۔
- `OAUTH_INVALID_TOKEN_SIGNALS` — **غیر حتمی**؛ ٹوکن ریفریش سے بحالی ممکن ہے۔

نوٹ: عام عارضی عبارتیں، جیسے **`rate limit`** / `429`، شرح کی حد /
کنکشن کول ڈاؤن کے راستے کے ذریعے سنبھالی جاتی ہیں اور پابندی کے سگنلز **نہیں** ہیں۔

## شناخت کا بہاؤ

```
اپ اسٹریم خرابی کا جواب
  → باڈی کو اسٹرنگ میں تبدیل کر کے چھوٹے حروف میں بدلا جاتا ہے
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [ذیلی اسٹرنگ کی مماثلت]
  → مماثلت؟
      → connection testStatus = "banned"      (مستقل — 1 سالہ کول ڈاؤن، کبھی خودکار طور پر بحال نہیں ہوتا)
      → اگر ترتیب `autoDisableBannedAccounts` فعال ہو اور `autoDisableBannedScope`
        میں یہ کنکشن شامل ہو (`all`، یا OAuth/cookie/session کے لیے `subscription`)
        → تو isActive = false بھی ہو جاتا ہے۔ جب دائرۂ کار
        `subscription` ہو تو پری پیڈ API کلیدیں فعال رہتی ہیں۔
      → اکاؤنٹ کے انتخاب کے دوران کنکشن چھوڑ دیا جاتا ہے (مشترکہ QUOTA_BLOCKING حالتیں)
```

- مماثلت، جوابی **باڈی** میں **حروف کی بڑی یا چھوٹی شکل سے غیر حساس ذیلی اسٹرنگ** کی تلاش ہے
  (`isAccountDeactivated`, `accountFallback.ts`)۔
- مستقل `banned` حتمی حالت کسی پابندی کے سگنل والی باڈی پر **کسی بھی
  HTTP اسٹیٹس** میں متحرک ہوتی ہے (`markAccountUnavailable` → `checkFallbackError` کے ذریعے)۔ زیادہ
  محدود **`deactivated`** لیبل (جب کنکشن کے پاس کوئی اضافی API کلید نہ ہو تو `isActive=false`)
  ان لائن `chatCore.ts` راستے کے ذریعے **HTTP 401 / 403** پر لکھا جاتا ہے
  (`classifyProviderError` → `ACCOUNT_DEACTIVATED` کے ذریعے درجہ بند)۔ نوٹ کریں کہ
  `markAccountUnavailable()` راستہ اسی `ACCOUNT_DEACTIVATED` سگنل کے لیے
  `resolveTerminalConnectionStatus` کے ذریعے ایک _مختلف_ حتمی اسٹیٹس —
  **`expired`** — لکھتا ہے، لہٰذا ایک ہی پابندی اس بات پر منحصر ہو کر
  `deactivated` یا `expired` میں سے کسی ایک صورت میں ظاہر ہو سکتی ہے کہ جواب کو کس راستے نے سنبھالا۔ (پرانا
  کوڈ تبصرہ کہتا ہے "جب 401 باڈی میں یہ اسٹرنگز موجود ہوں" — یہ موجودہ طرزِ عمل
  کو مکمل طور پر بیان نہیں کرتا۔)
- `banned` کنکشن کو انتخاب سے ہر اس جگہ خارج کیا جاتا ہے جہاں حتمی اسٹیٹسز
  فلٹر کیے جاتے ہیں (`isTerminalConnectionStatus`، مشترکہ `QUOTA_BLOCKING_CONNECTION_STATUSES`)۔

## دائرۂ کار — کن providers کو اسکین کیا جاتا ہے

**تمام providers۔** یہ جانچ عمومی error-handling pipeline میں چلتی ہے، جس سے
ہر ناکام upstream درخواست گزرتی ہے — یہ صرف
OAuth/subscription scrapers تک محدود **نہیں** ہے۔ نتیجے میں بننے والی terminal state فی **connection**
ہوتی ہے، نہ کہ فی provider۔

البتہ، built-in _strings_ حقیقی ban کے خطرے والے subscription/OAuth
providers (ChatGPT Web Codex، Claude Web، Codex، Muse Spark،
Antigravity) کو مدِنظر رکھ کر بنائی گئی ہیں۔ API-key provider صرف اسی صورت میں detector کو
فعال کرے گا جب اس کے error body میں ان substrings میں سے کوئی ایک بعینہٖ موجود ہو۔

`autoDisableBannedScope` (`all` | `subscription`، ڈیفالٹ `all`) یہ کنٹرول کرتا ہے کہ
کیا match ہونے پر `isActive=false` بھی کیا جائے۔ `subscription` سے مراد login-style seats
ہیں (ادائیگی والی subscriptions اور مفت accounts، بشمول web-cookie sessions)۔ یہ prepaid API keys کے لیے
تب بھی `testStatus=banned` ریکارڈ کرتا ہے، لیکن انہیں routing
pool میں رہنے دیتا ہے۔ پائیدار design فی-provider اور فی-account override ہے؛ global
enum اس کا ابتدائی نفاذ ہے۔

## حسبِ ضرورت banned keywords

**Security → Banned Keywords** میں keywords شامل کریں یا ہٹائیں (جو global
`customBannedSignals` setting کے طور پر `PATCH /api/settings` کے ذریعے محفوظ ہوتے ہیں)۔ انہیں built-in
فہرست میں **شامل کیا جاتا ہے** — وہ کبھی اس کا متبادل نہیں بنتے — اور save کرتے ہی (نیز startup پر)
`setCustomBannedSignals()` کے ذریعے hot-reload ہوتے ہیں۔ ہر keyword زیادہ سے زیادہ 200 حروف کا ہو سکتا ہے؛
array کی لمبائی کی کوئی حد نہیں۔

**⚠ False-positive کا خطرہ — مخصوص فقرے منتخب کریں۔** Detection پورے response body پر raw substring
match ہے، اور match **مستقل** ہوتا ہے (1 سالہ cooldown،
manual recovery)۔ کوئی بہت عمومی keyword ایک مکمل طور پر صحت مند connection کو ban کر سکتا ہے:

- **خراب:** `quota`، `limit`، `error`، `denied` — یہ کئی عارضی errors میں ظاہر ہوتے ہیں۔
- **اچھا:** مکمل ban والے جملے، مثلاً `your account has been suspended for`،
  `account permanently banned`، `violation of our terms`۔

اس سب سے طویل غیر مبہم فقرے کو ترجیح دیں جو provider حقیقی ban پر واپس کرتا ہے۔ شک کی صورت میں
پہلے connection کا `lastError` دیکھیں، پھر وہی بعینہٖ عبارت شامل کریں۔

## نشان زدہ connection کی بحالی

Terminal `banned` / `deactivated` states **کبھی خودکار طور پر بحال نہیں ہوتیں** (انہیں
proactive-recovery tick سے خارج رکھا جاتا ہے — صرف `unavailable` cooldowns خود
بحال ہوتے ہیں)۔ کسی operator کو انہیں واضح طور پر صاف کرنا ہوگا:

1. **Connection کو دوبارہ test کریں** — dashboard کا **Test** action
   (`POST /api/providers/{id}/test`)؛ کامیاب probe، `testStatus` کو
   `active` پر reset کر دیتا ہے اور error fields صاف کر دیتا ہے۔
2. **دوبارہ authenticate کریں / credentials میں ترمیم کریں** — OAuth providers کے لیے login
   / refresh flow دوبارہ چلائیں؛ provider create/import routes، `isActive = true` سیٹ کرتے ہیں۔
3. **Connection کو دوبارہ فعال کریں** — اگر auto-disable نے `isActive = false`
   سیٹ کیا تھا (scope `all`، یا OAuth/cookie/session connection کے لیے `subscription`)،
   تو account درست کرنے کے بعد اسے دوبارہ آن کریں۔

کوئی الگ "clear ban flag" button موجود نہیں — recovery دوبارہ test، دوبارہ auth، یا
دوبارہ enable کرنے سے ہوتی ہے، جو
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) میں عمومی terminal-state اصول کے مطابق ہے۔

## Probe کی علیحدگی (model test-all)

**probe-origin failure** (model test-all / health-check dispatches جو
`runAsProbe` کے اندر execute ہوتے ہیں) کبھی بھی connection کو pool سے نہیں ہٹاتی (#9817): اسے
**دیکھنے کے لیے ریکارڈ کیا جاتا ہے** (`last_error`، `last_error_type`، `error_code`،
`last_error_at`)، لیکن یہ routing کی **ہر** تبدیلی چھوڑ دیتی ہے — cooldowns، terminal
status (`banned` / `deactivated` / `credits_exhausted`)، فی-model lockouts،
provider circuit breaker، 5 منٹ کا quota cache، OAuth token refresh
اور auto-disable۔ صرف حقیقی request-path failure ہی deactivate کرتی ہے۔ ریکارڈ کردہ
error کی وجہ سے نشان زدہ account، traffic فراہم کرتے رہنے کے دوران dashboard میں نظر آتا ہے۔

واحد فیصلہ کن مقام `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`) ہے، جس سے **ہر** وہ جگہ رجوع کرتی ہے جو
probe-origin failure کی بنا پر routing state تبدیل کر سکتی ہے:

- `markAccountUnavailable` (`auth.ts`) — صرف ریکارڈ (`lastError` کا raw text،
  `lastErrorType`، `errorCode`، `lastErrorAt`؛ جان بوجھ کر **کوئی**
  `backoffLevel` نہیں، کیونکہ وہ selection-time auto-decay کو متحرک کرکے
  ریکارڈ مٹا دے گا)
- `maybeAutoDisableBannedAccount` — کوئی auto-disable نہیں
- `chatCore` — FORBIDDEN، ACCOUNT_DEACTIVATED، QUOTA_EXHAUSTED (صرف ریکارڈ،
  کوئی terminal `credits_exhausted` نہیں)، GEO_BLOCKED (کوئی 24h exclusion نہیں)،
  MODEL_NOT_FOUND (کوئی `lockModel` نہیں)، codex 429 account-rotation failover
  (کوئی `markCodexScopeRateLimited` نہیں، کوئی محفوظ شدہ `rate_limited_until` نہیں، کوئی
  session-affinity clear نہیں)، `persistCodexQuotaState` (کوئی quota-state write نہیں،
  کوئی cache invalidation نہیں)، `recordKeyHealthStatus` (key-health rotator
  میں کوئی تبدیلی نہیں)
- OAuth refresh — executor base میں proactive refresh
  (`base.ts` `execute()`، کوئی refresh-token rotation استعمال نہیں ہوتی) اور
  `chatCore` میں reactive 401/403 path (کوئی `expired` deactivation نہیں)، دونوں
- `chat.ts` — provider circuit breaker اور 5 منٹ کا quota cache
  (`markAccountExhaustedFrom429`) کبھی degrade نہیں ہوتے

ریکارڈ کردہ error کی وجہ سے نشان زدہ account، traffic فراہم کرتے رہنے کے دوران
dashboard میں نظر آتا ہے۔ نوٹ: probe record میں **raw**
(بغیر slice کیا ہوا) error text محفوظ ہوتا ہے، برخلاف حقیقی path کی `slice(0,100)` truncation کے۔

جو operators test-all کو maintenance tool کے طور پر استعمال کرتے ہیں، وہ تاریخی
رویہ (probe کو حقیقی generation شمار کرنا) ان میں سے کسی ایک طریقے سے بحال کر سکتے ہیں:

- `probeCanDisable` setting (`POST /api/settings` کے ساتھ
  `{"probeCanDisable": true}`، یا براہِ راست `key_value` DB edit)، یا
- feature flag **`PROBE_CAN_DISABLE=true`** (env یا DB override؛ setting پر
  فوقیت رکھتا ہے)۔

Fail-safe: اگر flag یا settings lookup میں exception آئے تو isolation فعال رہتی ہے۔

## سورس فائلیں

| موضوع                                    | فائل                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| سگنل ٹیبلز + میچ                         | `open-sse/services/accountFallback.ts`                                                                        |
| اختتامی حالت / مستقل ذخیرہ               | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| خودکار طور پر غیر فعال کرنے کا دائرۂ کار | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| اِن لائن درجہ بندی                       | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| اختتامی حالت کی بازیابی سے اخراج         | `src/lib/quota/connectionRecovery.ts`                                                                         |
| حسبِ ضرورت کلیدی الفاظ کا رَن ٹائم لوڈ   | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| ترتیبات کا صارف انٹرفیس                  | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
