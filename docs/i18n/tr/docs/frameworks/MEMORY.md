# Memory System (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Doğruluk kaynağı:** `src/lib/memory/` ve `src/app/api/memory/`
> **Son güncelleme:** 2026-06-28 — v3.8.40 (varsayılan olarak kapalı + int8 niceleme telafisi)

OmniRoute, API anahtarına (ve isteğe bağlı olarak oturum kimliğine) göre belirlenen kalıcı konuşma belleği sağlar. Anılar, hafif regex kalıp eşleştirmesi aracılığıyla LLM yanıtlarından otomatik olarak çıkarılır ve sonraki isteklere başta yer alan bir sistem mesajı olarak (veya sistem rolünü reddeden sağlayıcılarda ilk kullanıcı mesajı olarak) yeniden eklenir.

> **Bellek varsayılan olarak KAPALIDIR (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> artık `false` değerindedir (`src/lib/memory/settings.ts`). Belleğin etkinleştirilmesi,
> alınan bağlamın `maxTokens` değerine kadar olan kısmını (~2k) **her** sohbet
> isteğine ekler ve bunun için ücret alınır — bu, yeni kurulumlar ve kendi
> bağlamlarını yöneten istemciler açısından beklenmedik bir maliyettir. **Ayarlar → Bellek**
> altında açıkça etkinleştirin (`MemorySkillsTab`, bellek etkinleştirildiğinde
> belirgin bir token maliyeti uyarısı gösterir). İstemci, `x-omniroute-no-memory`
> istek üstbilgisini (`true`/`1`/`yes`) kullanarak tek bir isteği kapsam dışında
> bırakabilir — [API_REFERENCE.md](../reference/API_REFERENCE.md) içindeki istek üstbilgisi
> tablosuna bakın. Belleksiz bir istek `memoryOwnerId = null` olarak ayarlanır;
> bu da söz konusu istek için **hem** bellek hem de beceri eklemeyi devre dışı
> bırakır (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Bellek kullanıcı başına değil, **API anahtarı başına kapsamlandırılır** — aynı API anahtarıyla kimliği doğrulanan her istek aynı bellek havuzunu paylaşır ve isteğe bağlı olarak `sessionId` ile kapsam daha da daraltılabilir.

## Mimari

```
İstemci → /v1/chat/completions (apiKeyInfo üst akışta çözümlenir)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # kimliği çıkarır
    → getMemorySettings()                     # önbelleğe alınmış ayarlar
    → shouldInjectMemory(body, {enabled})     # geçit
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + isteğe bağlı vektör
    → injectMemory(body, memories, provider)  # sistem veya kullanıcı mesajı
  → üst akış sağlayıcı çağrısı
  → yanıtta: extractFacts(text, apiKeyId, sessionId)  # engellemesiz
    → setImmediate → eşleşme başına createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

Ekleme ve çıkarma çağrı noktaları `open-sse/handlers/chatCore.ts` içinde bağlanmıştır (`retrieveMemories`, `injectMemory` ve `extractFacts` ifadelerini arayın).

## Motor mimarisi (3 katmanlı çözümleme)

Bellek Motoru, çalışma zamanında kullanılabilir altyapı ve ayarlara göre getirme yolunu çözümler. Öncelik sırasına göre uygulanan üç katman vardır:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  KATMAN 0 — Anahtar Sözcük (FTS5)                            │
  │  Yoklama tabanlı kullanılabilirlik: SQLite derlemesi         │
  │  desteklediğinde FTS5 (better-sqlite3 / node:sqlite /        │
  │  bun:sqlite); FTS5 içermeyen derlemelerde kullanılamaz       │
  │  (ör. sql.js/WASM — "no such module: fts5").                 │
  │  strategy = "exact" olduğunda veya geri dönüş seçeneği       │
  │  olarak kullanılır; engine-status içindeki keyword değeri    │
  │  yoklama sonucunu yansıtır.                                  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  KATMAN 1 — Gömülü Vektör (sqlite-vec)                       │
  │  sqlite-vec v0.1.9, db.loadExtension() ile yüklenir.         │
  │  Float32 vektörleri üzerinde kaba kuvvet KNN. Şu durumlarda  │
  │  etkindir:                                                   │
  │   • sqlite-vec loadExtension başarılı olur                   │
  │   • Float32Array üretebilen bir gömme kaynağı                │
  │     (remote | static | transformers) kullanılabilir          │
  │   • vec_memories tablosu mevcuttur (ilk ready() çağrısında   │
  │     oluşturulur)                                             │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  KATMAN 2 — Qdrant (isteğe bağlı harici vektör veritabanı)   │
  │  Etkinleştirildiğinde semantic/hybrid için sqlite-vec'in     │
  │  yerini alır. Çalışan bir Qdrant örneği ile yapılandırılmış  │
  │  host/port gerektirir.                                       │
  └─────────────────────────────────────────────────────────────┘
```

Düşürme işlemi otomatik ve şeffaftır:

- sqlite-vec yüklenemezse katman 1 kullanılamaz → katman 0'a geri dönülür.
- Gömme kaynağı hata döndürürse katman 1, katman 0'a geri döner.
- Qdrant sağlıklı değilse katman 2, katman 1'e (veya katman 1 de kullanılamıyorsa katman 0'a) geri döner.

## Gömme kaynakları

Gömme katmanı (`src/lib/memory/embedding/`), kullanılacak kaynağı
`MemorySettingsExtended.embeddingSource` değerine göre belirler:

| Kaynak         | Açıklama                                                                                     | Anahtar gerekli | Soğuk başlatma   |
| -------------- | -------------------------------------------------------------------------------------------- | --------------- | ---------------- |
| `remote`       | Yapılandırılmış bir sağlayıcının gömme API'sini kullanır (OpenAI, Cohere vb.)                | Evet            | Yok              |
| `static`       | `potion-base-8M` üzerinden yerel arama tablosu gömme işlemi (WordPiece + ortalama havuzlama) | Hayır           | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` üzerinden yerel ONNX çıkarımı             | Hayır           | ~3s + ~400MB RAM |
| `auto`         | Çalışma zamanında belirleme: remote (anahtar varsa) → static → transformers → null           | Duruma bağlı    | Duruma bağlı     |

**`auto` için belirleme sırası:**

1. `listEmbeddingProviders()` içinde `hasKey === true` olan ilk sağlayıcıyı bul → `remote`.
2. `settings.staticEnabled === true` ise → `static`.
3. `settings.transformersEnabled === true` ise → `transformers`.
4. Aksi takdirde → `null` (FTS5 anahtar kelime aramasına indirgenir).

Gömme önbelleği (`src/lib/memory/embedding/cache.ts`), `${source}:${model}:${dim}:${sha256(text)}`
ile anahtarlanan bir bellek içi LRU eşlemesi kullanır; bu eşleme
`MEMORY_EMBEDDING_CACHE_MAX` girdisiyle (varsayılan 1000) sınırlandırılmıştır ve
`MEMORY_EMBEDDING_CACHE_TTL_MS` (varsayılan 5 dk.) TTL değerine sahiptir. İşlem
yaşam döngüsü boyunca tüm çağıranlar arasında paylaşılır.

## Hibrit RRF (k=60)

`strategy = "hybrid"` olduğunda ve vektör deposu kullanılabilir durumdayken getirme işlemi,
FTS5 ile vektör sonuçlarını birleştirmek için Karşılıklı Sıra Birleştirme yöntemini kullanır:

```
RRF(d) = Σ  1 / (k + rank_i(d))      burada k = 60'tır (MEMORY_RRF_K ile yapılandırılabilir)
          i
```

Somut olarak:

1. FTS5 aramasını çalıştır → sıralı liste `R_fts` (konum 1..N).
2. KNN vektör aramasını çalıştır → sıralı liste `R_vec` (konum 1..M).
3. Her benzersiz `memoryId` için:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (listede yoksa 0).
4. `rrf_score` değerine göre DESC sıralayın, belirteç bütçesi taramasını uygulayın.

RRF'nin, heterojen getirme sistemleri arasında puan normalizasyonu gerektirmeden
etkili olduğu iyi bilinmektedir. Varsayılan `k=60` değeri, Cormack ve diğerlerinin
orijinal makalesinden alınmıştır ve küçük derlemler (<10k bellek) için iyi çalışır.

## Geçmiş verileri doldurma (tembel + yeniden indeksleme)

Gömme modeli değiştiğinde (`embedding_signature` aracılığıyla algılanır),
vektör deposu yeniden oluşturulur ve mevcut tüm bellekler `memories`
tablosunda `needs_reindex = 1` olarak işaretlenir.

**Tembel geçmiş veri doldurma**: Bir sonraki getirme işleminde, vektör girdisi
bulunmayan tüm bellekler, arama çalıştırılmadan önce gömülür ve `vec_memories`
içine eklenir. Bu, geçmiş verileri doldurma maliyetini başlangıcı engellemeden
gerçek istekler arasında paylaştırır.

**Açık yeniden indeksleme**: `/dashboard/memory` içindeki Engine sekmesi,
`POST /api/memory/reindex` çağrısı yapan bir "Şimdi Yeniden İndeksle" düğmesi
sunar. İşleyici, `src/lib/memory/reindex.ts` içindeki `runReindexBatch()`
fonksiyonunu çağırır; bu fonksiyon her istek için bekleyen en fazla `limit`
girdiyi işler. İlerleme, `GET /api/memory/engine-status`
(`vectorStore.needsReindex`) aracılığıyla yoklanabilir.

`memory_vec_meta` tablosu (`083_memory_vec.sql` geçişi) şunları depolar:

- `active_dim` — geçerli vektör boyutu (null = henüz kalibre edilmedi).
- `embedding_signature` — değişiklikleri algılamak için kullanılan `${source}:${model}:${dim}`.
- `last_reset_at` — son tam sıfırlamanın zaman damgası.
- `vec_loaded` — sqlite-vec'in başarıyla yüklenip yüklenmediğini belirten 0/1 bayrağı.

## Ayarlar uzantısı

Dokuz gömme ve vektör alanı, `src/shared/schemas/memory.ts` içindeki
`MemorySettingsExtended` kapsamında kullanılabilir ve `src/lib/db/settings.ts` aracılığıyla kalıcı olarak saklanır:

| Alan                     | Tür                                                | Varsayılan | Açıklama                                                               |
| ------------------------ | -------------------------------------------------- | ---------- | ---------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`   | Kullanılacak gömme kaynağı                                             |
| `embeddingProviderModel` | `string \| null`                                   | `null`     | `provider/model` biçimindeki sağlayıcı/model                           |
| `customBaseUrl`          | `string \| null`                                   | `null`     | Yalnızca Memory için OpenAI uyumlu uç nokta temel URL'si               |
| `customModelId`          | `string \| null`                                   | `null`     | Özel uç noktaya gönderilen model kimliği                               |
| `transformersEnabled`    | `boolean`                                          | `false`    | Transformers.js için isteğe bağlı etkinleştirme (MiniLM, ~400MB)       |
| `staticEnabled`          | `boolean`                                          | `false`    | Yerel statik potion-base-8M modeli için isteğe bağlı etkinleştirme     |
| `rerankEnabled`          | `boolean`                                          | `false`    | Yeniden sıralama adımını etkinleştirir (istek başına +200-500ms ekler) |
| `rerankProviderModel`    | `string \| null`                                   | `null`     | `provider/model` biçimindeki yeniden sıralama sağlayıcısı/modeli       |

`rerankProviderModel`, `POST /v1/rerank` tarafından çözümlenir (geri döngü üzerinden çağrılır); bu nedenle söz konusu rotanın kabul ettiği her şeyi kabul eder: seçilmiş bir bulut yeniden sıralama modeli (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) veya `<node-prefix>/<model>` biçiminde OpenAI uyumlu bir sağlayıcı düğümü (ör. bir TEI/Infinity kutusu için `skilled-mini/bge-reranker-v2-m3`). Geri döngü düğümleri her zaman uygundur; başka bir ana makinedeki (LAN, Tailscale) bir düğüm ayrıca `RERANK_REMOTE_PROVIDER_NODES` özellik bayrağını gerektirir ve sağlayıcı giden URL politikasını geçmelidir — bkz. [Özellik Bayrakları](../reference/FEATURE_FLAGS.md). Pano seçicisi, seçilmiş sağlayıcıların yanı sıra yerel düğümleri de listeler; geçerli herhangi bir `provider/model` dizesi, `PUT /api/settings/memory` aracılığıyla doğrudan ayarlanabilir.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Kullanılacak vektör arka ucu |

Bunlar, `GET /PUT /api/settings/memory` aracılığıyla kullanıma sunulur (`MemorySettingsExtendedSchema` şeması).

`remote` kaynağı için Memory, isteğe bağlı `customBaseUrl` ve
`customModelId` ayarlarını da kabul eder. Bu ayarlar birlikte, genel gömme kayıt defterini değiştirmeden OpenAI uyumlu bir `/embeddings`
uç noktası ve modeli seçer. Uç nokta kullanılmadan önce
normalleştirilir ve sağlayıcı giden URL politikası tarafından denetlenir: HTTP(S)
gereklidir; gömülü kimlik bilgileri ve sorgu dizeleri reddedilir, bulut meta veri
adresleri ise engellenmeye devam eder. Boş değerler, seçili kayıt defteri sağlayıcısını korur. Panoya
döndürülen hatalar hassas bilgilerden arındırılır ve uç nokta kimlik bilgileri hiçbir zaman günlüğe kaydedilmez.

> **YAPILACAK (D20):** `global` kapsamı (belleklerin tüm API anahtarları arasında paylaşılması) bu
> sürümde uygulanmamıştır. Şema değişiklikleri ve genel bir getirme
> yolu gerektirir. Ayrı olarak takip edin.

## Depolama Katmanları

### Birincil: SQLite (`memories` tablosu)

`015_create_memories.sql` geçişi tarafından oluşturulur:

| Sütun                       | Tür                | Notlar                                                                                                 |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` aracılığıyla oluşturulan UUID                                                    |
| `api_key_id`                | `TEXT NOT NULL`    | Sahip olan API anahtarı                                                                                |
| `session_id`                | `TEXT`             | İsteğe bağlı konuşma başına kapsam                                                                     |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` değerlerinden biri                                     |
| `key`                       | `TEXT`             | Kararlı upsert anahtarı, ör. `preference:i_prefer_python`                                              |
| `content`                   | `TEXT NOT NULL`    | Gerçek olgu metni                                                                                      |
| `metadata`                  | `TEXT`             | JSON bloku (category, extractedAt, source, ...)                                                        |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 dizeleri                                                                                      |
| `expires_at`                | `TEXT`             | İsteğe bağlı sona erme zamanı; `NULL` kalıcı olduğu anlamına gelir                                     |
| `memory_id`                 | `INTEGER UNIQUE`   | UUID'ler ↔ FTS5 rowid'leri arasında köprü kurmak için `023_fix_memory_fts_uuid.sql` tarafından eklendi |

İndeksler: `api_key_id`, `session_id`, `type`, `expires_at` ve benzersiz
`memory_id` indeksi.

**Upsert semantiği**: `createMemory()`, aynı
`(api_key_id, key)` değerlerine sahip mevcut bir satır arar ve bulunduğunda yerinde günceller (`metadata` alanını
sığ yayma yoluyla birleştirir). Bu, yinelenen
tercih ifadeleri nedeniyle tablonun sınırsız büyümesini önler.

### Tam Metin Araması (`memory_fts` sanal tablosu)

`022_add_memory_fts5.sql`, `content` ve
`key` üzerinde bir FTS5 sanal tablosu oluşturur. `023_fix_memory_fts_uuid.sql`, UUID
birincil anahtarının FTS5'in tamsayı rowid'iyle birleştirilemediği gerçek dünyadaki bir hatayı düzeltir — geçiş,
`memory_id` sütununu ekler, FTS tablosunu yeniden oluşturur ve INSERT, DELETE ve UPDATE
işlemlerinde FTS'yi eşitlenmiş tutan tetikleyicileri
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) bağlar.

`retrieval.ts` tarafından `semantic` ve `hybrid` stratejileri için kullanılır (aşağıya bakın).
Getirme kodu `hasTable("memory_fts")` ile koruma sağlar ve FTS tablosu eksikse veya FTS sorgusu hata verirse
kronolojik sıralamaya geri döner.

### İsteğe bağlı: Qdrant (vektör deposu katman 2)

`src/lib/memory/qdrant.ts`, katman 2
vektör deposu olarak isteğe bağlı bir Qdrant entegrasyonu uygular. Getirme yalnızca motor seçici
`memoryVectorStore === "qdrant"` olduğunda Qdrant'a yönlendirilir — varsayılan `"auto"` (ve `"sqlite-vec"`)
Qdrant'ı **asla** seçmez. Engine sekmesindeki geçiş düğmesi `qdrantEnabled` ve
`memoryVectorStore` değerlerinin **ikisini de** birlikte ayarlar: etkinleştirme Qdrant'ı birincil depo yapar, devre dışı bırakma
ise `"auto"` değerine sıfırlar (#5597 — bu düzeltmeden önce etkinleştirme etkisizdi, çünkü hiçbir şey
motor seçicisine yazmıyordu). Qdrant'a ulaşılamazsa veya hiçbir şey döndürmezse getirme,
sqlite-vec → FTS5 sırasıyla geri dönüş yapar.

- `upsertSemanticMemoryPoint()` — `key + content` değerini yapılandırılmış
  embedding modeliyle gömer, koleksiyonun mevcut olduğundan emin olur (ilk kullanımda
  kosinüs mesafeli vektörler oluşturur) ve `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` yükünü içeren bir noktayı ekler veya günceller.
- `searchSemanticMemory(query, topK, scope)` — sorguyu gömer, koleksiyonda
  `kind = "omniroute_memory"` filtresiyle ve isteğe bağlı olarak
  `apiKeyId` / `sessionId` ile arama yapar. `topK` değerini `[1, 20]` aralığıyla sınırlar.
- `deleteSemanticMemoryPoint(id)` — tek bir noktayı siler. SQLite satırı
  kaldırıldıktan sonra `deleteMemory()` tarafından çağrılır (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` değeri geçmişte
  olan veya `createdAtUnix` değeri saklama eşiğinden daha eski olan noktaları toplu olarak
  siler. Kontrol panelinin gerçek sayıları gösterebilmesi için önce sayım yapar.
- `checkQdrantHealth()` — gecikme süresini de ölçen `GET /readyz` sağlık denetimi.

Ayarlar kullanıcı arayüzü; Qdrant yapılandırmasını, sağlık denetimini, semantik arama testini
ve temizleme işlevini `/dashboard/memory` sayfasının **Motor sekmesinde** sunar. `src/app/api/settings/qdrant/`
altındaki ilgili rotaların tümü v3.8.6 itibarıyla bağlanmıştır:

| Rota                                    | Yöntem        | Açıklama                                       |
| --------------------------------------- | ------------- | ---------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant ayarlarını okuma / güncelleme           |
| `/api/settings/qdrant/health`           | `GET`         | Canlılık denetimi + gecikme                    |
| `/api/settings/qdrant/search`           | `POST`        | Semantik arama testi                           |
| `/api/settings/qdrant/cleanup`          | `POST`        | Süresi dolmuş / eski noktaları kaldırma        |
| `/api/settings/qdrant/embedding-models` | `GET`         | Kullanılabilir embedding modellerini listeleme |

**Davranış notları (beklentiler):**

- **Motor seçimi** — Motor sekmesinde Qdrant'ı etkinleştirmek, onu birincil
  depo yapar (`memoryVectorStore="qdrant"` olarak ayarlar); devre dışı bırakmak ayarı `"auto"` değerine sıfırlar (#5597).
- **Geriye dönük doldurma yoktur** — yalnızca Qdrant etkinleştirildikten **sonra** oluşturulan/güncellenen
  bellekler ona yazılır (sonucu beklenmeyen çift yazma). Önceden var olan SQLite bellekleri
  taşınmaz; "Şimdi Yeniden İndeksle" yalnızca sqlite-vec indeksini yeniden oluşturur, Qdrant'ı değil.
- **Vektör boyutu otomatik algılanır** — ilk kullanımda gerçek embedding üzerinden belirlenir;
  doldurulması gereken bir boyut alanı yoktur. Bir koleksiyon oluşturulduktan sonra embedding modelinin
  değiştirilmesi **otomatik olarak işlenmez**: mevcut koleksiyona dokunulmaz, boyutları
  uyuşmayan yazma/arama işlemleri başarısız olur ve sqlite-vec'e geri dönülür. Embedder'ı değiştirmek için
  koleksiyonu yeniden oluşturun (yeni bir ad kullanın veya Qdrant'ta silin).
- **Mesafe metriği** — her zaman **Kosinüs** değeridir (koleksiyon oluşturulurken sabit kodlanmıştır;
  yapılandırılamaz).
- **Kimlik doğrulama** — yalnızca API anahtarı kullanılır (`api-key` üstbilgisi olarak gönderilir;
  kimlik doğrulamasız yerel Docker için isteğe bağlıdır). JWT/RBAC kullanılmaz.
- **Yapılandırma alanları** — kullanıcı arayüzü `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` alanlarını sunar. `vectorSize` / `hnswEfConstruct` yalnızca env/DB üzerinden kullanılabilir ve
  `vectorSize` koleksiyon oluşturmak için kullanılmaz (boyut embedding'den alınır).

### Vektör nicemleme (int8 — isteğe bağlı, her iki arka uçta)

Her iki vektör arka ucu da depolanan vektörlerin bellek
ayak izini küçük bir geri çağırma maliyeti karşılığında azaltmak için **isteğe bağlı int8 nicemlemeyi**
destekler (Float32'den yaklaşık 4 kat daha küçük). Her ikisinde de varsayılan olarak **kapalıdır**;
açıkça etkinleştirilmediği sürece vektörler tam hassasiyette kalır.

| Arka uç    | Ayar                               | Tür                            | Varsayılan | Okunduğu yer                                                |
| ---------- | ---------------------------------- | ------------------------------ | ---------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB anahtarı) | `"none" \| "int8" \| "binary"` | `"none"`   | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env)    | `"none" \| "int8"`             | `"none"`   | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant**, `qdrantQuantization` ayar anahtarı aracılığıyla örnek bazında
  yapılandırılır (`PUT /api/settings/qdrant` üzerinde `quantization` alanı olarak sunulur).
  Değer `"int8"` olduğunda `buildQuantizationConfig()`, skaler nicemleme
  (`always_ram`, nicelik dilimi `0.99`) ister ve aramalar `rescore: true` seçeneğini etkinleştirir;
  böylece tam hassasiyetli vektörler int8 aday kümesini iyileştirir.
- **sqlite-vec** nicemlemesi **yalnızca ortam üzerinden** yapılandırılır (DB ayarı değildir):
  yerel vektörleri `vec_quantize_int8(?, 'unit')` aracılığıyla bir `int8[dim]`
  sütunu olarak depolamak için `MEMORY_VEC_QUANTIZATION=int8` ayarını kullanın. Seçilen mod,
  `embedding_signature` içine (bir `:int8` son ekiyle) dahil edilir; dolayısıyla modlar arasında
  geçiş yapmak `vec_memories` tablosunun tamamen yeniden indekslenmesini tetikler — bu,
  embedding modeli değiştiğinde kullanılan gecikmeli geriye dönük doldurma yoluyla aynıdır.

## Bellek Türleri

`MemoryType` (`src/lib/memory/types.ts`):

| Tür          | Kullanım amacı                                                                   |
| ------------ | -------------------------------------------------------------------------------- |
| `factual`    | Tercihler, kalıcı kullanıcı bilgileri, davranış kalıpları                        |
| `episodic`   | Belirli bir ana bağlı kararlar ("Postgres'i seçtim")                             |
| `procedural` | İş akışı / nasıl yapılır belleği (ayrılmıştır; şu anda otomatik çıkarıcı yoktur) |
| `semantic`   | Vektör deposu girdileri için ayrılmıştır                                         |

`MemoryConfig` getirme stratejisi `exact`, `semantic` veya `hybrid`
seçeneklerinden biridir; kapsam ise `session`, `apiKey` veya `global`
seçeneklerinden biridir. `getMemorySettings()` tarafından döndürülen varsayılan
kapsam `apiKey`'dir.

## Bilgi Çıkarma (`extraction.ts`)

Çıkarma işlemi LLM tabanlı değil, **regex tabanlıdır** — yanıt akışını hiçbir
zaman engellememesi için işlem içinde `setImmediate()` ile çalışır:

- **Tercih kalıpları** → `MemoryType.FACTUAL`
  (ör. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Karar kalıpları** → `MemoryType.EPISODIC`
  (ör. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Alışkanlık kalıpları** → `MemoryType.FACTUAL`
  (ör. `I usually …`, `I always …`, `I tend to …`)

Her eşleşme temizlenir (`trim`, boşlukları daraltma, 500 karakterle
sınırlandırma), kararlı bir `factKey(category, content)` aracılığıyla toplu
işlem içinde yinelenenlerden arındırılır ve
`{category, extractedAt, source: "llm_response"}` meta verileriyle
`createMemory()` üzerinden saklanır. Girdi metni 64 KiB
(`MAX_EXTRACTION_TEXT_LENGTH`) ile sınırlandırılır — daha uzun olduğunda, en
güncel asistan içeriğinin her zaman işleme katılması için metnin **son kısmı**
kullanılır.

`extractFactsFromText(text)`, testler için dışa aktarılır ve yapılandırılmış
bilgileri saklamadan döndürür.

## Getirme (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ana giriş noktasıdır. Şunları yapar:

1. Yapılandırmayı `MemoryConfigSchema` aracılığıyla normalleştirir ve doğrular.
2. `enabled` false olduğunda veya `maxTokens <= 0` olduğunda hemen `[]` döndürür.
3. `maxTokens` değerini `[1, 8000]` aralığıyla sınırlar.
4. Eski veritabanlarının çalışmaya devam etmesi için modern `memories`
   tablosunun (eski `memory` tablosuna karşılık) mevcut olup olmadığını algılar.
5. Temel sorguyu süre sonu koruması
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), isteğe
   bağlı oturum kapsamı ve isteğe bağlı `retentionDays` kesme noktasıyla
   oluşturur.
6. Stratejiye göre dallanır:
   - **`exact`** (varsayılan): kronolojik `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: `config.query` sağlanmışsa ve `memory_fts` mevcutsa
     `memory_fts MATCH ?` ile JOIN yapar ve FTS sıralamasına göre sıralar; FTS
     0 satır döndürdüğünde kronolojik sıralamaya geri döner.
   - **`hybrid`**: FTS sonuçlarının (daha yüksek alaka düzeyi) ve kronolojik
     kümenin birleşimini alır, id'ye göre yinelenenleri kaldırır.
7. Bir sorgu sağlandığında `content`, `key` ve `metadata` JSON verileri
   üzerinde anahtar kelime alaka puanı (`getRelevanceScore`) hesaplar. Puanı
   sıfır olan satırlar filtrelenir.
8. Önce azalan puana, ardından azalan `createdAt` değerine göre sıralar.
9. Sıralanmış listede ilerler ve kümülatif `estimateTokens(content)`
   (≈ `length / 4`) bütçenin altında kaldığı sürece girdileri kabul eder.
   Herhangi bir eşleşme varsa her zaman en az bir girdi döndürür.

`estimateTokens` dışa aktarılır ve getirme, özetleme ve MCP
`omniroute_memory_search` aracı tarafından kullanılır.

## Enjeksiyon (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Tüm bellek içeriklerini tek bir `Memory context: …` dizesinde birleştirir.
2. Sağlayıcı adına göre bir strateji seçer:
   - **Sistem mesajı** (OpenAI, Anthropic, Gemini, … için varsayılan) — kullanıcı sistem istemlerinin yine de öncelikli olması için mevcut sistem mesajlarının önüne
     bir `{role: "system", content: memoryText}` ekler.
   - **Kullanıcı mesajı** (geri dönüş seçeneği) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` içindeki sağlayıcılar için: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Bunlar sistem rolünü reddeder
     ve aksi takdirde 400 hatası verir (GLM/Zhipu için bkz. sorun #1701).
3. Sayıyı, stratejiyi ve modeli `memory.injection.injected` altında günlüğe kaydeder.

`providerSupportsSystemMessage(provider)`, kendi yönlendirme kararlarını vermesi
gereken çağıranlar için dışa aktarılır. Bilinmeyen sağlayıcılar, güvenlik amacıyla
varsayılan olarak `true` değerini alır (sistem rolüne izin verilir).

## Ayarlar (`settings.ts`)

Bellek yapılandırması env değişkenlerinde değil, **DB ayarlar tablosunda saklanır**.
`getMemorySettings()`, `getSettings()` üzerinden okur ve sonucu işlem içinde
önbelleğe alır; `invalidateMemorySettingsCache()`, yazma işlemlerinden sonra ayarlar PUT
rotası tarafından çağrılır.

### Eski alanlar (tüm sürümler)

| DB anahtarı           | Tür     | Varsayılan                                               | UI denetimi                                                       |
| --------------------- | ------- | -------------------------------------------------------- | ----------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30 sürümünden beri varsayılan kapalı)      | Belleği açma/kapatma                                              |
| `memoryMaxTokens`     | integer | `2000` (aralık `0–16000`)                                | Enjeksiyon için token bütçesi                                     |
| `memoryRetentionDays` | integer | `30` (aralık `1–365`)                                    | Saklama aralığı                                                   |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid` içinden biri) | Getirme stratejisi                                                |
| `skillsEnabled`       | boolean | `false`                                                  | Anahtar başına beceri enjeksiyonunu açar/kapatır (bkz. SKILLS.md) |

Not: UI stratejisi `"recent"`, `toMemoryRetrievalConfig()` aracılığıyla dahili
`"exact"` getirme stratejisine eşlenir (kronolojik sıra).

### Yeni alanlar (v3.8.6, plan 21 D9)

Alan açıklamaları için ayrıca yukarıdaki "Ayarlar uzantısı" bölümüne bakın.

| DB anahtarı                 | API alanı                | Varsayılan |
| --------------------------- | ------------------------ | ---------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`   |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`     |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`    |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`    |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`    |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`     |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`   |

Qdrant ile ilgili DB anahtarları (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, varsayılanı `"omniroute_memory"` olan `qdrantCollection`,
varsayılanı `"openai/text-embedding-3-small"` olan `qdrantEmbeddingModel`),
`qdrant.ts` içindeki `normalizeQdrantConfig()` tarafından okunur.

### Ortam değişkenleri (v3.8.6)

Altı isteğe bağlı env değişkeni, motorun çalışma zamanı davranışını ayarlar (`.env.example` içinde belgelenmiştir):

| Değişken                        | Varsayılan                 | Açıklama                                                                                                                                                                            |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Embedding önbelleği TTL değeri (5 dk.)                                                                                                                                              |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Embedding LRU önbelleğindeki azami girdi sayısı                                                                                                                                     |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js modeli için HF deposu                                                                                                                                               |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Statik potion modeli için HF deposu                                                                                                                                                 |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | İndirilen modellerin saklanacağı yer                                                                                                                                                |
| `MEMORY_VEC_TOP_K`              | `20`                       | Vektör araması için varsayılan top-K                                                                                                                                                |
| `MEMORY_RRF_K`                  | `60`                       | Hibrit arama için RRF k sabiti                                                                                                                                                      |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Yerel sqlite-vec vektörlerini kuantize edilmiş biçimde saklamak için `int8` olarak ayarlayın (~4× daha küçük; isteğe bağlıdır). Mod değişikliği yeniden indekslemeyi zorunlu kılar. |

## Özetleme (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`, bir anahtarın belleklerindeki toplam token sayısı bütçeyi aştığında eski içeriği sıkıştırır. Satırları `created_at` alanına göre DESC sırayla yineler, bütçeye uyan satırları korur ve geri kalanların `content` alanını yerinde, orijinal içeriğin ilk üç cümlesiyle değiştirir. `tokensSaved`, eski ve yeni içerik için `estimateTokens` değerleri arasındaki farktır.

Bu yordam mevcut sohbet işlem hattında **kullanılabilir ancak otomatik olarak çağrılmaz** — sürekli sıkıştırmaya ihtiyacınız varsa bunu bir cron görevi, yönetici eylemi veya `MemoryConfig.autoSummarize` bağlantı kodu üzerinden çağırın. Veri kaybı tek yönlüdür: orijinal metnin üzerine yazılır.

## REST API

Tüm uç noktalar yönetim kimlik doğrulaması (`requireManagementAuth`) gerektirir.

### Temel bellek uç noktaları (mevcut + güncellenmiş)

| Yöntem   | Yol                  | Açıklama                                                                                                                                                                                         |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/memory`        | Filtrelerle sayfalandırılmış liste: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Yanıt `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` alanlarını içerir    |
| `POST`   | `/api/memory`        | Kayıt oluşturur (Zod ile doğrulanan: `content`, `key`, isteğe bağlı `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `(apiKeyId, key)` üzerinde upsert yapan `createMemory()` çağrılır |
| `GET`    | `/api/memory/[id]`   | UUID'ye göre tek bir kaydı getirir                                                                                                                                                               |
| `PUT`    | `/api/memory/[id]`   | Kayıt alanlarını (`type`, `key`, `content`, `metadata`) günceller. Gövde: `MemoryUpdatePutSchema`. Gömme kaynağı mevcutsa vektörü de eşitler.                                                    |
| `DELETE` | `/api/memory/[id]`   | Bir kaydı siler; ayrıca `vec_memories` (D15) içinden ve azami gayretle Qdrant'tan da siler. Kayıt bulunamadığında 404 döndürür.                                                                  |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` çalıştırır — oluştur→listele→sil gidiş dönüşü. `{working, latencyMs, error?}` döndürür                                                                |

### Yeni bellek motoru uç noktaları (plan 21)

| Yöntem | Yol                               | Açıklama                                                                                                                                                                                  |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` için deneme çalıştırması — puan, katman ve token bilgileriyle sıralanmış sonuçları döndürür. Gövde: `RetrievePreviewSchema`. Bellekleri eklemez veya değiştirmez.      |
| `GET`  | `/api/memory/embedding-providers` | Gömme modelleriyle birlikte sağlayıcıları listeler ve hangilerinde yapılandırılmış bir API anahtarı olduğunu belirtir.                                                                    |
| `GET`  | `/api/memory/engine-status`       | Tam motor durumunu döndürür: anahtar sözcük katmanı, gömme çözümlemesi, vektör deposu istatistikleri, Qdrant sağlığı, yeniden sıralama yapılandırması. Biçim: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Bellek sıkıştırmasını elle tetikler. Gövde: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}` döndürür.                                       |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` olan bellekler için vektör yeniden indekslemeyi tetikler. Gövde: `MemoryReindexSchema` (`force`). `{started, pending}` döndürür.                                        |

### Ayar uç noktaları

| Yöntem | Yol                                     | Açıklama                                                                                                  |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Geçerli normalleştirilmiş `MemorySettingsExtended` (7 yeni alan + eski alanlar)                           |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` içindeki herhangi bir alanı günceller (toplam 12 alan)                     |
| `GET`  | `/api/settings/qdrant`                  | Geçerli Qdrant ayarları (`QdrantSettingsSchema`)                                                          |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant ayarlarını günceller. Gövde: `QdrantSettingsUpdateSchema`. `apiKey` = boş dize, anahtarı kaldırır. |
| `GET`  | `/api/settings/qdrant/health`           | Yapılandırılmış Qdrant örneğine karşı canlılık denetimi. `QdrantHealthResultSchema` döndürür.             |
| `POST` | `/api/settings/qdrant/search`           | Qdrant'a karşı anlamsal arama testi. Gövde: `QdrantSearchSchema` (`query`, `topK`).                       |
| `POST` | `/api/settings/qdrant/cleanup`          | Süresi dolmuş / eski belleklere ait Qdrant noktalarını kaldırır.                                          |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant için kullanılabilen gömme modellerini listeler.                                                    |

`/api/memory` liste sorgusu, `page` tabanlı sayfalandırmayı (`parsePaginationParams`) **veya** ham `offset` değerini destekler — `offset` mevcut olduğunda öncelikli olur ve yanıt biçimi için türetilmiş bir `page` hesaplanır.

## MCP Araçları (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP sunucusu etkinleştirildiğinde üç bellek aracı kaydedilir:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` işlevini sarmalar. v3.8.6 (D16) itibarıyla `strategy`,
  `"exact"` olarak sabit kodlanmak yerine `getMemorySettings()` üzerinden
  okunur. `query` sağlanırsa ve `strategy`, `semantic` veya `hybrid` ise
  kullanılabilir olduğunda vektör deposu kullanılır.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` işlevini sarmalar. Yalnızca 4 standart türü
  kabul eder: `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → eşleşen
  girdileri listeler, isteğe bağlı olarak oluşturulma öncesi zaman damgasına
  göre filtreler, ardından her birini `deleteMemory()` aracılığıyla siler
  (bu işlem ayrıca vektörleri sqlite-vec + Qdrant üzerinden kaldırır).

Aktarım ve kapsam ayrıntıları için [MCP-SERVER.md](./MCP-SERVER.md) belgesine bakın.

## Kontrol Paneli (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` artık **3 sekmeli bir Studio** arayüzüdür:

### Sekme: Bellekler

- Kavram kartı (daraltılabilir "Nasıl çalışır" açıklaması).
- Gerçek zamanlı liste, arama ve sayfalama (300 ms gecikmeli).
- Tür filtresi (`factual` / `episodic` / `procedural` / `semantic` / tümü).
- Bellek ekleme iletişim kutusu (anahtar, içerik, tür).
- Satır içi düzenleme (kalem düğmesi → `PUT /api/memory/[id]`).
- Her satır için silme (onay iletişim kutusuyla).
- Geçerli sayfanın JSON olarak dışa aktarılması; dosya seçici aracılığıyla JSON içe aktarımı.
- İstatistik kartları: `totalEntries`, `tokensUsed`, `hitRate`.
- "Eskileri sıkıştır" düğmesi → `POST /api/memory/summarize` (önceki deneme
  aday sayısını gösterir, ardından onay ister).
- `GET /api/memory/health` tarafından yönlendirilen yeşil/kırmızı durum noktası.

### Sekme: Deneme Alanı

- Sorgu girişi + strateji seçici (Tam / Semantik / Hibrit) + token bütçesi.
- "Simüle et" → `POST /api/memory/retrieve-preview` — sıralanmış sonuçları
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore` ile gösterir.
- Hangi gömme kaynağının / vektör deposunun kullanıldığını ve bir geri dönüş
  gerçekleşip gerçekleşmediğini gösteren çözümleme paneli.

### Sekme: Motor

- Motor durum paneli (anahtar sözcük FTS5 etiketi, gömme etiketi, vektör deposu
  etiketi, Qdrant sağlık etiketi, yeniden sıralama etiketi).
- "Şimdi Yeniden İndeksle" düğmesi → `POST /api/memory/reindex`.
- Gömme kaynağı seçici (otomatik / uzak / statik / transformers + geçiş düğmeleri).
- Qdrant yapılandırma kartı (etkinleştirme geçişi, ana makine/port/koleksiyon/anahtar,
  bağlantı testi, semantik arama testi, temizleme).
- Yeniden sıralama yapılandırma kartı (etkinleştirme geçişi, sağlayıcı/model seçici).

Bellek ve Qdrant ayarları, eski/genel ayarlar yüzeyi için ayrıca
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) altında bulunur.

## Önbelleğe Alma

`src/lib/memory/store.ts`, `getMemory(id)` okumaları için işlem içi LRU benzeri
bir önbellek (`MEMORY_CACHE_TTL = 1 dk`, `MEMORY_MAX_CACHE_SIZE = 500`, en eski
%20'lik bölümün çıkarılmasıyla) ve ayrıca kendi kapsamlı önbelleğini kullanmak
isteyen çağıranlar tarafından kullanılan `get`/`set`/`invalidate` yöntemlerine
sahip genel bir anahtar/değer `memoryCache` katmanı (`src/lib/memory/cache.ts`)
tutar (1.000 girdili LRU, varsayılan TTL 5 dk).

## Gizlilik ve Yaşam Döngüsü

- Bellek sahipliği API anahtarı kimliğine aittir (`chatCore.ts` içindeki
  `resolveMemoryOwnerId`). `apiKeyInfo.id` olmadan ne getirme ne ekleme
  ne de çıkarma çalışır.
- Gelecekte bir `expires_at` değerine sahip girdiler getirme işleminden filtrelenir;
  `retentionDays` süresinden daha eski girdiler, `retrieveMemories` içindeki
  `created_at >= cutoff` koşulu tarafından hariç tutulur.
- Kalıcı silme için `DELETE /api/memory/[id]` veya `omniroute_memory_clear` kullanın.
- Çıkarma işlemi, `setImmediate` aracılığıyla başlatılıp beklenmeden devam eder;
  hatalar `memory.extraction.background.failed` altında günlüğe kaydedilir ve
  hiçbir zaman çağırana yansıtılmaz.
- Doğrulama gidiş-dönüşleri (`verifyExtractionPipeline`), kendi test girdilerini
  bir `finally` bloğunda temizler.

## Ayrıca Bakınız

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` ayarı, araç tanımlarını
  bellekle birlikte ekler.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP aktarımı / kapsamları.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — daha geniş API yüzeyi.
- Kaynak modüller:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hibrit RRF
  - `src/lib/memory/embedding/index.ts` — çok kaynaklı gömme katmanı
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — tüm bellek API gövdeleri için Zod şemaları
  - `src/shared/schemas/qdrant.ts` — Qdrant ayarları/işlemleri için Zod şemaları
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` için CRUD
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + alt rotalar
  - `src/app/(dashboard)/dashboard/memory/` — Studio kullanıcı arayüzü (sayfa +
    bileşenler + sekmeler + hook'lar)
  - `open-sse/handlers/chatCore.ts` (ekleme / çıkarma bağlantıları)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Gömme Sağlayıcısı Seçme (v3.8.16+)

OmniRoute'un bellek motoru **dört gömme kaynağını** (`src/lib/memory/embedding/`) destekler. Her biri **gecikme, maliyet, model kalitesi ve kurulum karmaşıklığı** açısından farklı avantaj ve dezavantajlara sahiptir.

### Gömme Kaynakları

| Sağlayıcı      | Kaynak                                              | Gecikme                               | Maliyet             | Kalite                                   | Kurulum                                          |
| -------------- | --------------------------------------------------- | ------------------------------------- | ------------------- | ---------------------------------------- | ------------------------------------------------ |
| `transformers` | Yerel ONNX modeli (Xenova/all-MiniLM-L6-v2)         | ~50-150ms (CPU)                       | Ücretsiz            | İyi                                      | Yalnızca `npm install`                           |
| `static`       | Önceden hesaplanmış vektörler (önbellekli)          | <1ms                                  | Ücretsiz            | Geçerli değil (önbellek isabetine bağlı) | Yok                                              |
| `remote`       | OpenAI / Cohere / Voyage API                        | ~100-300ms                            | $0.02-0.10/1M token | Mükemmel                                 | API anahtarı                                     |
| `auto`         | Çalışma zamanında mevcut en iyi kaynağı seçer       | Seçilen kaynakla aynı                 | Ücretsiz            | Seçilen kaynakla aynı                    | Yok                                              |
| _(önbellek)_   | Herhangi bir kaynak üzerinde bellek içi LRU katmanı | <1ms (isabet), tam gecikme (ıskalama) | Ücretsiz            | Temel kaynakla aynı                      | Her zaman açık (seçilebilir bir kaynak değildir) |

### Karar Ağacı

```
                  Dağıtım bağlamınız nedir?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
 GELİŞTİRME/TEST KÜÇÜK PROD  BÜYÜK PROD   UÇ / ÇEVRİMDIŞI
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (ücretsiz, API yok)        (en iyi kalite) (internet yok)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            Üste HER ZAMAN `cache` katmanını ekleyin
            (LruCache herhangi bir sağlayıcıyı sarmalar)
```

### Veritabanı ve API Yapılandırması

Bellek gömme seçenekleri ortam değişkenleriyle değil, Ayarlar API'si/kullanıcı arayüzü aracılığıyla yapılandırılır. Ayarlar altındaki ilgili ayar veritabanı anahtarları (`src/lib/memory/settings.ts` içindeki `normalizeMemorySettings`) şunlardır:

- `memoryEmbeddingSource`: `"transformers"` (yerel), `"remote"` (API tabanlı, ör. OpenAI), `"static"` (harici depo) veya `"auto"`
- `memoryEmbeddingProviderModel`: Uzak/statik kaynaklar için model tanımlayıcısı (ör. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` veya `"auto"`

#### Yerel Model (`transformers`)

Yerel modelleri çalıştırmak için dahili olarak transformers.js kullanır:

```bash
# Kodda okunan ortam değişkenleri (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF model deposu
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF statik potion modeli
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Önbellek dizini
```

#### LRU Gömme Önbelleği

Önbellek varsayılan olarak her zaman açıktır ve ortam değişkenleri aracılığıyla yapılandırılır:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Önbelleğe alınan maksimum öğe sayısı
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 dk.)
```

### Performans Değerleri

Tipik bir 4 çekirdekli x86 sunucusundaki karşılaştırma testi (metinlerin her biri ~100 token):

| Sağlayıcı            | p50   | p95   | p99   | 1M embedding başına maliyet        |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Ücretsiz                           |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant barındırmasına bağlı        |
| `cache` (isabet)     | <1ms  | <1ms  | 2ms   | Ücretsiz                           |

---

## Olgu Çıkarma Kalıpları (v3.8.16+)

`extraction.ts` modülü (`src/lib/memory/extraction.ts`), konuşma mesajlarından yapılandırılmış olguları çıkarmak için **regex kalıp eşleştirmesi** kullanır. Bu kalıpları anlamak, çıkarma kalitesini kullanım senaryonuza göre ayarlamanıza yardımcı olur.

### Varsayılan Kalıp Kategorileri

| Kategori            | Örnek kalıp                                                 | Yakalananlar                   |
| ------------------- | ----------------------------------------------------------- | ------------------------------ |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Kullanıcı tercihleri           |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Kullanıcı kararları (epizodik) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Kalıcı davranış kalıpları      |

### Örnek Kalıplar (Basitleştirilmiş)

```ts
// src/lib/memory/extraction.ts dosyasından
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### Neler Çıkarılır?

Bir kullanıcı şunu söylediğinde:

> "TypeScript'i tercih ederim. Bu proje için Postgres kullanacağım. Göndermeden önce her zaman commit yaparım. Python'ı sevmiyorum."
> Çıkarma işlemi 4 bellek kaydı üretir:
>
> | Anahtar                              | Kategori | Tür      | İçerik                          |
> | ------------------------------------ | -------- | -------- | ------------------------------- |
> | `preference:typescript`              | tercih   | olgusal  | "TypeScript"                    |
> | `decision:postgres_for_this_project` | karar    | epizodik | "Bu proje için Postgres"        |
> | `pattern:commit_before_pushing`      | kalıp    | olgusal  | "göndermeden önce commit yapma" |
> | `preference:python`                  | tercih   | olgusal  | "Python"                        |

### Çıkarma Sınırları

Kontrolsüz çıkarmayı önlemek için aşağıdaki sınırlar uygulanır:

| Minimum içerik uzunluğu | 3 karakter |
| Maksimum içerik uzunluğu | 500 karakter |

### Çıkarma Ne Zaman Devre Dışı Bırakılmalı?

Bellek etkin olduğunda çıkarma otomatik olarak çalışır; yalnızca çıkarmaya özel ayrı bir açma/kapama seçeneği yoktur. Kapatmak için belleği tamamen devre dışı bırakın (`PUT /api/settings/memory` aracılığıyla `enabled: false`). Şu durumlarda bunu yapmayı değerlendirin:

- Mesaj hacminiz yüksekse ve çıkarma maliyeti önemsiz değilse
- Konuşmalarınız çoğunlukla geçiciyse (sohbet, hata ayıklama) ve uzun vadeli değer taşımıyorsa
- Bağlamı zaten özel eklentiler aracılığıyla yakalıyorsanız

---

## Hibrit RRF Ayarlaması (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** algoritması, FTS5 (anahtar sözcük) ve vektör (anlamsal) sonuçlarını birleştirir. `k` parametresi, daha düşük sıralamalı sonuçlara ne kadar ağırlık verileceğini kontrol eder.

### Formül

Her aday bellek kaydı için RRF puanı şöyledir:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Burada:

- `k` sabittir (varsayılan 60)
- `rank_i(d)`, `d` belgesinin i. getirme sistemindeki (FTS, vektör) sırasıdır
- Toplam, tüm getirme sistemleri üzerinden hesaplanır

### `k` Sonuçları Nasıl Etkiler?

| `k` değeri              | Etki                                                                                      | En uygun olduğu durum                  |
| ----------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------- |
| `k=0`                   | Saf sıralama birleştirmesi (yumuşatma yok)                                                | Teorik temel                           |
| `k=10-30`               | En üst sonuçlara yüksek ağırlık verir; düşük sıralamalar çok az katkıda bulunur           | İlk 3 sonuç genellikle doğru olduğunda |
| **`k=60`** (varsayılan) | Dengeli — ilk 10 sonucun tümü anlamlı ölçüde katkıda bulunur                              | Genel amaçlı getirme                   |
| `k=100+`                | Daha düz — düşük sıralamalı sonuçlar bile birden fazla sistemde görünürse baskın olabilir | Duyarlılık > kesinlik kritik olduğunda |

### Uygulamada `k` Ayarlaması

```bash
# Varsayılan
MEMORY_RRF_K=60

# Agresif kesinlik (küçük bellek, az sayıda belge)
MEMORY_RRF_K=20

# Maksimum duyarlılık (büyük bellek, çeşitli sorgular)
MEMORY_RRF_K=120
```

**`k=20` ile örnek:**

- FTS sırası 1 → katkı `1/21 = 0.048`
- FTS sırası 10 → katkı `1/30 = 0.033`
- Vektör sırası 1 → katkı `0.048`
- Birleşik maksimum: `0.096`

**`k=60` ile örnek:**

- FTS sırası 1 → katkı `1/61 = 0.016`
- FTS sırası 10 → katkı `1/70 = 0.014`
- Vektör sırası 1 → katkı `0.016`
- Birleşik maksimum: `0.033`

Daha yüksek `k` değerlerinde, ilk sırayla 10. sıra arasındaki **göreli fark** daha küçüktür; dolayısıyla algoritma, en üst sıra güveninden çok **getirme sistemleri arasındaki fikir birliğine** dayanır.

### `k` Ne Zaman Değiştirilmeli?

| Belirti                                           | Deneyebileceğiniz ayar                                                       |
| ------------------------------------------------- | ---------------------------------------------------------------------------- |
| En üstteki sonuç her zaman kazanıyor ancak yanlış | **Daha düşük** k (ör. 20) — en üst sıra güveni daha önemli olur              |
| Doğru yanıt ilk 5'te ancak ilk sırada değil       | **Daha yüksek** k (ör. 100) — daha düz puanlama fikir birliğini ödüllendirir |
| Duyarlılık yüksek ancak kesinlik düşük            | **Daha düşük** k — sıralamayı keskinleştirin                                 |
| Duyarlılık düşük (ilgili belgeler eksik)          | **Daha yüksek** k — düşük sıralamalı belgelere şans verin                    |

### RRF Ağırlıklandırması

Karşılıklı sıralama birleştirmesi, anlamsal vektör sırası ve tam metin arama sırası için eşit ağırlıklar kullanır:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Ayrı ayrı ağırlıkları ayarlamak için herhangi bir ortam değişkeni yoktur (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` mevcut değildir).

---

## Özetleme Stratejisi (v3.8.16+)

`summarization.ts` modülü (`src/lib/memory/summarization.ts`), hatırlama kabiliyetini korurken etkin kümenin küçük kalmasını sağlamak için eski anıları sıkıştırır.

### Özetleme Ne Zaman Tetiklenir?

| Tetikleyici                    | Eşik (varsayılan) |
| ------------------------------ | ----------------- |
| API üzerinden manuel tetikleme | yok               |

### Neler Özetlenir?

`summarization.ts` dosyasından iki giriş noktası dışa aktarılır:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — bir oturuma ait
  anıları, belirli bir token bütçesiyle sınırlandırılmış tek bir özet metne dönüştürür.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API tarafından kullanılan
  yaş tabanlı sıkıştırmadır: `days` değerinden daha eski tüm anıları seçer, bunlardan
  tek bir sıkıştırılmış özet anı oluşturur ve (`dryRun`, `false` olduğunda)
  orijinalleri siler. Hiçbir şeyi değiştirmeden aday kümesini ve toplam token sayısını
  önizlemek için `dryRun: true` geçirin.

Etiket/anahtar kümeleme geçişi veya anı başına "temel ve özetlenebilir" puanlaması
yoktur — seçim yalnızca yaş sınırına göre yapılır ve özet metin, her aday için
tür önekli sıkıştırılmış bir satırdan oluşur.

### Özetlemeyi Tetikleme

Özetleme **manuel / isteğe bağlıdır** — `autoSummarize` ayarı varsayılan olarak
`false` olduğundan hiçbir şey otomatik olarak sıkıştırılmaz. API üzerinden tetikleyin:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Kapalı bırakmak için `autoSummarize` ayarını varsayılan değerinde (`false`) tutmanız yeterlidir.

### Özetleme Kalitesi İçin İpuçları

- **Önce `dryRun` ile önizleyin** — `summarizeMemoriesOlderThan(..., true)`,
  orijinalleri silmeden önce nelerin birleştirileceğini doğrulayabilmeniz için aday
  listesini ve toplam token sayısını döndürür.
- Büyük bir anı koleksiyonunuz varsa **özetlemeyi trafiğin düşük olduğu saatlerde çalıştırın** — yavaş olan kısım LLM çağrısıdır

```bash
# Cron tarzı: her gün saat 03.00'te özetle
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend Sağlayıcı Kalıbı

> **Doğruluk kaynağı:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testler:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend sağlayıcı kalıbı, mevcut bellek motorunun üzerine **takılıp çıkarılabilir bir arka uç soyutlama katmanı** ekler. Bellek sistemi artık tek bir depolama uygulamasına bağlı olmak yerine, yapılandırılabilir birincil/yedek yönlendirmeyle birden fazla arka ucu (SQLite, Obsidian, Notion, özel HTTP arka uçları) destekler.

### Mimari

```
┌──────────────────────────────────────────────────────────┐
│                    API Rotaları                           │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           Tekil düzenleyici (manager.ts)                  │
│                                                          │
│  Birincil ──► Arka Uç A  (örn. SQLite)                   │
│  Yedek    ──► Arka Uç B  (örn. Obsidian)                 │
│               Arka Uç C  (örn. GenericBackend ile Notion) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Arka Ucu   │ │ Arka Ucu   │ │ Arka Ucu (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Temel Arayüz (`backend.ts`)

Her arka uç, `MemoryBackend` arayüzünü uygulamalıdır:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Arama
  search(config: SearchConfig): Promise<Memory[]>;

  // Sistem durumu
  health(): Promise<HealthCheckResult>;

  // Yaşam döngüsü (isteğe bağlı)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Aşağıdakileri yapan tekil düzenleyici:

- Arka uçları `register(backend)` aracılığıyla **kaydeder** — önyükleme sırasında `index.ts` içinden çağrılır
- Birincil ve yedekleri `configure(primary, fallbacks)` aracılığıyla **yapılandırır**
- CRUD/arama işlemlerini birincil arka uca **yönlendirir**, hata durumunda yedek zincirini kullanır
- Tüm arka uçlarda düzenli olarak **sistem durumu kontrolleri** gerçekleştirir

**Yedek davranışı:**

| İşlem    | Birincil               | Yedekler                        |
| -------- | ---------------------- | ------------------------------- |
| `create` | ✅ Yalnızca birincil   | ❌                              |
| `get`    | ✅ Önce birincili dene | ✅ null ise yedeği kullan       |
| `update` | ✅ Yalnızca birincil   | ✅ Beklemeden eşitle            |
| `delete` | ✅ Yalnızca birincil   | ✅ Beklemeden eşitle            |
| `list`   | ✅ Yalnızca birincil   | ❌                              |
| `search` | ✅ Önce birincil       | ✅ Hata durumunda yedeği kullan |

#### GenericMemoryBackend (`genericBackend.ts`)

Herhangi bir REST API'sini MemoryBackend'e uyarlayan genel amaçlı bir HTTP bağlayıcısıdır. Şunlar için kullanışlıdır:

- **Notion** — Notion API aracılığıyla bağlanın
- **Obsidian** — Obsidian Local REST API aracılığıyla bağlanın
- **Özel arka uçlar** — RESTful bir bellek API'si sunan herhangi bir hizmet

**Yapılandırma:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Backend API'sinin temel URL'si
  apiKey?: string;           // Kimlik doğrulama için Bearer belirteci
  headers?: Record<string, string>;  // Özel HTTP üstbilgileri
  timeout?: number;          // İstek zaman aşımı (varsayılan: 30000ms)
  backendType?: string;      // Günlük kaydı için

  // Uç nokta geçersiz kılmaları (varsayılanlar REST kurallarını kullanır)
  endpoints?: {
    search?: string;   // varsayılan: "/memories/search"
    create?: string;   // varsayılan: "/memories"
    list?: string;     // varsayılan: "/memories"
    get?: string;      // varsayılan: "/memories/{id}"
    update?: string;   // varsayılan: "/memories/{id}"
    delete?: string;   // varsayılan: "/memories/{id}"
    health?: string;   // varsayılan: "/health"
  };

  // Sorgu parametresi adı eşlemeleri
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Yol parametresi adı eşlemeleri
  pathParams?: {
    id?/memoryId?
  };
}
```

**Bilinen backend'ler** `KNOWN_BACKENDS` içinde önceden yapılandırılmıştır:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 adresine yönlendirilmiş GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 adresine yönlendirilmiş GenericMemoryBackend
```

#### Yerleşik Backend'ler

##### SQLiteBackend (`sqliteBackend.ts`)

Varsayılan birincil backend'dir. `src/lib/memory/store.ts` kullanarak mevcut SQLite tabanlı bellek deposını sarmalar. Başlatma sırasında otomatik olarak kaydedilir.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Mevcut Obsidian entegrasyonunu (`src/lib/memory/obsidianBackend.ts`) sarmalar. Obsidian Local REST API aracılığıyla bir Obsidian kasasına bağlanır.

### Ayarlar

Bellek backend ayarları, uygulama ayarları tablosunda saklanır ve `src/lib/memory/settings.ts` aracılığıyla yönetilir:

| Ayar                     | Ortam/Yapılandırma Anahtarı | Varsayılan | Açıklama                                       |
| ------------------------ | --------------------------- | ---------- | ---------------------------------------------- |
| Birincil backend         | `memoryPrimaryBackend`      | `"sqlite"` | Birincil backend'in kimliği                    |
| Yedek backend'ler        | `memoryFallbackBackends`    | `[]`       | Sıralı yedek backend kimlikleri                |
| Backend yapılandırmaları | `memoryBackendConfigs`      | `{}`       | Backend başına yapılandırma geçersiz kılmaları |

Ayarlar `normalizeMemorySettings()` aracılığıyla normalleştirilir ve `getMemorySettings()` içinde önbelleğe alınır.

### Başlatma Akışı

```
Uygulamanın önyüklenmesi
  → index.ts içe aktarmaları (yan etki): SQLiteBackend'i kaydeder
  → initMemoryBackends() uygulama yaşam döngüsünden çağrılır:
      1. Ayarları yükle (getMemorySettings)
      2. Birincil + yedek backend'leri yapılandır
      3. Tüm backend'leri başlat (sağlık kontrolü)
      4. İstekler için hazır
```

### Yeni Bir Backend Ekleme

1. `src/lib/memory/<name>Backend.ts` içinde **`MemoryBackend` arayüzünü uygulayın**
2. `src/lib/memory/index.ts` içinden **dışa aktarın**
3. Başlatma sırasında `memoryManager.register(yourBackend)` ile **kaydedin**
4. Ayarlar aracılığıyla **yapılandırın**: `memoryPrimaryBackend` değerini backend kimliğiniz olarak ayarlayın
5. `src/lib/memory/__tests__/generic-backend.test.ts` dosyasını referans alarak **test edin**

#### Örnek: Brain Backend

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### Doğrulama

#### Birim testleri

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Beklenen çıktı: Aşağıdakileri kapsayan **35 test; tümü başarılı**:

- Oluşturucu (2)
- Sağlık kontrolü (4) — başarılı, 500 hatası, ağ hatası, gecikme
- Başlatma (2) — başarılı, başarısız
- Oluşturma (2) — varsayılan uç nokta, özel uç nokta
- Alma (4) — başarılı, 404 → null, 404 dışındaki hatayı fırlatma, özel yol parametreleri
- Güncelleme (2) — başarılı, 404 → false
- Silme (2) — başarılı, 404 → false
- Listeleme (2) — sorgu parametreleri, özel parametre adları
- Arama (3) — sorgu parametreleri, özel uç nokta, seçenekleri serileştirme
- Kimlik doğrulama üstbilgileri (2) — Bearer belirteci, özel üstbilgiler
- Fabrika (1)

#### Tür kontrolü

```bash
npm run typecheck:core
```

Beklenen: **0 hata**.
