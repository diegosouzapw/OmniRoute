# OmniRoute MCP Server Documentation (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Yönlendirme, önbellek, sıkıştırma, bellek, beceriler, proxy, havuz, Radar ve bağlam kaynağı işlemlerini kapsayan 110 araca sahip Model Context Protocol sunucusu.
>
> Doğruluk kaynağı: `open-sse/mcp-server/server.ts`, `countUniqueMcpTools()` ile **110 benzersiz araç** hesaplar: 45 standart tanım (altı CCR yaşam döngüsü aracı, agent-skills üçlüsü, `omniroute_radar_catalog` ve `omniroute_x_search` dâhil); ayrıca bellek (3), beceriler (4), GitHub becerileri (3), havuz (6), oyunlaştırma (8), eklentiler (8), Notion (6), Obsidian (22), yerel derlem (3) ve yalnızca RTK'ye özgü iki sıkıştırma aracı.

## Kurulum

OmniRoute MCP yerleşik olarak gelir. Şu komutla başlatın:

```bash
omniroute --mcp
```

Ya da open-sse aktarımı üzerinden:

```bash
# HTTP üzerinden akışa uygun aktarım (port 20130)
omniroute --dev  # MCP, /mcp uç noktasında otomatik olarak başlar
```

HTTP aktarımları (`sse` / `streamable-http`, pano sunucusu tarafından aynı süreç içinde sunulur)
varsayılan olarak kapalıdır ve önceden yalnızca `/dashboard/mcp` sayfasından açılıp kapatılabiliyordu. v3.8.51
itibarıyla CLI da aynı özelliklere sahiptir:

```bash
omniroute mcp status                                  # etkin/çevrimiçi, aktarım, araç sayısı
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # etkin sse/streamable-http oturumlarını sıfırlar
```

`mcp enable`/`mcp disable`, panonun `/api/settings` üzerinden değiştirdiği aynı `mcpEnabled`
(ve isteğe bağlı olarak `mcpTransport`) ayarına PATCH isteği gönderir. `mcp restart`, `POST /api/mcp/restart`
çağrısı yapar: bir sonraki isteğin temiz şekilde yeniden başlatılabilmesi için etkin
`sse`/`streamable-http` oturumlarını sonlandırır; MCP devre dışıysa `409`, `stdio` aktarımı içinse `501`
döndürür (stdio istemcileri kendi alt süreçlerini yönetir — yeniden başlatılabilecek süreç içi bir tanıtıcı yoktur).

## Aktarımlar

MCP sunucusu, tümü aynı `createMcpServer()` fabrikasını kullanan üç aktarım sunar:

| Aktarım           | Konum                                             | Kullanım amacı                                           |
| :---------------- | :------------------------------------------------ | :------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                   | IDE entegrasyonları (Claude Desktop, Cursor vb.)         |
| `sse`             | `httpTransport` üzerinden `POST/GET /api/mcp/sse` | Olay akışına ihtiyaç duyan tarayıcı/ajan istemcileri     |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                 | Çok oturumlu HTTP istemcileri (`mcp-session-id` başlığı) |

Etkin HTTP aktarımı (`sse` veya `streamable-http`), `mcpTransport` ayarıyla seçilir. Aktarımlar arasında geçiş yapmak, diğer aktarımdaki mevcut oturumları kapatır.

### Uzaktan erişim (manage kapsamını kullanarak atlama)

`/api/mcp/*`, LOCAL_ONLY katmanındadır (`src/server/authz/routeGuard.ts`) — varsayılan olarak buraya yalnızca geri döngü ana makineleri (`localhost`, `127.0.0.1`, `::1`) erişebilir. v3.8.2 sürümünden itibaren, geri döngü dışındaki istemciler `manage` kapsamına sahip bir anahtarla `Authorization: Bearer <api-key>` sunmaları hâlinde bağlanabilir. Bir tünel, ters proxy veya genel ana makine adı üzerinden uzak MCP sunucusuna erişmenin tek yolu budur.

```bash
# manage kapsamı verin: panodaki API Keys sayfasını açıp anahtar için
# "Management Access" seçeneğini etkinleştirin veya oluştururken POST scopes:["manage"] gönderin.

# Ardından uzak bir MCP istemcisinden bağlanın:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` kapsamına sahip olmayan bir anahtar (veya Bearer bilgisinin bulunmaması) `403 LOCAL_ONLY` döndürür. Kardeş `/api/cli-tools/runtime/*` öneki kasıtlı olarak bu yöntemle ATLANAMAZ — bkz. [Route Guard Katmanları — Manage kapsamı istisnası](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE Yapılandırması

Claude Desktop, Cursor, Cline ve uyumlu MCP istemcilerinin kurulumu için [MCP İstemcisi Yapılandırması](../guides/SETUP_GUIDE.md#mcp-client-configuration) bölümüne bakın.

---

## Temel Araçlar (14) — Aşama 1

| Araç                            | Kapsamlar             | Açıklama                                                                                                                                       |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Çalışma süresi, bellek, devre kesiciler, hız sınırları, önbellek istatistikleri                                                                |
| `omniroute_list_combos`         | `read:combos`         | Stratejileriyle birlikte yapılandırılmış tüm kombinasyonlar (isteğe bağlı metrikler)                                                           |
| `omniroute_get_combo_metrics`   | `read:combos`         | Belirli bir kombinasyona ait performans metrikleri                                                                                             |
| `omniroute_switch_combo`        | `write:combos`        | Bir kombinasyonu etkinleştirme veya devre dışı bırakma                                                                                         |
| `omniroute_create_combo`        | `write:combos`        | Mevcut kombinasyon API'si üzerinden doğrulanmış bir kombinasyon oluşturma                                                                      |
| `omniroute_check_quota`         | `read:quota`          | Kullanılan/toplam kota, kalan yüzde, sıfırlanma zamanı, belirteç durumu                                                                        |
| `omniroute_route_request`       | `execute:completions` | OmniRoute yönlendirmesi üzerinden sohbet tamamlama isteği gönderme                                                                             |
| `omniroute_cost_report`         | `read:usage`          | Döneme göre maliyet raporu (oturum/gün/hafta/ay)                                                                                               |
| `omniroute_list_models_catalog` | `read:models`         | Yetenekler, durum ve fiyatlandırmayla birlikte eksiksiz model kataloğu                                                                         |
| `omniroute_radar_catalog`       | `read:radar`          | Yerel olarak imzalanmış Radar kataloğu; isteğe bağlı sağlayıcı/aile filtreleri                                                                 |
| `omniroute_tool_search`         | `read:tools`          | Kayıtlı MCP kataloğundaki araçları keşfetme                                                                                                    |
| `omniroute_web_search`          | `execute:search`      | Yapılandırılmış arama sağlayıcıları üzerinden web araması. X/Twitter değildir.                                                                 |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok üzerinden X'te arama yapma veya Xquik API sonuçları için `xquik-search` seçme. Seçilen arka uç için kimlik bilgileri gerektirir. |
| `omniroute_web_fetch`           | `execute:search`      | Yapılandırılmış getirme sağlayıcıları üzerinden web içeriğini alma                                                                             |

## Gelişmiş Araçlar (11) — Aşama 2

| Araç                               | Kapsamlar                            | Açıklama                                                                                                                          |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Yedek yönlendirme ağacıyla deneme amaçlı yönlendirme simülasyonu                                                                  |
| `omniroute_set_budget_guard`       | `write:budget`                       | Kalite düşürme/engelleme/uyarı eylemlerine sahip oturum bütçesi                                                                   |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Çalışma zamanında kombinasyon stratejisini güncelleme (öncelikli/ağırlıklı/otomatik/vb.)                                          |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` dayanıklılık ön ayarını uygulama                                                       |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Gerçek bir yukarı akış çağrısı kullanarak kombinasyondaki her sağlayıcıyı canlı olarak test etme                                  |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 gecikme süreleri ve devre kesici durumuyla sağlayıcı başına metrikler                                                 |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Bütçe/gecikme kısıtlarıyla görev türüne göre kombinasyon önerme                                                                   |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Bir isteğin neden belirli bir sağlayıcıya yönlendirildiğini açıklama (puanlama etkenleri + yedekler)                              |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Tam oturum anlık görüntüsü: maliyet, belirteçler, başlıca modeller/sağlayıcılar, hatalar, bütçe koruması                          |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Bozuk kombinasyon referansları/yetim satırlar gibi veritabanı tutarsızlıklarını tanılama (ve isteğe bağlı olarak otomatik onarma) |
| `omniroute_sync_pricing`           | `pricing:write`                      | Fiyatlandırma verilerini harici kaynaklardan (LiteLLM) eşitleme; `dryRun` destekler                                               |

## Önbellek Araçları (2)

| Araç                    | Kapsamlar     | Açıklama                                                        |
| :---------------------- | :------------ | :-------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Anlamsal önbellek, istem önbelleği ve eşgüçlülük istatistikleri |
| `omniroute_cache_flush` | `write:cache` | Önbelleği genel olarak veya imza/modele göre temizleme          |

## Sıkıştırma Araçları (13)

| Araç                                | Kapsamlar           | Açıklama                                                                                                                        |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Sıkıştırma ayarları, analiz özeti ve önbellek duyarlı istatistikler (`analytics.mcpDescriptionCompression` meta verileri dâhil) |
| `omniroute_compression_configure`   | `write:compression` | Sıkıştırma modunu, eşiğini, hedef oranını, sistem istemi korumasını ve MCP açıklama sıkıştırma seçeneğini yapılandırma          |
| `omniroute_set_compression_engine`  | `write:compression` | Etkin motoru (off/caveman/rtk/stacked) ve Caveman/RTK yoğunluğunu seçme                                                         |
| `omniroute_list_compression_combos` | `read:compression`  | Adlandırılmış sıkıştırma kombinasyonlarını ve motor işlem hatlarını listeleme                                                   |
| `omniroute_compression_combo_stats` | `read:compression`  | Sıkıştırma kombinasyonu ve motoruna göre gruplandırılmış analizler                                                              |
| `omniroute_ccr_store`               | `write:compression` | Çağıranı yalıtılmış içeriği sınırlı bellek içi CCR deposunda saklama ve bir işaretçiyle birlikte `ccr://` referansı döndürme    |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR içeriğini tam olarak veya baş, son, satırlar, grep ve istatistik modlarıyla alma                                            |
| `omniroute_ccr_inspect`             | `read:compression`  | İçeriği döndürmeden çağırana ait CCR meta verilerini inceleme                                                                   |
| `omniroute_ccr_list`                | `read:compression`  | Çağırana ait CCR bloklarının sayfalandırılmış meta verilerini listeleme                                                         |
| `omniroute_ccr_delete`              | `write:compression` | Çağırana ait bir CCR bloğunu silme                                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | Çağıran kapsamındaki bellek kullanımını, yaşam döngüsü sayaçlarını ve depo sınırlarını raporlama                                |
| `omniroute_rtk_discover`            | `read:compression`  | İsteğe bağlı RTK çıktı örneklerinde yinelenen gürültüyü keşfetme                                                                |
| `omniroute_rtk_learn`               | `read:compression`  | İsteğe bağlı örneklerden incelenebilir bir RTK filtresi taslağı oluşturma                                                       |

CCR girdileri yalnızca bellekte tutulur ve yeniden başlatma sırasında kaybolur. Her blok 2 MiB, her
asıl öğe 16 MiB ve genel depo 64 MiB ile sınırlıdır. Girdiler varsayılan olarak 24 saatlik bir TTL'ye
sahiptir (en fazla yedi gün). Tam MCP alımı 256 KiB ile sınırlıdır; daha büyük bloklara aralık ve grep
modları üzerinden erişilebilir. Depolama, alma, listeleme, inceleme, silme ve istatistikler, kimliği
doğrulanmış API anahtarı asıl öğesine göre yalıtılır. Denetim kayıtları hiçbir zaman içerik barındırmaz;
yalnızca karmaları ve boyut meta verilerini içerir.

`omniroute_compression_status`, MCP açıklama sıkıştırmasını
`analytics.mcpDescriptionCompression` altında ayrı olarak raporlar. Bu değerler, listelenebilir MCP
açıklamalarına (`tools`, `prompts`, `resources` ve `resourceTemplates`) yönelik meta veri boyutu
tahminleridir; sağlayıcı kullanım makbuzları değildir ve `source: "mcp_metadata_estimate"` ile
işaretlenir.

### MCP Erişilebilirlik Ağacı Filtresi (v3.8.0)

Yukarıdaki sıkıştırma araçlarından ayrı olarak OmniRoute, MCP tarayıcı/erişilebilirlik araçlarının
**araç sonuçlarını** ajana döndürülmeden önce sıkıştıran bir yürütme sonrası filtresi içerir. Bu filtre
kendi başına bir araç değildir — ayrıntılı erişilebilirlik ağacı veya tarayıcı anlık görüntüsü metni
(≥2000 karakter) içeren tüm araç sonuçlarında şeffaf biçimde çalışır.

Temel davranışlar:

- Ardışık ≥30 yinelenen eşdüzey satırı baş + son özetine daraltır
- Playwright/bilgisayar kullanımı için gerekli `[ref=eXX]` bağlantı noktalarını korur
- Aşırı büyük metni (>50.000 karakter) bir gezinme ipucuyla zorunlu olarak kırpar
- Beklenen tasarruf: Tarayıcı anlık görüntüsü yüklerinde **%60–80**

Yapılandırma: Genel ayarlarda `compression.mcpAccessibility` (056 numaralı geçiş).
Uygulama: `open-sse/services/compression/engines/mcpAccessibility/`.
Tüm belgeler: [Sıkıştırma Motorları — MCP Erişilebilirlik Ağacı Filtresi](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Bu araçların arkasındaki çalışma zamanı sıkıştırma modeli için [Sıkıştırma Motorları](../compression/COMPRESSION_ENGINES.md) ve [RTK Sıkıştırması](../compression/RTK_COMPRESSION.md) belgelerine bakın.

## 1Proxy Araçları (3)

| Araç                        | Kapsamlar      | Açıklama                                                                                    |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy pazarından ücretsiz proxy'leri getirir (protokol/ülke/kalite/limit filtreleri)       |
| `omniroute_oneproxy_rotate` | `read:proxies` | Stratejiye göre sıradaki kullanılabilir proxy'yi alır (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Havuz istatistikleri, senkronizasyon durumu ve protokol ile ülkeye göre dağılım             |

## Bellek Araçları (3)

`open-sse/mcp-server/tools/memoryTools.ts` içinde tanımlanmıştır. Kimlik doğrulama/kapsam, standart MCP kapsam işlem hattı üzerinden uygulanır.

| Araç                      | Kapsamlar      | Açıklama                                                                                                                         |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Token bütçesi uygulamasıyla sorguya / türe / API anahtarına göre bellek kayıtlarını arar                                         |
| `omniroute_memory_add`    | `write:memory` | Yeni bir bellek girdisi ekler (`factual` / `episodic` / `procedural` / `semantic`)                                               |
| `omniroute_memory_clear`  | `write:memory` | Bir API anahtarına ait bellek kayıtlarını, isteğe bağlı olarak türe veya `olderThan` zaman damgasına göre filtreleyerek temizler |

## Beceri Araçları (4)

`open-sse/mcp-server/tools/skillTools.ts` içinde tanımlanmıştır. `src/lib/skills/registry` + `src/lib/skills/executor` tarafından desteklenir.

| Araç                          | Kapsamlar        | Açıklama                                                                                            |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Kayıtlı becerileri API anahtarı, ad veya etkinlik durumuna göre isteğe bağlı filtrelemeyle listeler |
| `omniroute_skills_enable`     | `write:skills`   | Belirli bir beceriyi kimliğine göre etkinleştirir veya devre dışı bırakır                           |
| `omniroute_skills_execute`    | `execute:skills` | Sağlanan girdiyi kullanarak bir beceriyi yürütür ve yürütme kaydını döndürür                        |
| `omniroute_skills_executions` | `read:skills`    | Son beceri yürütmelerinin geçmişini listeler                                                        |

## Notion Bağlam Kaynağı (6)

`open-sse/mcp-server/tools/notionTools.ts` içinde tanımlanmıştır. Token, `src/lib/db/notion.ts` aracılığıyla `key_value` tablosunda saklanır. REST istemcisi `src/lib/notion/api.ts` içindedir. Ayarlar API'si `src/app/api/settings/notion/route.ts` içindedir. Pano kullanıcı arayüzü `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` içindedir.

Notion entegrasyon token'ınızı Uç Nokta panosundaki **Bağlam Kaynakları** sekmesinden veya REST API aracılığıyla yapılandırın:

```bash
# Token'ı ayarla
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Durumu kontrol et
curl http://localhost:20128/api/settings/notion

# Bağlantıyı kes
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Araç                         | Kapsamlar      | Açıklama                                                                     |
| :--------------------------- | :------------- | :--------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Tüm sayfalar ve veritabanlarında tam metin araması yapar                     |
| `notion_get_page`            | `read:notion`  | Bir sayfayı özellikleriyle birlikte kimliğine göre getirir                   |
| `notion_list_block_children` | `read:notion`  | Bir sayfanın veya bloğun alt bloklarını listeler                             |
| `notion_query_database`      | `read:notion`  | Bir veritabanını filtreler, sıralamalar ve sayfalandırma kullanarak sorgular |
| `notion_get_database`        | `read:notion`  | Veritabanı şemasını kimliğine göre getirir                                   |
| `notion_append_blocks`       | `write:notion` | Bir üst bloğa alt bloklar ekler (istek başına en fazla 100)                  |

## Agent Yeteneği Kataloğu Araçları (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` içinde tanımlanmıştır. `src/lib/agentSkills/catalog` tarafından desteklenir. Bu araçlar, 45 girdili Agent Skills dokümantasyon kataloğunu MCP istemcilerine ve harici agent'lara sunar. Kapsam: `read:catalog`.

| Araç                              | Kapsamlar      | Açıklama                                                                                                                                                       |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | İsteğe bağlı `category` (api\|cli) ve `area` filtreleriyle 45 agent yeteneğinin tümünü listeler; meta verileri + kapsamı döndürür                              |
| `omniroute_agent_skills_get`      | `read:catalog` | Kanonik `id` değerine göre tek bir yeteneğin tüm meta verilerini + SKILL.md içeriğini getirir                                                                  |
| `omniroute_agent_skills_coverage` | `read:catalog` | Kapsam istatistikleri: 23 API, 21 CLI ve 1 yapılandırma yeteneğinden kaçının dosya sisteminde SKILL.md dosyası bulunduğunu katalog toplamlarıyla karşılaştırır |

Kataloğun tamamı ve harici agent'ların bunu nasıl kullandığı için [AGENT-SKILLS.md](./AGENT-SKILLS.md) belgesine bakın.

## İlgili Framework'ler (v3.8.0)

Yukarıdaki MCP araç envanteri (`countUniqueMcpTools()` tarafından hesaplanan 110 benzersiz araç), çalışma zamanı yönlendirme/önbellek/sıkıştırma/bellek/yetenekler/proxy/bağlam kaynağı işlemleriyle bilinçli olarak sınırlandırılmıştır. v3.8.0 sürümünde MCP sunucusuyla birlikte iki ilişkili framework sunulur ve bunlar ayrı olarak belgelenmiştir:

### Cloud Agents

Cloud Agents, LLM sağlayıcıları için kullanılan aynı bağlantı modeli üzerinden OmniRoute'a bağlanan, işlem dışı AI kodlama agent'larıdır (codex-cloud, cursor-cloud, devin, jules). Kendi REST yüzeyleri (`/api/v1/agents/*`) üzerinden sunulurlar ve MCP araç kataloğunun parçası **değildirler** — bir Cloud Agent çağırmak herhangi bir MCP kapsamını tüketmez.

- Uygulama: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Yaşam döngüsü: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokümantasyon: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails, sohbet işlem hattı içinde uygulanan yürütme öncesi/sonrası filtrelerdir (vision-bridge, pii-masker, prompt-injection). MCP araç/yönlendirme katmanına ulaşılmadan önce çalışırlar ve denetim işlem hattına yapılandırılmış ihlaller gönderirler; MCP araçları olarak çağrılmazlar.

- Uygulama: `src/lib/guardrails/`.
- Dokümantasyon: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Engellenmiş görünen bir MCP çağrısında hata ayıklarken hem MCP denetim günlüğünü (`scope_denied:*` girdileri) hem de guardrails denetim izini kontrol edin — bir istek, MCP kapsamı uygulama katmanına ulaşmadan **önce** bir guardrail tarafından reddedilebilir.

---

## REST API Uç Noktaları

| Uç Nokta               | Yöntem                | Açıklama                                                                                                          | Kimlik Doğrulama          |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------- | :------------------------ |
| `/api/mcp/status`      | `GET`                 | Sunucu durumu: heartbeat, HTTP aktarım durumu, denetim etkinliği özeti                                            | Yönetim (oturum/yönetici) |
| `/api/mcp/tools`       | `GET`                 | Araç kataloğu (ad, açıklama, kapsamlar, aşama, kaynak uç noktaları)                                               | Yönetim                   |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE aktarım uç noktası (`mcpEnabled` + `mcpTransport === "sse"` ile denetlenir)                                   | API anahtarı + kapsamlar  |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Akış destekli HTTP aktarımı (`mcp-session-id` başlığını kullanır; `DELETE` oturumu sonlandırır)                   | API anahtarı + kapsamlar  |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` içindeki denetim günlüğü girdileri (filtreler: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Yönetim                   |
| `/api/mcp/audit/stats` | `GET`                 | Toplu denetim istatistikleri (`totalCalls`, `successRate`, `avgDurationMs`, en çok kullanılan araçlar)            | Yönetim                   |

Kaynak dosyalar: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Hem SSE hem de Akış Destekli HTTP aktarımları, MCP sunucusu Ayarlar'da etkinleştirilene (`mcpEnabled`) ve uygun `mcpTransport` seçilene kadar engellenir. Yanlış aktarım yapılandırılmışsa yönlendirme, ayarların değiştirilmesine yönelik bir ipucuyla birlikte HTTP 400 döndürür.

---

## Kimlik Doğrulama ve Kapsamlar

MCP araçlarının kimliği API anahtarı kapsamları aracılığıyla doğrulanır. Kapsam zorlaması
`open-sse/mcp-server/scopeEnforcement.ts` içinde merkezileştirilmiştir. Her araç belirli kapsamlar gerektirir:

| Kapsam                | Araçlar                                                                                                                                                                       |
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
| `read:obsidian`       | 13 okuma aracı — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 yazma aracı — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                             |

Joker kapsamlar desteklenir: `read:*` tüm okuma kapsamlarını, `*` ise tam erişimi verir.

### `mcp:connect` — dar rota yetkisi (#7895)

HTTP/SSE MCP aktarımına (`/api/mcp/*`) loopback dışından erişmek için
`/api/mcp/` LOCAL_ONLY istisnası gerekir (bkz. `docs/security/ROUTE_GUARD_TIERS.md`). Geçmişte
bu istisna yalnızca tam `manage`/`admin` kapsamına sahip bir API anahtarını kabul ediyordu; bu,
yalnızca MCP ile iletişim kurması gereken bir çağıran için gereğinden fazla genişti.
`src/shared/constants/managementScopes.ts` artık `MCP_CONNECT_SCOPE = "mcp:connect"` değerini
dışa aktarır: yalnızca `src/server/authz/policies/management.ts` içindeki `/api/mcp/`
atlamasına yetki veren, eklemeli ve dar bir kapsamdır (`SELF_USAGE_SCOPE` ile aynı emsali
izler); başka hiçbir yönetim rotasına erişim vermez ve bilinçli olarak
`MANAGEMENT_API_KEY_SCOPES` kapsamının DIŞINDA tutulur. `manage`/`admin` kapsamına sahip bir
anahtar istisnadan değişiklik olmadan geçmeye devam eder; `mcp:connect`, yalnızca uzaktan MCP
kullanan çağıranlar için `hasMcpConnectOrManageScope()` aracılığıyla denetlenen, daha düşük
ayrıcalıklı bir alternatiftir.

### Anahtar başına HTTP kapsamı bağlama (#7895)

HTTP/SSE üzerinden `open-sse/mcp-server/httpTransport.ts` artık çağıranın gerçek
`api_keys.scopes` değerini `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
aracılığıyla çözümler ve MCP SDK'sının `transport.handleRequest(req, { authInfo })` çağrısına
iletir; böylece her araç çağrısına ulaşan `extra.authInfo.scopes`, Bearer anahtarının kendi
kapsamlarını yansıtır. `scopeEnforcement.ts` içindeki `resolveCallerScopeContext()` zaten
`authInfo` değerine `_meta` ve `OMNIROUTE_MCP_SCOPES` ortam değişkeni geri dönüşünden daha
yüksek öncelik veriyordu; bu değişiklik yalnızca HTTP üzerinden daha önce beslenmeyen bu ilk
ve en yüksek öncelikli kaynağı doldurur. Hiçbir API anahtarı çözümlenemediğinde (başlık yoksa
veya anahtar geçersizse) `authInfo`, `undefined` olarak kalır ve çözümleme, mevcut `meta`/ortam
değişkeni zincirine değişiklik olmadan geri döner. Bu, `OMNIROUTE_MCP_ENFORCE_SCOPES`
değerinin varsayılanını DEĞİŞTİRMEZ; zorunlu kılmanın yine açıkça etkinleştirilmesi gerekir.
Bu değişiklik yalnızca etkinleştirildikten sonra anahtar başına yolun öncelik kazanmasını
sağlar. stdio'nun çağıran başına kimliği yoktur (bkz. `mcpCallerIdentity.ts`) ve bundan
etkilenmez; `_meta`/ortam değişkeni geri dönüş zincirini kullanmaya devam eder.

---

## Ortam Değişkenleri

| Değişken                                | Varsayılan                                | Amaç                                                                                                                                              |
| :-------------------------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                  | MCP sunucusunun OmniRoute dahili API'lerini çağırırken kullandığı temel URL                                                                       |
| `OMNIROUTE_API_KEY`                     | (boş)                                     | Dahili API çağrılarına `Authorization: Bearer` olarak iletilen API anahtarı                                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (yalnızca `"true"` etkinleştirir) | Etkinleştirildiğinde, eksik kapsamlar araç çağrılarını reddeder ve denetim günlüğüne `scope_denied:<reason>` kaydını ekler                        |
| `OMNIROUTE_MCP_SCOPES`                  | (boş)                                     | Varsayılan olarak "kullanılabilir" kabul edilen kapsamların virgülle ayrılmış izin listesi (çağıran kendi kapsamlarını sağlamadığında kullanılır) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ayarlanmamış = açık)                     | `0/false/off/no` olarak ayarlandığında, kayıt sırasında MCP açıklama sıkıştırmasını devre dışı bırakır                                            |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ayarlanmamış = açık)                     | Yukarıdaki ayarla aynı işlevi gören alternatif takma ad                                                                                           |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                   | Dahili yönetim okumaları (sağlık, dayanıklılık, kombinasyonlar, kota, kullanım) için iptal zaman sınırı                                           |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                   | Bir sağlayıcıyı bekleyen geçişler (`route_request`, `web_search`, `web_fetch`) için iptal zaman sınırı                                            |
| `MCP_TOOL_DENY`                         | (ayarlanmamış = filtre yok)               | `tools/list` listesinden çıkarılacak, virgülle ayrılmış araç adları (araç sayısını azaltma — aşağıya bakın)                                       |
| `MCP_TOOL_ALLOW`                        | (ayarlanmamış = filtre yok)               | Yalnızca tutulacak, virgülle ayrılmış araç adları (izin listesi modu — aşağıya bakın)                                                             |
| `DATA_DIR`                              | `~/.omniroute`                            | Sinyal dosyası `${DATA_DIR}/runtime/mcp-heartbeat.json` konumuna yazılır                                                                          |

---

## Açıklama Sıkıştırması

MCP araç, istem ve kaynak kayıtları, istemcilere sunulan meta veri miktarını (ve dolayısıyla istem bağlamı maliyetini) azaltmak amacıyla kayıt/listeleme sırasında açıklamaları sıkıştırabilir. Uygulama `open-sse/mcp-server/descriptionCompressor.ts` içinde yer alır ve `createMcpServer()` içindeki `compressMcpRegistryMetadata` aracılığıyla MCP sunucusuna bağlanır.

- Sıkıştırma, yapısal içeriğin değiştirilmemesi için korunan blok çıkarımıyla (kod parçaları, çitli bloklar vb.) birlikte Caveman kural kümesini (`getRulesForContext("all", "full")`) kullanarak açıklama metni üzerinde çalışır.
- Dağıtım başına, `key_value` ayarlar tablosundaki `compression.mcpDescriptionCompressionEnabled` değeri aracılığıyla açılıp kapatılabilir (varsayılan: etkin) — kullanıcı arayüzünde **Analiz → MCP açıklama sıkıştırması** olarak sunulur.
- İşlem genelinde `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` veya `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` aracılığıyla açılıp kapatılabilir.
- Gerçek zamanlı istatistikler, `analytics.mcpDescriptionCompression` altında `omniroute_compression_status` aracılığıyla sunulur ve gerçek sağlayıcı kullanım makbuzlarından ayırt edilmesi için `source: "mcp_metadata_estimate"` etiketiyle işaretlenir.

---

## Araç Sayısı Azaltma (F4.3)

Açıklama sıkıştırması her aracın meta verisini küçültür; **araç sayısı azaltma** ise hangi araçların duyurulacağını azaltarak bunu bir adım ileri taşır. `tools/list` bildiriminde daha az aracın tanıtılması, istemci modelinin araç kataloğu için ödediği istek başına token maliyetini ("katman 5" sıkıştırması) düşürür. Uygulama, `open-sse/mcp-server/toolCardinality.ts` içindeki (`reduceToolManifest`) saf ve durumsuz bir filtredir; `createMcpServer()` içindeki (`open-sse/mcp-server/server.ts`) kayıt döngüsüne bağlanmıştır.

**İsteğe bağlıdır ve varsayılan olarak kapalıdır.** Filtre yalnızca iki ortam değişkeninden en az biri ayarlandığında çalışır; ikisi de ayarlanmamışsa 110 aracın tamamı değiştirilmeden duyurulur.

| Değişken         | Mod                                                                                            |
| :--------------- | :--------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Kara liste — `tools/list` listesinden her zaman çıkarılacak, virgülle ayrılmış araç adları     |
| `MCP_TOOL_ALLOW` | İzin listesi — virgülle ayrılmış araç adları; yalnızca bunlar korunur, diğer her şey çıkarılır |

`deny`, `allow` üzerinde önceliklidir. Adlar virgülle ayrılır, baştaki ve sondaki boşluklar kaldırılır ve boş girdiler yok sayılır. Örnekler:

```bash
# Katalogdan iki aracı çıkar
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Yalnızca yönlendirme + kota araçlarını duyur (izin listesi modu)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Filtrelenen araçlar nasıl kaldırılır:** kayıt işlemi her zaman başarıyla tamamlanır; profilin reddettiği bir araç daha sonra MCP SDK tanıtıcısında `.disable()` ile devre dışı bırakılır. Böylece araç `tools/list` içinde hiçbir zaman görünmez, ancak bağlantılar sağlam kalır (temiz etkinleştirme/devre dışı bırakma, yeniden kayıt yoktur). Profil ayrıştırıcısı `readMcpToolProfileFromEnv(process.env)` şeklindedir ve her iki değişken de boş olduğunda `null` (filtreleme yok) döndürür.

`reduceToolManifest` arkasındaki daha kapsamlı `ToolProfile` yapısı ayrıca kapsam kesişimi filtrelemeyi (`allowScopes`, `read:*` tarzı joker karakter eşleştirmesiyle) ve deterministik bir `maxTools` sınırını destekler. Ancak bu iki ayar, kayıt sırasında tam bildirime ihtiyaç duyar ve günümüzde ortam değişkenleri üzerinden **sunulmaz** (`tools/list` düzeyinde bir kanca, takip edilen bir sonraki geliştirmedir). `estimateManifestTokens()`, azaltma öncesindeki ve sonrasındaki bildirim token maliyetini karşılaştırmak için kullanılabilir.

---

## Çalışma Zamanı Kalp Atışı

stdio aktarımı, canlılık durumunu her 5 saniyede bir `${DATA_DIR}/runtime/mcp-heartbeat.json` konumuna kaydeder. Pano (`/api/mcp/status`), `online` durumunu belirlemek için bu dosyayı PID canlılığıyla birlikte okur. HTTP aktarımları ise durumu süreç içi `getMcpHttpStatus()` üzerinden bildirir (dosyaya yazılmaz).

Kalp atışı anlık görüntüsü şunları içerir:

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

## Denetim Günlüğü

Her araç çağrısı, `open-sse/mcp-server/audit.ts` tarafından SQLite `mcp_tool_audit` tablosuna kaydedilir:

- Araç adı, bağımsız değişkenler (araca özgü `auditLevel` uyarınca hash'lenmiş/kısaltılmış), sonuç
- Milisaniye cinsinden süre, başarı/başarısızlık bayrağı, hata mesajı (geçerli olduğunda)
- API anahtarı hash'i, zaman damgası
- Kapsam reddetmeleri, eksik kapsam listesiyle birlikte `scope_denied:<reason>` olarak kaydedilir

Son çağrıları incelemek için panoyu veya `/api/mcp/audit` ve `/api/mcp/audit/stats` REST uç noktalarını kullanın.

---

## Dosyalar

| Dosya                                                                    | Amaç                                                                          |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP sunucu fabrikası, stdio giriş noktası, kapsamlı araç kayıtları            |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP aktarımı (oturum yönetimi)                              |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Araç kapsamı değerlendirmesi ve çağıran tarafın çözümlenmesi                  |
| `open-sse/mcp-server/audit.ts`                                           | Araç çağrısı denetim günlüğü (`mcp_tool_audit`)                               |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio sinyal yazıcısı (`mcp-heartbeat.json`)                                  |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Araç / istem / kaynak kayıtları için açıklama sıkıştırması                    |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod şemaları + araç kayıt defteri (`MCP_TOOLS`, 45 giriş)                     |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Faz 2 + önbellek + 1proxy araç işleyicileri                                   |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Sıkıştırma aracı işleyicileri                                                 |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Bellek aracı tanımları (3 araç)                                               |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Beceri aracı tanımları (4 araç)                                               |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion bağlam kaynağı aracı tanımları (6 araç)                                |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Oyunlaştırma aracı tanımları (8 araç)                                         |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Eklenti kaydı ve yönetim araçları (8 araç)                                    |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` uç noktası                                                  |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` uç noktası                                                   |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE aktarım rotası                                             |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP aktarım rotası                              |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` denetim günlüğü sorgusu                                      |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` toplu denetim metrikleri                               |
| `src/lib/notion/api.ts`                                                  | Notion REST API istemcisi (yeniden deneme, zaman aşımı, hata sınıflandırması) |
| `src/lib/db/notion.ts`                                                   | Notion belirteci kalıcılığı (`key_value` tablosu)                             |
| `src/app/api/settings/notion/route.ts`                                   | Notion ayarları API'si (GET/POST/DELETE)                                      |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion belirteci yönetimi kullanıcı arayüzü                                   |
| `tests/unit/notion-api.test.ts`                                          | Notion API istemcisi testleri (7)                                             |
| `tests/unit/notion-tools.test.ts`                                        | Notion araçları kapsam uygulama testleri (10)                                 |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB modülü testleri (3)                                                 |
