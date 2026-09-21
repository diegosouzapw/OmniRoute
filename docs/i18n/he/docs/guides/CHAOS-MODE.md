# Chaos Mode (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **לוח הבקרה:** **מצב Chaos** (סרגל הצד) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (הפעלת לוח הבקרה) · `POST /api/skills/collect/chaos` (מפתח API)  
> **קוד מקור:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

מצב Chaos שולח **משימה אחת למספר ספקים בו-זמנית** — כל ספק משתתף
תורם מופע אחד של מודל, ואתם מקבלים את כל התשובות זו לצד זו (או בשרשרת). זהו
ממשק הפעלה מרובה-מודלים, ולא אסטרטגיית ניתוב: התעבורה הרגילה שלכם אל `/v1/chat/completions`
לעולם אינה מושפעת ממנו.

**הבהרה — שלושה דברים שונים מופצים עם "chaos" בשם:**

| דבר               | מה זה                                                                                      | היכן מתועד                                   |
| ----------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **מצב Chaos**     | דף לוח הבקרה + ה-API המתוארים כאן: פיזור משימה אחת לספקים רבים (במקביל או בשיתוף פעולה).   | מדריך זה                                     |
| `auto/chaos`      | מזהה מודל Auto-Combo עם משקלי ניקוד להזרקת תקלות, לצורך בדיקות עמידות. אין מה להגדיר.      | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| תצורת שילוב Chaos | שילוב שמור עם `config.chaos.enabled`, המפזר בקשות לפאנל עם מודל שופט אופציונלי (API בלבד). | `open-sse/services/autoCombo/chaosEngine.ts` |

## הגדרה

1. פתחו את **לוח הבקרה → מצב Chaos** (`/dashboard/chaos`).
2. **הפעילו** אותו — מצב Chaos מופץ כשהוא **מושבת כברירת מחדל** (`enabled: false` בתוך
   `src/lib/chaos/chaosConfig.ts`). כאשר הוא מושבת, `POST /api/chaos/run` מחזיר
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. בחרו את המשתתפים ואת ברירות המחדל (נשמרים לכל מופע באמצעות מאגר ההגדרות):

   | שדה                 | משמעות                                                          | ברירת מחדל / מגבלות        |
   | ------------------- | --------------------------------------------------------------- | -------------------------- |
   | `enabled`           | מתג ראשי                                                        | `false`                    |
   | `defaultMode`       | `parallel` או `collaborative` (ראו להלן)                        | `parallel`                 |
   | `providerOverrides` | השתתפות לפי ספק (`providerId`,‏ `modelId` אופציונלי, `enabled`) | ריק = כל ספק פעיל, עד 200  |
   | `systemPrompt`      | עקיפה של הנחיית המערכת המובנית של Chaos                         | אופציונלי, עד 10,000 תווים |
   | `timeoutMs`         | הזמן המרבי לכל קריאה למודל                                      | `120000` (5,000–600,000)   |
   | `maxTokens`         | `max_tokens` לכל קריאה למודל                                    | `4096` (256–128,000)       |

4. הפעילו **בדיקה מהדף עצמו** — חלונית התוצאות מציגה את התשובה של כל ספק,
   את הסטטוס ואת משך הזמן.

## מצבי הפעלה

- **`parallel`** — כל מודל מקבל את אותה משימה בו-זמנית; אתם מקבלים את כל התשובות
  באופן בלתי תלוי.
- **`collaborative`** — המודלים פועלים **בשרשרת**: כל אחד רואה את הפלט של המודל הקודם
  ומתבקש לשפר, להרחיב, לבקר או להציע חלופה. השדה `summary` בתגובה
  משרשר את הפלטים שהצליחו לפי סדר השרשרת (להפעלות מקבילות אין `summary`).

## API

### `POST /api/chaos/run` — הפעלת לוח הבקרה

מאומת באמצעות קובצי Cookie (הפעלת הניהול — ראו
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); משמש את דף לוח הבקרה.

```jsonc
// גוף הבקשה
{
  "task": "Compare approaches to X", // חובה
  "providers": ["glm", "kimi"], // מסנן אופציונלי
  "mode": "parallel", // אופציונלי — עוקף את defaultMode
  "systemPrompt": "…", // עקיפה אופציונלית
  "maxTokens": 4096, // עקיפה אופציונלית
}
```

### `POST /api/skills/collect/chaos` — מפתח API

גרסת אסימון Bearer עבור קוראים חיצוניים. המפתח חייב לכלול את **הרשאת מצב Chaos**
(`chaosModeEnabled`), אשר **מושבתת כברירת מחדל** — הפעילו אותה לכל מפתח בנפרד תחת
**לוח הבקרה → מנהל ה-API → עריכת מפתח → הרשאות → מצב Chaos**. גוף הבקשה זהה לזה שלעיל.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

שתי נקודות הקצה מחזירות את אותו מבנה:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // במצב collaborative בלבד
}
```

## פתרון בעיות

- **`400 Chaos Mode is not enabled`** — ראו שלב 2 לעיל: המתג הגלובלי כבוי.
- **מפתח ה-API נדחה ב-`/api/skills/collect/chaos`** — למפתח חסרה ההרשאה הייעודית
  `chaosModeEnabled` (מושבתת כברירת מחדל; זוהי הגדרה, לא שגיאה).
- **ספק שציפיתם לראות חסר בתוצאות** — בדקו את `providerOverrides` בדף
  מצב Chaos (עקיפה מושבתת מחריגה אותו) וכן אם החיבור לספק פעיל.
