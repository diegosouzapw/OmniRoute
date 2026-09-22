# 📖 Setup Guide — OmniRoute (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> מדריך התקנה מלא עבור OmniRoute. לגרסה המהירה, ראו את [המדריך להתחלה מהירה ב-README](../README.md#-quick-start).

## תוכן העניינים

- [שיטות התקנה](#install-methods)
- [הגדרת כלי CLI](#cli-tool-configuration)
- [הגדרת פרוטוקולים (MCP + A2A)](#protocol-setup-mcp--a2a)
- [הגדרת זמן קצוב](#timeout-configuration)
- [מצב פיצול יציאות](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [הסרת התקנה](#uninstalling)

---

## שיטות התקנה

### npm (מומלץ)

```bash
npm install -g omniroute
omniroute
```

לוח הבקרה נפתח בכתובת `http://localhost:20128`, וכתובת הבסיס של ה-API היא `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **למשתמשי pnpm:** הדגל `--allow-build` נדרש כדי לאפשר סקריפטים מקוריים של בנייה עבור `better-sqlite3` ו-`@swc/core`. הפקודה `pnpm approve-builds -g` אינה נתמכת בהתקנות גלובליות ב-pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[חבילת AUR](https://aur.archlinux.org/packages/omniroute-bin) מתקינה את OmniRoute ומספקת שירות משתמש של systemd.

### מקוד המקור

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **הערה עבור Windows:** כברירת מחדל, OmniRoute משתמש ב-`%APPDATA%\omniroute` כאשר התיקייה הישנה `%USERPROFILE%\.omniroute` אינה קיימת. הגדירו את `DATA_DIR` כדי לבחור מיקום אחר עבור תיקיית הנתונים.

> **הערה:** `npm install` יוצר אוטומטית את `.env` מתוך `.env.example` בהפעלה הראשונה. התקנות עתידיות לא ידרסו קובץ `.env` קיים, ולכן ההתאמות האישיות נשמרות. כדי לאתחל אותו מחדש, מחקו את `.env` לפני הפעלה חוזרת.

### Docker

עיינו ב[מדריך Docker](./DOCKER_GUIDE.md) לקבלת הוראות התקנה מלאות עבור Docker, כולל פרופילים של Compose ו-HTTPS באמצעות Caddy.

### יישום שולחן עבודה (Electron)

OmniRoute כולל מעטפת שולחן עבודה המבוססת על Electron 41 ועל electron-builder 26.10. הסקריפטים הזמינים (בשורש סביבת העבודה):

```bash
npm run electron:dev          # הפעלת יישום שולחן העבודה עם טעינה מחדש בזמן אמת
npm run electron:build        # בנייה עבור מערכת ההפעלה הנוכחית (מזוהה אוטומטית)
npm run electron:build:win    # תוכנית התקנה עבור Windows (NSIS + גרסה ניידת)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # בדיקת עשן של הבנייה הארוזה
```

גרסאות של תוכניות ההתקנה לשולחן העבודה מצורפות למהדורות GitHub. להסבר מעמיק ומלא על Electron (חתימה, גשר IPC והפצות), ראו [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(נוצר בשלב מאוחר יותר)_.

### שרת ללא ממשק גרפי (CI/אוטומציה)

עבור התקנות ללא התערבות (Docker, Kubernetes, CI), השתמשו ב:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

בשילוב עם משתני סביבה (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` וכו'), הדבר מאפשר להפעיל מופע OmniRoute שניתן לשלוט בו באופן מלא באמצעות סקריפטים.

### אפשרויות CLI

| פקודה                   | תיאור                                                           |
| ----------------------- | --------------------------------------------------------------- |
| `omniroute`             | הפעלת השרת (`PORT=20128`, ה-API ולוח הבקרה באותה יציאה)         |
| `omniroute setup`       | תהליך קליטה מודרך ב-CLI להגדרת סיסמה וספק ראשון                 |
| `omniroute doctor`      | הפעלת בדיקות תקינות מקומיות מבלי להפעיל את השרת                 |
| `omniroute providers`   | גילוי, הצגה, אימות ובדיקת ספקים דרך ה-CLI                       |
| `omniroute config`      | הגדרת כלי CLI — הצגה, קבלה, הגדרה ואימות של תצורות              |
| `omniroute status`      | לוח מצב לא מקוון — גרסה, מסד נתונים, כלים ותצורה                |
| `omniroute logs`        | הזרמת יומני שימוש מה-API (תומך ב-`--follow`)                    |
| `omniroute update`      | בדיקה או החלה של עדכוני OmniRoute                               |
| `omniroute provider`    | ניהול חיבורי ספקים — הוספה, הצגה, הסרה, בדיקה והגדרת ברירת מחדל |
| `omniroute --port 3000` | הגדרת היציאה הראשית/יציאת ה-API ל-3000                          |
| `omniroute --mcp`       | הפעלת שרת MCP (תעבורת stdio)                                    |
| `omniroute --no-open`   | מניעת פתיחה אוטומטית של הדפדפן                                  |
| `omniroute --help`      | הצגת עזרה                                                       |

ניתן להפוך את ההתקנה ללא ממשק גרפי לאוטומטית באמצעות דגלים או משתני סביבה:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

הפעילו אבחון מקומי מבלי לפתוח את לוח הבקרה:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

נהלו ספקים באמצעות SSH או סקריפטים מבלי לפתוח את לוח הבקרה:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## הגדרת כלי CLI

### 1) חיבור ספקים ויצירת מפתח API

1. פתחו את לוח הבקרה → `Providers` וחברו לפחות ספק אחד (OAuth או מפתח API).
2. פתחו את לוח הבקרה → `Endpoints` וצרו מפתח API.
3. (אופציונלי) פתחו את לוח הבקרה → `Combos` והגדירו את שרשרת הגיבוי שלכם.

### 2) הפניית כלי הפיתוח שלכם

```txt
כתובת URL בסיסית: http://localhost:20128/v1
מפתח API:          [העתיקו מדף ה-Endpoint]
מודל:              if/qwen3.8-max-preview (או כל קידומת ספק/מודל)
```

אם העורך שלכם אינו יכול לשלוח `Authorization: Bearer ...`, השתמשו במקום זאת בכתובת הבסיס התואמת הכוללת את האסימון:

```txt
כתובת URL בסיסית: http://localhost:20128/api/v1/vscode/YOUR_KEY/
כתובת URL למודלים: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
כתובת URL לצ'אט: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
כתובת URL לתגיות Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

עובד עם Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode וערכות SDK תואמות OpenAI.

#### הגדרה אוטומטית באמצעות `setup-*`

במקום להדביק ידנית את כתובת הבסיס ואת המפתח, אפשרו ל-OmniRoute לכתוב את התצורה
הייעודית של כל כלי מתוך קטלוג המודלים הפעיל. פקודה אחת לכל כלי:

```bash
omniroute setup-codex        # פרופילים תחת ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (תואם OpenAI)
omniroute setup-cline        # הגדרות Cline CLI והרחבת VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # מציג את שלבי ההגדרה בתוך Cursor
omniroute setup-roo          # ייבוא ל-Roo Code ומצביע autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

כל פקודה מקבלת `--remote <url> --api-key <key>` כדי להגדיר כלי מקומי מול
OmniRoute **מרוחק**, וכן `--dry-run` לתצוגה מקדימה. כדי להפעיל CLI עם משתני
הסביבה המתאימים מוזרקים, מבלי לכתוב תצורה כלל, השתמשו במפעיל הכללי
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
המפעילים הישנים הייעודיים לכל כלי, `omniroute launch` (Claude Code) ו-
`omniroute launch-codex` (Codex), עדיין זמינים.

לטבלה המלאה (מה כל פקודה כותבת, כל הדגלים, מקומי לעומת מרוחק ומוסכמות `/v1`
לכתובת URL בסיסית), ראו **[שילובי CLI](./CLI-INTEGRATIONS.md)**.

להגדרות מפורטות עבור כל כלי (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot ועוד), ראו את **[המדריך לכלי CLI](../reference/CLI-TOOLS.md)** הייעודי.

---

## הגדרת פרוטוקולים (MCP + A2A)

### הגדרת MCP (Model Context Protocol)

הפעילו את תעבורת MCP במצב stdio:

```bash
omniroute --mcp
```

תהליך האימות המומלץ:

```bash
# 1. הפעילו את שרת MCP
omniroute --mcp

# 2. מלקוח ה-MCP שלכם, קראו לפקודות:
omniroute_get_health        # אמור להחזיר את תקינות המערכת
omniroute_list_combos       # אמור להחזיר שילובים פעילים

# 3. לחלופין, הפעילו את חבילת בדיקות E2E המלאה:
npm run test:protocols:e2e
```

#### הגדרת לקוח MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

הוסיפו להגדרות ה-MCP שלכם:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**תיעוד MCP מלא:** [README של שרת MCP](../../open-sse/mcp-server/README.md) — 110 כלים, הגדרות IDE ולקוחות Python/TS/Go.

### הגדרת A2A (פרוטוקול סוכן-לסוכן)

אמתו את כרטיס הסוכן:

```bash
curl http://localhost:20128/.well-known/agent.json
```

שלחו משימה:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**תיעוד A2A מלא:** [README של שרת A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, מיומנויות, הזרמה ומחזור חיי משימה.

---

## הגדרת זמני קצוב

### זמני קצוב בסיסיים

ברוב הפריסות, נדרשים רק שני המשתנים הבאים:

| משתנה                    | ברירת מחדל                   | מטרה                                                                                                                                                         |
| ------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REQUEST_TIMEOUT_MS`     | `600000`                     | ערך בסיס משותף לזמן הקצוב לתחילת תגובה מהשרת במעלה הזרם, לזמנים הקצובים הנסתרים של Undici, לבקשות טביעת אצבע של TLS ולזמנים קצובים של בקשות/תיווך בגשר ה-API |
| `STREAM_IDLE_TIMEOUT_MS` | יורש את `REQUEST_TIMEOUT_MS` | המרווח המרבי בין מקטעי זרימה לפני ש-OmniRoute מבטל את זרם ה-SSE                                                                                              |

התאימות לאחור נשמרת: `FETCH_TIMEOUT_MS`,‏ `API_BRIDGE_PROXY_TIMEOUT_MS` ומשתני זמן קצוב אחרים לכל שכבה ממשיכים לפעול וגוברים על ערך הבסיס המשותף.

### הערות ספציפיות לספקים

עבור שרתי מעלה תואמי Claude Code (`anthropic-compatible-cc-*`),‏ OmniRoute גוזר את כותרת ה-`X-Stainless-Timeout` היוצאת מזמן הקצוב המחושב של האחזור, כך שזמני הקצוב לקריאה בצד הספק נשארים תואמים להגדרות הסביבה שלכם.

עבור שרתי proxy הפוכים של צד שלישי התואמים ל-Claude Code,‏ OmniRoute שומר על ערכת ברירת מחדל שמרנית של `anthropic-beta`, וכאשר `Client Cache Control` נשאר במצב `Auto`, מעביר רק סמני `cache_control` שסופקו על ידי הלקוח. הפעילו את המתג "Enable redact-thinking beta" לכל חיבור רק כאשר שרת המעלה דורש במפורש זרמי חשיבה מושחרים של Claude.

### דריסות מתקדמות של זמני קצוב

| משתנה                                    | ברירת מחדל                                 | מטרה                                                            |
| ---------------------------------------- | ------------------------------------------ | --------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | יורש את `REQUEST_TIMEOUT_MS`               | זמן קצוב לתחילת תגובה משרת המעלה, המשמש עד לקבלת כותרות התגובה  |
| `FETCH_HEADERS_TIMEOUT_MS`               | יורש את `FETCH_TIMEOUT_MS`                 | מגבלת הזמן של Undici לקבלת כותרות תגובה משרת המעלה              |
| `FETCH_BODY_TIMEOUT_MS`                  | יורש את `FETCH_TIMEOUT_MS`                 | מגבלת הזמן של Undici בין מקטעי גוף משרת המעלה (`0` משבית אותה)  |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | זמן קצוב של Undici לחיבור TCP                                   |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | זמן קצוב של Undici לחיבור keep-alive לא פעיל                    |
| `TLS_CLIENT_TIMEOUT_MS`                  | יורש את `FETCH_TIMEOUT_MS`                 | זמן קצוב לבקשות טביעת אצבע של TLS המתבצעות באמצעות `wreq-js`    |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | יורש את `REQUEST_TIMEOUT_MS` או `600000`   | זמן קצוב להעברת proxy של `/v1` מיציאת ה-API ליציאת לוח הבקרה    |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | זמן קצוב לבקשה נכנסת בשרת גשר ה-API                             |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | זמן קצוב לכותרות נכנסות בשרת גשר ה-API                          |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | זמן קצוב ל-keep-alive בשרת גשר ה-API                            |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | זמן קצוב לחוסר פעילות של socket בשרת גשר ה-API (`0` משבית אותו) |

> **הערה:** עבור בקשות זורמות, `FETCH_TIMEOUT_MS` מכסה רק את הקמת החיבור / ההמתנה לתגובה הראשונה משרת המעלה. לאחר שהזרם פעיל, OmniRoute יבטל אותו רק במקרה של עצירה בפועל (`STREAM_IDLE_TIMEOUT_MS`) או חוסר פעילות בגוף לפי Undici (`FETCH_BODY_TIMEOUT_MS`).

### תאימות לשרת proxy הפוך

אם אתם מריצים את OmniRoute מאחורי Nginx,‏ Caddy,‏ Cloudflare או שרת proxy הפוך אחר, ודאו שגם זמני הקצוב של ה-proxy גבוהים מזמני הקצוב של OmniRoute לזרימה/אחזור.

---

## מצב יציאות מפוצלות

הפעילו את ה-API ואת לוח הבקרה ביציאות נפרדות עבור תרחישים מתקדמים (פרוקסי הפוך, רשתות קונטיינרים):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:         http://localhost:20128/v1
# לוח הבקרה: http://localhost:20129
```

---

## תבנית Void Linux ‏(xbps-src)

משתמשי Void Linux יכולים לבנות חבילה מקורית באמצעות `xbps-src`. שמרו בלוק זה בתור `srcpkgs/omniroute/template`:

```bash
# קובץ תבנית עבור 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# צרו מחדש את סכום הביקורת עבור כל גרסה באמצעות:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## הסרת התקנה

| פקודה                    | פעולה                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `npm run uninstall`      | מסירה את יישום המערכת, אך **שומרת את מסד הנתונים והתצורות שלכם** ב-`~/.omniroute`. |
| `npm run uninstall:full` | מסירה את היישום וגם **מוחקת לצמיתות את כל התצורות, המפתחות ומסדי הנתונים**.        |

> להוראות מפורטות להסרת התקנה בכל השיטות, ראו [UNINSTALL.md](./UNINSTALL.md).
