# Resilience Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

ל-OmniRoute שלושה מנגנוני שחוסן (resilience) נבדלים אך קשורים זה לזה. לכל אחד היקף ומטרה שונים. יש להפריד ביניהם בעת ניפוי שגיאות בהתנהגות הניתוב.

![מודל שחוסן בן 3 שכבות](../diagrams/exported/resilience-3layers.svg)

> מקור: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. מפסק מעגל ברמת ספק (Provider Circuit Breaker)

**היקף:** ספק שלם (למשל, `glm`, `openai`, `anthropic`).

**מטרה:** להפסיק לשלוח תעבורה לספק שנכשל שוב ושוב ברמת ה-upstream/השירות.

**מימוש:**

- מחלקת ליבה: `src/shared/utils/circuitBreaker.ts`
- חיווט: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- ‏API סטטוס: `GET /api/monitoring/health`
- ‏API איפוס: `POST /api/resilience/reset`
- עטיפות (Wrappers): `open-sse/services/accountFallback.ts`
- טבלת DB: `domain_circuit_breakers`

**מצבים:**

- `CLOSED` — תעבורה רגילה מותרת
- `DEGRADED` — תעבורה עדיין מותרת, אך כשלים מוגברים של הספק נמצאים במעקב; חוזר ל-`CLOSED` לאחר מספיק הצלחות, לאחר בדיקת חיבור תקינה, או לאחר החזקת ה-`OPEN` הארוכה ביותר עבור סוג הכשל האחרון (ערך ה-`cooldownByKind` שלו, אחרת `resetTimeout`, × `maxBackoffMultiplier`, לפחות cooldown אחד) ללא כשל חדש
- `OPEN` — הספק חסום זמנית; ניתוב combo מדלג עליו
- `HALF_OPEN` — הזמן הקצוב לאיפוס חלף; בקשת בדיקה (probe) מותרת

**ברירות מחדל ניתנות להגדרה (`open-sse/config/constants.ts`, חשופות תחת Dashboard → Settings → Resilience):**

| מחלקה   | נכנס ל-DEGRADED לאחר | נפתח (OPEN) לאחר | זמן קצוב לאיפוס |
| ------- | -------------------- | ---------------- | --------------- |
| OAuth   | 5 כשלים              | 8 כשלים          | 60s             |
| API-key | 7 כשלים              | 12 כשלים         | 30s             |
| Local   | נגזר                 | 2 כשלים          | 15s             |

‏`degradationThreshold` שולט מתי ספק נכנס ל-`DEGRADED`; `failureThreshold` שולט מתי הוא נפתח ומדולג עליו. פרופילי ספק מקומיים (Local) עדיין אינם חשופים בעמוד ההגדרות של Resilience.

**קודי שקיעה (Trip):** רק סטטוסים ברמת הספק `[408, 500, 502, 503, 504]`. אין לשקוע עבור שגיאות ברמת החשבון (רוב 401/403/429 — אלה שייכות ל-cooldown או ל-lockout).

**התאוששות עצלה (Lazy):** כשתוקף ה-`OPEN` פג, `getStatus()`, `canExecute()`, `getRetryAfterMs()` מרעננים את המצב ל-`HALF_OPEN`. אותן קריאות (והכשל הבא) מדרדרות `DEGRADED` מיושן חזרה ל-`CLOSED`. אין צורך בטיימר רקע.

---

### ‏Provider Cooldown גלובלי בהצטרפות (opt-in) — שער חלון

שכבה רביעית, **בהצטרפות (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`, ברירת מחדל **כבוי**), שומרת זיכרון חוצה-בקשות של ספקים נכשלים ב-`open-sse/services/providerCooldownTracker.ts`, ופתרון יעדי combo נועץ בה כך שבקשות combo רצופות מפסיקות לחזור ולעבור על ספק שזה עתה נכשל. רשומות ברמת הספק מכבדות את שער החלון של `PROVIDER_PROFILES`:

| פרופיל  | שוקע לאחר (`providerFailureThreshold`) | בתוך (`providerFailureWindowMs`) | מתקרר למשך (`providerCooldownMs`) |
| ------- | -------------------------------------: | -------------------------------: | --------------------------------: |
| OAuth   |                                   `10` |                          `15min` |                            `5min` |
| API key |                                   `15` |                          `30min` |                           `10min` |

מתחת לסף, הספק **לא** נחשב כמתקרר; הצלחה מנקה את החלון. רשומות ברמת החיבור (`provider:connectionId`) שומרות במקום זאת על ה-backoff האקספוננציאלי `minRetryCooldownMs → maxRetryCooldownMs`. עקיפות (Overrides): `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. מנגנון הגנה מפני רגרסיה: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. צינון חיבור

**היקף:** חיבור/חשבון/מפתח יחיד של ספק.

**מטרה:** לדלג על מפתח תקול אחד בזמן שחיבורים אחרים לאותו ספק ממשיכים לשרת.

**יישום:**

- סימון כלא זמין: `src/sse/services/auth.ts::markAccountUnavailable()`
- בחירה: `getProviderCredentials*` באותו קובץ
- חישוב צינון: `open-sse/services/accountFallback.ts::checkFallbackError()`
- הגדרות: `src/lib/resilience/settings.ts`

**שדות לכל חיבור:**

- `rateLimitedUntil` — חותמת זמן עד לתום הצינון
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — מונה backoff אקספוננציאלי

**ברירות מחדל של צינון:**

- בסיס OAuth: 5 שניות
- בסיס מפתח API: 3 שניות
- מפתח API עם 429: מעדיף `Retry-After` מהספק / כותרות reset / טקסט reset הניתן לניתוח
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**מגן מפני thundering herd:** מונע מכשלונות מקבילים להאריך את הצינון יתר על המידה או להגדיל את `backoffLevel` פעמיים.

**שגיאות 429 של מגבלת מקביליות אינן מטפסות בסולם ה-backoff.** שגיאת `429` שהגוף שלה מדווח על מגבלת מקביליות ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) פירושה שהחשבון תקין אך עסוק. `checkFallbackError()` מחזירה את הסיבה `concurrency_limited`: עוברים מיד לחיבור הבא, מצננים את החיבור הזה למשך `CONCURRENCY_LIMIT_COOLDOWN_MS` קבוע (שנייה אחת) או לפי רמז ה-retry מהספק, משאירים את `backoffLevel` ללא שינוי, ומגדירים `skipProviderBreaker`. גוף מכסה מפורש עדיין גובר, כך שגוף שמתאים גם לתבנית מכסה נשאר הכרעת מכסה. זיהוי: `looksLikeConcurrencyLimit()` ב-`src/shared/utils/classify429.ts`; הכרעה: `open-sse/services/accountFallback/concurrencyLimit429.ts`. הפונקציה `classify429()` (ה-`FailureKind` של ה-breaker) לא השתנתה ועדיין מחזירה `rate_limit` עבור גופים אלה.

**קיפאון תוכן בזרם אינו מצנן את החשבון.** כאשר ה-watchdog של קיפאון התוכן (`open-sse/utils/streamHandler.ts`) מוותר על זרם שלא שלח פלט מודל בזמן, `markAccountUnavailable()` מתעדת את השגיאה על החיבור אך אינה מגדירה צינון: הקיפאון שייך לאותה בקשה, לרוב תור reasoning ארוך שעדיין לא הניב פלט. מפעילים יכולים לבחור להפעיל זאת מחדש באמצעות `resilienceSettings.streamStallCooldown.enabled` (ברירת מחדל `false`).

**פריימים של reasoning מאתחלים את תקציב קיפאון התוכן.** מודל reasoning יכול לחשוב דקות לפני הטוקן הגלוי הראשון שלו: Claude מזרים פריימים של `thinking_delta` שטקסט החשיבה שלהם עשוי להיות ריק, ו-Responses API מזרים פריט reasoning אחד אחרי השני. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) מזהה פריימים אלה, וה-watchdog מאתחל את התקציב שלו בכל אחד מהם במקום לבטל את התור. הם עדיין אינם פלט מודל, ולכן תור שמסתיים ב-reasoning בלבד עדיין מדווח כריק, ותור שמפסיק את ה-reasoning ושולח רק heartbeats עדיין מפעיל את ה-watchdog.

הפריימים הבינאריים `reasoningContentEvent` של Kiro עם חתימה לא-ריקה משמרים את פעילות ה-reasoning הזו דרך ה-executor כדלתא `reasoning_content` ריקה. החתימה אינה מועברת הלאה. מטא-דאטה, פריימים לא שלמים וחתימות ריקות אינם מאתחלים את תקציב התוכן; ה-timeout העצמאי של זרם פעיל וביטול מצד הלקוח עדיין חלים (`open-sse/executors/kiro/reasoning.ts`).

**מצבים סופיים (לא צינונים):**

- `banned` — מוגדר על ידי זיהוי מילות מפתח חסומות / חסימת חשבון (ראו [BAN_DETECTION](../security/BAN_DETECTION.md)), ועל ידי שלושה סירובים רצופים מהספק ברמת בקשה בודדת (`request_rejected`, למשל Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); סירוב בודד רק מצנן את החיבור
- `expired` (עובר למצב סופי לאחר ניסיונות חוזרים מוגבלים — `EXPIRED_RETRY_MAX = 3` עם backoff אקספוננציאלי — כך ששגיאות OAuth חולפות יכולות להתרפא מעצמן לפני שהחשבון מושבת לצמיתות)
- `credits_exhausted`

אלה נשמרים עד שהאישורים משתנים או שמפעיל מאפס אותם. אין לדרוס מצבים סופיים במצב צינון חולף.

**שחזור עצל:** כאשר `rateLimitedUntil` חלף, החיבור הופך שוב לזכאי. בשימוש מוצלח, `clearAccountError()` מנקה את כל שדות השגיאה.

### חומת השימוש של Claude OAuth: נתיב בעדיפות נמוכה יותר + איפוס מגבלת סשן

**היקף:** חיבור מנוי Claude (OAuth) אחד. שתי התכונות הן **opt-in לכל חיבור** (עריכת חיבור → מקטע Claude → `lowPriorityMode` / `autoLimitReset` ב-`providerSpecificData`, שתיהן כבויות כברירת מחדל) ומשקפות את הפקודות `/low-priority` ו-`/limit-reset` של Claude Code (חוזה ה-wire נלכד מ-Claude Code 2.1.263).

**יישום:**

- מכונת מצבים + סיווג תגובה: `open-sse/services/claudeLowPriority.ts`
- לקוח סטטוס/תביעת איפוס: `open-sse/services/claudeLimitReset.ts`
- וו של executor (הזרקת כותרות + ניסיון חוזר באותו חשבון): `open-sse/executors/base.ts::execute()`
- שמירת opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**טריגר:** חומת השימוש של 5 השעות — `429` שהכותרות שלו נושאות `anthropic-ratelimit-unified-status: rejected` וכאשר החשבון זכאי, גם `anthropic-ratelimit-unified-slow-offer: treatment`. דבר לא נשלח לפני ה-429 הראשון של החומה; 429 פרצי ללא כותרות unified עובר דרך נתיב הצינון הרגיל.

**נתיב בעדיפות נמוכה יותר** (`lowPriorityMode`):

- בעת wall 429 ה-executor מקבל את ההצעה ומנסה מיד מחדש את **אותו**
  חשבון עם `anthropic-usage-limit: slow`; ה-lane נשאר פעיל עד ל-`anthropic-ratelimit-unified-reset`
  המוכרז (+60 שניות חסד) וכל בקשה בחלון זה נושאת את
  ה-header. ה-429 שיורט לעולם אינו מגיע ל-`handleChatCore`, ולכן החיבור
  **לא** מוכנס ל-cooldown ולא מוחלף ברוטציה.
- `anthropic-ratelimit-unified-slow-status` בתגובות מאוחרות יותר: `active` / `not_needed`
  משאירים את ה-lane; `slot_busy` (429) או `529` ממתינים לפי
  `anthropic-ratelimit-unified-slow-retry-after` של השרת (ברירת מחדל 20 שניות, clamp 5–600 שניות, ±30% jitter)
  ומנסים שוב, תחום על ידי `anthropic-ratelimit-unified-slow-max-wait` (ברירת מחדל 20 דקות, clamp
  דקה אחת–6 שעות) — מעבר לכך ה-lane מסתיים ו-cool-off של 10 דקות חוסם קבלה מחדש.
  ההמתנה מוגבלת בנוסף על ידי מה שנותר מ-timeout תחילת ה-upstream של הבקשה עצמה
  (`resolveFetchStartTimeout`, 10 דקות כברירת מחדל) פחות מרווח של 5 שניות: בלי הגבלה זו,
  ברירת המחדל של 20 דקות ל-max-wait הייתה שורדת יותר מהבקשה וה-sleep היה מבוטל
  באמצע ההמתנה, ומעלה `TimeoutError` במקום סיום `max_wait` מסודר + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, rollover של חלון 5 שעות, או
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (שמסיים את ה-lane כ-`extra_usage`
  בכל סטטוס, מכיוון ש-overage בתשלום מכסה כעת את ה-wall) מסיימים את ה-lane;
  התגובה זורמת אז לנתיב ה-cooldown הרגיל. `budget_exhausted` נזכר עד
  לאיפוס התקציב המוכרז (≤ 8 ימים).
- בדיקת ה-wall רצה אחרי ניסיונות החזרה הפנימיים של ה-executor המונעים על ידי 400
  (עריכת context, הגבלות thinking/effort, למידת פרמטרים אוטומטית), כך ש-wall 429
  שצף רק באחד מהניסיונות האלה עדיין מיורט במקום להגיע לנתיב ה-cooldown.
- המצב נשמר בזיכרון לכל חיבור (אתחול עולה wall 429 נוסף אחד כדי לקבל מחדש).

**איפוס מגבלת סשן** (`autoLimitReset`, מנוסה לפני ה-lane כששניהם פועלים):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → בלוק `juniper_tide`;
  כאשר `arm: "reset"` וגם `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` עם
  `{ "program": "juniper_tide" }` (ה-UUID של הארגון מתוך
  `providerSpecificData.organizationUUID`, עם fallback ל-bootstrap).
- `result: reset|not_limited` → הבקשה מנוסת מחדש במהירות מלאה (ללא header של slow).
  `already_used` / `not_offered` שומרים בזיכרון (memoize) את `next_available_at` (ברירת מחדל שבוע אחד); כל
  כשל מפעיל backoff של 15 דקות. האיפוס הוא פעם בשבוע ועדיין נספר במגבלה
  השבועית.

מבחני הגנה מפני רגרסיה: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### זיקת סשן (#7274)

**תחום:** סשן לקוח אחד (header של `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) מוצמד לחיבור אחד, עבור **כל** ספק.

**מטרה:** לשמור agent רב-תורי (Claude Code, aider, agents מותאמים אישית) על אותו חשבון לאורך בקשות, ולהפחית אובדן context בין-חשבוני ו-429s חוזרים של cold-start אצל ספקים עם מצב סשן לכל חשבון.

**יישום:**

- פענוח TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- בחירה/יצירה של הצמדה: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- חילוץ header (גנרי, לכל ספק): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- טבלת הצמדות מתמדת: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- הגדרה: `sessionAffinityTtlMs` (TTL גלובלי במילישניות, `0` משבית) — `src/lib/db/settings.ts`. השם שונה מ-`codexSessionAffinityTtlMs` שהיה ייעודי ל-Codex על ידי המיגרציה `124_generic_session_affinity_ttl.sql`, המעבירה כל TTL של Codex שהוגדר קודם כברירת המחדל החדשה.

לפני #7274, `resolveSessionAffinityTtlMs()` הייתה יוצאת מיד עם `0` עבור כל ספק מלבד `codex`, כך שלהגדרת ה-TTL (ול-headers של הסשן) לא הייתה שום השפעה במקום אחר, אף על פי שמנגנון ההצמדה וחילוץ ה-headers כבר היו אגנוסטיים לספק. התיקון הסיר את ה-early-return הזה; ה-TTL חל כעת באופן אחיד על כל ספק ברגע שהוגדר גלובלית מעל `0`.

שלושת ה-headers של זיקת הסשן לעולם אינם מועברים ל-upstream — executors בונים את headers ה-upstream שלהם מאפס במקום להעביר headers של הלקוח הלאה, כך שזה נשאר מזהה correlation פנימי בלבד.

### חכירות חיבור בלעדיות של סשן מנוהל

**תחום:** לקוח/סשן HTTP מנוהל פעיל אחד בעלים על חיבור OmniRoute כשיר אחד.

**מטרה:** לספק בעלות בלעדית ועמידה על חיבור ללקוחות הזקוקים לגדר ניתוב
קשיחה לאורך בקשות. זה שונה מזיקת סשן, שהיא העדפת המשכיות רכה:
חכירה בלעדית שומרת מצב מחזור-חיים ב-SQLite, אוכפת ייחודיות גלובלית של בעלים-פעיל
וחיבור-פעיל, ודוחה generation מיושן לפני שליחה לספק.

התכונה היא opt-in לכל מפתח API. מפתח מנוהל חייב לכלול את ה-scope `lease:exclusive`
ורשימת `allowedConnections` מפורשת ולא ריקה. כל לקוח HTTP יכול להשתמש ב-endpoint של מחזור החיים;
לא נדרשים שם לקוח, user-agent, ספק, שיטת OAuth או מודל. החכירה היא בעלות על חיבור,
לא על מודל, ולכן שינוי מודל שומר על הקישור כל עוד החיבור נשאר כשיר כרגיל.
כללי מודל, מכסה, תקינות, cooldown ו-allowlist רגילים נשארים סמכותיים ועשויים
להעביר את אותו generation לחיבור כשיר פנוי אחר.

מחזור החיים הוא `POST /api/v1/session-leases` עם פעולות JSON של `acquire`, `renew` ו-`release`.
בקשות הסקה מנוהלות מציגות את הערך האטום `X-OmniRoute-Lease-Owner` ואת הערך המדויק של
`X-OmniRoute-Lease-Generation`. הבעלים משתמש ב-`vlo_` ואחריו 43 תווי base64url; נשמר רק
ה-hash מסוג SHA-256 שלו. כל גדר שיגור (dispatch fence) סופית קושרת גם את מזהה מפתח ה-API המאומת ואת
מזהה החיבור הפעיל. כותרות הבקרה של ה-lease מוסרות מיומנים, מתצלומי בקשות שמורים,
ומכותרות של executors במעלה הזרם.

אם לניתוב רגיל יש מועמדים מנוהלים זכאים אך כל מועמד פנוי תפוס על ידי
lease פעיל זר, OmniRoute מחזירה HTTP `429`, קוד lease-capacity-unavailable,
מצב waiting-for-capacity, ו-`Retry-After` חסום הנגזר מתוקף התפוגה הרלוונטי המוקדם ביותר.
זכאות ריקה רגילה אינה תחרות על lease ושומרת על סמנטיקת שגיאות הניתוב הקיימת שלה.

מנגנונים קשורים נשארים נפרדים:

- תפוסת סשן OAuth היא חלוקה רכה מקומית-לתהליך עבור חשבונות OAuth.
- סמפורים של חשבון מעניקים היתרי מקביליות בקשות ומסתיימים כשבקשה מסתיימת.
- leases בלעדיים מנוהלים של סשן הם בעלות מחזור-חיים עמידה עם גדר דור (generation fence).

---

## 3. נעילת מודל

**תחום:** שלישיית provider + connection + model.

**תחום המפתח לפי סטטוס:** הסטטוס הכושל מחליט לאיזה מפתח נעילה תיכתב
(`resolveLockoutScope()` ב־`open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — אות מכסה או זכאות — נועל את **משפחת המכסה**:
  עבור codex את כל תחום `codex` / `spark` (כל מודל `gpt-5*` של
  החיבור), ועבור ספקים אחרים `getQuotaScopedModelForProvider()`.
- `404` נועל את המודל החשוף (`getModelLockKey()` מצמצם את `not_found`).
- כל סטטוס אחר — כשלי תעבורה/שרת מסוג `5xx` וכן ה־`502` המסונתז של OmniRoute
  עצמו מוולידציית איכות — נועל רק את שלישיית ה־provider/connection/model
  **המדויקת** בלבד. סטרים פגום במודל אחד אינו ראיה לגבי מכסת החשבון;
  לפני כלל זה, תגובה ריקה אחת ב־`codex/gpt-5.6-luna` הסירה כל מודל
  `gpt-5*` של אותו חיבור מהניתוב למשך 2–30 דקות (בהסלמה) בעוד שהמכסה
  שלו לא נפגעה כלל.
- אפשרות `scope` מפורשת מהקורא תמיד גוברת (Antigravity מעביר `"exact"`).

**מטרה:** להימנע מהשבתת חיבור שלם כאשר רק מודל אחד אינו זמין או מוגבל במכסה.

**דוגמאות:**

- ספקים עם מכסה פר־מודל שמחזירים 429
- ספקים מקומיים שמחזירים 404 עבור מודל חסר אחד
- כשלי הרשאת מצב/מודל ייחודיים לספק (למשל, מצבי Grok)

**יישום:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### לוח המחוונים Model Cooldowns ‏(v3.8.0)

ממשק משתמש: הגדרות → Model Cooldowns ‏(`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

מציג נעילות פעילות עם: provider, connection, model, reason, expiresAt. מפעילים יכולים להפעיל מחדש מודל באופן ידני מהכרטיס.

**REST API:**

- `GET /api/resilience/model-cooldowns` — רשימת נעילות פעילות
- `DELETE /api/resilience/model-cooldowns` — הפעלה מחדש ידנית. גוף: `{provider, connection, model}`. אימות: management.

### מנהל הצינון (Cooldown Manager)

ממשק משתמש: ניטור → Cooldown Manager ‏(`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

עמוד אחד עבור כל חיבור שנמצא מחוץ לניתוב מסיבה חולפת, במקום
לפתוח כל עמוד ספק בנפרד. הוא מציג צינוני חיבור, נעילות מודל ומצבים
סופניים (terminal), מנקה אותם פר חיבור, עבור קבוצה נבחרת, או עבור כל החיבורים של ספק,
ועורך את כללי הצינון המכווננים בתדירות הגבוהה ביותר: `streamStallCooldown.enabled` ואת
משך הצינון הבסיסי וצעדי ה־backoff המרביים של `connectionCooldown` עבור OAuth / API-key
(נשמרים דרך `PATCH /api/resilience`). מצבים סופניים (`banned`, `expired`, `credits_exhausted`)
מוצגים אך לעולם אינם מנוקים כאן.

**REST API** ‏(`src/lib/resilience/cooldownManager.ts`, אימות: management):

- `GET /api/resilience/cooldowns[?provider=]` — חיבורים עם סטטוס, צינון נותר,
  רמת backoff, סוג השגיאה האחרון ונעילות מודל (ללא credentials)
- `POST /api/resilience/cooldowns` — גוף `{connectionIds: string[]}` או
  `{all: true, provider?}`; מחזיר `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### ממשק הגדרות נעילה + שחזור בדעיכת הצלחות (success-decay) ‏(v3.8.23)

נעילת מודל עברה מהתנהגות קשיחה הפעילה תמיד לתכונה הניתנת לקונפיגורציה מלאה,
מבוססת opt-in, עם כרטיס הגדרות משלה ונתיב שחזור המרפא את עצמו.

**כרטיס הגדרות:** הגדרות → Model Lockout
‏(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
זהו כרטיס **נפרד** מ־`ModelCooldownsCard` שלעיל (שהוא לקריאה בלבד ורק
_מציג_ נעילות פעילות) — הכרטיס החדש _מקונפג את הפרמטרים_. ברירות המחדל
נמצאות ב־`DEFAULT_MODEL_LOCKOUT_SETTINGS`
‏(`src/lib/resilience/modelLockoutSettings.ts`):

| הגדרה                   | ברירת מחדל                       | משמעות                                           |
| ----------------------- | -------------------------------- | ------------------------------------------------ |
| `enabled`               | `false`                          | מתג ראשי — נעילת מודל **כבויה כברירת מחדל**.     |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | סטטוסי upstream הנספרים ככשל ברמת מודל.          |
| `baseCooldownMs`        | `120_000` (120 שניות)            | משך הנעילה ההתחלתי עבור הכשל הראשון.             |
| `maxCooldownMs`         | `1_800_000` (30 דקות)            | תקרה על הצינון המסלים.                           |
| `maxBackoffSteps`       | `10`                             | מספר מרבי של צעדי הסלמה ב־backoff מעריכי.        |
| `useExponentialBackoff` | `true`                           | האם כשלים חוזרים מסלימים את הצינון באופן מעריכי. |

ההגדרות נשמרות דרך מחסן ההגדרות הרגיל ועוברות ולידציה דרך
סכמת הגדרות ה־resilience; הכרטיס מגביל (clamps) את `baseCooldownMs`/`maxCooldownMs`
(כאשר `maxCooldownMs ≥ baseCooldownMs`) ואת `maxBackoffSteps`.

**שחזור בדעיכת הצלחות (success-decay):** השחזור **אינו** רק תפוגת טיימר. תגובה
תקינה מורידה את מונה הכשלים של המודל כך שמודל שהתאושש
באמצע החלון מפסיק להסלים (ومتנקה) לפני שהטיימר שלו היה פג. בעת יעד combo
מוצלח, `open-sse/services/combo.ts` קורא ל־`decayModelFailureCount()`
‏(`open-sse/services/accountFallback.ts`), אשר **מחצה** את ה־`failureCount`
השמור (`Math.floor(failureCount / 2)`); כאשר הוא מגיע ל־`0` רשומת הנעילה
נמחקת לחלוטין. המקבילה `recordModelLockoutFailure()`
מגדילה את המונה (ומסלימה את הצינון) בכשלים בתוך
חלון ההסלמה. דעיכת הצלחות זו היא בנוסף לתפוגת טיימר רגילה —
כל אחד משני הנתיבים יכול להפעיל מחדש מודל.

**מצב (State):** הנעילות מוחזקות **בזיכרון** (`Map`s פר־תהליך של
`ModelLockoutEntry` עם מפתח `provider:connectionId:model`, ונעילות בתחום מדויק עם מפתח
`provider:connectionId:exact:model`), ואינן נשמרות ב־
DB — הן אובדות בהפעלה מחדש. ה_הגדרות_ נשמרות; _מצב_
הנעילה הפעיל הוא חולף.

---

## 4. בקרת מקביליות של שיתוף מכסה (v3.8.36)

חשבונות מנוי (GLM, MiniMax וכו') מקבלים לרוב רק ~1–3 בקשות מקבילות; חריגה מכך מפעילה 429 ותקופות צינון. הבעיה חריפה במיוחד תחת קומבואים של **שיתוף מכסה** (`qtSd/…`), שבהם מספר מפתחות API חולקים חשבון upstream אחד. שלוש שכבות מונעות הצפה של חשבון משותף.

### מגבלת מקביליות לכל חיבור (`max_concurrent`)

כל חיבור ספק יכול להצהיר על תקרת `max_concurrent` (`provider_connections.max_concurrent`, נקבע ב-modal החיבור / API / DB). השאירו ריק כדי לא להחיל מגבלה. זהו הכפתור היחיד שמפעיל את שכבת הסריאליזציה שלהלן — כוונו אותו למקביליות האמיתית של החשבון (למשל GLM ~1, MiniMax ~2).

### מגבלות מקביליות לכל מודל (`modelConcurrency`)

חיבור יכול להצהיר בנוסף על תקרות מקביליות מדויקות לכל מודל בתוך מפת ה-`rateLimitOverrides` שלו:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

קבעו זאת ב-modal החיבור (**Rate limit overrides → Per-model concurrency caps**, שורה אחת של `model=cap` לכל מודל) או דרך `PATCH /api/providers/[id]` עם אותו מבנה JSON. סמנטיקה מרכזית:

- **רמת חיבור לעומת רמת מודל:** `maxConcurrent` נשאר התקרה המשותפת ברמת החיבור. כאשר שניהם חלים, שני השערים נרכשים אטומית באותו שער מרוכב (`global → provider → account → model`); ההתנהגות האפקטיבית היא המגבלה המחמירה מבין החלות.
- **התאמה מדויקת של מפתח המודל:** המפתח הוא מחרוזת המודל שנמסרת ל-executor לאחר פתרון הניתוב — בדרך כלל מזהה מודל ה-upstream החשוף (`glm-5`), ולא כינוי `provider/model` בצד הלקוח (`zai/glm-5` אינו תואם ל-`glm-5`). הערכים הם תקרות של מספר בקשות מקבילות כמספר שלם חיובי.
- **תור מקומי, ללא גילוי:** בקשות עודפות נכנסות לתור מקומי עם סמנטיקת התור/פסק הזמן הקיימת (שגיאות קבלה מוקלדות `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute אינו מגלה או מסיק מדיניות upstream — הוא אוכף בדיוק את התקרות שהמפעיל הגדיר. שער מודל רווי לעולם אינו משבית את הספק ולעולם אינו יוצר נעילה קבועה של המודל; התנהגות 429/צינון/fallback של ה-upstream נשארת גב הגיבוי לשגיאות.
- **היקף לכל חיבור ולכל תהליך:** המגבלות הן לכל חיבור למסד נתונים ונשמרות בזיכרון, כך ששני חיבורים המשתמשים באותו מפתח API של upstream אינם מתאמים ביניהם.
- **ללא הגדרה פירושו ללא שינוי:** השמטת המפה (או השארת שדה בלוח הבקרה ריק) אינה מוסיפה שער מודל. דוגמת תצורה מבלי לקבוע מגבלת ספק אוניברסלית:

```text
glm-5=1
glm-4.7=3
```

### סריאליזציית בקשות בשיתוף מכסה

כאשר שיגור בשיתוף מכסה מכוון לחיבור שמצהיר על `max_concurrent` חיובי, בקשות מקבילות לאותו **חשבון** עוברות סריאליזציה דרך סמפור לכל חיבור (מפתח `qsconn:<connectionId>`): בקשות עודפות **ממתינות בתור** במקום להציף את החשבון. הוא **fail-open** — תור רווי או פסק זמן ממשיכים ללא משבצת במקום לדחות אי-פעם בקשה ששיגורה אפשרי. ניתן להפעיל/לכבות ב-**Settings → Resilience → Quota-share per-connection concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ברירת מחדל: פעיל). ללא מגבלת `max_concurrent` ההתנהגות אינה משתנה.

> שער הניתוב של שיתוף המכסה (`selectQuotaShareTarget`, DRR + P2C) הוא בעצמו fail-open ורק _מנמיך עדיפות_ של חיבור שנמצא בתקרה — עם מאגר בעל חיבור יחיד הוא אינו יכול להגביל בכוח, ולכן הסמפור הזה הוא שלמעשה מכיל את ההצפה.

### ניסיון חוזר מודע לצינון בקומבו

עבור כל אסטרטגיית קומבו (כאשר היא מופעלת), בקשה שהייתה מקבעת 429 בגלל צינון חולף SHORT ממתינה לו ומשוגרת מחדש במקום להחזיר את ה-429 — זה מכסה חלונות TPM/RPM מסוג Gemini (retry-after של ~60 שניות) בקומבואים רב-מודליים, למשל כאשר שני היעדים של קומבו דו-מודלי נתקלים במגבלת קצב לכל מודל. מוגבל על ידי `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ב-**Settings → Resilience**. הוא לעולם אינו ממתין על `quota_exhausted` (נעול עד חצות) או על סיבות אימות/לא-נמצא.

אותו שער מכסה גם את המקרה שלפני השיגור (#16319): כאשר כל יעד של קומבו מדולג לפני שנעשתה בקשה כלשהי מפני שהמודל שלו נמצא בנעילה חולפת קצרה, המסלול של אפס ניסיונות ממתין לנעילה תחת אותן תקרות ומשגר מחדש, במקום להשיב `503 ALL_TARGETS_SKIPPED` בלי רמז. כאשר אין אפשרות להמתין (תקרה, ניצול מקסימלי של ניסיונות או תקציב, או שהתכונה כבויה), התגובה הסופית משתדרגת ל-`429 rate_limit_error` הנושאת `retry_after` / `reset_at` מפקיעת הנעילה החולפת המוקדמת ביותר; נעילות מכסה, אימות ולא-נמצא נשארות עם 503 בלי רמז.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. בקרת קבלה לתור הבקשות (v3.8.49 · issue #6593)

**היקף**: תור הגבלת הקצב המקומי לכל צמד ספק+חיבור (`open-sse/services/rateLimitManager.ts`, המבוסס על Bottleneck), שכבה אחת מתחת לשלושת המנגנונים שתוארו לעיל.

**`maxWaitMs` תוחם את ההמתנה בתור; `executionMaxWaitMs` תוחם את הביצוע.**
השניים מופרדים בכוונה, ואף אחד מהם אינו מזין את השני.

`resilienceSettings.requestQueue.maxWaitMs` הוא **תקציב ההמתנה בתור**: הוא מכסה המתנה לחריץ פנוי אצל הספק ולאחר מכן שהייה במצב QUEUED, והטיימר שלו מתנקה ברגע שהמשימה יוצאת מ-QUEUED ומתחילה להתבצע (`rateLimitManager.ts`, `wrappedFn`). בקשה שחורגת ממנו לעולם אינה מגיעה ל-upstream. ברירת המחדל היא 30000ms, מסופקת על ידי `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` ב-`src/lib/resilience/settings.ts` ונעוצה על ידי `tests/unit/ratelimit-admission-control-6593.test.ts`, כך ששינוי שלה הופך את הטסט ההוא לאדום במקום להשאיר את הפסקה הזו מיושנת בשקט.

`resilienceSettings.requestQueue.executionMaxWaitMs` הוא מה ש-Bottleneck מקבל בתור ה-`expiration` של המשימה, שהטיימר שלו מתחיל רק לאחר השיגור (dispatch). הוא רשת ביטחון עבור executors שאין להם timeout משלהם מול ה-upstream, והוא מועלה ל-timeout של תחילת ה-fetch של ה-executor עצמו כאשר זה ארוך יותר, כך שהוא אינו יכול לקטוע תגובה תקינה שכבר בתעופה. ברירת מחדל 600000ms (10 דקות).

הזנת תקציב התור לתוך `expiration` היא מה שנהג לקטול שערים (gateways) לא-אינקרמנטליים באמצע הטיסה — הם רצים באופן לגיטימי במשך דקות לפני הבתים הראשונים — וזו הסיבה ש-expiration מוצג כ-`code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) בעוד שתקציב התור נושא את קוד ה-timeout של התור. ניתן לדרוס כל אחד מהם דרך `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (משתני סביבה) או דרך לוח הבקרה (**Settings → Resilience**). שניהם מוגבלים (clamped) לטווח 1ms–24h בעת הנרמול.

**קדימות, עבור שניהם:** משתנה הסביבה מספק רק את _ברירת המחדל_. ערך שנשמר ב-`resilienceSettings.requestQueue` (לוח בקרה / API patch, מאוחסן ב-`key_value`) גובר עליו, ו-`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ברמת חיבור בודד גובר על אותו ערך. לכן, הגדרת משתנה הסביבה בפריסה (deployment) שכבר קיים בה ערך שמור אינה משנה דבר — יש במקום זאת לנקות או לעדכן את ההגדרה השמורה.

השהייה בתור תחומה על ידי `maxWaitMs`; `maxQueueDepth` שלמטה תוחם כמה מתקשרים רשאים להיות בתור בו-זמנית.

**ניסיונות חוזרים המצוינים בגוף התגובה: pacing מול lockout.** גוף של 429 יכול לציין זמן המתנה משלו (`RetryInfo.retryDelay` של Gemini, טקסט "retry after Ns"), ש-`updateFromResponseBody` קורא. המתנה שמתאימה ל-`maxWaitMs` של החיבור היא pacing: המגביל מרוקן את המאגר שלו לאותו פרק זמן וקריאות בתור משוגרות כשהוא מתמלא מחדש. המתנה ארוכה מ-`maxWaitMs` אינה משהו שהתור יכול להמתין לו — Gemini משיב על מכסה יומית מוצתה עם `retryDelay: "86399s"`. ה-`Retry-After` המועבר שמצורף ל-429 המשוחזר (#16528) כבר גורם למנוע ה-fallback לנעול את המודל לאותו חלון, אך השהיית המגביל גם בשבילו עדיין תעכב כל קריאה שמגיעה למפתח מוקדם (לאחר איפוס resilience, למשל) למשך כל ה-`maxWaitMs`. כאשר המתנה כזו מגיעה מפרט Google `RetryInfo` מוקלד (מקור ה-`google_rpc_retry_info`) והמגביל של המפתח כבר מוקף (scoped) למודל (ראו `getLimiterKey`), ה-429 הופך במקום זאת לנעילת מודל על אותו חיבור (`lockModelForLongBodyRetry` ב-`open-sse/services/rateLimitManager/bodyRetryPause.ts`, מוגבל ל-24h), והמגביל נותר לא מושהה. בחירת החשבון מדלגת על הנעילה הזו דרך `isModelLocked()`, וכך גם שער ה-pre-dispatch של ה-combo עבור יעדים המוצמדים לחיבור. ב-antigravity, שהמגביל שלו הוא per quota family, הנעילה היא על המודל המדויק, כמו שאר נעילות המכסה שלו. השם שהלקוח ביקש ננעל גם כן כאשר alias זיהה אותו כאותו מודל, מכיוון שהבדיקות האלה משתמשות בשם המבוקש; הוא ננעל בדיוק (`lockExactModel`), כך ש-alias שחוצה משפחת מכסות של antigravity או scope של codex לעולם אינו נועל את שלו. רמז פרוזאי, `retryDelay` לא מוקלד, או מגביל המשותף לכל החיבור — משאירים את ההשהייה. כאשר המגביל שמסלול ה-429 בנה מחדש אכן מושהה, מתקשר שזמן התור הנותר שלו מסתיים לפני שההשהייה מסתיימת נדחה מיד עם קוד ה-timeout של התור (`checkLimiterPause`) במקום להמתין לסיום אותו זמן; הסוף המתועד מעוגן לפני שהמגביל נבנה, בנקודה שבה Bottleneck מתחיל את שעון הרענון שלו, וכל שינוי מאוחר יותר במאגר שוכח אותו. מכוסה על ידי `tests/unit/rate-limit-long-body-retry-lockout.test.ts` ו-`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — תקרת קבלה מסוג opt-in (חדש).** `resilienceSettings.requestQueue.maxQueueDepth` תוחם כמה בקשות רשאות לשבת בתור (עדיין לא משוגרות) עבור צמד ספק+חיבור אחד בו-זמנית. כאשר התור כבר מכיל `maxQueueDepth` בקשות, בקשה חדשה נדחית במהירות עם שגיאה מוקלדת `code: "RATE_LIMIT_QUEUE_FULL"` **לפני** שהיא בכלל מגיעה ל-`limiter.schedule()` — כך שהדחייה זולה ומתרחשת לפני כל עבודת דחיסת-פרומפט / תרגום במורד הזרם עבור אותה בקשה. ברירת מחדל `0` = מושבת, מה שמשמר את התנהגות התור הבלתי-מוגבל הקיימת; תחום ל-0–100000. דריסה דרך `RATE_LIMIT_MAX_QUEUE_DEPTH` (משתנה סביבה) או `resilienceSettings.requestQueue.maxQueueDepth` (לוח בקרה / API patch).

בדיקת הקבלה עצמה היא פונקציה טהורה (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) כך שניתן לבדוק אותה בטסטי יחידה ללא מגביל Bottleneck אמיתי.

> ה-RFC שפתח את #6593 הציע גם דגל `bypassCompressionOnRateLimit`.
> צנרת ה-`open-sse/services/compression/` בריפו זה היא דחיסת
> prompt/context על בקשת ה-LLM היוצאת (`chatCore.ts`, סביב בלוק
> ה-`resolveCompressionSettings`/`selectCompressionStrategy`), ולא דחיסת תגובות
> HTTP על גופי 429 מסונתזים — אין נתיב קוד תואם לדגל bypass מילולי. שלב
> דחיסת ה-prompt הזה גם רץ כיום _לפני_ `withRateLimit()` בצנרת הבקשות,
> ולכן שינוי הסדר כדי לדלג עליו בעת דחייה של תור מלא הוא שינוי נפרד וגדול
> יותר מהיקף הבעיה הזו; הוא בכוונה **לא** יושם כאן ונשאר כ-follow-up אם
> החיסכון ב-CPU שווה את הסיכון הכרוך בשינוי הסדר.

### רשת הביטחון להפעלה אוטומטית של Rate-Limit והגנת חיבורים (`rateLimitProtection`)

**רשת ביטחון להפעלה אוטומטית** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ברירת מחדל `true`):
כברירת מחדל, OmniRoute מפעיל אוטומטית הגנת תור rate-limit עבור כל חיבורי הספקים הפעילים מסוג API-key (`getProviderCategory(provider) === "apikey"`). זה מבטיח שבקשות נכנסות למפתחות API רגישי-rate ב-upstream יעברו תור וויסות דרך Bottleneck במקום להתפרץ לשגיאות 429 של upstream. ניתן לעקוף את רשת הביטחון באמצעות משתנה הסביבה `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` מכבה, `true`/`1`/`on` מכריח הפעלה), שגובר על ההגדרה השמורה בדשבורד (**הגדרות → שרידות** / `PATCH /api/resilience`).

**סמנטיקה של `rateLimitProtection` לכל חיבור:**
הגנת rate-limit לכל חיבור נעקבת דרך שדה הבוליאני `rateLimitProtection` בחיבורי הספקים (נשמר כ-`rate_limit_protection` ב-SQLite):

- **הפעלה מפורשת (`rateLimitProtection === true`)**: הגנת rate-limit מופעלת במפורש עבור חיבור זה, ללא קשר לקטגוריית הספק או לשאלה אם רשת הביטחון של ההפעלה האוטומטית דולקת.
- **כיבוי מפורש (`rateLimitProtection === false`)**: מכבה הגנה מפורשת, אבל **לא** מוציא חיבור API-key פעיל מרשת הביטחון הגלובלית של ההפעלה האוטומטית. ב-`reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` ו-`undefined` שקולים: רק `rateLimitProtection === true` נחשב לעקיפה מפורשת. אם `rateLimitProtection` הוא `false` (או לא מוגדר), חיבור API-key פעיל עדיין מתאים לתנאי ההפעלה האוטומטית ונשאר מוגן מ-rate-limit.
- **אין opt-out לכל חיבור**: מפעיל לא יכול כיום לבטא "חיבור API-key פעיל בודד זה חייב לרוץ ללא הגנת תור rate-limit" תוך שמירה על ההפעלה האוטומטית פעילה עבור האחרים. כדי להריץ חיבורי API-key ללא תורי rate-limit כלל, יש לכבות את רשת הביטחון גלובלית (`RATE_LIMIT_AUTO_ENABLE=false` או `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**נתיבי כתיבה נתמכים:**

- **`POST /api/rate-limits`**: נתיב הכתיבה הניהולי הנתמך להחלפת מצב `rateLimitProtection` עבור חיבור (`{ connectionId: string, enabled: boolean }`). קריאה עם `enabled: true` מפעילה הגנה מפורשת; קריאה עם `enabled: false` מסירה הגנה מפורשת (אם כי חיבורי API-key פעילים נשארים מכוסים תחת רשת הביטחון הגלובלית אם ההפעלה האוטומטית דולקת).
- **`PUT /api/providers/[id]`**: בכוונה **לא** מקבל או מחליף את `rateLimitProtection` (#11278). עדכון מטא-דאטה של חיבור ספק דרך `PUT /api/providers/[id]` לעולם לא ישנה את מצב הגנת ה-rate-limit השמור.

---

## 6. שומר סף לתפוקת זרם איטי (#9709)

מנגנון ההגנה האופציונלי `resilienceSettings.streamRecovery.throughputWatchdog` מזהה
upstream שעדיין שולח chunks אך מפיק פלט assistant בקצב הנמוך
משיעור הפלט השימושי המוגדר. הוא נבדל במכוון מה-idle timeout:
פעימות לב ומטא-נתונים אינם מאפסים אף אחד מהטיימרים ואינם נחשבים להתקדמות. הוא גם
נבדל ממועד האחרון הקשיח של הניסיון (#9153), שנשאר תקרת בטיחות
מוחלטת ללא תלות באיכות הפלט.

שומר הסף דורש תקופת חימום (warm-up) ולאחריה חלון מתגלגל (rolling window) שלם לפני
שהוא יכול לבטל. הוא סופר דלתאות טקסט מאירועי פלט של Chat Completions ו-Responses API
(פרוקסי שמרני של בתים ב-UTF-8), מתעלם מאירועי usage בלבד ומאירועים ריקים,
ומשעה את השיפוט בזמן שאירועי tool-call או reasoning נמצאים באוויר. הוא מושבת
כברירת מחדל וניתן להפעלה עם `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; החלון,
החימום, הקצב המינימלי והפלט המינימלי הניתן למדידה מוגבלים על ידי שכבת
נרמול הגדרות ה-resilience הרגילה.

כאשר הוא מופעל, ביטול על ידי שומר הסף מוחל רק על ניסיון ה-upstream הפעיל. לפני
שנשלחו בתים גלויים ללקוח, מסלול השחזור המוקדם הקיים לאותו חשבון עשוי לפתוח מחדש
את הניסיון. לאחר ה-commit, הזרם לעולם אינו משוחזר באופן עיוור; רק חוזה ההמשכה
הבטוח הקיים באמצע הזרם יכול לחבר סיומת. ה-Finalization נשאר חד-פעמי, כך
שחשבונאות ה-usage ושחרור ה-semaphore אינם משוכפלים.

---

## 7. ניסוח מחדש של סטטוס Upstream (שגיאות מכסה המדווחות בסטטוס שגוי)

**תחום:** שער upstream יחיד שמדווח על מיצוי מכסה זמני עם סטטוס HTTP שגוי.

**מטרה:** לתקן סטטוס מטעה **לפני** הסיווג, כך שצרכני ה-downstream (מנוע ה-fallback, אגרגציית ה-combo, התגובה הפונה ללקוח) יראו את האופי האמיתי של הכשל כניתן לניסיון חוזר.

חלק מהשערים מאותתים על מיצוי מכסה **זמני** עם סטטוס HTTP שאינו ניתן
לניסיון חוזר. `agentrouter.org` מחזיר `403` (לפעמים `400`) עם גוף תגובה
בסינית (`用户额度不足` / `额度不足`) במקום ה-`429` הסטנדרטי. לקוחות כמו
Claude Code מתייחסים ל-`403` כאל שגיאה קבועה ומפסיקים את הסשן, וללא
התיקון מנוע ה-fallback היה מסווג אותה כ-`AUTH_ERROR` במקום כאירוע מכסה.

**מימוש:**

- מרשם (registry) + matcher: `open-sse/config/upstreamStatusRestatement.ts` —
  רשימת כללים פר-ספק (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`),
  שההתאמה שלה מתבצעת באמצעות `applyStatusRestatement()`.
- נקודת הקריאה: הבלוק `providerFailure:` ב-`open-sse/handlers/chatCore.ts`
  (בסביבות שורה 3654), מיד לאחר ש-`parseUpstreamError()` מנתח תגובת
  upstream עם סטטוס HTTP של שגיאה (`!providerResponse.ok`), ולפני שרץ כל
  סיווג, כך שכל צרכן downstream רואה את הסטטוס המתוקן. שגיאות המוטמעות
  בתוך זרם SSE של `200` עוברות בנתיב פרסור-זרם נפרד ומאוחר יותר, ו**אינן**
  מכוסות על ידי ה-hook הזה כיום — מגבלה ידועה, שעדיין לא נדרשת עבור
  הסטטוס השגוי של agentrouter (שצץ כסטטוס HTTP של שגיאה).
- זכאות לניסיון חוזר: `429` נמצא ב-`RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), כך ששגיאה שעברה
  ניסוח מחדש נושאת חלון ניסיון חוזר אמיתי במקום לצוץ כ-`403` מת.
- ה-`defaultRetryAfterMs` הסינתטי של `60s` (`upstreamStatusRestatement.ts`)
  הוא רק מה שהתגובה המנוסחת מחדש אומרת ל**לקוח**; הוא אינו בעצמו משך
  ה-cooldown/lockout הפנימי של החיבור — זה נקבע בנפרד על ידי המנגנון
  שמטפל בפועל בשגיאה המנוסחת מחדש (ה-backoff המסלים של Connection
  Cooldown, §2, בסיס `3s` עבור ספקי API-key; או Model Lockout, §3, עבור
  ספקי מכסה-פר-מודל כמו agentrouter). הראוטר יכול להפוך זכאי לניסיון
  חוזר באופן פנימי מוקדם יותר מחלון ה-60s שהוא מפרסם ללקוח — מרווח
  מכוון, לא באג.

שגיאות קבועות (`无权访问模型` של agentrouter — אין גישה למודל זה) **אף פעם
לא** מנוסחות מחדש: `excludeMarkers` מטיל וטו על הכלל גם כאשר `textMarkers`
מותאמים, כך שהשגיאה שומרת על הסטטוס המקורי שלה ושום דבר לא מנסה אותה שוב
לנצח. כלל סיווג הספק התואם (`agentrouter-model-access-denied`
ב-`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`,
`scope: "model"`, cooldown בסיס מוצהר של `6h`) נשאל על ידי
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _לפני_
ה-early-return הגנרי `FORBIDDEN` של קטגוריית apikey, מותנה
ב-`honorsRuleLockScope(provider)` (#10334 — כרגע בלעדי ל-agentrouter דרך
רשימת ההיתרים `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
ב-`providerErrorRules.ts`). ה-cooldown המוצהר של 6h של הכלל זורם הלאה
כ-`fallbackResult.baseCooldownMs`, אבל הוא עדיין מוזן לנתיב ה-lockout
הקיים של מכסה-פר-מודל (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ללא שינוי על ידי #10334 פרט למקור
ה-cooldown): הוא נחתך כלפי מטה ל-`mlSettings.maxCooldownMs` של המפעיל
(ברירת מחדל `1_800_000ms` / 30 דקות), כמו כל model lockout אחר, ו_סיבת
ה-lockout השמורה_ נשארת ה-hardcoded הקיים `"forbidden"`, ולא ה-`"auth_error"`
של הכלל — רק משך ה-cooldown נכבד מקצה לקצה, לא מחרוזת הסיבה. החיבור עצמו
נשאר פעיל; מודלים אחים על אותו חיבור אינם מושפעים.

שגיאות מכסה מנוסחות מחדש (`额度不足`) מגיעות לכלל ספק בפרודקשן
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, ללא cooldown מוצהר משלו — חלה ברירת המחדל של
ה-backoff המדורג של שכבת ה-persistence). מאז #10334, ה-`scope` על
`ProviderErrorRuleMatch` **כן** נצרך מקצה לקצה, אבל **רק** עבור ספקים
ברשימת ההיתרים `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts`
— כיום רק `"agentrouter"`, מותנה דרך `honorsRuleLockScope()`). עבור כל
ספק אחר, `scope` נשאר אינפורמטיבי, בדיוק כמו לפני #10334.
`checkFallbackError` חושף את ה-scope של הכלל שהותאם כ-`fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) הוא
השומר (guard) המשותף שמאשר ש-`ruleScope` באמת בטוח לכיבוד כאות ברמת
החיבור כולו ובר-התאוששות עצמית (scope `"connection"`, reason
`quota_exhausted`, לעולם לא `permanent`, לעולם לא `creditsExhausted` —
הגנה מפני כלל עתידי שיזווג scope `"connection"` עם מצב חשבון קבוע). שני
צרכנים קוראים לו:

- **שמירה מתמשכת** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  במקום לעבור לענף הנעילה **לכל מודל** של ספק passthrough
  (‏agentrouter הוא `passthroughModels: true` ← ‏`hasPerModelQuota()`
  מחזיר `true`), מוחלת **תקופת צינון זמנית של החיבור** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ולעולם לא סטטוס סופי
  (`credits_exhausted`/`banned`/`expired`) — כך שהחיבור מתאושש מעצמו
  לאחר שתקופת הצינון חולפת, במקום לדרוש איפוס ידני של פרטי ההזדהות.
  הפעולה מדולגת עבור חיבורים עם `disableCooling: true` (#2997): ביטול זה
  מוביל במקום זאת לענף הנעילה לכל מודל (פשרה מתועדת —
  ראו את הערת הקוד שמעל לענף).
- **ניתוב קומבו בתוך אותה בקשה** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): אותו guard מסמן את
  החיבור בתוך קבוצת `exhaustedConnections` שבזיכרון, לפי המפתח
  `${provider}:${connectionId}`. הדבר מדלג רק על יעד שנותר באותה בקשה
  ושכבר _מכיל בעצמו בדיוק את אותו `connectionId`_ באובייקט היעד שלו
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` לפני החיפוש ב-`exhaustedConnections`) — קומבו רגיל של
  רשימת מודלים, שבו יעדים מקבילים אינם מכילים `connectionId` מוצמד
  משלהם והוא נפתר רק בכל dispatch מכותרת
  `X-OmniRoute-Selected-Connection-Id` של התגובה, לעולם אינו תואם למפתח
  הזה. במקרה הנפוץ הזה, ההגנה האמיתית מפני שימוש חוזר של שלב שנותר
  בחשבון שזה עתה מוצה אינה ה-Set הזה — אלא שכבת השמירה המתמשכת שלעיל
  (ה-`rateLimitedUntil` של החיבור נמצא כעת בעתיד), בשילוב עם דיכוי
  `transientRateLimitedProviders` עבור הכשל על ידי אותו guard
  (ראו "תכנון דו-שלבי" ואת הערת הקוד בענף
  `isAgentrouterConnectionQuotaScope` ב-`targetExhaustion.ts`): כאשר
  ה-Set הזה אינו מסומן, ההתרה הכפויה `allowRateLimitedConnection` של
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) אינה
  מופעלת עבור השלבים הנותרים של הספק, ולכן מסנן `rateLimitedUntil` של
  בחירת פרטי ההזדהות (`src/sse/services/auth.ts:1238`) מכובד כרגיל,
  ושלב שנותר בוחר חיבור agentrouter אחר שעדיין כשיר או נכשל משום שאין
  פרטי הזדהות זמינים — הוא אינו כופה את דרכו חזרה אל החיבור שהענף הזה
  הכניס זה עתה לתקופת צינון.

### תכנון דו-שלבי: ניסוח מחדש של הסטטוס, ולאחר מכן סיווג

ניסוח מחדש של הסטטוס (`upstreamStatusRestatement.ts`) וכללי סיווג הספקים
(`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) הם מאגרים נפרדים ששניהם מבוססים על מזהה הספק
ועל סמני טקסט, אך הם פועלים במקומות שונים ומשרתים מטרות שונות: הניסוח
מחדש משכתב את סטטוס ה-HTTP בשלב מוקדם ב-`chatCore.ts`; כללי הסיווג
בוחרים את ערך ה-`reason` החלופי ואת `scope` הנעילה
(`model` / `provider` / `connection`) בתוך `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

כללי הסיווג רואים את **טקסט** השגיאה המלא (הדרוש להתאמת סמנים בגוף
כמו `额度不足`) רק עבור ספקים המופיעים ברשימת ההיתרים
`FULL_TEXT_RULE_PROVIDERS` שב-`providerErrorRules.ts` — כרגע רק
`"agentrouter"`. עבור כל ספק **קטלוג מובנה** אחר, `checkFallbackError`
מעביר אל `getProviderErrorRuleMatch` רק את השגיאה המובנית (`{code, type}`),
המספיקה לכללים המבוססים על כותרת/סטטוס/קוד אך אינה יכולה לראות סמני
טקסט בגוף. פונקציית העזר `resolveRuleMatchBody()` מבצעת בחירה זו: טקסט
השגיאה המלא עבור ספקים שברשימת ההיתרים, והשגיאה המובנית בכל מקרה אחר.
הוספת ספק **מובנה** אל `FULL_TEXT_RULE_PROVIDERS` היא הצטרפות מפורשת
לכל ספק — היא קיימת כדי שמסלול ברירת המחדל של כל ספק שאינו ברשימה
יישאר ללא שינוי, בית אחר בית.

ה-`scope` של כלל (`model` / `provider` / `connection`) הוא הצטרפות נפרדת
מ-`FULL_TEXT_RULE_PROVIDERS`: ‏`checkFallbackError` רק חושף אותו בתור
`fallbackResult.ruleScope`, וצרכנים בהמשך התהליך מכבדים אותו כיותר
מתווית מידע רק עבור ספקים שברשימת ההיתרים
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` שבאותו קובץ (באמצעות
`honorsRuleLockScope()` — כיום רק `"agentrouter"`). ראו "שגיאות מכסה
שנוסחו מחדש" לעיל כדי להבין מה התאמה עם `scope: "connection"` עושה
בפועל לאחר שספק נוסף לרשימת ההיתרים הזו.

**#11104 — כללים שהוגדרו על ידי המפעיל עוקפים את שתי רשימות ההיתרים.**
מפעיל יכול להצהיר בזמן ריצה על כלל לכל ספק באמצעות
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
מבלי לערוך קובץ זה. הכפפת כלל של מפעיל ל-
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — רשימות
היתרים שנועדו להגן על התנהגות **ברירת המחדל** של כללי הקטלוג המובנים —
הייתה הופכת את מנגנון ההגדרות לחסר פעולה עבור כל ספק מלבד אלה שכבר
מופיעים שם, משום שעצם הצהרת הכלל היא כבר הצטרפות מפורשת מצד המפעיל.
`resolveRuleMatchBody()` ו-`honorsRuleLockScope()` בודקים תחילה את
`hasOperatorRuleForProvider()`: ספק עם כלל מפעיל מקבל את טקסט השגיאה
הגולמי, וה-`scope` שהוצהר עבורו מכובד, בין אם הוא מופיע גם באחת
מרשימות ההיתרים ובין אם לאו.

**פער ידוע — לעולם לא מתבצעת פנייה אל `providerRuleRegistry` עבור HTTP 400.**
ענף `BAD_REQUEST` של `checkFallbackError` מסווג סטטוס 400 במלואו
באמצעות מערכי התבניות שלו (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` וכו' ב-`accountFallback.ts`) ומחזיר תוצאה
לפני ההגעה לענף `configuredRule`/`getProviderErrorRuleMatch` שמעליו.
כלל קטלוג מובנה (או כלל מפעיל) עם `status: 400` תקין מבחינה תחבירית,
אך לעולם לא יופעל. כיום שום כלל קיים אינו מכוון ל-400, ולכן שום דבר
בסביבת הייצור אינו מושפע — אך כלל 400 עתידי יחייב קודם שינוי בענף זה,
וזהו שינוי גדול יותר מהוספת כלל (הוא מסווג מחדש את 400 עבור כל ספק
שכבר מסתמך על ההתנהגות המבוססת על מערכי התבניות), ולכן הוא מחוץ
לתחום של הוספת כלל לספק יחיד.

### הוספת gateway חדש שמצהיר על מצב quota באופן שגוי

1. רשמו מערך כללים אחד ב-`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). שמרו את `textMarkers`
   ספציפיים לספק; לעולם אל תעשו שימוש חוזר בביטויים גנריים באנגלית שמתנגשים עם
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. באופן אופציונלי, רשמו כללי סיווג ב-
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) כדי לבחור
   את היקף הנעילה הנכון (`connection` עבור quota ברמת-החשבון כולה, `model` עבור
   שגיאות ברמת-מודל בודד). שלב זה נכנס לתוקף בפרודקשן רק עבור
   ספקים שהכללים שלהם זקוקים לטקסט השגיאה המלא (סמני body): הוסיפו את
   מזהה הספק ל-`FULL_TEXT_RULE_PROVIDERS` באותו הקובץ — אחרת
   `checkFallbackError` מעביר לכלל תמיד רק את השגיאה המובנית
   `{code, type}` וכלל המבוסס על טקסט-body לעולם לא יתאים לתעבורה חיה.
   כללים המתאימים אך ורק על בסיס `status`/`headers` (כמו אלו של Opencode או
   של Minimax) אינם זקוקים ל-opt-in זה. בנפרד, אם הכלל מצהיר
   `scope: "connection"` והכוונה היא cooldown אמיתי ברמת-החיבור כולו
   בתוספת דילוג על combo באותה הבקשה (ולא רק תווית אינפורמטיבית), הוסיפו את
   מזהה הספק ל-`HONORS_RULE_LOCK_SCOPE_PROVIDERS` באותו הקובץ — זה מה
   ששולט בצריכה בסגנון `isAgentrouterConnectionQuotaScope()` בתוך
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ובתוך
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); בלעדיו, `scope`
   עדיין זורם דרך `fallbackResult.ruleScope` אך דבר לא פועל על פיו.
3. הוסיפו unit tests במתכונת של `tests/unit/upstream-status-restatement.test.ts`
   ושל `tests/unit/agentrouter-error-rules.test.ts` (כולל שומרי
   not-permanent / not-creditsExhausted, וגם — אם הספק זקוק לרשימת ההיתר —
   בדיקה המאמתת ש-`resolveRuleMatchBody()` מחזירה את הטקסט המלא רק עבור
   אותו הספק).

אין צורך בשינויים ב-`chatCore.ts`, ב-`classifyError` או ב-combo.

#### נעילה בדליי egress (#10880)

ספקים ב-`EGRESS_BUCKETED_LOCK_PROVIDERS` (משפחת opencode) מטופלים
כ-upstream מקובץ-IP (השכבה החינמית של opencode מקובצת-IP, ולא
מקובצת-חשבון — ראו #9611): status-429 שסווג כ-`quota_exhausted`
**או** `rate_limit_exceeded` מכניס ל-cooldown כל חיבור ממשפחה שברשימת
ההיתר שכתובת ה-egress IP האחרונה הידועה שלו תואמת לזו של החיבור שנכשל,
לפני שהרוטציה מספיקה לנסות אותם
— ובכך נחסכות N-1 קריאות upstream שמובטח שיכשלו (אותה צורה כמו #10460/#10525).
`rate_limit_exceeded` נכלל בכוונה: בנתיב `markAccountUnavailable`
הכללים הספציפיים ל-opencode לעולם אינם מתאימים (לא מועברים headers/body
ל-`checkFallbackError`, ו-opencode אינו ב-`FULL_TEXT_RULE_PROVIDERS`), ולכן 429
שה-body שלו נושא את טקסט ה-quota של המנוי ("monthly usage limit
reached") מסווג כ-`quota_exhausted` על ידי ה-fallback של טקסט-quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown של שעה) לפני
שבכלל מגיעים לכלל ה-`status_429` — בעוד ש-429 נטול טקסט-quota (rate
limiting רגיל) מסווג דרך כלל ה-`status_429` כ-`rate_limit_exceeded`
ועדיין מכניס את משפחת ה-IP ל-cooldown. עבור ספק שברשימת ההיתר, rate limit
מקובץ-IP הוא אותו סיגנל כמו quota מוצת. מגבלות בכנות:

- **מאמץ מרבי**: הנעילה מפענחת את ה-`egress_ip` הידוע האחרון של החיבור
  מתוך `proxy_logs` (חלון של 24 שעות, סינכרוני, ללא מטמון). מטמון קר
  (egress IP מעולם לא נחקר) או היעדר שורה ← החיבור הכושל עדיין מצונן על
  ידי הענף (נרשם כמו היום), רק שאף אח לא ננעל.
- **לעולם לא סופי**: הצינון הוא חלון מכסה מתחדש
  (`testStatus: "unavailable"`); מצב קבוע לעולם אינו נגזר מאות ברמת IP.
  חיבורי `disableCooling` מדלגים על הענף לחלוטין.
- **רמת הפירוט של הנעילה משתנה עבור המשפחה שברשימת ההיתרים**: זהו שינוי
  סקופ, לא רק אופטימיזציית אחים. opencode הוא ספק `passthroughModels`,
  ולכן לפני הענף הזה 429 יצר נעילה ברמת מודל (per-MODEL); כעת הוא מייצר
  צינון חיבור — כולל עבור מפעיל שמריץ חיבור יחיד ללא אח בכלל. זוהי רמת
  הפירוט שטבלת הכללים של opencode כבר מכריזה עליה כנכונה
  (`scope: "connection"`, `providerErrorRules.ts`), ומעולם לא כובדה עד
  כה מכיוון ש-opencode אינו נמצא ב-`HONORS_RULE_LOCK_SCOPE_PROVIDERS`.
  הענף כותב בעצמו את הצינון + `backoffLevel` של החיבור הכושל, בשיקוף של
  ענף agentrouter שבסקופ החיבור, וחוזר — הבלוק ברמת המודל והנתיב הגנרי
  שלמטה לעולם אינם מושגים.
- **קומבו נכלל**: כמו ענף agentrouter, הסקופ מתעלם בכוונה משדרוג-המטה של
  `persistUnavailableState`/`isCombo` שמתקשר מסוג קומבו מחיל על 429.
  נעילה ברמת מודל אינה צורה חלשה יותר של הסקופ הזה, היא היחידה השגויה:
  היא לא אומרת דבר על ה-IP המוצה, ולכן רוטציית הקומבו תמשיך לשרוף קריאה
  אחת עם כישלון מובטח לכל אח.
- **בטיחות אחים**: אח שכבר סופי (banned/credits_exhausted) או שכבר נמצא
  בצינון ארוך יותר לעולם אינו נדרס.
- **רשימת היתרים בלעדית**: הרחבת `EGRESS_BUCKETED_LOCK_PROVIDERS` היא
  החלטה מפורשת של הבעלים; אין חיווט גנרי (תבנית #10334/#10419). שאילתת
  האחים מקשרת את אותה רשימת היתרים במקום לחזור עליה כליטרל SQL, ולכן
  הרחבתה נשארת שינוי של שורה אחת.
- **רוטציית egress IP, בשני הכיוונים**: חלון החיפוש (24 שעות) רחב בהרבה
  מ-TTL של מטמון ה-egress IP (5 דקות), ולכן "ה-IP הידוע האחרון" הוא
  היסטוריה, לא מצב נוכחי. אם ה-proxy של חיבור ביצע רוטציה בתוך החלון,
  הנעילה עלולה **לפספס** IP משותף ממש (ה-IP הרשום הוא החדש,
  הבלתי-מוצה) — ובאופן סימטרי היא עלולה **לצנן אח שמאז ביצע רוטציה
  והתרחק** מה-IP המוצה. המקרה השני עולה לאותו אח חלון צינון אחד; שניהם
  מגבלות מקובלות של מאמץ-מרבי בחיפוש מבוסס-היסטוריה.
- **עלות**: שתי סריקות חסומות של `proxy_logs` (מסוננות לפי חלון דרך
  `idx_pl_timestamp`), רק בתדירות של 429. אין אינדקס חדש (מיגרציה 134
  YAGNI). נמדד על עותק DB של תעבורה אמיתית בגודל בינוני; מופע בתפוקה
  גבוהה מחזיק באופן יחסי יותר שורות באותו חלון.

---

## תכונות שרידות נוספות

- **21 אסטרטגיות ניתוב** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — ראו [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **ניתוב מודע-איפוס** (v3.8.0) — מתעדף חיבורים לפי זמן איפוס המכסה.
- **ירידת רמה של מצב רקע** — Responses API עם `background: true` מושבת למצב סינכרוני עם אזהרה.
- **זיהוי דינמי של מגבלת כלים** — מסתג מהספקים כשמגיעים למגבלות מספר הכלים.
- **מעבר גיבוי חירום** — נשלט על ידי `OMNIROUTE_EMERGENCY_FALLBACK`; מפעילים יכולים לעקוף אותו מדף דגלי התכונות (Feature Flags) ללא הפעלה מחדש.

---

## ניפוי שגיאות

- קומבו משוקלל (Weighted) משיב `503 all_targets_cooling_down` (`Retry-After` מוגדר, `diagnostics.excluded` מפרט כל יעד עם `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → המאגר מוגדר ומחובר, פשוט כל יעד מוחרג על ידי טיימר שרידות; האזהרה `[COMBO] Weighted selection: every target excluded before dispatch — …` מציינת את הסיבות ואת מספר השניות שנותרו. `404 no_executable_targets` מאותו קומבו פירושו שלא היה מעורב אף טיימר שרידות (אין מה להריץ, או שכל חשבון נכשל בבדיקת הזמינות). נבנה ב-`open-sse/services/combo/pinRecovery.ts` מתוך ההחרגות שנאספו ב-`targetResolution.ts`.
- כל המפתחות של ספק מדולגים → בדקו גם את מצב מפסק המעגל וגם את `rateLimitedUntil`/`testStatus` של כל חיבור.
- ספק מוחרג לצמיתות אחרי חלון האיפוס → קוד שקורא את `state` הגולמי במקום `getStatus()`/`canExecute()`.
- מפתח אחד נכשל, אחרים אמורים לעבוד → העדיפו צינון חיבור (connection cooldown) על פני מפסק מעגל.
- רק מודל אחד נכשל → העדיפו נעילת מודל על פני צינון חיבור.
- מצב שאמור להתאושש מעצמו אך אינו מתאושש → בדקו חותמת זמן עתידית + נתיב קריאה שמרענן מצב שפג תוקפו. סטטוסים קבועים דורשים שינויים ידניים.

---

## מצב זמן ריצה — עזר מהיר לסוכן

> הועבר מילה-במילה מ-`AGENTS.md` ← "Resilience Runtime State" (PR #12743) כדי שמדריך
> הסוכן יישאר מתחת לתקציב ההקשר של 40k. זוהי התצוגה המקוצרת הפונה לסוכן של
> הסעיפים שלמעלה; הסעיפים הממוספרים נותרים ההתייחסות המלאה.

ל-OmniRoute שלושה מנגנוני כשל-זמני קשורים אך נפרדים. שמרו על הפרדת ההיקפים שלהם
בעת ניפוי שגיאות של התנהגות הניתוב. ראו את
[דיאגרמת השרידות בת 3 השכבות](../diagrams/exported/resilience-3layers.svg)
(מקור: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
למפה במבט-על.

### מפסק מעגל ברמת ספק (Provider Circuit Breaker)

**היקף**: הספק כולו, למשל `glm`, `openai`, `anthropic`.

**מטרה**: להפסיק לשלוח תעבורה לספק שנכשל שוב ושוב ברמת ה-upstream/שירות,
כדי שספק לא תקין אחד לא יאט כל בקשה.

**יישום**:

- מחלקת ליבה: `src/shared/utils/circuitBreaker.ts`
- חיווט שער/הרצה של צ'אט: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API של סטטוס זמן ריצה: `src/app/api/monitoring/health/route.ts`
- עטיפות משותפות: `open-sse/services/accountFallback.ts`
- טבלת מצב נשמרת: `domain_circuit_breakers`

**מצבים** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: תעבורה רגילה מורשית.
- `DEGRADED`: רצועת אזהרה מוקדמת — הכשלים חצו את סף הירידה אך עדיין לא את
  סף מפסק המעגל; התעבורה עדיין זורמת, לוחות המחוונים מציגים את האזהרה. בדיקת
  חיבור תקינה או חלון שקט ללא כשל חדש מחזירים אותו ל-`CLOSED`
  (החלון מופיע ב-`docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: הספק חסום זמנית; הקוראים מקבלים תגובת provider-circuit-open
  או שניתוב הקומבו מדלג ליעד אחר.
- `HALF_OPEN`: חלף ה-timeout של האיפוס; מתאפשרת בקשת בדיקה (probe). הצלחה סוגרת
  את המפסק, כשל פותח אותו מחדש.

**ברירות מחדל** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, הנצרכים דרך
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` ב-`src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` ב-`src/sse/handlers/chatHelpers.ts`). מפסק המעגל של
הספק-כולו פועל על `circuitBreakerThreshold` / `circuitBreakerReset`:

| פרופיל  | ירידת רמה ב- | נפתח ב- (`circuitBreakerThreshold`) | איפוס (`circuitBreakerReset`) |
| ------- | -----------: | ----------------------------------: | ----------------------------: |
| OAuth   |          `5` |                                 `8` |                         `60s` |
| API key |          `7` |                                `12` |                         `30s` |
| Local   |       (נגזר) |                                 `2` |                         `15s` |

`PROVIDER_PROFILES` מגדיר גם את `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 דקות) ו-`providerCooldownMs` (5/10/1 דקות): אלה מפעילים את
**שער החלון של צינון הספק הגלובלי האופציונלי (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`,
כבוי כברירת מחדל) — רשומה ברמת ספק ב-`open-sse/services/providerCooldownTracker.ts`
נחשבת כצוננת רק אחרי `providerFailureThreshold` כשלים בתוך `providerFailureWindowMs`, ואז
צוננת למשך `providerCooldownMs`. אלה אינם הספים של מפסק המעגל הפעיל — אל תכווננו אותם
בציפייה להשפיע על התנהגות מפסק המעגל. כל ברירת מחדל ניתנת לעקיפה דרך משתני הסביבה
`OMNIROUTE_PROVIDER_BREAKER_*` ו-`OMNIROUTE_CIRCUIT_BREAKER_*`;
טבלת ההתייחסות המדויקת לזמן ריצה נמצאת ב-`docs/architecture/RESILIENCE_GUIDE.md`.

רק סטטוסי כשל ברמת ספק אמורים להפעיל את מפסק המעגל של הספק:

```ts
(408, 500, 502, 503, 504);
```

אל תפעילו את מפסק המעגל של הספק-כולו עבור שגיאות חשבון/מפתח/מודל רגילות כמו רוב
מקרי `401`, `403` או `429`. אלה בדרך כלל שייכים לצינון חיבור או לנעילת
מודל. `403` של ספק מפתח-API גנרי אמור להיות ניתן להתאוששות, אלא אם הוא מסווג
כשגיאת ספק/חשבון סופנית.

המפסק משתמש בשחזור עצל (lazy), לא בטיימר רקע. כאשר `OPEN` פג תוקף, קריאות כגון
`getStatus()`, `canExecute()`, ו-`getRetryAfterMs()` מרעננות את המצב ל-`HALF_OPEN`,
כך שלוחות מחוונים ובוני מועמדים לקומבו לא ממשיכים להחריג ספק שפג תוקפו לנצח.

### צינון חיבור (Connection Cooldown)

**היקף**: חיבור/חשבון/מפתח ספק אחד.

**מטרה**: לדלג זמנית על מפתח/חשבון בעייתי אחד, תוך מתן אפשרות לחיבורים אחרים של
אותו ספק להמשיך לשרת בקשות.

**יישום**:

- נתיב כתיבה/עדכון: `src/sse/services/auth.ts::markAccountUnavailable()`
- בחירה/סינון חשבונות: `src/sse/services/auth.ts::getProviderCredentials...`
- חישוב צינון: `open-sse/services/accountFallback.ts::checkFallbackError()`
- הגדרות: `src/lib/resilience/settings.ts`

שדות חשובים בחיבורי ספק:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

במהלך בחירת חשבון, מדלגים על חיבור כל עוד:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

גם הצינונים הם עצלים: כאשר `rateLimitedUntil` נמצא בעבר, החיבור הופך שוב לזכאי.
בשימוש מוצלח, `clearAccountError()` מנקה את `testStatus`, את `rateLimitedUntil`,
את שדות השגיאה ואת `backoffLevel`.

התנהגות ברירת המחדל של צינון חיבור:

- צינון בסיס של OAuth: `5s`.
- צינון בסיס של מפתח API: `3s`.
- `429` של מפתח API צריך להעדיף רמזי ניסיון חוזר מה-upstream (`Retry-After`,
  כותרות reset, או טקסט reset הניתן לניתוח) כשהם זמינים.
- כשלונות חוזרים הניתנים לשחזור משתמשים ב-backoff מעריכי:

```ts
baseCooldownMs * 2 ** failureIndex;
```

מנגנון ההגנה מפני thundering herd מונע מכשלונות מקבילים על אותו חיבור
להאריך שוב ושוב את הצינון או להגדיל את `backoffLevel` פעמיים.

מצבים סופניים (terminal) אינם צינונים. `banned`, `expired` (שהופך לסופני רק לאחר
N ניסיונות חוזרים חסומים באמצעות `EXPIRED_RETRY_MAX`), ו-`credits_exhausted`
נועדו להישאר לא זמינים עד שהאישורים/ההגדרות משתנים או שמפעיל מאפס אותם.
אל תדרסו מצבים סופניים במצב צינון חולף.

### נעילת מודל (Model Lockout)

**היקף**: ספק + חיבור + מודל.

**מטרה**: להימנע מהשבתת חיבור שלם כאשר רק מודל אחד אינו זמין או מוגבל במכסה
עבור אותו חיבור.

דוגמאות:

- ספקים עם מכסה לפי מודל שמחזירים `429`.
- ספקים מקומיים שמחזירים `404` עבור מודל אחד חסר.
- כשלי הרשאה של מצב/מודל הספציפיים לספק, כגון מצבי Grok נבחרים.

נעילת המודל נמצאת ב-`open-sse/services/accountFallback.ts` ומאפשרת לאותו
חיבור להמשיך לשרת מודלים אחרים.

### הנחיות לניפוי באגים

- אם כל המפתחות של ספק מדולגים, בדקו הן את מצב מפסק הספק והן את
  `rateLimitedUntil`/`testStatus` של כל חיבור.
- אם ספק נראה מוחרג לצמיתות לאחר חלון האיפוס, בדקו אם הקוד קורא `state` גולמי
  במקום להשתמש ב-`getStatus()`/`canExecute()`.
- אם מפתח ספק אחד נכשל אבל אחרים אמורים לעבוד, העדיפו צינון חיבור על פני
  מפסק ספק.
- אם רק מודל אחד נכשל, העדיפו נעילת מודל על פני צינון חיבור.
- אם מצב אמור להשתקם מעצמו, צריכה להיות לו חותמת זמן עתידית/timeout לאיפוס
  ונתיב קריאה שמרענן מצב שפג תוקפו. סטטוסים קבועים דורשים שינוי ידני של
  אישורים או תצורה.

---

## טביעת אצבע TLS והתגנבות

התגנבות ספציפית לספק (JA3/JA4, CCH, ערפול) מתועדת בנפרד — ראו `docs/security/STEALTH_GUIDE.md` (ב-git; לא מקומפל לתוך `/docs`).

---

## בדיקות חוסן (שלב 8 · בלוק C)

מעבר לבדיקות היחידה עבור לוגיקת החוסן, שלוש בדיקות מאמצות את סביבת הריצה תחת
תנאי עומס/כשל אמיתיים (כולן אינטגרציה/ליליות — אף אחת לא חוסמת PRs):

| בדיקה       | מה                                                                                                                                                                           | הרצה                                   |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | צומת upstream מדומה מזריק latency/reset/timeout/503 אמיתיים; מאמת שמפסק המעגל (circuit breaker) נפתח/מתאושש וש-`checkFallbackError` מסווג 503 כ-fallback שניתן להתאושש ממנו. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | כ-500 זרמים לכל `createSSEStream` תחת `--expose-gc`; נכשל אם ה-heap גדל מעבר לתקרה (מנגנון הגנה מפני OOM #3069).                                                             | `npm run test:heap`                    |
| k6 soak     | עומס מתמשך כנגד `/api/monitoring/health`; ספי p95/שגיאות.                                                                                                                    | `k6 run tests/load/k6-soak.js` (לילית) |

מנוהל על ידי `.github/workflows/nightly-resilience.yml` (cron + dispatch).
ב-`test:integration` ברירת המחדל, בדיקות הכאוס וה-heap מדלגות על עצמן (ללא `RUN_CHAOS_INT`/`--expose-gc`).

---

## ראו גם

- [מדריך הארכיטקטורה](./ARCHITECTURE.md) — ארכיטקטורת המערכת ומבניה הפנימיים
- [מדריך המשתמש](../guides/USER_GUIDE.md) — ספקים, קומבינציות, אינטגרציית CLI
- [מנוע Auto-Combo](../routing/AUTO-COMBO.md) — ניקוד בן 16 גורמים, חבילות מצבים
