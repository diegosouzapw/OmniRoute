# Cluster Decisions — Optional Sidecar Profiles (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** cadangan (menunggu semakan @diegosouzapw)
**Tarikh:** 2026-06-20
**Rujukan:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Ringkasan

Dua profil compose pilihan (`memory`, `bifrost`) untuk penggunaan 8 perkhidmatan sedia ada dalam [`docker-compose.yml`](../../docker-compose.yml). Tingkah laku lalai semasa menjalankan perkhidmatan **tidak berubah**: 3 × replika `omniroute` + Caddy + Redis + CliproxyAPI. Kedua-dua profil baharu menambahkan Qdrant dan Bifrost sebagai sidecar pilihan, yang diaktifkan melalui `docker compose --profile <name> up`. **Tiada perkhidmatan sedia ada yang dialih keluar atau digantikan.**

## Mengapa pendekatan ini konservatif

Struktur penggunaan OmniRoute yang sedia ada sememangnya ringkas dan telah terbukti:

- **`redis:7-alpine`** mengendalikan beban kerja had kadar/cache pada skala pengeluaran.
- **SQLite + sqlite-vec + FTS5** merangkumi memori setempat + vektor + carian teks (lihat [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** sudah pun menjadi pengimbang beban + penamat TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** sudah pun disepadukan sebagai penghala Tahap 1 dalam [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proksi sidecar dengan suis pemutus melalui pemboleh ubah persekitaran `BIFROST_ENABLED` — tetapkan `=0` untuk memintas sidecar dan beralih kepada laluan TS).

Kedua-dua profil ini ialah **pilihan peluasan skala untuk penggunaan yang mencapai had SQLite** — bukannya migrasi. Kedua-duanya dilumpuhkan secara lalai.

## Dua profil

### `memory` — Sidecar Memori Vektor Qdrant

**Bila perlu diaktifkan:**

- > 1J pembenaman bagi setiap penggunaan (sqlite-vec mula menjadi perlahan pada skala besar).
- Penggunaan berbilang replika yang memerlukan keadaan vektor dikongsi merentas `omniroute-1/2/3`.
- Anda sudah mempunyai kluster Qdrant luaran (Qdrant Cloud, di premis).

**Perkara yang ditambahkan:**

| Perkhidmatan | Imej                    | Port        | Catatan                                          |
| ------------ | ----------------------- | ----------- | ------------------------------------------------ |
| `qdrant`     | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Indeks HNSW; volum kekal `omniroute_qdrant_data` |

**Pengaktifan:** tukar `qdrantEnabled = true` dalam UI Tetapan **atau** tetapkan pemboleh ubah persekitaran `QDRANT_HOST=qdrant`. Lihat [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) untuk peraturan keutamaan (jadual tetapan → pemboleh ubah persekitaran → lalai).

**Pemboleh ubah persekitaran:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (lihat baris 1672-1683 dalam `.env.example`).

### `bifrost` — Sidecar Penghala Tahap 1 Bifrost

**Bila perlu diaktifkan:**

- Anda menjalankan ≥3 replika `omniroute` dan mahu memusatkan penggiliran penyedia dalam satu proses Go.
- Anda mahukan satu titik audit/pengelogan untuk permintaan kepada penyedia huluan merentas semua replika.
- Anda mahu penskalaan mendatar bagi lapisan penghalaan Tahap 1 secara bebas daripada replika OmniRoute.

**Perkara yang ditambahkan:**

| Perkhidmatan | Imej                              | Port   | Catatan                                                                  |
| ------------ | --------------------------------- | ------ | ------------------------------------------------------------------------ |
| `bifrost`    | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Penghala Tahap 1 berasaskan Go; volum log kekal `omniroute_bifrost_logs` |

**Pengaktifan:** tetapkan `BIFROST_BASE_URL=http://bifrost:8080` dalam `.env.example`. Laluan proksi sidecar sedia ada di [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (ditambahkan dalam PR #4381) akan mengesan tetapan ini secara automatik.

**Pemboleh ubah persekitaran:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (lihat baris 1685-1695 dalam `.env.example`).

## Perkara yang PR ini secara jelas TIDAK lakukan

Utas isu asal mencadangkan penulisan semula kluster yang lebih besar. Selepas mengaudit bentuk beban kerja sebenar, perkara berikut **ditolak** atas sebab yang diberikan:

| Komponen                             | Keputusan | Sebab                                                                                                                |
| ------------------------------------ | --------- | -------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **GUGUR** | `redis:7-alpine` sudah memadai untuk beban kerja pengehadan kadar pada skala produksi; tiada had yang perlu diatasi. |
| **NATS**                             | **GUGUR** | Setiap replika `omniroute` ialah satu proses Node.js; tiada beban kerja terbit/langgan berbilang proses.             |
| **PostgreSQL**                       | **GUGUR** | SQLite + sqlite-vec + FTS5 merangkumi kesemua 3 kes penggunaan; 97 migrasi + pembungkusan Electron menyekat migrasi. |
| **Neo4j**                            | **GUGUR** | Penghalaan ialah gabungan 5 jadual; CTE rekursif pada SQLite adalah mencukupi.                                       |
| **MinIO**                            | **GUGUR** | Tiada beban kerja blob berbilang MB; imej/audio ialah proksi laluan terus.                                           |
| **pgvector / pg_ai / pg_textsearch** | **GUGUR** | Sebab had SQLite yang sama seperti PostgreSQL; ekosistem pgvector berpecah-pecah.                                    |
| **HAProxy / Envoy**                  | **GUGUR** | Caddy sudah mengendalikan LB + TLS; kedua-duanya ditolak secara jelas sebagai penghala Tahap 1 (lihat `AGENTS.md`).  |

Jika kes penggunaan pada masa hadapan membuktikan keperluan untuk salah satu daripadanya, dokumen ini ialah tempat untuk dipinda.

## Pelaksanaan 4 minggu (jika diluluskan)

1. **Minggu 1** — Gabungkan PR ini + pengesahan profil ikut serta dengan tindanan compose 3 replika.
2. **Minggu 2** — Pengaktifan penuh Bifrost untuk OpenAI/Claude/Gemini/Ollama (4 daripada 14+ penyedia) menggunakan laluan proksi sidecar di [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (dikawal oleh `BIFROST_ENABLED`, boleh dimatikan semasa masa jalan).
3. **Minggu 3** — Profil memori Qdrant didayakan dalam satu pelaksanaan ujian; ukur perbezaan kependaman berbanding sqlite-vec.
4. **Minggu 4** — Semakan kesihatan kebolehcerapan (kod keluar `docker compose ps` + ujian ringkas `wget`); penyegaran 71 tonggak mengikut ADR-041.

## Fail yang diubah dalam PR ini

| Fail                                                | Perubahan                                                                                                                                                                                                                                 |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                | +30 baris: profil `memory` (Qdrant), profil `bifrost` (Bifrost), volum berterusan, semakan kesihatan.                                                                                                                                     |
| `.env.example`                                      | +24 baris: `QDRANT_*` (6 pemboleh ubah), `BIFROST_*` (4 pemboleh ubah).                                                                                                                                                                   |
| `docs/reference/ENVIRONMENT.md`                     | +6 baris dalam bahagian 25 untuk pemboleh ubah persekitaran `QDRANT_*`.                                                                                                                                                                   |
| `src/lib/memory/qdrant.ts`                          | +33 baris: rantaian sandaran pemboleh ubah persekitaran (tetapan → persekitaran → lalai) untuk `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | +88 baris: 9 kes ujian baharu yang menetapkan keutamaan sandaran pemboleh ubah persekitaran.                                                                                                                                              |
| `docs/architecture/cluster-decisions.md` (fail ini) | BAHARU — rekod keputusan untuk profil ikut serta.                                                                                                                                                                                         |
| `AGENTS.md`                                         | +1 baris: penunjuk kepada dokumen ini dalam jadual dokumentasi rujukan.                                                                                                                                                                   |

**Jumlah bersih kod yang disentuh:** 4 fail produksi (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 fail ujian (`qdrant-wiring.test.ts`), 2 fail dokumentasi (`cluster-decisions.md`, `AGENTS.md`).
