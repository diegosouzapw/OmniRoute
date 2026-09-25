# CLI Integrations (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute מספקת משפחה של פקודות `setup-*` המגדירות CLI קידוד (Codex, Claude Code, OpenCode, Cline, …) להשתמש ב-OmniRoute כ-backend שלו — כך שהכלי מדבר לנקודת קצה **אחת** ו-OmniRoute מנתבת לספק הנכון עם גיבוי אוטומטי. כל פקודה קוראת את קטלוג המודלים ה**חי** מ-OmniRoute פועל (מקומי או מרוחק) וכותבת את קובץ התצורה של הכלי **שלך** במחשב. מפתח ה-API מפנה למשתנה סביבה בכל מקום שהכלי תומך בכך. פקודות ששומרות קובץ סביבה מקומי לכלי מצוינות להלן.

קיימת גם מפעיל כללי — `omniroute run <target>` — שמפעיל את `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` או `gemini` עם הסביבה הנכונה מוזרקת, מבלי לכתוב שום תצורה כלל. יעדים והכינויים שלהם מגיעים מהמניפסט הקנוני `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), ו-`omniroute completion` מציע את אותן מילות יעד הנגזרות מהמניפסט. המפעילים הישנים לכל כלי — `omniroute launch` (Claude Code) ו-`omniroute launch-codex` (Codex) — נשארים זמינים.

קליטת ספקים זמינה מאותו הקשר מקומי/מרוחק. הפקודות מבוססות ה-API שלהלן שומרות על אימות הניהול נפרד מפרטי הזיהוי של הספק ולעולם אינן מדפיסות פרטי זיהוי בפלט מובנה:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

עבור סקריפטים, העדיפו `--credential-stdin` או `--credential-env`; `--credential` נשמר לשימוש מקומי מבוקר. `providers remove` דורש `--yes` במסוף לא אינטראקטיבי, וכל חמש הפקודות מכבדות את ההקשר הפעיל או את האפשרויות הגלובליות `--base-url`/`--api-key`.

בוררי ספקים דוחים קידומות ID, שמות או שמות ספקים דו-משמעיים; השתמשו ב-ID חיבור מלא כאשר מספר חיבורים תואמים. פקודות יצירה ועריכה קוראות בחזרה את החיבור השמור, וההסרה מוודאת שהוא אינו ניתן לקריאה עוד. ייבוא מדלג על זוג ספק/שם קיים. רשומות מיובאות אינן יכולות לעקוף את נקודת הקצה של הניהול, ההקשר או פרטי הזיהוי של הניהול שסופקו ל-CLI.

עבור ההגדרה הבסיסית החד-פעמית, הכתובה ידנית, של שתי האינטגרציות העשירות ביותר, ראו את הצלילות העמוקות לכל כלי:

- [תצורת Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [תצורת Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [מצב מרוחק](./REMOTE-MODE.md) — הפעילו OmniRoute מרוחק (VPS / Tailnet) מהמחשב הנייד שלכם
- [צ'אט Copilot של VS Code](./VSCODE-COPILOT.md) — הרחבת OmniCopilot; היא יכולה גם להריץ עבורכם את פקודות ה-`setup-*` הללו מתוך העורך

---

## טבלה מרכזית

כל פקודה מכבדת את **ההקשר הפעיל** (המוגדר באמצעות `omniroute connect`, ראו
[מצב מרוחק](./REMOTE-MODE.md)) או דגלים מפורשים מסוג `--remote <url> --api-key <key>`.
"מקומי לעומת מרוחק" להלן פירושו: ללא דגלים, היעד הוא `http://localhost:20128`;
עם `--remote` (או הקשר מרוחק פעיל), הקטלוג מאוחזר מאותו
שרת והתצורה נכתבת באופן מקומי.

| פקודה                      | כלי                     | מה נכתב                                                                                                                                                              | דגלים עיקריים                                                                                                                              | מקומי לעומת מרוחק |
| -------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI        | `~/.codex/<name>.config.toml` — פרופיל אחד לכל מודל טקסט תואם (`codex --profile <name>`)                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | שניהם             |
| `omniroute setup-claude`   | Claude Code             | `~/.claude/profiles/<name>/settings.json` — פרופיל אחד לכל מודל תואם (`CLAUDE_CONFIG_DIR`)                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | שניהם             |
| `omniroute setup-opencode` | OpenCode (תואם OpenAI)  | `~/.config/opencode/opencode.json` — ספק `omniroute` עם כל מודל בקטלוג (`opencode -m omniroute/<model>`)                                                             | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | שניהם             |
| `omniroute setup-cline`    | Cline                   | `~/.cline/data/{globalState,secrets}.json` (מצב CLI) + הדפסת הגדרות ההרחבה של VS Code                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | שניהם             |
| `omniroute setup-kilo`     | Kilo Code               | `~/.local/share/kilo/auth.json` (CLI) + מיזוג `kilocode.*` לתוך `settings.json` של VS Code, אם הוא קיים                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | שניהם             |
| `omniroute setup-continue` | Continue / `cn` CLI     | `~/.continue/config.yaml` — מודלים עם `provider: openai`, מפתח דרך `${{ secrets.OMNIROUTE_API_KEY }}`                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | שניהם             |
| `omniroute setup-cursor`   | Cursor                  | לא נכתב דבר — מודפסים השלבים לביצוע בתוך היישום (תצורת Cursor היא SQLite אטום)                                                                                       | `--remote` `--api-key` `--only` `--port`                                                                                                   | שניהם             |
| `omniroute setup-roo`      | Roo Code                | `~/.omniroute/roo-settings.json` (מסמך ייבוא) + הגדרת `roo-cline.autoImportSettingsPath` אם קיים `settings.json` של VS Code                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | שניהם             |
| `omniroute setup-crush`    | Crush                   | `~/.config/crush/crush.json` — ספק `openai-compat`, מפתח דרך `$OMNIROUTE_API_KEY`                                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | שניהם             |
| `omniroute setup-goose`    | Goose                   | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + הדפסת הוראות להגדרת משתני סביבה                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | שניהם             |
| `omniroute setup-aider`    | Aider                   | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + הדפסת הוראות להגדרת משתני סביבה                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | שניהם             |
| `omniroute setup-qwen`     | Qwen Code               | `~/.qwen/settings.json` — מערך V4 מסוג `modelProviders.openai` + הוספת `OMNIROUTE_API_KEY` אל `~/.qwen/.env`                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | שניהם             |
| `omniroute setup-5dive`    | 5dive (צי סוכנים)       | לא נכתב דבר תחת `$HOME` — כתיבת **פרופיל אימות** של 5dive (`/var/lib/5dive/auth-profiles/<name>/`) דרך `5dive agent auth set`; דורש root ופועל במארח הצי             | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | שניהם             |
| `omniroute run <target>`   | הפעלה בזמן ריצה (כללית) | לא נכתב דבר — הפעלת `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` עם משתני הסביבה והארגומנטים הנכונים; Qwen ו-Gemini משתמשים בספריית בית זמנית ומבודדת | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | שניהם             |
| `omniroute launch`         | Claude Code             | לא נכתב דבר — הפעלת `claude` תוך הזרקת `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                   | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | שניהם             |
| `omniroute launch-codex`   | OpenAI Codex CLI        | לא נכתב דבר — הפעלת `codex` תוך הזרקת הספק `omniroute` באמצעות דגלי `-c`                                                                                             | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | שניהם             |

הערות על דגלים (אומתו בקוד המקור של הפקודה):

- `--remote <url>` — אחזור הקטלוג מ-OmniRoute מרוחק (דורס את `--port`
  ואת ההקשר הפעיל). `--api-key <key>` מספק את פרטי האימות עבור אותו
  שרת (ברירת המחדל היא משתנה הסביבה `OMNIROUTE_API_KEY`, או האסימון של ההקשר הפעיל).
- `--only <patterns>` — מחרוזות משנה מופרדות בפסיקים; שמירת מזהי מודלים תואמים
  בלבד (לדוגמה, `--only glm,kimi`). זמין ב-`setup-codex`, ב-`setup-claude`,
  ב-`setup-opencode`, ב-`setup-continue`, ב-`setup-cursor` וב-`setup-crush`.
- `--dry-run` — הדפסה מדויקת של מה שהיה נכתב, מבלי לשנות את
  מערכת הקבצים. זמין בכל פקודות `setup-*` **למעט** `setup-cursor`
  (שאינה כותבת קובץ לעולם).
- `--model <id>` — נדרש (או נבחר באופן אינטראקטיבי) עבור הכלים שאין להם
  גילוי אוטומטי של מודלים: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. כלים אלה
  מקבלים גם את `--yes` עבור הרצות לא אינטראקטיביות (שבהן נדרש `--model`).
  הפקודה `setup-opencode` מקבלת את `--model` כדי להגדיר את מודל ברירת המחדל ברמה העליונה.
- `--model <id>` ב-`omniroute run` פועל בהתאם לחיווט הייעודי לכל יעד במניפסט
  (`bin/cli/cli-manifest.mjs`): **aider** מקבל `--model openai/<id>` ו-
  **opencode** מקבל `--model omniroute/<id>` (הקידומת מתווספת רק כאשר המזהה
  אינו כולל אותה כבר); **qwen** ו-**gemini** מקבלים את המזהה כפי שהוא;
  **claude** מקבל אותו דרך `ANTHROPIC_MODEL`,‏ **goose** דרך `GOOSE_MODEL`, ו-
  **codex** דרך ארגומנטים מסוג `-c model_providers.omniroute.*`.‏ **Qwen הוא יעד ההרצה
  היחיד שמחייב את `--model`** — הפעלת `omniroute run qwen` בלעדיו מסתיימת
  בקוד `2` עם שגיאה מפורשת.
- `--port <port>` — הפורט המקומי של OmniRoute (ברירת המחדל היא `20128`; המערכת מתעלמת ממנו כאשר
  `--remote` מוגדר). קיים בכל פקודות `setup-*` ובשני המשגרים.
- קודי היציאה של `omniroute run`: קוד היציאה של כלי ה-CLI הבן מועבר
  כפי שהוא; `2` = ארגומנטים לא תקינים (יעד שאינו נתמך, `--model` נדרש
  אך חסר, הגנת קונטיינר); `127` = קובץ ההפעלה של היעד אינו נמצא ב-`PATH`;
  `130`/`143`/`129` כאשר ההפעלה מסתיימת באמצעות `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = כשל אחר בהפעלת זמן הריצה.
- שני המשגרים (`launch`,‏ `launch-codex`) מקבלים את `--profile <name>` כדי לבחור
  פרופיל שנכתב על ידי `setup-claude` / `setup-codex`, וכן ארגומנטים שמועברים
  לקובץ ההפעלה הבסיסי `claude` / `codex`.

הבורר האינטראקטיבי משותף גם למתכוני ההגדרה:

```bash
# בחירה מקטלוג המודלים המקומי או המרוחק הפעיל והגדרת היעד.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` מעביר כעת את הטיפול למתכונים שנבדקו עבור `codex`,‏ `claude`,
`opencode`,‏ `qwen`,‏ `aider`,‏ `goose`,‏ `cline`,‏ `continue`,‏ `kilo` ו-`5dive`.
רשומות קטלוג המיועדות ל-IDE בלבד,
ל-MITM ולמדריכים בלבד נשארות כתהליכי `setup-*`/הגדרה ידנית מפורשים ואינן
מוצגות כיעדים שניתן להפעיל.

> `setup-opencode` הוא שילוב OpenCode **קל משקל ותואם openai**.
> קיים גם שילוב עשיר יותר באמצעות תוסף — `omniroute setup opencode` — אשר
> מתקין את `@omniroute/opencode-plugin`. אלו פקודות שונות; הטבלה
> לעיל מתעדת את `setup-opencode`.
>
> התוסף מגיע בשתי חבילות, אחת לכל גרסה ראשית של OpenCode, משום ששני
> הטוענים מצפים לנקודות כניסה שונות:
> `@omniroute/opencode-plugin` עבור OpenCode v1 ו-
> `@omniroute/opencode-plugin-v2` עבור OpenCode v2. חבילת v2 היא חדשה
> (`0.1.0`) ופועלת לפי חוזה מארח שעדיין משתנה, ולכן היא קוראת את
> המבנה ש-OpenCode מזין לטיוטת הקטלוג במקום להניח מבנה מסוים. כדי להתקין
> אותה, יש להוסיף רשומת `plugins` אל `opencode.json`; הפקודה `omniroute setup opencode`
> עדיין מתקינה את חבילת v1. האפשרויות וסדר חיפוש פרטי האימות מפורטים
> ב-README של החבילה.

---

## שימוש מקומי

כאשר OmniRoute פועל ב־`localhost:20128`, פשוט הריצו את פקודת ההגדרה עבור
הכלי שלכם. הקטלוג נשלף מהשרת המקומי.

```bash
# Codex: כתיבת פרופיל לכל מודל תואם אל ~/.codex/
omniroute setup-codex
codex --profile glm52            # שימוש בפרופיל שנוצר

# Claude Code: כתיבת פרופילים נפרדים לכל מודל, ולאחר מכן הפעלת אחד מהם
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: כתיבת ספק תואם-openai עם כל מודלי הקטלוג
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # מופנה דרך {env:OMNIROUTE_API_KEY}, לעולם לא נשמר בדיסק
opencode -m omniroute/glm/glm-5.2 "..."

# כלים ללא גילוי אוטומטי דורשים מודל מפורש:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# תצוגה מקדימה בלי לכתוב דבר:
omniroute setup-continue --dry-run
```

הפעלה בלי לכתוב תצורה כלשהי (הזרקת משתני סביבה בלבד):

```bash
omniroute launch                 # Claude Code ← OmniRoute מקומי
omniroute launch-codex           # Codex CLI ← OmniRoute מקומי
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# נתיב פקודה מפורש: העברת כל מה שמופיע אחרי -- כפי שהוא
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## שימוש מרוחק

הפנו כל פקודת הגדרה אל OmniRoute מרוחק באמצעות `--remote` + `--api-key`. הקטלוג
נשלף מהשרת המרוחק; התצורה נכתבת במחשב המקומי שלכם.

```bash
# OpenCode מול VPS מרוחק, תוך שמירת מודלי glm/kimi בלבד
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # יש לייצא תחילה את OMNIROUTE_API_KEY

# פרופילי Codex מקטלוג מרוחק
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# הפעלת CLI ישירות מול השרת המרוחק
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

במקום להעביר את `--remote`/`--api-key` בכל פעם, התחברו פעם אחת ואפשרו
ל**הקשר הפעיל** לספק אותם אוטומטית:

```bash
omniroute connect 192.168.0.15        # מנפיק אסימון מוגבל-הרשאות ושומר את ההקשר
omniroute setup-codex                 # ← כעת משתמש בקטלוג המרוחק
omniroute setup-opencode              # ← כנ"ל
omniroute launch                      # ← Claude Code מול השרת המרוחק
```

ראו [מצב מרוחק](./REMOTE-MODE.md) למידע על הקשרים, היקפי הרשאות וניהול אסימונים.

---

## ציי סוכנים של 5dive

[5dive](https://5dive.ai) מפעיל צי של סוכני תכנות ארוכי-טווח, שכל אחד מהם הוא
יחידת systemd תחת משתמש Unix משלו. הוא אינו CLI לתכנות בפני עצמו, ולכן אין
ל־`omniroute run` מה להפעיל — `5dive` הוא יעד **להגדרה בלבד**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

שתי הצורות כותבות **פרופיל אימות** אחד של 5dive, וכל עמדת `claude` המשויכת
לפרופיל זה מתקשרת לאחר מכן עם OmniRoute. שלושה דברים ייחודיים ליעד זה:

- **הוא פועל במארח הצי, כ־root.** הפקודות של 5dive פועלות על יחידות systemd מקומיות
  ועל ספריית מצב בבעלות root; אין מצב מרוחק. המתכון מפעיל את עצמו מחדש דרך
  `sudo` כאשר הוא עדיין אינו root (`--no-sudo` משבית זאת ומדפיס את
  הפקודה במקום).
- **נקודת הקצה חייבת להיות `https://`, אלא אם היא loopback.** מפתח ה־API של הסוכן
  נשלח בכתובת URL זו בכל בקשה, ו־5dive מסרב לנקודת קצה שאינה מקומית בחיבור טקסט
  גלוי. כתובת LAN פרטית אינה חריגה.
- **קיבוע המודל של כל עמדה מקבל עדיפות על פני הפרופיל.** הפרופיל מכיל את
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, אך עמדה שעדיין מקובעת למזהה
  מודל מובנה נכשלת בפנייה הראשונה שלה עם _"יש בעיה במודל שנבחר"_.
  העבירו `--agent <name>` (ניתן לחזור על האפשרות) כדי לקבע גם את העמדות; המתכון
  מדפיס את הפקודה כאשר אינכם עושים זאת.

מפתח ה־API מועבר אל 5dive דרך **stdin** (`--api-key=-`), ולכן הוא לעולם אינו מופיע
בפלט של `ps`.

הפניית הפרופיל אל **combo** של OmniRoute במקום אל מודל יחיד היא שמספקת לצי
יתירות בעת כשל ספק: כאשר נקודת הקצה הראשית קרסה לחלוטין באמצע פנייה בהרצה שתועדה
ב־[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), הסוכן השלים
את שאר השלבים באמצעות החלופה ומעולם לא חשף את ההשבתה.

---

## מוסכמות כתובת URL בסיסית (אילו כלים דורשים `/v1`)

OmniRoute חושף את ממשק OpenAI ב-`/v1`, את ממשק Anthropic בנתיב הבסיס,
וממשק Gemini מקורי ב-`/v1beta`. כל אינטגרציה מוגדרת בצורה שהכלי שלה
מצפה לה (אומת בקוד המקור של הפקודה):

| אינטגרציה                                                                  | כתובת URL בסיסית שנכתבת | `/v1`?                                    |
| -------------------------------------------------------------------------- | ----------------------- | ----------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | נתיב הבסיס              | לא — Cline מוסיף `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | נתיב הבסיס              | לא — Goose מוסיף את הנתיב                 |
| `setup-aider` (`OPENAI_API_BASE`)                                          | נתיב הבסיס              | לא — LiteLLM מוסיף `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | עם `/v1`                | כן                                        |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | נתיב הבסיס              | לא — Claude Code מוסיף `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | עם `/v1`                | כן                                        |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | עם `/v1`                | כן                                        |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | נתיב הבסיס              | לא — ה-SDK מוסיף `/v1beta/models/…`       |
| `setup-5dive` (`ANTHROPIC_BASE_URL` בפרופיל האימות)                        | נתיב הבסיס              | לא — Claude Code מוסיף `/v1/messages`     |

---

## שמירת תלויות מקוריות בעת עדכון: `--include=optional`

בעת עדכון באמצעות `omniroute update` (לאחר אישור, או עם `--apply`),
OmniRoute מריץ את ההתקנה כאשר `--include=optional` כבר כלול:

```bash
npm install -g omniroute@latest --include=optional
```

זהו **לא** דגל שמעבירים אל `omniroute update` — הוא תמיד מוחל על ידי
מנגנון העדכון. הוא מבטיח שה-`optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, מחסנית ה-SLM של LLMLingua) ישרדו את העדכון גם אם בתצורת npm שלכם
מוגדר `omit=optional`, מצב שאחרת היה משמיט בשקט את מנהל ההתקן המקורי של SQLite
ואת הקישור לצרור המפתחות של מערכת ההפעלה. כדי להציג תצוגה מקדימה של הפקודה המדויקת בלי להחיל אותה:

```bash
omniroute update --dry-run
# [הרצה יבשה] הפקודה שתורץ: npm install -g omniroute@latest --include=optional
```

דגלים נוספים של `omniroute update` (אומתו בקוד המקור): `--check` (יציאה עם קוד 1 אם
הגרסה מיושנת), `--apply` (התקנה ללא בקשת אישור), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI באמצעות `omniroute run gemini`

החוזה אומת מול `@google/gemini-cli` 0.50.0: כלי שורת הפקודה מכבד את
`GOOGLE_GEMINI_BASE_URL` ושולח `POST /v1beta/models/<model>:generateContent`
(וכן `:streamGenerateContent?alt=sse`) אליו — בדיוק ממשק Gemini המקורי של
OmniRoute (`/v1beta`). הפקודה `omniroute run gemini` מגדירה זאת באופן אוטומטי:

- `GOOGLE_GEMINI_BASE_URL` ← כתובת ה-URL הבסיסית הפעילה של OmniRoute (נתיב הבסיס, ללא `/v1`);
- `GEMINI_API_KEY` ← פרטי האימות של OmniRoute לאחר פתרונם (אפשרות/סביבה/הקשר);
- **`GEMINI_CLI_HOME` זמני ומבודד** שקובץ ה-`.gemini/settings.json` שלו
  בוחר באימות `gemini-api-key`, כך שהפעלת Google OAuth שמורה (Code Assist)
  לעולם לא תדרוס הפעלה שמופנית אל OmniRoute — והוא מוסר לאחר היציאה;
- **היגיינת סביבה**: מסביבת תהליך הבן מוסרים `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` ו-`GOOGLE_GENAI_USE_GCA` (שהיו מפנים מחדש את
  האימות אל Vertex/Code Assist), ו-`GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  מוגדר כאמצעי גיבוי נוסף — יעדי `run` האחרים מקבלים את אותו
  טיפול עבור המשתנים המתנגשים שלהם;
- הזרקת `--model <id>` מתוך `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

מנגנון האמון בסביבת העבודה של Gemini עדיין חל במצב ללא ממשק משתמש — העבירו
`--skip-trust` (או אשרו אמון בתיקייה באופן אינטראקטיבי) בעצמכם; המפעיל
בכוונה אינו עוקף אותו. מפעיל זה נפרד מ**רישום ה-ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), שנותר אינטגרציית
פרוטוקול הסוכנים עבור `/dashboard/acp-agents`.

---

## סריקת smoke אמיתית (opt-in)

הרצות רגרסיה דטרמיניסטיות של תוכנית ההפעלה מתבצעות ב-CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). כדי לאמת את קובצי ההרצה האמיתיים מול שרת
OmniRoute אמיתי, קיימת רתמת בדיקה אופציונלית ב-
`tests/integration/upstream-cli-smoke.int.test.ts`. היא לעולם אינה פועלת אוטומטית
(כל תת-בדיקה מדולגת אלא אם `RUN_CLI_SMOKE=1`), מעבירה את פרטי ההזדהות באמצעות שם
משתנה סביבה (לעולם לא באמצעות הערך), משחירה מחרוזות בעלות מבנה של מפתח בכל פלט מתועד, מדלגת על
יעדים שקובץ ההרצה שלהם אינו מותקן, ומסווגת כשלים בתור
אימות / upstream / תצורה במקום ערך בוליאני בלבד:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

אופציונלי: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` מגביל את הסריקה;
`OMNIROUTE_SMOKE_TIMEOUT_MS` דורס את פסק הזמן של 120 שניות לכל יעד.

---

## ראו גם

- [תצורת Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — המדריך המעמיק ל-Claude Code
- [תצורת Codex CLI](./CODEX-CLI-CONFIGURATION.md) — ההגדרה הבסיסית החד-פעמית של `[model_providers.omniroute]`
- [מצב מרוחק](./REMOTE-MODE.md) — הקשרים, אסימוני גישה מוגבלים לתחום והפעלת שרת מרוחק
- [חומר עזר לכלי CLI](../reference/CLI-TOOLS.md) — הקטלוג המלא של הכלים הנתמכים ועמודי לוח הבקרה
- [מדריך התקנה](./SETUP_GUIDE.md) — שיטות התקנה ותהליך ההיכרות בהפעלה הראשונה
