# Cursor Provider in Docker Environments (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

כאשר OmniRoute פועל בתוך Docker, התהליכים הישנים **ייבוא מ-Cursor IDE** /
`cursor-agent` נכשלים מפני שהקונטיינר אינו יכול לראות את התקנת Cursor במארח.
במקום זאת, השתמשו ב-**התחברות באמצעות Cursor** (deep-control PKCE).

## מדוע ייבוא מ-IDE / CLI נכשל ב-Docker

1. **בידוד מערכת הקבצים** — הייבוא האוטומטי מחפש נתיבי Linux כגון
   `~/.config/Cursor/User/globalStorage/state.vscdb` _בתוך_ הקונטיינר.
   ב-Docker Desktop עבור macOS, מסד הנתונים של ה-IDE במארח אינו ממופה כברירת מחדל,
   ומערכת ההפעלה של הקונטיינר היא Linux גם כאשר המארח הוא Darwin.
2. **אין קובץ בינארי של `cursor-agent`** — התמונות הרשמיות של OmniRoute אינן כוללות את
   `cursor-agent`. בעבר, „מודלים זמינים” הפעיל
   `cursor-agent --list-models` באמצעות מעטפת וחזר לקטלוג סטטי במקרה הצורך.
3. **קובץ בינארי שגוי** — **אין** לבצע bind mount של `cursor-agent` עבור macOS לתוך
   קונטיינר Linux. הוא לא יפעל.

## מומלץ: התחברות באמצעות Cursor

1. פתחו את **לוח הבקרה ← ספקים ← Cursor**.
2. בחרו בכרטיסייה **התחברות באמצעות Cursor**.
3. לחצו על **התחברות באמצעות Cursor** — ‏OmniRoute יפתח את
   `https://cursor.com/loginDeepControl?…` בדפדפן של **המארח**.
4. אשרו את ההתחברות בדפדפן ולאחר מכן חזרו ללוח הבקרה. OmniRoute
   מתשאל את `api2.cursor.sh/auth/poll` עד לקבלת האסימונים.
5. OmniRoute שומר אסימוני **גישה + רענון** ומרענן אותם באמצעות
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

נתיב זה אינו דורש את Cursor IDE או את `cursor-agent` בתוך הקונטיינר.

## גילוי מודלים

כאשר קיים חיבור מחובר, **מודלים זמינים / סנכרון אוטומטי** מעדיף את קטלוג
HTTP `AiService/AvailableModels` של Cursor באמצעות אסימון ה-bearer של החיבור.
אם פעולה זו נכשלת, OmniRoute עדיין מנסה להשתמש ב-`cursor-agent` שבמארח
(כאשר הוא קיים), ולאחר מכן בנתוני האתחול של הרישום הסטטי.

OmniRoute תמיד חושף את **`auto`** בקטלוג (תצוגה „אוטומטי”), וכן את
מצבי הניתוב בסגנון OpenCodex‏ **`auto-cost`**,‏ **`auto-balance`** ו-
**`auto-intelligence`**. בתעבורה, אלה ממופים למודל `default` של Cursor
(עם `optimization` מסוג ModelParameter עבור שלוש הגרסאות). העדיפו את
`cu/auto` כאשר מכסת השימוש במודלים מתקדמים אזלה — לעיתים קרובות עדיין קיימת מכסה עבור „אוטומטי”.

### הקטלוג החי הוא בלעדי לאחר סנכרון

לאחר סנכרון מוצלח של מודלי Cursor‏ (`cursor-agent --list-models` ← קטלוג מסונכרן
שנשמר, או האחזור המאומת באמצעות bearer של `AvailableModels` שתואר לעיל),
**לוח הבקרה**, **`/v1/models`** ורשימת **בדיקת הכול** מציגים:

1. מודלים שהוחזרו מהסנכרון החי
2. מזהי נתב אוטומטי שנוספו: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. מודלים **מותאמים אישית** של המפעיל (ייבוא / ידני) — לעולם אינם מוסרים בסנכרון

הרישום הסטטי הגדול תחת
`open-sse/config/providers/registry/cursor/` משמש **רק כגיבוי לא מקוון**. כאשר
הקטלוג המסונכרן ריק (או כאשר הגילוי נכשל), הרשימה חוזרת להשתמש ברישום זה.

עדיין ניתן **לבקש** בזמן ריצה מזהים עם סיומת מאמץ (לדוגמה `claude-4.6-sonnet-high`):
‏`resolveRequestedModel` מסיר את הסיומת והופך אותה ל-`ModelParameter` בתעבורה.
הרשימה הבלעדית מסתירה בכוונה את הגרסאות הסטטיות האלה מ„בדיקת הכול”, כדי שהבדיקות
יתאימו למה ש-Cursor מחזיר בפועל כזמין.

### פונקציות עזר

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — מיזוג לוח הבקרה
- `ensureCursorAutoCatalogEntry` — הוספת auto* בעת גילוי + הצגה ברשימה
- `shouldSuppressStaticModelForExclusiveListing` — הלולאה הסטטית של `/v1/models`

## מגבלות ספק (מכסה)

**שימוש ← מגבלות ספק** עבור Cursor משתמש בממשקי API עם Bearer ב-`api2.cursor.sh`
(`GetCurrentPeriodUsage` ← סיכום שימוש ← auth/usage) לאחר PKCE או ייבוא
אסימון. הנתיב הישן המבוסס על cookie/לוח הבקרה של `cursor.com` נשאר כאפשרות גיבוי אחרונה
עבור הפעלות ישנות שיובאו מה-IDE.

החלונות כוללים בדרך כלל את **סה״כ**, **אוטומטי + Composer** ו-**API**. אם
המגבלות נראות ריקות, הפעילו שוב את **התחברות באמצעות Cursor** או ייבאו מחדש אסימונים
(ייבוא מה-IDE בלבד אינו נדרש עוד).

## תורות ריקים / חריגה ממכסת השימוש

כאשר Cursor מקבל Run אך אינו מחזיר טקסט מהמסייע (מצב נפוץ כאשר מכסת השימוש
המתקדם מוצתה), OmniRoute מציג שגיאת **429** שימושית (רמזי מכסה) או
**502** עם הנחיות — ולא הודעה כללית של „הספק החזיר תוכן ריק”. כשלים
בהזרמה כגון `not_found: AI Model Not Found` (חלון השימוש מוצה) מסווגים
כ-**חריגה ממגבלת הקצב / מכסת השימוש של Cursor** ושומרים על הודעה זו
לאורך צינור ה-SSE (מנגנון ההגנה המשותף מפני זרם ריק אינו דורס שגיאה שכבר
נפלטה). בדקו את „מגבלות ספק”, נסו את המודל **`auto`**, או הגדילו את
מגבלות תוכנית Cursor.

## גרסת לקוח (ללא ממשק גרפי)

ללא התקנה מקומית של `cursor-agent`,‏ OmniRoute פותר את
`x-cursor-client-version` באמצעות משתנה הסביבה `CURSOR_AGENT_CLI_VERSION`,
לאחר מכן באמצעות סריקה השמורה במטמון בדיסק של סקריפט ההתקנה של Cursor,
ולבסוף באמצעות מזהה build מוצמד. בעת הצורך, דרסו זאת באמצעות
`CURSOR_AGENT_CLI_VERSION`.

## חלופה: ייבוא אסימון ידני

אם אינכם יכולים להשלים את ההתחברות בדפדפן:

1. במארח, חלצו את האסימונים מתוך `state.vscdb` של Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. פתחו את **ייבוא אסימון** בחלון האימות של Cursor.
3. הדביקו את **אסימון הגישה**, וכאשר הוא זמין, את **אסימון הרענון** (נדרש
   לרענון אוטומטי). מזהה המחשב הוא אופציונלי.

ייבוא של אסימון גישה בלבד עדיין פועל, אך תוקפו יפוג ללא אסימון רענון —
ייבאו אותו מחדש כאשר הצ׳אט מחזיר שגיאות אימות.

## מידע קשור

- הנחיות Docker עבור Zed: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- מידע חיצוני על התחברות Cursor ב-OpenCodex:
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
