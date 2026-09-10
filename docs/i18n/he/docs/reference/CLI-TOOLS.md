# CLI-TOOLS (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "כלי CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# כלי CLI — OmniRoute

עודכן לאחרונה: 2026-08-18

OmniRoute משתלב עם שלוש קטגוריות של כלי CLI המפוזרים על פני שלוש דפי לוח מחוונים ייעודיים:

| דף            | מסלול                   | רעיון                                                               | מספר      |
| ------------- | ----------------------- | ------------------------------------------------------------------- | --------- |
| **קוד CLI**   | `/dashboard/cli-code`   | כלים לקידוד שאתה מפנה ל-OmniRoute (לקוח → CLI → OmniRoute → ספק)    | 26        |
| **סוכני CLI** | `/dashboard/cli-agents` | סוכנים אוטונומיים שאתה מפנה ל-OmniRoute (אותו זרימה, טווח רחב יותר) | 8         |
| **סוכני ACP** | `/dashboard/acp-agents` | CLIs ש-OmniRoute מפעיל כ-backend דרך stdio/ACP (זרימה הפוכה)        | ראה רישום |

מסלולים ישנים מפנים דרך 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## איך זה עובד

```
קוד CLI / סוכני CLI (זרימת צריכה):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (כולם מפנים ל-OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute מפנה לספק הנכון)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

סוכני ACP (זרימת הפעלה הפוכה):
    בקשת לקוח → OmniRoute → מפעיל CLI דרך stdio/ACP → תגובה
```

**יתרונות:**

- מפתח API אחד לניהול כל הכלים
- מעקב על עלויות בכל ה-CLIs בלוח המחוונים
- החלפת מודלים ללא צורך בהגדרת כל כלי מחדש
- עובד מקומית ובשרתים מרוחקים (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## קונפיגורציה אוטומטית עם `setup-*`

אינך צריך לכתוב את הקונפיגורציה של כל כלי ביד. OmniRoute מספקת פקודת `setup-*`
לכל CLI נתמך שקוראת את קטלוג המודלים **החי** מ-OmniRoute פועל (מקומי או מרוחק) וכותבת את הקונפיגורציה של הכלי שלך במחשב שלך:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

כל אחת מקבלת `--remote <url> --api-key <key>` (להגדיר כלי מקומי מול OmniRoute מרוחק), `--dry-run` (תצוגה מקדימה ללא כתיבה), ו-`--port`. כלים ללא גילוי אוטומטי של מודלים (Cline, Kilo, Roo, Goose, Aider, Qwen) לוקחים
`--model <id>` (ו-`--yes` להרצות לא אינטראקטיביות). כדי להפעיל CLI עם הסביבה הנכונה מוזרקת וללא קונפיגורציה שנכתבה כלל, השתמש במפעיל הכללי
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — מטרות וכינויים מגיעים מ-`bin/cli/cli-manifest.mjs`); המפעילים הישנים לכל כלי `omniroute launch` (Claude Code) ו-`omniroute launch-codex`
(Codex) נשארים זמינים. CLI של Gemini הוא רק להפעלה: הוא יעד של `omniroute run`
אבל אין לו מתכון `setup-*`/`configure`.

> **הפניה מלאה:** הטבלה הראשית — מה כל פקודה כותבת, כל דגל,
> מקומי מול מרוחק, ואילו כלים רוצים סיומת `/v1` — נמצאת ב
> **[אינטגרציות CLI](../guides/CLI-INTEGRATIONS.md)**.

### הרצת אלה בתוך מיכל

פקודת `setup-*` המבוצעת בתוך מיכל OmniRoute כותבת לתוך הבית של המיכל עצמו, שאף CLI מארח לא קורא אליו ונעלמת עם המיכל. OmniRoute מזהה זאת ויוצאת `2` עם הוראות במקום לכתוב. שתי דרכים נתמכות קדימה — התקן את ה-CLI על המחשב המארח ו
`omniroute connect` למיכל, או חיבור-הרכבה של תיקי הקונפיגורציה והגדרת
`CLI_CONFIG_HOME` (פרופיל המארח של ההרכבה). כל פקודת `setup-*`, בנוסף ל-`omniroute configure` ו-`omniroute config set`, מקבלת
`--allow-container-write` כאשר הכוונה שלך היא להגדיר את ה-CLIs של המיכל; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` עושה את אותו הדבר עבור השרת. ראה
[מדריך Docker → קונפיגורציה של כלי CLI מארח](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

נקודת היישום של לוח המחוונים **(`POST /api/cli-tools/apply`)** אוכפת את
אותו שומר: במיכל, כתיבה שהמטרה שלה אינה מחוברת מהמארח עונה **`422`** עם `containerEphemeralTarget: true`, טקסט השגיאה הבטוח ו — עבור הכלים עם מתכון מארח (claude, codex, opencode, cline,
kilo, continue) — פקודת `hostSetupCommand` (למשל `omniroute setup-opencode`) להרצה על המארח במקום; שום דבר לא נכתב. `dryRun: true` ממשיך לעבוד במצב מיכל
ומחזיר את התוכן שנוצר + נתיב היעד מבלי לגעת בדיסק, כך שתוכל להציג מלוח המחוונים וליישם על המארח. התנהגות זו היא מכוונת ומוגנת רגרסיה על ידי
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — אל תנסה "לתקן" 422 על ידי הסרת השומר.

---

## מקור האמת

הקטלוג המאוחד נמצא ב-`src/shared/constants/cliTools.ts` כ-`CLI_TOOLS: Record<string, CliCatalogEntry>`.

כל רשומה מכילה את השדות הבאים (מוגדרים ב-`src/shared/schemas/cliCatalog.ts`):

| שדה                                             | סוג                                                          | תיאור                                                |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | באיזו דף הכלי מופיע                                  |
| `vendor`                                        | `string`                                                     | מקור הכלי ("Anthropic", "OSS (P. Gauthier)")         |
| `acpSpawnable`                                  | `boolean`                                                    | ניתן גם להשתמש בו כ-Agent של ACP (סמל מוצג)          |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | רמת תמיכה בנקודת קצה מותאמת. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | מנגנון קונפיגורציה                                   |
| `id`, `name`, `color`, `description`, `docsUrl` | סטנדרטי                                                      | שדות תצוגה מרכזיים                                   |

רשומות עם `baseUrlSupport: "none"` **אינן מוצגות** בדפי הלוח — הן רשומות ב-MITM backlog עבור תכנית 11 (ראה `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### רמות יכולת (מקטלגות × ניתנות לזיהוי × ניתנות לקונפיגורציה × ניתנות להשקה)

לא כל כלי מקטלגי ניתן לזיהוי, קונפיגורציה או השקה. כל רמה יש לה מקור המצהיר, ובדיקת סטייה שומרת עליהם מסונכרנים:

| רמה                   | משמעות                                                       | מצהיר ב                                                           |
| --------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| **מקטלג**             | מופיע בקטלוג הלוח (שם, ספק, מסמכים, סוג קונפיגורציה)         | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **ניתן לזיהוי**       | זיהוי בינארי/קונפיגורציה, בדיקות בריאות, נתיבי קונפיגורציה   | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **ניתן לקונפיגורציה** | נתמך על ידי `omniroute configure <cli>` (מתכון הגדרה קיים)   | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **ניתן להשקה**        | נתמך על ידי `omniroute run <target>` (הזרקת env/args מוגדרת) | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` הוא המניפסט ההפעלה הקנוני עבור פקודת ה-CLI: `run`, `configure` ומחוללי השלמת-shell כולם שואבים את רשימות היעדים שלהם, פתרון כינויים (למשל `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) וחיווט דגל `--model` ממנו. שומר הסטייה `tests/unit/cli/cli-manifest-drift.test.ts` מאמת שהמניפסט, הקטלוג בזמן ריצה, הקטלוג של ה-UI וכל משטח צרכן נשארים מסונכרנים — יעד שנוסף למשטח אחד ללא האחרים נכשל את המבחן במקום לסטות בשקט.

## 1. קטלוג קוד CLI (26 כלים)

כל הכלים שמופיעים ב-`/dashboard/cli-code`. אלו עם `baseUrlSupport: none` מחוברים דרך MITM או מדריך ידני במקום כתובת URL מותאמת אישית:

| id           | שם                       | ספק                 | תמיכה בכתובת בסיס | סוג קונפיגורציה | acpSpawnable |
| ------------ | ------------------------ | ------------------- | ----------------- | --------------- | ------------ |
| claude       | קוד קלוד                 | אנתרופיק            | מלא               | env             | true         |
| codex        | CLI של OpenAI Codex      | OpenAI              | מלא               | מותאם אישית     | true         |
| zcode        | ZCode (תוכנית קידוד GLM) | Z.ai                | אין               | מותאם אישית     | false        |
| cline        | קלין                     | OSS (מפתחי קלוד)    | מלא               | מותאם אישית     | true         |
| kilo         | קוד קילו                 | Kilo-Org            | מלא               | מותאם אישית     | false        |
| roo          | קוד Roo                  | Roo (OSS)           | מלא               | מדריך           | false        |
| continue     | Continue                 | continue.dev        | מלא               | מדריך           | false        |
| aider        | Aider                    | OSS (פ. גוטייה)     | מלא               | מדריך           | true         |
| forge        | ForgeCode                | Antinomy HQ         | מלא               | מותאם אישית     | true         |
| jcode        | jcode                    | 1jehuang (OSS)      | מלא               | מותאם אישית     | false        |
| deepseek-tui | DeepSeek TUI             | האנטר בואן (OSS)    | מלא               | מותאם אישית     | false        |
| codewhale    | CodeWhale                | Hmbown (OSS)        | מלא               | מותאם אישית     | false        |
| opencode     | OpenCode                 | Anomaly (לשעבר SST) | מלא               | מדריך           | true         |
| droid        | Factory Droid            | Factory AI          | חלקי              | מדריך           | false        |
| copilot      | CLI של GitHub Copilot    | GitHub/MS           | מלא               | מותאם אישית     | false        |
| cursor-cli   | CLI של Cursor            | Anysphere           | חלקי              | מדריך           | true         |
| smelt        | Smelt                    | leonardcser (OSS)   | מלא               | מותאם אישית     | false        |
| pi           | Pi (סוכן קידוד pi)       | M. Zechner (OSS)    | מלא               | מותאם אישית     | false        |
| grok-build   | Grok Build               | xAI                 | מלא               | מותאם אישית     | false        |
| crush        | Crush                    | OSS (Charm)         | מלא               | מותאם אישית     | false        |
| qwen         | קוד Qwen                 | Alibaba             | מלא               | מדריך           | true         |
| cursor       | Cursor                   | Anysphere           | אין               | מדריך           | false        |
| antigravity  | אנטיגרביטי               | Google              | אין               | mitm            | false        |
| hermes       | הרמס                     | Nous Research       | אין               | מדריך           | false        |
| kiro         | Kiro AI                  | Amazon              | אין               | mitm            | false        |
| custom       | CLI מותאם אישית          | —                   | מלא               | custom-builder  | false        |

כלים עם `baseUrlSupport: "partial"` מציגים תג "⚠ כתובת בסיס חלקית" בכרטיס הלוח.

## 2. קטלוג סוכני CLI (8 כלים)

סוכנים אוטונומיים המופיעים ב-`/dashboard/cli-agents`:

| id           | שם               | ספק                      | תמיכה ב-BaseUrl | ניתן להפעיל ACP |
| ------------ | ---------------- | ------------------------ | --------------- | --------------- |
| hermes-agent | סוכן הרמס        | Nous Research            | מלא             | false           |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | מלא             | true            |
| goose        | Goose            | Block / Linux Foundation | מלא             | true            |
| interpreter  | Open Interpreter | OSS                      | מלא             | true            |
| warp         | Warp AI          | Warp Inc.                | חלקי            | true            |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | מלא             | false           |
| omp          | Oh My Pi         | OSS                      | מלא             | true            |
| letta        | Letta CLI        | Letta                    | מלא             | false           |

---

## 3. סוכני ACP (/dashboard/acp-agents)

דף זה (ששונה מ-`/dashboard/agents`) מציג CLI ש-OminiRoute יכול **להפעיל** כמנועי ביצוע אחוריים דרך פרוטוקול stdio/ACP. הקטלוג מתוחזק בנפרד ב-`src/lib/acp/registry.ts` ואינו זהה ל-`CLI_TOOLS`.

---

## 4. backlog של MITM (לא מוצג בלוח המחוונים)

ה-CLI הבאים אינם תומכים ב-Base URL מותאם אישית באופן מקורי ואינם **מופיעים** בדפי קוד CLI או דפי סוכני CLI. הם מועמדים להפרעה של MITM בתוכנית 11:

| CLI                 | סיבה                                                   |
| ------------------- | ------------------------------------------------------ |
| windsurf            | BYOK מוגבל למודלים נבחרים של Claude + URL/token ארגוני |
| amp                 | אקוסיסטם סגור (Sourcegraph)                            |
| amazon-q / kiro-cli | אימות AWS SSO, אין URL מותאם אישית                     |
| cowork              | Anthropic Desktop, אין נקודת קצה ניתנת להגדרה          |

ראה `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` עבור הצלב המלא.

---

## 5. API לזיהוי קבוצות

כל זיהוי הכלים מאוגד דרך נקודת קצה אחת:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (כמו בשאר הנתיבים של `/api/cli-tools/`)
- מחזיר: `Record<toolId, ToolBatchStatus>` (סוג: `src/shared/types/cliBatchStatus.ts`)
- אסטרטגיה: `Promise.all` על פני כל הכלים, 5 שניות זמן קצוב לכל כלי
- מטמון: בזיכרון LRU ממוין לפי קובץ קונפיגורציה `mtime`. המטמון מתבטל כאשר mtime משתנה. מתאפס בהפעלה מחדש של השרת.

צורת התגובה לכל כלי:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // מנוקה, ללא עקבות שגיאה
}
```

## 6. מנהלי הגדרות עבור כלים חדשים

כלים חדשים עם `configType: "custom"` יש להם מסלולי API ייעודיים להגדרות:

| מסלול                                       | כלי                                                              |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

כל המסלולים משתמשים ב-`sanitizeErrorMessage()` עבור תגובות שגיאה (כלל קשה #12).

---

## 7. ארכיטקטורת דפי לוח מחוונים

### קוד CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — רכיב שרת
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — רשת לקוח
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — דף פרטי כלי
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 כרטיסי כלי מיוחדים + `ToolDetailClient.tsx`

### סוכני CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — רכיב שרת
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — רשת לקוח
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — עושה שימוש חוזר ב-`ToolDetailClient`

### סוכני ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — רכיב שרת (הועבר מ-`agents/`)

### רכיבי UI משותפים (`src/shared/components/cli/`)

| קובץ                    | מטרה                                          |
| ----------------------- | --------------------------------------------- |
| `CliToolCard.tsx`       | כרטיס מצב חכם (זיהוי + הגדרה + נקודת קצה)     |
| `CliConceptCard.tsx`    | כרטיס הסבר על מושג לדף                        |
| `CliComparisonCard.tsx` | השוואה בשלוש עמודות בין סוגי CLI              |
| `BaseUrlSelect.tsx`     | תפריט נפתח לנקודת קצה (מקומי/ענן/מותאם אישית) |
| `ApiKeySelect.tsx`      | בורר מפתח API                                 |
| `ManualConfigModal.tsx` | מודל קטע קוד שניתן להעתקה                     |

### חיבור משותף (`src/shared/hooks/cli/`)

| קובץ                      | מטרה                                                        |
| ------------------------- | ----------------------------------------------------------- |
| `useToolBatchStatuses.ts` | מביא את `/api/cli-tools/all-statuses`, מנהל מצב טעינה/רענון |

---

## 8. i18n

מרחבים חדשים נוספו בתוכנית 14 F9:

| Namespace   | מטרה                                                                        |
| ----------- | --------------------------------------------------------------------------- |
| `cliCommon` | מיתוגים משותפים (תוויות כרטיסים, טקסטים של מושגים/השוואות, תוויות דף פרטים) |
| `cliCode`   | מיתוגים של דף CLI Code                                                      |
| `cliAgents` | מיתוגים של דף CLI Agents                                                    |
| `acpAgents` | מיתוגים של דף ACP Agents                                                    |

תרגומים מלאים לפורטוגזית ברזילאית ואנגלית מסופקים. 39 מקומות אחרים נופלים חזרה לאנגלית אוטומטית דרך מיזוג ברמת המרחב ב- `src/i18n/request.ts`.

---

## 9. התחלה מהירה

### שלב 1 — קבלת מפתח API של OmniRoute

1. פתחו את `/dashboard/api-manager` → **צור מפתח API**
2. תן לו שם (למשל `cli-tools`) ובחר את כל ההרשאות
3. העתק את המפתח — תצטרך אותו עבור כל CLI למטה

> המפתח שלך נראה כך: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### שלב 2 — התקנת כלים של CLI

כל הכלים המבוססים על npm דורשים Node.js 22.22.2+ או 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (ניתן להשקה דרך `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # מבוסס Rust

# סוכן קידוד Pi
# ראה https://github.com/zechnerj/pi-coding-agent להתקנה

# jcode
# ראה https://github.com/1jehuang/jcode להתקנה
```

---

### שלב 3 — קונפיגורציה דרך לוח המחוונים

1. עבור ל- `http://localhost:20128/dashboard/cli-code`
2. מצא את הכלי שלך ברשת
3. לחץ על הכרטיס כדי לפתוח את דף פרטי הכלי
4. בחר את מפתח ה-API שלך ואת כתובת ה-URL הבסיסית
5. לחץ על **החל קונפיגורציה** או העתק את קטע הקונפיגורציה הידני

---

### שלב 4 — הגדרת משתני סביבה גלובליים

```bash
# נקודת קצה אוניברסלית של OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI קורא GOOGLE_GEMINI_BASE_URL ב- ROOT (ה-SDK שלו מוסיף /v1beta/... בעצמו)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> עבור **שרת מרוחק** החלף `localhost:20128` עם כתובת ה-IP או הדומיין של השרת,
> למשל `http://<your-server-ip>:20128`.

---

### שלב 4 — קונפיגורציה של כל כלי

#### Claude Code

```bash
# צור ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

השתמש בשורש שער אנתרופיק המאוחד עבור Claude Code. אל תוסיף `/v1` כאן.

**בדיקה:** `claude "say hello"`

---

#### OpenAI Codex

Codex המודרני (v0.137+) קורא רק את `~/.codex/config.toml` — הישן
`config.yaml` שייך ל-CLI npm הישן ומוזנח בשקט. מפתח ה-API נשאר במשתנה הסביבה `OMNIROUTE_API_KEY` (`env_key`), אף פעם
לא בתוך הקובץ:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

הפניה מלאה (פרופילים, `wire_api`, חלונות הקשר): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**בדיקה:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**בדיקה:** `opencode`

> השתמש ב- `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> כדי לשלוח וריאנטים של חשיבה.

---

#### Cline (CLI או VS Code)

**מצב CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**מצב VS Code:**
הגדרות הרחבת Cline → ספק API: `OpenAI Compatible` → כתובת URL בסיסית: `http://localhost:20128/v1`

או השתמש בלוח המחוונים של OmniRoute → **כלי CLI → Cline → החל קונפיגורציה**.

---

#### KiloCode (CLI או VS Code)

**מצב CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**הגדרות VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

או השתמש בלוח המחוונים של OmniRoute → **כלי CLI → KiloCode → החל קונפיגורציה**.

---

#### Continue (הרחבת VS Code)

ערוך את `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

אתחל מחדש את VS Code לאחר העריכה.

---

#### VS Code Insiders (`chatLanguageModels.json`)

השתמש בזה כאשר VS Code Insiders מוגדר עבור מודלים של נקודות קצה מותאמות ואתה רוצה ש-OmniRoute יעבוד ללא שדה כותרת מותאם.

**מיקום מומלץ:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**דוגמה באמצעות הכינוי המוטבע של OmniRoute:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**הערות:**

- החלף `sk-your-omniroute-key` עם מפתח API שנוצר ב-OmniRoute.
- שדה ה-`url` צריך להצביע על `/api/v1/vscode/{token}/chat/completions`.
- שדה ה-`modelsUrl` צריך להצביע על `/api/v1/vscode/{token}/models`.
- העדף את הזרימה הרגילה של `/v1` + כותרת Bearer כאשר הלקוח תומך בכותרות מותאמות.
- טוקנים מוטבעים ב-URL הם פתרון תאימות ועשויים להופיע ביומני עורך או בהיסטוריית פרוקסי.

---

#### Kiro CLI (אמזון)

```bash
# התחבר לחשבון AWS/Kiro שלך:
kiro-cli login

# ה-CLI משתמש באותנטיקציה משלו — OmniRoute לא נדרשת כ-backend עבור Kiro CLI עצמו.
# השתמש ב-kiro-cli לצד OmniRoute עבור כלים אחרים.
kiro-cli status
```

עבור אפליקציית שולחן העבודה **Kiro IDE**, השתמש בנקודת הקצה MITM שנחשפת על ידי OmniRoute
מתחת ל- `/dashboard/cli-tools → Kiro`.

---

## 10. OmniRoute CLI פנימי

הבינארי `omniroute` מספק פקודות עבור מחזור חיי השרת, התקנה, אבחון, וניהול ספקים. נקודת כניסה: `bin/omniroute.mjs`.

```bash
omniroute                              # הפעל את השרת (פורט ברירת מחדל 20128)
omniroute setup                        # אשף התקנה אינטראקטיבי
omniroute doctor                       # בדוק קונפיגורציה, DB, פורטים, זמן ריצה
omniroute providers list               # חיבורים לספקים שהוגדרו
omniroute providers test-all           # בדוק כל חיבור פעיל
omniroute reset-password               # אפס את סיסמת המנהל
omniroute logs                         # זרם יומני בקשות
omniroute health                       # בריאות מפורטת (מפסקי זרם, מטמון, זיכרון)
omniroute --version                    # הדפס גרסה
omniroute --help                       # הצג את כל הפקודות
```

### התקנה והתחלה

```bash
omniroute setup                        # אשף התקנה אינטראקטיבי
omniroute setup --non-interactive      # מצב CI/אוטומציה (קורא משתני סביבה + דגלים)
omniroute setup --password '<value>'   # הגדר סיסמת מנהל ישירות
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # הוסף ובדוק ספק במכה אחת
```

משתני סביבה מוכרים עבור התקנה לא אינטראקטיבית:

| Var                 | מטרה                                                         |
| ------------------- | ------------------------------------------------------------ |
| `OMNIROUTE_API_KEY` | מפתח API של הספק (מחובר ל`--api-key` דרך Commander `.env()`) |
| `DATA_DIR`          | החלף את תיקיית הנתונים של OmniRoute                          |

כל שאר הקלטים הלא אינטראקטיביים מועברים כדגלים, לא משתני סביבה:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(ראה את אפשרויות `omniroute setup` למעלה).

### אבחון

```bash
omniroute doctor                       # בדוק קונפיגורציה, DB, פורטים, זמן ריצה, זיכרון, חיות
omniroute doctor --json                # JSON קריא למכונה
omniroute doctor --no-liveness         # דלג על בדיקת בריאות HTTP
omniroute doctor --host 0.0.0.0        # החלף את מארח החיות
omniroute doctor --liveness-url <url>  # החלף את כתובת ה-URL של נקודת הבריאות המלאה
```

הדוקטור מבצע את הבדיקות הללו: `קונפיגורציה`, `מסד נתונים`, `אחסון/הצפנה`,
`זמינות פורטים`, `זמן ריצה של Node`, `בינארי מקורי` (better-sqlite3),
`זיכרון`, ו`חיות השרת`. הוא יוצא עם קוד שגיאה אם כל בדיקה היא `נכשל`.

### ניהול ספקים

```bash
omniroute providers available                       # קטלוג ספקי OmniRoute
omniroute providers available --search openai       # סנן קטלוג לפי id/name/alias/category
omniroute providers available --category api-key    # סנן לפי קטגוריה (api-key, oauth, free, ...)
omniroute providers available --json                # JSON קריא למכונה

omniroute providers list                            # חיבורים לספקים שהוגדרו
omniroute providers list --json

omniroute providers test <id|name>                  # בדוק חיבור אחד שהוגדר
omniroute providers test-all                        # בדוק כל חיבור פעיל
omniroute providers validate                        # אימות מבני מקומי בלבד
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # זרימת OAuth קיימת
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` הם API-first ולכן פועלים נגד
ההקשר המקומי או המרוחק הפעיל. קלט ההסמכה צריך להשתמש ב
`--credential-stdin` או `--credential-env`; `--dry-run --json` מדווח רק על
נוכחות/צורה מחוקה. `providers available` קורא את קטלוג OmniRoute;
`providers list/test/test-all/validate` שומרים על ההתנהגות המקומית של SQLite שלהם ואינם דורשים שהשרת יהיה פועל.

### שחזור ואיפוס

```bash
omniroute reset-password                # אפס את סיסמת המנהל (גם: omniroute-reset-password)
omniroute reset-encrypted-columns       # הצג אזהרה + דלג עבור איפוס הסמכה מוצפנת
omniroute reset-encrypted-columns --force  # באמת נעל את ההסמכות המוצפנות ב-SQLite
```

### ייצוא הסמכה (⚠ יש לטפל בזה בזהירות)

```bash
omniroute auth export                                 # הצג אזהרה + שער אישור — אין גישה ל-DB
omniroute auth export --force                          # ייצא את כל ההסמכות המפוענחות של כל החיבורים ל-stdout כ-JSON
omniroute auth export --force --id <id>                 # ייצא רק את החיבור התואם
omniroute auth export --force --format env               # פלט OMNIROUTE_<PROVIDER>_<FIELD>=<value> שורות
omniroute auth export --force --out creds.json           # כתוב לקובץ (נוצר עם הרשאות 0600)
```

`auth export` הוא **מקומי בלבד** (קריאה ישירה מ-SQLite, ללא נתיב HTTP) ומדפיס/כותב
**טקסט ברור** של ערכי `apiKey`/`accessToken`/`refreshToken`/`idToken` — זו התכונה, לא
באג. שום דבר לא נקרא מהמסד נתונים, ושום דבר לא מפוענח, ללא `--force`. תמיד מודפס דגל אזהרה ב-stderr לפני כל פלט טקסט ברור. נדרש להגדיר את `STORAGE_ENCRYPTION_KEY`.
שדה שנכשל לפענח (מפתח ישן, טקסט מוצפן פגום) מדווח כ
`<field>DecryptFailed: true` במקום להפסיק את כל הייצוא או לדלוף את השגיאה הבסיסית.

### פקודות משנה אחרות

אלו מניחות ששרת OmniRoute פועל, אלא אם כן צוין אחרת:

```bash
omniroute status                       # מצב ריצה מקיף
omniroute logs                         # זרם יומני בקשות (--json, --search, --follow)
omniroute config show                  # הצג קונפיגורציה נוכחית

omniroute provider list                # רשום ספקים זמינים (כינוי של providers list)
omniroute provider add                 # רשם את OmniRoute כספק על כלי
omniroute keys add | list | remove     # ניהול מפתחות API
omniroute models [provider]            # רשום מודלים (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # צלם קונפיגורציה + DB
omniroute restore                      # שחזר מצילום קודם

omniroute health                       # בריאות מפורטת (מפסקי זרם, מטמון, זיכרון)
omniroute quota                        # שימוש במכסה של הספק
omniroute cache                        # מצב המטמון
omniroute cache clear                  # נקה את המטמון הסמנטי + החתימות

omniroute mcp status | restart         # מצב שרת MCP / הפעלה מחדש
omniroute a2a status | card            # מצב שרת A2A / כרטיס סוכן

omniroute tunnel list | create | stop  # ניהול מנהרות (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # בדוק / הגדר משתני סביבה (זמני)

omniroute test                         # בדיקת חיבוריות ספק
omniroute update                       # בדוק אם יש עדכונים
omniroute completion                   # צור השלמה של shell
```

### דגלים נפוצים

| דגל                 | תיאור                                          |
| ------------------- | ---------------------------------------------- |
| `--no-open`         | אל תפתח אוטומטית את הדפדפן בהפעלה              |
| `--port <n>`        | החלף את פורט ה-API (ברירת מחדל 20128)          |
| `--mcp`             | פעל כשרת MCP דרך stdio (עבור IDEs)             |
| `--non-interactive` | מצב CI (ללא הנחיות; קורא ממשתני סביבה/דגלים)   |
| `--json`            | פלט JSON קריא למכונה (doctor, providers, וכו') |
| `--help`, `-h`      | הצג עזרה ספציפית לפקודה                        |
| `--version`, `-v`   | הדפס את הגרסה המותקנת                          |

---

## נקודות קצה זמינות של API

| נקודת קצה                  | תיאור                     | שימוש עבור                     |
| -------------------------- | ------------------------- | ------------------------------ |
| `/v1/chat/completions`     | צ'אט סטנדרטי (כל הספקים)  | כל הכלים המודרניים             |
| `/v1/responses`            | API תגובות (פורמט OpenAI) | Codex, זרימות עבודה אגנטיות    |
| `/v1/completions`          | השלמות טקסט ישנות         | כלים ישנים המשתמשים ב`prompt:` |
| `/v1/embeddings`           | הטמעות טקסט               | RAG, חיפוש                     |
| `/v1/images/generations`   | יצירת תמונות              | GPT-Image, Flux, וכו'          |
| `/v1/audio/speech`         | טקסט לדיבור               | ElevenLabs, OpenAI TTS         |
| `/v1/audio/transcriptions` | דיבור לטקסט               | Deepgram, AssemblyAI           |

דוגמאות מוכנות להדבקה עם URL של OmniRoute עם טוקנים:

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standard OpenAI base: http://localhost:20128/v1
VS Code models: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code responses: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tags: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## פתרון בעיות

| שגיאה                                        | סיבה                | תיקון                                         |
| -------------------------------------------- | ------------------- | --------------------------------------------- |
| `Connection refused`                         | OmniRoute לא פועל   | `omniroute serve`                             |
| `401 Unauthorized`                           | מפתח API שגוי       | בדוק ב`/dashboard/api-manager`                |
| `No combo configured`                        | אין קומבינציה פעילה | הגדר ב`/dashboard/combos`                     |
| CLI shows "not installed"                    | בינארי לא ב-PATH    | בדוק `which <command>`                        |
| Dashboard shows "not detected" after install | מטמון ישן           | לחץ על "⟳ רענן גילוי" בלוח המחוונים           |
| Old link `/dashboard/cli-tools`              | סימניה לפני v3.8.6  | מופנה אוטומטית ל`/dashboard/cli-code` (308)   |
| Old link `/dashboard/agents`                 | סימניה לפני v3.8.6  | מופנה אוטומטית ל`/dashboard/acp-agents` (308) |
