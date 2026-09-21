# Notion Context Source (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Doğruluk kaynağı:** `src/lib/notion/api.ts` (REST istemcisi), `src/lib/db/notion.ts`
> (token kalıcılığı), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP aracı),
> `src/app/api/settings/notion/route.ts` (ayarlar API'si). Araç kaydı ve kapsam
> bağlantıları `open-sse/mcp-server/server.ts` içinde yer alır.

## Nedir?

OmniRoute, yerleşik MCP sunucusu aracılığıyla ajanların erişebildiği bir okuma/yazma
bilgi tabanı olan **Notion** çalışma alanına **bağlam kaynağı** olarak bağlanabilir. Bir
Notion entegrasyon token'ı yapılandırıldıktan sonra MCP araçları, bir LLM'in sayfalarda
ve veritabanlarında arama yapmasına, sayfa içeriklerini ve blok ağaçlarını okumasına,
filtreler/sıralamalar ile veritabanlarını sorgulamasına ve yeni bloklar eklemesine olanak
tanır. Tüm bu işlemler OmniRoute üzerinden (yeniden deneme, zaman aşımı ve hata
sınıflandırmasıyla) gerçekleştirilir; böylece model hiçbir zaman Notion API'sine
doğrudan erişmez.

Entegrasyon, resmî Notion REST API'si
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`) üzerinde yer alan ince ve
sağlamlaştırılmış bir sarmalayıcıdır. İstemci (`src/lib/notion/api.ts`) şunları ekler:

- `429` ve `5xx` için **üstel geri çekilmeli yeniden deneme** (en fazla 3 deneme).
- `AbortController` aracılığıyla **55 saniyelik istek zaman aşımı**.
- **Türlendirilmiş hata sınıflandırması** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, `retry after`
  ipuçlarını dikkate alır), `NotionValidationError` (400/409), `NotionServerError`
  (5xx), `NotionTimeoutError`.
- Kullanıcıya gösterilmeden önce yığın izine benzeyen parçaları kaldıran **mesaj
  temizleme** işlemi.

## Kurulum

Notion token'ı için **ortam değişkeni yoktur** — token,
`src/lib/db/notion.ts` aracılığıyla SQLite `key_value` tablosunda (`notion` ad alanı,
`integration_token` anahtarı) saklanır. Endpoint panosunun **Context Sources**
sekmesinden (`ObsidianSourceCard` bileşeninin kardeşi `NotionSourceCard`) veya ayarlar
REST API'si üzerinden yapılandırın.

> [!NOTE]
> Token, bir **Notion dâhilî entegrasyon token'ıdır**. Şu adreste bir entegrasyon
> oluşturun: <https://www.notion.com/my-integrations>. Ardından OmniRoute'un erişmesini
> istediğiniz sayfaları/veritabanlarını bu entegrasyonla paylaşın (Notion'ın izin modeli
> çalışma alanı genelinde değil, paylaşım tabanlıdır).

### REST aracılığıyla yapılandırma

```bash
# Entegrasyon token'ını kaydet + doğrula (POST, bir test araması gerçekleştirerek doğrular)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Bağlantı durumunu kontrol et
curl http://localhost:20128/api/settings/notion

# Bağlantıyı kes (saklanan token'ı temizler)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Üç yöntemin tamamı pano kimlik doğrulaması (`isAuthenticated`) gerektirir. `POST`
isteğinde OmniRoute, token'ı kaydeder ve hemen 1 sonuçlu bir test araması çalıştırır;
Notion bir hata nesnesi döndürürse token temizlenir ve çağrı `400` ile başarısız olur.

## MCP araçları (6)

`open-sse/mcp-server/tools/notionTools.ts` içinde tanımlanmıştır. Token, çağrı
sırasında `getNotionToken()` aracılığıyla çözümlenir; yapılandırılmış bir token yoksa
araç şu hatayı fırlatır:
`"Notion entegrasyon token'ı yapılandırılmadı. Settings > Context Sources bölümünden ayarlayın."`

| Araç                         | Kapsam         | Açıklama                                                                                                               |
| ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Metin sorgusuyla sayfaları ve veritabanlarını arar (başlıkları, kimlikleri ve URL'leri döndürür). Sayfalandırılmıştır. |
| `notion_get_page`            | `read:notion`  | Kimliğine göre bir sayfanın içeriğini ve meta verilerini getirir.                                                      |
| `notion_list_block_children` | `read:notion`  | Bir blok veya sayfanın tüm alt bloklarını (blok ağacını) listeler. Sayfalandırılmıştır.                                |
| `notion_query_database`      | `read:notion`  | İsteğe bağlı `filter` + `sorts` (Notion API biçimi) ile bir veritabanını sorgular. Sayfalandırılmıştır.                |
| `notion_get_database`        | `read:notion`  | Kimliğine göre bir veritabanının şemasını/meta verilerini getirir.                                                     |
| `notion_append_blocks`       | `write:notion` | Mevcut bir bloğa veya sayfaya alt bloklar ekler (istek başına en fazla 100 blok).                                      |

### Girdi parametreleri

- `notion_search` — `query` (1–500 karakter), `pageSize` (1–100, varsayılan 20),
  `startCursor` (isteğe bağlı).
- `notion_get_page` — `pageId` (32 karakterlik hex veya UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, varsayılan 50),
  `startCursor` (isteğe bağlı).
- `notion_query_database` — `databaseId`, `filter` (isteğe bağlı, Notion filtre
  biçimi), `sorts` (isteğe bağlı dizi), `pageSize` (1–100, varsayılan 50),
  `startCursor` (isteğe bağlı).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (blok nesneleri dizisi),
  `after` (isteğe bağlı konum).

### Kapsamlar

Okuma araçları `read:notion`, yazma aracı ise `write:notion` kapsamını gerektirir.
Kapsamlar, yalnızca `OMNIROUTE_MCP_ENFORCE_SCOPES=true` olduğunda
`open-sse/mcp-server/server.ts` içindeki `withScopeEnforcement()` tarafından
uygulanır; çağıranın izin verilen kapsamları `OMNIROUTE_MCP_SCOPES` (virgülle
ayrılmış) değerinden veya kimliği doğrulanmış API anahtarının kapsam bağlamından
alınır. Kapsam modelinin tamamı için [MCP-SERVER.md](./MCP-SERVER.md) belgesine
bakın.

## Uç Noktalar

| Yöntem   | Yol                    | Amaç                                            |
| -------- | ---------------------- | ----------------------------------------------- |
| `GET`    | `/api/settings/notion` | `{ connected, hasToken }` döndürür.             |
| `POST`   | `/api/settings/notion` | Entegrasyon belirtecini kaydeder ve doğrular.   |
| `DELETE` | `/api/settings/notion` | Bağlantıyı keser (saklanan belirteci temizler). |

> Bunlar, kontrol paneli ayar rotalarıdır. Herkese açık bir `/v1` Notion proxy
> uç noktası **yoktur** — Notion'a yalnızca yukarıdaki MCP araçları üzerinden erişilir.

## Kullanım senaryoları

- **Bilgiye dayalı yanıtlar** — yanıt vermeden önce bir aracının çalışma alanında `notion_search`
  yapmasını ve en iyi eşleşmeyi `notion_get_page` ile almasını sağlayarak yanıtların gerçek dahili belgelere atıfta bulunmasını sağlayın.
- **Veritabanı destekli iş akışları** — filtreler ve sıralamalarla bir görev/CRM veritabanını
  `notion_query_database` ile sorgulayın, ardından satırları özetleyin veya önceliklendirin.
- **Geri yazma / günlük kaydı** — toplantı notlarını, çalıştırma özetlerini veya aracı çıktılarını
  mevcut bir sayfaya eklemek için `notion_append_blocks` kullanın (yalnızca ekleme; yıkıcı düzenleme yoktur).
- **Yapı keşfi** — bir sayfanın blok ağacında gezinmek için `notion_list_block_children`
  veya sorgulamadan önce bir veritabanının özellik şemasını keşfetmek için `notion_get_database` kullanın.

## İlgili

- [MCP Sunucusu](./MCP-SERVER.md) — taşıma yöntemleri, kapsam uygulaması ve eksiksiz araç envanteri.
- [Obsidian Bağlam Kaynağı](./OBSIDIAN_CONTEXT.md) — diğer yerleşik bağlam kaynağı.
- [Bellek Sistemi](./MEMORY.md) — kalıcı konuşma belleği (tamamlayıcı
  bağlam katmanı; araçla alınmak yerine otomatik olarak eklenir).
