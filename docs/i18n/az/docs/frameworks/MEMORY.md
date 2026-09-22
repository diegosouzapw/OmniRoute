# Memory System (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Əsas mənbə:** `src/lib/memory/` və `src/app/api/memory/`
> **Son yenilənmə:** 2026-06-28 — v3.8.40 (standart olaraq deaktiv + int8 kvantlaşdırma uyğunlaşdırması)

OmniRoute API açarına (və istəyə bağlı olaraq sessiya identifikatoruna) əsaslanan davamlı söhbət yaddaşı təmin edir. Yaddaş qeydləri yüngül regex nümunə uyğunlaşdırması vasitəsilə LLM cavablarından avtomatik çıxarılır və sonrakı sorğulara başlanğıc sistem mesajı kimi (və ya sistem rolunu qəbul etməyən provayderlər üçün ilk istifadəçi mesajı kimi) yenidən əlavə edilir.

> **Yaddaş standart olaraq DEAKTİVDİR (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> artıq `false` dəyərindədir (`src/lib/memory/settings.ts`). Yaddaşın aktivləşdirilməsi
> əldə edilmiş kontekstdən `maxTokens` həddinədək (~2k) məlumatı **hər bir** söhbət
> sorğusuna əlavə edir və bunun üçün ödəniş tutulur — bu, yeni quraşdırmalar və öz
> kontekstini idarə edən müştərilər üçün gözlənilməz xərc ola bilər. **Settings → Memory**
> bölməsində bunu açıq şəkildə aktivləşdirin (yaddaş aktiv olduqda `MemorySkillsTab`
> token xərci barədə xəbərdarlıq bloku göstərir). Müştəri `x-omniroute-no-memory`
> sorğu başlığından (`true`/`1`/`yes`) istifadə edərək yaddaşı ayrıca bir sorğu üçün
> deaktiv edə bilər — [API_REFERENCE.md](../reference/API_REFERENCE.md) sənədindəki
> sorğu başlıqları cədvəlinə baxın. Yaddaşsız sorğu `memoryOwnerId = null` təyin edir
> və bununla həmin sorğu üçün **həm** yaddaş, **həm də** bacarıq əlavə edilməsini
> deaktiv edir (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Yaddaş istifadəçiyə görə deyil, **hər API açarı üzrə əhatələnir** — eyni API açarı ilə autentifikasiya edilmiş hər sorğu eyni yaddaş hovuzunu paylaşır və `sessionId` vasitəsilə istəyə bağlı əlavə əhatələndirmə mümkündür.

## Arxitektura

```
Müştəri → /v1/chat/completions (apiKeyInfo əvvəlki mərhələdə müəyyən edilir)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # identifikatoru çıxarır
    → getMemorySettings()                     # keşlənmiş parametrlər
    → shouldInjectMemory(body, {enabled})     # keçid şərti
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + istəyə bağlı vektor
    → injectMemory(body, memories, provider)  # sistem və ya istifadəçi mesajı
  → yuxarı axın provayderinə çağırış
  → cavab zamanı: extractFacts(text, apiKeyId, sessionId)  # bloklamadan
    → setImmediate → hər uyğunluq üçün createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

Əlavəetmə və çıxarış çağırış nöqtələri `open-sse/handlers/chatCore.ts` daxilində əlaqələndirilib (`retrieveMemories`, `injectMemory` və `extractFacts` ifadələrini axtarın).

## Mühərrik arxitekturası (3 səviyyəli seçim)

Yaddaş Mühərriki mövcud infrastruktura və parametrlərə əsasən icra zamanı məlumat əldəetmə yolunu müəyyən edir. Prioritet sırası ilə tətbiq edilən üç səviyyə mövcuddur:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  SƏVİYYƏ 0 — Açar söz (FTS5)                                │
  │  Yoxlama əsasında əlçatanlıq: SQLite yığımı dəstəklədikdə    │
  │  FTS5 (better-sqlite3 / node:sqlite / bun:sqlite); FTS5      │
  │  olmayan yığımlarda əlçatan deyil (məs., sql.js/WASM —       │
  │  "no such module: fts5"). strategy = "exact" olduqda və ya   │
  │  ehtiyat variant kimi istifadə edilir; mühərrik statusundakı │
  │  açar söz yoxlamanın nəticəsini əks etdirir.                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  SƏVİYYƏ 1 — Daxili Vektor (sqlite-vec)                      │
  │  sqlite-vec v0.1.9 db.loadExtension() ilə yüklənir.          │
  │  Float32 vektorları üzərində KNN tam axtarışı. Bu hallarda   │
  │  aktiv olur:                                                 │
  │   • sqlite-vec loadExtension uğurla tamamlanır               │
  │   • Float32Array yarada bilən yerləşdirmə mənbəyi mövcuddur  │
  │     (remote | static | transformers)                         │
  │   • vec_memories cədvəli mövcuddur (ilk ready() çağırışında  │
  │     yaradılır)                                               │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  SƏVİYYƏ 2 — Qdrant (istəyə bağlı xarici vektor verilənlər   │
  │  bazası)                                                     │
  │  Aktivləşdirildikdə semantic/hybrid üçün sqlite-vec-i əvəz   │
  │  edir. İşlək Qdrant instansiyası və konfiqurasiya edilmiş    │
  │  host/port tələb olunur.                                    │
  └─────────────────────────────────────────────────────────────┘
```

Aşağı səviyyəyə keçid avtomatik və şəffaf şəkildə həyata keçirilir:

- sqlite-vec yüklənə bilməzsə, 1-ci səviyyə əlçatmaz olur → 0-cı səviyyəyə keçilir.
- Yerləşdirmə mənbəyi xəta qaytararsa, 1-ci səviyyə 0-cı səviyyəyə keçir.
- Qdrant işlək vəziyyətdə deyilsə, 2-ci səviyyə 1-ci səviyyəyə (və ya 1-ci səviyyə də əlçatmazdırsa, 0-cı səviyyəyə) keçir.

## Embeddinq mənbələri

Embeddinq qatı (`src/lib/memory/embedding/`) hansı mənbənin istifadə ediləcəyini
`MemorySettingsExtended.embeddingSource` əsasında müəyyən edir:

| Mənbə          | Təsvir                                                                                         | Açar tələb olunur | Soyuq başlanğıc  |
| -------------- | ---------------------------------------------------------------------------------------------- | ----------------- | ---------------- |
| `remote`       | Konfiqurasiya edilmiş provayderin embeddinq API-sindən istifadə edir (OpenAI, Cohere və s.)    | Bəli              | Yoxdur           |
| `static`       | `potion-base-8M` vasitəsilə lokal axtarış cədvəli embeddinqi (WordPiece + orta dəyərlə pulinq) | Xeyr              | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` vasitəsilə lokal ONNX inferensi             | Xeyr              | ~3s + ~400MB RAM |
| `auto`         | İcra zamanı müəyyənləşdirmə: remote (açar mövcuddursa) → static → transformers → null          | Asılıdır          | Asılıdır         |

**`auto` üçün müəyyənləşdirmə ardıcıllığı:**

1. `listEmbeddingProviders()` daxilində `hasKey === true` olan ilk provayderi tap → `remote`.
2. Əgər `settings.staticEnabled === true` olarsa → `static`.
3. Əgər `settings.transformersEnabled === true` olarsa → `transformers`.
4. Əks halda → `null` (FTS5 açar söz axtarışına keçir).

Embeddinq keşi (`src/lib/memory/embedding/cache.ts`) açar kimi
`${source}:${model}:${dim}:${sha256(text)}` istifadə edən, yaddaşdaxili LRU xəritəsindən istifadə edir;
bu xəritə maksimum `MEMORY_EMBEDDING_CACHE_MAX` qeydlə (standart olaraq 1000) məhdudlaşır və
`MEMORY_EMBEDDING_CACHE_TTL_MS` TTL-inə (standart olaraq 5 dəqiqə) malikdir. Hər prosesin
həyat dövrü ərzində bütün çağıranlar arasında paylaşılır.

## Hibrid RRF (k=60)

`strategy = "hybrid"` olduqda və vektor anbarı əlçatan olduqda, nəticələrin əldə edilməsi
FTS5 və vektor nəticələrini birləşdirmək üçün Reciprocal Rank Fusion metodundan istifadə edir:

```
RRF(d) = Σ  1 / (k + rank_i(d))      burada k = 60-dır (MEMORY_RRF_K vasitəsilə konfiqurasiya edilə bilər)
          i
```

Konkret olaraq:

1. FTS5 axtarışını işə sal → sıralanmış siyahı `R_fts` (mövqe 1..N).
2. KNN vektor axtarışını işə sal → sıralanmış siyahı `R_vec` (mövqe 1..M).
3. Hər unikal `memoryId` üçün:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (siyahıda olmadıqda 0).
4. `rrf_score` üzrə AZALAN qaydada sırala, token büdcəsi keçidini tətbiq et.

RRF-nin heterogen nəticə əldəetmə sistemləri arasında bal normallaşdırmasına ehtiyac
olmadan effektiv olduğu yaxşı məlumdur. Standart `k=60` dəyəri Cormack və başqalarının
orijinal məqaləsindən götürülüb və kiçik korpuslar (<10k yaddaş) üçün yaxşı işləyir.

## Geri doldurma (tənbəl + yenidən indeksləmə)

Embeddinq modeli dəyişdikdə (`embedding_signature` vasitəsilə aşkarlanır),
vektor anbarı yenidən qurulur və bütün mövcud yaddaşlar `memories` cədvəlində
`needs_reindex = 1` kimi işarələnir.

**Tənbəl geri doldurma**: Növbəti nəticə əldəetmə zamanı vektor qeydi olmayan hər bir
yaddaş embeddinq edilir və axtarış işə düşməzdən əvvəl `vec_memories` daxilinə əlavə olunur.
Bu, başlanğıcı bloklamadan geri doldurma xərcini real sorğular arasında amortizasiya edir.

**Açıq yenidən indeksləmə**: `/dashboard/memory` daxilindəki Engine vərəqəsində
`POST /api/memory/reindex` çağıran "İndi yenidən indekslə" düyməsi mövcuddur. Emaledici
`src/lib/memory/reindex.ts` daxilindəki `runReindexBatch()` funksiyasını çağırır və bu funksiya
hər sorğu üzrə maksimum `limit` qədər gözləyən qeydi emal edir. Gedişat
`GET /api/memory/engine-status` (`vectorStore.needsReindex`) vasitəsilə sorğulana bilər.

`memory_vec_meta` cədvəli (`083_memory_vec.sql` miqrasiyası) aşağıdakıları saxlayır:

- `active_dim` — cari vektor ölçüsü (null = hələ kalibrasiya edilməyib).
- `embedding_signature` — dəyişiklikləri aşkarlamaq üçün istifadə olunan `${source}:${model}:${dim}`.
- `last_reset_at` — son tam sıfırlamanın zaman damğası.
- `vec_loaded` — sqlite-vec-in uğurla yüklənib-yüklənmədiyini göstərən 0/1 bayrağı.

## Parametrlərin genişləndirilməsi

Doqquz embedding və vektor sahəsi `src/shared/schemas/memory.ts` faylındakı `MemorySettingsExtended` daxilində mövcuddur və `src/lib/db/settings.ts` vasitəsilə davamlı saxlanılır:

| Sahə                     | Tip                                                | Standart dəyər | Təsvir                                                                         |
| ------------------------ | -------------------------------------------------- | -------------- | ------------------------------------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`       | İstifadə ediləcək embedding mənbəyi                                            |
| `embeddingProviderModel` | `string \| null`                                   | `null`         | `provider/model` formatında provayder/model                                    |
| `customBaseUrl`          | `string \| null`                                   | `null`         | Yalnız Memory üçün OpenAI-uyğun son nöqtənin baza URL-i                        |
| `customModelId`          | `string \| null`                                   | `null`         | Fərdi son nöqtəyə göndərilən model ID-si                                       |
| `transformersEnabled`    | `boolean`                                          | `false`        | Transformers.js üçün seçimlə aktivləşdirmə (MiniLM, ~400MB)                    |
| `staticEnabled`          | `boolean`                                          | `false`        | Statik potion-base-8M lokal modeli üçün seçimlə aktivləşdirmə                  |
| `rerankEnabled`          | `boolean`                                          | `false`        | Yenidən sıralama mərhələsini aktivləşdirir (hər sorğuya +200-500ms əlavə edir) |
| `rerankProviderModel`    | `string \| null`                                   | `null`         | `provider/model` formatında yenidən sıralama provayderi/modeli                 |

`rerankProviderModel`, `POST /v1/rerank` tərəfindən müəyyən edilir (loopback üzərindən çağırılır), buna görə həmin marşrutun qəbul etdiyi hər şeyi qəbul edir: seçilmiş bulud yenidən sıralama modeli (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) və ya `<node-prefix>/<model>` formatında OpenAI-uyğun provayder qovşağı (məsələn, TEI/Infinity sistemi üçün `skilled-mini/bge-reranker-v2-m3`). Loopback qovşaqları həmişə uyğundur; başqa hostdakı qovşaq (LAN, Tailscale) əlavə olaraq `RERANK_REMOTE_PROVIDER_NODES` funksiya bayrağını tələb edir və provayderin xarici URL siyasətindən keçməlidir — baxın: [Funksiya bayraqları](../reference/FEATURE_FLAGS.md). İdarə panelindəki seçim siyahısı seçilmiş provayderləri və lokal qovşaqları göstərir; istənilən etibarlı `provider/model` sətri birbaşa `PUT /api/settings/memory` vasitəsilə təyin edilə bilər.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | İstifadə ediləcək vektor backend-i |

Bunlar `GET /PUT /api/settings/memory` vasitəsilə əlçatandır (sxem: `MemorySettingsExtendedSchema`).

`remote` mənbəyi üçün Memory həmçinin ixtiyari `customBaseUrl` və
`customModelId` parametrlərini qəbul edir. Onlar birlikdə qlobal embedding reyestrini
dəyişdirmədən OpenAI-uyğun `/embeddings` son nöqtəsini və modeli seçirlər. Son nöqtə
istifadədən əvvəl normallaşdırılır və provayderin xarici URL siyasəti ilə yoxlanılır: HTTP(S)
tələb olunur, daxil edilmiş giriş məlumatları və sorğu sətirləri rədd edilir, bulud metadatası
ünvanları isə bloklanmış qalır. Boş dəyərlər seçilmiş reyestr provayderini qoruyur. İdarə
panelinə qaytarılan xətalar təmizlənir və son nöqtənin giriş məlumatları heç vaxt jurnala yazılmır.

> **TODO (D20):** `global` əhatə dairəsi (yaddaşların bütün API açarları arasında paylaşılması)
> bu buraxılışda həyata keçirilməyib. Bunun üçün sxem dəyişiklikləri və qlobal əldəetmə
> yolu tələb olunur. Ayrı şəkildə izləyin.

## Saxlama qatları

### Əsas: SQLite (`memories` cədvəli)

`015_create_memories.sql` miqrasiyası tərəfindən yaradılır:

| Sütun                       | Növ                | Qeydlər                                                                                                   |
| --------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` vasitəsilə yaradılan UUID                                                           |
| `api_key_id`                | `TEXT NOT NULL`    | Sahib API açarı                                                                                           |
| `session_id`                | `TEXT`             | Söhbət üzrə ixtiyari əhatə dairəsi                                                                        |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` dəyərlərindən biri                                        |
| `key`                       | `TEXT`             | Stabil upsert açarı, məsələn, `preference:i_prefer_python`                                                |
| `content`                   | `TEXT NOT NULL`    | Faktın faktiki mətni                                                                                      |
| `metadata`                  | `TEXT`             | JSON bloku (kateqoriya, extractedAt, mənbə, ...)                                                          |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 sətirləri                                                                                        |
| `expires_at`                | `TEXT`             | İxtiyari son istifadə vaxtı; `NULL` daimi deməkdir                                                        |
| `memory_id`                 | `INTEGER UNIQUE`   | UUID-ləri ↔ FTS5 rowid-ləri ilə əlaqələndirmək üçün `023_fix_memory_fts_uuid.sql` tərəfindən əlavə edilib |

İndekslər: `api_key_id`, `session_id`, `type`, `expires_at`, həmçinin unikal `memory_id` indeksi.

**Upsert semantikası**: `createMemory()` eyni `(api_key_id, key)` dəyərlərinə malik mövcud sətri axtarır və tapdıqda onu yerində yeniləyir (`metadata` dayaz yayılma vasitəsilə birləşdirilir). Bu, təkrarlanan üstünlük ifadələri səbəbindən cədvəlin məhdudiyyətsiz böyüməsinin qarşısını alır.

### Tam mətnli axtarış (`memory_fts` virtual cədvəli)

`022_add_memory_fts5.sql`, `content` və `key` üzərində FTS5 virtual cədvəli yaradır. `023_fix_memory_fts_uuid.sql`, UUID əsas açarının FTS5-in tam ədəd rowid-i ilə birləşdirilmədiyi real istifadə xətasını düzəldir — miqrasiya `memory_id` sütununu əlavə edir, FTS cədvəlini yenidən yaradır və INSERT, DELETE və UPDATE əməliyyatları zamanı FTS-i sinxron saxlayan trigger-ləri (`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) qoşur.

`retrieval.ts` tərəfindən `semantic` və `hybrid` strategiyaları üçün istifadə olunur (aşağıya baxın). Axtarış kodu `hasTable("memory_fts")` ilə qorunur və FTS cədvəli olmadıqda və ya FTS sorğusu xəta verdikdə xronoloji sıralamaya geri keçir.

### İxtiyari: Qdrant (2-ci səviyyə vektor anbarı)

`src/lib/memory/qdrant.ts`, 2-ci səviyyə vektor anbarı kimi ixtiyari Qdrant inteqrasiyasını həyata keçirir. Axtarış yalnız mühərrik selektoru `memoryVectorStore === "qdrant"` olduqda Qdrant-a yönləndirilir — standart `"auto"` (və `"sqlite-vec"`) Qdrant-ı **heç vaxt** seçmir. Engine nişanındakı keçid **həm** `qdrantEnabled`, **həm də** `memoryVectorStore` parametrlərini birlikdə təyin edir: aktivləşdirmə Qdrant-ı əsas anbar edir, deaktivləşdirmə isə `"auto"` dəyərinə qaytarır (#5597 — bu düzəlişdən əvvəl aktivləşdirmə təsirsiz idi, çünki heç nə mühərrik selektoruna yazmırdı). Qdrant əlçatan olmadıqda və ya heç nə qaytarmadıqda axtarış sqlite-vec → FTS5 ardıcıllığına geri keçir.

- `upsertSemanticMemoryPoint()` — `key + content` dəyərini konfiqurasiya edilmiş
  yerləşdirmə modeli ilə vektorlaşdırır, kolleksiyanın mövcudluğunu təmin edir (ilk istifadədə
  kosinus məsafəli vektorlar yaradır) və `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` faydalı yükü ilə nöqtəni əlavə edir və ya yeniləyir.
- `searchSemanticMemory(query, topK, scope)` — sorğunu vektorlaşdırır, kolleksiyada
  `kind = "omniroute_memory"` filtrinə və istəyə bağlı olaraq
  `apiKeyId` / `sessionId` filtrlərinə əsasən axtarış aparır. `topK` dəyərini `[1, 20]` aralığı ilə məhdudlaşdırır.
- `deleteSemanticMemoryPoint(id)` — bir nöqtəni silir. SQLite sətri silindikdən
  sonra `deleteMemory()` tərəfindən çağırılır (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` dəyəri keçmişdə olan
  və ya `createdAtUnix` dəyəri saxlama müddətinin son həddindən köhnə olan nöqtələri
  kütləvi şəkildə silir. İdarəetmə panelinin faktiki sayları göstərə bilməsi üçün əvvəlcə onların sayını müəyyən edir.
- `checkQdrantHealth()` — gecikmə ölçümü ilə `GET /readyz` sağlamlıq yoxlaması.

Parametrlər interfeysi `/dashboard/memory` səhifəsinin **Mühərrik tabında** Qdrant konfiqurasiyasını, sağlamlıq yoxlamasını, semantik axtarış sınağını
və təmizləməni təqdim edir. `src/app/api/settings/qdrant/` altındakı müvafiq
marşrutların hamısı v3.8.6 versiyasından etibarən qoşulub:

| Marşrut                                 | Metod         | Təsvir                                     |
| --------------------------------------- | ------------- | ------------------------------------------ |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant parametrlərini oxumaq / yeniləmək   |
| `/api/settings/qdrant/health`           | `GET`         | İşləkliyin yoxlanması + gecikmə            |
| `/api/settings/qdrant/search`           | `POST`        | Semantik axtarış sınağı                    |
| `/api/settings/qdrant/cleanup`          | `POST`        | Vaxtı keçmiş / köhnə nöqtələri silmək      |
| `/api/settings/qdrant/embedding-models` | `GET`         | Mövcud yerləşdirmə modellərini siyahılamaq |

**Davranış qeydləri (nə gözləməli):**

- **Mühərrik seçimi** — Mühərrik tabında Qdrant-ın aktivləşdirilməsi onu əsas
  saxlama sistemi edir (`memoryVectorStore="qdrant"` təyin olunur); deaktivləşdirilməsi isə dəyəri `"auto"` olaraq sıfırlayır (#5597).
- **Geriyə doğru doldurma yoxdur** — yalnız Qdrant aktivləşdirildikdən **sonra** yaradılan/yenilənən yaddaşlar
  ona yazılır (nəticəsi gözlənilmədən aparılan ikili yazma). Əvvəldən mövcud olan SQLite yaddaşları **miqrasiya edilmir**;
  "İndi yenidən indekslə" yalnız sqlite-vec indeksini yenidən qurur, Qdrant-ı yox.
- **Vektor ölçüsü ilk istifadə zamanı faktiki yerləşdirmədən avtomatik müəyyən edilir** — doldurulmalı
  ölçü sahəsi yoxdur. Kolleksiya mövcud olduqdan sonra yerləşdirmə modelinin dəyişdirilməsi
  **avtomatik idarə edilmir**: mövcud kolleksiyaya toxunulmur, ölçüləri
  uyğun gəlməyən yazma/axtarış əməliyyatları uğursuz olur və sqlite-vec ehtiyat variantına keçid edilir. Yerləşdirmə modelini dəyişmək üçün
  kolleksiyanı yenidən yaradın (yeni ad verin və ya onu Qdrant-da silin).
- **Məsafə metrikası** — həmişə **Kosinusdur** (kolleksiya yaradılarkən sərt şəkildə kodlaşdırılıb;
  konfiqurasiya edilə bilməz).
- **Autentifikasiya** — yalnız API açarı (`api-key` başlığı kimi göndərilir; autentifikasiyasız
  lokal Docker üçün istəyə bağlıdır). JWT/RBAC istifadə edilmir.
- **Konfiqurasiya sahələri** — interfeys `host`, `port`, `collection`, `embeddingModel`,
  `apiKey` sahələrini təqdim edir. `vectorSize` / `hnswEfConstruct` yalnız env/DB vasitəsilə əlçatandır və `vectorSize`
  kolleksiyanın yaradılması üçün istifadə edilmir (ölçü yerləşdirmədən əldə olunur).

### Vektor kvantlaşdırması (int8 — istəyə bağlı, hər iki arxa sistem)

Hər iki vektor arxa sistemi saxlanılan vektorların yaddaş tutumunu
(kiçik geri çağırma dəqiqliyi itkisi müqabilində Float32-dən təxminən 4 dəfə az) azaltmaq üçün **istəyə bağlı int8 kvantlaşdırmasını** dəstəkləyir.
Hər ikisində standart olaraq **deaktivdir** — açıq şəkildə aktivləşdirilmədiyi halda vektorlar tam dəqiqlikdə qalır.

| Arxa sistem | Parametr                        | Növ                            | Standart | Oxunduğu yer                                                |
| ----------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant      | `qdrantQuantization` (DB açarı) | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec  | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** hər instansiya üçün `qdrantQuantization` parametr
  açarı vasitəsilə konfiqurasiya edilir (`PUT /api/settings/qdrant` sorğusunda `quantization` sahəsi kimi təqdim olunur). Dəyər
  `"int8"` olduqda `buildQuantizationConfig()` skalyar kvantlaşdırma
  (`always_ram`, kvantil `0.99`) tələb edir və axtarışlar `rescore: true` parametrini aktivləşdirir ki,
  tam dəqiqlikli vektorlar int8 namizəd dəstini dəqiqləşdirsin.
- **sqlite-vec** kvantlaşdırması **yalnız mühit vasitəsilə** konfiqurasiya edilir (DB parametri deyil): lokal vektorları
  `vec_quantize_int8(?, 'unit')` vasitəsilə `int8[dim]` sütunu kimi saxlamaq üçün
  `MEMORY_VEC_QUANTIZATION=int8` təyin edin. Seçilmiş rejim
  `embedding_signature` daxilinə (`:int8` suffiksi ilə) əlavə edilir, buna görə rejimlərin dəyişdirilməsi
  `vec_memories` cədvəlinin tam yenidən indekslənməsinə səbəb olur — bu, yerləşdirmə modeli
  dəyişdikdə istifadə olunan eyni tənbəl geriyə doldurma yoludur.

## Yaddaş Növləri

`MemoryType` (`src/lib/memory/types.ts`):

| Növ          | İstifadə məqsədi                                                                  |
| ------------ | --------------------------------------------------------------------------------- |
| `factual`    | Üstünlüklər, sabit istifadəçi faktları, davranış nümunələri                       |
| `episodic`   | Konkret ana bağlı qərarlar ("Postgres-i seçdim")                                  |
| `procedural` | İş axını / necə etməli yaddaşı (rezerv edilib; hazırda avtomatik çıxarıcı yoxdur) |
| `semantic`   | Vektor yaddaşı qeydləri üçün rezerv edilib                                        |

`MemoryConfig` üçün əldəetmə strategiyası `exact`, `semantic` və ya `hybrid`,
əhatə dairəsi isə `session`, `apiKey` və ya `global` variantlarından biridir.
`getMemorySettings()` tərəfindən qaytarılan standart əhatə dairəsi `apiKey`-dir.

## Faktların Çıxarılması (`extraction.ts`)

Çıxarılma LLM-əsaslı deyil, **requlyar ifadə əsaslıdır** — proses daxilində
`setImmediate()` ilə icra olunur, buna görə cavab axınını heç vaxt bloklamır:

- **Üstünlük nümunələri** → `MemoryType.FACTUAL`
  (məsələn, `Mən … üstün tuturam`, `Mən … çox xoşlayıram`, `ən sevdiyim …-dır`, `Mən … nifrət edirəm`)
- **Qərar nümunələri** → `MemoryType.EPISODIC`
  (məsələn, `Mən … istifadə edəcəyəm`, `Mən … seçdim`, `Mən … qərar verdim`, `Mən … qəbul edəcəyəm`)
- **Davranış nümunələri** → `MemoryType.FACTUAL`
  (məsələn, `Mən adətən …`, `Mən həmişə …`, `Mən … meylliyəm`)

Hər uyğunluq təmizlənir (`trim`, boşluqların birləşdirilməsi, maksimum 500 simvol),
sabit `factKey(category, content)` vasitəsilə paket daxilində dublikatlardan
təmizlənir və `{category, extractedAt, source: "llm_response"}` metadatası ilə
`createMemory()` vasitəsilə saxlanılır. Daxil edilən mətn 64 KiB
(`MAX_EXTRACTION_TEXT_LENGTH`) ilə məhdudlaşdırılır — daha uzun olduqda, ən son
assistent məzmununun həmişə iştirak etməsi üçün mətnin **son hissəsi** istifadə olunur.

`extractFactsFromText(text)` testlər üçün ixrac edilir və faktları saxlamadan
strukturlaşdırılmış formada qaytarır.

## Əldəetmə (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` əsas giriş nöqtəsidir. O:

1. Konfiqurasiyanı `MemoryConfigSchema` vasitəsilə normallaşdırır və doğrulayır.
2. `enabled` false olduqda və ya `maxTokens <= 0` olduqda dərhal `[]` qaytarır.
3. `maxTokens` dəyərini `[1, 8000]` aralığı ilə məhdudlaşdırır.
4. Köhnə verilənlər bazalarının işləməyə davam etməsi üçün müasir `memories`
   cədvəlinin mövcud olub-olmadığını (köhnə `memory` cədvəli ilə müqayisədə) müəyyən edir.
5. Bitmə vaxtı yoxlaması
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), istəyə bağlı
   sessiya əhatə dairəsi və istəyə bağlı `retentionDays` son tarixi ilə əsas sorğunu qurur.
6. Strategiyaya görə şaxələnir:
   - **`exact`** (standart): xronoloji `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: `config.query` verilibsə və `memory_fts` mövcuddursa,
     `memory_fts MATCH ?` ilə JOIN edir və FTS dərəcəsinə görə sıralayır; FTS
     0 sətir qaytardıqda xronoloji sıralamaya geri qayıdır.
   - **`hybrid`**: FTS nəticələrinin (daha yüksək uyğunluqla) və xronoloji
     dəstin birləşməsini yaradır, id üzrə dublikatları silir.
7. Sorğu təqdim edildikdə `content`, `key` və `metadata` JSON-u üzrə açar söz
   uyğunluğu balını (`getRelevanceScore`) hesablayır. Sıfır balı olan sətirlər
   filtrdən keçirilərək çıxarılır.
8. Əvvəl balın azalan sırası, sonra isə `createdAt` dəyərinin azalan sırası ilə çeşidləyir.
9. Sıralanmış siyahını nəzərdən keçirir və cari `estimateTokens(content)`
   (təxminən `length / 4`) büdcə daxilində qaldığı müddətdə qeydləri qəbul edir.
   Hər hansı uyğunluq olduqda həmişə ən azı bir qeyd qaytarır.

`estimateTokens` ixrac edilir və əldəetmə, xülasələşdirmə və MCP
`omniroute_memory_search` aləti tərəfindən istifadə olunur.

## İnjeksiya (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Bütün yaddaş məzmunlarını vahid `Memory context: …` sətrində birləşdirir.
2. Provayder adına əsasən strategiya seçir:
   - **Sistem mesajı** (OpenAI, Anthropic, Gemini və s. üçün standart) — istifadəçinin sistem göstərişlərinin yenə də üstünlük təşkil etməsi üçün mövcud sistem mesajlarından əvvəl
     `{role: "system", content: memoryText}` əlavə edir.
   - **İstifadəçi mesajı** (ehtiyat variant) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` siyahısındakı provayderlər üçün: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Bunlar sistem rolunu qəbul etmir
     və əks halda 400 xətası qaytarar (GLM/Zhipu üçün #1701 məsələsinə baxın).
3. Sayı, strategiyanı və modeli `memory.injection.injected` altında jurnala qeyd edir.

`providerSupportsSystemMessage(provider)` öz marşrutlaşdırma qərarlarını verməli olan çağıranlar üçün ixrac edilir. Təhlükəsizlik məqsədilə naməlum provayderlər üçün standart olaraq `true`
(sistem roluna icazə verilir) qəbul edilir.

## Parametrlər (`settings.ts`)

Yaddaş konfiqurasiyası mühit dəyişənlərində deyil, **DB parametrlər cədvəlində saxlanılır**.
`getMemorySettings()` məlumatları `getSettings()` vasitəsilə oxuyur və nəticəni
proses daxilində keşləyir; yazma əməliyyatlarından sonra parametrlərin PUT
marşrutu tərəfindən `invalidateMemorySettingsCache()` çağırılır.

### Köhnə sahələr (bütün versiyalar)

| DB açarı              | Tip     | Standart                                             | UI idarəetmə elementi                                           |
| --------------------- | ------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (v3.8.30-dan bəri standart olaraq sönülü)    | Yaddaşın yandırılması/söndürülməsi                              |
| `memoryMaxTokens`     | integer | `2000` (`0–16000` diapazonu)                         | İnjeksiya üçün token büdcəsi                                    |
| `memoryRetentionDays` | integer | `30` (`1–365` diapazonu)                             | Saxlanma müddəti                                                |
| `memoryStrategy`      | enum    | `"hybrid"` (`recent`, `semantic`, `hybrid`-dən biri) | Axtarış strategiyası                                            |
| `skillsEnabled`       | boolean | `false`                                              | Hər açar üzrə bacarıq injeksiyasını dəyişir (SKILLS.md-ə baxın) |

Qeyd: UI-dakı `"recent"` strategiyası `toMemoryRetrievalConfig()` vasitəsilə daxili `"exact"` axtarış
strategiyasına uyğunlaşdırılır (xronoloji ardıcıllıq).

### Yeni sahələr (v3.8.6, plan 21 D9)

Sahələrin təsvirləri üçün yuxarıdakı "Parametrlərin genişləndirilməsi" bölməsinə də baxın.

| DB açarı                    | API sahəsi               | Standart |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant ilə əlaqəli DB açarları (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, standart dəyəri `"omniroute_memory"` olan `qdrantCollection`,
standart dəyəri `"openai/text-embedding-3-small"` olan `qdrantEmbeddingModel`) `qdrant.ts` faylındakı
`normalizeQdrantConfig()` tərəfindən oxunur.

### Mühit dəyişənləri (v3.8.6)

Altı isteğe bağlı mühit dəyişəni mühərrikin icra zamanı davranışını tənzimləyir (`.env.example` faylında sənədləşdirilib):

| Dəyişən                         | Standart                   | Təsvir                                                                                                                                                                                   |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Embeddinq keşinin TTL-i (5 dəq)                                                                                                                                                          |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Embeddinq LRU keşindəki maksimum qeyd sayı                                                                                                                                               |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js modeli üçün HF repozitoriyası                                                                                                                                            |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Statik potion modeli üçün HF repozitoriyası                                                                                                                                              |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Endirilmiş modellərin saxlanacağı yer                                                                                                                                                    |
| `MEMORY_VEC_TOP_K`              | `20`                       | Vektor axtarışı üçün standart top-K                                                                                                                                                      |
| `MEMORY_RRF_K`                  | `60`                       | Hibrid axtarış üçün RRF k sabiti                                                                                                                                                         |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Lokal sqlite-vec vektorlarını kvantlaşdırılmış şəkildə saxlamaq üçün `int8` olaraq təyin edin (~4× daha kiçik; könüllü). Rejimin dəyişdirilməsi məcburi yenidən indeksləməyə səbəb olur. |

## Xülasələşdirmə (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` açarın yaddaşlarındakı cari tokenlərin ümumi sayı büdcəni aşdıqda köhnə məzmunu sıxlaşdırır. O, sətirləri `created_at` üzrə DESC qaydasında nəzərdən keçirir, limitə uyğun gələn sətirləri saxlayır və qalan sətirlərdəki `content` sahəsini orijinal mətnin ilk üç cümləsi ilə yerindəcə əvəz edir. `tokensSaved` köhnə və yeni məzmun üçün `estimateTokens` nəticələri arasındakı fərqdir.

Bu prosedur cari söhbət konveyerində **mövcuddur, lakin avtomatik çağırılmır** — davamlı sıxlaşdırmaya ehtiyacınız varsa, onu cron tapşırığından, administrator əməlindən və ya `MemoryConfig.autoSummarize` inteqrasiya kodundan çağırın. Məlumat itkisi birtərəflidir: orijinal mətnin üzərinə yazılır.

## REST API

Bütün son nöqtələr idarəetmə autentifikasiyası (`requireManagementAuth`) tələb edir.

### Əsas yaddaş son nöqtələri (mövcud + yenilənmiş)

| Metod    | Yol                  | Təsvir                                                                                                                                                                                          |
| -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Filtrlərlə səhifələnmiş siyahı: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Cavaba `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` daxildir               |
| `POST`   | `/api/memory`        | Qeyd yaradır (Zod ilə yoxlanılır: `content`, `key`, seçimli `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `(apiKeyId, key)` üzrə upsert edən `createMemory()` funksiyasını çağırır |
| `GET`    | `/api/memory/[id]`   | UUID üzrə tək bir qeydi əldə edir                                                                                                                                                               |
| `PUT`    | `/api/memory/[id]`   | Qeyd sahələrini (`type`, `key`, `content`, `metadata`) yeniləyir. Sorğu gövdəsi: `MemoryUpdatePutSchema`. Embeddinq mənbəyi mövcud olduqda vektoru da sinxronlaşdırır.                          |
| `DELETE` | `/api/memory/[id]`   | Qeydi silir; həmçinin `vec_memories` (D15) və mümkün olduğu təqdirdə Qdrant-dan silir. Qeyd olmadıqda 404 qaytarır.                                                                             |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` funksiyasını işə salır — yaratma→siyahılama→silmə tam dövrü. `{working, latencyMs, error?}` qaytarır                                                 |

### Yeni yaddaş mühərriki son nöqtələri (plan 21)

| Metod  | Yol                               | Təsvir                                                                                                                                                                                                           |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` funksiyasının sınaq icrası — xal, səviyyə və tokenlərlə sıralanmış nəticələri qaytarır. Sorğu gövdəsi: `RetrievePreviewSchema`. Yaddaşları yeritmir və ya dəyişdirmir.                        |
| `GET`  | `/api/memory/embedding-providers` | Embeddinq modelləri olan provayderləri siyahıya alır və hansılarında API açarının konfiqurasiya edildiyini göstərir.                                                                                             |
| `GET`  | `/api/memory/engine-status`       | Mühərrikin tam statusunu qaytarır: açar söz səviyyəsi, embeddinqin müəyyənləşdirilməsi, vektor anbarının statistikası, Qdrant vəziyyəti, yenidən sıralama konfiqurasiyası. Struktur: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Yaddaşın sıxlaşdırılmasını əl ilə başladır. Sorğu gövdəsi: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}` qaytarır.                                               |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` olan yaddaşlar üçün vektorların yenidən indekslənməsini başladır. Sorğu gövdəsi: `MemoryReindexSchema` (`force`). `{started, pending}` qaytarır.                                               |

### Parametrlər son nöqtələri

| Metod  | Yol                                     | Təsvir                                                                                                          |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | Cari normallaşdırılmış `MemorySettingsExtended` (7 yeni sahə + köhnə sahələr)                                   |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` daxilindəki istənilən sahəni yeniləyir (cəmi 12 sahə)                            |
| `GET`  | `/api/settings/qdrant`                  | Cari Qdrant parametrləri (`QdrantSettingsSchema`)                                                               |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant parametrlərini yeniləyir. Sorğu gövdəsi: `QdrantSettingsUpdateSchema`. `apiKey` = boş sətir açarı silir. |
| `GET`  | `/api/settings/qdrant/health`           | Konfiqurasiya edilmiş Qdrant instansiyasına qarşı işləkliyin yoxlanması. `QdrantHealthResultSchema` qaytarır.   |
| `POST` | `/api/settings/qdrant/search`           | Qdrant üzərində semantik axtarış testi. Sorğu gövdəsi: `QdrantSearchSchema` (`query`, `topK`).                  |
| `POST` | `/api/settings/qdrant/cleanup`          | Müddəti bitmiş / köhnə yaddaşlara aid Qdrant nöqtələrini silir.                                                 |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant üçün mövcud olan embeddinq modellərini siyahıya alır.                                                    |

`/api/memory` siyahı sorğusu həm `page` əsaslı səhifələməni (`parsePaginationParams`), **həm də** birbaşa `offset` parametrini dəstəkləyir — `offset` mövcud olduqda ona üstünlük verilir və cavab strukturu üçün törəmə `page` hesablanır.

## MCP Alətləri (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP serveri aktiv olduqda üç yaddaş aləti qeydiyyatdan keçirilir:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` funksiyasını əhatə edir. v3.8.6 (D16) versiyasından etibarən `strategy`
  `"exact"` olaraq sabit kodlaşdırılmaq əvəzinə `getMemorySettings()` funksiyasından
  oxunur. Əgər `query` təqdim edilibsə və `strategy` `semantic` və ya `hybrid` olarsa,
  əlçatan olduqda vektor yaddaşından istifadə edilir.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` funksiyasını əhatə edir. Yalnız 4 kanonik növü qəbul edir:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → uyğun
  qeydləri siyahıya alır, istəyə bağlı olaraq yaradılma tarixi göstərilən vaxtdan əvvəl olanları filtrləyir, sonra hər birini
  `deleteMemory()` vasitəsilə silir (bu funksiya vektorları sqlite-vec + Qdrant-dan da silir).

Nəqliyyat və əhatə dairəsi təfərrüatları üçün [MCP-SERVER.md](./MCP-SERVER.md) sənədinə baxın.

## İdarəetmə Paneli (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` indi **3 tablı Studiyadır**:

### Tab: Yaddaşlar

- Konsepsiya kartı (yığıla bilən "Necə işləyir" izahı).
- Real vaxt rejimində siyahı, axtarış və səhifələmə (300 ms gecikdirmə ilə).
- Növ filtri (`factual` / `episodic` / `procedural` / `semantic` / hamısı).
- Yaddaş əlavə etmə modal pəncərəsi (açar, məzmun, növ).
- Sətirdaxili redaktə (karandaş düyməsi → `PUT /api/memory/[id]`).
- Hər sətir üzrə silmə (təsdiq dialoqu ilə).
- Cari səhifənin JSON ixracı; fayl seçicisi vasitəsilə JSON idxalı.
- Statistika kartları: `totalEntries`, `tokensUsed`, `hitRate`.
- "Köhnələri yığcamlaşdır" düyməsi → `POST /api/memory/summarize` (əvvəlcə quru sınaq
  namizədlərin sayını göstərir, sonra təsdiq istəyir).
- `GET /api/memory/health` tərəfindən idarə olunan yaşıl/qırmızı sağlamlıq göstəricisi.

### Tab: Sınaq Meydançası

- Sorğu girişi + strategiya seçicisi (Dəqiq / Semantik / Hibrid) + token büdcəsi.
- "Simulyasiya et" → `POST /api/memory/retrieve-preview` — sıralanmış nəticələri
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore` ilə göstərir.
- Hansı embedding mənbəyindən / vektor yaddaşından istifadə edildiyini və
  ehtiyat varianta keçidin baş verib-vermədiyini göstərən həll paneli.

### Tab: Mühərrik

- Mühərrik status paneli (açar söz FTS5 nişanı, embedding nişanı, vektor yaddaşı nişanı,
  Qdrant sağlamlıq nişanı, yenidən sıralama nişanı).
- "İndi yenidən indekslə" düyməsi → `POST /api/memory/reindex`.
- Embedding mənbəyi seçicisi (avtomatik / uzaq / statik / transformerlər + keçidlər).
- Qdrant konfiqurasiya kartı (aktivləşdirmə keçidi, host/port/kolleksiya/açar, bağlantı testi,
  semantik axtarış testi, təmizləmə).
- Yenidən sıralama konfiqurasiya kartı (aktivləşdirmə keçidi, provayder/model seçicisi).

Yaddaş və Qdrant parametrləri köhnə/qlobal parametrlər interfeysi üçün həmçinin
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) bölməsində
yerləşir.

## Keşləmə

`src/lib/memory/store.ts`, `getMemory(id)` oxumaları üçün prosesdaxili LRU-oxşar keş
(`MEMORY_CACHE_TTL = 1 dəq`, `MEMORY_MAX_CACHE_SIZE = 500`, ən köhnə qeydlərin 20 %-nin
çıxarılması ilə), həmçinin öz əhatə dairəsinə malik keş istəyən çağırıcılar tərəfindən istifadə olunan
`get`/`set`/`invalidate` metodlarına malik ümumi açar/dəyər `memoryCache` qatını
(`src/lib/memory/cache.ts`) saxlayır (1 000 qeyddən ibarət LRU, standart TTL 5 dəq).

## Məxfilik və Həyat Dövrü

- Yaddaşın sahibi API açarı identifikatorudur (`chatCore.ts` daxilində
  `resolveMemoryOwnerId`). `apiKeyInfo.id` olmadan nə axtarış, nə daxiletmə,
  nə də çıxarış işə düşür.
- Gələcək tarixli `expires_at` dəyərinə malik qeydlər axtarış nəticələrindən süzülür;
  `retentionDays` müddətini aşan köhnə qeydlər isə `retrieveMemories` daxilindəki
  `created_at >= cutoff` şərti ilə istisna edilir.
- Birdəfəlik silmə üçün `DELETE /api/memory/[id]` və ya `omniroute_memory_clear` istifadə edin.
- Çıxarış `setImmediate` vasitəsilə başladılıb gözlənilmir; xətalar
  `memory.extraction.background.failed` altında jurnala yazılır və heç vaxt çağırana ötürülmür.
- Yoxlama gediş-gəlişləri (`verifyExtractionPipeline`) öz sınaq qeydlərini
  `finally` bloku daxilində təmizləyir.

## Həmçinin Baxın

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` parametri alət
  təriflərini yaddaşla birlikdə daxil edir.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP nəqli / əhatə dairələri.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — daha geniş API səthi.
- Mənbə modulları:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hibrid RRF
  - `src/lib/memory/embedding/index.ts` — çoxmənbəli vektorlaşdırma qatı
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — bütün yaddaş API sorğu gövdələri üçün Zod sxemləri
  - `src/shared/schemas/qdrant.ts` — Qdrant parametrləri/əməliyyatları üçün Zod sxemləri
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` üçün CRUD
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
  - `src/app/api/settings/qdrant/route.ts` + alt marşrutlar
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (səhifə + komponentlər +
    tablar + hook-lar)
  - `open-sse/handlers/chatCore.ts` (daxiletmə / çıxarış inteqrasiyası)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Vektorlaşdırma Təminatçısının Seçilməsi (v3.8.16+)

OmniRoute-un yaddaş mühərriki **dörd vektorlaşdırma mənbəyini** (`src/lib/memory/embedding/`) dəstəkləyir. Onların hər biri **gecikmə, xərc, model keyfiyyəti və quraşdırma mürəkkəbliyi** baxımından fərqli kompromislərə malikdir.

### Vektorlaşdırma Mənbələri

| Təminatçı      | Mənbə                                          | Gecikmə                                    | Xərc                | Keyfiyyət                                   | Quraşdırma                                 |
| -------------- | ---------------------------------------------- | ------------------------------------------ | ------------------- | ------------------------------------------- | ------------------------------------------ |
| `transformers` | Lokal ONNX modeli (Xenova/all-MiniLM-L6-v2)    | ~50-150ms (CPU)                            | Pulsuz              | Yaxşı                                       | Yalnız `npm install`                       |
| `static`       | Əvvəlcədən hesablanmış vektorlar (keşlənmiş)   | <1ms                                       | Pulsuz              | Tətbiq edilmir (keş uyğunluğundan asılıdır) | Yoxdur                                     |
| `remote`       | OpenAI / Cohere / Voyage API                   | ~100-300ms                                 | $0.02-0.10/1M token | Əla                                         | API açarı                                  |
| `auto`         | İcra zamanı ən yaxşı mövcud mənbəni seçir      | Seçilmiş mənbə ilə eyni                    | Pulsuz              | Seçilmiş mənbə ilə eyni                     | Yoxdur                                     |
| _(keş)_        | İstənilən mənbə üzərində yaddaşdaxili LRU qatı | <1ms (uyğunluq), tam gecikmə (uyğunsuzluq) | Pulsuz              | Əsas mənbə ilə eyni                         | Həmişə aktivdir (seçilə bilən mənbə deyil) |

### Qərar Ağacı

```
                  Yerləşdirmə mühitiniz necədir?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/SINAQ   KİÇİK PROD   BÖYÜK PROD    EDGE / OFLAYN
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (pulsuz, API-siz)          (ən yaxşı keyfiyyət) (internetsiz)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            HƏMİŞƏ üzərinə `cache` qatı əlavə edin
            (LruCache istənilən təminatçını əhatə edir)
```

### Verilənlər Bazası və API Konfiqurasiyası

Yaddaşın vektorlaşdırma seçimləri mühit dəyişənləri ilə deyil, Parametrlər API/UI vasitəsilə konfiqurasiya edilir. Parametrlər bölməsindəki müvafiq verilənlər bazası açarları (`src/lib/memory/settings.ts` daxilində `normalizeMemorySettings`) bunlardır:

- `memoryEmbeddingSource`: `"transformers"` (lokal), `"remote"` (API əsaslı, məsələn, OpenAI), `"static"` (xarici saxlanc) və ya `"auto"`
- `memoryEmbeddingProviderModel`: Uzaq/statik mənbələr üçün model identifikatoru (məsələn, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` və ya `"auto"`

#### Lokal Model (`transformers`)

Lokal modelləri işə salmaq üçün daxildə transformers.js istifadə edir:

```bash
# Kodda oxunan mühit dəyişənləri (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF model repozitoriyası
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF statik potion modeli
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Keş qovluğu
```

#### LRU Vektorlaşdırma Keşi

Keş standart olaraq həmişə aktivdir və mühit dəyişənləri vasitəsilə konfiqurasiya edilir:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Keşlənmiş elementlərin maksimum sayı
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 dəq)
```

### Məhsuldarlıq Göstəriciləri

Tipik 4 nüvəli x86 serverində performans testi (hər mətn ~100 token):

| Provayder            | p50   | p95   | p99   | 1M embedding üçün xərc             |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Pulsuz                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant hostinqindən asılıdır       |
| `cache` (uyğunluq)   | <1ms  | <1ms  | 2ms   | Pulsuz                             |

---

## Faktların Çıxarılması Nümunələri (v3.8.16+)

`extraction.ts` modulu (`src/lib/memory/extraction.ts`) söhbət mesajlarından strukturlaşdırılmış faktları çıxarmaq üçün **müntəzəm ifadə nümunələrinin uyğunlaşdırılmasından** istifadə edir. Bu nümunələri anlamaq istifadə ssenariniz üçün çıxarılma keyfiyyətini tənzimləməyə kömək edir.

### Standart Nümunə Kateqoriyaları

| Kateqoriya          | Nümunə ifadə                                                                               | Çıxarılan məlumat               |
| ------------------- | ------------------------------------------------------------------------------------------ | ------------------------------- |
| PREFERENCE_PATTERNS | `"Mən <X>-ə üstünlük verirəm"`, `"Mən <X>-i sevirəm"`, `"Mən <X>-ə nifrət edirəm"`         | İstifadəçi seçimləri            |
| DECISION_PATTERNS   | `"Mən <X>-dən istifadə edəcəyəm"`, `"Mən <X> etmək qərarına gəldim"`, `"Mən <X>-i seçdim"` | İstifadəçi qərarları (epizodik) |
| PATTERN_PATTERNS    | `"Mən adətən <X> edirəm"`, `"Mən həmişə <X> edirəm"`, `"Mən heç vaxt <X> etmirəm"`         | Davamlı davranış nümunələri     |

### Nümunə İfadələr (Sadələşdirilmiş)

```ts
// src/lib/memory/extraction.ts faylından
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

### Nələr Çıxarılır

İstifadəçi belə dedikdə:

> "Mən TypeScript-ə üstünlük verirəm. Bu layihə üçün Postgres-dən istifadə edəcəyəm. Mən həmişə göndərmədən əvvəl commit edirəm. Python-u sevmirəm."
> Çıxarılma nəticəsində 4 yaddaş qeydi yaradılır:
>
> | Açar                                 | Kateqoriya | Növ      | Məzmun                     |
> | ------------------------------------ | ---------- | -------- | -------------------------- |
> | `preference:typescript`              | seçim      | faktiki  | "TypeScript"               |
> | `decision:postgres_for_this_project` | qərar      | epizodik | "Bu layihə üçün Postgres"  |
> | `pattern:commit_before_pushing`      | nümunə     | faktiki  | "göndərmədən əvvəl commit" |
> | `preference:python`                  | seçim      | faktiki  | "Python"                   |

### Çıxarılma Məhdudiyyətləri

Nəzarətsiz çıxarılmanın qarşısını almaq üçün aşağıdakı məhdudiyyətlər tətbiq olunur:

| Minimum məzmun uzunluğu | 3 simvol |
| Maksimum məzmun uzunluğu | 500 simvol |

### Çıxarılmanı Nə Zaman Deaktiv Etmək Lazımdır

Yaddaş aktiv olduqda çıxarılma avtomatik olaraq işə salınır; yalnız çıxarılma üçün ayrıca keçid yoxdur. Onu söndürmək üçün yaddaşı tamamilə deaktiv edin (`enabled: false`
dəyərini `PUT /api/settings/memory` vasitəsilə təyin edin). Aşağıdakı hallarda bunu etməyi nəzərdən keçirin:

- Mesaj həcminiz yüksəkdirsə və çıxarılma xərci əhəmiyyətlidirsə
- Söhbətləriniz əsasən müvəqqətidirsə (çat, sazlama) və uzunmüddətli dəyəri yoxdursa
- Konteksti artıq xüsusi plaginlər vasitəsilə toplayırsınızsa

---

## Hibrid RRF Tənzimlənməsi (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** alqoritmi FTS5 (açar söz) və vektor (semantik) nəticələrini birləşdirir. `k` parametri daha aşağı sıralanmış nəticələrə nə qədər çəki verildiyini idarə edir.

### Düstur

Hər namizəd yaddaş qeydi üçün RRF balı belədir:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Burada:

- `k` sabitdir (standart olaraq 60)
- `rank_i(d)` sənəd `d`-nin i-ci axtarış sistemindəki (FTS, vektor) sırasıdır
- Cəm bütün axtarış sistemləri üzrə hesablanır

### `k` Nəticələrə Necə Təsir Edir

| `k` dəyəri            | Təsir                                                                                                 | Ən uyğun istifadə sahəsi              |
| --------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `k=0`                 | Saf sıralama birləşdirməsi (hamarlama olmadan)                                                        | Nəzəri başlanğıc göstəricisi          |
| `k=10-30`             | Ən yuxarı nəticələrə yüksək çəki verir, aşağı sıralar çox az töhfə verir                              | İlk 3 nəticə adətən düzgün olduqda    |
| **`k=60`** (standart) | Balanslaşdırılmışdır — ilk 10 nəticənin hamısı əhəmiyyətli töhfə verir                                | Ümumi təyinatlı axtarış               |
| `k=100+`              | Daha bərabərdir — bir neçə sistemdə göründükdə hətta aşağı sıralı nəticələr üstünlük təşkil edə bilər | Tamlıq dəqiqlikdən daha vacib olduqda |

### `k` Dəyərinin Praktikada Tənzimlənməsi

```bash
# Standart
MEMORY_RRF_K=60

# Aqressiv dəqiqlik (kiçik yaddaş, az sayda sənəd)
MEMORY_RRF_K=20

# Maksimum tamlıq (böyük yaddaş, müxtəlif sorğular)
MEMORY_RRF_K=120
```

**`k=20` ilə nümunə:**

- FTS sırası 1 → töhfə `1/21 = 0.048`
- FTS sırası 10 → töhfə `1/30 = 0.033`
- Vektor sırası 1 → töhfə `0.048`
- Birləşdirilmiş maksimum: `0.096`

**`k=60` ilə nümunə:**

- FTS sırası 1 → töhfə `1/61 = 0.016`
- FTS sırası 10 → töhfə `1/70 = 0.014`
- Vektor sırası 1 → töhfə `0.016`
- Birləşdirilmiş maksimum: `0.033`

Daha yüksək `k` ilə ilk sıradakı nəticə və 10-cu sıradakı nəticə arasındakı **nisbi fərq** daha kiçik olur, buna görə alqoritm ən yüksək sıra etibarlılığından daha çox **axtarış sistemləri arasındakı konsensusa** əsaslanır.

### `k` Dəyərini Nə Zaman Dəyişmək Lazımdır

| Əlamət                                               | Sınaqdan keçirin                                                                          |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Ən yuxarı nəticə həmişə qalib gəlir, lakin yanlışdır | **Daha aşağı** k (məsələn, 20) — yüksək sıra etibarlılığı daha vacibdir                   |
| Düzgün cavab ilk 5-likdədir, lakin birinci deyil     | **Daha yüksək** k (məsələn, 100) — daha bərabər qiymətləndirmə konsensusu mükafatlandırır |
| Tamlıq yüksəkdir, lakin dəqiqlik aşağıdır            | **Daha aşağı** k — sıralamanı dəqiqləşdirin                                               |
| Tamlıq aşağıdır (uyğun sənədlər buraxılır)           | **Daha yüksək** k — aşağı sıralı sənədlərə fürsət verin                                   |

### RRF Çəkiləndirilməsi

Qarşılıqlı sıralama birləşdirməsi semantik vektor sırası və tam mətn axtarışı sırası üçün bərabər çəkilərdən istifadə edir:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Fərdi çəkiləri tənzimləmək üçün mühit dəyişənləri yoxdur (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` mövcud deyil).

---

## Xülasələşdirmə Strategiyası (v3.8.16+)

`summarization.ts` modulu (`src/lib/memory/summarization.ts`) geri çağırma imkanını qoruyaraq aktiv dəsti kiçik saxlamaq üçün köhnə yaddaşları sıxlaşdırır.

### Xülasələşdirmə Nə Zaman İşə Düşür

| Tətikləyici                    | Hədd (standart) |
| ------------------------------ | --------------- |
| API vasitəsilə əl ilə işəsalma | tətbiq edilmir  |

### Nələr Xülasələşdirilir

`summarization.ts` faylından iki giriş nöqtəsi ixrac edilir:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — sessiyanın
  yaddaşlarını token büdcəsi ilə məhdudlaşdırılan vahid xülasə mətninə sıxlaşdırır.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API tərəfindən istifadə
  edilən yaş əsaslı sıxlaşdırmadır: `days` günündən köhnə bütün yaddaşları seçir,
  onlardan vahid sıxlaşdırılmış xülasə yaddaşı yaradır və (`dryRun` `false` olduqda)
  orijinalları silir. Heç nəyi dəyişdirmədən namizəd dəstinə və ümumi token sayına
  önbaxış etmək üçün `dryRun: true` ötürün.

Teq/açar üzrə klasterləşdirmə mərhələsi və ya hər yaddaş üçün "əsas və ya xülasələşdirilə bilən" qiymətləndirməsi yoxdur —
seçim yalnız yaş həddinə əsaslanır və xülasə mətni hər namizəd üçün növ prefiksli,
sıxlaşdırılmış sətirdən ibarətdir.

### Xülasələşdirmənin İşə Salınması

Xülasələşdirmə **əl ilə / seçim əsasında** aparılır — `autoSummarize` ayarı standart
olaraq `false`-dur, buna görə heç nə avtomatik sıxlaşdırılmır. Onu API vasitəsilə işə salın:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Onu söndürülmüş saxlamaq üçün sadəcə `autoSummarize` ayarını standart dəyərində (`false`) saxlayın.

### Xülasələşdirmə Keyfiyyəti Üçün Məsləhətlər

- **Əvvəlcə `dryRun` ilə önbaxış edin** — `summarizeMemoriesOlderThan(..., true)`
  namizəd siyahısını və ümumi token sayını qaytarır ki, orijinalları silməzdən əvvəl
  nələrin birləşdiriləcəyini təsdiqləyə biləsiniz.
- **Böyük yaddaş korpusunuz varsa, xülasələşdirməni trafikin az olduğu saatlarda icra edin** — LLM çağırışı prosesin yavaş hissəsidir

```bash
# Cron üslubunda: hər gün saat 03:00-da xülasələşdir
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend Provayder Nümunəsi

> **Həqiqətin əsas mənbəyi:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Testlər:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend provayder nümunəsi mövcud yaddaş mühərriki üzərində **qoşula bilən backend abstraksiya qatı** təqdim edir. Yaddaş sistemi artıq vahid saxlama reallaşdırmasına bağlı olmaq əvəzinə, konfiqurasiya edilə bilən əsas/ehtiyat marşrutlaşdırma ilə çoxsaylı backend-ləri (SQLite, Obsidian, Notion, xüsusi HTTP backend-ləri) dəstəkləyir.

### Arxitektura

```
┌──────────────────────────────────────────────────────────┐
│                    API Marşrutları                        │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           Singleton koordinator (manager.ts)              │
│                                                          │
│  Əsas ─────► Backend A  (məs. SQLite)                    │
│  Ehtiyat ──► Backend B  (məs. Obsidian)                  │
│              Backend C  (məs. GenericBackend ilə Notion)  │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend-i  │ │ Backend-i  │ │ Backend-i (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Əsas İnterfeys (`backend.ts`)

Hər backend `MemoryBackend` interfeysini reallaşdırmalıdır:

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

  // Axtarış
  search(config: SearchConfig): Promise<Memory[]>;

  // Sağlamlıq
  health(): Promise<HealthCheckResult>;

  // Həyat dövrü (ixtiyari)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Aşağıdakıları yerinə yetirən singleton koordinator:

- Backend-ləri `register(backend)` vasitəsilə **qeydiyyatdan keçirir** — başlanğıcda `index.ts` faylından çağırılır
- Əsas + ehtiyat backend-ləri `configure(primary, fallbacks)` vasitəsilə **konfiqurasiya edir**
- CRUD/axtarış əməliyyatlarını əsas backend-ə **yönləndirir**, xəta zamanı ehtiyat zəncirindən istifadə edir
- Bütün backend-lərin **sağlamlığını** müntəzəm olaraq yoxlayır

**Ehtiyat mexanizminin davranışı:**

| Əməliyyat | Əsas                  | Ehtiyatlar                                    |
| --------- | --------------------- | --------------------------------------------- |
| `create`  | ✅ Yalnız əsas        | ❌                                            |
| `get`     | ✅ Əvvəlcə əsası sına | ✅ Nəticə null olarsa, ehtiyatdan istifadə et |
| `update`  | ✅ Yalnız əsas        | ✅ Gözləmədən sinxronlaşdır                   |
| `delete`  | ✅ Yalnız əsas        | ✅ Gözləmədən sinxronlaşdır                   |
| `list`    | ✅ Yalnız əsas        | ❌                                            |
| `search`  | ✅ Əvvəlcə əsas       | ✅ Xəta zamanı ehtiyatdan istifadə et         |

#### GenericMemoryBackend (`genericBackend.ts`)

İstənilən REST API-ni MemoryBackend-ə uyğunlaşdıran ümumi HTTP konnektoru. Aşağıdakılar üçün faydalıdır:

- **Notion** — Notion API vasitəsilə qoşulun
- **Obsidian** — Obsidian Local REST API vasitəsilə qoşulun
- **Xüsusi backend-lər** — RESTful yaddaş API-si təqdim edən istənilən xidmət

**Konfiqurasiya:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Backend API-sinin baza URL-i
  apiKey?: string;           // Autentifikasiya üçün Bearer tokeni
  headers?: Record<string, string>;  // Fərdi HTTP başlıqları
  timeout?: number;          // Sorğu vaxt limiti (standart: 30000ms)
  backendType?: string;      // Jurnallaşdırma üçün

  // Endpoint əvəzləmələri (standart dəyərlər REST konvensiyalarından istifadə edir)
  endpoints?: {
    search?: string;   // standart: "/memories/search"
    create?: string;   // standart: "/memories"
    list?: string;     // standart: "/memories"
    get?: string;      // standart: "/memories/{id}"
    update?: string;   // standart: "/memories/{id}"
    delete?: string;   // standart: "/memories/{id}"
    health?: string;   // standart: "/health"
  };

  // Sorğu parametr adlarının uyğunlaşdırılması
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Yol parametr adlarının uyğunlaşdırılması
  pathParams?: {
    id?/memoryId?
  };
}
```

**Məlum backend-lər** `KNOWN_BACKENDS` daxilində əvvəlcədən konfiqurasiya edilib:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 ünvanına yönəldilmiş GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 ünvanına yönəldilmiş GenericMemoryBackend
```

#### Daxili backend-lər

##### SQLiteBackend (`sqliteBackend.ts`)

Standart əsas backend. `src/lib/memory/store.ts` vasitəsilə mövcud SQLite əsaslı yaddaş anbarını əhatə edir. Yüklənmə zamanı avtomatik qeydiyyata alınır.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Mövcud Obsidian inteqrasiyasını (`src/lib/memory/obsidianBackend.ts`) əhatə edir. Obsidian Local REST API vasitəsilə Obsidian anbarına qoşulur.

### Parametrlər

Yaddaş backend-i parametrləri tətbiqin parametrlər cədvəlində saxlanılır və `src/lib/memory/settings.ts` vasitəsilə idarə olunur:

| Parametr                  | Mühit/Konfiqurasiya açarı | Standart   | Təsvir                                      |
| ------------------------- | ------------------------- | ---------- | ------------------------------------------- |
| Əsas backend              | `memoryPrimaryBackend`    | `"sqlite"` | Əsas backend-in ID-si                       |
| Ehtiyat backend-lər       | `memoryFallbackBackends`  | `[]`       | Sıralanmış ehtiyat backend ID-ləri          |
| Backend konfiqurasiyaları | `memoryBackendConfigs`    | `{}`       | Hər backend üçün konfiqurasiya əvəzləmələri |

Parametrlər `normalizeMemorySettings()` vasitəsilə normallaşdırılır və `getMemorySettings()` daxilində keşlənir.

### İlkinləşdirmə axını

```
Tətbiqin ilkin yüklənməsi
  → index.ts importları (yan təsir): SQLiteBackend-i qeydiyyata alır
  → initMemoryBackends() tətbiqin həyat dövründən çağırılır:
      1. Parametrləri yüklə (getMemorySettings)
      2. Əsas və ehtiyat backend-ləri konfiqurasiya et
      3. Bütün backend-ləri ilkinləşdir (sağlamlıq yoxlaması)
      4. Sorğular üçün hazırdır
```

### Yeni backend əlavə etmək

1. `src/lib/memory/<name>Backend.ts` daxilində **`MemoryBackend` interfeysini tətbiq edin**
2. `src/lib/memory/index.ts` faylından **ixrac edin**
3. Yüklənmə zamanı `memoryManager.register(yourBackend)` ilə **qeydiyyata alın**
4. Parametrlər vasitəsilə **konfiqurasiya edin**: `memoryPrimaryBackend` dəyərini backend ID-nizə təyin edin
5. `src/lib/memory/__tests__/generic-backend.test.ts` faylından istinad kimi istifadə edərək **sınaqdan keçirin**

#### Nümunə: Brain backend-i

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

### Yoxlama

#### Vahid testləri

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Gözlənilən nəticə: aşağıdakıları əhatə edən **35 test, hamısı uğurla keçir**:

- Konstruktor (2)
- Sağlamlıq yoxlaması (4) — uğur, 500 xətası, şəbəkə xətası, gecikmə
- İlkinləşdirmə (2) — uğur, uğursuzluq
- Yaratma (2) — standart endpoint, fərdi endpoint
- Əldə etmə (4) — uğur, 404 → null, 404-dən fərqli xəta atılması, fərdi yol parametrləri
- Yeniləmə (2) — uğur, 404 → false
- Silmə (2) — uğur, 404 → false
- Siyahılama (2) — sorğu parametrləri, fərdi parametr adları
- Axtarış (3) — sorğu parametrləri, fərdi endpoint, seçimlərin seriallaşdırılması
- Autentifikasiya başlıqları (2) — Bearer tokeni, fərdi başlıqlar
- Fabrik (1)

#### Tip yoxlaması

```bash
npm run typecheck:core
```

Gözlənilən nəticə: **0 xəta**.
