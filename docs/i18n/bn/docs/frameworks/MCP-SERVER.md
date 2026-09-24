# OmniRoute MCP Server Documentation (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> রাউটিং, ক্যাশে, কম্প্রেশন, মেমোরি, স্কিল, প্রক্সি, পুল, Radar এবং কনটেক্সট সোর্স অপারেশনজুড়ে 110টি টুলসহ Model Context Protocol সার্ভার।
>
> প্রকৃত তথ্যের উৎস: `open-sse/mcp-server/server.ts`-এ `countUniqueMcpTools()` ব্যবহার করে **110টি অনন্য টুল** গণনা করা হয়: 45টি ক্যানোনিক্যাল সংজ্ঞা (ছয়টি CCR লাইফসাইকেল টুল, agent-skills ত্রয়ী, `omniroute_radar_catalog` এবং `omniroute_x_search`-সহ), সঙ্গে মেমোরি (3), স্কিল (4), GitHub স্কিল (3), পুল (6), গেমিফিকেশন (8), প্লাগইন (8), Notion (6), Obsidian (22), লোকাল কর্পাস (3) এবং শুধু RTK-তে থাকা দুটি কম্প্রেশন টুল।

## ইনস্টলেশন

OmniRoute MCP বিল্ট-ইন। এটি এভাবে চালু করুন:

```bash
omniroute --mcp
```

অথবা open-sse ট্রান্সপোর্টের মাধ্যমে:

```bash
# HTTP স্ট্রিমযোগ্য ট্রান্সপোর্ট (পোর্ট 20130)
omniroute --dev  # /mcp এন্ডপয়েন্টে MCP স্বয়ংক্রিয়ভাবে চালু হয়
```

HTTP ট্রান্সপোর্টগুলো (`sse` / `streamable-http`, ড্যাশবোর্ড সার্ভার দ্বারা একই প্রসেসের মধ্যে পরিবেশিত) ডিফল্টভাবে
বন্ধ থাকে এবং আগে শুধু `/dashboard/mcp` পৃষ্ঠা থেকে টগল করা যেত। v3.8.51 থেকে
CLI-তেও সমতুল্য সুবিধা রয়েছে:

```bash
omniroute mcp status                                  # সক্রিয়/অনলাইন, ট্রান্সপোর্ট, টুলের সংখ্যা
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # সক্রিয় sse/streamable-http সেশন রিসেট করে
```

`mcp enable`/`mcp disable`, `/api/settings`-এর মাধ্যমে ড্যাশবোর্ড যে একই `mcpEnabled` (এবং ঐচ্ছিকভাবে `mcpTransport`) সেটিং
টগল করে, সেটিকেই PATCH করে। `mcp restart`, `POST /api/mcp/restart` কল করে: এটি সক্রিয়
`sse`/`streamable-http` সেশনগুলো বন্ধ করে দেয়, যাতে পরবর্তী অনুরোধটি পরিচ্ছন্নভাবে পুনরায় ইনিশিয়ালাইজ হয়; MCP নিষ্ক্রিয় থাকলে
`409` এবং `stdio` ট্রান্সপোর্টের জন্য `501` ফেরত দেয় (stdio ক্লায়েন্টগুলো নিজস্ব
সাবপ্রসেসের মালিক—রিস্টার্ট করার মতো একই প্রসেসের মধ্যে কোনো হ্যান্ডেল নেই)।

## ট্রান্সপোর্ট

MCP সার্ভারটি তিনটি ট্রান্সপোর্ট প্রকাশ করে, যার সবগুলো একই `createMcpServer()` ফ্যাক্টরি দ্বারা চালিত:

| ট্রান্সপোর্ট      | অবস্থান                                     | কখন ব্যবহার করবেন                                      |
| :---------------- | :------------------------------------------ | :----------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE ইন্টিগ্রেশন (Claude Desktop, Cursor ইত্যাদি)       |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | ইভেন্ট স্ট্রিম প্রয়োজন এমন ব্রাউজার/এজেন্ট ক্লায়েন্ট |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | মাল্টি-সেশন HTTP ক্লায়েন্ট (`mcp-session-id` হেডার)   |

সক্রিয় HTTP ট্রান্সপোর্টটি (`sse` বা `streamable-http`) `mcpTransport` সেটিং দ্বারা নির্বাচন করা হয়। ট্রান্সপোর্ট পরিবর্তন করলে অন্য ট্রান্সপোর্টের বিদ্যমান সেশনগুলো বন্ধ হয়ে যায়।

### রিমোট অ্যাক্সেস (manage-scope বাইপাস)

`/api/mcp/*`, LOCAL_ONLY স্তরে রয়েছে (`src/server/authz/routeGuard.ts`)—ডিফল্টভাবে শুধু লুপব্যাক হোস্টগুলো (`localhost`, `127.0.0.1`, `::1`) এতে পৌঁছাতে পারে। v3.8.2 থেকে, নন-লুপব্যাক ক্লায়েন্টগুলো সংযোগ করতে পারে, যদি তারা এমন একটি `Authorization: Bearer <api-key>` উপস্থাপন করে যার কী-তে `manage` স্কোপ রয়েছে। টানেল, রিভার্স প্রক্সি বা পাবলিক হোস্টনেমের মাধ্যমে রিমোট MCP সার্ভারে পৌঁছানোর এটিই একমাত্র উপায়।

```bash
# manage স্কোপ প্রদান করুন: ড্যাশবোর্ডের API Keys পৃষ্ঠা খুলে কী-টির
# "Management Access" টগল করুন, অথবা তৈরি করার সময় POST scopes:["manage"] পাঠান।

# এরপর একটি রিমোট MCP ক্লায়েন্ট থেকে সংযোগ করুন:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage`-বিহীন কী (অথবা Bearer না থাকলে) `403 LOCAL_ONLY` ফেরত দেয়। পাশাপাশি থাকা প্রিফিক্স `/api/cli-tools/runtime/*` ইচ্ছাকৃতভাবেই বাইপাসযোগ্য নয়—দেখুন [রুট গার্ড স্তরসমূহ—Manage-scope ব্যতিক্রম](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)।

## IDE কনফিগারেশন

Claude Desktop, Cursor, Cline এবং সামঞ্জস্যপূর্ণ MCP ক্লায়েন্ট সেটআপের জন্য [MCP ক্লায়েন্ট কনফিগারেশন](../guides/SETUP_GUIDE.md#mcp-client-configuration) দেখুন।

---

## অপরিহার্য টুলসমূহ (14) — পর্যায় 1

| টুল                             | স্কোপ                 | বিবরণ                                                                                                                                            |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | আপটাইম, মেমোরি, সার্কিট ব্রেকার, রেট লিমিট, ক্যাশ পরিসংখ্যান                                                                                     |
| `omniroute_list_combos`         | `read:combos`         | কৌশলসহ কনফিগার করা সব কম্বো (ঐচ্ছিক মেট্রিক্স)                                                                                                   |
| `omniroute_get_combo_metrics`   | `read:combos`         | নির্দিষ্ট কম্বোর পারফরম্যান্স মেট্রিক্স                                                                                                          |
| `omniroute_switch_combo`        | `write:combos`        | একটি কম্বো সক্রিয় বা নিষ্ক্রিয় করুন                                                                                                            |
| `omniroute_create_combo`        | `write:combos`        | বিদ্যমান কম্বো API-এর মাধ্যমে যাচাইকৃত কম্বো তৈরি করুন                                                                                           |
| `omniroute_check_quota`         | `read:quota`          | ব্যবহৃত/মোট কোটা, অবশিষ্ট শতাংশ, রিসেটের সময়, টোকেনের অবস্থা                                                                                    |
| `omniroute_route_request`       | `execute:completions` | OmniRoute রাউটিংয়ের মাধ্যমে একটি চ্যাট কমপ্লিশন পাঠান                                                                                           |
| `omniroute_cost_report`         | `read:usage`          | সময়কালভিত্তিক খরচের প্রতিবেদন (সেশন/দিন/সপ্তাহ/মাস)                                                                                             |
| `omniroute_list_models_catalog` | `read:models`         | সক্ষমতা, অবস্থা ও মূল্যসহ সম্পূর্ণ মডেল ক্যাটালগ                                                                                                 |
| `omniroute_radar_catalog`       | `read:radar`          | স্থানীয়ভাবে স্বাক্ষরিত Radar ক্যাটালগ; ঐচ্ছিক প্রোভাইডার/ফ্যামিলি ফিল্টার                                                                       |
| `omniroute_tool_search`         | `read:tools`          | নিবন্ধিত MCP ক্যাটালগ থেকে টুল খুঁজে বের করুন                                                                                                    |
| `omniroute_web_search`          | `execute:search`      | কনফিগার করা সার্চ প্রোভাইডারগুলোর মাধ্যমে ওয়েব সার্চ করুন। X/Twitter নয়।                                                                       |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok-এর মাধ্যমে X-এ সার্চ করুন, অথবা Xquik API ফলাফলের জন্য `xquik-search` বেছে নিন। নির্বাচিত ব্যাকএন্ডের জন্য ক্রেডেনশিয়াল প্রয়োজন। |
| `omniroute_web_fetch`           | `execute:search`      | কনফিগার করা ফেচ প্রোভাইডারগুলোর মাধ্যমে ওয়েব কনটেন্ট আনুন                                                                                       |

## উন্নত টুলসমূহ (11) — পর্যায় 2

| টুল                                | স্কোপ                                | বিবরণ                                                                                                   |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ফলব্যাক ট্রিসহ ড্রাই-রান রাউটিং সিমুলেশন                                                                |
| `omniroute_set_budget_guard`       | `write:budget`                       | ডিগ্রেড/ব্লক/অ্যালার্ট অ্যাকশনসহ সেশন বাজেট                                                             |
| `omniroute_set_routing_strategy`   | `write:combos`                       | রানটাইমে কম্বো কৌশল আপডেট করুন (priority/weighted/auto/ইত্যাদি)                                         |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` রেজিলিয়েন্স প্রিসেট প্রয়োগ করুন                            |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | একটি বাস্তব আপস্ট্রিম কল ব্যবহার করে কোনো কম্বোর প্রতিটি প্রোভাইডারের লাইভ পরীক্ষা                      |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 লেটেন্সি ও সার্কিট ব্রেকারের অবস্থাসহ প্রতি-প্রোভাইডার মেট্রিক্স                            |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | বাজেট/লেটেন্সি সীমাবদ্ধতাসহ টাস্কের ধরন অনুযায়ী কম্বোর সুপারিশ                                         |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | কেন একটি অনুরোধ কোনো প্রোভাইডারের কাছে রাউট করা হয়েছিল তা ব্যাখ্যা করুন (স্কোরিং ফ্যাক্টর + ফলব্যাক)   |
| `omniroute_get_session_snapshot`   | `read:usage`                         | সম্পূর্ণ সেশন স্ন্যাপশট: খরচ, টোকেন, শীর্ষ মডেল/প্রোভাইডার, ত্রুটি, বাজেট গার্ড                         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | ভাঙা কম্বো রেফারেন্স / অরফ্যান রোর মতো ডেটাবেস ড্রিফট নির্ণয় (এবং ঐচ্ছিকভাবে স্বয়ংক্রিয় মেরামত) করুন |
| `omniroute_sync_pricing`           | `pricing:write`                      | বহিরাগত উৎস (LiteLLM) থেকে প্রাইসিং ডেটা সিঙ্ক করুন; `dryRun` সমর্থিত                                   |

## ক্যাশ টুলসমূহ (2)

| টুল                     | স্কোপ         | বিবরণ                                                     |
| :---------------------- | :------------ | :-------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | সেমান্টিক ক্যাশ, প্রম্পট-ক্যাশ ও আইডেমপোটেন্সি পরিসংখ্যান |
| `omniroute_cache_flush` | `write:cache` | বিশ্বব্যাপী অথবা সিগনেচার/মডেল অনুযায়ী ক্যাশ ফ্লাশ করুন  |

## কম্প্রেশন টুলসমূহ (13)

| টুল                                 | স্কোপ               | বিবরণ                                                                                                              |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | কম্প্রেশন সেটিংস, অ্যানালিটিক্স সারাংশ ও ক্যাশ-সচেতন পরিসংখ্যান (`analytics.mcpDescriptionCompression` মেটাডেটাসহ) |
| `omniroute_compression_configure`   | `write:compression` | কম্প্রেশন মোড, থ্রেশহোল্ড, লক্ষ্য অনুপাত, সিস্টেম-প্রম্পট সংরক্ষণ এবং MCP বিবরণ কম্প্রেশন টগল কনফিগার করুন         |
| `omniroute_set_compression_engine`  | `write:compression` | সক্রিয় ইঞ্জিন (off/caveman/rtk/stacked) এবং Caveman/RTK ইনটেনসিটি নির্বাচন করুন                                   |
| `omniroute_list_compression_combos` | `read:compression`  | নামযুক্ত কম্প্রেশন কম্বো ও তাদের ইঞ্জিন পাইপলাইন তালিকাভুক্ত করুন                                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | কম্প্রেশন কম্বো ও ইঞ্জিন অনুযায়ী গ্রুপ করা অ্যানালিটিক্স                                                          |
| `omniroute_ccr_store`               | `write:compression` | সীমাবদ্ধ ইন-মেমরি CCR স্টোরে কলার-বিচ্ছিন্ন কনটেন্ট সংরক্ষণ করুন এবং একটি মার্কারসহ `ccr://` রেফারেন্স ফেরত দিন    |
| `omniroute_ccr_retrieve`            | `read:compression`  | সম্পূর্ণরূপে অথবা হেড, টেইল, লাইন, grep ও পরিসংখ্যান মোডে CCR কনটেন্ট পুনরুদ্ধার করুন                              |
| `omniroute_ccr_inspect`             | `read:compression`  | কনটেন্ট ফেরত না দিয়ে কলারের মালিকানাধীন CCR মেটাডেটা পরিদর্শন করুন                                                |
| `omniroute_ccr_list`                | `read:compression`  | কলারের মালিকানাধীন CCR ব্লকগুলোর পৃষ্ঠাঙ্কিত মেটাডেটা তালিকাভুক্ত করুন                                             |
| `omniroute_ccr_delete`              | `write:compression` | কলারের মালিকানাধীন একটি CCR ব্লক মুছুন                                                                             |
| `omniroute_ccr_stats`               | `read:compression`  | কলার-স্কোপড মেমরি ব্যবহার, লাইফসাইকেল কাউন্টার ও স্টোরের সীমা রিপোর্ট করুন                                         |
| `omniroute_rtk_discover`            | `read:compression`  | অপ্ট-ইন RTK আউটপুট নমুনায় পুনরাবৃত্ত নয়েজ শনাক্ত করুন                                                            |
| `omniroute_rtk_learn`               | `read:compression`  | অপ্ট-ইন নমুনা থেকে পর্যালোচনাযোগ্য RTK ফিল্টার খসড়া তৈরি করুন                                                     |

CCR এন্ট্রিগুলো কেবল ইন-মেমরিতে থাকে এবং রিস্টার্ট করলে অদৃশ্য হয়ে যায়। প্রতিটি ব্লক 2 MiB, প্রতিটি
প্রিন্সিপাল 16 MiB এবং গ্লোবাল স্টোর 64 MiB-তে সীমাবদ্ধ। এন্ট্রিগুলোর ডিফল্ট TTL 24 ঘণ্টা (সর্বোচ্চ
সাত দিন)। সম্পূর্ণ MCP পুনরুদ্ধার 256 KiB-তে সীমাবদ্ধ; বড় ব্লকগুলো রেঞ্জড ও grep মোডের মাধ্যমে
উপলভ্য থাকে। স্টোরেজ, পুনরুদ্ধার, তালিকাভুক্তকরণ, পরিদর্শন, মুছে ফেলা ও পরিসংখ্যান প্রমাণীকৃত
API-key প্রিন্সিপাল অনুযায়ী বিচ্ছিন্ন থাকে। অডিট রেকর্ডে হ্যাশ ও আকারের মেটাডেটা থাকে, কনটেন্ট কখনোই থাকে না।

`omniroute_compression_status` MCP বিবরণ কম্প্রেশনকে পৃথকভাবে
`analytics.mcpDescriptionCompression`-এর অধীনে রিপোর্ট করে। এই মানগুলো MCP-এর তালিকাভুক্তযোগ্য
বিবরণগুলোর (`tools`, `prompts`, `resources`, এবং `resourceTemplates`) মেটাডেটা-আকারের আনুমানিক হিসাব; এগুলো প্রোভাইডারের ব্যবহারসংক্রান্ত
রসিদ নয় এবং `source: "mcp_metadata_estimate"` দিয়ে চিহ্নিত।

### MCP অ্যাক্সেসিবিলিটি ট্রি ফিল্টার (v3.8.0)

উপরের কম্প্রেশন টুলগুলো থেকে পৃথকভাবে, OmniRoute-এ একটি পোস্ট-এক্সিকিউশন ফিল্টার রয়েছে, যা
এজেন্টের কাছে ফেরত পাঠানোর আগে MCP ব্রাউজার/অ্যাক্সেসিবিলিটি টুলগুলোর **টুল ফলাফল** কম্প্রেস করে।
এই ফিল্টারটি নিজে কোনো টুল নয় — বিস্তারিত অ্যাক্সেসিবিলিটি-ট্রি বা ব্রাউজার-স্ন্যাপশট টেক্সট (≥2000 অক্ষর) রয়েছে এমন যেকোনো টুল ফলাফলের ওপর এটি স্বচ্ছভাবে চলে।

মূল আচরণসমূহ:

- পরপর পুনরাবৃত্ত ≥30টি সমপর্যায়ের লাইনকে শুরু + শেষের সারাংশে সংকুচিত করে
- Playwright/computer-use-এর জন্য প্রয়োজনীয় `[ref=eXX]` অ্যাঙ্কর সংরক্ষণ করে
- অতিরিক্ত বড় টেক্সটকে (>50,000 অক্ষর) নেভিগেশন ইঙ্গিতসহ নির্ধারিত সীমায় ছেঁটে দেয়
- প্রত্যাশিত সাশ্রয়: ব্রাউজার স্ন্যাপশট পেলোডে **60–80%**

কনফিগারেশন: গ্লোবাল সেটিংসে `compression.mcpAccessibility` (মাইগ্রেশন 056)।
ইমপ্লিমেন্টেশন: `open-sse/services/compression/engines/mcpAccessibility/`।
সম্পূর্ণ ডকুমেন্টেশন: [কম্প্রেশন ইঞ্জিন — MCP অ্যাক্সেসিবিলিটি ট্রি ফিল্টার](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)।

এই টুলগুলোর অন্তর্নিহিত রানটাইম কম্প্রেশন মডেল সম্পর্কে জানতে [কম্প্রেশন ইঞ্জিন](../compression/COMPRESSION_ENGINES.md) এবং [RTK কম্প্রেশন](../compression/RTK_COMPRESSION.md) দেখুন।

## 1Proxy টুলসমূহ (3)

| টুল                         | স্কোপ          | বিবরণ                                                                                |
| :-------------------------- | :------------- | :----------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy মার্কেটপ্লেস থেকে বিনামূল্যের প্রক্সি আনুন (প্রোটোকল/দেশ/গুণমান/সীমা ফিল্টার) |
| `omniroute_oneproxy_rotate` | `read:proxies` | কৌশল অনুযায়ী পরবর্তী উপলভ্য প্রক্সি পান (`random` / `quality` / `sequential`)       |
| `omniroute_oneproxy_stats`  | `read:proxies` | পুলের পরিসংখ্যান, সিঙ্কের অবস্থা এবং প্রোটোকল ও দেশ অনুযায়ী বণ্টন                   |

## মেমরি টুলসমূহ (3)

`open-sse/mcp-server/tools/memoryTools.ts`-এ সংজ্ঞায়িত। প্রমাণীকরণ/স্কোপ স্ট্যান্ডার্ড MCP স্কোপ পাইপলাইনের মাধ্যমে প্রয়োগ করা হয়।

| টুল                       | স্কোপ          | বিবরণ                                                                                         |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | টোকেন-বাজেট প্রয়োগসহ কোয়েরি / ধরন / API key অনুযায়ী মেমরি অনুসন্ধান করুন                   |
| `omniroute_memory_add`    | `write:memory` | একটি নতুন মেমরি এন্ট্রি যোগ করুন (`factual` / `episodic` / `procedural` / `semantic`)         |
| `omniroute_memory_clear`  | `write:memory` | একটি API key-এর মেমরি মুছুন, ঐচ্ছিকভাবে ধরন বা `olderThan` টাইমস্ট্যাম্প অনুযায়ী ফিল্টার করে |

## দক্ষতা টুলসমূহ (4)

`open-sse/mcp-server/tools/skillTools.ts`-এ সংজ্ঞায়িত। `src/lib/skills/registry` + `src/lib/skills/executor` দ্বারা সমর্থিত।

| টুল                           | স্কোপ            | বিবরণ                                                                                |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API key, নাম বা সক্রিয় অবস্থার ঐচ্ছিক ফিল্টারিংসহ নিবন্ধিত দক্ষতাগুলোর তালিকা দেখুন |
| `omniroute_skills_enable`     | `write:skills`   | ID অনুযায়ী নির্দিষ্ট একটি দক্ষতা সক্রিয় বা নিষ্ক্রিয় করুন                         |
| `omniroute_skills_execute`    | `execute:skills` | প্রদত্ত ইনপুট দিয়ে একটি দক্ষতা কার্যকর করুন এবং কার্যকরকরণের রেকর্ড ফেরত দিন        |
| `omniroute_skills_executions` | `read:skills`    | সাম্প্রতিক দক্ষতা কার্যকরকরণের ইতিহাসের তালিকা দেখুন                                 |

## Notion কনটেক্সট সোর্স (6)

`open-sse/mcp-server/tools/notionTools.ts`-এ সংজ্ঞায়িত। টোকেনটি `src/lib/db/notion.ts`-এর মাধ্যমে `key_value` টেবিলে সংরক্ষিত হয়। REST ক্লায়েন্ট রয়েছে `src/lib/notion/api.ts`-এ। সেটিংস API রয়েছে `src/app/api/settings/notion/route.ts`-এ। ড্যাশবোর্ড UI রয়েছে `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`-এ।

Endpoint ড্যাশবোর্ডের **কনটেক্সট সোর্সসমূহ** ট্যাব থেকে অথবা REST API-এর মাধ্যমে আপনার Notion ইন্টিগ্রেশন টোকেন কনফিগার করুন:

```bash
# টোকেন সেট করুন
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# অবস্থা পরীক্ষা করুন
curl http://localhost:20128/api/settings/notion

# সংযোগ বিচ্ছিন্ন করুন
curl -X DELETE http://localhost:20128/api/settings/notion
```

| টুল                          | স্কোপ          | বিবরণ                                                                    |
| :--------------------------- | :------------- | :----------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | সব পৃষ্ঠা ও ডেটাবেসজুড়ে পূর্ণ-পাঠ্য অনুসন্ধান                           |
| `notion_get_page`            | `read:notion`  | কোনো পৃষ্ঠার ID ব্যবহার করে এর প্রপার্টিসহ পৃষ্ঠাটি পান                  |
| `notion_list_block_children` | `read:notion`  | কোনো পৃষ্ঠা বা ব্লকের চাইল্ড ব্লকগুলোর তালিকা দেখুন                      |
| `notion_query_database`      | `read:notion`  | ফিল্টার, সর্ট এবং পেজিনেশনসহ কোনো ডেটাবেস কোয়েরি করুন                   |
| `notion_get_database`        | `read:notion`  | ID অনুযায়ী ডেটাবেস স্কিমা পান                                           |
| `notion_append_blocks`       | `write:notion` | কোনো প্যারেন্ট ব্লকে চাইল্ড ব্লক যোগ করুন (প্রতি অনুরোধে সর্বোচ্চ 100টি) |

## এজেন্ট স্কিল ক্যাটালগ টুলস (3)

`open-sse/mcp-server/tools/agentSkillTools.ts`-এ সংজ্ঞায়িত। `src/lib/agentSkills/catalog` দ্বারা সমর্থিত। এই টুলগুলো MCP ক্লায়েন্ট ও বহিরাগত এজেন্টদের কাছে 45-এন্ট্রির এজেন্ট স্কিল ডকুমেন্টেশন ক্যাটালগ উন্মুক্ত করে। স্কোপ: `read:catalog`।

| টুল                               | স্কোপ          | বিবরণ                                                                                                                                     |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | ঐচ্ছিক `category` (api\|cli) এবং `area` ফিল্টারসহ সব 45টি এজেন্ট স্কিল তালিকাভুক্ত করে; মেটাডেটা + কভারেজ ফেরত দেয়                       |
| `omniroute_agent_skills_get`      | `read:catalog` | ক্যানোনিক্যাল `id` অনুযায়ী একটি স্কিলের সম্পূর্ণ মেটাডেটা + SKILL.md কনটেন্ট সংগ্রহ করে                                                  |
| `omniroute_agent_skills_coverage` | `read:catalog` | কভারেজ পরিসংখ্যান: ক্যাটালগের মোট সংখ্যার তুলনায় 23টি API, 21টি CLI এবং 1টি config স্কিলের মধ্যে কতটির SKILL.md ফাইল ফাইলসিস্টেমে রয়েছে |

সম্পূর্ণ ক্যাটালগ এবং বহিরাগত এজেন্টরা কীভাবে এটি ব্যবহার করে, তা জানতে [AGENT-SKILLS.md](./AGENT-SKILLS.md) দেখুন।

## সংশ্লিষ্ট ফ্রেমওয়ার্কসমূহ (v3.8.0)

উপরের MCP টুল ইনভেন্টরি (110টি স্বতন্ত্র টুল, `countUniqueMcpTools()` দ্বারা গণনা করা) ইচ্ছাকৃতভাবে
রানটাইম রাউটিং/ক্যাশ/কম্প্রেশন/মেমরি/স্কিল/প্রক্সি/কনটেক্সট-সোর্স অপারেশনে সীমাবদ্ধ। v3.8.0-এ MCP সার্ভারের
পাশাপাশি দুটি সংলগ্ন ফ্রেমওয়ার্ক সরবরাহ করা হয় এবং সেগুলো আলাদাভাবে নথিভুক্ত:

### ক্লাউড এজেন্টসমূহ

ক্লাউড এজেন্ট হলো আউট-অব-প্রসেস AI কোডিং এজেন্ট (codex-cloud, cursor-cloud, devin, jules), যেগুলো
LLM প্রদানকারীদের জন্য ব্যবহৃত একই সংযোগ মডেলের মাধ্যমে OmniRoute-এর সঙ্গে যুক্ত। এগুলো নিজস্ব
REST সারফেসের (`/api/v1/agents/*`) মাধ্যমে উন্মুক্ত এবং MCP টুল ক্যাটালগের অংশ **নয়**
— কোনো ক্লাউড এজেন্ট কল করলে MCP স্কোপ ব্যবহৃত হয় না।

- বাস্তবায়ন: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`)।
- লাইফসাইকেল: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`।
- ডকুমেন্টেশন: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)।

### গার্ডরেইলসমূহ

গার্ডরেইল হলো প্রি/পোস্ট-এক্সিকিউশন ফিল্টার (vision-bridge, pii-masker, prompt-injection),
যা চ্যাট পাইপলাইনের মধ্যে প্রয়োগ করা হয়। MCP টুল/রুট স্তরে পৌঁছানোর আগেই এগুলো চলে
এবং অডিট পাইপলাইনে কাঠামোবদ্ধ লঙ্ঘন পাঠায়; এগুলো MCP টুল হিসেবে আহ্বান করা হয় না।

- বাস্তবায়ন: `src/lib/guardrails/`।
- ডকুমেন্টেশন: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)।

ব্লক করা হয়েছে বলে মনে হওয়া কোনো MCP কল ডিবাগ করার সময় MCP অডিট লগ
(`scope_denied:*` এন্ট্রি) এবং গার্ডরেইল অডিট ট্রেইল—উভয়ই পরীক্ষা করুন—কোনো অনুরোধ MCP স্কোপ
এনফোর্সমেন্ট স্তরে পৌঁছানোর **আগেই** কোনো গার্ডরেইল দ্বারা প্রত্যাখ্যাত হতে পারে।

---

## REST API এন্ডপয়েন্টসমূহ

| এন্ডপয়েন্ট            | মেথড                  | বিবরণ                                                                                             | অথ                           |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------ | :--------------------------- |
| `/api/mcp/status`      | `GET`                 | সার্ভারের অবস্থা: হার্টবিট, HTTP ট্রান্সপোর্টের অবস্থা, অডিট কার্যকলাপের সারসংক্ষেপ               | ম্যানেজমেন্ট (সেশন/অ্যাডমিন) |
| `/api/mcp/tools`       | `GET`                 | টুল ক্যাটালগ (নাম, বিবরণ, স্কোপ, ফেজ, সোর্স এন্ডপয়েন্ট)                                          | ম্যানেজমেন্ট                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ট্রান্সপোর্ট এন্ডপয়েন্ট (`mcpEnabled` + `mcpTransport === "sse"` দ্বারা নিয়ন্ত্রিত)         | API কী + স্কোপ               |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | স্ট্রিমযোগ্য HTTP ট্রান্সপোর্ট (`mcp-session-id` হেডার ব্যবহার করে; `DELETE` সেশন শেষ করে)        | API কী + স্কোপ               |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` থেকে অডিট লগ এন্ট্রি (ফিল্টার: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | ম্যানেজমেন্ট                 |
| `/api/mcp/audit/stats` | `GET`                 | সমষ্টিগত অডিট পরিসংখ্যান (`totalCalls`, `successRate`, `avgDurationMs`, শীর্ষ টুলসমূহ)            | ম্যানেজমেন্ট                 |

সোর্স ফাইলসমূহ: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`।

সেটিংসে MCP সার্ভার সক্রিয় (`mcpEnabled`) করা এবং উপযুক্ত `mcpTransport` নির্বাচন না করা পর্যন্ত SSE ও স্ট্রিমযোগ্য HTTP—উভয় ট্রান্সপোর্টই ব্লক থাকে। ভুল ট্রান্সপোর্ট কনফিগার করা থাকলে, সেটিংস পরিবর্তনের ইঙ্গিতসহ রুটটি HTTP 400 ফেরত দেয়।

---

## প্রমাণীকরণ ও স্কোপসমূহ

MCP টুল কলগুলো কলারের কাছ থেকে স্কোপ স্ট্রিং পড়ে। সেই যাচাইটি তিনটি
স্বতন্ত্র নেমস্পেসের একটি। একটি চেকারে পাস করা মানে অন্যগুলোতে পাস করা নয়।
নিয়মগুলো রয়েছে [তিনটি স্কোপ নেমস্পেস](#three-scope-namespaces)-এ।
টুল ক্যাটালগটি রয়েছে [MCP টুল স্কোপসমূহ](#mcp-tool-scopes)-এ।

### তিনটি স্কোপ নেমস্পেস

একটি API key-তে `manage`, একটি MCP টুলে `read:compression`, এবং একটি
`oma_live_…` access token-এ `read`—এই তিনটি ভিন্ন অনুমতি। যেসব কলার একটি
পরিবর্তনকারী ম্যানেজমেন্ট রুটে `read` access token পাঠায়, তারা HTTP 403 পায়:
`Access token scope 'read' is insufficient; 'write' required.`
এই র্যাঙ্কটি হলো `scopeSatisfies`। এটি MCP টেবিল পরীক্ষা করে না, এবং MCP
ম্যাচারও এটি পরীক্ষা করে না।

| নেমস্পেস             | ক্রেডেনশিয়াল                                               | চেকার                 | পাস করলে যা অনুমোদিত হয়                             |
| :------------------- | :---------------------------------------------------------- | :-------------------- | :--------------------------------------------------- |
| API-key ম্যানেজমেন্ট | `api_keys.scopes`                                           | `hasManageScope`      | ওই Bearer key-এর জন্য ম্যানেজমেন্ট REST              |
| API-key সংযোজনমূলক   | একই অ্যারে, একটি হুবহু স্ট্রিং                              | নিচে উল্লিখিত হেল্পার | শুধু ওই একটি সক্ষমতা                                 |
| MCP টুল স্কোপসমূহ    | একই অ্যারে, নতুবা MCP `_meta`, নতুবা `OMNIROUTE_MCP_SCOPES` | `scopeMatches`        | এনফোর্সমেন্ট চালু হলে ওই টুল                         |
| Access token         | `oma_live_…`                                                | `scopeSatisfies`      | যে ম্যানেজমেন্ট রুটের মেথড ও পাথ ওই র্যাঙ্ক দাবি করে |

প্রতিটি ক্রেডেনশিয়াল তৈরি করার বিষয়টি
[ম্যানেজমেন্ট প্রমাণীকরণ](../guides/MANAGEMENT-AUTH.md)-এ ব্যাখ্যা করা হয়েছে।

#### API-key স্কোপসমূহ

একটি `api_keys.scopes` অ্যারে দুটি কাজে ব্যবহৃত হয়। এগুলো ভিন্ন ফাংশন ব্যবহার করে।

**ম্যানেজমেন্ট REST।** `manage` এবং `admin` হলো
`MANAGEMENT_API_KEY_SCOPES`-এর সদস্য (`src/shared/constants/managementScopes.ts`)।
ওই key-এর জন্য ম্যানেজমেন্ট রুট অনুমোদন করে `hasManageScope`। এসব রুটে `admin`
ম্যানেজমেন্ট-সক্ষম। এখানে `admin` শব্দটি access-token র্যাঙ্ক নয় এবং এটি
MCP টুল স্কোপে সম্প্রসারিত হয় না।

**সংযোজনমূলক স্ট্রিং।** প্রতিটির ক্ষেত্রে সদস্যতা হুবহু মেলে কি না তা পরীক্ষা করা হয়, এবং প্রতিটিই
`MANAGEMENT_API_KEY_SCOPES`-এর বাইরে থাকে।

| স্কোপ                          | পাস করলে যা অনুমোদিত হয়                                                                                                                                                  |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | কেবল non-loopback `/api/mcp/` LOCAL_ONLY ব্যতিক্রম (`hasMcpConnectOrManageScope`)। `manage` বা `admin`-সহ একটি key-ও সেই ব্যতিক্রমে পাস করে।                              |
| `self:usage`                   | এই key-এর জন্য `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`)। তৈরি করার সময় `POST /api/keys` এই স্কোপটি যোগ করে (`normalizeSelfServiceScopesForCreate`)। |
| `self:account-quota`           | ওই স্ট্যাটাস পেলোডের মধ্যে আপস্ট্রিম অ্যাকাউন্ট কোটা (`src/lib/usage/apiKeySelfService.ts`)। স্ট্যাটাস রুটটির জন্য তবুও `self:usage` আবশ্যক।                              |
| `policy:bypass-provider-quota` | এই key-এর inference কলগুলো provider-quota নীতি এড়িয়ে যায় (`src/sse/handlers/chat.ts`-এর `hasProviderQuotaBypassScope`)।                                                |

#### ম্যাচিং

ক্যাটালগটি হলো [MCP টুল স্কোপসমূহ](#mcp-tool-scopes)-এর অধীনে থাকা টেবিল।
`src/shared/constants/mcpScopes.ts`-এর `MCP_SCOPE_LIST`-কে ওই ক্যাটালগ হিসেবে
বিবেচনা করবেন না: এটি মূল typed subset। পরবর্তীতে যোগ করা টুলগুলো এর পাশে আরও
স্কোপ ঘোষণা করে (`read:notion`, `read:skills`, `read:local-corpus`, এবং টেবিলের বাকি স্কোপগুলো)।

`open-sse/mcp-server/scopeEnforcement.ts`-এর `evaluateToolScopes` কোনো কলের
প্রতিটি আবশ্যক স্কোপ যদি কোনো অনুমোদিত স্কোপের সঙ্গে মেলে, তাহলে কলটির অনুমতি দেয়:

- `*` প্রতিটি আবশ্যক স্কোপের সঙ্গে মেলে।
- `*` দিয়ে শেষ হওয়া কোনো অনুমোদিত স্কোপ, তারার আগের প্রিফিক্স দিয়ে শুরু হওয়া
  একটি আবশ্যক স্কোপের সঙ্গে মেলে। `read:*`, `read:compression`-এর সঙ্গে মেলে।
- অন্য সব অনুমোদিত স্কোপ কেবল হুবহু একই আবশ্যক স্ট্রিংয়ের সঙ্গে মেলে।

যে key-এর স্কোপ `["manage"]`, সেটি `read:compression`-এর জন্য `scopeMatches`-এ
ব্যর্থ হয়। একই কলের ক্ষেত্রে কেবল `admin`, `mcp:connect`, `read`, বা `write`
অনুমোদিত স্ট্রিং হিসেবে থাকলেও কলটি ব্যর্থ হয়। শেষে `*` থাকা ছাড়া MCP টুল
স্কোপগুলোর মধ্যে কোনো স্তরক্রম নেই।

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` না হলে এনফোর্সমেন্ট বন্ধ থাকে (ডিফল্ট
`false`)। এটি বন্ধ থাকা অবস্থায় `evaluateToolScopes` কলটির অনুমতি দেয় এবং
ক্যাটালগ এড়িয়ে যায়। এটি চালু থাকা অবস্থায় HTTP, Bearer key-এর
`api_keys.scopes`-কে `authInfo` হিসেবে ব্যবহার করে (দেখুন
[প্রতি-key HTTP স্কোপ বাইন্ডিং](#per-key-http-scope-binding-7895))।
যখন কোনো key স্কোপ নির্ধারিত হয় না, তখন অনুমোদিত সেটটি প্রথমে MCP `_meta`,
তারপর `OMNIROUTE_MCP_SCOPES`-এ ফল-থ্রু করে।

#### Access-token স্কোপসমূহ

`oma_live_…` token (`src/lib/accessTokens/scopes.ts`) `read`, `write`, অথবা
`admin` বহন করে। `scopeSatisfies` একটি র্যাঙ্ক: `admin`, `write` ও `read`
দুটোকেই অন্তর্ভুক্ত করে, এবং `write`, `read`-কে অন্তর্ভুক্ত করে। অজানা স্কোপ
কিছুই অন্তর্ভুক্ত করে না।

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ওই র্যাঙ্ককে
`inferRequiredScope`-এর (`src/server/authz/accessScopes.ts`) সঙ্গে তুলনা করে:

- `GET`, `HEAD`, এবং `OPTIONS`-এর জন্য `read` আবশ্যক।
- অন্য প্রতিটি মেথডের জন্য `write` আবশ্যক।
- `ADMIN_SCOPE_PREFIXES`-এর পাথগুলোর প্রতিটি মেথডের জন্য `admin` আবশ্যক। `/api/mcp`
  ওই তালিকায় রয়েছে, তাই একটি `write` access token দিয়েও MCP HTTP
  সারফেস কল করা যায় না।
- `ADMIN_MUTATION_PREFIXES`-এর পাথগুলোর ক্ষেত্রে কেবল mutation-এর জন্য `admin` আবশ্যক।

`PATCH /api/keys/{id}` একটি মিউটেশন এবং এটি ওই অ্যাডমিন তালিকাগুলোতে নেই, তাই একটি
`read` টোকেন 403 পায়:
`Access token scope 'read' is insufficient; 'write' required.`
একটি `write` বা `admin` অ্যাক্সেস টোকেন ওই রুটের শর্ত পূরণ করে। একটি ড্যাশবোর্ড JWT,
লুপব্যাক CLI machine-id টোকেন এবং `manage` বা `admin`-সহ একটি API key
অন্য শাখা অনুসরণ করে এবং এই র্যাঙ্ক দ্বারা সীমাবদ্ধ হয় না।

`/api/mcp`-এর জন্য `scopeSatisfies` পাস করা একটি অ্যাক্সেস টোকেন কেবল
ম্যানেজমেন্ট গেট অতিক্রম করেছে। টুল কলগুলো এরপরও API-key
স্কোপের বিপরীতে `scopeMatches` চালায়। অ্যাক্সেস-টোকেন র্যাঙ্ক `scopeMatches`-এর কোনো ইনপুট নয়।

### MCP টুল স্কোপ

স্কোপ প্রয়োগ `open-sse/mcp-server/scopeEnforcement.ts`-এ কেন্দ্রীভূত।
প্রতিটি টুলের জন্য নির্দিষ্ট স্কোপ প্রয়োজন:

| পরিধি                 | টুলসমূহ                                                                                                                                                                     |
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
| `read:obsidian`       | 13টি রিড টুল — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9টি রাইট টুল — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                           |

ওয়াইল্ডকার্ড স্কোপ সমর্থিত: `read:*` সব রিড-স্কোপ প্রদান করে, `*` পূর্ণ অ্যাক্সেস প্রদান করে।

### `mcp:connect` — সীমিত রুট সক্ষমতা (#7895)

নন-লুপব্যাক থেকে HTTP/SSE MCP ট্রান্সপোর্টে (`/api/mcp/*`) পৌঁছাতে
`/api/mcp/` LOCAL_ONLY ব্যতিক্রম প্রয়োজন (`docs/security/ROUTE_GUARD_TIERS.md` দেখুন)। ঐতিহাসিকভাবে
এই ব্যতিক্রমটি কেবল পূর্ণ `manage`/`admin`-স্কোপের API key গ্রহণ করত—যে কলারের
শুধু MCP-এর সঙ্গে যোগাযোগ করা দরকার, তার জন্য এটি অতিরিক্ত বিস্তৃত। `src/shared/constants/managementScopes.ts` এখন
`MCP_CONNECT_SCOPE = "mcp:connect"` এক্সপোর্ট করে: একটি সংযোজনমূলক, সীমিত স্কোপ (`SELF_USAGE_SCOPE`-এর
একই নজির অনুসরণ করে), যা কেবল
`src/server/authz/policies/management.ts`-এ `/api/mcp/` বাইপাস অনুমোদন করে—এটি অন্য কোনো management-route অ্যাক্সেস
প্রদান করে না এবং ইচ্ছাকৃতভাবে `MANAGEMENT_API_KEY_SCOPES`-এর বাইরে রাখা হয়েছে। `manage`/`admin`
ধারণকারী key এখনও অপরিবর্তিতভাবে ব্যতিক্রমটি অতিক্রম করে; দূরবর্তী, কেবল-MCP কলারদের জন্য
`mcp:connect` একটি কম-সুবিধাপ্রাপ্ত বিকল্প, যা `hasMcpConnectOrManageScope()`-এর মাধ্যমে পরীক্ষা করা হয়।

### প্রতি-key HTTP স্কোপ বাইন্ডিং (#7895)

HTTP/SSE-এর মাধ্যমে, `open-sse/mcp-server/httpTransport.ts` এখন
`resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)-এর মাধ্যমে কলারের প্রকৃত
`api_keys.scopes` নির্ধারণ করে এবং সেটি MCP SDK-এর `transport.handleRequest(req, { authInfo })`-এ পাঠায়, ফলে
প্রতিটি টুল কলে পৌঁছানো `extra.authInfo.scopes` Bearer key-এর নিজস্ব স্কোপ প্রতিফলিত করে।
`scopeEnforcement.ts`-এর `resolveCallerScopeContext()` ইতিমধ্যেই
`_meta` এবং `OMNIROUTE_MCP_SCOPES` env fallback-এর তুলনায় `authInfo`-কে অগ্রাধিকার দিত—এটি কেবল সেই প্রথম,
সর্বোচ্চ-অগ্রাধিকারপ্রাপ্ত উৎসটি পূরণ করে, যা আগে HTTP-এর মাধ্যমে পূরণ করা হতো না। যখন কোনো API key নির্ধারিত হয় না
(কোনো header নেই, অবৈধ key), তখন `authInfo` `undefined` থাকে এবং নির্ধারণ প্রক্রিয়া অপরিবর্তিতভাবে বিদ্যমান
`meta`/env চেইনে ফিরে যায়। এটি `OMNIROUTE_MCP_ENFORCE_SCOPES`-এর
ডিফল্ট পরিবর্তন করে না—প্রয়োগ এখনও স্পষ্টভাবে সক্রিয় করতে হবে; এই পরিবর্তনটি শুধু নিশ্চিত করে যে,
একবার তা সক্রিয় হলে প্রতি-key পাথ অগ্রাধিকার পায়। stdio-তে কোনো প্রতি-কলার পরিচয় নেই (
`mcpCallerIdentity.ts` দেখুন) এবং এটি প্রভাবিত হয়নি—এটি `_meta`/env fallback চেইনেই থাকে।

---

## এনভায়রনমেন্ট ভেরিয়েবলসমূহ

| ভেরিয়েবল                               | ডিফল্ট                                  | উদ্দেশ্য                                                                                                                  |
| :-------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                | অভ্যন্তরীণ OmniRoute API-তে কল করার সময় MCP সার্ভার যে বেস URL ব্যবহার করে                                               |
| `OMNIROUTE_API_KEY`                     | (খালি)                                  | অভ্যন্তরীণ API কলে `Authorization: Bearer` হিসেবে ফরওয়ার্ড করা API কী                                                    |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (শুধু `"true"` এটি সক্রিয় করে) | সক্রিয় থাকলে, অনুপস্থিত স্কোপ টুল কল প্রত্যাখ্যান করে এবং অডিট লগে `scope_denied:<reason>` লগ করে                        |
| `OMNIROUTE_MCP_SCOPES`                  | (খালি)                                  | ডিফল্টভাবে "উপলভ্য" হিসেবে বিবেচিত স্কোপগুলোর কমা-বিভাজিত অনুমোদন-তালিকা (কলকারী নিজস্ব স্কোপ প্রদান না করলে ব্যবহৃত হয়) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (সেট না করা = চালু)                     | `0/false/off/no`-তে সেট করা হলে, নিবন্ধনের সময় MCP বর্ণনা সংকোচন নিষ্ক্রিয় করে                                          |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (সেট না করা = চালু)                     | উপরের একই টগলের বিকল্প উপনাম                                                                                              |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                 | অভ্যন্তরীণ ব্যবস্থাপনা-সংক্রান্ত রিডের (স্বাস্থ্য, স্থিতিস্থাপকতা, কম্বো, কোটা, ব্যবহার) জন্য বাতিলকরণের সময়সীমা         |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                 | কোনো প্রোভাইডারের জন্য অপেক্ষারত হপগুলোর (`route_request`, `web_search`, `web_fetch`) বাতিলকরণের সময়সীমা                 |
| `MCP_TOOL_DENY`                         | (সেট না করা = কোনো ফিল্টার নেই)         | `tools/list` থেকে বাদ দেওয়ার জন্য কমা-বিভাজিত টুলের নাম (টুল-কার্ডিনালিটি হ্রাস — নিচে দেখুন)                            |
| `MCP_TOOL_ALLOW`                        | (সেট না করা = কোনো ফিল্টার নেই)         | একচেটিয়াভাবে রাখার জন্য কমা-বিভাজিত টুলের নাম (অনুমোদন-তালিকা মোড — নিচে দেখুন)                                          |
| `DATA_DIR`                              | `~/.omniroute`                          | হার্টবিট ফাইলটি `${DATA_DIR}/runtime/mcp-heartbeat.json`-এ লেখা হয়                                                       |

---

## বর্ণনা সংকোচন

ক্লায়েন্টের কাছে উন্মুক্ত মেটাডেটার পরিমাণ (এবং এর ফলে প্রম্পট কনটেক্সটের ব্যয়) কমাতে MCP টুল, প্রম্পট এবং রিসোর্স রেজিস্ট্রি নিবন্ধন/তালিকাভুক্তির সময় বর্ণনা সংকুচিত করতে পারে। বাস্তবায়নটি `open-sse/mcp-server/descriptionCompressor.ts`-এ রয়েছে এবং `createMcpServer()`-এর ভেতরের `compressMcpRegistryMetadata`-এর মাধ্যমে MCP সার্ভারের সঙ্গে সংযুক্ত।

- কাঠামোগত কনটেন্ট যাতে পরিবর্তিত না হয়, সে জন্য সংরক্ষিত-ব্লক এক্সট্র্যাকশনসহ (কোড স্প্যান, ফেন্সড ব্লক ইত্যাদি) Caveman রুলসেট (`getRulesForContext("all", "full")`) ব্যবহার করে বর্ণনার টেক্সটে সংকোচন চালানো হয়।
- `key_value` সেটিংস টেবিলের `compression.mcpDescriptionCompressionEnabled` মানের মাধ্যমে প্রতিটি ডিপ্লয়মেন্ট অনুযায়ী টগল করুন (ডিফল্ট: সক্রিয়) — UI-তে **অ্যানালিটিক্স → MCP বর্ণনা সংকোচন** হিসেবে প্রদর্শিত।
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` অথবা `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`—যেকোনো একটির মাধ্যমে পুরো প্রসেসজুড়ে টগল করুন।
- রিয়েলটাইম পরিসংখ্যান `analytics.mcpDescriptionCompression`-এর অধীনে `omniroute_compression_status`-এর মাধ্যমে প্রকাশ করা হয় এবং প্রকৃত প্রোভাইডার ব্যবহারের রসিদ থেকে পৃথক করতে `source: "mcp_metadata_estimate"` ট্যাগ করা হয়।

---

## টুল কার্ডিনালিটি হ্রাস (F4.3)

বিবরণ সংকোচন প্রতিটি টুলের মেটাডেটা ছোট করে; **টুল-কার্ডিনালিটি হ্রাস** আরও এক ধাপ এগিয়ে গিয়ে আদৌ _কতগুলো_ টুল ঘোষণা করা হয়, সেই সংখ্যা কমায়। `tools/list` ম্যানিফেস্টে কম টুল প্রকাশ করলে টুল ক্যাটালগের জন্য ক্লায়েন্টের মডেলকে প্রতি অনুরোধে যে টোকেন খরচ বহন করতে হয়, তা কমে যায় ("layer 5" সংকোচন)। বাস্তবায়নটি `open-sse/mcp-server/toolCardinality.ts`-এ থাকা একটি বিশুদ্ধ, স্টেটলেস ফিল্টার (`reduceToolManifest`), যা `createMcpServer()`-এর (`open-sse/mcp-server/server.ts`) রেজিস্ট্রেশন লুপে সংযুক্ত।

**অপ্ট-ইন, ডিফল্টভাবে বন্ধ।** দুটি এনভায়রনমেন্ট ভেরিয়েবলের অন্তত একটি সেট করা থাকলেই কেবল ফিল্টারটি চলে; কোনোটিই সেট না থাকলে সব 110টি টুল অপরিবর্তিতভাবে ঘোষণা করা হয়।

| ভেরিয়েবল        | মোড                                                                                         |
| :--------------- | :------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | ব্ল্যাকলিস্ট — কমা দিয়ে পৃথক করা টুলের নাম, যেগুলো সবসময় `tools/list` থেকে বাদ দেওয়া হয় |
| `MCP_TOOL_ALLOW` | অ্যালাউ-লিস্ট — কমা দিয়ে পৃথক করা টুলের নাম; কেবল এগুলোই রাখা হয়, বাকি সব বাদ দেওয়া হয়  |

`deny`, `allow`-এর চেয়ে অগ্রাধিকার পায়। নামগুলো কমা দিয়ে পৃথক করা হয়, শুরুর ও শেষের ফাঁকা স্থান সরানো হয় এবং খালি এন্ট্রি উপেক্ষা করা হয়। উদাহরণ:

```bash
# ক্যাটালগ থেকে দুটি টুল বাদ দিন
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# কেবল রাউটিং + কোটা টুলগুলো ঘোষণা করুন (অ্যালাউ-লিস্ট মোড)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**ফিল্টার করা টুল যেভাবে সরানো হয়:** রেজিস্ট্রেশন সবসময় সফল হয়; এরপর প্রোফাইল কোনো টুল প্রত্যাখ্যান করলে MCP SDK হ্যান্ডেলে সেটিকে `.disable()` করা হয়, ফলে এটি কখনোই `tools/list`-এ দেখা যায় না, কিন্তু ওয়্যারিং অক্ষত থাকে (পরিষ্কারভাবে সক্রিয়/নিষ্ক্রিয় করা যায়, পুনরায় রেজিস্ট্রেশনের প্রয়োজন নেই)। প্রোফাইল পার্সার হলো `readMcpToolProfileFromEnv(process.env)`, যা উভয় ভেরিয়েবল খালি থাকলে `null` (কোনো ফিল্টারিং নয়) রিটার্ন করে।

`reduceToolManifest`-এর অন্তর্নিহিত আরও সমৃদ্ধ `ToolProfile` কাঠামোটি স্কোপ-ইন্টারসেকশন ফিল্টারিং (`allowScopes`, যেখানে `read:*`-ধরনের ওয়াইল্ডকার্ড ম্যাচিং রয়েছে) এবং একটি নির্ধারিত `maxTools` সীমাও সমর্থন করে, তবে এই দুটি নিয়ন্ত্রণের জন্য রেজিস্ট্রেশনের সময় সম্পূর্ণ ম্যানিফেস্ট প্রয়োজন এবং বর্তমানে এগুলো এনভায়রনমেন্ট ভেরিয়েবলের মাধ্যমে **প্রকাশ করা হয় না** (একটি `tools/list`-স্তরের হুক ট্র্যাক করা ফলো-আপ)। হ্রাসের আগে ও পরে ম্যানিফেস্টের টোকেন খরচ তুলনা করতে `estimateManifestTokens()` ব্যবহার করা যায়।

---

## রানটাইম হার্টবিট

stdio ট্রান্সপোর্ট প্রতি 5 সেকেন্ডে `${DATA_DIR}/runtime/mcp-heartbeat.json`-এ লাইভনেস সংরক্ষণ করে। ড্যাশবোর্ড (`/api/mcp/status`) `online` নির্ধারণ করতে এই ফাইলের সঙ্গে PID লাইভনেস পড়ে। পরিবর্তে HTTP ট্রান্সপোর্ট ইন-প্রসেস `getMcpHttpStatus()` থেকে স্টেট রিপোর্ট করে (কোনো ফাইল লেখা হয় না)।

হার্টবিট স্ন্যাপশটে রয়েছে:

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

## অডিট লগিং

প্রতিটি টুল কল `open-sse/mcp-server/audit.ts` দ্বারা SQLite-এর `mcp_tool_audit` টেবিলে লগ করা হয়:

- টুলের নাম, আর্গুমেন্ট (প্রতি-টুল `auditLevel` অনুযায়ী হ্যাশ/সংক্ষিপ্ত করা), ফলাফল
- ms-এ সময়কাল, সাফল্য/ব্যর্থতার ফ্ল্যাগ, ত্রুটি বার্তা (প্রযোজ্য ক্ষেত্রে)
- API কী হ্যাশ, টাইমস্ট্যাম্প
- স্কোপ প্রত্যাখ্যানগুলো অনুপস্থিত স্কোপের তালিকাসহ `scope_denied:<reason>` হিসেবে লগ করা হয়

সাম্প্রতিক কল পরিদর্শন করতে ড্যাশবোর্ড অথবা `/api/mcp/audit` এবং `/api/mcp/audit/stats` REST এন্ডপয়েন্ট ব্যবহার করুন।

---

## ফাইলসমূহ

| ফাইল                                                                     | উদ্দেশ্য                                                                |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP সার্ভার ফ্যাক্টরি, stdio এন্ট্রি পয়েন্ট, স্কোপভিত্তিক টুল নিবন্ধন  |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ট্রান্সপোর্ট (সেশন ব্যবস্থাপনা)                   |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | টুল স্কোপ মূল্যায়ন এবং কলকারী নির্ধারণ                                 |
| `open-sse/mcp-server/audit.ts`                                           | টুল কল অডিট লগিং (`mcp_tool_audit`)                                     |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio হার্টবিট রাইটার (`mcp-heartbeat.json`)                            |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | টুল / প্রম্পট / রিসোর্স রেজিস্ট্রির জন্য বিবরণ কম্প্রেশন                |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod স্কিমা + টুল রেজিস্ট্রি (`MCP_TOOLS`, 45টি এন্ট্রি)                 |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Phase 2 + ক্যাশ + 1proxy টুল হ্যান্ডলার                                 |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | কম্প্রেশন টুল হ্যান্ডলার                                                |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | মেমোরি টুলের সংজ্ঞা (3টি টুল)                                           |
| `open-sse/mcp-server/tools/skillTools.ts`                                | স্কিল টুলের সংজ্ঞা (4টি টুল)                                            |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion কনটেক্সট সোর্স টুলের সংজ্ঞা (6টি টুল)                            |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | গেমিফিকেশন টুলের সংজ্ঞা (8টি টুল)                                       |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | প্লাগইন নিবন্ধন ও ব্যবস্থাপনা টুল (8টি টুল)                             |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` এন্ডপয়েন্ট                                           |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` এন্ডপয়েন্ট                                            |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ট্রান্সপোর্ট রুট                                     |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ট্রান্সপোর্ট রুট                      |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` অডিট লগ কোয়েরি                                        |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` সমষ্টিগত অডিট মেট্রিক্স                          |
| `src/lib/notion/api.ts`                                                  | Notion REST API ক্লায়েন্ট (পুনঃচেষ্টা, সময়সীমা, ত্রুটি শ্রেণিবিন্যাস) |
| `src/lib/db/notion.ts`                                                   | Notion টোকেন সংরক্ষণ (`key_value` টেবিল)                                |
| `src/app/api/settings/notion/route.ts`                                   | Notion সেটিংস API (GET/POST/DELETE)                                     |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion টোকেন ব্যবস্থাপনা UI                                             |
| `tests/unit/notion-api.test.ts`                                          | Notion API ক্লায়েন্ট পরীক্ষা (7টি)                                     |
| `tests/unit/notion-tools.test.ts`                                        | Notion টুলের স্কোপ প্রয়োগ পরীক্ষা (10টি)                               |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB মডিউল পরীক্ষা (3টি)                                           |
