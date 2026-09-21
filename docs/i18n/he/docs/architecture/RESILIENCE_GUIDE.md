# Resilience Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

ל-OmniRoute יש שלושה מנגנוני עמידות נפרדים אך קשורים. לכל אחד מהם תחום ואופן פעולה שונים. יש להתייחס אליהם בנפרד בעת ניפוי שגיאות בהתנהגות הניתוב.

![מודל עמידות בן 3 שכבות](../diagrams/exported/resilience-3layers.svg)

> מקור: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. מפסק מעגל של ספק

**תחום:** ספק שלם (למשל, `glm`, `openai`, `anthropic`).

**מטרה:** להפסיק לשלוח תעבורה לספק שנכשל שוב ושוב ברמת השירות או המערכת במעלה הזרם.

**מימוש:**

- מחלקת ליבה: `src/shared/utils/circuitBreaker.ts`
- חיווט: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API מצב: `GET /api/monitoring/health`
- API איפוס: `POST /api/resilience/reset`
- מעטפות: `open-sse/services/accountFallback.ts`
- טבלת DB: `domain_circuit_breakers`

**מצבים:**

- `CLOSED` — תעבורה רגילה מותרת
- `DEGRADED` — התעבורה עדיין מותרת, אך מתבצע מעקב אחר שיעור מוגבר של כשלי ספק
- `OPEN` — הספק חסום זמנית; ניתוב משולב מדלג עליו
- `HALF_OPEN` — פג הזמן הקצוב לאיפוס; בקשת בדיקה מותרת

**ברירות מחדל ניתנות להגדרה (`open-sse/config/constants.ts`, נחשפות תחת לוח הבקרה ← הגדרות ← עמידות):**

| סוג      | מעבר למצב ירוד לאחר | פתיחה לאחר | זמן קצוב לאיפוס |
| -------- | ------------------- | ---------- | --------------- |
| OAuth    | 5 כשלים             | 8 כשלים    | 60s             |
| מפתח API | 7 כשלים             | 12 כשלים   | 30s             |
| מקומי    | נגזר                | 2 כשלים    | 15s             |

`degradationThreshold` קובע מתי ספק נכנס למצב `DEGRADED`;‏ `failureThreshold` קובע מתי הוא נפתח ומדלגים עליו. פרופילים של ספקים מקומיים עדיין אינם מוצגים בדף הגדרות העמידות.

**קודי הפעלה:** רק קודי מצב ברמת הספק `[408, 500, 502, 503, 504]`. אין להפעיל את מפסק המעגל בשל שגיאות ברמת החשבון (רוב שגיאות 401/403/429 — אלה שייכות להשהיה או לנעילה).

**התאוששות עצלה:** כאשר תוקף `OPEN` פג, הפונקציות `getStatus()`,‏ `canExecute()`,‏ `getRetryAfterMs()` מעדכנות את המצב ל-`HALF_OPEN`. אין צורך בטיימר רקע.

---

### השהיית ספק גלובלית אופציונלית (שער חלון)

שכבה רביעית, **אופציונלית** (`PROVIDER_COOLDOWN_ENABLED`, כבויה **כברירת מחדל**), שומרת
ב-`open-sse/services/providerCooldownTracker.ts` זיכרון חוצה-בקשות של ספקים שנכשלים,
שבו נעשה שימוש בעת פתרון יעדים לניתוב משולב, כך שבקשות משולבות עוקבות מפסיקות
לעבור שוב על ספק שזה עתה נכשל. רשומות ברמת הספק מכבדות את שער החלון של
`PROVIDER_PROFILES`:

| פרופיל   | מופעל לאחר (`providerFailureThreshold`) | בתוך (`providerFailureWindowMs`) | מושהה למשך (`providerCooldownMs`) |
| -------- | --------------------------------------: | -------------------------------: | --------------------------------: |
| OAuth    |                                    `10` |                          `15min` |                            `5min` |
| מפתח API |                                    `15` |                          `30min` |                           `10min` |

מתחת לסף, הספק **אינו** נחשב למושהה; הצלחה מנקה
את החלון. רשומות ברמת החיבור (`provider:connectionId`) ממשיכות להשתמש בהשהיה
המעריכית `minRetryCooldownMs → maxRetryCooldownMs`. דריסות:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
הגנת רגרסיה: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. תקופת צינון לחיבור

**תחולה:** חיבור/חשבון/מפתח יחיד של ספק.

**מטרה:** לדלג על מפתח בעייתי אחד, בעוד שחיבורים אחרים של אותו ספק ממשיכים לשרת בקשות.

**מימוש:**

- סימון כלא זמין: `src/sse/services/auth.ts::markAccountUnavailable()`
- בחירה: `getProviderCredentials*` באותו קובץ
- חישוב תקופת הצינון: `open-sse/services/accountFallback.ts::checkFallbackError()`
- הגדרות: `src/lib/resilience/settings.ts`

**שדות לכל חיבור:**

- `rateLimitedUntil` — חותמת זמן שעד אליה תקופת הצינון נמשכת
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — מונה השהיה מעריכית

**תקופות צינון כברירת מחדל:**

- בסיס OAuth:‏ 5 שניות
- בסיס מפתח API:‏ 3 שניות
- מפתח API עם 429: מעדיף כותרות `Retry-After`/איפוס משירות המקור או טקסט איפוס שניתן לפענוח
- השהיה: `baseCooldownMs * 2 ** failureIndex`

**הגנה מפני עדר רועם:** מונעת מכשלים מקביליים להאריך יתר על המידה את תקופת הצינון או להגדיל את `backoffLevel` פעמיים.

**מצבים סופיים (אינם תקופות צינון):**

- `banned` — מוגדר בעקבות זיהוי מילת מפתח של חסימה / חסימת חשבון (ראו [BAN_DETECTION](../security/BAN_DETECTION.md)), וכן בעקבות שלושה סירובים רצופים משירות המקור לכל בקשה (`request_rejected`, לדוגמה Anthropic OAuth 403 "הבקשה אינה מורשית" — `open-sse/services/requestRejectedStreak.ts`); סירוב יחיד רק מעביר את החיבור לתקופת צינון
- `expired` (עובר למצב סופי לאחר מספר מוגבל של ניסיונות חוזרים — `EXPIRED_RETRY_MAX = 3` עם השהיה מעריכית — כדי ששגיאות OAuth זמניות יוכלו להיפתר מעצמן לפני שהחשבון מושבת לצמיתות)
- `credits_exhausted`

מצבים אלה נשמרים עד שפרטי ההזדהות משתנים או שמפעיל מאפס אותם. אין לדרוס מצבים סופיים במצב צינון זמני.

**התאוששות עצלה:** לאחר ש-`rateLimitedUntil` חלף, החיבור נעשה כשיר שוב. לאחר שימוש מוצלח, `clearAccountError()` מנקה את כל שדות השגיאה.

### מחסום השימוש של Claude OAuth: נתיב בעדיפות נמוכה יותר + איפוס מגבלת הפעלה

**תחולה:** חיבור מנוי Claude‏ (OAuth) יחיד. שתי התכונות הן **בהצטרפות מפורשת לכל
חיבור** (עריכת חיבור → מקטע Claude →‏ `lowPriorityMode` / `autoLimitReset` בתוך
`providerSpecificData`, שתיהן כבויות כברירת מחדל) ומשקפות את הפקודות `/low-priority` ו-
`/limit-reset` של Claude Code (חוזה התקשורת תועד מ-Claude Code 2.1.263).

**מימוש:**

- מכונת מצבים + סיווג תגובות: `open-sse/services/claudeLowPriority.ts`
- לקוח סטטוס/מימוש איפוס: `open-sse/services/claudeLimitReset.ts`
- נקודת חיבור למבצע (הזרקת כותרת + ניסיון חוזר באותו חשבון): `open-sse/executors/base.ts::execute()`
- שמירת ההצטרפות המפורשת: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**גורם מפעיל:** מחסום השימוש של 5 שעות — תגובת `429` שהכותרות שלה מכילות
`anthropic-ratelimit-unified-status: rejected`, וכאשר החשבון כשיר,
`anthropic-ratelimit-unified-slow-offer: treatment`. דבר אינו נשלח לפני תגובת ה-429
הראשונה של המחסום; תגובת 429 עקב פרץ ללא כותרות מאוחדות עוברת במסלול הצינון הרגיל.

**נתיב בעדיפות נמוכה יותר** (`lowPriorityMode`):

- בעת תגובת ה-429 של המחסום, המבצע מקבל את ההצעה ומנסה מיד שוב עם **אותו**
  חשבון ועם `anthropic-usage-limit: slow`; הנתיב נשאר פעיל עד למועד
  `anthropic-ratelimit-unified-reset` שהוכרז (+60 שניות חסד), וכל בקשה בחלון זמן זה כוללת
  את הכותרת. תגובת ה-429 שיורטה לעולם אינה מגיעה אל `handleChatCore`, ולכן החיבור
  **אינו** מועבר לתקופת צינון ואינו מוחלף.
- `anthropic-ratelimit-unified-slow-status` בתגובות מאוחרות יותר: `active` / `not_needed`
  משאירים את הנתיב פעיל; `slot_busy`‏ (429) או `529` ממתינים למשך הזמן שצוין ב-
  `anthropic-ratelimit-unified-slow-retry-after` של השרת (ברירת מחדל 20 שניות, הגבלה
  ל-5–600 שניות, ריצוד של ±30%) ומנסים שוב, בכפוף ל-
  `anthropic-ratelimit-unified-slow-max-wait` (ברירת מחדל 20 דקות, הגבלה
  לדקה אחת–6 שעות) — לאחר מכן הנתיב מסתיים ותקופת המתנה של 10 דקות חוסמת קבלה מחדש. זמן
  ההמתנה מוגבל בנוסף לזמן שנותר עד לתפוגת הזמן של תחילת הפנייה לשירות המקור עבור הבקשה
  עצמה (`resolveFetchStartTimeout`, ברירת מחדל 10 דקות), פחות מרווח של 5 שניות: ללא מגבלה זו,
  זמן ההמתנה המרבי של 20 דקות כברירת מחדל היה נמשך מעבר לחיי הבקשה, והשינה הייתה מתבטלת
  באמצע ההמתנה, תוך חשיפת `TimeoutError` במקום סיום תקין מסוג `max_wait` + תקופת המתנה.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, התחלפות חלון 5 השעות, או
  `ineligible` +‏ `anthropic-ratelimit-unified-overage-in-use: true` (שמסיימים אותו בתור
  `extra_usage` בכל סטטוס, מכיוון ששימוש עודף בתשלום מכסה כעת את המחסום) מסיימים את הנתיב;
  לאחר מכן התגובה עוברת למסלול הצינון הרגיל. `budget_exhausted` נשמר בזיכרון עד
  למועד איפוס התקציב שהוכרז (≤ 8 ימים).
- בדיקת המחסום מתבצעת לאחר הניסיונות החוזרים בתוך אותו ניסיון של המבצע, שמופעלים בעקבות 400 (עריכת
  הקשר, הגבלות חשיבה/מאמץ, למידה אוטומטית של פרמטרים), כך שתגובת 429 של המחסום שמופיעה רק באחד
  מהניסיונות החוזרים האלה עדיין מיורטת במקום להגיע למסלול הצינון.
- המצב נשמר בזיכרון לכל חיבור (הפעלה מחדש גורמת לתגובת 429 נוספת אחת של המחסום לצורך קבלה מחדש).

**איפוס מגבלת הפעלה** (`autoLimitReset`, מתבצע לפני הנתיב כאשר שניהם מופעלים):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` ← מקטע `juniper_tide`;
  כאשר `arm: "reset"` וגם `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` עם
  `{ "program": "juniper_tide" }` (מזהה UUID של הארגון מתוך
  `providerSpecificData.organizationUUID`, עם חלופת אתחול).
- `result: reset|not_limited` ← הבקשה נשלחת שוב במהירות מלאה (ללא כותרת האטה).
  `already_used` / `not_offered` שומרים בזיכרון את `next_available_at` (ברירת מחדל שבוע אחד);
  כל כשל מפעיל השהיה של 15 דקות. האיפוס מתבצע פעם בשבוע ועדיין נספר במסגרת המגבלה
  השבועית.

בדיקות למניעת רגרסיה: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### שיוך הפעלה (#7274)

**תחולה:** הפעלת לקוח אחת (כותרת `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) שמוצמדת לחיבור אחד, עבור **כל** ספק.

**מטרה:** להשאיר סוכן מרובה-תורות (Claude Code, aider, סוכנים מותאמים אישית) באותו חשבון בין בקשות, כדי לצמצם אובדן הקשר במעבר בין חשבונות ושגיאות 429 חוזרות בעת התחלה קרה אצל ספקים בעלי מצב הפעלה נפרד לכל חשבון.

**מימוש:**

- קביעת TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- בחירה/יצירה של הצמדה: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- חילוץ כותרות (כללי, לכל ספק): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- טבלת הצמדות מתמידה: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- הגדרה: `sessionAffinityTtlMs` (TTL גלובלי באלפיות שנייה, `0` משבית) — `src/lib/db/settings.ts`. שמה שונה מההגדרה `codexSessionAffinityTtlMs`, שהייתה ייחודית ל-Codex, באמצעות המיגרציה `124_generic_session_affinity_ttl.sql`, שמעבירה כל TTL של Codex שהוגדר בעבר כברירת המחדל החדשה.

לפני #7274, הפונקציה `resolveSessionAffinityTtlMs()` החזירה מיד `0` עבור כל ספק מלבד `codex`, ולכן להגדרת ה-TTL (ולכותרות ההפעלה) לא הייתה כל השפעה בשום מקום אחר, אף שמנגנון ההצמדה וחילוץ הכותרות כבר היו בלתי תלויים בספק. התיקון הסיר את ההחזרה המוקדמת הזאת; כעת ה-TTL חל באופן אחיד על כל ספק לאחר שהוא מוגדר גלובלית לערך גדול מ-`0`.

שלוש כותרות זיקת ההפעלה לעולם אינן מועברות במעלה הזרם — רכיבי ההרצה בונים את כותרות הבקשה שלהם למעלה הזרם מאפס, במקום להעביר את כותרות הלקוח כפי שהן, כך שהן נשארות מזהה מתאם פנימי בלבד.

### חכירוֹת בלעדיות של חיבורי הפעלה מנוהלים

**תחולה:** לקוח HTTP/הפעלה מנוהל פעיל אחד מחזיק בחיבור OmniRoute כשיר אחד.

**מטרה:** לספק בעלות בלעדית ומתמידה על חיבור עבור לקוחות הזקוקים לגבול ניתוב קשיח
בין בקשות. הדבר שונה מזיקת הפעלה, שהיא העדפת המשכיות רכה:
חכירה בלעדית שומרת את מצב מחזור החיים ב-SQLite, אוכפת ייחודיות גלובלית של בעלים פעילים ושל
חיבורים פעילים, ודוחה דור מיושן לפני השילוח לספק.

התכונה מופעלת באופן יזום לכל מפתח API בנפרד. מפתח מנוהל חייב לכלול את ההרשאה `lease:exclusive`
ורשימת `allowedConnections` מפורשת שאינה ריקה. כל לקוח HTTP יכול להשתמש בנקודת הקצה של מחזור החיים; לא
נדרשים שם לקוח, user-agent, ספק, שיטת OAuth או מודל. החכירה מחזיקה בחיבור,
לא במודל, ולכן שינוי מודל משמר את הקישור כל עוד החיבור נשאר כשיר
באופן רגיל. כללי המודל, המכסה, התקינות, תקופת הצינון ורשימת ההרשאות הרגילים נשארים סמכותיים ועשויים
להעביר את אותו דור לחיבור כשיר ופנוי אחר.

מחזור החיים הוא `POST /api/v1/session-leases` עם פעולות JSON מסוג `acquire`, `renew` ו-`release`.
בקשות הסקה מנוהלות מציגות את הערך האטום `X-OmniRoute-Lease-Owner` ואת הערך המדויק
`X-OmniRoute-Lease-Generation`. הבעלים משתמש בקידומת `vlo_` ואחריה 43 תווי base64url; רק
גיבוב ה-SHA-256 שלו נשמר. כל מחסום שילוח סופי קושר גם את מזהה מפתח ה-API המאומת ואת
מזהה החיבור הפעיל. כותרות הבקרה של החכירה מוסרות מיומנים, מתצלומי בקשות שמורים ומכותרות
רכיבי ההרצה במעלה הזרם.

אם לניתוב הרגיל יש מועמדים מנוהלים כשירים, אך כל מועמד פנוי מוחזק בידי
חכירה פעילה זרה, OmniRoute מחזיר HTTP `429`, את הקוד lease-capacity-unavailable,
מצב המתנה לקיבולת ו-`Retry-After` מוגבל הנגזר ממועד התפוגה הרלוונטי המוקדם ביותר.
מצב רגיל שבו אין מועמדים כשירים אינו התנגשות חכירות ושומר על סמנטיקת שגיאות הניתוב הקיימת שלו.

מנגנונים קשורים נשארים נפרדים:

- תפוסת הפעלות OAuth היא חלוקה רכה מקומית לתהליך עבור חשבונות OAuth.
- סמפורים של חשבונות מעניקים היתרי מקביליות לבקשות ומסתיימים עם השלמת בקשה.
- חכירוֹת בלעדיות של הפעלות מנוהלות הן בעלות מתמידה לאורך מחזור החיים, עם מחסום דור.

---

## 3. נעילת מודל

**תחום:** שלישיית ספק + חיבור + מודל.

**תחום המפתח לפי סטטוס:** הסטטוס שנכשל קובע לאיזה מפתח תיכתב נעילה
(`resolveLockoutScope()` בתוך `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — אות למכסה או לזכאות — נועלים את **משפחת המכסה**:
  עבור codex, את כל התחום `codex` / `spark` (כל מודל `gpt-5*` של
  החיבור); עבור ספקים אחרים, `getQuotaScopedModelForProvider()`.
- `404` נועל את המודל הבסיסי (`getModelLockKey()` מצמצם את `not_found`).
- כל סטטוס אחר — כשלי תעבורה/שרת מסוג `5xx` וה-`502` המסונתז של OmniRoute
  מאימות האיכות — נועל רק את שלישיית
  הספק/חיבור/מודל **המדויקת**. זרם פגום במודל אחד אינו ראיה
  לגבי מכסת החשבון; לפני כלל זה, תגובה ריקה אחת מ-
  `codex/gpt-5.6-luna` הסירה כל מודל `gpt-5*` של אותו חיבור
  מהניתוב למשך 2–30 דקות (עם הסלמה), אף שהמכסה שלו לא הושפעה.
- אפשרות `scope` מפורשת של הקורא תמיד גוברת (Antigravity מעביר `"exact"`).

**מטרה:** למנוע השבתה של חיבור שלם כאשר רק מודל אחד אינו זמין או מוגבל במכסה.

**דוגמאות:**

- ספקים עם מכסה לכל מודל שמחזירים 429
- ספקים מקומיים שמחזירים 404 עבור מודל חסר יחיד
- כשלי הרשאה למצבים/מודלים ייחודיים לספק (למשל, מצבי Grok)

**מימוש:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### לוח בקרה לתקופות צינון של מודלים (v3.8.0)

ממשק משתמש: הגדרות ← תקופות צינון של מודלים (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

מציג נעילות פעילות עם: ספק, חיבור, מודל, סיבה, expiresAt. מפעילים יכולים להפעיל מחדש מודל באופן ידני מתוך הכרטיס.

**ממשק API מסוג REST:**

- `GET /api/resilience/model-cooldowns` — הצגת נעילות פעילות
- `DELETE /api/resilience/model-cooldowns` — הפעלה ידנית מחדש. גוף: `{provider, connection, model}`. אימות: ניהול.

### ממשק משתמש להגדרות נעילה + התאוששות באמצעות דעיכה בעקבות הצלחה (v3.8.23)

נעילת מודלים השתנתה מהתנהגות קשיחה ופעילה תמיד לתכונה ניתנת להגדרה מלאה,
שיש להפעיל במפורש, עם כרטיס הגדרות משלה ונתיב התאוששות שמתקן את עצמו.

**כרטיס הגדרות:** הגדרות ← נעילת מודל
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
כרטיס זה **נפרד** מ-`ModelCooldownsCard` לקריאה בלבד שמופיע לעיל (אשר רק
_מציג_ נעילות פעילות) — הכרטיס החדש _מגדיר את הפרמטרים_. ערכי ברירת המחדל
נמצאים ב-`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| הגדרה                   | ברירת מחדל                       | משמעות                                                 |
| ----------------------- | -------------------------------- | ------------------------------------------------------ |
| `enabled`               | `false`                          | מתג ראשי — נעילת מודלים **כבויה כברירת מחדל**.         |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | סטטוסים מהשירות במעלה הזרם שנחשבים לכשל בהיקף מודל.    |
| `baseCooldownMs`        | `120_000` (120 שניות)            | משך הנעילה הראשוני עבור הכשל הראשון.                   |
| `maxCooldownMs`         | `1_800_000` (30 דקות)            | תקרה לתקופת הצינון לאחר הסלמה.                         |
| `maxBackoffSteps`       | `10`                             | המספר המרבי של שלבי הסלמת השהיה מעריכית.               |
| `useExponentialBackoff` | `true`                           | האם כשלים חוזרים מסלימים את תקופת הצינון באופן מעריכי. |

ההגדרות נשמרות דרך מאגר ההגדרות הרגיל ומאומתות באמצעות סכמת
הגדרות העמידות; הכרטיס מגביל את `baseCooldownMs`/`maxCooldownMs`
(כאשר `maxCooldownMs ≥ baseCooldownMs`) ואת `maxBackoffSteps`.

**התאוששות באמצעות דעיכה בעקבות הצלחה:** ההתאוששות **אינה** מבוססת רק על תפוגת טיימר. תגובה
תקינה מפחיתה בהדרגה את ספירת הכשלים של המודל, כך שמודל שהתאושש
במהלך החלון מפסיק להסלים (והנעילה שלו מתנקה) לפני שהטיימר שלו היה פג. כאשר יעד
משולב מצליח, `open-sse/services/combo.ts` קורא ל-`decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), אשר **מחלק בחצי** את
`failureCount` המאוחסן (`Math.floor(failureCount / 2)`); כאשר הוא מגיע ל-`0`, רשומת
הנעילה נמחקת לחלוטין. הפונקציה המקבילה `recordModelLockoutFailure()`
מגדילה את הספירה (ומסלימה את תקופת הצינון) בעת כשלים בתוך
חלון ההסלמה. דעיכה זו בעקבות הצלחה מתווספת לתפוגת טיימר רגילה —
כל אחד משני הנתיבים יכול להפעיל מחדש מודל.

**מצב:** הנעילות נשמרות **בזיכרון** (`Map`-ים לכל תהליך של
`ModelLockoutEntry` עם מפתח מסוג `provider:connectionId:model`; נעילות בתחום מדויק עם
מפתח מסוג `provider:connectionId:exact:model`), ואינן נשמרות
במסד הנתונים — הן אובדות בעת הפעלה מחדש. ה_הגדרות_ נשמרות; _מצב_
הנעילות הפעילות הוא זמני.

---

## 4. בקרת מקביליות לשיתוף מכסה (v3.8.36)

חשבונות מנוי (GLM, MiniMax וכו') מאפשרים לעיתים קרובות רק כ־1–3 בקשות
מקבילות; חריגה מכך גורמת לשגיאות 429 ולתקופות צינון. הבעיה חריפה במיוחד בצירופי
**שיתוף מכסה** (`qtSd/…`), שבהם כמה מפתחות API משתפים חשבון אחד אצל ספק
חיצוני. שלוש שכבות מונעות הצפה של חשבון משותף.

### מגבלת מקביליות לכל חיבור (`max_concurrent`)

כל חיבור לספק יכול להגדיר תקרת `max_concurrent`
(`provider_connections.max_concurrent`, המוגדרת בחלונית החיבור / ב־API / במסד הנתונים).
השאירו אותה ריקה כדי לא להחיל מגבלה. זהו הפרמטר היחיד שמניע את שכבת הסדרת הבקשות
שלהלן — הגדירו אותו לפי המקביליות האמיתית של החשבון (למשל GLM כ־1, MiniMax כ־2).

### הסדרת בקשות בשיתוף מכסה

כאשר ניתוב בשיתוף מכסה מכוון לחיבור שמגדיר ערך `max_concurrent` חיובי,
בקשות מקבילות לאותו **חשבון** מוסדרות באמצעות סמפור לכל חיבור
(מפתח `qsconn:<connectionId>`): בקשות עודפות **ממתינות בתור** במקום להציף
את החשבון. המנגנון פועל בשיטת **fail-open** — במקרה של תור מלא או חריגה
מזמן ההמתנה, הבקשה ממשיכה ללא מקום שמור במקום לדחות בקשה שניתנת לניתוב.
ניתן להפעיל או להשבית זאת דרך **הגדרות → עמידות → מקביליות לכל חיבור בשיתוף מכסה**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, מופעל כברירת
מחדל). ללא מגבלת `max_concurrent`, ההתנהגות אינה משתנה.

> שער הניתוב של שיתוף המכסה (`selectQuotaShareTarget`,‏ DRR + P2C) פועל בעצמו
> בשיטת fail-open ורק מעניק _עדיפות נמוכה יותר_ לחיבור שהגיע למגבלה — במאגר
> הכולל חיבור יחיד הוא אינו יכול לאכוף מגבלה קשיחה, ולכן הסמפור הזה הוא שמרסן
> בפועל את ההצפה.

### ניסיון חוזר מודע לצינון בצירוף

בכל אסטרטגיית צירוף (כאשר היא מופעלת), בקשה שהייתה מקבעת שגיאת 429 עקב
תקופת צינון זמנית וקצרה ממתינה לסיומה ונשלחת מחדש במקום להחזיר את שגיאת
ה־429 — הדבר מכסה חלונות TPM/RPM ממחלקת Gemini (כ־60 שניות לפי retry-after)
בצירופים מרובי־מודלים, למשל כאשר שני היעדים בצירוף של שני מודלים מגיעים
למגבלת קצב לכל מודל. ההתנהגות מוגבלת באמצעות `comboCooldownWait`
(`enabled`,‏ `maxWaitMs`,‏ `maxAttempts`,‏ `budgetMs`) תחת **הגדרות → עמידות**.
המערכת לעולם אינה ממתינה במקרה של `quota_exhausted` (נעול עד חצות) או מסיבות
של אימות/משאב שלא נמצא.

---

## 5. בקרת קבלה לתור הבקשות (v3.8.49 · סוגיה #6593)

**תחום**: תור הגבלת הקצב המקומי לכל ספק+חיבור (`open-sse/services/rateLimitManager.ts`,
המבוסס על Bottleneck), שכבה אחת מתחת לשלושת המנגנונים שלעיל.

**`maxWaitMs` מגביל את ההמתנה בתור; `executionMaxWaitMs` מגביל את הביצוע.**
השניים נפרדים בכוונה, ואף אחד מהם אינו מזין את האחר.

`resilienceSettings.requestQueue.maxWaitMs` הוא **תקציב ההמתנה בתור**: הוא
מכסה את ההמתנה למשבצת אצל הספק ולאחר מכן את השהייה במצב QUEUED, והטיימר שלו
מתאפס ברגע שהמשימה עוזבת את QUEUED ומתחילה להתבצע
(`rateLimitManager.ts`, `wrappedFn`). בקשה שחורגת ממנו לעולם אינה מגיעה
לשירות במעלה הזרם. ברירת המחדל היא 30000ms, המסופקת על ידי
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` בתוך `src/lib/resilience/settings.ts` ומעוגנת על ידי
`tests/unit/ratelimit-admission-control-6593.test.ts`, כך ששינוי בה יהפוך
את הבדיקה הזו לאדומה במקום להשאיר את הפסקה הזו מיושנת מבלי שיובחן בכך.

`resilienceSettings.requestQueue.executionMaxWaitMs` הוא הערך ש-Bottleneck
מקבל בתור `expiration` של המשימה, שהטיימר שלו מתחיל רק לאחר השיגור. הוא משמש
כרשת ביטחון למבצעים שאין להם זמן קצוב משלהם לבקשה במעלה הזרם, והוא
מוגדל לזמן הקצוב של המבצע עצמו מתחילת ה-fetch כאשר זה ארוך יותר, כך שהוא
לא יוכל לקטוע תגובה תקינה שנמצאת בעיצומה. ברירת המחדל היא 600000ms (10 דקות).

הזנת תקציב התור אל `expiration` היא מה שבעבר חיסל שערים לא-אינקרמנטליים
באמצע הביצוע — באופן לגיטימי הם פועלים במשך דקות לפני הבתים הראשונים —
ולכן תפוגה נחשפת בתור `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), בעוד שתקציב התור נושא את
קוד הזמן הקצוב של התור. ניתן לעקוף כל אחד מהם באמצעות `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (משתנה סביבה) או דרך לוח הבקרה
(**הגדרות ← שרידות**). בעת הנרמול, שניהם מוגבלים לטווח 1ms–24h.

**סדר הקדימויות, עבור שניהם:** משתנה הסביבה מספק רק את _ברירת המחדל_. ערך
שנשמר תחת `resilienceSettings.requestQueue` (לוח בקרה / תיקון API, המאוחסן
ב-`key_value`) גובר עליו, וערך `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` לכל חיבור גובר גם עליו. לכן, הגדרת משתנה הסביבה
בפריסה שכבר יש בה ערך שמור אינה משנה דבר — במקום זאת, יש למחוק או לעדכן
את ההגדרה השמורה.

השהייה בתור מוגבלת על ידי `maxWaitMs`; המשתנה `maxQueueDepth` שלהלן מגביל את
מספר הפונים שיכולים להמתין בתור בו-זמנית.

**`maxQueueDepth` — מגבלת קבלה אופציונלית (חדש).** `resilienceSettings.requestQueue.maxQueueDepth`
מגביל את מספר הבקשות שיכולות להמתין בתור (ועדיין לא שוגרו) עבור צירוף אחד
של ספק+חיבור בו-זמנית. כאשר התור כבר מכיל `maxQueueDepth`
בקשות, בקשה חדשה נדחית מיד עם שגיאה בעלת טיפוס
`code: "RATE_LIMIT_QUEUE_FULL"` **לפני** שהיא מגיעה אי פעם אל `limiter.schedule()`
— כך שהדחייה זולה ומתרחשת לפני כל עבודת דחיסת פרומפטים / תרגום בהמשך
עבור אותה בקשה. ברירת המחדל `0` = מושבת, וכך נשמרת התנהגות התור הקיימת ללא הגבלה;
הטווח המוגבל הוא 0–100000. ניתן לעקוף באמצעות `RATE_LIMIT_MAX_QUEUE_DEPTH` (משתנה סביבה) או
`resilienceSettings.requestQueue.maxQueueDepth` (תיקון דרך לוח הבקרה/API).

בדיקת הקבלה עצמה היא פונקציה טהורה
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), כך
שניתן לבדוק אותה בבדיקת יחידה ללא מגביל Bottleneck אמיתי.

> ה-RFC שפתח את #6593 הציע גם דגל `bypassCompressionOnRateLimit`.
> צינור העיבוד `open-sse/services/compression/` של מאגר זה מבצע
> דחיסת פרומפט/הקשר בבקשת ה-LLM היוצאת (`chatCore.ts`,
> סביב בלוק `resolveCompressionSettings`/`selectCompressionStrategy`),
> ולא דחיסת תגובת HTTP עבור גופי 429 מסונתזים — אין
> נתיב קוד תואם לדגל עקיפה מילולי. שלב דחיסת הפרומפט הזה
> פועל כעת גם _לפני_ `withRateLimit()` בצינור עיבוד הבקשות, ולכן
> שינוי הסדר כדי לדלג עליו בעת דחייה בשל תור מלא הוא שינוי נפרד וגדול יותר
> מתחום הסוגיה הזו; הוא **לא** מומש כאן במכוון
> ונותר כמשימת המשך, אם החיסכון במשאבי CPU מצדיק את
> הסיכון שבשינוי הסדר.

---

## 6. מנגנון ניטור תפוקה לזרם איטי (#9709)

מנגנון ההגנה האופציונלי `resilienceSettings.streamRecovery.throughputWatchdog` מזהה
מקור upstream שעדיין שולח מקטעים, אך מפיק פלט עוזר בקצב נמוך מקצב הפלט השימושי
שהוגדר. הוא נבדל במכוון מפסק הזמן עקב חוסר פעילות:
אותות heartbeat ומטא-נתונים אינם מאפסים אף אחד מהטיימרים ואינם נחשבים להתקדמות. הוא גם
נבדל ממועד הסיום הקשיח של הניסיון (#9153), שנותר תקרת בטיחות מוחלטת
ללא קשר לאיכות הפלט.

מנגנון הניטור דורש תקופת חימום ולאחריה חלון נע מלא לפני
שיוכל לבטל את הפעולה. הוא סופר הפרשי טקסט מאירועי פלט של Chat Completions ושל Responses API
(אומדן שמרני של בתים בקידוד UTF-8), מתעלם מאירועים ריקים ומאירועים המכילים נתוני שימוש בלבד,
ומשהה את ההערכה בזמן שאירועי קריאה לכלים או הסקת מסקנות נמצאים בתהליך. הוא מושבת
כברירת מחדל, ואפשר להפעילו באמצעות `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
החלון, תקופת החימום, הקצב המזערי והפלט המזערי הניתן למדידה מוגבלים באמצעות
שכבת הנרמול הרגילה של הגדרות העמידות.

כאשר הוא מופעל, ביטול מצד מנגנון הניטור חל רק על ניסיון ה-upstream הפעיל. לפני
שבתים כלשהם נחשפים ללקוח, נתיב ההתאוששות המוקדמת הקיים באותו חשבון עשוי לפתוח מחדש
את הניסיון. לאחר ביצוע commit, הזרם לעולם אינו מנוגן מחדש באופן עיוור; רק חוזה
ההמשך הבטוח הקיים באמצע הזרם יכול לחבר סיומת. הסיום ממשיך להתבצע
פעם אחת בלבד, ולכן חשבונאות השימוש ושחרור הסמפור אינם משוכפלים.

---

## 7. ניסוח מחדש של סטטוס Upstream (שגיאות מכסה עם סטטוס שגוי)

**תחום:** שער upstream יחיד שמדווח על מיצוי זמני של המכסה באמצעות סטטוס HTTP שגוי.

**מטרה:** לתקן סטטוס מטעה לפני הסיווג, כדי שצרכנים בהמשך השרשרת (מנוע ה-fallback, צבירת combo והתגובה המוצגת ללקוח) יראו את אופייה האמיתי של התקלה ככזו שניתן לנסות שוב לאחריה.

שערים מסוימים מציינים מיצוי זמני של המכסה באמצעות סטטוס HTTP
שלא ניתן לנסות שוב לאחריו. `agentrouter.org` מחזיר `403` (ולעיתים `400`) עם גוף בסינית
(`用户额度不足` / `额度不足`) במקום `429` התקני. לקוחות כמו Claude
Code מתייחסים אל `403` כשגיאה קבועה ומבטלים את ההפעלה, וללא תיקון
מנוע ה-fallback היה מסווג אותה כ-`AUTH_ERROR` במקום כאירוע
מכסה.

**מימוש:**

- מאגר + מתאם: `open-sse/config/upstreamStatusRestatement.ts` — רשימת כללים
  לפי ספק (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), המותאמים באמצעות `applyStatusRestatement()`.
- נקודת הקריאה: הבלוק `providerFailure:` בתוך `open-sse/handlers/chatCore.ts`
  (בסביבות שורה 3654), מיד לאחר ש-`parseUpstreamError()` מנתח תגובת upstream
  עם סטטוס HTTP של שגיאה (`!providerResponse.ok`), ולפני הפעלת סיווג
  כלשהו, כך שכל צרכן בהמשך השרשרת רואה את הסטטוס המתוקן.
  שגיאות המוטמעות בתוך זרם SSE עם `200` עוברות נתיב נפרד ומאוחר יותר
  לניתוח הזרם, ולכן **אינן** מכוסות כיום על ידי hook זה — זוהי
  מגבלה ידועה שעדיין אינה נדרשת עבור הסטטוס השגוי של agentrouter (שמופיע
  כסטטוס HTTP של שגיאה).
- זכאות לניסיון חוזר: `429` נמצא בתוך `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), ולכן שגיאה שהסטטוס שלה נוסח מחדש
  כוללת חלון אמיתי לניסיון חוזר במקום להופיע כ-`403` חסר תוחלת.
- הערך הסינתטי `60s` של `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  הוא רק המידע שהתגובה שנוסחה מחדש מוסרת **ללקוח**; הוא אינו
  משך ה-cooldown/lockout הפנימי של החיבור עצמו — משך זה נשלט
  בנפרד על ידי המנגנון שמטפל בפועל בשגיאה שנוסחה מחדש
  (השהיה מתרחבת של Connection Cooldown, סעיף 2, עם בסיס של `3s` עבור ספקי
  API-key; או Model Lockout, סעיף 3, עבור ספקים עם מכסה לפי מודל כגון
  agentrouter). הנתב עשוי להיות זכאי לניסיון חוזר באופן פנימי מוקדם יותר
  מחלון 60 השניות שהוא מפרסם ללקוח — זהו מרווח ביטחון מכוון,
  ולא באג.

שגיאות קבועות (`无权访问模型` של agentrouter — אין גישה למודל זה)
לעולם אינן מנוסחות מחדש: `excludeMarkers` מטיל וטו על הכלל גם כאשר יש התאמה ל-`textMarkers`,
כך שהשגיאה שומרת על הסטטוס המקורי שלה ואף מנגנון אינו מנסה אותה שוב לנצח. כלל
סיווג הספקים התואם
(`agentrouter-model-access-denied` בתוך `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, תקופת cooldown בסיסית מוצהרת של `6h`)
נבדק על ידי `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_לפני_ החזרה המוקדמת הגנרית `FORBIDDEN` של קטגוריית apikey, בכפוף ל-
`honorsRuleLockScope(provider)` (#10334 — נכון לעכשיו בלעדי ל-agentrouter באמצעות
רשימת ההרשאות `HONORS_RULE_LOCK_SCOPE_PROVIDERS` בתוך
`providerErrorRules.ts`). תקופת ה-cooldown המוצהרת של הכלל, 6 שעות, מועברת בתור
`fallbackResult.baseCooldownMs`, אך היא עדיין מוזנת לנתיב ה-lockout הקיים מראש
של מכסה לפי מודל (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, שלא השתנה בעקבות #10334 מלבד מקור תקופת ה-cooldown):
היא מוגבלת כלפי מטה לערך `mlSettings.maxCooldownMs` של המפעיל
(ברירת המחדל היא `1_800_000ms` / 30 דקות), כמו כל lockout אחר של מודל, ואילו
_סיבת ה-lockout הנשמרת_ נותרת הערך הקשיח הקיים מראש `"forbidden"`,
ולא `"auth_error"` של הכלל — רק משך ה-cooldown מכובד
מקצה לקצה, ולא מחרוזת הסיבה. החיבור עצמו נשאר פעיל;
מודלים אחרים באותו חיבור אינם מושפעים.

שגיאות מכסה שנוסחו מחדש (`额度不足`) מגיעות לכלל ספק בסביבת הייצור
(`agentrouter-user-quota-exhausted`:‏ `reason: "quota_exhausted"`,‏ `scope:
"connection"`, ללא תקופת צינון מוצהרת משלו — נעשה שימוש בברירת המחדל של
השהיה מדורגת בשכבת ההתמדה). מאז #10334, הערך `scope` ב-
`ProviderErrorRuleMatch` אכן נצרך מקצה לקצה, אך **רק** עבור ספקים שנמצאים
ברשימת ההיתרים `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
נכון להיום רק `"agentrouter"`, מותנה באמצעות `honorsRuleLockScope()`). עבור
כל ספק אחר, `scope` נשאר בגדר מידע בלבד, בדיוק כפי שהיה לפני #10334.
הפונקציה `checkFallbackError` חושפת את תחום הכלל התואם בתור
`fallbackResult.ruleScope`; הפונקציה `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) היא שומר הסף המשותף שמוודא כי
`ruleScope` אכן בטוח לכיבוד כאות כלל-חיבורי המתאושש מעצמו
(תחום `"connection"`, סיבה `quota_exhausted`, לעולם לא `permanent`,
לעולם לא `creditsExhausted` — הגנה מפני כלל עתידי שיצמיד את התחום
`"connection"` למצב חשבון קבוע). שני צרכנים קוראים לה:

- **התמדה** (`markAccountUnavailable()`,‏ `src/sse/services/auth.ts`):
  במקום ליפול לענף הנעילה **לפי מודל** של ספק מעבר
  (ל-agentrouter יש `passthroughModels: true` ← הפונקציה `hasPerModelQuota()`
  מחזירה `true`), היא מחילה **תקופת צינון זמנית לחיבור** —
  `testStatus: "unavailable"` +‏ `rateLimitedUntil`, ולעולם לא מצב סופי
  (`credits_exhausted`/`banned`/`expired`) — כך שהחיבור מתאושש מעצמו
  לאחר תום תקופת הצינון, במקום לדרוש איפוס ידני של פרטי האימות.
  הפעולה מדולגת עבור חיבורים עם `disableCooling: true` (#2997): ביטול
  ההסכמה הזה ממשיך במקום זאת אל הנעילה לפי מודל (פשרה מתועדת —
  ראו את הערת הקוד שמעל הענף).
- **ניתוב קומבו באותה בקשה** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): אותו שומר סף מסמן את
  החיבור בקבוצת `exhaustedConnections` שבזיכרון, לפי המפתח
  `${provider}:${connectionId}`. הדבר מדלג רק על יעד SAME-REQUEST שנותר
  ושכבר _נושא בעצמו בדיוק את אותו `connectionId`_ באובייקט היעד שלו
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`,‏ `if (provider &&
connectionId)` לפני החיפוש ב-`exhaustedConnections`) — קומבו פשוט של
  רשימת מודלים, שבו יעדים מקבילים אינם נושאים `connectionId` מוצמד משלהם
  והוא נפתר רק בכל שיגור מתוך הכותרת
  `X-OmniRoute-Selected-Connection-Id` של התגובה, לעולם אינו תואם למפתח הזה.
  במקרה נפוץ זה, ההגנה האמיתית מפני שימוש חוזר של שלב שנותר בחשבון שזה
  עתה מוצה אינה הקבוצה הזו — אלא שכבת ההתמדה שלעיל
  (`rateLimitedUntil` של החיבור נמצא כעת בעתיד), בשילוב עם אותו שומר סף
  שמדכא את `transientRateLimitedProviders` עבור הכשל (ראו "תכנון דו-שלבי"
  ואת הערת הקוד בענף `isAgentrouterConnectionQuotaScope` שב-
  `targetExhaustion.ts`): כאשר הקבוצה הזאת אינה מסומנת, האישור הכפוי
  `allowRateLimitedConnection` של `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`,‏ `:2734-2738`) **אינו** מופעל
  עבור השלבים הנותרים של הספק, ולכן מסנן `rateLimitedUntil` של בחירת
  פרטי האימות (`src/sse/services/auth.ts:1238`) מכובד כרגיל, ושלב שנותר
  בוחר חיבור agentrouter אחר שעדיין כשיר, או נכשל משום שאין פרטי אימות
  זמינים — הוא אינו כופה את דרכו חזרה אל החיבור שהענף הזה צינן זה עתה.

### תכנון דו-שלבי: ניסוח מחדש של הסטטוס, ולאחר מכן סיווג

ניסוח מחדש של הסטטוס (`upstreamStatusRestatement.ts`) וכללי סיווג הספקים
(`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) הם מאגרים נפרדים ששניהם משתמשים במזהה הספק
ובסמני טקסט כמפתחות, אך הם פועלים במקומות שונים ומשרתים מטרות שונות:
הניסוח מחדש משנה את סטטוס ה-HTTP בשלב מוקדם ב-`chatCore.ts`;
כללי הסיווג בוחרים את `reason` של החלופה ואת `scope` של הנעילה
(`model` / `provider` / `connection`) בתוך `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

כללי הסיווג רואים את **טקסט** השגיאה המלא (הנדרש כדי להתאים סמנים בגוף
כגון `额度不足`) רק עבור ספקים המופיעים ברשימת ההיתרים
`FULL_TEXT_RULE_PROVIDERS` שב-`providerErrorRules.ts` — נכון להיום רק
`"agentrouter"`. עבור כל ספק אחר ב**קטלוג המובנה**,
`checkFallbackError` מעבירה אל `getProviderErrorRuleMatch` רק את השגיאה
המובנית (`{code, type}`), שמספיקה לכללים המבוססים על כותרת/סטטוס/קוד,
אך אינה מסוגלת לראות סמנים בטקסט הגוף. פונקציית העזר
`resolveRuleMatchBody()` מבצעת את הבחירה הזאת: טקסט השגיאה המלא עבור
ספקים שברשימת ההיתרים, והשגיאה המובנית עבור כל השאר. הוספת ספק
**מובנה** אל `FULL_TEXT_RULE_PROVIDERS` היא הצטרפות מפורשת לכל ספק —
היא קיימת כדי שהנתיב המוגדר כברירת מחדל עבור כל ספק שאינו ברשימה יישאר
ללא שינוי, בית אחר בית.

ה-`scope` של כלל (`model` / `provider` / `connection`) הוא הצטרפות נפרדת
מ-`FULL_TEXT_RULE_PROVIDERS`:‏ `checkFallbackError` רק חושפת אותו בתור
`fallbackResult.ruleScope`, והצרכנים במורד הזרם מכבדים אותו כמשהו שאינו
תווית מידע בלבד רק עבור ספקים שברשימת ההיתרים
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` שבאותו קובץ (מותנה באמצעות
`honorsRuleLockScope()` — נכון להיום רק `"agentrouter"`). ראו "שגיאות מכסה
שנוסחו מחדש" לעיל כדי להבין מה התאמה של `scope: "connection"` עושה בפועל
לאחר שספק נוסף לרשימת ההיתרים הזאת.

**#11104 — כללים שמוצהרים על ידי המפעיל עוקפים את שתי רשימות ההיתרים.** מפעיל יכול
להצהיר בזמן ריצה על כלל ייעודי לספק באמצעות `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
מבלי לערוך קובץ זה. הכפפת כלל של מפעיל ל-
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — רשימות היתרים
שנועדו להגן על התנהגות **ברירת המחדל** של כללי הקטלוג המובנים — הייתה
הופכת את מנגנון ההגדרות לחסר השפעה עבור כל ספק מלבד אלה שכבר
מופיעים שם, מאחר שעצם ההצהרה על הכלל היא כבר הצטרפות מפורשת מצד
המפעיל. `resolveRuleMatchBody()` ו-`honorsRuleLockScope()` בודקות שתיהן
תחילה את `hasOperatorRuleForProvider()`: ספק עם כלל מפעיל מקבל
את טקסט השגיאה הגולמי, וה-`scope` שהוצהר עבורו מכובד, ללא תלות
בשאלה אם הוא מופיע גם באחת מרשימות ההיתרים.

**פער ידוע — לעולם אין שימוש ב-`providerRuleRegistry` עבור HTTP 400.**
ענף `BAD_REQUEST` של `checkFallbackError` מסווג את סטטוס 400 לחלוטין
באמצעות מערכי התבניות שלו (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` וכו' ב-`accountFallback.ts`) ומחזיר תוצאה לפני
שמגיעים לענף `configuredRule`/`getProviderErrorRuleMatch` שמעליו.
כלל קטלוג מובנה (או כלל מפעיל) עם `status: 400` תקין
תחבירית, אך לעולם לא יופעל. נכון להיום אין כלל קיים שמכוון ל-400,
ולכן שום דבר בפרודקשן אינו מושפע — אך כלל 400 עתידי מחייב קודם
שינוי בענף הזה, וזהו שינוי גדול יותר מהוספת כלל (הוא
מסווג מחדש את 400 עבור כל ספק שכבר מסתמך על התנהגות
מערכי התבניות) ואינו נכלל בהיקף של הוספת כלל לספק יחיד.

### הוספת שער חדש שמציג מכסה באופן שגוי

1. רשמו מערך כללים אחד ב-`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). שמרו על `textMarkers`
   ייחודיים לספק; לעולם אל תשתמשו מחדש בביטויים כלליים באנגלית שמתנגשים עם
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. אפשר, לפי הצורך, לרשום כללי סיווג ב-
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) כדי לבחור
   את היקף הנעילה הנכון (`connection` למכסה כלל-חשבונית, `model`
   לשגיאות לפי מודל). שלב זה נכנס לתוקף בפרודקשן רק עבור
   ספקים שכלליהם זקוקים לטקסט השגיאה המלא (סמני גוף): הוסיפו את
   מזהה הספק ל-`FULL_TEXT_RULE_PROVIDERS` באותו קובץ — אחרת
   `checkFallbackError` תעביר לכלל רק את שגיאת
   ה-`{code, type}` המובנית, וכלל המבוסס על טקסט הגוף לעולם לא יתאים
   לתעבורה חיה. כללים שמתאימים על בסיס `status`/`headers` בלבד (כמו אלה של
   Opencode או Minimax) אינם זקוקים להצטרפות זו. בנפרד, אם הכלל מצהיר על
   `scope: "connection"` והכוונה היא לתקופת צינון ממשית החלה על החיבור כולו,
   יחד עם דילוג על השילוב באותה בקשה (ולא רק תווית אינפורמטיבית), הוסיפו את
   מזהה הספק ל-`HONORS_RULE_LOCK_SCOPE_PROVIDERS` באותו קובץ — זהו
   התנאי שמאפשר צריכה בסגנון `isAgentrouterConnectionQuotaScope()` בתוך
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ובתוך
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); בלעדיו, `scope`
   עדיין מועבר דרך `fallbackResult.ruleScope`, אך שום דבר אינו פועל לפיו.
3. הוסיפו בדיקות יחידה המקבילות ל-`tests/unit/upstream-status-restatement.test.ts`
   ול-`tests/unit/agentrouter-error-rules.test.ts` (כולל הגנות
   not-permanent / not-creditsExhausted, ואם הספק זקוק
   לרשימת ההיתרים — בדיקה שמוודאת כי `resolveRuleMatchBody()` מחזירה את
   הטקסט המלא רק עבור אותו ספק).

אין צורך בשינויים ב-`chatCore.ts`, ב-`classifyError` או ב-combo.

#### נעילה המקובצת לפי תעבורה יוצאת (#10880)

ספקים ב-`EGRESS_BUCKETED_LOCK_PROVIDERS` (משפחת opencode) מטופלים
כ-upstream המקובץ לפי IP (הרובד החינמי של opencode מקובץ לפי IP, ולא
לפי חשבון — ראו #9611): סטטוס 429 שמסווג כ-`quota_exhausted`
**או** כ-`rate_limit_exceeded` מכניס לתקופת צינון כל חיבור ממשפחת רשימת ההיתרים
שכתובת ה-IP היוצאת האחרונה הידועה שלו תואמת לזו של החיבור שנכשל, לפני
שהרוטציה יכולה לנסות אותם
— וכך נמנעות N-1 קריאות upstream שמובטח כי ייכשלו (באותו מבנה כמו #10460/#10525).
`rate_limit_exceeded` נכלל במכוון: בנתיב `markAccountUnavailable`
הכללים הייעודיים ל-opencode לעולם אינם מתאימים (לא מועברים headers/body אל
`checkFallbackError`, ו-opencode אינו נמצא ב-`FULL_TEXT_RULE_PROVIDERS`), ולכן 429
שבגופו מופיע טקסט מכסת המינוי ("monthly usage limit
reached") מסווג כ-`quota_exhausted` באמצעות מנגנון ברירת המחדל לטקסט מכסה
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; תקופת צינון של שעה) לפני
שמגיעים בכלל לכלל `status_429` — בעוד ש-429 ללא טקסט מכסה (הגבלת
קצב רגילה) מסווג באמצעות כלל `status_429` כ-`rate_limit_exceeded`
ועדיין מכניס את משפחת ה-IP לתקופת צינון. עבור ספק ברשימת ההיתרים, הגבלת קצב
המקובצת לפי IP היא אותו אות כמו מכסה שמוצתה. מגבלות בפועל:

- **מאמץ מיטבי**: הנעילה מאתרת את ה-`egress_ip` הידוע האחרון של החיבור
  מתוך `proxy_logs` (חלון של 24 שעות, סינכרוני, ללא מטמון). מטמון קר (כתובת
  ה-IP היוצאת מעולם לא נבדקה) או היעדר שורה → החיבור שנכשל עדיין מועבר לצינון
  על ידי הענף (ונרשם כמו היום), אך אף חיבור אח לא ננעל.
- **לעולם לא סופי**: הצינון הוא חלון מכסה שמתחדש
  (`testStatus: "unavailable"`); מצב קבוע לעולם אינו נגזר מאות ברמת ה-IP.
  חיבורים עם `disableCooling` מדלגים לחלוטין על הענף.
- **גרנולריות הנעילה משתנה עבור משפחת רשימת ההיתרים**: זהו שינוי תחום,
  ולא רק מיטוב של חיבורים אחים. opencode הוא ספק `passthroughModels`,
  ולכן לפני ענף זה שגיאת 429 יצרה נעילה לכל MODEL בנפרד; כעת היא יוצרת
  צינון לחיבור — גם עבור מפעיל שמריץ חיבור יחיד ללא חיבור אח כלל. זו
  הגרנולריות שטבלת הכללים של opencode כבר מגדירה כנכונה
  (`scope: "connection"`,‏
  `providerErrorRules.ts`), אך היא מעולם לא כובדה עד כה משום ש-opencode אינו
  נמצא ב-`HONORS_RULE_LOCK_SCOPE_PROVIDERS`. הענף כותב בעצמו את הצינון ואת
  `backoffLevel` של החיבור שנכשל, תוך שיקוף הענף של agentrouter המוגדר ברמת
  החיבור, ואז חוזר — החסימה לכל מודל והנתיב הכללי שבהמשך לעולם אינם מתבצעים.
- **גם קומבו נכלל**: בדומה לענף של agentrouter, התחום מתעלם במכוון מההנמכה
  של `persistUnavailableState`/`isCombo` שמבצע קורא קומבו עבור 429. נעילה
  לכל מודל אינה גרסה חלשה יותר של תחום זה, אלא יחידה שגויה: היא אינה אומרת
  דבר על ה-IP שמכסתו מוצתה, ולכן סבב הקומבו ימשיך לבזבז קריאה אחת שכישלונה
  מובטח עבור כל חיבור אח.
- **בטיחות חיבורים אחים**: חיבור אח שכבר נמצא במצב סופי
  (חסום/מכסת הקרדיטים מוצתה), או שכבר נמצא בצינון ארוך יותר, לעולם אינו
  נדרס.
- **רשימת היתרים בלעדית**: הרחבת `EGRESS_BUCKETED_LOCK_PROVIDERS` היא החלטה
  מפורשת של הבעלים; אין חיווט כללי (דפוס #10334/#10419). שאילתת החיבורים
  האחים קושרת את אותה רשימת היתרים במקום לחזור עליה כליטרל SQL, כך שהרחבתה
  נשארת שינוי של שורה אחת.
- **סבב כתובות IP יוצאות, בשני הכיוונים**: חלון החיפוש (24 שעות) רחב בהרבה
  מה-TTL של מטמון כתובות ה-IP היוצאות (5 דקות), ולכן "כתובת ה-IP הידועה
  האחרונה" היא היסטוריה, לא מצב נוכחי. אם ה-proxy של חיבור התחלף במהלך
  החלון, הנעילה עלולה **להחמיץ** כתובת IP שבאמת משותפת (כתובת ה-IP הרשומה
  היא החדשה, שמכסתה לא מוצתה) — ובאופן סימטרי היא עלולה **לצנן חיבור אח
  שמאז עבר לכתובת אחרת** ואינו משתמש עוד בכתובת ה-IP שמכסתה מוצתה. המקרה
  השני עולה לאותו חיבור אח בחלון צינון אחד; שני המקרים מתקבלים כמגבלות של
  מאמץ מיטבי בחיפוש המבוסס על היסטוריה.
- **עלות**: שתי סריקות תחומות של `proxy_logs` (מסוננות לפי חלון באמצעות
  `idx_pl_timestamp`), ורק בתדירות של שגיאות 429. אין אינדקס חדש (מיגרציה
  134,‏ YAGNI). נמדד על עותק מסד נתונים בגודל בינוני עם תעבורה אמיתית;
  מופע בעל תפוקה גבוהה מחזיק מספר שורות גדול יותר באופן יחסי באותו חלון.

---

## תכונות עמידות נוספות

- **19 אסטרטגיות ניתוב** (עדיפות, משוקלל, סבב מחזורי, העברת הקשר, מילוי תחילה, p2c, אקראי, הכי פחות בשימוש, מיטוב עלויות, מודעות לאיפוס, חלון איפוס, מרווח פנוי, אקראי מחמיר, אוטומטי, lkgp, מיטוב הקשר, מיטוב מטמון, מיזוג, צינור עיבוד) — ראו [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **ניתוב מודע לאיפוס** (v3.8.0) — מתעדף חיבורים לפי מועד איפוס המכסה.
- **הפחתת יכולות במצב רקע** — Responses API עם `background: true` מופחת לפעולה סינכרונית בצירוף אזהרה.
- **זיהוי דינמי של מגבלת כלים** — מפחית שימוש בספקים כאשר מגיעים למגבלת מספר הכלים.
- **חלופת חירום** — נשלטת באמצעות `OMNIROUTE_EMERGENCY_FALLBACK`; מפעילים יכולים לעקוף אותה מדף דגלי התכונות ללא הפעלה מחדש.

---

## ניפוי שגיאות

- קומבו משוקלל מחזיר `503 all_targets_cooling_down` (הכותרת `Retry-After` מוגדרת, ו-`diagnostics.excluded` מפרט כל יעד עם `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → המאגר מוגדר ומחובר, אך כל יעד מוחרג על ידי טיימר עמידות; האזהרה `[COMBO] Weighted selection: every target excluded before dispatch — …` מציינת את הסיבות ואת מספר השניות שנותרו. תגובת `404 no_executable_targets` מאותו קומבו פירושה שלא היה מעורב טיימר עמידות (אין מה להריץ, או שכל החשבונות נכשלו בבדיקת הזמינות). מובנה ב-`open-sse/services/combo/pinRecovery.ts` מתוך ההחרגות שנאספו ב-`targetResolution.ts`.
- כל המפתחות של ספק מסוים דולגו → יש לבדוק גם את מצב מפסק המעגל וגם את `rateLimitedUntil`/`testStatus` של כל חיבור.
- ספק מוחרג לצמיתות לאחר חלון האיפוס → הקוד קורא את `state` הגולמי במקום את `getStatus()`/`canExecute()`.
- מפתח אחד נכשל, אך האחרים אמורים לעבוד → יש להעדיף תקופת צינון של החיבור על פני מפסק מעגל.
- רק מודל אחד נכשל → יש להעדיף נעילת מודל על פני תקופת צינון של החיבור.
- המצב אמור להתאושש מעצמו אך אינו עושה זאת → יש לבדוק חותמת זמן עתידית וכן נתיב קריאה שמרענן מצב שפג תוקפו. סטטוסים קבועים דורשים שינויים ידניים.

---

## טביעת אצבע של TLS והסוואה

הסוואה ייעודית לספקים (JA3/JA4, CCH, ערפול) מתועדת בנפרד — ראו `docs/security/STEALTH_GUIDE.md` (ב-git; אינו מהודר לתוך `/docs`).

---

## בדיקות עמידות (שלב 8 · מקטע C)

מעבר לבדיקות יחידה של לוגיקת העמידות, שלוש בדיקות בוחנות את סביבת הריצה תחת
תנאי עומס/כשל אמיתיים (כולן בדיקות אינטגרציה/ליליות — אף אחת אינה חוסמת בקשות משיכה):

| בדיקה       | מה נבדק                                                                                                                                            | הרצה                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| כאוס        | צומת דמה במעלה הזרם מזריק השהיה/איפוס/פסק זמן/503 אמיתיים; מוודא שמפסק הזרם נפתח/מתאושש וש-`checkFallbackError` מסווג 503 כחלופה הניתנת להתאוששות. | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| גידול ערימה | כ-500 זרמים לכל `createSSEStream` תחת `--expose-gc`; נכשל אם הערימה גדלה מעבר לתקרה (הגנת OOM מס' 3069).                                           | `npm run test:heap`                   |
| השריית k6   | עומס מתמשך מול `/api/monitoring/health`; ערכי סף של p95/שגיאות.                                                                                    | `k6 run tests/load/k6-soak.js` (לילי) |

התזמור מתבצע באמצעות `.github/workflows/nightly-resilience.yml` (cron + הפעלה ידנית). במסגרת
ברירת המחדל `test:integration`, בדיקות הכאוס והערימה מדלגות על עצמן (ללא `RUN_CHAOS_INT`/`--expose-gc`).

---

## ראו גם

- [מדריך ארכיטקטורה](./ARCHITECTURE.md) — ארכיטקטורת המערכת והמנגנונים הפנימיים
- [מדריך למשתמש](../guides/USER_GUIDE.md) — ספקים, שילובים, אינטגרציית CLI
- [מנוע השילובים האוטומטי](../routing/AUTO-COMBO.md) — דירוג לפי 16 גורמים, חבילות מצבים
