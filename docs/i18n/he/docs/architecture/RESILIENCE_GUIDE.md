# Resilience Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

ל-OmniRoute יש שלושה מנגנוני עמידות נפרדים אך קשורים. לכל אחד מהם תחום פעולה ומטרה שונים. יש להתייחס אליהם בנפרד בעת ניפוי שגיאות בהתנהגות הניתוב.

![מודל עמידות בן 3 שכבות](../diagrams/exported/resilience-3layers.svg)

> מקור: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. מפסק מעגל ברמת הספק

**תחום:** הספק כולו (למשל, `glm`, `openai`, `anthropic`).

**מטרה:** להפסיק לשלוח תעבורה לספק שנכשל שוב ושוב ברמת השירות או המערכת במעלה הזרם.

**מימוש:**

- מחלקת ליבה: `src/shared/utils/circuitBreaker.ts`
- חיווט: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API לבדיקת מצב: `GET /api/monitoring/health`
- API לאיפוס: `POST /api/resilience/reset`
- מעטפות: `open-sse/services/accountFallback.ts`
- טבלת מסד נתונים: `domain_circuit_breakers`

**מצבים:**

- `CLOSED` — תעבורה רגילה מותרת
- `DEGRADED` — התעבורה עדיין מותרת, אך מתבצע מעקב אחר שיעור מוגבר של כשלי ספק
- `OPEN` — הספק חסום זמנית; ניתוב משולב מדלג עליו
- `HALF_OPEN` — פג זמן ההמתנה לאיפוס; בקשת בדיקה מותרת

**ברירות מחדל הניתנות להגדרה (`open-sse/config/constants.ts`, זמינות בלוח הבקרה ← הגדרות ← עמידות):**

| סיווג   | מעבר למצב פגום לאחר | פתיחה לאחר | זמן המתנה לאיפוס |
| ------- | ------------------- | ---------- | ---------------- |
| OAuth   | 5 כשלים             | 8 כשלים    | 60s              |
| API-key | 7 כשלים             | 12 כשלים   | 30s              |
| מקומי   | נגזר                | 2 כשלים    | 15s              |

`degradationThreshold` קובע מתי ספק נכנס למצב `DEGRADED`;‏ `failureThreshold` קובע מתי המעגל נפתח והספק נעקף. פרופילים של ספקים מקומיים עדיין אינם זמינים בדף הגדרות העמידות.

**קודי הפעלה:** רק סטטוסים ברמת הספק `[408, 500, 502, 503, 504]`. אין להפעיל את מפסק המעגל בעקבות שגיאות ברמת החשבון (רוב שגיאות 401/403/429 — אלה שייכות לתקופת צינון או לנעילה).

**התאוששות עצלה:** כאשר תוקף המצב `OPEN` פג, הפונקציות `getStatus()`, `canExecute()`, `getRetryAfterMs()` מעדכנות את המצב ל-`HALF_OPEN`. אין צורך בטיימר ברקע.

---

### תקופת צינון גלובלית אופציונלית לספק (שער חלון)

שכבה רביעית, **אופציונלית** (`PROVIDER_COOLDOWN_ENABLED`, כבויה **כברירת מחדל**), שומרת
ב-`open-sse/services/providerCooldownTracker.ts` זיכרון חוצה-בקשות של ספקים שנכשלו.
מנגנון פתרון היעדים של ניתוב משולב נעזר בו, כך שבקשות משולבות רצופות מפסיקות
לעבור שוב על ספק שזה עתה נכשל. רשומות ברמת הספק מצייתות לשער החלון של `PROVIDER_PROFILES`:

| פרופיל   | מופעל לאחר (`providerFailureThreshold`) | בתוך (`providerFailureWindowMs`) | מתקרר למשך (`providerCooldownMs`) |
| -------- | --------------------------------------: | -------------------------------: | --------------------------------: |
| OAuth    |                                    `10` |                          `15min` |                            `5min` |
| מפתח API |                                    `15` |                          `30min` |                           `10min` |

מתחת לסף, הספק **אינו** נחשב כמצוי בתקופת צינון; הצלחה מנקה
את החלון. רשומות ברמת החיבור (`provider:connectionId`) ממשיכות להשתמש
בהשהיה המעריכית `minRetryCooldownMs → maxRetryCooldownMs`. דריסות:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
בדיקת הגנה מפני רגרסיה: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. תקופת צינון של חיבור

**תחולה:** חיבור/חשבון/מפתח יחיד של ספק.

**מטרה:** לדלג על מפתח בעייתי אחד, בזמן שחיבורים אחרים של אותו ספק ממשיכים לשרת בקשות.

**מימוש:**

- סימון כלא זמין: `src/sse/services/auth.ts::markAccountUnavailable()`
- בחירה: `getProviderCredentials*` באותו קובץ
- חישוב תקופת הצינון: `open-sse/services/accountFallback.ts::checkFallbackError()`
- הגדרות: `src/lib/resilience/settings.ts`

**שדות לכל חיבור:**

- `rateLimitedUntil` — חותמת זמן שעד אליה נמשכת תקופת הצינון
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — מונה השהיה מעריכית

**תקופות צינון כברירת מחדל:**

- בסיס OAuth:‏ 5 שניות
- בסיס מפתח API:‏ 3 שניות
- 429 של מפתח API: מעדיף כותרות `Retry-After`/איפוס במעלה הזרם/טקסט איפוס שניתן לניתוח
- השהיה: `baseCooldownMs * 2 ** failureIndex`

**הגנה מפני עומס מתפרץ:** מונעת מכשלים מקביליים להאריך יתר על המידה את תקופת הצינון או להגדיל את `backoffLevel` פעמיים.

**מצבים סופיים (אינם תקופות צינון):**

- `banned` — מוגדר בעקבות זיהוי מילת מפתח של חסימה / חסימת חשבון (ראו [BAN_DETECTION](../security/BAN_DETECTION.md)), וכן בעקבות שלושה סירובים רצופים במעלה הזרם לכל בקשה (`request_rejected`, לדוגמה Anthropic OAuth 403‏ "הבקשה אינה מורשית" — `open-sse/services/requestRejectedStreak.ts`); סירוב יחיד רק מכניס את החיבור לתקופת צינון
- `expired` (עובר למצב סופי לאחר מספר מוגבל של ניסיונות חוזרים — `EXPIRED_RETRY_MAX = 3` עם השהיה מעריכית — כך ששגיאות OAuth חולפות יכולות להיפתר מעצמן לפני שהחשבון מושבת לצמיתות)
- `credits_exhausted`

מצבים אלה נשמרים עד שפרטי הגישה משתנים או שמפעיל מאפס אותם. אין לדרוס מצבים סופיים במצב צינון זמני.

**התאוששות עצלה:** כאשר `rateLimitedUntil` חלף, החיבור חוזר להיות כשיר. לאחר שימוש מוצלח, `clearAccountError()` מנקה את כל שדות השגיאה.

### מחסום השימוש של Claude OAuth: נתיב בעדיפות נמוכה יותר + איפוס מגבלת הפעלה

**תחולה:** חיבור מנוי Claude‏ (OAuth) אחד. שתי התכונות הן **לפי הצטרפות מפורשת לכל
חיבור** (עריכת חיבור ← מקטע Claude ←‏ `lowPriorityMode` / `autoLimitReset` בתוך
`providerSpecificData`, שתיהן כבויות כברירת מחדל) ומשקפות את הפקודות `/low-priority` ו-
`/limit-reset` של Claude Code (חוזה התקשורת תועד מתוך Claude Code 2.1.263).

**מימוש:**

- מכונת מצבים + סיווג תגובות: `open-sse/services/claudeLowPriority.ts`
- לקוח מצב/דרישת איפוס: `open-sse/services/claudeLimitReset.ts`
- נקודת חיבור למבצע (הזרקת כותרת + ניסיון חוזר באותו חשבון): `open-sse/executors/base.ts::execute()`
- שמירת ההצטרפות המפורשת: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**גורם מפעיל:** מחסום השימוש של 5 שעות — תגובת `429` שהכותרות שלה כוללות
`anthropic-ratelimit-unified-status: rejected`, וכאשר החשבון כשיר,
`anthropic-ratelimit-unified-slow-offer: treatment`. דבר אינו נשלח לפני תגובת 429 הראשונה של
המחסום; תגובת 429 מתפרצת ללא כותרות מאוחדות עוברת בנתיב הצינון הרגיל.

**נתיב בעדיפות נמוכה יותר** (`lowPriorityMode`):

- בתגובת 429 של המחסום, המבצע מקבל את ההצעה ומנסה מיד שוב עם **אותו**
  חשבון ועם `anthropic-usage-limit: slow`; הנתיב נשאר פעיל עד המועד שהוכרז באמצעות
  `anthropic-ratelimit-unified-reset` (בתוספת מרווח של 60 שניות), וכל בקשה בחלון זמן זה כוללת
  את הכותרת. תגובת 429 שיורטה לעולם אינה מגיעה אל `handleChatCore`, ולכן החיבור
  **אינו** נכנס לתקופת צינון ואינו מוחלף.
- `anthropic-ratelimit-unified-slow-status` בתגובות מאוחרות יותר: `active` / `not_needed`
  משאירים את הנתיב פעיל; `slot_busy` ‏(429) או `529` ממתינים למשך הזמן שהשרת מציין באמצעות
  `anthropic-ratelimit-unified-slow-retry-after` (ברירת מחדל של 20 שניות, הגבלה ל-5–600 שניות, שונות אקראית של ±30%)
  ומנסים שוב, בכפוף ל-`anthropic-ratelimit-unified-slow-max-wait` (ברירת מחדל של 20 דקות, הגבלה
  לדקה אחת–6 שעות) — לאחר מכן הנתיב מסתיים ותקופת המתנה של 10 דקות חוסמת קבלה מחדש. בנוסף,
  זמן ההמתנה מוגבל לזמן שנותר עד לתפוגת הזמן להתחלת הבקשה במעלה הזרם
  (`resolveFetchStartTimeout`, ברירת מחדל של 10 דקות), פחות מרווח של 5 שניות: ללא מגבלה זו,
  זמן ההמתנה המרבי של 20 דקות כברירת מחדל היה נמשך מעבר לחיי הבקשה, וההמתנה הייתה מבוטלת
  באמצע, תוך חשיפת `TimeoutError` במקום סיום תקין מסוג `max_wait` + תקופת המתנה.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, מעבר לחלון חדש של 5 שעות, או
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (שמסיים את הנתיב בתור
  `extra_usage` בכל מצב, מכיוון ששימוש עודף בתשלום מכסה כעת את המחסום) מסיימים את הנתיב;
  לאחר מכן התגובה ממשיכה אל נתיב הצינון הרגיל. `budget_exhausted` נשמר בזיכרון עד
  לאיפוס התקציב שהוכרז (≤ 8 ימים).
- בדיקת המחסום מתבצעת לאחר הניסיונות החוזרים בתוך אותו ניסיון של המבצע, המופעלים בעקבות 400 (עריכת
  הקשר, הגבלות חשיבה/מאמץ, למידה אוטומטית של פרמטרים), כך שתגובת 429 של המחסום שמופיעה רק
  באחד מהניסיונות החוזרים האלה עדיין מיורטת במקום להגיע אל נתיב הצינון.
- המצב נשמר בזיכרון לכל חיבור (הפעלה מחדש גורמת לתגובת 429 נוספת אחת של המחסום לצורך קבלה מחדש).

**איפוס מגבלת הפעלה** (`autoLimitReset`, מתבצע לפני הנתיב כאשר שניהם מופעלים):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` ← הבלוק `juniper_tide`;
  כאשר `arm: "reset"` וגם `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` עם
  `{ "program": "juniper_tide" }` (מזהה UUID של הארגון מתוך
  `providerSpecificData.organizationUUID`, עם חלופת אתחול).
- `result: reset|not_limited` ← הבקשה מנוסה שוב במהירות מלאה (ללא הכותרת `slow`).
  `already_used` / `not_offered` שומרים בזיכרון את `next_available_at` (ברירת מחדל של שבוע);
  כל כשל מפעיל השהיה של 15 דקות. האיפוס מתבצע פעם בשבוע ועדיין נספר כחלק מהמגבלה
  השבועית.

בדיקות למניעת רגרסיה: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### שיוך קבוע להפעלה (#7274)

**תחולה:** הפעלת לקוח אחת (כותרת `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) המוצמדת לחיבור אחד, עבור **כל** ספק.

**מטרה:** להשאיר סוכן רב-סבבי (Claude Code,‏ aider, סוכנים מותאמים אישית) באותו חשבון לאורך בקשות, וכך לצמצם אובדן הקשר בין חשבונות ושגיאות 429 חוזרות של אתחול קר אצל ספקים בעלי מצב הפעלה ברמת החשבון.

**מימוש:**

- פתרון TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- בחירה/יצירה של הצמדה: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- חילוץ כותרת (כללי, לכל ספק): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- טבלת הצמדות מתמשכת: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- הגדרה: `sessionAffinityTtlMs` (TTL גלובלי באלפיות השנייה, `0` משבית) — `src/lib/db/settings.ts`. שמה שונה מהשם `codexSessionAffinityTtlMs`, שהיה ייחודי ל-Codex, באמצעות המיגרציה `124_generic_session_affinity_ttl.sql`, שמעבירה כל TTL של Codex שהוגדר בעבר כברירת המחדל החדשה.

לפני #7274, הפונקציה `resolveSessionAffinityTtlMs()` הפסיקה מיידית את פעולתה והחזירה `0` עבור כל ספק מלבד `codex`, ולכן להגדרת ה-TTL (ולכותרות ההפעלה) לא הייתה השפעה בשום מקום אחר, אף שמנגנון ההצמדה וחילוץ הכותרות כבר היו בלתי תלויים בספק. התיקון הסיר את ההחזרה המוקדמת הזו; ה-TTL חל כעת באופן אחיד על כל ספק לאחר שהוא מוגדר גלובלית לערך הגדול מ-`0`.

שלוש כותרות הזיקה להפעלה לעולם אינן מועברות לספק במעלה הזרם — רכיבי ההרצה בונים בעצמם את הכותרות למעלה הזרם מאפס, במקום להעביר את כותרות הלקוח כפי שהן, ולכן הן נשארות מזהה התאמה פנימי בלבד.

### חכירוֹת בלעדיות של חיבורי הפעלה מנוהלים

**תחולה:** לקוח HTTP/הפעלה מנוהל ופעיל אחד מחזיק בחיבור OmniRoute כשיר אחד.

**מטרה:** לספק בעלות בלעדית ועמידה על חיבור עבור לקוחות הזקוקים לגבול ניתוב קשיח
בין בקשות. מנגנון זה שונה מזיקה להפעלה, שהיא העדפה רכה להמשכיות:
חכירה בלעדית שומרת את מצב מחזור החיים ב-SQLite, אוכפת ייחודיות גלובלית של בעלים פעיל ושל
חיבור פעיל, ודוחה דור מיושן לפני השיגור לספק.

התכונה מופעלת במפורש לכל מפתח API. למפתח מנוהל חייבת להיות ההרשאה `lease:exclusive` וכן
רשימת `allowedConnections` מפורשת שאינה ריקה. כל לקוח HTTP יכול להשתמש בנקודת הקצה של מחזור החיים; לא
נדרשים שם לקוח, user-agent, ספק, שיטת OAuth או מודל. החכירה מחזיקה בחיבור,
לא במודל, ולכן שינוי מודל משמר את השיוך כל עוד החיבור נשאר כשיר
באופן רגיל. כללי המודל, המכסה, התקינות, תקופת הצינון ורשימת ההיתרים הרגילים נשארים סמכותיים ועשויים
להעביר את אותו דור לחיבור כשיר ופנוי אחר.

מחזור החיים הוא `POST /api/v1/session-leases` עם פעולות JSON מסוג `acquire`,‏ `renew` ו-`release`.
בקשות הסקה מנוהלות מציגות את הערך האטום `X-OmniRoute-Lease-Owner` ואת
`X-OmniRoute-Lease-Generation` המדויק. המזהה של הבעלים מתחיל ב-`vlo_` ואחריו 43 תווי base64url; רק
גיבוב ה-SHA-256 שלו נשמר. כל גדר שיגור סופית קושרת גם את מזהה מפתח ה-API המאומת ואת
מזהה החיבור הפעיל. כותרות בקרת החכירה מוסרות מיומנים, מתצלומי מצב שמורים של בקשות ומכותרות
רכיבי ההרצה למעלה הזרם.

אם לניתוב רגיל יש מועמדים מנוהלים כשירים, אך כל מועמד פנוי תפוס בידי
חכירה פעילה זרה, OmniRoute מחזיר HTTP `429`, קוד lease-capacity-unavailable,
מצב המתנה לקיבולת ו-`Retry-After` מוגבל הנגזר ממועד התפוגה הרלוונטי המוקדם ביותר.
מצב רגיל שבו אין אפשרויות כשירות אינו תחרות על חכירה ושומר על סמנטיקת שגיאות הניתוב הקיימת שלו.

מנגנונים קשורים נשארים נפרדים:

- תפוסת הפעלות OAuth היא חלוקה רכה ומקומית לתהליך עבור חשבונות OAuth.
- סמפורים של חשבון מעניקים היתרי מקביליות לבקשות ומסתיימים כאשר בקשה מושלמת.
- חכירוֹת בלעדיות של הפעלות מנוהלות הן בעלות מתמשכת לאורך מחזור החיים, עם גדר דור.

---

## 3. נעילת מודל

**תחולה:** שלישיית ספק + חיבור + מודל.

**תחולת המפתח לפי סטטוס:** הסטטוס שנכשל קובע לאיזה מפתח תיכתב נעילה
(`resolveLockoutScope()` ב-`open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — אות למכסה או לזכאות — נועלים את **משפחת המכסה**:
  עבור codex, את כל התחום `codex` / `spark` (כל מודל `gpt-5*` של
  החיבור); עבור ספקים אחרים, `getQuotaScopedModelForProvider()`.
- `404` נועל את המודל הבסיסי (`getModelLockKey()` מצמצם את `not_found`).
- כל סטטוס אחר — כשלי תעבורה/שרת מסוג `5xx` וה-`502` המסונתז של OmniRoute
  שנוצר מאימות איכות — נועל רק את השלישייה **המדויקת**
  של ספק/חיבור/מודל. זרם פגום במודל אחד אינו מעיד על המכסה של החשבון;
  לפני כלל זה, תגובה ריקה אחת ב-`codex/gpt-5.6-luna` הסירה מהניתוב את כל
  מודלי `gpt-5*` של אותו חיבור למשך 2–30 דקות (בהסלמה), בעוד שהמכסה שלו
  לא הושפעה.
- האפשרות המפורשת `scope` שמועברת בידי הקורא תמיד גוברת (Antigravity מעביר `"exact"`).

**מטרה:** להימנע מהשבתת חיבור שלם כאשר רק מודל אחד אינו זמין או מוגבל במכסה.

**דוגמאות:**

- ספקים עם מכסה נפרדת לכל מודל שמחזירים 429
- ספקים מקומיים שמחזירים 404 עבור מודל חסר אחד
- כשלי הרשאה למצבים/מודלים הייחודיים לספק (למשל, מצבי Grok)

**מימוש:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### לוח הבקרה של זמני ההמתנה למודלים (v3.8.0)

ממשק משתמש: הגדרות ← זמני המתנה למודלים (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

מציג נעילות פעילות עם: ספק, חיבור, מודל, סיבה, `expiresAt`. מפעילים יכולים להפעיל מחדש מודל באופן ידני מתוך הכרטיס.

**REST API:**

- `GET /api/resilience/model-cooldowns` — הצגת נעילות פעילות
- `DELETE /api/resilience/model-cooldowns` — הפעלה מחדש ידנית. גוף: `{provider, connection, model}`. אימות: ניהול.

### ממשק הגדרות נעילה + התאוששות באמצעות דעיכה בעקבות הצלחה (v3.8.23)

נעילת מודלים עברה מהתנהגות קשיחה שפועלת תמיד לתכונה הניתנת להגדרה מלאה,
הדורשת הפעלה מפורשת וכוללת נתיב התאוששות שמתקן את עצמו.

**כרטיס הגדרות:** הגדרות ← נעילת מודל
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
כרטיס זה **נפרד** מ-`ModelCooldownsCard` לקריאה בלבד שלעיל (שרק
_מציג_ נעילות פעילות) — הכרטיס החדש _מגדיר את הפרמטרים_. ברירות המחדל
נמצאות ב-`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| הגדרה                   | ברירת מחדל                       | משמעות                                               |
| ----------------------- | -------------------------------- | ---------------------------------------------------- |
| `enabled`               | `false`                          | מתג ראשי — נעילת מודלים **כבויה כברירת מחדל**.       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | סטטוסים מהשירות במעלה הזרם שנחשבים לכשל ברמת המודל.  |
| `baseCooldownMs`        | `120_000` (120 שניות)            | משך הנעילה הראשוני עבור הכשל הראשון.                 |
| `maxCooldownMs`         | `1_800_000` (30 דקות)            | הגבול העליון של זמן ההמתנה לאחר הסלמה.               |
| `maxBackoffSteps`       | `10`                             | המספר המרבי של שלבי הסלמה בהשהיה מעריכית.            |
| `useExponentialBackoff` | `true`                           | האם כשלים חוזרים מסלימים את זמן ההמתנה באופן מעריכי. |

ההגדרות נשמרות באמצעות מאגר ההגדרות הרגיל ועוברות אימות באמצעות סכמת
הגדרות החוסן; הכרטיס מגביל את `baseCooldownMs`/`maxCooldownMs`
(כאשר `maxCooldownMs ≥ baseCooldownMs`) ואת `maxBackoffSteps`.

**התאוששות באמצעות דעיכה בעקבות הצלחה:** ההתאוששות **אינה** מבוססת רק על תפוגת טיימר. תגובה
תקינה מפחיתה בהדרגה את מונה הכשלים של המודל, כך שמודל שהתאושש
באמצע החלון מפסיק להסלים (והנעילה שלו מתבטלת) לפני שהטיימר שלו היה מסתיים. לאחר הצלחה
ביעד משולב, `open-sse/services/combo.ts` קורא ל-`decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), אשר **מחלק בשתיים** את
`failureCount` השמור (`Math.floor(failureCount / 2)`); כאשר הוא מגיע ל-`0`, רשומת הנעילה
נמחקת לחלוטין. הפונקציה המקבילה `recordModelLockoutFailure()`
מגדילה את המונה (ומסלימה את זמן ההמתנה) בעקבות כשלים בתוך
חלון ההסלמה. דעיכה זו בעקבות הצלחה מתווספת לתפוגת הטיימר הרגילה —
כל אחד מהנתיבים יכול להפעיל מחדש מודל.

**מצב:** הנעילות נשמרות **בזיכרון** (`Map`-ים נפרדים לכל תהליך של
`ModelLockoutEntry`, עם מפתחות בתבנית `provider:connectionId:model`; נעילות בתחום המדויק משתמשות
ב-`provider:connectionId:exact:model`), ואינן נשמרות
במסד הנתונים — הן אובדות בעת הפעלה מחדש. ה_הגדרות_ נשמרות; _מצב_ הנעילות
הפעילות הוא זמני.

---

## 4. בקרת מקביליות בשיתוף מכסה (v3.8.36)

חשבונות מנוי (GLM, MiniMax וכו׳) מקבלים לעיתים קרובות רק כ־1–3 בקשות
בו־זמנית; חריגה מכך גורמת לשגיאות 429 ולתקופות צינון. הבעיה חריפה במיוחד
בשילובי **שיתוף מכסה** (`qtSd/…`), שבהם כמה מפתחות API חולקים חשבון
במעלה הזרם. שלוש שכבות מונעות הצפה של חשבון משותף.

### מגבלת מקביליות לכל חיבור (`max_concurrent`)

כל חיבור לספק יכול להגדיר תקרה של `max_concurrent`
(`provider_connections.max_concurrent`, המוגדרת בחלונית החיבור / API / מסד הנתונים).
יש להשאיר אותה ריקה כדי שלא תהיה מגבלה. זהו הבורר היחיד שמניע את שכבת הסדרת
הבקשות שלהלן — יש להגדיר אותו לפי המקביליות האמיתית של החשבון (למשל GLM כ־1, MiniMax כ־2).

### הסדרת בקשות בשיתוף מכסה

כאשר ניתוב בשיתוף מכסה מופנה לחיבור שמגדיר ערך חיובי של
`max_concurrent`, בקשות מקבילות לאותו **חשבון** מוסדרות באמצעות
סמפור לכל חיבור (מפתח `qsconn:<connectionId>`): בקשות עודפות **ממתינות
בתור** במקום להציף את החשבון. המנגנון הוא **fail-open** — במקרה של תור רווי
או פסק זמן, הבקשה ממשיכה ללא מקום מוקצה, במקום לדחות אי־פעם בקשה שניתנת
לניתוב. ניתן להפעיל או להשבית זאת תחת **הגדרות → עמידות → מקביליות לכל חיבור
בשיתוף מכסה** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, מופעל
כברירת מחדל). ללא מגבלת `max_concurrent`, ההתנהגות אינה משתנה.

> שער הניתוב של שיתוף המכסה (`selectQuotaShareTarget`,‏ DRR + P2C) הוא עצמו
> fail-open ורק מעניק _עדיפות נמוכה יותר_ לחיבור שהגיע למגבלה — במאגר
> הכולל חיבור יחיד הוא אינו יכול לאכוף מגבלה קשיחה, ולכן הסמפור הזה הוא שמרסן
> בפועל את ההצפה.

### ניסיון חוזר המודע לתקופת הצינון של שילוב

בכל אסטרטגיית שילוב (כאשר היא מופעלת), בקשה שהייתה מקבעת שגיאת 429
עקב תקופת צינון ארעית וקצרה ממתינה לסיומה ומנותבת מחדש במקום
להחזיר את שגיאת ה־429 — הדבר מכסה חלונות TPM/RPM מסוג Gemini (כ־60 שניות לפי retry-after)
בשילובים מרובי־מודלים, למשל כאשר שני היעדים בשילוב של שני מודלים מגיעים למגבלת
קצב לכל מודל. ההתנהגות מוגבלת באמצעות `comboCooldownWait` (`enabled`,‏ `maxWaitMs`,‏ `maxAttempts`,
`budgetMs`) תחת **הגדרות → עמידות**. היא לעולם אינה ממתינה עבור `quota_exhausted`
(נעול עד חצות) או מסיבות אימות/לא־נמצא.

---

## 5. בקרת קבלה לתור הבקשות (v3.8.49 · סוגיה #6593)

**תחולה**: תור הגבלת הקצב המקומי לכל ספק+חיבור (`open-sse/services/rateLimitManager.ts`,
המבוסס על Bottleneck), שכבה אחת מתחת לשלושת המנגנונים שלעיל.

**`maxWaitMs` מגביל את ההמתנה בתור; `executionMaxWaitMs` מגביל את הביצוע.**
השניים מופרדים במכוון, ואף אחד מהם אינו מזין את האחר.

`resilienceSettings.requestQueue.maxWaitMs` הוא **תקציב ההמתנה בתור**: הוא
כולל המתנה למקום פנוי אצל הספק ולאחר מכן שהייה במצב QUEUED, והטיימר שלו
מבוטל ברגע שהמשימה יוצאת ממצב QUEUED ומתחילה להתבצע
(`rateLimitManager.ts`,‏ `wrappedFn`). בקשה שחורגת ממנו לעולם אינה מגיעה
לשירות במעלה הזרם. ברירת המחדל היא 30000ms, והיא מסופקת על ידי `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
בקובץ `src/lib/resilience/settings.ts` ומקובעת באמצעות
`tests/unit/ratelimit-admission-control-6593.test.ts`, כך ששינוי שלה יגרום
לכישלון הבדיקה במקום להשאיר פסקה זו מיושנת בלי התראה.

`resilienceSettings.requestQueue.executionMaxWaitMs` הוא הערך ש־Bottleneck
מקבל בתור `expiration` של המשימה, שהטיימר שלו מתחיל רק לאחר הניתוב. הוא משמש
כרשת ביטחון עבור מנגנוני ביצוע שאין להם פסק זמן משלהם מול השירות במעלה הזרם, והוא
מוגדל לפסק הזמן של מנגנון הביצוע עצמו לתחילת ה־fetch כאשר זה ארוך יותר, כך שהוא
אינו יכול לקטוע תגובה תקינה שנמצאת בעיצומה. ברירת המחדל היא 600000ms (‏10 דקות).

הזנת תקציב התור אל `expiration` היא שגרמה בעבר להפסקת פעולתם של שערים לא־הדרגתיים
באמצע התהליך — הם פועלים באופן לגיטימי במשך דקות לפני הגעת הבתים הראשונים —
ולכן פקיעת תוקף מוצגת כ־`code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (‏HTTP 504), בעוד שתקציב התור נושא את
קוד פסק הזמן של התור. ניתן לדרוס כל אחד מהם באמצעות `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (משתנה סביבה) או דרך לוח הבקרה
(**הגדרות → עמידות**). שניהם מוגבלים לטווח של 1ms–24h בעת הנרמול.

**סדר קדימויות, עבור שניהם:** משתנה הסביבה מספק רק את _ברירת המחדל_. ערך
שנשמר ב־`resilienceSettings.requestQueue` (לוח הבקרה / תיקון API, נשמר
ב־`key_value`) גובר עליו, ו־`rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` לכל חיבור גובר גם עליו. לכן, הגדרת משתנה הסביבה בפריסה
שכבר קיים בה ערך שמור אינה משנה דבר — במקום זאת יש לנקות או לעדכן את ההגדרה השמורה.

משך השהייה בתור מוגבל באמצעות `maxWaitMs`; הערך `maxQueueDepth` שלהלן מגביל את
מספר הקוראים שיכולים להמתין בתור בו־זמנית.

**`maxQueueDepth` — מגבלת קבלה אופציונלית (חדשה).** `resilienceSettings.requestQueue.maxQueueDepth`
מגביל את מספר הבקשות שיכולות להמתין בתור (וטרם נותבו) עבור צמד אחד של
ספק+חיבור בכל רגע. כאשר התור כבר מכיל `maxQueueDepth`
בקשות, בקשה חדשה נדחית במהירות עם שגיאה מטיפוס
`code: "RATE_LIMIT_QUEUE_FULL"` **לפני** שהיא מגיעה אי־פעם אל `limiter.schedule()`
— כך שהדחייה זולה ומתרחשת לפני כל עבודת דחיסת הנחיה / תרגום
בהמשך הזרימה עבור אותה בקשה. ברירת המחדל `0` =
מושבת, וכך נשמרת ההתנהגות הקיימת של תור בלתי מוגבל; הטווח המותר הוא 0–100000.
ניתן לדרוס זאת באמצעות `RATE_LIMIT_MAX_QUEUE_DEPTH` (משתנה סביבה) או
`resilienceSettings.requestQueue.maxQueueDepth` (לוח הבקרה/תיקון API).

בדיקת הקבלה עצמה היא פונקציה טהורה
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), כך
שאפשר לבדוק אותה בבדיקת יחידה ללא מגביל Bottleneck אמיתי.

> ה-RFC שפתח את #6593 הציע גם דגל `bypassCompressionOnRateLimit`.
> צינור העיבוד `open-sse/services/compression/` במאגר זה מיועד לדחיסת
> prompt/context בבקשת ה-LLM היוצאת (`chatCore.ts`, סביב הבלוק
> `resolveCompressionSettings`/`selectCompressionStrategy`), ולא לדחיסת תגובת
> HTTP בגופי 429 שנוצרו — אין נתיב קוד תואם עבור דגל מעקף מילולי. שלב דחיסת
> ה-prompt הזה גם פועל כרגע _לפני_ `withRateLimit()` בצינור עיבוד הבקשות, ולכן
> שינוי הסדר כדי לדלג עליו במקרה של דחייה עקב תור מלא הוא שינוי נפרד וגדול
> יותר מהיקף הבעיה הזו; הוא **לא** מומש כאן במכוון, ונשאר כמשימת המשך אם
> החיסכון במשאבי CPU מצדיק את הסיכון שבשינוי הסדר.

---

## 6. מנגנון מעקב אחר תפוקה בזרם איטי (#9709)

מנגנון ההגנה האופציונלי `resilienceSettings.streamRecovery.throughputWatchdog` מזהה
מקור במעלה הזרם שעדיין שולח מקטעים, אך מפיק פלט עוזר בקצב הנמוך מקצב הפלט
השימושי שהוגדר. הוא נבדל במכוון מפסק הזמן בשל חוסר פעילות:
פעימות לב ומטא-נתונים אינם מאפסים אף אחד משני הטיימרים ואינם נחשבים להתקדמות. הוא גם
נבדל מהמועד האחרון הקשיח לניסיון (#9153), שנותר תקרת בטיחות מוחלטת
ללא קשר לאיכות הפלט.

מנגנון המעקב דורש תקופת חימום ואחריה חלון מתגלגל מלא לפני
שיוכל לבטל. הוא סופר הפרשי טקסט מאירועי הפלט של Chat Completions ושל Responses API
(אומדן שמרני של בתים ב-UTF-8), מתעלם מאירועים ריקים ומאירועים הכוללים שימוש בלבד,
ומשהה את ההערכה בזמן שאירועי קריאת כלים או הסקת מסקנות נמצאים בתהליך. הוא מושבת
כברירת מחדל וניתן להפעילו באמצעות `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
החלון, תקופת החימום, הקצב המינימלי וכמות הפלט המדידה המינימלית מוגבלים על ידי
שכבת הנרמול הרגילה של הגדרות העמידות.

כאשר הוא מופעל, ביטול על ידי מנגנון המעקב חל רק על הניסיון הפעיל מול המקור במעלה הזרם. לפני
שבתים כלשהם גלויים ללקוח, נתיב ההתאוששות המוקדמת הקיים באותו חשבון עשוי לפתוח מחדש
את הניסיון. לאחר האישור, הזרם לעולם אינו מופעל מחדש באופן עיוור; רק חוזה ההמשך
הבטוח הקיים באמצע הזרם יכול לחבר סיומת. הסיום נותר
חד-פעמי, כך שחשבונאות השימוש ושחרור הסמפור אינם מתבצעים פעמיים.

---

## 7. הצהרה מחדש על סטטוס המקור במעלה הזרם (שגיאות מכסה שדווחו באופן שגוי)

**תחום:** שער יחיד במעלה הזרם שמדווח על מיצוי זמני של המכסה באמצעות סטטוס HTTP שגוי.

**מטרה:** לתקן סטטוס מטעה לפני הסיווג, כדי שצרכנים במורד הזרם (מנוע הגיבוי, צבירת הקומבינציה והתגובה המוצגת ללקוח) יראו את אופיו האמיתי של הכשל, המאפשר ניסיון חוזר.

שערים מסוימים מאותתים על מיצוי זמני של המכסה באמצעות סטטוס HTTP
שאינו מאפשר ניסיון חוזר. `agentrouter.org` מחזיר `403` (ולעיתים `400`) עם גוף בסינית
(`用户额度不足` / `额度不足`) במקום `429` התקני. לקוחות כמו Claude
Code מתייחסים ל-`403` כאל שגיאה קבועה ומבטלים את ההפעלה, וללא התיקון
מנוע הגיבוי היה מסווג אותה כ-`AUTH_ERROR` במקום כאירוע
מכסה.

**מימוש:**

- מאגר + מתאם: `open-sse/config/upstreamStatusRestatement.ts` — רשימת
  כללים לכל ספק (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), המותאמים באמצעות `applyStatusRestatement()`.
- נקודת קריאה: הבלוק `providerFailure:` בתוך `open-sse/handlers/chatCore.ts`
  (בסביבות שורה 3654), מיד לאחר ש-`parseUpstreamError()` מנתח תגובה מהמקור במעלה הזרם
  עם סטטוס שגיאת HTTP (`!providerResponse.ok`), ולפני הרצת סיווג
  כלשהו, כך שכל צרכן במורד הזרם רואה את הסטטוס
  המתוקן. שגיאות המוטמעות בתוך זרם SSE עם `200` עוברות בנתיב נפרד
  ומאוחר יותר לניתוח הזרם, ו**אינן** מכוסות כיום על ידי נקודת החיבור הזו — זוהי
  מגבלה ידועה שעדיין אינה נחוצה עבור הסטטוס השגוי של agentrouter (שמופיע
  כסטטוס שגיאת HTTP).
- זכאות לניסיון חוזר: `429` נכלל בתוך `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), ולכן שגיאה שהסטטוס שלה הוצהר מחדש
  נושאת חלון ניסיון חוזר ממשי במקום להופיע כ-`403` חסר תועלת.
- הערך הסינתטי `60s` של `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  הוא רק מה שהתגובה שהסטטוס שלה הוצהר מחדש מודיעה ל**לקוח**; הוא אינו
  משך זמן הצינון/הנעילה הפנימי של החיבור עצמו — זה מנוהל
  בנפרד על ידי המנגנון שמטפל בפועל בשגיאה שהסטטוס שלה הוצהר מחדש
  (השהיה מדורגת של Connection Cooldown, סעיף 2, עם בסיס של `3s` עבור ספקים
  מבוססי מפתח API; או Model Lockout, סעיף 3, עבור ספקים עם מכסה לכל מודל כמו
  agentrouter). הנתב עשוי להיות זכאי לניסיון חוזר פנימי מוקדם יותר
  מחלון 60 השניות שהוא מפרסם ללקוח — זהו מרווח ביטחון מכוון,
  ולא באג.

שגיאות קבועות (`无权访问模型` של agentrouter — אין גישה למודל זה)
לעולם אינן עוברות הצהרת סטטוס מחדש: `excludeMarkers` מבטל את הכלל גם כאשר יש התאמה ל-`textMarkers`,
כך שהשגיאה שומרת על הסטטוס המקורי שלה ושום דבר אינו מנסה אותה שוב לנצח. כלל
הסיווג התואם של הספק
(`agentrouter-model-access-denied` בתוך `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, זמן צינון בסיסי מוצהר של `6h`) נבדק
על ידי `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_לפני_ ההחזרה המוקדמת הגנרית `FORBIDDEN` של קטגוריית apikey, בכפוף ל-
`honorsRuleLockScope(provider)` (#10334 — נכון לעכשיו בלעדי ל-agentrouter באמצעות
רשימת ההיתרים `HONORS_RULE_LOCK_SCOPE_PROVIDERS` בתוך
`providerErrorRules.ts`). זמן הצינון המוצהר של 6h בכלל מועבר בתור
`fallbackResult.baseCooldownMs`, אך הוא עדיין מוזן לנתיב הנעילה הקיים
עבור מכסה לכל מודל (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, שלא השתנה בעקבות #10334 מלבד מקור זמן הצינון):
הוא מוגבל כלפי מטה לערך `mlSettings.maxCooldownMs` של המפעיל
(ברירת המחדל היא `1_800_000ms` / 30 דקות), כמו כל נעילת מודל אחרת, ו-
_סיבת הנעילה הנשמרת_ נשארת הערך הקשיח הקיים `"forbidden"`,
ולא `"auth_error"` של הכלל — רק משך זמן הצינון מכובד
מקצה לקצה, ולא מחרוזת הסיבה. החיבור עצמו נשאר פעיל;
מודלים מקבילים באותו חיבור אינם מושפעים.

שגיאות מכסה שנוסחו מחדש (`额度不足`) מגיעות לכלל ספק בסביבת הייצור
(`agentrouter-user-quota-exhausted`:‏ `reason: "quota_exhausted"`,‏ `scope:
"connection"`, ללא תקופת צינון מוצהרת משלו — לכן ברירת המחדל של ההשהיה
המדורגת בשכבת ההתמדה חלה). מאז #10334, הערך `scope` של
`ProviderErrorRuleMatch` אכן נצרך מקצה לקצה, אך **רק** עבור ספקים הנמצאים
ברשימת ההיתרים `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
כיום רק `"agentrouter"`, מותנה באמצעות `honorsRuleLockScope()`). עבור כל
ספק אחר, `scope` נשאר מידע בלבד, בדיוק כפי שהיה לפני #10334.
`checkFallbackError` חושף את תחום הכלל שהותאם בתור
`fallbackResult.ruleScope`;‏ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) הוא מנגנון הבדיקה המשותף שמאשר כי
`ruleScope` אכן בטוח לכיבוד כאות ברמת החיבור, המתאושש מעצמו
(scope‏ `"connection"`, סיבה `quota_exhausted`, לעולם לא `permanent`,
ולעולם לא `creditsExhausted` — הגנה מפני כלל עתידי שישייך את scope
`"connection"` למצב חשבון קבוע). שני צרכנים קוראים לו:

- **התמדה** (`markAccountUnavailable()`,‏ `src/sse/services/auth.ts`):
  במקום להיכנס לענף הנעילה **לפי מודל** של ספק passthrough
  ‏(agentrouter הוא `passthroughModels: true` ← ‏`hasPerModelQuota()`
  מחזיר `true`), הוא מחיל **תקופת צינון זמנית על החיבור** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ולעולם לא מצב סופי
  (`credits_exhausted`/`banned`/`expired`) — כך שהחיבור מתאושש מעצמו
  לאחר שתקופת הצינון מסתיימת, במקום לדרוש איפוס ידני של פרטי האימות.
  הפעולה מדולגת עבור חיבורים עם `disableCooling: true` (#2997): ביטול זה
  גורם למעבר לענף הנעילה לפי מודל במקום זאת (פשרה מתועדת —
  ראו את הערת הקוד שמעל לענף).
- **ניתוב משולב באותה בקשה** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): אותו מנגנון בדיקה מסמן את
  החיבור בקבוצת `exhaustedConnections` שבזיכרון, עם המפתח
  `${provider}:${connectionId}`. הדבר מדלג רק על יעד שנותר **באותה בקשה**
  ושכבר נושא בעצמו את אותו `connectionId` בדיוק באובייקט היעד שלו
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`,‏ `if (provider &&
connectionId)` לפני החיפוש ב-`exhaustedConnections`) — שילוב רגיל של
  רשימת מודלים, שבו היעדים המקבילים אינם נושאים `connectionId` מקובע משלהם
  והוא נפתר רק בכל שיגור מתוך הכותרת
  `X-OmniRoute-Selected-Connection-Id` של התגובה, לעולם אינו מגיע להתאמה
  למפתח הזה. במקרה הנפוץ הזה, ההגנה האמיתית מפני שימוש חוזר של מקטע שנותר
  בחשבון שזה עתה מוצה אינה ה-Set הזה — אלא שכבת ההתמדה שלעיל
  (`rateLimitedUntil` של החיבור נמצא כעת בעתיד), בשילוב עם דיכוי
  `transientRateLimitedProviders` עבור הכשל באמצעות אותו מנגנון בדיקה
  (ראו "תכנון דו-שלבי" ואת הערת הקוד בענף
  `isAgentrouterConnectionQuotaScope` בתוך `targetExhaustion.ts`): כאשר
  אותו Set נותר לא מסומן, האפשור הכפוי `allowRateLimitedConnection` של
  `combo.ts` ‏(`open-sse/services/combo.ts:1005-1013`,‏ `:2734-2738`) **אינו**
  מופעל עבור המקטעים הנותרים של הספק, ולכן מסנן `rateLimitedUntil` של
  בחירת פרטי האימות (`src/sse/services/auth.ts:1238`) מכובד כרגיל, ומקטע
  שנותר בוחר חיבור agentrouter אחר שעדיין כשיר, או נכשל משום שאין פרטי
  אימות זמינים — הוא אינו כופה את דרכו בחזרה אל החיבור שענף זה הכניס זה
  עתה לתקופת צינון.

### תכנון דו-שלבי: ניסוח מחדש של הסטטוס, ולאחר מכן סיווג

ניסוח מחדש של הסטטוס (`upstreamStatusRestatement.ts`) וכללי סיווג הספקים
(`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) הם מאגרים נפרדים ששניהם משתמשים במזהה הספק
ובסמני טקסט כמפתחות, אך הם פועלים במקומות שונים ומשרתים מטרות שונות:
הניסוח מחדש משכתב את סטטוס ה-HTTP בשלב מוקדם בתוך `chatCore.ts`;
כללי הסיווג בוחרים את `reason` של מנגנון החלופה ואת `scope` של הנעילה
(`model` / `provider` / `connection`) בתוך `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

כללי הסיווג רואים את **טקסט** השגיאה המלא (הנדרש להתאמת סמנים בגוף
כמו `额度不足`) רק עבור ספקים המופיעים ברשימת ההיתרים
`FULL_TEXT_RULE_PROVIDERS` בתוך `providerErrorRules.ts` — כיום רק
`"agentrouter"`. עבור כל ספק **מקטלוג מובנה** אחר, `checkFallbackError`
מעביר אל `getProviderErrorRuleMatch` רק את השגיאה המובנית
(`{code, type}`), שמספיקה לכללים המבוססים על כותרת/סטטוס/קוד, אך אינה
יכולה לזהות סמני טקסט בגוף. פונקציית העזר `resolveRuleMatchBody()` מבצעת
בחירה זו: טקסט השגיאה המלא עבור ספקים שברשימת ההיתרים, והשגיאה המובנית
עבור כל השאר. הוספת ספק **מובנה** אל `FULL_TEXT_RULE_PROVIDERS` היא
הצטרפות מפורשת לכל ספק בנפרד — היא קיימת כדי שנתיב ברירת המחדל עבור כל
ספק שאינו ברשימה יישאר זהה בית אחר בית.

ה-`scope` של כלל (`model` / `provider` / `connection`) הוא מנגנון הצטרפות
נפרד מ-`FULL_TEXT_RULE_PROVIDERS`:‏ `checkFallbackError` רק חושף אותו בתור
`fallbackResult.ruleScope`, וצרכנים בהמשך מכבדים אותו כמשהו שאינו תווית
מידע רק עבור ספקים ברשימת ההיתרים
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` שבאותו קובץ (מותנה באמצעות
`honorsRuleLockScope()` — כיום רק `"agentrouter"`). ראו "שגיאות מכסה
שנוסחו מחדש" לעיל כדי להבין מה התאמה של `scope: "connection"` עושה בפועל
לאחר שספק נמצא ברשימת ההיתרים הזו.

**#11104 — כללים המוצהרים על־ידי המפעיל עוקפים את שתי רשימות ההיתרים.** מפעיל יכול
להצהיר בזמן ריצה על כלל ייעודי לספק באמצעות `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
מבלי לערוך קובץ זה. הכפפת כלל של מפעיל ל־
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — רשימות היתרים
שנועדו להגן על התנהגות **ברירת המחדל** של כללי הקטלוג המובנים — הייתה
הופכת את מנגנון ההגדרות לחסר השפעה עבור כל ספק מלבד אלה שכבר
מופיעים בהן, שכן עצם ההצהרה על הכלל היא כבר הסכמה מפורשת
של המפעיל. `resolveRuleMatchBody()` ו־`honorsRuleLockScope()` בודקות שתיהן
תחילה את `hasOperatorRuleForProvider()`: ספק עם כלל של מפעיל מקבל
את טקסט השגיאה הגולמי, וה־`scope` המוצהר שלו מכובד, ללא תלות
בשאלה אם הוא מופיע גם באחת מרשימות ההיתרים.

**פער ידוע — לעולם אין פנייה אל `providerRuleRegistry` עבור HTTP 400.**
הענף `BAD_REQUEST` של `checkFallbackError` מסווג את הסטטוס 400 במלואו
באמצעות מערכי התבניות שלו (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` וכו' ב־`accountFallback.ts`) ומחזיר תוצאה לפני
שמגיעים לענף `configuredRule`/`getProviderErrorRuleMatch` שמעליו.
כלל קטלוג מובנה (או כלל של מפעיל) עם `status: 400` הוא
תקין תחבירית, אך לעולם לא יופעל. כיום אין שום כלל קיים שמכוון ל־400,
כך ששום דבר בפרודקשן אינו מושפע — אך כלל 400 עתידי מחייב
לטפל תחילה בענף הזה, וזהו שינוי גדול יותר מהוספת כלל (הוא
מסווג מחדש את 400 עבור כל ספק שכבר מסתמך על ההתנהגות של
מערכי התבניות), ולכן הוא מחוץ להיקף של הוספת כלל עבור ספק יחיד.

### הוספת שער חדש שמציג מכסה באופן שגוי

1. רשמו מערך כללים אחד ב־`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). שמרו את `textMarkers`
   ייחודיים לספק; לעולם אל תשתמשו מחדש בביטויים כלליים באנגלית שמתנגשים עם
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. לחלופין, רשמו כללי סיווג ב־
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) כדי לבחור
   את תחום הנעילה המתאים (`connection` עבור מכסה כלל־חשבונית, `model` עבור
   שגיאות לפי מודל). שלב זה משפיע בפרודקשן רק עבור
   ספקים שהכללים שלהם זקוקים לטקסט השגיאה המלא (סמני גוף): הוסיפו את
   מזהה הספק אל `FULL_TEXT_RULE_PROVIDERS` באותו קובץ — אחרת
   `checkFallbackError` מעבירה לכלל רק את השגיאה המובנית
   `{code, type}`, וכלל המבוסס על טקסט גוף לעולם לא יתאים לתעבורה בפועל.
   כללים שמתאימים אך ורק לפי `status`/`headers` (כמו אלה של Opencode או
   Minimax) אינם זקוקים להסכמה מפורשת זו. בנפרד, אם הכלל מצהיר
   `scope: "connection"` והכוונה היא לתקופת צינון ממשית לכל החיבור
   יחד עם דילוג על הצירוף באותה בקשה (ולא רק תווית מידע), הוסיפו את
   מזהה הספק אל `HONORS_RULE_LOCK_SCOPE_PROVIDERS` באותו קובץ — זהו
   המנגנון שמאפשר שימוש בסגנון `isAgentrouterConnectionQuotaScope()` בתוך
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ובתוך
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); בלעדיו, `scope`
   עדיין מועבר דרך `fallbackResult.ruleScope`, אך שום דבר אינו פועל לפיו.
3. הוסיפו בדיקות יחידה המקבילות ל־`tests/unit/upstream-status-restatement.test.ts`
   ול־`tests/unit/agentrouter-error-rules.test.ts` (כולל ההגנות
   not-permanent / not-creditsExhausted, ואם הספק זקוק
   לרשימת ההיתרים — בדיקה שמוודאת כי `resolveRuleMatchBody()` מחזירה את
   הטקסט המלא רק עבור אותו ספק).

אין צורך בשינויים ב־`chatCore.ts`, ב־`classifyError` או ב־combo.

#### נעילה המחולקת לדליים לפי תעבורה יוצאת (#10880)

ספקים ב־`EGRESS_BUCKETED_LOCK_PROVIDERS` (משפחת opencode) מטופלים
כשירות upstream המחולק לדליים לפי IP (הרובד החינמי של opencode מחולק לפי IP, ולא
לפי חשבון — ראו #9611): סטטוס 429 המסווג כ־`quota_exhausted`
**או** כ־`rate_limit_exceeded` מכניס לתקופת צינון כל חיבור ממשפחת הספקים
שברשימת ההיתרים, שכתובת ה־IP האחרונה הידועה שלו לתעבורה יוצאת תואמת לזו של החיבור שנכשל, לפני
שהרוטציה יכולה לנסות אותם
— וכך נמנעות N-1 קריאות upstream שמובטח שייכשלו (באותה מתכונת כמו #10460/#10525).
`rate_limit_exceeded` נכלל במכוון: בנתיב `markAccountUnavailable`
הכללים הייעודיים ל־opencode לעולם אינם מתאימים (לא מועברים headers/body אל
`checkFallbackError`, ו־opencode אינו נמצא ב־`FULL_TEXT_RULE_PROVIDERS`), ולכן 429
שהגוף שלו מכיל את טקסט מכסת המינוי ("monthly usage limit
reached") מסווג כ־`quota_exhausted` באמצעות נסיגת טקסט המכסה
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; תקופת צינון של שעה) לפני
שמגיעים בכלל אל הכלל `status_429` — בעוד ש־429 ללא טקסט מכסה (הגבלת
קצב רגילה) מסווג באמצעות הכלל `status_429` כ־`rate_limit_exceeded`
ועדיין מכניס את משפחת ה־IP לתקופת צינון. עבור ספק ברשימת ההיתרים, הגבלת קצב
המחולקת לדליים לפי IP היא אותו אות כמו מכסה שמוצתה. מגבלות ידועות:

- **מאמץ מיטבי**: הנעילה מאתרת את ה-`egress_ip` האחרון הידוע של החיבור
  מתוך `proxy_logs` (חלון של 24 שעות, סינכרוני, ללא מטמון). מטמון קר (כתובת
  ה-IP היוצאת מעולם לא נבדקה) או היעדר שורה → החיבור שנכשל עדיין נכנס לצינון
  על ידי הענף (ונרשם כמו היום), אך אף חיבור אח לא ננעל.
- **לעולם לא סופי**: הצינון הוא חלון מכסה מתחדש
  (`testStatus: "unavailable"`); מצב קבוע לעולם אינו נגזר מאות ברמת ה-IP.
  חיבורים עם `disableCooling` מדלגים לחלוטין על הענף.
- **רזולוציית הנעילה משתנה עבור משפחת רשימת ההיתרים**: זהו שינוי תחום,
  ולא רק מיטוב עבור חיבורים אחים. opencode הוא ספק `passthroughModels`,
  ולכן לפני ענף זה, שגיאת 429 יצרה נעילה לכל MODEL בנפרד; כעת היא יוצרת
  צינון לחיבור — לרבות עבור מפעיל שמריץ חיבור יחיד ללא שום חיבור אח. זו
  הרזולוציה שטבלת הכללים של opencode כבר מגדירה כנכונה
  (`scope: "connection"`,‏ `providerErrorRules.ts`), אך עד כה מעולם לא כובדה
  משום ש-opencode אינו נמצא ב-`HONORS_RULE_LOCK_SCOPE_PROVIDERS`. הענף כותב
  בעצמו את הצינון + `backoffLevel` של החיבור שנכשל, בדומה לענף של
  agentrouter בעל תחום החיבור, וחוזר — החסימה לכל מודל והנתיב הגנרי שלמטה
  לעולם אינם מופעלים.
- **כולל Combo**: בדומה לענף של agentrouter, התחום מתעלם במכוון מההנמכה של
  `persistUnavailableState`/`isCombo` שמבצע קורא Combo בתגובה לשגיאת 429.
  נעילה לכל מודל אינה גרסה חלשה יותר של תחום זה, אלא היחידה הלא נכונה: היא
  אינה אומרת דבר על ה-IP שמכסתו מוצתה, ולכן הסבב של ה-Combo ימשיך לבזבז
  קריאה אחת שמובטח כי תיכשל עבור כל חיבור אח.
- **בטיחות חיבורים אחים**: חיבור אח שכבר נמצא במצב סופי
  (banned/credits_exhausted) או שכבר נמצא בצינון ארוך יותר לעולם אינו נדרס.
- **רשימת היתרים בלעדית**: הרחבת `EGRESS_BUCKETED_LOCK_PROVIDERS` היא החלטה
  מפורשת של הבעלים; אין חיווט גנרי (תבנית #10334/#10419). שאילתת החיבורים
  האחים מקשרת את אותה רשימת היתרים במקום לחזור עליה כליטרל SQL, כך שהרחבתה
  נשארת שינוי של שורה אחת.
- **סבב כתובות IP יוצאות, בשני הכיוונים**: חלון החיפוש (24 שעות) רחב בהרבה
  מה-TTL של מטמון ה-IP היוצא (5 דקות), ולכן "כתובת ה-IP האחרונה הידועה" היא
  היסטוריה, לא המצב הנוכחי. אם ה-proxy של חיבור הוחלף במהלך החלון, הנעילה
  עלולה **להחמיץ** כתובת IP משותפת בפועל (כתובת ה-IP הרשומה היא החדשה,
  שמכסתה לא מוצתה) — ובאופן סימטרי, היא עלולה **לצנן חיבור אח שמאז הועבר**
  מכתובת ה-IP שמכסתה מוצתה. המקרה השני עולה לאותו חיבור אח חלון צינון אחד;
  שניהם מתקבלים כמגבלות של מאמץ מיטבי הנובעות מחיפוש המבוסס על היסטוריה.
- **עלות**: שתי סריקות מוגבלות של `proxy_logs` (מסוננות לפי חלון באמצעות
  `idx_pl_timestamp`), ורק בתדירות של שגיאות 429. אין אינדקס חדש (מיגרציה
  134, YAGNI). נמדד על עותק של מסד נתונים מתעבורה אמיתית ובגודל בינוני;
  מופע בעל תפוקה גבוהה מחזיק מספר גדול יותר של שורות באופן יחסי באותו חלון.

---

## תכונות עמידות נוספות

- **19 אסטרטגיות ניתוב** (עדיפות, משוקלל, סבב מחזורי, העברת הקשר, מילוי ראשון, p2c, אקראי, הכי פחות בשימוש, ממוטב עלות, מודע לאיפוס, חלון איפוס, מרווח ביטחון, אקראי מחמיר, אוטומטי, lkgp, ממוטב הקשר, ממוטב מטמון, מיזוג, צינור עיבוד) — ראו [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **ניתוב מודע לאיפוס** (v3.8.0) — מתעדף חיבורים לפי מועד איפוס המכסה.
- **הורדת דרגה של מצב רקע** — `background: true` של Responses API מומר למצב סינכרוני עם אזהרה.
- **זיהוי דינמי של מגבלת כלים** — מבצע נסיגה מספקים כאשר מגיעים למגבלות על מספר הכלים.
- **חלופת חירום** — נשלטת באמצעות `OMNIROUTE_EMERGENCY_FALLBACK`; מפעילים יכולים לדרוס אותה מדף דגלי התכונות ללא הפעלה מחדש.

---

## ניפוי שגיאות

- קומבינציה משוקללת מחזירה `503 all_targets_cooling_down` (הכותרת `Retry-After` מוגדרת, ו-`diagnostics.excluded` מפרט כל יעד עם `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → המאגר מוגדר ומחובר, אך כל יעד מוחרג על ידי טיימר עמידות; האזהרה `[COMBO] Weighted selection: every target excluded before dispatch — …` מציינת את הסיבות ואת מספר השניות שנותרו. תגובת `404 no_executable_targets` מאותה קומבינציה פירושה שלא היה מעורב טיימר עמידות (אין דבר שניתן להריץ, או שבדיקת הזמינות נכשלה עבור כל חשבון). המנגנון ממומש ב-`open-sse/services/combo/pinRecovery.ts` על סמך ההחרגות שנאספו ב-`targetResolution.ts`.
- כל המפתחות של ספק דולגו → בדקו גם את מצב מפסק הזרם וגם את `rateLimitedUntil`/`testStatus` של כל חיבור.
- ספק מוחרג לצמיתות לאחר חלון האיפוס → הקוד קורא את `state` הגולמי במקום את `getStatus()`/`canExecute()`.
- מפתח אחד נכשל, אך האחרים אמורים לעבוד → העדיפו תקופת צינון של החיבור על פני מפסק זרם.
- רק מודל אחד נכשל → העדיפו נעילת מודל על פני תקופת צינון של החיבור.
- המצב אמור להתאושש מעצמו אך אינו עושה זאת → בדקו אם קיימת חותמת זמן עתידית ונתיב קריאה שמרענן מצב שפג תוקפו. מצבים קבועים דורשים שינויים ידניים.

---

## טביעת אצבע של TLS והסוואה

הסוואה ייעודית לספק (JA3/JA4, CCH, ערפול) מתועדת בנפרד — ראו `docs/security/STEALTH_GUIDE.md` (ב-git; אינה עוברת הידור לתוך `/docs`).

---

## בדיקות עמידות (שלב 8 · מקטע C)

מעבר לבדיקות יחידה של לוגיקת העמידות, שלוש בדיקות מפעילות את סביבת הריצה תחת
תנאי עומס/כשל אמיתיים (כולן בדיקות אינטגרציה/ליליות — אף אחת אינה חוסמת בקשות מיזוג):

| בדיקה       | מה נבדק                                                                                                                                                | הרצה                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| כאוס        | צומת מדומה במעלה הזרם מזריק השהיה/איפוס/תום זמן/503 אמיתיים; מוודא שמפסק הזרם נפתח/מתאושש וש-`checkFallbackError` מסווג 503 כחלופה שניתן להתאושש ממנה. | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| גידול ערימה | כ-500 זרמים לכל `createSSEStream` תחת `--expose-gc`; נכשל אם הערימה גדלה מעבר לתקרה (הגנת OOM מס' 3069).                                               | `npm run test:heap`                   |
| השריית k6   | עומס מתמשך מול `/api/monitoring/health`; ספי p95/שגיאות.                                                                                               | `k6 run tests/load/k6-soak.js` (לילי) |

התזמור מתבצע באמצעות `.github/workflows/nightly-resilience.yml` (cron + הפעלה ידנית). ב-
`test:integration` המוגדר כברירת מחדל, בדיקות הכאוס והערימה מדלגות על עצמן (ללא `RUN_CHAOS_INT`/`--expose-gc`).

---

## ראו גם

- [מדריך ארכיטקטורה](./ARCHITECTURE.md) — ארכיטקטורת המערכת והמנגנונים הפנימיים
- [מדריך למשתמש](../guides/USER_GUIDE.md) — ספקים, שילובים, שילוב עם CLI
- [מנוע השילובים האוטומטי](../routing/AUTO-COMBO.md) — ניקוד המבוסס על 16 גורמים, חבילות מצבים
