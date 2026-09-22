# OmniRoute MCP Server Documentation (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol-kiszolgáló 110 eszközzel az útválasztási, gyorsítótárazási, tömörítési, memória-, képesség-, proxy-, készlet-, Radar- és kontextusforrás-műveletekhez.
>
> Hiteles forrás: az `open-sse/mcp-server/server.ts` a `countUniqueMcpTools()` segítségével **110 egyedi eszközt** számít ki: 45 kanonikus definíciót (beleértve a hat CCR-életciklus-eszközt, az agent-skills eszközhármast, az `omniroute_radar_catalog` és az `omniroute_x_search` eszközt), továbbá memória- (3), képesség- (4), GitHub-képesség- (3), készlet- (6), gamifikációs (8), bővítmény- (8), Notion- (6), Obsidian- (22), helyi korpusz- (3), valamint két, kizárólag RTK-alapú tömörítési eszközt.

## Telepítés

Az OmniRoute MCP beépített. Indítsa el a következő paranccsal:

```bash
omniroute --mcp
```

Vagy az open-sse átvitelen keresztül:

```bash
# Streamelhető HTTP-átvitel (20130-as port)
omniroute --dev  # Az MCP automatikusan elindul az /mcp végponton
```

A HTTP-átvitelek (`sse` / `streamable-http`, amelyeket az irányítópult-kiszolgáló folyamaton belül szolgál ki)
alapértelmezés szerint ki vannak kapcsolva, és korábban csak a `/dashboard/mcp` oldalon lehetett őket átkapcsolni. A v3.8.51
verziótól kezdve a CLI is ugyanazokat a lehetőségeket biztosítja:

```bash
omniroute mcp status                                  # engedélyezett/online állapot, átvitel, eszközök száma
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # visszaállítja az aktív sse/streamable-http munkameneteket
```

Az `mcp enable`/`mcp disable` PATCH-kéréssel módosítja ugyanazt az `mcpEnabled` (és opcionálisan az `mcpTransport`) beállítást,
amelyet az irányítópult kapcsolói a `/api/settings` útvonalon keresztül kezelnek. Az `mcp restart` meghívja a `POST /api/mcp/restart` végpontot: leállítja
az aktív `sse`/`streamable-http` munkameneteket, így a következő kérés tisztán újrainicializálhatja azokat; `409` választ ad,
ha az MCP le van tiltva, és `501` választ a `stdio` átvitel esetén (a stdio-kliensek a saját
alfolyamatukat kezelik — nincs folyamaton belüli leíró, amely újraindítható lenne).

## Átvitelek

Az MCP-kiszolgáló három átvitelt biztosít, amelyek mindegyike ugyanarra a `createMcpServer()` gyárra épül:

| Átvitel           | Hely                                            | Mikor használandó                                            |
| :---------------- | :---------------------------------------------- | :----------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | IDE-integrációkhoz (Claude Desktop, Cursor stb.)             |
| `sse`             | `POST/GET /api/mcp/sse` a `httpTransport` révén | Eseményfolyamot igénylő böngésző- és ügynökkliensekhez       |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | Több munkamenetes HTTP-kliensekhez (`mcp-session-id` fejléc) |

Az aktív HTTP-átvitelt (`sse` vagy `streamable-http`) az `mcpTransport` beállítás választja ki. Az átvitelek közötti váltás bezárja a másik átvitel meglévő munkameneteit.

### Távoli hozzáférés (manage hatókörű megkerülés)

Az `/api/mcp/*` a LOCAL_ONLY szinthez tartozik (`src/server/authz/routeGuard.ts`) — alapértelmezés szerint csak a loopback gazdagépek (`localhost`, `127.0.0.1`, `::1`) érhetik el. A v3.8.2 verziótól kezdve a nem loopback kliensek is csatlakozhatnak, ha olyan `Authorization: Bearer <api-key>` fejlécet küldenek, amelynek kulcsa rendelkezik a `manage` hatókörrel. Ez az egyetlen módja annak, hogy alagúton, fordított proxyn vagy nyilvános gazdagépnéven keresztül elérje a távoli MCP-kiszolgálót.

```bash
# A manage hatókör megadása: nyissa meg az irányítópult API Keys oldalát, és kapcsolja be
# a kulcshoz tartozó „Management Access” beállítást, vagy létrehozáskor POST-kéréssel adja meg a scopes:["manage"] értéket.

# Ezután csatlakozzon egy távoli MCP-kliensről:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Egy `manage` hatókörrel nem rendelkező kulcs (vagy a Bearer fejléc hiánya) `403 LOCAL_ONLY` választ eredményez. A kapcsolódó `/api/cli-tools/runtime/*` előtag szándékosan NEM kerülhető meg — lásd: [Útvonalőr-szintek — manage hatókörű kivétel](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE-konfiguráció

A Claude Desktop, a Cursor, a Cline és a kompatibilis MCP-kliensek beállításához lásd az [MCP-kliens konfigurációja](../guides/SETUP_GUIDE.md#mcp-client-configuration) című részt.

---

## Alapvető eszközök (14) — 1. fázis

| Eszköz                          | Hatókörök             | Leírás                                                                                                                                                                       |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Üzemidő, memória, megszakítók, sebességkorlátok, gyorsítótár-statisztikák                                                                                                    |
| `omniroute_list_combos`         | `read:combos`         | Az összes konfigurált kombináció a stratégiákkal (opcionális mérőszámokkal)                                                                                                  |
| `omniroute_get_combo_metrics`   | `read:combos`         | Egy adott kombináció teljesítménymérőszámai                                                                                                                                  |
| `omniroute_switch_combo`        | `write:combos`        | Egy kombináció aktiválása vagy deaktiválása                                                                                                                                  |
| `omniroute_create_combo`        | `write:combos`        | Ellenőrzött kombináció létrehozása a meglévő kombinációs API-n keresztül                                                                                                     |
| `omniroute_check_quota`         | `read:quota`          | Felhasznált/teljes kvóta, fennmaradó százalék, visszaállítási idő, tokenállapot                                                                                              |
| `omniroute_route_request`       | `execute:completions` | Csevegési kiegészítési kérés küldése az OmniRoute útválasztásán keresztül                                                                                                    |
| `omniroute_cost_report`         | `read:usage`          | Költségjelentés időszakonként (munkamenet/nap/hét/hónap)                                                                                                                     |
| `omniroute_list_models_catalog` | `read:models`         | Teljes modellkatalógus képességekkel, állapottal és árakkal                                                                                                                  |
| `omniroute_radar_catalog`       | `read:radar`          | Helyi, aláírt Radar-katalógus; opcionális szolgáltató- és családszűrők                                                                                                       |
| `omniroute_tool_search`         | `read:tools`          | Eszközök felderítése a regisztrált MCP-katalógusból                                                                                                                          |
| `omniroute_web_search`          | `execute:search`      | Webes keresés a konfigurált keresési szolgáltatókon keresztül. Az X/Twitter szolgáltatásra nem terjed ki.                                                                    |
| `omniroute_x_search`            | `execute:search`      | Keresés az X-en az xAI/SuperGrok használatával, vagy az `xquik-search` kiválasztása Xquik API-eredményekhez. A kiválasztott háttérrendszerhez hitelesítő adatok szükségesek. |
| `omniroute_web_fetch`           | `execute:search`      | Webes tartalom lekérése a konfigurált lekérési szolgáltatókon keresztül                                                                                                      |

## Speciális eszközök (11) — 2. fázis

| Eszköz                             | Hatókörök                            | Leírás                                                                                                                       |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Próbaüzemű útválasztási szimuláció tartalék útvonalak fájával                                                                |
| `omniroute_set_budget_guard`       | `write:budget`                       | Munkamenet-költségkeret korlátozási/blokkolási/riasztási művelettel                                                          |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Kombinációs stratégia futásidejű frissítése (prioritásos/súlyozott/automatikus/stb.)                                         |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` rezilienciaprofil alkalmazása                                                     |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Egy kombináció minden szolgáltatójának élő tesztje valós upstream hívással                                                   |
| `omniroute_get_provider_metrics`   | `read:health`                        | Szolgáltatónkénti metrikák p50/p95/p99 késleltetéssel és az áramkör-megszakító állapotával                                   |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Kombináció ajánlása feladattípus szerint, költségkeret- és késleltetési korlátozásokkal                                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Annak magyarázata, hogy egy kérés miért került egy adott szolgáltatóhoz (pontozási tényezők + tartalék útvonalak)            |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Teljes munkamenet-pillanatkép: költség, tokenek, leggyakoribb modellek/szolgáltatók, hibák, költségkeret-védelem             |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Adatbázis-eltérések, például hibás kombinációhivatkozások / árva sorok diagnosztizálása (és opcionális automatikus javítása) |
| `omniroute_sync_pricing`           | `pricing:write`                      | Árazási adatok szinkronizálása külső forrásokból (LiteLLM); támogatja a `dryRun` módot                                       |

## Gyorsítótár-eszközök (2)

| Eszköz                  | Hatókörök     | Leírás                                                                 |
| :---------------------- | :------------ | :--------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Szemantikai gyorsítótár, promptgyorsítótár és idempotenciastatisztikák |
| `omniroute_cache_flush` | `write:cache` | A gyorsítótár globális vagy aláírás/modell szerinti ürítése            |

## Tömörítési eszközök (13)

| Eszköz                              | Hatókörök           | Leírás                                                                                                                                            |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Tömörítési beállítások, analitikai összegzés és gyorsítótár-tudatos statisztikák (az `analytics.mcpDescriptionCompression` metaadatokkal együtt)  |
| `omniroute_compression_configure`   | `write:compression` | A tömörítési mód, küszöbérték, célzott arány, rendszerprompt-megőrzés és az MCP-leírástömörítés kapcsolójának konfigurálása                       |
| `omniroute_set_compression_engine`  | `write:compression` | Az aktív motor (off/caveman/rtk/stacked), valamint a Caveman/RTK intenzitásának kiválasztása                                                      |
| `omniroute_list_compression_combos` | `read:compression`  | Az elnevezett tömörítési kombinációk és motorfolyamataik felsorolása                                                                              |
| `omniroute_compression_combo_stats` | `read:compression`  | Tömörítési kombináció és motor szerint csoportosított analitika                                                                                   |
| `omniroute_ccr_store`               | `write:compression` | Hívónként elkülönített tartalom tárolása a korlátozott méretű, memóriabeli CCR-tárban, valamint egy jelölő és egy `ccr://`-hivatkozás visszaadása |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR-tartalom lekérése teljes egészében vagy eleje, vége, sorok, grep és statisztikai módok használatával                                          |
| `omniroute_ccr_inspect`             | `read:compression`  | A hívó tulajdonában lévő CCR-metaadatok vizsgálata a tartalom visszaadása nélkül                                                                  |
| `omniroute_ccr_list`                | `read:compression`  | A hívó tulajdonában lévő CCR-blokkok lapozott metaadatainak felsorolása                                                                           |
| `omniroute_ccr_delete`              | `write:compression` | A hívó tulajdonában lévő CCR-blokk törlése                                                                                                        |
| `omniroute_ccr_stats`               | `read:compression`  | A hívóra vonatkozó memóriahasználat, életciklus-számlálók és tárkorlátok jelentése                                                                |
| `omniroute_rtk_discover`            | `read:compression`  | Ismétlődő zaj észlelése a külön engedélyezett RTK-kimeneti mintákban                                                                              |
| `omniroute_rtk_learn`               | `read:compression`  | Felülvizsgálható RTK-szűrőtervezet létrehozása a külön engedélyezett mintákból                                                                    |

A CCR-bejegyzések kizárólag a memóriában találhatók, és újraindításkor eltűnnek. Az egyes blokkok mérete legfeljebb 2 MiB, az egyes
azonosítókhoz tartozó tárhely 16 MiB, a globális tárhely pedig 64 MiB lehet. A bejegyzések alapértelmezett TTL-je 24 óra (legfeljebb
hét nap). A teljes MCP-lekérés 256 KiB-ra korlátozott; a nagyobb blokkok továbbra is elérhetők a
tartományalapú és grep módokon keresztül. A tárolás, lekérés, felsorolás, vizsgálat, törlés és statisztikák az
azonosított API-kulcs tulajdonosa szerint vannak elkülönítve. Az auditrekordok kivonatokat és méret-metaadatokat tartalmaznak, tartalmat soha.

Az `omniroute_compression_status` külön, az `analytics.mcpDescriptionCompression` alatt jelenti az MCP-leírások tömörítését. Ezek az értékek az MCP által listázható leírások (`tools`, `prompts`, `resources` és `resourceTemplates`) metaadatméret-becslései; nem szolgáltatói használati bizonylatok, és `source: "mcp_metadata_estimate"` jelöléssel rendelkeznek.

### MCP akadálymentességi fa szűrője (v3.8.0)

A fenti tömörítési eszközöktől elkülönülten az OmniRoute tartalmaz egy végrehajtás utáni szűrőt, amely tömöríti az MCP böngésző-/akadálymentességi eszközök **eszközeredményeit**, mielőtt azok visszakerülnek az ágenshez. Ez a szűrő önmagában nem eszköz — transzparens módon fut minden olyan eszközeredményen, amely részletes akadálymentességifa- vagy böngészőpillanatkép-szöveget (≥2000 karakter) tartalmaz.

Fő működési jellemzők:

- ≥30 egymást követő, ismétlődő testvérsort elejét és végét tartalmazó összefoglalóvá von össze
- Megőrzi a Playwright/számítógép-használat által igényelt `[ref=eXX]` hivatkozási pontokat
- A túlméretes szöveget (>50 000 karakter) navigációs útmutatással kiegészítve kényszerítetten csonkolja
- Várható megtakarítás: **60–80%** a böngészőpillanatkép-adattartalmakon

Konfiguráció: `compression.mcpAccessibility` a globális beállításokban (056-os migráció).
Implementáció: `open-sse/services/compression/engines/mcpAccessibility/`.
Teljes dokumentáció: [Tömörítési motorok — MCP akadálymentességi fa szűrője](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Az ezen eszközök mögötti futásidejű tömörítési modellről lásd: [Tömörítési motorok](../compression/COMPRESSION_ENGINES.md) és [RTK-tömörítés](../compression/RTK_COMPRESSION.md).

## 1Proxy eszközök (3)

| Eszköz                      | Hatókörök      | Leírás                                                                                             |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Ingyenes proxyk lekérése az 1proxy piacteréről (protokoll-/ország-/minőség-/korlátalapú szűrőkkel) |
| `omniroute_oneproxy_rotate` | `read:proxies` | A következő elérhető proxy lekérése stratégia szerint (`random` / `quality` / `sequential`)        |
| `omniroute_oneproxy_stats`  | `read:proxies` | Készletstatisztikák, szinkronizálási állapot, protokoll és ország szerinti eloszlás                |

## Memóriaeszközök (3)

Definiálva az `open-sse/mcp-server/tools/memoryTools.ts` fájlban. A hitelesítést és a hatóköröket a szabványos MCP-hatókörfolyamat érvényesíti.

| Eszköz                    | Hatókörök      | Leírás                                                                                          |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Memóriák keresése lekérdezés, típus vagy API-kulcs alapján, a tokenkeret betartatásával         |
| `omniroute_memory_add`    | `write:memory` | Új memóriabejegyzés hozzáadása (`factual` / `episodic` / `procedural` / `semantic`)             |
| `omniroute_memory_clear`  | `write:memory` | Memóriák törlése egy API-kulcshoz, opcionálisan típus vagy `olderThan` időbélyeg alapján szűrve |

## Képességeszközök (4)

Definiálva az `open-sse/mcp-server/tools/skillTools.ts` fájlban. A háttérben az `src/lib/skills/registry` és az `src/lib/skills/executor` biztosítja a működést.

| Eszköz                        | Hatókörök        | Leírás                                                                                                   |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Regisztrált képességek listázása API-kulcs, név vagy engedélyezési állapot szerinti opcionális szűréssel |
| `omniroute_skills_enable`     | `write:skills`   | Egy adott képesség engedélyezése vagy letiltása azonosító alapján                                        |
| `omniroute_skills_execute`    | `execute:skills` | Képesség végrehajtása a megadott bemenettel és a végrehajtási rekord visszaadása                         |
| `omniroute_skills_executions` | `read:skills`    | A közelmúltbeli képesség-végrehajtási előzmények listázása                                               |

## Notion kontextusforrás (6)

Definiálva az `open-sse/mcp-server/tools/notionTools.ts` fájlban. A token a `key_value` táblában tárolódik az `src/lib/db/notion.ts` segítségével. A REST-kliens az `src/lib/notion/api.ts` fájlban található. A beállítási API az `src/app/api/settings/notion/route.ts` fájlban található. Az irányítópult felhasználói felülete az `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` fájlban található.

Konfigurálja a Notion-integrációs tokenjét a végpont irányítópultjának **Kontextusforrások** lapján vagy a REST API-n keresztül:

```bash
# Token beállítása
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Állapot ellenőrzése
curl http://localhost:20128/api/settings/notion

# Leválasztás
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Eszköz                       | Hatókörök      | Leírás                                                                     |
| :--------------------------- | :------------- | :------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Teljes szöveges keresés az összes oldalon és adatbázisban                  |
| `notion_get_page`            | `read:notion`  | Oldal lekérése azonosító alapján, a tulajdonságaival együtt                |
| `notion_list_block_children` | `read:notion`  | Egy oldal vagy blokk gyermekblokkjainak listázása                          |
| `notion_query_database`      | `read:notion`  | Adatbázis lekérdezése szűrőkkel, rendezésekkel és lapozással               |
| `notion_get_database`        | `read:notion`  | Adatbázisséma lekérése azonosító alapján                                   |
| `notion_append_blocks`       | `write:notion` | Gyermekblokkok hozzáfűzése egy szülőblokkhoz (kérelmenként legfeljebb 100) |

## Agentkészség-katalógus eszközei (3)

Az `open-sse/mcp-server/tools/agentSkillTools.ts` fájlban vannak definiálva. A háttérben a `src/lib/agentSkills/catalog` biztosítja működésüket. Ezek az eszközök elérhetővé teszik a 45 bejegyzésből álló Agent Skills dokumentációs katalógust az MCP-kliensek és külső agentek számára. Hatókör: `read:catalog`.

| Eszköz                            | Hatókörök      | Leírás                                                                                                                                                              |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | Mind a 45 agentkészség listázása opcionális `category` (api\|cli) és `area` szűrőkkel; metaadatokat és lefedettséget ad vissza                                      |
| `omniroute_agent_skills_get`      | `read:catalog` | Egyetlen készség teljes metaadatainak és SKILL.md-tartalmának lekérése a kanonikus `id` alapján                                                                     |
| `omniroute_agent_skills_coverage` | `read:catalog` | Lefedettségi statisztikák: a 23 API-, 21 CLI- és 1 konfigurációs készség közül hánynak van SKILL.md fájlja a fájlrendszerben a katalógus teljes elemszámához képest |

A teljes katalógust és azt, hogy a külső agentek hogyan használják, lásd az [AGENT-SKILLS.md](./AGENT-SKILLS.md) dokumentumban.

## Kapcsolódó keretrendszerek (v3.8.0)

A fenti MCP-eszközkészlet (110 egyedi eszköz, a `countUniqueMcpTools()` számítása alapján) szándékosan
a futásidejű útválasztási, gyorsítótárazási, tömörítési, memória-, készség-, proxy- és kontextusforrás-műveletekre
korlátozódik. A v3.8.0 verzióban két kapcsolódó keretrendszer is az MCP-kiszolgáló mellett érkezik, amelyek
külön dokumentációval rendelkeznek:

### Felhőagentek

A felhőagentek folyamaton kívül futó AI-kódoló agentek (codex-cloud, cursor-cloud, devin, jules), amelyek
ugyanazon a kapcsolati modellen keresztül csatlakoznak az OmniRoute-hoz, mint az LLM-szolgáltatók. Saját
REST-felületükön (`/api/v1/agents/*`) érhetők el, és **nem** részei az MCP-eszközkatalógusnak
— egy felhőagent meghívása nem használ fel MCP-hatókört.

- Megvalósítás: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Életciklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentáció: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Védelmi korlátok

A védelmi korlátok a csevegési folyamatban alkalmazott, végrehajtás előtti/utáni szűrők (vision-bridge, pii-masker, prompt-injection).
Az MCP eszköz-/útvonalréteg elérése előtt futnak, és strukturált szabálysértéseket küldenek a naplózási folyamatba;
nem MCP-eszközként hívódnak meg.

- Megvalósítás: `src/lib/guardrails/`.
- Dokumentáció: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Egy blokkoltnak tűnő MCP-hívás hibakeresésekor ellenőrizze az MCP auditnaplóját
(`scope_denied:*` bejegyzések) és a védelmi korlátok auditnyomvonalát is — egy kérést valamelyik
védelmi korlát **azelőtt** elutasíthat, hogy az elérné az MCP hatókör-érvényesítési rétegét.

---

## REST API-végpontok

| Végpont                | Metódus               | Leírás                                                                                                          | Hitelesítés                    |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| `/api/mcp/status`      | `GET`                 | Kiszolgálóállapot: életjel, HTTP-átvitel állapota, auditálási tevékenység összegzése                            | Felügyeleti (munkamenet/admin) |
| `/api/mcp/tools`       | `GET`                 | Eszközkatalógus (név, leírás, hatókörök, fázis, forrásvégpontok)                                                | Felügyeleti                    |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE-átviteli végpont (az `mcpEnabled` + `mcpTransport === "sse"` feltételekhez kötve)                           | API-kulcs + hatókörök          |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Folyamatos HTTP-átvitel (az `mcp-session-id` fejlécet használja; a `DELETE` lezárja a munkamenetet)             | API-kulcs + hatókörök          |
| `/api/mcp/audit`       | `GET`                 | Auditnapló-bejegyzések az `mcp_tool_audit` forrásból (szűrők: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Felügyeleti                    |
| `/api/mcp/audit/stats` | `GET`                 | Összesített auditstatisztikák (`totalCalls`, `successRate`, `avgDurationMs`, leggyakrabban használt eszközök)   | Felügyeleti                    |

Forrásfájlok: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Az SSE és a folyamatos HTTP-átvitel egyaránt blokkolva van mindaddig, amíg az MCP-kiszolgálót nem engedélyezik a Beállításokban (`mcpEnabled`), és ki nem választják a megfelelő `mcpTransport` értéket. Ha nem a megfelelő átvitel van konfigurálva, az útvonal HTTP 400-as választ ad vissza a beállítások módosítására vonatkozó útmutatással.

---

## Hitelesítés és hatókörök

Az MCP-eszközök hitelesítése API-kulcsok hatókörein keresztül történik. A hatókörök érvényesítése központilag, az
`open-sse/mcp-server/scopeEnforcement.ts` fájlban történik. Minden eszközhöz meghatározott hatókörök szükségesek:

| Hatókör               | Eszközök                                                                                                                                                                          |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                 |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                         |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                            |
| `read:quota`          | `check_quota`                                                                                                                                                                     |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                            |
| `read:models`         | `list_models_catalog`                                                                                                                                                             |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                     |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                             |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                       |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                    |
| `read:cache`          | `cache_stats`                                                                                                                                                                     |
| `write:cache`         | `cache_flush`                                                                                                                                                                     |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                        |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                 |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                             |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                  |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                            |
| `read:memory`         | `memory_search`                                                                                                                                                                   |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                      |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                |
| `write:skills`        | `skills_enable`                                                                                                                                                                   |
| `execute:skills`      | `skills_execute`                                                                                                                                                                  |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                  |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                           |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                         |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                  |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                    |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                   |
| `read:obsidian`       | 13 olvasási eszköz — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 írási eszköz — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                   |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                 |

A helyettesítő karakteres hatókörök támogatottak: a `read:*` minden olvasási hatókört megad, a `*` pedig teljes hozzáférést biztosít.

### `mcp:connect` — szűk útvonal-képesség (#7895)

A HTTP/SSE MCP-átvitel (`/api/mcp/*`) nem loopback címről történő eléréséhez szükséges az
`/api/mcp/` LOCAL_ONLY kivétel (lásd: `docs/security/ROUTE_GUARD_TIERS.md`). Korábban
ez a kivétel csak teljes `manage`/`admin` hatókörű API-kulcsot fogadott el — ez túl széles
jogosultság egy olyan hívó számára, amelynek csak az MCP-vel kell kommunikálnia. A
`src/shared/constants/managementScopes.ts` mostantól exportálja az
`MCP_CONNECT_SCOPE = "mcp:connect"` értéket: ez egy hozzáadott, szűk hatókör (a
`SELF_USAGE_SCOPE` precedensét követve), amely KIZÁRÓLAG az `/api/mcp/` megkerülést
engedélyezi a `src/server/authz/policies/management.ts` fájlban — semmilyen más
felügyeleti útvonalhoz nem ad hozzáférést, és szándékosan KIMARAD a
`MANAGEMENT_API_KEY_SCOPES` értékből. A `manage`/`admin` hatókörrel rendelkező kulcsok
továbbra is változatlanul átmennek a kivételen; az `mcp:connect` egy alacsonyabb
jogosultságú alternatíva a kizárólag MCP-t használó távoli hívók számára, amelyet a
`hasMcpConnectOrManageScope()` ellenőriz.

### Kulcsonkénti HTTP-hatókör-hozzárendelés (#7895)

HTTP/SSE használatakor az `open-sse/mcp-server/httpTransport.ts` mostantól lekéri a hívó
tényleges `api_keys.scopes` értékét a `resolveMcpCallerAuthInfo()`
(`open-sse/mcp-server/httpAuthContext.ts`) segítségével, és átadja azt az MCP SDK
`transport.handleRequest(req, { authInfo })` hívásának, így az egyes eszközhívásokhoz
eljutó `extra.authInfo.scopes` a Bearer-kulcs saját hatóköreit tükrözi. A
`scopeEnforcement.ts` fájlban található `resolveCallerScopeContext()` már eddig is
előnyben részesítette az `authInfo` értékét a `_meta` és az `OMNIROUTE_MCP_SCOPES`
környezeti változón alapuló tartalék megoldással szemben — ez a módosítás csupán ezt az
első, legmagasabb prioritású forrást tölti fel, amely HTTP használatakor korábban nem
kapott adatot. Ha nem sikerül API-kulcsot feloldani (nincs fejléc, érvénytelen kulcs), az
`authInfo` értéke `undefined` marad, és a feloldás változatlanul a meglévő `meta`/környezeti
változó láncra tér át. Ez NEM változtatja meg az `OMNIROUTE_MCP_ENFORCE_SCOPES`
alapértelmezett értékét — a kikényszerítést továbbra is kifejezetten engedélyezni kell;
ez a módosítás csak azt biztosítja, hogy engedélyezés után a kulcsonkénti útvonal élvezzen
elsőbbséget. A stdio nem rendelkezik hívónkénti identitással (lásd:
`mcpCallerIdentity.ts`), ezért nem érinti a változás — továbbra is a `_meta`/környezeti
változó alapú tartalék láncot használja.

---

## Környezeti változók

| Változó                                 | Alapértelmezett érték                 | Rendeltetés                                                                                                                                  |
| :-------------------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`              | Az MCP-kiszolgáló által az OmniRoute belső API-jainak meghívásakor használt alap-URL                                                         |
| `OMNIROUTE_API_KEY`                     | (üres)                                | A belső API-hívásokhoz `Authorization: Bearer` formájában továbbított API-kulcs                                                              |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (csak a `"true"` engedélyezi) | Ha engedélyezve van, a hiányzó hatókörök megtagadják az eszközhívásokat, és `scope_denied:<reason>` kerül az auditnaplóba                    |
| `OMNIROUTE_MCP_SCOPES`                  | (üres)                                | Az alapértelmezetten „elérhetőnek” tekintett hatókörök vesszővel elválasztott engedélyezési listája (ha a hívó nem ad meg saját hatóköröket) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nincs beállítva = bekapcsolva)       | `0/false/off/no` értékre állítva letiltja az MCP-leírások tömörítését a regisztráció során                                                   |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nincs beállítva = bekapcsolva)       | A fenti kapcsoló alternatív álneve                                                                                                           |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                               | Megszakítási időkeret a belső felügyeleti lekérdezésekhez (állapot, ellenálló képesség, kombinációk, kvóta, használat)                       |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                               | Megszakítási időkeret a szolgáltatóra váró lépésekhez (`route_request`, `web_search`, `web_fetch`)                                           |
| `MCP_TOOL_DENY`                         | (nincs beállítva = nincs szűrés)      | A `tools/list` listából eltávolítandó eszköznevek vesszővel elválasztott listája (az eszközök számosságának csökkentése — lásd alább)        |
| `MCP_TOOL_ALLOW`                        | (nincs beállítva = nincs szűrés)      | A kizárólagosan megtartandó eszköznevek vesszővel elválasztott listája (engedélyezésilista-mód — lásd alább)                                 |
| `DATA_DIR`                              | `~/.omniroute`                        | A rendszer a heartbeat fájlt a `${DATA_DIR}/runtime/mcp-heartbeat.json` útvonalra írja                                                       |

---

## Leírástömörítés

Az MCP-eszköz-, prompt- és erőforrás-nyilvántartások a regisztráció/listázás során tömöríthetik a leírásokat, hogy csökkentsék az ügyfelek számára elérhető metaadatok méretét (és ezáltal a prompt kontextusának költségét). A megvalósítás az `open-sse/mcp-server/descriptionCompressor.ts` fájlban található, és a `createMcpServer()` függvényen belüli `compressMcpRegistryMetadata` révén kapcsolódik az MCP-kiszolgálóhoz.

- A tömörítés a Caveman szabálykészlet (`getRulesForContext("all", "full")`) használatával fut végig a leírás szövegén, a megőrzendő blokkok (kódrészletek, körülhatárolt blokkok stb.) kivonásával, így a strukturális tartalom nem változik meg.
- Telepítésenként a `key_value` beállítási tábla `compression.mcpDescriptionCompressionEnabled` értékével kapcsolható be vagy ki (alapértelmezés: engedélyezve) — a felhasználói felületen az **Analitika → MCP-leírástömörítés** menüpontban érhető el.
- Folyamatszinten az `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` vagy az `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` használatával kapcsolható be vagy ki.
- A valós idejű statisztikák az `omniroute_compression_status` segítségével, az `analytics.mcpDescriptionCompression` alatt jelennek meg, és `source: "mcp_metadata_estimate"` címkével vannak ellátva, hogy megkülönböztethetők legyenek a szolgáltató tényleges használati bizonylataitól.

---

## Eszközszám-csökkentés (F4.3)

A leírástömörítés az egyes eszközök metaadatait csökkenti; az **eszközszám-csökkentés** egy lépéssel tovább megy, és azt mérsékli, hogy egyáltalán _hány_ eszköz legyen meghirdetve. Ha kevesebb eszköz szerepel a `tools/list` jegyzékben, az csökkenti az eszközkatalógus kliensmodell által fizetett, kérésenkénti tokenköltségét („5. rétegbeli” tömörítés). A megvalósítás egy tisztán működő, állapotmentes szűrő az `open-sse/mcp-server/toolCardinality.ts` fájlban (`reduceToolManifest`), amely a `createMcpServer()` (`open-sse/mcp-server/server.ts`) regisztrációs ciklusába van bekötve.

**Külön engedélyezendő, alapértelmezés szerint ki van kapcsolva.** A szűrő csak akkor fut le, ha a két környezeti változó közül legalább az egyik be van állítva; ha egyik sincs beállítva, mind a 110 eszköz változatlanul meg lesz hirdetve.

| Változó          | Mód                                                                                                  |
| :--------------- | :--------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Tiltólista — vesszővel elválasztott eszköznevek, amelyek mindig kimaradnak a `tools/list` jegyzékből |
| `MCP_TOOL_ALLOW` | Engedélyezési lista — vesszővel elválasztott eszköznevek; csak ezek maradnak meg, minden más kimarad |

A `deny` elsőbbséget élvez az `allow` beállítással szemben. A neveket vessző választja el, a környező szóközök eltávolításra kerülnek, az üres elemeket pedig a rendszer figyelmen kívül hagyja. Példák:

```bash
# Két eszköz eltávolítása a katalógusból
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Csak az útválasztási és kvótaeszközök meghirdetése (engedélyezésilista-mód)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**A kiszűrt eszközök eltávolításának módja:** a regisztráció mindig sikeres; a profil által elutasított eszköz ezután `.disable()` hívást kap az MCP SDK kezelőjén, így soha nem jelenik meg a `tools/list` jegyzékben, miközben a bekötés érintetlen marad (szabályos engedélyezés/letiltás, újraregisztráció nélkül). A profil elemzője a `readMcpToolProfileFromEnv(process.env)`, amely `null` értéket ad vissza (nincs szűrés), ha mindkét változó üres.

A `reduceToolManifest` mögötti, részletesebb `ToolProfile` struktúra támogatja a hatókörmetszet-alapú szűrést (`allowScopes`, `read:*` jellegű helyettesítő karakteres egyeztetéssel), valamint egy determinisztikus `maxTools` korlátot is. Ez a két beállítás azonban a teljes jegyzéket igényli a regisztráció idején, ezért jelenleg **nem** érhető el környezeti változókon keresztül (a `tools/list` szintű kapcsolódási pont nyomon követett későbbi feladat). Az `estimateManifestTokens()` használható a jegyzék tokenköltségének összehasonlítására a csökkentés előtt és után.

---

## Futásidejű szívverés

A stdio átvitel 5 másodpercenként menti az elérhetőségi állapotot a `${DATA_DIR}/runtime/mcp-heartbeat.json` fájlba. Az irányítópult (`/api/mcp/status`) ezt a fájlt és a PID élő állapotát olvassa be az `online` érték meghatározásához. A HTTP-átvitelek ehelyett a folyamaton belüli `getMcpHttpStatus()` állapotát jelentik (fájlírás nélkül).

A szívverési pillanatkép a következőket tartalmazza:

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

## Auditnaplózás

Az `open-sse/mcp-server/audit.ts` minden eszközhívást naplóz a SQLite `mcp_tool_audit` táblájába:

- Eszköznév, argumentumok (az eszközönkénti `auditLevel` szerint kivonatolva/csonkolva), eredmény
- Időtartam ezredmásodpercben, siker/sikertelenség jelzője, hibaüzenet (ha alkalmazható)
- API-kulcs kivonata, időbélyeg
- A hatókör-megtagadások `scope_denied:<reason>` formában, a hiányzó hatókörök listájával együtt kerülnek naplózásra

A legutóbbi hívásokat az irányítópulton, illetve az `/api/mcp/audit` és `/api/mcp/audit/stats` REST-végpontokon tekintheti meg.

---

## Fájlok

| Fájl                                                                     | Rendeltetés                                                                           |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| `open-sse/mcp-server/server.ts`                                          | MCP-kiszolgáló gyártófüggvénye, stdio belépési pont, hatóköralapú eszközregisztrációk |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP-átvitel (munkamenet-kezelés)                                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Eszközhatókörök kiértékelése és a hívó feloldása                                      |
| `open-sse/mcp-server/audit.ts`                                           | Eszközhívások auditnaplózása (`mcp_tool_audit`)                                       |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio szívverésíró (`mcp-heartbeat.json`)                                             |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Leírástömörítés az eszköz-, prompt- és erőforrás-nyilvántartásokhoz                   |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod-sémák + eszköznyilvántartás (`MCP_TOOLS`, 45 bejegyzés)                           |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 2. fázisú, gyorsítótár- és 1proxy-eszközkezelők                                       |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Tömörítőeszközök kezelői                                                              |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Memóriaeszközök definíciói (3 eszköz)                                                 |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Készségeszközök definíciói (4 eszköz)                                                 |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion-kontextusforrás eszközdefiníciói (6 eszköz)                                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Játékosítási eszközök definíciói (8 eszköz)                                           |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Bővítményregisztrációs és -kezelési eszközök (8 eszköz)                               |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` végpont                                                             |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` végpont                                                              |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE-átviteli útvonal                                                   |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP-átviteli útvonal                                    |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` auditnapló-lekérdezés                                                |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` összesített auditmetrikák                                      |
| `src/lib/notion/api.ts`                                                  | Notion REST API-kliens (újrapróbálkozás, időtúllépés, hibabesorolás)                  |
| `src/lib/db/notion.ts`                                                   | Notion-token tartós tárolása (`key_value` tábla)                                      |
| `src/app/api/settings/notion/route.ts`                                   | Notion-beállítások API-ja (GET/POST/DELETE)                                           |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion-tokenkezelési felhasználói felület                                             |
| `tests/unit/notion-api.test.ts`                                          | Notion API-kliens tesztjei (7)                                                        |
| `tests/unit/notion-tools.test.ts`                                        | Notion-eszközök hatókör-kikényszerítési tesztjei (10)                                 |
| `tests/unit/db/notion.test.mjs`                                          | A Notion DB-modul tesztjei (3)                                                        |
