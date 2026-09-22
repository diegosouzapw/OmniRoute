# OmniRoute MCP Server Documentation (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> שרת Model Context Protocol עם 110 כלים לפעולות ניתוב, מטמון, דחיסה, זיכרון, מיומנויות, proxy, pool, Radar ומקורות הקשר.
>
> מקור האמת: `open-sse/mcp-server/server.ts` מחשב **110 כלים ייחודיים** באמצעות `countUniqueMcpTools()`:‏ 45 הגדרות קנוניות (כולל ששת כלי מחזור החיים של CCR, שלישיית agent-skills,‏ `omniroute_radar_catalog` ו-`omniroute_x_search`), בתוספת זיכרון (3), מיומנויות (4), מיומנויות GitHub‏ (3), pool‏ (6), משחוק (8), תוספים (8), Notion‏ (6), Obsidian‏ (22), מאגר מקומי (3) ושני כלי דחיסה המיועדים ל-RTK בלבד.

## התקנה

OmniRoute MCP מובנה במערכת. הפעילו אותו באמצעות:

```bash
omniroute --mcp
```

או באמצעות תעבורת open-sse:

```bash
# תעבורה הניתנת להזרמה באמצעות HTTP (פורט 20130)
omniroute --dev  # MCP מופעל אוטומטית בנקודת הקצה /mcp
```

תעבורות ה-HTTP‏ (`sse` / `streamable-http`, המוגשות בתוך אותו תהליך על ידי שרת לוח הבקרה)
כבויות כברירת מחדל, ובעבר ניתן היה להפעיל או להשבית אותן רק מהדף `/dashboard/mcp`. החל מ-v3.8.51
קיימת תמיכה מקבילה גם ב-CLI:

```bash
omniroute mcp status                                  # מצב הפעלה/חיבור, תעבורה ומספר כלים
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # מאפס הפעלות sse/streamable-http פעילות
```

`mcp enable`/`mcp disable` שולחות בקשת PATCH לאותה הגדרת `mcpEnabled` (ובאופן אופציונלי גם `mcpTransport`)
שלוח הבקרה משנה באמצעות `/api/settings`. הפקודה `mcp restart` קוראת אל `POST /api/mcp/restart`: היא מסיימת
הפעלות `sse`/`streamable-http` פעילות, כדי שהבקשה הבאה תאותחל מחדש באופן נקי, מחזירה
`409` אם MCP מושבת ו-`501` עבור תעבורת `stdio` (לקוחות stdio מנהלים את תהליך המשנה שלהם בעצמם —
אין נקודת אחיזה בתוך התהליך שניתן להפעיל מחדש).

## תעבורות

שרת MCP חושף שלוש תעבורות, שכולן נתמכות על ידי אותו factory מסוג `createMcpServer()`:

| תעבורה            | מיקום                                           | מתי להשתמש                                        |
| :---------------- | :---------------------------------------------- | :------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | שילובי IDE‏ (Claude Desktop,‏ Cursor וכו')        |
| `sse`             | `POST/GET /api/mcp/sse` באמצעות `httpTransport` | לקוחות דפדפן/סוכן הזקוקים לזרם אירועים            |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | לקוחות HTTP מרובי הפעלות (כותרת `mcp-session-id`) |

תעבורת ה-HTTP הפעילה (`sse` או `streamable-http`) נבחרת באמצעות ההגדרה `mcpTransport`. מעבר בין תעבורות סוגר הפעלות קיימות בתעבורה האחרת.

### גישה מרוחקת (עקיפת manage-scope)

הנתיב `/api/mcp/*` נמצא ברמת LOCAL_ONLY‏ (`src/server/authz/routeGuard.ts`) — כברירת מחדל, רק מארחי loopback‏ (`localhost`,‏ `127.0.0.1`,‏ `::1`) יכולים לגשת אליו. החל מ-v3.8.2, לקוחות שאינם loopback יכולים להתחבר אם הם מציגים `Authorization: Bearer <api-key>` שהמפתח שלו כולל את ההרשאה `manage`. זוהי הדרך היחידה לגשת לשרת MCP המרוחק דרך מנהרה, reverse proxy או שם מארח ציבורי.

```bash
# העניקו הרשאת manage: פתחו את דף מפתחות ה-API בלוח הבקרה והפעילו
# את "Management Access" עבור המפתח, או שלחו POST עם scopes:["manage"] בעת היצירה.

# לאחר מכן התחברו מלקוח MCP מרוחק:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

מפתח ללא הרשאת `manage` (או ללא Bearer) מחזיר `403 LOCAL_ONLY`. התחילית המקבילה `/api/cli-tools/runtime/*` אינה ניתנת לעקיפה במכוון — ראו [רמות Route Guard — החרגה עבור manage-scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## תצורת IDE

ראו [תצורת לקוח MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) להגדרת Claude Desktop,
Cursor, Cline ולקוחות MCP תואמים.

---

## כלים חיוניים (14) — שלב 1

| כלי                             | היקפים                | תיאור                                                                                                                        |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | זמן פעילות, זיכרון, מפסקי זרם, מגבלות קצב, נתוני מטמון                                                                       |
| `omniroute_list_combos`         | `read:combos`         | כל השילובים שהוגדרו, עם אסטרטגיות (מדדים אופציונליים)                                                                        |
| `omniroute_get_combo_metrics`   | `read:combos`         | מדדי ביצועים עבור שילוב מסוים                                                                                                |
| `omniroute_switch_combo`        | `write:combos`        | הפעלה או השבתה של שילוב                                                                                                      |
| `omniroute_create_combo`        | `write:combos`        | יצירת שילוב מאומת באמצעות API השילובים הקיים                                                                                 |
| `omniroute_check_quota`         | `read:quota`          | מכסה בשימוש/כוללת, אחוז נותר, זמן איפוס, תקינות אסימון                                                                       |
| `omniroute_route_request`       | `execute:completions` | שליחת השלמת צ'אט באמצעות הניתוב של OmniRoute                                                                                 |
| `omniroute_cost_report`         | `read:usage`          | דוח עלויות לפי תקופה (הפעלה/יום/שבוע/חודש)                                                                                   |
| `omniroute_list_models_catalog` | `read:models`         | קטלוג מודלים מלא הכולל יכולות, מצב ותמחור                                                                                    |
| `omniroute_radar_catalog`       | `read:radar`          | קטלוג Radar מקומי וחתום; מסננים אופציונליים לפי ספק/משפחה                                                                    |
| `omniroute_tool_search`         | `read:tools`          | גילוי כלים מתוך קטלוג MCP הרשום                                                                                              |
| `omniroute_web_search`          | `execute:search`      | חיפוש באינטרנט באמצעות ספקי החיפוש שהוגדרו. לא X/Twitter.                                                                    |
| `omniroute_x_search`            | `execute:search`      | חיפוש ב-X באמצעות xAI/SuperGrok, או בחירת `xquik-search` לקבלת תוצאות מ-Xquik API. נדרשים פרטי גישה עבור הממשק העורפי שנבחר. |
| `omniroute_web_fetch`           | `execute:search`      | אחזור תוכן מהאינטרנט באמצעות ספקי האחזור שהוגדרו                                                                             |

## כלים מתקדמים (11) — שלב 2

| כלי                                | הרשאות                               | תיאור                                                                                            |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | סימולציית ניתוב בהרצה יבשה עם עץ חלופות                                                          |
| `omniroute_set_budget_guard`       | `write:budget`                       | תקציב הפעלה עם פעולת הפחתה/חסימה/התראה                                                           |
| `omniroute_set_routing_strategy`   | `write:combos`                       | עדכון אסטרטגיית השילוב בזמן ריצה (עדיפות/משוקלל/אוטומטי וכו׳)                                    |
| `omniroute_set_resilience_profile` | `write:resilience`                   | החלת הגדרת עמידות מוכנה מראש מסוג `aggressive` / `balanced` / `conservative`                     |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | בדיקה חיה של כל ספק בשילוב באמצעות קריאה אמיתית לשירות במעלה הזרם                                |
| `omniroute_get_provider_metrics`   | `read:health`                        | מדדים לפי ספק עם זמני השהיה p50/p95/p99 ומצב מפסק המעגל                                          |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | המלצה על שילוב לפי סוג משימה, בכפוף למגבלות תקציב/השהיה                                          |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | הסבר מדוע בקשה נותבה לספק מסוים (גורמי ניקוד + חלופות)                                           |
| `omniroute_get_session_snapshot`   | `read:usage`                         | תמונת מצב מלאה של ההפעלה: עלות, אסימונים, מודלים/ספקים מובילים, שגיאות, מנגנון הגנת תקציב        |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | אבחון (ותיקון אוטומטי אופציונלי) של סטיות במסד הנתונים, כגון הפניות שבורות לשילובים/שורות יתומות |
| `omniroute_sync_pricing`           | `pricing:write`                      | סנכרון נתוני תמחור ממקורות חיצוניים (LiteLLM); תומך ב-`dryRun`                                   |

## כלי מטמון (2)

| כלי                     | הרשאות        | תיאור                                                       |
| :---------------------- | :------------ | :---------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | נתונים סטטיסטיים של מטמון סמנטי, מטמון הנחיות ואידמפוטנטיות |
| `omniroute_cache_flush` | `write:cache` | ניקוי המטמון באופן גלובלי או לפי חתימה/מודל                 |

## כלי דחיסה (13)

| כלי                                 | הרשאות              | תיאור                                                                                                          |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | הגדרות דחיסה, סיכום ניתוח ונתונים סטטיסטיים מודעי-מטמון (כולל מטא-נתוני `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | הגדרת מצב הדחיסה, סף, יחס יעד, שימור הנחיית המערכת ומתג דחיסת תיאורי MCP                                       |
| `omniroute_set_compression_engine`  | `write:compression` | בחירת המנוע הפעיל (off/caveman/rtk/stacked) ועוצמת Caveman/RTK                                                 |
| `omniroute_list_compression_combos` | `read:compression`  | הצגת שילובי דחיסה בעלי שם וצינורות העיבוד של המנועים שלהם                                                      |
| `omniroute_compression_combo_stats` | `read:compression`  | ניתוחים המקובצים לפי שילוב דחיסה ומנוע                                                                         |
| `omniroute_ccr_store`               | `write:compression` | אחסון תוכן מבודד לפי קורא במאגר CCR מוגבל בזיכרון והחזרת סמן יחד עם הפניית `ccr://`                            |
| `omniroute_ccr_retrieve`            | `read:compression`  | אחזור תוכן CCR במלואו או במצבי התחלה, סוף, שורות, grep ונתונים סטטיסטיים                                       |
| `omniroute_ccr_inspect`             | `read:compression`  | בדיקת מטא-נתוני CCR שבבעלות הקורא ללא החזרת התוכן                                                              |
| `omniroute_ccr_list`                | `read:compression`  | הצגת מטא-נתונים מחולקים לעמודים עבור מקטעי CCR שבבעלות הקורא                                                   |
| `omniroute_ccr_delete`              | `write:compression` | מחיקת מקטע CCR שבבעלות הקורא                                                                                   |
| `omniroute_ccr_stats`               | `read:compression`  | דיווח על השימוש בזיכרון בהיקף הקורא, מוני מחזור חיים ומגבלות המאגר                                             |
| `omniroute_rtk_discover`            | `read:compression`  | גילוי רעש חוזר בדגימות פלט RTK שנאספו בהסכמה                                                                   |
| `omniroute_rtk_learn`               | `read:compression`  | יצירת טיוטת מסנן RTK הניתנת לסקירה מתוך דגימות שנאספו בהסכמה                                                   |

רשומות CCR נשמרות בזיכרון בלבד ונעלמות בעת הפעלה מחדש. כל מקטע מוגבל ל-2 MiB, כל
זהות ראשית ל-16 MiB, והמאגר הגלובלי ל-64 MiB. כברירת מחדל, לרשומות מוגדר TTL של 24 שעות (לכל היותר
שבעה ימים). אחזור MCP מלא מוגבל ל-256 KiB; מקטעים גדולים יותר נשארים זמינים באמצעות
מצבי הטווח וה-grep. האחסון, האחזור, ההצגה, הבדיקה, המחיקה והנתונים הסטטיסטיים מבודדים לפי
הזהות הראשית של מפתח ה-API המאומת. רשומות ביקורת מכילות גיבובים ומטא-נתוני גודל, ולעולם לא תוכן.

`omniroute_compression_status` מדווח על דחיסת תיאורי MCP בנפרד תחת
`analytics.mcpDescriptionCompression`. ערכים אלה הם אומדנים של גודל המטא-נתונים עבור תיאורי MCP
הניתנים להצגה ברשימה (`tools`,‏ `prompts`,‏ `resources` ו-`resourceTemplates`); הם אינם אישורי שימוש
של הספק ומסומנים באמצעות `source: "mcp_metadata_estimate"`.

### מסנן עץ הנגישות של MCP (v3.8.0)

בנפרד מכלי הדחיסה שלעיל, OmniRoute כולל מסנן שפועל לאחר הביצוע ודוחס את **תוצאות הכלים** של כלי
דפדפן/נגישות של MCP לפני שהן מוחזרות לסוכן. מסנן זה אינו כלי בפני עצמו — הוא פועל באופן שקוף על כל
תוצאת כלי שמכילה טקסט מפורט של עץ נגישות או תמונת מצב של דפדפן (≥2000 תווים).

התנהגויות עיקריות:

- מכווץ ≥30 שורות אחאיות רצופות וחוזרות לסיכום הכולל התחלה + סוף
- משמר עוגני `[ref=eXX]` הנדרשים על ידי Playwright/שימוש במחשב
- מקצר באופן קשיח טקסט גדול מדי (>50,000 תווים) ומוסיף רמז לניווט
- חיסכון צפוי: **60–80%** במטעני תמונות מצב של דפדפן

תצורה: `compression.mcpAccessibility` בהגדרות הגלובליות (מיגרציה 056).
מימוש: `open-sse/services/compression/engines/mcpAccessibility/`.
תיעוד מלא: [מנועי דחיסה — מסנן עץ הנגישות של MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

ראו [מנועי דחיסה](../compression/COMPRESSION_ENGINES.md) ו-[דחיסת RTK](../compression/RTK_COMPRESSION.md) למידע על
מודל הדחיסה בזמן ריצה שעליו מבוססים כלים אלה.

## כלי 1Proxy‏ (3)

| כלי                         | היקפים         | תיאור                                                                         |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | אחזור שרתי proxy חינמיים משוק 1proxy (מסנני פרוטוקול/מדינה/איכות/מגבלה)       |
| `omniroute_oneproxy_rotate` | `read:proxies` | קבלת שרת ה-proxy הזמין הבא לפי אסטרטגיה (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | סטטיסטיקות המאגר, מצב הסנכרון והתפלגות לפי פרוטוקול ומדינה                    |

## כלי זיכרון (3)

מוגדרים ב-`open-sse/mcp-server/tools/memoryTools.ts`. האימות וההיקפים נאכפים באמצעות צינור ההיקפים הסטנדרטי של MCP.

| כלי                       | היקפים         | תיאור                                                                            |
| :------------------------ | :------------- | :------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | חיפוש זיכרונות לפי שאילתה / סוג / מפתח API, תוך אכיפת תקציב הטוקנים              |
| `omniroute_memory_add`    | `write:memory` | הוספת רשומת זיכרון חדשה (`factual` / `episodic` / `procedural` / `semantic`)     |
| `omniroute_memory_clear`  | `write:memory` | מחיקת זיכרונות עבור מפתח API, עם אפשרות לסינון לפי סוג או חותמת הזמן `olderThan` |

## כלי מיומנויות (4)

מוגדרים ב-`open-sse/mcp-server/tools/skillTools.ts`. מגובים על ידי `src/lib/skills/registry` + `src/lib/skills/executor`.

| כלי                           | היקפים           | תיאור                                                                     |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | הצגת המיומנויות הרשומות, עם סינון אופציונלי לפי מפתח API, שם או מצב הפעלה |
| `omniroute_skills_enable`     | `write:skills`   | הפעלה או השבתה של מיומנות מסוימת לפי ID                                   |
| `omniroute_skills_execute`    | `execute:skills` | ביצוע מיומנות עם קלט שסופק והחזרת רשומת הביצוע                            |
| `omniroute_skills_executions` | `read:skills`    | הצגת היסטוריית הביצועים האחרונה של המיומנויות                             |

## מקור הקשר של Notion‏ (6)

מוגדרים ב-`open-sse/mcp-server/tools/notionTools.ts`. הטוקן מאוחסן בטבלה `key_value` באמצעות `src/lib/db/notion.ts`. לקוח REST נמצא ב-`src/lib/notion/api.ts`. API ההגדרות נמצא ב-`src/app/api/settings/notion/route.ts`. ממשק לוח הבקרה נמצא ב-`src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

הגדירו את טוקן האינטגרציה של Notion בכרטיסייה **מקורות הקשר** בלוח הבקרה של נקודת הקצה, או באמצעות REST API:

```bash
# הגדרת טוקן
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# בדיקת סטטוס
curl http://localhost:20128/api/settings/notion

# ניתוק
curl -X DELETE http://localhost:20128/api/settings/notion
```

| כלי                          | היקפים         | תיאור                                             |
| :--------------------------- | :------------- | :------------------------------------------------ |
| `notion_search`              | `read:notion`  | חיפוש טקסט מלא בכל הדפים ומסדי הנתונים            |
| `notion_get_page`            | `read:notion`  | קבלת דף לפי ID, כולל המאפיינים שלו                |
| `notion_list_block_children` | `read:notion`  | הצגת הבלוקים הצאצאים של דף או בלוק                |
| `notion_query_database`      | `read:notion`  | ביצוע שאילתה במסד נתונים עם מסננים, מיונים ועימוד |
| `notion_get_database`        | `read:notion`  | קבלת סכמת מסד נתונים לפי ID                       |
| `notion_append_blocks`       | `write:notion` | הוספת בלוקים צאצאים לבלוק אב (עד 100 בכל בקשה)    |

## כלי קטלוג מיומנויות סוכן (3)

מוגדרים ב-`open-sse/mcp-server/tools/agentSkillTools.ts`. מבוססים על `src/lib/agentSkills/catalog`. כלים אלה חושפים ללקוחות MCP ולסוכנים חיצוניים את קטלוג התיעוד של מיומנויות הסוכן, הכולל 45 רשומות. היקף: `read:catalog`.

| כלי                               | היקפים         | תיאור                                                                                                                          |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | הצגת כל 45 מיומנויות הסוכן, עם מסנני `category` (api\|cli) ו-`area` אופציונליים; מחזיר מטא-נתונים + כיסוי                      |
| `omniroute_agent_skills_get`      | `read:catalog` | קבלת מטא-נתונים מלאים + תוכן SKILL.md עבור מיומנות יחידה לפי `id` קנוני                                                        |
| `omniroute_agent_skills_coverage` | `read:catalog` | נתוני כיסוי: לכמה מתוך 23 מיומנויות API, ‏21 מיומנויות CLI ומיומנות תצורה אחת יש קובצי SKILL.md במערכת הקבצים, לעומת סך הקטלוג |

ראו [AGENT-SKILLS.md](./AGENT-SKILLS.md) לקבלת הקטלוג המלא ולהסבר כיצד סוכנים חיצוניים משתמשים בו.

## מסגרות קשורות (v3.8.0)

מלאי כלי ה-MCP שלעיל (110 כלים ייחודיים, כפי שחושב על ידי `countUniqueMcpTools()`) מוגבל במכוון
לפעולות ניתוב/מטמון/דחיסה/זיכרון/מיומנויות/פרוקסי/מקור-הקשר בזמן ריצה. שתי מסגרות סמוכות
מסופקות לצד שרת ה-MCP ב-v3.8.0 ומתועדות בנפרד:

### סוכני ענן

סוכני ענן הם סוכני קידוד מבוססי AI הפועלים מחוץ לתהליך (codex-cloud, cursor-cloud, devin, jules), המשולבים
ב-OmniRoute באמצעות אותו מודל חיבור המשמש ספקי LLM. הם נחשפים באמצעות
ממשק REST משלהם (`/api/v1/agents/*`) ו**אינם** חלק מקטלוג כלי ה-MCP
— קריאה לסוכן ענן אינה צורכת היקף MCP.

- מימוש: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- מחזור חיים: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- תיעוד: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### מנגנוני הגנה

מנגנוני הגנה הם מסננים המופעלים לפני/אחרי ביצוע (vision-bridge, pii-masker, prompt-injection)
בתוך תהליך הצ'אט. הם פועלים לפני ההגעה לשכבת הכלים/הניתוב של MCP
ופולטים הפרות מובנות לתהליך הביקורת; הם אינם מופעלים ככלי MCP.

- מימוש: `src/lib/guardrails/`.
- תיעוד: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

בעת ניפוי שגיאות בקריאת MCP שנראית חסומה, בדקו הן את יומן הביקורת של MCP
(רשומות `scope_denied:*`) והן את נתיב הביקורת של מנגנוני ההגנה — ייתכן שבקשה תידחה על ידי
מנגנון הגנה **לפני** שהיא מגיעה בכלל לשכבת אכיפת ההיקפים של MCP.

---

## נקודות קצה של REST API

| נקודת קצה              | שיטה                  | תיאור                                                                                               | אימות               |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------- | :------------------ |
| `/api/mcp/status`      | `GET`                 | מצב השרת: אות חיים, מצב תעבורת HTTP, סיכום פעילות ביקורת                                            | ניהול (הפעלה/admin) |
| `/api/mcp/tools`       | `GET`                 | קטלוג כלים (שם, תיאור, היקפים, שלב, נקודות קצה מקוריות)                                             | ניהול               |
| `/api/mcp/sse`         | `GET` / `POST`        | נקודת קצה לתעבורת SSE (מותנית ב-`mcpEnabled` + `mcpTransport === "sse"`)                            | מפתח API + היקפים   |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | תעבורת HTTP ניתנת להזרמה (משתמשת בכותרת `mcp-session-id`; ‏`DELETE` מסיימת את ההפעלה)               | מפתח API + היקפים   |
| `/api/mcp/audit`       | `GET`                 | רשומות יומן ביקורת מתוך `mcp_tool_audit` (מסננים: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | ניהול               |
| `/api/mcp/audit/stats` | `GET`                 | נתוני ביקורת מצטברים (`totalCalls`, `successRate`, `avgDurationMs`, הכלים המובילים)                 | ניהול               |

קובצי מקור: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

תעבורות SSE ו-Streamable HTTP חסומות עד להפעלת שרת ה-MCP בהגדרות (`mcpEnabled`) ולבחירת `mcpTransport` המתאים. אם מוגדרת תעבורה שגויה, הנתיב מחזיר HTTP 400 עם רמז להחלפת ההגדרות.

---

## אימות וטווחי הרשאות

כלי MCP מאומתים באמצעות טווחי הרשאות של מפתחות API. אכיפת טווחי ההרשאות מרוכזת ב־
`open-sse/mcp-server/scopeEnforcement.ts`. כל כלי דורש טווחי הרשאות מסוימים:

| תחום                  | כלים                                                                                                                                                                        |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                           |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                   |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                      |
| `read:quota`          | `check_quota`                                                                                                                                                               |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                      |
| `read:models`         | `list_models_catalog`                                                                                                                                                       |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                               |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                       |
| `write:budget`        | `set_budget_guard`                                                                                                                                                          |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                 |
| `pricing:write`       | `sync_pricing`                                                                                                                                                              |
| `read:cache`          | `cache_stats`                                                                                                                                                               |
| `write:cache`         | `cache_flush`                                                                                                                                                               |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                  |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                           |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                       |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                            |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                      |
| `read:memory`         | `memory_search`                                                                                                                                                             |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                          |
| `write:skills`        | `skills_enable`                                                                                                                                                             |
| `execute:skills`      | `skills_execute`                                                                                                                                                            |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                            |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                     |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                   |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                            |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                              |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                          |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                             |
| `read:obsidian`       | 13 כלי קריאה — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 כלי כתיבה — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                           |

יש תמיכה בתחומי הרשאה עם תווים כלליים: `read:*` מעניק את כל תחומי ההרשאה לקריאה, ו-`*` מעניק גישה מלאה.

### `mcp:connect` — יכולת מצומצמת לנתיב (#7895)

גישה לתעבורת HTTP/SSE של MCP (`/api/mcp/*`) מכתובת שאינה loopback דורשת את החרגת
LOCAL_ONLY של `/api/mcp/` (ראו `docs/security/ROUTE_GUARD_TIERS.md`). בעבר, החרגה זו
קיבלה רק מפתח API בעל תחום הרשאה מלא מסוג `manage`/`admin` — הרשאה רחבה מדי עבור
לקוח שרק צריך לתקשר עם MCP. הקובץ `src/shared/constants/managementScopes.ts` מייצא כעת
את `MCP_CONNECT_SCOPE = "mcp:connect"`: תחום הרשאה נוסף ומצומצם (בהתאם לתקדים של
`SELF_USAGE_SCOPE`) שמאשר אך ורק את המעקף של `/api/mcp/` בתוך
`src/server/authz/policies/management.ts` — הוא אינו מעניק גישה לשום נתיב ניהול אחר,
ובכוונה אינו נכלל ב-`MANAGEMENT_API_KEY_SCOPES`. מפתח שמחזיק ב-`manage`/`admin`
עדיין עובר את ההחרגה ללא שינוי; `mcp:connect` הוא חלופה בעלת הרשאות מצומצמות יותר עבור
לקוחות מרוחקים המשתמשים ב-MCP בלבד, הנבדקת באמצעות `hasMcpConnectOrManageScope()`.

### שיוך תחומי הרשאה לכל מפתח דרך HTTP (#7895)

דרך HTTP/SSE, הקובץ `open-sse/mcp-server/httpTransport.ts` מאתר כעת את
`api_keys.scopes` האמיתיים של הלקוח באמצעות `resolveMcpCallerAuthInfo()`
(`open-sse/mcp-server/httpAuthContext.ts`) ומעביר אותם אל
`transport.handleRequest(req, { authInfo })` של MCP SDK, כך ש-`extra.authInfo.scopes`
שמגיע לכל קריאת כלי משקף את תחומי ההרשאה של מפתח ה-Bearer עצמו.
הפונקציה `resolveCallerScopeContext()` שב-`scopeEnforcement.ts` כבר נתנה עדיפות
ל-`authInfo` על פני `_meta` ועל פני ברירת המחדל ממשתנה הסביבה
`OMNIROUTE_MCP_SCOPES` — שינוי זה רק מאכלס את המקור הראשון ובעל העדיפות הגבוהה ביותר,
שקודם לכן לא קיבל נתונים דרך HTTP. כאשר לא נמצא מפתח API תקף (אין כותרת, או שהמפתח
אינו תקף), `authInfo` נשאר `undefined`, והרזולוציה ממשיכה לשרשרת `meta`/משתנה הסביבה
הקיימת ללא שינוי. שינוי זה אינו הופך את ברירת המחדל של
`OMNIROUTE_MCP_ENFORCE_SCOPES` — עדיין יש להפעיל את האכיפה במפורש; השינוי רק מבטיח
שהנתיב לכל מפתח יקבל עדיפות לאחר שהאכיפה מופעלת. ל-stdio אין זהות נפרדת לכל לקוח
(ראו `mcpCallerIdentity.ts`), ולכן הוא אינו מושפע — הוא ממשיך להשתמש בשרשרת ברירות
המחדל של `_meta`/משתנה הסביבה.

---

## משתני סביבה

| משתנה                                   | ברירת מחדל                       | מטרה                                                                                                |
| :-------------------------------------- | :------------------------------- | :-------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`         | כתובת ה-URL הבסיסית שבה משתמש שרת ה-MCP בעת קריאה לממשקי API פנימיים של OmniRoute                   |
| `OMNIROUTE_API_KEY`                     | (ריק)                            | מפתח API שמועבר בתור `Authorization: Bearer` לקריאות API פנימיות                                    |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (רק `"true"` מפעיל אותו) | כאשר האפשרות מופעלת, הרשאות חסרות מונעות קריאות לכלים ומתעדות `scope_denied:<reason>` ביומן הביקורת |
| `OMNIROUTE_MCP_SCOPES`                  | (ריק)                            | רשימת הרשאות מופרדת בפסיקים שנחשבות ל"זמינות" כברירת מחדל (משמשת כאשר הקורא אינו מספק הרשאות משלו)  |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (לא מוגדר = מופעל)               | כאשר מוגדר לערך `0/false/off/no`, משבית את דחיסת תיאורי MCP בזמן הרישום                             |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (לא מוגדר = מופעל)               | כינוי חלופי לאותו מתג שמופיע לעיל                                                                   |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                          | מגבלת הזמן לביטול קריאות ניהול פנימיות (תקינות, עמידות, שילובים, מכסה, שימוש)                       |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                          | מגבלת הזמן לביטול שלבים הממתינים לספק (`route_request`, `web_search`, `web_fetch`)                  |
| `MCP_TOOL_DENY`                         | (לא מוגדר = ללא סינון)           | שמות כלים מופרדים בפסיקים שיושמטו מ-`tools/list` (צמצום מספר הכלים — ראו להלן)                      |
| `MCP_TOOL_ALLOW`                        | (לא מוגדר = ללא סינון)           | שמות כלים מופרדים בפסיקים שיישמרו באופן בלעדי (מצב רשימת היתרים — ראו להלן)                         |
| `DATA_DIR`                              | `~/.omniroute`                   | קובץ אות החיים נכתב אל `${DATA_DIR}/runtime/mcp-heartbeat.json`                                     |

---

## דחיסת תיאורים

מאגרי הכלים, ההנחיות והמשאבים של MCP יכולים לדחוס תיאורים בזמן הרישום/הצגת הרשימה כדי לצמצם את היקף המטא-נתונים הנחשפים ללקוחות (וכתוצאה מכך את עלות הקשר ההנחיה). המימוש נמצא ב-`open-sse/mcp-server/descriptionCompressor.ts` ומשולב בשרת ה-MCP באמצעות `compressMcpRegistryMetadata` בתוך `createMcpServer()`.

- הדחיסה פועלת על טקסט התיאור באמצעות מערכת הכללים Caveman (`getRulesForContext("all", "full")`) תוך חילוץ מקטעים מוגנים (קטעי קוד, בלוקים מגודרים וכו'), כך שהתוכן המבני אינו משתנה.
- ניתן להפעיל או להשבית בכל פריסה באמצעות הערך `compression.mcpDescriptionCompressionEnabled` בטבלת ההגדרות `key_value` (ברירת מחדל: מופעל) — מוצג בממשק המשתמש בתור **ניתוח נתונים → דחיסת תיאורי MCP**.
- ניתן להפעיל או להשבית בכל התהליך באמצעות `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` או `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- נתונים סטטיסטיים בזמן אמת מוצגים באמצעות `omniroute_compression_status` תחת `analytics.mcpDescriptionCompression` ומתויגים ב-`source: "mcp_metadata_estimate"` כדי להבדיל ביניהם לבין נתוני שימוש אמיתיים שהתקבלו מהספק.

---

## צמצום מספר הכלים (F4.3)

דחיסת תיאורים מקטינה את המטא-נתונים של כל כלי; **צמצום מספר הכלים** מתקדם צעד נוסף באמצעות הפחתת _מספר_ הכלים המוכרזים מלכתחילה. פרסום של פחות כלים במניפסט `tools/list` מפחית את עלות הטוקנים לכל בקשה שבה נושא מודל הלקוח עבור קטלוג הכלים (דחיסת "שכבה 5"). המימוש הוא מסנן טהור וחסר מצב ב-`open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), המשולב בלולאת הרישום ב-`createMcpServer()` (`open-sse/mcp-server/server.ts`).

**הצטרפות יזומה, מושבת כברירת מחדל.** המסנן פועל רק כאשר מוגדר לפחות אחד משני משתני הסביבה; כאשר אף אחד מהם אינו מוגדר, כל 110 הכלים מוכרזים ללא שינוי.

| משתנה            | מצב                                                                     |
| :--------------- | :---------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | רשימה שחורה — שמות כלים מופרדים בפסיקים, אשר תמיד מוסרים מ-`tools/list` |
| `MCP_TOOL_ALLOW` | רשימת היתרים — שמות כלים מופרדים בפסיקים; רק אלה נשארים וכל השאר מוסרים |

ל-`deny` יש עדיפות על פני `allow`. השמות מופרדים בפסיקים, רווחים מיותרים מוסרים, ורשומות ריקות אינן נכללות. דוגמאות:

```bash
# הסרת שני כלים מהקטלוג
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# הכרזה רק על כלי הניתוב והמכסה (מצב רשימת היתרים)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**כיצד כלים מסוננים מוסרים:** הרישום תמיד מצליח; לאחר מכן מופעלת `.disable()` על כלי שהפרופיל דוחה דרך נקודת האחיזה של MCP SDK, כך שהוא לעולם אינו מופיע ב-`tools/list`, אך החיווט נשאר ללא שינוי (הפעלה/השבתה נקיות, ללא רישום מחדש). מנתח הפרופיל הוא `readMcpToolProfileFromEnv(process.env)`, שמחזיר `null` (ללא סינון) כאשר שני המשתנים ריקים.

המבנה העשיר יותר `ToolProfile` שמאחורי `reduceToolManifest` תומך גם בסינון לפי חיתוך תחומים (`allowScopes`, עם התאמה באמצעות תווים כלליים בסגנון `read:*`) ובהגבלת `maxTools` דטרמיניסטית, אך שני מנגנונים אלה דורשים את המניפסט המלא בזמן הרישום ו**אינם** חשופים כיום דרך משתני הסביבה (נקודת חיבור ברמת `tools/list` מתועדת כמשימת המשך). ניתן להשתמש ב-`estimateManifestTokens()` כדי להשוות את עלות הטוקנים של המניפסט לפני הצמצום ואחריו.

---

## פעימת חיים בזמן ריצה

תעבורת stdio שומרת את מצב החיוּת ב-`${DATA_DIR}/runtime/mcp-heartbeat.json` מדי 5 שניות. לוח המחוונים (`/api/mcp/status`) קורא קובץ זה ובודק גם את חיוּת ה-PID כדי להסיק את ערך `online`. תעבורות HTTP מדווחות במקום זאת על המצב מתוך התהליך באמצעות `getMcpHttpStatus()` (ללא כתיבה לקובץ).

תמונת המצב של פעימת החיים מכילה:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## רישום ביקורת

כל קריאה לכלי נרשמת בטבלת SQLite בשם `mcp_tool_audit` על ידי `open-sse/mcp-server/audit.ts`:

- שם הכלי, ארגומנטים (מגובבים/מקוצרים בהתאם ל-`auditLevel` של כל כלי), תוצאה
- משך באלפיות השנייה, דגל הצלחה/כישלון, הודעת שגיאה (כאשר רלוונטי)
- גיבוב מפתח API, חותמת זמן
- דחיות תחום נרשמות כ-`scope_denied:<reason>` יחד עם רשימת התחומים החסרים

השתמשו בלוח המחוונים או בנקודות הקצה של REST מסוג `/api/mcp/audit` ו-`/api/mcp/audit/stats` כדי לבדוק קריאות אחרונות.

---

## קבצים

| קובץ                                                                     | מטרה                                                             |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | מפעל שרת MCP, נקודת כניסה של stdio ורישומי כלים מוגבלים לפי תחום |
| `open-sse/mcp-server/httpTransport.ts`                                   | תעבורת SSE + HTTP ניתנת להזרמה (ניהול הפעלות)                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | הערכת תחום הכלים וזיהוי הגורם הקורא                              |
| `open-sse/mcp-server/audit.ts`                                           | רישום ביקורת של קריאות לכלים (`mcp_tool_audit`)                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | כותב פעימות stdio (`mcp-heartbeat.json`)                         |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | דחיסת תיאורים עבור מאגרי כלים / הנחיות / משאבים                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | סכמות Zod + מאגר כלים (`MCP_TOOLS`,‏ 45 רשומות)                  |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | מטפלים בכלי שלב 2 + מטמון + 1proxy                               |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | מטפלים בכלי דחיסה                                                |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | הגדרות כלי זיכרון (3 כלים)                                       |
| `open-sse/mcp-server/tools/skillTools.ts`                                | הגדרות כלי מיומנויות (4 כלים)                                    |
| `open-sse/mcp-server/tools/notionTools.ts`                               | הגדרות כלי מקור הקשר של Notion (6 כלים)                          |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | הגדרות כלי משחוק (8 כלים)                                        |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | כלים לרישום ולניהול תוספים (8 כלים)                              |
| `src/app/api/mcp/status/route.ts`                                        | נקודת קצה `/api/mcp/status`                                      |
| `src/app/api/mcp/tools/route.ts`                                         | נקודת קצה `/api/mcp/tools`                                       |
| `src/app/api/mcp/sse/route.ts`                                           | נתיב תעבורת SSE‏ `/api/mcp/sse`                                  |
| `src/app/api/mcp/stream/route.ts`                                        | נתיב תעבורת HTTP ניתנת להזרמה `/api/mcp/stream`                  |
| `src/app/api/mcp/audit/route.ts`                                         | שאילתת יומן ביקורת `/api/mcp/audit`                              |
| `src/app/api/mcp/audit/stats/route.ts`                                   | מדדי ביקורת מצטברים `/api/mcp/audit/stats`                       |
| `src/lib/notion/api.ts`                                                  | לקוח REST API של Notion (ניסיונות חוזרים, פסק זמן, סיווג שגיאות) |
| `src/lib/db/notion.ts`                                                   | שמירת אסימון Notion (`key_value` table)                          |
| `src/app/api/settings/notion/route.ts`                                   | API להגדרות Notion‏ (GET/POST/DELETE)                            |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | ממשק משתמש לניהול אסימון Notion                                  |
| `tests/unit/notion-api.test.ts`                                          | בדיקות לקוח API של Notion‏ (7)                                   |
| `tests/unit/notion-tools.test.ts`                                        | בדיקות אכיפת תחום לכלי Notion‏ (10)                              |
| `tests/unit/db/notion.test.mjs`                                          | בדיקות מודול מסד הנתונים של Notion‏ (3)                          |
