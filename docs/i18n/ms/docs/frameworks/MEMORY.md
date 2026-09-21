# Memory System (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Sumber rujukan utama:** `src/lib/memory/` dan `src/app/api/memory/`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40 (dimatikan secara lalai + penyelarasan pengkuantuman int8)

OmniRoute menyediakan ingatan perbualan berterusan yang dikunci mengikut kunci API (dan
ID sesi secara pilihan). Ingatan diekstrak secara automatik daripada respons LLM
melalui pemadanan corak regex yang ringan dan disuntik semula ke dalam permintaan
seterusnya sebagai mesej sistem pembuka (atau mesej pengguna pertama untuk penyedia yang
menolak peranan sistem).

> **Ingatan DIMATIKAN secara lalai (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> kini ialah `false` (`src/lib/memory/settings.ts`). Pengaktifan ingatan menyuntik sehingga
> `maxTokens` (~2k) konteks yang diperoleh semula ke dalam **setiap** permintaan sembang, yang
> dikenakan bayaran — kos yang tidak dijangka untuk pemasangan baharu dan klien yang mengurus
> konteks mereka sendiri. Aktifkan secara jelas di bawah **Tetapan → Ingatan** (
> `MemorySkillsTab` memaparkan petak amaran kos token apabila ingatan diaktifkan).
> Klien boleh mengecualikan satu permintaan dengan pengepala permintaan
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — lihat jadual pengepala permintaan dalam
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Permintaan tanpa ingatan menetapkan
> `memoryOwnerId = null`, yang menyahdayakan **kedua-dua** penyuntikan ingatan dan kemahiran untuk
> permintaan tersebut (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Ingatan **diskopkan mengikut kunci API**, bukan mengikut pengguna — setiap permintaan yang disahkan
dengan kunci API yang sama berkongsi himpunan ingatan yang sama, dengan pengskopan lanjut secara pilihan
mengikut `sessionId`.

## Seni bina

```
Klien → /v1/chat/completions (apiKeyInfo diselesaikan di huluan)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # mengekstrak ID
    → getMemorySettings()                     # tetapan dicache
    → shouldInjectMemory(body, {enabled})     # get
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vektor pilihan
    → injectMemory(body, memories, provider)  # mesej sistem atau pengguna
  → panggilan penyedia huluan
  → apabila respons diterima: extractFacts(text, apiKeyId, sessionId)  # tanpa sekatan
    → setImmediate → createMemory(fact) bagi setiap padanan
                   → embed(content) + upsertVector(id, vec)
```

Tapak panggilan penyuntikan dan pengekstrakan disambungkan dalam
`open-sse/handlers/chatCore.ts` (cari `retrieveMemories`, `injectMemory`,
dan `extractFacts`).

## Seni bina enjin (penyelesaian 3 peringkat)

Enjin Ingatan menentukan laluan pemerolehan semula pada masa jalan berdasarkan
infrastruktur dan tetapan yang tersedia. Terdapat tiga peringkat, digunakan mengikut keutamaan:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  PERINGKAT 0 — Kata kunci (FTS5)                            │
  │  Ketersediaan berasaskan prob: FTS5 apabila binaan SQLite   │
  │  menyokongnya (better-sqlite3 / node:sqlite / bun:sqlite);  │
  │  tidak tersedia pada binaan tanpa FTS5 (cth. sql.js/WASM —  │
  │  "no such module: fts5"). Digunakan apabila strategy =      │
  │  "exact" atau sebagai sandaran; kata kunci status enjin     │
  │  mencerminkan hasil prob.                                   │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  PERINGKAT 1 — Vektor Terbenam (sqlite-vec)                 │
  │  sqlite-vec v0.1.9 dimuatkan melalui db.loadExtension().    │
  │  KNN daya kasar ke atas vektor Float32. Aktif apabila:       │
  │   • sqlite-vec loadExtension berjaya                         │
  │   • Sumber pembenaman tersedia (remote | static |           │
  │     transformers) yang boleh menghasilkan Float32Array      │
  │   • Jadual vec_memories wujud (dicipta ketika ready()       │
  │     pertama)                                                 │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  PERINGKAT 2 — Qdrant (pangkalan data vektor luaran pilihan)│
  │  Apabila diaktifkan, menggantikan sqlite-vec untuk           │
  │  semantik/hibrid. Memerlukan tika Qdrant yang sedang berjalan│
  │  + hos/port yang dikonfigurasikan.                           │
  └─────────────────────────────────────────────────────────────┘
```

Penyusutan berlaku secara automatik dan telus:

- Jika sqlite-vec gagal dimuatkan, peringkat 1 tidak tersedia → kembali kepada peringkat 0.
- Jika sumber pembenaman mengembalikan ralat, peringkat 1 kembali kepada peringkat 0.
- Jika Qdrant tidak sihat, peringkat 2 kembali kepada peringkat 1 (atau peringkat 0 jika peringkat 1
  juga tidak tersedia).

## Sumber pembenaman

Lapisan pembenaman (`src/lib/memory/embedding/`) menentukan sumber yang akan digunakan
berdasarkan `MemorySettingsExtended.embeddingSource`:

| Sumber         | Penerangan                                                                               | Kunci diperlukan | Permulaan sejuk  |
| -------------- | ---------------------------------------------------------------------------------------- | ---------------- | ---------------- |
| `remote`       | Menggunakan API pembenaman penyedia yang dikonfigurasikan (OpenAI, Cohere, dll.)         | Ya               | Tiada            |
| `static`       | Pembenaman jadual carian setempat melalui `potion-base-8M` (WordPiece + pengumpulan min) | Tidak            | ~200ms           |
| `transformers` | Inferens ONNX setempat melalui `@huggingface/transformers` v4, `all-MiniLM-L6-v2`        | Tidak            | ~3s + ~400MB RAM |
| `auto`         | Penentuan masa jalan: jauh (jika kunci wujud) → statik → transformers → null             | Bergantung       | Bergantung       |

**Turutan penentuan untuk `auto`:**

1. Cari penyedia pertama dalam `listEmbeddingProviders()` dengan `hasKey === true` → `remote`.
2. Jika `settings.staticEnabled === true` → `static`.
3. Jika `settings.transformersEnabled === true` → `transformers`.
4. Jika tidak → `null` (diturunkan kepada carian kata kunci FTS5).

Cache pembenaman (`src/lib/memory/embedding/cache.ts`) menggunakan peta LRU dalam memori
yang dikunci dengan `${source}:${model}:${dim}:${sha256(text)}`, dihadkan kepada
`MEMORY_EMBEDDING_CACHE_MAX` entri (lalai 1000) dengan TTL selama
`MEMORY_EMBEDDING_CACHE_TTL_MS` (lalai 5 minit). Dikongsi antara semua pemanggil
sepanjang kitar hayat setiap proses.

## RRF hibrid (k=60)

Apabila `strategy = "hybrid"` dan stor vektor tersedia, pengambilan menggunakan
Reciprocal Rank Fusion untuk menggabungkan hasil FTS5 dan vektor:

```
RRF(d) = Σ  1 / (k + rank_i(d))      dengan k = 60 (boleh dikonfigurasikan melalui MEMORY_RRF_K)
          i
```

Secara khusus:

1. Jalankan carian FTS5 → senarai berperingkat `R_fts` (kedudukan 1..N).
2. Jalankan carian vektor KNN → senarai berperingkat `R_vec` (kedudukan 1..M).
3. Untuk setiap `memoryId` unik:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 jika tiada dalam senarai).
4. Isih mengikut `rrf_score` secara menurun, kemudian gunakan penelusuran belanjawan token.

RRF diketahui berkesan tanpa memerlukan penormalan skor merentas
sistem pengambilan heterogen. `k=60` lalai berasal daripada makalah asal
Cormack et al. dan berfungsi dengan baik untuk korpus kecil (<10k memori).

## Pengisian semula (malas + pengindeksan semula)

Apabila model pembenaman berubah (dikesan melalui `embedding_signature`), stor
vektor dibina semula dan semua memori sedia ada ditandakan sebagai
`needs_reindex = 1` dalam jadual `memories`.

**Pengisian semula malas**: Pada pengambilan seterusnya, sebarang memori yang tiada entri vektor akan
dibenamkan dan dimasukkan ke dalam `vec_memories` sebelum carian dijalankan. Ini
melunaskan kos pengisian semula merentas permintaan sebenar tanpa menyekat permulaan.

**Pengindeksan semula eksplisit**: Tab Enjin dalam `/dashboard/memory` menyediakan butang
"Indeks Semula Sekarang" yang memanggil `POST /api/memory/reindex`. Pengendali memanggil
`runReindexBatch()` daripada `src/lib/memory/reindex.ts`, yang memproses sehingga
`limit` entri tertunda bagi setiap permintaan. Kemajuan boleh ditinjau secara berkala melalui
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Jadual `memory_vec_meta` (migrasi `083_memory_vec.sql`) menyimpan:

- `active_dim` — dimensi vektor semasa (null = belum ditentukur).
- `embedding_signature` — `${source}:${model}:${dim}` yang digunakan untuk mengesan perubahan.
- `last_reset_at` — cap masa penetapan semula penuh yang terakhir.
- `vec_loaded` — penanda 0/1 sama ada sqlite-vec berjaya dimuatkan.

## Sambungan tetapan

Sembilan medan pembenaman dan vektor tersedia dalam `MemorySettingsExtended` di
`src/shared/schemas/memory.ts`, dan disimpan melalui `src/lib/db/settings.ts`:

| Medan                    | Jenis                                              | Lalai    | Penerangan                                                                   |
| ------------------------ | -------------------------------------------------- | -------- | ---------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Sumber pembenaman yang akan digunakan                                        |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Penyedia/model dalam format `provider/model`                                 |
| `customBaseUrl`          | `string \| null`                                   | `null`   | URL asas titik akhir serasi OpenAI khusus Memori                             |
| `customModelId`          | `string \| null`                                   | `null`   | ID model yang dihantar ke titik akhir tersuai                                |
| `transformersEnabled`    | `boolean`                                          | `false`  | Pilihan ikut serta untuk Transformers.js (MiniLM, ~400MB)                    |
| `staticEnabled`          | `boolean`                                          | `false`  | Pilihan ikut serta untuk model setempat statik potion-base-8M                |
| `rerankEnabled`          | `boolean`                                          | `false`  | Dayakan langkah penyusunan semula kedudukan (menambah +200-500ms/permintaan) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Penyedia/model penyusunan semula kedudukan dalam format `provider/model`     |

`rerankProviderModel` diselesaikan oleh `POST /v1/rerank` (dipanggil melalui gelung balik), maka ia menerima apa-apa yang diterima oleh laluan tersebut: model penyusunan semula kedudukan awan yang dipilih susun (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) atau nod penyedia serasi OpenAI sebagai `<node-prefix>/<model>` (contohnya `skilled-mini/bge-reranker-v2-m3` untuk kotak TEI/Infinity). Nod gelung balik sentiasa layak; nod pada hos lain (LAN, Tailscale) turut memerlukan bendera ciri `RERANK_REMOTE_PROVIDER_NODES` dan mesti melepasi dasar URL keluar penyedia — lihat [Bendera Ciri](../reference/FEATURE_FLAGS.md). Pemilih papan pemuka menyenaraikan penyedia yang dipilih susun serta nod setempat; sebarang rentetan `provider/model` yang sah boleh ditetapkan secara langsung melalui `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Bahagian belakang vektor yang akan digunakan |

Tetapan ini didedahkan melalui `GET /PUT /api/settings/memory` (skema `MemorySettingsExtendedSchema`).

Bagi sumber `remote`, Memori turut menerima tetapan pilihan `customBaseUrl` dan
`customModelId`. Kedua-duanya memilih titik akhir `/embeddings` dan model yang serasi
dengan OpenAI tanpa mengubah daftaran pembenaman global. Titik akhir dinormalkan
sebelum digunakan dan diperiksa oleh dasar URL keluar penyedia: HTTP(S) diperlukan,
bukti kelayakan terbenam dan rentetan pertanyaan ditolak, manakala alamat metadata
awan kekal disekat. Nilai kosong mengekalkan penyedia daftaran yang dipilih. Ralat yang
dikembalikan kepada papan pemuka disanitasi dan bukti kelayakan titik akhir tidak
pernah dilog.

> **TODO (D20):** Skop `global` (perkongsian memori merentas semua kunci API) belum
> dilaksanakan dalam keluaran ini. Ia memerlukan perubahan skema dan laluan pemerolehan
> global. Jejaki secara berasingan.

## Lapisan Storan

### Utama: SQLite (jadual `memories`)

Dicipta oleh migrasi `015_create_memories.sql`:

| Lajur                       | Jenis              | Nota                                                                              |
| --------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID dijana melalui `crypto.randomUUID()`                                         |
| `api_key_id`                | `TEXT NOT NULL`    | Kunci API pemilik                                                                 |
| `session_id`                | `TEXT`             | Skop pilihan bagi setiap perbualan                                                |
| `type`                      | `TEXT NOT NULL`    | Salah satu daripada `factual`, `episodic`, `procedural`, `semantic`               |
| `key`                       | `TEXT`             | Kunci upsert stabil, contohnya `preference:i_prefer_python`                       |
| `content`                   | `TEXT NOT NULL`    | Teks fakta sebenar                                                                |
| `metadata`                  | `TEXT`             | Gumpalan JSON (kategori, extractedAt, sumber, ...)                                |
| `created_at` / `updated_at` | `TEXT`             | Rentetan ISO 8601                                                                 |
| `expires_at`                | `TEXT`             | Tamat tempoh pilihan; `NULL` bermaksud kekal                                      |
| `memory_id`                 | `INTEGER UNIQUE`   | Ditambah oleh `023_fix_memory_fts_uuid.sql` untuk menghubungkan UUID ↔ rowid FTS5 |

Indeks: `api_key_id`, `session_id`, `type`, `expires_at`, serta indeks unik
`memory_id`.

**Semantik upsert**: `createMemory()` mencari baris sedia ada dengan
`(api_key_id, key)` yang sama dan mengemas kininya di tempat asal apabila ditemukan
(menggabungkan `metadata` melalui hamparan cetek). Ini menghalang jadual daripada
berkembang tanpa had akibat pernyataan keutamaan yang berulang.

### Carian Teks Penuh (jadual maya `memory_fts`)

`022_add_memory_fts5.sql` mencipta jadual maya FTS5 bagi `content` dan
`key`. `023_fix_memory_fts_uuid.sql` membetulkan pepijat sebenar apabila kunci utama
UUID tidak dapat digabungkan dengan rowid integer FTS5 — migrasi tersebut menambah
lajur `memory_id`, mencipta semula jadual FTS, dan menyambungkan pencetus
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) yang memastikan FTS kekal segerak
semasa INSERT, DELETE, dan UPDATE.

Digunakan oleh `retrieval.ts` untuk strategi `semantic` dan `hybrid` (lihat di bawah).
Kod pemerolehan membuat perlindungan dengan `hasTable("memory_fts")` dan kembali
kepada susunan kronologi jika jadual FTS tiada atau pertanyaan FTS mencetuskan ralat.

### Pilihan: Qdrant (storan vektor peringkat 2)

`src/lib/memory/qdrant.ts` melaksanakan integrasi Qdrant pilihan sebagai storan
vektor peringkat 2. Pemerolehan hanya dihalakan ke Qdrant apabila pemilih enjin
`memoryVectorStore === "qdrant"` — nilai lalai `"auto"` (dan `"sqlite-vec"`)
**tidak pernah** memilih Qdrant. Togol tab Engine menetapkan **kedua-dua**
`qdrantEnabled` dan `memoryVectorStore` secara serentak: mendayakannya menjadikan
Qdrant storan utama, manakala menyahdayakannya menetapkan semula kepada `"auto"`
(#5597 — sebelum pembaikan tersebut, pendayaan tidak memberikan kesan kerana tiada
apa-apa yang menulis pemilih enjin). Jika Qdrant tidak dapat dicapai atau tidak
mengembalikan apa-apa, pemerolehan kembali kepada sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — benamkan `key + content` dengan model
  pembenaman yang dikonfigurasikan, pastikan koleksi wujud (mencipta vektor
  jarak kosinus pada penggunaan pertama), dan lakukan upsert pada titik dengan muatan `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — benamkan pertanyaan, cari dalam
  koleksi yang ditapis mengikut `kind = "omniroute_memory"` dan secara pilihan mengikut
  `apiKeyId` / `sessionId`. Mengehadkan `topK` kepada `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — pemadaman satu titik. Dipanggil oleh
  `deleteMemory()` selepas baris SQLite dialih keluar (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — padam secara pukal titik yang
  `expiresAtUnix`-nya telah berlalu atau yang `createdAtUnix`-nya lebih lama daripada
  had pengekalan. Mengira terlebih dahulu supaya papan pemuka boleh menunjukkan angka sebenar.
- `checkQdrantHealth()` — siasatan kesihatan `GET /readyz` berserta kependaman.

UI tetapan menyediakan konfigurasi Qdrant, semakan kesihatan, ujian carian semantik,
dan pembersihan dalam **tab Enjin** di `/dashboard/memory`. Laluan yang sepadan
di bawah `src/app/api/settings/qdrant/` semuanya telah disambungkan setakat v3.8.6:

| Laluan                                  | Kaedah        | Penerangan                            |
| --------------------------------------- | ------------- | ------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Baca / kemas kini tetapan Qdrant      |
| `/api/settings/qdrant/health`           | `GET`         | Siasatan keaktifan + kependaman       |
| `/api/settings/qdrant/search`           | `POST`        | Ujian carian semantik                 |
| `/api/settings/qdrant/cleanup`          | `POST`        | Alih keluar titik tamat tempoh / lama |
| `/api/settings/qdrant/embedding-models` | `GET`         | Senaraikan model pembenaman tersedia  |

**Nota tingkah laku (perkara yang boleh dijangkakan):**

- **Pemilihan enjin** — mendayakan Qdrant dalam tab Enjin menjadikannya stor utama
  (menetapkan `memoryVectorStore="qdrant"`); menyahdayakannya menetapkan semula kepada `"auto"` (#5597).
- **Tiada pengisian semula** — hanya memori yang dicipta/dikemas kini **selepas** Qdrant didayakan
  akan ditulis kepadanya (dwitulis tanpa menunggu respons). Memori SQLite yang telah wujud **tidak**
  dipindahkan; "Indeks Semula Sekarang" hanya membina semula indeks sqlite-vec, bukan Qdrant.
- **Dimensi vektor dikesan secara automatik** daripada pembenaman sebenar pada penggunaan pertama — tiada
  medan dimensi yang perlu diisi. Penukaran model pembenaman selepas koleksi
  wujud **tidak** dikendalikan secara automatik: koleksi sedia ada dibiarkan tanpa perubahan, operasi tulis/carian
  dengan dimensi yang tidak sepadan akan gagal dan kembali menggunakan sqlite-vec. Cipta semula koleksi
  (nama baharu, atau padamkannya dalam Qdrant) untuk menukar model pembenaman.
- **Metrik jarak** — sentiasa **Kosinus** (dikodkan secara tetap semasa penciptaan koleksi; tidak
  boleh dikonfigurasikan).
- **Pengesahan** — kunci API sahaja (dihantar sebagai pengepala `api-key`; pilihan untuk Docker
  tempatan tanpa pengesahan). JWT/RBAC tidak digunakan.
- **Medan konfigurasi** — UI menyediakan `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` hanya tersedia melalui env/DB dan `vectorSize` tidak
  digunakan untuk penciptaan koleksi (dimensi diperoleh daripada pembenaman).

### Pengkuantuman vektor (int8 — ikut pilihan, kedua-dua bahagian belakang)

Kedua-dua bahagian belakang vektor menyokong **pengkuantuman int8 ikut pilihan** untuk mengurangkan
jejak memori vektor yang disimpan (~4× lebih kecil daripada Float32) dengan sedikit pengurangan
daya ingat kembali. Lalai ialah **dimatikan** pada kedua-duanya — vektor kekal berketepatan penuh melainkan
didayakan secara eksplisit.

| Bahagian belakang | Tetapan                         | Jenis                          | Lalai    | Tempat dibaca                                               |
| ----------------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant            | `qdrantQuantization` (kunci DB) | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec        | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** dikonfigurasikan bagi setiap tika melalui kunci tetapan `qdrantQuantization`
  (didedahkan sebagai medan `quantization` pada `PUT /api/settings/qdrant`). Apabila
  `"int8"`, `buildQuantizationConfig()` meminta pengkuantuman skalar
  (`always_ram`, kuantil `0.99`) dan carian mendayakan `rescore: true` supaya
  vektor berketepatan penuh memperhalus set calon int8.
- Pengkuantuman **sqlite-vec** adalah **melalui persekitaran sahaja** (bukan tetapan DB): tetapkan
  `MEMORY_VEC_QUANTIZATION=int8` untuk menyimpan vektor setempat sebagai lajur `int8[dim]`
  melalui `vec_quantize_int8(?, 'unit')`. Mod yang dipilih dimasukkan ke dalam
  `embedding_signature` (akhiran `:int8`), maka penukaran mod mencetuskan pengindeksan semula penuh
  bagi jadual `vec_memories` — laluan pengisian semula malas yang sama seperti yang digunakan apabila
  model pembenaman berubah.

## Jenis Memori

`MemoryType` (`src/lib/memory/types.ts`):

| Jenis        | Digunakan untuk                                                                           |
| ------------ | ----------------------------------------------------------------------------------------- |
| `factual`    | Keutamaan, fakta pengguna yang stabil, pola tingkah laku                                  |
| `episodic`   | Keputusan yang terikat pada detik tertentu ("Saya memilih Postgres")                      |
| `procedural` | Memori aliran kerja / panduan cara (dikhaskan; tiada pengekstrak automatik pada masa ini) |
| `semantic`   | Dikhaskan untuk entri stor vektor                                                         |

Strategi pengambilan semula `MemoryConfig` ialah salah satu daripada `exact`, `semantic`, atau `hybrid`,
dan skop ialah salah satu daripada `session`, `apiKey`, atau `global`. Skop lalai daripada
`getMemorySettings()` ialah `apiKey`.

## Pengekstrakan Fakta (`extraction.ts`)

Pengekstrakan adalah **berasaskan regex**, bukannya berasaskan LLM — ia dijalankan dalam proses dengan
`setImmediate()` supaya tidak sekali-kali menyekat aliran respons:

- **Pola keutamaan** → `MemoryType.FACTUAL`
  (cth. `Saya lebih suka …`, `Saya sangat menyukai …`, `kegemaran saya ialah …`, `Saya benci …`)
- **Pola keputusan** → `MemoryType.EPISODIC`
  (cth. `Saya akan menggunakan …`, `Saya memilih …`, `Saya membuat keputusan untuk menggunakan …`, `Saya akan menerima pakai …`)
- **Pola tabiat** → `MemoryType.FACTUAL`
  (cth. `Saya biasanya …`, `Saya sentiasa …`, `Saya cenderung untuk …`)

Setiap padanan disanitasi (`trim`, merapatkan ruang kosong, dihadkan kepada 500 aksara),
dinyahduplikasi dalam kelompok melalui `factKey(category, content)` yang stabil, dan
disimpan melalui `createMemory()` dengan metadata
`{category, extractedAt, source: "llm_response"}`. Teks input dihadkan kepada
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — apabila lebih panjang, **bahagian hujung** teks
digunakan supaya kandungan pembantu yang paling terkini sentiasa disertakan.

`extractFactsFromText(text)` dieksport untuk ujian dan mengembalikan fakta berstruktur
tanpa menyimpannya.

## Pengambilan Semula (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ialah titik masuk utama. Ia:

1. Menormalkan dan mengesahkan konfigurasi melalui `MemoryConfigSchema`.
2. Mengembalikan `[]` serta-merta apabila `enabled` ialah false atau `maxTokens <= 0`.
3. Mengehadkan `maxTokens` kepada `[1, 8000]`.
4. Mengesan sama ada jadual `memories` moden wujud (berbanding jadual `memory`
   legasi) supaya pangkalan data lama terus berfungsi.
5. Membina pertanyaan asas dengan pelindung tamat tempoh
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), skop
   sesi pilihan, dan had tarikh `retentionDays` pilihan.
6. Bercabang berdasarkan strategi:
   - **`exact`** (lalai): kronologi `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: jika `config.query` dan `memory_fts` wujud, lakukan JOIN
     `memory_fts MATCH ?` dan susun mengikut kedudukan FTS; kembali kepada susunan kronologi
     apabila FTS mengembalikan 0 baris.
   - **`hybrid`**: gabungan hasil FTS (kerelevanan lebih tinggi) dan set
     kronologi, dinyahduplikasi mengikut id.
7. Mengira skor kerelevanan kata kunci (`getRelevanceScore`) merentasi
   `content`, `key`, dan JSON `metadata` apabila pertanyaan diberikan. Baris dengan
   skor sifar ditapis keluar.
8. Menyusun mengikut skor secara menurun, kemudian `createdAt` secara menurun.
9. Menelusuri senarai berkedudukan dan menerima entri selagi jumlah terkumpul
   `estimateTokens(content)` (≈ `length / 4`) kekal dalam bajet. Sentiasa
   mengembalikan sekurang-kurangnya satu entri apabila terdapat sebarang padanan.

`estimateTokens` dieksport dan digunakan oleh pengambilan semula, peringkasan, dan alat MCP
`omniroute_memory_search`.

## Penyuntikan (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Menggabungkan semua kandungan memori menjadi satu rentetan `Memory context: …`.
2. Memilih strategi berdasarkan nama penyedia:
   - **Mesej sistem** (lalai untuk OpenAI, Anthropic, Gemini, …) — menambahkan
     `{role: "system", content: memoryText}` di hadapan sebarang mesej sistem
     sedia ada supaya gesaan sistem pengguna masih diberi keutamaan.
   - **Mesej pengguna** (sandaran) — untuk penyedia dalam
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Penyedia ini menolak peranan sistem
     dan jika tidak, akan mengembalikan 400 (rujuk isu #1701 untuk GLM/Zhipu).
3. Merekodkan bilangan, strategi dan model di bawah `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` dieksport untuk pemanggil yang perlu
membuat keputusan penghalaan mereka sendiri. Penyedia yang tidak diketahui menggunakan `true`
(peranan sistem dibenarkan) sebagai lalai demi keselamatan.

## Tetapan (`settings.ts`)

Konfigurasi memori **disimpan dalam jadual tetapan DB**, bukan dalam pemboleh ubah persekitaran.
`getMemorySettings()` membaca daripada `getSettings()` dan menyimpan hasil dalam cache
dalam proses; `invalidateMemorySettingsCache()` dipanggil oleh laluan PUT tetapan
selepas penulisan.

### Medan legasi (semua versi)

| Kunci DB              | Jenis   | Lalai                                                           | Kawalan UI                                                   |
| --------------------- | ------- | --------------------------------------------------------------- | ------------------------------------------------------------ |
| `memoryEnabled`       | boolean | `false` (dimatikan secara lalai sejak v3.8.30)                  | Hidupkan/matikan memori                                      |
| `memoryMaxTokens`     | integer | `2000` (julat `0–16000`)                                        | Bajet token untuk penyuntikan                                |
| `memoryRetentionDays` | integer | `30` (julat `1–365`)                                            | Tempoh pengekalan                                            |
| `memoryStrategy`      | enum    | `"hybrid"` (salah satu daripada `recent`, `semantic`, `hybrid`) | Strategi perolehan                                           |
| `skillsEnabled`       | boolean | `false`                                                         | Menogol penyuntikan kemahiran setiap kunci (lihat SKILLS.md) |

Nota: strategi UI `"recent"` dipetakan kepada strategi perolehan dalaman `"exact"`
melalui `toMemoryRetrievalConfig()` (susunan kronologi).

### Medan baharu (v3.8.6, pelan 21 D9)

Lihat juga bahagian "Sambungan tetapan" di atas untuk penerangan medan.

| Kunci DB                    | Medan API                | Lalai    |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Kunci DB berkaitan Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` dengan lalai `"omniroute_memory"`,
`qdrantEmbeddingModel` dengan lalai `"openai/text-embedding-3-small"`) dibaca oleh
`normalizeQdrantConfig()` dalam `qdrant.ts`.

### Pemboleh ubah persekitaran (v3.8.6)

Enam pemboleh ubah persekitaran pilihan melaraskan tingkah laku masa jalan enjin (didokumentasikan dalam `.env.example`):

| Pemboleh ubah                   | Lalai                      | Penerangan                                                                                                                                                    |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL cache pembenaman (5 min)                                                                                                                                  |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Bilangan maksimum entri dalam cache LRU pembenaman                                                                                                            |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repositori HF untuk model Transformers.js                                                                                                                     |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repositori HF untuk model potion statik                                                                                                                       |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Lokasi untuk menyimpan model yang dimuat turun                                                                                                                |
| `MEMORY_VEC_TOP_K`              | `20`                       | top-K lalai untuk carian vektor                                                                                                                               |
| `MEMORY_RRF_K`                  | `60`                       | Pemalar k RRF untuk carian hibrid                                                                                                                             |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Tetapkan kepada `int8` untuk menyimpan vektor sqlite-vec setempat yang dikuantumkan (~4× lebih kecil; ikut serta). Perubahan mod memaksa pengindeksan semula. |

## Peringkasan (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` memampatkan kandungan
lama apabila jumlah token semasa merentasi memori sesuatu kunci melebihi
had. Ia melelar baris secara menurun (DESC) mengikut `created_at`, mengekalkan baris yang muat dan,
bagi baris selebihnya, menggantikan `content` di tempat asal dengan tiga ayat pertama daripada
kandungan asal. `tokensSaved` ialah perbezaan dalam `estimateTokens` antara kandungan
lama dengan kandungan baharu.

Rutin ini **tersedia tetapi tidak dipanggil secara automatik** dalam talian paip
sembang semasa — panggilnya daripada cron, tindakan pentadbir atau
logik penghubung `MemoryConfig.autoSummarize` jika anda memerlukan pemampatan berterusan. Kehilangan data
adalah sehala: teks asal ditulis ganti.

## API REST

Semua titik akhir memerlukan pengesahan pengurusan (`requireManagementAuth`).

### Titik akhir memori teras (sedia ada + dikemas kini)

| Kaedah   | Laluan               | Penerangan                                                                                                                                                                                   |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Senarai berhalaman dengan penapis: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Respons merangkumi `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`      |
| `POST`   | `/api/memory`        | Cipta entri (disahkan oleh Zod: `content`, `key`, `type` pilihan, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Memanggil `createMemory()` yang melakukan upsert pada `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Dapatkan satu entri mengikut UUID                                                                                                                                                            |
| `PUT`    | `/api/memory/[id]`   | Kemas kini medan entri (`type`, `key`, `content`, `metadata`). Kandungan permintaan: `MemoryUpdatePutSchema`. Turut menyegerakkan vektor jika sumber pembenaman tersedia.                    |
| `DELETE` | `/api/memory/[id]`   | Padam entri; turut memadam daripada `vec_memories` (D15) dan Qdrant atas dasar usaha terbaik. Mengembalikan 404 apabila tidak ditemui.                                                       |
| `GET`    | `/api/memory/health` | Menjalankan `verifyExtractionPipeline("health-check")` — proses pergi balik cipta→senarai→padam. Mengembalikan `{working, latencyMs, error?}`                                                |

### Titik akhir enjin memori baharu (pelan 21)

| Kaedah | Laluan                            | Penerangan                                                                                                                                                                                     |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Ujian kering `retrieveMemories` — mengembalikan hasil berkedudukan dengan skor, peringkat dan token. Kandungan permintaan: `RetrievePreviewSchema`. TIDAK menyuntik atau mengubah suai memori. |
| `GET`  | `/api/memory/embedding-providers` | Menyenaraikan penyedia dengan model pembenaman, serta menunjukkan penyedia yang mempunyai kunci API yang dikonfigurasikan.                                                                     |
| `GET`  | `/api/memory/engine-status`       | Mengembalikan status enjin penuh: peringkat kata kunci, resolusi pembenaman, statistik stor vektor, kesihatan Qdrant, konfigurasi pemeringkatan semula. Bentuk: `MemoryEngineStatusSchema`.    |
| `POST` | `/api/memory/summarize`           | Cetuskan pemampatan memori secara manual. Kandungan permintaan: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Mengembalikan `{candidates, tokensSaved}`.                   |
| `POST` | `/api/memory/reindex`             | Cetuskan pengindeksan semula vektor untuk memori dengan `needs_reindex=1`. Kandungan permintaan: `MemoryReindexSchema` (`force`). Mengembalikan `{started, pending}`.                          |

### Titik akhir tetapan

| Kaedah | Laluan                                  | Penerangan                                                                                                                       |
| ------ | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` ternormal semasa (7 medan baharu + legasi)                                                              |
| `PUT`  | `/api/settings/memory`                  | Kemas kini mana-mana medan daripada `MemorySettingsExtendedSchema` (12 medan keseluruhan)                                        |
| `GET`  | `/api/settings/qdrant`                  | Tetapan Qdrant semasa (`QdrantSettingsSchema`)                                                                                   |
| `PUT`  | `/api/settings/qdrant`                  | Kemas kini tetapan Qdrant. Kandungan permintaan: `QdrantSettingsUpdateSchema`. `apiKey` = rentetan kosong mengalih keluar kunci. |
| `GET`  | `/api/settings/qdrant/health`           | Pemeriksaan keaktifan terhadap tika Qdrant yang dikonfigurasikan. Mengembalikan `QdrantHealthResultSchema`.                      |
| `POST` | `/api/settings/qdrant/search`           | Ujian carian semantik terhadap Qdrant. Kandungan permintaan: `QdrantSearchSchema` (`query`, `topK`).                             |
| `POST` | `/api/settings/qdrant/cleanup`          | Alih keluar titik Qdrant bagi memori yang telah luput / lama.                                                                    |
| `GET`  | `/api/settings/qdrant/embedding-models` | Senaraikan model pembenaman yang tersedia untuk Qdrant.                                                                          |

Pertanyaan senarai `/api/memory` menyokong sama ada penomboran berasaskan `page`
(`parsePaginationParams`) **atau** `offset` mentah — apabila `offset` hadir, ia
mengambil keutamaan dan `page` terbitan dikira untuk bentuk respons.

## Alat MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Apabila pelayan MCP didayakan, tiga alat memori didaftarkan:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → membalut `retrieveMemories()`. Mulai v3.8.6 (D16), `strategy` dibaca
  daripada `getMemorySettings()` dan bukannya ditetapkan secara tegar kepada `"exact"`. Jika
  `query` diberikan dan `strategy` ialah `semantic` atau `hybrid`, stor vektor
  digunakan apabila tersedia.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → membalut `createMemory()`. Hanya menerima 4 jenis kanonik:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → menyenaraikan entri
  yang sepadan, menapis secara pilihan mengikut cap masa sebelum penciptaan, kemudian memadam setiap entri
  melalui `deleteMemory()` (yang turut mengalih keluar vektor daripada sqlite-vec + Qdrant).

Lihat [MCP-SERVER.md](./MCP-SERVER.md) untuk butiran pengangkutan dan skop.

## Papan Pemuka (Studio Memori)

`src/app/(dashboard)/dashboard/memory/page.tsx` kini merupakan **Studio 3 tab**:

### Tab: Memori

- Kad konsep (penerangan "Cara ia berfungsi" yang boleh dikembangkan dan diruntuhkan).
- Senarai masa nyata, carian dan penomboran halaman (nyahlantun 300 ms).
- Penapis jenis (`factual` / `episodic` / `procedural` / `semantic` / semua).
- Modal tambah memori (kunci, kandungan, jenis).
- Pengeditan sebaris (butang pensel → `PUT /api/memory/[id]`).
- Padam setiap baris (dengan dialog pengesahan).
- Eksport JSON bagi halaman semasa; import JSON melalui pemilih fail.
- Kad statistik: `totalEntries`, `tokensUsed`, `hitRate`.
- Butang "Padatkan yang lama" → `POST /api/memory/summarize` (ujian kering mula-mula menunjukkan
  bilangan calon, kemudian meminta pengesahan).
- Titik kesihatan hijau/merah yang dipacu oleh `GET /api/memory/health`.

### Tab: Ruang Uji

- Input pertanyaan + pemilih strategi (Tepat / Semantik / Hibrid) + belanjawan token.
- "Simulasikan" → `POST /api/memory/retrieve-preview` — menunjukkan hasil berkedudukan dengan
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panel resolusi yang menunjukkan sumber pembenaman / stor vektor yang digunakan dan
  sama ada sandaran berlaku.

### Tab: Enjin

- Panel status enjin (cip kata kunci FTS5, cip pembenaman, cip stor vektor,
  cip kesihatan Qdrant, cip penyusunan semula kedudukan).
- Butang "Indeks Semula Sekarang" → `POST /api/memory/reindex`.
- Pemilih sumber pembenaman (auto / jauh / statik / transformers + togol).
- Kad konfigurasi Qdrant (togol daya, hos/port/koleksi/kunci, uji sambungan,
  ujian carian semantik, pembersihan).
- Kad konfigurasi penyusunan semula kedudukan (togol daya, pemilih penyedia/model).

Tetapan Memori dan Qdrant juga tersedia di bawah
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) untuk
antara muka tetapan legasi/global.

## Cache

`src/lib/memory/store.ts` mengekalkan cache seakan LRU dalam proses
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, dengan penyingkiran 20 %
entri paling lama) untuk bacaan `getMemory(id)`, serta lapisan kunci/nilai generik
`memoryCache` (`src/lib/memory/cache.ts`) dengan kaedah `get`/`set`/`invalidate`
yang digunakan oleh pemanggil yang memerlukan cache berskop sendiri (LRU 1 000 entri,
TTL lalai 5 min).

## Privasi & Kitar Hayat

- Pemilikan memori ialah id kunci API (`resolveMemoryOwnerId` dalam
  `chatCore.ts`). Tanpa `apiKeyInfo.id`, pengambilan, suntikan dan
  pengekstrakan tidak akan dijalankan.
- Entri dengan `expires_at` pada masa hadapan ditapis keluar daripada pengambilan;
  entri lama yang melebihi `retentionDays` dikecualikan oleh klausa
  `created_at >= cutoff` dalam `retrieveMemories`.
- Untuk pemadaman kekal, gunakan `DELETE /api/memory/[id]` atau `omniroute_memory_clear`.
- Pengekstrakan dijalankan tanpa menunggu hasil melalui `setImmediate`; kegagalan
  dilogkan di bawah `memory.extraction.background.failed` dan tidak pernah
  dipaparkan kepada pemanggil.
- Ulang-alik pengesahan (`verifyExtractionPipeline`) membersihkan entri ujian
  sendiri dalam blok `finally`.

## Lihat Juga

- [SKILLS.md](./SKILLS.md) — tetapan `skillsEnabled` menyuntik definisi alat
  bersama-sama memori.
- [MCP-SERVER.md](./MCP-SERVER.md) — pengangkutan / skop MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — permukaan API yang lebih luas.
- Modul sumber:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF hibrid
  - `src/lib/memory/embedding/index.ts` — lapisan pembenaman berbilang sumber
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — skema Zod untuk semua badan API memori
  - `src/shared/schemas/qdrant.ts` — skema Zod untuk tetapan/operasi Qdrant
  - `src/lib/db/memoryVec.ts` — CRUD untuk `memory_vec_meta`
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
  - `src/app/api/settings/qdrant/route.ts` + sublaluan
  - `src/app/(dashboard)/dashboard/memory/` — UI Studio (halaman + komponen +
    tab + cangkuk)
  - `open-sse/handlers/chatCore.ts` (pendawaian suntikan / pengekstrakan)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Memilih Penyedia Pembenaman (v3.8.16+)

Enjin memori OmniRoute menyokong **empat sumber pembenaman** (`src/lib/memory/embedding/`). Setiap satu mempunyai pertimbangan berbeza dari segi **kependaman, kos, kualiti model dan kerumitan persediaan**.

### Sumber Pembenaman

| Penyedia       | Sumber                                                 | Kependaman                                       | Kos                 | Kualiti                             | Persediaan                                       |
| -------------- | ------------------------------------------------------ | ------------------------------------------------ | ------------------- | ----------------------------------- | ------------------------------------------------ |
| `transformers` | Model ONNX setempat (Xenova/all-MiniLM-L6-v2)          | ~50-150ms (CPU)                                  | Percuma             | Baik                                | `npm install` sahaja                             |
| `static`       | Vektor prahitung (dicache)                             | <1ms                                             | Percuma             | T/B (bergantung pada padanan cache) | Tiada                                            |
| `remote`       | API OpenAI / Cohere / Voyage                           | ~100-300ms                                       | $0.02-0.10/1M token | Cemerlang                           | Kunci API                                        |
| `auto`         | Memilih sumber terbaik yang tersedia semasa masa jalan | Sama seperti sumber yang dipilih                 | Percuma             | Sama seperti sumber yang dipilih    | Tiada                                            |
| _(cache)_      | Lapisan LRU dalam memori di atas mana-mana sumber      | <1ms (padanan), kependaman penuh (tiada padanan) | Percuma             | Sama seperti sumber asas            | Sentiasa aktif (bukan sumber yang boleh dipilih) |

### Pepohon Keputusan

```
                  Apakah konteks penggunaan anda?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  PEMBANGUNAN/  PROD KECIL  PROD BESAR   PINGGIR / LUAR TALIAN
  UJIAN           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (percuma, tiada API)       (kualiti terbaik) (tiada internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            SENTIASA tambah lapisan `cache` di atas
            (LruCache membalut mana-mana penyedia)
```

### Konfigurasi Pangkalan Data & API

Pilihan pembenaman memori dikonfigurasikan melalui API/UI Tetapan, bukan pemboleh ubah persekitaran. Kunci pangkalan data tetapan yang berkaitan di bawah Tetapan (`normalizeMemorySettings` dalam `src/lib/memory/settings.ts`) ialah:

- `memoryEmbeddingSource`: `"transformers"` (setempat), `"remote"` (berasaskan API, contohnya OpenAI), `"static"` (storan luaran), atau `"auto"`
- `memoryEmbeddingProviderModel`: Pengecam model untuk sumber jauh/statik (contohnya, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, atau `"auto"`

#### Model Setempat (`transformers`)

Menggunakan transformers.js secara dalaman untuk menjalankan model setempat:

```bash
# Pemboleh ubah persekitaran yang dibaca dalam kod (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repositori model HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Model potion statik HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Direktori cache
```

#### Cache Pembenaman LRU

Cache sentiasa aktif secara lalai dan dikonfigurasikan melalui pemboleh ubah persekitaran:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Bilangan maksimum item yang dicache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Angka Prestasi

Penanda aras pada pelayan x86 4 teras biasa (teks ~100 token setiap satu):

| Penyedia             | p50   | p95   | p99   | Kos / 1J pembenaman                |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Percuma                            |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Bergantung pada pengehosan Qdrant  |
| `cache` (kenaan)     | <1ms  | <1ms  | 2ms   | Percuma                            |

---

## Corak Pengekstrakan Fakta (v3.8.16+)

Modul `extraction.ts` (`src/lib/memory/extraction.ts`) menggunakan **padanan corak regex** untuk mengekstrak fakta berstruktur daripada mesej perbualan. Memahami corak ini membantu anda melaraskan kualiti pengekstrakan untuk kes penggunaan anda.

### Kategori Corak Lalai

| Kategori            | Contoh corak                                                                       | Yang ditangkap                |
| ------------------- | ---------------------------------------------------------------------------------- | ----------------------------- |
| PREFERENCE_PATTERNS | `"Saya lebih suka <X>"`, `"Saya suka <X>"`, `"Saya benci <X>"`                     | Keutamaan pengguna            |
| DECISION_PATTERNS   | `"Saya akan menggunakan <X>"`, `"Saya memutuskan untuk <X>"`, `"Saya memilih <X>"` | Keputusan pengguna (episodik) |
| PATTERN_PATTERNS    | `"Saya biasanya <X>"`, `"Saya sentiasa <X>"`, `"Saya tidak pernah <X>"`            | Corak tingkah laku berterusan |

### Contoh Corak (Dipermudah)

```ts
// Daripada src/lib/memory/extraction.ts
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

### Perkara yang Diekstrak

Apabila pengguna berkata:

> "Saya lebih suka TypeScript. Saya akan menggunakan Postgres untuk projek ini. Saya sentiasa membuat commit sebelum melakukan push. Saya tidak suka Python."
> Pengekstrakan menghasilkan 4 memori:
>
> | Kunci                                | Kategori   | Jenis    | Kandungan                               |
> | ------------------------------------ | ---------- | -------- | --------------------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                            |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres untuk projek ini"             |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "membuat commit sebelum melakukan push" |
> | `preference:python`                  | preference | factual  | "Python"                                |

### Had Pengekstrakan

Untuk mengelakkan pengekstrakan tanpa kawalan, had berikut dikenakan:

| Panjang kandungan minimum | 3 aksara |
| Panjang kandungan maksimum | 500 aksara |

### Masa untuk Menyahdayakan Pengekstrakan

Pengekstrakan berjalan secara automatik apabila memori didayakan; tiada togol berasingan
untuk pengekstrakan sahaja. Untuk mematikannya, nyahdayakan memori sepenuhnya (`enabled: false`
melalui `PUT /api/settings/memory`). Pertimbangkan untuk berbuat demikian apabila:

- Anda mempunyai jumlah mesej yang tinggi dan kos pengekstrakan tidak boleh diabaikan
- Perbualan anda kebanyakannya bersifat sementara (sembang, penyahpepijatan) tanpa nilai jangka panjang
- Anda sudah menangkap konteks melalui pemalam tersuai

---

## Pelarasan RRF Hibrid (v3.8.16+)

Algoritma **Reciprocal Rank Fusion (RRF)** menggabungkan hasil FTS5 (kata kunci) dan vektor (semantik). Parameter `k` mengawal jumlah pemberat yang diberikan kepada hasil berkedudukan lebih rendah.

### Formula

Bagi setiap memori calon, skor RRF ialah:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Dengan:

- `k` ialah pemalar (lalai 60)
- `rank_i(d)` ialah kedudukan dokumen `d` dalam sistem perolehan ke-i (FTS, vektor)
- Jumlah tersebut merangkumi semua sistem perolehan

### Cara `k` Mempengaruhi Hasil

| Nilai `k`          | Kesan                                                                                            | Paling sesuai untuk                               |
| ------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| `k=0`              | Penggabungan kedudukan tulen (tanpa pelicinan)                                                   | Garis dasar teori                                 |
| `k=10-30`          | Memberikan pemberat besar kepada hasil teratas, kedudukan rendah hampir tidak menyumbang         | Apabila 3 hasil teratas biasanya betul            |
| **`k=60`** (lalai) | Seimbang — kesemua 10 hasil teratas memberikan sumbangan yang bermakna                           | Perolehan kegunaan umum                           |
| `k=100+`           | Lebih rata — hasil berkedudukan rendah juga boleh mendominasi jika muncul dalam berbilang sistem | Apabila dapatan semula > kejituan adalah kritikal |

### Melaraskan `k` dalam Amalan

```bash
# Lalai
MEMORY_RRF_K=60

# Kejituan agresif (memori kecil, sedikit dokumen)
MEMORY_RRF_K=20

# Dapatan semula maksimum (memori besar, pertanyaan pelbagai)
MEMORY_RRF_K=120
```

**Contoh dengan `k=20`:**

- Kedudukan FTS 1 → sumbangan `1/21 = 0.048`
- Kedudukan FTS 10 → sumbangan `1/30 = 0.033`
- Kedudukan vektor 1 → sumbangan `0.048`
- Maksimum gabungan: `0.096`

**Contoh dengan `k=60`:**

- Kedudukan FTS 1 → sumbangan `1/61 = 0.016`
- Kedudukan FTS 10 → sumbangan `1/70 = 0.014`
- Kedudukan vektor 1 → sumbangan `0.016`
- Maksimum gabungan: `0.033`

Dengan `k` yang lebih tinggi, **perbezaan relatif** antara kedudukan 1 teratas dengan kedudukan 10 adalah lebih kecil, maka algoritma lebih bergantung pada **konsensus merentas sistem perolehan** berbanding keyakinan kedudukan teratas.

### Masa untuk Mengubah `k`

| Gejala                                                             | Cuba                                                                                      |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Hasil teratas sentiasa menang, tetapi hasil itu salah              | **Rendahkan** k (cth., 20) — keyakinan kedudukan teratas lebih penting                    |
| Jawapan yang betul berada dalam 5 teratas tetapi bukan kedudukan 1 | **Tingkatkan** k (cth., 100) — pemarkahan lebih rata memberikan ganjaran kepada konsensus |
| Dapatan semula tinggi tetapi kejituan rendah                       | **Rendahkan** k — pertajam kedudukan                                                      |
| Dapatan semula rendah (dokumen berkaitan tidak ditemui)            | **Tingkatkan** k — berikan peluang kepada dokumen berkedudukan lebih rendah               |

### Pemberatan RRF

Penggabungan kedudukan salingan menggunakan pemberat yang sama untuk kedudukan vektor semantik dan kedudukan carian teks penuh:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Tiada pemboleh ubah persekitaran untuk melaraskan pemberat individu (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` tidak wujud).

---

## Strategi Perumusan (v3.8.16+)

Modul `summarization.ts` (`src/lib/memory/summarization.ts`) memampatkan memori lama untuk memastikan set aktif kekal kecil sambil mengekalkan keupayaan mengingat kembali.

### Masa Perumusan Dicetuskan

| Pencetus                    | Ambang (lalai)  |
| --------------------------- | --------------- |
| Pencetus manual melalui API | tidak berkenaan |

### Perkara yang Dirumuskan

Dua titik masuk dieksport daripada `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — memadatkan
  memori bagi sesuatu sesi menjadi satu teks rumusan yang dihadkan oleh belanjawan token.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — pemampatan berasaskan
  usia yang digunakan oleh API: ia memilih setiap memori yang lebih lama daripada `days`, membina
  satu memori rumusan padat daripadanya dan (apabila `dryRun` ialah `false`) memadamkan
  memori asal. Berikan `dryRun: true` untuk pratonton set calon dan jumlah token
  tanpa mengubah apa-apa.

Tiada proses pengelompokan teg/kunci atau pemarkahan "teras berbanding boleh dirumuskan" bagi setiap memori —
pemilihan adalah berdasarkan had usia semata-mata dan teks rumusan merupakan satu baris padat
berawalan jenis bagi setiap calon.

### Mencetuskan Perumusan

Perumusan adalah **manual / ikut serta** — tetapan `autoSummarize` ialah `false` secara
lalai, maka tiada apa-apa yang dimampatkan secara automatik. Cetuskannya melalui API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Untuk membiarkannya dimatikan, hanya kekalkan `autoSummarize` pada nilai lalainya (`false`).

### Petua Kualiti Perumusan

- **Buat pratonton terlebih dahulu dengan `dryRun`** — `summarizeMemoriesOlderThan(..., true)` mengembalikan
  senarai calon dan jumlah token supaya anda boleh mengesahkan perkara yang akan digabungkan
  sebelum memadamkan memori asal.
- **Jalankan perumusan semasa waktu trafik rendah** jika anda mempunyai korpus memori yang besar — panggilan LLM ialah bahagian yang perlahan

```bash
# Gaya Cron: rumuskan setiap hari pada pukul 3 pagi
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Corak Penyedia MemoryBackend

> **Sumber rujukan utama:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Ujian:** `src/lib/memory/__tests__/generic-backend.test.ts`

Corak penyedia MemoryBackend memperkenalkan **lapisan abstraksi bahagian belakang boleh pasang** di atas enjin memori sedia ada. Daripada terikat kepada satu pelaksanaan storan, sistem memori kini menyokong berbilang bahagian belakang (SQLite, Obsidian, Notion, bahagian belakang HTTP tersuai) dengan penghalaan utama/sandaran yang boleh dikonfigurasikan.

### Seni Bina

```
┌──────────────────────────────────────────────────────────┐
│                    Laluan API                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│          Pengatur tunggal (manager.ts)                    │
│                                                          │
│  Utama ────► Bahagian Belakang A (cth. SQLite)           │
│  Sandaran ─► Bahagian Belakang B (cth. Obsidian)         │
│              Bahagian Belakang C (cth. Notion melalui     │
│              GenericBackend)                             │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Bahagian   │ │ Bahagian   │ │ Bahagian Belakang│
│ Belakang   │ │ Belakang   │ │ GenericMemory    │
│ SQLite     │ │ Obsidian   │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Antara Muka Teras (`backend.ts`)

Setiap bahagian belakang mesti melaksanakan antara muka `MemoryBackend`:

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

  // Carian
  search(config: SearchConfig): Promise<Memory[]>;

  // Kesihatan
  health(): Promise<HealthCheckResult>;

  // Kitar hayat (pilihan)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Pengatur tunggal yang:

- **Mendaftarkan** bahagian belakang melalui `register(backend)` — dipanggil semasa permulaan daripada `index.ts`
- **Mengkonfigurasikan** bahagian belakang utama + sandaran melalui `configure(primary, fallbacks)`
- **Menghalakan** operasi CRUD/carian kepada bahagian belakang utama, dengan rantaian sandaran apabila berlaku kegagalan
- **Memeriksa kesihatan** semua bahagian belakang secara berkala

**Tingkah laku sandaran:**

| Operasi  | Utama                | Sandaran                       |
| -------- | -------------------- | ------------------------------ |
| `create` | ✅ Utama sahaja      | ❌                             |
| `get`    | ✅ Cuba utama dahulu | ✅ Sandaran jika null          |
| `update` | ✅ Utama sahaja      | ✅ Penyegerakan tanpa menunggu |
| `delete` | ✅ Utama sahaja      | ✅ Penyegerakan tanpa menunggu |
| `list`   | ✅ Utama sahaja      | ❌                             |
| `search` | ✅ Utama dahulu      | ✅ Sandaran apabila ralat      |

#### GenericMemoryBackend (`genericBackend.ts`)

Penyambung HTTP generik yang menyesuaikan sebarang REST API menjadi MemoryBackend. Berguna untuk:

- **Notion** — sambungkan melalui Notion API
- **Obsidian** — sambungkan melalui Obsidian Local REST API
- **Bahagian belakang tersuai** — sebarang perkhidmatan yang menyediakan API memori RESTful

**Konfigurasi:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL asas API bahagian belakang
  apiKey?: string;           // Token Bearer untuk pengesahan
  headers?: Record<string, string>;  // Pengepala HTTP tersuai
  timeout?: number;          // Tamat masa permintaan (lalai: 30000ms)
  backendType?: string;      // Untuk pengelogan

  // Penggantian titik akhir (lalai menggunakan konvensyen REST)
  endpoints?: {
    search?: string;   // lalai: "/memories/search"
    create?: string;   // lalai: "/memories"
    list?: string;     // lalai: "/memories"
    get?: string;      // lalai: "/memories/{id}"
    update?: string;   // lalai: "/memories/{id}"
    delete?: string;   // lalai: "/memories/{id}"
    health?: string;   // lalai: "/health"
  };

  // Pemetaan nama parameter pertanyaan
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Pemetaan nama parameter laluan
  pathParams?: {
    id?/memoryId?
  };
}
```

**Bahagian belakang yang diketahui** diprakonfigurasi dalam `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend yang menghala ke localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend yang menghala ke api.notion.com/v1
```

#### Bahagian Belakang Terbina Dalam

##### SQLiteBackend (`sqliteBackend.ts`)

Bahagian belakang utama lalai. Membungkus stor memori berasaskan SQLite sedia ada menggunakan `src/lib/memory/store.ts`. Didaftarkan secara automatik semasa but.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Membungkus integrasi Obsidian sedia ada (`src/lib/memory/obsidianBackend.ts`). Bersambung kepada bilik kebal Obsidian melalui API REST Tempatan Obsidian.

### Tetapan

Tetapan bahagian belakang memori disimpan dalam jadual tetapan aplikasi dan diurus melalui `src/lib/memory/settings.ts`:

| Tetapan                       | Kekunci Env/Konfigurasi  | Lalai      | Penerangan                                       |
| ----------------------------- | ------------------------ | ---------- | ------------------------------------------------ |
| Bahagian belakang utama       | `memoryPrimaryBackend`   | `"sqlite"` | ID bahagian belakang utama                       |
| Bahagian belakang sandaran    | `memoryFallbackBackends` | `[]`       | ID bahagian belakang sandaran tersusun           |
| Konfigurasi bahagian belakang | `memoryBackendConfigs`   | `{}`       | Penggantian konfigurasi setiap bahagian belakang |

Tetapan dinormalkan melalui `normalizeMemorySettings()` dan dicache pada `getMemorySettings()`.

### Aliran Pengawalan

```
But aplikasi
  → import index.ts (kesan sampingan): mendaftarkan SQLiteBackend
  → initMemoryBackends() dipanggil daripada kitaran hayat aplikasi:
      1. Muatkan tetapan (getMemorySettings)
      2. Konfigurasikan bahagian belakang utama + sandaran
      3. Awalkan semua bahagian belakang (semakan kesihatan)
      4. Sedia untuk permintaan
```

### Menambah Bahagian Belakang Baharu

1. **Laksanakan antara muka `MemoryBackend`** dalam `src/lib/memory/<name>Backend.ts`
2. **Eksport** daripada `src/lib/memory/index.ts`
3. **Daftarkan** dengan `memoryManager.register(yourBackend)` semasa but
4. **Konfigurasikan** melalui tetapan: tetapkan `memoryPrimaryBackend` kepada ID bahagian belakang anda
5. **Uji** dengan `src/lib/memory/__tests__/generic-backend.test.ts` sebagai rujukan

#### Contoh: Bahagian Belakang Brain

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

### Pengesahan

#### Ujian unit

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Output yang dijangkakan: **35 ujian, semuanya lulus** merangkumi:

- Pembina (2)
- Semakan kesihatan (4) — berjaya, kegagalan 500, ralat rangkaian, kependaman
- Pengawalan (2) — berjaya, gagal
- Cipta (2) — titik akhir lalai, titik akhir tersuai
- Dapatkan (4) — berjaya, 404 → null, bukan 404 melontarkan ralat, parameter laluan tersuai
- Kemas kini (2) — berjaya, 404 → false
- Padam (2) — berjaya, 404 → false
- Senarai (2) — parameter pertanyaan, nama parameter tersuai
- Carian (3) — parameter pertanyaan, titik akhir tersuai, penserialan pilihan
- Pengepala pengesahan (2) — token Bearer, pengepala tersuai
- Kilang (1)

#### Semakan jenis

```bash
npm run typecheck:core
```

Dijangkakan: **0 ralat**.
