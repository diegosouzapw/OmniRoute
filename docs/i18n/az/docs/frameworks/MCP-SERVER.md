# OmniRoute MCP Server Documentation (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Marşrutlaşdırma, keş, sıxılma, yaddaş, bacarıqlar, proksi, hovuz, Radar və kontekst mənbəyi əməliyyatları üzrə 110 alətə malik Model Context Protocol serveri.
>
> Həqiqətin əsas mənbəyi: `open-sse/mcp-server/server.ts` faylı `countUniqueMcpTools()` ilə **110 unikal alət** hesablayır: 45 kanonik tərif (altı CCR həyat dövrü aləti, agent bacarıqları üçlüyü, `omniroute_radar_catalog` və `omniroute_x_search` daxil olmaqla), üstəgəl yaddaş (3), bacarıqlar (4), GitHub bacarıqları (3), hovuz (6), oyunlaşdırma (8), plaginlər (8), Notion (6), Obsidian (22), lokal korpus (3) və yalnız RTK-yə aid iki sıxılma aləti.

## Quraşdırma

OmniRoute MCP daxildə mövcuddur. Onu belə başladın:

```bash
omniroute --mcp
```

Yaxud open-sse nəqliyyatı vasitəsilə:

```bash
# HTTP axınlı nəqliyyat (port 20130)
omniroute --dev  # MCP /mcp son nöqtəsində avtomatik başlayır
```

HTTP nəqliyyatları (`sse` / `streamable-http`, idarə paneli serveri tərəfindən proses daxilində təqdim olunur)
standart olaraq deaktivdir və əvvəllər yalnız `/dashboard/mcp` səhifəsindən dəyişdirilə bilirdi. v3.8.51-dən
etibarən CLI də eyni imkanlara malikdir:

```bash
omniroute mcp status                                  # aktiv/onlayn vəziyyəti, nəqliyyat, alət sayı
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # aktiv sse/streamable-http sessiyalarını sıfırlayır
```

`mcp enable`/`mcp disable`, idarə panelinin `/api/settings` vasitəsilə dəyişdirdiyi eyni `mcpEnabled`
(və istəyə görə `mcpTransport`) parametrini PATCH edir. `mcp restart`, `POST /api/mcp/restart` çağırır: növbəti
sorğunun təmiz şəkildə yenidən başladılması üçün aktiv `sse`/`streamable-http` sessiyalarını dayandırır, MCP
deaktivdirsə `409`, `stdio` nəqliyyatı üçün isə `501` qaytarır (stdio klientləri öz alt proseslərinə sahibdir —
yenidən başlatmaq üçün prosesdaxili idarəetmə mexanizmi yoxdur).

## Nəqliyyatlar

MCP serveri eyni `createMcpServer()` fabrikinə əsaslanan üç nəqliyyat təqdim edir:

| Nəqliyyat         | Harada                                             | Nə zaman istifadə edilməli                              |
| :---------------- | :------------------------------------------------- | :------------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`                    | IDE inteqrasiyaları (Claude Desktop, Cursor və s.)      |
| `sse`             | `httpTransport` vasitəsilə `POST/GET /api/mcp/sse` | Hadisə axınına ehtiyacı olan brauzer/agent klientləri   |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                  | Çoxsessiyalı HTTP klientləri (`mcp-session-id` başlığı) |

Aktiv HTTP nəqliyyatı (`sse` və ya `streamable-http`) `mcpTransport` parametri ilə seçilir. Nəqliyyatların dəyişdirilməsi digər nəqliyyatdakı mövcud sessiyaları bağlayır.

### Uzaqdan giriş (manage əhatə dairəsindən yan keçmə)

`/api/mcp/*` LOCAL_ONLY səviyyəsindədir (`src/server/authz/routeGuard.ts`) — standart olaraq ona yalnız geridöngə hostları (`localhost`, `127.0.0.1`, `::1`) çata bilər. v3.8.2-dən etibarən geridöngə olmayan klientlər, `manage` əhatə dairəsinə malik açarın daxil olduğu `Authorization: Bearer <api-key>` təqdim etdikdə qoşula bilərlər. Tunel, əks proksi və ya ictimai host adı vasitəsilə uzaq MCP serverinə çatmağın yeganə yolu budur.

```bash
# manage əhatə dairəsini verin: idarə panelində API Keys səhifəsini açın və açar üçün
# "Management Access" seçimini aktivləşdirin və ya yaradarkən POST scopes:["manage"] göndərin.

# Sonra uzaq MCP klientindən qoşulun:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` əhatə dairəsi olmayan açar (və ya Bearer olmadıqda) `403 LOCAL_ONLY` qaytarır. Qonşu `/api/cli-tools/runtime/*` prefiksi üçün yan keçmə qəsdən MÜMKÜN DEYİL — [Route Guard səviyyələri — manage əhatə dairəsi üçün istisna](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) bölməsinə baxın.

## IDE Konfiqurasiyası

Claude Desktop, Cursor, Cline və uyğun MCP klientlərinin qurulması üçün [MCP Klient Konfiqurasiyası](../guides/SETUP_GUIDE.md#mcp-client-configuration) bölməsinə baxın.

---

## Əsas Alətlər (14) — Mərhələ 1

| Alət                            | Əhatə dairələri       | Təsvir                                                                                                                                                   |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Fasiləsiz işləmə müddəti, yaddaş, dövrə kəsiciləri, sürət limitləri, keş statistikası                                                                    |
| `omniroute_list_combos`         | `read:combos`         | Strategiyalarla birlikdə bütün konfiqurasiya edilmiş kombolar (istəyə bağlı metrikalar)                                                                  |
| `omniroute_get_combo_metrics`   | `read:combos`         | Konkret bir kombo üçün performans metrikaları                                                                                                            |
| `omniroute_switch_combo`        | `write:combos`        | Kombonu aktivləşdirmək və ya deaktivləşdirmək                                                                                                            |
| `omniroute_create_combo`        | `write:combos`        | Mövcud kombo API-si vasitəsilə doğrulanmış kombo yaratmaq                                                                                                |
| `omniroute_check_quota`         | `read:quota`          | İstifadə edilmiş/ümumi kvota, qalan faiz, sıfırlanma vaxtı, token vəziyyəti                                                                              |
| `omniroute_route_request`       | `execute:completions` | OmniRoute marşrutlaşdırması vasitəsilə çat tamamlama sorğusu göndərmək                                                                                   |
| `omniroute_cost_report`         | `read:usage`          | Dövr üzrə xərc hesabatı (sessiya/gün/həftə/ay)                                                                                                           |
| `omniroute_list_models_catalog` | `read:models`         | İmkanlar, status və qiymətlərlə birlikdə tam model kataloqu                                                                                              |
| `omniroute_radar_catalog`       | `read:radar`          | Lokal imzalanmış Radar kataloqu; istəyə bağlı provayder/ailə filtrləri                                                                                   |
| `omniroute_tool_search`         | `read:tools`          | Qeydiyyatdan keçmiş MCP kataloqunda alətləri tapmaq                                                                                                      |
| `omniroute_web_search`          | `execute:search`      | Konfiqurasiya edilmiş axtarış provayderləri vasitəsilə veb axtarışı. X/Twitter deyil.                                                                    |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok vasitəsilə X-də axtarış etmək və ya Xquik API nəticələri üçün `xquik-search` seçmək. Seçilmiş backend üçün giriş məlumatları tələb olunur. |
| `omniroute_web_fetch`           | `execute:search`      | Konfiqurasiya edilmiş əldəetmə provayderləri vasitəsilə veb məzmunu əldə etmək                                                                           |

## Qabaqcıl Alətlər (11) — Mərhələ 2

| Alət                               | İcazə sahələri                       | Təsvir                                                                                                                                             |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Ehtiyat keçid ağacı ilə icra etmədən marşrutlaşdırma simulyasiyası                                                                                 |
| `omniroute_set_budget_guard`       | `write:budget`                       | Keyfiyyəti azaltma/bloklama/xəbərdarlıq əməli ilə sessiya büdcəsi                                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Kombinasiya strategiyasını icra zamanı yeniləyir (prioritet/çəkili/avtomatik və s.)                                                                |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` dayanıqlılıq əvvəlcədən təyin edilmiş parametrini tətbiq edir                                           |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Real yuxarı axın sorğusundan istifadə edərək kombinasiyadakı hər bir provayderin canlı sınağı                                                      |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 gecikməsi və dövrə kəsicisinin vəziyyəti ilə hər provayder üzrə metriklər                                                              |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Büdcə/gecikmə məhdudiyyətləri ilə tapşırıq növünə görə kombinasiya tövsiyə edir                                                                    |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Sorğunun niyə müəyyən provayderə yönləndirildiyini izah edir (qiymətləndirmə amilləri + ehtiyat keçidlər)                                          |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Tam sessiya görüntüsü: xərc, tokenlər, əsas modellər/provayderlər, xətalar, büdcə qoruyucusu                                                       |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Pozulmuş kombinasiya istinadları / sahibsiz sətirlər kimi verilənlər bazası uyğunsuzluqlarını diaqnostika edir (və istəyə görə avtomatik düzəldir) |
| `omniroute_sync_pricing`           | `pricing:write`                      | Qiymət məlumatlarını xarici mənbələrdən (LiteLLM) sinxronlaşdırır; `dryRun` dəstəklənir                                                            |

## Keş Alətləri (2)

| Alət                    | İcazə sahələri | Təsvir                                                 |
| :---------------------- | :------------- | :----------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`   | Semantik keş, sorğu keşi və idempotentlik statistikası |
| `omniroute_cache_flush` | `write:cache`  | Keşi qlobal şəkildə və ya imza/model üzrə təmizləyir   |

## Sıxışdırma Alətləri (13)

| Alət                                | İcazə sahələri      | Təsvir                                                                                                                                                   |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Sıxışdırma parametrləri, analitika xülasəsi və keş nəzərə alınmaqla statistika (`analytics.mcpDescriptionCompression` metadatasını ehtiva edir)          |
| `omniroute_compression_configure`   | `write:compression` | Sıxışdırma rejimini, həddi, hədəf nisbətini, sistem sorğusunun qorunmasını və MCP təsviri sıxışdırma keçidini konfiqurasiya edir                         |
| `omniroute_set_compression_engine`  | `write:compression` | Aktiv mühərriki (off/caveman/rtk/stacked) və Caveman/RTK intensivliyini seçir                                                                            |
| `omniroute_list_compression_combos` | `read:compression`  | Adlandırılmış sıxışdırma kombinasiyalarını və onların mühərrik konveyerlərini sadalayır                                                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Sıxışdırma kombinasiyası və mühərrik üzrə qruplaşdırılmış analitika                                                                                      |
| `omniroute_ccr_store`               | `write:compression` | Çağıran tərəfə görə təcrid olunmuş məzmunu ölçüsü məhdudlaşdırılmış yaddaşdaxili CCR yaddaşında saxlayır və markerlə birlikdə `ccr://` istinadı qaytarır |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR məzmununu tam şəkildə və ya başlanğıc, sonluq, sətirlər, grep və statistika rejimləri ilə əldə edir                                                  |
| `omniroute_ccr_inspect`             | `read:compression`  | Məzmunu qaytarmadan çağıran tərəfə məxsus CCR metadatasını yoxlayır                                                                                      |
| `omniroute_ccr_list`                | `read:compression`  | Çağıran tərəfə məxsus CCR blokları üçün səhifələnmiş metadatanı sadalayır                                                                                |
| `omniroute_ccr_delete`              | `write:compression` | Çağıran tərəfə məxsus CCR blokunu silir                                                                                                                  |
| `omniroute_ccr_stats`               | `read:compression`  | Çağıran tərəf üzrə yaddaş istifadəsini, həyat dövrü sayğaclarını və yaddaş məhdudiyyətlərini bildirir                                                    |
| `omniroute_rtk_discover`            | `read:compression`  | İştirakı könüllü seçilmiş RTK çıxış nümunələrində təkrarlanan küyü aşkarlayır                                                                            |
| `omniroute_rtk_learn`               | `read:compression`  | İştirakı könüllü seçilmiş nümunələrdən nəzərdən keçirilə bilən RTK filtri qaralaması yaradır                                                             |

CCR qeydləri yalnız yaddaş daxilində saxlanılır və yenidən başladıldıqda yox olur. Hər blok 2 MiB, hər
əsas subyekt 16 MiB, qlobal yaddaş isə 64 MiB ilə məhdudlaşdırılıb. Qeydlər üçün standart TTL 24 saatdır (maksimum
yeddi gün). Tam MCP əldəetməsi 256 KiB ilə məhdudlaşdırılıb; daha böyük bloklar diapazon və grep rejimləri vasitəsilə
əlçatan qalır. Saxlama, əldəetmə, siyahılama, yoxlama, silmə və statistika autentifikasiya edilmiş
API açarının əsas subyektinə görə təcrid olunur. Audit qeydlərində yalnız heşlər və ölçü metadatası saxlanılır, məzmun isə heç vaxt saxlanılmır.

`omniroute_compression_status` MCP təsvir sıxılmasını ayrıca
`analytics.mcpDescriptionCompression` altında bildirir. Bu dəyərlər MCP-də siyahılana bilən
təsvirlər (`tools`, `prompts`, `resources` və `resourceTemplates`) üçün metadata ölçüsü təxminləridir;
onlar provayder istifadə qəbzləri deyil və `source: "mcp_metadata_estimate"` ilə işarələnir.

### MCP Əlçatanlıq Ağacı Filtri (v3.8.0)

Yuxarıdakı sıxılma alətlərindən ayrı olaraq, OmniRoute MCP brauzer/əlçatanlıq alətlərinin
**alət nəticələrini** agentə qaytarmazdan əvvəl sıxan icradan sonrakı filtr ehtiva edir. Bu filtr özü
alət deyil — geniş həcmli əlçatanlıq ağacı və ya brauzer ani görüntüsü mətni (≥2000 simvol) ehtiva
edən istənilən alət nəticəsi üzərində şəffaf şəkildə işləyir.

Əsas davranışlar:

- Ardıcıl təkrarlanan ≥30 qonşu sətri başlanğıc + son xülasə formasında yığcamlaşdırır
- Playwright/computer-use üçün tələb olunan `[ref=eXX]` lövbərlərini qoruyur
- Həddindən artıq böyük mətni (>50,000 simvol) naviqasiya ipucu ilə məcburi şəkildə qısaldır
- Gözlənilən qənaət: brauzer ani görüntüsü faydalı yüklərində **60–80%**

Konfiqurasiya: qlobal parametrlərdə `compression.mcpAccessibility` (miqrasiya 056).
İmplementasiya: `open-sse/services/compression/engines/mcpAccessibility/`.
Tam sənədlər: [Sıxılma Mühərrikləri — MCP Əlçatanlıq Ağacı Filtri](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Bu alətlərin arxasındakı icra vaxtı sıxılma modeli üçün [Sıxılma Mühərrikləri](../compression/COMPRESSION_ENGINES.md) və [RTK Sıxılması](../compression/RTK_COMPRESSION.md) sənədlərinə baxın.

## 1Proxy Alətləri (3)

| Alət                        | Əhatə dairələri | Təsvir                                                                                       |
| :-------------------------- | :-------------- | :------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies`  | 1proxy bazarından pulsuz proksiləri əldə edin (protokol/ölkə/keyfiyyət/limit filtrləri)      |
| `omniroute_oneproxy_rotate` | `read:proxies`  | Strategiyaya əsasən növbəti əlçatan proksini əldə edin (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies`  | Hovuz statistikası, sinxronizasiya vəziyyəti, protokol və ölkə üzrə paylanma                 |

## Yaddaş Alətləri (3)

`open-sse/mcp-server/tools/memoryTools.ts` faylında müəyyən edilib. Autentifikasiya/əhatə dairəsi standart MCP əhatə dairəsi emal xətti vasitəsilə tətbiq edilir.

| Alət                      | Əhatə dairələri | Təsvir                                                                                                        |
| :------------------------ | :-------------- | :------------------------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`   | Token büdcəsi məhdudiyyəti tətbiq edilməklə sorğu / növ / API açarı üzrə yaddaş qeydlərini axtarın            |
| `omniroute_memory_add`    | `write:memory`  | Yeni yaddaş qeydi əlavə edin (`factual` / `episodic` / `procedural` / `semantic`)                             |
| `omniroute_memory_clear`  | `write:memory`  | İstəyə görə növ və ya `olderThan` vaxt möhürünə əsasən filtrləməklə API açarının yaddaş qeydlərini təmizləyin |

## Bacarıq Alətləri (4)

`open-sse/mcp-server/tools/skillTools.ts` faylında müəyyən edilib. `src/lib/skills/registry` + `src/lib/skills/executor` tərəfindən dəstəklənir.

| Alət                          | Əhatə dairələri  | Təsvir                                                                                                             |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API açarı, ad və ya aktivlik vəziyyətinə görə istəyə bağlı filtrləmə ilə qeydiyyatdan keçmiş bacarıqları sadalayın |
| `omniroute_skills_enable`     | `write:skills`   | ID-yə əsasən konkret bacarığı aktivləşdirin və ya deaktiv edin                                                     |
| `omniroute_skills_execute`    | `execute:skills` | Təqdim edilmiş giriş məlumatları ilə bacarığı icra edin və icra qeydini qaytarın                                   |
| `omniroute_skills_executions` | `read:skills`    | Son bacarıq icralarının tarixçəsini sadalayın                                                                      |

## Notion Kontekst Mənbəyi (6)

`open-sse/mcp-server/tools/notionTools.ts` faylında müəyyən edilib. Token `src/lib/db/notion.ts` vasitəsilə `key_value` cədvəlində saxlanılır. REST klienti `src/lib/notion/api.ts` faylındadır. Parametrlər API-si `src/app/api/settings/notion/route.ts` faylındadır. İdarəetmə panelinin istifadəçi interfeysi `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` faylındadır.

Notion inteqrasiya tokeninizi Endpoint idarəetmə panelindəki **Kontekst Mənbələri** bölməsindən və ya REST API vasitəsilə konfiqurasiya edin:

```bash
# Tokeni təyin edin
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Vəziyyəti yoxlayın
curl http://localhost:20128/api/settings/notion

# Bağlantını kəsin
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Alət                         | Əhatə dairələri | Təsvir                                                                    |
| :--------------------------- | :-------------- | :------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`   | Bütün səhifələr və verilənlər bazaları üzrə tam mətn axtarışı             |
| `notion_get_page`            | `read:notion`   | Səhifəni xüsusiyyətləri ilə birlikdə ID-yə əsasən əldə edin               |
| `notion_list_block_children` | `read:notion`   | Səhifənin və ya blokun alt bloklarını sadalayın                           |
| `notion_query_database`      | `read:notion`   | Filtrlər, sıralamalar və səhifələmə ilə verilənlər bazasında sorğu aparın |
| `notion_get_database`        | `read:notion`   | Verilənlər bazasının sxemini ID-yə əsasən əldə edin                       |
| `notion_append_blocks`       | `write:notion`  | Ana bloka alt bloklar əlavə edin (hər sorğu üçün maksimum 100)            |

## Agent Bacarıqları Kataloqu Alətləri (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` faylında müəyyən edilib. `src/lib/agentSkills/catalog` tərəfindən dəstəklənir. Bu alətlər 45 qeyddən ibarət Agent Bacarıqları sənədləşdirmə kataloqunu MCP müştərilərinə və xarici agentlərə təqdim edir. Əhatə dairəsi: `read:catalog`.

| Alət                              | Əhatə dairələri | Təsvir                                                                                                                                |
| :-------------------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog`  | İxtiyari `category` (api\|cli) və `area` filtrləri ilə bütün 45 agent bacarığını siyahıya alır; metadata + əhatə məlumatını qaytarır  |
| `omniroute_agent_skills_get`      | `read:catalog`  | Kanonik `id` əsasında tək bir bacarıq üçün tam metadata + SKILL.md məzmununu əldə edir                                                |
| `omniroute_agent_skills_coverage` | `read:catalog`  | Əhatə statistikası: 23 API, 21 CLI və 1 konfiqurasiya bacarığından neçəsinin fayl sistemində SKILL.md faylı olduğu və kataloq cəmləri |

Tam kataloq və xarici agentlərin ondan necə istifadə etdiyi barədə məlumat üçün [AGENT-SKILLS.md](./AGENT-SKILLS.md) sənədinə baxın.

## Əlaqəli Freymvörklər (v3.8.0)

Yuxarıdakı MCP alət inventarı (`countUniqueMcpTools()` tərəfindən hesablanan 110 unikal alət) məqsədli şəkildə
icra vaxtı marşrutlaşdırma/keşləmə/sıxılma/yaddaş/bacarıqlar/proksi/kontekst-mənbə əməliyyatları ilə məhdudlaşdırılıb. İki əlaqəli
freymvörk v3.8.0 versiyasında MCP serveri ilə birlikdə təqdim olunur və ayrıca sənədləşdirilir:

### Bulud Agentləri

Bulud Agentləri LLM provayderləri üçün istifadə olunan eyni bağlantı modeli vasitəsilə
OmniRoute-a qoşulan, prosesdənkənar AI kodlaşdırma agentləridir (codex-cloud, cursor-cloud, devin, jules). Onlar
öz REST səthləri (`/api/v1/agents/*`) vasitəsilə təqdim olunur və MCP alət kataloqunun bir hissəsi **deyil**
— Bulud Agentinin çağırılması MCP əhatə dairəsini sərf etmir.

- Reallaşdırma: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Həyat dövrü: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Sənədləşdirmə: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Qoruyucu Mexanizmlər

Qoruyucu mexanizmlər söhbət emalı xətti daxilində tətbiq olunan icradan əvvəlki/sonrakı filtrlərdir (vision-bridge, pii-masker, prompt-injection).
Onlar MCP alət/marşrut qatına çatılmazdan əvvəl işləyir
və audit emalı xəttinə strukturlaşdırılmış pozuntu məlumatları göndərir; onlar MCP alətləri kimi çağırılmır.

- Reallaşdırma: `src/lib/guardrails/`.
- Sənədləşdirmə: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Bloklanmış görünən MCP çağırışını sazlayarkən həm MCP audit jurnalını
(`scope_denied:*` qeydləri), həm də qoruyucu mexanizmlərin audit izini yoxlayın — sorğu MCP əhatə dairəsinin
tətbiqi qatına çatmamışdan **əvvəl** qoruyucu mexanizm tərəfindən rədd edilə bilər.

---

## REST API Son Nöqtələri

| Son nöqtə              | Metod                 | Təsvir                                                                                                               | Autentifikasiya             |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------- | :-------------------------- |
| `/api/mcp/status`      | `GET`                 | Server statusu: fəaliyyət siqnalı, HTTP nəqliyyat vəziyyəti, audit fəaliyyəti xülasəsi                               | İdarəetmə (sessiya/admin)   |
| `/api/mcp/tools`       | `GET`                 | Alət kataloqu (ad, təsvir, əhatə dairələri, mərhələ, mənbə son nöqtələri)                                            | İdarəetmə                   |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE nəqliyyat son nöqtəsi (`mcpEnabled` + `mcpTransport === "sse"` ilə məhdudlaşdırılır)                             | API açarı + əhatə dairələri |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Axınlı HTTP nəqliyyatı (`mcp-session-id` başlığından istifadə edir; `DELETE` sessiyanı bitirir)                      | API açarı + əhatə dairələri |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit`-dən audit jurnalı qeydləri (filtrlər: `limit`, `offset`, `tool`, `success`, `apiKeyId`)             | İdarəetmə                   |
| `/api/mcp/audit/stats` | `GET`                 | Aqreqasiya edilmiş audit statistikası (`totalCalls`, `successRate`, `avgDurationMs`, ən çox istifadə olunan alətlər) | İdarəetmə                   |

Mənbə faylları: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Həm SSE, həm də Axınlı HTTP nəqliyyatları MCP serveri Parametrlərdə (`mcpEnabled`) aktivləşdirilənə və uyğun `mcpTransport` seçilənə qədər bloklanır. Yanlış nəqliyyat konfiqurasiya edilibsə, marşrut parametrlərin dəyişdirilməsinə dair göstərişlə birlikdə HTTP 400 qaytarır.

---

## Autentifikasiya və əhatə dairələri

MCP alət çağırışları əhatə dairəsi sətirlərini çağıran tərəfdən oxuyur. Bu yoxlama üç müstəqil ad məkanından biridir. Bir yoxlayıcıdan keçmək digərlərindən keçmək demək deyil. Qaydalar [Üç əhatə dairəsi ad məkanı](#three-scope-namespaces) bölməsindədir.
Alət kataloqu [MCP alət əhatə dairələri](#mcp-tool-scopes) bölməsindədir.

### Üç əhatə dairəsi ad məkanı

API açarındakı `manage`, MCP alətindəki `read:compression` və `oma_live_…` giriş tokenindəki `read` üç fərqli icazədir. Mutasiya edən idarəetmə marşrutuna `read` giriş tokeni göndərən çağıranlar HTTP 403 alır:
`Access token scope 'read' is insufficient; 'write' required.`
Bu dərəcə `scopeSatisfies` vasitəsilə yoxlanılır. O, MCP cədvəlinə baxmır və MCP uyğunlaşdırıcısı da ona baxmır.

| Ad məkanı                  | Etimadnamə                                                       | Yoxlayıcı                    | Uğurlu yoxlamanın verdiyi icazə                             |
| :------------------------- | :--------------------------------------------------------------- | :--------------------------- | :---------------------------------------------------------- |
| API açarı ilə idarəetmə    | `api_keys.scopes`                                                | `hasManageScope`             | Həmin Bearer açarı üçün idarəetmə REST interfeysi           |
| API açarının əlavə icazəsi | eyni massiv, bir dəqiq sətir                                     | aşağıda adlandırılan köməkçi | Yalnız həmin bir imkan                                      |
| MCP alət əhatə dairələri   | eyni massiv, əks halda MCP `_meta`, sonra `OMNIROUTE_MCP_SCOPES` | `scopeMatches`               | Tətbiqetmə aktiv olduqda həmin alət                         |
| Giriş tokeni               | `oma_live_…`                                                     | `scopeSatisfies`             | Metodu və yolu həmin dərəcəni tələb edən idarəetmə marşrutu |

Hər bir etimadnamənin yaradılması
[İdarəetmə autentifikasiyası](../guides/MANAGEMENT-AUTH.md) bölməsində izah edilir.

#### API açarının əhatə dairələri

Bir `api_keys.scopes` massivi iki işi yerinə yetirir. Onlar fərqli funksiyalardan istifadə edir.

**İdarəetmə REST interfeysi.** `manage` və `admin`,
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) üzvləridir.
Həmin açar üçün idarəetmə marşrutlarını səlahiyyətləndirən `hasManageScope` funksiyasıdır. `admin` həmin marşrutlarda idarəetmə imkanına malikdir. Buradakı `admin` sözü giriş tokeninin dərəcəsi deyil və MCP alət əhatə dairələrinə genişlənmir.

**Əlavə sətirlər.** Hər biri dəqiq üzvlük yoxlamasıdır və hər biri
`MANAGEMENT_API_KEY_SCOPES` xaricində qalır.

| Əhatə dairəsi                  | Uğurlu yoxlamanın verdiyi icazə                                                                                                                                                      |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Yalnız loopback olmayan `/api/mcp/` üçün LOCAL_ONLY istisnası (`hasMcpConnectOrManageScope`). `manage` və ya `admin` olan açar da bu istisnadan keçir.                               |
| `self:usage`                   | Bu açar üçün `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` yaradılma zamanı bu əhatə dairəsini əlavə edir (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Həmin status faydalı yükündə yuxarı axın hesab kvotaları (`src/lib/usage/apiKeySelfService.ts`). Status marşrutu yenə də `self:usage` tələb edir.                                    |
| `policy:bypass-provider-quota` | Bu açarın inferensiya çağırışları provayder kvotası siyasətini ötür (`src/sse/handlers/chat.ts` daxilində `hasProviderQuotaBypassScope`).                                            |

#### Uyğunlaşdırma

Kataloq [MCP alət əhatə dairələri](#mcp-tool-scopes) altındakı cədvəldir.
`src/shared/constants/mcpScopes.ts` daxilindəki `MCP_SCOPE_LIST` dəyərini həmin kataloq hesab etməyin:
o, ilkin tipləşdirilmiş alt çoxluqdur. Sonradan əlavə edilmiş alətlər digər əhatə dairələrini onun yanında elan edir
(`read:notion`, `read:skills`, `read:local-corpus` və cədvəlin qalan hissəsi).

`open-sse/mcp-server/scopeEnforcement.ts` daxilindəki `evaluateToolScopes`, tələb olunan hər əhatə dairəsi verilmiş əhatə dairələrindən hansısa biri ilə uyğun gəldikdə çağırışa icazə verir:

- `*` tələb olunan hər əhatə dairəsinə uyğun gəlir.
- Sonu `*` ilə bitən verilmiş əhatə dairəsi, ulduzdan əvvəlki prefikslə başlayan tələb olunan əhatə dairəsinə uyğun gəlir. `read:*`, `read:compression` ilə uyğun gəlir.
- Digər bütün verilmiş əhatə dairələri yalnız eyni olan tələb olunan sətirlə uyğun gəlir.

Əhatə dairələri `["manage"]` olan açar `read:compression` üçün `scopeMatches` yoxlamasından keçmir.
Yalnız verilmiş sətirlər olduqda eyni çağırış `admin`, `mcp:connect`, `read` və `write` üçün də uğursuz olur. Sonda gələn `*` xaricində MCP alət əhatə dairələri arasında heç bir iyerarxiya yoxdur.

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` olmadıqda tətbiqetmə deaktivdir (standart dəyər
`false`). O, deaktiv olduğu müddətdə `evaluateToolScopes` çağırışa icazə verir və kataloqu ötürür. Aktiv olduqda HTTP Bearer açarının `api_keys.scopes` dəyərini
`authInfo` kimi istifadə edir (baxın: [Açar üzrə HTTP əhatə dairəsinin bağlanması](#per-key-http-scope-binding-7895)).
Heç bir açar əhatə dairəsi müəyyən edilmədikdə, verilmiş çoxluq əvvəlcə MCP `_meta`, sonra isə
`OMNIROUTE_MCP_SCOPES` dəyərinə keçir.

#### Giriş tokeninin əhatə dairələri

`oma_live_…` tokenləri (`src/lib/accessTokens/scopes.ts`) `read`, `write`
və ya `admin` daşıyır. `scopeSatisfies` bir dərəcədir: `admin`, `write` və `read` səviyyələrini, `write` isə `read` səviyyəsini əhatə edir. Naməlum əhatə dairələri heç bir icazə vermir.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) həmin dərəcəni
`inferRequiredScope` (`src/server/authz/accessScopes.ts`) ilə müqayisə edir:

- `GET`, `HEAD` və `OPTIONS` üçün `read` tələb olunur.
- Bütün digər metodlar üçün `write` tələb olunur.
- `ADMIN_SCOPE_PREFIXES` daxilindəki yollar hər metod üçün `admin` tələb edir. `/api/mcp`
  həmin siyahıdadır, buna görə də `write` giriş tokeni hələ də MCP HTTP səthini çağıra bilmir.
- `ADMIN_MUTATION_PREFIXES` daxilindəki yollar yalnız mutasiyalar üçün `admin` tələb edir.

`PATCH /api/keys/{id}` mutasiya əməliyyatıdır və həmin admin siyahılarında yoxdur, buna görə də
`read` tokeni 403 cavabı alır:
`Access token scope 'read' is insufficient; 'write' required.`
`write` və ya `admin` giriş tokeni həmin marşrutun tələblərini ödəyir. İdarəetmə panelinin JWT-si,
loopback CLI machine-id tokeni və `manage` və ya `admin` səlahiyyətinə malik API açarı
digər şaxələr üzrə işlənir və bu dərəcə ilə məhdudlaşdırılmır.

`/api/mcp` üçün `scopeSatisfies` yoxlamasından keçən giriş tokeni yalnız
idarəetmə keçidini keçmiş olur. Alət çağırışları yenə də API açarının
səlahiyyətlərinə qarşı `scopeMatches` yoxlamasını icra edir. Giriş tokeninin dərəcəsi `scopeMatches`
üçün giriş məlumatı deyil.

### MCP alətlərinin səlahiyyətləri

Səlahiyyətlərin tətbiqi `open-sse/mcp-server/scopeEnforcement.ts` faylında mərkəzləşdirilib.
Hər alət konkret səlahiyyətlər tələb edir:

| Əhatə dairəsi         | Alətlər                                                                                                                                                                       |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                             |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                     |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                        |
| `read:quota`          | `check_quota`                                                                                                                                                                 |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                        |
| `read:models`         | `list_models_catalog`                                                                                                                                                         |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                 |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                         |
| `write:budget`        | `set_budget_guard`                                                                                                                                                            |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                   |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                |
| `read:cache`          | `cache_stats`                                                                                                                                                                 |
| `write:cache`         | `cache_flush`                                                                                                                                                                 |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                    |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                             |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                         |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                              |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                        |
| `read:memory`         | `memory_search`                                                                                                                                                               |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                  |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                            |
| `write:skills`        | `skills_enable`                                                                                                                                                               |
| `execute:skills`      | `skills_execute`                                                                                                                                                              |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                              |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                       |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                     |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                              |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                            |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                               |
| `read:obsidian`       | 13 oxuma aləti — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 yazma aləti — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                             |

Əvəzedici simvollu əhatə dairələri dəstəklənir: `read:*` bütün oxuma əhatə dairələrini, `*` isə tam giriş icazəsini verir.

### `mcp:connect` — dar marşrut imkanı (#7895)

HTTP/SSE MCP nəqliyyatına (`/api/mcp/*`) loopback olmayan ünvandan çatmaq üçün
`/api/mcp/` LOCAL_ONLY istisnası tələb olunur (bax: `docs/security/ROUTE_GUARD_TIERS.md`). Tarixən
bu istisna yalnız tam `manage`/`admin` əhatə dairəli API açarını qəbul edirdi — bu isə yalnız
MCP ilə əlaqə saxlamağa ehtiyacı olan çağıran tərəf üçün həddən artıq geniş idi. `src/shared/constants/managementScopes.ts` indi
`MCP_CONNECT_SCOPE = "mcp:connect"` ixrac edir: yalnız
`src/server/authz/policies/management.ts` daxilindəki `/api/mcp/` keçidinə icazə verən əlavə, dar əhatə dairəsi (`SELF_USAGE_SCOPE` ilə eyni presedent) — bu, başqa heç bir idarəetmə marşrutuna giriş
vermir və qəsdən `MANAGEMENT_API_KEY_SCOPES`-dan KƏNARDA saxlanılır. `manage`/`admin`
səlahiyyətinə malik açar əvvəlki kimi istisnadan keçir; `mcp:connect`,
`hasMcpConnectOrManageScope()` vasitəsilə yoxlanılan və yalnız uzaq MCP çağıranları üçün nəzərdə tutulmuş
daha az imtiyazlı alternativdir.

### Hər açar üzrə HTTP əhatə dairəsinin bağlanması (#7895)

HTTP/SSE üzərindən `open-sse/mcp-server/httpTransport.ts` indi çağıranın həqiqi
`api_keys.scopes` dəyərini `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
vasitəsilə müəyyən edir və onu MCP SDK-sının `transport.handleRequest(req, { authInfo })` çağırışına ötürür; beləliklə,
hər bir alət çağırışına çatan `extra.authInfo.scopes` Bearer açarının öz əhatə dairələrini əks etdirir.
`scopeEnforcement.ts` daxilindəki `resolveCallerScopeContext()` artıq `authInfo`-nu
`_meta` və `OMNIROUTE_MCP_SCOPES` mühit dəyişəni üzrə ehtiyat variantdan üstün tuturdu — bu dəyişiklik yalnız əvvəllər HTTP üzərindən təmin edilməyən
ilk, ən yüksək prioritetli mənbəni doldurur. Heç bir API açarı müəyyən edilmədikdə
(başlıq yoxdur, açar etibarsızdır), `authInfo` `undefined` olaraq qalır və müəyyənləşdirmə dəyişdirilmədən mövcud
`meta`/mühit dəyişəni zəncirinə keçir. Bu, `OMNIROUTE_MCP_ENFORCE_SCOPES` üçün
standart davranışı DƏYİŞMİR — tətbiqetmə hələ də açıq şəkildə aktivləşdirilməlidir; bu dəyişiklik yalnız
aktivləşdirildikdən sonra hər açar üzrə yolun üstünlük qazanmasını təmin edir. stdio üçün çağıran tərəfə aid ayrıca identiklik yoxdur (bax:
`mcpCallerIdentity.ts`) və ona təsir edilmir — o, `_meta`/mühit dəyişəni üzrə ehtiyat zəncirində qalır.

---

## Mühit Dəyişənləri

| Dəyişən                                 | Standart                                | Təyinat                                                                                                                                                  |
| :-------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                | MCP serverinin OmniRoute daxili API-lərinə müraciət edərkən istifadə etdiyi əsas URL                                                                     |
| `OMNIROUTE_API_KEY`                     | (boş)                                   | Daxili API çağırışlarına `Authorization: Bearer` kimi ötürülən API açarı                                                                                 |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (yalnız `"true"` aktivləşdirir) | Aktiv olduqda çatışmayan əhatə dairələri alət çağırışlarını rədd edir və audit jurnalına `scope_denied:<reason>` qeydini yazır                           |
| `OMNIROUTE_MCP_SCOPES`                  | (boş)                                   | Standart olaraq «əlçatan» hesab edilən, vergüllə ayrılmış əhatə dairələri siyahısı (çağıran tərəf öz əhatə dairələrini təqdim etmədikdə istifadə olunur) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (təyin edilməyib = aktivdir)            | `0/false/off/no` olaraq təyin edildikdə qeydiyyat zamanı MCP təsvirlərinin sıxılmasını deaktiv edir                                                      |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (təyin edilməyib = aktivdir)            | Yuxarıdakı eyni keçid üçün alternativ alias                                                                                                              |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                 | Daxili idarəetmə oxumaları (sağlamlıq, dayanıqlılıq, kombinasiyalar, kvota, istifadə) üçün dayandırma müddəti                                            |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                 | Provayderi gözləyən keçidlər (`route_request`, `web_search`, `web_fetch`) üçün dayandırma müddəti                                                        |
| `MCP_TOOL_DENY`                         | (təyin edilməyib = filtr yoxdur)        | `tools/list` siyahısından çıxarılacaq, vergüllə ayrılmış alət adları (alət sayının azaldılması — aşağıya baxın)                                          |
| `MCP_TOOL_ALLOW`                        | (təyin edilməyib = filtr yoxdur)        | Yalnız saxlanılacaq, vergüllə ayrılmış alət adları (icazə siyahısı rejimi — aşağıya baxın)                                                               |
| `DATA_DIR`                              | `~/.omniroute`                          | Ürək döyüntüsü faylı `${DATA_DIR}/runtime/mcp-heartbeat.json` ünvanına yazılır                                                                           |

---

## Təsvirlərin Sıxılması

MCP alət, sorğu və resurs reyestrləri müştərilərə təqdim edilən metadata həcmini (və beləliklə, sorğu kontekstinin xərcini) azaltmaq üçün qeydiyyat/siyahılama zamanı təsvirləri sıxa bilər. Reallaşdırma `open-sse/mcp-server/descriptionCompressor.ts` faylında yerləşir və `createMcpServer()` daxilindəki `compressMcpRegistryMetadata` vasitəsilə MCP serverinə inteqrasiya edilib.

- Sıxılma struktur məzmununun dəyişdirilməməsi üçün qorunan blokların çıxarılması (kod fraqmentləri, hasarlanmış bloklar və s.) ilə Caveman qaydalar dəstindən (`getRulesForContext("all", "full")`) istifadə edərək təsvir mətni üzərində aparılır.
- Hər yerləşdirmə üçün `key_value` parametrlər cədvəlindəki `compression.mcpDescriptionCompressionEnabled` dəyəri vasitəsilə dəyişdirin (standart: aktivdir) — istifadəçi interfeysində **Analitika → MCP təsvirlərinin sıxılması** kimi təqdim olunur.
- Bütün proses üzrə `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` və ya `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` vasitəsilə dəyişdirin.
- Real vaxt statistikası `omniroute_compression_status` vasitəsilə `analytics.mcpDescriptionCompression` altında təqdim olunur və real provayder istifadə qəbzlərindən fərqləndirmək üçün `source: "mcp_metadata_estimate"` etiketi ilə işarələnir.

---

## Alət Sayının Azaldılması (F4.3)

Təsvirin sıxılması hər bir alətin metadatasını kiçildir; **alət sayının azaldılması** isə ümumiyyətlə elan edilən alətlərin _sayını_ azaltmaqla bir addım daha irəli gedir. `tools/list` manifestində daha az alətin təqdim edilməsi müştəri modelinin alət kataloqu üçün hər sorğu üzrə ödədiyi token xərcini azaldır ("layer 5" sıxılması). İcra `open-sse/mcp-server/toolCardinality.ts` faylında (`reduceToolManifest`) saf, vəziyyətsiz filtrdir və `createMcpServer()` daxilindəki qeydiyyat dövrünə (`open-sse/mcp-server/server.ts`) qoşulub.

**Könüllü aktivləşdirilir, standart olaraq deaktivdir.** Filtr yalnız iki mühit dəyişənindən ən azı biri təyin edildikdə işləyir; heç biri təyin edilmədikdə bütün 110 alət dəyişdirilmədən elan olunur.

| Dəyişən          | Rejim                                                                                         |
| :--------------- | :-------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Qara siyahı — `tools/list`-dən həmişə çıxarılan, vergüllə ayrılmış alət adları                |
| `MCP_TOOL_ALLOW` | İcazə siyahısı — vergüllə ayrılmış alət adları; yalnız bunlar saxlanılır, qalanları çıxarılır |

`deny`, `allow` üzərində üstünlüyə malikdir. Adlar vergüllə ayrılır, əvvəlindəki və sonundakı boşluqlar silinir, boş elementlər isə nəzərə alınmır. Nümunələr:

```bash
# Kataloqdan iki aləti çıxarın
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Yalnız marşrutlaşdırma + kvota alətlərini elan edin (icazə siyahısı rejimi)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Filtrlənmiş alətlər necə silinir:** qeydiyyat həmişə uğurla tamamlanır; profilin rədd etdiyi alət daha sonra MCP SDK deskriptorunda `.disable()` edilir, beləliklə, o, `tools/list` daxilində heç vaxt görünmür, lakin bağlantılar toxunulmaz qalır (səliqəli aktivləşdirmə/deaktivləşdirmə, təkrar qeydiyyat yoxdur). Profil analizatoru `readMcpToolProfileFromEnv(process.env)` funksiyasıdır və hər iki dəyişən boş olduqda `null` (filtrləmə yoxdur) qaytarır.

`reduceToolManifest` arxasındakı daha zəngin `ToolProfile` strukturu həmçinin əhatə dairələrinin kəsişməsinə əsaslanan filtrləməni (`allowScopes`, `read:*` üslublu şablon uyğunlaşdırması ilə) və deterministik `maxTools` limitini dəstəkləyir, lakin bu iki parametr qeydiyyat zamanı tam manifesti tələb edir və hazırda mühit dəyişənləri vasitəsilə **təqdim edilmir** (`tools/list` səviyyəli mexanizm izlənilən növbəti işdir). Manifestin azaldılmasından əvvəlki və sonrakı token xərclərini müqayisə etmək üçün `estimateManifestTokens()` mövcuddur.

---

## İcra Mühitinin Ürək Döyüntüsü

stdio nəqliyyatı hər 5 saniyədən bir işlək vəziyyət məlumatını `${DATA_DIR}/runtime/mcp-heartbeat.json` faylına yazır. İdarə paneli (`/api/mcp/status`) `online` vəziyyətini müəyyən etmək üçün bu faylı və PID-in aktivliyini yoxlayır. HTTP nəqliyyatları isə vəziyyəti prosesdaxili `getMcpHttpStatus()` funksiyasından bildirir (fayla yazılmır).

Ürək döyüntüsü anlıq görüntüsünün tərkibi:

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

## Audit Jurnalı

Hər bir alət çağırışı `open-sse/mcp-server/audit.ts` tərəfindən SQLite `mcp_tool_audit` cədvəlinə qeyd olunur:

- Alətin adı, arqumentlər (hər alət üzrə `auditLevel` parametrinə uyğun olaraq heşlənmiş/qısaldılmış), nəticə
- Müddət, ms ilə; uğur/uğursuzluq göstəricisi; xəta mesajı (tətbiq olunduqda)
- API açarının heşi, zaman damğası
- Əhatə dairəsi üzrə imtinalar çatışmayan əhatə dairələrinin siyahısı ilə birlikdə `scope_denied:<reason>` kimi qeydə alınır

Son çağırışları yoxlamaq üçün idarə panelindən və ya `/api/mcp/audit` və `/api/mcp/audit/stats` REST son nöqtələrindən istifadə edin.

---

## Fayllar

| Fayl                                                                     | Təyinat                                                                           |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP server fabriki, stdio giriş nöqtəsi, əhatə dairəsinə uyğun alət qeydiyyatları |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP nəqliyyatı (sessiyaların idarə edilməsi)                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Alətlərin əhatə dairəsinin qiymətləndirilməsi və çağıranın müəyyənləşdirilməsi    |
| `open-sse/mcp-server/audit.ts`                                           | Alət çağırışlarının audit jurnalına yazılması (`mcp_tool_audit`)                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio üçün dövri aktivlik siqnalının yazılması (`mcp-heartbeat.json`)             |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Alət / sorğu / resurs reyestrləri üçün təsvirlərin sıxılması                      |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod sxemləri + alət reyestri (`MCP_TOOLS`, 45 qeyd)                               |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Mərhələ 2 + keş + 1proxy alət emalçıları                                          |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Sıxılma alətlərinin emalçıları                                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Yaddaş alətlərinin tərifləri (3 alət)                                             |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Bacarıq alətlərinin tərifləri (4 alət)                                            |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion kontekst mənbəyi alətlərinin tərifləri (6 alət)                            |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Oyunlaşdırma alətlərinin tərifləri (8 alət)                                       |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Plaginlərin qeydiyyatı və idarə edilməsi alətləri (8 alət)                        |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` son nöqtəsi                                                     |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` son nöqtəsi                                                      |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE nəqliyyat marşrutu                                             |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP nəqliyyat marşrutu                              |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` audit jurnalının sorğulanması                                    |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` birləşdirilmiş audit metrikaları                           |
| `src/lib/notion/api.ts`                                                  | Notion REST API müştərisi (təkrar cəhd, vaxt aşımı, xətaların təsnifatı)          |
| `src/lib/db/notion.ts`                                                   | Notion tokeninin saxlanılması (`key_value` cədvəli)                               |
| `src/app/api/settings/notion/route.ts`                                   | Notion parametrləri API-si (GET/POST/DELETE)                                      |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion tokeninin idarə edilməsi üçün istifadəçi interfeysi                        |
| `tests/unit/notion-api.test.ts`                                          | Notion API müştərisi testləri (7)                                                 |
| `tests/unit/notion-tools.test.ts`                                        | Notion alətlərinin əhatə dairəsi məhdudiyyətlərinin testləri (10)                 |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB modulu testləri (3)                                                     |
