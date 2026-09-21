# Monitoring & Observability Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **בקצרה**: OmniRoute מגיע עם ניטור תקינות מובנה, טייס אוטומטי לספקים, מעקב אחר מכסות ונקודות חיבור לצפיות מערכתית. מדריך זה עוסק בלוח הבקרה, בהתראות ובפתרון בעיות.

**מקורות:**

- `src/lib/monitoring/observability.ts` — תמונת מצב של הצפיות המערכתית
- `src/lib/monitoring/comboHealthAutopilot.ts` — טייס אוטומטי לתקינות שילובים
- `src/lib/monitoring/providerHealthAutopilot.ts` — טייס אוטומטי לספקים
- `src/lib/monitoring/providerHealthMatrix.ts` — מטריצת תקינות ספקים
- `src/lib/localHealthCheck.ts` — בדיקת תקינות מקומית
- `src/lib/tokenHealthCheck.ts` — תקינות רענון אסימונים
- `src/lib/proxyHealth.ts` — מטמון תקינות פרוקסי (מתואר ב-PROXY_GUIDE.md)

---

## סקירה כללית

ל-OmniRoute יש **3 שכבות ניטור**:

```
┌──────────────────────────────────────────────────────────────┐
│  שכבה 1: תקינות המערכת (ברמת השרת)                           │
│  ├─ localHealthCheck.ts — מסד נתונים, יציאות, תלויות מקוריות │
│  ├─ db/healthCheck.ts — שלמות, FK, תוצרים יתומים             │
│  └─ לוח בקרה: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  שכבה 2: תקינות ספקים (עמידות לכל ספק)                       │
│  ├─ providerHealthAutopilot.ts — מפסק, זמני צינון            │
│  ├─ providerHealthMatrix.ts — ציוני תקינות לפי ספק/מודל      │
│  └─ לוח בקרה: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  שכבה 3: צפיות מערכתית בזמן אמת (תמונות מצב בזמן ריצה)       │
│  ├─ observability.ts — מפסקים, הפעלות, מכסה                  │
│  ├─ tokenHealthCheck.ts — תקינות רענון אסימוני OAuth         │
│  └─ כלי MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## דפי לוח הבקרה

### `/dashboard/health` (תקינות המערכת)

לוח הבקרה הראשי לתקינות מציג:

| מקטע               | מה הוא מציג                                   |
| ------------------ | --------------------------------------------- |
| **מצב השרת**       | זמן פעילות, גרסה, יציאה, חיבורים פעילים       |
| **מסד הנתונים**    | חיבור, שלמות, גודל WAL, העברות נתונים אחרונות |
| **סיכום ספקים**    | מספר פעילים, מספר תקינים, מספר מפסקים פתוחים  |
| **מנטרי מכסות**    | הפעלות פעילות, התראות, מכסות שמוצו            |
| **שגיאות אחרונות** | 10 השגיאות האחרונות עם מעקבי מחסנית           |
| **שימוש במשאבים**  | זיכרון, CPU, מחוון עומס ערימה                 |

### `/dashboard/providers` (תקינות ספקים)

לוח בקרה לכל ספק:

| עמודה   | תיאור                                                  |
| ------- | ------------------------------------------------------ |
| ספק     | מזהה הספק + שם תצוגה                                   |
| תקינות  | מצב ירוק/צהוב/אדום                                     |
| מפסק    | מצב פתוח/סגור/פתוח למחצה                               |
| חיבורים | מספר החיבורים, רענון אחרון                             |
| מודלים  | מודלים זמינים, תקינות לכל מודל                         |
| עלות    | העלות היום, מגמה ל-7 ימים                              |
| שגיאות  | מספר שגיאות ב-24 השעות האחרונות, מחלקת השגיאות המובילה |

לחצו על ספק כדי לראות:

- בקשות אחרונות עם פירוט זמני השהיה
- ציוני תקינות לכל חיבור
- חסימות לכל מודל
- המלצות הטייס האוטומטי

### `/dashboard/quota` (מעקב אחר מכסות)

עבור כל מפתח API:

- שימוש נוכחי לעומת המגבלה (סרגל התקדמות)
- מגמת המכסה (תרשים ל-30 יום)
- מועד האיפוס הבא
- היסטוריית התראות

### `/dashboard/combos` (תקינות שילובים)

לכל שילוב:

- אסטרטגיה + יעדים
- תקינות לכל יעד
- אירועי מעבר לגיבוי אחרונים
- שיעור הצלחה (24 שעות, 7 ימים, 30 יום)

---

## API לבדיקת תקינות

OmniRoute חושף **שני** ממשקי HTTP לבדיקת תקינות. הם אינם ניתנים להחלפה זה בזה עבור מערכות תזמור.

| נתיב                         | מטרה                                                               | עומס                                                 | שימוש                                                                   |
| ---------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------- |
| `GET /healthz`               | חיוּת/מוכנות של מחזור החיים (`ok` / `starting` / `stopping`)       | זניח (דגל שלב בלבד)                                  | **מוכנות** ב-Kubernetes; **חיוּת** מקלה אם חייבים להשתמש ב-HTTP         |
| `GET /api/monitoring/health` | סיכום מעמיק של המערכת והספקים (מסד נתונים, ערימה, ספירות קטלוג, …) | כבד (עבודה סינכרונית מול מסד הנתונים / מערכת הניטור) | לוחות מחוונים, בדיקות blackbox מעמיקות, בדיקת התקינות המובנית של Docker |

> **הערה:** מטריצות תקינות של ספקים, בעיות טייס אוטומטי, מנטרי מכסות, תקינות אסימונים ופרטי השהיה מעבר ל-`/api/monitoring/health` זמינים דרך **כלי ה-MCP** ‏`observability_snapshot` או דפי **לוח המחוונים** — אין עבורם נתיבי REST ייעודיים.

שני הנתיבים פועלים באותה **לולאת אירועים של Node** המטפלת בבקשות. נתיב עתיר מעבד (עבודת קטלוג גדולה של `GET /v1/models`, דחיסת הקשר ארוך / ספירת אסימונים) עלול לעכב את **כל** מטפלי ה-HTTP, כולל `/healthz`. לולאת אירועים עמוסה ≠ תהליך מת. עדיף לתקן את הגורם לעומס; כוונון הבדיקות רק מפחית חיסולים שגויים.

### בדיקה קלת משקל למערכת תזמור

```bash
GET /healthz
# או HEAD /healthz
```

- **200** + גוף `ok` כאשר שלב מחזור החיים של השרת מוכן
- **503** + `starting` / `stopping` במהלך האתחול או הכיבוי
- מימוש: `src/app/healthz/route.ts` (ללא ping למסד הנתונים)

### תקינות המערכת (מעמיקה)

```bash
GET /api/monitoring/health
```

תגובה:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: מטמון בדיקות לעומת `test_status` של SQLite

השדה `credentialHealth` ב-`GET /api/monitoring/health` הוא **מד מטמון הבדיקות
שבזיכרון**, ולא ייצוא חי של `provider_connections.test_status`. לאחר #12532,
נתיב הבקשה קורא רק את `getCachedCredentialHealthSummary()`; בדיקות רקע
מרעננות את המטמון מחוץ ללולאת האירועים.

| שכבה               | מיקום                                                                 | משמעות                                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| מד מטמון הבדיקות   | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | התוצאות האחרונות של בדיקות תקינות פרטי הכניסה שעדיין מוחזקות בזיכרון התהליך. `source` הוא תמיד `probe-cache`.                                                                                    |
| פרטי חיבור שנכשל   | `credentialHealth.failedConnections`                                  | קיים **רק כאשר `failed > 0`**. רשימה מוגבלת של שורות מטמון עם `status=error`‏ (`connectionId`,‏ `status`,‏ `lastError` / `lastErrorType` שעברו טיהור). `failedOmitted` מוגדר כאשר הרשימה הוגבלה. |
| מצב דביק של SQLite | `credentialHealth.staleDbNonOkCount`                                  | מספר שורות החיבור **הפעילות** (`is_active=1`) שה-`test_status` השמור שלהן הוא ערך מוכר שאינו תקין (`error`,‏ `expired`,‏ `credits_exhausted`,‏ `banned`,‏ `deactivated`,‏ `unavailable`).        |

שתי השכבות עשויות שלא להסכים זו עם זו בכוונה:

- המד מציג `failed=0` בעוד `staleDbNonOkCount>0` — ב-SQLite עדיין קיים
  `test_status` דביק (לדוגמה `expired` או `credits_exhausted`) שתמונת המצב האחרונה
  במטמון הבדיקות אינה סופרת כ-`status=error`.
- המד מציג `failed>0` בעוד SQLite נראה תקין — בדיקה שנערכה לאחרונה נכשלה
  ונשמרה במטמון; שורת מסד הנתונים טרם עודכנה, או שנוקתה מאוחר יותר.

אין להפעיל התראה על סמך `provider_connections.test_status` בלבד בעת איסוף נתונים
מנקודת קצה זו. השתמשו ב-`failed` + `failedConnections` עבור כשלי בדיקה בזמן אמת, וב-
`staleDbNonOkCount` כאשר נדרש מספר המצבים הדביקים השמורים.

### המלצות לבדיקות Kubernetes

OmniRoute הוא **תהליך Node יחיד** (לולאת אירועים אחת). ה-`HEALTHCHECK` הסטנדרטי של Docker מכוון אל `/healthz` קל המשקל. `/api/monitoring/health` הוא **כבד מדי** עבור מרווחי בדיקות החיוּת של kubelet.

| בדיקה                   | יעד מומלץ                                                                       | הערות                                                                                                                                                                                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **אתחול**               | HTTP `GET /healthz` עם `failureThreshold` ארוך (או `startPeriod` גדול)          | הפעלה קרה + מיגרציית SQLite עשויות להימשך יותר מכמה שניות                                                                                                                                                                                                                                                  |
| **מוכנות**              | HTTP `GET /healthz`                                                             | מצב מחזור החיים `ok` / `starting` / `stopping` ‏(200 לעומת 503). עדיין עלול להתנדנד אם הלולאה חסומה עקב עומס CPU. **תגובה 200 שנמשכת מספר שניות אינה תקינה** (#10303) — משמעות הדבר היא שלולאת האירועים הורעבה לפני שהמטפל בן 3 הבתים הופעל                                                                |
| **חיוּת**               | HTTP `GET /livez`, **או TCP** ביציאת השירות הראשית (`PORT`, ברירת מחדל `20128`) | `/livez` בודק רק שהתהליך חי (תמיד 200 אם המטפל פועל). הוא עדיין חולק את לולאת האירועים — עסוק ≠ מת, והוא אינו מזהה הרעבה של לולאת האירועים (#10303) טוב יותר מ-TCP. העדיפו **TCP** אם בדיקות HTTP מגיעות לפסק זמן תחת עומס קטלוג/דחיסה; בכל מקרה, **אל** תהרגו את ה-pod עקב תקיעות קצרות של לולאת האירועים |
| **בדיקת תקינות מעמיקה** | `GET /api/monitoring/health` מבודק חיצוני                                       | לא מיועד ל-`livenessProbe` של kubelet או ל-`readinessProbe` בתדירות גבוהה                                                                                                                                                                                                                                  |

תבנית לדוגמה (התאימו את ערכי הסף להפעלה הקרה ולעומס הדחיסה שלכם):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # בעת תקיעה של לולאת האירועים, HTTP /livez עדיין עלול להגיע לפסק זמן. TCP הוא
  # החלופה השמרנית:
  # tcpSocket:
  #   port: http
```

**אל** תפנו את בדיקת ה-**liveness** של kubelet אל `/api/monitoring/health`. נתיב זה מבצע עבודה ממשית מול מסד הנתונים ומערכת הניטור, ויחזיר תוצאה חיובית שגויה תחת עומס.

קשור: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (בדיקות כאשר לולאת האירועים עסוקה), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (עומס יתר של תמחור הקטלוג), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (עומס יתר של ספירת טוקנים בדחיסה).

### עבודה אופציונלית בנתיב הבקשה (זיכרון, מיומנויות, רענון טוקנים)

חילוץ זיכרון, הזרקת מיומנויות ורענון טוקני OAuth חולקים את **לולאת האירועים הראשית של Node** עם `/healthz`. אלה תכונות המופעלות באמצעות מתגים בלוח הבקרה (`memoryEnabled`, `skillsEnabled`), ולא מאגר תהליכוני עבודה. ראו [סביבה — עלות לולאת האירועים](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### תקינות ספקים

> **אין נקודת קצה מסוג REST.** נתוני תקינות הספקים זמינים באמצעות כלי ה-MCP‏ `observability_snapshot` או בדף `/dashboard/providers` בלוח הבקרה.

### פרטי ספק

> **אין נקודת קצה מסוג REST.** פרטים לפי ספק זמינים בדף `/dashboard/providers` בלוח הבקרה.

---

## טייס אוטומטי לבריאות ספקים

המודול `providerHealthAutopilot.ts` הוא **מערכת בעלת יכולת תיקון עצמי** אשר:

1. מזהה בעיות אצל ספקים (מעגל פתוח, תקופות צינון, חסימות ואזהרות מכסה)
2. מפיקה **פעולות מומלצות** לפתרונן
3. יכולה **לבצע אוטומטית** פעולות בסיכון נמוך

### סוגי בעיות מזוהות

| סוג הבעיה                    | חומרה  | תנאי לדוגמה                        |
| ---------------------------- | ------ | ---------------------------------- |
| `provider_circuit_open`      | קריטית | מפסק המעגל נפתח לאחר 5 כשלים       |
| `provider_circuit_half_open` | אזהרה  | המעגל בודק אם השירות התאושש        |
| `connection_cooldown`        | אזהרה  | החיבור בתקופת צינון לאחר שגיאת 429 |
| `stale_connection_error`     | אזהרה  | הרענון האחרון נכשל לפני 30+ דקות   |
| `terminal_connection_error`  | קריטית | הרשאת OAuth בוטלה, המפתח אינו תקין |
| `inactive_connection`        | מידע   | החיבור הושבת בהגדרות               |
| `model_lockout`              | אזהרה  | מודל מסוים נמצא בהסגר              |
| `quota_monitor_warning`      | אזהרה  | ניצול המכסה הוא 80%+               |

### סוגי פעולות שנוצרות

| פעולה                          | סיכון  | תיאור                          |
| ------------------------------ | ------ | ------------------------------ |
| `clear_provider_breaker`       | בינוני | איפוס מפסק המעגל למצב סגור     |
| `clear_connection_cooldown`    | נמוך   | הסרת תקופת הצינון מחיבור       |
| `clear_stale_connection_error` | נמוך   | ניקוי דגל השגיאה המיושנת       |
| `clear_model_lockout`          | נמוך   | הפעלה מחדש של מודל שנמצא בהסגר |
| `reactivate_connection`        | בינוני | הפעלה מחדש של חיבור שהושבת     |
| `deactivate_connection`        | גבוה   | השבתת חיבור בעייתי             |

### API

> **אין נקודת קצה של REST.** בעיות הטייס האוטומטי זמינות באמצעות כלי ה-MCP‏ `observability_snapshot` או לוח המחוונים. הטייס האוטומטי פועל באופן פנימי; התנהגותו מוגדרת באמצעות מסד נתוני ההגדרות (השדה `autopilotMode` לכל חיבור), ולא באמצעות משתני סביבה — הפעלת `grep -rn` לחיפוש משתנה סביבה של מצב טייס אוטומטי אינה מחזירה תוצאות.

### מצב טייס אוטומטי

כברירת מחדל, הטייס האוטומטי פועל ב**מצב ידני** — הוא מזהה בעיות ומפיק פעולות מומלצות, אך אינו מחיל אותן אוטומטית. ניתן להחיל פעולות באמצעות לוח המחוונים.

---

## טייס אוטומטי לבריאות קומבינציות

`comboHealthAutopilot.ts` הוא המקביל **הייעודי לקומבינציות** של הטייס האוטומטי לספקים. הוא:

- מזהה קומבינציות שאינן תקינות
- ממליץ על שינוי סדר היעדים
- מציע להשבית יעדים שאינם תקינים
- מסיר אוטומטית יעדים מתים לאחר N כשלים

### דוגמאות לבעיות בקומבינציות

```
קומבינציה "always-on" (אסטרטגיית עדיפות)
├─ יעד 1: openai/gpt-5 (תקין)
├─ יעד 2: anthropic/claude-opus-4-6 (⚠️ המודל חסום עד 14:00)
└─ יעד 3: kiro/claude-sonnet-4-5 (תקין)

פעולה מומלצת: שינוי סדר — להעביר את kiro מעל anthropic עד שהחסימה תסתיים
```

---

## מנטרי מכסה

`observability.ts` חושף **מנטרי מכסה לכל הפעלה** עבור ספקי מנויים (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### משמעות הסטטוסים

| סטטוס       | מתי                     | פעולת ממשק המשתמש              |
| ----------- | ----------------------- | ------------------------------ |
| `starting`  | התשאול הראשוני מתבצע    | מחוון טעינה                    |
| `idle`      | אין פעילות אחרונה       | מוסתר מלוח המחוונים            |
| `healthy`   | נותרו יותר מ-50% מהמכסה | נקודה ירוקה                    |
| `warning`   | נותרו פחות מ-50% מהמכסה | התראה צהובה                    |
| `exhausted` | המכסה היא 0%            | חסימה אדומה, ניתוב לספק הבא    |
| `error`     | התשאול נכשל             | נקודה אדומה, ניסיון חוזר בקרוב |

### API

> **אין נקודת קצה של REST.** נתוני מנטרי המכסה זמינים באמצעות כלי ה-MCP‏ `observability_snapshot` או לוח המחוונים.

---

## תמונת מצב של יכולת התצפית

כלי ה-MCP‏ `observability_snapshot` מחזיר **תמונת מצב מלאה של המערכת** עבור סוכני AI:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* ראו לעיל */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

סוכנים משתמשים במידע זה כדי לקבל **החלטות ניתוב** — לדוגמה, "אם המעגל של openai פתוח, יש לנתב תחילה אל anthropic".

---

## בדיקת תקינות אסימונים

ספקי OAuth‏ (Claude Code, GitHub Copilot, Cursor) זקוקים ל**רענון אסימונים תקופתי**. הקובץ `src/lib/tokenHealthCheck.ts` מפעיל מתזמן ברקע:

- **מחזור סריקה**: כל 60 שניות (סריקה ב-`TICK_MS = 60 * 1000` ב-`src/lib/tokenHealthCheck.ts:30`)
- **מרווח בדיקת תקינות לכל חיבור**: ברירת המחדל היא 60 דקות (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); ניתן להגדרה באמצעות מסד הנתונים של ההגדרות
- **רענון מקדים בעת 401**: מטופל על ידי ה-interceptor של כל חיבור

### מצב תקינות האסימון

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### תצורה

תצורת בדיקת תקינות האסימונים מטופלת באופן פנימי על ידי `tokenHealthCheck.ts`.

### תקינות האסימונים

> **אין נקודת קצה של REST.** נתוני תקינות האסימונים זמינים דרך לוח הבקרה או כלי ה-MCP‏ `observability_snapshot`.

---

## התראות

### ערוצים מובנים

OmniRoute תומכת ב**3 ערוצי התראות**:

| ערוץ            | הגדרה      | תרחיש שימוש                    |
| --------------- | ---------- | ------------------------------ |
| כרזה בלוח הבקרה | פעילה תמיד | התראות בתוך היישום             |
| Webhook         | הגדרת URL  | Slack, Discord, PagerDuty      |
| יומן            | ברירת מחדל | לצבירת יומנים במערכות חיצוניות |

### תצורת Webhook

> **הערה:** תצורת התראות Webhook מנוהלת דרך דף ההגדרות בלוח הבקרה. עיינו בממשק המשתמש של ההגדרות להגדרת כתובת ה-URL של ה-Webhook, סינון אירועים והתאמה אישית של המטען.

### סוגי התראות

| התראה                        | מתי                               | חומרת ברירת המחדל |
| ---------------------------- | --------------------------------- | ----------------- |
| `provider_circuit_open`      | המעגל נפתח                        | קריטית            |
| `provider_circuit_half_open` | המעגל בודק התאוששות               | מידע              |
| `quota_warning`              | המכסה ב-80% ומעלה                 | אזהרה             |
| `quota_exhausted`            | המכסה ב-100%                      | קריטית            |
| `token_refresh_failed`       | 3 כשלי רענון רצופים ומעלה         | אזהרה             |
| `token_expired`              | האסימון עבר את מועד התפוגה        | קריטית            |
| `combo_target_unhealthy`     | יעד השילוב בתקופת צינון במשך שעה+ | אזהרה             |
| `db_integrity_warning`       | מספר הפרות FK גדול מ-0            | אזהרה             |
| `heap_pressure`              | השימוש בערימה גדול מ-80% מהסף     | אזהרה             |

---

## מדדי ביצועים

### מדדים במעקב

| מדד                     | סוג       | מקור                            |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | מונה      | `services/usage.ts`             |
| `request_latency_ms`    | היסטוגרמה | `services/usage.ts`             |
| `tokens_consumed`       | מונה      | `services/usage.ts`             |
| `cost_usd`              | מונה      | `services/usage.ts`             |
| `provider_errors`       | מונה      | `services/errorClassifier.ts`   |
| `circuit_state_changes` | מונה      | `services/resilience.ts`        |
| `cache_hits`            | מונה      | `services/signatureCache.ts`    |
| `compression_savings`   | היסטוגרמה | `services/compression/stats.ts` |
| `quota_used`            | מד        | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | מד        | `observability.ts`              |

### אחוזוני השהיה (p50/p95/p99)

> **אין נקודת קצה של REST.** נתוני אחוזוני ההשהיה זמינים דרך הדף `/dashboard/health` בלוח המחוונים. ייצוא ל-Prometheus/OpenTelemetry מתוכנן עבור v3.9.

### ייצוא ל-Prometheus / OpenTelemetry (שלב 2)

מתוכנן עבור v3.9: ייצוא מובנה ל-Prometheus, ל-OpenTelemetry ול-Datadog.

בינתיים, בצעו איסוף מ-`/api/monitoring/health` באמצעות כל מערכת ניטור מבוססת-HTTP (Prometheus blackbox exporter, בדיקת HTTP של Datadog וכדומה).

---

## מתכונים להתראות

### Slack

> **הערה:** התראות Webhook מוגדרות דרך דף ההגדרות בלוח המחוונים — אין משתני סביבה ייעודיים ל-Webhook (`grep -rn` מחזיר אפס תוצאות). עיינו בממשק המשתמש של ההגדרות כדי להגדיר כתובת URL של Webhook, סינון אירועים והתאמה אישית של המטען.

### Discord

> התראות Webhook משתמשות באותו תהליך בממשק המשתמש של ההגדרות כמו Slack. ‏Discord מקבל מטען JSON באותו מבנה.

### PagerDuty

> התראות Webhook משתמשות באותו תהליך בממשק המשתמש של ההגדרות. מפתחות הניתוב של PagerDuty Events API v2 מוגדרים בממשק המשתמש של ההגדרות.

### Webhook מותאם אישית (JSON)

> כל נקודת קצה של HTTP שמקבלת POST עם גוף JSON תתאים. הגדירו את כתובת ה-URL בממשק המשתמש של ההגדרות.

---

## הגדרת לוח המחוונים

### התאמה אישית של לוח המחוונים לבריאות המערכת

צרו קובץ `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### הצמדת ספק לראש הרשימה

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## פתרון בעיות

### "הספק מדווח שהוא תקין, אך הבקשות נכשלות"

1. בדקו את **בעיות הטייס האוטומטי** — ייתכן שדגם נחסם
2. עיינו ב-**שגיאות האחרונות** כדי למצוא את מחלקת השגיאה הספציפית
3. נסו את **בדיקת החיבור** בכרטיס הספק
4. בדקו אם הספק **מגביל את קצב הבקשות במעלה הזרם** (לא ניתן לראות זאת באופן מקומי)

### "המכסה מדווחת כתקינה, אבל אני רואה שגיאות 429"

- 429 פירושו שהספק מדווח שניצלתם את המכסה שלכם
- ייתכן שמעקב המכסות של OmniRoute **אינו עדכני** — נתוני הספק במעלה הזרם הם הקובעים
- נתוני המכסה מתרעננים אוטומטית באמצעות מנטר המכסות הפנימי

### "השילוב נכשל, אבל כל היעדים נראים תקינים"

- בדקו בלוח המחוונים של **בריאות השילוב** אם יש בעיות בסדר היעדים
- עיינו ב-**אירועי המעבר לחלופה** — ייתכן שהשילוב ממצה את האפשרויות מהר מדי
- ודאו שה-**אסטרטגיה** מתאימה לתרחיש השימוש שלכם (עדיפות לעומת סבב מחזורי לעומת אוטומטי)

### "בדיקת תקינות מסד הנתונים נכשלת"

- הריצו `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- אם מתקבל "ok" — זו אזעקת שווא; בדיקת התקינות מחמירה מדי
- אם מתקבלת תוצאה אחרת — **עצרו את OmniRoute** ופעלו לפי [המדריך להתאוששות מאסון](./DATABASE_GUIDE.md#disaster-recovery)

### "לחץ ערימת הזיכרון קריטי"

```bash
# בדיקת הערימה הנוכחית
node -e "console.log(process.memoryUsage())"

# הפעלת איסוף זבל ידני (אם --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# צמצום מספר הבקשות המקבילות (מוגדר דרך דף ההגדרות בלוח המחוונים, ולא באמצעות משתנה סביבה)
# אין משתנה סביבה בשם `MAX_CONCURRENT_REQUESTS` — יש להגדיר זאת דרך הגדרות ← מקביליות.
```

---

## ראו גם

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — מעקב אחר שימוש ועלויות
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — סכמת מסד הנתונים + תקינות
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — תקינות ה-proxy (מטמון נפרד)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ארכיטקטורת המערכת
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — פרטי מנתק המעגל
- מקור: `src/lib/monitoring/` (4 קבצים, 2121 שורות קוד)
