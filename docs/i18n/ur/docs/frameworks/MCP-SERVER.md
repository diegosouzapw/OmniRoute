# OmniRoute MCP Server Documentation (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> روٹنگ، کیش، کمپریشن، میموری، اسکلز، پراکسی، پول، Radar، اور کانٹیکسٹ سورس آپریشنز پر مشتمل 110 ٹولز والا Model Context Protocol سرور۔
>
> مستند ماخذ: `open-sse/mcp-server/server.ts`، `countUniqueMcpTools()` کے ذریعے **110 منفرد ٹولز** شمار کرتا ہے: 45 کینونیکل تعریفیں (جن میں چھ CCR لائف سائیکل ٹولز، agent-skills کی تین ٹولز پر مشتمل جوڑی، `omniroute_radar_catalog`، اور `omniroute_x_search` شامل ہیں)، نیز میموری (3)، اسکلز (4)، GitHub اسکلز (3)، پول (6)، گیمیفیکیشن (8)، پلگ انز (8)، Notion (6)، Obsidian (22)، لوکل کارپس (3)، اور صرف RTK کے لیے دو کمپریشن ٹولز۔

## تنصیب

OmniRoute MCP پہلے سے شامل ہے۔ اسے یوں شروع کریں:

```bash
omniroute --mcp
```

یا open-sse ٹرانسپورٹ کے ذریعے:

```bash
# HTTP اسٹریمیبل ٹرانسپورٹ (پورٹ 20130)
omniroute --dev  # MCP، /mcp اینڈ پوائنٹ پر خودکار طور پر شروع ہو جاتا ہے
```

HTTP ٹرانسپورٹس (`sse` / `streamable-http`، جو ڈیش بورڈ سرور کے ذریعے اسی پراسیس میں فراہم کیے جاتے ہیں)
بطور ڈیفالٹ بند ہوتے ہیں اور اس سے پہلے صرف `/dashboard/mcp` صفحے سے ٹوگل کیے جا سکتے تھے۔ v3.8.51 سے
CLI میں بھی یکساں سہولت موجود ہے:

```bash
omniroute mcp status                                  # فعال/آن لائن، ٹرانسپورٹ، ٹولز کی تعداد
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # فعال sse/streamable-http سیشنز کو ری سیٹ کرتا ہے
```

`mcp enable`/`mcp disable` اسی `mcpEnabled` (اور اختیاری طور پر `mcpTransport`) سیٹنگ کو PATCH کرتے ہیں
جسے ڈیش بورڈ `/api/settings` کے ذریعے ٹوگل کرتا ہے۔ `mcp restart`، `POST /api/mcp/restart` کو کال کرتا ہے: یہ
فعال `sse`/`streamable-http` سیشنز ختم کر دیتا ہے تاکہ اگلی درخواست نئے سرے سے درست طور پر شروع ہو، MCP غیر فعال
ہونے پر `409`، اور `stdio` ٹرانسپورٹ کے لیے `501` واپس کرتا ہے (stdio کلائنٹس اپنے ذیلی پراسیس کے خود مالک ہوتے ہیں —
دوبارہ شروع کرنے کے لیے پراسیس کے اندر کوئی ہینڈل موجود نہیں ہوتا)۔

## ٹرانسپورٹس

MCP سرور تین ٹرانسپورٹس فراہم کرتا ہے، اور سبھی کو ایک ہی `createMcpServer()` فیکٹری کی پشت پناہی حاصل ہے:

| ٹرانسپورٹ         | مقام                                           | کب استعمال کریں                                  |
| :---------------- | :--------------------------------------------- | :----------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE انٹیگریشنز (Claude Desktop، Cursor، وغیرہ)   |
| `sse`             | `POST/GET /api/mcp/sse` بذریعہ `httpTransport` | براؤزر/ایجنٹ کلائنٹس جنہیں ایونٹ اسٹریم درکار ہو |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | کثیر سیشن HTTP کلائنٹس (`mcp-session-id` ہیڈر)   |

فعال HTTP ٹرانسپورٹ (`sse` یا `streamable-http`) کا انتخاب `mcpTransport` سیٹنگ کے ذریعے کیا جاتا ہے۔ ٹرانسپورٹ تبدیل کرنے سے دوسرے ٹرانسپورٹ پر موجود سیشنز بند ہو جاتے ہیں۔

### ریموٹ رسائی (manage اسکوپ بائی پاس)

`/api/mcp/*`، LOCAL_ONLY درجے (`src/server/authz/routeGuard.ts`) میں شامل ہے — بطور ڈیفالٹ صرف لوپ بیک ہوسٹس (`localhost`، `127.0.0.1`، `::1`) ہی اس تک رسائی حاصل کر سکتے ہیں۔ v3.8.2 سے، نان لوپ بیک کلائنٹس اس صورت میں منسلک ہو سکتے ہیں جب وہ ایسا `Authorization: Bearer <api-key>` پیش کریں جس کی کلید میں `manage` اسکوپ موجود ہو۔ ٹنل، ریورس پراکسی، یا عوامی ہوسٹ نیم کے ذریعے ریموٹ MCP سرور تک رسائی کا یہی واحد طریقہ ہے۔

```bash
# manage اسکوپ عطا کریں: ڈیش بورڈ میں API Keys صفحہ کھولیں اور کلید پر
# "Management Access" کو ٹوگل کریں، یا تخلیق کرتے وقت POST scopes:["manage"] استعمال کریں۔

# پھر کسی ریموٹ MCP کلائنٹ سے منسلک ہوں:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

غیر `manage` کلید (یا Bearer کے بغیر) `403 LOCAL_ONLY` واپس کرتی ہے۔ متوازی پریفکس `/api/cli-tools/runtime/*` کو دانستہ طور پر بائی پاس نہیں کیا جا سکتا — دیکھیے [روٹ گارڈ کے درجات — manage اسکوپ کے لیے استثنا](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)۔

## IDE کنفیگریشن

Claude Desktop، Cursor، Cline، اور ہم آہنگ MCP کلائنٹس کے سیٹ اپ کے لیے [MCP کلائنٹ کنفیگریشن](../guides/SETUP_GUIDE.md#mcp-client-configuration) دیکھیں۔

---

## بنیادی ٹولز (14) — مرحلہ 1

| ٹول                             | اسکوپس                | تفصیل                                                                                                                                      |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | اپ ٹائم، میموری، سرکٹ بریکرز، ریٹ لمٹس، کیش کے اعداد و شمار                                                                                |
| `omniroute_list_combos`         | `read:combos`         | حکمتِ عملیوں کے ساتھ تمام کنفیگر شدہ کومبوز (اختیاری میٹرکس)                                                                               |
| `omniroute_get_combo_metrics`   | `read:combos`         | کسی مخصوص کومبو کے لیے کارکردگی کے میٹرکس                                                                                                  |
| `omniroute_switch_combo`        | `write:combos`        | کسی کومبو کو فعال یا غیر فعال کریں                                                                                                         |
| `omniroute_create_combo`        | `write:combos`        | موجودہ کومبو API کے ذریعے ایک توثیق شدہ کومبو بنائیں                                                                                       |
| `omniroute_check_quota`         | `read:quota`          | استعمال شدہ/کل کوٹہ، باقی فیصد، ری سیٹ کا وقت، ٹوکن کی صحت                                                                                 |
| `omniroute_route_request`       | `execute:completions` | OmniRoute روٹنگ کے ذریعے چیٹ کی تکمیل کی درخواست بھیجیں                                                                                    |
| `omniroute_cost_report`         | `read:usage`          | مدت کے لحاظ سے لاگت کی رپورٹ (سیشن/دن/ہفتہ/مہینہ)                                                                                          |
| `omniroute_list_models_catalog` | `read:models`         | صلاحیتوں، حیثیت اور قیمتوں سمیت ماڈلز کا مکمل کیٹلاگ                                                                                       |
| `omniroute_radar_catalog`       | `read:radar`          | مقامی دستخط شدہ Radar کیٹلاگ؛ اختیاری پرووائیڈر/فیملی فلٹرز                                                                                |
| `omniroute_tool_search`         | `read:tools`          | رجسٹرڈ MCP کیٹلاگ سے ٹولز دریافت کریں                                                                                                      |
| `omniroute_web_search`          | `execute:search`      | کنفیگر شدہ سرچ پرووائیڈرز کے ذریعے ویب سرچ۔ X/Twitter نہیں۔                                                                                |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok کے ذریعے X پر تلاش کریں، یا Xquik API کے نتائج کے لیے `xquik-search` منتخب کریں۔ منتخب کردہ بیک اینڈ کے لیے اسناد درکار ہیں۔ |
| `omniroute_web_fetch`           | `execute:search`      | کنفیگر شدہ فیچ پرووائیڈرز کے ذریعے ویب مواد حاصل کریں                                                                                      |

## جدید ٹولز (11) — مرحلہ 2

| ٹول                                | اسکوپس                               | تفصیل                                                                                       |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | فال بیک ٹری کے ساتھ راؤٹنگ کی ڈرائی رَن سیمولیشن                                            |
| `omniroute_set_budget_guard`       | `write:budget`                       | ڈی گریڈ/بلاک/الرٹ ایکشن کے ساتھ سیشن بجٹ                                                    |
| `omniroute_set_routing_strategy`   | `write:combos`                       | رن ٹائم پر کومبو حکمتِ عملی اپ ڈیٹ کریں (ترجیحی/وزنی/خودکار/وغیرہ)                          |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` ریزیلینس پری سیٹ لاگو کریں                       |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | حقیقی اپ اسٹریم کال استعمال کرتے ہوئے کومبو میں شامل ہر پرووائیڈر کا لائیو ٹیسٹ             |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 لیٹنسی اور سرکٹ بریکر اسٹیٹ سمیت فی پرووائیڈر میٹرکس                            |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | بجٹ/لیٹنسی کی پابندیوں کے ساتھ ٹاسک کی قسم کے لحاظ سے کومبو تجویز کریں                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | وضاحت کریں کہ درخواست کسی پرووائیڈر کو کیوں روٹ کی گئی (اسکورنگ عوامل + فال بیکس)           |
| `omniroute_get_session_snapshot`   | `read:usage`                         | مکمل سیشن اسنیپ شاٹ: لاگت، ٹوکنز، سرفہرست ماڈلز/پرووائیڈرز، خرابیاں، بجٹ گارڈ               |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | ٹوٹے ہوئے کومبو حوالوں / یتیم قطاروں جیسے ڈیٹابیس انحراف کی تشخیص (اور اختیاری خودکار مرمت) |
| `omniroute_sync_pricing`           | `pricing:write`                      | بیرونی ذرائع (LiteLLM) سے قیمتوں کا ڈیٹا ہم وقت کریں؛ `dryRun` معاون ہے                     |

## کیش ٹولز (2)

| ٹول                     | اسکوپس        | تفصیل                                                     |
| :---------------------- | :------------ | :-------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | سیمینٹک کیش، پرامپٹ کیش، اور آئیڈیم پوٹینسی کے اعدادوشمار |
| `omniroute_cache_flush` | `write:cache` | کیش کو عالمی سطح پر یا سگنیچر/ماڈل کے لحاظ سے خالی کریں   |

## کمپریشن ٹولز (13)

| ٹول                                 | اسکوپس              | تفصیل                                                                                                                 |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | کمپریشن سیٹنگز، اینالیٹکس کا خلاصہ، اور کیش سے آگاہ اعدادوشمار (`analytics.mcpDescriptionCompression` میٹا ڈیٹا سمیت) |
| `omniroute_compression_configure`   | `write:compression` | کمپریشن موڈ، تھریش ہولڈ، ہدفی تناسب، سسٹم پرامپٹ کا تحفظ، اور MCP وضاحت کی کمپریشن ٹوگل ترتیب دیں                     |
| `omniroute_set_compression_engine`  | `write:compression` | فعال انجن (off/caveman/rtk/stacked) اور Caveman/RTK شدت منتخب کریں                                                    |
| `omniroute_list_compression_combos` | `read:compression`  | نامزد کمپریشن کومبوز اور ان کی انجن پائپ لائنز کی فہرست بنائیں                                                        |
| `omniroute_compression_combo_stats` | `read:compression`  | کمپریشن کومبو اور انجن کے لحاظ سے گروپ کردہ اینالیٹکس                                                                 |
| `omniroute_ccr_store`               | `write:compression` | کالر سے الگ تھلگ مواد کو محدود اِن میموری CCR اسٹور میں محفوظ کریں اور مارکر کے ساتھ `ccr://` حوالہ واپس کریں         |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR مواد مکمل طور پر یا ہیڈ، ٹیل، لائنز، grep، اور اعدادوشمار کے موڈز کے ساتھ بازیافت کریں                            |
| `omniroute_ccr_inspect`             | `read:compression`  | مواد واپس کیے بغیر کالر کی ملکیت والے CCR میٹا ڈیٹا کا معائنہ کریں                                                    |
| `omniroute_ccr_list`                | `read:compression`  | کالر کی ملکیت والے CCR بلاکس کے صفحہ بند میٹا ڈیٹا کی فہرست بنائیں                                                    |
| `omniroute_ccr_delete`              | `write:compression` | کالر کی ملکیت والا CCR بلاک حذف کریں                                                                                  |
| `omniroute_ccr_stats`               | `read:compression`  | کالر کے دائرۂ کار میں میموری کا استعمال، لائف سائیکل کاؤنٹرز، اور اسٹور کی حدود رپورٹ کریں                            |
| `omniroute_rtk_discover`            | `read:compression`  | رضاکارانہ RTK آؤٹ پٹ نمونوں میں بار بار آنے والا شور دریافت کریں                                                      |
| `omniroute_rtk_learn`               | `read:compression`  | رضاکارانہ نمونوں سے قابلِ جائزہ RTK فلٹر ڈرافٹ تیار کریں                                                              |

CCR اندراجات صرف اِن میموری ہوتے ہیں اور ری اسٹارٹ ہونے پر غائب ہو جاتے ہیں۔ ہر بلاک کی حد 2 MiB، ہر
پرنسپل کی حد 16 MiB، اور عالمی اسٹور کی حد 64 MiB ہے۔ اندراجات کی ڈیفالٹ TTL 24 گھنٹے ہے (زیادہ سے زیادہ
سات دن)۔ مکمل MCP بازیافت 256 KiB تک محدود ہے؛ بڑے بلاکس رینجڈ اور grep
موڈز کے ذریعے دستیاب رہتے ہیں۔ اسٹوریج، بازیافت، فہرست سازی، معائنہ، حذف کرنا، اور اعدادوشمار
تصدیق شدہ API-key پرنسپل کے لحاظ سے الگ تھلگ ہیں۔ آڈٹ ریکارڈز میں ہیشز اور سائز کا میٹا ڈیٹا ہوتا ہے، مواد کبھی نہیں۔

`omniroute_compression_status`، MCP تفصیل کی کمپریشن کو علیحدہ طور پر
`analytics.mcpDescriptionCompression` کے تحت رپورٹ کرتا ہے۔ یہ قدریں MCP میں فہرست کے قابل
تفصیلات (`tools`، `prompts`، `resources`، اور `resourceTemplates`) کے میٹا ڈیٹا سائز کے تخمینے ہیں؛ یہ فراہم کنندہ کے استعمال
کی رسیدیں نہیں ہیں اور انہیں `source: "mcp_metadata_estimate"` کے ساتھ نشان زد کیا جاتا ہے۔

### MCP ایکسیسبیلٹی ٹری فلٹر (v3.8.0)

اوپر دیے گئے کمپریشن ٹولز سے علیحدہ، OmniRoute میں اجرا کے بعد چلنے والا ایک فلٹر شامل ہے جو
MCP براؤزر/ایکسیسبیلٹی ٹولز کے **ٹول نتائج** کو ایجنٹ کو واپس کیے جانے سے پہلے
کمپریس کرتا ہے۔ یہ فلٹر بذاتِ خود کوئی ٹول نہیں ہے — یہ ایسے کسی بھی ٹول نتیجے پر شفاف طور پر چلتا ہے جس میں
تفصیلی ایکسیسبیلٹی ٹری یا براؤزر اسنیپ شاٹ متن (≥2000 حروف) موجود ہو۔

اہم رویے:

- ≥30 مسلسل دہرائی جانے والی ہم سطح سطروں کو ابتدائی + اختتامی خلاصے میں سمیٹتا ہے
- Playwright/کمپیوٹر استعمال کے لیے درکار `[ref=eXX]` اینکرز محفوظ رکھتا ہے
- حد سے زیادہ بڑے متن (>50,000 حروف) کو نیویگیشن کے اشارے کے ساتھ سختی سے مختصر کرتا ہے
- متوقع بچت: براؤزر اسنیپ شاٹ پے لوڈز پر **60–80%**

کنفیگریشن: عالمی ترتیبات میں `compression.mcpAccessibility` (مائیگریشن 056)۔
نفاذ: `open-sse/services/compression/engines/mcpAccessibility/`۔
مکمل دستاویزات: [کمپریشن انجنز — MCP ایکسیسبیلٹی ٹری فلٹر](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)۔

ان ٹولز کے پس منظر میں موجود رن ٹائم کمپریشن ماڈل کے لیے [کمپریشن انجنز](../compression/COMPRESSION_ENGINES.md) اور [RTK کمپریشن](../compression/RTK_COMPRESSION.md) دیکھیں۔

## 1Proxy ٹولز (3)

| ٹول                         | اسکوپس         | تفصیل                                                                                  |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy مارکیٹ پلیس سے مفت پراکسیاں حاصل کریں (پروٹوکول/ملک/معیار/حد کے فلٹرز)          |
| `omniroute_oneproxy_rotate` | `read:proxies` | حکمتِ عملی کے مطابق اگلی دستیاب پراکسی حاصل کریں (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | پول کے اعدادوشمار، مطابقت پذیری کی حالت، اور پروٹوکول و ملک کے لحاظ سے تقسیم           |

## میموری ٹولز (3)

`open-sse/mcp-server/tools/memoryTools.ts` میں متعین ہیں۔ تصدیق/اسکوپ کا نفاذ معیاری MCP اسکوپ پائپ لائن کے ذریعے کیا جاتا ہے۔

| ٹول                       | اسکوپس         | تفصیل                                                                                               |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | ٹوکن بجٹ کے نفاذ کے ساتھ استفسار / قسم / API کلید کے لحاظ سے میموریز تلاش کریں                      |
| `omniroute_memory_add`    | `write:memory` | ایک نئی میموری اندراج شامل کریں (`factual` / `episodic` / `procedural` / `semantic`)                |
| `omniroute_memory_clear`  | `write:memory` | کسی API کلید کی میموریز صاف کریں، اختیاری طور پر قسم یا `olderThan` ٹائم اسٹیمپ کے لحاظ سے فلٹر شدہ |

## اسکل ٹولز (4)

`open-sse/mcp-server/tools/skillTools.ts` میں متعین ہیں۔ `src/lib/skills/registry` + `src/lib/skills/executor` سے تقویت یافتہ ہیں۔

| ٹول                           | اسکوپس           | تفصیل                                                                                   |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API کلید، نام، یا فعال حالت کے لحاظ سے اختیاری فلٹرنگ کے ساتھ رجسٹرڈ اسکلز کی فہرست دیں |
| `omniroute_skills_enable`     | `write:skills`   | ID کے ذریعے کسی مخصوص اسکل کو فعال یا غیر فعال کریں                                     |
| `omniroute_skills_execute`    | `execute:skills` | فراہم کردہ ان پٹ کے ساتھ اسکل چلائیں اور عمل درآمد کا ریکارڈ واپس کریں                  |
| `omniroute_skills_executions` | `read:skills`    | اسکل کے حالیہ عمل درآمد کی تاریخ کی فہرست دیں                                           |

## Notion سیاق و سباق کا ماخذ (6)

`open-sse/mcp-server/tools/notionTools.ts` میں متعین ہیں۔ ٹوکن `src/lib/db/notion.ts` کے ذریعے `key_value` ٹیبل میں محفوظ ہوتا ہے۔ REST کلائنٹ `src/lib/notion/api.ts` میں ہے۔ ترتیبات کی API `src/app/api/settings/notion/route.ts` میں ہے۔ ڈیش بورڈ UI `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` میں ہے۔

اپنا Notion انٹیگریشن ٹوکن Endpoint ڈیش بورڈ میں **سیاق و سباق کے ذرائع** ٹیب سے، یا REST API کے ذریعے کنفیگر کریں:

```bash
# ٹوکن سیٹ کریں
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# حالت چیک کریں
curl http://localhost:20128/api/settings/notion

# منقطع کریں
curl -X DELETE http://localhost:20128/api/settings/notion
```

| ٹول                          | اسکوپس         | تفصیل                                                                   |
| :--------------------------- | :------------- | :---------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | تمام صفحات اور ڈیٹابیسز میں مکمل متن تلاش کریں                          |
| `notion_get_page`            | `read:notion`  | کسی صفحے کو اس کی خصوصیات سمیت ID کے ذریعے حاصل کریں                    |
| `notion_list_block_children` | `read:notion`  | کسی صفحے یا بلاک کے ذیلی بلاکس کی فہرست دیں                             |
| `notion_query_database`      | `read:notion`  | فلٹرز، ترتیب، اور صفحہ بندی کے ساتھ ڈیٹابیس سے استفسار کریں             |
| `notion_get_database`        | `read:notion`  | ID کے ذریعے ڈیٹابیس اسکیما حاصل کریں                                    |
| `notion_append_blocks`       | `write:notion` | کسی پیرنٹ بلاک میں ذیلی بلاکس شامل کریں (فی درخواست زیادہ سے زیادہ 100) |

## ایجنٹ اسکل کیٹلاگ ٹولز (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` میں متعین ہیں۔ `src/lib/agentSkills/catalog` سے تقویت یافتہ ہیں۔ یہ ٹولز 45 اندراجات پر مشتمل ایجنٹ اسکلز دستاویزی کیٹلاگ کو MCP کلائنٹس اور بیرونی ایجنٹس کے لیے دستیاب بناتے ہیں۔ دائرۂ کار: `read:catalog`۔

| ٹول                               | دائرۂ کار      | تفصیل                                                                                                                                           |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | اختیاری `category` (api\|cli) اور `area` فلٹرز کے ساتھ تمام 45 ایجنٹ اسکلز کی فہرست؛ میٹا ڈیٹا + کوریج واپس کرتا ہے                             |
| `omniroute_agent_skills_get`      | `read:catalog` | مستند `id` کے ذریعے کسی ایک اسکل کا مکمل میٹا ڈیٹا + SKILL.md مواد حاصل کرتا ہے                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | کوریج کے اعدادوشمار: 23 API، 21 CLI اور 1 config اسکلز میں سے کتنی کے لیے فائل سسٹم پر SKILL.md فائلیں موجود ہیں بمقابلہ کیٹلاگ کے کُل اندراجات |

مکمل کیٹلاگ اور بیرونی ایجنٹس کے اسے استعمال کرنے کے طریقے کے لیے [AGENT-SKILLS.md](./AGENT-SKILLS.md) دیکھیں۔

## متعلقہ فریم ورکس (v3.8.0)

مندرجہ بالا MCP ٹول انوینٹری (110 منفرد ٹولز، جن کا حساب `countUniqueMcpTools()` سے لگایا گیا ہے) جان بوجھ کر
رن ٹائم روٹنگ/کیش/کمپریشن/میموری/اسکلز/پراکسی/کانٹیکسٹ-سورس آپریشنز تک محدود ہے۔ v3.8.0 میں MCP سرور کے ساتھ
دو ملحقہ فریم ورکس بھی فراہم کیے جاتے ہیں اور ان کی دستاویزات علیحدہ ہیں:

### کلاؤڈ ایجنٹس

کلاؤڈ ایجنٹس آؤٹ آف پروسیس AI کوڈنگ ایجنٹس (codex-cloud، cursor-cloud، devin، jules) ہیں، جو
LLM فراہم کنندگان کے لیے استعمال ہونے والے اسی کنکشن ماڈل کے ذریعے OmniRoute سے منسلک ہیں۔ انہیں
ان کے اپنے REST انٹرفیس (`/api/v1/agents/*`) کے ذریعے دستیاب کیا جاتا ہے اور وہ MCP ٹول کیٹلاگ کا حصہ **نہیں** ہیں
— کلاؤڈ ایجنٹ کو کال کرنے سے MCP دائرۂ کار استعمال نہیں ہوتا۔

- نفاذ: `src/lib/cloudAgent/` (`registry.ts`، `agents/codex.ts`، `agents/cursor.ts`، `agents/devin.ts`، `agents/jules.ts`)۔
- لائف سائیکل: `createTask`، `getStatus`، `approvePlan`، `sendMessage`، `listSources`۔
- دستاویزات: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)۔

### گارڈ ریلز

گارڈ ریلز عمل درآمد سے پہلے/بعد کے فلٹرز (vision-bridge، pii-masker، prompt-injection) ہیں
جو چیٹ پائپ لائن کے اندر لاگو ہوتے ہیں۔ یہ MCP ٹول/روٹ پرت تک پہنچنے سے پہلے چلتے ہیں
اور آڈٹ پائپ لائن کو منظم خلاف ورزیاں بھیجتے ہیں؛ انہیں MCP ٹولز کے طور پر طلب نہیں کیا جاتا۔

- نفاذ: `src/lib/guardrails/`۔
- دستاویزات: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)۔

کسی ایسی MCP کال کو ڈیبگ کرتے وقت جو بظاہر مسدود ہو، MCP آڈٹ لاگ
(`scope_denied:*` اندراجات) اور گارڈ ریلز آڈٹ ٹریل، دونوں کو چیک کریں — کوئی درخواست
MCP دائرۂ کار کے نفاذ کی پرت تک پہنچنے سے **پہلے** ہی کسی گارڈ ریل کے ذریعے مسترد ہو سکتی ہے۔

---

## REST API اینڈ پوائنٹس

| اینڈ پوائنٹ            | طریقہ                 | تفصیل                                                                                          | توثیق                   |
| :--------------------- | :-------------------- | :--------------------------------------------------------------------------------------------- | :---------------------- |
| `/api/mcp/status`      | `GET`                 | سرور کی حالت: ہارٹ بیٹ، HTTP ٹرانسپورٹ کی حالت، آڈٹ سرگرمی کا خلاصہ                            | انتظامی (session/admin) |
| `/api/mcp/tools`       | `GET`                 | ٹول کیٹلاگ (نام، تفصیل، دائرۂ کار، مرحلہ، سورس اینڈ پوائنٹس)                                   | انتظامی                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ٹرانسپورٹ اینڈ پوائنٹ (`mcpEnabled` + `mcpTransport === "sse"` کے ذریعے محدود)             | API کلید + دائرۂ کار    |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | اسٹریم ایبل HTTP ٹرانسپورٹ (`mcp-session-id` ہیڈر استعمال کرتا ہے؛ `DELETE` سیشن ختم کرتا ہے)  | API کلید + دائرۂ کار    |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` سے آڈٹ لاگ اندراجات (فلٹرز: `limit`، `offset`، `tool`، `success`، `apiKeyId`) | انتظامی                 |
| `/api/mcp/audit/stats` | `GET`                 | مجموعی آڈٹ اعدادوشمار (`totalCalls`، `successRate`، `avgDurationMs`، سرفہرست ٹولز)             | انتظامی                 |

سورس فائلیں: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`۔

SSE اور اسٹریم ایبل HTTP، دونوں ٹرانسپورٹس اس وقت تک مسدود رہتے ہیں جب تک ترتیبات میں MCP سرور فعال (`mcpEnabled`) نہ ہو اور مناسب `mcpTransport` منتخب نہ کیا گیا ہو۔ اگر غلط ٹرانسپورٹ کنفیگر ہو تو روٹ ترتیبات تبدیل کرنے کے اشارے کے ساتھ HTTP 400 واپس کرتا ہے۔

---

## توثیق اور اسکوپس

MCP ٹولز کی توثیق API کلید کے اسکوپس کے ذریعے کی جاتی ہے۔ اسکوپ کا نفاذ
`open-sse/mcp-server/scopeEnforcement.ts` میں مرکزی طور پر کیا جاتا ہے۔ ہر ٹول کے لیے مخصوص اسکوپس درکار ہوتے ہیں:

| دائرۂ کار             | ٹولز                                                                                                                                                                       |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                          |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                  |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                     |
| `read:quota`          | `check_quota`                                                                                                                                                              |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                     |
| `read:models`         | `list_models_catalog`                                                                                                                                                      |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                              |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                      |
| `write:budget`        | `set_budget_guard`                                                                                                                                                         |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                |
| `pricing:write`       | `sync_pricing`                                                                                                                                                             |
| `read:cache`          | `cache_stats`                                                                                                                                                              |
| `write:cache`         | `cache_flush`                                                                                                                                                              |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                 |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                          |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                      |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                           |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                     |
| `read:memory`         | `memory_search`                                                                                                                                                            |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                               |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                         |
| `write:skills`        | `skills_enable`                                                                                                                                                            |
| `execute:skills`      | `skills_execute`                                                                                                                                                           |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                           |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                    |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                  |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                           |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                             |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                         |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                            |
| `read:obsidian`       | 13 ریڈ ٹولز — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 رائٹ ٹولز — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                          |

وائلڈ کارڈ اسکوپس معاونت یافتہ ہیں: `read:*` تمام ریڈ اسکوپس فراہم کرتا ہے، جبکہ `*` مکمل رسائی فراہم کرتا ہے۔

### `mcp:connect` — محدود روٹ صلاحیت (#7895)

غیر لوپ بیک سے HTTP/SSE MCP ٹرانسپورٹ (`/api/mcp/*`) تک پہنچنے کے لیے
`/api/mcp/` LOCAL_ONLY استثنا درکار ہے (`docs/security/ROUTE_GUARD_TIERS.md` دیکھیں)۔ تاریخی طور پر
یہ استثنا صرف مکمل `manage`/`admin` اسکوپ والی API کلید قبول کرتا تھا — جو ایسے
کالر کے لیے ضرورت سے زیادہ وسیع تھا جسے صرف MCP سے رابطہ کرنا ہو۔ `src/shared/constants/managementScopes.ts` اب
`MCP_CONNECT_SCOPE = "mcp:connect"` ایکسپورٹ کرتا ہے: ایک اضافی، محدود اسکوپ (`SELF_USAGE_SCOPE`
جیسی نظیر کے مطابق) جو صرف `src/server/authz/policies/management.ts` میں
`/api/mcp/` بائی پاس کی اجازت دیتا ہے — یہ کسی دوسرے مینجمنٹ روٹ تک رسائی نہیں دیتا
اور اسے جان بوجھ کر `MANAGEMENT_API_KEY_SCOPES` سے باہر رکھا گیا ہے۔ `manage`/`admin`
رکھنے والی کلید اب بھی اس استثنا سے بغیر کسی تبدیلی کے گزر جاتی ہے؛ `mcp:connect`
دور دراز کے صرف MCP کالرز کے لیے کم مراعات والا متبادل ہے، جسے `hasMcpConnectOrManageScope()` کے ذریعے
چیک کیا جاتا ہے۔

### فی کلید HTTP اسکوپ بائنڈنگ (#7895)

HTTP/SSE پر، `open-sse/mcp-server/httpTransport.ts` اب `resolveMcpCallerAuthInfo()`
(`open-sse/mcp-server/httpAuthContext.ts`) کے ذریعے کالر کے اصل `api_keys.scopes`
حل کرتا ہے اور اسے MCP SDK کے `transport.handleRequest(req, { authInfo })` کو بھیجتا ہے، تاکہ
ہر ٹول کال تک پہنچنے والا `extra.authInfo.scopes` بیئرر کلید کے اپنے اسکوپس کی عکاسی کرے۔
`scopeEnforcement.ts` کا `resolveCallerScopeContext()` پہلے ہی `_meta` اور
`OMNIROUTE_MCP_SCOPES` env فال بیک پر `authInfo` کو ترجیح دیتا تھا — یہ تبدیلی صرف اس پہلے،
سب سے زیادہ ترجیحی ماخذ کو پُر کرتی ہے، جسے پہلے HTTP پر کوئی ڈیٹا فراہم نہیں کیا جاتا تھا۔ جب کوئی API کلید
حل نہیں ہوتی (ہیڈر موجود نہ ہو، کلید غیر معتبر ہو)، تو `authInfo` بدستور `undefined` رہتا ہے اور ریزولیوشن
بغیر کسی تبدیلی کے موجودہ `meta`/env سلسلے پر منتقل ہو جاتی ہے۔ یہ `OMNIROUTE_MCP_ENFORCE_SCOPES` کی
ڈیفالٹ قدر کو تبدیل نہیں کرتا — انفورسمنٹ کو اب بھی واضح طور پر فعال کرنا ضروری ہے؛ یہ تبدیلی صرف
فعال ہونے کے بعد فی کلید راستے کو ترجیح دیتی ہے۔ stdio کی کوئی فی کالر شناخت نہیں ہے
(`mcpCallerIdentity.ts` دیکھیں) اور اس پر کوئی اثر نہیں پڑتا — یہ `_meta`/env فال بیک سلسلے پر ہی رہتا ہے۔

---

## ماحولیاتی متغیرات

| متغیر                                   | ڈیفالٹ                                  | مقصد                                                                                                                                       |
| :-------------------------------------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                | وہ بنیادی URL جسے MCP سرور OmniRoute کی داخلی APIs کو کال کرتے وقت استعمال کرتا ہے                                                         |
| `OMNIROUTE_API_KEY`                     | (خالی)                                  | داخلی API کالز کو `Authorization: Bearer` کے طور پر فارورڈ کی جانے والی API کلید                                                           |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (صرف `"true"` اسے فعال کرتا ہے) | فعال ہونے پر، غیر موجود scopes ٹول کالز کو مسترد کرتے ہیں اور آڈٹ لاگ میں `scope_denied:<reason>` درج کرتے ہیں                             |
| `OMNIROUTE_MCP_SCOPES`                  | (خالی)                                  | scopes کی کوما سے جدا کردہ اجازت فہرست جنہیں ڈیفالٹ طور پر "دستیاب" تصور کیا جاتا ہے (جب کالر اپنے scopes فراہم نہ کرے تو استعمال ہوتی ہے) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (غیر متعین = فعال)                      | `0/false/off/no` پر سیٹ ہونے کی صورت میں، رجسٹریشن کے وقت MCP تفصیل کی کمپریشن کو غیر فعال کرتا ہے                                         |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (غیر متعین = فعال)                      | مذکورہ بالا اسی ٹوگل کا متبادل عرف                                                                                                         |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                 | داخلی انتظامی ریڈز (صحت، لچک، کمبینیشنز، کوٹا، استعمال) کے لیے اسقاط کا وقت                                                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                 | کسی فراہم کنندہ کا انتظار کرنے والے ہاپس (`route_request`، `web_search`، `web_fetch`) کے لیے اسقاط کا وقت                                  |
| `MCP_TOOL_DENY`                         | (غیر متعین = کوئی فلٹر نہیں)            | `tools/list` سے خارج کرنے کے لیے ٹول ناموں کی کوما سے جدا کردہ فہرست (ٹول کارڈینیلیٹی میں کمی — ذیل میں دیکھیں)                            |
| `MCP_TOOL_ALLOW`                        | (غیر متعین = کوئی فلٹر نہیں)            | صرف برقرار رکھنے کے لیے ٹول ناموں کی کوما سے جدا کردہ فہرست (اجازت فہرست موڈ — ذیل میں دیکھیں)                                             |
| `DATA_DIR`                              | `~/.omniroute`                          | ہارٹ بیٹ فائل `${DATA_DIR}/runtime/mcp-heartbeat.json` میں لکھی جاتی ہے                                                                    |

---

## تفصیل کی کمپریشن

MCP ٹول، پرامپٹ، اور وسائل کی رجسٹریاں رجسٹریشن/فہرست سازی کے وقت تفصیلات کو کمپریس کر سکتی ہیں تاکہ کلائنٹس کے سامنے ظاہر ہونے والے میٹا ڈیٹا کا حجم (اور نتیجتاً پرامپٹ کانٹیکسٹ کی لاگت) کم ہو۔ اس کا نفاذ `open-sse/mcp-server/descriptionCompressor.ts` میں موجود ہے اور `createMcpServer()` کے اندر `compressMcpRegistryMetadata` کے ذریعے MCP سرور سے منسلک ہے۔

- کمپریشن، محفوظ بلاکس کے اخراج (کوڈ اسپینز، فینسڈ بلاکس وغیرہ) کے ساتھ Caveman قواعد (`getRulesForContext("all", "full")`) استعمال کرتے ہوئے تفصیل کے متن پر عمل کرتی ہے، تاکہ ساختی مواد تبدیل نہ ہو۔
- ہر تعیناتی کے لیے `key_value` ترتیبات کی جدول میں `compression.mcpDescriptionCompressionEnabled` قدر کے ذریعے ٹوگل کریں (ڈیفالٹ: فعال) — UI میں **تجزیات → MCP تفصیل کی کمپریشن** کے طور پر دستیاب ہے۔
- پورے پراسیس کے لیے `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` یا `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` میں سے کسی ایک کے ذریعے ٹوگل کریں۔
- ریئل ٹائم اعدادوشمار `omniroute_compression_status` کے ذریعے `analytics.mcpDescriptionCompression` کے تحت ظاہر کیے جاتے ہیں اور حقیقی فراہم کنندہ کے استعمال کی رسیدوں سے امتیاز کرنے کے لیے `source: "mcp_metadata_estimate"` سے ٹیگ کیے جاتے ہیں۔

---

## ٹول کارڈینیلٹی میں کمی (F4.3)

تفصیل کی کمپریشن ہر ٹول کے میٹا ڈیٹا کو مختصر کرتی ہے؛ **ٹول کارڈینیلٹی میں کمی** اس سے ایک قدم آگے بڑھ کر یہ تعداد کم کرتی ہے کہ مجموعی طور پر _کتنے_ ٹولز کا اعلان کیا جاتا ہے۔ `tools/list` مینی فیسٹ میں کم ٹولز کی تشہیر کرنے سے ٹول کیٹلاگ کے لیے کلائنٹ کے ماڈل کی فی درخواست ٹوکن لاگت کم ہوتی ہے ("layer 5" کمپریشن)۔ اس کا نفاذ `open-sse/mcp-server/toolCardinality.ts` میں ایک خالص، بے حالت فلٹر (`reduceToolManifest`) ہے، جسے `createMcpServer()` (`open-sse/mcp-server/server.ts`) کے رجسٹریشن لوپ میں مربوط کیا گیا ہے۔

**اختیاری، بطور ڈیفالٹ بند۔** فلٹر صرف اس وقت چلتا ہے جب دو ماحولیاتی متغیرات میں سے کم از کم ایک سیٹ ہو؛ اگر دونوں میں سے کوئی بھی سیٹ نہ ہو تو تمام 110 ٹولز کا اعلان بغیر کسی تبدیلی کے کیا جاتا ہے۔

| متغیر            | موڈ                                                                                      |
| :--------------- | :--------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | بلیک لسٹ — کاما سے جدا ٹول نام جو ہمیشہ `tools/list` سے خارج کر دیے جاتے ہیں             |
| `MCP_TOOL_ALLOW` | اجازت فہرست — کاما سے جدا ٹول نام؛ صرف یہی برقرار رہتے ہیں، باقی سب خارج کر دیے جاتے ہیں |

`deny` کو `allow` پر ترجیح حاصل ہے۔ نام کاما سے جدا ہوتے ہیں، ان کے اطراف کی خالی جگہیں ہٹا دی جاتی ہیں، اور خالی اندراجات نظر انداز کیے جاتے ہیں۔ مثالیں:

```bash
# کیٹلاگ سے دو ٹولز خارج کریں
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# صرف روٹنگ + کوٹا ٹولز کا اعلان کریں (اجازت فہرست موڈ)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**فلٹر شدہ ٹولز کیسے ہٹائے جاتے ہیں:** رجسٹریشن ہمیشہ کامیاب رہتی ہے؛ جس ٹول کو پروفائل مسترد کرتا ہے اسے بعد میں MCP SDK ہینڈل پر `.disable()` کر دیا جاتا ہے، لہٰذا وہ کبھی `tools/list` میں ظاہر نہیں ہوتا، مگر وائرنگ برقرار رہتی ہے (صاف enable/disable، دوبارہ رجسٹریشن نہیں)۔ پروفائل پارسر `readMcpToolProfileFromEnv(process.env)` ہے، جو دونوں متغیرات خالی ہونے پر `null` (کوئی فلٹرنگ نہیں) واپس کرتا ہے۔

`reduceToolManifest` کے پسِ پشت موجود زیادہ جامع `ToolProfile` ساخت اسکوپ-انٹرسیکشن فلٹرنگ (`allowScopes`، جس میں `read:*` طرز کی وائلڈ کارڈ میچنگ شامل ہے) اور ایک تعینی `maxTools` حد کو بھی سپورٹ کرتی ہے، لیکن ان دونوں ترتیبات کے لیے رجسٹریشن کے وقت مکمل مینی فیسٹ درکار ہوتا ہے اور آج یہ ماحولیاتی متغیرات کے ذریعے **دستیاب نہیں** ہیں (`tools/list` کی سطح کا ہُک ایک زیرِ پیروی آئندہ کام ہے)۔ کمی سے پہلے اور بعد میں مینی فیسٹ کی ٹوکن لاگت کا موازنہ کرنے کے لیے `estimateManifestTokens()` دستیاب ہے۔

---

## رن ٹائم ہارٹ بیٹ

stdio ٹرانسپورٹ ہر 5 سیکنڈ بعد لائیونس کی حالت `${DATA_DIR}/runtime/mcp-heartbeat.json` میں محفوظ کرتی ہے۔ ڈیش بورڈ (`/api/mcp/status`) `online` اخذ کرنے کے لیے اس فائل کے ساتھ PID کی لائیونس بھی پڑھتا ہے۔ اس کے برعکس، HTTP ٹرانسپورٹس اِن-پروسیس `getMcpHttpStatus()` سے حالت رپورٹ کرتی ہیں (فائل میں کوئی تحریر نہیں کی جاتی)۔

ہارٹ بیٹ اسنیپ شاٹ میں یہ شامل ہوتا ہے:

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

## آڈٹ لاگنگ

ہر ٹول کال کو `open-sse/mcp-server/audit.ts` کے ذریعے SQLite کی `mcp_tool_audit` ٹیبل میں لاگ کیا جاتا ہے:

- ٹول کا نام، آرگیومنٹس (ہر ٹول کے `auditLevel` کے مطابق ہیش شدہ/مختصر کردہ)، نتیجہ
- ملی سیکنڈ میں دورانیہ، کامیابی/ناکامی کا فلیگ، خرابی کا پیغام (جب قابلِ اطلاق ہو)
- API کلید کا ہیش، ٹائم اسٹیمپ
- اسکوپ کی نامنظوریاں گمشدہ اسکوپ فہرست کے ساتھ `scope_denied:<reason>` کے طور پر لاگ کی جاتی ہیں

حالیہ کالز کا معائنہ کرنے کے لیے ڈیش بورڈ یا `/api/mcp/audit` اور `/api/mcp/audit/stats` REST اینڈ پوائنٹس استعمال کریں۔

---

## فائلیں

| فائل                                                                     | مقصد                                                                  |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP سرور فیکٹری، stdio انٹری پوائنٹ، دائرۂ کار کے مطابق ٹول رجسٹریشنز |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ٹرانسپورٹ (سیشن مینجمنٹ)                        |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ٹول کے دائرۂ کار کی جانچ اور کالر کا تعین                             |
| `open-sse/mcp-server/audit.ts`                                           | ٹول کال آڈٹ لاگنگ (`mcp_tool_audit`)                                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio ہارٹ بیٹ رائٹر (`mcp-heartbeat.json`)                           |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ٹول / پرامپٹ / ریسورس رجسٹریز کے لیے تفصیل کی کمپریشن                 |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod اسکیماس + ٹول رجسٹری (`MCP_TOOLS`، 45 اندراجات)                   |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | فیز 2 + کیش + 1proxy ٹول ہینڈلرز                                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | کمپریشن ٹول ہینڈلرز                                                   |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | میموری ٹول کی تعریفیں (3 ٹولز)                                        |
| `open-sse/mcp-server/tools/skillTools.ts`                                | اسکل ٹول کی تعریفیں (4 ٹولز)                                          |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion سیاق و سباق کے ماخذ کے ٹول کی تعریفیں (6 ٹولز)                 |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | گیمیفیکیشن ٹول کی تعریفیں (8 ٹولز)                                    |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | پلگ اِن رجسٹریشن اور انتظامی ٹولز (8 ٹولز)                            |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` اینڈ پوائنٹ                                         |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` اینڈ پوائنٹ                                          |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ٹرانسپورٹ روٹ                                      |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ٹرانسپورٹ روٹ                       |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` آڈٹ لاگ استفسار                                      |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` مجموعی آڈٹ میٹرکس                              |
| `src/lib/notion/api.ts`                                                  | Notion REST API کلائنٹ (دوبارہ کوشش، ٹائم آؤٹ، خرابی کی درجہ بندی)    |
| `src/lib/db/notion.ts`                                                   | Notion ٹوکن کی مستقل ذخیرہ کاری (`key_value` ٹیبل)                    |
| `src/app/api/settings/notion/route.ts`                                   | Notion سیٹنگز API (GET/POST/DELETE)                                   |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion ٹوکن مینجمنٹ UI                                                |
| `tests/unit/notion-api.test.ts`                                          | Notion API کلائنٹ ٹیسٹس (7)                                           |
| `tests/unit/notion-tools.test.ts`                                        | Notion ٹولز کے دائرۂ کار کے نفاذ کے ٹیسٹس (10)                        |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB ماڈیول ٹیسٹس (3)                                            |
