# 🌐 OmniRoute Proxy Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **עקפו חסימות גאוגרפיות, הגנו על זהותכם ונתבו תעבורת בינה מלאכותית דרך כל שרת proxy — ללא מורכבות בהגדרות.**

OmniRoute כוללת מערכת מלאה לניהול שרתי proxy, המאפשרת לנתב תעבורה אל ספקי בינה מלאכותית חיצוניים דרך שרתי proxy מסוג HTTP,‏ HTTPS או SOCKS5. בין אם אתם נמצאים באזור חסום, זקוקים לתחלופת כתובות IP או מעוניינים בטביעת אצבע חשאית — מדריך זה מכסה הכול.

---

## תוכן העניינים

- [מדוע להשתמש בשרתי Proxy?](#why-use-proxies)
- [סקירת הארכיטקטורה](#architecture-overview)
- [מערכת Proxy בעלת 4 רמות](#4-level-proxy-system)
- [מרשם שרתי Proxy‏ (CRUD)](#proxy-registry-crud)
- [שוק שרתי ה-Proxy החינמיים של 1proxy](#1proxy-free-proxy-marketplace)
- [תחלופת שרתי Proxy](#proxy-rotation)
- [מניעת זיהוי ופעולה חשאית](#anti-detection--stealth)
- [מצבי Proxy לתעבורה יוצאת](#upstream-proxy-modes)
- [ממשק לוח הבקרה](#dashboard-ui)
- [תיעוד ה-API](#api-reference)
- [משתני סביבה](#environment-variables)
- [פתרון בעיות](#troubleshooting)

---

## מדוע להשתמש בשרתי Proxy?

ספקי בינה מלאכותית רבים מגבילים גישה לפי אזור גאוגרפי. מפתחים ב**רוסיה, סין, איראן, קובה, טורקיה** ובמדינות אחרות נתקלים בשגיאות כגון:

```
unsupported_country_region_territory
```

גם מחוץ לאזורים חסומים, שרתי proxy שימושיים עבור:

| תרחיש שימוש              | תיאור                                                       |
| ------------------------ | ----------------------------------------------------------- |
| **עקיפת חסימה גאוגרפית** | גישה אל OpenAI,‏ Anthropic,‏ Codex ו-Copilot ממדינות חסומות |
| **תחלופת כתובות IP**     | פיזור בקשות בין כתובות IP מרובות כדי להימנע מהגבלת קצב      |
| **פרטיות**               | הסתרת כתובת ה-IP האמיתית שלכם מספקים חיצוניים               |
| **תאימות**               | ניתוב תעבורה דרך תחומי שיפוט מסוימים                        |
| **בדיקות**               | הדמיית בקשות מאזורים שונים                                  |

---

## סקירת הארכיטקטורה

```
┌───────────────────────────────────────────────────────────────┐
│                       שרת OmniRoute                           │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ מרשם        │    │ מנתב         │    │ אחזור            │  │
│  │ שרתי Proxy  │───▶│ שרתי Proxy   │───▶│ (undici)         │  │
│  │ (SQLite)    │    │ (עם מטמון)   │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ סנכרון      │                        │ API של ספק       │  │
│  │ 1proxy      │                        │ חיצוני           │  │
│  │ (מאגר חינמי)│                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### רכיבים מרכזיים

| רכיב                      | קובץ                                         | תפקיד                                             |
| ------------------------- | -------------------------------------------- | ------------------------------------------------- |
| **מרשם שרתי Proxy**       | `src/lib/db/proxies.ts`                      | פעולות CRUD עבור רשומות proxy והקצאות תחום        |
| **מנתב שרתי Proxy**       | `open-sse/utils/proxyDispatcher.ts`          | יצירת מנתבי ProxyAgent/SOCKS של `undici` עם מטמון |
| **אחזור דרך Proxy**       | `open-sse/utils/proxyFetch.ts`               | עטיפת `fetch()` עם הזרקת מנתב proxy               |
| **נתיב הגדרות**           | `src/app/api/settings/proxy/route.ts`        | API מיושן להגדרת proxy‏ (GET/PUT/DELETE)          |
| **נתיב ניהול**            | `src/app/api/v1/management/proxies/route.ts` | API לפעולות CRUD במרשם (GET/POST/PATCH/DELETE)    |
| **מסד הנתונים של 1proxy** | `src/lib/db/oneproxy.ts`                     | אחסון מתמשך עבור שוק שרתי ה-proxy החינמיים        |

---

## מערכת Proxy בעלת 4 רמות

OmniRoute תומך בהגדרת Proxy בארבעה **תחומים בלתי תלויים**, הנבדקים לפי סדר עדיפות:

```
סדר פתרון לפי עדיפות (מהגבוהה → לנמוכה):

  1. 🔵 Proxy לחשבון/חיבור  →  לכל מפתח API / חיבור OAuth
  2. 🟡 Proxy לספק          →  לכל ספק (למשל, כל התעבורה של OpenAI)
  3. 🟠 Proxy לשילוב         →  לכל תצורת שילוב/ניתוב
  4. 🟢 Proxy גלובלי         →  כל התעבורה, כל הספקים
```

### כיצד הפתרון פועל

כאשר OmniRoute שולח בקשה לספק במעלה הזרם, הוא קורא לפונקציה `resolveProxyForConnectionFromRegistry()`, שבודקת כל רמה לפי הסדר:

1. **רמת החשבון** — האם הוקצה Proxy למזהה החיבור הספציפי הזה?
2. **רמת הספק** — האם הוקצה Proxy לספק הזה (למשל, `openai`)?
3. **הרמה הגלובלית** — האם מוגדר Proxy גלובלי?
4. **ללא Proxy** — חיבור ישיר לספק.

ההתאמה הראשונה היא הקובעת. פירוש הדבר שניתן להגדיר Proxy גלובלי כברירת מחדל, אך לעקוף אותו עבור ספקים או חיבורים מסוימים.

### איזו תעבורה מועברת דרך Proxy

| סוג תעבורה         | מועברת דרך Proxy? | הערות                                          |
| ------------------ | ----------------- | ---------------------------------------------- |
| השלמות צ'אט        | ✅                | כל הבקשות אל `/v1/chat/completions`            |
| הטמעות             | ✅                | `/v1/embeddings`                               |
| יצירת תמונות       | ✅                | `/v1/images/generations`                       |
| שמע (TTS/STT)      | ✅                | `/v1/audio/*`                                  |
| החלפת אסימון OAuth | ✅                | פותר את `unsupported_country_region_territory` |
| בדיקות חיבור       | ✅                | הלחצן "בדיקת חיבור" משתמש ב-Proxy              |
| רענון אסימון       | ✅                | חידוש OAuth ברקע                               |
| סנכרון מודלים      | ✅                | הצגת מודלים וגילוים                            |

---

## מרשם Proxy‏ (CRUD)

מרשם ה-Proxy הוא טבלת SQLite‏ (`proxy_registry`) המאחסנת את כל שרתי ה-Proxy שלכם. לכל Proxy יש:

| שדה        | סוג      | תיאור                               |
| ---------- | -------- | ----------------------------------- |
| `id`       | UUID     | מזהה ייחודי                         |
| `name`     | מחרוזת   | תווית קריאה לבני אדם                |
| `type`     | מחרוזת   | פרוטוקול: `http`, `https`, `socks5` |
| `host`     | מחרוזת   | שם המארח או כתובת ה-IP של ה-Proxy   |
| `port`     | מספר שלם | מספר היציאה                         |
| `username` | מחרוזת   | שם משתמש לאימות (מוצפן במנוחה)      |
| `password` | מחרוזת   | סיסמת אימות (מוצפנת במנוחה)         |
| `region`   | מחרוזת   | תווית אזור גאוגרפי                  |
| `notes`    | מחרוזת   | הערות בטקסט חופשי                   |
| `status`   | מחרוזת   | `active` או `inactive`              |
| `source`   | מחרוזת   | `manual` או `oneproxy`              |

### יצירת Proxy

**דרך לוח הבקרה:**

1. עברו אל **הגדרות → Proxy**
2. לחצו על **הוספת Proxy**
3. מלאו את הסוג, המארח, היציאה ופרטי האימות האופציונליים
4. שמרו

**דרך ה-API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### עדכון Proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **הערה:** פרטי האימות נשמרים אלא אם שולחים במפורש ערכים חלופיים שאינם ריקים. שליחת מחרוזות ריקות עבור `username`/`password` תשאיר את הערכים המאוחסנים ללא שינוי.

### מחיקת Proxy

```bash
# נכשל אם ה-Proxy מוקצה לתחום כלשהו
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# מחיקה כפויה (מסירה גם את ההקצאות)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### הצגת שרתי Proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### הקצאת שרתי Proxy לתחומים

```bash
# הקצאה לתחום הגלובלי
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# הקצאה לספק מסוים
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# הקצאה לחיבור/מפתח מסוים
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### פתרון ה-Proxy האפקטיבי

בדקו באיזה Proxy ייעשה שימוש עבור חיבור נתון:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

מחזיר את ה-Proxy שנבחר יחד עם הרמה שלו (`account`, `provider` או `global`) והמקור.

### הקצאה מרוכזת

הקצו Proxy אחד למספר ספקים או חיבורים בבת אחת:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### ייבוא/ייצוא

שרתי Proxy נכללים במערכת **גיבוי/שחזור**. בעת ייצוא תצורת OmniRoute שלכם:

1. עברו אל **לוח הבקרה → הגדרות → גיבוי**
2. לחצו על **ייצוא** — מרשם ה-Proxy וההקצאות נכללים
3. כדי לשחזר, לחצו על **ייבוא** והעלו את קובץ הגיבוי

מרשם ה-Proxy תומך גם ב-**upsert לפי host+port** — אם מייבאים Proxy שכבר קיים (אותם מארח ויציאה), הוא מתעדכן במקום ליצור כפילות.

### מיגרציה ממערכת קודמת

אם הגדרתם שרתי proxy בגרסה ישנה יותר (לפני ה־registry), OmniRoute מעביר אותם אוטומטית:

```
מאגר key_value מדור קודם → proxy_registry + proxy_assignments
```

פעולה זו מתבצעת פעם אחת, בהפעלה הראשונה לאחר השדרוג. השתמשו ב־`migrateLegacyProxyConfigToRegistry({ force: true })` כדי להריץ אותה מחדש.

---

## שוק הפרוקסי החינמי של 1proxy

> 🆕 **נתרם על ידי [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (בעיה [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute משתלב עם הפלטפורמה הקהילתית **[1proxy](https://1proxy-api.aitradepulse.com)** כדי לספק גישה ל**מאות שרתי פרוקסי חינמיים ומאומתים** מרחבי העולם. פתרון זה מושלם למשתמשים שאין להם תשתית פרוקסי משלהם.

### כיצד זה עובד

```
┌─────────────┐    סנכרון     ┌─────────────────┐    החלפה     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │   ספק    │
│  (חיצוני)   │  עד 500 שרתי  │  source=oneproxy │  לפי איכות   │   API    │
└─────────────┘     פרוקסי     └─────────────────┘               └──────────┘
```

1. **סנכרון** — OmniRoute מושך שרתי פרוקסי מאומתים מה-API של 1proxy
2. **אחסון** — שרתי הפרוקסי נשמרים באותה טבלת `proxy_registry` עם `source = 'oneproxy'`
3. **סינון** — סינון לפי פרוטוקול, מדינה וציון איכות
4. **החלפה** — בחירת שרת הפרוקסי הטוב ביותר באמצעות אסטרטגיות איכות, בחירה אקראית או בחירה סדרתית
5. **הפחתה אוטומטית** — ציון האיכות של שרתי פרוקסי שנכשלו מופחת; מתחת לסף → הם מסומנים כלא פעילים

### סנכרון שרתי פרוקסי

**דרך לוח הבקרה:**

1. עברו לכרטיסייה **הגדרות ← 1proxy**
2. לחצו על **"סנכרן עכשיו"**
3. צפו בנתונים הסטטיסטיים: סך כל שרתי הפרוקסי, מספר הפעילים, איכות ממוצעת ופילוח לפי מדינה

**דרך ה-API:**

```bash
# הפעלת סנכרון
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# תגובה:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### סינון שרתי פרוקסי

```bash
# סינון לפי פרוטוקול
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# סינון לפי מדינה
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# סינון לפי ציון איכות מינימלי
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# שילוב מסננים
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### ציוני האיכות של שרתי הפרוקסי

כל שרת פרוקסי של 1proxy כולל מטא-נתונים:

| שדה             | תיאור                                    |
| --------------- | ---------------------------------------- |
| `qualityScore`  | דירוג 0-100 מתהליך האימות של 1proxy      |
| `latencyMs`     | השהיית הרשת שנמדדה                       |
| `anonymity`     | `transparent`, `anonymous` או `elite`    |
| `googleAccess`  | האם שרת הפרוקסי יכול לגשת לשירותי Google |
| `countryCode`   | קוד מדינה בן שתי אותיות לפי תקן ISO      |
| `lastValidated` | חותמת הזמן של האימות האחרון              |

ציוני האיכות מותאמים באופן דינמי:

- **בקשות שנכשלו** מפחיתות את הציון ב-10 נקודות
- **הציון יורד ל-≤10** → שרת הפרוקסי מסומן כ-`inactive`
- שרתי פרוקסי לא פעילים אינם נכללים בהחלפה

### אסטרטגיות החלפה

```bash
# החלפה לפי איכות (שרת הפרוקסי הטוב ביותר ראשון) — ברירת המחדל
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# החלפה אקראית
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# החלפה סדרתית (שרת הפרוקסי שאומת לפני הזמן הרב ביותר נבחר ראשון)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### מנתק מעגל

סנכרון 1proxy כולל מנתק מעגל מובנה:

- לאחר **5 כשלי סנכרון רצופים**, ניסיונות סנכרון נוספים נחסמים
- איפוס באמצעות: `resetOneproxyCircuitBreaker()` או הפעלה מחדש של השרת
- מצב הסנכרון זמין בכתובת `GET /api/settings/oneproxy?action=status`

### ניקוי שרתי הפרוקסי של 1proxy

```bash
# מחיקת שרת פרוקסי יחיד של 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# ניקוי כל שרתי הפרוקסי של 1proxy (שרתי פרוקסי ידניים אינם מושפעים)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## מניעת זיהוי ופעולה חשאית

OmniRoute לא רק מנתב תעבורה דרך פרוקסי — הוא גורם לתעבורה להיראות לגיטימית:

### זיוף טביעת אצבע של TLS

משתמש ב-`wreq-js` כדי ליצור טביעות אצבע של TLS הדומות לאלו של דפדפן, ובכך עוקף מערכות לזיהוי בוטים המסמנות לחיצות יד של TLS שאינן מגיעות מדפדפן.

### התאמת טביעת אצבע של CLI

האפשרות **הפעלת טביעת אצבע של CLI** (`הגדרות → אבטחה`) מסדרת מחדש כותרות HTTP ושדות בגוף JSON כדי להתאים במדויק לחתימה של קובצי CLI בינאריים מקוריים (Claude Code, Codex וכו'). מנגנון זה פועל **בנוסף** לפרוקסי:

```
ה-IP שלך (חסום) → IP של הפרוקסי (ארה"ב) → API של הספק
                    + זיוף TLS
                    + טביעת אצבע של CLI
```

כך מתקבלים בו-זמנית גם **הסתרת IP** וגם **אותנטיות של הבקשה**.

### שימור כתובת ה-IP של הפרוקסי

תגים מקודדי-צבע בלוח הבקרה מציגים איזו רמת פרוקסי פעילה:

| תג  | רמה     | משמעות                                |
| --- | ------- | ------------------------------------- |
| 🟢  | גלובלית | כל התעבורה עוברת דרך פרוקסי זה        |
| 🟡  | ספק     | רק התעבורה של ספק זה עוברת דרך פרוקסי |
| 🔵  | חיבור   | מפתח/חשבון מסוים זה משתמש בפרוקסי זה  |

התג מציג גם את כתובת ה-IP שאותרה עבור הפרוקסי לצורך אימות.

---

## מצבי פרוקסי במעלה הזרם

עבור ספקים המשתמשים בתבנית CLIProxyAPI, ‏OmniRoute תומך בשלושה מצבי פרוקסי במעלה הזרם:

| מצב           | תיאור                                                  |
| ------------- | ------------------------------------------------------ |
| `native`      | OmniRoute מטפל ישירות בניתוב דרך הפרוקסי (ברירת המחדל) |
| `cliproxyapi` | מאציל את הטיפול למופע CLIProxyAPI חיצוני               |
| `fallback`    | מנסה תחילה מצב מקורי, ואם הוא נכשל עובר ל-CLIProxyAPI  |

הגדרה לכל ספק:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## ממשק המשתמש של לוח הבקרה

### הגדרות ← לשונית פרוקסי

- הגדרת **פרוקסי גלובלי** (הגדרה חד-פעמית עבור כל התעבורה)
- דריסות **פרוקסי לכל ספק**
- הקצאות **פרוקסי לכל חיבור**
- **בדיקת חיבור** דרך הפרוקסי שהוגדר
- **תגים מקודדי-צבע** המציגים את רמת הפרוקסי הפעילה

### הגדרות ← לשונית 1proxy

- לחצן **סנכרון עכשיו** לקבלת שרתי פרוקסי חינמיים
- **כרטיסי סטטיסטיקה**: סה"כ, פעילים, איכות ממוצעת, סנכרון אחרון
- **מסננים**: פרוטוקול, קוד מדינה, איכות מינימלית
- **טבלת פרוקסי** עם מארח, פרוטוקול, מדינה, ציון איכות, זמן השהיה, אנונימיות וגישה ל-Google
- חלונית **מצב סנכרון** עם מעקב אחר הצלחות/כישלונות ומספר הכישלונות הרצופים
- **ניקוי הכול** להסרת כל רשומות 1proxy

---

## חומר עזר ל-API

### API להגדרות פרוקסי

| שיטה     | נקודת קצה                                      | תיאור                    |
| -------- | ---------------------------------------------- | ------------------------ |
| `GET`    | `/api/settings/proxy`                          | קבלת תצורת הפרוקסי המלאה |
| `GET`    | `/api/settings/proxy?level=global`             | קבלת הפרוקסי הגלובלי     |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | קבלת הפרוקסי של הספק     |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | איתור הפרוקסי שבפועל     |
| `PUT`    | `/api/settings/proxy`                          | עדכון תצורת הפרוקסי      |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | הסרת פרוקסי ברמה זו      |

### API למרשם הפרוקסי

| שיטה     | נקודת קצה                                         | תיאור                   |
| -------- | ------------------------------------------------- | ----------------------- |
| `GET`    | `/api/v1/management/proxies`                      | הצגת כל שרתי הפרוקסי    |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | קבלת פרוקסי לפי מזהה    |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | קבלת הקצאות פרוקסי      |
| `POST`   | `/api/v1/management/proxies`                      | יצירת פרוקסי            |
| `PATCH`  | `/api/v1/management/proxies`                      | עדכון פרוקסי            |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | מחיקת פרוקסי            |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | מחיקה כפויה             |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | הקצאה מרוכזת            |
| `GET`    | `/api/v1/management/proxies/assignments`          | הצגת הקצאות             |
| `GET`    | `/api/v1/management/proxies/health`               | נתוני תקינות של הפרוקסי |

### API למנהרות

למידע על חשיפת מופע OmniRoute שלך לאינטרנט הציבורי (Cloudflare/ngrok/Tailscale), במקום ניתוב תעבורה יוצאת דרך פרוקסי, עיין בקובץ [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). ‏REST API של המנהרה נמצא תחת `/api/tunnels/{cloudflared,ngrok,tailscale}/*` והוא בלתי תלוי בשרשרת הפרוקסי היוצאת המתועדת לעיל.

### API של 1proxy

| שיטה     | נקודת קצה                              | תיאור                             |
| -------- | -------------------------------------- | --------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | הצגת שרתי הפרוקסי של 1proxy       |
| `GET`    | `/api/settings/oneproxy?action=stats`  | קבלת נתונים סטטיסטיים ומצב סנכרון |
| `GET`    | `/api/settings/oneproxy?action=status` | קבלת מצב הסנכרון בלבד             |
| `POST`   | `/api/settings/oneproxy`               | הפעלת סנכרון                      |
| `POST`   | `/api/settings/oneproxy/rotate`        | מעבר לפרוקסי הבא                  |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | מחיקת פריט אחד                    |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | ניקוי הכול                        |

### API לפרוקסי במעלה הזרם

| שיטה     | נקודת קצה                         | תיאור                         |
| -------- | --------------------------------- | ----------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | קבלת תצורת הפרוקסי במעלה הזרם |
| `PUT`    | `/api/upstream-proxy/:providerId` | הגדרת מצב הפרוקסי במעלה הזרם  |
| `DELETE` | `/api/upstream-proxy/:providerId` | הסרת תצורת הפרוקסי במעלה הזרם |

---

## משתני סביבה

| משתנה                 | ברירת מחדל | תיאור                                                                |
| --------------------- | ---------- | -------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`     | הפעלת תמיכה בפרוקסי SOCKS5 (ברירת המחדל היא `true` ב-`.env.example`) |

---

## פתרון בעיות

### "פרוקסי SOCKS5 מושבת"

הגדירו `ENABLE_SOCKS5_PROXY=true` בקובץ `.env` שלכם והפעילו מחדש.

### שגיאות "socket hang up" דרך פרוקסי

זוהי תופעה רגילה בפרוקסי זולים שמנתקים חיבורים לא פעילים. OmniRoute כבר מטפל בכך באמצעות:

- השבתת keep-alive בחיבורי פרוקסי (`keepAliveTimeout: 1`)
- השבתת pipelining (`pipelining: 0`)
- שמירת dispatchers במטמון כדי להימנע מלחיצות יד חוזרות

אם הבעיה נמשכת, נסו פרוקסי אחר או השתמשו בתכונת הרוטציה של 1proxy.

### "unsupported_country_region_territory" במהלך OAuth

ודאו שהפרוקסי מוגדר **לפני** התחלת תהליך OAuth. OmniRoute מנתב את החלפת האסימונים של OAuth דרך הפרוקסי המוגדר. תחילה הגדירו פרוקסי גלובלי או פרוקסי ברמת הספק, ולאחר מכן התחברו.

### לא נעשה שימוש בפרוקסי

בדקו את סדר הרזולוציה:

1. אמתו באמצעות `GET /api/settings/proxy?resolve=your-connection-id`
2. בדקו אם `status` של הפרוקסי הוא `active` (ולא `inactive`)
3. ודאו שטווח ההקצאה של הפרוקסי תואם לחיבור שלכם

### סנכרון 1proxy נכשל

בדקו את מצב הסנכרון:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

אם `consecutiveFailures >= 5`, מפסק המעגל הופעל. הפעילו מחדש את השרת כדי לאפס אותו, או המתינו לאיפוס ידני.

---

## סכמת מסד הנתונים

### הטבלה `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' או 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (עבור 1proxy בלבד)
  latency_ms INTEGER,                        -- אלפיות השנייה (עבור 1proxy בלבד)
  anonymity TEXT,                            -- שקוף/אנונימי/עילית
  google_access INTEGER DEFAULT 0,           -- האם ניתן לגשת ל-Google? (1proxy)
  last_validated TEXT,                       -- חותמת זמן ISO (עבור 1proxy)
  country_code TEXT,                         -- קוד ISO בן 2 אותיות (עבור 1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### הטבלה `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- מזהה ספק, מזהה חיבור או מזהה שילוב
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## בדיקת תקינות פרוקסי (v3.8.16+)

מנגנון **הכשל המהיר של פרוקסי** של OmniRoute (`src/lib/proxyHealth.ts`) מזהה שרתי פרוקסי שאינם פעילים בתוך פחות מ-2 שניות באמצעות בדיקת חיבור TCP מהירה, ולאחר מכן **שומר את התוצאה במטמון** כדי למנוע תקורה בכל בקשה.

### כיצד זה עובד

```
בקשה ──▶ ProxyHealthCache.get(url)
          │
          ├─ פגיעה במטמון + עדכני?  ──▶ החזרת המצב השמור במטמון
          │
          └─ החטאה במטמון / מיושן?  ──▶ חיבור TCP אל host:port
                                         (זמן קצוב: FAST_FAIL_TIMEOUT_MS)
                                         ──▶ שמירה במטמון למשך HEALTH_CACHE_TTL_MS
                                         ──▶ החזרת התוצאה
```

ללא מנגנון זה, פרוקסי שאינו פעיל היה חוסם כל בקשה למשך מלוא `PROXY_TIMEOUT_MS` (ברירת המחדל היא 30 שניות) לפני הכישלון.

### משתני סביבה הניתנים לכוונון

| משתנה                        | ברירת מחדל | מטרה                                     |
| ---------------------------- | ---------- | ---------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`     | זמן קצוב לחיבור TCP עבור כל בדיקת תקינות |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`    | משך שמירת תוצאת התקינות במטמון           |

**ערכים מומלצים:**

| תרחיש                   | זמן קצוב לכשל מהיר | TTL של המטמון | נימוק                                                            |
| ----------------------- | ------------------ | ------------- | ---------------------------------------------------------------- |
| שער API בעל תפוקה גבוהה | 1500ms             | 60000ms       | כשל מהיר אגרסיבי ומטמון ארוך יותר כדי לצמצם בדיקות               |
| צמתים מבוזרים גאוגרפית  | 3000ms             | 15000ms       | רשתות איטיות זקוקות ליותר זמן; מטמון קצר יותר למעבר מהיר בעת כשל |
| פיתוח / בדיקות          | 1000ms             | 10000ms       | איטרציה מהירה בפרוקסי מקומיים                                    |
| הסוואה / מניעת זיהוי    | 2500ms             | 45000ms       | הימנעות מבדיקות מהירות שעלולות להפעיל מגבלות קצב                 |

### בדיקת תקינות הפרוקסי

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// אילוץ בדיקה מחדש של פרוקסי מסוים
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

הדגל `stale` הוא `true` כאשר רשומת המטמון חרגה מ-`HEALTH_CACHE_TTL_MS`, והבקשה הבאה תפעיל בדיקה חדשה.

### ברירות מחדל לפי סוג פרוקסי

בדיקת התקינות משתמשת בברירות מחדל הגיוניות בהתאם לסכמת ה-URL:

| סכמה                       | יציאת ברירת מחדל |
| -------------------------- | ---------------- |
| `http://`                  | 8080             |
| `https://`                 | 443              |
| `socks5://` / `socks5h://` | 1080             |

יציאות מותאמות אישית ב-URL (`http://host:9999`) תמיד מקבלות עדיפות על פני ברירת המחדל של הסכמה.

---

## ניתוח נתוני Proxy ויכולת תצפית

OmniRoute עוקב אחר השימוש בכל Proxy כדי לסייע למפעילים לאבחן דפוסי ניתוב, עליות חדות בהשהיה וכשלים חוזרים.

### אחר מה מתבצע מעקב

עבור כל בקשה העוברת דרך Proxy מוגדר, OmniRoute מתעד:

| מדד          | תיאור                                              |
| ------------ | -------------------------------------------------- |
| `proxy_url`  | כתובת ה-URL המלאה של ה-Proxy (פרטי האימות מוסתרים) |
| `provider`   | מזהה הספק במעלה הזרם (openai, anthropic וכדומה)    |
| `latency_ms` | זמן ההלוך ושוב הכולל, לרבות לחיצת היד עם ה-Proxy   |
| `connect_ms` | זמן התחברות TCP בלבד                               |
| `status`     | קוד מצב HTTP ממעלה הזרם                            |
| `error`      | מחלקת השגיאה אם הבקשה נכשלה                        |
| `timestamp`  | ISO 8601 UTC                                       |

### גישה לנתונים

```bash
# אירועי Proxy אחרונים
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

נקודת הקצה בפועל היא `/api/usage/proxy-logs` (ראו `src/app/api/usage/proxy-logs/route.ts`). נקודת קצה זו תומכת בפעולות הבאות:

- `GET /api/usage/proxy-logs` — אחזור יומני Proxy
- `DELETE /api/usage/proxy-logs` — מחיקת כל יומני ה-Proxy

במידת הצורך, ניתן לשלוף סטטיסטיקות מצטברות ישירות מהטבלה `proxy_logs` באמצעות SQL. ממשק לוח המחוונים עשוי להציע תצוגות מצטברות.

### דפוסים נפוצים

**זיהוי Proxy לא יציב** (עובר לסירוגין בין הצלחה לכישלון):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**איתור שרתי Proxy איטיים** (השהיית p95 גבוהה מ-2 שניות):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## עץ החלטה לאסטרטגיית רוטציה

כאשר מספר שרתי Proxy משויכים לטווח מסוים, OmniRoute משתמש ב**אסטרטגיית רוטציה** כדי לבחור באיזה מהם להשתמש עבור כל בקשה. האסטרטגיה מוגדרת ברמת הטווח (גלובלית, לפי ספק, לפי חשבון או לפי שילוב).

### אסטרטגיות זמינות

| אסטרטגיה               | מתי להשתמש                               | שיקולים                                                               |
| ---------------------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `quality` (ברירת מחדל) | סביבת ייצור עם שרתי Proxy באיכויות שונות | מעדיפה שרתי Proxy בעלי דירוג גבוה; עלולה להזניח שרתים בעלי דירוג נמוך |
| `random`               | חלוקת עומס, פרטיות                       | חלוקה אחידה; מתעלמת ממדדי איכות                                       |
| `sequential`           | ניפוי שגיאות, בדיקות דטרמיניסטיות        | עוברת בין שרתי ה-Proxy לפי הסדר; קלה להבנה                            |

### עץ החלטה

```
                    האם יש לכם ציוני איכות עבור שרתי ה-Proxy?
                    │
        ┌───────────┴───────────┐
        │                       │
       כן                      לא
        │                       │
   האם כל שרתי ה-Proxy          │
   דומים בקירוב                 │
   באיכותם?                     │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  כן        לא               השתמשו ב-
   │         │              `random`
   │         │              (חלוקה אחידה
   │         │              בונה נתוני איכות
   │         │              לאורך זמן)
   │         │
   │    השתמשו ב-`quality`
   │    (הטובה ביותר
   │    לאיכויות שונות)
   │
השתמשו ב-`random`
(פזרו את העומס
באופן אחיד)
```

## החרגה אוטומטית של תקלות עבור שרתי ה-Proxy שלכם

מאגר השוק של 1proxy כבר מפחית אוטומטית את דירוגם של שרתי Proxy שכשלו (ראו
[ציוני איכות Proxy](#proxy-quality-scores)). עבור
שרתי Proxy **שאתם** הוספתם למאגר, מתזמן בדיקות התקינות שפועל ברקע
(`src/lib/proxyHealth/scheduler.ts`) מספק את אותה התנהגות של "החרגה אוטומטית של
חבר שאינו פעיל מהשרשרת", מבלי למחוק דבר:

```bash
# .env — השבתה זמנית של Proxy לאחר 3 בדיקות רצופות שנכשלו, והפעלה מחדש
# באופן אוטומטי ברגע שהוא מתחיל להשיב שוב לבדיקות.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

כך הדבר משתלב בשרשרת מרובת שרתי Proxy:

1. המתזמן בודק כל Proxy רשום בכל `PROXY_HEALTH_INTERVAL_MS`
   (ברירת המחדל היא 10 דקות; המינימום הוא דקה אחת).
2. לאחר `PROXY_AUTO_REMOVE_AFTER` כשלים **חד-משמעיים** רצופים (כשל
   חיבור אמיתי — פסק זמן או שגיאת 5xx של יעד הבדיקה עצמו לעולם אינם נספרים, ראו
   [בדיקת תקינות Proxy](#proxy-health-checking-v3816)), ה-`status` של ה-Proxy
   מוגדר ל-`dead`.
3. `dead` הוא אחד הסטטוסים שמסנן הסטטוסים הפעילים, המשמש לפתרון מאגר/רוטציה,
   מחריג; לכן הרוטציה של תחום (round-robin / random / sticky /
   latency — ראו [עץ החלטות לאסטרטגיית רוטציה](#rotation-strategy-decision-tree))
   מפסיקה מיד להקצות את אותו Proxy לבקשות חדשות. שרתי Proxy אחרים במאגר אינם
   מושפעים, והמאגר כולו לעולם אינו חוזר בשקט לחיבור ישיר — ראו את מנגנון
   ברירת המחדל הסגורה של [מערכת ה-Proxy בעלת 4 הרמות](#4-level-proxy-system).
4. המתזמן ממשיך לבדוק שרתי Proxy במצב `dead` באותו מרווח זמן. הבדיקה המוצלחת
   הבאה משנה את ה-`status` בחזרה ל-`active`, והוא חוזר לרוטציה —
   אין צורך להוסיף אותו מחדש באופן ידני.

זוהי במכוון אפשרות **אופציונלית ולא הרסנית**: כברירת מחדל, המתזמן רק
סופר ומתעד כשלים ביומן (ראו מדיניות C בקובץ `decision.ts`), ו-`PROXY_AUTO_DISABLE`
לעולם אינו מוחק רשומה — לשם כך נועד הדגל הנפרד והאגרסיבי יותר
`PROXY_AUTO_REMOVE`. אם שניהם מוגדרים כ-`true`, ל-`PROXY_AUTO_REMOVE`
יש קדימות (אין טעם להשבית זמנית Proxy שעומד להימחק). ראו את מסמך העזר
[תצורת סביבה](../reference/ENVIRONMENT.md) לקבלת רשימת המשתנים המלאה.

---

> 📖 **תיעוד קשור:**
>
> - [מדריך למשתמש](../guides/USER_GUIDE.md) — הגדרה ותצורה כלליות
> - [מסמך עזר ל-API](../reference/API_REFERENCE.md) — תיעוד API מלא
> - [תצורת סביבה](../reference/ENVIRONMENT.md) — כל משתני הסביבה
