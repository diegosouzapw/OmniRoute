# Cursor Image Generation (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute חושף **יצירת תמונות** במסגרת תוכנית Cursor בנקודת הקצה `POST /v1/images/generations`, באמצעות אותו מזהה ספק המשמש לצ'אט: `cursor` (כינוי `cu`).

| שדה                    | ערך                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------ |
| מזהה `IMAGE_PROVIDERS` | `cursor`                                                                             |
| פורמט                  | `cursor-agent-image`                                                                 |
| אימות                  | אותו חיבור OAuth / מפתח API המשמש לצ'אט (`provider_connections.provider = "cursor"`) |
| מודלים                 | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                            |

## למה Agent CLI

הצ'אט של Cursor ב-OmniRoute משתמש ב-`agent.v1.AgentService/Run` (protobuf). נתיב זה **דוחה** כלי לקוח מובנים (shell, write, …). יצירת תמונות היא כלי מובנה של Cursor שמופעל באמצעות **ה-CLI ‏`agent`** מול הרישיון. לכן מטפל התמונות מפעיל את `agent` עם prompt נעול וסביבת עבודה זמנית נפרדת לכל בקשה (במבנה זהה לגשרי רישיונות קהילתיים), ולאחר מכן מחזיר `b64_json` תואם OpenAI.

## הגבלת גישה (כללים קשיחים #15 + #17)

זהו הפורמט היחיד של `IMAGE_PROVIDERS` שמפעיל תהליך בן (הקובץ הבינארי
`agent`). מכיוון ש-`POST /v1/images/generations` משותף לכ-40 ספקי תמונות אחרים
שאינם מפעילים תהליכים, ושמתקשרים מרוחקים משתמשים בהם באופן לגיטימי, הנתיב כולו **אינו**
מסווג כ-`LOCAL_ONLY` — במקום זאת, `handleCursorAgentImageGeneration` אוכף שער
משלו באמצעות תוצאת `AUTHZ_HEADER_PEER_LOCALITY` המהימנה, שצינור האימות וההרשאה
מטביע בכל בקשה (על סמך עמית ה-TCP האמיתי, ולעולם לא על סמך הכותרת `Host` הניתנת
לזיוף): רק מתקשרים מסוג `loopback` ו-`lan` רשאים להגיע להפעלת התהליך; כל האחרים
(כולל מפתח API שדלף ומופעל מחדש דרך מנהרה ציבורית) מקבלים `403` לפני שמתבצע חיפוש
כלשהו אחר פרטי גישה או מופעל תהליך. ראו `src/server/authz/policies/management.ts`
לצפייה באותה מדיניות המוחלת על שאר רובד `LOCAL_ONLY`.

## שער המקביליות הוא ברמת המודול (מגבלת מופע יחיד)

`CURSOR_IMG_MAX_CONCURRENT` נאכף באמצעות מונה/תור בזיכרון, שהיקפו מוגבל למופע
מודול ה-Node ‏(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
הוא מגביל כראוי הפעלות מקביליות של `agent` בתוך תהליך OmniRoute יחיד, אך **אינו**
מתאם בין מספר תהליכים/מופעים החולקים את אותו רישיון Cursor
(לדוגמה, בפריסה מרובת עותקים) — כל מופע אוכף מגבלה עצמאית משלו.
בפריסה של מופע יחיד (ברירת המחדל) המגבלה מדויקת; בפריסות בעלות הרחבה
אופקית מומלץ להגדיר ערך שמרני של `CURSOR_IMG_MAX_CONCURRENT` לכל מופע, או לנתב
את תעבורת התמונות של Cursor למופע יחיד.

## דרישות

1. חשבון Cursor מחובר בלוח הבקרה (OAuth או מפתח API מסוג `crsr_…`).
2. הקובץ הבינארי Cursor Agent זמין לתהליך OmniRoute:
   - משתנה הסביבה `CURSOR_AGENT_BIN=/path/to/agent`, או
   - `~/.local/bin/agent`, או
   - `providerSpecificData.agentBin` בחיבור Cursor.

כוונון אופציונלי:

| משתנה סביבה                 | ברירת מחדל            | משמעות                     |
| --------------------------- | --------------------- | -------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`              | זמן מרבי כולל לכל תמונה    |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                   | שער מקביליות לרישיון משותף |
| `CURSOR_IMG_MODEL`          | (מודל הבקשה / `auto`) | דריסת `--model` של ה-CLI   |

## דוגמה

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

היצירה אורכת בדרך כלל 1–2 דקות. מומלץ להשתמש בנתיב רשת פנימי; שרתי proxy בקצה עם זמני קצוב של כ-100 שניות ייכשלו.

## LiteLLM

רשמו מודל תמונות עם `mode: image_generation`, ‏`api_base: http://omniroute:20128/v1` ו-`model: openai/cursor/auto` (או `cursor/auto` ללא קידומת, בהתאם לגרסת LiteLLM שלכם).
