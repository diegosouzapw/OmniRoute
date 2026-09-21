# Webhooks (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **מקור האמת:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **עדכון אחרון:** 2026-06-28 — v3.8.40

OmniRoute יכול לשלוח webhooks מסוג HTTP בתגובה לאירועי פלטפורמה. השתמשו בהם כדי להשתלב עם
Slack, PagerDuty, Datadog, שירותי התראות פנימיים או כל מקלט HTTP.

הרכיב המשגר חותם על כל מסירה באמצעות HMAC-SHA256, מנסה שוב במקרה של
כשלים זמניים, עוקב אחר תקינות המסירות של כל webhook ומשבית אוטומטית נקודות קצה
שממשיכות להיכשל.

## אירועים נתמכים

הטיפוס `WebhookEvent`‏ (`src/lib/webhooks/eventDescriptions.ts`, הנצרך על ידי `src/lib/webhookDispatcher.ts`) מייצג כרגע ארבעה אירועים בדיוק:

| אירוע               | מופעל כאשר                                                         |
| ------------------- | ------------------------------------------------------------------ |
| `request.completed` | בקשה שהועברה באמצעות proxy מסתיימת בהצלחה                          |
| `request.failed`    | בקשה שהועברה באמצעות proxy נכשלת לאחר כל הניסיונות החוזרים/החלופות |
| `quota.exceeded`    | מפתח API חוצה סף תקציב/מכסה                                        |
| `test.ping`         | אירוע סינתטי המשמש את נקודת הקצה לבדיקה                            |

מינויים מקבלים את הערך המילולי `"*"` כדי לקבל כל אירוע. שמות אירועים לא מוכרים
ב-`events` זוכים להתעלמות בזמן השיגור.

> הערה: ה-API של הרכיב המשגר מחובר, אך אתרי הקריאה בסביבת הייצור עבור חלק
> מהאירועים שאינם `test.ping` עדיין נמצאים בתהליך הוספה. בדקו באמצעות `grep dispatchEvent`
> אילו נתיבים מפעילים כרגע את הרכיב המשגר בגרסה שלכם.

## ארכיטקטורה

```
גורם קורא (מטפל, שירות, מנטר)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> סינון לפי webhook.events
    -> עבור כל התאמה (במקביל):
       deliverWebhook(url, payload, secret)
         בניית מטען { event, timestamp, data }
         חתימה על הגוף באמצעות HMAC-SHA256 (אם קיים secret)
         POST עם פסק זמן של 10 שניות
         עד 3 ניסיונות חוזרים במקרה של 5xx / שגיאת רשת
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

השיגור מתבצע בשיטת שגר ושכח מבחינת הגורם הקורא: `Promise.allSettled` בולע
שגיאות של webhooks בודדים, כך שמקלט תקול אחד אינו יכול לחסום את האחרים.

## חתימת HMAC

כאשר ל-webhook יש `secret`,‏ OmniRoute חותם על גוף ה-JSON ושולח:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> שמות הכותרות משתמשים בקידומת `X-Webhook-*` (ולא `X-OmniRoute-*`). ערך החתימה
> הוא `sha256=<hex>` — יש לאמת את הקידומת המלאה.

אם `createWebhook` נקראת ללא סוד, מודול מסד הנתונים יוצר אחד
(`whsec_<48 hex>`), כך שכל ה-webhooks חתומים כברירת מחדל.

### אימות בצד המקלט

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

יש לבצע תמיד את האימות מול גוף הבקשה **הגולמי**, לפני ניתוח JSON כלשהו.

## מדיניות ניסיונות חוזרים וכשלים

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- זמן קצוב של 10 שניות לכל ניסיון (`AbortController`).
- HTTP 2xx נחשב להצלחה.
- HTTP 3xx/4xx נחשב לסטטוס סופי ללא ניסיון חוזר — נרשם כנמסר
  עם `success = res.ok`.
- עבור HTTP 5xx ושגיאות רשת מתבצעים ניסיונות חוזרים עם השהיה מעריכית:
  `2^attempt * 1000 ms` (שנייה אחת, 2 שניות, 4 שניות).
- לאחר `maxRetries`, המסירה נרשמת ככישלון.
- כל מסירה מעדכנת את `last_triggered_at`, את `last_status`, ומאפסת
  או מגדילה את `failure_count`.
- לאחר כל הפצה, המפיץ קורא ל-`disableWebhooksWithHighFailures(10)`,
  כך שכל webhook עם `failure_count >= 10` מושבת אוטומטית.

## מסד נתונים

הטבלה `webhooks` (מיגרציה `011_webhooks.sql`):

| עמודה               | סוג     | הערות                                  |
| ------------------- | ------- | -------------------------------------- |
| `id`                | TEXT PK | UUID                                   |
| `url`               | TEXT    | כתובת URL של היעד                      |
| `events`            | TEXT    | מערך JSON; ברירת המחדל היא `["*"]`     |
| `secret`            | TEXT    | סוד HMAC (נוצר אוטומטית אם לא סופק)    |
| `enabled`           | INT     | 0/1; ברירת המחדל היא 1                 |
| `description`       | TEXT    | תווית אנושית אופציונלית                |
| `created_at`        | TEXT    | `datetime('now')`                      |
| `last_triggered_at` | TEXT    | מתעדכן בכל ניסיון מסירה                |
| `last_status`       | INT     | סטטוס HTTP של הניסיון האחרון (0 = רשת) |
| `failure_count`     | INT     | מתאפס ל-0 בהצלחה, גדל ב-1 בכישלון      |

היסטוריית המסירות נשמרת בטבלה הייעודית `webhook_deliveries`
(מיגרציה `069_webhook_deliveries.sql`, נכתבת באמצעות
`src/lib/db/webhookDeliveries.ts::insertDelivery` בכל ניסיון), בנוסף
למונים המצטברים בשורה של `webhooks`. מטא-נתונים של סוג (Slack / Discord /
Telegram / ממירי מטען מותאמים אישית) נוספו על ידי `070_webhooks_kind_metadata.sql`.

## API מסוג REST

כל נקודות הקצה דורשות אימות ניהולי (`requireManagementAuth`).

| נקודת קצה                       | שיטה   | תיאור                                     |
| ------------------------------- | ------ | ----------------------------------------- |
| `/api/webhooks`                 | GET    | הצגת webhooks (הסודות מוסתרים חלקית)      |
| `/api/webhooks`                 | POST   | יצירת webhook                             |
| `/api/webhooks/[id]`            | GET    | פרטי webhook (הסוד המלא)                  |
| `/api/webhooks/[id]`            | PUT    | עדכון שדות                                |
| `/api/webhooks/[id]`            | DELETE | הסרה                                      |
| `/api/webhooks/[id]/test`       | POST   | שליחת `test.ping` (ללא ניסיונות חוזרים)   |
| `/api/webhooks/[id]/deliveries` | GET    | ניסיונות מסירה אחרונים עבור webhook מסוים |
| `/api/webhooks/validate-url`    | POST   | אימות מקדים של כתובת URL (הגנת SSRF)      |

`GET /api/webhooks` מסתיר חלק מהסוד בפורמט `<first 10 chars>...` כדי למנוע דליפה
בדפי רשימות. השתמשו בבקשת GET של `[id]` כאשר אתם באמת זקוקים לסוד.

### יצירת webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

אם `secret` הושמט, השרת יוצר סוד מסוג `whsec_<hex>` ומחזיר
אותו בתגובה.

### בדיקת webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

מחזיר `{ delivered, status, error }`. לא מתבצעים ניסיונות חוזרים — שימושי
לאימות מהיר שהצד המקבל מקבל את המטען ואת החתימה.

## לוח בקרה

דף לוח הבקרה ב-`/dashboard/webhooks` (ראו
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) מספק:

- יצירה/עריכה של webhooks באמצעות בורר אירועים
- מחוון מצב (פעיל / לא פעיל / שגיאה) המבוסס על `enabled`,
  `failure_count` ו-`last_status`
- שליחת בדיקה בלחיצה אחת
- מתג ידני להפעלה/השבתה

## דוגמאות למטענים

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

מבני השדות עבור אירועים שאינם `test.ping` מוגדרים באתרי הקריאה שפולטים
אותם; יש להתייחס לאובייקט `data` כתואם לשינויים עתידיים (הוסיפו שדות, אל תסתמכו על
היעדרם).

## שיטות עבודה מומלצות

- **אמתו את החתימה בכל שליחה** מול גוף הבקשה הגולמי — הדבר מונע
  בקשות POST מזויפות מכל מי שמנחש את כתובת ה-URL של ה-webhook שלכם.
- **הגיבו עם 2xx בתוך כ-5 שניות** — הזמן המוקצב למפיץ מסתיים לאחר 10 שניות. מקלטים
  איטיים יבזבזו ניסיונות חוזרים וינפחו את `failure_count`.
- **הפכו את המטפלים לאידמפוטנטיים** — ניסיונות חוזרים וסמנטיקת מסירה של פעם אחת לפחות
  משמעם שכפילויות אפשריות.
- **הירשמו באופן מינימלי** — ציינו רק אירועים שאתם צורכים בפועל; `"*"` יוסיף
  עלות למקלטים שאינם בשליטתכם.
- **עקבו אחר `failure_count`** — נקודות קצה מושבתות אוטומטית לאחר 10
  כשלים רצופים; אפסו אותו באמצעות קריאה אל `PUT /api/webhooks/[id]` עם `enabled: true`
  לאחר תיקון המקלט.
- **החליפו סודות באופן תקופתי** — בצעו `PUT` עם `secret` חדש, פרסו את הערך החדש
  במקלט ואשרו באמצעות נקודת הקצה לבדיקה.

## ראו גם

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — הממשק המלא של API הניהול
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — סמנטיקת מנתק מעגל / זמן צינון
  שמאחורי כשלי ספקים הנחשפים באמצעות `request.failed`
- מקור: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
