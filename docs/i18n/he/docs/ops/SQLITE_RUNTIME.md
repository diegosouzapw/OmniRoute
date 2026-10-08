# SQLite Runtime Resolution (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute מאתר את מנהל ההתקן של SQLite בעת ההפעלה באמצעות שרשרת גיבוי בת 5 שלבים:

1. **`better-sqlite3` המצורף** (דרך `dependencies` ב-`package.json`)
   — המהיר ביותר, קובץ בינארי מקורי, המותקן על ידי `npm install` כאשר כלי בנייה זמינים.

2. **`better-sqlite3` המותקן בזמן ריצה** (בתוך `~/.omniroute/runtime/`)
   — מותקן באופן עצל בעת ההפעלה הראשונה **או** על ידי `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   לפני הטעינה, מתבצע אימות של בתי הקסם בקובץ `.node` המקורי (ELF / Mach-O / PE)
   כדי להגן מפני קבצים בינאריים פגומים או כאלה שנבנו לפלטפורמה שגויה.

3. **`node:sqlite`** (הספרייה הסטנדרטית של Node ≥22.5) — אינו דורש בנייה מקורית; משמש כאשר
   שני הנתיבים של better-sqlite3 נכשלים. ערכת תכונות מוגבלת.

4. **`sql.js`** (WASM) — אפשרות הגיבוי האחרונה. פועל בכל מקום, אך איטי יותר
   וכותב נתונים במרווחי זמן במקום באופן סינכרוני.

## מדוע נדרשת המורכבות הזו?

- **Windows EBUSY**: הפקודה `npm install -g omniroute@latest` עלולה להיכשל אם הקובץ
  `better_sqlite3.node` של הגרסה הקודמת נעול על ידי תהליך פעיל. ההתקנה בזמן
  ריצה בתוך `~/.omniroute/runtime/` עוקפת את המטמון הגלובלי של npm.
- **אין כלי בנייה**: סביבות מסוימות (Windows ארגוני ללא VS Build
  Tools, תמונות Docker מינימליות) אינן יכולות להדר את `better-sqlite3`. מתקין
  זמן הריצה מאתר קובץ בינארי שנבנה מראש במאגר npm; מנהלי ההתקן החלופיים
  מבטיחים ש-OmniRoute עדיין יופעל גם אם פעולה זו נכשלת.
- **מערכות מבודדות מהרשת**: אם מאגר npm אינו נגיש, `node:sqlite`
  או `sql.js` מבטיחים פונקציונליות בסיסית.

## אימות בתי קסם

לפני טעינת קובץ `.node` שהותקן בזמן ריצה, OmniRoute קורא את 8 הבתים
הראשונים ומשווה אותם לערכי הקסם המוכרים של הפלטפורמות:

| פלטפורמה              | בתים (הקסדצימלי) | תווית       |
| --------------------- | ---------------- | ----------- |
| Linux                 | `7F 45 4C 46`    | `elf`       |
| macOS‏ 64-bit BE      | `FE ED FA CF`    | `macho`     |
| macOS‏ 64-bit LE      | `CF FA ED FE`    | `macho-le`  |
| macOS fat (אוניברסלי) | `CA FE BA BE`    | `macho-fat` |
| Windows               | `4D 5A` (MZ)     | `pe`        |

ערך קסם שאינו תואם → המערכת מתעלמת מהקובץ וממשיכה לשלב הגיבוי הבא.

## בדיקת מנהל ההתקן הפעיל

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## שליטה ידנית

```bash
# דילוג על החימום שלאחר ההתקנה (להתקנות CI מהירות)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# התקנה מחדש בכפייה של better-sqlite3 בזמן ריצה
rm -rf ~/.omniroute/runtime
omniroute  # יותקן מחדש בהפעלה הבאה

# בדיקת מנהל ההתקן הפעיל
omniroute config db-info  # (אם פקודת ה-CLI קיימת)
```

## חומר עזר

מימוש:

- `bin/cli/runtime/magicBytes.mjs` — פונקציות עזר לאימות בתי קסם של קבצים בינאריים
- `bin/cli/runtime/sqliteRuntime.mjs` — מאתר בזמן ריצה בן 5 שלבים + מתקין עצל
- `bin/cli/runtime/index.mjs` — מתזמר ההפעלה (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — נקודת חיבור לאחר התקנת npm (חימום שאינו גורם לכשל)
- `src/lib/db/core.ts` — ייצוא של `ensureDbInitialized()` / `getDriverInfo()`

## טופולוגיה עם כותב יחיד (אין תמיכה בזמינות גבוהה)

שרשרת מנהלי ההתקן החלופיים שלעיל עדיין פועלת בתוך **תהליך אחד**. בתצורת ברירת המחדל של SQLite,
OmniRoute הוא **כותב יחיד**:

- אין לחבר שני עותקים של OmniRoute לאותו קובץ `storage.sqlite`.
- הפעלה מחדש של קונטיינר, פריסה מסוג Recreate, סיום בשל OOM או הפעלה מחדש עקב HEALTHCHECK מפילים
  כל הפעלת SSE שמתבצעת באותו רגע. בנתיב הסטנדרטי אין ניקוז של הפעלות.
- בדיקת חיות של המתזמר שמתייחסת לתגובה איטית של `/healthz` כאילו השירות מת תחסל את
  העותק היחיד. מומלץ להשתמש בבדיקת חיות באמצעות TCP + בדיקת מוכנות באמצעות HTTP `/healthz`. ראו
  [מדריך Docker — זמינות](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  וכן [המלצות לבדיקות Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
