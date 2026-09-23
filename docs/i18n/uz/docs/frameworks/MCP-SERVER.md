# OmniRoute MCP Server Documentation (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Marshrutlash, kesh, siqish, xotira, ko‘nikmalar, proksi, pul, Radar va kontekst manbasi operatsiyalarini qamrab oluvchi 110 ta vositaga ega Model Context Protocol serveri.
>
> Ishonchli manba: `open-sse/mcp-server/server.ts` faylidagi `countUniqueMcpTools()` funksiyasi **110 ta noyob vosita**ni hisoblaydi: 45 ta kanonik ta’rif (jumladan, oltita CCR hayotiy sikl vositasi, agent ko‘nikmalarining uchligi, `omniroute_radar_catalog` va `omniroute_x_search`), shuningdek, xotira (3), ko‘nikmalar (4), GitHub ko‘nikmalari (3), pul (6), geymifikatsiya (8), plaginlar (8), Notion (6), Obsidian (22), mahalliy korpus (3) va faqat RTK uchun mo‘ljallangan ikkita siqish vositasi.

## Oʻrnatish

OmniRoute MCP ichiga o‘rnatilgan. Uni quyidagicha ishga tushiring:

```bash
omniroute --mcp
```

Yoki open-sse transporti orqali:

```bash
# Oqimli HTTP transporti (port 20130)
omniroute --dev  # MCP /mcp endpointida avtomatik ishga tushadi
```

Dashboard serveri tomonidan jarayon ichida xizmat ko‘rsatiladigan HTTP transportlari (`sse` / `streamable-http`) sukut bo‘yicha
o‘chirilgan va avval ularni faqat `/dashboard/mcp` sahifasidan almashtirish mumkin edi. v3.8.51 versiyasidan
boshlab CLI ham xuddi shu imkoniyatlarga ega:

```bash
omniroute mcp status                                  # yoqilgan/onlayn holati, transport, vositalar soni
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # faol sse/streamable-http seanslarini qayta tiklaydi
```

`mcp enable`/`mcp disable` buyruqlari dashboard `/api/settings` orqali almashtiradigan ayni `mcpEnabled`
(va ixtiyoriy ravishda `mcpTransport`) sozlamasiga PATCH so‘rovini yuboradi. `mcp restart` esa
`POST /api/mcp/restart` ni chaqiradi: u faol `sse`/`streamable-http` seanslarini yakunlaydi, shunda keyingi
so‘rov toza holatda qayta ishga tushiriladi; MCP o‘chirilgan bo‘lsa `409`, `stdio` transporti uchun esa
`501` qaytaradi (stdio mijozlari o‘z quyi jarayonlarini o‘zlari boshqaradi — jarayon ichida qayta ishga
tushirish uchun deskriptor mavjud emas).

## Transportlar

MCP serveri uchta transportni taqdim etadi, ularning barchasi bir xil `createMcpServer()` fabrikasiga asoslangan:

| Transport         | Joylashuvi                                     | Qachon foydalanish kerak                                   |
| :---------------- | :--------------------------------------------- | :--------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE integratsiyalari (Claude Desktop, Cursor va boshqalar) |
| `sse`             | `httpTransport` orqali `POST/GET /api/mcp/sse` | Hodisalar oqimiga muhtoj brauzer/agent mijozlari           |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | Ko‘p seansli HTTP mijozlari (`mcp-session-id` sarlavhasi)  |

Faol HTTP transporti (`sse` yoki `streamable-http`) `mcpTransport` sozlamasi orqali tanlanadi. Transportlarni almashtirish boshqa transportdagi mavjud seanslarni yopadi.

### Masofadan kirish (manage doirasi orqali chetlab o‘tish)

`/api/mcp/*` LOCAL_ONLY darajasiga (`src/server/authz/routeGuard.ts`) kiradi — sukut bo‘yicha unga faqat loopback xostlar (`localhost`, `127.0.0.1`, `::1`) kira oladi. v3.8.2 versiyasidan boshlab, loopback bo‘lmagan mijozlar `manage` doirasiga ega kalitni o‘z ichiga olgan `Authorization: Bearer <api-key>` sarlavhasini taqdim etsa, ulanishi mumkin. Bu tunnel, teskari proksi yoki ommaviy xost nomi orqali masofaviy MCP serveriga kirishning yagona usulidir.

```bash
# manage doirasini bering: boshqaruv panelidagi API Keys sahifasini oching va kalit uchun
# "Management Access" parametrini yoqing yoki yaratishda POST scopes:["manage"] yuboring.

# Keyin masofaviy MCP mijozidan ulaning:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` doirasiga ega bo‘lmagan kalit (yoki Bearer mavjud bo‘lmasa) `403 LOCAL_ONLY` javobini qaytaradi. Yonma-yon joylashgan `/api/cli-tools/runtime/*` prefiksini ataylab chetlab o‘tib bo‘lmaydi — [Marshrut himoyasi darajalari — manage doirasi uchun istisno](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) bo‘limiga qarang.

## IDE konfiguratsiyasi

Claude Desktop, Cursor, Cline va mos MCP mijozlarini sozlash uchun [MCP mijozini sozlash](../guides/SETUP_GUIDE.md#mcp-client-configuration) bo‘limiga qarang.

---

## Asosiy vositalar (14) — 1-bosqich

| Vosita                          | Ruxsat doiralari      | Tavsif                                                                                                                                                       |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Ishlash vaqti, xotira, avtomatik uzgichlar, tezlik cheklovlari, kesh statistikasi                                                                            |
| `omniroute_list_combos`         | `read:combos`         | Strategiyalari bilan barcha sozlangan kombinatsiyalar (metrikalar ixtiyoriy)                                                                                 |
| `omniroute_get_combo_metrics`   | `read:combos`         | Muayyan kombinatsiya uchun unumdorlik metrikalari                                                                                                            |
| `omniroute_switch_combo`        | `write:combos`        | Kombinatsiyani faollashtirish yoki faolsizlantirish                                                                                                          |
| `omniroute_create_combo`        | `write:combos`        | Mavjud kombinatsiyalar API’si orqali tekshirilgan kombinatsiya yaratish                                                                                      |
| `omniroute_check_quota`         | `read:quota`          | Ishlatilgan/jami kvota, qolgan foiz, tiklanish vaqti, token holati                                                                                           |
| `omniroute_route_request`       | `execute:completions` | OmniRoute marshrutlashi orqali chat yakunlash so‘rovini yuborish                                                                                             |
| `omniroute_cost_report`         | `read:usage`          | Davr bo‘yicha xarajat hisoboti (seans/kun/hafta/oy)                                                                                                          |
| `omniroute_list_models_catalog` | `read:models`         | Imkoniyatlari, holati va narxlari bilan to‘liq modellar katalogi                                                                                             |
| `omniroute_radar_catalog`       | `read:radar`          | Mahalliy imzolangan Radar katalogi; provayder/oila bo‘yicha ixtiyoriy filtrlar                                                                               |
| `omniroute_tool_search`         | `read:tools`          | Ro‘yxatdan o‘tkazilgan MCP katalogidagi vositalarni topish                                                                                                   |
| `omniroute_web_search`          | `execute:search`      | Sozlangan qidiruv provayderlari orqali veb-qidiruv. X/Twitter uchun emas.                                                                                    |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok orqali X’da qidirish yoki Xquik API natijalari uchun `xquik-search`ni tanlash. Tanlangan server qismi uchun hisob ma’lumotlari talab qilinadi. |
| `omniroute_web_fetch`           | `execute:search`      | Sozlangan kontent olish provayderlari orqali veb-kontentni olish                                                                                             |

## Kengaytirilgan vositalar (11) — 2-bosqich

| Vosita                             | Ruxsat doiralari                     | Tavsif                                                                                                                               |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Zaxira variantlar daraxti bilan marshrutlashni sinov tariqasida simulyatsiya qilish                                                  |
| `omniroute_set_budget_guard`       | `write:budget`                       | Sifatni pasaytirish/bloklash/ogohlantirish amallariga ega seans budjeti                                                              |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Combo strategiyasini ishlash vaqtida yangilash (ustuvorlik/vaznlash/avtomatik/va hokazo)                                             |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` barqarorlik sozlamalarini qoʻllash                                                        |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Haqiqiy yuqori oqim chaqiruvi yordamida combodagi har bir provayderni jonli sinovdan oʻtkazish                                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 kechikishlari va avtomatik uzgich holati bilan har bir provayder boʻyicha metrikalar                                     |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Budjet/kechikish cheklovlarini hisobga olgan holda vazifa turi boʻyicha combo tavsiya qilish                                         |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Soʻrov nima uchun muayyan provayderga yoʻnaltirilganini tushuntirish (baholash omillari + zaxira variantlari)                        |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Seansning toʻliq surati: xarajat, tokenlar, yetakchi modellar/provayderlar, xatolar, budjet nazorati                                 |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Buzilgan combo havolalari/yetim qatorlar kabi maʼlumotlar bazasi nomuvofiqligini aniqlash (va ixtiyoriy ravishda avtomatik tuzatish) |
| `omniroute_sync_pricing`           | `pricing:write`                      | Tashqi manbalardan (LiteLLM) narxlash maʼlumotlarini sinxronlash; `dryRun` qoʻllab-quvvatlanadi                                      |

## Kesh vositalari (2)

| Vosita                  | Ruxsat doiralari | Tavsif                                                    |
| :---------------------- | :--------------- | :-------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`     | Semantik kesh, prompt keshi va idempotentlik statistikasi |
| `omniroute_cache_flush` | `write:cache`    | Keshni global miqyosda yoki imzo/model boʻyicha tozalash  |

## Siqish vositalari (13)

| Vosita                              | Ruxsat doiralari    | Tavsif                                                                                                                                               |
| :---------------------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Siqish sozlamalari, tahliliy xulosa va keshni hisobga oluvchi statistika (`analytics.mcpDescriptionCompression` metamaʼlumotlarini oʻz ichiga oladi) |
| `omniroute_compression_configure`   | `write:compression` | Siqish rejimi, chegara qiymati, maqsadli nisbat, tizim promptini saqlash va MCP tavsiflarini siqishni yoqish/oʻchirishni sozlash                     |
| `omniroute_set_compression_engine`  | `write:compression` | Faol mexanizmni (off/caveman/rtk/stacked) va Caveman/RTK intensivligini tanlash                                                                      |
| `omniroute_list_compression_combos` | `read:compression`  | Nomlangan siqish combolari va ularning mexanizm konveyerlarini roʻyxatlash                                                                           |
| `omniroute_compression_combo_stats` | `read:compression`  | Siqish combosi va mexanizm boʻyicha guruhlangan tahliliy maʼlumotlar                                                                                 |
| `omniroute_ccr_store`               | `write:compression` | Chaqiruvchi boʻyicha ajratilgan kontentni hajmi cheklangan xotiradagi CCR omborida saqlash hamda marker va `ccr://` havolasini qaytarish             |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR kontentini toʻliq yoki boshi, oxiri, satrlari, grep va statistika rejimlarida olish                                                              |
| `omniroute_ccr_inspect`             | `read:compression`  | Kontentni qaytarmasdan chaqiruvchiga tegishli CCR metamaʼlumotlarini tekshirish                                                                      |
| `omniroute_ccr_list`                | `read:compression`  | Chaqiruvchiga tegishli CCR bloklarining sahifalangan metamaʼlumotlarini roʻyxatlash                                                                  |
| `omniroute_ccr_delete`              | `write:compression` | Chaqiruvchiga tegishli CCR blokini oʻchirish                                                                                                         |
| `omniroute_ccr_stats`               | `read:compression`  | Chaqiruvchi doirasidagi xotira sarfi, hayot sikli hisoblagichlari va ombor cheklovlari haqida hisobot berish                                         |
| `omniroute_rtk_discover`            | `read:compression`  | Ixtiyoriy ravishda taqdim etilgan RTK chiqish namunalarida takrorlanuvchi shovqinni aniqlash                                                         |
| `omniroute_rtk_learn`               | `read:compression`  | Ixtiyoriy ravishda taqdim etilgan namunalardan koʻrib chiqish mumkin boʻlgan RTK filtri qoralamasini yaratish                                        |

CCR yozuvlari faqat xotirada saqlanadi va qayta ishga tushirilganda yoʻqoladi. Har bir blok 2 MiB,
har bir asosiy subyekt 16 MiB, global ombor esa 64 MiB bilan cheklangan. Yozuvlar uchun standart
TTL 24 soatni tashkil etadi (maksimal yetti kun). MCP orqali toʻliq olish 256 KiB bilan cheklangan;
kattaroq bloklardan diapazonli va grep rejimlari orqali foydalanish mumkin. Saqlash, olish,
roʻyxatlash, tekshirish, oʻchirish va statistika autentifikatsiya qilingan API kalitining asosiy subyekti
boʻyicha ajratilgan. Audit yozuvlari kontentni emas, faqat xeshlar va hajm metamaʼlumotlarini oʻz ichiga oladi.

`omniroute_compression_status` MCP tavsifi siqilishini
`analytics.mcpDescriptionCompression` ostida alohida hisobot qiladi. Bu qiymatlar MCP roʻyxatga olinadigan
tavsiflari (`tools`, `prompts`, `resources` va `resourceTemplates`) uchun metadata hajmi hisob-kitoblaridir; ular provayder foydalanish
kvitansiyalari emas va `source: "mcp_metadata_estimate"` bilan belgilangan.

### MCP Maxsus imkoniyatlar daraxti filtri (v3.8.0)

Yuqoridagi siqish vositalaridan alohida ravishda, OmniRoute agentga qaytarilishidan oldin MCP brauzer/maxsus imkoniyatlar vositalarining **vosita natijalarini**
siqadigan bajarilishdan keyingi filtrni oʻz ichiga oladi.
Bu filtrning oʻzi vosita emas — u batafsil maxsus imkoniyatlar daraxti yoki brauzer surati matnini (≥2000 belgi) oʻz ichiga olgan har qanday vosita natijasida
shaffof tarzda ishlaydi.

Asosiy xatti-harakatlar:

- Ketma-ket takrorlangan ≥30 ta turdosh satrni bosh qism + oxirgi qism xulosasiga yigʻadi
- Playwright/kompyuterdan foydalanish uchun zarur boʻlgan `[ref=eXX]` tayanchlarini saqlaydi
- Haddan tashqari katta matnni (>50,000 belgi) navigatsiya koʻrsatmasi bilan qatʼiy qisqartiradi
- Kutiladigan tejamkorlik: brauzer surati foydali yuklarida **60–80%**

Sozlash: global sozlamalardagi `compression.mcpAccessibility` (migratsiya 056).
Amalga oshirish: `open-sse/services/compression/engines/mcpAccessibility/`.
Toʻliq hujjatlar: [Siqish mexanizmlari — MCP Maxsus imkoniyatlar daraxti filtri](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Ushbu vositalar ortidagi ish vaqtidagi siqish modeli uchun [Siqish mexanizmlari](../compression/COMPRESSION_ENGINES.md) va [RTK siqish](../compression/RTK_COMPRESSION.md) boʻlimlariga
qarang.

## 1Proxy vositalari (3)

| Vosita                      | Ruxsat doiralari | Tavsif                                                                                  |
| :-------------------------- | :--------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies`   | 1proxy bozoridan bepul proksilarni olish (protokol/mamlakat/sifat/miqdor filtrlari)     |
| `omniroute_oneproxy_rotate` | `read:proxies`   | Strategiya bo‘yicha keyingi mavjud proksini olish (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies`   | Proksi havzasi statistikasi, sinxronlash holati, protokol va mamlakat bo‘yicha taqsimot |

## Xotira vositalari (3)

`open-sse/mcp-server/tools/memoryTools.ts` faylida belgilangan. Autentifikatsiya/ruxsat doirasi standart MCP ruxsat doiralari konveyeri orqali nazorat qilinadi.

| Vosita                    | Ruxsat doiralari | Tavsif                                                                                                          |
| :------------------------ | :--------------- | :-------------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`    | Token budjeti cheklovini qo‘llagan holda xotiralarni so‘rov / tur / API kaliti bo‘yicha qidirish                |
| `omniroute_memory_add`    | `write:memory`   | Yangi xotira yozuvini qo‘shish (`factual` / `episodic` / `procedural` / `semantic`)                             |
| `omniroute_memory_clear`  | `write:memory`   | API kaliti uchun xotiralarni tozalash, ixtiyoriy ravishda tur yoki `olderThan` vaqt tamg‘asi bo‘yicha filtrlash |

## Ko‘nikma vositalari (4)

`open-sse/mcp-server/tools/skillTools.ts` faylida belgilangan. `src/lib/skills/registry` + `src/lib/skills/executor` tomonidan qo‘llab-quvvatlanadi.

| Vosita                        | Ruxsat doiralari | Tavsif                                                                                                                 |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Ro‘yxatdan o‘tgan ko‘nikmalarni API kaliti, nomi yoki yoqilganlik holati bo‘yicha ixtiyoriy filtrlash bilan ko‘rsatish |
| `omniroute_skills_enable`     | `write:skills`   | Muayyan ko‘nikmani ID bo‘yicha yoqish yoki o‘chirish                                                                   |
| `omniroute_skills_execute`    | `execute:skills` | Taqdim etilgan kirish ma’lumotlari bilan ko‘nikmani bajarish va bajarilish yozuvini qaytarish                          |
| `omniroute_skills_executions` | `read:skills`    | Ko‘nikmalarning so‘nggi bajarilish tarixini ko‘rsatish                                                                 |

## Notion kontekst manbasi (6)

`open-sse/mcp-server/tools/notionTools.ts` faylida belgilangan. Token `src/lib/db/notion.ts` orqali `key_value` jadvalida saqlanadi. REST mijozi `src/lib/notion/api.ts` faylida. Sozlamalar API’si `src/app/api/settings/notion/route.ts` faylida. Boshqaruv paneli foydalanuvchi interfeysi `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` faylida.

Notion integratsiya tokeningizni Endpoint boshqaruv panelidagi **Kontekst manbalari** yorlig‘idan yoki REST API orqali sozlang:

```bash
# Tokenni o‘rnatish
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Holatni tekshirish
curl http://localhost:20128/api/settings/notion

# Ulanishni uzish
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Vosita                       | Ruxsat doiralari | Tavsif                                                                        |
| :--------------------------- | :--------------- | :---------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`    | Barcha sahifalar va ma’lumotlar bazalari bo‘ylab to‘liq matnli qidiruv        |
| `notion_get_page`            | `read:notion`    | Sahifani xususiyatlari bilan birga ID bo‘yicha olish                          |
| `notion_list_block_children` | `read:notion`    | Sahifa yoki blokning ichki bloklarini ko‘rsatish                              |
| `notion_query_database`      | `read:notion`    | Ma’lumotlar bazasini filtrlar, saralash va sahifalash bilan so‘rash           |
| `notion_get_database`        | `read:notion`    | Ma’lumotlar bazasi sxemasini ID bo‘yicha olish                                |
| `notion_append_blocks`       | `write:notion`   | Ota blokka ichki bloklarni qo‘shish (har bir so‘rov uchun ko‘pi bilan 100 ta) |

## Agent ko‘nikmalari katalogi vositalari (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` faylida belgilangan. `src/lib/agentSkills/catalog` tomonidan ta’minlanadi. Ushbu vositalar 45 ta yozuvdan iborat Agent Skills hujjatlari katalogini MCP mijozlari va tashqi agentlarga taqdim etadi. Qo‘llanish doirasi: `read:catalog`.

| Vosita                            | Qo‘llanish doiralari | Tavsif                                                                                                                                                                          |
| :-------------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog`       | Ixtiyoriy `category` (api\|cli) va `area` filtrlari bilan barcha 45 ta agent ko‘nikmasini ro‘yxatlaydi; metadata + qamrovni qaytaradi                                           |
| `omniroute_agent_skills_get`      | `read:catalog`       | Kanonik `id` orqali bitta ko‘nikmaning to‘liq metama’lumotlari + SKILL.md tarkibini oladi                                                                                       |
| `omniroute_agent_skills_coverage` | `read:catalog`       | Qamrov statistikasi: 23 ta API, 21 ta CLI va 1 ta konfiguratsiya ko‘nikmasidan nechtasining fayl tizimida SKILL.md fayllari borligi, katalogdagi jami sonlar bilan taqqoslanadi |

To‘liq katalog va tashqi agentlar undan qanday foydalanishi haqida [AGENT-SKILLS.md](./AGENT-SKILLS.md) fayliga qarang.

## Bog‘liq freymvorklar (v3.8.0)

Yuqoridagi MCP vositalari inventari (110 ta noyob vosita, `countUniqueMcpTools()` orqali hisoblangan) ataylab
ish vaqtidagi marshrutlash/kesh/siqish/xotira/ko‘nikmalar/proksi/kontekst manbasi amallari bilan
cheklangan. v3.8.0 versiyasida MCP serveri bilan birga ikkita yondosh freymvork taqdim etiladi va ular alohida hujjatlashtirilgan:

### Bulut agentlari

Bulut agentlari — LLM provayderlari uchun ishlatiladigan ulanish modeli orqali OmniRoute bilan
bog‘langan, jarayondan tashqarida ishlovchi AI dasturlash agentlari (codex-cloud, cursor-cloud, devin, jules). Ular
o‘zlarining REST interfeysi (`/api/v1/agents/*`) orqali taqdim etiladi va MCP vositalari katalogining
qismi **emas** — Bulut agentini chaqirish MCP qo‘llanish doirasini sarflamaydi.

- Amalga oshirish: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Hayot sikli: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Hujjatlar: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Himoya mexanizmlari

Himoya mexanizmlari — chat konveyeri ichida qo‘llanadigan bajarilishdan oldingi/keyingi filtrlar
(vision-bridge, pii-masker, prompt-injection). Ular MCP vositasi/marshrut qatlamiga yetib borishdan oldin
ishga tushadi va audit konveyeriga tuzilmali qoidabuzarliklarni chiqaradi; ular MCP vositalari sifatida chaqirilmaydi.

- Amalga oshirish: `src/lib/guardrails/`.
- Hujjatlar: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Bloklangandek ko‘rinayotgan MCP chaqiruvini nosozliklardan xoli qilishda MCP audit jurnalini
(`scope_denied:*` yozuvlari) ham, himoya mexanizmlarining audit izini ham tekshiring — so‘rov MCP qo‘llanish doirasini
majburlash qatlamiga yetib borishidan **oldin** himoya mexanizmi tomonidan rad etilishi mumkin.

---

## REST API so‘nggi nuqtalari

| So‘nggi nuqta          | Metod                 | Tavsif                                                                                                             | Autentifikatsiya                  |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| `/api/mcp/status`      | `GET`                 | Server holati: yurak urishi, HTTP transport holati, audit faolligi xulosasi                                        | Boshqaruv (sessiya/admin)         |
| `/api/mcp/tools`       | `GET`                 | Vositalar katalogi (nomi, tavsifi, qo‘llanish doiralari, bosqichi, manba so‘nggi nuqtalari)                        | Boshqaruv                         |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transport so‘nggi nuqtasi (`mcpEnabled` + `mcpTransport === "sse"` orqali nazorat qilinadi)                    | API kaliti + qo‘llanish doiralari |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Oqimli HTTP transporti (`mcp-session-id` sarlavhasidan foydalanadi; `DELETE` sessiyani yakunlaydi)                 | API kaliti + qo‘llanish doiralari |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` dagi audit jurnali yozuvlari (filtrlar: `limit`, `offset`, `tool`, `success`, `apiKeyId`)         | Boshqaruv                         |
| `/api/mcp/audit/stats` | `GET`                 | Umumlashtirilgan audit statistikasi (`totalCalls`, `successRate`, `avgDurationMs`, eng ko‘p ishlatilgan vositalar) | Boshqaruv                         |

Manba fayllari: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Sozlamalarda MCP serveri yoqilmaguncha (`mcpEnabled`) va tegishli `mcpTransport` tanlanmaguncha SSE hamda Oqimli HTTP transportlari bloklanadi. Agar noto‘g‘ri transport sozlangan bo‘lsa, marshrut sozlamalarni almashtirish bo‘yicha ko‘rsatma bilan HTTP 400 javobini qaytaradi.

---

## Autentifikatsiya va ruxsat doiralari

MCP vositalari API kaliti ruxsat doiralari orqali autentifikatsiya qilinadi. Ruxsat doiralarini majburiy qoʻllash
`open-sse/mcp-server/scopeEnforcement.ts` faylida markazlashtirilgan. Har bir vosita muayyan ruxsat doiralarini talab qiladi:

| Qamrov                | Vositalar                                                                                                                                                                            |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                    |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                            |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                               |
| `read:quota`          | `check_quota`                                                                                                                                                                        |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                               |
| `read:models`         | `list_models_catalog`                                                                                                                                                                |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                        |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                   |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                          |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                       |
| `read:cache`          | `cache_stats`                                                                                                                                                                        |
| `write:cache`         | `cache_flush`                                                                                                                                                                        |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                           |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                    |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                     |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                               |
| `read:memory`         | `memory_search`                                                                                                                                                                      |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                         |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                   |
| `write:skills`        | `skills_enable`                                                                                                                                                                      |
| `execute:skills`      | `skills_execute`                                                                                                                                                                     |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                     |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                              |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                            |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                     |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                       |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                   |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                      |
| `read:obsidian`       | 13 ta o‘qish vositasi — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 ta yozish vositasi — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                    |

Wildcard scope’lar qoʻllab-quvvatlanadi: `read:*` barcha oʻqish scope’larini beradi, `*` esa toʻliq kirish huquqini beradi.

### `mcp:connect` — tor doiradagi marshrut imkoniyati (#7895)

Loopback’dan tashqaridan HTTP/SSE MCP transportiga (`/api/mcp/*`) kirish uchun
`/api/mcp/` LOCAL_ONLY istisnosi talab qilinadi (`docs/security/ROUTE_GUARD_TIERS.md` fayliga qarang). Avval
bu istisno faqat toʻliq `manage`/`admin` scope’iga ega API kalitini qabul qilardi — bu
faqat MCP bilan aloqa qilishi kerak boʻlgan chaqiruvchi uchun haddan tashqari keng edi.
Endi `src/shared/constants/managementScopes.ts` fayli `MCP_CONNECT_SCOPE = "mcp:connect"` ni eksport
qiladi: bu faqat `src/server/authz/policies/management.ts` ichidagi `/api/mcp/` chetlab oʻtishiga
ruxsat beradigan qoʻshimcha, tor doiradagi scope (`SELF_USAGE_SCOPE` bilan bir xil yondashuv) — u
boshqa hech qanday boshqaruv marshrutiga kirish huquqini bermaydi va ataylab
`MANAGEMENT_API_KEY_SCOPES` tarkibiga KIRITILMAGAN. `manage`/`admin` ga ega kalit
hali ham istisnodan oʻzgarishsiz oʻtadi; `mcp:connect` faqat masofaviy MCP chaqiruvchilari
uchun kamroq imtiyozli muqobil boʻlib, `hasMcpConnectOrManageScope()` orqali tekshiriladi.

### Har bir kalit uchun HTTP scope’ini bogʻlash (#7895)

HTTP/SSE orqali `open-sse/mcp-server/httpTransport.ts` endi chaqiruvchining haqiqiy
`api_keys.scopes` qiymatini `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
orqali aniqlaydi va uni MCP SDK’ning `transport.handleRequest(req, { authInfo })` metodiga uzatadi, shuning uchun
har bir vosita chaqiruviga yetib boradigan `extra.authInfo.scopes` Bearer kalitining oʻz scope’larini
aks ettiradi. `scopeEnforcement.ts` ichidagi `resolveCallerScopeContext()` allaqachon `authInfo` ni
`_meta` va `OMNIROUTE_MCP_SCOPES` muhit oʻzgaruvchisiga qaytish variantidan ustun qoʻyardi — bu oʻzgarish faqat
ilgari HTTP orqali toʻldirilmagan birinchi, eng yuqori ustuvorlikdagi manbani toʻldiradi.
Hech qanday API kaliti aniqlanmasa (sarlavha yoʻq, kalit yaroqsiz), `authInfo` `undefined` boʻlib qoladi va aniqlash
jarayoni mavjud `meta`/muhit zanjiriga oʻzgarishsiz oʻtadi. Bu `OMNIROUTE_MCP_ENFORCE_SCOPES` ning
standart qiymatini oʻZGARTIRMAYDI — majburiy tekshiruv hali ham aniq yoqilishi kerak; bu oʻzgarish faqat
u yoqilgach, har bir kalitga xos yoʻlga ustuvorlik beradi. stdio’da har bir chaqiruvchiga xos identifikatsiya yoʻq
(`mcpCallerIdentity.ts` fayliga qarang) va unga bu taʼsir qilmaydi — u `_meta`/muhitga qaytish zanjiridan foydalanishda davom etadi.

---

## Muhit o‘zgaruvchilari

| O‘zgaruvchi                             | Standart qiymat                 | Maqsad                                                                                                                                                                      |
| :-------------------------------------- | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`        | MCP serveri OmniRoute ichki API’lariga murojaat qilganda foydalanadigan asosiy URL                                                                                          |
| `OMNIROUTE_API_KEY`                     | (bo‘sh)                         | Ichki API chaqiruvlariga `Authorization: Bearer` sifatida uzatiladigan API kaliti                                                                                           |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (faqat `"true"` yoqadi) | Yoqilganda yetishmayotgan vakolat doiralari vosita chaqiruvlarini rad etadi va audit jurnaliga `scope_denied:<reason>` yozadi                                               |
| `OMNIROUTE_MCP_SCOPES`                  | (bo‘sh)                         | Standart bo‘yicha «mavjud» deb hisoblanadigan, vergul bilan ajratilgan vakolat doiralari ruxsat ro‘yxati (chaqiruvchi o‘z vakolat doiralarini taqdim etmaganda ishlatiladi) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (o‘rnatilmagan = yoqilgan)      | `0/false/off/no` qiymatiga o‘rnatilganda ro‘yxatdan o‘tkazish vaqtida MCP tavsiflarini siqishni o‘chiradi                                                                   |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (o‘rnatilmagan = yoqilgan)      | Yuqoridagi almashtirgich uchun muqobil taxallus                                                                                                                             |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                         | Ichki boshqaruv o‘qishlari (holat, barqarorlik, kombinatsiyalar, kvota, foydalanish) uchun bekor qilish vaqti limiti                                                        |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                         | Provayderni kutadigan bosqichlar (`route_request`, `web_search`, `web_fetch`) uchun bekor qilish vaqti limiti                                                               |
| `MCP_TOOL_DENY`                         | (o‘rnatilmagan = filtr yo‘q)    | `tools/list` ro‘yxatidan olib tashlanadigan, vergul bilan ajratilgan vosita nomlari (vositalar sonini kamaytirish — quyiga qarang)                                          |
| `MCP_TOOL_ALLOW`                        | (o‘rnatilmagan = filtr yo‘q)    | Faqat saqlab qolinadigan, vergul bilan ajratilgan vosita nomlari (ruxsat ro‘yxati rejimi — quyiga qarang)                                                                   |
| `DATA_DIR`                              | `~/.omniroute`                  | Faollik signali fayli `${DATA_DIR}/runtime/mcp-heartbeat.json` manziliga yoziladi                                                                                           |

---

## Tavsiflarni siqish

MCP vositalari, ko‘rsatmalari va resurslari reyestrlari mijozlarga taqdim etiladigan metama’lumotlar hajmini (va shu orqali ko‘rsatma konteksti xarajatini) kamaytirish uchun ro‘yxatdan o‘tkazish/ro‘yxatni olish vaqtida tavsiflarni siqishi mumkin. Amalga oshirish kodi `open-sse/mcp-server/descriptionCompressor.ts` faylida joylashgan va `createMcpServer()` ichidagi `compressMcpRegistryMetadata` orqali MCP serveriga ulangan.

- Siqish Caveman qoidalar to‘plamidan (`getRulesForContext("all", "full")`) foydalangan holda tavsif matniga qo‘llanadi; bunda saqlanadigan bloklar (kod parchalari, chegaralangan bloklar va boshqalar) ajratib olinadi, shu sababli tuzilmaviy tarkib o‘zgartirilmaydi.
- Har bir joylashtirish uchun `key_value` sozlamalar jadvalidagi `compression.mcpDescriptionCompressionEnabled` qiymati orqali almashtiring (standart: yoqilgan) — foydalanuvchi interfeysida **Tahlil → MCP tavsiflarini siqish** ko‘rinishida taqdim etiladi.
- Butun jarayon miqyosida `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` yoki `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` orqali almashtiring.
- Real vaqt statistikasi `analytics.mcpDescriptionCompression` ostidagi `omniroute_compression_status` orqali taqdim etiladi va haqiqiy provayder foydalanish kvitansiyalaridan farqlash uchun `source: "mcp_metadata_estimate"` tegi bilan belgilanadi.

---

## Vositalar sonini kamaytirish (F4.3)

Tavsifni siqish har bir vositaning metamaʼlumotlarini qisqartiradi; **vositalar sonini kamaytirish** esa bundan ham oldinga borib, umuman eʼlon qilinadigan vositalar _sonini_ kamaytiradi. `tools/list` manifestida kamroq vositani ko‘rsatish mijoz modeli vositalar katalogi uchun har bir so‘rovda sarflaydigan tokenlar sonini kamaytiradi (“5-qatlam” siqilishi). Amalga oshirish `open-sse/mcp-server/toolCardinality.ts` faylidagi (`reduceToolManifest`) sof, holatsiz filtr bo‘lib, `createMcpServer()` ichidagi (`open-sse/mcp-server/server.ts`) ro‘yxatdan o‘tkazish sikliga ulangan.

**Ixtiyoriy, standart holatda o‘chiq.** Filtr faqat ikkita muhit o‘zgaruvchisidan kamida bittasi o‘rnatilganda ishlaydi; ikkalasi ham o‘rnatilmagan bo‘lsa, barcha 110 ta vosita o‘zgarishsiz eʼlon qilinadi.

| O‘zgaruvchi      | Rejim                                                                                                            |
| :--------------- | :--------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Qora ro‘yxat — `tools/list`dan doimo chiqarib tashlanadigan, vergul bilan ajratilgan vosita nomlari              |
| `MCP_TOOL_ALLOW` | Ruxsat ro‘yxati — vergul bilan ajratilgan vosita nomlari; faqat shular saqlanadi, qolganlari chiqarib tashlanadi |

`deny` `allow`dan ustun turadi. Nomlar vergul bilan ajratiladi, chetlaridagi bo‘shliqlar olib tashlanadi va bo‘sh elementlar eʼtiborsiz qoldiriladi. Misollar:

```bash
# Katalogdan ikkita vositani chiqarib tashlash
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Faqat marshrutlash va kvota vositalarini eʼlon qilish (ruxsat ro‘yxati rejimi)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Filtrlangan vositalar qanday olib tashlanadi:** ro‘yxatdan o‘tkazish har doim muvaffaqiyatli yakunlanadi; profil rad etgan vosita keyin MCP SDK tutqichida `.disable()` qilinadi, shu sababli u `tools/list`da hech qachon ko‘rinmaydi, biroq ulanishlar o‘z holicha qoladi (toza yoqish/o‘chirish, qayta ro‘yxatdan o‘tkazishsiz). Profil tahlilchisi `readMcpToolProfileFromEnv(process.env)` bo‘lib, ikkala o‘zgaruvchi ham bo‘sh bo‘lganda `null` (filtrlash yo‘q) qaytaradi.

`reduceToolManifest` ortidagi yanada boy `ToolProfile` tuzilmasi, shuningdek, qamrovlar kesishmasi bo‘yicha filtrlashni (`allowScopes`, `read:*` uslubidagi joker belgi mosligi bilan) va deterministik `maxTools` cheklovini qo‘llab-quvvatlaydi, ammo bu ikki sozlama ro‘yxatdan o‘tkazish vaqtida to‘liq manifestni talab qiladi va hozirda muhit o‘zgaruvchilari orqali **taqdim etilmaydi** (`tools/list` darajasidagi hook rejalashtirilgan keyingi vazifa hisoblanadi). Manifestning kamaytirishdan oldingi va keyingi token xarajatini solishtirish uchun `estimateManifestTokens()` mavjud.

---

## Ishlash muhiti yurak urishi

Stdio transporti har 5 soniyada faol holat maʼlumotlarini `${DATA_DIR}/runtime/mcp-heartbeat.json` fayliga saqlaydi. Boshqaruv paneli (`/api/mcp/status`) `online` holatini aniqlash uchun ushbu faylni va PID jarayonining faolligini tekshiradi. HTTP transportlari esa holatni jarayon ichidagi `getMcpHttpStatus()` orqali bildiradi (faylga yozilmaydi).

Yurak urishi lahzaviy nusxasi quyidagilarni o‘z ichiga oladi:

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

## Audit jurnali

Har bir vosita chaqiruvi `open-sse/mcp-server/audit.ts` tomonidan SQLiteʼdagi `mcp_tool_audit` jadvaliga yoziladi:

- Vosita nomi, argumentlar (har bir vosita uchun `auditLevel`ga muvofiq xeshlangan/qisqartirilgan), natija
- Millisekundlardagi davomiylik, muvaffaqiyat/muvaffaqiyatsizlik belgisi, xato xabari (tegishli hollarda)
- API kaliti xeshi, vaqt tamg‘asi
- Qamrov bo‘yicha rad etishlar yetishmayotgan qamrovlar ro‘yxati bilan `scope_denied:<reason>` ko‘rinishida qayd etiladi

So‘nggi chaqiruvlarni ko‘rib chiqish uchun boshqaruv paneli yoki `/api/mcp/audit` va `/api/mcp/audit/stats` REST endpointlaridan foydalaning.

---

## Fayllar

| Fayl                                                                     | Maqsadi                                                                                     |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `open-sse/mcp-server/server.ts`                                          | MCP server fabrikasi, stdio kirish nuqtasi, doira bo‘yicha vositalarni ro‘yxatdan o‘tkazish |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transporti (sessiyalarni boshqarish)                                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Vosita doirasini baholash va chaqiruvchini aniqlash                                         |
| `open-sse/mcp-server/audit.ts`                                           | Vosita chaqiruvlari auditini qayd etish (`mcp_tool_audit`)                                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio yurak urishi yozuvchisi (`mcp-heartbeat.json`)                                        |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Vosita / prompt / resurs reyestrlari uchun tavsiflarni siqish                               |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod sxemalari + vositalar reyestri (`MCP_TOOLS`, 45 ta yozuv)                               |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 2-bosqich + kesh + 1proxy vositalari ishlov beruvchilari                                    |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Siqish vositalari ishlov beruvchilari                                                       |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Xotira vositalari ta’riflari (3 ta vosita)                                                  |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Ko‘nikma vositalari ta’riflari (4 ta vosita)                                                |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion kontekst manbasi vositalari ta’riflari (6 ta vosita)                                 |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Geymifikatsiya vositalari ta’riflari (8 ta vosita)                                          |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Plaginlarni ro‘yxatdan o‘tkazish va boshqarish vositalari (8 ta vosita)                     |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` endpointi                                                                 |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` endpointi                                                                  |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE transport marshruti                                                      |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP transport marshruti                                       |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` audit jurnalini so‘rash                                                    |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` jamlangan audit ko‘rsatkichlari                                      |
| `src/lib/notion/api.ts`                                                  | Notion REST API mijozi (qayta urinish, vaqt chegarasi, xatolarni tasniflash)                |
| `src/lib/db/notion.ts`                                                   | Notion tokenini saqlash (`key_value` jadvali)                                               |
| `src/app/api/settings/notion/route.ts`                                   | Notion sozlamalari API’si (GET/POST/DELETE)                                                 |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion tokenini boshqarish foydalanuvchi interfeysi                                         |
| `tests/unit/notion-api.test.ts`                                          | Notion API mijozi testlari (7 ta)                                                           |
| `tests/unit/notion-tools.test.ts`                                        | Notion vositalari doirasini majburiy qo‘llash testlari (10 ta)                              |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB moduli testlari (3 ta)                                                            |
