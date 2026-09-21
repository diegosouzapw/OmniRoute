# Router Backends & Embedded Services — architecture contract (ADR) (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **סטטוס:** התקבל · **הקשר:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **חוזה:** `domain/routing/routerBackends.ts`
> (רג'יסטר טיפוסים — הקוד נוסף במסגרת [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

ADR זה מגדיר במדויק כיצד המנועים `ts` (מקורי), `bifrost`, `cliproxy`, `9router`
והמנועים התואמים ל-VibeProxy קשורים זה לזה, כדי שתורמים יפסיקו לערבב בין שני
דברים הנבדלים זה מזה מבחינה ארכיטקטונית. הוא מתעד את רג'יסטר הטיפוסים שנוסף
במסגרת העבודה על router-backend-registry כמקור האמת היחיד עבור מודל זה.

## ההבחנה המרכזית — שני צירים אורתוגונליים

תפקידו של מנוע מתואר באמצעות **שני צירים בלתי תלויים**, המקודדים יחד בתוך
`RouterBackendDefinition` של הרג'יסטר:

1. **מחזור חיים** (`RouterBackendLifecycle`) — _כיצד המנוע פועל_:
   - `in-process` — פועל בתוך תהליך ה-Node של OmniRoute (צינור עיבוד ה-TS המקורי).
   - `supervised` — תהליך בן מקומי ש-OmniRoute מתקין/מפעיל/עוצר/בודק את תקינותו
     באמצעות `ServiceSupervisor`, ולאחר מכן משתמש בו כחיבור לספק.
   - `external` — נקודת קצה HTTP שאליה OmniRoute מנתב, אך **אינו** מנהל
     (מוגדרת באמצעות כתובת URL בסיסית במשתנה סביבה).
   - `disabled` — רשום אך אינו ניתן לבחירה.
2. **ציר הבחירה** (קצה אחורי לניתוב הממסר) — _האם הממסר מנתב אליו_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` בתוך
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

הטעות שיש להימנע ממנה: התייחסות ל"שירות מוטמע" ול"קצה אחורי לניתוב" כאל רשימה
אחת. הם אינם כאלה. מנוע `supervised` ‏(9router/cliproxy) הוא **חיבור לספק
שבו משתמש צינור העיבוד המקורי**, ולא קצה אחורי חלופי לניתוב הממסר. `bifrost`
הוא המקרה ההפוך — קצה אחורי לניתוב הממסר, שבאופן היסטורי היה `external` בלבד.

## הרג'יסטר — מקור אמת יחיד

החוזה `domain/routing/routerBackends.ts` (הקוד נוסף במסגרת
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) מצהיר על כל מנוע פעם אחת, יחד עם
מחזור החיים, היכולות, זהות השירות, פורט ברירת המחדל, תצורת בדיקת התקינות
והתמיכה בטלמטריה שלו. צרכנים מאתרים מנועים באמצעות `getRouterBackend(id)`,
‏`listRouterBackends()` ו-`listRouterBackendsByCapability(cap)`, במקום
לטפל בכל תהליך צדדי כמקרה מיוחד.

| קצה אחורי   | מחזור חיים   | שירות (ציר A) | קצה אחורי לממסר (ציר B) | בדיקת תקינות  | פורט ברירת מחדל |
| ----------- | ------------ | ------------- | ----------------------- | ------------- | --------------- |
| `ts`        | `in-process` | —             | `ts` (מקורי)            | —             | —               |
| `bifrost`   | `external`¹  | —¹            | `bifrost` / `auto`      | `/health`     | —               |
| `cliproxy`  | `supervised` | `cliproxy`    | — (ספק)                 | `/v1/models`  | 8317            |
| `9router`   | `supervised` | `9router`     | — (ספק)                 | `/api/health` | 20130           |
| `vibeproxy` | `external`   | —             | — (מתאם ספק)            | `/v1/models`  | —               |

¹ הקידום של Bifrost לשירות מוטמע מסוג `supervised` (שניתן להתקנה/הפעלה
מתוך `/api/services/bifrost/`) נמצא במעקב במסגרת
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); עד למיזוגו,
Bifrost הוא `external` בלבד (נגיש אך ורק באמצעות `BIFROST_BASE_URL`).

`capabilities` ‏(`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) מאפשרות לצרכנים
לסנן לפי מה שמנוע מסוגל לעשות בפועל, במקום לקודד במפורש הסתעפויות נפרדות לכל מזהה.

## ציר A — שירותים מוטמעים (צד התהליכים המפוקחים)

- **רישום התהליכים המפוקחים:** `src/lib/services/bootstrap.ts`‏ `SERVICES[]`
  (כיום: `9router`,‏ `cliproxy`).
- **האחראי על מחזור החיים:** `src/lib/services/ServiceSupervisor.ts` — הפונקציה `start()` מפעילה את
  תהליך הבן, ממתינה למעבר של `waitForHealthy()`, ומזרימה את stdout/stderr למאגר מעגלי;
  `stop()` מבצעת SIGTERM→SIGKILL; כל הפעולות מסודרות באופן טורי תחת נעילה.
- **איחוד המצבים** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, ובנוסף
  `HealthState = healthy | unhealthy | unknown` אורתוגונלי.
- **למה תהליך נפרד (ולא SDK בתוך התהליך)?** בידוד תהליכים הוא שמאפשר
  לשלוט באופן עצמאי בהתקנה/הפעלה/עצירה/תקינות/יומנים של כל sidecar, ומאפשר
  להחיל את מגבלת ההפעלה מ-loopback. מידול מתאם בתוך התהליך הוא עבודה עתידית —
  דגל היכולת `native-hot-path` הוא המקום שבו הדבר יבוטא.

### חוזה נתיבי מחזור החיים (`/api/services/<tool>/…`)

קודי הסטטוס הם **ספציפיים למצב/פעולה/נתיב במכוון** — זהו החוזה, ולא
חוסר עקביות:

| קריאה                        | תנאי                                | סטטוס                                |
| ---------------------------- | ----------------------------------- | ------------------------------------ |
| `POST .../start`             | השירות במצב `not_installed`         | **409** (תנאי מקדים)                 |
| `POST .../stop`              | כבר נעצר                            | **200** (פעולת no-op אידמפוטנטית)    |
| `GET .../status`             | תקין                                | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | כשל בהפעלת התהליך                   | **503** (חולף)                       |
| `GET .../status`, `.../stop` | שגיאה שלא נתפסה                     | **500**                              |
| `GET /api/services/<x>/logs` | כלי לא מוכר `<x>`                   | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | חסרה הכותרת `X-Reveal-Confirm: yes` | **403** (עבור 9router בלבד)          |
| **כל** `/api/services/*`     | הפונה אינו מ-loopback/LAN פרטי      | **403 LOCAL_ONLY**                   |

המבנה של כל גופי השגיאות נקבע באמצעות `createErrorResponse()` →
`{ error: { message, type }, requestId }`, כאשר `type` נגזר מהסטטוס
(`500→server_error`, `404→not_found`, `409→conflict`, else `invalid_request`) ומשמש
כמבחין הניתן לעיבוד על ידי מכונה. ההודעות עוברות ניקוי מראש
(`sanitizeErrorMessage()`, כלל קשיח מס' 12).

**מגבלת ה-loopback** היא המקור הנפוץ ביותר ל-`403`: הנתיב `/api/services/` נמצא
בתוך `LOCAL_ONLY_API_PREFIXES`‏ (`src/server/authz/routeGuard.ts`), ו-
`src/server/authz/policies/management.ts` דוחה כל פונה שאינו מ-loopback או מ-LAN פרטי
**לפני האימות**, משום שנתיבים אלה מפעילים תהליכי בן (כללים קשיחים 15
ו-17). הגישה אליהם דרך מנהרה ציבורית מחזירה `403` במכוון.

## ציר B — קצה עורפי לניתוב ממסר (צד השיגור)

רק נתיב פרוקסי הממסר `/api/v1/relay/chat/completions` בוחר קצה עורפי
לשיגור; הממשק הראשי `/api/v1/chat/completions` לעולם אינו משתמש
ב-`routingBackend.ts`.

- **בחירה** (`resolveRelayRoutingBackend`): מתג סביבה גלובלי יחיד —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  אם אינו מוגדר, הערך הוא `auto` כאשר Bifrost מוגדר ומופעל, ואחרת `ts`.
- **התנהגות:**
  - `bifrost` (מאולץ): כשל ב-Bifrost → שגיאת `502` קשיחה, ללא fallback.
  - `auto`: ניסיון להשתמש ב-Bifrost; במקרה של כשל/תקופת צינון, מעבר שקט למימוש המקורי.
  - `ts` / לאחר fallback: צינור התרגום/הביצוע המקורי של `open-sse`.
- **תקופת צינון:** תקופת צינון בעקבות כשל, נפרדת לכל `baseUrl`, בתוך `bifrostCooldown.ts`.

כיום הבחירה היא **הכול או כלום ברמת הממסר** — אין החלפת מנוע לפי ספק
או לפי בקשה ב-`release/v3.8.43`. שער הבחירה לפי בקשה נוסף במסגרת עבודת
מניפסט ה-sidecar
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) מניפסט +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
המאפשרת ל-`auto` לנתב דרך Bifrost רק ספקים שעומדים בתנאי המניפסט.

## שילוב בלוח הבקרה

לוח הבקרה של השירותים מתשאל את `GET /api/services/<tool>/status` כל 5s באמצעות
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
ומחזיר `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. אין ספק משותף של הקשר זמינות —
כל רכיב מפעיל את ה-hook עבור כל כלי בנפרד. במקרה של `!res.ok`, ה-hook מציג כעת
רק `HTTP <status>`; מיפוי השדה `error.type` להסבר מובן למשתמש הוא
שיפור UX שנמצא במעקב, ולא שינוי בחוזה.

## השלכות

- מנועים חדשים נרשמים פעם אחת ב-`ROUTER_BACKENDS`; צרכנים מקבלים אותם באמצעות שאילתות
  יכולות, ללא הסתעפויות חדשות לפי מזהה.
- התשובה לשאלה "האם זהו שירות או מנוע ניתוב?" נקבעת לפי השדה `lifecycle`, ולא
  לפי הרשימה שבה מזהה כלשהו מופיע במקרה.
- הפיקוח על Bifrost (#5817) והמעבר לנתיב הקריטי המקורי (#5670) מתבססים על
  החוזה המשותף הזה במקום לטפל בכל sidecar כמקרה מיוחד.
