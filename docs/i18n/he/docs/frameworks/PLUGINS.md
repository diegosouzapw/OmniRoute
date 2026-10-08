# OmniRoute CLI Plugin System (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

הרחיבו את ה-CLI של `omniroute` מבלי לשנות את הליבה שלו. תוספים פועלים לפי מוסכמת השמות `omniroute-cmd-*`, בדומה ל-`gh extension` או ל-`kubectl plugin`.

## התחלה מהירה

```bash
# התקנת תוסף מ-npm
omniroute plugin install stripe

# התקנת תוסף מקומי שנמצא בפיתוח
omniroute plugin install ./my-plugin

# הצגת התוספים המותקנים
omniroute plugin list

# יצירת שלד לתוסף חדש
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## מבנה התוסף

תוסף הוא חבילת npm בשם `omniroute-cmd-<name>` (או `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # חייב לכלול "type": "module" ו-"main": "index.mjs"
├── index.mjs        # מייצא register(program, ctx) וכן meta אופציונלי
└── README.md
```

### `package.json`

```json
{
  "name": "omniroute-cmd-myplugin",
  "version": "0.1.0",
  "type": "module",
  "main": "index.mjs",
  "engines": { "omniroute": ">=4.0.0" },
  "keywords": ["omniroute-plugin", "omniroute-cmd"]
}
```

### `index.mjs`

```js
export const meta = {
  name: "myplugin",
  version: "0.1.0",
  description: "התוסף שלי עבור OmniRoute",
  omnirouteApi: ">=4.0.0",
};

export function register(program, ctx) {
  program
    .command("myplugin")
    .description(meta.description)
    .option("-n, --name <name>")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      const res = await ctx.apiFetch("/api/combos", {
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = await res.json();
      ctx.emit(data, gOpts);
    });
}
```

## API ההקשר של התוסף

האובייקט `ctx` שמועבר אל `register(program, ctx)`:

| מאפיין                       | סוג              | תיאור                                                 |
| ---------------------------- | ---------------- | ----------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | בקשת fetch מאומתת אל שרת OmniRoute                    |
| `ctx.emit(data, opts)`       | `function`       | פלט בתצורת table/json/jsonl/csv בהתאם לדגל `--output` |
| `ctx.t(key)`                 | `async function` | חיפוש תרגום i18n                                      |
| `ctx.withSpinner(label, fn)` | `async function` | עוטף פונקציה אסינכרונית עם מחוון ההתקדמות של ora      |
| `ctx.baseUrl`                | `string`         | כתובת ה-URL הבסיסית לאחר פתרון                        |
| `ctx.apiKey`                 | `string \| null` | מפתח API, אם סופק                                     |

## גילוי

תוספים מתגלים מתוך:

1. `~/.omniroute/plugins/<name>/` — התקנות מקומיות של המשתמש
2. משתנה הסביבה `OMNIROUTE_PLUGIN_PATH` — תיקייה מותאמת אישית

שניהם מיועדים **ל-CLI בלבד**. לסביבת הריצה של התוספים בצד השרת (תוספי marketplace/`plugin.json`
שפועלים בתוך ה-proxy) יש סורק משלה עם הגדרת עקיפה משלו,
`OMNIROUTE_PLUGINS_DIR` — ראו
[PLUGIN_MARKETPLACE.md ← תיקיית התוספים](./PLUGIN_MARKETPLACE.md#plugin-directory).
הגדרת אחד מהם אינה משפיעה על האחר.

שגיאות טעינה נלכדות ומוצגות כאזהרות — תוסף פגום לעולם אינו גורם לקריסת ה-CLI.

## אבטחה

תוספים פועלים עם אותן הרשאות תהליך Node.js כמו `omniroute`. התקינו תוספים רק ממקורות שאתם נותנים בהם אמון. הפקודה `omniroute plugin install` מציגה אזהרה מפורשת ודורשת `--yes` או אישור אינטראקטיבי.

## פרסום

1. ודאו כי `package.json` כולל `"keywords": ["omniroute-plugin"]`
2. הפעילו `npm publish` כרגיל
3. משתמשים יכולים לגלות את התוסף באמצעות `omniroute plugin search <query>` (מבצע חיפוש במאגר npm)

## תוסף לדוגמה

ראו [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) לקבלת דוגמה פעילה מינימלית הכוללת `meta` + `register()`.
