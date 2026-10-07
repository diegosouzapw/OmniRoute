# OmniRoute MCP Server Documentation (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> سرور Model Context Protocol با 110 ابزار برای عملیات مسیریابی، کش، فشردهسازی، حافظه، مهارتها، پروکسی، استخر، Radar و منابع زمینه.
>
> منبع حقیقت: فایل `open-sse/mcp-server/server.ts` با استفاده از `countUniqueMcpTools()` تعداد **110 ابزار منحصربهفرد** را محاسبه میکند: 45 تعریف متعارف (شامل شش ابزار چرخهٔ حیات CCR، سهگانهٔ agent-skills، ابزار `omniroute_radar_catalog` و ابزار `omniroute_x_search`)، بهعلاوهٔ حافظه (3)، مهارتها (4)، مهارتهای GitHub (3)، استخر (6)، بازیوارسازی (8)، افزونهها (8)، Notion (6)، Obsidian (22)، پیکرهٔ محلی (3) و دو ابزار فشردهسازی مختص RTK.

## نصب

OmniRoute MCP بهصورت داخلی ارائه شده است. آن را با دستور زیر راهاندازی کنید:

```bash
omniroute --mcp
```

یا از طریق انتقال open-sse:

```bash
# انتقال HTTP قابلاستریم (درگاه 20130)
omniroute --dev  # MCP بهطور خودکار روی نقطهٔ پایانی /mcp راهاندازی میشود
```

انتقالهای HTTP (`sse` / `streamable-http` که درون همان فرایند توسط سرور داشبورد ارائه میشوند)
بهطور پیشفرض غیرفعالاند و پیشتر فقط از صفحهٔ `/dashboard/mcp` قابل تغییر بودند. از v3.8.51
به بعد، CLI نیز قابلیتهای یکسانی دارد:

```bash
omniroute mcp status                                  # وضعیت فعال/آنلاین، انتقال و تعداد ابزارها
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # نشستهای فعال sse/streamable-http را بازنشانی میکند
```

`mcp enable`/`mcp disable` همان تنظیم `mcpEnabled` (و در صورت نیاز `mcpTransport`) را که
داشبورد از طریق `/api/settings` تغییر میدهد، با PATCH بهروزرسانی میکنند. `mcp restart`،
`POST /api/mcp/restart` را فراخوانی میکند: این عملیات نشستهای فعال `sse`/`streamable-http`
را خاتمه میدهد تا درخواست بعدی بهصورت تمیز مقداردهی اولیه شود؛ اگر MCP غیرفعال باشد `409`
و برای انتقال `stdio` مقدار `501` را بازمیگرداند (کلاینتهای stdio مالک زیرفرایند خود هستند —
هیچ دستگیرهٔ درونفرایندی برای راهاندازی مجدد وجود ندارد).

## انتقالها

سرور MCP سه انتقال را ارائه میدهد که همگی از کارخانهٔ یکسان `createMcpServer()` استفاده میکنند:

| انتقال            | محل                                             | زمان استفاده                                         |
| :---------------- | :---------------------------------------------- | :--------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | یکپارچهسازی با IDEها (Claude Desktop، Cursor و غیره) |
| `sse`             | `POST/GET /api/mcp/sse` از طریق `httpTransport` | کلاینتهای مرورگر/عامل که به جریان رویداد نیاز دارند  |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | کلاینتهای HTTP چندنشستی (هدر `mcp-session-id`)       |

انتقال HTTP فعال (`sse` یا `streamable-http`) توسط تنظیم `mcpTransport` انتخاب میشود. تغییر انتقال باعث بستهشدن نشستهای موجود در انتقال دیگر میشود.

### دسترسی راه دور (دور زدن محدودیت با حوزهٔ manage)

`/api/mcp/*` در سطح LOCAL_ONLY قرار دارد (`src/server/authz/routeGuard.ts`) — بهطور پیشفرض فقط میزبانهای loopback (`localhost`، `127.0.0.1`، `::1`) میتوانند به آن دسترسی پیدا کنند. از v3.8.2 به بعد، کلاینتهای غیر-loopback در صورتی میتوانند متصل شوند که یک `Authorization: Bearer <api-key>` ارائه دهند و کلید آنها دارای حوزهٔ `manage` باشد. این تنها روش دسترسی به سرور MCP راه دور از طریق تونل، پروکسی معکوس یا نام میزبان عمومی است.

```bash
# اعطای حوزهٔ manage: صفحهٔ API Keys داشبورد را باز کرده و گزینهٔ
# "Management Access" را برای کلید فعال کنید، یا هنگام ایجاد، scopes:["manage"] را با POST ارسال کنید.

# سپس از یک کلاینت MCP راه دور متصل شوید:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

یک کلید فاقد حوزهٔ manage (یا نبود Bearer) پاسخ `403 LOCAL_ONLY` را بازمیگرداند. پیشوند همسطح `/api/cli-tools/runtime/*` عمداً قابل دور زدن نیست — به بخش [سطوح محافظ مسیر — استثنای حوزهٔ manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) مراجعه کنید.

## پیکربندی IDE

برای راهاندازی Claude Desktop،‏ Cursor،‏ Cline و کلاینتهای سازگار با MCP، به [پیکربندی کلاینت MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) مراجعه کنید.

---

## ابزارهای ضروری (14) — فاز 1

| ابزار                           | حوزههای دسترسی        | توضیحات                                                                                                                           |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | زمان فعالیت، حافظه، قطعکنندههای مدار، محدودیتهای نرخ، آمار کش                                                                     |
| `omniroute_list_combos`         | `read:combos`         | همه ترکیبهای پیکربندیشده بههمراه راهبردها (معیارهای اختیاری)                                                                      |
| `omniroute_get_combo_metrics`   | `read:combos`         | معیارهای عملکرد برای یک ترکیب مشخص                                                                                                |
| `omniroute_switch_combo`        | `write:combos`        | فعال یا غیرفعالکردن یک ترکیب                                                                                                      |
| `omniroute_create_combo`        | `write:combos`        | ایجاد یک ترکیب اعتبارسنجیشده از طریق API موجود ترکیبها                                                                            |
| `omniroute_check_quota`         | `read:quota`          | سهمیه مصرفشده/کل، درصد باقیمانده، زمان بازنشانی، سلامت توکن                                                                       |
| `omniroute_route_request`       | `execute:completions` | ارسال یک تکمیل گفتوگو از طریق مسیریابی OmniRoute                                                                                  |
| `omniroute_cost_report`         | `read:usage`          | گزارش هزینه بر اساس دوره (نشست/روز/هفته/ماه)                                                                                      |
| `omniroute_list_models_catalog` | `read:models`         | فهرست کامل مدلها بههمراه قابلیتها، وضعیت و قیمتگذاری                                                                              |
| `omniroute_radar_catalog`       | `read:radar`          | فهرست محلی و امضاشده Radar؛ فیلترهای اختیاری ارائهدهنده/خانواده                                                                   |
| `omniroute_tool_search`         | `read:tools`          | یافتن ابزارها از فهرست ثبتشده MCP                                                                                                 |
| `omniroute_web_search`          | `execute:search`      | جستوجوی وب از طریق ارائهدهندگان جستوجوی پیکربندیشده. شامل X/Twitter نمیشود.                                                       |
| `omniroute_x_search`            | `execute:search`      | جستوجوی X از طریق xAI/SuperGrok، یا انتخاب `xquik-search` برای نتایج API سرویس Xquik. به اعتبارنامههای بکاند انتخابشده نیاز دارد. |
| `omniroute_web_fetch`           | `execute:search`      | واکشی محتوای وب از طریق ارائهدهندگان واکشی پیکربندیشده                                                                            |

## ابزارهای پیشرفته (11) — فاز 2

| ابزار                              | محدودههای دسترسی                     | توضیحات                                                                                                   |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | شبیهسازی مسیریابی بهصورت اجرای آزمایشی همراه با درخت مسیرهای جایگزین                                      |
| `omniroute_set_budget_guard`       | `write:budget`                       | بودجهٔ نشست با اقدام کاهش کیفیت/مسدودسازی/هشدار                                                           |
| `omniroute_set_routing_strategy`   | `write:combos`                       | بهروزرسانی راهبرد ترکیبی در زمان اجرا (اولویتدار/وزندار/خودکار/غیره)                                      |
| `omniroute_set_resilience_profile` | `write:resilience`                   | اعمال پیشتنظیم تابآوری `aggressive` / `balanced` / `conservative`                                         |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | آزمون زندهٔ همهٔ ارائهدهندگان در یک ترکیب با استفاده از فراخوانی واقعی بالادستی                           |
| `omniroute_get_provider_metrics`   | `read:health`                        | معیارهای هر ارائهدهنده شامل تأخیر p50/p95/p99 و وضعیت قطعکنندهٔ مدار                                      |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | پیشنهاد ترکیب بر اساس نوع وظیفه، با محدودیتهای بودجه/تأخیر                                                |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | توضیح علت مسیریابی یک درخواست به ارائهدهنده (عوامل امتیازدهی + مسیرهای جایگزین)                           |
| `omniroute_get_session_snapshot`   | `read:usage`                         | تصویر لحظهای کامل نشست: هزینه، توکنها، مدلها/ارائهدهندگان برتر، خطاها و محافظ بودجه                       |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | تشخیص ناهماهنگی پایگاه داده، مانند ارجاعات ترکیبی خراب/ردیفهای یتیم (و در صورت انتخاب، تعمیر خودکار آنها) |
| `omniroute_sync_pricing`           | `pricing:write`                      | همگامسازی دادههای قیمتگذاری از منابع خارجی (LiteLLM)؛ پشتیبانی از `dryRun`                                |

## ابزارهای حافظهٔ نهان (2)

| ابزار                   | محدودههای دسترسی | توضیحات                                               |
| :---------------------- | :--------------- | :---------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`     | آمار حافظهٔ نهان معنایی، حافظهٔ نهان پرامپت و همتوانی |
| `omniroute_cache_flush` | `write:cache`    | پاکسازی سراسری حافظهٔ نهان یا بر اساس امضا/مدل        |

## ابزارهای فشردهسازی (13)

| ابزار                               | محدودههای دسترسی    | توضیحات                                                                                                               |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | تنظیمات فشردهسازی، خلاصهٔ تحلیلها و آمار آگاه از حافظهٔ نهان (شامل فرادادهٔ `analytics.mcpDescriptionCompression`)    |
| `omniroute_compression_configure`   | `write:compression` | پیکربندی حالت فشردهسازی، آستانه، نسبت هدف، حفظ پرامپت سیستمی و کلید تغییر وضعیت فشردهسازی توضیحات MCP                 |
| `omniroute_set_compression_engine`  | `write:compression` | انتخاب موتور فعال (off/caveman/rtk/stacked) و شدت Caveman/RTK                                                         |
| `omniroute_list_compression_combos` | `read:compression`  | فهرستکردن ترکیبهای نامگذاریشدهٔ فشردهسازی و خط لولهٔ موتورهای آنها                                                    |
| `omniroute_compression_combo_stats` | `read:compression`  | تحلیلهای گروهبندیشده بر اساس ترکیب فشردهسازی و موتور                                                                  |
| `omniroute_ccr_store`               | `write:compression` | ذخیرهٔ محتوای تفکیکشده بر اساس فراخواننده در مخزن درونحافظهای محدود CCR و بازگرداندن یک نشانگر بههمراه ارجاع `ccr://` |
| `omniroute_ccr_retrieve`            | `read:compression`  | بازیابی کامل محتوای CCR یا بازیابی با حالتهای ابتدا، انتها، خطوط، grep و آمار                                         |
| `omniroute_ccr_inspect`             | `read:compression`  | بررسی فرادادهٔ CCR متعلق به فراخواننده بدون بازگرداندن محتوا                                                          |
| `omniroute_ccr_list`                | `read:compression`  | فهرستکردن صفحهبندیشدهٔ فرادادهٔ بلوکهای CCR متعلق به فراخواننده                                                       |
| `omniroute_ccr_delete`              | `write:compression` | حذف یک بلوک CCR متعلق به فراخواننده                                                                                   |
| `omniroute_ccr_stats`               | `read:compression`  | گزارش مصرف حافظه در محدودهٔ فراخواننده، شمارندههای چرخهٔ عمر و محدودیتهای مخزن                                        |
| `omniroute_rtk_discover`            | `read:compression`  | کشف نویز تکرارشونده در نمونههای خروجی RTK با مشارکت اختیاری                                                           |
| `omniroute_rtk_learn`               | `read:compression`  | ایجاد پیشنویس قابلبازبینی فیلتر RTK از نمونههای دارای مشارکت اختیاری                                                  |

ورودیهای CCR فقط در حافظه نگهداری میشوند و پس از راهاندازی مجدد از بین میروند. هر بلوک به 2 MiB، هر
هویت اصلی به 16 MiB و کل مخزن به 64 MiB محدود است. TTL پیشفرض ورودیها 24 ساعت است (حداکثر
هفت روز). بازیابی کامل MCP به 256 KiB محدود است؛ بلوکهای بزرگتر همچنان از طریق حالتهای
محدودهای و grep در دسترس میمانند. ذخیرهسازی، بازیابی، فهرستکردن، بررسی، حذف و آمار بر اساس
هویت اصلی کلید API احراز هویتشده تفکیک میشوند. رکوردهای ممیزی فقط شامل هشها و فرادادهٔ اندازه هستند و هرگز محتوا را در بر نمیگیرند.

`omniroute_compression_status` فشردهسازی توضیحات MCP را بهصورت جداگانه در
`analytics.mcpDescriptionCompression` گزارش میکند. این مقادیر، برآوردهایی از اندازه فراداده برای توضیحات قابلفهرستشدن MCP
(`tools`، `prompts`، `resources` و `resourceTemplates`) هستند؛ این مقادیر رسیدهای مصرف ارائهدهنده
نیستند و با `source: "mcp_metadata_estimate"` علامتگذاری میشوند.

### فیلتر درخت دسترسپذیری MCP (v3.8.0)

جدا از ابزارهای فشردهسازی بالا، OmniRoute شامل یک فیلتر پس از اجرا است که
**نتایج ابزار** مربوط به ابزارهای مرورگر/دسترسپذیری MCP را پیش از بازگرداندن آنها به
عامل، فشرده میکند. این فیلتر خود یک ابزار نیست — بلکه بهصورت شفاف روی هر نتیجه ابزاری اجرا میشود که
حاوی متن طولانی درخت دسترسپذیری یا تصویر لحظهای مرورگر باشد (≥2000 نویسه).

رفتارهای کلیدی:

- ≥30 خط همسطح تکراری و متوالی را در قالب خلاصهای شامل ابتدا + انتها فشرده میکند
- لنگرهای `[ref=eXX]` موردنیاز Playwright/computer-use را حفظ میکند
- متنهای بیشازحد بزرگ (>50,000 نویسه) را با یک راهنمای پیمایش بهصورت قطعی کوتاه میکند
- صرفهجویی موردانتظار: **60–80%** در دادههای تصویر لحظهای مرورگر

پیکربندی: `compression.mcpAccessibility` در تنظیمات سراسری (مهاجرت 056).
پیادهسازی: `open-sse/services/compression/engines/mcpAccessibility/`.
مستندات کامل: [موتورهای فشردهسازی — فیلتر درخت دسترسپذیری MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

برای آشنایی با مدل فشردهسازی زمان اجرا در پس این ابزارها، به [موتورهای فشردهسازی](../compression/COMPRESSION_ENGINES.md) و [فشردهسازی RTK](../compression/RTK_COMPRESSION.md)
مراجعه کنید.

## ابزارهای 1Proxy (3)

| ابزار                       | محدودهها       | توضیحات                                                                         |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | دریافت پراکسیهای رایگان از بازار 1proxy (فیلترهای پروتکل/کشور/کیفیت/تعداد)      |
| `omniroute_oneproxy_rotate` | `read:proxies` | دریافت پراکسی دردسترس بعدی بر اساس راهبرد (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | آمار مخزن، وضعیت همگامسازی و توزیع بر اساس پروتکل و کشور                        |

## ابزارهای حافظه (3)

در `open-sse/mcp-server/tools/memoryTools.ts` تعریف شدهاند. احراز هویت/محدوده از طریق خط لوله استاندارد محدوده MCP اعمال میشود.

| ابزار                     | محدودهها       | توضیحات                                                                            |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | جستوجوی حافظهها بر اساس پرسوجو / نوع / کلید API با اعمال محدودیت بودجه توکن        |
| `omniroute_memory_add`    | `write:memory` | افزودن یک ورودی حافظه جدید (`factual` / `episodic` / `procedural` / `semantic`)    |
| `omniroute_memory_clear`  | `write:memory` | پاککردن حافظههای یک کلید API، با امکان فیلتر بر اساس نوع یا مُهر زمانی `olderThan` |

## ابزارهای مهارت (4)

در `open-sse/mcp-server/tools/skillTools.ts` تعریف شدهاند. با پشتیبانی `src/lib/skills/registry` + `src/lib/skills/executor`.

| ابزار                         | محدودهها         | توضیحات                                                                          |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | فهرستکردن مهارتهای ثبتشده با امکان فیلتر بر اساس کلید API، نام یا وضعیت فعالبودن |
| `omniroute_skills_enable`     | `write:skills`   | فعال یا غیرفعالکردن یک مهارت مشخص بر اساس ID                                     |
| `omniroute_skills_execute`    | `execute:skills` | اجرای یک مهارت با ورودی ارائهشده و بازگرداندن رکورد اجرا                         |
| `omniroute_skills_executions` | `read:skills`    | فهرستکردن تاریخچه اجرای اخیر مهارتها                                             |

## منبع زمینه Notion (6)

در `open-sse/mcp-server/tools/notionTools.ts` تعریف شدهاند. توکن از طریق `src/lib/db/notion.ts` در جدول `key_value` ذخیره میشود. کلاینت REST در `src/lib/notion/api.ts` قرار دارد. API تنظیمات در `src/app/api/settings/notion/route.ts` قرار دارد. رابط کاربری داشبورد در `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` قرار دارد.

توکن یکپارچهسازی Notion خود را از زبانه **منابع زمینه** در داشبورد Endpoint یا از طریق REST API پیکربندی کنید:

```bash
# تنظیم توکن
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# بررسی وضعیت
curl http://localhost:20128/api/settings/notion

# قطع اتصال
curl -X DELETE http://localhost:20128/api/settings/notion
```

| ابزار                        | محدودهها       | توضیحات                                                              |
| :--------------------------- | :------------- | :------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | جستوجوی متن کامل در تمام صفحهها و پایگاههای داده                     |
| `notion_get_page`            | `read:notion`  | دریافت یک صفحه بر اساس ID بههمراه ویژگیهای آن                        |
| `notion_list_block_children` | `read:notion`  | فهرستکردن بلوکهای فرزند یک صفحه یا بلوک                              |
| `notion_query_database`      | `read:notion`  | پرسوجوی یک پایگاه داده با فیلترها، مرتبسازیها و صفحهبندی             |
| `notion_get_database`        | `read:notion`  | دریافت شِمای پایگاه داده بر اساس ID                                  |
| `notion_append_blocks`       | `write:notion` | افزودن بلوکهای فرزند به یک بلوک والد (حداکثر 100 مورد در هر درخواست) |

## ابزارهای کاتالوگ مهارتهای عامل (3)

در `open-sse/mcp-server/tools/agentSkillTools.ts` تعریف شدهاند و توسط `src/lib/agentSkills/catalog` پشتیبانی میشوند. این ابزارها کاتالوگ مستندات 45 موردی «مهارتهای عامل» را در اختیار کلاینتهای MCP و عاملهای خارجی قرار میدهند. دامنه: `read:catalog`.

| ابزار                             | دامنهها        | توضیحات                                                                                                                                        |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | فهرستکردن هر 45 مهارت عامل با فیلترهای اختیاری `category` (api\|cli) و `area`؛ فراداده و پوشش را برمیگرداند                                    |
| `omniroute_agent_skills_get`      | `read:catalog` | دریافت فراداده کامل و محتوای SKILL.md برای یک مهارت، بر اساس `id` کانونی                                                                       |
| `omniroute_agent_skills_coverage` | `read:catalog` | آمار پوشش: تعداد مهارتهای دارای فایل SKILL.md در سیستم فایل، از میان 23 مهارت API، 21 مهارت CLI و 1 مهارت پیکربندی، در مقایسه با مجموع کاتالوگ |

برای مشاهده کاتالوگ کامل و نحوه استفاده عاملهای خارجی از آن، به [AGENT-SKILLS.md](./AGENT-SKILLS.md) مراجعه کنید.

## چارچوبهای مرتبط (v3.8.0)

موجودی ابزار MCP بالا (110 ابزار منحصربهفرد که با `countUniqueMcpTools()` محاسبه شدهاند) عمداً
به عملیات مسیریابی زمان اجرا/کش/فشردهسازی/حافظه/مهارتها/پراکسی/منبع زمینه محدود شده است. دو
چارچوب مجاور نیز همراه با سرور MCP در v3.8.0 ارائه میشوند و مستندات جداگانهای دارند:

### عاملهای ابری

عاملهای ابری، عاملهای کدنویسی هوش مصنوعی خارج از فرایند (codex-cloud، cursor-cloud، devin، jules) هستند که از طریق
همان مدل اتصال مورد استفاده برای ارائهدهندگان LLM به OmniRoute متصل شدهاند. این عاملها از طریق
سطح REST اختصاصی خود (`/api/v1/agents/*`) ارائه میشوند و بخشی از کاتالوگ ابزار MCP
**نیستند** — فراخوانی یک عامل ابری هیچ دامنه MCPای را مصرف نمیکند.

- پیادهسازی: `src/lib/cloudAgent/` (`registry.ts`، `agents/codex.ts`، `agents/cursor.ts`، `agents/devin.ts`، `agents/jules.ts`).
- چرخه حیات: `createTask`، `getStatus`، `approvePlan`، `sendMessage`، `listSources`.
- مستندات: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### گاردریلها

گاردریلها فیلترهای پیش/پس از اجرا (vision-bridge، pii-masker، prompt-injection) هستند که
درون خط لوله چت اعمال میشوند. آنها پیش از رسیدن به لایه ابزار/مسیر MCP اجرا میشوند
و تخلفهای ساختاریافته را به خط لوله ممیزی ارسال میکنند؛ آنها بهعنوان ابزارهای MCP فراخوانی نمیشوند.

- پیادهسازی: `src/lib/guardrails/`.
- مستندات: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

هنگام اشکالزدایی یک فراخوانی MCP که مسدودشده به نظر میرسد، هم گزارش ممیزی MCP
(ورودیهای `scope_denied:*`) و هم ردپای ممیزی گاردریلها را بررسی کنید — ممکن است یک درخواست توسط
یک گاردریل، **پیش از** رسیدن به لایه اعمال دامنه MCP، رد شود.

---

## نقاط پایانی REST API

| نقطه پایانی            | متد                   | توضیحات                                                                                              | احراز هویت          |
| :--------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------- | :------------------ |
| `/api/mcp/status`      | `GET`                 | وضعیت سرور: ضربان حیات، وضعیت انتقال HTTP، خلاصه فعالیت ممیزی                                        | مدیریتی (نشست/مدیر) |
| `/api/mcp/tools`       | `GET`                 | کاتالوگ ابزار (نام، توضیحات، دامنهها، مرحله، نقاط پایانی منبع)                                       | مدیریتی             |
| `/api/mcp/sse`         | `GET` / `POST`        | نقطه پایانی انتقال SSE (مشروط به `mcpEnabled` + `mcpTransport === "sse"`)                            | کلید API + دامنهها  |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | انتقال HTTP قابلجریان (از هدر `mcp-session-id` استفاده میکند؛ `DELETE` نشست را خاتمه میدهد)          | کلید API + دامنهها  |
| `/api/mcp/audit`       | `GET`                 | ورودیهای گزارش ممیزی از `mcp_tool_audit` (فیلترها: `limit`، `offset`، `tool`، `success`، `apiKeyId`) | مدیریتی             |
| `/api/mcp/audit/stats` | `GET`                 | آمار تجمیعی ممیزی (`totalCalls`، `successRate`، `avgDurationMs`، ابزارهای برتر)                      | مدیریتی             |

فایلهای منبع: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

هر دو انتقال SSE و HTTP قابلجریان تا زمانی که سرور MCP در تنظیمات (`mcpEnabled`) فعال نشده و `mcpTransport` مناسب انتخاب نشده باشد، مسدود هستند. اگر انتقال اشتباهی پیکربندی شده باشد، مسیر HTTP 400 را همراه با راهنمایی برای تغییر تنظیمات برمیگرداند.

---

## احراز هویت و محدودهها

ابزار MCP رشتههای محدوده خواندن را از تماسگیرنده میخواند. این بررسی یکی از سه فضای نام مستقل است. قبولی از یک بررسیکننده به معنای قبولی از بقیه نیست. قوانین در [سه فضای نام محدوده](#سه-فضای-نام-محدوده) آمده است. کاتالوگ ابزار در [محدودههای ابزار MCP](#محدودههای-ابزار-mcp) آمده است.

### سه فضای نام محدوده

`manage` در یک کلید API، `read:compression` در یک ابزار MCP، و `read` در یک توکن دسترسی `oma_live_…` سه مجوز متفاوت هستند. تماسگیرندگانی که یک توکن دسترسی `read` را به یک مسیر مدیریتی تغییردهنده ارسال میکنند، HTTP 403 دریافت میکنند:
`Access token scope 'read' is insufficient; 'write' required.`
این رتبه `scopeSatisfies` است. این رتبه جدول MCP را بررسی نمیکند، و تطبیقدهنده MCP نیز آن را بررسی نمیکند.

| فضای نام            | اعتبارنامه                                                                      | بررسیکننده                  | قبولی اجازه میدهد                                  |
| :------------------ | :------------------------------------------------------------------------------ | :-------------------------- | :------------------------------------------------- |
| مدیریت کلید API     | `api_keys.scopes`                                                               | `hasManageScope`            | REST مدیریتی برای آن کلید Bearer                   |
| افزودنی کلید API    | همان آرایه، یک رشته دقیق                                                        | کمکی که در زیر نام برده شده | فقط همان یک قابلیت                                 |
| محدودههای ابزار MCP | همان آرایه، در غیر این صورت MCP `_meta`، در غیر این صورت `OMNIROUTE_MCP_SCOPES` | `scopeMatches`              | آن ابزار، پس از فعال شدن اجبار                     |
| توکن دسترسی         | `oma_live_…`                                                                    | `scopeSatisfies`            | مسیر مدیریتی که متد و مسیر آن به آن رتبه نیاز دارد |

ساخت هر اعتبارنامه در [احراز هویت مدیریت](../guides/MANAGEMENT-AUTH.md) پوشش داده شده است.

#### محدودههای کلید API

یک آرایه `api_keys.scopes` دو کار را انجام میدهد. آنها از توابع متفاوتی استفاده میکنند.

**REST مدیریت.** `manage` و `admin` اعضای `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) هستند. `hasManageScope` چیزی است که مسیرهای مدیریتی را برای آن کلید مجاز میکند. `admin` در آن مسیرها قابلیت مدیریت دارد. کلمه `admin` در اینجا رتبه توکن دسترسی نیست و به محدودههای ابزار MCP گسترش نمییابد.

**رشتههای افزودنی.** هر یک یک تست عضویت دقیق است، و هر یک خارج از `MANAGEMENT_API_KEY_SCOPES` باقی میماند.

| محدوده                         | قبولی اجازه میدهد                                                                                                                                                              |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | فقط برش `/api/mcp/` LOCAL_ONLY غیر-loopback (`hasMcpConnectOrManageScope`). یک کلید با `manage` یا `admin` همچنان از آن برش عبور میکند.                                        |
| `self:usage`                   | `GET /api/v1/me/status` برای این کلید (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` این محدوده را در زمان ایجاد اضافه میکند (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | سهمیههای حساب بالادستی در داخل آن بار وضعیت (`src/lib/usage/apiKeySelfService.ts`). مسیر وضعیت همچنان به `self:usage` نیاز دارد.                                               |
| `policy:bypass-provider-quota` | فراخوانیهای استنتاج این کلید از خطمشی سهمیه ارائهدهنده صرف نظر میکنند (`hasProviderQuotaBypassScope` در `src/sse/handlers/chat.ts`).                                           |

#### تطبیق

کاتالوگ جدولی است که در زیر [محدودههای ابزار MCP](#محدودههای-ابزار-mcp) آمده است. `MCP_SCOPE_LIST` در `src/shared/constants/mcpScopes.ts` را به عنوان آن کاتالوگ در نظر نگیرید: این زیرمجموعه تایپ شده اصلی است. ابزارهای بعدی محدودههای دیگری را در کنار آن اعلام میکنند (`read:notion`, `read:skills`, `read:local-corpus`, و بقیه جدول).

`evaluateToolScopes` در `open-sse/mcp-server/scopeEnforcement.ts` زمانی که هر محدوده مورد نیاز با برخی از محدودههای اعطا شده مطابقت دارد، یک فراخوانی را مجاز میکند:

- `*` با هر محدوده مورد نیاز مطابقت دارد.
- یک محدوده اعطا شده که به `*` ختم میشود، با یک محدوده مورد نیاز که با پیشوند قبل از ستاره شروع میشود، مطابقت دارد. `read:*` با `read:compression` مطابقت دارد.
- هر محدوده اعطا شده دیگر فقط با رشته مورد نیاز یکسان مطابقت دارد.

یک کلید که محدودههای آن `["manage"]` است، برای `read:compression` در `scopeMatches` شکست میخورد. همان فراخوانی برای `admin`، `mcp:connect`، `read` و `write` زمانی که اینها تنها رشتههای اعطا شده هستند، شکست میخورد. هیچ سلسله مراتبی بین محدودههای ابزار MCP فراتر از `*` انتهایی وجود ندارد.

اجرا خاموش است مگر اینکه `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (پیشفرض `false`). در حالی که خاموش است، `evaluateToolScopes` فراخوانی را مجاز میکند و از کاتالوگ صرف نظر میکند. در حالی که روشن است، HTTP از `api_keys.scopes` کلید Bearer به عنوان `authInfo` استفاده میکند (به [اتصال محدوده HTTP به ازای هر کلید](#اتصال-محدوده-http-به-ازای-هر-کلید-7895) مراجعه کنید). هنگامی که هیچ محدوده کلیدی حل نمیشود، مجموعه اعطا شده به `_meta` MCP، سپس `OMNIROUTE_MCP_SCOPES` میرسد.

#### محدودههای توکن دسترسی

توکنهای `oma_live_…` (`src/lib/accessTokens/scopes.ts`) دارای `read`، `write` یا `admin` هستند. `scopeSatisfies` یک رتبه است: `admin` شامل `write` و `read` میشود، و `write` شامل `read` میشود. محدودههای ناشناخته هیچ چیز را پوشش نمیدهند.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) آن رتبه را با `inferRequiredScope` (`src/server/authz/accessScopes.ts`) مقایسه میکند:

- `GET`، `HEAD` و `OPTIONS` به `read` نیاز دارند.
- هر متد دیگر به `write` نیاز دارد.
- مسیرها در `ADMIN_SCOPE_PREFIXES` برای هر متد به `admin` نیاز دارند. `/api/mcp` در آن لیست است، بنابراین یک توکن دسترسی `write` همچنان نمیتواند سطح HTTP MCP را فراخوانی کند.
- مسیرها در `ADMIN_MUTATION_PREFIXES` فقط برای تغییرات به `admin` نیاز دارند.

`PATCH /api/keys/{id}` یک عملیات تغییردهنده (mutation) است و در آن لیستهای ادمین نیست، بنابراین یک توکن `read` خطای 403 دریافت میکند:
`Access token scope 'read' is insufficient; 'write' required.`
یک توکن دسترسی `write` یا `admin` برای آن مسیر کافی است. یک JWT داشبورد، توکن machine-id مربوط به CLI لوپبک، و یک کلید API با `manage` یا `admin` مسیرهای دیگری را طی میکنند و توسط این رتبه محدود نمیشوند.

یک توکن دسترسی که `scopeSatisfies` را برای `/api/mcp` با موفقیت پشت سر میگذارد، فقط از دروازه مدیریت عبور کرده است. فراخوانیهای ابزار همچنان `scopeMatches` را در برابر اسکوپهای کلید API اجرا میکنند. رتبه توکن دسترسی ورودی برای `scopeMatches` نیست.

### اسکوپهای ابزار MCP

اعمال اسکوپ در `open-sse/mcp-server/scopeEnforcement.ts` متمرکز شده است.
هر ابزار به اسکوپهای خاصی نیاز دارد:

| دامنه                | ابزارها                                                                                                                                                                        |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `خواندن:سلامت`       | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                              |
| `خواندن:ترکیبها`     | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                      |
| `نوشتن:ترکیبها`      | `switch_combo`, `set_routing_strategy`                                                                                                                                         |
| `خواندن:سهمیه`       | `check_quota`                                                                                                                                                                  |
| `خواندن:مصرف`        | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                         |
| `خواندن:مدلها`       | `list_models_catalog`                                                                                                                                                          |
| `اجرا:تکمیلها`       | `route_request`, `test_combo`                                                                                                                                                  |
| `اجرا:جستجو`         | `web_search`, `x_search`, `web_fetch`                                                                                                                                          |
| `نوشتن:بودجه`        | `set_budget_guard`                                                                                                                                                             |
| `نوشتن:تابآوری`      | `set_resilience_profile`, `db_health_check`                                                                                                                                    |
| `قیمتگذاری:نوشتن`    | `sync_pricing`                                                                                                                                                                 |
| `خواندن:کش`          | `cache_stats`                                                                                                                                                                  |
| `نوشتن:کش`           | `cache_flush`                                                                                                                                                                  |
| `خواندن:فشردهسازی`   | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                     |
| `نوشتن:فشردهسازی`    | `compression_configure`, `set_compression_engine`                                                                                                                              |
| `خواندن:پراکسیها`    | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                          |
| `خواندن:نوشن`        | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                               |
| `نوشتن:نوشن`         | `notion_append_blocks`                                                                                                                                                         |
| `خواندن:حافظه`       | `memory_search`                                                                                                                                                                |
| `نوشتن:حافظه`        | `memory_add`, `memory_clear`                                                                                                                                                   |
| `خواندن:مهارتها`     | `skills_list`, `skills_executions`                                                                                                                                             |
| `نوشتن:مهارتها`      | `skills_enable`                                                                                                                                                                |
| `اجرا:مهارتها`       | `skills_execute`                                                                                                                                                               |
| `خواندن:کاتالوگ`     | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                               |
| `خواندن:ابزارها`     | `omniroute_tool_search`                                                                                                                                                        |
| `خواندن:رادار`       | `omniroute_radar_catalog`                                                                                                                                                      |
| `خواندن:بازیسازی`    | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                               |
| `write:gamification` | `gamification_invite`, `gamification_transfer`                                                                                                                                 |
| `read:plugins`       | `plugin_list`, `plugin_executions`                                                                                                                                             |
| `write:plugins`      | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                |
| `read:obsidian`      | 13 ابزار خواندن — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`     | 9 ابزار نوشتن — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`  | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                              |

اسکوپهای وایلدکارد پشتیبانی میشوند: `read:*` تمام اسکوپهای خواندن را اعطا میکند، `*` دسترسی کامل را اعطا میکند.

### `mcp:connect` — قابلیت مسیر محدود (#7895)

دسترسی به انتقال HTTP/SSE MCP (`/api/mcp/*`) از خارج از لوپبک (non-loopback) نیازمند استثنای `LOCAL_ONLY` برای `/api/mcp/` است (به `docs/security/ROUTE_GUARD_TIERS.md` مراجعه کنید). از لحاظ تاریخی، این استثنا فقط یک کلید API با اسکوپ کامل `manage`/`admin` را میپذیرفت — که برای یک تماسگیرنده که فقط نیاز به ارتباط با MCP دارد، بیش از حد گسترده بود. `src/shared/constants/managementScopes.ts` اکنون `MCP_CONNECT_SCOPE = "mcp:connect"` را صادر میکند: یک اسکوپ افزایشی و محدود (با همان سابقه `SELF_USAGE_SCOPE`) که فقط دور زدن `/api/mcp/` را در `src/server/authz/policies/management.ts` مجاز میسازد — این اسکوپ هیچ دسترسی دیگری به مسیرهای مدیریتی نمیدهد و عمداً از `MANAGEMENT_API_KEY_SCOPES` خارج نگه داشته شده است. یک کلید دارای `manage`/`admin` همچنان بدون تغییر از این استثنا عبور میکند؛ `mcp:connect` یک جایگزین با امتیاز کمتر برای تماسگیرندگان از راه دور که فقط به MCP نیاز دارند، است که از طریق `hasMcpConnectOrManageScope()` بررسی میشود.

### اتصال اسکوپ HTTP به ازای هر کلید (#7895)

از طریق HTTP/SSE، `open-sse/mcp-server/httpTransport.ts` اکنون `api_keys.scopes` واقعی تماسگیرنده را از طریق `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) حل میکند و آن را به `transport.handleRequest(req, { authInfo })` در MCP SDK ارسال میکند، بنابراین `extra.authInfo.scopes` که به هر فراخوانی ابزار میرسد، اسکوپهای خود کلید Bearer را منعکس میکند. `resolveCallerScopeContext()` در `scopeEnforcement.ts` قبلاً `authInfo` را بر `_meta` و بازگشت به متغیر محیطی `OMNIROUTE_MCP_SCOPES` اولویت داده بود — این تغییر فقط آن منبع اول و با بالاترین اولویت را پر میکند، که قبلاً از طریق HTTP تغذیه نمیشد. هنگامی که هیچ کلید API حل نمیشود (بدون هدر، کلید نامعتبر)، `authInfo` به صورت `undefined` باقی میماند و حل و فصل بدون تغییر به زنجیره `meta`/env موجود منتقل میشود. این تغییر پیشفرض `OMNIROUTE_MCP_ENFORCE_SCOPES` را برعکس نمیکند — اعمال همچنان باید به صراحت فعال شود؛ این تغییر فقط باعث میشود که مسیر به ازای هر کلید، پس از فعال شدن، اولویت پیدا کند. stdio هویت به ازای هر تماسگیرنده ندارد (به `mcpCallerIdentity.ts` مراجعه کنید) و تحت تأثیر قرار نمیگیرد — و در زنجیره بازگشت `_meta`/env باقی میماند.

---

## متغیرهای محیطی

| متغیر                                   | مقدار پیشفرض                            | هدف                                                                                                                               |
| :-------------------------------------- | :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                | URL پایهای که سرور MCP هنگام فراخوانی APIهای داخلی OmniRoute استفاده میکند                                                        |
| `OMNIROUTE_API_KEY`                     | (خالی)                                  | کلید API که بهصورت `Authorization: Bearer` به فراخوانیهای API داخلی ارسال میشود                                                   |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (فقط `"true"` آن را فعال میکند) | در صورت فعالبودن، نبود scopeهای لازم باعث رد فراخوانی ابزار و ثبت `scope_denied:<reason>` در گزارش ممیزی میشود                    |
| `OMNIROUTE_MCP_SCOPES`                  | (خالی)                                  | فهرست مجاز scopeها با جداکننده ویرگول که بهطور پیشفرض «در دسترس» در نظر گرفته میشوند (وقتی فراخواننده scopeهای خود را ارائه نکند) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (تنظیمنشده = روشن)                      | اگر روی `0/false/off/no` تنظیم شود، فشردهسازی توضیحات MCP را هنگام ثبت غیرفعال میکند                                              |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (تنظیمنشده = روشن)                      | نام مستعار جایگزین برای همان گزینه بالا                                                                                           |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                 | مهلت لغو برای خواندنهای مدیریتی داخلی (سلامت، تابآوری، ترکیبها، سهمیه و میزان استفاده)                                            |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                 | مهلت لغو برای گامهایی که منتظر یک ارائهدهنده میمانند (`route_request`، `web_search`، `web_fetch`)                                 |
| `MCP_TOOL_DENY`                         | (تنظیمنشده = بدون فیلتر)                | نام ابزارها با جداکننده ویرگول برای حذف از `tools/list` (کاهش تعداد ابزارها — پایین را ببینید)                                    |
| `MCP_TOOL_ALLOW`                        | (تنظیمنشده = بدون فیلتر)                | نام ابزارها با جداکننده ویرگول که باید منحصراً نگه داشته شوند (حالت فهرست مجاز — پایین را ببینید)                                 |
| `DATA_DIR`                              | `~/.omniroute`                          | فایل ضربان حیات در `${DATA_DIR}/runtime/mcp-heartbeat.json` نوشته میشود                                                           |

---

## فشردهسازی توضیحات

رجیستریهای ابزار، پرامپت و منبع MCP میتوانند توضیحات را هنگام ثبت/فهرستکردن فشرده کنند تا حجم فرادادهای که در اختیار کلاینتها قرار میگیرد (و در نتیجه هزینه زمینه پرامپت) کاهش یابد. پیادهسازی در `open-sse/mcp-server/descriptionCompressor.ts` قرار دارد و از طریق `compressMcpRegistryMetadata` درون `createMcpServer()` به سرور MCP متصل شده است.

- فشردهسازی با استفاده از مجموعهقواعد Caveman (`getRulesForContext("all", "full")`) و استخراج بلوکهای محافظتشده (قطعهکدهای درونخطی، بلوکهای محصورشده و غیره) روی متن توضیحات اجرا میشود تا محتوای ساختاری تغییر نکند.
- برای هر استقرار، از طریق مقدار `compression.mcpDescriptionCompressionEnabled` در جدول تنظیمات `key_value` آن را تغییر دهید (پیشفرض: فعال) — این گزینه در رابط کاربری با عنوان **تحلیلها → فشردهسازی توضیحات MCP** ارائه میشود.
- در سطح کل فرایند، از طریق `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` یا `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` آن را تغییر دهید.
- آمار بلادرنگ از طریق `omniroute_compression_status` در مسیر `analytics.mcpDescriptionCompression` ارائه میشود و با `source: "mcp_metadata_estimate"` برچسبگذاری میشود تا از رسیدهای واقعی استفاده از ارائهدهنده متمایز باشد.

---

## کاهش تعداد ابزارها (F4.3)

فشردهسازی توضیحات، فرادادههای هر ابزار را کوچکتر میکند؛ **کاهش تعداد ابزارها** یک گام فراتر میرود و تعداد ابزارهایی را که اساساً اعلام میشوند کاهش میدهد. معرفی ابزارهای کمتر در مانیفست `tools/list`، هزینهٔ توکن هر درخواست را که مدل کلاینت بابت فهرست ابزارها میپردازد کاهش میدهد (فشردهسازی «لایهٔ ۵»). پیادهسازی آن یک فیلتر خالص و بدون حالت در `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) است که در حلقهٔ ثبت در `createMcpServer()` (`open-sse/mcp-server/server.ts`) ادغام شده است.

**اختیاری و بهطور پیشفرض غیرفعال است.** این فیلتر تنها زمانی اجرا میشود که دستکم یکی از دو متغیر محیطی تنظیم شده باشد؛ اگر هیچکدام تنظیم نشده باشند، هر ۱۱۰ ابزار بدون تغییر اعلام میشوند.

| متغیر            | حالت                                                                                         |
| :--------------- | :------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | فهرست سیاه — نام ابزارهایی با جداکنندهٔ ویرگول که همیشه از `tools/list` حذف میشوند           |
| `MCP_TOOL_ALLOW` | فهرست مجاز — نام ابزارهایی با جداکنندهٔ ویرگول؛ فقط این موارد باقی میمانند و بقیه حذف میشوند |

`deny` بر `allow` اولویت دارد. نامها با ویرگول جدا میشوند، فاصلههای ابتدا و انتهایشان حذف میشود و ورودیهای خالی نادیده گرفته میشوند. مثالها:

```bash
# دو ابزار را از فهرست ابزارها حذف کنید
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# فقط ابزارهای مسیریابی و سهمیه را اعلام کنید (حالت فهرست مجاز)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**نحوهٔ حذف ابزارهای فیلترشده:** ثبت همیشه با موفقیت انجام میشود؛ سپس ابزاری که پروفایل رد میکند، روی هندل MCP SDK با `.disable()` غیرفعال میشود؛ بنابراین هرگز در `tools/list` ظاهر نمیشود، اما اتصال داخلی آن دستنخورده باقی میماند (فعالسازی/غیرفعالسازی تمیز، بدون ثبت مجدد). تجزیهگر پروفایل `readMcpToolProfileFromEnv(process.env)` است که وقتی هر دو متغیر خالی باشند، `null` (بدون فیلتر) برمیگرداند.

ساختار غنیتر `ToolProfile` در پسِ `reduceToolManifest` همچنین از فیلترکردن بر اساس اشتراک دامنهها (`allowScopes`، با تطبیق نویسهٔ عام به سبک `read:*`) و یک سقف قطعی `maxTools` پشتیبانی میکند، اما این دو گزینه هنگام ثبت به مانیفست کامل نیاز دارند و در حال حاضر از طریق متغیرهای محیطی ارائه **نمیشوند** (یک هوک در سطح `tools/list` بهعنوان پیگیری بعدی ثبت شده است). تابع `estimateManifestTokens()` برای مقایسهٔ هزینهٔ توکن مانیفست پیش و پس از کاهش در دسترس است.

---

## ضربان حیات زمان اجرا

انتقال stdio هر ۵ ثانیه وضعیت فعالبودن را در `${DATA_DIR}/runtime/mcp-heartbeat.json` ذخیره میکند. داشبورد (`/api/mcp/status`) این فایل را همراه با وضعیت فعالبودن PID میخواند تا مقدار `online` را تعیین کند. در عوض، انتقالهای HTTP وضعیت را از `getMcpHttpStatus()` درونپردازهای گزارش میکنند (بدون نوشتن فایل).

تصویر لحظهای ضربان حیات شامل موارد زیر است:

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

## ثبت گزارش ممیزی

هر فراخوانی ابزار توسط `open-sse/mcp-server/audit.ts` در جدول SQLite با نام `mcp_tool_audit` ثبت میشود:

- نام ابزار، آرگومانها (مطابق `auditLevel` مختص هر ابزار بهصورت هششده/کوتاهشده)، نتیجه
- مدتزمان بر حسب میلیثانیه، پرچم موفقیت/شکست، پیام خطا (در صورت وجود)
- هش کلید API، برچسب زمانی
- ردشدن دامنهها با قالب `scope_denied:<reason>` همراه با فهرست دامنههای موجود ثبت میشود

برای بررسی فراخوانیهای اخیر، از داشبورد یا نقاط پایانی REST به نشانیهای `/api/mcp/audit` و `/api/mcp/audit/stats` استفاده کنید.

---

## فایلها

| فایل                                                                     | هدف                                                                      |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | کارخانهٔ سرور MCP، نقطهٔ ورود stdio، ثبت ابزارهای محدودشده بر اساس دامنه |
| `open-sse/mcp-server/httpTransport.ts`                                   | انتقال SSE و HTTP قابلجریان (مدیریت نشست)                                |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ارزیابی دامنهٔ ابزار و تشخیص فراخواننده                                  |
| `open-sse/mcp-server/audit.ts`                                           | ثبت گزارش ممیزی فراخوانی ابزار (`mcp_tool_audit`)                        |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | نویسندهٔ ضربان حیات stdio (`mcp-heartbeat.json`)                         |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | فشردهسازی توضیحات برای رجیستریهای ابزار، پرامپت و منبع                   |
| `open-sse/mcp-server/schemas/tools.ts`                                   | طرحوارههای Zod و رجیستری ابزار (`MCP_TOOLS`، ۴۵ ورودی)                   |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | کنترلکنندههای ابزارهای فاز ۲، کش و 1proxy                                |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | کنترلکنندههای ابزار فشردهسازی                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | تعاریف ابزارهای حافظه (۳ ابزار)                                          |
| `open-sse/mcp-server/tools/skillTools.ts`                                | تعاریف ابزارهای مهارت (۴ ابزار)                                          |
| `open-sse/mcp-server/tools/notionTools.ts`                               | تعاریف ابزارهای منبع زمینهٔ Notion (۶ ابزار)                             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | تعاریف ابزارهای بازیوارسازی (۸ ابزار)                                    |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | ابزارهای ثبت و مدیریت افزونه (۸ ابزار)                                   |
| `src/app/api/mcp/status/route.ts`                                        | نقطهٔ پایانی `/api/mcp/status`                                           |
| `src/app/api/mcp/tools/route.ts`                                         | نقطهٔ پایانی `/api/mcp/tools`                                            |
| `src/app/api/mcp/sse/route.ts`                                           | مسیر انتقال SSE در `/api/mcp/sse`                                        |
| `src/app/api/mcp/stream/route.ts`                                        | مسیر انتقال HTTP قابلجریان در `/api/mcp/stream`                          |
| `src/app/api/mcp/audit/route.ts`                                         | پرسوجوی گزارش ممیزی `/api/mcp/audit`                                     |
| `src/app/api/mcp/audit/stats/route.ts`                                   | معیارهای تجمیعشدهٔ ممیزی `/api/mcp/audit/stats`                          |
| `src/lib/notion/api.ts`                                                  | کلاینت REST API مربوط به Notion (تلاش مجدد، مهلت زمانی، طبقهبندی خطا)    |
| `src/lib/db/notion.ts`                                                   | ماندگارسازی توکن Notion (جدول `key_value`)                               |
| `src/app/api/settings/notion/route.ts`                                   | API تنظیمات Notion‏ (GET/POST/DELETE)                                    |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | رابط کاربری مدیریت توکن Notion                                           |
| `tests/unit/notion-api.test.ts`                                          | آزمونهای کلاینت API مربوط به Notion‏ (۷)                                 |
| `tests/unit/notion-tools.test.ts`                                        | آزمونهای اعمال دامنه برای ابزارهای Notion‏ (۱۰)                          |
| `tests/unit/db/notion.test.mjs`                                          | آزمونهای ماژول پایگاه دادهٔ Notion‏ (۳)                                  |
