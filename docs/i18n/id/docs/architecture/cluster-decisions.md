# Cluster Decisions — Optional Sidecar Profiles (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** usulan (menunggu tinjauan @diegosouzapw)
**Tanggal:** 2026-06-20
**Referensi:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Dua profil compose opsional (`memory`, `bifrost`) untuk deployment 8 layanan yang sudah ada di [`docker-compose.yml`](../../docker-compose.yml). Perilaku default-up **tidak berubah**: 3 × replika `omniroute` + Caddy + Redis + CliproxyAPI. Kedua profil baru tersebut menambahkan Qdrant dan Bifrost sebagai sidecar opsional, yang diaktifkan melalui `docker compose --profile <name> up`. **Tidak ada layanan yang sudah ada yang dihapus atau diganti.**

## Mengapa pendekatan ini konservatif

Bentuk deployment OmniRoute yang ada sudah ramping dan terbukti:

- **`redis:7-alpine`** menangani beban kerja pembatasan laju/cache pada skala produksi.
- **SQLite + sqlite-vec + FTS5** mencakup memori lokal + vektor + pencarian teks (lihat [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** sudah berfungsi sebagai penyeimbang beban + terminator TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** sudah terintegrasi sebagai router Tier-1 di [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proksi sidecar dengan kill switch melalui variabel lingkungan `BIFROST_ENABLED` — atur `=0` untuk melewati sidecar dan kembali ke jalur TS).

Kedua profil ini merupakan **opsi scale-out untuk deployment yang telah mencapai batas SQLite** — bukan migrasi. Keduanya dinonaktifkan secara default.

## Kedua profil

### `memory` — Sidecar Memori Vektor Qdrant

**Kapan perlu diaktifkan:**

- > 1 juta embedding per deployment (sqlite-vec mulai melambat pada skala besar).
- Deployment multi-replika yang memerlukan status vektor bersama di seluruh `omniroute-1/2/3`.
- Anda sudah memiliki klaster Qdrant eksternal (Qdrant Cloud, on-prem).

**Yang ditambahkan:**

| Layanan  | Image                   | Port        | Catatan                                               |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Indeks HNSW; volume persisten `omniroute_qdrant_data` |

**Aktivasi:** aktifkan `qdrantEnabled = true` di UI Pengaturan **atau** atur variabel lingkungan `QDRANT_HOST=qdrant`. Lihat [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) untuk aturan prioritas (tabel pengaturan → variabel lingkungan → default).

**Variabel lingkungan:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (lihat `.env.example` baris 1672-1683).

### `bifrost` — Sidecar Router Tier-1 Bifrost

**Kapan perlu diaktifkan:**

- Anda menjalankan ≥3 replika `omniroute` dan ingin rotasi penyedia dipusatkan dalam satu proses Go.
- Anda menginginkan satu tempat audit/pencatatan untuk permintaan ke penyedia upstream di seluruh replika.
- Anda menginginkan penskalaan horizontal lapisan perutean Tier-1 yang independen dari replika OmniRoute.

**Yang ditambahkan:**

| Layanan   | Image                             | Port   | Catatan                                                                  |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------------ |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Router Tier-1 berbasis Go; volume log persisten `omniroute_bifrost_logs` |

**Aktivasi:** atur `BIFROST_BASE_URL=http://bifrost:8080` di `.env.example`. Rute proksi sidecar yang sudah ada di [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (ditambahkan dalam PR #4381) akan menggunakannya secara otomatis.

**Variabel lingkungan:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (lihat `.env.example` baris 1685-1695).

## Hal yang secara eksplisit TIDAK dilakukan oleh PR ini

Utas issue awal mengusulkan penulisan ulang klaster yang lebih besar. Setelah mengaudit bentuk beban kerja yang sebenarnya, komponen berikut **ditolak** dengan alasan yang tercantum:

| Komponen                             | Keputusan | Alasan                                                                                                                              |
| ------------------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **HAPUS** | `redis:7-alpine` sudah memadai untuk beban kerja pembatasan laju pada skala produksi; tidak ada batas kapasitas yang perlu diatasi. |
| **NATS**                             | **HAPUS** | Setiap replika `omniroute` adalah satu proses Node.js; tidak ada beban kerja pub/sub multiproses.                                   |
| **PostgreSQL**                       | **HAPUS** | SQLite + sqlite-vec + FTS5 mencakup ketiga kasus penggunaan; 97 migrasi + pengemasan Electron menghambat migrasi.                   |
| **Neo4j**                            | **HAPUS** | Perutean merupakan join 5 tabel; CTE rekursif pada SQLite sudah memadai.                                                            |
| **MinIO**                            | **HAPUS** | Tidak ada beban kerja blob berukuran beberapa MB; gambar/audio diteruskan melalui proksi passthrough.                               |
| **pgvector / pg_ai / pg_textsearch** | **HAPUS** | Alasan batas kapasitas SQLite sama seperti PostgreSQL; ekosistem pgvector terfragmentasi.                                           |
| **HAProxy / Envoy**                  | **HAPUS** | Caddy sudah menangani LB + TLS; keduanya secara eksplisit ditolak sebagai router Tier-1 (lihat `AGENTS.md`).                        |

Jika kasus penggunaan di masa mendatang membuktikan perlunya salah satu komponen tersebut, dokumen ini adalah tempat untuk melakukan perubahan.

## Peluncuran 4 minggu (jika disetujui)

1. **Minggu 1** — Gabungkan PR ini + verifikasi profil opt-in dengan stack compose 3 replika.
2. **Minggu 2** — Aktivasi penuh Bifrost untuk OpenAI/Claude/Gemini/Ollama (4 dari 14+ penyedia) menggunakan rute proksi sidecar di [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (dikendalikan oleh `BIFROST_ENABLED`, dapat dinonaktifkan saat runtime melalui kill switch).
3. **Minggu 3** — Aktifkan profil memori Qdrant dalam satu deployment pengujian; ukur perbedaan latensi dibandingkan sqlite-vec.
4. **Minggu 4** — Pemeriksaan kesehatan observabilitas (kode keluar `docker compose ps` + smoke test `wget`); pembaruan 71 pilar sesuai ADR-041.

## File yang diubah dalam PR ini

| File                                                | Perubahan                                                                                                                                                                                                                                 |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                | +30 baris: profil `memory` (Qdrant), profil `bifrost` (Bifrost), volume persisten, pemeriksaan kesehatan.                                                                                                                                 |
| `.env.example`                                      | +24 baris: `QDRANT_*` (6 variabel), `BIFROST_*` (4 variabel).                                                                                                                                                                             |
| `docs/reference/ENVIRONMENT.md`                     | +6 baris di bagian 25 untuk variabel lingkungan `QDRANT_*`.                                                                                                                                                                               |
| `src/lib/memory/qdrant.ts`                          | +33 baris: rantai fallback variabel lingkungan (pengaturan → lingkungan → nilai default) untuk `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | +88 baris: 9 kasus pengujian baru yang menetapkan presedensi fallback variabel lingkungan.                                                                                                                                                |
| `docs/architecture/cluster-decisions.md` (file ini) | BARU — catatan keputusan untuk profil opt-in.                                                                                                                                                                                             |
| `AGENTS.md`                                         | +1 baris: penunjuk ke dokumen ini dalam tabel dokumentasi referensi.                                                                                                                                                                      |

**Total kode yang tersentuh:** 4 file produksi (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 file pengujian (`qdrant-wiring.test.ts`), 2 file dokumentasi (`cluster-decisions.md`, `AGENTS.md`).
