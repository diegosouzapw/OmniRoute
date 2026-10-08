# Memory System (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Sumber acuan:** `src/lib/memory/` dan `src/app/api/memory/`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40 (dinonaktifkan secara default + penyesuaian kuantisasi int8)

OmniRoute menyediakan memori percakapan persisten yang diidentifikasi berdasarkan kunci API (dan
secara opsional id sesi). Memori diekstraksi secara otomatis dari respons LLM
melalui pencocokan pola regex ringan dan disuntikkan kembali ke permintaan
berikutnya sebagai pesan sistem di awal (atau pesan pengguna pertama untuk penyedia yang
menolak peran sistem).

> **Memori NONAKTIF secara default (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> sekarang bernilai `false` (`src/lib/memory/settings.ts`). Mengaktifkan memori akan menyuntikkan hingga
> `maxTokens` (~2k) konteks yang diambil ke dalam **setiap** permintaan percakapan, yang
> dikenai biaya — biaya tak terduga bagi instalasi baru dan klien yang mengelola
> konteksnya sendiri. Aktifkan secara eksplisit di **Settings → Memory** (
> `MemorySkillsTab` menampilkan peringatan biaya token saat memori diaktifkan).
> Klien dapat mengecualikan satu permintaan dengan header permintaan
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — lihat tabel header permintaan di
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Permintaan tanpa memori menetapkan
> `memoryOwnerId = null`, yang menonaktifkan **baik** penyuntikan memori maupun keahlian untuk
> permintaan tersebut (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Memori **dicakup per kunci API**, bukan per pengguna — setiap permintaan yang diautentikasi
dengan kunci API yang sama berbagi kumpulan memori yang sama, dengan pencakupan tambahan
opsional berdasarkan `sessionId`.

## Arsitektur

```
Klien → /v1/chat/completions (apiKeyInfo diselesaikan sebelumnya)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # mengekstrak id
    → getMemorySettings()                     # pengaturan yang di-cache
    → shouldInjectMemory(body, {enabled})     # gerbang
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vektor opsional
    → injectMemory(body, memories, provider)  # pesan sistem atau pengguna
  → panggilan penyedia upstream
  → saat merespons: extractFacts(text, apiKeyId, sessionId)  # tanpa pemblokiran
    → setImmediate → createMemory(fact) untuk setiap kecocokan
                   → embed(content) + upsertVector(id, vec)
```

Lokasi pemanggilan penyuntikan dan ekstraksi terhubung di
`open-sse/handlers/chatCore.ts` (cari `retrieveMemories`, `injectMemory`,
dan `extractFacts`).

## Arsitektur mesin (resolusi 3 tingkat)

Memory Engine menentukan jalur pengambilan saat runtime berdasarkan
infrastruktur dan pengaturan yang tersedia. Terdapat tiga tingkat, yang diterapkan berdasarkan urutan prioritas:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  TINGKAT 0 — Kata kunci (FTS5)                              │
  │  Ketersediaan berbasis pemeriksaan: FTS5 saat build SQLite   │
  │  mendukungnya (better-sqlite3 / node:sqlite / bun:sqlite);   │
  │  tidak tersedia pada build tanpa FTS5 (misalnya sql.js/WASM —│
  │  "no such module: fts5"). Digunakan saat strategy = "exact" │
  │  atau sebagai fallback; keyword status mesin mencerminkan    │
  │  hasil pemeriksaan.                                          │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TINGKAT 1 — Vektor Tertanam (sqlite-vec)                    │
  │  sqlite-vec v0.1.9 dimuat melalui db.loadExtension().        │
  │  KNN brute-force pada vektor Float32. Aktif ketika:           │
  │   • sqlite-vec loadExtension berhasil                        │
  │   • Sumber embedding tersedia (remote | static |             │
  │     transformers) yang dapat menghasilkan Float32Array       │
  │   • Tabel vec_memories tersedia (dibuat saat ready() pertama)│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TINGKAT 2 — Qdrant (basis data vektor eksternal opsional)   │
  │  Saat diaktifkan, menggantikan sqlite-vec untuk semantic/     │
  │  hybrid. Memerlukan instans Qdrant yang berjalan serta host/  │
  │  port yang dikonfigurasi.                                    │
  └─────────────────────────────────────────────────────────────┘
```

Degradasi berlangsung secara otomatis dan transparan:

- Jika sqlite-vec gagal dimuat, tingkat 1 tidak tersedia → kembali ke tingkat 0.
- Jika sumber embedding mengembalikan kesalahan, tingkat 1 kembali ke tingkat 0.
- Jika Qdrant tidak sehat, tingkat 2 kembali ke tingkat 1 (atau tingkat 0 jika tingkat 1
  juga tidak tersedia).

## Sumber embedding

Lapisan embedding (`src/lib/memory/embedding/`) menentukan sumber yang akan digunakan
berdasarkan `MemorySettingsExtended.embeddingSource`:

| Sumber         | Deskripsi                                                                           | Kunci diperlukan | Cold start       |
| -------------- | ----------------------------------------------------------------------------------- | ---------------- | ---------------- |
| `remote`       | Menggunakan API embedding penyedia yang dikonfigurasi (OpenAI, Cohere, dll.)        | Ya               | Tidak ada        |
| `static`       | Embedding tabel pencarian lokal melalui `potion-base-8M` (WordPiece + mean pooling) | Tidak            | ~200ms           |
| `transformers` | Inferensi ONNX lokal melalui `@huggingface/transformers` v4, `all-MiniLM-L6-v2`     | Tidak            | ~3s + ~400MB RAM |
| `auto`         | Resolusi runtime: remote (jika kunci tersedia) → static → transformers → null       | Bergantung       | Bergantung       |

**Urutan resolusi untuk `auto`:**

1. Temukan penyedia pertama dalam `listEmbeddingProviders()` dengan `hasKey === true` → `remote`.
2. Jika `settings.staticEnabled === true` → `static`.
3. Jika `settings.transformersEnabled === true` → `transformers`.
4. Jika tidak → `null` (beralih ke pencarian kata kunci FTS5).

Cache embedding (`src/lib/memory/embedding/cache.ts`) menggunakan
peta LRU dalam memori dengan kunci `${source}:${model}:${dim}:${sha256(text)}`, yang dibatasi hingga
`MEMORY_EMBEDDING_CACHE_MAX` entri (default 1000) dengan TTL
`MEMORY_EMBEDDING_CACHE_TTL_MS` (default 5 menit). Cache ini digunakan bersama oleh semua pemanggil
selama siklus hidup proses.

## RRF Hibrida (k=60)

Ketika `strategy = "hybrid"` dan penyimpanan vektor tersedia, pengambilan menggunakan
Reciprocal Rank Fusion untuk menggabungkan hasil FTS5 dan vektor:

```
RRF(d) = Σ  1 / (k + rank_i(d))      dengan k = 60 (dapat dikonfigurasi melalui MEMORY_RRF_K)
          i
```

Secara konkret:

1. Jalankan pencarian FTS5 → daftar berperingkat `R_fts` (posisi 1..N).
2. Jalankan pencarian vektor KNN → daftar berperingkat `R_vec` (posisi 1..M).
3. Untuk setiap `memoryId` unik:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 jika tidak ada dalam daftar).
4. Urutkan berdasarkan `rrf_score` DESC, lalu terapkan penelusuran anggaran token.

RRF dikenal efektif tanpa memerlukan normalisasi skor di antara
sistem pengambilan yang heterogen. Nilai default `k=60` berasal dari makalah asli
Cormack dkk. dan berfungsi dengan baik untuk korpus kecil (<10 ribu memori).

## Backfill (lazy + reindex)

Ketika model embedding berubah (terdeteksi melalui `embedding_signature`),
penyimpanan vektor dibangun ulang dan semua memori yang sudah ada ditandai
`needs_reindex = 1` dalam tabel `memories`.

**Backfill lazy**: Pada pengambilan berikutnya, setiap memori yang tidak memiliki entri vektor akan
dibuatkan embedding dan dimasukkan ke dalam `vec_memories` sebelum pencarian dijalankan. Hal ini
mengamortisasi biaya backfill di seluruh permintaan nyata tanpa memblokir startup.

**Reindex eksplisit**: Tab Engine di `/dashboard/memory` menyediakan tombol
"Indeks Ulang Sekarang" yang memanggil `POST /api/memory/reindex`. Handler tersebut memanggil
`runReindexBatch()` dari `src/lib/memory/reindex.ts`, yang memproses hingga
`limit` entri tertunda per permintaan. Progres dapat dipantau melalui
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

Tabel `memory_vec_meta` (migrasi `083_memory_vec.sql`) menyimpan:

- `active_dim` — dimensi vektor saat ini (null = belum dikalibrasi).
- `embedding_signature` — `${source}:${model}:${dim}` yang digunakan untuk mendeteksi perubahan.
- `last_reset_at` — stempel waktu reset penuh terakhir.
- `vec_loaded` — flag 0/1 yang menunjukkan apakah sqlite-vec berhasil dimuat.

## Ekstensi pengaturan

Sembilan bidang embedding dan vektor tersedia di `MemorySettingsExtended` dalam
`src/shared/schemas/memory.ts`, dan disimpan melalui `src/lib/db/settings.ts`:

| Bidang                   | Tipe                                               | Default  | Deskripsi                                                             |
| ------------------------ | -------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Sumber embedding yang akan digunakan                                  |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Penyedia/model dalam format `provider/model`                          |
| `customBaseUrl`          | `string \| null`                                   | `null`   | URL dasar endpoint kompatibel OpenAI khusus Memori                    |
| `customModelId`          | `string \| null`                                   | `null`   | ID model yang dikirim ke endpoint kustom                              |
| `transformersEnabled`    | `boolean`                                          | `false`  | Keikutsertaan untuk Transformers.js (MiniLM, ~400MB)                  |
| `staticEnabled`          | `boolean`                                          | `false`  | Keikutsertaan untuk model lokal statis potion-base-8M                 |
| `rerankEnabled`          | `boolean`                                          | `false`  | Aktifkan langkah pemeringkatan ulang (menambah +200-500ms/permintaan) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Penyedia/model pemeringkatan ulang dalam format `provider/model`      |

`rerankProviderModel` di-resolve oleh `POST /v1/rerank` (dipanggil melalui loopback), sehingga menerima apa pun yang diterima rute tersebut: model pemeringkatan ulang cloud terkurasi (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) atau node penyedia yang kompatibel dengan OpenAI sebagai `<node-prefix>/<model>` (misalnya `skilled-mini/bge-reranker-v2-m3` untuk mesin TEI/Infinity). Node loopback selalu memenuhi syarat; node pada host lain (LAN, Tailscale) juga memerlukan feature flag `RERANK_REMOTE_PROVIDER_NODES` dan harus lolos kebijakan URL keluar penyedia — lihat [Feature Flag](../reference/FEATURE_FLAGS.md). Pemilih dasbor mencantumkan penyedia terkurasi beserta node lokal; string `provider/model` apa pun yang valid dapat ditetapkan secara langsung melalui `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Backend vektor yang akan digunakan |

Pengaturan ini diekspos melalui `GET /PUT /api/settings/memory` (skema `MemorySettingsExtendedSchema`).

Untuk sumber `remote`, Memori juga menerima pengaturan opsional `customBaseUrl` dan
`customModelId`. Keduanya memilih endpoint `/embeddings` dan model yang kompatibel
dengan OpenAI tanpa mengubah registri embedding global. Endpoint dinormalisasi sebelum
digunakan dan diperiksa oleh kebijakan URL keluar penyedia: HTTP(S) diwajibkan,
kredensial tertanam dan string kueri ditolak, serta alamat metadata cloud tetap
diblokir. Nilai kosong mempertahankan penyedia registri yang dipilih. Pesan kesalahan
yang dikembalikan ke dasbor disanitasi dan kredensial endpoint tidak pernah dicatat.

> **TODO (D20):** Cakupan `global` (berbagi memori di seluruh kunci API) belum
> diimplementasikan dalam rilis ini. Hal ini memerlukan perubahan skema dan jalur
> pengambilan global. Lacak secara terpisah.

## Lapisan Penyimpanan

### Utama: SQLite (tabel `memories`)

Dibuat oleh migrasi `015_create_memories.sql`:

| Kolom                       | Tipe               | Catatan                                                                             |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID yang dihasilkan melalui `crypto.randomUUID()`                                  |
| `api_key_id`                | `TEXT NOT NULL`    | Kunci API pemilik                                                                   |
| `session_id`                | `TEXT`             | Cakupan opsional per percakapan                                                     |
| `type`                      | `TEXT NOT NULL`    | Salah satu dari `factual`, `episodic`, `procedural`, `semantic`                     |
| `key`                       | `TEXT`             | Kunci upsert stabil, misalnya `preference:i_prefer_python`                          |
| `content`                   | `TEXT NOT NULL`    | Teks fakta yang sebenarnya                                                          |
| `metadata`                  | `TEXT`             | Blob JSON (category, extractedAt, source, ...)                                      |
| `created_at` / `updated_at` | `TEXT`             | String ISO 8601                                                                     |
| `expires_at`                | `TEXT`             | Kedaluwarsa opsional; `NULL` berarti permanen                                       |
| `memory_id`                 | `INTEGER UNIQUE`   | Ditambahkan oleh `023_fix_memory_fts_uuid.sql` untuk menjembatani UUID ↔ rowid FTS5 |

Indeks: `api_key_id`, `session_id`, `type`, `expires_at`, ditambah indeks unik
`memory_id`.

**Semantik upsert**: `createMemory()` mencari baris yang sudah ada dengan
`(api_key_id, key)` yang sama dan memperbaruinya langsung ketika ditemukan
(menggabungkan `metadata` melalui shallow spread). Hal ini mencegah tabel bertambah
tanpa batas akibat pernyataan preferensi yang berulang.

### Pencarian Teks Lengkap (tabel virtual `memory_fts`)

`022_add_memory_fts5.sql` membuat tabel virtual FTS5 atas `content` dan
`key`. `023_fix_memory_fts_uuid.sql` memperbaiki bug dunia nyata ketika kunci
primer UUID tidak dapat di-join dengan rowid integer milik FTS5 — migrasi tersebut
menambahkan kolom `memory_id`, membuat ulang tabel FTS, dan memasang trigger
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) yang menjaga sinkronisasi FTS
saat INSERT, DELETE, dan UPDATE.

Digunakan oleh `retrieval.ts` untuk strategi `semantic` dan `hybrid` (lihat di bawah).
Kode pengambilan melakukan pemeriksaan dengan `hasTable("memory_fts")` dan beralih
ke urutan kronologis jika tabel FTS tidak ada atau kueri FTS menghasilkan galat.

### Opsional: Qdrant (penyimpanan vektor tingkat 2)

`src/lib/memory/qdrant.ts` mengimplementasikan integrasi Qdrant opsional sebagai
penyimpanan vektor tingkat 2. Pengambilan hanya dirutekan ke Qdrant ketika pemilih
mesin `memoryVectorStore === "qdrant"` — nilai default `"auto"` (dan `"sqlite-vec"`)
**tidak pernah** memilih Qdrant. Tombol alih tab Engine menetapkan **keduanya**,
`qdrantEnabled` dan `memoryVectorStore`, secara bersamaan: mengaktifkannya menjadikan
Qdrant sebagai penyimpanan utama, sedangkan menonaktifkannya mengatur ulang ke
`"auto"` (#5597 — sebelum perbaikan tersebut, pengaktifan tidak memberikan efek
karena tidak ada yang menulis ke pemilih mesin). Jika Qdrant tidak dapat dijangkau
atau tidak mengembalikan apa pun, pengambilan beralih ke sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — menyematkan `key + content` dengan model
  embedding yang dikonfigurasi, memastikan koleksi tersedia (membuat vektor
  dengan jarak kosinus saat pertama kali digunakan), dan melakukan upsert titik
  dengan payload `{memoryId, apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — menyematkan kueri, mencari di
  koleksi yang difilter berdasarkan `kind = "omniroute_memory"` dan secara opsional
  berdasarkan `apiKeyId` / `sessionId`. Membatasi `topK` ke `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — menghapus satu titik. Dipanggil oleh
  `deleteMemory()` setelah baris SQLite dihapus (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — menghapus secara massal titik-titik yang
  `expiresAtUnix`-nya sudah berlalu atau yang `createdAtUnix`-nya lebih lama daripada
  batas retensi. Melakukan penghitungan terlebih dahulu agar dasbor dapat menampilkan angka aktual.
- `checkQdrantHealth()` — pemeriksaan kesehatan `GET /readyz` beserta latensinya.

UI pengaturan menyediakan konfigurasi Qdrant, pemeriksaan kesehatan, pengujian pencarian semantik,
dan pembersihan di **tab Engine** pada `/dashboard/memory`. Route terkait
di bawah `src/app/api/settings/qdrant/` semuanya telah terhubung sejak v3.8.6:

| Route                                   | Metode        | Deskripsi                                  |
| --------------------------------------- | ------------- | ------------------------------------------ |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Membaca / memperbarui pengaturan Qdrant    |
| `/api/settings/qdrant/health`           | `GET`         | Pemeriksaan keaktifan + latensi            |
| `/api/settings/qdrant/search`           | `POST`        | Pengujian pencarian semantik               |
| `/api/settings/qdrant/cleanup`          | `POST`        | Menghapus titik kedaluwarsa / lama         |
| `/api/settings/qdrant/embedding-models` | `GET`         | Mencantumkan model embedding yang tersedia |

**Catatan perilaku (hal yang dapat diharapkan):**

- **Pemilihan mesin** — mengaktifkan Qdrant di tab Engine menjadikannya penyimpanan
  utama (menetapkan `memoryVectorStore="qdrant"`); menonaktifkannya akan mengatur ulang ke `"auto"` (#5597).
- **Tanpa pengisian ulang** — hanya memori yang dibuat/diperbarui **setelah** Qdrant diaktifkan yang
  ditulis ke sana (penulisan ganda secara fire-and-forget). Memori SQLite yang sudah ada **tidak**
  dimigrasikan; "Reindex Now" hanya membangun ulang indeks sqlite-vec, bukan Qdrant.
- **Dimensi vektor dideteksi secara otomatis** dari embedding aktual saat pertama kali digunakan —
  tidak ada kolom dimensi yang perlu diisi. Perubahan model embedding setelah koleksi
  dibuat **tidak** ditangani secara otomatis: koleksi yang ada dibiarkan tanpa perubahan, sedangkan operasi
  penulisan/pencarian dengan dimensi yang tidak cocok akan gagal dan beralih kembali ke sqlite-vec. Buat ulang koleksi
  (gunakan nama baru, atau hapus koleksi tersebut di Qdrant) untuk mengganti embedder.
- **Metrik jarak** — selalu **Cosine** (ditentukan secara hardcode saat koleksi dibuat; tidak
  dapat dikonfigurasi).
- **Autentikasi** — hanya kunci API (dikirim sebagai header `api-key`; bersifat opsional untuk Docker
  lokal tanpa autentikasi). JWT/RBAC tidak digunakan.
- **Kolom konfigurasi** — UI menyediakan `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` hanya tersedia melalui env/DB dan `vectorSize` tidak
  digunakan untuk pembuatan koleksi (dimensi berasal dari embedding).

### Kuantisasi vektor (int8 — opsional, kedua backend)

Kedua backend vektor mendukung **kuantisasi int8 opsional** untuk mengurangi penggunaan
memori oleh vektor yang disimpan (~4× lebih kecil daripada Float32) dengan sedikit penurunan recall.
Secara default fitur ini **nonaktif** pada keduanya — vektor tetap menggunakan presisi penuh kecuali
diaktifkan secara eksplisit.

| Backend    | Pengaturan                      | Tipe                           | Default  | Lokasi pembacaan                                            |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (kunci DB) | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** dikonfigurasi per instans melalui kunci pengaturan `qdrantQuantization`
  (disediakan sebagai kolom `quantization` pada `PUT /api/settings/qdrant`). Saat
  bernilai `"int8"`, `buildQuantizationConfig()` meminta kuantisasi skalar
  (`always_ram`, kuantil `0.99`) dan pencarian mengaktifkan `rescore: true` agar
  vektor berpresisi penuh menyempurnakan kumpulan kandidat int8.
- Kuantisasi **sqlite-vec** bersifat **khusus lingkungan** (bukan pengaturan DB): tetapkan
  `MEMORY_VEC_QUANTIZATION=int8` untuk menyimpan vektor lokal sebagai kolom `int8[dim]`
  melalui `vec_quantize_int8(?, 'unit')`. Mode yang dipilih dimasukkan ke dalam
  `embedding_signature` (akhiran `:int8`), sehingga pergantian mode memicu pengindeksan
  ulang penuh pada tabel `vec_memories` — jalur lazy-backfill yang sama seperti yang
  digunakan saat model embedding berubah.

## Jenis Memori

`MemoryType` (`src/lib/memory/types.ts`):

| Jenis        | Digunakan untuk                                                                         |
| ------------ | --------------------------------------------------------------------------------------- |
| `factual`    | Preferensi, fakta pengguna yang stabil, pola perilaku                                   |
| `episodic`   | Keputusan yang terkait dengan momen tertentu ("Saya memilih Postgres")                  |
| `procedural` | Memori alur kerja / panduan cara (dicadangkan; saat ini tidak ada pengekstrak otomatis) |
| `semantic`   | Dicadangkan untuk entri penyimpanan vektor                                              |

Strategi pengambilan `MemoryConfig` adalah salah satu dari `exact`, `semantic`, atau `hybrid`,
dan cakupannya adalah salah satu dari `session`, `apiKey`, atau `global`. Cakupan default dari
`getMemorySettings()` adalah `apiKey`.

## Ekstraksi Fakta (`extraction.ts`)

Ekstraksi **berbasis regex**, bukan berbasis LLM — proses ini berjalan secara internal dengan
`setImmediate()` sehingga tidak pernah memblokir aliran respons:

- **Pola preferensi** → `MemoryType.FACTUAL`
  (misalnya `Saya lebih suka …`, `Saya sangat menyukai …`, `favorit saya adalah …`, `Saya membenci …`)
- **Pola keputusan** → `MemoryType.EPISODIC`
  (misalnya `Saya akan menggunakan …`, `Saya memilih …`, `Saya memutuskan memakai …`, `Saya akan mengadopsi …`)
- **Pola kebiasaan** → `MemoryType.FACTUAL`
  (misalnya `Saya biasanya …`, `Saya selalu …`, `Saya cenderung …`)

Setiap kecocokan disanitasi (`trim`, penciutan spasi kosong, dibatasi hingga 500 karakter),
dideduplikasi dalam batch melalui `factKey(category, content)` yang stabil, dan
disimpan melalui `createMemory()` dengan metadata
`{category, extractedAt, source: "llm_response"}`. Teks masukan dibatasi hingga
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — jika lebih panjang, bagian **akhir** teks
digunakan agar konten asisten terbaru selalu disertakan.

`extractFactsFromText(text)` diekspor untuk pengujian dan mengembalikan fakta
terstruktur tanpa menyimpannya.

## Pengambilan (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` adalah titik masuk utama. Fungsi ini:

1. Menormalisasi dan memvalidasi konfigurasi melalui `MemoryConfigSchema`.
2. Segera mengembalikan `[]` ketika `enabled` bernilai false atau `maxTokens <= 0`.
3. Membatasi `maxTokens` ke rentang `[1, 8000]`.
4. Mendeteksi apakah tabel `memories` modern tersedia (dibandingkan dengan tabel `memory`
   lama) sehingga basis data lama tetap berfungsi.
5. Membuat kueri dasar dengan pemeriksaan kedaluwarsa
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), cakupan
   sesi opsional, dan batas waktu `retentionDays` opsional.
6. Membuat percabangan berdasarkan strategi:
   - **`exact`** (default): urutan kronologis `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: jika `config.query` tersedia dan `memory_fts` ada, lakukan JOIN
     `memory_fts MATCH ?` dan urutkan berdasarkan peringkat FTS; kembali ke urutan kronologis
     ketika FTS menghasilkan 0 baris.
   - **`hybrid`**: gabungan hasil FTS (relevansi lebih tinggi) dan kumpulan
     kronologis, yang dideduplikasi berdasarkan id.
7. Menghitung skor relevansi kata kunci (`getRelevanceScore`) pada
   `content`, `key`, dan JSON `metadata` ketika kueri diberikan. Baris dengan
   skor nol disaring.
8. Mengurutkan berdasarkan skor secara menurun, kemudian `createdAt` secara menurun.
9. Menelusuri daftar yang telah diperingkat dan menerima entri selama total berjalan
   `estimateTokens(content)` (≈ `length / 4`) tetap di bawah anggaran. Selalu
   mengembalikan setidaknya satu entri jika ada yang cocok.

`estimateTokens` diekspor dan digunakan oleh pengambilan, peringkasan, serta alat MCP
`omniroute_memory_search`.

## Injeksi (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Menggabungkan seluruh isi memori menjadi satu string `Memory context: …`.
2. Memilih strategi berdasarkan nama penyedia:
   - **Pesan sistem** (default untuk OpenAI, Anthropic, Gemini, …) — menambahkan
     `{role: "system", content: memoryText}` sebelum pesan sistem yang sudah ada
     sehingga prompt sistem pengguna tetap memiliki prioritas.
   - **Pesan pengguna** (fallback) — untuk penyedia dalam
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Penyedia ini menolak peran sistem
     dan jika tidak demikian akan menghasilkan 400 (lih. isu #1701 untuk GLM/Zhipu).
3. Mencatat jumlah, strategi, dan model pada `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` diekspor untuk pemanggil yang perlu
membuat keputusan perutean sendiri. Penyedia yang tidak dikenal secara default
menghasilkan `true` (peran sistem diizinkan) demi keamanan.

## Pengaturan (`settings.ts`)

Konfigurasi memori **disimpan dalam tabel pengaturan DB**, bukan dalam variabel lingkungan.
`getMemorySettings()` membaca dari `getSettings()` dan menyimpan hasilnya dalam cache
di dalam proses; `invalidateMemorySettingsCache()` dipanggil oleh rute PUT pengaturan
setelah penulisan.

### Bidang lama (semua versi)

| Kunci DB              | Tipe    | Default                                                     | Kontrol UI                                                                  |
| --------------------- | ------- | ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (nonaktif secara default sejak v3.8.30)             | Memori aktif/nonaktif                                                       |
| `memoryMaxTokens`     | integer | `2000` (rentang `0–16000`)                                  | Anggaran token untuk injeksi                                                |
| `memoryRetentionDays` | integer | `30` (rentang `1–365`)                                      | Jangka waktu retensi                                                        |
| `memoryStrategy`      | enum    | `"hybrid"` (salah satu dari `recent`, `semantic`, `hybrid`) | Strategi pengambilan                                                        |
| `skillsEnabled`       | boolean | `false`                                                     | Mengaktifkan/menonaktifkan injeksi keterampilan per kunci (lihat SKILLS.md) |

Catatan: strategi UI `"recent"` dipetakan ke strategi pengambilan internal
`"exact"` melalui `toMemoryRetrievalConfig()` (urutan kronologis).

### Bidang baru (v3.8.6, rencana 21 D9)

Lihat juga bagian "Ekstensi pengaturan" di atas untuk deskripsi bidang.

| Kunci DB                    | Bidang API               | Default  |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Kunci DB terkait Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` dengan default `"omniroute_memory"`,
`qdrantEmbeddingModel` dengan default `"openai/text-embedding-3-small"`) dibaca oleh
`normalizeQdrantConfig()` dalam `qdrant.ts`.

### Variabel lingkungan (v3.8.6)

Enam variabel lingkungan opsional menyesuaikan perilaku runtime mesin (didokumentasikan dalam `.env.example`):

| Variabel                        | Default                    | Deskripsi                                                                                                                                                 |
| ------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL cache embedding (5 menit)                                                                                                                             |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Jumlah maksimum entri dalam cache LRU embedding                                                                                                           |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Repositori HF untuk model Transformers.js                                                                                                                 |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Repositori HF untuk model potion statis                                                                                                                   |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Lokasi penyimpanan model yang diunduh                                                                                                                     |
| `MEMORY_VEC_TOP_K`              | `20`                       | Top-K default untuk pencarian vektor                                                                                                                      |
| `MEMORY_RRF_K`                  | `60`                       | Konstanta k RRF untuk pencarian hibrida                                                                                                                   |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Atur ke `int8` untuk menyimpan vektor sqlite-vec lokal yang dikuantisasi (~4× lebih kecil; bersifat opsional). Perubahan mode memaksa pengindeksan ulang. |

## Peringkasan (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` memadatkan konten lama ketika total token berjalan dalam memori suatu kunci melebihi anggaran. Fungsi ini mengiterasi baris secara DESC berdasarkan `created_at`, mempertahankan baris yang masih sesuai anggaran, dan mengganti `content` sisanya secara langsung dengan tiga kalimat pertama dari konten asli. `tokensSaved` adalah selisih `estimateTokens` antara konten lama dan baru.

Rutinitas ini **tersedia tetapi tidak dipanggil secara otomatis** dalam pipeline chat saat ini — panggil dari cron, tindakan admin, atau integrasi `MemoryConfig.autoSummarize` jika Anda memerlukan pemadatan berkelanjutan. Kehilangan data bersifat satu arah: teks asli akan ditimpa.

## REST API

Semua endpoint memerlukan autentikasi manajemen (`requireManagementAuth`).

### Endpoint memori inti (yang sudah ada + diperbarui)

| Metode   | Path                 | Deskripsi                                                                                                                                                                                    |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Daftar berpaginasi dengan filter: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Respons mencakup `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`         |
| `POST`   | `/api/memory`        | Membuat entri (divalidasi Zod: `content`, `key`, `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt` opsional). Memanggil `createMemory()` yang melakukan upsert pada `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Mengambil satu entri berdasarkan UUID                                                                                                                                                        |
| `PUT`    | `/api/memory/[id]`   | Memperbarui kolom entri (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Juga menyinkronkan vektor jika sumber embedding tersedia.                                     |
| `DELETE` | `/api/memory/[id]`   | Menghapus entri; juga menghapusnya dari `vec_memories` (D15) dan Qdrant dengan upaya terbaik. Mengembalikan 404 jika tidak ditemukan.                                                        |
| `GET`    | `/api/memory/health` | Menjalankan `verifyExtractionPipeline("health-check")` — proses pulang-pergi buat→daftar→hapus. Mengembalikan `{working, latencyMs, error?}`                                                 |

### Endpoint mesin memori baru (rencana 21)

| Metode | Path                              | Deskripsi                                                                                                                                                                                        |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/memory/retrieve-preview`    | Simulasi `retrieveMemories` — mengembalikan hasil berperingkat beserta skor, tingkat, dan token. Body: `RetrievePreviewSchema`. TIDAK menyisipkan atau mengubah memori.                          |
| `GET`  | `/api/memory/embedding-providers` | Mencantumkan penyedia beserta model embedding, dengan menunjukkan penyedia yang memiliki kunci API terkonfigurasi.                                                                               |
| `GET`  | `/api/memory/engine-status`       | Mengembalikan status mesin lengkap: tingkat kata kunci, resolusi embedding, statistik penyimpanan vektor, kesehatan Qdrant, konfigurasi pemeringkatan ulang. Bentuk: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Memicu pemadatan memori secara manual. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Mengembalikan `{candidates, tokensSaved}`.                                        |
| `POST` | `/api/memory/reindex`             | Memicu pengindeksan ulang vektor untuk memori dengan `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Mengembalikan `{started, pending}`.                                               |

### Endpoint pengaturan

| Metode | Path                                    | Deskripsi                                                                                                    |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` ternormalisasi saat ini (7 kolom baru + lama)                                       |
| `PUT`  | `/api/settings/memory`                  | Memperbarui kolom apa pun dari `MemorySettingsExtendedSchema` (total 12 kolom)                               |
| `GET`  | `/api/settings/qdrant`                  | Pengaturan Qdrant saat ini (`QdrantSettingsSchema`)                                                          |
| `PUT`  | `/api/settings/qdrant`                  | Memperbarui pengaturan Qdrant. Body: `QdrantSettingsUpdateSchema`. `apiKey` = string kosong menghapus kunci. |
| `GET`  | `/api/settings/qdrant/health`           | Probe keaktifan terhadap instans Qdrant yang dikonfigurasi. Mengembalikan `QdrantHealthResultSchema`.        |
| `POST` | `/api/settings/qdrant/search`           | Pengujian pencarian semantik terhadap Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).                  |
| `POST` | `/api/settings/qdrant/cleanup`          | Menghapus titik Qdrant untuk memori yang kedaluwarsa / lama.                                                 |
| `GET`  | `/api/settings/qdrant/embedding-models` | Mencantumkan model embedding yang tersedia untuk Qdrant.                                                     |

Kueri daftar `/api/memory` mendukung paginasi berbasis `page`
(`parsePaginationParams`) **atau** `offset` mentah — ketika `offset` tersedia,
parameter tersebut diprioritaskan dan `page` turunan dihitung untuk bentuk respons.

## Alat MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Saat server MCP diaktifkan, tiga alat memori didaftarkan:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → membungkus `retrieveMemories()`. Sejak v3.8.6 (D16), `strategy` dibaca
  dari `getMemorySettings()`, bukan ditetapkan secara hardcode ke `"exact"`. Jika
  `query` diberikan dan `strategy` adalah `semantic` atau `hybrid`, penyimpanan
  vektor digunakan jika tersedia.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → membungkus `createMemory()`. Hanya menerima 4 tipe kanonis:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → mencantumkan entri
  yang cocok, secara opsional memfilter berdasarkan stempel waktu sebelum pembuatan, lalu menghapus
  masing-masing melalui `deleteMemory()` (yang juga menghapus vektor dari sqlite-vec + Qdrant).

Lihat [MCP-SERVER.md](./MCP-SERVER.md) untuk detail transpor dan cakupan.

## Dasbor (Studio Memori)

`src/app/(dashboard)/dashboard/memory/page.tsx` kini menjadi **Studio dengan 3 tab**:

### Tab: Memori

- Kartu konsep (penjelasan "Cara kerjanya" yang dapat diciutkan).
- Daftar, pencarian, dan paginasi waktu nyata (debounce 300 ms).
- Filter tipe (`factual` / `episodic` / `procedural` / `semantic` / semua).
- Modal tambah memori (kunci, konten, tipe).
- Pengeditan sebaris (tombol pensil → `PUT /api/memory/[id]`).
- Hapus per baris (dengan dialog konfirmasi).
- Ekspor JSON untuk halaman saat ini; impor JSON melalui pemilih berkas.
- Kartu statistik: `totalEntries`, `tokensUsed`, `hitRate`.
- Tombol "Ringkas yang lama" → `POST /api/memory/summarize` (uji coba terlebih dahulu menampilkan
  jumlah kandidat, lalu meminta konfirmasi).
- Indikator kesehatan hijau/merah yang dikendalikan oleh `GET /api/memory/health`.

### Tab: Arena Uji

- Input kueri + pemilih strategi (Eksak / Semantik / Hibrida) + anggaran token.
- "Simulasikan" → `POST /api/memory/retrieve-preview` — menampilkan hasil berperingkat dengan
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panel resolusi yang menampilkan sumber embedding / penyimpanan vektor yang digunakan dan
  apakah terjadi fallback.

### Tab: Mesin

- Panel status mesin (chip FTS5 kata kunci, chip embedding, chip penyimpanan vektor,
  chip kesehatan Qdrant, chip pemeringkatan ulang).
- Tombol "Indeks Ulang Sekarang" → `POST /api/memory/reindex`.
- Pemilih sumber embedding (otomatis / jarak jauh / statis / transformers + tombol pengalih).
- Kartu konfigurasi Qdrant (tombol pengalih aktifkan, host/port/koleksi/kunci, uji koneksi,
  uji pencarian semantik, pembersihan).
- Kartu konfigurasi pemeringkatan ulang (tombol pengalih aktifkan, pemilih penyedia/model).

Pengaturan Memori dan Qdrant juga tersedia di
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) untuk
antarmuka pengaturan lama/global.

## Caching

`src/lib/memory/store.ts` menyimpan cache dalam proses mirip LRU
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, dengan penggusuran 20 %
entri terlama) untuk pembacaan `getMemory(id)`, ditambah lapisan
`memoryCache` kunci/nilai generik (`src/lib/memory/cache.ts`) dengan metode
`get`/`set`/`invalidate` yang digunakan oleh pemanggil yang menginginkan cache
dengan cakupannya sendiri (LRU 1.000 entri, TTL default 5 min).

## Privasi & Siklus Hidup

- Kepemilikan memori ditentukan oleh id kunci API (`resolveMemoryOwnerId` di
  `chatCore.ts`). Tanpa `apiKeyInfo.id`, pengambilan, injeksi,
  maupun ekstraksi tidak dijalankan.
- Entri dengan `expires_at` di masa mendatang disaring dari pengambilan; entri
  lama yang melampaui `retentionDays` dikecualikan oleh klausa
  `created_at >= cutoff` dalam `retrieveMemories`.
- Untuk penghapusan permanen, gunakan `DELETE /api/memory/[id]` atau `omniroute_memory_clear`.
- Ekstraksi dijalankan tanpa menunggu hasil melalui `setImmediate`; kegagalan dicatat di bawah
  `memory.extraction.background.failed` dan tidak pernah diteruskan kepada pemanggil.
- Perjalanan pulang-pergi verifikasi (`verifyExtractionPipeline`) membersihkan entri
  pengujiannya sendiri dalam blok `finally`.

## Lihat Juga

- [SKILLS.md](./SKILLS.md) — pengaturan `skillsEnabled` menginjeksikan definisi
  alat bersama memori.
- [MCP-SERVER.md](./MCP-SERVER.md) — transportasi / cakupan MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — cakupan API yang lebih luas.
- Modul sumber:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF hibrida
  - `src/lib/memory/embedding/index.ts` — lapisan embedding multisumber
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — skema Zod untuk semua isi permintaan API memori
  - `src/shared/schemas/qdrant.ts` — skema Zod untuk pengaturan/operasi Qdrant
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
  - `src/app/api/settings/qdrant/route.ts` + sub-rute
  - `src/app/(dashboard)/dashboard/memory/` — UI Studio (halaman + komponen +
    tab + hook)
  - `open-sse/handlers/chatCore.ts` (pengkabelan injeksi / ekstraksi)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Memilih Penyedia Embedding (v3.8.16+)

Mesin memori OmniRoute mendukung **empat sumber embedding** (`src/lib/memory/embedding/`). Masing-masing memiliki kompromi berbeda dalam hal **latensi, biaya, kualitas model, dan kompleksitas penyiapan**.

### Sumber Embedding

| Penyedia       | Sumber                                            | Latensi                          | Biaya               | Kualitas                        | Penyiapan                                      |
| -------------- | ------------------------------------------------- | -------------------------------- | ------------------- | ------------------------------- | ---------------------------------------------- |
| `transformers` | Model ONNX lokal (Xenova/all-MiniLM-L6-v2)        | ~50-150ms (CPU)                  | Gratis              | Baik                            | Hanya `npm install`                            |
| `static`       | Vektor yang telah dihitung (di-cache)             | <1ms                             | Gratis              | T/A (bergantung pada cache hit) | Tidak ada                                      |
| `remote`       | API OpenAI / Cohere / Voyage                      | ~100-300ms                       | $0.02-0.10/1M token | Sangat baik                     | Kunci API                                      |
| `auto`         | Memilih sumber terbaik yang tersedia saat runtime | Sama seperti sumber terpilih     | Gratis              | Sama seperti sumber terpilih    | Tidak ada                                      |
| _(cache)_      | Lapisan LRU dalam memori di atas sumber mana pun  | <1ms (hit), latensi penuh (miss) | Gratis              | Sama seperti sumber dasar       | Selalu aktif (bukan sumber yang dapat dipilih) |

### Pohon Keputusan

```
                  Apa konteks deployment Anda?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/UJI     PROD KECIL   PROD BESAR    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (gratis, tanpa API)        (kualitas terbaik) (tanpa internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            SELALU tambahkan lapisan `cache` di atasnya
            (LruCache membungkus penyedia mana pun)
```

### Konfigurasi Database & API

Opsi embedding memori dikonfigurasi melalui API/UI Pengaturan, bukan variabel lingkungan. Kunci database pengaturan yang relevan di bawah Pengaturan (`normalizeMemorySettings` dalam `src/lib/memory/settings.ts`) adalah:

- `memoryEmbeddingSource`: `"transformers"` (lokal), `"remote"` (berbasis API, misalnya OpenAI), `"static"` (penyimpanan eksternal), atau `"auto"`
- `memoryEmbeddingProviderModel`: Pengidentifikasi model untuk sumber remote/static (misalnya, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, atau `"auto"`

#### Model Lokal (`transformers`)

Menggunakan transformers.js secara internal untuk menjalankan model lokal:

```bash
# Variabel lingkungan yang dibaca dalam kode (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Repositori model HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Model potion statis HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Direktori cache
```

#### Cache Embedding LRU

Cache selalu aktif secara default dan dikonfigurasi melalui variabel lingkungan:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Jumlah maksimum item yang di-cache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 menit)
```

### Angka Performa

Tolok ukur pada server x86 4-core pada umumnya (teks masing-masing ~100 token):

| Penyedia             | p50   | p95   | p99   | Biaya / 1 juta embedding           |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratis                             |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Bergantung pada hosting Qdrant     |
| `cache` (hit)        | <1ms  | <1ms  | 2ms   | Gratis                             |

---

## Pola Ekstraksi Fakta (v3.8.16+)

Modul `extraction.ts` (`src/lib/memory/extraction.ts`) menggunakan **pencocokan pola regex** untuk mengekstrak fakta terstruktur dari pesan percakapan. Memahami pola-pola ini membantu Anda menyesuaikan kualitas ekstraksi untuk kasus penggunaan Anda.

### Kategori Pola Bawaan

| Kategori            | Contoh pola                                                 | Yang ditangkap                |
| ------------------- | ----------------------------------------------------------- | ----------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | Preferensi pengguna           |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | Keputusan pengguna (episodik) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Pola perilaku yang persisten  |

### Contoh Pola (Disederhanakan)

```ts
// Dari src/lib/memory/extraction.ts
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

### Hal yang Diekstrak

Ketika pengguna mengatakan:

> "Saya lebih memilih TypeScript. Saya akan menggunakan Postgres untuk proyek ini. Saya selalu melakukan commit sebelum push. Saya tidak menyukai Python."
> Ekstraksi menghasilkan 4 memori:
>
> | Kunci                                | Kategori   | Jenis    | Konten                      |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres untuk proyek ini" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit sebelum push"       |
> | `preference:python`                  | preference | factual  | "Python"                    |

### Batas Ekstraksi

Untuk mencegah ekstraksi yang tidak terkendali, batas berikut diterapkan:

| Panjang konten minimum | 3 karakter |
| Panjang konten maksimum | 500 karakter |

### Kapan Harus Menonaktifkan Ekstraksi

Ekstraksi berjalan secara otomatis setiap kali memori diaktifkan; tidak ada tombol terpisah
khusus ekstraksi. Untuk menonaktifkannya, nonaktifkan memori sepenuhnya (`enabled: false`
melalui `PUT /api/settings/memory`). Pertimbangkan untuk melakukannya ketika:

- Anda memiliki volume pesan yang tinggi dan biaya ekstraksi tidak dapat diabaikan
- Percakapan Anda sebagian besar bersifat sementara (obrolan, debugging) tanpa nilai jangka panjang
- Anda sudah menangkap konteks melalui plugin khusus

---

## Penyesuaian RRF Hibrida (v3.8.16+)

Algoritma **Reciprocal Rank Fusion (RRF)** menggabungkan hasil FTS5 (kata kunci) dan vektor (semantik). Parameter `k` mengontrol seberapa besar bobot yang diberikan kepada hasil dengan peringkat lebih rendah.

### Rumus

Untuk setiap memori kandidat, skor RRF adalah:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Dengan:

- `k` adalah konstanta (bawaan 60)
- `rank_i(d)` adalah peringkat dokumen `d` dalam sistem pengambilan ke-i (FTS, vektor)
- Penjumlahan dilakukan pada semua sistem pengambilan

### Bagaimana `k` Memengaruhi Hasil

| Nilai `k`           | Efek                                                                                               | Paling sesuai untuk                      |
| ------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `k=0`               | Fusi peringkat murni (tanpa penghalusan)                                                           | Tolok ukur teoretis                      |
| `k=10-30`           | Memberi bobot besar pada hasil teratas, peringkat rendah hampir tidak berkontribusi                | Ketika 3 hasil teratas biasanya benar    |
| **`k=60`** (bawaan) | Seimbang — 10 hasil teratas semuanya berkontribusi secara berarti                                  | Pengambilan untuk tujuan umum            |
| `k=100+`            | Lebih datar — bahkan hasil berperingkat rendah dapat mendominasi jika muncul dalam beberapa sistem | Ketika recall > precision sangat penting |

### Menyesuaikan `k` dalam Praktik

```bash
# Bawaan
MEMORY_RRF_K=60

# Presisi agresif (memori kecil, sedikit dokumen)
MEMORY_RRF_K=20

# Recall maksimum (memori besar, kueri beragam)
MEMORY_RRF_K=120
```

**Contoh dengan `k=20`:**

- Peringkat FTS 1 → kontribusi `1/21 = 0.048`
- Peringkat FTS 10 → kontribusi `1/30 = 0.033`
- Peringkat vektor 1 → kontribusi `0.048`
- Maksimum gabungan: `0.096`

**Contoh dengan `k=60`:**

- Peringkat FTS 1 → kontribusi `1/61 = 0.016`
- Peringkat FTS 10 → kontribusi `1/70 = 0.014`
- Peringkat vektor 1 → kontribusi `0.016`
- Maksimum gabungan: `0.033`

Dengan `k` yang lebih tinggi, **perbedaan relatif** antara peringkat 1 dan peringkat 10 menjadi lebih kecil, sehingga algoritma lebih mengandalkan **konsensus di seluruh sistem pengambilan** daripada keyakinan terhadap peringkat teratas.

### Kapan Harus Mengubah `k`

| Gejala                                                     | Coba                                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Hasil teratas selalu menang, tetapi salah                  | **Turunkan** k (misalnya, 20) — keyakinan peringkat teratas lebih penting       |
| Jawaban yang benar ada di 5 besar tetapi bukan peringkat 1 | **Naikkan** k (misalnya, 100) — penilaian yang lebih datar menghargai konsensus |
| Recall tinggi tetapi precision rendah                      | **Turunkan** k — pertajam pemeringkatan                                         |
| Recall rendah (dokumen relevan tidak ditemukan)            | **Naikkan** k — beri kesempatan kepada dokumen berperingkat lebih rendah        |

### Pembobotan RRF

Fusi peringkat resiprokal menggunakan bobot yang sama untuk peringkat vektor semantik dan peringkat pencarian teks lengkap:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Tidak ada variabel lingkungan untuk menyesuaikan bobot individual (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` tidak tersedia).

---

## Strategi Peringkasan (v3.8.16+)

Modul `summarization.ts` (`src/lib/memory/summarization.ts`) memadatkan memori lama untuk menjaga agar kumpulan aktif tetap kecil sekaligus mempertahankan kemampuan mengingat kembali.

### Kapan Peringkasan Dipicu

| Pemicu                | Ambang batas (default) |
| --------------------- | ---------------------- |
| Pemicu manual via API | tidak berlaku          |

### Apa yang Dirangkum

Dua titik masuk diekspor dari `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — memadatkan
  memori untuk suatu sesi menjadi satu teks ringkasan yang dibatasi oleh anggaran token.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — pemadatan berbasis usia
  yang digunakan oleh API: fungsi ini memilih setiap memori yang lebih lama dari `days`, membuat
  satu memori ringkasan yang dipadatkan dari memori-memori tersebut, dan (ketika `dryRun` bernilai `false`) menghapus
  memori aslinya. Teruskan `dryRun: true` untuk meninjau kumpulan kandidat dan total token
  tanpa mengubah apa pun.

Tidak ada tahap pengelompokan tag/kunci atau penilaian "inti vs dapat diringkas" per memori —
pemilihan hanya berdasarkan batas usia, dan teks ringkasan berupa satu baris yang dipadatkan
dan diawali tipe untuk setiap kandidat.

### Memicu Peringkasan

Peringkasan bersifat **manual / opsional** — pengaturan `autoSummarize` secara
default bernilai `false`, sehingga tidak ada yang dipadatkan secara otomatis. Picu melalui API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Untuk tetap menonaktifkannya, cukup pertahankan `autoSummarize` pada nilai default-nya (`false`).

### Kiat Kualitas Peringkasan

- **Tinjau terlebih dahulu dengan `dryRun`** — `summarizeMemoriesOlderThan(..., true)` mengembalikan
  daftar kandidat dan jumlah total token sehingga Anda dapat memastikan apa yang akan digabungkan
  sebelum menghapus memori aslinya.
- **Jalankan peringkasan selama jam dengan lalu lintas rendah** jika Anda memiliki korpus memori yang besar — pemanggilan LLM adalah bagian yang lambat

```bash
# Gaya cron: rangkum setiap hari pada pukul 03.00
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Pola Penyedia MemoryBackend

> **Sumber acuan:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Pengujian:** `src/lib/memory/__tests__/generic-backend.test.ts`

Pola penyedia MemoryBackend memperkenalkan **lapisan abstraksi backend yang dapat dipasang-lepas** di atas mesin memori yang sudah ada. Alih-alih terikat pada satu implementasi penyimpanan, sistem memori kini mendukung beberapa backend (SQLite, Obsidian, Notion, backend HTTP kustom) dengan perutean utama/cadangan yang dapat dikonfigurasi.

### Arsitektur

```
┌──────────────────────────────────────────────────────────┐
│                    Rute API                               │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Orkestrator singleton (manager.ts)                  │
│                                                          │
│  Utama    ──► Backend A  (mis. SQLite)                   │
│  Cadangan ──► Backend B  (mis. Obsidian)                 │
│               Backend C  (mis. Notion via GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Backend    │ │ Backend    │ │ Backend          │
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│            │ │            │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Antarmuka Inti (`backend.ts`)

Setiap backend harus mengimplementasikan antarmuka `MemoryBackend`:

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

  // Pencarian
  search(config: SearchConfig): Promise<Memory[]>;

  // Kesehatan
  health(): Promise<HealthCheckResult>;

  // Siklus hidup (opsional)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orkestrator singleton yang:

- **Mendaftarkan** backend melalui `register(backend)` — dipanggil saat boot dari `index.ts`
- **Mengonfigurasi** backend utama + cadangan melalui `configure(primary, fallbacks)`
- **Merutekan** CRUD/pencarian ke backend utama, dengan rantai cadangan jika terjadi kegagalan
- **Memeriksa kesehatan** semua backend secara berkala

**Perilaku cadangan:**

| Operasi  | Utama                        | Cadangan                             |
| -------- | ---------------------------- | ------------------------------------ |
| `create` | ✅ Hanya backend utama       | ❌                                   |
| `get`    | ✅ Coba backend utama dahulu | ✅ Gunakan cadangan jika null        |
| `update` | ✅ Hanya backend utama       | ✅ Sinkronisasi tanpa menunggu hasil |
| `delete` | ✅ Hanya backend utama       | ✅ Sinkronisasi tanpa menunggu hasil |
| `list`   | ✅ Hanya backend utama       | ❌                                   |
| `search` | ✅ Backend utama dahulu      | ✅ Cadangan jika terjadi kesalahan   |

#### GenericMemoryBackend (`genericBackend.ts`)

Konektor HTTP generik yang mengadaptasi REST API apa pun menjadi MemoryBackend. Berguna untuk:

- **Notion** — hubungkan melalui Notion API
- **Obsidian** — hubungkan melalui Obsidian Local REST API
- **Backend kustom** — layanan apa pun yang menyediakan API memori RESTful

**Konfigurasi:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL dasar API backend
  apiKey?: string;           // Token Bearer untuk autentikasi
  headers?: Record<string, string>;  // Header HTTP khusus
  timeout?: number;          // Batas waktu permintaan (default: 30000ms)
  backendType?: string;      // Untuk pencatatan log

  // Penggantian endpoint (default menggunakan konvensi REST)
  endpoints?: {
    search?: string;   // default: "/memories/search"
    create?: string;   // default: "/memories"
    list?: string;     // default: "/memories"
    get?: string;      // default: "/memories/{id}"
    update?: string;   // default: "/memories/{id}"
    delete?: string;   // default: "/memories/{id}"
    health?: string;   // default: "/health"
  };

  // Pemetaan nama parameter kueri
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Pemetaan nama parameter jalur
  pathParams?: {
    id?/memoryId?
  };
}
```

**Backend yang dikenal** telah dikonfigurasi sebelumnya di `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend yang diarahkan ke localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend yang diarahkan ke api.notion.com/v1
```

#### Backend Bawaan

##### SQLiteBackend (`sqliteBackend.ts`)

Backend utama default. Membungkus penyimpanan memori berbasis SQLite yang ada menggunakan `src/lib/memory/store.ts`. Didaftarkan secara otomatis saat proses boot.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Membungkus integrasi Obsidian yang ada (`src/lib/memory/obsidianBackend.ts`). Terhubung ke vault Obsidian melalui Obsidian Local REST API.

### Pengaturan

Pengaturan backend memori disimpan dalam tabel pengaturan aplikasi dan dikelola melalui `src/lib/memory/settings.ts`:

| Pengaturan          | Kunci Env/Konfigurasi    | Default    | Deskripsi                           |
| ------------------- | ------------------------ | ---------- | ----------------------------------- |
| Backend utama       | `memoryPrimaryBackend`   | `"sqlite"` | ID backend utama                    |
| Backend fallback    | `memoryFallbackBackends` | `[]`       | ID backend fallback yang berurutan  |
| Konfigurasi backend | `memoryBackendConfigs`   | `{}`       | Penggantian konfigurasi per backend |

Pengaturan dinormalisasi melalui `normalizeMemorySettings()` dan disimpan dalam cache di `getMemorySettings()`.

### Alur Inisialisasi

```
Bootstrap aplikasi
  → impor index.ts (efek samping): mendaftarkan SQLiteBackend
  → initMemoryBackends() dipanggil dari siklus hidup aplikasi:
      1. Muat pengaturan (getMemorySettings)
      2. Konfigurasikan backend utama + fallback
      3. Inisialisasi semua backend (pemeriksaan kesehatan)
      4. Siap menerima permintaan
```

### Menambahkan Backend Baru

1. **Implementasikan antarmuka `MemoryBackend`** di `src/lib/memory/<name>Backend.ts`
2. **Ekspor** dari `src/lib/memory/index.ts`
3. **Daftarkan** dengan `memoryManager.register(yourBackend)` saat boot
4. **Konfigurasikan** melalui pengaturan: atur `memoryPrimaryBackend` ke ID backend Anda
5. **Uji** dengan `src/lib/memory/__tests__/generic-backend.test.ts` sebagai referensi

#### Contoh: Backend Brain

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

### Verifikasi

#### Pengujian unit

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Output yang diharapkan: **35 pengujian, semuanya lulus** yang mencakup:

- Konstruktor (2)
- Pemeriksaan kesehatan (4) — berhasil, kegagalan 500, kesalahan jaringan, latensi
- Inisialisasi (2) — berhasil, gagal
- Buat (2) — endpoint default, endpoint khusus
- Ambil (4) — berhasil, 404 → null, selain 404 melemparkan kesalahan, parameter jalur khusus
- Perbarui (2) — berhasil, 404 → false
- Hapus (2) — berhasil, 404 → false
- Daftar (2) — parameter kueri, nama parameter khusus
- Pencarian (3) — parameter kueri, endpoint khusus, serialisasi opsi
- Header autentikasi (2) — token Bearer, header khusus
- Factory (1)

#### Pemeriksaan tipe

```bash
npm run typecheck:core
```

Yang diharapkan: **0 kesalahan**.
