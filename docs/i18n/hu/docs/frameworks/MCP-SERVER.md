# OmniRoute MCP Server Documentation (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Modellkontext protokoll szerver 110 eszközzel az útválasztás, gyorsítótár, tömörítés, memória, képességek, proxy, pool, Radar és kontextusforrás műveletek terén.
>
> Az igazság forrása: az `open-sse/mcp-server/server.ts` **110 egyedi eszközt** számol ki a `countUniqueMcpTools()` segítségével: 45 kanonikus definíció (beleértve a hat CCR életciklus eszközt, az ügynök-képességek hármasát, az `omniroute_radar_catalog` és az `omniroute_x_search`), plusz memória (3), képességek (4), GitHub képességek (3), pool (6), gamification (8), bővítmények (8), Notion (6), Obsidian (22), helyi korpusz (3), és két RTK-only tömörítő eszköz.

## Telepítés

Az OmniRoute MCP beépített. Indítsa el a következővel:

```bash
omniroute --mcp
```

Vagy az open-sse transzporton keresztül:

```bash
# HTTP streamelhető transzport (20130-as port)
omniroute --dev  # Az MCP automatikusan elindul a /mcp végponton
```

Az HTTP transzportok (`sse` / `streamable-http`, amelyeket a műszerfal szerver folyamaton belül szolgál ki)
alapértelmezetten ki vannak kapcsolva, és korábban csak a `/dashboard/mcp` oldalon lehetett őket váltani. A v3.8.51-es verziótól
a CLI is rendelkezik ezzel a funkcióval:

```bash
omniroute mcp status                                  # engedélyezve/online, transzport, eszközök száma
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # visszaállítja az aktív sse/streamable-http munkameneteket
```

Az `mcp enable`/`mcp disable` ugyanazt az `mcpEnabled` (és opcionálisan `mcpTransport`) beállítást PATCH-eli,
amit a műszerfal a `/api/settings` útvonalon keresztül vált. Az `mcp restart` meghívja a `POST /api/mcp/restart` végpontot:
ez leállítja az aktív `sse`/`streamable-http` munkameneteket, így a következő kérés tisztán inicializálódik,
`409`-et ad vissza, ha az MCP le van tiltva, és `501`-et a `stdio` transzport esetén (a stdio kliensek saját
alfolyamatot kezelnek – nincs folyamaton belüli kezelő a újraindításhoz).

## Transzportok

Az MCP szerver három transzportot tesz elérhetővé, mindegyiket ugyanaz a `createMcpServer()` gyár támogatja:

| Transzport        | Hol                                         | Mikor használjuk                                             |
| :---------------- | :------------------------------------------ | :----------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE integrációk (Claude Desktop, Cursor stb.)                |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Böngésző/ügynök kliensek, amelyek eseményfolyamot igényelnek |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Több munkamenetes HTTP kliensek (`mcp-session-id` fejléc)    |

Az aktív HTTP transzportot (`sse` vagy `streamable-http`) az `mcpTransport` beállítás választja ki. A transzportok váltása bezárja a meglévő munkameneteket a másik transzporton.

### Távoli hozzáférés (manage-scope bypass)

Az `/api/mcp/*` a LOCAL_ONLY szinten található (`src/server/authz/routeGuard.ts`) – alapértelmezetten csak a loopback hostok (`localhost`, `127.0.0.1`, `::1`) érhetik el. A v3.8.2-es verziótól kezdve a nem loopback kliensek is csatlakozhatnak, ha `Authorization: Bearer <api-key>` fejlécet mutatnak be, amelynek kulcsa `manage` hatókörrel rendelkezik. Ez az egyetlen módja annak, hogy egy távoli MCP szervert elérjünk egy alagúton, fordított proxyn vagy nyilvános hosztnéven keresztül.

```bash
# Adjon manage hatókört: nyissa meg a műszerfal API kulcsok oldalát, és kapcsolja be
# a "Management Access" opciót a kulcson, vagy POST-olja a scopes:["manage"]-t létrehozáskor.

# Ezután csatlakozzon egy távoli MCP kliensről:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Egy nem `manage` kulcs (vagy Bearer hiánya) `403 LOCAL_ONLY` hibát ad vissza. A `/api/cli-tools/runtime/*` testvér előtag szándékosan NEM megkerülhető – lásd [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE konfiguráció

Lásd az [MCP kliens konfigurációt](../guides/SETUP_GUIDE.md#mcp-client-configuration) a Claude Desktop, Cursor, Cline és kompatibilis MCP kliens beállításához.

---

## Alapvető eszközök (14) — 1. fázis

| Eszköz                          | Hatókörök             | Leírás                                                                                                                                                                              |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Üzemidő, memória, megszakítók, sebességkorlátok, gyorsítótár statisztikák                                                                                                           |
| `omniroute_list_combos`         | `read:combos`         | Minden konfigurált kombináció stratégiákkal (opcionális metrikák)                                                                                                                   |
| `omniroute_get_combo_metrics`   | `read:combos`         | Teljesítménymetrikák egy adott kombinációhoz                                                                                                                                        |
| `omniroute_switch_combo`        | `write:combos`        | Kombináció aktiválása vagy deaktiválása                                                                                                                                             |
| `omniroute_create_combo`        | `write:combos`        | Érvényesített kombináció létrehozása a meglévő kombináció API-n keresztül                                                                                                           |
| `omniroute_check_quota`         | `read:quota`          | Felhasznált/összes kvóta, fennmaradó százalék, visszaállítási idő, token állapot                                                                                                    |
| `omniroute_route_request`       | `execute:completions` | Csevegés befejezés küldése OmniRoute útválasztáson keresztül                                                                                                                        |
| `omniroute_cost_report`         | `read:usage`          | Költségjelentés időszak szerint (munkamenet/nap/hét/hónap)                                                                                                                          |
| `omniroute_list_models_catalog` | `read:models`         | Teljes modellkatalógus képességekkel, állapottal, árazással                                                                                                                         |
| `omniroute_radar_catalog`       | `read:radar`          | Helyi aláírt Radar katalógus; opcionális szolgáltató/család szűrők                                                                                                                  |
| `omniroute_tool_search`         | `read:tools`          | Eszközök felfedezése a regisztrált MCP katalógusból                                                                                                                                 |
| `omniroute_web_search`          | `execute:search`      | Webes keresés a konfigurált keresésszolgáltatókon keresztül. Nem X/Twitter.                                                                                                         |
| `omniroute_x_search`            | `execute:search`      | Keresés X-en keresztül xAI/SuperGrok segítségével, vagy válassza az `xquik-search` lehetőséget az Xquik API eredményeihez. Hitelesítő adatok szükségesek a kiválasztott backendhez. |
| `omniroute_web_fetch`           | `execute:search`      | Webes tartalom lekérése a konfigurált lekérési szolgáltatókon keresztül                                                                                                             |

## Haladó Eszközök (11) — 2. Fázis

| Eszköz                             | Hatáskörök                           | Leírás                                                                                                                               |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Szárazon futó útválasztási szimuláció tartalék fával                                                                                 |
| `omniroute_set_budget_guard`       | `write:budget`                       | Munkamenet költségkeret leépítési/blokkolási/riasztási művelettel                                                                    |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Kombinált stratégia frissítése futásidőben (prioritás/súlyozott/auto/stb.)                                                           |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `agresszív` / `kiegyensúlyozott` / `konzervatív` ellenállóképességi előbeállítás alkalmazása                                         |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Élő teszt minden szolgáltató számára egy kombinációban, valós upstream hívás használatával                                           |
| `omniroute_get_provider_metrics`   | `read:health`                        | Szolgáltatónkénti metrikák p50/p95/p99 késleltetéssel és megszakító állapotával                                                      |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Kombináció ajánlása feladattípus szerint költségkeret/késleltetési korlátokkal                                                       |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Elmagyarázza, miért lett egy kérés egy szolgáltatóhoz irányítva (pontozási tényezők + tartalékok)                                    |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Teljes munkamenet pillanatkép: költség, tokenek, legjobb modellek/szolgáltatók, hibák, költségkeret őr                               |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Adatbázis-eltérések diagnosztizálása (és opcionálisan automatikus javítása), mint például törött kombinált hivatkozások / árva sorok |
| `omniroute_sync_pricing`           | `pricing:write`                      | Árazási adatok szinkronizálása külső forrásokból (LiteLLM); támogatja a `dryRun` funkciót                                            |

## Gyorsítótár Eszközök (2)

| Eszköz                  | Hatáskörök    | Leírás                                                                   |
| :---------------------- | :------------ | :----------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Szemantikus gyorsítótár, prompt-gyorsítótár és idempotencia statisztikák |
| `omniroute_cache_flush` | `write:cache` | Gyorsítótár ürítése globálisan vagy aláírás/modell szerint               |

## Tömörítési Eszközök (13)

| Eszköz                              | Hatáskörök          | Leírás                                                                                                                                                  |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Tömörítési beállítások, analitikai összefoglaló és gyorsítótár-tudatos statisztikák (tartalmazza az `analytics.mcpDescriptionCompression` metaadatokat) |
| `omniroute_compression_configure`   | `write:compression` | Tömörítési mód, küszöbérték, célarány, rendszer-prompt megőrzés, MCP leírás tömörítés kapcsoló konfigurálása                                            |
| `omniroute_set_compression_engine`  | `write:compression` | Az aktív motor kiválasztása (ki/caveman/rtk/stacked) és a Caveman/RTK intenzitás beállítása                                                             |
| `omniroute_list_compression_combos` | `read:compression`  | Nevesített tömörítési kombinációk és motor pipeline-jaik listázása                                                                                      |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitika tömörítési kombináció és motor szerint csoportosítva                                                                                          |
| `omniroute_ccr_store`               | `write:compression` | Hívó által izolált tartalom tárolása a korlátozott, memóriában lévő CCR tárolóban, és egy jelölő, valamint `ccr://` hivatkozás visszaadása              |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR tartalom lekérése teljes egészében, vagy fej, farok, sorok, grep és statisztikai módokban                                                           |
| `omniroute_ccr_inspect`             | `read:compression`  | Hívó tulajdonában lévő CCR metaadatok ellenőrzése tartalom visszaadása nélkül                                                                           |
| `omniroute_ccr_list`                | `read:compression`  | Hívó tulajdonában lévő CCR blokkok lapozott metaadatainak listázása                                                                                     |
| `omniroute_ccr_delete`              | `write:compression` | Hívó tulajdonában lévő CCR blokk törlése                                                                                                                |
| `omniroute_ccr_stats`               | `read:compression`  | Hívó-specifikus memóriahasználat, életciklus-számlálók és tárolási korlátok jelentése                                                                   |
| `omniroute_rtk_discover`            | `read:compression`  | Ismétlődő zaj felfedezése az opt-in RTK kimeneti mintákban                                                                                              |
| `omniroute_rtk_learn`               | `read:compression`  | Áttekinthető RTK szűrőtervezet generálása opt-in mintákból                                                                                              |

A CCR bejegyzések csak memóriában léteznek, és újraindításkor eltűnnek. Minden blokk 2 MiB-ra, minden fő entitás 16 MiB-ra, és a globális tároló 64 MiB-ra van korlátozva. A bejegyzések alapértelmezés szerint 24 órás TTL-lel rendelkeznek (maximum hét nap). A teljes MCP lekérés 256 KiB-ra korlátozott; a nagyobb blokkok továbbra is elérhetők a tartományi és grep módokon keresztül. A tárolás, lekérés, listázás, ellenőrzés, törlés és statisztikák az autentikált API-kulcs fő entitása által vannak izolálva. Az audit rekordok hash-eket és méret metaadatokat tartalmaznak, soha nem tartalmat.

`omniroute_compression_status` külön jelenti az MCP leírás tömörítését az `analytics.mcpDescriptionCompression` alatt. Ezek az értékek az MCP listázható leírások (`tools`, `prompts`, `resources`, és `resourceTemplates`) metaadat-méret becslései; nem szolgáltatói használati nyugták, és `source: "mcp_metadata_estimate"` jelöléssel vannak ellátva.

### MCP akadálymentességi fa szűrő (v3.8.0)

A fenti tömörítő eszközöktől elkülönülten az OmniRoute tartalmaz egy végrehajtás utáni szűrőt, amely tömöríti az MCP böngésző/akadálymentességi eszközök **eszközeredményeit**, mielőtt azok visszakerülnének az ügynökhöz. Ez a szűrő önmagában nem eszköz – átláthatóan fut minden olyan eszközeredményen, amely részletes akadálymentességi fa vagy böngésző-pillanatkép szöveget tartalmaz (≥2000 karakter).

Főbb viselkedések:

- Összecsukja a ≥30 egymást követő ismétlődő testvérsort egy fej + farok összefoglalóvá
- Megőrzi a Playwright/számítógép-használat által megkövetelt `[ref=eXX]` horgonyokat
- Keményen levágja a túlméretezett szöveget (>50 000 karakter) egy navigációs tippel
- Várható megtakarítás: **60–80%** a böngésző-pillanatkép hasznos terhelésén

Konfiguráció: `compression.mcpAccessibility` a globális beállításokban (056-os migráció).
Implementáció: `open-sse/services/compression/engines/mcpAccessibility/`.
Teljes dokumentáció: [Tömörítő motorok — MCP akadálymentességi fa szűrő](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Lásd [Tömörítő motorok](../compression/COMPRESSION_ENGINES.md) és [RTK tömörítés](../compression/RTK_COMPRESSION.md) ezen eszközök mögötti futásidejű tömörítési modelljéhez.

## 1Proxy Eszközök (3)

| Eszköz                      | Hatókörök      | Leírás                                                                                      |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Ingyenes proxyk lekérése az 1proxy piactérről (protokoll/ország/minőség/limit szűrők)       |
| `omniroute_oneproxy_rotate` | `read:proxies` | A következő elérhető proxy lekérése stratégia szerint (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Pool statisztikák, szinkronizálási állapot, eloszlás protokoll és ország szerint            |

## Memória Eszközök (3)

Definiálva az `open-sse/mcp-server/tools/memoryTools.ts` fájlban. Az autentikáció/hatókör a standard MCP hatókör-folyamaton keresztül érvényesül.

| Eszköz                    | Hatókörök      | Leírás                                                                                          |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Memóriák keresése lekérdezés / típus / API kulcs alapján, token-költségvetés érvényesítésével   |
| `omniroute_memory_add`    | `write:memory` | Új memória bejegyzés hozzáadása (`factual` / `episodic` / `procedural` / `semantic`)            |
| `omniroute_memory_clear`  | `write:memory` | Memóriák törlése egy API kulcshoz, opcionálisan szűrve típus vagy `olderThan` időbélyeg alapján |

## Képesség Eszközök (4)

Definiálva az `open-sse/mcp-server/tools/skillTools.ts` fájlban. A `src/lib/skills/registry` + `src/lib/skills/executor` támogatja.

| Eszköz                        | Hatókörök        | Leírás                                                                                                  |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Regisztrált képességek listázása opcionális szűréssel API kulcs, név vagy engedélyezett állapot szerint |
| `omniroute_skills_enable`     | `write:skills`   | Egy adott képesség engedélyezése vagy letiltása ID alapján                                              |
| `omniroute_skills_execute`    | `execute:skills` | Képesség végrehajtása megadott bemenettel és a végrehajtási rekord visszaadása                          |
| `omniroute_skills_executions` | `read:skills`    | A legutóbbi képesség végrehajtási előzmények listázása                                                  |

## Notion Kontextus Forrás (6)

Definiálva az `open-sse/mcp-server/tools/notionTools.ts` fájlban. A token a `key_value` táblában van tárolva a `src/lib/db/notion.ts` segítségével. REST kliens a `src/lib/notion/api.ts` fájlban. Beállítások API a `src/app/api/settings/notion/route.ts` fájlban. Irányítópult UI a `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` fájlban.

Konfigurálja a Notion integrációs tokenjét az Endpoint irányítópult **Context Sources** lapján, vagy a REST API-n keresztül:

```bash
# Token beállítása
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Állapot ellenőrzése
curl http://localhost:20128/api/settings/notion

# Kapcsolat bontása
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Eszköz                       | Hatókörök      | Leírás                                                              |
| :--------------------------- | :------------- | :------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Teljes szöveges keresés az összes oldalon és adatbázisban           |
| `notion_get_page`            | `read:notion`  | Oldal lekérése ID alapján a tulajdonságaival                        |
| `notion_list_block_children` | `read:notion`  | Egy oldal vagy blokk gyermekblokkjainak listázása                   |
| `notion_query_database`      | `read:notion`  | Adatbázis lekérdezése szűrőkkel, rendezésekkel és lapozással        |
| `notion_get_database`        | `read:notion`  | Adatbázis séma lekérése ID alapján                                  |
| `notion_append_blocks`       | `write:notion` | Gyermekblokkok hozzáfűzése egy szülőblokkhoz (max. 100 kérésenként) |

## Ügynök Képesség Katalógus Eszközök (3)

Definiálva a `open-sse/mcp-server/tools/agentSkillTools.ts` fájlban. A `src/lib/agentSkills/catalog` támogatja. Ezek az eszközök az 45 bejegyzésből álló Ügynök Képességek dokumentációs katalógusát teszik elérhetővé az MCP kliensek és külső ügynökök számára. Hatókör: `read:catalog`.

| Eszköz                            | Hatókörök      | Leírás                                                                                                                                                                  |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Listázza mind a 45 ügynök képességet opcionális `category` (api\|cli) és `area` szűrőkkel; metaadatokat + lefedettséget ad vissza                                       |
| `omniroute_agent_skills_get`      | `read:catalog` | Teljes metaadatok + SKILL.md tartalom lekérése egyetlen képességhez kanonikus `id` alapján                                                                              |
| `omniroute_agent_skills_coverage` | `read:catalog` | Lefedettségi statisztikák: hány API (23), CLI (21) és konfigurációs (1) képesség rendelkezik SKILL.md fájllal a fájlrendszeren a katalógus összesített adataihoz képest |

Lásd az [AGENT-SKILLS.md](./AGENT-SKILLS.md) fájlt a teljes katalógusért és azért, hogy a külső ügynökök hogyan használják azt.

## Kapcsolódó keretrendszerek (v3.8.0)

A fenti MCP eszközleltár (110 egyedi eszköz, a `countUniqueMcpTools()` által számítva) szándékosan
a futásidejű útválasztási/gyorsítótárazási/tömörítési/memória/képességek/proxy/kontextus-forrás műveletekre
korlátozódik. Két szomszédos keretrendszer szállítódik az MCP szerverrel együtt a v3.8.0-ban, és külön
vannak dokumentálva:

### Felhőügynökök

A felhőügynökök folyamaton kívüli AI kódoló ügynökök (codex-cloud, cursor-cloud, devin, jules),
amelyek az OmniRoute-ba ugyanazon a kapcsolati modellen keresztül vannak bekötve, mint az LLM szolgáltatók.
Saját REST felületükön keresztül érhetők el (`/api/v1/agents/*`), és **nem** részei az MCP
eszközkatalógusnak — egy felhőügynök hívása nem fogyaszt MCP hatókört.

- Implementáció: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Életciklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentáció: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Korlátok (Guardrails)

A korlátok (guardrails) végrehajtás előtti/utáni szűrők (vision-bridge, pii-masker, prompt-injection),
amelyeket a chat pipeline-on belül alkalmaznak. Mielőtt az MCP eszköz/útvonal réteg elérhetővé válna,
futnak, és strukturált jogsértéseket bocsátanak ki az audit pipeline-ba; nem MCP eszközként hívódnak meg.

- Implementáció: `src/lib/guardrails/`.
- Dokumentáció: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Amikor egy blokkoltnak tűnő MCP hívást hibakeres, ellenőrizze mind az MCP audit naplót
(`scope_denied:*` bejegyzések), mind a korlátok audit nyomvonalát — egy kérést egy korlát
**mielőtt** elérné az MCP hatókör-érvényesítési réteget, elutasíthat.

---

## REST API végpontok

| Végpont                | Metódus               | Leírás                                                                                                         | Hitelesítés                    |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| `/api/mcp/status`      | `GET`                 | Szerver állapot: heartbeat, HTTP transzport állapot, audit tevékenység összefoglaló                            | Menedzsment (munkamenet/admin) |
| `/api/mcp/tools`       | `GET`                 | Eszközkatalógus (név, leírás, hatókörök, fázis, forrás végpontok)                                              | Menedzsment                    |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transzport végpont (`mcpEnabled` + `mcpTransport === "sse"` által védett)                                  | API kulcs + hatókörök          |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamelhető HTTP transzport (`mcp-session-id` fejlécet használ; a `DELETE` lezárja a munkamenetet)            | API kulcs + hatókörök          |
| `/api/mcp/audit`       | `GET`                 | Audit napló bejegyzések a `mcp_tool_audit` táblából (szűrők: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Menedzsment                    |
| `/api/mcp/audit/stats` | `GET`                 | Összesített audit statisztikák (`totalCalls`, `successRate`, `avgDurationMs`, top eszközök)                    | Menedzsment                    |

Forrásfájlok: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Mind az SSE, mind a streamelhető HTTP transzportok blokkolva vannak, amíg az MCP szerver nincs engedélyezve a Beállításokban (`mcpEnabled`), és a megfelelő `mcpTransport` nincs kiválasztva. Ha rossz transzport van konfigurálva, az útvonal HTTP 400-at ad vissza, utalva a beállítások módosítására.

---

## Hitelesítés és hatókörök

Az MCP eszköz a hívótól beolvasott hatókör-karakterláncokat használja. Ez az ellenőrzés egyike a három független névtérnek. Az egyik ellenőrző általi átengedés nem jelenti a többi általi átengedést. A szabályok a [Három hatókör-névtér](#három-hatókör-névtér) részben találhatók. Az eszközkatalógus az [MCP eszközhatókörök](#mcp-eszközhatókörök) részben található.

### Három hatókör-névtér

Az API-kulcson lévő `manage`, az MCP eszközön lévő `read:compression` és az `oma_live_…` hozzáférési tokenen lévő `read` három különböző jogosultság. Azok a hívók, akik `read` hozzáférési tokent küldenek egy módosító felügyeleti útvonalra, HTTP 403-at kapnak:
`Access token scope 'read' is insufficient; 'write' required.`
Ez a rang a `scopeSatisfies`. Ez nem veszi figyelembe az MCP táblázatot, és az MCP illesztő sem veszi figyelembe.

| Névtér              | Hitelesítő adat                                                         | Ellenőrző                | Az átengedés lehetővé teszi                                                  |
| :------------------ | :---------------------------------------------------------------------- | :----------------------- | :--------------------------------------------------------------------------- |
| API-kulcs kezelés   | `api_keys.scopes`                                                       | `hasManageScope`         | Az adott Bearer kulcs felügyeleti REST-je                                    |
| API-kulcs additív   | ugyanaz a tömb, egy pontos karakterlánc                                 | az alább nevezett segítő | Csak az az egy képesség                                                      |
| MCP eszközhatókörök | ugyanaz a tömb, egyébként MCP `_meta`, egyébként `OMNIROUTE_MCP_SCOPES` | `scopeMatches`           | Az az eszköz, amint az érvényesítés be van kapcsolva                         |
| Hozzáférési token   | `oma_live_…`                                                            | `scopeSatisfies`         | Az a felügyeleti útvonal, amelynek metódusa és útvonala igényli azt a rangot |

Az egyes hitelesítő adatok létrehozását a [Felügyeleti hitelesítés](../guides/MANAGEMENT-AUTH.md) tárgyalja.

#### API-kulcs hatókörök

Egy `api_keys.scopes` tömb két feladatot lát el. Különböző függvényeket használnak.

**Felügyeleti REST.** A `manage` és az `admin` a `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) tagjai. A `hasManageScope` jogosítja fel az adott kulcs felügyeleti útvonalait. Az `admin` felügyeleti képességgel rendelkezik ezeken az útvonalakon. Az `admin` szó itt nem a hozzáférési token rangja, és nem terjed ki az MCP eszközhatókörökre.

**Additív karakterláncok.** Mindegyik egy pontos tagsági teszt, és mindegyik kívül esik a `MANAGEMENT_API_KEY_SCOPES` hatókörén.

| Hatókör                        | Az átengedés lehetővé teszi                                                                                                                                                        |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Csak a nem-loopback `/api/mcp/` LOCAL_ONLY kivágás (`hasMcpConnectOrManageScope`). A `manage` vagy `admin` kulccsal rendelkező kulcs továbbra is átmegy ezen a kivágáson.          |
| `self:usage`                   | `GET /api/v1/me/status` ehhez a kulcshoz (`src/app/api/v1/me/status/route.ts`). A `POST /api/keys` hozzáadja ezt a hatókört létrehozáskor (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Felfelé irányuló fiókkvóták az állapotadat-csomagban (`src/lib/usage/apiKeySelfService.ts`). Az állapotútvonal továbbra is igényli a `self:usage` hatókört.                        |
| `policy:bypass-provider-quota` | Ennek a kulcsnak a következtetési hívásai kihagyják a szolgáltatói kvóta szabályzatát (`hasProviderQuotaBypassScope` a `src/sse/handlers/chat.ts` fájlban).                        |

#### Illesztés

A katalógus az [MCP eszközhatókörök](#mcp-eszközhatókörök) alatti táblázat. Ne kezelje a `MCP_SCOPE_LIST` fájlt a `src/shared/constants/mcpScopes.ts` fájlban katalógusként: ez az eredeti típusos részhalmaz. Későbbi eszközök további hatóköröket deklarálnak mellette (`read:notion`, `read:skills`, `read:local-corpus`, és a táblázat többi része).

Az `evaluateToolScopes` az `open-sse/mcp-server/scopeEnforcement.ts` fájlban engedélyezi a hívást, ha minden szükséges hatókör illeszkedik valamelyik megadott hatókörhöz:

- A `*` minden szükséges hatókörhöz illeszkedik.
- A `*`-gal végződő megadott hatókör illeszkedik egy olyan szükséges hatókörhöz, amely a csillag előtti előtaggal kezdődik. A `read:*` illeszkedik a `read:compression` hatókörhöz.
- Minden más megadott hatókör csak az azonos szükséges karakterlánchoz illeszkedik.

Egy olyan kulcs, amelynek hatókörei `["manage"]`, nem felel meg a `scopeMatches` ellenőrzésnek a `read:compression` esetében. Ugyanez a hívás sikertelen az `admin`, `mcp:connect`, `read` és `write` esetében, ha ezek az egyetlen megadott karakterláncok. Nincs hierarchia az MCP eszközhatókörök között a záró `*`-on túl.

Az érvényesítés ki van kapcsolva, hacsak az `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (alapértelmezett `false`). Amíg ki van kapcsolva, az `evaluateToolScopes` engedélyezi a hívást és kihagyja a katalógust. Amíg be van kapcsolva, a HTTP a Bearer kulcs `api_keys.scopes` értékét használja `authInfo`-ként (lásd [Kulcsonkénti HTTP hatókör-kötés](#per-key-http-scope-binding-7895)). Ha nincsenek kulcs hatókörök feloldva, a megadott halmaz átesik az MCP `_meta`-n, majd az `OMNIROUTE_MCP_SCOPES`-en.

#### Hozzáférési token hatókörök

Az `oma_live_…` tokenek (`src/lib/accessTokens/scopes.ts`) `read`, `write` vagy `admin` hatóköröket hordoznak. A `scopeSatisfies` egy rang: az `admin` lefedi a `write` és a `read` hatóköröket, a `write` pedig a `read` hatókört. Az ismeretlen hatókörök semmit sem fednek le.

Az `evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) összehasonlítja ezt a rangot az `inferRequiredScope` (`src/server/authz/accessScopes.ts`) értékével:

- A `GET`, `HEAD` és `OPTIONS` `read` hatókört igényel.
- Minden más metódus `write` hatókört igényel.
- Az `ADMIN_SCOPE_PREFIXES` útvonalai `admin` hatókört igényelnek minden metódushoz. Az `/api/mcp` szerepel ezen a listán, így egy `write` hozzáférési token sem hívhatja meg az MCP HTTP felületét.
- Az `ADMIN_MUTATION_PREFIXES` útvonalai `admin` hatókört igényelnek csak a módosításokhoz.

A `PATCH /api/keys/{id}` egy mutáció, és nem szerepel azokon az admin listákon, ezért egy
`read` token 403-at kap.
`Access token scope 'read' is insufficient; 'write' required.`
Egy `write` vagy `admin` hozzáférési token kielégíti ezt az útvonalat. Egy műszerfal JWT, a
loopback CLI `machine-id` token, és egy `manage` vagy `admin` jogosultsággal rendelkező API kulcs
más ágakon fut, és ezt a rangot nem szűkíti.

Egy hozzáférési token, amely átmegy a `/api/mcp` `scopeSatisfies` ellenőrzésén, csak a
felügyeleti kapun jutott át. Az eszközhívások továbbra is futtatják a `scopeMatches` ellenőrzést az API-kulcs
hatókörökkel szemben. A hozzáférési token rangja nem bemenet a `scopeMatches` számára.

### MCP eszköz hatókörök

A hatókör-érvényesítés központosítva van az `open-sse/mcp-server/scopeEnforcement.ts` fájlban.
Minden eszköz specifikus hatóköröket igényel:

| Hatókör                     | Eszközök                                                                                                                                                                       |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `egészség:olvasás`          | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                              |
| `kombinációk:olvasás`       | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                      |
| `kombinációk:írás`          | `switch_combo`, `set_routing_strategy`                                                                                                                                         |
| `kvóta:olvasás`             | `check_quota`                                                                                                                                                                  |
| `használat:olvasás`         | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                         |
| `modellek:olvasás`          | `list_models_catalog`                                                                                                                                                          |
| `kiegészítések:végrehajtás` | `route_request`, `test_combo`                                                                                                                                                  |
| `keresés:végrehajtás`       | `web_search`, `x_search`, `web_fetch`                                                                                                                                          |
| `költségvetés:írás`         | `set_budget_guard`                                                                                                                                                             |
| `rugalmasság:írás`          | `set_resilience_profile`, `db_health_check`                                                                                                                                    |
| `árazás:írás`               | `sync_pricing`                                                                                                                                                                 |
| `gyorsítótár:olvasás`       | `cache_stats`                                                                                                                                                                  |
| `gyorsítótár:írás`          | `cache_flush`                                                                                                                                                                  |
| `tömörítés:olvasás`         | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                     |
| `tömörítés:írás`            | `compression_configure`, `set_compression_engine`                                                                                                                              |
| `proxyk:olvasás`            | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                          |
| `notion:olvasás`            | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                               |
| `notion:írás`               | `notion_append_blocks`                                                                                                                                                         |
| `memória:olvasás`           | `memory_search`                                                                                                                                                                |
| `memória:írás`              | `memory_add`, `memory_clear`                                                                                                                                                   |
| `készségek:olvasás`         | `skills_list`, `skills_executions`                                                                                                                                             |
| `készségek:írás`            | `skills_enable`                                                                                                                                                                |
| `készségek:végrehajtás`     | `skills_execute`                                                                                                                                                               |
| `katalógus:olvasás`         | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                               |
| `eszközök:olvasás`          | `omniroute_tool_search`                                                                                                                                                        |
| `radar:olvasás`             | `omniroute_radar_catalog`                                                                                                                                                      |
| `gamifikáció:olvasás`       | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                               |
| `write:gamification`        | `gamification_invite`, `gamification_transfer`                                                                                                                                 |
| `read:plugins`              | `plugin_list`, `plugin_executions`                                                                                                                                             |
| `write:plugins`             | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                |
| `read:obsidian`             | 13 olvasóeszköz — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`            | 9 íróeszköz — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                   |
| `read:local-corpus`         | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                              |

A helyettesítő karakteres hatókörök támogatottak: a `read:*` minden olvasási hatókört megad, a `*` teljes hozzáférést biztosít.

### `mcp:connect` — szűkített útvonal-képesség (#7895)

Az HTTP/SSE MCP transzport (`/api/mcp/*`) elérése nem-loopback címről megköveteli az `/api/mcp/` LOCAL_ONLY kivételt (lásd `docs/security/ROUTE_GUARD_TIERS.md`). Történelmileg ez a kivétel csak teljes `manage`/`admin` hatókörű API kulcsot fogadott el — túl széleskörű egy olyan hívó számára, akinek csak az MCP-vel kell kommunikálnia. A `src/shared/constants/managementScopes.ts` mostantól exportálja az `MCP_CONNECT_SCOPE = "mcp:connect"`-et: egy additív, szűk hatókör (ugyanaz az előzmény, mint a `SELF_USAGE_SCOPE` esetében), amely CSAK az `/api/mcp/` megkerülését engedélyezi a `src/server/authz/policies/management.ts`-ben — nem biztosít más menedzsment útvonalhoz hozzáférést, és szándékosan KI van hagyva a `MANAGEMENT_API_KEY_SCOPES`-ből. Egy `manage`/`admin` kulccsal rendelkező kulcs továbbra is változatlanul átmegy a kivételen; az `mcp:connect` egy alacsonyabb jogosultságú alternatíva távoli, csak MCP-t használó hívók számára, amelyet a `hasMcpConnectOrManageScope()` ellenőriz.

### Kulcsonkénti HTTP hatókör-kötés (#7895)

HTTP/SSE felett az `open-sse/mcp-server/httpTransport.ts` mostantól feloldja a hívó valós `api_keys.scopes` értékeit a `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) segítségével, és átadja az MCP SDK `transport.handleRequest(req, { authInfo })` metódusának, így az egyes eszközhívásokhoz eljutó `extra.authInfo.scopes` a Bearer kulcs saját hatóköreit tükrözi. A `scopeEnforcement.ts` `resolveCallerScopeContext()` metódusa már korábban is előnyben részesítette az `authInfo`-t a `_meta` és az `OMNIROUTE_MCP_SCOPES` környezeti változó visszatérése felett — ez csak az első, legmagasabb prioritású forrást tölti fel, amely korábban HTTP-n keresztül nem volt táplálva. Ha nincs feloldott API kulcs (nincs fejléc, érvénytelen kulcs), az `authInfo` `undefined` marad, és a feloldás változatlanul az existing `meta`/env láncra esik vissza. Ez NEM fordítja meg az `OMNIROUTE_MCP_ENFORCE_SCOPES` alapértelmezett értékét — a kényszerítést továbbra is explicit módon engedélyezni kell; ez a változás csak azt biztosítja, hogy a kulcsonkénti útvonal élvezzen elsőbbséget, amint engedélyezve van. A stdio-nak nincs hívónkénti identitása (lásd `mcpCallerIdentity.ts`), és ez nem érinti — az `_meta`/env visszatérési láncon marad.

## Környezeti változók

| Változó                                 | Alapértelmezett                       | Cél                                                                                                                                                                            |
| :-------------------------------------- | :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`              | Az alap URL, amelyet az MCP szerver használ az OmniRoute belső API-k hívásakor                                                                                                 |
| `OMNIROUTE_API_KEY`                     | (üres)                                | API kulcs, amelyet `Authorization: Bearer` formában továbbítanak a belső API hívásokhoz                                                                                        |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (csak a `"true"` engedélyezi) | Ha engedélyezve van, a hiányzó hatókörök megtagadják az eszközhívásokat, és `scope_denied:<reason>` bejegyzést naplóznak az audit naplóba                                      |
| `OMNIROUTE_MCP_SCOPES`                  | (üres)                                | Vesszővel elválasztott engedélyezési lista a hatókörökről, amelyek alapértelmezés szerint „elérhetőnek” minősülnek (akkor használatos, ha a hívó nem ad meg saját hatóköröket) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nincs beállítva = bekapcsolva)       | Ha `0/false/off/no` értékre van állítva, letiltja az MCP leírás tömörítését a regisztráció idején                                                                              |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nincs beállítva = bekapcsolva)       | Alternatív alias ugyanahhoz a kapcsolóhoz, mint fent                                                                                                                           |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                               | Megszakítási költségvetés a belső felügyeleti olvasásokhoz (állapot, rugalmasság, kombinációk, kvóta, használat)                                                               |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                               | Megszakítási költségvetés azokhoz a ugrásokhoz, amelyek szolgáltatóra várnak (`route_request`, `web_search`, `web_fetch`)                                                      |
| `MCP_TOOL_DENY`                         | (nincs beállítva = nincs szűrő)       | Vesszővel elválasztott eszköznevek, amelyeket el kell dobni a `tools/list` listából (eszköz-kardinalitás csökkentés – lásd alább)                                              |
| `MCP_TOOL_ALLOW`                        | (nincs beállítva = nincs szűrő)       | Vesszővel elválasztott eszköznevek, amelyeket kizárólagosan meg kell tartani (engedélyezési lista mód – lásd alább)                                                            |
| `DATA_DIR`                              | `~/.omniroute`                        | A heartbeat fájl a `${DATA_DIR}/runtime/mcp-heartbeat.json` helyre íródik                                                                                                      |

---

## Leírás tömörítés

Az MCP eszköz-, prompt- és erőforrás-regiszterek tömöríthetik a leírásokat a regisztráció/listázás során, hogy csökkentsék az ügyfelek számára elérhető metaadat-lábnyomot (és ezáltal a prompt kontextus költségét). A megvalósítás az `open-sse/mcp-server/descriptionCompressor.ts` fájlban található, és a `createMcpServer()` függvényen belüli `compressMcpRegistryMetadata` segítségével van bekötve az MCP szerverbe.

- A tömörítés a leírás szövegén fut a Caveman szabályrendszer (`getRulesForContext("all", "full")`) használatával, megőrzött blokk-kivonatolással (kódspans, keretezett blokkok stb.), így a strukturális tartalom nem módosul.
- Telepítésenkénti váltás a `key_value` beállítási táblázat `compression.mcpDescriptionCompressionEnabled` értékén keresztül (alapértelmezett: engedélyezve) – az UI-ban **Analytics → MCP description compression** néven jelenik meg.
- Folyamat-szintű váltás az `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` vagy az `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` segítségével.
- Valós idejű statisztikák jelennek meg az `omniroute_compression_status` alatt az `analytics.mcpDescriptionCompression` részen, és `source: "mcp_metadata_estimate"` címkével vannak ellátva, hogy megkülönböztethetők legyenek a valós szolgáltatói használati nyugtáktól.

---

## Eszköz-kardinalitás csökkentés (F4.3)

A leírás tömörítése csökkenti az egyes eszközök metaadatait; az **eszköz-kardinalitás csökkentés** egy lépéssel tovább megy azáltal, hogy csökkenti, _hány_ eszközt hirdetnek meg egyáltalán. Kevesebb eszköz hirdetése a `tools/list` manifesztumban csökkenti a kérésenkénti tokenköltséget, amelyet az ügyfél modellje fizet az eszközkatalógusért ("5. réteg" tömörítés). A megvalósítás egy tiszta, állapotmentes szűrő az `open-sse/mcp-server/toolCardinality.ts` fájlban (`reduceToolManifest`), amely a `createMcpServer()` (`open-sse/mcp-server/server.ts`) regisztrációs ciklusába van bekötve.

**Bekapcsolható, alapértelmezetten kikapcsolva.** A szűrő csak akkor fut, ha legalább az egyik környezeti változó be van állítva; ha egyik sincs beállítva, mind a 110 eszköz változatlanul meghirdetésre kerül.

| Változó          | Mód                                                                                                          |
| :--------------- | :----------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Feketelista — vesszővel elválasztott eszköznevek, amelyek mindig elvetésre kerülnek a `tools/list` listából  |
| `MCP_TOOL_ALLOW` | Engedélyezési lista — vesszővel elválasztott eszköznevek; csak ezek maradnak meg, minden más elvetésre kerül |

A `deny` felülírja az `allow` beállítást. A nevek vesszővel elválasztottak, levágottak, és az üres bejegyzések figyelmen kívül maradnak. Példák:

```bash
# Két eszköz elvetése a katalógusból
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Csak az útválasztási + kvóta eszközök meghirdetése (engedélyezési lista mód)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Hogyan távolítják el a szűrt eszközöket:** a regisztráció mindig sikeres; egy olyan eszköz, amelyet a profil elutasít, az MCP SDK kezelőjén `.disable()`-re kerül, így soha nem jelenik meg a `tools/list` listában, de a bekötés érintetlen marad (tiszta engedélyezés/letiltás, nincs újraregisztráció). A profil elemzője a `readMcpToolProfileFromEnv(process.env)`, amely `null` értéket ad vissza (nincs szűrés), ha mindkét változó üres.

A `reduceToolManifest` mögötti gazdagabb `ToolProfile` forma támogatja a hatókör-metszet szűrést is (`allowScopes`, `read:*` stílusú helyettesítő karakteres illesztéssel) és egy determinisztikus `maxTools` korlátot, de ez a két beállítás a teljes manifesztumot igényli a regisztrációkor, és ma **nem** érhetők el a környezeti változókon keresztül (egy `tools/list`-szintű hook egy nyomon követett feladat). Az `estimateManifestTokens()` elérhető a manifesztum tokenköltségének összehasonlítására a csökkentés előtt és után.

---

## Futásidejű szívverés (Heartbeat)

Az stdio transzport 5 másodpercenként megőrzi az élőség állapotát a `${DATA_DIR}/runtime/mcp-heartbeat.json` fájlba. Az irányítópult (`/api/mcp/status`) ebből a fájlból és a PID élőségéből olvassa ki az `online` állapotot. A HTTP transzportok ehelyett a folyamaton belüli `getMcpHttpStatus()`-ból jelentik az állapotot (nincs fájlírás).

A heartbeat pillanatkép a következőket tartalmazza:

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

## Audit naplózás

Minden eszközhívás naplózásra kerül az SQLite `mcp_tool_audit` táblájába az `open-sse/mcp-server/audit.ts` által:

- Eszköz neve, argumentumok (hash-elve/csonkítva az eszközönkénti `auditLevel` szerint), eredmény
- Időtartam ms-ban, siker/hiba jelző, hibaüzenet (ha releváns)
- API kulcs hash, időbélyeg
- A hatókör-elutasítások `scope_denied:<reason>` formában kerülnek naplózásra a hiányzó hatókörök listájával

Használja az irányítópultot vagy az `/api/mcp/audit` és `/api/mcp/audit/stats` REST végpontokat a legutóbbi hívások ellenőrzéséhez.

---

## Fájlok

| Fájl                                                                     | Cél                                                                          |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP szerver gyár, stdio belépési pont, hatókörhöz kötött eszközregisztrációk |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamelhető HTTP transzport (munkamenet-kezelés)                      |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Eszközhatókör kiértékelése és hívó feloldása                                 |
| `open-sse/mcp-server/audit.ts`                                           | Eszközhívás audit naplózása (`mcp_tool_audit`)                               |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio szívverés író (`mcp-heartbeat.json`)                                   |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Leírás tömörítés eszköz / prompt / erőforrás regiszterekhez                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod sémák + eszközregiszter (`MCP_TOOLS`, 45 bejegyzés)                      |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 2. fázis + gyorsítótár + 1proxy eszközkezelők                                |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Tömörítési eszközkezelők                                                     |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Memória eszköz definíciók (3 eszköz)                                         |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Képesség eszköz definíciók (4 eszköz)                                        |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion kontextusforrás eszköz definíciók (6 eszköz)                          |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Gamifikációs eszköz definíciók (8 eszköz)                                    |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Plugin regisztrációs és kezelési eszközök (8 eszköz)                         |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` végpont                                                    |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` végpont                                                     |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE transzport útvonal                                        |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamelhető HTTP transzport útvonal                       |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` audit napló lekérdezés                                      |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` összesített audit metrikák                            |
| `src/lib/notion/api.ts`                                                  | Notion REST API kliens (újrapróbálkozás, időtúllépés, hibaosztályozás)       |
| `src/lib/db/notion.ts`                                                   | Notion token perzisztencia (`key_value` tábla)                               |
| `src/app/api/settings/notion/route.ts`                                   | Notion beállítások API (GET/POST/DELETE)                                     |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion token kezelő felhasználói felület                                     |
| `tests/unit/notion-api.test.ts`                                          | Notion API kliens tesztek (7)                                                |
| `tests/unit/notion-tools.test.ts`                                        | Notion eszközök hatókör-érvényesítési tesztek (10)                           |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB modul tesztek (3)                                                  |
