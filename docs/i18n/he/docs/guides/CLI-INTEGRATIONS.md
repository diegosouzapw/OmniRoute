# CLI-INTEGRATIONS (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "אינטגרציות CLI — הפנה כל CLI קוד ל-OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# אינטגרציות CLI

OmniRoute מספקת משפחה של פקודות `setup-*` שמגדירות CLI קוד (Codex, Claude Code, OpenCode, Cline, …) להשתמש ב-OmniRoute כ-backend שלה — כך שהכלי מדבר עם **נקודת קצה אחת** ו-OmniRoute מנתבת לספק הנכון עם חזרה אוטומטית. כל פקודה קוראת את הקטלוג של המודל **החי** מ-OmniRoute פועל (מקומי או מרוחק) וכותבת את קובץ הקונפיגורציה של הכלי על **המחשב שלך**. מפתח ה-API מתייחס על ידי משתנה סביבה בכל מקום שהכלי תומך בו. פקודות ששומרות קובץ סביבה מקומי של הכלי מצוינות למטה.

יש גם מפעיל כללי — `omniroute run <target>` — שמפעיל `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` או `gemini` עם הסביבה הנכונה מוזרקת, מבלי לכתוב שום קונפיגורציה בכלל. היעדים והכינויים שלהם מגיעים מהמניפסט הקנוני `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), ו-`omniroute completion` מציע את
אותן מילים נגזרות מהמניפסט. המפעילים הישנים לכל כלי —
`omniroute launch` (Claude Code) ו-`omniroute launch-codex` (Codex) — נשארים
זמינים.

הכנסת ספקים זמינה מאותו הקשר מקומי/מרוחק. הפקודות API-first למטה שומרות על אימות ניהול בנפרד מהאישורים של הספקים ואינן מדפיסות אישור בפלט מובנה:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

לסקריפטים, העדיף `--credential-stdin` או `--credential-env`; `--credential`
נשמר לשימוש מקומי מבוקר. `providers remove` דורש `--yes` בטרמינל שאינו אינטראקטיבי, וכל חמש הפקודות מכבדות את ההקשר הפעיל או את האפשרויות הגלובליות `--base-url`/`--api-key`.

להגדרה חד פעמית, כתובה ביד של שתי האינטגרציות העשירות ביותר, ראה את
העומק של כל כלי:

- [הגדרת Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [הגדרת Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [מצב מרוחק](./REMOTE-MODE.md) — הפעל OmniRoute מרוחק (VPS / Tailnet) מהמחשב הנייד שלך
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — תוסף OmniCopilot; הוא יכול גם להריץ את הפקודות
  `setup-*` עבורך מתוך העורך

---

## טבלת מאסטר

כל פקודה מכבדת את **ההקשר הפעיל** (מוגדר עם `omniroute connect`, ראה
[מצב מרוחק](./REMOTE-MODE.md)) או את הדגלים המפורשים `--remote <url> --api-key <key>`.
"מקומי מול מרוחק" למטה פירושו: ללא דגלים זה מכוון ל-`http://localhost:20128`;
עם `--remote` (או הקשר מרוחק פעיל) זה שולף את הקטלוג מהשרת ההוא וכותב את הקונפיגורציה מקומית.

| פקודה                      | כלי                      | מה היא כותבת                                                                                                                                  | דגלים מרכזיים                                                                                                                              | מקומי מול מרוחק |
| -------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI         | `~/.codex/<name>.config.toml` — פרופיל אחד לכל מודל טקסט תואם (`codex --profile <name>`)                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | שניהם           |
| `omniroute setup-claude`   | Claude Code              | `~/.claude/profiles/<name>/settings.json` — פרופיל אחד לכל מודל תואם (`CLAUDE_CONFIG_DIR`)                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | שניהם           |
| `omniroute setup-opencode` | OpenCode (תואם ל-openai) | `~/.config/opencode/opencode.json` — ספק `omniroute` עם כל מודל בקטלוג (`opencode -m omniroute/<model>`)                                      | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | שניהם           |
| `omniroute setup-cline`    | Cline                    | `~/.cline/data/{globalState,secrets}.json` (מצב CLI) + מדפיס הגדרות תוסף VS Code                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | שניהם           |
| `omniroute setup-kilo`     | Kilo Code                | `~/.local/share/kilo/auth.json` (CLI) + ממזג `kilocode.*` לתוך `settings.json` של VS Code אם קיים                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | שניהם           |
| `omniroute setup-continue` | Continue / `cn` CLI      | `~/.continue/config.yaml` — מודלים `provider: openai`, מפתח דרך `${{ secrets.OMNIROUTE_API_KEY }}`                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | שניהם           |
| `omniroute setup-cursor`   | Cursor                   | כלום — מדפיס את הצעדים באפליקציה (הגדרת Cursor היא SQLite אטומה)                                                                              | `--remote` `--api-key` `--only` `--port`                                                                                                   | שניהם           |
| `omniroute setup-roo`      | Roo Code                 | `~/.omniroute/roo-settings.json` (מסמך ייבוא) + קובע `roo-cline.autoImportSettingsPath` אם קיים `settings.json` של VS Code                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | שניהם           |
| `omniroute setup-crush`    | Crush                    | `~/.config/crush/crush.json` — ספק תואם ל-openai, מפתח דרך `$OMNIROUTE_API_KEY`                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | שניהם           |
| `omniroute setup-goose`    | Goose                    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + מדפיס מתכון סביבה                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | שניהם           |
| `omniroute setup-aider`    | Aider                    | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + מדפיס מתכון סביבה                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | שניהם           |
| `omniroute setup-qwen`     | Qwen Code                | `~/.qwen/settings.json` — מערך `modelProviders.openai` V4 + `OMNIROUTE_API_KEY` ב-`~/.qwen/.env`                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | שניהם           |
| `omniroute run <target>`   | הפעלת זמן ריצה (כללית)   | כלום — מפעיל `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` עם הסביבה והארגומנטים הנכונים; Qwen ו-Gemini משתמשים בבית מבודד זמני | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | שניהם           |
| `omniroute launch`         | Claude Code              | כלום — מפעיל `claude` עם `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` מוזרקים                                                                  | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | שניהם           |
| `omniroute launch-codex`   | OpenAI Codex CLI         | כלום — מפעיל `codex` עם ספק `omniroute` מוזרק דרך דגלי `-c`                                                                                   | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | שניהם           |

הערות על דגלים (מאומתים במקור הפקודה):

- `--remote <url>` — שולף את הקטלוג מ-OmniRoute מרוחק (מחליף את `--port`
  ואת ההקשר הפעיל). `--api-key <key>` מספק את האישור עבור השרת
  (ברירת מחדל היא משתנה הסביבה `OMNIROUTE_API_KEY`, או הטוקן של ההקשר הפעיל).
- `--only <patterns>` — תתי מחרוזות מופרדות בפסיקים; שומר רק על מזהי המודלים שמתאימים
  (למשל `--only glm,kimi`). זמינה על `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — מדפיס בדיוק מה ייכתב מבלי לגעת ב
  מערכת הקבצים. זמינה על כל פקודות `setup-*` **מלבד** `setup-cursor`
  (שלעולם אינה כותבת קובץ).
- `--model <id>` — דרוש (או נבחר אינטראקטיבית) עבור הכלים שאין להם
  גילוי אוטומטי של מודלים: Cline, Kilo, Roo, Goose, Qwen, Aider. כלים אלה
  גם מקבלים `--yes` עבור ריצות לא אינטראקטיביות (שאז דורשות `--model`).
  `setup-opencode` לוקחת `--model` כדי לקבוע את המודל העליון ברירת המחדל.
- `--model <id>` על `omniroute run` עוקבת אחרי החיווט לפי המניפסט
  (`bin/cli/cli-manifest.mjs`): **aider** מקבלת `--model openai/<id>` ו
  **opencode** `--model omniroute/<id>` (הקידומת מתווספת רק כאשר ה-id
  אינו נושא אותה כבר); **qwen** ו**gemini** מקבלות את ה-id כפי שהוא;
  **claude** מקבלת אותו דרך `ANTHROPIC_MODEL`, **goose** דרך `GOOSE_MODEL`, ו
  **codex** דרך `-c model_providers.omniroute.*` args. **Qwen הוא היעד היחיד
  שדורש באופן מוחלט `--model`** — `omniroute run qwen` בלעדיו יוצא
  `2` עם שגיאה מפורשת.
- `--port <port>` — פורט OmniRoute מקומי (ברירת מחדל `20128`, מתעלם כאשר `--remote`
  מוגדר). נוכח על כל `setup-*` ועל שני המפעילים.
- קודי יציאה של `omniroute run`: קוד היציאה של ה-CLI הילד מועבר
  כפי שהוא; `2` = ארגומנטים לא חוקיים (יעד לא נתמך, חסר `--model` נדרש,
  שמירה על מיכל); `127` = הבינארי של היעד אינו ב-`PATH`;
  `130`/`143`/`129` כאשר ההפעלה מסתיימת על ידי `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = כישלון אחר בהפעלה.
- שני המפעילים (`launch`, `launch-codex`) מקבלים `--profile <name>` כדי לבחור
  פרופיל שנכתב על ידי `setup-claude` / `setup-codex`, בנוסף לארגומנטים להעברה עבור
  הבינארי הבסיסי `claude` / `codex`.

הבוחר האינטראקטיבי משותף גם למתכוני ההגדרה:

```bash
# בחר מתוך הקטלוג המקומי או המרוחק הפעיל והגדר את היעד.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` כרגע מפנה למתכונים שנבדקו עבור `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, ו`kilo`. רשומות קטלוג
שמיועדות רק ל-IDE, MITM, ומדריך נשארות זרימות `setup-*`/ידניות מפורשות ואינן מוצגות
כיעדים שניתן להפעיל.

> `setup-opencode` היא האינטגרציה **הקלה התואמת ל-openai** של OpenCode.
> יש גם אינטגרציה עשירה יותר של תוסף — `omniroute setup opencode` — שמתקינה
> `@omniroute/opencode-plugin`. אלו פקודות שונות; הטבלה
> למעלה מתעדת את `setup-opencode`.

---

## שימוש מקומי

עם OmniRoute פועל על `localhost:20128`, פשוט הרץ את פקודת ההגדרה עבור הכלי שלך. הקטלוג נמשך מהשרת המקומי.

```bash
# Codex: כתוב פרופיל עבור מודל תואם לתוך ~/.codex/
omniroute setup-codex
codex --profile glm52            # השתמש בפרופיל שנוצר

# Claude Code: כתוב פרופילים לפי מודל, ואז השק את אחד
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: כתוב את הספק התואם ל-openai עם כל מודלי הקטלוג
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # מתייחס דרך {env:OMNIROUTE_API_KEY}, אף פעם לא על דיסק
opencode -m omniroute/glm/glm-5.2 "..."

# כלים ללא גילוי אוטומטי זקוקים למודל מפורש:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# תצוגה מקדימה ללא כתיבה של שום דבר:
omniroute setup-continue --dry-run
```

השק ללא כתיבה של שום קונפיגורציה בכלל (הזרקת env בלבד):

```bash
omniroute launch                 # Claude Code → OmniRoute המקומי
omniroute launch-codex           # Codex CLI → OmniRoute המקומי
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# נתיב פקודה מפורש: העבר כל מה שבא אחרי --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## שימוש מרחוק

כוון כל פקודת הגדרה ל-OmniRoute מרחוק עם `--remote` + `--api-key`. הקטלוג נמשך מהמרחוק; הקונפיגורציה נכתבת במחשב המקומי שלך.

```bash
# OpenCode נגד VPS מרחוק, שמור רק מודלים glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # ייצא קודם את OMNIROUTE_API_KEY

# פרופילי Codex מקטלוג מרחוק
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# השקת CLI ישירות נגד המרחק
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

במקום להעביר `--remote`/`--api-key` בכל פעם, התחבר פעם אחת ותן ל
**הקשר הפעיל** לספק אותם אוטומטית:

```bash
omniroute connect 192.168.0.15        # מייצר טוקן עם טווח, שומר את ההקשר
omniroute setup-codex                 # ← עכשיו משתמש בקטלוג המרוחק
omniroute setup-opencode              # ← אותו דבר
omniroute launch                      # ← Claude Code נגד המרוחק
```

ראה [מצב מרוחק](./REMOTE-MODE.md) עבור הקשרים, טווחים, וניהול טוקנים.

---

## מסורות URL בסיסיות (אילו כלים רוצים `/v1`)

OmniRoute מציע את הממשק של OpenAI ב-`/v1`, את הממשק של Anthropic בשורש,
ואת הממשק של Gemini ב-`/v1beta`. כל אינטגרציה מחוברת לצורתה
שהכלי מצפה (מאומת במקור הפקודה):

| אינטגרציה                                                                  | URL בסיסי שנכתב | `/v1`?                                    |
| -------------------------------------------------------------------------- | --------------- | ----------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | שורש            | לא — Cline מוסיף `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | שורש            | לא — Goose מוסיף את הנתיב                 |
| `setup-aider` (`OPENAI_API_BASE`)                                          | שורש            | לא — LiteLLM מוסיף `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | עם `/v1`        | כן                                        |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | שורש            | לא — Claude Code מוסיף `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | עם `/v1`        | כן                                        |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | עם `/v1`        | כן                                        |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | שורש            | לא — ה-SDK מוסיף `/v1beta/models/…`       |

---

## שמירה על תלותים מקומיים בעדכון: `--include=optional`

כאשר אתה מעדכן עם `omniroute update` (לאחר אישור, או עם `--apply`),
OmniRoute מריץ את ההתקנה עם `--include=optional` כלול:

```bash
npm install -g omniroute@latest --include=optional
```

זה **לא** דגל שאתה מעביר ל`omniroute update` — הוא תמיד מוחל על ידי
המעדכן. זה מבטיח שה`optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, ערכת LLMLingua SLM) שורדות את העדכון גם אם הגדרות ה-npm שלך
מכילות `omit=optional`, מה שהיה אחרת משאיר בשקט את מנהל ההתקנה SQLite
המקומי ואת חיבור ה-OS-keyring. כדי להציג את הפקודה המדויקת מבלי להחיל:

```bash
omniroute update --dry-run
# [DRY RUN] Would run: npm install -g omniroute@latest --include=optional
```

דגלים אחרים של `omniroute update` (מאומתים במקור): `--check` (יוצא 1 אם
מעודכן), `--apply` (מתקין מבלי לבקש אישור), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI דרך `omniroute run gemini`

החוזה מאומת מול `@google/gemini-cli` 0.50.0: ה-CLI מכבד את
`GOOGLE_GEMINI_BASE_URL` ומנפיק `POST /v1beta/models/<model>:generateContent`
(וגם `:streamGenerateContent?alt=sse`) נגדו — בדיוק כמו הממשק המקומי של OmniRoute
(`/v1beta`). `omniroute run gemini` מחבר את זה אוטומטית:

- `GOOGLE_GEMINI_BASE_URL` → ה-URL הבסיסי הפעיל של OmniRoute (שורש, ללא `/v1`);
- `GEMINI_API_KEY` → האישור שנפתר של OmniRoute (אפשרות/סביבה/הקשר);
- **`GEMINI_CLI_HOME` מבודד זמני** שבו `.gemini/settings.json`
  בוחר באימות `gemini-api-key`, כך שסשן OAuth של Google מאוחסן (Code Assist)
  לא יחליף את ההשקה המנוהלת על ידי OmniRoute — נמחק לאחר היציאה;
- **היגיינת סביבה**: הסביבה של הילד מנוקה מ`GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` ו`GOOGLE_GENAI_USE_GCA` (שיכוונו את
  האימות ל-Vortex/Code Assist), ו`GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` מוגדר
  כהגנה נוספת — שאר היעדים של `run` מקבלים את אותו טיפול עבור המשתנים המנוגדים שלהם;
- הזרקת `--model <id>` מ`--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

שומר האמון של Gemini עדיין חל במצב ללא ראש — העבר
`--skip-trust` (או סמוך על התיקייה באופן אינטראקטיבי) בעצמך; המפעיל
בכוונה לא עוקף את זה. מפעיל זה שונה מ**הרישום ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), אשר נשאר האינטגרציה של פרוטוקול הסוכן עבור `/dashboard/acp-agents`.

---

## סוויפ עשן אמיתי (אופציה)

הרצת תכנית השקה דטרמיניסטית מתבצעת ב-CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). כדי לאמת את הבינארים האמיתיים מול שרת
OmniRoute אמיתי, קיים מנגנון אופציה ב
`tests/integration/upstream-cli-smoke.int.test.ts`. הוא אף פעם לא רץ אוטומטית
(כל תת-מבחן מדלג אלא אם `RUN_CLI_SMOKE=1`), מעביר את האישור דרך משתנה סביבה
NAME (לעולם לא לפי ערך), מסנן מחרוזות בצורת מפתח מכל פלט מוקלט, מדלג
על יעדים שהבינארי שלהם לא מותקן, ומסווג כישלונות כ
אימות / עליון / הגדרה במקום בוליאני פשוט:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

אופציונלי: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` מגביל את הסוויפ;
`OMNIROUTE_SMOKE_TIMEOUT_MS` עוקף את מגבלת הזמן של 120 שניות לכל יעד.

## ראה גם

- [הגדרת קוד קלוד](./CLAUDE-CODE-CONFIGURATION.md) — המדריך העמוק יותר לקוד קלוד
- [הגדרת CLI של קודקס](./CODEX-CLI-CONFIGURATION.md) — ההגדרה הבסיסית של `[model_providers.omniroute]` פעם אחת
- [מצב מרוחק](./REMOTE-MODE.md) — הקשרים, אסימוני גישה עם טווח, הפעלת שרת מרוחק
- [הפניה לכלי CLI](../reference/CLI-TOOLS.md) — הקטלוג המלא של כלים נתמכים + דפי לוח מחוונים
- [מדריך התקנה](./SETUP_GUIDE.md) — שיטות התקנה והדרכה לריצה ראשונה
